// v0.12: merge card-lab files (sim/cardlab.ts) into one table. `npx tsx sim/cardreport.ts <dir> [out.json]`
// Per card: offered, picked, seen in hand (draws), played (bot turns) or fired (Counters, from run stats),
// value per play (the bot's score gain), value per draw (value × play rate: what a copy in hand is worth),
// and the percentile of value per draw among cards of the same type and cost.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { CARDS } from '../src/data/cards';
import { V11_KIND } from '../src/data/cards11';

const dir = process.argv[2];
type L = { off: number; pick: number; drawn: number; played: number; val: number; held: number };
const tot: Record<string, L & { fired: number; deck: number; deckWins: number }> = {};
const fights: Record<string, { n: number; turns: number; hpLost: number }> = {};
let runs = 0, wins = 0;
for (const f of readdirSync(dir).filter((x) => x.endsWith('.json'))) {
  const j = JSON.parse(readFileSync(`${dir}/${f}`, 'utf8'));
  runs += j.runs; wins += j.wins;
  for (const [id, l] of Object.entries(j.cards as Record<string, L>)) {
    const t = (tot[id] ??= { off: 0, pick: 0, drawn: 0, played: 0, val: 0, held: 0, fired: 0, deck: 0, deckWins: 0 });
    for (const k of ['off', 'pick', 'drawn', 'played', 'val', 'held'] as const) t[k] += l[k];
  }
  for (const [id, n] of Object.entries(j.fired as Record<string, number>)) (tot[id] ??= { off: 0, pick: 0, drawn: 0, played: 0, val: 0, held: 0, fired: 0, deck: 0, deckWins: 0 }).fired += n;
  for (const [id, d] of Object.entries(j.inDeck as Record<string, { runs: number; wins: number }>)) { const t = tot[id]; if (t) { t.deck += d.runs; t.deckWins += d.wins; } }
  for (const [k, v] of Object.entries(j.fights as typeof fights)) { const g = (fights[k] ??= { n: 0, turns: 0, hpLost: 0 }); g.n += v.n; g.turns += v.turns; g.hpLost += v.hpLost; }
}
const rows = Object.entries(tot).filter(([id]) => CARDS[id] && !['curse', 'enemy'].includes(CARDS[id].faction)).map(([id, t]) => {
  const d = CARDS[id];
  const plays = d.type === 'counter' ? t.fired : t.played;
  const vpp = t.played ? t.val / t.played : 0;
  const rate = t.drawn ? plays / t.drawn : 0;
  return { id, name: d.name, faction: d.faction, type: d.type, cost: d.cost, rarity: d.rarity, kind: V11_KIND[id] ?? (d.gen ? 'gen7' : 'hand'),
    off: t.off, pick: t.pick, drawn: t.drawn, plays, rate: +rate.toFixed(3), vpp: +vpp.toFixed(2), vpd: +(vpp * rate).toFixed(2), deck: t.deck, deckWr: t.deck ? +(t.deckWins / t.deck).toFixed(3) : 0, pct: 0 };
});
// Percentile of value per draw within type + cost (Counters by play rate: their value lands on other plays).
const groups: Record<string, typeof rows> = {};
for (const r of rows) if (r.drawn >= 15) (groups[`${r.type}|${Math.min(r.cost, 3)}`] ??= []).push(r);
for (const g of Object.values(groups)) {
  const key = (r: (typeof rows)[number]) => (r.type === 'counter' ? r.rate : r.vpd);
  g.sort((a, b) => key(a) - key(b));
  g.forEach((r, i) => { r.pct = Math.round((i / Math.max(1, g.length - 1)) * 100); });
}
if (process.argv[3]) writeFileSync(process.argv[3], JSON.stringify(rows));
console.log(`${runs} runs, ${Math.round((wins / runs) * 100)}% won; ${rows.length} cards seen`);
const by = (k: string) => rows.filter((r) => r.kind === k);
for (const k of ['hand', 'gen7', 'set', 'hybrid', 'evolve', 'power']) {
  const rs = by(k).filter((r) => r.drawn >= 15);
  const avg = (f: (r: (typeof rows)[number]) => number) => (rs.reduce((a, r) => a + f(r), 0) / Math.max(1, rs.length)).toFixed(2);
  console.log(`${k.padEnd(7)} n=${rs.length} play rate ${avg((r) => r.rate)} value/play ${avg((r) => r.vpp)} value/draw ${avg((r) => r.vpd)} pct ${avg((r) => r.pct)}`);
}
console.log('fights (turns / HP lost):', Object.entries(fights).sort().map(([k, v]) => `${k} ${(v.turns / v.n).toFixed(1)}t ${(v.hpLost / v.n).toFixed(1)}hp`).join(' · '));
