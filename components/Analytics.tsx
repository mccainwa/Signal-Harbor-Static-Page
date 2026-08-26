'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { GA_ID, analyticsEnabled, track } from '@/lib/analytics';

const GTAG_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;

/**
 * GA4 loader and event wiring, mounted once in the root layout.
 *
 * - Loads gtag.js exactly once, and only when analyticsEnabled() (production
 *   hostname, or the explicit test flag).
 * - config uses send_page_view: false; the pathname effect below sends every
 *   page_view (initial and client-side route changes) exactly once each.
 * - One delegated click listener translates taps on links into a small set
 *   of named events with non-personal parameters (CTA zone, destination
 *   path, article slug, outbound domain). Full outbound URLs are never sent.
 * - Calendly's official postMessage event signals a completed booking; only
 *   the fact of scheduling is recorded, never form contents.
 */
export default function Analytics() {
  const pathname = usePathname();
  const loadedRef = useRef(false);

  // Load gtag.js once, after mount, when enabled.
  useEffect(() => {
    if (loadedRef.current || !analyticsEnabled()) return;
    loadedRef.current = true;
    const w = window as unknown as Record<string, unknown> & {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
    };
    w.dataLayer = w.dataLayer ?? [];
    if (typeof w.gtag !== 'function') {
      w.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        (w.dataLayer as unknown[]).push(arguments);
      };
    }
    if (!document.querySelector(`script[src="${GTAG_SRC}"]`)) {
      const s = document.createElement('script');
      s.src = GTAG_SRC;
      s.async = true;
      document.head.appendChild(s);
    }
    w.gtag('js', new Date());
    w.gtag('config', GA_ID, { send_page_view: false });
  }, []);

  // One page_view per route (covers the initial view and SPA navigations).
  useEffect(() => {
    if (!analyticsEnabled()) return;
    track('page_view', { page_path: pathname });
    if (pathname === '/book' || pathname === '/book/') {
      track('book_page_view', { page_path: pathname });
    }
  }, [pathname]);

  // Delegated click handling and the Calendly scheduled signal.
  useEffect(() => {
    if (!analyticsEnabled()) return;

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]');
      if (!a) return;
      const href = a.getAttribute('href') ?? '';
      const zone =
        (a.closest('[data-cta-zone]') as HTMLElement | null)?.dataset.ctaZone ??
        window.location.pathname;

      if (href.startsWith('mailto:')) {
        track('contact_email_click', { cta_zone: zone });
        return;
      }
      if (/^https?:/.test(href)) {
        let domain = '';
        try {
          domain = new URL(href).hostname.replace(/^www\./, '');
        } catch {
          return;
        }
        if (domain.endsWith('linkedin.com')) track('linkedin_click', { cta_zone: zone });
        else if (domain.endsWith('luc.edu')) track('membership_link_click', { org: 'loyola-ignite-lab', cta_zone: zone });
        else if (domain === '1871.com') track('membership_link_click', { org: '1871', cta_zone: zone });
        else if (domain.endsWith('beehiiv.com') && href.includes('subscribe')) track('newsletter_subscribe_click', { cta_zone: zone });
        else if (domain.endsWith('calendly.com')) track('calendly_fallback_click', { cta_zone: zone });
        else track('outbound_click', { outbound_domain: domain, cta_zone: zone });
        return;
      }
      // Internal links: article opens and zoned CTAs only.
      const path = href.split('#')[0].split('?')[0];
      const article = /^\/blog\/([^/]+)\/?$/.exec(path);
      if (article) {
        track('blog_article_click', { article_slug: article[1], cta_zone: zone });
        return;
      }
      if (a.closest('[data-cta-zone]') && path) {
        track('cta_click', { cta_zone: zone, destination: path });
      }
    };

    const onMessage = (e: MessageEvent) => {
      try {
        if (
          typeof e.origin === 'string' &&
          /https:\/\/([a-z0-9-]+\.)?calendly\.com$/.test(e.origin) &&
          (e.data as { event?: string } | null)?.event === 'calendly.event_scheduled'
        ) {
          track('booking_confirmed', { page_path: window.location.pathname });
        }
      } catch {}
    };

    document.addEventListener('click', onClick, true);
    window.addEventListener('message', onMessage);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('message', onMessage);
    };
  }, []);

  return null;
}
