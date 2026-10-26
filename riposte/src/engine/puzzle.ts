// Riddles of the Chain: build a one-turn puzzle fight and judge it. Nothing here is random:
// the draw pile is stacked, enemy traps are face-up, and the combat RNG is seeded per puzzle.
import type { CardInst, RunState } from './types';
import { Combat } from './combat';
import { newRun, rng } from './run';
import { hashStr } from './rng';
import { PUZZLE_MAP, PUZZLE_REWARD, type PuzzleDef } from '../data/puzzles';
import type { Profile } from './meta';
import { checkAchievements } from './economy';

function inst(run: RunState, code: string): CardInst {
  const up = code.endsWith('+');
  return { uid: run.nextUid++, id: up ? code.slice(0, -1) : code, up };
}

/** A one-fight RunState for a puzzle (like an Arena duel, it never touches your roguelike run). */
export function puzzleRun(def: PuzzleDef, familiar?: string): RunState {
  const run = newRun({ character: def.character, ascension: 0, seed: hashStr(`riddle-${def.id}`), level: 20, echoes: [] });
  run.puzzle = def.id;
  run.relics = [];
  run.familiar = familiar;
  run.hp = run.maxHp = Math.max(def.hp, 1);
  run.deck = [];
  run.nextUid = 1;
  const hand = def.hand.map((c) => inst(run, c));
  const draw = (def.draw ?? []).map((c) => inst(run, c));
  const traps = (def.traps ?? []).map((c) => inst(run, c));
  run.deck = [...hand, ...draw, ...traps].map((c) => ({ ...c }));
  const s = Combat.create(run, def.enemies.map((e) => e.id), 'normal', rng(run, 'combat'), def.name);
  const cb = new Combat(s, run);
  s.hand = hand;
  s.draw = [...draw].reverse(); // the pile pops from the end
  s.discard = [];
  s.player.traps = traps;
  if (def.slots) s.player.slots = def.slots;
  s.player.st = { ...(def.st ?? {}) };
  s.player.coin = def.coin ?? 0;
  s.player.hp = def.hp;
  def.enemies.forEach((pe, i) => {
    const e = s.enemies[i];
    e.hp = e.maxHp = pe.hp;
    e.block = pe.block ?? 0;
    e.st = { ...(pe.st ?? {}) };
    e.traps = (pe.traps ?? []).map((t) => cb.mkCard(t));
    if (pe.move) { e.move = pe.move; e.lastMoves = [pe.move]; } else cb.rollMove(e);
  });
  s.turn = 1;
  s.energy = def.energy;
  s.phase = 'player';
  s.once.reveal = 1;
  s.puzzle = { id: def.id, goal: def.goal };
  run.combat = s;
  run.screen = 'combat';
  return run;
}

/** End your turn in a puzzle: run the enemy turn, then judge it. */
export function puzzleEndTurn(cb: Combat): 'solved' | 'failed' {
  if (cb.s.phase === 'won') return 'solved';
  cb.endPlayerTurn();
  for (let i = 0; i < cb.s.enemies.length; i++) cb.enemyAct(i);
  return judge(cb);
}

export function judge(cb: Combat): 'solved' | 'failed' {
  const goal = cb.s.puzzle?.goal ?? 'win';
  if (cb.s.phase === 'won') return 'solved';
  if (goal === 'survive' && cb.s.phase !== 'lost' && !cb.s.player.dead) return 'solved';
  return 'failed';
}

/** Record a solve. Returns the Coins paid (first solve only). */
export function recordSolve(p: Profile, id: string, cardsUsed: number): { coins: number; first: boolean; ach: string[] } {
  const def = PUZZLE_MAP[id];
  const prev = p.puzzles[id] ?? 0;
  const first = !prev;
  p.puzzles[id] = prev ? Math.min(prev, cardsUsed) : Math.max(1, cardsUsed);
  const coins = first ? PUZZLE_REWARD[def?.tier ?? 1] : 0;
  p.coins += coins;
  return { coins, first, ach: checkAchievements(p) };
}
