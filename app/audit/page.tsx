import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Section, { SectionHeading } from '@/components/Section';
import CTAButton from '@/components/CTAButton';
import { SITE, CTA } from '@/lib/site';

export const metadata: Metadata = {
  title: 'AI Visibility Audit',
  description:
    'The AI Visibility Audit is a comprehensive paid engagement that measures how AI platforms describe, compare, and recommend your company, with a prioritized roadmap.',
  alternates: { canonical: '/audit/' },
};

const covers = [
  ['A full buyer prompt set', 'Category, comparison, alternative, local, and objection questions, built around how buyers in your market actually ask.'],
  ['Multi-platform measurement', 'Repeated runs across the AI platforms selected for your scope, because a single response is not a stable result.'],
  ['Competitor tracking', 'Where competitors appear and you do not, across the same prompts, so displacement is observed rather than guessed.'],
  ['A source and citation map', 'The owned, earned, review, directory, and competitor sources that appear alongside the answers about your market.'],
  ['An accuracy and hallucination review', 'Unsupported, outdated, or incorrect statements about your company, ranked by correction priority.'],
  ['A prioritized action roadmap', 'A sequenced plan tying each recommended fix to the observed gap behind it.'],
];

const steps = [
  ['Scope', 'We agree the brand, market, competitor set, and platform selection on the introductory call, informed by your complimentary Snapshot.'],
  ['Measure', 'The full prompt set runs repeatedly across the selected platforms over a testing window.'],
  ['Analyze', 'We classify sources, score visibility and influence, verify claims, and separate patterns from one-off responses.'],
  ['Report', 'You receive the executive scorecard and supporting artifacts, walked through with your team.'],
  ['Plan', 'Findings become the prioritized roadmap, with optional implementation support or monitoring afterward.'],
];

const comparison = [
  ['Cost', 'Complimentary with a booked introductory call', 'Paid engagement, scoped on the call'],
  ['Prompt set', 'Limited', 'Full, built for your market'],
  ['Platforms', 'One or two', 'Multiple, selected for your scope'],
  ['Competitor tracking', 'Not included', 'Included'],
  ['Source and citation map', 'Not included', 'Included'],
  ['Accuracy review', 'Notable issues only', 'Full register, ranked by priority'],
  ['Output', 'Short summary and a call walkthrough', 'Executive scorecard, evidence, and a prioritized action roadmap'],
  ['Best for', 'Deciding whether the audit is worth doing', 'Acting on AI visibility with evidence'],
];

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE.url}/audit/#service`,
  name: 'AI Visibility Audit',
  serviceType: 'AI visibility audit',
  description:
    'A comprehensive paid engagement that measures how AI platforms describe, compare, and recommend a company: a full prompt set, multi-platform measurement, competitor tracking, a source map, an accuracy review, and a prioritized action roadmap.',
  url: `${SITE.url}/audit/`,
  provider: { '@id': `${SITE.url}/#organization` },
};

export default function AuditPage() {
  return (
    <>
      <Header />
      <main>
        <Section tone="navy">
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">The comprehensive engagement</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">The AI Visibility Audit.</h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              The audit is Signal Harbor&rsquo;s comprehensive paid engagement.
              It measures how AI platforms describe, compare, and recommend
              your company across a full set of realistic buyer questions, then
              turns the findings into an executive scorecard and a prioritized
              roadmap your team can act on.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
              It is built for companies whose buyers research and compare
              providers before making contact, and it starts after an
              introductory call and complimentary{' '}
              <Link href="/snapshot" className="text-blue underline">Snapshot</Link> confirm
              it is worth doing.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton href={SITE.bookingUrl} variant="primary">{CTA.audit}</CTAButton>
              <CTAButton href="/snapshot" variant="secondary">Start with the Snapshot</CTAButton>
            </div>
            <p className="mt-6 max-w-2xl text-sm text-white/55">{CTA.boundary}</p>
          </div>
        </Section>

        <Section tone="light">
          <SectionHeading
            tone="light"
            eyebrow="Scope"
            title="What the audit covers."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {covers.map(([t, d], i) => (
              <div key={t} className="card-light accent-top flex flex-col">
                <span className="font-sora text-sm font-bold text-[#0369A1]">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-bold text-navy">{t}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-navy/65">{d}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section tone="navy-deep">
          <SectionHeading
            eyebrow="Process"
            title="How the audit runs."
            intro="Five stages from scope to roadmap. The methodology page explains the measurement design in depth."
          />
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {steps.map(([t, d], i) => (
              <li key={t} className="flex gap-4 rounded-2xl border border-white/12 bg-navy-panel p-5">
                <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-blue/15 font-sora text-sm font-bold text-blue ring-1 ring-blue/30">{i + 1}</span>
                <div>
                  <h3 className="text-[15px] font-bold text-white">{t}</h3>
                  <p className="mt-1 text-sm leading-snug text-white/60">{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-[15px] text-white/60">
            Deliverables include the Executive Scorecard, Prompt Performance
            Matrix, Citation Map, Accuracy Register, and the prioritized
            Action Roadmap, previewed on the{' '}
            <Link href="/methodology#deliverables" className="text-blue underline">methodology page</Link>.
          </p>
        </Section>

        <Section tone="light">
          <SectionHeading
            tone="light"
            eyebrow="Snapshot or audit?"
            title="How the audit differs from the complimentary Snapshot."
          />
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
              <caption className="sr-only">Comparison of the complimentary AI Visibility Snapshot and the paid AI Visibility Audit</caption>
              <thead>
                <tr className="border-b-2 border-navy/15">
                  <th scope="col" className="py-3 pr-4 font-bold text-navy">Dimension</th>
                  <th scope="col" className="py-3 pr-4 font-bold text-navy">AI Visibility Snapshot</th>
                  <th scope="col" className="py-3 font-bold text-navy">AI Visibility Audit</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([dim, snap, audit]) => (
                  <tr key={dim} className="border-b border-navy/10 align-top">
                    <th scope="row" className="py-3 pr-4 font-semibold text-navy">{dim}</th>
                    <td className="py-3 pr-4 text-navy/70">{snap}</td>
                    <td className="py-3 text-navy/70">{audit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-3xl text-[15px] text-navy/70">
            Signal Harbor measures observable answers and sources across the
            selected platforms and prompt sets. It does not control the AI
            systems and does not guarantee placement, ranking, or
            recommendation outcomes.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CTAButton href={SITE.bookingUrl} variant="primary">{CTA.audit}</CTAButton>
            <Link href="/services" className="inline-flex items-center rounded-xl border border-navy/15 px-5 py-3 text-sm font-semibold text-navy transition-colors hover:border-blue/50 hover:text-[#0369A1]">
              See all services
            </Link>
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
