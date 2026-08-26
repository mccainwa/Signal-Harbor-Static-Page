import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { getPosts } from '@/lib/blog';

/**
 * Generated at build time by Next's metadata route support, which works with
 * `output: 'export'`. Only canonical, indexable routes are listed. Paths carry
 * trailing slashes to match `trailingSlash: true`.
 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/about/',
    '/ai-visibility/',
    '/audit/',
    '/blog/',
    '/book/',
    '/contact/',
    '/faq/',
    '/methodology/',
    '/platform/',
    '/pricing/',
    '/privacy/',
    '/research/',
    '/services/',
    '/snapshot/',
    '/terms/',
  ];
  return [
    ...routes.map((path) => ({
      url: `${SITE.url}${path}`,
      changeFrequency: 'monthly' as const,
    })),
    // Articles carry an accurate lastModified from the feed's publication
    // date; static pages omit lastModified rather than fake it.
    ...getPosts().map((p) => ({
      url: `${SITE.url}/blog/${p.slug}/`,
      lastModified: p.date,
      changeFrequency: 'monthly' as const,
    })),
  ];
}
