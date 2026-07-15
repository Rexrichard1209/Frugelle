import type { MetadataRoute } from 'next';
import { getAllPostsMeta } from '@/lib/posts';
import { SITE_URL, categories } from '@/lib/site-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/cookie-policy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/disclosure`, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/${cat.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const posts = await getAllPostsMeta();
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/${post.category}/${post.slug}`,
    lastModified: post.updatedDate || post.publishDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...postPages];
}
