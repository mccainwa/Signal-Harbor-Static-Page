# Website reuse record: October 3, 2026

The website reuses the existing portal's reviewed provider SVGs without changing their path data. They live in `public/images/providers/` and are used only to identify the eight audited answer platforms. Platform names remain beside their marks. Google AI Mode and Google AI Overviews share Google's mark. Claude uses Anthropic's mark, and Grok uses xAI's mark, matching the portal catalog.

The original portal provenance record follows. Its paths describe the source repository rather than this website.
# Provider marks

The portal shows the official mark of every AI platform Signal Harbor monitors (the
`ProviderCatalog` card, the answer-engine comparison charts on Insights and Results). The marks
are stored locally under `apps/portal/src/assets/providers/` and rendered inline from
`apps/portal/src/lib/providerMarks.ts`, which carries the unmodified path data of each file.
Nothing is hotlinked from a third-party host, so the marks load under the portal's own
content-security policy and are available offline.

## Sources

Retrieved 2026-09-15 from two reviewed icon packages that redistribute the platforms' own
monochrome marks. Path data is unmodified; only the SVG wrapper (`title`, `role`, inline sizing
attributes) was dropped when the paths were copied into the TypeScript module.

| Platform            | File             | Package                                  | Package source                               | Brand source recorded by the package                                                                               |
| ------------------- | ---------------- | ---------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Anthropic           | `anthropic.svg`  | `simple-icons@16.31.0` (CC0-1.0)         | https://github.com/simple-icons/simple-icons | https://www.anthropic.com                                                                                          |
| Gemini              | `gemini.svg`     | `simple-icons@16.31.0` (CC0-1.0)         | https://github.com/simple-icons/simple-icons | https://gemini.google.com                                                                                          |
| Google AI Mode      | `google.svg`     | `simple-icons@16.31.0` (CC0-1.0)         | https://github.com/simple-icons/simple-icons | https://partnermarketinghub.withgoogle.com · guidelines https://about.google/brand-resource-center/brand-elements/ |
| Google AI Overviews | `google.svg`     | shared with Google AI Mode               |                                              |                                                                                                                    |
| Meta AI             | `meta-ai.svg`    | `simple-icons@16.31.0` (CC0-1.0)         | https://github.com/simple-icons/simple-icons | https://www.meta.com · guidelines https://www.facebook.com/brand/resources/meta/company-brand                      |
| OpenAI              | `openai.svg`     | `@lobehub/icons-static-svg@1.95.0` (MIT) | https://github.com/lobehub/lobe-icons        | https://openai.com/brand                                                                                           |
| Perplexity          | `perplexity.svg` | `simple-icons@16.31.0` (CC0-1.0)         | https://github.com/simple-icons/simple-icons | https://www.perplexity.ai                                                                                          |
| xAI                 | `xai.svg`        | `@lobehub/icons-static-svg@1.95.0` (MIT) | https://github.com/lobehub/lobe-icons        | https://x.ai (the xAI brand page returned HTTP 403 on 2026-09-15, so the package copy is used)                     |

Notes:

- `simple-icons` no longer carries an OpenAI or xAI mark (trademark policy), so those two come
  from `@lobehub/icons-static-svg`. The lobehub `xai.svg` file is titled "Grok" inside the
  package but draws the xAI company mark; the Grok product mark is a different file.
- Google AI Mode and Google AI Overviews are Google products without a separate mark; both use
  the Google "G".
- Neither package is a runtime dependency. The files were copied once, reviewed, and committed.

## Usage rules applied in the portal

- Marks are drawn in `currentColor` (the portal's navy on light surfaces), never recoloured
  with brand colours, never rotated, stretched, or cropped; the original 24×24 viewBox and
  aspect ratio are preserved.
- Rendered at 20–24 px only, always with the platform's complete name written beside them.
- Decorative when the name is beside them (`aria-hidden`); when a mark stands alone it carries
  the platform name as its accessible name (`role="img"`).
- Visible in forced-colours and high-contrast modes because `currentColor` follows the system
  text colour.
- The marks identify the platforms Signal Harbor measures; they never imply endorsement by the
  platform owners.

The LobeHub MIT copyright and permission notice is included with the distributed marks in public/images/providers/lobehub-license.txt.
