import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

// ❌ OLD: Top-level initialization removed to prevent build crashes
// const stripe = new Stripe(...) 

export async function POST(req: NextRequest) {
  // ✅ NEW: Initialize Stripe inside the request handler
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ Missing STRIPE_SECRET_KEY in environment variables');
    return NextResponse.json({ error: 'Server Configuration Error' }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  });

  const body = await req.text();
  // Await headers() for Next.js 13/14/15 compatibility
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  // 1. Verify the Request is genuinely from Stripe
  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) throw new Error('Missing Stripe Webhook Secret');
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error(`⚠️  Webhook Signature Verification Failed: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // 2. Handle the Event
  try {
    if (event.type === 'checkout.session.completed' || event.type === 'invoice.payment_succeeded') {
      const session = event.data.object as any; // Using 'any' to handle differences between Session and Invoice objects

      // Look for email in customer_details first!
      const email = session.customer_details?.email || session.customer_email || session.email;

      // Handle amount for both Checkout Sessions (amount_total) and Invoices (amount_paid)
      const amountPaid = session.amount_total || session.amount_paid || session.amount_due || 0; 

      // Get the "Original Price" (Before Coupon)
      const originalPrice = session.amount_subtotal || session.subtotal || amountPaid;

      console.log(`💰 Payment from ${email}: Paid $${amountPaid / 100} | Value $${originalPrice / 100}`);

      if (email && adminDb) {
        // 3. Determine Tier based on ORIGINAL Price
        // $59.00 (5900 cents) = Pro
        // $24.99 (2499 cents) = Basic
        let tier: 'basic' | 'pro' = 'basic';
        let credits = 50;

        // Check 'originalPrice' instead of 'amountPaid'
        if (originalPrice >= 5000) { 
          tier = 'pro';
          credits = 9999;
        }

        // 4. Sync to Firestore
        const userRef = adminDb.collection('users').doc(email);
        
        await userRef.set({
          email: email,
          tier: tier,
          isPro: tier === 'pro',
          credits: credits,
          lastPaymentAt: FieldValue.serverTimestamp(),
          paymentSource: 'Stripe',
          stripeCustomerId: session.customer,
        }, { merge: true });

        // Initialize Usage Limits for AI
        await userRef.collection('meta').doc('usage').set({
           maxDailyChats: tier === 'pro' ? 9999 : 10,
           lastReset: FieldValue.serverTimestamp(),
        }, { merge: true });
        
        console.log(`✅ User ${email} upgraded to ${tier} (Value: $${originalPrice / 100})`);
      } else {
        console.log('⚠️ No email found in event, skipping database update.');
      }
    }

    return NextResponse.json({ received: true });

  } catch (err: any) {
    console.error('❌ Webhook Logic Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}