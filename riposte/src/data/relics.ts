import type { Combat } from '../engine/combat';
import type { CardInst, CharId, RunState } from '../engine/types';
import { CARDS } from './cards';
import { beaterOf } from './elements';
import type { Rng } from '../engine/rng';

export type RelicRarity = 'starter' | 'common' | 'uncommon' | 'rare' | 'boss' | 'shop' | 'blessing';

export interface RelicDef {
  id: string;
  name: string;
  icon: string;
  rarity: RelicRarity;
  text: string;
  unlock?: number;
  /** Achievement that unlocks this relic (it only appears once earned). */
  ach?: string;
  mods?: Partial<Record<'slots' | 'fluxCap' | 'energy' | 'draw' | 'drawFirst' | 'dmgOut' | 'goldPct' | 'shopPct', number>>;
  onPickup?: (run: RunState, rng: Rng) => void;
  afterCombat?: (run: RunState) => void;
  combatStart?: (cb: Combat) => void;
  turnStart?: (cb: Combat) => void;
  cardPlayed?: (cb: Combat, card: CardInst) => void;
  chain?: (cb: Combat, len: number) => void;
  trapSet?: (cb: Combat) => void;
  sacrifice?: (cb: Combat) => void;
  reactionLeft?: (cb: Combat) => void;
  enemyTrap?: (cb: Combat) => void;
  negate?: (cb: Combat) => void;
  enemyDied?: (cb: Combat) => void;
  /** v0.4 */
  steal?: (cb: Combat) => void;
  reactionFired?: (cb: Combat) => void;
  /** v0.5 */
  buried?: (cb: Combat) => void;
  exhumed?: (cb: Combat) => void;
  /** v0.7 */
  counter?: (cb: Combat) => void;
  freeze?: (cb: Combat) => void;
  resonance?: (cb: Combat, el: string) => void;
  /** Only offered to this character. */
  char?: CharId;
}

const R: RelicDef[] = [
  // Starters
  { id: 'duelists_fan', name: "Duelist's Fan", icon: '🪭', rarity: 'starter',
    text: 'The first chain of 2+ links each turn draws you 1 card. The first one each combat also gives 1 energy.',
    chain: (cb) => {
      const k = `fan${cb.s.turn}`;
      if (!cb.s.once[k]) { cb.s.once[k] = 1; cb.drawCards(1); }
      if (!cb.s.once.fan) { cb.s.once.fan = 1; cb.s.energy += 1; }
    } },
  { id: 'root_heart', name: 'Root Heart', icon: '🌳', rarity: 'starter', text: 'Start each combat with 2 Barbs.',
    combatStart: (cb) => { cb.s.player.st.thorns = (cb.s.player.st.thorns ?? 0) + 2; } },
  { id: 'hollow_crown', name: 'Hollow Crown', icon: '🜲', rarity: 'starter',
    text: 'Whenever one of your set Reactions leaves play (fires or is Sacrificed), apply 6 Doom to ALL enemies.',
    reactionLeft: (cb) => { for (const e of cb.alive()) cb.applyStatus(cb.s.player, e, 'doom', 6); } },
  { id: 'loaded_coin', name: 'Loaded Coin', icon: '🪙', rarity: 'starter', text: 'Whenever your Fate Coin flips, raise your Ante by 1. Start each combat with 3 Ante.',
    combatStart: (cb) => cb.raiseAnte(cb.s.player, 3) },

  // v0.7 starters
  { id: 'scales_of_dawn', name: 'Scales of Dawn', icon: '⚖️', rarity: 'starter', text: 'Your first Counter each turn costs 0. Start each combat with 1 Verdict.',
    combatStart: (cb) => cb.applyStatus(cb.s.player, cb.s.player, 'verdict', 1) },
  { id: 'storm_bottle', name: 'Storm in a Bottle', icon: '🫙', rarity: 'starter', text: 'Start each combat with 4 Charge. Whenever you spend 5 or more Charge at once, draw 2 cards.',
    combatStart: (cb) => cb.applyStatus(cb.s.player, cb.s.player, 'charge', 4) },
  { id: 'rime_heart', name: 'Rime Heart', icon: '💠', rarity: 'starter', text: 'At the start of each combat, apply 3 Chill to ALL enemies. Frozen enemies take 50% more damage from you.',
    combatStart: (cb) => { for (const e of cb.alive()) cb.applyStatus(cb.s.player, e, 'chill', 3); } },
  { id: 'bone_whistle', name: 'Bone Whistle', icon: '🦴', rarity: 'starter', text: 'Start each combat with Wolf 2.',
    combatStart: (cb) => cb.applyStatus(cb.s.player, cb.s.player, 'wolf', 2) },
  { id: 'lodestone', name: 'Lodestone', icon: '🧲', rarity: 'starter', text: 'Start each combat with 4 Fortify and 4 Guard.',
    combatStart: (cb) => { cb.applyStatus(cb.s.player, cb.s.player, 'fortify', 4); cb.gainBlock(cb.s.player, 4); } },
  { id: 'philosophers_flask', name: "Philosopher's Flask", icon: '⚗️', rarity: 'starter', text: 'Resonance happens after 2 cards of an element instead of 3.' },
  { id: 'smoke_cowl', name: 'Smoke Cowl', icon: '🥷', rarity: 'starter', text: 'At the start of each combat, apply 1 Mark to ALL enemies.',
    combatStart: (cb) => { for (const e of cb.alive()) cb.applyStatus(cb.s.player, e, 'mark', 1); } },
  // v0.7 relics anyone can find
  { id: 'retort_quill', name: 'Retort Quill', icon: '🪶', rarity: 'common', text: 'Whenever you play a Counter, draw 1 card.', counter: (cb) => cb.drawCards(1) },
  { id: 'storm_jar', name: 'Storm Jar', icon: '🫙', rarity: 'common', text: 'Start each combat with 3 Charge.',
    combatStart: (cb) => cb.applyStatus(cb.s.player, cb.s.player, 'charge', 3) },
  { id: 'seismograph', name: 'Seismograph', icon: '📈', rarity: 'common', text: 'Start each combat with 3 Fortify.',
    combatStart: (cb) => cb.applyStatus(cb.s.player, cb.s.player, 'fortify', 3) },
  { id: 'whetted_mark', name: 'Hunter\'s Chalk', icon: '🖍️', rarity: 'common', text: 'At the start of each combat, apply 1 Mark to ALL enemies.',
    combatStart: (cb) => { for (const e of cb.alive()) cb.applyStatus(cb.s.player, e, 'mark', 1); } },
  { id: 'beast_tooth', name: 'Beast Tooth', icon: '🦷', rarity: 'common', text: 'Start each combat with Bear 2.',
    combatStart: (cb) => cb.applyStatus(cb.s.player, cb.s.player, 'bear', 2) },
  { id: 'elemental_compass', name: 'Elemental Compass', icon: '🧭', rarity: 'uncommon', text: 'At the start of each combat, attune to the element that beats the first enemy.',
    combatStart: (cb) => { const e = cb.alive()[0]; if (e) cb.attuneTo(beaterOf(cb.aspect(e))); } },
  { id: 'resonant_bell', name: 'Resonant Bell', icon: '🔔', rarity: 'uncommon', text: 'Whenever Resonance happens, gain 1 energy.', resonance: (cb) => { cb.s.energy += 1; } },
  { id: 'smoke_pellet', name: 'Smoke Pellet', icon: '💨', rarity: 'uncommon', text: 'Start each combat with 1 Veil.',
    combatStart: (cb) => cb.applyStatus(cb.s.player, cb.s.player, 'veil', 1) },
  { id: 'frost_brooch', name: 'Frost Brooch', icon: '❄️', rarity: 'uncommon', text: 'Whenever an enemy Freezes, gain 1 energy.', freeze: (cb) => { cb.s.energy += 1; } },
  { id: 'hair_trigger_glove', name: 'Quickdraw Glove', icon: '🧤', rarity: 'rare', text: 'Your Counters cost 1 less.',
    combatStart: (cb) => cb.applyStatus(cb.s.player, cb.s.player, 'quickdraw', 1) },
  { id: 'prism_crown', name: 'Prism Crown', icon: '👑', rarity: 'rare', text: 'Resonance happens after 2 cards of an element instead of 3.',
    combatStart: (cb) => cb.applyStatus(cb.s.player, cb.s.player, 'catalyst', 1) },
  { id: 'gavel', name: 'Silver Gavel', icon: '🔨', rarity: 'rare', text: 'Whenever you play a Counter, deal 5 damage to the enemy it answers.',
    combatStart: (cb) => cb.applyStatus(cb.s.player, cb.s.player, 'riposte', 5) },

  // Common
  { id: 'iron_buckle', name: 'Iron Buckle', icon: '🔰', rarity: 'common', text: 'Start each combat with 8 Guard.',
    combatStart: (cb) => cb.gainBlock(cb.s.player, 8) },
  { id: 'whetstone', name: 'Whetstone', icon: '🪨', rarity: 'common', text: 'Start each combat with 1 Edge.',
    combatStart: (cb) => { cb.s.player.st.str = (cb.s.player.st.str ?? 0) + 1; } },
  { id: 'tide_glass', name: 'Tide Glass', icon: '⏳', rarity: 'common', text: 'You can bank 1 more unspent energy as Flux.', mods: { fluxCap: 1 } },
  { id: 'lucky_coin', name: 'Lucky Coin', icon: '🪙', rarity: 'common', text: 'Gain 25% more gold from combats.', mods: { goldPct: 25 } },
  { id: 'ember_jar', name: 'Ember Jar', icon: '🏺', rarity: 'common', text: 'At the start of each combat, apply 3 Burn to ALL enemies.',
    combatStart: (cb) => { for (const e of cb.alive()) cb.applyStatus(cb.s.player, e, 'burn', 3); } },
  { id: 'bloodstone', name: 'Bloodstone', icon: '🩸', rarity: 'common', text: 'Heal 5 HP after each combat.',
    afterCombat: (run) => { run.hp = Math.min(run.maxHp, run.hp + 5); } },
  { id: 'prep_pouch', name: 'Prep Pouch', icon: '👝', rarity: 'common', text: 'Draw 2 extra cards on your first turn.', mods: { drawFirst: 2 } },
  { id: 'trap_lens', name: 'Trap Lens', icon: '🔎', rarity: 'common', text: 'At the start of each combat, destroy one enemy trap. Enemy traps are shown face-up.',
    combatStart: (cb) => { for (const e of cb.alive()) if (e.traps.length) { e.traps.shift(); cb.emit({ t: 'text', who: cb.whoKey(e), s: 'Disrupted!' }); return; } } },

  // Uncommon
  { id: 'spare_slot', name: 'Spare Slot', icon: '🎴', rarity: 'uncommon', text: 'You have 1 more Reaction slot.', mods: { slots: 1 } },
  { id: 'mirror_shard', name: 'Mirror Shard', icon: '🪞', rarity: 'uncommon', text: 'Whenever an enemy trap fires, gain 4 Guard.',
    enemyTrap: (cb) => cb.gainBlock(cb.s.player, 4) },
  { id: 'linked_ring', name: 'Linked Ring', icon: '⛓️', rarity: 'uncommon', text: 'Whenever a chain of 3+ links resolves, draw 1 card.',
    chain: (cb, len) => { if (len >= 3) cb.drawCards(1); } },
  { id: 'war_drum', name: 'War Drum', icon: '🥁', rarity: 'uncommon', text: 'The 4th card you play each turn refunds 1 energy.',
    cardPlayed: (cb) => { if (cb.s.cardsThisTurn === 4) cb.s.energy += 1; } },
  { id: 'spiked_bracer', name: 'Spiked Bracer', icon: '🦾', rarity: 'uncommon', text: 'Whenever you set a Reaction, gain 3 Guard.',
    trapSet: (cb) => cb.gainBlock(cb.s.player, 3) },
  { id: 'cracked_lens', name: 'Cracked Lens', icon: '🧿', rarity: 'uncommon', text: 'Exposed enemies take 65% more damage instead of 40%.' },
  { id: 'grave_bell', name: 'Grave Bell', icon: '🔔', rarity: 'uncommon', text: 'Whenever an enemy dies, gain 1 energy.', unlock: 2,
    enemyDied: (cb) => { if (cb.s.phase === 'player') cb.s.energy += 1; } },

  // v0.3
  { id: 'tarot_pouch', name: 'Tarot Pouch', icon: '🎴', rarity: 'common', text: 'You can hold 1 more Omen. On pickup, gain a random Omen.',
    onPickup: (run, rng) => { run.omens ??= []; run.omens.push(rng.pick(['fool', 'hermit', 'star', 'moon', 'magician'])); } },
  { id: 'fortune_cookie', name: 'Fortune Cookie', icon: '🥠', rarity: 'common', text: 'Every 3rd combat you win drops an Omen.',
    afterCombat: (run) => {
      run.relicCounters.fortune_cookie = (run.relicCounters.fortune_cookie ?? 0) + 1;
      if (run.relicCounters.fortune_cookie % 3 === 0) { run.omens ??= []; if (run.omens.length < 3) run.omens.push(['fool', 'chariot', 'tower', 'star'][(run.floor + run.seed) % 4]); }
    } },
  { id: 'maneki_cat', name: 'Maneki Cat', icon: '🐈', rarity: 'uncommon', text: 'Gain 10 more gold from every combat. Mrrp.',
    afterCombat: (run) => { run.gold += 10; run.stats.goldEarned += 10; } },
  { id: 'metronome', name: 'Metronome', icon: '🎼', rarity: 'uncommon', text: 'Every 3rd chain you resolve in a combat gives 1 energy.',
    chain: (cb) => { if (cb.s.stats.chains % 3 === 0) cb.s.energy += 1; } },
  { id: 'hourglass', name: 'Hourglass', icon: '⌛', rarity: 'uncommon', text: 'At the start of your 3rd turn each combat, gain 2 energy and draw 2 cards.',
    turnStart: (cb) => { if (cb.s.turn === 3) { cb.s.energy += 2; cb.drawCards(2); } } },
  { id: 'masquerade_mask', name: 'Masquerade Mask', icon: '🎭', rarity: 'rare', text: 'The first Reaction you set each turn costs 0.' },

  // Rare
  { id: 'phoenix_feather', name: 'Phoenix Feather', icon: '🪶', rarity: 'rare', text: 'Once per run, when you would die, heal to 30% HP instead.' },
  { id: 'counterweight', name: 'Counterweight', icon: '⚖️', rarity: 'rare', text: 'Whenever you Negate something, bank 2 energy for next turn.',
    negate: (cb) => { cb.s.flux += 2; } },
  { id: 'sharpened_edge', name: 'Sharpened Edge', icon: '🗡️', rarity: 'rare', text: 'Your attacks and cards deal 2 more damage.', mods: { dmgOut: 2 }, unlock: 3 },
  { id: 'chain_crown', name: 'Chain Crown', icon: '💠', rarity: 'rare', text: 'Whenever a chain of 3+ links resolves, gain 1 energy.', unlock: 6,
    chain: (cb, len) => { if (len >= 3) cb.s.energy += 1; } },

  // Achievement relics
  { id: 'chain_gauntlet', name: 'Chain Gauntlet', icon: '🧤', rarity: 'uncommon', ach: 'chain5',
    text: 'Whenever a chain of 2+ links resolves, gain 3 Guard.', chain: (cb) => cb.gainBlock(cb.s.player, 3) },
  { id: 'kings_reserve', name: "King's Reserve", icon: '🫅', rarity: 'rare', ach: 'win1',
    text: 'Start each combat with 1 extra energy.', combatStart: (cb) => { cb.s.flux += 1; } },
  { id: 'trophy_belt', name: 'Trophy Belt', icon: '🥇', rarity: 'uncommon', ach: 'champ3',
    text: 'Whenever a rival or boss dies, heal 8 HP.', enemyDied: (cb) => { if (cb.s.kind !== 'normal') cb.heal(cb.s.player, 8); } },
  { id: 'merchant_seal', name: "Merchant's Seal", icon: '📜', rarity: 'shop', ach: 'rich',
    text: 'Shop prices are 15% lower and you gain 15% more gold.', mods: { shopPct: -15, goldPct: 15 } },

  // Shop
  { id: 'golden_ledger', name: 'Golden Ledger', icon: '📒', rarity: 'shop', text: 'Shop prices are 25% lower.', mods: { shopPct: -25 } },
  { id: 'deck_box', name: 'Deck Box', icon: '🗃️', rarity: 'shop', text: 'On pickup, upgrade 2 random cards.',
    onPickup: (run, rng) => {
      const ups = run.deck.filter((c) => !c.up && CARDS[c.id].type !== 'curse');
      for (let i = 0; i < 2 && ups.length; i++) ups.splice(rng.int(0, ups.length - 1), 1)[0].up = true;
    } },

  // ── v0.4 ──
  { id: 'magpie_nest', name: "Magpie's Nest", icon: '🪺', rarity: 'starter',
    text: 'At the start of each combat, Steal 1. If there was nothing to steal, add 2 Glints to your hand.',
    combatStart: (cb) => { if (cb.steal(cb.s.player, 1) === 0) { cb.addCard('glint', 'hand', false); cb.addCard('glint', 'hand', false); } } },
  { id: 'shiny_button', name: 'Shiny Button', icon: '🔘', rarity: 'common', text: 'Start each combat with a Glint in your hand.',
    combatStart: (cb) => cb.addCard('glint', 'hand', false) },
  { id: 'bait_bucket', name: 'Bait Bucket', icon: '🪣', rarity: 'common', text: 'The first time an enemy trap fires on your turn, draw 1 card.',
    enemyTrap: (cb) => { const k = `bait${cb.s.turn}`; if (cb.s.phase === 'player' && !cb.s.once[k]) { cb.s.once[k] = 1; cb.drawCards(1); } } },
  { id: 'horseshoe', name: 'Horseshoe', icon: '🧲', rarity: 'common', text: 'Start each combat with 4 Guard for each Reaction slot you have.',
    combatStart: (cb) => cb.gainBlock(cb.s.player, 4 * cb.s.player.slots) },
  { id: 'thimble', name: 'Silver Thimble', icon: '🪡', rarity: 'common', text: 'The first time you would lose HP in each combat, lose only 1.' },
  { id: 'echo_chamber', name: 'Echo Chamber', icon: '🔊', rarity: 'uncommon', text: 'Whenever a chain of 4+ links resolves, gain 1 Edge.',
    chain: (cb, len) => { if (len >= 4) cb.applyStatus(cb.s.player, cb.s.player, 'str', 1); } },
  { id: 'coiled_spring', name: 'Coiled Spring', icon: '🌀', rarity: 'uncommon', text: 'Whenever one of your Reactions fires, deal 3 damage to a random enemy.',
    reactionFired: (cb) => cb.coil(3) },
  { id: 'debt_ledger', name: 'Debt Ledger', icon: '📕', rarity: 'uncommon', text: 'Whenever you Steal a trap, gain 4 Guard.',
    steal: (cb) => cb.gainBlock(cb.s.player, 4) },
  { id: 'prism_lens', name: 'Prism Lens', icon: '🔷', rarity: 'uncommon', text: 'Your Glints deal 3 more damage. Start each combat with a Glint in your hand.',
    combatStart: (cb) => cb.addCard('glint', 'hand', false) },
  { id: 'ouroboros_ring', name: 'Ouroboros Ring', icon: '💍', rarity: 'rare', text: 'Chains can have 1 more link (7). Whenever a chain of 6+ links resolves, heal 5 HP.',
    chain: (cb, len) => { if (len >= 6) cb.heal(cb.s.player, 5); } },
  { id: 'lantern_truth', name: 'Lantern of Truth', icon: '🔦', rarity: 'rare', text: 'Enemy traps are shown face-up. Whenever you Negate something, deal 5 damage to ALL enemies.',
    negate: (cb) => { for (const e of cb.alive()) cb.hit(cb.s.player, e, 5, false); } },
  { id: 'membership_card', name: 'Membership Card', icon: '💳', rarity: 'shop', text: 'Shops offer 1 more card, and removing a card costs 25% less.' },
  { id: 'nest_egg', name: 'Nest Egg', icon: '🥚', rarity: 'uncommon', ach: 'steal25', text: 'Whenever you Steal a trap, gain 5 gold.',
    steal: (cb) => { cb.run.gold += 5; cb.run.stats.goldEarned += 5; } },
  { id: 'crown_thorns', name: 'Crown of Thorns', icon: '🌹', rarity: 'boss', text: '+1 energy each turn. Enemies start each combat with 3 Barbs.', mods: { energy: 1 },
    combatStart: (cb) => { for (const e of cb.alive()) cb.applyStatus(e, e, 'thorns', 3); } },
  { id: 'cracked_hourglass', name: 'Cracked Hourglass', icon: '⏳', rarity: 'boss', text: '+1 energy each turn. Your Reactions cost 1 more.', mods: { energy: 1 } },

  // Boss (big power, real downside)
  { id: 'ember_heart', name: 'Ember Heart', icon: '❤️‍🔥', rarity: 'boss', text: '+1 energy each turn. You can no longer bank Flux.', mods: { energy: 1 } },
  { id: 'void_engine', name: 'Void Engine', icon: '⚙️', rarity: 'boss', text: '+1 energy each turn. On pickup, add 2 Wounds to your deck.', mods: { energy: 1 },
    onPickup: (run) => { for (let i = 0; i < 2; i++) run.deck.push({ uid: run.nextUid++, id: 'wound', up: false }); } },
  { id: 'tide_crown', name: 'Tide Crown', icon: '🌊', rarity: 'boss', text: 'Draw 1 extra card each turn. On pickup, lose 8 Max HP.', mods: { draw: 1 },
    onPickup: (run) => { run.maxHp -= 8; run.hp = Math.min(run.hp, run.maxHp); } },
  { id: 'pocket_watch', name: 'Pocket Watch', icon: '🕰️', rarity: 'boss', text: '+1 energy each turn. Draw 1 fewer card on your first 2 turns of each combat.', mods: { energy: 1 } },
  { id: 'grand_stage', name: 'Grand Stage', icon: '🎪', rarity: 'boss', text: '+1 Reaction slot and bank 1 more Flux. Start each combat with 1 Exposed.',
    mods: { slots: 1, fluxCap: 1 }, combatStart: (cb) => { cb.s.player.st.vuln = (cb.s.player.st.vuln ?? 0) + 1; } },

  // ── v0.5 ──
  { id: 'gravediggers_spade', name: "Gravedigger's Spade", icon: '🪏', rarity: 'starter',
    text: 'Your Reactions go to your Crypt when they leave play, not the discard pile. At the start of your 2nd turn and every 2nd turn after, Exhume 1.',
    combatStart: (cb) => { cb.s.player.st.grave = 1; },
    turnStart: (cb) => { if (cb.s.turn % 2 === 0) cb.exhume(1); } },
  { id: 'funeral_bell', name: 'Funeral Bell', icon: '🔔', rarity: 'common', char: 'sexton', text: 'Whenever a card enters your Crypt, deal 2 damage to a random enemy.',
    buried: (cb) => cb.coil(2) },
  { id: 'grave_gloves', name: "Gravedigger's Gloves", icon: '🧤', rarity: 'uncommon', char: 'sexton', ach: 'exhume25', text: 'Whenever you Exhume, gain 3 Guard.',
    exhumed: (cb) => cb.gainBlock(cb.s.player, 3) },
  { id: 'grave_lantern', name: 'Grave Lantern', icon: '🏮', rarity: 'rare', char: 'sexton', text: 'At the start of each combat, Bury 3. Whenever a chain of 3+ links resolves, Exhume 1.',
    combatStart: (cb) => { cb.buryTop(3); },
    chain: (cb, len) => { if (len >= 3) cb.exhume(1); } },
  { id: 'sundial', name: 'Prime Sundial', icon: '🌞', rarity: 'uncommon', text: 'Reactions with Prime gain 2 Prime each turn instead of 1. Start each combat with 4 Guard.',
    combatStart: (cb) => cb.gainBlock(cb.s.player, 4) },
  { id: 'signpost', name: 'Crossroads Signpost', icon: '🪧', rarity: 'uncommon', text: 'Converge counts 1 extra faction. The first time each turn you play cards from 3 different factions, draw 1 card.',
    cardPlayed: (cb) => { const k = `sign${cb.s.turn}`; if ((cb.s.factionsThisTurn?.length ?? 0) >= 3 && !cb.s.once[k]) { cb.s.once[k] = 1; cb.drawCards(1); } } },
  { id: 'ink_blotter', name: 'Ink Blotter', icon: '🧻', rarity: 'common', text: 'Your cards cannot be Blotted. Whenever an enemy tries, gain 3 Guard per card instead.' },
  { id: 'stage_pass', name: "Stagehand's Pass", icon: '🎫', rarity: 'common', text: 'In fights at a Venue, start with 8 Guard and draw 1 extra card on turn 1.',
    combatStart: (cb) => { if (cb.s.venue) { cb.gainBlock(cb.s.player, 8); cb.drawCards(1); } } },
  { id: 'season_ticket', name: 'Season Ticket', icon: '🎟️', rarity: 'uncommon', text: 'Winning a fight at a Venue pays 25 extra gold.' },
  { id: 'echo_stone', name: 'Echo Stone', icon: '🔁', rarity: 'rare', text: 'The first Attack or Trick you play each combat happens twice.' },
  { id: 'wreath', name: 'Mourning Wreath', icon: '💐', rarity: 'common', text: 'Whenever an enemy dies, heal 2 HP.',
    enemyDied: (cb) => cb.heal(cb.s.player, 2) },
  { id: 'grudge_token', name: 'Grudge Token', icon: '🪙', rarity: 'uncommon', ach: 'nemesis1', text: 'Rivals and bosses start each combat with 2 Shaken.',
    combatStart: (cb) => { if (cb.s.kind !== 'normal') for (const e of cb.alive()) cb.applyStatus(cb.s.player, e, 'weak', 2); } },
  { id: 'night_lamp', name: 'Night Lamp', icon: '🌙', rarity: 'uncommon', ach: 'night1', text: 'Heal 4 HP after each combat. +6 Max HP on pickup.',
    onPickup: (run) => { run.maxHp += 6; run.hp += 6; },
    afterCombat: (run) => { run.hp = Math.min(run.maxHp, run.hp + 4); } },
  { id: 'tolling_heart', name: 'Tolling Heart', icon: '🫀', rarity: 'boss', text: '+1 energy each turn. Whenever a chain of 3+ links resolves, you lose 3 HP.', mods: { energy: 1 },
    chain: (cb, len) => { if (len >= 3) cb.loseHp(cb.s.player, 3); } },
  { id: 'patrons_seal', name: "Patron's Seal", icon: '🔏', rarity: 'boss', text: '+1 energy each turn. Patrons no longer visit you this run.', mods: { energy: 1 } },
  { id: 'venue_map', name: "Impresario's Itinerary", icon: '🗺️', rarity: 'shop', text: 'Every fight takes place at a Venue. Start each Venue fight with 1 extra energy.',
    turnStart: (cb) => { if (cb.s.venue && cb.s.turn === 1) cb.s.energy += 1; } },

  // ── v0.6 Wilds & Wonders ──
  { id: 'lucky_compass', name: 'Lucky Compass', icon: '🧭', rarity: 'uncommon', text: 'Mystery nodes never turn out to be fights or rivals.' },
  { id: 'storm_glass', name: 'Storm Glass', icon: '🌡️', rarity: 'common', text: 'Fog never hides your map. Start each combat with 3 Guard.',
    combatStart: (cb) => cb.gainBlock(cb.s.player, 3) },
  { id: 'rabbit_foot', name: "Rabbit's Foot", icon: '🐾', rarity: 'uncommon', text: 'Rare monsters take 1 more turn to flee, and catching one pays 40 extra gold.',
    combatStart: (cb) => { for (const e of cb.alive()) if (e.st.flee) e.st.flee += 1; } },
  { id: 'wayfarer_boots', name: "Wayfarer's Boots", icon: '🥾', rarity: 'common', text: 'Roadside encounters happen 50% more often, and each one heals you 4 HP.' },
  { id: 'pilgrim_badge', name: "Pilgrim's Badge", icon: '🎖️', rarity: 'common', text: 'Whenever you visit a Shrine, heal 8 HP.' },
  { id: 'weather_vane', name: 'Weather Vane', icon: '🐓', rarity: 'uncommon', text: 'Harsh Skies (Heatwave, Hard Frost, Eclipse, Fog) never roll for you. Rerolls this act\'s Sky if it is one.',
    onPickup: (run) => { const harsh = ['heatwave', 'frost', 'eclipse', 'fog']; const i = run.act - 1; if (run.skies?.[i] && harsh.includes(run.skies[i])) run.skies[i] = 'clear'; } },
  { id: 'party_popper', name: 'Party Popper', icon: '🎉', rarity: 'common', text: 'Mid-fight Surprises are always good ones.' },
  { id: 'jesters_bell', name: "Jester's Bell", icon: '🃏', rarity: 'uncommon', text: 'Mid-fight Surprises happen three times as often, and each one gives you 1 energy.' },
  { id: 'treasure_map', name: 'Treasure Map', icon: '🗺️', rarity: 'shop', text: 'Each new act, two Fights on the map become Treasure.',
    onPickup: (run) => { const f = run.map.flat().filter((n) => n.type === 'fight' && n.row > (run.pos?.row ?? -1) && n.row > 1); for (let i = 0; i < 2 && f.length; i++) f.splice(Math.floor(f.length / 2), 1)[0].type = 'treasure'; } },
  { id: 'hunters_horn', name: "Hunter's Horn", icon: '📯', rarity: 'uncommon', text: 'Whenever you defeat a rival, gain 15 gold and a random Omen.' },
  { id: 'golden_acorn', name: 'Golden Acorn', icon: '🌰', rarity: 'common', text: 'Whenever you enter a new act, gain 5 Max HP.' },
  { id: 'conch_shell', name: 'Conch Shell', icon: '🐚', rarity: 'uncommon', text: 'Start each combat with an Undertow Charm set: when an enemy trap fires, gain Guard.',
    combatStart: (cb) => { const p = cb.s.player; if (p.traps.length < p.slots) p.traps.push(cb.mkCard(cb.tier('undertow_charm'))); } },
  { id: 'forge_heart', name: 'Forge Heart', icon: '❤️‍🔥', rarity: 'rare', text: 'Start each combat with an Ember Pod set: the first enemy to attack you is Burned.',
    combatStart: (cb) => { const p = cb.s.player; if (p.traps.length < p.slots) p.traps.push(cb.mkCard(cb.tier('ember_pod'))); } },
  { id: 'antler_crown', name: 'Antler Crown', icon: '🦌', rarity: 'boss', text: '+1 energy each turn. Mystery nodes are always fights.', mods: { energy: 1 } },
  { id: 'leviathan_scale', name: 'Leviathan Scale', icon: '🐉', rarity: 'boss', text: '+1 energy each turn. Enemies start each combat with 6 Guard.', mods: { energy: 1 },
    combatStart: (cb) => { for (const e of cb.alive()) cb.gainBlock(e, 6); } },
  { id: 'golden_net', name: 'Golden Net', icon: '🥅', rarity: 'uncommon', ach: 'rare5', text: 'Rare monsters take 2 more turns to flee.',
    combatStart: (cb) => { for (const e of cb.alive()) if (e.st.flee) e.st.flee += 2; } },
  { id: 'dawn_shard', name: 'Shard of Dawn', icon: '🌅', rarity: 'rare', ach: 'night5', text: 'In the Long Night, enemies have 20% less HP. Elsewhere, start each combat with 1 Edge.',
    combatStart: (cb) => { if (cb.run.night && cb.run.act >= 5) { for (const e of cb.alive()) { e.maxHp = Math.round(e.maxHp * 0.8); e.hp = Math.min(e.hp, e.maxHp); } } else cb.s.player.st.str = (cb.s.player.st.str ?? 0) + 1; } },

  // ── v0.5 Patron blessings (only from Patrons; never in shops or chests) ──
  { id: 'b_peal', name: 'Long Peal', icon: '🔔', rarity: 'blessing', text: 'Blessing of the Bellmaiden: chains can be 1 link longer.' },
  { id: 'b_answer', name: 'Answering Bell', icon: '🛎️', rarity: 'blessing', text: 'Blessing of the Bellmaiden: the first chain of 2+ links each combat draws 2 cards and gives 1 energy.',
    chain: (cb) => { if (!cb.s.once.answer) { cb.s.once.answer = 1; cb.drawCards(2); cb.s.energy += 1; } } },
  { id: 'b_rope', name: 'Extra Rope', icon: '🪢', rarity: 'blessing', text: 'Blessing of the Bellmaiden: +1 Reaction slot.', mods: { slots: 1 } },
  { id: 'b_toll', name: 'Toll for Thee', icon: '⚱️', rarity: 'blessing', text: 'Blessing of the Bellmaiden: whenever a chain of 3+ links resolves, apply 4 Doom to ALL enemies.',
    chain: (cb, len) => { if (len >= 3) for (const e of cb.alive()) cb.applyStatus(cb.s.player, e, 'doom', 4); } },
  { id: 'b_mulch', name: 'Mulch', icon: '🍂', rarity: 'blessing', text: 'Blessing of the Gardener: start each combat with 6 Guard.',
    combatStart: (cb) => cb.gainBlock(cb.s.player, 6) },
  { id: 'b_perennial', name: 'Perennial', icon: '🌼', rarity: 'blessing', text: 'Blessing of the Gardener: heal 3 HP after each combat.',
    afterCombat: (run) => { run.hp = Math.min(run.maxHp, run.hp + 3); } },
  { id: 'b_mask', name: 'Second Face', icon: '🎭', rarity: 'blessing', text: 'Blessing of the Masked Patron: +1 energy each turn, but enemies have 15% more HP.', mods: { energy: 1 },
    combatStart: (cb) => { for (const e of cb.alive()) { const x = Math.round(e.maxHp * 0.15); e.maxHp += x; e.hp += x; } } },
];

export const RELICS: Record<string, RelicDef> = Object.fromEntries(R.map((r) => [r.id, r]));
export const RELIC_LIST = R;

export function relicMod(run: RunState, key: keyof NonNullable<RelicDef['mods']>): number {
  let n = 0;
  for (const r of run.relics) n += RELICS[r]?.mods?.[key] ?? 0;
  return n;
}
