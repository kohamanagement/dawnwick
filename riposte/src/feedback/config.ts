// v0.18 "Tell the Dealer": where playtest feedback goes. No server of our own: a Google Form that Mike owns.
// tools/feedback/create-form.gs builds the form (and its response Sheet) in Mike's Google account and prints
// the `form` block below, ready to paste. Until it is filled in, the in-game form still works: testers copy or
// share the run report instead of sending it. See docs/24-PLAYTESTING.md.

export interface FormConfig {
  /** The form's public id: the part between /d/e/ and /viewform in its link. Empty = not set up yet. */
  id: string;
  /** Google's `entry.123456` field names for each question. */
  entries: Record<FieldKey, string>;
}

export type FieldKey = 'kind' | 'what' | 'stuck' | 'died' | 'chain' | 'pay' | 'contact' | 'report' | 'version';

export const FEEDBACK = {
  /**
   * Beta builds show the "Tell the Dealer" button by default. Set false for store releases: the button is then
   * hidden unless a player turns it on in Settings (the Settings switch works either way).
   */
  beta: true,
  form: {
    id: '',
    entries: { kind: '', what: '', stuck: '', died: '', chain: '', pay: '', contact: '', report: '', version: '' },
  } as FormConfig,
};

/** The five playtest questions (also in docs/24-PLAYTESTING.md and the Google Form). */
export const KINDS = ['Bug', 'Confusing', 'Too hard', 'Too easy', 'Idea', 'Loved it'] as const;
export const CHAIN_ANSWERS = ['Yes, clearly', 'Mostly', 'Not really', "What's the Answer Chain?"] as const;
export const PAY_ANSWERS = ['Yes', 'Maybe later', "No, I'd play free with ads", "No, I wouldn't keep playing"] as const;
export const QUESTIONS: Record<FieldKey, string> = {
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

export const formReady = (f: FormConfig = FEEDBACK.form): boolean => !!f.id && !!f.entries.what && !!f.entries.report;
