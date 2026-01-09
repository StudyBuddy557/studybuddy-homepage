// app/components/analytics/AnalyticsProvider.tsx
'use client';

import { useEffect, Suspense, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { gtm } from '@/lib/analytics/providers/gtm';
import { fbPixel } from '@/lib/analytics/providers/pixel';
import { ga4 } from '@/lib/analytics/providers/ga4';
import { analyticsConfig } from '@/lib/analytics/core/config';
import { logger } from '@/lib/analytics/core/logger';
import { eventQueue } from '@/lib/analytics/core/queue';

const GTM_ID = 'GTM-PJRBS3FP';
const FB_PIXEL_ID = '1399867675053488';
const GA4_MEASUREMENT_ID = 'G-GQFJVTN22P';

function RouteChangeTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    gtm.pageview(url, document.title);
    fbPixel.pageview();
    ga4.pageview(url);

    logger.info('Pageview tracked', { url });
  }, [pathname, searchParams]);

  return null;
}

function AnalyticsInitializer() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;

    gtm.init();
    fbPixel.init();
    ga4.init();

    setInitialized(true);
    logger.info('Analytics providers initialized');

    return () => {
      eventQueue.destroy();
    };
  }, [initialized]);

  return null;
}

interface AnalyticsProviderProps {
  children: React.ReactNode;
  userId?: string;
  userEmail?: string;
}

export function AnalyticsProvider({ children, userId, userEmail }: AnalyticsProviderProps) {
  useEffect(() => {
    if (userId) {
      gtm.setUserProperties({ user_id: userId, user_email: userEmail });
      logger.info('User properties set', { userId });
    }
  }, [userId, userEmail]);

  return (
    <>
      {GTM_ID && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      )}

      {FB_PIXEL_ID && (
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
            `,
          }}
        />
      )}

      {GA4_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
              `,
            }}
          />
        </>
      )}

      <AnalyticsInitializer />

      <Suspense fallback={null}>
        <RouteChangeTracker />
      </Suspense>

      {children}
    </>
  );
}
