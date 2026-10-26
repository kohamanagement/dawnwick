// v0.11 "Branching Paths": 1,4xx new cards that take the pool past 2,500. Three kinds, all written in the
// design language of dsl11.ts (each row names the card, its shape and its effects; the compiler prices
// the numbers on the balance yardstick and writes the rules text):
//
//  1. Class-pair hybrids (HYBRIDS): three cards for each of the 78 pairs of the 13 classes' home factions.
//     A hybrid belongs to both factions, so either class can draft it, and it mixes their mechanics
//     (Burn that pays off on Thorns, Doom that grows on a Frozen enemy...).
//  2. Evolve cards (EVOLVES): five per faction. Play one N times in fights you win and it becomes its
//     evolved form for the rest of the run (same cost and role, stronger, with an extra effect).
//  3. Powers (POWERS): four new ones per faction, each with its own status.
//  4. Faction sets (sets11.ts): designs built from each faction's effects and conditions, kept only when
//     their rules text is new for their type (see `buildV11`).
//
// Every card is checked against the whole pool: no new card may repeat another card's rules text for
// its type and element (numbers blanked, at any cost), and the v0.9 redundancy test must still find 0 pairs.
import type { CardDef, CardElement, Faction } from '../engine/types';
import type { Combat, Ctx } from '../engine/combat';
import { STATUSES } from './statuses';
import { compile, compilePower, DesignError, type Design } from './dsl11';
import { FACTION_ELEMENT } from './elements';
import { redundancyKey, redundant, filledText, slug } from './cardgen';
import { setGroups } from './sets11';

type Row = [name: string, code: string, fx: string, icon: string];

// ═══════════════════ 1. CLASS-PAIR HYBRIDS (78 pairs × 3) ═══════════════════
// Home factions: Duelist ember, Warden thorn, Hollow void, Cardsharp gilt, Magpie glass, Sexton grave,
// Arbiter dawn, Tempest storm, Rimeblade rime, Beastcaller beast, Geomancer stone, Alchemist aether, Nightblade dusk.
const HYBRIDS: [Faction, Faction, Row[]][] = [
  ['ember', 'thorn', [['Bramblefire', 'A1u', 'dmg burn thr:p_burn', '🔥'], ['Smoulder Hedge', 'Ra1u', 'thorns burn', '🌵'], ['Ash Bloom', 'S1r', 'sprout burnAll hurt:heal', '🌸']]],
  ['ember', 'void', [['Cinder Hex', 'A1u', 'dmg burn td:doom', '🕯️'], ['Pyre of Endings', 'Rs1u', 'doom burn', '⚰️'], ['Ashen Omen', 'S2rX', 'x2_burn x2_doom', '💀']]],
  ['ember', 'gilt', [['Hot Streak', 'A1u', 'dmg sun:burn moon:ante flip', '🎲'], ['Molten Ante', 'Ca1u', 'block ante:burn', '🪙'], ['Burning Bet', 'S0u', 'lose3 ante', '🧨']]],
  ['ember', 'glass', [['Shard Flare', 'A0u', 'dmg gl:burn', '💥'], ['Glassblower', 'S1r', 'glint burnAll', '🔆'], ['Stolen Spark', 'Rr1u', 'dmg stl:burnAll', '🐦‍⬛']]],
  ['ember', 'grave', [['Funeral Pyre', 'A2u', 'dmgAll cry:burnAll', '⚱️'], ['Cremation', 'S1u', 'bury2 p_burn', '🔥'], ['Ember Wake', 'Rs1r', 'exhume1 burn', '🕯️']]],
  ['ember', 'dawn', [['Trial by Fire', 'A1u', 'dmg burn vd:p_burn', '⚖️'], ['Purifying Flame', 'S1u', 'heal burnAll', '☀️'], ['Searing Verdict', 'Cr1r', 'negate tb:verdict2', '📜']]],
  ['ember', 'storm', [['Firestorm', 'A2u', 'dmgAll shockAll tb:burnAll', '🌪️'], ['Plasma Lash', 'A1r', 'dmg burn cg:x2_burn', '⚡'], ['Arc Kiln', 'Ra1u', 'shock burn', '🔋']]],
  ['ember', 'rime', [['Steamburst', 'A1u', 'dmg tc:burn tb:chill', '♨️'], ['Thermal Shock', 'A2r', 'dmg chill frz:x2_burn', '🧊'], ['Fog of Embers', 'Ra1u', 'block chill burn', '🌫️']]],
  ['ember', 'beast', [['Hellhound', 'S1u', 'wolf burn', '🐺'], ['Fire Hawk', 'S2r', 'hawk burnAll', '🦅'], ['Scorched Pack', 'A1u', 'dmg cmp:burn', '🐾']]],
  ['ember', 'stone', [['Magma Fist', 'A2u', 'dmg tremor tb:x2_tremor', '🌋'], ['Lava Wall', 'S1u', 'block fortify tt:burn', '🧱'], ['Obsidian Kiln', 'Ra1u', 'block fort:burn', '🪨']]],
  ['ember', 'aether', [['Phlogiston', 'A1u', 'dmg vuln tb:burn', '⚗️'], ['Calcinate', 'S1u', 'catalyze burn', '🜂'], ['Volatile Flask', 'A0r', 'dmg att:burn', '🧪']]],
  ['ember', 'dusk', [['Cinder Smoke', 'S2u', 'veil1 burnAll', '💨'], ['Branded Mark', 'A1u', 'dmg mark tb:mark', '🎯'], ['Kindled Shadow', 'Ca1r', 'veil1 burn', '🌘']]],
  ['thorn', 'void', [['Rotting Thicket', 'Ra1u', 'thorns doom', '🥀'], ['Blight', 'S1u', 'doomAll thr:heal', '🍂'], ['Withering Vine', 'A1u', 'dmg td:sprout', '🌿']]],
  ['thorn', 'gilt', [['Golden Bough', 'S1u', 'sprout ante', '🌳'], ['Lucky Clover', 'S0u', 'sun:heal moon:thorns flip', '🍀'], ['Thorny Wager', 'Ra1r', 'thorns ante:thornsBig', '🎰']]],
  ['thorn', 'glass', [['Crystal Rose', 'Ra1u', 'thorns glint', '🌹'], ['Glass Garden', 'S1u', 'sprout gl:heal', '🪴'], ['Prickly Thief', 'Rr1r', 'steal1 thorns', '🦔']]],
  ['thorn', 'grave', [['Grave Moss', 'S1u', 'heal bury2', '🍃'], ['Root and Bone', 'Ra1u', 'block cry:thorns', '🦴'], ['Ossuary Bloom', 'S2r', 'exhume1 sprout', '🌺']]],
  ['thorn', 'dawn', [['Sacred Grove', 'S1u', 'heal verdict1', '🌳'], ['Briar Oath', 'Ra1u', 'thorns vd:block', '🌵'], ['Mercy Thorn', 'Ca1r', 'block hurt:heal', '🕊️']]],
  ['thorn', 'storm', [['Lightning Rod Oak', 'Ra1u', 'thorns charge', '🌩️'], ['Static Bramble', 'A1u', 'dmg thr:shock', '⚡'], ['Thundergrowth', 'S1r', 'sprout shockAll', '🌱']]],
  ['thorn', 'rime', [['Frostbramble', 'Ra1u', 'thorns chill', '❄️'], ['Winter Hedge', 'S1u', 'block tc:sprout', '🌲'], ['Hoarvine', 'Ra1r', 'block chill thr:weak', '🍃']]],
  ['thorn', 'beast', [['Boar Thicket', 'S1u', 'bear thorns', '🐗'], ['Den Mother', 'S2r', 'bear heal', '🐻'], ['Burr Coat', 'Ra1u', 'thorns cmp:block', '🦔']]],
  ['thorn', 'stone', [['Rootrock', 'S1u', 'fortify thorns', '🪨'], ['Living Wall', 'S2u', 'block fortify thr:sprout', '🧱'], ['Bramble Quake', 'Ra1r', 'tremor thorns', '🌋']]],
  ['thorn', 'aether', [['Herbal Tincture', 'S1u', 'heal catalyzeF', '🧪'], ['Thorn Elixir', 'S0u', 'thorns el2:heal', '⚗️'], ['Verdant Reagent', 'A1u', 'dmg att:sprout', '🌿']]],
  ['thorn', 'dusk', [['Hidden Thorns', 'Ra1u', 'thorns veil:thornsBig', '🌘'], ['Shade Bower', 'S2u', 'veil1 sprout', '🌫️'], ['Poisoned Briar', 'A1r', 'dmg mark hurt:heal', '🥀']]],
  ['void', 'gilt', [['Doomsday Bet', 'A1u', 'dmg sun:doom moon:vuln flip', '🎲'], ['Null Dividend', 'S1u', 'ante td:draw1', '🕳️'], ['Black Chip', 'Cr1r', 'disrupt1 ante', '⚫']]],
  ['void', 'glass', [['Hollow Mirror', 'Rr1u', 'steal1 doom', '🪞'], ['Void Shard', 'A0u', 'dmg gl:doom', '🔷'], ['Abyssal Lens', 'S2r', 'draw1 doomAll stl:x2_doom', '👁️']]],
  ['void', 'grave', [['Tolling Knell', 'A2u', 'dmg cry:doomAll', '🔔'], ['Restless Doom', 'Rs1u', 'doom bury2', '🪦'], ['Final Rest', 'S2r', 'exhume1 x2_doom', '⚰️']]],
  ['void', 'dawn', [['Doom Verdict', 'A1u', 'dmg vd:doom', '⚖️'], ['Null Writ', 'Cs1u', 'negate doom', '📜'], ['Final Absolution', 'S1r', 'verdict1 td:heal', '🕯️']]],
  ['void', 'storm', [['Dark Current', 'A1u', 'dmg shock tv:charge', '🌀'], ['Static Void', 'Rr1u', 'doom shockAll', '🌩️'], ['Event Horizon', 'A2r', 'dmgAll doomAll ts:x2_doom', '🕳️']]],
  ['void', 'rime', [['Zero Point', 'A1u', 'dmg chill frz:x2_doom', '🥶'], ['Cold Void', 'S1u', 'chillAll doomAll', '🌑'], ['Black Ice', 'Ra1r', 'block chill frz:doom', '🧊']]],
  ['void', 'beast', [['Carrion Crow', 'S1u', 'hawk doom', '🐦‍⬛'], ['Dire Wolf', 'S2u', 'wolf doomAll', '🐺'], ['Hungry Dark', 'A1r', 'dmg vuln cmp:doom', '🦇']]],
  ['void', 'stone', [['Sinkhole', 'A2u', 'dmg tremor tv:x2_tremor', '🕳️'], ['Gravity Well', 'S2u', 'tremorAll doomAll', '🌑'], ['Crushing Null', 'Ra1r', 'block fortify tt:doom', '🪨']]],
  ['void', 'aether', [['Entropic Flask', 'A1u', 'dmg vuln att:doom', '⚗️'], ['Null Reagent', 'S0u', 'catalyze doom', '🧪'], ['Dissolution', 'S1r', 'vulnAll td:x2_doom', '🫥']]],
  ['void', 'dusk', [['Eclipse Blade', 'A1u', 'dmg mark td:mark', '🌘'], ['Umbral Shroud', 'S2u', 'veil1 doom', '🌫️'], ['Mark of Ending', 'A2r', 'dmg doom tm:x2_doom', '🎯']]],
  ['gilt', 'glass', [["Fool's Gold", 'S1u', 'glint ante', '🪙'], ['Card Trick', 'A1u', 'dmg sun:glint moon:ante flip', '🃏'], ["Pickpocket's Bet", 'Rr1r', 'steal1 ante', '💰']]],
  ['gilt', 'grave', [['Grave Robbery', 'S1u', 'bury2 ante', '⛏️'], ['Dead Hand Draw', 'A1u', 'dmg cry:ante', '🃏'], ['Coin for the Ferryman', 'Cr1r', 'exhume1 ante', '🪙']]],
  ['gilt', 'dawn', [['Honest Wager', 'S1u', 'verdict1 ante', '⚖️'], ['Gavel Toss', 'A1u', 'dmg sun:verdict1 moon:block flip', '🔨'], ['Bail Bond', 'Ca1r', 'block vd:ante', '📜']]],
  ['gilt', 'storm', [['Lightning Lottery', 'A2u', 'dmgRnd sun:shockAll moon:charge flip', '🎰'], ['Charged Chip', 'S1u', 'ante cg:draw1', '🔋'], ['Jackpot Bolt', 'A2r', 'dmg ante:xcharge', '⚡']]],
  ['gilt', 'rime', [['Cold Cash', 'A1u', 'dmg chill ante:chill', '🧊'], ['Frozen Assets', 'S1u', 'block sun:chillAll moon:ante flip', '❄️'], ['Ice Dealer', 'Ca1r', 'chill block frz:ante', '🎩']]],
  ['gilt', 'beast', [['Lucky Rabbit', 'S1u', 'hawk ante', '🐇'], ['Wolf Gambit', 'S1u', 'sun:wolf moon:bear flip', '🐺'], ['Pack Bet', 'A1r', 'dmg cmp:ante', '🐾']]],
  ['gilt', 'stone', [['Gold Vein', 'S1u', 'fortify ante', '⛏️'], ['Landslide Odds', 'A2u', 'dmgAll sun:tremorAll moon:block flip', '🎲'], ['Bullion Wall', 'Ra1r', 'block ante:fortify', '🧱']]],
  ['gilt', 'aether', [['Transmute Gold', 'S1u', 'catalyzeF ante', '🜔'], ["Alchemist's Bet", 'A1u', 'dmg sun:vuln moon:draw1 flip', '⚗️'], ["Philosopher's Coin", 'S1r', 'draw1 el2:ante', '🪙']]],
  ['gilt', 'dusk', [['Loaded Dagger', 'A0u', 'dmg sun:mark flip', '🗡️'], ['Shadow Market', 'S2u', 'veil1 ante', '🌘'], ["Assassin's Fee", 'A1r', 'dmg tm:xante', '💰']]],
  ['glass', 'grave', [['Shattered Urn', 'S1u', 'glint bury2', '⚱️'], ['Mirror Crypt', 'Rr1u', 'dmg cry:steal1', '🪞'], ['Bone Prism', 'A1r', 'dcrypt gl:draw1', '🦴']]],
  ['glass', 'dawn', [['Crystal Writ', 'Cr1r', 'negate glint', '💎'], ['Glass Gavel', 'A1u', 'dmg vd:glint', '🔨'], ['Clear Conscience', 'S2r', 'draw1 verdict1 gl:heal', '✨']]],
  ['glass', 'storm', [['Prism Bolt', 'A1u', 'dmg shock gl:charge', '⚡'], ['Static Shards', 'S1u', 'glint shockAll', '🔷'], ['Lightning Glass', 'Rr1r', 'steal1 shock', '🌩️']]],
  ['glass', 'rime', [['Icicle Shard', 'A0u', 'dmg gl:chill', '🧊'], ['Frost Mirror', 'Ra1u', 'chill glint', '🪞'], ['Crystal Freeze', 'S1r', 'chillAll frz:glint2', '❄️']]],
  ['glass', 'beast', [['Magpie Familiar', 'S1u', 'hawk glint', '🐦‍⬛'], ['Glitterbait', 'S1u', 'glint cmp:draw1', '💍'], ['Thieving Fox', 'A2r', 'dmg steal1 cmp:glint', '🦊']]],
  ['glass', 'stone', [["Thieves' Geode", 'S1u', 'fortify glint', '💎'], ['Crystal Quake', 'A2u', 'dmgAll tremorAll gl:fortify', '🔷'], ['Mirror Wall', 'Ra1r', 'block glint stl:fortify', '🪞']]],
  ['glass', 'aether', [['Prism Glass', 'S1u', 'glint catalyzeF', '🔮'], ['Refraction', 'A1u', 'dmg gl:vuln', '✨'], ['Lens Grinder', 'S2r', 'draw1 glint el2:draw1', '🔍']]],
  ['glass', 'dusk', [['Sleight of Shadow', 'S2u', 'veil1 glint2', '🌘'], ['Glinting Knife', 'A1u', 'dmg tm:glint', '🔪'], ['Cat Burglar', 'Rr1r', 'steal1 mark', '🐈‍⬛']]],
  ['grave', 'dawn', [['Funeral Rite', 'S1u', 'bury2 verdict1', '🕯️'], ['Last Testament', 'Cr1u', 'negate cry:verdict1', '📜'], ['Saintly Relics', 'S1r', 'heal xverdict cry:draw1', '⚱️']]],
  ['grave', 'storm', [['Galvanized Corpse', 'S2u', 'exhume1 charge', '🧟'], ['Thunder Tomb', 'A2u', 'dmgAll cry:shockAll', '⛈️'], ['Crackling Bones', 'Rs1r', 'bury2 shock', '🦴']]],
  ['grave', 'rime', [['Cold Grave', 'S1u', 'bury2 chillAll', '🪦'], ['Frozen Crypt', 'Ra1u', 'block cry:chill', '🧊'], ['Permafrost Tomb', 'S1r', 'exhume1 chill', '❄️']]],
  ['grave', 'beast', [['Bone Hound', 'S1u', 'wolf bury2', '🐕'], ['Carrion Feast', 'A1u', 'dmg cry:heal', '🦴'], ['Spirit Pack', 'S2r', 'exhume1 bcomp', '👻']]],
  ['grave', 'stone', [['Barrow Stone', 'S1u', 'fortify bury2', '🪨'], ['Tombstone Slam', 'A2u', 'dmg cry:tremor', '🪦'], ['Catacomb Wall', 'Ra1r', 'block exh:fortify', '🧱']]],
  ['grave', 'aether', [['Embalming Fluid', 'S1u', 'bury2 catalyzeF', '🧪'], ['Necro-Reagent', 'A1u', 'dmg cry:vuln', '⚗️'], ['Distilled Soul', 'S1r', 'exhume1 el2:draw1', '👻']]],
  ['grave', 'dusk', [["Gravedigger's Knife", 'A1u', 'dmg cry:mark', '🔪'], ["Widow's Veil", 'Ra1u', 'veil1 bury2', '🌫️'], ['Wake of Shadows', 'S1r', 'markAll exh:veil1', '🌘']]],
  ['dawn', 'storm', [['Thunder Verdict', 'A1u', 'dmg vd:shock', '⚡'], ['Bolt of Judgment', 'Cr1u', 'negate charge', '🌩️'], ['Storm Oath', 'S1r', 'verdict1 charge ctr:energy1', '🔋']]],
  ['dawn', 'rime', [['Cold Justice', 'A1u', 'dmg chill frz:verdict1', '⚖️'], ['Frozen Gavel', 'Ca1u', 'chill vd:block', '🔨'], ['Winter Court', 'S1r', 'chillAll verdict1', '🏛️']]],
  ['dawn', 'beast', [['Sworn Hound', 'S1u', 'wolf verdict1', '🐕'], ["Lion's Verdict", 'A1u', 'dmg cmp:verdict1', '🦁'], ['Guardian Bear', 'Ca1r', 'bear block', '🐻']]],
  ['dawn', 'stone', [['Bedrock Law', 'S1u', 'fortify verdict1', '🏛️'], ['Stone Tablet', 'S1u', 'block vd:fortify', '🪨'], ['Seismic Ruling', 'Cr1r', 'negate tremor', '⚖️']]],
  ['dawn', 'aether', [['Holy Water', 'S1u', 'heal catalyzeF', '💧'], ['Radiant Reagent', 'A1u', 'dmg att:verdict1', '🔆'], ['Alembic of Truth', 'S2r', 'draw2 verdict1 el2:heal', '⚗️']]],
  ['dawn', 'dusk', [['Twilight Oath', 'S2u', 'veil1 verdict1', '🌗'], ["Hunter's Warrant", 'A1u', 'dmg mark vd:mark', '📜'], ['Inquisitor', 'Cs1r', 'negate tm:verdict2', '🕵️']]],
  ['storm', 'rime', [['Sleet Storm', 'A2u', 'dmgAll chillAll shockAll', '🌨️'], ['Frozen Circuit', 'Ra1u', 'block shock tc:charge', '🔋'], ['Superconductor', 'S1r', 'charge frz:energy1', '🧊']]],
  ['storm', 'beast', [['Storm Roc', 'S1u', 'hawk shock', '🦅'], ['Storm Pack', 'A1u', 'dmg cmp:charge', '🐺'], ['Static Fur', 'Ra1r', 'bcomp shock', '⚡']]],
  ['storm', 'stone', [['Grounding Rod', 'S1u', 'fortify charge', '🗼'], ['Thunderquake', 'A2u', 'dmgAll shockAll tt:tremorAll', '⛈️'], ['Grounding Stone', 'Ra1r', 'block cg:fortify', '🪨']]],
  ['storm', 'aether', [['Electrolysis', 'A1u', 'dmg shock att:charge', '⚗️'], ['Charged Catalyst', 'S0u', 'catalyzeF charge', '🔋'], ['Spark Gap', 'S1r', 'draw1 el2:charge', '⚡']]],
  ['storm', 'dusk', [['Silent Thunder', 'A1u', 'dmg shock tm:shock', '🌩️'], ['Storm Cloak', 'Ra1u', 'veil1 shock', '🌫️'], ['Flash Step', 'S2r', 'veil1 cg:draw1', '💫']]],
  ['rime', 'beast', [['Snow Wolf', 'S1u', 'wolf chill', '🐺'], ['Frost Bear', 'S2u', 'bear chillAll', '🐻‍❄️'], ['Polar Pounce', 'A1r', 'dmg chill cmp:x2_chill', '🐾']]],
  ['rime', 'stone', [['Glacier', 'S1u', 'fortify chillAll', '🏔️'], ['Ice Wedge', 'A1u', 'dmg tremor tc:tremor', '🧊'], ['Frost Heave', 'Ra1r', 'tremor chill', '⛰️']]],
  ['rime', 'aether', [['Cryo Flask', 'A2u', 'dmg chill tv:x2_chill', '🧪'], ['Cold Catalyst', 'S0u', 'catalyze chill', '❄️'], ['Liquid Nitrogen', 'S1r', 'chillAll el2:vulnAll', '⚗️']]],
  ['rime', 'dusk', [['Frostbite Knife', 'A0u', 'dmg tc:mark', '🔪'], ['Snow Blind', 'S2u', 'veil1 chillAll', '🌨️'], ['Black Frost', 'A2r', 'dmg mark frz:p_mark*0.7', '🌑']]],
  ['beast', 'stone', [['Stone Boar', 'S1u', 'bear fortify', '🐗'], ['Rockslide Stampede', 'A2u', 'dmgAll cmp:tremorAll', '🦬'], ['Rock Shell', 'Ra1r', 'bcomp fortify', '🐢']]],
  ['beast', 'aether', [['Chimera', 'S2u', 'wolf hawk', '🐉'], ['Mutagen', 'S1u', 'serpent catalyzeF', '🧪'], ['Feral Elixir', 'A1r', 'dmg att:hawk', '⚗️']]],
  ['beast', 'dusk', [['Shadow Panther', 'S2u', 'serpent veil1', '🐆'], ['Pack Ambush', 'A1u', 'dmg cmp:mark', '🐺'], ['Night Owl', 'S1r', 'hawk markAll', '🦉']]],
  ['stone', 'aether', [['Salt of the Earth', 'S1u', 'fortify catalyzeF', '🧂'], ['Mineral Acid', 'A1u', 'dmg tremor tv:p_tremor', '🧪'], ["Philosopher's Rock", 'S1r', 'block el2:fortify', '🪨']]],
  ['stone', 'dusk', [['Rockfall Ambush', 'A2u', 'dmg mark tt:x2_tremor', '⛰️'], ['Cave Shadow', 'Ra1u', 'block veil1', '🦇'], ['Buried Blade', 'A2r', 'dmg fort:mark', '🗡️']]],
  ['aether', 'dusk', [['Shadow Tonic', 'S1r', 'veil1 catalyzeF', '🧪'], ['Poison Vial', 'A1u', 'dmg mark att:mark', '☠️'], ['Vanishing Reagent', 'Ca1r', 'veil1 el2:draw1', '🌫️']]],
];

// ═══════════════════ 2. EVOLVE CARDS (5 per faction) ═══════════════════
// [base, code, fx, icon, plays to evolve, evolved name, evolved code, evolved fx, evolved icon]
type Evo = [string, string, string, string, number, string, string, string, string];
const EVOLVES: [Faction, Evo[]][] = [
  ['ember', [
    ['Spark Squire', 'A1c', 'dmg burn', '🔥', 4, 'Flame Knight', 'A1r', 'dmg burn p_burn', '🛡️'],
    ['Tinder Sprite', 'S0c', 'burn', '🪵', 3, 'Bonfire Heart', 'S0r', 'burnAll str:energy1', '❤️‍🔥'],
    ['Ember Pup', 'Ra1c', 'block burn', '🐕', 4, 'Cinder Drake', 'Ra1r', 'block burnAll hurt:str1', '🐉'],
    ['Fire Apprentice', 'A2u', 'dmg2 first:burn', '🧑‍🎓', 5, 'Pyromancer', 'A2r', 'dmg2 burn first:x2_burn', '🧙'],
    ['Torchbearer', 'S1c', 'block burn', '🔦', 4, 'Beacon of Ash', 'S1r', 'block burnAll first:draw1', '🗼'],
  ]],
  ['tide', [
    ['Trickle', 'S1c', 'weak hand:draw1', '💧', 3, 'Riptide Surge', 'S1r', 'weakAll hand:draw2', '🌊'],
    ['Puddle Jab', 'A1c', 'dmg weak', '💦', 4, 'Tsunami Fist', 'A1r', 'dmg weakAll p_weak', '🌊'],
    ['Undertow Novice', 'Rs1c', 'block weak', '🫧', 4, 'Maelstrom Ward', 'Rs1r', 'block weakAll ch3:draw1', '🌀'],
    ['Ebb Counter', 'Ca1c', 'block weak', '🐚', 4, 'Flood Refusal', 'Ca1r', 'negate weak', '⚓'],
    ['Wave Rider', 'A1u', 'dmg ch2:draw1', '🏄', 5, 'Tide Lord', 'A1r', 'dmg ch2:draw1 tw:bank1', '🔱'],
  ]],
  ['thorn', [
    ['Seedling', 'S1c', 'sprout', '🌱', 4, 'Elder Oak', 'S1r', 'sprout thorns hurt:heal', '🌳'],
    ['Thornling', 'Ra1c', 'thorns', '🌵', 3, 'Bramble Titan', 'Ra1r', 'thornsBig block hurt:heal', '🗿'],
    ['Sapling Strike', 'A1c', 'dmg heal', '🌿', 4, 'Heartwood Smash', 'A1r', 'dmg heal thr:sprout', '🪵'],
    ['Herb Satchel', 'S0c', 'heal', '🌾', 3, 'Grove Remedy', 'S0r', 'heal hurt:sprout', '🍵'],
    ['Ivy Snare', 'Rs1u', 'block thorns', '🍃', 4, 'Strangler Fig', 'Rs1r', 'thorns weak multi:block', '🌴'],
  ]],
  ['void', [
    ['Void Mote', 'A1c', 'dmg doom', '⚫', 4, 'Starless Maw', 'A1r', 'dmg doom low:x2_doom', '🕳️'],
    ['Whisper', 'S0c', 'doom', '🫥', 3, 'Death Chorus', 'S0r', 'doomAll low:doom', '💀'],
    ['Rift Ward', 'Rr1c', 'dmg disrupt1', '🌀', 4, 'Rift Sentinel', 'Rr1r', 'dmg disrupt2', '👁️'],
    ['Hollow Seed', 'S1c', 'block vuln', '🌑', 4, 'Abyss Bloom', 'S1r', 'block vulnAll td:draw1', '🥀'],
    ['Null Novice', 'Cr1u', 'negate', '🚫', 3, 'Null Archon', 'Cr1r', 'negate low:doomAll', '🔮'],
  ]],
  ['gilt', [
    ['Penny', 'S0c', 'ante', '🪙', 4, 'Gold Crown', 'S0r', 'ante first:draw1', '👑'],
    ['Lucky Toss', 'A1c', 'dmg sun:ante flip', '🪙', 4, 'Double Eagle', 'A1r', 'dmg sun:ante moon:draw1 flip', '🦅'],
    ['Pawn Ticket', 'Ca1c', 'block ante', '🎟️', 4, 'Pawnbroker King', 'Ca1r', 'block ante ch3:negate', '🤴'],
    ['Penny Ante', 'S1c', 'block flip', '🎲', 4, 'Whale of the Table', 'S1r', 'block sun:energy1 moon:draw1 flip', '🎰'],
    ['Piggy Bank', 'S1u', 'ante bank1', '🐷', 5, 'Treasury', 'S1r', 'ante bank1 first:energy1', '🏦'],
  ]],
  ['glass', [
    ['Bauble', 'S1c', 'glint block', '🔹', 3, 'Crown Jewel', 'S1r', 'glint2 hand:draw1', '💎'],
    ['Sticky Fingers', 'Rr1c', 'steal1', '🤏', 4, 'Master Thief', 'Rr1r', 'steal1 dhand', '🦹'],
    ['Glass Pebble', 'A1c', 'dmg glint', '🔸', 4, 'Diamond Edge', 'A1r', 'dmg glint first:vuln', '💠'],
    ['Mirror Shard', 'Ra1c', 'block glint', '🪞', 4, 'Mirror Palace', 'Ra1r', 'block glint set2:draw1', '🏰'],
    ['Pocket Lens', 'S1u', 'draw1 hand:glint', '🔍', 5, 'Prism Eye', 'S1r', 'draw1 hand:glint2', '👁️'],
  ]],
  ['grave', [
    ['Gravedigger', 'S1c', 'bury2 block', '⛏️', 4, 'Lich Lord', 'S1r', 'exhume1 cry:bury4', '🧙'],
    ['Rattlebones', 'A1c', 'dmg bury2', '🦴', 4, 'Bone Colossus', 'A1r', 'dmg2 cry:bury4', '💀'],
    ['Wisp', 'Rs1c', 'block heal', '👻', 4, 'Banshee', 'Rs1r', 'dcrypt heal', '😱'],
    ['Mourner', 'S1c', 'bury2 weak', '🖤', 3, 'Undertaker', 'S1r', 'bury4 exh:draw1', '⚰️'],
    ['Restless Hand', 'Cr1u', 'exhume1', '✋', 4, 'Risen Host', 'Cr1r', 'exhume1 dcrypt', '🧟'],
  ]],
  ['dawn', [
    ['Novice Clerk', 'S2c', 'block verdict1', '📝', 4, 'Chief Justice', 'S2r', 'block verdict2 ctr:draw1', '👩‍⚖️'],
    ["Bailiff's Baton", 'A1c', 'dmg vd:weak', '🦯', 4, "Marshal's Mace", 'A1r', 'dmg weak vd:xverdict', '🔨'],
    ['Small Claim', 'Cr1c', 'block verdict1', '📄', 3, 'Supreme Claim', 'Cr1r', 'block verdict1 hurt:heal', '📜'],
    ['Candle Vigil', 'S1c', 'heal verdict1', '🕯️', 3, 'Sun Cathedral', 'S1r', 'heal verdict1 hurt:verdict2', '⛪'],
    ['Oath Page', 'Ca1u', 'block vd:heal', '📃', 4, 'Oathkeeper', 'Ca1r', 'block heal vd:verdict2', '🛡️'],
  ]],
  ['storm', [
    ['Spark Mite', 'A1c', 'dmg shock', '✨', 4, 'Cumulonimbus', 'A1r', 'dmg shock combo:charge', '⛈️'],
    ['Dry Cell', 'S1c', 'charge', '🔋', 3, 'Perpetual Dynamo', 'S1r', 'charge first:energy1', '⚙️'],
    ['Static Cling', 'Ra1c', 'block shock', '⚡', 4, 'Tesla Coil', 'Ra1r', 'block shockAll cg:charge', '🗼'],
    ['Zap Gremlin', 'A1c', 'dmg cg:shock', '💥', 4, 'Lightning Sphere', 'A1r', 'dmgRnd cg:xcharge', '🟡'],
    ['Gust', 'S0u', 'shockAll', '💨', 4, 'Hurricane', 'S0r', 'shockAll el2:x2_shock', '🌀'],
  ]],
  ['rime', [
    ['Snowflake', 'A1c', 'dmg chill', '❄️', 4, 'Blizzard Lord', 'A1r', 'dmg chill frz:draw1', '🌨️'],
    ['Frost Ward', 'Ra1c', 'block chill', '🧊', 4, 'Glacier Bastion', 'Ra1r', 'block chillAll frz:weak*0.4', '🏔️'],
    ['Icicle', 'A1c', 'dmg tc:chill', '🔹', 4, 'Avalanche Spear', 'A1r', 'dmg2 tc:x2_chill', '🗡️'],
    ['Frost Snap', 'S1c', 'chillAll', '🥶', 4, 'Ice Age', 'S1r', 'chillAll frz:energy1', '🦣'],
    ['Rime Novice', 'Ca1u', 'block chill', '⛄', 4, 'Rime Sovereign', 'Ca1r', 'chill weak hurt:block', '👸'],
  ]],
  ['beast', [
    ['Pup', 'S1c', 'wolf', '🐶', 4, 'Alpha Wolf', 'S1r', 'wolf rally', '🐺'],
    ['Cub', 'S1c', 'bear', '🧸', 4, 'Grizzly Elder', 'S1r', 'bear bcomp', '🐻'],
    ['Fledgling', 'S1c', 'hawk', '🐣', 4, 'Roc', 'S1r', 'hawk first:draw1', '🦅'],
    ['Hatchling', 'S1c', 'serpent', '🥚', 4, 'Basilisk', 'S1r', 'serpent vuln', '🐍'],
    ['Tracker', 'A1u', 'dmg cmp:block', '🐾', 5, 'Beastmaster', 'A1r', 'dmg2 cmp:rally', '🦁'],
  ]],
  ['stone', [
    ['Pebble Toss', 'A1c', 'dmg tremor', '🪨', 4, 'Meteor', 'A1r', 'dmg tremorAll multi:x2_tremor', '☄️'],
    ['Cobblestone', 'S1c', 'block fortify', '🧱', 4, 'Mountain Keep', 'S1r', 'block fortify first:draw1', '🏰'],
    ['Grit', 'Ra1c', 'block tremor', '⏳', 4, 'Tectonic Plate', 'Ra1r', 'bfoe tremorAll', '🌍'],
    ['Rubble', 'S0c', 'tremor', '🪨', 3, 'Earthshaker', 'S0r', 'tremorAll p_tremor', '🌋'],
    ['Mason', 'S1u', 'fortify bfoe', '👷', 5, 'Grand Architect', 'S1r', 'fortify bfoe first:draw1', '🏛️'],
  ]],
  ['aether', [
    ['Drop of Mercury', 'S0c', 'catalyzeF vuln', '💧', 3, 'Quicksilver Heart', 'S0r', 'catalyzeF vulnAll', '🫀'],
    ['Test Tube', 'A1c', 'dmg vuln', '🧪', 4, 'Grand Alembic', 'A1r', 'dmg vulnAll att:draw1', '⚗️'],
    ['Litmus', 'S1c', 'vuln catalyzeF', '📃', 4, 'Universal Solvent', 'S1r', 'vulnAll catalyzeF first:energy1', '🫗'],
    ['Flask Ward', 'Ra1c', 'block catalyze', '🍶', 4, 'Prism Barrier', 'Ra1r', 'block vulnAll', '🔮'],
    ['Apprentice Brew', 'A1u', 'dmg el2:vuln', '🧑‍🔬', 5, 'Great Work', 'A1r', 'dmg2 el2:vulnAll', '📕'],
  ]],
  ['dusk', [
    ['Pickpurse', 'A1c', 'dmg mark', '🗡️', 4, 'Shadow Master', 'A1r', 'dmg mark first:veil1', '🥷'],
    ['Smoke Puff', 'S1c', 'veil1', '💨', 3, 'Night Cloak', 'S1r', 'veil1 markAll', '🦇'],
    ['Lookout', 'Ra1c', 'block mark', '👀', 4, 'Spymaster', 'Ra1r', 'block markAll veil:draw1', '🕵️'],
    ['Shiv', 'A1c', 'dmg first:mark', '🔪', 4, "Assassin's Kiss", 'A1r', 'dmg2 first:markAll', '💋'],
    ['Shade Step', 'Ca1u', 'veil1', '👣', 4, 'Phantom Step', 'Ca1r', 'veil1 markAll', '👻'],
  ]],
];

// ═══════════════════ 3. POWERS (4 per faction) ═══════════════════
// fx = "<when> [cond:]atom"; when: start, end, chain2, chain3, counter (you play a Counter), reactfire (your Reaction fires)
const POWERS: [Faction, Row[]][] = [
  ['ember', [['Kiln Heart', 'P1u', 'start str:burnAll', '❤️‍🔥'], ['Pyre Engine', 'P2r', 'chain2 burnAll', '⚙️'], ['Ashen Throne', 'P2u', 'end hurt:dmgAll', '🪑'], ['Flame Pact', 'P1r', 'reactfire burn', '📜']]],
  ['tide', [['Riptide Crown', 'P2u', 'chain3 weakAll', '👑'], ['Undertow Heart', 'P1r', 'counter weak', '🫀'], ['Still Waters', 'P2r', 'end blk:block', '🏞️'], ['Moon Pull', 'P1u', 'reactfire weakAll', '🌕']]],
  ['thorn', [['Briar Crown', 'P1u', 'start thorns', '👑'], ['Greenheart', 'P2u', 'start hurt:heal', '💚'], ['Root Network', 'P1r', 'reactfire sprout', '🕸️'], ['Thicket Lord', 'P2r', 'chain2 thorns', '🌳']]],
  ['void', [['Black Star', 'P2u', 'start hurt:doomAll', '⭐'], ['Null Engine', 'P1r', 'counter doom', '⚙️'], ['Grave Gravity', 'P1u', 'reactfire vuln', '🌑'], ['Collapse', 'P2r', 'chain3 doom', '🕳️']]],
  ['gilt', [['Golden Engine', 'P1u', 'chain2 ante', '⚙️'], ['Lucky Star', 'P1r', 'start sun:ante', '🌟'], ['Royal Mint', 'P2u', 'reactfire ante', '🏦'], ['Counting House', 'P1u', 'end ante:block', '🧮']]],
  ['glass', [['Prism Crown', 'P1u', 'reactfire block', '👑'], ['Shard Engine', 'P2r', 'chain2 dmgRnd', '⚙️'], ['Trinket Hoard', 'P1u', 'start gl:block', '💍'], ['Mirror Soul', 'P2u', 'end set2:dmgAll', '🪞']]],
  ['grave', [['Bone Crown', 'P1u', 'start cry:block', '👑'], ['Ghost Engine', 'P2r', 'chain2 dcrypt', '⚙️'], ['Dirge March', 'P1u', 'reactfire heal', '🎺'], ['Ossuary', 'P2u', 'end cry:dmgAll', '🏛️']]],
  ['dawn', [['Court of Dawn', 'P1u', 'chain2 heal', '🏛️'], ['Gavel Engine', 'P2r', 'counter dmgAll', '⚙️'], ['Sunrise Oath', 'P1u', 'start vd:block', '🌅'], ['Hall of Sentences', 'P2u', 'end vd:dmgRnd', '⚖️']]],
  ['storm', [['Storm Engine', 'P1u', 'chain2 shockAll', '⚙️'], ['Dynamo Heart', 'P2r', 'end cg:charge', '🔋'], ['Lightning Crown', 'P1u', 'end cg:dmgRnd', '👑'], ['Static Soul', 'P1r', 'counter shockAll', '⚡']]],
  ['rime', [['Winter Crown', 'P1u', 'end chillAll', '👑'], ['Frost Engine', 'P1r', 'chain2 chillAll', '⚙️'], ['Glacial Heart', 'P2u', 'end blk:chillAll', '💙'], ['Cold Soul', 'P1u', 'reactfire chill', '🥶']]],
  ['beast', [['Pack Heart', 'P1u', 'start cmp:block', '🐾'], ['Alpha Crown', 'P2r', 'chain2 wolf', '👑'], ['Den Engine', 'P1u', 'end bcomp', '⚙️'], ['Wild Soul', 'P1r', 'reactfire hawk', '🦅']]],
  ['stone', [['Mountain Heart', 'P1u', 'start fortify', '⛰️'], ['Quake Engine', 'P2r', 'chain2 tremorAll', '⚙️'], ['Granite Crown', 'P1u', 'end fort:tremorAll', '👑'], ['Stone Soul', 'P1r', 'reactfire fortify', '🗿']]],
  ['aether', [['Reagent Engine', 'P1u', 'chain2 vulnAll', '⚙️'], ['Elixir Crown', 'P2r', 'end el2:dmgAll', '👑'], ['Alembic Soul', 'P1u', 'counter vuln', '⚗️'], ['Fifth Essence', 'P2u', 'start vulnAll', '✨']]],
  ['dusk', [['Shadow Heart', 'P1u', 'start mark', '🖤'], ['Night Engine', 'P2r', 'chain2 markAll', '⚙️'], ['Veil Crown', 'P1u', 'end veil:dmgAll', '👑'], ['Phantom Soul', 'P1r', 'counter mark', '👻']]],
];

/** Player cards in the pool after v0.11. */
export const V11_TARGET = 2610;

const AETHER = (f: Faction): CardElement | undefined => (f === 'aether' ? 'prism' : undefined);

/** Problems found while building (designs that could not be priced, or repeated an existing card). Read by tests and the audit. */
export const V11_REJECTS: { name: string; why: string; phase?: string }[] = [];
let phase = '';
/** How each v0.11 card was made, by id. */
export const V11_KIND: Record<string, 'hybrid' | 'evolve' | 'evolved' | 'power' | 'set'> = {};

/** Rules text with numbers blanked, plus type and element: no two cards may share it (at any cost). */
export function textKey(c: CardDef): string {
  return [c.type, c.trigger ?? '', c.counter ?? '', c.element ?? FACTION_ELEMENT[c.faction] ?? 'none', filledText(c).replace(/\d+/g, 'N')].join('|');
}

/** Build every v0.11 card. `existing` is the pool so far (hand-made + v0.7 generated). */
export function buildV11(existing: CardDef[]): CardDef[] {
  const takenIds = new Set(existing.map((c) => c.id));
  const takenNames = new Set(existing.map((c) => c.name));
  const texts = new Set<string>();
  const seen = new Map<string, CardDef[]>();
  const remember = (c: CardDef): void => {
    texts.add(textKey(c));
    const k = redundancyKey(c);
    (seen.get(k) ?? seen.set(k, []).get(k)!).push(c);
  };
  for (const c of existing) if (!['enemy', 'curse'].includes(c.faction) && c.rarity !== 'special') remember(c);
  const out: CardDef[] = [];
  const idFor = (f: string, name: string): string => {
    let id = slug(name);
    if (takenIds.has(id)) id = `${f}_${id}`;
    let k = 2;
    while (takenIds.has(id)) id = `${f}_${slug(name)}_${k++}`;
    takenIds.add(id);
    return id;
  };
  /** Accept a compiled card if its name and rules are new. `force` skips the text check (evolved forms may echo their base). */
  const accept = (c: CardDef, kind: (typeof V11_KIND)[string], strict = true): boolean => {
    if (takenNames.has(c.name)) { V11_REJECTS.push({ name: c.name, why: 'name taken', phase }); return false; }
    if (strict && texts.has(textKey(c))) { V11_REJECTS.push({ name: c.name, why: `repeats rules text: ${filledText(c)}`, phase }); return false; }
    const hit = (seen.get(redundancyKey(c)) ?? []).find((x) => redundant(x, c));
    if (hit) { V11_REJECTS.push({ name: c.name, why: `redundant with ${hit.name}`, phase }); return false; }
    takenNames.add(c.name);
    c.id = c.id || idFor(c.faction, c.name);
    takenIds.add(c.id);
    V11_KIND[c.id] = kind;
    remember(c);
    out.push(c);
    return true;
  };
  const tryCompile = (d: Design): CardDef | null => {
    try { return compile(d); } catch (e) { if (e instanceof DesignError) { V11_REJECTS.push({ name: d.name, why: e.message, phase }); return null; } throw e; }
  };

  // 1. hybrids
  phase = 'hybrid';
  for (const [f1, f2, rows] of HYBRIDS) for (const [name, code, fx, icon] of rows) {
    const c = tryCompile({ name, code, fx, icon, faction: f1, faction2: f2, element: AETHER(f1) });
    if (c) accept(c, 'hybrid');
  }
  phase = 'evolve';
  // 2. evolves: the evolved form first (so the base can name it)
  for (const [f, rows] of EVOLVES) for (const [name, code, fx, icon, n, eName, eCode, eFx, eIcon] of rows) {
    if (takenNames.has(name) || takenNames.has(eName)) { V11_REJECTS.push({ name, why: 'evolve name taken', phase }); continue; }
    const into = idFor(f, eName);
    const ev = tryCompile({ id: into, name: eName, code: eCode, fx: eFx, icon: eIcon, faction: f, evolved: true, mult: 1.1, element: AETHER(f) });
    const base = tryCompile({ name, code, fx, icon, faction: f, evolve: { into, n }, element: AETHER(f), note: `Evolve ${n} (${eName}).` });
    if (!ev || !base) { takenIds.delete(into); continue; }
    if (accept(ev, 'evolved')) { if (!accept(base, 'evolve')) { out.splice(out.indexOf(ev), 1); takenNames.delete(ev.name); } }
  }
  phase = 'power';
  // 3. powers
  const mkCtx = (cb: Combat, who: import('../engine/types').Combatant): Ctx => {
    const foes = cb.foesOf(who);
    return cb.ctx(who, foes.length ? cb.rng.pick(foes) : null);
  };
  for (const [f, rows] of POWERS) for (const [name, code, fx, icon] of rows) {
    const id = slug(name);
    try {
      const { card, status } = compilePower({ id: takenIds.has(id) ? `${f}_${id}` : id, name, code, fx, icon, faction: f, element: AETHER(f) }, mkCtx);
      if (accept(card, 'power')) STATUSES[status.id] = status;
    } catch (e) { if (e instanceof DesignError) V11_REJECTS.push({ name, why: e.message, phase }); else throw e; }
  }
  phase = 'set';
  // 4. faction sets, up to a quota that brings the pool to V11_TARGET player cards (neutral sets share one quota).
  const groups = setGroups();
  const left = V11_TARGET - existing.filter((c) => !['enemy', 'curse'].includes(c.faction)).length - out.length;
  const neutral = groups.filter((g) => g.faction === 'neutral');
  const per = Math.ceil(left / (groups.length - neutral.length + 1));
  const quota = (g: (typeof groups)[number]): number => (g.faction === 'neutral' ? Math.ceil(per / neutral.length) : per);
  for (const g of groups) {
    let made = 0;
    for (let i = 0; i < g.designs.length && made < quota(g); i++) {
      const d = g.designs[i];
      const type = ({ A: 'attack', S: 'skill', R: 'reaction', C: 'counter' } as Record<string, string>)[d.code[0]];
      const name = g.name(type, i, takenNames);
      if (!name) continue;
      const c = tryCompile({ ...d, name });
      // Set cards are drafted at the weight of v0.7 generated cards (hand-made ones weigh double).
      if (c) c.gen = true;
      if (c && accept(c, 'set')) made++;
    }
  }
  return out;
}
