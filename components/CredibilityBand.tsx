const memberships = [
  {
    org: 'Loyola University Chicago',
    label: 'Member of Loyola University Chicago’s Ignite Lab',
    href: 'https://www.luc.edu/leadershiphub/centers/ignitelab/',
    img: '/images/memberships/loyola-university-chicago.svg',
    alt: 'Loyola University Chicago',
    /* Official SVG is a wide lockup (192.78 x 41.36). */
    width: 187,
    height: 40,
    rise: 'rise-2',
  },
  {
    org: '1871',
    label: 'Member of 1871',
    href: 'https://1871.com/',
    img: '/images/memberships/1871-plate.webp',
    alt: '1871',
    /* Official plate asset is 300 x 181. */
    width: 100,
    height: 60,
    rise: 'rise-3',
  },
];

/**
 * Membership credibility band. These are memberships, not customers,
 * sponsors, or endorsements, and the copy says exactly that. Official logo
 * files are stored locally (no hotlinking) and rendered unmodified on a light
 * surface at their native proportions. The entrance is a one-time staggered
 * fade that respects prefers-reduced-motion; content is complete without
 * JavaScript.
 */
export default function CredibilityBand() {
  return (
    <section className="border-t border-[#E5EEF5] bg-white">
      <div className="container-x py-16 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="rise font-sora text-2xl font-bold tracking-tight text-navy sm:text-[1.65rem]">
            Part of Chicago&rsquo;s startup ecosystem
          </h2>
          <p className="rise rise-1 mt-3 text-[15px] text-navy/60">
            Signal Harbor is a member of these Chicago innovation communities.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {memberships.map((m) => (
              <a
                key={m.org}
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${m.rise} rise card-light lift group flex flex-col items-center border-[#E0EAF2] px-8 py-9`}
              >
                <span className="flex h-16 items-center justify-center">
                  <img
                    src={m.img}
                    alt={m.alt}
                    width={m.width}
                    height={m.height}
                    loading="lazy"
                    style={{ width: m.width, height: m.height }}
                  />
                </span>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy/80 group-hover:text-[#0369A1]">
                  {m.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
