// v0.17 The ads and purchase seam. The game only talks to these two interfaces; src/ads/mock.ts implements
// them for the web build (a stand-in ad and a purchase that always succeeds) and src/ads/native.ts for the
// iOS and Android apps (AdMob through @capacitor-community/admob, the purchase through RevenueCat).

/** How an ad ended. Only 'rewarded' pays a favor. */
export type AdResult = 'rewarded' | 'closed' | 'failed' | 'offline' | 'unavailable';
export type BuyResult = 'owned' | 'cancelled' | 'pending' | 'failed' | 'offline';
export type RestoreResult = 'owned' | 'none' | 'failed' | 'offline';

export interface Consent {
  /** The consent form allowed personalized ads (GDPR/UMP) and, on iOS, tracking (ATT). */
  personalized: boolean;
  /** Ads may be requested at all (false while a required consent form is unanswered). */
  canRequest: boolean;
  /** The player can reopen the consent form from Settings (required in the EEA and UK). */
  privacyOptions: boolean;
}

export interface AdsAdapter {
  /** 'web stand-in' or 'AdMob'. */
  name: string;
  /** Real ads (false for the web stand-in). */
  real: boolean;
  /** Ask for consent (UMP form, then the iOS tracking prompt) and start the SDK. Safe to call more than once. */
  init(o: { childSafe: boolean }): Promise<Consent>;
  /** A full-screen ad between runs. Resolves when it is closed. */
  showInterstitial(): Promise<AdResult>;
  /** A rewarded ad; 'rewarded' only when the player watched to the end. */
  showRewarded(placement: string): Promise<AdResult>;
  /** Reopen the consent form (Settings → Privacy choices). */
  privacyOptions(): Promise<void>;
}

export interface StoreAdapter {
  name: string;
  real: boolean;
  init(): Promise<void>;
  /** The local price string ("$4.99", "4,99 €"), or null if the store is unreachable. */
  price(): Promise<string | null>;
  buy(): Promise<BuyResult>;
  restore(): Promise<RestoreResult>;
  /** Does the store say this player owns the Edition? null = could not ask (offline). */
  entitled(): Promise<boolean | null>;
}

/**
 * Store-side ids. The AdMob ids below are Google's public TEST ids (they always fill with test ads and never pay).
 * Before release, replace them with the app and ad unit ids from the AdMob console, and the RevenueCat keys with the
 * public SDK keys from the RevenueCat project (docs/23-ADS-AND-UNLOCK.md, "What Mike sets up").
 * The AdMob app ids must also go into ios/App/App/Info.plist (GADApplicationIdentifier) and
 * android/app/src/main/AndroidManifest.xml (com.google.android.gms.ads.APPLICATION_ID).
 */
export const AD_IDS = {
  test: true,
  ios: {
    app: 'ca-app-pub-3940256099942544~1458002511',
    interstitial: 'ca-app-pub-3940256099942544/4411468910',
    rewarded: 'ca-app-pub-3940256099942544/1712485313',
  },
  android: {
    app: 'ca-app-pub-3940256099942544~3347511713',
    interstitial: 'ca-app-pub-3940256099942544/1033173712',
    rewarded: 'ca-app-pub-3940256099942544/5224354917',
  },
};

export const REVENUECAT_KEYS = { ios: 'appl_REPLACE_WITH_REVENUECAT_IOS_KEY', android: 'goog_REPLACE_WITH_REVENUECAT_ANDROID_KEY' };
