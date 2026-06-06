import Section, { SectionHeading } from './Section';
import DashboardPreview from './DashboardPreview';

/**
 * Full-width dashboard section — the centerpiece, repeated below the fold so
 * the metrics get a dedicated, explained moment (the hero shows it compactly).
 */
export default function DashboardSection() {
  return (
    <Section tone="navy" id="dashboard">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="The Dashboard"
            title="One score. The metrics behind it. The errors to fix."
            intro="The score gives you the headline. The supporting metrics show why you earned it, where competitors are showing up, which sources AI trusts, and what incorrect claims need to be corrected first."
          />
          <ul className="mt-8 space-y-4">
            {[
              ['Mention Rate', 'How often your business appears across tested prompts.'],
              ['Citation Share', 'How often AI systems cite your site or trusted third-party sources about you.'],
              ['Share of Voice', 'Your visibility compared with competitors in the same answers.'],
              ['Prominence Score', 'How strongly and prominently your business is positioned when it appears.'],
              ['Hallucination Detection', 'Incorrect or outdated claims flagged separately for review.'],
            ].map(([label, desc]) => (
              <li key={label} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-blue" />
                <span className="text-[15px] text-white/75">
                  <span className="font-semibold text-white">{label}</span> — {desc}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <DashboardPreview />
      </div>
    </Section>
  );
}
