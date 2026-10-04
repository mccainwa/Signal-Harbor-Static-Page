import Link from 'next/link';
import CTAButton from './CTAButton';
import { SITE, CTA } from '@/lib/site';

const OUTCOMES = [
  ['01', 'Know where buyers miss you.', 'AI answer evidence, competitors, citations, and accuracy reveal the questions worth winning.'],
  ['02', 'Move from findings to finished decisions.', 'A managed team prepares the campaign and content. Your people review the facts and approve the work.'],
  ['03', 'Measure the change. Improve the next move.', 'Matched retests and connected search and conversion data help measure progress and estimate impact.'],
];

export default function OfferSummary() {
  return <section id="offer" className="bg-canvas"><div className="container-x grid items-center gap-9 pb-14 pt-6 lg:grid-cols-[1fr_1fr] lg:gap-14">
    <div><p className="eyebrow">The work behind better AI discovery</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-[2.35rem]">Your team gets a clear next move.</h2><p className="mt-4 max-w-xl text-base leading-relaxed text-navy/85">The portal, the intelligence, and a managed team working together. Spend less time piecing together tools and more time making your company easier to find and choose.</p><div className="mt-7 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center" data-cta-zone="homepage-program"><CTAButton href={SITE.bookingUrl}>{CTA.primary}</CTAButton><Link href="/services/" className="harbor-text-link font-semibold text-harbor underline underline-offset-4">Explore the managed program <span aria-hidden="true">→</span></Link></div></div>
    <div className="harbor-aura"><ol className="program-outcomes">{OUTCOMES.map(([number,title,body])=><li key={number}><span className="price-value-icon font-sora text-xs font-bold" aria-hidden="true">{number}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol><div className="program-audiences"><Link href="/pricing/">For company marketing teams <span aria-hidden="true">↗</span></Link><Link href="/pricing/#agencies">For agency partners <span aria-hidden="true">↗</span></Link></div></div>
  </div></section>;
}
