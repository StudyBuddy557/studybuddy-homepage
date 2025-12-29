// app/page.tsx
import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { organizationSchema } from '@/lib/schema/organization';
import JsonLd from '@/app/components/JsonLd';
import AeoHero from '@/app/components/AeoHero';
import StartChatButton from '@/app/components/StartChatButton';
import { stateData } from '@/lib/state-data';

export const metadata: Metadata = {
  title: 'TEAS 7 Practice Test & Prep Course | 92% Pass Rate | StudyBuddy',
  description: 'AI-powered TEAS 7 test preparation platform built by nursing professors. 4,000+ practice questions, unlimited AI tutor. 100% Pass Guarantee.',
};

export default function Home() {
  // Filter for top states to display in the grid
  const featuredStates = stateData.filter(s => 
    ['California', 'Texas', 'Florida', 'New York', 'Georgia', 'Ohio'].includes(s.name)
  );

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Entity Schema */}
      <JsonLd data={organizationSchema} />
      
      {/* 2. AEO Hero (The Header) */}
      <AeoHero />
      
      {/* 3. The "Moat" Section: State Requirements */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Nursing School Requirements by State
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              TEAS scores vary wildly by location. Select your state to see the specific admission data for 2025.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredStates.map((state) => (
              <Link 
                key={state.slug} 
                href={`/states/${state.slug}`}
                className="group p-4 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all text-center"
              >
                <div className="font-bold text-slate-900 group-hover:text-teal-600">{state.name}</div>
                <div className="text-xs text-slate-500 mt-1">{state.programs_count} Programs</div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-slate-500 italic">
              ...and 44 other states. 
              <span className="ml-2 inline-block">
                (Google will index all 50 automatically via our Sitemap)
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* 4. The "Offense" Section: Comparison */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">
            <div className="p-12 flex flex-col justify-center">
              <span className="text-teal-400 font-bold tracking-wider uppercase text-sm mb-2">
                Market Analysis
              </span>
              <h2 className="text-3xl font-bold text-white mb-6">
                StudyBuddy vs. ATI & NurseHub
              </h2>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Stop paying $200 for static PDFs. See how our AI Tutor compares to the "official" guide and generic question banks.
              </p>
              <Link 
                href="/compare/teas-prep-courses"
                className="inline-block text-center px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-teal-50 transition-all"
              >
                View Comparison Matrix
              </Link>
            </div>
            <div className="bg-slate-800 p-12 flex flex-col justify-center border-l border-slate-700">
              <ul className="space-y-6">
                <li className="flex items-center gap-4 text-white">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center font-bold">✓</span>
                  <span className="font-medium">Unlimited AI Tutoring</span>
                </li>
                <li className="flex items-center gap-4 text-white">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center font-bold">✓</span>
                  <span className="font-medium">92% Verified Pass Rate</span>
                </li>
                <li className="flex items-center gap-4 text-white">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center font-bold">✓</span>
                  <span className="font-medium">Created by Professors (PhD/DNP)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The "Trust" Section: Verification */}
      <section className="py-20 bg-teal-50 border-t border-teal-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            Is 92% a real number?
          </h2>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            We don't make up stats. We publish our data. 
            See our methodology, verified student outcomes, and why we offer a 100% money-back guarantee.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/pass-rate-methodology"
              className="px-8 py-4 bg-white text-teal-700 font-bold rounded-xl border border-teal-200 hover:shadow-lg transition-all"
            >
              View Methodology
            </Link>
            <Link 
              href="/is-studybuddy-legit"
              className="px-8 py-4 bg-transparent text-teal-800 font-bold border border-teal-800 rounded-xl hover:bg-teal-100 transition-all"
            >
              Is StudyBuddy Legit?
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Footer CTA */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-8">
            Your nursing career starts with a score.
          </h2>
          <div className="flex justify-center">
             <StartChatButton />
          </div>
          <p className="mt-6 text-sm text-slate-400">
            © 2025 StudyBuddy. All rights reserved. <br/>
            <Link href="/teas-7-syllabus" className="underline hover:text-teal-600">Official Syllabus</Link>
          </p>
        </div>
      </section>
    </main>
  );
}