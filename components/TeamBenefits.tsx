import Link from 'next/link';
import { OFFER } from '@/lib/site';

const benefits = [
  {
    title: 'Know what to address.',
    body: 'See which buyer questions leave you out and why, with the answers and sources behind each gap.',
    icon: <path d="M11 4a7 7 0 1 0 4.9 12l4.1 4.1M8 11h6M11 8v6" />,
  },
  {
    title: 'Get the work prepared.',
    body: 'Receive campaign plans and content ready for your review, not a list of recommendations to staff yourself.',
    icon: <path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h4" />,
  },
  {
    title: 'Keep progress visible.',
    body: 'Everyone can see what is in review, approved, published, and measured, without chasing updates.',
    icon: <path d="M4 19h16M7 16V9M12 16V5M17 16v-4" />,
  },
];

/**
 * What changes for the client team, in three plain benefits, followed by a
 * one-line fit statement and the agency route. No workflow or
 * responsibility grid here; those live on the services page.
 */
export default function TeamBenefits() {
  return (
    <section id="benefits" className="bg-canvas">
      <div className="container-x py-12 sm:py-16">
        <p className="eyebrow mb-3">Built for your team</p>
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-navy sm:text-[2.35rem] sm:leading-[1.15]">
          What changes for your marketing team.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy/80">Connect AI search visibility to your lead generation strategy. Help buyers discover your company, understand your offer, and consider you before the sales conversation.</p>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {benefits.map((b) => (
            <li key={b.title} className="rounded-xl border border-harbor/10 bg-white/65 p-6">
              <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-xl border border-harbor/15 bg-[#E0F4FD] text-harbor">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {b.icon}
                </svg>
              </span>
              <h3 className="mt-4 text-xl font-bold text-navy">{b.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-navy/80">{b.body}</p>
            </li>
          ))}
        </ul>
        <div id="fit" className="mt-12 grid gap-4 border-t border-navy/15 pt-8 md:grid-cols-[1.4fr_1fr] md:gap-10">
          <p className="text-base leading-relaxed text-navy/80">
            <strong className="font-semibold text-navy">Built for middle market and enterprise companies.</strong>{' '}
            Signal Harbor works alongside your SEO, web, and content partners, and your agency can keep
            the work it already owns.
          </p>
          <p className="text-base leading-relaxed text-navy/80">
            <strong className="font-semibold text-navy">Agencies serving several clients:</strong>{' '}
            {OFFER.agencyPrice.toLowerCase()}.{' '}
            <Link href="/pricing#agencies" className="font-semibold text-harbor underline decoration-harbor/40 underline-offset-4 hover:decoration-harbor">
              How agency pricing works
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
