import type { RunState } from '../engine/types';
import type { Rng } from '../engine/rng';

/**
 * v0.6 Fates: at the start of a normal run you draw three Fates and keep one (or none). Each is a mixed
 * blessing that changes how the whole run plays: richer but pricier, tougher but slower, luckier but poorer.
 * Some apply once at the start; the rest are read by the run engine through `fateIs`.
 */
export interface FateApi {
  rng: Rng;
  gainRelic: (rarity: 'common' | 'uncommon' | 'rare') => string | null;
  addToDeck: (id: string, up?: boolean) => void;
  upgradeRandom: (n: number) => number;
  removeBasics: (n: number) => number;
  gainOmens: (n: number) => number;
  rareCard: () => string | null;
  sigilRandom: (n: number) => number;
}

export interface FateDef {
  id: string;
  name: string;
  icon: string;
  /** Upside, then downside. */
  text: string;
  apply?: (run: RunState, api: FateApi) => void;
}

export const FATES: FateDef[] = [
  { id: 'gambler', name: 'The Gambler', icon: '🎲', text: '+150 gold. Shop prices are 25% higher.', apply: (r) => { r.gold += 150; } },
  { id: 'pauper', name: 'The Pauper', icon: '🥣', text: 'Start with a random uncommon keepsake, but no gold at all.', apply: (r, a) => { r.gold = 0; a.gainRelic('uncommon'); } },
  { id: 'scholar', name: 'The Scholar', icon: '📚', text: 'Upgrade 2 random cards. −8 Max HP.', apply: (r, a) => { a.upgradeRandom(2); r.maxHp -= 8; r.hp = Math.min(r.hp, r.maxHp); } },
  { id: 'brute', name: 'The Brute', icon: '💪', text: '+10 Max HP. Card rewards offer 1 fewer choice.', apply: (r) => { r.maxHp += 10; r.hp += 10; } },
  { id: 'trickster', name: 'The Trickster', icon: '🃏', text: 'Start with 3 random Omens. −4 Max HP.', apply: (r, a) => { a.gainOmens(3); r.maxHp -= 4; r.hp = Math.min(r.hp, r.maxHp); } },
  { id: 'pilgrim', name: 'The Pilgrim', icon: '🕯️', text: 'Events and Shrines are far more common. Fewer rivals and shops. −8 Max HP.', apply: (r) => { r.maxHp -= 8; r.hp = Math.min(r.hp, r.maxHp); } },
  { id: 'hunter', name: 'The Hunter', icon: '🏹', text: 'Rivals are more common, and every rival pays double gold. −6 Max HP.', apply: (r) => { r.maxHp -= 6; r.hp = Math.min(r.hp, r.maxHp); } },
  { id: 'collector', name: 'The Collector', icon: '🧺', text: 'Start with 2 random common keepsakes, and a Regret jinx.', apply: (r, a) => { a.gainRelic('common'); a.gainRelic('common'); a.addToDeck('regret'); } },
  { id: 'hermit', name: 'The Hermit', icon: '🏔️', text: 'Remove 2 basic cards from your deck. −5 Max HP.', apply: (r, a) => { a.removeBasics(2); r.maxHp -= 5; r.hp = Math.min(r.hp, r.maxHp); } },
  { id: 'lucky', name: 'Born Lucky', icon: '🍀', text: 'Rare monsters are three times as likely, and Mystery nodes never hide rivals. +2 Max HP.', apply: (r) => { r.maxHp += 2; r.hp += 2; } },
  { id: 'cursed_blade', name: 'The Cursed Blade', icon: '🗡️', text: 'Add a random rare card from your factions, upgraded. Add 1 Wound.', apply: (_r, a) => { const id = a.rareCard(); if (id) a.addToDeck(id, true); a.addToDeck('wound'); } },
  { id: 'wanderer', name: 'The Wanderer', icon: '🧭', text: 'Roadside encounters happen twice as often. +5 Max HP.', apply: (r) => { r.maxHp += 5; r.hp += 5; } },
  { id: 'night_owl', name: 'The Night Owl', icon: '🦉', text: 'Every act is Foggy (you see only 2 rows ahead). Fights pay 30% more gold.' },
  { id: 'merchant', name: 'The Merchant', icon: '💼', text: 'Shops are 25% cheaper. Fights pay 25% less gold.' },
  { id: 'veteran', name: 'The Veteran', icon: '🎖️', text: 'Start with a random rare keepsake. Enemies have 8% more HP.', apply: (_r, a) => { a.gainRelic('rare'); } },
  { id: 'second_life', name: 'Second Life', icon: '🪶', text: 'Start with the Phoenix Feather (cheat death once). Start at 65% HP.',
    apply: (r) => { if (!r.relics.includes('phoenix_feather')) r.relics.push('phoenix_feather'); r.hp = Math.round(r.maxHp * 0.65); } },
  { id: 'oath', name: 'Oath of Steel', icon: '⚔️', text: '+1 Reaction slot. −8 Max HP.', apply: (r) => { r.maxHp -= 8; r.hp = Math.min(r.hp, r.maxHp); } },
  { id: 'alchemist', name: 'The Alchemist', icon: '⚗️', text: 'Hold 1 more Omen, and start with 2. −30 gold.', apply: (r, a) => { r.gold = Math.max(0, r.gold - 30); a.gainOmens(2); } },
  { id: 'forgehand', name: 'The Forgehand', icon: '⚒️', text: 'Stamp random Sigils on 2 cards. Forge nodes are more common. −20 gold.', apply: (r, a) => { a.sigilRandom(2); r.gold = Math.max(0, r.gold - 20); } },
  { id: 'ascetic', name: 'The Ascetic', icon: '🧘', text: 'Mending at the Candle heals you to full, but you can never Hone there.' },
  { id: 'light_fingers', name: 'Light Fingers', icon: '🫳', text: 'The first card in every shop is free for you. Card removal costs 50% more.' },
  { id: 'bard', name: 'The Bard', icon: '🎻', text: 'Card rewards offer 1 extra choice. −5 Max HP.', apply: (r) => { r.maxHp -= 5; r.hp = Math.min(r.hp, r.maxHp); } },
  { id: 'stargazer', name: 'The Stargazer', icon: '🔭', text: 'Every act rolls a kinder Sky (never Heatwave, Frost or Eclipse), and you heal 10 HP at each act start. −20 gold.',
    apply: (r) => { r.gold = Math.max(0, r.gold - 20); } },
  { id: 'daredevil', name: 'The Daredevil', icon: '🤸', text: 'Dares pay double. You start each rival and boss fight with 1 Exposed.' },
];
export const FATE_MAP: Record<string, FateDef> = Object.fromEntries(FATES.map((f) => [f.id, f]));

export function fateIs(run: RunState, id: string): boolean { return run.fate === id; }
