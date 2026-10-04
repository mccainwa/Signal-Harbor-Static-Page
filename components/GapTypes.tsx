'use client';

import { useRef, useState, type KeyboardEvent } from 'react';

const gaps = [
  { title: 'Your company is missing.', body: 'Competitors make the shortlist. You do not.', headline: 'Find where buyers lose sight of you.', note: 'Test the questions that matter to your business.' },
  { title: 'Your offer is misunderstood.', body: 'An outdated answer gets your product wrong.', headline: 'Make your current offer clear.', note: 'Trace incorrect descriptions to the sources behind them.' },
  { title: 'Competitors have stronger evidence.', body: 'Their content does more to support the answer.', headline: 'Build a stronger basis for comparison.', note: 'Identify the pages and sources your buyers need.' },
];

export default function GapTypes() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  function keys(e: KeyboardEvent<HTMLButtonElement>) {
    const next = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (active + 1) % 3 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? (active + 2) % 3 : e.key === 'Home' ? 0 : e.key === 'End' ? 2 : null;
    if (next !== null) { e.preventDefault(); setActive(next); refs.current[next]?.focus(); }
  }
  return (
    <section id="problem" className="overflow-hidden bg-mist">
      <div className="container-x grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <div>
          <p className="eyebrow">The problem</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-[2.35rem] sm:leading-[1.15]">Your next buyer may be asking AI.</h2>
          <p className="mt-4 text-lg leading-relaxed text-navy/75"><strong className="font-semibold text-navy">AI visibility</strong> is whether tools such as ChatGPT mention and accurately describe your company when buyers ask for options.</p>
          <div role="tablist" aria-label="Explore AI visibility gaps" aria-orientation="vertical" className="mt-7 space-y-2">
            {gaps.map((g, i) => (
              <button key={g.title} ref={el => { refs.current[i] = el; }} role="tab" type="button" id={`gap-tab-${i}`} aria-selected={active === i} aria-controls={`gap-panel-${i}`} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={keys} className={`gap-choice group flex w-full items-start gap-4 rounded-xl p-4 text-left transition-colors ${active === i ? 'border-harbor/25 bg-white shadow-[0_8px_22px_-16px_rgba(3,105,161,0.4)]' : 'border-transparent hover:bg-white/60'}`}>
                <span aria-hidden="true" className={`mt-0.5 grid h-8 w-8 flex-none place-items-center rounded-lg text-sm font-bold ${active === i ? 'bg-[#DFF5FE] text-harbor' : 'bg-white/70 text-navy/60'}`}>{i + 1}</span>
                <span><span className="block font-sora text-base font-bold text-navy">{g.title}</span><span className="mt-1 block text-[15px] leading-relaxed text-navy/75">{g.body}</span></span>
                <span aria-hidden="true" className={`ml-auto mt-1 text-harbor ${active === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>→</span>
              </button>
            ))}
          </div>
        </div>
        <div className="relative min-w-0">
          <div className="gap-orbit pointer-events-none absolute -inset-8 rounded-full" aria-hidden="true" />
          {gaps.map((g, i) => (
            <div key={g.title} role="tabpanel" id={`gap-panel-${i}`} aria-labelledby={`gap-tab-${i}`} tabIndex={0} hidden={active !== i} className="gap-visual relative overflow-hidden rounded-[1.5rem] border border-[#C8E3F2] bg-white shadow-[0_24px_60px_-35px_rgba(3,105,161,0.4)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/[0.07] bg-[#F5FBFE] px-5 py-4 sm:px-7">
                <span className="flex items-center gap-2 text-sm font-semibold text-harbor"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z" /></svg> A buyer asks AI</span>
              </div>
              <div className="p-5 sm:p-7">
                <p className="rounded-xl rounded-tl-sm bg-[#EAF4FA] px-5 py-4 font-medium leading-relaxed text-navy">“Which providers are a good fit for a company like ours?”</p>
                <p className="mb-4 mt-7 text-xs font-semibold uppercase tracking-wider text-navy/60">{i === 0 ? 'The answer names' : i === 1 ? 'The answer describes' : 'The comparison relies on'}</p>
                {i === 0 ? <ul className="divide-y divide-navy/[0.07]">{['Industry leader', 'Specialist provider', 'Your company'].map((n, j) => <li key={n} className={`flex items-center gap-3 px-2 py-4 ${j === 2 ? 'rounded-lg bg-[#FFF5F3]' : ''}`}><span aria-hidden="true" className={`grid h-8 w-8 flex-none place-items-center rounded-lg text-harbor ${j === 2 ? 'bg-white' : 'bg-[#EAF7FD]'}`}>{j === 2 ? '?' : '✦'}</span><span className="text-sm font-semibold">{n}</span><span className={`status ml-auto ${j === 2 ? 'status-gap' : 'status-ready'}`}>{j === 2 ? 'Missing' : 'Named'}</span></li>)}</ul> : i === 1 ? <div className="rounded-xl border border-[#EBD7AB] bg-[#FFFBF2] p-5"><p className="font-semibold text-navy">Your company</p><p className="mt-3 text-base leading-relaxed text-navy/75">“Their product only supports smaller businesses.”</p><div className="mt-4 border-t border-[#EBD7AB] pt-4"><span className="status status-review">Outdated description</span><p className="mt-3 text-sm leading-relaxed text-navy/75">The source reflects an earlier version of the offer.</p></div></div> : <div className="divide-y divide-navy/[0.07]">{['Competitor comparison pages', 'Review platforms', 'Industry articles'].map(s => <div key={s} className="flex items-center gap-3 px-2 py-4"><span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-[#EAF4FA] text-harbor" aria-hidden="true">↗</span><span className="text-sm font-medium text-navy">{s}</span></div>)}</div>}
                <div className="mt-6 flex gap-3 border-t border-navy/[0.08] pt-5"><span aria-hidden="true" className="mt-1 h-2 w-2 flex-none rounded-full bg-blue" /><div><h3 className="text-base font-bold text-navy">{g.headline}</h3><p className="mt-1 text-sm leading-relaxed text-navy/75">{g.note}</p></div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
