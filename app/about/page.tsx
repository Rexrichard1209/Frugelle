import type { Metadata } from 'next';
import Container from '@/components/Container';
import NewsletterForm from '@/components/NewsletterForm';

export const metadata: Metadata = {
  title: 'About',
  description: 'Why Frugelle exists and who it is for.',
};

export default function AboutPage() {
  return (
    <Container className="py-14">
      <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
        About
      </span>
      <h1 className="mt-1 font-heading text-4xl font-bold text-ink">
        The friend who&apos;s actually good with money.
      </h1>

      <div className="prose prose-brand mt-8 max-w-2xl">
        <p>
          Frugelle started with a simple frustration: most personal finance content is written
          for people who already have money figured out, or it talks down to the people who
          don&apos;t. Neither one is very useful at 11pm when you&apos;re trying to work out how
          to get to payday.
        </p>
        <p>
          This site is for women who are done feeling behind on money. Not because they did
          something wrong, but because nobody ever handed them a plan that fit their actual
          life. You&apos;ll find budgeting that works on a real income, debt payoff strategy
          that accounts for how motivation actually works, plain-spoken investing basics, side
          hustle ideas that don&apos;t require a following, and the mindset work that makes all
          of it stick.
        </p>
        <p>
          Every post is written to be specific, honest, and useful the same day you read it. No
          hollow encouragement, no shame, no jargon you need a dictionary for. Just what
          actually works, one plan at a time.
        </p>
      </div>

      <div className="mt-10 max-w-md">
        <NewsletterForm />
      </div>
    </Container>
  );
}
