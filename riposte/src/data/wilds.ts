import type { Combat } from '../engine/combat';
import type { NodeType, RunState } from '../engine/types';

/**
 * v0.6 run variety. Every act now rolls a map Layout (the shape of the paths) and a Sky (a condition that
 * reweights the map and bends a rule or two for the whole act). Both show in the map header, so you can plan
 * the act around them. The Long Night adds a cumulative Night Terror on every night.
 */

export interface LayoutDef {
  id: string;
  name: string;
  icon: string;
  text: string;
  /** Random walks from the bottom row (more walks, more nodes and crossings). */
  walks: number;
  /** Chance for each node to grow an extra branch to a neighbouring column. */
  branch?: number;
  /** Node-weight multipliers. */
  w?: Partial<Record<NodeType, number>>;
  /** Rows (0-based) that are always Treasure. Default [3]. */
  treasure?: number[];
  /** A row where every node is a Shop, Shrine or Event. */
  fair?: number;
}

export const LAYOUTS: LayoutDef[] = [
  { id: 'road', name: 'The Old Road', icon: '🛤️', text: 'Four winding paths.', walks: 4 },
  { id: 'open', name: 'Open Country', icon: '🌾', text: 'Paths everywhere: more nodes, more forks, more choices.', walks: 6, branch: 0.2 },
  { id: 'pass', name: 'The Narrow Pass', icon: '🏔️', text: 'Only two paths, but more Events and Candles along them.', walks: 2, w: { event: 1.4, rest: 1.3, shrine: 1.3 } },
  { id: 'gauntlet', name: 'The Gauntlet', icon: '⚔️', text: 'Rivals everywhere, and two Treasure rows to pay for it.', walks: 4, w: { elite: 1.8, fight: 1.1 }, treasure: [3, 5] },
  { id: 'maze', name: 'The Labyrinth', icon: '🌀', text: 'Paths that fork and fork again. Mystery nodes are common.', walks: 5, branch: 0.4, w: { mystery: 2 } },
  { id: 'fair', name: 'Crossroads Fair', icon: '🎡', text: 'Row 5 is a fair: every node there is a Shop, Shrine or Event.', walks: 4, fair: 4 },
  { id: 'wild', name: 'Wild Paths', icon: '🌲', text: 'No shops out here, but plenty of Mysteries, Shrines and Treasure.', walks: 4, branch: 0.15, w: { shop: 0.15, mystery: 1.8, shrine: 1.5, treasure: 1.5 } },
];
export const LAYOUT_MAP: Record<string, LayoutDef> = Object.fromEntries(LAYOUTS.map((l) => [l.id, l]));

export interface SkyDef {
  id: string;
  name: string;
  icon: string;
  text: string;
  /** Roll weight. */
  weight: number;
  w?: Partial<Record<NodeType, number>>;
  /** Node types beyond 2 rows ahead are hidden. */
  fog?: boolean;
  goldPct?: number;
  eliteGoldPct?: number;
  shopPct?: number;
  restHeal?: number;
  healAfter?: number;
  venueChance?: number;
  omenMult?: number;
  /** Extra card choices on rewards. */
  choices?: number;
  treasureGold?: number;
  /** Roadside encounter chance multiplier. */
  wayside?: number;
  champs?: number;
  rareMult?: number;
  /** Enemy HP multiplier for this act. */
  enemyHp?: number;
  /** Every card reward includes at least one rare. */
  rareFirst?: boolean;
  combat?: (cb: Combat) => void;
}

export const SKIES: SkyDef[] = [
  { id: 'clear', name: 'Clear Skies', icon: '☀️', text: 'A fine day for a duel. Nothing unusual.', weight: 5 },
  { id: 'fog', name: 'Fog', icon: '☁️', text: 'You can only see 2 rows ahead on the map. Fights pay 25% more gold.', weight: 2, fog: true, goldPct: 25 },
  { id: 'blood_moon', name: 'Blood Moon', icon: '🌕', text: 'More rivals. Rivals pay 50% more gold and always drop an Omen.', weight: 2, w: { elite: 1.7 }, eliteGoldPct: 50 },
  { id: 'carnival', name: 'Carnival Night', icon: '🎪', text: 'Many more Events, Shrines and Mystery nodes, and more shops.', weight: 2, w: { event: 1.5, shrine: 2, mystery: 1.5, shop: 1.4 } },
  { id: 'rain', name: 'Steady Rain', icon: '🌧️', text: 'Mending at the Candle heals 40% instead of 25%. Fewer shops.', weight: 2, restHeal: 0.4, w: { shop: 0.5 } },
  { id: 'storm', name: 'Thunderstorm', icon: '⛈️', text: 'Half of all normal fights happen at a Venue.', weight: 2, venueChance: 0.5 },
  { id: 'harvest', name: 'Harvest Moon', icon: '🍂', text: 'Heal 3 HP after every fight. Shops are 15% cheaper.', weight: 2, healAfter: 3, shopPct: -15 },
  { id: 'new_moon', name: 'New Moon', icon: '🌑', text: 'Mystery nodes everywhere. Omens drop twice as often.', weight: 2, w: { mystery: 3 }, omenMult: 2 },
  { id: 'heatwave', name: 'Heatwave', icon: '🥵', text: 'Everyone, you included, starts each fight with 3 Burn.', weight: 1,
    combat: (cb) => { for (const c of [cb.s.player, ...cb.alive()]) cb.applyStatus(c, c, 'burn', 3); } },
  { id: 'frost', name: 'Hard Frost', icon: '❄️', text: 'Enemies start each fight with 2 Shaken. Mending at the Candle heals only 15%.', weight: 1, restHeal: 0.15,
    combat: (cb) => { for (const e of cb.alive()) cb.applyStatus(e, e, 'weak', 2); } },
  { id: 'rainbow', name: 'Rainbow', icon: '🌈', text: 'Card rewards offer 1 extra choice. Treasure rooms hold 25 extra gold.', weight: 2, choices: 1, treasureGold: 25 },
  { id: 'gale', name: 'Gale', icon: '🌪️', text: 'Things blow in on the wind: roadside encounters happen three times as often.', weight: 2, wayside: 3 },
  { id: 'procession', name: 'Royal Procession', icon: '👑', text: 'Two Champion rivals roam this act.', weight: 1, champs: 2 },
  { id: 'eclipse', name: 'Eclipse', icon: '🌘', text: 'Enemies have 10% more HP, but every card reward includes a rare.', weight: 1, enemyHp: 1.1, rareFirst: true },
  { id: 'starfall', name: 'Starfall', icon: '🌠', text: 'Rare monsters are three times as likely to appear. Catch them before they run.', weight: 2, rareMult: 3, w: { mystery: 1.3 } },
];
export const SKY_MAP: Record<string, SkyDef> = Object.fromEntries(SKIES.map((s) => [s.id, s]));

/** The Long Night: every night adds one of these, and they stack. */
export interface TerrorDef { id: string; name: string; icon: string; text: string; combat?: (cb: Combat) => void }
export const TERRORS: TerrorDef[] = [
  { id: 't_traps', name: 'Haunted Halls', icon: '🕸️', text: 'Every enemy starts with a Snap Jaw set.',
    combat: (cb) => { for (const e of cb.alive()) if (e.traps.length < e.slots) e.traps.push(cb.mkCard(cb.tier('snap_jaw'))); } },
  { id: 't_fury', name: 'Red Eyes', icon: '👁️', text: 'Enemies start with 1 extra Edge.', combat: (cb) => { for (const e of cb.alive()) e.st.str = (e.st.str ?? 0) + 1; } },
  { id: 't_ward', name: 'Night Ward', icon: '🛡️', text: 'Enemies start with 12 Guard.', combat: (cb) => { for (const e of cb.alive()) e.block += 12; } },
  { id: 't_vigor', name: 'Restless Dead', icon: '🧟', text: 'Enemies have 15% more HP.', combat: (cb) => { for (const e of cb.alive()) { e.maxHp = Math.round(e.maxHp * 1.15); e.hp = e.maxHp; } } },
  { id: 't_thorns', name: 'Bramble Dark', icon: '🌵', text: 'Enemies start with 2 Barbs.', combat: (cb) => { for (const e of cb.alive()) e.st.thorns = (e.st.thorns ?? 0) + 2; } },
  { id: 't_dread', name: 'Dread', icon: '😱', text: 'You start each fight with 1 Shaken and 1 Exposed.',
    combat: (cb) => { cb.s.player.st.weak = (cb.s.player.st.weak ?? 0) + 1; cb.s.player.st.vuln = (cb.s.player.st.vuln ?? 0) + 1; } },
  { id: 't_ink', name: 'Ink-Black Sky', icon: '🖋️', text: '2 of your cards are Blotted at the start of each fight.', combat: (cb) => cb.blot(2) },
  { id: 't_regen', name: 'Undying', icon: '💚', text: 'Enemies start with 3 Regenerate (they heal 3, then 2, then 1).', combat: (cb) => { for (const e of cb.alive()) e.st.regen = (e.st.regen ?? 0) + 3; } },
];
export const TERROR_MAP: Record<string, TerrorDef> = Object.fromEntries(TERRORS.map((t) => [t.id, t]));

/** Global switch for v0.6 randomness (Skies, Surprises, roadside encounters). The rules tests turn it off to stay exact. */
export const WILDS = { on: true };

/** The Sky over the run's current act (null in the Arena, Riddles and old saves). */
export function skyOf(run: RunState): SkyDef | null {
  if (run.arena || run.puzzle || !WILDS.on) return null;
  const id = run.skies?.[run.act - 1];
  return id ? SKY_MAP[id] ?? null : null;
}
