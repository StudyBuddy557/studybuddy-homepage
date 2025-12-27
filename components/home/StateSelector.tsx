"use client";

import { useState } from 'react';
import Link from 'next/link';

// List of US states
const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];

export default function StateSelector() {
  const [selectedState, setSelectedState] = useState('');

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Dropdown Selector */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <select
          value={selectedState}
          onChange={handleStateChange}
          aria-label="Select your state"
          className="w-full sm:w-64 px-6 py-4 text-lg border-2 border-slate-300 rounded-xl bg-white text-slate-700 font-medium shadow-sm hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%232563EB'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '3rem'
          }}
        >
          <option value="">Select Your State</option>
          {US_STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        {selectedState && (
          <Link
            href={`/states/${selectedState.toLowerCase().replace(/\s+/g, '-')}`}
            className="w-full sm:w-auto bg-[#2563EB] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2"
          >
            View {selectedState} Guide
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        )}
      </div>

      {/* Popular States Quick Links */}
      <div className="mt-8">
        <p className="text-sm text-slate-500 font-medium mb-4 text-center">
          Popular States:
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {['California', 'Texas', 'Florida', 'New York', 'Pennsylvania'].map((state) => (
            <Link
              key={state}
              href={`/states/${state.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100"
            >
              {state}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}