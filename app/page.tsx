import type { Metadata } from 'next';
import HomePage from './HomePage';

export const metadata: Metadata = {
  title: 'StudyBuddy - AI-Powered TEAS 7 Prep | 92% Pass Rate',
  description: 'Pass your TEAS 7 exam on your first try with AI-powered adaptive learning. 4,000+ practice questions, 350+ video lessons, and 24/7 AI tutoring. 92% pass rate guaranteed.',
  keywords: 'TEAS 7 prep, TEAS exam, nursing school prep, AI tutor, practice questions, video lessons',
  openGraph: {
    title: 'StudyBuddy - AI-Powered TEAS 7 Prep',
    description: 'Join 500+ students with 92% pass rate. AI-powered personalized study plans.',
    type: 'website',
  },
};

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'StudyBuddy',
    description: 'AI-powered TEAS 7 exam preparation with 92% pass rate',
    url: 'https://studybuddy.live',
    offers: {
      '@type': 'Offer',
      category: 'Education',
      priceCurrency: 'USD',
      price: '24.99',
      priceValidUntil: '2026-12-31',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage />
    </>
  );
}