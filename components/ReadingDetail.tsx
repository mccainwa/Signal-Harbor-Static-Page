'use client';

import { useEffect, useRef } from 'react';

export default function ReadingDetail({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const reveal = () => { if (window.location.hash === '#' + id && ref.current) ref.current.open = true; };
    reveal();
    window.addEventListener('hashchange', reveal);
    return () => window.removeEventListener('hashchange', reveal);
  }, [id]);
  return <details ref={ref} id={id} className="reading-details">
    <summary><h2 className="font-sora text-inherit font-semibold">{title}</h2></summary>
    <div className="reading-detail-content">{children}</div>
  </details>;
}
