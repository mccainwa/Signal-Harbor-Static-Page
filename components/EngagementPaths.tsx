import Link from 'next/link';
import Section, { SectionHeading } from './Section';
import CTAButton from './CTAButton';
import { SITE, CTA } from '@/lib/site';

const paths = [
  {
    name: 'AI Visibility Snapshot',
    tag: 'Complimentary with a booked call',
    paid: false,
    desc: 'A brief preview of how AI platforms describe and recommend your company, walked through on the free introductory call.',
    href: '/snapshot',
    cta: 'About the Snapshot',
  },
  {
    name: 'AI Visibility Audit',
    tag: 'Paid engagement',
    paid: true,
    desc: 'The comprehensive engagement: a full prompt set, competitor tracking, a source map, an accuracy review, and a prioritized roadmap.',
    href: '/audit',
    cta: 'About the Audit',
  },
  {
    name: 'Optimization & Monitoring',
    tag: 'Paid engagements',
    paid: true,
    desc: 'Implementation support after the Audit, and ongoing measurement that tracks prompts, competitors, and drift over time.',
    href: '/services',
    cta: 'About the services',
  },
];

export default function EngagementPaths() {
  return (
    <Section tone="light" id="paths">
      <SectionHeading
        tone="light"
        eyebrow="Ways to engage"
        title="Start with a Snapshot."
        intro="The introductory call is free and includes a complimentary Snapshot. The Audit, Optimization Sprint, and Ongoing Monitoring are paid engagements, scoped to your company."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {paths.map((p) => (
          <div key={p.name} className="card-light lift accent-top flex flex-col">
            <p className={`inline-flex self-start rounded-full px-3 py-1 text-xs font-semibold ${p.paid ? 'bg-navy/[0.06] text-navy/80' : 'bg-[#0369A1]/10 text-[#0369A1]'}`}>
              {p.tag}
            </p>
            <h3 className="mt-4 text-lg font-bold text-navy">{p.name}</h3>
            <p className="mt-2 flex-1 text-[15px] leading-relaxed text-navy/65">{p.desc}</p>
            <p className="mt-4">
              <Link href={p.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0369A1] hover:underline">
                {p.cta}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </p>
          </div>
        ))}
      </div>
      <div className="mt-9 flex flex-wrap items-center gap-5" data-cta-zone="homepage-paths">
        <CTAButton href={SITE.bookingUrl} variant="primary">{CTA.primary}</CTAButton>
        <Link href="/pricing" className="inline-flex items-center rounded-xl border border-navy/15 px-5 py-3 text-sm font-semibold text-navy transition-colors hover:border-blue/50 hover:text-[#0369A1]">
          How pricing works
        </Link>
      </div>
    </Section>
  );
}
