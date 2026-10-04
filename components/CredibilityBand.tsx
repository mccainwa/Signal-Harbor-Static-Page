const memberships = [
  {
    org: 'Loyola University Chicago',
    label: 'Member of Loyola University Chicago’s Ignite Lab',
    href: 'https://www.luc.edu/leadershiphub/centers/ignitelab/',
    img: '/images/memberships/loyola-university-chicago.svg',
    alt: 'Loyola University Chicago',
    /* Official SVG is a wide lockup (192.78 x 41.36). */
    width: 150,
    height: 32,
    rise: 'rise-2',
  },
  {
    org: '1871',
    label: 'Member of 1871',
    href: 'https://1871.com/',
    img: '/images/memberships/1871-plate.webp',
    alt: '1871',
    /* Official plate asset is 300 x 181. */
    width: 70,
    height: 42,
    rise: 'rise-3',
  },
];

/**
 * Membership credibility strip. These are memberships, not customers,
 * sponsors, or endorsements, and the copy says exactly that. Official logo
 * files are stored locally (no hotlinking) and rendered unmodified on a light
 * surface at their native proportions. The entrance is a one-time staggered
 * fade that respects prefers-reduced-motion; content is complete without
 * JavaScript.
 */
export default function CredibilityBand() {
  return (
    <section className="border-b border-navy/[0.08] bg-raised" aria-labelledby="memberships-heading">
      <div className="container-x flex flex-col items-center gap-5 py-7 lg:flex-row lg:justify-between lg:gap-10">
        <div className="text-center lg:text-left">
          <h2 id="memberships-heading" className="rise font-sora text-base font-bold tracking-tight text-navy">
            Part of Chicago&rsquo;s startup ecosystem
          </h2>
          <p className="rise rise-1 mt-1 text-sm text-navy/70">
            Signal Harbor is a member of these Chicago innovation communities.
          </p>
        </div>
        <div className="membership-light grid w-full gap-3 sm:w-auto sm:grid-cols-2">
          {memberships.map((m) => (
            <a
              key={m.org}
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${m.rise} rise group flex items-center gap-4 rounded-xl border-[1.5px] border-[#BBD6E5] bg-white px-4 py-2.5 transition-colors hover:border-harbor/60`}
            >
              <span className="flex h-10 w-[110px] flex-none items-center justify-center sm:w-[130px]">
                <img
                  src={m.img}
                  alt={m.alt}
                  width={m.width}
                  height={m.height}
                  loading="lazy"
                  style={{ width: m.width, height: 'auto', maxWidth: '100%' }}
                />
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold leading-snug text-navy/80 group-hover:text-harbor">
                {m.label}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
                <span className="sr-only">(opens in a new tab)</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
