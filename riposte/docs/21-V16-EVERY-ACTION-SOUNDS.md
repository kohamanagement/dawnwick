# v0.16 "Every Action Sounds": a sound and a reaction for everything you do

**Date:** 2026-10-26 · **Asked by:** Mike ("make sure there are some noise or actions when things are attacked, blocked, or countered, or if you find an item or click and take gold or take a chest, or any event in general. Music and sound is essential to this game").

## The audit

v0.13 built the music engine and 38 effects, but many moments were still silent or had no motion. Every player action and state change was checked in `src/main.ts` (combat flow, rewards, shop, Candle, events, map, hub) and the engine's combat events (`UiEvent` in `src/engine/combat.ts`).

| Moment | Before | Now |
|---|---|---|
| You hit an enemy / an enemy hits you | the same "hit" | your hits keep "hit"; hits on you are a lower, rougher **hurt**; 10+ is still the big hit with a screen shake |
| Block soaks a hit completely | silent, nothing shown except "-N🛡" | **blocked** thunk, blue parry flash, blue sparks |
| A hit breaks through Block | just the hit | hit plus **shield break** (metal cracks, shards), a blue ring bursts off the target |
| You weaken an enemy (Weak, Exposed, Shaken…) | silent | sour **debuff** wobble, the enemy flashes violet |
| You gain a buff | the same "status" as a debuff | rising **buff** pair (debuffs on you keep the old sound) |
| Element wheel: Effective / Resisted | silent | a sparkle with gold sparks / a dull thud |
| Miss, Fled | silent | a **whoosh** through air |
| Frozen | silent | **ice crackle**, the target frosts over |
| Stolen, Mimic | silent (the effect existed, unused) | **steal** |
| Summoned, Reborn, Phoenix, Exhume, Haunt | silent | **summon** |
| Gold from a card (Cash in, +N gold) | one coin | a **coin shower**, more coins for more gold |
| Playing an attack card | the generic card snap | **slam**: snap plus a thud, and an orange shockwave ring where it lands (other cards get a gold ring) |
| An enemy winds up an attack | only the enemy-turn knock | a **swing** whoosh just before the hit |
| You Counter (press "Counter with…") | silent until the recap | the **Counter** ring at once and a gold screen flash |
| You let an enemy answer resolve | a click | a soft card laid down |
| An enemy trap springs in the chain | the trap sting | the sting plus a red edge flash |
| Take gold (reward, treasure, event) | sparks on the button, silent | coin shower; the HUD gold number **counts up**, pulses and floats "+N" |
| Take a keepsake | silent | **keepsake** fanfare (rising bells over a swell); the new chip pops into the bar with sparks |
| Open a chest (Treasure stop) | silent | lid creak, latch pop, a run of bells; the chest wobbles, bursts open and glows |
| Take a reward card / any card added to the deck | silent | the card **slides into the deck**; the deck button bumps and floats "+1" |
| Remove a card (Merchant, event) | silent | torn and burned; the deck button floats "−1" |
| Transform a card | silent | a rising **transform** shimmer |
| Stamp a sigil (forge) | silent | **anvil** strikes |
| Upgrade from an event or shrine | silent | the hone sound (it already played at the Candle) |
| Gain max HP | silent | a heartbeat and bells, "+N max" on the HP stat |
| Lose HP outside a fight (event costs) | silent | **hurt** and a small shake, "−N" on the HP stat |
| Heal outside a fight | only at the Candle | heal shimmer (not doubled at the Candle) |
| Spend gold (other than buying, e.g. event costs) | silent | a few coins leave; the gold number counts down |
| Arrive at the Merchant | music change only | a **shop door bell** |
| Arrive at the Candle | music change only | **campfire** crackle |
| Arrive at a forge | music change only | anvil |
| Arrive at an event | music change only | a strange harp **glissando** |
| Choose an event option | a click | a page-turn **choice** sound, then whatever it gave you |
| Choose a Fate or a Patron | silent | a deep **fate** bell |
| Gain an Omen outside the shop | silent | the Omen bells; the new Omen pops into the belt |
| Arrive on a map card | the card flip | the flip plus a small landing bounce |
| Reroll the Deal | a click | a shuffle |
| Skip a card | a click | a whoosh |
| Pick a reward card / class | silent | the select tick |
| Tap a locked class | a click | a locked rattle |
| Keep a card / mint a Legacy at run end | sparks only | card into deck / hone |
| Discard an Omen | a click | torn and burned |

Moments that already had a sound and a reaction (drawing, Negates, deaths, the boss gong, turn chimes, win/lose stingers, purchases, rests, packs) are unchanged.

## How it works

- **29 new synthesized effects** in `src/ui/audio.ts` (67 in all), still Web Audio only: no files. `audio.coins(n)` plays the coin shower. `audio.playedWithin(name, ms)` lets a follow-up skip a sound an action already made.
- **Combat**: `eventSfx()` in `main.ts` picks the sound for each `UiEvent` (up to 6 per batch, was 4). It looks at the event before and after to tell "Block soaked it" from "Block broke". Debuff vs buff comes from the status's `debuff` flag.
- **Everything outside a fight**: `src/ui/feedback.ts` runs after each render, compares the run to the previous render (gold, HP, max HP, deck size and contents, upgrades, sigils, keepsakes, Omens, Fate, screen) and gives each change its sound and HUD motion. This means every event, shrine, Patron, treasure and reward is covered, including ones added later, without wiring each button. It is quiet during fights (they narrate themselves) and in duels and riddles.
- **Settings respected**: all sounds go through the effects bus (Effects on/off and volume); all motion is skipped with Reduce motion. Phone mix: new effects peak at or below the existing hit/bighit levels; only bighit and the big stingers duck the music.
- **Size**: about +9 KB to the single-file build.
- A test hook: setting `window.__sfxLog = []` records every effect name requested (used by the headless check below).

## How it was checked

- `npm test` (103 rules + 6 story) and `npm run build` pass.
- A headless Chromium bot played a run from the title through fights, rewards, the map, shops, events and the Candle, logging every effect per click. Every step that changed something produced at least one effect, and the new ones (slam, hurt, blocked, shieldBreak, debuff, buff, swing, gold, item, cardGain, chest, shopBell, campfire, event, choice…) all fired. No page errors.

## Not done / next

- Real ears on a real phone: tastes differ. Levels are per-effect `vol` numbers in `audio.ts` plus `SFX_GAIN`.
- Per-element hit sounds (fire crackle, frost chime) and per-class card-play sounds would be the next layer.
