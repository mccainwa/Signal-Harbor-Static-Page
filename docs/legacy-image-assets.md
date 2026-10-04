# Image assets for Signal Harbor

Drop image files here with these exact filenames. Until a file exists, the site
shows a clean branded placeholder in that slot (gradient + icon + filename), so
the layout always looks intentional. No code changes are needed when you add them.

Do NOT use AI-generated images of people. Prefer real photography of
environments, hands-on-devices, workspaces, and product/dashboard mockups.

| File | Where it appears | Suggested subject | Recommended size |
|------|------------------|-------------------|------------------|
| `hero-workspace.jpg` | Hero supporting tile | Hands on a laptop/tablet reviewing results; clean desk/workspace | 640×400 |
| `usecase-law.jpg` | Use Cases — Personal Injury Law card | Law office / desk detail / city skyline (no posed portraits) | 800×440 |
| `usecase-construction.jpg` | Use Cases — Construction card | Jobsite detail, plans on a tablet, hard hat on table | 800×440 |
| `usecase-medical.jpg` | Use Cases — Medical & Dental card | Clean clinic/dental operatory environment detail | 800×440 |
| `audit-preview.jpg` | (optional) AuditPreview — can replace the styled report mockup | Screenshot-style report/dashboard on screen | 720×560 |
| `cta-report.jpg` | (optional) Final CTA — can replace the mini report visual | Report on a device / workspace tile | 480×360 |

## Notes
- Format: `.jpg` (or `.png`/`.webp` — if you change the extension, update the
  matching `src` path in the component).
- Image slots use `next/image` with `unoptimized`, so they export statically to
  GitHub Pages with no server.
- **basePath:** these paths are root-absolute (`/images/...`). If you deploy to a
  GitHub *project* page (`username.github.io/repo`), set `repoBasePath` in
  `next.config.mjs`; `next/image` will prefix it automatically. For a custom
  domain (signalharborconsulting.com) no change is needed.
- The header/footer brand mark uses `public/SH_Lighthouse_Logo.png` (already in place).
