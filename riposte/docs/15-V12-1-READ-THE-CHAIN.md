# v0.12.1 "Read the Chain": a readable Counter window

**Date:** 2026-10-26 · **Asked by:** Mike ("when you counter the enemy's card, you can't click on it or know what they did … slowing it down or letting people decide whether to counter would help").

## The problem

- The Counter window only named the enemy link ("Bramble Beetle's Spike Shell is about to resolve"). It did not show the card, its text, its target or its damage, so you were deciding blind.
- Tapping a Counter card played it at once. There was no separate "yes, counter" step.
- After a chain resolved, the recap listed only names and vanished after about 1.5 seconds (0.9 s + 0.22 s a link). Tapping it closed it. You could not read what an enemy trap or move had just done.

## What changed

**Counter window ("Chain paused")**
- Header says the chain is paused and nothing happens until you choose. There is no timer.
- The link about to resolve is shown **face-up**: the enemy trap card with its full rules text, or, for an enemy move, a move card with the enemy's icon and its intent chips.
- Beside it, in words: what it does ("When attacked: gain 6 Block", "Deal 11 damage"), who it targets ("Jar Mimic → You"), which link it answers, and for attacks on you how much gets through your Block ("11 damage · 4 Block · 7 gets through (you have 52 HP)"), coloured green / orange / red for blocked / hurts / lethal.
- Every link in the chain strip is a button. Tap one to read that link the same way (your own Strike, a Rebuttal, an earlier trap).
- Counters in hand: tap to choose one (a single legal Counter is preselected). Then two explicit buttons: **Let it resolve** and **↯ Counter with <card>**. Buttons are 44 px tall for thumbs.
- The window now sits over the hand with a dimmed table behind it and scrolls if it is taller than the screen.

**Chain recap (after any chain of 2+ links)**
- Each link shows its rules text (two lines) under its name, with Negated links struck through.
- It stays up longer: 1.4 s + 0.55 s a link (a 3-link chain: ~3 s, was ~1.5 s), times the game-speed setting, with a gold timer bar.
- Tap a link to open it face-up with its full text and target. **While a link is open the fight waits** (the enemy turn does not continue). Tap the recap again to carry on.

**Settings / How to play:** the Counters text explains the pause and the recap.

## Code

- `src/engine/types.ts`: new `ChainLinkView` (name, owner, negated, mine, counter, plus text, card, intents, target, who). `UiEvent.links` uses it.
- `src/engine/combat.ts`: `Combat.linkView(chain, i, full)` describes a link (card text via `cardText`, enemy moves via `intents()` and the new `intentWords()`, Rebuttal text, target). `CounterWindow.chain` always has full detail. The recap event gets detail only when `Combat.detail` is on, which the UI sets in `combat()`; sims leave it off so their speed and RNG are unchanged (the preview runs in record mode). Recap links are described before the chain resolves, so they show what each link was about to do.
- `src/main.ts`: `linkFace()`, `linkInfo()`, the new `counterPrompt()`, the recap view, actions `caFocus`, `caSel`, `chainLink`; `showEvents()` waits while `app.chainPin` is set.
- `src/ui/state.ts`: `counterAsk.focus/sel`, `chainPin`, `chainMs`.
- `src/style.css`: Counter window, move card, recap text and timer.

## Tests

96 rules tests + 6 story tests pass. New: the counter window carries the trap card and its text and target; an enemy-move window carries the attack preview, "Deal N damage" and target You; the recap event has no detail unless `detail` is on, and with it carries the trap card.

Checked by hand in a 390×844 phone viewport (Playwright): a Strike answered by Spike Shell with Objection in hand, tapping link 1, countering, opening a recap link and waiting 6 s (still paused), and an enemy Chomp on the enemy turn with Contempt of Court in hand.

## Not changed

- Balance: no card, enemy or sim numbers changed. "Automatic" and "Never" counter settings behave as before.
- Face-down enemy traps are still hidden until they fire (that is the hidden-information game); the enemy info panel still lists the traps an enemy can set.

---

# v0.13.1: no timers anywhere in the chain

**Date:** 2026-10-26 · **Asked by:** Mike ("when the enemy counters, there shouldn't be a timer… the game stops and pauses until a decision is made").

## What was still timed

1. When an enemy trap, Counter or Rebuttal answered your card and you held no Counter that could answer back (wrong kind or not enough energy/Flux), no window opened: the chain resolved at once.
2. The chain recap closed itself after 1.4 s + 0.55 s a link.

## What changed

- **The game stops every time the enemy answers.** In the default Ask mode, any chain that would end on an enemy link of 2+ links (a trap springing on your attack, an enemy Counter on your Reaction, a Rebuttal on your Counter, any later answer) opens the window, even when you cannot answer back. The header reads "The enemy answers: Jar Mimic answers your Strike with Spike Shell". If nothing in hand can answer, it says so and why ("Contempt of Court: only answers attacks", "costs 2, you have 1 Flux"), and the only button is **Let it resolve**. A plain enemy move that nobody answered (chain of 1) only stops when you have a Counter for it, as before.
- **The recap has no timer in Ask mode.** It stays up, dims the table and hand behind it, and waits for **Continue** (or a tap outside). Tap a link to read it. With Counters set to Automatic or Never in Settings, the old self-closing recap is kept for players who chose speed.
- Enemy-turn pacing pauses between separate enemy actions are unchanged; they are not decisions.

## Code

- `combat.ts`: `counterWindow()` also stops in Ask mode when `!opts.length && chain.length >= 2 && last is an un-negated enemy link`; the window carries `blocked` (from the new `counterBlocked()`). Replays consume these decisions the same way, so rewind/replay stays exact. Sims and the bot use Automatic and never see it.
- `main.ts`: the counter prompt handles an empty option list; `chainWaits()` makes the recap wait for a tap in Ask mode, with a Continue button and a backdrop.

## Tests

97 rules + 6 story pass. New: the game stops on a trap when your only Counter answers attacks (and says why), letting it resolve finishes the action, a plain enemy move with nothing to answer does not stop, Automatic never stops.
