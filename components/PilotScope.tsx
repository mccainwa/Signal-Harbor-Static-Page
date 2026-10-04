const SCOPE = [
  { title: 'AI visibility, SEO, and buyer discovery.', subtitle: 'Eight platforms, competitors, citations, and answer accuracy', items: [
    ['Buyer question research', 'Branded and unbranded questions across discovery, comparison, and evaluation, built around your products, audiences, and markets.'],
    ['Eight AI answer platforms', 'ChatGPT, Claude, Gemini, Perplexity, Grok, Google AI Overviews, Google AI Mode, and Meta AI.'],
    ['Mentions and recommendations', 'See when your company is named, recommended, or left out, and where competitors get the attention.'],
    ['Citation and source intelligence', 'Trace the pages and sources behind AI answers, including your content, competitor content, and third-party references.'],
    ['Company claim accuracy', 'Review unsupported, outdated, contradictory, and inconsistent descriptions against the facts your team confirms.'],
    ['GEO, AEO, and SEO priorities', 'Turn AI answer evidence and search discovery into priorities for your content, website, and campaign.'],
  ]},
  { title: 'A managed campaign and prepared content.', subtitle: 'One monthly campaign plan and five weekly content templates', items: [
    ['One campaign plan per month', 'A prioritized plan tied to your business goals, buyer journey, products, and the evidence behind the opportunity.'],
    ['Five content templates per week', 'Prepared pages, FAQs, comparison content, and other campaign formats, shaped by company facts and brand context.'],
    ['Signal Harbor runs the program', 'We interpret findings, plan the campaign, prepare content, and coordinate the review workflow with your team.'],
    ['Evidence-connected work', 'Link campaign priorities, content, tasks, and decisions to the buyer questions and findings they address.'],
    ['Publication handoff', 'The approved version travels with copy, metadata, links, and technical guidance for the agreed publishing owner.'],
  ]},
  { title: 'Signal Harbor AI and connected intelligence.', subtitle: 'AI assistance, Agent Connections, Google Analytics, and Search Console', items: [
    ['Signal Harbor AI', 'Refine content using your company facts, brand preferences, and the context behind your campaign, with human review and approval.'],
    ['Agent Connections', 'Connect Claude, Codex, and compatible agents to approved company context and campaign work through permissioned access.'],
    ['Google Analytics 4', 'Bring traffic sources, landing pages, engagement, and tracked conversion events into the program.'],
    ['Google Search Console', 'Connect organic search queries, page performance, impressions, clicks, click-through rate, and average position.'],
    ['AI search and SEO discovery', 'Read AI answer evidence and organic search performance together to choose where the next content investment belongs.'],
    ['Attribution and impact estimates', 'Combine matched visibility retests, search discovery, identified AI referrals, and tracked conversions to estimate impact, with the supporting evidence and assumptions.'],
    ['A clearer view of business outcomes', 'Keep traffic sources, recorded discovery evidence, published work, and measured outcomes connected in Results.'],
  ]},
  { title: 'Team access, review, and measurement.', subtitle: 'One client portal with a clear path from evidence to results', items: [
    ['Insights, Campaign, and Results', 'A connected workspace for buyer questions, campaign priorities, content review, publication records, and performance.'],
    ['Content previews and version review', 'Compare proposed work with earlier versions, comment on specific sections, and request changes.'],
    ['Human approval', 'Marketing, product, and legal reviewers approve the exact version that is handed off for publication.'],
    ['Roles and permissioned access', 'Named team access and agent permissions keep decisions with the people authorized to make them.'],
    ['Tasks, comments, and history', 'Clear ownership, discussion, and recorded decisions help the work move without losing context.'],
    ['Remeasurement and improvement', 'Record live URLs and publication dates, compare matched retests with the baseline, and use observed changes and impact estimates to shape the next campaign.'],
    ['Program scope', 'Confirm the buyer question set, markets, collection cadence, team needs, and publication responsibilities before work starts.'],
  ]},
];

export default function PilotScope() {
  return <div className="pilot-scope mt-8"><p className="portal-kicker mb-4">Explore everything included</p>{SCOPE.map((s, i) => <details key={s.title} className="scope-disclosure"><summary><span className="scope-number" aria-hidden="true">0{i + 1}</span><span className="min-w-0"><strong>{s.title}</strong><small>{s.subtitle}</small></span><span className="scope-plus" aria-hidden="true">+</span></summary><dl>{s.items.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl></details>)}</div>;
}
