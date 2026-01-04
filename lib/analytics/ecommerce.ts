/**
 * Enhanced Ecommerce Tracking Library
 * Helper functions for GA4 ecommerce event tracking
 * Last updated: 2026-01-04
 */

import { pushEvent } from '@/config/analytics';
import {
  planToEcommerceItem,
  getAllEcommerceItems,
  ECOMMERCE_CURRENCY,
  PROMOTIONS,
  type ProductListName,
  type ViewItemListEvent,
  type ViewItemEvent,
  type AddToCartEvent,
  type BeginCheckoutEvent,
  type PurchaseEvent,
  type ViewPromotionEvent,
  type SelectPromotionEvent,
} from '@/config/ecommerce';

/**
 * Track when user views a list of products (e.g., pricing page)
 */
export function trackViewItemList(
  listName: ProductListName,
  listId?: string
): void {
  const items = getAllEcommerceItems();

  const event: ViewItemListEvent = {
    event: 'view_item_list',
    ecommerce: {
      item_list_name: listName,
      item_list_id: listId,
      items: items,
    },
  };

  pushEvent(event);

  if (process.env.NODE_ENV === 'development') {
    console.log('[Ecommerce] View Item List:', listName, items.length, 'items');
  }
}

/**
 * Track when user views a specific product (e.g., focuses on plan card)
 */
export function trackViewItem(planId: string): void {
  const item = planToEcommerceItem(planId);

  const event: ViewItemEvent = {
    event: 'view_item',
    ecommerce: {
      currency: ECOMMERCE_CURRENCY,
      value: item.price,
      items: [item],
    },
  };

  pushEvent(event);

  if (process.env.NODE_ENV === 'development') {
    console.log('[Ecommerce] View Item:', item.item_name, '$' + item.price);
  }
}

/**
 * Track when user adds product to cart (e.g., clicks "Get Started")
 */
export function trackAddToCart(planId: string): void {
  const item = planToEcommerceItem(planId);

  const event: AddToCartEvent = {
    event: 'add_to_cart',
    ecommerce: {
      currency: ECOMMERCE_CURRENCY,
      value: item.price,
      items: [item],
    },
  };

  pushEvent(event);

  if (process.env.NODE_ENV === 'development') {
    console.log('[Ecommerce] Add to Cart:', item.item_name, '$' + item.price);
  }
}

/**
 * Track when user begins checkout (enhanced version of existing begin_checkout)
 */
export function trackBeginCheckoutEcommerce(planId: string): void {
  const item = planToEcommerceItem(planId);

  const event: BeginCheckoutEvent = {
    event: 'begin_checkout',
    ecommerce: {
      currency: ECOMMERCE_CURRENCY,
      value: item.price,
      items: [item],
    },
  };

  pushEvent(event);

  if (process.env.NODE_ENV === 'development') {
    console.log('[Ecommerce] Begin Checkout:', item.item_name, '$' + item.price);
  }
}

/**
 * Track completed purchase (enhanced version for webhook)
 * This should be called from server-side webhook
 */
export function trackPurchaseEcommerce(
  transactionId: string,
  planId: string,
  value: number,
  currency: string = ECOMMERCE_CURRENCY,
  coupon?: string,
  tax?: number,
  shipping?: number
): void {
  const item = planToEcommerceItem(planId);

  const event: PurchaseEvent = {
    event: 'purchase',
    ecommerce: {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      coupon: coupon,
      tax: tax,
      shipping: shipping,
      items: [item],
    },
  };

  pushEvent(event);

  if (process.env.NODE_ENV === 'development') {
    console.log('[Ecommerce] Purchase:', transactionId, '$' + value);
  }
}

/**
 * Track when user views a promotion
 */
export function trackViewPromotion(
  promotionKey: keyof typeof PROMOTIONS
): void {
  const promotion = PROMOTIONS[promotionKey];

  const event: ViewPromotionEvent = {
    event: 'view_promotion',
    ecommerce: {
      promotion_id: promotion.id,
      promotion_name: promotion.name,
      creative_name: promotion.creative,
      creative_slot: promotion.slot,
    },
  };

  pushEvent(event);

  if (process.env.NODE_ENV === 'development') {
    console.log('[Ecommerce] View Promotion:', promotion.name);
  }
}

/**
 * Track when user clicks a promotion
 */
export function trackSelectPromotion(
  promotionKey: keyof typeof PROMOTIONS
): void {
  const promotion = PROMOTIONS[promotionKey];

  const event: SelectPromotionEvent = {
    event: 'select_promotion',
    ecommerce: {
      promotion_id: promotion.id,
      promotion_name: promotion.name,
      creative_name: promotion.creative,
      creative_slot: promotion.slot,
    },
  };

  pushEvent(event);

  if (process.env.NODE_ENV === 'development') {
    console.log('[Ecommerce] Select Promotion:', promotion.name);
  }
}

/**
 * Shopping Behavior Funnel Helper
 * Track user's progression through the shopping funnel
 */
export class EcommerceFunnel {
  private static viewedItems = new Set<string>();
  private static addedToCart = new Set<string>();

  static trackItemView(planId: string): void {
    if (!this.viewedItems.has(planId)) {
      trackViewItem(planId);
      this.viewedItems.add(planId);
    }
  }

  static trackAddToCart(planId: string): void {
    if (!this.addedToCart.has(planId)) {
      trackAddToCart(planId);
      this.addedToCart.add(planId);
    }
  }

  static reset(): void {
    this.viewedItems.clear();
    this.addedToCart.clear();
  }
}

export default {
  trackViewItemList,
  trackViewItem,
  trackAddToCart,
  trackBeginCheckoutEcommerce,
  trackPurchaseEcommerce,
  trackViewPromotion,
  trackSelectPromotion,
  EcommerceFunnel,
};
