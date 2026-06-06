import Section, { SectionHeading } from './Section';

/** Tiny branded UI illustration shown at the top of each step card. */
function StepVisual({ variant }: { variant: 'prompt' | 'score' | 'plan' }) {
  return (
    <div className="mb-5 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-navy-panel to-navy-deep ring-1 ring-white/10">
      {variant === 'prompt' && (
        <svg width="150" height="76" viewBox="0 0 150 76" fill="none" aria-hidden="true">
          <rect x="14" y="12" width="92" height="14" rx="7" fill="rgba(255,255,255,.08)" />
          <rect x="14" y="12" width="60" height="14" rx="7" fill="rgba(0,194,255,.25)" />
          <rect x="14" y="34" width="122" height="10" rx="5" fill="rgba(255,255,255,.08)" />
          <rect x="14" y="50" width="104" height="10" rx="5" fill="rgba(255,255,255,.08)" />
          <circle cx="130" cy="19" r="7" fill="none" stroke="#00C2FF" strokeWidth="2" />
          <path d="M135 24l5 5" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
      {variant === 'score' && (
        <svg width="150" height="76" viewBox="0 0 150 76" fill="none" aria-hidden="true">
          <circle cx="40" cy="38" r="22" stroke="rgba(255,255,255,.12)" strokeWidth="6" fill="none" />
          <circle cx="40" cy="38" r="22" stroke="#00C2FF" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray="138" strokeDashoffset="44" transform="rotate(-90 40 38)" />
          <text x="40" y="43" textAnchor="middle" fill="#fff" fontSize="16" fontFamily="sans-serif" fontWeight="700">72</text>
          <rect x="78" y="24" width="58" height="8" rx="4" fill="rgba(0,194,255,.35)" />
          <rect x="78" y="38" width="44" height="8" rx="4" fill="rgba(255,255,255,.12)" />
          <rect x="78" y="52" width="52" height="8" rx="4" fill="rgba(255,255,255,.12)" />
        </svg>
      )}
      {variant === 'plan' && (
        <svg width="150" height="76" viewBox="0 0 150 76" fill="none" aria-hidden="true">
          {[18, 38, 58].map((y, i) => (
            <g key={y}>
              <rect x="20" y={y - 8} width="16" height="16" rx="4" fill="none" stroke="#00C2FF" strokeWidth="2" />
              <path d={`M24 ${y}l3 3 5-6`} stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="46" y={y - 5} width={90 - i * 18} height="10" rx="5" fill="rgba(255,255,255,.1)" />
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}

const steps = [
  {
    n: '1',
    variant: 'prompt' as const,
    title: 'We test real buyer prompts',
    body: 'We build a prompt set around your category, market, services, and customer intent.',
  },
  {
    n: '2',
    variant: 'score' as const,
    title: 'We measure visibility and accuracy',
    body: 'We review mentions, citations, competitor presence, answer quality, and incorrect claims.',
  },
  {
    n: '3',
    variant: 'plan' as const,
    title: 'You get a prioritized action plan',
    body: 'You see what to fix first so AI systems can understand, cite, and recommend you more accurately.',
  },
];

export default function HowItWorks() {
  return (
    <Section tone="light" id="how-it-works">
      <SectionHeading
        tone="light"
        eyebrow="How It Works"
        title="From audit to action in three steps."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="card-light lift">
            <StepVisual variant={s.variant} />
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-navy font-sora text-base font-bold text-blue">
                {s.n}
              </span>
              <h3 className="text-lg font-bold text-navy">{s.title}</h3>
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-navy/65">{s.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
