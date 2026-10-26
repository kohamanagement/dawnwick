import type { Combat, Ctx } from '../engine/combat';
import { CARDS } from './cards';
import type { Rng } from '../engine/rng';
import type { EnemyState } from '../engine/types';
import { E6, WILD_ENCOUNTERS, SHARED6, NIGHT_BOSSES6 } from './enemies6';

export interface Step {
  atk?: number;
  times?: number;
  block?: number;
  str?: number;
  self?: [string, number];
  weak?: number;
  vuln?: number;
  burn?: number;
  heal?: number;
  wound?: number;
  trap?: string;
  fn?: (c: Ctx, cb: Combat) => void;
  fnLabel?: string;
  /** Intent preview for fn steps. */
  preview?: (e: EnemyState, cb: Combat) => import('../engine/types').Intent[];
}

export interface Move { name: string; steps: Step[] }

export interface EnemyDef {
  id: string;
  name: string;
  icon: string;
  hp: [number, number];
  slots?: number;
  ghost?: boolean;
  /** Traps this enemy can set, shown in its info panel so hidden info stays fair. */
  traps?: string[];
  blurb?: string;
  moves: Record<string, Move>;
  ai: (e: EnemyState, cb: Combat, rng: Rng) => string;
  start?: (e: EnemyState, cb: Combat) => void;
  /** Called after one of this enemy's traps resolves. */
  onTrapFired?: (e: EnemyState, cb: Combat) => void;
  onDeath?: (e: EnemyState, cb: Combat) => void;
  /** v0.6: the first time it dies, it comes back with this fraction of its Max HP. */
  revive?: number;
}

// AI helpers
const cycle = (...keys: string[]) => (e: EnemyState) => keys[e.turn % keys.length];
const randomNoRepeat = (...keys: string[]) => (e: EnemyState, _cb: Combat, rng: Rng) => {
  const last = e.lastMoves[e.lastMoves.length - 1];
  const opts = keys.filter((k) => k !== last);
  return rng.pick(opts.length ? opts : keys);
};
const setTrap = (id: string) => (e: EnemyState, cb: Combat) => { e.traps.push(cb.mkCard(id)); };

const E: EnemyDef[] = [
  // ═════════ ACT 1 ═════════
  { id: 'cinder_rat', name: 'Cinder Rat', icon: '🐀', hp: [13, 16],
    moves: { bite: { name: 'Bite', steps: [{ atk: 5 }] }, singe: { name: 'Singe', steps: [{ atk: 3, burn: 2 }] } },
    ai: randomNoRepeat('bite', 'singe') },
  { id: 'bramble_beetle', name: 'Bramble Beetle', icon: '🪲', hp: [24, 28], traps: ['spike_shell'],
    moves: { harden: { name: 'Harden', steps: [{ block: 4, trap: 'spike_shell' }] }, horn: { name: 'Horn', steps: [{ atk: 8 }] } },
    ai: cycle('harden', 'horn', 'horn') },
  { id: 'gloom_moth', name: 'Gloom Moth', icon: '🦋', hp: [15, 18],
    moves: { dust: { name: 'Gloom Dust', steps: [{ atk: 3, weak: 2 }] }, flutter: { name: 'Flutter', steps: [{ atk: 3, times: 2 }] } },
    ai: randomNoRepeat('dust', 'flutter') },
  { id: 'hex_acolyte', name: 'Hex Acolyte', icon: '🧙', hp: [22, 26], traps: ['hex_mirror'],
    moves: {
      hex: { name: 'Hex', steps: [{ trap: 'hex_mirror', block: 3 }] }, bolt: { name: 'Bolt', steps: [{ atk: 7 }] },
      chant: { name: 'Chant', steps: [{ str: 2 }] },
    },
    ai: cycle('hex', 'bolt', 'chant', 'bolt') },
  { id: 'rust_knight', name: 'Rust Knight', icon: '⚔️', hp: [32, 36], traps: ['snap_jaw'],
    moves: { slash: { name: 'Slash', steps: [{ atk: 10 }] }, brace: { name: 'Brace', steps: [{ block: 9, trap: 'snap_jaw' }] } },
    ai: cycle('slash', 'brace') },
  { id: 'bog_lurker', name: 'Bog Lurker', icon: '🐸', hp: [27, 31], traps: ['ambush'],
    moves: { tongue: { name: 'Tongue Lash', steps: [{ atk: 6, vuln: 1 }] }, lurk: { name: 'Lurk', steps: [{ block: 5, trap: 'ambush' }] } },
    ai: cycle('lurk', 'tongue', 'tongue') },
  // Act 1 elites
  { id: 'gatekeeper', name: 'Gatekeeper', icon: '🗿', hp: [66, 70], traps: ['counter_glyph'], blurb: 'Opens with a Counter Glyph. Bait it with a cheap attack.',
    start: setTrap('counter_glyph'),
    moves: {
      smash: { name: 'Smash', steps: [{ atk: 14 }] }, fortify: { name: 'Fortify', steps: [{ block: 10, str: 2 }] },
      seal: { name: 'Seal', steps: [{ atk: 6, trap: 'counter_glyph' }] },
    },
    ai: cycle('smash', 'fortify', 'seal') },
  { id: 'blade_left', name: 'Left Blade', icon: '🗡️', hp: [29, 31], traps: ['snap_jaw'],
    moves: { flurry: { name: 'Flurry', steps: [{ atk: 5, times: 2 }] }, guard: { name: 'Snap Guard', steps: [{ atk: 4, trap: 'snap_jaw' }] } },
    ai: cycle('flurry', 'guard') },
  { id: 'blade_right', name: 'Right Blade', icon: '🔪', hp: [29, 31],
    moves: { thrust: { name: 'Thrust', steps: [{ atk: 9 }] }, hone: { name: 'Hone', steps: [{ block: 6, str: 1 }] } },
    ai: cycle('hone', 'thrust') },
  { id: 'trapmaster', name: 'Trapmaster Vex', icon: '🎭', hp: [56, 60], slots: 3, traps: ['ambush', 'spike_shell', 'smother'],
    blurb: 'Lays a new trap every other turn. Disrupt or bait them.', start: setTrap('ambush'),
    moves: {
      lay: { name: 'Lay Trap', steps: [{ atk: 5, fn: (c, cb) => { if (c.src.traps.length < c.src.slots) c.src.traps.push(cb.mkCard(cb.rng.pick(['ambush', 'spike_shell', 'smother']))); }, fnLabel: 'Set trap' }] },
      spring: { name: 'Spring', steps: [{ atk: 11 }] },
    },
    ai: cycle('spring', 'lay') },
  // Act 1 boss
  { id: 'lantern_warden', name: 'The Lantern Warden', icon: '🏮', hp: [128, 128], traps: ['spike_shell2'],
    blurb: 'Cycles Sweep → Kindle → Glare. Below half HP it telegraphs one huge Flare.',
    moves: {
      sweep: { name: 'Searing Sweep', steps: [{ atk: 6, times: 2, burn: 2 }] },
      kindle: { name: 'Kindle', steps: [{ str: 2, trap: 'spike_shell2' }] },
      glare: { name: 'Lantern Glare', steps: [{ weak: 2, vuln: 1, block: 12 }] },
      flare: { name: 'FLARE', steps: [{ atk: 18, burn: 3 }] },
    },
    ai: (e) => {
      if (e.hp < e.maxHp / 2 && !e.flags.flared) { e.flags.flared = 1; return 'flare'; }
      return ['sweep', 'kindle', 'glare'][e.turn % 3];
    } },

  // ═════════ ACT 2 ═════════
  { id: 'tide_wraith', name: 'Tide Wraith', icon: '👻', hp: [42, 46], traps: ['smother2'],
    moves: { drain: { name: 'Drain', steps: [{ atk: 9, heal: 4 }] }, veil: { name: 'Veil', steps: [{ block: 8, trap: 'smother2' }] } },
    ai: cycle('veil', 'drain', 'drain') },
  { id: 'iron_hound', name: 'Iron Hound', icon: '🐺', hp: [30, 34],
    moves: { bite: { name: 'Savage Bite', steps: [{ atk: 6, times: 2 }] }, howl: { name: 'Howl', steps: [{ str: 2, block: 5 }] } },
    ai: randomNoRepeat('bite', 'bite', 'howl') },
  { id: 'ash_cultist', name: 'Ash Cultist', icon: '🕯️', hp: [46, 50],
    moves: { ritual: { name: 'Ritual', steps: [{ self: ['ritual', 2] }] }, flame: { name: 'Flame', steps: [{ atk: 6, burn: 2 }] } },
    ai: (e) => (e.turn === 0 ? 'ritual' : 'flame') },
  { id: 'mirror_imp', name: 'Mirror Imp', icon: '😈', hp: [34, 38], traps: ['counter_glyph2'],
    moves: { glyph: { name: 'Glyph', steps: [{ atk: 5, trap: 'counter_glyph2' }] }, claw: { name: 'Claw', steps: [{ atk: 12 }] } },
    ai: cycle('glyph', 'claw') },
  { id: 'thorn_golem', name: 'Thorn Golem', icon: '🌵', hp: [62, 66], blurb: 'Starts with 3 Barbs. Multi-hit attacks hurt you.',
    start: (e) => { e.st.thorns = 3; },
    moves: { slam: { name: 'Slam', steps: [{ atk: 12 }] }, grow: { name: 'Grow', steps: [{ block: 14, self: ['thorns', 2] }] } },
    ai: cycle('slam', 'grow') },
  { id: 'spore_mother', name: 'Spore Mother', icon: '🍄', hp: [48, 52],
    moves: {
      spores: { name: 'Spores', steps: [{ weak: 2, vuln: 2 }] }, lash: { name: 'Lash', steps: [{ atk: 9 }] },
      seed: { name: 'Seed', steps: [{ atk: 5, wound: 1 }] },
    },
    ai: cycle('spores', 'lash', 'seed') },
  // Act 2 elites
  { id: 'echo_duelist', name: 'Echo', icon: '🪞', hp: [84, 88], ghost: true, slots: 2,
    blurb: 'A saved deck from a past run, played back by the game. Its tells show the cards it will play.',
    moves: {}, ai: () => '' },
  { id: 'chorus_knight', name: 'Chorus Knight', icon: '🛡️', hp: [104, 110], traps: ['counter_glyph2', 'snap_jaw2'],
    start: setTrap('snap_jaw2'),
    moves: {
      cleave: { name: 'Cleave', steps: [{ atk: 11, times: 2 }] }, ward: { name: 'Ward', steps: [{ block: 16, trap: 'counter_glyph2' }] },
      rally: { name: 'Rally', steps: [{ str: 3, trap: 'snap_jaw2' }] },
    },
    ai: cycle('cleave', 'ward', 'rally') },
  { id: 'seal_warden', name: 'Warden of Seals', icon: '🔒', hp: [96, 100], slots: 3, traps: ['mirror_veil2', 'counter_glyph2', 'ambush2'],
    start: setTrap('mirror_veil2'),
    moves: {
      seal: { name: 'Seal', steps: [{ atk: 9, fn: (c, cb) => { if (c.src.traps.length < c.src.slots) c.src.traps.push(cb.mkCard(cb.rng.pick(['mirror_veil2', 'counter_glyph2', 'ambush2']))); }, fnLabel: 'Set trap' }] },
      crush: { name: 'Crush', steps: [{ atk: 18 }] },
    },
    ai: cycle('seal', 'crush') },
  // Act 2 boss
  { id: 'chorus_of_knives', name: 'Chorus of Knives', icon: '🎼', hp: [150, 150], slots: 3, traps: ['counter_glyph2', 'smother2'],
    blurb: 'Each Verse adds another knife. Refrain sets traps; Crescendo hits hard below half HP.',
    moves: {
      verse: { name: 'Verse', steps: [{ fn: (c) => { const e = c.src as EnemyState; c.dmg(4, Math.min(5, 2 + (e.flags.verse ?? 0))); e.flags.verse = (e.flags.verse ?? 0) + 1; },
        preview: (e, cb) => [{ icon: 'atk', n: cb.calcDmg(e, cb.s.player, 4), times: Math.min(5, 2 + (e.flags.verse ?? 0)) }] }] },
      refrain: { name: 'Refrain', steps: [{ block: 12, trap: 'counter_glyph2' }, { trap: 'smother2' }] },
      harmonics: { name: 'Harmonics', steps: [{ str: 2, weak: 2 }] },
      crescendo: { name: 'CRESCENDO', steps: [{ atk: 28 }] },
    },
    ai: (e) => {
      if (e.hp < e.maxHp / 2 && !e.flags.cres) { e.flags.cres = 1; return 'crescendo'; }
      return ['verse', 'refrain', 'verse', 'harmonics'][e.turn % 4];
    } },

  // ═════════ ACT 3 ═════════
  { id: 'phase_stalker', name: 'Phase Stalker', icon: '🕷️', hp: [58, 62], traps: ['ambush3'],
    moves: { rake: { name: 'Rake', steps: [{ atk: 6, times: 3 }] }, vanish: { name: 'Vanish', steps: [{ block: 18, trap: 'ambush3' }] } },
    ai: cycle('vanish', 'rake', 'rake') },
  { id: 'abyss_eye', name: 'Abyss Eye', icon: '👁️', hp: [52, 56],
    moves: { gaze: { name: 'Gaze', steps: [{ vuln: 2, weak: 2, block: 8 }] }, beam: { name: 'Beam', steps: [{ atk: 14 }] } },
    ai: cycle('gaze', 'beam') },
  { id: 'bone_choir', name: 'Bone Choir', icon: '💀', hp: [38, 42],
    moves: {
      chant: { name: 'Dirge', steps: [{ fn: (c, cb) => { for (const e of cb.alive()) cb.applyStatus(c.src, e, 'str', 2); }, fnLabel: 'All +2 Str' }] },
      rattle: { name: 'Rattle', steps: [{ atk: 7, times: 2 }] },
    },
    ai: cycle('rattle', 'chant', 'rattle') },
  { id: 'iron_colossus', name: 'Iron Colossus', icon: '🤖', hp: [105, 112], traps: ['spike_shell3'],
    moves: { smash: { name: 'Colossal Smash', steps: [{ atk: 22 }] }, charge: { name: 'Charge', steps: [{ block: 20, str: 3, trap: 'spike_shell3' }] } },
    ai: cycle('charge', 'smash') },
  { id: 'void_mage', name: 'Void Mage', icon: '🔮', hp: [50, 54], traps: ['hex_mirror3'],
    moves: { hex: { name: 'Hex', steps: [{ atk: 9, trap: 'hex_mirror3' }] }, nova: { name: 'Nova', steps: [{ atk: 4, times: 3 }] } },
    ai: cycle('hex', 'nova') },
  // Act 3 elites
  { id: 'echo_champion', name: 'Echo', icon: '🪞', hp: [120, 125], ghost: true, slots: 3,
    blurb: 'A champion-grade Echo of a saved deck.', moves: {}, ai: () => '',
    start: (e) => { e.st.str = (e.st.str ?? 0) + 1; } },
  { id: 'grand_sentinel', name: 'Grand Sentinel', icon: '🛕', hp: [150, 155], traps: ['counter_glyph3', 'thorn_snare3'],
    start: setTrap('counter_glyph3'),
    moves: {
      judge: { name: 'Judgement', steps: [{ atk: 20 }] }, flurry: { name: 'Flurry', steps: [{ atk: 8, times: 3 }] },
      bastion: { name: 'Bastion', steps: [{ block: 22, trap: 'counter_glyph3' }, { trap: 'thorn_snare3' }] },
    },
    ai: cycle('bastion', 'judge', 'flurry') },
  // Act 3 boss
  { id: 'last_dealer', name: 'The Last Dealer', icon: '🃏', hp: [192, 192], slots: 3,
    traps: ['counter_glyph3', 'smother3', 'ambush3', 'snap_jaw3', 'mirror_veil3'],
    blurb: 'Deals two traps at once and gains Edge whenever one of its traps fires. Below 40% HP it goes All In.',
    start: (e, cb) => { e.traps.push(cb.mkCard('snap_jaw3')); },
    onTrapFired: (e, cb) => cb.applyStatus(e, e, 'str', 1),
    moves: {
      deal: { name: 'The Deal', steps: [{ atk: 10, fn: (c, cb) => {
        for (let i = 0; i < 2; i++) if (c.src.traps.length < c.src.slots) c.src.traps.push(cb.mkCard(cb.rng.pick(['counter_glyph3', 'smother3', 'ambush3', 'snap_jaw3', 'mirror_veil3'])));
      }, fnLabel: 'Set 2 traps' }] },
      call: { name: 'Call', steps: [{ atk: 4, times: 4 }] },
      raise: { name: 'Raise', steps: [{ str: 2, block: 20 }] },
      allin: { name: 'ALL IN', steps: [{ atk: 30 }] },
    },
    ai: (e) => {
      if (e.hp < e.maxHp * 0.4 && !e.flags.allin) { e.flags.allin = 1; return 'allin'; }
      return ['deal', 'call', 'raise', 'call'][e.turn % 4];
    } },

  // ═════════ ALTERNATE ACTS (v0.3) ═════════
  // Each act has two versions; a run rolls one per act (the versions lean on the chain).

  // ── Act 1B: The Drowned Market ──
  { id: 'pickpocket_rat', name: 'Pickpocket Rat', icon: '🐭', hp: [14, 17], blurb: 'Steals 8 gold per Pilfer. Kill it to get the gold back.',
    moves: {
      pilfer: { name: 'Pilfer', steps: [{ atk: 4, fn: (c, cb) => { if (c.rec) return; const g = Math.min(8, cb.run.gold); cb.run.gold -= g; (c.src as EnemyState).flags.stolen = ((c.src as EnemyState).flags.stolen ?? 0) + g; if (g) cb.emit({ t: 'text', who: 'p', s: `-${g} gold` }); }, fnLabel: 'Steal gold' }] },
      scurry: { name: 'Scurry', steps: [{ block: 6 }] },
    },
    ai: randomNoRepeat('pilfer', 'pilfer', 'scurry'),
    onDeath: (e, cb) => { if (e.flags.stolen) { cb.run.gold += e.flags.stolen; cb.emit({ t: 'text', who: 'p', s: `+${e.flags.stolen} gold back` }); } } },
  { id: 'eel_merchant', name: 'Eel Merchant', icon: '🐍', hp: [26, 30], traps: ['hex_mirror'],
    moves: { haggle: { name: 'Haggle', steps: [{ weak: 1, trap: 'hex_mirror', block: 4 }] }, shock: { name: 'Shock', steps: [{ atk: 9 }] } },
    ai: cycle('haggle', 'shock', 'shock') },
  { id: 'jar_mimic', name: 'Jar Mimic', icon: '🏺', hp: [30, 34], traps: ['spike_shell', 'snap_jaw'], blurb: 'Starts with a Spike Shell set.',
    start: setTrap('spike_shell'),
    moves: { chomp: { name: 'Chomp', steps: [{ atk: 11 }] }, rattle: { name: 'Rattle', steps: [{ block: 7, trap: 'snap_jaw' }] } },
    ai: cycle('rattle', 'chomp') },
  { id: 'drowned_bell', name: 'Drowned Bell', icon: '🔔', hp: [20, 24],
    moves: { toll: { name: 'Toll', steps: [{ atk: 3, times: 2 }] }, knell: { name: 'Knell', steps: [{ vuln: 2, block: 5 }] } },
    ai: cycle('knell', 'toll', 'toll') },
  { id: 'auctioneer', name: 'The Auctioneer', icon: '🧑‍⚖️', hp: [70, 74], traps: ['counter_glyph'],
    blurb: 'Going once, going twice... SOLD! Every third turn it hits for 22. Count the gavel.',
    moves: {
      once: { name: 'Going Once', steps: [{ block: 10, trap: 'counter_glyph' }] },
      twice: { name: 'Going Twice', steps: [{ atk: 8, str: 1 }] },
      sold: { name: 'SOLD!', steps: [{ atk: 22 }] },
    },
    ai: cycle('once', 'twice', 'sold') },
  { id: 'tide_broker', name: 'The Tide Broker', icon: '🐙', hp: [133, 133], slots: 3, traps: ['ambush', 'snap_jaw'],
    blurb: 'Inks, grabs with four arms and sets two traps at once. Below half HP it issues a Margin Call.',
    moves: {
      ink: { name: 'Ink Cloud', steps: [{ weak: 2, block: 10 }] },
      grab: { name: 'Tentacles', steps: [{ atk: 4, times: 4 }] },
      collect: { name: 'Collect', steps: [{ trap: 'ambush' }, { trap: 'snap_jaw' }, { block: 6 }] },
      margin: { name: 'MARGIN CALL', steps: [{ atk: 20, vuln: 2 }] },
    },
    ai: (e) => {
      if (e.hp < e.maxHp / 2 && !e.flags.margin) { e.flags.margin = 1; return 'margin'; }
      return ['grab', 'collect', 'ink', 'grab'][e.turn % 4];
    } },

  // ── Act 2B: The Gilded Masquerade ──
  { id: 'masked_dancer', name: 'Masked Dancer', icon: '💃', hp: [38, 42], traps: ['mirror_veil2'],
    moves: { waltz: { name: 'Waltz', steps: [{ atk: 7, times: 2 }] }, pirouette: { name: 'Pirouette', steps: [{ block: 12, trap: 'mirror_veil2' }] } },
    ai: cycle('pirouette', 'waltz') },
  { id: 'porcelain_doll', name: 'Porcelain Doll', icon: '🎎', hp: [44, 48], blurb: 'Keeps its Guard between turns. Crack it with big hits.',
    start: (e) => { e.flags.keepBlock = 1; e.block = 10; },
    moves: { weep: { name: 'Weep', steps: [{ weak: 2, vuln: 1, block: 6 }] }, shatter: { name: 'Shatter', steps: [{ atk: 14 }] } },
    ai: cycle('weep', 'shatter') },
  { id: 'jester', name: 'Jester', icon: '🤡', hp: [34, 38], slots: 3, traps: ['ambush2', 'smother2'],
    moves: {
      juggle: { name: 'Juggle', steps: [{ atk: 3, times: 3 }] },
      prank: { name: 'Prank', steps: [{ block: 5, fn: (c, cb) => { if (c.src.traps.length < c.src.slots) c.src.traps.push(cb.mkCard(cb.rng.pick(['ambush2', 'smother2']))); }, fnLabel: 'Set trap' }] },
    },
    ai: cycle('prank', 'juggle') },
  { id: 'velvet_knife', name: 'Velvet Knife', icon: '🥷', hp: [40, 44], traps: ['ambush2'],
    moves: { backstab: { name: 'Backstab', steps: [{ atk: 13 }] }, vanish: { name: 'Vanish', steps: [{ block: 14, trap: 'ambush2' }] } },
    ai: cycle('vanish', 'backstab', 'backstab') },
  { id: 'mask_sun', name: 'Mask of the Sun', icon: '🌞', hp: [54, 58], blurb: 'Twin masks. While its twin lives, Sun heals it.',
    moves: {
      blaze: { name: 'Blaze', steps: [{ atk: 12 }] },
      dawn: { name: 'Dawn', steps: [{ fn: (c, cb) => { for (const e of cb.alive()) cb.heal(e, 8); }, fnLabel: 'Heal all 8' }, { str: 1 }] },
    },
    ai: cycle('blaze', 'dawn', 'blaze') },
  { id: 'mask_moon', name: 'Mask of the Moon', icon: '🌚', hp: [54, 58], traps: ['counter_glyph2'],
    moves: {
      eclipse: { name: 'Eclipse', steps: [{ weak: 2, fn: (c, cb) => { for (const e of cb.alive()) cb.gainBlock(e, 8); }, fnLabel: 'Guard all 8' }] },
      tide: { name: 'Night Tide', steps: [{ atk: 6, times: 2, trap: 'counter_glyph2' }] },
    },
    ai: cycle('eclipse', 'tide') },
  { id: 'impresario', name: 'The Impresario', icon: '🎩', hp: [150, 150], slots: 3, traps: ['counter_glyph2', 'smother2', 'mirror_veil2'],
    blurb: 'Runs the show in acts: Overture, Spotlight, Intermission. Below half HP: the Grand Finale.',
    start: setTrap('mirror_veil2'),
    moves: {
      overture: { name: 'Overture', steps: [{ str: 2, trap: 'counter_glyph2' }, { block: 8 }] },
      spotlight: { name: 'Spotlight', steps: [{ atk: 9, times: 2, vuln: 1 }] },
      intermission: { name: 'Intermission', steps: [{ block: 16, trap: 'smother2' }] },
      finale: { name: 'GRAND FINALE', steps: [{ atk: 26 }] },
    },
    ai: (e) => {
      if (e.hp < e.maxHp / 2 && !e.flags.finale) { e.flags.finale = 1; return 'finale'; }
      return ['overture', 'spotlight', 'intermission', 'spotlight'][e.turn % 4];
    } },

  // ── Act 3B: The Clockwork Abyss ──
  { id: 'gear_sentry', name: 'Gear Sentry', icon: '⚙️', hp: [54, 58],
    moves: { tick: { name: 'Tick', steps: [{ block: 12 }] }, tock: { name: 'Tock', steps: [{ atk: 17 }] } },
    ai: cycle('tick', 'tock') },
  { id: 'hour_wraith', name: 'Hour Wraith', icon: '⏳', hp: [48, 52], traps: ['counter_glyph3'],
    moves: { rewind: { name: 'Rewind', steps: [{ heal: 10, trap: 'counter_glyph3' }] }, sands: { name: 'Sandblast', steps: [{ atk: 6, times: 3 }] } },
    ai: cycle('sands', 'rewind', 'sands') },
  { id: 'brass_scorpion', name: 'Brass Scorpion', icon: '🦂', hp: [58, 62], traps: ['ambush3'],
    moves: { sting: { name: 'Sting', steps: [{ atk: 11, weak: 2 }] }, burrow: { name: 'Burrow', steps: [{ block: 16, trap: 'ambush3' }] } },
    ai: cycle('burrow', 'sting', 'sting') },
  { id: 'paradox_moth', name: 'Paradox Moth', icon: '🦋', hp: [44, 48], traps: ['mirror_veil3'],
    moves: { flicker: { name: 'Flicker', steps: [{ atk: 5, times: 2, vuln: 2 }] }, mirror: { name: 'Mirror', steps: [{ block: 10, trap: 'mirror_veil3' }] } },
    ai: cycle('flicker', 'mirror') },
  { id: 'clock_knight', name: 'Clockwork Knight', icon: '🕹️', hp: [148, 154], traps: ['snap_jaw3'],
    blurb: 'Winds up for two turns, then strikes MIDNIGHT for 30. Plan your Guard for turn 3, 6, 9…',
    moves: {
      wind: { name: 'Wind Up', steps: [{ str: 2, block: 14, trap: 'snap_jaw3' }] },
      cut: { name: 'Cogs', steps: [{ atk: 10, times: 2 }] },
      midnight: { name: 'MIDNIGHT', steps: [{ atk: 30 }] },
    },
    ai: cycle('wind', 'cut', 'midnight') },
  { id: 'clockmaker', name: 'The Clockmaker', icon: '🕰️', hp: [212, 212], slots: 3, traps: ['counter_glyph3', 'smother3', 'ambush3'],
    blurb: 'Every Gear Storm adds a gear. Stop Time sets two traps. Below 40% HP the clock strikes TWELVE.',
    moves: {
      storm: { name: 'Gear Storm', steps: [{ fn: (c) => { const e = c.src as EnemyState; c.dmg(5, Math.min(5, 2 + (e.flags.gears ?? 0))); e.flags.gears = (e.flags.gears ?? 0) + 1; },
        preview: (e, cb) => [{ icon: 'atk', n: cb.calcDmg(e, cb.s.player, 5), times: Math.min(5, 2 + (e.flags.gears ?? 0)) }] }] },
      wind: { name: 'Wind the Spring', steps: [{ str: 3, block: 18 }] },
      stop: { name: 'Stop Time', steps: [{ weak: 2, trap: 'counter_glyph3' }, { trap: 'smother3' }] },
      twelve: { name: 'TWELVE', steps: [{ atk: 34 }] },
    },
    ai: (e) => {
      if (e.hp < e.maxHp * 0.4 && !e.flags.twelve) { e.flags.twelve = 1; return 'twelve'; }
      return ['storm', 'stop', 'storm', 'wind'][e.turn % 4];
    } },

  // ═════════ v0.4: new enemies (both versions of each act), elites, wandering bosses, the Reflection ═════════
  // ── Act 1 ──
  { id: 'magpie_thief', name: 'Magpie', icon: '🐦', hp: [16, 19], blurb: 'Steals one of your set Reactions and sets it against you. Kill it to get the card back.',
    moves: {
      snatch: { name: 'Snatch', steps: [{ atk: 4, fn: (c) => { c.steal(1); }, fnLabel: 'Steal a Reaction' }] },
      peck: { name: 'Peck', steps: [{ atk: 3, times: 2 }] },
    },
    ai: cycle('snatch', 'peck') },
  { id: 'lattice_spider', name: 'Lattice Spider', icon: '🕸️', hp: [20, 24], traps: ['tripwire'],
    moves: {
      weave: { name: 'Weave', steps: [{ block: 5, trap: 'tripwire' }] }, bite: { name: 'Bite', steps: [{ atk: 7 }] },
      venom: { name: 'Venom', steps: [{ atk: 4, weak: 1 }] },
    },
    ai: cycle('weave', 'bite', 'venom') },
  { id: 'wick_imp', name: 'Wick Imp', icon: '👺', hp: [15, 18],
    moves: { flicker: { name: 'Flicker', steps: [{ block: 4, str: 1 }] }, spit: { name: 'Spit', steps: [{ atk: 4, burn: 2 }] } },
    ai: randomNoRepeat('spit', 'spit', 'flicker') },
  { id: 'broomling', name: 'Broomling', icon: '🧹', hp: [10, 12],
    moves: { sweep: { name: 'Sweep', steps: [{ atk: 5 }] } }, ai: () => 'sweep' },
  { id: 'hedge_witch', name: 'The Hedge Witch', icon: '🧙', hp: [62, 66], traps: ['tripwire', 'hex_mirror'],
    blurb: 'Brews Broomlings (3 alive at most) and hexes your Tricks. Kill the witch and the brooms fall with her.',
    start: setTrap('tripwire'),
    moves: {
      brew: { name: 'Brew', steps: [{ block: 6, fn: (c) => c.summon('broomling'), fnLabel: 'Summon Broomling' }] },
      cackle: { name: 'Cackle', steps: [{ atk: 7, times: 2 }] },
      hex: { name: 'Hex', steps: [{ weak: 2, vuln: 1, trap: 'hex_mirror' }] },
    },
    ai: cycle('brew', 'cackle', 'hex', 'cackle'),
    onDeath: (_e, cb) => { for (const x of cb.alive()) if (x.def === 'broomling') { cb.emit({ t: 'text', who: cb.whoKey(x), s: 'Crumbles' }); cb.loseHp(x, x.hp); } } },
  { id: 'briarling', name: 'Briarling', icon: '🥀', hp: [12, 14], start: (e) => { e.st.thorns = 1; },
    moves: { stab: { name: 'Stab', steps: [{ atk: 5 }] } }, ai: () => 'stab' },
  { id: 'briar_queen', name: 'The Briar Queen', icon: '🌹', hp: [120, 120], slots: 2, traps: ['thorn_snare', 'bear_trap'],
    blurb: 'Holds court with Briarlings and grows Barbs. Below half HP: Wrath of Roses, four quick cuts.',
    start: (e) => { e.st.thorns = 1; },
    moves: {
      court: { name: 'Hold Court', steps: [{ block: 8, fn: (c) => c.summon('briarling'), fnLabel: 'Summon Briarling' }] },
      lash: { name: 'Rose Lash', steps: [{ atk: 7, times: 2 }] },
      crown: { name: 'Crown of Thorns', steps: [{ str: 1, self: ['thorns', 1], trap: 'bear_trap' }] },
      wrath: { name: 'WRATH OF ROSES', steps: [{ atk: 5, times: 4 }] },
    },
    ai: (e) => {
      if (e.hp < e.maxHp / 2 && !e.flags.wrath) { e.flags.wrath = 1; return 'wrath'; }
      return ['court', 'lash', 'crown', 'lash'][e.turn % 4];
    } },

  // ── Act 2 ──
  { id: 'chain_warden', name: 'Chain Warden', icon: '⛓️', hp: [44, 48], blurb: 'Holds a Grudge: every chain of 3+ links makes it stronger. Pick your long chains carefully.',
    start: (e) => { e.st.grudge = 2; },
    moves: { lash: { name: 'Chain Lash', steps: [{ atk: 10 }] }, bind: { name: 'Bind', steps: [{ weak: 1, block: 10 }] } },
    ai: cycle('lash', 'bind') },
  { id: 'trapper', name: 'Trapper', icon: '🏹', hp: [36, 40], traps: ['bear_trap2'],
    moves: { set: { name: 'Set Snares', steps: [{ block: 6, trap: 'bear_trap2' }] }, volley: { name: 'Volley', steps: [{ atk: 5, times: 2 }] } },
    ai: cycle('set', 'volley', 'volley') },
  { id: 'leech', name: 'Grave Leech', icon: '🪱', hp: [38, 42], traps: ['soul_snare2'],
    moves: { drain: { name: 'Drain', steps: [{ atk: 7, heal: 4 }] }, coil: { name: 'Coil', steps: [{ block: 8, trap: 'soul_snare2' }] } },
    ai: cycle('coil', 'drain', 'drain') },
  { id: 'executioner', name: 'The Executioner', icon: '🪓', hp: [100, 106],
    blurb: 'Every third turn: EXECUTE for 32. Negate it, Guard it, or kill it first.',
    moves: {
      mark: { name: 'Mark', steps: [{ vuln: 2, block: 14 }] },
      chop: { name: 'Chop', steps: [{ atk: 12 }] },
      axe: { name: 'EXECUTE', steps: [{ atk: 32 }] },
    },
    ai: cycle('mark', 'chop', 'axe') },
  { id: 'magpie_king', name: 'The Magpie King', icon: '🦚', hp: [180, 180], slots: 3, traps: ['snap_jaw2', 'smother2'],
    blurb: 'Steals your set Reactions and uses them against you (or 10 gold if you have none). Below half HP: Treasure Storm, one more hit per card in his hoard.',
    start: setTrap('snap_jaw2'),
    moves: {
      pilfer: { name: 'Pilfer', steps: [{ atk: 6, fn: (c, cb) => {
        if (c.steal(1) || c.rec) return;
        const g = Math.min(10, cb.run.gold);
        if (!g) return;
        cb.run.gold -= g;
        const e = c.src as EnemyState;
        e.flags.stolen = (e.flags.stolen ?? 0) + g;
        cb.emit({ t: 'text', who: 'p', s: `-${g} gold` });
      }, fnLabel: 'Steal a Reaction' }] },
      swoop: { name: 'Swoop', steps: [{ atk: 5, times: 3 }] },
      hoard: { name: 'Hoard', steps: [{ fn: (c, cb) => cb.gainBlock(c.src, 8 + 6 * c.src.traps.length), fnLabel: 'Guard', preview: (e) => [{ icon: 'block', n: 8 + 6 * e.traps.length }] }, { trap: 'smother2' }] },
      storm: { name: 'TREASURE STORM', steps: [{ fn: (c) => c.dmg(5, 3 + c.src.traps.length), preview: (e, cb) => [{ icon: 'atk', n: cb.calcDmg(e, cb.s.player, 5), times: 3 + e.traps.length }] }] },
    },
    ai: (e) => {
      if (e.hp < e.maxHp / 2 && !e.flags.storm) { e.flags.storm = 1; return 'storm'; }
      return ['pilfer', 'swoop', 'hoard', 'swoop'][e.turn % 4];
    },
    onDeath: (e, cb) => { if (e.flags.stolen) { cb.run.gold += e.flags.stolen; cb.emit({ t: 'text', who: 'p', s: `+${e.flags.stolen} gold back` }); } } },

  // ── Act 3 ──
  { id: 'null_seraph', name: 'Null Seraph', icon: '👼', hp: [52, 56], traps: ['smother3'],
    moves: {
      smite: { name: 'Smite', steps: [{ atk: 9, times: 2 }] },
      hymn: { name: 'Hymn', steps: [{ fn: (_c, cb) => { for (const x of cb.alive()) cb.heal(x, 6); }, fnLabel: 'Heal all 6', trap: 'smother3' }] },
    },
    ai: cycle('smite', 'hymn', 'smite') },
  { id: 'rift_caller', name: 'Rift Caller', icon: '🌀', hp: [46, 50],
    moves: {
      call: { name: 'Open Rift', steps: [{ block: 10, fn: (c) => c.summon('rift_spawn'), fnLabel: 'Summon Rift Spawn' }] },
      bolt: { name: 'Rift Bolt', steps: [{ atk: 13 }] },
    },
    ai: cycle('call', 'bolt', 'bolt') },
  { id: 'rift_spawn', name: 'Rift Spawn', icon: '👾', hp: [16, 18],
    moves: { claw: { name: 'Claw', steps: [{ atk: 7 }] } }, ai: () => 'claw' },
  { id: 'mirror_knight', name: 'The Mirror Knight', icon: '🪞', hp: [140, 146], traps: ['counter_glyph3'],
    blurb: 'Reflect: plays the last Attack or Trick you played back at you (14 damage if there is none). Your own best card is its best move.',
    start: setTrap('counter_glyph3'),
    moves: {
      reflect: { name: 'Reflect', steps: [{ fn: (c, cb) => {
        const lp = cb.s.lastPlay;
        if (lp && CARDS[lp.id]?.play && !CARDS[lp.id].noMimic) c.playAs(lp.id, lp.up); else c.dmg(14);
      }, preview: (e, cb) => {
        const lp = cb.s.lastPlay;
        return [{ icon: 'special', label: lp && CARDS[lp.id] ? `Reflect: ${CARDS[lp.id].name}` : 'Reflect' }];
      } }] },
      guard: { name: 'Mirror Guard', steps: [{ block: 18, trap: 'counter_glyph3' }] },
      cleave: { name: 'Silver Cleave', steps: [{ atk: 10, times: 2 }] },
    },
    ai: cycle('reflect', 'guard', 'cleave') },
  { id: 'orrery', name: 'The Orrery', icon: '🪐', hp: [222, 222], slots: 3, traps: ['counter_glyph3', 'mirror_veil3', 'tripwire3'],
    blurb: 'Turns a Fate Coin of its own: ☀ Solar Flare hits twice, ☾ Lunar Tide heals and sets a trap. Every third turn the planets align. Below 40% HP: ECLIPSE.',
    start: (e) => { e.coin = 0; },
    moves: {
      sun: { name: '☀ Solar Flare', steps: [{ atk: 12, times: 2, fn: (_c, cb) => cb.flip(_c.src), fnLabel: 'Flip' }] },
      moon: { name: '☾ Lunar Tide', steps: [{ block: 16, heal: 10, fn: (c, cb) => {
        if (c.src.traps.length < c.src.slots) c.src.traps.push(cb.mkCard(cb.rng.pick(['counter_glyph3', 'mirror_veil3', 'tripwire3'])));
        cb.flip(c.src);
      }, fnLabel: 'Set trap, flip' }] },
      align: { name: 'Alignment', steps: [{ str: 3, block: 12 }] },
      eclipse: { name: 'ECLIPSE', steps: [{ atk: 36 }] },
    },
    ai: (e) => {
      if (e.hp < e.maxHp * 0.4 && !e.flags.eclipse) { e.flags.eclipse = 1; return 'eclipse'; }
      if (e.turn % 3 === 2) return 'align';
      return e.coin ? 'moon' : 'sun';
    } },

  // ═════════ v0.5: ink, bells and graves ═════════
  // Act 1
  { id: 'ink_imp', name: 'Ink Imp', icon: '🖋️', hp: [17, 20], blurb: 'Blots your cards: a Blotted card costs 1 more for the rest of the fight.',
    moves: {
      splash: { name: 'Ink Splash', steps: [{ atk: 5, fn: (c) => c.blot(1), fnLabel: 'Blot 1' }] },
      scribble: { name: 'Scribble', steps: [{ atk: 3, times: 2 }] },
    },
    ai: cycle('splash', 'scribble') },
  { id: 'bell_ringer', name: 'Bell Ringer', icon: '🔔', hp: [28, 32], traps: ['soul_snare'], blurb: 'Every chain that resolves rings its bell: it gains 3 Guard.',
    start: (e) => { e.st.chime = 3; },
    moves: {
      toll: { name: 'Toll', steps: [{ atk: 8 }] },
      peal: { name: 'Peal', steps: [{ block: 5, trap: 'soul_snare' }] },
    },
    ai: cycle('peal', 'toll', 'toll') },
  { id: 'gravemoss', name: 'Gravemoss', icon: '🍄', hp: [24, 28], traps: ['thorn_snare'],
    moves: {
      spore: { name: 'Spore Cloud', steps: [{ atk: 4, weak: 1 }] },
      creep: { name: 'Creep', steps: [{ block: 6, self: ['thorns', 1], trap: 'thorn_snare' }] },
    },
    ai: cycle('creep', 'spore', 'spore') },
  { id: 'bell_tyrant', name: 'The Bell Tyrant', icon: '🛎️', hp: [106, 106], slots: 2, traps: ['soul_snare', 'snap_jaw'],
    blurb: 'Rings for every chain (gains 4 Guard). Calls Bell Ringers to the tower. Below half HP: DEATH KNELL.',
    start: (e) => { e.st.chime = 4; },
    moves: {
      toll: { name: 'Great Toll', steps: [{ atk: 7, times: 2 }] },
      call: { name: 'Call the Ringers', steps: [{ block: 8, fn: (c) => c.summon('bell_ringer'), fnLabel: 'Summon Bell Ringer' }] },
      deafen: { name: 'Deafening Peal', steps: [{ weak: 2, trap: 'soul_snare', block: 6 }] },
      knell: { name: 'DEATH KNELL', steps: [{ atk: 16 }] },
    },
    ai: (e) => {
      if (e.hp < e.maxHp / 2 && !e.flags.knell) { e.flags.knell = 1; return 'knell'; }
      return ['call', 'toll', 'deafen', 'toll'][e.turn % 4];
    } },
  // Act 2
  { id: 'inkwitch', name: 'The Inkwitch', icon: '🧙‍♀️', hp: [86, 92], traps: ['hex_mirror2', 'tripwire2'],
    blurb: 'Blots your draw pile in handfuls. Blotted cards cost 1 more until the fight ends (Clean Slate and the Ink Blotter help).',
    moves: {
      storm: { name: 'Blot Storm', steps: [{ atk: 6, fn: (c) => c.blot(3), fnLabel: 'Blot 3' }] },
      quill: { name: 'Quill', steps: [{ atk: 8, times: 2 }] },
      smudge: { name: 'Smudge', steps: [{ block: 12, trap: 'tripwire2' }] },
    },
    ai: cycle('storm', 'quill', 'smudge') },
  { id: 'debt_collector', name: 'Debt Collector', icon: '💼', hp: [44, 48], blurb: 'Audits you for 8 gold. Kill it to get every coin back.',
    moves: {
      audit: { name: 'Audit', steps: [{ atk: 6, fn: (c, cb) => {
        if (cb.run.arena || cb.run.puzzle) return;
        const g = Math.min(8, cb.run.gold);
        cb.run.gold -= g;
        (c.src as EnemyState).flags.stolen = ((c.src as EnemyState).flags.stolen ?? 0) + g;
        cb.emit({ t: 'text', who: 'p', s: `−${g} gold` });
      }, fnLabel: 'Take 8 gold' }] },
      repo: { name: 'Repossess', steps: [{ atk: 6, times: 2 }] },
    },
    ai: cycle('audit', 'repo'),
    onDeath: (e, cb) => { if (e.flags.stolen) { cb.run.gold += e.flags.stolen; cb.emit({ t: 'text', who: 'p', s: `+${e.flags.stolen} gold back` }); } } },
  { id: 'gravecaller', name: 'Gravecaller', icon: '🪦', hp: [40, 44], traps: ['snap_jaw2'],
    blurb: 'Raises Skeletons, and its Snap Jaw comes back once each turn after it fires.',
    moves: {
      raise: { name: 'Raise Dead', steps: [{ block: 6, trap: 'snap_jaw2', fn: (c) => c.summon('skeleton'), fnLabel: 'Summon Skeleton' }] },
      spear: { name: 'Bone Spear', steps: [{ atk: 11 }] },
    },
    ai: cycle('raise', 'spear', 'spear'),
    onTrapFired: (e, cb) => { if (e.flags.revived !== cb.s.turn && e.traps.length < e.slots) { e.flags.revived = cb.s.turn; e.traps.push(cb.mkCard('snap_jaw2')); cb.emit({ t: 'text', who: cb.whoKey(e), s: 'Rises again' }); } } },
  { id: 'skeleton', name: 'Skeleton', icon: '💀', hp: [10, 12],
    moves: { rattle: { name: 'Rattle', steps: [{ atk: 6 }] } }, ai: () => 'rattle',
    onDeath: (_e, cb) => { const g = cb.alive().find((x) => x.def === 'gravelord'); if (g) cb.applyStatus(g, g, 'str', 1); } },
  { id: 'blotted_saint', name: 'The Blotted Saint', icon: '📜', hp: [178, 178], slots: 3, traps: ['hex_mirror2', 'tripwire2', 'counter_glyph2'],
    blurb: 'Writes over your deck: every sermon Blots your cards. Below half HP it Illuminates once (heals and grows stronger).',
    moves: {
      excommunicate: { name: 'Excommunicate', steps: [{ atk: 10, fn: (c) => c.blot(3), fnLabel: 'Blot 3' }] },
      inkfall: { name: 'Inkfall', steps: [{ atk: 5, times: 4 }] },
      vellum: { name: 'Vellum Ward', steps: [{ block: 18, fn: (c, cb) => {
        if (c.src.traps.length < c.src.slots) c.src.traps.push(cb.mkCard(cb.rng.pick(['hex_mirror2', 'tripwire2', 'counter_glyph2'])));
      }, fnLabel: 'Set a trap' }] },
      illuminate: { name: 'ILLUMINATE', steps: [{ heal: 20, str: 3 }] },
    },
    ai: (e) => {
      if (e.hp < e.maxHp / 2 && !e.flags.lit) { e.flags.lit = 1; return 'illuminate'; }
      return ['excommunicate', 'inkfall', 'vellum'][e.turn % 3];
    } },
  // Act 3
  { id: 'lich_archivist', name: 'Lich Archivist', icon: '📕', hp: [56, 60], traps: ['smother3'],
    blurb: 'Burns the top pages of your draw pile (they are folded for the fight).',
    moves: {
      erase: { name: 'Burn the Pages', steps: [{ atk: 6, fn: (c) => c.burnPages(2), fnLabel: 'Fold 2 from your draw pile' }] },
      bolt: { name: 'Shadow Bolt', steps: [{ atk: 14 }] },
      ward: { name: 'Ward', steps: [{ block: 15, trap: 'smother3' }] },
    },
    ai: cycle('erase', 'bolt', 'ward') },
  { id: 'bone_bishop', name: 'The Bone Bishop', icon: '☠️', hp: [148, 154], traps: ['counter_glyph3', 'soul_snare3'],
    blurb: 'Preaches to Skeletons. Last Rites heals every enemy and raises another.',
    start: setTrap('soul_snare3'),
    moves: {
      rites: { name: 'Last Rites', steps: [{ fn: (_c, cb) => { for (const x of cb.alive()) cb.heal(x, 10); }, fnLabel: 'Heal all 10' }, { fn: (c) => c.summon('skeleton'), fnLabel: 'Summon Skeleton' }] },
      sermon: { name: 'Sermon', steps: [{ atk: 9, times: 2, vuln: 1 }] },
      absolve: { name: 'Absolution', steps: [{ block: 20, str: 2, trap: 'counter_glyph3' }] },
    },
    ai: cycle('rites', 'sermon', 'absolve', 'sermon') },
  { id: 'gravelord', name: 'The Gravelord', icon: '⚰️', hp: [212, 212], slots: 3, traps: ['snap_jaw3', 'counter_glyph3', 'soul_snare3'],
    blurb: 'Raises Skeletons; each Skeleton that falls makes it stronger. Its traps rise again once a turn.',
    moves: {
      raise: { name: 'Raise the Fallen', steps: [{ block: 10, fn: (c) => c.summon('skeleton'), fnLabel: 'Summon Skeleton' }] },
      scythe: { name: 'Scythe', steps: [{ atk: 12, times: 2 }] },
      tomb: { name: 'Tomb Ward', steps: [{ block: 16, fn: (c, cb) => {
        if (c.src.traps.length < c.src.slots) c.src.traps.push(cb.mkCard(cb.rng.pick(['snap_jaw3', 'counter_glyph3', 'soul_snare3'])));
      }, fnLabel: 'Set a trap' }] },
      reap: { name: 'THE REAPING', steps: [{ atk: 30 }] },
    },
    ai: (e) => {
      if (e.hp < e.maxHp * 0.35 && !e.flags.reap) { e.flags.reap = 1; return 'reap'; }
      return ['raise', 'scythe', 'tomb', 'scythe'][e.turn % 4];
    },
    onTrapFired: (e, cb) => { if (e.flags.revived !== cb.s.turn && e.traps.length < e.slots) { e.flags.revived = cb.s.turn; e.traps.push(cb.mkCard('snap_jaw3')); } } },

  // ── Act 4 (epilogue): the Reflection plays your own current deck ──
  { id: 'reflection', name: 'The Reflection', icon: '🪞', hp: [240, 240], ghost: true, slots: 2,
    blurb: 'Your own deck, played back at you with 4 energy a turn and 2 Edge. It has as many Reaction slots as you do.',
    moves: {}, ai: () => '',
    start: (e, cb) => {
      const deck = cb.run.deck.map((c) => cb.mkCard(c.id, c.up)).filter((c) => CARDS[c.id] && !CARDS[c.id].unplayable && CARDS[c.id].type !== 'power' && CARDS[c.id].faction !== 'curse');
      e.ghost = { deck, draw: cb.rng.shuffle([...deck]), plan: [], label: 'The Reflection' };
      e.name = 'The Reflection';
      e.flags.energy = 1;
      e.slots = cb.s.player.slots;
      e.st.str = (e.st.str ?? 0) + 2;
    } },

  // ── Arena (async PvP): a rival's saved deck, played back by the game ──
  { id: 'echo_rival', name: 'Rival', icon: '🤺', hp: [56, 56], ghost: true, slots: 2,
    blurb: "Another duelist's saved deck. It plays the same cards you do, by the same rules.", moves: {}, ai: () => '',
    start: (e, cb) => {
      const w = cb.run.arena?.wins ?? 0;
      if (e.ghost) e.name = e.ghost.label;
      e.maxHp = e.hp = 56 + 9 * w;
      if (w >= 3) e.st.str = (e.st.str ?? 0) + Math.floor((w - 1) / 2);
      if (w >= 5) e.slots = 3;
    } },
];

E.push(...E6);
export const ENEMIES: Record<string, EnemyDef> = Object.fromEntries(E.map((e) => [e.id, e]));

export interface Encounter { id: string; name: string; enemies: string[] }

const enc = (name: string, ...enemies: string[]): Encounter => ({ id: enemies.join('+'), name, enemies });

// v0.4 fights, shuffled into both versions of each act.
const ACT1_NEW = [enc('Lattice Spider', 'lattice_spider'), enc('Spider & Imp', 'lattice_spider', 'wick_imp'), enc('Magpies', 'magpie_thief', 'magpie_thief'), enc('Wick Imps', 'wick_imp', 'wick_imp'),
  // v0.5
  enc('Ink Imps', 'ink_imp', 'ink_imp'), enc('Bell Ringer', 'bell_ringer'), enc('Gravemoss & Imp', 'gravemoss', 'ink_imp')];
const ACT2_NEW = [enc('Chain Warden', 'chain_warden'), enc('Trapper & Leech', 'trapper', 'leech'), enc('Grave Leech', 'leech'), enc('Warden & Trapper', 'chain_warden', 'trapper'),
  // v0.5
  enc('Debt Collector', 'debt_collector'), enc('Gravecaller', 'gravecaller'), enc('Collector & Ringer', 'debt_collector', 'bell_ringer')];
const ACT3_NEW = [enc('Seraph & Caller', 'null_seraph', 'rift_caller'), enc('Rift Caller', 'rift_caller'), enc('Null Seraph', 'null_seraph'),
  // v0.5
  enc('Lich Archivist', 'lich_archivist'), enc('Archivist & Eye', 'lich_archivist', 'abyss_eye')];
const ELITE_NEW: Record<number, Encounter[]> = { 1: [], 2: [enc('The Inkwitch', 'inkwitch')], 3: [enc('The Bone Bishop', 'bone_bishop')] };

/** v0.4 wandering bosses: each run, an act has a 1 in 3 chance to swap its boss for this one, whichever version it is. */
export const WANDERING_BOSSES: Record<number, Encounter> = {
  1: enc('The Briar Queen', 'briar_queen'),
  2: enc('The Magpie King', 'magpie_king'),
  3: enc('The Orrery', 'orrery'),
};
/** v0.5: a second wanderer per act (a rolled wandering boss is one of the two, 50/50). */
export const WANDERING_BOSSES_2: Record<number, Encounter> = {
  1: enc('The Bell Tyrant', 'bell_tyrant'),
  2: enc('The Blotted Saint', 'blotted_saint'),
  3: enc('The Gravelord', 'gravelord'),
};
/** v0.5 The Long Night: each night's boss, in rotation. */
export const NIGHT_BOSSES: Encounter[] = [
  enc('The Last Dealer', 'last_dealer'), enc('The Gravelord', 'gravelord'), enc('The Clockmaker', 'clockmaker'), enc('The Orrery', 'orrery'),
  enc('The Blotted Saint', 'blotted_saint'), enc('Chorus of Knives', 'chorus_of_knives'), enc('The Magpie King', 'magpie_king'), enc('The Impresario', 'impresario'),
  // v0.6
  ...NIGHT_BOSSES6, enc('The Forgemother', 'forgemother'), enc('The Leviathan', 'leviathan'),
];
/** Act 4: the epilogue fight, offered after the Act 3 boss to runs that slew 2+ Champions. */
export const EPILOGUE = enc('The Reflection', 'reflection');

export const ENCOUNTERS: Record<number, { easy: Encounter[]; normal: Encounter[]; elite: Encounter[]; boss: Encounter }> = {
  1: {
    easy: [enc('Cinder Rats', 'cinder_rat', 'cinder_rat'), enc('Gloom Moth', 'gloom_moth'), enc('Bramble Beetle', 'bramble_beetle'), enc('Magpie', 'magpie_thief')],
    normal: [
      enc('Hex & Moth', 'gloom_moth', 'hex_acolyte'), enc('Rust Knight', 'rust_knight'), enc('Bog & Rat', 'bog_lurker', 'cinder_rat'),
      enc('Beetle Swarm', 'bramble_beetle', 'gloom_moth'), enc('Acolyte & Rat', 'hex_acolyte', 'cinder_rat'), enc('Bog Lurker', 'bog_lurker'),
      ...ACT1_NEW,
    ],
    elite: [enc('Gatekeeper', 'gatekeeper'), enc('Twin Blades', 'blade_left', 'blade_right'), enc('Trapmaster Vex', 'trapmaster'), enc('The Hedge Witch', 'hedge_witch')],
    boss: enc('The Lantern Warden', 'lantern_warden'),
  },
  2: {
    easy: [enc('Tide Wraith', 'tide_wraith'), enc('Mirror Imp', 'mirror_imp')],
    normal: [
      enc('Iron Hounds', 'iron_hound', 'iron_hound'), enc('Cult & Imp', 'ash_cultist', 'mirror_imp'), enc('Thorn Golem', 'thorn_golem'),
      enc('Spore Mother', 'spore_mother', 'mirror_imp'), enc('Cultist & Hound', 'ash_cultist', 'iron_hound'), enc('Tide Wraith', 'tide_wraith'),
      ...ACT2_NEW,
    ],
    elite: [enc('Echo', 'echo_duelist'), enc('Chorus Knight', 'chorus_knight'), enc('Warden of Seals', 'seal_warden'), enc('The Executioner', 'executioner')],
    boss: enc('Chorus of Knives', 'chorus_of_knives'),
  },
  3: {
    easy: [enc('Phase Stalker', 'phase_stalker'), enc('Abyss Eye', 'abyss_eye')],
    normal: [
      enc('Eye & Mage', 'abyss_eye', 'void_mage'), enc('Bone Choir', 'bone_choir', 'bone_choir'), enc('Iron Colossus', 'iron_colossus'),
      enc('Stalker & Eye', 'phase_stalker', 'abyss_eye'), enc('Mage & Choir', 'void_mage', 'bone_choir'), enc('Phase Stalker', 'phase_stalker'),
      ...ACT3_NEW,
    ],
    elite: [enc('Echo Champion', 'echo_champion'), enc('Grand Sentinel', 'grand_sentinel'), enc('The Mirror Knight', 'mirror_knight')],
    boss: enc('The Last Dealer', 'last_dealer'),
  },
};

/** Alternate versions of each act (v0.3). A run rolls 0 (standard) or 1 (alternate) per act. */
export const ALT_ENCOUNTERS: Record<number, { easy: Encounter[]; normal: Encounter[]; elite: Encounter[]; boss: Encounter }> = {
  1: {
    easy: [enc('Pickpockets', 'pickpocket_rat', 'pickpocket_rat'), enc('Drowned Bell', 'drowned_bell'), enc('Jar Mimic', 'jar_mimic')],
    normal: [
      enc('Eel Merchant', 'eel_merchant'), enc('Bell & Rat', 'drowned_bell', 'pickpocket_rat'), enc('Mimic & Bell', 'jar_mimic', 'drowned_bell'),
      enc('Eel & Rat', 'eel_merchant', 'pickpocket_rat'), enc('Hex & Mimic', 'hex_acolyte', 'jar_mimic'), enc('Rust Knight', 'rust_knight'),
      ...ACT1_NEW,
    ],
    elite: [enc('The Auctioneer', 'auctioneer'), enc('Trapmaster Vex', 'trapmaster'), enc('Gatekeeper', 'gatekeeper'), enc('The Hedge Witch', 'hedge_witch')],
    boss: enc('The Tide Broker', 'tide_broker'),
  },
  2: {
    easy: [enc('Masked Dancer', 'masked_dancer'), enc('Velvet Knife', 'velvet_knife')],
    normal: [
      enc('Jester & Doll', 'jester', 'porcelain_doll'), enc('Porcelain Doll', 'porcelain_doll'), enc('Dancers', 'masked_dancer', 'jester'),
      enc('Knife & Jester', 'velvet_knife', 'jester'), enc('Doll & Imp', 'porcelain_doll', 'mirror_imp'), enc('Iron Hounds', 'iron_hound', 'iron_hound'),
      ...ACT2_NEW,
    ],
    elite: [enc('Sun & Moon', 'mask_sun', 'mask_moon'), enc('Echo', 'echo_duelist'), enc('Chorus Knight', 'chorus_knight'), enc('The Executioner', 'executioner')],
    boss: enc('The Impresario', 'impresario'),
  },
  3: {
    easy: [enc('Gear Sentry', 'gear_sentry'), enc('Paradox Moth', 'paradox_moth')],
    normal: [
      enc('Wraith & Sentry', 'hour_wraith', 'gear_sentry'), enc('Brass Scorpion', 'brass_scorpion'), enc('Moth & Wraith', 'paradox_moth', 'hour_wraith'),
      enc('Scorpion & Moth', 'brass_scorpion', 'paradox_moth'), enc('Hour Wraith', 'hour_wraith'), enc('Eye & Mage', 'abyss_eye', 'void_mage'),
      ...ACT3_NEW,
    ],
    elite: [enc('Clockwork Knight', 'clock_knight'), enc('Echo Champion', 'echo_champion'), enc('Grand Sentinel', 'grand_sentinel'), enc('The Mirror Knight', 'mirror_knight')],
    boss: enc('The Clockmaker', 'clockmaker'),
  },
};

export const ACT_NAMES: Record<number, string[]> = {
  1: ['The Lantern Road', 'The Drowned Market', 'The Hollow Woods'],
  2: ['The Chorus Halls', 'The Gilded Masquerade', "The Wreckers' Coast"],
  3: ["The Dealer's Abyss", 'The Clockwork Abyss', 'The Molten Deep'],
};

export function actEncounters(act: number, variant = 0) {
  // v0.6: variant 2 is the third version of the act (the Woods, the Coast, the Deep). It brings its own monsters
  // plus the shared new fights, but not the v0.4/v0.5 additions, so each version keeps its own character.
  if (variant === 2) {
    const w = WILD_ENCOUNTERS[act];
    return { ...w, normal: [...w.normal, ...(SHARED6[act] ?? [])] };
  }
  const e = variant ? ALT_ENCOUNTERS[act] : ENCOUNTERS[act];
  const normal = [...e.normal, ...(SHARED6[act] ?? [])];
  return { ...e, normal, elite: ELITE_NEW[act]?.length ? [...e.elite, ...ELITE_NEW[act]] : e.elite };
}
