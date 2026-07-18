import Link from 'next/link';
import Image from 'next/image';
import { PostMeta } from '@/lib/posts';
import { urlFor } from '@/lib/sanity';
import { getCategoryBySlug } from '@/lib/site-config';

export default function PostCard({ post }: { post: PostMeta }) {
  const category = getCategoryBySlug(post.category);
  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(800).height(500).url()
    : null;

  return (
    <Link
      href={`/${post.category}/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-brand-100 bg-white transition hover:shadow-lg"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-brand-100">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {category && (
          <span className="w-fit rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
            {category.shortName}
          </span>
        )}
        <h3 className="font-heading text-lg font-semibold leading-snug text-ink group-hover:text-brand-700">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm text-ink/70">{post.metaDescription}</p>
      </div>
    </Link>
  );
}
