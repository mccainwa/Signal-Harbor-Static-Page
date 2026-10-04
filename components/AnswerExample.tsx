import { EXAMPLE } from '@/lib/portal-example';

const named = [
  { name: 'Competitor A', note: 'Named for multistate filing support' },
  { name: 'Competitor B', note: 'Named as a fit for manufacturers' },
];

/**
 * The familiar starting point, shown in the hero: a buyer asks an AI
 * assistant for options and the answer names competitors but not the
 * reader's company. Plain HTML text, readable at phone width, and labeled
 * as an illustrative example (no real answer, client, or tool output).
 */
export default function AnswerExample() {
  return (
    <figure className="relative mx-auto w-full max-w-[480px] lg:mx-0 lg:justify-self-end">
      <div className="rounded-2xl bg-raised p-5 text-navy shadow-[0_30px_60px_-34px_rgba(0,0,0,0.6)] sm:p-6">
        <p className="text-sm font-semibold text-navy/70">A buyer asks an AI assistant</p>
        <p className="mt-2 rounded-xl rounded-tl-sm bg-mist px-4 py-3 text-[15px] font-semibold leading-snug text-navy">
          &ldquo;{EXAMPLE.question}&rdquo;
        </p>

        <p className="mt-5 text-sm font-semibold text-navy/70">The answer</p>
        <ul className="mt-2 divide-y divide-navy/[0.08] rounded-xl border border-navy/[0.09] bg-white">
          {named.map((n) => (
            <li key={n.name} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
              <span className="text-[15px] font-semibold">{n.name}</span>
              <span className="text-sm text-navy/70 sm:text-right">{n.note}</span>
            </li>
          ))}
          <li className="flex items-center justify-between gap-3 bg-[#FDF3F3] px-4 py-3">
            <span className="text-[15px] font-semibold">Your company</span>
            <span className="status status-gap text-xs">Not mentioned</span>
          </li>
        </ul>
      </div>
    </figure>
  );
}
