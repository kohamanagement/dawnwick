// v0.12 card lab: `npx tsx sim/cardlab.ts <runs> <class> <out.json>` (LABPICK=random for even coverage).
// Plays bot runs with the lab on and writes, per card: times offered, picked, seen in hand, played, the bot's
// value gained by each play (its position score after the enemy turn, minus the score without the play),
// and how often it sat in hand playable but unplayed. Counters (played on the enemy turn) are counted from
// run.stats.plays. sim/cardreport.ts merges the files.
import { writeFileSync } from 'node:fs';
import { newRun } from '../src/engine/run';
import type { CharId } from '../src/engine/types';
import { botStep, LAB } from './bot';
import { seedMathRandom } from './metabot';
import { CONDS } from '../src/data/dsl11';

// How often each v0.11 condition is true when a card really checks it (the compiler priced each at a guess).
const conds: Record<string, [number, number]> = {};
for (const [k, c] of Object.entries(CONDS)) {
  const t = c.test;
  c.test = (x) => { const r = t(x); if (LAB.live) { const e = (conds[k] ??= [0, 0]); e[0] += r ? 1 : 0; e[1]++; } return r; };
}

const N = Number(process.argv[2] ?? 50);
const ch = process.argv[3] as CharId;
const out = process.argv[4] ?? `lab-${ch}.json`;
LAB.on = true;
LAB.pick = process.env.LABPICK === 'random' ? 'random' : '';
seedMathRandom(777);
const fired: Record<string, number> = {};
const inDeck: Record<string, { runs: number; wins: number; floors: number }> = {};
let wins = 0, floors = 0;
for (let i = 0; i < N; i++) {
  const run = newRun({ character: ch, ascension: 0, seed: 5000 + i, level: 10, echoes: [], fates: true });
  for (let step = 0; step < 400 && !run.finished; step++) botStep(run);
  for (const [id, n] of Object.entries(run.stats.plays ?? {})) fired[id] = (fired[id] ?? 0) + n;
  const ids = new Set(run.deck.map((c) => c.id));
  for (const id of ids) { const d = (inDeck[id] ??= { runs: 0, wins: 0, floors: 0 }); d.runs++; if (run.won) d.wins++; d.floors += run.floor; }
  if (run.won) wins++;
  floors += run.floor;
}
writeFileSync(out, JSON.stringify({ ch, runs: N, wins, floors, cards: LAB.cards, fights: LAB.fights, fired, inDeck, conds }));
console.log(ch, N, 'runs', Math.round((wins / N) * 100) + '% won');
