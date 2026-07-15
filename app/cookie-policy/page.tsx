import type { Metadata } from 'next';
import Container from '@/components/Container';
import { SITE_NAME } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: `How ${SITE_NAME} uses cookies and similar technologies.`,
};

export default function CookiePolicyPage() {
  return (
    <Container className="py-14">
      <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
        Legal
      </span>
      <h1 className="mt-1 font-heading text-4xl font-bold text-ink">Cookie Policy</h1>
      <p className="mt-2 text-sm text-ink/50">Last updated: [add date before publishing]</p>

      <div className="prose prose-brand mt-8 max-w-2xl">
        <p>
          This is a starter template, not legal advice. Have it reviewed by a lawyer before you
          publish it, especially if you plan to serve readers in the EU or UK, where cookie
          consent requirements are stricter.
        </p>

        <h2>What Are Cookies</h2>
        <p>
          Cookies are small text files stored on your device that help websites remember
          information about your visit.
        </p>

        <h2>Cookies We Use</h2>
        <ul>
          <li>
            <strong>Analytics cookies</strong>, such as Vercel Analytics, to understand how
            visitors use the site.
          </li>
          <li>
            <strong>Advertising cookies</strong>, once display ads are activated on the site
            (for example through Mediavine, AdThrive, or Google AdSense), which may be used by
            ad partners to serve relevant ads.
          </li>
          <li>
            <strong>Pinterest Tag</strong>, which may set cookies to measure the performance of
            content shared to Pinterest.
          </li>
        </ul>

        <h2>Managing Cookies</h2>
        <p>
          Most browsers let you block or delete cookies through their settings. Blocking
          cookies may affect how parts of this site function.
        </p>
      </div>
    </Container>
  );
}
