'use client';

import { useState } from 'react';
import Section, { SectionHeading } from './Section';
import CTAButton from './CTAButton';
import { SITE, CTA } from '@/lib/site';
import { IconRadar, IconRanking, IconMap, IconShield } from './icons';

const tabs = [
  { id: 'visibility', label: 'Visibility', icon: IconRadar },
  { id: 'competitors', label: 'Competitors', icon: IconRanking },
  { id: 'sources', label: 'Sources', icon: IconMap },
  { id: 'accuracy', label: 'Accuracy', icon: IconShield },
] as const;

type TabId = (typeof tabs)[number]['id'];

const blurbs: Record<TabId, { title: string; body: string }> = {
  visibility: { title: 'Are you mentioned at all?', body: 'See your AI visibility score, mention share, and which prompt categories include you and which leave you out.' },
  competitors: { title: 'Who gets recommended instead?', body: 'Track where competitors appear and you do not, across the same buyer prompts and engines.' },
  sources: { title: 'What does AI actually cite?', body: 'Map the owned, earned, review, directory, and competitor sources shaping the answer.' },
  accuracy: { title: 'What is wrong or outdated?', body: 'Surface unsupported or outdated claims, ranked by correction priority.' },
};

function Panel({ id }: { id: TabId }) {
  if (id === 'visibility') {
    return (
      <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
        <div className="relative flex h-28 w-28 flex-none items-center justify-center">
          <svg width="112" height="112" viewBox="0 0 112 112" aria-hidden="true"><circle cx="56" cy="56" r="42" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="8" /><circle cx="56" cy="56" r="42" fill="none" stroke="#00C2FF" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${0.64 * 2 * Math.PI * 42} ${2 * Math.PI * 42}`} transform="rotate(-90 56 56)" /></svg>
          <div className="absolute text-center"><div className="font-sora text-3xl font-extrabold text-white">64</div><div className="text-[10px] text-white/40">visibility</div></div>
        </div>
        <div className="space-y-2.5 self-center">
          {[['Mention share', 58], ['Comparison prompts', 46], ['Category prompts', 71]].map(([l, w]) => (
            <div key={l as string}><div className="flex justify-between text-[11px] text-white/65"><span>{l}</span><span>{w}%</span></div><div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-blue" style={{ width: `${w}%` }} /></div></div>
          ))}
        </div>
      </div>
    );
  }
  if (id === 'competitors') {
    return (
      <div className="space-y-2.5">
        {[['Competitor A', 72], ['Competitor B', 54], ['Competitor C', 47], ['You', 38]].map(([l, w]) => (
          <div key={l as string}><div className="flex justify-between text-[11px] text-white/65"><span>{l}</span><span>{w}%</span></div><div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10"><div className={`h-full rounded-full ${l === 'You' ? 'bg-white/40' : 'bg-blue'}`} style={{ width: `${w}%` }} /></div></div>
        ))}
        <p className="pt-1 text-xs text-white/55">14 prompts where a competitor appears and you do not.</p>
      </div>
    );
  }
  if (id === 'sources') {
    return (
      <div className="grid gap-4 sm:grid-cols-[1.4fr_1fr] sm:items-center">
        <svg viewBox="0 0 320 140" className="w-full" aria-hidden="true">
          <line x1="50" y1="70" x2="150" y2="34" stroke="rgba(0,194,255,.4)" strokeWidth="1.5" /><line x1="50" y1="70" x2="160" y2="104" stroke="rgba(0,194,255,.4)" strokeWidth="1.5" /><line x1="50" y1="70" x2="140" y2="72" stroke="rgba(0,194,255,.4)" strokeWidth="1.5" /><line x1="150" y1="34" x2="260" y2="44" stroke="rgba(255,255,255,.14)" strokeWidth="1.2" /><line x1="160" y1="104" x2="268" y2="110" stroke="rgba(255,255,255,.14)" strokeWidth="1.2" />
          <circle cx="50" cy="70" r="14" fill="#00C2FF" /><text x="50" y="74" textAnchor="middle" fill="#0A1628" fontSize="10" fontWeight="700">AI</text>
          {[[150,34,'Review'],[160,104,'Directory'],[140,72,'Owned'],[260,44,'Blog'],[268,110,'Forum']].map(([x,y,t])=>(<g key={t as string}><circle cx={x as number} cy={y as number} r="7" fill="rgba(255,255,255,.18)" /><text x={(x as number)+11} y={(y as number)+3} fill="rgba(255,255,255,.55)" fontSize="10">{t}</text></g>))}
        </svg>
        <div className="flex flex-wrap gap-1.5">{['Owned', 'Earned', 'Reviews', 'Directory', 'Competitor'].map((t) => (<span key={t} className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/65">{t}</span>))}</div>
      </div>
    );
  }
  return (
    <div className="space-y-2.5">
      {[['Outdated pricing claim', 'high', 'text-alert'], ['Unsupported comparison', 'med', 'text-warn'], ['Missing certification', 'low', 'text-white/55']].map(([t, p, c]) => (
        <div key={t} className="flex items-center justify-between rounded-lg border border-white/10 bg-navy/40 px-3 py-2.5 text-sm">
          <span className="text-white/75">{t}</span><span className={`text-[11px] font-semibold uppercase ${c}`}>{p}</span>
        </div>
      ))}
      <p className="pt-1 text-xs text-white/55">Ranked by correction priority for brand accuracy.</p>
    </div>
  );
}

export default function ProductTour() {
  const [active, setActive] = useState<TabId>('visibility');
  const current = blurbs[active];
  return (
    <Section tone="navy-deep" id="tour">
      <SectionHeading
        eyebrow="Platform"
        title="See what Signal Harbor measures."
        intro="Click through the four questions every company should be able to answer about AI-led buyer research."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Tabs */}
        <div className="flex flex-col gap-2.5">
          {tabs.map((t) => {
            const Icon = t.icon;
            const on = active === t.id;
            return (
              <button key={t.id} type="button" onClick={() => setActive(t.id)} className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${on ? 'border-blue/50 bg-blue/10' : 'border-white/10 bg-navy-panel hover:border-white/25'}`}>
                <span className={`grid h-10 w-10 flex-none place-items-center rounded-xl ${on ? 'bg-blue/20 text-blue' : 'bg-white/5 text-white/60'}`}><Icon size={20} /></span>
                <span>
                  <span className={`block text-[15px] font-bold ${on ? 'text-white' : 'text-white/80'}`}>{t.label}</span>
                  <span className="block text-xs text-white/55">{blurbs[t.id].title}</span>
                </span>
              </button>
            );
          })}
          <div className="mt-2"><CTAButton href={SITE.bookingUrl} variant="primary" className="w-full">{CTA.primary}</CTAButton></div>
        </div>

        {/* Panel */}
        <div className="rounded-2xl border border-white/12 bg-navy-panel p-6 shadow-card sm:p-8">
          <h3 className="text-lg font-bold text-white">{current.title}</h3>
          <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-white/65">{current.body}</p>
          <div className="mt-6">
            <Panel id={active} />
          </div>
        </div>
      </div>
    </Section>
  );
}
