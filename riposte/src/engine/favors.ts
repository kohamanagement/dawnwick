// v0.17 The Dealer's Favors: small, optional extras offered during a run. A short ad pays for one, or the
// Last Word Edition pays for all of them. Nothing in run.ts, combat.ts or the sims calls this file, so the
// balance numbers (bot win rates) never include a favor. Each favor is capped per act, per shop or per run,
// and a run holds at most RUN_FAVORS of them in total, so they sweeten a run without carrying it.
import type { RunState } from './types';
import { FATES } from '../data/fates';
import { OMEN_LIST, gainOmen, omenCap } from '../data/omens';
import { genShop, nightOf, rng, startCombat } from './run';

export type FavorId = 'second_look' | 'ante_up' | 'restock' | 'sleeve' | 'relight' | 'last_hand' | 'refate';

export interface FavorDef {
  id: FavorId;
  name: string;
  icon: string;
  /** What it does, in plain words. */
  text: string;
  /** The Dealer's line when he offers it. */
  line: string;
  /** The scope of `cap`. */
  per: 'act' | 'shop' | 'run';
  cap: number;
  /** An extra limit across the whole run (for favors capped per shop). */
  runCap?: number;
}

export const FAVORS: Record<FavorId, FavorDef> = {
  second_look: { id: 'second_look', name: 'Second Look', icon: '🃏', text: 'Take a second card from this Deal.', line: 'Greedy. I like that in a customer.', per: 'act', cap: 1 },
  ante_up: { id: 'ante_up', name: 'Ante Up', icon: '💰', text: 'Double the gold from this fight.', line: 'Let it ride.', per: 'act', cap: 1 },
  restock: { id: 'restock', name: 'Fresh Stock', icon: '🔄', text: 'The Merchant restocks every unsold card and Omen.', line: 'He keeps the good stock in the back. I know where.', per: 'shop', cap: 1, runCap: 2 },
  sleeve: { id: 'sleeve', name: 'Up His Sleeve', icon: '🔮', text: 'A free Omen for your belt.', line: 'Every dealer keeps one up his sleeve. Take it.', per: 'act', cap: 1 },
  relight: { id: 'relight', name: 'Relight Wick', icon: '🕯', text: 'Wick burns a little longer: one more choice at this Candle.', line: 'Light another. The table can wait.', per: 'run', cap: 1 },
  last_hand: { id: 'last_hand', name: 'One More Hand', icon: '🂠', text: 'Get back up at half HP and replay this fight from the start.', line: 'Not so fast. The house hates an early night.', per: 'run', cap: 1 },
  refate: { id: 'refate', name: 'Another Fate', icon: '🎴', text: 'Deal three different Fates.', line: 'Not to your liking? I have a whole deck of lives.', per: 'run', cap: 1 },
};
export const FAVOR_LIST = Object.values(FAVORS);

/** At most this many favors in one run, whatever their own caps say. */
export const RUN_FAVORS = 6;
/** One More Hand gets you back up with this share of your max HP. */
export const LAST_HAND_HP = 0.5;

/** Favors never touch Daily Duels, Weekly Gauntlets (shared leaderboards), Arena duels, Riddles or the tutorial run. */
export function favorsOn(run: RunState | null | undefined): run is RunState {
  return !!run && !run.daily && !run.weekly && !run.arena && !run.puzzle && !run.tutorial;
}

const scopeKey = (run: RunState, d: FavorDef): string => (d.per === 'act' ? `${d.id}@a${run.act}` : d.per === 'shop' ? `${d.id}@f${run.floor}` : d.id);

export function favorsUsed(run: RunState): number { return run.favors?.total ?? 0; }

/** How many more times this favor could be used here (ignoring whether the moment fits). */
export function favorLeft(run: RunState, id: FavorId): number {
  const d = FAVORS[id];
  const f = run.favors ?? {};
  const left = Math.min(d.cap - (f[scopeKey(run, d)] ?? 0), RUN_FAVORS - (f.total ?? 0), d.runCap !== undefined ? d.runCap - (f[`${id}#run`] ?? 0) : Infinity);
  return Math.max(0, left);
}

/** Does this favor fit the moment (right screen, something to improve), with uses left? */
export function favorReady(run: RunState | null | undefined, id: FavorId): boolean {
  if (!favorsOn(run) || favorLeft(run, id) <= 0) return false;
  const w = run.reward;
  switch (id) {
    case 'second_look': return (run.screen === 'reward' || run.screen === 'event') && !!w?.cards && w.cards.length >= 2 && !w.extraPick;
    case 'ante_up': return run.screen === 'reward' && !!w && !w.goldTaken && !w.anted && w.gold >= 10;
    case 'restock': return run.screen === 'shop' && !!run.shop && run.shop.cards.some((c) => !c.sold);
    case 'sleeve': return run.screen === 'shop' && !!run.shop && (run.omens ?? []).length < omenCap(run);
    case 'relight': return run.screen === 'rest' && run.restDone;
    case 'last_hand': return !!run.combat && run.combat.phase === 'lost' && run.epilogue !== 'fighting' && !nightOf(run) && !!run.lastFight;
    case 'refate': return run.screen === 'fate' && !!run.fateOffer;
  }
}

/** Use a favor (the ad was watched, or the Edition is owned). Returns a line for a toast, or null if it did not fit. */
export function grantFavor(run: RunState, id: FavorId): string | null {
  if (!favorReady(run, id)) return null;
  const d = FAVORS[id];
  const w = run.reward;
  let msg: string;
  switch (id) {
    case 'second_look':
      w!.extraPick = true;
      msg = 'Second Look: take two cards from this Deal.';
      break;
    case 'ante_up':
      w!.gold *= 2;
      w!.anted = true;
      msg = `Ante Up: this fight pays ${w!.gold} gold.`;
      break;
    case 'restock': {
      const s = run.shop!;
      const fresh = genShop(run)!;
      s.cards = s.cards.map((c, i) => (c.sold || !fresh.cards[i] ? c : fresh.cards[i]));
      s.omens = (s.omens ?? []).map((o, i) => (o.sold || !fresh.omens?.[i] ? o : fresh.omens[i]));
      msg = 'Fresh Stock: the Merchant brings out new cards.';
      break;
    }
    case 'sleeve': {
      const o = rng(run, 'favor').pick(OMEN_LIST);
      gainOmen(run, o.id);
      msg = `Up His Sleeve: ${o.name} joins your belt.`;
      break;
    }
    case 'relight':
      run.restDone = false;
      msg = 'Wick burns a little longer. Choose again.';
      break;
    case 'last_hand': {
      const s = run.combat!;
      const lf = run.lastFight!;
      run.hp = Math.max(1, Math.ceil(run.maxHp * LAST_HAND_HP));
      startCombat(run, { id: 'last_hand', name: lf.name, enemies: [...lf.enemies] }, lf.kind, s.affix ?? undefined, { venue: s.venue ?? null, nemesis: !!s.nemesis });
      msg = `One More Hand: you get back up with ${run.hp} HP. The fight starts over.`;
      break;
    }
    case 'refate': {
      const cur = run.fateOffer!;
      const pool = FATES.map((f) => f.id).filter((x) => !cur.includes(x));
      run.fateOffer = rng(run, 'favor').sample(pool.length >= 3 ? pool : FATES.map((f) => f.id), 3);
      msg = 'Another Fate: three new lives turn over.';
      break;
    }
  }
  const f = (run.favors ??= {});
  const k = scopeKey(run, d);
  f[k] = (f[k] ?? 0) + 1;
  if (d.runCap !== undefined) f[`${id}#run`] = (f[`${id}#run`] ?? 0) + 1;
  f.total = (f.total ?? 0) + 1;
  return msg;
}
