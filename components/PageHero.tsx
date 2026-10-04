import CTAButton from './CTAButton';
import { SITE, CTA } from '@/lib/site';

type Action = { label: string; href: string };
export default function PageHero({ eyebrow, title, intro, children, secondary, primary = { label: CTA.primary, href: SITE.bookingUrl }, id, zone, tone = 'light' }: {
  eyebrow: string; title: string; intro: React.ReactNode; children?: React.ReactNode;
  secondary?: Action; primary?: Action | null; id?: string; zone?: string; tone?: 'light' | 'dark';
}) {
  const dark = tone === 'dark';
  return (
    <section id={id} className={`relative overflow-hidden ${dark ? 'hero-gradient' : 'hero-light'}`}>
      <svg aria-hidden="true" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
        {[120, 210, 310, 420, 550].map((r) => <circle key={r} cx="1080" cy="420" r={r} fill="none" stroke={dark ? '#00C2FF' : '#0369A1'} strokeOpacity={dark ? '0.12' : '0.08'} strokeWidth="1" />)}
      </svg>
      <div className="container-x relative pb-14 pt-12 sm:pb-16 sm:pt-16">
        <div className="max-w-3xl">
          <p className={`eyebrow ${dark ? '!text-blue' : ''}`}>{eyebrow}</p>
          <h1 className={`mt-4 text-[2.2rem] font-extrabold leading-[1.12] tracking-[-0.035em] sm:text-5xl ${dark ? 'text-white' : 'text-navy'}`}>{title}</h1>
          <div className={`mt-5 max-w-2xl text-lg leading-relaxed ${dark ? 'text-off-white/90' : 'text-navy/75'}`}>{intro}</div>
          {(primary || secondary) && <div className="mt-7 flex flex-col gap-3 sm:flex-row" data-cta-zone={zone}>
            {primary && <CTAButton href={primary.href}>{primary.label}</CTAButton>}
            {secondary && <CTAButton href={secondary.href} variant={dark ? 'secondary' : 'outline'}>{secondary.label}</CTAButton>}
          </div>}
        </div>
        {children}
      </div>
    </section>
  );
}
