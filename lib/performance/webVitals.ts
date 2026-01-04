/**
 * Performance Monitoring Utilities
 * Track and report Core Web Vitals
 * Last updated: 2026-01-04
 */

import { pushEvent } from '@/config/analytics';

/**
 * Core Web Vitals thresholds (Google's recommended values)
 */
export const WEB_VITALS_THRESHOLDS = {
  LCP: {
    GOOD: 2500, // ms
    NEEDS_IMPROVEMENT: 4000,
  },
  FID: {
    GOOD: 100, // ms
    NEEDS_IMPROVEMENT: 300,
  },
  CLS: {
    GOOD: 0.1,
    NEEDS_IMPROVEMENT: 0.25,
  },
  FCP: {
    GOOD: 1800, // ms
    NEEDS_IMPROVEMENT: 3000,
  },
  TTFB: {
    GOOD: 800, // ms
    NEEDS_IMPROVEMENT: 1800,
  },
  INP: {
    GOOD: 200, // ms
    NEEDS_IMPROVEMENT: 500,
  },
};

/**
 * Get rating for a metric value
 */
function getRating(
  metricName: keyof typeof WEB_VITALS_THRESHOLDS,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = WEB_VITALS_THRESHOLDS[metricName];
  
  if (value <= thresholds.GOOD) return 'good';
  if (value <= thresholds.NEEDS_IMPROVEMENT) return 'needs-improvement';
  return 'poor';
}

/**
 * Report web vital to analytics
 */
export function reportWebVital(
  name: string,
  value: number,
  rating: string,
  delta: number,
  id: string
): void {
  pushEvent({
    event: 'web_vitals',
    metric_name: name,
    metric_value: Math.round(value),
    metric_rating: rating,
    metric_delta: Math.round(delta),
    metric_id: id,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${name}:`, {
      value: Math.round(value),
      rating,
      delta: Math.round(delta),
    });
  }
}

/**
 * Track Largest Contentful Paint (LCP)
 */
export function trackLCP(): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (lastEntry) {
        const value = lastEntry.renderTime || lastEntry.loadTime;
        const rating = getRating('LCP', value);
        
        reportWebVital('LCP', value, rating, value, lastEntry.id || 'unknown');
      }
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (error) {
    console.error('[Performance] Error tracking LCP:', error);
  }
}

/**
 * Track First Input Delay (FID)
 */
export function trackFID(): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry: any) => {
        const value = entry.processingStart - entry.startTime;
        const rating = getRating('FID', value);
        
        reportWebVital('FID', value, rating, value, entry.id || 'unknown');
      });
    });

    observer.observe({ type: 'first-input', buffered: true });
  } catch (error) {
    console.error('[Performance] Error tracking FID:', error);
  }
}

/**
 * Track Cumulative Layout Shift (CLS)
 */
export function trackCLS(): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  let clsValue = 0;
  let clsEntries: any[] = [];

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          clsEntries.push(entry);
        }
      });
    });

    observer.observe({ type: 'layout-shift', buffered: true });

    // Report CLS on page hide
    const reportCLS = () => {
      const rating = getRating('CLS', clsValue);
      reportWebVital('CLS', clsValue, rating, clsValue, 'v3-' + Date.now());
    };

    ['visibilitychange', 'pagehide'].forEach(event => {
      addEventListener(event, reportCLS, { once: true });
    });
  } catch (error) {
    console.error('[Performance] Error tracking CLS:', error);
  }
}

/**
 * Track First Contentful Paint (FCP)
 */
export function trackFCP(): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcpEntry = entries.find((entry) => entry.name === 'first-contentful-paint');
      
      if (fcpEntry) {
        const value = fcpEntry.startTime;
        const rating = getRating('FCP', value);
        
        reportWebVital('FCP', value, rating, value, 'v3-' + Date.now());
      }
    });

    observer.observe({ type: 'paint', buffered: true });
  } catch (error) {
    console.error('[Performance] Error tracking FCP:', error);
  }
}

/**
 * Track Time to First Byte (TTFB)
 */
export function trackTTFB(): void {
  if (typeof window === 'undefined' || !('performance' in window)) return;

  try {
    const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navTiming) {
      const value = navTiming.responseStart - navTiming.requestStart;
      const rating = getRating('TTFB', value);
      
      reportWebVital('TTFB', value, rating, value, 'v3-' + Date.now());
    }
  } catch (error) {
    console.error('[Performance] Error tracking TTFB:', error);
  }
}

/**
 * Initialize all web vitals tracking
 */
export function initWebVitals(): void {
  if (typeof window === 'undefined') return;

  // Wait for page to be interactive
  if (document.readyState === 'complete') {
    startTracking();
  } else {
    window.addEventListener('load', startTracking, { once: true });
  }
}

function startTracking(): void {
  trackLCP();
  trackFID();
  trackCLS();
  trackFCP();
  trackTTFB();
}

/**
 * Get performance metrics summary
 */
export function getPerformanceMetrics(): Record<string, number> | null {
  if (typeof window === 'undefined' || !('performance' in window)) return null;

  try {
    const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paintEntries = performance.getEntriesByType('paint');
    
    const fcp = paintEntries.find((entry) => entry.name === 'first-contentful-paint');
    
    return {
      // Navigation timing
      dns: navTiming.domainLookupEnd - navTiming.domainLookupStart,
      tcp: navTiming.connectEnd - navTiming.connectStart,
      ttfb: navTiming.responseStart - navTiming.requestStart,
      download: navTiming.responseEnd - navTiming.responseStart,
      domInteractive: navTiming.domInteractive,
      domComplete: navTiming.domComplete,
      loadComplete: navTiming.loadEventEnd - navTiming.loadEventStart,
      
      // Paint timing
      fcp: fcp?.startTime || 0,
    };
  } catch (error) {
    console.error('[Performance] Error getting metrics:', error);
    return null;
  }
}

export default {
  WEB_VITALS_THRESHOLDS,
  initWebVitals,
  trackLCP,
  trackFID,
  trackCLS,
  trackFCP,
  trackTTFB,
  getPerformanceMetrics,
  reportWebVital,
};
