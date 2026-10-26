# What remains before App Store and Google Play submission

The game is playable end to end. What follows is everything between this prototype and a store release, in the order I would do it. Items marked **(you)** need an account, money or a decision only the owner can make.

## 1. Accounts and legal (you)

- [ ] Apple Developer Program ($99/year) and Google Play Console ($25 once).
- [x] Final name chosen: **Dawnwick: The Last Word** (v0.14.1). `appId` is `com.dawnwick.game`, `appName` is `Dawnwick`. The bundle ID cannot change after release.
- [ ] **(you)** Formal clearance before first upload: EUIPO/WIPO search (not reachable from the build machine), and grab a domain and handles. See [18-RENAME-DAWNWICK.md](18-RENAME-DAWNWICK.md).
- [ ] Privacy policy URL (required by both stores even when no data is collected). The prototype collects nothing; a one-page policy saying so is enough until analytics or a backend exist.
- [ ] Support URL / email.

## 2. Content and polish

- [ ] **Art:** 29 enemy portraits, 3 character portraits, card frames per faction, ~68 card illustrations (or a frame-only style for v1), relic icons, map node icons. The prototype uses emoji placeholders; emoji look different per OS and some may read as IP-adjacent, so replace them all.
- [ ] **Audio:** music (menu, map, combat, boss), ~25 SFX (card play, chain link, negate, hit, block, death, victory). Wire to a simple audio manager with a mute toggle.
- [ ] **Haptics:** swap `navigator.vibrate` for `@capacitor/haptics` (iOS ignores `navigator.vibrate`).
- [ ] **App icon and splash:** generate all sizes with `@capacitor/assets` from a 1024×1024 icon (`public/icon.svg` is a placeholder).
- [ ] **Status bar / safe areas:** add `@capacitor/status-bar`; the CSS already respects safe-area insets.
- [ ] Scripted first-run order (so every new player meets traps in the same sequence), and a "replay tutorial" button.
- [ ] Human playtest round (10–30 players) to confirm balance; the bot numbers in BALANCE.md are a floor.

## 3. Monetization (if shipping the recommended free demo + unlock)

- [ ] Gate Acts 2–3, characters 2–3 and Ascension behind a non-consumable "Full Game" product.
- [ ] Add an IAP plugin (e.g. RevenueCat's Capacitor SDK or `cordova-plugin-purchase`), create the product in App Store Connect and Play Console, implement **Restore Purchases**.
- [ ] Or ship premium-only ($4.99–6.99 paid app) and skip IAP entirely for v1: the fastest path to the stores.

## 4. Store builds

**Android**
- [ ] `npm run cap:android`, then in Android Studio: set `versionCode`/`versionName` in `android/app/build.gradle`, create an upload keystore, Build → Generate Signed Bundle (AAB).
- [ ] Target API level: Play requires the current target SDK level (API 35 for new apps in 2025–26); Capacitor 7's template targets it.
- [ ] Play Console: content rating questionnaire (IARC), Data safety form ("no data collected"), target audience (not children), app access, ads = no.
- [ ] Internal testing track → closed testing (new personal developer accounts must run a closed test with 12+ testers for 14 days before production).

**iOS** (needs a Mac with Xcode 16+)
- [ ] `npm run cap:ios`, set the Team and bundle ID in Xcode, version/build numbers, Product → Archive → upload.
- [ ] App Store Connect: age rating questionnaire (expect 9+; see the Gambler's Echo note below), App Privacy = "Data Not Collected", accessibility labels, export compliance (no encryption beyond HTTPS = exempt).
- [ ] TestFlight external test, then submit for review.

## 5. Store listing

- [ ] Screenshots: 6.9" and 6.5" iPhone, 13" iPad (or mark iPhone-only), Android phone; 5–8 shots showing a chain overlay, the map, a boss, card choice, Legacy/Echo.
- [ ] 15–30 s preview video of a 4-link chain.
- [ ] Store name **Dawnwick: The Last Word**; subtitle/short description "Every move has an answer: a counter-chain roguelike deckbuilder", full description, keywords (roguelike, deckbuilder, card game, offline, TCG, strategy).

## 6. Compliance notes

- No loot boxes or paid random items, so no odds-disclosure obligations (Belgium, Netherlands, China rules do not apply). Keep it that way.
- The *Gambler's Echo* event wagers in-game gold only. If a rating board flags "simulated gambling", rename/reframe it (it is one data entry in `src/data/events.ts`).
- If accounts or cloud save are added later: in-app account deletion is mandatory on iOS; update both privacy forms.

## 7. Optional, post-launch

- Backend for global Daily Duel leaderboards and async Echo PvP (see the plan in 03-MOBILE-BUSINESS-AND-BUILD-PLAN.md; the engine is already deterministic so the server can replay runs to verify scores).
- Analytics (privacy-light, e.g. self-hosted PostHog) for card pick/win rates.
- Localization: all card text is template strings in `src/data`; move them to a string table first.
