/**
 * Centralized Metadata Configuration
 * Provides consistent SEO metadata across all pages
 */

import { Metadata } from 'next';
import { PLATFORM_CLAIMS } from './offer';

const baseUrl = 'https://studybuddy.live';
const siteName = 'StudyBuddy';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteName} - TEAS 7 Prep with ${PLATFORM_CLAIMS.passRate.display} Pass Rate`,
    template: `%s | ${siteName}`,
  },
  description: `Pass your TEAS 7 exam with ${siteName}'s proven preparation platform. ${PLATFORM_CLAIMS.passRate.display} first-attempt pass rate, ${PLATFORM_CLAIMS.questionCount.display} practice questions, and AI tutoring. Start your free diagnostic today.`,
  keywords: [
    'TEAS 7',
    'TEAS exam prep',
    'nursing school admission',
    'HESI A2',
    'NCLEX prep',
    'nursing exam',
    'ATI TEAS',
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: siteName,
    title: `${siteName} - TEAS 7 Prep with ${PLATFORM_CLAIMS.passRate.display} Pass Rate`,
    description: `Pass your TEAS 7 exam with ${PLATFORM_CLAIMS.passRate.display} success rate. ${PLATFORM_CLAIMS.questionCount.display} practice questions and AI tutoring.`,
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${siteName} TEAS 7 Preparation Platform`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} - TEAS 7 Prep with ${PLATFORM_CLAIMS.passRate.display} Pass Rate`,
    description: `Pass your TEAS 7 exam with ${PLATFORM_CLAIMS.passRate.display} success rate. ${PLATFORM_CLAIMS.questionCount.display} practice questions and AI tutoring.`,
    images: [`${baseUrl}/og-image.png`],
  },
  verification: {
    // Add Google Search Console verification when available
    // google: 'your-verification-code',
  },
};

// Homepage metadata
export const homeMetadata: Metadata = {
  ...defaultMetadata,
  title: `${siteName} - TEAS 7 Prep with ${PLATFORM_CLAIMS.passRate.display} Pass Rate`,
  description: `Pass your TEAS 7 exam with ${siteName}'s proven preparation platform. ${PLATFORM_CLAIMS.passRate.display} first-attempt pass rate, ${PLATFORM_CLAIMS.questionCount.display} practice questions, ${PLATFORM_CLAIMS.videoCount.display} video lectures, and AI tutoring. Start your free diagnostic today.`,
};

// Pricing page metadata
export const pricingMetadata: Metadata = {
  title: 'Pricing - Affordable TEAS 7 Prep Plans',
  description: `Choose your ${siteName} plan: Monthly at $24.99 or 3-Month at $59 with unlimited AI tutoring and pass guarantee. Join ${PLATFORM_CLAIMS.studentCount.display} successful students.`,
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Pricing - Affordable TEAS 7 Prep Plans',
    description: `Monthly plans from $24.99. ${PLATFORM_CLAIMS.passRate.display} pass rate. ${PLATFORM_CLAIMS.questionCount.display} practice questions.`,
  },
};

// Diagnostic page metadata
export const diagnosticMetadata: Metadata = {
  title: 'Free TEAS 7 Diagnostic Test - Assess Your Readiness',
  description: `Take our free TEAS 7 diagnostic test to identify your strengths and weaknesses. Get personalized study recommendations based on your results.`,
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Free TEAS 7 Diagnostic Test',
    description: 'Assess your TEAS 7 readiness with our free diagnostic test. Get instant results and personalized study plan.',
  },
};

// Guarantee page metadata
export const guaranteeMetadata: Metadata = {
  title: 'Pass Guarantee - Money-Back Promise',
  description: `${siteName}'s pass guarantee: Complete our program and pass your TEAS 7 exam, or get a full refund. View qualification requirements and terms.`,
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Pass Guarantee - Money-Back Promise',
    description: 'Pass your TEAS 7 exam or get your money back. See our qualification requirements.',
  },
};

// Pass rate methodology page metadata
export const methodologyMetadata: Metadata = {
  title: `Pass Rate Methodology - How We Calculate ${PLATFORM_CLAIMS.passRate.display}`,
  description: `Transparent methodology for our ${PLATFORM_CLAIMS.passRate.display} TEAS 7 pass rate. Based on ${PLATFORM_CLAIMS.studentCount.display} verified score reports from students who completed our program.`,
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Pass Rate Methodology',
    description: `Verified ${PLATFORM_CLAIMS.passRate.display} pass rate from ${PLATFORM_CLAIMS.studentCount.display} students.`,
  },
};

// State page metadata generator
export function generateStateMetadata(stateName: string, stateAbbr: string): Metadata {
  return {
    title: `TEAS 7 Prep for ${stateName} Nursing Students`,
    description: `Pass your TEAS 7 exam in ${stateName} with ${siteName}. ${PLATFORM_CLAIMS.passRate.display} pass rate, ${PLATFORM_CLAIMS.questionCount.display} practice questions tailored for ${stateAbbr} nursing programs. Start free diagnostic.`,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: `TEAS 7 Prep for ${stateName}`,
      description: `${PLATFORM_CLAIMS.passRate.display} pass rate for ${stateName} nursing students.`,
    },
  };
}

export default {
  defaultMetadata,
  homeMetadata,
  pricingMetadata,
  diagnosticMetadata,
  guaranteeMetadata,
  methodologyMetadata,
  generateStateMetadata,
};
