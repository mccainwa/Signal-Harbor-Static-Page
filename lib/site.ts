export const SITE = {
  name: "Signal Harbor",
  // The production domain is the CNAME this repository deploys behind.
  // signalharborconsulting.com now redirects here and still receives mail.
  domain: "signalharborai.com",
  url: "https://signalharborai.com",
  /**
   * Every booking CTA on the site points at the internal booking page, which
   * hosts the Calendly inline embed. Calendly scripts load only there.
   */
  bookingUrl: "/book",
  /** The Calendly event, used only by the /book page embed and its fallback. */
  calendlyUrl:
    "https://calendly.com/walter-mccain-signalharborconsulting/ai-visibility-audit-call",
  email: "info@signalharborconsulting.com",
  mailto:
    "mailto:info@signalharborconsulting.com?subject=AI%20Search%20Program%20Inquiry",
  /** Agency enquiries use the same inbox with their own subject line. */
  agencyMailto:
    "mailto:info@signalharborconsulting.com?subject=Agency%20Pricing%20Inquiry",
  /** Verified company LinkedIn page. */
  linkedin: "https://www.linkedin.com/company/signal-harbor-consulting",
  /** Approved public founder names, in display order. */
  founders: ["Walter McCain III", "Sebastian Miller"],
};

/**
 * The commercial offer, confirmed by the founders on October 2, 2026. Keep
 * these facts together and distinct everywhere on the site:
 *
 *   Introductory call        Free.
 *   AI Visibility Snapshot   Complimentary when someone books the call. A
 *                            sales preview, not the client delivery model.
 *   Live portal demo         Complimentary alongside the Snapshot.
 *   Company pilot            $3,000 per month. 90 day minimum commitment.
 *                            Six month full pilot. After the first 90 days
 *                            the client stops or continues at the same rate.
 *                            Six months is NOT the contractual minimum.
 *   Agency partnerships      Contact for pricing (client count, custom
 *                            portal requirements and costs, scope).
 *
 * Client results and deliverables are delivered through the client portal.
 * Reports are a sales tool, never the ongoing delivery.
 * Dollar amounts appear only on /pricing/, including metadata, structured
 * data, and llms.txt. Other routes explain value and link to Pricing.
 * Attribution includes matched baseline remeasurement and connected
 * discovery/conversion evidence used to estimate impact with assumptions.
 *
 * Confirmed October 3: one campaign plan per month, five content templates
 * per week, and audit coverage across eight AI answer platforms.
 * Confirmed October 3: $3,000 is the founding partner rate. Future program
 * pricing should reflect broader platform capabilities. No numerical cap,
 * deadline, future list price, or lifetime price lock has been approved.
 * Founder correction October 3: Signal Harbor AI, Agent Connections,
 * Google Analytics 4, Search Console, and connected attribution are part of
 * the offer clients sign up for. They will be ready before onboarding.
 * Development/activation status is an operational readiness matter; do not
 * market these included capabilities as a future roadmap or remove them.
 * Not decided, so never published: package names beyond the working label,
 * founding eligibility, price locks, setup fees, revision
 * counts, retest cadence, cancellation notice, or extra enterprise tiers.
 * Never write "free diagnostic" or "free audit".
 */
export const OFFER = {
  /** Neutral working label until the founders settle a package name. */
  name: "Company pilot",
  rateLabel: "Founding partner rate",
  price: "$3,000",
  /** Numeric value for structured data; must match the visible price. */
  priceValue: 3000,
  priceUnit: "per month",
  minimum: "90 day minimum commitment",
  pilot: "Six month full pilot",
  continuation:
    "After the first 90 days, choose whether to continue at the same monthly rate.",
  /** Optional cost explanation, confirmed arithmetic on the confirmed rate. */
  firstTerm: "$9,000",
  fullPilot: "$18,000",
  agencyPrice: "Contact for pricing",
  campaignPlansPerMonth: 1,
  contentTemplatesPerWeek: 5,
  answerPlatforms: 8,
  includedCapabilities: [
    'Signal Harbor AI',
    'Agent Connections',
    'Google Analytics 4',
    'Google Search Console',
    'AI search and SEO discovery attribution',
  ],
};

export const CTA = {
  /** The one primary action, used wherever a page asks for the next step.
   *  Always links to SITE.bookingUrl (the free introductory call). */
  primary: "Get a snapshot & demo",
  /** Same action for the header and tight layouts. */
  short: "Get a demo",
  /** Agency route on pricing and fit sections. */
  agency: "Ask about agency pricing",
  /** The approved supporting sentence. Use verbatim where space allows. */
  supporting:
    "Book a complimentary AI Visibility Snapshot and live portal demo. See how AI describes your company, then explore how the program turns those findings into action.",
  /** The free/paid boundary, stated once and reused. */
  boundary:
    "The introductory call, AI Visibility Snapshot, and portal demo are complimentary. The company pilot and agency partnerships are paid engagements.",
};
