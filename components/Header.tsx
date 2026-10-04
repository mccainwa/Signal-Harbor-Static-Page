'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import CTAButton from './CTAButton';
import { SITE, CTA } from '@/lib/site';

type Item = { label: string; href: string };
type Nav =
  | { label: string; href: string; items?: undefined }
  | { label: string; items: Item[]; href?: undefined };

/* Labels say where they lead: how the work runs, the portal itself, the
   price, and supporting material. */
const nav: Nav[] = [
  {
    label: 'How it works',
    items: [
      { label: 'The managed program', href: '/services' },
      { label: 'All six steps', href: '/services#how-it-runs' },
      { label: 'AI visibility audit', href: '/audit' },
      { label: 'Measurement methodology', href: '/methodology' },
    ],
  },
  { label: 'Client portal', href: '/platform' },
  { label: 'Pricing', href: '/pricing' },
  {
    label: 'Resources',
    items: [
      { label: 'What is AI visibility?', href: '/ai-visibility' },
      { label: 'Blog', href: '/blog' },
      { label: 'Research', href: '/research' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Complimentary Snapshot', href: '/snapshot' },
    ],
  },
  {
    label: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

/**
 * Enterprise header on a white surface: the original logo's light background
 * blends in naturally. Disclosure-pattern dropdowns (hover, click, keyboard),
 * Escape / outside-click / focus-out closing, and a scroll-state shadow.
 * Sticky; pages offset anchors with scroll-margin.
 */
export default function Header() {
  /**
   * Open menu plus how it was opened. Hover-opened menus close when the
   * pointer leaves; click-opened menus (mouse or touch) stay until a second
   * click, Escape, an outside click, or focus leaving. Clicking a menu that
   * hover already opened pins it instead of closing it, so hover + click is
   * never a flicker.
   */
  const [open, setOpenState] = useState<{ label: string; by: 'hover' | 'click' } | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const openLabel = open?.label ?? null;
  const closeMenus = () => setOpenState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpenState(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Return focus to whichever control owned the open menu, so keyboard
        // users are not left on a link inside a panel that just closed.
        const trigger = rootRef.current?.querySelector<HTMLButtonElement>('button[aria-expanded="true"]');
        setOpenState(null);
        setMobileOpen(false);
        if (trigger && rootRef.current?.contains(document.activeElement)) trigger.focus();
      }
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <header
      ref={rootRef}
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow ${
        scrolled
          ? 'border-[#D9E7F1] shadow-[0_12px_32px_-20px_rgba(10,22,40,0.35)]'
          : 'border-[#E5EEF5]'
      }`}
    >
      <div className="container-x flex h-[80px] items-center justify-between gap-3 lg:px-6 xl:gap-6 xl:px-8">
        <Logo className="h-10 w-auto sm:h-[46px] lg:h-[42px] xl:h-[46px]" />

        {/* Desktop navigation: disclosure dropdowns + direct links */}
        <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1" aria-label="Primary">
          {nav.map((m, idx) => {
            if (!m.items) {
              return (
                <Link
                  key={m.label}
                  href={m.href}
                  className="nav-beacon-link whitespace-nowrap rounded-lg px-2 py-2.5 text-[14px] xl:px-3.5 xl:text-[15px] font-semibold text-navy/80 hover:text-navy"
                >
                  {m.label}
                </Link>
              );
            }
            const isOpen = openLabel === m.label;
            const panelId = `nav-panel-${m.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            const alignRight = idx >= 3;
            return (
              <div
                key={m.label}
                className="relative"
                onMouseEnter={() =>
                  setOpenState((v) => (v?.label === m.label ? v : { label: m.label, by: 'hover' }))
                }
                onMouseLeave={() =>
                  setOpenState((v) => (v?.label === m.label && v.by === 'hover' ? null : v))
                }
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setOpenState((v) => (v?.label === m.label ? null : v));
                  }
                }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpenState((v) => {
                      if (v?.label !== m.label) return { label: m.label, by: 'click' };
                      return v.by === 'hover' ? { label: m.label, by: 'click' } : null;
                    })
                  }
                  className={`nav-beacon-link inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-2.5 text-[14px] xl:px-3.5 xl:text-[15px] font-semibold transition-colors ${
                    isOpen ? 'bg-[#EAF3F9] text-navy' : 'text-navy/70 hover:bg-[#F0F6FA] hover:text-navy'
                  }`}
                >
                  {m.label}
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 12 12"
                    fill="none"
                    className={`text-navy/70 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    <path d="M3 4.5L6 7.5l3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div
                  id={panelId}
                  className={`harbor-menu absolute top-full pt-2.5 ${alignRight ? 'right-0' : 'left-0'} ${
                    isOpen ? 'harbor-menu-open visible opacity-100' : 'invisible opacity-0'
                  }`}
                >
                  <div className="nav-panel-surface w-64 overflow-hidden rounded-2xl border border-[#BBD8E8] bg-white p-2 shadow-[0_28px_60px_-28px_rgba(10,22,40,0.4)]">
                    {m.items.map((it) => (
                      <Link
                        key={it.href + it.label}
                        href={it.href}
                        onClick={closeMenus}
                        className="nav-menu-link flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-navy/85 hover:text-[#0369A1]"
                      >
                        {it.label}
                        <span aria-hidden="true" className="nav-menu-arrow">↗</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:block" data-cta-zone="header">
          <CTAButton href={SITE.bookingUrl} className="whitespace-nowrap !px-4 !text-[14px] xl:!px-6 xl:!text-[15px]">{CTA.short}</CTAButton>
        </div>

        <button
          type="button"
          className={`menu-toggle inline-flex items-center justify-center rounded-lg p-2.5 text-navy lg:hidden ${mobileOpen ? 'menu-toggle-open' : ''}`}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path className="menu-line-a" d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path className="menu-line-b" d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path className="menu-line-c" d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="harbor-mobile-menu max-h-[calc(100vh-80px)] overflow-y-auto border-t border-[#BEDAE9] bg-white lg:hidden">
          <nav className="container-x flex flex-col gap-5 py-6" aria-label="Mobile">
            {nav.map((m) =>
              m.items ? (
                <div key={m.label}>
                  <p className="px-1 text-xs font-semibold uppercase tracking-wider text-navy/75">{m.label}</p>
                  <div className="mt-1.5 flex flex-col">
                    {m.items.map((it) => (
                      <Link
                        key={it.href + it.label}
                        href={it.href}
                        className="rounded-lg px-2 py-2.5 text-[15px] font-medium text-navy/80 hover:bg-[#F0F6FA]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {it.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={m.label}
                  href={m.href}
                  className="rounded-lg px-1 py-1 text-[15px] font-bold text-navy hover:text-[#0369A1]"
                  onClick={() => setMobileOpen(false)}
                >
                  {m.label}
                </Link>
              ),
            )}
            <span data-cta-zone="header-mobile"><CTAButton href={SITE.bookingUrl} className="w-full">{CTA.short}</CTAButton></span>
          </nav>
        </div>
      )}
    </header>
  );
}
