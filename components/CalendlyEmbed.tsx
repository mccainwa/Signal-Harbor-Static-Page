'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { SITE } from '@/lib/site';

const SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';

/**
 * Calendly inline embed, encapsulated so the external script loads exactly
 * once and ONLY on the page that renders this component (/book/). No badge,
 * no popup, no API credentials, no redirect configuration.
 *
 * The container height is reserved up front so the loading state, the
 * embed, and the failure message never shift the page. If the iframe has
 * not appeared after a grace period (script blocked, network failure), a
 * visible message points at the direct Calendly fallback link, which is
 * also always present below the widget and inside <noscript>.
 */
export default function CalendlyEmbed() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Watch for the iframe Calendly injects into the widget div.
    const check = () => hostRef.current?.querySelector('iframe') != null;
    const interval = window.setInterval(() => {
      if (check()) {
        setLoaded(true);
        window.clearInterval(interval);
      }
    }, 300);
    const timeout = window.setTimeout(() => {
      window.clearInterval(interval);
      if (!check()) setFailed(true);
      else setLoaded(true);
    }, 8000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <div>
      {/* next/script renders the tag on this page only and dedupes by src
          across client-side navigations. */}
      <Script src={SCRIPT_SRC} strategy="afterInteractive" onError={() => setFailed(true)} />
      {/* Reserved-height frame: no layout shift between states. */}
      <div className="relative min-w-0 overflow-hidden rounded-2xl border border-[#E0EAF2] bg-white shadow-[0_24px_60px_-32px_rgba(10,22,40,0.35)]">
        {!loaded && !failed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-navy/60" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="animate-spin motion-reduce:hidden" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="#E0EAF2" strokeWidth="3" />
              <path d="M22 12a10 10 0 0 0-10-10" stroke="#0369A1" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <p className="text-sm">Loading the scheduling calendar…</p>
          </div>
        )}
        {failed && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/95 p-6">
            <div className="max-w-md text-center">
              <p className="text-base font-semibold text-navy">The embedded calendar could not load.</p>
              <p className="mt-2 text-sm leading-relaxed text-navy/65">
                Your browser or network may be blocking it. You can book the
                same call directly on Calendly instead.
              </p>
            </div>
          </div>
        )}
        {/* Height gives the calendar room at each breakpoint so the page
            avoids an unnecessary second scrollbar; Calendly still manages
            its own internal steps inside the iframe. */}
        <div
          ref={hostRef}
          className="calendly-inline-widget h-[1150px] w-full min-w-0 sm:h-[1000px]"
          data-url={SITE.calendlyUrl}
        />
      </div>

      {/* Clearly labeled direct fallback: the one external Calendly link. */}
      <p className="mt-4 text-center text-sm text-navy/65" data-cta-zone="book-fallback">
        Calendar not loading?{' '}
        <a
          href={SITE.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#0369A1] underline"
        >
          Book directly on Calendly
        </a>
        .
      </p>
      <noscript>
        <p className="mt-2 rounded-xl border border-[#E0EAF2] bg-[#F5FAFD] p-4 text-center text-sm text-navy/80">
          Scheduling requires JavaScript. With scripts disabled, please{' '}
          <a href={SITE.calendlyUrl} className="font-semibold text-[#0369A1] underline">
            book your call directly on Calendly
          </a>{' '}
          or email us.
        </p>
      </noscript>
    </div>
  );
}
