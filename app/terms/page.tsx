import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Use | Signal Harbor',
  description: 'Terms governing use of the Signal Harbor website.',
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Use">
      <p>
        These terms govern your use of the Signal Harbor website at
        signalharborconsulting.com. By using the site, you agree to them.
      </p>

      <h2>Informational use</h2>
      <p>
        The website is provided for general informational purposes about Signal
        Harbor’s services. Content may change at any time without notice.
      </p>

      <h2>No guarantees</h2>
      <p>
        Signal Harbor measures and improves observable AI visibility signals. We
        do not guarantee AI placement, ranking, recommendation, citation, sales
        lift, or any specific model behavior. AI systems are probabilistic and
        change over time, and results can vary by model, location, account
        state, prompt wording, source availability, and time.
      </p>

      <h2>Not professional advice</h2>
      <p>
        Nothing on this website is legal, financial, medical, or compliance
        advice. You should consult appropriately qualified professionals for
        decisions in those areas.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The Signal Harbor name, logo, content, and visual design are the property
        of Signal Harbor and may not be copied or reused without permission,
        except as allowed by law.
      </p>

      <h2>Third-party links</h2>
      <p>
        The site links to third-party services such as Calendly. We are not
        responsible for the content, policies, or practices of third-party
        websites.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Signal Harbor is not liable for
        any indirect, incidental, or consequential damages arising from your use
        of this website. The website is provided “as is” without warranties of
        any kind.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to{' '}
        <a href={SITE.mailto}>{SITE.email}</a>.
      </p>
    </LegalLayout>
  );
}
