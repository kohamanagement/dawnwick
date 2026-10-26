import type { Ctx } from './combat';

export type Faction = 'ember' | 'tide' | 'thorn' | 'void' | 'gilt' | 'glass' | 'grave' | 'storm' | 'rime' | 'stone' | 'dawn' | 'aether' | 'beast' | 'dusk' | 'neutral' | 'curse' | 'enemy';
/** v0.7 Elements: a six-element wheel (each beats the next two) plus Radiant and Umbral, which beat each other. 'prism' cards take your Attunement. */
export type Element = 'blaze' | 'frost' | 'wild' | 'storm' | 'flood' | 'stone' | 'radiant' | 'umbral';
export type CardElement = Element | 'prism' | 'none';
export type CardType = 'attack' | 'skill' | 'power' | 'reaction' | 'counter' | 'curse';
export type Rarity = 'starter' | 'common' | 'uncommon' | 'rare' | 'legendary' | 'special';
/** Card mods ("Sigils"): permanent tweaks to a card, from the Forge or in-run forge nodes. */
export type ModId = 'keen' | 'linked' | 'ricochet' | 'swift' | 'lasting' | 'opening' | 'reckless' | 'echoing' | 'haunted';
/** What a face-down card responds to. "attack"/"skill" = the opponent declares one; "reaction" = an opposing trap activates. */
export type Trigger = 'attack' | 'skill' | 'reaction';
export type ActionKind = 'attack' | 'skill' | 'reaction';
export type CharId = 'duelist' | 'warden' | 'hollow' | 'sharp' | 'magpie' | 'sexton' | 'arbiter' | 'tempest' | 'rimeblade' | 'beastcaller' | 'geomancer' | 'alchemist' | 'nightblade';
/** v0.7: what a Counter (played from your hand mid-chain) can answer. 'any' = any enemy link. */
export type CounterOn = 'reaction' | 'attack' | 'skill' | 'any';

export interface CardInst {
  uid: number;
  id: string;
  up: boolean;
  /** Temporary cost override for this combat (e.g. Wildcard). */
  tmpCost?: number;
  /** Sigil on this copy. */
  mod?: ModId;
  /** Cosmetic holo finish (from booster packs). */
  foil?: boolean;
  /** v0.4: a player card an enemy stole (it goes back to the player's discard when it leaves play). */
  stolen?: boolean;
  /** v0.5 Prime: turns this Reaction has stayed set (cards with Prime read it). */
  prime?: number;
  /** v0.5 Blot (an enemy affliction): costs 1 more for the rest of the fight. */
  blot?: boolean;
  /** v0.11: upgraded down path B (Name✦) instead of path A (Name+). */
  path?: 'b';
  /** v0.11 Evolve: times this copy has been played in won fights this run. */
  evo?: number;
}

export type Vals = Record<string, number>;

export interface CardDef {
  id: string;
  name: string;
  faction: Faction;
  type: CardType;
  rarity: Rarity;
  cost: number;
  upCost?: number;
  v: Vals;
  up?: Vals;
  /** Template; {key} is replaced by the value. */
  text: string;
  /** Needs an enemy target when played by the player. */
  target?: boolean;
  exhaust?: boolean;
  upNoExhaust?: boolean;
  retain?: boolean;
  innate?: boolean;
  unplayable?: boolean;
  trigger?: Trigger;
  /** Profile level needed before it can appear in runs. */
  unlock?: number;
  play?: (c: Ctx, v: Vals) => void;
  react?: (c: Ctx, v: Vals) => void;
  /** Called at end of player turn while in hand (curses). */
  endInHand?: (c: Ctx, v: Vals) => void;
  /** v0.4: Mimic effects never copy this card (it copies cards itself). */
  noMimic?: boolean;
  /** v0.5 Prime: while set, this Reaction gains 1 Prime at the start of each of your turns. */
  primes?: boolean;
  /** v0.5 Haunt: runs when this card enters your Crypt. */
  haunt?: (c: Ctx, v: Vals) => void;
  /** v0.7: the card's element (defaults from its faction). */
  element?: CardElement;
  /** v0.7 Counter cards: which enemy link they can answer from your hand. Their response is `react`. */
  counter?: CounterOn;
  /** v0.7: art glyph for generated cards. */
  icon?: string;
  /** v0.7: a hand-designed signature card (weighted up in its class's drafts). */
  sig?: boolean;
  /** v0.7: made by the card generator (weighted down in drafts). */
  gen?: boolean;
  /** v0.11: a custom path-B upgrade (default: see altPath in upgrades.ts). */
  alt?: { kind: 'cheap' | 'retain' | 'innate' | 'keep' | 'alt'; v?: Vals; label?: string };
  /** v0.11 Evolve: after this copy is played `n` times (in fights you win), it becomes `into` for the rest of the run. */
  evolve?: { into: string; n: number };
  /** v0.11: an evolved form (only reached by Evolve: never drafted, sold or packed). */
  evolved?: boolean;
  /** v0.11 hybrid: a class-pair card that also belongs to this faction (draftable by either side). */
  faction2?: Faction;
}

export interface Combatant {
  kind: 'player' | 'enemy';
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  block: number;
  st: Record<string, number>;
  traps: CardInst[];
  slots: number;
  dead?: boolean;
  /** The Fate Coin (Gilt): 0 = ☀ Sun, 1 = ☾ Moon. */
  coin?: number;
}

export interface GhostState {
  deck: CardInst[];
  draw: CardInst[];
  plan: CardInst[];
  label: string;
}

export interface EnemyState extends Combatant {
  def: string;
  /** v0.7: this enemy's element (Aspect). */
  elem?: Element | null;
  move: string;
  lastMoves: string[];
  turn: number;
  icon: string;
  ghost?: GhostState;
  flags: Record<string, number>;
}

export interface Intent {
  icon: 'atk' | 'block' | 'buff' | 'debuff' | 'trap' | 'special' | 'heal';
  n?: number;
  times?: number;
  label?: string;
}

/** v0.13: one chain link as the UI shows it. The detail fields are only filled for the player's screen (Combat.detail). */
export interface ChainLinkView {
  name: string;
  owner: string;
  negated: boolean;
  mine: boolean;
  counter?: boolean;
  /** What the link does, in plain words. */
  text?: string;
  /** The card behind the link (traps, Counters, played cards), so it can be shown face-up. */
  card?: { id: string; up: boolean; path?: CardInst['path']; mod?: CardInst['mod'] };
  /** Enemy moves: the intent preview of the move. */
  intents?: Intent[];
  /** Who the link is aimed at. */
  target?: string;
  /** Enemy index (as a string) of the link's owner, for the enemy art. */
  who?: string;
  /** v0.14: an Omen turned over as this link (its id). */
  omen?: string;
}

export interface UiEvent {
  t: 'dmg' | 'block' | 'heal' | 'status' | 'chain' | 'text' | 'negate' | 'death' | 'elem';
  who?: string; // 'p' or enemy index as string
  n?: number;
  s?: string;
  links?: ChainLinkView[];
}

export interface CombatState {
  /** v0.14: Patrons whose debts sit in on this boss fight (as extra traps). */
  debts?: string[];
  /** v0.14: this Rival is the Echo of your previous run's deck. */
  echoBeat?: boolean;
  player: Combatant;
  enemies: EnemyState[];
  draw: CardInst[];
  hand: CardInst[];
  discard: CardInst[];
  exhausted: CardInst[];
  energy: number;
  flux: number;
  turn: number;
  phase: 'player' | 'enemy' | 'won' | 'lost';
  cardsThisTurn: number;
  attacksThisTurn: number;
  rng: Record<string, number>;
  once: Record<string, number>;
  kind: 'normal' | 'elite' | 'boss';
  encounter: string;
  log: string[];
  stats: {
    chains: number; maxChain: number; dmg: number; negates?: number; startHp?: number; style?: number; plays?: Record<string, number>; flips?: number;
    /** v0.4 */
    steals?: number; mimics?: number; bigHit?: number;
    /** v0.5 */
    exhumes?: number; buried?: number; primeMax?: number; converge?: number;
    /** v0.11: plays per card copy (uid), for Evolve. */
    evo?: Record<string, number>;
  };
  /** v0.5: the Crypt. Your Reactions that leave play land here while Crypt rules are on (the Sexton). */
  crypt?: CardInst[];
  /** v0.5: the Venue (battlefield) this fight takes place at. */
  venue?: string | null;
  /** v0.5: factions of the cards played this turn (Converge). */
  factionsThisTurn?: string[];
  /** v0.5: this fight is against your Nemesis. */
  nemesis?: boolean;
  /** v0.4: the last Attack or Skill the player played this turn (what Mimic copies). */
  lastPlay?: { id: string; up: boolean; tgt?: number; turn: number } | null;
  /** v0.4: Riddle (puzzle) fights: what counts as solving it. */
  puzzle?: { id: string; goal: 'win' | 'survive' };
  tutorial?: boolean;
  /** Champion elite affix, if any. */
  affix?: string;
  /** v0.6: a mid-fight Surprise, due on this player turn. */
  surprise?: { id: string; turn: number; fired?: boolean; seen?: boolean } | null;
  /** v0.6: a rare-monster fight. */
  rare?: boolean;
  /** v0.7: your Attunement (the element of the last elemental card you played). Enemy hits read it. */
  attune?: Element | null;
  /** v0.7: elemental cards played this turn, per element (Resonance at 3). */
  elemTurn?: Record<string, number>;
  /** v0.7: counters played this fight (stats/trophies). */
  counters?: number;
}

export type NodeType = 'fight' | 'elite' | 'event' | 'shop' | 'rest' | 'treasure' | 'forge' | 'boss' | 'mystery' | 'shrine';

export interface MapNode {
  row: number;
  col: number;
  type: NodeType;
  next: number[];
  /** Champion elite: harder (random affix), richer rewards. */
  champ?: boolean;
  /** v0.5: the Venue this elite fight takes place at (shown on the map). */
  venue?: string;
  /** v0.14: dealt face-down. Only its suit shows (♠ fights, ♥ rest, ♦ riches, ♣ the unknown) until it is flipped. */
  down?: boolean;
  /** v0.14: a face-down card that has been flipped (by a Peek, Scouting, or walking onto it). */
  seen?: boolean;
}

export interface RewardState {
  gold: number;
  goldTaken: boolean;
  cards: string[] | null;
  relic: string | null;
  relicChoices?: string[] | null;
  rareCards?: boolean;
  /** Dare result line. */
  note?: string | null;
  champ?: boolean;
  /** Omen that dropped from this fight (already added to the belt when there was room). */
  omen?: string | null;
  omenKept?: boolean;
  /** v0.5: your Nemesis fell in this fight. */
  nemesis?: boolean;
  venue?: string | null;
  /** v0.14 "The Deal": a fourth card dealt face-down, one rarity higher. You take it blind. */
  hidden?: string | null;
  /** v0.14: the Dealer answers the card you just took. Pay to Negate, or let it resolve (a Jinx joins your deck). */
  answer?: { card: string; cost: number; jinx: string } | null;
  /** v0.14: what happened when the Dealer answered (for the screen). */
  answerNote?: string | null;
  /** v0.17 Second Look (a Dealer's favor): the next card taken leaves the rest of the Deal on the table for one more pick. */
  extraPick?: boolean;
  /** v0.17 Ante Up (a Dealer's favor): this reward's gold was doubled. */
  anted?: boolean;
}

export interface ShopState {
  cards: { id: string; price: number; sold: boolean }[];
  relics: { id: string; price: number; sold: boolean }[];
  removePrice: number;
  removed: boolean;
  omens?: { id: string; price: number; sold: boolean }[];
}

export interface RunStats {
  floors: number;
  fights: number;
  elites: number;
  bosses: number;
  chains: number;
  maxChain: number;
  dmg: number;
  goldEarned: number;
  /** v0.3: Style points (chains, negates, kills), plays per card id (mastery), kills per enemy (bestiary). */
  style?: number;
  plays?: Record<string, number>;
  kills?: Record<string, number>;
  omensUsed?: number;
  /** v0.4 */
  steals?: number;
  mimics?: number;
  bigHit?: number;
  bigHitCard?: string;
  /** v0.5 */
  exhumes?: number;
  primeMax?: number;
  converge?: number;
  venueWins?: number;
  blessings?: number;
  /** v0.6 */
  roads?: number;
  shrines?: number;
  mysteries?: number;
  /** v0.7 */
  counters?: number;
  freezes?: number;
  resonances?: number;
  /** v0.14: Echo duels this run (met, won). */
  echoMet?: number;
  echoWon?: number;
}

export type Screen = 'map' | 'combat' | 'reward' | 'shop' | 'rest' | 'event' | 'treasure' | 'forge' | 'epilogue' | 'patron' | 'fate' | 'victory' | 'defeat';

/** Run-start bonuses from talents (never applied to Daily Duels). */
export interface RunBonus {
  maxHp?: number; gold?: number; block?: number; mend?: number; shopPct?: number; goldPct?: number;
  choices?: number; rerolls?: number; drawFirst?: number; relic?: boolean;
}

export interface Dare { id: string; stake: number; done?: boolean }

export interface RunState {
  v: number;
  /** v0.11: Evolve messages not yet shown to the player. */
  evolved?: string[];
  seed: number;
  daily: string | null;
  dailyMod: string | null;
  character: CharId;
  ascension: number;
  hp: number;
  maxHp: number;
  gold: number;
  deck: CardInst[];
  relics: string[];
  relicCounters: Record<string, number>;
  act: number;
  map: MapNode[][];
  pos: { row: number; col: number } | null;
  floor: number;
  nextUid: number;
  rng: Record<string, number>;
  combat: CombatState | null;
  screen: Screen;
  reward: RewardState | null;
  shop: ShopState | null;
  event: { id: string; resolved: string | null; note?: string | null } | null;
  restDone: boolean;
  stats: RunStats;
  removeCost: number;
  seenEvents: string[];
  echoPool: { label: string; cards: string[] }[];
  level: number;
  actFights: number;
  lastEnc: string;
  rareReward: boolean;
  won?: boolean;
  finished?: boolean;
  tutorial?: boolean;
  bonus?: RunBonus;
  /** Legendary cards and achievement relics this player may find. */
  owned?: string[];
  /** Cards weighted up in drafts because the player owns them. */
  favored?: string[];
  rerolls?: number;
  /** Active Dare for the current fight. */
  dare?: Dare | null;
  dareOffer?: string[] | null;
  daresWon?: number;
  forge?: { mods: ModId[]; done: boolean } | null;
  imprints?: Record<string, ModId>;
  foils?: string[];
  champs?: number;
  // ── v0.3 ──
  /** Vows (mix-your-own difficulty): vow id → rank. */
  vows?: Record<string, number>;
  heat?: number;
  /** Weekly Gauntlet key (e.g. 2026-W43) and its twist. */
  weekly?: string | null;
  twist?: string | null;
  /** Omens: tarot consumables held (max 3, +1 with Tarot Pouch). */
  omens?: string[];
  /** Which version of each act this run uses (index 0 = Act 1); 0 = standard, 1 = alternate. */
  acts?: number[];
  /** Arena duel (async PvP vs a saved deck): not a roguelike run. */
  arena?: { wins: number; rival: string } | null;
  familiar?: string;
  // ── v0.4 ──
  /** Which boss each act uses: 0 = the act version's own boss, 1 = the wandering boss for that act. */
  bosses?: number[];
  /** Act 4 epilogue: 'offered' after the Act 3 boss when 2+ Champions fell; 'won'/'lost' once fought. */
  epilogue?: 'offered' | 'fighting' | 'won' | 'lost' | null;
  /** Riddle (puzzle) id when this "run" is a single puzzle fight. */
  puzzle?: string | null;
  // ── v0.5 ──
  /** Venue of each act's boss fight (index 0 = Act 1), rolled with the map. */
  venues?: (string | null)[];
  /** Patron (an Ancient-like visitor at the start of Acts 2 and 3) and the blessings on offer. */
  patron?: { id: string; offers: string[]; done: boolean } | null;
  /** Your Nemesis: the fight that killed you last time, back for a rematch. */
  nemesis?: NemesisInfo | null;
  /** The Long Night (endless): current night number, 0/undefined when not descended. */
  night?: number;
  /** May this run descend into the Long Night after the Act 3 boss? (needs one earlier win) */
  nightOk?: boolean;
  // ── v0.6 ──
  /** The Fate kept at the start of the run, and the three on offer before that. */
  fate?: string | null;
  fateOffer?: string[] | null;
  /** Each act's Sky and map Layout (index 0 = Act 1). */
  skies?: string[];
  layouts?: string[];
  /** The act in which the Fog was lifted (by an event). */
  fogLifted?: number;
  /** A node waiting to be entered after a roadside encounter. */
  wayside?: { row: number; col: number } | null;
  /** Scratch value for multi-stage events (a gambling pot, a roll count). */
  evPot?: number;
  /** Temporary boons: id → fights left. */
  buffs?: Record<string, number>;
  /** The Long Night's stacking Night Terrors. */
  terrors?: string[];
  /** What the last Mystery node turned out to be (for the UI). */
  mystery?: string | null;
  /** Light Fingers: the shop's free card has been taken. */
  shopFree?: boolean;
  /** Counters for v0.6 trophies. */
  rares?: number;
  surprises?: number;
  /** The last fight started (for the Nemesis system). */
  lastFight?: { enemies: string[]; name: string; act: number; kind: 'normal' | 'elite' | 'boss' } | null;
  // ── v0.14 ──
  /** Peeks left this act: flip one face-down map card before you choose a path. */
  peeks?: number;
  /** A Reaction rehearsed at the Candle: a copy starts your next fight already set. */
  rehearse?: string | null;
  /** Scouted at the Candle: the next Rival fight starts with its traps face-up. */
  scout?: boolean;
  /** Patron debts: each blessing is a bargain the Patron calls in at a later boss (an extra trap on its side). */
  debts?: { patron: string; trap: string; act: number }[];
  /** Is this run's first Rival the Echo of your previous run's deck (the run-2 story beat)? */
  echoBeat?: { label: string; cards: string[] } | null;
  /** Echo duelists your Legacy decks beat during this run (shown on the results screen). */
  echoWins?: number;
  // ── v0.17 ──
  /** The Dealer's favors used this run (src/engine/favors.ts): scope key → uses, plus `total`. Never set by the sims. */
  favors?: Record<string, number>;
}

export interface NemesisInfo {
  enemies: string[];
  name: string;
  act: number;
  kind: 'normal' | 'elite';
  /** How many times it has beaten you. */
  grudge: number;
  met?: boolean;
  slain?: boolean;
}
