// v0.7: the systematic part of the card pool. Each faction gets a vocabulary of effect "atoms" (its
// mechanics: Burn, Weak, Thorns, Doom, Ante, Glints, Bury, Shock, Chill, Tremor, Verdict, Catalyze,
// companions, Mark...) and a set of card templates (attacks, skills, Reactions on all three triggers,
// Counters, powers). Templates × atoms × rarities are priced on the balance yardstick
// (1 energy ≈ 6 damage ≈ 5 Block ≈ 1.3 cards; Reactions +30%, Counters +20%, uncommon +12%, rare +25%)
// and named from per-faction word lists. Everything is deterministic: the same ids every build,
// so collections and saved decks stay valid. Hand-designed signature cards live in cards7.ts.
//
// v0.9 "Clean Cut": the generator no longer prints a card that repeats another one. Every card it
// makes is checked against the hand-made pool and everything generated before it (same type, cost,
// trigger and element, same rules text, numbers within 2 or 25%: see `redundant`). A repeat is
// reworked (its second effect is swapped, first for its element's payoff effect such as "deal N to
// each enemy with Burn") and cut if no rework is unique. Its generated powers also used to copy the
// hand-made powers word for word; each faction now gets two powers of its own (statuses.ts, v0.9).
import type { CardDef, CardElement, CardType, CounterOn, Faction, Rarity, Trigger, Vals } from '../engine/types';
import type { Ctx } from '../engine/combat';
import { FACTION_ELEMENT } from './elements';

export type Where = 'card' | 'attack' | 'skill' | 'trap';
export interface Atom {
  id: string;
  /** Value of one unit (scalable atoms) or of the whole atom (fixed ones). */
  pts: number;
  fixed?: boolean;
  /** Needs a target when played as a card. */
  one?: boolean;
  say: (k: string, w: Where) => string;
  run: (c: Ctx, n: number) => void;
  /** Kind of effect, so a card doesn't pair two of the same. */
  kind: string;
}

export const T = (w: Where): string => (w === 'card' ? '' : w === 'attack' ? ' to the attacker' : w === 'skill' ? ' to it' : ' to its owner');
export const ph = (k: string): string => `{${k}}`;

const dmg: Atom = { id: 'dmg', kind: 'dmg', pts: 1, one: true, say: (k, w) => `deal ${ph(k)} damage${T(w)}`, run: (c, n) => c.dmg(n) };
const dmg2: Atom = { id: 'dmg2', kind: 'dmg', pts: 2.1, one: true, say: (k, w) => `deal ${ph(k)} damage${T(w)} twice`, run: (c, n) => c.dmg(n, 2) };
const dmgAll: Atom = { id: 'dmgAll', kind: 'dmg', pts: 1.6, say: (k) => `deal ${ph(k)} damage to ALL enemies`, run: (c, n) => c.dmgAll(n) };
const dmgRnd: Atom = { id: 'dmgRnd', kind: 'dmg', pts: 3, say: (k) => `deal ${ph(k)} damage to a random enemy 3 times`, run: (c, n) => c.dmgRandom(n, 3) };
const block: Atom = { id: 'block', kind: 'block', pts: 1.2, say: (k) => `gain ${ph(k)} Guard`, run: (c, n) => c.block(n) };
const draw1: Atom = { id: 'draw1', kind: 'draw', pts: 7, fixed: true, say: () => 'draw 1 card', run: (c) => c.draw(1) };
const draw2: Atom = { id: 'draw2', kind: 'draw', pts: 13, fixed: true, say: () => 'draw 2 cards', run: (c) => c.draw(2) };
const bank1: Atom = { id: 'bank1', kind: 'energy', pts: 5, fixed: true, say: () => 'bank 1 energy for next turn', run: (c) => c.bank(1) };
const heal: Atom = { id: 'heal', kind: 'heal', pts: 2, say: (k) => `heal ${ph(k)} HP`, run: (c, n) => c.heal(n) };
const negate: Atom = { id: 'negate', kind: 'negate', pts: 7, fixed: true, say: () => 'Negate it', run: (c) => c.negate() };
const disrupt1: Atom = { id: 'disrupt1', kind: 'disrupt', pts: 4, fixed: true, say: () => 'Disrupt 1', run: (c) => c.disrupt(1) };
const steal1: Atom = { id: 'steal1', kind: 'steal', pts: 6, fixed: true, say: () => 'Steal 1', run: (c) => { c.steal(1); } };
const glint: Atom = { id: 'glint', kind: 'glint', pts: 4, fixed: true, say: () => 'add a Glint to your hand', run: (c) => c.addCard('glint', 'hand') };
const bury2: Atom = { id: 'bury2', kind: 'bury', pts: 3, fixed: true, say: () => 'Bury 2', run: (c) => { c.bury(2); } };
const exhume1: Atom = { id: 'exhume1', kind: 'exhume', pts: 7, fixed: true, say: () => 'Exhume 1', run: (c) => { c.exhume(1); } };
const ante: Atom = { id: 'ante', kind: 'ante', pts: 1.5, say: (k) => `raise your Ante by ${ph(k)}`, run: (c, n) => c.raiseAnte(n) };
const str1: Atom = { id: 'str1', kind: 'str', pts: 10, fixed: true, say: () => 'gain 1 Edge', run: (c) => c.apply('str', 1, 'self') };
const verdict1: Atom = { id: 'verdict1', kind: 'verdict', pts: 3, fixed: true, say: () => 'gain 1 Verdict', run: (c) => c.apply('verdict', 1, 'self') };
const veil1: Atom = { id: 'veil1', kind: 'veil', pts: 7, fixed: true, say: () => 'gain 1 Veil', run: (c) => c.apply('veil', 1, 'self') };
const catalyze: Atom = { id: 'catalyze', kind: 'catalyze', pts: 2, fixed: true, one: true,
  say: (_k, w) => `attune to the element that beats ${w === 'card' ? 'the target' : w === 'attack' ? 'the attacker' : w === 'skill' ? 'it' : 'its owner'}`,
  run: (c) => c.catalyze(c.tgt) };

/** apply a debuff to one target. */
const debuff = (st: string, name: string, pts: number): Atom => ({
  id: st, kind: st, pts, one: true, say: (k, w) => `apply ${ph(k)} ${name}${T(w)}`, run: (c, n) => c.apply(st, n),
});
const debuffAll = (st: string, name: string, pts: number): Atom => ({
  id: `${st}All`, kind: st, pts, say: (k) => `apply ${ph(k)} ${name} to ALL enemies`, run: (c, n) => c.apply(st, n, 'all'),
});
const buff = (st: string, name: string, pts: number): Atom => ({
  id: st, kind: st, pts, say: (k) => `gain ${ph(k)} ${name}`, run: (c, n) => c.apply(st, n, 'self'),
});
const summon = (st: string, name: string, pts: number): Atom => ({
  id: st, kind: 'companion', pts, say: (k) => `Summon ${name} ${ph(k)}`, run: (c, n) => c.apply(st, n, 'self'),
});

const burn = debuff('burn', 'Burn', 2), burnAll = debuffAll('burn', 'Burn', 3);
const weak = debuff('weak', 'Shaken', 3), weakAll = debuffAll('weak', 'Shaken', 4.5);
const vuln = debuff('vuln', 'Exposed', 3);
const doom = debuff('doom', 'Doom', 0.8), doomAll = debuffAll('doom', 'Doom', 1.2);
const shock = debuff('shock', 'Shock', 1.2), shockAll = debuffAll('shock', 'Shock', 1.8);
const chill = debuff('chill', 'Chill', 1.6), chillAll = debuffAll('chill', 'Chill', 2.4);
const tremor = debuff('tremor', 'Tremor', 1.6), tremorAll = debuffAll('tremor', 'Tremor', 2.4);
const mark = debuff('mark', 'Mark', 3.5), markAll = debuffAll('mark', 'Mark', 5);
const thorns = buff('thorns', 'Barbs', 3.5), charge = buff('charge', 'Charge', 2.5), fortify = buff('fortify', 'Fortify', 1.5);
const sprout: Atom = { id: 'sprout', kind: 'block', pts: 1.1, say: (k) => `next turn, gain ${ph(k)} Guard`, run: (c, n) => c.apply('sprout', n, 'self') };
const wolf = summon('wolf', 'Wolf', 4), bear = summon('bear', 'Bear', 4), hawk = summon('hawk', 'Hawk', 6), serpent = summon('serpent', 'Serpent', 5);

/** v0.11: the atom vocabulary, for the v0.11 card designs (cards11.ts). */
export const ATOMS: Record<string, Atom> = {
  dmg, dmg2, dmgAll, dmgRnd, block, draw1, draw2, bank1, heal, negate, disrupt1, steal1, glint, bury2, exhume1, ante, str1, verdict1, veil1, catalyze,
  burn, burnAll, weak, weakAll, vuln, doom, doomAll, shock, shockAll, chill, chillAll, tremor, tremorAll, mark, markAll, thorns, charge, fortify, sprout,
  wolf, bear, hawk, serpent,
};

/** v0.9 payoff atoms: hit every enemy that carries an element's debuff. Reworked repeats get these first. */
const punish = (st: string, name: string): Atom => ({
  id: `p_${st}`, kind: `p_${st}`, pts: 1.4, say: (k) => `deal ${ph(k)} damage to each enemy with ${name}`,
  run: (c, n) => { for (const f of c.foes) if (c.status(f, st)) c.cb.hit(c.src, f, n, c.kind === 'attack', c.elem); },
});
const vulnAll = debuffAll('vuln', 'Exposed', 4.5);
ATOMS.vulnAll = vulnAll;
for (const [st, name] of [['burn', 'Burn'], ['chill', 'Chill'], ['shock', 'Shock'], ['weak', 'Shaken'], ['tremor', 'Tremor'], ['doom', 'Doom'], ['mark', 'Mark']]) ATOMS[`p_${st}`] = punish(st, name);
/** What a repeat may be reworked into, by printed element (tried in order, then its faction's atoms). */
const REWORK: Record<string, Atom[]> = {
  blaze: [punish('burn', 'Burn'), vuln, str1, vulnAll],
  frost: [punish('chill', 'Chill'), weak, sprout, vuln],
  wild: [sprout, thorns, heal, weak, vuln],
  storm: [punish('shock', 'Shock'), charge, vuln, vulnAll],
  flood: [punish('weak', 'Shaken'), bank1, draw1, vuln],
  stone: [punish('tremor', 'Tremor'), fortify, sprout, vuln],
  radiant: [verdict1, heal, weak, sprout, vuln],
  umbral: [punish('doom', 'Doom'), punish('mark', 'Mark'), veil1, vuln],
  prism: [catalyze, vuln, draw1, sprout],
  none: [vuln, weak, draw1, sprout],
};
const FALLBACK: Atom[] = [vuln, weak, draw1, bank1, heal, sprout, vulnAll, weakAll];

interface PowerSpec { st: string; text: string; pts: number; cost: number }
interface Vocab {
  faction: Faction;
  element?: CardElement;
  /** Secondary effects this faction's cards use. */
  atoms: Atom[];
  /** Effects for Reactions and Counters (defaults to atoms). */
  answers?: Atom[];
  powers: PowerSpec[];
  adj: string[];
  nouns: Partial<Record<CardType, string[]>>;
  icons: string[];
  /** How many cards to make. */
  n: number;
  /** Gilt: some cards read the Fate Coin. */
  coin?: boolean;
  /** Can this faction Negate? */
  negates?: boolean;
}

export const NOUN = {
  attack: ['Strike', 'Slash', 'Lunge', 'Blow', 'Cut', 'Volley', 'Barrage', 'Smite', 'Thrust', 'Rend', 'Swipe', 'Crash', 'Lash', 'Jab', 'Cleave', 'Burst'],
  skill: ['Ward', 'Rite', 'Gambit', 'Stance', 'Shroud', 'Charm', 'Sigil', 'Focus', 'Ploy', 'Veil', 'Mantle', 'Trick', 'Aegis', 'Canticle'],
  reaction: ['Snare', 'Trap', 'Glyph', 'Rune', 'Tripwire', 'Mirror', 'Seal', 'Ambush', 'Pit', 'Coil'],
  counter: ['Retort', 'Rebuff', 'Reply', 'Riposte', 'Refusal', 'Rebuke', 'Answer', 'Denial', 'Parry', 'Comeback'],
  power: ['Oath', 'Aura', 'Covenant', 'Heart', 'Crown', 'Engine', 'Dominion', 'Creed'],
};

const VOCAB: Vocab[] = [
  { faction: 'ember', atoms: [burn, burnAll, str1, block], powers: [{ st: 'stoke9', text: 'At the end of your turn, deal {n} damage to each enemy with Burn.', pts: 6, cost: 2 }, { st: 'kiln', text: 'At the start of your turn, gain {n} Guard for each enemy with Burn.', pts: 5, cost: 2 }],
    adj: ['Cinder', 'Blazing', 'Smouldering', 'Scorching', 'Kindled', 'Ashen', 'Molten', 'Searing', 'Flaring', 'Charred', 'Pyre', 'Torch', 'Furnace', 'Ember', 'Wildfire', 'Sunfire'],
    nouns: NOUN, icons: ['🔥', '🌋', '♨️', '🧨', '☄️', '🕯️', '🔆', '💥'], n: 32 },
  { faction: 'tide', atoms: [weak, weakAll, draw1, bank1, block], negates: true, powers: [{ st: 'undertow9', text: 'At the start of your turn, apply {n} Shaken to a random enemy.', pts: 8, cost: 2 }, { st: 'riptide', text: 'At the end of your turn, gain {n} Guard for each energy you carry over.', pts: 4, cost: 2 }],
    adj: ['Tidal', 'Brine', 'Ebbing', 'Undertow', 'Rippling', 'Coral', 'Fathom', 'Riptide', 'Pearl', 'Moonwater', 'Deepwater', 'Spray', 'Lagoon', 'Current', 'Surf', 'Mist'],
    nouns: NOUN, icons: ['🌊', '💧', '🐚', '🫧', '🐟', '🪸', '🌀', '⚓'], n: 32 },
  { faction: 'thorn', atoms: [thorns, heal, sprout, block], powers: [{ st: 'sap', text: 'At the end of your turn, if you have Barbs, heal {n} HP.', pts: 8, cost: 2 }, { st: 'rootwall', text: 'At the start of your turn, gain {n} Guard for each Barbs you have.', pts: 10, cost: 2 }],
    adj: ['Briar', 'Bramble', 'Thistle', 'Oaken', 'Mossy', 'Rooted', 'Verdant', 'Nettle', 'Heartwood', 'Ivy', 'Barbed', 'Sylvan', 'Hawthorn', 'Fern', 'Bloom', 'Grove'],
    nouns: NOUN, icons: ['🌿', '🌵', '🌳', '🍃', '🌱', '🥀', '🌸', '🍄'], n: 32 },
  { faction: 'void', atoms: [doom, doomAll, vuln, disrupt1, block], negates: true, powers: [{ st: 'entropy', text: 'At the end of your turn, apply {n} Doom to the enemy with the most HP.', pts: 2, cost: 1 }, { st: 'wither', text: 'Whenever a chain of 2+ links resolves, apply {n} Doom to ALL enemies.', pts: 3, cost: 1 }],
    adj: ['Hollow', 'Abyssal', 'Null', 'Starless', 'Gaping', 'Voidborn', 'Silent', 'Rift', 'Eclipsed', 'Severed', 'Nether', 'Bleak', 'Gloom', 'Dread', 'Empty', 'Jinxed'],
    nouns: NOUN, icons: ['🕳️', '🌑', '💀', '👁️', '🔮', '🦴', '⚰️', '🫥'], n: 32 },
  { faction: 'gilt', atoms: [ante, block, draw1], coin: true, negates: true, powers: [{ st: 'dividend', text: 'At the start of your turn, raise your Ante by {n}.', pts: 4, cost: 1 }, { st: 'loaded', text: 'Whenever your Fate Coin flips, deal {n} damage to a random enemy.', pts: 3, cost: 1 }],
    adj: ['Gilded', 'Golden', 'Lucky', 'Crooked', 'Royal', 'Loaded', 'Sterling', 'Ducat', 'Fortune', 'Jackpot', 'Wagered', 'Minted', 'Crowned', 'Gambler', 'High-Stakes', 'Counterfeit'],
    nouns: { ...NOUN, attack: ['Toss', 'Bet', 'Wager', 'Stake', 'Payout', 'Gamble', 'Flip', 'Shakedown', 'Bribe', 'Raise', 'Roll', 'Deal', 'Hustle', 'Squeeze'] },
    icons: ['🪙', '💰', '🎲', '🃏', '🎩', '💎', '👑', '🎰'], n: 32 },
  { faction: 'glass', atoms: [glint, steal1, draw1, block], negates: true, powers: [{ st: 'refract', text: 'Whenever you play a Glint, gain {n} Guard.', pts: 2.5, cost: 1 }, { st: 'hoard', text: 'At the end of your turn, gain {n} Guard for each Reaction you have set.', pts: 3.5, cost: 1 }],
    adj: ['Glass', 'Shard', 'Prism', 'Mirror', 'Crystal', 'Splinter', 'Gleaming', 'Pane', 'Facet', 'Glitter', 'Shiny', 'Crackled', 'Lens', 'Sparkling', 'Thieving', 'Magpie'],
    nouns: NOUN, icons: ['🪞', '💎', '🔷', '✨', '🔪', '🐦‍⬛', '💍', '🧊'], n: 32 },
  { faction: 'grave', atoms: [bury2, exhume1, block, heal], powers: [{ st: 'wake9', text: 'Whenever a card enters your Crypt, deal {n} damage to a random enemy.', pts: 3, cost: 1 }, { st: 'cryptward', text: 'Whenever you Exhume a card, gain {n} Guard.', pts: 2, cost: 1 }],
    adj: ['Gravebound', 'Funeral', 'Mourning', 'Ossuary', 'Barrow', 'Tomb', 'Crypt', 'Wake', 'Shroud', 'Lich', 'Pale', 'Restless', 'Hallowed', 'Sepulchral', 'Bone', 'Coffin'],
    nouns: NOUN, icons: ['🪦', '⚱️', '🦴', '💀', '🕯️', '⛏️', '⚰️', '🧟'], n: 32 },
  { faction: 'storm', atoms: [shock, shockAll, charge, block], powers: [{ st: 'staticfield', text: 'At the end of your turn, apply {n} Shock to ALL enemies.', pts: 3, cost: 1 }, { st: 'capacitor9', text: 'Whenever you spend Charge, gain {n} Guard per Charge spent.', pts: 5, cost: 1 }],
    adj: ['Thunder', 'Static', 'Voltaic', 'Crackling', 'Ionized', 'Galvanic', 'Storm', 'Squall', 'Gale', 'Arcing', 'Lightning', 'Tempest', 'Charged', 'Skyborn', 'Cyclone', 'Sparking'],
    nouns: NOUN, icons: ['⚡', '🌩️', '⛈️', '🌪️', '🔋', '🌀', '🗼', '💫'], n: 50 },
  { faction: 'rime', atoms: [chill, chillAll, block, weak], powers: [{ st: 'hoarfrost', text: 'At the end of your turn, gain {n} Guard for each enemy with Chill.', pts: 5, cost: 2 }, { st: 'shatter9', text: 'Whenever an enemy Freezes, deal {n} damage to ALL enemies.', pts: 1.5, cost: 1 }],
    adj: ['Frozen', 'Rime', 'Glacial', 'Frostbitten', 'Hoarfrost', 'Icebound', 'Wintry', 'Polar', 'Boreal', 'Sleet', 'Snowdrift', 'Crystalline', 'Numbing', 'Arctic', 'Hailstone', 'Permafrost'],
    nouns: NOUN, icons: ['❄️', '🧊', '🌨️', '🏔️', '🥶', '💎', '⛄', '🔹'], n: 50 },
  { faction: 'stone', atoms: [tremor, tremorAll, fortify, block], powers: [{ st: 'bedrock', text: 'At the end of your turn, gain {n} Fortify.', pts: 6, cost: 2 }, { st: 'landslide', text: 'At the end of your turn, if you have 10 or more Guard, deal {n} damage to ALL enemies.', pts: 4, cost: 2 }],
    adj: ['Granite', 'Basalt', 'Bedrock', 'Quarry', 'Boulder', 'Craggy', 'Slate', 'Obsidian', 'Marble', 'Tectonic', 'Seismic', 'Flint', 'Monolithic', 'Cavern', 'Iron', 'Ironstone'],
    nouns: NOUN, icons: ['🪨', '⛰️', '🗿', '🧱', '🏔️', '⛏️', '🌋', '🏛️'], n: 50 },
  { faction: 'dawn', atoms: [verdict1, heal, weak, block, draw1], negates: true, powers: [{ st: 'vigil', text: 'At the start of your turn, gain {n} Verdict.', pts: 7, cost: 1 }, { st: 'absolution', text: 'At the end of your turn, heal {n} HP for each Counter you played this turn.', pts: 7, cost: 2 }],
    adj: ['Dawn', 'Radiant', 'Gleaming', 'Solemn', 'Sworn', 'Righteous', 'Haloed', 'Lawful', 'Sunlit', 'Vigilant', 'Honest', 'Aurora', 'Blessed', 'Sacred', 'Judicial', 'Morning'],
    nouns: { ...NOUN, counter: ['Objection', 'Ruling', 'Retort', 'Writ', 'Veto', 'Rebuttal', 'Injunction', 'Censure', 'Decree', 'Edict'] },
    icons: ['⚖️', '☀️', '✨', '📜', '🔆', '😇', '🏛️', '🕊️'], n: 50 },
  { faction: 'aether', element: 'prism', atoms: [catalyze, draw1, block, vuln], powers: [{ st: 'solvent9', text: 'At the start of your turn, apply {n} Exposed to a random enemy.', pts: 8, cost: 1 }, { st: 'philstone', text: 'Whenever Resonance happens, deal {n} damage to ALL enemies.', pts: 2, cost: 1 }],
    adj: ['Aetheric', 'Alchemical', 'Distilled', 'Volatile', 'Prismatic', 'Quicksilver', 'Transmuted', 'Philosophic', 'Arcane', 'Elemental', 'Catalytic', 'Brewed', 'Essential', 'Spagyric', 'Sublimated', 'Mercurial'],
    nouns: { ...NOUN, attack: ['Flask', 'Vial', 'Tincture', 'Draught', 'Solution', 'Reagent', 'Spray', 'Dose', 'Compound', 'Powder', 'Salt', 'Acid', 'Bomb', 'Fume'] },
    icons: ['⚗️', '🧪', '🜔', '🜂', '🜄', '🜁', '🜃', '🔮'], n: 50 },
  { faction: 'beast', atoms: [wolf, bear, hawk, serpent, burn, block], powers: [{ st: 'kinship', text: 'At the end of your turn, heal {n} HP for each companion you have.', pts: 8, cost: 1 }, { st: 'wolf', text: 'Summon Wolf {n}.', pts: 4, cost: 1 }],
    adj: ['Feral', 'Savage', 'Packbound', 'Howling', 'Untamed', 'Prowling', 'Moonlit', 'Snarling', 'Clawed', 'Thunderhoof', 'Antlered', 'Fanged', 'Primal', 'Stalking', 'Wild', 'Roaring'],
    nouns: { ...NOUN, attack: ['Bite', 'Claw', 'Pounce', 'Gore', 'Maul', 'Charge', 'Rake', 'Fang', 'Talon', 'Trample', 'Snap', 'Tusk', 'Rush', 'Lunge'] },
    icons: ['🐺', '🐻', '🦅', '🐍', '🐾', '🦌', '🐗', '🦊'], n: 50 },
  { faction: 'dusk', atoms: [mark, markAll, veil1, doom, weak], negates: true, powers: [{ st: 'cutthroat', text: 'At the end of your turn, deal {n} damage to each enemy with Mark.', pts: 5, cost: 2 }, { st: 'umbra', text: 'Whenever an attack misses you because of Veil, deal {n} damage to the attacker.', pts: 2.5, cost: 2 }],
    adj: ['Shadow', 'Dusk', 'Moonless', 'Silent', 'Hidden', 'Veiled', 'Midnight', 'Smoky', 'Whispering', 'Umbral', 'Nightshade', 'Twilight', 'Hooded', 'Sable', 'Gloaming', 'Phantom'],
    nouns: { ...NOUN, attack: ['Stab', 'Dagger', 'Shiv', 'Knife', 'Cut', 'Garrote', 'Strike', 'Needle', 'Blade', 'Flurry', 'Kunai', 'Slit', 'Edge', 'Sting'] },
    icons: ['🗡️', '🌑', '🌘', '🎯', '🥷', '🌫️', '🦇', '🕸️'], n: 50 },
];

/** Neutral elemental cards: every class can reach every element (so you can play the matchup). */
const ELEM_VOCAB: { e: CardElement; atoms: Atom[]; adj: string[]; icons: string[] }[] = [
  { e: 'blaze', atoms: [burn, burnAll], adj: ['Flame', 'Fire', 'Inferno', 'Kiln', 'Flare', 'Bonfire'], icons: ['🔥', '🌋'] },
  { e: 'frost', atoms: [chill, chillAll], adj: ['Ice', 'Frost', 'Snow', 'Glacier', 'Hail', 'Winter'], icons: ['❄️', '🧊'] },
  { e: 'wild', atoms: [heal, thorns], adj: ['Leaf', 'Root', 'Vine', 'Thicket', 'Petal', 'Wildwood'], icons: ['🌿', '🍃'] },
  { e: 'storm', atoms: [shock, charge], adj: ['Spark', 'Bolt', 'Thunder', 'Volt', 'Squall', 'Stormcloud'], icons: ['⚡', '🌩️'] },
  { e: 'flood', atoms: [weak, draw1], adj: ['Wave', 'Rain', 'River', 'Flood', 'Torrent', 'Monsoon'], icons: ['🌊', '🌧️'] },
  { e: 'stone', atoms: [tremor, fortify], adj: ['Rock', 'Earth', 'Pebble', 'Cliff', 'Landslide', 'Mountain'], icons: ['🪨', '⛰️'] },
  { e: 'radiant', atoms: [heal, verdict1], adj: ['Sun', 'Light', 'Halo', 'Beacon', 'Daybreak', 'Starlight'], icons: ['☀️', '✨'] },
  { e: 'umbral', atoms: [doom, mark], adj: ['Shade', 'Night', 'Dark', 'Eclipse', 'Gloam', 'Void'], icons: ['🌑', '🌘'] },
];

export const RARITY_MULT: Record<string, number> = { common: 1, uncommon: 1.12, rare: 1.35, legendary: 1.6 };

export function h32(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  return h >>> 0;
}
export const cap = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);
export const slug = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

interface Shape {
  type: CardType;
  cost: number;
  /** Primary atom (scales) or null (the secondary alone). */
  prim: Atom | null;
  trigger?: Trigger;
  counter?: CounterOn;
  /** Share of budget the primary gets. */
  split?: number;
  /** Secondary should be an "ALL" atom or a single-target one. */
  pref?: 'all' | 'one';
}

const SHAPES: Shape[] = [
  { type: 'attack', cost: 1, prim: dmg, split: 0.6 },
  { type: 'attack', cost: 1, prim: dmg2, split: 0.65 },
  { type: 'attack', cost: 2, prim: dmgAll, split: 0.6, pref: 'all' },
  { type: 'attack', cost: 2, prim: dmg, split: 0.65 },
  { type: 'attack', cost: 0, prim: dmg, split: 0.6 },
  { type: 'attack', cost: 1, prim: dmgRnd, split: 0.7 },
  { type: 'skill', cost: 1, prim: block, split: 0.55 },
  { type: 'skill', cost: 1, prim: draw1, pref: 'one' },
  { type: 'skill', cost: 0, prim: null },
  { type: 'skill', cost: 2, prim: block, split: 0.55, pref: 'all' },
  { type: 'reaction', cost: 1, prim: block, trigger: 'attack', split: 0.55 },
  { type: 'reaction', cost: 0, prim: null, trigger: 'attack' },
  { type: 'reaction', cost: 1, prim: block, trigger: 'skill', split: 0.5 },
  { type: 'reaction', cost: 1, prim: dmg, trigger: 'reaction', split: 0.5 },
  { type: 'counter', cost: 1, prim: block, counter: 'attack', split: 0.55 },
  { type: 'counter', cost: 0, prim: dmg, counter: 'reaction', split: 0.55 },
  { type: 'attack', cost: 3, prim: dmg, split: 0.65 },
  { type: 'attack', cost: 2, prim: dmg2, split: 0.65 },
  { type: 'skill', cost: 1, prim: null },
  { type: 'skill', cost: 2, prim: draw2 },
  { type: 'reaction', cost: 1, prim: dmg, trigger: 'attack', split: 0.55 },
  { type: 'counter', cost: 1, prim: block, counter: 'reaction', split: 0.5 },
  { type: 'counter', cost: 0, prim: null, counter: 'attack' },
];

const WHEN: Record<string, string> = {
  attack: 'When attacked: ', skill: 'When an enemy uses a non-attack: ', reaction: 'When an enemy trap activates: ',
};
const COUNTER_WHEN: Record<string, string> = {
  attack: 'Counter (an attack): ', reaction: 'Counter (a trap or Reaction): ', skill: 'Counter (a non-attack): ', any: 'Counter (anything an enemy does): ',
};

function where(sh: Shape): Where {
  if (sh.type === 'reaction') return sh.trigger === 'attack' ? 'attack' : sh.trigger === 'skill' ? 'skill' : 'trap';
  if (sh.type === 'counter') return sh.counter === 'attack' ? 'attack' : sh.counter === 'skill' ? 'skill' : 'trap';
  return 'card';
}

function budget(sh: Shape, rarity: string): number {
  const base = [4, 7, 13.5, 20][sh.cost] ?? sh.cost * 6.8;
  const tm = sh.type === 'reaction' ? 1.3 : sh.type === 'counter' ? 1.2 : 1;
  return base * tm * RARITY_MULT[rarity];
}

/** Build one card from a shape and atoms. */
function build(o: {
  id: string; name: string; faction: Faction; element?: CardElement; rarity: Rarity; sh: Shape; sec: Atom; third?: Atom; icon: string; coin?: boolean;
}): CardDef | null {
  const { sh, sec } = o;
  const w = where(sh);
  let pts = budget(sh, o.rarity);
  const fixedPts = (sh.prim?.fixed ? sh.prim.pts : 0) + (sec.fixed ? sec.pts : 0) + (o.third?.fixed ? o.third.pts : 0);
  // Too rich for its cost: skip it (a 0-cost card can't give permanent Strength).
  if (fixedPts > pts + 1) return null;
  const parts: { a: Atom; key: string }[] = [];
  if (sh.prim) parts.push({ a: sh.prim, key: 'p' });
  parts.push({ a: sec, key: 's' });
  if (o.third) parts.push({ a: o.third, key: 't' });
  // Every card has at least one number that grows when upgraded.
  if (!parts.some((p) => !p.a.fixed)) parts.push({ a: block, key: 't' });
  // Fixed atoms take their cost off the top; scalable ones share the rest.
  for (const p of parts) if (p.a.fixed) pts -= p.a.pts;
  const scal = parts.filter((p) => !p.a.fixed);
  const v: Vals = {};
  const up: Vals = {};
  if (scal.length) {
    const shares = scal.length === 1 ? [1] : scal.length === 2 ? [sh.split ?? 0.6, 1 - (sh.split ?? 0.6)] : [0.5, 0.3, 0.2];
    let bad = false;
    scal.forEach((p, i) => {
      const val = Math.max(1, Math.round((Math.max(pts, 2) * shares[i]) / p.a.pts));
      // Damage and Block below 3 read as filler: skip those cards.
      const min = p.a.id === 'dmg2' ? 3 : p.a.id === 'dmgRnd' ? 2 : p.a.id === 'dmgAll' ? 3 : 4;
      if ((p.a.kind === 'dmg' || p.a.kind === 'block') && val < min) bad = true;
      // v0.9: a payoff below 3 damage is filler too.
      if (p.a.kind.startsWith('p_') && val < 3) bad = true;
      v[p.key] = val;
      up[p.key] = Math.max(val + 1, Math.round(val * 1.34));
    });
    if (bad) return null;
  }
  const clauses = parts.map((p) => p.a.say(p.key, w));
  let text: string;
  if (o.coin && sh.type !== 'power') {
    // Gilt: the Fate Coin chooses between the two halves, then flips.
    const [a, b] = clauses.length >= 2 ? [clauses[0], clauses[1]] : [clauses[0], clauses[0]];
    text = `${sh.type === 'reaction' ? WHEN[sh.trigger!] : sh.type === 'counter' ? COUNTER_WHEN[sh.counter!] : ''}☀ ${a}. ☾ ${b}. Flip.`;
  } else if (w === 'card') text = clauses.map((x) => cap(x)).join('. ') + '.';
  else {
    const head = sh.type === 'reaction' ? WHEN[sh.trigger!] : COUNTER_WHEN[sh.counter!];
    text = head + clauses.join(' and ') + '.';
  }
  // Prism cards say so.
  if (o.element === 'prism' && sh.type !== 'power') text = `Prism. ${text}`;
  const pv = Object.keys(v).length ? up : undefined;
  const run = (c: Ctx, vv: Vals): void => {
    if (o.coin && parts.length >= 2) {
      const sun = c.sun, moon = c.moon;
      if (sun) parts[0].a.run(c, vv[parts[0].key] ?? 0);
      if (moon) parts[1].a.run(c, vv[parts[1].key] ?? 0);
      c.flip();
      return;
    }
    if (o.coin) { parts[0].a.run(c, vv[parts[0].key] ?? 0); c.flip(); return; }
    for (const p of parts) p.a.run(c, vv[p.key] ?? 0);
  };
  const def: CardDef = {
    id: o.id, name: o.name, faction: o.faction, type: sh.type, rarity: o.rarity, cost: sh.cost, v, text, icon: o.icon, gen: true,
  };
  if (o.element) def.element = o.element;
  if (pv) def.up = pv;
  if (sh.type === 'reaction') { def.trigger = sh.trigger; def.react = run; }
  else if (sh.type === 'counter') { def.counter = sh.counter; def.react = run; }
  else {
    def.play = run;
    def.target = parts.some((p) => p.a.one);
  }
  return def;
}

function powerCard(o: { id: string; name: string; faction: Faction; element?: CardElement; rarity: Rarity; p: PowerSpec; icon: string }): CardDef {
  const pts = ([4, 7, 13.5, 20][o.p.cost] ?? 7) * RARITY_MULT[o.rarity] * 1.1;
  const n = Math.max(1, Math.round(pts / o.p.pts));
  const st = o.p.st;
  return {
    id: o.id, name: o.name, faction: o.faction, type: 'power', rarity: o.rarity, cost: o.p.cost, v: { n }, up: { n: n + 1 },
    text: o.p.text, icon: o.icon, gen: true, element: o.element, play: (c, v) => c.apply(st, v.n, 'self'),
  };
}

const RARITY_CYCLE: Rarity[] = ['common', 'uncommon', 'common', 'rare', 'common', 'uncommon', 'common', 'uncommon', 'rare', 'common', 'uncommon'];

/** v0.9: how a card reads with its numbers filled in (Prism prefix dropped). */
export function filledText(c: CardDef): string {
  return c.text.replace(/\{(\w+)\}/g, (_, k) => String(c.v[k] ?? '?')).replace(/^Prism\. /, '');
}
/** v0.9: the shape of a card's rules: type, cost, trigger, element and text with the numbers blanked. */
export function redundancyKey(c: CardDef, anyElement = false): string {
  const el = anyElement ? '*' : c.element ?? FACTION_ELEMENT[c.faction] ?? 'none';
  return [c.type, c.cost, c.trigger ?? '', c.counter ?? '', el, c.exhaust ? 'X' : '', filledText(c).replace(/\d+/g, 'N')].join('|');
}
const nums = (c: CardDef): number[] => (filledText(c).match(/\d+/g) ?? []).map(Number);
/** v0.9: same key and every number within 2 (or 25%) of the other's: a player can't tell them apart. */
export function redundant(a: CardDef, b: CardDef, anyElement = false): boolean {
  if (redundancyKey(a, anyElement) !== redundancyKey(b, anyElement)) return false;
  const x = nums(a), y = nums(b);
  return x.length === y.length && x.every((n, i) => Math.abs(n - y[i]) <= Math.max(2, 0.25 * Math.max(n, y[i])));
}

/** v0.9: what the redundancy pass did to each generated card it touched (for docs and the catalog). */
export interface GenChange { id: string; name: string; faction: Faction; was: string; now: string | null; clash: string }
export const GEN_CHANGES: GenChange[] = [];

/** Make the systematic pool from the hand-made cards already in `existing` (names and ids in use are skipped). */
export function generateCards(existing: CardDef[]): CardDef[] {
  const takenNames = new Set(existing.map((c) => c.name));
  const takenIds = new Set(existing.map((c) => c.id));
  const out: CardDef[] = [];
  // Everything a new card must not repeat: collectible hand-made cards, then each card as it's made.
  const seen = new Map<string, CardDef[]>();
  const loose = new Map<string, CardDef[]>();
  const remember = (c: CardDef): void => {
    const k = redundancyKey(c), l = redundancyKey(c, true);
    (seen.get(k) ?? seen.set(k, []).get(k)!).push(c);
    (loose.get(l) ?? loose.set(l, []).get(l)!).push(c);
  };
  // A rework must also differ from every card in other elements (else it's the same card in a new colour).
  const clash = (c: CardDef, strict = false): CardDef | undefined => (seen.get(redundancyKey(c)) ?? []).find((x) => redundant(x, c))
    ?? (strict ? (loose.get(redundancyKey(c, true)) ?? []).find((x) => redundant(x, c, true)) : undefined);
  for (const c of existing) if (!['enemy', 'curse'].includes(c.faction) && c.rarity !== 'starter' && c.rarity !== 'special') remember(c);
  /** Build a card; if it repeats one already made, swap its second effect until it doesn't, else cut it. */
  const unique = (o: Parameters<typeof build>[0], own: Atom[]): CardDef | null => {
    const card = build(o);
    if (!card) return null;
    const hit = clash(card);
    if (!hit) { remember(card); return card; }
    const el = o.element ?? FACTION_ELEMENT[o.faction] ?? 'none';
    const tried = new Set<string>([o.sec.id]);
    for (const alt of [...(REWORK[el] ?? []), ...own, ...FALLBACK]) {
      if (tried.has(alt.id)) continue;
      tried.add(alt.id);
      if (o.sh.prim && alt.kind === o.sh.prim.kind) continue;
      if (o.sh.pref === 'all' && alt.one) continue;
      if (o.sh.type === 'skill' && !o.sh.prim && alt.kind === 'draw') continue;
      const third = o.third && o.third.kind !== alt.kind ? o.third : undefined;
      const re = build({ ...o, sec: alt, third });
      if (!re || clash(re, true)) continue;
      re.id = card.id;
      GEN_CHANGES.push({ id: card.id, name: card.name, faction: card.faction, was: filledText(card), now: filledText(re), clash: hit.id });
      remember(re);
      return re;
    }
    GEN_CHANGES.push({ id: card.id, name: card.name, faction: card.faction, was: filledText(card), now: null, clash: hit.id });
    return null;
  };
  const claim = (adjs: string[], nouns: string[], seed: string): string | null => {
    const h = h32(seed);
    for (let i = 0; i < adjs.length * nouns.length; i++) {
      const a = adjs[(h + i) % adjs.length];
      const n = nouns[(Math.floor(h / 7) + i * 3) % nouns.length];
      const name = `${a} ${n}`;
      if (!takenNames.has(name)) { takenNames.add(name); return name; }
    }
    return null;
  };
  const idFor = (f: string, name: string): string => {
    let id = slug(name);
    if (takenIds.has(id)) id = `${f}_${id}`;
    let k = 2;
    while (takenIds.has(id)) id = `${f}_${slug(name)}_${k++}`;
    takenIds.add(id);
    return id;
  };

  for (const vc of VOCAB) {
    let made = 0;
    // Two powers per faction, then templates × secondary atoms in a stable shuffled order.
    vc.powers.forEach((p, i) => {
      const name = claim(vc.adj, vc.nouns.power ?? NOUN.power, `${vc.faction}:power:${i}`);
      if (!name) return;
      const pc = powerCard({ id: idFor(vc.faction, name), name, faction: vc.faction, element: vc.element, rarity: i ? 'rare' : 'uncommon', p, icon: vc.icons[i % vc.icons.length] });
      remember(pc);
      out.push(pc);
      made++;
    });
    const combos: { sh: Shape; sec: Atom; third?: Atom }[] = [];
    for (const sh of SHAPES) {
      for (const sec of vc.atoms) {
        if (sh.prim && sec.kind === sh.prim.kind) continue;
        if (sh.pref === 'all' && sec.one) continue;
        if (sh.type === 'skill' && !sh.prim && sec.kind === 'draw') continue;
        if (sh.type === 'counter' && sh.counter === 'reaction' && sec.kind === 'dmg') continue;
        combos.push({ sh, sec });
      }
      // Negating answers for the factions that can Negate.
      if (vc.negates && (sh.type === 'counter' && sh.counter === 'reaction')) combos.push({ sh: { ...sh, prim: negate, cost: 1 }, sec: vc.atoms.find((a) => !a.fixed) ?? block });
      if (vc.negates && sh.type === 'reaction' && sh.trigger === 'skill') combos.push({ sh: { ...sh, prim: negate }, sec: vc.atoms.find((a) => !a.fixed) ?? block });
    }
    combos.sort((a, b) => h32(`${vc.faction}${a.sh.type}${a.sh.cost}${a.sh.prim?.id}${a.sec.id}`) - h32(`${vc.faction}${b.sh.type}${b.sh.cost}${b.sh.prim?.id}${b.sec.id}`));
    // Interleave types so every faction gets a spread (attacks, skills, Reactions, Counters).
    const byType: Record<string, typeof combos> = {};
    for (const c of combos) (byType[c.sh.type] ??= []).push(c);
    const order = ['attack', 'skill', 'attack', 'reaction', 'skill', 'counter', 'attack', 'reaction'];
    const idx: Record<string, number> = {};
    for (let i = 0; made < vc.n && i < 500; i++) {
      const t = order[i % order.length];
      const list = byType[t] ?? [];
      const j = idx[t] ?? 0;
      if (j >= list.length) continue;
      idx[t] = j + 1;
      const cb = list[j];
      const nouns = vc.nouns[cb.sh.type] ?? NOUN[cb.sh.type as keyof typeof NOUN] ?? NOUN.skill;
      const name = claim(vc.adj, nouns, `${vc.faction}:${cb.sh.type}:${j}`);
      if (!name) continue;
      let rarity = RARITY_CYCLE[made % RARITY_CYCLE.length];
      // Single-effect cards stay common; rares get a third effect so they do something more.
      if (!cb.sh.prim) rarity = 'common';
      const third = rarity === 'rare' ? vc.atoms.find((a) => a !== cb.sec && a.kind !== cb.sec.kind && a.kind !== cb.sh.prim?.kind && !(cb.sh.pref === 'all' && a.one)) : undefined;
      const o = {
        id: `?${name}`, name, faction: vc.faction, element: vc.element, rarity, sh: cb.sh, sec: cb.sec, third,
        icon: vc.icons[h32(name) % vc.icons.length], coin: vc.coin && (made % 3 === 0) && cb.sh.type !== 'power',
      };
      if (!build(o)) { takenNames.delete(name); continue; }
      // v0.9: a cut repeat still uses its slot, so every later card keeps its name, id and rarity.
      const id = idFor(vc.faction, name);
      made++;
      const card = unique({ ...o, id }, vc.atoms);
      if (card) out.push(card);
    }
  }

  // Neutral elemental cards: 12 per element.
  const ESHAPES: Shape[] = [SHAPES[0], SHAPES[1], SHAPES[2], SHAPES[6], SHAPES[7], SHAPES[8], SHAPES[10], SHAPES[11], SHAPES[12], SHAPES[14], SHAPES[15], SHAPES[3], SHAPES[16], SHAPES[18]];
  for (const ev of ELEM_VOCAB) {
    ESHAPES.forEach((sh, i) => {
      let sec = ev.atoms[i % ev.atoms.length];
      if (sh.pref === 'all' && sec.one) sec = ev.atoms.find((a) => !a.one) ?? block;
      if (sh.prim && sec.kind === sh.prim.kind) sec = ev.atoms.find((a) => a.kind !== sh.prim!.kind) ?? draw1;
      const nouns = NOUN[sh.type as keyof typeof NOUN] ?? NOUN.skill;
      const name = claim(ev.adj, nouns, `neutral:${ev.e}:${i}`);
      if (!name) return;
      const o = {
        id: `?${name}`, name, faction: 'neutral' as Faction, element: ev.e, rarity: RARITY_CYCLE[(i + 1) % RARITY_CYCLE.length], sh, sec,
        icon: ev.icons[i % ev.icons.length],
      };
      if (!build(o)) { takenNames.delete(name); return; }
      const card = unique({ ...o, id: idFor('neutral', name) }, ev.atoms);
      if (card) out.push(card);
    });
  }
  return out;
}
