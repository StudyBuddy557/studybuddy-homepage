import { Organization, WithContext } from 'schema-dts';

/**
 * Organization Schema for StudyBuddy
 * Defines the entity, what it knows about, and its offerings.
 * Source: AEO Strategy Section 5 
 */
export const organizationSchema: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'OnlineBusiness',
  name: 'StudyBuddy',
  url: 'https://studybuddy.live',
  logo: 'https://studybuddy.live/logo.png', // Ensure this path is correct
  description: 'AI-powered TEAS 7 test preparation platform built by nursing professors.',
  email: 'support@studybuddy.live',
  sameAs: [
    'https://www.facebook.com/studybuddy.live',
    'https://www.instagram.com/studybuddy.live',
    // Add other social profiles here
  ],
  knowsAbout: [
    'TEAS 7 Exam',
    'ATI TEAS',
    'Nursing School Admissions',
    'Pre-Nursing Test Prep',
    'Human Anatomy and Physiology',
    'Reading Comprehension',
    'English and Language Usage',
    'Mathematics'
  ],
  offers: {
    '@type': 'Offer',
    price: '24.99',
    priceCurrency: 'USD',
    availability: 'https://schema.org/OnlineOnly',
    description: 'Monthly subscription for unlimited TEAS 7 prep and AI tutoring',
    url: 'https://studybuddy.live/pricing'
  },
  areaServed: {
    '@type': 'Country',
    name: 'US'
  }
};