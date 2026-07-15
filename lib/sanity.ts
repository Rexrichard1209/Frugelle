import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export type SanityImage = {
  asset?: { _ref: string; _type: string };
  [key: string]: unknown;
};

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}
