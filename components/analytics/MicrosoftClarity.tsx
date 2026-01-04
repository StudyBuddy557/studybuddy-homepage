/**
 * Microsoft Clarity Component
 * Integrates heatmapping and session recording
 * Last updated: 2026-01-04
 */

'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { CLARITY_CONFIG, setClarityTag } from '@/config/clarity';
import { getUserSegment } from '@/lib/personalization/userSegment';
import { getTrafficSource } from '@/lib/personalization/trafficSource';

export function MicrosoftClarity() {
  // Don't render if disabled or no project ID
  if (!CLARITY_CONFIG.enabled || !CLARITY_CONFIG.projectId) {
    return null;
  }

  useEffect(() => {
    // Tag session with user segment and traffic source
    // This helps filter sessions in Clarity dashboard
    const segment = getUserSegment();
    const traffic = getTrafficSource();

    setClarityTag('user_segment', segment);
    setClarityTag('traffic_source', traffic.source);
    
    if (traffic.campaign) {
      setClarityTag('campaign', traffic.campaign);
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Clarity] Session tagged:', { segment, source: traffic.source });
    }
  }, []);

  return (
    <Script
      id="clarity-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_CONFIG.projectId}");
        `,
      }}
    />
  );
}

export default MicrosoftClarity;
