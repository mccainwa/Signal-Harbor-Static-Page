'use client';

import { useState } from 'react';
import Section, { SectionHeading } from './Section';

type MetricKey = 'visibility' | 'recommendation' | 'accuracy';

type Metric = {
  label: string;
  score: number;
  explanation: string;
  you: number[];
  compA: number[];
  compB: number[];
  stats: [string, string][];
};

/**
 * All values are illustrative sample data. The panel is labeled as such and
 * the section says so in plain text. Nothing here represents client results.
 */
const METRICS: Record<MetricKey, Metric> = {
  visibility: {
    label: 'Visibility',
    score: 64,
    explanation:
      'Visibility means how often AI platforms mention your company at all across the tested buyer questions.',
    you: [38, 42, 41, 47, 52, 58, 61, 64],
    compA: [55, 54, 57, 56, 58, 57, 59, 60],
    compB: [46, 48, 45, 49, 47, 50, 49, 51],
    stats: [
      ['Mention share', '58%'],
      ['Prompts including you', '41 of 64'],
      ['Change across cycles', '+26 pts'],
    ],
  },
  recommendation: {
    label: 'Recommendation',
    score: 41,
    explanation:
      'Recommendation means how often AI platforms actively suggest your company for the buyer’s situation, not just mention it.',
    you: [22, 24, 23, 28, 31, 35, 38, 41],
    compA: [49, 50, 48, 51, 50, 52, 51, 53],
    compB: [33, 32, 35, 34, 36, 35, 37, 36],
    stats: [
      ['Recommendation share', '34%'],
      ['Prompts recommending you', '14 of 64'],
      ['Change across cycles', '+19 pts'],
    ],
  },
  accuracy: {
    label: 'Accuracy',
    score: 78,
    explanation:
      'Accuracy means how closely AI descriptions of your company match verified, current facts.',
    you: [55, 58, 62, 61, 67, 71, 74, 78],
    compA: [70, 71, 69, 72, 71, 73, 72, 74],
    compB: [61, 60, 63, 62, 64, 63, 65, 66],
    stats: [
      ['Claims verified', '78%'],
      ['Open accuracy flags', '3'],
      ['Change across cycles', '+23 pts'],
    ],
  },
};

const ORDER: MetricKey[] = ['visibility', 'recommendation', 'accuracy'];

/* Chart geometry (viewBox units) */
const W = 560;
const H = 236;
const PX0 = 42;
const PX1 = 546;
const PY0 = 18;
const PY1 = 200;

const xAt = (i: number, n: number) => PX0 + (i * (PX1 - PX0)) / (n - 1);
const yAt = (v: number) => PY1 - (v / 100) * (PY1 - PY0);
const pointsOf = (vals: number[]) => vals.map((v, i) => `${xAt(i, vals.length)},${yAt(v)}`).join(' ');

function ScoreDial({ score, label }: { score: number; label: string }) {
  const r = 70;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - score / 100);
  return (
    <div className="relative mx-auto h-[168px] w-[168px]">
      <svg width="168" height="168" viewBox="0 0 168 168" className="block" aria-hidden="true">
        <circle cx="84" cy="84" r={r} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="12" />
        <circle
          cx="84"
          cy="84"
          r={r}
          fill="none"
          stroke="#00C2FF"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform="rotate(-90 84 84)"
          className="score-arc"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-sora text-[44px] font-extrabold leading-none tabular-nums text-white">{score}</span>
        <span className="mt-1 text-xs text-white/60">of 100</span>
      </div>
      <p className="sr-only">{label} score: {score} of 100. Illustrative sample data.</p>
    </div>
  );
}

export default function MeasurementPreview() {
  const [active, setActive] = useState<MetricKey>('visibility');
  const m = METRICS[active];
  const cycles = m.you.length;

  return (
    <Section tone="navy" id="preview">
      <SectionHeading
        eyebrow="Measurement preview"
        title="AI visibility changes over time."
        intro="A single AI answer is not a stable result. Signal Harbor measures the same buyer questions repeatedly, so movement is visible and decisions rest on patterns instead of one screenshot."
      />

      <div className="mt-10 rounded-3xl border border-white/12 bg-navy-panel shadow-card">
        {/* Control row */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-7">
          <div role="group" aria-label="Choose a metric" className="inline-flex rounded-xl border border-white/12 bg-navy/60 p-1">
            {ORDER.map((key) => {
              const on = key === active;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(key)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    on ? 'bg-blue text-navy' : 'text-white/65 hover:text-white'
                  }`}
                >
                  {METRICS[key].label}
                </button>
              );
            })}
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden="true" />
            Illustrative sample data
          </span>
        </div>

        <div className="grid gap-10 p-5 sm:p-7 lg:grid-cols-[280px_1fr] lg:gap-12">
          {/* Score + meaning */}
          <div>
            <ScoreDial score={m.score} label={m.label} />
            <p className="mt-4 text-center text-sm font-semibold uppercase tracking-wider text-white/55">
              {m.label} score
            </p>
            <div aria-live="polite" className="mt-4 min-h-[4.5rem]">
              <p className="text-center text-[15px] leading-relaxed text-white/65">{m.explanation}</p>
            </div>
          </div>

          {/* Trend chart. The svg stays un-labeled so the focusable points
              inside remain individually exposed; this summary carries the
              overall reading for screen readers. */}
          <div>
            <p className="sr-only">
              {m.label} trend across {cycles} repeated test cycles, illustrative
              sample data: your company moves from {m.you[0]} to {m.you[cycles - 1]} of 100,
              alongside two generic competitor lines.
            </p>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
              {/* horizontal gridlines */}
              {[0, 25, 50, 75, 100].map((v) => (
                <g key={v}>
                  <line x1={PX0} y1={yAt(v)} x2={PX1} y2={yAt(v)} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                  <text x={PX0 - 8} y={yAt(v) + 3.5} textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.58)">{v}</text>
                </g>
              ))}
              {/* competitor series (generic labels) */}
              <polyline points={pointsOf(m.compA)} fill="none" stroke="rgba(255,255,255,0.30)" strokeWidth="1.8" strokeDasharray="5 5" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points={pointsOf(m.compB)} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.8" strokeDasharray="1.5 5" strokeLinecap="round" strokeLinejoin="round" />
              {/* your series */}
              <polyline points={pointsOf(m.you)} fill="none" stroke="#00C2FF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="draw-line" />
              {/* focusable points with hover/focus values */}
              {m.you.map((v, i) => {
                const x = xAt(i, cycles);
                const y = yAt(v);
                return (
                  <g key={`${active}-${i}`} className="chart-pt" tabIndex={0} role="img" aria-label={`Test cycle ${i + 1}: ${v} of 100`}>
                    <title>{`Test cycle ${i + 1}: ${v} of 100`}</title>
                    <circle cx={x} cy={y} r="11" fill="transparent" />
                    <circle cx={x} cy={y} r="8" fill="none" stroke="rgba(0,194,255,0.45)" strokeWidth="2" className="pt-ring" />
                    <circle cx={x} cy={y} r="4" fill="#00C2FF" />
                    <g className="pt-tip">
                      <rect x={x - 17} y={y - 34} width="34" height="20" rx="6" fill="#0A1628" stroke="rgba(0,194,255,0.5)" strokeWidth="1" />
                      <text x={x} y={y - 20} textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFFFFF">{v}</text>
                    </g>
                  </g>
                );
              })}
              {/* x axis labels */}
              {m.you.map((_, i) => (
                <text key={i} x={xAt(i, cycles)} y={H - 18} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.58)">{i + 1}</text>
              ))}
              <text x={(PX0 + PX1) / 2} y={H - 3} textAnchor="middle" fontSize="10.5" fill="rgba(255,255,255,0.62)">Repeated test cycles</text>
            </svg>
            {/* Legend */}
            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/60">
              <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="inline-block h-0.5 w-6 rounded-full bg-blue" />Your company</span>
              <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="inline-block h-0.5 w-6 rounded-full bg-white/40 [background-image:repeating-linear-gradient(90deg,transparent,transparent_3px,#0F1F36_3px,#0F1F36_6px)]" />Competitor A</span>
              <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="inline-block h-0.5 w-6 rounded-full bg-white/25 [background-image:repeating-linear-gradient(90deg,transparent,transparent_2px,#0F1F36_2px,#0F1F36_5px)]" />Competitor B</span>
            </div>
          </div>
        </div>

        {/* Supporting metrics */}
        <div className="grid gap-4 border-t border-white/10 px-5 py-5 sm:grid-cols-3 sm:px-7">
          {m.stats.map(([label, value]) => (
            <div key={label} className="rounded-xl border border-white/10 bg-navy/50 px-4 py-3.5">
              <p className="text-xs text-white/60">{label}</p>
              <p className="mt-1 font-sora text-xl font-bold tabular-nums text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-5 text-sm text-white/60">
        Illustrative sample data, not client results. Measurement runs across
        selected AI platforms based on your market and scope.
      </p>
    </Section>
  );
}
