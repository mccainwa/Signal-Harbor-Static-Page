import type { Metadata } from 'next';
import { pageMetadata, OG } from '@/lib/seo';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import AuditFindingToWork from '@/components/AuditFindingToWork';
import ReadingDetail from '@/components/ReadingDetail';
import FinalCTA from '@/components/FinalCTA';
import ProviderLogos from '@/components/ProviderLogos';
import Wave, { TONE } from '@/components/Wave';
import { SITE } from '@/lib/site';
export const metadata: Metadata = pageMetadata({
  title: 'AI Visibility Audit and Competitor Analysis',
  description: 'An eight-platform AI visibility audit of buyer questions, competitor visibility, citations, and accuracy, connected to a managed campaign in your client portal.',
  path: '/audit/', image: OG.audit, imageAlt: 'The Signal Harbor AI visibility audit',
});
const RECORDS = [
  ['Buyer questions', 'Category, comparison, alternative, and fit questions built around your products and audiences.'],
  ['Repeated answers', 'Multiple runs on selected AI platforms, with mentions and recommendations recorded separately.'],
  ['Competitor visibility', 'Who appears on the same questions, especially where your company is missing.'],
  ['Cited sources', 'Your pages, competitor content, review platforms, and other sources behind the answers.'],
  ['Answer accuracy', 'Claims about your company checked against the facts your team confirms.'],
];
const LIMITS = [
  'The findings cover the tested questions and selected platforms.',
  'Answers vary by model, wording, location, and time. Repeated testing helps reveal patterns.',
  'Excluded answers are documented and omitted from the measurement.',
  'The audit records answers and cited sources. It does not establish a model’s reasoning or guarantee an outcome.',
];
const COMPARISON = [
  ['Cost', 'Complimentary with an introductory call', 'Part of the company pilot'],
  ['Question set', 'A focused sample of buyer questions', 'Built for your priorities'],
  ['Delivery', 'Walked through on the call', 'In your client portal, with supporting evidence'],
  ['Purpose', 'Decide whether the program fits', 'Prioritize gaps and prepare work'],
];
const link = 'font-semibold text-harbor underline decoration-harbor/40 underline-offset-4 hover:decoration-harbor';
const SUMMARY = 'An AI visibility audit tests your buyer questions, compares competitor visibility, traces cited sources, and checks answer accuracy. Findings appear in the client portal and guide the campaign work.';
const serviceLd = { '@context': 'https://schema.org', '@type': 'Service', '@id': SITE.url + '/audit/#service', name: 'AI Visibility Audit', serviceType: 'AI visibility audit', description: SUMMARY, url: SITE.url + '/audit/', provider: { '@id': SITE.url + '/#organization' } };
export default function AuditPage() {
  return <><Header /><main>
    <PageHero eyebrow="AI visibility audit" title="Find the AI search gaps that matter to your buyers." intro={<p>{SUMMARY}</p>} secondary={{ label: 'How we measure', href: '/methodology/' }} zone="audit-hero" />
    <Wave top="#EDF7FC" bottom={TONE.light} />
    <section id="what-it-measures" className="soft-aura bg-canvas"><div className="container-x py-12 sm:py-14">
      <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-[2.35rem]">Know what the answer is built on.</h2>
      <p className="mt-4 text-base text-navy/80">Company pilot audits cover eight AI answer platforms.</p><div className="mt-5"><ProviderLogos /></div>
      <dl className="mt-8 grid gap-5 md:grid-cols-3">{RECORDS.map(([k, v], i) => <div key={k} className="border-t border-[#C9DFEC] pt-4"><span aria-hidden="true" className="text-xs font-semibold text-harbor">0{i + 1}</span><dt className="mt-2 text-lg font-bold text-navy">{k}</dt><dd className="mt-2 text-base leading-relaxed text-navy/75">{v}</dd></div>)}</dl>
    </div></section>
    <section id="finding-to-work" className="bg-mist"><div className="container-x py-12 sm:py-14">
      <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-[2.35rem]">An audit that leads to action.</h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-navy/75">Evidence sets the priority. Your product and audience shape the content. Your team reviews the work.</p>
      <div className="mt-8"><AuditFindingToWork /></div><p className="mt-6"><Link href="/services/" className={link}>See how the managed program runs</Link></p>
    </div></section>
    <section className="bg-canvas"><div className="container-x py-12 sm:py-14">
      <ReadingDetail id="snapshot-or-baseline" title="The Snapshot and your program baseline">
        <div className="p-6"><dl className="grid gap-5 md:grid-cols-2">{COMPARISON.map(([label, snap, base]) => <div key={label} className="rounded-xl bg-[#F1F8FC] p-5"><dt className="portal-kicker">{label}</dt><dd className="mt-3 text-sm leading-relaxed text-navy/80"><strong className="font-semibold text-navy">Snapshot:</strong> {snap}</dd><dd className="mt-2 text-sm leading-relaxed text-navy/80"><strong className="font-semibold text-navy">Program baseline:</strong> {base}</dd></div>)}</dl><p className="mt-5"><Link href="/pricing/" className={link}>See company pilot pricing</Link></p></div>
      </ReadingDetail>
      <ReadingDetail id="limits" title="Understanding the scope of the findings">
        <div className="p-6"><ul className="grid gap-4 text-base leading-relaxed text-navy/75 md:grid-cols-2">{LIMITS.map(l => <li key={l} className="flex gap-3"><span className="text-harbor" aria-hidden="true">•</span>{l}</li>)}</ul><p className="mt-5"><Link href="/methodology/" className={link}>Explore the measurement methodology</Link></p></div>
      </ReadingDetail>
    </div></section>
    <Wave top={TONE.light} bottom={TONE.light} /><FinalCTA />
  </main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} /></>;
}
