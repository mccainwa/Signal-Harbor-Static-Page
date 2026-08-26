import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CredibilityBand from '@/components/CredibilityBand';
import ProblemHome from '@/components/ProblemHome';
import HowItWorks from '@/components/HowItWorks';
import MeasurementPreview from '@/components/MeasurementPreview';
import EngagementPaths from '@/components/EngagementPaths';
import BlogPreview from '@/components/BlogPreview';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import Wave, { TONE } from '@/components/Wave';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CredibilityBand />
        <Wave top={TONE.light} bottom={TONE.ice} />
        <ProblemHome />
        <Wave top={TONE.ice} bottom={TONE.light} />
        <HowItWorks />
        <Wave top={TONE.light} bottom={TONE.navy} />
        <MeasurementPreview />
        <Wave top={TONE.navy} bottom={TONE.light} />
        <EngagementPaths />
        <Wave top={TONE.light} bottom={TONE.ice} />
        <BlogPreview />
        <Wave top={TONE.ice} bottom={TONE.light} />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
