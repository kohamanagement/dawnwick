// Rules tests: `npm test`
import { CUT12, CUT12_TWIN } from '../src/data/cuts12';
import assert from 'node:assert/strict';
import { Combat, Ctx } from '../src/engine/combat';
import { newRun, startCombat, travel, reachable, finishCombat, nodeAt } from '../src/engine/run';
import type { RunState } from '../src/engine/types';
import { botStep } from './bot';
import { newProfile } from '../src/engine/meta';
import * as eco from '../src/engine/economy';
import { rewardPool, CARDS } from '../src/data/cards';
import { DARE_PAYOUT } from '../src/data/dares';
import { encodeDeck, decodeDeck, arenaStart, arenaPick, arenaDuel, arenaResolve, arenaSpoil, arenaClaim, ARENA_PICKS } from '../src/engine/arena';
import { actEnc } from '../src/engine/run';
import { gainOmen, omenCap } from '../src/data/omens';
import { migrate, weeklySetup, scrubRun } from '../src/engine/meta';
import { redundantPairs } from './audit';
import { GEN_CHANGES } from '../src/data/cardgen';
import { heatOf } from '../src/data/vows';
import { botTurn } from './bot';
import { enterEpilogue, EPILOGUE_CHAMPS } from '../src/engine/run';
import { WANDERING_BOSSES } from '../src/data/enemies';
import { PUZZLES } from '../src/data/puzzles';
import { RIDDLE_COUNT } from '../src/data/achievements';
import { puzzleRun, recordSolve } from '../src/engine/puzzle';
import { solve, naive } from './solver';
import { nextAct, choosePatron, descendNight, nightOf, proceed } from '../src/engine/run';
import { VENUES } from '../src/data/venues';
import { ART_ICON } from '../src/ui/art';
import { RELICS } from '../src/data/relics';

import { DIFFICULTY } from '../src/data/difficulty';
import { UNLOCKS, STARTING_CHARS, APP_VERSION } from '../src/engine/meta';

import { readFileSync } from 'node:fs';
import { restHealAmount, restHeal } from '../src/engine/run';
import { WILDS } from '../src/data/wilds';
import { ELEMENTS } from '../src/data/elements';
import { COUNTERS } from '../src/engine/combat';
// v0.6 randomness (Skies, Surprises, roadside encounters) is off for the exact rules tests; the v0.6 tests turn it on.
WILDS.on = false;
// v0.7 elements and elite Rebuttals are off for the exact v0.1–v0.6 rules tests; the v0.7 tests turn them on.
ELEMENTS.on = false;
COUNTERS.rebut = false;
// v0.8 base difficulty is off for the exact rules tests.
DIFFICULTY.on = false;

let passed = 0;
function test(name: string, fn: () => void): void {
  try { fn(); passed++; console.log(`ok  ${name}`); } catch (e) { console.error(`FAIL ${name}`); throw e; }
}

function fight(enemies: string[], deckIds: string[], seed = 1): { run: RunState; cb: Combat } {
  const run = newRun({ character: 'duelist', ascension: 0, seed, level: 10, echoes: [] });
  run.deck = deckIds.map((id, i) => ({ uid: 1000 + i, id, up: false }));
  run.relics = [];
  const cb = startCombat(run, { id: 't', name: 'Test', enemies }, 'normal');
  return { run, cb };
}

test('enemy trap answers an attack before it lands (LIFO)', () => {
  const { cb } = fight(['bramble_beetle'], Array(10).fill('strike'));
  const e = cb.s.enemies[0];
  e.traps = [cb.mkCard('spike_shell')];
  const hp = e.hp;
  cb.play(cb.s.hand[0].uid, 0);
  // Spike Shell gives 6 Block first, so a 6-damage Strike does nothing to HP.
  assert.equal(e.hp, hp);
  assert.equal(e.traps.length, 0);
  assert.equal(cb.s.stats.maxChain, 2);
});

test('counter-trap negates the trap, then the attack lands (3-link chain)', () => {
  const { cb } = fight(['bramble_beetle'], ['mirror_tide', ...Array(9).fill('strike')]);
  const e = cb.s.enemies[0];
  e.traps = [cb.mkCard('spike_shell')];
  cb.s.player.traps = [cb.mkCard('mirror_tide')];
  const hp = e.hp;
  const strike = cb.s.hand.find((c) => c.id === 'strike')!;
  cb.play(strike.uid, 0);
  assert.equal(e.block, 0);
  assert.equal(e.hp, hp - 6);
  assert.equal(cb.s.stats.maxChain, 3);
});

test('player reaction fires during the enemy turn and Weak applies before the hit', () => {
  const { cb } = fight(['rust_knight'], Array(10).fill('guard'));
  const e = cb.s.enemies[0];
  e.move = 'slash'; // 10 damage
  cb.s.player.traps = [cb.mkCard('riptide_snare')];
  cb.s.hand = [];
  const hp = cb.s.player.hp;
  cb.endTurn();
  // Weak: 10 → 7, minus 3 Block from the snare = 4 damage.
  assert.equal(hp - cb.s.player.hp, 4);
  assert.equal(cb.s.player.traps.length, 0);
});

test('Countercurrent negates an enemy attack entirely', () => {
  const { cb } = fight(['rust_knight'], Array(10).fill('guard'));
  cb.s.enemies[0].move = 'slash';
  cb.s.player.traps = [cb.mkCard('countercurrent')];
  cb.s.hand = [];
  const hp = cb.s.player.hp;
  cb.endTurn();
  assert.equal(cb.s.player.hp, hp);
});

test('Doom kills at the start of the target turn when Doom >= HP', () => {
  const { cb } = fight(['cinder_rat'], Array(10).fill('guard'));
  const e = cb.s.enemies[0];
  e.st.doom = e.hp;
  cb.s.hand = [];
  cb.endTurn();
  assert.equal(cb.s.phase, 'won');
});

test('unspent energy carries over as Flux (cap 1)', () => {
  const { cb } = fight(['bramble_beetle'], Array(10).fill('guard'));
  cb.s.hand = [];
  cb.endTurn();
  assert.equal(cb.s.energy, 4);
});

test('runs survive a JSON save/load mid-combat and stay deterministic', () => {
  const a = newRun({ character: 'warden', ascension: 0, seed: 42, level: 10, echoes: [] });
  const b = JSON.parse(JSON.stringify(a)) as RunState;
  for (let i = 0; i < 25; i++) { botStep(a); botStep(b); }
  assert.deepEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b)));
});

test('same seed gives the same map (daily duel fairness)', () => {
  const a = newRun({ character: 'duelist', ascension: 0, seed: 777, level: 1, echoes: [] });
  const b = newRun({ character: 'duelist', ascension: 0, seed: 777, level: 10, echoes: [] });
  assert.deepEqual(a.map, b.map);
});

test('Echo enemies play a saved deck through the same card code', () => {
  const run = newRun({ character: 'duelist', ascension: 0, seed: 5, level: 10, echoes: [{ label: 'Test Deck', cards: ['strike', 'strike', 'strike', 'brace', 'guard'] }] });
  run.echoPool = [{ label: 'Test Deck', cards: ['strike', 'strike', 'strike', 'brace', 'guard'] }];
  const cb = startCombat(run, { id: 'e', name: 'Echo', enemies: ['echo_duelist'] }, 'elite');
  const e = cb.s.enemies[0];
  assert.equal(e.name, 'Echo: Test Deck');
  assert.ok(cb.intents(e).length > 0);
  const hp = cb.s.player.hp;
  cb.s.hand = [];
  cb.endTurn();
  assert.ok(cb.s.player.hp < hp || e.traps.length > 0 || e.block > 0);
});

test('a full bot run finishes without errors', () => {
  const run = newRun({ character: 'hollow', ascension: 3, seed: 9, level: 10, echoes: [] });
  for (let i = 0; i < 500 && !run.finished; i++) botStep(run);
  assert.ok(run.finished);
  assert.ok(run.floor > 0);
  void reachable; void travel; void finishCombat;
});


test('economy: packs, dust, craft, imprint and loadouts stay consistent', () => {
  const p = newProfile();
  p.xp = 99999;
  const pulls = eco.openPack(p, 'standard')!;
  assert.equal(pulls.length, 5);
  assert.ok(['uncommon', 'rare', 'legendary'].includes(pulls[4].rarity));
  assert.equal(p.packs.standard, 1);
  p.dust = 5000;
  assert.ok(eco.craft(p, 'maelstrom'));
  assert.equal(p.dust, 5000 - 1600);
  assert.ok(eco.imprint(p, 'strike', 'keen'));
  assert.ok(!eco.imprint(p, 'kindling', 'swift') || CARDS.kindling.cost > 0);
  // Loadout: Maelstrom is a Tide Legendary: owning it adds it to drafts, but v0.8 loadouts can't hold Legendaries.
  assert.ok(!eco.setLoadoutSlot(p, 'duelist', 0, 'maelstrom'), 'no Legendaries in loadouts');
  // Tide Turner is a Tide rare, legal for the Duelist; 1 base slot, at most 1 rare.
  assert.ok(eco.craft(p, 'tide_turner'));
  assert.ok(eco.setLoadoutSlot(p, 'duelist', 0, 'tide_turner'));
  assert.ok(!eco.setLoadoutSlot(p, 'duelist', 1, 'tide_turner'), 'only one copy owned');
  assert.ok(!eco.setLoadoutSlot(p, 'warden', 0, 'phoenix_rite'), 'not owned');
  const setup = eco.runSetup(p, 'duelist', false);
  const run = newRun({ character: 'duelist', ascension: 0, seed: 3, level: 20, echoes: [], ...setup });
  assert.ok(run.deck.some((c) => c.id === 'tide_turner'));
  assert.ok(run.deck.filter((c) => c.id === 'strike').every((c) => c.mod === 'keen'));
  // An old save with a Legendary and two rares slotted keeps only the first rare.
  assert.ok(eco.craft(p, 'deep_focus'));
  p.loadouts.duelist = ['maelstrom', 'tide_turner', 'deep_focus', ...CHARACTERS.duelist.deck.slice(3)];
  assert.deepEqual(eco.loadout(p, 'duelist').slice(0, 3), ['strike', 'tide_turner', 'strike']);
  p.loadouts.duelist = ['tide_turner', ...CHARACTERS.duelist.deck.slice(1)];
  // Dusting the only copy reverts the loadout slot.
  eco.dustCard(p, 'tide_turner');
  assert.equal(eco.loadout(p, 'duelist')[0], 'strike');
});

test('legendaries only enter run drafts once owned', () => {
  assert.ok(!rewardPool('duelist', 20).includes('maelstrom'));
  assert.ok(rewardPool('duelist', 20, undefined, ['maelstrom']).includes('maelstrom'));
});

test('keen sigil raises card numbers and a dare pays out', () => {
  const { run, cb } = fight(['bramble_beetle'], Array(10).fill('strike'));
  cb.s.hand[0].mod = 'keen';
  const e = cb.s.enemies[0];
  e.traps = [];
  const hp = e.hp;
  cb.play(cb.s.hand[0].uid, 0);
  assert.equal(hp - e.hp, 8);
  run.dare = { id: 'swift', stake: 10 };
  const gold = run.gold;
  e.hp = 0; cb.checkDeath(e);
  finishCombat(run);
  assert.equal(run.gold, gold + 10 + DARE_PAYOUT);
});

test('Fate Coin: Coin Toss blocks on Sun, flips, then hits on Moon; Loaded Coin raises Ante', () => {
  const { run, cb } = fight(['bramble_beetle'], Array(10).fill('coin_toss'));
  run.relics = ['loaded_coin'];
  const e = cb.s.enemies[0];
  e.traps = [];
  const p = cb.s.player;
  p.coin = 0; p.block = 0;
  cb.play(cb.s.hand[0].uid, 0);
  assert.equal(p.block, 8);
  assert.equal(p.coin, 1);
  assert.equal(p.st.ante, 1);
  const hp = e.hp;
  cb.play(cb.s.hand[0].uid, 0);
  assert.equal(hp - e.hp, 8);
  assert.equal(p.coin, 0);
  assert.equal(cb.s.stats.flips, 2);
});

test('Jackpot cashes in Ante for damage and clears it', () => {
  const { cb } = fight(['bramble_beetle'], Array(10).fill('jackpot'));
  const e = cb.s.enemies[0];
  e.traps = []; e.hp = e.maxHp = 200;
  cb.raiseAnte(cb.s.player, 4);
  cb.s.energy = 5;
  cb.play(cb.s.hand[0].uid, 0);
  assert.equal(200 - e.hp, 6 + 3 * 4);
  assert.ok(!cb.s.player.st.ante);
});

test('alternate acts swap the encounter tables and are seeded per run', () => {
  const a = newRun({ character: 'duelist', ascension: 0, seed: 11, level: 10, echoes: [] });
  const b = newRun({ character: 'duelist', ascension: 0, seed: 11, level: 10, echoes: [] });
  assert.deepEqual(a.acts, b.acts);
  a.bosses = [0, 0, 0];
  a.acts = [1, 1, 1];
  assert.equal(actEnc(a, 1).boss.enemies[0], 'tide_broker');
  assert.equal(actEnc(a, 3).boss.enemies[0], 'clockmaker');
  a.acts = [0, 0, 0];
  assert.notEqual(actEnc(a, 1).boss.enemies[0], 'tide_broker');
});

test('vows raise enemy HP and seed enemy traps; Heat sums ranks', () => {
  const base = fight(['rust_knight'], Array(10).fill('strike')).cb.s.enemies[0].maxHp;
  const run = newRun({ character: 'duelist', ascension: 0, seed: 1, level: 10, echoes: [], vows: { vow_hp: 2, vow_traps: 1 } });
  run.relics = [];
  const cb = startCombat(run, { id: 't', name: 'Test', enemies: ['rust_knight'] }, 'normal');
  assert.equal(cb.s.enemies[0].maxHp, Math.round(base * 1.2));
  assert.ok(cb.s.enemies[0].traps.length >= 1);
  assert.ok(heatOf({ vow_hp: 2, vow_traps: 1 }) >= 3);
});

test('omens respect the belt cap and The Star heals in combat', () => {
  const { run, cb } = fight(['bramble_beetle'], Array(10).fill('strike'));
  run.omens = [];
  for (let i = 0; i < 6; i++) gainOmen(run, 'star');
  assert.equal(run.omens.length, omenCap(run));
  cb.s.player.hp = 30;
  // v0.14: Omens are instant-speed only. Not a free action on your own turn...
  assert.ok(!cb.useOmen(0));
  // ...but a link you add when an enemy attack (The Star's sign ⚔) is about to resolve.
  const e = cb.s.enemies[0];
  const atk = Object.entries(ENEMIES[e.def].moves).find(([, m]) => m.steps.some((st) => st.atk))![0];
  e.move = atk;
  cb.endPlayerTurn();
  cb.decisions = [-1];
  cb.enemyAct(0);
  assert.equal(run.omens.length, omenCap(run) - 1);
  assert.ok(cb.s.player.hp > 30 - 10, `The Star healed before the hit (hp ${cb.s.player.hp})`);
  assert.ok((cb.s.stats.style ?? 0) >= 15);
});

test('mastery grants dust per level and the season track claims every reached tier', () => {
  const p = newProfile();
  const dust = p.dust;
  const lines = eco.addMastery(p, { strike: 16 });
  assert.equal(lines.length, 2);
  assert.equal(p.dust, dust + 10 + 20);
  p.season.renown = 120 * 5 + 10;
  const got = eco.claimSeason(p);
  assert.equal(got.length, 5);
  assert.ok(p.cosmetics.owned.includes('fam_inkwell'));
  assert.equal(eco.claimSeason(p).length, 0);
  assert.ok(eco.equip(p, 'fam_inkwell'));
  assert.equal(p.cosmetics.familiar, 'fam_inkwell');
});

test('deck codes round-trip and reject junk', () => {
  const code = encodeDeck('Gilded Gambit', 'sharp', ['coin_toss', 'hedge', 'jackpot+1', 'strike', 'guard']);
  const d = decodeDeck(code)!;
  assert.equal(d.label, 'Gilded Gambit');
  assert.equal(d.character, 'sharp');
  assert.deepEqual(d.cards, ['coin_toss', 'hedge', 'jackpot+1', 'strike', 'guard']);
  assert.equal(decodeDeck('RIP1.!!!'), null);
  assert.equal(decodeDeck('hello'), null);
});

test('arena: draft 10, duel a rival with the bot, resolve and claim', () => {
  const p = newProfile();
  p.xp = 99999;
  arenaStart(p, 'warden', 42);
  for (let i = 0; i < ARENA_PICKS; i++) assert.ok(arenaPick(p, i % 3));
  assert.equal(p.arena!.stage, 'ready');
  assert.equal(p.arena!.deck.length, 6 + ARENA_PICKS);
  for (let duel = 0; duel < 12 && (p.arena!.stage as string) !== 'done'; duel++) {
    if ((p.arena!.stage as string) === 'pick') { arenaSpoil(p, 0); continue; }
    const run = arenaDuel(p)!;
    assert.equal(run.combat!.enemies[0].def, 'echo_rival');
    for (let t = 0; t < 80 && run.combat && !['won', 'lost'].includes(run.combat.phase); t++) botTurn(run);
    assert.ok(['won', 'lost'].includes(run.combat!.phase));
    assert.ok(arenaResolve(p));
  }
  const a = p.arena!;
  assert.ok(a.wins + a.losses > 0);
  const coins = p.coins;
  const rw = arenaClaim(p)!;
  assert.equal(p.coins, coins + rw.coins);
  assert.equal(p.arena, null);
});

test('profile migrate fills new v0.3 fields on an old save', () => {
  const old = JSON.parse(JSON.stringify(newProfile())) as Record<string, unknown>;
  for (const k of ['mastery', 'season', 'cosmetics', 'arena', 'rivals', 'weekly', 'history']) delete old[k];
  delete (old.ascension as Record<string, number>).sharp;
  const p = migrate(old);
  assert.ok(p.season && p.cosmetics.owned.length > 0 && Array.isArray(p.rivals) && p.mastery);
  assert.equal(p.ascension.sharp, 0);
});

test('weekly gauntlet setup is deterministic per week', () => {
  const a = weeklySetup('2026-W43'), b = weeklySetup('2026-W43'), c = weeklySetup('2026-W44');
  assert.deepEqual(a, b);
  assert.equal(Object.keys(a.vows).length, 3);
  assert.ok(a.seed !== c.seed);
});

// ───────── v0.4 ─────────

test('steal: take an enemy trap into your slot; it fires for you, then vanishes', () => {
  const { cb } = fight(['rust_knight'], ['snatch', ...Array(9).fill('guard')]);
  const e = cb.s.enemies[0];
  e.traps = [cb.mkCard('spike_shell')];
  e.move = 'slash';
  cb.s.player.traps = [];
  const snatch = cb.mkCard('snatch');
  cb.s.hand.push(snatch);
  cb.play(snatch.uid);
  assert.equal(e.traps.length, 0);
  assert.equal(cb.s.player.traps[0]?.id, 'spike_shell');
  assert.equal(cb.s.stats.steals, 1);
  cb.endPlayerTurn();
  const blockBefore = cb.s.player.block;
  cb.enemyAct(0);
  assert.equal(cb.s.player.traps.length, 0, 'the stolen trap fired');
  assert.ok(!cb.s.discard.some((c) => c.id === 'spike_shell'), 'enemy cards never enter your deck');
  assert.ok(blockBefore >= 0);
});

test('steal with nothing to take makes a Glint', () => {
  const { cb } = fight(['rust_knight'], ['snatch', ...Array(9).fill('guard')]);
  cb.s.enemies[0].traps = [];
  const sn = cb.mkCard('snatch');
  cb.s.hand.push(sn);
  const n = cb.s.hand.length;
  cb.play(sn.uid);
  assert.ok(cb.s.hand.some((c) => c.id === 'glint'));
  assert.equal(cb.s.hand.length, n);
});

test('an enemy Magpie steals your Reaction; killing it gives the card back', () => {
  const { cb } = fight(['magpie_thief'], Array(10).fill('guard'));
  const e = cb.s.enemies[0];
  e.move = 'snatch';
  const parry = cb.mkCard('mirror_tide');
  cb.s.player.traps = [parry];
  cb.endPlayerTurn();
  cb.enemyAct(0);
  assert.equal(cb.s.player.traps.length, 0);
  assert.ok(e.traps.some((t) => t.uid === parry.uid && t.stolen));
  e.hp = 1;
  cb.s.phase = 'player';
  cb.hit(cb.s.player, e, 10, false);
  assert.ok(e.dead);
  assert.ok(cb.s.discard.some((c) => c.uid === parry.uid), 'your Parry comes back to your discard pile');
});

test('mimic repeats the last attack you played this turn', () => {
  const { cb } = fight(['iron_colossus'], ['strike', 'copycat', ...Array(8).fill('guard')]);
  const e = cb.s.enemies[0];
  e.traps = [];
  const hp = e.hp;
  const st = cb.mkCard('strike'), cc = cb.mkCard('copycat');
  cb.s.hand.push(st, cc);
  cb.play(st.uid, 0);
  cb.play(cc.uid);
  assert.equal(e.hp, hp - 12);
  assert.equal(cb.s.stats.mimics, 1);
});

test('summons: the Hedge Witch brews a sleeping Broomling; brooms fall with her', () => {
  const { cb } = fight(['hedge_witch'], Array(10).fill('guard'));
  const w = cb.s.enemies[0];
  w.move = 'brew';
  cb.endPlayerTurn();
  cb.enemyAct(0);
  assert.equal(cb.alive().length, 2);
  const broom = cb.s.enemies[1];
  assert.equal(broom.def, 'broomling');
  assert.equal(broom.flags.sleep, 1);
  cb.s.phase = 'player';
  w.block = 0;
  cb.hit(cb.s.player, w, 999, false);
  assert.ok(w.dead && broom.dead);
  assert.equal(cb.s.phase, 'won');
});

test('Ouroboros lets chains run to 8 links', () => {
  const { cb } = fight(['rust_knight'], Array(10).fill('guard'));
  assert.equal(cb.maxChain(), 6);
  cb.s.player.st.ouro = 2;
  assert.equal(cb.maxChain(), 8);
});

test('riddles: every puzzle is solvable, and the naive left-to-right play fails', () => {
  assert.equal(PUZZLES.length, RIDDLE_COUNT);
  assert.equal(new Set(PUZZLES.map((z) => z.id)).size, PUZZLES.length);
  for (const z of PUZZLES) {
    for (const c of [...z.hand, ...(z.draw ?? []), ...(z.traps ?? [])]) assert.ok(CARDS[c.replace(/\+$/, '')], `${z.id}: ${c}`);
    assert.ok(solve(z), `${z.id} has a solution`);
    assert.equal(naive(z), false, `${z.id} is not solved by playing left to right`);
  }
});

test('riddles: first solve pays Coins once and keeps the best card count', () => {
  const p = newProfile();
  const z = PUZZLES[0];
  const c0 = p.coins;
  const a = recordSolve(p, z.id, 3);
  assert.ok(a.first && a.coins > 0 && p.coins === c0 + a.coins);
  const b = recordSolve(p, z.id, 2);
  assert.ok(!b.first && b.coins === 0);
  assert.equal(p.puzzles[z.id], 2);
  const run = puzzleRun(z);
  assert.equal(run.combat!.hand.length, z.hand.length);
  assert.equal(run.relics.length, 0);
});

test('Act 4: two Champions unlock the Reflection, which fights with your own deck', () => {
  const run = newRun({ character: 'warden', ascension: 0, seed: 77, level: 10, echoes: [] });
  run.act = 3;
  run.champs = EPILOGUE_CHAMPS;
  const cb = startCombat(run, actEnc(run).boss, 'boss');
  cb.s.enemies.forEach((e) => { e.dead = true; e.hp = 0; });
  cb.s.phase = 'won';
  finishCombat(run);
  assert.equal(run.won, true);
  assert.equal(run.screen, 'epilogue');
  enterEpilogue(run);
  assert.equal(run.act, 4);
  const r = run.combat!.enemies[0];
  assert.equal(r.def, 'reflection');
  assert.ok(r.ghost && r.ghost.deck.length > 0);
  run.combat!.enemies[0].dead = true;
  run.combat!.phase = 'won';
  finishCombat(run);
  assert.equal(run.epilogue, 'won');
  assert.equal(run.screen, 'victory');
  assert.ok(run.finished && run.won);
});

test('wandering bosses replace the act boss when rolled', () => {
  const run = newRun({ character: 'duelist', ascension: 0, seed: 5, level: 10, echoes: [] });
  run.bosses = [1, 0, 1];
  assert.equal(actEnc(run, 1).boss.name, WANDERING_BOSSES[1].name);
  assert.notEqual(actEnc(run, 2).boss.name, WANDERING_BOSSES[2].name);
  assert.equal(actEnc(run, 3).boss.name, WANDERING_BOSSES[3].name);
});

test('profile migrate fills v0.4 fields (Riddles, Reflections, Magpie)', () => {
  const old = JSON.parse(JSON.stringify(newProfile())) as Record<string, unknown>;
  delete old.puzzles; delete old.reflections;
  delete (old.ascension as Record<string, number>).magpie;
  const p = migrate(old);
  assert.deepEqual(p.puzzles, {});
  assert.deepEqual(p.reflections, {});
  assert.equal(p.ascension.magpie, 0);
});

test('every Glass card and new enemy has art and a valid definition', () => {
  for (const [id, d] of Object.entries(CARDS)) {
    if (d.faction !== 'glass') continue;
    assert.ok(d.text && d.name, id);
    if (d.rarity !== 'special') assert.ok(rewardPool('magpie').some((c) => c === id) || d.rarity === 'starter' || d.rarity === 'legendary' || !!d.evolved, `${id} drops for the Magpie`);
  }
});

// ───────── v0.5 ─────────

function sextonFight(enemies: string[], deckIds: string[], seed = 1): { run: RunState; cb: Combat } {
  const run = newRun({ character: 'sexton', ascension: 0, seed, level: 10, echoes: [] });
  run.deck = deckIds.map((id, i) => ({ uid: 2000 + i, id, up: false }));
  run.relics = ['gravediggers_spade'];
  const cb = startCombat(run, { id: 't', name: 'Test', enemies }, 'normal');
  return { run, cb };
}

test('crypt: a fired Reaction is buried (Haunt fires) and Exhume sets it again', () => {
  const { cb } = sextonFight(['rust_knight'], Array(10).fill('strike'));
  assert.equal(cb.s.player.st.grave, 1);
  const tomb = cb.mkCard('tombstone');
  cb.s.player.traps = [tomb];
  cb.s.enemies[0].move = 'slash';
  cb.endTurn(); // turn 2 starts: the Spade exhumes it straight back
  assert.ok(cb.s.player.traps.includes(tomb), 'exhumed into its slot on turn 2');
  assert.equal(cb.s.stats.buried, 1);
  assert.equal(cb.s.stats.exhumes, 1);
  assert.equal(cb.s.crypt!.length, 0);
});

test('bury mills the draw pile into the Crypt and Haunts fire', () => {
  const { cb } = sextonFight(['rust_knight'], [...Array(5).fill('strike'), ...Array(6).fill('tombstone')]);
  cb.s.draw = [cb.mkCard('tombstone'), cb.mkCard('tombstone')];
  const b0 = cb.s.player.block;
  cb.buryTop(2);
  assert.equal(cb.s.crypt!.length, 2);
  assert.equal(cb.s.player.block, b0 + 6, 'two Haunts of 3 Block');
  assert.equal(cb.exhume(5), 2);
  assert.equal(cb.s.player.traps.length, 2);
});

test('Prime grows each turn a Reaction stays set and scales its effect', () => {
  const { cb } = fight(['bramble_beetle'], Array(10).fill('guard'));
  const fuse = cb.mkCard('slow_fuse');
  cb.s.player.traps = [fuse];
  cb.s.enemies[0].move = 'harden';
  cb.endTurn(); cb.s.enemies[0].move = 'harden'; cb.endTurn();
  assert.equal(fuse.prime, 2);
  const e = cb.s.enemies[0];
  e.move = 'horn'; e.block = 0;
  const hp = e.hp;
  cb.endTurn();
  assert.equal(hp - e.hp, 4 + 4 * 2, 'Slow Fuse deals 4 + 4 per Prime');
});

test('Converge counts the different factions played this turn', () => {
  const run = newRun({ character: 'sexton', ascension: 0, seed: 3, level: 10, echoes: [] });
  run.deck = ['strike', 'spade_strike', 'heartwood_ward', 'confluence', 'guard', 'guard', 'guard', 'guard', 'guard', 'guard'].map((id, i) => ({ uid: 3000 + i, id, up: false }));
  run.relics = [];
  const cb = startCombat(run, { id: 't', name: 'T', enemies: ['iron_colossus'] }, 'normal');
  cb.s.hand = [cb.mkCard('spade_strike'), cb.mkCard('heartwood_ward'), cb.mkCard('confluence')];
  cb.s.energy = 9;
  const e = cb.s.enemies[0];
  e.traps = []; e.block = 0;
  cb.play(cb.s.hand[0].uid, 0);
  cb.play(cb.s.hand[0].uid);
  const hp = e.hp;
  cb.play(cb.s.hand[0].uid, 0);
  assert.equal(hp - e.hp, 4 + 3 * 3, 'grave + thorn + neutral = Converge 3');
});

test('venues bend the rules: slots, chain length, no Strength, and every venue survives a bot fight', () => {
  const run = newRun({ character: 'duelist', ascension: 0, seed: 9, level: 10, echoes: [] });
  let cb = startCombat(run, { id: 't', name: 'T', enemies: ['rust_knight'] }, 'normal', undefined, { venue: 'narrow_bridge' });
  assert.equal(cb.s.player.slots, 1);
  cb = startCombat(run, { id: 't', name: 'T', enemies: ['rust_knight'] }, 'normal', undefined, { venue: 'echo_hall' });
  assert.equal(cb.maxChain(), 8);
  cb = startCombat(run, { id: 't', name: 'T', enemies: ['hex_acolyte'] }, 'normal', undefined, { venue: 'sanctuary' });
  cb.applyStatus(cb.s.enemies[0], cb.s.enemies[0], 'str', 2);
  assert.ok(!cb.s.enemies[0].st.str);
  for (const v of VENUES) {
    const r = newRun({ character: 'sharp', ascension: 0, seed: 40, level: 10, echoes: [] });
    startCombat(r, { id: 't', name: 'T', enemies: ['rust_knight', 'cinder_rat'] }, 'normal', undefined, { venue: v.id });
    for (let i = 0; i < 30 && r.combat && (r.combat.phase === 'player'); i++) botTurn(r);
    assert.ok(['won', 'lost', 'player'].includes(r.combat!.phase), v.id);
  }
});

test('blot makes a card cost 1 more; the Ink Blotter turns it into Block', () => {
  const { run, cb } = fight(['ink_imp'], Array(10).fill('strike'));
  cb.blot(10);
  const c = [...cb.s.draw, ...cb.s.discard][0];
  assert.ok(c.blot);
  assert.equal(cb.cost(c), 2);
  run.relics.push('ink_blotter');
  assert.equal(cb.cost(c), 1);
  const b = cb.s.player.block;
  cb.blot(2);
  assert.equal(cb.s.player.block, b + 6);
});

test('sigils with a catch: Reckless hits harder and costs HP, Echoing doubles the first play', () => {
  const { cb } = fight(['iron_colossus'], Array(10).fill('guard'));
  const e = cb.s.enemies[0]; e.traps = []; e.block = 0;
  const s1 = cb.mkCard('strike'); s1.mod = 'reckless';
  cb.s.hand = [s1]; cb.s.energy = 3;
  const hp = e.hp, php = cb.s.player.hp;
  cb.play(s1.uid, 0);
  assert.equal(hp - e.hp, 9);
  assert.equal(php - cb.s.player.hp, 2);
  const s2 = cb.mkCard('strike'); s2.mod = 'echoing';
  cb.s.hand = [s2];
  const hp2 = e.hp;
  cb.play(s2.uid, 0);
  assert.equal(hp2 - e.hp, 12);
});

test('patrons: entering Act 2 brings a Patron; a blessing grants its relic', () => {
  const run = newRun({ character: 'warden', ascension: 0, seed: 77, level: 10, echoes: [] });
  nextAct(run);
  assert.equal(run.act, 2);
  assert.ok(run.patron && run.patron.offers.length >= 2);
  run.patron = { id: 'bellmaiden', offers: ['peal', 'answer', 'toll'], done: false };
  choosePatron(run, 'peal');
  assert.ok(run.relics.includes('b_peal'));
  assert.equal(run.screen, 'map');
  assert.equal(RELICS.b_peal.rarity, 'blessing');
});

test('v0.8 migrate: talent ranks above the new caps are refunded', () => {
  const p = migrate({ ...newProfile(), talents: { signature: 3, opening_guard: 2, vitality: 3, ghost_talent: 1 } });
  assert.deepEqual(p.talents, { signature: 1, opening_guard: 1, vitality: 3 });
});

test('v0.8 nemesis: after beating you three times running it moves on', () => {
  const p = newProfile();
  for (let i = 0; i < 4; i++) {
    const run = newRun({ character: 'duelist', ascension: 0, seed: 30 + i, level: 10, echoes: [] });
    run.stats.fights = 2;
    run.lastFight = { enemies: ['rust_knight'], name: 'Rust Knight', act: 1, kind: 'normal' };
    run.finished = true; run.screen = 'defeat';
    eco.finishRun(p, run);
    if (i < 3) assert.equal(p.nemesis?.grudge, i + 1);
  }
  assert.equal(p.nemesis, null);
});

test('nemesis: the fight that killed you returns promoted, and beating it settles the grudge', () => {
  const p = newProfile();
  const run = newRun({ character: 'duelist', ascension: 0, seed: 21, level: 10, echoes: [] });
  run.stats.fights = 2;
  run.lastFight = { enemies: ['rust_knight'], name: 'Rust Knight', act: 1, kind: 'normal' };
  run.finished = true; run.screen = 'defeat';
  eco.finishRun(p, run);
  assert.equal(p.nemesis?.name, 'Rust Knight');
  assert.equal(p.nemesis?.grudge, 1);
  const r2 = newRun({ character: 'duelist', ascension: 0, seed: 22, level: 10, echoes: [], ...eco.runSetup(p, 'duelist', false) });
  assert.equal(r2.nemesis?.name, 'Rust Knight');
  r2.actFights = 1;
  const row = r2.map[1].find((n) => n.type === 'fight') ?? r2.map[1][0];
  row.type = 'fight';
  r2.pos = { row: 0, col: r2.map[0].find((n) => n.next.includes(row.col))?.col ?? r2.map[0][0].col };
  r2.map[0].find((n) => n.col === r2.pos!.col)!.next = [row.col];
  travel(r2, 1, row.col);
  const s = r2.combat!;
  assert.ok(s.nemesis);
  assert.match(s.enemies[0].name, /the Grudging/);
  assert.ok((s.enemies[0].st.str ?? 0) >= 1);
  for (const e of s.enemies) { e.hp = 0; e.dead = true; }
  s.phase = 'won';
  finishCombat(r2);
  assert.ok(r2.reward?.nemesis);
  r2.finished = true;
  eco.finishRun(p, r2);
  assert.equal(p.nemesis, null);
  assert.equal(p.counters.nemeses, 1);
});

test('the Long Night: after a win, descend into scaled endless acts; death still counts as a win', () => {
  const run = newRun({ character: 'warden', ascension: 0, seed: 31, level: 10, echoes: [], nightOk: true });
  run.won = true; run.screen = 'epilogue';
  descendNight(run);
  assert.equal(nightOf(run), 1);
  assert.equal(run.screen, 'map');
  travel(run, 0, run.map[0][0].col);
  const s = run.combat;
  if (s) {
    assert.ok((s.enemies[0].st.str ?? 0) >= 1, 'night Strength');
    s.phase = 'lost';
    finishCombat(run);
    assert.equal(run.screen, 'victory');
    assert.ok(run.won && run.finished);
  }
});

test('trap tiers cap at Act 3 so Champion affixes, Vow traps and Venues work in Act 4 and the Long Night', () => {
  const run = newRun({ character: 'warden', ascension: 0, seed: 32, level: 10, echoes: [], nightOk: true, vows: { vow_traps: 2 } });
  run.act = 6; run.night = 1;
  const cb = startCombat(run, { id: 'n', name: 'N', enemies: ['skeleton'] }, 'elite', 'trapper', { venue: 'grand_hall' });
  for (const e of cb.s.enemies) for (const t of e.traps) assert.ok(CARDS[t.id], `${t.id} exists`);
  assert.ok(cb.s.enemies[0].traps.length >= 1);
});

test("the Reflection's Doom against you is halved", () => {
  const run = newRun({ character: 'hollow', ascension: 0, seed: 8, level: 10, echoes: [] });
  const cb = startCombat(run, { id: 'r', name: 'R', enemies: ['reflection'] }, 'boss');
  cb.applyStatus(cb.s.enemies[0], cb.s.player, 'doom', 6);
  assert.equal(cb.s.player.st.doom, 3);
});

test('profile migrate fills v0.5 fields (Nemesis, Long Night, Sexton)', () => {
  const old = JSON.parse(JSON.stringify(newProfile())) as Record<string, unknown>;
  delete old.nemesis; delete old.bestNight;
  delete (old.ascension as Record<string, number>).sexton;
  const p = migrate(old);
  assert.equal(p.nemesis, null);
  assert.equal(p.bestNight, 0);
  assert.equal(p.ascension.sexton, 0);
});

test('every Grave, Prime and Converge card has art, valid text and drops for the right duelist', () => {
  for (const [id, d] of Object.entries(CARDS)) {
    if (['enemy', 'curse'].includes(d.faction) || d.rarity === 'special') continue;
    assert.ok(ART_ICON[id], `${id} has an icon`);
    assert.ok(!/\{\w+\}/.test(d.text.replace(/\{(\w+)\}/g, (_, k) => String((d.v as Record<string, number>)[k] ?? `{${k}}`))), `${id} fills every value`);
    if (d.faction === 'grave' && !d.evolved && !['starter', 'legendary'].includes(d.rarity)) assert.ok(rewardPool('sexton').includes(id), `${id} drops for the Sexton`);
    if (d.primes) assert.equal(d.type, 'reaction', `${id}: Prime is for Reactions`);
  }
});

// ───────── v0.6 Wilds & Wonders ─────────
import { ENEMIES, actEncounters, NIGHT_BOSSES } from '../src/data/enemies';
import { RARE_ENCOUNTERS } from '../src/data/enemies6';
import { EVENTS, EVENT_MAP, SHRINES, WAYSIDE, NODE_EVENTS } from '../src/data/events';
import { FATES } from '../src/data/fates';
import { LAYOUTS, SKIES, TERRORS } from '../src/data/wilds';
import { SURPRISES } from '../src/data/surprises';
import { ACHIEVEMENTS } from '../src/data/achievements';
import { chooseEvent, chooseFate, enterNode, genMap, nightHpMult, startEvent, startRare, eventApi, addTerror, ROWS } from '../src/engine/run';

test('every act has three versions whose fights, elites and bosses use real enemies and real traps', () => {
  for (const a of [1, 2, 3]) for (const v of [0, 1, 2]) {
    const e = actEncounters(a, v);
    for (const enc of [...e.easy, ...e.normal, ...e.elite, e.boss]) for (const id of enc.enemies) assert.ok(ENEMIES[id], `${a}/${v}: ${id}`);
    assert.ok(e.normal.length >= 8, `act ${a} v${v} has plenty of fights`);
  }
  for (const enc of [...Object.values(RARE_ENCOUNTERS), ...NIGHT_BOSSES]) for (const id of enc.enemies) assert.ok(ENEMIES[id], id);
  for (const d of Object.values(ENEMIES)) for (const t of d.traps ?? []) assert.ok(CARDS[t], `${d.id} trap ${t}`);
  assert.ok(Object.keys(ENEMIES).length >= 130, 'over 130 enemies');
});

test('every new enemy survives a bot fight without errors (moves, summons, splits, flees, rebirth)', () => {
  WILDS.on = true;
  const ids = ['alpha_wolf', 'old_oak', 'cursed_bear', 'antlered_king', 'pirate_captain', 'sea_hag', 'kraken_arm', 'leviathan', 'ironmonger', 'ash_phoenix',
    'forgemother', 'magma_ooze', 'puppeteer', 'rat_king', 'gilded_hare', 'night_mare', 'dawn_eater', 'siren', 'cannoneer', 'bridge_troll', 'shadow_duelist'];
  for (const id of ids) {
    const run = newRun({ character: 'warden', ascension: 0, seed: 600 + id.length, level: 10, echoes: [] });
    run.act = id === 'night_mare' || id === 'dawn_eater' ? 3 : 2;
    startCombat(run, { id, name: id, enemies: [id] }, 'elite');
    for (let t = 0; t < 40 && run.combat && (run.combat.phase === 'player' || run.combat.phase === 'enemy'); t++) botTurn(run);
    assert.ok(run.combat, id);
  }
  WILDS.on = false;
});

test('rare monsters flee after 3 turns (tiny reward) or pay out big when caught', () => {
  const run = newRun({ character: 'duelist', ascension: 0, seed: 71, level: 10, echoes: [] });
  run.deck = Array(10).fill(0).map((_, i) => ({ uid: 900 + i, id: 'guard', up: false }));
  startRare(run);
  const cb = new Combat(run.combat!, run);
  for (let i = 0; i < 3; i++) cb.endTurn();
  assert.equal(run.combat!.phase, 'won', 'the hare got away, so the fight ends');
  assert.ok(run.combat!.enemies[0].flags.fled);
  finishCombat(run);
  assert.equal(run.reward!.gold, 5);
  assert.equal(run.reward!.cards, null);
  const run2 = newRun({ character: 'duelist', ascension: 0, seed: 72, level: 10, echoes: [] });
  startRare(run2);
  const cb2 = new Combat(run2.combat!, run2);
  cb2.loseHp(run2.combat!.enemies[0], 999);
  finishCombat(run2);
  assert.ok(run2.reward!.gold >= 60, 'caught: big gold');
  assert.ok(run2.reward!.relic, 'caught: a relic');
});

test('the Ash Phoenix is reborn once with half its HP; the Magma Ooze splits', () => {
  const { cb } = fight(['ash_phoenix'], Array(10).fill('strike'));
  const e = cb.s.enemies[0];
  cb.loseHp(e, e.hp);
  assert.ok(!e.dead && e.hp === Math.round(e.maxHp * 0.5));
  cb.loseHp(e, e.hp);
  assert.ok(e.dead);
  const f2 = fight(['magma_ooze'], Array(10).fill('strike'));
  f2.cb.loseHp(f2.cb.s.enemies[0], 999);
  assert.equal(f2.cb.alive().length, 2);
  assert.ok(f2.cb.alive().every((x) => x.def === 'ember_blob'));
});

test('every event, shrine and roadside option runs without errors on a fresh run', () => {
  let n = 0;
  for (const ev of EVENTS) for (let i = 0; i < ev.options.length; i++) for (const seed of [1, 2, 3]) {
    const run = newRun({ character: 'magpie', ascension: 0, seed: seed * 97 + i, level: 10, echoes: [] });
    run.gold = 400; run.act = ev.acts?.[0] ?? 1;
    run.deck.push({ uid: 5000, id: 'regret', up: false });
    run.event = { id: ev.id, resolved: null };
    run.screen = 'event';
    const o = ev.options[i];
    if (o.can && !o.can(run)) continue;
    const uid = o.pick ? run.deck.find((c) => CARDS[c.id].type !== 'curse')!.uid : undefined;
    assert.ok(chooseEvent(run, i, uid), `${ev.id} #${i}`);
    assert.ok(['event', 'combat', 'map', 'reward'].includes(run.screen), `${ev.id} #${i} → ${run.screen}`);
    assert.ok(run.hp >= 1 && run.hp <= run.maxHp, `${ev.id} #${i} hp`);
    n++;
  }
  assert.ok(n > 250, `${n} option runs`);
  assert.ok(NODE_EVENTS.length >= 60 && SHRINES.length >= 12 && WAYSIDE.length >= 34, 'content counts');
  for (const ev of EVENTS) assert.ok(ev.kind === 'stage' || ev.text, ev.id);
});

test('multi-stage events: the Card Shark lets you double up, the Golden Idol makes you run', () => {
  const run = newRun({ character: 'duelist', ascension: 0, seed: 5, level: 10, echoes: [] });
  run.event = { id: 'golden_idol', resolved: null };
  run.screen = 'event';
  const g = run.gold;
  chooseEvent(run, 0);
  assert.equal(run.event!.id, 'golden_idol_run');
  assert.ok(run.event!.note);
  chooseEvent(run, 2);
  assert.equal(run.gold, g);
  assert.ok(run.event!.resolved);
  run.event = { id: 'card_shark_win', resolved: null };
  run.evPot = 40;
  chooseEvent(run, 0);
  assert.equal(run.gold, g + 40);
});

test('roadside encounters happen on the way and then you carry on into the node', () => {
  WILDS.on = true;
  let seen = 0;
  for (let seed = 1; seed < 60 && !seen; seed++) {
    const run = newRun({ character: 'warden', ascension: 0, seed, level: 10, echoes: [] });
    run.skies = ['gale', 'gale', 'gale'];
    run.pos = { row: 0, col: run.map[0][0].col };
    run.combat = null; run.screen = 'map';
    const next = reachable(run)[0];
    travel(run, next.row, next.col);
    if (run.wayside) {
      seen++;
      assert.equal(run.screen, 'event');
      assert.equal(EVENT_MAP[run.event!.id].kind, 'wayside');
      const ev = EVENT_MAP[run.event!.id];
      const i = ev.options.findIndex((o) => !o.pick && (!o.can || o.can(run)) && o.label !== 'Fight!' && !o.label.startsWith('Fight') && !o.label.startsWith('Chase') && !o.label.startsWith('Give chase') && !o.label.startsWith('Stand') && !o.label.startsWith('Take the shortcut') && !o.label.startsWith('Guard') && !o.label.startsWith('Wander'));
      if (i < 0) { seen--; continue; }
      chooseEvent(run, i);
      proceed(run);
      assert.equal(run.wayside, null);
      assert.ok(run.screen !== 'map' || ['rest', 'shop'].includes(nodeAt(run, next.row, next.col)!.type) === false, 'entered the node');
    }
  }
  assert.ok(seen, 'a roadside encounter happened under a Gale');
  WILDS.on = false;
});

test('Mystery nodes reveal themselves as something else', () => {
  const run = newRun({ character: 'sexton', ascension: 0, seed: 12, level: 10, echoes: [] });
  const node = run.map[2][0];
  node.type = 'mystery';
  run.pos = { row: 2, col: node.col };
  enterNode(run, 2, node.col);
  assert.ok(run.mystery && run.mystery !== 'mystery');
  assert.ok(run.screen !== 'map' || run.mystery === 'rest');
});

test('every layout builds a connected map; Skies and Fates are valid', () => {
  for (const lay of LAYOUTS) for (let seed = 1; seed <= 6; seed++) {
    const run = newRun({ character: 'duelist', ascension: 1, seed: seed * 13, level: 10, echoes: [] });
    run.layouts = [lay.id]; run.act = 1;
    run.map = genMap(run, true);
    assert.equal(run.map.length, ROWS);
    for (let r = 0; r < ROWS; r++) {
      assert.ok(run.map[r].length >= 1, `${lay.id} row ${r}`);
      for (const n of run.map[r]) {
        if (r < ROWS - 1) { assert.ok(n.next.length >= 1, `${lay.id} dead end`); for (const c of n.next) assert.ok(nodeAt(run, r + 1, c), `${lay.id} edge to nowhere`); }
        if (r > 0) assert.ok(run.map[r - 1].some((m) => m.next.includes(n.col)), `${lay.id} orphan node`);
      }
    }
    if (lay.fair !== undefined) assert.ok(run.map[lay.fair].every((n) => ['shop', 'shrine', 'event'].includes(n.type)));
  }
  assert.ok(SKIES.length >= 15 && FATES.length >= 24 && SURPRISES.length >= 18 && TERRORS.length >= 8);
  assert.ok(ACHIEVEMENTS.length >= 57);
});

test('Fates: three on offer at the start; keeping one applies it, and you may decline', () => {
  const run = newRun({ character: 'warden', ascension: 0, seed: 3, level: 10, echoes: [], fates: true });
  assert.equal(run.screen, 'fate');
  assert.equal(run.fateOffer!.length, 3);
  run.fateOffer = ['brute', 'pauper', 'oath'];
  const hp = run.maxHp;
  assert.ok(chooseFate(run, 'brute'));
  assert.equal(run.maxHp, hp + 10);
  assert.equal(run.screen, 'map');
  const r2 = newRun({ character: 'warden', ascension: 0, seed: 4, level: 10, echoes: [], fates: true });
  assert.ok(chooseFate(r2, null));
  assert.equal(r2.fate ?? null, null);
  const r3 = newRun({ character: 'warden', ascension: 0, seed: 4, level: 10, echoes: [], fates: true });
  r3.fateOffer = ['oath', 'brute', 'pauper'];
  chooseFate(r3, 'oath');
  const cb = startCombat(r3, { id: 't', name: 'T', enemies: ['cinder_rat'] }, 'normal');
  assert.equal(cb.s.player.slots, 3);
  const d = newRun({ character: 'warden', ascension: 0, seed: 4, level: 10, echoes: [], fates: true, daily: '2026-10-25' });
  assert.equal(d.screen, 'map', 'no Fates in the Daily Duel');
});

test('the Long Night scales compound, adds stacking Night Terrors, and gives night elites an affix', () => {
  assert.ok(Math.abs(nightHpMult(3) - 1.953125) < 1e-9);
  const run = newRun({ character: 'warden', ascension: 0, seed: 31, level: 10, echoes: [], nightOk: true });
  run.won = true;
  descendNight(run);
  assert.equal((run.terrors ?? []).length, 1);
  addTerror(run);
  assert.equal(new Set(run.terrors).size, 2);
  const base = ENEMIES.cinder_rat.hp[0];
  const cb = startCombat(run, { id: 't', name: 'T', enemies: ['cinder_rat'] }, 'elite');
  assert.ok(cb.s.enemies[0].maxHp > base * 1.2, 'night HP');
  run.act = 6;
  const cb2 = startCombat(run, { id: 't', name: 'T', enemies: ['skeleton'] }, 'elite');
  assert.ok(cb2.s.affix, 'night 2 elites carry an affix');
});

test('a mid-fight Surprise fires on its turn', () => {
  WILDS.on = true;
  const { cb } = fight(['iron_colossus'], Array(10).fill('guard'));
  cb.s.surprise = { id: 'coins', turn: 2 };
  const run = cb.run;
  const g = run.gold;
  cb.endTurn();
  assert.ok(cb.s.surprise.fired);
  assert.equal(run.gold, g + 15);
  WILDS.on = false;
});

test('full bot runs with every v0.6 system switched on finish cleanly for every duelist', () => {
  WILDS.on = true;
  for (const ch of ['duelist', 'warden', 'hollow', 'sharp', 'magpie', 'sexton'] as const) for (const seed of [7, 8]) {
    const run = newRun({ character: ch, ascension: 0, seed: seed * 1000 + ch.length, level: 10, echoes: [], fates: true, nightOk: true });
    for (let i = 0; i < 600 && !run.finished; i++) botStep(run);
    assert.ok(run.finished || run.floor > 10, `${ch} ${seed} finishes`);
  }
  WILDS.on = false;
});

// ═════════ v0.7: Elements & Counters ═════════
import { beats, elemMult, WHEEL, ELEMENT_LIST, beaterOf, aspectOf } from '../src/data/elements';
import { CHAR_LIST, CHARACTERS } from '../src/data/characters';
import { ALL_PLAYER_CARDS, COLLECTIBLE } from '../src/data/cards';
import { cardText } from '../src/engine/combat';

function fight7(enemies: string[], deckIds: string[], ch: import('../src/engine/types').CharId = 'duelist', kind: 'normal' | 'elite' | 'boss' = 'normal'): { run: RunState; cb: Combat } {
  ELEMENTS.on = true;
  const run = newRun({ character: ch, ascension: 0, seed: 7, level: 10, echoes: [] });
  run.deck = deckIds.map((id, i) => ({ uid: 2000 + i, id, up: false }));
  run.relics = [];
  const cb = startCombat(run, { id: 't', name: 'Test', enemies }, kind);
  return { run, cb };
}
const off7 = (): void => { ELEMENTS.on = false; COUNTERS.mode = 'auto'; COUNTERS.rebut = false; };

test('v0.7 the element wheel: each wheel element beats exactly two and loses to two; Radiant and Umbral beat each other', () => {
  for (const e of WHEEL) {
    assert.equal(WHEEL.filter((x) => beats(e, x)).length, 2, `${e} beats two`);
    assert.equal(WHEEL.filter((x) => beats(x, e)).length, 2, `${e} loses to two`);
    assert.ok(beats(beaterOf(e)!, e), `beaterOf(${e}) beats it`);
  }
  assert.ok(beats('radiant', 'umbral') && beats('umbral', 'radiant'));
  assert.ok(beats('blaze', 'frost') && beats('blaze', 'wild') && beats('flood', 'blaze') && beats('stone', 'blaze'));
  assert.equal(ELEMENT_LIST.length, 8);
  ELEMENTS.on = true;
  assert.equal(elemMult('blaze', 'frost'), ELEMENTS.strong);
  assert.equal(elemMult('blaze', 'flood'), ELEMENTS.weak);
  assert.equal(elemMult('blaze', 'blaze'), ELEMENTS.weak, 'same element is resisted');
  assert.equal(elemMult('blaze', 'storm'), 1, 'the opposite element is neutral');
  assert.equal(elemMult('blaze', 'radiant'), 1);
  off7();
});

test('v0.7 elemental damage: Frost is effective on a Wild beetle and resisted by a Blaze rat; neutral Strike is unaffected', () => {
  const { cb } = fight7(['bramble_beetle', 'cinder_rat'], ['frost_flask', 'frost_flask', 'strike', 'strike', 'strike', 'guard', 'guard', 'guard', 'guard', 'guard']);
  const [beetle, rat] = cb.s.enemies;
  assert.equal(beetle.elem, 'wild'); assert.equal(rat.elem, 'blaze');
  cb.s.energy = 10;
  const ff = cb.s.hand.filter((c) => c.id === 'frost_flask');
  cb.s.hand.push(...[cb.mkCard('frost_flask'), cb.mkCard('frost_flask'), cb.mkCard('strike')]);
  const f1 = cb.s.hand.filter((c) => c.id === 'frost_flask');
  const b0 = beetle.hp; cb.play(f1[0].uid, 0);
  assert.equal(b0 - beetle.hp, Math.floor(7 * 1.3), 'effective');
  const r0 = rat.hp; cb.play(f1[1].uid, 1);
  assert.equal(r0 - rat.hp, Math.floor(7 * 0.75), 'resisted');
  assert.equal(cb.s.attune, 'frost', 'playing Frost attunes you to Frost');
  void ff;
  const st = cb.s.hand.find((c) => c.id === 'strike')!;
  const r1 = rat.hp; cb.play(st.uid, 1);
  assert.equal(r1 - rat.hp, 6, 'Strike has no element');
  off7();
});

test('v0.7 Attunement decides enemy hits: a Storm-attuned player resists a Stone knight', () => {
  const { cb } = fight7(['rust_knight'], Array(10).fill('guard'));
  const e = cb.s.enemies[0];
  assert.equal(e.elem, 'stone');
  e.move = 'slash';
  cb.s.hand = [];
  cb.s.attune = 'storm'; // Storm beats Stone, so Stone's hit on a Storm-attuned player is resisted.
  const hp = cb.s.player.hp;
  cb.endTurn();
  assert.equal(hp - cb.s.player.hp, Math.floor(10 * ELEMENTS.weak), 'Stone hitting a Storm-attuned player is resisted');
  off7();
});

test('v0.7 Resonance: the third card of one element in a turn fires its bonus once', () => {
  const { cb } = fight7(['iron_colossus'], Array(10).fill('guard'), 'geomancer');
  cb.s.hand = ['cobble', 'cobble', 'cobble', 'cobble'].map((id) => cb.mkCard(id));
  cb.s.energy = 10;
  const p = cb.s.player;
  for (const c of [...cb.s.hand].slice(0, 2)) cb.play(c.uid);
  const b2 = p.block;
  cb.play(cb.s.hand[0].uid);
  assert.equal(p.block - b2, 7 + 8, 'third Stone card: its 7 Block plus Stone Resonance 8 Block');
  const b3 = p.block;
  cb.play(cb.s.hand[0].uid);
  assert.equal(p.block - b3, 7, 'only once per turn');
  assert.equal(cb.run.stats.resonances, 1);
  off7();
});

test('v0.7 counter-chain: an Objection in hand Negates the trap that answers your Strike (paid with energy)', () => {
  const { cb } = fight7(['bramble_beetle'], Array(10).fill('strike'), 'arbiter');
  ELEMENTS.on = false;
  const e = cb.s.enemies[0];
  e.traps = [cb.mkCard('spike_shell')];
  cb.s.hand = [cb.mkCard('strike'), cb.mkCard('objection')];
  cb.s.energy = 3;
  const hp = e.hp;
  cb.play(cb.s.hand[0].uid, 0);
  assert.equal(e.block, 0, 'Spike Shell was negated');
  assert.equal(e.hp, hp - 6);
  assert.equal(cb.s.energy, 1, '1 for Strike, 1 for Objection');
  assert.ok(cb.s.discard.some((c) => c.id === 'objection'), 'the Counter goes to the discard pile');
  assert.equal(cb.s.stats.maxChain, 3);
  assert.equal(cb.s.player.st.verdict, 1, 'the Arbiter gains Verdict for countering');
  off7();
});

test('v0.7 counters can be countered: a Gainsay trap answers your Objection, and a second Objection answers the Gainsay', () => {
  const { cb } = fight7(['bramble_beetle'], Array(10).fill('strike'), 'arbiter');
  ELEMENTS.on = false;
  const e = cb.s.enemies[0];
  e.traps = [cb.mkCard('spike_shell'), cb.mkCard('gainsay')];
  cb.s.hand = [cb.mkCard('strike'), cb.mkCard('objection'), cb.mkCard('objection')];
  cb.s.energy = 3;
  const hp = e.hp;
  cb.play(cb.s.hand[0].uid, 0);
  // Strike → Spike Shell → Objection → Gainsay → Objection. LIFO: Gainsay negated, so the first Objection negates Spike Shell.
  assert.equal(cb.s.stats.maxChain, 5);
  assert.equal(e.hp, hp - 6, 'Strike lands in full');
  assert.equal(e.block, 0);
  off7();
});

test('v0.7 Rebuttal: a boss negates your first Counter; you may counter the Rebuttal', () => {
  COUNTERS.rebut = true;
  const { cb } = fight7(['iron_colossus'], Array(10).fill('strike'), 'arbiter', 'boss');
  ELEMENTS.on = false;
  const e = cb.s.enemies[0];
  assert.ok((e.st.rebut ?? 0) >= 1, 'bosses carry Rebuttals');
  e.st.rebut = 1;
  e.traps = [cb.mkCard('snap_jaw')];
  cb.s.hand = [cb.mkCard('strike'), cb.mkCard('objection')];
  cb.s.energy = 3;
  const php = cb.s.player.hp;
  cb.play(cb.s.hand[0].uid, 0);
  assert.equal(e.st.rebut ?? 0, 0, 'Rebuttal spent');
  assert.equal(cb.s.player.hp, php - 5, 'Snap Jaw still bit: the Objection was rebutted');
  // Now with two Objections the second answers the Rebuttal.
  const { cb: cb2 } = fight7(['iron_colossus'], Array(10).fill('strike'), 'arbiter', 'boss');
  ELEMENTS.on = false;
  const e2 = cb2.s.enemies[0];
  e2.st.rebut = 1; e2.traps = [cb2.mkCard('snap_jaw')];
  cb2.s.hand = [cb2.mkCard('strike'), cb2.mkCard('objection'), cb2.mkCard('objection')];
  cb2.s.energy = 3;
  const p2 = cb2.s.player.hp;
  cb2.play(cb2.s.hand[0].uid, 0);
  assert.equal(cb2.s.player.hp, p2, 'second Objection negated the Rebuttal, so the first negated Snap Jaw');
  off7();
});

test('v0.7 enemy-turn Counters are paid with Flux; with no Flux you cannot answer', () => {
  const { cb } = fight7(['rust_knight'], Array(10).fill('guard'), 'arbiter');
  ELEMENTS.on = false;
  const e = cb.s.enemies[0];
  e.move = 'slash';
  cb.s.hand = [cb.mkCard('quick_parry')];
  cb.s.energy = 0;
  const hp = cb.s.player.hp;
  cb.endTurn();
  assert.equal(hp - cb.s.player.hp, 10, 'no Flux: Quick Parry stays in hand (Counters Retain)');
  assert.ok(cb.s.hand.some((c) => c.id === 'quick_parry'));
  // Next round: keep 1 energy unspent so it banks as Flux.
  cb.s.energy = 1;
  e.move = 'slash';
  const hp2 = cb.s.player.hp;
  cb.endTurn();
  assert.equal(hp2 - cb.s.player.hp, 1, 'Quick Parry blocked 9 of 10');
  off7();
});

test('v0.7 ask mode: attempt() rewinds and returns the window; replaying the decision finishes the action', () => {
  const { cb, run } = fight7(['bramble_beetle'], Array(10).fill('strike'), 'arbiter');
  ELEMENTS.on = false;
  cb.counterMode = 'ask';
  const e = cb.s.enemies[0];
  e.traps = [cb.mkCard('spike_shell')];
  cb.s.hand = [cb.mkCard('strike'), cb.mkCard('objection')];
  cb.s.energy = 3;
  const strike = cb.s.hand[0].uid;
  const before = JSON.stringify(run);
  const win = cb.attempt(() => cb.play(strike, 0));
  assert.ok(win, 'a window opened');
  assert.equal(win!.against, 'Spike Shell');
  assert.equal(JSON.stringify(run), before, 'state rewound exactly');
  cb.decisions = [win!.options[0]];
  assert.equal(cb.attempt(() => cb.play(strike, 0)), null);
  assert.equal(e.block, 0, 'negated');
  // Passing instead lets the trap resolve.
  const { cb: c2 } = fight7(['bramble_beetle'], Array(10).fill('strike'), 'arbiter');
  ELEMENTS.on = false;
  c2.counterMode = 'ask';
  c2.s.enemies[0].traps = [c2.mkCard('spike_shell')];
  c2.s.hand = [c2.mkCard('strike'), c2.mkCard('objection')];
  c2.s.energy = 3;
  c2.decisions = [0];
  assert.equal(c2.attempt(() => c2.play(c2.s.hand[0].uid, 0)), null);
  assert.equal(c2.s.enemies[0].block, 0, 'Spike Shell block was used up by the Strike');
  assert.ok(c2.s.hand.some((c) => c.id === 'objection'), 'Objection kept');
  off7();
});

test('v0.7 Chill builds to Freeze: a Frozen enemy loses its action, and Shatter hits it harder', () => {
  const { cb } = fight7(['rust_knight'], Array(10).fill('guard'), 'rimeblade');
  ELEMENTS.on = false;
  const e = cb.s.enemies[0];
  e.move = 'slash';
  cb.s.hand = [cb.mkCard('cold_snap'), cb.mkCard('shatter')];
  cb.s.energy = 5;
  cb.applyStatus(cb.s.player, e, 'chill', 1);
  cb.play(cb.s.hand[0].uid, 0); // +4 Chill = 5: freezes
  assert.ok(e.st.frozen, 'frozen');
  assert.equal(e.st.chill ?? 0, 0, 'Chill resets on Freeze');
  const hp = e.hp;
  cb.play(cb.s.hand.find((c) => c.id === 'shatter')!.uid, 0);
  assert.equal(hp - e.hp, 6 + 12);
  const php = cb.s.player.hp;
  cb.s.hand = [];
  cb.endTurn();
  assert.equal(cb.s.player.hp, php, 'it did not act');
  assert.ok(!e.st.frozen, 'thawed');
  assert.equal(e.move, 'slash', 'it keeps the same intent');
  assert.equal(cb.freezeAt(e), 8, 'the next Freeze needs 3 more Chill');
  off7();
});

test('v0.7 Shock, Tremor, Mark, Veil and Fortify', () => {
  const { cb } = fight7(['iron_colossus'], Array(10).fill('guard'), 'tempest');
  ELEMENTS.on = false;
  const e = cb.s.enemies[0];
  const p = cb.s.player;
  e.st.shock = 4;
  const hp = e.hp;
  cb.hit(p, e, 5, true);
  assert.equal(hp - e.hp, 9, 'Shock adds 4');
  assert.equal(e.st.shock, 2, 'then halves');
  e.st.mark = 3;
  const hp2 = e.hp;
  cb.hit(p, e, 5, false);
  assert.equal(hp2 - e.hp, 8, 'Mark adds 3 to your damage');
  delete e.st.mark;
  e.st.tremor = 6;
  const hp3 = e.hp;
  cb.s.hand = [];
  cb.endPlayerTurn();
  assert.equal(hp3 - e.hp, 6, 'Tremor at the end of your turn');
  assert.equal(e.st.tremor, 3);
  p.st.veil = 1;
  const php = p.hp;
  assert.equal(cb.hit(e, p, 20, true), 0, 'Veil: a miss');
  assert.equal(p.hp, php);
  assert.ok(!p.st.veil);
  p.st.fortify = 5; p.block = 12;
  cb.startPlayerTurn();
  assert.equal(p.block, 5, 'Fortify keeps up to 5 Block');
  off7();
});

test('v0.7 companions act at the end of your turn; Rally makes them act now', () => {
  const { cb } = fight7(['iron_colossus'], Array(10).fill('guard'), 'beastcaller');
  ELEMENTS.on = false;
  const e = cb.s.enemies[0];
  const p = cb.s.player;
  p.st.wolf = 4; p.st.hawk = 2;
  cb.s.hand = [cb.mkCard('rally')];
  cb.s.energy = 3;
  const hp = e.hp;
  cb.play(cb.s.hand[0].uid);
  assert.equal(hp - e.hp, 6, 'Rally: Wolf 4 + Hawk 2');
  const hp2 = e.hp;
  cb.endPlayerTurn();
  assert.equal(hp2 - e.hp, 6, 'and again at end of turn');
  off7();
});

test('v0.7 Catalyze attunes you to whatever beats the target, so it hits you Resisted', () => {
  const { cb } = fight7(['cinder_rat'], Array(10).fill('guard'), 'alchemist');
  cb.s.hand = [cb.mkCard('catalyze'), cb.mkCard('vial_toss')];
  cb.s.energy = 3;
  cb.play(cb.s.hand[0].uid, 0);
  assert.equal(cb.s.attune, beaterOf('blaze'));
  assert.ok(beats(cb.s.attune!, 'blaze'));
  const e = cb.s.enemies[0];
  const hp = e.hp;
  cb.play(cb.s.hand.find((c) => c.id === 'vial_toss')!.uid, 0);
  assert.equal(hp - e.hp, Math.min(hp, Math.floor(6 * ELEMENTS.strong)), 'Prism Vial Toss takes the Attunement and is Effective');
  off7();
});

test('v0.7 the card pool: about a thousand cards, every one with art, filled text, an element, and a home', () => {
  assert.ok(ALL_PLAYER_CARDS.length >= 950, `${ALL_PLAYER_CARDS.length} player cards`);
  assert.ok(COLLECTIBLE.length >= 900);
  const names = new Set<string>();
  for (const d of ALL_PLAYER_CARDS) {
    assert.ok(!names.has(d.name), `duplicate name ${d.name}`);
    names.add(d.name);
    if (d.rarity === 'special' || d.faction === 'curse') continue;
    assert.ok(ART_ICON[d.id], `${d.id} has an icon`);
    for (const up of [false, true]) assert.ok(!/\{\w+\}|undefined|NaN/.test(cardText({ id: d.id, up })), `${d.id} text: ${cardText({ id: d.id, up })}`);
    if (d.type === 'counter') assert.ok(d.react && d.counter, `${d.id} is a real Counter`);
    if (d.type === 'reaction') assert.ok(d.react && d.trigger, `${d.id} is a real Reaction`);
  }
  for (const ch of CHAR_LIST) {
    assert.ok(rewardPool(ch.id).length >= 150, `${ch.id} has a deep pool`);
    for (const id of ch.deck) assert.ok(CARDS[id], `${ch.id} deck card ${id}`);
    assert.ok(RELICS[ch.relic], `${ch.id} relic`);
    assert.ok(ch.element);
  }
  for (const id of Object.keys(CARDS)) void aspectOf(id);
});

test('v0.7 every new class (and every card) survives bot play with elements, counters and Rebuttals on', () => {
  ELEMENTS.on = true; COUNTERS.rebut = true; WILDS.on = true;
  for (const ch of ['arbiter', 'tempest', 'rimeblade', 'beastcaller', 'geomancer', 'alchemist', 'nightblade'] as const) {
    const run = newRun({ character: ch, ascension: 0, seed: 4242 + ch.length, level: 10, echoes: [], fates: true });
    for (let i = 0; i < 500 && !run.finished; i++) botStep(run);
    assert.ok(run.finished || run.floor > 10, `${ch} finishes`);
  }
  // Every collectible card, played or set by a bot in a short fight.
  const all = COLLECTIBLE.map((c) => c.id);
  for (let i = 0; i < all.length; i += 10) {
    const run = newRun({ character: 'duelist', ascension: 0, seed: 99 + i, level: 10, echoes: [] });
    run.deck = all.slice(i, i + 10).concat(['strike', 'guard', 'quick_parry', 'objection']).map((id, k) => ({ uid: 5000 + k, id, up: k % 2 === 1 }));
    run.relics = [];
    const cb = startCombat(run, { id: 't', name: 'T', enemies: ['bramble_beetle', 'hex_acolyte'] }, 'elite');
    for (let t = 0; t < 4 && cb.s.phase === 'player'; t++) { cb.s.energy = 6; botTurn(run); }
  }
  WILDS.on = false;
  off7();
});

// ───────── v0.9 Clean Cut ─────────
test('v0.9 no two collectible cards are redundant (same type, cost, element and rules, numbers within 2 or 25%)', () => {
  const pairs = redundantPairs();
  assert.equal(pairs.length, 0, pairs.slice(0, 5).map(([a, b]) => `${a.id} ~ ${b.id}`).join(', '));
  // The generated powers no longer copy a hand-made power's text.
  const hand = new Set(ALL_PLAYER_CARDS.filter((c) => c.type === 'power' && !c.gen).map((c) => c.text));
  for (const c of ALL_PLAYER_CARDS.filter((x) => x.type === 'power' && x.gen)) assert.ok(!hand.has(c.text), `${c.id} copies a hand-made power`);
  assert.ok(GEN_CHANGES.length >= 70 && GEN_CHANGES.some((g) => !g.now), 'the pass reworked and cut cards');
  for (const g of GEN_CHANGES) if (!CUT12[g.id]) assert.equal(!!CARDS[g.id], !!g.now, `${g.id} ${g.now ? 'reworked' : 'cut'}`);
});

test('v0.9 the 27 new powers each do what they say', () => {
  const pw = (st: string, n: number, setup: (cb: Combat) => void, check: (cb: Combat, before: { hp: number; block: number; ehp: number }) => void, when: 'end' | 'start' | 'none' = 'end'): void => {
    const { cb } = fight(['bramble_beetle'], Array(10).fill('strike'));
    const p = cb.s.player, e = cb.s.enemies[0];
    e.traps = [];
    p.st[st] = n;
    setup(cb);
    const before = { hp: p.hp, block: p.block, ehp: e.hp };
    if (when === 'end') cb.statusHook(p, 'onTurnEnd');
    if (when === 'start') cb.statusHook(p, 'onTurnStart');
    check(cb, before);
  };
  const E = (cb: Combat) => cb.s.enemies[0];
  pw('stoke9', 3, (cb) => { E(cb).st.burn = 2; }, (cb, b) => assert.equal(E(cb).hp, b.ehp - 3));
  pw('kiln', 4, (cb) => { E(cb).st.burn = 2; }, (cb, b) => assert.equal(cb.s.player.block, b.block + 4), 'start');
  pw('undertow9', 2, () => {}, (cb) => assert.equal(E(cb).st.weak, 2), 'start');
  pw('riptide', 5, (cb) => { cb.s.flux = 2; }, (cb, b) => assert.equal(cb.s.player.block, b.block + 10));
  pw('sap', 2, (cb) => { cb.s.player.st.thorns = 1; cb.s.player.hp -= 10; }, (cb, b) => assert.equal(cb.s.player.hp, b.hp + 2));
  pw('rootwall', 2, (cb) => { cb.s.player.st.thorns = 3; }, (cb, b) => assert.equal(cb.s.player.block, b.block + 6), 'start');
  pw('entropy', 4, () => {}, (cb) => assert.equal(E(cb).st.doom, 4));
  pw('wither', 3, () => {}, (cb) => { cb.statusHook(cb.s.player, 'onChain', 2); assert.equal(E(cb).st.doom, 3); }, 'none');
  pw('dividend', 2, () => {}, (cb) => assert.equal(cb.s.player.st.ante, 2), 'start');
  pw('loaded', 3, () => {}, (cb, b) => { cb.flip(cb.s.player); assert.equal(E(cb).hp, b.ehp - 3); }, 'none');
  pw('refract', 3, (cb) => { cb.s.hand = [cb.mkCard('glint')]; cb.s.energy = 3; }, (cb, b) => { cb.play(cb.s.hand[0].uid, 0); assert.equal(cb.s.player.block, b.block + 3); }, 'none');
  pw('hoard', 3, (cb) => { cb.s.player.traps = [cb.mkCard('parry'), cb.mkCard('parry')]; }, (cb, b) => assert.equal(cb.s.player.block, b.block + 6));
  pw('wake9', 3, () => {}, (cb, b) => { cb.buryTop(1); assert.equal(E(cb).hp, b.ehp - 3); }, 'none');
  pw('cryptward', 5, (cb) => { cb.s.crypt = [cb.mkCard('parry')]; cb.s.player.traps = []; }, (cb, b) => { cb.exhume(1); assert.equal(cb.s.player.block, b.block + 5); }, 'none');
  pw('staticfield', 3, () => {}, (cb) => assert.equal(E(cb).st.shock, 3));
  pw('capacitor9', 2, (cb) => { cb.s.player.st.charge = 3; }, (cb, b) => { new Ctx(cb, cb.s.player, E(cb), 'skill', null, 0).spendCharge(); assert.equal(cb.s.player.block, b.block + 6); }, 'none');
  pw('hoarfrost', 3, (cb) => { E(cb).st.chill = 1; }, (cb, b) => assert.equal(cb.s.player.block, b.block + 3));
  pw('shatter9', 7, (cb) => { E(cb).st.chill = 99; }, (cb, b) => { cb.checkFreeze(E(cb)); assert.equal(E(cb).hp, b.ehp - 7); }, 'none');
  pw('bedrock', 3, () => {}, (cb) => assert.equal(cb.s.player.st.fortify, 3));
  pw('landslide', 5, (cb) => { cb.s.player.block = 10; }, (cb, b) => assert.equal(E(cb).hp, b.ehp - 5));
  pw('vigil', 1, () => {}, (cb) => assert.equal(cb.s.player.st.verdict, 1), 'start');
  pw('absolution', 3, (cb) => { cb.s.once[`ctr${cb.s.turn}`] = 2; cb.s.player.hp -= 10; }, (cb, b) => assert.equal(cb.s.player.hp, b.hp + 6));
  pw('solvent9', 1, () => {}, (cb) => assert.equal(E(cb).st.vuln, 1), 'start');
  pw('philstone', 5, () => {}, (cb, b) => { cb.resonate('stone'); assert.equal(E(cb).hp, b.ehp - 5); }, 'none');
  pw('kinship', 1, (cb) => { cb.s.player.st.bear = 1; cb.s.player.st.hawk = 1; cb.s.player.hp -= 10; }, (cb, b) => assert.ok(cb.s.player.hp >= b.hp + 2));
  pw('cutthroat', 3, (cb) => { E(cb).st.mark = 1; }, (cb, b) => assert.equal(E(cb).hp, b.ehp - 4));
  pw('umbra', 8, (cb) => { cb.s.player.st.veil = 1; }, (cb, b) => { cb.hit(E(cb), cb.s.player, 10, true); assert.equal(E(cb).hp, b.ehp - 8); assert.equal(cb.s.player.hp, b.hp); }, 'none');
});

test('v0.9 saves forget cut cards: collection copies refund 20 Dust, decks and loadouts drop them', () => {
  const p = migrate({ ...newProfile(), dust: 0, collection: { thicket_trap: { n: 2, foil: 0 }, barkskin: { n: 1, foil: 0 } }, loadouts: { warden: ['strike', 'thicket_trap+1'] },
    legacy: [{ id: 'L1', label: 'x', character: 'warden', cards: ['strike', 'beacon_swipe'], won: false, floor: 3, date: '' }] } as never);
  assert.equal(p.dust, 40);
  assert.ok(!p.collection.thicket_trap && p.collection.barkskin);
  assert.deepEqual(p.loadouts.warden, ['strike']);
  assert.deepEqual(p.legacy[0].cards, ['strike']);
  const run = newRun({ character: 'warden', ascension: 0, seed: 5, level: 10, echoes: [] });
  run.deck.push({ uid: 999, id: 'winter_coil', up: false });
  assert.ok(!scrubRun(run).deck.some((c) => c.id === 'winter_coil'));
});

test('v0.10 level-up unlocks list every class, card and relic with an unlock level (and the version matches package.json)', () => {
  for (const c of CHAR_LIST) {
    if (c.unlock <= 1) assert.ok(STARTING_CHARS.includes(c.name), `${c.name} should be a starting class`);
    else assert.ok(UNLOCKS[c.unlock]?.includes(c.name), `${c.name} missing from UNLOCKS[${c.unlock}]`);
  }
  for (const r of Object.values(RELICS)) if ((r.unlock ?? 0) > 1) assert.ok(UNLOCKS[r.unlock!].includes(r.name), r.name);
  assert.equal(STARTING_CHARS.length, 3);
  assert.equal(APP_VERSION, JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')).version);
});

test('v0.10 rest preview equals the real heal (Sky, Fate, Vow, missing HP)', () => {
  for (const [hp, fate, thirst] of [[10, undefined, false], [70, undefined, false], [10, 'ascetic', false], [10, undefined, true]] as const) {
    const r = newRun({ character: 'duelist', ascension: 0, seed: 11, level: 10, echoes: [] });
    r.hp = hp; if (fate) r.fate = fate; if (thirst) r.vows = { ...(r.vows ?? {}), vow_thirst: 1 } as never;
    const want = restHealAmount(r);
    restHeal(r);
    assert.equal(r.hp, hp + want);
    assert.ok(r.hp <= r.maxHp);
  }
});

// ───────── v0.11 "Branching Paths" ─────────
// (ALL_PLAYER_CARDS and COLLECTIBLE are imported above)
import { V11_KIND, textKey } from '../src/data/cards11';
import { altPath, printedCost, exhaustsCopy, retainsCopy, innateCopy, parseUp, upCode } from '../src/data/upgrades';
import { evolveCards, deckCodes, restUpgrade } from '../src/engine/run';
import { STATUSES } from '../src/data/statuses';
import { cardText as cardText11 } from '../src/engine/combat';

test('v0.11 pool (2,000+ after the v0.12 cuts): every card reads cleanly, no v0.11 card repeats any rules text', () => {
  assert.ok(ALL_PLAYER_CARDS.length >= 2100, `${ALL_PLAYER_CARDS.length} player cards`);
  assert.ok(COLLECTIBLE.length >= 2000, `${COLLECTIBLE.length} collectible`);
  const keys = new Map<string, string>();
  for (const c of ALL_PLAYER_CARDS) {
    for (const up of [false, true]) for (const path of [undefined, 'b' as const]) {
      const t = cardText11({ id: c.id, up, path });
      assert.ok(!/\?|undefined|NaN/.test(t), `${c.id}: ${t}`);
    }
    if (c.rarity === 'special') continue;
    const k = textKey(c);
    if (V11_KIND[c.id] && V11_KIND[c.id] !== 'evolved') assert.ok(!keys.has(k), `${c.name} repeats ${keys.get(k)}: ${k}`);
    if (!keys.has(k)) keys.set(k, c.name);
  }
  assert.equal(redundantPairs().length, 0);
  for (const id of Object.keys(V11_KIND)) if (V11_KIND[id] === 'power') assert.ok(STATUSES[`pw_${id}`], `${id} has its status`);
});

test('v0.11 every class drafts from a pool of 300+ cards, and hybrids go to both classes', () => {
  for (const ch of ['duelist', 'warden', 'hollow', 'sharp', 'magpie', 'sexton', 'arbiter', 'tempest', 'rimeblade', 'beastcaller', 'geomancer', 'alchemist', 'nightblade'])
    assert.ok(rewardPool(ch).length >= 300, `${ch}: ${rewardPool(ch).length}`);
  const h = ALL_PLAYER_CARDS.find((c) => c.name === 'Steamburst')!;
  assert.equal(h.faction, 'ember'); assert.equal(h.faction2, 'rime');
  assert.ok(rewardPool('duelist').includes(h.id) && rewardPool('rimeblade').includes(h.id) && !rewardPool('warden').includes(h.id));
  assert.ok(!rewardPool('duelist').some((id) => CARDS[id].evolved));
});

test('v0.11 two upgrade paths: B costs less, Retains, is Innate or stops Exhausting', () => {
  const big = ALL_PLAYER_CARDS.find((c) => c.cost >= 2 && !c.exhaust && c.upCost === undefined && !c.alt)!;
  assert.equal(altPath(big).kind, 'cheap');
  assert.equal(printedCost(big, { up: true, path: 'b' }), big.cost - 1);
  assert.equal(printedCost(big, { up: true }), big.cost);
  const atk = CARDS.strike;
  assert.equal(altPath(atk).kind, 'retain');
  assert.ok(retainsCopy(atk, { up: true, path: 'b' }) && !retainsCopy(atk, { up: true }));
  assert.equal(cardText11({ id: 'strike', up: true, path: 'b' }), cardText11({ id: 'strike', up: false }));
  const ex = ALL_PLAYER_CARDS.find((c) => c.exhaust && !c.upNoExhaust)!;
  assert.ok(exhaustsCopy(ex, { up: true }) && !exhaustsCopy(ex, { up: true, path: 'b' }));
  const re = ALL_PLAYER_CARDS.find((c) => c.type === 'reaction' && c.cost === 1 && !c.exhaust && !c.innate && !c.alt)!;
  assert.ok(innateCopy(re, { up: true, path: 'b' }));
  // rest site + deck codes
  const run = newRun({ character: 'duelist', ascension: 0, seed: 3, level: 10, echoes: [] });
  const s = run.deck.find((c) => c.id === 'strike')!;
  assert.ok(restUpgrade(run, s.uid, 'b'));
  assert.equal(s.path, 'b');
  assert.ok(deckCodes(run).includes('strike+2'));
  assert.deepEqual(parseUp('strike+2'), { id: 'strike', up: true, path: 'b' });
  assert.equal(upCode({ up: true }), '+1');
  // a path-B Strike Retains in combat
  const { cb } = fight(['bramble_beetle'], Array(10).fill('strike'));
  cb.s.hand[0].up = true; cb.s.hand[0].path = 'b';
  const keep = cb.s.hand[0].uid;
  cb.endTurn();
  if (cb.s.phase === 'player') assert.ok(cb.s.hand.some((c) => c.uid === keep));
});

test('v0.11 Evolve: a copy played enough times in won fights becomes its evolved form', () => {
  const base = ALL_PLAYER_CARDS.find((c) => c.name === 'Spark Squire')!;
  assert.ok(base.evolve && CARDS[base.evolve.into].evolved);
  const run = newRun({ character: 'duelist', ascension: 0, seed: 4, level: 10, echoes: [] });
  run.deck = [{ uid: 1, id: base.id, up: true }];
  evolveCards(run, { 1: base.evolve!.n - 1 });
  assert.equal(run.deck[0].id, base.id);
  assert.equal(run.deck[0].evo, base.evolve!.n - 1);
  evolveCards(run, { 1: 1 });
  assert.equal(run.deck[0].id, base.evolve!.into);
  assert.ok(run.deck[0].up && run.deck[0].evo === undefined);
  assert.ok(run.evolved?.[0].includes('Flame Knight'));
  // plays are counted in combat
  const f = fight(['bramble_beetle'], Array(10).fill(base.id));
  f.cb.s.energy = 9;
  const uid = f.cb.s.hand[0].uid;
  f.cb.play(uid, 0);
  assert.equal(f.cb.s.stats.evo?.[uid], 1);
});

test('v0.11 powers fire on their trigger', () => {
  const pw = ALL_PLAYER_CARDS.find((c) => c.name === 'Winter Crown')!;
  const { cb } = fight(['bramble_beetle'], Array(10).fill('strike'));
  cb.s.player.st[`pw_${pw.id}`] = 2;
  cb.endTurn();
  assert.ok((cb.s.enemies[0].st.chill ?? 0) >= 2 || cb.s.enemies[0].st.frozen);
});

// ───────── v0.12 Fewer, Better ─────────
import { cardChoices, offerFits, deckThemes } from '../src/engine/run';
import { effectsOf } from '../src/data/patterns';

test('v0.12 cut cards are gone everywhere, and nothing the game names was cut', () => {
  assert.ok(Object.keys(CUT12).length >= 300);
  for (const id of Object.keys(CUT12)) assert.ok(!CARDS[id], `${id} still exists`);
  for (const [k, ch] of Object.entries(CHARACTERS)) for (const id of ch.deck) assert.ok(CARDS[id], `${k} starts with cut card ${id}`);
  for (const c of ALL_PLAYER_CARDS) if (c.evolve) assert.ok(CARDS[c.evolve.into], `${c.id} evolves into a missing card`);
  for (const ch of ['duelist', 'warden', 'hollow', 'sharp', 'magpie', 'sexton', 'arbiter', 'tempest', 'rimeblade', 'beastcaller', 'geomancer', 'alchemist', 'nightblade'])
    for (const t of ['attack', 'skill', 'reaction', 'counter', 'power']) assert.ok(rewardPool(ch).filter((id) => CARDS[id].type === t).length >= (t === 'power' ? 10 : 20), `${ch} has few ${t}s`);
});

test('v0.12 saves: a cut card becomes the card it played like (collection, run deck, loadout); others refund Dust', () => {
  const [cut, twin] = Object.entries(CUT12_TWIN).find(([, t]) => CARDS[t])!;
  const other = Object.keys(CUT12).find((id) => !CUT12_TWIN[id])!;
  const old = JSON.parse(JSON.stringify(newProfile()));
  old.collection = { [cut]: { n: 2, foil: 1 }, [other]: { n: 1, foil: 0 } };
  old.loadouts = { duelist: [`${cut}+2`] };
  const p = migrate(old);
  assert.equal(p.collection[twin]?.n, 2);
  assert.equal(p.collection[twin]?.foil, 1);
  assert.ok(!p.collection[cut] && !p.collection[other]);
  assert.equal(p.dust, old.dust + 20);
  assert.deepEqual(p.loadouts.duelist, [`${twin}+2`]);
  const run = newRun({ character: 'duelist', ascension: 0, seed: 3, level: 10, echoes: [] });
  run.deck = [{ uid: 1, id: cut, up: true, path: 'b' }, { uid: 2, id: other, up: false }];
  scrubRun(run);
  assert.deepEqual(run.deck.map((c) => [c.id, c.up, c.path]), [[twin, true, 'b']]);
});

test('v0.12 card rewards: never two cards that play the same way, never three of one type, and one leans to your deck', () => {
  let leaned = 0, n = 0;
  for (let seed = 1; seed <= 60; seed++) {
    const run = newRun({ character: (['duelist', 'rimeblade', 'sexton'] as const)[seed % 3], ascension: 0, seed, level: 10, echoes: [] });
    for (let k = 0; k < 4; k++) {
      const offer = cardChoices(run, k % 2 ? 'elite' : 'normal');
      assert.equal(new Set(offer).size, offer.length);
      for (let i = 0; i < offer.length; i++) assert.ok(offerFits(offer[i], offer.slice(0, i)), `${offer.join(', ')}`);
      const types = offer.map((id) => CARDS[id].type);
      assert.ok(!types.some((t) => types.filter((x) => x === t).length >= 3), types.join());
      const th = deckThemes(run);
      n++; if (effectsOf(CARDS[offer[offer.length - 1]]).some((e) => [...th].some((t) => e.includes(t)))) leaned++;
      run.deck.push({ uid: 900 + k, id: offer[0], up: false });
    }
  }
  assert.ok(leaned / n > 0.4, `last offer fits the deck ${leaned}/${n}`);
});

test('v0.12 every act map has a Merchant in its middle rows', () => {
  for (let seed = 1; seed <= 40; seed++) {
    const run = newRun({ character: 'warden', ascension: seed % 5, seed, level: 10, echoes: [] });
    assert.ok(run.map.flat().some((nd) => nd && nd.type === 'shop' && nd.row >= 3 && nd.row <= ROWS - 3), `seed ${seed}`);
  }
});

test('v0.12 pacing: bosses hit harder and have less HP than v0.11; Act 1 hallway enemies hit harder', () => {
  assert.ok(DIFFICULTY.hp.boss[0] < 1.05 && DIFFICULTY.kindDmg.boss[0] > 1);
  assert.ok(DIFFICULTY.kindDmg.normal[0] > 1);
});

test('v0.12.1 the counter window shows what the enemy link does: trap card text, or the move with its damage and target', () => {
  const { cb } = fight7(['bramble_beetle'], Array(10).fill('strike'), 'arbiter');
  ELEMENTS.on = false;
  cb.counterMode = 'ask';
  const e = cb.s.enemies[0];
  e.traps = [cb.mkCard('spike_shell')];
  cb.s.hand = [cb.mkCard('strike'), cb.mkCard('objection')];
  cb.s.energy = 3;
  const win = cb.attempt(() => cb.play(cb.s.hand[0].uid, 0))!;
  const trap = win.chain[win.chain.length - 1];
  assert.equal(trap.card?.id, 'spike_shell', 'the trap is shown face-up');
  assert.ok(trap.text && /Guard/.test(trap.text), `trap text: ${trap.text}`);
  assert.equal(trap.target, 'You');
  assert.equal(win.chain[0].card?.id, 'strike');
  // An enemy move: the window carries its intent preview and says it hits you.
  const { cb: c2 } = fight7(['bramble_beetle'], Array(10).fill('strike'), 'arbiter');
  ELEMENTS.on = false;
  c2.counterMode = 'ask';
  const e2 = c2.s.enemies[0];
  e2.traps = [];
  e2.move = 'horn';
  c2.s.hand = [c2.mkCard('contempt')];
  c2.s.phase = 'enemy';
  c2.s.flux = 3;
  const w2 = c2.attempt(() => c2.enemyAct(0))!;
  assert.ok(w2, 'a window opened on the enemy move');
  const mv = w2.chain[0];
  assert.equal(mv.name, 'Horn');
  assert.ok(mv.intents?.some((i) => i.icon === 'atk' && (i.n ?? 0) > 0), 'attack preview');
  assert.ok(/Deal \d+ damage/.test(mv.text ?? ''), `move text: ${mv.text}`);
  assert.equal(mv.target, 'You');
  // Sims do not pay for the detail: the recap event only carries names unless detail is on.
  const { cb: c3 } = fight7(['bramble_beetle'], Array(10).fill('strike'), 'arbiter');
  ELEMENTS.on = false;
  c3.s.enemies[0].traps = [c3.mkCard('spike_shell')];
  c3.s.hand = [c3.mkCard('strike')];
  c3.s.energy = 3;
  c3.play(c3.s.hand[0].uid, 0);
  const ev = c3.events.find((x) => x.t === 'chain')!;
  assert.equal(ev.links![1].text, undefined);
  c3.detail = true;
  c3.s.enemies[0].traps = [c3.mkCard('spike_shell')];
  c3.s.hand = [c3.mkCard('strike')];
  c3.s.energy = 3;
  c3.play(c3.s.hand[0].uid, 0);
  const ev2 = [...c3.events].reverse().find((x) => x.t === 'chain')!;
  assert.ok(ev2.links![1].text && ev2.links![1].card?.id === 'spike_shell', 'detail recap carries the card');
  off7();
});

// v0.13: the audio layer is off-safe: with no browser AudioContext (tests, sims) every call is a silent no-op.
{
  const audio = await import('../src/ui/audio');
  test('audio is a silent no-op without a browser', () => {
    audio.unlock();
    audio.setMood('act2:3');
    audio.sfx('bossIntro');
    audio.chainNotes([{ mine: true, negated: false, counter: true }, { mine: false, negated: true }]);
    audio.hush(true); audio.setTension(1); audio.applyVolumes(); audio.stopMusic();
    assert.equal(audio.nowPlaying(), '');
  });
}

test('v0.13.1 ask mode stops whenever the enemy answers, even with no Counter that can answer back', () => {
  const { cb } = fight7(['bramble_beetle'], Array(10).fill('strike'), 'arbiter');
  ELEMENTS.on = false;
  cb.counterMode = 'ask';
  const e = cb.s.enemies[0];
  e.traps = [cb.mkCard('spike_shell')];
  cb.s.hand = [cb.mkCard('strike'), cb.mkCard('contempt')];
  cb.s.energy = 3;
  const strike = cb.s.hand[0].uid;
  const win = cb.attempt(() => cb.play(strike, 0));
  assert.ok(win, 'the game stopped on the trap');
  assert.equal(win!.options.length, 0);
  assert.equal(win!.against, 'Spike Shell');
  assert.ok(win!.blocked?.some((b) => /only answers attacks/.test(b.reason)), 'says why Contempt cannot answer');
  cb.decisions = [0];
  assert.equal(cb.attempt(() => cb.play(strike, 0)), null, 'letting it resolve finishes the action');
  assert.ok(cb.s.stats.maxChain >= 2);
  // A plain enemy move with nothing to answer it does not stop the game, and Automatic never stops.
  const { cb: c2 } = fight7(['bramble_beetle'], Array(10).fill('strike'), 'arbiter');
  ELEMENTS.on = false;
  c2.counterMode = 'ask';
  c2.s.enemies[0].traps = [];
  c2.s.enemies[0].move = 'horn';
  c2.s.hand = [];
  c2.s.phase = 'enemy';
  assert.equal(c2.attempt(() => c2.enemyAct(0)), null);
  const { cb: c3 } = fight7(['bramble_beetle'], Array(10).fill('strike'), 'arbiter');
  ELEMENTS.on = false;
  c3.counterMode = 'auto';
  c3.s.enemies[0].traps = [c3.mkCard('spike_shell')];
  c3.s.hand = [c3.mkCard('strike')];
  c3.s.energy = 3;
  assert.equal(c3.attempt(() => c3.play(c3.s.hand[0].uid, 0)), null);
  off7();
});

// ───────── v0.14 Clean Slate ─────────
import { peek, isDown, takeCard, answerDealer, removePriceFor, payDebt, restRehearse, restScout, REMOVE_BASE, DEBT_PRICE, PATRON_TRAP, suitOf } from '../src/engine/run';
import { EXPOSED } from '../src/engine/combat';

test('v0.14 some map cards are dealt face-down, show only a suit, and a Peek flips one', () => {
  let downs = 0, total = 0;
  for (let seed = 1; seed <= 20; seed++) {
    const run = newRun({ character: 'duelist', ascension: 0, seed, level: 10, echoes: [] });
    for (const row of run.map) for (const n of row) { total++; if (n.down) { downs++; assert.ok(n.type !== 'boss'); assert.ok(suitOf(n.type)); } }
  }
  assert.ok(downs > total * 0.08 && downs < total * 0.35, `face-down share ${downs}/${total}`);
  const run = newRun({ character: 'duelist', ascension: 0, seed: 3, level: 10, echoes: [] });
  assert.equal(run.peeks, 1);
  const n = run.map.flat().find((x) => x.down)!;
  assert.ok(isDown(n));
  assert.ok(peek(run, n.row, n.col));
  assert.ok(!isDown(n) && (run.peeks as number) === 0);
  assert.ok(!peek(run, n.row, n.col), 'no Peeks left');
  const hi = newRun({ character: 'duelist', ascension: 5, seed: 3, level: 10, echoes: [] });
  assert.equal(hi.peeks, 0, 'Stakes 5 takes the Act 1 Peek away');
});

test('v0.14 the reward deals a face-down card a rarity up, and the Dealer can answer a rare pick', () => {
  const run = newRun({ character: 'duelist', ascension: 4, seed: 9, level: 10, echoes: [] });
  const rare = rewardPool('duelist', 10).find((id) => CARDS[id].rarity === 'rare')!;
  run.reward = { gold: 0, goldTaken: true, cards: [rare], relic: null, hidden: null };
  run.gold = 100;
  takeCard(run, rare);
  assert.ok(run.reward.answer, 'Stakes 4: the Dealer answers every rare');
  const before = run.deck.length;
  assert.ok(answerDealer(run, true));
  assert.equal(run.gold, 100 - 30);
  assert.equal(run.deck.length, before, 'negated: no Jinx');
  run.reward = { gold: 0, goldTaken: true, cards: [rare], relic: null, hidden: null };
  takeCard(run, rare);
  assert.ok(answerDealer(run, false));
  assert.ok(run.deck.some((c) => c.id === 'regret'), 'let it resolve: a Regret Jinx joins the deck');
});

test('v0.14 removal starts at 60 and Jinxes go for half; Patron debts can be paid at the Merchant', () => {
  assert.equal(REMOVE_BASE, 60);
  const run = newRun({ character: 'duelist', ascension: 0, seed: 5, level: 10, echoes: [] });
  run.shop = { cards: [], relics: [], removePrice: 60, removed: false, omens: [] };
  run.deck.push({ uid: 999, id: 'regret', up: false } as any);
  assert.equal(removePriceFor(run, 999), 30);
  assert.equal(removePriceFor(run, run.deck[0].uid), 60);
  run.screen = 'shop';
  run.debts = [{ patron: 'masked', act: 2, trap: PATRON_TRAP.masked }];
  run.gold = DEBT_PRICE;
  assert.ok(payDebt(run, 0));
  assert.equal(run.debts.length, 0);
  assert.equal(run.gold, 0);
});

test('v0.14 the Candle: Mend heals a quarter plus 4, Rehearse pre-sets a Reaction, Scout flips the map', () => {
  const run = newRun({ character: 'duelist', ascension: 0, seed: 5, level: 10, echoes: [] });
  run.hp = 1;
  assert.equal(restHealAmount(run), Math.round(run.maxHp * 0.25 + 4));
  const react = Object.values(CARDS).find((c) => c.type === 'reaction')!;
  run.deck.push({ uid: 777, id: react.id, up: false } as any);
  assert.ok(!restRehearse(run, run.deck[0].uid) || CARDS[run.deck[0].id].type === 'reaction');
  assert.ok(restRehearse(run, 777));
  assert.equal(run.rehearse, react.id);
  const r2 = newRun({ character: 'duelist', ascension: 0, seed: 3, level: 10, echoes: [] });
  assert.ok(r2.map.flat().some((n) => isDown(n)));
  assert.ok(restScout(r2));
  assert.ok(!r2.map.flat().some((n) => isDown(n)) && r2.scout);
});

test('v0.14 Exposed is +40%', () => { assert.equal(EXPOSED, 1.4); });

console.log(`\n${passed} tests passed`);
