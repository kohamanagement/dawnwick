# Story ("The Last Word") merge notes

From the "Write a storyline for Riposte" thread, for the v0.11 merge. Built and tested against the v0.10 tree in the project files.

## New files (copy as-is)

- `src/data/story.ts`: all story text (prologue, acts, bosses, classes, endings, Story-book chapters)
- `src/data/story-events.ts`: 7 events + 3 roadside beats
- `src/ui/story.ts`: scene player, run watcher, results-screen ending, Story book
- `src/ui/story.css`: imported by `src/ui/story.ts`, so style.css is untouched
- `sim/story-tests.ts`: 6 checks (every boss/class/patron has lines, beats ≤160 chars, events registered)
- `docs/13-STORY.md`: lore bible

## Hunks in shared files (6 lines total)

1. `src/data/events.ts`
   - after `import { EVENTS6 } from './events6';` add
     `import { STORY_EVENTS } from './story-events';`
   - change `EVENTS.push(...EVENTS6);` to `EVENTS.push(...EVENTS6, ...STORY_EVENTS);`
2. `src/main.ts`
   - after `import * as ev from './ui/events';` add `import * as story from './ui/story';`
   - first line inside `function render(): void {` (before `let html = '';`): `story.watch();`
   - in `const actions`, after `...hub.hubActions,` add `...story.storyActions,`
   - in `viewEnd()`, right after the `<p>… reached … floor ${r.floor}</p>` line, add the line `${story.endingHtml(r)}`
3. `src/ui/hub.ts`
   - add `import * as story from './story';` with the imports
   - in `viewTitle()`, right after the Daily Duel button line, add:
     `<button class="btn storybtn" data-a="storyBook">📖 The Story So Far${story.unreadCount() ? '<i class="dot"></i>' : ''}<small>${story.bookProgress()}</small></button>`

## Things to double-check after merging

- **Balance:** the 10 story events join the event pool, which shifts RNG for the bot. Their rewards sit on the scale of the existing events. See the sim comparison at the bottom.
- **Tests:** `npx tsx sim/story-tests.ts`. You could also add `import './story-tests';` to the end of sim/tests.ts, or chain it in the `test` script.
- **New bosses or classes in v0.11:** if you add any, `sim/story-tests.ts` fails until they get a `BOSSES` / `CLASSES` entry in src/data/story.ts. Tell me and I'll write them.
- **Welcome popup:** the v0.11 "what's new" text could mention the storyline: "📖 A story: carry the last ember of the sun down to the Last Table. New scenes, endings for all 13 classes, and a Story book on the title screen."
- Story state lives in its own localStorage key `riposte.story.v1`, so the profile format and migrate() are untouched.
- Scenes use `app.modal` with a no-op `app.confirmFn` (this hides the generic Close button). They only open when no modal, picker, pack, chain overlay, counter prompt or busy animation is up.

## Sim comparison (A0, 200 runs, same seeds)

(filled in below)
| Class | Without story events | With story events |
|---|---|---|
| Ashen Duelist | 16% win, 47% reach Act 3 | 11% win, 52% reach Act 3 |
| Thorn Warden | 26% win, 68% reach Act 3 | 26% win, 68% reach Act 3 |

Both are inside the 10–30% band. The Duelist gap is about 2 standard errors at 200 runs, so it could be noise from the RNG shift, but it is worth a look in your final balance pass. If it holds up, the likely lever is *An Empty Chair* (Act 3: rare card + Regret).

The shared files above are already applied in the project tree (it was still v0.10 when I wrote them), so a plain diff against your copy shows exactly these hunks.
