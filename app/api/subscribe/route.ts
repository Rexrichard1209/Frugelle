import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let email: string | undefined;

  try {
    const body = await request.json();
    email = body.email;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey || !groupId) {
    console.error('Missing MAILERLITE_API_KEY or MAILERLITE_GROUP_ID environment variables.');
    return NextResponse.json(
      { error: 'Newsletter signup is not configured yet.' },
      { status: 500 },
    );
  }

  try {
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        groups: [groupId],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('MailerLite API error:', errorBody);
      return NextResponse.json({ error: 'Subscription failed' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Newsletter subscribe error:', err);
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}
