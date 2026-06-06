'use client';

import { useState } from 'react';
import Section, { SectionHeading } from './Section';

const faqs = [
  {
    q: 'Is this just SEO?',
    a: 'No. SEO focuses on ranking in search results. Signal Harbor measures how AI systems retrieve, cite, summarize, and recommend your business inside generated answers. The two overlap, but they are not the same problem.',
  },
  {
    q: 'Which AI systems do you test?',
    a: 'We start with major answer surfaces such as ChatGPT, Perplexity, Gemini, Copilot, and Grok. The exact test set depends on your category, market, and where your customers are likely to search.',
  },
  {
    q: 'What is the score?',
    a: 'The AI Visibility Score is a 0–100 summary of how well your business appears, gets cited, competes for share of voice, and avoids inaccurate AI-generated claims.',
  },
  {
    q: 'How long does it take?',
    a: 'Timing depends on the category, market, and number of prompts tested. A focused initial audit is scoped to deliver clear findings and a prioritized plan without turning into a long consulting project.',
  },
  {
    q: 'What do I get?',
    a: 'You get the AI Visibility Score, metric breakdown, competitor visibility findings, citation review, hallucination flags, and a prioritized action plan.',
  },
  {
    q: 'Do you fix the issues or just report them?',
    a: 'The audit comes first so the problems are clear. Ongoing visibility improvement can be scoped separately after the audit.',
  },
  {
    q: 'What does it cost?',
    a: 'Early audits are scoped case-by-case based on the category, market, and number of AI systems tested. Most projects start as a one-time audit before any ongoing visibility work.',
  },
];

function Item({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-navy/10">
      <h3>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-4 py-5 text-left"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-base font-semibold text-navy">{q}</span>
          <span className="flex-none text-blue" aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className={`transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
            >
              <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      </h3>
      {/* Answer stays in the DOM for accessibility + SEO; visibility is toggled. */}
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
