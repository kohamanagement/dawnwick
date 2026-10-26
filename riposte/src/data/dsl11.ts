// v0.11 "Branching Paths": the card-design language behind the v0.11 cards (cards11.ts).
//
// A design names a shape (type, cost, rarity) and a list of effects; the compiler prices the numbers on
// the same yardstick as cardgen.ts (1 energy ≈ 6 damage ≈ 5 Block ≈ 1.3 cards; Reactions +30%,
// Counters +20%, uncommon +12%, rare +35%, legendary +60%, Exhaust +35%) and writes the rules text.
// What v0.11 adds over the v0.7 atoms are *conditions*: an effect can be gated on the chain ("Chain 2:"),
// on the target's statuses ("If the target has Burn,"), on the turn ("If this is the first card you
// played this turn,"), on your own state (Block, Verdict, Charge, a companion, your Crypt) and more.
// A gated effect is priced by how often its condition holds, so it prints bigger numbers.
//
//   code:  A1c  = attack, cost 1, common      S = skill, P = power
//          Ra1u = Reaction "when attacked"    Rs = "when an enemy uses a non-attack", Rr = "when a trap activates"
//          Cr0c = Counter vs a trap/Reaction  Ca = vs an attack, Cs = vs a non-attack, Cx = vs anything
//          rarity: c / u / r / l
//   fx:    space-separated effects, each `[cond:]atom[*share]`, e.g. "dmg tb:p_burn*.5 ch2:draw1"
//          a trailing X in the code (A2rX) makes the card Exhaust.
import type { CardDef, CardElement, CardType, CounterOn, Faction, Rarity, Trigger, Vals } from '../engine/types';
import type { Combat, Ctx } from '../engine/combat';
import type { Combatant } from '../engine/types';
import type { StatusDef } from './statuses';
import { ATOMS, RARITY_MULT, T, cap, ph, type Atom, type Where } from './cardgen';

const COMPANIONS = ['wolf', 'bear', 'hawk', 'serpent'];
const who = (w: Where): string => (w === 'card' ? 'the target' : w === 'attack' ? 'the attacker' : w === 'skill' ? 'it' : 'its owner');

// ───────── extra atoms (v0.11) ─────────
const A: Record<string, Atom> = { ...ATOMS };
const add = (a: Atom): void => { A[a.id] = a; };
add({ id: 'lose3', kind: 'cost', pts: -4, fixed: true, say: () => 'lose 3 HP', run: (c) => { if (c.isPlayer && !c.rec) c.cb.loseHp(c.src, 3); } });
add({ id: 'energy1', kind: 'energy', pts: 7, fixed: true, say: () => 'gain 1 energy', run: (c) => c.energy(1) });
add({ id: 'glint2', kind: 'glint', pts: 7.5, fixed: true, say: () => 'add 2 Glints to your hand', run: (c) => { c.addCard('glint', 'hand'); c.addCard('glint', 'hand'); } });
add({ id: 'xcharge', kind: 'xcharge', pts: 2.4, one: true, say: (k) => `spend all Charge: deal ${ph(k)} damage per Charge spent`, run: (c, n) => { const k = c.spendCharge(); if (k) c.dmg(n * k); } });
add({ id: 'xverdict', kind: 'xverdict', pts: 1.8, say: (k) => `spend all Verdict: gain ${ph(k)} Guard per Verdict spent`, run: (c, n) => { const k = c.spendVerdict(); if (k) c.block(n * k); } });
add({ id: 'xante', kind: 'xante', pts: 2.2, one: true, say: (k) => `cash in your Ante: deal ${ph(k)} damage per Ante`, run: (c, n) => { const k = c.cashAnte(); if (k) c.dmg(n * k); } });
add({ id: 'dhand', kind: 'dmg', pts: 4.2, one: true, say: (k, w) => `deal ${ph(k)} damage${T(w)} for each card in your hand`, run: (c, n) => c.dmg(n * c.handSize) });
add({ id: 'bfoe', kind: 'block', pts: 2.2, say: (k) => `gain ${ph(k)} Guard for each enemy`, run: (c, n) => c.block(n * c.foes.length) });
add({ id: 'dset', kind: 'dmg', pts: 1.7, one: true, say: (k, w) => `deal ${ph(k)} damage${T(w)} for each Reaction you have set`, run: (c, n) => { const k = c.src.traps.length; if (k) c.dmg(n * k); } });
add({ id: 'dcrypt', kind: 'dmg', pts: 2.6, say: (k) => `deal ${ph(k)} damage to a random enemy for each card in your Crypt`, run: (c, n) => { const k = c.crypt; if (k) c.dmgRandom(n * k); } });
add({ id: 'bcomp', kind: 'block', pts: 2.4, say: (k) => `gain ${ph(k)} Guard for each companion you have`, run: (c, n) => { const k = COMPANIONS.filter((x) => c.src.st[x]).length; if (k) c.block(n * k); } });
add({ id: 'rally', kind: 'rally', pts: 6, fixed: true, say: () => 'your companions act', run: (c) => c.rally() });
add({ id: 'catalyzeF', kind: 'catalyze', pts: 2, fixed: true, say: () => 'attune to the element that beats the first enemy', run: (c) => c.catalyze(c.foes[0] ?? null) });
add({ id: 'flip', kind: 'flip', pts: 0, fixed: true, say: () => 'flip your Fate Coin', run: (c) => c.flip() });
add({ id: 'disrupt2', kind: 'disrupt', pts: 7, fixed: true, say: () => 'Disrupt 2', run: (c) => c.disrupt(2) });
add({ id: 'bury4', kind: 'bury', pts: 5.5, fixed: true, say: () => 'Bury 4', run: (c) => { c.bury(4); } });
add({ id: 'veil2', kind: 'veil', pts: 13, fixed: true, say: () => 'gain 2 Veil', run: (c) => c.apply('veil', 2, 'self') });
add({ id: 'str2', kind: 'str', pts: 19, fixed: true, say: () => 'gain 2 Edge', run: (c) => c.apply('str', 2, 'self') });
add({ id: 'verdict2', kind: 'verdict', pts: 5.5, fixed: true, say: () => 'gain 2 Verdict', run: (c) => c.apply('verdict', 2, 'self') });
add({ id: 'hit', kind: 'dmg', pts: 1, say: (k) => `deal ${ph(k)} damage to the first enemy`, run: (c, n) => { const f = c.foes[0]; if (f) c.cb.hit(c.src, f, n, c.kind === 'attack', c.elem); } });
add({ id: 'thornsBig', kind: 'thorns', pts: 3, say: (k) => `gain ${ph(k)} Barbs`, run: (c, n) => c.apply('thorns', n, 'self') });
for (const st of ['burn', 'chill', 'shock', 'tremor', 'doom', 'mark', 'weak', 'vuln']) {
  const name = st === 'vuln' ? 'Exposed' : cap(st);
  // "double it": the payoff for stacking a debuff.
  if (['burn', 'chill', 'shock', 'tremor', 'doom'].includes(st)) {
    add({ id: `x2_${st}`, kind: `x2_${st}`, pts: st === 'doom' ? 6 : 8, fixed: true, one: true, say: (_k, w) => `double ${who(w) === 'the target' ? "the target's" : who(w) === 'the attacker' ? "the attacker's" : 'its'} ${name}`,
      run: (c) => { const t = c.tgtOrFirst; const k = c.status(t, st); if (t && k) c.apply(st, k); } });
  }
}

// ───────── conditions ─────────
interface Cond { p: number; say: (w: Where) => string; test: (c: Ctx) => boolean; tgt?: boolean; cardOnly?: boolean }
const tHas = (st: string, name: string): Cond => ({ p: 0.55, tgt: true, say: (w) => `If ${who(w)} has ${name}, `, test: (c) => c.status(c.tgtOrFirst, st) > 0 });
export const CONDS: Record<string, Cond> = {
  ch2: { p: 0.5, say: () => 'Chain 2: ', test: (c) => c.chainLen >= 2 },
  ch3: { p: 0.3, say: () => 'Chain 3: ', test: (c) => c.chainLen >= 3 },
  tb: tHas('burn', 'Burn'), tc: tHas('chill', 'Chill'), ts: tHas('shock', 'Shock'), tt: tHas('tremor', 'Tremor'), tw: tHas('weak', 'Shaken'),
  tv: tHas('vuln', 'Exposed'), td: tHas('doom', 'Doom'), tm: tHas('mark', 'Mark'),
  frz: { p: 0.3, tgt: true, say: (w) => `If ${who(w)} is Frozen, `, test: (c) => !!c.tgtOrFirst?.st.frozen },
  low: { p: 0.4, tgt: true, say: (w) => `If ${who(w)} is below half HP, `, test: (c) => { const t = c.tgtOrFirst; return !!t && t.hp * 2 < t.maxHp; } },
  first: { p: 0.4, cardOnly: true, say: () => 'If this is the first card you played this turn, ', test: (c) => c.cb.s.cardsThisTurn <= 1 },
  combo: { p: 0.45, cardOnly: true, say: () => 'If you played 2+ other cards this turn, ', test: (c) => c.cb.s.cardsThisTurn >= 3 },
  blk: { p: 0.5, say: () => 'If you have Guard, ', test: (c) => c.src.block > 0 },
  hand: { p: 0.45, cardOnly: true, say: () => 'If you hold 3 or fewer other cards, ', test: (c) => c.handSize <= 3 },
  el2: { p: 0.35, say: () => 'If you played 2+ elements this turn, ', test: (c) => c.elementsPlayed >= 2 },
  vd: { p: 0.6, say: () => 'If you have Verdict, ', test: (c) => c.verdict > 0 },
  cg: { p: 0.6, say: () => 'If you have Charge, ', test: (c) => c.charge > 0 },
  ctr: { p: 0.35, say: () => 'If you played a Counter this turn, ', test: (c) => c.countersThisTurn > 0 },
  cry: { p: 0.5, say: () => 'If your Crypt holds 3+ cards, ', test: (c) => c.crypt >= 3 },
  cmp: { p: 0.6, say: () => 'If you have a companion, ', test: (c) => COMPANIONS.some((x) => c.src.st[x]) },
  veil: { p: 0.4, say: () => 'If you have Veil, ', test: (c) => (c.src.st.veil ?? 0) > 0 },
  ante: { p: 0.5, say: () => 'If your Ante is 3+, ', test: (c) => c.ante >= 3 },
  sun: { p: 0.5, say: () => '☀ ', test: (c) => c.sun },
  moon: { p: 0.5, say: () => '☾ ', test: (c) => c.moon },
  gl: { p: 0.4, say: () => 'If you hold a Glint, ', test: (c) => c.glints > 0 },
  stl: { p: 0.3, say: () => 'If you have a stolen trap set, ', test: (c) => c.stolenSet > 0 },
  set2: { p: 0.45, say: () => 'If you have 2+ Reactions set, ', test: (c) => c.src.traps.length >= 2 },
  thr: { p: 0.55, say: () => 'If you have Barbs, ', test: (c) => (c.src.st.thorns ?? 0) > 0 },
  fort: { p: 0.55, say: () => 'If you have Fortify, ', test: (c) => (c.src.st.fortify ?? 0) > 0 },
  hurt: { p: 0.35, say: () => 'If you are below half HP, ', test: (c) => c.src.hp * 2 < c.src.maxHp },
  multi: { p: 0.45, say: () => 'If there are 2+ enemies, ', test: (c) => c.foes.length >= 2 },
  str: { p: 0.45, say: () => 'If you have Edge, ', test: (c) => (c.src.st.str ?? 0) > 0 },
  exh: { p: 0.35, say: () => 'If you Exhumed this turn, ', test: (c) => c.exhumedThisTurn },
  att: { p: 0.5, say: () => 'If you are attuned to the element that beats the target, ', tgt: true, test: (c) => c.effective(c.tgtOrFirst) },
};

// ───────── compiler ─────────
export interface Design {
  name: string;
  code: string;
  fx: string;
  icon: string;
  faction: Faction;
  id?: string;
  element?: CardElement;
  faction2?: Faction;
  evolve?: { into: string; n: number };
  evolved?: boolean;
  alt?: CardDef['alt'];
  /** Extra text after the effects (e.g. "Evolve 4 → Name."), not priced. */
  note?: string;
  /** Budget multiplier (an Evolve card pays for its future, an evolved card is its reward). */
  mult?: number;
  unlock?: number;
}

const TYPES: Record<string, CardType> = { A: 'attack', S: 'skill', P: 'power', R: 'reaction', C: 'counter' };
const TRIG: Record<string, Trigger> = { a: 'attack', s: 'skill', r: 'reaction' };
const CTR: Record<string, CounterOn> = { a: 'attack', s: 'skill', r: 'reaction', x: 'any' };
const RAR: Record<string, Rarity> = { c: 'common', u: 'uncommon', r: 'rare', l: 'legendary' };
const WHEN: Record<string, string> = { attack: 'When attacked: ', skill: 'When an enemy uses a non-attack: ', reaction: 'When an enemy trap activates: ' };
const CWHEN: Record<string, string> = { attack: 'Counter (an attack): ', reaction: 'Counter (a trap or Reaction): ', skill: 'Counter (a non-attack): ', any: 'Counter (anything an enemy does): ' };

export function parseCode(code: string): { type: CardType; trigger?: Trigger; counter?: CounterOn; cost: number; rarity: Rarity; exhaust: boolean } {
  const m = /^([ASPRC])([asrx]?)(\d)([curl])(X?)$/.exec(code);
  if (!m) throw new Error(`bad card code ${code}`);
  const type = TYPES[m[1]];
  return {
    type, cost: Number(m[3]), rarity: RAR[m[4]], exhaust: m[5] === 'X',
    trigger: type === 'reaction' ? TRIG[m[2]] : undefined, counter: type === 'counter' ? CTR[m[2] || 'r'] : undefined,
  };
}

export function budgetOf(type: CardType, cost: number, rarity: Rarity, exhaust: boolean): number {
  const base = [4, 7, 13.5, 20][cost] ?? cost * 6.8;
  const tm = type === 'reaction' ? 1.3 : type === 'counter' ? 1.2 : 1;
  return base * tm * (RARITY_MULT[rarity] ?? 1) * (exhaust ? 1.35 : 1);
}

interface Part { a: Atom; key: string; cond?: Cond; condId?: string; share?: number }

/** Minimum printed number for damage/Block-like effects (below that a card reads as filler). */
function minFor(a: Atom): number {
  if (a.kind === 'dmg') return a.id === 'dmgRnd' || a.id === 'dhand' || a.id === 'dset' || a.id === 'dcrypt' ? (a.id === 'dmgRnd' ? 2 : 1) : 3;
  if (a.kind === 'block') return a.id === 'bfoe' || a.id === 'bcomp' ? 1 : 3;
  if (a.kind.startsWith('p_')) return 2;
  return 1;
}

export class DesignError extends Error {}

const SATISFIED_BY: Record<string, string[]> = {
  blk: ['block', 'bfoe', 'bcomp'], cg: ['charge'], vd: ['verdict1', 'verdict2'], thr: ['thorns', 'thornsBig'], fort: ['fortify'], cmp: ['wolf', 'bear', 'hawk', 'serpent'],
  veil: ['veil1', 'veil2'], ante: ['ante'], gl: ['glint', 'glint2'], tb: ['burn', 'burnAll'], tc: ['chill', 'chillAll'], ts: ['shock', 'shockAll'], tt: ['tremor', 'tremorAll'],
  tw: ['weak', 'weakAll'], tv: ['vuln', 'vulnAll'], td: ['doom', 'doomAll'], tm: ['mark', 'markAll'], str: ['str1', 'str2'], cry: ['bury2', 'bury4'], exh: ['exhume1'],
  att: ['catalyze'], stl: ['steal1'],
};

/** Largest number an effect may print (beyond it a status stops meaning more, or a multiplier gets silly). */
const CAP: Record<string, number> = {
  weak: 3, weakAll: 3, vuln: 3, vulnAll: 2, mark: 4, markAll: 3, thorns: 6, thornsBig: 7, charge: 5, fortify: 8, chill: 7, chillAll: 5, ante: 8,
  doom: 18, doomAll: 12, burn: 8, burnAll: 5, shock: 10, shockAll: 7, tremor: 8, tremorAll: 6, sprout: 14, heal: 10,
  dhand: 3, dset: 5, dcrypt: 3, bfoe: 6, bcomp: 6, xcharge: 6, xante: 7, xverdict: 6, wolf: 4, bear: 4, hawk: 3, serpent: 3,
  p_burn: 10, p_chill: 10, p_shock: 10, p_weak: 10, p_tremor: 10, p_doom: 10, p_mark: 10,
};

/** Compile one design into a card. Throws DesignError when it can't be priced sensibly. */
export function compile(d: Design): CardDef {
  const sh = parseCode(d.code);
  const w: Where = sh.type === 'reaction' ? (sh.trigger === 'attack' ? 'attack' : sh.trigger === 'skill' ? 'skill' : 'trap')
    : sh.type === 'counter' ? (sh.counter === 'attack' ? 'attack' : sh.counter === 'skill' ? 'skill' : 'trap') : 'card';
  const keys = ['a', 'b', 'c', 'e', 'f'];
  const parts: Part[] = d.fx.trim().split(/\s+/).map((tok, i) => {
    const m = /^(?:(\w+):)?(\w+)(?:\*([\d.]+))?$/.exec(tok);
    if (!m) throw new DesignError(`${d.name}: bad effect ${tok}`);
    const a = A[m[2]];
    if (!a) throw new DesignError(`${d.name}: unknown atom ${m[2]}`);
    const cond = m[1] ? CONDS[m[1]] : undefined;
    if (m[1] && !cond) throw new DesignError(`${d.name}: unknown condition ${m[1]}`);
    if (cond?.cardOnly && w !== 'card') throw new DesignError(`${d.name}: ${m[1]} only works on cards you play`);
    return { a, key: keys[i], cond, condId: m[1], share: m[3] ? Number(m[3]) : undefined };
  });
  // A condition that an earlier effect of the same card always makes true is a mistake ("apply Burn. If the target has Burn, ...").
  for (let i = 0; i < parts.length; i++) {
    const c = parts[i].condId;
    if (!c) continue;
    // Reactions and Counters always answer something, so their chain is at least 2 links.
    if (c === 'ch2' && w !== 'card') throw new DesignError(`${d.name}: an answer is always in a chain of 2+`);
    if (c === 'ctr' && sh.type === 'counter') throw new DesignError(`${d.name}: a Counter always satisfies "played a Counter"`);
    const made = parts.slice(0, i).filter((p) => !p.cond).map((p) => p.a.id);
    if ((SATISFIED_BY[c] ?? []).some((a) => made.includes(a))) throw new DesignError(`${d.name}: ${c} is always true after ${made.join(', ')}`);
  }
  let pts = budgetOf(sh.type, sh.cost, sh.rarity, sh.exhaust) * (d.mult ?? 1);
  for (const p of parts) if (p.a.fixed) pts -= p.a.pts * (p.cond?.p ?? 1);
  const scal = parts.filter((p) => !p.a.fixed);
  const v: Vals = {}, up: Vals = {};
  if (scal.length) {
    // Default weights: the first effect leads, gated effects take a little less than plain ones.
    const given = scal.map((p, i) => p.share ?? (i === 0 && !p.cond ? 1.6 : p.cond ? 0.9 : 1));
    const tot = given.reduce((x, y) => x + y, 0);
    scal.forEach((p, i) => {
      const unit = p.a.pts * (p.cond?.p ?? 1);
      const val = Math.max(1, Math.round((Math.max(pts, 2) * given[i] / tot) / unit));
      if (val < minFor(p.a)) throw new DesignError(`${d.name}: ${p.a.id} would print ${val}`);
      if (val > (CAP[p.a.id] ?? 99)) throw new DesignError(`${d.name}: ${p.a.id} would print ${val} (cap ${CAP[p.a.id]})`);
      v[p.key] = val;
      up[p.key] = Math.max(val + 1, Math.round(val * 1.34));
    });
  } else if (pts < -1) throw new DesignError(`${d.name}: too rich for its cost (${pts.toFixed(1)} over)`);
  if (scal.length && pts < 1.5) throw new DesignError(`${d.name}: fixed effects use the whole budget`);
  // Text: plain effects first (joined), then each gated effect as its own sentence.
  // A Fate Coin flip is said last (it happens after the coin is read).
  const plain = parts.filter((p) => !p.cond && p.a.id !== 'flip'), gated = parts.filter((p) => p.cond);
  const flip = parts.find((p) => p.a.id === 'flip');
  const list = (xs: string[]): string => (xs.length <= 2 ? xs.join(' and ') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
  const say = (p: Part): string => p.a.say(p.key, w);
  let text: string;
  if (w === 'card') {
    const s1 = plain.map((p) => cap(say(p)) + '.').join(' ');
    const s2 = gated.map((p) => { const h = p.cond!.say(w); return `${h}${h.endsWith(', ') ? say(p) : cap(say(p))}.`; }).join(' ');
    text = [s1, s2].filter(Boolean).join(' ');
  } else {
    const head = sh.type === 'reaction' ? WHEN[sh.trigger!] : CWHEN[sh.counter!];
    const s1 = plain.length ? head + list(plain.map(say)) + '.' : head.replace(/: $/, ':');
    const s2 = gated.map((p) => { const h = p.cond!.say(w); return `${h}${h.endsWith(', ') ? say(p) : cap(say(p))}.`; }).join(' ');
    text = [s1, s2].filter(Boolean).join(' ');
  }
  if (flip) text += ' Flip your Fate Coin.';
  if (d.element === 'prism' && sh.type !== 'power') text = `Prism. ${text}`;
  if (d.note) text = `${text} ${d.note}`;
  const run = (c: Ctx, vv: Vals): void => {
    for (const p of parts) { if (p.cond && !p.cond.test(c)) continue; p.a.run(c, vv[p.key] ?? 0); }
  };
  const card: CardDef = {
    id: d.id ?? '', name: d.name, faction: d.faction, type: sh.type, rarity: sh.rarity, cost: sh.cost, v, text, icon: d.icon,
  };
  if (Object.keys(up).length) card.up = up;
  else if (sh.cost > 0) card.upCost = sh.cost - 1;
  else throw new DesignError(`${d.name}: a 0-cost card needs a number to upgrade`);
  if (sh.exhaust) card.exhaust = true;
  if (d.element) card.element = d.element;
  if (d.faction2) card.faction2 = d.faction2;
  if (d.evolve) card.evolve = d.evolve;
  if (d.evolved) card.evolved = true;
  if (d.alt) card.alt = d.alt;
  if (d.unlock) card.unlock = d.unlock;
  if (sh.type === 'reaction') { card.trigger = sh.trigger; card.react = run; }
  else if (sh.type === 'counter') { card.counter = sh.counter; card.react = run; }
  else { card.play = run; card.target = parts.some((p) => p.a.one || p.cond?.tgt); }
  return card;
}

// ───────── powers (v0.11) ─────────
// A power is a trigger and one effect; each power card gets its own status (pw_<card id>), added to STATUSES.
export type PowerWhen = 'start' | 'end' | 'chain2' | 'chain3' | 'counter' | 'reactfire';
const WHEN_TEXT: Record<PowerWhen, string> = {
  start: 'At the start of your turn, ', end: 'At the end of your turn, ', chain2: 'Whenever a chain of 2+ links resolves, ',
  chain3: 'Whenever a chain of 3+ links resolves, ', counter: 'Whenever you play a Counter, ', reactfire: 'Whenever one of your Reactions fires, ',
};
/** How many times a turn-long power pays out per point of budget, by trigger. */
const WHEN_MULT: Record<PowerWhen, number> = { start: 1.7, end: 1.7, chain2: 2.4, chain3: 3, counter: 2.4, reactfire: 2.2 };

export interface PowerOut { card: CardDef; status: StatusDef }

/** Compile a power design: code P<cost><rarity>, fx = "<when> [cond:]atom". */
export function compilePower(d: Design, mkCtx: (cb: Combat, who: Combatant) => Ctx): PowerOut {
  const sh = parseCode(d.code);
  const [when, tok] = d.fx.trim().split(/\s+/) as [PowerWhen, string];
  if (!WHEN_TEXT[when]) throw new DesignError(`${d.name}: bad power trigger ${when}`);
  const m = /^(?:(\w+):)?(\w+)$/.exec(tok ?? '');
  const a = m ? A[m[2]] : undefined;
  if (!m || !a || a.fixed) throw new DesignError(`${d.name}: power effect must be a scalable atom (${tok})`);
  const cond = m[1] ? CONDS[m[1]] : undefined;
  if (m[1] && (!cond || cond.cardOnly || cond.tgt)) throw new DesignError(`${d.name}: condition ${m[1]} can't gate a power`);
  const pts = budgetOf('power', sh.cost, sh.rarity, false) * 1.1 * (d.mult ?? 1);
  const n = Math.max(1, Math.round(pts / (a.pts * WHEN_MULT[when] * (cond?.p ?? 1))));
  const clause = a.say('a', 'card') + (a.one ? ' to a random enemy' : '');
  const text = `${WHEN_TEXT[when]}${cond ? cond.say('card').replace(/^If/, 'if') : ''}${clause}.`;
  const sid = `pw_${d.id}`;
  const fire: (cb: Combat, who: Combatant, n: number) => void = (cb, who, k) => {
    const c = mkCtx(cb, who);
    if (cond && !cond.test(c)) return;
    a.run(c, k);
  };
  const status: StatusDef = { id: sid, name: d.name, icon: d.icon, desc: (k) => text.replace('{a}', String(k)) };
  if (when === 'start') status.onTurnStart = fire;
  else if (when === 'end') status.onTurnEnd = fire;
  else if (when === 'chain2' || when === 'chain3') status.onChain = (cb, who, k, len) => { if (len >= (when === 'chain2' ? 2 : 3)) fire(cb, who, k); };
  else if (when === 'counter') status.onCounter = fire;
  else status.onReactFire = fire;
  const card: CardDef = {
    id: d.id ?? '', name: d.name, faction: d.faction, type: 'power', rarity: sh.rarity, cost: sh.cost, v: { a: n }, up: { a: n + 1 }, text, icon: d.icon,
    play: (c, v) => c.apply(sid, v.a, 'self'),
  };
  if (d.element) card.element = d.element;
  if (d.faction2) card.faction2 = d.faction2;
  if (d.alt) card.alt = d.alt;
  return { card, status };
}
