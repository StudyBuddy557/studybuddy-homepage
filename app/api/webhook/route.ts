// app/api/webhook/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { FacebookConversionAPI } from '@/lib/analytics/server/facebook-capi';
import { PurchaseData, UserData } from '@/lib/analytics/core/types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const fbCAPI = new FacebookConversionAPI();

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const customer = session.customer_details;
    const metadata = session.metadata || {};

    const purchaseData: PurchaseData = {
      transactionId: session.id,
      value: (session.amount_total || 0) / 100,
      currency: (session.currency || 'usd').toUpperCase(),
      tax: (session.total_details?.amount_tax || 0) / 100,
      items: [
        {
          item_id: metadata.plan_id || 'basic',
          item_name: metadata.plan_name || 'TEAS 7 Basic Plan',
          item_category: 'subscription',
          price: (session.amount_total || 0) / 100,
          quantity: 1,
          currency: (session.currency || 'usd').toUpperCase(),
        },
      ],
    };

    const userData: Partial<UserData> = {
      email: customer?.email || undefined,
      phone: customer?.phone || undefined,
      firstName: customer?.name?.split(' ')[0],
      lastName: customer?.name?.split(' ').slice(1).join(' '),
      city: customer?.address?.city || undefined,
      state: customer?.address?.state || undefined,
      country: customer?.address?.country || undefined,
      zipCode: customer?.address?.postal_code || undefined,
      externalId: session.client_reference_id || undefined,
      fbp: metadata.fbp || undefined,
      fbc: metadata.fbc || undefined,
    };

    const eventSourceUrl = metadata.checkout_url || `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`;

    try {
      await fbCAPI.trackPurchase(purchaseData, userData, eventSourceUrl);
      console.log('Server-side purchase tracked:', session.id);
    } catch (error) {
      console.error('Failed to track server-side purchase:', error);
    }
  }

  return NextResponse.json({ received: true });
}
