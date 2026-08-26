import type { Metadata } from 'next';
import { pageMetadata, OG } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalendlyEmbed from '@/components/CalendlyEmbed';
import { SITE } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Book an AI Visibility Call',
  description:
    'Schedule a free introductory call with Signal Harbor and receive a complimentary AI Visibility Snapshot of how selected AI platforms describe and recommend your company.',
  path: '/book/',
  image: OG.book,
  imageAlt: 'Book a call with Signal Harbor',
});

const steps = [
  'Choose a time',
  'Tell us about your company and market',
  'Review your complimentary Snapshot on the call',
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
      name: 'Book an AI Visibility Call',
      url: `${SITE.url}/book/`,
      description:
        'Schedule a free introductory call and receive a complimentary AI Visibility Snapshot.',
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
      <main className="bg-white">
        <section className="hero-light relative overflow-hidden">
          <div className="container-x relative py-10 sm:py-14">
            <div className="mx-auto max-w-[46rem] text-center">
              <p className="eyebrow mb-4">Scheduling</p>
              <h1 className="mx-auto max-w-[17ch] text-[1.9rem] font-extrabold leading-[1.18] tracking-tight text-navy sm:max-w-none sm:text-4xl sm:leading-[1.16] lg:text-[2.6rem]">
                Book Your Complimentary AI&nbsp;Visibility Snapshot
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-navy/70 sm:text-lg">
                Schedule a free introductory call and receive a complimentary
                preview of how selected AI platforms describe and recommend
                your company.
              </p>
            </div>

            <div className="mx-auto mt-9 max-w-3xl">
              <h2 className="sr-only">What happens next</h2>
              <ol className="grid gap-3 sm:grid-cols-3">
                {steps.map((s, i) => (
                  <li key={s} className="flex items-center gap-3.5 rounded-2xl border border-[#E0EAF2] bg-white p-4 text-left shadow-[0_10px_28px_-24px_rgba(10,22,40,0.4)]">
                    <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-[#0369A1]/10 font-sora text-sm font-bold text-[#0369A1]">{i + 1}</span>
                    <span className="text-sm font-medium leading-snug text-navy/80">{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mx-auto mt-7 max-w-4xl">
              <CalendlyEmbed />
            </div>

            <p className="mx-auto mt-7 max-w-3xl text-center text-sm leading-relaxed text-navy/65">
              The introductory call and AI Visibility Snapshot are
              complimentary. The comprehensive AI Visibility Audit,
              implementation support, optimization sprints, and ongoing
              monitoring are separate paid engagements.
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
