import Link from 'next/link';
import Logo from './Logo';
import { SITE } from '@/lib/site';

const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'AI Visibility Audit', href: '#audit-framework' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Sample Report', href: '#sample-report' },
    ],
  },
  {
    heading: 'Use Cases',
    links: [
      { label: 'Personal Injury Law', href: '#use-cases' },
      { label: 'Construction Software', href: '#use-cases' },
      { label: 'Medical & Dental', href: '#use-cases' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
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
              AI visibility intelligence for businesses that depend on being
              found, trusted, cited, and recommended.
            </p>
            <p className="mt-4 text-sm text-white/55">
              <a href={SITE.mailto} className="hover:text-blue">
                {SITE.email}
              </a>
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-white">{col.heading}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/60 hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/45">
            © 2026 Signal Harbor. signalharborconsulting.com
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-white/45 hover:text-white">
              Privacy
            </Link>
            <Link href="#" className="text-xs text-white/45 hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
