import { School } from '@/lib/types/school';
import Link from 'next/link';

export function DynamicAdmissionsCard({ school }: { school: School }) {
  // Logic: Is this school "Hard" or "Easier"?
  const isHard = school.acceptance_rate < 30 || school.min_teas_score >= 80;
  
  return (
    <div className={`p-6 rounded-2xl border-2 ${isHard ? 'border-rose-100 bg-rose-50' : 'border-teal-100 bg-teal-50'}`}>
      <h3 className={`font-bold text-lg mb-2 ${isHard ? 'text-rose-900' : 'text-teal-900'}`}>
        {isHard ? '⚠️ This Program is Highly Competitive' : '✅ Your Chances Look Good'}
      </h3>
      
      <p className="text-sm text-slate-700 mb-4">
        {isHard 
          ? `${school.name} only accepts ${school.acceptance_rate}% of applicants. A high TEAS score is the #1 way to stand out.`
          : `${school.name} has a fair acceptance rate (${school.acceptance_rate}%), but you still need to hit the minimum TEAS score to qualify.`
        }
      </p>

      {/* Visual Progress Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-slate-500">Target TEAS Score</span>
          <span className="font-bold text-slate-900">{Math.max(school.min_teas_score + 5, 80)}%</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div className="bg-teal-500 h-full" style={{ width: '85%' }}></div>
        </div>
        <p className="text-xs text-slate-400 mt-2 text-center">
          (Recommended safety margin for admission)
        </p>
      </div>

      <Link 
        href="/pricing"
        className={`block w-full text-center py-3 px-6 rounded-xl font-bold text-white transition-all shadow-lg ${
          isHard 
            ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-200' 
            : 'bg-teal-600 hover:bg-teal-700 shadow-teal-200'
        }`}
      >
        {isHard ? 'Get An Elite TEAS Score' : 'Secure Your Admission'}
      </Link>
    </div>
  );
}