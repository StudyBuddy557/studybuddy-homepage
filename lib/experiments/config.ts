/**
 * A/B Testing Experiment Configuration
 * Defines all active experiments and their variants
 * Last updated: 2026-01-04
 */

export interface Variant {
  id: string;
  name: string;
  weight: number; // 0-100, total should equal 100
  description?: string;
}

export interface Experiment {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  variants: Variant[];
  trafficAllocation: number; // 0-100, percentage of users to include
}

/**
 * Active Experiments
 * Add new experiments here
 */
export const EXPERIMENTS: Record<string, Experiment> = {
  PRICING_HEADLINE: {
    id: 'pricing_headline_2026_01',
    name: 'Pricing Page Headline',
    description: 'Test different value propositions on pricing page',
    enabled: true,
    trafficAllocation: 100, // 100% of users
    variants: [
      {
        id: 'control',
        name: 'Control',
        weight: 50,
        description: 'Original: Choose Your Plan',
      },
      {
        id: 'value',
        name: 'Value-Focused',
        weight: 50,
        description: 'Test: Pass TEAS 7 or Get Your Money Back',
      },
    ],
  },
  
  CTA_COPY: {
    id: 'cta_copy_2026_01',
    name: 'CTA Button Copy',
    description: 'Test different CTA button text',
    enabled: true,
    trafficAllocation: 100,
    variants: [
      {
        id: 'control',
        name: 'Control',
        weight: 50,
        description: 'Start Free Diagnostic',
      },
      {
        id: 'benefit',
        name: 'Benefit-Driven',
        weight: 50,
        description: 'See My Weak Spots Free',
      },
    ],
  },

  GUARANTEE_PLACEMENT: {
    id: 'guarantee_placement_2026_01',
    name: 'Pass Guarantee Placement',
    description: 'Test guarantee section placement on pricing page',
    enabled: false, // Not running yet
    trafficAllocation: 50, // Only 50% of users when enabled
    variants: [
      {
        id: 'control',
        name: 'Control (Bottom)',
        weight: 50,
        description: 'Guarantee section at bottom of page',
      },
      {
        id: 'top',
        name: 'Top of Page',
        weight: 50,
        description: 'Guarantee section at top of page',
      },
    ],
  },

  PRICING_DISPLAY: {
    id: 'pricing_display_2026_01',
    name: 'Pricing Display Format',
    description: 'Test monthly vs. total cost emphasis',
    enabled: false,
    trafficAllocation: 100,
    variants: [
      {
        id: 'control',
        name: 'Control',
        weight: 33,
        description: '$24.99/month',
      },
      {
        id: 'first_month',
        name: 'First Month Emphasis',
        weight: 33,
        description: '$24.99 - First Month',
      },
      {
        id: 'savings',
        name: 'Savings Emphasis',
        weight: 34,
        description: '$24.99/mo (Save $15 with quarterly)',
      },
    ],
  },
};

/**
 * Get experiment by ID
 */
export function getExperiment(experimentId: string): Experiment | undefined {
  return EXPERIMENTS[experimentId];
}

/**
 * Get all active experiments
 */
export function getActiveExperiments(): Experiment[] {
  return Object.values(EXPERIMENTS).filter(exp => exp.enabled);
}

/**
 * Check if experiment is active
 */
export function isExperimentActive(experimentId: string): boolean {
  const experiment = EXPERIMENTS[experimentId];
  return experiment ? experiment.enabled : false;
}

/**
 * Validate experiment configuration
 * Ensures variant weights sum to 100
 */
export function validateExperiment(experiment: Experiment): boolean {
  const totalWeight = experiment.variants.reduce((sum, variant) => sum + variant.weight, 0);
  
  if (Math.abs(totalWeight - 100) > 0.01) {
    console.error(
      `[Experiments] Invalid weights for ${experiment.id}: total is ${totalWeight}, should be 100`
    );
    return false;
  }

  return true;
}

// Validate all experiments on load
Object.values(EXPERIMENTS).forEach(experiment => {
  if (experiment.enabled && !validateExperiment(experiment)) {
    console.error(`[Experiments] Disabling invalid experiment: ${experiment.id}`);
    experiment.enabled = false;
  }
});

export default EXPERIMENTS;
