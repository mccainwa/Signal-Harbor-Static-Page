import Section, { SectionHeading } from './Section';

/**
 * The separate signals Results can show. AI answer visibility comes from
 * Signal Harbor's recorded answers; search and analytics measures come from
 * included Google connections authorized by the client. Each retains its
 * provenance; known AI referrals do not identify every AI-assisted visit.
 */
const SIGNALS: [name: string, source: string, desc: string][] = [
  ['AI answer visibility', 'Signal Harbor recorded answers', 'Mentions, recommendations, citations, and accuracy from the buyer question set, each reported on its own.'],
  ['SEO discovery', 'Google Search Console', 'Organic queries, page performance, clicks, impressions, click-through rate, and average position.'],
  ['Traffic sources', 'Google Analytics 4', 'Identified AI referrals and organic traffic, connected to the landing pages visitors reach.'],
  ['Engagement', 'Google Analytics 4', 'Sessions and engaged visits, examined by source and landing page.'],
  ['Conversions and attribution', 'Google Analytics 4 key events', 'The form submissions, demo requests, and other conversion events your team tracks, alongside the recorded traffic source.'],
];

export default function MethodSignals({ embedded = false }: { embedded?: boolean }) {
  return (
    <Section tone="ice" id={embedded ? undefined : "signals"}>
      <SectionHeading
        tone="ice"
        eyebrow="Search and analytics"
        title="Connect discovery with measured outcomes."
        intro="Matched retests, Search Console discovery, and Google Analytics conversion data come together in Results. We measure changes against the baseline and use the connected evidence to estimate impact and inform the next campaign."
      />
      <dl className="mt-10 divide-y divide-navy/10 rounded-2xl border border-navy/[0.09] bg-raised">
        {SIGNALS.map(([name, source, desc]) => (
          <div key={name} className="grid gap-1 px-5 py-4 sm:px-6 md:grid-cols-[0.9fr_2fr] md:gap-8">
            <dt>
              <span className="block text-base font-bold text-navy">{name}</span>
              <span className="block text-sm text-harbor">{source}</span>
            </dt>
            <dd className="text-base leading-relaxed text-navy/80">{desc}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 rounded-2xl border-[1.5px] border-[#ADCFE2] bg-white p-6"><h3 className="text-xl font-bold text-navy">From remeasurement to impact estimates.</h3><p className="mt-3 max-w-3xl text-base leading-relaxed text-navy/85">We compare the same buyer questions and AI platforms after publication, then examine visibility changes alongside search discovery, referral traffic, landing pages, and conversion events. Impact estimates bring those signals together with the campaign context, assumptions, and strength of the evidence. Recorded outcomes and estimates retain separate labels and measurement windows.</p></div>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-navy/80">
        <strong className="font-semibold text-navy">The evidence behind attribution.</strong> Analytics
        identifies AI referrals when a source is recorded. Visits without that source, including
        some Google AI search traffic, may remain in organic or other channels. We read conversion
        events alongside publication dates, campaign activity, and other business changes to keep
        the interpretation tied to the available evidence.
      </p>
    </Section>
  );
}
