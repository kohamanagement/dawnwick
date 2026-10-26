// v0.7 Elements. Every card and every enemy has one. Six of them sit on a wheel where each beats
// the next two and is beaten by the two before it (the one opposite is neutral):
//
//   🔥 Blaze → ❄️ Frost → 🌿 Wild → ⚡ Storm → 🌊 Flood → 🪨 Stone → (back to 🔥 Blaze)
//
// so Blaze melts Frost and burns Wild, Frost withers Wild and freezes Storm, Wild weathers Storm and
// drinks Flood, Storm whips Flood and shatters Stone, Flood erodes Stone and douses Blaze, Stone
// smothers Blaze and crushes Frost. ✨ Radiant and 🌑 Umbral stand outside the wheel: neutral to it,
// and each is super effective against the other (so both sides of that fight hit hard).
// Hitting your own element is resisted. Your Attunement (the element of the last elemental card you
// played) is your element when enemies hit you, so what you play also decides what hurts you.
import type { CardDef, CardElement, Element, Faction } from '../engine/types';

export const ELEMENTS = {
  /** Off in the exact v0.1–v0.6 rules tests so their numbers stay true. */
  on: true,
  /** Damage multiplier when the attacker's element beats the target's. */
  strong: 1.3,
  /** Damage multiplier when it is resisted (the target's element beats it, or they match). */
  weak: 0.75,
};

export interface ElementDef {
  id: Element;
  name: string;
  icon: string;
  color: string;
  /** What Resonance (3 cards of this element in one turn) does. */
  resonance: string;
  blurb: string;
}

export const WHEEL: Element[] = ['blaze', 'frost', 'wild', 'storm', 'flood', 'stone'];

export const ELEMENT_LIST: ElementDef[] = [
  { id: 'blaze', name: 'Blaze', icon: '🔥', color: '#ff7a3d', resonance: 'Apply 3 Burn to ALL enemies.', blurb: 'Melts Frost, burns Wild. Doused by Flood, smothered by Stone.' },
  { id: 'frost', name: 'Frost', icon: '❄️', color: '#9fe2ff', resonance: 'Apply 3 Chill to ALL enemies.', blurb: 'Withers Wild, freezes Storm. Melted by Blaze, crushed by Stone.' },
  { id: 'wild', name: 'Wild', icon: '🌿', color: '#7fd16a', resonance: 'Heal 3 and gain 2 Barbs.', blurb: 'Weathers Storm, drinks Flood. Burned by Blaze, withered by Frost.' },
  { id: 'storm', name: 'Storm', icon: '⚡', color: '#ffe066', resonance: 'Apply 3 Shock to ALL enemies and gain 1 Charge.', blurb: 'Whips Flood, shatters Stone. Frozen by Frost, weathered by Wild.' },
  { id: 'flood', name: 'Flood', icon: '🌊', color: '#4fb3ff', resonance: 'Draw 2 cards.', blurb: 'Erodes Stone, douses Blaze. Drunk by Wild, whipped by Storm.' },
  { id: 'stone', name: 'Stone', icon: '🪨', color: '#c9a77a', resonance: 'Gain 8 Guard.', blurb: 'Smothers Blaze, crushes Frost. Eroded by Flood, shattered by Storm.' },
  { id: 'radiant', name: 'Radiant', icon: '✨', color: '#fff3b0', resonance: 'Heal 4 and gain 1 Verdict.', blurb: 'Outside the wheel. Super effective against Umbral, and Umbral against it.' },
  { id: 'umbral', name: 'Umbral', icon: '🌑', color: '#b48cff', resonance: 'Apply 7 Doom to ALL enemies.', blurb: 'Outside the wheel. Super effective against Radiant, and Radiant against it.' },
];
export const ELEMENT_MAP: Record<string, ElementDef> = Object.fromEntries(ELEMENT_LIST.map((e) => [e.id, e]));

/** Does `a` beat `b`? */
export function beats(a: Element, b: Element): boolean {
  if ((a === 'radiant' && b === 'umbral') || (a === 'umbral' && b === 'radiant')) return true;
  const i = WHEEL.indexOf(a), j = WHEEL.indexOf(b);
  if (i < 0 || j < 0) return false;
  const d = (j - i + 6) % 6;
  return d === 1 || d === 2;
}

/** 1 (neutral), ELEMENTS.strong or ELEMENTS.weak. */
export function elemMult(atk: Element | null | undefined, def: Element | null | undefined): number {
  if (!ELEMENTS.on || !atk || !def) return 1;
  if (beats(atk, def)) return ELEMENTS.strong;
  if (atk === def || beats(def, atk)) return ELEMENTS.weak;
  return 1;
}

/** What an element is strong against / weak to (for tooltips). */
export function matchups(e: Element): { strong: Element[]; weak: Element[] } {
  const all = ELEMENT_LIST.map((x) => x.id);
  return { strong: all.filter((x) => beats(e, x)), weak: all.filter((x) => beats(x, e)) };
}

export const FACTION_ELEMENT: Partial<Record<Faction, CardElement>> = {
  ember: 'blaze', tide: 'flood', thorn: 'wild', void: 'umbral', gilt: 'radiant', glass: 'frost', grave: 'stone',
  storm: 'storm', rime: 'frost', stone: 'stone', dawn: 'radiant', aether: 'prism', beast: 'wild', dusk: 'umbral',
  neutral: 'none', curse: 'none', enemy: 'none',
};

/** A card's printed element ('prism' = whatever your Attunement is). */
export function printedElement(d: CardDef): CardElement {
  return d.element ?? FACTION_ELEMENT[d.faction] ?? 'none';
}

/** A card's element as it resolves now. */
export function liveElement(d: CardDef, attune: Element | null | undefined): Element | null {
  const e = printedElement(d);
  if (e === 'none') return null;
  if (e === 'prism') return attune ?? null;
  return e;
}

// Enemy Aspects. Anything not listed falls back to a stable pick from the wheel.
const ASPECT: Record<string, Element | null> = {
  cinder_rat: 'blaze', bramble_beetle: 'wild', gloom_moth: 'umbral', hex_acolyte: 'umbral', rust_knight: 'stone', bog_lurker: 'flood',
  gatekeeper: 'stone', blade_left: 'storm', blade_right: 'frost', trapmaster: 'storm', lantern_warden: 'radiant', tide_wraith: 'flood',
  iron_hound: 'stone', ash_cultist: 'blaze', mirror_imp: 'frost', thorn_golem: 'wild', spore_mother: 'wild', echo_duelist: null,
  chorus_knight: 'radiant', seal_warden: 'stone', chorus_of_knives: 'storm', phase_stalker: 'umbral', abyss_eye: 'umbral', bone_choir: 'umbral',
  iron_colossus: 'stone', void_mage: 'umbral', echo_champion: null, grand_sentinel: 'radiant', last_dealer: 'radiant', pickpocket_rat: 'wild',
  eel_merchant: 'storm', jar_mimic: 'stone', drowned_bell: 'flood', auctioneer: 'radiant', tide_broker: 'flood', masked_dancer: 'umbral',
  porcelain_doll: 'frost', jester: 'storm', velvet_knife: 'umbral', mask_sun: 'radiant', mask_moon: 'umbral', impresario: 'radiant',
  gear_sentry: 'stone', hour_wraith: 'frost', brass_scorpion: 'blaze', paradox_moth: 'storm', clock_knight: 'stone', clockmaker: 'storm',
  magpie_thief: 'frost', lattice_spider: 'frost', wick_imp: 'blaze', broomling: 'wild', hedge_witch: 'wild', briarling: 'wild',
  briar_queen: 'wild', chain_warden: 'stone', trapper: 'wild', leech: 'umbral', executioner: 'stone', magpie_king: 'radiant',
  null_seraph: 'radiant', rift_caller: 'storm', rift_spawn: 'storm', mirror_knight: 'frost', orrery: 'radiant', ink_imp: 'umbral',
  bell_ringer: 'storm', gravemoss: 'wild', bell_tyrant: 'storm', inkwitch: 'umbral', debt_collector: 'stone', gravecaller: 'umbral',
  skeleton: 'stone', blotted_saint: 'radiant', lich_archivist: 'frost', bone_bishop: 'umbral', gravelord: 'umbral', reflection: null,
  echo_rival: null, briar_fox: 'wild', grey_wolf: 'frost', mossback: 'stone', hollow_owl: 'storm', will_o_wisp: 'radiant',
  bramble_boar: 'wild', bee_swarm: 'wild', alpha_wolf: 'frost', old_oak: 'wild', cursed_bear: 'umbral', antlered_king: 'wild',
  gull_flock: 'storm', shore_crab: 'flood', drowned_sailor: 'flood', siren: 'flood', cannoneer: 'blaze', wrecker: 'storm',
  lantern_jelly: 'storm', deckhand: 'flood', pirate_captain: 'flood', sea_hag: 'frost', kraken_arm: 'flood', leviathan: 'flood',
  salamander: 'blaze', slag_golem: 'stone', forge_imp: 'blaze', cinder_wyrm: 'blaze', obsidian_knight: 'stone', magma_ooze: 'blaze',
  ember_blob: 'blaze', bellows_spirit: 'storm', ironmonger: 'stone', ash_phoenix: 'blaze', forgemother: 'blaze', card_goblin: 'storm',
  mudling: 'stone', scarecrow: 'wild', chest_mimic: 'stone', rat_king: 'umbral', shadow_duelist: 'umbral', puppeteer: 'umbral',
  marionette: 'wild', star_eater: 'umbral', chain_devil: 'blaze', void_jelly: 'umbral', frost_wraith: 'frost', bridge_troll: 'stone',
  gilded_hare: 'radiant', treasure_crab: 'flood', wishing_star: 'radiant', phantom: 'umbral', night_mare: 'umbral', dawn_eater: 'umbral',
};

/** The element that beats `e` (and so also resists it): the one just before it on the wheel. */
export function beaterOf(e: Element | null | undefined): Element | null {
  if (!e) return null;
  if (e === 'radiant') return 'umbral';
  if (e === 'umbral') return 'radiant';
  return WHEEL[(WHEEL.indexOf(e) + 5) % 6];
}

export function setAspect(id: string, e: Element | null): void { ASPECT[id] = e; }

/** An enemy's Aspect. Echoes and the Reflection have none (they hit with their cards' elements, or yours). */
export function aspectOf(def: string): Element | null {
  if (def in ASPECT) return ASPECT[def];
  let h = 0;
  for (let i = 0; i < def.length; i++) h = (h * 31 + def.charCodeAt(i)) >>> 0;
  return WHEEL[h % WHEEL.length];
}

export const elemIcon = (e: Element | CardElement | null | undefined): string =>
  !e || e === 'none' ? '' : e === 'prism' ? '🔮' : ELEMENT_MAP[e]?.icon ?? '';
export const elemName = (e: Element | CardElement | null | undefined): string =>
  !e || e === 'none' ? 'None' : e === 'prism' ? 'Prism' : ELEMENT_MAP[e]?.name ?? e;
