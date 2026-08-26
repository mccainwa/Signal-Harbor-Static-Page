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

const nav: Nav[] = [
  {
    label: 'Platform',
    items: [
      { label: 'What We Measure', href: '/platform' },
      { label: 'Dashboard Preview', href: '/platform#dashboard' },
      { label: 'Methodology', href: '/methodology' },
      { label: 'Deliverables', href: '/methodology#deliverables' },
    ],
  },
  {
    label: 'Services',
    items: [
      { label: 'Complimentary Snapshot', href: '/snapshot' },
      { label: 'AI Visibility Audit', href: '/audit' },
      { label: 'Optimization Sprint', href: '/services#geo-sprint' },
      { label: 'Ongoing Monitoring', href: '/services#monitoring' },
      { label: 'All Services', href: '/services' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  {
    label: 'Resources',
    items: [
      { label: 'AI Visibility Guide', href: '/ai-visibility' },
      { label: 'Blog', href: '/blog' },
      { label: 'Research', href: '/research' },
      { label: 'FAQ', href: '/faq' },
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
        setOpenState(null);
        setMobileOpen(false);
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
      <div className="container-x flex h-[80px] items-center justify-between gap-6">
        <Logo />

        {/* Desktop navigation: disclosure dropdowns + direct links */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((m, idx) => {
            if (!m.items) {
              return (
                <Link
                  key={m.label}
                  href={m.href}
                  className="rounded-lg px-3.5 py-2.5 text-[15px] font-semibold text-navy/70 transition-colors hover:bg-[#F0F6FA] hover:text-navy"
                >
                  {m.label}
                </Link>
              );
            }
            const isOpen = openLabel === m.label;
            const panelId = `nav-panel-${m.label.toLowerCase()}`;
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
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-[15px] font-semibold transition-colors ${
                    isOpen ? 'bg-[#EAF3F9] text-navy' : 'text-navy/70 hover:bg-[#F0F6FA] hover:text-navy'
                  }`}
                >
                  {m.label}
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 12 12"
                    fill="none"
                    className={`text-navy/40 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    <path d="M3 4.5L6 7.5l3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div
                  id={panelId}
                  className={`absolute top-full pt-2.5 ${alignRight ? 'right-0' : 'left-0'} ${
                    isOpen ? 'visible opacity-100' : 'invisible opacity-0'
                  } transition-opacity duration-150`}
                >
                  <div className="w-64 overflow-hidden rounded-2xl border border-[#E0EAF2] bg-white p-2 shadow-[0_28px_60px_-28px_rgba(10,22,40,0.4)]">
                    {m.items.map((it) => (
                      <Link
                        key={it.href + it.label}
                        href={it.href}
                        onClick={closeMenus}
                        className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-navy/75 transition-colors hover:bg-[#F0F6FA] hover:text-[#0369A1]"
                      >
                        {it.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:block" data-cta-zone="header">
          <CTAButton href={SITE.bookingUrl}>{CTA.short}</CTAButton>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2.5 text-navy lg:hidden"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-80px)] overflow-y-auto border-t border-[#E5EEF5] bg-white lg:hidden">
          <nav className="container-x flex flex-col gap-5 py-6" aria-label="Mobile">
            {nav.map((m) =>
              m.items ? (
                <div key={m.label}>
                  <p className="px-1 text-xs font-semibold uppercase tracking-wider text-navy/45">{m.label}</p>
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
