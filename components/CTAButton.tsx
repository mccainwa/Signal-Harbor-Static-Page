import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

const base =
  'inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none motion-safe:hover:-translate-y-0.5';

const variants: Record<Variant, string> = {
  primary:
    'bg-blue text-navy shadow-[0_8px_24px_-10px_rgba(0,194,255,0.7)] hover:bg-[#2bd2ff] hover:shadow-[0_14px_34px_-10px_rgba(0,194,255,0.85)]',
  /* secondary sits on dark surfaces; outline is its light-surface partner. */
  secondary: 'border border-white/30 bg-transparent text-white hover:border-blue/50 hover:bg-white/10',
  outline:
    'border border-navy/20 bg-white text-navy hover:border-[#0369A1]/60 hover:text-[#0369A1]',
  ghost: 'text-white hover:text-blue',
};

/**
 * Reusable CTA. Renders a real anchor so it works with static export.
 * - http(s) links (e.g. the Calendly booking URL) open in a new tab.
 * - mailto/tel links open normally.
 * - internal hash/route links use next/link.
 */
export default function CTAButton({
  href,
  children,
  variant = 'primary',
  className = '',
}: CTAButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const isHttp = /^https?:/.test(href);
  const isMailtoOrTel = /^(mailto:|tel:)/.test(href);

  if (isHttp) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  if (isMailtoOrTel) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
