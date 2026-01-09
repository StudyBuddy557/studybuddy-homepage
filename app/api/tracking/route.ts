// app/api/tracking/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { FacebookConversionAPI } from '@/lib/analytics/server/facebook-capi';
import { TrackingEvent } from '@/lib/analytics/core/types';

const fbCAPI = new FacebookConversionAPI();

export async function POST(request: NextRequest) {
  try {
    const events: TrackingEvent | TrackingEvent[] = await request.json();
    const eventArray = Array.isArray(events) ? events : [events];

    const results = await Promise.allSettled(
      eventArray.map(async (event) => {
        if (event.type === 'purchase' && event.userData) {
          const purchaseData = event.data as any;
          const eventSourceUrl = request.headers.get('referer') || request.url;

          return fbCAPI.trackPurchase(purchaseData, event.userData, eventSourceUrl);
        }

        if (event.type === 'lead' && event.userData) {
          const eventSourceUrl = request.headers.get('referer') || request.url;
          const value = (event.data as any).value;

          return fbCAPI.trackLead(event.userData, eventSourceUrl, value);
        }

        return true;
      })
    );

    const successful = results.filter((r) => r.status === 'fulfilled').length;
    const failed = results.filter((r) => r.status === 'rejected').length;

    return NextResponse.json({
      success: true,
      processed: eventArray.length,
      successful,
      failed,
    });
  } catch (error) {
    console.error('Tracking API error:', error);
    return NextResponse.json({ success: false, error: 'Processing failed' }, { status: 500 });
  }
}
