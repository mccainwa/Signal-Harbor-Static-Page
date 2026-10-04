'use client';

import { useState } from 'react';
import CTAButton from './CTAButton';
import { SITE, CTA } from '@/lib/site';

/* Keep the deployed site's centered lighthouse geometry and sweeping beam. */
function BeaconBackdrop({ paused }: { paused: boolean }) {
  return (
    <div aria-hidden="true" className={`beacon-backdrop pointer-events-none absolute inset-0 ${paused ? 'beacon-paused' : ''}`}>
      <svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMax slice" className="absolute bottom-0 left-1/2 h-full w-[1400px] max-w-none -translate-x-1/2">
        <defs>
          <linearGradient id="home-beacon-light" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#00C2FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[130, 210, 300, 400, 510, 630].map((r, i) => (
          <circle key={r} cx="600" cy="560" r={r} fill="none" stroke={i % 2 ? '#0369A1' : '#0A1628'} strokeWidth="1" strokeOpacity={i % 2 ? '0.12' : '0.07'} />
        ))}
        {Array.from({ length: 13 }, (_, i) => {
          const a = ((195 + i * 12.5) * Math.PI) / 180;
          return <line key={i} x1={600 + Math.cos(a) * 620} y1={560 + Math.sin(a) * 620} x2={600 + Math.cos(a) * 634} y2={560 + Math.sin(a) * 634} stroke="#0369A1" strokeOpacity="0.2" />;
        })}
        <g className="beacon-beam" style={{ transformBox: 'fill-box', opacity: 0 }}>
          <path d="M600 560 L380 -40 L820 -40 Z" fill="url(#home-beacon-light)" />
        </g>
      </svg>
    </div>
  );
}

export default function Hero() {
  const [paused, setPaused] = useState(false);
  return (
    <section className="hero-light relative isolate overflow-hidden">
      <BeaconBackdrop paused={paused} />
      <div className="container-x relative pb-20 pt-20 text-center sm:pb-24 sm:pt-24">
        <p className="eyebrow">AI search visibility. A managed program.</p>
        <h1 className="mx-auto mt-5 max-w-[1040px] text-[2.55rem] font-extrabold leading-[1.12] tracking-[-0.04em] text-navy sm:text-[3.5rem]">
          Help buyers find your company <span className="text-tint sm:block">in AI answers.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[660px] text-lg leading-relaxed text-navy/75 sm:text-xl">
          When AI recommends your competitors, we find out why and prepare the content your team needs to close the gap.
        </p>
        <p className="mx-auto mt-4 max-w-xl text-[15px] font-medium text-harbor">
          For middle market and enterprise marketing teams.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row" data-cta-zone="hero">
          <CTAButton href={SITE.bookingUrl}>{CTA.primary}<span aria-hidden="true" className="ml-3">→</span></CTAButton>
          <CTAButton href="#preview" variant="outline">Explore the client portal</CTAButton>
        </div>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-navy/65">
          A complimentary AI Visibility Snapshot and live portal demo, in one call.
        </p>
      </div>
      <button type="button" aria-pressed={paused} onClick={() => setPaused(v => !v)} className="beacon-toggle absolute bottom-3 right-5 inline-flex min-h-[44px] items-center gap-2 rounded-full px-3 text-xs font-medium text-harbor hover:bg-white/60 sm:right-8" aria-label={paused ? 'Play lighthouse animation' : 'Pause lighthouse animation'}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">{paused ? <path d="M3 1l8 5-8 5z" /> : <><rect x="2" y="1" width="3" height="10" rx="1" /><rect x="7" y="1" width="3" height="10" rx="1" /></>}</svg>
        <span>{paused ? 'Play' : 'Pause'} beacon</span>
      </button>
    </section>
  );
}
