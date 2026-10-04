const LENSES = [
  { id: 'ai', title: 'AI visibility', source: 'Answer research', text: 'Find the buyer questions where your company is left out, misdescribed, or passed over. Compare the competitors and sources behind those answers.', metrics: ['Buyer questions', 'Citations', 'Claim accuracy'] },
  { id: 'search', title: 'SEO discovery', source: 'Search Console', text: 'Connect organic query and page performance to your content priorities. See how buyers discover your site and which pages earn impressions and clicks.', metrics: ['Search queries', 'Impressions & clicks', 'Landing pages'] },
  { id: 'attribution', title: 'Attribution', source: 'Remeasurement + analytics', text: 'Compare matched retests with your baseline, then connect visibility changes with search discovery, traffic, and tracked conversions. Estimate impact from the evidence and use it to guide the next campaign.', metrics: ['Matched retests', 'Tracked conversions', 'Impact estimates'] },
];

export function DiscoveryFlow({ idPrefix }: { idPrefix: string }) {
  return <div className="discovery-flow">
    <fieldset className="discovery-picker"><legend className="sr-only">Explore connected discovery and attribution</legend>{LENSES.map((lens, i) => <label key={lens.id} className="discovery-source"><input type="radio" name={`${idPrefix}-discovery`} defaultChecked={i === 0} id={`${idPrefix}-lens-${lens.id}`} aria-controls={`${idPrefix}-detail-${lens.id}`} className={`lens-input-${lens.id}`} /><span><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">{lens.id === 'ai' ? <><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /><circle cx="12" cy="12" r="5" /></> : lens.id === 'search' ? <><circle cx="10" cy="10" r="6" /><path d="m15 15 6 6M7 10h6" /></> : <><path d="M4 19h16M7 16v-5M12 16V5M17 16V8" /></>}</svg><strong>{lens.title}</strong><small>{lens.source}</small></span></label>)}</fieldset>
    <div className="discovery-merge" aria-hidden="true"><svg viewBox="0 0 540 56" preserveAspectRatio="none"><path d="M90 0v8q0 16 24 16h132q24 0 24 18v14" className="merge-ai" /><path d="M270 0v56" className="merge-search" /><path d="M450 0v8q0 16-24 16H294q-24 0-24 18v14" className="merge-attribution" /></svg><span>One connected program</span></div>
    {LENSES.map(lens => <div key={lens.id} id={`${idPrefix}-detail-${lens.id}`} className={`discovery-detail discovery-detail-${lens.id}`}><h3>{lens.title}</h3><p>{lens.text}</p><ul>{lens.metrics.map(m => <li key={m}>{m}</li>)}</ul></div>)}
  </div>;
}

export default function DiscoveryConnections({ idPrefix = 'pricing' }: { idPrefix?: string }) {
  return <section id="connections" className="bg-canvas" aria-labelledby={`${idPrefix}-connections-title`}><div className="container-x py-12 sm:py-14">
    <div className="connected-program">
      <div><p className="eyebrow">Included intelligence and connections</p><h2 id={`${idPrefix}-connections-title`} className="mt-3 text-3xl font-bold tracking-tight text-navy">Your AI, search, and performance data. Connected.</h2><p className="mt-4 text-base leading-relaxed text-navy/85">Find the opportunity, publish the work, and measure again. Bring AI visibility changes, SEO discovery, and conversion data together to estimate impact and improve the next move.</p>
        <div className="included-intelligence"><div><span className="direction-mark" aria-hidden="true">✦</span><div><h3>Signal Harbor AI</h3><p>AI-assisted content work grounded in your company context, with human review and approval.</p></div></div><div><span className="direction-mark" aria-hidden="true">↗</span><div><h3>Agent Connections</h3><p>Connect your preferred agents to approved context and campaign work through permissioned access.</p></div></div></div>
      </div>
      <DiscoveryFlow idPrefix={idPrefix} />
    </div>
  </div></section>;
}
