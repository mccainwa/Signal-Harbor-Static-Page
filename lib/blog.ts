import postsData from "@/content/blog/posts.json";

/**
 * Blog content synced from the Signal Harbor Weekly Beehiiv publication by
 * `npm run sync:blog` (see scripts/sync-blog.mjs). Builds read only this
 * committed file and never contact Beehiiv.
 */
export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  author: string | null;
  /** ISO timestamp from the feed. */
  date: string;
  /** Preformatted long date for display. */
  displayDate: string;
  /** The original Signal Harbor Weekly post. */
  sourceUrl: string;
  newsletter: string;
  /** Sanitized article body HTML. */
  html: string;
};

const posts = postsData as BlogPost[];

/**
 * The public author for all newsletter-derived articles. Editorial work is
 * published under the company name; the raw Beehiiv creator field stays in
 * posts.json for the sync pipeline but is never displayed. Every byline,
 * card, and BlogPosting author must use this constant so future imports
 * cannot restore a personal label.
 */
export const BLOG_AUTHOR = 'Signal Harbor';

/** All posts, newest first (the sync script writes them sorted). */
export function getPosts(): BlogPost[] {
  return posts;
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export const SUBSCRIBE_URL = "https://signalharbor.beehiiv.com/subscribe";
