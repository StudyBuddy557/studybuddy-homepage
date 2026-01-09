// lib/analytics/providers/pixel.ts

import { analyticsConfig } from '../core/config';
import { logger } from '../core/logger';
import { UserData, PurchaseData, EcommerceItem } from '../core/types';

declare global {
  interface Window {
    fbq: FacebookPixel;
    _fbq: FacebookPixel;
  }
}

interface FacebookPixel {
  (command: 'track', eventName: string, params?: Record<string, any>, userData?: Record<string, any>): void;
  (command: 'trackCustom', eventName: string, params?: Record<string, any>): void;
  (command: 'init', pixelId: string, userData?: Record<string, any>): void;
  (command: 'set', key: string, value: any): void;
  callMethod?: (...args: any[]) => void;
  push: (...args: any[]) => void;
  loaded: boolean;
  version: string;
  queue: any[];
}

export const FB_PIXEL_ID = '1399867675053488';

class FacebookPixelProvider {
  private static instance: FacebookPixelProvider;
  private initialized = false;
  private advancedMatching: Partial<UserData> | null = null;

  private constructor() {}

  public static getInstance(): FacebookPixelProvider {
    if (!FacebookPixelProvider.instance) {
      FacebookPixelProvider.instance = new FacebookPixelProvider();
    }
    return FacebookPixelProvider.instance;
  }

  public init(userData?: Partial<UserData>): void {
    if (this.initialized || typeof window === 'undefined') {
      return;
    }

    const fbq: FacebookPixel = function (...args: any[]) {
      if (fbq.callMethod) {
        fbq.callMethod.apply(fbq, args);
      } else {
        fbq.queue.push(args);
      }
    } as any;

    if (!window._fbq) window._fbq = fbq;
    window.fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];

    if (userData) {
      this.advancedMatching = this.hashUserData(userData);
    }

    window.fbq('init', FB_PIXEL_ID, this.advancedMatching || undefined);
    this.initialized = true;
    logger.info('Facebook Pixel initialized', { pixelId: FB_PIXEL_ID });
  }

  private hashUserData(userData: Partial<UserData>): Record<string, string> {
    const hashed: Record<string, string> = {};

    if (userData.email) hashed.em = userData.email.toLowerCase().trim();
    if (userData.phone) hashed.ph = userData.phone.replace(/\D/g, '');
    if (userData.firstName) hashed.fn = userData.firstName.toLowerCase().trim();
    if (userData.lastName) hashed.ln = userData.lastName.toLowerCase().trim();
    if (userData.city) hashed.ct = userData.city.toLowerCase().trim();
    if (userData.state) hashed.st = userData.state.toLowerCase().trim();
    if (userData.zipCode) hashed.zp = userData.zipCode.replace(/\D/g, '');
    if (userData.country) hashed.country = userData.country.toLowerCase().trim();

    return hashed;
  }

  private track(eventName: string, params: Record<string, any> = {}, userData?: Partial<UserData>): void {
    if (!this.initialized || typeof window === 'undefined') {
      logger.warn('Facebook Pixel not initialized');
      return;
    }

    try {
      const hashedUserData = userData ? this.hashUserData(userData) : undefined;
      window.fbq('track', eventName, params, hashedUserData);
      logger.debug('Facebook Pixel event tracked', { eventName, params });
    } catch (error) {
      logger.error('Failed to track Facebook Pixel event', error);
    }
  }

  public pageview(): void {
    this.track('PageView');
  }

  public viewContent(contentName: string, value?: number): void {
    this.track('ViewContent', {
      content_name: contentName,
      content_type: 'product',
      value: value || 0,
      currency: 'USD',
    });
  }

  public addToCart(item: EcommerceItem): void {
    this.track('AddToCart', {
      content_name: item.item_name,
      content_ids: [item.item_id],
      content_type: 'product',
      value: item.price,
      currency: item.currency || 'USD',
    });
  }

  public initiateCheckout(value: number, items: EcommerceItem[]): void {
    this.track('InitiateCheckout', {
      value,
      currency: 'USD',
      content_ids: items.map((i) => i.item_id),
      content_type: 'product',
      num_items: items.reduce((sum, item) => sum + (item.quantity || 1), 0),
    });
  }

  public addPaymentInfo(value: number): void {
    this.track('AddPaymentInfo', {
      value,
      currency: 'USD',
      content_type: 'product',
    });
  }

  public purchase(purchaseData: PurchaseData, userData?: Partial<UserData>): void {
    const params = {
      value: purchaseData.value,
      currency: purchaseData.currency,
      content_type: 'product',
      content_ids: purchaseData.items?.map((i) => i.item_id) || [],
      num_items: purchaseData.items?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 1,
    };

    this.track('Purchase', params, userData);
    logger.info('Facebook Pixel purchase tracked', { transactionId: purchaseData.transactionId });
  }

  public lead(value?: number, userData?: Partial<UserData>): void {
    this.track('Lead', { value: value || 0, currency: 'USD' }, userData);
  }

  public completeRegistration(value?: number, userData?: Partial<UserData>): void {
    this.track('CompleteRegistration', { value: value || 0, currency: 'USD' }, userData);
  }

  public subscribe(value: number, userData?: Partial<UserData>): void {
    this.track('Subscribe', { value, currency: 'USD', predicted_ltv: value * 12 }, userData);
  }

  public customEvent(eventName: string, params: Record<string, any> = {}): void {
    if (!this.initialized || typeof window === 'undefined') {
      return;
    }

    try {
      window.fbq('trackCustom', eventName, params);
      logger.debug('Facebook Pixel custom event tracked', { eventName, params });
    } catch (error) {
      logger.error('Failed to track Facebook Pixel custom event', error);
    }
  }
}

export const fbPixel = FacebookPixelProvider.getInstance();
