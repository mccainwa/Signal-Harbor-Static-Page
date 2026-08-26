import type { Metadata } from 'next';
import { pageMetadata, OG } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import CTAButton from '@/components/CTAButton';
import { SITE, CTA } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    'Signal Harbor is an AI visibility intelligence and GEO services company. What we do, how we work, and how to reach us.',
  path: '/about/',
  image: OG.company,
  imageAlt: 'About Signal Harbor',
});

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
            <div className="mt-10 rounded-2xl border border-white/10 bg-navy-panel/70 p-6" data-cta-zone="about-founders">
              <h2 className="text-lg font-bold text-white">The people behind Signal Harbor</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                Signal Harbor was founded by Walter McCain III and Sebastian Miller.
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {SITE.founders.map((name) => (
                  <li key={name} className="rounded-xl border border-white/10 bg-navy/40 px-4 py-3.5">
                    <p className="text-[15px] font-bold text-white">{name}</p>
                    <p className="mt-0.5 text-sm text-white/60">Co-founder</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5">
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-blue/60 hover:text-blue"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.32 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.1 20.45H3.53V9H7.1v11.45z" /></svg>
                  Follow Signal Harbor on LinkedIn
                  <span className="sr-only">(opens in a new tab)</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
                </a>
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-navy-panel/70 p-6">
              <h2 className="text-lg font-bold text-white">Part of Chicago&rsquo;s startup ecosystem</h2>
              <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-white/70">
                <li>
                  Member of{' '}
                  <a href="https://www.luc.edu/leadershiphub/centers/ignitelab/" target="_blank" rel="noopener noreferrer" className="text-blue underline">
                    Loyola University Chicago&rsquo;s Ignite Lab
                  </a>
                </li>
                <li>
                  Member of{' '}
                  <a href="https://1871.com/" target="_blank" rel="noopener noreferrer" className="text-blue underline">
                    1871
                  </a>
                </li>
              </ul>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-cta-zone="about-page">
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
