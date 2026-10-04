import { OFFER, SITE } from '@/lib/site';

/**
 * FAQ content for /faq/. One source feeds both the visible page and the
 * FAQPage structured data, so the schema can never disagree with what a
 * reader sees.
 *
 * Shape:
 *   - Questions are grouped by topic for reading. The structured data stays
 *     flat (use `faqs`, the flattened list, and `answerText`).
 *   - An answer is a list of paragraphs. A paragraph is either plain text or
 *     a list of text runs and inline links. Links render on the page; the
 *     structured data carries the same words as plain text.
 *
 * Copy rules (October 2, 2026 founder decisions): middle market and
 * enterprise fit; client work and results are delivered in the portal and
 * the Snapshot is the one sales preview; the company pilot terms come from
 * OFFER so they never drift; agency pricing is Contact for pricing with no
 * numbers; approval is not publication; no guarantees, no timelines, no
 * cadence, no invented quantities. Visible copy uses no dashes.
 */

export type FaqLink = { text: string; href: string };
export type FaqRun = string | FaqLink;
export type FaqParagraph = string | FaqRun[];

export type Faq = {
  /** Fragment id for deep links, unique on the page. */
  id: string;
  q: string;
  a: FaqParagraph[];
};

export type FaqGroup = {
  /** Fragment id for the topic, unique on the page. */
  id: string;
  /** Short topic name for the eyebrow and the topic links. */
  label: string;
  /** The topic's h2, a sentence. */
  title: string;
  /** The short answer for the whole topic, shown before the questions. */
  summary: string;
  /** Where to go for more depth on this topic. */
  more: { label: string; href: string };
  items: Faq[];
};

const link = (text: string, href: string): FaqLink => ({ text, href });

export const faqGroups: FaqGroup[] = [
  {
    id: 'fit',
    label: 'Fit',
    title: 'Who it is for and how it fits your team.',
    summary:
      'Signal Harbor works with middle market and enterprise marketing teams whose buyers use AI search during discovery, comparison, and evaluation. It works alongside your team and any agency you already use.',
    more: { label: 'How the managed program works', href: '/services/' },
    items: [
      {
        id: 'who-is-it-for',
        q: 'Who is Signal Harbor for?',
        a: [
          'Middle market and enterprise companies whose buyers use AI search to discover, compare, and evaluate options before they speak to sales.',
          'The program is built for a marketing leader, such as a CMO or VP of Marketing, working with product marketing, content, SEO, web, and marketing operations. Your team chooses the product, audience, or market to focus on first, so the work starts where it matters most to the business.',
        ],
      },
      {
        id: 'is-this-seo',
        q: 'Is this SEO?',
        a: [
          'It overlaps with SEO, but it asks a different question. SEO is about how your pages rank and perform in search results. This program is about how AI answers describe, compare, and recommend your company, which sources those answers rely on, and which content your team can improve or create in response.',
          [
            'You will also hear this work called generative engine optimization or answer engine optimization. The ',
            link('AI search optimization services page', '/services/'),
            ' explains both terms and where they meet the SEO work you already do.',
          ],
        ],
      },
      {
        id: 'existing-agency',
        q: 'We already have an SEO agency. Does this replace them?',
        a: [
          'No. Your agency keeps the SEO, web, or content work it already owns. Signal Harbor adds the AI search work: testing the buyer questions that matter to your initiative, showing where AI answers leave you out or favor a competitor, and preparing content for your team to review.',
          'When it is the agreed handoff, your agency can publish the approved work from a clear brief: the approved version, its destination, and its owner.',
        ],
      },
      {
        id: 'what-your-team-provides',
        q: 'What does my team need to provide?',
        a: [
          'Direction, facts, and decisions. Your team chooses the product, audience, or market to focus on first, confirms company facts when the portal asks for them, and reviews, comments on, and approves specific versions of the work.',
          'You also publish approved work or name who will, and connect any measures you want to see in Results. Signal Harbor handles the testing, the campaign plan, the preparation of the work, and the changes you request.',
        ],
      },
    ],
  },
  {
    id: 'program',
    label: 'The program',
    title: 'Where the work happens and who publishes it.',
    summary:
      'Signal Harbor finds the gaps and prepares the work. Your team reviews and approves it, publication is recorded when the work goes live, and all of it happens in the client portal.',
    more: { label: 'Tour the client portal', href: '/platform/' },
    items: [
      {
        id: 'where-work-is-delivered',
        q: 'Where do we receive the work and results?',
        a: [
          [
            'In the Signal Harbor ',
            link('client portal', '/platform/'),
            '. Home shows your next actions and what is ready for review. Insights shows the buyer questions tested, the recorded answers, the competitors named, and the sources cited. Campaign holds the plan and the prepared content for review and approval. Results shows what has been published and what has been measured.',
          ],
          'Before you sign, the complimentary AI Visibility Snapshot gives you a short preview on the introductory call. Once the program starts, the evidence, the prepared work, your approvals, and the results all live in the portal, where your whole team can see them.',
        ],
      },
      {
        id: 'included-ai-and-agents',
        q: 'Are Signal Harbor AI and Agent Connections included?',
        a: ['Yes. Signal Harbor AI supports content work using your company facts, brand preferences, and campaign context. Agent Connections give Claude, Codex, and compatible agents permissioned access to approved company context and work. Your team retains human review and final approval.'],
      },
      {
        id: 'included-data-connections',
        q: 'Which data connections are included?',
        a: ['Google Analytics 4 and Google Search Console. Connect the properties selected for the program to bring traffic sources, landing pages, engagement, conversion events, and organic query and page performance into the portal.'],
      },
      {
        id: 'discovery-attribution',
        q: 'How do AI search, SEO discovery, and attribution fit together?',
        a: ['AI answer evidence and Search Console query and page performance guide campaign priorities. Connected Google Analytics data links identified AI referrals and organic traffic to landing pages and tracked conversion events. Results brings those measurements together with the work prepared, approved, and published.'],
      },
      {
        id: 'who-publishes',
        q: 'Who publishes the work?',
        a: [
          'Whoever you agree on for your engagement: your own team, your current agency, or another arrangement set at the start. Signal Harbor prepares the work and hands off the approved version with its destination and owner.',
          'Approving a page is not the same as publishing it. When the approved version goes live, the portal records it as published with its URL and date, so everyone can see what is actually live.',
        ],
      },
      {
        id: 'admin-access',
        q: 'Do we need to give admin access?',
        a: [
          'No. The program starts from your public pages, the AI answers we test, and the company facts your team confirms in the portal.',
          'Google Analytics 4 and Search Console connections use the properties your team authorizes for the program. Team access and agent connections are permissioned, and every measure keeps its own source and dates.',
        ],
      },
    ],
  },
  {
    id: 'commitment',
    label: 'Commitment and pricing',
    title: 'What it costs and how long you commit.',
    summary:
      'The introductory call is free and includes a complimentary AI Visibility Snapshot. The company pilot is a paid engagement with a 90 day minimum commitment. Agency partnerships are quoted individually.',
    more: { label: 'See pricing and terms', href: '/pricing/' },
    items: [
      {
        id: 'cost-and-commitment',
        q: 'How much does it cost and how long do we commit?',
        a: [
          `The ${OFFER.name.toLowerCase()} has a ${OFFER.minimum} within a six month full pilot. After the first 90 days, choose whether to stop or continue. The current founding partner rate and full commercial terms are on the pricing page.`,
          [
            'The introductory call is free. See ',
            link('pricing and terms', '/pricing/'),
            ' for the full terms and the agency route.',
          ],
        ],
      },
      {
        id: 'six-month-minimum',
        q: 'Is six months the minimum?',
        a: [
          'No. The minimum commitment is the first 90 days. Six months is the length of the full pilot, which leaves room for work to move from review through publication to measurement. After the first 90 days, you can stop or continue at the same monthly rate.',
        ],
      },
      {
        id: 'agency-pricing',
        q: 'How does agency pricing work?',
        a: [
          `Agency pricing is ${OFFER.agencyPrice}, because each partnership is quoted individually. The quote depends on how many client companies are involved, any custom portal requirements and what they cost, and the scope of the engagement.`,
          ['Use the ', link('agency inquiry form', '/pricing/#agencies'), ' to tell us about your clients and the program you want to build.'],
        ],
      },
      {
        id: 'snapshot',
        q: 'What is the complimentary AI Visibility Snapshot?',
        a: [
          'A brief preview of how AI platforms currently describe and recommend your company, included when you book the complimentary introductory call. We walk through the buyer questions and findings, then show the client portal in a live demo.',
          [
            "It is a sales preview to help you judge whether the program fits. The program's work and results are delivered in the portal. ",
            link('See what the Snapshot includes', '/snapshot/'),
            '.',
          ],
        ],
      },
    ],
  },
  {
    id: 'measurement',
    label: 'Measurement and results',
    title: 'How we measure and what results mean.',
    summary:
      'AI visibility is measured by repeatedly testing the questions your buyers ask and recording the answers and the sources they cite. Results keeps prepared, approved, published, and measured work separate. No one can guarantee what AI platforms say.',
    more: { label: 'Read the measurement methodology', href: '/methodology/' },
    items: [
      {
        id: 'platforms',
        q: 'What platforms do you test?',
        a: [
          'The company pilot covers ChatGPT, Claude, Gemini, Perplexity, Grok, Google AI Overviews, Google AI Mode, and Meta AI. The buyer question set is tailored to your products, audiences, and markets. Matched retests compare the same questions and platforms.',
        ],
      },
      {
        id: 'how-we-measure',
        q: 'How do you measure AI visibility?',
        a: [
          'We ask AI platforms the questions your buyers ask, repeat each question because answers vary from run to run, and record every answer with the sources it cites. For each question we look at whether your company is mentioned or recommended, how it is described, which competitors are named instead, and which sources the answers rely on.',
          [
            'After work is published, a matched retest asks the same questions on the same platforms, so the comparison is like for like. The ',
            link('measurement methodology', '/methodology/'),
            ' explains the method and its limits.',
          ],
        ],
      },
      {
        id: 'what-results-mean',
        q: 'What do results mean?',
        a: [
          'Results shows prepared, approved, and published work separately from the measures agreed for your program. Publication records include the live URL and date, while visibility, search, and analytics retain their own sources and measurement periods.',
          'We compare matched retests with your baseline to measure changes in mentions, recommendations, citations, and accuracy. We bring those changes together with search discovery, traffic, conversions, and campaign history to estimate business impact. Estimates keep their assumptions and supporting evidence visible, separately from recorded outcomes.',
        ],
      },
      {
        id: 'timeline',
        q: 'How quickly will we see change?',
        a: [
          'There is no promised timeline. Change depends on when the approved work is published, when AI platforms and search engines discover it, and when the matched retest runs after publication. Publication and measurement dates keep the sequence clear as work moves through the program.',
        ],
      },
      {
        id: 'guarantees',
        q: 'Can you guarantee that AI tools recommend us?',
        a: [
          'No, and no credible provider should. AI answers vary from run to run and change as models and sources change, so no one controls them. We work on the signals that make accurate inclusion more likely and measure what happens after the work is published, without guaranteeing rankings, mentions, recommendations, leads, or revenue.',
        ],
      },
    ],
  },
];

/** Every question in page order, flat. Feeds the FAQPage structured data. */
export const faqs: Faq[] = faqGroups.flatMap((g) => g.items);

/** A paragraph as plain text: inline links keep their words, lose the URL. */
export function paragraphText(p: FaqParagraph): string {
  return typeof p === 'string' ? p : p.map((r) => (typeof r === 'string' ? r : r.text)).join('');
}

/** A whole answer as plain text, for structured data. */
export function answerText(a: FaqParagraph[]): string {
  return a.map(paragraphText).join(' ');
}
