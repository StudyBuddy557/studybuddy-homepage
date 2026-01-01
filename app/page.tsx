import React from 'react';
import type { Metadata } from 'next';
import HomePage from '@/app/components/HomePage'; 
import { Schema } from '@/components/Schema'; 
import { getOrganizationSchema, getProductSchema } from '@/lib/schema/organization';

// 1. STRATEGIC METADATA
export const metadata: Metadata = {
  title: 'TEAS 7 Practice Test & Prep Course | 92% Pass Rate | StudyBuddy',
  description: 'AI-powered TEAS 7 test preparation platform built by nursing professors. 4,000+ practice questions, unlimited AI tutor. 100% Pass Guarantee.',
  keywords: [
    'TEAS 7', 
    'TEAS practice test', 
    'ATI TEAS exam prep', 
    'nursing school entrance exam', 
    'AI nursing tutor'
  ],
  openGraph: {
    title: 'TEAS 7 Practice Test & Prep Course | StudyBuddy',
    description: 'Pass your TEAS 7 on the first try with the only AI-powered tutor built by nursing professors.',
    type: 'website',
    url: 'https://studybuddy.live',
    siteName: 'StudyBuddy',
    images: [
      {
        url: 'https://studybuddy.live/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'StudyBuddy TEAS 7 Prep - 92% Pass Rate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TEAS 7 Practice Test & Prep Course | StudyBuddy',
    description: 'Pass your TEAS 7 on the first try with the only AI-powered tutor built by nursing professors.',
    images: ['https://studybuddy.live/og-image.jpg'],
    creator: '@studybuddylive',
  },
  alternates: {
    canonical: 'https://studybuddy.live',
  },
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
};

export default function Page() {
  // 2. Generate Schema Data (Server-Side)
  const orgSchema = getOrganizationSchema();
  const productSchema = getProductSchema();

  return (
    <main>
      {/* 3. Inject AEO Infrastructure */}
      <Schema data={orgSchema} />
      <Schema data={productSchema} />

      {/* 4. Render Client UI */}
      <HomePage />
    </main>
  );
}