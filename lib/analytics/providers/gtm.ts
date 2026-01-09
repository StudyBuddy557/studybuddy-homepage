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
