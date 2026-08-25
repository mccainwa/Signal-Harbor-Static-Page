import Section, { SectionHeading } from './Section';
import CTAButton from './CTAButton';
import { SITE, CTA } from '@/lib/site';

export default function MeasureShowcase() {
  return (
    <Section tone="navy-deep" id="measure">
      <SectionHeading
        eyebrow="Measurement"
        title="Measure what AI is really saying."
        intro="One connected view, from the prompts we test to the actions you take. Sample data shown for illustration."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {/* Prompt testing matrix */}
        <div className="card-dark rounded-2xl border border-white/12 p-6 lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/55">Prompt testing matrix</p>
          <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
            <div className="grid grid-cols-[1.4fr_repeat(4,1fr)] bg-navy text-[11px] font-semibold text-white/55">
              <span className="px-3 py-2">Prompt</span>
              {['Platform A', 'Platform B', 'Platform C', 'Platform D'].map((e) => (<span key={e} className="px-2 py-2 text-center">{e}</span>))}
            </div>
            {[
              ['“best providers for…”', [1, 1, 0, 1]],
              ['“top-rated in [city]”', [0, 1, 1, 0]],
              ['“alternatives to…”', [1, 0, 0, 1]],
            ].map(([p, cells]) => (
              <div key={p as string} className="grid grid-cols-[1.4fr_repeat(4,1fr)] items-center border-t border-white/10 text-sm">
                <span className="truncate px-3 py-2.5 text-white/75">{p}</span>
                {(cells as number[]).map((c, i) => (
                  <span key={i} className="flex justify-center py-2.5">
                    <span className={`h-3 w-3 rounded-full ${c ? 'bg-blue' : 'border border-alert/50 bg-alert/10'}`} />
                  </span>
                ))}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-white/40">Blue = your brand appeared · outline = missing</p>
        </div>

        {/* Competitor chart + accuracy register */}
        <div className="space-y-5">
          <div className="card-dark rounded-2xl border border-white/12 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/55">Competitor appearance</p>
            <div className="mt-3 space-y-2.5">
              {[['Competitor A', 72], ['Competitor B', 54], ['You', 38]].map(([l, w]) => (
                <div key={l as string}>
                  <div className="flex justify-between text-[11px] text-white/65"><span>{l}</span><span>{w}%</span></div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-blue" style={{ width: `${w}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-dark rounded-2xl border border-alert/30 bg-alert/[0.06] p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-alert">Claim accuracy register</p>
            <p className="mt-2 text-sm text-white/70">2 outdated or unsupported claims flagged for correction.</p>
          </div>
        </div>
      </div>

      {/* Citation network + roadmap */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="card-dark rounded-2xl border border-white/12 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/55">Citation / source network</p>
          <svg viewBox="0 0 360 120" className="mt-3 w-full" aria-hidden="true">
            <line x1="60" y1="60" x2="160" y2="30" stroke="rgba(0,194,255,.35)" strokeWidth="1.5" />
            <line x1="60" y1="60" x2="170" y2="90" stroke="rgba(0,194,255,.35)" strokeWidth="1.5" />
            <line x1="60" y1="60" x2="150" y2="62" stroke="rgba(0,194,255,.35)" strokeWidth="1.5" />
            <line x1="160" y1="30" x2="280" y2="40" stroke="rgba(255,255,255,.15)" strokeWidth="1.2" />
            <line x1="170" y1="90" x2="290" y2="95" stroke="rgba(255,255,255,.15)" strokeWidth="1.2" />
            <circle cx="60" cy="60" r="12" fill="#00C2FF" />
            <text x="60" y="64" textAnchor="middle" fill="#0A1628" fontSize="9" fontWeight="700">AI</text>
            {[[160,30,'Review'],[170,90,'Directory'],[150,62,'Owned'],[280,40,'Blog'],[290,95,'Forum']].map(([x,y,t])=>(
              <g key={t as string}><circle cx={x as number} cy={y as number} r="6" fill="rgba(255,255,255,.18)" /><text x={(x as number)+10} y={(y as number)+3} fill="rgba(255,255,255,.55)" fontSize="9">{t}</text></g>
            ))}
          </svg>
        </div>
        <div className="card-dark rounded-2xl border border-white/12 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/55">30/60/90 action roadmap</p>
          <div className="mt-3 space-y-2.5">
            {[['0-30', 'Fix entity profiles and top claims'], ['30-60', 'Add comparison pages, strengthen sources'], ['60-90', 'Re-test, monitor drift, expand coverage']].map(([d, t]) => (
              <div key={d} className="flex items-center gap-3">
                <span className="inline-flex w-14 flex-none justify-center rounded-full border border-blue/30 bg-blue/10 py-1 text-[11px] font-semibold text-blue">{d}</span>
                <span className="text-sm text-white/75">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <CTAButton href={SITE.bookingUrl} variant="primary">{CTA.primary}</CTAButton>
      </div>
    </Section>
  );
}
