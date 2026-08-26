import CTAButton from './CTAButton';
import { SITE, CTA } from '@/lib/site';

/**
 * Beacon backdrop: thin concentric harbor-light arcs with one soft beam that
 * sweeps twice on load and then rests (CSS-only; hidden entirely for
 * reduced-motion users, leaving the static arcs). Decorative, behind the
 * heading area, never behind body text width.
 */
function BeaconBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1200 520"
        preserveAspectRatio="xMidYMax slice"
        className="absolute left-1/2 top-0 h-full w-[1400px] -translate-x-1/2"
      >
        {/* Bathymetric arc contours radiating from the harbor point below the fold */}
        {[130, 210, 300, 400, 510, 630].map((r) => (
          <circle
            key={r}
            cx="600"
            cy="560"
            r={r}
            fill="none"
            stroke="#0A1628"
            strokeOpacity={r > 400 ? 0.05 : 0.08}
            strokeWidth="1"
            strokeDasharray={r % 2 === 0 ? undefined : '5 7'}
          />
        ))}
        {/* Coordinate ticks along the widest arc */}
        {Array.from({ length: 13 }, (_, i) => {
          const a = (Math.PI * (i + 1)) / 14;
          const x1 = 600 - Math.cos(a) * 630;
          const y1 = 560 - Math.sin(a) * 630;
          const x2 = 600 - Math.cos(a) * 614;
          const y2 = 560 - Math.sin(a) * 614;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0369A1" strokeOpacity="0.18" strokeWidth="1.2" />;
        })}
        {/* The beam: a soft cyan wedge sweeping from the same origin */}
        <g className="beacon-beam" style={{ transformBox: 'fill-box' }} opacity="0">
          <polygon points="600,560 380,-40 820,-40" fill="url(#beamGrad)" />
        </g>
        <defs>
          <linearGradient id="beamGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#00C2FF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/**
 * Concise, centered hero on the light harbor backdrop. One idea, two
 * actions, one clarification line.
 */
export default function Hero() {
  return (
    <section id="top" className="hero-light relative overflow-hidden">
      <BeaconBackdrop />
      <div className="container-x relative py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-5">AI Visibility Intelligence</p>
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-navy sm:text-[3.4rem]">
            See how AI recommends your company.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy/70 sm:text-xl sm:leading-relaxed">
            Signal Harbor tests the questions buyers ask AI, finds where your
            company is missing or misrepresented, and shows you what to improve.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" data-cta-zone="homepage-hero">
            <CTAButton href={SITE.bookingUrl} variant="primary">{CTA.primary}</CTAButton>
            <CTAButton href="#preview" variant="outline">See What We Measure</CTAButton>
          </div>
          <p className="mt-5 text-sm text-navy/60">
            Book a free introductory call and receive a complimentary AI Visibility Snapshot.
          </p>
        </div>
      </div>
    </section>
  );
}
