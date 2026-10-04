import type { Metadata } from 'next';
import { pageMetadata, OG } from '@/lib/seo';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalendlyEmbed from '@/components/CalendlyEmbed';
import { SITE } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Book Your AI Visibility Snapshot and Demo',
  description:
    'Book a complimentary AI Visibility Snapshot and live Signal Harbor portal demo. See how AI describes your company and how the managed program works.',
  path: '/book/',
  image: OG.book,
  imageAlt: 'Book a call with Signal Harbor',
});

const steps = [
  'Choose a time',
  'Tell us about your company and market',
  'Review your Snapshot and see the portal demo',
];

/**
 * Scheduling page: WebPage + BreadcrumbList only. The Snapshot offer itself
 * is described (with its Service schema) on /snapshot/; this page exists to
 * book the call, so it deliberately adds no second Service identity.
 */
const bookLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE.url}/book/#webpage`,
      name: 'Book Your AI Visibility Snapshot and Demo',
      url: `${SITE.url}/book/`,
      description:
        'Book a complimentary introductory call, AI Visibility Snapshot, and live portal demo.',
      isPartOf: { '@id': `${SITE.url}/#website` },
      breadcrumb: { '@id': `${SITE.url}/book/#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE.url}/book/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Book a Call', item: `${SITE.url}/book/` },
      ],
    },
  ],
};

export default function BookPage() {
  return (
    <>
      <Header />
      <main className="bg-canvas">
        <section className="hero-light relative overflow-hidden">
          <div className="container-x relative py-10 sm:py-14">
            <div className="mx-auto max-w-[46rem] text-center">
              <p className="eyebrow mb-4">Your company. Your next move.</p>
              <h1 className="mx-auto max-w-[17ch] text-[1.9rem] font-extrabold leading-[1.18] tracking-tight text-navy sm:max-w-none sm:text-4xl sm:leading-[1.16] lg:text-[2.6rem]">
                Your AI snapshot. Your portal demo.
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-navy/70 sm:text-lg">
                Choose a time for a complimentary AI Visibility Snapshot and
                live portal demo. See how AI describes and recommends your company,
                then explore how the platform and managed team turn the findings into work.
              </p>
            </div>

            <div className="mx-auto mt-9 max-w-3xl">
              <h2 className="sr-only">What happens next</h2>
              <ol className="grid gap-3 sm:grid-cols-3">
                {steps.map((s, i) => (
                  <li key={s} className="flex items-center gap-3.5 rounded-2xl border border-navy/[0.09] bg-raised p-4 text-left">
                    <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-[#0369A1]/10 font-sora text-sm font-bold text-[#0369A1]">{i + 1}</span>
                    <span className="text-sm font-medium leading-snug text-navy/80">{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mx-auto mt-7 max-w-4xl">
              <CalendlyEmbed />
            </div>

            <p className="mx-auto mt-7 max-w-3xl text-center text-[15px] leading-relaxed text-navy/80">
              On the call, we walk through your Snapshot and the client portal, discuss the
              initiative you want to focus on, and talk about whether the
              company pilot fits. The introductory call and AI Visibility
              Snapshot and live demo are complimentary. The company pilot and agency
              partnerships are separate paid engagements, and the pilot
              terms are published on the{' '}
              <Link href="/pricing" className="font-medium text-[#0369A1] underline decoration-[#0369A1]/40 underline-offset-2 hover:decoration-[#0369A1]">pricing page</Link>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookLd) }}
      />
    </>
  );
}
