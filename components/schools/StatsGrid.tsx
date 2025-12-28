import { Users, GraduationCap, TrendingUp, Award } from 'lucide-react';
export function StatsGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <p className="text-2xl font-bold text-slate-900">42</p>
        <span className="text-sm text-slate-500">Avg Class Size</span>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <p className="text-2xl font-bold text-slate-900">68%</p>
        <span className="text-sm text-slate-500">Acceptance Rate</span>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <p className="text-2xl font-bold text-slate-900">94%</p>
        <span className="text-sm text-slate-500">Grad Rate</span>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <p className="text-2xl font-bold text-slate-900">91%</p>
        <span className="text-sm text-slate-500">NCLEX Pass</span>
      </div>
    </div>
  );
}
