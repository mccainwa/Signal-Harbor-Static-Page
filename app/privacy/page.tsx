import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy | Signal Harbor',
  description: 'How Signal Harbor handles information collected through this website.',
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>
        Signal Harbor is an AI visibility intelligence and GEO services company
        operating the website at signalharborconsulting.com. This notice
        explains what information may be collected through the website and how it
        is used.
      </p>

      <h2>Information we may collect</h2>
      <ul>
        <li><strong>Booking data:</strong> When you schedule a call, our scheduling provider (Calendly) collects the details you submit, such as your name, email, and any notes you choose to share.</li>
        <li><strong>Contact data:</strong> If you email us, we receive your email address and the contents of your message.</li>
        <li><strong>Basic analytics:</strong> If web analytics are used now or in the future, they may collect limited, aggregated usage data such as pages viewed and general device or referrer information.</li>
      </ul>

      <h2>How we use information</h2>
      <ul>
        <li>To respond to inquiries and schedule and conduct diagnostic calls.</li>
        <li>To provide and improve our services and this website.</li>
        <li>To understand, in aggregate, how the website is used.</li>
      </ul>

      <h2>Third-party services</h2>
      <p>
        This website relies on third-party services that operate under their own
        privacy policies, including <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">Calendly</a> for
        scheduling and GitHub Pages for static hosting. We encourage you to
        review their policies.
      </p>

      <h2>Sale of personal information</h2>
      <p>We do not sell your personal information.</p>

      <h2>Sensitive information</h2>
      <p>
        Please do not submit sensitive or confidential business data through
        public forms or email unless we have agreed to a separate, appropriate
        arrangement for handling it.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent to{' '}
        <a href={SITE.mailto}>{SITE.email}</a>.
      </p>
    </LegalLayout>
  );
}
