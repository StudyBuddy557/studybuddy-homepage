/**
 * Google Tag Manager & GA4 Analytics Configuration
 * Handles event tracking, cross-domain measurement, and data layer pushes
 * Last updated: 2026-01-04
 */

// GTM Configuration
export const GTM_CONFIG = {
  containerId: 'GTM-PJRBS3FP',
  enabled: process.env.NODE_ENV === 'production',
} as const;

// GA4 Configuration
export const GA4_CONFIG = {
  measurementId: 'G-GQFJVTN22P',
  enabled: process.env.NODE_ENV === 'production',
  // Domains for cross-domain tracking
  linkerDomains: ['studybuddy.live', 'learn.studybuddy.live'],
} as const;

// Type definitions for events
export interface DiagnosticStartEvent {
  event: 'diagnostic_start';
  diagnostic_type?: string;
}

export interface SelectPlanEvent {
  event: 'select_plan';
  plan_id: string;
  plan_name: string;
  price: number;
  billing_period: string;
}

export interface BeginCheckoutEvent {
  event: 'begin_checkout';
  plan_id: string;
  plan_name: string;
  price: number;
  currency: string;
}

export interface PurchaseEvent {
  event: 'purchase';
  transaction_id: string;
  value: number;
  currency: string;
  plan_id: string;
  plan_name: string;
}

export type AnalyticsEvent =
  | DiagnosticStartEvent
  | SelectPlanEvent
  | BeginCheckoutEvent
  | PurchaseEvent;

// Data layer helper
declare global {
  interface Window {
    dataLayer: Array<Record<string, any>>;
  }
}

/**
 * Push event to GTM data layer
 * Safely handles SSR and ensures GTM is loaded
 */
export function pushEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') {
    // SSR - do nothing
    return;
  }

  // Initialize dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || [];

  // Push event
  window.dataLayer.push(event);

  // Debug log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Event pushed:', event);
  }
}

/**
 * Track diagnostic start
 */
export function trackDiagnosticStart(diagnosticType?: string): void {
  pushEvent({
    event: 'diagnostic_start',
    diagnostic_type: diagnosticType,
  });
}

/**
 * Track plan selection (user clicks pricing card)
 */
export function trackSelectPlan(planId: string, planName: string, price: number, billingPeriod: string): void {
  pushEvent({
    event: 'select_plan',
    plan_id: planId,
    plan_name: planName,
    price: price,
    billing_period: billingPeriod,
  });
}

/**
 * Track checkout initiation (user clicks button that sends to Stripe)
 */
export function trackBeginCheckout(
  planId: string,
  planName: string,
  price: number,
  currency: string = 'USD'
): void {
  pushEvent({
    event: 'begin_checkout',
    plan_id: planId,
    plan_name: planName,
    price: price,
    currency: currency,
  });
}

/**
 * Track completed purchase (server-side via webhook)
 * This should be called from your Stripe webhook handler
 */
export function trackPurchase(
  transactionId: string,
  planId: string,
  planName: string,
  value: number,
  currency: string = 'USD'
): void {
  pushEvent({
    event: 'purchase',
    transaction_id: transactionId,
    plan_id: planId,
    plan_name: planName,
    value: value,
    currency: currency,
  });
}

/**
 * Initialize GTM - call this in your _app or layout
 */
export function initGTM(): void {
  if (typeof window === 'undefined' || !GTM_CONFIG.enabled) {
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });
}

/**
 * Get GTM script URLs
 */
export function getGTMScripts() {
  return {
    head: `https://www.googletagmanager.com/gtm.js?id=${GTM_CONFIG.containerId}`,
    noscript: `https://www.googletagmanager.com/ns.html?id=${GTM_CONFIG.containerId}`,
  };
}

export default {
  GTM_CONFIG,
  GA4_CONFIG,
  pushEvent,
  trackDiagnosticStart,
  trackSelectPlan,
  trackBeginCheckout,
  trackPurchase,
  initGTM,
  getGTMScripts,
};
