/**
 * Curved transition between two sections. `top` is the color of the section
 * above, `bottom` the color of the section below — the wave bends from one into
 * the other. Static, decorative, no layout shift.
 */
export default function Wave({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div aria-hidden className="relative h-10 w-full sm:h-14" style={{ background: top }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M0,80 C400,0 1040,0 1440,80 L1440,80 L0,80 Z" fill={bottom} />
      </svg>
    </div>
  );
}

export const TONE = {
  navy: '#0A1628',
  navyDeep: '#060E1A',
  light: '#F5F7FA',
};
