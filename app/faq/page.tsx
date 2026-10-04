import type { Metadata } from 'next';
import { pageMetadata, OG } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import FAQ, { FaqTopics } from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import { faqs, answerText } from '@/lib/faqs';
import { SITE } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'AI Visibility Program FAQs',
  description:
    'Answers on fit, the 90 day commitment, who publishes the work, working with your current agency, how AI visibility is measured, and what results can show.',
  path: '/faq/',
  image: OG.company,
  imageAlt: 'Signal Harbor AI visibility program questions',
});

/**
 * FAQPage structured data is generated from the same list the page renders
 * (flattened from the topic groups), so the schema can never disagree with
 * the visible questions and answers. Inline links render on the page; the
 * schema carries the same words as plain text.
 */
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE.url}/faq/#faq`,
  url: `${SITE.url}/faq/`,
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: answerText(f.a) },
  })),
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="FAQ"
          title="Questions about working with Signal Harbor."
          intro={
            <>
              <p>
                Answers to the questions marketing leaders ask about AI visibility
                services: who the program is for, where the work happens, who
                publishes it, what it costs, and what results can and cannot show.
              </p>
              <p className="mt-3 text-base text-navy/65">
                Each topic starts with the short answer. Open any question for the
                detail.
              </p>
            </>
          }
          zone="faq-hero"
        >
          <FaqTopics />
        </PageHero>
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
