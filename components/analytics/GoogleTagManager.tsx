/**
 * Google Tag Manager Component for Next.js App Router
 * Implements GTM correctly for SSR and client-side tracking
 */

'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { GTM_CONFIG, initGTM, getGTMScripts } from '@/config/analytics';

export function GoogleTagManager() {
  // Don't render in development or if disabled
  if (!GTM_CONFIG.enabled) {
    return null;
  }

  const scripts = getGTMScripts();

  useEffect(() => {
    initGTM();
  }, []);

  return (
    <>
      {/* GTM Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_CONFIG.containerId}');
          `,
        }}
      />

      {/* GTM Noscript Fallback */}
      <noscript>
        <iframe
          src={scripts.noscript}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}

export default GoogleTagManager;
