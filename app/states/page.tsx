import React from 'react';
import Link from 'next/link';
import { stateData } from '@/lib/state-data';
import { MapPin, ChevronRight, GraduationCap } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TEAS 7 Requirements by State | Nursing School Score Guide',
  description: 'Find TEAS 7 score requirements for nursing programs in your state. Comprehensive guide to admission scores, salaries, and top nursing schools across the US.',
};

export default function StatesIndexPage() {
  // Sort states alphabetically
  const sortedStates = [...stateData].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-teal-50 selection:text-teal-900">
      
      {/* HERO SECTION */}
      <section className="pt-32 pb-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-6 border border-teal-100">
            <MapPin className="w-4 h-4" />
            NATIONAL DATABASE
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-slate-900">
            TEAS 7 Requirements by State
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Nursing school admission requirements vary wildly. Select your state to see the minimum TEAS scores, top programs, and salary data for your region.
          </p>
        </div>
      </section>

      {/* STATE GRID */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedStates.map((state) => (
              <Link 
                key={state.slug} 
                href={`/states/${state.slug}`}
                className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-400 transition-all duration-200 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-teal-700 transition-colors">
                    {state.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-3 h-3" /> {state.programs_count} Programs
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-6">Don't See Your School?</h2>
        <p className="text-slate-600 mb-8">
          Our database is updated weekly. Check our diagnostic tool for a personalized plan.
        </p>
        <Link 
          href="/diagnostic"
          className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all"
        >
          Take Free Diagnostic
        </Link>
      </section>
    </main>
  );
}