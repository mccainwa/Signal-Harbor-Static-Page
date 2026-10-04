import Link from 'next/link';
import Section from './Section';
import PilotTerms from './PilotTerms';
import { OFFER, SITE } from '@/lib/site';
import { PORTAL_AREAS } from '@/lib/portal-example';
import { faqGroups, type Faq, type FaqGroup, type FaqParagraph, type FaqRun } from '@/lib/faqs';

/**
 * The FAQ, grouped by topic. A server component: every question and answer
 * is in the initial HTML, and each one is a native <details> disclosure, so
 * it opens with a mouse, Enter, or Space without any script, and browser
 * find in page reaches closed answers.
 *
 * Each topic reads as one step of the sales conversation: a short answer and
 * a small factual visual on the left, the questions on the right, and a link
 * to the page that goes deeper. Topic headings are h2; the questions sit in
 * their summaries.
 */

const LINK = 'font-medium text-[#0369A1] underline decoration-[#0369A1]/40 underline-offset-2 hover:decoration-[#0369A1]';

function Run({ run }: { run: FaqRun }) {
  if (typeof run === 'string') return <>{run}</>;
  if (run.href.startsWith('/')) {
    return (
      <Link href={run.href} className={LINK}>
        {run.text}
      </Link>
    );
  }
  return (
    <a href={run.href} className={LINK}>
      {run.text}
    </a>
  );
}

function Paragraph({ p }: { p: FaqParagraph }) {
  if (typeof p === 'string') return <p>{p}</p>;
  return (
    <p>
      {p.map((run, i) => (
        <Run key={i} run={run} />
      ))}
    </p>
  );
}

function Item({ item, open = false }: { item: Faq; open?: boolean }) {
  return (
    <details id={item.id} open={open} className="group px-5 target:bg-[#F4FAFE] sm:px-6">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-5 rounded-lg py-5 text-left text-base font-semibold leading-snug text-navy transition-colors hover:text-[#0369A1] [&::-webkit-details-marker]:hidden">
        <span>{item.q}</span>
        <span
          aria-hidden="true"
          className="mt-px grid h-6 w-6 flex-none place-items-center rounded-full border border-[#CFE2EF] bg-white text-[#0369A1] group-open:rotate-45 motion-safe:transition-transform motion-safe:duration-200"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </summary>
      <div className="space-y-3 pb-6 text-[15px] leading-relaxed text-navy/70 sm:pr-11">
        {item.a.map((p, i) => (
          <Paragraph key={i} p={p} />
        ))}
      </div>
    </details>
  );
}

function AsideLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-wider text-navy/60">{children}</p>;
}

const ROLES = ['CMO or VP of Marketing', 'Product marketing', 'Content', 'SEO', 'Web', 'Marketing operations'];

const PATH: { label: string; value: string }[] = [
  { label: 'Introductory call', value: 'Free' },
  { label: 'AI Visibility Snapshot', value: 'Complimentary, with the call' },
  { label: OFFER.name, value: 'Paid, 90 day minimum' },
  { label: 'Agency partnerships', value: OFFER.agencyPrice },
];

const STAGES: { label: string; note: string }[] = [
  { label: 'Work prepared', note: 'Ready for your review' },
  { label: 'Approved', note: 'A specific version your team signed off' },
  { label: 'Published', note: 'Live, with its URL and date recorded' },
  { label: 'Measured', note: 'The measures agreed for your program' },
];

/** A small factual visual per topic. No metrics, no invented data. */
function Aside({ id }: { id: string }) {
  if (id === 'fit') {
    return (
      <div className="mt-7">
        <AsideLabel>Built for marketing teams that include</AsideLabel>
        <ul className="mt-3 flex flex-wrap gap-2">
          {ROLES.map((r) => (
            <li key={r} className="rounded-full border border-[#E3ECF3] bg-[#F7FAFC] px-3 py-1 text-[13px] font-medium text-navy/80">
              {r}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (id === 'program') {
    return (
      <div className="mt-7">
        <AsideLabel>The four areas of the client portal</AsideLabel>
        <ul className="surface mt-3 divide-y divide-[#E3ECF3]">
          {PORTAL_AREAS.map((a) => (
            <li key={a.name} className="flex items-baseline gap-3 px-4 py-2.5">
              <span className="w-[4.75rem] flex-none text-sm font-bold text-navy">{a.name}</span>
              <span className="text-[13px] leading-snug text-navy/70">{a.job}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (id === 'commitment') {
    return (
      <div className="mt-7">
        <AsideLabel>What is free and what is paid</AsideLabel>
        <dl className="surface mt-3 divide-y divide-[#E3ECF3]">
          {PATH.map((r) => (
            <div key={r.label} className="flex items-baseline justify-between gap-4 px-4 py-2.5">
              <dt className="text-sm font-semibold text-navy">{r.label}</dt>
              <dd className="text-right text-[13px] leading-snug text-navy/70">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }
  if (id === 'measurement') {
    return (
      <div className="mt-7">
        <AsideLabel>Four stages, reported separately in Results</AsideLabel>
        <ol className="surface mt-3 divide-y divide-[#E3ECF3]">
          {STAGES.map((s, i) => (
            <li key={s.label} className="flex items-start gap-3 px-4 py-2.5">
              <span
                aria-hidden="true"
                className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full border border-[#CFE2EF] bg-white font-sora text-[11px] font-bold text-[#0369A1]"
              >
                {i + 1}
              </span>
              <span>
                <span className="block text-sm font-semibold text-navy">{s.label}</span>
                <span className="block text-[13px] leading-snug text-navy/70">{s.note}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    );
  }
  return null;
}

/** The confirmed company pilot terms, shown above the pricing questions. */
function TermsPanel() {
  return (
    <div className="surface mb-6 p-5 sm:p-6">
      <p className="mb-4 font-sora text-base font-bold text-navy">{OFFER.name} terms</p>
      <PilotTerms showCosts={false} showRate={false} />
    </div>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Group({ group, index }: { group: FaqGroup; index: number }) {
  const titleId = `${group.id}-title`;
  return (
    <section
      id={group.id}
      aria-labelledby={titleId}
      className={`grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 ${
        index > 0 ? 'mt-16 border-t border-[#E3ECF3] pt-16 sm:mt-20 sm:pt-20' : ''
      }`}
    >
      <div>
        <p className="eyebrow flex items-center gap-3">
          <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <span aria-hidden="true" className="h-px w-6 bg-[#CFE2EF]" />
          {group.label}
        </p>
        <h2 id={titleId} className="mt-3 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
          {group.title}
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-navy/70">{group.summary}</p>
        <Aside id={group.id} />
        <Link
          href={group.more.href}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0369A1] underline decoration-[#0369A1]/30 underline-offset-4 hover:decoration-[#0369A1]"
        >
          {group.more.label}
          <Arrow />
        </Link>
      </div>
      <div>
        {group.id === 'commitment' && <TermsPanel />}
        <div className="divide-y divide-[#E3ECF3] rounded-2xl border border-[#E3ECF3] bg-white">
          {group.items.map((item, i) => (
            <Item key={item.id} item={item} open={index === 0 && i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Topic links for the page hero: jump straight to a group. */
export function FaqTopics() {
  return (
    <nav aria-label="FAQ topics" className="mt-7">
      <ul className="flex flex-wrap gap-2">
        {faqGroups.map((g) => (
          <li key={g.id}>
            <a
              href={`#${g.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#CFE2EF] bg-white/90 px-3.5 py-1.5 text-sm font-semibold text-navy transition-colors hover:border-[#0369A1]/60 hover:text-[#0369A1]"
            >
              {g.label}
              <span className="rounded-full bg-[#EFF6FB] px-1.5 text-xs font-semibold text-[#035A8A]">
                {g.items.length}
                <span className="sr-only"> questions</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function FAQ() {
  return (
    <Section tone="light" id="faq">
      {faqGroups.map((g, i) => (
        <Group key={g.id} group={g} index={i} />
      ))}
      <p className="mt-16 border-t border-[#E3ECF3] pt-8 text-[15px] leading-relaxed text-navy/70 sm:mt-20">
        Have a question that is not here? Bring it to the introductory call, or{' '}
        <a href={SITE.mailto} className={LINK}>
          email Signal Harbor
        </a>{' '}
        and we will answer it directly.
      </p>
    </Section>
  );
}
