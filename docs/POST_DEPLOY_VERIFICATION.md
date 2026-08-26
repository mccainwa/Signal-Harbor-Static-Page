# Post-deployment verification plan

Run these after the refresh is merged and deployed to
https://signalharborai.com. None of this can be proven from the local
export; correct implementation does not guarantee indexing, rankings, AI
citations, or AI recommendations.

## Search Console and Bing

1. Google Search Console: add property `signalharborai.com` (domain
   property via DNS TXT, or URL-prefix via the HTML-file/meta method).
2. Submit `https://signalharborai.com/sitemap.xml`.
3. URL-inspect and request indexing for: `/`, `/ai-visibility/`,
   `/snapshot/`, `/audit/`, `/pricing/`, `/blog/`, `/book/`, and the two or
   three strongest articles.
4. Bing Webmaster Tools: import the verified GSC property (fastest) or
   verify directly; submit the same sitemap.
5. IndexNow (optional, Bing-side): host a key file and ping on future
   deploys; skip unless the founder wants it, since GitHub Pages has no
   build hook for automatic pings without adding a workflow step.

## Structured data and appearance

6. Rich Results Test on `/`, one article, `/pricing/` (FAQ), `/book/`
   (breadcrumb), `/faq/`.
7. Schema Markup Validator spot-checks for Organization + WebSite on `/`.
8. Confirm the tab favicon and the search-result site name/logo after
   recrawl (logo comes from the Organization JSON-LD lockup URL).

## Live crawler access (run from any shell)

The static export cannot prove what the production CDN serves. After
deploy, confirm 200s and identical HTML for the documented search and
answer crawlers:

    curl -sI -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" https://signalharborai.com/ | head -1
    curl -sI -A "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)" https://signalharborai.com/ | head -1
    curl -sI -A "Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)" https://signalharborai.com/ | head -1
    curl -sI -A "Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)" https://signalharborai.com/ | head -1
    curl -s https://signalharborai.com/robots.txt
    curl -sI https://signalharborai.com/sitemap.xml | head -1
    curl -sI https://signalharborai.com/feed.xml | head -1
    curl -sI https://signalharborai.com/blog/ | head -1
    curl -sI "https://signalharborai.com/favicon.ico" | head -3

Also verify canonicals and HTTPS: `curl -s https://signalharborai.com/ |
grep canonical` and confirm `http://` and any `www` variant redirect in one
hop to the canonical origin (no chains).

## Crawler policy on record

robots.txt allows all user agents and lists the sitemap. That means:

- Search/answer crawlers (Googlebot, Bingbot, OAI-SearchBot,
  PerplexityBot): allowed. These are the crawlers tied to being found and
  cited in search and answer surfaces.
- Training crawlers (GPTBot, ClaudeBot, Google-Extended, and similar): also
  allowed under the current wildcard. Allowing them does NOT improve search
  visibility; it permits model-training use of the content. Restricting
  them is a founder decision recorded earlier as "do not change without
  founder approval," so the wildcard stands until the founder directs
  otherwise.

`llms.txt` remains experimental: some systems read it, none are known to
rank on it, and it is not a standard.

## Ongoing monitoring

- GSC Pages + Sitemaps reports weekly for the first month (watch for soft
  404s, duplicate-without-canonical, and unexpected excluded pages).
- Bing site scan once after verification.
- Re-run the curl set after any CDN or DNS change.
