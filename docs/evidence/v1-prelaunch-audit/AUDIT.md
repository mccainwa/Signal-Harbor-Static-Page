# Prelaunch SEO, GEO, and AEO audit

Date: August 25, 2026. Audited against Google Search Essentials, Google
crawling/indexing and AI-features guidance, Google structured-data
guidance (Article, Organization, Breadcrumb, Service, FAQ), Bing Webmaster
guidelines, IndexNow, and the OpenAI and Perplexity crawler documentation.
No generic-checklist or invented AI-ranking claims. Correct implementation
does not guarantee indexing, rankings, AI citations, or recommendations.

## 1. Site-controlled and complete (verified in the export)

- One canonical HTTPS origin (signalharborai.com) on every canonical, LD id, sitemap URL, feed URL, and llms.txt entry.
- One indexable page per URL, exactly one H1 each, unique titles and descriptions (33 pages).
- Real 404 (404.html + 404/) with noindex; no soft-404 patterns; all other routes indexable.
- Fully crawlable without JavaScript (verified for the blog index, all 16 articles, and the booking fallback).
- All internal links, fragments, images, and assets resolve; images carry alt and dimensions; no redirect chains inside the site.
- sitemap.xml: complete both directions (every exported indexable page listed, every listed page exported), articles carry accurate lastmod from the feed; robots.txt references the sitemap; robots allows all crawlers.
- Old-route parity vs origin/main: the previous site had /, /about, /faq, /methodology, /platform, /privacy, /research, /services, /terms. All nine remain live at the same paths. Nothing removed, nothing to redirect.
- Blog: unique metadata, self-canonicals, visible dates, BlogPosting with Organization author (visible byline matches), Organization publisher, related internal links, sitemap membership.
- First-party /feed.xml (RSS 2.0, all 16 articles, local URLs, self atom:link) with rel=alternate discovery in the head and a visible RSS link on /blog/. Beehiiv attribution retained on every article.
- Entity consistency: same name, domain, email, logo asset, memberships (band, About, footer, memberOf), boundary language, and llms.txt across the site. Blog authorship now organizational.
- Structured data present and matching visible content: Organization (+memberOf, logo), WebSite, WebPage/Breadcrumb (guide, booking), BlogPosting x16, Service (snapshot, audit), FAQPage (faq, pricing). No ratings, reviews, prices, locations, or invented entities anywhere.
- Search appearance: og:image social card (1200x630, official lockup), summary_large_image, unique titles/descriptions, favicon set with real alpha, Organization logo metadata pointing at the official lockup.
- Content answers verified present in crawlable HTML for all seventeen mandated questions (what Signal Harbor does; AI visibility/GEO/AEO definitions and relationship; measurement method; Snapshot vs Audit contents and difference; who it serves; pricing model; improving visibility; responding to wrong answers; control limits; booking; data handling; research basis) across /, /ai-visibility/, /methodology/, /platform/, /snapshot/, /audit/, /services/, /pricing/, /faq/, /book/, /privacy/, /research/.

## 2. Site-controlled and was missing -> fixed this pass

- No social preview image -> og-card.png + Open Graph/Twitter metadata.
- No first-party feed -> /feed.xml + discovery link + verifier rules.
- No sitemap lastmod -> accurate per-article lastmod (static pages omit rather than fake).
- Personal blog authorship -> organizational authorship everywhere public, centralized constant, verifier-enforced.
- Fragmented favicon -> single-component official-silhouette favicon (evidence in this folder).
- No newsletter automation -> PR-based sync workflow (activates once merged).

## 3. Post-deployment verification required

See docs/POST_DEPLOY_VERIFICATION.md: GSC and Bing ownership + sitemap
submission, URL inspection and indexing requests, Rich Results and Schema
validator passes, live robots.txt and crawler user-agent curls
(Googlebot, Bingbot, OAI-SearchBot, PerplexityBot), canonical/HTTPS/
redirect checks on the production CDN, IndexNow decision, and first-month
monitoring cadence.

## 4. Founder-owned information required

- Rename the Calendly event ("AI Visibility Audit Call") and its description to Snapshot terminology.
- Legal review of the Privacy page (Calendly disclosure included).
- Optional entity facts only the founder can confirm: business address, founding date, phone, official social/profile URLs for Organization sameAs (none invented; all absent by design until confirmed).
- Decision on training-crawler policy (currently allow-all per earlier guidance) and on IndexNow.
- GitHub setting for the sync workflow: Actions -> General -> "Allow GitHub Actions to create and approve pull requests".

## 5. Off-site authority work (founder-owned, unbounded)

- Directory and review-surface profiles consistent with the site's facts.
- Earned coverage and citations of the research/definitions pages.
- The memberships (Ignite Lab, 1871) surfaced on those organizations' own sites where applicable.
- Consistent NAP-style entity data wherever the company is listed.

## AI crawler policy on record

robots.txt: `User-agent: * / Allow: /` plus sitemap. Search and answer
crawlers (Googlebot, Bingbot, OAI-SearchBot, PerplexityBot) are allowed,
which is the configuration tied to discoverability in their documented
behavior. Training crawlers (GPTBot, ClaudeBot, Google-Extended, etc.) are
also allowed by the wildcard; that permits training use and does not aid
search visibility, and any restriction is a founder decision. llms.txt
remains labeled experimental on the site and is not a ranking mechanism.

## Favicon root cause (evidence in this folder)

The rejected C2 icon's frames contained 5-13 disconnected raster
components; the 16px frame had four corner fragments (6px and 3px islands)
where the crop severed the segmented outer rings mid-arc. Crop artifact,
not caching. The implemented replacement is the official lighthouse
silhouette recolored to brand cyan (authorized simplification): every
frame is exactly one connected component, verified clean on light and dark
tab simulations and served correctly to fresh Chromium and Edge profiles.
Firefox is not installed on this machine and was not tested.
