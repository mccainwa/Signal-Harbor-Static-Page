'use client';

import { useRef, useState, type KeyboardEvent } from 'react';

const STAGES = [
  { name: 'Discover', theme: 'The problem', question: 'Who can solve the problem our team is facing?', detail: 'Identify category questions where buyers first look for options.', evidence: ['Category answers', 'Named providers', 'Cited sources'] },
  { name: 'Compare', theme: 'The fit', question: 'Which provider is the best fit for a company like ours?', detail: 'Examine how your company is compared with the alternatives.', evidence: ['Competitor presence', 'Product differences', 'Comparison sources'] },
  { name: 'Evaluate', theme: 'The evidence', question: 'What evidence supports choosing this provider?', detail: 'Check the claims and sources buyers use to validate your offer.', evidence: ['Supported claims', 'Answer accuracy', 'Proof gaps'] },
  { name: 'Decide', theme: 'The next step', question: 'What would it take for our team to get started?', detail: 'Find whether implementation and buying questions have clear answers.', evidence: ['Implementation questions', 'Decision criteria', 'Next actions'] },
];
export default function BuyerQuestionGraph({ interactive, prefix }: { interactive: boolean; prefix: string }) {
  const [active, setActive] = useState(1);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const points = [[76, 157], [180, 117], [284, 77], [388, 37]];
  function keys(e: KeyboardEvent<HTMLButtonElement>) {
    const next = e.key === 'ArrowRight' ? (active + 1) % 4 : e.key === 'ArrowLeft' ? (active + 3) % 4 : e.key === 'Home' ? 0 : e.key === 'End' ? 3 : null;
    if (next !== null) { e.preventDefault(); setActive(next); refs.current[next]?.focus(); }
  }
  const stage = STAGES[active];
  return <div className="buyer-graph-layout">
    <div className="buyer-graph-card">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2"><p className="portal-kicker">Build stronger AI visibility</p><span className="text-xs font-medium text-navy/75">Across the buyer journey</span></div>
      <div className="buyer-plot" aria-hidden="true">
        <svg viewBox="0 0 440 215" className="h-auto w-full">
          <defs><linearGradient id={prefix + '-path'} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#00C2FF" /><stop offset="1" stopColor="#0369A1" /></linearGradient><linearGradient id={prefix + '-fill'} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#00C2FF" stopOpacity=".2" /><stop offset="1" stopColor="#00C2FF" stopOpacity="0" /></linearGradient></defs>
          {[37, 97, 157].map((y, i) => <g key={y}><path d={'M50 ' + y + 'H414'} stroke="#d9e8f1" strokeDasharray="3 5" /><text x="0" y={y + 4} fill="#3e5c70" fontSize="11">{['Proof', 'Fit', 'Need'][i]}</text></g>)}
          {points.map(([x], i) => <path key={i} d={'M' + x + ' 30V185'} stroke="#e4eff5" />)}
          <rect x={points[active][0] - 30} y="28" width="60" height="155" rx="12" fill="#00c2ff" fillOpacity=".07" className="buyer-graph-highlight" />
          <path d="M76 157C120 157 137 117 180 117S240 77 284 77S346 37 388 37V187H76Z" fill={'url(#' + prefix + '-fill)'} />
          <path className="buyer-graph-line" d="M76 157C120 157 137 117 180 117S240 77 284 77S346 37 388 37" fill="none" stroke={'url(#' + prefix + '-path)'} strokeWidth="3.5" strokeLinecap="round" />
          {points.map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r={active === i ? 12 : 7} fill={active === i ? '#00C2FF' : '#ffffff'} fillOpacity={active === i ? '.16' : '1'} stroke="#0a8ec1" strokeWidth={active === i ? 0 : 2} /><circle cx={x} cy={y} r={active === i ? 5 : 0} fill="#007bad" /><text x={x} y="207" textAnchor="middle" fill={active === i ? '#035d8c' : '#3e5c70'} fontSize="11" fontWeight={active === i ? '700' : '500'}>{STAGES[i].name}</text></g>)}
        </svg>
      </div>
      {interactive && <div role="tablist" aria-label="Buyer journey stages" className="buyer-stage-tabs">{STAGES.map((s, i) => <button key={s.name} type="button" role="tab" ref={el => { refs.current[i] = el; }} id={prefix + '-stage-' + i} aria-selected={i === active} aria-controls={prefix + '-focus'} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={keys}>{s.name}</button>)}</div>}
      <div className="platform-chips mt-4" aria-label="AI answer platforms">{['ChatGPT', 'Claude', 'Gemini', 'Perplexity'].map(p => <span key={p}>{p}</span>)}</div>
    </div>
    <div id={prefix + '-focus'} role={interactive ? 'tabpanel' : undefined} aria-labelledby={interactive ? prefix + '-stage-' + active : undefined} className="buyer-question-focus">
      <p className="portal-kicker">{stage.name} / {stage.theme}</p>
      <h4 className="mt-3 font-sora text-xl font-bold leading-snug text-navy">{stage.question}</h4>
      <p className="mt-3 text-sm leading-relaxed text-navy/80">{stage.detail}</p>
      <ul className="mt-5 space-y-3">{stage.evidence.map(t => <li key={t} className="flex items-center gap-3 text-sm font-medium text-navy/85"><span aria-hidden="true" className="evidence-node" />{t}</li>)}</ul>
    </div>
  </div>;
}
