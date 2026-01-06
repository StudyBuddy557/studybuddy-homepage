import type { Metadata } from 'next';
import { Check, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { buildJsonLdForPage } from '@/lib/schema/render';
import { findPageMapping } from '@/lib/teas/find-page';
import PricingClient from './PricingClient';

export const metadata: Metadata = {
  title: 'Pricing & Plans | StudyBuddy',
  description: 'Affordable TEAS 7 prep with unlimited AI tutoring. Monthly and quarterly plans with 100% pass guarantee.',
};

export default function PricingPage() {
  const mapping = findPageMapping('/pricing');
  const schemaEngineJson = mapping ? buildJsonLdForPage('course', { mapping }) : null;

  // AEO: Product Schema 
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'StudyBuddy TEAS Prep Pro',
    description: 'Unlimited AI tutoring and TEAS 7 course access.',
    offers: {
      '@type': 'Offer',
      price: '59.00',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31',
      availability: 'https://schema.org/InStock'
    }
  };

  return (
    <>
      {schemaEngineJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <PricingClient />
    </>
  );
}