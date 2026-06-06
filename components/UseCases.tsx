import Image from 'next/image';
import Section, { SectionHeading } from './Section';
import CTAButton from './CTAButton';
import { SITE } from '@/lib/site';

const cases = [
  {
    title: 'Personal Injury Law',
    body: 'When someone asks AI for a top injury lawyer in their city, does your firm appear — and are the details accurate?',
    cta: 'See it for PI law',
    img: '/images/usecase-law.png',
    alt: 'Professional consultation in a law office',
  },
  {
    title: 'Construction Software & Services',
    body: 'When buyers ask AI to compare tools, contractors, or service providers, where does your business show up?',
    cta: 'See it for construction',
    img: '/images/usecase-construction.png',
    alt: 'Construction planning with blueprints and hard hat',
  },
  {
    title: 'Medical & Dental Practices',
    body: 'See whether AI systems recommend your practice for local care searches, cite accurate profile data, and surface the right specialties.',
    cta: 'See it for practices',
    img: '/images/usecase-medical.png',
    alt: 'Doctor reviewing a tablet with a patient',
  },
];

export default function UseCases() {
  return (
    <Section tone="navy" id="use-cases">
      <SectionHeading
        eyebrow="Use Cases"
        title="Built for businesses customers compare before they call."
        intro="The audit adapts to your market, your competitors, and the questions your customers are likely asking AI."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {cases.map((c) => (
          <div
            key={c.title}
            className="group lift accent-top flex flex-col overflow-hidden rounded-3xl border border-white/12 bg-navy-panel shadow-[0_24px_50px_-30px_rgba(0,0,0,0.7)] hover:border-blue/40"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={c.img}
                alt={c.alt}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/55 to-transparent" />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <h3 className="text-lg font-bold text-white">{c.title}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-white/70">{c.body}</p>
              <div className="mt-6">
                <CTAButton href={SITE.bookingUrl} variant="ghost" className="px-0">
                  {c.cta} →
                </CTAButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
