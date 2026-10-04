import Link from 'next/link';
import CTAButton from './CTAButton';
import { SITE, CTA } from '@/lib/site';

export default function FinalCTA() {
  return (
    <section id="contact" className="bg-canvas">
      <div className="container-x pb-16 pt-8 sm:pb-20">
        <div className="ocean-cta relative overflow-hidden rounded-[1.5rem] border border-harbor/30 px-6 py-12 text-center shadow-[0_28px_60px_-35px_rgba(10,22,40,0.65)] sm:px-10 sm:py-16">
          <svg aria-hidden="true" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">{[160, 250, 350, 470, 610].map(r => <circle key={r} cx="600" cy="510" r={r} fill="none" stroke="#00C2FF" strokeOpacity="0.12" />)}</svg>
          <div className="relative"><p className="eyebrow">Your next step</p><h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">Find out where AI leaves you out.</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-fog">See your AI Visibility Snapshot, explore the portal in a live demo, and discuss the next move for your team.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row" data-cta-zone="final-cta"><CTAButton href={SITE.bookingUrl}>{CTA.primary}<span aria-hidden="true" className="ml-3">→</span></CTAButton><CTAButton href={SITE.mailto} variant="secondary">Email Signal Harbor</CTAButton></div>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-fog">{CTA.boundary}{' '}<Link href="/snapshot" className="font-semibold text-blue underline underline-offset-2">See what the Snapshot includes</Link>.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
