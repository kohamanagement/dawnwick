// Pure HTML builders shared by the screens.
import type { CardInst, Combatant, Intent, Trigger } from '../engine/types';
import { CARDS } from '../data/cards';
import { STATUSES } from '../data/statuses';
import { RELICS } from '../data/relics';
import { cardText } from '../engine/combat';
import { MODS } from '../data/mods';
import { altPath, innateCopy, isPathB, pathALabel, printedCost, retainsCopy } from '../data/upgrades';
import { artIcon, artSvg } from './art';
import { app } from './state';
import { masteryLevel } from '../data/season';
import { ELEMENT_MAP, elemIcon, elemName, matchups, printedElement } from '../data/elements';
import type { CounterOn, Element } from '../engine/types';

export const esc = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export const FACTION_GLYPH: Record<string, string> = {
  ember: ':px-fire:', tide: ':px-wave:', thorn: ':px-vine:', void: ':px-spiral:', gilt: ':px-coin:', glass: ':px-shard:', grave: ':px-urn:', neutral: ':px-cardback:', curse: ':px-blackheart:', enemy: ':px-demon:',
  storm: ':px-bolt:', rime: ':px-snow:', stone: ':px-rock:', dawn: ':px-sun:', aether: ':px-alembic:', beast: ':px-paw:', dusk: ':px-moon:',
};
export const FACTION_NAME: Record<string, string> = {
  ember: 'Ember', tide: 'Tide', thorn: 'Thorn', void: 'Void', gilt: 'Gilt', glass: 'Glass', grave: 'Grave', neutral: 'Neutral', curse: 'Jinx', enemy: 'Enemy',
  storm: 'Storm', rime: 'Rime', stone: 'Stone', dawn: 'Dawn', aether: 'Aether', beast: 'Beast', dusk: 'Dusk',
};
export const COUNTER_GLYPH: Record<CounterOn, string> = { attack: '⚔', reaction: '⟲', skill: '✋', any: '✱' };
export const COUNTER_TEXT: Record<CounterOn, string> = {
  attack: 'Play from hand when an enemy attacks', reaction: 'Play from hand when an enemy trap or Reaction fires',
  skill: 'Play from hand when an enemy uses a non-attack', any: 'Play from hand in answer to anything an enemy does',
};

/** v0.7: a small element badge. */
export function elemBadge(e: Element | null | undefined, cls = ''): string {
  if (!e) return '';
  const d = ELEMENT_MAP[e];
  return `<span class="elem e-${e} ${cls}" title="${esc(d.name)}: ${esc(d.blurb)}">${d.icon}</span>`;
}

/** v0.7: a one-line matchup for tooltips. */
export function matchupText(e: Element): string {
  const m = matchups(e);
  // v0.10: "weak to" used to list the element itself, but a same-element hit is resisted (×0.75), not strong.
  const ic = (xs: Element[]) => xs.map((x) => ELEMENT_MAP[x].icon).join('');
  return `${ELEMENT_MAP[e].icon} ${ELEMENT_MAP[e].name}: strong vs ${ic(m.strong)} · weak to ${ic(m.weak)} · ${ELEMENT_MAP[e].icon} vs ${ELEMENT_MAP[e].icon} is resisted`;
}
export const TRIGGER_GLYPH: Record<Trigger, string> = { attack: '⚔', skill: '✋', reaction: '⟲' };
export const TRIGGER_TEXT: Record<Trigger, string> = {
  attack: 'Fires when attacked', skill: 'Fires on a non-attack', reaction: 'Fires when a trap fires',
};
export const TYPE_NAME: Record<string, string> = { attack: 'Attack', skill: 'Trick', power: 'Stance', reaction: 'Reaction', counter: 'Counter', curse: 'Jinx' };
export const RARITY_NAME: Record<string, string> = { starter: 'Starter', common: 'Common', uncommon: 'Uncommon', rare: 'Rare', legendary: 'Legendary', special: 'Special' };

const KW_HL = /\b(Guard|Burn(?:ing)?|Shaken|Exposed|Edge|Barbs|Doom|Fold(?:s|ed)?|Palm(?:s|ed)?|Negate|Disrupt|Sacrifice|Chain \d|[Bb]ank|Opener|Jinx|ALL|Ante|Flip|Cash in|Omens?|Steal|Glints?|Mimic|Crypt|Exhume|Bury|Haunt|Prime|Converge(?: \d)?|Evolve(?: \d)?|Blot(?:ted)?|Counter|Chill|Freezes?|Frozen|Shock|Charge|Tremor|Fortify|Verdict|Veil|Mark(?:ed)?|Prism|Resonance|Effective|Resisted|Summon|Wolf|Bear|Hawk|Serpent|Attune)\b/g;

/** Synergy tags: what a card cares about. Two cards that share a tag tend to combo. */
const TAGS: [string, RegExp][] = [
  ['Burn', /Burn/], ['Doom', /Doom/], ['Barbs', /Barbs/], ['Shaken', /Shaken/], ['Exposed', /Exposed/], ['Edge', /\bEdge\b/],
  ['Chain', /Chain \d|chain/], ['Sacrifice', /Sacrifice/], ['Negate', /Negate/], ['Flux', /[Bb]ank/], ['Fold', /\bFold/],
  ['Fate Coin', /☀|☾|Flip/], ['Ante', /Ante/], ['Steal', /Steal|stolen/], ['Glint', /Glint/], ['Mimic', /Mimic/],
  ['Crypt', /Crypt|Exhume|Bury|Haunt/], ['Prime', /Prime/], ['Converge', /Converge/],
  ['Counter', /Counter/], ['Chill', /Chill|Frozen|Freeze/], ['Shock', /Shock/], ['Charge', /Charge/], ['Tremor', /Tremor/], ['Fortify', /Fortify/],
  ['Verdict', /Verdict/], ['Mark', /Mark/], ['Veil', /Veil/], ['Companions', /Wolf|Bear|Hawk|Serpent|companion/], ['Elements', /Prism|Attune|Effective|Resonance/],
];

export function tagsOf(id: string): string[] {
  const d = CARDS[id];
  const out = TAGS.filter(([, re]) => re.test(d.text)).map(([t]) => t);
  if (d.type === 'reaction' || /Reaction/.test(d.text)) out.push('Reactions');
  return out;
}

/** How many cards in the deck share a synergy tag with this one, and the main shared tag. */
export function synergy(id: string, deck: { id: string }[]): { n: number; tag: string | null } {
  const mine = tagsOf(id);
  if (!mine.length) return { n: 0, tag: null };
  const counts: Record<string, number> = {};
  let n = 0;
  for (const c of deck) {
    const t = tagsOf(c.id).filter((x) => mine.includes(x));
    if (t.length) n++;
    for (const x of t) counts[x] = (counts[x] ?? 0) + 1;
  }
  const tag = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
  return { n, tag };
}

export const KEYWORDS: [RegExp, string, string][] = [
  [/\bGuard\b/, 'Guard', 'Soaks up damage before your HP does. Removed at the start of your next turn.'],
  [/\bBurn/, 'Burn', 'At the start of its turn, loses HP equal to Burn, then Burn drops by 1.'],
  [/\bShaken\b/, 'Shaken', 'Deals 25% less damage. Lasts a number of turns.'],
  [/\bExposed\b/, 'Exposed', 'Takes 40% more damage. Lasts a number of turns.'],
  [/\bEdge\b/, 'Edge', 'Adds to all damage this character deals. (House Edge is a different status.)'],
  [/\bBarbs\b/, 'Barbs', 'When hit by an attack, deals that much damage back to the attacker.'],
  [/\bDoom\b/, 'Doom', 'Never wears off. At the start of its turn it loses 1 HP per 5 Doom, and if Doom is at least its HP it dies outright.'],
  [/\bFold/, 'Fold', 'Folded cards leave your deck until the fight ends.'],
  [/\bOpener\b/, 'Opener', 'Always in your opening hand.'],
  [/\bJinx/, 'Jinx', 'A bad card the Dealer slips into your deck. Usually unplayable.'],
  [/\bPalm/, 'Palm', 'Stays in your hand at the end of the turn, palmed for later.'],
  [/\bNegate/, 'Negate', 'Cancels the action this responds to. It never happens.'],
  [/\bDisrupt\b/, 'Disrupt', 'Destroy face-down enemy traps before they can fire.'],
  [/\bSacrifice/, 'Sacrifice', 'Destroy one of your own set Reactions (oldest first) as a cost.'],
  [/\bEvolve \d/, 'Evolve N', 'After you play this copy N times in fights you win, it becomes its evolved form (named in brackets) for the rest of the run.'],
  [/\bChain \d/, 'Chain N', 'Bonus if the chain this card is part of reaches N links.'],
  [/\b[Bb]ank\b/, 'Bank / Flux', 'Banked energy is added next turn. You also keep 1 unspent energy automatically.'],
  [/☀|☾/, 'Fate Coin', 'Gilt cards read your coin when they resolve: ☀ Sun or ☾ Moon. It starts each fight on ☀. Nothing is random: you always see the face.'],
  [/\bFlip/, 'Flip', 'Turn your Fate Coin over (☀ ↔ ☾) after this resolves.'],
  [/\bAnte\b/, 'Ante', 'Chips you stack up over a fight. Cards that Cash in spend all of it for a big payoff.'],
  [/\bOmen/, 'Omen', 'A tarot card you play as an answer. Hold up to 3. When an enemy move or trap matching its sign (⚔ ✋ ⟲) is about to resolve, turn it over for free as a link in the chain.'],
  [/\bSteal/, 'Steal', "Take the opponent's oldest face-down trap and set it in one of your free Reaction slots, where it fires for you. With no free slot it becomes a Glint in your hand."],
  [/\bGlint/, 'Glint', 'A 0-cost Trick token: deal 4 damage to a random enemy, then Fold.'],
  [/\bMimic/, 'Mimic', 'Repeat the last Attack or Trick you played this turn, for free. It does not start a new chain.'],
  [/\bCrypt/, 'Crypt', "The Sexton's graveyard. While Crypt rules are on, your Reactions go here when they leave play (fire, are pushed out, Sacrificed or destroyed). It empties when the fight ends."],
  [/\bExhume/, 'Exhume', 'Take the most recently buried Reaction from your Crypt and set it in a free Reaction slot for free. With no free slot it goes to your hand.'],
  [/\bBury/, 'Bury', 'Put the top card(s) of your draw pile into your Crypt (Haunt effects fire).'],
  [/\bHaunt/, 'Haunt', 'Happens when this card enters your Crypt.'],
  [/\bPrime/, 'Prime', 'While set, this Reaction gains 1 Prime at the start of each of your turns. Its effect grows with Prime. Prime resets when it leaves play.'],
  [/\bConverge/, 'Converge', 'How many different factions you have played this turn, this card included. "Converge 3" means 3 or more.'],
  [/\bBlot/, 'Blot', 'An enemy affliction: a Blotted card costs 1 more for the rest of the fight.'],
  [/When (attacked|an enemy)/, 'Reaction', 'Set face-down in a Reaction slot. Fires by itself on the enemy turn when its trigger happens.'],
  [/\bCounter \(/, 'Counter', 'Stays in your hand (Palm). When an enemy trap or Reaction fires, or whatever the Counter says, you may play it from your hand to answer, mid-chain. On your turn it costs energy; on the enemy turn it costs Flux (energy you carried over). Counters can be countered (enemy traps, rival and boss Rebuttals), and you can counter those too.'],
  [/\bChill/, 'Chill', 'Builds up on an enemy. At its Freeze point (5; 8 rivals; 12 bosses; +3 each time it froze before) it Freezes and Chill resets.'],
  [/\bFrozen|\bFreeze/, 'Frozen', 'A Frozen enemy skips its next action, then thaws. Shatter cards deal extra damage to it.'],
  [/\bShock/, 'Shock', 'The next time it takes attack damage, it takes Shock more, then Shock halves.'],
  [/\bCharge/, 'Charge', 'Stored lightning. Storm cards spend all of it for big effects. Never wears off.'],
  [/\bTremor/, 'Tremor', 'At the end of your turn, the enemy takes that much damage (ignores Guard), then Tremor halves.'],
  [/\bFortify/, 'Fortify', 'At the start of your turn, keep up to that much of your Guard.'],
  [/\bVerdict/, 'Verdict', 'Gained when you Counter or Negate. Dawn cards spend it to pass judgment.'],
  [/\bVeil/, 'Veil', 'The next attack hit against you misses completely (one per Veil).'],
  [/\bMark/, 'Mark', 'Your damage against a Marked enemy is increased by its Mark. Never wears off.'],
  [/\bPrism/, 'Prism', 'A Prism card has your current Attunement as its element.'],
  [/\bAttune|beats the/, 'Attunement', 'Your element: whatever elemental card you played last. Enemy hits read it, so attune to what beats them and their hits are Resisted.'],
  [/\bSummon|\bWolf|\bBear|\bHawk|\bSerpent/, 'Companions', 'Wolf: end of turn, damage a random enemy. Hawk: end of turn, damage ALL enemies. Bear: start of turn, gain Guard. Serpent: end of turn, Burn a random enemy. Summoning more stacks them.'],
  [/\bResonance/, 'Resonance', 'Play 3 cards of one element in a turn to trigger its bonus once (2 with Catalyst).'],
];

export function keywordList(text: string): [string, string][] {
  return KEYWORDS.filter(([re]) => re.test(text)).map(([, k, d]) => [k, d]);
}

/** v0.11: Name+ for path A, Name✦ for path B. */
export function cardName(c: { id: string; up: boolean; path?: CardInst['path'] }): string {
  return CARDS[c.id].name + (!c.up ? '' : isPathB(c) ? '✦' : '+');
}

/** v0.11: both upgrade paths of a card, as two lines for info popups. */
export function upgradeLines(id: string): string {
  const d = CARDS[id];
  if (d.type === 'curse' || d.unplayable) return '';
  const a = cardText({ id, up: true }), b = cardText({ id, up: true, path: 'b' });
  const alt = altPath(d);
  const bCost = printedCost(d, { up: true, path: 'b' });
  return `<p class="muted small"><b>${esc(d.name)}+</b> (${esc(pathALabel(d))}): ${esc(a)}</p>
    <p class="muted small"><b>${esc(d.name)}✦</b> (${esc(alt.label)}${alt.kind === 'cheap' ? `: costs ${bCost}` : ''}): ${esc(alt.kind === 'retain' ? `Palm. ${b}` : alt.kind === 'innate' ? `Opener. ${b}` : b)}</p>`;
}

export interface CardOpts {
  cost?: number; dim?: boolean; sel?: boolean; act?: string; data?: string; cls?: string; price?: number; sold?: boolean;
  count?: number; isNew?: boolean; syn?: number; locked?: boolean; cur?: string;
}

export function cardHtml(c: CardInst | { id: string; up: boolean; uid?: number; mod?: CardInst['mod']; foil?: boolean; path?: CardInst['path'] }, o: CardOpts = {}): string {
  const d = CARDS[c.id];
  const cost = o.cost ?? Math.max(0, printedCost(d, c) - (c.mod === 'swift' ? 1 : 0));
  const base = d.cost;
  const costCls = cost < base ? 'cheaper' : cost > base ? 'pricier' : '';
  const blot = 'blot' in c && !!c.blot;
  let tag = `${FACTION_GLYPH[d.faction]} ${TYPE_NAME[d.type]}`;
  if (d.type === 'reaction' && d.trigger) tag = `${FACTION_GLYPH[d.faction]} Reaction ${TRIGGER_GLYPH[d.trigger]}`;
  if (d.type === 'counter') tag = `${FACTION_GLYPH[d.faction]} Counter ${COUNTER_GLYPH[d.counter ?? 'reaction']}`;
  const pe = printedElement(d);
  const eb = pe === 'none' ? '' : `<span class="celem e-${pe}" title="${esc(elemName(pe))}">${elemIcon(pe)}</span>`;
  const pre = [innateCopy(d, c) || c.mod === 'opening' ? 'Opener.' : '', (c.mod === 'lasting' || retainsCopy(d, c)) && !d.retain ? 'Palm.' : ''].filter(Boolean).join(' ');
  const evo = d.evolve && 'evo' in c && c.evo ? ` [${c.evo}/${d.evolve.n}]` : '';
  const plain = `${pre ? pre + ' ' : ''}${cardText(c)}${evo}`;
  const text = esc(plain).replace(KW_HL, '<b>$1</b>');
  const mod = c.mod ? MODS[c.mod] : null;
  const foil = 'foil' in c && c.foil;
  const mast = d.faction !== 'enemy' && d.rarity !== 'special' ? masteryLevel(app.profile.mastery?.[c.id] ?? 0) : 0;
  // v0.10: long rules text gets a smaller art band and font so it fits instead of being clipped.
  const len = plain.length;
  const room = o.price !== undefined ? 18 : 0; // the price band covers the bottom of shop cards
  const fit = len + room > 92 ? 'xlong' : len + room > 64 ? 'long' : '';
  return `<button class="card ${fit} f-${d.faction} t-${d.type} r-${d.rarity} ${mast ? `m-${mast}` : ''} ${foil ? 'foil' : ''} ${o.sel ? 'sel' : ''} ${o.dim ? 'dim' : ''} ${o.sold ? 'sold' : ''} ${o.locked ? 'unowned' : ''} ${o.cls ?? ''}"
    ${o.act ? `data-a="${o.act}"` : ''} ${'uid' in c && c.uid !== undefined ? `data-uid="${c.uid}"` : ''} data-id="${c.id}" ${o.data ?? ''}
    aria-label="${esc(cardName(c))}, ${RARITY_NAME[d.rarity]}, cost ${d.unplayable ? 'unplayable' : cost}. ${esc(plain)}${mod ? ` Sigil: ${mod.name}.` : ''}">
    ${d.unplayable ? '' : `<span class="cost ${costCls}">${cost}</span>`}
    <span class="cname ${c.up ? 'up' : ''}${isPathB(c) ? ' upb' : ''}">${esc(cardName(c))}</span>
    <span class="cart">${artSvg(c.id)}${eb}<span class="cicon">${artIcon(c.id)}</span>${mod ? `<span class="sigil" title="${esc(mod.name)}">${mod.icon}</span>` : ''}</span>
    <span class="ctype">${tag}</span>
    <span class="ctext">${text}</span>
    <span class="rgem"></span>
    ${o.price !== undefined ? `<span class="price">${o.sold ? 'SOLD' : `${o.cur ?? '💰'} ${o.price}`}</span>` : ''}
    ${o.count !== undefined ? `<span class="count">×${o.count}</span>` : ''}
    ${o.isNew ? '<span class="newtag">NEW</span>' : ''}
    ${blot ? '<span class="blotmark" title="Blotted: costs 1 more this fight">🖋</span>' : ''}
    ${o.syn ? `<span class="syn" title="Synergy with ${o.syn} card(s) in your deck">🔗${o.syn}</span>` : ''}
  </button>`;
}

/** Optional preview: what this HP bar will look like after the selected card (v0.4). */
export interface HpPreview { hp: number; block: number }

export function hpBar(c: Combatant, pv?: HpPreview | null): string {
  const pct = Math.max(0, Math.min(100, (c.hp / c.maxHp) * 100));
  const doom = c.st.doom ?? 0;
  const doomPct = Math.min(100, (doom / c.maxHp) * 100);
  const lethal = doom >= c.hp && doom > 0;
  return `<div class="hpbar ${lethal ? 'lethal' : ''}" role="img" aria-label="HP ${c.hp} of ${c.maxHp}${c.block ? `, ${c.block} guard` : ''}">
    <div class="hpfill" style="width:${pct}%"></div>
    ${doom ? `<div class="doomfill" style="width:${doomPct}%"></div>` : ''}
    ${pv && pv.hp < c.hp ? `<div class="hploss" style="left:${Math.max(0, (pv.hp / c.maxHp) * 100)}%;width:${pct - Math.max(0, (pv.hp / c.maxHp) * 100)}%"></div>` : ''}
    <span class="hptext">${c.hp}/${c.maxHp}</span>
    ${c.block ? `<span class="blockbadge">🛡 ${c.block}</span>` : ''}
    ${pv && (pv.hp !== c.hp || pv.block !== c.block) ? `<span class="pvtag ${pv.hp <= 0 ? 'kill' : pv.hp > c.hp ? 'gain' : ''}">${pv.hp <= 0 ? '☠ LETHAL' : pv.hp !== c.hp ? `${pv.hp > c.hp ? '+' : '−'}${Math.abs(c.hp - pv.hp)}` : ''}${pv.block !== c.block ? ` 🛡${pv.block}` : ''}</span>` : ''}
  </div>`;
}

export function statusChips(c: Combatant): string {
  return Object.entries(c.st).filter(([, n]) => n).map(([k, n]) => {
    const s = STATUSES[k];
    if (!s) return '';
    return `<span class="chip ${s.debuff ? 'debuff' : 'buff'}" data-a="status" data-s="${k}" data-n="${n}" title="${esc(s.name)}">${s.icon}${n}</span>`;
  }).join('');
}

export function intentHtml(list: Intent[]): string {
  if (!list.length) return '<span class="intent muted">…</span>';
  return list.map((i) => {
    switch (i.icon) {
      case 'atk': return `<span class="intent atk">⚔ ${i.n}${i.times && i.times > 1 ? `×${i.times}` : ''}</span>`;
      case 'block': return `<span class="intent blk">🛡 ${i.n}</span>`;
      case 'heal': return `<span class="intent buff">💚 ${i.n}</span>`;
      case 'buff': return `<span class="intent buff">⬆ ${esc(i.label ?? '')}</span>`;
      case 'debuff': return `<span class="intent debuff">⬇ ${esc(i.label ?? '')}</span>`;
      case 'trap': return `<span class="intent trap">🂠 ${TRIGGER_GLYPH[(i.label as Trigger) ?? 'attack'] ?? ''}</span>`;
      default: return `<span class="intent special">✦ ${esc(i.label ?? '')}</span>`;
    }
  }).join('');
}

export function relicChip(id: string, act = 'relic'): string {
  const r = RELICS[id];
  return `<button class="relic" data-a="${act}" data-id="${id}" aria-label="${esc(r.name)}: ${esc(r.text)}">${r.icon}</button>`;
}

export function relicRow(id: string, act?: string, extra = ''): string {
  const r = RELICS[id];
  return `<button class="relicrow" ${act ? `data-a="${act}" data-id="${id}"` : ''}>
    <span class="ricon">${r.icon}</span><span><b>${esc(r.name)}</b><br><small>${esc(r.text)}</small></span>${extra}</button>`;
}
