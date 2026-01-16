/**
 * Enterprise-grade analytics event bus for StudyBuddy
 * Supports GA4 (gtag/GTM), Meta Pixel, TikTok Pixel
 * Zero dependencies, SSR-safe, crash-proof
 */

type EventParams = Record<string, string | number | boolean | undefined>;

// In-memory dedupe store (resets on page navigation)
const firedEvents = new Set<string>();

const isDebugMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    process.env.NODE_ENV !== 'production' &&
    process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === '1'
  );
};

const isEnabled = (): boolean => {
  return process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== '0';
};

const debugLog = (message: string, data?: unknown): void => {
  if (isDebugMode()) {
    // eslint-disable-next-line no-console
    console.log(`[Analytics Debug] ${message}`, data ?? '');
  }
};

const scrubPII = (params: EventParams): EventParams => {
  const scrubbed = { ...params };
  const piiKeys = ['email', 'phone', 'name', 'address', 'firstName', 'lastName'];
  piiKeys.forEach((key) => delete scrubbed[key]);
  return scrubbed;
};

/**
 * Generate a unique event ID with safe fallback
 * Exported for use in components that need deterministic IDs
 */
export const generateEventId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Dispatch event to GA4 (Prefer GTM dataLayer so Tag Assistant can see events)
 * - If dataLayer exists: push { event: eventName, ...params } (GTM-friendly)
 * - Else if gtag exists: gtag('event', eventName, params)
 * - Else: no-op
 */
const dispatchToGA4 = (eventName: string, params: EventParams): void => {
  try {
    const dataLayer = (window as any).dataLayer;
    const gtag = (window as any).gtag;

    // Prefer GTM dataLayer so Preview/Tag Assistant can see custom events
    if (Array.isArray(dataLayer)) {
      debugLog(`Dispatching via dataLayer: ${eventName}`, params);
      dataLayer.push({ event: eventName, ...params });
      return;
    }

    // Fallback to gtag (direct GA4 install)
    if (typeof gtag === 'function') {
      debugLog(`Dispatching via gtag: ${eventName}`, params);
      gtag('event', eventName, params);
      return;
    }

    debugLog(`No GA4/GTM detected for event: ${eventName}`);
  } catch (error) {
    debugLog(`GA4 dispatch error for ${eventName}:`, error);
  }
};

/**
 * Dispatch event to Meta Pixel
 */
const dispatchToMetaPixel = (eventName: string, params?: EventParams): void => {
  try {
    const fbq = (window as any).fbq;
    if (typeof fbq === 'function') {
      debugLog(`Dispatching to Meta Pixel: ${eventName}`, params);
      fbq('trackCustom', eventName, params || {});
    }
  } catch (error) {
    debugLog(`Meta Pixel dispatch error for ${eventName}:`, error);
  }
};

/**
 * Dispatch event to TikTok Pixel
 */
const dispatchToTikTokPixel = (eventName: string, params?: EventParams): void => {
  try {
    const ttq = (window as any).ttq;
    if (typeof ttq === 'function') {
      debugLog(`Dispatching to TikTok Pixel: ${eventName}`, params);
      ttq.track(eventName, params || {});
    }
  } catch (error) {
    debugLog(`TikTok Pixel dispatch error for ${eventName}:`, error);
  }
};

/**
 * Core event tracking function with dedupe
 */
export const trackEvent = (
  eventName: string,
  params: EventParams = {},
  options: { skipDedupe?: boolean } = {}
): void => {
  if (typeof window === 'undefined') {
    debugLog('Skipping event (SSR):', eventName);
    return;
  }

  if (!isEnabled()) {
    debugLog('Analytics disabled via env flag:', eventName);
    return;
  }

  try {
    const eventId = (params.event_id as string) || generateEventId();
    const enrichedParams: EventParams = { ...params, event_id: eventId };

    // Scrub PII
    const safeParams = scrubPII(enrichedParams);

    // Prevent accidental collision with GTM reserved key
    // (we supply `event` ourselves in dataLayer.push)
    delete (safeParams as any).event;

    // Dedupe check
    const dedupeKey = `${eventName}:${eventId}`;
    if (!options.skipDedupe && firedEvents.has(dedupeKey)) {
      debugLog(`Event already fired (dedupe): ${dedupeKey}`);
      return;
    }

    firedEvents.add(dedupeKey);

    // Dispatch to GA4/GTM
    dispatchToGA4(eventName, safeParams);

    // Meta Pixel fanout for specific events
    if (eventName === 'sb_diagnostic_start') {
      dispatchToMetaPixel('DiagnosticStart', safeParams);
    } else if (eventName === 'sb_diagnostic_complete') {
      dispatchToMetaPixel('DiagnosticComplete', safeParams);
    }

    // TikTok Pixel fanout (parallel)
    if (eventName === 'sb_diagnostic_start') {
      dispatchToTikTokPixel('DiagnosticStart', safeParams);
    } else if (eventName === 'sb_diagnostic_complete') {
      dispatchToTikTokPixel('DiagnosticComplete', safeParams);
    }

    debugLog(`Event tracked successfully: ${eventName}`, safeParams);
  } catch (error) {
    debugLog(`Fatal error tracking ${eventName}:`, error);
  }
};

/**
 * Specialized tracking functions
 */
export const trackDiagnosticStart = (
  diagnosticId?: string,
  additionalParams?: EventParams
): void => {
  trackEvent('sb_diagnostic_start', {
    exam: 'TEAS7',
    flow: 'diagnostic',
    version: 'v1',
    diagnostic_id: diagnosticId,
    ...additionalParams,
  });
};

export const trackDiagnosticComplete = (
  diagnosticId?: string,
  score?: number,
  timeSeconds?: number,
  additionalParams?: EventParams
): void => {
  trackEvent('sb_diagnostic_complete', {
    exam: 'TEAS7',
    flow: 'diagnostic',
    version: 'v1',
    diagnostic_id: diagnosticId,
    score,
    time_seconds: timeSeconds,
    ...additionalParams,
  });
};

export const trackPricingView = (): void => {
  trackEvent('sb_pricing_view', {});
};

export const trackLead = (additionalParams?: EventParams): void => {
  trackEvent('generate_lead', additionalParams || {});
};

export const trackBeginCheckout = (additionalParams?: EventParams): void => {
  trackEvent('begin_checkout', additionalParams || {});
};

export const trackPurchase = (
  value: number,
  currency: string = 'USD',
  additionalParams?: EventParams
): void => {
  trackEvent('purchase', {
    value,
    currency,
    ...additionalParams,
  });
};
