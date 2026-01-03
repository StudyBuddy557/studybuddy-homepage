import React from 'react';
import type { Metadata } from 'next';
import HomePage from './HomePage';

export const metadata: Metadata = {
  title: 'TEAS 7 Exam Prep Course | 92% Pass Rate | StudyBuddy',
  description: 'Master all four TEAS 7 sections with AI-powered tutoring. 4,000+ practice questions, 350+ video lectures, and personalized weak-area coaching. 92% pass rate vs 65% national average.',
};

export default function Page() {
  return <HomePage />;
}
