import Section, { SectionHeading } from './Section';

type Measure = {
  name: string;
  definition: string;
  counted: string;
  notMeaning: string;
};

/**
 * The four AI answer measures, each defined on its own. The definition is
 * always visible; how it is counted and what it does not mean sit in a
 * native disclosure (present in the static HTML). No blended score and no
 * sample figures, on purpose.
 */
export const MEASURES: Measure[] = [
  {
    name: 'Mention',
    definition: 'Your company is named in a valid answer.',
    counted: 'Answers that name you, out of the valid answers for the questions in scope.',
    notMeaning: 'Being named is not being chosen. A company listed among several options has a mention, not a recommendation.',
  },
  {
    name: 'Recommendation',
    definition: 'The answer suggests your company as an option to choose, not only names it.',
    counted: 'Answers that recommend you, out of the same valid answers, counted separately from mentions.',
    notMeaning: 'A recommendation in one answer is not a ranking. Answers vary, so the pattern across repeated runs is what we report.',
  },
  {
    name: 'Citation',
    definition: 'A source the answer links to or names as its basis.',
    counted: 'Cited sources, grouped as your pages, competitor pages, review platforms, and other sources. Each count states its own base.',
    notMeaning: 'A citation shows what the answer pointed to. It does not establish what a model read or why it named a company.',
  },
  {
    name: 'Accuracy',
    definition: 'Whether what the answer says about your company matches the facts your team has confirmed.',
    counted: 'Claims about your company, checked one by one and flagged when unsupported, outdated, or incorrect.',
    notMeaning: 'Accuracy is judged only against facts you support. An answer that never names you has no claims to check.',
  },
];

const rules = [
  'No blended score as headline proof: each measure is reported on its own.',
  'Every share states its base: the valid answers, for the questions in scope, on the platforms and surfaces tested.',
  'Branded and unbranded questions are reported separately, because a question that names you usually gets an answer that names you.',
  'Answers from an API and answers from a consumer search surface keep separate labels.',
  'Excluded answers are listed with a reason and left out of the count. They are never counted as zero visibility.',
];

export default function Measurement() {
  return (
    <Section tone="ice" id="measure">
      <SectionHeading
        tone="ice"
        eyebrow="What we measure"
        title="Four measures. A clearer picture."
        intro="See whether AI names you, recommends you, cites your pages, and describes your offer accurately."
      />

      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {MEASURES.map((m) => (
          <li key={m.name} className="rounded-2xl border border-navy/[0.09] bg-raised p-6">
            <h3 className="text-xl font-bold text-navy">{m.name}</h3>
            <p className="mt-2 text-base leading-relaxed text-navy/85">{m.definition}</p>
            <details className="group mt-4 border-t border-navy/10 pt-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-1 text-[15px] font-semibold text-harbor [&::-webkit-details-marker]:hidden">
                How it is counted
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="flex-none transition-transform group-open:rotate-45" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
              </summary>
              <p className="mt-2 text-[15px] leading-relaxed text-navy/80">{m.counted}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-navy/80">
                <strong className="font-semibold text-navy">What it does not mean:</strong> {m.notMeaning}
              </p>
            </details>
          </li>
        ))}
      </ul>

      <details className="reading-details mt-6">
        <summary>Rules that keep the measures comparable</summary>
        <ul className="space-y-3 p-6">
          {rules.map((r) => (
            <li key={r} className="flex items-start gap-3 text-base leading-relaxed text-navy/85">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0369A1" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="mt-1 flex-none" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" /></svg>
              {r}
            </li>
          ))}
        </ul>
      </details>
    </Section>
  );
}
