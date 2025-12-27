'use client';

import { useState, useMemo } from 'react';
import { School } from '@/lib/types/school';
import { CheckCircle2, XCircle, Trophy, ArrowRight, Lock } from 'lucide-react';
import Link from 'next/link';

interface CalculatorProps {
  schools: School[];
}

export function EligibilityCalculator({ schools }: CalculatorProps) {
  // User Inputs
  const [gpa, setGpa] = useState<number>(3.0);
  const [teas, setTeas] = useState<number>(65);
  const [selectedState, setSelectedState] = useState<string>('All');

  // Derive unique states for dropdown
  const states = useMemo(() => {
    const unique = new Set(schools.map(s => s.state));
    return Array.from(unique).sort();
  }, [schools]);

  // The Filtering Logic
  const results = useMemo(() => {
    let filtered = schools;
    if (selectedState !== 'All') {
      filtered = filtered.filter(s => s.state === selectedState);
    }

    const eligible = [];
    const reach = [];

    for (const school of filtered) {
        // Simple logic: You qualify if you meet the TEAS req (or it's 0/unpublished)
        // AND your GPA is within 0.3 of the average
        const teasQualified = school.min_teas_score === 0 || teas >= school.min_teas_score;
        const gpaQualified = gpa >= (school.avg_gpa - 0.2); // Allow slight leeway
        
        if (teasQualified && gpaQualified) {
            eligible.push(school);
        } else if (!teasQualified && gpaQualified && (teas + 15 >= school.min_teas_score)) {
            // "Reach": Qualified by GPA, but need up to +15 points on TEAS
            reach.push(school);
        }
    }
    
    return { eligible, reach };
  }, [schools, gpa, teas, selectedState]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* 1. The Control Panel */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-teal-500" /> 
            Enter Your Stats
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
            {/* GPA Input */}
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Your GPA: <span className="text-slate-900 text-lg">{gpa}</span></label>
                <input 
                    type="range" min="2.0" max="4.0" step="0.1" 
                    value={gpa} onChange={(e) => setGpa(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1"><span>2.0</span><span>4.0</span></div>
            </div>

            {/* TEAS Input */}
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">TEAS Score: <span className="text-slate-900 text-lg">{teas}%</span></label>
                <input 
                    type="range" min="40" max="100" step="1" 
                    value={teas} onChange={(e) => setTeas(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1"><span>40%</span><span>100%</span></div>
            </div>

            {/* State Filter */}
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Filter State</label>
                <select 
                    value={selectedState} 
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-teal-500"
                >
                    <option value="All">All States</option>
                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
        </div>
      </div>

      {/* 2. Results Section */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Column A: Eligible Schools */}
        <div className="space-y-4">
            <h3 className="font-bold text-teal-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                You Qualify For ({results.eligible.length})
            </h3>
            <div className="space-y-3">
                {results.eligible.length === 0 ? (
                    <div className="p-6 bg-slate-100 rounded-xl text-center text-slate-500 text-sm">
                        No schools found matching these stats. Try adjusting your filters.
                    </div>
                ) : (
                    results.eligible.slice(0, 5).map(school => (
                        <Link key={school.slug} href={`/schools/${school.state.toLowerCase()}/${school.slug}`} className="block bg-white p-4 rounded-xl border border-teal-100 hover:border-teal-300 transition-colors shadow-sm">
                            <div className="font-bold text-slate-900">{school.name}</div>
                            <div className="text-xs text-slate-500 flex justify-between mt-1">
                                <span>{school.city}, {school.state}</span>
                                <span className="text-teal-600 font-bold">Match</span>
                            </div>
                        </Link>
                    ))
                )}
                {results.eligible.length > 5 && (
                    <p className="text-xs text-center text-slate-400 italic">And {results.eligible.length - 5} more...</p>
                )}
            </div>
        </div>

        {/* Column B: "Reach" Schools (The Upsell) */}
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-indigo-500" />
                    Unlock With Higher TEAS ({results.reach.length})
                </h3>
            </div>
            
            <div className="space-y-3 relative">
                 {/* The "Locked" Visual */}
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90 z-10 pointer-events-none"></div>
                 
                 {results.reach.slice(0, 3).map(school => (
                    <div key={school.slug} className="bg-white p-4 rounded-xl border border-slate-200 opacity-75 grayscale-[50%]">
                        <div className="flex justify-between">
                            <div className="font-bold text-slate-800">{school.name}</div>
                            <div className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">
                                Need {school.min_teas_score} (+{school.min_teas_score - teas})
                            </div>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">{school.city}, {school.state}</div>
                    </div>
                ))}
            </div>

            {/* The CTA Box */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative z-20 mt-4">
                <h4 className="font-bold text-lg mb-2">Don't settle.</h4>
                <p className="text-slate-300 text-sm mb-4">
                    Your GPA is good enough for {results.reach.length} more top-tier schools. You just need to boost your TEAS score.
                </p>
                <Link 
                    href="/pricing"
                    className="block w-full text-center bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 rounded-xl transition-all"
                >
                    Unlock These Schools
                </Link>
            </div>
        </div>

      </div>
    </div>
  );
}