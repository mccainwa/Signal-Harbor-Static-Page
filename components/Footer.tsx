import Link from 'next/link';
import Logo from './Logo';
import { SITE, CTA } from '@/lib/site';

const columns = [
  {
    heading: 'Explore',
    links: [
      { label: 'Services', href: '/services' },
      { label: 'Platform', href: '/platform' },
      { label: 'Methodology', href: '/methodology' },
      { label: 'What Is AI Visibility?', href: '/ai-visibility' },
      { label: 'Research', href: '/research' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
  {
    heading: 'Get started',
    links: [
      { label: 'Complimentary Snapshot', href: '/snapshot' },
      { label: 'AI Visibility Audit', href: '/audit' },
      { label: CTA.short, href: SITE.bookingUrl },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-deep">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo size={56} />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
              AI visibility intelligence and GEO services for companies that need
              to be found, cited, understood, and recommended across AI-mediated
              buyer research.
            </p>
            <p className="mt-4 text-sm text-white/55">
              <a href={SITE.mailto} className="hover:text-blue">{SITE.email}</a>
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-white">{col.heading}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => {
                  const external = /^https?:/.test(l.href);
                  return (
                    <li key={l.label}>
                      {external ? (
                        <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white">{l.label}</a>
                      ) : (
                        <Link href={l.href} className="text-sm text-white/60 hover:text-white">{l.label}</Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Short results disclaimer — present but not prominent. */}
        <p className="mt-12 max-w-3xl text-xs leading-relaxed text-white/55">
          Signal Harbor measures observable AI visibility signals across selected
          platforms and prompt sets. Results can vary by model, location, account
          state, prompt wording, source availability, and time. Signal Harbor does
          not guarantee placement, ranking, recommendation, or sales outcomes.
        </p>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/55">© 2026 Signal Harbor. {SITE.domain}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-white/55 hover:text-white">Privacy</Link>
            <Link href="/terms" className="text-xs text-white/55 hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
