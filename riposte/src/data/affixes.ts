import type { Combat } from '../engine/combat';
import type { EnemyState } from '../engine/types';

/** Champion elites carry one affix. They are optional on the map and pay out more. */
export interface AffixDef { id: string; name: string; icon: string; text: string; apply: (e: EnemyState, cb: Combat) => void }

const tier = (cb: Combat, id: string) => cb.tier(id);

export const AFFIXES: AffixDef[] = [
  { id: 'armored', name: 'Armored', icon: '🛡', text: 'Starts with Guard equal to 25% of its HP, kept through your first turn.',
    apply: (e) => { e.block += Math.round(e.maxHp * 0.25); } },
  { id: 'enraged', name: 'Enraged', icon: '💢', text: 'Starts with 2 extra Edge.',
    apply: (e) => { e.st.str = (e.st.str ?? 0) + 2; } },
  { id: 'vigorous', name: 'Vigorous', icon: '💗', text: 'Has 30% more HP.',
    apply: (e) => { e.maxHp = Math.round(e.maxHp * 1.3); e.hp = e.maxHp; } },
  { id: 'trapper', name: 'Trapper', icon: '🂠', text: 'Has 1 more trap slot and starts with a Snap Jaw set.',
    apply: (e, cb) => { e.slots++; e.traps.push(cb.mkCard(tier(cb, 'snap_jaw'))); } },
  { id: 'thorned', name: 'Thorned', icon: '🌵', text: 'Starts with 3 Barbs.',
    apply: (e) => { e.st.thorns = (e.st.thorns ?? 0) + 3; } },
];

export const AFFIX_MAP = Object.fromEntries(AFFIXES.map((a) => [a.id, a]));
