'use client';

import { useState } from 'react';
import Link from 'next/link';
import CTAButton from './CTAButton';
import { SITE, CTA } from '@/lib/site';

type Item = { label: string; href: string };
type Menu = { label: string; items: Item[] };

const menus: Menu[] = [
  {
    label: 'Services',
    items: [
      { label: 'Complimentary Snapshot', href: '/snapshot' },
      { label: 'AI Visibility Diagnostic', href: '/services#diagnostic' },
      { label: 'GEO Strategy Sprint', href: '/services#geo-sprint' },
      { label: 'Accuracy & Source Review', href: '/services#accuracy' },
      { label: 'Ongoing Monitoring', href: '/services#monitoring' },
      { label: 'All Services', href: '/services' },
    ],
  },
  {
    label: 'Platform',
    items: [
      { label: 'What We Measure', href: '/platform' },
      { label: 'Dashboard Preview', href: '/platform#dashboard' },
      { label: 'Deliverables', href: '/methodology#deliverables' },
      { label: 'Methodology', href: '/methodology' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'What Is AI Visibility?', href: '/ai-visibility' },
      { label: 'Research', href: '/research' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
  {
    label: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
];

function BrandLockup() {
  return (
    <Link href="/" className="inline-flex items-center gap-3" aria-label="Signal Harbor home">
      <span className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-white/15">
        {/* Small cropped lighthouse mark — plain img for guaranteed static-export display.
            Decorative: the link's aria-label and the wordmark carry the name. */}
        <img src="/sh-mark.png" alt="" width={36} height={36} className="h-full w-full object-cover" />
      </span>
      <span className="font-sora text-lg font-bold tracking-tight text-white">Signal Harbor</span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <BrandLockup />

        {/* Desktop nav with hover/focus dropdowns */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {menus.map((m) => (
            <div key={m.label} className="group relative">
              <button className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white group-hover:text-white">
                {m.label}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/40" aria-hidden="true"><path d="M3 4.5L6 7.5l3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="w-60 overflow-hidden rounded-xl border border-white/10 bg-navy-panel p-1.5 shadow-card">
                  {m.items.map((it) => (
                    <Link key={it.href + it.label} href={it.href} className="block rounded-lg px-3 py-2 text-sm text-white/75 transition-colors hover:bg-white/5 hover:text-white">
                      {it.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        <div className="hidden lg:block">
          <CTAButton href={SITE.bookingUrl}>{CTA.short}</CTAButton>
        </div>

        <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-white lg:hidden" aria-expanded={open} aria-label="Toggle navigation menu" onClick={() => setOpen((v) => !v)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />) : (<path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />)}
          </svg>
        </button>
      </div>

      {/* Mobile accordion */}
      {open && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-white/10 bg-navy lg:hidden">
          <nav className="container-x flex flex-col gap-4 py-5" aria-label="Mobile">
            {menus.map((m) => (
              <div key={m.label}>
                <p className="px-1 text-xs font-semibold uppercase tracking-wider text-white/40">{m.label}</p>
                <div className="mt-1.5 flex flex-col">
                  {m.items.map((it) => (
                    <Link key={it.href + it.label} href={it.href} className="rounded-md px-2 py-2 text-[15px] text-white/80 hover:bg-white/5" onClick={() => setOpen(false)}>
                      {it.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <CTAButton href={SITE.bookingUrl} className="w-full">{CTA.short}</CTAButton>
          </nav>
        </div>
      )}
    </header>
  );
}
