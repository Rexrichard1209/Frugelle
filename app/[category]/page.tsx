import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import PostCard from '@/components/PostCard';
import NewsletterForm from '@/components/NewsletterForm';
import { getPostsByCategory } from '@/lib/posts';
import { categories, getCategoryBySlug } from '@/lib/site-config';

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string };
}): Metadata {
  const category = getCategoryBySlug(params.category);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
    openGraph: {
      title: category.name,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategoryBySlug(params.category);
  if (!category) notFound();

  const posts = await getPostsByCategory(category.slug);

  return (
    <Container className="py-14">
      <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
        Category
      </span>
      <h1 className="mt-1 font-heading text-4xl font-bold text-ink">{category.name}</h1>
      <p className="mt-3 max-w-2xl text-lg text-ink/70">{category.description}</p>

      {posts.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-ink/60">New posts in this category are coming soon.</p>
      )}

      <div className="mt-14 max-w-md">
        <NewsletterForm />
      </div>
    </Container>
  );
}
