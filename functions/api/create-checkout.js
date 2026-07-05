/**
 * Cloudflare Pages Function — POST /api/create-checkout
 *
 * Body (JSON):
 *   { priceId: string, endorsely_referral?: string }
 *
 * Environment variables (stel in via Cloudflare Pages → Settings → Environment variables):
 *   STRIPE_SECRET_KEY   — jouw Stripe secret key (sk_live_... of sk_test_...)
 *   SITE_URL            — bv. https://remoria.pages.dev  (geen trailing slash)
 */
export async function onRequestPost({ request, env }) {
  try {
    const { priceId, endorsely_referral } = await request.json();

    if (!priceId) {
      return new Response(JSON.stringify({ error: 'Missing priceId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const siteUrl = env.SITE_URL || 'https://remoria.pages.dev';

    // Bouw Stripe sessie payload op
    const params = new URLSearchParams();
    params.append('mode', 'payment');
    params.append('line_items[0][price]', priceId);
    params.append('line_items[0][quantity]', '1');
    params.append('success_url', `${siteUrl}/bedankt?session_id={CHECKOUT_SESSION_ID}`);
    params.append('cancel_url', `${siteUrl}/prijzen`);
    params.append('locale', 'nl');

    // Endorsely referral tracking
    if (endorsely_referral) {
      params.append('metadata[endorsely_referral]', endorsely_referral);
    }

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const session = await stripeRes.json();

    if (!stripeRes.ok) {
      console.error('Stripe error:', session);
      return new Response(JSON.stringify({ error: session.error?.message || 'Stripe error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Function error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
