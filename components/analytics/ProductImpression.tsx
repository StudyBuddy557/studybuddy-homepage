/**
 * Product Impression Tracker Component
 * Automatically tracks when products become visible in viewport
 * Uses Intersection Observer for performance
 */

'use client';

import { useEffect, useRef } from 'react';
import { EcommerceFunnel } from '@/lib/analytics/ecommerce';

interface ProductImpressionProps {
  planId: string;
  children: React.ReactNode;
  threshold?: number; // % of element visible to trigger (0-1)
}

export function ProductImpression({ 
  planId, 
  children,
  threshold = 0.5 
}: ProductImpressionProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasTrackedRef.current) return;

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Track when product becomes visible
          if (entry.isIntersecting && !hasTrackedRef.current) {
            EcommerceFunnel.trackItemView(planId);
            hasTrackedRef.current = true;
            
            // Stop observing once tracked
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: '0px', // No margin - track exactly when visible
      }
    );

    observer.observe(element);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [planId, threshold]);

  return (
    <div ref={elementRef}>
      {children}
    </div>
  );
}

export default ProductImpression;
