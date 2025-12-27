'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button'; // Assuming you have shadcn button
// If no UI components yet, standard <button> is fine (see below)

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", 
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", 
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", 
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", 
  "New Hampshire", "New Jersey", "New Mexico", "New York", 
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", 
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", 
  "West Virginia", "Wisconsin", "Wyoming"
];

export function StateSelector() {
  const router = useRouter();
  const [selectedState, setSelectedState] = useState<string>("");

  const handleGo = () => {
    if (!selectedState) return;
    // Slugify the state name (e.g., "New York" -> "new-york")
    const slug = selectedState.toLowerCase().replace(/\s+/g, '-');
    router.push(`/states/${slug}`);
  };

  return (
    <section className="bg-slate-50 py-16 px-4 border-y border-slate-200">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          TEAS Requirements Vary by State
        </h2>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Nursing programs have different score requirements. Select your state to see 
          specific TEAS 7 passing scores and admission details.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <div className="relative w-full max-w-xs">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none appearance-none cursor-pointer"
              aria-label="Select your state"
            >
              <option value="" disabled>Select your state...</option>
              {US_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {/* Arrow Icon */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <button
            onClick={handleGo}
            disabled={!selectedState}
            className={cn(
              "h-12 px-8 rounded-lg font-semibold text-white transition-all",
              "bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed",
              "w-full sm:w-auto"
            )}
          >
            Check Requirements
          </button>
        </div>
      </div>
    </section>
  );
}