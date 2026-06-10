'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight count-up that runs once when scrolled into view. No library.
 * Respects prefers-reduced-motion (renders the final value immediately).
 */
export default function CountUp({
  to,
  suffix = '',
  duration = 1100,
  className = '',
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let start = 0;
    const ob = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        ob.disconnect();
        const tick = (t: number) => {
          if (!start) start = t;
          const p = Math.min((t - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(eased * to));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    ob.observe(el);
    return () => {
      ob.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
