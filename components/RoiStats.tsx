import Section, { SectionHeading } from './Section';

const stats = [
  { stat: '73%', label: 'of B2B buyers use AI tools in purchase research', src: 'Loganix / PRNewswire, 2026', href: 'https://www.prnewswire.com/news-releases/73-of-b2b-buyers-use-ai-tools-in-purchase-research-multi-source-analysis-finds-302733319.html' },
  { stat: '51%', label: 'of B2B software buyers begin research in an AI chatbot more often than Google', src: 'G2, 2026', href: 'https://www.prnewswire.com/news-releases/new-g2-research-half-of-b2b-software-buyers-now-start-their-research-with-ai-chatbots-302742807.html' },
  { stat: '5.1×', label: 'higher reported conversion for AI search vs. Google organic in one analysis', src: 'Loganix / PRNewswire, 2026', href: 'https://www.prnewswire.com/news-releases/73-of-b2b-buyers-use-ai-tools-in-purchase-research-multi-source-analysis-finds-302733319.html' },
  { stat: '22%', label: 'of marketers currently track AI visibility', src: 'Loganix / PRNewswire, 2026', href: 'https://www.prnewswire.com/news-releases/73-of-b2b-buyers-use-ai-tools-in-purchase-research-multi-source-analysis-finds-302733319.html' },
];

const funnel = ['Buyer asks AI', 'AI shortlist', 'Competitor comparison', 'Opportunity won / lost'];

export default function RoiStats() {
  return (
    <Section tone="navy-deep" id="roi">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="The stakes"
          title="AI is already shaping buyer shortlists."
          intro="Buyers increasingly decide who to consider inside AI answers — long before they reach your site or sales team."
        />
        <p className="max-w-xs text-xs leading-relaxed text-white/40">
          Third-party industry research — not Signal Harbor performance claims or client results.
        </p>
      </div>

      {/* Funnel */}
      <div className="mt-10 flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-navy-panel/60 p-4">
        {funnel.map((f, i) => (
          <span key={f} className="flex items-center gap-2">
            <span className={`inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold ${i === funnel.length - 1 ? 'bg-blue/15 text-blue ring-1 ring-blue/30' : 'border border-white/12 bg-white/[0.04] text-white/80'}`}>{f}</span>
            {i < funnel.length - 1 && (
              <svg width="22" height="14" viewBox="0 0 22 14" fill="none" className="text-blue/60" aria-hidden="true"><path d="M2 7h16M13 2l6 5-6 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            )}
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="card-dark lift group rounded-2xl border border-white/12 p-6">
            <div className="font-sora text-4xl font-extrabold text-blue">{s.stat}</div>
            <p className="mt-3 text-[15px] leading-snug text-white/80">{s.label}</p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-white/45 group-hover:text-white/70">{s.src}<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg></p>
          </a>
        ))}
      </div>
    </Section>
  );
}
