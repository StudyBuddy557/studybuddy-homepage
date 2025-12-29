import React from 'react';
import type { Metadata } from 'next';
import HomePage from '@/app/components/HomePage';

export const metadata: Metadata = {
  title: 'TEAS 7 Practice Test & Prep Course | 92% Pass Rate | StudyBuddy',
  description: 'AI-powered TEAS 7 test preparation platform built by nursing professors. 4,000+ practice questions, unlimited AI tutor. 100% Pass Guarantee.',
  openGraph: {
    title: 'TEAS 7 Practice Test & Prep Course | StudyBuddy',
    description: 'Pass your TEAS 7 on the first try with the only AI-powered tutor built by nursing professors.',
    type: 'website',
  }
};

export default function Page() {
  return (
    <main>
      <HomePage />
    </main>
  );
}
