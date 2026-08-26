import type { Metadata } from 'next';
import { pageMetadata, OG } from '@/lib/seo';
import LegalLayout from '@/components/LegalLayout';
import { SITE } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How Signal Harbor handles information collected through this website.',
  path: '/privacy/',
  image: OG.company,
  imageAlt: 'Signal Harbor privacy policy',
});

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>
        Signal Harbor is an AI visibility intelligence and GEO services company
        operating the website at signalharborai.com. This notice
        explains what information may be collected through the website and how it
        is used.
      </p>

      <h2>Information we may collect</h2>
      <ul>
        <li><strong>Booking data:</strong> Scheduling is provided through Calendly, embedded on our booking page. When you schedule a call, Calendly collects the details you submit, such as your name, email, and any notes you choose to share. When the booking page loads, Calendly may also process technical information such as your IP address, browser characteristics, and usage data under its own privacy policy.</li>
        <li><strong>Contact data:</strong> If you email us, we receive your email address and the contents of your message.</li>
        <li><strong>Analytics data:</strong> This website uses Google Analytics 4, which helps Signal Harbor understand aggregate site usage. It may collect page views, approximate technical information, device and browser information, referrer information, and interactions with site elements such as buttons and links.</li>
      </ul>

      <h2>Google Analytics</h2>
      <p>
        Signal Harbor does not intentionally send names, email addresses,
        Calendly form contents, or sensitive business information to Google
        Analytics. Google processes analytics data under its own terms and
        privacy policies; see{' '}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">How Google uses information from sites that use its services</a>.
        Visitors may limit or prevent analytics collection using browser
        controls, content-blocking tools, or Google&rsquo;s{' '}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">browser opt-out</a>.
      </p>

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
