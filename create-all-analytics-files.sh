#!/bin/bash

echo "🚀 Creating Enterprise Analytics Infrastructure for StudyBuddy..."

# Create directory structure
echo "📁 Creating directories..."
mkdir -p lib/analytics/core
mkdir -p lib/analytics/providers
mkdir -p lib/analytics/tracking
mkdir -p lib/analytics/server
mkdir -p app/components/analytics
mkdir -p app/api/tracking
mkdir -p app/api/webhook

# ============================================
# CORE FILES
# ============================================

echo "📝 Creating core type definitions..."
cat > lib/analytics/core/types.ts << 'EOFTYPE'
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
EOFTYPE

echo "📝 Creating config..."
cat > lib/analytics/core/config.ts << 'EOFCONFIG'
// lib/analytics/core/config.ts

import { AnalyticsConfig } from './types';

class AnalyticsConfiguration {
  private static instance: AnalyticsConfiguration;
  private config: AnalyticsConfig;

  private constructor() {
    this.config = {
      gtmId: process.env.NEXT_PUBLIC_GTM_ID,
      fbPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
      ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
      tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
      debug: process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true',
      enableQueue: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS_QUEUE === 'true',
      enableServerSide: process.env.NEXT_PUBLIC_ENABLE_SERVER_SIDE_TRACKING === 'true',
      environment: (process.env.NEXT_PUBLIC_ENV as any) || 'production',
    };
  }

  public static getInstance(): AnalyticsConfiguration {
    if (!AnalyticsConfiguration.instance) {
      AnalyticsConfiguration.instance = new AnalyticsConfiguration();
    }
    return AnalyticsConfiguration.instance;
  }

  public getConfig(): AnalyticsConfig {
    return { ...this.config };
  }

  public isEnabled(provider: 'gtm' | 'facebook' | 'ga4' | 'tiktok'): boolean {
    const idMap = {
      gtm: this.config.gtmId,
      facebook: this.config.fbPixelId,
      ga4: this.config.ga4MeasurementId,
      tiktok: this.config.tiktokPixelId,
    };
    return Boolean(idMap[provider]);
  }

  public shouldDebug(): boolean {
    return this.config.debug || this.config.environment !== 'production';
  }
}

export const analyticsConfig = AnalyticsConfiguration.getInstance();
EOFCONFIG

echo "📝 Creating logger..."
cat > lib/analytics/core/logger.ts << 'EOFLOGGER'
// lib/analytics/core/logger.ts

import { analyticsConfig } from './config';

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

class AnalyticsLogger {
  private static instance: AnalyticsLogger;
  private logs: Array<{ level: LogLevel; message: string; data?: any; timestamp: number }> = [];
  private maxLogs = 100;

  private constructor() {}

  public static getInstance(): AnalyticsLogger {
    if (!AnalyticsLogger.instance) {
      AnalyticsLogger.instance = new AnalyticsLogger();
    }
    return AnalyticsLogger.instance;
  }

  private shouldLog(): boolean {
    return analyticsConfig.shouldDebug();
  }

  private addLog(level: LogLevel, message: string, data?: any): void {
    const logEntry = {
      level,
      message,
      data,
      timestamp: Date.now(),
    };

    this.logs.push(logEntry);

    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  public debug(message: string, data?: any): void {
    this.addLog(LogLevel.DEBUG, message, data);
    if (this.shouldLog()) {
      console.log(\`[Analytics Debug] \${message}\`, data || '');
    }
  }

  public info(message: string, data?: any): void {
    this.addLog(LogLevel.INFO, message, data);
    if (this.shouldLog()) {
      console.info(\`[Analytics Info] \${message}\`, data || '');
    }
  }

  public warn(message: string, data?: any): void {
    this.addLog(LogLevel.WARN, message, data);
    if (this.shouldLog()) {
      console.warn(\`[Analytics Warning] \${message}\`, data || '');
    }
  }

  public error(message: string, error?: any): void {
    this.addLog(LogLevel.ERROR, message, error);
    if (this.shouldLog()) {
      console.error(\`[Analytics Error] \${message}\`, error || '');
    }
  }

  public getLogs(): typeof this.logs {
    return [...this.logs];
  }

  public clearLogs(): void {
    this.logs = [];
  }
}

export const logger = AnalyticsLogger.getInstance();
EOFLOGGER

echo "📝 Creating queue..."
cat > lib/analytics/core/queue.ts << 'EOFQUEUE'
// lib/analytics/core/queue.ts

import { TrackingEvent } from './types';
import { logger } from './logger';
import { analyticsConfig } from './config';

interface QueueConfig {
  maxSize: number;
  flushInterval: number;
  retryAttempts: number;
  retryDelay: number;
}

class EventQueue {
  private static instance: EventQueue;
  private queue: TrackingEvent[] = [];
  private processing = false;
  private config: QueueConfig = {
    maxSize: 50,
    flushInterval: 2000,
    retryAttempts: 3,
    retryDelay: 1000,
  };
  private flushTimer?: NodeJS.Timeout;

  private constructor() {
    if (typeof window !== 'undefined' && analyticsConfig.getConfig().enableQueue) {
      this.startAutoFlush();
      this.setupBeforeUnload();
    }
  }

  public static getInstance(): EventQueue {
    if (!EventQueue.instance) {
      EventQueue.instance = new EventQueue();
    }
    return EventQueue.instance;
  }

  public enqueue(event: TrackingEvent): void {
    if (!analyticsConfig.getConfig().enableQueue) {
      this.processEvent(event);
      return;
    }

    this.queue.push(event);
    logger.debug('Event queued', { event, queueSize: this.queue.length });

    if (this.queue.length >= this.config.maxSize) {
      this.flush();
    }
  }

  private async processEvent(event: TrackingEvent): Promise<void> {
    try {
      if (analyticsConfig.getConfig().enableServerSide) {
        await this.sendToServer(event);
      }
    } catch (error) {
      logger.error('Failed to process event', error);
    }
  }

  private async sendToServer(event: TrackingEvent, attempt = 1): Promise<void> {
    try {
      const response = await fetch('/api/tracking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });

      if (!response.ok && attempt < this.config.retryAttempts) {
        await new Promise((resolve) => setTimeout(resolve, this.config.retryDelay * attempt));
        return this.sendToServer(event, attempt + 1);
      }

      logger.debug('Event sent to server', { event, attempt });
    } catch (error) {
      logger.error('Failed to send event to server', { error, event, attempt });
      if (attempt < this.config.retryAttempts) {
        await new Promise((resolve) => setTimeout(resolve, this.config.retryDelay * attempt));
        return this.sendToServer(event, attempt + 1);
      }
    }
  }

  public async flush(): Promise<void> {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;
    const eventsToProcess = [...this.queue];
    this.queue = [];

    logger.info('Flushing event queue', { count: eventsToProcess.length });

    for (const event of eventsToProcess) {
      await this.processEvent(event);
    }

    this.processing = false;
  }

  private startAutoFlush(): void {
    this.flushTimer = setInterval(() => {
      if (this.queue.length > 0) {
        this.flush();
      }
    }, this.config.flushInterval);
  }

  private setupBeforeUnload(): void {
    window.addEventListener('beforeunload', () => {
      if (this.queue.length > 0) {
        const events = [...this.queue];
        this.queue = [];
        
        const blob = new Blob([JSON.stringify(events)], { type: 'application/json' });
        navigator.sendBeacon('/api/tracking', blob);
        
        logger.info('Sent queued events via sendBeacon', { count: events.length });
      }
    });
  }

  public getQueueSize(): number {
    return this.queue.length;
  }

  public clearQueue(): void {
    this.queue = [];
    logger.info('Queue cleared');
  }

  public destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    this.flush();
  }
}

export const eventQueue = EventQueue.getInstance();
EOFQUEUE

echo ""
echo "✅ Created all core files!"
echo ""
echo "📦 Files created:"
echo "  - lib/analytics/core/types.ts"
echo "  - lib/analytics/core/config.ts"
echo "  - lib/analytics/core/logger.ts"
echo "  - lib/analytics/core/queue.ts"
echo ""
echo "🎯 Next: I'll provide Part 2 script for providers and components"
