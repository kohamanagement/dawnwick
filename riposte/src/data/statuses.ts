import type { Combat } from '../engine/combat';
import type { Combatant } from '../engine/types';

type Hook = (cb: Combat, who: Combatant, n: number, arg: number) => void;

export interface StatusDef {
  id: string;
  name: string;
  icon: string;
  debuff?: boolean;
  /** Loses 1 stack at the end of its owner's turn. */
  decays?: boolean;
  desc: (n: number) => string;
  onTurnStart?: Hook;
  onTurnEnd?: Hook;
  onChain?: Hook;
  onSacrifice?: Hook;
  onExhaust?: Hook;
  /** v0.11: you played a Counter. */
  onCounter?: Hook;
  /** v0.11: one of your Reactions fired (not Negated). */
  onReactFire?: Hook;
}

const list: StatusDef[] = [
  { id: 'str', name: 'Edge', icon: '💪', desc: (n) => `Card and attack damage +${n}.` },
  { id: 'weak', name: 'Shaken', icon: '🥀', debuff: true, decays: true, desc: (n) => `Deals 25% less damage. ${n} turn(s).` },
  { id: 'vuln', name: 'Exposed', icon: '💔', debuff: true, decays: true, desc: (n) => `Takes 40% more damage. ${n} turn(s).` },
  {
    id: 'burn', name: 'Burn', icon: '🔥', debuff: true,
    desc: (n) => `At the start of its turn, loses ${n} HP, then Burn drops by 1.`,
    onTurnStart: (cb, who, n) => {
      cb.loseHp(who, n);
      who.st.burn = n - 1;
      if (who.st.burn <= 0) delete who.st.burn;
    },
  },
  { id: 'thorns', name: 'Barbs', icon: '🌵', desc: (n) => `When hit by an attack, deals ${n} damage back.` },
  {
    id: 'doom', name: 'Doom', icon: '💀', debuff: true,
    desc: (n) => `At the start of its turn, loses ${Math.floor(n / 5)} HP (1 per 5 Doom). If Doom (${n}) is at least its HP, it dies instead. Never wears off.`,
    onTurnStart: (cb, who, n) => {
      if (n < who.hp) cb.loseHp(who, Math.floor(n / 5));
      if (!who.dead && n >= who.hp) {
        cb.emit({ t: 'text', who: cb.whoKey(who), s: 'DOOMED' });
        cb.log(`${who.name} succumbs to Doom.`);
        cb.loseHp(who, who.hp);
      }
    },
  },
  {
    id: 'kindle', name: 'Hot Blood', icon: '♨️',
    desc: (n) => `At the start of your turn, gain ${n} Edge and lose 1 HP.`,
    onTurnStart: (cb, who, n) => { cb.applyStatus(who, who, 'str', n); cb.loseHp(who, 1); },
  },
  {
    id: 'growth', name: 'Overgrowth', icon: '🌿',
    desc: (n) => `At the start of your turn, gain ${n} Guard.`,
    onTurnStart: (cb, who, n) => cb.gainBlock(who, n),
  },
  {
    id: 'sprout', name: 'Sprout', icon: '🌱',
    desc: (n) => `Next turn, gain ${n} Guard.`,
    onTurnStart: (cb, who, n) => { cb.gainBlock(who, n); delete who.st.sprout; },
  },
  { id: 'roots', name: 'Deep Roots', icon: '🪵', desc: () => 'Guard is not removed at the start of your next turn.' },
  { id: 'focus', name: 'Deep Focus', icon: '🔷', desc: (n) => `Draw ${n} extra card(s) each turn.` },
  { id: 'flow', name: 'Flow State', icon: '🌊', desc: (n) => `Reactions cost ${n} less.` },
  {
    id: 'duel', name: 'Duel Stance', icon: '🤺',
    desc: (n) => `Whenever a chain of 2+ links resolves, gain ${n} Guard and deal ${n} damage to a random enemy.`,
    onChain: (cb, who, n) => {
      cb.gainBlock(who, n);
      const foes = cb.foesOf(who);
      if (foes.length) cb.hit(who, cb.rng.pick(foes), n, false);
    },
  },
  { id: 'crown', name: 'Ember Crown', icon: '👑', desc: (n) => `Whenever you apply Burn, apply ${n} more.` },
  {
    id: 'harvest', name: 'Grave Harvest', icon: '⚰️',
    desc: (n) => `Whenever you Sacrifice or Fold a card, apply ${n} Doom to ALL enemies.`,
    onSacrifice: (cb, who, n) => { for (const f of cb.foesOf(who)) cb.applyStatus(who, f, 'doom', n); },
    onExhaust: (cb, who, n) => { for (const f of cb.foesOf(who)) cb.applyStatus(who, f, 'doom', n); },
  },
  {
    id: 'pyre', name: 'Phoenix Rite', icon: '🐦‍🔥',
    desc: (n) => `At the start of your turn, apply ${n} Burn to ALL enemies.`,
    onTurnStart: (cb, who, n) => { for (const f of cb.foesOf(who)) cb.applyStatus(who, f, 'burn', n); },
  },
  {
    id: 'ritual', name: 'Ritual', icon: '🕯️',
    desc: (n) => `At the end of its turn, gains ${n} Edge.`,
    onTurnEnd: (cb, who, n) => cb.applyStatus(who, who, 'str', n),
  },
  // ── Gilt ──
  { id: 'ante', name: 'Ante', icon: '🪙', desc: (n) => `Chips on the table: ${n}. Gilt cards cash it in for big effects. Never wears off.` },
  { id: 'edge', name: 'House Edge', icon: '🎰', desc: (n) => `Whenever your Fate Coin flips, gain ${n} Guard.` },
  { id: 'midas', name: 'Midas Touch', icon: '✋', desc: (n) => `Whenever you raise your Ante, gain ${n} Guard per Ante.` },
  {
    id: 'wheel', name: 'Fortune Wheel', icon: '🎡',
    desc: (n) => `At the start of your turn, flip your Fate Coin and raise your Ante by ${n}.`,
    onTurnStart: (cb, who, n) => { cb.flip(who); cb.raiseAnte(who, n); },
  },
  { id: 'house', name: 'The House Always Wins', icon: '🏛', desc: () => 'Your Fate Coin counts as both ☀ Sun and ☾ Moon.' },
  {
    id: 'lantern', name: 'Soul Lantern', icon: '🏮',
    desc: (n) => `At the start of your turn, apply ${n} Doom to ALL enemies.`,
    onTurnStart: (cb, who, n) => { for (const f of cb.foesOf(who)) cb.applyStatus(who, f, 'doom', n); },
  },
  {
    id: 'regen', name: 'Regenerate', icon: '💚', decays: true,
    desc: (n) => `At the start of its turn, heals ${n}.`,
    onTurnStart: (cb, who, n) => cb.heal(who, n),
  },
  // ── v0.4 ──
  { id: 'prism', name: 'Prism', icon: '🔷', desc: (n) => `Your Glints deal ${n} more damage.` },
  { id: 'double', name: 'Doppelgänger', icon: '👥', desc: () => 'The first Attack or Trick you play each turn happens twice.' },
  {
    id: 'crow', name: 'Crow Court', icon: '🐦‍⬛',
    desc: (n) => `At the start of your turn, Steal ${n}. If there was nothing to steal, add a Glint to your hand.`,
    onTurnStart: (cb, who, n) => { if (cb.steal(who, n) === 0 && who.kind === 'player') cb.addCard('glint', 'hand', false); },
  },
  { id: 'klepto', name: 'Kleptomania', icon: '🫳', desc: (n) => `Whenever you Steal a trap, draw 1 card and gain ${n} Guard.` },
  { id: 'nest', name: 'The Gilded Nest', icon: '🪺', desc: () => 'Stolen traps go back into their slot after they fire.' },
  {
    id: 'bark', name: 'Ancient Bark', icon: '🪵',
    desc: (n) => `At the end of your turn, if you have Guard, gain ${n} Barbs.`,
    onTurnEnd: (cb, who, n) => { if (who.block > 0) cb.applyStatus(who, who, 'thorns', n); },
  },
  {
    id: 'bankroll', name: 'Bankroll', icon: '🏦',
    desc: (n) => `At the end of your turn, raise your Ante by ${n} for each energy you carry over.`,
    onTurnEnd: (cb, who, n) => { if (who.kind === 'player' && cb.s.flux) cb.raiseAnte(who, n * cb.s.flux); },
  },
  { id: 'ouro', name: 'Ouroboros', icon: '🐍', desc: (n) => `Chains can be 8 links long. Whenever a chain of 4+ links resolves, draw ${n}.` },
  { id: 'coil', name: 'Coiled', icon: '🌀', desc: (n) => `Whenever one of your Reactions fires, deal ${n} damage to a random enemy.` },
  {
    id: 'grudge', name: 'Grudge', icon: '😤',
    desc: (n) => `Whenever a chain of 3+ links resolves, gains ${n} Edge.`,
    onChain: (cb, who, n, len) => { if (len >= 3) cb.applyStatus(who, who, 'str', n); },
  },
  {
    id: 'bloom', name: 'Briar Bloom', icon: '🌹',
    desc: (n) => `At the start of its turn, gains ${n} Barbs.`,
    onTurnStart: (cb, who, n) => cb.applyStatus(who, who, 'thorns', n),
  },
  // ── v0.5: Grave (the Sexton) ──
  { id: 'grave', name: 'Gravekeeper', icon: '⚱️', desc: () => 'Your Reactions go to your Crypt when they leave play, instead of the discard pile. Exhume sets them again.' },
  { id: 'danse', name: 'Danse Macabre', icon: '💃', desc: (n) => `Whenever you Exhume a Reaction, deal ${n} damage to ALL enemies.` },
  { id: 'pallbearer', name: 'Pallbearer', icon: '⚰️', desc: (n) => `Whenever a card enters your Crypt, gain ${n} Guard.` },
  {
    id: 'longsleep', name: 'The Long Sleep', icon: '🛌',
    desc: (n) => `At the start of your turn, Exhume ${n}.`,
    onTurnStart: (cb, who, n) => { if (who.kind === 'player') cb.exhume(n); },
  },
  {
    id: 'funeral', name: 'Funeral March', icon: '🎺',
    desc: (n) => `At the start of your turn, Bury 1 and gain ${n} Guard.`,
    onTurnStart: (cb, who, n) => { if (who.kind === 'player') { cb.buryTop(1); cb.gainBlock(who, n); } },
  },
  { id: 'throne', name: 'Charnel Throne', icon: '🪑', desc: (n) => `Whenever one of your Reactions fires, deal damage equal to your Crypt size +${n} to a random enemy.` },
  { id: 'drawnext', name: 'Foresight', icon: '🔭', desc: (n) => `Draw ${n} more card(s) next turn.` },
  // ── v0.6 ──
  {
    id: 'flee', name: 'Skittish', icon: '💨',
    desc: (n) => `Runs away in ${n} turn(s). Catch it first!`,
    onTurnEnd: (cb, who, n) => { if (who.kind !== 'enemy') return; if (n <= 1) cb.flee(who as import('../engine/types').EnemyState); else who.st.flee = n - 1; },
  },
  {
    id: 'chime', name: 'Chime', icon: '🔔',
    desc: (n) => `Whenever a chain resolves, gains ${n} Guard.`,
    onChain: (cb, who, n) => cb.gainBlock(who, n),
  },
  // ── v0.7: Elements, Counters and the seven new classes ──
  { id: 'chill', name: 'Chill', icon: '🧊', debuff: true, desc: (n) => `${n} Chill. When Chill reaches its Freeze point (5, 8 for rivals, 12 for bosses, +3 each time it froze before), it Freezes and Chill resets.` },
  { id: 'frozen', name: 'Frozen', icon: '❄️', debuff: true, desc: () => 'Skips its next action, then thaws. Shatter cards hit Frozen enemies harder.' },
  { id: 'shock', name: 'Shock', icon: '⚡', debuff: true, desc: (n) => `The next time it takes attack damage, it takes ${n} more, then Shock halves.` },
  { id: 'charge', name: 'Charge', icon: '🔋', desc: (n) => `${n} Charge stored. Storm cards spend it. Never wears off.` },
  { id: 'fortify', name: 'Fortify', icon: '🏰', desc: (n) => `At the start of your turn, keep up to ${n} of your Guard.` },
  { id: 'tremor', name: 'Tremor', icon: '〰️', debuff: true, desc: (n) => `At the end of your turn, it takes ${n} damage (ignores Guard), then Tremor halves.` },
  { id: 'verdict', name: 'Verdict', icon: '⚖️', desc: (n) => `${n} Verdict. Gained by Countering and Negating. Dawn cards pass judgment with it.` },
  { id: 'veil', name: 'Veil', icon: '🌫️', desc: (n) => `The next ${n} attack hit(s) against you miss completely.` },
  { id: 'mark', name: 'Mark', icon: '🎯', debuff: true, desc: (n) => `Your damage against it is increased by ${n}. Never wears off.` },
  { id: 'rebut', name: 'Rebuttal', icon: '🗯️', desc: (n) => `Negates the next ${n} Counter(s) played against it from hand. You may counter the Rebuttal.` },
  {
    id: 'wolf', name: 'Wolf', icon: '🐺',
    desc: (n) => `Companion. At the end of your turn, deals ${n} damage to a random enemy.`,
    onTurnEnd: (cb, who, n) => { const f = cb.foesOf(who); if (f.length) cb.hit(who, cb.rng.pick(f), n + (who.st.packlead ?? 0), false); },
  },
  {
    id: 'hawk', name: 'Hawk', icon: '🦅',
    desc: (n) => `Companion. At the end of your turn, deals ${n} damage to ALL enemies.`,
    onTurnEnd: (cb, who, n) => { for (const f of cb.foesOf(who)) cb.hit(who, f, n + (who.st.packlead ?? 0), false); },
  },
  {
    id: 'bear', name: 'Bear', icon: '🐻',
    desc: (n) => `Companion. At the start of your turn, gain ${n} Guard.`,
    onTurnStart: (cb, who, n) => cb.gainBlock(who, n + (who.st.packlead ?? 0)),
  },
  {
    id: 'serpent', name: 'Serpent', icon: '🐍',
    desc: (n) => `Companion. At the end of your turn, applies ${n} Burn (venom) to a random enemy.`,
    onTurnEnd: (cb, who, n) => { const f = cb.foesOf(who); if (f.length) cb.applyStatus(who, cb.rng.pick(f), 'burn', n + (who.st.packlead ?? 0)); },
  },
  { id: 'packlead', name: 'Pack Leader', icon: '🦴', desc: (n) => `Your companions act with +${n}.` },
  {
    id: 'dynamo', name: 'Dynamo', icon: '🌀',
    desc: (n) => `At the start of your turn, gain ${n} Charge.`,
    onTurnStart: (cb, who, n) => cb.applyStatus(who, who, 'charge', n),
  },
  { id: 'conductor', name: 'Conductor', icon: '🗼', desc: (n) => `Whenever you apply Shock, apply ${n} more.` },
  {
    id: 'blizzard', name: 'Blizzard', icon: '🌨️',
    desc: (n) => `At the start of your turn, apply ${n} Chill to ALL enemies.`,
    onTurnStart: (cb, who, n) => { for (const f of cb.foesOf(who)) cb.applyStatus(who, f, 'chill', n); },
  },
  { id: 'permafrost', name: 'Permafrost', icon: '🏔️', desc: (n) => `Whenever an enemy Freezes, gain ${n} Guard and draw 1 card.` },
  {
    id: 'faultline', name: 'Fault Line', icon: '🌋',
    desc: (n) => `At the start of your turn, apply ${n} Tremor to ALL enemies.`,
    onTurnStart: (cb, who, n) => { for (const f of cb.foesOf(who)) cb.applyStatus(who, f, 'tremor', n); },
  },
  { id: 'sanctum', name: 'Sanctum', icon: '⛪', desc: (n) => `Whenever you play a Counter, gain ${n} Guard.` },
  { id: 'judge', name: 'High Court', icon: '🏛️', desc: (n) => `Whenever you gain Verdict, deal ${n} damage to a random enemy.` },
  { id: 'catalyst', name: 'Catalyst', icon: '⚗️', desc: () => 'Resonance happens after 2 cards of an element instead of 3.' },
  { id: 'elixir', name: 'Elixir', icon: '🧪', desc: (n) => `Whenever Resonance happens, gain ${n} Guard and draw 1 card.` },
  {
    id: 'nightfall', name: 'Nightfall', icon: '🌒',
    desc: (n) => `At the start of your turn, apply ${n} Mark to ALL enemies.`,
    onTurnStart: (cb, who, n) => { for (const f of cb.foesOf(who)) cb.applyStatus(who, f, 'mark', n); },
  },
  {
    id: 'shadowstep', name: 'Shadowstep', icon: '👣',
    desc: (n) => `At the start of your turn, if you have no Veil, gain ${n} Veil.`,
    onTurnStart: (cb, who, n) => { if (!who.st.veil) cb.applyStatus(who, who, 'veil', n); },
  },
  { id: 'frostbrand', name: 'Frostbrand', icon: '🔷', desc: (n) => `Your attacks apply ${n} Chill to whatever they hit.` },
  { id: 'fury', name: 'Tempest Fury', icon: '🌩️', desc: () => 'Whenever you spend Charge, deal that much damage to ALL enemies.' },
  { id: 'mountain', name: 'Heart of the Mountain', icon: '⛰️', desc: () => 'Your Guard is never removed at the start of your turn.' },
  {
    id: 'wildhunt', name: 'The Wild Hunt', icon: '🏹',
    desc: (n) => `At the start of your turn, Summon Wolf ${n}, Bear ${n} and Hawk ${n}.`,
    onTurnStart: (cb, who, n) => { for (const k of ['wolf', 'bear', 'hawk']) cb.applyStatus(who, who, k, n); },
  },
  { id: 'quickdraw', name: 'Quickdraw', icon: '🤠', desc: (n) => `Your Counters cost ${n} less.` },
  {
    id: 'riposte', name: 'Riposte', icon: '🤺',
    desc: (n) => `Whenever you play a Counter, deal ${n} damage to the enemy it answers.`,
  },
  // v0.9 "Clean Cut": the generated powers used to repeat the hand-made ones word for word; these replace them.
  {
    id: 'stoke9', name: 'Stoke', icon: '🔥',
    desc: (n) => `At the end of your turn, deal ${n} damage to each enemy with Burn.`,
    onTurnEnd: (cb, who, n) => { for (const f of cb.foesOf(who)) if (f.st.burn) cb.hit(who, f, n, false); },
  },
  {
    id: 'kiln', name: 'Kiln', icon: '🧱',
    desc: (n) => `At the start of your turn, gain ${n} Guard for each enemy with Burn.`,
    onTurnStart: (cb, who, n) => { const k = cb.foesOf(who).filter((f) => f.st.burn).length; if (k) cb.gainBlock(who, n * k); },
  },
  {
    id: 'undertow9', name: 'Undertow', icon: '🌊',
    desc: (n) => `At the start of your turn, apply ${n} Shaken to a random enemy.`,
    onTurnStart: (cb, who, n) => { const f = cb.foesOf(who); if (f.length) cb.applyStatus(who, cb.rng.pick(f), 'weak', n); },
  },
  {
    id: 'riptide', name: 'Riptide', icon: '🌀',
    desc: (n) => `At the end of your turn, gain ${n} Guard for each energy you carry over.`,
    onTurnEnd: (cb, who, n) => { if (who.kind === 'player' && cb.s.flux > 0) cb.gainBlock(who, n * cb.s.flux); },
  },
  {
    id: 'sap', name: 'Sap', icon: '🍯',
    desc: (n) => `At the end of your turn, if you have Barbs, heal ${n} HP.`,
    onTurnEnd: (cb, who, n) => { if (who.st.thorns) cb.heal(who, n); },
  },
  {
    id: 'rootwall', name: 'Rootwall', icon: '🪵',
    desc: (n) => `At the start of your turn, gain ${n} Guard for each Barbs you have.`,
    onTurnStart: (cb, who, n) => { if (who.st.thorns) cb.gainBlock(who, n * who.st.thorns); },
  },
  {
    id: 'entropy', name: 'Entropy', icon: '⏳',
    desc: (n) => `At the end of your turn, apply ${n} Doom to the enemy with the most HP.`,
    onTurnEnd: (cb, who, n) => { const f = [...cb.foesOf(who)].sort((a, b) => b.hp - a.hp)[0]; if (f) cb.applyStatus(who, f, 'doom', n); },
  },
  {
    id: 'wither', name: 'Wither', icon: '🥀',
    desc: (n) => `Whenever a chain of 2+ links resolves, apply ${n} Doom to ALL enemies.`,
    onChain: (cb, who, n, len) => { if (len >= 2) for (const f of cb.foesOf(who)) cb.applyStatus(who, f, 'doom', n); },
  },
  {
    id: 'dividend', name: 'Dividend', icon: '📈',
    desc: (n) => `At the start of your turn, raise your Ante by ${n}.`,
    onTurnStart: (cb, who, n) => cb.raiseAnte(who, n),
  },
  { id: 'loaded', name: 'Loaded Dice', icon: '🎲', desc: (n) => `Whenever your Fate Coin flips, deal ${n} damage to a random enemy.` },
  { id: 'refract', name: 'Refraction', icon: '🔷', desc: (n) => `Whenever you play a Glint, gain ${n} Guard.` },
  {
    id: 'hoard', name: 'Hoard', icon: '💰',
    desc: (n) => `At the end of your turn, gain ${n} Guard for each Reaction you have set.`,
    onTurnEnd: (cb, who, n) => { if (who.traps.length) cb.gainBlock(who, n * who.traps.length); },
  },
  { id: 'wake9', name: 'Wake', icon: '🕯️', desc: (n) => `Whenever a card enters your Crypt, deal ${n} damage to a random enemy.` },
  { id: 'cryptward', name: 'Crypt Ward', icon: '⚱️', desc: (n) => `Whenever you Exhume a card, gain ${n} Guard.` },
  {
    id: 'staticfield', name: 'Static Field', icon: '⚡',
    desc: (n) => `At the end of your turn, apply ${n} Shock to ALL enemies.`,
    onTurnEnd: (cb, who, n) => { for (const f of cb.foesOf(who)) cb.applyStatus(who, f, 'shock', n); },
  },
  { id: 'capacitor9', name: 'Capacitor', icon: '🔋', desc: (n) => `Whenever you spend Charge, gain ${n} Guard per Charge spent.` },
  {
    id: 'hoarfrost', name: 'Hoarfrost', icon: '🌨️',
    desc: (n) => `At the end of your turn, gain ${n} Guard for each enemy with Chill.`,
    onTurnEnd: (cb, who, n) => { const k = cb.foesOf(who).filter((f) => f.st.chill).length; if (k) cb.gainBlock(who, n * k); },
  },
  { id: 'shatter9', name: 'Shatterpoint', icon: '💥', desc: (n) => `Whenever an enemy Freezes, deal ${n} damage to ALL enemies.` },
  {
    id: 'bedrock', name: 'Bedrock', icon: '🏔️',
    desc: (n) => `At the end of your turn, gain ${n} Fortify.`,
    onTurnEnd: (cb, who, n) => cb.applyStatus(who, who, 'fortify', n),
  },
  {
    id: 'landslide', name: 'Landslide', icon: '⛰️',
    desc: (n) => `At the end of your turn, if you have 10 or more Guard, deal ${n} damage to ALL enemies.`,
    onTurnEnd: (cb, who, n) => { if (who.block >= 10) for (const f of cb.foesOf(who)) cb.hit(who, f, n, false); },
  },
  {
    id: 'vigil', name: 'Vigil', icon: '🕯️',
    desc: (n) => `At the start of your turn, gain ${n} Verdict.`,
    onTurnStart: (cb, who, n) => cb.applyStatus(who, who, 'verdict', n),
  },
  {
    id: 'absolution', name: 'Absolution', icon: '🕊️',
    desc: (n) => `At the end of your turn, heal ${n} HP for each Counter you played this turn.`,
    onTurnEnd: (cb, who, n) => { const k = who.kind === 'player' ? cb.s.once[`ctr${cb.s.turn}`] ?? 0 : 0; if (k) cb.heal(who, n * k); },
  },
  {
    id: 'solvent9', name: 'Solvent', icon: '🧪',
    desc: (n) => `At the start of your turn, apply ${n} Exposed to a random enemy.`,
    onTurnStart: (cb, who, n) => { const f = cb.foesOf(who); if (f.length) cb.applyStatus(who, cb.rng.pick(f), 'vuln', n); },
  },
  { id: 'philstone', name: "Philosopher's Stone", icon: '🜔', desc: (n) => `Whenever Resonance happens, deal ${n} damage to ALL enemies.` },
  {
    id: 'kinship', name: 'Kinship', icon: '🐾',
    desc: (n) => `At the end of your turn, heal ${n} HP for each companion you have.`,
    onTurnEnd: (cb, who, n) => { const k = ['wolf', 'bear', 'hawk', 'serpent'].filter((x) => who.st[x]).length; if (k) cb.heal(who, n * k); },
  },
  {
    id: 'cutthroat', name: 'Cutthroat', icon: '🔪',
    desc: (n) => `At the end of your turn, deal ${n} damage to each enemy with Mark.`,
    onTurnEnd: (cb, who, n) => { for (const f of cb.foesOf(who)) if (f.st.mark) cb.hit(who, f, n, false); },
  },
  { id: 'umbra', name: 'Umbra', icon: '🌘', desc: (n) => `Whenever an attack misses you because of Veil, deal ${n} damage to the attacker.` },
];


export const STATUSES: Record<string, StatusDef> = Object.fromEntries(list.map((s) => [s.id, s]));
