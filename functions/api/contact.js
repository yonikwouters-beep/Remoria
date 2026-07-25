/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Body (JSON):
 *   { naam: string, email: string, afdeling?: string, bericht: string, website?: string }
 *   `website` is a honeypot; leave empty.
 *
 * Environment variables (Cloudflare Pages → Settings → Environment variables):
 *   RESEND_WEBSITE_CONTACTFORM — Resend API key
 *   CONTACT_TO_EMAIL           — optional, default hello@remoria.eu
 *   CONTACT_FROM_EMAIL         — optional, default Remoria <hello@remoria.eu>
 *                                (moet een geverifieerd Resend-adres/domein zijn)
 */
export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const naam = String(body.naam ?? '').trim();
    const email = String(body.email ?? '').trim();
    const afdeling = String(body.afdeling ?? '').trim();
    const bericht = String(body.bericht ?? '').trim();
    const honeypot = String(body.website ?? '').trim();

    // Bot filled the hidden field — pretend success
    if (honeypot) {
      return json({ ok: true }, 200);
    }

    if (!naam || !email || !bericht) {
      return json({ error: 'Missing required fields' }, 400);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: 'Invalid email' }, 400);
    }

    if (naam.length > 200 || email.length > 320 || afdeling.length > 100 || bericht.length > 5000) {
      return json({ error: 'Field too long' }, 400);
    }

    const apiKey = env.RESEND_WEBSITE_CONTACTFORM;
    if (!apiKey) {
      console.error('Missing RESEND_WEBSITE_CONTACTFORM');
      return json({ error: 'Email service not configured' }, 500);
    }

    const to = env.CONTACT_TO_EMAIL || 'hello@remoria.eu';
    const from = env.CONTACT_FROM_EMAIL || 'Remoria <hello@remoria.eu>';

    const subject = afdeling
      ? `Contactformulier: ${afdeling} — ${naam}`
      : `Contactformulier — ${naam}`;

    const text = [
      `Naam: ${naam}`,
      `E-mail: ${email}`,
      afdeling ? `Afdeling: ${afdeling}` : null,
      '',
      'Bericht:',
      bericht,
    ]
      .filter((line) => line !== null)
      .join('\n');

    const html = `
      <div style="font-family: system-ui, sans-serif; line-height: 1.5; color: #1C2A43;">
        <p><strong>Naam:</strong> ${escapeHtml(naam)}</p>
        <p><strong>E-mail:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        ${afdeling ? `<p><strong>Afdeling:</strong> ${escapeHtml(afdeling)}</p>` : ''}
        <p><strong>Bericht:</strong></p>
        <p style="white-space: pre-wrap;">${escapeHtml(bericht)}</p>
      </div>
    `.trim();

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    const result = await resendRes.json();

    if (!resendRes.ok) {
      console.error('Resend error:', result);
      return json({ error: result.message || 'Failed to send email' }, 500);
    }

    return json({ ok: true, id: result.id }, 200);
  } catch (err) {
    console.error('Contact function error:', err);
    return json({ error: 'Internal server error' }, 500);
  }
}

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
