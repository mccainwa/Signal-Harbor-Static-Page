type Tone = 'navy' | 'navy-deep' | 'light' | 'ice';

type SectionProps = {
  children: React.ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
};

const tones: Record<Tone, string> = {
  navy: 'bg-navy text-off-white',
  'navy-deep': 'bg-navy-deep text-off-white',
  /* Light-first system: "light" is the white canvas, "ice" the pale blue band. */
  light: 'bg-white text-navy',
  ice: 'bg-ice text-navy',
};

/**
 * Page section wrapper: controls background tone and consistent vertical
 * rhythm. Light-first: white and pale blue carry most content; navy bands
 * are reserved for product visuals and selected feature sections.
 */
export default function Section({
  children,
  tone = 'navy',
  id,
  className = '',
}: SectionProps) {
  const dark = tone === 'navy' || tone === 'navy-deep';
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
  const darkTone = tone === 'navy' || tone === 'navy-deep';
  const muted = darkTone ? 'text-white/70' : 'text-navy/65';
  const heading = darkTone ? 'text-white' : 'text-navy';
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
