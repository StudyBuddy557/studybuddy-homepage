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
