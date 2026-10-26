// v0.12: write src/data/cuts12.ts from card-lab rows. `npx tsx sim/cutlist.ts <rows.json>` (rows from sim/cardreport.ts).
// Run it with CUT12 emptied (it reads the full pool), then rebuild.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { ALL_PLAYER_CARDS, CARDS, rewardPool } from '../src/data/cards';
import { V11_KIND } from '../src/data/cards11';
import { pattern, effectsOf } from '../src/data/patterns';
import { filledText } from '../src/data/cardgen';
const rows: any[] = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const R: Record<string, any> = Object.fromEntries(rows.map((r) => [r.id, r]));
// Ids the code names (starter decks, events, relics, tests...) and Evolve pairs are never cut.
const files = ['src/engine', 'src/data', 'src/ui'].flatMap((d) => readdirSync(d).filter((f) => f.endsWith('.ts') && f !== 'cuts12.ts').map((f) => `${d}/${f}`)).concat(['src/main.ts', 'sim/tests.ts', 'sim/story-tests.ts']);
const src = files.map((f) => readFileSync(f, 'utf8')).join('\n');
const refs = new Set<string>();
for (const m of src.matchAll(/'([a-z0-9_]+)'/g)) if (CARDS[m[1]]) refs.add(m[1]);
for (const c of Object.values(CARDS)) if (c.evolve) { refs.add(c.id); refs.add(c.evolve.into); }
const kind = (id: string): string => V11_KIND[id] ?? (CARDS[id].gen ? 'gen7' : 'hand');
const cuttable = (id: string) => ['set', 'gen7', 'hybrid'].includes(kind(id)) && !refs.has(id) && !keepers.has(id);
const pool = ALL_PLAYER_CARDS.filter((c) => !c.evolved && !['starter', 'special'].includes(c.rarity));
const cut = new Map<string, string>();
const twin = new Map<string, string>();
const keepers = new Set<string>();
const score = (id: string) => (R[id]?.pct ?? 50) + (kind(id) === 'hand' ? 30 : kind(id) === 'evolve' ? 25 : kind(id) === 'hybrid' ? 5 : 0) - (/\bIf |Chain \d/.test(CARDS[id].text) ? 0 : -3);
// 1. same play pattern within a faction
const groups = new Map<string, string[]>();
for (const c of pool) { const k = `${c.faction}${c.faction2 ? '+' + c.faction2 : ''}|${pattern(c)}`; (groups.get(k) ?? groups.set(k, []).get(k)!).push(c.id); }
for (const [k, ids] of groups) if (ids.length > 1) {
  // A card that can't be cut (hand-made, Evolve, named in code) keeps the pattern; else the best cuttable card does.
  const fixed = ids.filter((id) => !cuttable(id));
  const keep = fixed.length ? [...fixed].sort((a, b) => score(b) - score(a))[0] : [...ids].sort((a, b) => score(b) - score(a))[0];
  keepers.add(keep);
  for (const id of ids) if (id !== keep && cuttable(id)) { cut.set(id, `plays like ${CARDS[keep].name}`); twin.set(id, keep); }
}
// 1b. the same pattern across factions: a card goes if every class that can draft it still sees another card that plays the same.
{
  const CLASSES = ['duelist', 'warden', 'hollow', 'sharp', 'magpie', 'sexton', 'arbiter', 'tempest', 'rimeblade', 'beastcaller', 'geomancer', 'alchemist', 'nightblade'];
  const pools = Object.fromEntries(CLASSES.map((ch) => [ch, new Set(rewardPool(ch))]));
  const byPat = new Map<string, string[]>();
  for (const c of pool) { const k = pattern(c); (byPat.get(k) ?? byPat.set(k, []).get(k)!).push(c.id); }
  for (const ids of byPat.values()) {
    if (ids.length < 2) continue;
    for (const id of [...ids].sort((a, b) => score(a) - score(b))) {
      if (!cuttable(id) || cut.has(id)) continue;
      const others = ids.filter((o) => o !== id && !cut.has(o));
      const seers = CLASSES.filter((ch) => pools[ch].has(id));
      const tw = seers.map((ch) => others.find((o) => pools[ch].has(o)));
      if (seers.length && tw.every(Boolean) && others.some((o) => score(o) >= score(id))) { cut.set(id, `plays like ${CARDS[tw[0]!].name}`); twin.set(id, tw[0]!); }
    }
  }
}
// 2. rarely-true gates
const RARE = [/Chain 2:/, /Chain 3:/, /played a Counter this turn/, /stolen trap set/, /If you have Veil/, /If you have Edge/];
for (const c of pool) if (cuttable(c.id) && !cut.has(c.id) && kind(c.id) === 'set' && (c.type === 'attack' || c.type === 'skill')) {
  const gates = c.text.match(/If [^,]*,|Chain \d:/g) ?? [];
  if (gates.length && gates.every((g) => RARE.some((re) => re.test(g + ':') || re.test(g))) && (R[c.id]?.pct ?? 0) < 60) cut.set(c.id, `its gate (${gates.join(' / ')}) is true under 20% of the time`);
}
// 3. weak in its type and cost
for (const c of pool) if (cuttable(c.id) && !cut.has(c.id)) {
  const r = R[c.id];
  // Only cards whose effects the bot's score sees directly (it can't price draw, energy, Glints, the Crypt or Steal).
  const blind = effectsOf(c).some((e) => /^(draw|bank|energy|glint|exhume|bury|steal|disrupt|catalyze|ante|xante|flip|rally)$/.test(e) || e.includes(' '));
  if (r && !blind && r.drawn >= 60 && r.pct <= 7) cut.set(c.id, `bottom 7% of ${c.type}s at cost ${Math.min(3, c.cost)} (value ${r.vpd}/draw, played ${Math.round(r.rate * 100)}% of draws)`);
}
const by: Record<string, number> = {};
for (const [id, why] of cut) { const k = why.split(' ')[0]; by[k] = (by[k] ?? 0) + 1; }
console.log(cut.size, by);
const fk: Record<string, [number, number]> = {};
for (const c of pool) { const e = (fk[c.faction] ??= [0, 0]); e[0]++; if (cut.has(c.id)) e[1]++; }
console.log(Object.entries(fk).map(([f, [n, k]]) => `${f} ${n}->${n - k}`).join(' · '));
const tk: Record<string, [number, number]> = {};
for (const c of pool) { const e = (tk[c.type] ??= [0, 0]); e[0]++; if (cut.has(c.id)) e[1]++; }
console.log(tk);
const weakHand = pool.filter((c) => !cuttable(c.id) && R[c.id] && R[c.id].drawn >= 60 && R[c.id].pct <= 7);
console.log('weak protected:', weakHand.map((c) => `${kind(c.id)} ${c.name} (${c.type} ${c.cost}) pct ${R[c.id].pct} vpd ${R[c.id].vpd} rate ${R[c.id].rate}: ${filledText(c)}`).join('\n'));
writeFileSync('/tmp/claude-0/cuts.json', JSON.stringify([...cut]));
const lines = [...cut].sort((a, b) => a[0].localeCompare(b[0])).map(([id, why]) => `  ${id}: ${JSON.stringify(why)},`);
writeFileSync('src/data/cuts12.ts', `// v0.12 "Fewer, Better": cards taken out of the pool, with the reason. Made by sim/cutlist.ts from a card-lab
// run (sim/cardlab.ts, 7,800 bot runs with random drafts) and the play-pattern check (src/data/patterns.ts):
//  - "plays like X": same faction, type, trigger, cost and effects as X once gates are ignored; the better card stays;
//  - "its gate ... is true under 20% of the time": an attack or skill whose only extra effect hides behind a gate
//    that the lab saw hold less than a fifth of the time (Chain 2 on a card you play held 9%), so it was a weaker vanilla card;
//  - "bottom 7% of ...": the lowest value per draw among cards of its type and cost (only effects the bot can score).
// Hand-made cards, Evolve cards, powers and anything the code names are never cut. Cut cards keep their slot in the
// generators, so every other card keeps its id; saved decks and collections drop cut ids (with a Dust refund).
export const CUT12: Record<string, string> = {
${lines.join('\n')}
};
/** A cut card that played like another card: saves swap their copies for that card. */
export const CUT12_TWIN: Record<string, string> = {
${[...twin].sort((a, b) => a[0].localeCompare(b[0])).map(([a, b]) => `  ${a}: '${b}',`).join('\n')}
};
`);
