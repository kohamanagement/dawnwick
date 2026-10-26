import type { CardDef, ModId, Vals } from '../engine/types';

/**
 * Sigils: small permanent tweaks stamped onto a card. Most of them bend the chain rather than
 * add raw stats, so a modded card plays differently, not just bigger.
 */
export interface ModDef {
  id: ModId;
  name: string;
  icon: string;
  text: string;
  /** Dust to imprint in the Forge. */
  dust: number;
  /** Can this sigil go on that card? */
  fits: (d: CardDef) => boolean;
}

const KEEN_KEYS = ['d', 'b', 'm', 'h'];

export const MODS: Record<ModId, ModDef> = {
  keen: { id: 'keen', name: 'Keen', icon: '◈', dust: 60, text: 'Its damage, Guard, Doom and healing numbers are 25% higher (at least +2).',
    fits: (d) => KEEN_KEYS.some((k) => k in d.v) },
  linked: { id: 'linked', name: 'Linked', icon: '⛓', dust: 80, text: 'Counts as 1 extra chain link for its own Chain bonuses.',
    fits: (d) => /Chain \d/.test(d.text) },
  ricochet: { id: 'ricochet', name: 'Ricochet', icon: '↩', dust: 50, text: 'If it is Negated, it bounces back to your hand instead of the discard pile.',
    fits: (d) => d.type === 'attack' || d.type === 'skill' },
  swift: { id: 'swift', name: 'Swift', icon: '⚡', dust: 150, text: 'Costs 1 less.',
    fits: (d) => d.cost > 0 && d.type !== 'curse' },
  lasting: { id: 'lasting', name: 'Lasting', icon: '⏳', dust: 40, text: 'Palm: stays in your hand at the end of your turn.',
    fits: (d) => !d.retain && d.type !== 'curse' },
  opening: { id: 'opening', name: 'Opening', icon: '☀', dust: 40, text: 'Opener: always in your opening hand.',
    fits: (d) => !d.innate && d.type !== 'curse' },
  // v0.5: sigils with a catch (a drawback makes a mod a decision).
  reckless: { id: 'reckless', name: 'Reckless', icon: '☠', dust: 50, text: 'Deals 50% more damage, but you lose 2 HP whenever you play it.',
    fits: (d) => 'd' in d.v && d.type === 'attack' },
  echoing: { id: 'echoing', name: 'Echoing', icon: '🔁', dust: 160, text: 'The first time you play it each fight, it happens twice.',
    fits: (d) => (d.type === 'attack' || d.type === 'skill') && !d.noMimic },
  haunted: { id: 'haunted', name: 'Haunted', icon: '👻', dust: 60, text: 'When this Reaction leaves play (fires, is pushed out, Sacrificed or destroyed), gain 5 Guard.',
    fits: (d) => d.type === 'reaction' },
};

export const MOD_LIST = Object.values(MODS);

export function applyMod(v: Vals, mod?: ModId): Vals {
  if (mod === 'reckless') return 'd' in v ? { ...v, d: Math.ceil(v.d * 1.5) } : v;
  if (mod !== 'keen') return v;
  const out: Vals = { ...v };
  for (const k of KEEN_KEYS) if (k in out && out[k] > 0) out[k] = out[k] + Math.max(2, Math.ceil(out[k] * 0.25));
  return out;
}
