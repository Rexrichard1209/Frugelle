import type { Metadata } from 'next';
import Container from '@/components/Container';
import { SITE_NAME } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${SITE_NAME} collects, uses, and protects your information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <Container className="py-14">
      <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
        Legal
      </span>
      <h1 className="mt-1 font-heading text-4xl font-bold text-ink">Privacy Policy</h1>
      <p className="mt-2 text-sm text-ink/50">Last updated: [add date before publishing]</p>

      <div className="prose prose-brand mt-8 max-w-2xl">
        <p>
          This is a starter template, not legal advice. Have it reviewed by a lawyer familiar
          with the privacy laws in the regions your readers come from before you publish it.
        </p>

        <h2>Information We Collect</h2>
        <p>
          When you subscribe to our newsletter, we collect the email address you provide. We
          use analytics tools to understand how visitors use the site, which may collect
          information such as your approximate location, device type, and pages viewed.
        </p>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>To send the newsletter and any lead magnets you request, such as the Money Reset Kit.</li>
          <li>To understand which content is useful so we can publish more of it.</li>
          <li>To operate, maintain, and improve the site.</li>
        </ul>

        <h2>Email Service Provider</h2>
        <p>
          Newsletter subscriptions are processed and stored by our email service provider,
          MailerLite. Their handling of your data is governed by their own privacy policy.
        </p>

        <h2>Analytics</h2>
        <p>
          We use Vercel Analytics and Google Search Console to understand site traffic. These
          tools may use cookies or similar technologies. See our{' '}
          <a href="/cookie-policy">Cookie Policy</a> for details.
        </p>

        <h2>Your Choices</h2>
        <p>
          You can unsubscribe from our newsletter at any time using the link in any email we
          send. To request that we delete your data, contact us at the address on our{' '}
          <a href="/contact">Contact</a> page.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>This site is not directed at children under 13, and we do not knowingly collect data from them.</p>

        <h2>Changes to This Policy</h2>
        <p>We may update this policy from time to time. Changes will be posted on this page.</p>
      </div>
    </Container>
  );
}
