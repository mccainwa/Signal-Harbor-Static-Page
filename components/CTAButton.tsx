import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

const base =
  'harbor-button inline-flex min-h-[44px] items-center justify-center rounded-xl px-6 py-3 text-[15px] font-semibold focus-visible:outline-none';

const variants: Record<Variant, string> = {
  primary:
    'harbor-button-primary border border-[#008FBD] bg-blue text-navy shadow-[0_8px_22px_-12px_rgba(0,194,255,0.7),inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#2bd2ff]',
  /* secondary sits on dark surfaces; outline is its light-surface partner. */
  secondary: 'border border-white/35 bg-transparent text-white hover:border-blue/60 hover:bg-white/10',
  outline:
    'border border-navy/25 bg-raised text-navy hover:border-harbor/60 hover:text-harbor',
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
        <span className="harbor-button-label">{children}</span>
      </a>
    );
  }

  if (isMailtoOrTel) {
    return (
      <a href={href} className={cls}>
        <span className="harbor-button-label">{children}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      <span className="harbor-button-label">{children}</span>
    </Link>
  );
}
