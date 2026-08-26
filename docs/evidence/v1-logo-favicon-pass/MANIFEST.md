# Official logo, favicon, and visual refinement pass: evidence manifest

Date: August 25, 2026. Branch `refresh/v1-seo-geo-aeo`, uncommitted working
tree on `1912bf7`. All screenshots taken from the production static export.

## Official logo processing

Source: `docs/brand/Signal-harbor-logo.png`, a byte-identical preserved copy
of the supplied authoritative file (1254x1254, PNG color type 2, no alpha:
the checkerboard is baked pixels, values 254/254/254 and 244/244/244).

Removal method (deterministic, no redrawing or AI): per-pixel least-squares
coverage unmixing. Measured checker colors and the two measured ink colors
(navy 2,30,60 and signal blue 0,168,255) form background x ink candidate
pairs; each pixel takes the best-fit ink coverage as its alpha with the pure
ink as its color, and pixels matching the checker within tolerance become
fully transparent. Antialiased edges keep their coverage, so there is no
white or gray halo. Verified on white, pale blue (#EFF6FB), navy (#0A1628),
and a true transparency grid (`logo-on-*.png`, `emblem-on-*.png`).

## Asset table

| Path | Dimensions | Format | Alpha | Use |
|------|-----------|--------|-------|-----|
| docs/brand/Signal-harbor-logo.png | 1254x1254 | PNG (RGB) | no (source, checkerboard baked) | preserved supplied master, never served |
| docs/brand/signal-harbor-lockup-master.png | 1004x1031 | PNG (RGBA) | yes | full-resolution transparent master |
| public/signal-harbor-lockup.png | 351x360 | PNG (RGBA) | yes | header, footer, Organization JSON-LD logo |
| public/signal-harbor-emblem.png | 512x512 | PNG (RGBA) | yes | emblem-only official crop (mark + rings) |
| app/icon.png | 512x512 | PNG (RGBA) | yes | browser icon (transparent) |
| app/apple-icon.png | 180x180 | PNG (RGBA) | yes (white fill per Apple convention) | apple touch icon |
| app/favicon.ico | 16+32+48 | ICO (PNG entries) | yes, all entries | tab favicon, verified at /favicon.ico |

## Superseded references

- `components/Logo.tsx`: sh-mark-hd.png replaced by signal-harbor-lockup.png; typed wordmark removed (the official lockup carries the wordmark; img alt "Signal Harbor").
- `app/layout.tsx` Organization JSON-LD logo: signal-harbor-logo.png (white background) replaced by signal-harbor-lockup.png.
- `public/sh-mark-hd.png`: deleted (my generated derivative from the superseded source; fully unreferenced).
- Kept untouched as historical originals, now unreferenced: `public/sh-mark.png`, `public/SH_Lighthouse_Logo.png`, `public/signal-harbor-logo.png`.
- The export verifier now fails on any reference to the superseded assets and requires alpha in the shipped brand/icon PNGs and a 3-entry favicon.ico.

## Visual audit findings and fixes (this pass)

| Route | Viewport | Issue | Severity | Fix | Evidence |
|-------|----------|-------|----------|-----|----------|
| /book/ | all | H1 lines visually collided (tight leading at 2.6rem) | High | leading 1.16-1.18, responsive sizes, 17ch mobile cap, nbsp keeps "AI Visibility" together | book-desktop-loaded.png |
| /book/ | all | Step cards unevenly wrapped, badges top-hanging | Medium | items-center rows, equal padding, soft shadow, grid stretch keeps heights equal | book-desktop-loaded.png |
| /book/ | desktop | Calendly showed a nested scrollbar at 760px height | Medium | reserved height 1000px desktop / 1150px mobile (site-owned container; Calendly still manages its own internal steps) | book-desktop-loaded.png |
| /book/ | all | Excess empty space around hero/steps/embed | Low | tightened vertical rhythm (py, mt steps) | book-desktop-loaded.png |
| all | all | Favicon rendered as a white tile (opaque white-background crop) | High | rebuilt from the official emblem with real alpha at 16/32/48 | favicon-tab-proof.png, favicon-16/32/48.png |
| all | all | Header/footer used a typed wordmark next to a crop of the superseded logo | High | official full lockup, header 88px with 70px lockup, footer 128px lockup | header-desktop.png, header-mobile.png, footer.png |
| all | anchors | scroll-margin tuned for the old 76px header | Low | raised to 108px for the 88px header | code |

Checks that found no issue on review: heading hierarchy and one H1 per page
(verifier), horizontal overflow 0 at 320/390/768/1440/2560, dashboard dial at
80 to 200 percent zoom, card grids on snapshot/audit/pricing, article
typography and line length on the white canvas, focus visibility, mobile
navigation, reduced-motion states, JS-disabled blog and booking fallbacks.

## Validation on the final build (real exit codes)

- npm ci: 0. next build: 0 (34 routes). verify-export: 0 (PASS, 33 pages).
- Playwright route suite: 0 (19 routes x 2 widths). Booking battery: 0.
- Design captures: 0. git diff --check: 0. Blog data check: 0 (16 posts).
- Lighthouse (gzip serving, production parity): home 96, book 97, pricing 97,
  blog 97, article 97, snapshot 97, audit 96, ai-visibility 96 performance;
  accessibility/best-practices/SEO 100 everywhere except /book/
  best-practices 79 (Calendly's own third-party cookies and browser-issue
  log entries; present only on /book/ by design).

Calendly-owned, outside site control: the event name "AI Visibility Audit
Call" and its description, the in-widget cookie consent banner, third-party
cookies, and the widget's internal scrolling behavior after a date is
chosen. The event rename remains a founder action inside Calendly.
