/**
 * One connected, clearly illustrative example used by every portal preview
 * on the site (home hero, the program loop, the portal tour, and the
 * platform page). It teaches the workflow: one buyer question becomes one
 * finding, one campaign asset, one review, one publication record, and one
 * measurement plan.
 *
 * Rules for this file:
 *   - No real client, tenant, or competitor names. "Your company" and
 *     "Competitor A/B" only.
 *   - No invented lift, score movement, revenue, or completed retest. The
 *     example deliberately stops where real evidence would have to start.
 *   - Portal area names (Home, Insights, Campaign, Results) and review
 *     controls match the portal as observed on October 2, 2026.
 */

export const EXAMPLE = {
  question:
    'Which payroll providers handle multistate compliance for midsize manufacturers?',
  finding: 'Competitor A and Competitor B are named. Your company is not mentioned.',
  evidence: [
    'Repeated answers collected on the tested AI platforms',
    'Sources cited in the answers: an industry comparison article, a review site, and a competitor product page',
  ],
  priority: {
    product: 'Payroll compliance suite',
    audience: 'Finance and HR leaders at manufacturers',
    initiative: 'Multistate compliance campaign',
    next: 'Prepare a comparison page and an FAQ module',
  },
  asset: {
    title: 'Comparison page: multistate payroll compliance for manufacturers',
    version: 'Version 3',
    comments: '4 comments',
    factRequest: 'Confirm the list of supported states',
  },
  secondAsset: 'FAQ module: state registration and filing',
  publish: {
    approved: 'Approved version 3',
    handoff: 'Handed off to your web team',
    published: 'Published URL and date recorded',
  },
  measure: {
    retest: 'Comparable retest once the page is live and discoverable',
    search: 'Search Console impressions for the new page',
    outcome: 'Outcome measurement not configured',
  },
} as const;

/** The review controls observed on a portal asset. */
export const REVIEW_CONTROLS = ['Approve for publishing', 'Request changes', 'Reject'] as const;

/** Portal areas, in the order a client meets them. */
export const PORTAL_AREAS = [
  { name: 'Home', job: 'Next actions and what needs your review' },
  { name: 'Insights', job: 'Questions, answers, competitors, and cited sources' },
  { name: 'Campaign', job: 'The plan, prepared content, review, and approval' },
  { name: 'Results', job: 'Publication status and configured measurement' },
] as const;
