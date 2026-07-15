# Frugelle

Personal finance blog for women 25 to 42, covering budgeting, debt payoff, investing basics,
side hustles, frugal living, and money mindset. Built with Next.js (App Router), TypeScript,
and Tailwind CSS. Content is managed through a separate Sanity Studio dashboard, not code.

This project follows the `Frugelle_Project_Brief.pdf` and `Frugelle_Writing_Guide.pdf` it was
built from.

## How content works now

This site pulls its blog posts from [Sanity](https://www.sanity.io), a free hosted content
dashboard. The companion **frugelle-studio** project is where you log in to write and publish
posts, no code, no Git, no terminal, once it's set up.

This repo (`frugelle-site`) is the website itself: pages, design, and logic. It reads whatever
is published in Sanity and renders it.

## What's included

- 6 category pages, one per content pillar
- Posts are written and published through the Sanity Studio dashboard (see `frugelle-studio`)
- Home, About, Contact, Privacy Policy, Cookie Policy, Disclosure, and 404 pages
- Newsletter signup wired to the MailerLite API via a server route
- "Not financial advice" disclaimer, auto-shown on Budgeting, Debt Payoff, and Investing posts
- Affiliate disclosure component, ready for posts that add affiliate links
- Auto-generated `sitemap.xml` and `robots.txt`
- Open Graph, Twitter Card, and Schema.org `BlogPosting` structured data on every post
- Responsive, mobile-first layout

## One-time setup: connect Sanity

1. Set up `frugelle-studio` first (see that project's own README). You'll end up with a
   **Project ID** and a dataset name (`production`).
2. In this project, copy `.env.example` to `.env.local` and fill in:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

3. To bring your original 6 starter posts into Sanity, create an API token at
   [manage.sanity.io](https://manage.sanity.io) (your project → API → Tokens → Add API token,
   choose "Editor" permissions), add it to `.env.local` as `SANITY_API_TOKEN`, then run:

   ```bash
   npm install
   node scripts/migrate-to-sanity.mjs
   ```

   This reads the markdown files in `content/posts/`, uploads each featured image, and creates
   matching posts in Sanity. Run it once. Afterward, `content/posts/` is no longer used by the
   site, it's just a backup of the original text.

## Getting started

You'll need [Node.js](https://nodejs.org) 18.18 or later.

```bash
npm install
cp .env.example .env.local   # then fill in your Sanity project ID (see above)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Set these in `.env.local` for local development, and in your Vercel project settings for
production:

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Full site URL, used in metadata, sitemap, and canonical links. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | From manage.sanity.io, same as in `frugelle-studio`. |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Usually `production`. |
| `SANITY_API_TOKEN` | Only for the migration script | Not needed for the live site. |
| `MAILERLITE_API_KEY` | For newsletter | From MailerLite → Integrations → API. |
| `MAILERLITE_GROUP_ID` | For newsletter | The subscriber group new signups should join. |

## Publishing a new post from now on

You don't need this repo open at all for day-to-day writing:

1. Go to your Sanity Studio URL (see `frugelle-studio`'s README, something like
   `https://frugelle.sanity.studio` once deployed).
2. Click **Blog Post → Create**.
3. Fill in the title, category, meta description, featured image, and body.
4. Turn on **"Show Not Financial Advice Disclaimer"** for Budgeting, Debt Payoff, or Investing
   posts.
5. Click **Publish**.

The live site picks up the new post automatically, usually within about a minute, with no
redeploy needed.

## Images

The featured images are managed entirely through Sanity now, upload them directly in the
Studio when creating or editing a post. The old placeholder images in `public/images/` are
only used as a fallback default (`og-default.png`) and by the migration script; you don't need
to touch that folder going forward.

The favicon is `app/icon.svg`, a simple wordmark. Replace it with a real logo mark when one
exists.

## Deploying

1. Push this repository to GitHub.
2. In Vercel, import the repository as a new project. Vercel auto-detects Next.js, no config
   needed.
3. Add the environment variables from the table above in Vercel → Project → Settings →
   Environment Variables.
4. Deploy. Every push to `main` auto-deploys from then on. New Sanity posts do not require a
   new deploy, they show up automatically.
5. Once you attach a custom domain, update `NEXT_PUBLIC_SITE_URL` to match it and redeploy so
   metadata and the sitemap point to the right URL.

## Before you launch, for real

- Replace the `hello@frugelle.com` address in `app/contact/page.tsx` with a real inbox.
- Have a lawyer review `app/privacy-policy/page.tsx`, `app/cookie-policy/page.tsx`, and
  `app/disclosure/page.tsx`. They're solid starting templates, not legal advice.
- Set up the MailerLite group and connect the API keys.
- Deploy `frugelle-studio` so you have a permanent dashboard URL, not just a local preview.
- Update the "Last updated" dates on the legal pages.

## Project structure

```
app/                     Routes (App Router)
  [category]/             Category listing page
  [category]/[slug]/      Single post page, renders content from Sanity
  about/, contact/, ...    Static pages
  api/subscribe/           Newsletter signup API route
  sitemap.ts, robots.ts    Auto-generated SEO files
components/               Reusable UI components
lib/sanity.ts              Sanity client and image URL builder
lib/posts.ts                Content queries (GROQ) against Sanity
content/posts/             Original starter posts, kept as a backup, unused by the live site
scripts/migrate-to-sanity.mjs   One-time script to import the starter posts into Sanity
public/images/             Fallback social share image
```

## What's out of scope for this build (per the project brief)

User accounts, comments, e-commerce checkout are intentionally left out of this version. See
`Frugelle_Project_Brief.pdf` for the full V1 scope and what's planned for later phases
(digital product sales, display ads, affiliate links at scale).
