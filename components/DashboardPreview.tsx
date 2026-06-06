'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Full dashboard feature — the centerpiece of the dashboard section.
 *
 * - Latest 0–100 AI Visibility Score is the dominant element (animated ring).
 * - Four core metrics as bars that fill in when scrolled into view.
 * - Score history is SECONDARY (small sparkline + a "Latest" selector).
 * - Hallucination Detection has its OWN flagged panel with anonymized EXAMPLE
 *   alerts, clearly labeled — never presented as real client findings.
 *
 * Bars + ring animate on first view (respecting prefers-reduced-motion).
 * All numbers are illustrative placeholders.
 */

const SCORE = 68; // illustrative
const metrics = [
  { label: 'Mention Rate', value: 58 },
  { label: 'Citation Share', value: 41 },
  { label: 'Share of Voice', value: 63 },
  { label: 'Prominence Score', value: 52 },
];

const exampleAlerts = [
  'AI listed the company’s service area incorrectly.',
  'AI cited an outdated directory page as the source.',
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            ob.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);
  return { ref, inView };
}

function ScoreRing({ score, animate }: { score: number; animate: boolean }) {
  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const dash = (score / 100) * circumference;
  const offset = animate ? circumference - dash : circumference;

  return (
    <div className="relative flex h-[200px] w-[200px] items-center justify-center">
      <svg width="200" height="200" viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="100" r={radius} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="14" />
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#00C2FF"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 100 100)"
          style={{ transition: 'stroke-dashoffset 1200ms cubic-bezier(0.2,0.7,0.2,1)' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-sora text-5xl font-extrabold text-white">{score}</span>
        <span className="text-sm text-white/55">/ 100</span>
      </div>
    </div>
  );
}

function MetricBar({ label, value, animate }: { label: string; value: number; animate: boolean }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm text-white/80">{label}</span>
        <span className="text-sm font-semibold text-white">{value}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-blue"
          style={{
            width: animate ? `${value}%` : '0%',
            transition: 'width 1100ms cubic-bezier(0.2,0.7,0.2,1)',
          }}
        />
      </div>
    </div>
  );
}

export default function DashboardPreview() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl border border-white/12 bg-navy-panel p-5 shadow-card sm:p-6">
      <div aria-hidden className="glow-blue pointer-events-none absolute left-2 top-16 h-44 w-44 opacity-70" />
      <div className="relative mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/55">
            AI Visibility Score
          </p>
          <p className="mt-0.5 text-sm text-white/45">Latest audit</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-2.5 py-1 text-xs text-white/70">
          Latest
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M3 4.5L6 7.5l3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <div className="grid items-center gap-6 sm:grid-cols-2">
        <div className="flex justify-center">
          <ScoreRing score={SCORE} animate={inView} />
        </div>
        <div className="space-y-4">
          {metrics.map((m) => (
            <MetricBar key={m.label} {...m} animate={inView} />
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-lg bg-white/5 px-4 py-3">
        <span className="text-xs text-white/55">Score history</span>
        <svg width="120" height="28" viewBox="0 0 120 28" fill="none" aria-hidden="true">
          <polyline
            points="0,22 20,18 40,20 60,12 80,14 100,8 120,6"
            fill="none"
            stroke="#00C2FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="mt-4 rounded-lg border border-alert/40 bg-alert/10 p-4">
        <div className="mb-2 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 1.5l6.5 11.5h-13L8 1.5z" stroke="#FF5A5F" strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M8 6.5v3M8 11.3v.2" stroke="#FF5A5F" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span className="text-sm font-semibold text-alert">Hallucination Alerts</span>
        </div>
        <ul className="space-y-1.5 text-sm text-white/80">
          {exampleAlerts.map((a) => (
            <li key={a} className="flex items-start gap-2">
              <span className="mt-2 h-1 w-1 flex-none rounded-full bg-alert" />
              {a}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-white/45">
          Example alerts — final findings appear after audit.
        </p>
      </div>
    </div>
  );
}
