'use client';

import { useState } from 'react';
import Section, { SectionHeading } from './Section';

import { faqs } from '@/lib/faqs';

function Item({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-navy/10">
      <h3>
        <button type="button" className="flex w-full items-center justify-between gap-4 py-5 text-left" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span className="text-base font-semibold text-navy">{q}</span>
          <span className="flex-none text-blue" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={`transition-transform duration-200 ${open ? 'rotate-45' : ''}`}><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </span>
        </button>
      </h3>
      <div className={open ? 'block' : 'hidden'}>
        <p className="pb-5 text-[15px] leading-relaxed text-navy/70">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <Section tone="light" id="faq">
      <SectionHeading tone="light" eyebrow="FAQ" title="Questions, answered." />
      <div className="mt-8 max-w-3xl">
        {faqs.map((f, i) => (
          <Item key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
        ))}
      </div>
    </Section>
  );
}
