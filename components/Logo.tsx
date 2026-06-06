import Image from 'next/image';
import Link from 'next/link';

type LogoProps = {
  /** Size of the square logo mark, in px. */
  size?: number;
  href?: string;
  /** Show the typed "Signal Harbor" wordmark beside the mark. */
  showWordmark?: boolean;
};

/**
 * Brand lockup using the actual lighthouse logo (public/SH_Lighthouse_Logo.png,
 * no text in the file) inside a clean white rounded container, with the typed
 * "Signal Harbor" wordmark beside it. object-cover crops the image's white
 * margins so the lighthouse mark fills the square without distortion.
 */
export default function Logo({ size = 56, href = '/', showWordmark = true }: LogoProps) {
  return (
    <Link href={href} aria-label="Signal Harbor — home" className="inline-flex items-center gap-3">
      <span
        className="relative inline-block overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-white/10"
        style={{ width: size, height: size }}
      >
        <Image
          src="/SH_Lighthouse_Logo.png"
          alt="Signal Harbor"
          fill
          unoptimized
          sizes="56px"
          className="object-cover"
          priority
        />
      </span>
      {showWordmark && (
        <span className="font-sora text-xl font-bold tracking-tight text-white">
          Signal Harbor
        </span>
      )}
    </Link>
  );
}
