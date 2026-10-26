// v0.11 faction sets: each faction's v0.11 designs, built from its own effects and the conditions that fit
// its play style (Ember reads Burn, Strength and the first card of the turn; Tide reads the chain and your
// hand; Storm reads Charge and Shock...). Every design has at least one gate or one v0.11 effect, so none of
// them is just a bigger or smaller copy of a v0.7 card. Designs are listed in a stable shuffled order with a
// spread of types; buildV11 (cards11.ts) keeps the first ones whose rules text is new, up to a quota.
import type { CardElement, Faction } from '../engine/types';
import type { Design } from './dsl11';
import { h32, NOUN } from './cardgen';

interface SetVocab {
  key: string;
  faction: Faction;
  element?: CardElement;
  /** Secondary effects (scalable or fixed atom ids). */
  secs: string[];
  /** Conditions that fit the faction. */
  conds: string[];
  /** Extra attack/skill primaries beyond damage and Block. */
  prims?: string[];
  /** Gilt: Sun/Moon split cards. */
  coin?: boolean;
  adj: string[];
  icons: string[];
}

const V: SetVocab[] = [
  { key: 'ember', faction: 'ember', secs: ['burn', 'burnAll', 'str1', 'vuln', 'p_burn', 'x2_burn', 'lose3', 'energy1'], conds: ['tb', 'str', 'first', 'combo', 'low', 'hurt', 'ch2'],
    adj: ['Bonfire', 'Brimstone', 'Firebrand', 'Hearth', 'Incandescent', 'Lava', 'Phoenix', 'Pyroclast', 'Scald', 'Sulphur', 'Tinder', 'Volcanic', 'Ignited', 'Blistering', 'Coal', 'Flashpoint'], icons: ['🔥', '🌋', '🧨', '☄️', '💥', '🕯️'] },
  { key: 'tide', faction: 'tide', secs: ['weak', 'weakAll', 'draw1', 'bank1', 'p_weak', 'energy1', 'dhand'], conds: ['tw', 'ch2', 'ch3', 'hand', 'blk', 'first', 'multi'],
    adj: ['Abyssal', 'Billow', 'Breaker', 'Estuary', 'Floodgate', 'Gulf', 'Harbor', 'Kelp', 'Maelstrom', 'Neap', 'Saltwater', 'Shoal', 'Squall', 'Whirlpool', 'Wavecrest', 'Brackish'], icons: ['🌊', '💧', '🐚', '🌀', '⚓', '🫧'] },
  { key: 'thorn', faction: 'thorn', secs: ['thorns', 'heal', 'sprout', 'weak', 'bfoe', 'thornsBig'], conds: ['thr', 'hurt', 'blk', 'multi', 'ch2', 'low'],
    adj: ['Acorn', 'Blackthorn', 'Canopy', 'Dewy', 'Evergreen', 'Gnarled', 'Hedgerow', 'Juniper', 'Lichen', 'Meadow', 'Orchard', 'Pinecone', 'Rosethorn', 'Wildroot', 'Willow', 'Yew'], icons: ['🌿', '🌵', '🌳', '🍃', '🌱', '🍄'] },
  { key: 'void', faction: 'void', secs: ['doom', 'doomAll', 'vuln', 'disrupt1', 'x2_doom', 'p_doom', 'vulnAll'], conds: ['td', 'tv', 'low', 'ch2', 'ch3', 'multi'],
    adj: ['Annihilating', 'Blackhole', 'Chasm', 'Desolate', 'Entropic', 'Forsaken', 'Hungering', 'Lightless', 'Nihil', 'Oblivion', 'Quiet', 'Ruinous', 'Shadowless', 'Unmaking', 'Vacant', 'Wane'], icons: ['🕳️', '🌑', '💀', '👁️', '🔮', '🫥'] },
  { key: 'gilt', faction: 'gilt', secs: ['ante', 'draw1', 'xante', 'weak', 'energy1', 'bank1'], conds: ['ante', 'ch2', 'first', 'sun', 'moon'], coin: true,
    adj: ['Baroque', 'Bullion', 'Casino', 'Coinflip', 'Dealer', 'Emerald', 'Fortunate', 'Gilt-Edged', 'Highroller', 'Ivory', 'Lucre', 'Marked', 'Opulent', 'Raffle', 'Silver', 'Velvet'], icons: ['🪙', '💰', '🎲', '🃏', '🎩', '🎰'] },
  { key: 'glass', faction: 'glass', secs: ['glint', 'steal1', 'draw1', 'glint2', 'dhand', 'vuln'], conds: ['gl', 'stl', 'hand', 'set2', 'ch2', 'first'],
    adj: ['Beveled', 'Cut-Glass', 'Diamond', 'Etched', 'Filched', 'Gem', 'Hourglass', 'Kaleido', 'Leaded', 'Mosaic', 'Opal', 'Pilfered', 'Quartz', 'Stained', 'Tinted', 'Window'], icons: ['🪞', '💎', '🔷', '✨', '🐦‍⬛', '💍'] },
  { key: 'grave', faction: 'grave', secs: ['bury2', 'exhume1', 'heal', 'bury4', 'dcrypt', 'weak'], conds: ['cry', 'exh', 'set2', 'ch2', 'hurt'],
    adj: ['Banshee', 'Catacomb', 'Dirge', 'Elegy', 'Gallows', 'Ghoul', 'Headstone', 'Lantern', 'Marrow', 'Necro', 'Requiem', 'Revenant', 'Shade', 'Skeletal', 'Vigil', 'Wraith'], icons: ['🪦', '⚱️', '🦴', '💀', '⚰️', '🧟'] },
  { key: 'dawn', faction: 'dawn', secs: ['verdict1', 'heal', 'weak', 'draw1', 'verdict2', 'xverdict'], conds: ['vd', 'ctr', 'hurt', 'ch2', 'first', 'blk'],
    adj: ['Anointed', 'Bright', 'Clarion', 'Devout', 'Exalted', 'Faithful', 'Gilded-Sun', 'Hallowed', 'Illumined', 'Just', 'Lucent', 'Merciful', 'Noble', 'Paladin', 'Shining', 'Temple'], icons: ['⚖️', '☀️', '✨', '📜', '🕊️', '🏛️'] },
  { key: 'storm', faction: 'storm', secs: ['shock', 'shockAll', 'charge', 'xcharge', 'p_shock', 'x2_shock', 'energy1'], conds: ['ts', 'cg', 'combo', 'el2', 'ch2', 'first'],
    adj: ['Ampere', 'Blitz', 'Coil', 'Downpour', 'Electric', 'Flash', 'Fulgurite', 'Hailstorm', 'Jolt', 'Monsoon', 'Nimbus', 'Overcharged', 'Plasma', 'Rolling', 'Surge', 'Windshear'], icons: ['⚡', '🌩️', '⛈️', '🌪️', '🔋', '💫'] },
  { key: 'rime', faction: 'rime', secs: ['chill', 'chillAll', 'weak', 'sprout', 'p_chill', 'x2_chill'], conds: ['tc', 'frz', 'blk', 'ch2', 'multi', 'low'],
    adj: ['Avalanche', 'Bitter', 'Cryo', 'Drift', 'Floe', 'Frigid', 'Glacier', 'Ice-Bound', 'Icicle', 'Northern', 'Powder', 'Rimed', 'Shiver', 'Silverfrost', 'Tundra', 'Whiteout'], icons: ['❄️', '🧊', '🌨️', '🏔️', '🥶', '⛄'] },
  { key: 'stone', faction: 'stone', secs: ['tremor', 'tremorAll', 'fortify', 'p_tremor', 'x2_tremor', 'bfoe', 'weak'], conds: ['tt', 'fort', 'blk', 'ch2', 'multi'],
    adj: ['Aftershock', 'Bastion', 'Cairn', 'Dolmen', 'Earthen', 'Fault', 'Geode', 'Hewn', 'Keystone', 'Lodestone', 'Menhir', 'Petrified', 'Rampart', 'Sandstone', 'Shale', 'Terrace'], icons: ['🪨', '⛰️', '🗿', '🧱', '⛏️', '🏛️'] },
  { key: 'aether', faction: 'aether', element: 'prism', secs: ['catalyze', 'draw1', 'vuln', 'vulnAll', 'energy1', 'catalyzeF'], conds: ['el2', 'att', 'tv', 'ch2', 'first'],
    adj: ['Alkahest', 'Azoth', 'Calcined', 'Crucible', 'Effervescent', 'Fixative', 'Gilded-Lead', 'Hermetic', 'Infused', 'Lunar', 'Nigredo', 'Rubedo', 'Saline', 'Sulfuric', 'Tinctured', 'Vitriol'], icons: ['⚗️', '🧪', '🜔', '🜂', '🜄', '🔮'] },
  { key: 'beast', faction: 'beast', secs: ['wolf', 'bear', 'hawk', 'serpent', 'bcomp', 'rally', 'weak'], conds: ['cmp', 'multi', 'low', 'ch2', 'first'],
    adj: ['Alpha', 'Bristled', 'Dappled', 'Ferocious', 'Grizzled', 'Hunting', 'Lupine', 'Mangy', 'Nocturnal', 'Ravening', 'Scaled', 'Spotted', 'Striped', 'Tusked', 'Ursine', 'Wildborn'], icons: ['🐺', '🐻', '🦅', '🐍', '🐾', '🦌'] },
  { key: 'dusk', faction: 'dusk', secs: ['mark', 'markAll', 'veil1', 'doom', 'weak', 'p_mark'], conds: ['tm', 'veil', 'first', 'low', 'ch2', 'hand'],
    adj: ['Assassin', 'Blackout', 'Crow', 'Dim', 'Eventide', 'Faceless', 'Ghostly', 'Inky', 'Lurking', 'Masked', 'Nightfall', 'Obscure', 'Penumbral', 'Raven', 'Sly', 'Unseen'], icons: ['🗡️', '🌑', '🌘', '🎯', '🥷', '🦇'] },
  // Neutral: one small set per element (every class can play the matchup).
  { key: 'n_blaze', faction: 'neutral', element: 'blaze', secs: ['burn', 'p_burn', 'str1'], conds: ['tb', 'first', 'att'], adj: ['Kindle', 'Spitfire', 'Flicker', 'Hotshot'], icons: ['🔥'] },
  { key: 'n_frost', faction: 'neutral', element: 'frost', secs: ['chill', 'p_chill', 'weak'], conds: ['tc', 'blk', 'att'], adj: ['Chilly', 'Iced', 'Coldsnap', 'Frosty'], icons: ['❄️'] },
  { key: 'n_wild', faction: 'neutral', element: 'wild', secs: ['heal', 'thorns', 'sprout'], conds: ['hurt', 'multi', 'att'], adj: ['Wildflower', 'Greenleaf', 'Sprouting', 'Rambling'], icons: ['🌿'] },
  { key: 'n_storm', faction: 'neutral', element: 'storm', secs: ['shock', 'charge', 'p_shock'], conds: ['ts', 'combo', 'att'], adj: ['Zappy', 'Thundering', 'Fizzing', 'Breezy'], icons: ['⚡'] },
  { key: 'n_flood', faction: 'neutral', element: 'flood', secs: ['weak', 'draw1', 'p_weak'], conds: ['tw', 'ch2', 'att'], adj: ['Rainy', 'Drenching', 'Splashing', 'Brooking'], icons: ['🌊'] },
  { key: 'n_stone', faction: 'neutral', element: 'stone', secs: ['tremor', 'fortify', 'p_tremor'], conds: ['tt', 'blk', 'att'], adj: ['Rocky', 'Pebbled', 'Gravel', 'Bouldering'], icons: ['🪨'] },
  { key: 'n_radiant', faction: 'neutral', element: 'radiant', secs: ['heal', 'verdict1', 'weak'], conds: ['hurt', 'first', 'att'], adj: ['Sunny', 'Glowing', 'Dawnlit', 'Golden-Hour'], icons: ['☀️'] },
  { key: 'n_umbral', faction: 'neutral', element: 'umbral', secs: ['doom', 'mark', 'p_mark'], conds: ['td', 'tm', 'att'], adj: ['Shadowy', 'Duskfall', 'Murky', 'Nighted'], icons: ['🌑'] },
];

/** Which effects make a condition always true if they come first in the same card (so the pair is pointless). */
const SATISFIES: Record<string, string[]> = {
  blk: ['block', 'bfoe', 'bcomp'], cg: ['charge'], vd: ['verdict', 'xverdict'], thr: ['thorns'], fort: ['fortify'], cmp: ['companion', 'bcomp'], veil: ['veil'],
  ante: ['ante'], gl: ['glint'], tb: ['burn', 'x2_burn'], tc: ['chill', 'x2_chill'], ts: ['shock', 'x2_shock'], tt: ['tremor', 'x2_tremor'], tw: ['weak'], tv: ['vuln'],
  td: ['doom', 'x2_doom'], tm: ['mark'], str: ['str'], cry: ['bury'], exh: ['exhume'], att: ['catalyze'], stl: ['steal'],
};
// Atom kinds, for the pairing rules (a few ids here; everything else is its own kind).
const KIND: Record<string, string> = {
  dmg: 'dmg', dmg2: 'dmg', dmgAll: 'dmg', dmgRnd: 'dmg', dhand: 'dmg', dset: 'dmg', dcrypt: 'dmg', hit: 'dmg', block: 'block', bfoe: 'block', bcomp: 'block', sprout: 'block',
  burn: 'burn', burnAll: 'burn', weak: 'weak', weakAll: 'weak', doom: 'doom', doomAll: 'doom', shock: 'shock', shockAll: 'shock', chill: 'chill', chillAll: 'chill',
  tremor: 'tremor', tremorAll: 'tremor', mark: 'mark', markAll: 'mark', vuln: 'vuln', vulnAll: 'vuln', draw1: 'draw', draw2: 'draw', glint: 'glint', glint2: 'glint',
  bury2: 'bury', bury4: 'bury', verdict1: 'verdict', verdict2: 'verdict', xverdict: 'verdict', veil1: 'veil', veil2: 'veil', str1: 'str', str2: 'str',
  thorns: 'thorns', thornsBig: 'thorns', wolf: 'companion', bear: 'companion', hawk: 'companion', serpent: 'companion', catalyze: 'catalyze', catalyzeF: 'catalyze',
  steal1: 'steal', exhume1: 'exhume', charge: 'charge', xcharge: 'charge', ante: 'ante', xante: 'ante', energy1: 'energy', bank1: 'energy', disrupt1: 'disrupt',
};
const kindOf = (a: string): string => KIND[a] ?? a;
/** v0.11 effects: a design that uses one of these is new even without a condition. */
const NEW = new Set(['x2_burn', 'x2_doom', 'x2_shock', 'x2_chill', 'x2_tremor', 'xcharge', 'xverdict', 'xante', 'dhand', 'bfoe', 'dset', 'dcrypt', 'bcomp', 'glint2', 'energy1', 'lose3', 'bury4', 'verdict2', 'thornsBig', 'catalyzeF', 'rally']);
const ONE = new Set(['burn', 'weak', 'vuln', 'doom', 'shock', 'chill', 'tremor', 'mark', 'x2_burn', 'x2_doom', 'x2_shock', 'x2_chill', 'x2_tremor', 'xcharge', 'xante', 'dhand', 'dset', 'catalyze', 'dmg', 'dmg2']);
const CARD_ONLY = new Set(['first', 'combo', 'hand']);
/** Effects that never sit behind a condition (a gated drawback or a gated re-attune reads as nonsense). */
const NO_GATE = new Set(['lose3', 'catalyze', 'catalyzeF', 'flip']);
const FIXED_BIG = new Set(['energy1', 'draw1', 'steal1', 'exhume1', 'str1']);

interface Shape { code: string; prim: string | null; all?: boolean }
const SHAPES: Shape[] = [
  { code: 'A1', prim: 'dmg' }, { code: 'A1', prim: 'dmg2' }, { code: 'A2', prim: 'dmgAll', all: true }, { code: 'A2', prim: 'dmg' }, { code: 'A0', prim: 'dmg' },
  { code: 'A1', prim: 'dmgRnd', all: true }, { code: 'A3', prim: 'dmg' }, { code: 'A2', prim: 'dmg2' },
  { code: 'S1', prim: 'block' }, { code: 'S1', prim: null }, { code: 'S0', prim: null }, { code: 'S2', prim: 'block' }, { code: 'S2', prim: null },
  { code: 'Ra1', prim: 'block' }, { code: 'Ra0', prim: null }, { code: 'Rs1', prim: 'block' }, { code: 'Rr1', prim: 'dmg' }, { code: 'Ra1', prim: 'dmg' }, { code: 'Rs0', prim: null }, { code: 'Rr1', prim: null },
  { code: 'Ca1', prim: 'block' }, { code: 'Cr1', prim: 'block' }, { code: 'Ca0', prim: null }, { code: 'Cs1', prim: 'block' }, { code: 'Cx2', prim: null }, { code: 'Cr0', prim: null },
];
const TYPE_OF: Record<string, string> = { A: 'attack', S: 'skill', R: 'reaction', C: 'counter' };

/** Extra name nouns for v0.11 (the v0.7 lists are mostly taken). */
const NOUN11: Record<string, string[]> = {
  attack: ['Feint', 'Flourish', 'Onslaught', 'Sweep', 'Hook', 'Uppercut', 'Spike', 'Gash', 'Pierce', 'Hammer', 'Ram', 'Sunder', ...NOUN.attack],
  skill: ['Mantra', 'Vow', 'Gesture', 'Posture', 'Trance', 'Recital', 'Drill', 'Ritual', 'Tactic', 'Omen', ...NOUN.skill],
  reaction: ['Lure', 'Bait', 'Spring', 'Catch', 'Net', 'Snag', 'Tripline', 'Jaw', 'Clasp', 'Deadfall', ...NOUN.reaction],
  counter: ['Rejoinder', 'Quip', 'Retaliation', 'Return', 'Reversal', 'Deflection', 'Gainsay', 'Veto', 'Rebuttal', 'Comeback', ...NOUN.counter],
};

export interface SetGroup { key: string; faction: Faction; designs: Design[]; name: (type: string, i: number, taken: Set<string>) => string | null }

/** Every faction's candidate designs, in the order they should be tried. */
export function setGroups(): SetGroup[] {
  return V.map((vc) => {
    const out: (Design & { t: string })[] = [];
    const conds = vc.conds;
    const push = (sh: Shape, fx: string[], rarity: string): void => {
      const t = TYPE_OF[sh.code[0]];
      out.push({ name: '', code: `${sh.code}${rarity}`, fx: fx.join(' '), icon: vc.icons[h32(fx.join(' ') + sh.code) % vc.icons.length], faction: vc.faction, element: vc.element, t });
    };
    const ok = (sh: Shape, parts: string[]): boolean => {
      const isCard = sh.code[0] === 'A' || sh.code[0] === 'S';
      const kinds: string[] = [];
      for (const p of parts) {
        const [c, a] = p.includes(':') ? p.split(':') : [null, p];
        // Energy gained on the enemy turn is lost: answers bank it instead.
        if (!isCard && a === 'energy1') return false;
        if (c) {
          if (CARD_ONLY.has(c) && !isCard) return false;
          if ((SATISFIES[c] ?? []).some((k) => kinds.includes(k))) return false;
          if (c === 'cg' && a === 'xcharge') { /* fine: spend what you have */ }
        }
        const k = kindOf(a);
        if (kinds.includes(k)) return false;
        if (sh.all && ONE.has(a) && a !== 'dmg') return false;
        kinds.push(k);
      }
      return true;
    };
    for (const sh of SHAPES) {
      const base = sh.prim ? [sh.prim] : [];
      const hi = sh.code.endsWith('2') || sh.code.endsWith('3');
      for (const s of vc.secs) {
        // (a) a gated second effect (only after a plain first one: a card never does nothing)
        for (const c of conds) {
          if (c === 'sun' || c === 'moon' || !sh.prim || NO_GATE.has(s)) continue;
          const p = [...base, `${c}:${s}`];
          if (!sh.prim && FIXED_BIG.has(s)) continue;
          if (ok(sh, p)) push(sh, p, h32(p.join() + sh.code) % 3 ? 'c' : 'u');
        }
        // (b) a plain second effect plus a gated third (uncommon / rare)
        for (const c of conds) for (const t of vc.secs) {
          if (t === s || c === 'sun' || c === 'moon' || NO_GATE.has(t)) continue;
          if (!sh.prim && s === 'lose3') continue;
          const p = [...base, s, `${c}:${t}`];
          if (ok(sh, p) && h32(p.join() + sh.code) % 4 === 0) push(sh, p, h32(p.join()) % 3 ? 'u' : 'r');
        }
        // (c) a v0.11 effect, ungated
        if (NEW.has(s) && (sh.prim || s !== 'lose3') && ok(sh, [...base, s])) push(sh, [...base, s], 'c');
      }
      // Gilt: Sun and Moon halves, then flip.
      if (vc.coin) for (const s of vc.secs) for (const t of vc.secs) {
        if (s === t) continue;
        const p = [...base, `sun:${s}`, `moon:${t}`, 'flip'];
        if (ok(sh, p.slice(0, 3))) push(sh, p, 'u');
      }
    }
    // Stable shuffle, then interleave types so each faction gets a spread.
    out.sort((a, b) => h32(`${vc.key}|${a.code}|${a.fx}`) - h32(`${vc.key}|${b.code}|${b.fx}`));
    const by: Record<string, Design[]> = {};
    for (const d of out) (by[d.t] ??= []).push(d);
    const order = ['attack', 'skill', 'reaction', 'attack', 'counter', 'skill', 'attack', 'reaction', 'skill', 'counter'];
    const designs: Design[] = [];
    const idx: Record<string, number> = {};
    for (let i = 0; designs.length < out.length && i < out.length * 3; i++) {
      const t = order[i % order.length];
      const j = idx[t] ?? 0;
      if (j < (by[t]?.length ?? 0)) { designs.push(by[t][j]); idx[t] = j + 1; }
    }
    const name = (type: string, i: number, taken: Set<string>): string | null => {
      const nouns = NOUN11[type] ?? NOUN11.skill;
      const h = h32(`${vc.key}:${type}:${i}`);
      for (let k = 0; k < vc.adj.length * nouns.length; k++) {
        const n = `${vc.adj[(h + k) % vc.adj.length]} ${nouns[(Math.floor(h / 7) + k * 5) % nouns.length]}`;
        if (!taken.has(n)) return n;
      }
      return null;
    };
    return { key: vc.key, faction: vc.faction, designs, name };
  });
}
