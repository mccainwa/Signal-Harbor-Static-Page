import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MeasureShowcase from '@/components/MeasureShowcase';
import ProductTour from '@/components/ProductTour';
import Deliverables from '@/components/Deliverables';
import CTAButton from '@/components/CTAButton';
import { SITE, CTA } from '@/lib/site';

export const metadata: Metadata = {
  title: 'What We Measure',
  description:
    'The Signal Harbor intelligence layer: visibility scoring, competitor tracking, source mapping, accuracy review, and an action roadmap.',
  alternates: { canonical: '/platform/' },
};

export default function PlatformPage() {
  return (
    <>
      <Header />
      <main className="bg-navy">
        <section id="dashboard" className="hero-gradient relative scroll-mt-20 overflow-hidden border-b border-white/10">
          <div aria-hidden className="pointer-events-none absolute inset-0 signal-grid opacity-70" />
          <div className="container-x relative py-16 sm:py-20">
            <div className="max-w-3xl">
              <p className="eyebrow mb-3">Platform</p>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">What Signal Harbor measures.</h1>
              <p className="mt-5 text-lg leading-relaxed text-white/75">
                One connected intelligence layer: visibility scoring, AI
                recommendation tracking, source mapping, and accuracy review,
                from the prompts we test to the actions you take.
              </p>
              <div className="mt-7"><CTAButton href={SITE.bookingUrl} variant="primary">{CTA.primary}</CTAButton></div>
            </div>
          </div>
        </section>
        <MeasureShowcase />
        <ProductTour />
        <Deliverables />
      </main>
      <Footer />
    </>
  );
}
