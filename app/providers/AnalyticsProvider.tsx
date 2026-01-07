// app/providers/AnalyticsProvider.tsx
/**
 * Analytics Provider
 * 
 * Initializes analytics system and provides tracking context to the app.
 * Should be included in root layout.
 */
'use client';

import { useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analytics } from '@/lib/analytics/tracker';
import { ConsoleAdapter } from '@/lib/analytics/adapters/console';
import { GTMAdapter } from '@/lib/analytics/adapters/gtm';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

// Separate component that uses useSearchParams
function AnalyticsTracker({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialized = useRef(false);

  // Initialize analytics on mount
  useEffect(() => {
    if (initialized.current) return;

    const debug = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true';
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
    const adapters = [];

    // Add console adapter in development or if debug enabled
    if (debug || process.env.NODE_ENV === 'development') {
      adapters.push(new ConsoleAdapter(true));
    }

    // Add GTM adapter if ID is configured
    if (gtmId) {
      adapters.push(new GTMAdapter(gtmId));
    }

    analytics.initialize({
      debug,
      adapters,
      autoPageViews: false, // We handle page views manually
    });

    initialized.current = true;
  }, []);

  // Track page views on route changes
  useEffect(() => {
    if (!initialized.current) return;

    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    analytics.trackPageView(url);
  }, [pathname, searchParams]);

  return <>{children}</>;
}

// Main provider with Suspense boundary
export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  return (
    <Suspense fallback={null}>
      <AnalyticsTracker>{children}</AnalyticsTracker>
    </Suspense>
  );
}
