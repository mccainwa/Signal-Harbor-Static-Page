import Link from 'next/link';
import { OFFER } from '@/lib/site';
import { MARKET_BENCHMARK as BENCHMARK } from '@/lib/marketBenchmark';

const money = (n: number) => `$${n.toLocaleString('en-US')}`;
const ROWS = [
  { label: 'Who runs the program', own: ['Managed by Signal Harbor', 'We interpret the evidence, plan the campaign, and prepare the work.'], managed: ['Agency-managed delivery', 'A service team runs the optimization program.'], software: ['Your team runs the program', 'Your people use the platform to research, create, and manage the work.'] },
  { label: 'AI search research', own: ['8 platforms + source and accuracy analysis', 'Buyer questions, competitor presence, citations, and company claim review.'], managed: ['AI search audits and optimization', 'Platform coverage and research depth are defined by the service package.'], software: ['Answer monitoring and analytics', 'Prompt, citation, competitor, and brand analysis tools.'] },
  { label: 'Marketing work prepared', own: ['5 content templates every week', '1 campaign plan every month, grounded in your company facts.'], managed: ['Monthly content or asset allocations', 'Delivery formats and quantities depend on the selected retainer.'], software: ['Content and agent tools', 'Your team builds and operates the content workflows.'] },
  { label: 'AI and connected data', own: ['AI assistant, agents, GA4, and Search Console', 'Signal Harbor AI and Agent Connections share the context behind your campaign.'], managed: ['Agency tools and delivery workspace', 'The agency selects its technology and client delivery model.'], software: ['AI tools and integration features', 'Capabilities and usage are packaged with the platform.'] },
  { label: 'Discovery and attribution', own: ['AI referrals, SEO discovery, and conversions', 'Connected analytics link traffic sources and landing pages with tracked conversion events.'], managed: ['Campaign performance measurement', 'The program includes its own measurement and review process.'], software: ['Analytics and attribution features', 'Your team connects data and interprets the results.'] },
  { label: 'Client control', own: ['Version-specific approvals in your portal', 'Review previews, request changes, and hand off the approved version for publication.'], managed: ['Client and agency review process', 'The review and delivery workflow is defined by the engagement.'], software: ['Your internal review process', 'Your team owns approvals and publishing responsibilities.'] },
  { label: 'Initial commitment', own: ['90 day minimum commitment', 'Six month full pilot; continue at the same monthly rate or stop after 90 days.'], managed: ['No minimum to 12 months', 'Terms across the three researched managed plans.'], software: ['Subscription or enterprise terms', 'Monthly, annual, or negotiated platform agreements.'] },
];
const APPROACHES = [
  { id: 'managed', label: 'Managed programs', name: 'Managed-program benchmark', plan: 'Selected published plans', price: money(BENCHMARK.roundedMean), unit: 'average per month, rounded' },
  { id: 'software', label: 'AI visibility software', name: 'AI visibility software', plan: 'Platform-led approach', price: 'Subscription', unit: 'or enterprise quote' },
] as const;

export default function OfferComparison() {
  return <section id="compare" data-competitor-benchmark="managed-sample-2026-10-03" className="bg-mist" aria-labelledby="compare-title">
    <div className="container-x py-12 sm:py-14">
      <div className="grid items-end gap-7 lg:grid-cols-[1.15fr_.85fr]">
        <div><p className="eyebrow">A founding rate for a complete program</p><h2 id="compare-title" className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-[2.35rem]">The scope you need.<br />The team to run it.</h2><p className="mt-4 max-w-2xl text-base leading-relaxed text-navy/85">AI search research, connected analytics, AI-powered workflows, and weekly prepared content. Signal Harbor brings the platform and managed execution together.</p></div>
        <div className="market-anchor"><p className="text-xs font-bold uppercase tracking-[.1em] text-harbor">Selected managed-plan average</p><p className="market-range mt-2 font-sora font-bold tracking-tight text-navy">{money(BENCHMARK.roundedMean)} <span>per month</span></p><p className="mt-3 text-sm text-navy/85">Your founding partner rate: <strong>{OFFER.price} per month.</strong></p><p className="benchmark-saving mt-3">About half the benchmark cost.</p></div>
      </div>
      <div className="direct-comparison mt-8">
        <fieldset className="comparison-picker"><legend>Compare the way your program is delivered</legend><div className="comparison-options">{APPROACHES.map((a, i) => <label key={a.id} className="comparison-option"><input type="radio" name="program-approach" id={`compare-${a.id}`} value={a.id} defaultChecked={i === 0} aria-controls={`compare-panel-${a.id}`} /><span><strong>{a.label}</strong></span></label>)}</div><label className="comparison-detail-toggle"><input id="comparison-details" type="checkbox" /><span>Show the scope details</span></label></fieldset>
        {APPROACHES.map(a => <div key={a.id} id={`compare-panel-${a.id}`} className={`comparison-panel comparison-${a.id}`}>
          <table className="direct-comparison-table"><caption className="sr-only">Signal Harbor company pilot compared with the {a.label.toLowerCase()} approach.</caption>
            <thead><tr><th scope="col">Your buying criteria</th><th scope="col" className="signal-column"><span className="comparison-brand">Signal Harbor</span><span className="comparison-plan">{OFFER.rateLabel}</span></th><th scope="col"><span className="comparison-brand">{a.name}</span><span className="comparison-plan">{a.plan}</span></th></tr></thead>
            <tbody><tr className="comparison-price"><th scope="row">Monthly investment</th><td className="signal-column"><strong>{OFFER.price}</strong><span>per month</span></td><td><strong>{a.price}</strong><span>{a.unit}</span></td></tr>{ROWS.map(r => <tr key={r.label}><th scope="row">{r.label}</th><td className="signal-column"><strong>{r.own[0]}</strong><span>{r.own[1]}</span></td><td><strong>{r[a.id][0]}</strong><span>{r[a.id][1]}</span></td></tr>)}</tbody>
          </table>
        </div>)}
        <div className="comparison-source"><p>Benchmark: the arithmetic mean of {BENCHMARK.sampleSize} selected published managed AI search plans, rounded to the nearest hundred dollars. Prices ranged from {money(BENCHMARK.low)} to {money(BENCHMARK.high)} per month. Reviewed {BENCHMARK.reviewed}.</p><p>The approach comparison describes delivery models. Scope, usage, content formats, and terms differ across packages.</p></div>
      </div>
      <div className="comparison-verdict mt-7"><div><p className="portal-kicker">A partner for your marketing team</p><h3 className="mt-2 text-xl font-bold text-navy">One connected program. Less work to coordinate.</h3><p className="mt-3 max-w-3xl text-sm leading-relaxed text-navy/85">Your team brings business direction and final approval. Signal Harbor runs the research, campaign planning, and content preparation, with the evidence, tools, data, and results connected in your portal.</p></div><Link href="#included" className="harbor-text-link flex-none font-semibold text-harbor underline underline-offset-4">Explore everything included <span aria-hidden="true">→</span></Link></div>
    </div>
  </section>;
}
