import type { Metadata } from 'next';
import { pageMetadata, OG } from '@/lib/seo';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAButton from '@/components/CTAButton';
import { SITE, CTA } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Contact Signal Harbor by email for general questions, or book a free introductory call that includes a complimentary AI Visibility Snapshot.',
  path: '/contact/',
  image: OG.company,
  imageAlt: 'Contact Signal Harbor',
});

/**
 * ContactPage structured data mirrors exactly what the page shows: the
 * contact email and the booking path. No phone, address, or hours are
 * claimed because none are published.
 */
const contactLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': `${SITE.url}/contact/#webpage`,
      name: 'Contact Signal Harbor',
      url: `${SITE.url}/contact/`,
      description:
        'Contact Signal Harbor by email, or book a free introductory call that includes a complimentary AI Visibility Snapshot.',
      isPartOf: { '@id': `${SITE.url}/#website` },
      breadcrumb: { '@id': `${SITE.url}/contact/#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE.url}/contact/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE.url}/contact/` },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="hero-light relative overflow-hidden">
          <div className="container-x relative py-16 sm:py-20">
            <div className="max-w-3xl">
              <p className="eyebrow mb-3">Contact</p>
              <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">Contact Signal Harbor.</h1>
              <p className="mt-5 text-lg leading-relaxed text-navy/70">
                Two ways to reach us, depending on what you need.
              </p>
            </div>
            <div className="mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
              <div className="card-light accent-top flex flex-col">
                <h2 className="text-lg font-bold text-navy">See where your company stands</h2>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-navy/65">
                  The fastest path. Book the free introductory call and receive
                  a complimentary AI Visibility Snapshot of how selected AI
                  platforms describe and recommend your company. Pricing
                  questions are also scoped on this call.
                </p>
                <div className="mt-5" data-cta-zone="contact-page">
                  <CTAButton href={SITE.bookingUrl} variant="primary">{CTA.primary}</CTAButton>
                </div>
              </div>
              <div className="card-light accent-top flex flex-col">
                <h2 className="text-lg font-bold text-navy">General questions</h2>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-navy/65">
                  For anything that is not a booking: press, partnerships, the
                  newsletter, corrections, or questions about how we work.
                  Email us and we will reply directly.
                </p>
                <p className="mt-5">
                  <a href={SITE.mailto} className="inline-flex items-center gap-2 text-base font-semibold text-[#0369A1] underline decoration-[#0369A1]/40 underline-offset-2 hover:decoration-[#0369A1]">
                    {SITE.email}
                  </a>
                </p>
              </div>
            </div>
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-navy/60">
              {CTA.boundary}
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }}
      />
    </>
  );
}
