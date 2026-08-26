import Link from 'next/link';

/**
 * The official Signal Harbor horizontal lockup: the emblem and the official
 * "SIGNAL HARBOR" wordmark, both extracted unmodified from the supplied
 * master artwork and composed side by side (no live text, no substitute
 * font). public/signal-harbor-lockup-horizontal.png, 671x128 with a real
 * alpha channel. Explicit width/height attributes pin the aspect ratio so
 * the responsive height classes cause no layout shift.
 */
const W = 671;
const H = 128;

export default function Logo({
  href = '/',
  className = 'h-10 w-auto sm:h-[46px]',
}: {
  href?: string;
  /** Tailwind height classes controlling the rendered size. */
  className?: string;
}) {
  return (
    <Link href={href} className="inline-flex flex-none items-center">
      <img
        src="/signal-harbor-lockup-horizontal.png"
        alt="Signal Harbor"
        width={W}
        height={H}
        className={`flex-none ${className}`}
      />
    </Link>
  );
}
