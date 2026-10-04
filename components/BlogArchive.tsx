import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import CTAButton from './CTAButton';
import { getPosts, getBlogPage, getBlogPageCount, blogPagePath, BLOG_PAGE_SIZE, BLOG_AUTHOR, SUBSCRIBE_URL } from '@/lib/blog';
import { SITE, CTA } from '@/lib/site';

function Pagination({ page, pages }: { page: number; pages: number }) {
  const visible = Array.from(new Set([1, page - 1, page, page + 1, pages])).filter(n => n >= 1 && n <= pages).sort((a, b) => a - b);
  const items: (number | string)[] = [];
  visible.forEach((n, i) => {
    if (i > 0 && n - visible[i - 1] === 2) items.push(n - 1);
    else if (i > 0 && n - visible[i - 1] > 2) items.push('gap-' + n);
    items.push(n);
  });
  return <nav className="blog-pagination" aria-label="Blog pages">
    {page > 1 ? <Link href={blogPagePath(page - 1) + '#articles'} rel="prev" className="pagination-direction"><span aria-hidden="true">←</span> Newer</Link> : <span className="pagination-direction pagination-disabled" aria-disabled="true"><span aria-hidden="true">←</span> Newer</span>}
    <ol className="flex gap-2">{items.map(n => <li key={n}>{typeof n === 'number' ? <Link href={blogPagePath(n) + '#articles'} aria-label={'Page ' + n} aria-current={page === n ? 'page' : undefined} className="pagination-number">{n}</Link> : <span className="pagination-ellipsis" aria-hidden="true">…</span>}</li>)}</ol>
    {page < pages ? <Link href={blogPagePath(page + 1) + '#articles'} rel="next" className="pagination-direction">Older <span aria-hidden="true">→</span></Link> : <span className="pagination-direction pagination-disabled" aria-disabled="true">Older <span aria-hidden="true">→</span></span>}
  </nav>;
}
export default function BlogArchive({ page = 1 }: { page?: number }) {
  const posts = getBlogPage(page), pages = getBlogPageCount(), total = getPosts().length;
  const first = posts[0], rest = posts.slice(1);
  return <><Header /><main className="bg-canvas">
    <section className="hero-light relative overflow-hidden"><div className="container-x py-12 sm:py-16">
      <p className="eyebrow">Signal Harbor Weekly</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">{page === 1 ? 'Clear thinking about AI search.' : 'More from Signal Harbor Weekly.'}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy/75">Buyer questions, competitive visibility, and practical ways to improve how AI describes your business.</p>
      <div className="mt-7 flex flex-wrap items-center gap-5"><CTAButton href={SUBSCRIBE_URL} variant="outline">Subscribe to the newsletter</CTAButton><a href="/feed.xml" className="text-sm font-semibold text-harbor underline underline-offset-4">RSS feed</a></div>
    </div></section>
    <section id="articles"><div className="container-x py-10 sm:py-12">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4"><p className="text-sm font-medium text-navy/75">Articles {(page - 1) * BLOG_PAGE_SIZE + 1} to {Math.min(page * BLOG_PAGE_SIZE, total)} of {total}</p><Pagination page={page} pages={pages} /></div>
      {first && <article className="blog-feature harbor-aura">
        <div className="relative z-[1]"><p className="text-xs font-semibold text-harbor"><time dateTime={first.date}>{first.displayDate}</time> · {BLOG_AUTHOR}</p><h2 className="mt-4 max-w-2xl font-sora text-2xl font-bold leading-snug text-navy sm:text-3xl"><Link href={'/blog/' + first.slug + '/'}>{first.title}</Link></h2><p className="mt-4 max-w-xl text-base leading-relaxed text-navy/75">{first.description}</p><Link href={'/blog/' + first.slug + '/'} className="harbor-text-link mt-5 inline-flex min-h-[44px] items-center gap-3 text-sm font-semibold text-harbor">Read the article <span aria-hidden="true">→</span><span className="sr-only">: {first.title}</span></Link></div>
        <div className="blog-feature-art" aria-hidden="true"><div className="blog-signal-sheet"><span className="blog-art-label">SIGNAL HARBOR WEEKLY</span><span className="blog-art-title">A clearer<br />point of view.</span><div className="blog-art-rule" /><div className="blog-art-lines"><i /><i /><i /></div><span className="blog-art-mark">↗</span></div></div>
      </article>}
      <div className="blog-editorial-list mt-8">{rest.map((post, i) => <article key={post.slug} className="blog-editorial-row"><span className="blog-issue" aria-hidden="true">{String((page - 1) * BLOG_PAGE_SIZE + i + 2).padStart(2, '0')}</span><div className="min-w-0"><p className="text-xs font-semibold text-harbor"><time dateTime={post.date}>{post.displayDate}</time> · {BLOG_AUTHOR}</p><h2 className="mt-2 font-sora text-lg font-bold leading-snug text-navy"><Link href={'/blog/' + post.slug + '/'} className="harbor-text-link">{post.title}</Link></h2><p className="mt-2 text-sm leading-relaxed text-navy/75">{post.description}</p><Link href={'/blog/' + post.slug + '/'} className="mt-2 inline-flex min-h-[36px] items-center gap-2 text-sm font-semibold text-harbor">Read <span aria-hidden="true">↗</span><span className="sr-only">: {post.title}</span></Link></div></article>)}</div>
      <div className="mt-9 border-t border-[#BDDAEA] pt-7"><Pagination page={page} pages={pages} /></div>
    </div></section>
    <section><div className="container-x pb-12 sm:pb-16"><div className="ocean-cta flex flex-col gap-6 rounded-3xl border border-harbor/30 p-8 lg:flex-row lg:items-center lg:justify-between"><div className="max-w-xl"><h2 className="text-2xl font-bold text-white">Put the thinking to work.</h2><p className="mt-3 text-base leading-relaxed text-fog">Discuss where AI overlooks your business and what your team can do next.</p></div><CTAButton href={SITE.bookingUrl}>{CTA.primary}</CTAButton></div></div></section>
  </main><Footer /></>;
}
