import type { Metadata } from 'next';
import { pageMetadata, OG } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Section, { SectionHeading } from '@/components/Section';
import CTAButton from '@/components/CTAButton';
import { SITE } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'AI Visibility Pricing',
  description:
    'How Signal Harbor prices the AI Visibility Audit, GEO services, and ongoing monitoring. Pricing is tailored to scope. Contact us for a quote built around your company.',
  path: '/pricing/',
  image: OG.pricing,
  imageAlt: 'Signal Harbor AI visibility pricing',
});

const offers = [
  {
    name: 'AI Visibility Snapshot',
    tag: 'Complimentary with a booked call',
    paid: false,
    desc: 'Complimentary when an introductory call is booked. It is a brief preview of how AI platforms currently describe and recommend your company, not the comprehensive paid Audit.',
  },
  {
    name: 'AI Visibility Audit',
    tag: 'Paid engagement',
    paid: true,
    desc: 'A paid engagement with pricing based on the testing, analysis, competitors, sources, and deliverables included in the agreed scope.',
  },
  {
    name: 'Optimization Sprint',
    tag: 'Paid engagement',
    paid: true,
    desc: 'A separately scoped paid engagement for companies that want help implementing prioritized improvements after the Audit.',
  },
  {
    name: 'Ongoing Monitoring',
    tag: 'Paid engagement',
    paid: true,
    desc: 'A tailored paid engagement. AI visibility monitoring pricing is based on monitoring coverage, reporting requirements, and operating cadence.',
  },
];

const factors = [
  { name: 'Number and type of buyer questions', desc: 'How many buyer questions we test, and whether they are broad discovery questions or specific comparison and recommendation prompts.' },
  { name: 'AI platforms included', desc: 'How many AI platforms the engagement measures, agreed with you during scoping.' },
  { name: 'Number of competitors', desc: 'How many competitors we track alongside your company in every test.' },
  { name: 'Repeat-testing requirements', desc: 'How many times each question is repeated. AI answers vary, so stable measurement needs repetition.' },
  { name: 'Source and accuracy analysis', desc: 'Whether the engagement maps the sources shaping AI answers and reviews AI claims about your company for accuracy.' },
  { name: 'Reporting depth', desc: 'The level of reporting you need, from a concise executive scorecard to detailed findings for multiple stakeholders.' },
  { name: 'Implementation support', desc: 'Whether you want Signal Harbor to help execute the roadmap or hand a prioritized plan to your team.' },
  { name: 'Ongoing monitoring requirements', desc: 'Whether measurement continues after the initial engagement, and at what cadence and coverage.' },
];

const steps = [
  { step: '1', title: 'Book an introductory call.', desc: 'The call is free. We talk through your market, your buyers, and what you want to learn.' },
  { step: '2', title: 'Receive the complimentary Snapshot.', desc: 'A brief preview of how AI platforms currently describe and recommend your company.' },
  { step: '3', title: 'Discuss the appropriate scope.', desc: 'Together we define the questions, platforms, competitors, and deliverables that fit your situation.' },
  { step: '4', title: 'Receive a tailored proposal before paid work begins.', desc: 'You see exactly what the engagement covers and what it costs before anything is billed.' },
];

const faqs = [
  {
    q: 'How much does an AI Visibility Audit cost?',
    a: 'There is no fixed price. AI Visibility Audit pricing depends on the buyer questions tested, the AI platforms included, the number of competitors measured, the depth of source and accuracy analysis, and the deliverables in the agreed scope. Book an introductory call and you will receive a tailored proposal before any paid work begins.',
  },
  {
    q: 'Why does Signal Harbor use tailored pricing?',
    a: 'Because the required measurement and implementation scope differs by company. A company tracking a handful of buyer questions in one market needs a different engagement than one measuring many questions, platforms, and competitors. Tailored pricing means you pay for the scope your situation requires and nothing more.',
  },
  {
    q: 'Is the AI Visibility Snapshot free?',
    a: 'The introductory call is free, and the AI Visibility Snapshot that comes with it is complimentary. The Snapshot is a brief preview of how AI platforms describe and recommend your company. It is not the comprehensive paid Audit.',
  },
  {
    q: 'What affects GEO service pricing?',
    a: 'Generative Engine Optimization, or GEO, is the work of improving how AI systems describe and recommend your company. GEO service pricing follows the scope of that work: how many pages and sources need optimization, the structured data and entity work involved, the content support you want, and whether a follow-up re-audit is included.',
  },
  {
    q: 'Are implementation and monitoring included in the Audit?',
    a: 'No. The AI Visibility Audit is a standalone paid engagement that delivers measurement, analysis, and a prioritized action roadmap. Implementation support runs as a separately scoped Optimization Sprint, and ongoing monitoring is a separate tailored engagement priced on coverage and cadence.',
  },
];

/**
 * FAQPage structured data is generated from the same array the page renders,
 * so the schema can never disagree with the visible questions and answers.
 * No prices appear anywhere, visible or in schema.
 */
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE.url}/pricing/#faq`,
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero-light relative overflow-hidden">
          <div className="container-x relative py-16 sm:py-20">
            <div className="max-w-3xl">
              <p className="eyebrow mb-3">Pricing</p>
              <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">AI Visibility Pricing</h1>
              <p className="mt-5 text-lg leading-relaxed text-navy/70">
                Signal Harbor does not use one fixed price because the required
                measurement and implementation scope differs by company. Pricing
                is tailored to the buyer questions tested, AI platforms included,
                competitors measured, reporting depth, implementation support,
                and ongoing monitoring requirements.
              </p>
              <p className="mt-4 text-lg font-semibold text-navy">
                Contact us for pricing and a scope tailored to your company.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row" data-cta-zone="pricing-hero">
                <CTAButton href={SITE.bookingUrl} variant="primary">Contact Us for Pricing</CTAButton>
                <CTAButton href={SITE.mailto} variant="outline">Email {SITE.email}</CTAButton>
              </div>
            </div>
          </div>
        </section>

        <Section tone="light">
          <SectionHeading
            tone="light"
            eyebrow="The offers"
            title="What you can engage us for."
            intro="The introductory call is free, and the Snapshot that comes with it is complimentary. The Audit, Optimization Sprint, and Ongoing Monitoring are paid engagements, each priced on its agreed scope."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {offers.map((o) => (
              <div key={o.name} className="card-light lift accent-top flex flex-col">
                <p className={`inline-flex self-start rounded-full px-3 py-1 text-xs font-semibold ${o.paid ? 'bg-navy/[0.06] text-navy/80' : 'bg-[#0369A1]/10 text-[#0369A1]'}`}>
                  {o.tag}
                </p>
                <h3 className="mt-4 text-xl font-bold text-navy">{o.name}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-navy/70">{o.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section tone="ice">
          <SectionHeading
            tone="light"
            eyebrow="Scope drivers"
            title="What affects AI visibility pricing?"
            intro="Eight variables set the scope of an engagement. The introductory call is where we work out which ones matter for your company."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {factors.map((f, i) => (
              <div key={f.name} className="card-light lift">
                <span className="font-sora text-sm font-bold text-[#0369A1]">0{i + 1}</span>
                <h3 className="mt-2 text-base font-bold leading-snug text-navy">{f.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/65">{f.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section tone="light">
          <SectionHeading
            tone="light"
            eyebrow="Process"
            title="How pricing works."
            intro="No paid work starts until you have seen and agreed to a tailored proposal."
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.step} className="card-light lift flex flex-col">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0369A1]/10 font-sora text-sm font-bold text-[#0369A1]">{s.step}</span>
                <h3 className="mt-4 text-base font-bold leading-snug text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/65">{s.desc}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section tone="light">
          <SectionHeading
            tone="light"
            eyebrow="Pricing FAQ"
            title="Common pricing questions."
          />
          <div className="mt-10 max-w-3xl space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-[#E0EAF2] bg-white px-6 py-5 shadow-[0_14px_36px_-26px_rgba(10,22,40,0.35)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-navy [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="flex-none text-[#0369A1] transition-transform group-open:rotate-45" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-navy/70">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="ocean-cta mt-14 flex flex-col gap-6 overflow-hidden rounded-3xl border border-navy/15 p-8 shadow-[0_36px_80px_-40px_rgba(6,35,57,0.7)] lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-white">Get a scope built around your company.</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/75">
                Book the free introductory call, receive your complimentary
                Snapshot, and walk away with a tailored proposal you can
                evaluate before any paid work begins.
              </p>
            </div>
            <div className="flex-none" data-cta-zone="pricing-footer">
              <CTAButton href={SITE.bookingUrl} variant="primary">Contact Us for Pricing</CTAButton>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
