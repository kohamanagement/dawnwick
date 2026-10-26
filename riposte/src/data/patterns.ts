// v0.12 play patterns: what a card *does* when you play it, with numbers and gates stripped.
// Two cards share a pattern when they have the same type, trigger and
// cost and the same set of effects, whatever condition gates them ("If the target has Burn," vs "If this
// is the first card you played this turn," reads differently but plays the same: you hit and add Burn).
import type { CardDef } from '../engine/types';
import { filledText } from './cardgen';

const TO = '( to the attacker| to it| to its owner| to the target| to the first enemy)?';
const R = (src: string, tok: string): [RegExp, string] => [new RegExp(`^${src.replace(/TO/g, TO)}$`), tok];
const RULES: [RegExp, string][] = [
  R('deal n damage to all enemies', 'dmgAll'), R('deal n damage to a random enemy n times', 'dmgRnd'), R('deal n damage to a random enemy for each card in your crypt', 'dcrypt'),
  R('deal n damage to a random enemy', 'dmgRnd'), R('deal n damageTO twice', 'dmg2'), R('deal n damageTO for each card in your hand', 'dhand'),
  R('deal n damageTO for each reaction you have set', 'dset'), R('deal n damage to each enemy with (\\w+)', 'p_$1'), R('deal n damageTO', 'dmg'),
  R('next turn, gain n block', 'sprout'), R('gain n block for each enemy', 'bfoe'), R('gain n block for each companion you have', 'bcomp'), R('gain n block', 'block'),
  R('apply n (\\w+) to all enemies', '$1All'), R('apply n (\\w+)TO', '$1'), R("double (the target's|the attacker's|its) (\\w+)", 'x2_$2'),
  R('spend all charge: .*', 'xcharge'), R('spend all verdict: .*', 'xverdict'), R('cash in your ante: deal n damage per ante', 'xante'),
  R('draw n cards?', 'draw'), R('bank n energy( for next turn)?', 'bank'), R('gain n energy', 'energy'), R('heal n hp', 'heal'), R('negate (it|the attack)', 'negate'), R('disrupt n', 'disrupt'),
  R('steal n', 'steal'), R('add (a|n) glints? to your hand', 'glint'), R('bury n', 'bury'), R('exhume n', 'exhume'), R('raise your ante by n', 'ante'), R('gain n (\\w+)', '$1'),
  R('summon (\\w+)( n)?', 'c_$1'), R('your companions act', 'rally'), R('attune to the element that beats .*', 'catalyze'), R('lose n hp', 'lose'), R('flip( your fate coin)?', ''),
];
const COND = /^(if [^,]*, |chain n: |☀ |☾ |when [^:]*: |counter \([^)]*\): |prism\. )+/;

/** The effects a card's rules text names, gates removed (unknown clauses are kept verbatim, numbers blanked). */
export function effects(c: CardDef): string[] {
  const t = filledText(c).toLowerCase().replace(/\d+/g, 'n').replace(/evolve n \([^)]*\)\.?/, '').replace(/\(it [^)]*\)/g, '').replace(/stacks\./g, '');
  const out = new Set<string>();
  for (let cl of t.split(/\. | and (?=deal|gain|apply|draw|heal|bank|steal|summon|add|bury|exhume|double|spend|cash|raise|negate|disrupt|lose|attune|your)|\.$/)) {
    cl = cl.trim().replace(COND, '').replace(COND, '').trim();
    if (!cl) continue;
    const r = RULES.find(([re]) => re.test(cl));
    const tok = r ? cl.match(r[0])![0].replace(r[0], r[1]) : cl.replace(/[.,]$/, '');
    if (tok) out.add(tok);
  }
  if (c.evolve) out.add('evolve');
  return [...out].sort();
}
export function pattern(c: CardDef): string {
  return [c.type, c.trigger ?? c.counter ?? '', c.cost, c.exhaust ? 'X' : '', effects(c).join('+')].join('|');
}
/** True when the text has a gate (a condition, Chain, or a Fate Coin half). */
export const gated = (c: CardDef): boolean => /\bIf |Chain \d|☀|☾/.test(c.text);

const cache = new Map<string, string[]>();
/** effects(), cached by id (card defs never change after load). */
export function effectsOf(c: CardDef): string[] {
  let e = cache.get(c.id);
  if (!e) { e = effects(c); cache.set(c.id, e); }
  return e;
}
/** Statuses and mechanics a card names (Burn, Chill, Verdict, companions...), for synergy: plain damage and Block don't count. */
export function themesOf(c: CardDef): string[] {
  return effectsOf(c).map((t) => t.replace(/^(p_|x2_|c_)/, '').replace(/All$/, '')).filter((t) => !['dmg', 'dmg2', 'dmgRnd', 'block', 'draw', 'heal', 'evolve', 'sprout', 'bank', 'energy'].includes(t) && !t.includes(' '));
}
