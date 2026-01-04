/**
 * Enhanced Ecommerce Configuration
 * GA4 ecommerce tracking for complete shopping behavior analysis
 * Last updated: 2026-01-04
 */

import { PLANS } from './offer';

// Enhanced Ecommerce Item (matches GA4 spec)
export interface EcommerceItem {
  item_id: string;
  item_name: string;
  item_brand?: string;
  item_category?: string;
  item_category2?: string;
  item_variant?: string;
  price: number;
  quantity?: number;
  index?: number;
}

// Product list identifier
export type ProductListName = 
  | 'Pricing Page'
  | 'Homepage'
  | 'Mobile CTA'
  | 'Diagnostic Upsell'
  | 'Email Campaign'
  | 'Search Results';

/**
 * Convert Plan to Ecommerce Item
 */
export function planToEcommerceItem(
  planId: string,
  quantity: number = 1,
  index?: number
): EcommerceItem {
  const plan = PLANS.find(p => p.id === planId);
  
  if (!plan) {
    throw new Error(`Plan not found: ${planId}`);
  }

  return {
    item_id: plan.id,
    item_name: plan.displayName,
    item_brand: 'StudyBuddy',
    item_category: 'TEAS 7 Preparation',
    item_category2: plan.billingPeriod === 'monthly' ? 'Monthly Plan' : 'Quarterly Plan',
    item_variant: plan.includesPassGuarantee ? 'With Pass Guarantee' : 'Standard',
    price: plan.price,
    quantity: quantity,
    index: index,
  };
}

/**
 * Get all plans as ecommerce items
 */
export function getAllEcommerceItems(): EcommerceItem[] {
  return PLANS.map((plan, index) => 
    planToEcommerceItem(plan.id, 1, index)
  );
}

// Ecommerce Event Interfaces
export interface ViewItemListEvent {
  event: 'view_item_list';
  ecommerce: {
    item_list_id?: string;
    item_list_name: ProductListName;
    items: EcommerceItem[];
  };
}

export interface ViewItemEvent {
  event: 'view_item';
  ecommerce: {
    currency: string;
    value: number;
    items: EcommerceItem[];
  };
}

export interface AddToCartEvent {
  event: 'add_to_cart';
  ecommerce: {
    currency: string;
    value: number;
    items: EcommerceItem[];
  };
}

export interface BeginCheckoutEvent {
  event: 'begin_checkout';
  ecommerce: {
    currency: string;
    value: number;
    items: EcommerceItem[];
  };
}

export interface PurchaseEvent {
  event: 'purchase';
  ecommerce: {
    transaction_id: string;
    value: number;
    tax?: number;
    shipping?: number;
    currency: string;
    coupon?: string;
    items: EcommerceItem[];
  };
}

export interface ViewPromotionEvent {
  event: 'view_promotion';
  ecommerce: {
    creative_name?: string;
    creative_slot?: string;
    promotion_id?: string;
    promotion_name?: string;
    items?: EcommerceItem[];
  };
}

export interface SelectPromotionEvent {
  event: 'select_promotion';
  ecommerce: {
    creative_name?: string;
    creative_slot?: string;
    promotion_id?: string;
    promotion_name?: string;
    items?: EcommerceItem[];
  };
}

// Currency (USD for all StudyBuddy transactions)
export const ECOMMERCE_CURRENCY = 'USD';

// Promotion definitions
export interface Promotion {
  id: string;
  name: string;
  creative: string;
  slot: string;
}

export const PROMOTIONS = {
  PASS_GUARANTEE: {
    id: 'pass_guarantee_2026',
    name: 'Pass Guarantee',
    creative: 'Pass or Get Your Money Back',
    slot: 'pricing_page_top',
  },
  QUARTERLY_SAVINGS: {
    id: 'quarterly_savings_2026',
    name: 'Quarterly Plan Savings',
    creative: 'Save $15.97 with 3-Month Plan',
    slot: 'pricing_card_badge',
  },
  FREE_DIAGNOSTIC: {
    id: 'free_diagnostic_2026',
    name: 'Free Diagnostic Test',
    creative: 'Start Free TEAS Diagnostic',
    slot: 'hero_cta',
  },
} as const;

export default {
  planToEcommerceItem,
  getAllEcommerceItems,
  ECOMMERCE_CURRENCY,
  PROMOTIONS,
};
