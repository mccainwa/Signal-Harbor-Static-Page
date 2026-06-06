'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CTAButton from './CTAButton';
import { SITE } from '@/lib/site';

const navLinks = [
  { label: 'AI Visibility Audit', href: '#audit-framework' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Sample Report', href: '#sample-report' },
  { label: 'About', href: '#about' },
];

/** Compact brand lockup: the actual lighthouse logo in a white rounded square
 *  (object-cover crops white margins) + typed "Signal Harbor" wordmark. */
function BrandLockup() {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="Signal Harbor — home">
      <span className="relative inline-block h-10 w-10 overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-white/10">
        <Image src="/SH_Lighthouse_Logo.png" alt="Signal Harbor" fill unoptimized sizes="40px" className="object-cover" priority />
      </span>
      <span className="font-sora text-lg font-bold tracking-tight text-white">Signal Harbor</span>
    </Link>
  );
}

/**
 * Sticky top navigation. Single colored CTA. Collapses to a toggle menu on
 * mobile. Client component for the menu toggle; still statically exported.
 */
export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <BrandLockup />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <CTAButton href={SITE.bookingUrl}>Book an Audit</CTAButton>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-white lg:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy lg:hidden">
          <nav className="container-x flex flex-col gap-1 py-4" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-2 py-3 text-base font-medium text-white/85 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-2 pt-3">
              <CTAButton href={SITE.bookingUrl} className="w-full">
                Book an Audit
              </CTAButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
