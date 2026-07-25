/**
 * Cloudflare Pages Function — POST /api/newsletter
 *
 * Body (JSON):
 *   { email: string, website?: string }
 *   `website` is a honeypot; leave empty.
 *
 * Environment variables (Cloudflare Pages → Settings → Environment variables):
 *   RESEND_WEBSITE_CONTACTFORM     — Resend API key (same as contact form)
 *   RESEND_NEWSLETTER_SEGMENT_ID   — optional; defaults to website newsletter segment
 */
const DEFAULT_SEGMENT_ID = '69b1c54c-af43-42dd-9e35-c6b5c3c03ba3';

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const email = String(body.email ?? '').trim().toLowerCase();
    const honeypot = String(body.website ?? '').trim();

    if (honeypot) {
      return json({ ok: true }, 200);
    }

    if (!email) {
      return json({ error: 'Missing email' }, 400);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320) {
      return json({ error: 'Invalid email' }, 400);
    }

    const apiKey = env.RESEND_WEBSITE_CONTACTFORM;
    if (!apiKey) {
      console.error('Missing RESEND_WEBSITE_CONTACTFORM');
      return json({ error: 'Newsletter service not configured' }, 500);
    }

    const segmentId = env.RESEND_NEWSLETTER_SEGMENT_ID || DEFAULT_SEGMENT_ID;
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    };

    const createRes = await fetch('https://api.resend.com/contacts', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email,
        unsubscribed: false,
        segments: [{ id: segmentId }],
      }),
    });

    const createResult = await createRes.json().catch(() => ({}));

    if (createRes.ok) {
      return json({ ok: true, id: createResult.id }, 200);
    }

    // Contact already exists — still add them to the newsletter segment
    const alreadyExists =
      createRes.status === 409 ||
      /already exists|duplicate|conflict/i.test(String(createResult.message ?? ''));

    if (alreadyExists) {
      const addRes = await fetch(
        `https://api.resend.com/contacts/${encodeURIComponent(email)}/segments/${segmentId}`,
        { method: 'POST', headers: { Authorization: `Bearer ${apiKey}` } },
      );

      if (addRes.ok || addRes.status === 409) {
        return json({ ok: true }, 200);
      }

      const addResult = await addRes.json().catch(() => ({}));
      console.error('Resend add-to-segment error:', addResult);
      return json({ error: addResult.message || 'Failed to subscribe' }, 500);
    }

    console.error('Resend create contact error:', createResult);
    return json({ error: createResult.message || 'Failed to subscribe' }, 500);
  } catch (err) {
    console.error('Newsletter function error:', err);
    return json({ error: 'Internal server error' }, 500);
  }
}

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
