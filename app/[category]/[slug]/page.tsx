import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import Container from '@/components/Container';
import PostCard from '@/components/PostCard';
import NewsletterForm from '@/components/NewsletterForm';
import FinancialDisclaimer from '@/components/FinancialDisclaimer';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import { getAllPostParams, getPostBySlug, getRelatedPosts } from '@/lib/posts';
import { urlFor } from '@/lib/sanity';
import { DISCLAIMER_CATEGORIES, SITE_URL, getCategoryBySlug } from '@/lib/site-config';

export const revalidate = 60;

export async function generateStaticParams() {
  return getAllPostParams();
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.category, params.slug);
  if (!post) return {};

  const url = `${SITE_URL}/${post.category}/${post.slug}`;
  const imageUrl = post.featuredImage ? urlFor(post.featuredImage).width(1200).height(630).url() : undefined;

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.metaDescription,
      url,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate || post.publishDate,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const post = await getPostBySlug(params.category, params.slug);
  if (!post) notFound();

  const category = getCategoryBySlug(post.category);
  const related = await getRelatedPosts(post.slug, post.category);
  const url = `${SITE_URL}/${post.category}/${post.slug}`;
  const heroImageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(1600).height(700).url()
    : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    image: heroImageUrl || undefined,
    datePublished: post.publishDate,
    dateModified: post.updatedDate || post.publishDate,
    mainEntityOfPage: url,
    author: {
      '@type': 'Organization',
      name: 'Frugelle',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Frugelle',
    },
  };

  return (
    <article>
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {heroImageUrl && (
<div className="relative aspect-[3/2] w-full bg-brand-100">         <Image
            src={heroImageUrl}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      <Container className="py-10">
        {category && (
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            {category.name}
          </span>
        )}
        <h1 className="mt-2 font-heading text-3xl font-bold leading-tight text-ink md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-ink/50">
          Published {formatDate(post.publishDate)}
          {post.updatedDate && post.updatedDate !== post.publishDate
            ? ` · Updated ${formatDate(post.updatedDate)}`
            : ''}
        </p>

        <div className="mt-8 max-w-3xl">
          {DISCLAIMER_CATEGORIES.includes(post.category) && <FinancialDisclaimer />}
          {post.hasAffiliateLinks && <AffiliateDisclosure />}

          <div className="prose prose-brand max-w-none prose-headings:font-heading">
            <PortableText value={post.body} />
          </div>
        </div>

        <div className="mt-12 max-w-md">
          <NewsletterForm />
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-ink">Related posts</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </article>
  );
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
