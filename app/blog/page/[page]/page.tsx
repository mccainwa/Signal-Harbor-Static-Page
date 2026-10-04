import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogArchive from '@/components/BlogArchive';
import { getBlogPageCount, blogPagePath } from '@/lib/blog';
import { pageMetadata, OG } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return Array.from({ length: getBlogPageCount() - 1 }, (_, i) => ({ page: String(i + 2) }));
}
export function generateMetadata({ params }: { params: { page: string } }): Metadata {
  const page = Number(params.page);
  return pageMetadata({ title: 'Blog - Page ' + page, description: 'Page ' + page + ' of Signal Harbor Weekly articles on AI visibility, buyer questions, competitive evidence, and AI search optimization.', path: blogPagePath(page), image: OG.blog, imageAlt: 'Signal Harbor Weekly archive' });
}
export default function BlogPage({ params }: { params: { page: string } }) {
  const page = Number(params.page);
  if (!Number.isInteger(page) || page < 2 || page > getBlogPageCount()) notFound();
  return <BlogArchive page={page} />;
}
