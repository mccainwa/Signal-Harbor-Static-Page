import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata, OG } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import PortalTour from '@/components/PortalTour';
import FinalCTA from '@/components/FinalCTA';
import DiscoveryConnections from '@/components/DiscoveryConnections';
import Wave, { TONE } from '@/components/Wave';

export const metadata: Metadata = pageMetadata({
  title: 'AI Visibility Platform and Client Portal',
  description:
    'A managed AI visibility platform with Signal Harbor AI, agent connections, Google Analytics, Search Console, content approvals, and connected attribution.',
  path: '/platform/',
  image: OG.platform,
  imageAlt: 'The Signal Harbor client portal',
});

const link = 'font-semibold text-harbor underline decoration-harbor/40 underline-offset-4 hover:decoration-harbor';

/**
 * /platform/: shows the client portal first, then explains review,
 * publication, and measurement briefly. The portal is the delivery model of
 * a managed program, so the page describes what clients see and do rather
 * than listing software features. `#dashboard` stays on the tour because
 * the navigation and older links use it; `#measure` stays on measurement.
 */
export default function PlatformPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          tone="dark"
          id="dashboard"
          eyebrow="Client portal"
          title="See the evidence, review the work, follow the results."
          intro={
            <p>
              Your AI visibility and execution platform, operated by Signal Harbor. Explore buyer
              questions, use Signal Harbor AI, connect your agents and analytics, and review prepared content in one workspace.
            </p>
          }
          primary={null}
        >
          <div className="mt-10">
            <PortalTour idPrefix="platform" headingLevel={2} />
          </div>
        </PageHero>
        <Wave top="#07314a" bottom={TONE.light} />

        <DiscoveryConnections idPrefix="platform" />

        <section id="review" className="bg-canvas">
          <div className="container-x grid grid-cols-1 gap-10 py-14 sm:py-16 lg:grid-cols-2 lg:gap-14">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-navy">Your team controls approval.</h2>
              <p className="mt-4 text-lg leading-relaxed text-navy/80">
                Prepared content arrives with its version history and comments. Marketing, product,
                and legal reviewers can confirm facts, request changes, and approve the exact text.
              </p>
              <p className="mt-5 text-base leading-relaxed text-navy/80">
                Requested changes come back as a new version, so approval always applies to the
                exact text that will go live.
              </p>
            </div>
            <div id="publication">
              <h2 className="text-3xl font-bold tracking-tight text-navy">Follow the work through publication.</h2>
              <p className="mt-4 text-lg leading-relaxed text-navy/80">
                The agreed owner publishes the approved version. Its live URL and publication date
                stay recorded in the portal, separately from approval.
              </p>
            </div>
          </div>
        </section>

        <section id="measure" className="bg-mist">
          <div className="container-x grid grid-cols-1 gap-8 py-14 sm:py-16 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-navy">Understand progress and impact.</h2>
              <p className="mt-4 text-lg leading-relaxed text-navy/80">
                Track AI visibility alongside organic discovery, identified AI referrals, and conversion
                events from your connected analytics. Compare matched retests with the baseline,
                then use the connected evidence to estimate impact and guide the next campaign.
              </p>
            </div>
            <div className="text-base leading-relaxed text-navy/85">
              <p>
                Google Analytics 4 connects traffic sources and landing pages with tracked conversions.
                Search Console adds organic query and page performance. Results brings those views
                together with your AI answer evidence, remeasurement, campaign history, and impact estimates.
              </p>
              <p className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
                <Link href="/methodology" className={link}>How we measure AI visibility</Link>
                <Link href="/pricing" className={link}>See company pilot pricing</Link>
              </p>
            </div>
          </div>
        </section>
        <Wave top={TONE.ice} bottom={TONE.light} />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
