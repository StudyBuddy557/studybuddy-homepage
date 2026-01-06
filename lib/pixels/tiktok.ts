// lib/pixels/tiktok.ts
/**
 * TikTok Pixel Integration
 * 
 * Type-safe wrapper for TikTok Pixel with standard e-commerce events.
 */

declare global {
  interface Window {
    ttq?: {
      track: (eventName: string, properties?: Record<string, any>) => void;
      page: () => void;
      identify: (properties?: Record<string, any>) => void;
      load: (pixelId: string) => void;
      _i: Record<string, any>;
      _t: Record<string, any>;
      methods: string[];
    };
  }
}

export type TikTokPixelEvent =
  | 'ViewContent'
  | 'ClickButton'
  | 'Search'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'InitiateCheckout'
  | 'AddPaymentInfo'
  | 'CompletePayment'
  | 'PlaceAnOrder'
  | 'Contact'
  | 'SubmitForm'
  | 'Download'
  | 'Subscribe';

export interface TikTokPixelParams {
  content_type?: string;
  content_id?: string;
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  quantity?: number;
  description?: string;
  query?: string;
}

class TikTokPixel {
  private pixelId: string | null = null;
  private enabled = false;
  private consentGranted = false;

  /**
   * Initialize TikTok Pixel
   */
  initialize(pixelId: string, consent = true): void {
    if (typeof window === 'undefined') return;
    if (!pixelId) {
      console.warn('[TikTokPixel] No pixel ID provided');
      return;
    }

    this.pixelId = pixelId;
    this.consentGranted = consent;
    this.enabled = true;

    // Pixel script will be loaded via next/script
    // This just ensures ttq is available
    if (!window.ttq) {
      const methods = [
        'page',
        'track',
        'identify',
        'instances',
        'debug',
        'on',
        'off',
        'once',
        'ready',
        'alias',
        'group',
        'enableCookie',
        'disableCookie',
      ];

      window.ttq = {
        track: function() {},
        page: function() {},
        identify: function() {},
        load: function() {},
        _i: {},
        _t: {},
        methods: methods,
      } as any;

      methods.forEach((method) => {
        (window.ttq as any)[method] = function() {
          (window.ttq as any)._t[method] = (window.ttq as any)._t[method] || [];
          (window.ttq as any)._t[method].push(arguments);
        };
      });
    }

    if (this.consentGranted) {
      window.ttq.load(pixelId);
      console.log('[TikTokPixel] Initialized with pixel ID:', pixelId);
    }
  }

  /**
   * Track a standard event
   */
  track(event: TikTokPixelEvent, params?: TikTokPixelParams): void {
    if (!this.isReady()) return;

    try {
      window.ttq?.track(event, params);
    } catch (error) {
      console.error('[TikTokPixel] Track error:', error);
    }
  }

  /**
   * Track a page view
   */
  trackPageView(): void {
    if (!this.isReady()) return;

    try {
      window.ttq?.page();
    } catch (error) {
      console.error('[TikTokPixel] PageView error:', error);
    }
  }

  /**
   * Update consent status
   */
  setConsent(granted: boolean): void {
    this.consentGranted = granted;

    if (granted && this.pixelId && typeof window !== 'undefined') {
      window.ttq?.load(this.pixelId);
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
      typeof window.ttq?.track === 'function'
    );
  }
}

// Export singleton
export const tiktokPixel = new TikTokPixel();

// Export convenience methods
export const trackTikTokPageView = () => tiktokPixel.trackPageView();
export const trackTikTokViewContent = (contentName?: string, value?: number) =>
  tiktokPixel.track('ViewContent', { content_name: contentName, value, currency: 'USD' });
export const trackTikTokContact = (contentName?: string) =>
  tiktokPixel.track('Contact', { content_name: contentName });
export const trackTikTokSubmitForm = (contentName?: string) =>
  tiktokPixel.track('SubmitForm', { content_name: contentName });
export const trackTikTokInitiateCheckout = (contentName?: string, value?: number) =>
  tiktokPixel.track('InitiateCheckout', { content_name: contentName, value, currency: 'USD' });
export const trackTikTokCompletePayment = (value: number, contentId?: string) =>
  tiktokPixel.track('CompletePayment', {
    value,
    currency: 'USD',
    content_id: contentId,
  });
