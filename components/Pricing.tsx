import Section, { SectionHeading } from './Section';
import CTAButton from './CTAButton';
import { SITE, CTA } from '@/lib/site';

const packages = [
  { name: 'AI Visibility Snapshot', best: 'Any company starting out', scope: 'Complimentary when you book an introductory call. A limited prompt set across one or two engines with a short summary that shows how AI platforms currently describe and recommend your brand.' },
  { name: 'AI Visibility Audit', best: 'Growth-stage and B2B companies', scope: 'The comprehensive paid engagement: a full prompt set, multi-engine measurement, source map, accuracy review, and action roadmap that reveals where your brand is visible, missing, or misrepresented.' },
  { name: 'Optimization Sprint', best: 'Clients ready to improve after the audit', scope: 'A paid engagement covering content briefs, source fixes, structured-data guidance, messaging cleanup, and a re-audit to improve the signals AI systems rely on.' },
  { name: 'Ongoing Intelligence Retainer', best: 'Companies that want continuous monitoring', scope: 'A paid engagement with monthly reporting, prompt tracking, competitor movement, hallucination alerts, and quarterly reviews.' },
];

export default function Pricing() {
  return (
    <Section tone="navy-deep" id="pricing">
      <SectionHeading
        eyebrow="Packages"
        title="Packaged around outcomes and scope."
        intro="Every engagement starts with an introductory call and a complimentary Snapshot. The audit, sprint, and retainer are paid engagements that can stand alone or lead into the next."
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
          is included. We scope it on the introductory call, which is free and
          includes your complimentary Snapshot.
        </p>
        <CTAButton href={SITE.bookingUrl} variant="primary" className="flex-none">{CTA.primary}</CTAButton>
      </div>
    </Section>
  );
}
