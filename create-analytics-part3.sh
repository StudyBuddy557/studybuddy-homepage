#!/bin/bash

echo "🚀 Creating Server-Side Tracking, API Routes & Components (Part 3)..."

# ============================================
# SERVER-SIDE TRACKING
# ============================================

echo "📝 Creating Facebook Conversion API..."
cat > lib/analytics/server/facebook-capi.ts << 'EOFCAPI'
// lib/analytics/server/facebook-capi.ts

import crypto from 'crypto';
import { PurchaseData, UserData } from '../core/types';

interface FacebookCAPIEvent {
  event_name: string;
  event_time: number;
  event_id?: string;
  event_source_url: string;
  action_source: 'website' | 'email' | 'app' | 'phone_call' | 'chat' | 'physical_store' | 'system_generated' | 'other';
  user_data: {
    em?: string;
    ph?: string;
    fn?: string;
    ln?: string;
    ct?: string;
    st?: string;
    zp?: string;
    country?: string;
    external_id?: string;
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string;
    fbp?: string;
  };
  custom_data?: {
    value?: number;
    currency?: string;
    content_name?: string;
    content_ids?: string[];
    content_type?: string;
    num_items?: number;
    [key: string]: any;
  };
}

export class FacebookConversionAPI {
  private pixelId: string;
  private accessToken: string;
  private apiVersion: string = 'v21.0';

  constructor() {
    this.pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';
    this.accessToken = process.env.FB_CONVERSION_API_TOKEN || '';
  }

  private hashValue(value: string): string {
    return crypto.createHash('sha256').update(value.toLowerCase().trim()).digest('hex');
  }

  private prepareUserData(userData: Partial<UserData>): FacebookCAPIEvent['user_data'] {
    const hashed: FacebookCAPIEvent['user_data'] = {
      client_ip_address: userData.clientIpAddress,
      client_user_agent: userData.clientUserAgent,
      fbc: userData.fbc,
      fbp: userData.fbp,
    };

    if (userData.email) hashed.em = this.hashValue(userData.email);
    if (userData.phone) hashed.ph = this.hashValue(userData.phone.replace(/\D/g, ''));
    if (userData.firstName) hashed.fn = this.hashValue(userData.firstName);
    if (userData.lastName) hashed.ln = this.hashValue(userData.lastName);
    if (userData.city) hashed.ct = this.hashValue(userData.city);
    if (userData.state) hashed.st = this.hashValue(userData.state);
    if (userData.zipCode) hashed.zp = this.hashValue(userData.zipCode.replace(/\D/g, ''));
    if (userData.country) hashed.country = this.hashValue(userData.country);
    if (userData.externalId) hashed.external_id = userData.externalId;

    return hashed;
  }

  public async trackPurchase(
    purchaseData: PurchaseData,
    userData: Partial<UserData>,
    eventSourceUrl: string
  ): Promise<boolean> {
    if (!this.pixelId || !this.accessToken) {
      console.error('Facebook CAPI not configured');
      return false;
    }

    const event: FacebookCAPIEvent = {
      event_name: 'Purchase',
      event_time: Math.floor(Date.now() / 1000),
      event_id: purchaseData.transactionId,
      event_source_url: eventSourceUrl,
      action_source: 'website',
      user_data: this.prepareUserData(userData),
      custom_data: {
        value: purchaseData.value,
        currency: purchaseData.currency,
        content_ids: purchaseData.items?.map((i) => i.item_id) || [],
        content_type: 'product',
        num_items: purchaseData.items?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 1,
      },
    };

    return this.sendEvent(event);
  }

  public async trackLead(
    userData: Partial<UserData>,
    eventSourceUrl: string,
    value?: number
  ): Promise<boolean> {
    const event: FacebookCAPIEvent = {
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: eventSourceUrl,
      action_source: 'website',
      user_data: this.prepareUserData(userData),
      custom_data: value ? { value, currency: 'USD' } : undefined,
    };

    return this.sendEvent(event);
  }

  private async sendEvent(event: FacebookCAPIEvent): Promise<boolean> {
    try {
      const url = `https://graph.facebook.com/${this.apiVersion}/${this.pixelId}/events`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [event],
          access_token: this.accessToken,
          test_event_code: process.env.FB_TEST_EVENT_CODE,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Facebook CAPI error:', result);
        return false;
      }

      console.log('Facebook CAPI success:', result);
      return true;
    } catch (error) {
      console.error('Facebook CAPI request failed:', error);
      return false;
    }
  }
}
EOFCAPI

# ============================================
# API ROUTES
# ============================================

echo "📝 Creating tracking API route..."
cat > app/api/tracking/route.ts << 'EOFTRACKAPI'
// app/api/tracking/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { FacebookConversionAPI } from '@/lib/analytics/server/facebook-capi';
import { TrackingEvent } from '@/lib/analytics/core/types';

const fbCAPI = new FacebookConversionAPI();

export async function POST(request: NextRequest) {
  try {
    const events: TrackingEvent | TrackingEvent[] = await request.json();
    const eventArray = Array.isArray(events) ? events : [events];

    const results = await Promise.allSettled(
      eventArray.map(async (event) => {
        if (event.type === 'purchase' && event.userData) {
          const purchaseData = event.data as any;
          const eventSourceUrl = request.headers.get('referer') || request.url;

          return fbCAPI.trackPurchase(purchaseData, event.userData, eventSourceUrl);
        }

        if (event.type === 'lead' && event.userData) {
          const eventSourceUrl = request.headers.get('referer') || request.url;
          const value = (event.data as any).value;

          return fbCAPI.trackLead(event.userData, eventSourceUrl, value);
        }

        return true;
      })
    );

    const successful = results.filter((r) => r.status === 'fulfilled').length;
    const failed = results.filter((r) => r.status === 'rejected').length;

    return NextResponse.json({
      success: true,
      processed: eventArray.length,
      successful,
      failed,
    });
  } catch (error) {
    console.error('Tracking API error:', error);
    return NextResponse.json({ success: false, error: 'Processing failed' }, { status: 500 });
  }
}
EOFTRACKAPI

echo "📝 Creating webhook handler..."
cat > app/api/webhook/route.ts << 'EOFWEBHOOK'
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
EOFWEBHOOK

# ============================================
# REACT COMPONENTS
# ============================================

echo "📝 Creating AnalyticsProvider component..."
cat > app/components/analytics/AnalyticsProvider.tsx << 'EOFPROVIDER'
// app/components/analytics/AnalyticsProvider.tsx
'use client';

import { useEffect, Suspense, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { gtm } from '@/lib/analytics/providers/gtm';
import { fbPixel } from '@/lib/analytics/providers/pixel';
import { ga4 } from '@/lib/analytics/providers/ga4';
import { analyticsConfig } from '@/lib/analytics/core/config';
import { logger } from '@/lib/analytics/core/logger';
import { eventQueue } from '@/lib/analytics/core/queue';

const GTM_ID = 'GTM-PJRBS3FP';
const FB_PIXEL_ID = '1399867675053488';
const GA4_MEASUREMENT_ID = 'G-GQFJVTN22P';

function RouteChangeTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    gtm.pageview(url, document.title);
    fbPixel.pageview();
    ga4.pageview(url);

    logger.info('Pageview tracked', { url });
  }, [pathname, searchParams]);

  return null;
}

function AnalyticsInitializer() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;

    gtm.init();
    fbPixel.init();
    ga4.init();

    setInitialized(true);
    logger.info('Analytics providers initialized');

    return () => {
      eventQueue.destroy();
    };
  }, [initialized]);

  return null;
}

interface AnalyticsProviderProps {
  children: React.ReactNode;
  userId?: string;
  userEmail?: string;
}

export function AnalyticsProvider({ children, userId, userEmail }: AnalyticsProviderProps) {
  useEffect(() => {
    if (userId) {
      gtm.setUserProperties({ user_id: userId, user_email: userEmail });
      logger.info('User properties set', { userId });
    }
  }, [userId, userEmail]);

  return (
    <>
      {GTM_ID && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      )}

      {FB_PIXEL_ID && (
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
            `,
          }}
        />
      )}

      {GA4_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
              `,
            }}
          />
        </>
      )}

      <AnalyticsInitializer />

      <Suspense fallback={null}>
        <RouteChangeTracker />
      </Suspense>

      {children}
    </>
  );
}
EOFPROVIDER

echo "📝 Creating Usage Example..."
cat > app/components/analytics/USAGE_EXAMPLE.tsx << 'EOFUSAGE'
// app/components/analytics/USAGE_EXAMPLE.tsx
// This is an example file showing how to use the analytics system

'use client';

import { useEffect } from 'react';
import { ecommerceTracking } from '@/lib/analytics/tracking/ecommerce';

// Example 1: Track Purchase (Client-Side)
export function ThankYouPage() {
  useEffect(() => {
    ecommerceTracking.trackPurchase(
      {
        transactionId: 'order_12345',
        value: 24.99,
        currency: 'USD',
        items: [
          {
            item_id: 'basic-plan',
            item_name: 'TEAS 7 Basic Plan',
            item_category: 'subscription',
            price: 24.99,
            quantity: 1,
            currency: 'USD',
          },
        ],
      },
      {
        email: 'user@example.com',
      }
    );
  }, []);

  return <div>Thank you for your purchase!</div>;
}

// Example 2: Track Add to Cart
export function PricingCard({ planName, price }: { planName: string; price: number }) {
  const handleSelectPlan = () => {
    ecommerceTracking.trackAddToCart({
      item_id: 'basic-plan',
      item_name: planName,
      item_category: 'subscription',
      price,
      quantity: 1,
      currency: 'USD',
    });

    window.location.href = '/checkout';
  };

  return <button onClick={handleSelectPlan}>Select {planName}</button>;
}

// Example 3: Track Lead
export function SignUpForm() {
  const handleSubmit = (email: string) => {
    ecommerceTracking.trackLead({ email });
  };

  return <form onSubmit={(e) => { e.preventDefault(); handleSubmit('user@example.com'); }}>
    {/* form fields */}
  </form>;
}
EOFUSAGE

echo "📝 Creating README..."
cat > lib/analytics/README.md << 'EOFREADME'
# StudyBuddy Analytics Infrastructure

Enterprise-level analytics system with GTM, Facebook Pixel, and GA4 integration.

## Quick Start

### 1. Add AnalyticsProvider to your layout
```tsx
// app/layout.tsx
import { AnalyticsProvider } from './components/analytics/AnalyticsProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  );
}
```

### 2. Track Events
```tsx
import { ecommerceTracking } from '@/lib/analytics/tracking/ecommerce';

// Track purchase
ecommerceTracking.trackPurchase({
  transactionId: 'order_123',
  value: 24.99,
  currency: 'USD',
  items: [{ item_id: 'basic', item_name: 'Basic Plan', price: 24.99 }]
}, { email: 'user@example.com' });

// Track lead
ecommerceTracking.trackLead({ email: 'user@example.com' });
```

### 3. Server-Side Tracking (Stripe Webhook)

Already configured in `app/api/webhook/route.ts`

## Features

✅ Multi-provider support (GTM, Facebook, GA4)
✅ Server-side conversion tracking (Facebook CAPI)
✅ Event queuing with retry logic
✅ Advanced user matching
✅ Type-safe throughout
✅ Debug logging
✅ Zero-latency loading

## Configuration

All IDs are pre-configured in `.env.local`

Set `NEXT_PUBLIC_ANALYTICS_DEBUG=true` for development.
EOFREADME

echo ""
echo "✅ Part 3 Complete!"
echo ""
echo "📦 Created:"
echo "  - lib/analytics/server/facebook-capi.ts"
echo "  - app/api/tracking/route.ts"
echo "  - app/api/webhook/route.ts"
echo "  - app/components/analytics/AnalyticsProvider.tsx"
echo "  - app/components/analytics/USAGE_EXAMPLE.tsx"
echo "  - lib/analytics/README.md"
echo ""
echo "🎉 ANALYTICS SYSTEM FULLY INSTALLED!"
echo ""
echo "Next steps:"
echo "1. Add AnalyticsProvider to your app/layout.tsx"
echo "2. Test with: npm run dev"
echo "3. Check browser console for '[Analytics Info]' messages"
