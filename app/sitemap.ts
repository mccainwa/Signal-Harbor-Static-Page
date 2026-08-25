import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

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
    '/faq/',
    '/methodology/',
    '/platform/',
    '/privacy/',
    '/research/',
    '/services/',
    '/snapshot/',
    '/terms/',
  ];
  return routes.map((path) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: 'monthly',
  }));
}
