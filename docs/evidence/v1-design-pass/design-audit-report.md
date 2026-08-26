# Enterprise design and homepage clarity pass: audit report

Date: August 25, 2026. Branch `refresh/v1-seo-geo-aeo`, uncommitted working
tree on top of `1912bf7`. All evidence referenced below lives in this
directory. Baseline (pre-pass) captures are the `v1-shots` set from the blog
and pricing pass; final captures were re-taken from the validated static
export after every correction.

## Summary of the pass

* Homepage rebuilt into the eight-section narrative: concise hero,
  membership band, problem, three steps, interactive measurement preview,
  engagement paths, latest articles, final CTA.
* Hero copy replaced with the approved short copy. Hero chips, the second
  positioning line, and duplicate microcopy removed. The selected-platform
  qualification moved to the measurement-preview section footer.
* Dense Command Center hero graphic replaced by a dedicated interactive
  measurement preview with a rebuilt score dial.
* Enterprise header and footer with the transparent official mark.
* Membership credibility band (Loyola Ignite Lab, 1871) with official,
  locally stored logo assets and membership-accurate language, plus the
  matching About page block and Organization `memberOf` structured data.

## Issues found and corrected

| # | Issue | Route(s) | Severity | Correction | Evidence |
|---|-------|----------|----------|------------|----------|
| 1 | Header mark sat in a white tile because no transparent logo asset existed; looked accidental on the navy header and footer | all | High | Derived transparent dark-surface variant (`public/sh-mark-dark.png`, plus `sh-mark-light.png` for light surfaces) from the official 2816x1536 `SH_Lighthouse_Logo.png` by background unmixing; no redrawing, recoloring of the rings, or AI generation; geometry untouched. Header, footer, and mobile header now use it | `dropdown-platform.png`, `footer.png` |
| 2 | Homepage hero carried four text layers, three chips, and two microcopy lines competing with the H1 | / | High | Hero reduced to eyebrow, H1, one supporting sentence, two CTAs, one clarification line (approved copy, verbatim) | `home-desktop.png` |
| 3 | Old hero dashboard was eight dense panels; the score circle text stack sat off-center in its ring | / | High | Replaced by the measurement-preview section: one panel, rebuilt dial (SVG circle plus centered overlay), one trend chart, three selectable metrics, three supporting stats | `dashboard-visibility.png`, `dial-zoom200.png`, `dial-zoom80.png` |
| 4 | Homepage repeated the offer explanation in five places and had seven full sections of overlapping content | / | Medium | Sections consolidated to the mandated eight; deliverables list lives on /methodology and /platform, research references on /research, the old-vs-new search diagram retired (concept covered on /ai-visibility); sourced stats kept in the problem section | `home-desktop.png` |
| 5 | Header dropdowns were hover-only CSS: no keyboard or touch path, no aria-expanded, no Escape or outside-click closing | all | High | Rebuilt as disclosure-pattern menus: hover opens, click pins (hover-then-click no longer flickers closed), Enter/Space toggles, Escape and outside click close, focus-out closes, aria-expanded and aria-controls wired, hidden panels removed from tab order | `dropdown-*.png`, keyboard log in validation output |
| 6 | Hover-then-click race made a dropdown close the moment it was clicked (observed on the Company menu) | all | Medium | Open state tracks how it was opened (`hover` vs `click`); clicking a hover-opened menu pins it instead of toggling it shut | `dropdown-company.png` |
| 7 | Anchored sections (for example the hero's See What We Measure link to `#preview`) scrolled underneath the 76px sticky header | /, /services, /platform | Medium | Global `[id] { scroll-margin-top: 96px }` | manual check after fix |
| 8 | Chart svg initially carried `role="img"` with an aria-label while containing focusable data points, which hides the points from assistive tech | / | High | Removed the atomic role; added a visually hidden trend summary; every point keeps its own label and native tooltip | `dashboard-focus.png` |
| 9 | New dim text was below WCAG AA on dark surfaces (white/40 to white/50 small text, 35 to 45 percent svg axis labels) | /, footer on all routes | High | Raised to white/55 to white/62 equivalents across the problem-section note, footer membership lines and legal text, dashboard axis labels, stat labels, and blog-preview dates; Lighthouse accessibility 100 on all six audited pages | `lh/*.json` scores |
| 10 | One article title rendered as a long unbroken URL and caused a 4px horizontal overflow at 390px (found in the blog pass, fix carried here) | /blog/you-can-win… | Medium | `overflow-wrap: break-word` on article prose | zero overflow in validation run |
| 11 | Blog index Lighthouse performance was 78, below the 80 target: nine preloaded font files delayed the largest text paint by 4.5s on the throttled profile | /blog/ (worst), all | Medium | Trimmed font weights to those actually rendered (Sora 600/700/800, DM Sans 400/600/700; the two nav font-medium uses moved to semibold). Blog rose to 81; all six audited pages now score 80 or higher with 100/100/100 elsewhere | `lh/*.json` |
| 12 | Footer had a white-tile logo, four columns of undifferentiated links, and no membership presence | all | Medium | Rebuilt: transparent lockup, three labeled columns (Platform, Services, Company), contact email, membership lines, disclaimer preserved, slim bottom bar | `footer.png` |

## Checks that found no issue

* Horizontal overflow: 0px at 390, 768, 1440, and 2560 on the homepage and
  across all routes in the route sweep.
* Heading hierarchy: exactly one h1 per page (export verifier).
* Score dial: no clipping, centered text, aligned stroke at 80 to 200
  percent zoom, on mobile widths, and on Windows Chromium rendering
  (`dial-zoom200.png`, `dial-zoom80.png`).
* Reduced motion: entrance fade, chart draw-in, and score transition all
  disabled; full static state verified with reduced-motion emulation
  (band opacity 1, trend line fully drawn).
* No-JavaScript: blog index shows all 16 cards, every article fully
  readable; homepage dashboard renders its complete default state.
* Mobile nav: groups plus direct Pricing link, Escape closes, no overflow.
* Membership logos: official files fetched from luc.edu and 1871.com and
  stored locally (no hotlinking), rendered at native proportions on a light
  surface with no modification.
* Corner radii and shadows: cards use the shared `card-light`/`card-dark`
  system; the new sections reuse it rather than introducing new treatments.

## Validation results on the final build

* `npm ci`: clean.
* `next build`: 38 routes exported.
* `scripts/verify-export.mjs`: PASS, 32 pages, every guarantee (H1s, unique
  metadata, canonicals, JSON-LD parse, BlogPosting/H1 agreement, sitemap
  membership both directions, pricing no-price rules, dash and terminology
  bans, links, fragments, image alt and dimensions).
* Blog data validation: 16 posts, no issues, titles and descriptions unique.
* `git diff --check`: clean.
* Playwright: 18 routes at desktop and mobile, zero flags; JS-disabled pass
  on the blog index and all 16 articles.
* Lighthouse (static export, throttled mobile profile):
  home 83 / 100 / 100 / 100 · blog 81 / 100 / 100 / 100 ·
  pricing 80 / 100 / 100 / 100 · ai-visibility 81 / 100 / 100 / 100 ·
  snapshot 83 / 100 / 100 / 100 · audit 82 / 100 / 100 / 100
  (performance / accessibility / best practices / SEO).

Nothing in this pass was committed, pushed, merged, or deployed.
