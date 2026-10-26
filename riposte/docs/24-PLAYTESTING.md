# v0.18 Playtest kit: Tell the Dealer, the tester form and beta builds

Everything needed to run a first round of 10 to 20 human playtesters: where they play, how they tell us what happened, where to find them, what to ask, and how to read the answers.

## 1. What is in the game

**🕯 Tell the Dealer** is a feedback button in three places:

- the **title screen** (under The Story So Far),
- the **run menu** (☰ during a run),
- the **results screen** after every run, win or lose,
- plus **Settings → Playtest feedback**.

It opens a short form: a kind (Bug, Confusing, Too hard, Too easy, Idea, Loved it), a free-text box, and a fold-out with the five playtest questions. The game fills in a **run report** the tester can read before sending:

```
Dawnwick v0.18.0 · sent from end · 2026-10-26 18:40 UTC
Device: ios · iPhone 18.1 · Safari · 393x852 @3x
Profile: 7 runs, 2 wins, 5 deaths
Run: Duelist · run · Stakes 1 · Act 2, floor 9 · seed 4242
State: combat (boss fight, turn 6) · HP 0/72 · 31 gold · 18 cards · 4 keepsakes · score 512
Result: died to The Antlered King
Last 20 actions (oldest first):
  -48s chain: foe:Snare > you:Riposte (negated)
  -12s tap: endTurn
  -3s event: you died
```

The action log is the last 20 of: screens visited, buttons tapped, cards played (tap or drag, with target), every Answer Chain that resolved (who played what, what was negated), deaths, and any script error. Nothing leaves the device unless the tester taps **Send**.

Buttons in the form:

- **Send to the Dealer** posts the note to the Google Form (section 2). If the post is blocked (offline, or a viewer that forbids it), the game opens the same form prefilled in a new tab so the tester only taps Submit; if even that is blocked, it copies the note.
- **📋 Copy run report** puts the answers and the report on the clipboard, for Discord, Reddit or email. If the clipboard is blocked it shows the text to select by hand.
- **Share…** (phones) opens the system share sheet with the same text.

Until the form is set up (section 2), Send is hidden and testers copy or share instead.

**Hiding it for release:** `FEEDBACK.beta` in `src/feedback/config.ts` is `true` now, so the buttons show by default. Set it to `false` for the store build: the buttons disappear unless a player turns on **Settings → Playtest feedback → Show "Tell the Dealer" buttons** (the switch works both ways in every build).

Code: `src/ui/tellDealer.ts` (form, log, buttons), `src/feedback/report.ts` (report and form plumbing, tested), `src/feedback/config.ts` (form ids and the questions), `sim/feedback-tests.ts`.

## 2. Where feedback lands: a Google Form you own

There is no Dawnwick server, so feedback goes to a free Google Form whose responses fill a Google Sheet, both in Mike's Google account. Why this over Formspree or Supabase: free with no response cap, no account to create beyond the Google one Mike has, the Sheet is easy to sort and share, and the same form doubles as the survey for testers who play outside the game.

**Setup (about 3 minutes, once):**

1. Open <https://script.google.com>, click **New project**, delete what is there, and paste all of `riposte/tools/feedback/create-form.gs`.
2. Click **Run**. Google asks to authorize Forms, Sheets and Drive for your own script: allow.
3. Open **Execution log**. It prints the tester form link, the edit link, the responses Sheet, and a `form: {...}` block.
4. Paste that block over `form: {...}` in `riposte/src/feedback/config.ts` (or send it to Claude), then `npm test && npm run build` and ship. The Send button appears.

Ownership: the form and Sheet live in your Drive from the start; nobody else has access unless you share them. To move them to a studio account later, change the owner in Drive (or rerun the script there and paste the new block). Turn on email alerts in the Sheet's form menu (**Tools → Notification settings**) if you want a ping per note.

Limits worth knowing: Google Forms accepts the in-game post without a login. The claude.ai artifact viewer may block posts to Google; the game then opens the prefilled form instead, which works everywhere.

## 3. The tester form (2 minutes)

The same five questions are in the game (fold-out "The 2-minute playtest questions") and in the Google Form:

1. **Where did you get stuck or confused?** (text)
2. **Where did you die, and did it feel fair?** (text)
3. **Did you understand the Answer Chain?** Yes, clearly / Mostly / Not really / What's the Answer Chain?
4. **Would you pay $4.99 for the ad-free Last Word Edition?** Yes / Maybe later / No, I'd play free with ads / No, I wouldn't keep playing
5. **What happened? (bug, idea, anything)** (free text)

Plus an optional **How can we reach you? (optional: Discord, Reddit or email)**, and the run report and game version, which the game fills in. `sim/feedback-tests.ts` fails if the game, this doc and the form script ask different questions.

## 4. Where testers play

| Build | Link | Notes |
|---|---|---|
| **Web (start today)** | <https://claude.ai/artifact/8VR11QMwY6GaKuN3hpiHpA> | Share it from the artifact's share menu with a public link. One file, works on any phone browser. |
| **Web, own page (recommended for strangers)** | itch.io HTML5 page | Free. New project → Kind: HTML → upload `dist-single/index.html` zipped → "This file will be played in the browser" → Visibility: Restricted with a password (or Draft + secret link). No claude.ai link for strangers to wonder about, and the in-game Send posts directly. |
| **Android APK** | GitHub → Actions → "Android debug APK" → latest run → Artifacts | Built on every push to main. Debug-signed: testers allow "install unknown apps" once. Share it via Google Drive or Discord. |
| **iOS TestFlight** | Public TestFlight link | Needs the Apple Developer account; steps in section 8. |

## 5. How to recruit

Aim for **10 to 20 testers in round one, half of them new to the genre**. Five friends who have never played Slay the Spire tell you more about onboarding than fifty veterans.

Where, roughly in order of usefulness:

- **Reddit:** r/slaythespire, r/roguelikedeckbuilders, r/Balatro and r/iosgaming respond well to a free web link plus a short clip of the Answer Chain. r/playmygame and r/IndieDev exist for exactly this. Read each sub's self-promo rules first (several want you to be a regular commenter, or allow it only on certain days).
- **Discords:** the Slay the Spire, Monster Train and Inscryption servers have indie-showcase channels; the "Roguelike Deckbuilders" and "Indie Game Developers" Discords have playtest channels where people trade tests.
- **Playtest swaps:** free on itch.io (feedback tag), TIGSource and Dev Patrons forums. Paid: PlaytestCloud or BetaTesting record strangers playing on phones (about $20 to $50 a tester), the best way to watch a true newcomer's first ten minutes.
- **Store betas:** TestFlight (up to 10,000 testers by public link) and Google Play open testing give crash reports and the real phone feel, after the $99 and $25 accounts.
- **Steam Playtest:** once there is a Steam page, the free "Request Access" playtest brings the genre's buyers and builds wishlists while it tests.
- **Your own circle.**

### Copy-paste recruiting post (Reddit / Discord)

> **Looking for 15 playtesters: Dawnwick, a free roguelike deckbuilder where every move has an answer**
>
> Enemies set face-down traps, you set Reactions, and when cards answer each other they stack into an Answer Chain that resolves last-in, first-out. Think Slay the Spire's runs with Yu-Gi-Oh's chains, built for one hand on a phone.
>
> It's free, plays in your phone or desktop browser, no install or account: **[link]**
>
> What I'd love: play one or two runs (about 20 minutes), then tap **🕯 Tell the Dealer** on the results screen. It fills in your run for you and asks five quick questions. Brutal honesty welcome, especially "I didn't get it."
>
> Android folks can also grab the APK, and iPhone TestFlight is coming. Thanks for playing!

Short version for a Discord playtest channel:

> Dawnwick: free browser roguelike deckbuilder built around an Answer Chain (Spire runs + Yu-Gi-Oh chains, phone-first). 20 min, one in-game feedback button. **[link]** Happy to test yours back.

Attach a 10 to 15 second clip of a 3-link chain resolving; posts with a clip get far more clicks.

## 6. What to ask (and what not to)

- Ask testers to **play cold**: no explanation beyond the post. The game's own tutorial is what you are testing.
- Ask for **one or two runs**, then the form. Do not ask for a full clear.
- If you can watch someone in person or on a call, say nothing, and note where they hesitate for more than five seconds.
- Do not ask "did you like it?" (everyone says yes). The five questions ask about behavior: where they stopped, died, got lost, and whether they would pay.
- Follow up with a few testers who wrote something surprising: "What did you think would happen when you played that?"

## 7. How to read the results

Open the responses Sheet. Each row is one note with the run report attached.

- **Sort by "What kind of note is this?"** Fix every Bug that two or more people hit, then read every Confusing note: those are the onboarding to-do list.
- **Answer Chain understanding** is the headline number. The goal for round one: at least 70% "Yes, clearly" or "Mostly" among genre-new testers. If "Not really" plus "What's the Answer Chain?" is above 30%, the first fight needs to teach it better before anything else.
- **Where they died:** paste the report's act and floor into a column. A pile-up on one floor or one enemy is a difficulty spike; compare with the bot numbers in BALANCE.md (bots are a floor, humans are usually worse in Act 1 and better by Act 3).
- **Would pay:** "Yes" plus "Maybe later" above 30% among testers who finished a run is a good sign for $4.99; "No, I wouldn't keep playing" above 30% means fix the game before thinking about price.
- **Reproduce a bug:** the report's seed, class and Stakes recreate the same run. The last 20 actions show what was tapped right before.
- **Script errors** appear in the log as `error:` lines; send those to Claude as they are.
- Tag each note in a new column (onboarding, balance, UI, crash, idea) and count. Change one thing per round, then test again with new people.

## 8. Beta builds

### Android debug APK

`.github/workflows/android-apk.yml` builds a debug APK on GitHub's servers on every push to main that touches `riposte/`, and on demand (Actions → Android debug APK → Run workflow). Download it from the run's **Artifacts** section (kept 30 days) and share the file with testers. Testers open it on Android and allow "Install unknown apps" for their browser or file app once.

It runs `npm ci`, `npm test`, `npm run build`, `npx cap sync android`, then `./gradlew assembleDebug`. A debug build is signed with Android's throwaway debug key: fine for testers, not for the Play Store (that needs your upload keystore and an AAB, see STORE-SUBMISSION.md).

Why GitHub Actions and not a file in this repo: the cloud machine that builds Dawnwick cannot reach Google's Android SDK downloads (dl.google.com is not on its network allowlist), so it cannot run Gradle. `npx cap sync` itself runs fine there. To build locally instead: install Android Studio, then `npm run cap:android` and Build → Build APK(s).

### iOS TestFlight (on your Mac; needs your Apple account)

One-time:

1. Join the **Apple Developer Program** ($99/year) at <https://developer.apple.com/programs/>. Approval can take a day or two.
2. Install **Xcode 16 or newer** from the Mac App Store, open it once, and sign in: Xcode → Settings → Accounts → +.
3. Install the tools: Node 22 (<https://nodejs.org>) and CocoaPods (`sudo gem install cocoapods`, or `brew install cocoapods`).
4. In **App Store Connect** (<https://appstoreconnect.apple.com>) → Apps → + → New App: platform iOS, name **Dawnwick: The Last Word**, primary language English, bundle ID **com.dawnwick.game** (register it when asked, or at developer.apple.com → Identifiers), SKU `dawnwick`.

Each build:

1. Get the code: `git clone https://github.com/kohamanagement/dawnwick.git` (later `git pull`), then `cd dawnwick/riposte`.
2. `npm install`, then `npm run cap:ios`. This builds the game, copies it into the iOS project, installs the pods and opens Xcode. (If pods were not installed: `cd ios/App && pod install`, then open `App.xcworkspace`, not the .xcodeproj.)
3. In Xcode, click **App** in the left sidebar → target **App** → **Signing & Capabilities**: tick **Automatically manage signing** and pick your **Team**. The bundle identifier stays `com.dawnwick.game`.
4. **General** tab: Version `0.18.0` (already set), **Build** must go up by one for every upload (1, 2, 3, ...).
5. Top bar device menu: choose **Any iOS Device (arm64)**.
6. **Product → Archive**. When the Organizer opens: **Distribute App → App Store Connect → Upload**, keep the defaults, Upload. Encryption export compliance is pre-answered in Info.plist (`ITSAppUsesNonExemptEncryption = NO`).
7. Wait 5 to 30 minutes for "processing" in App Store Connect → your app → **TestFlight**.
8. **Internal testers** (you and up to 100 people on your team): TestFlight → Internal Testing → + → add yourself; install the TestFlight app on your iPhone and accept.
9. **Public link for strangers:** TestFlight → External Testing → + new group ("Playtest") → add the build → fill in "What to test" (paste the recruiting blurb and "tap Tell the Dealer after a run") and a feedback email → **Submit for Beta App Review** (usually under 24 hours, only the first build of a version) → once approved, **Enable Public Link**, set a tester limit (for example 100), and copy the `https://testflight.apple.com/join/...` link into the recruiting post.

TestFlight also gives crash logs and screenshot feedback (testers shake or screenshot in the TestFlight app), which complements Tell the Dealer.

Ads in TestFlight builds use Google's test ids (v0.17), so testers see "Test Ad" banners and no money moves; purchases go through Apple's sandbox and are free for testers.

## 9. What needs Mike's accounts

- Run `create-form.gs` once (Google account) and paste the printed block, or send it to Claude.
- Share the web link publicly (claude.ai share menu) or upload to itch.io (free account).
- Download the APK from GitHub Actions and share it.
- Apple Developer Program, Xcode archive and the TestFlight public link (section 8).
- Optional: Google Play Console ($25) for an open-testing track instead of sideloaded APKs.
