import { School } from '@/lib/types/school';
import { CheckCircle2, DollarSign, Trophy, Scale, GraduationCap } from 'lucide-react';
import Link from 'next/link';

interface ComparisonProps {
  school1: School;
  school2: School;
}

export function SchoolComparison({ school1, school2 }: ComparisonProps) {
  // 1. Logic to determine the "Winner" (1 = School 1, 2 = School 2, 0 = Tie)
  const getWinner = (field: keyof School, lowerIsBetter: boolean) => {
    const v1 = school1[field] as number;
    const v2 = school2[field] as number;
    if (v1 === v2) return 0;
    if (lowerIsBetter) return v1 < v2 ? 1 : 2;
    return v1 > v2 ? 1 : 2;
  };

  const tuitionWinner = getWinner('tuition_in_state', true); // Lower is better
  const acceptanceWinner = getWinner('acceptance_rate', false); // Higher is better (easier)
  const teasWinner = getWinner('min_teas_score', true); // Lower is "easier"

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Head-to-Head Header */}
      <div className="grid grid-cols-2 text-center border-b border-slate-100 relative">
        <div className="p-6 bg-teal-50/30">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">{school1.name}</h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">{school1.city}, {school1.state}</p>
        </div>
        
        {/* VS Badge */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-slate-900 text-white font-black text-xs md:text-sm w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                VS
            </div>
        </div>

        <div className="p-6 bg-indigo-50/30 border-l border-slate-100">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">{school2.name}</h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">{school2.city}, {school2.state}</p>
        </div>
      </div>

      {/* Comparison Rows */}
      <ComparisonRow 
        label="Annual Tuition"
        icon={<DollarSign className="w-4 h-4" />}
        val1={`$${school1.tuition_in_state.toLocaleString()}`}
        val2={`$${school2.tuition_in_state.toLocaleString()}`}
        winner={tuitionWinner}
      />
      <ComparisonRow 
        label="Acceptance Rate"
        icon={<Scale className="w-4 h-4" />}
        val1={`${school1.acceptance_rate}%`}
        val2={`${school2.acceptance_rate}%`}
        winner={acceptanceWinner}
      />
      <ComparisonRow 
        label="Min TEAS Score"
        icon={<Trophy className="w-4 h-4" />}
        val1={`${school1.min_teas_score > 0 ? school1.min_teas_score + '%' : 'N/A'}`}
        val2={`${school2.min_teas_score > 0 ? school2.min_teas_score + '%' : 'N/A'}`}
        winner={teasWinner}
      />
       <ComparisonRow 
        label="Avg GPA"
        icon={<GraduationCap className="w-4 h-4" />}
        val1={school1.avg_gpa.toString()}
        val2={school2.avg_gpa.toString()}
        winner={0} // GPA is usually too close/nuanced to call a strict winner
      />

      {/* CRO Footer */}
      <div className="p-8 text-center bg-slate-50 border-t border-slate-100">
        <h3 className="font-bold text-slate-900 text-lg mb-2">The Verdict?</h3>
        <p className="text-slate-600 text-sm mb-6 max-w-lg mx-auto">
            {tuitionWinner === 1 ? school1.name : school2.name} is more affordable, but {acceptanceWinner === 1 ? school1.name : school2.name} is easier to get into.
            Regardless of your choice, you need a high TEAS score to be safe.
        </p>
        <Link 
            href="https://courses.studybuddy.live/checkout" 
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-teal-200"
        >
          Start Your Prep Now
        </Link>
      </div>
    </div>
  );
}

// Helper Row Component
function ComparisonRow({ label, icon, val1, val2, winner }: any) {
  const winClass = "font-bold text-teal-700 bg-teal-50";
  const loseClass = "text-slate-600";

  return (
    <div className="grid grid-cols-2 relative border-b border-slate-100 last:border-0">
      <div className={`p-4 flex flex-col items-center justify-center text-center ${winner === 1 ? winClass : loseClass}`}>
        <span className="text-base md:text-lg">{val1}</span>
        {winner === 1 && <span className="text-[10px] uppercase font-bold text-teal-600 mt-1 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Winner</span>}
      </div>
      
      {/* Label Overlay */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded-full border border-slate-100 shadow-sm flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-slate-400">
        {icon} <span className="hidden md:inline">{label}</span>
      </div>

      <div className={`p-4 flex flex-col items-center justify-center text-center ${winner === 2 ? winClass : loseClass}`}>
        <span className="text-base md:text-lg">{val2}</span>
        {winner === 2 && <span className="text-[10px] uppercase font-bold text-teal-600 mt-1 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Winner</span>}
      </div>
    </div>
  );
}