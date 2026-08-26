import Section, { SectionHeading } from './Section';

/**
 * How an AI answer forms: buyer question, sources, composed answer. A
 * comprehension diagram, not decoration. Every statement is real crawlable
 * HTML; the connecting arrows are decorative SVG. Stages sit side by side on
 * desktop and stack with downward connectors on mobile.
 */
const questionForms = ['best providers for…', 'compare A and B', 'alternatives to…', 'is X right for…'];
const sourceKinds = ['Your website', 'Documentation', 'Reviews', 'Directories', 'Articles and press'];
const outcomes = [
  ['Mentioned?', 'Does your company appear at all?'],
  ['Described accurately?', 'Do the stated facts match reality?'],
  ['Recommended?', 'Is the active suggestion yours or a competitor’s?'],
];

function Arrow() {
  return (
    <div aria-hidden className="flex items-center justify-center py-1 lg:py-0">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="rotate-90 text-[#0369A1]/50 lg:rotate-0">
        <path d="M6 17h20M19 9.5 27 17l-8 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function AnswerFlow() {
  return (
    <Section tone="ice" id="how-answers-form">
      <SectionHeading
        tone="light"
        eyebrow="The mechanism"
        title="How an AI answer forms."
        intro="Understanding the pipeline is what makes AI visibility improvable: the answer a buyer sees is composed from public sources, and sources can be measured and fixed."
      />
      <div className="mt-10 grid items-stretch gap-2 lg:grid-cols-[1fr_auto_1.15fr_auto_1.15fr] lg:gap-3">
        <div className="card-light accent-top flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0369A1]">1 · A buyer asks</p>
          <h3 className="mt-2 text-lg font-bold text-navy">A real buying question</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-navy/65">
            Not your brand name. Questions shaped like these:
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {questionForms.map((q) => (
              <li key={q} className="rounded-full border border-[#D8E6F0] bg-[#F5FAFD] px-3 py-1 text-[13px] font-medium text-navy/75">
                {q}
              </li>
            ))}
          </ul>
        </div>
        <Arrow />
        <div className="card-light accent-top flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0369A1]">2 · The platform composes</p>
          <h3 className="mt-2 text-lg font-bold text-navy">An answer built from public sources</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-navy/65">
            AI systems can draw on what is publicly written about you. If the
            sources are thin, wrong, or outdated, the answer can inherit it.
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {sourceKinds.map((s) => (
              <li key={s} className="rounded-full border border-[#D8E6F0] bg-[#F5FAFD] px-3 py-1 text-[13px] font-medium text-navy/75">
                {s}
              </li>
            ))}
          </ul>
        </div>
        <Arrow />
        <div className="card-light accent-top flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0369A1]">3 · The answer decides</p>
          <h3 className="mt-2 text-lg font-bold text-navy">Three outcomes worth measuring</h3>
          <ul className="mt-3 space-y-2.5">
            {outcomes.map(([t, d]) => (
              <li key={t} className="rounded-xl border border-[#E0EAF2] bg-white px-3.5 py-2.5">
                <p className="text-sm font-bold text-navy">{t}</p>
                <p className="mt-0.5 text-[13px] leading-snug text-navy/65">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
