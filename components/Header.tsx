'use client';

import Link from 'next/link';
import { useState } from 'react';
import { categories, SITE_NAME } from '@/lib/site-config';
import Container from './Container';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-cream/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-heading text-2xl font-bold text-brand-800">
          {SITE_NAME}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="text-sm font-medium text-ink/80 transition hover:text-brand-700"
            >
              {cat.shortName}
            </Link>
          ))}
          <Link
            href="/about"
            className="text-sm font-medium text-ink/80 transition hover:text-brand-700"
          >
            About
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className="h-0.5 w-6 bg-ink" />
          <span className="h-0.5 w-6 bg-ink" />
          <span className="h-0.5 w-6 bg-ink" />
        </button>
      </Container>

      {open && (
        <div className="border-t border-brand-100 bg-cream md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm font-medium text-ink/80 hover:bg-brand-50"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm font-medium text-ink/80 hover:bg-brand-50"
            >
              About
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
