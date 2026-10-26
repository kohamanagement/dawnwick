# Riposte · Phases 4–5: Mobile, business and build plan

## Phase 4.1 Mobile UX (as built)

| Concern | Decision |
|---|---|
| Hand on a 6" screen | Up to 10 cards in one row along the bottom thumb zone; cards overlap only as much as needed so the hand never scrolls. Cost sits top-left so it stays visible when cards overlap |
| Tap vs drag | **Tap only.** Tap a card: it lifts and a large readable copy appears with keyword rules. Tap **Play** / **Set**, or tap an enemy for targeted cards. Tapping the selected card again plays it. Dragging is error-prone one-handed and inaccessible |
| Text readability | Card text is live text, never baked into art. Small/Medium/Large text setting scales cards and UI. Selected card renders at 150×210 |
| Save/resume | The full run (including mid-fight state and RNG) is saved to device storage after every action and when the app goes to the background. "Continue run" is the first button |
| Offline | 100% offline. No account, no network calls. Daily Duel works offline (seed from the date) |
| Performance | ~34 KB gzipped JS + 5 KB CSS, no images in the prototype; DOM rendering only re-renders on input; no animation loop, so idle CPU/battery is ~0. Targets: cold start < 1.5 s on a 2020 mid-range Android, 60 fps transitions, < 3% battery per 30 min |
| Accessibility | Faction shapes (▲◆●✦) on every card and Reaction slot so color is never the only cue; ARIA labels on cards, HP bars and buttons; 44px+ tap targets; reduced-motion and fast-animation settings; left-handed layout flips the End Turn button; no timers anywhere |
| One-handed | Every combat control is in the bottom 45% of the screen; enemies (tap for info/target) are the only top-half targets |

## Phase 4.2 Tech

**Engine choice: TypeScript + Vite web app wrapped with Capacitor 7** for the iOS and Android stores.

| Option | Verdict |
|---|---|
| Unity | Industry default, but heavy (40–80 MB builds), C# toolchain, and overkill for a 2D card UI. Good choice if the team already knows it and wants 3D board VFX |
| Godot 4 | Light and free; weaker mobile export polish and smaller hiring pool; fine alternative |
| Flutter | Good UI toolkit, but game-loop tooling is thin |
| **TS + Capacitor (chosen)** | Card games are UI, not physics. One codebase runs in a browser (instant playtests by link), iOS and Android. Store binary ~5–8 MB. The rules engine is pure TypeScript with no DOM, so the same code runs in the balance simulator, on a future server for anti-cheat, and in the client |

**Backend (planned, needed only for leaderboards and async PvP):** a small serverless API (e.g. Supabase or Cloudflare Workers + D1/Postgres). Tables: players (anonymous device id → optional Sign in with Apple/Google), legacy decks, Echo match results, daily scores.

**Anti-cheat for async PvP and daily boards:** the client uploads the **seed + input log** (every card played and target), not the result. The server replays the run with the same deterministic engine (`npm test` already checks that saved runs replay identically) and only accepts the replayed score/deck. Legacy decks are validated against cards obtainable in that run.

**Cross-progression:** profile is a small JSON blob (~5 KB). Sync it to the backend keyed to the Apple/Google sign-in, last-write-wins with a merge for unlocks (union) and XP (max).

## Phase 4.3 Monetization

| Model | Pros | Cons |
|---|---|---|
| Premium ($4.99–9.99) | Matches StS/Balatro/Monster Train mobile; trust; no compliance burden | Discovery is harder; no recurring revenue |
| Free-to-play | Biggest funnel | Pushes toward energy timers, packs, power sales; hostile to the genre's audience |
| **Hybrid (recommended): free demo + one-time unlock + cosmetic store + paid expansions** | Big funnel *and* premium trust (Dawncaster, Slice & Dice, Star Realms) | Needs a well-placed paywall |

**Recommendation and rough pricing**
- **Free:** Act 1 with the Ashen Duelist, unlimited runs, Daily Duel. (Enough to hook, ~1–3 h.)
- **Full game unlock: $6.99** one-time (all acts, characters, Ascension, Legacy/Echo). Launch week $4.99.
- **Expansions: $3.99 each** (a new character/faction pair + 25 cards + 1 boss), roughly 2 per year. Never sold as power to existing characters: expansion cards only appear for expansion characters or as opt-in pool toggles.
- **Cosmetic store:** card backs, card frames, board themes, animated Echo frames, $0.99–$2.99. **No loot boxes, no randomized purchases, no energy.**
- **Supporter pack:** $9.99 soundtrack + art book + cosmetic.
- No ads. Optional later: rewarded nothing (there is nothing to speed up).

## Phase 4.4 App Store and Google Play compliance

| Area | Plan |
|---|---|
| Randomized purchases / loot boxes | None sold. Card rewards are gameplay RNG, not purchasable. This removes the Belgium/Netherlands loot-box issue and China's odds-disclosure rules for paid random items. In-run odds (e.g. the 50% gamble event) are shown on the button anyway |
| In-app purchases | Apple IAP / Google Play Billing for the unlock, expansions and cosmetics (non-consumables; restore purchases button). No links to outside payment in the binary unless the regional rules (US anti-steering ruling, EU DMA) are adopted deliberately later |
| Age rating | IARC / App Store questionnaire: fantasy violence (mild, no blood), simulated gambling? **No** (no wagering of real money; the Gambler's Echo event uses in-game gold; answer the "simulated gambling" question as *infrequent/mild* to be safe, expected 9+ / PEGI 7). Rename the event if a rating board objects |
| Privacy labels | Prototype collects nothing: "Data Not Collected". With backend: device ID and gameplay data linked to an optional account, used for app functionality and analytics; no tracking → no ATT prompt |
| Kids | Not targeted at under-13s; not in the Kids category |
| Accessibility declarations | Provide the App Store accessibility nutrition labels (larger text, reduced motion, sufficient contrast, VoiceOver partial) |
| China | Requires a local publisher and ISBN license; out of scope for launch |
| Account deletion | Required once accounts exist: in-app delete |

## Phase 4.5 Live ops (year one)

| Month | Content |
|---|---|
| 0 | Launch: 3 characters, 68 cards, 3 acts, Daily Duel |
| 1 | Balance patch from telemetry; weekly **Gauntlet** (fixed seed + 3 modifiers, 1 week) |
| 2 | Async Echo PvP (other players' Legacy decks as elites), deck ratings |
| 3 | **Expansion 1:** Thorn+Void character, new keyword, 25 cards, new Act 2 boss variant |
| 4–5 | Seasonal event: "Masquerade" modifiers, cosmetic track (earned, not sold) |
| 6 | Co-op prototype test (2 phones, shared map, separate decks), Steam port |
| 7–8 | **Expansion 2:** a fifth faction (e.g. Clockwork: delayed effects) + 2 characters |
| 9–12 | Endless "Circuit" mode, community Legacy deck spotlights, third expansion |

**Retention loops:** Daily Duel (one scored attempt, streak counter), Weekly Gauntlet, Ascension per character, "your Echo beat N players this week" notifications once PvP exists.

## Phase 4.6 Go-to-market

- **Audience:** 18–40, StS/Balatro/Marvel Snap players and lapsed YGO/MTG players.
- **Positioning vs top three:**
  - *Deckbuilder fans:* "Your enemies play cards back. Answer them." (v0.14: ad copy never names another game.)
  - *Marvel Snap:* "Same 3-minute fights, no packs, no opponent needed."
  - *Yu-Gi-Oh! Master Duel:* "The chain, without the 40-minute combo turns or the gacha."
- **Soft launch:** Philippines, Canada, Australia, New Zealand (English, cheap installs, representative of US/UK spending), 6–8 weeks.
- **KPIs (premium-hybrid benchmarks):** D1 40%+, D7 18%+, D30 8%+; median session 12 min, 2.5 sessions/day; demo→paid conversion 4–8%; cosmetic payer share 2–4%; blended ARPDAU $0.04–0.08 (premium-heavy, so revenue is front-loaded at purchase).
- **Community:** Discord with a daily seed channel (share score cards), Reddit r/roguelikes and r/deckbuildinggames, short-form video of 6-link chains, streamer seeds ("play my Legacy deck"), a public card database page generated from `CATALOG.md`.

## Phase 5: Build plan

### MVP scope (what this prototype already contains)

| Item | MVP target | Prototype status |
|---|---|---|
| Characters | 2 | **3** |
| Cards | 50 | **68** player cards + 8 enemy traps × 3 tiers |
| Enemies | 15 + 3 bosses | **26 + 3 bosses** |
| Relics | 15 | **28** |
| Events | 6 | **9** |
| Meta | XP + 1 unlock track | Levels 1–6 unlocks, Ascension 0–10, Legacy decks, Daily Duel |
| Not yet | | Art, audio, server, IAP, analytics, localization, store builds |

### Prototype test plan (under 4 weeks)

| Week | Test | Pass criteria |
|---|---|---|
| 1 | Hallway test of this build with 10 card-game players and 5 non-card-game players (link to the web build) | Non-card players understand chains by the end of the first act without help; median fight < 4 min |
| 2 | Paper/print-and-play of the chain with 3 enemies (rules-only check) and remote playtests with 30 players via the link | "Chain" named as the favorite thing by > 40% |
| 3 | Balance pass from bot sim + playtest deaths; first art target for 1 enemy + 5 cards | No encounter > 25% of human deaths |
| 4 | Retest; go/no-go | 50% of testers start a 3rd run unprompted |

### Milestones (team of 4: designer-programmer, programmer, artist, part-time audio/marketing)

| Milestone | Duration | Output | Budget (rough, contractor rates) |
|---|---|---|---|
| Prototype (done) | — | This build | — |
| Vertical slice | 2 months | Final art style, audio, Act 1 polished, analytics | $60–90k |
| Content complete | 4 months | 3 acts art, 90 cards, IAP, cloud save, store builds | $120–180k |
| Soft launch | 2 months | 4 countries, telemetry-driven balance | $40–60k + $20k UA |
| Global launch | 1 month | Featuring pitch to Apple/Google, PR | $30–50k + UA |
| **Total to launch** | **~9 months** | | **$270–420k** |

### Top 5 design risks and how to test early

| Risk | Early test |
|---|---|
| Chains are confusing on a phone | Week 1 hallway test; measure taps on enemy info and time-to-first-Reaction; A/B the chain overlay duration |
| Hidden enemy traps feel unfair | Track deaths "caused by" a trap; survey "did you feel cheated"; fallback: Trap Lens behavior as a default setting |
| Reactions feel passive ("I set it and nothing happened") | Count Reactions that expire unused; if > 40%, make unfired Reactions refund 1 Flux at end of round |
| Runs too long for mobile | Session telemetry; fallback: 2-act "Quick Circuit" mode |
| Hybrid paywall converts poorly | Soft-launch A/B: paywall after Act 1 boss vs after 3 runs |

## Open questions for a human to decide

1. Keep the name *Riposte*? A trademark search is needed (it is a common word and has been used by other games and apps).
2. Art direction: painted dark-fantasy portraits (as written) or a lighter, stylized look to widen the audience?
3. Price point: $6.99 unlock vs $4.99, and whether to ship premium-only on iOS first.
4. Should async PvP be in the launch scope, or a month-2 update as planned?
5. Is co-op worth the netcode cost given StS2 now owns "co-op deckbuilder" mindshare?
6. Should the Gambler's Echo event stay (rating risk) or be reframed?
7. Publisher or self-publish? (Self-publish recommended for a premium-hybrid with no UA-heavy model.)
8. Team: hire an artist first, or license a temporary asset pack for the vertical slice?
