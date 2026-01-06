import type { AnalyticsAdapter, AnalyticsEvent } from '../types';

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

export class GTMAdapter implements AnalyticsAdapter {
  name = 'gtm';
  private containerId: string;
  private initialized = false;

  constructor(containerId: string) {
    this.containerId = containerId;
  }

  initialize(): void {
    if (typeof window === 'undefined') return;
    if (!this.containerId) return;
    window.dataLayer = window.dataLayer || [];
    this.initialized = true;
  }

  track(event: AnalyticsEvent): void {
    if (!this.isReady()) return;
    window.dataLayer?.push({ event: event.event, ...event });
  }

  isReady(): boolean {
    return this.initialized && typeof window !== 'undefined' && Array.isArray(window.dataLayer);
  }
}
