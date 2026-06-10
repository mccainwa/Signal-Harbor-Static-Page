import Section, { SectionHeading } from './Section';

const stages = [
  { stage: '01', name: 'Diagnostic Pilot', length: '14–30 days', purpose: 'Measure baseline and identify priority gaps.' },
  { stage: '02', name: 'Optimization Sprint', length: '30–60 days', purpose: 'Implement the highest-leverage fixes.' },
  { stage: '03', name: 'Monitoring Retainer', length: 'Monthly', purpose: 'Track movement, detect drift, and guide ongoing work.' },
  { stage: '04', name: 'Enterprise Intelligence Layer', length: 'Quarterly or annual', purpose: 'Integrate reporting with marketing, content, SEO, and leadership workflows.' },
];

export default function ServiceLadder() {
  return (
    <Section tone="navy" id="service-ladder">
      <SectionHeading
        eyebrow="Engagement Path"
        title="A clear ladder from diagnostic to ongoing intelligence."
        intro="Most engagements start with a diagnostic pilot before implementation or monitoring."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stages.map((s) => (
          <div key={s.name} className="card-dark lift flex flex-col rounded-2xl border border-white/12 p-6">
            <span className="font-sora text-sm font-bold text-blue">{s.stage}</span>
            <h3 className="mt-2 text-lg font-bold text-white">{s.name}</h3>
            <span className="mt-1 inline-flex w-fit rounded-full border border-blue/30 bg-blue/10 px-2.5 py-0.5 text-xs font-semibold text-blue">{s.length}</span>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-white/70">{s.purpose}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
