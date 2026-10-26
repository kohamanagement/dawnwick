// Arena: the async PvP mode. Draft a deck, then duel other duelists' saved decks (your Legacy decks,
// imported deck codes, and generated rivals) until 7 wins or 3 losses. Rivals are played by the same
// Echo code that runs ghost elites, so no server is needed; online play would only swap where decks come from.
import type { CharId, RunState } from './types';
import type { ArenaState, Profile } from './meta';
import { Rng, hashStr } from './rng';
import { newRun, startCombat, DEFAULT_ECHOES } from './run';
import { CARDS, rewardPool } from '../data/cards';
import { CHARACTERS } from '../data/characters';
import { levelOf } from './meta';
import { runUnlocks, bump, grant } from './economy';

export const ARENA_WINS = 7;
export const ARENA_LOSSES = 3;
export const ARENA_PICKS = 10;
export const ARENA_HP = 60;

const RIVAL_NAMES = ['Countess Vell', 'Brother Ash', 'Mirelle of the Docks', 'The Quiet Fencer', 'Old Man Gambit', 'Sable Nine',
  'Lady Thornwick', 'Captain Ebb', 'The Bone Clerk', 'Juno Lark', 'Master Ferro', 'The Velvet Twins', 'Pip the Lucky', 'Auntie Mortis'];
const TIERS = ['Bronze', 'Bronze', 'Silver', 'Silver', 'Gold', 'Gold', 'Diamond', 'Grandmaster'];

function rngOf(a: ArenaState): Rng { const h = { a: a.seed }; const r = new Rng(h, 'a'); a.seed = (a.seed + 0x9e3779b9) >>> 0 || 1; return r; }

export function tierName(wins: number): string { return TIERS[Math.min(TIERS.length - 1, wins)]; }

function draftRound(p: Profile, ch: CharId, n: number, r: Rng): string[] {
  const lvl = levelOf(p.xp);
  const owned = runUnlocks(p);
  const rarity = n === 4 || n === 9 ? 'rare' : n % 3 === 1 ? 'uncommon' : 'common';
  const pool = rewardPool(ch, lvl, rarity, owned);
  const legends = rewardPool(ch, lvl, 'legendary', owned);
  const out = r.sample(pool, 3);
  if (rarity === 'rare' && legends.length && r.chance(0.3)) out[2] = r.pick(legends);
  return out;
}

export function arenaStart(p: Profile, ch: CharId, seed = Math.floor(Math.random() * 2 ** 31)): ArenaState {
  const c = CHARACTERS[ch];
  // A lean base: 2 Strikes, 2 Guards and the duelist's two signature starters, then 10 draft picks.
  const sig = [...new Set(c.deck.filter((id) => id !== 'strike' && id !== 'guard'))].slice(0, 2);
  const a: ArenaState = { character: ch, stage: 'draft', deck: ['strike', 'strike', 'guard', 'guard', ...sig], picks: [], pickNo: 0, wins: 0, losses: 0, rival: null, spoils: null, duel: null, seed: hashStr(`arena${seed}`) };
  const r = rngOf(a);
  for (let i = 0; i < ARENA_PICKS; i++) a.picks.push(draftRound(p, ch, i, r));
  p.arena = a;
  p.arenaRuns++;
  return a;
}

export function arenaPick(p: Profile, i: number): boolean {
  const a = p.arena;
  if (!a || a.stage !== 'draft') return false;
  const opts = a.picks[a.pickNo];
  if (!opts?.[i]) return false;
  a.deck.push(opts[i]);
  a.pickNo++;
  if (a.pickNo >= ARENA_PICKS) { a.stage = 'ready'; a.rival = nextRival(p, a); }
  return true;
}

/** Rivals: your own Legacy decks and imported codes when there are some, otherwise a generated duelist of the current tier. */
export function nextRival(p: Profile, a: ArenaState): NonNullable<ArenaState['rival']> {
  const r = rngOf(a);
  const human = [...p.legacy.map((l) => ({ label: `${l.label} (your Legacy)`, cards: l.cards })), ...p.rivals.map((x) => ({ label: x.label, cards: x.cards }))];
  if (human.length && r.chance(0.35)) { const h = r.pick(human); return { ...h, title: tierName(a.wins) }; }
  const chars: CharId[] = Object.keys(CHARACTERS) as CharId[];
  const ch = r.pick(chars);
  const base = [...CHARACTERS[ch].deck].filter((_, i) => i % 2 === 0); // half a starter deck
  const n = 7 + a.wins;
  const cards: string[] = base.map((id) => (a.wins >= 4 ? `${id}+1` : id));
  for (let i = 0; i < n; i++) {
    const rar = r.next() < 0.1 + a.wins * 0.05 ? 'rare' : r.next() < 0.45 ? 'uncommon' : 'common';
    const pool = rewardPool(ch, 20, rar).filter((id) => CARDS[id].type !== 'power');
    const id = r.pick(pool);
    cards.push(a.wins >= 2 && r.chance(0.2 + 0.1 * a.wins) ? `${id}+1` : id);
  }
  const echo = r.chance(0.2) ? r.pick(DEFAULT_ECHOES) : null;
  return { label: echo ? `${r.pick(RIVAL_NAMES)}'s ${echo.label}` : `${r.pick(RIVAL_NAMES)} · ${CHARACTERS[ch].name.replace('The ', '')}`, cards: echo ? echo.cards : cards, title: tierName(a.wins) };
}

/** Build the one-fight RunState for the next duel. */
export function arenaDuel(p: Profile): RunState | null {
  const a = p.arena;
  if (!a || a.stage !== 'ready' || !a.rival) return null;
  const run = newRun({ character: a.character, ascension: 0, seed: a.seed, level: levelOf(p.xp), echoes: [] });
  run.deck = [];
  run.nextUid = 1;
  for (const code of a.deck) { const [id, up] = code.split('+'); run.deck.push({ uid: run.nextUid++, id, up: up === '1' || up === '2', ...(up === '2' ? { path: 'b' as const } : {}) }); }
  run.maxHp = run.hp = ARENA_HP;
  run.relics = [CHARACTERS[a.character].relic];
  run.echoPool = [{ label: a.rival.label, cards: a.rival.cards }];
  run.arena = { wins: a.wins, rival: a.rival.label };
  run.act = Math.min(3, 1 + Math.floor(a.wins / 3));
  run.familiar = p.cosmetics.familiar ?? undefined;
  startCombat(run, { id: 'arena', name: a.rival.label, enemies: ['echo_rival'] }, 'elite');
  a.duel = run;
  return run;
}

export interface ArenaRewards { coins: number; dust: number; pack?: string; title?: string }

export function arenaRewards(wins: number): ArenaRewards {
  return { coins: 40 + 30 * wins, dust: 15 * wins, pack: wins >= 7 ? 'legend' : wins >= 3 ? 'standard' : undefined, title: wins >= 7 ? 'title_arena' : undefined };
}

/** Call when the duel's combat is over. Returns 'win' | 'loss'. */
export function arenaResolve(p: Profile): 'win' | 'loss' | null {
  const a = p.arena;
  const s = a?.duel?.combat;
  if (!a || !s || (s.phase !== 'won' && s.phase !== 'lost')) return null;
  const won = s.phase === 'won';
  const plays = s.stats.plays ?? {};
  for (const [id, n] of Object.entries(plays)) p.mastery[id] = (p.mastery[id] ?? 0) + n;
  a.duel = null;
  if (won) {
    a.wins++;
    bump(p, 'arenaWins');
    // Rival's Pick: choose 1 of 3 face-down cards from the deck you just beat (TCG Pocket's Wonder Pick, as spoils).
    const pool = (a.rival?.cards ?? []).map((c) => c.split('+')[0]).filter((id) => CARDS[id] && !['starter', 'special'].includes(CARDS[id].rarity));
    const r = rngOf(a);
    a.spoils = pool.length ? r.sample([...new Set(pool)], Math.min(3, new Set(pool).size)) : null;
  } else a.losses++;
  if (a.wins >= ARENA_WINS || a.losses >= ARENA_LOSSES) { a.stage = 'done'; a.spoils = null; }
  else a.stage = won && a.spoils ? 'pick' : 'ready';
  if (a.stage === 'ready') a.rival = nextRival(p, a);
  return won ? 'win' : 'loss';
}

export function arenaSpoil(p: Profile, i: number | null): boolean {
  const a = p.arena;
  if (!a || a.stage !== 'pick') return false;
  if (i !== null && a.spoils?.[i]) a.deck.push(a.spoils[i]);
  a.spoils = null;
  a.stage = 'ready';
  a.rival = nextRival(p, a);
  return true;
}

/** Collect the rewards for a finished (or retired) Arena run and clear it. */
export function arenaClaim(p: Profile): ArenaRewards | null {
  const a = p.arena;
  if (!a) return null;
  const rw = arenaRewards(a.wins);
  grant(p, { coins: rw.coins, dust: rw.dust, pack: rw.pack });
  if (rw.title && !p.cosmetics.owned.includes(rw.title)) p.cosmetics.owned.push(rw.title);
  p.arenaBest = Math.max(p.arenaBest, a.wins);
  p.arena = null;
  return rw;
}

// ───────── deck codes ─────────

/** Share a deck as a short text code. Friends can import it as an Echo/Arena rival. */
export function encodeDeck(label: string, ch: CharId, cards: string[]): string {
  const json = JSON.stringify({ l: label.slice(0, 40), c: ch, d: cards });
  const b64 = typeof btoa === 'function' ? btoa(unescape(encodeURIComponent(json))) : Buffer.from(json, 'utf8').toString('base64');
  return `RIP1.${b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')}`;
}

export function decodeDeck(code: string): { label: string; character: CharId; cards: string[] } | null {
  try {
    const m = code.trim().match(/^RIP1\.([A-Za-z0-9_-]+)$/);
    if (!m) return null;
    let b = m[1].replace(/-/g, '+').replace(/_/g, '/');
    while (b.length % 4) b += '=';
    const json = typeof atob === 'function' ? decodeURIComponent(escape(atob(b))) : Buffer.from(b, 'base64').toString('utf8');
    const o = JSON.parse(json) as { l: string; c: CharId; d: string[] };
    if (!CHARACTERS[o.c] || !Array.isArray(o.d)) return null;
    const cards = o.d.filter((x) => typeof x === 'string' && CARDS[x.split('+')[0]] && CARDS[x.split('+')[0]].faction !== 'enemy').slice(0, 40);
    if (cards.length < 5) return null;
    return { label: String(o.l || 'Imported deck').slice(0, 40), character: o.c, cards };
  } catch { return null; }
}

export function importRival(p: Profile, code: string): boolean {
  const d = decodeDeck(code);
  if (!d) return false;
  p.rivals = [d, ...p.rivals.filter((r) => r.label !== d.label)].slice(0, 10);
  return true;
}
