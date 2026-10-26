/** Booster packs, bought with Coins (earned in runs). No real money anywhere. */
export interface PackDef {
  id: string;
  name: string;
  icon: string;
  price: number;
  size: number;
  /** Factions it draws from (neutral is always included). */
  factions?: string[];
  /** Odds for the last ("hero") slot. */
  hero: { legendary: number; rare: number };
  /** Other slots: chance each one upgrades to uncommon / rare. */
  slot: { uncommon: number; rare: number };
  foil: number;
  blurb: string;
  hue: string;
}

export const PACKS: Record<string, PackDef> = {
  standard: { id: 'standard', name: 'Duelist Pack', icon: '🂠', price: 100, size: 5, hero: { legendary: 0.04, rare: 0.3 }, slot: { uncommon: 0.22, rare: 0.03 }, foil: 0.06,
    blurb: '5 cards from every faction. Last card is uncommon or better.', hue: '#e8b04a' },
  ember: { id: 'ember', name: 'Ember Pack', icon: ':px-fire:', price: 130, size: 5, factions: ['ember'], hero: { legendary: 0.06, rare: 0.4 }, slot: { uncommon: 0.25, rare: 0.04 }, foil: 0.07,
    blurb: 'Ember + Neutral only. Better odds on the last card.', hue: '#e8743b' },
  tide: { id: 'tide', name: 'Tide Pack', icon: ':px-wave:', price: 130, size: 5, factions: ['tide'], hero: { legendary: 0.06, rare: 0.4 }, slot: { uncommon: 0.25, rare: 0.04 }, foil: 0.07,
    blurb: 'Tide + Neutral only. Better odds on the last card.', hue: '#3fb6c9' },
  thorn: { id: 'thorn', name: 'Thorn Pack', icon: ':px-vine:', price: 130, size: 5, factions: ['thorn'], hero: { legendary: 0.06, rare: 0.4 }, slot: { uncommon: 0.25, rare: 0.04 }, foil: 0.07,
    blurb: 'Thorn + Neutral only. Better odds on the last card.', hue: '#6bbf59' },
  void: { id: 'void', name: 'Void Pack', icon: ':px-spiral:', price: 130, size: 5, factions: ['void'], hero: { legendary: 0.06, rare: 0.4 }, slot: { uncommon: 0.25, rare: 0.04 }, foil: 0.07,
    blurb: 'Void + Neutral only. Better odds on the last card.', hue: '#a56ee0' },
  gilt: { id: 'gilt', name: 'Gilt Pack', icon: ':px-coin:', price: 130, size: 5, factions: ['gilt'], hero: { legendary: 0.06, rare: 0.4 }, slot: { uncommon: 0.25, rare: 0.04 }, foil: 0.08,
    blurb: 'Gilt + Neutral only (the Cardsharp\'s cards). Better odds on the last card.', hue: '#f2c94c' },
  glass: { id: 'glass', name: 'Glass Pack', icon: ':px-shard:', price: 130, size: 5, factions: ['glass'], hero: { legendary: 0.06, rare: 0.4 }, slot: { uncommon: 0.25, rare: 0.04 }, foil: 0.08,
    blurb: 'Glass + Neutral only (the Magpie\'s cards). Better odds on the last card.', hue: '#9fd8ef' },
  grave: { id: 'grave', name: 'Grave Pack', icon: ':px-urn:', price: 130, size: 5, factions: ['grave'], hero: { legendary: 0.06, rare: 0.4 }, slot: { uncommon: 0.25, rare: 0.04 }, foil: 0.08,
    blurb: 'Grave + Neutral only (the Sexton\'s cards). Better odds on the last card.', hue: '#9fb08a' },
  dawn: { id: 'dawn', name: 'Dawn Pack', icon: ':px-sun:', price: 130, size: 5, factions: ['dawn'], hero: { legendary: 0.06, rare: 0.4 }, slot: { uncommon: 0.25, rare: 0.04 }, foil: 0.08,
    blurb: 'Dawn + Neutral only (the Arbiter\'s cards). Better odds on the last card.', hue: '#f3d46b' },
  storm: { id: 'storm', name: 'Storm Pack', icon: ':px-bolt:', price: 130, size: 5, factions: ['storm'], hero: { legendary: 0.06, rare: 0.4 }, slot: { uncommon: 0.25, rare: 0.04 }, foil: 0.08,
    blurb: 'Storm + Neutral only (the Tempest\'s cards). Better odds on the last card.', hue: '#ffe066' },
  rime: { id: 'rime', name: 'Rime Pack', icon: ':px-snow:', price: 130, size: 5, factions: ['rime'], hero: { legendary: 0.06, rare: 0.4 }, slot: { uncommon: 0.25, rare: 0.04 }, foil: 0.08,
    blurb: 'Rime + Neutral only (the Rimeblade\'s cards). Better odds on the last card.', hue: '#8fd8ff' },
  beast: { id: 'beast', name: 'Beast Pack', icon: ':px-paw:', price: 130, size: 5, factions: ['beast'], hero: { legendary: 0.06, rare: 0.4 }, slot: { uncommon: 0.25, rare: 0.04 }, foil: 0.08,
    blurb: 'Beast + Neutral only (the Beastcaller\'s cards). Better odds on the last card.', hue: '#b8763c' },
  stone: { id: 'stone', name: 'Stone Pack', icon: ':px-rock:', price: 130, size: 5, factions: ['stone'], hero: { legendary: 0.06, rare: 0.4 }, slot: { uncommon: 0.25, rare: 0.04 }, foil: 0.08,
    blurb: 'Stone + Neutral only (the Geomancer\'s cards). Better odds on the last card.', hue: '#b8956a' },
  aether: { id: 'aether', name: 'Aether Pack', icon: ':px-alembic:', price: 130, size: 5, factions: ['aether'], hero: { legendary: 0.06, rare: 0.4 }, slot: { uncommon: 0.25, rare: 0.04 }, foil: 0.08,
    blurb: 'Aether + Neutral only (the Alchemist\'s cards). Better odds on the last card.', hue: '#c08cff' },
  dusk: { id: 'dusk', name: 'Dusk Pack', icon: ':px-moon:', price: 130, size: 5, factions: ['dusk'], hero: { legendary: 0.06, rare: 0.4 }, slot: { uncommon: 0.25, rare: 0.04 }, foil: 0.08,
    blurb: 'Dusk + Neutral only (the Nightblade\'s cards). Better odds on the last card.', hue: '#7d6bd6' },
  legend: { id: 'legend', name: 'Legend Pack', icon: '🌟', price: 400, size: 3, hero: { legendary: 0.25, rare: 1 }, slot: { uncommon: 0.6, rare: 0.4 }, foil: 0.15,
    blurb: '3 cards, all uncommon or better. Last card is rare, 1 in 4 Legendary.', hue: '#f6d184' },
};

export const PACK_LIST = Object.values(PACKS);

/** Hearthstone-like crafting economy: dust from duplicates, dust to craft. Foils dust for 4×. */
export const CRAFT: Record<string, number> = { common: 40, uncommon: 100, rare: 400, legendary: 1600 };
export const DUST: Record<string, number> = { common: 5, uncommon: 20, rare: 100, legendary: 400 };
/** Guaranteed Legendary after this many packs without one. */
export const PITY = 12;
