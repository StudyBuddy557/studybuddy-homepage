// components/hero/VideoPlayer.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

export default function VideoPlayer(): JSX.Element | null {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for the browser to be idle before loading video logic
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => setShouldLoad(true));
    } else {
      setTimeout(() => setShouldLoad(true), 2000);
    }
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return (
    <div className="relative w-full h-full" ref={containerRef}>
       <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="object-cover w-full h-full opacity-0 animate-in fade-in duration-1000 fill-mode-forwards"
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
    </div>
  );
}