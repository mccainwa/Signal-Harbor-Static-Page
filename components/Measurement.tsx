import Section, { SectionHeading } from './Section';
import CountUp from './CountUp';

const bars = [
  ['Mention share', 58],
  ['Citation source quality', 64],
  ['Claim accuracy rate', 81],
  ['Competitor displacement', 12, '−'],
] as const;

const stats = [
  ['Action completion', '7 / 9', '▲'],
  ['Re-audit movement', '+9 pts', '▲'],
  ['Prompts tested', '120+', ''],
];

export default function Measurement() {
  return (
    <Section tone="navy-deep" id="measurement">
      <SectionHeading
        eyebrow="Measurement"
        title="Clear metrics, tied to action."
        intro="We report the signals that influence AI answer visibility in terms executives can act on. The values below are sample data for illustration, not client results."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* Summary score + trend */}
        <div className="rounded-2xl border border-white/12 bg-navy-panel p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/55">AI visibility score</p>
          <div className="mt-2 flex items-end gap-3">
            <CountUp to={68} className="font-sora text-6xl font-extrabold leading-none text-white" />
            <span className="mb-1 text-sm text-white/45">/ 100</span>
            <span className="mb-1.5 ml-auto inline-flex items-center gap-1 rounded-full bg-blue/10 px-2.5 py-1 text-xs font-semibold text-blue">▲ +9 pts (sample)</span>
          </div>
          <svg viewBox="0 0 280 90" className="mt-5 w-full" aria-hidden="true">
            <defs>
              <linearGradient id="mtrend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#00C2FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline points="0,66 46,58 92,62 138,46 184,48 230,34 280,28" fill="none" stroke="#00C2FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <polygon points="0,66 46,58 92,62 138,46 184,48 230,34 280,28 280,90 0,90" fill="url(#mtrend)" />
          </svg>
          <p className="mt-2 text-sm text-white/55">Illustrative trend across repeated re-audits.</p>
        </div>

        {/* Metric bars + stat chips */}
        <div className="rounded-2xl border border-white/12 bg-navy-panel p-6 shadow-card">
          <div className="grid gap-5 sm:grid-cols-2">
            {bars.map(([label, v, prefix]) => (
              <div key={label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-white/75">{label}</span>
                  <span className="font-semibold text-white">{prefix ?? ''}{v}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-blue" style={{ width: `${v}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2.5 border-t border-white/10 pt-5">
            {stats.map(([l, v, t]) => (
              <span key={l} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-xs text-white/75">
                {t && <span className="text-blue">{t}</span>}{l}: <span className="font-semibold text-white">{v}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-white/45">
        AI visibility is measurable and influenceable, not fully controllable.
        Results vary by model, prompt wording, location, source availability, and time.
      </p>
    </Section>
  );
}
