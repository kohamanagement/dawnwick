import type { CharId, Element } from '../engine/types';

export interface CharDef {
  id: CharId;
  name: string;
  title: string;
  icon: string;
  hp: number;
  factions: string[];
  relic: string;
  deck: string[];
  unlock: number;
  pitch: string;
  /** v0.7: home element (your Attunement at the start of each fight). */
  element: Element;
}

export const CHARACTERS: Record<CharId, CharDef> = {
  duelist: {
    id: 'duelist', element: 'blaze', name: 'The Ashen Duelist', title: 'Ember + Tide', icon: '🤺', hp: 79, factions: ['ember', 'tide'],
    relic: 'duelists_fan', unlock: 0,
    deck: ['strike', 'strike', 'strike', 'strike', 'guard', 'guard', 'guard', 'spark_lunge', 'parry', 'parry'],
    pitch: 'Bait enemy traps, answer with Parries, and burn down whatever is left. The best character to learn the chain.',
  },
  warden: {
    id: 'warden', element: 'wild', name: 'The Thorn Warden', title: 'Thorn + Tide', icon: '🛡️', hp: 72, factions: ['thorn', 'tide'],
    relic: 'root_heart', unlock: 2,
    deck: ['strike', 'strike', 'strike', 'strike', 'guard', 'guard', 'guard', 'guard', 'bramble_ward', 'riptide_snare'],
    pitch: 'Let them hit you. Barbs, Guard and Shaken turn every enemy attack into a mistake.',
  },
  hollow: {
    id: 'hollow', element: 'umbral', name: 'The Hollow', title: 'Void + Ember', icon: '🕳️', hp: 63, factions: ['void', 'ember'],
    relic: 'hollow_crown', unlock: 4,
    deck: ['strike', 'strike', 'strike', 'guard', 'guard', 'guard', 'bone_shield', 'hollow_cut', 'bone_toll', 'ossuary_ward', 'shatter_seal', 'rend'],
    pitch: 'Set Reactions just to destroy them. Every Sacrifice stacks Doom until enemies simply stop. Has a third Reaction slot.',
  },
  sharp: {
    id: 'sharp', element: 'radiant', name: 'The Cardsharp', title: 'Gilt + Tide', icon: '🎩', hp: 84, factions: ['gilt', 'tide'],
    relic: 'loaded_coin', unlock: 3,
    deck: ['strike', 'strike', 'strike', 'strike', 'guard', 'guard', 'guard', 'coin_toss', 'coin_toss', 'hedge', 'cash_out'],
    pitch: 'Plays the Fate Coin: every Gilt card reads ☀ or ☾ and most of them flip it. Sequence the faces, stack your Ante, then cash it all in.',
  },
  magpie: {
    id: 'magpie', element: 'frost', name: 'The Magpie', title: 'Glass + Void', icon: '🐦‍⬛', hp: 74, factions: ['glass', 'void'],
    relic: 'magpie_nest', unlock: 5,
    deck: ['strike', 'strike', 'strike', 'strike', 'guard', 'guard', 'guard', 'snatch', 'snatch', 'glass_edge', 'sleight'],
    pitch: "Steals the enemy's face-down traps and sets them for herself. A trap with no room left becomes a Glint, a free shard of damage. Late on, Mimic replays her best card.",
  },
  sexton: {
    id: 'sexton', element: 'stone', name: 'The Sexton', title: 'Grave + Thorn', icon: '⚰️', hp: 80, factions: ['grave', 'thorn'],
    relic: 'gravediggers_spade', unlock: 6,
    deck: ['strike', 'strike', 'strike', 'strike', 'guard', 'guard', 'tombstone', 'tombstone', 'spade_strike', 'spade_strike', 'gravedig'],
    pitch: 'Nothing stays dead. Your Reactions are buried in the Crypt when they leave play, Haunt effects fire as they go down, and Exhume sets them again. Bury your draw pile to stock the Crypt, then answer the same attack twice.',
  },
  // ═════════ v0.7 "Elements & Counters" ═════════
  arbiter: {
    id: 'arbiter', element: 'radiant', name: 'The Arbiter', title: 'Dawn + Tide', icon: '⚖️', hp: 77, factions: ['dawn', 'tide'],
    relic: 'scales_of_dawn', unlock: 0,
    deck: ['strike', 'strike', 'strike', 'guard', 'guard', 'guard', 'objection', 'objection', 'gavel_strike', 'gavel_strike', 'dawn_ward'],
    pitch: 'The counter-chain specialist. Holds Objections in hand and answers enemy traps mid-chain, gaining Verdict every time; then passes Sentence with it.',
  },
  tempest: {
    id: 'tempest', element: 'storm', name: 'The Tempest', title: 'Storm + Tide', icon: '🌩️', hp: 77, factions: ['storm', 'tide'],
    relic: 'storm_bottle', unlock: 1,
    deck: ['strike', 'strike', 'strike', 'strike', 'guard', 'guard', 'capacitor', 'static_jab', 'static_jab', 'spark_ward', 'thunderclap'],
    pitch: 'Stores Charge and lets it all go at once. Shock makes the next attack on an enemy hit much harder, and lightning arcs between enemies.',
  },
  rimeblade: {
    id: 'rimeblade', element: 'frost', name: 'The Rimeblade', title: 'Rime + Glass', icon: '❄️', hp: 84, factions: ['rime', 'glass'],
    relic: 'rime_heart', unlock: 2,
    deck: ['strike', 'strike', 'strike', 'guard', 'guard', 'guard', 'frost_cut', 'frost_cut', 'frost_cut', 'hoarfrost_ward', 'shatter'],
    pitch: 'Stacks Chill until enemies Freeze and lose their turn, then Shatters them. Frozen foes take 50% more from her.',
  },
  beastcaller: {
    id: 'beastcaller', element: 'wild', name: 'The Beastcaller', title: 'Beast + Storm', icon: '🐾', hp: 80, factions: ['beast', 'storm'],
    relic: 'bone_whistle', unlock: 3,
    deck: ['strike', 'strike', 'strike', 'strike', 'guard', 'guard', 'guard', 'call_wolf', 'call_bear', 'pack_tactics', 'feral_ward'],
    pitch: 'Fights beside a pack. Wolves, Bears, Hawks and Serpents stack up and act every turn on their own.',
  },
  geomancer: {
    id: 'geomancer', element: 'stone', name: 'The Geomancer', title: 'Stone + Thorn', icon: '🪨', hp: 78, factions: ['stone', 'thorn'],
    relic: 'lodestone', unlock: 4,
    deck: ['strike', 'strike', 'strike', 'strike', 'guard', 'guard', 'guard', 'guard', 'quake_step', 'quake_step', 'bulwark_ward'],
    pitch: 'Slow and immovable. Fortify keeps Guard from turn to turn, and Tremor shakes enemies at the end of every turn you take.',
  },
  alchemist: {
    id: 'alchemist', element: 'flood', name: 'The Alchemist', title: 'Aether + Ember', icon: '⚗️', hp: 73, factions: ['aether', 'ember'],
    relic: 'philosophers_flask', unlock: 5,
    deck: ['strike', 'strike', 'strike', 'strike', 'guard', 'guard', 'guard', 'vial_toss', 'vial_toss', 'catalyze', 'reagent_ward'],
    pitch: 'Master of the element wheel. Prism cards take your Attunement, Catalyze turns you into whatever beats your target, and Resonance comes after only 2 cards.',
  },
  nightblade: {
    id: 'nightblade', element: 'umbral', name: 'The Nightblade', title: 'Dusk + Void', icon: '🥷', hp: 51, factions: ['dusk', 'void'],
    relic: 'smoke_cowl', unlock: 6,
    deck: ['strike', 'strike', 'strike', 'strike', 'guard', 'guard', 'guard', 'mark_target', 'shadow_cut', 'shadow_cut', 'smoke_ward'],
    pitch: 'Marks a target so every hit lands harder, slips attacks with Veil, and executes whatever the Marks have softened.',
  },
};

export const CHAR_LIST = Object.values(CHARACTERS);
