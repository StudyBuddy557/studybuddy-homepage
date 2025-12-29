// app/page.tsx
import React from 'react';
import type { Metadata } from 'next';
// We import the hero we just built + other sections to form the "HomePage"
import AeoHero from '@/app/components/AeoHero'; 
import { organizationSchema } from '@/lib/schema/organization';

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

// Merged Schema: Includes your new Rating data + existing Entity data
const combinedSchema = {
  ...organizationSchema,
  'aggregateRating': { 
    '@type': 'AggregateRating', 
    'ratingValue': '4.8', 
    'reviewCount': '523',
    'bestRating': '5'
  },
  'priceRange': '$24.99 - $59.00',
  'founder': { '@type': 'Person', 'jobTitle': 'Professor of Nursing' }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      
      {/* This renders your main content. 
        I've used the AeoHero directly here. 
        If you prefer a separate file, create app/components/HomePage.tsx 
      */}
      <main>
        <AeoHero />
        {/* Competitor Grid & State Links will go here */}
      </main>
    </>
  );
}