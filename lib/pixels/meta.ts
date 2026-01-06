// lib/pixels/meta.ts
/**
 * Meta (Facebook) Pixel Integration
 * 
 * Type-safe wrapper for Meta Pixel with standard e-commerce events.
 */

declare global {
  interface Window {
    fbq?: {
      (action: 'track', eventName: string, parameters?: Record<string, any>): void;
      (action: 'trackCustom', eventName: string, parameters?: Record<string, any>): void;
      (action: 'init', pixelId: string, userData?: Record<string, any>): void;
      push: (args: any[]) => void;
      loaded: boolean;
      version: string;
      queue: any[];
    };
    _fbq?: typeof window.fbq;
  }
}

export type MetaPixelEvent =
  | 'PageView'
  | 'ViewContent'
  | 'Search'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'InitiateCheckout'
  | 'AddPaymentInfo'
  | 'Purchase'
  | 'Lead'
  | 'CompleteRegistration';

export interface MetaPixelParams {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  contents?: Array<{ id: string; quantity: number }>;
  content_type?: string;
  value?: number;
  currency?: string;
  search_string?: string;
  status?: boolean;
}

class MetaPixel {
  private pixelId: string | null = null;
  private enabled = false;
  private consentGranted = false;

  /**
   * Initialize Meta Pixel
   */
  initialize(pixelId: string, consent = true): void {
    if (typeof window === 'undefined') return;
    if (!pixelId) {
      console.warn('[MetaPixel] No pixel ID provided');
      return;
    }

    this.pixelId = pixelId;
    this.consentGranted = consent;
    this.enabled = true;

    // Pixel script will be loaded via next/script
    // This just initializes the fbq queue if it doesn't exist
    if (!window.fbq) {
      window.fbq = function() {
        window.fbq?.queue?.push(arguments);
      } as any;
      window.fbq.push = window.fbq;
      window.fbq.loaded = false;
      window.fbq.version = '2.0';
      window.fbq.queue = [];
    }

    // Initialize pixel with ID
    if (this.consentGranted) {
      window.fbq('init', pixelId);
      console.log('[MetaPixel] Initialized with pixel ID:', pixelId);
    }
  }

  /**
   * Track a standard event
   */
  track(event: MetaPixelEvent, params?: MetaPixelParams): void {
    if (!this.isReady()) return;

    try {
      window.fbq?.('track', event, params);
    } catch (error) {
      console.error('[MetaPixel] Track error:', error);
    }
  }

  /**
   * Track a custom event
   */
  trackCustom(event: string, params?: MetaPixelParams): void {
    if (!this.isReady()) return;

    try {
      window.fbq?.('trackCustom', event, params);
    } catch (error) {
      console.error('[MetaPixel] TrackCustom error:', error);
    }
  }

  /**
   * Update consent status
   */
  setConsent(granted: boolean): void {
    this.consentGranted = granted;

    if (granted && this.pixelId && typeof window !== 'undefined') {
      // Re-initialize if consent was just granted
      window.fbq?.('init', this.pixelId);
    }
  }

  /**
   * Check if pixel is ready
   */
  isReady(): boolean {
    return (
      this.enabled &&
      this.consentGranted &&
      typeof window !== 'undefined' &&
      typeof window.fbq === 'function'
    );
  }
}

// Export singleton
export const metaPixel = new MetaPixel();

// Export convenience methods
export const trackMetaPageView = () => metaPixel.track('PageView');
export const trackMetaViewContent = (contentName?: string, value?: number) =>
  metaPixel.track('ViewContent', { content_name: contentName, value, currency: 'USD' });
export const trackMetaLead = (contentName?: string, value?: number) =>
  metaPixel.track('Lead', { content_name: contentName, value, currency: 'USD' });
export const trackMetaInitiateCheckout = (contentName?: string, value?: number) =>
  metaPixel.track('InitiateCheckout', { content_name: contentName, value, currency: 'USD' });
export const trackMetaPurchase = (value: number, transactionId?: string) =>
  metaPixel.track('Purchase', {
    value,
    currency: 'USD',
    content_ids: transactionId ? [transactionId] : undefined,
  });
