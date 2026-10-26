// v0.11: what the v0.11 card build made and rejected: `npx tsx sim/v11report.ts [rejects|sample <kind>]`
import { ALL_PLAYER_CARDS, COLLECTIBLE } from '../src/data/cards';
import { V11_KIND, V11_REJECTS } from '../src/data/cards11';
import { cardText } from '../src/engine/combat';

const kinds: Record<string, number> = {};
for (const k of Object.values(V11_KIND)) kinds[k] = (kinds[k] ?? 0) + 1;
console.log(`${ALL_PLAYER_CARDS.length} player cards, ${COLLECTIBLE.length} collectible; v0.11:`, kinds, `rejected ${V11_REJECTS.length}`);
const byF: Record<string, number> = {};
for (const c of ALL_PLAYER_CARDS) byF[c.faction] = (byF[c.faction] ?? 0) + 1;
console.log(byF);
if (process.argv[2] === 'rejects') {
  const why: Record<string, number> = {};
  for (const r of V11_REJECTS) { const k = r.why.replace(/:.*$/, '').replace(/^.*?: /, ''); why[k] = (why[k] ?? 0) + 1; }
  console.log(why);
  for (const r of V11_REJECTS.filter((x) => !/repeats rules text|name taken/.test(x.why) || process.argv[3] === 'all')) console.log(`  ${r.name}: ${r.why}`);
}
if (process.argv[2] === 'sample') {
  const kind = process.argv[3];
  for (const c of ALL_PLAYER_CARDS.filter((x) => V11_KIND[x.id] === kind).slice(0, Number(process.argv[4] ?? 400)))
    console.log(`${c.faction}${c.faction2 ? '+' + c.faction2 : ''} | ${c.name} | ${c.type}${c.trigger ? '/' + c.trigger : ''}${c.counter ? '/' + c.counter : ''} ${c.cost} ${c.rarity} | ${cardText({ id: c.id, up: false })}`);
}
