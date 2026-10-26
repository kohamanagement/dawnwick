import { diffHp } from '../data/difficulty';
import type { CardInst, CharId, MapNode, ModId, NemesisInfo, NodeType, RunBonus, RunState } from './types';
import { Rng, hashStr } from './rng';
import { Combat } from './combat';
import { CARDS, rewardPool, factionsOf } from '../data/cards';
import { effectsOf, themesOf } from '../data/patterns';
import { CHARACTERS } from '../data/characters';
import { ENCOUNTERS, ENEMIES, EPILOGUE, NIGHT_BOSSES, WANDERING_BOSSES, WANDERING_BOSSES_2, actEncounters, type Encounter } from '../data/enemies';
import { VENUE_IDS } from '../data/venues';
import { PATRONS, PATRON_MAP, BLESSING_MAP, type BlessingApi } from '../data/patrons';
import { OMEN_LIST, OMENS as OMEN_MAP, gainOmen } from '../data/omens';
import { heatOf } from '../data/vows';
import { RELICS, RELIC_LIST, relicMod } from '../data/relics';
import { EVENTS, EVENT_MAP, NODE_EVENTS, SHRINES, WAYSIDE } from '../data/events';
import { SKIES, SKY_MAP, LAYOUTS, LAYOUT_MAP, TERRORS, WILDS, skyOf, type SkyDef } from '../data/wilds';
import { FATES, FATE_MAP, type FateApi } from '../data/fates';
import { RARE_ENCOUNTERS } from '../data/enemies6';
import { AFFIXES } from '../data/affixes';
import { DARES, DARE_MAP, DARE_PAYOUT } from '../data/dares';
import { MOD_LIST, MODS } from '../data/mods';
import { upCode } from '../data/upgrades';

export const ROWS = 8; // map rows per act, then the boss
export const COLS = 4;
export const RUN_VERSION = 6;

export const DEFAULT_ECHOES = [
  { label: 'Ember Rush', cards: ['strike+1', 'strike', 'spark_lunge+1', 'flame_lash', 'flame_lash', 'searing_strike', 'blaze_ward', 'guard', 'guard', 'kindling', 'fury_chain'] },
  { label: 'Bramble Wall', cards: ['strike', 'strike', 'barkskin+1', 'barkskin', 'bramble_snare', 'harden', 'root_strike', 'root_strike', 'guard', 'thorn_volley+1', 'sapling'] },
  { label: 'Tide Counter', cards: ['strike', 'strike', 'undertow', 'undertow+1', 'parry+1', 'riptide_snare', 'brace', 'guard', 'guard', 'wave_crash', 'calm_waters'] },
];

export interface NewRunOpts {
  character: CharId;
  ascension: number;
  seed?: number;
  daily?: string | null;
  dailyMod?: string | null;
  level: number;
  echoes: { label: string; cards: string[] }[];
  tutorial?: boolean;
  /** Meta layer (collection, talents). Leave out for Daily Duels and the balance sim. */
  bonus?: RunBonus;
  owned?: string[];
  favored?: string[];
  loadout?: string[];
  imprints?: Record<string, ModId>;
  foils?: string[];
  /** v0.3 */
  vows?: Record<string, number>;
  weekly?: string | null;
  twist?: string | null;
  familiar?: string;
  /** v0.5 */
  nemesis?: NemesisInfo | null;
  nightOk?: boolean;
  /** v0.6: offer three Fates at the start (normal runs; not Daily, Weekly, the tutorial or the sim unless asked). */
  fates?: boolean;
  /** v0.14: your previous run's deck, met as an Echo at this run's first Rival (the run-2 story beat). */
  echoBeat?: { label: string; cards: string[] } | null;
}

export const DAILY_MODS: Record<string, string> = {
  trapped: 'Trapped Halls: every enemy starts combat with a Spike Shell set.',
  flux: 'High Tide: you can bank 1 more Flux.',
  rich: 'Fat Purse: start with 100 extra gold.',
  glass: 'Glass Cannon: 15 less Max HP, but start with a random rare keepsake.',
};

/**
 * v0.14 Stakes (the difficulty ladder). Each rung raises the stakes of the chain or the Dealer's game:
 * traps set before you arrive, Rebuttals early, the Dealer answering your picks, more cards dealt face-down.
 */
export const ASCENSION_TEXT = [
  'Standard run.',
  'Every enemy sits down with one of its traps already set.',
  'Rivals carry a Rebuttal from Act 1 (it cancels your first Counter).',
  'Rivals and bosses start with 1 Edge.',
  'The Dealer answers every rare card you take.',
  'Twice as many map cards are dealt face-down, and Act 1 gives no Peek.',
  'Your Omen belt holds 2 instead of 3.',
  'Bosses have 10% more HP.',
  'Merchant prices are 20% higher.',
  'All enemies start with 1 extra Edge.',
  'The Last Dealer sets an extra trap at the start.',
];

/** v0.14: removing a card at the Merchant: 60 gold, 30 more each time; Jinxes go for half. */
export const REMOVE_BASE = 60;
export const REMOVE_STEP = 30;
/** v0.14: the Candle mends a quarter of your Max HP plus 4. */
export const MEND_PCT = 0.25;
export const MEND_FLAT = 4;
/** v0.14 The Deal: how often the Dealer answers a rare (or face-down) card you take, and what Negating costs. */
export const ANSWER_CHANCE = 0.3;
export const ANSWER_COST = 30;
/** v0.14: share of map cards dealt face-down (rows 1 to 6), and Peeks per act. */
export const FACE_DOWN = 0.22;
export const PEEKS = 1;
/** v0.14: paying off a Patron's debt at a Merchant. */
export const DEBT_PRICE = 40;
export const PATRON_TRAP: Record<string, string> = { archivist: 'mirror_veil', bellmaiden: 'soul_snare', ferryman: 'ambush', gardener: 'thorn_snare', masked: 'tripwire' };

export function newRun(o: NewRunOpts): RunState {
  const seed = o.seed ?? Math.floor(Math.random() * 2 ** 31);
  const ch = CHARACTERS[o.character];
  const run: RunState = {
    v: RUN_VERSION, seed, daily: o.daily ?? null, dailyMod: o.dailyMod ?? null,
    character: o.character, ascension: o.ascension, hp: ch.hp, maxHp: ch.hp, gold: 99,
    deck: [], relics: [ch.relic], relicCounters: {}, act: 1, map: [], pos: null, floor: 0, nextUid: 1,
    rng: Rng.streams(seed, ['map', 'reward', 'combat', 'event', 'shop', 'misc', 'venue', 'sky', 'road']),
    combat: null, screen: 'map', reward: null, shop: null, event: null, restDone: false,
    stats: { floors: 0, fights: 0, elites: 0, bosses: 0, chains: 0, maxChain: 0, dmg: 0, goldEarned: 0 },
    removeCost: REMOVE_BASE, seenEvents: [], echoPool: [...o.echoes, ...DEFAULT_ECHOES],
    level: o.level, actFights: 0, lastEnc: '', rareReward: false, tutorial: o.tutorial,
    bonus: o.bonus, owned: o.owned, favored: o.favored, imprints: o.imprints, foils: o.foils,
    rerolls: o.bonus?.rerolls ?? 0, dare: null, dareOffer: null, daresWon: 0, forge: null, champs: 0,
    vows: o.vows ?? {}, heat: heatOf(o.vows), weekly: o.weekly ?? null, twist: o.twist ?? null, omens: [], familiar: o.familiar,
    nemesis: o.nemesis && !o.daily && !o.weekly ? { ...o.nemesis, met: false, slain: false } : null,
    nightOk: !!o.nightOk && !o.daily && !o.weekly, venues: [], patron: null,
  };
  run.stats.style = 0; run.stats.plays = {}; run.stats.kills = {}; run.stats.omensUsed = 0;
  // Each act rolls its standard or alternate version (seeded, so Daily Duels stay identical for everyone).
  const ar = rng(run, 'map');
  // v0.6: each act now has three versions (standard, alternate, wild).
  run.acts = [ar.int(0, 2), ar.int(0, 2), ar.int(0, 2)];
  // v0.4: each act's boss may be swapped for that act's wandering boss.
  run.bosses = [0, 1, 2].map(() => (ar.next() < 1 / 3 ? (ar.next() < 0.5 ? 1 : 2) : 0));
  const b = o.bonus ?? {};
  run.maxHp += b.maxHp ?? 0; run.hp = run.maxHp;
  run.gold += b.gold ?? 0;
  const start = o.loadout && o.loadout.length ? o.loadout.filter((id) => CARDS[id]) : ch.deck;
  for (const id of start) addToDeck(run, id);
  if (b.relic) gainRelic(run, rng(run, 'misc').pick(relicPool(run, 'common')));
  for (let i = 0; i < (run.vows?.vow_regret ?? 0); i++) addToDeck(run, 'regret');
  if (run.twist === 'omens') for (let i = 0; i < 3; i++) gainOmen(run, rng(run, 'misc').pick(OMEN_LIST).id);
  if (run.twist === 'legend') {
    const pool = rewardPool(run.character, 99, 'legendary', ALL_LEGENDS);
    if (pool.length) addToDeck(run, rng(run, 'misc').pick(pool));
  }
  if (run.dailyMod === 'rich') run.gold += 100;
  if (run.dailyMod === 'glass') {
    run.maxHp -= 15; run.hp = Math.min(run.hp, run.maxHp);
    gainRelic(run, rng(run, 'misc').pick(relicPool(run, 'rare')));
  }
  run.peeks = o.ascension >= 5 ? 0 : PEEKS;
  if (o.echoBeat && !run.daily && !run.weekly && !run.tutorial) run.echoBeat = o.echoBeat;
  run.map = genMap(run);
  run.buffs = {};
  if (o.fates && !run.daily && !run.weekly && !run.tutorial) {
    run.fateOffer = rng(run, 'misc').sample(FATES.map((f) => f.id), 3);
    run.screen = 'fate';
  }
  return run;
}

/** Streams added in later versions are seeded from the run seed on first use, so old saves keep working. */
export function rng(run: RunState, stream: string): Rng {
  if (!run.rng[stream]) run.rng[stream] = hashStr(`${run.seed}:${stream}`);
  return new Rng(run.rng, stream);
}

// ───────── v0.6: Fates ─────────

function fateApi(run: RunState): FateApi {
  const r = rng(run, 'misc');
  return {
    rng: r,
    gainRelic: (rar) => { const pool = relicPool(run, rar); if (!pool.length) return null; const id = r.pick(pool); gainRelic(run, id); return RELICS[id].name; },
    addToDeck: (id, up) => { addToDeck(run, id, up); },
    upgradeRandom: (n) => eventApi(run).upgradeRandom(n),
    removeBasics: (n) => { let k = 0; for (; k < n; k++) { const b = run.deck.filter((c) => CARDS[c.id].rarity === 'starter'); if (!b.length) break; removeCard(run, r.pick(b).uid); } return k; },
    gainOmens: (n) => { let k = 0; for (let i = 0; i < n; i++) if (gainOmen(run, r.pick(OMEN_LIST).id)) k++; return k; },
    rareCard: () => { const p = rewardPool(run.character, run.level, 'rare', run.owned); return p.length ? r.pick(p) : null; },
    sigilRandom: (n) => { let k = 0; for (let i = 0; i < n; i++) if (eventApi(run).sigil()) k++; return k; },
  };
}

/** Keep one of the three Fates on offer (or none, with null). */
export function chooseFate(run: RunState, id: string | null): boolean {
  if (run.screen !== 'fate' || !run.fateOffer) return false;
  if (id && !run.fateOffer.includes(id)) return false;
  run.fateOffer = null;
  run.screen = 'map';
  if (id) setFate(run, id);
  return true;
}

function setFate(run: RunState, id: string): void {
  run.fate = id;
  FATE_MAP[id]?.apply?.(run, fateApi(run));
  run.hp = Math.max(1, Math.min(run.hp, run.maxHp));
  // Fates that change the map shape take effect from the current act's map (if no step was taken yet).
  if (!run.pos && ['pilgrim', 'hunter', 'forgehand', 'night_owl', 'stargazer'].includes(id)) run.map = genMap(run, true);
}

/** The Sky over this act (v0.6). */
export function skyNow(run: RunState): SkyDef | null { return skyOf(run); }

const ALL_LEGENDS = Object.values(CARDS).filter((c) => c.rarity === 'legendary').map((c) => c.id);

/** The encounter tables for the act this run is in (standard or alternate version). */
export function actEnc(run: RunState, act = run.act) {
  // v0.5 The Long Night reuses Act 3's tables (alternating versions) with a rotating boss.
  if (run.night && act >= 5) {
    const n = act - 4;
    return { ...actEncounters(3, n % 2), boss: NIGHT_BOSSES[(n - 1) % NIGHT_BOSSES.length] };
  }
  const a = Math.min(3, act);
  const e = actEncounters(a, run.acts?.[a - 1] ?? 0);
  const b = run.bosses?.[a - 1] ?? 0;
  return b ? { ...e, boss: b === 2 ? WANDERING_BOSSES_2[a] : WANDERING_BOSSES[a] } : e;
}

/** v0.6 Long Night scaling: compound HP, and Strength that grows a little faster each night. */
export function nightHpMult(night: number): number { return Math.pow(1.25, night); }
export function nightStr(night: number): number { return night + Math.floor((night * night) / 8); }

/** v0.5: the night number of the Long Night (0 outside it). */
export function nightOf(run: RunState): number { return run.night && run.act >= 5 ? run.act - 4 : 0; }

/** Act 4: runs that slew 2+ Champions may face the Reflection after the Act 3 boss. */
export const EPILOGUE_CHAMPS = 2;
export function epilogueReady(run: RunState): boolean { return (run.champs ?? 0) >= EPILOGUE_CHAMPS && !run.daily && !run.arena && !run.puzzle; }

export function enterEpilogue(run: RunState): void {
  if (run.epilogue !== 'offered') return;
  run.epilogue = 'fighting';
  run.act = 4;
  run.floor++;
  run.stats.floors++;
  run.hp = Math.min(run.maxHp, run.hp + Math.round((run.maxHp - run.hp) / 2));
  run.reward = null;
  startCombat(run, EPILOGUE, 'boss');
}

export function declineEpilogue(run: RunState): void {
  if (run.screen !== 'epilogue') return;
  if (run.epilogue === 'offered') run.epilogue = null;
  run.screen = 'victory';
  run.finished = true;
}

export function addToDeck(run: RunState, id: string, up = false, mod?: ModId): CardInst {
  const c: CardInst = { uid: run.nextUid++, id, up };
  const m = mod ?? run.imprints?.[id];
  if (m && MODS[m]?.fits(CARDS[id])) c.mod = m;
  if (run.foils?.includes(id)) c.foil = true;
  run.deck.push(c);
  return c;
}

// ───────── map ─────────

export function genMap(run: RunState, reroll = false): MapNode[][] {
  const r = rng(run, 'map');
  // v0.6: every act rolls a Layout (the shape of the paths) and a Sky (a condition for the whole act).
  const ai = run.act - 1;
  const sr = rng(run, 'sky');
  if (!reroll || !run.layouts?.[ai]) {
    const first = run.act === 1 && run.tutorial;
    (run.layouts ??= [])[ai] = first ? 'road' : sr.weighted(LAYOUTS.map((l) => [l.id, l.id === 'road' ? 3 : 2] as [string, number]));
    const harsh = run.relics.includes('weather_vane') ? ['heatwave', 'frost', 'eclipse', 'fog'] : run.fate === 'stargazer' ? ['heatwave', 'frost', 'eclipse'] : [];
    const kind = SKIES.filter((x) => !harsh.includes(x.id));
    (run.skies ??= [])[ai] = first ? 'clear' : sr.weighted(kind.map((x) => [x.id, x.weight] as [string, number]));
  }
  const lay = LAYOUT_MAP[run.layouts![ai]] ?? LAYOUTS[0];
  const sky = SKY_MAP[run.skies![ai]] ?? SKIES[0];
  const grid: (MapNode | null)[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  const edges: [number, number, number][] = []; // row, fromCol, toCol
  const crosses = (row: number, col: number, nc: number) => edges.some(([er, a, b]) => er === row && ((a < col && b > nc) || (a > col && b < nc)));
  const link = (row: number, col: number, nc: number) => {
    if (!edges.some(([er, a, b]) => er === row && a === col && b === nc)) edges.push([row, col, nc]);
    const node = grid[row][col]!;
    if (!node.next.includes(nc)) node.next.push(nc);
  };
  const starts = Array.from({ length: lay.walks }, () => r.int(0, COLS - 1));
  if (starts.length > 1) starts[1] = (starts[0] + 2) % COLS; // guarantee spread
  for (const start of starts) {
    let col = start;
    for (let row = 0; row < ROWS; row++) {
      if (!grid[row][col]) grid[row][col] = { row, col, type: 'fight', next: [] };
      if (row === ROWS - 1) break;
      let nc = Math.max(0, Math.min(COLS - 1, col + r.int(-1, 1)));
      if (crosses(row, col, nc)) nc = col;
      link(row, col, nc);
      col = nc;
    }
  }
  // Labyrinths and open country grow extra forks to neighbouring nodes that already exist.
  if (lay.branch) for (let row = 0; row < ROWS - 1; row++) for (const n of grid[row]) {
    if (!n || !r.chance(lay.branch)) continue;
    const nc = n.col + (r.chance(0.5) ? -1 : 1);
    if (nc < 0 || nc >= COLS || !grid[row + 1][nc] || n.next.includes(nc) || crosses(row, n.col, nc)) continue;
    link(row, n.col, nc);
  }
  const mult = (t: NodeType) => (lay.w?.[t] ?? 1) * (sky.w?.[t] ?? 1) * fateWeight(run, t);
  const eliteW = 11;
  // v0.14: no fixed treasure row. Riches are scattered through the middle of the act (and often dealt face-down).
  const treasureRows: number[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (const n of grid[row]) {
      if (!n) continue;
      let t: NodeType;
      if (row === 0) t = 'fight';
      else if (treasureRows.includes(row)) t = 'treasure';
      else if (row === ROWS - 1) t = 'rest';
      else if (lay.fair === row) t = r.weighted<NodeType>([['shop', 4], ['shrine', 3], ['event', 3]]);
      else {
        const opts: [NodeType, number][] = [['fight', 46 * mult('fight')], ['event', 18 * mult('event')], ['mystery', 6 * mult('mystery')], ['shrine', 3 * mult('shrine')]];
        if (row >= 2) opts.push(['elite', eliteW * mult('elite')], ['shop', 9 * mult('shop')]);
        if (row >= 2 && row <= ROWS - 2) opts.push(['forge', 5 * mult('forge')]);
        if (row >= 4 && row <= ROWS - 3) opts.push(['rest', 12 * mult('rest')]);
        if (row >= 1 && row <= ROWS - 3) opts.push(['treasure', (row === 1 ? 1.5 : 6) * mult('treasure')]);
        t = r.weighted(opts);
      }
      n.type = t;
    }
  }
  // v0.12 pacing: every act has a Merchant you can route to. Runs used to end with ~300 unspent gold because
  // the only shop was often off your path. If the map has none in its middle rows, a fight there becomes one.
  if (!grid.flat().some((n) => n && n.type === 'shop' && n.row >= 3 && n.row <= ROWS - 3)) {
    const mid = grid.flat().filter((n): n is MapNode => !!n && n.row >= 3 && n.row <= ROWS - 3);
    const f = ['fight', 'event', 'mystery', 'shrine', 'forge', 'elite'].map((t) => mid.filter((n) => n.type === t)).find((xs) => xs.length);
    if (f) r.pick(f).type = 'shop';
  }
  // v0.14: every act still deals at least two Treasures (the old fixed row guaranteed about that many on any path).
  const riches = grid.flat().filter((n): n is MapNode => !!n && n.type === 'treasure').length;
  if (riches < 2) {
    const f = grid.flat().filter((n): n is MapNode => !!n && n.type === 'fight' && n.row >= 2 && n.row <= ROWS - 3);
    for (const n of r.sample(f, 2 - riches)) n.type = 'treasure';
  }
  // Treasure Map: two fights a little way up the map become Treasure.
  if (run.relics.includes('treasure_map')) {
    const f = grid.flat().filter((n): n is MapNode => !!n && n.type === 'fight' && n.row > 1);
    for (const n of r.sample(f, 2)) n.type = 'treasure';
  }
  // One elite per act burns brighter: a Champion with an affix and a bigger payout (two under a Royal Procession).
  const elites = grid.flat().filter((n): n is MapNode => !!n && n.type === 'elite');
  for (const e of r.sample(elites, sky.champs ?? 1)) e.champ = true;
  // v0.5 Venues: every elite and boss fight happens at a Venue you can see on the map.
  const vr = rng(run, 'venue');
  for (const n of elites) n.venue = vr.pick(VENUE_IDS);
  (run.venues ??= [])[run.act - 1] = vr.pick(VENUE_IDS);
  // v0.14: the Dealer deals some cards face-down, the same rule as an enemy trap: you see the suit, not the card.
  const dr = rng(run, 'deal');
  const share = Math.min(0.6, FACE_DOWN * (run.ascension >= 5 ? 2 : 1));
  if (!(run.tutorial && run.act === 1)) for (const n of grid.flat()) {
    if (!n || n.row < 1 || n.row > ROWS - 2 || n.type === 'mystery') continue;
    if (dr.next() < share) n.down = true;
  }
  return grid.map((row) => row.filter((n): n is MapNode => !!n));
}

/** v0.14: the suit a face-down map card shows. ♠ fights, ♥ rest and shrines, ♦ riches, ♣ the unknown. */
export type Suit = 'spade' | 'heart' | 'diamond' | 'club';
export function suitOf(t: NodeType): Suit {
  if (t === 'fight' || t === 'elite' || t === 'boss') return 'spade';
  if (t === 'rest' || t === 'shrine') return 'heart';
  if (t === 'shop' || t === 'treasure' || t === 'forge') return 'diamond';
  return 'club';
}
export const SUIT: Record<Suit, { glyph: string; name: string; hint: string }> = {
  spade: { glyph: '♠', name: 'Spades', hint: 'a fight: a normal fight or a Rival' },
  heart: { glyph: '♥', name: 'Hearts', hint: 'rest: a Candle or a Shrine' },
  diamond: { glyph: '♦', name: 'Diamonds', hint: 'riches: Treasure, a Merchant or a Forge' },
  club: { glyph: '♣', name: 'Clubs', hint: 'the unknown: an Event' },
};
/** Is this map card still face-down to the player? */
export function isDown(n: MapNode): boolean { return !!n.down && !n.seen; }

/** v0.14: spend a Peek to flip a face-down card on the map. */
export function peek(run: RunState, row: number, col: number): boolean {
  const n = nodeAt(run, row, col);
  if (!n || !isDown(n) || !(run.peeks ?? 0) || run.screen !== 'map') return false;
  run.peeks!--;
  n.seen = true;
  return true;
}

/** v0.6 Fates that reweight the map. */
function fateWeight(run: RunState, t: NodeType): number {
  switch (run.fate) {
    case 'pilgrim': return t === 'event' || t === 'shrine' ? 1.8 : t === 'elite' || t === 'shop' ? 0.6 : 1;
    case 'hunter': return t === 'elite' ? 1.6 : 1;
    case 'forgehand': return t === 'forge' ? 2.2 : 1;
    default: return 1;
  }
}

/** Is the Fog hiding this act's map beyond 2 rows? */
export function foggy(run: RunState): boolean {
  if (run.fogLifted === run.act || run.relics.includes('storm_glass')) return false;
  return run.fate === 'night_owl' || !!skyOf(run)?.fog;
}

export function nodeAt(run: RunState, row: number, col: number): MapNode | undefined {
  return run.map[row]?.find((n) => n.col === col);
}

/** Nodes the player may travel to next. Row === ROWS means the boss. */
export function reachable(run: RunState): { row: number; col: number }[] {
  if (!run.pos) return run.map[0].map((n) => ({ row: 0, col: n.col }));
  if (run.pos.row >= ROWS - 1) return run.pos.row === ROWS - 1 ? [{ row: ROWS, col: 0 }] : [];
  const cur = nodeAt(run, run.pos.row, run.pos.col);
  return (cur?.next ?? []).map((col) => ({ row: run.pos!.row + 1, col }));
}

// ───────── nodes ─────────

export function travel(run: RunState, row: number, col: number): void {
  if (!reachable(run).some((p) => p.row === row && p.col === col)) return;
  run.pos = { row, col };
  const at = nodeAt(run, row, col);
  if (at?.down) at.seen = true;
  run.floor++;
  run.stats.floors++;
  run.reward = null; run.shop = null; run.event = null; run.restDone = false; run.rareReward = false; run.forge = null; run.mystery = null;
  if (row === ROWS) {
    const b = actEnc(run).boss;
    startCombat(run, b, 'boss', run.vows?.vow_crown ? rng(run, 'combat').pick(AFFIXES).id : undefined, { venue: run.venues?.[run.act - 1] ?? null });
    return;
  }
  // v0.6: sometimes something happens on the road before you reach the node.
  if (row > 0 && waysideRoll(run)) { run.wayside = { row, col }; startEvent(run, 'wayside'); return; }
  enterNode(run, row, col);
}

/** Chance of a roadside encounter on the way to a node. */
export const WAYSIDE_CHANCE = 0.12;
function waysideRoll(run: RunState): boolean {
  if (!WILDS.on || run.arena || run.puzzle || (run.tutorial && run.act === 1)) return false;
  const p = Math.min(0.6, WAYSIDE_CHANCE * (skyOf(run)?.wayside ?? 1) * (run.fate === 'wanderer' ? 2 : 1) * (run.relics.includes('wayfarer_boots') ? 1.5 : 1));
  const hit = rng(run, 'road').next() < p;
  if (hit) run.stats.roads = (run.stats.roads ?? 0) + 1;
  return hit;
}

/** Enter the node at (row, col): what it holds starts now. Mystery nodes reveal themselves here. */
export function enterNode(run: RunState, row: number, col: number): void {
  const node = nodeAt(run, row, col);
  if (!node) { run.screen = 'map'; return; }
  let type: NodeType | 'rare' = node.type;
  if (type === 'mystery') { type = rollMystery(run); run.mystery = type; run.stats.mysteries = (run.stats.mysteries ?? 0) + 1; }
  switch (type) {
    case 'fight': {
      if (nemesisDue(run, 'normal')) { startNemesis(run); break; }
      const pools = actEnc(run);
      const pool = run.actFights < 2 ? pools.easy : pools.normal;
      let enc = pickEncounter(run, pool);
      // Vow of the Swarm: one extra small enemy.
      if (run.vows?.vow_swarm && enc.enemies.length < 3) enc = { ...enc, name: `${enc.name} + swarm`, enemies: [...enc.enemies, SWARM[Math.min(3, run.act)] ?? 'cinder_rat'] };
      // v0.5: from the third fight of Act 1 on, some normal fights roll a Venue (every fight with the Vow of the Stage).
      const vr = rng(run, 'venue');
      const always = !!run.vows?.vow_stage || run.twist === 'grand_tour' || run.relics.includes('venue_map');
      const chance = skyOf(run)?.venueChance ?? 0.3;
      const venue = always || ((run.act >= 2 || run.actFights >= 2) && vr.next() < chance) ? vr.pick(VENUE_IDS) : null;
      startCombat(run, enc, 'normal', undefined, { venue });
      break;
    }
    case 'elite': {
      if (nemesisDue(run, 'elite')) { startNemesis(run); break; }
      // v0.14: on your second run, the first Rival is the Echo of the deck you carried last time.
      if (run.echoBeat && !run.arena && !run.puzzle) {
        startCombat(run, { id: 'echo_beat', name: `Echo: ${run.echoBeat.label}`, enemies: ['echo_rival'] }, 'elite', undefined, { venue: node.venue ?? null });
        break;
      }
      const pool = actEnc(run).elite;
      const echoes = pool.filter((e) => ENEMY_IS_ECHO(e));
      const enc = run.twist === 'mirror' && echoes.length ? echoes[0] : run.twist === 'mirror' ? ENCOUNTERS[Math.min(3, Math.max(2, run.act))].elite[0] : pickEncounter(run, pool);
      startCombat(run, enc, 'elite', node.champ || run.vows?.vow_hunt ? rng(run, 'combat').pick(AFFIXES).id : undefined, { venue: node.venue ?? null });
      break;
    }
    case 'rare': startRare(run); break;
    case 'forge': {
      const fits = MOD_LIST.map((m) => m.id);
      run.forge = { mods: rng(run, 'shop').sample(fits, 3), done: false };
      run.screen = 'forge';
      break;
    }
    case 'event': startEvent(run); break;
    case 'shrine':
      run.stats.shrines = (run.stats.shrines ?? 0) + 1;
      if (run.relics.includes('pilgrim_badge')) run.hp = Math.min(run.maxHp, run.hp + 8);
      startEvent(run, 'shrine');
      break;
    case 'shop': run.shop = genShop(run); run.screen = 'shop'; break;
    case 'rest': run.screen = 'rest'; break;
    case 'treasure': {
      const r = rng(run, 'reward');
      run.reward = { gold: r.int(20, 35) + (skyOf(run)?.treasureGold ?? 0), goldTaken: false, cards: null, relic: randomRelic(run) };
      run.screen = 'treasure';
      break;
    }
    default: run.screen = 'map';
  }
}

/** What a Mystery node turns out to be. */
function rollMystery(run: RunState): NodeType | 'rare' {
  const r = rng(run, 'road');
  if (run.relics.includes('antler_crown')) return 'fight';
  const safe = run.fate === 'lucky' || run.relics.includes('lucky_compass');
  const rare = 9 * (skyOf(run)?.rareMult ?? 1) * (run.fate === 'lucky' ? 3 : 1);
  return r.weighted<NodeType | 'rare'>([
    ['event', 34], ['fight', run.relics.includes('lucky_compass') ? 0 : run.fate === 'lucky' ? 10 : 18], ['treasure', 10], ['shop', 7], ['rare', rare],
    ['elite', safe ? 0 : 5], ['shrine', 10], ['forge', 4], ['rest', 3],
  ]);
}

/** A rare monster for this act. It flees after a few turns. */
export function startRare(run: RunState): void {
  const enc = RARE_ENCOUNTERS[Math.max(1, Math.min(3, run.act))];
  const cb = startCombat(run, enc, 'normal');
  cb.s.rare = true;
}

const ENEMY_IS_ECHO = (e: Encounter) => e.enemies[0].startsWith('echo');
const SWARM: Record<number, string> = { 1: 'cinder_rat', 2: 'wick_imp', 3: 'rift_spawn' };

function pickEncounter(run: RunState, pool: Encounter[]): Encounter {
  const r = rng(run, 'combat');
  const opts = pool.filter((e) => e.id !== run.lastEnc);
  const e = r.pick(opts.length ? opts : pool);
  run.lastEnc = e.id;
  return e;
}

// ───────── v0.5: the Nemesis ─────────

/** Is the Nemesis waiting at this kind of node right now? Normal Nemeses appear from the act's 2nd fight on. */
function nemesisDue(run: RunState, kind: 'normal' | 'elite'): boolean {
  const n = run.nemesis;
  return !!n && !n.met && n.kind === kind && n.act === run.act && (kind === 'elite' || run.actFights >= 1) && !run.arena && !run.puzzle;
}

export const NEMESIS_TITLES = ['the Grudging', 'the Vengeful', 'the Undying', 'the Inevitable'];

function startNemesis(run: RunState): void {
  const n = run.nemesis!;
  n.met = true;
  const vr = rng(run, 'venue');
  startCombat(run, { id: `nemesis:${n.enemies.join('+')}`, name: `Nemesis: ${n.name}`, enemies: n.enemies }, n.kind,
    n.kind === 'elite' ? rng(run, 'combat').pick(AFFIXES).id : undefined, { venue: vr.pick(VENUE_IDS), nemesis: true });
}

export function startCombat(run: RunState, enc: Encounter, kind: 'normal' | 'elite' | 'boss', affix?: string, extra: { venue?: string | null; nemesis?: boolean } = {}): Combat {
  const enemies = [...enc.enemies];
  const state = Combat.create(run, enemies, kind, rng(run, 'combat'), enc.name);
  if (run.tutorial && run.stats.fights === 0) state.tutorial = true;
  if (affix) state.affix = affix;
  if (extra.venue && !state.tutorial) state.venue = extra.venue;
  run.lastFight = run.arena || run.puzzle ? null : { enemies, name: enc.name, act: run.act, kind };
  if (extra.nemesis && run.nemesis) {
    // The enemy that beat you last time comes back promoted: tougher, stronger, and named.
    state.nemesis = true;
    const g = Math.max(1, run.nemesis.grudge);
    const e = state.enemies[0];
    e.name = `${ENEMIES[e.def].name} ${NEMESIS_TITLES[Math.min(NEMESIS_TITLES.length - 1, g - 1)]}`;
    e.maxHp = e.hp = Math.round(e.hp * (1.25 + 0.1 * Math.min(3, g - 1)));
    e.st.str = (e.st.str ?? 0) + Math.min(3, g);
    e.flags.nemesis = 1;
  }
  // v0.6: the Long Night scales compound (+25% HP per night, multiplied) instead of linearly, plus the Night Terrors.
  const night = nightOf(run);
  if (night) for (const e of state.enemies) { e.maxHp = e.hp = Math.round(e.hp * nightHpMult(night)); e.st.str = (e.st.str ?? 0) + nightStr(night); }
  // v0.6: Skies and Fates that change enemy HP.
  const hpm = (skyOf(run)?.enemyHp ?? 1) * (run.fate === 'veteran' ? 1.08 : 1);
  if (hpm !== 1 && !run.arena && !run.puzzle) for (const e of state.enemies) { e.maxHp = e.hp = Math.round(e.hp * hpm); }
  // v0.8: base difficulty (src/data/difficulty.ts).
  const dhp = diffHp(kind, run.act);
  if (dhp !== 1 && !run.arena && !run.puzzle && !state.tutorial) for (const e of state.enemies) { e.maxHp = e.hp = Math.round(e.hp * dhp); }
  run.dare = null;
  run.dareOffer = kind !== 'normal' && !state.tutorial && !run.arena && !run.puzzle && run.act < 4 ? rng(run, 'misc').sample(DARES.map((d) => d.id), 2) : null;
  // A night elite or boss carries an affix from night 2 on.
  if (night >= 2 && kind !== 'normal' && !affix) state.affix = rng(run, 'combat').pick(AFFIXES).id;
  run.combat = state;
  run.screen = 'combat';
  const cb = new Combat(state, run);
  if (kind === 'boss' && run.act === 3 && run.ascension >= 10) {
    for (const e of state.enemies) e.traps.push(cb.mkCard('counter_glyph3'));
  }
  // v0.14 Stakes 1: every enemy sits down with one of its traps already set.
  if (run.ascension >= 1 && !state.tutorial && !run.arena && !run.puzzle) for (const e of state.enemies) {
    const t = ENEMIES[e.def].traps?.[0];
    if (t && CARDS[cb.tier(t)] && e.traps.length < e.slots) e.traps.push(cb.mkCard(cb.tier(t)));
  }
  // v0.14 Patron debts: a Patron you bargained with sits in on this act's boss as an extra trap.
  if (kind === 'boss' && run.debts?.length) {
    const due = run.debts.filter((d) => d.act === run.act);
    const boss = state.enemies[0];
    for (const d of due) if (boss && CARDS[cb.tier(d.trap)]) boss.traps.push(cb.mkCard(cb.tier(d.trap)));
    if (due.length && boss) boss.slots = Math.max(boss.slots, boss.traps.length);
    if (due.length) state.debts = due.map((d) => d.patron);
    run.debts = run.debts.filter((d) => d.act !== run.act);
  }
  // v0.14 Scout: the next Rival fight starts with its traps face-up.
  if (run.scout && kind === 'elite') { state.once.reveal = 1; run.scout = false; }
  if (enc.id === 'echo_beat') { state.echoBeat = true; if (run.act <= 1) for (const e of state.enemies) e.maxHp = e.hp = Math.round(e.hp * 0.7); }
  cb.begin();
  // v0.14 Rehearse: a copy of the rehearsed Reaction starts this fight already set.
  if (run.rehearse && !state.tutorial) {
    const [rid, up] = run.rehearse.split('+');
    if (CARDS[rid] && state.player.traps.length < state.player.slots) state.player.traps.push(cb.mkCard(rid, up === '1'));
    run.rehearse = null;
  }
  return cb;
}

/** v0.11 Evolve: add this fight's plays to each copy; copies that reach their count become their evolved form. */
export function evolveCards(run: RunState, plays?: Record<string, number>): string[] {
  const out: string[] = [];
  if (!plays) return out;
  for (const c of run.deck) {
    const n = plays[c.uid];
    const ev = CARDS[c.id]?.evolve;
    if (!n || !ev || !CARDS[ev.into]) continue;
    c.evo = (c.evo ?? 0) + n;
    if (c.evo >= ev.n) {
      out.push(`${CARDS[c.id].name} evolved into ${CARDS[ev.into].name}!`);
      c.id = ev.into;
      delete c.evo;
    }
  }
  if (out.length) run.evolved = [...(run.evolved ?? []), ...out];
  return out;
}

/** Call once the combat phase is 'won' or 'lost'. */
export function finishCombat(run: RunState): void {
  const s = run.combat!;
  run.stats.chains += s.stats.chains;
  run.stats.maxChain = Math.max(run.stats.maxChain, s.stats.maxChain);
  run.stats.dmg += s.stats.dmg;
  run.stats.style = (run.stats.style ?? 0) + (s.stats.style ?? 0);
  const plays = run.stats.plays ?? (run.stats.plays = {});
  for (const [id, n] of Object.entries(s.stats.plays ?? {})) plays[id] = (plays[id] ?? 0) + n;
  run.stats.steals = (run.stats.steals ?? 0) + (s.stats.steals ?? 0);
  run.stats.mimics = (run.stats.mimics ?? 0) + (s.stats.mimics ?? 0);
  if ((s.stats.bigHit ?? 0) > (run.stats.bigHit ?? 0)) run.stats.bigHit = s.stats.bigHit;
  if (run.epilogue === 'fighting') {
    // The run was already won at the Act 3 boss; the Reflection is for glory.
    run.epilogue = s.phase === 'won' ? 'won' : 'lost';
    if (s.phase === 'won') { run.stats.fights++; run.stats.bosses++; run.hp = Math.max(1, s.player.hp); }
    run.won = true;
    run.combat = null;
    // v0.5: after the mirror, the Long Night may still be waiting.
    if (run.epilogue === 'won' && nightReady(run)) { run.screen = 'epilogue'; return; }
    run.screen = 'victory';
    run.finished = true;
    return;
  }
  if (s.phase === 'lost') {
    if (s.enemies.some((e) => e.def.startsWith('echo'))) run.stats.echoMet = (run.stats.echoMet ?? 0) + 1;
    run.hp = 0;
    if (nightOf(run)) { run.screen = 'victory'; run.finished = true; run.combat = null; return; }
    run.screen = 'defeat';
    run.finished = true;
    run.combat = null;
    return;
  }
  run.hp = Math.max(1, Math.min(run.maxHp, s.player.hp));
  evolveCards(run, s.stats.evo);
  // v0.8: Field Dressing heals after elite and boss fights only.
  if (run.bonus?.mend && s.kind !== 'normal') run.hp = Math.min(run.maxHp, run.hp + run.bonus.mend);
  let dareMsg: string | null = null;
  if (run.dare) {
    const d = DARE_MAP[run.dare.id];
    const pay = DARE_PAYOUT * (run.fate === 'daredevil' ? 2 : 1);
    if (d?.check(s)) { run.gold += run.dare.stake + pay; run.stats.goldEarned += pay; run.daresWon = (run.daresWon ?? 0) + 1; dareMsg = `Dare won: +${run.dare.stake + pay} gold`; }
    else dareMsg = `Dare lost: ${run.dare.stake} gold forfeited`;
    run.dare = null;
  }
  run.dareOffer = null;
  const champ = !!s.affix && !s.nemesis;
  if (champ) run.champs = (run.champs ?? 0) + 1;
  if (s.nemesis && run.nemesis) run.nemesis.slain = true;
  if (s.venue) run.stats.venueWins = (run.stats.venueWins ?? 0) + 1;
  run.stats.exhumes = (run.stats.exhumes ?? 0) + (s.stats.exhumes ?? 0);
  run.stats.primeMax = Math.max(run.stats.primeMax ?? 0, s.stats.primeMax ?? 0);
  run.stats.converge = Math.max(run.stats.converge ?? 0, s.stats.converge ?? 0);
  run.stats.fights++;
  run.actFights++;
  // v0.6: temporary boons tick down; a Harvest Moon (or a hearty meal) heals after the fight.
  const hadBounty = s.kind === 'elite' && (run.buffs?.bounty ?? 0) > 0;
  const fed = (run.buffs?.wellfed ?? 0) > 0;
  if (run.buffs) for (const k of Object.keys(run.buffs)) { if (k === 'bounty' && s.kind !== 'elite') continue; if (--run.buffs[k] <= 0) delete run.buffs[k]; }
  const heal6 = (skyOf(run)?.healAfter ?? 0) + (fed ? 2 : 0);
  if (heal6) run.hp = Math.min(run.maxHp, run.hp + heal6);
  if (s.rare) run.rares = (run.rares ?? 0) + (s.once.rareKill ? 1 : 0);
  if (s.surprise?.fired) run.surprises = (run.surprises ?? 0) + 1;
  if (s.kind === 'elite') run.stats.elites++;
  if (s.enemies.some((e) => e.def.startsWith('echo'))) { run.stats.echoMet = (run.stats.echoMet ?? 0) + 1; run.stats.echoWon = (run.stats.echoWon ?? 0) + 1; }
  if (s.kind === 'boss') run.stats.bosses++;
  for (const r of run.relics) RELICS[r]?.afterCombat?.(run);
  const r = rng(run, 'reward');
  const kind = s.kind;
  run.combat = null;
  if (kind === 'boss' && run.act === 3) {
    run.won = true;
    if (epilogueReady(run)) run.epilogue = 'offered';
    if (run.epilogue === 'offered' || nightReady(run)) { run.screen = 'epilogue'; return; }
    run.screen = 'victory';
    run.finished = true;
    return;
  }
  const base = kind === 'boss' ? r.int(70, 85) : kind === 'elite' ? r.int(25, 35) : r.int(10, 18);
  const vowGold = 1 - 0.25 * (run.vows?.vow_poor ?? 0);
  const venueGold = s.venue ? (run.relics.includes('season_ticket') ? 25 : 0) + (run.twist === 'grand_tour' ? Math.round(base * 0.5) : 0) : 0;
  const sky = skyOf(run);
  const fatePct = run.fate === 'night_owl' ? 30 : run.fate === 'merchant' ? -25 : 0;
  const skyPct = (sky?.goldPct ?? 0) + (kind === 'elite' ? sky?.eliteGoldPct ?? 0 : 0);
  const champMult = champ ? (sky?.id === 'procession' ? 1.9 : 1.6) : 1;
  let gold = Math.round(base * champMult * vowGold * (run.twist === 'gold_rush' ? 2 : 1) * (kind === 'elite' && run.fate === 'hunter' ? 2 : 1)
    * (1 + (relicMod(run, 'goldPct') + (run.bonus?.goldPct ?? 0) + skyPct + fatePct) / 100))
    + venueGold + (s.nemesis ? 60 : 0) + (hadBounty ? 50 : 0);
  // v0.6 rare monsters: a rich prize if you caught one, almost nothing if it got away.
  const rareKill = !!s.once.rareKill;
  const fled = !!s.rare && !rareKill;
  if (rareKill) gold += [50, 80, 100][Math.min(3, Math.max(1, run.act)) - 1] + (run.relics.includes('rabbit_foot') ? 40 : 0);
  if (kind === 'elite' && run.relics.includes('hunters_horn')) { gold += 15; gainOmen(run, r.pick(OMEN_LIST).id); }
  if (fled) gold = 5;
  // Omens drop from fights: 20% normal, 45% elite, always from bosses (twice as often on a Night of Omens).
  const oc = kind === 'elite' && sky?.eliteGoldPct ? 1 : (kind === 'boss' ? 1 : kind === 'elite' ? 0.45 : 0.2) * (run.twist === 'omens' ? 2 : 1) * (sky?.omenMult ?? 1);
  let omen: string | null = null;
  let omenKept = false;
  if (r.next() < oc) { omen = r.pick(OMEN_LIST).id; omenKept = gainOmen(run, omen); }
  run.reward = {
    gold, goldTaken: false,
    cards: fled ? null : cardChoices(run, kind === 'boss' || run.rareReward || champ || s.nemesis ? 'rare' : kind),
    hidden: null,
    relic: kind === 'elite' || rareKill ? (rareKill && run.act >= 3 ? (relicPool(run, 'rare').length ? r.pick(relicPool(run, 'rare')) : randomRelic(run)) : randomRelic(run)) : null,
    relicChoices: kind === 'boss' ? rng(run, 'reward').sample(relicPool(run, 'boss'), 2) : null,
    note: fled ? 'It got away!' : rareKill ? 'Caught it! A rare prize.' : dareMsg,
    champ,
    omen,
    omenKept,
    nemesis: !!s.nemesis,
    venue: s.venue ?? null,
  };
  if (run.reward.cards) run.reward.hidden = hiddenCard(run, kind === 'boss' || run.rareReward || champ || s.nemesis ? 'rare' : kind, run.reward.cards);
  if (s.echoBeat) { run.echoBeat = null; run.reward.note = run.reward.note ?? 'Your old deck folds. Across the table, the Dealer almost smiles.'; }
  run.screen = 'reward';
}

/** v0.14 The Deal: a fourth card, face-down and one rarity higher (rare stays rare, with a better shot at a Legendary). */
export function hiddenCard(run: RunState, kind: 'normal' | 'elite' | 'boss' | 'rare', out: string[]): string | null {
  const r = rng(run, 'deal');
  const owned = run.owned ?? [];
  const hasLegend = rewardPool(run.character, run.level, 'legendary', owned).length > 0;
  let rarity: string;
  if (kind === 'rare' || kind === 'boss') rarity = hasLegend && r.next() < 0.2 ? 'legendary' : 'rare';
  else { const x = r.next(); rarity = x < (kind === 'elite' ? 0.35 : 0.2) ? 'rare' : 'uncommon'; }
  const pool = rewardPool(run.character, run.level, rarity, owned).filter((id) => !out.includes(id));
  return pool.length ? r.pick(pool) : null;
}

/** v0.12: may `id` join an offer that already holds `out`? Not if it plays like one of them or makes three of a type. */
export function offerFits(id: string, out: string[]): boolean {
  const d = CARDS[id];
  if (out.filter((o) => CARDS[o].type === d.type).length >= 2) return false;
  const e = effectsOf(d).join('+');
  return !out.some((o) => CARDS[o].type === d.type && effectsOf(CARDS[o]).join('+') === e);
}
/** v0.12: statuses and mechanics the cards in your deck use (plain damage and Block don't count). */
export function deckThemes(run: RunState): Set<string> {
  const t = new Set<string>();
  for (const c of run.deck) { const d = CARDS[c.id]; if (d && d.type !== 'curse') for (const x of themesOf(d)) t.add(x); }
  return t;
}

export function cardChoices(run: RunState, kind: 'normal' | 'elite' | 'boss' | 'rare'): string[] {
  const r = rng(run, 'reward');
  const out: string[] = [];
  const n = Math.max(2, 3 + (run.bonus?.choices ?? 0) + (skyOf(run)?.choices ?? 0) + (run.fate === 'bard' ? 1 : run.fate === 'brute' ? -1 : 0));
  const owned = run.owned ?? [];
  const rareFirst = !!skyOf(run)?.rareFirst;
  const hasLegend = rewardPool(run.character, run.level, 'legendary', owned).length > 0;
  for (let i = 0; i < n; i++) {
    let rarity: string;
    if (kind === 'rare' || kind === 'boss' || (rareFirst && i === 0)) rarity = hasLegend && r.next() < 0.08 ? 'legendary' : 'rare';
    else {
      const rare = kind === 'elite' ? 0.15 : 0.06;
      const unc = kind === 'elite' ? 0.4 : 0.33;
      const x = r.next();
      rarity = x < rare ? 'rare' : x < rare + unc ? 'uncommon' : 'common';
      if (rarity === 'rare' && hasLegend && r.next() < 0.15) rarity = 'legendary';
    }
    const pool = rewardPool(run.character, run.level, rarity, owned).filter((id) => !out.includes(id));
    const fallback = rewardPool(run.character, run.level, undefined, owned).filter((id) => !out.includes(id));
    let src = pool.length ? pool : fallback;
    // v0.12: a reward is a choice. Never two cards that play the same way, never three of one type.
    const varied = src.filter((id) => offerFits(id, out));
    if (varied.length) src = varied;
    // Cards you own in your collection are twice as likely to be offered.
    const fav = run.favored;
    // v0.7: with ~1000 cards, hand-made cards are twice as likely as generated ones, and Neutral is toned down.
    // v0.12: the last card offered leans toward what your deck already does (a card that shares a status or mechanic).
    const lean = i === n - 1 ? deckThemes(run) : null;
    const w = (id: string): number => (fav?.includes(id) ? 2 : 1) * (CARDS[id].gen ? 1 : 2) * (CARDS[id].faction === 'neutral' ? 0.6 : 1)
      * (lean && themesOf(CARDS[id]).some((t) => lean.has(t)) ? 3 : 1);
    out.push(r.weighted(src.map((id) => [id, w(id)] as [string, number])));
  }
  return out;
}

/** Talent: reroll the current card reward. */
export function rerollCards(run: RunState): boolean {
  if (!run.reward?.cards || !(run.rerolls ?? 0)) return false;
  run.rerolls!--;
  run.reward.cards = cardChoices(run, run.reward.champ || run.reward.rareCards ? 'rare' : 'normal');
  return true;
}

// ───────── dares ─────────

export function takeDare(run: RunState, id: string | null): boolean {
  const s = run.combat;
  if (!s || !run.dareOffer || s.turn !== 1 || s.cardsThisTurn > 0) return false;
  if (id && run.dareOffer.includes(id)) {
    const stake = Math.min(run.gold, 25);
    run.gold -= stake;
    run.dare = { id, stake };
  }
  run.dareOffer = null;
  return true;
}

// ───────── forge node ─────────

export function forgeApply(run: RunState, uid: number, mod: ModId): boolean {
  const f = run.forge;
  const c = run.deck.find((x) => x.uid === uid);
  if (!f || f.done || !c || !f.mods.includes(mod) || !MODS[mod].fits(CARDS[c.id])) return false;
  c.mod = mod;
  f.done = true;
  return true;
}

export function relicPool(run: RunState, rarity: string): string[] {
  return RELIC_LIST.filter((x) => x.rarity === rarity && !run.relics.includes(x.id) && (x.unlock ?? 0) <= run.level
    && (!x.ach || !!run.owned?.includes(x.id)) && (!x.char || x.char === run.character)).map((x) => x.id);
}

export function randomRelic(run: RunState): string {
  const r = rng(run, 'reward');
  for (let i = 0; i < 4; i++) {
    const rar = r.weighted<string>([['common', 50], ['uncommon', 35], ['rare', 15]]);
    const pool = relicPool(run, rar);
    if (pool.length) return r.pick(pool);
  }
  return relicPool(run, 'common')[0] ?? 'iron_buckle';
}

export function gainRelic(run: RunState, id: string): void {
  if (run.relics.includes(id)) return;
  run.relics.push(id);
  RELICS[id]?.onPickup?.(run, rng(run, 'misc'));
}

// ───────── rewards ─────────

export function takeGold(run: RunState): void {
  if (!run.reward || run.reward.goldTaken) return;
  run.gold += run.reward.gold;
  run.stats.goldEarned += run.reward.gold;
  run.reward.goldTaken = true;
}

export function takeCard(run: RunState, id: string | null): void {
  const w = run.reward;
  if (!w?.cards) return;
  const blind = !!id && id === w.hidden;
  if (id && (w.cards.includes(id) || blind)) {
    addToDeck(run, id);
    // v0.14: the Dealer may answer a rare or a blind pick (every rare at Stakes 4).
    const rare = ['rare', 'legendary'].includes(CARDS[id].rarity);
    if ((rare || blind) && !run.arena && !run.puzzle && !run.tutorial && ((run.ascension >= 4 && rare) || rng(run, 'deal').next() < ANSWER_CHANCE)) {
      const counter = run.deck.some((c) => CARDS[c.id].type === 'counter');
      w.answer = { card: id, cost: counter ? ANSWER_COST - 10 : ANSWER_COST, jinx: 'regret' };
    }
  }
  // v0.17 Second Look (a Dealer's favor): the rest of the Deal stays on the table for one more pick.
  if (w.extraPick && id) {
    w.extraPick = false;
    w.cards = w.cards.filter((c) => c !== id);
    w.hidden = null;
    if (w.cards.length) return;
  }
  w.rareCards = undefined;
  w.cards = null;
  w.hidden = null;
}

/** v0.14: answer the Dealer's answer. Negate it with gold, or let it resolve and take the Jinx. */
export function answerDealer(run: RunState, negate: boolean): boolean {
  const w = run.reward;
  if (!w?.answer) return false;
  const a = w.answer;
  if (negate) {
    if (run.gold < a.cost) return false;
    run.gold -= a.cost;
    w.answerNote = `You Negate the Dealer's answer (−${a.cost} gold). ${CARDS[a.card].name} is yours, clean.`;
  } else {
    addToDeck(run, a.jinx);
    w.answerNote = `It resolves: a ${CARDS[a.jinx].name} Jinx joins your deck with ${CARDS[a.card].name}.`;
  }
  w.answer = null;
  return true;
}

export function takeRelic(run: RunState, id?: string): void {
  if (!run.reward) return;
  if (id && run.reward.relicChoices?.includes(id)) { gainRelic(run, id); run.reward.relicChoices = null; return; }
  if (run.reward.relic) { gainRelic(run, run.reward.relic); run.reward.relic = null; }
}

/** Leave a reward/treasure/shop/rest/event screen. */
export function proceed(run: RunState): void {
  // An unanswered Dealer's answer resolves on its own.
  if (run.reward?.answer) answerDealer(run, false);
  if (run.reward) {
    takeGold(run);
    if (run.screen === 'treasure') takeRelic(run);
  }
  const bossDone = run.pos?.row === ROWS;
  run.reward = null; run.shop = null; run.event = null; run.forge = null;
  run.evPot = 0;
  // v0.6: after a roadside encounter (and any fight it started), carry on into the node you were heading for.
  if (run.wayside && !bossDone) {
    const w = run.wayside;
    run.wayside = null; run.mystery = null;
    if (run.relics.includes('wayfarer_boots')) run.hp = Math.min(run.maxHp, run.hp + 4);
    enterNode(run, w.row, w.col);
    return;
  }
  if (bossDone) nextAct(run);
  run.screen = run.patron && !run.patron.done ? 'patron' : 'map';
}

export function nextAct(run: RunState): void {
  run.act++;
  if (nightOf(run) > 1) addTerror(run);
  const missing = run.maxHp - run.hp;
  run.hp += Math.round(missing * ((run.vows?.vow_thirst ?? 0) >= 2 ? 0.5 : 1));
  if (run.fate === 'stargazer') run.hp = Math.min(run.maxHp, run.hp + 10);
  if (run.relics.includes('golden_acorn')) { run.maxHp += 5; run.hp += 5; }
  run.pos = null;
  run.actFights = 0;
  run.wayside = null;
  run.peeks = PEEKS + (run.relics.includes('storm_glass') ? 1 : 0);
  run.map = genMap(run);
  // v0.5 Patrons visit at the start of Acts 2 and 3.
  if ((run.act === 2 || run.act === 3) && !run.arena && !run.puzzle && !run.relics.includes('patrons_seal')) {
    const r = rng(run, 'event');
    const pt = r.pick(PATRONS);
    const offers = r.sample(pt.blessings.filter((b) => !b.can || b.can(run)).map((b) => b.id), 3);
    run.patron = { id: pt.id, offers, done: false };
  } else run.patron = null;
}

/** v0.5: accept a Patron's blessing (or pass with null). */
export function choosePatron(run: RunState, id: string | null): string | null {
  const pt = run.patron;
  if (!pt || pt.done) return null;
  pt.done = true;
  run.screen = 'map';
  if (!id || !pt.offers.includes(id)) return null;
  const b = BLESSING_MAP[id];
  if (!b || (b.can && !b.can(run))) return null;
  const r = rng(run, 'event');
  const api: BlessingApi = {
    rng: r,
    gainRelic: (rid) => gainRelic(run, rid),
    randomRelic: (rar) => { const pool = relicPool(run, rar); return pool.length ? r.pick(pool) : null; },
    offerCards: (rarity) => { run.reward = { gold: 0, goldTaken: true, cards: cardChoices(run, rarity === 'rare' ? 'rare' : 'normal'), relic: null }; run.screen = 'reward'; },
    addToDeck: (cid, up) => { addToDeck(run, cid, up); },
    removeCard: (uid) => { removeCard(run, uid); },
  };
  run.stats.blessings = (run.stats.blessings ?? 0) + 1;
  // v0.14: every blessing is a bargain. The Patron calls it in at this act's boss, as one more trap on its side.
  const trap = PATRON_TRAP[pt.id];
  if (trap) (run.debts ??= []).push({ patron: pt.id, trap, act: run.act });
  return b.apply(run, api);
}

export function patronOf(run: RunState) { return run.patron ? PATRON_MAP[run.patron.id] : null; }

// ───────── v0.5: the Long Night (endless) ─────────

/** Can this run descend after the Act 3 boss (or the Reflection)? */
export function nightReady(run: RunState): boolean { return !!run.nightOk && !!run.won && !run.daily && !run.weekly && !run.arena && !run.puzzle; }

export function descendNight(run: RunState): void {
  if (!nightReady(run) || nightOf(run)) return;
  run.night = 1;
  run.act = 5;
  run.finished = false;
  run.combat = null;
  run.reward = null;
  run.epilogue = run.epilogue === 'offered' ? null : run.epilogue;
  run.hp = Math.min(run.maxHp, run.hp + Math.round((run.maxHp - run.hp) / 2));
  run.pos = null;
  run.actFights = 0;
  addTerror(run);
  run.map = genMap(run);
  run.screen = 'map';
}

/** v0.6: each night of the Long Night adds a Night Terror; they stack. */
export function addTerror(run: RunState): void {
  const have = run.terrors ?? (run.terrors = []);
  const left = TERRORS.filter((t) => !have.includes(t.id));
  have.push(rng(run, 'sky').pick(left.length ? left : TERRORS).id);
}

// ───────── shop ─────────

export function priceMult(run: RunState): number {
  return Math.max(0.3, 1 + (relicMod(run, 'shopPct') + (run.bonus?.shopPct ?? 0)) / 100) * (run.ascension >= 8 ? 1.2 : 1) * (run.twist === 'gold_rush' ? 1.5 : 1)
    * (1 + 0.25 * (run.vows?.vow_greed ?? 0))
    * (1 + ((skyOf(run)?.shopPct ?? 0) + (run.fate === 'gambler' ? 25 : run.fate === 'merchant' ? -25 : 0)) / 100);
}

export function genShop(run: RunState): RunState['shop'] {
  const r = rng(run, 'shop');
  const m = priceMult(run);
  const pick = (rar: string, n: number) => r.sample(rewardPool(run.character, run.level, rar, run.owned), n);
  const cards = [
    ...pick('common', run.relics.includes('membership_card') ? 3 : 2).map((id) => ({ id, price: r.int(45, 55) })),
    ...pick('uncommon', 2).map((id) => ({ id, price: r.int(70, 82) })),
    ...pick('rare', 1).map((id) => ({ id, price: r.int(140, 160) })),
  ].map((c) => ({ ...c, price: Math.round(c.price * m), sold: false }));
  const sale = r.int(0, cards.length - 1);
  cards[sale].price = Math.round(cards[sale].price / 2);
  // v0.6 Light Fingers: the first card of every shop is yours for free.
  if (run.fate === 'light_fingers' && cards.length) cards[0].price = 0;
  const relics = [
    ...r.sample(relicPool(run, 'common'), 1).map((id) => ({ id, price: r.int(140, 160) })),
    ...r.sample(relicPool(run, 'uncommon'), 1).map((id) => ({ id, price: r.int(190, 220) })),
    ...r.sample(relicPool(run, 'shop'), 1).map((id) => ({ id, price: r.int(150, 170) })),
  ].map((x) => ({ ...x, price: Math.round(x.price * m), sold: false }));
  const omens = r.sample(OMEN_LIST.map((o) => o.id), 2).map((id) => ({ id, price: Math.round(r.int(45, 60) * m), sold: false }));
  return { cards, relics, removePrice: Math.round(run.removeCost * m * (run.relics.includes('membership_card') ? 0.75 : 1) * (run.fate === 'light_fingers' ? 1.5 : 1)), removed: false, omens };
}

/** v0.14: what removing this card costs here (Jinxes go for half). */
export function removePriceFor(run: RunState, uid: number): number {
  const s = run.shop;
  const c = run.deck.find((x) => x.uid === uid);
  if (!s || !c) return Infinity;
  return CARDS[c.id].type === 'curse' ? Math.round(s.removePrice / 2) : s.removePrice;
}

/** v0.14: pay off a Patron's debt at the Merchant so it never sits in on the boss. */
export function payDebt(run: RunState, i: number): boolean {
  const d = run.debts?.[i];
  if (!d || run.screen !== 'shop' || run.gold < DEBT_PRICE) return false;
  run.gold -= DEBT_PRICE;
  run.debts!.splice(i, 1);
  return true;
}

export function buyCard(run: RunState, i: number): boolean {
  const it = run.shop?.cards[i];
  if (!it || it.sold || run.gold < it.price) return false;
  run.gold -= it.price; it.sold = true; addToDeck(run, it.id);
  return true;
}

export function buyRelic(run: RunState, i: number): boolean {
  const it = run.shop?.relics[i];
  if (!it || it.sold || run.gold < it.price) return false;
  run.gold -= it.price; it.sold = true; gainRelic(run, it.id);
  return true;
}

export function buyOmen(run: RunState, i: number): boolean {
  const it = run.shop?.omens?.[i];
  if (!it || it.sold || run.gold < it.price) return false;
  if (!gainOmen(run, it.id)) return false;
  run.gold -= it.price; it.sold = true;
  return true;
}

/** Use a map-usable Omen (e.g. The Star) outside combat. */
export function useOmenOnMap(run: RunState, i: number): boolean {
  const id = run.omens?.[i];
  const d = id ? OMEN_MAP[id] : null;
  if (!d?.map || run.combat) return false;
  run.omens!.splice(i, 1);
  run.stats.omensUsed = (run.stats.omensUsed ?? 0) + 1;
  d.map(run);
  return true;
}

export function discardOmen(run: RunState, i: number): void { run.omens?.splice(i, 1); }

export function buyRemove(run: RunState, uid: number): boolean {
  const s = run.shop;
  const price = removePriceFor(run, uid);
  if (!s || s.removed || run.gold < price) return false;
  if (!removeCard(run, uid)) return false;
  run.gold -= price; s.removed = true; run.removeCost += REMOVE_STEP;
  return true;
}

// ───────── rest ─────────

/** HP a rest would heal right now (Sky, Fate and Vows included), capped at missing HP. */
export function restHealAmount(run: RunState): number {
  if (run.fate === 'ascetic') return run.maxHp - run.hp;
  const base = skyOf(run)?.restHeal ?? MEND_PCT;
  return Math.min(run.maxHp - run.hp, Math.round((run.maxHp * base + MEND_FLAT) * (run.vows?.vow_thirst ? 0.5 : 1)));
}

export function restHeal(run: RunState): void {
  if (run.restDone) return;
  run.hp += restHealAmount(run);
  run.restDone = true;
}

/** v0.11: upgrade down path A (default) or path B. */
export function upgradeCard(run: RunState, uid: number, path?: 'b'): boolean {
  const c = run.deck.find((x) => x.uid === uid);
  if (!c || c.up || CARDS[c.id].type === 'curse') return false;
  c.up = true;
  if (path === 'b') c.path = 'b';
  return true;
}

export function restUpgrade(run: RunState, uid: number, path?: 'b'): boolean {
  if (run.restDone || run.fate === 'ascetic') return false;
  if (!upgradeCard(run, uid, path)) return false;
  run.restDone = true;
  return true;
}

/** v0.14 Rehearse: pick a Reaction; a copy of it starts your next fight already set. */
export function restRehearse(run: RunState, uid: number): boolean {
  const c = run.deck.find((x) => x.uid === uid);
  if (run.restDone || !c || CARDS[c.id].type !== 'reaction') return false;
  run.rehearse = `${c.id}${c.up ? '+1' : ''}`;
  run.restDone = true;
  return true;
}

/** v0.14 Scout: flip every face-down card left in this act and see the next Rival's traps. */
export function restScout(run: RunState): boolean {
  if (run.restDone) return false;
  for (const row of run.map) for (const n of row) if (n.down) n.seen = true;
  run.scout = true;
  run.restDone = true;
  return true;
}

export function removeCard(run: RunState, uid: number): boolean {
  const i = run.deck.findIndex((x) => x.uid === uid);
  if (i < 0) return false;
  run.deck.splice(i, 1);
  return true;
}

// ───────── events ─────────

export interface RunApi {
  rng: Rng;
  offerCards: (rarity?: 'rare') => void;
  removeCard: (uid: number) => void;
  duplicateCard: (uid: number) => void;
  transformCard: (uid: number) => string;
  upgradeRandom: (n: number) => number;
  gainRandomRelic: () => string;
  addToDeck: (id: string) => void;
  fightEcho: () => void;
  // ── v0.6 ──
  /** Start a fight from an event (its normal reward follows; rare: a rare card reward; champ: with a Champion affix). */
  fight: (enemies: string[], kind?: 'normal' | 'elite', o?: { name?: string; rare?: boolean; champ?: boolean }) => void;
  /** A fight from this act's pools. */
  fightAct: (pool: 'easy' | 'normal' | 'elite', o?: { rare?: boolean; champ?: boolean }) => void;
  /** This act's rare monster. */
  rareFight: () => void;
  /** Move on to another stage of the event (a multi-step event). */
  goto: (stage: string) => void;
  gainOmens: (n: number) => number;
  /** A random fitting Sigil on that card (or a random card). Returns the sigil's name. */
  sigil: (uid?: number) => string | null;
  /** Gain a random relic of that rarity. Returns its name. */
  relic: (rarity: 'common' | 'uncommon' | 'rare') => string | null;
  /** A random card id from your factions. */
  randomCard: (o?: { rarity?: string; type?: string }) => string | null;
  /** A temporary boon for the next N fights. */
  buff: (id: string, fights: number) => void;
  heal: (n: number) => number;
  /** Lose HP (never below 1). */
  hurt: (n: number) => void;
  gold: (n: number) => void;
  /** Swap to a random ordinary event. */
  randomEvent: () => void;
  /** Replace your Fate with a random other one. */
  newFate: () => void;
}

/** Start an event of this kind: an Event node, a Shrine node, or a roadside encounter. */
export function startEvent(run: RunState, kind: 'event' | 'shrine' | 'wayside' = 'event'): void {
  const r = rng(run, 'event');
  const base = kind === 'shrine' ? SHRINES : kind === 'wayside' ? WAYSIDE : NODE_EVENTS;
  const act = Math.min(3, run.act);
  const fits = base.filter((e) => (!e.acts || e.acts.includes(act)) && (run.act > 1 || e.id !== 'lost_duelist'));
  let pool = fits.filter((e) => !run.seenEvents.includes(e.id));
  if (!pool.length) { run.seenEvents = run.seenEvents.filter((id) => !fits.some((e) => e.id === id)); pool = fits; }
  const ev = r.pick(pool.length ? pool : base);
  run.seenEvents.push(ev.id);
  run.event = { id: ev.id, resolved: null };
  run.screen = 'event';
}

export function eventApi(run: RunState): RunApi {
  const r = rng(run, 'event');
  const fightFrom = (enc: Encounter, kind: 'normal' | 'elite', o: { rare?: boolean; champ?: boolean } = {}) => {
    run.rareReward = !!o.rare;
    run.event = null;
    run.mystery = null;
    startCombat(run, enc, kind, o.champ ? rng(run, 'combat').pick(AFFIXES).id : undefined);
  };
  const api: RunApi = {
    rng: r,
    offerCards: (rarity) => {
      run.reward = { gold: 0, goldTaken: true, cards: cardChoices(run, rarity === 'rare' ? 'rare' : 'normal'), relic: null };
    },
    removeCard: (uid) => { removeCard(run, uid); },
    duplicateCard: (uid) => { const c = run.deck.find((x) => x.uid === uid); if (c) { const k = addToDeck(run, c.id, c.up, c.mod); if (c.path) k.path = c.path; } },
    transformCard: (uid) => {
      const c = run.deck.find((x) => x.uid === uid);
      if (!c) return 'nothing';
      removeCard(run, uid);
      const id = r.pick(rewardPool(run.character, run.level, undefined, run.owned).filter((x) => x !== c.id));
      addToDeck(run, id);
      return CARDS[id].name;
    },
    upgradeRandom: (n) => {
      const ups = run.deck.filter((c) => !c.up && CARDS[c.id].type !== 'curse');
      let k = 0;
      for (; k < n && ups.length; k++) ups.splice(r.int(0, ups.length - 1), 1)[0].up = true;
      return k;
    },
    gainRandomRelic: () => { const id = randomRelic(run); gainRelic(run, id); return RELICS[id].name; },
    addToDeck: (id) => { addToDeck(run, id); },
    fightEcho: () => {
      const e = actEnc(run).elite.find((x) => x.enemies[0].startsWith('echo')) ?? ENCOUNTERS[2].elite[0];
      fightFrom(e, 'elite', { rare: true });
    },
    fight: (enemies, kind = 'normal', o = {}) => fightFrom({ id: enemies.join('+'), name: o.name ?? 'Ambush', enemies }, kind, o),
    fightAct: (pool, o = {}) => {
      const p = actEnc(run);
      fightFrom(pickEncounter(run, pool === 'easy' ? p.easy : pool === 'elite' ? p.elite.filter((e) => !ENEMY_IS_ECHO(e)) : p.normal), pool === 'elite' ? 'elite' : 'normal', o);
    },
    rareFight: () => { run.event = null; run.mystery = null; startRare(run); },
    goto: (stage) => { if (EVENT_MAP[stage]) { run.event = { id: stage, resolved: null, note: null }; run.mystery = null; } },
    gainOmens: (n) => { let k = 0; for (let i = 0; i < n; i++) if (gainOmen(run, r.pick(OMEN_LIST).id)) k++; return k; },
    sigil: (uid) => {
      const opts = uid !== undefined ? run.deck.filter((c) => c.uid === uid) : run.deck.filter((c) => !c.mod && CARDS[c.id].type !== 'curse');
      for (let i = 0; i < 12 && opts.length; i++) {
        const c = r.pick(opts);
        const fit = MOD_LIST.filter((m) => m.fits(CARDS[c.id]) && m.id !== c.mod);
        if (fit.length) { const m = r.pick(fit); c.mod = m.id; return `${m.name} (${CARDS[c.id].name})`; }
      }
      return null;
    },
    relic: (rar) => { const pool = relicPool(run, rar); if (!pool.length) return null; const id = r.pick(pool); gainRelic(run, id); return RELICS[id].name; },
    randomCard: (o = {}) => {
      const pool = rewardPool(run.character, run.level, o.rarity, run.owned).filter((id) => !o.type || CARDS[id].type === o.type);
      return pool.length ? r.pick(pool) : null;
    },
    buff: (id, fights) => { (run.buffs ??= {})[id] = Math.max(run.buffs[id] ?? 0, fights); },
    heal: (n) => { const h = Math.max(0, Math.min(n, run.maxHp - run.hp)); run.hp += h; return h; },
    hurt: (n) => { run.hp = Math.max(1, run.hp - n); },
    gold: (n) => { run.gold += n; run.stats.goldEarned += n; },
    randomEvent: () => {
      const pool = NODE_EVENTS.filter((e) => !run.seenEvents.includes(e.id) && (!e.acts || e.acts.includes(Math.min(3, run.act))));
      const ev = r.pick(pool.length ? pool : NODE_EVENTS);
      run.seenEvents.push(ev.id);
      run.event = { id: ev.id, resolved: null, note: null };
    },
    newFate: () => { const id = r.pick(FATES.filter((f) => f.id !== run.fate).map((f) => f.id)); setFate(run, id); },
  };
  return api;
}

export function chooseEvent(run: RunState, idx: number, uid?: number): boolean {
  if (!run.event || run.event.resolved) return false;
  const ev = EVENT_MAP[run.event.id];
  const opt = ev.options[idx];
  if (!opt || (opt.can && !opt.can(run))) return false;
  if (opt.pick && uid === undefined) return false;
  const before = run.event;
  const msg = opt.apply(run, eventApi(run), uid);
  // A multi-stage event moved on: show what just happened above the next stage.
  if (run.event && run.event !== before) { run.event.note = msg; return true; }
  if (run.event) run.event.resolved = msg;
  return true;
}

// ───────── scoring & legacy ─────────

export function runScore(run: RunState): number {
  const base = run.floor * 10 + run.stats.elites * 30 + run.stats.bosses * 100 + run.stats.maxChain * 5
    + (run.won ? 300 + run.hp * 2 : 0) + run.ascension * 25 + Math.round((run.stats.style ?? 0) / 10)
    + (run.epilogue === 'won' ? 400 : run.epilogue === 'lost' ? 50 : 0) + nightsCleared(run) * 150 + (run.nemesis?.slain ? 100 : 0);
  return Math.round(base * (1 + 0.1 * (run.heat ?? 0)));
}

export function runXp(run: RunState): number {
  return run.floor * 4 + run.stats.elites * 15 + run.stats.bosses * 40 + (run.won ? 100 : 0) + run.ascension * 10 + (run.epilogue === 'won' ? 80 : 0)
    + Math.min(nightsCleared(run), 5) * 30;
}

/** Nights of the Long Night fully cleared (boss beaten). */
export function nightsCleared(run: RunState): number { const n = nightOf(run); return n ? n - 1 : 0; }

export function canMint(run: RunState): boolean { return !!run.won || run.stats.bosses >= 1; }

export function deckCodes(run: RunState): string[] {
  return run.deck.filter((c) => CARDS[c.id].type !== 'curse').map((c) => `${c.id}${upCode(c)}`);
}

export function charFactions(ch: CharId): string[] { return factionsOf(ch); }
