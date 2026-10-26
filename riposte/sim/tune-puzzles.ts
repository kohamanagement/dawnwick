// Dev tool: for each puzzle, report whether it solves, the line, and the highest enemy HP that still solves.
import { PUZZLES } from '../src/data/puzzles';
import { solve, naive, describe } from './solver';

for (const p of PUZZLES) {
  const line = solve(p);
  let maxHp = 0;
  for (let h = 1; h <= 120; h++) {
    const q = { ...p, enemies: p.enemies.map((e) => ({ ...e, hp: h })) };
    if (solve(q, 60000)) maxHp = h; else if (h > p.enemies[0].hp + 2) break;
  }
  console.log(`${p.id.padEnd(12)} hp ${p.enemies.map((e) => e.hp).join('/')} solved=${!!line} naive=${naive(p)} maxUniformHp=${maxHp} | ${line ? describe(p, line) : '-'}`);
}
