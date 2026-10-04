import type { Metadata } from 'next';
import { pageMetadata, OG } from '@/lib/seo';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Section, { SectionHeading } from '@/components/Section';
import CTAButton from '@/components/CTAButton';
import { SITE, CTA } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Complimentary AI Visibility Snapshot and Demo',
  description:
    'See how AI describes your company with a complimentary AI Visibility Snapshot, then explore Signal Harbor in a live portal demo.',
  path: '/snapshot/',
  image: OG.snapshot,
  imageAlt: 'The complimentary Signal Harbor AI Visibility Snapshot',
});

const included = [
  ['A limited prompt set', 'A focused set of the buyer questions that matter most in your category, run across one or two AI platforms.'],
  ['A short summary', 'Where your company appears, how it is described, and who is recommended instead, in a few readable pages.'],
  ['A live portal demo', 'See how Insights, Campaign, review, approvals, and Results connect in your client workspace.'],
  ['A clear recommendation', 'Whether the paid company pilot fits your situation, and which product, audience, or initiative it would start with.'],
];

/**
 * The Service schema describes what this page offers: the complimentary
 * AI Visibility Snapshot, received by booking the introductory call. It is a
 * sales preview. The paid company pilot, whose work and results are delivered
 * through the client portal, is described on the services and pricing pages.
 */
const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE.url}/snapshot/#service`,
  name: 'AI Visibility Snapshot',
  serviceType: 'AI visibility snapshot',
  description:
    'A complimentary snapshot of how AI platforms describe, compare, and recommend a company, with a live portal demo on the introductory call. The paid company pilot delivers work and results through the client portal.',
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
              Your AI Visibility Snapshot. A live portal demo.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">{CTA.supporting}</p>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
              The snapshot is a brief preview of your current AI visibility. On
              the call we walk through it, show the portal, and discuss whether the company pilot
              is the right next step for your team.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-cta-zone="snapshot-hero">
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
            title="See the opportunity. See how the work gets done."
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
                The company pilot is the paid, managed program. Signal Harbor
                tests the buyer questions behind your initiative, prioritizes
                the gaps, and prepares the pages and content the campaign calls
                for. Your team reviews and approves the work. Findings,
                campaign work, approvals, publication status, and results are
                delivered through the client portal, not as a report. See{' '}
                <Link href="/platform" className="text-blue underline">how the client portal works</Link>, read{' '}
                <Link href="/services" className="text-blue underline">how the managed program runs</Link>, or review{' '}
                <Link href="/pricing" className="text-blue underline">the pilot price and commitment</Link>.
              </p>
            </div>
            <div className="flex-none" data-cta-zone="snapshot-footer">
              <CTAButton href={SITE.bookingUrl} variant="primary">{CTA.primary}</CTAButton>
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
