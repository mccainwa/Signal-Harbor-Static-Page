import Link from 'next/link';
import Logo from './Logo';
import { SITE, CTA } from '@/lib/site';

const columns = [
  {
    heading: 'Platform',
    links: [
      { label: 'What We Measure', href: '/platform' },
      { label: 'Methodology', href: '/methodology' },
      { label: 'AI Visibility Guide', href: '/ai-visibility' },
      { label: 'Research', href: '/research' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Complimentary Snapshot', href: '/snapshot' },
      { label: 'AI Visibility Audit', href: '/audit' },
      { label: 'All Services', href: '/services' },
      { label: 'Pricing', href: '/pricing' },
      { label: CTA.short, href: SITE.bookingUrl },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];

/**
 * Light footer: white surface so the original logo blends in, navy headings,
 * a thin cyan brand accent line on top, and a pale blue legal bar.
 */
export default function Footer() {
  return (
    <footer className="border-t border-[#E5EEF5] bg-white">
      {/* Brand accent line */}
      <div aria-hidden className="h-1 w-full bg-gradient-to-r from-blue via-[#4FD4FF] to-[#0369A1]" />
      <div className="container-x pb-12 pt-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo className="h-[52px] w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-navy/65">
              AI visibility intelligence and GEO services for companies that
              need to be found, cited, understood, and recommended across
              AI-mediated buyer research.
            </p>
            <p className="mt-5 text-sm">
              <a href={SITE.mailto} className="font-medium text-navy/80 underline decoration-navy/25 underline-offset-2 hover:text-[#0369A1]">
                {SITE.email}
              </a>
            </p>
            <ul className="mt-6 space-y-1.5 text-[13px] leading-relaxed text-navy/60">
              <li>
                Member of{' '}
                <a href="https://www.luc.edu/leadershiphub/centers/ignitelab/" target="_blank" rel="noopener noreferrer" className="font-medium text-navy/75 hover:text-[#0369A1]">
                  Loyola University Chicago&rsquo;s Ignite Lab
                </a>
              </li>
              <li>
                Member of{' '}
                <a href="https://1871.com/" target="_blank" rel="noopener noreferrer" className="font-medium text-navy/75 hover:text-[#0369A1]">
                  1871
                </a>
              </li>
            </ul>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy">{col.heading}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => {
                  const external = /^https?:/.test(l.href);
                  return (
                    <li key={l.label}>
                      {external ? (
                        <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-navy/65 transition-colors hover:text-[#0369A1]">{l.label}</a>
                      ) : (
                        <Link href={l.href} className="text-sm text-navy/65 transition-colors hover:text-[#0369A1]">{l.label}</Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Short results disclaimer — present but not prominent. */}
        <p className="mt-14 max-w-3xl text-xs leading-relaxed text-navy/70">
          Signal Harbor measures observable AI visibility signals across selected
          platforms and prompt sets. Results can vary by model, location, account
          state, prompt wording, source availability, and time. Signal Harbor does
          not guarantee placement, ranking, recommendation, or sales outcomes.
        </p>
      </div>

      {/* Legal bar */}
      <div className="border-t border-[#E0EAF2] bg-[#F5FAFD]">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <p className="text-xs text-navy/60">© 2026 Signal Harbor. {SITE.domain}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-navy/60 hover:text-[#0369A1]">Privacy</Link>
            <Link href="/terms" className="text-xs text-navy/60 hover:text-[#0369A1]">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
