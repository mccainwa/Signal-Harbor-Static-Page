# V1 SEO, GEO, and AEO refresh: visual evidence

Full-page screenshots captured with Playwright (Chromium) against the final
production export (`next build`, `out/`) of branch `refresh/v1-seo-geo-aeo`.
These are the pages exactly as the static export renders them, served locally
with the same trailing-slash routing GitHub Pages uses. Nothing here is a
design mockup.

- Desktop viewport: 1440x900
- Mobile viewport: 390x844 (reduced motion)
- Commit: the remediation commit on PR #1 that introduced this directory (its parent is f91f98c, branch refresh/v1-seo-geo-aeo)
- Lighthouse at this commit: home 80/100/100/100, /ai-visibility 82/100/100/100,
  /snapshot 83/100/100/100 (performance / accessibility / best practices / SEO)

| File                         | Page                                   |
| ---------------------------- | -------------------------------------- |
| `home-desktop.png`           | Homepage, desktop                      |
| `home-mobile.png`            | Homepage, mobile                       |
| `ai-visibility-desktop.png`  | `/ai-visibility`, desktop              |
| `ai-visibility-mobile.png`   | `/ai-visibility`, mobile               |
| `snapshot-desktop.png`       | `/snapshot`, desktop                   |
| `snapshot-mobile.png`        | `/snapshot`, mobile                    |
| `mobile-nav-open.png`        | Open mobile navigation with its CTA    |

This directory lives under `docs/` and is not part of the exported website:
the static export includes only the compiled `app/` routes and files from
`public/`.
