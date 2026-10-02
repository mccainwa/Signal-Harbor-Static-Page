# Automatic blog publishing

Publishing a public newsletter in Signal Harbor Weekly on Beehiiv is the only
routine publishing step. The website imports it automatically from the public
RSS feed. No GitHub pull request, merge, API key, or manual image entry is needed.

## How it works

`.github/workflows/blog-sync.yml` checks hourly at minute 17 UTC. GitHub may delay
scheduled runs, so this is an hourly check rather than an immediate publishing
promise. The workflow can also be started from Actions → Blog sync → Run workflow.

Each run:

1. Checks out the latest `main` and imports the public Beehiiv feed.
2. Sanitizes article HTML, downloads images, and keeps previously imported posts
   when older issues disappear from the feed. New images use an optional reviewed
   description, supplied feed alt text, or a factual label naming the article.
   The fallback identifies the image's context; it does not invent visual details.
3. Stages only `content/blog/` and `public/images/blog/`, including new image files.
4. Builds the complete website and runs export verification.
5. Commits changed, validated content directly to `main`, using a normal push.
   A concurrent update to `main` fails safely and is retried by the next run.
6. Uploads the verified export and deploys it to GitHub Pages in the same run.

Deploying in the sync workflow is intentional: a push made with `GITHUB_TOKEN`
does not trigger the normal push-based deployment workflow. Both publishing
workflows share a Pages concurrency group and do not cancel an active publication.

No-change runs also build and deploy. This lets the next scheduled run recover
from a deployment failure after content was already committed. Bad feed data,
failed downloads, or failed validation stop publication and leave the last live
site in place; the next scheduled run retries automatically. Persistent failures
remain visible in GitHub Actions and need a technical fix. GitHub repository
notifications determine who receives failure emails.

## Validation and content behavior

- Articles are static HTML, readable without JavaScript.
- Blog cards, article pages, the sitemap, and `/feed.xml` use the same committed data.
- `sanitize-html` removes unsafe tags and attributes before content is built.
- Empty bodies, invalid article slugs or dates, and duplicate feed slugs fail import.
- Missing newsletter descriptions use a short excerpt from the sanitized article.
- Optional `ALT_OVERRIDES` descriptions still take priority for known images.
- No credentials are needed for the RSS feed or article images.
- The workflow needs repository content write and GitHub Pages deployment permissions.
  It no longer depends on the setting that allows Actions to create pull requests.

## Manual fallback for troubleshooting

Run `npm run sync:blog`, then `npm run check`. Review and commit generated files;
a normal merge to `main` runs the validated deployment workflow. This fallback
is for troubleshooting, not routine newsletter publication.

After deployment, verify `https://signalharborai.com/blog/`, the new article URL,
`https://signalharborai.com/sitemap.xml`, and `https://signalharborai.com/feed.xml`.
