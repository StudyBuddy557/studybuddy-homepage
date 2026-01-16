// app/api/webhook/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { FacebookConversionAPI } from '@/lib/analytics/server/facebook-capi';
import { PurchaseData, UserData } from '@/lib/analytics/core/types';

const STRIPE_API_VERSION = '2024-12-18.acacia';

function getStripeClient(secretKey: string) {
  // Lazy init only when we actually have a key
  return new Stripe(secretKey, {
    // Keep your existing apiVersion value; cast avoids TS conflicts if Stripe typings are strict
    apiVersion: STRIPE_API_VERSION as any,
  });
}

export async function POST(request: NextRequest) {
  // 1) Hard guard: If webhook is not configured, do NOT crash build or runtime
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !stripeWebhookSecret) {
    return NextResponse.json(
      { ok: false, error: 'Webhook not configured' },
      { status: 501 }
    );
  }

  // 2) Signature guard
  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json(
      { ok: false, error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  // 3) Read body and verify signature
  const body = await request.text();

  let event: Stripe.Event;
  try {
    const stripe = getStripeClient(stripeSecretKey);
    event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Webhook signature verification failed';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  // 4) Handle only the event you care about
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const customer = session.customer_details;
    const metadata = session.metadata || {};

    const total = session.amount_total || 0;
    const currency = (session.currency || 'usd').toUpperCase();

    const purchaseData: PurchaseData = {
      transactionId: session.id,
      value: total / 100,
      currency,
      tax: (session.total_details?.amount_tax || 0) / 100,
      items: [
        {
          item_id: metadata.plan_id || 'basic',
          item_name: metadata.plan_name || 'TEAS 7 Basic Plan',
          item_category: 'subscription',
          price: total / 100,
          quantity: 1,
          currency,
        },
      ],
    };

    const userData: Partial<UserData> = {
      // NOTE: This is server-side only. Ensure your FacebookConversionAPI hashes/sanitizes as required.
      email: customer?.email || undefined,
      phone: customer?.phone || undefined,
      firstName: customer?.name?.split(' ')[0] || undefined,
      lastName: customer?.name?.split(' ').slice(1).join(' ') || undefined,
      city: customer?.address?.city || undefined,
      state: customer?.address?.state || undefined,
      country: customer?.address?.country || undefined,
      zipCode: customer?.address?.postal_code || undefined,
      externalId: session.client_reference_id || undefined,
      fbp: metadata.fbp || undefined,
      fbc: metadata.fbc || undefined,
    };

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
    const eventSourceUrl =
      metadata.checkout_url || (siteUrl ? `${siteUrl}/checkout` : undefined);

    // 5) Lazy init fbCAPI only when needed
    try {
      const fbCAPI = new FacebookConversionAPI();
      await fbCAPI.trackPurchase(purchaseData, userData, eventSourceUrl);
      console.log('Server-side purchase tracked:', session.id);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      console.error('Failed to track server-side purchase:', msg);
    }
  }

  return NextResponse.json({ received: true });
}
