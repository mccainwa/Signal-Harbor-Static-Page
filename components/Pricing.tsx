import Section, { SectionHeading } from './Section';
import CTAButton from './CTAButton';
import { SITE } from '@/lib/site';

const packages = [
  { name: 'AI Visibility Snapshot', best: 'Small or early-stage prospects', scope: 'A limited prompt set across one or two engines with a short report — a fast way to see whether AI systems understand your brand.' },
  { name: 'GEO Diagnostic Pilot', best: 'Growth-stage and B2B companies', scope: 'A full prompt set, multi-engine measurement, source map, accuracy review, and action roadmap — a bounded diagnostic that reveals where your brand is visible, missing, or misrepresented.' },
  { name: 'Optimization Sprint', best: 'Clients ready to improve after diagnosis', scope: 'Content briefs, source fixes, structured-data guidance, messaging cleanup, and a re-audit — a practical sprint to improve the signals AI systems rely on.' },
  { name: 'Ongoing Intelligence Retainer', best: 'Companies that want continuous monitoring', scope: 'Monthly reporting, prompt tracking, competitor movement, hallucination alerts, and quarterly reviews — an always-on visibility layer for AI-era search.' },
];

export default function Pricing() {
  return (
    <Section tone="navy-deep" id="pricing">
      <SectionHeading
        eyebrow="Packages"
        title="Packaged around outcomes and scope."
        intro="Most engagements start with a diagnostic before implementation or monitoring. Each package can stand alone or lead into the next."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {packages.map((p) => (
          <div key={p.name} className="card-dark lift flex flex-col rounded-2xl border border-white/12 p-6">
            <h3 className="text-lg font-bold text-white">{p.name}</h3>
            <p className="mt-2 text-sm text-white/55"><span className="font-semibold text-white/80">Best for:</span> {p.best}</p>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-white/70">{p.scope}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-blue/25 bg-blue/[0.06] p-6 sm:flex-row sm:items-center">
        <p className="max-w-2xl text-[15px] leading-relaxed text-white/70">
          Pricing depends on prompt volume, the number of engines tested,
          reporting depth, implementation scope, and whether ongoing monitoring
          is included. We scope it on a diagnostic call.
        </p>
        <CTAButton href={SITE.bookingUrl} variant="primary" className="flex-none">Book a Diagnostic Call</CTAButton>
      </div>
    </Section>
  );
}
