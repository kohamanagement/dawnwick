// v0.17 The iOS and Android adapters: AdMob (@capacitor-community/admob) for ads, with Google's UMP consent form
// and Apple's App Tracking Transparency prompt, and RevenueCat (@revenuecat/purchases-capacitor) for the one-time
// Last Word Edition purchase, restore and refunds. Loaded only inside the native app (see src/ads/index.ts).
import { Capacitor, type PluginListenerHandle } from '@capacitor/core';
import {
  AdMob, AdmobConsentStatus, InterstitialAdPluginEvents, MaxAdContentRating, RewardAdPluginEvents,
} from '@capacitor-community/admob';
import { Purchases, PURCHASES_ERROR_CODE, PRODUCT_CATEGORY, type PurchasesStoreProduct } from '@revenuecat/purchases-capacitor';
import { AD_IDS, REVENUECAT_KEYS, type AdResult, type AdsAdapter, type Consent, type StoreAdapter } from './adapter';
import { EDITION } from './policy';

const platform = (): 'ios' | 'android' => (Capacitor.getPlatform() === 'ios' ? 'ios' : 'android');
const ids = () => AD_IDS[platform()];
const offline = () => typeof navigator !== 'undefined' && navigator.onLine === false;

let started = false;
let handles: Promise<PluginListenerHandle>[] = [];
const listen = (h: Promise<PluginListenerHandle>): void => { handles.push(h); };
const unlisten = (): void => { for (const h of handles) void h.then((x) => x.remove()); handles = []; };
let npa = true;

export const admobAds: AdsAdapter = {
  name: 'AdMob',
  real: true,
  async init({ childSafe }): Promise<Consent> {
    // 1. GDPR / UK / US-state consent through Google's UMP form (shown only where the law needs it).
    let info = await AdMob.requestConsentInfo({ tagForUnderAgeOfConsent: childSafe });
    if (info.isConsentFormAvailable && info.status === AdmobConsentStatus.REQUIRED) info = await AdMob.showConsentForm();
    // 2. iOS 14+: App Tracking Transparency, asked once, after the consent form (Google's recommended order).
    let tracking = true;
    if (platform() === 'ios') {
      const st = await AdMob.trackingAuthorizationStatus();
      if (st.status === 'notDetermined') await AdMob.requestTrackingAuthorization();
      tracking = (await AdMob.trackingAuthorizationStatus()).status === 'authorized';
    }
    npa = !tracking || info.status === AdmobConsentStatus.REQUIRED;
    if (!started && info.canRequestAds) {
      await AdMob.initialize({
        initializeForTesting: AD_IDS.test,
        tagForChildDirectedTreatment: childSafe,
        tagForUnderAgeOfConsent: childSafe,
        maxAdContentRating: childSafe ? MaxAdContentRating.General : MaxAdContentRating.ParentalGuidance,
      });
      // The game has its own music and effects volumes; ads play muted-friendly.
      await AdMob.setApplicationVolume({ volume: 0.5 });
      started = true;
    }
    return { personalized: !npa, canRequest: info.canRequestAds, privacyOptions: String(info.privacyOptionsRequirementStatus) === 'REQUIRED' };
  },
  async showInterstitial(): Promise<AdResult> {
    if (offline()) return 'offline';
    if (!started) return 'unavailable';
    try {
      await AdMob.prepareInterstitial({ adId: ids().interstitial, isTesting: AD_IDS.test, npa });
      const closed = new Promise<void>((res) => {
        listen(AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => res()));
        listen(AdMob.addListener(InterstitialAdPluginEvents.FailedToShow, () => res()));
      });
      await AdMob.showInterstitial();
      await closed;
      return 'closed';
    } catch { return 'failed'; } finally { unlisten(); }
  },
  async showRewarded(): Promise<AdResult> {
    if (offline()) return 'offline';
    if (!started) return 'unavailable';
    try {
      await AdMob.prepareRewardVideoAd({ adId: ids().rewarded, isTesting: AD_IDS.test, npa });
      let paid = false;
      const closed = new Promise<void>((res) => {
        listen(AdMob.addListener(RewardAdPluginEvents.Rewarded, () => { paid = true; }));
        listen(AdMob.addListener(RewardAdPluginEvents.Dismissed, () => res()));
        listen(AdMob.addListener(RewardAdPluginEvents.FailedToShow, () => res()));
      });
      await AdMob.showRewardVideoAd();
      await closed;
      return paid ? 'rewarded' : 'closed';
    } catch { return offline() ? 'offline' : 'failed'; } finally { unlisten(); }
  },
  async privacyOptions(): Promise<void> { await AdMob.showPrivacyOptionsForm(); },
};

let product: PurchasesStoreProduct | null = null;
async function loadProduct(): Promise<PurchasesStoreProduct | null> {
  if (product) return product;
  const { products } = await Purchases.getProducts({ productIdentifiers: [EDITION.product], type: PRODUCT_CATEGORY.NON_SUBSCRIPTION });
  product = products[0] ?? null;
  return product;
}
const hasEdition = (ci: { entitlements: { active: Record<string, unknown> } }) => !!ci.entitlements.active[EDITION.entitlement];

export const revenueCatStore: StoreAdapter = {
  name: 'RevenueCat',
  real: true,
  async init(): Promise<void> { await Purchases.configure({ apiKey: REVENUECAT_KEYS[platform()] }); },
  async price(): Promise<string | null> {
    try { return (await loadProduct())?.priceString ?? null; } catch { return null; }
  },
  async buy() {
    if (offline()) return 'offline';
    try {
      const p = await loadProduct();
      if (!p) return 'failed';
      const r = await Purchases.purchaseStoreProduct({ product: p });
      return hasEdition(r.customerInfo) ? 'owned' : 'pending';
    } catch (e) {
      const code = (e as { code?: string }).code;
      if (code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) return 'cancelled';
      if (code === PURCHASES_ERROR_CODE.PAYMENT_PENDING_ERROR) return 'pending';
      if (code === PURCHASES_ERROR_CODE.NETWORK_ERROR || offline()) return 'offline';
      return 'failed';
    }
  },
  async restore() {
    if (offline()) return 'offline';
    try { return hasEdition((await Purchases.restorePurchases()).customerInfo) ? 'owned' : 'none'; } catch { return offline() ? 'offline' : 'failed'; }
  },
  async entitled() {
    if (offline()) return null;
    try { return hasEdition((await Purchases.getCustomerInfo()).customerInfo); } catch { return null; }
  },
};
