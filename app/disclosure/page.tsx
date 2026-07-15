import type { Metadata } from 'next';
import Container from '@/components/Container';
import { SITE_NAME } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Disclosure',
  description: `${SITE_NAME}'s affiliate, advertising, and editorial disclosure.`,
};

export default function DisclosurePage() {
  return (
    <Container className="py-14">
      <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
        Legal
      </span>
      <h1 className="mt-1 font-heading text-4xl font-bold text-ink">Disclosure</h1>
      <p className="mt-2 text-sm text-ink/50">Last updated: [add date before publishing]</p>

      <div className="prose prose-brand mt-8 max-w-2xl">
        <p>
          This is a starter template, not legal advice. Have it reviewed by a lawyer, and keep
          it updated as your monetization changes.
        </p>

        <h2>Affiliate Links</h2>
        <p>
          Some posts on this site may contain affiliate links to products or services we
          recommend, such as budgeting apps, banking tools, or investing platforms. If you
          click one of these links and make a purchase, we may earn a commission at no extra
          cost to you. Posts containing affiliate links carry a visible disclosure at the top of
          the post, in line with FTC guidelines.
        </p>

        <h2>Advertising</h2>
        <p>
          Once this site qualifies for display advertising (for example through Mediavine,
          AdThrive, or Google AdSense), ads may appear in post content and the sidebar. Ad
          placement does not influence our editorial recommendations.
        </p>

        <h2>Editorial Independence</h2>
        <p>
          We only recommend products, services, and strategies we believe are genuinely useful
          to our readers. Affiliate relationships do not change what we choose to write about or
          how we describe it.
        </p>
      </div>
    </Container>
  );
}
