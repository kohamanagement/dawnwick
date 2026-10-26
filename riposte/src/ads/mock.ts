// v0.17 The web stand-in for ads and the purchase, so the browser build stays fully playable. The "ad" is a
// 5-second card from the Dealer with a countdown; the purchase always succeeds and is remembered on this device.
import type { AdResult, AdsAdapter, StoreAdapter } from './adapter';
import { AD_RULES, EDITION } from './policy';

const LINES = [
  'A word from the house, while the cards are gathered.',
  'Even the Last Table pays its rent.',
  'The Dealer shuffles. Someone has to pay for the candles.',
  'Intermission. Stretch your fingers. Count your Counters.',
];

function overlay(kind: 'interstitial' | 'rewarded', placement: string): Promise<AdResult> {
  return new Promise((resolve) => {
    const secs = AD_RULES.mockSeconds;
    const el = document.createElement('div');
    el.className = `mockad ${kind}`;
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', kind === 'rewarded' ? 'Rewarded ad' : 'Ad');
    el.innerHTML = `<div class="mockad-card">
      <div class="mockad-kicker">${kind === 'rewarded' ? 'The Dealer\'s favor' : 'Intermission'}</div>
      <div class="mockad-candle" aria-hidden="true"><i></i></div>
      <p class="mockad-line">${LINES[Math.floor(Math.random() * LINES.length)]}</p>
      <div class="mockad-slot"><b>Your ad here</b><small>Web stand-in: the app shows a real ad in this spot.${placement ? ` Placement: ${placement}.` : ''}</small></div>
      <div class="mockad-bar"><i style="animation-duration:${secs}s"></i></div>
      <div class="mockad-row">
        <button class="btn ghost small" data-mock="skip">${kind === 'rewarded' ? 'Skip (no favor)' : `Skip in ${secs}`}</button>
        <button class="btn primary small" data-mock="done" disabled>${kind === 'rewarded' ? `Collect in ${secs}` : 'Continue'}</button>
      </div>
    </div>`;
    document.body.appendChild(el);
    const skip = el.querySelector<HTMLButtonElement>('[data-mock="skip"]')!;
    const done = el.querySelector<HTMLButtonElement>('[data-mock="done"]')!;
    if (kind === 'interstitial') skip.disabled = true;
    let left = secs;
    const tick = window.setInterval(() => {
      left--;
      if (left > 0) {
        if (kind === 'rewarded') done.textContent = `Collect in ${left}`; else skip.textContent = `Skip in ${left}`;
        return;
      }
      window.clearInterval(tick);
      done.disabled = false;
      done.textContent = kind === 'rewarded' ? 'Collect the favor' : 'Continue';
      if (kind === 'interstitial') { skip.disabled = false; skip.textContent = 'Skip'; }
      done.focus();
    }, 1000);
    const finish = (r: AdResult) => { window.clearInterval(tick); el.remove(); resolve(r); };
    skip.addEventListener('click', () => finish(kind === 'rewarded' ? 'closed' : 'closed'));
    done.addEventListener('click', () => finish(kind === 'rewarded' ? 'rewarded' : 'closed'));
  });
}

export const mockAds: AdsAdapter = {
  name: 'web stand-in',
  real: false,
  init: async () => ({ personalized: false, canRequest: true, privacyOptions: false }),
  showInterstitial: () => overlay('interstitial', ''),
  showRewarded: (placement) => overlay('rewarded', placement),
  privacyOptions: async () => {},
};

export const mockStore: StoreAdapter = {
  name: 'web stand-in',
  real: false,
  init: async () => {},
  price: async () => EDITION.price,
  // A pretend purchase: no money moves. It is remembered in this browser's save.
  buy: async () => { await new Promise((r) => setTimeout(r, 600)); return 'owned'; },
  restore: async () => 'none',
  entitled: async () => null,
};
