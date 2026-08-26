import Section, { SectionHeading } from './Section';

const stats = [
  { stat: '73%', label: 'of B2B buyers use AI tools in purchase research', src: 'Loganix / PRNewswire, 2026', href: 'https://www.prnewswire.com/news-releases/73-of-b2b-buyers-use-ai-tools-in-purchase-research-multi-source-analysis-finds-302733319.html' },
  { stat: '51%', label: 'of B2B software buyers begin research in an AI chatbot more often than Google', src: 'G2, 2026', href: 'https://www.prnewswire.com/news-releases/new-g2-research-half-of-b2b-software-buyers-now-start-their-research-with-ai-chatbots-302742807.html' },
  { stat: '5.1×', label: 'higher reported conversion for AI search vs. Google organic in one analysis', src: 'Loganix / PRNewswire, 2026', href: 'https://www.prnewswire.com/news-releases/73-of-b2b-buyers-use-ai-tools-in-purchase-research-multi-source-analysis-finds-302733319.html' },
  { stat: '22%', label: 'of marketers currently track AI visibility', src: 'Loganix / PRNewswire, 2026', href: 'https://www.prnewswire.com/news-releases/73-of-b2b-buyers-use-ai-tools-in-purchase-research-multi-source-analysis-finds-302733319.html' },
];

/**
 * The problem, in one section: buyers decide inside AI answers, and rankings
 * alone no longer show whether you are recommended. Third-party sourced
 * statistics only, clearly attributed.
 */
export default function ProblemHome() {
  return (
    <Section tone="ice" id="problem">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          tone="light"
          eyebrow="Why it matters"
          title="AI answers are shaping buyer shortlists."
          intro="Buyers increasingly compare and choose providers inside AI answers, before they ever reach your website. Rankings and traffic alone no longer show whether AI systems mention, describe, or recommend you."
        />
        <p className="max-w-xs text-xs leading-relaxed text-navy/70">
          Third-party industry research. These are not Signal Harbor
          performance claims or client results.
        </p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="card-light lift accent-top group">
            <div className="font-sora text-4xl font-extrabold text-[#0369A1]">{s.stat}</div>
            <p className="mt-3 text-[15px] leading-snug text-navy/80">{s.label}</p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-navy/60 group-hover:text-[#0369A1]">
              {s.src}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
            </p>
          </a>
        ))}
      </div>

      {/* Who this is for: approved ideal-customer positioning. */}
      <div className="mt-10 rounded-2xl border border-[#D8E6F0] bg-white p-7">
        <h3 className="text-lg font-bold text-navy">Who Signal Harbor is for</h3>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-navy/75">
          Signal Harbor is built for companies where being misunderstood or
          excluded from an AI recommendation can affect a high-value buying
          decision.
        </p>
        <ul className="mt-4 grid gap-x-8 gap-y-2 text-[15px] text-navy/70 sm:grid-cols-2">
          {[
            'You sell through research-heavy buying processes',
            'Your buyers depend on trust and accurate comparison',
            'Your customers or contracts are high-value',
            'You need to know how AI describes and recommends you',
          ].map((t) => (
            <li key={t} className="flex items-start gap-2.5">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#0369A1]" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
