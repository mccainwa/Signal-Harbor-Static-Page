import type { Metadata } from 'next';
import { Sora, DM_Sans } from 'next/font/google';
import { SITE } from '@/lib/site';
import { GA_ID } from '@/lib/analytics';
import Analytics from '@/components/Analytics';
import './globals.css';

/* Only the weights the site actually renders, and display:optional so text
   never repaints late for the web font: preloaded self-hosted files load in
   time on normal connections, and very slow first visits keep the
   metric-adjusted system fallback instead of shifting the page. */
const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-sora',
  display: 'optional',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-dm-sans',
  display: 'optional',
});

/** Homepage description, reused for Open Graph and Twitter so they agree. */
const HOME_DESCRIPTION =
  'Managed AI visibility and GEO services for middle market and enterprise teams. Turn buyer discovery gaps into campaign plans, content, and measurable work.';

/* These defaults are the homepage's metadata: app/page.tsx sets none of its
   own, so the RSS alternate below stays in the homepage head. Every other
   route overrides title, description, canonical, and social tags through
   pageMetadata() in lib/seo.ts. */
export const metadata: Metadata = {
  title: {
    default: 'AI Visibility and Marketing Execution | Signal Harbor',
    template: '%s | Signal Harbor',
  },
  description: HOME_DESCRIPTION,
  metadataBase: new URL(SITE.url),
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': [{ url: '/feed.xml', title: 'Signal Harbor Blog' }] },
  },
  /* v=3 busts stale cached favicons in browsers that saw the earlier
     icons; the unversioned /favicon.ico path stays valid for compatibility. */
  icons: {
    icon: [
      { url: '/favicon.ico?v=3', sizes: 'any' },
      { url: '/icon.png?v=3', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico?v=3',
    apple: '/apple-icon.png?v=3',
  },
  openGraph: {
    siteName: 'Signal Harbor',
    title: 'AI search visibility and marketing execution',
    description: HOME_DESCRIPTION,
    url: '/',
    type: 'website',
    images: [{ url: '/og/og-default.png', width: 1200, height: 630, alt: 'Signal Harbor: AI search visibility and marketing execution' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI search visibility and marketing execution',
    description: HOME_DESCRIPTION,
    images: ['/og/og-default.png'],
  },
};

/**
 * Sitewide structured data. Only facts that are visible on the site: the
 * organization, its logo, its contact email, its memberships (shown on the
 * homepage credibility band, the About page, and the footer), and the site
 * itself. No ratings, reviews, customers, results, or locations are claimed.
 */
const organizationLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      url: `${SITE.url}/`,
      email: SITE.email,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.url}/signal-harbor-lockup.png`,
      },
      founder: SITE.founders.map((name) => ({ '@type': 'Person', name })),
      sameAs: [SITE.linkedin],
      memberOf: [
        {
          '@type': 'Organization',
          name: 'Ignite Lab, Loyola University Chicago',
          url: 'https://www.luc.edu/leadershiphub/centers/ignitelab/',
        },
        {
          '@type': 'Organization',
          name: '1871',
          url: 'https://1871.com/',
        },
      ],
      description:
        'Signal Harbor provides managed AI search visibility and marketing execution for middle market and enterprise companies. It finds where AI answers leave a company out or get it wrong, prepares campaigns and content for client review, and tracks publication and results in a client portal.',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      name: SITE.name,
      url: `${SITE.url}/`,
      publisher: { '@id': `${SITE.url}/#organization` },
      inLanguage: 'en',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} ${dmSans.variable}`}>
      <body>
        {/* GA4 bootstrap: defines a no-op gtag queue so event calls are
            always safe. gtag.js itself is loaded by <Analytics /> only on
            the production hostname (or an explicit test flag), so local
            development and automated runs send nothing. ID: G-24V8BNMLFZ */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};window.__SH_GA_ID='${GA_ID}';`,
          }}
        />
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </body>
    </html>
  );
}
