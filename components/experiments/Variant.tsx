/**
 * Variant Component for A/B Testing
 * Renders different content based on experiment variant
 * Last updated: 2026-01-04
 */

'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { getVariant, trackExperimentExposure } from '@/lib/experiments/tracking';

interface VariantProps {
  experimentId: string;
  variants: Record<string, ReactNode>;
  trackExposure?: boolean;
}

/**
 * Variant Component
 * Usage:
 * <Variant
 *   experimentId="PRICING_HEADLINE"
 *   variants={{
 *     control: <h1>Choose Your Plan</h1>,
 *     value: <h1>Pass TEAS 7 or Get Your Money Back</h1>,
 *   }}
 * />
 */
export function Variant({ 
  experimentId, 
  variants,
  trackExposure = true 
}: VariantProps) {
  const [content, setContent] = useState<ReactNode>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const variant = getVariant(experimentId);
    
    if (!variant) {
      // Experiment not found, render first variant (control)
      const firstVariant = Object.values(variants)[0];
      setContent(firstVariant);
      setIsLoaded(true);
      return;
    }

    // Get content for assigned variant
    const variantContent = variants[variant.id];
    
    if (!variantContent) {
      console.warn(
        `[Variant] No content provided for variant "${variant.id}" in experiment "${experimentId}"`
      );
      // Fallback to first variant
      setContent(Object.values(variants)[0]);
    } else {
      setContent(variantContent);
    }

    // Track exposure
    if (trackExposure) {
      trackExperimentExposure(experimentId, variant.id);
    }

    setIsLoaded(true);
  }, [experimentId, variants, trackExposure]);

  // Prevent flash of wrong content
  if (!isLoaded) {
    return null;
  }

  return <>{content}</>;
}

/**
 * Hook for accessing variant in component logic
 */
export function useVariant(experimentId: string) {
  const [variant, setVariant] = useState<string | null>(null);

  useEffect(() => {
    const assignedVariant = getVariant(experimentId);
    setVariant(assignedVariant?.id || null);
  }, [experimentId]);

  return variant;
}

/**
 * Hook for tracking experiment conversion
 */
export function useExperimentConversion(experimentId: string) {
  const variant = useVariant(experimentId);

  const trackConversion = (conversionType: string = 'default', value?: number) => {
    if (variant) {
      const { trackExperimentConversion } = require('@/lib/experiments/tracking');
      trackExperimentConversion(experimentId, variant, conversionType, value);
    }
  };

  return { variant, trackConversion };
}

export default Variant;
