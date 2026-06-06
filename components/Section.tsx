type Tone = 'navy' | 'navy-deep' | 'light';

type SectionProps = {
  children: React.ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
};

const tones: Record<Tone, string> = {
  navy: 'bg-navy text-off-white',
  'navy-deep': 'bg-navy-deep text-off-white',
  light: 'bg-off-white text-navy',
};

/**
 * Page section wrapper: controls background tone and consistent vertical
 * rhythm. Alternate tones down the page (dark = authority, light = readability).
 */
export default function Section({
  children,
  tone = 'navy',
  id,
  className = '',
}: SectionProps) {
  const dark = tone !== 'light';
  return (
    <section
      id={id}
      className={`relative overflow-hidden ${tones[tone]} py-20 sm:py-28 ${className}`}
    >
      {dark && (
        <>
          {/* Subtle brand atmosphere on dark sections (CSS-only, behind content). */}
          <div aria-hidden className="pointer-events-none absolute inset-0 signal-grid opacity-70" />
          <div aria-hidden className="glow-blue pointer-events-none absolute -top-24 right-[-6rem] h-72 w-72 opacity-60" />
        </>
      )}
      <div className="container-x relative">{children}</div>
    </section>
  );
}

/** Standard section heading block: eyebrow + title + optional intro. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = 'navy',
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: Tone;
  align?: 'left' | 'center';
}) {
  const muted = tone === 'light' ? 'text-navy/65' : 'text-white/70';
  const heading = tone === 'light' ? 'text-navy' : 'text-white';
  const alignment = align === 'center' ? 'mx-auto text-center' : '';
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${heading}`}>
        {title}
      </h2>
      {intro && <p className={`mt-4 text-lg leading-relaxed ${muted}`}>{intro}</p>}
    </div>
  );
}
