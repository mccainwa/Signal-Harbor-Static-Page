import CTAButton from './CTAButton';
import { SITE } from '@/lib/site';

/** Action-plan card — gives the CTA a visual companion that is NOT another
 *  score dashboard (so the page's report visuals don't repeat). */
function ActionPlanCard() {
  const fixes = [
    'Update entity profiles',
    'Improve service page clarity',
    'Correct outdated citations',
  ];
  return (
    <div className="rounded-2xl border border-white/12 bg-navy-panel/80 p-6 shadow-card backdrop-blur">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-white">Priority fixes</span>
        <span className="rounded-md border border-blue/40 bg-blue/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue">
          Action plan
        </span>
      </div>
      <ul className="mt-4 space-y-3">
        {fixes.map((f, i) => (
          <li key={f} className="flex items-center gap-3">
            <span className="grid h-6 w-6 flex-none place-items-center rounded-md border border-blue/40 bg-blue/10 text-blue">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3 3 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <span className="text-sm text-white/80">
              <span className="mr-2 text-white/40">{i + 1}.</span>{f}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[11px] uppercase tracking-wider text-white/35">Illustrative — your plan is built from your audit</p>
    </div>
  );
}

/**
 * Closing booking CTA with an action-plan companion. No contact form, no
 * developer notes. Primary = booking; secondary = real mailto. Static-safe.
 */
export default function FinalCTA() {
  return (
    <section id="contact" className="bg-navy">
      <div className="container-x py-20 sm:py-24">
        <div className="relative overflow-hidden rounded-2xl border border-blue/30 bg-gradient-to-br from-navy-panel to-navy-deep px-6 py-14 sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{ background: 'radial-gradient(600px 220px at 30% 0%, rgba(0,194,255,0.18), transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Find out what AI says before your customers rely on the answer.
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/70">
                Book a short audit call. We&rsquo;ll review your category, target
                market, and the AI systems most likely to influence how customers
                discover you.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CTAButton href={SITE.bookingUrl} variant="primary">
                  Book an Audit Call
                </CTAButton>
                <CTAButton href={SITE.mailto} variant="secondary">
                  Email Signal Harbor
                </CTAButton>
              </div>
            </div>
            <div className="hidden lg:block">
              <ActionPlanCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
