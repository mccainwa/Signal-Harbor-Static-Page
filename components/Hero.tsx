import Image from 'next/image';
import CTAButton from './CTAButton';
import DashboardTeaser from './DashboardTeaser';
import { SITE } from '@/lib/site';

/**
 * Hero. Left: headline, copy, CTAs. Right: a clean vertical visual stack —
 * a real workspace image card on top with ONE tasteful metric badge, and the
 * compact AI Visibility Score card below. No overlapping/colliding elements.
 */
export default function Hero() {
  return (
    <section id="book-audit" className="hero-gradient relative overflow-hidden border-b border-white/10">
      <div aria-hidden className="pointer-events-none absolute inset-0 signal-grid opacity-70" />
      <div className="container-x relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow mb-4">AI Visibility Intelligence</p>
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
            When people ask AI which business to use, are you in the answer?
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Signal Harbor shows whether AI systems recommend your business, cite
            the right sources, mention competitors instead, or get important
            details wrong — then turns it into a clear 0–100 visibility score.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton href={SITE.bookingUrl} variant="primary">
              Book an Audit
            </CTAButton>
            <CTAButton href="#audit-framework" variant="secondary">
              See What We Test
            </CTAButton>
          </div>

          <p className="mt-6 text-sm text-white/55">
            One-time audit · 0–100 AI Visibility Score · Tests ChatGPT,
            Perplexity, Gemini, Copilot &amp; Grok
          </p>
        </div>

        {/* Clean two-card stack: image card on top, score card below. */}
        <div className="relative mx-auto w-full max-w-md space-y-5 lg:max-w-none">
          <div aria-hidden className="glow-blue pointer-events-none absolute -right-10 top-10 h-64 w-64 opacity-70" />
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/12 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]">
            <Image
              src="/images/hero-workspace.png"
              alt="Team reviewing analytics in a modern office"
              fill
              unoptimized
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-navy/80 px-3 py-2 shadow-card backdrop-blur">
              <span className="text-blue">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 18l6-6 4 4 6-7" /><path d="M16 9h4v4" /></svg>
              </span>
              <span className="text-xs font-semibold text-white">Mention Rate ▲ 64%</span>
            </div>
          </div>

          <DashboardTeaser />
        </div>
      </div>
    </section>
  );
}
