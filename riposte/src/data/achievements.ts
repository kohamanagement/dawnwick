import type { Profile } from '../engine/meta';

/** Rewards: Coins, Dust, booster packs, and unlocks (relics enter the run pool, cards go into the collection). */
export interface AchReward { coins?: number; dust?: number; pack?: string; relic?: string; card?: string; cosmetic?: string }

export interface AchDef {
  id: string;
  name: string;
  icon: string;
  text: string;
  reward: AchReward;
  done: (p: Profile) => boolean;
  /** 0..1 progress for the UI. */
  prog?: (p: Profile) => [number, number];
}

const n = (p: Profile, k: string) => p.counters[k] ?? 0;
const c = (k: string, goal: number) => (p: Profile): [number, number] => [Math.min(goal, n(p, k)), goal];

export const ACHIEVEMENTS: AchDef[] = [
  { id: 'first_blood', name: 'First Blood', icon: '🗡', text: 'Win your first fight.', reward: { coins: 50 }, done: (p) => n(p, 'fights') >= 1 },
  { id: 'act1', name: 'Lantern Snuffed', icon: '🏮', text: 'Defeat the Act 1 boss.', reward: { pack: 'standard', coins: 50 }, done: (p) => n(p, 'bosses') >= 1 },
  { id: 'chain3', name: 'Call and Answer', icon: '⟲', text: 'Resolve a chain of 3 links.', reward: { coins: 60 }, done: (p) => p.longestChain >= 3 },
  { id: 'chain5', name: 'Five-Link Fugue', icon: '⛓', text: 'Resolve a chain of 5 links.', reward: { relic: 'chain_gauntlet', dust: 100 }, done: (p) => p.longestChain >= 5 },
  { id: 'elite5', name: 'Rival Hunter', icon: '👹', text: 'Defeat 5 rivals.', reward: { pack: 'standard' }, done: (p) => n(p, 'elites') >= 5, prog: c('elites', 5) },
  { id: 'champ3', name: 'Champion Slayer', icon: '🔥', text: 'Defeat 3 Champion rivals.', reward: { relic: 'trophy_belt', coins: 100 }, done: (p) => n(p, 'champs') >= 3, prog: c('champs', 3) },
  { id: 'dare3', name: 'Daredevil', icon: '🎲', text: 'Win 3 Dares.', reward: { pack: 'legend' }, done: (p) => n(p, 'dares') >= 3, prog: c('dares', 3) },
  { id: 'win1', name: 'Riposte!', icon: '🏆', text: 'Win a run.', reward: { relic: 'kings_reserve', pack: 'legend' }, done: (p) => p.wins >= 1 },
  { id: 'win_all', name: 'Three Styles', icon: '🎖', text: 'Win a run with every duelist.', reward: { card: 'grand_riposte', coins: 300 },
    done: (p) => ['duelist', 'warden', 'hollow'].every((ch) => (p.charWins[ch] ?? 0) > 0),
    prog: (p) => [['duelist', 'warden', 'hollow'].filter((ch) => (p.charWins[ch] ?? 0) > 0).length, 3] },
  // v0.3
  { id: 'sharp_win', name: 'House Rules', icon: '🎩', text: 'Win a run with the Cardsharp.', reward: { card: 'golden_riposte', coins: 150 }, done: (p) => (p.charWins.sharp ?? 0) > 0 },
  { id: 'heat5', name: 'Turn Up the Wager', icon: '🌡', text: 'Win a run at Wager 5 or more.', reward: { pack: 'legend', cosmetic: 'back_abyss' }, done: (p) => Object.values(p.heatWins ?? {}).some((h) => (h ?? 0) >= 5) },
  { id: 'arena3', name: 'Rising Rival', icon: '🏟', text: 'Win 3 Arena duels.', reward: { coins: 120, cosmetic: 'fam_owl' }, done: (p) => n(p, 'arenaWins') >= 3, prog: c('arenaWins', 3) },
  { id: 'arena7', name: 'Seven Straight', icon: '🏆', text: 'Reach 7 wins in one Arena run.', reward: { pack: 'legend', dust: 300 }, done: (p) => (p.arenaBest ?? 0) >= 7 },
  { id: 'omens10', name: 'Reader of Omens', icon: '🔮', text: 'Use 10 Omens.', reward: { coins: 100, cosmetic: 'fam_moth' }, done: (p) => n(p, 'omens') >= 10, prog: c('omens', 10) },
  { id: 'altboss', name: 'Other Roads', icon: '🗺', text: 'Defeat the boss of an alternate act.', reward: { coins: 100, cosmetic: 'fam_toad' }, done: (p) => n(p, 'altBosses') >= 1 },
  { id: 'master1', name: 'Living Legend', icon: '📜', text: 'Raise a card to mastery 5 (Living).', reward: { dust: 300, cosmetic: 'title_master' }, done: (p) => n(p, 'mastered') >= 1 },
  { id: 'four_styles', name: 'Four Styles', icon: '🎖', text: 'Win a run with all four duelists.', reward: { cosmetic: 'fam_bat', coins: 300 },
    done: (p) => ['duelist', 'warden', 'hollow', 'sharp'].every((ch) => (p.charWins[ch] ?? 0) > 0),
    prog: (p) => [['duelist', 'warden', 'hollow', 'sharp'].filter((ch) => (p.charWins[ch] ?? 0) > 0).length, 4] },
  { id: 'asc3', name: 'Climbing', icon: '⛰', text: 'Unlock Stakes 3 on any duelist.', reward: { coins: 200, dust: 200 }, done: (p) => Object.values(p.ascension).some((a) => a >= 3) },
  { id: 'packs5', name: 'Pack Rat', icon: '🎁', text: 'Open 5 booster packs.', reward: { coins: 150 }, done: (p) => n(p, 'packs') >= 5, prog: c('packs', 5) },
  { id: 'craft1', name: 'Apprentice Smith', icon: '⚒', text: 'Craft a card.', reward: { dust: 60 }, done: (p) => n(p, 'crafted') >= 1 },
  { id: 'imprint1', name: 'Sigil Scribe', icon: '◈', text: 'Imprint a sigil on a card.', reward: { dust: 80 }, done: (p) => n(p, 'imprinted') >= 1 },
  { id: 'collect40', name: 'Collector', icon: '📚', text: 'Own 40 different cards.', reward: { pack: 'legend' }, done: (p) => Object.keys(p.collection).length >= 40,
    prog: (p) => [Math.min(40, Object.keys(p.collection).length), 40] },
  { id: 'legend1', name: 'Legend in Hand', icon: '🌟', text: 'Own a Legendary card.', reward: { coins: 150 }, done: (p) => n(p, 'legendaries') >= 1 },
  { id: 'rich', name: 'Deep Pockets', icon: '💰', text: 'Earn 1,000 gold across all runs.', reward: { relic: 'merchant_seal' }, done: (p) => n(p, 'gold') >= 1000, prog: c('gold', 1000) },
  { id: 'riposte_gamble', name: 'Lucky Riposte', icon: '🍀', text: 'Win a Riposte gamble on a booster pack.', reward: { dust: 100 }, done: (p) => n(p, 'gambleWins') >= 1 },
  { id: 'legacy1', name: 'Leave a Mark', icon: '🪞', text: 'Mint a Legacy deck.', reward: { coins: 100 }, done: (p) => p.legacy.length >= 1 },
  // v0.4
  { id: 'magpie_win', name: 'Birds of a Feather', icon: '🐦‍⬛', text: 'Win a run with the Magpie.', reward: { card: 'gilded_nest', cosmetic: 'fam_raccoon' }, done: (p) => (p.charWins.magpie ?? 0) > 0 },
  { id: 'steal25', name: 'Sticky Fingers', icon: '🫳', text: 'Steal 25 enemy traps.', reward: { relic: 'nest_egg', coins: 100 }, done: (p) => n(p, 'steals') >= 25, prog: c('steals', 25) },
  { id: 'five_styles', name: 'Five Styles', icon: '🎖', text: 'Win a run with all five duelists.', reward: { card: 'mirror_riposte', cosmetic: 'title_flock', coins: 300 },
    done: (p) => ['duelist', 'warden', 'hollow', 'sharp', 'magpie'].every((ch) => (p.charWins[ch] ?? 0) > 0),
    prog: (p) => [['duelist', 'warden', 'hollow', 'sharp', 'magpie'].filter((ch) => (p.charWins[ch] ?? 0) > 0).length, 5] },
  { id: 'reflection', name: 'Face Yourself', icon: '🪞', text: 'Defeat the Reflection in Act 4.', reward: { pack: 'legend', cosmetic: 'fam_dragon' },
    done: (p) => Object.values(p.reflections ?? {}).some((x) => (x ?? 0) > 0) },
  { id: 'wanderers', name: 'Wandering Royalty', icon: '👑', text: 'Defeat the Briar Queen, the Magpie King and the Orrery.', reward: { coins: 250, cosmetic: 'back_rose' },
    done: (p) => ['briar_queen', 'magpie_king', 'orrery'].every((k) => (p.kills[k] ?? 0) > 0),
    prog: (p) => [['briar_queen', 'magpie_king', 'orrery'].filter((k) => (p.kills[k] ?? 0) > 0).length, 3] },
  { id: 'riddles6', name: 'Riddler', icon: '🧩', text: 'Solve 6 Riddles of the Chain.', reward: { pack: 'standard', coins: 150, cosmetic: 'fam_snail' },
    done: (p) => Object.values(p.puzzles ?? {}).filter((x) => x > 0).length >= 6,
    prog: (p) => [Math.min(6, Object.values(p.puzzles ?? {}).filter((x) => x > 0).length), 6] },
  { id: 'riddles_all', name: 'Grandmaster of Riddles', icon: '♛', text: 'Solve every Riddle of the Chain.', reward: { pack: 'legend', cosmetic: 'back_mirror' },
    done: (p) => Object.values(p.puzzles ?? {}).filter((x) => x > 0).length >= RIDDLE_COUNT },
  { id: 'chain7', name: 'Seven-Link Sonata', icon: '🎼', text: 'Resolve a chain of 7 links.', reward: { dust: 300, cosmetic: 'title_sonata' }, done: (p) => p.longestChain >= 7 },
  { id: 'mimic10', name: 'Copycat', icon: '👥', text: 'Mimic 10 cards.', reward: { coins: 120 }, done: (p) => n(p, 'mimics') >= 10, prog: c('mimics', 10) },
  // v0.5
  { id: 'sexton_win', name: 'Six Feet Under', icon: '⚰️', text: 'Win a run with the Sexton.', reward: { card: 'charnel_throne', cosmetic: 'fam_skull' }, done: (p) => (p.charWins.sexton ?? 0) > 0 },
  { id: 'six_styles', name: 'Six Styles', icon: '🎖', text: 'Win a run with all six duelists.', reward: { card: 'requiem_eternal', cosmetic: 'title_sexton', coins: 400 },
    done: (p) => SIX.every((ch) => (p.charWins[ch] ?? 0) > 0), prog: (p) => [SIX.filter((ch) => (p.charWins[ch] ?? 0) > 0).length, 6] },
  { id: 'exhume25', name: 'Gravedigger', icon: '🪏', text: 'Exhume 25 Reactions.', reward: { relic: 'grave_gloves', coins: 100 }, done: (p) => n(p, 'exhumes') >= 25, prog: c('exhumes', 25) },
  { id: 'nemesis1', name: 'Settled Score', icon: '☠️', text: 'Defeat your Nemesis.', reward: { relic: 'grudge_token', cosmetic: 'title_nemesis' }, done: (p) => n(p, 'nemeses') >= 1 },
  { id: 'night1', name: 'Night Owl', icon: '🌙', text: 'Clear the first night of the Long Night.', reward: { relic: 'night_lamp', cosmetic: 'fam_wisp' }, done: (p) => (p.bestNight ?? 0) >= 2 },
  { id: 'night3', name: 'Until Dawn', icon: '🌅', text: 'Clear three nights of the Long Night.', reward: { pack: 'legend', cosmetic: 'title_night' }, done: (p) => (p.bestNight ?? 0) >= 4 },
  { id: 'venues15', name: 'World Tour', icon: '🎪', text: 'Win 15 fights at a Venue.', reward: { coins: 150, cosmetic: 'back_stage' }, done: (p) => n(p, 'venueWins') >= 15, prog: c('venueWins', 15) },
  { id: 'blessed5', name: 'Patronage', icon: '📚', text: 'Accept 5 Patron blessings.', reward: { coins: 120, dust: 120 }, done: (p) => n(p, 'blessings') >= 5, prog: c('blessings', 5) },
  { id: 'prime3', name: 'Patience Pays', icon: '🌞', text: 'Fire a Reaction with 3 or more Prime.', reward: { dust: 150 }, done: (p) => n(p, 'primeMax') >= 3 },
  // v0.6
  { id: 'rare1', name: 'Lucky Catch', icon: '🐇', text: 'Catch a rare monster before it runs away.', reward: { coins: 100 }, done: (p) => n(p, 'rares') >= 1 },
  { id: 'rare5', name: 'Golden Net', icon: '🥅', text: 'Catch 5 rare monsters.', reward: { relic: 'golden_net', coins: 100 }, done: (p) => n(p, 'rares') >= 5, prog: c('rares', 5) },
  { id: 'wild1', name: 'Into the Wilds', icon: '🌲', text: 'Defeat the Antlered King, the Leviathan or the Forgemother.', reward: { pack: 'standard', coins: 100 },
    done: (p) => WILD.some((k) => (p.kills[k] ?? 0) > 0) },
  { id: 'wild3', name: 'Lord of the Wilds', icon: '🦌', text: 'Defeat the Antlered King, the Leviathan and the Forgemother.', reward: { pack: 'legend', coins: 300 },
    done: (p) => WILD.every((k) => (p.kills[k] ?? 0) > 0), prog: (p) => [WILD.filter((k) => (p.kills[k] ?? 0) > 0).length, 3] },
  { id: 'fated', name: 'Fated', icon: '🎴', text: 'Win a run with a Fate.', reward: { coins: 150, dust: 100 }, done: (p) => n(p, 'fateWins') >= 1 },
  { id: 'surprise10', name: 'Expect the Unexpected', icon: '🎉', text: 'Live through 10 mid-fight Surprises.', reward: { coins: 100, dust: 100 }, done: (p) => n(p, 'surprises') >= 10, prog: c('surprises', 10) },
  { id: 'road20', name: 'Road Warrior', icon: '🥾', text: 'Meet 20 roadside encounters.', reward: { coins: 120 }, done: (p) => n(p, 'roads') >= 20, prog: c('roads', 20) },
  { id: 'shrine10', name: 'Devout', icon: '⛩️', text: 'Visit 10 Shrines.', reward: { dust: 150 }, done: (p) => n(p, 'shrines') >= 10, prog: c('shrines', 10) },
  { id: 'mystery15', name: 'Curiouser', icon: '🔮', text: 'Open 15 Mystery nodes.', reward: { coins: 120 }, done: (p) => n(p, 'mysteries') >= 15, prog: c('mysteries', 15) },
  { id: 'night5', name: 'Dawn Never Comes', icon: '🌑', text: 'Clear five nights of the Long Night.', reward: { relic: 'dawn_shard', pack: 'legend' }, done: (p) => (p.bestNight ?? 0) >= 6 },
  { id: 'phoenix', name: 'Ashes to Ashes', icon: '🐦‍🔥', text: 'Defeat the Ash Phoenix (both times).', reward: { dust: 150 }, done: (p) => (p.kills.ash_phoenix ?? 0) > 0 },
  { id: 'nightmare', name: "Nightmare's End", icon: '🐴', text: 'Defeat the Night Mare or the Dawn-Eater.', reward: { pack: 'legend' }, done: (p) => (p.kills.night_mare ?? 0) + (p.kills.dawn_eater ?? 0) > 0 },
  { id: 'converge3', name: 'Confluence', icon: '🪧', text: 'Play a Converge card with 3 factions played that turn.', reward: { dust: 150, cosmetic: 'back_grave' }, done: (p) => n(p, 'converge') >= 3 },
];

const SIX = ['duelist', 'warden', 'hollow', 'sharp', 'magpie', 'sexton'];
const WILD = ['antlered_king', 'leviathan', 'forgemother'];

/** Kept in sync with PUZZLES.length by a test (importing puzzles here would be circular). */
export const RIDDLE_COUNT = 14;

export const ACH_MAP = Object.fromEntries(ACHIEVEMENTS.map((a) => [a.id, a]));
