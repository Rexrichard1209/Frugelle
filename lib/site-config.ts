export const SITE_NAME = 'Frugelle';

export const SITE_TAGLINE = 'Personal finance for women who are done feeling behind.';

export const SITE_DESCRIPTION =
  'Frugelle is a personal finance blog for women 25 to 42 covering budgeting, debt payoff, investing basics, side hustles, frugal living, and money mindset. Real numbers, no lectures.';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://frugelle.vercel.app';

export type Category = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
};

export const categories: Category[] = [
  {
    slug: 'budgeting-saving',
    name: 'Budgeting & Saving',
    shortName: 'Budgeting',
    description:
      'Zero-based budgets, saving strategies, and step by step plans for making every dollar count.',
  },
  {
    slug: 'debt-payoff',
    name: 'Debt Payoff',
    shortName: 'Debt Payoff',
    description:
      'Snowball vs avalanche breakdowns, payoff strategy, and honest talk about carrying debt.',
  },
  {
    slug: 'investing-basics',
    name: 'Investing Basics',
    shortName: 'Investing',
    description:
      'Beginner-friendly explainers on investing and building long-term wealth, no jargon required.',
  },
  {
    slug: 'side-hustles-income',
    name: 'Side Hustles & Income',
    shortName: 'Side Hustles',
    description:
      'Real ways to bring in extra income, from weekend side hustles to negotiating your pay.',
  },
  {
    slug: 'frugal-living',
    name: 'Frugal Living',
    shortName: 'Frugal Living',
    description:
      'Practical ways to spend less without feeling deprived, from groceries to everyday habits.',
  },
  {
    slug: 'money-mindset',
    name: 'Money Mindset & Habits',
    shortName: 'Money Mindset',
    description:
      'The psychology of spending, saving, and building habits that actually stick.',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/** Categories that require the "not financial advice" disclaimer at the top of a post. */
export const DISCLAIMER_CATEGORIES = ['investing-basics', 'debt-payoff', 'budgeting-saving'];
