/**
 * Smart CTA Component
 * Personalized call-to-action based on user segment and traffic source
 * Last updated: 2026-01-04
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DIAGNOSTIC } from '@/config/links';
import { trackDiagnosticStart } from '@/config/analytics';
import { getPersonalizedMessage, markVisited, getUserSegment } from '@/lib/personalization/userSegment';
import { getTrafficSource } from '@/lib/personalization/trafficSource';

interface SmartCTAProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function SmartCTA({ 
  size = 'md', 
  variant = 'primary',
  className = '' 
}: SmartCTAProps) {
  const [ctaText, setCtaText] = useState('Start Free TEAS Diagnostic');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Mark user as visited
    markVisited();

    // Get personalized CTA text
    const message = getPersonalizedMessage('cta');
    setCtaText(message);
    setIsLoaded(true);

    // Track segment for analytics
    const segment = getUserSegment();
    const traffic = getTrafficSource();

    if (process.env.NODE_ENV === 'development') {
      console.log('[SmartCTA] User segment:', segment);
      console.log('[SmartCTA] Traffic source:', traffic.source);
      console.log('[SmartCTA] Personalized CTA:', message);
    }
  }, []);

  const handleClick = () => {
    const segment = getUserSegment();
    trackDiagnosticStart(`smart_cta_${segment}`);
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-teal-600 hover:bg-teal-700 text-white',
    secondary: 'bg-white hover:bg-gray-50 text-teal-600 border-2 border-teal-600',
  };

  return (
    <Link
      href={DIAGNOSTIC}
      onClick={handleClick}
      className={`
        inline-block
        font-semibold
        rounded-lg
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
        active:transform active:scale-95
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
        ${!isLoaded ? 'opacity-0' : 'opacity-100'}
      `}
      aria-label={ctaText}
    >
      {ctaText}
    </Link>
  );
}

export default SmartCTA;
