/**
 * Dawnwick v0.18 "Tell the Dealer": builds the playtest feedback Google Form in YOUR Google account.
 *
 * 1. Open https://script.google.com, click "New project", delete what is there and paste this whole file.
 * 2. Click Run (function: createDawnwickForm). Google asks you to authorize it: allow Forms, Sheets and Drive.
 * 3. Open "Execution log". It prints the form link, the responses Sheet and a `form: {...}` block.
 * 4. Paste that block over `form: {...}` in riposte/src/feedback/config.ts (or send it to Claude), rebuild, ship.
 *
 * You own the form and the Sheet; responses land in the Sheet, one row per note. Keep the question texts
 * in step with QUESTIONS in src/feedback/config.ts (a test checks they match).
 */
var KINDS = ['Bug', 'Confusing', 'Too hard', 'Too easy', 'Idea', 'Loved it'];
var CHAIN = ['Yes, clearly', 'Mostly', 'Not really', "What's the Answer Chain?"];
var PAY = ['Yes', 'Maybe later', "No, I'd play free with ads", "No, I wouldn't keep playing"];
var Q = {
  kind: 'What kind of note is this?',
  what: 'What happened? (bug, idea, anything)',
  stuck: 'Where did you get stuck or confused?',
  died: 'Where did you die, and did it feel fair?',
  chain: 'Did you understand the Answer Chain?',
  pay: 'Would you pay $4.99 for the ad-free Last Word Edition?',
  contact: 'How can we reach you? (optional: Discord, Reddit or email)',
  report: 'Run report (filled in by the game)',
  version: 'Game version',
};

function createDawnwickForm() {
  var form = FormApp.create('Dawnwick playtest feedback');
  form.setDescription('Two minutes, five questions. Thank you for playing Dawnwick: The Last Word. ' +
    'If you send this from inside the game, the run report at the bottom is filled in for you; from a browser, leave it empty.');
  form.setCollectEmail(false);
  form.setAllowResponseEdits(false);
  form.setConfirmationMessage('The Dealer heard you. Thank you!');

  var it = {};
  it.kind = form.addMultipleChoiceItem().setTitle(Q.kind).setChoiceValues(KINDS);
  it.what = form.addParagraphTextItem().setTitle(Q.what);
  it.stuck = form.addParagraphTextItem().setTitle(Q.stuck);
  it.died = form.addParagraphTextItem().setTitle(Q.died);
  it.chain = form.addMultipleChoiceItem().setTitle(Q.chain).setChoiceValues(CHAIN);
  it.pay = form.addMultipleChoiceItem().setTitle(Q.pay).setChoiceValues(PAY);
  it.contact = form.addTextItem().setTitle(Q.contact);
  it.report = form.addParagraphTextItem().setTitle(Q.report);
  it.version = form.addTextItem().setTitle(Q.version);

  var sheet = SpreadsheetApp.create('Dawnwick playtest responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  // Google's prefill link is the only place the public `entry.N` ids show up: fill each field with a marker, read them back.
  var marks = { kind: KINDS[0], chain: CHAIN[0], pay: PAY[0] };
  var resp = form.createResponse();
  Object.keys(it).forEach(function (k) {
    var item = it[k];
    var type = item.getType();
    var value = marks[k] || ('MARK_' + k);
    var r = type === FormApp.ItemType.MULTIPLE_CHOICE ? item.asMultipleChoiceItem().createResponse(value)
      : type === FormApp.ItemType.PARAGRAPH_TEXT ? item.asParagraphTextItem().createResponse(value)
      : item.asTextItem().createResponse(value);
    resp.withItemResponse(r);
  });
  var url = resp.toPrefilledUrl();
  var entries = {};
  url.split('?')[1].split('&').forEach(function (pair) {
    var kv = pair.split('=');
    if (kv[0].indexOf('entry.') !== 0) return;
    var v = decodeURIComponent(kv[1].replace(/\+/g, ' '));
    Object.keys(it).forEach(function (k) { if (v === (marks[k] || ('MARK_' + k))) entries[k] = kv[0]; });
  });
  var id = /\/d\/e\/([^/]+)\//.exec(form.getPublishedUrl())[1];

  Logger.log('Tester form (share this link): ' + form.getPublishedUrl());
  Logger.log('Edit the form: ' + form.getEditUrl());
  Logger.log('Responses Sheet: ' + sheet.getUrl());
  Logger.log('Paste into riposte/src/feedback/config.ts:\n  form: ' + JSON.stringify({ id: id, entries: entries }, null, 2).replace(/\n/g, '\n  ') + ' as FormConfig,');
}
