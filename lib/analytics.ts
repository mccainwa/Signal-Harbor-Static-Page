/**
 * Centralized GA4 configuration. The only approved analytics is Google
 * Analytics 4 with this Measurement ID: no Tag Manager, no advertising
 * features, no remarketing, no Google Signals.
 *
 * Loading is gated to the production hostname so local development,
 * automated tests, and evidence capture never send data. A test can opt in
 * explicitly by visiting any page with ?ga_test=1 (persisted for the tab
 * session), which is how the automated event checks run; those checks also
 * block the Google network calls and assert on the dataLayer, so nothing
 * pollutes the production property.
 */
export const GA_ID = 'G-24V8BNMLFZ';
export const PROD_HOSTNAME = 'signalharborai.com';

export function analyticsEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (new URLSearchParams(window.location.search).has('ga_test')) {
      window.sessionStorage.setItem('sh_ga_test', '1');
    }
    if (window.sessionStorage.getItem('sh_ga_test') === '1') return true;
  } catch {}
  const host = window.location.hostname;
  return host === PROD_HOSTNAME || host === `www.${PROD_HOSTNAME}`;
}

/**
 * Fire a GA4 event. Safe everywhere: no-ops when gtag has not loaded
 * (analytics disabled, ad blocker, or network failure), so analytics can
 * never break the site. Parameters must stay non-personal: paths, slugs,
 * CTA zones, and bare outbound domains only.
 */
export function track(name: string, params?: Record<string, string>) {
  try {
    const g = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof g === 'function') g('event', name, params ?? {});
  } catch {}
}
