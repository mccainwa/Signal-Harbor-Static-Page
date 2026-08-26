import type { Metadata } from 'next';
import { pageMetadata, OG } from '@/lib/seo';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import CTAButton from '@/components/CTAButton';
import { getPosts, BLOG_AUTHOR, SUBSCRIBE_URL } from '@/lib/blog';
import { SITE, CTA } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Blog',
  description:
    'Articles from Signal Harbor Weekly on AI visibility, AI search, GEO, and how AI systems describe, compare, and recommend companies.',
  path: '/blog/',
  image: OG.blog,
  imageAlt: 'The Signal Harbor blog',
});

export default function BlogIndexPage() {
  const posts = getPosts();
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="hero-light relative overflow-hidden">
          <div className="container-x relative py-16 sm:py-20">
            <div className="max-w-3xl">
              <p className="eyebrow mb-3">Signal Harbor Weekly</p>
              <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">The Signal Harbor blog.</h1>
              <p className="mt-5 text-lg leading-relaxed text-navy/70">
                Articles on AI visibility, AI search, and how AI systems
                describe, compare, and recommend companies. Originally published
                in the{' '}
                <a href="https://signalharbor.beehiiv.com/" target="_blank" rel="noopener noreferrer" className="font-medium text-[#0369A1] underline">Signal Harbor Weekly</a>{' '}
                newsletter.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4" data-cta-zone="blog-index">
                <CTAButton href={SUBSCRIBE_URL} variant="outline">Subscribe to the newsletter</CTAButton>
                <a href="/feed.xml" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0369A1] hover:underline">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 4a16 16 0 0 1 16 16h-3A13 13 0 0 0 4 7V4zm0 6a10 10 0 0 1 10 10h-3a7 7 0 0 0-7-7v-3zm2.5 10a2.5 2.5 0 1 1-2.5-2.5A2.5 2.5 0 0 1 6.5 20z" /></svg>
                  RSS feed
                </a>
              </div>
            </div>
          </div>
        </section>

        <Section tone="ice">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <article key={p.slug} className="card-light lift accent-top flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-wider text-navy/60">
                  <time dateTime={p.date}>{p.displayDate}</time>
                  <span> · {BLOG_AUTHOR}</span>
                </p>
                <h2 className="mt-3 text-lg font-bold leading-snug text-navy">
                  <Link href={`/blog/${p.slug}`} className="hover:text-[#0369A1]">{p.title}</Link>
                </h2>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-navy/65">{p.description}</p>
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

        <section className="bg-white">
          <div className="container-x py-16 sm:py-20">
            <div className="ocean-cta flex flex-col gap-6 overflow-hidden rounded-3xl border border-navy/15 p-8 shadow-[0_36px_80px_-40px_rgba(6,35,57,0.7)] lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-white">See where your company stands.</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-white/75">{CTA.supporting}</p>
              </div>
              <div className="flex-none" data-cta-zone="blog-footer">
                <CTAButton href={SITE.bookingUrl} variant="primary">{CTA.primary}</CTAButton>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
