import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata, OG } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import FinalCTA from '@/components/FinalCTA';
import Wave, { TONE } from '@/components/Wave';
import MethodSteps from '@/components/MethodSteps';
import Measurement from '@/components/Measurement';
import MethodRetest from '@/components/MethodRetest';
import MethodSignals from '@/components/MethodSignals';
import MethodDelivery from '@/components/MethodDelivery';
import ReadingDetail from '@/components/ReadingDetail';

export const metadata: Metadata = pageMetadata({
  title: 'AI Visibility Measurement Methodology',
  description:
    'How Signal Harbor measures AI visibility: fixed buyer questions, repeated answers, recorded evidence, separate measures, and matched retests after publication.',
  path: '/methodology/',
  image: OG.platform,
  imageAlt: 'Signal Harbor AI visibility measurement methodology',
});

const principles: [term: string, detail: string][] = [
  ['Fixed buyer questions', 'The same question set for the baseline and the retest'],
  ['Repeated answers', 'Each question asked more than once on each AI platform'],
  ['Recorded evidence', 'Every answer stored with its sources and conditions'],
];

const onThisPage: [label: string, href: string][] = [
  ['Measurement steps', '#how-it-works'],
  ['Four measures', '#measure'],
  ['Matched retest', '#matched-retest'],
  ['Search and analytics', '#signals'],
  ['Where you see the evidence', '#deliverables'],
];

const linkOnLight = 'font-semibold text-harbor underline decoration-harbor/40 underline-offset-4 hover:decoration-harbor';

export default function MethodologyPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Methodology"
          title="How we measure AI visibility and change."
          intro={
            <p>
              Fixed buyer questions. Repeated answers. Recorded evidence. We measure mentions,
              recommendations, citations, and accuracy separately, then compare like with like.
            </p>
          }
          secondary={{ label: 'See the client portal', href: '/platform/' }}
          zone="methodology-hero"
        >
          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            {principles.map(([term, detail]) => (
              <div key={term} className="rounded-xl border border-harbor/15 bg-white/80 px-4 py-3.5">
                <dt className="text-base font-bold text-navy">{term}</dt>
                <dd className="mt-1 text-sm leading-snug text-navy/70">{detail}</dd>
              </div>
            ))}
          </dl>
        </PageHero>

        <nav aria-label="On this page" className="border-b border-navy/[0.08] bg-raised">
          <div className="container-x flex flex-wrap items-center gap-x-6 gap-y-2 py-4">
            <span className="text-sm font-semibold text-navy/75">On this page</span>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {onThisPage.map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="text-[15px] font-semibold text-harbor underline-offset-4 hover:underline">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <Measurement />
        <section className="bg-canvas" aria-labelledby="method-research">
          <div className="container-x py-12 sm:py-14">
            <div className="mb-10">
              <p className="eyebrow mb-3">Explore the method</p>
              <ReadingDetail id="how-it-works" title="From buyer questions to campaign priorities">
                <MethodSteps embedded />
              </ReadingDetail>
              <ReadingDetail id="matched-retest" title="How we compare the baseline and retest">
                <MethodRetest embedded />
              </ReadingDetail>
              <ReadingDetail id="signals" title="How search and analytics fit into measurement">
                <MethodSignals embedded />
              </ReadingDetail>
              <ReadingDetail id="deliverables" title="Where your team sees the evidence">
                <MethodDelivery embedded />
              </ReadingDetail>
            </div>
            <h2 id="method-research" className="text-2xl font-bold tracking-tight text-navy">The research behind the method.</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-navy/80">
              Read{' '}
              <Link href="/research/" className={linkOnLight}>the research references that inform how we test</Link>,
              the{' '}
              <Link href="/ai-visibility/" className={linkOnLight}>plain language guide to AI visibility</Link>, or{' '}
              <Link href="/audit/" className={linkOnLight}>how the AI visibility audit works</Link>.
            </p>
          </div>
        </section>
        <Wave top={TONE.light} bottom={TONE.light} />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
