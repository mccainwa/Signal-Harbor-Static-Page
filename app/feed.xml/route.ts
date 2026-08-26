import { getPosts, BLOG_AUTHOR } from '@/lib/blog';
import { SITE } from '@/lib/site';

/**
 * First-party RSS 2.0 feed generated at build time from the committed blog
 * data. Same content source as /blog/, articles link to the local pages.
 */
export const dynamic = 'force-static';

const escapeXml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export function GET() {
  const posts = getPosts();
  const items = posts
    .map((p) => {
      const url = `${SITE.url}/blog/${p.slug}/`;
      return [
        '    <item>',
        `      <title>${escapeXml(p.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(p.date).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(p.description)}</description>`,
        `      <dc:creator>${escapeXml(BLOG_AUTHOR)}</dc:creator>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml('Signal Harbor Blog')}</title>`,
    `    <link>${SITE.url}/blog/</link>`,
    `    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml"/>`,
    '    <description>Articles from Signal Harbor on AI visibility, AI search, GEO, and how AI systems describe, compare, and recommend companies.</description>',
    '    <language>en</language>',
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: { 'content-type': 'application/rss+xml; charset=utf-8' },
  });
}
