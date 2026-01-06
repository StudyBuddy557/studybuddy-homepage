// hooks/useAnalytics.ts
/**
 * React Hook for Analytics
 * 
 * Provides type-safe analytics tracking methods to React components.
 */

'use client';

import { useCallback, useEffect } from 'react';
import { analytics } from '@/lib/analytics/tracker';
import type { EventName } from '@/lib/analytics/types';

export function useAnalytics() {
  return {
    track: useCallback(<T extends EventName>(
      eventName: T,
      properties?: any
    ) => {
      analytics.track(eventName, properties);
    }, []),

    trackPageView: useCallback((path?: string, title?: string) => {
      analytics.trackPageView(path, title);
    }, []),
  };
}

/**
 * Hook to track page views on mount
 */
export function usePageViewTracking() {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView();
  }, [trackPageView]);
}

/**
 * Hook to track specific event on mount
 */
export function useTrackOnMount<T extends EventName>(
  eventName: T,
  properties?: any
) {
  const { track } = useAnalytics();

  useEffect(() => {
    track(eventName, properties);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only track once on mount
}
