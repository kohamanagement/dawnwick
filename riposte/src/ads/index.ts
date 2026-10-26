// v0.17 The one place the game asks for an ad or the Edition. Picks the native adapters inside the iOS/Android app
// and the web stand-in everywhere else, keeps the cached entitlement in the profile, and pauses the music during ads.
import type { AdResult, AdsAdapter, BuyResult, RestoreResult, StoreAdapter } from './adapter';
import { mockAds, mockStore } from './mock';
import { applyEntitlement, endOfRunAd, noteEndAd, type AdsState, type EndCtx, type EndVerdict } from './policy';

let ads: AdsAdapter = mockAds;
let shop: StoreAdapter = mockStore;
let state: () => AdsState = () => { throw new Error('ads not configured'); };
let save: () => void = () => {};
let hush: (on: boolean) => void = () => {};
let price: string | null = null;
let privacy = false;
let ready: Promise<void> | null = null;

export const backend = (): { ads: string; store: string; real: boolean } => ({ ads: ads.name, store: shop.name, real: ads.real });
export const localPrice = (): string | null => price;
export const hasPrivacyOptions = (): boolean => privacy;

/** Wire up once at boot. Native plugins load lazily so the web build never runs them. */
export function configure(o: { state: () => AdsState; save: () => void; hush: (on: boolean) => void; childSafe: () => boolean }): Promise<void> {
  state = o.state; save = o.save; hush = o.hush;
  ready ??= (async () => {
    // The native shell injects window.Capacitor; checking it here keeps @capacitor/core out of the web bundle.
    if ((globalThis as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor?.isNativePlatform?.()) {
      try {
        const n = await import('./native');
        ads = n.admobAds; shop = n.revenueCatStore;
      } catch { /* plugins missing: stay on the stand-in */ }
    }
    try {
      await shop.init();
      price = await shop.price();
      applyEntitlement(state(), await shop.entitled(), 'check', Date.now());
    } catch { /* offline or store down: the cached entitlement stands */ }
    if (!state().owned) await startAds(o.childSafe());
    save();
  })();
  return ready;
}

async function startAds(childSafe: boolean): Promise<void> {
  try {
    const c = await ads.init({ childSafe });
    state().consent = c.personalized ? 'full' : 'limited';
    privacy = c.privacyOptions;
  } catch { /* consent or SDK failure: ads simply do not show */ }
}

async function play(fn: () => Promise<AdResult>): Promise<AdResult> {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return 'offline';
  hush(true);
  try { return await fn(); } catch { return 'failed'; } finally { hush(false); }
}

/** A rewarded ad for a favor. Owners of the Edition get the favor without one. */
export async function watch(placement: string): Promise<AdResult> {
  const a = state();
  if (a.owned) return 'rewarded';
  const r = await play(() => ads.showRewarded(placement));
  if (r === 'rewarded') { a.rewarded++; save(); }
  return r;
}

/** The end-of-run ad, if its caps allow. Returns why it did or did not play. */
export async function intermission(c: Omit<EndCtx, 'now'>): Promise<EndVerdict> {
  const a = state();
  const v = endOfRunAd(a, { ...c, now: Date.now() });
  if (v !== 'show') return v;
  const r = await play(() => ads.showInterstitial());
  // Only count an ad that actually played, so an offline player is not penalized later.
  if (r === 'closed') { noteEndAd(a, c.runSeed, Date.now()); save(); }
  return v;
}

export async function buy(): Promise<BuyResult> {
  const r = await shop.buy();
  if (r === 'owned') { applyEntitlement(state(), true, shop.real ? 'purchase' : 'mock', Date.now()); save(); }
  return r;
}

export async function restore(): Promise<RestoreResult> {
  const r = await shop.restore();
  if (r === 'owned') { applyEntitlement(state(), true, 'restore', Date.now()); save(); }
  return r;
}

export async function privacyChoices(): Promise<void> { try { await ads.privacyOptions(); } catch { /* not available */ } }
