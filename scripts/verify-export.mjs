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
  // Visible text: strip non-rendered blocks, then tags.
  const text = decode(
    html
      .replace(/<(script|style|svg|noscript|template)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  );

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
    const [pathPart, fragment] = url.split('#');
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

// Sitemap and robots.
const sitemapPath = path.join(out, 'sitemap.xml');
if (!existsSync(sitemapPath)) flag('missing sitemap.xml');
else {
  for (const m of readFileSync(sitemapPath, 'utf8').matchAll(/<loc>([^<]*)<\/loc>/g)) {
    const url = m[1];
    if (!url.startsWith(ORIGIN)) flag(`sitemap: wrong origin ${url}`);
    const p = url.slice(ORIGIN.length) || '/';
    if (!pages.has(p)) flag(`sitemap: ${p} is not an exported page`);
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
