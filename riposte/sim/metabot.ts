// v0.8 profile modes for the balance harness: a "fresh" player (blank profile every run) and a "career"
// player (one profile per class that keeps its Coins, packs, collection, talents, loadout, levels, unlocks,
// achievements, souvenirs, Legacy echoes and Nemesis between runs). The meta decisions here are simple
// and greedy, the way an engaged player would spend: talents first, then class packs, then loadouts.
import type { CharId, RunState } from '../src/engine/types';
import type { Profile } from '../src/engine/meta';
import { newProfile, levelOf, mintLegacy } from '../src/engine/meta';
import * as eco from '../src/engine/economy';
import { newRun } from '../src/engine/run';
import { CARDS, COLLECTIBLE } from '../src/data/cards';
import { CHARACTERS } from '../src/data/characters';
import { TALENTS } from '../src/data/talents';
import { PACKS } from '../src/data/packs';

const RANK: Record<string, number> = { starter: 0, common: 1, uncommon: 2, rare: 3, legendary: 4 };

/** Seeded Math.random so pack pulls and quests are repeatable (mulberry32). */
export function seedMathRandom(seed: number): void {
  let a = seed >>> 0;
  Math.random = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function freshProfile(): Profile {
  const p = newProfile();
  p.tutorialDone = true;
  return p;
}

/** Start a run the way the app does (main.ts startRun), from a profile. */
export function profileRun(p: Profile, ch: CharId, seed: number, asc: number): RunState {
  const off = (process.env.ABLATE ?? '').split(',');
  if (off.includes('talents')) p = { ...p, talents: {} };
  for (const sc of ['guard', 'purse', 'feint']) if (off.includes(sc)) p = { ...p, talents: Object.fromEntries(Object.entries(p.talents).filter(([id]) => TALENTS.find((t) => t.id === id)?.school !== sc)) };
  if (off.includes('loadout')) p = { ...p, loadouts: {} };
  const echoes = [...p.legacy.map((l) => ({ label: l.label, cards: l.cards })), ...p.rivals.map((x) => ({ label: x.label, cards: x.cards }))];
  return newRun({
    character: ch, ascension: asc, seed, level: levelOf(p.xp), echoes, tutorial: !p.tutorialDone,
    fates: p.tutorialDone && process.env.FATES !== '0', ...eco.runSetup(p, ch, false),
    ...(off.includes('legends') ? { owned: [] } : {}), ...(off.includes('level') ? { level: 1 } : {}), ...(off.includes('nemesis') ? { nemesis: null } : {}),
  });
}

// Guard first (survival), then Feint (loadout slots, better drafts), then Coin.
const TALENT_ORDER = ['vitality', 'signature', 'vitality', 'opening_guard', 'vitality', 'signature', 'opening_guard', 'second_look',
  'field_dressing', 'prepared', 'field_dressing', 'heirloom', 'signature', 'second_look', 'connoisseur', 'pocket_money', 'haggler',
  'pocket_money', 'bounty', 'haggler', 'bounty', 'patron', 'patron'];

/** After a run: bank it, then spend like a keen player. */
export function afterRun(p: Profile, run: RunState): void {
  const res = eco.finishRun(p, run);
  p.tutorialDone = true;
  // Souvenirs: keep the best cards from the final deck.
  const opts = eco.souvenirOptions(run).sort((a, b) => RANK[CARDS[b].rarity] - RANK[CARDS[a].rarity]);
  for (const id of opts.slice(0, res.keep)) eco.addCard(p, id);
  if (run.won && res.mintable) mintLegacy(p, run);
  eco.claimSeason(p);
  // Talents: follow the order, skipping anything not yet legal.
  for (let guard = 0; guard < 40 && eco.talentPoints(p).free > 0; guard++) {
    const next = TALENT_ORDER.find((id) => eco.canRaise(p, id)) ?? TALENTS.find((t) => eco.canRaise(p, t.id))?.id;
    if (!next) break;
    eco.raiseTalent(p, next);
  }
  // Packs: the class's own faction packs, else the Duelist pack.
  const ch = run.character;
  const fpacks = CHARACTERS[ch].factions.filter((f) => PACKS[f]);
  for (let i = 0; i < 20; i++) {
    const id = fpacks.find((f) => p.coins >= PACKS[f].price) ?? (p.coins >= PACKS.standard.price ? 'standard' : null);
    if (!id || !eco.buyPack(p, id)) break;
  }
  for (const id of Object.keys(p.packs)) while (p.packs[id] > 0) eco.openPack(p, id);
  // Dust the extras, then craft class rares (Legendaries at 1600) the profile lacks.
  eco.dustExtras(p);
  const fs = eco.loadoutOptions(p, ch).length >= 0 ? [...CHARACTERS[ch].factions] : [];
  for (const rar of ['legendary', 'rare'] as const) {
    const want = COLLECTIBLE.filter((c) => c.rarity === rar && fs.includes(c.faction as never) && !p.collection[c.id] && eco.isUnlocked(p, c.id));
    for (const c of want) { if (p.dust < eco.craftCost(c.id)) break; eco.craft(p, c.id); }
  }
  setBestLoadout(p, ch);
}

/**
 * Swap starter Strikes and Guards like for like: a Strike for the best owned attack, a Guard for the best
 * owned non-attack (cost 2 or less), alternating so the deck keeps its damage and its defence.
 */
export function setBestLoadout(p: Profile, ch: CharId): void {
  const def = CHARACTERS[ch].deck;
  const atk = (id: string) => CARDS[id].type === 'attack';
  const options = eco.loadoutOptions(p, ch).filter((id) => CARDS[id].type !== 'curse' && CARDS[id].cost <= 2)
    .sort((a, b) => RANK[CARDS[b].rarity] - RANK[CARDS[a].rarity] || CARDS[a].cost - CARDS[b].cost);
  const strikes = def.map((id, i) => [id, i] as const).filter(([id]) => CARDS[id].rarity === 'starter' && atk(id)).map(([, i]) => i);
  const guards = def.map((id, i) => [id, i] as const).filter(([id]) => CARDS[id].rarity === 'starter' && !atk(id)).map(([, i]) => i);
  delete p.loadouts[ch];
  const used: Record<string, number> = {};
  for (let k = 0; k < eco.loadoutSlots(p); k++) {
    const wantAtk = k % 2 === 0;
    const slot = (wantAtk ? strikes : guards).shift();
    if (slot === undefined) continue;
    for (const id of options) {
      if (atk(id) !== wantAtk || (used[id] ?? 0) >= eco.owned(p, id)) continue;
      if (eco.setLoadoutSlot(p, ch, slot, id)) { used[id] = (used[id] ?? 0) + 1; break; }
    }
  }
}
