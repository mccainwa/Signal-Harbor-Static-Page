import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import Problem from '@/components/Problem';
import DashboardSection from '@/components/DashboardSection';
import AuditFramework from '@/components/AuditFramework';
import UseCases from '@/components/UseCases';
import HowItWorks from '@/components/HowItWorks';
import About from '@/components/About';
import AuditPreview from '@/components/AuditPreview';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Problem />
        <DashboardSection />
        <AuditFramework />
        <UseCases />
        <HowItWorks />
        <About />
        <AuditPreview />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
