/**
 * Traffic Source Detection & Attribution
 * Detects where users came from for personalization
 * Last updated: 2026-01-04
 */

export type TrafficSource = 
  | 'google-organic'
  | 'google-ads'
  | 'facebook'
  | 'instagram'
  | 'tiktok'
  | 'linkedin'
  | 'twitter'
  | 'reddit'
  | 'email'
  | 'direct'
  | 'referral'
  | 'unknown';

export interface TrafficSourceData {
  source: TrafficSource;
  medium: string;
  campaign?: string;
  keyword?: string;
  referrer?: string;
}

/**
 * Detect traffic source from URL parameters and referrer
 */
export function detectTrafficSource(): TrafficSourceData {
  if (typeof window === 'undefined') {
    return { source: 'unknown', medium: 'none' };
  }

  const url = new URL(window.location.href);
  const params = url.searchParams;
  const referrer = document.referrer;

  // Check UTM parameters first
  const utmSource = params.get('utm_source');
  const utmMedium = params.get('utm_medium');
  const utmCampaign = params.get('utm_campaign');
  const utmTerm = params.get('utm_term');

  // Google Ads (gclid parameter)
  if (params.has('gclid')) {
    return {
      source: 'google-ads',
      medium: 'cpc',
      campaign: utmCampaign || undefined,
      keyword: utmTerm || undefined,
    };
  }

  // Facebook Ads (fbclid parameter)
  if (params.has('fbclid')) {
    return {
      source: 'facebook',
      medium: 'cpc',
      campaign: utmCampaign || undefined,
    };
  }

  // UTM parameters present
  if (utmSource) {
    const source = normalizeSource(utmSource);
    return {
      source: source,
      medium: utmMedium || 'unknown',
      campaign: utmCampaign || undefined,
      keyword: utmTerm || undefined,
      referrer: referrer || undefined,
    };
  }

  // Referrer-based detection
  if (referrer) {
    const referrerUrl = new URL(referrer);
    const hostname = referrerUrl.hostname.toLowerCase();

    // Google Organic
    if (hostname.includes('google.com') || hostname.includes('google.')) {
      return {
        source: 'google-organic',
        medium: 'organic',
        referrer: referrer,
      };
    }

    // Social Media
    if (hostname.includes('facebook.com') || hostname.includes('fb.com')) {
      return { source: 'facebook', medium: 'referral', referrer };
    }
    if (hostname.includes('instagram.com')) {
      return { source: 'instagram', medium: 'referral', referrer };
    }
    if (hostname.includes('tiktok.com')) {
      return { source: 'tiktok', medium: 'referral', referrer };
    }
    if (hostname.includes('linkedin.com')) {
      return { source: 'linkedin', medium: 'referral', referrer };
    }
    if (hostname.includes('twitter.com') || hostname.includes('t.co')) {
      return { source: 'twitter', medium: 'referral', referrer };
    }
    if (hostname.includes('reddit.com')) {
      return { source: 'reddit', medium: 'referral', referrer };
    }

    // Email clients
    if (hostname.includes('mail.') || hostname.includes('outlook.')) {
      return { source: 'email', medium: 'email', referrer };
    }

    // Other referral
    return {
      source: 'referral',
      medium: 'referral',
      referrer: referrer,
    };
  }

  // Direct traffic (no referrer, no UTM)
  return {
    source: 'direct',
    medium: 'none',
  };
}

/**
 * Normalize UTM source to our TrafficSource type
 */
function normalizeSource(utmSource: string): TrafficSource {
  const source = utmSource.toLowerCase();

  if (source.includes('google')) return 'google-organic';
  if (source.includes('facebook') || source.includes('fb')) return 'facebook';
  if (source.includes('instagram') || source.includes('ig')) return 'instagram';
  if (source.includes('tiktok')) return 'tiktok';
  if (source.includes('linkedin')) return 'linkedin';
  if (source.includes('twitter')) return 'twitter';
  if (source.includes('reddit')) return 'reddit';
  if (source.includes('email') || source.includes('newsletter')) return 'email';

  return 'referral';
}

/**
 * Store traffic source in sessionStorage for persistence
 */
export function storeTrafficSource(data: TrafficSourceData): void {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.setItem('traffic_source', JSON.stringify(data));
  } catch (error) {
    console.error('Failed to store traffic source:', error);
  }
}

/**
 * Retrieve stored traffic source
 */
export function getStoredTrafficSource(): TrafficSourceData | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = sessionStorage.getItem('traffic_source');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to retrieve traffic source:', error);
    return null;
  }
}

/**
 * Get traffic source (from storage or detect)
 */
export function getTrafficSource(): TrafficSourceData {
  const stored = getStoredTrafficSource();
  
  if (stored) {
    return stored;
  }

  const detected = detectTrafficSource();
  storeTrafficSource(detected);
  return detected;
}

/**
 * Check if user is from a specific source
 */
export function isFromSource(source: TrafficSource): boolean {
  const data = getTrafficSource();
  return data.source === source;
}

/**
 * Check if user is from organic search
 */
export function isOrganicSearch(): boolean {
  const data = getTrafficSource();
  return data.medium === 'organic';
}

/**
 * Check if user is from paid ads
 */
export function isPaidAds(): boolean {
  const data = getTrafficSource();
  return data.medium === 'cpc' || data.medium === 'ppc';
}

/**
 * Check if user is from social media
 */
export function isSocial(): boolean {
  const data = getTrafficSource();
  return ['facebook', 'instagram', 'tiktok', 'linkedin', 'twitter', 'reddit'].includes(data.source);
}

export default {
  detectTrafficSource,
  getTrafficSource,
  storeTrafficSource,
  isFromSource,
  isOrganicSearch,
  isPaidAds,
  isSocial,
};
