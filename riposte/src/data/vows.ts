/**
 * Vows: mix-your-own difficulty (Hades' Pact of Punishment, Monster Train's Covenant), stacked on top of
 * Ascension. Each rank adds Wager. Wager multiplies your score, Coins and Season Renown, and winning at a
 * new Wager milestone pays a bonus. Vows open after your first boss kill.
 */
export interface VowDef { id: string; name: string; icon: string; max: number; heat: number; text: (rank: number) => string }

export const VOWS: VowDef[] = [
  { id: 'vow_hp', name: 'Vow of Iron', icon: '🛡', max: 3, heat: 1, text: (r) => `Enemies have ${10 * r}% more HP.` },
  { id: 'vow_str', name: 'Vow of Fury', icon: '💢', max: 2, heat: 2, text: (r) => `Enemies start each fight with ${r} extra Edge.` },
  { id: 'vow_traps', name: 'Vow of Snares', icon: '🂠', max: 2, heat: 2, text: (r) => r === 1 ? 'Every enemy starts each fight with a Spike Shell set.' : 'Every enemy starts with a Spike Shell; rivals and bosses also a Snap Jaw.' },
  { id: 'vow_poor', name: 'Vow of Poverty', icon: '🪙', max: 2, heat: 1, text: (r) => `Combats pay ${25 * r}% less gold.` },
  { id: 'vow_thirst', name: 'Vow of Thirst', icon: '🏜', max: 2, heat: 1, text: (r) => r === 1 ? 'Mending at the Candle heals half as much.' : 'Mending at the Candle heals half as much, and you only recover half your missing HP between acts.' },
  { id: 'vow_hunt', name: 'Vow of the Hunt', icon: '🔥', max: 1, heat: 2, text: () => 'Every rival is a Champion (random affix).' },
  { id: 'vow_crown', name: 'Vow of the Crown', icon: '👑', max: 1, heat: 3, text: () => 'Bosses carry a Champion affix.' },
  { id: 'vow_regret', name: 'Vow of Regret', icon: '😞', max: 2, heat: 1, text: (r) => `Start the run with ${r} Regret jinx${r > 1 ? 's' : ''}.` },
  { id: 'vow_clock', name: 'Vow of the Clock', icon: '⏰', max: 1, heat: 2, text: () => 'From turn 8 of any fight, enemies gain 3 Edge (Overtime).' },
  // v0.4
  { id: 'vow_glass', name: 'Vow of Glass', icon: '🔍', max: 2, heat: 1, text: (r) => `You start each fight with ${r} Exposed.` },
  { id: 'vow_greed', name: 'Vow of Greed', icon: '💸', max: 2, heat: 1, text: (r) => `Shop prices are ${25 * r}% higher.` },
  { id: 'vow_swarm', name: 'Vow of the Swarm', icon: '🐝', max: 1, heat: 3, text: () => 'Normal fights bring one extra small enemy.' },
  // v0.5
  { id: 'vow_ink', name: 'Vow of Ink', icon: '🖋️', max: 2, heat: 1, text: (r) => `At the start of each fight, ${2 * r} random cards in your draw pile are Blotted (cost 1 more).` },
  { id: 'vow_stage', name: 'Vow of the Stage', icon: '🎪', max: 1, heat: 1, text: () => 'Every fight takes place at a Venue.' },
];

export const VOW_MAP = Object.fromEntries(VOWS.map((v) => [v.id, v]));
export const HEAT_MILESTONES = [3, 6, 10, 15];
export const MAX_HEAT = VOWS.reduce((a, v) => a + v.max * v.heat, 0);

export function heatOf(vows: Record<string, number> | undefined): number {
  let h = 0;
  for (const [id, r] of Object.entries(vows ?? {})) h += (VOW_MAP[id]?.heat ?? 0) * Math.min(r, VOW_MAP[id]?.max ?? 0);
  return h;
}

/** Weekly Gauntlet twists: one rule change per week, like Monster Train 2's Dimensional Challenges. */
export interface TwistDef { id: string; name: string; icon: string; text: string }

export const TWISTS: TwistDef[] = [
  { id: 'mirror', name: 'Hall of Mirrors', icon: '🪞', text: 'Every rival is an Echo of a saved deck.' },
  { id: 'gold_rush', name: 'Gold Rush', icon: '💰', text: 'Combats pay double gold, but shop prices are 50% higher.' },
  { id: 'chainmail', name: 'Chainmail', icon: '⛓', text: 'Whenever a chain of 3+ links resolves, heal 2 HP.' },
  { id: 'sudden_death', name: 'Sudden Death', icon: '💔', text: 'You and every enemy start each fight with 2 Exposed.' },
  { id: 'omens', name: 'Night of Omens', icon: '🔮', text: 'Start with 3 random Omens. Omens drop twice as often.' },
  { id: 'legend', name: 'Borrowed Legend', icon: '🌟', text: 'Start with a random Legendary card from your factions, owned or not.' },
  // v0.4
  { id: 'thieves', name: "Thieves' Guild", icon: '🫳', text: 'Start each fight by Stealing 1 enemy trap (a Glint if there is none).' },
  { id: 'mimicry', name: 'Mimicry', icon: '👥', text: 'The first Attack or Trick you play each fight happens twice.' },
  // v0.5
  { id: 'graveyard', name: 'Graveyard Shift', icon: '⚱️', text: 'Your Reactions go to the Crypt when they leave play, and you Exhume 1 at the start of each turn after the first.' },
  { id: 'grand_tour', name: 'Grand Tour', icon: '🎪', text: 'Every fight takes place at a Venue, and Venue fights pay 50% more gold.' },
];
export const TWIST_MAP = Object.fromEntries(TWISTS.map((t) => [t.id, t]));
