# Prompt: Design a Mobile TCG × Roguelike Game

> Copy everything below the line into your AI tool of choice (or hand it to a design team). It works best in one long session where the model can do each phase in order. Fill in the optional `[brackets]` if you have preferences; otherwise leave them and let the designer decide.

---

## Your role

You are a senior game designer and product strategist who has shipped card games and roguelikes on iOS and Android. You understand card-game math (mana curves, card advantage, tempo, value), roguelike structure (runs, meta-progression, risk/reward pathing), and the business of free-to-play and premium mobile games. Be opinionated. When you make a choice, say why, and name the game you are borrowing from.

## The goal

Design an original mobile game that fuses **collectible/trading card game (TCG/CCG) depth** with a **roguelike run structure**, in the spirit of *Slay the Spire*, *Magic: The Gathering*, and *Yu-Gi-Oh!*. It must:

1. Feel as balanced and strategically deep as those games.
2. Be built for phones first: short sessions, one-thumb play, portrait or landscape (justify which), fast load times, offline-friendly.
3. Occupy a **niche nobody is serving well yet**, but one with clear evidence that players would want it.
4. Ship on the Apple App Store and Google Play.

## Phase 1: Benchmark the genre (top ~100 games)

Build a benchmark list of roughly 100 of the most successful or influential TCGs, CCGs, deckbuilders, and roguelikes (digital and physical). Group them, and for each group pull out what makes the best ones work. At minimum cover:

- **Physical TCGs:** Magic: The Gathering, Yu-Gi-Oh!, Pokémon TCG, Flesh and Blood, Lorcana, One Piece, Digimon, Netrunner, Keyforge, Star Wars Unlimited.
- **Digital CCGs:** Hearthstone, Marvel Snap, Pokémon TCG Pocket, MTG Arena, Yu-Gi-Oh! Master Duel, Legends of Runeterra (including Path of Champions), Gwent, Shadowverse, Eternal, Mythgard, Duelyst.
- **Roguelike deckbuilders:** Slay the Spire 1 and 2, Monster Train 1 and 2, Balatro, Inscryption, Dicey Dungeons, Griftlands, Wildfrost, Cobalt Core, Peglin, Luck be a Landlord, Backpack Hero, Across the Obelisk, Night of the Full Moon, Dawncaster, Card Crawl, Card Thief, Hand of Fate, Ascension/Dominion-style deckbuilders.
- **Roguelikes/roguelites (non-card):** Hades, Dead Cells, The Binding of Isaac, Vampire Survivors, FTL, Into the Breach, Risk of Rain, Spelunky, Darkest Dungeon, Loop Hero, Dome Keeper, Brotato, Archero, Shattered Pixel Dungeon.
- **Auto-battlers and hybrids:** Teamfight Tactics, Super Auto Pets, The Bazaar, Hearthstone Battlegrounds, Storybook Brawl, Mechabellum.

For each group, produce a table with: game, platform, core loop, signature mechanic, monetization, session length, why players stay, and the one idea worth stealing. Then summarize the **top 15 mechanics** across all of them that are proven crowd-pleasers. Examples to evaluate: Slay the Spire's visible enemy intents and branching map; MTG's color pie and mana system; Yu-Gi-Oh!'s chain/response stack and combo extenders; Marvel Snap's 3-minute matches, locations, and "snap" doubling; Balatro's exponential scoring and joker synergies; Inscryption's sacrifice economy and meta-narrative; Monster Train's multi-floor lanes; Hades' narrative-wrapped meta-progression; The Bazaar's asynchronous PvP against "ghost" builds; Super Auto Pets' asynchronous matchmaking.

Also list the **top 10 failure patterns** (why games in these genres died or stalled): pay-to-win collections, power creep, long matches on mobile, opaque RNG, new-player walls, grind-locked meta, etc.

## Phase 2: Find the niche

Map the market on at least two axes (for example: *solo ↔ competitive PvP* and *short session ↔ deep session*, or *collection-driven ↔ run-driven*). Place the benchmark games on the map and identify the empty or weakly served spaces.

Propose **5 candidate niches**. For each, give:

- The one-sentence pitch.
- Who the player is (age, habits, what they play today, what frustrates them).
- Evidence of demand: adjacent successes, community requests, search trends, reviews of competing games.
- Why existing games don't serve it.
- Risks.

Score all five on demand, differentiation, mobile fit, monetization potential, and buildability for a small team. Pick one, and defend the choice. Ideas worth testing (don't limit yourself to these):

- A roguelike where your **run deck becomes a collectible**: each finished run can be "minted" into a deck you keep and take into async PvP, so the roguelike feeds the TCG.
- **Async PvP roguelike** where you fight other players' saved decks as roguelike bosses.
- **Co-op roguelike TCG** for two players on phones (very underserved on mobile).
- A **"Yu-Gi-Oh! combo" roguelike**: chain and response stack in a single-player run, which almost no roguelike deckbuilder does.
- **Daily-seeded competitive runs** with global leaderboards, like Wordle meets Slay the Spire.
- A **fully fair collection**: no packs for power, cosmetics only, every card earned through play.

## Phase 3: Design the game

Design the chosen concept in detail:

1. **High concept:** title ideas, elevator pitch, setting, tone, art direction for a small screen.
2. **Core loop:** what one turn, one fight, one run, and one week of play look like. Target run length and fight length on mobile (be specific in minutes).
3. **Resource system:** mana/energy model and why (MTG lands vs. Hearthstone auto-ramp vs. Slay the Spire fixed energy vs. something new). It must avoid mana screw while keeping meaningful choices.
4. **Card design:** card types, factions/colors (with a "color pie" of what each faction can and can't do), keywords (10 to 15 max), rarity, and **30 example cards** with cost, stats, text, and the role each plays.
5. **Interaction model:** what the opponent can do on your turn (stack, traps, reactions, intents), and how this stays fast on a phone.
6. **Roguelike structure:** map/pathing, node types (fight, elite, shop, event, rest, treasure), relics/artifacts (give 15 examples), deck-thinning and upgrades, boss design (give 3 bosses), and difficulty ladder (like Ascension levels).
7. **Meta-progression:** what carries over between runs, how unlocks pace over the first 30 days, and how it avoids making early runs feel pointless or late runs feel trivial.
8. **The TCG layer:** collection, deckbuilding outside runs (if any), trading or crafting, and how PvP or social features work.
9. **Balance framework:** a cost-to-power formula, how you'll value card draw, removal, and tempo; win-rate targets per archetype; how you'll use telemetry and patch cadence; and how you prevent power creep across expansions.
10. **Onboarding:** the first 10 minutes, the first session, and the first week. How a player who has never touched a card game learns, and how an MTG veteran doesn't get bored.

## Phase 4: Mobile and business plan

1. **Mobile UX:** screen layout for a hand of cards on a 6-inch screen, tap vs. drag, readability of card text, mid-fight save/resume, offline play, battery and performance targets, accessibility (colorblind modes, text size, one-handed play).
2. **Tech:** recommended engine (Unity, Godot, Unreal, or other) with reasons, backend needs for PvP and leaderboards, anti-cheat for async PvP, and cross-progression between iOS and Android.
3. **Monetization:** compare premium, free-to-play, and hybrid (premium plus cosmetic store, battle pass, expansions). Recommend one. It must not be pay-to-win. Include rough pricing.
4. **App Store and Google Play compliance:** loot box odds disclosure, age rating, in-app purchase rules, privacy labels, regional rules (e.g. Belgium, Netherlands, China on randomized purchases).
5. **Live ops:** content cadence for year one (new cards, characters, events, seasons), and how daily/weekly challenges keep players returning.
6. **Go-to-market:** target audience, positioning against the top three competitors, soft-launch countries, KPIs (D1/D7/D30 retention, session length, conversion, ARPDAU targets based on genre benchmarks), and community plan (Discord, streamers, Reddit).

## Phase 5: Build plan

- MVP scope: the smallest version that proves the fun (number of cards, enemies, relics, characters).
- A paper or digital prototype plan to test the core loop in under 4 weeks.
- A milestone roadmap from prototype to soft launch to global launch, with team size assumptions `[team size: e.g. 3 to 5 people]` and budget range `[budget: optional]`.
- The top 5 design risks and how each will be tested early.

## Output format

- Start with a **one-page executive summary**: the niche, the pitch, why it will win, and the three mechanics that define it.
- Then give each phase as its own section with headings, tables where they help, and concrete numbers rather than vague adjectives.
- Cite real games for every borrowed idea.
- End with a list of **open questions** you'd want a human to decide.

## Constraints and preferences

- Platform: iOS and Android first; PC/Steam port optional later.
- Play style: `[solo / PvP / co-op / mix — leave blank to let the designer choose]`
- Art style: `[e.g. hand-drawn, pixel, anime, dark fantasy — optional]`
- Business model: `[premium / free-to-play / hybrid — optional]`
- Must be fair: skill and choices should matter more than spending.
- Must be playable in short sessions (aim for a meaningful decision within 10 seconds of opening the app, and a fight in under 5 minutes).
- Must be original: borrow mechanics, never names, characters, or art from existing IP.
