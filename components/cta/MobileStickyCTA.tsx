/**
 * Mobile Sticky CTA Component
 * Appears on mobile devices after scrolling past hero
 * Now with personalized messaging based on user segment
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DIAGNOSTIC } from '@/config/links';
import { trackDiagnosticStart } from '@/config/analytics';
import { getPersonalizedMessage, getUserSegment } from '@/lib/personalization/userSegment';

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [ctaText, setCtaText] = useState('Start Free TEAS Diagnostic');

  useEffect(() => {
    // Get personalized message
    const message = getPersonalizedMessage('cta');
    setCtaText(message);

    const handleScroll = () => {
      // Show after scrolling 400px (past hero typically)
      const scrolled = window.scrollY > 400;
      setIsVisible(scrolled);
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    const segment = getUserSegment();
    trackDiagnosticStart(`mobile_sticky_cta_${segment}`);
  };

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-50
        md:hidden
        transform transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}
      `}
      role="complementary"
      aria-label="Mobile call-to-action"
    >
      <div className="bg-white border-t border-gray-200 shadow-lg px-4 py-3">
        <Link
          href={DIAGNOSTIC}
          onClick={handleClick}
          className="
            block w-full
            bg-teal-600 hover:bg-teal-700
            text-white font-semibold
            text-center
            px-6 py-4
            rounded-lg
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
            active:bg-teal-800
            touch-target
          "
          aria-label="Start your free TEAS diagnostic test"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}

export default MobileStickyCTA;
