'use client';

import Script from 'next/script';

export default function Analytics() {
  return (
    <>
      {/* 1. Google Analytics 4 (The standard for traffic) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} // Replace with your Real ID later
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX'); // Replace with your Real ID
        `}
      </Script>

      {/* 2. Meta Pixel (Facebook/Instagram Retargeting) */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', 'YOUR_PIXEL_ID'); // Replace with Real ID
          fbq('track', 'PageView');
        `}
      </Script>
      
      {/* 3. TikTok Pixel (Aggressive Gen-Z targeting for Nursing students) */}
      {/* Add TikTok script here later if needed */}
    </>
  );
}