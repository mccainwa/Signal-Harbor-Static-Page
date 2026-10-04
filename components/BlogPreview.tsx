import Link from 'next/link';
import { getPosts } from '@/lib/blog';

/**
 * Compact homepage strip: the three most recent articles as a single row of
 * links, secondary to the main story. Server component: reads the committed
 * blog data at build time.
 */
export default function BlogPreview() {
  const posts = getPosts().slice(0, 3);
  return (
    <section aria-labelledby="latest-articles" className="bg-mist">
      <div className="container-x py-12 sm:py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div><p className="eyebrow mb-3">From the blog</p><h2 id="latest-articles" className="text-3xl font-bold tracking-tight text-navy">Latest insights.</h2></div>
          <Link href="/blog" className="text-base font-semibold text-harbor underline decoration-harbor/40 underline-offset-4 hover:decoration-harbor">
            Browse all articles
          </Link>
        </div>
        <ul className="mt-6 grid gap-4 md:grid-cols-3 md:gap-6">
          {posts.map((p) => (
            <li key={p.slug} className="card-light accent-top lift !p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-navy/60">
                <time dateTime={p.date}>{p.displayDate}</time>
              </p>
              <h3 className="mt-3 text-lg font-bold leading-snug text-navy">
                <Link href={`/blog/${p.slug}`} className="hover:text-harbor hover:underline">{p.title}</Link>
              </h3>
              <Link href={`/blog/${p.slug}`} className="mt-5 inline-flex min-h-[44px] items-center gap-3 text-sm font-semibold text-harbor hover:underline">Read the article <span aria-hidden="true">→</span><span className="sr-only">: {p.title}</span></Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
