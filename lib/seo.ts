import type { Metadata } from 'next';

/**
 * Per-route metadata with page-specific Open Graph and Twitter tags. Every
 * indexable page gets its own og:title/og:description (its title and
 * description), a canonical og:url, and a page-group social card rendered
 * from the official lockup. Nothing inherits the homepage's card text.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  ogType = 'website',
}: {
  title: string;
  description: string;
  /** Canonical path with trailing slash, e.g. "/pricing/". */
  path: string;
  /** Social card under /og/, 1200x630. */
  image: string;
  imageAlt: string;
  ogType?: 'website' | 'article';
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: ogType,
      siteName: 'Signal Harbor',
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

/** Page-group social cards (generated from the official horizontal lockup). */
export const OG = {
  default: '/og/og-default.png',
  guide: '/og/og-guide.png',
  platform: '/og/og-platform.png',
  services: '/og/og-services.png',
  snapshot: '/og/og-snapshot.png',
  audit: '/og/og-audit.png',
  pricing: '/og/og-pricing.png',
  blog: '/og/og-blog.png',
  book: '/og/og-book.png',
  company: '/og/og-company.png',
} as const;
