import type { Combat } from '../engine/combat';
import { rewardPool } from './cards';
import { OMEN_LIST, gainOmen } from './omens';

/**
 * v0.6 Surprises: about one normal or elite fight in six, something happens in the middle of it, on your
 * turn 2 or 3. Most help, a few hurt, and a couple hit everyone. They pop up as a card over the table.
 */
export interface SurpriseDef { id: string; name: string; icon: string; text: string; good: number; fn: (cb: Combat) => void }

const SWARM: Record<number, string> = { 1: 'cinder_rat', 2: 'wick_imp', 3: 'rift_spawn' };

export const SURPRISES: SurpriseDef[] = [
  { id: 'bard', name: 'A Wandering Bard', icon: '🎻', good: 1, text: 'A bard strikes up a fighting song. You heal 6 HP and draw 1 card.',
    fn: (cb) => { cb.heal(cb.s.player, 6); cb.drawCards(1); } },
  { id: 'reinforcements', name: 'Reinforcements!', icon: '📯', good: -1, text: 'A horn sounds. Another enemy joins the fight.',
    fn: (cb) => { cb.summon(SWARM[Math.min(3, Math.max(1, cb.run.act))]); } },
  { id: 'cart', name: 'A Runaway Cart', icon: '🛒', good: 1, text: 'A cart full of turnips careens through the fight: 8 damage to every enemy.',
    fn: (cb) => { for (const e of cb.alive()) cb.rawDamage(e, 8); } },
  { id: 'dog', name: 'A Stray Dog', icon: '🐕', good: 1, text: 'A stray dog picks a side. It bites a random enemy for 12.',
    fn: (cb) => { const f = cb.alive(); if (f.length) cb.rawDamage(cb.rng.pick(f), 12); } },
  { id: 'tremor', name: 'Tremor', icon: '🌋', good: 0, text: 'The ground heaves. Everyone loses all Guard, and every enemy loses one set trap.',
    fn: (cb) => { cb.s.player.block = 0; for (const e of cb.alive()) { e.block = 0; const t = e.traps.shift(); if (t) cb.retire(t, e); } } },
  { id: 'star', name: 'A Shooting Star', icon: '🌠', good: 1, text: 'You make a wish. Gain 2 energy and draw 2 cards.',
    fn: (cb) => { cb.s.energy += 2; cb.drawCards(2); } },
  { id: 'thunder', name: 'Thunderclap', icon: '⚡', good: 0, text: 'Lightning strikes the table: everyone takes 5 damage, you included.',
    fn: (cb) => { for (const c of [cb.s.player, ...cb.alive()]) cb.rawDamage(c, 5); } },
  { id: 'fog', name: 'Fog Rolls In', icon: '🌫️', good: 1, text: 'Nobody can see a thing. Enemies get 2 Shaken; you get 1.',
    fn: (cb) => { for (const e of cb.alive()) cb.applyStatus(e, e, 'weak', 2); cb.applyStatus(cb.s.player, cb.s.player, 'weak', 1); } },
  { id: 'rival', name: 'A Rival Watches', icon: '🤺', good: 1, text: 'A rival tosses you a card from their deck: a random rare from your factions, free this turn.',
    fn: (cb) => { const p = rewardPool(cb.run.character, cb.run.level, 'rare', cb.run.owned); if (p.length) cb.addCard(cb.rng.pick(p), 'hand', true); } },
  { id: 'coins', name: 'Coins from the Sky', icon: '💰', good: 1, text: 'A purse bursts overhead. +15 gold.',
    fn: (cb) => { if (cb.run.arena || cb.run.puzzle) return; cb.run.gold += 15; cb.run.stats.goldEarned += 15; } },
  { id: 'omen', name: 'A Lost Omen', icon: '🔮', good: 1, text: 'A tarot card flutters down. Gain a random Omen (if you have room).',
    fn: (cb) => { if (!cb.run.arena && !cb.run.puzzle) gainOmen(cb.run, cb.rng.pick(OMEN_LIST).id); } },
  { id: 'wind', name: 'Second Wind', icon: '🌬️', good: 1, text: 'A cool breeze. Gain 10 Guard and draw 1 card.', fn: (cb) => { cb.gainBlock(cb.s.player, 10); cb.drawCards(1); } },
  { id: 'bloodlust', name: 'Bloodlust', icon: '😡', good: -1, text: 'Something in the air drives your enemies wild. They gain 2 Edge.',
    fn: (cb) => { for (const e of cb.alive()) cb.applyStatus(e, e, 'str', 2); } },
  { id: 'sweep', name: 'Spring Cleaning', icon: '🧹', good: 0, text: 'A gust sweeps the table: every set Reaction and trap, yours and theirs, is destroyed.',
    fn: (cb) => { for (const c of [cb.s.player, ...cb.alive()]) { for (const t of c.traps) cb.retire(t, c); c.traps = []; } } },
  { id: 'spring', name: 'A Healing Spring', icon: '⛲', good: 0, text: 'Water bubbles up under everyone. Everyone heals 8 HP.',
    fn: (cb) => { for (const c of [cb.s.player, ...cb.alive()]) cb.heal(c, 8); } },
  { id: 'ink', name: 'Spilled Ink', icon: '🖋️', good: 0, text: 'An ink pot tips over your deck: 2 cards are Blotted. You gain 2 energy while you mop up.',
    fn: (cb) => { cb.blot(2); cb.s.energy += 2; } },
  { id: 'crow', name: 'A Helpful Crow', icon: '🐦‍⬛', good: 1, text: 'A crow plucks a trap from an enemy and drops it in your slot (Steal 1).',
    fn: (cb) => { cb.steal(cb.s.player, 1); } },
  { id: 'heckler', name: 'A Heckler', icon: '🗯️', good: -1, text: 'Someone in the crowd shouts advice to your enemies. They each gain 8 Guard.',
    fn: (cb) => { for (const e of cb.alive()) cb.gainBlock(e, 8); } },
];
export const SURPRISE_MAP: Record<string, SurpriseDef> = Object.fromEntries(SURPRISES.map((s) => [s.id, s]));
