# Dawnwick · The Last Word (storyline, v0.11; renamed from Riposte in v0.14.1)

> *Under a city where the sun stopped rising, every quarrel is settled at cards. You carry the last ember of dawn down a duel hall full of ghosts, to win one wish at the Last Table. The house always wins. You are going to make it answer.*

This is the lore bible. Every line of in-game text lives in `src/data/story.ts` (scenes) and `src/data/story-events.ts` (events); `src/ui/story.ts` decides when each beat plays. This document explains the world those lines come from, so new content (classes, bosses, events, art) stays consistent.

## 1. Design goals

| Goal | How |
|---|---|
| **Mainstream and instantly readable** | One-sentence premise, one clear villain, one lovable companion, one goal (get the sun back). No glossary needed to follow it. |
| **Fits everything already in the game** | Every existing system has a reason in the fiction: the tagline, the element wheel, Echoes, Legacy minting, the Nemesis, Patrons, Venues, Fates, the Crypt, the Reflection, the Long Night, and why you start again after dying. |
| **Story that pays out on death** (Hades) | Losing adds lines (Ferryman tally, Nemesis, Story-book chapters). The death loop is in the fiction: nobody dies in the Circuit. |
| **Phone-sized beats** | Every beat is ≤160 characters (a test enforces it). Scenes are 2–6 beats, tap Next or Skip. Boss half-HP shouts are toasts, never interrupting play. |
| **Never in the way** | Scenes only appear at natural pauses (act start, boss start, boss down, the crossroads, the results screen). One toggle in the Story book turns scenes off. Arena and Riddles have no story. |
| **Funny, then earnest** | Wick and the Dealer keep it light; each class's ending lands one sincere moment. The final twist is the game's own title. |

## 2. The premise in four beats (the prologue)

1. The city of **Vesper** settled everything at cards: wars, crowns, who got the last slice of cake.
2. One rule held it together, carved over the door of the duel hall beneath the city: **EVERY MOVE HAS AN ANSWER.** (The tagline on the title screen is literally the law of the world.)
3. A hundred years ago the champion **Cassius Vane** won the Last Table and made his wish: **the last word**, a move nobody could answer.
4. He got it. The rule broke. **The sun set over Vesper and never came back up.**

Then the Ferryman hands you a candle stub: the last ember of the sun. It talks.

## 3. The world

### Vesper and the Eight Houses
- The **six elemental Houses** (Blaze, Frost, Wild, Storm, Flood, Stone) drew up **the Wheel**: each beats the next two and loses to the two before (this is the game's element wheel, ×1.3 / ×0.75). It is a peace treaty: no House can ever rule all the others.
- **Dawn** (Radiant) judged the duels. **Dusk** (Umbral) punished cheats. They sit outside the Wheel and oppose each other, which is why Radiant and Umbral beat each other.
- The card **factions** (Ember, Tide, Thorn, Void, Gilt, Glass, Grave, Dawn, Storm, Rime, Beast, Stone, Aether, Dusk) are the old **schools** of the Circuit, each teaching one way to play.

### The Accord of the Answer
The treaty that made the Circuit. Under it, all quarrels are settled by duel, every move must have an answer, and **nobody dies in a duel**: a duel settles things, it does not end them. That last clause is why a run can be lost and tried again.

### The Undercroft Circuit
The duel hall under the city, descending:

| Floor | Game | What it was | What it is now |
|---|---|---|---|
| The Upper Circuit | Act 1 | The public floor: markets, practice halls, the lamplit road | First to go strange: the doorman never relieved, a bank lending to people who can't leave, and a forest that grew down to look for the sun |
| The Middle Circuit | Act 2 | The famous duel halls, the audience, the docks | A hundred years of audience turned into knives; a showman selling tickets to losses; the sunken docks and what lives in them |
| The Deep | Act 3 | The Last Table and its keepers | Cassius's table, and the powers that each tried to fix the Night their own way |
| The Mirror | Act 4 | Behind the Last Table | Where winners are turned into the next thing to beat |
| The Long Night | Endless | Below everything | The night itself, and what ate the sun |

The **Dawnwick** was the great lamp at the Last Table whose flame was Vesper's sun. The sun rose because the game was fair. When the Accord broke, the Dawnwick cracked and went dark.

### Why the systems exist (in the fiction)

| System | In-world reason |
|---|---|
| **Starting over after a loss** | Nobody dies in the Circuit. The **Ferryman** rows the fallen back up the black river to the top of the stair, free. "That's the cruel part." He keeps a tally (re-entry lines change as your deaths add up). |
| **Echoes** (elite ghost decks) | The Circuit keeps a copy of everyone who plays at its tables. An Echo is a deck that kept playing after its duelist stopped. |
| **Legacy decks** (minting) | You leave a copy on purpose. "The house always keeps a copy" is the sting on every Ask. |
| **The Nemesis** | Things in the Circuit feed on winning. The one that beat you got a taste and remembers you. Three wins and it gets bored and moves on. |
| **Patrons** | Five founders who signed the Accord, still haunting the stairs between floors: the Archivist, the Bellmaiden, the Ferryman, the Gardener, and the Masked Patron. |
| **Venues** | Rooms of the Undercroft, each still enforcing one old house rule of its own. |
| **Fates** | "Three cards turn over at the start of the road. Each is a life you could lead." The Circuit offers you a role; you can refuse it. |
| **The Crypt** (Sexton) | Nothing stays dead in the Circuit, so buried cards can be dug up again. The Sexton has been the gravedigger for a century. |
| **Champions** (elite affixes) | Creatures that have won so often down here they have started to glow with it. Beating two is what earns you a look at the Mirror. |
| **The Reflection** (Act 4) | Winners don't leave. They sit in the seat behind the Last Table and become the next thing a duelist must beat. The only deck that can answer yours is yours. |
| **The Long Night** | The stair keeps going under the Last Table, into the night that never ended. Every night cleared lightens the sky over Vesper a shade. |

## 4. The cast

### Wick 🕯️ (your companion)
The last ember of the Dawnwick, a candle stub with opinions. The Ferryman carried it in a jar for a hundred years, waiting for someone stubborn enough to take it down. Brave, chatty, terrified of water, wind and being stepped on. Wick never says it out loud, but it wants to be the sun again. Nobody has asked for that yet. Wick is being very patient about it.

### The Last Dealer 🃏 (Cassius Vane)
The host and the villain. Charming, wry, tired. Cassius never lost a duel; when he won the Last Table he asked for the one thing he didn't have, the last word. He got exactly that: he can never play again, only deal, forever. *The house always wins, because he is the house.* He opens every act like a ringmaster, and (as Act 3 boss of the Dealer's Abyss) fights you himself. Secretly he would love to lose; the Duelist's ending gives him that.

### The Ferryman ⛴️
Rows you back after every loss and hands you Wick at the start of every run. Kind, dry, keeps a ledger. His re-entry lines warm up as your death count grows.

### The House (the Masked Patron) 🎭
The hidden layer, revealed only in the Story book: the fifth signature on the Accord was the House itself, the cut every game takes. It whispered to Cassius that he deserved the last word. A city in the dark plays cards all night, so the House does not want the sun back. (A hook for a future act or expansion.)

## 5. Act by act

Each act has three versions plus two wandering bosses. The Dealer's opening line names the place and its boss, so the story works whichever version a run rolls.

### Act 1 · The Upper Circuit
| Version | Boss | Who they are | Motive |
|---|---|---|---|
| The Lantern Road | **The Lantern Warden** 🏮 | The doorman. Has been on the door a hundred years because nobody relieved him. | Duty. Secretly relieved to lose: "Tell the Dealer I'd like a chair." |
| The Drowned Market | **The Tide Broker** 🐙 | A banker who kept lending in a city nobody could leave. | Greed with a sense of humour. Wants your Ask as collateral. |
| The Hollow Woods | **The Antlered King** 🦌 | The forest came down looking for the sun; he leads it. Once the gentle leader of the Beastcaller's pack. | Grief turned territorial. "Tell the sun the trees are still waiting." |
| Wanderer | **The Briar Queen** 🌹 | A cutting from the Thorn Warden's garden that fell down a drain thirty years ago. | Wants a sunny place to grow. |
| Wanderer | **The Bell Tyrant** 🛎️ | Feeds on chains. | Hungry for noise; finally hears himself think once his bell cracks. |

### Act 2 · The Middle Circuit
| Version | Boss | Who they are | Motive |
|---|---|---|---|
| The Chorus Halls | **Chorus of Knives** 🎼 | A hundred years of audience who turned into the show. | To perform, at last. They mean the "Bravo". |
| The Gilded Masquerade | **The Impresario** 🎩 | A showman who sells tickets to losses. The Cardsharp's old double-act partner. | Box office. |
| The Wreckers' Coast | **The Leviathan** 🐋 | Moved into the docks that sank the night the sun went out. Eating the city's pilings (the Geomancer's problem). | Hunger. Doesn't do motives. "SMALL. LOUD. EDIBLE." |
| Wanderer | **The Magpie King** 🦚 | Stole the crown of Vesper; raised the Magpie. | Collecting. Wants Wick ("I collect suns"). |
| Wanderer | **The Blotted Saint** 📜 | The scribe who copied out the Accord, then "improved" it. Wrote over the Hollow's name. | Control of the text. When beaten he can read the original again, and admits it was better. |

### Act 3 · The Deep
Each Act 3 boss tried to fix the Night in their own wrong way. That's the act's theme.

| Version | Boss | Their "fix" | Motive |
|---|---|---|---|
| The Dealer's Abyss | **The Last Dealer** 🃏 | None. He is the problem, and knows it. | Wants to be beaten. Can't throw a game. |
| The Clockwork Abyss | **The Clockmaker** 🕰️ | Stopped every clock at the moment the sun went out: if no time passes, nothing was lost. | Denial. "Tick… Tock. I'd forgotten that sound." |
| The Molten Deep | **The Forgemother** 🌋 | Forged every card ever played; wants to melt the Circuit down and start again. | Starting over. "Make something better than I did." |
| Wanderer | **The Orrery** 🪐 | Turns the stars by hand, since there is no sun to run them. | Exhaustion. Happy to hand the sky to someone else. |
| Wanderer | **The Gravelord** ⚰️ | Raises everyone who lost here and plays them again. The Sexton's rival. | Possession. Gives them up to the ground when beaten. |

After the Act 3 boss: **the Last Table** and **your Ask** (see Endings).

### Act 4 · The Mirror
Offered when you slew two Champions. Behind the Last Table hangs a mirror. **The Reflection** 🪞 explains the Circuit's real trick: every winner sits here and becomes the next thing to beat. It plays your own deck. Beat it and you leave the seat empty, which nobody has ever done.

### The Long Night
Below the Last Table, the night itself. Its native bosses are **the Night Mare** 🐴 (a dream you can't wake from) and **the Dawn-Eater** 🌑, the thing that swallowed the sun. Beating the Dawn-Eater returns a sliver of light to Wick ("I'm like eleven percent sun now!"). Every other night boss is a returning boss "walking faster in the dark".

## 6. The thirteen duelists

Each class has: who they are, a motive line at run start, a line at each act start, a boss retort, rivalry lines against bosses they have history with, a line for the Mirror, an **Ask** ending, a true-ending epilogue and a defeat line.

| Class | Who | The Ask | Rivals | Arc in one line |
|---|---|---|---|---|
| 🤺 **Ashen Duelist** | Last student of the Ember school; grandmother trained under Cassius. The ash is from the night the sun went out. | "That Cassius Vane loses. Just once." | Last Dealer | The student finishes the lesson, and gives the undefeated man the one thing he never had. |
| 🛡️ **Thorn Warden** | Keeper of the Ninefold Garden above, where only thorns grow, kept alive out of spite. | "One spring." | Briar Queen, Antlered King | Patience wins; the first green shoot in a century. |
| 🕳️ **The Hollow** | Won a small Ask decades ago to forget a grief; lost their name and face with it. | "Give it back. Even the part that hurt." | Blotted Saint, Reflection | Choosing pain over emptiness; gets a name back. |
| 🎩 **Cardsharp** | Grifter here to beat the biggest house there is. | "Everything the house has ever won." | Last Dealer, Impresario, Magpie King | Asks for the jackpot, which turns out to be a century of mornings. A good deed by accident. |
| 🐦‍⬛ **Magpie** | Best thief of the Magpie King's flock. | She doesn't ask; she steals the Ask. | Magpie King ("Hi, Dad." "You're a bird.") | Then gives it away to Wick: her first gift. |
| ⚰️ **Sexton** | The Circuit's gravedigger for a hundred years. | "Let them rest." | Gravelord | Mercy for every Echo, including Cassius. |
| ⚖️ **Arbiter** | Last judge of the House of Dawn, holding a hearing a century late. | "A ruling: the Unanswered Hand is out of order." | Blotted Saint, Last Dealer | No law covers it, so she sets one: every last word can be answered. |
| 🌩️ **Tempest** | Storm-chaser bottling lightning to jump-start the sun. | "To see the real sky. Just once." | Orrery | Brings their own light: every bottle opens and Vesper is lit for one second. |
| ❄️ **Rimeblade** | Froze herself the night of the Unanswered Hand; thawed last winter. Her sister Isolde is an Echo. | "Let Isolde put her cards down." | Clockmaker (and every Echo) | Saves one Echo out of thousands, and starts there. |
| 🐾 **Beastcaller** | Raised by the pack in the Hollow Woods. | "Let the pack see the sky." | Antlered King | The pack howls at its first sky, then naps. |
| 🪨 **Geomancer** | Engineer of Vesper's foundations; the city is cracking. | "That Vesper stays up." | Leviathan, Forgemother | The least glamorous wish, and the one the whole city needed. |
| ⚗️ **Alchemist** | Scholar who wants the formula for a wish, to brew a sun. | "The recipe." | Forgemother | The recipe is "one answer, freely given". "That's not chemistry, that's a metaphor." |
| 🥷 **Nightblade** | Last blade of Dusk; Cassius has topped the kill list for a century. | "His name, crossed off." | Last Dealer | Keeps the oath by answering him, not killing him. "I'm thorough." |

## 7. Endings

| Result | What plays (results screen) |
|---|---|
| **Defeat** | The boss's victory line (if a boss killed you), the Ferryman, your class's defeat line, Wick, and a Nemesis warning if one was set. |
| **Victory (Act 3 boss)** | **The Ask**: the Dealer at the Last Table ("Make it a good one"), or, if you beat Cassius himself, "Go on: ask." Then your class's Ask scene, then the sting: *"The house always keeps a copy."* |
| **+ Reflection won** (true ending) | You leave the seat empty and walk back up. A thin grey line opens between the roofs and the sky. Wick: "That's not the sun yet. But it's the sun thinking about it." Plus your class epilogue. |
| **+ Reflection lost** | The Reflection keeps the seat warm, and your face. The run still counts. |
| **+ Long Night** | One more beat by nights cleared: the sky a shade lighter, a baker opening early, the dark keeping its distance. |
| **Nemesis** | The defeat screen warns that it has your scent; slaying it is recorded for the Story book. |

## 8. The Story book (meta story)

A **📖 The Story So Far** button on the title screen opens the book. Twelve chapters unlock with play, so the mystery comes out over many runs, the way Hades pays out on death. It also shows each class's Ask once you have won with them, lets you replay the prologue, and has the on/off switch for story scenes.

| # | Chapter | Unlocks when | Reveals |
|---|---|---|---|
| 1 | Deal Me In | Start a run | The Houses, the Wheel, the Circuit, the Ask |
| 2 | The Ferryman's Fare | Lose a run | Why nobody dies; who carried Wick |
| 3 | The Door | Beat an Act I boss | What happened to the Upper Circuit |
| 4 | A Grudge | Get a Nemesis | How Nemeses work |
| 5 | The Audience | Beat an Act II boss | The Middle Circuit, the Patrons |
| 6 | Copies | Fight an Echo or mint a Legacy | What Echoes are |
| 7 | The Last Table | Win a run | Every Ask is granted, with a copy kept. Nobody has asked for the sun. |
| 8 | Cassius | Beat the Last Dealer | The Unanswered Hand, the Dawnwick |
| 9 | The Mirror | Face the Reflection | Winners become the next thing to beat |
| 10 | The Long Night | Descend | What lives below, and the sky getting lighter |
| 11 | The Masked Signature | Win 3 runs | The fifth founder was the House |
| 12 | **The Dawnwick** | Beat the Reflection | The twist (below) |

**The twist.** Every move has an answer. Cassius has the last word. Both can be true only if someone answers *after* the last word. The old fencing schools of Vesper call that reply **a riposte**. The Dawnwick never burned on wishes; it burned on answers. Every time a duelist beats the mirror and walks out, the Dawnwick catches a little. Not as a prize. As a reply. (Since v0.14.1 the game is called *Dawnwick*, so the final chapter names the title: the thing Wick is waiting to become.)

## 9. Where it plays in a run

| Moment | Scene |
|---|---|
| First run ever, Act 1 start | Prologue (8 beats) + your class motive + the Dealer's act line |
| Later runs, Act 1 start | Ferryman re-entry (by death count) + Wick + motive + Dealer |
| Acts 2 and 3 start | Kicker and act name, the Dealer (by version), wandering-boss "programme change", Nemesis warning, Wick, your class |
| Patron visit | A Wick aside about that Patron (toast) |
| Boss fight, turn 1 | Boss intro (2–3 beats) + your class's retort or rivalry line (or Mirror line) |
| Boss below half HP | The boss's shout (toast) |
| Echo elite / Nemesis fight | One-line toast |
| Act 1–2 boss down | Its last words + Wick |
| After the Act 3 boss | The crossroads: the boss's last words, then the Dealer and Wick on the Mirror or the stair |
| Long Night, each night | Night title + 2 beats; night bosses get a "walks faster in the dark" line |
| Results screen | The ending (section 7) |

Ten **story events** join the event pool: *The Dealer's Night Off* (Acts 2–3), *Jarred Daylight* (1–2), *An Empty Chair* (3), *A Page of the Accord* (1–2), *Someone You Knew* (2–3; a different Echo for each class, e.g. the Rimeblade meets Isolde), *The Understudy* (2), *The Ferryman's Ledger*, and three roadside beats: *Wick Gutters*, *A Note on the Path* (from C.V.), *The Sexton Passes*. Their rewards match the existing events'.

## 10. Writing rules for new content

- Beats ≤160 characters; a scene is 2–6 beats. The test in `sim/story-tests.ts` checks length, speakers, and that every boss and class has its lines.
- A new boss needs an entry in `BOSSES` (intro, half, down, win). A new class needs a full `CLASSES` entry. A new Patron needs a `PATRON_WICK` aside. The test fails otherwise.
- Wick is funny, never mean. The Dealer is charming, never cruel. Bosses get one sincere line when they fall.
- No new proper nouns in a beat without context; the reader is on a bus.
- The story never blocks play: no story beat during an enemy turn, a chain, a counter prompt or a picker.
