import { OFFER } from '@/lib/site';

/**
 * The confirmed company pilot terms, shown together and kept visually
 * distinct: the monthly rate, the 90 day minimum, and the six month full
 * pilot are separate facts. The summary sentence states that six months is
 * the full pilot, not the minimum commitment. Shared so the wording never
 * drifts between pages.
 */
export default function PilotTerms({
  showCosts = true,
  showRate = true,
}: {
  showCosts?: boolean;
  /** Hide the rate cell where the large price is already shown above. */
  showRate?: boolean;
}) {
  const terms = [
    ...(showRate ? [{ label: OFFER.rateLabel, value: OFFER.price, note: 'Per month, the same rate throughout' }] : []),
    {
      label: 'Minimum commitment',
      value: '90 days',
      note: showCosts ? `${OFFER.firstTerm} across the first three months` : 'Stop or continue after day 90',
    },
    {
      label: 'Full pilot',
      value: 'Six months',
      note: showCosts ? `${OFFER.fullPilot} if you complete all six months` : 'At the same monthly rate',
    },
  ];
  return (
    <div>
      <dl className={`grid gap-3 ${terms.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
        {terms.map((t) => (
          <div key={t.label} className="rounded-xl border border-navy/10 bg-white px-4 py-3.5">
            <dt className="text-sm font-semibold text-navy/70">{t.label}</dt>
            <dd className="mt-0.5 font-sora text-xl font-bold text-navy">{t.value}</dd>
            <dd className="mt-1 text-sm leading-snug text-navy/75">{t.note}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-base leading-relaxed text-navy/80">
        {OFFER.minimum} within a {OFFER.pilot.toLowerCase()}. After 90 days, continue at the same monthly rate or stop.
      </p>
    </div>
  );
}
