'use client';

import { FormEvent, useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterForm({
  headline = 'Get the free Frugelle Money Reset Kit',
  subhead = 'A budget template, a debt payoff tracker, and a 30-day savings challenge. Straight to your inbox.',
  compact = false,
}: {
  headline?: string;
  subhead?: string;
  compact?: boolean;
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Subscription failed');

      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        className={`rounded-xl bg-brand-700 text-cream ${compact ? 'p-4' : 'p-6'}`}
      >
        <p className="font-heading text-lg font-semibold">You&apos;re in.</p>
        <p className="mt-1 text-sm text-cream/90">
          Check your inbox for the Money Reset Kit. If you don&apos;t see it in a few minutes, check spam.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-xl bg-brand-700 text-cream ${compact ? 'p-4' : 'p-6'}`}>
      {!compact && <p className="font-heading text-lg font-semibold">{headline}</p>}
      {!compact && <p className="mt-1 text-sm text-cream/90">{subhead}</p>}
      {compact && <p className="text-sm font-semibold">{headline}</p>}

      <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full flex-1 rounded-lg border-0 px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-brand-300"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="whitespace-nowrap rounded-lg bg-cream px-4 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-50 disabled:opacity-60"
        >
          {status === 'loading' ? 'Sending...' : 'Send it to me'}
        </button>
      </form>

      {status === 'error' && (
        <p className="mt-2 text-xs text-cream/90">
          Something went wrong on our end. Mind trying again in a minute?
        </p>
      )}

      <p className="mt-2 text-xs text-cream/70">No spam. Unsubscribe whenever you want.</p>
    </div>
  );
}
