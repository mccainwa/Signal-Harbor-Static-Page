import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';

export const metadata: Metadata = {
  title: 'FAQ | Signal Harbor',
  description: 'Common questions about AI visibility, GEO services, platforms tested, access, pricing, and what happens after a diagnostic.',
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
