import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import { faqs } from '@/lib/faqs';
import FinalCTA from '@/components/FinalCTA';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Common questions about AI visibility, the complimentary Snapshot, the paid audit, platforms tested, access, pricing, and what happens after the audit.',
  alternates: { canonical: '/faq/' },
};

/**
 * FAQPage structured data is generated from the same array the page renders,
 * so the schema can never disagree with the visible questions and answers.
 */
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE.url}/faq/#faq`,
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-navy">
          <div className="container-x pb-4 pt-16 sm:pt-20">
            <p className="eyebrow mb-3">FAQ</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Frequently asked questions.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              The complimentary Snapshot, the paid audit, platforms, access,
              pricing, and what happens next.
            </p>
          </div>
        </section>
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
