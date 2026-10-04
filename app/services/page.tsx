import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata, OG } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import ProgramLoop from '@/components/ProgramLoop';
import Responsibilities from '@/components/Responsibilities';
import ReadingDetail from '@/components/ReadingDetail';
import FinalCTA from '@/components/FinalCTA';
import Wave, { TONE } from '@/components/Wave';
import { SITE, OFFER } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'AI Search Optimization and GEO Services',
  description: 'Managed GEO and AI search optimization services with campaign planning, content, Signal Harbor AI, connected analytics, and discovery attribution.',
  path: '/services/', image: OG.services, imageAlt: 'Signal Harbor managed AI search optimization services',
});
const SUMMARY = 'Managed AI search optimization and GEO services for middle market and enterprise companies. We find where AI overlooks you, prepare content to address the gaps, and connect AI visibility, organic discovery, and attribution in your client portal.';
const NEEDS = [
  { id: 'diagnostic', title: 'Know where you stand.', text: 'Buyer questions, competitor mentions, and cited sources make the gaps clear.', area: 'Insights' },
  { id: 'content', title: 'Get the work moving.', text: 'A campaign plan and prepared content give your team something concrete to review.', area: 'Campaign' },
  { id: 'progress', title: 'Keep everyone aligned.', text: 'Approvals, publication records, AI visibility, and connected search and conversion data stay together.', area: 'Campaign and Results' },
];
const TERMS = [
  ['Generative engine optimization (GEO)', 'Improve how AI platforms describe, compare, and recommend your company through the facts, pages, and sources their answers draw on.'],
  ['Answer engine optimization (AEO)', 'Make content easy for answer systems to find, interpret, and quote: direct answers, clear definitions, and consistent terms.'],
  ['Search engine optimization (SEO)', 'Help search engines discover and rank your pages. GEO and AEO extend that work to what AI answers say and recommend.'],
];
const link = 'font-semibold text-harbor underline decoration-harbor/40 underline-offset-4 hover:decoration-harbor';
const serviceLd = {
  '@context': 'https://schema.org', '@type': 'Service', '@id': SITE.url + '/services/#service',
  name: 'Managed AI search optimization', serviceType: 'AI search optimization services', description: SUMMARY,
  url: SITE.url + '/services/', provider: { '@id': SITE.url + '/#organization' },
  audience: { '@type': 'BusinessAudience', audienceType: 'Middle market and enterprise marketing teams' },
};
export default function ServicesPage() {
  return <><Header /><main>
    <PageHero id="services-top" zone="services-hero" eyebrow="Managed program" title="A clear path from AI search gaps to action." intro={<p>{SUMMARY}</p>} secondary={{ label: 'See the client portal', href: '/platform/' }} />
    <Wave top="#EDF7FC" bottom={TONE.light} />
    <section id="problems" className="soft-aura bg-canvas"><div className="container-x py-12 sm:py-14">
      <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-navy sm:text-[2.35rem]">More clarity. Less work on your team.</h2>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">{NEEDS.map(n => <li key={n.id} id={n.id} className="card-light !p-6"><p className="portal-kicker">{n.area}</p><h3 className="mt-3 text-xl font-bold text-navy">{n.title}</h3><p className="mt-3 text-base leading-relaxed text-navy/75">{n.text}</p></li>)}</ul>
    </div></section>
    <section id="how-it-runs" className="bg-mist"><div id="monitoring" className="container-x py-12 sm:py-14">
      <p className="eyebrow">One connected program</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-[2.35rem]">Six steps. One continuous loop.</h2>
      <div className="mt-8"><ProgramLoop /></div>
    </div></section>
    <section className="bg-canvas"><div className="container-x py-12 sm:py-14">
      <ReadingDetail id="geo-sprint" title="How GEO, AEO, and SEO work together">
        <div className="p-6"><dl className="grid gap-6 md:grid-cols-3">{TERMS.map(([term, def]) => <div key={term}><dt className="font-sora text-base font-bold text-navy">{term}</dt><dd className="mt-3 text-base leading-relaxed text-navy/75">{def}</dd></div>)}</dl><p className="mt-6"><Link href="/ai-visibility/" className={link}>Read the guide to AI visibility</Link></p></div>
      </ReadingDetail>
      <ReadingDetail id="demand-generation" title="How AI visibility supports demand generation">
        <div className="p-6"><p className="max-w-3xl text-base leading-relaxed text-navy/80">Lead generation begins with buyers discovering and considering your company. AI answers can shape that shortlist before a prospect visits your site. The program focuses your content marketing on the questions those buyers ask, the claims they need to trust, and the comparisons they use to make a decision.</p><p className="mt-5"><Link href="/audit/" className={link}>Explore the buyer questions behind your AI visibility audit</Link></p></div>
      </ReadingDetail>
      <ReadingDetail id="connected-intelligence" title="Signal Harbor AI, agents, and data connections">
        <div className="p-6"><p className="max-w-3xl text-base leading-relaxed text-navy/80">The program includes Signal Harbor AI for context-aware content work and Agent Connections for permissioned access from your preferred agents. Google Analytics 4 and Google Search Console connect traffic sources, organic search discovery, and tracked conversions with the evidence behind your campaign.</p><p className="mt-5"><Link href="/platform/#connections" className={link}>Explore connected discovery and attribution</Link></p></div>
      </ReadingDetail>
      <ReadingDetail id="responsibilities" title="How we work with your team and agency">
        <div className="p-6"><p className="mb-6 max-w-2xl text-base leading-relaxed text-navy/75">Signal Harbor operates the program. Your team makes the decisions, and existing partners retain the work agreed for them.</p><Responsibilities tone="ice" /></div>
      </ReadingDetail>
      <div id="pricing" className="mt-10 rounded-2xl border-[1.5px] border-[#BED8E7] bg-white p-6 sm:p-8"><h2 className="text-2xl font-bold text-navy">A program built around your buyers.</h2><p className="mt-3 max-w-3xl text-base leading-relaxed text-navy/85">For company marketing teams and agency partners: research, campaign planning, prepared content, connected intelligence, and a managed team to keep the work moving.</p><div className="mt-5 flex flex-wrap gap-x-7 gap-y-3"><Link href="/pricing/" className={link}>Explore the company pilot</Link><Link href="/pricing/#agencies" className={link}>Explore agency partnerships</Link></div></div>
    </div></section>
    <Wave top={TONE.light} bottom={TONE.light} /><FinalCTA />
  </main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} /></>;
}
