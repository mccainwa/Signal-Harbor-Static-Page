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
    "mailto:info@signalharborconsulting.com?subject=AI%20Visibility%20Inquiry",
  /** Verified company LinkedIn page. */
  linkedin: "https://www.linkedin.com/company/signal-harbor-consulting",
  /** Approved public founder names, in display order. */
  founders: ["Walter McCain III", "Sebastian Miller"],
};

/**
 * The offer structure, confirmed by the founders. Keep these three separate
 * everywhere on the site:
 *
 *   Introductory call        Free.
 *   AI Visibility Snapshot   Complimentary when someone books the call. A
 *                            brief preview, not the full audit.
 *   AI Visibility Audit      The comprehensive paid engagement (the GEO
 *                            Diagnostic Pilot on the services page). Proof
 *                            work, sprints, and monitoring are also paid.
 *
 * Never write "free diagnostic" or "free audit". The complimentary
 * deliverable is specifically the Snapshot.
 */
export const CTA = {
  /** Primary action, used where a page makes the offer in full. */
  primary: "Get a Complimentary Snapshot",
  /** Short form for the header, footer, and tight layouts. */
  short: "Get Your Snapshot",
  /** Contextual ask beside the paid engagement. */
  audit: "Discuss an AI Visibility Audit",
  /** The approved supporting sentence. Use verbatim where space allows. */
  supporting:
    "Book an introductory call and receive a complimentary snapshot of how AI platforms describe and recommend your company.",
  /** The free/paid boundary, stated once and reused. */
  boundary:
    "The introductory call is free, and the AI Visibility Snapshot that comes with it is complimentary. The full audit, optimization sprints, and ongoing monitoring are paid engagements.",
};
