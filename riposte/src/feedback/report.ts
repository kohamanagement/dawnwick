// v0.18 "Tell the Dealer": the run report a tester sends. Pure functions (no DOM), so `npm test` covers them.
import { FEEDBACK, formReady, type FieldKey, type FormConfig } from './config';

/** One line of the recent-actions log: what the player tapped, or a chain that resolved. */
export interface LogLine { t: number; kind: 'tap' | 'chain' | 'event' | 'screen' | 'error'; text: string }

const LOG_MAX = 40;
export const REPORT_LINES = 20;

export class ActionLog {
  lines: LogLine[] = [];
  push(kind: LogLine['kind'], text: string, t = Date.now()): void {
    const last = this.lines.at(-1);
    // A screen that re-renders, or a button tapped twice, is one line.
    if (last && last.kind === kind && last.text === text) { last.t = t; return; }
    this.lines.push({ t, kind, text: text.slice(0, 160) });
    if (this.lines.length > LOG_MAX) this.lines.splice(0, this.lines.length - LOG_MAX);
  }
  recent(n = REPORT_LINES): LogLine[] { return this.lines.slice(-n); }
  errors(): LogLine[] { return this.lines.filter((l) => l.kind === 'error'); }
}

/** Everything the form prefills. Built by the UI from the profile and the current (or last) run. */
export interface RunContext {
  version: string;
  where: 'title' | 'menu' | 'end' | 'settings';
  platform: string;
  device: string;
  screen: string;
  runs: number;
  wins: number;
  run: null | {
    character: string; stakes: number; act: number; floor: number; seed: number | string; hp: string; gold: number;
    deck: number; keepsakes: number; screen: string; mode: string; won?: boolean; abandoned?: boolean; fellTo?: string; score?: number;
  };
}

const ago = (t: number, now: number): string => { const s = Math.max(0, Math.round((now - t) / 1000)); return s < 60 ? `${s}s` : `${Math.round(s / 60)}m`; };

/** The plain-text report: what "Copy run report" puts on the clipboard and what the form's report field holds. */
export function buildReport(ctx: RunContext, log: LogLine[], now = Date.now()): string {
  const r = ctx.run;
  const out = [
    `Dawnwick v${ctx.version} · sent from ${ctx.where} · ${new Date(now).toISOString().slice(0, 16).replace('T', ' ')} UTC`,
    `Device: ${ctx.platform} · ${ctx.device} · ${ctx.screen}`,
    `Profile: ${ctx.runs} runs, ${ctx.wins} wins, ${Math.max(0, ctx.runs - ctx.wins)} deaths`,
  ];
  if (r) {
    out.push(
      `Run: ${r.character} · ${r.mode} · Stakes ${r.stakes} · Act ${r.act}, floor ${r.floor} · seed ${r.seed}`,
      `State: ${r.screen} · HP ${r.hp} · ${r.gold} gold · ${r.deck} cards · ${r.keepsakes} keepsakes${r.score !== undefined ? ` · score ${r.score}` : ''}`,
    );
    if (r.won !== undefined) out.push(`Result: ${r.won ? 'won' : r.abandoned ? 'abandoned' : `died${r.fellTo ? ` to ${r.fellTo}` : ''}`}`);
  } else out.push('Run: none in progress');
  if (log.length) {
    out.push(`Last ${log.length} actions (oldest first):`);
    for (const l of log) out.push(`  -${ago(l.t, now)} ${l.kind}: ${l.text}`);
  }
  return out.join('\n');
}

export interface Answers { kind: string; what: string; stuck: string; died: string; chain: string; pay: string; contact: string }

const fields = (a: Answers, report: string, version: string): Record<FieldKey, string> => ({ ...a, report, version });

/** The body for a POST to the Google Form's formResponse endpoint (only fields the form has). */
export function formBody(a: Answers, report: string, version: string, f: FormConfig = FEEDBACK.form): URLSearchParams {
  const body = new URLSearchParams();
  const v = fields(a, report, version);
  for (const k of Object.keys(f.entries) as FieldKey[]) if (f.entries[k] && v[k]) body.append(f.entries[k], v[k]);
  return body;
}

export const formPostUrl = (f: FormConfig = FEEDBACK.form): string => `https://docs.google.com/forms/d/e/${f.id}/formResponse`;

/** A prefilled link to the form, for when a POST is blocked: the tester lands on the form and taps Submit. */
export function prefillUrl(a: Answers, report: string, version: string, f: FormConfig = FEEDBACK.form): string {
  if (!formReady(f)) return '';
  const v = fields(a, report.length > 1800 ? `${report.slice(0, 1800)}\n…(cut)` : report, version);
  const q = new URLSearchParams({ usp: 'pp_url' });
  for (const k of Object.keys(f.entries) as FieldKey[]) if (f.entries[k] && v[k]) q.append(f.entries[k], v[k]);
  return `https://docs.google.com/forms/d/e/${f.id}/viewform?${q}`;
}

/** The whole note as text, for Copy and Share when no form is set up (or the tester prefers to paste it). */
export function noteText(a: Answers, report: string): string {
  const parts = [
    a.kind ? `[${a.kind}]` : '', a.what,
    a.stuck ? `Stuck: ${a.stuck}` : '', a.died ? `Died: ${a.died}` : '',
    a.chain ? `Answer Chain: ${a.chain}` : '', a.pay ? `Would pay $4.99: ${a.pay}` : '', a.contact ? `Contact: ${a.contact}` : '',
  ].filter(Boolean);
  return `${parts.join('\n')}${parts.length ? '\n\n' : ''}${report}`;
}
