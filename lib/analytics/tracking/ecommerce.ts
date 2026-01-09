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
