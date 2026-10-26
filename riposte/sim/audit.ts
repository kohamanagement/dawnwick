// v0.9 card redundancy audit: `npm run audit` (add `list` to print every pair). Two collectible player
// cards are redundant when they share type, cost, trigger/counter target and element, their rules text
// is the same once numbers are blanked out, and every number is within 2 (or 25%) of the other's.
// The generator applies the same test (src/data/cardgen.ts `redundant`); this checks the whole pool,
// hand-made cards included. Exits 1 if any pair is found.
import { ALL_PLAYER_CARDS } from '../src/data/cards';
import { filledText, redundancyKey, redundant, GEN_CHANGES } from '../src/data/cardgen';
import type { CardDef } from '../src/engine/types';

const P = ALL_PLAYER_CARDS.filter((c) => c.rarity !== 'starter' && c.rarity !== 'special');

export function redundantPairs(): [CardDef, CardDef][] {
  const g = new Map<string, CardDef[]>();
  for (const c of P) { const k = redundancyKey(c); (g.get(k) ?? g.set(k, []).get(k)!).push(c); }
  const out: [CardDef, CardDef][] = [];
  for (const list of g.values()) for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++)
    if (redundant(list[i], list[j])) out.push([list[i], list[j]]);
  return out;
}

if (process.argv[1]?.endsWith('audit.ts')) {
  const pairs = redundantPairs();
  if (process.argv[2] === 'list') {
    for (const [a, b] of pairs) console.log(`${a.faction}/${a.id}${a.gen ? '' : '★'} ~ ${b.faction}/${b.id}${b.gen ? '' : '★'} :: ${a.type} ${a.cost} :: ${filledText(a)} | ${filledText(b)}`);
    for (const g of GEN_CHANGES) console.log(`${g.now ? 'REWORK' : 'CUT   '} ${g.faction}/${g.id}: ${g.was}${g.now ? ` -> ${g.now}` : ''} (repeated ${g.clash})`);
  }
  console.log(`${P.length} player cards checked (${P.filter((c) => !c.evolved).length} collectible + ${P.filter((c) => c.evolved).length} evolved forms); ${GEN_CHANGES.filter((g) => g.now).length} reworked, ${GEN_CHANGES.filter((g) => !g.now).length} cut by the generator; ${pairs.length} redundant pairs left`);
  process.exitCode = pairs.length ? 1 : 0;
}
