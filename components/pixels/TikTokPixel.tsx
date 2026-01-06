// components/pixels/TikTokPixel.tsx
/**
 * TikTok Pixel Script Component
 * 
 * Loads TikTok Pixel script with next/script for optimal performance.
 * Use in app/layout.tsx.
 */

'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { tiktokPixel } from '@/lib/pixels/tiktok';
import { hasMarketingConsent } from '@/lib/pixels/consent';

interface TikTokPixelProps {
  pixelId: string;
}

export function TikTokPixel({ pixelId }: TikTokPixelProps) {
  useEffect(() => {
    const consent = hasMarketingConsent();
    tiktokPixel.initialize(pixelId, consent);
  }, [pixelId]);

  if (!pixelId) return null;

  return (
    <Script
      id="tiktok-pixel"
      strategy="lazyOnload"
      src="https://analytics.tiktok.com/i18n/pixel/events.js"
    />
  );
}
