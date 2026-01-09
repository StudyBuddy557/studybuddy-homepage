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
