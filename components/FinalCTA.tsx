import CTAButton from './CTAButton';
import { SITE } from '@/lib/site';

export default function FinalCTA() {
  return (
    <section id="contact" className="bg-navy">
      <div className="container-x py-20 sm:py-24">
        <div className="relative overflow-hidden rounded-3xl border border-blue/30 bg-gradient-to-br from-navy-panel to-navy-deep px-6 py-14 text-center sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{ background: 'radial-gradient(700px 240px at 50% 0%, rgba(0,194,255,0.18), transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Find out what AI says before buyers rely on it.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
              Book a diagnostic call to see where your company appears, where
              competitors show up, and what needs to be fixed.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <CTAButton href={SITE.bookingUrl} variant="primary">Book a Diagnostic Call</CTAButton>
              <CTAButton href={SITE.mailto} variant="secondary">Email Signal Harbor</CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
