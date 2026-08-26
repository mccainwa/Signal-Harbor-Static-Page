/**
 * Export verification for the static site in ./out.
 *
 * Run after `next build`. Uses Node built-ins only. Exits non-zero on any
 * problem, so CI blocks a pull request that breaks these guarantees:
 *
 *   - exactly one h1 per public page
 *   - unique titles and unique meta descriptions
 *   - canonical URLs on the production origin, matching each page's path
 *   - JSON-LD that parses
 *   - internal links, fragments, and local assets that resolve
 *   - images with alt text and explicit dimensions
 *   - no visible em or en dashes
 *   - no "free diagnostic" or "free audit" language
 *   - Snapshot / paid Audit terminology stays consistent
 *   - /blog/ and every article in content/blog/posts.json exported, with
 *     readable static text, index cards linking locally (not to Beehiiv),
 *     and BlogPosting JSON-LD matching the visible headline and date
 *   - /pricing/ exported and indexable with FAQPage JSON-LD and no dollar
 *     amounts, numeric prices, or "starting at" language
 *   - /book/ exported with the Calendly inline embed, its script, a direct
 *     fallback link, breadcrumb data, and the complimentary/paid boundary
 *   - Calendly scripts and booking links appear ONLY on /book/ (no badge,
 *     no popup, booking CTAs point at /book/)
 *   - the original Signal Harbor logo in a light header and footer, with the
 *     derived logo variants gone
 *   - every indexable page listed in the sitemap
 *
 * The Next static export writes the same 404 document to 404.html and
 * 404/index.html. That pair is treated as one noindex error page: it is
 * checked for validity but exempt from the uniqueness checks.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ORIGIN = 'https://signalharborai.com';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'out');

if (!existsSync(out)) {
  console.error('out/ does not exist. Run `npm run build` first.');
  process.exit(1);
}

const walk = (d) =>
  readdirSync(d).flatMap((n) => {
    const f = path.join(d, n);
    return statSync(f).isDirectory() ? walk(f) : n.endsWith('.html') ? [f] : [];
  });

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

/** Rendered text of a page: non-rendered blocks and comments stripped, then tags. */
const visibleText = (html) =>
  decode(
    html
      .replace(/<(script|style|svg|noscript|template)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<[^>]+>/g, ' '),
  );

const jsonLdBlocks = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => {
    try {
      return JSON.parse(m[1]);
    } catch {
      return null;
    }
  });

const routeFor = (f) => {
  const rel = path.relative(out, f).split(path.sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel === '404.html') return '/404.html';
  return `/${rel.replace(/index\.html$/, '')}`;
};

const is404 = (route) => route === '/404.html' || route === '/404/';

const problems = [];
const flag = (m) => problems.push(m);
const titles = new Map();
const descriptions = new Map();
const pages = new Map(); // route -> { html, ids }

for (const f of walk(out)) {
  const html = readFileSync(f, 'utf8');
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  pages.set(routeFor(f), { html, file: f, ids });
}

for (const [route, { html }] of pages) {
  const text = visibleText(html);

  // Headings.
  const h1s = [...html.matchAll(/<h1[^>]*>/g)];
  if (h1s.length !== 1) flag(`${route}: expected one h1, found ${h1s.length}`);

  // Title, description, canonical.
  const title = decode(/<title>([^<]*)<\/title>/.exec(html)?.[1] ?? '');
  const description = decode(
    /<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? '',
  );
  if (!title) flag(`${route}: missing title`);
  if (!description) flag(`${route}: missing meta description`);
  if (!is404(route)) {
    titles.set(title, [...(titles.get(title) ?? []), route]);
    descriptions.set(description, [...(descriptions.get(description) ?? []), route]);
    const canonical = /<link rel="canonical" href="([^"]*)"/.exec(html)?.[1];
    const expected = `${ORIGIN}${route}`;
    if (!canonical) flag(`${route}: missing canonical`);
    else if (canonical !== expected) flag(`${route}: canonical ${canonical}, expected ${expected}`);
  }

  // Accidental noindex. Only the 404 error document may carry it.
  if (!is404(route) && /<meta[^>]+name="robots"[^>]+noindex/i.test(html)) {
    flag(`${route}: unexpected noindex directive`);
  }

  // JSON-LD.
  for (const b of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(b[1]);
    } catch (e) {
      flag(`${route}: invalid JSON-LD (${String(e).slice(0, 60)})`);
    }
  }

  // Punctuation and terminology in visible text.
  for (const [ch, name] of [['—', 'em dash'], ['–', 'en dash']]) {
    const i = text.indexOf(ch);
    if (i !== -1) flag(`${route}: visible ${name}: ...${text.slice(Math.max(0, i - 40), i + 40).replace(/\s+/g, ' ').trim()}...`);
  }
  if (/free (diagnostic|audit)/i.test(text)) flag(`${route}: banned "free diagnostic/audit" language`);
  if (/complimentary (audit|diagnostic)/i.test(text)) flag(`${route}: audit described as complimentary`);

  // Links, fragments, assets.
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    if (/^(https?:|mailto:|tel:|data:|#$)/.test(url)) continue;
    if (url.startsWith('#')) {
      const id = url.slice(1);
      if (id && !pages.get(route)?.ids.has(id)) flag(`${route}: fragment ${url} does not resolve`);
      continue;
    }
    if (!url.startsWith('/')) continue;
    const [rawPath, fragment] = url.split('#');
    // Next percent-encodes characters like [slug] in chunk URLs; decode to
    // compare against the real file name on disk, and drop cache-busting
    // querystrings (e.g. /favicon.ico?v=3).
    let pathPart = rawPath.split('?')[0];
    try {
      pathPart = decodeURIComponent(pathPart);
    } catch {}
    if (/\.[a-z0-9]+$/i.test(pathPart)) {
      if (!existsSync(path.join(out, pathPart))) flag(`${route}: asset ${pathPart} missing`);
      continue;
    }
    const target = pathPart.endsWith('/') ? pathPart : `${pathPart}/`;
    const targetPage = pages.get(target);
    if (!targetPage && !existsSync(path.join(out, pathPart, 'index.html')) && !existsSync(path.join(out, `${pathPart}.html`))) {
      flag(`${route}: internal link ${pathPart} does not resolve`);
      continue;
    }
    if (fragment && targetPage && !targetPage.ids.has(fragment)) {
      flag(`${route}: fragment ${url} does not resolve on ${target}`);
    }
  }

  // Images.
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    if (!/\balt="/.test(tag)) flag(`${route}: img missing alt: ${tag.slice(0, 70)}`);
    if (!/\bwidth=/.test(tag) || !/\bheight=/.test(tag)) flag(`${route}: img missing dimensions: ${tag.slice(0, 70)}`);
  }
}

for (const [t, routes] of titles) if (routes.length > 1) flag(`duplicate title "${t}" on ${routes.join(', ')}`);
for (const [d, routes] of descriptions) if (routes.length > 1) flag(`duplicate description on ${routes.join(', ')}`);

// Snapshot terminology: the Snapshot page must present the offer as
// complimentary and state the paid boundary.
const snapshot = pages.get('/snapshot/');
if (!snapshot) flag('missing /snapshot/ page');
else {
  const text = decode(snapshot.html.replace(/<[^>]+>/g, ' '));
  if (!/complimentary/i.test(text)) flag('/snapshot/: does not say the Snapshot is complimentary');
  if (!/paid/i.test(text)) flag('/snapshot/: does not state the paid boundary');
}

// Blog: the index and every synced article must be exported as readable
// static HTML, with index cards linking to local article pages (never to
// Beehiiv article URLs) and BlogPosting JSON-LD agreeing with the page.
const postsFile = path.join(root, 'content', 'blog', 'posts.json');
if (!existsSync(postsFile)) flag('missing content/blog/posts.json (run npm run sync:blog)');
const posts = existsSync(postsFile) ? JSON.parse(readFileSync(postsFile, 'utf8')) : [];
const blogIndex = pages.get('/blog/');
if (!blogIndex) flag('missing /blog/ index page');
else if (/href="https?:\/\/[^"]*beehiiv\.com\/p\//.test(blogIndex.html)) {
  flag('/blog/: links to a Beehiiv article URL instead of a local article page');
}
for (const post of posts) {
  const route = `/blog/${post.slug}/`;
  const page = pages.get(route);
  if (!page) {
    flag(`missing article page ${route}`);
    continue;
  }
  if (blogIndex && !blogIndex.html.includes(`/blog/${post.slug}`)) {
    flag(`/blog/: no card links to ${route}`);
  }
  const text = visibleText(page.html).replace(/\s+/g, ' ');
  if (text.length < 1000) flag(`${route}: article text too short to be full content (${text.length} chars)`);
  // The exported page must contain the synced article body without needing
  // JavaScript: sample a sentence from the middle of the stored content.
  const stored = decode(post.html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
  const sample = stored.slice(Math.floor(stored.length / 2), Math.floor(stored.length / 2) + 60).trim();
  if (sample && !text.includes(sample)) flag(`${route}: static HTML is missing article body content`);
  const bp = jsonLdBlocks(page.html).find((o) => o && o['@type'] === 'BlogPosting');
  if (!bp) {
    flag(`${route}: missing BlogPosting JSON-LD`);
  } else {
    const h1 = decode(/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(page.html)?.[1]?.replace(/<[^>]+>/g, '') ?? '')
      .replace(/\s+/g, ' ')
      .trim();
    if (bp.headline !== h1) flag(`${route}: BlogPosting headline "${bp.headline}" does not match h1 "${h1}"`);
    if (bp.datePublished !== post.date) flag(`${route}: BlogPosting datePublished does not match synced date`);
  }
}

// Blog authorship: every public byline and BlogPosting author must be the
// Signal Harbor organization. The raw feed creator may exist inside article
// BODY content (the newsletter's own sign-off), but never as the page's
// author label, card author, or structured-data author.
const PUBLIC_AUTHOR = 'Signal Harbor';
const RAW_CREATOR = 'Sebastian Miller';
if (blogIndex) {
  // Visible text only: the sitewide Organization founder structured data
  // legitimately names the founders inside script blocks.
  if (visibleText(blogIndex.html).includes(RAW_CREATOR)) flag(`/blog/: card area shows "${RAW_CREATOR}" instead of ${PUBLIC_AUTHOR}`);
  if (!visibleText(blogIndex.html).includes(`· ${PUBLIC_AUTHOR}`)) flag(`/blog/: cards do not show the ${PUBLIC_AUTHOR} author label`);
}
for (const post of posts) {
  const page = pages.get(`/blog/${post.slug}/`);
  if (!page) continue;
  // Strip the article body, then the remaining VISIBLE text (byline,
  // chrome) must not contain the raw creator name. Script payloads carrying
  // the body content are excluded by visibleText.
  const outsideBody = visibleText(page.html.replace(/<div[^>]*class="prose-sh[^"]*"[\s\S]*?<\/div>/, ' '));
  if (outsideBody.includes(RAW_CREATOR)) flag(`/blog/${post.slug}/: "${RAW_CREATOR}" appears outside the article body`);
  const bp = jsonLdBlocks(page.html).find((o) => o && o['@type'] === 'BlogPosting');
  if (bp) {
    if (!bp.author || bp.author['@type'] !== 'Organization' || bp.author.name !== PUBLIC_AUTHOR) {
      flag(`/blog/${post.slug}/: BlogPosting author is not the ${PUBLIC_AUTHOR} Organization`);
    }
    if (bp.author && bp.author.name && !visibleText(page.html).includes(bp.author.name)) {
      flag(`/blog/${post.slug}/: structured-data author not visible on the page`);
    }
  }
}

// First-party RSS feed: exists, is well-formed enough to trust, carries
// every article as a local URL, and never names the raw creator.
const feedPath = path.join(out, 'feed.xml');
if (!existsSync(feedPath)) flag('missing feed.xml');
else {
  const feed = readFileSync(feedPath, 'utf8');
  if (!feed.startsWith('<?xml')) flag('feed.xml: missing XML declaration');
  if ((feed.match(/<item>/g) ?? []).length !== posts.length) flag(`feed.xml: expected ${posts.length} items`);
  for (const post of posts) {
    if (!feed.includes(`${ORIGIN}/blog/${post.slug}/`)) flag(`feed.xml: missing ${post.slug}`);
  }
  if (feed.includes(RAW_CREATOR)) flag(`feed.xml: names ${RAW_CREATOR}`);
  if (feed.includes('beehiiv.com/p/')) flag('feed.xml: items link to Beehiiv instead of local pages');
}
if (!posts.every((p) => pages.get('/blog/')?.html) || !pages.get('/')?.html.includes('application/rss+xml')) {
  flag('feed discovery link (rel=alternate application/rss+xml) missing from the homepage head');
}

// Pricing: exported, indexable, FAQPage schema, and no prices anywhere on
// the page, visible or in markup.
const pricing = pages.get('/pricing/');
if (!pricing) flag('missing /pricing/ page');
else {
  const text = visibleText(pricing.html).replace(/\s+/g, ' ');
  if (/\$\s*\d/.test(text)) flag('/pricing/: dollar amount in visible text');
  if (/\b\d[\d,]*\s*(USD|dollars)\b/i.test(text)) flag('/pricing/: numeric price in visible text');
  if (/starting at/i.test(text)) flag('/pricing/: "starting at" pricing language');
  const pricingLd = jsonLdBlocks(pricing.html);
  // No price-bearing fields may appear in any schema block on the page.
  const hasPriceKey = (o) =>
    o != null && typeof o === 'object' &&
    Object.entries(o).some(([k, v]) => /price/i.test(k) || hasPriceKey(v));
  if (pricingLd.some(hasPriceKey)) flag('/pricing/: price field in structured data');
  if (!pricingLd.find((o) => o && o['@type'] === 'FAQPage')) {
    flag('/pricing/: missing FAQPage JSON-LD');
  }
  if (!/complimentary/i.test(text) || !/paid engagement/i.test(text)) {
    flag('/pricing/: complimentary Snapshot / paid engagement separation not stated');
  }
}

// Booking page: inline Calendly embed, exactly one place sitewide.
const CALENDLY_EVENT = 'https://calendly.com/walter-mccain-signalharborconsulting/ai-visibility-audit-call';
const CALENDLY_SCRIPT = 'assets.calendly.com/assets/external/widget.js';
const book = pages.get('/book/');
if (!book) flag('missing /book/ page');
else {
  const text = visibleText(book.html).replace(/\s+/g, ' ');
  if (!book.html.includes('calendly-inline-widget')) flag('/book/: missing Calendly inline widget container');
  if (!book.html.includes(`data-url="${CALENDLY_EVENT}"`)) flag('/book/: widget data-url is not the approved Calendly event');
  if (!new RegExp(`<script[^>]+src="https://${CALENDLY_SCRIPT.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(book.html) && !book.html.includes(CALENDLY_SCRIPT)) {
    flag('/book/: Calendly widget script not referenced');
  }
  if (!new RegExp(`href="${CALENDLY_EVENT.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(book.html)) {
    flag('/book/: direct Calendly fallback link missing');
  }
  if (/badge|initbadgewidget|initpopupwidget/i.test(book.html.replace(/data-url="[^"]*"/g, ''))) {
    flag('/book/: badge or popup widget markup present');
  }
  if (!/complimentary/i.test(text) || !/paid engagements/i.test(text)) {
    flag('/book/: complimentary Snapshot / paid engagement boundary not stated');
  }
  if (!jsonLdBlocks(book.html).some((o) => o && JSON.stringify(o).includes('BreadcrumbList'))) {
    flag('/book/: missing BreadcrumbList structured data');
  }
}

// Everywhere else: no Calendly scripts, badges, popups, or booking-event
// links. Booking CTAs must point at the internal /book/ page. (The privacy
// policy may mention Calendly by name; it may not embed or link the event.)
for (const [route, { html }] of pages) {
  if (route === '/book/' || is404(route)) continue;
  if (html.includes(CALENDLY_SCRIPT)) flag(`${route}: Calendly script loaded outside /book/`);
  if (html.includes('calendly.com/walter-mccain')) flag(`${route}: direct Calendly booking link outside /book/`);
  if (/calendly-badge|initBadgeWidget|initPopupWidget/i.test(html)) flag(`${route}: Calendly badge/popup widget outside /book/`);
}
for (const route of ['/', '/snapshot/', '/audit/', '/pricing/', '/services/', '/blog/', '/faq/', '/about/', '/book/']) {
  const page = pages.get(route);
  if (!page) continue;
  if (route !== '/book/' && !/href="\/book\/?"/.test(page.html)) flag(`${route}: no booking CTA pointing at /book/`);
}

// Brand shell: the official transparent lockup on light header and footer,
// superseded logo assets unreferenced everywhere.
for (const [route, { html }] of pages) {
  if (is404(route)) continue;
  const headerTag = /<header[^>]*class="([^"]*)"/.exec(html)?.[1] ?? '';
  const footerTag = /<footer[^>]*class="([^"]*)"/.exec(html)?.[1] ?? '';
  if (!headerTag.includes('bg-white')) flag(`${route}: header is not on a light background`);
  if (!footerTag.includes('bg-white')) flag(`${route}: footer is not on a light background`);
  if (!/<header[\s\S]*?signal-harbor-lockup-horizontal\.png[\s\S]*?<\/header>/.test(html)) flag(`${route}: header does not use the official horizontal lockup`);
  if (/sh-mark-hd\.png|sh-mark-dark\.png|sh-mark-light\.png|sh-mark\.png|SH_Lighthouse_Logo\.png|signal-harbor-logo\.png/.test(html)) {
    flag(`${route}: references a superseded logo asset`);
  }
}
if (existsSync(path.join(out, 'sh-mark-hd.png')) || existsSync(path.join(out, 'sh-mark-dark.png')) || existsSync(path.join(out, 'sh-mark-light.png'))) {
  flag('superseded generated logo files still shipped in the export');
}
// Icon assets: real alpha channels (PNG color type 6) and a multi-size ICO.
const pngHasAlpha = (p) => existsSync(p) && readFileSync(p)[25] === 6;
if (!pngHasAlpha(path.join(out, 'signal-harbor-lockup.png'))) flag('signal-harbor-lockup.png missing or lacks an alpha channel');
if (!pngHasAlpha(path.join(out, 'signal-harbor-lockup-horizontal.png'))) flag('signal-harbor-lockup-horizontal.png missing or lacks an alpha channel');
if (!pngHasAlpha(path.join(out, 'signal-harbor-emblem.png'))) flag('signal-harbor-emblem.png missing or lacks an alpha channel');
if (!pngHasAlpha(path.join(out, 'icon.png'))) flag('icon.png missing or lacks an alpha channel');
const icoPath = path.join(out, 'favicon.ico');
if (!existsSync(icoPath)) flag('favicon.ico missing from export');
else {
  const ico = readFileSync(icoPath);
  if (ico.readUInt16LE(4) < 3) flag('favicon.ico does not contain the 16/32/48 size set');
}
if (!existsSync(path.join(out, 'apple-icon.png'))) flag('apple-icon.png missing from export');

// Analytics: the approved GA4 ID everywhere, exactly one bootstrap, no Tag
// Manager, no other measurement IDs, no legacy UA IDs.
const GA_ID = 'G-24V8BNMLFZ';
for (const [route, { html }] of pages) {
  if (is404(route)) continue;
  const idCount = (html.match(new RegExp(GA_ID, 'g')) ?? []).length;
  if (idCount === 0) flag(`${route}: GA4 measurement ID missing`);
  // Count rendered bootstrap script tags only; the RSC flight payload echoes
  // the same string once and is not a second tag.
  const bootCount = (html.match(/<script>window\.dataLayer=window\.dataLayer\|\|\[\]/g) ?? []).length;
  if (bootCount !== 1) flag(`${route}: expected exactly one GA bootstrap script, found ${bootCount}`);
  if (/googletagmanager\.com\/gtm\.js|GTM-[A-Z0-9]{4,}/.test(html)) flag(`${route}: Google Tag Manager present`);
  if (/\bUA-\d{4,}-\d+\b/.test(html)) flag(`${route}: legacy Universal Analytics ID present`);
  for (const m of html.matchAll(/G-[A-Z0-9]{8,12}/g)) {
    if (m[0] !== GA_ID) flag(`${route}: unexpected measurement ID ${m[0]}`);
  }
}

// Open Graph: page-specific titles and images on every indexable page.
const ogTitles = new Map();
for (const [route, { html }] of pages) {
  if (is404(route)) continue;
  const ogTitle = decode(/property="og:title" content="([^"]*)"/.exec(html)?.[1] ?? '');
  const ogDesc = decode(/property="og:description" content="([^"]*)"/.exec(html)?.[1] ?? '');
  const ogImage = /property="og:image" content="([^"]*)"/.exec(html)?.[1];
  const twImage = /name="twitter:image" content="([^"]*)"/.exec(html)?.[1];
  const twCard = /name="twitter:card" content="([^"]*)"/.exec(html)?.[1];
  if (!ogTitle) flag(`${route}: missing og:title`);
  else ogTitles.set(ogTitle, [...(ogTitles.get(ogTitle) ?? []), route]);
  if (!ogDesc) flag(`${route}: missing og:description`);
  if (!ogImage) flag(`${route}: missing og:image`);
  else {
    const rel = ogImage.replace(/^https?:\/\/[^/]+/, '').split('?')[0];
    if (!existsSync(path.join(out, rel))) flag(`${route}: og:image ${rel} not in export`);
    else if (readFileSync(path.join(out, rel)).readUInt32BE(16) !== 1200) flag(`${route}: og:image is not 1200px wide`);
  }
  if (!twImage) flag(`${route}: missing twitter:image`);
  if (twCard !== 'summary_large_image') flag(`${route}: twitter:card is ${twCard}`);
  const desc = decode(/<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? '');
  if (ogDesc && desc && ogDesc !== desc) flag(`${route}: og:description differs from meta description`);
}
for (const [t, routes] of ogTitles) {
  if (routes.length > 1) flag(`duplicate og:title "${t.slice(0, 50)}" on ${routes.join(', ')}`);
}

// Blog production residue: narrow list of known artifacts.
for (const post of posts) {
  if (/>\s*Strong Conclusion\s*</i.test(post.html)) flag(`posts.json ${post.slug}: "Strong Conclusion" residue`);
  if (/reply to this email|receiving this email|unsubscribe|powered by beehiiv/i.test(post.html)) {
    flag(`posts.json ${post.slug}: email boilerplate residue`);
  }
}

// Sitemap and robots.
const sitemapPath = path.join(out, 'sitemap.xml');
if (!existsSync(sitemapPath)) flag('missing sitemap.xml');
else {
  const sitemapRoutes = new Set();
  for (const m of readFileSync(sitemapPath, 'utf8').matchAll(/<loc>([^<]*)<\/loc>/g)) {
    const url = m[1];
    if (!url.startsWith(ORIGIN)) flag(`sitemap: wrong origin ${url}`);
    const p = url.slice(ORIGIN.length) || '/';
    sitemapRoutes.add(p);
    if (!pages.has(p)) flag(`sitemap: ${p} is not an exported page`);
  }
  // Reverse membership: every indexable page (all pages except the 404
  // documents) must be listed, which covers /pricing/, /blog/, and every
  // article route.
  for (const route of pages.keys()) {
    if (!is404(route) && !sitemapRoutes.has(route)) flag(`sitemap: missing ${route}`);
  }
}
if (!existsSync(path.join(out, 'robots.txt'))) flag('missing robots.txt');

console.log(`Verified ${pages.size} exported page(s).`);
if (problems.length === 0) {
  console.log('PASS. Export meets every checked guarantee.');
} else {
  console.error(`FAIL. ${problems.length} problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exitCode = 1;
}
