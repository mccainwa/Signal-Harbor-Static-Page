import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import CTAButton from '@/components/CTAButton';
import { SITE, CTA } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Signal Harbor is an AI visibility intelligence and GEO services company. What we do, how we work, and how to reach us.',
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <Section tone="navy">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">Company</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">About Signal Harbor.</h1>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-white/75">
              <p>
                Signal Harbor helps companies understand and improve how AI
                systems describe, cite, compare, and recommend them, so they can
                capture more qualified demand and protect their reputation in AI
                buyer research.
              </p>
              <p className="text-white/60">
                We measure observable AI visibility signals across major answer
                platforms, diagnose the sources and gaps behind them, flag
                inaccurate claims, and turn the findings into a practical action
                plan for marketing, SEO, and leadership teams.
              </p>
              <p className="text-white/60">
                Every engagement starts the same way: book an introductory call
                and receive a complimentary snapshot of how AI platforms
                currently describe and recommend your company. Full audits and
                ongoing monitoring are paid engagements, scoped on that call.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton href={SITE.bookingUrl} variant="primary">{CTA.primary}</CTAButton>
              <CTAButton href={SITE.mailto} variant="secondary">Email Signal Harbor</CTAButton>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
