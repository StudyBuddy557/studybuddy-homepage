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
