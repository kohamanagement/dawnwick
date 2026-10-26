// Regenerates docs/CATALOG.md from the game data: `npm run catalog`
import { writeFileSync } from 'node:fs';
import { CARDS } from '../src/data/cards';
import { RELIC_LIST } from '../src/data/relics';
import { ENEMIES, ENCOUNTERS, ALT_ENCOUNTERS, ACT_NAMES } from '../src/data/enemies';
import { OMEN_LIST } from '../src/data/omens';
import { VOWS, TWISTS } from '../src/data/vows';
import { COSMETICS, SEASON_TRACK } from '../src/data/season';
import { CHAR_LIST } from '../src/data/characters';
import { cardText } from '../src/engine/combat';
import { MOD_LIST } from '../src/data/mods';
import { PACK_LIST, CRAFT, DUST } from '../src/data/packs';
import { TALENTS, SCHOOLS } from '../src/data/talents';
import { ACHIEVEMENTS } from '../src/data/achievements';
import { AFFIXES } from '../src/data/affixes';
import { DARES } from '../src/data/dares';
import { rewardText } from '../src/engine/economy';
import { ELEMENT_LIST, aspectOf, elemName, matchups, printedElement } from '../src/data/elements';
import { GEN_CHANGES, filledText } from '../src/data/cardgen';
import { CUT_CARDS } from '../src/data/cards';
import { CUT12 } from '../src/data/cuts12';
import { V11_KIND } from '../src/data/cards11';
import { altPath } from '../src/data/upgrades';

const out: string[] = ['# Dawnwick content catalog', '', '_Generated from `src/data` by `npm run catalog`. Do not edit by hand._', ''];
const players = Object.values(CARDS).filter((x) => !['enemy', 'curse'].includes(x.faction));
const kinds = (k: string): number => players.filter((c) => V11_KIND[c.id] === k).length;
out.push(`**${players.length} player cards** (${players.filter((c) => c.rarity !== 'starter' && c.rarity !== 'special' && !c.evolved).length} collectible, plus ${kinds('evolved')} evolved forms). Before v0.11: ${players.filter((c) => !c.gen && !V11_KIND[c.id]).length} hand-designed and ${players.filter((c) => c.gen).length} generated from the effect atoms in \`src/data/cardgen.ts\`. v0.11 (\`src/data/cards11.ts\`, \`sets11.ts\`): ${kinds('hybrid')} class-pair hybrids, ${kinds('evolve')} Evolve cards and their ${kinds('evolved')} evolved forms, ${kinds('power')} powers and ${kinds('set')} faction-set cards. ${players.filter((c) => c.type === 'counter').length} Counters.`, '');
out.push('Every card has two upgrades: **A** (Name+, the "Upgraded" column) and **B** (Name✦, the "Path B" column: costs 1 less, Retains, is Innate or stops Exhausting). ★ = hand-designed, ⧉ = class-pair hybrid (second faction in brackets), 🦋 = Evolve / evolved form.', '');
out.push('## Elements', '', '| Element | Strong against | Weak to | Resonance |', '|---|---|---|---|');
for (const e of ELEMENT_LIST) { const m = matchups(e.id); out.push(`| ${e.icon} ${e.name} | ${m.strong.map(elemName).join(', ')} | ${m.weak.map(elemName).join(', ')} | ${e.resonance} |`); }
out.push('', '## Characters', '', '| Character | Factions | Element | HP | Starter relic | Starting deck |', '|---|---|---|---|---|---|');
for (const c of CHAR_LIST) out.push(`| ${c.name} | ${c.factions.join(' + ')} | ${elemName(c.element)} | ${c.hp} | ${c.relic} | ${c.deck.join(', ')} |`);
for (const f of ['neutral', 'ember', 'tide', 'thorn', 'void', 'gilt', 'glass', 'grave', 'dawn', 'storm', 'rime', 'stone', 'aether', 'beast', 'dusk']) {
  const list = Object.values(CARDS).filter((x) => x.faction === f);
  out.push('', `## ${f[0].toUpperCase() + f.slice(1)} cards (${list.length})`, '', '| Card | Type | Element | Rarity | Cost | Text | Upgraded (A) | Path B | Unlock |', '|---|---|---|---|---|---|---|---|---|');
  for (const c of list) {
    const up = cardText({ id: c.id, up: true });
    const k = V11_KIND[c.id];
    const mark = c.faction2 ? ` ⧉ (${c.faction2})` : k === 'evolve' || k === 'evolved' ? ' 🦋' : c.gen || k === 'set' ? '' : ' ★';
    const type = `${c.type}${c.trigger ? ` (${c.trigger})` : ''}${c.counter ? ` (${c.counter})` : ''}${mark}`;
    out.push(`| ${c.name} | ${type} | ${elemName(printedElement(c))} | ${c.evolved ? 'evolved' : c.rarity} | ${c.cost}${c.upCost !== undefined ? `→${c.upCost}` : ''} | ${cardText({ id: c.id, up: false })} | ${up} | ${altPath(c).label} | ${c.unlock ? `L${c.unlock}` : ''} |`);
  }
}
out.push('', '★ = hand-designed.');
out.push('', `## v0.9 "Clean Cut": repeat cards reworked or cut (${GEN_CHANGES.length})`, '', 'Generated cards that repeated another card (same type, cost, element and rules, numbers within 2 or 25%). Powers are listed in docs/10-V9-CLEAN-CUT.md.', '', '| Card | Faction | Was | Now | Repeated |', '|---|---|---|---|---|');
for (const g of GEN_CHANGES) out.push(`| ${g.name} | ${g.faction} | ${g.was} | ${g.now ?? '**cut**'} | ${CARDS[g.clash]?.name ?? g.clash} |`);
out.push('', `## v0.12 "Fewer, Better": cards cut (${CUT_CARDS.length})`, '', 'Cut after the v0.12 card lab and play-pattern check (docs/14-V12-FEWER-BETTER.md). A card that played like another one turns into that card in old saves.', '', '| Card | Faction | Type | Cost | Text | Why |', '|---|---|---|---|---|---|');
for (const c of [...CUT_CARDS].sort((a, b) => a.faction.localeCompare(b.faction) || a.name.localeCompare(b.name))) out.push(`| ${c.name} | ${c.faction}${c.faction2 ? ' + ' + c.faction2 : ''} | ${c.type} | ${c.cost} | ${filledText(c).replace(/\|/g, '/')} | ${CUT12[c.id]} |`);
out.push('', '## Enemy traps (act 1 / 2 / 3 values)', '', '| Trap | Trigger | Text |', '|---|---|---|');
for (const c of Object.values(CARDS).filter((x) => x.faction === 'enemy' && !/\d$/.test(x.id))) {
  const v = [c.id, `${c.id}2`, `${c.id}3`].map((id) => CARDS[id].v.n).join(' / ');
  out.push(`| ${c.name} | ${c.trigger} | ${c.text.replace('{n}', v)} |`);
}
out.push('', '## Relics', '', '| Relic | Rarity | Effect | Unlock |', '|---|---|---|---|');
for (const r of RELIC_LIST) out.push(`| ${r.icon} ${r.name} | ${r.rarity} | ${r.text} | ${r.unlock ? `L${r.unlock}` : r.ach ? `trophy: ${ACHIEVEMENTS.find((a) => a.id === r.ach)?.name}` : ''} |`);
out.push('', '## Sigils (card mods)', '', '| Sigil | Dust | Effect |', '|---|---|---|');
for (const m of MOD_LIST) out.push(`| ${m.icon} ${m.name} | ${m.dust} | ${m.text} |`);
out.push('', '## Booster packs', '', '| Pack | Coins | Cards | Last-card odds | Foil |', '|---|---|---|---|---|');
for (const p of PACK_LIST) out.push(`| ${p.name} | ${p.price} | ${p.size} | Legendary ${Math.round(p.hero.legendary * 100)}%, rare ${Math.round(p.hero.rare * 100)}% | ${Math.round(p.foil * 100)}% |`);
out.push('', `Craft cost (Dust): ${Object.entries(CRAFT).map(([k, v]) => `${k} ${v}`).join(', ')}. Dust value: ${Object.entries(DUST).map(([k, v]) => `${k} ${v}`).join(', ')} (foil ×4).`);
out.push('', '## Talents', '', '| School | Tier | Talent | Max | Effect per rank |', '|---|---|---|---|---|');
for (const t of TALENTS) out.push(`| ${SCHOOLS[t.school].name} | ${t.tier} | ${t.name} | ${t.max} | ${t.text(1)} |`);
out.push('', '## Trophies (achievements)', '', '| Trophy | Goal | Reward |', '|---|---|---|');
for (const a of ACHIEVEMENTS) out.push(`| ${a.icon} ${a.name} | ${a.text} | ${rewardText(a.reward)} |`);
out.push('', '## Champion affixes', '', ...AFFIXES.map((a) => `- ${a.icon} **${a.name}**: ${a.text}`));
out.push('', '## Dares', '', ...DARES.map((d) => `- ${d.icon} **${d.name}**: elite: ${d.text('elite')} boss: ${d.text('boss')}`));
out.push('', '## Omens (tarot consumables)', '', ...OMEN_LIST.map((o) => `- ${o.icon} **${o.numeral} ${o.name}**: ${o.text}`));
out.push('', '## Vows (Heat)', '', ...VOWS.map((v) => `- ${v.icon} **${v.name}** (max ${v.max}): ${v.text(1)}`));
out.push('', '## Weekly twists', '', ...TWISTS.map((t) => `- ${t.icon} **${t.name}**: ${t.text}`));
out.push('', '## Season 1 track', '', SEASON_TRACK.map((r, i) => `${i + 1}: ${Object.entries(r).map(([k, v]) => `${k} ${v}`).join(' + ')}`).join(' · '));
out.push('', '## Cosmetics', '', ...COSMETICS.map((c) => `- ${c.icon} **${c.name}** (${c.kind})${c.text ? `: ${c.text}` : ''}`));
for (const [variant, table] of [[0, ENCOUNTERS], [1, ALT_ENCOUNTERS]] as const) for (const act of [1, 2, 3]) {
  const e = table[act];
  out.push('', `## Act ${act}${variant ? 'B' : ''} encounters: ${ACT_NAMES[act][variant]}`, '', `- **Easy:** ${e.easy.map((x) => x.name).join(', ')}`, `- **Normal:** ${e.normal.map((x) => x.name).join(', ')}`,
    `- **Elite:** ${e.elite.map((x) => x.name).join(', ')}`, `- **Boss:** ${e.boss.name}`);
}
out.push('', '## Enemies', '', '| Enemy | Aspect | HP | Moves | Traps |', '|---|---|---|---|---|');
for (const e of Object.values(ENEMIES)) {
  const moves = Object.values(e.moves).map((m) => `${m.name}: ${m.steps.map((s) => Object.entries(s).filter(([k]) => !['fn', 'preview'].includes(k)).map(([k, v]) => `${k} ${v}`).join(', ')).join('; ')}`).join(' · ');
  out.push(`| ${e.icon} ${e.name} | ${elemName(aspectOf(e.id))} | ${e.hp[0]}–${e.hp[1]} | ${e.ghost ? 'Plays a saved deck (Echo)' : moves} | ${(e.traps ?? []).join(', ')} |`);
}
writeFileSync(new URL('../docs/CATALOG.md', import.meta.url), out.join('\n') + '\n');
console.log('wrote docs/CATALOG.md');
