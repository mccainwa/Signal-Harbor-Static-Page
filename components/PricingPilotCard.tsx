import CTAButton from './CTAButton';
import PilotTerms from './PilotTerms';
import { SITE, CTA, OFFER } from '@/lib/site';

const INCLUDED = [
  'AI visibility audits across 8 answer platforms',
  '1 campaign plan every month',
  '5 content templates every week',
  'Signal Harbor AI and Agent Connections',
  'Google Analytics, Search Console, and attribution',
  'Client portal, review, approvals, and publication handoff',
];
export default function PricingPilotCard() {
  return <div className="harbor-aura">
    <article id="company-pilot" aria-labelledby="company-pilot-title" className="relative overflow-hidden rounded-2xl border-[1.5px] border-[#8AC7E0] bg-raised shadow-[0_24px_50px_-30px_rgba(3,105,161,0.3)]">
      <div className="ocean-cta relative border-t-[3px] border-blue px-6 py-7 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3"><h2 id="company-pilot-title" className="text-xl font-bold text-white">{OFFER.name}</h2><span className="founding-badge">{OFFER.rateLabel}</span></div>
        <p className="mt-2 text-sm text-fog">For middle market and enterprise companies</p>
        <p className="mt-5 flex flex-wrap items-baseline gap-x-3 text-white"><span className="font-sora text-5xl font-extrabold leading-none tracking-[-0.03em] sm:text-6xl">{OFFER.price}</span><span className="text-base font-semibold text-fog">{OFFER.priceUnit}</span></p>
        <p className="mt-4 text-sm leading-relaxed text-fog">The client portal and the team running your AI search program, together.</p>
      </div>
      <div className="px-6 py-6 sm:px-8">
        <PilotTerms showRate={false} />
        <h3 className="mt-6 text-base font-bold text-navy">The platform and a managed team.</h3>
        <ul className="mt-4 space-y-3">{INCLUDED.map(item => <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-navy/85"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0369A1" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-none" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" /></svg>{item}</li>)}</ul>
        <div className="mt-6" data-cta-zone="pricing-pilot"><CTAButton href={SITE.bookingUrl} className="w-full">{CTA.primary}</CTAButton></div>
        <p className="mt-3 text-center text-xs leading-relaxed text-navy/75">Start with a complimentary AI Visibility Snapshot and live portal demo.</p>
      </div>
    </article>
  </div>;
}
