import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAButton from '@/components/CTAButton';
import { getPost, getPosts, BLOG_AUTHOR, SUBSCRIBE_URL } from '@/lib/blog';
import { SITE, CTA } from '@/lib/site';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `/blog/${post.slug}/`,
      siteName: 'Signal Harbor',
      publishedTime: post.date,
      images: [{ url: '/og/og-blog.png', width: 1200, height: 630, alt: 'The Signal Harbor blog' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['/og/og-blog.png'],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  /**
   * BlogPosting structured data built from the same information the page
   * shows: headline and dates from the feed, Signal Harbor as the visible
   * organizational author, publisher as the sitewide Organization entity.
   * No ratings, reviews, or invented facts.
   */
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE.url}/blog/${post.slug}/#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `${SITE.url}/blog/${post.slug}/`,
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}/`,
    isPartOf: { '@id': `${SITE.url}/#website` },
    publisher: { '@id': `${SITE.url}/#organization` },
    author: { '@type': 'Organization', name: BLOG_AUTHOR, url: `${SITE.url}/` },
  };

  return (
    <>
      <Header />
      <main className="bg-white">
        <article>
          <header className="hero-light relative overflow-hidden border-b border-[#E5EEF5]">
            <div className="container-x relative py-14 sm:py-16">
              <div className="max-w-3xl">
                <p className="eyebrow mb-3">
                  <Link href="/blog" className="hover:underline">Blog</Link>
                </p>
                <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-[2.6rem]">
                  {post.title}
                </h1>
                <p className="mt-4 text-sm text-navy/60">
                  <time dateTime={post.date}>{post.displayDate}</time>
                  <span> · {BLOG_AUTHOR}</span>
                  <span>
                    {' '}· Originally published in{' '}
                    <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-[#0369A1] underline">
                      {post.newsletter}
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </header>

          <div className="container-x py-12 sm:py-16">
            <div
              className="prose-sh mx-auto max-w-3xl"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            <div className="mx-auto mt-14 max-w-3xl border-t border-navy/10 pt-8">
              <p className="text-sm text-navy/65">
                This article first appeared in{' '}
                <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-[#0369A1] underline">{post.newsletter}</a>,
                the Signal Harbor newsletter on AI visibility.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row" data-cta-zone="article-footer">
                <CTAButton href={SUBSCRIBE_URL} variant="outline">Subscribe to {post.newsletter}</CTAButton>
                <CTAButton href={SITE.bookingUrl} variant="primary">{CTA.primary}</CTAButton>
              </div>
              <p className="mt-6">
                <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0369A1] hover:underline">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
                  All articles
                </Link>
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
    </>
  );
}
