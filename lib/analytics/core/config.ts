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
