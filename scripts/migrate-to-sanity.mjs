// One-time script: reads the existing markdown posts in content/posts/ and creates matching
// documents in Sanity, including uploading each featured image.
//
// Run once, after setting SANITY_API_TOKEN, NEXT_PUBLIC_SANITY_PROJECT_ID, and
// NEXT_PUBLIC_SANITY_DATASET in .env.local:
//
//   node scripts/migrate-to-sanity.mjs
//
// Safe to run again on an empty dataset, but running it twice against a dataset that already
// has these posts will create duplicates. If you need to re-run it, delete the posts in the
// Studio first.

import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import matter from 'gray-matter';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local. Set both before running this script.',
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

function randomKey() {
  return Math.random().toString(36).slice(2, 10);
}

function textBlock(text, style, listItem) {
  const block = {
    _type: 'block',
    _key: randomKey(),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: randomKey(), text, marks: [] }],
  };
  if (listItem) {
    block.listItem = listItem;
    block.level = 1;
  }
  return block;
}

/** Very small markdown parser, matches the simple structure used in these starter posts:
 *  plain paragraphs, "## " and "### " headings, and "- " bullet lines. Good enough for a
 *  one-time migration; write new posts directly in the Studio going forward. */
function markdownToBlocks(markdown) {
  const lines = markdown.split('\n');
  const blocks = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith('### ')) {
      blocks.push(textBlock(line.slice(4), 'h3'));
    } else if (line.startsWith('## ')) {
      blocks.push(textBlock(line.slice(3), 'h2'));
    } else if (line.startsWith('- ')) {
      blocks.push(textBlock(line.slice(2), 'normal', 'bullet'));
    } else {
      blocks.push(textBlock(line, 'normal'));
    }
  }

  return blocks;
}

async function uploadImage(featuredImagePath) {
  const filename = featuredImagePath.replace(/^\/images\//, '');
  const filePath = path.join(process.cwd(), 'public', 'images', filename);

  if (!fs.existsSync(filePath)) {
    console.warn(`  Warning: image not found at ${filePath}, skipping image upload.`);
    return undefined;
  }

  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload('image', buffer, { filename });

  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
  };
}

async function migrate() {
  const dir = path.join(process.cwd(), 'content', 'posts');

  if (!fs.existsSync(dir)) {
    console.error('No content/posts folder found. Nothing to migrate.');
    return;
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  console.log(`Found ${files.length} post(s) to migrate.\n`);

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    const { data, content } = matter(raw);

    console.log(`Migrating: ${data.title}`);

    const featuredImage = data.featuredImage ? await uploadImage(data.featuredImage) : undefined;

    const doc = {
      _type: 'post',
      title: data.title,
      slug: { _type: 'slug', current: data.slug },
      metaDescription: data.metaDescription,
      category: data.category,
      publishDate: new Date(data.publishDate).toISOString(),
      updatedDate: data.updatedDate ? new Date(data.updatedDate).toISOString() : undefined,
      focusKeyword: data.focusKeyword,
      financialDisclaimer: Boolean(data.financialDisclaimer),
      hasAffiliateLinks: Boolean(data.hasAffiliateLinks),
      featuredImage,
      body: markdownToBlocks(content.trim()),
    };

    await client.create(doc);
    console.log('  Done.\n');
  }

  console.log('All posts migrated. Check your Studio to review and publish them.');
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
