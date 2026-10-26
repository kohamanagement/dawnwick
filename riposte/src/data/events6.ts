// v0.6 "Wilds & Wonders": 40 new events (several with more than one stage), 12 Shrines, and 34 roadside
// encounters that pop up on the way to a node. Shared shapes live in events.ts.
import type { RunState } from '../engine/types';
import type { RunApi } from '../engine/run';
import type { EventDef, EventOption } from './events';
import { CARDS } from './cards';
import { FATES, FATE_MAP } from './fates';
import { SKIES } from './wilds';
import { omenCap } from './omens';

const leave: EventOption = { label: 'Leave', desc: 'Nothing happens.', apply: () => 'You move on.' };
const onward: EventOption = { label: 'Carry on', desc: 'Keep to the road.', apply: () => 'You keep walking.' };
const hpOk = (n: number) => (r: RunState) => r.hp > n;
const gold = (n: number) => (r: RunState) => r.gold >= n;
const roomForOmen = (r: RunState) => (r.omens ?? []).length < omenCap(r);
const pay = (r: RunState, n: number) => { r.gold = Math.max(0, r.gold - n); };
const maxHp = (r: RunState, n: number) => { r.maxHp = Math.max(20, r.maxHp + n); r.hp = Math.max(1, Math.min(r.hp + Math.max(0, n), r.maxHp)); };
const hasCurse = (r: RunState) => r.deck.some((c) => CARDS[c.id].type === 'curse');
const upType = (r: RunState, api: RunApi, type: string, n: number) => {
  const ups = r.deck.filter((c) => !c.up && CARDS[c.id].type === type);
  let k = 0;
  for (; k < n && ups.length; k++) ups.splice(api.rng.int(0, ups.length - 1), 1)[0].up = true;
  return k;
};

/** Temporary boons (and one bane) that last a few fights. Read by Combat.begin. */
export interface BuffDef { id: string; name: string; icon: string; text: string; bad?: boolean }
export const BUFFS: BuffDef[] = [
  { id: 'ballad', name: 'Fighting Song', icon: '🎶', text: 'Start fights with 1 Edge.' },
  { id: 'warpaint', name: 'War Paint', icon: '🎨', text: 'Start fights with 2 Edge.' },
  { id: 'shielded', name: 'Blessed Shield', icon: '🛡️', text: 'Start fights with 8 Guard.' },
  { id: 'blessed', name: 'Blessed', icon: '✨', text: 'Draw 2 extra cards on turn 1.' },
  { id: 'hexed', name: 'Hexed', icon: '🧿', text: 'Start fights with 1 Shaken.', bad: true },
  { id: 'bounty', name: 'Bounty', icon: '📜', text: 'Your next rival pays 50 extra gold.' },
  { id: 'wellfed', name: 'Well Fed', icon: '🍲', text: 'Start fights with 4 Guard and heal 2 HP after them.' },
];
export const BUFF_MAP: Record<string, BuffDef> = Object.fromEntries(BUFFS.map((b) => [b.id, b]));

export const EVENTS6: EventDef[] = [
  // ═════════ EVENTS ═════════
  { id: 'fortune_teller', name: 'The Fortune Teller', icon: '🔮',
    text: 'A tent of patched velvet. Inside, a woman shuffles a deck with too many suits. "Cross my palm, duelist."',
    options: [
      { label: 'Cross her palm (30 gold)', desc: 'Gain 2 random Omens.', can: (r) => gold(30)(r) && roomForOmen(r),
        apply: (r, api) => { pay(r, 30); const n = api.gainOmens(2); return `She turns over ${n} card(s) and slides them to you.`; } },
      { label: 'Ask for a free reading', desc: 'Even odds: upgrade a random card, or gain a Regret.', risky: true,
        apply: (_r, api) => { if (api.rng.chance(0.5)) { api.upgradeRandom(1); return '"A bright future." One of your cards agrees.'; } api.addToDeck('regret'); return '"Oh dear." She will not say more.'; } },
      leave,
    ] },
  { id: 'tracks', name: 'Tracks in the Frost', icon: '🐾',
    text: 'Small, glittering footprints lead off the path. Whatever made them is worth a fortune, and is very, very fast.',
    options: [
      { label: 'Follow the tracks', desc: 'Fight a rare monster. It runs after 3 turns; catch it for gold and a keepsake.', apply: (_r, api) => { api.rareFight(); return 'There! A flash of gold in the undergrowth.'; } },
      leave,
    ] },
  { id: 'bandit_toll', name: 'The Bandit Toll', icon: '🏴',
    text: 'A rope across the road and three grinning faces. "Toll\'s twenty-five. Or we take it out of you."',
    options: [
      { label: 'Pay the toll (25 gold)', desc: 'Lose 25 gold.', can: gold(25), apply: (r) => { pay(r, 25); return 'They wave you through, counting.'; } },
      { label: 'Fight them', desc: 'A normal fight. Win and they pay you instead.', apply: (_r, api) => { api.fightAct('normal'); return 'You draw your cards. They draw knives.'; } },
      { label: 'Run for it (lose 7 HP)', desc: 'Lose 7 HP.', can: hpOk(7), apply: (r, api) => { api.hurt(7); void r; return 'A thrown rock catches you as you go.'; } },
    ] },
  { id: 'circus', name: 'The Travelling Circus', icon: '🎪',
    text: 'Striped tents, a calliope, and a ringmaster who looks you up and down. "We\'re short a knife-thrower\'s assistant."',
    options: [
      { label: 'Watch the show (20 gold)', desc: 'Heal 15 HP and upgrade a random card.', can: gold(20),
        apply: (r, api) => { pay(r, 20); api.heal(15); api.upgradeRandom(1); return 'You laugh until it hurts, then it stops hurting.'; } },
      { label: 'Volunteer (lose 9 HP)', desc: 'Choose 1 of 3 rare cards.', can: hpOk(9),
        apply: (_r, api) => { api.hurt(9); api.offerCards('rare'); return 'Only one knife lands. The ringmaster pays you in cards.'; } },
      leave,
    ] },
  { id: 'wandering_smith', name: 'The Wandering Smith', icon: '⚒️',
    text: 'A smith with a portable anvil and arms like hams. "Bring it here. I\'ll put an edge on anything."',
    options: [
      { label: 'Sharpen a card', desc: 'Upgrade a card.', pick: 'upgrade',
        apply: (r, _api, uid) => { const c = r.deck.find((x) => x.uid === uid); if (c) c.up = true; return 'Ting, ting, ting. Better.'; } },
      { label: 'Stamp a sigil (35 gold)', desc: 'Put a random fitting Sigil on a card of your choice.', pick: 'sigil', can: gold(35),
        apply: (r, api, uid) => { pay(r, 35); const m = api.sigil(uid); return m ? `The smith stamps ${m} into it.` : 'The stamp slides off. The smith refunds nothing.'; } },
      leave,
    ] },
  { id: 'burning_library', name: 'The Burning Library', icon: '🔥',
    text: 'Smoke pours from a library\'s windows. Somewhere inside, the books are screaming. Possibly that is the wind.',
    options: [
      { label: 'Save the books (lose 8 HP)', desc: 'Upgrade 3 random cards.', can: hpOk(8),
        apply: (_r, api) => { api.hurt(8); const n = api.upgradeRandom(3); return `You stagger out with ${n} singed but brilliant tomes.`; } },
      { label: 'Warm your hands', desc: 'Heal 10 HP.', apply: (_r, api) => { api.heal(10); return 'Somebody may as well enjoy it.'; } },
    ] },
  { id: 'card_shark', name: 'The Card Shark', icon: '🦈',
    text: 'A man in a shark-skin coat shuffles one-handed. "Twenty gold. One hand. Double or nothing after that, if you have the nerve."',
    options: [
      { label: 'Play a hand (20 gold)', desc: '55% to win 40 gold, then the choice to double it.', can: gold(20), risky: true,
        apply: (r, api) => { pay(r, 20); if (api.rng.chance(0.55)) { r.evPot = 40; api.goto('card_shark_win'); return 'You take the hand.'; } return 'He shows a royal flush. Of course he does.'; } },
      leave,
    ] },
  { id: 'card_shark_win', name: 'The Card Shark', icon: '🦈', kind: 'stage',
    text: '', textFn: (r) => `You win! The pot is ${r.evPot ?? 0} gold. The shark smiles with too many teeth. "Again?"`,
    options: [
      { label: 'Cash out', desc: 'Take the pot.', apply: (r, api) => { api.gold(r.evPot ?? 0); const g = r.evPot; r.evPot = 0; return `You pocket ${g} gold and walk away whistling.`; } },
      { label: 'Double or nothing', desc: '50%: double the pot. 50%: lose it all.', risky: true, can: (r) => (r.evPot ?? 0) < 320,
        apply: (r, api) => { if (api.rng.chance(0.5)) { r.evPot = (r.evPot ?? 0) * 2; api.goto('card_shark_win'); return 'Again!'; } r.evPot = 0; return 'The shark rakes in the pot. "Better luck next time."'; } },
    ] },
  { id: 'fairy_ring', name: 'The Fairy Ring', icon: '🍄',
    text: 'A perfect circle of mushrooms, and music you can only hear when you are not listening.',
    options: [
      { label: 'Step inside', desc: 'Something strange happens: a transform, a gift or a trick.', risky: true,
        apply: (r, api) => {
          const x = api.rng.int(0, 3);
          if (x === 0) { const basics = r.deck.filter((c) => CARDS[c.id].rarity === 'starter'); const c = basics.length ? api.rng.pick(basics) : null; if (c) { const n = api.transformCard(c.uid); return `Your ${CARDS[c.id].name} becomes ${n}.`; } }
          if (x === 1) { maxHp(r, 6); return 'You dance until dawn and wake up taller (+6 Max HP).'; }
          if (x === 2) { const n = api.gainOmens(2); return `The fairies leave ${n} Omen(s) in your boots.`; }
          api.addToDeck('regret'); return 'You leave a year later. Or a minute. Something is missing.';
        } },
      { label: 'Eat a mushroom', desc: 'Even odds: heal 18 HP, or lose 5 HP.', risky: true,
        apply: (_r, api) => { if (api.rng.chance(0.5)) { api.heal(18); return 'Delicious. Wholesome. Glowing slightly.'; } api.hurt(5); return 'You see sounds for an hour.'; } },
      leave,
    ] },
  { id: 'lost_child', name: 'A Lost Child', icon: '🧒',
    text: 'A small child sits on a milestone, holding a toy sword. "I\'m not lost. My house is."',
    options: [
      { label: 'Walk them home', desc: 'It takes a while. Someone will be grateful.', apply: (_r, api) => { api.goto('lost_child_home'); return 'You take a small hand and set off.'; } },
      leave,
    ] },
  { id: 'lost_child_home', name: 'The Toymaker\'s House', icon: '🏠', kind: 'stage',
    text: 'The child\'s parents run a toy shop, and they insist on paying you. "Anything on the shelf!"',
    options: [
      { label: 'A toy soldier', desc: 'Gain a random common keepsake.', apply: (_r, api) => { const n = api.relic('common'); return n ? `They wrap up ${n} for you.` : 'The shelf is bare.'; } },
      { label: 'A purse of coins', desc: 'Gain 60 gold.', apply: (_r, api) => { api.gold(60); return '"For your trouble."'; } },
      { label: 'A hot meal', desc: 'Heal to full HP.', apply: (r) => { r.hp = r.maxHp; return 'Stew, bread, and a bed by the fire.'; } },
    ] },
  { id: 'challenge', name: 'A Challenge!', icon: '🤺',
    text: 'A duelist in a plumed hat blocks the road and slaps you with a glove. "You. Me. Now. For glory."',
    options: [
      { label: 'Accept', desc: 'Fight a Champion rival of this act. Win a rare card and a keepsake.', apply: (_r, api) => { api.fightAct('elite', { champ: true }); return '"En garde!"'; } },
      { label: 'Decline', desc: 'Lose nothing but face.', apply: () => 'They call you a coward until you are out of earshot.' },
    ] },
  { id: 'shipwreck', name: 'The Shipwreck', icon: '⚓', acts: [2, 3],
    text: 'A hull on the rocks, half-sunk, with the captain\'s cabin still above the waterline.',
    options: [
      { label: 'Dive to the hold (lose 10 HP)', desc: 'Gain a random keepsake and 30 gold.', can: hpOk(10),
        apply: (_r, api) => { api.hurt(10); api.gold(30); const n = api.gainRandomRelic(); return `Cold, dark, worth it: ${n} and a fistful of coins.`; } },
      { label: 'Salvage the deck', desc: 'Gain 40 gold.', apply: (_r, api) => { api.gold(40); return 'Brass fittings and a good knife.'; } },
      leave,
    ] },
  { id: 'hot_spring', name: 'The Hot Spring', icon: '♨️',
    text: 'Steam rises from a pool in the rocks. It smells of sulphur and good decisions.',
    options: [
      { label: 'Soak', desc: 'Heal 30% of your Max HP.', apply: (r, api) => { api.heal(Math.round(r.maxHp * 0.3)); return 'Your aches melt away.'; } },
      { label: 'Bottle it', desc: 'Gain a random Omen.', can: roomForOmen, apply: (_r, api) => { api.gainOmens(1); return 'The bottle glows faintly.'; } },
    ] },
  { id: 'statue_garden', name: 'The Garden of Statues', icon: '🗿',
    text: 'Stone duelists frozen mid-chain, every stance perfect. A plaque reads: STUDY, BUT DO NOT STAY.',
    options: [
      { label: 'Study the stances (lose 6 Max HP)', desc: 'Upgrade every starter card in your deck.', can: (r) => r.maxHp > 26 && r.deck.some((c) => !c.up && CARDS[c.id].rarity === 'starter'),
        apply: (r) => { maxHp(r, -6); let n = 0; for (const c of r.deck) if (!c.up && CARDS[c.id].rarity === 'starter') { c.up = true; n++; } return `You leave a little stiffer, but ${n} card(s) are sharper.`; } },
      { label: 'Read the plaques', desc: 'Upgrade a random card.', apply: (_r, api) => { api.upgradeRandom(1); return 'One of the plaques explains a trick you had missed.'; } },
      leave,
    ] },
  { id: 'beggar_king', name: 'The Beggar', icon: '🙏',
    text: 'A ragged old man holds out a bowl. His rings, you notice, are very expensive.',
    options: [
      { label: 'Give 20 gold', desc: 'Be kind.', can: gold(20), apply: (r, api) => { pay(r, 20); api.goto('beggar_king_2'); return 'He looks at the coins, then at you.'; } },
      leave,
    ] },
  { id: 'beggar_king_2', name: 'The King in Rags', icon: '👑', kind: 'stage',
    text: '"The first honest soul in a month." He straightens, and his rags are suddenly a royal cloak. "Choose your reward."',
    options: [
      { label: 'A royal gift', desc: 'Gain a random uncommon keepsake.', apply: (_r, api) => { const n = api.relic('uncommon'); return n ? `He presses ${n} into your hand.` : 'He pats your shoulder warmly.'; } },
      { label: 'The royal library', desc: 'Choose 1 of 3 rare cards.', apply: (_r, api) => { api.offerCards('rare'); return '"My scholars will be furious."'; } },
    ] },
  { id: 'chest_room', name: 'The Locked Chest', icon: '🧰',
    text: 'A heavy chest in the middle of an empty room. It has a keyhole. It also, unless you are imagining it, has teeth.',
    options: [
      { label: 'Open it', desc: 'Even odds: a keepsake, or a Chest Mimic attacks (beat it for its gold).', risky: true,
        apply: (_r, api) => { if (api.rng.chance(0.5)) { const n = api.gainRandomRelic(); return `Treasure! ${n}.`; } api.fight(['chest_mimic'], 'normal', { name: 'The Chest Bites!' }); return 'The lid opens. So does its mouth.'; } },
      leave,
    ] },
  { id: 'slot_machine', name: 'The Brass Gambler', icon: '🎰',
    text: 'A clockwork machine with a lever and three wheels of little pictures. A sign: 15 GOLD A PULL. NO REFUNDS. NO REGRETS (EXTRA).',
    options: [
      { label: 'Pull the lever (15 gold)', desc: 'Spin the wheels. You can keep pulling.', can: gold(15), risky: true,
        apply: (r, api) => {
          pay(r, 15);
          const x = api.rng.weighted<string>([['none', 40], ['coins', 25], ['omen', 15], ['relic', 8], ['jackpot', 7], ['regret', 5]]);
          let msg = '🍋 🍒 🔔: nothing.';
          if (x === 'coins') { api.gold(35); msg = '🍒 🍒 🍒: 35 gold!'; }
          if (x === 'omen') { api.gainOmens(1); msg = '🔮 🔮 🔮: an Omen!'; }
          if (x === 'relic') { msg = `💎 💎 💎: ${api.gainRandomRelic()}!`; }
          if (x === 'jackpot') { api.gold(120); msg = '7️⃣ 7️⃣ 7️⃣: JACKPOT! 120 gold!'; }
          if (x === 'regret') { api.addToDeck('regret'); msg = '💀 💀 💀: a Regret shuffles into your deck.'; }
          if (r.gold >= 15) api.goto('slot_machine');
          return msg;
        } },
      leave,
    ] },
  { id: 'thieves_guild', name: "The Thieves' Guild", icon: '🥷',
    text: 'A door with no handle opens before you knock. "Membership is free. The first job is not."',
    options: [
      { label: 'Pick a pocket', desc: 'Even odds: 70 gold, or the mark fights back.', risky: true,
        apply: (_r, api) => { if (api.rng.chance(0.5)) { api.gold(70); return 'A fat purse, and nobody the wiser.'; } api.fightAct('normal'); return 'The mark has friends.'; } },
      { label: 'Buy a trick (40 gold)', desc: 'Add a random Reaction from your factions to your deck and upgrade it.', can: gold(40),
        apply: (r, api) => { pay(r, 40); const id = api.randomCard({ type: 'reaction' }); if (!id) return 'They have nothing your style.'; api.addToDeck(id); const c = r.deck[r.deck.length - 1]; c.up = true; return `They teach you ${CARDS[id].name}+.`; } },
      leave,
    ] },
  { id: 'cartographer', name: 'The Cartographer', icon: '🗺️',
    text: 'An old woman with ink-stained fingers sells maps of places that have not been drawn yet.',
    options: [
      { label: 'Buy a map (30 gold)', desc: 'Every Mystery node left in this act becomes a Treasure, and the Fog lifts.', can: gold(30),
        apply: (r, api) => { pay(r, 30); let n = 0; for (const row of r.map) for (const nd of row) if (nd.type === 'mystery' && (!r.pos || nd.row > r.pos.row)) { nd.type = 'treasure'; n++; } r.fogLifted = r.act; void api; return n ? `She marks ${n} X(s) on the map.` : 'The map is beautiful. It shows no secrets you did not already know.'; } },
      { label: 'Ask for directions', desc: 'Heal 6 HP.', apply: (_r, api) => { api.heal(6); return '"Left at the dead tree." You sit and rest a while.'; } },
    ] },
  { id: 'wounded_knight', name: 'A Wounded Knight', icon: '🛡️',
    text: 'A knight leans against a tree, armour dented, breathing hard. His sword lies in the grass.',
    options: [
      { label: 'Bandage him (lose 5 HP)', desc: 'He blesses you: start your next 3 fights with 8 Guard.', can: hpOk(5),
        apply: (_r, api) => { api.hurt(5); api.buff('shielded', 3); return '"My shield is yours, friend. In spirit."'; } },
      { label: 'Take the sword', desc: 'Add a random rare Attack from your factions and a Regret.',
        apply: (_r, api) => { const id = api.randomCard({ rarity: 'rare', type: 'attack' }); if (id) api.addToDeck(id); api.addToDeck('regret'); return id ? `${CARDS[id].name} is yours. His eyes follow you down the road.` : 'The sword is too heavy to lift.'; } },
      leave,
    ] },
  { id: 'wishing_tree', name: 'The Wishing Tree', icon: '🌳', acts: [1, 2],
    text: 'An oak hung with ribbons, each one a wish. Some of them have come true; you can tell by the knots.',
    options: [
      { label: 'Tie a ribbon', desc: 'Gain 5 Max HP.', apply: (r) => { maxHp(r, 5); return 'You feel sturdier already.'; } },
      { label: 'Shake the tree (lose 4 HP)', desc: 'Gain 2 random Omens.', can: (r) => hpOk(4)(r) && roomForOmen(r),
        apply: (_r, api) => { api.hurt(4); const n = api.gainOmens(2); return `A branch falls on you. So do ${n} Omen(s).`; } },
    ] },
  { id: 'golden_idol', name: 'The Golden Idol', icon: '🗿',
    text: 'On a stone altar, a golden idol the size of a cat. The floor around it is suspiciously well-swept.',
    options: [
      { label: 'Grab it', desc: '+120 gold... and then run.', apply: (_r, api) => { api.gold(120); api.goto('golden_idol_run'); return 'Click. A rumble starts somewhere above you.'; } },
      leave,
    ] },
  { id: 'golden_idol_run', name: 'RUN!', icon: '🪨', kind: 'stage',
    text: 'A boulder the size of a house is rolling down the corridor. You have about two seconds.',
    options: [
      { label: 'Outrun it', desc: 'Lose 12 HP.', apply: (_r, api) => { api.hurt(12); return 'You dive through the door as it slams shut behind you.'; } },
      { label: 'Dive aside', desc: 'Add a Wound to your deck.', apply: (_r, api) => { api.addToDeck('wound'); return 'It thunders past. Your ankle will never be the same.'; } },
      { label: 'Drop the idol', desc: 'Lose the 120 gold. The boulder stops.', apply: (r) => { pay(r, 120); return 'The boulder grinds to a halt. Of course it does.'; } },
    ] },
  { id: 'weather_witch', name: 'The Weather Witch', icon: '🌦️',
    text: 'A witch on a rooftop stirs the clouds with a ladle. "Don\'t like the weather? Neither do I."',
    options: [
      { label: 'Change the sky (25 gold)', desc: 'Reroll this act\'s Sky.', can: gold(25),
        apply: (r, api) => { pay(r, 25); const cur = r.skies?.[r.act - 1]; const opts = SKIES.filter((s) => s.id !== cur); const s = api.rng.pick(opts); (r.skies ??= [])[r.act - 1] = s.id; return `She flicks the ladle. ${s.icon} ${s.name}: ${s.text}`; } },
      { label: 'Ask for sunshine', desc: 'Heal 8 HP.', apply: (_r, api) => { api.heal(8); return 'A warm beam of light finds you, and only you.'; } },
    ] },
  { id: 'fork_road', name: 'A Fork in the Road', icon: '🪧',
    text: 'Two roads. One has hoofprints and a smell of smoke. The other has a sign: TOLL BRIDGE, HONEST RATES.',
    options: [
      { label: 'The smoky road', desc: 'A normal fight with a rare card reward.', apply: (_r, api) => { api.fightAct('normal', { rare: true }); return 'Bandits round the campfire. They have something good.'; } },
      { label: 'The toll bridge (lose 6 HP)', desc: 'Gain 50 gold. (The troll is honest. The bridge is not.)', can: hpOk(6),
        apply: (_r, api) => { api.hurt(6); api.gold(50); return 'A plank gives way, but a purse floats up with you.'; } },
    ] },
  { id: 'sparring_ring', name: 'The Sparring Ring', icon: '🥊',
    text: 'A roped-off ring and a crowd. "Fresh blood! Who\'ll take on the champ?"',
    options: [
      { label: 'Step in', desc: 'Upgrade 2 random cards for the practice, then fight.', apply: (_r, api) => { api.upgradeRandom(2); api.fightAct('normal'); return 'The crowd roars.'; } },
      { label: 'Place a bet (20 gold)', desc: '50%: win 50 gold.', can: gold(20), risky: true,
        apply: (r, api) => { pay(r, 20); if (api.rng.chance(0.5)) { api.gold(50); return 'Your fighter wins!'; } return 'Your fighter goes down in the first round.'; } },
      leave,
    ] },
  { id: 'bone_dice', name: 'The Bone Dice', icon: '🎲',
    text: 'Two dice carved from knucklebones sit on a stump. They are warm. "Roll us," they whisper.',
    options: [
      { label: 'Roll (lose 3 HP)', desc: 'Something random happens, good or bad. You can roll again.', can: hpOk(3), risky: true,
        apply: (r, api) => {
          api.hurt(3);
          const d = api.rng.int(1, 6);
          let msg = '';
          if (d === 1) { api.addToDeck('wound'); msg = '⚀ A Wound.'; }
          if (d === 2) { api.gold(25); msg = '⚁ 25 gold.'; }
          if (d === 3) { api.heal(12); msg = '⚂ You heal 12.'; }
          if (d === 4) { api.upgradeRandom(1); msg = '⚃ A card is upgraded.'; }
          if (d === 5) { api.gainOmens(1); msg = '⚄ An Omen.'; }
          if (d === 6) { msg = `⚅ ${api.gainRandomRelic()}!`; }
          r.evPot = (r.evPot ?? 0) + 1;
          if ((r.evPot ?? 0) < 3 && r.hp > 3) api.goto('bone_dice'); else r.evPot = 0;
          return msg;
        } },
      leave,
    ] },
  { id: 'prisoner', name: 'The Prisoner', icon: '⛓️',
    text: 'A cart with a cage on it, two bored guards, and inside, a duelist who mouths: "Help me."',
    options: [
      { label: 'Free them', desc: 'Fight the guards. The prisoner pays you in rare cards.', apply: (_r, api) => { api.fightAct('normal', { rare: true }); return 'You step out into the road.'; } },
      leave,
    ] },
  { id: 'camp_cook', name: 'The Camp Cook', icon: '🍲',
    text: 'A cheerful cook ladles out something brown. "Stew\'s free. The special is... special."',
    options: [
      { label: 'Eat the stew', desc: 'Well Fed for 3 fights: start with 4 Guard and heal 2 after each.', apply: (_r, api) => { api.buff('wellfed', 3); return 'It is surprisingly good.'; } },
      { label: 'Try the special', desc: 'Even odds: +10 Max HP, or a Wound.', risky: true,
        apply: (r, api) => { if (api.rng.chance(0.5)) { maxHp(r, 10); return 'You feel incredible. Unsettlingly incredible.'; } api.addToDeck('wound'); return 'You will not be eating there again.'; } },
    ] },
  { id: 'masquerade', name: 'The Masquerade', icon: '🎭', acts: [2],
    text: 'A ball in a ruined palace. Everyone wears a mask, and nobody asks who you are.',
    options: [
      { label: 'Dance', desc: 'Remove a card from your deck.', pick: 'remove', apply: (_r, api, uid) => { api.removeCard(uid!); return 'You dance until something you were carrying is left behind.'; } },
      { label: 'Steal a mask', desc: 'Gain 2 Omens, then fight the guards.', apply: (_r, api) => { api.gainOmens(2); api.fightAct('normal'); return '"Stop, thief!"'; } },
      leave,
    ] },
  { id: 'tide_pools', name: 'The Tide Pools', icon: '🐚', acts: [2],
    text: 'Low tide leaves a maze of pools full of bright, prickly life, and the glint of something lost overboard.',
    options: [
      { label: 'Search the pools', desc: 'Gain 25 to 60 gold.', apply: (_r, api) => { const g = api.rng.int(25, 60); api.gold(g); return `You find ${g} gold in a rusty tin.`; } },
      { label: 'Wade out to the wreck (lose 6 HP)', desc: 'Gain a random keepsake.', can: hpOk(6), apply: (_r, api) => { api.hurt(6); return `Crabs. So many crabs. But also ${api.gainRandomRelic()}.`; } },
    ] },
  { id: 'abandoned_forge', name: 'The Abandoned Forge', icon: '🔨', acts: [3],
    text: 'A forge still burning in a deserted hall. Tools hang on the wall, waiting for a hand.',
    options: [
      { label: 'Use the anvil', desc: 'Put a random fitting Sigil on a card of your choice.', pick: 'sigil',
        apply: (_r, api, uid) => { const m = api.sigil(uid); return m ? `You hammer ${m} into it.` : 'The iron will not take.'; } },
      { label: 'Temper yourself (lose 8 HP)', desc: 'Start your next 3 fights with 2 Edge.', can: hpOk(8), apply: (_r, api) => { api.hurt(8); api.buff('warpaint', 3); return 'You hold your hand in the flame until you stop flinching.'; } },
      leave,
    ] },
  { id: 'star_chart', name: 'The Star Chart', icon: '✨', acts: [3],
    text: 'An observatory with its roof open to a sky full of falling stars.',
    options: [
      { label: 'Chart the stars', desc: 'Upgrade 2 random cards. Lose 5 HP.', can: hpOk(5), apply: (_r, api) => { api.hurt(5); const n = api.upgradeRandom(2); return `${n} card(s) align.`; } },
      { label: 'Catch a falling star', desc: 'Fight a Wishing Star before it flees.', apply: (_r, api) => { api.rareFight(); return 'One falls right in front of you, sputtering.'; } },
      leave,
    ] },
  { id: 'clockwork_vendor', name: 'The Clockwork Vendor', icon: '⚙️',
    text: 'A brass automaton with a till for a chest. "SALE. SALE. RELICS. SALE."',
    options: [
      { label: 'Buy a rare keepsake (130 gold)', desc: 'Gain a random rare keepsake.', can: gold(130), apply: (r, api) => { pay(r, 130); const n = api.relic('rare'); return n ? `KA-CHING. ${n}.` : 'OUT OF STOCK. NO REFUNDS.'; } },
      { label: 'Buy an uncommon keepsake (75 gold)', desc: 'Gain a random uncommon keepsake.', can: gold(75), apply: (r, api) => { pay(r, 75); const n = api.relic('uncommon'); return n ? `KA-CHING. ${n}.` : 'OUT OF STOCK. NO REFUNDS.'; } },
      leave,
    ] },
  { id: 'ghost_ship', name: 'The Ghost Ship', icon: '👻', acts: [2, 3],
    text: 'A ship sails through the fog a foot above the ground. Its crew waves at you.',
    options: [
      { label: 'Board her', desc: 'Fight the phantom crew for a rare card reward.', apply: (_r, api) => { api.fight(['phantom', 'phantom', 'phantom'], 'normal', { name: 'The Phantom Crew', rare: true }); return '"Welcome aboard!" they wail.'; } },
      { label: 'Wave back', desc: 'Heal 5 HP. It is nice to be noticed.', apply: (_r, api) => { api.heal(5); return 'They seem pleased.'; } },
    ] },
  { id: 'snake_oil', name: 'The Snake Oil Salesman', icon: '🧴',
    text: '"Cures what ails you! Grows hair! Improves your chain!" The bottles are suspiciously cheap.',
    options: [
      { label: 'Buy a tonic (20 gold)', desc: 'It might heal 20, add 4 Max HP, or poison you a little.', can: gold(20), risky: true,
        apply: (r, api) => { pay(r, 20); const x = api.rng.int(0, 2); if (x === 0) { api.heal(20); return 'It works!'; } if (x === 1) { maxHp(r, 4); return 'You feel heartier!'; } api.hurt(5); return 'It does not work.'; } },
      leave,
    ] },
  { id: 'dragon_egg', name: 'The Dragon Egg', icon: '🥚', acts: [3],
    text: 'In a nest of obsidian, an egg as warm as a hearth. Its mother is nowhere to be seen. Yet.',
    options: [
      { label: 'Take the egg', desc: 'Gain a random rare keepsake. Its mother comes after you (a rival fight).',
        apply: (_r, api) => { const n = api.relic('rare'); api.fight(['cinder_wyrm', 'salamander'], 'elite', { name: 'The Mother\'s Wrath' }); return `You stuff ${n ?? 'the egg'} in your pack. Something ROARS.`; } },
      leave,
    ] },
  { id: 'minstrels', name: 'The Minstrels', icon: '🎺',
    text: 'A troupe of minstrels is rehearsing a ballad about a famous duelist. They do not recognise you. Yet.',
    options: [
      { label: 'Request your ballad (15 gold)', desc: 'Start your next 4 fights with 1 Edge.', can: gold(15), apply: (r, api) => { pay(r, 15); api.buff('ballad', 4); return 'They sing of you. It is mostly accurate.'; } },
      { label: 'Join in', desc: 'Gain 20 gold from the crowd.', apply: (_r, api) => { api.gold(20); return 'You cannot sing, but you can collect.'; } },
    ] },
  { id: 'mirror_maze', name: 'The Mirror Maze', icon: '🪞',
    text: 'A hall of mirrors. In each one you hold a different deck, and one of them is smiling.',
    options: [
      { label: 'Find the smiling one', desc: 'Transform 2 random cards into random cards of your factions.',
        apply: (r, api) => { let n = 0; for (let i = 0; i < 2; i++) { const opts = r.deck.filter((c) => CARDS[c.id].type !== 'curse'); if (!opts.length) break; api.transformCard(api.rng.pick(opts).uid); n++; } return `You step out holding ${n} card(s) you do not remember.`; } },
      { label: 'Smash a mirror', desc: 'Remove a card. Gain a Regret.', pick: 'remove', apply: (_r, api, uid) => { api.removeCard(uid!); api.addToDeck('regret'); return 'Seven years starts now.'; } },
      leave,
    ] },
  { id: 'hermit_sage', name: 'The Hermit Sage', icon: '🧙‍♂️',
    text: 'A sage in a cave, surrounded by a single deck of cards worn smooth. "Fewer cards. Better cards."',
    options: [
      { label: 'Learn his way', desc: 'Remove 2 random basic cards from your deck.', can: (r) => r.deck.filter((c) => CARDS[c.id].rarity === 'starter').length >= 2,
        apply: (r, api) => { let n = 0; for (let i = 0; i < 2; i++) { const b = r.deck.filter((c) => CARDS[c.id].rarity === 'starter'); if (!b.length) break; api.removeCard(api.rng.pick(b).uid); n++; } return `You burn ${n} card(s) in his fire. You feel lighter.`; } },
      { label: 'Meditate', desc: 'Heal 12 HP.', apply: (_r, api) => { api.heal(12); return 'An hour passes. Or a day.'; } },
    ] },
  { id: 'arena_pit', name: 'The Fighting Pit', icon: '🏟️', acts: [2, 3],
    text: 'Down a ladder, a pit with sand on the floor and a gate on each side. The crowd above is chanting.',
    options: [
      { label: 'Fight for the crowd', desc: 'A rival fight. Win a keepsake and 50 extra gold.', apply: (_r, api) => { api.buff('bounty', 1); api.fightAct('elite'); return 'The gate rises.'; } },
      leave,
    ] },
  { id: 'ink_well', name: 'The Inkwell of Fate', icon: '🖋️',
    text: 'A pot of ink with a quill already in it. Whatever you write in the margin of your story, happens.',
    options: [
      { label: 'Write a new Fate', desc: 'Replace your Fate with a random new one.', apply: (r, api) => { api.newFate(); const f = r.fate ? FATE_MAP[r.fate] : null; return f ? `${f.icon} ${f.name}: ${f.text}` : 'The ink runs dry.'; } },
      { label: 'Blot out a mistake', desc: 'Remove a jinx from your deck.', can: hasCurse,
        apply: (r, api) => { const c = r.deck.find((x) => CARDS[x.id].type === 'curse'); if (c) api.removeCard(c.uid); return 'The page is clean again.'; } },
      leave,
    ] },

  // ═════════ SHRINES (shrine nodes) ═════════
  { id: 'shrine_blades', name: 'Shrine of Blades', icon: '⚔️', kind: 'shrine',
    text: 'A circle of swords driven into the earth, points down. The air hums.',
    options: [
      { label: 'Kneel', desc: 'Upgrade 2 random Attacks.', apply: (r, api) => { const n = upType(r, api, 'attack', 2); return `${n} Attack(s) are honed.`; } },
      { label: 'Offer blood (lose 6 HP)', desc: 'Start your next 3 fights with 2 Edge.', can: hpOk(6), apply: (_r, api) => { api.hurt(6); api.buff('warpaint', 3); return 'The swords drink, and so does your rage.'; } },
    ] },
  { id: 'shrine_shield', name: 'Shrine of the Shield', icon: '🛡️', kind: 'shrine',
    text: 'A great shield set into a stone wall, polished by a thousand hands.',
    options: [
      { label: 'Touch the shield', desc: 'Upgrade 2 random Tricks.', apply: (r, api) => { const n = upType(r, api, 'skill', 2); return `${n} Trick(s) harden.`; } },
      { label: 'Pray for protection', desc: 'Start your next 4 fights with 8 Guard.', apply: (_r, api) => { api.buff('shielded', 4); return 'You feel watched over.'; } },
    ] },
  { id: 'shrine_snare', name: 'Shrine of the Snare', icon: '🪤', kind: 'shrine',
    text: 'A shrine to the patron of the patient: a statue holding a single face-down card.',
    options: [
      { label: 'Meditate', desc: 'Upgrade 2 random Reactions.', apply: (r, api) => { const n = upType(r, api, 'reaction', 2); return `${n} Reaction(s) wait a little more cleverly.`; } },
      { label: 'Take the statue\'s card', desc: 'Add a random uncommon Reaction from your factions.',
        apply: (_r, api) => { const id = api.randomCard({ rarity: 'uncommon', type: 'reaction' }); if (id) api.addToDeck(id); return id ? `It is ${CARDS[id].name}.` : 'The card crumbles.'; } },
    ] },
  { id: 'wheel_fortune', name: 'The Wheel of Fortune', icon: '🎡', kind: 'shrine',
    text: 'A great wooden wheel painted with eight fates. A sign: ONE SPIN PER CUSTOMER. NO EXCEPTIONS.',
    options: [
      { label: 'Spin the wheel', desc: 'One of eight fates. Most of them are good.', risky: true,
        apply: (r, api) => {
          const x = api.rng.int(0, 7);
          if (x === 0) { api.gold(100); return '💰 100 gold!'; }
          if (x === 1) return `💎 ${api.gainRandomRelic()}!`;
          if (x === 2) { r.hp = r.maxHp; return '❤️ Fully healed!'; }
          if (x === 3) { const n = api.upgradeRandom(3); return `⬆️ ${n} cards upgraded!`; }
          if (x === 4) { api.hurt(10); return '💥 The wheel flies off its axle. Lose 10 HP.'; }
          if (x === 5) { api.addToDeck('regret'); return '😞 A Regret.'; }
          if (x === 6) { const n = api.gainOmens(2); return `🔮 ${n} Omen(s)!`; }
          const b = r.deck.filter((c) => CARDS[c.id].rarity === 'starter');
          if (b.length) { const c = api.rng.pick(b); api.removeCard(c.uid); return `✂️ Your ${CARDS[c.id].name} is cut from your deck.`; }
          api.gold(50); return '💰 50 gold.';
        } },
      leave,
    ] },
  { id: 'shrine_purity', name: 'Shrine of Purity', icon: '💧', kind: 'shrine',
    text: 'Clear water runs over white stones. Things that are dropped in it are never seen again.',
    options: [
      { label: 'Cleanse', desc: 'Remove a card from your deck.', pick: 'remove', apply: (_r, api, uid) => { api.removeCard(uid!); return 'The water carries it away.'; } },
      { label: 'Purge every jinx (lose 5 Max HP)', desc: 'Remove every jinx in your deck.', can: hasCurse,
        apply: (r) => { const n = r.deck.filter((c) => CARDS[c.id].type === 'curse').length; r.deck = r.deck.filter((c) => CARDS[c.id].type !== 'curse'); maxHp(r, -5); return `${n} jinx(es) dissolve.`; } },
    ] },
  { id: 'shrine_echo', name: 'Shrine of Echoes', icon: '🔁', kind: 'shrine',
    text: 'You speak, and the shrine says it back, a little louder.',
    options: [
      { label: 'Speak a card\'s name (lose 7 HP)', desc: 'Duplicate a card in your deck.', pick: 'duplicate', can: hpOk(7),
        apply: (_r, api, uid) => { api.hurt(7); api.duplicateCard(uid!); return 'The echo takes shape in your hand.'; } },
      leave,
    ] },
  { id: 'shrine_change', name: 'Shrine of Change', icon: '🦋', kind: 'shrine',
    text: 'A cocoon the size of a door, slowly turning. It accepts offerings.',
    options: [
      { label: 'Offer a card', desc: 'Transform a card, then upgrade the result.', pick: 'transform',
        apply: (r, api, uid) => { const n = api.transformCard(uid!); const c = r.deck[r.deck.length - 1]; if (c) c.up = true; return `It emerges as ${n}+.`; } },
      { label: 'Offer two at random', desc: 'Transform 2 random cards.',
        apply: (r, api) => { let k = 0; for (let i = 0; i < 2; i++) { const o = r.deck.filter((c) => CARDS[c.id].type !== 'curse'); if (!o.length) break; api.transformCard(api.rng.pick(o).uid); k++; } return `${k} card(s) emerge, changed.`; } },
    ] },
  { id: 'shrine_fates', name: 'Shrine of Fates', icon: '🎴', kind: 'shrine',
    text: 'Three cards float above an altar, turning slowly. Each is a life you could have lived.',
    options: [
      { label: 'Draw a new Fate', desc: 'Replace your Fate with a random new one.', apply: (r, api) => { api.newFate(); const f = r.fate ? FATE_MAP[r.fate] : null; return f ? `${f.icon} ${f.name}: ${f.text}` : 'The cards fall still.'; } },
      { label: 'Pray', desc: 'Heal 10 HP.', apply: (_r, api) => { api.heal(10); return 'Peace, for a moment.'; } },
    ] },
  { id: 'shrine_stars', name: 'Shrine of Stars', icon: '⭐', kind: 'shrine',
    text: 'A dome painted with constellations, some of which move when you are not looking.',
    options: [
      { label: 'Pray to the stars', desc: 'Gain 2 random Omens.', can: roomForOmen, apply: (_r, api) => { const n = api.gainOmens(2); return `${n} star(s) fall into your hand.`; } },
      { label: 'Offer an Omen', desc: 'Give up your oldest Omen for a random keepsake.', can: (r) => (r.omens ?? []).length > 0,
        apply: (r, api) => { r.omens!.shift(); return `The stars accept. ${api.gainRandomRelic()} appears on the altar.`; } },
    ] },
  { id: 'shrine_bones', name: 'The Bone Shrine', icon: '💀', kind: 'shrine',
    text: 'An altar of skulls, each with a card in its teeth. "A little life," they chatter, "for a lot of power."',
    options: [
      { label: 'Offer life (lose 8 Max HP)', desc: 'Choose 1 of 3 rare cards.', can: (r) => r.maxHp > 28, apply: (r, api) => { maxHp(r, -8); api.offerCards('rare'); return 'The skulls open their jaws.'; } },
      leave,
    ] },
  { id: 'shrine_flame', name: 'The Eternal Flame', icon: '🕯️', kind: 'shrine',
    text: 'A flame that has burned for a thousand years in a niche in the rock. It is very warm.',
    options: [
      { label: 'Warm yourself', desc: 'Heal 20% of your Max HP.', apply: (r, api) => { api.heal(Math.round(r.maxHp * 0.2)); return 'The cold goes out of your bones.'; } },
      { label: 'Burn a card', desc: 'Remove a card and gain 25 gold.', pick: 'remove', apply: (_r, api, uid) => { api.removeCard(uid!); api.gold(25); return 'The flame flares and leaves a coin behind.'; } },
    ] },
  { id: 'shrine_anvil', name: 'The Anvil Shrine', icon: '⚒️', kind: 'shrine',
    text: 'A black anvil on a plinth, ringing faintly by itself.',
    options: [
      { label: 'Strike the anvil', desc: 'Put a random fitting Sigil on a card of your choice.', pick: 'sigil',
        apply: (_r, api, uid) => { const m = api.sigil(uid); return m ? `It rings, and the card takes ${m}.` : 'Nothing rings.'; } },
      { label: 'Strike it twice (lose 6 HP)', desc: 'Two random cards get random Sigils.', can: hpOk(6),
        apply: (_r, api) => { api.hurt(6); const a = api.sigil(); const b = api.sigil(); return [a, b].filter(Boolean).length ? `Sparks fly: ${[a, b].filter(Boolean).join(' and ')}.` : 'Sparks, and nothing else.'; } },
    ] },

  // ═════════ ROADSIDE ENCOUNTERS (pop up on the way to a node) ═════════
  { id: 'w_purse', name: 'A Dropped Purse', icon: '👛', kind: 'wayside', text: 'A purse lies in the road, still warm from someone\'s pocket.',
    options: [
      { label: 'Pick it up', desc: 'Gain 12 to 25 gold.', apply: (_r, api) => { const g = api.rng.int(12, 25); api.gold(g); return `${g} gold. Finders keepers.`; } },
      { label: 'Leave it', desc: 'Someone will come back for it.', apply: (_r, api) => { if (api.rng.chance(0.3)) { api.heal(4); return 'You feel good about yourself (+4 HP).'; } return 'You walk on.'; } },
    ] },
  { id: 'w_cat', name: 'A Black Cat', icon: '🐈‍⬛', kind: 'wayside', text: 'A black cat crosses your path, stops, and stares at you.',
    options: [
      { label: 'Pet it', desc: 'Even odds: an Omen, or a scratch (lose 3 HP).', risky: true,
        apply: (_r, api) => { if (api.rng.chance(0.5)) { api.gainOmens(1); return 'It purrs and leaves a tarot card at your feet.'; } api.hurt(3); return 'It scratches you and leaves.'; } },
      onward,
    ] },
  { id: 'w_peddler', name: 'A Hurried Peddler', icon: '🧳', kind: 'wayside', text: 'A peddler jogs past with a pack bigger than he is. "No time! Quick sale!"',
    options: [
      { label: 'Buy an Omen (25 gold)', desc: 'A random Omen.', can: (r) => gold(25)(r) && roomForOmen(r), apply: (r, api) => { pay(r, 25); api.gainOmens(1); return 'He tosses it over his shoulder.'; } },
      { label: 'Buy a card (30 gold)', desc: 'A random common card from your factions.', can: gold(30),
        apply: (r, api) => { pay(r, 30); const id = api.randomCard({ rarity: 'common' }); if (id) api.addToDeck(id); return id ? `${CARDS[id].name}.` : 'He is gone before you can pay.'; } },
      onward,
    ] },
  { id: 'w_ambush', name: 'Ambush!', icon: '🗡️', kind: 'wayside', text: 'Figures leap from the hedges! No time to think.',
    options: [
      { label: 'Fight!', desc: 'A quick fight, then on to where you were going.', apply: (_r, api) => { api.fightAct('easy'); return 'Cards out!'; } },
      { label: 'Run (lose 6 HP)', desc: 'Lose 6 HP.', can: hpOk(6), apply: (_r, api) => { api.hurt(6); return 'You get away, mostly.'; } },
    ] },
  { id: 'w_glint', name: 'A Glint in the Grass', icon: '✨', kind: 'wayside', text: 'Something small and golden bolts across the road.',
    options: [
      { label: 'Give chase', desc: 'Fight a rare monster before it gets away.', apply: (_r, api) => { api.rareFight(); return 'After it!'; } },
      { label: 'Let it go', desc: 'Some things are meant to run.', apply: () => 'It is gone.' },
    ] },
  { id: 'w_shortcut', name: 'A Hidden Shortcut', icon: '🛤️', kind: 'wayside', text: 'A gap in the hedge. Through it, you can see you could skip the next stretch entirely.',
    options: [
      onward,
      { label: 'Take the shortcut', desc: 'Skip what waits at this node entirely (good or bad) and gain 10 gold.', apply: (r, api) => { r.wayside = null; api.gold(10); return 'You slip through and find a coin on the way.'; } },
    ] },
  { id: 'w_rain', name: 'A Sudden Downpour', icon: '🌧️', kind: 'wayside', text: 'The sky opens.',
    options: [
      { label: 'Shelter under a tree', desc: 'Heal 5 HP.', apply: (_r, api) => { api.heal(5); return 'You wait it out.'; } },
      { label: 'Press on', desc: 'Gain 8 gold you find in a puddle.', apply: (_r, api) => { api.gold(8); return 'Soaked, but richer.'; } },
    ] },
  { id: 'w_bard', name: 'A Travelling Bard', icon: '🎻', kind: 'wayside', text: 'A bard falls in step beside you. "A song for the road? Ten gold."',
    options: [
      { label: 'Pay for a song (10 gold)', desc: 'Start your next 3 fights with 1 Edge.', can: gold(10), apply: (r, api) => { pay(r, 10); api.buff('ballad', 3); return 'It is a song about you. It is very flattering.'; } },
      onward,
    ] },
  { id: 'w_mushrooms', name: 'Glowing Mushrooms', icon: '🍄', kind: 'wayside', text: 'A patch of mushrooms that glow a cheerful blue.',
    options: [
      { label: 'Eat one', desc: 'Even odds: heal 12, or lose 4 HP.', risky: true,
        apply: (_r, api) => { if (api.rng.chance(0.5)) { api.heal(12); return 'Tingly and delicious.'; } api.hurt(4); return 'Your tongue goes numb.'; } },
      { label: 'Pick some to sell', desc: 'Gain 10 gold.', apply: (_r, api) => { api.gold(10); return 'An apothecary will want these.'; } },
    ] },
  { id: 'w_shrine', name: 'A Roadside Shrine', icon: '⛩️', kind: 'wayside', text: 'A tiny shrine with a bowl of coins and fresh flowers.',
    options: [
      { label: 'Pray', desc: 'Heal 6 HP.', apply: (_r, api) => { api.heal(6); return 'A moment of quiet.'; } },
      { label: 'Leave a coin (5 gold)', desc: 'Blessed: draw 2 extra cards on turn 1 of your next 2 fights.', can: gold(5), apply: (r, api) => { pay(r, 5); api.buff('blessed', 2); return 'The flowers brighten.'; } },
    ] },
  { id: 'w_beggar', name: 'An Old Beggar', icon: '🙏', kind: 'wayside', text: '"Spare a coin for an old duelist?"',
    options: [
      { label: 'Give 10 gold', desc: 'Gain 3 Max HP. Karma.', can: gold(10), apply: (r) => { pay(r, 10); maxHp(r, 3); return '"Bless you." You feel it.'; } },
      onward,
    ] },
  { id: 'w_troll', name: 'The Bridge Troll', icon: '🧌', kind: 'wayside', acts: [1, 2], text: 'A troll under a bridge. "Toll is fifteen. Or a fight. Troll likes fights."',
    options: [
      { label: 'Pay (15 gold)', desc: 'Lose 15 gold.', can: gold(15), apply: (r) => { pay(r, 15); return '"Troll thanks you."'; } },
      { label: 'Fight the troll', desc: 'A normal fight against the Bridge Troll.', apply: (_r, api) => { api.fight(['bridge_troll'], 'normal', { name: 'The Bridge Troll' }); return '"TROLL LIKES FIGHTS!"'; } },
    ] },
  { id: 'w_campfire', name: 'An Empty Campfire', icon: '🔥', kind: 'wayside', text: 'Someone else\'s campfire, still burning, with a pack beside it.',
    options: [
      { label: 'Sit a while', desc: 'Heal 8 HP.', apply: (_r, api) => { api.heal(8); return 'You warm your hands.'; } },
      { label: 'Raid the pack', desc: 'Gain 30 gold and a Regret.', apply: (_r, api) => { api.gold(30); api.addToDeck('regret'); return 'You hear someone shout behind you.'; } },
    ] },
  { id: 'w_crow', name: 'A Talking Crow', icon: '🐦‍⬛', kind: 'wayside', text: '"Shiny?" asks the crow. "Shiny for secret?"',
    options: [
      { label: 'Give a shiny (10 gold)', desc: 'The crow lifts the Fog for this act and tells you where the Mysteries lead.', can: gold(10),
        apply: (r) => { pay(r, 10); r.fogLifted = r.act; return '"Caw! Look, look!" The map makes sense now.'; } },
      onward,
    ] },
  { id: 'w_card', name: 'A Card in the Mud', icon: '🃏', kind: 'wayside', text: 'A card, face-down in the mud. It looks like one of yours.',
    options: [
      { label: 'Pick it up', desc: 'Add a random common card from your factions.', apply: (_r, api) => { const id = api.randomCard({ rarity: 'common' }); if (id) api.addToDeck(id); return id ? `${CARDS[id].name}. A little muddy.` : 'It is blank.'; } },
      { label: 'Leave it', desc: 'Keep your deck lean.', apply: () => 'You step over it.' },
    ] },
  { id: 'w_wolves', name: 'Howling', icon: '🐺', kind: 'wayside', acts: [1], text: 'Howls on both sides of the road. They are getting closer.',
    options: [
      { label: 'Stand and fight', desc: 'Fight two Grey Wolves.', apply: (_r, api) => { api.fight(['grey_wolf', 'grey_wolf'], 'normal', { name: 'The Wolves' }); return 'Eyes in the dark.'; } },
      { label: 'Climb a tree (lose 5 HP)', desc: 'Lose 5 HP.', can: hpOk(5), apply: (_r, api) => { api.hurt(5); return 'You scrape your way up and wait for dawn.'; } },
    ] },
  { id: 'w_lightning', name: 'Lightning!', icon: '⚡', kind: 'wayside', text: 'A bolt of lightning splits the tree beside you.',
    options: [
      { label: 'Duck', desc: 'Lose 4 HP.', apply: (_r, api) => { api.hurt(4); return 'Your hair is standing on end.'; } },
      { label: 'Catch the spark (lose 8 HP)', desc: 'Upgrade 2 random Attacks.', can: hpOk(8), apply: (r, api) => { api.hurt(8); const n = upType(r, api, 'attack', 2); return `It hurts. ${n} Attack(s) crackle.`; } },
    ] },
  { id: 'w_spring', name: 'A Clear Spring', icon: '💧', kind: 'wayside', text: 'Cold, clear water bubbling up between rocks.',
    options: [{ label: 'Drink', desc: 'Heal 10 HP.', apply: (_r, api) => { api.heal(10); return 'Delicious.'; } }] },
  { id: 'w_tinker', name: "A Tinker's Cart", icon: '🔧', kind: 'wayside', text: 'A tinker with a cart of whetstones. "Sharpen anything for twenty."',
    options: [
      { label: 'Sharpen a card (20 gold)', desc: 'Upgrade a card.', pick: 'upgrade', can: gold(20),
        apply: (r, _api, uid) => { pay(r, 20); const c = r.deck.find((x) => x.uid === uid); if (c) c.up = true; return 'Good as new. Better.'; } },
      onward,
    ] },
  { id: 'w_gambler', name: 'A Street Gambler', icon: '🎲', kind: 'wayside', text: '"Find the lady! Fifteen gets you thirty-five!"',
    options: [
      { label: 'Bet 15 gold', desc: '55% to win 35 gold.', can: gold(15), risky: true,
        apply: (r, api) => { pay(r, 15); if (api.rng.chance(0.55)) { api.gold(35); return 'There she is!'; } return 'She was never under any of them.'; } },
      onward,
    ] },
  { id: 'w_ghost', name: 'A Friendly Ghost', icon: '👻', kind: 'wayside', text: 'A ghost drifts alongside you, humming. "I used to be a duelist, you know."',
    options: [
      { label: 'Listen to its stories', desc: 'Upgrade a random card.', apply: (_r, api) => { api.upgradeRandom(1); return 'It shows you an old trick.'; } },
      { label: 'Ask for a keepsake', desc: 'Gain a random Omen.', can: roomForOmen, apply: (_r, api) => { api.gainOmens(1); return 'It gives you a card it can no longer hold.'; } },
    ] },
  { id: 'w_pickpocket', name: 'A Pickpocket!', icon: '🐭', kind: 'wayside', text: 'Something tugs at your belt. A rat in a tiny waistcoat is running off with your purse!',
    options: [
      { label: 'Chase it', desc: 'Fight two Pickpocket Rats.', apply: (_r, api) => { api.fight(['pickpocket_rat', 'pickpocket_rat'], 'normal', { name: 'Stop, Thief!' }); return 'Get back here!'; } },
      { label: 'Let it go', desc: 'Lose 15 gold.', apply: (r) => { pay(r, 15); return 'It was only money.'; } },
    ] },
  { id: 'w_meteor', name: 'A Falling Star', icon: '☄️', kind: 'wayside', text: 'A star falls, close enough to hear it hiss.',
    options: [{ label: 'Make a wish', desc: 'Gain a random Omen and heal 5 HP.', apply: (_r, api) => { api.gainOmens(1); api.heal(5); return 'You will not say what you wished for.'; } }] },
  { id: 'w_herbs', name: 'Wild Herbs', icon: '🌿', kind: 'wayside', text: 'Feverfew, comfrey and something that smells of lemons.',
    options: [{ label: 'Gather them', desc: 'Heal 8 HP.', apply: (_r, api) => { api.heal(8); return 'You chew a leaf. Better.'; } }, onward] },
  { id: 'w_trap', name: 'An Old Trap', icon: '🪤', kind: 'wayside', text: 'A rusty mechanism half-buried by the road. Still armed.',
    options: [
      { label: 'Disarm it (lose 3 HP)', desc: 'Add a random Reaction from your factions.', can: hpOk(3),
        apply: (_r, api) => { api.hurt(3); const id = api.randomCard({ type: 'reaction' }); if (id) api.addToDeck(id); return id ? `You learn something from it: ${CARDS[id].name}.` : 'It snaps shut on nothing.'; } },
      { label: 'Step around it', desc: 'Nothing happens.', apply: () => 'Carefully.' },
    ] },
  { id: 'w_knight', name: 'A Knight Errant', icon: '🐎', kind: 'wayside', text: 'A knight reins in. "Spar with me, stranger? It has been a dull road."',
    options: [
      { label: 'Spar (lose 6 HP)', desc: 'Upgrade 2 random cards.', can: hpOk(6), apply: (_r, api) => { api.hurt(6); const n = api.upgradeRandom(2); return `A good bout. ${n} card(s) improve.`; } },
      { label: 'Salute', desc: 'Nothing happens.', apply: () => 'He salutes back and rides on.' },
    ] },
  { id: 'w_cache', name: 'A Hidden Cache', icon: '📦', kind: 'wayside', text: 'A loose stone in a wall, and behind it, a smuggler\'s cache.',
    options: [
      { label: 'Take the coins', desc: 'Gain 30 gold.', apply: (_r, api) => { api.gold(30); return 'Thirty gold.'; } },
      { label: 'Take the card', desc: 'Gain a random Omen.', can: roomForOmen, apply: (_r, api) => { api.gainOmens(1); return 'A tarot card wrapped in oilcloth.'; } },
    ] },
  { id: 'w_imp', name: 'A Mischievous Imp', icon: '😈', kind: 'wayside', text: 'An imp hops onto your shoulder. "Prank? Prank! Let me do a prank!"',
    options: [
      { label: 'Let it', desc: 'Something random: a transform, 25 gold, or a Blot on your luck.', risky: true,
        apply: (r, api) => { const x = api.rng.int(0, 2); if (x === 0) { const o = r.deck.filter((c) => CARDS[c.id].type !== 'curse'); if (o.length) return `Poof! A card becomes ${api.transformCard(api.rng.pick(o).uid)}.`; } if (x === 1) { api.gold(25); return 'It pulls 25 gold out of your ear.'; } api.buff('hexed', 2); return 'It giggles and hexes you (start your next 2 fights with Shaken).'; } },
      { label: 'Shoo it (lose 3 HP)', desc: 'It bites.', apply: (_r, api) => { api.hurt(3); return 'Ow.'; } },
    ] },
  { id: 'w_fair', name: 'A Tiny Fair', icon: '🎠', kind: 'wayside', acts: [2, 3], text: 'A carousel and three stalls in a field.',
    options: [
      { label: 'Ring toss (10 gold)', desc: '40%: an Omen and 20 gold.', can: gold(10), risky: true,
        apply: (r, api) => { pay(r, 10); if (api.rng.chance(0.4)) { api.gainOmens(1); api.gold(20); return 'Ringer!'; } return 'Bounces off.'; } },
      { label: 'Ride the carousel', desc: 'Heal 6 HP.', apply: (_r, api) => { api.heal(6); return 'Round and round.'; } },
    ] },
  { id: 'w_fog', name: 'Lost in the Fog', icon: '🌫️', kind: 'wayside', text: 'The fog comes down so thick you cannot see your hand.',
    options: [
      { label: 'Wander', desc: 'Stumble into a random event.', risky: true, apply: (_r, api) => { api.randomEvent(); return 'You wander...'; } },
      { label: 'Wait it out', desc: 'Heal 4 HP.', apply: (_r, api) => { api.heal(4); return 'It lifts after an hour.'; } },
    ] },
  { id: 'w_well', name: 'A Dry Well', icon: '🪣', kind: 'wayside', text: 'A dry well. At the bottom, something glitters.',
    options: [
      { label: 'Climb down', desc: 'Even odds: 45 gold, or a fall (lose 6 HP).', risky: true,
        apply: (_r, api) => { if (api.rng.chance(0.5)) { api.gold(45); return 'Old coins!'; } api.hurt(6); return 'The rope breaks.'; } },
      onward,
    ] },
  { id: 'w_scholar', name: 'A Wandering Scholar', icon: '🧐', kind: 'wayside', text: '"Fascinating deck. May I? I have a card you might prefer."',
    options: [
      { label: 'Swap a basic card', desc: 'A random starter card becomes a random common or uncommon.', can: (r) => r.deck.some((c) => CARDS[c.id].rarity === 'starter'),
        apply: (r, api) => { const c = api.rng.pick(r.deck.filter((x) => CARDS[x.id].rarity === 'starter')); const n = api.transformCard(c.uid); return `Your ${CARDS[c.id].name} becomes ${n}.`; } },
      onward,
    ] },
  { id: 'w_bounty', name: 'A Bounty Poster', icon: '📜', kind: 'wayside', text: 'WANTED: ANY ELITE. DEAD OR DEAD. REWARD: 50 GOLD.',
    options: [
      { label: 'Take the poster', desc: 'Your next rival pays 50 extra gold.', apply: (_r, api) => { api.buff('bounty', 1); return 'You fold it into your pocket.'; } },
      onward,
    ] },
  { id: 'w_caravan', name: 'A Merchant Caravan', icon: '🛒', kind: 'wayside', text: 'A caravan rests by a well. The merchants wave you over.',
    options: [
      { label: 'Trade stories', desc: 'Gain 15 gold and heal 4 HP.', apply: (_r, api) => { api.gold(15); api.heal(4); return 'Tea, gossip and a few coins.'; } },
      { label: 'Guard them (a fight)', desc: 'Fight off raiders for a rare card reward.', apply: (_r, api) => { api.fightAct('easy', { rare: true }); return 'Raiders on the ridge!'; } },
    ] },
  { id: 'w_statue', name: 'A Weeping Statue', icon: '🗽', kind: 'wayside', text: 'A statue of a duelist, with real tears running down its cheeks.',
    options: [
      { label: 'Wipe its tears', desc: 'Remove a jinx from your deck.', can: hasCurse,
        apply: (r, api) => { const c = r.deck.find((x) => CARDS[x.id].type === 'curse'); if (c) api.removeCard(c.uid); return 'It smiles. Something leaves you.'; } },
      onward,
    ] },
];

export const FATE_IDS = FATES.map((f) => f.id);
