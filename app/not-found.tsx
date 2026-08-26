import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAButton from '@/components/CTAButton';
import { SITE, CTA } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you were looking for does not exist or has moved. Find services, the AI visibility guide, or the FAQ.',
  robots: { index: false, follow: false },
};

const destinations = [
  { label: 'Home', href: '/', d: 'Start from the top.' },
  { label: 'Services', href: '/services', d: 'Audits, sprints, and monitoring.' },
  { label: 'What Is AI Visibility?', href: '/ai-visibility', d: 'The plain-language guide.' },
  { label: 'FAQ', href: '/faq', d: 'Common questions, answered.' },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="hero-light">
        <section className="container-x py-20 sm:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">404</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">Page not found.</h1>
            <p className="mt-5 text-lg leading-relaxed text-navy/70">
              The page you were looking for does not exist or has moved. These
              routes will get you back on track.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {destinations.map((x) => (
                <li key={x.href}>
                  <Link href={x.href} className="card-light lift block !p-4 transition-colors hover:border-[#0369A1]/40">
                    <span className="block text-[15px] font-bold text-navy">{x.label}</span>
                    <span className="mt-1 block text-sm text-navy/65">{x.d}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8" data-cta-zone="not-found">
              <CTAButton href={SITE.bookingUrl} variant="primary">{CTA.primary}</CTAButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
