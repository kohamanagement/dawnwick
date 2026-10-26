// Procedural card art: a faction scene (SVG motif, varied per card by a hash of its id) behind a
// glyph. No image files, so the whole game still ships as one small HTML file.
import { CARDS } from '../data/cards';
import { hashStr } from '../engine/rng';

export const ART_ICON: Record<string, string> = {
  strike: '🗡️', guard: '🛡️', brace: '🧱', quick_study: '📖', second_wind: '🌬️', feint: '🎭', bank_shot: '🎯', duel_stance: '🤺',
  wildcard: '🃏', patience: '🧘', spark_lunge: '⚡', flame_lash: '🔥', kindling: '🪵', searing_strike: '☄️', reckless_swing: '🪓',
  blaze_ward: '🔆', cinder_trap: '🧨', fury_chain: '⛓️', wildfire: '🌋', stoke: '♨️', hot_blood: '🩸', ignite: '💥', ember_crown: '👑',
  bonfire: '🏕️', parry: '⚔️', riptide_snare: '🪢', tidal_read: '🔮', undertow: '🌊', ebb: '🫧', calm_waters: '🪷', countercurrent: '🌀',
  mirror_tide: '🪞', surge: '💧', wave_crash: '🌊', deep_focus: '👁️', tide_turner: '⚓', flow_state: '🐚', bramble_ward: '🌿',
  barkskin: '🪵', root_strike: '🌱', bramble_snare: '🥀', harden: '🪨', sapling: '🌱', thornmail: '🌵', regrowth: '🍃', trunk_slam: '🌳',
  deep_roots: '🫚', thorn_volley: '🌵', overgrowth: '🌾', wild_bloom: '🌸', grove_guardian: '🦌', hollow_cut: '🗡️', bone_toll: '🦴',
  shatter_seal: '💠', rend: '🩻', blood_price: '🩸', grave_snare: '🪦', soul_siphon: '👻', bone_shield: '💀', consume: '🕳️',
  offering: '🕯️', void_lance: '🔱', creeping_end: '⏳', null_ward: '🚫', abyss_gaze: '👁️‍🗨️', grave_harvest: '⚰️', final_hour: '⌛',
  soul_rend: '☠️', grand_riposte: '⚜️', masters_gambit: '♟️', phoenix_rite: '🐦‍🔥', inferno_duel: '🔥', maelstrom: '🌀',
  drowning_verse: '🎼', worldroot: '🌳', briar_reprisal: '🌹', oblivion: '🌑', requiem_bell: '🔔', wound: '🩹', regret: '😞',
  // v0.3
  ossuary_ward: '🦴', hollow_echo: '🔊', grim_tithe: '⚱️', death_knell: '🔔', soul_lantern: '🏮', tarot_reading: '🔮',
  coin_toss: '🪙', hedge: '🎲', heads_up: '☀️', double_down: '✌️', ante_up: '💰', penny_ward: '🪙', call_bluff: '🃏', pickpocket: '👛',
  cut_deck: '✂️', gilded_guard: '🛡️', jackpot: '🎰', house_edge: '🎰', call_it: '🗣️', all_in: '💎', insurance: '📜', high_roller: '🎩',
  loaded_dice: '🎲', snake_eyes: '🐍', gilt_snare: '🪤', fortune_wheel: '🎡', double_nothing: '⚖️', royal_flush: '👑', midas_touch: '✋',
  marked_cards: '🂡', house_wins: '🏛️', golden_riposte: '⚜️',
  // v0.4
  cash_out: '💸', snatch: '🫳', glass_edge: '🔪', sleight: '🪄', glint: '✨', fleece: '🧶', glitter_bomb: '🎆',
  two_way_mirror: '🪞', peck: '🐦', shardplate: '🧊', copycat: '🐈', cutpurse: '👝', glass_cannon: '🔭', smash_grab: '🔨',
  kaleidoscope: '🔷', fence: '🏚️', hall_of_mirrors: '🏛️', magpie_eye: '👁️', light_fingers: '🧤', seven_years: '🪞',
  shiny_lure: '💍', grand_heist: '💎', doppelganger: '👥', crow_court: '🐦‍⬛', shatterstorm: '💥', gilded_cage: '🪺',
  kleptomania: '🧲', lure: '🎣', tempo: '🎵', second_thoughts: '💭', hair_trigger: '🔫', chainbreaker: '⛓️‍💥',
  flashpoint: '🎇', cinder_cloak: '🧥', smoulder: '🚬', pyroclasm: '🌋', low_tide: '🏝️', whirlpool: '🌀', undercurrent: '🐟',
  nettle_wall: '🌿', pollen_burst: '🌼', briar_lash: '🥀', ancient_bark: '🌲', last_rites: '📿', grave_robber: '⛏️',
  soul_fracture: '💔', lucky_charm: '🍀', card_counting: '🧮', bankroll: '🏦', gilded_nest: '🪺', mirror_riposte: '🪞',
  ouroboros: '🐍',
  // v0.5
  tombstone: '🪦', gravedig: '🪏', spade_strike: '⛏️', wake: '🕯️', restless_dead: '🧟', shallow_grave: '🕳️', mourning_veil: '🖤',
  epitaph: '📜', bone_rattle: '🦴', cairn: '🗿', toll_of_bones: '🔔', exhumation: '⚱️', danse_macabre: '💃', dead_mans_hand: '🂱',
  gravewalker: '🚶', funeral_march: '🎺', revenant: '👻', unquiet_slumber: '😴', wailing_wall: '🧱', rite_of_passage: '🚪',
  mass_grave: '☠️', long_sleep: '🛌', pallbearer: '⚰️', lazarus: '🌅', last_word: '🤐', charnel_throne: '🪑', requiem_eternal: '🎻',
  slow_fuse: '🧨', confluence: '🌊', harmony: '🎶', clean_slate: '🧽', banked_embers: '🔥', fusion_blast: '💥', still_water: '💧',
  meeting_waters: '🏞️', heartwood_ward: '🌳', crossroads_grove: '🪧', gathering_dark: '🌑', eclipse_rite: '🌘', compound_interest: '📈',
  mixed_hand: '🃏', long_con: '🎩', prismatic_edge: '🌈',
  // enemy traps (by base id)
  spike_shell: '🦔', snap_jaw: '🐊', hex_mirror: '🔮', ambush: '🗡️', counter_glyph: '🔯', smother: '🌫️', mirror_veil: '🎭',
  thorn_snare: '🌵', tripwire: '🧵', bear_trap: '🪤', soul_snare: '👻',
};

const PAL: Record<string, [string, string, string]> = {
  ember: ['#3a0f08', '#c2421a', '#ffb347'],
  tide: ['#061c2b', '#1677a0', '#8ff0ff'],
  thorn: ['#0c2210', '#2f7a33', '#bff08a'],
  void: ['#140a26', '#5b2ea6', '#e2b8ff'],
  gilt: ['#2a1c05', '#a07a1c', '#ffe6a0'],
  glass: ['#0d1a22', '#6f8fa6', '#e8f6ff'],
  grave: ['#101410', '#56644c', '#dfe9cf'],
  neutral: ['#1c1a24', '#5c5870', '#efe6d0'],
  storm: ['#141a2e', '#3f4fa0', '#ffe873'],
  rime: ['#0a1e2a', '#4a9cc0', '#e6fbff'],
  stone: ['#1e1912', '#7a6447', '#e8d4b0'],
  dawn: ['#2a1d10', '#c8903a', '#fff4c9'],
  aether: ['#160f26', '#6a4bb0', '#9ff3e0'],
  beast: ['#1a140a', '#6e5a2a', '#f0d9a0'],
  dusk: ['#0e0b1a', '#3a2c66', '#c9b8ff'],
  curse: ['#120d14', '#3b2c40', '#a08aa8'],
  enemy: ['#2a0b0b', '#7a1f1f', '#ffb0a0'],
};

function motif(f: string, h: number, c: string): string {
  const r = (k: number, m: number) => ((h >>> k) % m);
  switch (f) {
    case 'ember': {
      let s = '';
      for (let i = 0; i < 5; i++) {
        const x = 8 + i * 21 + r(i * 3, 9);
        const ht = 26 + r(i * 2 + 1, 22);
        s += `<path d="M${x - 9} 62 Q${x - 4} ${62 - ht * 0.6} ${x} ${62 - ht} Q${x + 4} ${62 - ht * 0.6} ${x + 9} 62Z" fill="${c}" opacity="${0.18 + (i % 2) * 0.12}"/>`;
      }
      return s + `<circle cx="${20 + r(5, 60)}" cy="${10 + r(7, 12)}" r="2" fill="${c}" opacity=".7"/><circle cx="${30 + r(9, 50)}" cy="${18 + r(11, 10)}" r="1.4" fill="${c}" opacity=".6"/>`;
    }
    case 'tide': {
      let s = '';
      for (let i = 0; i < 4; i++) {
        const y = 22 + i * 11 + r(i, 4);
        const a = 4 + r(i * 2, 4);
        const off = r(i * 3, 20);
        s += `<path d="M-10 ${y} q${12 + off / 4} -${a} 25 0 t25 0 t25 0 t25 0 t25 0" stroke="${c}" stroke-width="${2.5 - i * 0.4}" fill="none" opacity="${0.45 - i * 0.07}"/>`;
      }
      return s;
    }
    case 'thorn': {
      let s = '';
      for (let i = 0; i < 3; i++) {
        const x = 15 + i * 35 + r(i * 4, 10);
        s += `<path d="M${x} 62 C${x - 12} 40 ${x + 14} 30 ${x + r(i, 10) - 5} 6" stroke="${c}" stroke-width="2" fill="none" opacity=".35"/>`;
        for (let j = 0; j < 3; j++) s += `<path d="M${x + (j % 2 ? 4 : -4)} ${48 - j * 13} l${j % 2 ? 6 : -6} -3 l${j % 2 ? -3 : 3} 6Z" fill="${c}" opacity=".35"/>`;
      }
      return s;
    }
    case 'void': {
      const cx = 30 + r(2, 40); const cy = 22 + r(6, 16);
      let s = '';
      for (let i = 1; i <= 4; i++) s += `<circle cx="${cx}" cy="${cy}" r="${i * 9}" stroke="${c}" stroke-width="1" fill="none" opacity="${0.42 - i * 0.08}"/>`;
      for (let i = 0; i < 6; i++) s += `<circle cx="${r(i * 5, 100)}" cy="${r(i * 5 + 2, 60)}" r="${0.6 + (i % 3) * 0.4}" fill="${c}" opacity=".8"/>`;
      return s;
    }
    case 'gilt': {
      // Coins and sunbursts.
      let s = '';
      const cx = 20 + r(1, 60);
      for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; s += `<line x1="${cx}" y1="30" x2="${cx + Math.cos(a) * 60}" y2="${30 + Math.sin(a) * 60}" stroke="${c}" stroke-width="1" opacity=".18"/>`; }
      for (let i = 0; i < 4; i++) { const x = 10 + r(i * 4, 80); const y = 10 + r(i * 4 + 2, 40); s += `<ellipse cx="${x}" cy="${y}" rx="${5 + (i % 2) * 2}" ry="${5 + (i % 2) * 2}" fill="none" stroke="${c}" stroke-width="1.4" opacity=".45"/><text x="${x}" y="${y + 2.5}" text-anchor="middle" font-size="6" fill="${c}" opacity=".5">${i % 2 ? '☾' : '☀'}</text>`; }
      return s;
    }
    case 'glass': {
      // Shattered panes: shards radiating from an impact point, with a glint.
      const cx = 25 + r(2, 50); const cy = 18 + r(6, 24);
      let s = '';
      for (let i = 0; i < 7; i++) {
        const a1 = (i / 7) * Math.PI * 2 + r(i, 10) / 20; const a2 = a1 + 0.5 + r(i * 3, 5) / 20;
        const l1 = 30 + r(i * 2, 30); const l2 = 25 + r(i * 2 + 1, 30);
        s += `<path d="M${cx} ${cy} L${(cx + Math.cos(a1) * l1).toFixed(1)} ${(cy + Math.sin(a1) * l1).toFixed(1)} L${(cx + Math.cos(a2) * l2).toFixed(1)} ${(cy + Math.sin(a2) * l2).toFixed(1)}Z" fill="${c}" opacity="${0.06 + (i % 3) * 0.06}" stroke="${c}" stroke-width=".6" stroke-opacity=".5"/>`;
      }
      const gx = 10 + r(9, 80); const gy = 8 + r(12, 40);
      return s + `<path d="M${gx} ${gy - 5} L${gx + 1.2} ${gy - 1.2} L${gx + 5} ${gy} L${gx + 1.2} ${gy + 1.2} L${gx} ${gy + 5} L${gx - 1.2} ${gy + 1.2} L${gx - 5} ${gy} L${gx - 1.2} ${gy - 1.2}Z" fill="${c}" opacity=".85"/>`;
    }
    case 'grave': {
      // Headstones on a hill, a crescent moon, drifting motes.
      let s = `<path d="M-5 60 Q50 ${40 + r(3, 8)} 105 60Z" fill="${c}" opacity=".12"/>`;
      for (let i = 0; i < 3; i++) {
        const x = 14 + i * 30 + r(i * 3, 10); const h = 12 + r(i * 2 + 1, 8); const y = 52 - (i === 1 ? 4 : 0);
        s += `<path d="M${x - 5} ${y} v-${h} q5 -6 10 0 v${h}Z" fill="${c}" opacity="${0.2 + (i % 2) * 0.1}"/>`;
        if (i === 1) s += `<path d="M${x} ${y - h - 1} v-6 M${x - 3} ${y - h - 4} h6" stroke="${c}" stroke-width="1.2" opacity=".5"/>`;
      }
      const mx = 70 + r(7, 20);
      s += `<path d="M${mx} 8 a7 7 0 1 0 6 11 a5.5 5.5 0 1 1 -6 -11Z" fill="${c}" opacity=".55"/>`;
      for (let i = 0; i < 4; i++) s += `<circle cx="${r(i * 5 + 1, 100)}" cy="${10 + r(i * 5 + 3, 30)}" r=".9" fill="${c}" opacity=".7"/>`;
      return s;
    }
    case 'curse':
      return `<path d="M${20 + r(1, 20)} 0 l8 18 l-10 10 l14 14 l-6 20" stroke="${c}" stroke-width="1.5" fill="none" opacity=".5"/>`;
    case 'storm': {
      // Clouds and a forked bolt.
      let s = '';
      for (let i = 0; i < 3; i++) s += `<ellipse cx="${15 + i * 35 + r(i, 10)}" cy="${8 + r(i * 2, 6)}" rx="${18 + r(i * 3, 8)}" ry="7" fill="${c}" opacity=".12"/>`;
      const x = 30 + r(4, 40);
      s += `<path d="M${x} 6 L${x - 8} 30 L${x + 2} 30 L${x - 6} 58 L${x + 12} 24 L${x + 2} 24 L${x + 10} 6Z" fill="${c}" opacity=".55"/>`;
      return s;
    }
    case 'rime': {
      // Snowflakes.
      let s = '';
      for (let i = 0; i < 5; i++) {
        const cx = 10 + r(i * 4, 80), cy = 8 + r(i * 4 + 2, 44), l = 4 + (i % 3) * 2;
        for (let k = 0; k < 3; k++) { const a = (k / 3) * Math.PI; s += `<line x1="${(cx - Math.cos(a) * l).toFixed(1)}" y1="${(cy - Math.sin(a) * l).toFixed(1)}" x2="${(cx + Math.cos(a) * l).toFixed(1)}" y2="${(cy + Math.sin(a) * l).toFixed(1)}" stroke="${c}" stroke-width="1" opacity=".5"/>`; }
      }
      return s;
    }
    case 'stone': {
      // Layered strata and a boulder.
      let s = '';
      for (let i = 0; i < 4; i++) { const y = 30 + i * 8 + r(i, 4); s += `<path d="M-5 ${y} L${30 + r(i * 2, 20)} ${y - 3} L70 ${y + 2} L105 ${y - 2} V60 H-5Z" fill="${c}" opacity="${0.06 + i * 0.04}"/>`; }
      const bx = 20 + r(6, 60);
      return s + `<path d="M${bx - 10} 30 l6 -10 l10 -2 l7 9 l-3 9 l-14 2Z" fill="${c}" opacity=".35"/>`;
    }
    case 'dawn': {
      // A rising sun with rays.
      let s = '';
      const cx = 30 + r(2, 40);
      for (let i = 0; i < 9; i++) { const a = Math.PI + (i / 8) * Math.PI; s += `<line x1="${cx}" y1="60" x2="${(cx + Math.cos(a) * 70).toFixed(1)}" y2="${(60 + Math.sin(a) * 70).toFixed(1)}" stroke="${c}" stroke-width="2" opacity=".18"/>`; }
      return s + `<circle cx="${cx}" cy="60" r="18" fill="${c}" opacity=".35"/>`;
    }
    case 'aether': {
      // An alchemical circle with a triangle.
      const cx = 30 + r(2, 40), cy = 30;
      return `<circle cx="${cx}" cy="${cy}" r="22" fill="none" stroke="${c}" stroke-width="1.2" opacity=".45"/><circle cx="${cx}" cy="${cy}" r="14" fill="none" stroke="${c}" stroke-width=".8" opacity=".35" stroke-dasharray="2 3"/>`
        + `<path d="M${cx} ${cy - 20} L${cx + 17} ${cy + 10} L${cx - 17} ${cy + 10}Z" fill="none" stroke="${c}" stroke-width="1.2" opacity=".5"/>`;
    }
    case 'beast': {
      // Three claw marks and a paw print.
      let s = '';
      const x = 20 + r(3, 50);
      for (let i = 0; i < 3; i++) s += `<path d="M${x + i * 9} 6 Q${x + i * 9 + 8} 30 ${x + i * 9 + 2} 56" stroke="${c}" stroke-width="3" fill="none" opacity=".35" stroke-linecap="round"/>`;
      const px = 75 + r(7, 15), py = 40;
      return s + `<circle cx="${px}" cy="${py}" r="5" fill="${c}" opacity=".3"/>${[[-6, -7], [0, -9], [6, -7]].map(([dx, dy]) => `<circle cx="${px + dx}" cy="${py + dy}" r="2" fill="${c}" opacity=".3"/>`).join('')}`;
    }
    case 'dusk': {
      // A crescent moon over a starfield.
      let s = '';
      for (let i = 0; i < 9; i++) s += `<circle cx="${r(i * 5, 100)}" cy="${r(i * 5 + 2, 60)}" r="${0.5 + (i % 3) * 0.4}" fill="${c}" opacity=".7"/>`;
      const mx = 20 + r(8, 60);
      return s + `<path d="M${mx} 10 a14 14 0 1 0 12 22 a11 11 0 1 1 -12 -22Z" fill="${c}" opacity=".45"/>`;
    }
    default: {
      const a = r(3, 30) - 15;
      let s = `<g transform="rotate(${a} 50 30)" opacity=".18">`;
      for (let i = -4; i < 10; i++) s += `<rect x="${i * 14}" y="-20" width="5" height="100" fill="${c}"/>`;
      return s + '</g>';
    }
  }
}

// v0.7: generated and signature cards carry their own glyph.
for (const [id, d] of Object.entries(CARDS)) if (d.icon && !ART_ICON[id]) ART_ICON[id] = d.icon;

/** Inline SVG backdrop for a card's art window. */
export function artSvg(id: string): string {
  const d = CARDS[id];
  const f = d?.faction ?? 'neutral';
  const [a, b, c] = PAL[f] ?? PAL.neutral;
  const h = hashStr(id);
  const gx = 20 + (h % 60);
  return `<svg class="artbg" viewBox="0 0 100 60" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><radialGradient id="g${h}" cx="${gx}%" cy="35%" r="85%"><stop offset="0" stop-color="${b}"/><stop offset="1" stop-color="${a}"/></radialGradient></defs>
    <rect width="100" height="60" fill="url(#g${h})"/>${motif(f, h, c)}
  </svg>`;
}

export function artIcon(id: string): string {
  const d = CARDS[id];
  if (ART_ICON[id]) return ART_ICON[id];
  const base = id.replace(/\d+$/, '');
  if (ART_ICON[base]) return ART_ICON[base];
  if (d?.faction === 'enemy') return '🂠';
  return d?.type === 'attack' ? '🗡️' : d?.type === 'reaction' ? '⟲' : '✦';
}

/** Booster pack art (foil wrapper). */
export function packSvg(hue: string, icon: string, name: string): string {
  const h = hashStr(name);
  return `<svg class="packsvg" viewBox="0 0 120 170" aria-hidden="true">
    <defs>
      <linearGradient id="pk${h}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${hue}"/><stop offset=".5" stop-color="#2a2238"/><stop offset="1" stop-color="${hue}"/></linearGradient>
      <linearGradient id="ps${h}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    </defs>
    <path d="M6 10 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 V160 l-6 6 l-6 -6 l-6 6 l-6 -6 l-6 6 l-6 -6 l-6 6 l-6 -6 l-6 6 l-6 -6 l-6 6 l-6 -6 l-6 6 l-6 -6 l-6 6 l-6 -6 l-6 6 l-6 -6Z" fill="url(#pk${h})" stroke="${hue}" stroke-width="1.5"/>
    <rect x="16" y="26" width="88" height="118" rx="8" fill="#14121c" opacity=".55" stroke="${hue}" stroke-opacity=".6"/>
    <circle cx="60" cy="74" r="30" fill="none" stroke="${hue}" stroke-width="2" opacity=".8"/>
    <circle cx="60" cy="74" r="22" fill="none" stroke="${hue}" stroke-width="1" opacity=".5" stroke-dasharray="3 4"/>
    <text x="60" y="86" text-anchor="middle" font-size="32" fill="${hue}">${icon}</text>
    <text x="60" y="128" text-anchor="middle" font-size="11" font-weight="800" fill="#f3ead7" font-family="Alegreya SC, Georgia, serif" letter-spacing="1">${name.toUpperCase()}</text>
    <rect class="packshine" x="-60" y="0" width="50" height="170" fill="url(#ps${h})" transform="skewX(-20)"/>
  </svg>`;
}
