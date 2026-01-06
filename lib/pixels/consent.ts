const CONSENT_COOKIE_NAME = 'sb_consent';

export type ConsentState = 'granted' | 'denied' | 'pending';

export function getConsentState(): ConsentState {
  return 'granted'; // Default to granted for now
}

export function hasMarketingConsent(): boolean {
  return true; // Default to true for now
}

export function hasAnalyticsConsent(): boolean {
  return true;
}
