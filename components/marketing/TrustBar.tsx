'use client';

import { useEffect, useState } from 'react';

// 1. TEXT-ONLY LISTS (No Images to break)
const SCHOOL_NAMES: Record<string, string[]> = {
  // TEXAS
  TX: ['UT Austin', 'Texas A&M', 'Baylor University', 'Texas Tech', 'Houston Community College'],
  // CALIFORNIA
  CA: ['UCLA', 'CSU Long Beach', 'San Diego State', 'USC', 'Saddleback College'],
  // FLORIDA
  FL: ['University of Florida', 'Miami Dade College', 'FSU', 'UCF', 'Valencia College'],
  // NEW YORK
  NY: ['NYU', 'Hunter College', 'Stony Brook', 'Adelphi', 'CUNY'],
  // DEFAULT (National Mix)
  DEFAULT: ['Johns Hopkins', 'Duke University', 'Ohio State', 'Chamberlain University'],
};

export default function TrustBar() {
  const [schools, setSchools] = useState(SCHOOL_NAMES.DEFAULT);
  const [locationText, setLocationText] = useState('NURSING PROGRAMS NATIONWIDE');

  useEffect(() => {
    // 2. DETECT LOCATION (CLIENT-SIDE, NO CACHE)
    fetch('https://ipapi.co/json/', {
      cache: 'no-store',
    })
      .then(res => res.json())
      .then(data => {
        const stateCode = data?.region_code;

        if (stateCode && SCHOOL_NAMES[stateCode]) {
          setSchools(SCHOOL_NAMES[stateCode]);
          setLocationText(`${data.region.toUpperCase()} NURSING PROGRAMS`);
        }
      })
      .catch(() => {
        // Silent fail — defaults already set
      });
  }, []);

  return (
    <div className="w-full py-10 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* SAFE HARBOR HEADLINE */}
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
          Preferred by Phi Theta Kappa Members & Students Aspiring to Attend {locationText}
        </p>

        {/* TEXT-BASED LOGO ROW */}
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {/* PTK */}
          <span className="text-xl md:text-2xl font-serif font-bold text-slate-700 opacity-80">
            Phi Theta Kappa
          </span>

          {/* DYNAMIC SCHOOL NAMES */}
          {schools.map((school, index) => (
            <span
              key={index}
              className="text-lg md:text-xl font-medium text-slate-500 whitespace-nowrap"
            >
              {school}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
