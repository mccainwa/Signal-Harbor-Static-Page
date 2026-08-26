# Blog content sync (Beehiiv to /blog/)

The blog at `/blog/` is statically rendered from `content/blog/posts.json`.
Production and CI builds read only that committed file. They never contact
Beehiiv, so the site builds even if Beehiiv is unavailable.

**Publishing a Beehiiv newsletter alone does not update the website.** The
site updates only after the feed is synchronized, validated, committed
(via a reviewed pull request), and deployed by the normal merge-to-main
deploy.

## Automatic synchronization (GitHub Actions)

`.github/workflows/blog-sync.yml` checks the public RSS feed daily at 13:20
UTC and can be run on demand from the Actions tab (`workflow_dispatch`). It:

1. Runs `npm run sync:blog` (public feed, no credentials).
2. Exits quietly when nothing changed.
3. When new content exists, runs the production build and the export
   verifier against it.
4. Opens (or force-updates) the `blog-sync/feed-update` branch and its
   pull request. It never commits to `main` and never deploys.

A new newsletter appears on the live site only after that PR is reviewed,
merged, and the merge-triggered deploy completes.

One-time repository setting required: Settings -> Actions -> General ->
Workflow permissions -> enable "Allow GitHub Actions to create and approve
pull requests". Without it the PR step fails safely.

**Image alt-text failures:** if a new post contains a new inline image, the
sync exits non-zero (by design) until a human-written description is added
to `ALT_OVERRIDES` in `scripts/sync-blog.mjs`. The workflow run shows the
failing image URL. Look at the actual image, add the alt entry in a normal
PR, merge it, then re-run the sync workflow from the Actions tab.

**Re-running a failed sync:** fix the cause (usually alt text or a Beehiiv
outage), then Actions -> Blog sync -> Run workflow. Runs are idempotent;
the same content produces the same `posts.json`.

**Verifying an article after deployment:** open
`https://signalharborai.com/blog/` and the new article URL, confirm the
article renders with the Signal Harbor byline and date, check it appears in
`https://signalharborai.com/sitemap.xml` and `/feed.xml`, and spot-check
the page with JavaScript disabled.

## Manual fallback

The same pipeline runs locally:

1. Run the sync command:

   ```
   npm run sync:blog
   ```

   This fetches the public RSS feed (`https://rss.beehiiv.com/feeds/lCr2tO6J1T.xml`),
   sanitizes each article body with `sanitize-html` (allowlist tags and
   attributes only), strips Beehiiv boilerplate (footer blocks, subscribe
   links, tracking pixels, duplicate title headings), normalizes punctuation
   (em and en dashes are replaced without changing meaning), downloads any
   inline article images into `public/images/blog/`, and rewrites the data to
   `content/blog/posts.json`.

2. Review the generated content. Read the new entries in
   `content/blog/posts.json` (or run the site locally and read the new
   article pages). Confirm the text is clean, the images have accurate alt
   text, and nothing unwanted came through.

   If a new post contains an inline image, the sync will fail until an
   accurate, human-written alt text is added to `ALT_OVERRIDES` in
   `scripts/sync-blog.mjs`. Look at the actual image before writing it.
   This is deliberate: alt text is never guessed.

3. Commit the changes (`content/blog/posts.json`, any new files under
   `public/images/blog/`, and the `ALT_OVERRIDES` edit if one was needed).

4. Rebuild and deploy the site the normal way (merging to `main` triggers
   the GitHub Pages deploy). `npm run check` runs the build plus
   `scripts/verify-export.mjs`, which validates every blog route.

## Guarantees

- No API key is used or needed. The public RSS feed contains full post
  bodies.
- The sync is deterministic: the same feed input produces the same
  `posts.json` output.
- Sanitization is allowlist-based via the maintained `sanitize-html`
  package, not regular expressions.
- Article pages render as static HTML and remain readable with JavaScript
  disabled.
