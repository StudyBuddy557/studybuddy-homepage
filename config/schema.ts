/**
 * Schema.org Structured Data Configuration
 * Improves SEO, rich results, and AI visibility (AEO)
 * Last updated: 2026-01-04
 */

import { PLATFORM_CLAIMS, PASS_GUARANTEE } from './offer';

// Organization Schema
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'StudyBuddy',
  url: 'https://studybuddy.live',
  logo: 'https://studybuddy.live/logo.png',
  description: 'TEAS 7 exam preparation platform with 92% pass rate, 4,000+ practice questions, and AI tutoring',
  email: 'support@studybuddy.live',
  foundingDate: '2024',
  knowsAbout: [
    'TEAS 7 Exam Preparation',
    'Nursing School Admissions',
    'HESI A2 Test Prep',
    'NCLEX-RN Preparation',
  ],
  sameAs: [
    // Add actual social media URLs when available
    // 'https://facebook.com/studybuddy',
    // 'https://twitter.com/studybuddy',
  ],
} as const;

// Course Schema (for main TEAS 7 offering)
export const COURSE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'TEAS 7 Complete Preparation Course',
  description: 'Comprehensive TEAS 7 exam preparation with 4,000+ practice questions, 350+ video lectures, and AI tutoring. 92% pass rate.',
  provider: {
    '@type': 'Organization',
    name: 'StudyBuddy',
    url: 'https://studybuddy.live',
  },
  educationalLevel: 'Undergraduate',
  about: [
    'TEAS 7 Reading',
    'TEAS 7 Mathematics', 
    'TEAS 7 Science',
    'TEAS 7 English and Language Usage',
  ],
  teaches: [
    'Reading comprehension strategies',
    'Mathematics fundamentals for nursing',
    'Biology and anatomy for TEAS',
    'Grammar and writing mechanics',
  ],
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseWorkload: 'PT30H', // Estimated 30 hours
  },
  offers: {
    '@type': 'Offer',
    price: '24.99',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://studybuddy.live/pricing',
  },
  // Note: AggregateRating removed - add only when you have verifiable external reviews
} as const;

// FAQ Schema Generator
export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Common FAQs for TEAS 7
export const COMMON_FAQS: FAQItem[] = [
  {
    question: 'What is the TEAS 7 pass rate for StudyBuddy students?',
    answer: `StudyBuddy students achieve a 92% pass rate on their first attempt, based on ${PLATFORM_CLAIMS.studentCount.display} verified completions. Students who complete 80% of lectures and all practice exams have the highest success rates.`,
  },
  {
    question: 'How many practice questions does StudyBuddy provide?',
    answer: `StudyBuddy offers ${PLATFORM_CLAIMS.questionCount.display} practice questions covering all TEAS 7 domains: Reading, Mathematics, Science, and English & Language Usage. All questions include detailed explanations.`,
  },
  {
    question: 'What is included in the pass guarantee?',
    answer: `${PASS_GUARANTEE.shortSummary}. To qualify, you must: ${PASS_GUARANTEE.qualificationRequirements.join(', ')}. See full terms at ${PASS_GUARANTEE.fullPolicyUrl}`,
  },
  {
    question: 'How does the AI tutor work?',
    answer: 'The AI tutor provides instant, personalized explanations for any TEAS 7 question. Monthly plan users get 10 AI questions per day, while quarterly plan users have unlimited access.',
  },
  {
    question: 'Can I access StudyBuddy on mobile devices?',
    answer: 'Yes! StudyBuddy is fully optimized for mobile, tablet, and desktop. Study anywhere with our responsive platform.',
  },
  {
    question: 'How long do I have access to the course materials?',
    answer: 'Your access lasts for the duration of your subscription. Monthly plans renew every month, and quarterly plans renew every 3 months. You can cancel anytime.',
  },
];

// Dataset Schema for Pass Rate Methodology Page
export function generateDatasetSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'StudyBuddy TEAS 7 Pass Rate Study',
    description: 'Verified pass rate data for students completing the StudyBuddy TEAS 7 preparation program',
    creator: {
      '@type': 'Organization',
      name: 'StudyBuddy',
      url: 'https://studybuddy.live',
    },
    measurementTechnique: 'Score report verification from students who submitted official TEAS 7 results',
    variableMeasured: 'First-attempt pass rate',
    size: PLATFORM_CLAIMS.studentCount.display,
    temporalCoverage: '2024/2025',
    url: PLATFORM_CLAIMS.passRate.methodologyUrl,
  };
}

export default {
  ORGANIZATION_SCHEMA,
  COURSE_SCHEMA,
  generateFAQSchema,
  generateDatasetSchema,
  COMMON_FAQS,
};
