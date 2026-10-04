import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CredibilityBand from '@/components/CredibilityBand';
import GapTypes from '@/components/GapTypes';
import ThreePhases from '@/components/ThreePhases';
import PortalDemo from '@/components/PortalDemo';
import TeamBenefits from '@/components/TeamBenefits';
import OfferSummary from '@/components/OfferSummary';
import BlogPreview from '@/components/BlogPreview';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import Wave, { TONE } from '@/components/Wave';

/**
 * Homepage, kept to one purposeful pass: the outcome and an example, why
 * competitors get seen first, three phases of the work, one portal
 * demonstration, what changes for the team, the work and outcomes,
 * and the close. Depth lives on /platform/, /pricing/, /services/, and
 * /methodology/. Metadata for this route lives in app/layout.tsx so the RSS
 * alternate link stays in the head.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CredibilityBand />
        <Wave top={TONE.raised} bottom={TONE.ice} />
        <GapTypes />
        <Wave top={TONE.ice} bottom={TONE.light} />
        <ThreePhases />
        <Wave top={TONE.light} bottom={TONE.navy} />
        <PortalDemo />
        <Wave top={TONE.navy} bottom={TONE.light} />
        <TeamBenefits />
        <OfferSummary />
        <BlogPreview />
        <Wave top={TONE.ice} bottom={TONE.light} />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
