import Section, { SectionHeading } from './Section';

const models = [
  { t: 'Advisory diagnostic', best: 'Clients with strong internal teams', role: 'Measure, diagnose, and recommend. Your team executes.' },
  { t: 'Co-managed implementation', best: 'Marketing teams with limited GEO experience', role: 'Prioritize actions, guide execution, review outputs, and monitor movement.' },
  { t: 'Full-service GEO execution', best: 'Clients without internal SEO/content capacity', role: 'Build content briefs, update source structures, coordinate publishing, and monitor results.' },
  { t: 'Vendor accountability layer', best: 'Clients already using SEO agencies', role: 'Compare vendor work to AI visibility needs and identify missing actions.' },
];

export default function ImplementationModel() {
  return (
    <Section tone="light" id="implementation">
      <SectionHeading
        tone="light"
        eyebrow="Implementation"
        title="Work with us the way your team needs."
        intro="Signal Harbor can operate as an independent diagnostic partner, a strategy layer for internal teams, or an execution partner that implements GEO recommendations directly."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {models.map((m) => (
          <div key={m.t} className="card-light lift accent-top flex flex-col">
            <h3 className="text-lg font-bold text-navy">{m.t}</h3>
            <p className="mt-3 text-sm text-navy/70"><span className="font-semibold text-navy/80">Best for:</span> {m.best}</p>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-navy/65">{m.role}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
