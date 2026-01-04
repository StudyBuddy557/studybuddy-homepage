/**
 * A/B Testing Variant Assignment & Tracking
 * Handles user bucketing and experiment tracking
 * Last updated: 2026-01-04
 */

import { pushEvent } from '@/config/analytics';
import { getExperiment, type Experiment, type Variant } from './config';

const COOKIE_PREFIX = 'sb_exp_';
const COOKIE_EXPIRY_DAYS = 90;

/**
 * Generate stable user ID for consistent bucketing
 * Uses combination of cookie + fingerprint for anonymity
 */
function getUserId(): string {
  if (typeof window === 'undefined') return 'server';

  try {
    // Check for existing user ID in cookie
    const existingId = document.cookie
      .split('; ')
      .find(row => row.startsWith('sb_user_id='))
      ?.split('=')[1];

    if (existingId) {
      return existingId;
    }

    // Generate new stable ID
    const id = Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
    
    // Store in cookie
    const expires = new Date();
    expires.setDate(expires.getDate() + COOKIE_EXPIRY_DAYS);
    document.cookie = `sb_user_id=${id}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    
    return id;
  } catch (error) {
    console.error('[Experiments] Error generating user ID:', error);
    return 'fallback_' + Date.now();
  }
}

/**
 * Hash string to number (for consistent bucketing)
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Assign user to variant based on experiment
 */
export function assignVariant(experiment: Experiment): Variant {
  if (!experiment.enabled) {
    return experiment.variants[0]; // Return control if disabled
  }

  // Check for existing assignment in cookie
  const cookieVariant = getStoredVariant(experiment.id);
  if (cookieVariant) {
    const variant = experiment.variants.find(v => v.id === cookieVariant);
    if (variant) {
      return variant;
    }
  }

  // Generate stable user ID
  const userId = getUserId();
  
  // Check if user is in traffic allocation
  const allocationHash = hashString(userId + experiment.id + '_allocation');
  const allocationBucket = allocationHash % 100;
  
  if (allocationBucket >= experiment.trafficAllocation) {
    // User not in experiment, return control
    return experiment.variants[0];
  }

  // Assign to variant based on weight
  const variantHash = hashString(userId + experiment.id);
  const bucket = variantHash % 100;

  let cumulative = 0;
  for (const variant of experiment.variants) {
    cumulative += variant.weight;
    if (bucket < cumulative) {
      // Store assignment
      storeVariant(experiment.id, variant.id);
      return variant;
    }
  }

  // Fallback to control (should never happen)
  return experiment.variants[0];
}

/**
 * Get variant for experiment
 */
export function getVariant(experimentId: string): Variant | null {
  const experiment = getExperiment(experimentId);
  if (!experiment) {
    console.warn(`[Experiments] Experiment not found: ${experimentId}`);
    return null;
  }

  return assignVariant(experiment);
}

/**
 * Store variant assignment in cookie
 */
function storeVariant(experimentId: string, variantId: string): void {
  if (typeof window === 'undefined') return;

  try {
    const expires = new Date();
    expires.setDate(expires.getDate() + COOKIE_EXPIRY_DAYS);
    
    document.cookie = `${COOKIE_PREFIX}${experimentId}=${variantId}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  } catch (error) {
    console.error('[Experiments] Error storing variant:', error);
  }
}

/**
 * Get stored variant from cookie
 */
function getStoredVariant(experimentId: string): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const value = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${COOKIE_PREFIX}${experimentId}=`))
      ?.split('=')[1];

    return value || null;
  } catch (error) {
    console.error('[Experiments] Error retrieving variant:', error);
    return null;
  }
}

/**
 * Track experiment exposure (user saw the experiment)
 */
export function trackExperimentExposure(experimentId: string, variantId: string): void {
  pushEvent({
    event: 'experiment_exposure',
    experiment_id: experimentId,
    variant_id: variantId,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Experiments] Exposure tracked: ${experimentId} -> ${variantId}`);
  }
}

/**
 * Track experiment conversion (user completed goal)
 */
export function trackExperimentConversion(
  experimentId: string,
  variantId: string,
  conversionType: string = 'default',
  value?: number
): void {
  pushEvent({
    event: 'experiment_conversion',
    experiment_id: experimentId,
    variant_id: variantId,
    conversion_type: conversionType,
    value: value,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Experiments] Conversion tracked: ${experimentId} -> ${variantId} (${conversionType})`);
  }
}

/**
 * Get all active variant assignments for current user
 */
export function getAllVariantAssignments(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  try {
    const assignments: Record<string, string> = {};
    const cookies = document.cookie.split('; ');

    cookies.forEach(cookie => {
      if (cookie.startsWith(COOKIE_PREFIX)) {
        const [key, value] = cookie.split('=');
        const experimentId = key.replace(COOKIE_PREFIX, '');
        assignments[experimentId] = value;
      }
    });

    return assignments;
  } catch (error) {
    console.error('[Experiments] Error getting assignments:', error);
    return {};
  }
}

export default {
  assignVariant,
  getVariant,
  trackExperimentExposure,
  trackExperimentConversion,
  getAllVariantAssignments,
};
