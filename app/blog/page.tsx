import type { Metadata } from 'next';
import { pageMetadata, OG } from '@/lib/seo';
import BlogArchive from '@/components/BlogArchive';

export const metadata: Metadata = pageMetadata({
  title: 'Blog',
  description: 'Articles from Signal Harbor Weekly on AI visibility, AI search, GEO, and how AI systems describe, compare, and recommend companies.',
  path: '/blog/', image: OG.blog, imageAlt: 'The Signal Harbor blog',
});
export default function BlogIndexPage() { return <BlogArchive />; }
