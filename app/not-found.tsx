import Link from 'next/link';
import Container from '@/components/Container';

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center py-32 text-center">
      <p className="font-heading text-6xl font-bold text-brand-700">404</p>
      <h1 className="mt-4 font-heading text-2xl font-bold text-ink">
        This page moved, or it never existed.
      </h1>
      <p className="mt-2 max-w-md text-ink/70">
        Either way, let&apos;s get you back to something useful.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-brand-800"
      >
        Back to the homepage
      </Link>
    </Container>
  );
}
