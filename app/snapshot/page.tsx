import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Section, { SectionHeading } from '@/components/Section';
import CTAButton from '@/components/CTAButton';
import { SITE, CTA } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Get a Complimentary AI Visibility Snapshot',
  description:
    'Book an introductory call and receive a complimentary snapshot of how AI platforms describe and recommend your company. The call sets the next step.',
  alternates: { canonical: '/snapshot/' },
};

const included = [
  ['A limited prompt set', 'A focused set of the buyer questions that matter most in your category, run across one or two AI platforms.'],
  ['A short summary', 'Where your company appears, how it is described, and who is recommended instead, in a few readable pages.'],
  ['A walkthrough on the call', 'We go through the snapshot together, answer questions, and point out anything that needs attention.'],
  ['A clear recommendation', 'Whether the comprehensive paid audit is worth doing for your situation, and what it would cover.'],
];

/**
 * The Service schema describes what this page offers: the complimentary
 * AI Visibility Snapshot, received by booking the introductory call. The paid
 * audit has its own description on the services page.
 */
const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE.url}/snapshot/#service`,
  name: 'AI Visibility Snapshot',
  serviceType: 'AI visibility snapshot',
  description:
    'A complimentary snapshot of how AI platforms describe, compare, and recommend a company, received by booking a free introductory call. It is a brief preview, not the comprehensive paid AI Visibility Audit.',
  url: `${SITE.url}/snapshot/`,
  provider: { '@id': `${SITE.url}/#organization` },
};

export default function SnapshotPage() {
  return (
    <>
      <Header />
      <main>
        <Section tone="navy">
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">Included with the introductory call</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Get a Complimentary AI Visibility Snapshot.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">{CTA.supporting}</p>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
              The snapshot is a brief preview of your current AI visibility. On
              the call we walk through it and tell you whether the comprehensive
              paid audit is worth doing.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton href={SITE.bookingUrl} variant="primary">{CTA.short}</CTAButton>
              <CTAButton href={SITE.mailto} variant="secondary">Email Signal Harbor</CTAButton>
            </div>
            <p className="mt-6 max-w-2xl text-sm text-white/55">{CTA.boundary}</p>
          </div>
        </Section>

        <Section tone="light">
          <SectionHeading
            tone="light"
            eyebrow="What the Snapshot includes"
            title="A brief preview, not the full audit."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {included.map(([t, d], i) => (
              <div key={t} className="card-light accent-top">
                <span className="font-sora text-sm font-bold text-[#0369A1]">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-bold text-navy">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-navy/65">{d}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section tone="navy-deep">
          <div className="flex flex-col gap-6 rounded-3xl border border-blue/25 bg-blue/[0.06] p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-white">Need more than a preview?</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                The AI Visibility Audit is the comprehensive paid engagement: a
                full prompt set, measurement across multiple AI platforms,
                competitor tracking, a source map, an accuracy review, and a
                prioritized action roadmap. See{' '}
                <Link href="/services" className="text-blue underline">the services page</Link> for
                how it fits with optimization sprints and ongoing monitoring.
              </p>
            </div>
            <div className="flex-none">
              <CTAButton href={SITE.bookingUrl} variant="primary">{CTA.audit}</CTAButton>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
    </>
  );
}
