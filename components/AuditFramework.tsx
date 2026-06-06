import Section, { SectionHeading } from './Section';

const pillars = [
  {
    name: 'Prompt Visibility',
    body: 'Do you appear when customers ask AI for recommendations in your category, market, and service area?',
  },
  {
    name: 'Technical Access',
    body: 'Can AI systems and crawlers reach, read, and interpret the pages that matter?',
  },
  {
    name: 'Entity Clarity',
    body: 'Is it clear who you are, what you do, where you operate, and which customers you serve?',
  },
  {
    name: 'Content Extractability',
    body: 'Can AI systems pull accurate, useful answers from your website and public profiles?',
  },
  {
    name: 'Authority Signals',
    body: 'Do trusted sources consistently confirm your business details, expertise, and reputation?',
  },
  {
    name: 'Hallucination Detection',
    body: 'Where are AI systems stating incorrect, outdated, or unsupported information as fact?',
  },
];

export default function AuditFramework() {
  return (
    <Section tone="light" id="audit-framework">
      <SectionHeading
        tone="light"
        eyebrow="Audit Framework"
        title="Six factors shape how AI systems understand and recommend your business."
        intro="Each factor answers a practical question about whether your business can be found, trusted, cited, and recommended."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((p, i) => (
          <div key={p.name} className="card-light lift accent-top">
            <span className="font-sora text-sm font-bold text-blue">0{i + 1}</span>
            <h3 className="mt-2 text-lg font-bold text-navy">{p.name}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-navy/65">{p.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
