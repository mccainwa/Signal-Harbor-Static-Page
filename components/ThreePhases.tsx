import Link from 'next/link';

const phases = [
  { name: 'Understand', subtitle: 'Find the gaps that matter.', body: 'Test buyer questions. See who AI recommends and what it gets wrong about your company.' },
  { name: 'Act', subtitle: 'Turn evidence into work.', body: 'We prepare the content. Your team reviews it before the agreed owner publishes it.' },
  { name: 'Measure', subtitle: 'Make the next move clearer.', body: 'Follow agreed measures in the portal and use the evidence to choose your next priorities.' },
];

function PhaseVisual({ index }: { index: number }) {
  return (
    <div className="phase-visual relative mb-6 h-36 overflow-hidden rounded-xl" aria-hidden="true">
      {index === 0 ? <><div className="phase-rings absolute inset-0" /><div className="absolute left-6 right-6 top-8 rounded-lg border border-[#CAE4F2] bg-white px-3 py-2.5 text-xs font-semibold text-harbor shadow-sm">What are our buyers asking?</div><div className="absolute bottom-6 left-9 flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-navy shadow-sm"><span className="h-2 w-2 rounded-full bg-blue" />Questions</div><div className="absolute bottom-6 right-9 flex items-center gap-2 rounded-full bg-[#DFF5FE] px-3 py-2 text-xs font-semibold text-harbor"><span className="h-2 w-2 rounded-full bg-harbor" />Evidence</div></> : index === 1 ? <><div className="absolute left-1/2 top-7 h-24 w-40 -translate-x-1/2 rotate-[-7deg] rounded-xl border border-[#B5DCEE] bg-[#DFF5FE]" /><div className="absolute left-1/2 top-5 h-24 w-40 -translate-x-1/2 rounded-xl border border-[#CAE4F2] bg-white p-4 shadow-sm"><div className="h-1.5 w-20 rounded bg-harbor/50" /><div className="mt-3 h-1 w-full rounded bg-navy/10" /><div className="mt-2 h-1 w-24 rounded bg-navy/10" /><div className="mt-2 h-1 w-28 rounded bg-navy/10" /></div><div className="absolute bottom-5 right-10 flex items-center gap-2 rounded-full bg-navy px-3 py-2 text-xs font-semibold text-white"><span className="text-blue">✓</span> Your review</div></> : <><svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 144"><path d="M35 77H265" stroke="#A9D8EE" strokeWidth="2" /><circle cx="50" cy="77" r="10" fill="#00C2FF" /><circle cx="150" cy="77" r="10" fill="#0369A1" /><circle cx="250" cy="77" r="10" fill="#0A1628" /><path d="M45 77l3 3 6-6M145 77l3 3 6-6" fill="none" stroke="white" strokeWidth="2" /></svg><div className="absolute inset-x-4 top-6 text-center text-xs font-semibold text-harbor">Keep the loop moving</div><div className="absolute inset-x-5 bottom-6 flex justify-between text-[11px] font-semibold text-navy/75"><span>Prepared</span><span>Published</span><span>Measured</span></div></>}
    </div>
  );
}
export default function ThreePhases() {
  return (
    <section id="how-it-works" className="bg-canvas">
      <div className="container-x py-12 sm:py-16">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="max-w-2xl"><p className="eyebrow">How Signal Harbor works</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-[2.35rem] sm:leading-[1.15]">From being overlooked<br className="hidden sm:block" /> to knowing what to do next.</h2></div>
          <Link href="/services#how-it-runs" className="inline-flex min-h-[44px] items-center gap-3 text-[15px] font-semibold text-harbor underline-offset-4 hover:underline">Explore the full program <span aria-hidden="true">→</span></Link>
        </div>
        <ol className="mt-9 grid gap-5 md:grid-cols-3">
          {phases.map((p, i) => <li key={p.name} className="card-light !p-5 sm:!p-6"><PhaseVisual index={i} /><p className="text-xs font-semibold uppercase tracking-wider text-harbor">0{i + 1} / {p.name}</p><h3 className="mt-2 text-xl font-bold leading-snug text-navy">{p.subtitle}</h3><p className="mt-3 text-base leading-relaxed text-navy/75">{p.body}</p></li>)}
        </ol>
      </div>
    </section>
  );
}
