import Link from 'next/link';
import Container from '@/components/Container';
import PostCard from '@/components/PostCard';
import NewsletterForm from '@/components/NewsletterForm';
import { getAllPostsMeta } from '@/lib/posts';

export const revalidate = 60;
import { categories } from '@/lib/site-config';

export default async function HomePage() {
  const allPosts = await getAllPostsMeta();
  const recentPosts = allPosts.slice(0, 6);

  return (
    <>
      <section className="border-b border-brand-100 bg-brand-50/50">
        <Container className="flex flex-col items-start gap-6 py-16 md:py-24">
          <span className="rounded-full bg-brand-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Personal finance for women 25 to 42
          </span>
          <h1 className="font-heading text-4xl font-bold leading-tight text-ink md:text-5xl">
            Money advice that sounds like a friend, not a lecture.
          </h1>
          <p className="max-w-xl text-lg text-ink/70">
            Budgeting, debt payoff, investing basics, side hustles, frugal living, and the money
            mindset work nobody talks about. Real numbers. No shame.
          </p>
          <div className="w-full max-w-md">
            <NewsletterForm />
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <h2 className="font-heading text-2xl font-bold text-ink">Start here</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="group rounded-xl border border-brand-100 bg-white p-5 transition hover:border-brand-300 hover:shadow-md"
            >
              <p className="font-heading text-lg font-semibold text-ink group-hover:text-brand-700">
                {cat.name}
              </p>
              <p className="mt-1 text-sm text-ink/60">{cat.description}</p>
            </Link>
          ))}
        </div>
      </Container>

      {recentPosts.length > 0 && (
        <Container className="pb-20">
          <h2 className="font-heading text-2xl font-bold text-ink">Recent posts</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      )}
    </>
  );
}
