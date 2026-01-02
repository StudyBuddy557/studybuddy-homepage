/**
 * Organization Schema
 * Central organization entity for all schemas
 */

import type { WithContext, Organization } from 'schema-dts';

export const ORG_ID = 'https://studybuddy.live#organization';
export const TEAS_ENTITY_ID = 'https://studybuddy.live/teas-7-exam#entity';

/**
 * Get the central organization schema
 * This should be included in every page's schema array
 */
export function getOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'StudyBuddy',
    url: 'https://studybuddy.live',
    logo: {
      '@type': 'ImageObject',
      url: 'https://studybuddy.live/logo.png',
      width: '600',
      height: '60'
    },
    description: 'AI-powered TEAS 7 exam preparation with 92% pass rate. Comprehensive study platform for nursing students with personalized tutoring, 4,000+ practice questions, and proven methodology.',
    sameAs: [
      'https://www.facebook.com/studybuddyteas',
      'https://twitter.com/studybuddyteas',
      'https://www.linkedin.com/company/studybuddy'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@studybuddy.live',
      availableLanguage: 'English'
    },
    foundingDate: '2023',
    knowsAbout: [
      'TEAS 7 Exam Preparation',
      'Nursing Education',
      'Test Preparation',
      'Online Learning',
      'Artificial Intelligence Tutoring'
    ],
    areaServed: {
      '@type': 'Country',
      name: 'United States'
    }
  };
}
