'use client';

import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ComparisonTable() {
  const comparisons = [
    {
      feature: 'Interactive AI Tutor',
      textbooks: false,
      generic: false,
      studybuddy: true,
      highlight: true
    },
    {
      feature: 'Personalized Study Plan',
      textbooks: false,
      generic: false,
      studybuddy: true,
      highlight: false
    },
    {
      feature: 'Practice Questions',
      textbooks: '~500',
      generic: '~1,000',
      studybuddy: '4,000+',
      highlight: true
    },
    {
      feature: 'Video Explanations',
      textbooks: false,
      generic: 'Limited',
      studybuddy: '350+ Videos',
      highlight: false
    },
    {
      feature: 'Access on Any Device',
      textbooks: false,
      generic: false,
      studybuddy: true,
      highlight: false
    },
    {
      feature: 'Pass Guarantee',
      textbooks: false,
      generic: false,
      studybuddy: true,
      highlight: true
    },
    {
      feature: 'Average Cost',
      textbooks: '~$50',
      generic: '$29-39/mo',
      studybuddy: '$24.99-47/mo',
      highlight: false
    }
  ];

  const renderCell = (value: boolean | string, isStudyBuddy: boolean = false) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckCircle2 className={`w-6 h-6 ${isStudyBuddy ? 'text-[#20B2AA]' : 'text-green-500'}`} strokeWidth={2.5} />
      ) : (
        <XCircle className="w-6 h-6 text-red-400" strokeWidth={2} />
      );
    }
    return <span className={`font-bold ${isStudyBuddy ? 'text-slate-900' : 'text-slate-600'}`}>{value}</span>;
  };

  return (
    <section className="relative py-32 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-100/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-5 py-2 mb-6">
            <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-bold text-amber-700 uppercase tracking-wider">The Honest Comparison</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6">
            Not All TEAS Prep Is<br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#20B2AA] to-[#2563EB] bg-clip-text text-transparent">Created Equal</span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
            Here's how we stack up against traditional textbooks and generic prep sites. Spoiler: We're not even close.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-6xl mx-auto">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
            {/* Header Row */}
            <div className="grid grid-cols-4 gap-6 bg-slate-50 p-8 border-b border-slate-200">
              <div className="flex items-end">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Features</span>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-slate-700">Textbooks</div>
                <div className="text-xs text-slate-400 mt-1">Traditional</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-slate-700">Generic Sites</div>
                <div className="text-xs text-slate-400 mt-1">Cookie-Cutter</div>
              </div>
              <div className="text-center relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                    ⚡ Best Value
                  </div>
                </div>
                <div className="text-lg font-bold text-slate-900 mt-2">StudyBuddy</div>
                <div className="text-xs text-[#20B2AA] mt-1 font-bold">AI-Powered</div>
              </div>
            </div>

            {/* Comparison Rows */}
            <div className="divide-y divide-slate-100">
              {comparisons.map((row, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-4 gap-6 p-8 transition-colors hover:bg-slate-50/50 ${
                    row.highlight ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <span className={`font-bold ${row.highlight ? 'text-slate-900 text-lg' : 'text-slate-700'}`}>
                      {row.feature}
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    {renderCell(row.textbooks)}
                  </div>
                  <div className="flex items-center justify-center">
                    {renderCell(row.generic)}
                  </div>
                  <div className="flex items-center justify-center relative">
                    <div className={`${row.highlight ? 'scale-110' : ''} transition-transform`}>
                      {renderCell(row.studybuddy, true)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Row */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-10 border-t-2 border-slate-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <div className="text-2xl font-black text-slate-900 mb-2">
                    Ready to Experience the Difference?
                  </div>
                  <div className="text-slate-600 font-medium">
                    Join 1,200+ nursing students who chose the smarter way to prep.
                  </div>
                </div>
                <Link
                  href="https://learn.studybuddy.live/checkout?product_id=TEAS_PRO"
                  className="group shrink-0 flex items-center gap-3 bg-[#2563EB] hover:bg-blue-600 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:-translate-y-1"
                >
                  Start Learning Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-6">
            {/* Textbooks */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <div className="text-center mb-6 pb-4 border-b border-slate-100">
                <div className="text-xl font-bold text-slate-700">Textbooks</div>
                <div className="text-sm text-slate-400 mt-1">Traditional</div>
              </div>
              <div className="space-y-4">
                {comparisons.map((row, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-slate-600">{row.feature}</span>
                    <div className="ml-4">{renderCell(row.textbooks)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generic Sites */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <div className="text-center mb-6 pb-4 border-b border-slate-100">
                <div className="text-xl font-bold text-slate-700">Generic Sites</div>
                <div className="text-sm text-slate-400 mt-1">Cookie-Cutter</div>
              </div>
              <div className="space-y-4">
                {comparisons.map((row, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-slate-600">{row.feature}</span>
                    <div className="ml-4">{renderCell(row.generic)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* StudyBuddy - Featured */}
            <div className="rounded-3xl border-2 border-[#2563EB] bg-gradient-to-br from-white to-blue-50 p-6 shadow-2xl relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white text-xs font-black px-6 py-2 rounded-full shadow-lg uppercase tracking-wider">
                  ⚡ Best Value
                </div>
              </div>
              
              <div className="text-center mb-6 pb-4 border-b border-blue-100 mt-2">
                <div className="text-xl font-bold text-slate-900">StudyBuddy</div>
                <div className="text-sm text-[#20B2AA] mt-1 font-bold">AI-Powered</div>
              </div>
              
              <div className="space-y-4 mb-6">
                {comparisons.map((row, idx) => (
                  <div key={idx} className={`flex items-center justify-between py-2 ${row.highlight ? 'bg-white/80 -mx-2 px-2 rounded-lg' : ''}`}>
                    <span className="text-sm font-bold text-slate-900">{row.feature}</span>
                    <div className="ml-4">{renderCell(row.studybuddy, true)}</div>
                  </div>
                ))}
              </div>

              <Link
                href="https://learn.studybuddy.live/checkout?product_id=TEAS_PRO"
                className="group block w-full bg-[#2563EB] hover:bg-blue-600 text-white text-center px-6 py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/30 transition-all"
              >
                <span className="flex items-center justify-center gap-2">
                  Start Learning Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}