# v0.17 "The House Takes a Cut": ads and the Last Word Edition

Mike's call (2026-10-26): Dawnwick is **free with ads**, and **$4.99 once** removes them. Ads come at the end of a run (win or death), plus optional ads that pay for extras, such as a second daily booster pack. Follow-up the same day: no hard paywall after Act 1 on top of ads; instead the first Act 1 boss clear is when ads start (or run 3, whichever comes first) and when the Dealer first offers the Edition. Keep a "free Act 1, pay for Acts 2–3" demo switch available for later.

The design rule behind every choice below: **the player is never interrupted mid-decision, every ad offer is a choice, and every reward is bounded**. The roguelike stays hard-earned; ads add convenience and a few second chances, not power.

Everything is in the Dealer's voice. He runs the Last Table, he takes a cut of everything, and he offers favors. An ad is "a word from the house".

## 1. End-of-run ad (interstitial): "Intermission"

| Rule | Value | Where |
|---|---|---|
| When | After the results screen, as the player taps *Play again* or *Back to hub*. Never in a fight, a chain, the map, or any menu | `endLeave` in `src/main.ts` |
| Ad-free start | None until the **first Act 1 boss clear** or **3 finished runs**, whichever comes first | `AD_RULES.graceRuns`, `AdsState.act1` |
| Per run | At most one (keyed by run seed) | `AdsState.adRun` |
| Gap | At least 5 minutes between two of them, however short the runs | `AD_RULES.gapMs` |
| Already paid | None if the player watched an ad for a favor during that run ("the Dealer already took his cut") | `endOfRunAd(...) → 'watched'` |
| Owners | Never | `AdsState.owned` |
| Offline / no fill | Nothing shows; it is not counted, so nothing is "owed" later | `intermission()` |

Arena duels, Riddles and the tutorial never reach the results screen, so they never show one. Music and effects pause during any ad (`audio.hush`).

## 2. Rewarded placements: the Dealer's favors

Every favor is a button the player chooses to press, marked **Ad** (or **Free** for owners). Skipping or closing the ad early forfeits nothing but the favor; the button stays. Favors are **off in Daily Duels and Weekly Gauntlets** (shared leaderboards), the tutorial run, Arena and Riddles.

| Favor | Where | What it does | Cap | Dealer's line |
|---|---|---|---|---|
| 🃏 **Second Look** | Card reward (the Deal) | Take a second card from the same Deal | 1 per act | "Greedy. I like that in a customer." |
| 💰 **Ante Up** | Reward, before taking the gold | Double this fight's gold | 1 per act | "Let it ride." |
| 🔄 **Fresh Stock** | Merchant | Restock every unsold card and Omen (sold items and keepsakes stay) | 1 per shop, 2 per run | "He keeps the good stock in the back. I know where." |
| 🔮 **Up His Sleeve** | Merchant, belt not full | A free random Omen | 1 per act | "Every dealer keeps one up his sleeve. Take it." |
| 🕯 **Relight Wick** | Candle, after your choice | One more Candle choice (Mend, Hone, Rehearse or Scout) | 1 per run | "Light another. The table can wait." |
| 🂠 **One More Hand** | When you die | Get back up at 50% HP and replay that fight from the start (same enemies, affix and Venue) | 1 per run | "Not so fast. The house hates an early night." |
| 🎴 **Another Fate** | Fate pick at the start | Deal three different Fates | 1 per run | "Not to your liking? I have a whole deck of lives." |
| 🂠 **The Dealer's Cut** | Packs tab, after the daily gift | A second free Duelist Pack today | 1 per day | "Watch a word from the house, and I'll cut you in." |

**Run cap:** at most **6 favors in one run**, whatever the individual caps add up to (`RUN_FAVORS`). One More Hand cannot fire in the Reflection (that run is already won) or the Long Night (death there is a victory).

### Why these won't wreck balance

- The rules engine and the sims never call them: favors live in `src/engine/favors.ts`, the only hooks into run rules are two optional reward flags (`extraPick`, `anted`), and a test fails if anything in `sim/` or the engine imports the ads or favors code. The balance thread's bot numbers stay ad-free by construction.
- Every favor is capped, and the total per run is capped at 6. The strongest one, One More Hand, is once per run and costs the fight's progress (you replay from turn 1 at half HP).
- Leaderboard modes (Daily, Weekly) never offer them, so a score there is never bought with ad views.
- Owners get the same caps, just no ad. Paying never buys more power than watching.

## 3. The $4.99 Last Word Edition

One non-consumable purchase (`dawnwick_last_word`, RevenueCat entitlement `last_word`):

- No end-of-run ads, ever.
- Every Dealer's favor without an ad (same limits).
- The Dealer's Cut daily without an ad.
- Cosmetics: a **gold candle** under the logo on the title screen, the **Last Word** card back, and the title **Keeper of the Last Word**.

No gacha, no battle pass, no subscription, no consumable currency for money. The free Season track stays free.

**How it is sold:** a single, dismissable card in the Dealer's voice on the results screen of the **first run that clears the Act 1 boss** ("You beat my first table. Most don't."), then at most once every 5 runs (`AD_RULES.pitchEvery`); always in Settings. Never for owners, never with Reduce distraction on, never as a popup mid-run.

**Demo switch (off):** `DEMO.on` in `src/ads/policy.ts` with `actLocked(ads, act)` gates Acts 2–3 behind the Edition for a Steam-style demo. Not wired into the map yet (one call where `nextAct` is offered); it is off and tested so the entitlement already answers the question in one place.

## 4. Settings: "Ads and the Last Word Edition"

- Status: owned, or the plain-language ad rules (and how many ad-free runs are left).
- The Edition card with the local price (from the store), **Buy** and **Restore purchase**.
- **Reduce distraction (younger players)**: hides every optional ad offer and the Edition nudges, and asks for family-safe (G-rated, child-directed) ads from the next launch. End-of-run ads keep their caps (it is not a free ad remover).
- **Privacy choices** (native only): reopens the consent form, as Google requires in the EEA/UK.
- Which backend is live (web stand-in vs AdMob + RevenueCat) and how many ads were watched.

## 5. Architecture: what is mocked, what is real

```
src/ads/policy.ts    pure rules: AdsState, end-of-run caps, entitlement merge, Dealer's Cut, pitch, demo switch (tested)
src/engine/favors.ts the 7 in-run favors: caps, when each fits, what each does (tested)
src/ads/adapter.ts   AdsAdapter + StoreAdapter interfaces, AdMob TEST ids, RevenueCat key placeholders
src/ads/mock.ts      web stand-in: a 5-second Dealer card with a countdown; the purchase always succeeds (no money)
src/ads/native.ts    AdMob (@capacitor-community/admob 7.2.0) + UMP consent + iOS ATT; RevenueCat (@revenuecat/purchases-capacitor 11.3.3)
src/ads/index.ts     the service the UI calls: watch(), intermission(), buy(), restore(), privacyChoices()
```

| Piece | Web build (the artifact) | iOS / Android app |
|---|---|---|
| Rewarded and end-of-run ads | **Mocked**: 5-second stand-in card, Skip forfeits the favor | **Real code, TEST ids**: AdMob serves Google test ads until the real ids are pasted in |
| Consent (GDPR / UMP) | Skipped | **Real**: UMP form shown where required, before ads start; Privacy choices button in Settings |
| iOS tracking prompt (ATT) | n/a | **Real**: asked once after the consent form; "no" means non-personalized ads |
| Purchase | **Mocked**: always succeeds, remembered in the browser save | **Real code, placeholder keys**: RevenueCat purchase, restore, refund check at launch |
| Offline | Ads say "the Dealer's line is down"; owners keep everything (cached) | Same; entitlement cached in the save, store re-checked when online |

Choice of RevenueCat over a raw store plugin: one SDK for both stores, server-side receipt validation, restore and refunds handled, free under $2.5k monthly revenue, and an easy path to Steam/web later.

## 6. What Mike sets up (store side)

None of this can be done from the code; each needs your accounts.

**AdMob** (admob.google.com, free)
1. Create an AdMob account and link a payment profile.
2. Add two apps: *Dawnwick (iOS)* and *Dawnwick (Android)*, package/bundle `com.dawnwick.game`. Each gives an **App ID** (`ca-app-pub-…~…`).
3. In each app create two ad units: **Interstitial** ("End of run") and **Rewarded** ("Dealer's favor"). Each gives an **Ad unit ID** (`ca-app-pub-…/…`).
4. Privacy & messaging: create a **GDPR message** (and a **US state regulations** message) for both apps; Google's UMP form is what the app shows. Add an **IDFA explainer** message for iOS if you want one before the Apple prompt.
5. Blocking controls → set max ad content rating **PG** (or G), block sensitive categories you don't want (gambling, dating, alcohol are sensible for this game).
6. Publish an `app-ads.txt` on the developer website listed in both stores (AdMob shows the exact line).
7. Paste the ids: `src/ads/adapter.ts` (`AD_IDS`, set `test: false`), `ios/App/App/Info.plist` (`GADApplicationIdentifier`), `android/app/src/main/AndroidManifest.xml` (`com.google.android.gms.ads.APPLICATION_ID`). Keep `test: true` on your own phones until launch (real-ad self-clicks can get an AdMob account banned).

**App Store Connect**
1. Agreements: sign the **Paid Apps** agreement, add bank and tax info (needed even for a free app with IAP).
2. App → In-App Purchases → **Non-Consumable**, product id `dawnwick_last_word`, price $4.99 (tier), display name "Last Word Edition", description, review screenshot (Settings card).
3. App Privacy: the app now **collects data** through AdMob: Device ID (advertising), Product Interaction, Advertising Data, Purchase History (RevenueCat); "used for third-party advertising" and "tracking" = yes if ATT allowed. Update from the old "Data Not Collected".
4. Age rating: re-answer the questionnaire; ads don't raise it, but answer "Unrestricted web access: no", "Gambling: no" (no real money). Expect 9+ or 12+.
5. Add the SKAdNetwork ids Google lists for AdMob (one is already in Info.plist; Google's full list is ~50 entries; paste it before release).

**Google Play Console**
1. Monetization → Products → In-app products → create `dawnwick_last_word`, $4.99, active. (Needs a merchant account linked to the developer account.)
2. App content → **Ads: "Yes, my app contains ads"**.
3. **Data safety**: collects Device or other IDs, App interactions, Purchase history; shared with third parties (advertising); encrypted in transit; users can't request deletion (no account) or say yes if you add it.
4. **Target audience**: 13+ (do not tick under-13 ages: that pulls the app into the Families policy, which requires certified family ad networks). The Reduce distraction setting is a courtesy, not a kids mode.
5. Advertising ID declaration: yes (AdMob uses it).

**RevenueCat** (app.revenuecat.com, free to start)
1. Create a project "Dawnwick", add an **App Store app** (bundle `com.dawnwick.game`, upload the App Store Connect in-app purchase key) and a **Play Store app** (package `com.dawnwick.game`, upload a Google service-account JSON with financial access).
2. Products: import `dawnwick_last_word` from both stores. Entitlement: create **`last_word`** and attach both products.
3. Copy the two **public SDK keys** (`appl_…`, `goog_…`) into `REVENUECAT_KEYS` in `src/ads/adapter.ts`.
4. Test with a sandbox Apple ID and a Play license tester before release; test Restore on a second device.

**After pasting ids:** `npm run cap:sync`, then `pod install` runs on your Mac (CocoaPods) for the two new plugins.

## 7. Kids, age rating and consent notes

- The game is not made for children and should not be listed for them: target audience 13+ on Play, 9+/12+ on iOS. That keeps it out of COPPA "child-directed" rules and the Play Families program.
- Reduce distraction is for any player (or parent) who wants fewer offers: it hides favors and the Edition pitch, and on the next launch sets `tagForChildDirectedTreatment` and max ad rating G.
- Default ad content rating is PG (`MaxAdContentRating.ParentalGuidance`).
- Consent order on first launch of the app: UMP form (only where the law requires it) → iOS ATT prompt → ads start. It happens over the title screen after the first frame, never during a run. If consent is refused, ads are non-personalized; if the form is required and unanswered, no ads show at all.
- No real-money gambling: favors and the Edition never buy random paid items. The Dealer's Cut is a free daily pack, not a paid one.

## 8. Tests

`sim/ads-tests.ts` (15 tests, run by `npm test`): end-of-run caps (owner, grace runs, the Act 1 clear ending the grace early, one per run, gap, already-watched), the pitch schedule, entitlement merge (offline keeps cache, refund revokes, web stand-in survives), Dealer's Cut, Reduce distraction, save migration and Edition cosmetics, the demo switch, every favor's effect and cap, the 6-per-run total, favors off in Daily/Weekly/tutorial/Arena/Riddles, and a guard that the engine and sims never import ads or favors.

The browser flow (every placement, the mock ad, skip, the death offer, the end-of-run ad and pitch, Dealer's Cut, purchase, gold candle) was played through with Playwright on the single-file build.
