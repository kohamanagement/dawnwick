import { CHARACTERS } from '../data/characters';
import type { CharId, ModId, NemesisInfo, RunState } from './types';
import { canMint, deckCodes, runScore, runXp } from './run';
import { hashStr } from './rng';
import { CHAR_LIST } from '../data/characters';
import { TALENT_MAP } from '../data/talents';
import { CUT12_TWIN } from '../data/cuts12';
import { CARDS } from '../data/cards';
import { RELIC_LIST } from '../data/relics';
import { DAILY_MODS } from './run';
import { TWISTS, VOWS } from '../data/vows';
import { newAdsState, type AdsState } from '../ads/policy';

export interface Legacy {
  id: string;
  label: string;
  character: CharId;
  cards: string[];
  won: boolean;
  floor: number;
  date: string;
}

export interface Settings {
  text: 's' | 'm' | 'l';
  reduceMotion: boolean;
  fast: boolean;
  leftHanded: boolean;
  /** v0.3 */
  turbo?: boolean;
  sfx?: number;
  music?: number;
  /** v0.13: separate on/off switches (the volume sliders keep their level while off). */
  sfxOff?: boolean;
  musicOff?: boolean;
  /** v0.13: iPhone: keep playing with the ring/silent switch on. */
  ignoreSilent?: boolean;
  /** v0.4: show the damage preview on the selected card (default on). */
  preview?: boolean;
  /** v0.7: how hand Counters are offered: ask each time (default), play automatically, or never. */
  counters?: 'ask' | 'auto' | 'off';
  /** v0.10: vibrate when you take a hit (default on; off under Reduce motion too). */
  haptics?: boolean;
  /** v0.18: show the "Tell the Dealer" playtest feedback buttons (unset = on in beta builds, off in release). */
  tellDealer?: boolean;
}

export interface RunRecord {
  date: string; character: CharId; won: boolean; act: number; floor: number; score: number; heat: number; style: number;
  mode: 'run' | 'daily' | 'weekly'; killer?: string; asc: number;
}

/** Arena: draft a deck, then duel rivals' saved decks until 7 wins or 3 losses (async PvP, no servers needed). */
export interface ArenaState {
  character: CharId;
  stage: 'draft' | 'ready' | 'pick' | 'done';
  deck: string[];
  picks: string[][];
  pickNo: number;
  wins: number;
  losses: number;
  rival: { label: string; cards: string[]; title: string } | null;
  spoils: string[] | null;
  /** The duel in progress (a one-fight RunState), so a reload can resume it. */
  duel: RunState | null;
  seed: number;
}

export interface Profile {
  v: 1;
  xp: number;
  runs: number;
  wins: number;
  bestFloor: number;
  ascension: Record<CharId, number>;
  legacy: Legacy[];
  daily: Record<string, { score: number; character: CharId; won: boolean; floor: number }>;
  settings: Settings;
  tutorialDone: boolean;
  totalChains: number;
  longestChain: number;
  // ── meta economy (v0.2) ──
  coins: number;
  dust: number;
  /** Owned copies per card id. Starter cards are free and unlimited, so they never appear here. */
  collection: Record<string, { n: number; foil: number }>;
  /** Sigil imprinted on every copy of a card id you bring into runs. */
  imprints: Record<string, ModId>;
  /** Starting deck per duelist (card ids). Empty means the default starter deck. */
  loadouts: Partial<Record<CharId, string[]>>;
  talents: Record<string, number>;
  /** Achievement id → date earned. */
  ach: Record<string, string>;
  counters: Record<string, number>;
  charWins: Record<string, number>;
  /** Unopened packs by pack id. */
  packs: Record<string, number>;
  pity: number;
  quests: { day: string; list: Quest[]; rerolled: boolean } | null;
  market: { day: string; items: { id: string; price: number; sold: boolean }[] } | null;
  giftDay: string;
  newCards: string[];
  seen: Record<string, boolean>;
  // ── v0.3 ──
  /** Card mastery: total plays per card id. */
  mastery: Record<string, number>;
  masteryClaimed: Record<string, number>;
  season: { id: string; renown: number; claimed: number };
  cosmetics: { owned: string[]; familiar: string | null; back: string; title: string };
  history: RunRecord[];
  kills: Record<string, number>;
  /** Highest Heat won per character. */
  heatWins: Partial<Record<CharId, number>>;
  vows: Record<string, number>;
  weekly: Record<string, { score: number; floor: number; won: boolean; claimed: boolean }>;
  arena: ArenaState | null;
  arenaBest: number;
  arenaRuns: number;
  /** Decks imported from codes (they join the Echo and Arena rival pools). */
  rivals: { label: string; character: CharId; cards: string[] }[];
  // ── v0.4 ──
  /** Riddles of the Chain: puzzle id → fewest cards used to solve it (0 = unsolved). */
  puzzles: Record<string, number>;
  /** The Reflection (Act 4) wins per character. */
  reflections: Partial<Record<CharId, number>>;
  // ── v0.5 ──
  /** The fight that killed you last: it returns, promoted, in your next run. */
  nemesis: NemesisInfo | null;
  /** Deepest night reached in the Long Night. */
  bestNight: number;
  // ── v0.14 ──
  /** The deck you finished your last run with: on your second run it sits down as the first Rival (an Echo). */
  lastDeck: { label: string; cards: string[] } | null;
  /** Echo duels: how often you met an Echo of a saved deck, beat one, or fell to one. */
  echoStats: { met: number; youBeat: number; beatYou: number };
  // ── v0.17 ──
  /** Ads, consent and the Last Word Edition (src/ads/policy.ts). */
  ads: AdsState;
}

export interface Quest { id: string; text: string; goal: number; prog: number; reward: number; claimed: boolean }

export const LEVELS = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 4900, 5900, 7000, 8200, 9500, 10900, 12400, 14000, 15700];

/** Shown in Settings and the welcome popup; a test keeps it equal to package.json. */
export const APP_VERSION = '0.18.0';

/**
 * What each level unlocks, derived from the data (characters, then cards, then relics)
 * so the level-up popup and hub can never drift from characters.ts. Level 1 is the start.
 */
export const UNLOCKS: Record<number, string> = (() => {
  const by: Record<number, string[]> = {};
  const add = (lvl: number | undefined, name: string) => { if (lvl && lvl > 1) (by[lvl] ??= []).push(name); };
  for (const c of CHAR_LIST) add(c.unlock, c.name);
  for (const c of Object.values(CARDS)) if (!c.gen) add(c.unlock, c.name);
  for (const r of RELIC_LIST) add(r.unlock, r.name);
  const out: Record<number, string> = {};
  for (const [l, names] of Object.entries(by)) out[+l] = names.join(', ');
  return out;
})();
/** Characters open from the first run (unlock level 0 or 1). */
export const STARTING_CHARS = CHAR_LIST.filter((c) => c.unlock <= 1).map((c) => c.name);
/** Every level up also pays this, plus 1 talent point. */
export const LEVEL_REWARD = { coins: 50, pack: 'standard' };

export function levelOf(xp: number): number {
  let l = 1;
  for (let i = 1; i < LEVELS.length; i++) if (xp >= LEVELS[i]) l = i + 1;
  return l;
}

export function newProfile(): Profile {
  return {
    v: 1, xp: 0, runs: 0, wins: 0, bestFloor: 0,
    ascension: { duelist: 0, warden: 0, hollow: 0, sharp: 0, magpie: 0, sexton: 0, arbiter: 0, tempest: 0, rimeblade: 0, beastcaller: 0, geomancer: 0, alchemist: 0, nightblade: 0 }, legacy: [], daily: {},
    settings: { text: 'm', reduceMotion: false, fast: false, leftHanded: false },
    tutorialDone: false, totalChains: 0, longestChain: 0,
    coins: 150, dust: 0, collection: {}, imprints: {}, loadouts: {}, talents: {}, ach: {}, counters: {}, charWins: {},
    packs: { standard: 2 }, pity: 0, quests: null, market: null, giftDay: '', newCards: [], seen: {},
    mastery: {}, masteryClaimed: {}, season: { id: 's1', renown: 0, claimed: 0 },
    cosmetics: { owned: ['back_classic', 'title_novice'], familiar: null, back: 'back_classic', title: 'title_novice' },
    history: [], kills: {}, heatWins: {}, vows: {}, weekly: {}, arena: null, arenaBest: 0, arenaRuns: 0, rivals: [],
    puzzles: {}, reflections: {}, nemesis: null, bestNight: 0, lastDeck: null, echoStats: { met: 0, youBeat: 0, beatYou: 0 },
    ads: newAdsState(),
  };
}

// Storage is best-effort: private browsing or a locked-down webview may throw.
export const store = {
  get(key: string): string | null { try { return localStorage.getItem(key); } catch { return null; } },
  set(key: string, val: string): void { try { localStorage.setItem(key, val); } catch { /* ignore */ } },
  del(key: string): void { try { localStorage.removeItem(key); } catch { /* ignore */ } },
};

// The game was called Riposte until v0.14.1; storage keys and seeds keep the old prefix so saves and dailies carry over.
const PKEY = 'riposte.profile.v1';
const RKEY = 'riposte.run.v1';

export function loadProfile(): Profile {
  const raw = store.get(PKEY);
  if (!raw) return newProfile();
  try { return migrate(JSON.parse(raw)); } catch { return newProfile(); }
}
/** Older saves: shallow-merge new top-level fields, then fill nested records that gained keys. */
export function migrate(raw: Partial<Profile>): Profile {
  const base = newProfile();
  const p = { ...base, ...raw } as Profile;
  p.ascension = { ...base.ascension, ...(raw.ascension ?? {}) };
  p.settings = { ...base.settings, ...(raw.settings ?? {}) };
  p.cosmetics = { ...base.cosmetics, ...(raw.cosmetics ?? {}) };
  p.ads = { ...base.ads, ...(raw.ads ?? {}) };
  p.season = raw.season?.id === base.season.id ? { ...base.season, ...raw.season } : base.season;
  // v0.8 lowered some talent caps: refund ranks above the new cap (talent points are derived, so clamping refunds them).
  p.talents = Object.fromEntries(Object.entries(raw.talents ?? {}).map(([id, r]) => [id, Math.min(r, TALENT_MAP[id]?.max ?? 0)]).filter(([, r]) => (r as number) > 0));
  forgetCutCards(p);
  return p;
}

/** v0.12: where a cut card's copies go (the card it played like, if that one still exists). */
export function twinOf(id: string): string | null {
  for (let k = 0, t: string | undefined = CUT12_TWIN[id]; t && k < 8; t = CUT12_TWIN[t], k++) if (CARDS[t]) return t;
  return null;
}
/** A deck code ("id", "id+1", "id+2") with a cut card swapped for its twin, keeping the upgrade. */
const retwin = (code: string): string => { const [id, up] = code.split('+'); if (CARDS[id]) return code; const t = twinOf(id); return t ? (up ? `${t}+${up}` : t) : code; };
/** v0.9 Clean Cut removed a few repeat cards: forget them in a save. Each owned copy refunds 20 Dust.
 *  v0.12: copies of a card that played like another become copies of that card instead. */
const known = (code: string): boolean => !!CARDS[code.split('+')[0]];
export function forgetCutCards(p: Profile): void {
  for (const [id, c] of Object.entries(p.collection ?? {})) if (!CARDS[id]) {
    const t = twinOf(id);
    const e = t ? p.collection[t] : undefined;
    if (t && e) { e.n += c.n ?? 0; e.foil = (e.foil ?? 0) + (c.foil ?? 0); } else if (t) p.collection[t] = { ...c }; else p.dust += 20 * (c.n ?? 0);
    delete p.collection[id];
  }
  for (const k of Object.keys(p.loadouts ?? {}) as CharId[]) p.loadouts[k] = p.loadouts[k]!.map(retwin);
  for (const l of p.legacy ?? []) l.cards = l.cards.map(retwin);
  for (const r of p.rivals ?? []) r.cards = r.cards.map(retwin);
  // (then the v0.9 filters below drop whatever has no twin)
  for (const id of Object.keys(p.imprints ?? {})) if (!CARDS[id]) delete p.imprints[id];
  for (const k of Object.keys(p.loadouts ?? {}) as CharId[]) p.loadouts[k] = p.loadouts[k]!.filter(known);
  p.newCards = (p.newCards ?? []).filter(known);
  for (const l of p.legacy ?? []) l.cards = l.cards.filter(known);
  for (const r of p.rivals ?? []) r.cards = r.cards.filter(known);
  const a = p.arena;
  if (a) {
    a.deck = a.deck.filter(known);
    a.picks = a.picks.map((x) => x.filter(known));
    if (a.rival) a.rival.cards = a.rival.cards.filter(known);
    if (a.spoils) a.spoils = a.spoils.filter(known);
    if (a.duel) scrubRun(a.duel);
  }
}
/** v0.9: drop cards that no longer exist from a saved run (deck, combat piles, rewards, shop). */
export function scrubRun(r: RunState): RunState {
  // v0.12: a cut card with a twin becomes that card (same upgrade); the rest are dropped.
  const swap = (c: { id: string }): void => { if (!CARDS[c.id]) { const t = twinOf(c.id); if (t) c.id = t; } };
  r.deck.forEach(swap);
  if (r.combat) for (const k of ['draw', 'hand', 'discard', 'exhausted', 'crypt'] as const) r.combat[k]?.forEach(swap);
  r.combat?.player.traps.forEach(swap);
  const ok = (c: { id: string }): boolean => !!CARDS[c.id];
  r.deck = r.deck.filter(ok);
  const cb = r.combat;
  if (cb) {
    for (const k of ['draw', 'hand', 'discard', 'exhausted', 'crypt'] as const) if (cb[k]) cb[k] = cb[k]!.filter(ok);
    cb.player.traps = cb.player.traps.filter(ok);
  }
  if (r.reward?.cards) r.reward.cards = r.reward.cards.filter(known);
  if (r.shop) r.shop.cards = r.shop.cards.filter(ok);
  return r;
}

export function saveProfile(p: Profile): void { store.set(PKEY, JSON.stringify(p)); }

export function loadRun(): RunState | null {
  const raw = store.get(RKEY);
  if (!raw) return null;
  try { const r = JSON.parse(raw) as RunState; return r.finished ? null : scrubRun(r); } catch { return null; }
}
export function saveRun(r: RunState | null): void { if (r && !r.finished) store.set(RKEY, JSON.stringify(r)); else store.del(RKEY); }

export function unlockedChars(p: Profile): CharId[] {
  const lvl = levelOf(p.xp);
  return CHAR_LIST.filter((c) => c.unlock <= lvl).map((c) => c.id);
}

export interface RunResult {
  xp: number; levelBefore: number; levelAfter: number; score: number; newAscension: boolean; mintable: boolean;
  coins: number; keep: number; ach: string[]; quests: string[];
  renown?: number; mastered?: string[]; heatMsg?: string | null;
}

/** Apply a finished run to the profile. Economy side effects (Coins, quests, achievements) live in economy.ts. */
export function recordRun(p: Profile, run: RunState): RunResult {
  const levelBefore = levelOf(p.xp);
  const xp = runXp(run);
  p.xp += xp;
  p.runs++;
  // v0.14: remember the deck, and tally Echo duels for the title screen.
  if (!run.daily && !run.weekly && !run.arena && !run.puzzle && !run.tutorial) p.lastDeck = { label: `your last ${CHARACTERS[run.character].name}`, cards: deckCodes(run) };
  const es = (p.echoStats ??= { met: 0, youBeat: 0, beatYou: 0 });
  es.met += run.stats.echoMet ?? 0; es.youBeat += run.stats.echoWon ?? 0;
  if (!run.won && run.lastFight?.enemies[0]?.startsWith('echo')) es.beatYou++;
  p.bestFloor = Math.max(p.bestFloor, run.floor);
  p.totalChains += run.stats.chains;
  p.longestChain = Math.max(p.longestChain, run.stats.maxChain);
  let newAscension = false;
  if (run.won) {
    p.wins++;
    if (!run.daily && !run.weekly && run.ascension >= p.ascension[run.character] && run.ascension < 10) {
      p.ascension[run.character] = run.ascension + 1;
      newAscension = true;
    }
  }
  const score = runScore(run);
  if (run.daily) {
    const prev = p.daily[run.daily];
    if (!prev || prev.score < score) p.daily[run.daily] = { score, character: run.character, won: !!run.won, floor: run.floor };
  }
  if (run.won) p.charWins[run.character] = (p.charWins[run.character] ?? 0) + 1;
  return { xp, levelBefore, levelAfter: levelOf(p.xp), score, newAscension, mintable: canMint(run), coins: 0, keep: 0, ach: [], quests: [] };
}

const ADJ = ['Ashen', 'Crimson', 'Silent', 'Tidal', 'Hollow', 'Gilded', 'Feral', 'Patient', 'Reckless', 'Burning'];
const NOUN = ['Gambit', 'Riposte', 'Vigil', 'Pact', 'Requiem', 'Gauntlet', 'Mirror', 'Bargain', 'Crown', 'Tempest'];

export function mintLegacy(p: Profile, run: RunState): Legacy {
  const h = hashStr(`${run.seed}:${run.floor}`);
  const leg: Legacy = {
    id: `L${run.seed}`,
    label: `${ADJ[h % ADJ.length]} ${NOUN[(h >>> 4) % NOUN.length]}`,
    character: run.character, cards: deckCodes(run), won: !!run.won, floor: run.floor,
    date: new Date().toISOString().slice(0, 10),
  };
  p.legacy = [leg, ...p.legacy.filter((l) => l.id !== leg.id)].slice(0, 12);
  return leg;
}

/** ISO-like week key, e.g. 2026-W43 (weeks start Monday). */
export function weekKey(d = new Date()): string {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  const wk = Math.ceil(((t.getTime() - y0.getTime()) / 86400000 + 1) / 7);
  return `${t.getUTCFullYear()}-W${String(wk).padStart(2, '0')}`;
}

export function todayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function dailySetup(key: string): { seed: number; character: CharId; mod: string } {
  const seed = hashStr(`riposte-daily-${key}`);
  const chars: CharId[] = ['duelist', 'warden', 'hollow', 'sharp'];
  const mods = Object.keys(DAILY_MODS);
  return { seed, character: chars[seed % chars.length], mod: mods[(seed >>> 3) % mods.length] };
}

/** Weekly Gauntlet: one seeded run per week with preset Vows and a twist rule. */
export function weeklySetup(key: string): { seed: number; character: CharId; vows: Record<string, number>; twist: string } {
  const seed = hashStr(`riposte-weekly-${key}`);
  const chars: CharId[] = CHAR_LIST.map((c) => c.id);
  const twists = TWISTS.map((t) => t.id);
  const pool = VOWS.map((v) => v.id);
  const vows: Record<string, number> = {};
  for (let i = 0, h = seed; i < 3; i++, h = hashStr(`${h}`)) {
    const v = pool[h % pool.length];
    vows[v] = 1;
  }
  return { seed, character: chars[(seed >>> 2) % chars.length], vows, twist: twists[(seed >>> 5) % twists.length] };
}
