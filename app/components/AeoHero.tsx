import Link from 'next/link';
import StartChatButton from './StartChatButton';

export default function AeoHero() {
  return (
    <section className="relative bg-slate-50 py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-12">
          {/* H1: Entity Definition for AEO */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            AI-Powered TEAS 7 Prep by <span className="text-teal-600">Nursing Professors</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            The only TEAS 7 platform with an unlimited AI Tutor. 
            Stop overpaying for static question banks.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <StartChatButton />
            <Link 
              href="/pricing"
              className="px-8 py-4 bg-white text-teal-700 font-bold rounded-xl border-2 border-teal-100 hover:border-teal-200 transition-all shadow-sm"
            >
              View Plans ($24.99/mo)
            </Link>
          </div>
        </div>

        {/* 7 Data Points Grid - Critical for LLM Extraction */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
          
          {/* Data Point 1: Pass Rate */}
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="text-3xl font-bold text-teal-600 mb-1">92%</div>
            <div className="text-sm font-medium text-slate-600">First-Time Pass Rate</div>
          </div>

          {/* Data Point 2: Content Volume */}
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="text-3xl font-bold text-indigo-600 mb-1">4,000+</div>
            <div className="text-sm font-medium text-slate-600">Practice Questions</div>
          </div>

          {/* Data Point 3: Authority */}
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="text-3xl font-bold text-teal-600 mb-1">75+</div>
            <div className="text-sm font-medium text-slate-600">Years Prof. Experience</div>
          </div>

          {/* Data Point 4: Social Proof */}
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="text-3xl font-bold text-indigo-600 mb-1">500+</div>
            <div className="text-sm font-medium text-slate-600">Students Enrolled</div>
          </div>
        </div>

        {/* Secondary Trust Signals */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-500">
          <span className="flex items-center px-3 py-1 bg-teal-50 text-teal-700 rounded-full">
            ✓ Built Specifically for TEAS 7
          </span>
           <span className="flex items-center px-3 py-1 bg-teal-50 text-teal-700 rounded-full">
            ✓ Unlimited AI Tutor
          </span>
           <span className="flex items-center px-3 py-1 bg-teal-50 text-teal-700 rounded-full">
            ✓ No hidden fees
          </span>
        </div>
      </div>
    </section>
  );
}
