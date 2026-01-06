// lib/analytics/types.ts
/**
 * Analytics Event Type Definitions
 * 
 * Defines strongly-typed event schemas for the analytics system.
 * All events include standard attribution fields (UTM params, page context).
 */

/**
 * Standard fields included in every event
 */
export interface BaseEventFields {
  /** Current page path */
  page_path: string;
  /** Document referrer */
  referrer: string;
  /** UTM source parameter */
  utm_source?: string;
  /** UTM medium parameter */
  utm_medium?: string;
  /** UTM campaign parameter */
  utm_campaign?: string;
  /** UTM content parameter */
  utm_content?: string;
  /** UTM term parameter */
  utm_term?: string;
  /** Timestamp in ISO format */
  timestamp: string;
}

/**
 * Diagnostic funnel events
 */
export interface DiagnosticStartEvent extends BaseEventFields {
  event: 'diagnostic_start';
  content_id: 'diagnostic_entry';
}

export interface DiagnosticCompleteEvent extends BaseEventFields {
  event: 'diagnostic_complete';
  content_id: 'diagnostic_results';
  /** Total questions answered */
  questions_answered?: number;
  /** Time spent in seconds */
  time_spent?: number;
}

/**
 * Lead capture events
 */
export interface LeadSubmitEvent extends BaseEventFields {
  event: 'lead_submit';
  content_id: string;
  lead_type: 'email_capture' | 'diagnostic' | 'calculator' | 'other';
  /** Email domain for validation tracking (not PII) */
  email_domain?: string;
}

/**
 * Pricing and checkout events
 */
export interface PricingViewEvent extends BaseEventFields {
  event: 'pricing_view';
  content_id: 'pricing_page';
}

export interface CheckoutClickEvent extends BaseEventFields {
  event: 'checkout_click';
  content_id: string;
  /** Plan identifier: 'basic' | 'pro' */
  plan?: string;
  /** Plan price in USD */
  value?: number;
  /** Currency code */
  currency?: string;
}

export interface PurchaseEvent extends BaseEventFields {
  event: 'purchase';
  transaction_id: string;
  value: number;
  currency: string;
  content_id: string;
}

/**
 * AI Tutor engagement events
 */
export interface AITutorOpenEvent extends BaseEventFields {
  event: 'ai_tutor_open';
  content_id: 'ai_tutor';
  source?: 'diagnostic' | 'dashboard' | 'lesson' | 'direct';
}

export interface AITutorMessageEvent extends BaseEventFields {
  event: 'ai_tutor_message';
  content_id: 'ai_tutor';
  /** Message number in session */
  message_number?: number;
  /** Message type: question or clarification */
  message_type?: 'question' | 'clarification' | 'followup';
}

/**
 * Share and engagement events
 */
export interface ShareExplanationEvent extends BaseEventFields {
  event: 'share_explanation';
  content_id: string;
  platform_selected?: 'download' | 'twitter' | 'facebook' | 'linkedin' | 'copy_link';
  /** Subject area if relevant */
  subject?: string;
}

/**
 * Calculator tool events
 */
export interface CalculatorSubmitEvent extends BaseEventFields {
  event: 'calculator_submit';
  content_id: 'teas_calculator';
  /** Calculated total score (0-100) */
  score?: number;
}

/**
 * Page view tracking
 */
export interface PageViewEvent extends BaseEventFields {
  event: 'page_view';
  /** Page title */
  page_title: string;
}

/**
 * Union type of all possible events
 */
export type AnalyticsEvent =
  | DiagnosticStartEvent
  | DiagnosticCompleteEvent
  | LeadSubmitEvent
  | PricingViewEvent
  | CheckoutClickEvent
  | PurchaseEvent
  | AITutorOpenEvent
  | AITutorMessageEvent
  | ShareExplanationEvent
  | CalculatorSubmitEvent
  | PageViewEvent;

/**
 * Event names for type-safe event dispatching
 */
export type EventName = AnalyticsEvent['event'];

/**
 * Extract event payload type by event name
 */
export type EventPayload<T extends EventName> = Extract<AnalyticsEvent, { event: T }>;

/**
 * Analytics adapter interface
 */
export interface AnalyticsAdapter {
  /** Adapter name for identification */
  name: string;
  /** Initialize the adapter */
  initialize(): void;
  /** Track an event */
  track(event: AnalyticsEvent): void;
  /** Check if adapter is ready */
  isReady(): boolean;
}

/**
 * UTM parameters object
 */
export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

/**
 * Analytics configuration
 */
export interface AnalyticsConfig {
  /** Enable debug logging */
  debug?: boolean;
  /** Adapters to register */
  adapters?: AnalyticsAdapter[];
  /** Enable automatic page view tracking */
  autoPageViews?: boolean;
}
