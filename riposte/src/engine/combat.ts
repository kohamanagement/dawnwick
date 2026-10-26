import { diffDmg } from '../data/difficulty';
import type {
  ActionKind, CardDef, CardInst, ChainLinkView, Combatant, CombatState, Element, EnemyState, Intent, RunState, UiEvent, Vals,
} from './types';
import { ELEMENTS, ELEMENT_MAP, aspectOf, beaterOf, elemMult, liveElement } from '../data/elements';
import { Rng } from './rng';
import { CARDS } from '../data/cards';
import { ENEMIES, type Move } from '../data/enemies';
import { STATUSES } from '../data/statuses';
import { RELICS, relicMod } from '../data/relics';
import { CHARACTERS } from '../data/characters';
import { applyMod } from '../data/mods';
import { exhaustsCopy, innateCopy, printedCost, retainsCopy, upVals } from '../data/upgrades';
import { AFFIX_MAP } from '../data/affixes';
import { OMENS } from '../data/omens';
import { skyOf, TERROR_MAP, WILDS } from '../data/wilds';
import { SURPRISES, SURPRISE_MAP } from '../data/surprises';
import { VENUE_MAP, type VenueDef } from '../data/venues';

export const MAX_CHAIN = 6;
/** v0.14 Exposed: +40% damage taken (+65% with the Cracked Lens). */
export const EXPOSED = 1.4;
export const EXPOSED_LENS = 1.65;
export const HAND_LIMIT = 10;
/** v0.6: chance that a normal or elite fight has a mid-fight Surprise. */
export const SURPRISE_CHANCE = 0.16;

export function vals(c: { id: string; up: boolean; path?: CardInst['path']; mod?: CardInst['mod'] }): Vals {
  return applyMod(upVals(CARDS[c.id], c), c.mod);
}

export const isRetain = (c: CardInst): boolean => retainsCopy(CARDS[c.id], c) || c.mod === 'lasting' || CARDS[c.id].type === 'counter';

/** v0.7 Counters: how the engine decides whether to answer an enemy link from your hand. */
export const COUNTERS = {
  /** 'ask' throws NeedCounter for the UI; 'auto' plays the cheapest legal Counter (bots, sims); 'off' never counters. */
  mode: 'auto' as 'ask' | 'auto' | 'off',
  /** Elites and bosses from Act 2 carry Rebuttals that negate your Counters. */
  rebut: true,
};
/** Hand Counters may push a chain this many links past its normal cap ("overchain"). */
export const OVERCHAIN = 2;

export interface CounterWindow {
  /** The enemy link you may answer. */
  against: string;
  owner: string;
  kind: ActionKind;
  /** uids of Counters in hand that can answer it now. Empty when the game only stops to show an enemy answer (v0.13.1). */
  options: number[];
  /** v0.14: Omens on your belt (indices) whose sign matches this link. Turning one over is free. */
  omens: number[];
  /** v0.13.1: Counters in hand that cannot answer this link, and why. */
  blocked?: { uid: number; reason: string }[];
  chain: ChainLinkView[];
  enemyTurn: boolean;
  /** Energy (your turn) or Flux (enemy turn) you can pay with. */
  pay: number;
}

/** Thrown by perform() in 'ask' mode when the player has to decide; Combat.attempt() rewinds and returns the window. */
export class NeedCounter extends Error {
  constructor(public win: CounterWindow) { super('counter window'); }
}
export const isInnate = (c: CardInst): boolean => innateCopy(CARDS[c.id], c) || c.mod === 'opening';

export interface Link {
  src: Combatant;
  tgt: Combatant | null;
  kind: ActionKind;
  name: string;
  card?: CardInst;
  negated: boolean;
  run: (c: Ctx) => void;
  /** v0.7: played from hand as a Counter (or an enemy Rebuttal). */
  counter?: boolean;
  /** v0.14: an Omen turned over as an answer (its id). */
  omen?: string;
}

/**
 * The effect API every card, trap and enemy move is written against. It is symmetric:
 * the same card works when the player plays it and when an Echo (ghost deck) plays it.
 * With `rec` set it records intents instead of acting (used to preview ghost turns).
 */
export class Ctx {
  constructor(
    public cb: Combat,
    public src: Combatant,
    public tgt: Combatant | null,
    public kind: ActionKind,
    public chain: Link[] | null,
    public idx: number,
    public card?: CardInst,
    public rec?: Intent[],
  ) {}

  get chainLen(): number { return (this.chain ? this.chain.length : 1) + (this.card?.mod === 'linked' ? 1 : 0); }
  get isPlayer(): boolean { return this.src.kind === 'player'; }
  get foes(): Combatant[] { return this.cb.foesOf(this.src); }
  get handSize(): number { return this.isPlayer ? this.cb.s.hand.length : 0; }
  /** The link this card is responding to (reactions only). */
  get trigger(): Link | null { return this.chain && this.idx > 0 ? this.chain[this.idx - 1] : null; }

  /** v0.7: the element this action deals damage with. */
  get elem(): Element | null {
    if (!ELEMENTS.on) return null;
    const d = this.card ? CARDS[this.card.id] : null;
    if (d && d.faction !== 'enemy') return liveElement(d, this.isPlayer ? this.cb.s.attune : null);
    if (this.src.kind === 'enemy') return this.cb.aspect(this.src);
    return null;
  }
  /** v0.7: the player's Attunement. */
  get attune(): Element | null { return this.cb.s.attune ?? null; }
  /** v0.7: set the player's Attunement (Infuse). */
  infuse(e: Element): void {
    if (this.rec || !this.isPlayer || !ELEMENTS.on) return;
    this.cb.attuneTo(e);
  }
  /** v0.7 Catalyze: attune to the element that beats this card's target (or `who`). */
  catalyze(who?: Combatant | null): void {
    const t = who ?? this.target();
    if (t) this.infuse(beaterOf(this.cb.aspect(t))!);
  }
  /** Is this card's element super effective against the target right now? */
  effective(who?: Combatant | null): boolean {
    const t = who ?? this.target();
    return !!t && elemMult(this.elem, this.cb.aspect(t)) > 1;
  }
  get charge(): number { return this.src.st.charge ?? 0; }
  /** Spend all Charge. Returns how much there was. */
  spendCharge(): number {
    const n = this.charge;
    if (!this.rec && n) {
      delete this.src.st.charge;
      this.cb.emit({ t: 'text', who: this.cb.whoKey(this.src), s: `Discharge ${n}` });
      if (this.src.st.fury) for (const f of this.foes) this.cb.hit(this.src, f, n, false);
      if (this.src.st.capacitor9) this.cb.gainBlock(this.src, this.src.st.capacitor9 * n);
      if (n >= 5 && this.isPlayer && this.cb.hasRelic('storm_bottle')) this.cb.drawCards(2);
    }
    return n;
  }
  /** Your companions act now (Rally). */
  rally(): void {
    this.custom('Rally', () => {
      for (const k of ['bear', 'wolf', 'hawk', 'serpent']) {
        const n = this.src.st[k];
        const sd = STATUSES[k];
        if (!n) continue;
        sd.onTurnStart?.(this.cb, this.src, n, 0);
        sd.onTurnEnd?.(this.cb, this.src, n, 0);
      }
    });
  }
  /** Counters you played this turn. */
  get countersThisTurn(): number { return this.cb.s.once[`ctr${this.cb.s.turn}`] ?? 0; }
  get verdict(): number { return this.src.st.verdict ?? 0; }
  spendVerdict(): number {
    const n = this.verdict;
    if (!this.rec && n) { delete this.src.st.verdict; this.cb.emit({ t: 'text', who: this.cb.whoKey(this.src), s: `Judgment ${n}` }); }
    return n;
  }
  /** Is the target Frozen (or about to thaw)? */
  get frozen(): boolean { return !!this.tgtOrFirst?.st.frozen; }
  get tgtOrFirst(): Combatant | null { return this.target(); }
  /** v0.7: Counters you have played this fight. */
  get countered(): number { return this.cb.s.counters ?? 0; }
  /** v0.7: summon or strengthen a companion (Beastcaller). */
  companion(kind: 'wolf' | 'hawk' | 'bear' | 'serpent', n: number): void { this.apply(kind, n, 'self'); }
  /** v0.7: elemental cards played this turn (all elements). */
  get elementsPlayed(): number { return Object.keys(this.cb.s.elemTurn ?? {}).length; }

  private target(): Combatant | null {
    if (this.tgt && !this.tgt.dead) return this.tgt;
    const f = this.foes;
    return f.length ? f[0] : null;
  }

  dmg(n: number, times = 1): void {
    if (this.rec) {
      const p = this.cb.s.player;
      this.rec.push({ icon: 'atk', n: this.cb.calcDmg(this.src, p, n, this.elem), times });
      return;
    }
    const el = this.elem;
    for (let i = 0; i < times; i++) {
      const t = this.target();
      if (!t || this.src.dead) return;
      this.cb.hit(this.src, t, n, this.kind === 'attack', el);
    }
  }

  dmgAll(n: number, times = 1): void {
    if (this.rec) return this.dmg(n, times);
    const el = this.elem;
    for (let i = 0; i < times; i++) for (const t of this.foes) this.cb.hit(this.src, t, n, this.kind === 'attack', el);
  }

  dmgRandom(n: number, times = 1): void {
    if (this.rec) return this.dmg(n, times);
    for (let i = 0; i < times; i++) {
      const f = this.foes;
      if (!f.length) return;
      this.cb.hit(this.src, this.cb.rng.pick(f), n, this.kind === 'attack', this.elem);
    }
  }

  block(n: number): void {
    if (this.rec) { this.rec.push({ icon: 'block', n }); return; }
    this.cb.gainBlock(this.src, n);
  }

  /** who: 'self' | 'tgt' | 'all' (all foes) */
  apply(status: string, n: number, who: 'self' | 'tgt' | 'all' = 'tgt'): void {
    if (this.rec) {
      const sd = STATUSES[status];
      this.rec.push({ icon: who === 'self' ? (sd?.debuff ? 'debuff' : 'buff') : 'debuff', label: `${sd?.name ?? status} ${n}` });
      return;
    }
    if (who === 'self') this.cb.applyStatus(this.src, this.src, status, n);
    else if (who === 'all') for (const f of this.foes) this.cb.applyStatus(this.src, f, status, n);
    else { const t = this.target(); if (t) this.cb.applyStatus(this.src, t, status, n); }
  }

  status(who: Combatant | null, s: string): number { return who?.st[s] ?? 0; }

  draw(n: number): void { if (!this.rec && this.isPlayer) this.cb.drawCards(n); }
  energy(n: number): void { if (!this.rec && this.isPlayer) this.cb.s.energy += n; }
  /** Bank energy for next turn, ignoring the Flux cap. */
  bank(n: number): void { if (!this.rec && this.isPlayer) this.cb.s.flux += n; }

  heal(n: number): void {
    if (this.rec) { this.rec.push({ icon: 'heal', n }); return; }
    this.cb.heal(this.src, n);
  }

  loseHp(n: number): void { if (!this.rec) this.cb.loseHp(this.src, n); }

  negate(): void {
    if (this.rec) { this.rec.push({ icon: 'special', label: 'Negate' }); return; }
    const t = this.trigger;
    if (t && !t.negated) {
      t.negated = true;
      if (this.isPlayer) { this.cb.s.stats.negates = (this.cb.s.stats.negates ?? 0) + 1; this.cb.addStyle(30); if ((this.cb.s.player.st.verdict !== undefined || this.cb.run.character === 'arbiter') && !(this.card && CARDS[this.card.id].type === 'counter')) this.cb.applyStatus(this.src, this.src, 'verdict', 1); }
      this.cb.emit({ t: 'negate', s: t.name });
      this.cb.log(`${this.src.name} negates ${t.name}!`);
      if (this.isPlayer) this.cb.relicHook('negate');
    }
  }

  /** Destroy up to n face-down cards the opponent has set. */
  disrupt(n: number): void {
    if (this.rec) { this.rec.push({ icon: 'special', label: `Disrupt ${n}` }); return; }
    let left = n;
    for (const f of this.cb.foesOf(this.src)) {
      while (left > 0 && f.traps.length) {
        const t = f.traps.shift()!;
        this.cb.log(`${this.src.name} destroys ${f.kind === 'player' ? CARDS[t.id].name : 'a face-down trap'}.`);
        this.cb.emit({ t: 'text', who: this.cb.whoKey(f), s: 'Disrupted!' });
        this.cb.retire(t, f);
        left--;
      }
    }
  }

  /** Destroy your own oldest set reaction as a cost. Returns whether one was sacrificed. */
  sacrifice(): boolean {
    if (this.rec) return this.src.traps.length > 0;
    return this.cb.sacrifice(this.src);
  }

  sacrificeAll(): number {
    let n = 0;
    while (!this.rec && this.cb.sacrifice(this.src)) n++;
    return n;
  }

  addCard(id: string, pile: 'hand' | 'draw' | 'discard', cost0 = false): void {
    if (this.rec || !this.isPlayer) return;
    this.cb.addCard(id, pile, cost0);
  }

  /** Put a card into the opponent's discard pile (curses from enemies). */
  giveCard(id: string): void {
    if (this.rec) { this.rec.push({ icon: 'debuff', label: `Add ${CARDS[id].name}` }); return; }
    if (this.isPlayer) return;
    this.cb.addCard(id, 'discard', false);
  }

  exhaustRandomHand(): boolean {
    if (this.rec || !this.isPlayer) return false;
    const h = this.cb.s.hand;
    if (!h.length) return false;
    const c = h.splice(this.cb.rng.int(0, h.length - 1), 1)[0];
    this.cb.exhaust(c);
    return true;
  }

  // ── Gilt: the Fate Coin and Ante ──
  /** True when your Fate Coin shows ☀ Sun (or both faces, with The House Always Wins). */
  get sun(): boolean { return (this.src.coin ?? 0) === 0 || !!this.src.st.house; }
  get moon(): boolean { return (this.src.coin ?? 0) === 1 || !!this.src.st.house; }
  get ante(): number { return this.src.st.ante ?? 0; }
  flip(): void {
    if (this.rec) { this.rec.push({ icon: 'special', label: 'Flip' }); return; }
    this.cb.flip(this.src);
  }
  raiseAnte(n: number): void {
    if (this.rec) { this.rec.push({ icon: 'buff', label: `Ante +${n}` }); return; }
    this.cb.raiseAnte(this.src, n);
  }
  /** Spend all Ante. Returns how much there was. */
  cashAnte(): number {
    const n = this.ante;
    if (!this.rec && n) { delete this.src.st.ante; this.cb.emit({ t: 'text', who: this.cb.whoKey(this.src), s: `Cash in ${n}` }); }
    return n;
  }
  /** Run gold (player only). */
  gold(n: number): void {
    if (this.rec || !this.isPlayer) return;
    this.cb.run.gold += n;
    this.cb.run.stats.goldEarned += n;
    this.cb.emit({ t: 'text', who: 'p', s: `+${n} gold` });
  }

  custom(label: string, fn: () => void): void {
    if (this.rec) { this.rec.push({ icon: 'special', label }); return; }
    fn();
  }

  /** Play a card's effect as this ctx's source (the Mirror Knight replays your cards at you). */
  playAs(id: string, up = false): void {
    const d = CARDS[id];
    if (!d?.play || d.noMimic) return;
    if (this.rec) { this.rec.push({ icon: d.type === 'attack' ? 'atk' : 'special', label: d.name }); return; }
    d.play(new Ctx(this.cb, this.src, this.tgt, d.type === 'attack' ? 'attack' : 'skill', this.chain, this.idx), vals({ id, up }));
  }

  // ── v0.4: Glass (the Magpie) ──
  /** Steal up to n face-down cards the opponent has set. Returns how many were taken. */
  steal(n: number): number {
    if (this.rec) { this.rec.push({ icon: 'special', label: `Steal ${n}` }); return 0; }
    return this.cb.steal(this.src, n);
  }

  /** Glints in your hand. */
  get glints(): number { return this.isPlayer ? this.cb.s.hand.filter((c) => c.id === 'glint').length : 0; }
  /** Enemy traps you have stolen and set. */
  get stolenSet(): number { return this.src.traps.filter((t) => CARDS[t.id].faction === 'enemy').length; }

  /** Mimic: repeat the last Attack or Skill you played this turn, for free. */
  mimic(): boolean {
    if (this.rec) { this.rec.push({ icon: 'special', label: 'Mimic' }); return false; }
    const lp = this.cb.s.lastPlay;
    if (!this.isPlayer || !lp || lp.turn !== this.cb.s.turn) return false;
    const d = CARDS[lp.id];
    if (!d?.play || d.noMimic) return false;
    let tgt = lp.tgt !== undefined ? this.cb.s.enemies[lp.tgt] ?? null : null;
    if (!tgt || tgt.dead) tgt = this.cb.alive()[0] ?? null;
    this.cb.s.stats.mimics = (this.cb.s.stats.mimics ?? 0) + 1;
    this.cb.emit({ t: 'text', who: 'p', s: `Mimic: ${d.name}` });
    this.cb.log(`You mimic ${d.name}.`);
    d.play(new Ctx(this.cb, this.src, tgt, d.type === 'attack' ? 'attack' : 'skill', this.chain, this.idx), vals({ id: lp.id, up: lp.up }));
    return true;
  }

  /** Enemies only: call another enemy into the fight (fills a fallen ally's place first). */
  summon(id: string): void {
    if (this.rec) { this.rec.push({ icon: 'special', label: `Summon ${ENEMIES[id]?.name ?? id}` }); return; }
    if (this.isPlayer) return;
    this.cb.summon(id);
  }

  // ── v0.5: Grave (the Sexton), Prime, Converge, Blot ──
  /** Cards in your Crypt. */
  get crypt(): number { return this.isPlayer ? (this.cb.s.crypt?.length ?? 0) : 0; }
  /** Reactions in your Crypt. */
  get cryptReactions(): number { return this.isPlayer ? (this.cb.s.crypt ?? []).filter((c) => CARDS[c.id].type === 'reaction').length : 0; }
  /** Prime on this Reaction (turns it has stayed set). */
  get prime(): number { return this.card?.prime ?? 0; }
  /** Converge: how many different factions you have played this turn, this card included. */
  get converge(): number {
    if (!this.isPlayer) return 1;
    return (this.cb.s.factionsThisTurn?.length ?? 1) + (this.cb.hasRelic('signpost') ? 1 : 0);
  }
  /** Did you Exhume this turn? */
  get exhumedThisTurn(): boolean { return !!this.cb.s.once[`exh${this.cb.s.turn}`]; }
  /** Bury N: put the top N cards of your draw pile into your Crypt. */
  bury(n: number): number {
    if (this.rec) { this.rec.push({ icon: 'special', label: `Bury ${n}` }); return 0; }
    if (!this.isPlayer) return 0;
    return this.cb.buryTop(n);
  }
  /** Exhume N: set the most recently buried Reactions from your Crypt into free slots (or your hand). */
  exhume(n: number, exclude?: CardInst): number {
    if (this.rec) { this.rec.push({ icon: 'special', label: `Exhume ${n}` }); return 0; }
    if (!this.isPlayer) return 0;
    return this.cb.exhume(n, exclude);
  }
  /** Enemies only: Blot N random cards in your draw pile (they cost 1 more this fight). */
  blot(n: number): void {
    if (this.rec) { this.rec.push({ icon: 'debuff', label: `Blot ${n}` }); return; }
    if (this.isPlayer) return;
    this.cb.blot(n);
  }
  /** Enemies only: exhaust the top N cards of your draw pile. */
  burnPages(n: number): void {
    if (this.rec) { this.rec.push({ icon: 'debuff', label: `Burn ${n} pages` }); return; }
    if (this.isPlayer) return;
    const s = this.cb.s;
    for (let i = 0; i < n; i++) {
      if (!s.draw.length) { if (!s.discard.length) return; s.draw = this.cb.rng.shuffle(s.discard); s.discard = []; }
      const c = s.draw.pop()!;
      this.cb.log(`${this.src.name} burns ${CARDS[c.id].name} from your draw pile.`);
      this.cb.exhaust(c);
    }
    this.cb.emit({ t: 'text', who: 'p', s: `${n} pages burned` });
  }
}

export interface CombatHost {
  run: RunState;
  /** Called when a run-level counter changes (relic once-per-run etc). */
}

export class Combat {
  events: UiEvent[] = [];
  rng: Rng;
  /** v0.7: counter decisions to replay (uids, 0 = pass), and the per-instance counter mode. */
  decisions: number[] | null = null;
  decIdx = 0;
  counterMode: 'ask' | 'auto' | 'off' | null = null;
  /** v0.13: fill chain links with card text and move previews for the player's screen (off in sims). */
  detail = false;

  constructor(public s: CombatState, public run: RunState) {
    this.rng = new Rng(s.rng, 'c');
  }

  // ---------- creation ----------

  static create(run: RunState, encounter: string[], kind: CombatState['kind'], rng: Rng, encName: string): CombatState {
    const ch = CHARACTERS[run.character];
    const player: Combatant = {
      kind: 'player', id: 'player', name: ch.name, hp: run.hp, maxHp: run.maxHp, block: 0, st: {},
      traps: [], slots: 2 + relicMod(run, 'slots') + (run.character === 'hollow' ? 1 : 0) + (run.fate === 'oath' ? 1 : 0), coin: 0,
    };
    const a = run.ascension;
    const enemies: EnemyState[] = encounter.map((id, i) => {
      const d = ENEMIES[id];
      let hp = rng.int(d.hp[0], d.hp[1]);
      if (a >= 2 && kind === 'normal') hp = Math.round(hp * 1.1);
      if (a >= 7 && kind === 'boss') hp = Math.round(hp * 1.1);
      const vh = run.vows?.vow_hp ?? 0;
      if (vh) hp = Math.round(hp * (1 + 0.1 * vh));
      const e: EnemyState = {
        kind: 'enemy', id: `${id}#${i}`, def: id, name: d.name, icon: d.icon, hp, maxHp: hp, block: 0, st: {},
        traps: [], slots: d.slots ?? 2, move: '', lastMoves: [], turn: 0, flags: {},
      };
      if (a >= 3 && kind !== 'normal') e.st.str = 1;
      if (a >= 9) e.st.str = (e.st.str ?? 0) + 1;
      const vs = run.vows?.vow_str ?? 0;
      if (vs) e.st.str = (e.st.str ?? 0) + vs;
      if (run.twist === 'sudden_death') e.st.vuln = 2;
      if (ELEMENTS.on) e.elem = aspectOf(id);
      if (COUNTERS.rebut && !run.tutorial && !run.puzzle) {
        const act = Math.min(3, run.act);
        const rb = kind === 'boss' ? act : kind === 'elite' && (act >= 2 || a >= 2) ? 1 : 0;
        if (rb) e.st.rebut = rb;
      }
      return e;
    });
    const deck = run.deck.map((c) => ({ ...c, tmpCost: undefined }));
    const home = ch.element ?? null;
    return {
      attune: ELEMENTS.on && home ? home : null, elemTurn: {}, counters: 0,
      player, enemies, draw: deck, hand: [], discard: [], exhausted: [], energy: 0, flux: 0, turn: 0,
      phase: 'player', cardsThisTurn: 0, attacksThisTurn: 0,
      rng: { c: rng.int(1, 2 ** 31) }, once: {}, kind, encounter: encName, log: [],
      stats: { chains: 0, maxChain: 0, dmg: 0, negates: 0, startHp: run.hp, style: 0, plays: {}, flips: 0 },
    };
  }

  /** First-time setup for a fresh combat. */
  begin(): void {
    const s = this.s;
    this.rng.shuffle(s.draw);
    // Innate cards go on top.
    s.draw.sort((x, y) => Number(isInnate(x)) - Number(isInnate(y)));
    for (const e of s.enemies) {
      const d = ENEMIES[e.def];
      if (d.ghost) this.setupGhost(e);
      d.start?.(e, this);
    }
    if (this.run.dailyMod === 'trapped') for (const e of s.enemies) if (e.traps.length < e.slots) e.traps.push(this.mkCard('spike_shell'));
    const vt = this.run.vows?.vow_traps ?? 0;
    if (vt) {
      const tier = this.tier('');
      for (const e of s.enemies) {
        const n = vt >= 2 && s.kind !== 'normal' ? 2 : 1;
        for (let i = 0; i < n && e.traps.length < e.slots; i++) e.traps.push(this.mkCard(`${i ? 'snap_jaw' : 'spike_shell'}${tier}`));
      }
    }
    // v0.5: the Venue bends the table for everyone.
    const ven = this.venue();
    if (ven) {
      if (ven.slots) for (const c of [s.player, ...s.enemies]) c.slots = Math.max(1, c.slots + ven.slots);
      if (ven.reveal) s.once.reveal = 1;
      this.log(`Venue: ${ven.name}. ${ven.text}`);
    }
    if (this.run.twist === 'graveyard') s.player.st.grave = 1;
    if (this.run.vows?.vow_ink) this.blot(2 * this.run.vows.vow_ink);
    if (this.run.twist === 'sudden_death') s.player.st.vuln = 2;
    if (this.run.vows?.vow_glass) s.player.st.vuln = (s.player.st.vuln ?? 0) + this.run.vows.vow_glass;
    this.relicHook('combatStart');
    if (this.run.twist === 'thieves' && this.steal(s.player, 1) === 0) this.addCard('glint', 'hand', false);
    if (this.run.bonus?.block) this.gainBlock(s.player, this.run.bonus.block);
    if (s.affix) for (const e of s.enemies) AFFIX_MAP[s.affix]?.apply(e, this);
    this.venueHook('start');
    this.wildsStart();
    for (const e of s.enemies) this.rollMove(e);
    this.startPlayerTurn();
  }

  /** v0.6: the act's Sky, the Long Night's Terrors, temporary boons from events, and a possible mid-fight Surprise. */
  wildsStart(): void {
    const s = this.s, run = this.run, p = s.player;
    if (s.tutorial || run.arena || run.puzzle) return;
    skyOf(run)?.combat?.(this);
    for (const t of run.terrors ?? []) if (run.night && run.act >= 5) TERROR_MAP[t]?.combat?.(this);
    const b = run.buffs ?? {};
    if (b.ballad) p.st.str = (p.st.str ?? 0) + 1;
    if (b.warpaint) p.st.str = (p.st.str ?? 0) + 2;
    if (b.shielded) this.gainBlock(p, 8);
    if (b.wellfed) this.gainBlock(p, 4);
    if (b.blessed) p.st.drawnext = (p.st.drawnext ?? 0) + 2;
    if (b.hexed) p.st.weak = (p.st.weak ?? 0) + 1;
    if (run.fate === 'daredevil' && s.kind !== 'normal') p.st.vuln = (p.st.vuln ?? 0) + 1;
    const sc = SURPRISE_CHANCE * (this.hasRelic('jesters_bell') ? 3 : 1);
    if (WILDS.on && s.kind !== 'boss' && !s.surprise && this.rng.next() < sc) {
      const pool = this.hasRelic('party_popper') ? SURPRISES.filter((x) => x.good > 0) : SURPRISES;
      s.surprise = { id: this.rng.pick(pool).id, turn: this.rng.int(2, 3) };
    }
  }

  /** Fire the Surprise when its turn comes. */
  surpriseCheck(): void {
    const sp = this.s.surprise;
    if (!sp || sp.fired || sp.turn !== this.s.turn || this.over()) return;
    const d = SURPRISE_MAP[sp.id];
    sp.fired = true;
    if (!d) return;
    this.log(`Surprise! ${d.name}: ${d.text}`);
    this.emit({ t: 'text', who: 'p', s: `${d.icon} ${d.name}` });
    d.fn(this);
    if (this.hasRelic('jesters_bell')) this.s.energy += 1;
    if (!this.alive().length && this.s.phase === 'player') { this.s.phase = 'won'; this.log('Victory!'); }
  }

  // ---------- helpers ----------

  emit(e: UiEvent): void { this.events.push(e); }
  flush(): UiEvent[] { const e = this.events; this.events = []; return e; }
  log(msg: string): void { this.s.log.push(msg); if (this.s.log.length > 100) this.s.log.shift(); }
  whoKey(c: Combatant): string { return c.kind === 'player' ? 'p' : String(this.s.enemies.indexOf(c as EnemyState)); }
  alive(): EnemyState[] { return this.s.enemies.filter((e) => !e.dead); }
  foesOf(c: Combatant): Combatant[] { return c.kind === 'player' ? this.alive() : (this.s.player.dead ? [] : [this.s.player]); }
  over(): boolean { return this.s.phase === 'won' || this.s.phase === 'lost'; }

  mkCard(id: string, up = false): CardInst {
    return { uid: this.run.nextUid++, id, up };
  }

  /** v0.11: a context for status hooks that run card effects (the v0.11 powers). */
  ctx(src: Combatant, tgt: Combatant | null): Ctx { return new Ctx(this, src, tgt, 'skill', null, 0); }

  /** v0.11 Evolve: count a play of this copy (it evolves after the fight, if you win). */
  countEvo(c: CardInst): void {
    const e = this.s.stats.evo ?? (this.s.stats.evo = {});
    e[c.uid] = (e[c.uid] ?? 0) + 1;
  }

  hasRelic(id: string): boolean { return this.run.relics.includes(id); }

  /** v0.5: the Venue this fight takes place at. */
  venue(): VenueDef | null { return this.s.venue ? VENUE_MAP[this.s.venue] ?? null : null; }
  venueHook(hook: 'start' | 'turnStart' | 'onChain' | 'enemyDied' | 'reactionLeft', arg?: unknown): void {
    const v = this.venue();
    const fn = v?.[hook] as ((cb: Combat, a?: unknown) => void) | undefined;
    if (fn) fn(this, arg);
  }
  /** An enemy trap id at this act's power tier. */
  tier(id: string): string { const a = Math.min(3, this.run.act); return a <= 1 ? id : `${id}${a}`; }
  /** Crypt rules: the Sexton (and the Graveyard Shift twist) bury Reactions that leave play. */
  cryptOn(): boolean { return !!this.s.player.st.grave; }

  /** Style: a Balatro-ish score for playing the chain with flair. Shown live and added to the run score. */
  addStyle(n: number): void { this.s.stats.style = (this.s.stats.style ?? 0) + n * (this.venue()?.style ?? 1); }

  flip(who: Combatant): void {
    who.coin = (who.coin ?? 0) ? 0 : 1;
    this.emit({ t: 'text', who: this.whoKey(who), s: who.coin ? '☾ Moon' : '☀ Sun' });
    if (who.kind === 'player') {
      this.s.stats.flips = (this.s.stats.flips ?? 0) + 1;
      if (this.hasRelic('loaded_coin')) this.raiseAnte(who, 1);
    }
    if (who.st.edge) this.gainBlock(who, who.st.edge);
    if (who.st.loaded) { const f = this.foesOf(who); if (f.length) this.hit(who, this.rng.pick(f), who.st.loaded, false); }
  }

  raiseAnte(who: Combatant, n: number): void {
    if (n <= 0 || who.dead) return;
    this.applyStatus(who, who, 'ante', n);
    if (who.st.midas) this.gainBlock(who, n * who.st.midas);
  }

  relicHook(hook: string, ...args: unknown[]): void {
    for (const r of this.run.relics) {
      const fn = (RELICS[r] as unknown as Record<string, unknown>)[hook];
      if (typeof fn === 'function') (fn as (cb: Combat, ...a: unknown[]) => void)(this, ...args);
    }
  }

  statusHook(who: Combatant, hook: 'onTurnStart' | 'onTurnEnd' | 'onChain' | 'onSacrifice' | 'onExhaust' | 'onCounter' | 'onReactFire', arg?: number): void {
    for (const [k, n] of Object.entries({ ...who.st })) {
      const d = STATUSES[k];
      const fn = d?.[hook];
      if (fn && n) fn(this, who, n, arg ?? 0);
      if (who.dead || this.over()) return;
    }
  }

  cost(c: CardInst): number {
    const d = CARDS[c.id];
    if (c.tmpCost !== undefined) return c.tmpCost;
    let cost = printedCost(d, c);
    if (c.mod === 'swift') cost -= 1;
    if (c.blot && !this.hasRelic('ink_blotter')) cost += 1;
    if (d.type === 'reaction') cost -= this.s.player.st.flow ?? 0;
    if (d.type === 'reaction' && this.hasRelic('cracked_hourglass')) cost += 1;
    if (d.type === 'reaction' && this.s.once[`lowtide${this.s.turn}`]) cost = 0;
    if (d.type === 'reaction' && this.hasRelic('masquerade_mask') && !this.s.once[`mask${this.s.turn}`]) cost = 0;
    if (d.type === 'counter') {
      cost -= this.s.player.st.quickdraw ?? 0;
      if (this.hasRelic('scales_of_dawn') && !this.s.once[`scales${this.s.turn}`]) cost = 0;
    }
    return Math.max(0, cost);
  }

  fluxCap(): number {
    if (this.hasRelic('ember_heart')) return 0;
    return 1 + relicMod(this.run, 'fluxCap') + (this.run.dailyMod === 'flux' ? 1 : 0) + (this.venue()?.flux ?? 0);
  }

  // ---------- damage & statuses ----------

  /** v0.7: a combatant's element (enemy Aspect, or your Attunement). The Reflection takes your Attunement. */
  aspect(c: Combatant): Element | null {
    if (!ELEMENTS.on) return null;
    if (c.kind === 'player') return this.s.attune ?? null;
    const e = c as EnemyState;
    if (e.def === 'reflection') return this.s.attune ?? null;
    return e.elem ?? null;
  }

  attuneTo(e: Element | null): void {
    if (!ELEMENTS.on || !e || this.s.attune === e) return;
    this.s.attune = e;
    this.emit({ t: 'text', who: 'p', s: `${ELEMENT_MAP[e].icon} ${ELEMENT_MAP[e].name}` });
  }

  calcDmg(src: Combatant, tgt: Combatant, base: number, elem?: Element | null): number {
    // v0.8: base difficulty scales the enemy's printed damage (src/data/difficulty.ts).
    if (src.kind === 'enemy' && base > 0 && !this.run.arena && !this.run.puzzle && !this.s.tutorial) base = Math.round(base * diffDmg(this.run.act, this.s.kind === 'elite' || this.s.kind === 'boss' ? this.s.kind : 'normal'));
    let n = base + (src.st.str ?? 0) + (this.venue()?.dmg ?? 0);
    if (src.kind === 'player') n += relicMod(this.run, 'dmgOut');
    if (src.kind === 'player' && tgt.st.mark) n += tgt.st.mark;
    if (elem) n = Math.floor(n * elemMult(elem, this.aspect(tgt)));
    if (src.kind === 'player' && tgt.st.frozen && this.hasRelic('rime_heart')) n = Math.floor(n * 1.5);
    if (src.st.weak) n = Math.floor(n * 0.75);
    if (tgt.st.vuln) n = Math.floor(n * (tgt.kind === 'enemy' && this.hasRelic('cracked_lens') ? EXPOSED_LENS : EXPOSED));
    return Math.max(0, n);
  }

  /** Card/move damage: modified by Strength, Weak and Vulnerable; triggers Thorns on attacks. */
  hit(src: Combatant, tgt: Combatant, base: number, isAttack: boolean, elem?: Element | null): number {
    if (tgt.dead) return 0;
    // v0.7 Veil: an attack hit against a Veiled target misses.
    if (isAttack && tgt.st.veil && src !== tgt) {
      tgt.st.veil--;
      if (tgt.st.veil <= 0) delete tgt.st.veil;
      this.emit({ t: 'text', who: this.whoKey(tgt), s: 'Miss!' });
      if (tgt.st.umbra && !src.dead) this.hit(tgt, src, tgt.st.umbra, false);
      return 0;
    }
    const n = this.calcDmg(src, tgt, base, elem);
    if (elem && (src.kind === 'player' || tgt.kind === 'player')) {
      const m = elemMult(elem, this.aspect(tgt));
      if (m !== 1) this.emit({ t: 'elem', who: this.whoKey(tgt), s: m > 1 ? 'Effective!' : 'Resisted', n: m > 1 ? 1 : -1 });
    }
    let lost = this.rawDamage(tgt, n);
    if (isAttack && tgt.st.shock && !tgt.dead) {
      const sh = tgt.st.shock;
      tgt.st.shock = Math.floor(sh / 2);
      if (!tgt.st.shock) delete tgt.st.shock;
      this.emit({ t: 'text', who: this.whoKey(tgt), s: `⚡ ${sh}` });
      lost += this.rawDamage(tgt, sh);
    }
    if (src.kind === 'player') { this.s.stats.dmg += lost; if (n > (this.s.stats.bigHit ?? 0)) this.s.stats.bigHit = n; }
    if (isAttack && src.st.frostbrand && tgt !== src) this.applyStatus(src, tgt, 'chill', src.st.frostbrand);
    if (isAttack && tgt.st.thorns && !src.dead && src !== tgt) this.rawDamage(src, tgt.st.thorns);
    return lost;
  }

  /** Damage that ignores modifiers but is absorbed by Block. */
  rawDamage(tgt: Combatant, n: number): number {
    if (tgt.dead || n <= 0) return 0;
    const absorbed = Math.min(tgt.block, n);
    tgt.block -= absorbed;
    const lost = this.thimble(tgt, n - absorbed);
    if (absorbed) this.emit({ t: 'block', who: this.whoKey(tgt), n: -absorbed });
    if (lost > 0) {
      tgt.hp -= lost;
      this.emit({ t: 'dmg', who: this.whoKey(tgt), n: lost });
      this.checkDeath(tgt);
    }
    return lost;
  }

  /** Silver Thimble: the first HP loss each combat is only 1. */
  thimble(tgt: Combatant, n: number): number {
    if (n > 1 && tgt.kind === 'player' && !this.s.once.thimble && this.hasRelic('thimble')) {
      this.s.once.thimble = 1;
      this.emit({ t: 'text', who: 'p', s: 'Thimble!' });
      return 1;
    }
    return n;
  }

  loseHp(tgt: Combatant, n: number): void {
    if (tgt.dead || n <= 0) return;
    n = this.thimble(tgt, n);
    tgt.hp -= n;
    this.emit({ t: 'dmg', who: this.whoKey(tgt), n });
    this.checkDeath(tgt);
  }

  heal(tgt: Combatant, n: number): void {
    if (tgt.dead) return;
    const h = Math.min(n, tgt.maxHp - tgt.hp);
    if (h > 0) { tgt.hp += h; this.emit({ t: 'heal', who: this.whoKey(tgt), n: h }); }
  }

  gainBlock(tgt: Combatant, n: number): void {
    if (tgt.dead || n <= 0) return;
    tgt.block += n;
    this.emit({ t: 'block', who: this.whoKey(tgt), n });
  }

  applyStatus(src: Combatant, tgt: Combatant, s: string, n: number): void {
    if (tgt.dead || !n) return;
    if (s === 'burn' && src.st.crown) n += src.st.crown;
    if (s === 'str' && n > 0 && this.venue()?.noStr) return;
    // v0.5: the Reflection's Doom against you is halved (a mirrored Doom deck was unwinnable).
    if (s === 'doom' && tgt.kind === 'player' && (src as EnemyState).def === 'reflection') n = Math.ceil(n / 2);
    if (s === 'shock' && n > 0 && src.st.conductor) n += src.st.conductor;
    tgt.st[s] = (tgt.st[s] ?? 0) + n;
    if (tgt.st[s] <= 0 && s !== 'str') delete tgt.st[s];
    const sd = STATUSES[s];
    this.emit({ t: 'status', who: this.whoKey(tgt), s: `${n > 0 ? '+' : ''}${n} ${sd?.name ?? s}` });
    if (s === 'chill' && n > 0) this.checkFreeze(tgt);
    if (s === 'verdict' && n > 0 && tgt.st.judge) {
      const f = this.foesOf(tgt);
      if (f.length) this.hit(tgt, this.rng.pick(f), tgt.st.judge, false);
    }
  }

  /** v0.7: Chill turns into Freeze at its Freeze point. */
  freezeAt(c: Combatant): number {
    if (c.kind === 'player') return 5;
    const e = c as EnemyState;
    const base = this.s.kind === 'boss' ? 12 : this.s.kind === 'elite' ? 8 : 5;
    return base + 3 * (e.flags.freezes ?? 0);
  }

  checkFreeze(c: Combatant): void {
    if (c.dead || (c.st.chill ?? 0) < this.freezeAt(c)) return;
    delete c.st.chill;
    c.st.frozen = 1;
    if (c.kind === 'enemy') (c as EnemyState).flags.freezes = ((c as EnemyState).flags.freezes ?? 0) + 1;
    this.emit({ t: 'text', who: this.whoKey(c), s: 'FROZEN' });
    this.log(`${c.name} freezes solid.`);
    if (c.kind === 'enemy') {
      const p = this.s.player;
      this.run.stats.freezes = (this.run.stats.freezes ?? 0) + 1;
      if (p.st.permafrost) { this.gainBlock(p, p.st.permafrost); this.drawCards(1); }
      if (p.st.shatter9) for (const f of this.alive()) this.hit(p, f, p.st.shatter9, false);
      this.relicHook('freeze');
      this.addStyle(25);
    }
  }

  checkDeath(c: Combatant): void {
    if (c.hp > 0 || c.dead) return;
    if (c.kind === 'player' && this.hasRelic('phoenix_feather') && !this.run.relicCounters.phoenix_feather) {
      this.run.relicCounters.phoenix_feather = 1;
      c.hp = Math.round(c.maxHp * 0.3);
      this.emit({ t: 'text', who: 'p', s: 'Phoenix Feather!' });
      this.log('The Phoenix Feather burns away. You rise again.');
      return;
    }
    // v0.6: some enemies (the Ash Phoenix) rise once from their ashes.
    const rv = c.kind === 'enemy' ? ENEMIES[(c as EnemyState).def]?.revive : 0;
    if (rv && !(c as EnemyState).flags.reborn) {
      (c as EnemyState).flags.reborn = 1;
      c.hp = Math.max(1, Math.round(c.maxHp * rv));
      for (const k of Object.keys(c.st)) if (STATUSES[k]?.debuff) delete c.st[k];
      this.emit({ t: 'text', who: this.whoKey(c), s: 'Reborn!' });
      this.log(`${c.name} rises from its ashes!`);
      return;
    }
    c.hp = 0;
    c.dead = true;
    for (const t of c.traps) if (c.kind === 'enemy') this.retire(t, c);
    c.traps = [];
    this.emit({ t: 'death', who: this.whoKey(c) });
    if (c.kind === 'player') {
      this.s.phase = 'lost';
      this.log('You fall.');
    } else {
      this.log(`${c.name} is defeated.`);
      this.addStyle(20 + (this.s.kind === 'boss' ? 100 : this.s.kind === 'elite' ? 40 : 0));
      const k = this.run.stats.kills ?? (this.run.stats.kills = {});
      const def = (c as EnemyState).def;
      if (def) k[def] = (k[def] ?? 0) + 1;
      if (def) ENEMIES[def]?.onDeath?.(c as EnemyState, this);
      this.relicHook('enemyDied', c);
      this.venueHook('enemyDied', c);
      if (!this.alive().length) { this.s.phase = 'won'; this.log('Victory!'); }
    }
  }

  /** v0.6: a rare monster runs away. It counts as gone (the fight can end) but drops nothing. */
  flee(e: EnemyState): void {
    if (e.dead || this.over()) return;
    e.dead = true;
    e.flags.fled = 1;
    delete e.st.flee;
    for (const t of e.traps) this.retire(t, e);
    e.traps = [];
    this.emit({ t: 'text', who: this.whoKey(e), s: 'Fled!' });
    this.log(`${e.name} gets away!`);
    if (!this.alive().length) { this.s.phase = 'won'; this.log('The fight is over.'); }
  }

  // ---------- piles ----------

  drawCards(n: number): void {
    const s = this.s;
    for (let i = 0; i < n; i++) {
      if (s.hand.length >= HAND_LIMIT) return;
      if (!s.draw.length) {
        if (!s.discard.length) return;
        s.draw = this.rng.shuffle(s.discard);
        s.discard = [];
      }
      s.hand.push(s.draw.pop()!);
    }
  }

  addCard(id: string, pile: 'hand' | 'draw' | 'discard', cost0: boolean): void {
    const c = this.mkCard(id);
    if (cost0) c.tmpCost = 0;
    if (pile === 'hand' && this.s.hand.length < HAND_LIMIT) this.s.hand.push(c);
    else if (pile === 'draw') this.s.draw.splice(this.rng.int(0, this.s.draw.length), 0, c);
    else this.s.discard.push(c);
  }

  exhaust(c: CardInst): void {
    c.tmpCost = undefined;
    this.s.exhausted.push(c);
    this.statusHook(this.s.player, 'onExhaust');
  }

  /**
   * A set card leaves play. Player cards go to the player's discard (even ones an enemy stole);
   * enemy traps the player stole simply vanish; Echo cards go back into the ghost's deck.
   */
  retire(card: CardInst, from: Combatant): void {
    card.tmpCost = undefined;
    delete card.prime;
    if (!from.dead) this.venueHook('reactionLeft', from);
    if (CARDS[card.id].faction === 'enemy') return;
    if (from.kind === 'player') {
      if (card.mod === 'haunted') this.gainBlock(from, 5);
      if (this.cryptOn()) this.bury(card); else this.s.discard.push(card);
      return;
    }
    if (card.stolen) { delete card.stolen; this.s.discard.push(card); return; }
    const g = (from as EnemyState).ghost;
    if (g) g.draw.unshift(card);
  }

  // ---------- v0.5: the Crypt ----------

  /** A card enters your Crypt. Haunt effects fire. */
  bury(card: CardInst): void {
    card.tmpCost = undefined;
    delete card.prime;
    (this.s.crypt ??= []).push(card);
    this.s.stats.buried = (this.s.stats.buried ?? 0) + 1;
    const d = CARDS[card.id];
    if (d.haunt && !this.over()) {
      this.emit({ t: 'text', who: 'p', s: `Haunt: ${d.name}` });
      d.haunt(new Ctx(this, this.s.player, this.alive()[0] ?? null, 'skill', null, 0, card), vals(card));
    }
    if (this.s.player.st.pallbearer) this.gainBlock(this.s.player, this.s.player.st.pallbearer);
    if (this.s.player.st.wake9 && !this.over()) { const f = this.alive(); if (f.length) this.hit(this.s.player, this.rng.pick(f), this.s.player.st.wake9, false); }
    this.relicHook('buried');
  }

  /** Bury the top n cards of the draw pile. */
  buryTop(n: number): number {
    const s = this.s;
    let k = 0;
    for (; k < n; k++) {
      if (!s.draw.length) { if (!s.discard.length) break; s.draw = this.rng.shuffle(s.discard); s.discard = []; }
      const c = s.draw.pop()!;
      this.log(`You bury ${CARDS[c.id].name}.`);
      this.bury(c);
      if (this.over()) break;
    }
    return k;
  }

  /** Set the most recently buried Reactions back into free slots; with no free slot they go to your hand. */
  exhume(n: number, exclude?: CardInst): number {
    const s = this.s;
    const crypt = s.crypt ?? [];
    const p = s.player;
    let k = 0;
    for (let i = crypt.length - 1; i >= 0 && k < n; i--) {
      const c = crypt[i];
      if (c === exclude || CARDS[c.id].type !== 'reaction') continue;
      crypt.splice(i, 1);
      k++;
      if (p.traps.length < p.slots) { p.traps.push(c); this.log(`You exhume ${CARDS[c.id].name} into a slot.`); }
      else if (s.hand.length < HAND_LIMIT) { s.hand.push(c); this.log(`You exhume ${CARDS[c.id].name} to your hand.`); }
      else s.discard.push(c);
      this.emit({ t: 'text', who: 'p', s: `Exhume: ${CARDS[c.id].name}` });
      this.s.stats.exhumes = (this.s.stats.exhumes ?? 0) + 1;
      this.addStyle(10);
      if (p.st.danse) for (const e of this.alive()) this.hit(p, e, p.st.danse, false);
      if (p.st.cryptward) this.gainBlock(p, p.st.cryptward);
      this.relicHook('exhumed');
      if (this.over()) break;
    }
    if (k) s.once[`exh${s.turn}`] = 1;
    return k;
  }

  /** Blot: random cards in the draw pile (or discard) cost 1 more for the rest of the fight. */
  blot(n: number): void {
    const s = this.s;
    if (this.hasRelic('ink_blotter')) { this.gainBlock(s.player, 3 * n); this.emit({ t: 'text', who: 'p', s: 'Blotter!' }); return; }
    for (let i = 0; i < n; i++) {
      let pool = s.draw.filter((c) => !c.blot && !CARDS[c.id].unplayable);
      if (!pool.length) pool = s.discard.filter((c) => !c.blot && !CARDS[c.id].unplayable);
      if (!pool.length) return;
      const c = this.rng.pick(pool);
      c.blot = true;
      this.log(`${CARDS[c.id].name} is Blotted: it costs 1 more this fight.`);
    }
    this.emit({ t: 'text', who: 'p', s: `🖋 Blot ${n}` });
  }

  /** Take up to n of the opponents' face-down cards into the thief's own slots. */
  steal(thief: Combatant, n: number): number {
    let k = 0;
    for (const f of this.foesOf(thief)) {
      while (k < n && f.traps.length) {
        const t = f.traps.shift()!;
        k++;
        this.emit({ t: 'text', who: this.whoKey(f), s: 'Stolen!' });
        if (thief.kind === 'player') {
          this.log(`You steal ${CARDS[t.id].name}${CARDS[t.id].faction === 'enemy' ? '' : ' back'}.`);
          if (t.stolen) { delete t.stolen; }
          if (thief.traps.length < thief.slots) thief.traps.push(t);
          else if (CARDS[t.id].faction === 'enemy') this.addCard('glint', 'hand', false);
          else this.s.discard.push(t);
          this.s.stats.steals = (this.s.stats.steals ?? 0) + 1;
          this.addStyle(15);
          this.relicHook('steal');
          if (thief.st.klepto) { this.drawCards(1); this.gainBlock(thief, thief.st.klepto); }
        } else {
          this.log(`${thief.name} steals your ${CARDS[t.id].name}!`);
          t.stolen = true;
          if (thief.traps.length < thief.slots) thief.traps.push(t);
          else { delete t.stolen; this.s.discard.push(t); }
        }
      }
    }
    return k;
  }

  /** Bring a new enemy into the fight. A fallen enemy's place is reused so indexes stay stable. Max 3 alive. */
  summon(id: string): EnemyState | null {
    const d = ENEMIES[id];
    if (!d || this.alive().length >= 3 || this.over()) return null;
    let hp = this.rng.int(d.hp[0], d.hp[1]);
    const vh = this.run.vows?.vow_hp ?? 0;
    if (vh) hp = Math.round(hp * (1 + 0.1 * vh));
    const slot = this.s.enemies.findIndex((e) => e.dead);
    const idx = slot >= 0 ? slot : this.s.enemies.length;
    const e: EnemyState = {
      kind: 'enemy', id: `${id}#${idx}s${this.s.turn}`, def: id, name: d.name, icon: d.icon, hp, maxHp: hp, block: 0, st: {},
      traps: [], slots: d.slots ?? 2, move: '', lastMoves: [], turn: this.s.turn, flags: { sleep: 1 },
    };
    if (this.run.vows?.vow_str) e.st.str = this.run.vows.vow_str;
    if (slot >= 0) this.s.enemies[slot] = e; else this.s.enemies.push(e);
    d.start?.(e, this);
    this.rollMove(e);
    this.emit({ t: 'text', who: String(idx), s: 'Summoned!' });
    this.log(`${d.name} joins the fight.`);
    return e;
  }

  /** Coiled Spring and friends: a little damage to a random enemy. */
  coil(n: number): void {
    const f = this.alive();
    if (f.length) this.hit(this.s.player, this.rng.pick(f), n, false);
  }

  sacrifice(owner: Combatant): boolean {
    const t = owner.traps.shift();
    if (!t) return false;
    this.log(`${owner.name} sacrifices ${owner.kind === 'player' ? CARDS[t.id].name : 'a trap'}.`);
    this.emit({ t: 'text', who: this.whoKey(owner), s: 'Sacrifice' });
    if (owner.kind === 'player') {
      this.retire(t, owner);
      this.relicHook('sacrifice');
      this.relicHook('reactionLeft');
    }
    this.statusHook(owner, 'onSacrifice');
    return true;
  }

  // ---------- the chain ----------

  /**
   * Declare an action. Opponents' face-down cards that match its kind respond, each response
   * can itself be answered, up to MAX_CHAIN links. Then the chain resolves last-in, first-out,
   * so a trap that answers your attack happens *before* your attack lands.
   */
  perform(src: Combatant, kind: ActionKind, name: string, card: CardInst | undefined, tgt: Combatant | null, run: (c: Ctx) => void): Link[] {
    const chain: Link[] = [{ src, tgt, kind, name, card, negated: false, run }];
    const cap = this.maxChain();
    let lim = cap;
    for (;;) {
      while (chain.length < lim) {
        const last = chain[chain.length - 1];
        const resp = this.findResponder(last);
        if (!resp) break;
        const [owner, i] = resp;
        const trap = owner.traps.splice(i, 1)[0];
        const d = CARDS[trap.id];
        if (owner.kind === 'player' && trap.prime) this.s.stats.primeMax = Math.max(this.s.stats.primeMax ?? 0, trap.prime);
        const v = vals(trap);
        chain.push({ src: owner, tgt: last.src, kind: 'reaction', name: d.name, card: trap, negated: false, run: (c) => d.react!(c, v) });
      }
      // v0.7 counter-chains: when the chain would end on an enemy link, you may answer it from your hand.
      if (chain.length >= cap + OVERCHAIN || this.over()) break;
      const last = chain[chain.length - 1];
      if (last.src.kind === 'player') {
        // An enemy with a Rebuttal answers a Counter you played from hand. You may counter that, too.
        if (!last.counter || !last.card) break;
        const reb = this.rebutter(last);
        if (!reb) break;
        reb.st.rebut--;
        if (reb.st.rebut <= 0) delete reb.st.rebut;
        chain.push({ src: reb, tgt: last.src, kind: 'reaction', name: 'Rebuttal', negated: false, counter: true, run: (c) => c.negate() });
        this.log(`${reb.name} rebuts your ${last.name}!`);
        lim = cap + OVERCHAIN;
        continue;
      }
      const pick = this.counterWindow(chain);
      if (!pick) break;
      const p = this.s.player;
      if (pick < 0) {
        // v0.14: an Omen turned over as an answer. Free, and it can itself be answered by a ⟲ trap.
        const belt = this.run.omens ?? [];
        const oid = belt[-pick - 1];
        const od = oid ? OMENS[oid] : null;
        if (!od?.combat) break;
        belt.splice(-pick - 1, 1);
        this.run.stats.omensUsed = (this.run.stats.omensUsed ?? 0) + 1;
        chain.push({ src: p, tgt: last.src, kind: 'reaction', name: od.name, negated: false, omen: oid, run: (c) => od.combat!(this, c) });
        this.log(`You answer ${last.name} with ${od.name}.`);
        this.emit({ t: 'text', who: 'p', s: `${od.icon} ${od.name}` });
        this.addStyle(15);
        lim = cap + OVERCHAIN;
        continue;
      }
      const hi = this.s.hand.findIndex((c) => c.uid === pick);
      if (hi < 0) break;
      const cc = this.s.hand[hi];
      const cd = CARDS[cc.id];
      const cost = this.cost(cc);
      if (this.s.phase === 'player') this.s.energy -= cost; else this.s.flux -= cost;
      if (this.hasRelic('scales_of_dawn')) this.s.once[`scales${this.s.turn}`] = 1;
      this.s.hand.splice(hi, 1);
      const cv = vals(cc);
      this.attuneTo(liveElement(cd, this.s.attune));
      chain.push({ src: p, tgt: last.src, kind: 'reaction', name: cd.name, card: cc, negated: false, counter: true, run: (c) => {
        cd.react?.(c, cv);
        if (p.st.riposte && c.trigger) this.hit(p, c.trigger.src, p.st.riposte, false);
      } });
      this.s.counters = (this.s.counters ?? 0) + 1;
      if (cd.evolve) this.countEvo(cc);
      this.s.once[`ctr${this.s.turn}`] = (this.s.once[`ctr${this.s.turn}`] ?? 0) + 1;
      this.run.stats.counters = (this.run.stats.counters ?? 0) + 1;
      const plays = this.s.stats.plays ?? (this.s.stats.plays = {});
      plays[cc.id] = (plays[cc.id] ?? 0) + 1;
      this.log(`You counter ${last.name} with ${cd.name}!`);
      this.emit({ t: 'text', who: 'p', s: `↯ ${cd.name}` });
      if (p.st.sanctum) this.gainBlock(p, p.st.sanctum);
      this.statusHook(p, 'onCounter');
      if (this.run.character === 'arbiter' || p.st.verdict !== undefined) this.applyStatus(p, p, 'verdict', 1);
      this.addStyle(25);
      this.relicHook('counter');
      lim = cap + OVERCHAIN;
    }
    // v0.13: describe the links before they resolve, so the recap shows what each one was about to do.
    const views = this.detail && chain.length > 1 ? chain.map((_, i) => this.linkView(chain, i)) : null;
    for (let i = chain.length - 1; i >= 0; i--) {
      const l = chain[i];
      if (this.over()) break;
      if (l.negated || l.src.dead) continue;
      l.run(new Ctx(this, l.src, l.tgt, l.kind, chain, i, l.card));
    }
    // Reactions that left play.
    for (let i = 1; i < chain.length; i++) {
      const l = chain[i];
      if (l.counter && l.src.kind === 'player' && l.card) {
        // A Counter played from hand goes to the discard pile like any played card.
        const cd = CARDS[l.card.id];
        l.card.tmpCost = undefined;
        if (this.s.once[`boomerang${l.card.uid}`] && this.s.hand.length < HAND_LIMIT) { delete this.s.once[`boomerang${l.card.uid}`]; this.s.hand.push(l.card); }
        else if (exhaustsCopy(cd, l.card)) this.exhaust(l.card); else this.s.discard.push(l.card);
        continue;
      }
      if (l.src.kind === 'player' && l.card) {
        if (!l.negated) { this.relicHook('reactionFired'); this.statusHook(l.src, 'onReactFire'); if (l.src.st.coil) this.coil(l.src.st.coil); if (l.src.st.throne) this.coil((this.s.crypt?.length ?? 0) + l.src.st.throne); }
        // The Gilded Nest: stolen traps go back into their slot after they fire.
        if (CARDS[l.card.id].faction === 'enemy' && l.src.st.nest && !l.negated && l.src.traps.length < l.src.slots && !l.src.dead) l.src.traps.push(l.card);
        else this.retire(l.card, l.src);
        this.relicHook('reactionLeft');
      } else if (l.card) this.retire(l.card, l.src);
    }
    if (chain.length > 1) {
      this.s.stats.chains++;
      this.addStyle(10 * chain.length * chain.length);
      if (this.run.twist === 'chainmail' && chain.length >= 3) this.heal(this.s.player, 2);
      this.s.stats.maxChain = Math.max(this.s.stats.maxChain, chain.length);
      this.emit({ t: 'chain', links: chain.map((l, i) => (views ? { ...views[i], negated: l.negated } : this.linkView(chain, i))) });
      if (!this.over()) {
        for (const l of chain.slice(1)) {
          if (l.src.kind !== 'enemy') continue;
          this.relicHook('enemyTrap');
          const e = l.src as EnemyState;
          if (!l.negated && !e.dead) ENEMIES[e.def].onTrapFired?.(e, this);
        }
        this.relicHook('chain', chain.length);
        this.venueHook('onChain', chain.length);
        if (this.s.player.st.ouro && chain.length >= 4) this.drawCards(this.s.player.st.ouro);
        this.statusHook(this.s.player, 'onChain', chain.length);
        for (const e of this.alive()) this.statusHook(e, 'onChain', chain.length);
      }
    }
    return chain;
  }

  /** Chains are 6 links long, more with Ouroboros. */
  maxChain(): number {
    return MAX_CHAIN + (this.s.player.st.ouro ? 2 : 0) + (this.hasRelic('ouroboros_ring') ? 1 : 0) + (this.hasRelic('b_peal') ? 1 : 0) + (this.venue()?.chain ?? 0);
  }

  /** Counters in hand that could answer `last` right now (and that you can pay for). */
  counterOptions(last: Link): number[] {
    const s = this.s;
    if (last.src.kind !== 'enemy' || last.negated) return [];
    const pay = s.phase === 'player' ? s.energy : s.flux;
    return s.hand.filter((c) => {
      const d = CARDS[c.id];
      if (d.type !== 'counter' || !d.react) return false;
      const on = d.counter ?? 'reaction';
      if (on !== 'any' && on !== last.kind) return false;
      return this.cost(c) <= pay;
    }).map((c) => c.uid);
  }

  /** v0.14: Omens on the belt that could answer `last` (an enemy link with the Omen's sign). */
  omenOptions(last: Link): number[] {
    if (last.src.kind !== 'enemy' || last.negated) return [];
    return (this.run.omens ?? []).map((id, i) => ({ d: OMENS[id], i })).filter(({ d }) => d?.combat && d.sign === last.kind).map(({ i }) => i);
  }

  /** v0.14 Auto mode and the bot: turn over a defensive ⚔ Omen only when an attack would really hurt. */
  autoOmen(chain: Link[], omens: number[]): number {
    const last = chain[chain.length - 1];
    if (last.kind !== 'attack' || !omens.length) return 0;
    const e = last.src as EnemyState;
    const atk = e.kind === 'enemy' ? this.intents(e).filter((x) => x.icon === 'atk').reduce((a, x) => a + (x.n ?? 0) * (x.times ?? 1), 0) : 0;
    const p = this.s.player;
    const through = atk - p.block;
    if (through < Math.max(8, p.hp * 0.3)) return 0;
    const pref = ['hanged', 'hermit', 'sun', 'empress', 'star'];
    const belt = this.run.omens ?? [];
    const best = omens.filter((i) => pref.includes(belt[i])).sort((a, b) => pref.indexOf(belt[a]) - pref.indexOf(belt[b]))[0];
    return best === undefined ? 0 : -(best + 1);
  }

  /** v0.7: the counter window. Returns the uid of the Counter to play, -(i+1) for the Omen at belt index i, or 0 to let it resolve. */
  counterWindow(chain: Link[]): number {
    const last = chain[chain.length - 1];
    const opts = this.counterOptions(last);
    const omens = this.omenOptions(last);
    const mode0 = this.counterMode ?? COUNTERS.mode;
    // v0.13.1: in Ask mode the game also stops whenever an enemy answers (a trap, a counter, a Rebuttal), even if you
    // hold nothing that can answer back, so you always see it and choose to let it resolve.
    const pause = !opts.length && mode0 === 'ask' && chain.length >= 2 && last.src.kind === 'enemy' && !last.negated;
    if (!opts.length && !omens.length && !pause) return 0;
    if (this.decisions && this.decIdx < this.decisions.length) {
      const d = this.decisions[this.decIdx++];
      return opts.includes(d) || (d < 0 && omens.includes(-d - 1)) ? d : 0;
    }
    const mode = this.counterMode ?? COUNTERS.mode;
    if (mode === 'off') return 0;
    if (mode === 'ask') {
      const s = this.s;
      throw new NeedCounter({
        against: last.name, owner: last.src.name, kind: last.kind, options: opts, omens, blocked: this.counterBlocked(last),
        chain: chain.map((_, i) => this.linkView(chain, i, true)),
        enemyTurn: s.phase !== 'player', pay: s.phase === 'player' ? s.energy : s.flux,
      });
    }
    return (opts.length ? this.autoCounter(last, opts) : 0) || this.autoOmen(chain, omens);
  }

  /** v0.13.1: Counters in hand that cannot answer `last`, with the reason, for the counter window. */
  counterBlocked(last: Link): { uid: number; reason: string }[] {
    const s = this.s;
    const pay = s.phase === 'player' ? s.energy : s.flux;
    const unit = s.phase === 'player' ? 'energy' : 'Flux';
    const what: Record<string, string> = { reaction: 'traps and Reactions', attack: 'attacks', skill: 'non-attacks' };
    const out: { uid: number; reason: string }[] = [];
    for (const c of s.hand) {
      const d = CARDS[c.id];
      if (d.type !== 'counter' || !d.react) continue;
      const on = d.counter ?? 'reaction';
      if (on !== 'any' && on !== last.kind) out.push({ uid: c.uid, reason: `only answers ${what[on] ?? on}` });
      else if (this.cost(c) > pay) out.push({ uid: c.uid, reason: `costs ${this.cost(c)}, you have ${pay} ${unit}` });
    }
    return out;
  }

  /**
   * v0.13: a chain link as the UI shows it. With detail (the player's screen, or `full`) it also says what the
   * link does: the card's rules text, or for an enemy move its intent preview in words, and who it targets.
   */
  linkView(chain: Link[], i: number, full = false): ChainLinkView {
    const l = chain[i];
    const v: ChainLinkView = { name: l.name, owner: l.src.name, negated: l.negated, mine: l.src.kind === 'player', counter: !!l.counter, omen: l.omen };
    if (!full && !this.detail) return v;
    v.who = this.whoKey(l.src);
    if (l.tgt) v.target = l.tgt.kind === 'player' ? 'You' : l.tgt.name;
    if (l.card && CARDS[l.card.id]) {
      v.card = { id: l.card.id, up: l.card.up, path: l.card.path, mod: l.card.mod };
      v.text = cardText(l.card);
    } else if (l.omen && OMENS[l.omen]) {
      v.omen = l.omen;
      v.text = OMENS[l.omen].text;
    } else if (l.name === 'Rebuttal') {
      v.text = 'Negate the Counter it answers.';
    } else if (l.src.kind === 'enemy' && i === 0) {
      const e = l.src as EnemyState;
      const m = ENEMIES[e.def]?.moves[e.move];
      if (m && m.name === l.name) {
        v.intents = this.intents(e);
        v.text = intentWords(v.intents);
      }
    }
    return v;
  }

  /** The bot's (and Auto mode's) counter policy: cheapest Counter that Negates, else the cheapest one; skip tiny threats. */
  autoCounter(last: Link, opts: number[]): number {
    const cards = opts.map((u) => this.s.hand.find((c) => c.uid === u)!).filter(Boolean);
    const neg = cards.filter((c) => /Negate/.test(CARDS[c.id].text));
    const pool = neg.length ? neg : cards;
    pool.sort((a, b) => this.cost(a) - this.cost(b));
    return pool[0]?.uid ?? 0;
  }

  /** An enemy able to Rebut a Counter (the one it answered first). */
  rebutter(last: Link): EnemyState | null {
    const alive = this.alive().filter((e) => (e.st.rebut ?? 0) > 0);
    if (!alive.length) return null;
    const t = last.tgt as EnemyState | null;
    return t && alive.includes(t) ? t : alive[0];
  }

  /** Run an action; if it needs a counter decision, rewind everything and return the window instead. */
  attempt(fn: () => void): CounterWindow | null {
    const snap = JSON.stringify(this.run);
    const ev = this.events.length;
    this.decIdx = 0;
    try { fn(); return null; } catch (e) {
      if (!(e instanceof NeedCounter)) throw e;
      this.restore(snap, ev);
      return e.win;
    }
  }

  /** Put the run (and this fight) back exactly as a snapshot had it, keeping object identity. */
  restore(snap: string, ev: number): void {
    const r = JSON.parse(snap) as RunState;
    const s = this.s;
    for (const k of Object.keys(s)) delete (s as unknown as Record<string, unknown>)[k];
    Object.assign(s, r.combat);
    const run = this.run as unknown as Record<string, unknown>;
    for (const k of Object.keys(run)) delete run[k];
    for (const [k, v] of Object.entries(r)) run[k] = k === 'combat' ? s : v;
    this.rng = new Rng(s.rng, 'c');
    this.events.length = ev;
  }

  findResponder(last: Link): [Combatant, number] | null {
    const responders = this.foesOf(last.src);
    for (const r of responders) {
      for (let i = 0; i < r.traps.length; i++) {
        const d = CARDS[r.traps[i].id];
        if (d.trigger === last.kind) return [r, i];
      }
    }
    return null;
  }

  // ---------- player actions ----------

  /** v0.7 Resonance: the 3rd card of one element in a turn (2nd with Catalyst) fires that element's bonus once. */
  countElement(el: Element): void {
    const s = this.s;
    const t = s.elemTurn ?? (s.elemTurn = {});
    t[el] = (t[el] ?? 0) + 1;
    const need = s.player.st.catalyst || this.hasRelic('philosophers_flask') ? 2 : 3;
    if (t[el] !== need) return;
    this.resonate(el);
  }

  resonate(el: Element): void {
    const p = this.s.player;
    const foes = this.alive();
    this.emit({ t: 'text', who: 'p', s: `${ELEMENT_MAP[el].icon} Resonance!` });
    this.log(`${ELEMENT_MAP[el].name} Resonance: ${ELEMENT_MAP[el].resonance}`);
    switch (el) {
      case 'blaze': for (const f of foes) this.applyStatus(p, f, 'burn', 3); break;
      case 'frost': for (const f of foes) this.applyStatus(p, f, 'chill', 3); break;
      case 'wild': this.heal(p, 3); this.applyStatus(p, p, 'thorns', 2); break;
      case 'storm': for (const f of foes) this.applyStatus(p, f, 'shock', 3); this.applyStatus(p, p, 'charge', 1); break;
      case 'flood': this.drawCards(2); break;
      case 'stone': this.gainBlock(p, 8); break;
      case 'radiant': this.heal(p, 4); this.applyStatus(p, p, 'verdict', 1); break;
      case 'umbral': for (const f of foes) this.applyStatus(p, f, 'doom', 7); break;
    }
    if (p.st.elixir) { this.gainBlock(p, p.st.elixir); this.drawCards(1); }
    if (p.st.philstone) for (const f of this.alive()) this.hit(p, f, p.st.philstone, false);
    this.run.stats.resonances = (this.run.stats.resonances ?? 0) + 1;
    this.addStyle(20);
    this.relicHook('resonance', el);
  }

  canPlay(c: CardInst): boolean {
    const d = CARDS[c.id];
    return this.s.phase === 'player' && !d.unplayable && this.cost(c) <= this.s.energy;
  }

  play(uid: number, targetIdx?: number): boolean {
    const s = this.s;
    if (s.phase !== 'player') return false;
    const hi = s.hand.findIndex((c) => c.uid === uid);
    if (hi < 0) return false;
    const card = s.hand[hi];
    const d = CARDS[card.id];
    if (!this.canPlay(card)) return false;
    s.energy -= this.cost(card);
    if (d.type === 'reaction' && this.hasRelic('masquerade_mask')) s.once[`mask${s.turn}`] = 1;
    if (d.type === 'reaction' && s.once[`lowtide${s.turn}`]) delete s.once[`lowtide${s.turn}`];
    s.hand.splice(hi, 1);
    s.cardsThisTurn++;
    const fts = s.factionsThisTurn ?? (s.factionsThisTurn = []);
    if (!['curse', 'enemy'].includes(d.faction) && !fts.includes(d.faction)) fts.push(d.faction);
    if (/Converge/.test(d.text)) s.stats.converge = Math.max(s.stats.converge ?? 0, fts.length + (this.hasRelic('signpost') ? 1 : 0));
    const plays = s.stats.plays ?? (s.stats.plays = {});
    plays[card.id] = (plays[card.id] ?? 0) + 1;
    if (d.evolve) this.countEvo(card);
    const v = vals(card);
    // v0.7: what you play attunes you to its element, and three of one element in a turn Resonate.
    const el = liveElement(d, s.attune);
    if (el && ELEMENTS.on) { this.attuneTo(el); this.countElement(el); }
    if (d.type === 'reaction') {
      const p = s.player;
      if (p.traps.length >= p.slots) {
        const old = p.traps.shift()!;
        this.retire(old, p);
        this.log(`${CARDS[old.id].name} is pushed out of its slot.`);
      }
      card.tmpCost = undefined;
      p.traps.push(card);
      this.log(`You set ${d.name}.`);
      this.relicHook('trapSet');
      this.relicHook('cardPlayed', card);
      return true;
    }
    let tgt: Combatant | null = null;
    if (d.target) {
      tgt = targetIdx !== undefined ? s.enemies[targetIdx] ?? null : null;
      if (!tgt || tgt.dead) tgt = this.alive()[0] ?? null;
    }
    const kind: ActionKind = d.type === 'attack' ? 'attack' : 'skill';
    if (kind === 'attack') s.attacksThisTurn++;
    this.log(`You play ${d.name}.`);
    // A Counter played on your own turn uses its own effect if it has one; otherwise it cycles (draw 1).
    const eff = d.type === 'counter' && !d.play ? ((c: Ctx) => c.draw(1)) : ((c: Ctx) => d.play?.(c, v));
    const chain = this.perform(s.player, kind, d.name, card, tgt, eff);
    card.tmpCost = undefined;
    if (d.type !== 'power' && d.type !== 'counter' && !d.noMimic && d.play) {
      // Doppelgänger: the first Attack or Skill each turn happens twice.
      const twin = s.player.st.double && !s.once[`dbl${s.turn}`];
      const twist = (this.run.twist === 'mimicry' || this.hasRelic('echo_stone')) && !s.once.mimicry;
      const echo = card.mod === 'echoing' && !s.once[`echo${card.uid}`];
      if ((twin || twist || echo) && !this.over() && card.id !== 'glint') {
        if (twin) s.once[`dbl${s.turn}`] = 1; else if (echo) s.once[`echo${card.uid}`] = 1; else s.once.mimicry = 1;
        let t2 = tgt;
        if (t2?.dead) t2 = this.alive()[0] ?? null;
        this.emit({ t: 'text', who: 'p', s: echo && !twin && !twist ? 'Echoing!' : 'Doppelgänger!' });
        this.perform(s.player, kind, `${d.name} (double)`, undefined, t2, (c) => d.play?.(c, v));
      }
      s.lastPlay = { id: card.id, up: card.up, tgt: tgt ? s.enemies.indexOf(tgt as EnemyState) : undefined, turn: s.turn };
    }
    if (card.mod === 'reckless' && !this.over()) this.loseHp(s.player, 2);
    if (chain[0].negated && card.mod === 'ricochet' && s.hand.length < HAND_LIMIT) {
      s.hand.push(card);
      this.emit({ t: 'text', who: 'p', s: 'Ricochet!' });
    } else if (d.type === 'power') {
      // Powers stay in play for the rest of the fight.
    } else if (exhaustsCopy(d, card)) this.exhaust(card);
    else s.discard.push(card);
    if (!this.over()) this.relicHook('cardPlayed', card);
    return true;
  }

  // ---------- omens ----------

  /**
   * v0.14: Omens are instant-speed only. They are turned over as a link in a chain from the counter window
   * (perform → counterWindow), never as a free action on your own turn. Kept so old callers fail safely.
   */
  useOmen(_i: number): boolean { return false; }

  // ---------- turns ----------

  startPlayerTurn(): void {
    const s = this.s;
    const p = s.player;
    s.turn++;
    this.log(`— Turn ${s.turn} —`);
    s.phase = 'player';
    s.cardsThisTurn = 0;
    s.attacksThisTurn = 0;
    if (p.st.roots) { p.st.roots--; if (!p.st.roots) delete p.st.roots; } else if (s.turn > 1 && !p.st.mountain) p.block = p.st.fortify ? Math.min(p.block, p.st.fortify) : 0;
    s.factionsThisTurn = [];
    s.elemTurn = {};
    // v0.5 Prime: set Reactions that Prime grow each turn they wait.
    if (s.turn > 1) for (const t of p.traps) if (CARDS[t.id].primes) t.prime = Math.min(9, (t.prime ?? 0) + (this.hasRelic('sundial') ? 2 : 1));
    this.statusHook(p, 'onTurnStart');
    if (this.over()) return;
    s.energy = 3 + relicMod(this.run, 'energy') + s.flux;
    s.flux = 0;
    if (p.st.frozen) { delete p.st.frozen; s.energy = Math.max(0, s.energy - 1); this.emit({ t: 'text', who: 'p', s: 'Frozen: −1 energy' }); }
    let n = 5 + (p.st.focus ?? 0) + relicMod(this.run, 'draw');
    if (s.turn === 1) n += relicMod(this.run, 'drawFirst') + (this.run.bonus?.drawFirst ?? 0);
    if (s.turn <= 2 && this.hasRelic('pocket_watch')) n -= 1;
    if (p.st.drawnext) { n += p.st.drawnext; delete p.st.drawnext; }
    if (s.turn === 8 && this.run.vows?.vow_clock) {
      for (const e of this.alive()) this.applyStatus(e, e, 'str', 3);
      this.emit({ t: 'text', who: '0', s: 'Overtime!' });
      this.log('Vow of the Clock: overtime. Enemies gain 3 Edge.');
    }
    this.drawCards(n);
    this.relicHook('turnStart');
    this.venueHook('turnStart');
    this.surpriseCheck();
    if (this.run.twist === 'graveyard' && s.turn > 1) this.exhume(1);
  }

  endPlayerTurn(): void {
    const s = this.s;
    if (s.phase !== 'player') return;
    s.phase = 'enemy';
    for (const c of [...s.hand]) {
      const d = CARDS[c.id];
      if (d.endInHand) d.endInHand(new Ctx(this, s.player, null, 'skill', null, 0, c), vals(c));
      if (this.over()) return;
    }
    const keep: CardInst[] = [];
    for (const c of s.hand) {
      if (isRetain(c)) keep.push(c);
      else { c.tmpCost = undefined; s.discard.push(c); }
    }
    s.hand = keep;
    s.flux += Math.min(s.energy, this.fluxCap());
    s.energy = 0;
    this.statusHook(s.player, 'onTurnEnd');
    this.decay(s.player);
    // v0.7 Tremor: the ground shakes under every enemy at the end of your turn.
    for (const e of this.alive()) {
      const t = e.st.tremor;
      if (!t) continue;
      this.emit({ t: 'text', who: this.whoKey(e), s: `〰️ Tremor ${t}` });
      this.loseHp(e, t);
      if (!e.dead) { e.st.tremor = Math.floor(t / 2); if (!e.st.tremor) delete e.st.tremor; }
      if (this.over()) return;
    }
    for (const e of s.enemies) if (!e.dead) e.block = e.flags.keepBlock ? e.block : 0;
  }

  /** One enemy's turn. Returns false if it did nothing (dead). */
  enemyAct(i: number): boolean {
    const e = this.s.enemies[i];
    if (!e || e.dead || this.over()) return false;
    e.turn++;
    if (e.flags.sleep) { delete e.flags.sleep; return true; }
    this.statusHook(e, 'onTurnStart');
    if (e.dead || this.over()) return true;
    const d = ENEMIES[e.def];
    if (e.st.frozen) {
      // v0.7: a Frozen enemy loses this action and keeps the same intent for next turn.
      delete e.st.frozen;
      this.emit({ t: 'text', who: this.whoKey(e), s: 'Frozen!' });
      this.log(`${e.name} is frozen and does nothing.`);
      this.statusHook(e, 'onTurnEnd');
      this.decay(e);
      return true;
    }
    if (d.ghost) this.ghostAct(e);
    else {
      const m = d.moves[e.move];
      this.log(`${e.name}: ${m.name}.`);
      this.perform(e, m.steps.some((st) => st.atk) ? 'attack' : 'skill', m.name, undefined, this.s.player, (c) => this.runMove(c, m));
    }
    if (!e.dead && !this.over()) {
      this.statusHook(e, 'onTurnEnd');
      this.decay(e);
      this.rollMove(e);
    }
    return true;
  }

  endEnemyPhase(): void {
    if (this.over()) return;
    this.startPlayerTurn();
  }

  /** Convenience for simulations/tests: run the whole enemy phase synchronously. */
  endTurn(): void {
    this.endPlayerTurn();
    for (let i = 0; i < this.s.enemies.length; i++) this.enemyAct(i);
    this.endEnemyPhase();
  }

  decay(c: Combatant): void {
    for (const k of Object.keys(c.st)) {
      if (STATUSES[k]?.decays) { c.st[k]--; if (c.st[k] <= 0) delete c.st[k]; }
    }
  }

  // ---------- enemies ----------

  rollMove(e: EnemyState): void {
    const d = ENEMIES[e.def];
    if (d.ghost) { this.planGhost(e); return; }
    e.move = d.ai(e, this, this.rng);
    e.lastMoves.push(e.move);
    if (e.lastMoves.length > 3) e.lastMoves.shift();
  }

  runMove(c: Ctx, m: Move): void {
    for (const st of m.steps) {
      if (c.src.dead || this.over()) return;
      if (st.atk) c.dmg(st.atk, st.times ?? 1);
      if (st.block) c.block(st.block);
      if (st.str) c.apply('str', st.str, 'self');
      if (st.self) c.apply(st.self[0], st.self[1], 'self');
      if (st.weak) c.apply('weak', st.weak, 'tgt');
      if (st.vuln) c.apply('vuln', st.vuln, 'tgt');
      if (st.burn) c.apply('burn', st.burn, 'tgt');
      if (st.heal) c.heal(st.heal);
      if (st.wound) for (let i = 0; i < st.wound; i++) c.giveCard('wound');
      if (st.trap) {
        if (c.rec) c.rec.push({ icon: 'trap', label: CARDS[st.trap].trigger });
        else if (c.src.traps.length < c.src.slots) c.src.traps.push(this.mkCard(st.trap));
      }
      if (st.fn) st.fn(c, this);
    }
  }

  intents(e: EnemyState): Intent[] {
    if (e.dead) return [];
    const rec: Intent[] = [];
    const d = ENEMIES[e.def];
    if (d.ghost && e.ghost) {
      for (const card of e.ghost.plan) {
        const cd = CARDS[card.id];
        if (cd.type === 'reaction') rec.push({ icon: 'trap', label: cd.trigger });
        else cd.play?.(new Ctx(this, e, this.s.player, cd.type === 'attack' ? 'attack' : 'skill', null, 0, card, rec), vals(card));
      }
      return mergeIntents(rec);
    }
    const m = d.moves[e.move];
    if (!m) return [];
    const c = new Ctx(this, e, this.s.player, 'attack', null, 0, undefined, rec);
    for (const st of m.steps) {
      if (st.preview) rec.push(...st.preview(e, this));
      else if (st.fnLabel) rec.push({ icon: 'special', label: st.fnLabel });
    }
    this.runMove(c, { ...m, steps: m.steps.map((x) => ({ ...x, fn: undefined })) });
    return mergeIntents(rec);
  }

  // Echo (ghost) enemies play a saved player deck through the same card code.
  setupGhost(e: EnemyState): void {
    const pool = this.run.echoPool;
    const beat = this.s.echoBeat ? this.run.echoBeat : null;
    const pick = beat ?? (pool.length ? this.rng.pick(pool) : null) ?? { label: 'Wandering Echo', cards: ['strike', 'strike', 'strike', 'guard', 'guard', 'guard', 'brace', 'spark_lunge', 'rend', 'barkskin'] };
    const deck = pick.cards.map((id) => {
      const [cid, up] = id.split('+');
      const k = this.mkCard(cid, up === '1' || up === '2');
      if (up === '2') k.path = 'b';
      return k;
    }).filter((c) => CARDS[c.id] && !CARDS[c.id].unplayable && CARDS[c.id].type !== 'power');
    e.ghost = { deck, draw: this.rng.shuffle([...deck]), plan: [], label: pick.label };
    e.name = `Echo: ${pick.label}`;
  }

  planGhost(e: EnemyState): void {
    const g = e.ghost!;
    let energy = 3 + (e.flags.energy ?? 0);
    const plan: CardInst[] = [];
    let traps = e.traps.length;
    for (let tries = 0; tries < 6 && energy > 0; tries++) {
      if (!g.draw.length) g.draw = this.rng.shuffle([...g.deck.filter((c) => !plan.includes(c) && !e.traps.includes(c))]);
      const c = g.draw.pop();
      if (!c) break;
      const d = CARDS[c.id];
      const cost = printedCost(d, c);
      if (cost > energy || (d.type === 'reaction' && traps >= e.slots)) { g.draw.unshift(c); continue; }
      if (d.type === 'reaction') traps++;
      energy -= cost;
      plan.push(c);
    }
    g.plan = plan;
  }

  ghostAct(e: EnemyState): void {
    const g = e.ghost!;
    for (const c of g.plan) {
      if (e.dead || this.over()) break;
      const d = CARDS[c.id];
      if (d.type === 'reaction') {
        if (e.traps.length < e.slots) e.traps.push(c);
        continue;
      }
      this.log(`${e.name} plays ${d.name}.`);
      this.perform(e, d.type === 'attack' ? 'attack' : 'skill', d.name, c, this.s.player, (cx) => d.play?.(cx, vals(c)));
      g.draw.unshift(c);
    }
    g.plan = [];
  }
}

function mergeIntents(rec: Intent[]): Intent[] {
  const out: Intent[] = [];
  for (const i of rec) {
    const prev = out[out.length - 1];
    if (prev && prev.icon === 'block' && i.icon === 'block') prev.n = (prev.n ?? 0) + (i.n ?? 0);
    else out.push({ ...i });
  }
  return out;
}

/** Card text with values filled in. */
/** v0.13: an intent preview in words, for the counter window and the chain recap. */
export function intentWords(list: Intent[]): string {
  const out = list.map((i) => {
    switch (i.icon) {
      case 'atk': return `Deal ${i.n} damage${i.times && i.times > 1 ? ` ${i.times} times` : ''}.`;
      case 'block': return `Gain ${i.n} Guard.`;
      case 'heal': return `Heal ${i.n}.`;
      case 'buff': return `Buff: ${i.label ?? 'grows stronger'}.`;
      case 'debuff': return `Debuff: ${i.label ?? 'weakens you'}.`;
      case 'trap': return 'Set a face-down trap.';
      default: return i.label ? `${i.label}.` : 'Something unusual.';
    }
  });
  return out.join(' ') || 'No visible effect.';
}

export function cardText(c: CardInst | { id: string; up: boolean; path?: CardInst['path']; mod?: CardInst['mod'] }): string {
  const d: CardDef = CARDS[c.id];
  const v = vals(c);
  let t = d.text.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? '?'));
  const ex = exhaustsCopy(d, c);
  if (ex && !/Fold\.$/.test(t)) t += ' Fold.';
  return t;
}
