// Exhaustive solver for Riddles of the Chain. Tries every order of plays and targets
// (memoised on the visible state) and ends the turn at every node.
import { Combat } from '../src/engine/combat';
import { puzzleEndTurn, puzzleRun } from '../src/engine/puzzle';
import type { CombatState, RunState } from '../src/engine/types';
import type { PuzzleDef } from '../src/data/puzzles';
import { CARDS } from '../src/data/cards';

const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x));
type Play = [number, number | undefined];

function key(s: CombatState): string {
  return JSON.stringify([
    s.hand.map((c) => `${c.id}${c.up ? '+' : ''}${c.tmpCost ?? ''}`).sort(), s.energy, s.flux, s.draw.length,
    s.player.hp, s.player.block, s.player.st, s.player.traps.map((t) => t.id), s.player.coin, s.once, s.lastPlay?.id,
    s.enemies.map((e) => [e.hp, e.block, e.st, e.traps.map((t) => t.id), e.dead]),
  ]);
}

/** Returns a winning line of plays, or null. */
export function solve(def: PuzzleDef, maxNodes = 200000): Play[] | null {
  const root = puzzleRun(def);
  const seen = new Set<string>();
  let nodes = 0;
  const dfs = (run: RunState, line: Play[]): Play[] | null => {
    if (++nodes > maxNodes) return null;
    const s = run.combat!;
    // End the turn here.
    {
      const r2 = clone(run);
      if (puzzleEndTurn(new Combat(r2.combat!, r2)) === 'solved') return line;
    }
    const k = key(s);
    if (seen.has(k)) return null;
    seen.add(k);
    const cb = new Combat(s, run);
    const tried = new Set<string>();
    for (const c of s.hand) {
      if (!cb.canPlay(c)) continue;
      const ck = `${c.id}${c.up ? '+' : ''}${c.tmpCost ?? ''}`;
      if (tried.has(ck)) continue;
      tried.add(ck);
      const targets = CARDS[c.id].target ? cb.alive().map((e) => s.enemies.indexOf(e)) : [undefined];
      for (const t of targets) {
        const r2 = clone(run);
        const c2 = new Combat(r2.combat!, r2);
        if (!c2.play(c.uid, t)) continue;
        if (r2.combat!.phase === 'won') return [...line, [c.uid, t]];
        if (r2.combat!.phase === 'lost') continue;
        const got = dfs(r2, [...line, [c.uid, t]]);
        if (got) return got;
      }
    }
    return null;
  };
  return dfs(root, []);
}

/** Play the hand left to right (first target each time), then end the turn. */
export function naive(def: PuzzleDef): boolean {
  const run = puzzleRun(def);
  const cb = new Combat(run.combat!, run);
  for (const c of [...run.combat!.hand]) {
    if (cb.over()) break;
    if (run.combat!.hand.includes(c) && cb.canPlay(c)) cb.play(c.uid, cb.alive()[0] ? run.combat!.enemies.indexOf(cb.alive()[0]) : undefined);
  }
  return puzzleEndTurn(cb) === 'solved';
}

export function describe(def: PuzzleDef, line: Play[]): string {
  const run = puzzleRun(def);
  const byUid = new Map([...run.combat!.hand, ...run.combat!.draw].map((c) => [c.uid, c]));
  return line.map(([uid, t]) => `${CARDS[byUid.get(uid)?.id ?? '']?.name ?? uid}${t !== undefined && def.enemies.length > 1 ? `→${t}` : ''}`).join(', ');
}
