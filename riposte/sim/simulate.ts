// Balance harness: `npm run sim -- [runs] [ascension]`
import { newRun, nightsCleared } from '../src/engine/run';
import type { CharId, RunState } from '../src/engine/types';
import { botStep, LAB } from './bot';
import { freshProfile, profileRun, afterRun, seedMathRandom } from './metabot';
import type { Profile } from '../src/engine/meta';
// PROFILE=fresh: every run starts from a blank profile (level 1, no collection, talents or unlocks).
// PROFILE=career: one profile per class carries everything between runs (see sim/metabot.ts).
// Unset: the classic harness (level 10 card pool, no meta bonuses).
const MODE = process.env.PROFILE ?? '';

const N = Number(process.argv[2] ?? 150);
const ASC = Number(process.argv[3] ?? 0);
const chars: CharId[] = ((process.argv[4]?.split(',') ?? ['duelist', 'warden', 'hollow', 'sharp', 'magpie', 'sexton', 'arbiter', 'tempest', 'rimeblade', 'beastcaller', 'geomancer', 'alchemist', 'nightblade']) as CharId[]);

for (const ch of chars) {
  let nights = 0, bestNight = 0, wins = 0, epi = 0, epiWon = 0, floors = 0, act2 = 0, act3 = 0, chains = 0, maxChain = 0;
  const deaths: Record<string, number> = {};
  // v0.10: how often each boss is fought, so its death count can be read as a rate.
  const bossFought: Record<string, number> = {};
  const t0 = Date.now();
  let career: Profile | null = MODE === 'career' ? freshProfile() : null;
  if (career) career.tutorialDone = false;
  const quarter = [0, 0, 0, 0];
  seedMathRandom(4242);
  // v0.12 pacing: what a run hands out, and how long fights last.
  const pace = { relics: 0, deck: 0, gold: 0, goldEarned: 0, fights: 0, elites: 0 };
  LAB.on = true; LAB.fights = {}; LAB.cards = {};
  for (let i = 0; i < N; i++) {
    const run: RunState = MODE === 'fresh' ? profileRun(freshProfile(), ch, 1000 + i, ASC) : career ? profileRun(career, ch, 1000 + i, ASC) : newRun({ character: ch, ascension: ASC, seed: 1000 + i, level: 10, echoes: [], nightOk: !!process.env.NIGHT, fates: process.env.FATES !== '0' });
    // ALT=0|1|2 forces every act to the standard or alternate version (default: rolled per run).
    if (process.env.ALT !== undefined) { run.acts = [1, 2, 3].map(() => Number(process.env.ALT)); }
    let lastEnc = '';
    for (let step = 0; step < (process.env.NIGHT ? 2000 : 400) && !run.finished; step++) {
      if (run.combat) {
        const enc = `A${run.act} ${run.combat.encounter}`;
        if (run.combat.kind === 'boss' && (enc !== lastEnc || run.combat.turn <= 1) && !(run.combat as { counted?: boolean }).counted) { bossFought[enc] = (bossFought[enc] ?? 0) + 1; (run.combat as { counted?: boolean }).counted = true; }
        lastEnc = enc;
      }
      botStep(run);
    }
    if (run.epilogue === 'won' || run.epilogue === 'lost') { epi++; if (run.epilogue === 'won') epiWon++; }
    if (career) afterRun(career, run);
    if (run.won) quarter[Math.min(3, Math.floor((i * 4) / N))]++;
    if (run.won) wins++; else deaths[lastEnc] = (deaths[lastEnc] ?? 0) + 1;
    const nc = nightsCleared(run); nights += nc; bestNight = Math.max(bestNight, nc);
    floors += run.floor;
    pace.relics += run.relics.length; pace.deck += run.deck.length; pace.gold += run.gold; pace.goldEarned += run.stats.goldEarned; pace.fights += run.stats.fights; pace.elites += run.stats.elites;
    if (run.act >= 2) act2++;
    if (run.act >= 3) act3++;
    chains += run.stats.chains;
    maxChain = Math.max(maxChain, run.stats.maxChain);
  }
  const pct = (n: number) => `${Math.round((n / N) * 100)}%`;
  console.log(`\n== ${ch} (A${ASC}, ${N} runs, ${((Date.now() - t0) / 1000).toFixed(1)}s) ==`);
  console.log(`win ${pct(wins)} | reach act2 ${pct(act2)} | reach act3 ${pct(act3)} | avg floor ${(floors / N).toFixed(1)} | chains/run ${(chains / N).toFixed(1)} | longest ${maxChain} | act4 ${epi} (won ${epiWon})${process.env.NIGHT ? ` | nights/run ${(nights / N).toFixed(2)} best ${bestNight}` : ''}`);
  if (MODE) console.log(`${MODE}: wins by quarter ${quarter.map((q) => `${Math.round((q / (N / 4)) * 100)}%`).join(' / ')}${career ? ` | end level ${career.xp ? (await import('../src/engine/meta')).levelOf(career.xp) : 1}, cards ${Object.keys(career.collection).length}, talents ${Object.values(career.talents).reduce((a, b) => a + b, 0)}` : ''}`);
  const off = Object.values(LAB.cards).reduce((a, l) => a + l.off, 0), picks = Object.values(LAB.cards).reduce((a, l) => a + l.pick, 0);
  console.log(`pacing: relics ${(pace.relics / N).toFixed(1)} | deck ${(pace.deck / N).toFixed(1)} | fights ${(pace.fights / N).toFixed(1)} (elites ${(pace.elites / N).toFixed(1)}) | gold earned ${(pace.goldEarned / N).toFixed(0)}, left ${(pace.gold / N).toFixed(0)} | card rewards taken ${Math.round((picks / Math.max(1, off / 3)) * 100)}%`);
  console.log('fight length:', Object.entries(LAB.fights).sort().map(([k, v]) => `${k} ${(v.turns / v.n).toFixed(1)}t/${(v.hpLost / v.n).toFixed(0)}hp`).join(' · '));
  const top = Object.entries(deaths).sort((a, b) => b[1] - a[1]).slice(0, 8);
  console.log('top killers:', top.map(([k, v]) => `${k} ${v}`).join(' · '));
  console.log('bosses (lost/fought):', Object.entries(bossFought).sort((a, b) => a[0].localeCompare(b[0])).map(([k, v]) => `${k} ${deaths[k] ?? 0}/${v}`).join(' · '));
}
