'use client';

import { useState } from 'react';
import Section, { SectionHeading } from './Section';

const faqs = [
  {
    q: 'Is this SEO?',
    a: 'It overlaps with SEO, but it is broader. SEO focuses on search performance. Signal Harbor focuses on AI answer visibility, source influence, and brand accuracy across AI-mediated research. SEO is expanding into AI visibility, answer engines, and citation ecosystems.',
  },
  {
    q: 'What platforms do you test?',
    a: 'We currently run structured prompt testing across ChatGPT, Claude, Perplexity, Gemini, Copilot, and Grok. The exact set depends on your category, market, and where your buyers are likely to research.',
  },
  {
    q: 'Can you guarantee that AI tools recommend us?',
    a: 'No, and no credible provider should. We measure and improve the signals that make accurate inclusion more likely. AI visibility is measurable and influenceable, not fully controllable.',
  },
  {
    q: 'Do we need to give admin access?',
    a: 'No. Most pilots can start with documents, exports, public pages, and current reports. Read-only access can be added later if it is useful.',
  },
  {
    q: 'How is this different from a screenshot audit?',
    a: 'A screenshot is a single moment in time. We use structured prompt sets, repeated measurements, source classification, claim review, and action planning — because AI systems are probabilistic and change over time.',
  },
  {
    q: 'Can you work with our existing agency?',
    a: 'Yes. Signal Harbor can supplement internal teams, collaborate with agencies, or provide independent vendor accountability that compares current work against AI visibility needs.',
  },
  {
    q: 'What happens after the diagnostic?',
    a: 'You receive a prioritized roadmap and can choose advisory support, co-managed implementation, full-service optimization, or ongoing monitoring.',
  },
  {
    q: 'What does pricing depend on?',
    a: 'Pricing depends on prompt volume, the number of engines tested, reporting depth, implementation scope, and whether ongoing monitoring is included. We scope it on a diagnostic call.',
  },
  {
    q: 'Who is this best for?',
    a: 'Companies whose buyers run comparison-heavy research before contacting sales — B2B SaaS, professional services, compliance-heavy industries, multi-location service businesses, enterprise brands with agencies, and high-consideration consumer brands.',
  },
];

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
