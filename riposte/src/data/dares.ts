import type { CombatState } from '../engine/types';

/**
 * Dares: before an elite or boss fight you may stake gold on beating it with style.
 * They push you to play the chain on purpose (bait traps, Negate, finish fast) instead of turtling.
 */
export interface DareDef {
  id: string;
  name: string;
  icon: string;
  text: (kind: CombatState['kind']) => string;
  check: (s: CombatState) => boolean;
}

const turns = (k: CombatState['kind']) => (k === 'boss' ? 7 : 4);
const hpLimit = (k: CombatState['kind']) => (k === 'boss' ? 18 : 10);

export const DARES: DareDef[] = [
  { id: 'swift', name: 'Swift Blade', icon: '⏱', text: (k) => `Win by the end of turn ${turns(k)}.`, check: (s) => s.turn <= turns(s.kind) },
  { id: 'untouched', name: 'Untouchable', icon: '🪶', text: (k) => `Lose at most ${hpLimit(k)} HP this fight.`,
    check: (s) => (s.stats.startHp ?? s.player.maxHp) - s.player.hp <= hpLimit(s.kind) },
  { id: 'showman', name: 'Showman', icon: '🎭', text: () => 'Resolve a chain of 4 or more links.', check: (s) => s.stats.maxChain >= 4 },
  { id: 'riposte', name: 'Riposte!', icon: '⟲', text: () => 'Negate at least 2 enemy actions.', check: (s) => (s.stats.negates ?? 0) >= 2 },
  { id: 'chainer', name: 'Chainmaker', icon: '⛓', text: () => 'Resolve 5 or more chains this fight.', check: (s) => s.stats.chains >= 5 },
];

export const DARE_MAP = Object.fromEntries(DARES.map((d) => [d.id, d]));
export const DARE_PAYOUT = 40;
