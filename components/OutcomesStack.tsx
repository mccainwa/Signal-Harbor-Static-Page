import Section from './Section';
import CTAButton from './CTAButton';
import { SITE, CTA } from '@/lib/site';

const docs = [
  'Executive Scorecard',
  'Prompt Performance Matrix',
  'Citation Map',
  'Accuracy Register',
  '30/60/90 Action Roadmap',
];

/** Layered "report stack" preview — overlapping document tiles, not a card grid. */
function ReportStack() {
  return (
    <div className="relative h-[320px] w-full">
      <div aria-hidden className="glow-blue pointer-events-none absolute left-1/4 top-1/4 h-56 w-56 opacity-70" />
      {docs.map((d, i) => (
        <div
          key={d}
          className="absolute left-1/2 w-[78%] max-w-sm -translate-x-1/2 rounded-2xl border border-white/12 bg-navy-panel/90 p-4 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.8)] backdrop-blur transition-transform duration-300 hover:-translate-y-1"
          style={{ top: `${i * 46}px`, zIndex: docs.length - i, transform: `translateX(-50%) rotate(${(i - 2) * 1.4}deg)` }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-white">{d}</span>
            <span className="grid h-5 w-5 place-items-center rounded-md bg-blue/15 text-blue"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 3h9l3 3v15H6z" /></svg></span>
          </div>
          <div className="mt-2.5 space-y-1.5">
            <div className="h-1.5 w-3/5 rounded-full bg-blue/40" />
            <div className="h-1.5 w-full rounded-full bg-white/10" />
            <div className="h-1.5 w-4/5 rounded-full bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function OutcomesStack() {
  return (
    <Section tone="navy" id="outcomes">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow mb-3">Deliverables</p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">What you get.</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            Executive-ready outputs, built for decisions and execution. Every
            finding stays tied to the prompts and sources behind it.
          </p>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {docs.map((d) => (
              <li key={d} className="flex items-center gap-2.5 text-[15px] text-white/75">
                <span className="grid h-5 w-5 flex-none place-items-center rounded-md border border-blue/40 bg-blue/10 text-blue"><svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3 3 7-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                {d}
              </li>
            ))}
          </ul>
          <div className="mt-8"><CTAButton href={SITE.bookingUrl} variant="primary">{CTA.primary}</CTAButton></div>
        </div>
        <ReportStack />
      </div>
    </Section>
  );
}
