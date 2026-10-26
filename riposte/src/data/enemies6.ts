// v0.6 "Wilds & Wonders": a third version of every act (the Hollow Woods, the Wreckers' Coast, the Molten Deep),
// new shared enemies for every act, rare monsters that run away, and two Long Night bosses.
import type { Combat, Ctx } from '../engine/combat';
import type { Rng } from '../engine/rng';
import type { EnemyState, Intent } from '../engine/types';
import type { EnemyDef } from './enemies';

const cycle = (...keys: string[]) => (e: EnemyState) => keys[e.turn % keys.length];
const randomNoRepeat = (...keys: string[]) => (e: EnemyState, _cb: Combat, rng: Rng) => {
  const last = e.lastMoves[e.lastMoves.length - 1];
  const opts = keys.filter((k) => k !== last);
  return rng.pick(opts.length ? opts : keys);
};
const setTrap = (id: string) => (e: EnemyState, cb: Combat) => { if (e.traps.length < e.slots) e.traps.push(cb.mkCard(id)); };
const anyTrap = (...ids: string[]) => (c: Ctx, cb: Combat) => { if (c.src.traps.length < c.src.slots) c.src.traps.push(cb.mkCard(cb.rng.pick(ids))); };
const allies = (cb: Combat, e: EnemyState) => cb.alive().filter((x) => x !== e);
const pack = (cb: Combat, e: EnemyState, def: string) => allies(cb, e).filter((x) => x.def === def || x.def === 'alpha_wolf').length;
/** Steal run gold, returned when this enemy dies. */
const pinch = (n: number) => (c: Ctx, cb: Combat) => {
  if (c.rec || cb.run.arena || cb.run.puzzle) return;
  const g = Math.min(n, cb.run.gold);
  cb.run.gold -= g;
  const e = c.src as EnemyState;
  e.flags.stolen = (e.flags.stolen ?? 0) + g;
  if (g) cb.emit({ t: 'text', who: 'p', s: `−${g} gold` });
};
const giveBack = (e: EnemyState, cb: Combat) => { if (e.flags.stolen) { cb.run.gold += e.flags.stolen; cb.emit({ t: 'text', who: 'p', s: `+${e.flags.stolen} gold back` }); } };
const atkPreview = (base: (e: EnemyState, cb: Combat) => number, times = 1) => (e: EnemyState, cb: Combat): Intent[] => [{ icon: 'atk', n: cb.calcDmg(e, cb.s.player, base(e, cb)), times }];
/** Rare monsters: they flee after a few turns. Kill one first for a rich prize. */
const rare = (turns: number) => (e: EnemyState) => { e.st.flee = turns; e.flags.rare = 1; };
const rareDeath = (e: EnemyState, cb: Combat) => { if (!e.flags.fled) cb.s.once.rareKill = (cb.s.once.rareKill ?? 0) + 1; };

export const E6: EnemyDef[] = [
  // ═════════ ACT 1C: THE HOLLOW WOODS ═════════
  { id: 'briar_fox', name: 'Briar Fox', icon: '🦊', hp: [17, 20], blurb: 'Quick and nippy. Never does the same thing twice in a row.',
    moves: { nip: { name: 'Nip', steps: [{ atk: 3, times: 2 }] }, dash: { name: 'Dash', steps: [{ atk: 7 }] }, slink: { name: 'Slink', steps: [{ block: 5, weak: 1 }] } },
    ai: randomNoRepeat('nip', 'dash', 'slink') },
  { id: 'grey_wolf', name: 'Grey Wolf', icon: '🐺', hp: [23, 27], blurb: 'Pack hunter: Maul deals 2 more damage for each other wolf in the fight.',
    moves: {
      maul: { name: 'Maul', steps: [{ fn: (c, cb) => c.dmg(6 + 2 * pack(cb, c.src as EnemyState, 'grey_wolf')), preview: atkPreview((e, cb) => 6 + 2 * pack(cb, e, 'grey_wolf')) }] },
      howl: { name: 'Howl', steps: [{ block: 4, str: 1 }] },
    },
    ai: cycle('maul', 'howl', 'maul') },
  { id: 'mossback', name: 'Mossback Tortoise', icon: '🐢', hp: [32, 36], traps: ['spike_shell'], blurb: 'Keeps its Guard between turns. Slow, but its shell only grows.',
    start: (e) => { e.flags.keepBlock = 1; e.block = 8; },
    moves: { shell: { name: 'Retreat', steps: [{ block: 7, trap: 'spike_shell' }] }, snap: { name: 'Snap', steps: [{ atk: 9 }] } },
    ai: cycle('shell', 'snap', 'snap') },
  { id: 'hollow_owl', name: 'Hollow Owl', icon: '🦉', hp: [16, 19], traps: ['hex_mirror'],
    moves: { watch: { name: 'Watch', steps: [{ block: 3, trap: 'hex_mirror' }] }, swoop: { name: 'Swoop', steps: [{ atk: 6, weak: 1 }] } },
    ai: cycle('watch', 'swoop') },
  { id: 'will_o_wisp', name: "Will-o'-Wisp", icon: '💡', hp: [12, 15], blurb: 'Lures you off the path. Fragile, but its Lure leaves you open.',
    moves: { lure: { name: 'Lure', steps: [{ vuln: 1, weak: 1 }] }, flicker: { name: 'Flicker', steps: [{ atk: 4, burn: 1 }] } },
    ai: cycle('lure', 'flicker', 'flicker') },
  { id: 'bramble_boar', name: 'Bramble Boar', icon: '🐗', hp: [29, 33], blurb: 'Roots, then charges. The charge after rooting hits hard.',
    moves: { root: { name: 'Root Around', steps: [{ block: 6, str: 1 }] }, gore: { name: 'Gore', steps: [{ atk: 11 }] } },
    ai: cycle('root', 'gore') },
  { id: 'bee_swarm', name: 'Bee Swarm', icon: '🐝', hp: [19, 23], blurb: 'Starts with 2 Barbs. Many small stings.',
    start: (e) => { e.st.thorns = 2; },
    moves: { sting: { name: 'Sting', steps: [{ atk: 2, times: 4 }] }, buzz: { name: 'Buzz', steps: [{ block: 5, self: ['thorns', 1] }] } },
    ai: cycle('sting', 'buzz', 'sting') },
  // Act 1C elites
  { id: 'alpha_wolf', name: 'The Alpha', icon: '🐺', hp: [60, 64], blurb: 'Leads the pack. Calls Grey Wolves while it has fewer than two, and Rallies them all.',
    start: (_e, cb) => { cb.summon('grey_wolf'); },
    moves: {
      rend: { name: 'Rend', steps: [{ atk: 7, times: 2 }] },
      call: { name: 'Call the Pack', steps: [{ block: 8, fn: (c) => c.summon('grey_wolf'), fnLabel: 'Summon Grey Wolf' }] },
      rally: { name: 'Rally', steps: [{ fn: (c, cb) => { for (const x of cb.alive()) cb.applyStatus(c.src, x, 'str', 1); }, fnLabel: 'All +1 Str' }] },
    },
    ai: (e, cb) => (allies(cb, e).length < 1 && e.lastMoves[e.lastMoves.length - 1] !== 'call' ? 'call' : ['rend', 'rally', 'rend'][e.turn % 3]) },
  { id: 'old_oak', name: 'Old Oak', icon: '🌳', hp: [76, 82], traps: ['thorn_snare'], blurb: 'Starts with 3 Barbs. Grows bark and sends briars; its Crush is slow and huge.',
    start: (e) => { e.st.thorns = 3; },
    moves: {
      crush: { name: 'Crushing Bough', steps: [{ atk: 16 }] },
      grow: { name: 'Grow', steps: [{ block: 12, self: ['thorns', 1], trap: 'thorn_snare' }] },
      seed: { name: 'Scatter Seeds', steps: [{ atk: 4, fn: (c) => c.summon('briarling'), fnLabel: 'Summon Briarling' }] },
    },
    ai: cycle('grow', 'crush', 'seed', 'crush') },
  { id: 'cursed_bear', name: 'Hexed Bear', icon: '🐻', hp: [68, 72], traps: ['bear_trap'], blurb: 'Below half HP it goes into a Frenzy (+3 Edge) once.',
    start: setTrap('bear_trap'),
    moves: {
      maul: { name: 'Maul', steps: [{ atk: 13 }] }, swipe: { name: 'Swipe', steps: [{ atk: 5, times: 2, weak: 1 }] },
      den: { name: 'Den', steps: [{ block: 10, trap: 'bear_trap' }] }, frenzy: { name: 'FRENZY', steps: [{ str: 3, atk: 8 }] },
    },
    ai: (e) => {
      if (e.hp < e.maxHp / 2 && !e.flags.fr) { e.flags.fr = 1; return 'frenzy'; }
      return ['maul', 'den', 'swipe'][e.turn % 3];
    } },
  // Act 1C boss
  { id: 'antlered_king', name: 'The Antlered King', icon: '🦌', hp: [106, 106], slots: 2, traps: ['thorn_snare', 'feral_howl'],
    blurb: 'Lord of the Hollow Woods. Calls wolves, grows a crown of barbs, and below half HP leads THE WILD HUNT.',
    moves: {
      trample: { name: 'Trample', steps: [{ atk: 7, times: 2 }] },
      call: { name: 'Call of the Wild', steps: [{ block: 8, fn: (c) => c.summon('grey_wolf'), fnLabel: 'Summon Grey Wolf' }] },
      crown: { name: 'Crown of Antlers', steps: [{ self: ['thorns', 2], trap: 'feral_howl' }, { trap: 'thorn_snare' }] },
      hunt: { name: 'THE WILD HUNT', steps: [{ atk: 4, times: 4 }] },
    },
    ai: (e) => {
      if (e.hp < e.maxHp / 2 && !e.flags.hunt) { e.flags.hunt = 1; return 'hunt'; }
      return ['call', 'trample', 'crown', 'trample'][e.turn % 4];
    } },

  // ═════════ ACT 2C: THE WRECKERS' COAST ═════════
  { id: 'gull_flock', name: 'Gull Flock', icon: '🕊️', hp: [26, 30], blurb: 'Snatches 6 gold at a time. Kill the flock to get it back.',
    moves: {
      peck: { name: 'Peck', steps: [{ atk: 3, times: 3 }] },
      snatch: { name: 'Snatch', steps: [{ atk: 5, fn: pinch(6), fnLabel: 'Take 6 gold' }] },
    },
    ai: cycle('snatch', 'peck'), onDeath: giveBack },
  { id: 'shore_crab', name: 'Shore Crab', icon: '🦀', hp: [40, 44], traps: ['spike_shell2'], blurb: 'Keeps its Guard between turns.',
    start: (e) => { e.flags.keepBlock = 1; e.block = 10; },
    moves: { pinch: { name: 'Pinch', steps: [{ atk: 10 }] }, scuttle: { name: 'Scuttle', steps: [{ block: 10, trap: 'spike_shell2' }] } },
    ai: cycle('scuttle', 'pinch', 'pinch') },
  { id: 'drowned_sailor', name: 'Drowned Sailor', icon: '🧟', hp: [40, 44], blurb: 'Drags you under: its Haul shuffles a Wound into your discard pile.',
    moves: { haul: { name: 'Haul', steps: [{ atk: 8, wound: 1 }] }, anchor: { name: 'Anchor', steps: [{ block: 9, vuln: 1 }] }, gnaw: { name: 'Gnaw', steps: [{ atk: 6, times: 2 }] } },
    ai: cycle('haul', 'anchor', 'gnaw') },
  { id: 'siren', name: 'Siren', icon: '🧜', hp: [36, 40], traps: ['hex_mirror2', 'undertow_charm2'],
    moves: {
      song: { name: 'Siren Song', steps: [{ weak: 2, fn: anyTrap('hex_mirror2', 'undertow_charm2'), fnLabel: 'Set a trap' }] },
      lure: { name: 'Lure', steps: [{ atk: 10, vuln: 1 }] },
    },
    ai: cycle('song', 'lure', 'lure') },
  { id: 'cannoneer', name: 'Cannoneer', icon: '💣', hp: [36, 40], blurb: 'Loads, then FIRES for a lot. Kill it or block the shot.',
    moves: { load: { name: 'Load the Cannon', steps: [{ block: 6 }] }, fire: { name: 'FIRE!', steps: [{ atk: 20 }] } },
    ai: cycle('load', 'fire') },
  { id: 'wrecker', name: 'Wrecker', icon: '🏴‍☠️', hp: [46, 50], traps: ['snap_jaw2'],
    moves: { cutlass: { name: 'Cutlass', steps: [{ atk: 7, times: 2 }] }, plunder: { name: 'Plunder', steps: [{ str: 1, trap: 'snap_jaw2', block: 6 }] } },
    ai: cycle('plunder', 'cutlass', 'cutlass') },
  { id: 'lantern_jelly', name: 'Lantern Jelly', icon: '🪼', hp: [30, 34], blurb: 'Starts with 3 Barbs. Glows brighter (more Barbs) as it drifts.',
    start: (e) => { e.st.thorns = 3; },
    moves: { sting: { name: 'Sting', steps: [{ atk: 7, weak: 1 }] }, drift: { name: 'Drift', steps: [{ block: 8, self: ['thorns', 1] }] } },
    ai: cycle('drift', 'sting') },
  { id: 'deckhand', name: 'Deckhand', icon: '🪝', hp: [14, 16],
    moves: { hook: { name: 'Hook', steps: [{ atk: 6 }] } }, ai: () => 'hook' },
  // Act 2C elites
  { id: 'pirate_captain', name: 'Captain Saltbones', icon: '☠️', hp: [96, 102], traps: ['snap_jaw2', 'bear_trap2'],
    blurb: 'Calls Deckhands to the deck and drinks Grog to heal and grow stronger.',
    start: (e, cb) => { setTrap('snap_jaw2')(e, cb); cb.summon('deckhand'); },
    moves: {
      broadside: { name: 'Broadside', steps: [{ atk: 6, times: 3 }] },
      hands: { name: 'All Hands!', steps: [{ block: 10, fn: (c) => c.summon('deckhand'), fnLabel: 'Summon Deckhand' }] },
      grog: { name: 'Grog', steps: [{ heal: 10, str: 2, trap: 'bear_trap2' }] },
    },
    ai: cycle('broadside', 'hands', 'broadside', 'grog') },
  { id: 'sea_hag', name: 'The Sea Hag', icon: '🧙', hp: [88, 94], traps: ['tripwire2', 'smother2'],
    blurb: 'Jinxes of the deep: Wounds and Shaken, then a Tidal Hex that Blots your cards.',
    moves: {
      curse: { name: 'Curse of the Deep', steps: [{ wound: 2, weak: 2 }] },
      hex: { name: 'Tidal Hex', steps: [{ atk: 12, fn: (c) => c.blot(2), fnLabel: 'Blot 2' }] },
      ward: { name: 'Brine Ward', steps: [{ block: 15, fn: anyTrap('tripwire2', 'smother2'), fnLabel: 'Set a trap' }] },
    },
    ai: cycle('curse', 'hex', 'ward', 'hex') },
  { id: 'kraken_arm', name: 'Kraken Arm', icon: '🦑', hp: [50, 54], blurb: 'Two arms of something much bigger. When one is cut off, the other grows 3 Edge.',
    moves: { grab: { name: 'Grab', steps: [{ atk: 9, vuln: 1 }] }, squeeze: { name: 'Squeeze', steps: [{ atk: 5, times: 2 }] }, coil: { name: 'Coil', steps: [{ block: 12 }] } },
    ai: randomNoRepeat('grab', 'squeeze', 'coil', 'squeeze'),
    onDeath: (e, cb) => { for (const x of cb.alive()) if (x.def === 'kraken_arm' && x !== e) cb.applyStatus(x, x, 'str', 3); } },
  // Act 2C boss
  { id: 'leviathan', name: 'The Leviathan', icon: '🐋', hp: [180, 180], slots: 3, traps: ['undertow_charm2', 'smother2', 'spike_shell2'],
    blurb: 'Dives (Guard and traps), drags the top of your deck into the depths, and Breaches every fourth turn. Below 40% HP: MAELSTROM.',
    moves: {
      wave: { name: 'Tidal Wave', steps: [{ atk: 8, times: 2, weak: 1 }] },
      dive: { name: 'Dive', steps: [{ block: 18, fn: anyTrap('undertow_charm2', 'smother2', 'spike_shell2'), fnLabel: 'Set a trap' }] },
      drag: { name: 'Into the Depths', steps: [{ atk: 7, fn: (c) => c.burnPages(2), fnLabel: 'Fold 2 from your draw pile' }] },
      breach: { name: 'BREACH', steps: [{ atk: 24 }] },
      maelstrom: { name: 'MAELSTROM', steps: [{ atk: 4, times: 5 }] },
    },
    ai: (e) => {
      if (e.hp < e.maxHp * 0.4 && !e.flags.mael) { e.flags.mael = 1; return 'maelstrom'; }
      return ['wave', 'dive', 'drag', 'breach'][e.turn % 4];
    } },

  // ═════════ ACT 3C: THE MOLTEN DEEP ═════════
  { id: 'salamander', name: 'Salamander', icon: '🦎', hp: [50, 54],
    moves: { tongue: { name: 'Flame Tongue', steps: [{ atk: 8, burn: 3 }] }, bask: { name: 'Bask', steps: [{ heal: 8, str: 2 }] } },
    ai: cycle('tongue', 'tongue', 'bask') },
  { id: 'slag_golem', name: 'Slag Golem', icon: '🗿', hp: [96, 104], traps: ['ember_pod3'], blurb: 'Slow and heavy. Its Pound is the biggest hit in the Deep.',
    moves: { smelt: { name: 'Smelt', steps: [{ block: 18, trap: 'ember_pod3' }] }, pound: { name: 'Pound', steps: [{ atk: 23 }] } },
    ai: cycle('smelt', 'pound') },
  { id: 'forge_imp', name: 'Forge Imp', icon: '👹', hp: [26, 30], blurb: 'Stokes the forge: every ally gains 1 Edge.',
    moves: {
      hammer: { name: 'Hammer', steps: [{ atk: 6, times: 2 }] },
      stoke: { name: 'Stoke', steps: [{ fn: (c, cb) => { for (const x of cb.alive()) cb.applyStatus(c.src, x, 'str', 1); }, fnLabel: 'All +1 Str' }] },
    },
    ai: cycle('hammer', 'stoke') },
  { id: 'cinder_wyrm', name: 'Cinder Wyrmling', icon: '🐉', hp: [58, 62],
    moves: { breath: { name: 'Cinder Breath', steps: [{ atk: 5, times: 3, burn: 2 }] }, wings: { name: 'Wingbeat', steps: [{ block: 12, weak: 2 }] } },
    ai: cycle('wings', 'breath') },
  { id: 'obsidian_knight', name: 'Obsidian Knight', icon: '🛡️', hp: [74, 80], traps: ['counter_glyph3'], blurb: 'Opens with a Counter Glyph and 15 Guard.',
    start: (e, cb) => { setTrap('counter_glyph3')(e, cb); e.block = 15; },
    moves: { smite: { name: 'Smite', steps: [{ atk: 17 }] }, bulwark: { name: 'Bulwark', steps: [{ block: 18, trap: 'counter_glyph3' }] } },
    ai: cycle('smite', 'bulwark') },
  { id: 'magma_ooze', name: 'Magma Ooze', icon: '🫠', hp: [66, 70], blurb: 'When it dies it splits into two Ember Blobs.',
    moves: { engulf: { name: 'Engulf', steps: [{ atk: 13 }] }, ooze: { name: 'Ooze', steps: [{ burn: 4, block: 8 }] } },
    ai: cycle('ooze', 'engulf'),
    onDeath: (_e, cb) => { cb.summon('ember_blob'); cb.summon('ember_blob'); } },
  { id: 'ember_blob', name: 'Ember Blob', icon: '🔥', hp: [13, 15],
    moves: { splash: { name: 'Splash', steps: [{ atk: 6, burn: 1 }] } }, ai: () => 'splash' },
  { id: 'bellows_spirit', name: 'Bellows Spirit', icon: '💨', hp: [44, 48], blurb: 'Fans the flames: Gust gives every enemy 8 Guard.',
    moves: {
      gust: { name: 'Gust', steps: [{ fn: (c, cb) => { for (const x of cb.alive()) cb.gainBlock(x, 8); }, fnLabel: 'All enemies +8 Guard' }] },
      roar: { name: 'Furnace Roar', steps: [{ atk: 10, weak: 2 }] },
    },
    ai: cycle('gust', 'roar', 'roar') },
  // Act 3C elites
  { id: 'ironmonger', name: 'The Ironmonger', icon: '🔨', hp: [146, 152], traps: ['counter_glyph3', 'ember_pod3'],
    blurb: 'Tempers itself (Edge, Guard), then brings the Hammerfall. Quench sets a trap and heals.',
    moves: {
      temper: { name: 'Temper', steps: [{ str: 3, block: 14 }] },
      hammer: { name: 'Hammerfall', steps: [{ atk: 22 }] },
      quench: { name: 'Quench', steps: [{ heal: 12, fn: anyTrap('counter_glyph3', 'ember_pod3'), fnLabel: 'Set a trap' }] },
      sparks: { name: 'Sparks', steps: [{ atk: 6, times: 2, burn: 2 }] },
    },
    ai: cycle('temper', 'hammer', 'sparks', 'quench', 'hammer') },
  { id: 'ash_phoenix', name: 'Ash Phoenix', icon: '🐦‍🔥', hp: [108, 114], revive: 0.5, blurb: 'The first time it dies it is reborn from the ashes with half its HP.',
    moves: {
      storm: { name: 'Firestorm', steps: [{ atk: 7, times: 2, burn: 2 }] },
      dive: { name: 'Ember Dive', steps: [{ atk: 19 }] },
      preen: { name: 'Preen', steps: [{ block: 14, str: 2 }] },
    },
    ai: cycle('storm', 'preen', 'dive') },
  // Act 3C boss
  { id: 'forgemother', name: 'The Forgemother', icon: '🌋', hp: [210, 210], slots: 3, traps: ['ember_pod3', 'counter_glyph3', 'spike_shell3'],
    blurb: 'Pours Forge Imps from the mould, rains molten iron, and tempers herself. Below 30% HP: THE CRUCIBLE.',
    moves: {
      mould: { name: 'Pour the Mould', steps: [{ block: 18, fn: (c) => { c.summon('forge_imp'); }, fnLabel: 'Summon a Forge Imp' }] },
      rain: { name: 'Molten Rain', steps: [{ atk: 5, times: 4, burn: 2 }] },
      anvil: { name: 'Anvil Strike', steps: [{ atk: 24 }] },
      temper: { name: 'Temper', steps: [{ str: 2, fn: anyTrap('ember_pod3', 'counter_glyph3', 'spike_shell3'), fnLabel: 'Set a trap' }, { block: 12 }] },
      crucible: { name: 'THE CRUCIBLE', steps: [{ atk: 32 }] },
    },
    ai: (e) => {
      if (e.hp < e.maxHp * 0.3 && !e.flags.cru) { e.flags.cru = 1; return 'crucible'; }
      return ['mould', 'rain', 'temper', 'anvil'][e.turn % 4];
    } },

  // ═════════ SHARED NEW ENEMIES (every version of an act) ═════════
  // Act 1
  { id: 'card_goblin', name: 'Card Goblin', icon: '👺', hp: [18, 22], blurb: 'Cheats: shuffles Wounds into your discard pile.',
    moves: { cheat: { name: 'Cheat', steps: [{ atk: 4, wound: 1 }] }, cackle: { name: 'Cackle', steps: [{ block: 4, str: 1 }] }, stab: { name: 'Stab', steps: [{ atk: 7 }] } },
    ai: cycle('cheat', 'stab', 'cackle') },
  { id: 'mudling', name: 'Mudling', icon: '🟤', hp: [22, 26],
    moves: { glob: { name: 'Glob', steps: [{ atk: 5, weak: 1 }] }, wallow: { name: 'Wallow', steps: [{ block: 8 }] }, slam: { name: 'Slam', steps: [{ atk: 8 }] } },
    ai: cycle('glob', 'slam', 'wallow') },
  { id: 'scarecrow', name: 'Scarecrow', icon: '🎃', hp: [28, 32], traps: ['tripwire'], blurb: 'Starts with a Tripwire set. Its Stare leaves you Exposed.',
    start: setTrap('tripwire'),
    moves: { stare: { name: 'Stare', steps: [{ vuln: 1, block: 6 }] }, scythe: { name: 'Scythe', steps: [{ atk: 9 }] } },
    ai: cycle('stare', 'scythe', 'scythe') },
  // Act 2
  { id: 'chest_mimic', name: 'Chest Mimic', icon: '🧰', hp: [40, 44], traps: ['snap_jaw2'], blurb: 'Starts with a Snap Jaw set. Full of coins: drops 25 gold when it dies.',
    start: setTrap('snap_jaw2'),
    moves: { chomp: { name: 'Chomp', steps: [{ atk: 13 }] }, lid: { name: 'Slam the Lid', steps: [{ block: 12, trap: 'snap_jaw2' }] } },
    ai: cycle('lid', 'chomp'),
    onDeath: (_e, cb) => { if (cb.run.arena || cb.run.puzzle) return; cb.run.gold += 25; cb.run.stats.goldEarned += 25; cb.emit({ t: 'text', who: 'p', s: '+25 gold' }); } },
  { id: 'rat_king', name: 'The Rat King', icon: '🐀', hp: [38, 42], blurb: 'Calls Cinder Rats, two at most at a time.',
    moves: {
      call: { name: 'Squeak', steps: [{ block: 6, fn: (c) => c.summon('cinder_rat'), fnLabel: 'Summon Cinder Rat' }] },
      gnaw: { name: 'Gnaw', steps: [{ atk: 8, wound: 1 }] },
    },
    ai: (e, cb) => (allies(cb, e).length < 2 && e.turn % 2 === 0 ? 'call' : 'gnaw') },
  { id: 'shadow_duelist', name: 'Shadow Duelist', icon: '🗡️', hp: [42, 46], traps: ['counter_glyph2', 'ambush2'], blurb: 'Plays the chain like you do: feints with a trap, then lunges.',
    moves: {
      feint: { name: 'Feint', steps: [{ block: 6, fn: anyTrap('counter_glyph2', 'ambush2'), fnLabel: 'Set a trap' }] },
      lunge: { name: 'Lunge', steps: [{ atk: 11 }] },
      riposte: { name: 'Riposte', steps: [{ atk: 5, times: 2 }] },
    },
    ai: cycle('feint', 'lunge', 'riposte') },
  { id: 'puppeteer', name: 'Puppeteer', icon: '🪆', hp: [34, 38], blurb: 'Pulls Marionettes onto the stage. Cut the strings at the source.',
    start: (_e, cb) => { cb.summon('marionette'); },
    moves: {
      strings: { name: 'Pull Strings', steps: [{ block: 8, fn: (c) => c.summon('marionette'), fnLabel: 'Summon Marionette' }] },
      jab: { name: 'Jab', steps: [{ atk: 9 }] },
    },
    ai: (e, cb) => (allies(cb, e).length < 1 ? 'strings' : 'jab') },
  { id: 'marionette', name: 'Marionette', icon: '🎎', hp: [15, 17],
    moves: { dance: { name: 'Dance', steps: [{ atk: 4, times: 2 }] } }, ai: () => 'dance',
    onDeath: (_e, cb) => { for (const x of cb.alive()) if (x.def === 'puppeteer') cb.applyStatus(x, x, 'weak', 1); } },
  // Act 3
  { id: 'star_eater', name: 'Star Eater', icon: '🌠', hp: [60, 64],
    moves: { devour: { name: 'Devour', steps: [{ atk: 15, heal: 6 }] }, pull: { name: 'Void Pull', steps: [{ vuln: 2, weak: 1, block: 10 }] } },
    ai: cycle('pull', 'devour') },
  { id: 'chain_devil', name: 'Chain Devil', icon: '😈', hp: [56, 60], traps: ['soul_snare3'],
    moves: { lash: { name: 'Chain Lash', steps: [{ atk: 6, times: 3 }] }, bind: { name: 'Bind', steps: [{ str: 2, trap: 'soul_snare3', block: 8 }] } },
    ai: cycle('bind', 'lash', 'lash') },
  { id: 'void_jelly', name: 'Void Jelly', icon: '🫧', hp: [48, 52], blurb: 'Starts with 3 Barbs.',
    start: (e) => { e.st.thorns = 3; },
    moves: { pulse: { name: 'Pulse', steps: [{ atk: 13 }] }, absorb: { name: 'Absorb', steps: [{ block: 14, self: ['thorns', 2] }] } },
    ai: cycle('absorb', 'pulse') },
  { id: 'frost_wraith', name: 'Frost Wraith', icon: '❄️', hp: [50, 54], blurb: 'Its Freeze Blots your cards (they cost 1 more for the fight).',
    moves: { chill: { name: 'Chill', steps: [{ atk: 9, weak: 2 }] }, freeze: { name: 'Freeze', steps: [{ block: 10, fn: (c) => c.blot(2), fnLabel: 'Blot 2' }] } },
    ai: cycle('chill', 'freeze', 'chill') },

  { id: 'bridge_troll', name: 'Bridge Troll', icon: '🧌', hp: [42, 46], blurb: 'Likes fights. Gets angrier (Edge) every time it Bellows.',
    moves: { club: { name: 'Club', steps: [{ atk: 10 }] }, bellow: { name: 'Bellow', steps: [{ str: 2, block: 6 }] }, stomp: { name: 'Stomp', steps: [{ atk: 4, times: 2, weak: 1 }] } },
    ai: cycle('club', 'stomp', 'bellow') },

  // ═════════ RARE MONSTERS: they run away. Kill one before it flees for a rich prize. ═════════
  { id: 'gilded_hare', name: 'Gilded Hare', icon: '🐇', hp: [28, 28], blurb: 'Flees after 3 turns. Catch it for 50 gold and a keepsake.',
    start: rare(3), onDeath: rareDeath,
    moves: { hop: { name: 'Hop Away', steps: [{ block: 6 }] }, kick: { name: 'Kick', steps: [{ atk: 3 }] } },
    ai: cycle('hop', 'kick') },
  { id: 'treasure_crab', name: 'Treasure Crab', icon: '🦞', hp: [52, 52], blurb: 'Flees after 3 turns. Its shell is solid gold: 80 gold and a keepsake if you crack it.',
    start: (e) => { rare(3)(e); e.block = 12; }, onDeath: rareDeath,
    moves: { burrow: { name: 'Burrow', steps: [{ block: 12 }] }, nip: { name: 'Nip', steps: [{ atk: 6 }] } },
    ai: cycle('nip', 'burrow') },
  { id: 'wishing_star', name: 'Wishing Star', icon: '🌟', hp: [76, 76], blurb: 'Flees after 3 turns. Catch a falling star: 100 gold and a rare keepsake.',
    start: rare(3), onDeath: rareDeath,
    moves: { twinkle: { name: 'Twinkle', steps: [{ block: 14 }] }, flare: { name: 'Starflare', steps: [{ atk: 9, weak: 1 }] } },
    ai: cycle('twinkle', 'flare') },

  // ═════════ THE LONG NIGHT: two bosses who only walk at night ═════════
  { id: 'phantom', name: 'Phantom', icon: '👻', hp: [18, 20],
    moves: { wail: { name: 'Wail', steps: [{ atk: 7, weak: 1 }] } }, ai: () => 'wail' },
  { id: 'night_mare', name: 'The Night Mare', icon: '🐴', hp: [226, 226], slots: 3, traps: ['smother3', 'tripwire3', 'soul_snare3'],
    blurb: 'Gallops through your dreams: Bad Dreams Blot your cards and leave you Shaken and Exposed; Phantoms ride beside it.',
    moves: {
      gallop: { name: 'Nightmare Gallop', steps: [{ atk: 10, times: 2 }] },
      dream: { name: 'Bad Dreams', steps: [{ weak: 2, vuln: 2, fn: (c) => c.blot(2), fnLabel: 'Blot 2' }] },
      ride: { name: 'Ride of Phantoms', steps: [{ block: 16, fn: (c) => c.summon('phantom'), fnLabel: 'Summon Phantom' }] },
      veil: { name: 'Veil of Sleep', steps: [{ block: 12, fn: anyTrap('smother3', 'tripwire3', 'soul_snare3'), fnLabel: 'Set a trap' }] },
    },
    ai: cycle('dream', 'gallop', 'ride', 'gallop', 'veil') },
  { id: 'dawn_eater', name: 'The Dawn-Eater', icon: '🌑', hp: [250, 250], slots: 3, traps: ['counter_glyph3', 'smother3', 'ember_pod3'],
    blurb: 'Swallows the light. Below half HP it starts a Ritual (+2 Edge every turn). Its Devour Light is enormous.',
    moves: {
      eclipse: { name: 'Eclipse', steps: [{ str: 2, block: 18 }] },
      devour: { name: 'Devour Light', steps: [{ atk: 28 }] },
      shadows: { name: 'Long Shadows', steps: [{ atk: 6, times: 3, fn: anyTrap('counter_glyph3', 'smother3', 'ember_pod3'), fnLabel: 'Set a trap' }] },
      hunger: { name: 'HUNGER', steps: [{ self: ['ritual', 2], heal: 20 }] },
    },
    ai: (e) => {
      if (e.hp < e.maxHp / 2 && !e.flags.hung) { e.flags.hung = 1; return 'hunger'; }
      return ['eclipse', 'shadows', 'devour'][e.turn % 3];
    } },
];

export interface Enc6 { id: string; name: string; enemies: string[] }
const enc = (name: string, ...enemies: string[]): Enc6 => ({ id: enemies.join('+'), name, enemies });

/** The third version of each act (v0.6). */
export const WILD_ENCOUNTERS: Record<number, { easy: Enc6[]; normal: Enc6[]; elite: Enc6[]; boss: Enc6 }> = {
  1: {
    easy: [enc('Briar Foxes', 'briar_fox', 'briar_fox'), enc('Hollow Owl', 'hollow_owl', 'will_o_wisp'), enc('Bee Swarm', 'bee_swarm')],
    normal: [
      enc('Wolf Pack', 'grey_wolf', 'grey_wolf'), enc('Mossback', 'mossback'), enc('Boar & Fox', 'bramble_boar', 'briar_fox'),
      enc('Wisps & Owl', 'will_o_wisp', 'will_o_wisp', 'hollow_owl'), enc('Bramble Boar', 'bramble_boar'), enc('Bees & Tortoise', 'bee_swarm', 'mossback'),
      enc('Wolf & Wisp', 'grey_wolf', 'will_o_wisp'),
    ],
    elite: [enc('The Alpha', 'alpha_wolf'), enc('Old Oak', 'old_oak'), enc('Hexed Bear', 'cursed_bear')],
    boss: enc('The Antlered King', 'antlered_king'),
  },
  2: {
    easy: [enc('Gull Flock', 'gull_flock'), enc('Lantern Jelly', 'lantern_jelly')],
    normal: [
      enc('Shore Crabs', 'shore_crab', 'gull_flock'), enc('Drowned Sailor', 'drowned_sailor'), enc('Siren & Jelly', 'siren', 'lantern_jelly'),
      enc('Gun Crew', 'cannoneer', 'wrecker'), enc('Wreckers', 'wrecker', 'gull_flock'), enc('Sailor & Siren', 'drowned_sailor', 'siren'),
      enc('Cannoneer', 'cannoneer', 'shore_crab'),
    ],
    elite: [enc('Captain Saltbones', 'pirate_captain'), enc('The Sea Hag', 'sea_hag'), enc('Kraken Arms', 'kraken_arm', 'kraken_arm')],
    boss: enc('The Leviathan', 'leviathan'),
  },
  3: {
    easy: [enc('Salamander', 'salamander'), enc('Forge Imps', 'forge_imp', 'forge_imp')],
    normal: [
      enc('Slag Golem', 'slag_golem'), enc('Wyrmling & Imp', 'cinder_wyrm', 'forge_imp'), enc('Obsidian Knight', 'obsidian_knight'),
      enc('Magma Ooze', 'magma_ooze'), enc('Bellows & Salamander', 'bellows_spirit', 'salamander'), enc('Cinder Wyrmling', 'cinder_wyrm'),
      enc('Knight & Bellows', 'obsidian_knight', 'bellows_spirit'),
    ],
    elite: [enc('The Ironmonger', 'ironmonger'), enc('Ash Phoenix', 'ash_phoenix'), enc('Furnace Watch', 'slag_golem', 'forge_imp')],
    boss: enc('The Forgemother', 'forgemother'),
  },
};

/** v0.6 fights shuffled into every version of each act. */
export const SHARED6: Record<number, Enc6[]> = {
  1: [enc('Card Goblin', 'card_goblin'), enc('Mudlings', 'mudling', 'mudling'), enc('Scarecrow', 'scarecrow'), enc('Goblin & Scarecrow', 'card_goblin', 'scarecrow')],
  2: [enc('Chest Mimic', 'chest_mimic'), enc('The Rat King', 'rat_king'), enc('Shadow Duelist', 'shadow_duelist'), enc('Puppeteer', 'puppeteer'), enc('Mimic & Duelist', 'chest_mimic', 'shadow_duelist')],
  3: [enc('Star Eater', 'star_eater'), enc('Chain Devil', 'chain_devil'), enc('Void Jelly', 'void_jelly', 'frost_wraith'), enc('Frost Wraith', 'frost_wraith'), enc('Devil & Eater', 'chain_devil', 'star_eater')],
};

/** Rare monsters by act (from Mystery nodes, the road and a few events). */
export const RARE_ENCOUNTERS: Record<number, Enc6> = {
  1: enc('A Gilded Hare!', 'gilded_hare'),
  2: enc('A Treasure Crab!', 'treasure_crab'),
  3: enc('A Wishing Star!', 'wishing_star'),
};

export const NIGHT_BOSSES6: Enc6[] = [enc('The Night Mare', 'night_mare'), enc('The Dawn-Eater', 'dawn_eater')];
