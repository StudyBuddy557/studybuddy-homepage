import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';

export const metadata: Metadata = {
  title: 'TEAS 7 Practice Test & Prep Course | 92% Pass Rate | StudyBuddy',
  description: 'AI-powered TEAS 7 test preparation platform built by nursing professors. 4,000+ practice questions, 350+ video lectures, unlimited AI tutor. 100% Pass Guarantee.',
  openGraph: {
    title: 'TEAS 7 Practice Test & Prep Course | 92% Pass Rate | StudyBuddy',
    description: 'AI-powered TEAS 7 test preparation platform built by nursing professors. Pass guaranteed or your money back.',
    url: 'https://studybuddy.live',
    siteName: 'StudyBuddy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TEAS 7 Practice Test & Prep Course | StudyBuddy',
    description: 'AI-powered TEAS 7 prep by nursing professors. 92% pass rate.',
  },
};

// JSON-LD Schema for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'OnlineBusiness',
  'name': 'StudyBuddy',
  'description': 'AI-powered TEAS 7 test preparation platform built by nursing professors.',
  'url': 'https://studybuddy.live',
  'knowsAbout': ['TEAS 7 Exam', 'ATI TEAS', 'Nursing School Admissions'],
  'priceRange': '$24.99 - $59.00',
  'founder': { '@type': 'Person', 'jobTitle': 'Professor of Nursing' },
  'aggregateRating': { 
    '@type': 'AggregateRating', 
    'ratingValue': '4.8', 
    'reviewCount': '523',
    'bestRating': '5'
  }
};

export default function Page() {
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