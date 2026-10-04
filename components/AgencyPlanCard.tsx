import Link from 'next/link';
import HarborDialog from './HarborDialog';
import AgencyInquiryForm from './AgencyInquiryForm';

const FEATURES = ['AI visibility programs for your client portfolio','Audit intelligence and managed campaign support','Signal Harbor AI and permissioned Agent Connections','Google Analytics, Search Console, and attribution','A portal shaped around your team and client needs'];

export default function AgencyPlanCard() {
  return <article id="agencies" className="agency-plan-card" aria-labelledby="agency-plan-title"><div className="agency-plan-top"><p className="eyebrow">For agency partners</p><h2 id="agency-plan-title">Agency partnership</h2><p className="agency-plan-price">Contact for pricing</p><p>Bring AI search intelligence and managed execution into the programs you run for your clients.</p></div><div className="agency-plan-body"><h3>Built around your agency.</h3><p className="mt-3 text-sm leading-relaxed text-navy/85">Pricing follows your client count, portal requirements, customization costs, and the scope of the work.</p><ul className="mt-6">{FEATURES.map(item=><li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul><div className="agency-plan-action" data-cta-zone="pricing-agency"><HarborDialog title="Tell us about your agency." trigger={<>Contact for pricing <span aria-hidden="true">→</span></>} triggerClass="harbor-form-submit w-full" fallbackHref="/contact/#agency-inquiry"><AgencyInquiryForm /></HarborDialog><p>No email to compose. Just a few details to get started.</p><Link href="/services/#responsibilities" className="harbor-text-link">How we work with agencies <span aria-hidden="true">↗</span></Link></div></div></article>;
}
