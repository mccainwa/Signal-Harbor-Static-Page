import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata, OG } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PricingPilotCard from '@/components/PricingPilotCard';
import ProviderLogos from '@/components/ProviderLogos';
import FinalCTA from '@/components/FinalCTA';
import OfferComparison from '@/components/OfferComparison';
import PilotScope from '@/components/PilotScope';
import DiscoveryConnections from '@/components/DiscoveryConnections';
import AgencyPlanCard from '@/components/AgencyPlanCard';
import { SITE, OFFER } from '@/lib/site';

const PILOT_SUMMARY = `${OFFER.price} ${OFFER.priceUnit} with a ${OFFER.minimum} and a ${OFFER.pilot.toLowerCase()}.`;
export const metadata: Metadata = pageMetadata({
  title: 'AI Visibility Pricing for Companies and Agencies',
  description: `Managed AI visibility for companies and agencies. Company founding rate: ${PILOT_SUMMARY} Agency partnerships: contact for pricing.`,
  path: '/pricing/', image: OG.pricing, imageAlt: 'Signal Harbor managed AI visibility company pilot',
});
const VALUE = [
  ['01', 'Find where buyers miss you.', 'Understand who gets mentioned, which sources influence answers, and where your company is misrepresented.'],
  ['02', 'Turn the evidence into content.', 'Get a monthly campaign plan and weekly content templates your team can review and use.'],
  ['03', 'Connect discovery to business outcomes.', 'AI visibility, SEO discovery, traffic sources, and tracked conversions come together in your client portal.'],
];
const COMMITMENT = [
  { when: 'First 90 days', what: `Your minimum commitment is ${OFFER.firstTerm} in total at ${OFFER.price} ${OFFER.priceUnit}.` },
  { when: 'Your choice at day 90', what: 'Stop or continue. The monthly rate stays the same.' },
  { when: 'Through month six', what: `The six month full pilot is ${OFFER.fullPilot} if you complete all six months.` },
];
const faqs = [
  { q: 'How much does Signal Harbor cost?', a: `For companies, the founding partner rate is ${PILOT_SUMMARY} That is ${OFFER.firstTerm} across the first three months, and ${OFFER.fullPilot} if you complete all six months. Agency partnerships are priced separately.` },
  { q: 'What does the company pilot include?', a: 'Eight-platform AI visibility audits, competitor and source analysis, company claim review, one campaign plan per month, and five content templates per week. The offer includes Signal Harbor AI, Agent Connections, Google Analytics 4, Google Search Console, and connected attribution. Your client portal brings Insights, Campaign, review, approvals, publication records, and Results together.' },
  { q: 'Is six months the minimum commitment?', a: 'No. The minimum commitment is 90 days. Six months is the length of the full pilot. After the first 90 days, you choose whether to stop or continue at the same monthly rate.' },
  { q: 'What happens after the first 90 days?', a: `You can stop once the 90 day minimum commitment is complete, or continue at the same monthly rate of ${OFFER.price} ${OFFER.priceUnit} through the six month full pilot.` },
  { q: 'What does the founding partner rate mean?', a: `The ${OFFER.price} monthly rate is the offer for companies joining at Signal Harbor's founding stage. Future program pricing will reflect a broader platform and delivery scope. Your six month full pilot remains at ${OFFER.price} per month, with a 90 day minimum commitment.` },
  { q: 'How is this different from buying an AI visibility tool?', a: 'Signal Harbor combines the client portal with a managed program. We interpret the audit evidence, prioritize the campaign, and prepare weekly content templates for your team. Your team reviews the facts and approves the specific version. The program connects that work to publication records and agreed measures.' },
  { q: 'Are Signal Harbor AI and Agent Connections included?', a: 'Yes. Signal Harbor AI supports content work using your company facts, brand preferences, and campaign context. Agent Connections give Claude, Codex, and compatible agents permissioned access to approved context and work. Your team retains human review and final approval.' },
  { q: 'Which data connections are included?', a: 'Google Analytics 4 and Google Search Console. Connect the properties selected for your program to bring traffic sources, landing pages, engagement, conversion events, and organic query and page performance into the client portal.' },
  { q: 'How does attribution work?', a: 'We establish the baseline, record published changes, and remeasure the same buyer questions and AI platforms. We combine visibility changes with Search Console discovery, identified AI referrals, landing pages, and tracked conversion events to estimate impact. Estimates show their evidence and assumptions separately from recorded outcomes, helping your team judge progress and choose the next move.' },
  { q: 'How much monitoring and AI usage do we need?', a: 'The pilot covers eight AI answer platforms. Before work starts, we confirm your buyer question set, markets, collection cadence, and AI workflow needs around the business priorities you want to address.' },
  { q: 'How does access work for our team?', a: 'Named team access and permissioned agent connections keep company context and campaign work in the right hands. Your reviewers confirm facts, request changes, and approve the specific version prepared for publication.' },
  { q: 'Who publishes the approved work?', a: 'Publication is agreed for your engagement. Your team, your agency, or another agreed owner publishes the approved version, and the portal records the published URL and date.' },
  { q: 'How do we follow progress?', a: 'Insights shows AI answers, competitors, citations, and accuracy. Campaign connects prepared work and approvals. Google Analytics 4 and Search Console bring traffic sources, organic discovery, landing-page performance, and tracked conversions into Results, alongside publication records and the program baseline.' },
  { q: 'How is agency pricing set?', a: 'Agency partnerships show Contact for pricing. The quote depends on the number of client companies, any custom portal requirements and their costs, and the scope of the engagement.' },
  { q: 'Are the Snapshot and demo complimentary?', a: 'Yes. The introductory call, AI Visibility Snapshot, and live portal demo are complimentary. We review how AI describes your company, show how the platform and managed team work together, and discuss the right next move. The company pilot and agency partnerships are paid engagements.' },
];
const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', '@id': `${SITE.url}/pricing/#faq`, mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
const serviceLd = { '@context': 'https://schema.org', '@type': 'Service', '@id': `${SITE.url}/pricing/#company-pilot`, name: OFFER.name, serviceType: 'Managed AI search visibility program', provider: { '@id': `${SITE.url}/#organization` }, url: `${SITE.url}/pricing/`, offers: { '@type': 'Offer', priceCurrency: 'USD', price: OFFER.priceValue, priceSpecification: { '@type': 'UnitPriceSpecification', price: OFFER.priceValue, priceCurrency: 'USD', unitText: 'MONTH', referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' } }, description: PILOT_SUMMARY } };
const agencyLd = { '@context': 'https://schema.org', '@type': 'Service', '@id': `${SITE.url}/pricing/#agencies`, name: 'Agency partnership', serviceType: 'Managed AI search visibility agency partnership', provider: { '@id': `${SITE.url}/#organization` }, url: `${SITE.url}/pricing/#agencies`, description: 'AI visibility programs, managed campaign support, AI and agent connections, connected analytics and attribution, and custom portal needs for agency partners. Contact for pricing based on client count, portal requirements and costs, and scope.' };
const link = 'harbor-text-link font-semibold text-harbor underline decoration-harbor/40 underline-offset-4';

export default function PricingPage() {
  return <><Header /><main>
    <section className="hero-light relative overflow-hidden" aria-labelledby="pricing-title">
      <div className="pricing-story-grid container-x py-12 sm:py-16">
        <div className="pricing-intro">
          <p className="eyebrow">AI visibility program pricing</p>
          <h1 id="pricing-title" className="mt-4 text-4xl font-extrabold leading-[1.12] tracking-tight text-navy sm:text-5xl">Help AI find you.<br /><span className="text-tint">Give buyers a reason to choose you.</span></h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy/80">Make AI search part of your lead generation strategy. We find where buyers miss you, prepare the content to address the gaps, and keep the work moving in your client portal.</p>
          <nav aria-label="Choose your program" className="pricing-audience-links mt-6"><Link href="#company-pilot">For companies <span aria-hidden="true">↓</span></Link><Link href="#agencies">For agencies <span aria-hidden="true">↓</span></Link></nav>
        </div>
        <div className="pricing-offer pricing-plans"><PricingPilotCard /><AgencyPlanCard /></div>
        <div className="pricing-value">
          <div className="price-value-list">{VALUE.map(([n, title, body]) => <div key={n} className="price-value-item"><span className="price-value-icon font-sora text-xs font-bold" aria-hidden="true">{n}</span><div><h2 className="text-base font-bold text-navy">{title}</h2><p className="mt-1 max-w-md text-sm leading-relaxed text-navy/80">{body}</p></div></div>)}</div>
          <p className="mt-7 text-sm"><Link href="/platform/" className={link}>Explore the client portal <span aria-hidden="true">↗</span></Link></p>
        </div>
      </div>
    </section>

    <section id="included" className="bg-canvas" aria-labelledby="included-title"><div className="container-x py-12 sm:py-14">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">Included in your company pilot</p><h2 id="included-title" className="mt-3 text-3xl font-bold tracking-tight text-navy">A clear plan. A steady flow of work.</h2></div><Link href="/services/#how-it-runs" className={link}>See how it runs <span aria-hidden="true">→</span></Link></div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="pricing-inclusion"><p className="pricing-inclusion-number">8</p><h3 className="mt-2 text-lg font-bold text-navy">AI answer platforms</h3><p className="mt-3 text-sm leading-relaxed text-navy/80">Audit the answers buyers encounter, the competitors they see, and the sources behind them.</p></div>
        <div className="pricing-inclusion"><p className="pricing-inclusion-number">1 <span className="text-sm font-semibold">per month</span></p><h3 className="mt-2 text-lg font-bold text-navy">Campaign plan</h3><p className="mt-3 text-sm leading-relaxed text-navy/80">Turn evidence into priorities tied to your product, audience, and business goals.</p></div>
        <div className="pricing-inclusion"><p className="pricing-inclusion-number">5 <span className="text-sm font-semibold">per week</span></p><h3 className="mt-2 text-lg font-bold text-navy">Content templates</h3><p className="mt-3 text-sm leading-relaxed text-navy/80">Prepared from your company facts, with creative and distribution guidance for your team.</p></div>
      </div>
      <div className="mt-8 grid gap-7 border-t-[1.5px] border-[#BED8E7] pt-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
        <div><h3 className="text-lg font-bold text-navy">Meet buyers across AI search.</h3><div className="mt-4"><ProviderLogos /></div><p className="mt-4 text-sm leading-relaxed text-navy/80">Branded and unbranded buyer questions. Competitor presence. Citation and source influence. Claim accuracy. SEO, AEO, and GEO priorities.</p></div>
        <div><h3 className="text-lg font-bold text-navy">Your portal keeps the work moving.</h3><p className="mt-3 text-sm leading-relaxed text-navy/80">Review prepared pages, FAQs, comparison content, and other campaign templates. Request changes, approve a version, and follow publication and results.</p><div className="portal-mini-path"><span>Insights</span><i /><span>Campaign</span><i /><span>Results</span></div><p className="text-sm text-navy/80">Your team keeps control of the facts and final approvals.</p></div>
      </div>
      <PilotScope />
    </div></section>

    <OfferComparison />

    <DiscoveryConnections />

    <section id="commitment" className="bg-canvas"><div className="container-x py-12 sm:py-14">
      <p className="eyebrow mb-3">Join at the founding stage</p><h2 className="text-3xl font-bold tracking-tight text-navy">Start with 90 days. Continue on your terms.</h2><p className="mt-4 max-w-3xl text-base leading-relaxed text-navy/85">Your full pilot stays at the founding partner rate. Future program pricing will reflect the platform and delivery scope as Signal Harbor expands.</p><ol className="commitment-line mt-9">{COMMITMENT.map(c => <li key={c.when}><h3 className="text-lg font-bold text-navy">{c.when}</h3><p className="mt-3 text-sm leading-relaxed text-navy/80">{c.what}</p></li>)}</ol>
    </div></section>

    <section id="faq" className="bg-canvas"><div className="container-x grid gap-8 pb-12 sm:pb-16 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
      <div><h2 className="text-3xl font-bold tracking-tight text-navy">Before we get started.</h2><p className="mt-4 text-base leading-relaxed text-navy/80">The terms, the work, and how your team stays in control. <Link href="/faq/" className={link}>Visit the full FAQ</Link>.</p></div>
      <div className="divide-y divide-[#BED8E7] border-y border-[#BED8E7]">{faqs.map(f => <details key={f.q} className="group"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-semibold text-navy [&::-webkit-details-marker]:hidden">{f.q}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="flex-none text-harbor transition-transform group-open:rotate-45" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg></summary><p className="pb-4 text-sm leading-relaxed text-navy/80">{f.a}</p></details>)}</div>
    </div></section>
    <FinalCTA />
  </main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(agencyLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} /></>;
}
