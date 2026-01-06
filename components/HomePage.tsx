'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface HomePageProps {
  faqData?: Array<{ question: string; answer: React.ReactNode; }>;
}

export default function HomePage({ faqData }: HomePageProps) {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-4xl font-bold mb-4">StudyBuddy - Analytics Installed!</h1>
      <p className="text-lg">Analytics and UTM tracking are now active.</p>
      <p className="text-sm text-slate-500 mt-4">Full homepage content temporarily simplified for testing.</p>
    </div>
  );
}
