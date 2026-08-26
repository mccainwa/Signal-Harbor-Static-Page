import type { Metadata } from 'next';
import { pageMetadata, OG } from '@/lib/seo';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Section, { SectionHeading } from '@/components/Section';
import ServiceLadder from '@/components/ServiceLadder';
import ImplementationModel from '@/components/ImplementationModel';
import CTAButton from '@/components/CTAButton';
import { IconRadar, IconRoute, IconMap, IconShield, IconScale, IconLayers, IconMonitor } from '@/components/icons';
import { SITE, CTA } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'AI Visibility and GEO Services',
  description:
    'AI visibility audits, GEO strategy, citation mapping, accuracy review, vendor accountability, optimization, and ongoing monitoring.',
  path: '/services/',
  image: OG.services,
  imageAlt: 'Signal Harbor AI visibility and GEO services',
});

const services = [
  { id: 'diagnostic', icon: IconRadar, name: 'AI Visibility Diagnostic', desc: 'Repeated prompt testing across selected AI engines, with competitor tracking, mentions, citations, answer patterns, and executive scorecards.', outcome: 'A baseline view of where the brand appears, disappears, or trails competitors.' },
  { id: 'geo-sprint', icon: IconRoute, name: 'GEO Strategy Sprint', desc: 'Prioritized recommendations for content, source structure, schema, entity consistency, earned media, review surfaces, and comparison pages.', outcome: 'A clear plan for improving AI answer visibility and representation.' },
  { id: 'citation-map', icon: IconMap, name: 'Citation & Source Mapping', desc: 'Classification of cited sources into brand-owned, earned, social/community, directories, reviews, and competitor-owned assets.', outcome: 'A map of the sources AI systems rely on when describing the market.' },
  { id: 'accuracy', icon: IconShield, name: 'AI Accuracy & Hallucination Review', desc: 'Detection of unsupported, outdated, incomplete, or incorrect AI claims about the company.', outcome: 'A risk register and correction plan for brand accuracy.' },
  { id: 'vendor', icon: IconScale, name: 'SEO Vendor Accountability Audit', desc: 'Comparison of existing SEO reports and workstreams against AI visibility gaps and search performance exports.', outcome: 'A practical view of where current vendor work helps, misses, or needs redirection.' },
  { id: 'content', icon: IconLayers, name: 'Content & Entity Optimization', desc: 'Execution support for pages, FAQs, comparison content, schema, knowledge-base structure, review/source improvements, and messaging consistency.', outcome: 'Improved machine readability, buyer clarity, and source usefulness.' },
  { id: 'monitoring', icon: IconMonitor, name: 'Ongoing AI Visibility Monitoring', desc: 'Monthly or rolling measurement of prompts, sources, competitors, hallucinations, drift, and new opportunities.', outcome: 'A management rhythm for AI visibility, not a one-time report.' },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <Section tone="navy" id="services-top">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">Services</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">AI visibility and GEO services.</h1>
            <p className="mt-5 text-lg leading-relaxed text-white/75">Each service can stand alone, but the strongest path is audit first, implementation second, monitoring third.</p>
            <p className="mt-4 text-[15px] leading-relaxed text-white/60">
              Signal Harbor is built for companies where being misunderstood or
              excluded from an AI recommendation can affect a high-value buying
              decision: research-heavy purchases, trust-dependent comparisons,
              and high-value customers or contracts.
            </p>
            <div className="mt-7"><CTAButton href={SITE.bookingUrl} variant="primary">{CTA.audit}</CTAButton></div>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
              <div key={s.id} id={s.id} className="card-dark scroll-mt-24 rounded-2xl border border-white/12 p-7">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue/10 text-blue ring-1 ring-blue/25"><Icon size={22} /></span>
                  <span className="font-sora text-sm font-bold text-white/60">0{i + 1}</span>
                </div>
                <h2 className="mt-4 text-xl font-bold text-white">{s.name}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">{s.desc}</p>
                <p className="mt-4 border-t border-white/10 pt-3 text-sm text-white/65"><span className="font-semibold text-white">Outcome:</span> {s.outcome}</p>
                {s.id === 'diagnostic' && (
                  <p className="mt-3 text-sm">
                    <Link href="/audit" className="font-semibold text-blue underline">Full audit details</Link>
                  </p>
                )}
              </div>
              );
            })}
          </div>
        </Section>
        <ServiceLadder />
        <ImplementationModel />
        <Section tone="navy-deep" id="pricing">
          <div className="flex flex-col gap-6 rounded-3xl border border-blue/25 bg-blue/[0.06] p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Pricing"
                title="Priced on scope, not a rate card."
                intro="Every engagement is scoped to the buyer questions, platforms, competitors, and deliverables your situation requires. See what affects AI visibility pricing and how the proposal process works."
              />
            </div>
            <div className="flex flex-none flex-col gap-3 sm:flex-row">
              <CTAButton href="/pricing" variant="primary">See How Pricing Works</CTAButton>
              <CTAButton href={SITE.bookingUrl} variant="secondary">{CTA.audit}</CTAButton>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
