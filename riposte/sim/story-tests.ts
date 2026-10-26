// v0.11 storyline checks: every boss and class has its lines, beats stay phone-sized, story events are well formed.
// Run with `npx tsx sim/story-tests.ts` (also imported by sim/tests.ts if present there).
import assert from 'node:assert/strict';
import { ENCOUNTERS, ALT_ENCOUNTERS, WANDERING_BOSSES, WANDERING_BOSSES_2, NIGHT_BOSSES, EPILOGUE, ENEMIES } from '../src/data/enemies';
import { WILD_ENCOUNTERS } from '../src/data/enemies6';
import { CHAR_LIST } from '../src/data/characters';
import { PATRONS } from '../src/data/patrons';
import { EVENT_MAP } from '../src/data/events';
import { STORY_EVENTS } from '../src/data/story-events';
import * as S from '../src/data/story';

let n = 0;
const t = (name: string, fn: () => void) => { fn(); n++; console.log(`ok  ${name}`); };

t('story: every boss (acts, versions, wanderers, nights, the Reflection) has its own scene', () => {
  const ids = new Set<string>();
  for (const tab of [ENCOUNTERS, ALT_ENCOUNTERS, WILD_ENCOUNTERS]) for (const a of [1, 2, 3]) ids.add(tab[a].boss.enemies[0]);
  for (const tab of [WANDERING_BOSSES, WANDERING_BOSSES_2]) for (const a of [1, 2, 3]) ids.add(tab[a].enemies[0]);
  for (const e of NIGHT_BOSSES) ids.add(e.enemies[0]);
  ids.add(EPILOGUE.enemies[0]);
  for (const id of ids) {
    assert.ok(ENEMIES[id], `unknown boss ${id}`);
    const s = S.BOSSES[id];
    assert.ok(s && s.intro.length && s.down.length && s.half && s.win, `boss ${id} has no story`);
  }
  for (const id of Object.keys(S.WANDERER_DEALER)) assert.ok(ids.has(id), `wanderer line for unknown boss ${id}`);
});

t('story: every class has a full arc, and rivals name real bosses', () => {
  for (const c of CHAR_LIST) {
    const s = S.CLASSES[c.id];
    assert.ok(s, `class ${c.id} has no story`);
    assert.equal(s.acts.length, 3);
    assert.ok(s.motive.length && s.win.length >= 2 && s.trueEnd && s.fall && s.mirror && s.retort && s.ask && s.who, c.id);
    for (const b of Object.keys(s.rivals)) assert.ok(S.BOSSES[b], `${c.id} rival ${b} is not a boss`);
  }
});

t('story: every act version has a Dealer intro, every Patron a Wick aside', () => {
  for (const a of [1, 2, 3]) assert.equal(S.ACT_DEALER[a].length, 3, `act ${a}`);
  for (const p of PATRONS) assert.ok(S.PATRON_WICK[p.id], `patron ${p.id}`);
});

t('story: beats are phone-sized (one or two lines) and use known speakers', () => {
  const beats: S.Beat[] = [
    ...S.PROLOGUE, ...S.REENTRY.flatMap((x) => x.beats), ...Object.values(S.ACT_DEALER).flat(2), ...Object.values(S.ACT_WICK).flat(),
    ...Object.values(S.WANDERER_DEALER), S.NEMESIS_DEALER, ...S.NIGHT_INTRO.flat(), S.NIGHT_BOSS, ...S.ASK_OPEN, ...S.ASK_OPEN_DEALER, ...S.ASK_STING,
    ...S.TRUE_END, ...S.MIRROR_LOST, ...S.NIGHT_END.flatMap((x) => x.beats), S.FALL_NEMESIS,
    ...Object.values(S.BOSSES).flatMap((x) => [...x.intro, ...x.down]), ...Object.values(S.CLASSES).flatMap((x) => x.win),
  ];
  for (const b of beats) {
    assert.ok(b.who === 'class' || b.who === 'boss' || S.SPEAKERS[b.who], `unknown speaker ${b.who}`);
    assert.ok(b.text.length <= 160, `beat too long (${b.text.length}): ${b.text}`);
  }
  for (const c of Object.values(S.CLASSES)) for (const l of [...c.motive, ...c.acts, c.retort, c.mirror, c.fall, ...Object.values(c.rivals)]) assert.ok(l.length <= 160, l);
});

t('story: the Story book has 12 chapters with unique ids', () => {
  assert.equal(S.CHAPTERS.length, 12);
  assert.equal(new Set(S.CHAPTERS.map((c) => c.id)).size, 12);
});

t('story: story events are registered and well formed', () => {
  for (const e of STORY_EVENTS) {
    assert.equal(EVENT_MAP[e.id], e, `${e.id} not in EVENT_MAP`);
    assert.ok(e.options.length >= 2, e.id);
    if (e.textFn) for (const c of CHAR_LIST) assert.ok(!e.textFn({ character: c.id } as never).includes('undefined'), `${e.id} text for ${c.id}`);
  }
});

console.log(`\n${n} story tests passed`);
