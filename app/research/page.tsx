import type { Metadata } from 'next';
import { pageMetadata, OG } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Section from '@/components/Section';

export const metadata: Metadata = pageMetadata({
  title: 'Research Basis',
  description:
    'External references and research that inform the Signal Harbor AI visibility methodology, from platform guidance to public measurement research.',
  path: '/research/',
  image: OG.platform,
  imageAlt: 'Research behind the Signal Harbor methodology',
});

const refs = [
  { cat: 'Platform guidance', title: 'AI features and your website', src: 'Google Search Central', note: 'Guidance for site owners on how AI search features use and surface web content.', href: 'https://developers.google.com/search/docs/appearance/ai-features' },
  { cat: 'Structured data', title: 'Structured data & schema documentation', src: 'Schema.org', note: 'Standards that make pages machine-readable so systems understand entities clearly.', href: 'https://schema.org/' },
  { cat: 'Buyer behavior', title: '73% of B2B buyers use AI tools in purchase research', src: 'Loganix / PRNewswire, 2026', note: 'Multi-source analysis on AI search adoption and reported AI-search conversion vs. Google organic.', href: 'https://www.prnewswire.com/news-releases/73-of-b2b-buyers-use-ai-tools-in-purchase-research-multi-source-analysis-finds-302733319.html' },
  { cat: 'Buyer behavior', title: 'Half of B2B software buyers start in an AI chatbot', src: 'G2, "The Answer Economy," 2026', note: 'Survey reporting AI chatbots increasingly influencing software research and vendor shortlists.', href: 'https://www.prnewswire.com/news-releases/new-g2-research-half-of-b2b-software-buyers-now-start-their-research-with-ai-chatbots-302742807.html' },
  { cat: 'Research', title: 'From Citation Selection to Citation Absorption', src: 'arXiv, 2026', note: 'A framework distinguishing being cited from actually influencing the generated answer.', href: 'https://arxiv.org/abs/2604.25707' },
  { cat: 'Research', title: 'Measuring Google AI Overviews', src: 'arXiv, 2026', note: 'On source-selection differences and unsupported-claim risk in AI-generated answers.', href: 'https://arxiv.org/abs/2605.14021' },
];

export default function ResearchPage() {
  return (
    <>
      <Header />
      <main>
        <Section tone="navy">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">Research Basis</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">References that inform our methodology.</h1>
            <p className="mt-5 text-lg leading-relaxed text-white/75">
              These external references inform how we test, measure, and interpret
              AI visibility. They are not endorsements of Signal Harbor and do not
              represent Signal Harbor client results.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {refs.map((r) => (
              <a key={r.title} href={r.href} target="_blank" rel="noopener noreferrer" className="card-dark lift group flex flex-col rounded-2xl border border-white/12 p-6">
                <span className="inline-flex w-fit rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white/55">{r.cat}</span>
                <h2 className="mt-3 text-base font-bold leading-snug text-white">{r.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{r.note}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue group-hover:underline">
                  {r.src}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
                </span>
              </a>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-white/40">
            These references inform Signal Harbor&rsquo;s methodology. They are not
            endorsements of Signal Harbor and do not represent Signal Harbor client
            results.
          </p>
        </Section>
      </main>
      <Footer />
    </>
  );
}
