// v0.11 balance helper: which cards sit in winning decks. `PROFILE=career npx tsx sim/decktally.ts <class> [runs]`
import { newRun } from '../src/engine/run';
import type { CharId, RunState } from '../src/engine/types';
import { botStep } from './bot';
import { freshProfile, profileRun, afterRun, seedMathRandom } from './metabot';
import { CARDS } from '../src/data/cards';
import { V11_KIND } from '../src/data/cards11';

const ch = process.argv[2] as CharId;
const N = Number(process.argv[3] ?? 100);
const mode = process.env.PROFILE ?? 'career';
const career = mode === 'career' ? freshProfile() : null;
if (career) career.tutorialDone = false;
seedMathRandom(4242);
const inWin: Record<string, number> = {}, inAll: Record<string, number> = {};
let wins = 0;
for (let i = 0; i < N; i++) {
  const run: RunState = mode === 'fresh' ? profileRun(freshProfile(), ch, 1000 + i, 0) : career ? profileRun(career, ch, 1000 + i, 0) : newRun({ character: ch, ascension: 0, seed: 1000 + i, level: 10, echoes: [] });
  for (let step = 0; step < 400 && !run.finished; step++) botStep(run);
  if (career) afterRun(career, run);
  const ids = new Set(run.deck.map((c) => c.id));
  for (const id of ids) { inAll[id] = (inAll[id] ?? 0) + 1; if (run.won) inWin[id] = (inWin[id] ?? 0) + 1; }
  if (run.won) wins++;
}
console.log(`${ch} ${mode}: ${wins}/${N}`);
const rows = Object.keys(inAll).filter((id) => inAll[id] >= 4).map((id) => ({ id, n: inAll[id], w: (inWin[id] ?? 0) / inAll[id] })).sort((a, b) => b.w - a.w);
for (const r of rows.slice(0, 25)) console.log(`${(r.w * 100).toFixed(0)}% of ${r.n}  ${CARDS[r.id].name} [${V11_KIND[r.id] ?? (CARDS[r.id].gen ? 'gen' : 'hand')}] ${CARDS[r.id].rarity}`);
