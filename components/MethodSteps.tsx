import Section, { SectionHeading } from './Section';

/**
 * The measurement steps, in the order they run. The same steps run for a
 * baseline and for a matched retest, which is what makes the two
 * comparable. The rules that keep them comparable are listed once, in the
 * measures section below.
 */
export const METHOD_STEPS: { title: string; desc: string }[] = [
  {
    title: 'Define the buyer question set.',
    desc: 'We agree the questions buyers ask during discovery, comparison, and evaluation for the products and audiences you choose. The set is fixed before testing, so every later run asks the same questions.',
  },
  {
    title: 'Run repeated answers.',
    desc: 'Each question is asked more than once on each selected AI platform and surface, because the same question can get a different answer from one run to the next.',
  },
  {
    title: 'Record valid answers and exclusions.',
    desc: 'Every answer is stored as it was returned, with the model, wording, location, and time. An answer that fails the collection rules is excluded and listed with its reason.',
  },
  {
    title: 'Extract mentions, recommendations, sources, and claims.',
    desc: 'From each valid answer we record whether your company is mentioned or recommended, which competitors appear, which sources are cited, and what the answer says about you.',
  },
  {
    title: 'Verify claims against your supported facts.',
    desc: 'Statements about your company are checked against facts your team has confirmed. Where a fact is not confirmed, we ask rather than assume.',
  },
  {
    title: 'Prioritize gaps into Campaign work.',
    desc: 'Gaps are ranked by the product, audience, and initiative they affect, and the highest priorities become the campaign plan your team reviews.',
  },
];

export default function MethodSteps({ embedded = false }: { embedded?: boolean }) {
  return (
    <Section tone="light" id={embedded ? undefined : "how-it-works"}>
      <SectionHeading
        tone="light"
        eyebrow="How it works"
        title="Six steps from buyer question to campaign work."
        intro="The same steps run for a baseline and for a matched retest, so the two can be compared. Each step leaves a record, so a finding can be checked against the answers behind it."
      />
      <ol className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-2">
        {METHOD_STEPS.map((s, i) => (
          <li key={s.title} className="flex gap-4 border-t border-navy/15 pt-5">
            <span
              aria-hidden="true"
              className="grid h-9 w-9 flex-none place-items-center rounded-full bg-navy font-sora text-sm font-bold text-blue"
            >
              {i + 1}
            </span>
            <div>
              <h3 className="text-lg font-bold leading-snug text-navy">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h3>
              <p className="mt-1.5 text-base leading-relaxed text-navy/80">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
