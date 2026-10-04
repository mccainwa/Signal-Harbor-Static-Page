import Link from 'next/link';
import Section, { SectionHeading } from './Section';

const AREAS = [
  { name: 'Insights', job: 'The evidence', text: 'The buyer questions tested, the answers recorded, the outcome for your company, competitors named, and sources cited.' },
  { name: 'Campaign', job: 'The work', text: 'The campaign plan, the prepared content with its version history, and your decision on each version.' },
  { name: 'Results', job: 'The progress', text: 'Work prepared, approved, and published, kept separate from the matched retest and the measures agreed for your program.' },
];

/**
 * Where measurement is delivered: the client portal, described positively.
 */
export default function MethodDelivery({ embedded = false }: { embedded?: boolean }) {
  return (
    <Section tone="light" id={embedded ? undefined : "deliverables"}>
      <SectionHeading
        tone="light"
        eyebrow="Where you see it"
        title="The evidence lives in your client portal."
        intro="Clients see the evidence, the work, and the progress in the portal, where every finding stays connected to the answers behind it."
      />
      <dl className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-3">
        {AREAS.map((a) => (
          <div key={a.name} className="border-t border-navy/15 pt-4">
            <dt>
              <span className="block text-sm font-semibold text-harbor">{a.job}</span>
              <span className="mt-0.5 block font-sora text-xl font-bold text-navy">{a.name}</span>
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-navy/80">{a.text}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 text-base">
        <Link href="/platform/" className="font-semibold text-harbor underline decoration-harbor/40 underline-offset-4 hover:decoration-harbor">
          Tour the client portal
        </Link>
      </p>
    </Section>
  );
}
