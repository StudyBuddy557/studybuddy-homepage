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
