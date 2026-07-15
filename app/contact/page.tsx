import type { Metadata } from 'next';
import Container from '@/components/Container';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Frugelle team.',
};

export default function ContactPage() {
  return (
    <Container className="py-14">
      <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
        Contact
      </span>
      <h1 className="mt-1 font-heading text-4xl font-bold text-ink">Say hello</h1>

      <div className="prose prose-brand mt-8 max-w-2xl">
        <p>
          Have a question, a story idea, or a partnership request? Reach out any time, we read
          every email.
        </p>
        <p>
          <a href="mailto:hello@frugelle.com">hello@frugelle.com</a>
        </p>
        <p className="text-sm text-ink/60">
          Replace this address with your real inbox before launch. For a working contact form
          instead of a mailto link, connect a form service such as Formspree or Resend, since
          this V1 build ships without a backend email service.
        </p>
      </div>
    </Container>
  );
}
