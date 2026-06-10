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

export function IconRadar({ className = '', size = 22 }: IconProps) {
  return (<svg {...base(size)} className={className}><path d="M12 12a8 8 0 1 0 5.6 2.3" /><path d="M12 12a4 4 0 1 0 2.8 1.2" /><path d="M12 12l7-4" /></svg>);
}
export function IconRoute({ className = '', size = 22 }: IconProps) {
  return (<svg {...base(size)} className={className}><circle cx="5" cy="6" r="2" /><circle cx="19" cy="18" r="2" /><path d="M7 6h6a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h.5" /></svg>);
}
export function IconMap({ className = '', size = 22 }: IconProps) {
  return (<svg {...base(size)} className={className}><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" /><path d="M9 4v14M15 6v14" /></svg>);
}
export function IconShield({ className = '', size = 22 }: IconProps) {
  return (<svg {...base(size)} className={className}><path d="M12 3l8 3v6c0 5-3.4 7.7-8 9-4.6-1.3-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></svg>);
}
export function IconClipboard({ className = '', size = 22 }: IconProps) {
  return (<svg {...base(size)} className={className}><rect x="6" y="4" width="12" height="17" rx="2" /><path d="M9 4h6v3H9z" /><path d="M9 12h6M9 16h4" /></svg>);
}
export function IconLayers({ className = '', size = 22 }: IconProps) {
  return (<svg {...base(size)} className={className}><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></svg>);
}
export function IconMonitor({ className = '', size = 22 }: IconProps) {
  return (<svg {...base(size)} className={className}><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M7 13l3-3 2 2 3-4M8 21h8M12 17v4" /></svg>);
}
export function IconCloud({ className = '', size = 22 }: IconProps) {
  return (<svg {...base(size)} className={className}><path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.4A3.5 3.5 0 0 1 17 18z" /></svg>);
}
export function IconBriefcase({ className = '', size = 22 }: IconProps) {
  return (<svg {...base(size)} className={className}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18" /></svg>);
}
export function IconScale({ className = '', size = 22 }: IconProps) {
  return (<svg {...base(size)} className={className}><path d="M12 3v18M6 21h12M5 7l-2 5a3 3 0 0 0 6 0L7 7M19 7l-2 5a3 3 0 0 0 6 0l-2-5M5 7l14-2" /></svg>);
}
export function IconPin({ className = '', size = 22 }: IconProps) {
  return (<svg {...base(size)} className={className}><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>);
}
export function IconBuilding({ className = '', size = 22 }: IconProps) {
  return (<svg {...base(size)} className={className}><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3" /></svg>);
}
export function IconSparkle({ className = '', size = 22 }: IconProps) {
  return (<svg {...base(size)} className={className}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" /></svg>);
}
export function IconWarning({ className = '', size = 22 }: IconProps) {
  return (<svg {...base(size)} className={className}><path d="M12 3l9 16H3z" /><path d="M12 10v4M12 17v.5" /></svg>);
}
export function IconRanking({ className = '', size = 22 }: IconProps) {
  return (<svg {...base(size)} className={className}><path d="M5 20V11M12 20V5M19 20v-6" /></svg>);
}
