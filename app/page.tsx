import Header from '@/components/Header';
import Hero from '@/components/Hero';
import RoiStats from '@/components/RoiStats';
import ProblemCompare from '@/components/ProblemCompare';
import ProductTour from '@/components/ProductTour';
import ServicesPreview from '@/components/ServicesPreview';
import OutcomesStack from '@/components/OutcomesStack';
import ResearchHome from '@/components/ResearchHome';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import Wave, { TONE } from '@/components/Wave';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <RoiStats />
        <Wave top={TONE.navyDeep} bottom={TONE.light} />
        <ProblemCompare />
        <Wave top={TONE.light} bottom={TONE.navyDeep} />
        <ProductTour />
        <Wave top={TONE.navyDeep} bottom={TONE.light} />
        <ServicesPreview />
        <Wave top={TONE.light} bottom={TONE.navy} />
        <OutcomesStack />
        <Wave top={TONE.navy} bottom={TONE.light} />
        <ResearchHome />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
