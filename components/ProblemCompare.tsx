import Section from './Section';

function Flow({ steps, accent }: { steps: string[]; accent?: boolean }) {
  return (
    <ol className="space-y-2.5">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-3">
          <span className={`grid h-7 w-7 flex-none place-items-center rounded-full text-xs font-bold ${accent ? 'bg-blue/15 text-blue ring-1 ring-blue/30' : 'bg-navy/[0.06] text-navy/50'}`}>{i + 1}</span>
          <span className={`text-[15px] ${accent ? 'font-medium text-navy' : 'text-navy/65'}`}>{s}</span>
        </li>
      ))}
    </ol>
  );
}

export default function ProblemCompare() {
  return (
    <Section tone="light" id="problem">
      <div className="max-w-2xl">
        <p className="eyebrow mb-3">The problem</p>
        <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Traditional SEO doesn&rsquo;t show the whole picture.
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-navy/65">
          Rankings and traffic matter. But AI answers decide who gets summarized,
          cited, compared, and recommended. If your company is missing or
          misrepresented there, the buyer may never reach your site.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-navy/10 bg-white p-7 shadow-[0_18px_44px_-24px_rgba(10,22,40,0.35)]">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy/70">Old search</p>
          <div className="mt-4"><Flow steps={['Keyword', 'Rankings', 'Clicks', 'Landing page']} /></div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-blue/30 bg-navy p-7">
          <div aria-hidden className="glow-blue pointer-events-none absolute -right-10 -top-10 h-40 w-40 opacity-70" />
          <p className="relative text-xs font-semibold uppercase tracking-wider text-blue">AI research</p>
          <ol className="relative mt-4 space-y-2.5">
            {['Buyer question', 'AI summary', 'Shortlist', 'Cited sources', 'Recommended providers'].map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-blue/15 text-xs font-bold text-blue ring-1 ring-blue/30">{i + 1}</span>
                <span className="text-[15px] font-medium text-white/85">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
