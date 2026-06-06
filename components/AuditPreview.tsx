import Section, { SectionHeading } from './Section';

const reveals = [
  'Which businesses AI recommends for high-intent searches',
  'Whether your company appears in AI-generated answers',
  'Which sources AI systems cite when forming recommendations',
  'Where competitors are being mentioned more often',
  'Whether AI is using outdated or incorrect business details',
  'What content and authority gaps need to be fixed',
];

const signals = [
  'AI answer testing',
  'Citation review',
  'Competitor visibility mapping',
  'Entity accuracy checks',
  'Hallucination detection',
  'Actionable remediation plan',
];

/**
 * Sample report PANEL (intentionally not another circular score card, so it
 * doesn't duplicate the hero teaser / main dashboard). Shows report-style
 * sections: prompt set review, citation sources, competitor mentions, and
 * accuracy flags. All values illustrative and labeled.
 */
function ReportMockup() {
  return (
    <div className="rounded-2xl border border-white/12 bg-navy-panel p-6 shadow-card">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/55">Sample AI Visibility Report</p>
          <p className="mt-0.5 text-sm text-white/45">Your category · your market</p>
        </div>
        <span className="rounded-md border border-blue/40 bg-blue/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue">
          Illustrative
        </span>
      </div>

      {/* Prompt Set Review */}
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/45">Prompt Set Review</p>
          <span className="text-xs text-white/55">24 prompts tested</span>
        </div>
        <div className="mt-2.5 space-y-2">
          {[
            ['“best injury lawyer near me”', 'Appeared'],
            ['“top-rated providers in [city]”', 'Competitor'],
            ['“who should I call for…”', 'Missing'],
          ].map(([q, status]) => {
            const tone =
              status === 'Appeared'
                ? 'border-blue/40 bg-blue/10 text-blue'
                : status === 'Missing'
                  ? 'border-alert/40 bg-alert/10 text-alert'
                  : 'border-warn/40 bg-warn/10 text-warn';
            return (
              <div key={q} className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate text-white/75">{q}</span>
                <span className={`flex-none rounded-full border px-2 py-0.5 text-[11px] font-semibold ${tone}`}>{status}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Citation Sources + Competitor Mentions */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-white/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/45">Citation Sources</p>
          <div className="mt-3 space-y-2 text-sm">
            {[['Industry directory', '41%'], ['Local listing', '33%'], ['Review platform', '26%']].map(([s, v]) => (
              <div key={s} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-white/75"><span className="h-1.5 w-1.5 rounded-full bg-blue" />{s}</span>
                <span className="text-white/45">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-white/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/45">Competitor Mentions</p>
          <div className="mt-3 space-y-2.5">
            {[['Competitor A', 72], ['Competitor B', 54], ['Your business', 38]].map(([s, w]) => (
              <div key={s as string}>
                <div className="mb-1 flex justify-between text-[11px] text-white/70"><span>{s}</span><span>{w}%</span></div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-blue" style={{ width: `${w}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accuracy Flags */}
      <div className="mt-4 flex items-center gap-2 rounded-lg border border-alert/40 bg-alert/10 px-4 py-3">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5l6.5 11.5h-13L8 1.5z" stroke="#FF5A5F" strokeWidth="1.4" strokeLinejoin="round" /><path d="M8 6.5v3M8 11.3v.2" stroke="#FF5A5F" strokeWidth="1.6" strokeLinecap="round" /></svg>
        <span className="text-sm text-white/75"><span className="font-semibold text-alert">Accuracy Flags:</span> 2 outdated or incorrect details to review</span>
      </div>

      <p className="mt-3 text-center text-[11px] uppercase tracking-wider text-white/35">Illustrative sample — not real audit results</p>
    </div>
  );
}

/**
 * Generic, conversion-focused audit-preview section with a split layout:
 * explanatory copy on the left, a sample report panel on the right. No company
 * names, client logos, "trusted by" language, testimonials, or fabricated metrics.
 */
export default function AuditPreview() {
  return (
    <Section tone="navy" id="sample-report">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="AI Visibility Audit Preview"
            title="See what AI systems are already saying about your market."
            intro="Signal Harbor audits how AI systems describe businesses in your category, which competitors they recommend, what sources they cite, and where they get details wrong. The result is a visibility map showing where your business appears, where it gets ignored, and what needs to be fixed."
          />
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {reveals.map((r) => (
              <li key={r} className="flex items-start gap-2.5 text-[15px] text-white/80">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-blue" />
                {r}
              </li>
            ))}
          </ul>
          <div className="mt-7 rounded-lg border border-blue/25 bg-blue/5 p-4">
            <p className="text-sm font-semibold text-white">Built on evidence, not vanity metrics.</p>
            <p className="mt-1.5 text-sm leading-relaxed text-white/70">
              Signal Harbor does not publish invented case studies, fake logos,
              or unsupported performance claims. Public examples are added only
              when findings can be shown accurately and responsibly.
            </p>
          </div>
        </div>

        <ReportMockup />
      </div>

      <div className="mt-12 rounded-xl border border-white/10 bg-navy-deep p-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
          Built around verifiable signals
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {signals.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-white/75"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
