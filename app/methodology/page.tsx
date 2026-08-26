import type { Metadata } from 'next';
import { pageMetadata, OG } from '@/lib/seo';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Measurement from '@/components/Measurement';
import Deliverables from '@/components/Deliverables';
import CTAButton from '@/components/CTAButton';
import { SITE, CTA } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Methodology',
  description:
    'How Signal Harbor measures AI visibility: prompt design, repeated testing, source classification, claim verification, and what you receive.',
  path: '/methodology/',
  image: OG.platform,
  imageAlt: 'Signal Harbor measurement methodology',
});

const steps = [
  ['Define the buyer prompt universe', 'Prompt sets built around category, comparison, alternative, local, and objection questions.'],
  ['Run repeated measurements', 'Test across selected AI systems over a window to observe patterns, not isolated outputs.'],
  ['Extract mentions and citations', 'Capture whether you appear, which competitors appear, which domains are cited, and what the answer claims.'],
  ['Classify source types', 'Group sources into owned, earned, reviews, directories, social, partner, competitor, or unknown.'],
  ['Score visibility and influence', 'Separate basic presence from answer influence.'],
  ['Verify claims', 'Flag unsupported, outdated, or incorrect AI statements for correction.'],
  ['Translate findings into actions', 'Content, source, schema, and messaging fixes tied to observed gaps.'],
];

export default function MethodologyPage() {
  return (
    <>
      <Header />
      <main className="bg-navy">
        <section className="hero-gradient relative overflow-hidden border-b border-white/10">
          <div aria-hidden className="pointer-events-none absolute inset-0 signal-grid opacity-70" />
          <div className="container-x relative py-16 sm:py-20">
            <div className="max-w-3xl">
              <p className="eyebrow mb-3">Methodology</p>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">How Signal Harbor measures AI visibility.</h1>
              <p className="mt-5 text-lg leading-relaxed text-white/75">
                AI answers change over time, so a single screenshot is not
                enough. We run structured, repeated measurements, classify the
                sources shaping answers, verify claims, and translate findings
                into a practical plan.
              </p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="container-x scroll-mt-20 py-16 sm:py-20">
          <p className="eyebrow mb-3">How it works</p>
          <h2 className="text-3xl font-bold tracking-tight text-white">Seven steps, repeated over time.</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {steps.map(([t, d], i) => (
              <li key={t} className="flex gap-4 rounded-2xl border border-white/12 bg-navy-panel p-5">
                <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-blue/15 font-sora text-sm font-bold text-blue ring-1 ring-blue/30">{i + 1}</span>
                <div><h3 className="text-[15px] font-bold text-white">{t}</h3><p className="mt-1 text-sm leading-snug text-white/60">{d}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <div id="measure" className="scroll-mt-20"><Measurement /></div>
        <div id="deliverables" className="scroll-mt-20"><Deliverables /></div>

        <section className="container-x py-16 sm:py-20">
          <div className="flex flex-col gap-4 rounded-3xl border border-blue/25 bg-blue/[0.06] p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">The research behind the method.</h2>
              <p className="mt-2 max-w-xl text-[15px] text-white/65">
                See the external references that inform how we test and
                measure, read the{' '}
                <Link href="/ai-visibility" className="text-blue underline">plain-language guide to AI visibility</Link>, or
                review{' '}
                <Link href="/audit" className="text-blue underline">what the full audit covers</Link>.
              </p>
            </div>
            <div className="flex flex-none gap-3">
              <Link href="/research" className="inline-flex items-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:border-blue/50">View research basis</Link>
              <CTAButton href={SITE.bookingUrl} variant="primary">{CTA.primary}</CTAButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
