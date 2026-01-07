/**
 * Stripe Webhook Handler
 * Processes checkout.session.completed events
 * Sends purchase events to GA4 via Measurement Protocol
 * 
 * Route: /api/webhook/stripe
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// GA4 Measurement Protocol Configuration
const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'G-GQFJVTN22P';
const GA4_API_SECRET = process.env.GA4_API_SECRET!;

interface PurchaseEventParams {
  client_id: string;
  transaction_id: string;
  value: number;
  currency: string;
  items: Array<{
    item_id: string;
    item_name: string;
    price: number;
  }>;
}

/**
 * Send purchase event to GA4 Measurement Protocol
 */
async function sendGA4PurchaseEvent(params: PurchaseEventParams): Promise<void> {
  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${GA4_API_SECRET}`;

  const payload = {
    client_id: params.client_id,
    events: [
      {
        name: 'purchase',
        params: {
          transaction_id: params.transaction_id,
          value: params.value,
          currency: params.currency,
          items: params.items,
        },
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('[Stripe Webhook] GA4 MP request failed:', response.status);
    } else {
      console.log('[Stripe Webhook] GA4 purchase event sent:', params.transaction_id);
    }
  } catch (error) {
    console.error('[Stripe Webhook] Error sending GA4 event:', error);
  }
}

/**
 * Idempotency check to prevent duplicate events
 * In production, use a database or Redis
 */
const processedEvents = new Set<string>();

function isEventProcessed(eventId: string): boolean {
  return processedEvents.has(eventId);
}

function markEventProcessed(eventId: string): void {
  processedEvents.add(eventId);
  
  // Clean up old events after 24 hours (basic memory management)
  setTimeout(() => {
    processedEvents.delete(eventId);
  }, 24 * 60 * 60 * 1000);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('[Stripe Webhook] Signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Idempotency check
    if (isEventProcessed(event.id)) {
      console.log('[Stripe Webhook] Event already processed:', event.id);
      return NextResponse.json({ received: true, duplicate: true });
    }

    // Handle checkout.session.completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Extract purchase details
      const transactionId = session.id;
      const amountTotal = session.amount_total ? session.amount_total / 100 : 0; // Convert cents to dollars
      const currency = session.currency?.toUpperCase() || 'USD';
      
      // Get plan details from metadata (you should set this when creating checkout session)
      const planId = session.metadata?.plan_id || 'unknown';
      const planName = session.metadata?.plan_name || 'Unknown Plan';

      // Generate or retrieve client_id
      // In production, you should store this in session metadata during checkout
      const clientId = session.client_reference_id || session.customer?.toString() || 'unknown';

      // Send to GA4
      await sendGA4PurchaseEvent({
        client_id: clientId,
        transaction_id: transactionId,
        value: amountTotal,
        currency: currency,
        items: [
          {
            item_id: planId,
            item_name: planName,
            price: amountTotal,
          },
        ],
      });

      // Mark event as processed
      markEventProcessed(event.id);

      console.log('[Stripe Webhook] Purchase processed:', {
        transaction_id: transactionId,
        plan_id: planId,
        value: amountTotal,
      });
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('[Stripe Webhook] Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Disable body parsing - Stripe needs raw body for signature verification
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
