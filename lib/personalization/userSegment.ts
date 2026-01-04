/**
 * User Segmentation & Personalization
 * Classify users into segments for personalized messaging
 * Last updated: 2026-01-04
 */

import { getTrafficSource, type TrafficSource } from './trafficSource';

export type UserSegment =
  | 'new-organic'
  | 'new-paid'
  | 'new-social'
  | 'new-direct'
  | 'returning-engaged'
  | 'returning-cold'
  | 'high-intent'
  | 'low-intent';

export interface UserBehavior {
  isNewVisitor: boolean;
  isReturningVisitor: boolean;
  pageViewCount: number;
  timeOnSite: number; // seconds
  scrollDepth: number; // percentage
  hasInteracted: boolean; // clicked anything
  hasViewedPricing: boolean;
  hasTakenDiagnostic: boolean;
}

/**
 * Detect if user is a new visitor
 */
export function isNewVisitor(): boolean {
  if (typeof window === 'undefined') return true;

  try {
    const visited = localStorage.getItem('sb_visited');
    return !visited;
  } catch {
    return true;
  }
}

/**
 * Mark user as having visited
 */
export function markVisited(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('sb_visited', Date.now().toString());
    localStorage.setItem('sb_visit_count', (getVisitCount() + 1).toString());
  } catch (error) {
    console.error('Failed to mark visited:', error);
  }
}

/**
 * Get visit count
 */
export function getVisitCount(): number {
  if (typeof window === 'undefined') return 0;

  try {
    const count = localStorage.getItem('sb_visit_count');
    return count ? parseInt(count, 10) : 0;
  } catch {
    return 0;
  }
}

/**
 * Get time on site (seconds)
 */
export function getTimeOnSite(): number {
  if (typeof window === 'undefined') return 0;

  try {
    const arrivalTime = sessionStorage.getItem('sb_arrival_time');
    if (!arrivalTime) {
      sessionStorage.setItem('sb_arrival_time', Date.now().toString());
      return 0;
    }
    return Math.floor((Date.now() - parseInt(arrivalTime, 10)) / 1000);
  } catch {
    return 0;
  }
}

/**
 * Get current scroll depth percentage
 */
export function getScrollDepth(): number {
  if (typeof window === 'undefined') return 0;

  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  const scrollableDistance = documentHeight - windowHeight;
  const scrolledPercentage = (scrollTop / scrollableDistance) * 100;

  return Math.min(100, Math.max(0, Math.round(scrolledPercentage)));
}

/**
 * Track max scroll depth
 */
export function trackScrollDepth(): number {
  if (typeof window === 'undefined') return 0;

  const currentDepth = getScrollDepth();
  
  try {
    const maxDepth = sessionStorage.getItem('sb_max_scroll');
    const max = maxDepth ? Math.max(parseInt(maxDepth, 10), currentDepth) : currentDepth;
    sessionStorage.setItem('sb_max_scroll', max.toString());
    return max;
  } catch {
    return currentDepth;
  }
}

/**
 * Check if user has viewed pricing page
 */
export function hasViewedPricing(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    return sessionStorage.getItem('sb_viewed_pricing') === 'true';
  } catch {
    return false;
  }
}

/**
 * Mark pricing as viewed
 */
export function markPricingViewed(): void {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.setItem('sb_viewed_pricing', 'true');
  } catch (error) {
    console.error('Failed to mark pricing viewed:', error);
  }
}

/**
 * Get user behavior profile
 */
export function getUserBehavior(): UserBehavior {
  const newVisitor = isNewVisitor();
  const visitCount = getVisitCount();
  const timeOnSite = getTimeOnSite();
  const scrollDepth = trackScrollDepth();

  return {
    isNewVisitor: newVisitor,
    isReturningVisitor: !newVisitor,
    pageViewCount: visitCount,
    timeOnSite: timeOnSite,
    scrollDepth: scrollDepth,
    hasInteracted: scrollDepth > 25 || timeOnSite > 30,
    hasViewedPricing: hasViewedPricing(),
    hasTakenDiagnostic: false, // TODO: Implement diagnostic tracking
  };
}

/**
 * Classify user into segment
 */
export function getUserSegment(): UserSegment {
  const traffic = getTrafficSource();
  const behavior = getUserBehavior();

  // High intent: returning, engaged, viewed pricing
  if (
    behavior.isReturningVisitor &&
    behavior.hasViewedPricing &&
    behavior.timeOnSite > 60
  ) {
    return 'high-intent';
  }

  // Returning engaged: multiple visits, good engagement
  if (
    behavior.isReturningVisitor &&
    behavior.pageViewCount >= 2 &&
    behavior.scrollDepth > 50
  ) {
    return 'returning-engaged';
  }

  // Returning cold: came back but low engagement
  if (behavior.isReturningVisitor) {
    return 'returning-cold';
  }

  // New visitors - classify by source
  if (behavior.isNewVisitor) {
    if (traffic.source === 'google-organic') {
      return 'new-organic';
    }
    if (traffic.medium === 'cpc' || traffic.medium === 'ppc') {
      return 'new-paid';
    }
    if (['facebook', 'instagram', 'tiktok', 'linkedin', 'twitter'].includes(traffic.source)) {
      return 'new-social';
    }
    if (traffic.source === 'direct') {
      return 'new-direct';
    }
  }

  // Low intent: new, minimal engagement
  return 'low-intent';
}

/**
 * Get personalized messaging based on segment
 */
export function getPersonalizedMessage(type: 'cta' | 'headline' | 'subheadline'): string {
  const segment = getUserSegment();
  const traffic = getTrafficSource();

  const messages = {
    cta: {
      'new-organic': 'Start Free TEAS Diagnostic',
      'new-paid': 'Claim Your Free Diagnostic Test',
      'new-social': 'Join 500+ Students from ' + getSourceName(traffic.source),
      'new-direct': 'Welcome! Start Your Free Test',
      'returning-engaged': 'Continue Your Prep Journey',
      'returning-cold': 'Ready to Pass? Start Today',
      'high-intent': 'Get Started - Limited Time Offer',
      'low-intent': 'See Your Weak Spots Free',
    },
    headline: {
      'new-organic': 'Pass TEAS 7 with 92% Success Rate',
      'new-paid': 'The TEAS Prep Course That Works',
      'new-social': '500+ Students Trust StudyBuddy',
      'new-direct': 'Welcome to StudyBuddy',
      'returning-engaged': 'Ready to Ace Your TEAS?',
      'returning-cold': 'Come Back & Crush TEAS 7',
      'high-intent': 'Join Students Who Passed',
      'low-intent': 'Find Your TEAS Weak Spots',
    },
    subheadline: {
      'new-organic': '4,000+ practice questions | AI tutoring | Pass guarantee',
      'new-paid': 'Start your free diagnostic test today',
      'new-social': 'Prepare with confidence alongside hundreds of nursing students',
      'new-direct': 'Your personalized TEAS 7 preparation platform',
      'returning-engaged': 'Pick up where you left off',
      'returning-cold': 'Your study plan is waiting',
      'high-intent': 'Pass guarantee available on 3-month plan',
      'low-intent': 'Free diagnostic shows exactly what to study',
    },
  };

  return messages[type][segment];
}

/**
 * Get friendly source name
 */
function getSourceName(source: TrafficSource): string {
  const names: Record<TrafficSource, string> = {
    'google-organic': 'Google',
    'google-ads': 'Google',
    'facebook': 'Facebook',
    'instagram': 'Instagram',
    'tiktok': 'TikTok',
    'linkedin': 'LinkedIn',
    'twitter': 'Twitter',
    'reddit': 'Reddit',
    'email': 'Email',
    'direct': 'Direct',
    'referral': 'the Web',
    'unknown': 'the Web',
  };
  return names[source];
}

export default {
  isNewVisitor,
  markVisited,
  getVisitCount,
  getTimeOnSite,
  getScrollDepth,
  trackScrollDepth,
  hasViewedPricing,
  markPricingViewed,
  getUserBehavior,
  getUserSegment,
  getPersonalizedMessage,
};
