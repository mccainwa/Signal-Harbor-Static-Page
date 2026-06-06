import Section, { SectionHeading } from './Section';
import { IconShift, IconRanking, IconWarning } from './icons';

const cards = [
  {
    icon: IconShift,
    title: 'The buyer asks differently',
    body: 'Customers are asking AI “who should I call?” instead of scanning pages of search results.',
  },
  {
    icon: IconRanking,
    title: 'Ranking does not guarantee recommendation',
    body: 'You can rank well on Google and still be absent from AI-generated answers.',
  },
  {
    icon: IconWarning,
    title: 'Wrong answers create real risk',
    body: 'AI systems may cite outdated sources, recommend competitors, or state incorrect details as fact.',
  },
];

export default function Problem() {
  return (
    <Section tone="light" id="problem">
      <SectionHeading
        tone="light"
        eyebrow="The Problem"
        title="Search is moving from links to answers."
        intro="For years, visibility meant ranking on Google. Now buyers ask AI systems for direct recommendations. If your business is missing, misrepresented, or outranked by competitors inside those answers, traditional SEO reports may not show the problem."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.title} className="card-light lift">
              <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-navy text-blue ring-1 ring-navy/10">
                <Icon size={24} />
              </span>
              <h3 className="text-lg font-bold text-navy">{c.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-navy/65">{c.body}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
