// v0.17 Ads and the Last Word Edition: the pure rules. No DOM, no plugins, so `npm test` covers every cap,
// and the sims (which never import src/ads) can never see an ad or a favor.

/** What the profile remembers about ads and the Edition. Lives at `profile.ads`. */
export interface AdsState {
  /** The Last Word Edition is owned (cached, so it keeps working offline). */
  owned: boolean;
  /** How ownership was last confirmed: a store purchase, a restore, the web stand-in, or a store check on launch. */
  via: 'purchase' | 'restore' | 'mock' | 'check' | null;
  /** When the store last answered an entitlement check (ms). 0 = never. */
  checked: number;
  /** When the last end-of-run ad was shown (ms). */
  lastAd: number;
  /** Seed of the run that last showed an end-of-run ad (so one run never shows two). */
  adRun: number | null;
  /** Lifetime counts, for the Settings status line. */
  interstitials: number;
  rewarded: number;
  /** Day the Dealer's Cut (the second daily pack) was last taken. */
  cutDay: string;
  /** Ad consent: 'unknown' until the consent prompt answers; 'limited' = non-personalized ads only. */
  consent: 'unknown' | 'full' | 'limited';
  /** Reduce distraction: hide the optional ad offers (favors and the Edition nudges). End-of-run ads keep their caps. */
  quiet: boolean;
  /** The first Act 1 boss has fallen: end-of-run ads may start (or after graceRuns runs, whichever comes first). */
  act1: boolean;
  /** Runs finished when the Dealer last offered the Edition himself (null = never). */
  pitchedAt: number | null;
}

export function newAdsState(): AdsState {
  return { owned: false, via: null, checked: 0, lastAd: 0, adRun: null, interstitials: 0, rewarded: 0, cutDay: '', consent: 'unknown', quiet: false, act1: false, pitchedAt: null };
}

export const AD_RULES = {
  /** No end-of-run ad until this many runs are finished, or the first Act 1 boss clear, whichever comes first. */
  graceRuns: 3,
  /** The Dealer offers the Edition himself on the first Act 1 boss clear, then at most once every this many runs. */
  pitchEvery: 5,
  /** At least this long between two end-of-run ads, however short the runs (ms). */
  gapMs: 5 * 60_000,
  /** The web stand-in ad lasts this long (s). */
  mockSeconds: 5,
};

export const EDITION = {
  name: 'Last Word Edition',
  /** Store product id (App Store Connect and Play Console) and the RevenueCat entitlement it unlocks. */
  product: 'dawnwick_last_word',
  entitlement: 'last_word',
  /** Shown until the store returns the local price. */
  price: '$4.99',
  perks: [
    'No ads at the end of a run, ever',
    'Every Dealer\'s favor without watching an ad (same limits per run)',
    'The Dealer\'s Cut every day: a second free Duelist Pack',
    'A gold candle on the title screen, the Last Word card back and the title "Keeper of the Last Word"',
  ],
};

/** Cosmetics the Edition grants (src/data/season.ts). */
export const EDITION_COSMETICS = ['back_lastword', 'title_lastword'];

export interface EndCtx {
  /** Runs finished so far (including this one). */
  runs: number;
  runSeed: number;
  /** Favors watched this run: if the player already watched an ad for the Dealer, he does not ask again. */
  watchedThisRun: number;
  now: number;
}

export type EndVerdict = 'show' | 'owned' | 'grace' | 'already' | 'watched' | 'gap';

/** Should the end-of-run ad play? It plays after the recap, as the player leaves the results screen, never in a fight. */
export function endOfRunAd(a: AdsState, c: EndCtx): EndVerdict {
  if (a.owned) return 'owned';
  if (c.runs < AD_RULES.graceRuns && !a.act1) return 'grace';
  if (a.adRun === c.runSeed) return 'already';
  if (c.watchedThisRun > 0) return 'watched';
  if (a.lastAd && c.now - a.lastAd < AD_RULES.gapMs) return 'gap';
  return 'show';
}

export function noteEndAd(a: AdsState, runSeed: number, now: number): void {
  a.adRun = runSeed;
  a.lastAd = now;
  a.interstitials++;
}

/**
 * Merge a store answer into the cached entitlement. `true` grants; `false` revokes only when the store was really
 * asked (a refund); `null` means the store could not be reached, so the cached answer stands (offline play).
 */
export function applyEntitlement(a: AdsState, has: boolean | null, via: AdsState['via'], now: number): boolean {
  if (has === null) return a.owned;
  a.checked = now;
  if (has) { a.owned = true; a.via = via; } else if (a.via !== 'mock') { a.owned = false; a.via = null; }
  return a.owned;
}

/** The Dealer's Cut: a second free Duelist Pack each day, after the daily gift is claimed. */
export function cutReady(a: AdsState, giftDay: string, day: string): boolean {
  return giftDay === day && a.cutDay !== day;
}

/** Show optional ad offers (favor buttons, Edition nudges)? Owners always see favors: for them they are free perks. */
export function offersVisible(a: AdsState): boolean { return a.owned || !a.quiet; }

/**
 * The Dealer's own pitch for the Edition: once, on the first run that clears the Act 1 boss, then at most once every
 * AD_RULES.pitchEvery runs. A single dismissable card on the results screen; never for owners or with Reduce distraction.
 */
export function pitchDue(a: AdsState, runs: number, clearedAct1: boolean): boolean {
  if (a.owned || a.quiet || !clearedAct1) return false;
  return a.pitchedAt === null || runs - a.pitchedAt >= AD_RULES.pitchEvery;
}

/**
 * A Steam-style demo switch for later: with `on`, Acts 2 and 3 need the Edition. Off in this build (the free game is the
 * whole game, with ads); kept here so the entitlement already answers the question in one place.
 */
export const DEMO = { on: false, freeActs: 1 };
export function actLocked(a: AdsState, act: number): boolean { return DEMO.on && !a.owned && act > DEMO.freeActs; }
