'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
type Step = { title: string; area: string; who: string; desc: string; outcome: string };
export const STEPS: Step[] = [
  { title: 'Find', area: 'Insights', who: 'Signal Harbor', desc: 'Test buyer questions and identify missing mentions, inaccurate descriptions, and stronger competitors.', outcome: 'A clear view of the gaps.' },
  { title: 'Prioritize', area: 'Campaign', who: 'Signal Harbor with your team', desc: 'Connect each gap to a product, audience, and business priority.', outcome: 'A campaign with a clear purpose.' },
  { title: 'Prepare', area: 'Campaign', who: 'Signal Harbor', desc: 'Prepare content from your confirmed company facts, ready for your team to review.', outcome: 'Concrete work your team can use.' },
  { title: 'Review', area: 'Campaign', who: 'Your team', desc: 'Your team confirms facts, requests changes, and approves a specific version.', outcome: 'Your facts. Your final approval.' },
  { title: 'Publish', area: 'Campaign and Results', who: 'The agreed publishing owner', desc: 'The agreed owner publishes approved work. The portal records the live URL and date.', outcome: 'Approved work, live and recorded.' },
  { title: 'Measure and improve', area: 'Results', who: 'Signal Harbor with your team', desc: 'Follow agreed measures separately from work progress, and use the evidence to set the next priorities.', outcome: 'Evidence for your next move.' },
];
function StepArt({ step }: { step: number }) {
  return <div className="workflow-art" aria-hidden="true"><svg viewBox="0 0 280 215" className="w-full">
    <defs><linearGradient id="workflow-light" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#00c2ff" /><stop offset="1" stopColor="#0369a1" /></linearGradient></defs>
    <circle cx="140" cy="107" r="88" fill="none" stroke="#c5e0ed" /><circle cx="140" cy="107" r="65" fill="none" stroke="#d3e8f1" strokeDasharray="3 6" />
    <circle cx="140" cy="107" r="88" fill="none" stroke="url(#workflow-light)" strokeWidth="3" strokeLinecap="round" strokeDasharray={(step + 1) * 80 + ' 553'} transform="rotate(-90 140 107)" className="workflow-orbit" />
    <rect x="98" y="65" width="84" height="84" rx="22" fill="#fff" stroke="#96c9e0" strokeWidth="1.5" />
    <g fill="none" stroke="#0369a1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {step === 0 ? <><circle cx="135" cy="102" r="13" /><path d="M145 112l16 16M135 95v14M128 102h14" /></> : step === 1 ? <><path d="M122 91h38M122 107h28M122 123h18" /><circle cx="119" cy="91" r="2" fill="#00c2ff" /></> : step === 2 ? <><path d="M124 83h24l10 10v38h-34zM146 83v12h12M131 108h18M131 118h12" /></> : step === 3 ? <><path d="M122 108l12 12 25-27" /><path d="M128 84h25M128 132h25" stroke="#a5d4e8" /></> : step === 4 ? <><path d="M140 121V88M127 101l13-13 13 13M121 117v14h38v-14" /></> : <><path d="M120 127h40M123 115l11-12 10 4 15-20" /><circle cx="159" cy="87" r="3" fill="#00c2ff" /></>}
    </g>
    <circle cx="140" cy="19" r="5" fill="#00a2d5" /><circle cx="228" cy="107" r="4" fill="#8ebed5" /><circle cx="140" cy="195" r="4" fill="#8ebed5" /><circle cx="52" cy="107" r="4" fill="#8ebed5" />
  </svg></div>;
}
export default function ProgramLoop() {
  const [ready, setReady] = useState(false), [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => setReady(true), []);
  function keys(e: KeyboardEvent<HTMLButtonElement>) {
    const next = e.key === 'ArrowRight' ? (active + 1) % 6 : e.key === 'ArrowLeft' ? (active + 5) % 6 : e.key === 'Home' ? 0 : e.key === 'End' ? 5 : null;
    if (next !== null) { e.preventDefault(); setActive(next); refs.current[next]?.focus(); }
  }
  const step = STEPS[active];
  return ready ? <div className="workflow-program">
    <div role="tablist" aria-label="Program steps" className="workflow-tabs">{STEPS.map((s, i) => <button key={s.title} type="button" role="tab" id={'workflow-step-' + i} aria-controls="workflow-panel" aria-selected={active === i} tabIndex={active === i ? 0 : -1} ref={el => { refs.current[i] = el; }} onClick={() => setActive(i)} onKeyDown={keys}><span className="workflow-step-number" aria-hidden="true">{String(i + 1).padStart(2,'0')}</span><span>{s.title}</span></button>)}</div>
    <div id="workflow-panel" role="tabpanel" aria-labelledby={'workflow-step-' + active} className="workflow-panel"><StepArt step={active} /><div><p className="eyebrow">{step.area}</p><h3 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">{step.outcome}</h3><p className="mt-4 max-w-lg text-base leading-relaxed text-navy/80">{step.desc}</p><p className="mt-5 text-sm font-medium text-navy/75"><span className="font-semibold text-navy">Owner:</span> {step.who}</p></div></div>
    <details className="workflow-full"><summary>The complete workflow</summary><ol>{STEPS.map((s,i) => <li key={s.title}><span className="font-semibold text-harbor">{i+1}. {s.title}</span><p className="mt-1 text-sm leading-relaxed text-navy/80">{s.desc}</p></li>)}</ol></details>
  </div> : <ol className="workflow-fallback">{STEPS.map((s,i) => <li key={s.title}><span className="workflow-step-number" aria-hidden="true">{i+1}</span><div><h3 className="text-lg font-bold text-navy">{s.title}</h3><p className="mt-2 text-sm leading-relaxed text-navy/80">{s.desc}</p></div></li>)}</ol>;
}