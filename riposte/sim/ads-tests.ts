// v0.17 Ads, the Dealer's favors and the Last Word Edition: `npm test` (after the rules tests).
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { newRun, startCombat, genShop, takeCard } from '../src/engine/run';
import type { RunState } from '../src/engine/types';
import { FAVORS, RUN_FAVORS, LAST_HAND_HP, favorReady, favorLeft, favorsOn, grantFavor } from '../src/engine/favors';
import { AD_RULES, DEMO, actLocked, applyEntitlement, cutReady, endOfRunAd, newAdsState, noteEndAd, offersVisible, pitchDue } from '../src/ads/policy';
import { migrate, newProfile } from '../src/engine/meta';
import { omenCap } from '../src/data/omens';
import { COSMETIC_MAP } from '../src/data/season';
import { EDITION_COSMETICS } from '../src/ads/policy';

let passed = 0;
function test(name: string, fn: () => void): void {
  try { fn(); passed++; console.log(`ok  ${name}`); } catch (e) { console.error(`FAIL ${name}`); throw e; }
}

const run = (seed = 7): RunState => newRun({ character: 'duelist', ascension: 0, seed, level: 10, echoes: [] });
function atReward(r: RunState, cards = ['strike', 'guard', 'mirror_tide']): RunState {
  r.screen = 'reward';
  r.reward = { gold: 20, goldTaken: false, cards: [...cards], relic: null, hidden: null };
  return r;
}

// ───────── end-of-run ads ─────────

test('end-of-run ad: none for owners, none in the first runs, at most one per run, a gap between ads', () => {
  const a = newAdsState();
  const now = 10_000_000;
  const ctx = { runs: 1, runSeed: 1, watchedThisRun: 0, now };
  assert.equal(endOfRunAd({ ...a, owned: true }, { ...ctx, runs: 9 }), 'owned');
  for (let n = 0; n < AD_RULES.graceRuns; n++) assert.equal(endOfRunAd(a, { ...ctx, runs: n }), 'grace');
  assert.equal(endOfRunAd(a, { ...ctx, runs: AD_RULES.graceRuns }), 'show');
  noteEndAd(a, 1, now);
  assert.equal(a.interstitials, 1);
  assert.equal(endOfRunAd(a, { ...ctx, runs: 5, now: now + AD_RULES.gapMs * 2 }), 'already');
  assert.equal(endOfRunAd(a, { ...ctx, runs: 5, runSeed: 2, now: now + 1000 }), 'gap');
  assert.equal(endOfRunAd(a, { ...ctx, runs: 5, runSeed: 2, now: now + AD_RULES.gapMs }), 'show');
  assert.equal(endOfRunAd(a, { ...ctx, runs: 5, runSeed: 2, watchedThisRun: 1, now: now + AD_RULES.gapMs }), 'watched');
});

test('end-of-run ad: the first Act 1 boss clear ends the ad-free start early', () => {
  const a = newAdsState();
  const ctx = { runs: 1, runSeed: 3, watchedThisRun: 0, now: 1 };
  assert.equal(endOfRunAd(a, ctx), 'grace');
  a.act1 = true;
  assert.equal(endOfRunAd(a, ctx), 'show');
});

test('the Dealer pitches the Edition on the first Act 1 clear, then at most once every few runs', () => {
  const a = newAdsState();
  assert.ok(!pitchDue(a, 1, false));
  assert.ok(pitchDue(a, 1, true));
  a.pitchedAt = 1;
  for (let n = 2; n < 1 + AD_RULES.pitchEvery; n++) assert.ok(!pitchDue(a, n, true), `run ${n}`);
  assert.ok(pitchDue(a, 1 + AD_RULES.pitchEvery, true));
  assert.ok(!pitchDue({ ...a, owned: true }, 99, true));
  assert.ok(!pitchDue({ ...a, quiet: true }, 99, true));
});

// ───────── entitlement ─────────

test('entitlement: offline keeps the cached answer, a refund revokes it, the web stand-in survives a store "no"', () => {
  const a = newAdsState();
  assert.equal(applyEntitlement(a, true, 'purchase', 5), true);
  assert.equal(applyEntitlement(a, null, 'check', 6), true);
  assert.equal(a.checked, 5);
  assert.equal(applyEntitlement(a, false, 'check', 7), false);
  const m = newAdsState();
  applyEntitlement(m, true, 'mock', 1);
  assert.equal(applyEntitlement(m, false, 'check', 2), true);
});

test('the Dealer\'s Cut: once a day, only after the daily gift', () => {
  const a = newAdsState();
  assert.ok(!cutReady(a, '2026-10-25', '2026-10-26'));
  assert.ok(cutReady(a, '2026-10-26', '2026-10-26'));
  a.cutDay = '2026-10-26';
  assert.ok(!cutReady(a, '2026-10-26', '2026-10-26'));
});

test('Reduce distraction hides offers, except for owners (their favors are free)', () => {
  const a = newAdsState();
  assert.ok(offersVisible(a));
  a.quiet = true;
  assert.ok(!offersVisible(a));
  a.owned = true;
  assert.ok(offersVisible(a));
});

test('old saves gain the ads state; the Edition cosmetics exist; the demo lock is off in this build', () => {
  const raw = { ...newProfile() } as Partial<ReturnType<typeof newProfile>>;
  delete raw.ads;
  const p = migrate(raw);
  assert.equal(p.ads.owned, false);
  assert.equal(p.ads.consent, 'unknown');
  for (const id of EDITION_COSMETICS) assert.ok(COSMETIC_MAP[id], id);
  assert.equal(DEMO.on, false);
  assert.ok(!actLocked(p.ads, 3));
  DEMO.on = true;
  assert.ok(actLocked(p.ads, 2) && !actLocked(p.ads, 1) && !actLocked({ ...p.ads, owned: true }, 3));
  DEMO.on = false;
});

// ───────── the Dealer's favors ─────────

test('favors never touch Daily Duels, Weekly Gauntlets, the tutorial, Arena or Riddles', () => {
  assert.ok(favorsOn(run()));
  for (const k of ['daily', 'weekly', 'tutorial', 'arena', 'puzzle'] as const) {
    const r = atReward(run());
    (r as unknown as Record<string, unknown>)[k] = k === 'tutorial' ? true : k === 'arena' ? { wins: 0, rival: 'x' } : 'x';
    assert.ok(!favorsOn(r), k);
    assert.ok(!favorReady(r, 'second_look'), k);
    assert.equal(grantFavor(r, 'ante_up'), null, k);
  }
});

test('Second Look: two cards from one Deal, once per act', () => {
  const r = atReward(run());
  assert.ok(grantFavor(r, 'second_look'));
  assert.ok(!favorReady(r, 'second_look'));
  const before = r.deck.length;
  // takeCard is the engine's: the rest of the Deal stays for one more pick.
  takeCard(r, 'strike');
  assert.deepEqual(r.reward!.cards, ['guard', 'mirror_tide']);
  takeCard(r, 'guard');
  assert.equal(r.reward!.cards, null);
  assert.equal(r.deck.length, before + 2);
  atReward(r);
  assert.ok(!favorReady(r, 'second_look'), 'used this act');
  r.act = 2;
  assert.ok(favorReady(r, 'second_look'), 'new act');
});

test('Ante Up doubles this fight\'s gold, once per act, only before you take it', () => {
  const r = atReward(run());
  assert.ok(grantFavor(r, 'ante_up'));
  assert.equal(r.reward!.gold, 40);
  assert.equal(grantFavor(r, 'ante_up'), null);
  r.act = 2;
  atReward(r).reward!.goldTaken = true;
  assert.ok(!favorReady(r, 'ante_up'));
});

test('Fresh Stock restocks unsold cards only, once per shop and twice per run; Up His Sleeve needs belt room', () => {
  const r = run();
  r.screen = 'shop';
  r.shop = genShop(r);
  const sold = r.shop!.cards[0];
  sold.sold = true;
  assert.ok(grantFavor(r, 'restock'));
  assert.equal(r.shop!.cards[0], sold);
  assert.ok(!favorReady(r, 'restock'), 'once per shop');
  r.floor = 5; r.shop = genShop(r);
  assert.ok(grantFavor(r, 'restock'));
  r.floor = 9; r.shop = genShop(r);
  assert.ok(!favorReady(r, 'restock'), 'twice per run');
  r.omens = [];
  assert.ok(grantFavor(r, 'sleeve'));
  assert.equal(r.omens!.length, 1);
  r.act = 2; r.omens = Array(omenCap(r)).fill('fool');
  assert.ok(!favorReady(r, 'sleeve'), 'belt full');
});

test('Relight Wick: one more Candle choice, once per run; Another Fate deals three new Fates, once', () => {
  const r = run();
  r.screen = 'rest'; r.restDone = false;
  assert.ok(!favorReady(r, 'relight'), 'only after the first choice');
  r.restDone = true;
  assert.ok(grantFavor(r, 'relight'));
  assert.equal(r.restDone, false);
  r.restDone = true;
  assert.ok(!favorReady(r, 'relight'));
  r.screen = 'fate'; r.fateOffer = ['pauper', 'gambler', 'scholar'];
  const old = [...r.fateOffer];
  assert.ok(grantFavor(r, 'refate'));
  assert.equal(r.fateOffer!.length, 3);
  assert.ok(r.fateOffer!.every((f) => !old.includes(f)));
  assert.ok(!favorReady(r, 'refate'));
});

test('One More Hand: replay the lost fight at half HP, once per run', () => {
  const r = run();
  r.deck = r.deck.slice(0, 10);
  startCombat(r, { id: 't', name: 'Test', enemies: ['bramble_beetle'] }, 'normal');
  r.combat!.phase = 'lost';
  r.combat!.player.hp = 0;
  assert.ok(grantFavor(r, 'last_hand'));
  assert.equal(r.hp, Math.ceil(r.maxHp * LAST_HAND_HP));
  assert.equal(r.combat!.phase, 'player');
  assert.equal(r.combat!.player.hp, r.hp);
  assert.equal(r.screen, 'combat');
  r.combat!.phase = 'lost';
  assert.ok(!favorReady(r, 'last_hand'));
});

test('a run holds at most RUN_FAVORS favors in total', () => {
  const r = run();
  for (let act = 1; act <= 4; act++) {
    r.act = act;
    atReward(r);
    grantFavor(r, 'second_look');
    atReward(r);
    grantFavor(r, 'ante_up');
  }
  assert.equal(r.favors!.total, RUN_FAVORS);
  r.act = 5; atReward(r);
  assert.equal(favorLeft(r, 'ante_up'), 0);
  assert.ok(Object.values(FAVORS).every((f) => f.cap >= 1));
});

test('the rules engine and the sims never use ads or favors (balance numbers stay ad-free)', () => {
  const files = [
    ...readdirSync('sim').filter((f) => f.endsWith('.ts') && f !== 'ads-tests.ts').map((f) => `sim/${f}`),
    ...readdirSync('src/engine').filter((f) => f.endsWith('.ts') && f !== 'favors.ts' && f !== 'meta.ts').map((f) => `src/engine/${f}`),
  ];
  for (const f of files) {
    const src = readFileSync(f, 'utf8');
    assert.ok(!/from '[./]+(engine\/)?favors'|from '[./]+ads/.test(src), f);
  }
  // meta.ts only takes the AdsState shape for the save file.
  assert.ok(!/favors|grantFavor/.test(readFileSync('src/engine/meta.ts', 'utf8').replace(/ads\/policy/, '')));
});

console.log(`\n${passed} ads tests passed`);
