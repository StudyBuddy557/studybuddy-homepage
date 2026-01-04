/**
 * Pricing & Offer Configuration
 * Single source of truth for all plan details, pricing, and pass guarantee
 * Last updated: 2026-01-04
 */

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface Plan {
  id: string;
  displayName: string;
  price: number;
  billingPeriod: 'monthly' | 'quarterly';
  billingCycle: string; // Display text like "/month" or "every 3 months"
  features: PlanFeature[];
  aiTutorLimit: number | 'unlimited';
  includesPassGuarantee: boolean;
  stripePriceId?: string; // Optional: for direct Stripe integration
  popular?: boolean; // Highlight this plan
  savings?: string; // e.g., "Save $15"
}

export const PLANS: Plan[] = [
  {
    id: 'monthly',
    displayName: 'Monthly Plan',
    price: 24.99,
    billingPeriod: 'monthly',
    billingCycle: '/month',
    features: [
      { text: 'TEAS 7 Full Practice Library', included: true },
      { text: 'HESI A2 Practice Questions', included: true },
      { text: 'HSRT Practice Tests', included: true },
      { text: '4,000+ Practice Questions', included: true },
      { text: '350+ Video Lectures', included: true },
      { text: 'AI Tutor: 10 questions/day', included: true },
      { text: 'NCLEX-RN Prep', included: false },
      { text: 'Unlimited AI Tutor Access', included: false },
      { text: 'Pass Guarantee', included: false },
    ],
    aiTutorLimit: 10,
    includesPassGuarantee: false,
    popular: false,
  },
  {
    id: 'quarterly',
    displayName: '3-Month Plan',
    price: 59.00,
    billingPeriod: 'quarterly',
    billingCycle: 'every 3 months',
    features: [
      { text: 'TEAS 7 Full Practice Library', included: true },
      { text: 'HESI A2 Practice Questions', included: true },
      { text: 'HSRT Practice Tests', included: true },
      { text: 'NCLEX-RN Prep Access', included: true },
      { text: '4,000+ Practice Questions', included: true },
      { text: '350+ Video Lectures', included: true },
      { text: 'Unlimited AI Tutor Access', included: true },
      { text: 'Pass Guarantee Eligible', included: true },
      { text: 'Save $15.97 vs monthly', included: true },
    ],
    aiTutorLimit: 'unlimited',
    includesPassGuarantee: true,
    popular: true,
    savings: 'Save $15.97',
  },
];

// Pass Guarantee Details
export const PASS_GUARANTEE = {
  shortSummary: 'Pass your TEAS 7 exam or get a full refund',
  qualificationRequirements: [
    'Complete 80% of all video lectures',
    'Complete all 15 practice exams with 70%+ average',
    'Study for minimum 30 consecutive days',
    'Submit score report to support@studybuddy.live within 7 days of exam',
  ],
  fullPolicyUrl: '/guarantee',
  emailContact: 'support@studybuddy.live',
  requiresPlan: 'quarterly', // Only quarterly plan qualifies
} as const;

// Platform Claims (for schema and marketing)
export const PLATFORM_CLAIMS = {
  passRate: {
    value: 92,
    display: '92%',
    qualifierText: 'of students who complete the program pass on their first attempt',
    datasetSize: '500+ verified completions',
    methodologyUrl: '/pass-rate-methodology',
  },
  questionCount: {
    value: 4000,
    display: '4,000+',
  },
  videoCount: {
    value: 350,
    display: '350+',
  },
  studentCount: {
    value: 500,
    display: '500+',
  },
} as const;

// Pricing helper functions
export function getPlanById(planId: string): Plan | undefined {
  return PLANS.find((plan) => plan.id === planId);
}

export function getFormattedPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function getMonthlyEquivalent(plan: Plan): string {
  if (plan.billingPeriod === 'monthly') {
    return getFormattedPrice(plan.price);
  }
  // For quarterly: divide by 3
  const monthlyRate = plan.price / 3;
  return getFormattedPrice(monthlyRate);
}

export function getPlanSavings(plan: Plan): number {
  if (plan.billingPeriod === 'monthly') {
    return 0;
  }
  const monthlyPlan = PLANS.find((p) => p.billingPeriod === 'monthly');
  if (!monthlyPlan) return 0;
  
  const monthlyTotal = monthlyPlan.price * 3;
  return monthlyTotal - plan.price;
}

// Validation: Ensure all plan IDs are unique
const planIds = new Set<string>();
PLANS.forEach((plan) => {
  if (planIds.has(plan.id)) {
    throw new Error(`Duplicate plan ID detected: ${plan.id}`);
  }
  planIds.add(plan.id);
});

export default PLANS;
