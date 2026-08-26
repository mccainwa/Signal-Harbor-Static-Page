import Link from 'next/link';
import Section, { SectionHeading } from './Section';

const steps = [
  {
    title: 'Test real buyer questions',
    desc: 'We run the questions buyers actually ask AI about your category, repeatedly, because a single answer is not a stable result.',
  },
  {
    title: 'Find gaps and misrepresentations',
    desc: 'See where you are missing, how you are described, which competitors are recommended instead, and which sources shape the answers.',
  },
  {
    title: 'Get a prioritized plan',
    desc: 'Findings become a clear action roadmap, with optional implementation support and ongoing monitoring as separate paid engagements.',
  },
];

export default function HowItWorks() {
  return (
    <Section tone="light" id="how-it-works">
      <SectionHeading
        tone="light"
        eyebrow="How it works"
        title="How Signal Harbor works."
        intro="Three steps from buyer questions to a plan your team can act on."
      />
      <ol className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="card-light lift accent-top flex flex-col">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0369A1]/10 font-sora text-base font-bold text-[#0369A1]">
              {i + 1}
            </span>
            <h3 className="mt-4 text-lg font-bold text-navy">{s.title}</h3>
            <p className="mt-2 flex-1 text-[15px] leading-relaxed text-navy/65">{s.desc}</p>
          </li>
        ))}
      </ol>
      <p className="mt-8 text-[15px] text-navy/70">
        The measurement design is documented on the{' '}
        <Link href="/methodology" className="font-semibold text-[#0369A1] underline">methodology page</Link>.
      </p>
    </Section>
  );
}
