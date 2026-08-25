# Signal Harbor Discoverability Plan

How the V1 website earns legitimate visibility in search engines and AI-generated
answers, what this PR implemented, and what only the founder can do next.

Nothing in this plan guarantees rankings, citations, recommendations, or
traffic. A Lighthouse SEO score of 100 verifies a narrow set of technical
checks. Durable visibility also depends on query coverage, content depth,
entity clarity, external authority, and time, which is what this plan covers.

Written August 2026 against branch `refresh/v1-seo-geo-aeo`.

---

## 1. Technical crawlability findings

Verified against the production export (`next build`, `out/`), enforced going
forward by `scripts/verify-export.mjs` in CI:

| Check | Finding |
| --- | --- |
| Static HTML content | Every page is fully prerendered. Headings, copy, FAQs, and structured data are present in the initial HTML and do not depend on client-side JavaScript. The only client components are the mobile menu, FAQ accordions, the product tour tabs, and a count-up animation, none of which gate content. |
| Route status | All 12 public routes export successfully and serve 200. Unknown paths serve the branded 404. |
| Canonicals | Every indexable page carries an absolute canonical on `https://signalharborai.com` matching its own path. |
| Sitemap | `sitemap.xml` lists exactly the 12 canonical indexable routes, all on the production origin. |
| Robots | `robots.txt` allows all crawling (`User-agent: *`, `Allow: /`) and points at the sitemap. |
| noindex | Only the 404 error document is noindex. The verifier now fails on any other noindex. |
| Internal links | All navigation and body links are crawlable `<a>` elements. Every internal link, fragment, and asset resolves (verified). |
| Orphans | Every public page is reachable from the header or footer: Snapshot and Audit under Services, the guide under Resources, legal pages in the footer. No orphaned indexable pages. |
| Titles and descriptions | Unique per page (verified). |
| Structured data | Organization and WebSite sitewide, Service on `/snapshot` (complimentary Snapshot) and `/audit` (paid audit), FAQPage generated from the same array the FAQ page renders, WebPage and BreadcrumbList on `/ai-visibility`. Everything mirrors visible content. No invented facts. |
| Images | All have alt text (empty alt on decorative logo marks beside visible wordmarks) and explicit dimensions. |
| Mobile and accessibility | All routes render without horizontal overflow at 390px, keyboard navigation works, and Lighthouse accessibility is 100 on the home, guide, and Snapshot pages after the contrast corrections. |
| Performance | Lighthouse performance is in the low 80s locally (static export, ~100 kB first-load JS). Nothing blocks crawling or content access. Largest wins would be font strategy and the hero mock, deferred as design-touching. |

## 2. AI crawler accessibility findings

`robots.txt` contains a single wildcard allow rule and no crawler-specific
blocks, so **Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, and ClaudeBot
are all permitted** (each documents that it honors wildcard rules). No
redundant per-bot rules were added.

Search and answer-retrieval crawlers versus model-training crawlers: the
current policy also permits training crawlers (GPTBot, CCBot, Google-Extended,
and similar) because nothing excludes them. **Changing the training-crawler
policy is a founder decision** with a real trade-off: blocking training
crawlers may reduce long-term presence inside models, while allowing them
donates content to training. No change was made in this PR.

Post-launch crawler test (run against the live site, not localhost):

```
curl -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" -sI https://signalharborai.com/
curl -A "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)" -sI https://signalharborai.com/ai-visibility/
curl -A "OAI-SearchBot/1.0; +https://openai.com/searchbot" -sI https://signalharborai.com/snapshot/
curl -A "Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)" -sI https://signalharborai.com/audit/
curl -A "Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)" -sI https://signalharborai.com/robots.txt
```

Each should return `HTTP/2 200` with HTML (GitHub Pages does not vary by user
agent, so a 200 here plus the permissive robots.txt confirms access). Also
confirm rendering parity by fetching a page with `curl` and checking the H1 is
present in the raw HTML.

## 3. Page-to-query map

One primary intent per page. No two pages target the same primary query.

| Route | Primary intent | Secondary intents | Conversion |
| --- | --- | --- | --- |
| `/` | how AI platforms recommend companies | AI visibility, AI search visibility | Get a Complimentary Snapshot |
| `/ai-visibility/` | what is AI visibility | GEO definition, AEO definition, SEO vs GEO vs AEO, how to improve visibility in AI answers, how to correct inaccurate AI answers | Get a Complimentary Snapshot |
| `/snapshot/` | AI Visibility Snapshot | complimentary AI visibility check | Get Your Snapshot |
| `/audit/` | AI visibility audit | AI visibility audit services, snapshot vs audit | Discuss an AI Visibility Audit |
| `/services/` | AI visibility services, GEO services | AI search optimization, AI brand monitoring, AI hallucination monitoring, AI brand accuracy | Discuss an AI Visibility Audit |
| `/platform/` | what an AI visibility platform measures | AI recommendation tracking | Get a Complimentary Snapshot |
| `/methodology/` | how to measure AI visibility | repeated AI testing, AI answer variability | Get a Complimentary Snapshot |
| `/research/` | AI visibility research basis | buyer behavior in AI search | View research (supporting page) |
| `/faq/` | long-tail question set | snapshot vs audit, platform selection, guarantees | Get a Complimentary Snapshot |
| `/about/` | Signal Harbor (branded) | who is Signal Harbor | Get a Complimentary Snapshot |

Intents evaluated with no dedicated page (deliberate, see gaps):
"AEO services" and "AI visibility services for high-consideration businesses"
resolve to `/services` and the FAQ for now; a thin page for each would not add
substance today.

## 4. Content gaps

Closed in this PR:

- **AI visibility audit (commercial)**: the paid audit had no page. `/audit/`
  now covers scope, process, deliverables, a Snapshot-versus-Audit comparison
  table, the control boundary, and conversion. This was the largest
  commercial-intent gap.
- **How to improve AI visibility (educational)**: `/ai-visibility/` gained the
  five-step improvement section, completing the define, diagnose, improve,
  correct arc on one page.
- **GEO services (commercial)**: `/services` retitled "AI Visibility and GEO
  Services" so the page matches the query language buyers use.
- **AI recommendation tracking**: named explicitly on `/platform`.

Remaining gaps for the follow-up plan (each needs substance, not a keyword
page): a dedicated AEO explainer with worked examples once real examples
exist, an industry page for high-consideration categories once client-approved
examples exist, and comparison or alternatives content once there are named
competitors worth comparing against honestly.

## 5. Internal-link recommendations

Implemented: header and footer carry Snapshot, Audit, guide, research, and FAQ;
the guide links to methodology, research, Snapshot, and Audit; Snapshot links
to Audit and services; services links to Audit; methodology links to the guide
and Audit; home links to Snapshot; every commercial page links to the booking
URL.

Recommended next (post-V1): link the FAQ answers to their deep pages when the
FAQ component supports rich text, add a related-pages block to the research
page, and link the homepage problem section to `/ai-visibility` for the
educational path.

## 6. Entity-consistency findings

Consistent everywhere (visible copy, Organization, WebSite, and Service
schema, contact info, logo, domain): **Signal Harbor**, an AI visibility
intelligence and GEO services company at `https://signalharborai.com`,
contact `info@signalharborconsulting.com` (the old domain deliberately keeps
mail), logo `/signal-harbor-logo.png`, offers named exactly **AI Visibility
Snapshot** (complimentary with the introductory call) and **AI Visibility
Audit** (paid).

Missing trust information that needs founder confirmation before publication
(do not invent any of it): `sameAs` social profile links (LinkedIn company
page URL), founder name and biography for an About page byline, founding
year, location or service region, client names or case studies (written
approval required), and any credentials. Each of these strengthens entity
resolution once real.

The methodology and research pages already show what is measured, why
repeated testing matters, what varies across AI responses (model, prompt
wording, location, account state, source availability, time), stated
limitations, external references, and a visible separation between Signal
Harbor observations and third-party research (the stats section is labeled
"Third-party industry research. These are not Signal Harbor performance
claims or client results.").

## 7. External authority checklist (founder-owned)

No accounts were created and no third-party profiles were changed in this
task. In rough priority order:

1. Verify the domain in Google Search Console (DNS TXT or HTML file).
2. Submit `https://signalharborai.com/sitemap.xml` in Search Console.
3. Verify in Bing Webmaster Tools (can import from Search Console).
4. Submit the sitemap in Bing Webmaster Tools.
5. Use URL Inspection on every canonical page; request indexing for the new
   `/ai-visibility/`, `/snapshot/`, and `/audit/` pages.
6. Align the Signal Harbor LinkedIn company page: same name, same one-line
   description as the site footer, link to signalharborai.com.
7. Align the founder's LinkedIn profile with the company terminology
   (AI Visibility Snapshot, AI Visibility Audit).
8. Claim accurate listings in relevant business directories (start with the
   few that matter in B2B services; consistency beats volume).
9. Pursue earned mentions: podcasts, industry newsletters, and articles that
   describe Signal Harbor with its own terminology and link the domain.
10. Contribute guest articles or original commentary on AI visibility topics.
11. Publish original research on the site when a study is real; original data
    is the strongest citation magnet this company can build.
12. Publish client-approved case studies (written approval first).
13. Find and correct outdated references that point to
    signalharborconsulting.com or describe the old positioning.

## 8. Search Console and Bing setup checklist

Covered in items 1 to 5 above; additionally, after the first deploy of this
branch: confirm GitHub Pages serves the new routes (spot-check
`/ai-visibility/`, `/snapshot/`, `/audit/`), confirm `robots.txt` and
`sitemap.xml` render on the live domain, run the crawler user-agent tests from
section 2, and validate one page of each schema type in Google's Rich Results
test against live URLs.

## 9. Signal Harbor self-audit question set

Educational: What is AI visibility? · What is the difference between SEO, GEO,
and AEO? · How can a company measure its AI visibility? · How can a company
correct inaccurate information in AI answers?

Problem-aware: Why does my company not appear in AI recommendations? · How can
a company monitor how ChatGPT describes its brand? · What should we do when an
AI chatbot gives wrong information about our company?

Service-category: What companies help businesses measure AI search
visibility? · Who provides Generative Engine Optimization services? · What
services track AI recommendations across platforms? · What companies provide
AI brand accuracy monitoring?

Provider-comparison: What are the best AI visibility audit services? · How do
businesses measure whether AI recommends them, and who can help?

Branded: What is Signal Harbor? · What is an AI Visibility Snapshot? · What
does the Signal Harbor AI Visibility Audit include? · Is Signal Harbor
legitimate?

Unbranded recommendation: Which provider should a B2B services company use to
audit its AI visibility? · Who should a company hire to improve how AI
assistants describe it?

## 10. Baseline and retest measurement method

For each question above, on each platform in the measurement set, record in a
simple sheet (one row per question, platform, and run):

date and time · platform and mode (chat, search mode) · exact question ·
did Signal Harbor appear (yes/no) · mention or active recommendation ·
position and prominence (first named, listed among N, footnote) ·
description accuracy against the site's own terminology (Snapshot, Audit,
complimentary versus paid) · competitors named · sources cited (URLs) ·
notes on variation.

Run every question at least three times across different days before drawing
any conclusion; single answers are noise. Compare across platforms rather
than averaging them. Establish the baseline before the updated pages deploy
where possible (the current live site is still the old content, so a
pre-merge baseline captures the true "before"). Retest after the pages are
deployed and indexed; indexing and answer-system refresh timelines vary and
no fixed timeline is promised. Re-run the full set on a monthly cadence and
after any major platform model release. This is the same discipline Signal
Harbor sells, applied to itself.

## 11. Prioritized actions

**Implemented in this PR**: the `/audit/` page; the improvement-steps section
on `/ai-visibility/`; services retitled for GEO intent; AI recommendation
tracking named on `/platform/`; internal links between Snapshot, Audit,
guide, methodology, services, and home; audit route added to the sitemap and
llms.txt; noindex guard added to the export verifier; crawler access
verified and documented; this plan.

**Required immediately after deployment (founder-owned)**: Search Console and
Bing verification and sitemap submission; URL inspection and indexing
requests for the three new pages; live crawler user-agent tests; Rich Results
validation on live URLs; LinkedIn company and founder profile alignment; the
self-audit baseline run (ideally started pre-merge).

**Longer-term authority and content work**: original research publication;
client-approved case studies; earned mentions and guest contributions;
directory listings; outdated-reference cleanup; the AEO explainer and
industry pages once they can be substantive; a decision on model-training
crawler policy; contrast-system design pass; performance work on fonts and
the hero visual.
