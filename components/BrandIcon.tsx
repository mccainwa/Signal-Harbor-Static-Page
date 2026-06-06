type BrandIconProps = {
  size?: number;
  className?: string;
};

/**
 * Inline lighthouse + signal-arc mark used for the compact header lockup.
 * Crisp at any size (unlike scaling down the full PNG lockup), navy tower with
 * electric-blue signal arcs. The full uploaded PNG logo is used in the footer.
 */
export default function BrandIcon({ size = 26, className = '' }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* signal arcs */}
      <path
        d="M30.5 15a9 9 0 0 0-13 0"
        stroke="#00C2FF"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M35 10.5a15.5 15.5 0 0 0-22 0"
        stroke="#00C2FF"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* lighthouse */}
      <g fill="#0A1628">
        <rect x="21.8" y="14.2" width="4.4" height="4.6" rx="0.9" />
        <path d="M20.6 19.2h6.8l.7 2.1h-8.2z" />
        <path d="M20.9 22.1h6.2l1.5 12.6h-9.2z" />
        <rect x="18.2" y="34.6" width="11.6" height="3" rx="1" />
      </g>
    </svg>
  );
}
