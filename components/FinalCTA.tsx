import Link from 'next/link';
import CTAButton from './CTAButton';
import { SITE, CTA } from '@/lib/site';

/**
 * Closing CTA: a deep ocean-gradient panel on the light canvas (dark product
 * surface on light ground), with a soft harbor-light glow at the top edge.
 */
export default function FinalCTA() {
  return (
    <section id="contact" className="bg-white">
      <div className="container-x py-20 sm:py-24">
        <div className="ocean-cta relative overflow-hidden rounded-3xl border border-navy/15 px-6 py-14 text-center shadow-[0_36px_80px_-40px_rgba(6,35,57,0.7)] sm:px-12 sm:py-16">
          <div aria-hidden className="pointer-events-none absolute inset-0 signal-grid opacity-50" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Get a complimentary AI Visibility Snapshot.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/75">
              {CTA.supporting} On the call, we walk through it and agree whether
              a full audit is worth doing.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row" data-cta-zone="final-cta">
              <CTAButton href={SITE.bookingUrl} variant="primary">{CTA.primary}</CTAButton>
              <CTAButton href={SITE.mailto} variant="secondary">Email Signal Harbor</CTAButton>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-sm text-white/60">
              {CTA.boundary}{' '}
              <Link href="/snapshot" className="text-blue underline">See what the Snapshot includes</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
