// lib/analytics/adapters/console.ts
/**
 * Console Adapter for Analytics
 * 
 * Logs events to the browser console for debugging purposes.
 * Should only be enabled in development or with explicit debug flag.
 */

import type { AnalyticsAdapter, AnalyticsEvent } from '../types';

export class ConsoleAdapter implements AnalyticsAdapter {
  name = 'console';
  private enabled: boolean;

  constructor(enabled = true) {
    this.enabled = enabled;
  }

  initialize(): void {
    if (this.enabled) {
      console.log('[ConsoleAdapter] Initialized');
    }
  }

  track(event: AnalyticsEvent): void {
    if (!this.enabled) return;

    console.group(`[Analytics] ${event.event}`);
    console.table({
      Event: event.event,
      Page: event.page_path,
      'Content ID': 'content_id' in event ? event.content_id : 'N/A',
      'UTM Source': event.utm_source || 'N/A',
      'UTM Medium': event.utm_medium || 'N/A',
      'UTM Campaign': event.utm_campaign || 'N/A',
      Timestamp: event.timestamp,
    });
    console.log('Full payload:', event);
    console.groupEnd();
  }

  isReady(): boolean {
    return this.enabled;
  }
}
