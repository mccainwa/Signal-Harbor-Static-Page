/**
 * Who does what in the program. Publication ownership is agreed for each
 * engagement (the founders have not set one universal rule), so the copy
 * says exactly that instead of promising managed publishing.
 */
const columns = [
  {
    who: 'Signal Harbor',
    items: [
      'Tests the buyer questions that matter to your initiative and reads the evidence',
      'Prioritizes the gaps and builds the campaign plan',
      'Prepares pages and content for your review, and makes the changes you request',
      'Records publication and measures progress as agreed for your program',
    ],
  },
  {
    who: 'Your team',
    items: [
      'Chooses the product, audience, or market to focus on first',
      'Confirms company facts when the portal asks for them',
      'Reviews, comments on, and approves specific versions',
      'Publishes approved work or names who will',
    ],
  },
  {
    who: 'Your current agency, if you have one',
    items: [
      'Keeps the SEO, web, or content work it already owns',
      'Can publish approved work when that is the agreed handoff',
      'Works from a clear brief: the approved version, its destination, and its owner',
    ],
  },
];

export default function Responsibilities({
  tone = 'light',
  level = 3,
}: {
  tone?: 'light' | 'ice';
  /** Heading level for the column titles, so the outline stays in order. */
  level?: 3 | 4;
}) {
  const H = level === 4 ? 'h4' : 'h3';
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {columns.map((c, i) => (
        <div
          key={c.who}
          className={`rounded-2xl border p-6 ${
            i === 0
              ? 'border-[#BFDDF0] bg-[#F4FAFE]'
              : tone === 'ice'
                ? 'border-[#D8E6F0] bg-white'
                : 'border-[#E3ECF3] bg-[#F7FAFC]'
          }`}
        >
          <H className="text-base font-bold text-navy">{c.who}</H>
          <ul className="mt-4 space-y-2.5">
            {c.items.map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-[15px] leading-snug text-navy/75">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0369A1" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-none" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" /></svg>
                {t}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
