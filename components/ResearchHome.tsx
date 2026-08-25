import Section, { SectionHeading } from './Section';
import Link from 'next/link';

const refs = [
  { cat: 'Platform guidance', title: 'AI features and your website', src: 'Google Search Central', href: 'https://developers.google.com/search/docs/appearance/ai-features' },
  { cat: 'Buyer behavior', title: '73% of B2B buyers use AI in purchase research', src: 'Loganix / PRNewswire, 2026', href: 'https://www.prnewswire.com/news-releases/73-of-b2b-buyers-use-ai-tools-in-purchase-research-multi-source-analysis-finds-302733319.html' },
  { cat: 'Buyer behavior', title: 'Half of B2B software buyers start in an AI chatbot', src: 'G2, "The Answer Economy," 2026', href: 'https://www.prnewswire.com/news-releases/new-g2-research-half-of-b2b-software-buyers-now-start-their-research-with-ai-chatbots-302742807.html' },
  { cat: 'Research', title: 'From Citation Selection to Citation Absorption', src: 'arXiv, 2026', href: 'https://arxiv.org/abs/2604.25707' },
];

export default function ResearchHome() {
  return (
    <Section tone="light" id="research">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          tone="light"
          eyebrow="Methodology"
          title="Grounded in external research."
          intro="External references that inform our methodology. They are not endorsements and not Signal Harbor results."
        />
        <Link href="/research" className="inline-flex items-center gap-2 self-start rounded-xl border border-navy/15 px-5 py-3 text-sm font-semibold text-navy transition-colors hover:border-blue/50 hover:text-blue lg:self-auto">
          View research basis →
        </Link>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {refs.map((r) => (
          <a key={r.title} href={r.href} target="_blank" rel="noopener noreferrer" className="card-light lift group flex flex-col">
            <span className="inline-flex w-fit rounded-full bg-navy/[0.06] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-navy/70">{r.cat}</span>
            <h3 className="mt-3 flex-1 text-[15px] font-bold leading-snug text-navy">{r.title}</h3>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0369A1]">
              {r.src}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
