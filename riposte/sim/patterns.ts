// v0.12 play-pattern report: `npx tsx sim/patterns.ts [n]` lists effect patterns shared by 2+ cards of a faction
// (same type, trigger and cost, same effects whatever gates them). The rules live in src/data/patterns.ts.
import type { CardDef } from '../src/engine/types';
import { filledText } from '../src/data/cardgen';
import { pattern } from '../src/data/patterns';

if (process.argv[1]?.endsWith('patterns.ts')) {
  const { ALL_PLAYER_CARDS } = await import('../src/data/cards');
  const { V11_KIND } = await import('../src/data/cards11');
  const pool = ALL_PLAYER_CARDS.filter((c) => !c.evolved && !['starter', 'special'].includes(c.rarity));
  const groups = new Map<string, CardDef[]>();
  for (const c of pool) { const k = `${c.faction}${c.faction2 ? '+' + c.faction2 : ''}|${pattern(c)}`; (groups.get(k) ?? groups.set(k, []).get(k)!).push(c); }
  const big = [...groups.entries()].filter(([, v]) => v.length > 1).sort((a, b) => b[1].length - a[1].length);
  const extra = big.reduce((a, [, v]) => a + v.length - 1, 0);
  console.log(`${pool.length} draftable cards, ${groups.size} patterns, ${big.length} shared by 2+ cards (${extra} cards beyond the first of each)`);
  const sizes: Record<number, number> = {};
  for (const [, v] of big) sizes[v.length] = (sizes[v.length] ?? 0) + 1;
  console.log('group sizes', sizes);
  for (const [k, v] of big.slice(0, Number(process.argv[2] ?? 25))) {
    console.log(`\n${k} (${v.length})`);
    for (const c of v) console.log(`   ${V11_KIND[c.id] ?? (c.gen ? 'gen7' : 'hand')} ${c.rarity} ${c.name}: ${filledText(c)}`);
  }
}
