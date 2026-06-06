/**
 * Compact AI Visibility Score card for the hero (clean, aligned — no rotation,
 * no overlapping chrome). Focus: the headline visibility score + three core
 * metrics. Deeper metrics and hallucination alerts live in the main dashboard
 * section so the two visuals don't duplicate. All figures are illustrative.
 */

const SCORE = 72; // illustrative
const bars = [
  { label: 'Mention Rate', value: 64 },
  { label: 'Citation Share', value: 38 },
  { label: 'Share of Voice', value: 71 },
];

function MiniRing({ score }: { score: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const dash = (score / 100) * c;
  return (
    <div className="relative flex h-[92px] w-[92px] flex-none items-center justify-center">
      <svg width="92" height="92" viewBox="0 0 92 92" aria-hidden="true">
        <circle cx="46" cy="46" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="8" />
        <circle
          cx="46"
          cy="46"
          r={r}
          fill="none"
          stroke="#00C2FF"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          transform="rotate(-90 46 46)"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-sora text-2xl font-extrabold text-white">{score}</span>
        <span className="text-[10px] text-white/50">/ 100</span>
      </div>
    </div>
  );
}

export default function DashboardTeaser() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-navy-panel p-5 shadow-card">
      <div aria-hidden className="glow-blue pointer-events-none absolute -left-8 top-6 h-32 w-32 opacity-70" />
      <div className="relative mb-4 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
          Visibility Score
        </span>
        <span className="rounded-md border border-blue/40 bg-blue/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue">
          Sample
        </span>
      </div>

      <div className="relative flex items-center gap-5">
        <MiniRing score={SCORE} />
        <div className="flex-1 space-y-2.5">
          {bars.map((b) => (
            <div key={b.label}>
              <div className="mb-1 flex justify-between text-[11px] text-white/70">
                <span>{b.label}</span>
                <span className="font-semibold text-white">{b.value}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-blue" style={{ width: `${b.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
