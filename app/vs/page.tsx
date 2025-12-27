import { competitorData } from '@/lib/competitor-data'; // ✅ FIXED IMPORT NAME
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Compare TEAS 7 Prep Courses | StudyBuddy vs Competitors',
  description: 'See how StudyBuddy stacks up against ATI, NurseHub, and Mometrix. Unbiased comparison of features, price, and pass rates.',
};

export default function CompareIndexPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-teal-50 selection:text-teal-900">
      
      {/* HERO */}
      <section className="pt-32 pb-16 bg-white border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-slate-900">
            Compare TEAS Prep Courses
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Don't overpay for outdated materials. See why thousands of nursing students are switching to StudyBuddy.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {competitorData.map((competitor) => (
            <Link 
              key={competitor.slug} 
              href={`/vs/${competitor.slug}`}
              className="group bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-500 uppercase tracking-wider mb-2">StudyBuddy vs.</h3>
                <div className="text-2xl font-bold text-slate-900 group-hover:text-[#20B2AA] transition-colors">
                  {competitor.name}
                </div>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Price</span>
                  <span className="font-bold text-red-500 line-through decoration-red-500/50">{competitor.price}</span>
                </div>
                <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                  <span className="text-slate-500">AI Tutor</span>
                  <span className="font-bold text-slate-400">No</span>
                </div>
                <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Guarantee</span>
                  <span className="font-bold text-slate-900">{competitor.guarantee}</span>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-center gap-2 w-full py-3 bg-slate-50 text-slate-900 font-bold rounded-xl group-hover:bg-[#20B2AA] group-hover:text-white transition-colors">
                View Comparison <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}