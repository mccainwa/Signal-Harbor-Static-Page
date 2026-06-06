type IconProps = { className?: string; size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
});

/** Search / prompt-testing */
export function IconPrompt({ className = '', size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 5h16v10H7l-3 3z" />
      <path d="M8 9h6M8 12h4" />
    </svg>
  );
}

/** Score / gauge */
export function IconScore({ className = '', size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 14a8 8 0 0 1 16 0" />
      <path d="M12 14l4-3" />
      <circle cx="12" cy="14" r="1.2" />
    </svg>
  );
}

/** Action plan / checklist */
export function IconPlan({ className = '', size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5 4h14v16H5z" />
      <path d="M8.5 9l1.5 1.5L13 7.5M8.5 15l1.5 1.5L13 13.5M16 9h0M16 15h0" />
    </svg>
  );
}

/** Shift: links to answers */
export function IconShift({ className = '', size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 8h7M3 12h5M3 16h7" />
      <path d="M14 7l4 5-4 5" />
      <path d="M18 12h3" />
    </svg>
  );
}

/** Ranking / competitors */
export function IconRanking({ className = '', size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5 20V10M12 20V5M19 20v-7" />
    </svg>
  );
}

/** Warning / hallucination */
export function IconWarning({ className = '', size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3l9 16H3z" />
      <path d="M12 10v4M12 17v.5" />
    </svg>
  );
}
