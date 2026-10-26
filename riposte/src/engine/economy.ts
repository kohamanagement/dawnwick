// The meta economy around runs: Coins and Dust, the card collection, booster packs, crafting,
// sigil imprints, the daily market and quests, talents, loadouts and achievements.
// Everything here is profile-side and deliberately not seeded: it never touches run determinism.
import type { CharId, ModId, RunBonus, RunState } from './types';
import { type Profile, type Quest, type RunResult, type RunRecord, LEVEL_REWARD, levelOf, recordRun, todayKey } from './meta';
import { CARDS, COLLECTIBLE, factionsOf } from '../data/cards';
import { CHARACTERS } from '../data/characters';
import { PACKS, CRAFT, DUST, PITY } from '../data/packs';
import { MODS } from '../data/mods';
import { TALENTS, TALENT_MAP, type School } from '../data/talents';
import { ACHIEVEMENTS, type AchReward } from '../data/achievements';
import { RELICS } from '../data/relics';
import { Rng } from './rng';
import { hashStr } from './rng';
import { SEASON, SEASON_TRACK, COSMETIC_MAP, MASTERY_DUST, masteryLevel, type TierReward } from '../data/season';
import { HEAT_MILESTONES } from '../data/vows';
import { runXp, runScore, nightOf } from './run';

export const STARTER_IDS = new Set(Object.values(CHARACTERS).flatMap((c) => c.deck));

const rnd = (n: number) => Math.floor(Math.random() * n);
const pick = <T>(a: T[]): T => a[rnd(a.length)];

export function owned(p: Profile, id: string): number {
  if (STARTER_IDS.has(id) && CARDS[id].rarity === 'starter') return 99;
  return p.collection[id]?.n ?? 0;
}

export function isUnlocked(p: Profile, id: string): boolean {
  return (CARDS[id].unlock ?? 0) <= levelOf(p.xp);
}

// ───────── collection ─────────

export function addCard(p: Profile, id: string, foil = false): boolean {
  const e = p.collection[id] ?? { n: 0, foil: 0 };
  const isNew = e.n === 0;
  e.n++;
  if (foil) e.foil++;
  p.collection[id] = e;
  if (isNew && !p.newCards.includes(id)) p.newCards.push(id);
  if (CARDS[id].rarity === 'legendary') bump(p, 'legendaries');
  return isNew;
}

export function bump(p: Profile, k: string, n = 1): void { p.counters[k] = (p.counters[k] ?? 0) + n; }

/** Copies of a card the loadouts currently need. */
function inLoadouts(p: Profile, id: string): number {
  let most = 0;
  for (const l of Object.values(p.loadouts)) most = Math.max(most, (l ?? []).filter((x) => x === id).length);
  return most;
}

export function dustValue(id: string, foil: boolean): number {
  return (DUST[CARDS[id].rarity] ?? 0) * (foil ? 4 : 1);
}

/** Break one copy into Dust (a foil copy if asked and owned). */
export function dustCard(p: Profile, id: string, foil = false): number {
  const e = p.collection[id];
  if (!e || e.n <= 0 || (foil && e.foil <= 0)) return 0;
  const gain = dustValue(id, foil);
  e.n--;
  if (foil) e.foil--;
  else e.foil = Math.min(e.foil, e.n);
  if (e.n === 0) { delete p.collection[id]; delete p.imprints[id]; }
  p.dust += gain;
  bump(p, 'dusted');
  fixLoadouts(p);
  return gain;
}

/** Dust everything above a playset (3 copies, 1 for Legendaries), keeping foils first. */
export function dustExtras(p: Profile): number {
  let total = 0;
  for (const [id, e] of Object.entries(p.collection)) {
    const keep = Math.max(CARDS[id].rarity === 'legendary' ? 1 : 3, inLoadouts(p, id));
    while (e.n > keep) {
      const plain = e.n - e.foil;
      total += dustCard(p, id, plain <= 0);
    }
  }
  return total;
}

export function craftCost(id: string): number { return CRAFT[CARDS[id].rarity] ?? 0; }

export function craft(p: Profile, id: string): boolean {
  const cost = craftCost(id);
  if (!cost || p.dust < cost || !isUnlocked(p, id)) return false;
  p.dust -= cost;
  addCard(p, id);
  bump(p, 'crafted');
  return true;
}

export function canImprint(p: Profile, id: string, mod: ModId): boolean {
  return owned(p, id) > 0 && MODS[mod].fits(CARDS[id]) && p.imprints[id] !== mod && p.dust >= MODS[mod].dust;
}

export function imprint(p: Profile, id: string, mod: ModId | null): boolean {
  if (mod === null) { delete p.imprints[id]; return true; }
  if (!canImprint(p, id, mod)) return false;
  p.dust -= MODS[mod].dust;
  p.imprints[id] = mod;
  bump(p, 'imprinted');
  return true;
}

// ───────── packs ─────────

export interface Pull { id: string; foil: boolean; isNew: boolean; rarity: string }

export function buyPack(p: Profile, id: string): boolean {
  const d = PACKS[id];
  if (!d || p.coins < d.price) return false;
  p.coins -= d.price;
  p.packs[id] = (p.packs[id] ?? 0) + 1;
  return true;
}

function poolFor(p: Profile, rarity: string, factions?: string[]): string[] {
  const fs = factions ? [...factions, 'neutral'] : null;
  return COLLECTIBLE.filter((c) => c.rarity === rarity && (!fs || fs.includes(c.faction)) && isUnlocked(p, c.id)).map((c) => c.id);
}

export function openPack(p: Profile, id: string): Pull[] | null {
  const d = PACKS[id];
  if (!d || !(p.packs[id] > 0)) return null;
  p.packs[id]--;
  if (!p.packs[id]) delete p.packs[id];
  const out: Pull[] = [];
  let gotLegend = false;
  for (let i = 0; i < d.size; i++) {
    const hero = i === d.size - 1;
    let rarity: string;
    const x = Math.random();
    if (hero) {
      const forced = p.pity + 1 >= PITY;
      rarity = forced || x < d.hero.legendary ? 'legendary' : x < d.hero.legendary + d.hero.rare ? 'rare' : 'uncommon';
    } else rarity = x < d.slot.rare ? 'rare' : x < d.slot.rare + d.slot.uncommon ? 'uncommon' : 'common';
    let pool = poolFor(p, rarity, d.factions);
    if (!pool.length) pool = poolFor(p, 'rare', d.factions);
    const cid = pick(pool);
    if (rarity === 'legendary') gotLegend = true;
    const foil = Math.random() < d.foil;
    out.push({ id: cid, foil, isNew: addCard(p, cid, foil), rarity: CARDS[cid].rarity });
  }
  p.pity = gotLegend ? 0 : p.pity + 1;
  bump(p, 'packs');
  return out;
}

const UP: Record<string, string> = { common: 'rare', uncommon: 'rare', rare: 'legendary' };

/**
 * The Riposte gamble, once per pack: answer one card you just pulled. Heads, it becomes a random
 * card of a higher rarity (common/uncommon → rare, rare → legendary). Tails, it shatters into double Dust.
 */
export function gamble(p: Profile, pull: Pull): { won: boolean; card?: Pull; dust?: number } {
  const e = p.collection[pull.id];
  if (!e || pull.rarity === 'legendary') return { won: false };
  e.n--;
  if (pull.foil) e.foil--;
  if (e.n <= 0) delete p.collection[pull.id];
  if (Math.random() < 0.5) {
    const pool = poolFor(p, UP[pull.rarity]);
    const id = pick(pool);
    const card = { id, foil: pull.foil, isNew: addCard(p, id, pull.foil), rarity: CARDS[id].rarity };
    bump(p, 'gambleWins');
    return { won: true, card };
  }
  const dust = dustValue(pull.id, pull.foil) * 2 + 10;
  p.dust += dust;
  return { won: false, dust };
}

// ───────── daily market, gift, quests ─────────

export function market(p: Profile, day = todayKey()): NonNullable<Profile['market']> {
  if (p.market?.day === day) return p.market;
  const r = new Rng({ m: hashStr(`market-${day}`) || 1 }, 'm');
  const of = (rar: string) => COLLECTIBLE.filter((c) => c.rarity === rar && isUnlocked(p, c.id)).map((c) => c.id);
  const items = [
    ...r.sample(of('uncommon'), 2).map((id) => ({ id, price: 60 })),
    ...r.sample(of('rare'), 1).map((id) => ({ id, price: 180 })),
    ...r.sample(of('legendary'), 1).map((id) => ({ id, price: 650 })),
  ].map((x) => ({ ...x, sold: false }));
  p.market = { day, items };
  return p.market;
}

export function buyMarket(p: Profile, i: number): boolean {
  const it = market(p).items[i];
  if (!it || it.sold || p.coins < it.price) return false;
  p.coins -= it.price;
  it.sold = true;
  addCard(p, it.id);
  return true;
}

export function giftReady(p: Profile, day = todayKey()): boolean { return p.giftDay !== day; }
export function claimGift(p: Profile, day = todayKey()): boolean {
  if (!giftReady(p, day)) return false;
  p.giftDay = day;
  p.packs.standard = (p.packs.standard ?? 0) + 1;
  return true;
}

interface QuestTpl { id: string; text: (g: number) => string; goals: number[]; reward: number; prog: (r: RunState) => number; max?: boolean }

const QUESTS: QuestTpl[] = [
  { id: 'fights', text: (g) => `Win ${g} fights`, goals: [5, 7], reward: 60, prog: (r) => r.stats.fights - r.stats.elites - r.stats.bosses },
  { id: 'elites', text: (g) => `Defeat ${g} rival${g > 1 ? 's' : ''}`, goals: [1, 2], reward: 70, prog: (r) => r.stats.elites },
  { id: 'chains', text: (g) => `Resolve ${g} chains`, goals: [15, 25], reward: 60, prog: (r) => r.stats.chains },
  { id: 'dmg', text: (g) => `Deal ${g} damage`, goals: [400, 600], reward: 50, prog: (r) => r.stats.dmg },
  { id: 'floor', text: (g) => `Reach floor ${g} in a single run`, goals: [10, 14], reward: 70, prog: (r) => r.floor, max: true },
  { id: 'boss', text: () => 'Defeat a boss', goals: [1], reward: 80, prog: (r) => r.stats.bosses },
  { id: 'dare', text: () => 'Win a Dare', goals: [1], reward: 80, prog: (r) => r.daresWon ?? 0 },
  { id: 'longchain', text: (g) => `Resolve a chain of ${g} links`, goals: [3, 4], reward: 70, prog: (r) => r.stats.maxChain, max: true },
];

function rollQuest(not: string[]): Quest {
  const t = pick(QUESTS.filter((q) => !not.includes(q.id)));
  const goal = pick(t.goals);
  return { id: t.id, text: t.text(goal), goal, prog: 0, reward: t.reward + (goal === t.goals[1] ? 20 : 0), claimed: false };
}

export function quests(p: Profile, day = todayKey()): NonNullable<Profile['quests']> {
  if (p.quests?.day === day) return p.quests;
  const list: Quest[] = [];
  for (let i = 0; i < 3; i++) list.push(rollQuest(list.map((q) => q.id)));
  p.quests = { day, list, rerolled: false };
  return p.quests;
}

export function rerollQuest(p: Profile, i: number): boolean {
  const q = quests(p);
  if (q.rerolled || !q.list[i] || q.list[i].claimed) return false;
  q.list[i] = rollQuest(q.list.map((x) => x.id));
  q.rerolled = true;
  return true;
}

export function claimQuest(p: Profile, i: number): number {
  const q = quests(p).list[i];
  if (!q || q.claimed || q.prog < q.goal) return 0;
  q.claimed = true;
  p.coins += q.reward;
  return q.reward;
}

function progressQuests(p: Profile, run: RunState): string[] {
  const done: string[] = [];
  for (const q of quests(p).list) {
    if (q.claimed || q.prog >= q.goal) continue;
    const t = QUESTS.find((x) => x.id === q.id);
    if (!t) continue;
    const v = t.prog(run);
    q.prog = Math.min(q.goal, t.max ? Math.max(q.prog, v) : q.prog + v);
    if (q.prog >= q.goal) done.push(q.text);
  }
  return done;
}

// ───────── talents ─────────

export function talentPoints(p: Profile): { total: number; spent: number; free: number } {
  const total = levelOf(p.xp); // 1 at level 1, so new players can try the board right away
  const spent = Object.values(p.talents).reduce((a, b) => a + b, 0);
  return { total, spent, free: total - spent };
}

export function schoolSpent(p: Profile, s: School): number {
  return TALENTS.filter((t) => t.school === s).reduce((a, t) => a + (p.talents[t.id] ?? 0), 0);
}

export function canRaise(p: Profile, id: string): boolean {
  const t = TALENT_MAP[id];
  return !!t && talentPoints(p).free > 0 && (p.talents[id] ?? 0) < t.max && schoolSpent(p, t.school) >= 2 * (t.tier - 1);
}

export function raiseTalent(p: Profile, id: string): boolean {
  if (!canRaise(p, id)) return false;
  p.talents[id] = (p.talents[id] ?? 0) + 1;
  return true;
}

export function respec(p: Profile): void { p.talents = {}; fixLoadouts(p); }

export type MetaBonus = RunBonus & { slots?: number; coinPct?: number };

export function metaBonus(p: Profile): MetaBonus {
  const b: MetaBonus = {};
  for (const [id, r] of Object.entries(p.talents)) if (r) TALENT_MAP[id]?.bonus(r, b);
  return b;
}

// ───────── loadouts ─────────

export const BASE_SLOTS = 1;
export function loadoutSlots(p: Profile): number { return BASE_SLOTS + (metaBonus(p).slots ?? 0); }
/** v0.8: a loadout may hold at most this many Rare swaps (the "signature" card). Legendaries can't be slotted: owning one adds it to run drafts. */
export const LOADOUT_STAR_CAP = 1;
export const isStar = (id: string): boolean => ['rare', 'legendary'].includes(CARDS[id]?.rarity);
export function starsUsed(l: string[], def: string[]): number { return l.filter((id, i) => id !== def[i] && isStar(id)).length; }

export function loadout(p: Profile, ch: CharId): string[] {
  const def = CHARACTERS[ch].deck;
  const l = p.loadouts[ch];
  if (!l || l.length !== def.length) return [...def];
  // Older saves may hold Legendaries, more Rares than the v0.8 cap, or more swaps than the slots: keep the first legal ones.
  let stars = 0, swaps = 0;
  const slots = loadoutSlots(p);
  return l.map((id, i) => {
    if (id === def[i]) return id;
    if (!CARDS[id] || CARDS[id].rarity === 'legendary' || (isStar(id) && stars >= LOADOUT_STAR_CAP) || swaps >= slots) return def[i];
    if (isStar(id)) stars++;
    swaps++;
    return id;
  });
}

export function swapsUsed(p: Profile, ch: CharId, l = loadout(p, ch)): number {
  return l.filter((id, i) => id !== CHARACTERS[ch].deck[i]).length;
}

/** Cards a duelist may slot in: owned, from its factions (no Legendaries since v0.8). */
export function loadoutOptions(p: Profile, ch: CharId): string[] {
  const fs = factionsOf(ch);
  return Object.keys(p.collection).filter((id) => fs.includes(CARDS[id].faction) && isUnlocked(p, id) && CARDS[id].rarity !== 'legendary')
    .sort((a, b) => CARDS[a].faction.localeCompare(CARDS[b].faction) || CARDS[a].name.localeCompare(CARDS[b].name));
}

export function setLoadoutSlot(p: Profile, ch: CharId, idx: number, id: string | null): boolean {
  const l = loadout(p, ch);
  const def = CHARACTERS[ch].deck;
  if (idx < 0 || idx >= l.length) return false;
  const next = [...l];
  next[idx] = id ?? def[idx];
  if (id && id !== def[idx]) {
    if (!loadoutOptions(p, ch).includes(id)) return false;
    if (next.filter((x) => x === id).length > owned(p, id)) return false;
    if (swapsUsed(p, ch, next) > loadoutSlots(p)) return false;
    if (starsUsed(next, def) > LOADOUT_STAR_CAP) return false;
  }
  p.loadouts[ch] = next;
  return true;
}

/** Keep loadouts legal after dusting or a respec: revert the newest illegal swaps to the starter card. */
export function fixLoadouts(p: Profile): void {
  for (const ch of Object.keys(p.loadouts) as CharId[]) {
    const def = CHARACTERS[ch].deck;
    const l = loadout(p, ch);
    const count: Record<string, number> = {};
    let swaps = 0;
    for (let i = 0; i < l.length; i++) {
      if (l[i] === def[i]) continue;
      count[l[i]] = (count[l[i]] ?? 0) + 1;
      swaps++;
      if (count[l[i]] > owned(p, l[i]) || swaps > loadoutSlots(p)) { l[i] = def[i]; swaps--; }
    }
    p.loadouts[ch] = l;
  }
}

// ───────── achievements ─────────

export function grant(p: Profile, r: AchReward & TierReward): void {
  if (r.coins) p.coins += r.coins;
  if (r.dust) p.dust += r.dust;
  if (r.pack) p.packs[r.pack] = (p.packs[r.pack] ?? 0) + 1;
  if (r.card) addCard(p, r.card);
  if (r.cosmetic && !p.cosmetics.owned.includes(r.cosmetic)) p.cosmetics.owned.push(r.cosmetic);
}

export function rewardText(r: AchReward & TierReward): string {
  const out: string[] = [];
  if (r.coins) out.push(`${r.coins} Coins`);
  if (r.dust) out.push(`${r.dust} Dust`);
  if (r.pack) out.push(PACKS[r.pack].name);
  if (r.relic) out.push(`keepsake: ${RELICS[r.relic].name}`);
  if (r.card) out.push(`card: ${CARDS[r.card].name}`);
  if ((r as TierReward).cosmetic) { const c = COSMETIC_MAP[(r as TierReward).cosmetic!]; out.push(`${c.icon} ${c.name}`); }
  return out.join(' · ');
}

/** Award any newly completed achievements. Returns their ids. */
export function checkAchievements(p: Profile): string[] {
  const got: string[] = [];
  for (const a of ACHIEVEMENTS) {
    if (p.ach[a.id] || !a.done(p)) continue;
    p.ach[a.id] = todayKey();
    grant(p, a.reward);
    got.push(a.id);
  }
  return got;
}

/** Relics and cards that the run is allowed to offer because of the collection and achievements. */
export function runUnlocks(p: Profile): string[] {
  const relics = ACHIEVEMENTS.filter((a) => p.ach[a.id] && a.reward.relic).map((a) => a.reward.relic!);
  const legends = Object.keys(p.collection).filter((id) => CARDS[id].rarity === 'legendary');
  return [...relics, ...legends];
}

// ───────── runs ─────────

export function runCoins(run: RunState, pct = 0): number {
  const base = run.floor * 3 + run.stats.elites * 12 + run.stats.bosses * 35 + (run.champs ?? 0) * 20
    + (run.daresWon ?? 0) * 10 + (run.won ? 120 : 0) + run.ascension * 8;
  return Math.round(base * (1 + pct / 100));
}

/** Options for newRun() from the profile. Daily Duels skip all of it so every player starts equal. */
export function runSetup(p: Profile, ch: CharId, daily: boolean) {
  if (daily) return { familiar: p.cosmetics.familiar ?? undefined };
  const b = metaBonus(p);
  const foils = Object.entries(p.collection).filter(([, e]) => e.foil > 0).map(([id]) => id);
  return {
    bonus: b, owned: runUnlocks(p), favored: Object.keys(p.collection), loadout: loadout(p, ch),
    imprints: { ...p.imprints }, foils, vows: { ...p.vows }, familiar: p.cosmetics.familiar ?? undefined,
    nemesis: p.nemesis, nightOk: p.wins > 0,
  };
}

/** recordRun + the economy: Coins, counters, quests, level rewards, achievements, souvenir picks. */
export function finishRun(p: Profile, run: RunState): RunResult {
  const res = recordRun(p, run);
  const coins = runCoins(run, (metaBonus(p).coinPct ?? 0) + 5 * (run.heat ?? 0));
  p.coins += coins;
  bump(p, 'fights', run.stats.fights);
  bump(p, 'elites', run.stats.elites);
  bump(p, 'bosses', run.stats.bosses);
  bump(p, 'champs', run.champs ?? 0);
  bump(p, 'dares', run.daresWon ?? 0);
  bump(p, 'gold', run.stats.goldEarned);
  for (let l = res.levelBefore + 1; l <= res.levelAfter; l++) grant(p, LEVEL_REWARD);
  const qs = progressQuests(p, run);
  const ach = checkAchievements(p);
  // Souvenirs: keep cards from the final deck in your collection.
  const keep = run.won ? 2 : run.stats.bosses >= 1 ? 1 : run.floor >= 5 ? 1 : 0;
  const mastered = addMastery(p, run.stats.plays ?? {});
  for (const [k, n] of Object.entries(run.stats.kills ?? {})) p.kills[k] = (p.kills[k] ?? 0) + n;
  bump(p, 'omens', run.stats.omensUsed ?? 0);
  bump(p, 'steals', run.stats.steals ?? 0);
  bump(p, 'mimics', run.stats.mimics ?? 0);
  // v0.5
  bump(p, 'exhumes', run.stats.exhumes ?? 0);
  bump(p, 'venueWins', run.stats.venueWins ?? 0);
  bump(p, 'blessings', run.stats.blessings ?? 0);
  // v0.6
  bump(p, 'rares', run.rares ?? 0);
  bump(p, 'surprises', run.surprises ?? 0);
  bump(p, 'roads', run.stats.roads ?? 0);
  bump(p, 'shrines', run.stats.shrines ?? 0);
  bump(p, 'mysteries', run.stats.mysteries ?? 0);
  if (run.won && run.fate && !run.daily && !run.weekly) bump(p, 'fateWins');
  p.counters.primeMax = Math.max(p.counters.primeMax ?? 0, run.stats.primeMax ?? 0);
  p.counters.converge = Math.max(p.counters.converge ?? 0, run.stats.converge ?? 0);
  const night = nightOf(run);
  if (night) p.bestNight = Math.max(p.bestNight ?? 0, night);
  updateNemesis(p, run);
  if (run.epilogue === 'won') {
    p.reflections[run.character] = (p.reflections[run.character] ?? 0) + 1;
    if (!p.cosmetics.owned.includes('title_mirror')) p.cosmetics.owned.push('title_mirror');
  }
  if ((run.acts ?? []).some((v) => v) && run.stats.bosses > 0) {
    for (let a = 1; a <= run.stats.bosses; a++) if (run.acts?.[a - 1]) bump(p, 'altBosses');
  }
  let heatMsg: string | null = null;
  const heat = run.heat ?? 0;
  if (run.won && heat > 0 && !run.daily && !run.weekly) {
    const prev = p.heatWins[run.character] ?? 0;
    if (heat > prev) {
      p.heatWins[run.character] = heat;
      const hit = HEAT_MILESTONES.filter((m) => m > prev && m <= heat);
      if (hit.length) {
        const bonus = hit.reduce((a, m) => a + m * 25, 0);
        p.coins += bonus;
        heatMsg = `New Wager record ${heat}: +${bonus} Coins`;
        if (heat >= 10 && !p.cosmetics.owned.includes('title_heat')) p.cosmetics.owned.push('title_heat');
      } else heatMsg = `New Wager record: ${heat}`;
    }
  }
  if (run.weekly) {
    const prev = p.weekly[run.weekly];
    const sc = runScore(run);
    if (!prev || prev.score < sc) p.weekly[run.weekly] = { score: sc, floor: run.floor, won: !!run.won, claimed: prev?.claimed ?? false };
  }
  const renown = Math.round((runXp(run) + (run.stats.style ?? 0) / 25) * (1 + 0.05 * heat));
  p.season.renown += renown;
  p.history = [{
    date: new Date().toISOString().slice(0, 16).replace('T', ' '), character: run.character, won: !!run.won, act: run.act, floor: run.floor,
    score: res.score, heat, style: run.stats.style ?? 0, mode: (run.daily ? 'daily' : run.weekly ? 'weekly' : 'run') as RunRecord['mode'], asc: run.ascension,
    killer: run.won ? undefined : run.lastEnc || undefined,
  }, ...p.history].slice(0, 25);
  const ach2 = checkAchievements(p);
  return { ...res, coins, ach: [...ach, ...ach2], quests: qs, keep, renown, mastered, heatMsg };
}

/**
 * v0.5 The Nemesis: the normal or elite fight that ended a run comes back, promoted, in the next one.
 * Beat it and the grudge is settled; lose to it again and it grows another title (it moves on after its third title).
 */
export function updateNemesis(p: Profile, run: RunState): void {
  if (run.daily || run.weekly || run.arena || run.puzzle) return;
  if (run.nemesis?.slain) { p.nemesis = null; bump(p, 'nemeses'); }
  const f = run.lastFight;
  if (run.won || run.screen !== 'defeat' || !f || f.kind === 'boss' || run.stats.fights < 1) return;
  const same = p.nemesis && p.nemesis.enemies.join('+') === f.enemies.join('+');
  const name = f.name.replace(/^Nemesis: /, '');
  // v0.8: a Nemesis that has beaten you three times running moves on, so a profile can't get stuck behind one fight.
  if (same && p.nemesis!.grudge >= 3) { p.nemesis = null; return; }
  p.nemesis = { enemies: f.enemies, name, act: Math.min(3, f.act), kind: f.kind, grudge: same ? p.nemesis!.grudge + 1 : 1 };
}

/** Cards from the final deck that can be kept as a souvenir. */
export function souvenirOptions(run: RunState): string[] {
  return [...new Set(run.deck.map((c) => c.id))].filter((id) => ['common', 'uncommon', 'rare', 'legendary'].includes(CARDS[id].rarity));
}

// ───────── card mastery ─────────

/** Add plays; grant Dust for each new mastery level. Returns "Card Name → Silver" lines. */
export function addMastery(p: Profile, plays: Record<string, number>): string[] {
  const out: string[] = [];
  for (const [id, n] of Object.entries(plays)) {
    const d = CARDS[id];
    if (!d || ['curse', 'enemy'].includes(d.faction) || d.rarity === 'special') continue;
    const before = masteryLevel(p.mastery[id] ?? 0);
    p.mastery[id] = (p.mastery[id] ?? 0) + n;
    const after = masteryLevel(p.mastery[id]);
    for (let l = before + 1; l <= after; l++) {
      p.dust += MASTERY_DUST[l - 1];
      out.push(`${d.name} → mastery ${l}`);
      if (l === 5) bump(p, 'mastered');
    }
  }
  return out;
}

// ───────── season track ─────────

export function seasonTier(p: Profile): number { return Math.min(SEASON.tiers, Math.floor(p.season.renown / SEASON.tierRenown)); }

/** Claim every reached, unclaimed tier. Returns the rewards granted. */
export function claimSeason(p: Profile): TierReward[] {
  const got: TierReward[] = [];
  const tier = seasonTier(p);
  while (p.season.claimed < tier) {
    const r = SEASON_TRACK[p.season.claimed];
    grant(p, r);
    got.push(r);
    p.season.claimed++;
  }
  return got;
}

// ───────── weekly gauntlet ─────────

export function weeklyReward(rec: { floor: number; won: boolean }): { coins: number; pack: string } {
  return { coins: 50 + rec.floor * 6 + (rec.won ? 250 : 0), pack: rec.won ? 'legend' : rec.floor >= 9 ? 'gilt' : 'standard' };
}

export function claimWeekly(p: Profile, key: string): { coins: number; pack: string } | null {
  const rec = p.weekly[key];
  if (!rec || rec.claimed) return null;
  const rw = weeklyReward(rec);
  rec.claimed = true;
  grant(p, rw);
  return rw;
}

// ───────── cosmetics ─────────

export function equip(p: Profile, id: string): boolean {
  const c = COSMETIC_MAP[id];
  if (!c || !p.cosmetics.owned.includes(id)) return false;
  if (c.kind === 'familiar') p.cosmetics.familiar = p.cosmetics.familiar === id ? null : id;
  else if (c.kind === 'back') p.cosmetics.back = id;
  else p.cosmetics.title = id;
  return true;
}
