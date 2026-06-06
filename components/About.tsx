import Section, { SectionHeading } from './Section';

/**
 * Brief, credible About section (target of the "About" nav link). No invented
 * founder credentials, team size, clients, or funding.
 */
export default function About() {
  return (
    <Section tone="navy-deep" id="about">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <SectionHeading
          eyebrow="About"
          title="AI visibility intelligence for businesses that depend on being recommended."
        />
        <div className="space-y-5 text-lg leading-relaxed text-white/75">
          <p>
            Signal Harbor is focused on one problem: how businesses appear inside
            AI-generated answers.
          </p>
          <p className="text-white/60">
            We test the prompts customers are likely to ask, review the sources AI
            systems rely on, flag inaccurate claims, and turn the findings into a
            practical visibility plan. The goal is simple: help businesses
            understand how discovery is changing before competitors own the answer.
          </p>
        </div>
      </div>
    </Section>
  );
}
