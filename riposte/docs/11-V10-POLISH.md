# v0.10 "Polish Pass": 100 rounds of UI, UX and balance

Mike asked for the level-up unlock list to be fixed and then for 100 rounds of UI/UX fixes and balance adjustments. Each round below is one small, self-contained change, found by playing or screenshotting the game at phone size (390×844, Playwright), or by a balance sim. Decisions were made without stopping to ask, per Mike's standing instruction; anything debatable is called out.

## The fix: level-up unlocks for all 13 classes

`UNLOCKS` in `src/engine/meta.ts` was a hand-written map that still listed only the original six classes, so the level-up popup and the hub's "Next unlock" line never mentioned the seven v0.7 classes. It is now **derived from the data**: every character, hand-made card and relic with an `unlock` level above 1 is listed under that level (characters first). `docs/02-GAME-DESIGN.md` §7 has the matching table, plus a level 1 row for the three starting classes (Ashen Duelist, Arbiter, Tempest).

| Level | Unlocks |
|---|---|
| 1 | The Ashen Duelist, The Arbiter, The Tempest (from the start) |
| 2 | The Thorn Warden, The Rimeblade, Patience, Grave Bell |
| 3 | The Cardsharp, The Beastcaller, Wildcard, Sharpened Edge |
| 4 | The Hollow, The Geomancer, Ember Crown, Grove Guardian |
| 5 | The Magpie, The Alchemist, Flow State, Soul Rend |
| 6 | The Sexton, The Nightblade, Chain Crown |

## Rounds

### Rounds 1–25

1. **Character picker is a grid.** With 13 classes the old one-per-row list pushed the picked class's details, Ascension and the start button four screens down. Classes are now compact tiles (4 per row on a phone) showing icon, short name and HP (or wins), and the picked class's details sit directly under the grid.
2. **Unlocked classes first.** The picker sorts unlocked classes first and locked ones by unlock level, so a new player's three choices are not scattered between padlocks.
3. **Sticky "Begin run as …" button.** The start button sticks to the bottom of the picker and names the class it will start.
4. **Locked tiles explain themselves.** Tapping a padlock used to do nothing; it now says which level unlocks that class and that every run earns XP.
5. **Class header shows element and factions.** The details panel opens with the class name, its Element (what enemies hit) and its two factions, which the old list showed only for the row.
6. **CSS clash: text links looked like chain links.** The chain display and plain text links both used the class `link`, so "info" on the map, "edit" on the starting deck and "clear" on Vows were drawn as orange-bordered chain panels, and the chain example in How to Play was underlined. Chain entries are now `clink`.
7. **Text links have a tap target.** "info", "edit" and "clear" were ~16px tall; they now have a 32px minimum height and side padding.
8. **New players get an intro, not a changelog.** The first-launch popup used to list "Over 1000 cards (up from 204)" and other version notes to someone who had never played. New players now get three lines on traps, Reactions and the climb, and a primary "Pick a class and play" button (packs are the secondary button). Returning players get a v0.10 summary instead.
9. **The map opens where you are.** It only scrolled to the bottom after leaving a node, so a new run (or a resumed one) opened on the boss at the top, with the starting row off-screen. Whenever the map comes up at a new position it now centres on the nodes you can reach.
10. **Popups no longer reset scroll.** Every re-render replaced every scrolling panel, so tapping a map node's info, a card in the collection or a relic jumped the map or the list back to the top. Scroll positions of the known scrollers are now kept when the same screen re-renders (page and tab changes still start at the top).
11. **Map header pills in one row.** "wandering boss", the Sky, the Layout and the Champions counter were split between a centred row, an inline tag and a left-aligned line; they are now one left-aligned wrapping row, which also makes the sticky header shorter.
12. **Champions counter is tappable.** It explained itself only in a hover tooltip, which phones never show; tapping it now explains Champions and the Reflection.
13. **Rest site shows the real heal.** The Rest button always said 30% of max HP, but Skies, the Ascetic Fate and the Thirst Vow change it, and it ignored missing HP. It now shows the actual amount and the HP you will end on (`restHealAmount` in run.ts is shared by the UI and the rule).
14. **No accidental rest at full HP.** At full HP the Rest button says so and asks before wasting the site, and Smith becomes the highlighted choice. Smith is disabled, with a reason, when every card is already upgraded.
15. **Long card text fits.** About one card in four had rules text that ran under the rarity gem or off the bottom of small cards (packs, shop, rewards, hand). Cards with long text now get a shorter art band and a slightly smaller font (two steps, at 64 and 92 characters); every card in the game now shows its whole text.
16. **Deck view groups copies.** "Your deck" and the draw pile show each card once with a ×N badge, sorted by type, then cost, then name (was alphabetical by internal id, so Strike, Strike, Strike, Strike filled a whole row).
17. **View-only popups get one full-width Close.** The deck/pile viewer had a half-width Close button left over from the two-button pick layout.
18. **Discard pile says its order.** It is shown newest first; the title now says so, like the draw pile says "shown sorted".
19. **Reward screen: one way to skip.** It had "Take card", "Skip" and "Skip rest & continue", which did nearly the same thing. Now the primary button names the card you picked ("Take Wildfire", or "Tap a card to choose it"), and the bottom button says exactly what it skips ("Skip the card and continue"); it still confirms.
20. **First tutorial tip clears itself.** "Drag a card up to play it" stayed on screen after you had played a card until you pressed "Got it". Playing a card now moves the tutorial on.
21. **Tutorial tips are numbered.** Each tip shows "Tip 2/5" and the button reads "Next", then "Done" on the last one, so players know how much is left.
22. **Combat log button no longer spans the table.** The 📜 button was a flex child, so it stretched into a full-width strip between the enemies and the player. It is now a small button in the top-right corner, mirroring the Style meter on the left, which gives the enemies more room.
23. **Element matchups were wrong about mirrors.** Enemy and Attunement popups listed an element as "weak to" itself, but a same-element hit is resisted (×0.75). The line now reads "strong vs ⚡🌊 · weak to 🔥❄️ · 🌿 vs 🌿 is resisted", and `matchups().weak` no longer includes the element itself.
24. **Elements popup had two Close buttons.** It added its own on top of the standard one.
25. **Combat log has turn markers.** The log was a flat list of "Bramble Beetle: Harden." lines; it now marks "— Turn 2 —" (gold, centred), says "newest first", and keeps 100 lines instead of 60.

### Rounds 26–50

26. **Collection filters are readable.** The Cards tab had 26 filter chips, most of them bare glyphs (▲ ◆ ● ✦ ✧ ◇ ⚱ ☼ ϟ ❅ ⬢ ⚗ ♞ ☾ …) and element emoji. It now has All / Owned / 🌟 Legendary chips plus two labelled dropdowns ("ϟ Storm", "🌊 Flood"), which use the phone's native picker. "All" clears both dropdowns.
27. **Dropdowns don't fire as taps.** The global click handler would have run a `<select>`'s action on the tap that opens it; selects are now handled only on `change`, like inputs.
28. **Settings lists every faction shape.** The accessibility note listed the six original factions' shapes; it is now generated from the glyph table and lists all 15.
29. **Season tier reads "Tier 3 of 30".** It read "Tier 3 /30" next to an unlabelled "40/120"; the progress now says "40/120 Renown".
30. **Results screen: "Play again".** After a run the only button was "Back to hub", three taps from starting another run. There is now a primary "Play again" (straight to the class picker, same class selected) next to "Back to hub".
31. **Souvenirs aren't silently forfeited.** Leaving the results screen with souvenir picks unspent now asks first.
32. **New classes get their own line.** A level-up that unlocks a class now shows "🔓 New class: 🐾 The Beastcaller" with its one-line pitch, not just a name inside the unlock list.
33. **Short phones get a compact combat layout.** On a 320×568 screen the tutorial tip pushed the only enemy off the top. Below 640px of height the tip, Reaction slots, controls, energy orb and hand padding all tighten, which gives the enemy row about 60px back.
34. **Relic chips are easier to tap.** 30×28px became 36×30px.
35. **Style meter is tappable.** "✦ 0 style" sat in the corner of every fight with its meaning in a hover tooltip; tapping it now explains what earns Style and that it only feeds score.
36. **Nemesis banner is tappable.** Its reward (60 gold, a rare card, 100 score) was hover-only; tapping the banner now explains the Nemesis, the grudge and that it moves on after three wins.
37. **Enemy popup shows HP and Block.** Tapping an enemy showed its moves and statuses but not its health; it now leads with "❤ 14/19 · 🛡 5 Block".
38. **"1 trap(s)" grammar**, and the line now says "Your lens shows which" when a trap-revealing effect is active instead of claiming the traps are face-down.
39. **End turn warns about unused energy.** When you still have energy and a playable card, the End turn button says "2 energy unused" underneath. It is a reminder, not a confirmation, so it costs no taps.
40. **Toasts last as long as they need and can be tapped away.** Every toast vanished after 2.6s, too fast for the longer ones (unlock hints, Mystery reveals). Duration now scales with length (2.6–6s), and tapping a toast dismisses it.
41. **"Level 3 unlocks: …"** The hub's "Next unlock:" line now names the level it is talking about.
42. **Finished quests say "Claim" on the hub.** A completed but unclaimed daily quest still showed its reward on the title screen; it now shows a gold "Claim" badge (the card already opens the Quests tab).
43. **Stats: Ascension as a grid, locked classes marked.** The list said "The Nightblade: A0 unlocked · 0 wins" for classes you could not play yet. It is now a compact 13-tile grid; locked classes show a padlock and their unlock level.
44. **Stats: win rate.** The wins tile now shows your overall win rate next to the count.
45. **Loadouts use the class tiles too.** The Loadouts tab picked a class from a sideways-scrolling row of 13 two-line buttons, including disabled locked ones. It now uses compact tiles (like the class picker) and shows only the classes you have.
46. **Vibration setting.** Taking a hit always buzzed the phone. There is now a "Vibration on hits" toggle (on by default), and Reduce motion turns it off as well.
47. **Settings showed "Riposte v0.7 prototype".** The version now comes from one `APP_VERSION` constant, and a new test fails if it ever differs from package.json.
48. **Tests for this pass.** Two new rules tests: every class, card and relic with an unlock level appears in the derived unlock list (and the three starting classes are exactly Duelist, Arbiter and Tempest); and the rest site's preview always equals the HP it actually heals across Fates, Vows and missing HP. 84 tests.
49. **Greyed-out choices say why.** An event option you couldn't pay for (not enough gold or HP) or a Patron blessing that doesn't fit your run was just dimmed; it now says "Not available right now (you can't pay its cost)" or "Not available for this run".
50. **Spending asks first.** Buying a booster pack spent 100–130 Coins on a single tap, and crafting a Rare spent 400 Dust the same way. Buying a pack, crafting a Rare or Legendary, and dusting your last copy (or a Legendary) now confirm with the price and your balance. Commons and Uncommons still craft in one tap.

### Rounds 51–75

51. **How to Play folds up.** It was 27 sections in one scroll, in the order the versions added them, with "(v0.4)"-style tags in the headings. The three core sections (The run, Your turn, The chain) stay open; the rest are tappable sections sorted by usefulness (Elements, Counters, the classes and Between runs first), and the version tags are gone.
52. **HUD says "Floor 3", and "Start" before the first node.** It said "F0" at the start of each act, which reads like an error code.
53. **Muted text passes contrast.** The muted grey (#847b98) measured 3.4:1 to 3.9:1 on the panel colours, below the 4.5:1 WCAG AA minimum for small text, and it is used for most hints and captions. It is now #9a92ad (4.6:1 on the lightest panel, 6.3:1 on the background).
54. **Hub tab "Shop" is now "Packs".** The hub tab that sells booster packs for Coins shared its name with the in-run Card Merchant that sells cards for gold; the tab is renamed for what it holds.
55. **Forge explainer shrinks once read.** The Forge always opened with a large explainer panel on top of the first-visit tip saying the same thing; once the tip is dismissed, the panel becomes one line.
56. **Empty Reaction slots light up for a Reaction.** Selecting a Reaction card now highlights the empty slots and labels them "Set Parry here", so new players see where Reactions go.
57. **"Not enough energy" gives numbers.** The card detail now says "Costs 2 energy; you have 1", and a card blocked for any other reason no longer claims it is about energy.
58. **Low HP warning in the HUD.** At 30% HP or less the HUD's heart turns red and pulses (static under Reduce motion), so it is visible on the map when choosing between a rest site and a fight.
59. **"Reset all progress" looks dangerous.** It was styled like "Replay tutorial tips" right above it; it is now red-outlined (it still asks first).
60. **Keyboard controls for the browser version.** The playable link is often opened on a laptop, where everything needed a mouse. Esc closes popups, pickers and card selections; 1–9 inspects a card in hand and a second press plays it; E ends the turn. Listed under Settings → Help.
61. **Arena class choice is readable.** The Arena picked a class from 13 bare icons (locked ones disabled); it now uses the same named tiles as Loadouts and lists only your unlocked classes.
62. **Ascension "+" explains itself.** The raise button was greyed out with no reason; under the current level it now says "Win a run at A0 with this class to unlock A1".
63. **Relics tab grouped by rarity.** All 114 relics were one long list; they are now grouped (Class relics, Common, Uncommon, Rare, Boss, Shop, Blessings) with counts and a one-line explainer.
64. **Shop items open before you buy.** Tapping a card, relic or Omen in the run shop bought it immediately, so tapping to read a card cost gold. Each now opens a popup with the full card (big, with keyword explanations) or relic text and a "Buy for 💰 75" button, which says "You need 💰 20 more gold" or "Your Omen belt is full" instead when you can't.
65. **Purchases make a sound.** Buying cards and relics now plays the coin sound that Omens already had.
66. **Shop cards fit their text too.** The price band covers the bottom of shop cards, so text that fitted elsewhere ("…to each enemy with Shock") was still cut there; priced cards switch to the compact layout about 18 characters sooner.
67. **Starting deck list groups copies.** "Strike Strike Strike Strike Guard Guard Guard…" under the class details now reads "Strike ×4, Guard ×3, Spark Lunge, Parry ×2"; swapped-in loadout cards keep their highlight.
68. **Bestiary lists what you've beaten first.** Defeated enemies were scattered among 131 "???" tiles in data order; they now come first.
69. **Profile tab "Style" is now "Looks".** The cosmetics tab shared its name with the in-combat Style score, which has nothing to do with cosmetics.
70. **Popups are real dialogs.** Popups now carry `role="dialog"` and `aria-modal`, and focus moves to their main button when they open, so screen readers announce them and keyboard players can confirm with Enter.
71. **Results screen hides empty stats.** A short loss showed a grid of zeros (chains 0, longest chain 0, style 0, omens used 0). Score, XP and Coins always show; the other tiles only appear when they have something in them.
72. **Results say what beat you.** A loss in combat now adds "🕯️ Fell to The Impresario (boss)" to the highlights, so the lesson of the run is on the results screen.
73. **Rarity isn't colour-only.** The rarity gem at the bottom of each card only changed colour (grey, blue, gold, rainbow). Now commons have a small gem, uncommons a medium one, rares a large outlined one and Legendaries a star, so rarity reads without colour vision.
74. **Class grid keeps 4 columns on 360px phones.** Common Android widths fell back to 3 columns (13 classes = 4⅓ rows); the tile minimum is now 74px, so 360px+ screens get 4 per row and only 320px screens use 3.
75. **Empty draw pile says "reshuffle".** When the draw pile hits 0 its label changes from "draw" to "reshuffle", so it is clear your discard pile comes back next draw rather than that you have run out of cards.
### Rounds 76–100

Rounds 76–88 are the balance pass. Harness: `PROFILE=fresh|career npm run sim -- 100 0 <class>` (Ascension 0, everything on), all 13 classes in both modes. `sim/simulate.ts` now also prints `bosses (lost/fought)`, so every pass shows which bosses end runs, not only how often a class wins.

76. **Measure bosses, not just classes.** The v0.9 baseline reproduced exactly, and the new boss line showed the real problem: bosses in the same act were far apart. Act 1 bosses ended 6–20% of the runs that reached them, Act 2 bosses 7–48%, Act 3 bosses 53–88%. Which boss you drew mattered more than how you played. Every round below aims to narrow those spreads without moving the class win rates out of 10–30%.
77. **Act 1 bosses evened out.** The Bell Tyrant (20%) dropped from 112 to 106 HP; the Briar Queen went from 112 to 120 HP and the Lantern Warden from 120 to 128 HP, because both ended under 8% of runs.
78. **Act 1: the Tide Broker gets teeth.** The alternate Act 1 boss ended only 7% of runs that reached it. HP 125 → 133.
79. **Act 2: the Impresario and the Blotted Saint ease off.** They ended 48% and 40% of runs. The Impresario went from 165 to 150 HP and the Blotted Saint from 188 to 178.
80. **Wandering bosses pulled up.** The Leviathan went from 168 to 180 HP and the Magpie King from 160 to 180, because both were the easiest draw in their acts.
81. **The Gravelord, part 1.** It ended 88% of the runs that reached it. HP 236 → 212, Scythe 14×2 → 12×2, Reaping 34 → 30, and Block on Raise from 12 to 8 and on Tomb from 22 to 16.
82. **The Gravelord, part 2.** Still at 82%, because every Skeleton that dies gives it Strength and it raised two per turn. Raise the Fallen now summons one Skeleton, with 10 Block. Its blurb was updated.
83. **The Last Dealer.** HP 210 → 192, The Call 5×4 → 4×4, Raise gives 2 Strength instead of 3.
84. **The Forgemother.** HP 222 → 210, Rain 6×4 → 5×4, Anvil 26 → 24, Crucible 36 → 32, and the Mould pours one Forge Imp instead of two, with 18 Block.
85. **Easy Act 3 bosses pulled up.** Once the hardest ones came down, the Clockmaker and the Orrery were the soft draws. The Clockmaker went from 205 to 212 HP and the Orrery from 215 to 222.
86. **Class HP, first pass.** These changes undo the side effects of the boss changes, re-measured after each step:
    - Tempest 85 → 81 → 79.
    - Cardsharp 78 → 76 → 74 → 72 → 70.
    - Beastcaller 79 → 75 → 77 → 74 (75 was too low for fresh runs).
    - Arbiter 76 → 74 → 72 → 70.
    - Alchemist 68 → 66.
    - Warden 70 → 68.
    - Nightblade 56 → 55.
    - Hollow 62 → 60.
    - Geomancer 80 → 78.
87. **Class HP, the slower classes.** The Rimeblade (74 → 77) and the Sexton (90 → 93) lost the most when Act 3 bosses stopped being coin flips decided by burst, so they got a little HP back.
88. **Result.** Every class is inside 10–30% in fresh profiles, and inside it in career profiles within noise. The Beastcaller's career rate is 31% at 200 runs, one standard error above 30%. Its fresh rate is already 10%, so cutting more HP would push fresh out of the band. Its gap between fresh and career runs is the widest of any class, so the next lever is its loadout or talents rather than its HP. The boss spread inside each act is about halved. Full tables are in `docs/BALANCE.md` (v0.10 section).

Rounds 89–100 are the last UI/UX rounds.

89. **Talents say why they won't raise.** Tapping a maxed talent or one in a locked tier did nothing; it now says "Field Dressing is maxed" or "Spend 2 more points in School of Guard to open Field Dressing" (the out-of-points message was the only one before).
90. **Locked cosmetics say where they come from.** Tapping a locked familiar, card back or title did nothing; it now names the source ("Season track, tier 17" or the trophy and what it asks).
91. **Settings from the run menu, and Back goes back.** The in-run menu had no Settings (to change animation speed or Counter prompts mid-run you had to quit to the hub), and How to Play's Back button always went to the title screen, even when opened mid-run. The run menu now has Settings, and both screens' Back returns to wherever they were opened from.
92. **Run menu shows where you are.** The ☰ menu now opens with the class, Ascension, act, floor and score so far, and "Abandon run" is red like the other destructive buttons.
93. **Deck view shows the mix.** Under "Your deck (14)" a line now reads "6 attacks · 5 skills · 3 reactions", the quickest way to judge what a card reward should add.
94. **Card rewards link to your deck.** "Choose a card" now has a "your deck: 14" link beside it that opens the grouped deck view, instead of hunting for the 🂠 button in the HUD.
95. **"Continue run" shows your HP.** The hub's Continue button now reads "The Tempest · Act 2 · Floor 14 · ❤ 31/81", so you know what you are walking back into (and says "start" instead of "Floor 0").
96. **Collection popup says what the Forge will do.** "Open in Forge" became "Craft in the Forge (✨ 100 Dust · you have 40)" for cards you don't own, and "Imprint or dust in the Forge" for ones you do.
97. **Incoming damage total.** A chip under your HP adds up every enemy's attack intent: "⚔ 14 incoming · 9 through" (red), "all blocked" (blue) once your Block covers it, and a pulsing dark red when it would kill you. Counting multi-hit intents like "⚔ 5×4" across three enemies was the most common mental arithmetic in a fight.
98. **Press and hold a map node to read it.** Tapping a glowing (reachable) node travels at once, so there was no way to read what a reachable Shrine, Venue or Champion did before committing. Holding it for half a second now opens its info with a "Go here" button; unreachable nodes still open on a tap, and their info mentions the hold.
99. **Rest sites no longer share the Champion's flame.** The map legend showed 🔥 for both "Rest site" and "Champion elite", and a Champion is marked by a 🔥 badge on its node, so a glance at the map could mix them up. Rest sites now use 🏕️ on the map (the rest screen keeps its campfire).
100. **Map legend lists only what is on this map.** The legend always showed all ten node types plus Champions, three lines of text on a 360px phone. It now lists only the node types visible on the current map (fogged rows excluded), with the Boss always shown and the Champion key only when a Champion is visible.
