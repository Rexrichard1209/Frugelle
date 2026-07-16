import { sanityClient, SanityImage } from './sanity';

export type PostMeta = {
  title: string;
  slug: string;
  metaDescription: string;
  category: string;
  publishDate: string;
  updatedDate?: string;
  featuredImage: SanityImage;
  focusKeyword: string;
  financialDisclaimer?: boolean;
  hasAffiliateLinks?: boolean;
};

export type Post = PostMeta & { body: any[] };
const metaFields = `
  title,
  "slug": slug.current,
  metaDescription,
  category,
  publishDate,
  updatedDate,
  featuredImage,
  focusKeyword,
  financialDisclaimer,
  hasAffiliateLinks
`;

export async function getAllPostsMeta(): Promise<PostMeta[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishDate desc){${metaFields}}`,
  );
}

export async function getPostsByCategory(categorySlug: string): Promise<PostMeta[]> {
  return sanityClient.fetch(
    `*[_type == "post" && category == $category] | order(publishDate desc){${metaFields}}`,
    { category: categorySlug },
  );
}

export async function getRelatedPosts(
  currentSlug: string,
  categorySlug: string,
  limit = 3,
): Promise<PostMeta[]> {
  const posts = await getPostsByCategory(categorySlug);
  return posts.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

/** Returns every {category, slug} pair, used for generateStaticParams on the post route. */
export async function getAllPostParams(): Promise<{ category: string; slug: string }[]> {
  const posts = await getAllPostsMeta();
  return posts.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function getPostBySlug(categorySlug: string, slug: string): Promise<Post | null> {
  const post = await sanityClient.fetch(
    `*[_type == "post" && category == $category && slug.current == $slug][0]{${metaFields}, body}`,
    { category: categorySlug, slug },
  );

  return post || null;
}
