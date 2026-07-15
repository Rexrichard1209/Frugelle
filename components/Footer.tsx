import Link from 'next/link';
import Container from './Container';
import NewsletterForm from './NewsletterForm';
import { SITE_NAME, categories } from '@/lib/site-config';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-brand-100 bg-brand-50/60">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-heading text-xl font-bold text-brand-800">{SITE_NAME}</p>
            <p className="mt-2 max-w-xs text-sm text-ink/70">
              Personal finance for women who are done feeling behind. Real numbers, no lectures.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Explore</p>
            <ul className="mt-3 space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/${cat.slug}`} className="text-sm text-ink/70 hover:text-brand-700">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <NewsletterForm compact headline="Get the free Money Reset Kit" />
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-ink/60">
              <li>
                <Link href="/about" className="hover:text-brand-700">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-700">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-brand-700">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-brand-700">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/disclosure" className="hover:text-brand-700">
                  Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 text-xs text-ink/50">
          &copy; {year} {SITE_NAME}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
