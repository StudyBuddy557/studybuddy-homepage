// lib/analytics/server/facebook-capi.ts

import crypto from 'crypto';
import { PurchaseData, UserData } from '../core/types';

interface FacebookCAPIEvent {
  event_name: string;
  event_time: number;
  event_id?: string;
  event_source_url: string;
  action_source: 'website' | 'email' | 'app' | 'phone_call' | 'chat' | 'physical_store' | 'system_generated' | 'other';
  user_data: {
    em?: string;
    ph?: string;
    fn?: string;
    ln?: string;
    ct?: string;
    st?: string;
    zp?: string;
    country?: string;
    external_id?: string;
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string;
    fbp?: string;
  };
  custom_data?: {
    value?: number;
    currency?: string;
    content_name?: string;
    content_ids?: string[];
    content_type?: string;
    num_items?: number;
    [key: string]: any;
  };
}

export class FacebookConversionAPI {
  private pixelId: string;
  private accessToken: string;
  private apiVersion: string = 'v21.0';

  constructor() {
    this.pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';
    this.accessToken = process.env.FB_CONVERSION_API_TOKEN || '';
  }

  private hashValue(value: string): string {
    return crypto.createHash('sha256').update(value.toLowerCase().trim()).digest('hex');
  }

  private prepareUserData(userData: Partial<UserData>): FacebookCAPIEvent['user_data'] {
    const hashed: FacebookCAPIEvent['user_data'] = {
      client_ip_address: userData.clientIpAddress,
      client_user_agent: userData.clientUserAgent,
      fbc: userData.fbc,
      fbp: userData.fbp,
    };

    if (userData.email) hashed.em = this.hashValue(userData.email);
    if (userData.phone) hashed.ph = this.hashValue(userData.phone.replace(/\D/g, ''));
    if (userData.firstName) hashed.fn = this.hashValue(userData.firstName);
    if (userData.lastName) hashed.ln = this.hashValue(userData.lastName);
    if (userData.city) hashed.ct = this.hashValue(userData.city);
    if (userData.state) hashed.st = this.hashValue(userData.state);
    if (userData.zipCode) hashed.zp = this.hashValue(userData.zipCode.replace(/\D/g, ''));
    if (userData.country) hashed.country = this.hashValue(userData.country);
    if (userData.externalId) hashed.external_id = userData.externalId;

    return hashed;
  }

  public async trackPurchase(
    purchaseData: PurchaseData,
    userData: Partial<UserData>,
    eventSourceUrl: string
  ): Promise<boolean> {
    if (!this.pixelId || !this.accessToken) {
      console.error('Facebook CAPI not configured');
      return false;
    }

    const event: FacebookCAPIEvent = {
      event_name: 'Purchase',
      event_time: Math.floor(Date.now() / 1000),
      event_id: purchaseData.transactionId,
      event_source_url: eventSourceUrl,
      action_source: 'website',
      user_data: this.prepareUserData(userData),
      custom_data: {
        value: purchaseData.value,
        currency: purchaseData.currency,
        content_ids: purchaseData.items?.map((i) => i.item_id) || [],
        content_type: 'product',
        num_items: purchaseData.items?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 1,
      },
    };

    return this.sendEvent(event);
  }

  public async trackLead(
    userData: Partial<UserData>,
    eventSourceUrl: string,
    value?: number
  ): Promise<boolean> {
    const event: FacebookCAPIEvent = {
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: eventSourceUrl,
      action_source: 'website',
      user_data: this.prepareUserData(userData),
      custom_data: value ? { value, currency: 'USD' } : undefined,
    };

    return this.sendEvent(event);
  }

  private async sendEvent(event: FacebookCAPIEvent): Promise<boolean> {
    try {
      const url = `https://graph.facebook.com/${this.apiVersion}/${this.pixelId}/events`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [event],
          access_token: this.accessToken,
          test_event_code: process.env.FB_TEST_EVENT_CODE,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Facebook CAPI error:', result);
        return false;
      }

      console.log('Facebook CAPI success:', result);
      return true;
    } catch (error) {
      console.error('Facebook CAPI request failed:', error);
      return false;
    }
  }
}
