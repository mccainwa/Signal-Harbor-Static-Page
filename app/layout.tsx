import type { Metadata } from 'next';
import { Sora, DM_Sans } from 'next/font/google';
import { SITE } from '@/lib/site';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Understand and Improve How AI Recommends Your Company | Signal Harbor',
    template: '%s | Signal Harbor',
  },
  description:
    'Signal Harbor tests the questions buyers ask AI platforms, identifies where your company is missing or misrepresented, and turns the findings into a clear plan.',
  metadataBase: new URL(SITE.url),
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    siteName: 'Signal Harbor',
    title: 'Understand and improve how AI recommends your company',
    description:
      'Signal Harbor tests the questions buyers ask AI platforms, identifies where your company is missing or misrepresented, and turns the findings into a clear plan.',
    url: '/',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Understand and improve how AI recommends your company',
    description:
      'Signal Harbor tests realistic buyer questions across AI platforms and turns the findings into a clear executive scorecard and plan.',
  },
};

/**
 * Sitewide structured data. Only facts that are visible on the site: the
 * organization, its logo, its contact email, and the site itself. No ratings,
 * reviews, customers, results, or locations are claimed.
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
        url: `${SITE.url}/signal-harbor-logo.png`,
      },
      description:
        'Signal Harbor tests the questions buyers ask AI platforms, measures how AI systems describe, compare, and recommend companies, and turns the findings into a clear executive scorecard and plan.',
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
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </body>
    </html>
  );
}
