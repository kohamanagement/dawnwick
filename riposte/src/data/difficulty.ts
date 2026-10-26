// v0.8 base difficulty: one table that sets how hard Ascension 0 is, on top of the enemy stat blocks.
// Target (bot, Ascension 0, v0.11): a fresh profile wins 15–30% with every class; a career profile wins more (about 30–45%). See docs/BALANCE.md.
// Off for the exact rules tests, Riddles, Arena duels and the tutorial's first fight.

export const DIFFICULTY = {
  on: true,
  /** Enemy HP multiplier by act (index 0 = Act 1) and fight kind. */
  hp: {
    normal: [1.1, 1.17, 1.2, 1.2],
    elite: [1.1, 1.17, 1.2, 1.2],
    boss: [0.9, 0.96, 1.0, 1.0],
  } as Record<'normal' | 'elite' | 'boss', number[]>,
  /** Enemy damage multiplier by act, applied to the base of every enemy hit before Strength. */
  dmg: [1.07, 1.13, 1.19, 1.19],
  /** v0.12 pacing: extra damage by fight kind and act. Act 1 hallway fights cost the bot 1.4 HP and bosses ran
   *  10–11 turns, so hallway enemies hit a little harder and bosses trade HP for damage (shorter, sharper fights). */
  kindDmg: { normal: [1.25, 1.1, 1, 1], elite: [1, 1, 1, 1], boss: [1.12, 1.12, 1.1, 1.1] } as Record<'normal' | 'elite' | 'boss', number[]>,
};

const at = (xs: number[], act: number): number => xs[Math.max(0, Math.min(xs.length - 1, act - 1))];
export const diffHp = (kind: 'normal' | 'elite' | 'boss', act: number): number => (DIFFICULTY.on ? at(DIFFICULTY.hp[kind], act) : 1);
export const diffDmg = (act: number, kind: 'normal' | 'elite' | 'boss' = 'normal'): number => (DIFFICULTY.on ? at(DIFFICULTY.dmg, act) * at(DIFFICULTY.kindDmg[kind], act) : 1);
