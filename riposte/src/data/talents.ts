import type { RunBonus } from '../engine/types';

/**
 * The Salle: a talent board of three fencing schools. One point per profile level, free respec.
 * Tier N of a school needs 2×(N−1) points already spent in that school.
 */
export type School = 'guard' | 'purse' | 'feint';

export interface TalentDef {
  id: string;
  school: School;
  tier: number;
  name: string;
  icon: string;
  max: number;
  text: (rank: number) => string;
  bonus: (rank: number, b: RunBonus & { slots?: number; coinPct?: number }) => void;
}

export const SCHOOLS: Record<School, { name: string; icon: string; blurb: string }> = {
  guard: { name: 'School of Guard', icon: '🛡', blurb: 'Survive longer.' },
  purse: { name: 'School of Coin', icon: '💰', blurb: 'More gold, cheaper shops, more Coins.' },
  feint: { name: 'School of Feint', icon: '🎭', blurb: 'Better drafts and a stronger starting deck.' },
};

type B = RunBonus & { slots?: number; coinPct?: number };
const add = (b: B, k: Exclude<keyof B, 'relic'>, n: number) => { b[k] = (b[k] ?? 0) + n; };

export const TALENTS: TalentDef[] = [
  // Guard
  { id: 'vitality', school: 'guard', tier: 1, name: 'Vitality', icon: '❤', max: 3, text: (r) => `+${3 * r} Max HP.`, bonus: (r, b) => add(b, 'maxHp', 3 * r) },
  { id: 'opening_guard', school: 'guard', tier: 2, name: 'Opening Guard', icon: '🛡', max: 1, text: (r) => `Start each combat with ${3 * r} Guard.`, bonus: (r, b) => add(b, 'block', 3 * r) },
  { id: 'field_dressing', school: 'guard', tier: 3, name: 'Field Dressing', icon: '🩹', max: 2, text: (r) => `Heal ${5 * r} HP after every rival and boss fight.`, bonus: (r, b) => add(b, 'mend', 5 * r) },
  { id: 'heirloom', school: 'guard', tier: 4, name: 'Heirloom', icon: '🏺', max: 1, text: () => 'Start each run with a random common keepsake.', bonus: (_r, b) => { b.relic = true; } },
  // Coin
  { id: 'pocket_money', school: 'purse', tier: 1, name: 'Pocket Money', icon: '🪙', max: 2, text: (r) => `Start runs with ${20 * r} more gold.`, bonus: (r, b) => add(b, 'gold', 20 * r) },
  { id: 'haggler', school: 'purse', tier: 2, name: 'Haggler', icon: '🤝', max: 2, text: (r) => `Shop prices ${6 * r}% lower.`, bonus: (r, b) => add(b, 'shopPct', -6 * r) },
  { id: 'bounty', school: 'purse', tier: 3, name: 'Bounty Hunter', icon: '🎯', max: 2, text: (r) => `${10 * r}% more gold from combats.`, bonus: (r, b) => add(b, 'goldPct', 10 * r) },
  { id: 'patron', school: 'purse', tier: 4, name: 'Patron', icon: '👑', max: 2, text: (r) => `${15 * r}% more Coins after every run.`, bonus: (r, b) => add(b, 'coinPct', 15 * r) },
  // Feint
  { id: 'signature', school: 'feint', tier: 1, name: 'Signature Moves', icon: '✍', max: 1, text: (r) => `+${r} Loadout slot${r > 1 ? 's' : ''}: swap more starter cards for cards you own.`, bonus: (r, b) => add(b, 'slots', r) },
  { id: 'second_look', school: 'feint', tier: 2, name: 'Second Look', icon: '🔄', max: 2, text: (r) => `Reroll a card reward ${r} time${r > 1 ? 's' : ''} per run.`, bonus: (r, b) => add(b, 'rerolls', r) },
  { id: 'prepared', school: 'feint', tier: 3, name: 'Prepared', icon: '🎴', max: 1, text: () => 'Draw 1 extra card on the first turn of each combat.', bonus: (_r, b) => add(b, 'drawFirst', 1) },
  { id: 'connoisseur', school: 'feint', tier: 4, name: 'Connoisseur', icon: '🧐', max: 1, text: () => 'Card rewards offer 4 choices instead of 3.', bonus: (_r, b) => add(b, 'choices', 1) },
];

export const TALENT_MAP = Object.fromEntries(TALENTS.map((t) => [t.id, t]));
