#!/bin/bash

echo "🚀 Creating Analytics Providers, Tracking & Components (Part 2)..."

# ============================================
# PROVIDERS
# ============================================

echo "📝 Creating GTM provider..."
cat > lib/analytics/providers/gtm.ts << 'EOFGTM'
// lib/analytics/providers/gtm.ts

import { analyticsConfig } from '../core/config';
import { logger } from '../core/logger';
import { EventData, PurchaseData, EcommerceItem } from '../core/types';

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
    google_tag_manager?: Record<string, any>;
  }
}

export const GTM_ID = 'GTM-PJRBS3FP';

class GTMProvider {
  private static instance: GTMProvider;
  private initialized = false;

  private constructor() {}

  public static getInstance(): GTMProvider {
    if (!GTMProvider.instance) {
      GTMProvider.instance = new GTMProvider();
    }
    return GTMProvider.instance;
  }

  public init(): void {
    if (this.initialized || typeof window === 'undefined') {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    this.initialized = true;
    logger.info('GTM initialized', { gtmId: GTM_ID });
  }

  private push(data: Record<string, any>): void {
    if (!this.initialized) {
      logger.warn('GTM not initialized, queuing event');
      return;
    }

    try {
      window.dataLayer.push(data);
      logger.debug('GTM event pushed', data);
    } catch (error) {
      logger.error('Failed to push GTM event', error);
    }
  }

  public pageview(url: string, title?: string): void {
    this.push({
      event: 'pageview',
      page_path: url,
      page_title: title || document.title,
      page_location: window.location.href,
      timestamp: Date.now(),
    });
  }

  public event(eventData: EventData): void {
    this.push({
      event: eventData.event,
      event_category: eventData.eventCategory,
      event_action: eventData.eventAction,
      event_label: eventData.eventLabel,
      value: eventData.value,
      currency: eventData.currency || 'USD',
      timestamp: Date.now(),
      ...eventData,
    });
  }

  public purchase(purchaseData: PurchaseData): void {
    const ecommerceData = {
      event: 'purchase',
      ecommerce: {
        transaction_id: purchaseData.transactionId,
        value: purchaseData.value,
        currency: purchaseData.currency,
        tax: purchaseData.tax || 0,
        shipping: purchaseData.shipping || 0,
        affiliation: purchaseData.affiliation || 'StudyBuddy',
        coupon: purchaseData.coupon,
        items: purchaseData.items || [],
      },
      timestamp: Date.now(),
    };

    this.push(ecommerceData);
    logger.info('GTM purchase tracked', { transactionId: purchaseData.transactionId });
  }

  public beginCheckout(items: EcommerceItem[], value: number): void {
    this.push({
      event: 'begin_checkout',
      ecommerce: {
        currency: 'USD',
        value,
        items,
      },
      timestamp: Date.now(),
    });
  }

  public addToCart(item: EcommerceItem): void {
    this.push({
      event: 'add_to_cart',
      ecommerce: {
        currency: item.currency || 'USD',
        value: item.price,
        items: [item],
      },
      timestamp: Date.now(),
    });
  }

  public viewItem(item: EcommerceItem): void {
    this.push({
      event: 'view_item',
      ecommerce: {
        currency: item.currency || 'USD',
        value: item.price,
        items: [item],
      },
      timestamp: Date.now(),
    });
  }

  public setUserProperties(properties: Record<string, any>): void {
    this.push({
      event: 'set_user_properties',
      user_properties: properties,
      timestamp: Date.now(),
    });
  }
}

export const gtm = GTMProvider.getInstance();
EOFGTM

echo "📝 Creating Facebook Pixel provider..."
cat > lib/analytics/providers/pixel.ts << 'EOFPIXEL'
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
EOFPIXEL

echo "📝 Creating GA4 provider..."
cat > lib/analytics/providers/ga4.ts << 'EOFGA4'
// lib/analytics/providers/ga4.ts

import { analyticsConfig } from '../core/config';
import { logger } from '../core/logger';
import { EventData, PurchaseData } from '../core/types';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA4_MEASUREMENT_ID = 'G-GQFJVTN22P';

class GA4Provider {
  private static instance: GA4Provider;
  private initialized = false;

  private constructor() {}

  public static getInstance(): GA4Provider {
    if (!GA4Provider.instance) {
      GA4Provider.instance = new GA4Provider();
    }
    return GA4Provider.instance;
  }

  public init(): void {
    if (this.initialized || typeof window === 'undefined') {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA4_MEASUREMENT_ID, {
      send_page_view: false,
    });

    this.initialized = true;
    logger.info('GA4 initialized', { measurementId: GA4_MEASUREMENT_ID });
  }

  public pageview(url: string): void {
    if (!this.initialized) return;

    window.gtag('event', 'page_view', {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });
  }

  public event(eventData: EventData): void {
    if (!this.initialized) return;

    window.gtag('event', eventData.event, {
      event_category: eventData.eventCategory,
      event_label: eventData.eventLabel,
      value: eventData.value,
      ...eventData,
    });
  }

  public purchase(purchaseData: PurchaseData): void {
    if (!this.initialized) return;

    window.gtag('event', 'purchase', {
      transaction_id: purchaseData.transactionId,
      value: purchaseData.value,
      currency: purchaseData.currency,
      tax: purchaseData.tax || 0,
      shipping: purchaseData.shipping || 0,
      items: purchaseData.items || [],
    });

    logger.info('GA4 purchase tracked', { transactionId: purchaseData.transactionId });
  }
}

export const ga4 = GA4Provider.getInstance();
EOFGA4

echo "📝 Creating ecommerce tracking..."
cat > lib/analytics/tracking/ecommerce.ts << 'EOFECOM'
// lib/analytics/tracking/ecommerce.ts

import { gtm } from '../providers/gtm';
import { fbPixel } from '../providers/pixel';
import { ga4 } from '../providers/ga4';
import { logger } from '../core/logger';
import { eventQueue } from '../core/queue';
import { PurchaseData, EcommerceItem, UserData, TrackingEvent } from '../core/types';
import { analyticsConfig } from '../core/config';

class EcommerceTracking {
  private static instance: EcommerceTracking;
  private sessionId: string;

  private constructor() {
    this.sessionId = this.generateSessionId();
  }

  public static getInstance(): EcommerceTracking {
    if (!EcommerceTracking.instance) {
      EcommerceTracking.instance = new EcommerceTracking();
    }
    return EcommerceTracking.instance;
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }

  public trackPurchase(purchaseData: PurchaseData, userData?: Partial<UserData>): void {
    logger.info('Tracking purchase', { transactionId: purchaseData.transactionId });

    if (analyticsConfig.isEnabled('gtm')) {
      gtm.purchase(purchaseData);
    }

    if (analyticsConfig.isEnabled('facebook')) {
      fbPixel.purchase(purchaseData, userData);
    }

    if (analyticsConfig.isEnabled('ga4')) {
      ga4.purchase(purchaseData);
    }

    const event: TrackingEvent = {
      type: 'purchase',
      data: purchaseData,
      userData,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      provider: 'all',
    };

    eventQueue.enqueue(event);
  }

  public trackAddToCart(item: EcommerceItem): void {
    logger.debug('Tracking add to cart', { itemId: item.item_id });

    if (analyticsConfig.isEnabled('gtm')) {
      gtm.addToCart(item);
    }

    if (analyticsConfig.isEnabled('facebook')) {
      fbPixel.addToCart(item);
    }
  }

  public trackBeginCheckout(items: EcommerceItem[], value: number): void {
    logger.debug('Tracking begin checkout', { itemCount: items.length, value });

    if (analyticsConfig.isEnabled('gtm')) {
      gtm.beginCheckout(items, value);
    }

    if (analyticsConfig.isEnabled('facebook')) {
      fbPixel.initiateCheckout(value, items);
    }
  }

  public trackAddPaymentInfo(value: number): void {
    if (analyticsConfig.isEnabled('facebook')) {
      fbPixel.addPaymentInfo(value);
    }
  }

  public trackViewItem(item: EcommerceItem): void {
    if (analyticsConfig.isEnabled('gtm')) {
      gtm.viewItem(item);
    }

    if (analyticsConfig.isEnabled('facebook')) {
      fbPixel.viewContent(item.item_name, item.price);
    }
  }

  public trackLead(userData?: Partial<UserData>, value?: number): void {
    logger.info('Tracking lead conversion');

    if (analyticsConfig.isEnabled('facebook')) {
      fbPixel.lead(value, userData);
    }

    if (analyticsConfig.isEnabled('gtm')) {
      gtm.event({
        event: 'generate_lead',
        value: value || 0,
        currency: 'USD',
      });
    }
  }

  public trackSubscribe(value: number, userData?: Partial<UserData>): void {
    logger.info('Tracking subscription', { value });

    if (analyticsConfig.isEnabled('facebook')) {
      fbPixel.subscribe(value, userData);
    }

    if (analyticsConfig.isEnabled('gtm')) {
      gtm.event({
        event: 'subscribe',
        value,
        currency: 'USD',
      });
    }
  }
}

export const ecommerceTracking = EcommerceTracking.getInstance();
EOFECOM

echo "📝 Creating index export..."
cat > lib/analytics/index.ts << 'EOFINDEX'
// lib/analytics/index.ts

export * from './core/types';
export * from './core/config';
export * from './core/logger';
export * from './providers/gtm';
export * from './providers/pixel';
export * from './providers/ga4';
export * from './tracking/ecommerce';
EOFINDEX

echo ""
echo "✅ Part 2 Complete!"
echo ""
echo "📦 Created:"
echo "  - lib/analytics/providers/gtm.ts"
echo "  - lib/analytics/providers/pixel.ts"
echo "  - lib/analytics/providers/ga4.ts"
echo "  - lib/analytics/tracking/ecommerce.ts"
echo "  - lib/analytics/index.ts"
echo ""
echo "🎯 Next: Reply 'part 3' for server-side & components"
