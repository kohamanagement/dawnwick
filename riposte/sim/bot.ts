// A simple heuristic bot used to balance-check the game. It plays each candidate card in a
// cloned combat, scores the outcome, and keeps the best. It is deliberately not smart about
// long-term plans, so its win rate is a floor for a decent human player.
import { altPath } from '../src/data/upgrades';
import { Combat } from '../src/engine/combat';
import type { CombatState, RunState } from '../src/engine/types';
import { CARDS } from '../src/data/cards';
import {
  ROWS, buyCard, buyRelic, chooseFate, enterEpilogue, declineEpilogue, choosePatron, descendNight, buyRemove, chooseEvent, finishCombat, nodeAt, proceed, reachable, restHeal, restUpgrade,
  takeCard, takeGold, takeRelic, travel, answerDealer, isDown, suitOf, peek, payDebt, DEBT_PRICE,
} from '../src/engine/run';
import { EVENT_MAP } from '../src/data/events';

const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x));

interface Node { s: CombatState; r: RunState; plays: [number, number | undefined][]; vals?: number[]; }

/** v0.12 card lab: per-card exposure and value, filled while LAB.on (sim/cardlab.ts reads it). */
export interface CardLab { off: number; pick: number; drawn: number; played: number; val: number; held: number }
export const LAB = {
  on: false,
  /** True while the bot makes its real moves (not lookahead copies). */
  live: false,
  /** 'random': take a random offered card every time (even coverage for the lab). */
  pick: '' as '' | 'random',
  cards: {} as Record<string, CardLab>,
  fights: {} as Record<string, { n: number; turns: number; hpLost: number }>,
};
const lab = (id: string): CardLab => (LAB.cards[id] ??= { off: 0, pick: 0, drawn: 0, played: 0, val: 0, held: 0 });

/** Evaluate a position by actually playing out the enemy turn on a copy. */
function evaluate(root: CombatState, n: Node): number {
  const r = clone(n.r);
  const s = clone(n.s);
  const cb = new Combat(s, r);
  if (s.phase === 'player') cb.endTurn();
  const p0 = root.player, p1 = s.player;
  let v = 0;
  if (s.phase === 'won') v += 200;
  if (s.phase === 'lost') return -1000;
  root.enemies.forEach((e0, i) => {
    if (e0.dead) return;
    const e1 = s.enemies[i];
    v += e0.hp - Math.max(0, e1.hp);
    if (e1.dead) v += 10;
    else {
      v += (e1.st.burn ?? 0) * 1.2 + (e1.st.weak ?? 0) * 1.5 + (e1.st.vuln ?? 0) * 1.5;
      const doom = e1.st.doom ?? 0;
      v += doom >= e1.hp ? e1.hp : doom * (root.kind === "normal" ? 0.5 : 0.85);
      v -= e1.traps.length * 2;
      // v0.12: the v0.7 debuffs pay off later, so the copy's one enemy turn misses them. Credit what is left.
      const boss = root.kind === 'boss' ? 1 : 0;
      v += ((e1.st.shock ?? 0) - (e0.st.shock ?? 0)) * 0.9 + ((e1.st.mark ?? 0) - (e0.st.mark ?? 0)) * (2 + boss) + ((e1.st.tremor ?? 0) - (e0.st.tremor ?? 0)) * 0.9;
      v += ((e1.st.chill ?? 0) - (e0.st.chill ?? 0)) * (boss ? 0.8 : 1.4) + (e1.st.frozen && !e0.st.frozen ? 8 : 0);
      v -= (e1.st.str ?? 0) * 2;
    }
  });
  const low = p1.hp < p1.maxHp * 0.35 ? 2.4 : 1.5;
  v -= (p0.hp - p1.hp) * low;
  v += ((p1.st.str ?? 0) - (p0.st.str ?? 0)) * 4 + ((p1.st.thorns ?? 0) - (p0.st.thorns ?? 0)) * 2;
  for (const k of ['growth', 'kindle', 'focus', 'flow', 'duel', 'crown', 'harvest', 'edge', 'wheel', 'midas', 'house', 'lantern', 'prism', 'double', 'crow', 'klepto', 'nest', 'bark', 'bankroll', 'ouro', 'coil', 'bloom',
    // v0.9 powers
    'stoke9', 'kiln', 'undertow9', 'riptide', 'sap', 'rootwall', 'entropy', 'wither', 'dividend', 'loaded', 'refract', 'hoard', 'wake9', 'cryptward',
    'staticfield', 'capacitor9', 'hoarfrost', 'shatter9', 'bedrock', 'landslide', 'vigil', 'absolution', 'solvent9', 'philstone', 'kinship', 'cutthroat', 'umbra']) if ((p1.st[k] ?? 0) > (p0.st[k] ?? 0)) v += root.kind === 'normal' ? 4 : 10;
  // v0.12: stored resources (spent later) and companions (act every turn).
  const gain = (k: string): number => (p1.st[k] ?? 0) - (p0.st[k] ?? 0);
  v += gain('charge') * 1.6 + gain('verdict') * 1.4 + gain('veil') * 6 + gain('fortify') * 0.8 + gain('sprout') * 0.8
    + (gain('wolf') + gain('hawk') + gain('bear') + gain('serpent')) * 2.5;
  for (const k of Object.keys(p1.st)) if (k.startsWith('pw_') && gain(k) > 0) v += root.kind === 'normal' ? 4 : 10;
  v += p1.traps.length * 3 + s.flux * 1.5 + p1.block * 0.2 + ((p1.st.ante ?? 0) - (p0.st.ante ?? 0)) * 0.9;
  v -= (s.player.st.weak ?? 0) + (s.player.st.vuln ?? 0) * 1.5;
  return v;
}

export function botTurn(run: RunState): void {
  const root = run.combat!;
  const base = clone({ ...run, combat: null });
  let beam: Node[] = [{ s: clone(root), r: base, plays: [] }];
  let best = { v: evaluate(root, beam[0]), plays: [] as [number, number | undefined][], vals: [] as number[] };
  const v0 = best.v;
  if (LAB.on) for (const c of root.hand) lab(c.id).drawn++;
  for (let depth = 0; depth < 8 && beam.length; depth++) {
    const kids: { n: Node; v: number }[] = [];
    for (const n of beam) {
      const cb = new Combat(n.s, n.r);
      const seen = new Set<string>();
      for (const c of n.s.hand) {
        if (!cb.canPlay(c)) continue;
        const key = `${c.id}${c.up ? '+' : ''}${c.tmpCost ?? ''}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const d = CARDS[c.id];
        const targets = d.target ? cb.alive().map((e) => n.s.enemies.indexOf(e)) : [undefined];
        for (const t of targets) {
          const k: Node = { s: clone(n.s), r: clone(n.r), plays: [...n.plays, [c.uid, t]] };
          const kc = new Combat(k.s, k.r);
          if (!kc.play(c.uid, t)) continue;
          const v = evaluate(root, k);
          k.vals = [...(n.vals ?? []), v];
          kids.push({ n: k, v });
        }
      }
    }
    kids.sort((a, b) => b.v - a.v);
    if (kids[0] && kids[0].v > best.v) best = { v: kids[0].v, plays: kids[0].n.plays, vals: kids[0].n.vals ?? [] };
    beam = kids.slice(0, 4).map((k) => k.n);
  }
  const cb = new Combat(root, run);
  LAB.live = true;
  best.plays.forEach(([uid, t], i) => {
    if (root.phase !== 'player') return;
    // Replays can diverge (random draws): skip plays that are no longer possible.
    const c = root.hand.find((x) => x.uid === uid);
    if (!c) return;
    if (cb.play(uid, t) && LAB.on) { const l = lab(c.id); l.played++; l.val += best.vals[i] - (i ? best.vals[i - 1] : v0); }
  });
  if (LAB.on && root.phase === 'player') for (const c of root.hand) if (cb.canPlay(c)) lab(c.id).held++;
  if (root.phase === 'player') cb.endTurn();
  LAB.live = false;
}

export function botCombat(run: RunState): void {
  const hp0 = run.combat!.player.hp, kind = run.combat!.kind;
  for (let turns = 0; turns < 80 && run.combat && (run.combat.phase === 'player' || run.combat.phase === 'enemy'); turns++) botTurn(run);
  if (run.combat && run.combat.phase !== 'won' && run.combat.phase !== 'lost') run.combat.phase = 'lost';
  if (LAB.on && run.combat) { const f = (LAB.fights[`A${run.act} ${kind}`] ??= { n: 0, turns: 0, hpLost: 0 }); f.n++; f.turns += run.combat.turn; f.hpLost += hp0 - Math.max(0, run.combat.player.hp); }
  finishCombat(run);
}

const RAR: Record<string, number> = { rare: 3, uncommon: 2, common: 1 };

function pickReward(run: RunState): void {
  const r = run.reward!;
  takeGold(run);
  if (r.relic) takeRelic(run);
  if (r.relicChoices?.length) takeRelic(run, r.relicChoices[0]);
  if (r.cards) {
    const deckSize = run.deck.length;
    const attacks = run.deck.filter((c) => CARDS[c.id].type === 'attack').length / deckSize;
    const powers = run.deck.filter((c) => CARDS[c.id].type === 'power').length;
    const reactions = run.deck.filter((c) => CARDS[c.id].type === 'reaction').length;
    const val = (id: string) => {
      const d = CARDS[id];
      let v = RAR[d.rarity];
      if (d.type === 'attack' && attacks < 0.45) v += 2;
      if (d.type === 'power' && powers >= 2) v -= 3;
      if (d.type === 'reaction' && reactions >= 4) v -= 2;
      v -= run.deck.filter((c) => c.id === id).length * 1.5;
      return v;
    };
    let best = LAB.pick === 'random' ? r.cards[Math.floor(Math.random() * r.cards.length)] : [...r.cards].sort((a, b) => val(b) - val(a))[0];
    // v0.14 The Deal: the face-down card is one rarity higher, but taken blind (the bot can't read it either).
    const blindVal = r.cards.some((id) => CARDS[id].rarity === 'rare') ? 2.8 : 2.4;
    if (r.hidden && LAB.pick !== 'random' && val(best) < blindVal) best = r.hidden;
    const take = LAB.pick === 'random' ? deckSize < 30 : deckSize < 26 && (best === r.hidden || val(best) >= 1);
    if (LAB.on) { for (const id of r.cards) lab(id).off++; if (r.hidden) lab(r.hidden).off++; if (take) lab(best).pick++; }
    takeCard(run, take ? best : null);
    if (run.reward?.answer) answerDealer(run, run.gold >= run.reward.answer.cost + 40);
  }
}

function worstCard(run: RunState): number | undefined {
  const order = ['regret', 'wound', 'strike', 'guard'];
  for (const id of order) { const c = run.deck.find((x) => x.id === id); if (c) return c.uid; }
  return run.deck[0]?.uid;
}

/** v0.11: take path B when it makes the card cheaper (what most players would do), else path A. */
function botPath(run: RunState, uid: number): 'b' | undefined {
  const c = run.deck.find((x) => x.uid === uid);
  return c && altPath(CARDS[c.id]).kind === 'cheap' ? 'b' : undefined;
}

function bestUpgrade(run: RunState): number | undefined {
  const c = [...run.deck].filter((x) => !x.up && CARDS[x.id].type !== 'curse')
    .sort((a, b) => (RAR[CARDS[b.id].rarity] ?? 0.5) - (RAR[CARDS[a.id].rarity] ?? 0.5))[0];
  return c?.uid;
}

export function botStep(run: RunState): void {
  switch (run.screen) {
    case 'map': {
      const opts = reachable(run);
      if (!opts.length) { run.finished = true; return; }
      const hpPct = run.hp / run.maxHp;
      const pref = (t: string): number => {
        if (t === 'rest') return hpPct < 0.45 ? 10 : 2;
        if (t === 'elite') return hpPct > 0.7 ? 6 : -5;
        if (t === 'shop') return run.gold >= 100 ? 7 : 0;
        if (t === 'treasure') return 8;
        if (t === 'event') return 3;
        if (t === 'mystery') return 4;
        if (t === 'shrine') return 5;
        return 4;
      };
      // v0.14: face-down cards show only their suit. The bot peeks at one when it can, and otherwise reads the suit.
      if (run.peeks) { const d = opts.find((o) => o.row < ROWS && isDown(nodeAt(run, o.row, o.col)!)); if (d) peek(run, d.row, d.col); }
      const SUIT_PREF: Record<string, number> = { spade: 3.5, heart: hpPct < 0.45 ? 8 : 3, diamond: 6, club: 3 };
      const prefAt = (o: { row: number; col: number }): number => {
        if (o.row === ROWS) return pref('boss');
        const n = nodeAt(run, o.row, o.col)!;
        return isDown(n) ? SUIT_PREF[suitOf(n.type)] : pref(n.type);
      };
      const best = [...opts].sort((a, b) => prefAt(b) - prefAt(a))[0];
      travel(run, best.row, best.col);
      return;
    }
    case 'combat': botCombat(run); return;
    case 'reward': case 'treasure': pickReward(run); proceed(run); return;
    case 'forge': proceed(run); return;
    case 'fate': chooseFate(run, run.fateOffer?.[0] ?? null); return;
    case 'epilogue':
      if (run.epilogue === 'offered') enterEpilogue(run);
      else if (process.env.NIGHT && !run.night) descendNight(run);
      else declineEpilogue(run);
      return;
    case 'patron': {
      // Prefer blessings that do not cost HP; otherwise take the first offer.
      const offers = run.patron?.offers ?? [];
      const safe = offers.find((id) => !['rope', 'borrowed_crown', 'all_in', 'cargo', 'second_face'].includes(id));
      choosePatron(run, safe ?? offers[0] ?? null);
      if (run.reward?.cards) { pickReward(run); proceed(run); }
      return;
    }
    case 'rest': {
      if (run.hp / run.maxHp < 0.6) restHeal(run);
      else { const u = bestUpgrade(run); if (u !== undefined) restUpgrade(run, u, botPath(run, u)); else restHeal(run); }
      proceed(run); return;
    }
    case 'shop': {
      // v0.14: pay off a Patron's debt first (the boss would otherwise get an extra trap).
      while (run.debts?.length && run.gold >= DEBT_PRICE) payDebt(run, 0);
      const w = worstCard(run);
      if (w !== undefined && run.shop && run.gold >= run.shop.removePrice) buyRemove(run, w);
      run.shop?.cards.forEach((c, i) => { if (!c.sold && CARDS[c.id].rarity !== 'common' && run.gold >= c.price) buyCard(run, i); });
      // v0.12: spend what is left on relics, cheapest first (players don't end runs sitting on 300 gold).
      [...(run.shop?.relics ?? [])].map((x, i) => ({ ...x, i })).sort((a, b) => a.price - b.price).forEach((x) => { if (!x.sold && run.gold >= x.price) buyRelic(run, x.i); });
      proceed(run); return;
    }
    case 'event': {
      const ev = EVENT_MAP[run.event!.id];
      let done = false;
      for (let i = 0; i < ev.options.length && !done; i++) {
        const o = ev.options[i];
        if (o.can && !o.can(run)) continue;
        if (o.risky || o.label.startsWith('Bet') || o.label.startsWith('Take the deal')) continue;
        const uid = o.pick === 'upgrade' || o.pick === 'sigil' || o.pick === 'duplicate' ? bestUpgrade(run) : o.pick ? worstCard(run) : undefined;
        if (o.pick && uid === undefined) continue;
        done = chooseEvent(run, i, uid);
      }
      if (!done) for (let i = 0; i < ev.options.length && !done; i++) {
        // Only gambles left: take the last option (usually Leave), or any that works.
        const j = ev.options.length - 1 - i;
        const o = ev.options[j];
        if (o.can && !o.can(run)) continue;
        done = chooseEvent(run, j, o.pick ? (o.pick === 'remove' || o.pick === 'transform' ? worstCard(run) : bestUpgrade(run)) : undefined);
      }
      if ((run.screen as string) === 'combat') return;
      // A multi-stage event moved on to its next step: answer that on the next step.
      if (run.event && !run.event.resolved && done) return;
      if (run.reward?.cards) pickReward(run);
      proceed(run); return;
    }
    default: run.finished = true;
  }
}
