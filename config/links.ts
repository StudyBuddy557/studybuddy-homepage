/**
 * Centralized URL Configuration
 * Single source of truth for all navigation and CTA links
 * Last updated: 2026-01-04
 */

export const LINKS = {
  // Primary funnel URLs
  DIAGNOSTIC: '/diagnostic',
  LOGIN: 'https://learn.studybuddy.live/login',
  SIGNUP: 'https://learn.studybuddy.live/signup',
  
  // LearnWorlds URLs
  LEARNWORLDS_HOME: 'https://learn.studybuddy.live',
  LEARNWORLDS_DASHBOARD: 'https://learn.studybuddy.live/dashboard',
  
  // Internal marketing pages
  PRICING: '/pricing',
  GUARANTEE: '/guarantee',
  PASS_RATE_METHODOLOGY: '/pass-rate-methodology',
  
  // Support & Contact
  SUPPORT: 'mailto:support@studybuddy.live',
  CONTACT: 'mailto:support@studybuddy.live',
  
  // Social media (update with actual URLs if available)
  FACEBOOK: 'https://facebook.com/studybuddy',
  TWITTER: 'https://twitter.com/studybuddy',
  LINKEDIN: 'https://linkedin.com/company/studybuddy',
  
  // Stripe checkout (dynamic - constructed with plan ID)
  getCheckoutUrl: (planId: string) => {
    return `https://learn.studybuddy.live/checkout?plan=${planId}`;
  },
  
  // State-specific pages (dynamic)
  getStatePage: (stateSlug: string) => {
    return `/states/${stateSlug}`;
  },
  
  // School-specific pages (dynamic)
  getSchoolPage: (schoolSlug: string) => {
    return `/schools/${schoolSlug}`;
  },
} as const;

// Type for link keys
export type LinkKey = keyof typeof LINKS;

// Validation helper - ensures no empty or # links
export function validateLink(url: string): boolean {
  return url !== '' && url !== '#' && url.length > 0;
}

// Export individual links for convenience
export const {
  DIAGNOSTIC,
  LOGIN,
  SIGNUP,
  LEARNWORLDS_HOME,
  LEARNWORLDS_DASHBOARD,
  PRICING,
  GUARANTEE,
  PASS_RATE_METHODOLOGY,
  SUPPORT,
  CONTACT,
} = LINKS;
