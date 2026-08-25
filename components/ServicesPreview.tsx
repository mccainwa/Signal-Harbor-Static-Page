import Section, { SectionHeading } from './Section';
import Link from 'next/link';
import { IconRadar, IconRoute, IconShield, IconMonitor } from './icons';

const services = [
  { icon: IconRadar, name: 'AI Visibility Diagnostic', desc: 'See where you appear, disappear, or trail competitors across AI engines.', outcome: 'Baseline visibility', href: '/services#diagnostic', cta: 'About the diagnostic' },
  { icon: IconRoute, name: 'GEO Strategy Sprint', desc: 'A prioritized plan for content, sources, schema, and comparison pages.', outcome: 'Clear action plan', href: '/services#geo-sprint', cta: 'About the sprint' },
  { icon: IconShield, name: 'Accuracy & Source Review', desc: 'Find inaccurate AI claims and map the sources shaping the answer.', outcome: 'Risk + source map', href: '/services#accuracy', cta: 'About the review' },
  { icon: IconMonitor, name: 'Ongoing Monitoring', desc: 'Track prompts, competitors, drift, and new opportunities over time.', outcome: 'A management rhythm', href: '/services#monitoring', cta: 'About monitoring' },
];

export default function ServicesPreview() {
  return (
    <Section tone="light" id="services">
      <SectionHeading
        tone="light"
        eyebrow="Services"
        title="From diagnosis to action."
        intro="Start with a diagnostic, then implement and monitor. Explore the full set on the Services page."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.name} className="card-light lift accent-top flex flex-col">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-blue ring-1 ring-navy/10"><Icon size={22} /></span>
              <h3 className="mt-4 text-base font-bold text-navy">{s.name}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-navy/65">{s.desc}</p>
              <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-blue/10 px-3 py-1 text-xs font-semibold text-navy ring-1 ring-blue/20"><span className="h-1.5 w-1.5 rounded-full bg-blue" />{s.outcome}</span>
              <Link href={s.href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0369A1] hover:underline">
                {s.cta}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="mt-8">
        <Link href="/services" className="inline-flex items-center gap-2 rounded-xl border border-navy/15 px-5 py-3 text-sm font-semibold text-navy transition-colors hover:border-blue/50 hover:text-blue">
          View all seven services →
        </Link>
      </div>
    </Section>
  );
}
