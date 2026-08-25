import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Section, { SectionHeading } from '@/components/Section';
import CTAButton from '@/components/CTAButton';
import FinalCTA from '@/components/FinalCTA';
import { SITE, CTA } from '@/lib/site';

export const metadata: Metadata = {
  title: 'What Is AI Visibility?',
  description:
    'AI visibility is how AI platforms describe, compare, and recommend your company. A plain-language guide to GEO, AEO, and how to improve the answers.',
  alternates: { canonical: '/ai-visibility/' },
};

const whyItMatters = [
  {
    t: 'Buyers ask AI before they ask you',
    d: 'People use AI assistants to compare options, summarize providers, and draft shortlists before they visit a single website. The answers shape which companies get considered at all.',
  },
  {
    t: 'The answers steer real decisions',
    d: 'When an AI platform recommends three providers and your company is not one of them, that opportunity ends before your analytics record anything.',
  },
  {
    t: 'Nobody is accountable for the answer',
    d: 'AI systems compose answers from public sources. If those sources are thin, wrong, or outdated, the answer inherits the problem, and no one notifies you.',
  },
  {
    t: 'It can be measured and improved',
    d: 'AI visibility is observable. Ask the questions your buyers ask, record the answers, trace the sources, fix what is fixable, and measure whether the result moved.',
  },
];

const failureModes = [
  {
    t: 'Missing visibility',
    d: 'Buyers ask a relevant question and your company does not appear. The recommendation goes to whoever does, and nothing alerts you to an answer you were never in.',
  },
  {
    t: 'Incorrect facts',
    d: 'The answer states something untrue about your products, pricing, or capabilities. Buyers rarely verify it, and a wrong fact stated confidently reads exactly like a right one.',
  },
  {
    t: 'Unsupported claims',
    d: 'The answer asserts something no credible source supports. Even a flattering invented claim is a risk, because it sets expectations your company never agreed to.',
  },
  {
    t: 'Outdated information',
    d: 'The answer describes the company you were years ago. Old positioning, retired products, and superseded prices persist in AI answers long after your website moved on.',
  },
  {
    t: 'Weak recommendation positioning',
    d: 'Your company appears, but only as a mention. The active recommendation goes elsewhere. Being named is not the same as being chosen, and the difference is measurable.',
  },
  {
    t: 'Competitor preference',
    d: 'The answer consistently recommends a competitor for questions you should win. There is usually a reason in the sources, and it can be found and worked on.',
  },
  {
    t: 'Inconsistent answers',
    d: 'Different platforms describe you differently, or the same question gets different answers on different days. Inconsistency is itself a finding, and it is why one answer is never a result.',
  },
];

const disciplines = [
  {
    abbr: 'SEO',
    name: 'Search engine optimization',
    d: 'The established practice of improving how your website ranks in search results. SEO still matters, and the public content it produces is part of what AI systems read when they compose an answer.',
  },
  {
    abbr: 'GEO',
    name: 'Generative Engine Optimization',
    d: 'The practice of improving how generative AI systems describe and recommend a company in the answers they produce. GEO works on the facts, evidence, and sources those systems draw on.',
  },
  {
    abbr: 'AEO',
    name: 'Answer Engine Optimization',
    d: 'The practice of structuring content so systems that return direct answers can find, interpret, and reuse it accurately: clear definitions, direct answers to real questions, and consistent terminology.',
  },
];

const wrongSteps = [
  ['Capture the answer', 'Record the question, the platform, the date, and the exact statement. A wrong answer you cannot reproduce is an anecdote, not a finding.'],
  ['Confirm it repeats', 'Run the same question several times over several days. AI answers vary, and a one-off error matters less than one that appears consistently.'],
  ['Trace the likely sources', 'Most wrong statements echo a public source. Find the pages, profiles, or articles that carry the same error, because that is usually where the fix lives.'],
  ['Fix the sources you control', 'Update your website, documentation, and official profiles so the correct fact is easy to find and unambiguous.'],
  ['Pursue corrections you do not control', 'Directories, review sites, and articles can often be corrected on request. Prioritize the sources that appear most often alongside the error.'],
  ['Retest on a schedule', 'Corrections take time to reach AI answers, and platforms update on their own cadence. Rerun the same questions periodically and record whether the error persists.'],
];

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE.url}/ai-visibility/#webpage`,
      name: 'What is AI visibility?',
      url: `${SITE.url}/ai-visibility/`,
      description:
        'AI visibility is how AI platforms describe, compare, and recommend your company. A plain-language guide to GEO, AEO, and how to improve the answers.',
      isPartOf: { '@id': `${SITE.url}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: 'What is AI visibility?', item: `${SITE.url}/ai-visibility/` },
      ],
    },
  ],
};

export default function AiVisibilityPage() {
  return (
    <>
      <Header />
      <main>
        <Section tone="navy">
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">AI visibility explained</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">What is AI visibility?</h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              AI visibility is how often, how accurately, and how favorably AI
              platforms present your company when buyers ask them to compare
              options or recommend providers. A company with strong AI
              visibility appears in the relevant answers, is described
              correctly, and is recommended to the right buyers. A company with
              weak AI visibility is absent, described inaccurately, or passed
              over for competitors.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
              The term covers more than presence. Whether the description is
              accurate, whether the recommendation is won or lost, and which
              sources shape the answer are all part of the same question.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton href={SITE.bookingUrl} variant="primary">{CTA.primary}</CTAButton>
              <CTAButton href="/methodology" variant="secondary">How we measure it</CTAButton>
            </div>
          </div>
        </Section>

        <Section tone="light">
          <SectionHeading
            tone="light"
            eyebrow="Why it matters"
            title="The shortlist forms before anyone contacts you."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {whyItMatters.map((item, i) => (
              <div key={item.t} className="flex gap-4">
                <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-navy/[0.06] font-sora text-sm font-bold text-navy/60">{i + 1}</span>
                <div>
                  <h3 className="text-base font-bold text-navy">{item.t}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-navy/65">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section tone="navy-deep">
          <SectionHeading
            eyebrow="Where AI answers go wrong"
            title="Seven ways an answer can work against you."
            intro="These are distinct problems with distinct fixes. A useful measurement separates them rather than reporting one blended score."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {failureModes.map((m) => (
              <div key={m.t} className="card-dark rounded-2xl border border-white/12 p-6">
                <h3 className="text-base font-bold text-white">{m.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{m.d}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section tone="light">
          <SectionHeading
            tone="light"
            eyebrow="The terms people search for"
            title="SEO, GEO, and AEO in plain language."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {disciplines.map((d) => (
              <div key={d.abbr} className="card-light accent-top flex flex-col">
                <span className="font-sora text-sm font-bold tracking-wider text-blue">{d.abbr}</span>
                <h3 className="mt-2 text-lg font-bold text-navy">{d.name}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-navy/65">{d.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl rounded-2xl border border-navy/10 bg-white p-6 text-[15px] leading-relaxed text-navy/70">
            The three overlap without being interchangeable. Strong search
            optimization gives AI systems crawlable, credible material to draw
            on. Generative Engine Optimization and Answer Engine Optimization
            extend that work to how answers are composed and whether they are
            accurate. None of them replaces the others, and each rewards the
            same thing: clear, verifiable, current public information.
          </p>
        </Section>

        <Section tone="navy">
          <SectionHeading
            eyebrow="When the answer is wrong"
            title="What to do when AI platforms get your company wrong."
            intro="There is no correction hotline for an AI answer. The durable fix is almost always in the sources the platforms read, which is work you can plan and verify."
          />
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {wrongSteps.map(([t, d], i) => (
              <li key={t} className="flex gap-4 rounded-2xl border border-white/12 bg-navy-panel p-5">
                <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-blue/15 font-sora text-sm font-bold text-blue ring-1 ring-blue/30">{i + 1}</span>
                <div>
                  <h3 className="text-[15px] font-bold text-white">{t}</h3>
                  <p className="mt-1 text-sm leading-snug text-white/60">{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-white/60">
            Signal Harbor runs this as a managed process: repeated measurement
            across AI platforms, source and claim review, and a prioritized
            plan. Read the{' '}
            <Link href="/methodology" className="text-blue underline">methodology</Link> for how
            measurement works, or start with a{' '}
            <Link href="/snapshot" className="text-blue underline">complimentary snapshot</Link> of
            where you stand today.
          </p>
        </Section>

        <FinalCTA />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
