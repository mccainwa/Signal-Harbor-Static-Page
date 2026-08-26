/**
 * Blog synchronization from the Signal Harbor Weekly Beehiiv RSS feed.
 *
 * Usage: npm run sync:blog
 *
 * The feed carries complete public article bodies in content:encoded, so no
 * API key is needed. This script fetches the feed, sanitizes each article
 * with sanitize-html (an allowlist sanitizer, not regular expressions),
 * downloads any inline images, and writes the result to
 * content/blog/posts.json plus public/images/blog/. Production and CI builds
 * read only those committed files and never contact Beehiiv.
 *
 * Publishing workflow for a new newsletter issue:
 *   1. npm run sync:blog
 *   2. Review the generated content (git diff content/blog public/images/blog)
 *   3. npm run check   (build + export verification)
 *   4. Commit the generated files and rebuild the site.
 *
 * What sanitization removes: scripts, styles, iframes, forms, tracking
 * pixels, the Beehiiv footer and email boilerplate, the duplicate leading h1
 * (each page renders its own h1), classes and inline styles, and empty
 * paragraphs. Remaining h1s are demoted to h2 to preserve hierarchy.
 *
 * Visible text is normalized to the site's writing standards: em and en
 * dashes become ordinary punctuation without changing wording or claims.
 * Links to the old signalharborconsulting.com domain are rewritten to the
 * production domain, which the old domain 301s to anyway.
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDocument } from 'htmlparser2';
import sanitizeHtml from 'sanitize-html';

const FEED_URL = process.argv[2] ?? 'https://rss.beehiiv.com/feeds/lCr2tO6J1T.xml';
const NEWSLETTER_NAME = 'Signal Harbor Weekly';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content', 'blog');
const imageDir = path.join(root, 'public', 'images', 'blog');
mkdirSync(contentDir, { recursive: true });
mkdirSync(imageDir, { recursive: true });

/**
 * Alt text for downloaded article images, keyed by the Beehiiv asset id in
 * the URL. Every image must have an entry: the feed ships empty alt
 * attributes, and shipping an image without a real description would fail
 * both accessibility and the export verifier. Add an entry after reviewing
 * any new image the sync reports.
 */
const ALT_OVERRIDES = {
  'dee76187-31ac-4b2b-83e9-0fa420635be9':
    'Signal Harbor infographic titled Why a Single Snapshot Is Not Enough, showing a year of brand visibility scores for one brand and two competitors, a callout marking a single snapshot point in June, and sample score tiles for each brand.',
};

/* ------------------------------------------------------------------ utils */

const decodeEntities = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

/**
 * Normalize visible text to the site's punctuation rules without touching
 * wording: em/en dashes become commas or "to" between numbers. Applied only
 * to text nodes (sanitize-html textFilter) and to plain-text fields.
 */
const cleanText = (t) =>
  t
    .replace(/(\d)\s*[–—]\s*(\d)/g, '$1 to $2')
    .replace(/\s*[—–]\s*/g, ', ')
    .replace(/ /g, ' ');

/** Minimal dimension readers for the formats the Beehiiv CDN serves. */
function imageSize(buf) {
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20), ext: 'png' };
  }
  if (buf.length > 10 && buf.toString('ascii', 0, 3) === 'GIF') {
    return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8), ext: 'gif' };
  }
  if (buf.length > 30 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const fourcc = buf.toString('ascii', 12, 16);
    if (fourcc === 'VP8X') return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3), ext: 'webp' };
    if (fourcc === 'VP8L') {
      const b = buf.readUInt32LE(21);
      return { width: 1 + (b & 0x3fff), height: 1 + ((b >> 14) & 0x3fff), ext: 'webp' };
    }
    if (fourcc === 'VP8 ') return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff, ext: 'webp' };
  }
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length - 9) {
      if (buf[i] !== 0xff) { i += 1; continue; }
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7), ext: 'jpg' };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  return null;
}

/* ------------------------------------------------------------- feed parse */

const res = await fetch(FEED_URL);
if (!res.ok) {
  console.error(`Feed fetch failed: ${res.status} ${res.statusText}`);
  process.exit(1);
}
const xml = await res.text();
const doc = parseDocument(xml, { xmlMode: true });

/**
 * Text content of an XML node. Each node is visited exactly once: text nodes
 * contribute their data, and everything else (elements and CDATA sections,
 * whose children are text nodes) just recurses into its children.
 */
const textOf = (node) => {
  if (!node) return '';
  let out = '';
  const walkText = (n) => {
    if (n.type === 'text') out += n.data;
    else (n.children ?? []).forEach(walkText);
  };
  walkText(node);
  return out.trim();
};

const findAll = (node, name, acc = []) => {
  for (const c of node.children ?? []) {
    if (c.name === name) acc.push(c);
    findAll(c, name, acc);
  }
  return acc;
};
const child = (node, name) => (node.children ?? []).find((c) => c.name === name);

const items = findAll(doc, 'item');
if (items.length === 0) {
  console.error('No items found in the feed.');
  process.exit(1);
}

/* ------------------------------------------------------------- image sync */

const downloadedImages = new Map();
async function localizeImage(src) {
  if (downloadedImages.has(src)) return downloadedImages.get(src);
  const idMatch = /file\/([0-9a-f-]{36})\//.exec(src);
  const id = idMatch ? idMatch[1] : Buffer.from(src).toString('hex').slice(0, 24);
  const alt = ALT_OVERRIDES[id];
  if (alt === undefined) {
    console.error(`Image ${src.slice(0, 100)} has no ALT_OVERRIDES entry (id ${id}).`);
    console.error('Review the image and add a descriptive alt before syncing.');
    process.exit(1);
  }
  const r = await fetch(src, { headers: { Accept: 'image/png,image/jpeg,image/webp,image/gif,*/*' } });
  if (!r.ok) {
    console.error(`Image download failed (${r.status}): ${src}`);
    process.exit(1);
  }
  const buf = Buffer.from(await r.arrayBuffer());
  const size = imageSize(buf);
  if (!size) {
    console.error(`Could not read dimensions for ${src}`);
    process.exit(1);
  }
  const file = `${id}.${size.ext}`;
  writeFileSync(path.join(imageDir, file), buf);
  const record = { src: `/images/blog/${file}`, width: size.width, height: size.height, alt };
  downloadedImages.set(src, record);
  console.log(`  image saved: ${file} (${size.width}x${size.height})`);
  return record;
}

/* ------------------------------------------------------------- sanitizing */

async function sanitizeArticle(rawHtml, articleTitle) {
  // Localize images first so the sanitizer transform can be synchronous.
  const imgSrcs = [...rawHtml.matchAll(/<img[^>]*\bsrc="([^"]+)"/g)].map((m) => decodeEntities(m[1]));
  for (const src of imgSrcs) await localizeImage(src);

  let droppedLeadingHeading = false;
  let seenParagraph = false;
  const html = sanitizeHtml(rawHtml, {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'p', 'ul', 'ol', 'li', 'blockquote', 'a', 'img',
      'strong', 'em', 'b', 'i', 'u', 'code', 'pre', 'br', 'hr', 'figure', 'figcaption',
    ],
    allowedAttributes: { a: ['href'], img: ['src', 'alt', 'width', 'height'] },
    allowedSchemes: ['https', 'http', 'mailto'],
    transformTags: {
      h1: (tag, attribs) => ({ tagName: 'h2', attribs: {} }),
      a: (tag, attribs) => {
        let href = attribs.href ?? '';
        href = href.replace('://signalharborconsulting.com', '://signalharborai.com')
                   .replace('://www.signalharborconsulting.com', '://signalharborai.com');
        const external = /^https?:/.test(href) && !href.startsWith('https://signalharborai.com');
        return {
          tagName: 'a',
          attribs: external ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href },
        };
      },
      img: (tag, attribs) => {
        const record = downloadedImages.get(decodeEntities(attribs.src ?? ''));
        if (!record) return { tagName: 'img', attribs: {} };
        return {
          tagName: 'img',
          attribs: {
            src: record.src,
            alt: record.alt,
            width: String(record.width),
            height: String(record.height),
            loading: 'lazy',
          },
        };
      },
    },
    exclusiveFilter: (frame) => {
      // Beehiiv footer chrome and email-only boilerplate are interface
      // elements, not article content.
      const cls = frame.attribs?.class ?? '';
      const href = frame.attribs?.href ?? '';
      if (/beehiiv__footer/.test(cls)) return true;
      if (frame.tag === 'a' && /beehiiv\.com\/powered-by/.test(href)) return true;
      const text = (frame.text ?? '').trim();
      if (frame.tag === 'p' && /receiving this email|unsubscribe|reply to this email/i.test(text)) return true;
      if (frame.tag === 'p' && text === '') return true;
      if (frame.tag === 'img' && !frame.attribs?.src) return true;
      if (frame.tag === 'p') seenParagraph = true;
      // A leading heading that repeats the article title or the newsletter
      // masthead duplicates the h1 each page renders itself. Only a heading
      // that appears before any paragraph and matches one of those strings
      // is dropped; real section headings are untouched.
      if (
        (frame.tag === 'h1' || frame.tag === 'h2') &&
        !droppedLeadingHeading &&
        !seenParagraph &&
        (text === articleTitle || text === NEWSLETTER_NAME)
      ) {
        droppedLeadingHeading = true;
        return true;
      }
      return false;
    },
    textFilter: (text) => cleanText(text),
    allowedSchemesAppliedToAttributes: ['href', 'src'],
  });

  return html
    // Production residue: outline labels that occasionally survive in the
    // feed. "Strong Conclusion" is an instruction, not a heading; the
    // section itself is a normal conclusion.
    .replace(/<h([23])>\s*Strong Conclusion\s*<\/h\1>/gi, '<h$1>Conclusion</h$1>')
    .replace(/\s+\n/g, '\n')
    .trim();
}

/* ------------------------------------------------------------------ build */

const posts = [];
for (const item of items) {
  const title = cleanText(decodeEntities(textOf(child(item, 'title'))));
  const description = cleanText(decodeEntities(textOf(child(item, 'description'))));
  const link = textOf(child(item, 'link'));
  const slug = new URL(link).pathname.replace(/^\/p\//, '').replace(/\/$/, '');
  const pubDate = textOf(child(item, 'pubDate'));
  const author = textOf(child(item, 'dc:creator')) || null;
  const encoded = child(item, 'content:encoded');
  const raw = textOf(encoded);
  const html = await sanitizeArticle(raw, title);
  const date = new Date(pubDate);
  if (Number.isNaN(date.getTime())) {
    console.error(`Bad pubDate for ${slug}: ${pubDate}`);
    process.exit(1);
  }
  posts.push({
    slug,
    title,
    description,
    author,
    date: date.toISOString(),
    displayDate: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }),
    sourceUrl: link,
    newsletter: NEWSLETTER_NAME,
    html,
  });
}

posts.sort((a, b) => b.date.localeCompare(a.date));

// Disambiguate repeated titles deterministically with the issue date, so
// titles, h1s, and metadata stay unique across the site.
const seen = new Map();
for (const p of posts) seen.set(p.title, (seen.get(p.title) ?? 0) + 1);
for (const p of posts) {
  if ((seen.get(p.title) ?? 0) > 1) p.title = `${p.title}: ${p.displayDate}`;
}

writeFileSync(path.join(contentDir, 'posts.json'), JSON.stringify(posts, null, 2) + '\n');
console.log(`Wrote ${posts.length} post(s) to content/blog/posts.json`);
for (const p of posts) console.log(`  - ${p.slug} (${p.displayDate}) ${p.title}`);
