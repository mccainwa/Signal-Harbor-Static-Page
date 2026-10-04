import Image from 'next/image';
import Link from 'next/link';
import { SITE, CTA } from '@/lib/site';
import HarborDialog from './HarborDialog';
import { FOUNDERS } from '@/lib/founders';

type Founder = (typeof FOUNDERS)[number];

function Portrait({ founder, panel = false }: { founder: Founder; panel?: boolean }) {
  return (
    <div className={'founder-portrait founder-portrait-' + founder.id + (panel ? ' founder-portrait-panel' : '')}>
      <Image src={founder.image} alt={founder.name + ', co-founder of Signal Harbor'} width={founder.imageWidth} height={founder.imageHeight} loading="lazy" style={{ objectPosition: founder.imagePosition }} />
    </div>
  );
}

export default function Founders() {
  return (
    <section id="founders" className="bg-canvas" aria-labelledby="founders-title">
      <div className="container-x py-12 sm:py-16">
        <div className="founders-heading">
          <div><p className="eyebrow">The people behind the program</p><h2 id="founders-title" className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">Meet the founders.</h2></div>
          <p>Meet the people connecting AI search intelligence, technical execution, and business strategy at Signal Harbor.</p>
        </div>
        <div className="founder-grid mt-8">
          {FOUNDERS.map(f => (
            <article key={f.id} id={f.id} className="founder-card">
              <Portrait founder={f} />
              <div className="founder-card-info">
                <p className="portal-kicker">Co-founder</p><h3>{f.name}</h3>
                <HarborDialog title={f.name} drawer trigger={<>Learn more about {f.firstName} <span aria-hidden="true">↗</span></>} fallbackHref={'#' + f.id + '-bio'}>
                  <div className="founder-panel">
                    <Portrait founder={f} panel />
                    <p className="portal-kicker mt-6">Co-founder · Signal Harbor</p>
                    <p className="mt-4 text-base leading-relaxed text-navy/85">{f.bio}</p>
                    {f.sections.map(section => (
                      <div key={section.title} className="mt-7">
                        <h3 className="text-lg font-bold text-navy">{section.title}</h3>
                        <p className="mt-3 text-base leading-relaxed text-navy/85">{section.text}</p>
                      </div>
                    ))}
                    <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                      <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className="harbor-text-link font-semibold text-harbor underline underline-offset-4">Connect on LinkedIn <span className="sr-only">(opens in a new tab)</span><span aria-hidden="true">↗</span></a>
                      <Link href={SITE.bookingUrl} className="harbor-text-link font-semibold text-harbor underline underline-offset-4">{CTA.primary} <span aria-hidden="true">→</span></Link>
                    </div>
                  </div>
                </HarborDialog>
                <noscript><div id={f.id + '-bio'} className="mt-4 text-sm leading-relaxed text-navy/85">{f.bio} {f.sections.map(section => section.text).join(' ')}</div></noscript>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-7 text-sm text-navy/85"><a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="harbor-text-link font-semibold text-harbor underline underline-offset-4">Follow Signal Harbor on LinkedIn <span className="sr-only">(opens in a new tab)</span><span aria-hidden="true"> ↗</span></a></p>
      </div>
    </section>
  );
}
