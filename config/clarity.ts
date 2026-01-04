/**
 * Microsoft Clarity Configuration
 * Free heatmapping and session recording
 * Last updated: 2026-01-04
 */

export const CLARITY_CONFIG = {
  projectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || '',
  enabled: process.env.NODE_ENV === 'production' && !!process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
} as const;

/**
 * Features enabled in Clarity:
 * - Heatmaps (click, scroll, area)
 * - Session recordings
 * - Rage clicks detection
 * - Dead clicks detection
 * - Error tracking
 * - JavaScript errors
 * - Network errors
 * - Console logs
 */

/**
 * Privacy & Compliance:
 * Clarity automatically masks sensitive data:
 * - Input fields (passwords, credit cards)
 * - Email addresses
 * - Phone numbers
 * 
 * Additional masking can be added with:
 * - class="clarity-mask" - Hide element completely
 * - class="clarity-mask-text" - Mask text only
 * - class="clarity-unmask" - Force unmask (use carefully)
 */

export const CLARITY_FEATURES = {
  // Automatic features (no code needed)
  heatmaps: true,
  sessionRecordings: true,
  rageClickDetection: true,
  deadClickDetection: true,
  
  // Advanced features (require custom events)
  customTags: true, // Tag sessions with user properties
  customEvents: true, // Track custom events
} as const;

/**
 * Custom tags for session filtering
 * These help you filter sessions in Clarity dashboard
 */
export interface ClarityCustomTags {
  user_segment?: string;
  traffic_source?: string;
  plan_viewed?: string;
  has_account?: boolean;
  subscription_status?: string;
}

/**
 * Set custom tag for current session
 */
export function setClarityTag(key: string, value: string | number | boolean): void {
  if (typeof window === 'undefined' || !CLARITY_CONFIG.enabled) return;

  try {
    // @ts-ignore - Clarity is loaded globally
    if (window.clarity) {
      // @ts-ignore
      window.clarity('set', key, value);
    }
  } catch (error) {
    console.error('[Clarity] Error setting tag:', error);
  }
}

/**
 * Track custom event in Clarity
 */
export function trackClarityEvent(eventName: string): void {
  if (typeof window === 'undefined' || !CLARITY_CONFIG.enabled) return;

  try {
    // @ts-ignore
    if (window.clarity) {
      // @ts-ignore
      window.clarity('event', eventName);
    }
  } catch (error) {
    console.error('[Clarity] Error tracking event:', error);
  }
}

/**
 * Identify user in Clarity (optional, for authenticated users)
 * Use this sparingly and only with anonymized IDs
 */
export function identifyClarityUser(userId: string): void {
  if (typeof window === 'undefined' || !CLARITY_CONFIG.enabled) return;

  try {
    // @ts-ignore
    if (window.clarity) {
      // @ts-ignore
      window.clarity('identify', userId);
    }
  } catch (error) {
    console.error('[Clarity] Error identifying user:', error);
  }
}

/**
 * Upgrade to Clarity session (for important sessions)
 * This ensures the session is recorded even if over quota
 */
export function upgradeClaritySession(): void {
  if (typeof window === 'undefined' || !CLARITY_CONFIG.enabled) return;

  try {
    // @ts-ignore
    if (window.clarity) {
      // @ts-ignore
      window.clarity('upgrade', 'session');
    }
  } catch (error) {
    console.error('[Clarity] Error upgrading session:', error);
  }
}

export default {
  CLARITY_CONFIG,
  setClarityTag,
  trackClarityEvent,
  identifyClarityUser,
  upgradeClaritySession,
};
