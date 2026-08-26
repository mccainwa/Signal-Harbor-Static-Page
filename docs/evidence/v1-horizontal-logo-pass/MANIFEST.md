# Horizontal lockup, favicon redesign, infinite beacon, and visual review

Date: August 25, 2026. Branch `refresh/v1-seo-geo-aeo`, uncommitted tree on
`1912bf7`. Screenshots from the production static export.

## Horizontal lockup construction

Both components were extracted, unmodified, from the transparent official
master (`docs/brand/signal-harbor-lockup-master.png`, itself derived from the
supplied logo with the checkerboard removed):

- Emblem: alpha-bounded region above the wordmark gap (707x853).
- Wordmark: alpha-bounded region below the gap (956x79), the official
  "SIGNAL HARBOR" artwork, not live text and not a substitute font.
- Composition: emblem at full height, wordmark scaled to 34 percent of the
  lockup height and vertically centered, gap of 30 percent of the height.
  No redrawing, recoloring, or reinterpretation; original proportions of
  each component preserved.
- Master: `docs/brand/signal-harbor-lockup-horizontal-master.png`
  (2098x400). Site asset: `public/signal-harbor-lockup-horizontal.png`
  (671x128, real alpha, verified by the export verifier).

Header renders it at 46px tall (40px under 640px viewports) in an 80px
header; footer at 52px. Aspect ratio verified intact at 320, 390, 768,
1024, 1440, 1920, and 2560 (a 1024px flex-shrink squeeze was caught and
fixed with flex-none). Wordmark cap height in the header is roughly 15px,
clearly legible. Evidence: `header-320.png` … `header-2560.png`,
`footer-horizontal.png`, `horizontal-on-white/pale/navy.png`.

## Favicon redesign

Three candidates, all crops of the official artwork, rendered natively at
16/32/48 on light and dark tab simulations (`favicon-candidates.png`):

1. C1 full emblem, tight padding: at 16px the four ring passes collapse and
   the lighthouse is a sliver.
2. C2 lighthouse plus inner rings (72 percent window centered at 40 percent
   height): the tower is roughly a third larger; silhouette plus two ring
   passes stay readable at 16px. Selected.
3. C3 lantern focus (50 percent window): loses the lighthouse identity;
   reads as arcs over a dark shape.

Implemented: `app/favicon.ico` (16/32/48, transparent PNG entries, 6,727
bytes) and `app/icon.png` (512, same C2 crop so browsers that scale the PNG
show the same mark). `app/apple-icon.png` unchanged (full emblem on white,
Apple convention). Verified: direct HTTP 200 on /favicon.ico, alpha bytes,
fresh-profile rendering, light and dark tab simulation.

## Beacon animation

CSS only, transform and opacity: `beaconsweep` keyframes, 11s cycle,
`infinite`, 0.8s initial delay. Each cycle: fade-in and sweep left to right
for about 5s (0 to 45 percent), 1s fade-out, then about 5s fully dark pause;
the rotation resets during the invisible pause. Verified: computed
iteration-count `infinite`, movement still present during cycle five
(sampled opacities 0.90, 0, 0, 0, 0, 0.90 across 7.5s: sweep, pause, next
sweep), reduced-motion shows `animation: none` with the beam hidden and the
static arcs intact. Browsers throttle the CSS animation in background tabs.

## Visual review: implemented

1. /ai-visibility: "How an AI answer forms" three-stage flow (question
   forms, source kinds, three measurable outcomes) in crawlable HTML with
   decorative SVG arrows; mirrors the dashboard's Visibility, Accuracy,
   and Recommendation framing. (`answer-flow-desktop/mobile.png`)
2. /services: the seven identical cards now carry distinct icons from the
   existing icon set (radar, route, map, shield, scale, layers, monitor);
   the number moved to a quiet corner badge, raised to AA contrast after a
   Lighthouse catch. (`services-icons.png`)
3. 404: converted from the leftover navy layout to the light system
   (`404-light.png`).

## Visual review: rejected as decoration

- Homepage additions (already carries the dashboard, beacon, and band).
- Blog article ornamentation (reading canvas should stay clean).
- Pricing graphics (scannable card structure already works).
- Research-page source map (would imply relationships the references do
  not claim).
- About-page imagery (concise by design).
- Methodology/platform additions (already carry measurement visuals).
- FAQ restructuring (accordion is the right pattern).
- Booking-page decoration (scheduling page should stay minimal).

## Validation (exit codes)

npm build 0 · verify-export 0 (33 pages, includes horizontal-lockup and
alpha checks) · route suite 0 · booking battery 0 · design captures 0 ·
final checks 0 · git diff --check 0. Lighthouse: home 96, book 97, pricing
97, blog 97, article 96, snapshot 97, audit 97, ai-visibility 96, services
98 performance; accessibility, best practices, and SEO 100 everywhere
except /book/ best-practices 79 (Calendly third-party cookies, /book/ only).
