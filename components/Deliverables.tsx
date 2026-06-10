import Section, { SectionHeading } from './Section';

/** Stylized mini document/report tile preview used on each deliverable card. */
function DocPreview({ kind }: { kind: 'score' | 'matrix' | 'map' | 'list' }) {
  return (
    <div className="relative h-24 overflow-hidden rounded-xl border border-white/10 bg-navy p-3">
      <div className="flex items-center justify-between">
        <span className="h-1.5 w-10 rounded-full bg-white/20" />
        <span className="h-3 w-3 rounded-sm bg-blue/50" />
      </div>
      {kind === 'score' && (
        <div className="mt-3 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-blue/60 font-sora text-xs font-bold text-blue">68</div>
          <div className="flex-1 space-y-1.5">{[60, 40].map((w, i) => (<div key={i} className="h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-blue/70" style={{ width: `${w}%` }} /></div>))}</div>
        </div>
      )}
      {kind === 'matrix' && (
        <div className="mt-3 grid grid-cols-4 gap-1.5">{Array.from({ length: 12 }).map((_, i) => (<span key={i} className={`h-3 rounded ${[0, 5, 6, 10].includes(i) ? 'bg-blue/60' : 'bg-white/10'}`} />))}</div>
      )}
      {kind === 'map' && (
        <svg viewBox="0 0 120 40" className="mt-2 w-full" aria-hidden="true"><circle cx="20" cy="20" r="5" fill="#00C2FF" /><circle cx="60" cy="12" r="3.5" fill="rgba(255,255,255,.3)" /><circle cx="95" cy="26" r="3.5" fill="rgba(255,255,255,.3)" /><circle cx="80" cy="8" r="3" fill="rgba(255,255,255,.3)" /><path d="M25 20L57 13M25 21L92 25M25 19L78 9" stroke="rgba(0,194,255,.4)" strokeWidth="1" /></svg>
      )}
      {kind === 'list' && (
        <div className="mt-3 space-y-2">{[80, 65, 72].map((w, i) => (<div key={i} className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm border border-blue/50" /><span className="h-1.5 rounded-full bg-white/12" style={{ width: `${w}%` }} /></div>))}</div>
      )}
    </div>
  );
}

const items: { name: string; kind: 'score' | 'matrix' | 'map' | 'list' }[] = [
  { name: 'Executive Scorecard', kind: 'score' },
  { name: 'Prompt Performance Matrix', kind: 'matrix' },
  { name: 'AI Answer Evidence Packet', kind: 'list' },
  { name: 'Citation Map', kind: 'map' },
  { name: 'Accuracy / Hallucination Register', kind: 'list' },
  { name: 'Content Gap Plan', kind: 'list' },
  { name: 'Vendor Accountability Notes', kind: 'list' },
  { name: '30/60/90-Day Action Roadmap', kind: 'list' },
];

export default function Deliverables() {
  return (
    <Section tone="navy" id="deliverables">
      <SectionHeading
        eyebrow="Deliverables"
        title="A stack of executive-ready artifacts."
        intro="Built for decisions and execution — not raw model dumps."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.name} className="card-dark lift rounded-2xl border border-white/12 p-4">
            <DocPreview kind={it.kind} />
            <h3 className="mt-3 text-[15px] font-bold leading-snug text-white">{it.name}</h3>
          </div>
        ))}
      </div>
    </Section>
  );
}
