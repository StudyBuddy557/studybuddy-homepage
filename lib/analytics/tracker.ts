// lib/analytics/tracker.ts
/**
 * Analytics Tracker Singleton
 * 
 * Central analytics tracking system with support for multiple adapters.
 * Automatically enriches events with UTM parameters and page context.
 */

import type { AnalyticsEvent, AnalyticsAdapter, AnalyticsConfig, EventName, BaseEventFields } from './types';
import { getUTMParams, initializeUTMTracking } from './utm';

class AnalyticsTracker {
  private adapters: AnalyticsAdapter[] = [];
  private initialized = false;
  private debug = false;
  private eventQueue: AnalyticsEvent[] = [];

  /**
   * Initialize the analytics tracker
   */
  initialize(config: AnalyticsConfig = {}): void {
    if (this.initialized) {
      console.warn('[Analytics] Tracker already initialized');
      return;
    }

    this.debug = config.debug ?? false;
    
    // Initialize UTM tracking
    initializeUTMTracking();
    
    // Register adapters
    if (config.adapters) {
      config.adapters.forEach((adapter) => this.registerAdapter(adapter));
    }
    
    this.initialized = true;
    
    if (this.debug) {
      console.log('[Analytics] Tracker initialized', {
        adapters: this.adapters.map((a) => a.name),
        debug: this.debug,
      });
    }
    
    // Flush queued events
    this.flushQueue();
  }

  /**
   * Register an analytics adapter
   */
  registerAdapter(adapter: AnalyticsAdapter): void {
    if (this.adapters.some((a) => a.name === adapter.name)) {
      console.warn(`[Analytics] Adapter "${adapter.name}" already registered`);
      return;
    }
    
    try {
      adapter.initialize();
      this.adapters.push(adapter);
      
      if (this.debug) {
        console.log(`[Analytics] Adapter registered: ${adapter.name}`);
      }
    } catch (error) {
      console.error(`[Analytics] Failed to initialize adapter "${adapter.name}":`, error);
    }
  }

  /**
   * Track an event
   */
  track<T extends EventName>(
    eventName: T,
    properties: Omit<Extract<AnalyticsEvent, { event: T }>, keyof BaseEventFields | 'event'> = {} as any
  ): void {
    if (!this.initialized) {
      console.warn('[Analytics] Tracker not initialized, queuing event');
      this.eventQueue.push(this.buildEvent(eventName, properties));
      return;
    }

    const event = this.buildEvent(eventName, properties);
    
    if (this.debug) {
      console.log('[Analytics] Event tracked:', event);
    }
    
    // Send to all adapters
    this.adapters.forEach((adapter) => {
      try {
        if (adapter.isReady()) {
          adapter.track(event);
        } else if (this.debug) {
          console.warn(`[Analytics] Adapter "${adapter.name}" not ready, skipping`);
        }
      } catch (error) {
        console.error(`[Analytics] Error in adapter "${adapter.name}":`, error);
      }
    });
  }

  /**
   * Track a page view
   */
  trackPageView(path?: string, title?: string): void {
    if (typeof window === 'undefined') return;
    
    const page_path = path ?? window.location.pathname + window.location.search;
    const page_title = title ?? document.title;
    
    this.track('page_view', { page_path, page_title } as any);
  }

  /**
   * Build a complete event with standard fields
   */
  private buildEvent<T extends EventName>(
    eventName: T,
    properties: Partial<Extract<AnalyticsEvent, { event: T }>>
  ): AnalyticsEvent {
    const baseFields = this.getBaseFields();
    
    return {
      event: eventName,
      ...baseFields,
      ...properties,
    } as AnalyticsEvent;
  }

  /**
   * Get standard fields for all events
   */
  private getBaseFields(): BaseEventFields {
    const utms = getUTMParams();
    
    return {
      page_path: typeof window !== 'undefined' ? window.location.pathname + window.location.search : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      timestamp: new Date().toISOString(),
      ...utms,
    };
  }

  /**
   * Flush queued events
   */
  private flushQueue(): void {
    if (this.eventQueue.length === 0) return;
    
    if (this.debug) {
      console.log(`[Analytics] Flushing ${this.eventQueue.length} queued events`);
    }
    
    const queue = [...this.eventQueue];
    this.eventQueue = [];
    
    queue.forEach((event) => {
      this.adapters.forEach((adapter) => {
        try {
          if (adapter.isReady()) {
            adapter.track(event);
          }
        } catch (error) {
          console.error(`[Analytics] Error flushing event to "${adapter.name}":`, error);
        }
      });
    });
  }

  /**
   * Check if tracker is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Enable or disable debug mode
   */
  setDebug(enabled: boolean): void {
    this.debug = enabled;
  }
}

// Export singleton instance
export const analytics = new AnalyticsTracker();

// Export type-safe tracking helpers
export const trackDiagnosticStart = () => 
  analytics.track('diagnostic_start', { content_id: 'diagnostic_entry' });

export const trackDiagnosticComplete = (questionsAnswered?: number, timeSpent?: number) =>
  analytics.track('diagnostic_complete', {
    content_id: 'diagnostic_results',
    questions_answered: questionsAnswered,
    time_spent: timeSpent,
  });

export const trackLeadSubmit = (contentId: string, leadType: 'email_capture' | 'diagnostic' | 'calculator' | 'other', email?: string) => {
  const emailDomain = email ? email.split('@')[1] : undefined;
  analytics.track('lead_submit', {
    content_id: contentId,
    lead_type: leadType,
    email_domain: emailDomain,
  });
};

export const trackPricingView = () =>
  analytics.track('pricing_view', { content_id: 'pricing_page' });

export const trackCheckoutClick = (plan?: string, value?: number) =>
  analytics.track('checkout_click', {
    content_id: `checkout_${plan || 'unknown'}`,
    plan,
    value,
    currency: 'USD',
  });

export const trackAITutorOpen = (source?: 'diagnostic' | 'dashboard' | 'lesson' | 'direct') =>
  analytics.track('ai_tutor_open', {
    content_id: 'ai_tutor',
    source,
  });

export const trackAITutorMessage = (messageNumber?: number, messageType?: 'question' | 'clarification' | 'followup') =>
  analytics.track('ai_tutor_message', {
    content_id: 'ai_tutor',
    message_number: messageNumber,
    message_type: messageType,
  });

export const trackShareExplanation = (contentId: string, platform?: string, subject?: string) =>
  analytics.track('share_explanation', {
    content_id: contentId,
    platform_selected: platform as any,
    subject,
  });

export const trackCalculatorSubmit = (score?: number) =>
  analytics.track('calculator_submit', {
    content_id: 'teas_calculator',
    score,
  });
