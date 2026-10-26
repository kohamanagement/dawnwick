// v0.18 Tell the Dealer: the run report and the Google Form plumbing. `npm test`.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ActionLog, REPORT_LINES, buildReport, formBody, noteText, prefillUrl, type Answers, type RunContext } from '../src/feedback/report';
import { FEEDBACK, QUESTIONS, formReady, type FormConfig } from '../src/feedback/config';

let passed = 0;
function test(name: string, fn: () => void): void {
  try { fn(); passed++; console.log(`ok  ${name}`); } catch (e) { console.error(`FAIL ${name}`); throw e; }
}

const ctx: RunContext = {
  version: '0.18.0', where: 'end', platform: 'ios', device: 'iPhone 18.1 · Safari', screen: '393x852 @3x', runs: 7, wins: 2,
  run: { character: 'Duelist', stakes: 1, act: 2, floor: 9, seed: 4242, hp: '0/72', gold: 31, deck: 18, keepsakes: 4, screen: 'combat (boss fight, turn 6)', mode: 'run', won: false, fellTo: 'The Antlered King', score: 512 },
};
const answers: Answers = { kind: 'Too hard', what: 'Boss trap chain felt unfair', stuck: 'Act 2 map', died: 'Antlered King', chain: 'Mostly', pay: 'Maybe later', contact: '' };
const form: FormConfig = { id: '1FAIpQLSfake', entries: { kind: 'entry.1', what: 'entry.2', stuck: 'entry.3', died: 'entry.4', chain: 'entry.5', pay: 'entry.6', contact: 'entry.7', report: 'entry.8', version: 'entry.9' } };

test('the action log keeps the last 40 lines, folds repeats and reports the last 20', () => {
  const log = new ActionLog();
  for (let i = 0; i < 60; i++) log.push('tap', `travel ${i}`, i * 1000);
  log.push('tap', 'travel 59', 99_000);
  assert.equal(log.lines.length, 40);
  assert.equal(log.recent().length, REPORT_LINES);
  assert.equal(log.recent().at(-1)!.text, 'travel 59');
  log.push('error', 'boom');
  assert.equal(log.errors().length, 1);
});

test('the run report names version, class, act, floor, seed, deaths, device and recent actions', () => {
  const log = new ActionLog();
  log.push('chain', 'foe:Snare > you:Riposte (negated)', 1000);
  log.push('event', 'you died', 2000);
  const r = buildReport(ctx, log.recent(), 5000);
  for (const s of ['v0.18.0', 'Duelist', 'Act 2, floor 9', 'seed 4242', '5 deaths', 'iPhone', '393x852', 'died to The Antlered King', 'Last 2 actions', 'foe:Snare > you:Riposte', '-3s event: you died'])
    assert.ok(r.includes(s), `report is missing "${s}":\n${r}`);
  assert.ok(buildReport({ ...ctx, run: null }, []).includes('Run: none in progress'));
  assert.ok(buildReport({ ...ctx, run: { ...ctx.run!, abandoned: true } }, []).includes('Result: abandoned'));
});

test('the form post and the prefilled link carry every answer under its Google entry id', () => {
  assert.equal(formReady(form), true);
  assert.equal(formReady(), formReady(FEEDBACK.form));
  const body = formBody(answers, 'REPORT', '0.18.0', form);
  assert.equal(body.get('entry.1'), 'Too hard');
  assert.equal(body.get('entry.8'), 'REPORT');
  assert.equal(body.get('entry.9'), '0.18.0');
  assert.equal(body.has('entry.7'), false, 'empty answers are left out');
  const url = prefillUrl(answers, 'x'.repeat(5000), '0.18.0', form);
  assert.ok(url.startsWith('https://docs.google.com/forms/d/e/1FAIpQLSfake/viewform?usp=pp_url'));
  assert.ok(url.length < 4000, 'the long report is cut so the link opens on phones');
  assert.equal(prefillUrl(answers, 'r', '0.18.0', { id: '', entries: form.entries }), '');
});

test('the copied note puts the answers above the report', () => {
  const t = noteText(answers, 'REPORT');
  assert.ok(t.startsWith('[Too hard]\nBoss trap chain felt unfair'));
  assert.ok(t.includes('Answer Chain: Mostly') && t.endsWith('REPORT'));
  assert.equal(noteText({ kind: '', what: '', stuck: '', died: '', chain: '', pay: '', contact: '' }, 'R'), 'R');
});

test('the Google Form script, the playtest doc and the game ask the same questions', () => {
  const gs = readFileSync('tools/feedback/create-form.gs', 'utf8');
  const doc = readFileSync('docs/24-PLAYTESTING.md', 'utf8');
  for (const [k, q] of Object.entries(QUESTIONS)) {
    assert.ok(gs.includes(q), `create-form.gs is missing ${k}: ${q}`);
    if (k !== 'report' && k !== 'version' && k !== 'kind') assert.ok(doc.includes(q), `24-PLAYTESTING.md is missing ${k}: ${q}`);
  }
});

console.log(`\n${passed} feedback tests passed`);
