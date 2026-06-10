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
  title: 'Signal Harbor | AI Visibility Intelligence & GEO Services',
  description:
    'Signal Harbor helps companies measure, verify, and improve how they appear across AI-generated answers, citations, source ecosystems, and modern buyer research workflows.',
  metadataBase: new URL('https://signalharborconsulting.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Signal Harbor — Make your company visible where buyers now ask',
    description:
      'AI visibility intelligence and GEO services. We measure how ChatGPT, Perplexity, Gemini, Copilot, and Grok describe, cite, compare, and recommend companies — then turn it into a practical action plan.',
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
