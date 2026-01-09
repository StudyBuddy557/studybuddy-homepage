// lib/analytics/core/types.ts

export interface AnalyticsConfig {
  gtmId?: string;
  fbPixelId?: string;
  ga4MeasurementId?: string;
  tiktokPixelId?: string;
  debug: boolean;
  enableQueue: boolean;
  enableServerSide: boolean;
  environment: 'development' | 'staging' | 'production';
}

export interface UserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  externalId?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  fbp?: string;
  fbc?: string;
}

export interface EcommerceItem {
  item_id: string;
  item_name: string;
  item_brand?: string;
  item_category?: string;
  item_category2?: string;
  item_variant?: string;
  price: number;
  quantity?: number;
  currency?: string;
}

export interface PurchaseData {
  transactionId: string;
  value: number;
  currency: string;
  tax?: number;
  shipping?: number;
  items?: EcommerceItem[];
  coupon?: string;
  affiliation?: string;
}

export interface EventData {
  event: string;
  eventCategory?: string;
  eventAction?: string;
  eventLabel?: string;
  value?: number;
  currency?: string;
  [key: string]: any;
}

export interface TrackingEvent {
  type: 'pageview' | 'event' | 'purchase' | 'lead' | 'custom';
  data: EventData | PurchaseData;
  userData?: UserData;
  timestamp: number;
  sessionId: string;
  provider: 'gtm' | 'facebook' | 'ga4' | 'tiktok' | 'all';
}

export enum ConversionEvent {
  PURCHASE = 'purchase',
  SUBSCRIBE = 'subscribe',
  LEAD = 'lead',
  SIGN_UP = 'sign_up',
  ADD_TO_CART = 'add_to_cart',
  BEGIN_CHECKOUT = 'begin_checkout',
  ADD_PAYMENT_INFO = 'add_payment_info',
  VIEW_ITEM = 'view_item',
  VIEW_CONTENT = 'view_content',
  SEARCH = 'search',
}
