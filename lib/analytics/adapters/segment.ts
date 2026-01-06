import type { AnalyticsAdapter, AnalyticsEvent } from '../types';

export class SegmentAdapter implements AnalyticsAdapter {
  name = 'segment';
  private writeKey: string;
  private ready = false;

  constructor(writeKey: string) {
    this.writeKey = writeKey;
  }

  initialize(): void {
    this.ready = true;
  }

  track(event: AnalyticsEvent): void {
    // Placeholder for future Segment integration
  }

  isReady(): boolean {
    return this.ready;
  }
}
