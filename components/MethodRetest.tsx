import Section, { SectionHeading } from './Section';

const rows: [what: string, baseline: string, retest: string][] = [
  ['Questions', 'The fixed buyer question set, branded and unbranded reported separately', 'The same questions, reported the same way'],
  ['AI services', 'The selected AI platforms and surfaces, each labeled', 'The same platforms and surfaces, with the same labels'],
  ['Timing', 'Before the campaign work', 'After the work is published, from the recorded publication date'],
  ['Conditions recorded', 'Model, exact wording, location and language, date and time', 'The same conditions, with any difference disclosed beside the comparison'],
];

const limits = [
  'It shows what moved within the tested questions, not across the whole market.',
  'A few repeats of a question do not make a precise market estimate.',
  'A change after publication is an observed change, not proof that the work caused it.',
];

/**
 * Matched retest rules. Comparable means the same questions on the same AI
 * services after publication; anything else is a new measurement. No
 * retest timing or cadence is stated, because none has been set.
 */
export default function MethodRetest({ embedded = false }: { embedded?: boolean }) {
  return (
    <Section tone="light" id={embedded ? undefined : "matched-retest"}>
      <SectionHeading
        tone="light"
        eyebrow="Matched retest"
        title="A retest only counts when it matches the baseline."
        intro="Ask the same buyer questions on the same AI services after publication. Record any differences in testing conditions alongside the comparison. Retest scope and timing are agreed for your program."
      />

      <div className="mt-10 overflow-x-auto rounded-2xl border border-navy/10 bg-raised" tabIndex={0} role="region" aria-label="Baseline and matched retest comparison, scrolls sideways on small screens">
        <table className="w-full min-w-[600px] border-collapse text-left text-base">
          <caption className="sr-only">What a baseline and a matched retest record</caption>
          <thead>
            <tr className="border-b border-navy/10">
              <th scope="col" className="w-[20%] px-5 py-4 text-sm font-semibold text-navy/70">Compared on</th>
              <th scope="col" className="px-5 py-4 font-bold text-navy">Baseline</th>
              <th scope="col" className="px-5 py-4 font-bold text-navy">Matched retest</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([what, baseline, retest]) => (
              <tr key={what} className="border-b border-navy/[0.07] align-top last:border-b-0">
                <th scope="row" className="px-5 py-4 font-semibold text-navy">{what}</th>
                <td className="px-5 py-4 leading-relaxed text-navy/80">{baseline}</td>
                <td className="px-5 py-4 leading-relaxed text-navy/80">{retest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
        <h3 className="text-xl font-bold text-navy">What a matched retest cannot tell you.</h3>
        <ul className="space-y-3">
          {limits.map((l) => (
            <li key={l} className="flex items-start gap-3 text-base leading-relaxed text-navy/85">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-harbor" />
              {l}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
