'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { REVIEW_CONTROLS } from '@/lib/portal-example';
import BuyerQuestionGraph from './BuyerQuestionGraph';

type Area = 'home' | 'insights' | 'campaign' | 'results';
type Decision = 'approved' | 'changes' | 'rejected' | null;
const AREAS: { id: Area; label: string; title: string }[] = [
  { id: 'home', label: 'Home', title: 'Your next move, in focus.' },
  { id: 'insights', label: 'Insights', title: 'Understand how AI sees your company.' },
  { id: 'campaign', label: 'Campaign', title: 'Better answers start with better content.' },
  { id: 'results', label: 'Results', title: 'See what changed. Decide what comes next.' },
];
const METRICS = [
  { label: 'Mention', verb: 'Be seen', detail: 'Does the answer name your company?', color: '#007bad', light: '#00c2ff' },
  { label: 'Recommendation', verb: 'Be considered', detail: 'Does the answer suggest buyers choose you?', color: '#086ca7', light: '#5bacf5' },
  { label: 'Citation', verb: 'Be a source', detail: 'Which pages does the answer draw on?', color: '#087a77', light: '#54cfc3' },
  { label: 'Accuracy', verb: 'Be understood', detail: 'Does the answer describe your offer correctly?', color: '#6955aa', light: '#b4a5ff' },
];

function Icon({ area }: { area: Area }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{area === 'home' ? <><path d="M3 10l9-7 9 7v10H3z" /><path d="M9 20v-7h6v7" /></> : area === 'insights' ? <><circle cx="10" cy="10" r="6" /><path d="M15 15l6 6M10 7v6M7 10h6" /></> : area === 'campaign' ? <><path d="M5 3h10l4 4v14H5zM14 3v5h5M8 12h8M8 16h5" /></> : <><path d="M3 20h18M6 16V9M12 16V4M18 16v-5" /></>}</svg>;
}

/** Metric selector: the rings describe measurement categories, not a numeric score. */
function MeasureLens({ interactive, prefix }: { interactive: boolean; prefix: string }) {
  const [selected, setSelected] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  function keys(e: KeyboardEvent<HTMLButtonElement>) {
    const next = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (selected + 1) % 4 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? (selected + 3) % 4 : e.key === 'Home' ? 0 : e.key === 'End' ? 3 : null;
    if (next !== null) { e.preventDefault(); setSelected(next); refs.current[next]?.focus(); }
  }
  const metric = METRICS[selected];
  return <div className="measure-lens">
    <div className="lens-art" aria-hidden="true">
      <svg viewBox="0 0 240 240" className="lens-radar">
        <defs><linearGradient id={prefix + '-arc'} x1="0" y1="0" x2="1" y2="1"><stop stopColor={metric.light} /><stop offset="1" stopColor={metric.color} /></linearGradient></defs>
        <circle cx="120" cy="120" r="96" fill="none" stroke="#dfedf5" strokeWidth="1" />
        <circle cx="120" cy="120" r="73" fill="none" stroke="#d4e8f2" strokeWidth="1" />
        <circle cx="120" cy="120" r="50" fill="none" stroke="#cfE5f0" strokeWidth="1" strokeDasharray="2 5" />
        <path d="M120 24V70M120 170V216M24 120H70M170 120H216" stroke="#d4e8f2" />
        {[0, 1, 2, 3].map(i => <circle key={i} cx="120" cy="120" r="83" fill="none" stroke={selected === i ? 'url(#' + prefix + '-arc)' : '#e6f0f6'} strokeWidth={selected === i ? 7 : 4} strokeDasharray="109 413" strokeLinecap="round" transform={'rotate(' + (i * 90 - 83) + ' 120 120)'} className="lens-arc" />)}
        {[[120, 24], [216, 120], [120, 216], [24, 120]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={selected === i ? 5 : 3} fill={selected === i ? metric.color : '#b8d8e9'} />)}
      </svg>
      <div className="lens-center" style={{ color: metric.color }}><span className="lens-spark" style={{ color: metric.color }}>✦</span><span>{metric.verb}</span></div>
    </div>
    <div className="lens-options">
      <p className="portal-kicker mb-2">AI visibility</p>
      <div role={interactive ? 'tablist' : undefined} aria-label={interactive ? 'Explore visibility measures' : undefined} aria-orientation={interactive ? 'vertical' : undefined} className="space-y-1">
        {METRICS.map((m, i) => interactive ? <button type="button" role="tab" key={m.label} ref={el => { refs.current[i] = el; }} id={prefix + '-metric-' + i} aria-selected={i === selected} aria-controls={prefix + '-definition'} tabIndex={i === selected ? 0 : -1} onKeyDown={keys} onClick={() => setSelected(i)} className={'lens-option ' + (selected === i ? 'lens-option-active' : '')}><span className="lens-option-mark" aria-hidden="true" /><span>{m.label}</span><span className="ml-auto" aria-hidden="true">{i === selected ? '↗' : ''}</span></button> : <p key={m.label} className="lens-option">{m.label}</p>)}
      </div>
      <p id={prefix + '-definition'} role={interactive ? 'tabpanel' : undefined} aria-labelledby={interactive ? prefix + '-metric-' + selected : undefined} className="lens-definition">{metric.detail}</p>
    </div>
  </div>;
}
function HomePanel({ navigate, interactive }: { navigate: (n: number) => void; interactive: boolean }) {
  return <div className="portal-content-grid">
    <div className="portal-chart-surface"><MeasureLens interactive={interactive} prefix="home-lens" /></div>
    <div className="portal-next-action">
      <span className="portal-kicker">From insight to action</span>
      <h4 className="mt-3 font-sora text-xl font-bold text-navy">Close the gaps in your buyer&apos;s shortlist.</h4>
      <p className="mt-3 text-sm leading-relaxed text-navy/75">Evidence sets the priority. Prepared content gives your team a clear next step.</p>
      <div className="portal-mini-path" aria-hidden="true"><span>Find</span><i /><span>Prepare</span><i /><span>Review</span></div>
      {interactive && <button type="button" className="portal-text-action" onClick={() => navigate(2)}>Explore content review <span aria-hidden="true">→</span></button>}
    </div>
  </div>;
}
function InsightsPanel({ interactive }: { interactive: boolean }) {
  return <BuyerQuestionGraph interactive={interactive} prefix="insights-graph" />;
}
function CampaignPanel({ decision, decide, interactive }: { decision: Decision; decide: (d: Decision) => void; interactive: boolean }) {
  const state = decision === 'approved' ? 'Approved for publishing' : decision === 'changes' ? 'Changes requested' : decision === 'rejected' ? 'Rejected' : 'Content review';
  return <div className="portal-content-grid campaign-grid">
    <div className="portal-content-paper">
      <div className="flex items-center justify-between gap-3"><span className="portal-kicker">Product comparison</span><span className="paper-page-icon" aria-hidden="true"><Icon area="campaign" /></span></div>
      <h4 className="mt-5 max-w-sm font-sora text-2xl font-bold leading-snug text-navy">Your product.<br />Clearly compared.</h4>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-navy/75">Who it is for. What it solves. How it fits.</p>
      <div className="paper-lines" aria-hidden="true"><span /><span /><span /></div>
      <div className="paper-fact-check"><span aria-hidden="true">✓</span><span>Built from your confirmed company facts.</span></div>
    </div>
    <div className="portal-review">
      <p className="portal-kicker">Your team stays in control</p>
      <h4 className="mt-3 font-sora text-xl font-bold leading-snug text-navy">Review the exact version that goes live.</h4>
      <p className="mt-3 text-sm leading-relaxed text-navy/75">Approve the work, request changes, or reject it. Publication follows your approval process.</p>
      {interactive && <><div role="group" aria-label="Content review decisions" className="portal-review-actions">{REVIEW_CONTROLS.map((label, i) => <button key={label} type="button" aria-pressed={decision === (['approved', 'changes', 'rejected'] as const)[i]} onClick={() => decide((['approved', 'changes', 'rejected'] as const)[i])} className={i === 0 ? 'portal-approve' : 'portal-decision'}>{i === 0 && <span aria-hidden="true">✓</span>}{label}</button>)}</div><div className="portal-review-status"><p role="status" aria-live="polite"><span className={'review-indicator ' + (decision === 'approved' ? 'review-approved' : '')} aria-hidden="true" />{state}</p>{decision && <button type="button" onClick={() => decide(null)} className="text-xs font-semibold text-harbor underline underline-offset-4">Reset review</button>}</div></>}
    </div>
  </div>;
}
function ResultsPanel({ interactive }: { interactive: boolean }) {
  return <div className="portal-content-grid">
    <div className="portal-chart-surface"><MeasureLens interactive={interactive} prefix="results-lens" /></div>
    <div className="results-cycle">
      <p className="portal-kicker mb-4">A comparable view of change</p>
      <div className="comparison-cycle" aria-hidden="true"><span>Baseline</span><svg viewBox="0 0 100 70"><path d="M10 35C10 5 90 5 90 35M90 35C90 65 10 65 10 35" fill="none" stroke="#afd9ec" strokeWidth="2" /><path d="m85 29 5 6 5-6M5 41l5-6 5 6" fill="none" stroke="#007bad" strokeWidth="2" /></svg><span>Retest</span></div>
      <ul className="mt-5 space-y-3 text-sm text-navy/80">{['Matched questions and AI platforms', 'Search, traffic, and conversions', 'Evidence-based impact estimates'].map(t => <li key={t} className="flex items-center gap-2.5"><span className="text-harbor" aria-hidden="true">✓</span>{t}</li>)}</ul>
      <p className="mt-4 text-xs leading-relaxed text-navy/80">Remeasure what changed. Use the evidence to improve the next move.</p>
    </div>
  </div>;
}

export default function PortalTour({ idPrefix = 'portal', headingLevel = 3, initialArea = 0 }: { idPrefix?: string; headingLevel?: 2 | 3; initialArea?: number }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(initialArea);
  const [decision, setDecision] = useState<Decision>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => setEnhanced(true), []);
  const navigate = (n: number) => { setActive(n); tabs.current[n]?.focus(); };
  function keys(e: KeyboardEvent<HTMLButtonElement>) {
    const n = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? (active + 1) % 4 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? (active + 3) % 4 : e.key === 'Home' ? 0 : e.key === 'End' ? 3 : null;
    if (n !== null) { e.preventDefault(); navigate(n); }
  }
  function panel(area: Area) {
    return area === 'home' ? <HomePanel navigate={navigate} interactive={enhanced} /> : area === 'insights' ? <InsightsPanel interactive={enhanced} /> : area === 'campaign' ? <CampaignPanel decision={decision} decide={setDecision} interactive={enhanced} /> : <ResultsPanel interactive={enhanced} />;
  }
  return <figure className="portal-window text-left" aria-label="Explore the Signal Harbor client portal">
    <div className="portal-window-bar"><span className="flex min-w-0 items-center gap-2.5"><img src="/signal-harbor-emblem.png" alt="" width="26" height="32" className="h-7 w-auto" /><span className="text-xs font-bold tracking-wide text-navy">SIGNAL HARBOR</span></span><span className="text-xs font-medium text-navy/60">Client portal</span></div>
    {!enhanced ? <div className="portal-fallback">{AREAS.map((a, i) => <details key={a.id} open={i === initialArea} className="group border-b border-navy/[0.08] last:border-b-0"><summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-harbor [&::-webkit-details-marker]:hidden">{a.label}<span aria-hidden="true">+</span></summary><div className="p-5 pt-0"><Heading className="mb-5 text-xl font-bold text-navy">{a.title}</Heading>{panel(a.id)}</div></details>)}</div> : <>
      <div role="tablist" aria-label="Portal areas" className="portal-nav">{AREAS.map((a, i) => <button key={a.id} type="button" role="tab" ref={el => { tabs.current[i] = el; }} id={idPrefix + '-tab-' + a.id} aria-selected={i === active} aria-controls={idPrefix + '-panel-' + a.id} tabIndex={i === active ? 0 : -1} onClick={() => setActive(i)} onKeyDown={keys} className={'portal-nav-item ' + (i === active ? 'portal-nav-active' : '')}><Icon area={a.id} /><span>{a.label}</span></button>)}</div>
      {AREAS.map((a, i) => <section key={a.id} role="tabpanel" id={idPrefix + '-panel-' + a.id} aria-labelledby={idPrefix + '-tab-' + a.id} tabIndex={0} hidden={active !== i} className="portal-area"><Heading className="mb-6 text-xl font-bold leading-snug text-navy sm:text-2xl">{a.title}</Heading>{panel(a.id)}</section>)}
    </>}
  </figure>;
}
