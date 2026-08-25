import CTAButton from './CTAButton';
import { SITE, CTA } from '@/lib/site';

function Gauge({ score }: { score: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  const dash = (score / 100) * c;
  return (
    <div className="relative flex h-[124px] w-[124px] flex-none items-center justify-center">
      <svg width="124" height="124" viewBox="0 0 124 124" aria-hidden="true">
        <circle cx="62" cy="62" r={r} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="9" />
        <circle cx="62" cy="62" r={r} fill="none" stroke="#00C2FF" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${dash} ${c}`} transform="rotate(-90 62 62)" />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-sora text-4xl font-extrabold leading-none text-white">{score}</span>
        <span className="text-[10px] text-white/40">/ 100</span>
        <span className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-white/55">AI Visibility</span>
      </div>
    </div>
  );
}

function Bar({ label, value, delta }: { label: string; value: number; delta: string }) {
  const good = !delta.startsWith('−');
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="text-white/70">{label}</span>
        <span className="flex items-center gap-1.5"><span className="font-semibold text-white">{value}%</span><span className={good ? 'text-[#34d399]' : 'text-alert'}>{delta}</span></span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-blue" style={{ width: `${value}%` }} /></div>
    </div>
  );
}

/** Polished, detailed dashboard mockup — a stylized version of the Signal
 *  Harbor command center. Illustrative values, brand colors only. */
function HeroDashboard() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div aria-hidden className="glow-blue pointer-events-none absolute -right-16 -top-10 h-80 w-80 opacity-70" />
      <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-navy-panel/80 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.85)] backdrop-blur">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-blue/20 text-blue"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 12h4l3 8 4-16 3 8h4" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            <span className="text-sm font-semibold text-white">Command Center</span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-white/55"><span className="h-1.5 w-1.5 rounded-full bg-blue" />Sample data</span>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2">
          {/* Score + bars */}
          <div className="rounded-2xl border border-white/10 bg-navy/50 p-4 sm:col-span-2">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-white/40">AI Visibility Score</p>
            <div className="flex items-center gap-5">
              <Gauge score={64} />
              <div className="flex-1 space-y-2.5">
                <Bar label="Prompt Visibility" value={72} delta="+1" />
                <Bar label="Entity Clarity" value={58} delta="+4" />
                <Bar label="Content Extractability" value={41} delta="+2" />
                <Bar label="Authority Signals" value={70} delta="+0" />
              </div>
            </div>
          </div>

          {/* Accuracy / hallucination */}
          <div className="rounded-2xl border border-alert/25 bg-alert/[0.07] p-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-alert">Accuracy flags</p>
              <span className="rounded-full bg-alert/15 px-2 py-0.5 text-[10px] font-semibold text-alert">2 active</span>
            </div>
            <div className="mt-3 space-y-1.5 text-[11px] text-white/65">
              <p className="flex justify-between"><span>Outdated pricing claim</span><span className="text-alert">high</span></p>
              <p className="flex justify-between"><span>Unsupported comparison</span><span className="text-warn">med</span></p>
            </div>
          </div>

          {/* Competitor appearance */}
          <div className="rounded-2xl border border-white/10 bg-navy/50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Competitor appearance</p>
            <div className="mt-3 space-y-2">
              {[['Competitor A', 72], ['Competitor B', 54], ['You', 38]].map(([l, w]) => (
                <div key={l as string}>
                  <div className="flex justify-between text-[10px] text-white/55"><span>{l}</span><span>{w}%</span></div>
                  <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10"><div className={`h-full rounded-full ${l === 'You' ? 'bg-white/40' : 'bg-blue'}`} style={{ width: `${w}%` }} /></div>
                </div>
              ))}
            </div>
          </div>

          {/* Source chips + roadmap */}
          <div className="rounded-2xl border border-white/10 bg-navy/50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Cited sources</p>
            <div className="mt-2 flex flex-wrap gap-1.5">{['Owned', 'Reviews', 'Directory', 'Competitor'].map((t) => (<span key={t} className="rounded-full border border-white/12 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/60">{t}</span>))}</div>
          </div>
          <div className="rounded-2xl border border-blue/25 bg-blue/[0.06] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-blue">Action roadmap</p>
            <div className="mt-2 space-y-1.5 text-[11px] text-white/70">
              {[['Priority 1', 'Fix entity profiles'], ['Priority 2', 'Add comparison pages'], ['Priority 3', 'Re-test and monitor']].map(([d, t]) => (
                <div key={d} className="flex items-center gap-2"><span className="inline-flex w-16 flex-none justify-center rounded-full bg-blue/15 py-0.5 text-[9px] font-semibold text-blue">{d}</span>{t}</div>
              ))}
            </div>
          </div>

          {/* Trend */}
          <div className="rounded-2xl border border-white/10 bg-navy/50 p-4 sm:col-span-2">
            <div className="flex items-center justify-between"><p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Score history</p><span className="text-[11px] font-semibold text-[#34d399]">▲ +11 pts</span></div>
            <svg viewBox="0 0 480 70" className="mt-2 w-full" aria-hidden="true">
              <defs><linearGradient id="ht" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00C2FF" stopOpacity="0.3" /><stop offset="100%" stopColor="#00C2FF" stopOpacity="0" /></linearGradient></defs>
              <polyline points="0,52 60,40 120,46 180,30 240,44 300,34 360,20 420,16 480,10" fill="none" stroke="#00C2FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <polygon points="0,52 60,40 120,46 180,30 240,44 300,34 360,20 420,16 480,10 480,70 0,70" fill="url(#ht)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="hero-gradient relative overflow-hidden border-b border-white/10">
      <div aria-hidden className="pointer-events-none absolute inset-0 signal-grid opacity-70" />
      <div className="container-x relative grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
        <div>
          <p className="eyebrow mb-4">AI Visibility Intelligence &amp; GEO Services</p>
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-[3.1rem]">
            Understand and improve how AI recommends your company.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Signal Harbor tests the questions buyers ask AI platforms, identifies
            where your company is missing or misrepresented, and turns the
            findings into a clear plan.
          </p>
          <p className="mt-3 text-[15px] text-white/55">
            Built for companies that depend on being found, compared, trusted, and chosen.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {['Find missed AI visibility', 'Track competitor recommendations', 'Fix inaccurate AI claims'].map((t) => (
              <span key={t} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[13px] text-white/75">
                <span className="h-1.5 w-1.5 rounded-full bg-blue" />{t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton href={SITE.bookingUrl} variant="primary">{CTA.primary}</CTAButton>
            <CTAButton href="#tour" variant="secondary">See What We Measure</CTAButton>
          </div>

          <p className="mt-4 max-w-xl text-sm text-white/55">{CTA.supporting}</p>
          <p className="mt-3 text-sm text-white/55">
            Measured across selected AI platforms based on your market and scope.
          </p>
        </div>

        <HeroDashboard />
      </div>
    </section>
  );
}
