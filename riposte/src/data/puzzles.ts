import type { CharId } from '../engine/types';

/**
 * Riddles of the Chain (v0.4): hand-made one-turn puzzles in the tradition of Yu-Gi-Oh!'s
 * "duel puzzles" and Hearthstone's puzzle labs. Every enemy trap is face-up, nothing is random,
 * and `npm test` runs a solver over each one to prove it can be solved (and that the obvious
 * left-to-right play does not solve it).
 *
 * Goals:
 * - win: every enemy must be dead before your next turn starts (Burn, Doom, Thorns and your
 *   set Reactions keep working through the enemy turn).
 * - survive: still be standing when your next turn starts.
 */
export interface PuzzleEnemy {
  id: string;
  hp: number;
  block?: number;
  traps?: string[];
  st?: Record<string, number>;
  move?: string;
}

export interface PuzzleDef {
  id: string;
  name: string;
  tier: 1 | 2 | 3;
  character: CharId;
  goal: 'win' | 'survive';
  /** One line of setup shown before you start. */
  text: string;
  hint: string;
  /** Card ids in hand; a trailing + means upgraded. */
  hand: string[];
  /** Draw pile, top card first. */
  draw?: string[];
  energy: number;
  hp: number;
  slots?: number;
  /** Your Reactions already set, oldest first. */
  traps?: string[];
  st?: Record<string, number>;
  /** Fate Coin: 0 ☀, 1 ☾. */
  coin?: number;
  enemies: PuzzleEnemy[];
}

export const PUZZLES: PuzzleDef[] = [
  { id: 'r_glyph', name: 'Bait the Glyph', tier: 1, character: 'duelist', goal: 'win',
    text: 'A Gatekeeper hides behind a Counter Glyph. Two Cuts would do it, if only one of them got through.',
    hint: 'A Counter Glyph only answers one attack. Give it something cheap to eat.',
    hand: ['strike', 'strike', 'lure'], draw: ['guard'], energy: 2, hp: 30,
    enemies: [{ id: 'gatekeeper', hp: 12, traps: ['counter_glyph'], move: 'smash' }] },
  { id: 'r_answer', name: 'Answer the Answer', tier: 1, character: 'duelist', goal: 'win',
    text: 'The beetle\'s Spike Shell turns your first attack into a love tap.',
    hint: 'Set the Mirror Tide first. It answers the trap that answers you.',
    hand: ['strike', 'strike', 'mirror_tide+'], draw: ['guard'], energy: 2, hp: 30,
    enemies: [{ id: 'bramble_beetle', hp: 12, traps: ['spike_shell'], move: 'horn' }] },
  { id: 'r_kindle', name: 'Kindling', tier: 1, character: 'duelist', goal: 'win',
    text: 'It only has to burn once. Burn ticks at the start of its turn.',
    hint: 'Stoke doubles what is already there. Pile the Burn up first.',
    hand: ['stoke', 'kindling', 'spark_lunge'], energy: 2, hp: 30,
    enemies: [{ id: 'cinder_rat', hp: 16, move: 'bite' }] },
  { id: 'r_mirror', name: 'Mirror, Mirror', tier: 2, character: 'magpie', goal: 'win',
    text: 'The knight\'s Snap Jaw bites anyone who attacks it. What if it bit the knight instead?',
    hint: 'Hall of Mirrors copies the trap it negates into your own slot. The knight attacks on its turn.',
    hand: ['strike', 'strike', 'hall_of_mirrors+'], energy: 2, hp: 30,
    enemies: [{ id: 'rust_knight', hp: 20, traps: ['snap_jaw2'], move: 'slash' }] },
  { id: 'r_cashout', name: 'Cash Out', tier: 2, character: 'sharp', goal: 'win',
    text: 'You have 2 Ante on the table and one Cash Out in hand. Make it count.',
    hint: 'Doubling is best done last. Call It flips the coin, and on ☾ it draws.',
    hand: ['cash_out', 'high_roller', 'call_it', 'ante_up'], draw: ['guard', 'guard'], energy: 2, hp: 10, st: { ante: 2 },
    enemies: [{ id: 'jar_mimic', hp: 33, move: 'chomp' }] },
  { id: 'r_breaker', name: 'Glyph Breaker', tier: 2, character: 'hollow', goal: 'win',
    text: 'A Counter Glyph and a Spike Shell. Shatter Seal can break one of them.',
    hint: 'Let the cheapest card take the Negate, then break what is left.',
    hand: ['shatter_seal', 'strike', 'strike', 'lure'], draw: ['strike'], energy: 2, hp: 30,
    enemies: [{ id: 'gatekeeper', hp: 12, traps: ['counter_glyph', 'spike_shell'], move: 'smash' }] },
  { id: 'r_fury', name: 'Fury of the Chain', tier: 2, character: 'duelist', goal: 'win',
    text: 'Snap Jaw will bite you for 5. Make the bite worth it.',
    hint: 'Fury Chain gains Edge only when its chain reaches 2 links.',
    hand: ['strike', 'flame_lash', 'fury_chain', 'strike'], energy: 3, hp: 10,
    enemies: [{ id: 'rust_knight', hp: 28, traps: ['snap_jaw'], move: 'slash' }] },
  { id: 'r_doom', name: 'Doom Clock', tier: 2, character: 'hollow', goal: 'win',
    text: 'Doom kills at the start of its turn if it is at least the enemy\'s HP.',
    hint: 'Final Hour doubles Doom. What should it double?',
    hand: ['final_hour', 'hollow_cut', 'creeping_end'], energy: 3, hp: 30,
    enemies: [{ id: 'iron_colossus', hp: 39, move: 'smash' }] },
  { id: 'r_glitter', name: 'All That Glitters', tier: 2, character: 'magpie', goal: 'win',
    text: 'A Counter Glyph sits in front of a pile of shiny things.',
    hint: 'Glints are Tricks, not Attacks. Glass Cannon counts the Glints still in your hand.',
    hand: ['glass_cannon', 'glitter_bomb', 'cutpurse', 'snatch'], energy: 3, hp: 30,
    enemies: [{ id: 'auctioneer', hp: 19, traps: ['counter_glyph'], move: 'twice' }] },
  { id: 'r_thorns', name: 'The Thorn Wall', tier: 2, character: 'warden', goal: 'win',
    text: 'The stalker rakes three times. Its Smother waits for your Reaction.',
    hint: 'A Reaction that answers traps can protect a Reaction that answers attacks.',
    hand: ['barkskin', 'bramble_ward', 'thornmail', 'bramble_snare', 'mirror_tide'], energy: 3, hp: 16,
    enemies: [{ id: 'phase_stalker', hp: 18, traps: ['smother'], move: 'rake' }] },
  { id: 'r_faces', name: 'Two Faces', tier: 3, character: 'sharp', goal: 'win',
    text: 'The coin shows ☀. Every Gilt card reads it, then flips it.',
    hint: 'Heads Up loves ☀, All In loves ☾. Call It is a free flip.',
    hand: ['coin_toss', 'all_in', 'heads_up', 'call_it'], energy: 4, hp: 30, coin: 0,
    enemies: [{ id: 'iron_colossus', hp: 45, move: 'smash' }] },
  { id: 'r_copycat', name: 'Copycat', tier: 3, character: 'magpie', goal: 'win',
    text: 'Copycat repeats the last Attack or Trick you played this turn. Which one?',
    hint: 'Mimic the card that makes the most Glints, then let Glass Cannon count them.',
    hand: ['glass_cannon', 'copycat+', 'glitter_bomb', 'peck'], energy: 2, hp: 30,
    enemies: [{ id: 'gatekeeper', hp: 33, traps: ['counter_glyph'], move: 'smash' }] },
  { id: 'r_six', name: 'Six Links', tier: 3, character: 'duelist', goal: 'win',
    text: 'Your two Reactions answer traps. The enemy has three. Chainbreaker grows with the longest chain of the fight.',
    hint: 'Start the chain with the cheapest attack you have, then break it.',
    hand: ['chainbreaker', 'strike', 'lure'], draw: ['strike'], energy: 2, hp: 30, traps: ['mirror_tide', 'undercurrent'],
    enemies: [{ id: 'trapmaster', hp: 28, traps: ['snap_jaw', 'smother', 'soul_snare'], move: 'spring' }] },
  { id: 'r_pyre', name: 'Pyroclasm', tier: 3, character: 'duelist', goal: 'win',
    text: 'Two enemies. One of them answers Tricks with a Mirror Veil.',
    hint: 'Flashpoint spreads to everyone when it is in a chain. Who would start that chain?',
    hand: ['kindling', 'pyroclasm', 'flashpoint', 'lure'], energy: 3, hp: 30,
    enemies: [{ id: 'masked_dancer', hp: 18, traps: ['mirror_veil'], move: 'waltz' }, { id: 'velvet_knife', hp: 15, move: 'backstab' }] },
];

export const PUZZLE_MAP: Record<string, PuzzleDef> = Object.fromEntries(PUZZLES.map((p) => [p.id, p]));

/** Coins for the first solve of a puzzle, by tier. */
export const PUZZLE_REWARD: Record<number, number> = { 1: 30, 2: 60, 3: 100 };
