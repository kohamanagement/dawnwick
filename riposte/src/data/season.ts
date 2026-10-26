/**
 * Season track and cosmetics. The track is free and earnable by playing (no paid tier): 2025-26
 * player reviews reward passes an active player can actually finish, and punish paywalled ones.
 * Renown comes from every run (XP-like, plus Style and Wager), so any mode moves it.
 */
export const SEASON = { id: 's1', name: 'Season 1: The Gilded Masquerade', ends: '2026-12-31', tierRenown: 120, tiers: 30 };

export interface Cosmetic { id: string; kind: 'familiar' | 'back' | 'title'; name: string; icon: string; text: string }

export const COSMETICS: Cosmetic[] = [
  // Familiars: a creepy-cute companion that sits by your duelist and cheers on long chains. Purely cosmetic.
  { id: 'fam_inkwell', kind: 'familiar', name: 'Inkwell the Cat', icon: '🐈‍⬛', text: 'Mrrp! Purrs at every 3-link chain.' },
  { id: 'fam_owl', kind: 'familiar', name: 'Professor Hoot', icon: '🦉', text: 'Nods sagely at a Negate.' },
  { id: 'fam_toad', kind: 'familiar', name: 'Sir Croaksworth', icon: '🐸', text: 'Ribbit. Has seen things in the Drowned Market.' },
  { id: 'fam_bat', kind: 'familiar', name: 'Nibbles', icon: '🦇', text: 'Squeaks for Doom.' },
  { id: 'fam_fox', kind: 'familiar', name: 'Vesper the Fox', icon: '🦊', text: 'Grins at a well-laid trap.' },
  { id: 'fam_ghost', kind: 'familiar', name: 'Boo', icon: '👻', text: 'A friendly Echo of an Echo.' },
  { id: 'fam_crow', kind: 'familiar', name: 'Old Caw', icon: '🐦‍⬛', text: 'Collects shiny Ante.' },
  { id: 'fam_moth', kind: 'familiar', name: 'Lanternwing', icon: '🦋', text: 'Drawn to the Lantern Warden. Unwisely.' },
  // Card backs (shown on your draw pile and on unopened pack cards)
  { id: 'back_classic', kind: 'back', name: 'Duelist Classic', icon: '🂠', text: 'The original crossed blades.' },
  { id: 'back_gilded', kind: 'back', name: 'Gilded Masquerade', icon: '🎭', text: 'Season 1 gold filigree.' },
  { id: 'back_tarot', kind: 'back', name: 'Arcana', icon: '🔮', text: 'Star-chart tarot back.' },
  { id: 'back_abyss', kind: 'back', name: 'Abyssal', icon: '🕳️', text: 'A back that stares back.' },
  { id: 'back_clock', kind: 'back', name: 'Clockwork', icon: '⚙️', text: 'Brass gears, always turning.' },
  // Titles (shown on your profile and Arena card)
  { id: 'title_novice', kind: 'title', name: 'Novice Duelist', icon: '🎗', text: '' },
  { id: 'title_masked', kind: 'title', name: 'The Masked', icon: '🎭', text: '' },
  { id: 'title_heat', kind: 'title', name: 'High Roller', icon: '🔥', text: '' },
  { id: 'title_arena', kind: 'title', name: 'Arena Champion', icon: '🏟', text: '' },
  { id: 'title_gilded', kind: 'title', name: 'Gilded Legend', icon: '👑', text: '' },
  { id: 'title_master', kind: 'title', name: 'Card Master', icon: '📜', text: '' },
  // v0.4
  { id: 'fam_raccoon', kind: 'familiar', name: 'Bandit', icon: '🦝', text: 'Steals the spotlight. And your snacks.' },
  { id: 'fam_dragon', kind: 'familiar', name: 'Smolder', icon: '🐉', text: 'Hatched from the Reflection\'s last ember.' },
  { id: 'fam_snail', kind: 'familiar', name: 'Escargot', icon: '🐌', text: 'Takes its time. Always finds the answer.' },
  { id: 'back_rose', kind: 'back', name: 'Briar Rose', icon: '🌹', text: 'Thorned vines over black lacquer.' },
  { id: 'back_mirror', kind: 'back', name: 'Silvered', icon: '🪞', text: 'A back that shows the card in front.' },
  { id: 'title_flock', kind: 'title', name: 'Head of the Flock', icon: '🐦‍⬛', text: '' },
  { id: 'title_sonata', kind: 'title', name: 'Chain Virtuoso', icon: '🎼', text: '' },
  { id: 'title_mirror', kind: 'title', name: 'Unbroken Mirror', icon: '🪞', text: '' },
  { id: 'title_riddler', kind: 'title', name: 'Riddler', icon: '🧩', text: '' },
  // v0.5
  { id: 'fam_skull', kind: 'familiar', name: 'Yorick', icon: '💀', text: 'Alas. Chatters its teeth at every Exhume.' },
  { id: 'fam_wisp', kind: 'familiar', name: 'Wisp', icon: '🕯️', text: 'A little flame that followed you out of the Long Night.' },
  { id: 'back_grave', kind: 'back', name: 'Gravestone', icon: '⚰️', text: 'Lichen on granite. Rest in pieces.' },
  { id: 'back_stage', kind: 'back', name: 'Velvet Curtain', icon: '🎪', text: 'For duelists who have played every room.' },
  { id: 'title_sexton', kind: 'title', name: 'Keeper of the Crypt', icon: '⚰️', text: '' },
  { id: 'title_nemesis', kind: 'title', name: 'Grudge Settled', icon: '☠️', text: '' },
  { id: 'title_night', kind: 'title', name: 'Dawnbreaker', icon: '🌅', text: '' },
];
export const COSMETIC_MAP = Object.fromEntries(COSMETICS.map((c) => [c.id, c]));
export const DEFAULT_COSMETICS = ['back_classic', 'title_novice'];

export interface TierReward { coins?: number; dust?: number; pack?: string; cosmetic?: string; card?: string }

/** 30 tiers. Every 5th tier is a highlight (cosmetic or pack). */
export const SEASON_TRACK: TierReward[] = [
  { coins: 60 }, { dust: 60 }, { pack: 'standard' }, { coins: 80 }, { cosmetic: 'fam_inkwell' },
  { dust: 80 }, { pack: 'gilt' }, { coins: 100 }, { dust: 100 }, { cosmetic: 'back_gilded' },
  { pack: 'standard' }, { coins: 120 }, { cosmetic: 'title_masked' }, { dust: 120 }, { pack: 'legend' },
  { coins: 140 }, { cosmetic: 'fam_fox' }, { dust: 140 }, { pack: 'gilt' }, { cosmetic: 'back_tarot' },
  { coins: 160 }, { dust: 160 }, { cosmetic: 'fam_ghost' }, { pack: 'standard' }, { pack: 'legend' },
  { coins: 200 }, { cosmetic: 'back_clock' }, { dust: 200 }, { cosmetic: 'fam_crow' }, { card: 'house_wins', cosmetic: 'title_gilded' },
];

/** Card mastery: plays needed for each level (Snap-style card progression, cosmetic only). */
export const MASTERY = [5, 15, 35, 70, 120];
export const MASTERY_NAMES = ['', 'Bronze', 'Silver', 'Gold', 'Prismatic', 'Living'];
export const MASTERY_DUST = [10, 20, 30, 50, 100];

export function masteryLevel(plays: number): number {
  let l = 0;
  for (const t of MASTERY) if (plays >= t) l++;
  return l;
}
