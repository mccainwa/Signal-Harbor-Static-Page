import Link from 'next/link';
import PortalTour from './PortalTour';

export default function PortalDemo() {
  return (
    <section id="preview" className="portal-band relative overflow-hidden">
      <div className="container-x relative py-12 sm:py-16">
        <div className="mb-9 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">The client portal</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-[2.35rem] sm:leading-[1.15]">One portal.<br className="hidden sm:block" /> The whole program in view.</h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-fog">See the evidence, review prepared content, and follow results with your team.</p>
          </div>
          <Link href="/platform" className="inline-flex min-h-[44px] items-center gap-3 text-[15px] font-semibold text-blue underline-offset-4 hover:underline">Explore the platform <span aria-hidden="true">→</span></Link>
        </div>
        <div className="relative">
          <div aria-hidden="true" className="portal-halo" />
          <PortalTour idPrefix="home-portal" headingLevel={3} initialArea={1} />
        </div>
      </div>
    </section>
  );
}
