import Link from 'next/link';

type LogoProps = {
  /** Size of the square mark, in px. */
  size?: number;
  href?: string;
  showWordmark?: boolean;
};

/**
 * Brand lockup using the small cropped lighthouse mark (public/sh-mark.png) in
 * a clean white rounded square, with the typed "Signal Harbor" wordmark. Plain
 * <img> so it always displays in static export / GitHub Pages.
 */
export default function Logo({ size = 44, href = '/', showWordmark = true }: LogoProps) {
  return (
    <Link href={href} aria-label="Signal Harbor home" className="inline-flex items-center gap-3">
      <span
        className="inline-flex items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-white/15"
        style={{ width: size, height: size }}
      >
        {/* Decorative: the link's aria-label and the wordmark carry the name. */}
        <img src="/sh-mark.png" alt="" width={size} height={size} className="h-full w-full object-cover" />
      </span>
      {showWordmark && (
        <span className="font-sora text-xl font-bold tracking-tight text-white">Signal Harbor</span>
      )}
    </Link>
  );
}
