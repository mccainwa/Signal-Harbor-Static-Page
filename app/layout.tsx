import type { Metadata } from 'next';
import { Sora, DM_Sans } from 'next/font/google';
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
  title: 'Signal Harbor — AI Visibility Audit',
  description:
    'Signal Harbor audits how your business appears across AI answers, citations, competitor recommendations, and hallucinated claims — scored 0–100.',
  metadataBase: new URL('https://signalharborconsulting.com'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Signal Harbor — AI Visibility Audit',
    description:
      'See how ChatGPT, Perplexity, Gemini, Copilot, and Grok describe, cite, and recommend your business.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
