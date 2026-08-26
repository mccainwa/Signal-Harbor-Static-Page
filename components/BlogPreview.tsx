import Link from 'next/link';
import Section, { SectionHeading } from './Section';
import { getPosts } from '@/lib/blog';

/**
 * Restrained homepage strip showing the three most recent blog articles.
 * Server component: reads the committed blog data at build time.
 */
export default function BlogPreview() {
  const posts = getPosts().slice(0, 3);
  return (
    <Section tone="ice">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          tone="light"
          eyebrow="From the blog"
          title="Latest articles."
          intro="Writing from the Signal Harbor Weekly newsletter on AI visibility and how AI systems recommend companies."
        />
        <Link href="/blog" className="inline-flex flex-none items-center gap-1.5 text-sm font-semibold text-[#0369A1] hover:underline">
          Browse all articles
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {posts.map((p) => (
          <article key={p.slug} className="card-light lift accent-top flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy/60">
              <time dateTime={p.date}>{p.displayDate}</time>
            </p>
            <h3 className="mt-3 flex-1 text-lg font-bold leading-snug text-navy">
              <Link href={`/blog/${p.slug}`} className="hover:text-[#0369A1]">{p.title}</Link>
            </h3>
            <p className="mt-4">
              <Link href={`/blog/${p.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0369A1] hover:underline">
                Read the article
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
