import type { Combat } from '../engine/combat';
import type { Combatant } from '../engine/types';

/**
 * Venues (v0.5): the place a fight happens bends its rules for everyone at the table, like Marvel Snap's
 * locations or Riftbound's battlefields. Most of them bend the chain itself (slots, length, what traps do),
 * so the same deck plays differently from one room to the next. Elite and boss Venues are shown on the
 * map in advance; normal fights sometimes roll one on arrival.
 */
export interface VenueDef {
  id: string;
  name: string;
  icon: string;
  text: string;
  /** Reaction slots for everyone (player and enemies), min 1. */
  slots?: number;
  /** Extra chain links allowed. */
  chain?: number;
  /** Added to all card and move damage (everyone). */
  dmg?: number;
  /** Enemy traps are face-up. */
  reveal?: boolean;
  /** No one can gain Strength. */
  noStr?: boolean;
  /** Style multiplier. */
  style?: number;
  /** Extra Flux you can carry. */
  flux?: number;
  start?: (cb: Combat) => void;
  turnStart?: (cb: Combat) => void;
  onChain?: (cb: Combat, len: number) => void;
  enemyDied?: (cb: Combat, e: Combatant) => void;
  reactionLeft?: (cb: Combat, owner: Combatant) => void;
}

export const VENUES: VenueDef[] = [
  { id: 'narrow_bridge', name: 'The Narrow Bridge', icon: '🌉', slots: -1, text: 'Everyone has 1 fewer Reaction slot (at least 1).' },
  { id: 'grand_hall', name: 'The Grand Hall', icon: '🏛️', slots: 1, text: 'Everyone has 1 more Reaction slot. Every enemy starts with a face-down trap.',
    start: (cb) => { for (const e of cb.alive()) if (e.traps.length < e.slots) e.traps.push(cb.mkCard(cb.tier('spike_shell'))); } },
  { id: 'echo_hall', name: 'Hall of Echoes', icon: '🔔', chain: 2, style: 2, text: 'Chains can be 2 links longer. Style is doubled.' },
  { id: 'candle_crypt', name: 'Candlelit Crypt', icon: '🕯️', reveal: true, text: 'Enemy traps are face-up. Every enemy starts with 2 extra Guard each turn.',
    turnStart: (cb) => { for (const e of cb.alive()) cb.gainBlock(e, 2); } },
  { id: 'rose_garden', name: 'The Rose Garden', icon: '🌹', text: 'Everyone starts with 3 Barbs.',
    start: (cb) => { for (const c of [cb.s.player, ...cb.alive()]) cb.applyStatus(c, c, 'thorns', 3); } },
  { id: 'gambling_den', name: 'The Gambling Den', icon: '🎲', text: 'Your Fate Coin flips at the start of each of your turns. Gain 6 gold whenever an enemy falls.',
    turnStart: (cb) => { if (cb.s.turn > 1) cb.flip(cb.s.player); },
    enemyDied: (cb) => { if (!cb.run.arena && !cb.run.puzzle) { cb.run.gold += 6; cb.run.stats.goldEarned += 6; } } },
  { id: 'storm_roof', name: 'The Storm Roof', icon: '⛈️', text: 'At the start of each of your turns, lightning strikes a random combatant (you included) for 5.',
    turnStart: (cb) => {
      const all: Combatant[] = [cb.s.player, ...cb.alive()];
      const t = cb.rng.pick(all);
      cb.emit({ t: 'text', who: cb.whoKey(t), s: '⚡ Lightning' });
      cb.rawDamage(t, 5);
    } },
  { id: 'sanctuary', name: 'The Sanctuary', icon: '⛪', noStr: true, text: 'No one can gain Edge here.' },
  { id: 'ossuary', name: 'The Ossuary', icon: '💀', text: "Whenever a Reaction or trap leaves play, its owner's foes gain 2 Doom.",
    reactionLeft: (cb, owner) => { for (const f of cb.foesOf(owner)) cb.applyStatus(owner, f, 'doom', 2); } },
  { id: 'dueling_ground', name: 'The Dueling Ground', icon: '⚔️', dmg: 2, text: 'All card and move damage is 2 higher, for everyone.' },
  { id: 'hourglass', name: 'The Hourglass Chamber', icon: '⏳', text: 'You gain 1 energy each turn. Enemies gain 1 Edge at the end of each of their turns.',
    start: (cb) => { for (const e of cb.alive()) cb.applyStatus(e, e, 'ritual', 1); },
    turnStart: (cb) => { cb.s.energy += 1; } },
  { id: 'flooded_cellar', name: 'The Flooded Cellar', icon: '🌊', flux: 2, text: 'You can carry 2 more Flux. Burn has no effect here (it is washed away each turn).',
    turnStart: (cb) => { for (const c of [cb.s.player, ...cb.alive()]) delete c.st.burn; } },
  { id: 'overgrown_ruin', name: 'The Overgrown Ruin', icon: '🌿', text: 'Everyone gains 3 Guard at the start of each of their turns.',
    start: (cb) => { for (const c of [cb.s.player, ...cb.alive()]) cb.applyStatus(c, c, 'growth', 3); } },
  { id: 'bell_tower', name: 'The Bell Tower', icon: '🛎️', text: 'Whenever a chain of 3+ links resolves, every enemy takes 4 damage, and so do you.',
    onChain: (cb, len) => { if (len < 3) return; for (const e of cb.alive()) cb.rawDamage(e, 4); cb.rawDamage(cb.s.player, 4); } },
  { id: 'library', name: 'The Silent Library', icon: '📚', text: 'You draw 1 more card each turn. Every enemy starts with a Hex Mirror set (Shaken on your Tricks).',
    start: (cb) => { for (const e of cb.alive()) if (e.traps.length < e.slots) e.traps.push(cb.mkCard(cb.tier('hex_mirror'))); },
    turnStart: (cb) => cb.drawCards(1) },
  { id: 'thieves_market', name: "The Thieves' Market", icon: '🫳', text: 'Every enemy starts with a Snap Jaw and you Steal 1 trap when the fight starts. On your 3rd turn, every enemy steals one of your set Reactions.',
    start: (cb) => { for (const e of cb.alive()) if (e.traps.length < e.slots) e.traps.push(cb.mkCard(cb.tier('snap_jaw'))); cb.steal(cb.s.player, 1); },
    turnStart: (cb) => { if (cb.s.turn === 3) for (const e of cb.alive()) cb.steal(e, 1); } },
];

export const VENUE_MAP: Record<string, VenueDef> = Object.fromEntries(VENUES.map((v) => [v.id, v]));
export const VENUE_IDS = VENUES.map((v) => v.id);
