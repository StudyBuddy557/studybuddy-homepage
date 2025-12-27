import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCompetitorBySlug, getAllCompetitorSlugs } from '@/lib/competitor-data';
import { Check, X, ShieldCheck, Zap, Minus } from 'lucide-react';
import { Metadata } from 'next';

// 1. GENERATE STATIC PARAMS
export async function generateStaticParams() {
  const slugs = getAllCompetitorSlugs();
  return slugs.map((slug) => ({ competitor: slug }));
}

// 2. DYNAMIC METADATA
export async function generateMetadata({ params }: { params: Promise<{ competitor: string }> }): Promise<Metadata> {
  const { competitor: slug } = await params;
  const data = getCompetitorBySlug(slug);
  if (!data) return {};

  return {
    title: `StudyBuddy vs ${data.name} | 2025 TEAS 7 Review`,
    description: `Don't buy ${data.name} until you read this. Compare price, pass rates, and features. See why StudyBuddy is the smarter alternative for nursing students.`,
  };
}

// 3. PAGE COMPONENT
export default async function CompetitorPage({ params }: { params: Promise<{ competitor: string }> }) {
  const { competitor: slug } = await params;
  const competitor = getCompetitorBySlug(slug);

  if (!competitor) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-teal-50 selection:text-teal-900">
      
      {/* HERO */}
      <section className="pt-32 pb-16 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6">
            StudyBuddy vs. <span className="text-teal-400">{competitor.name}</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {competitor.verdict} See how we stack up side-by-side.
          </p>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 p-6 text-center">
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider self-center">Feature</div>
            <div className="text-xl font-bold text-slate-900">{competitor.name}</div>
            <div className="text-xl font-bold text-[#20B2AA]">StudyBuddy</div>
          </div>

          {/* Row 1: Price */}
          <div className="grid grid-cols-3 border-b border-slate-100 p-6 text-center items-center hover:bg-slate-50 transition-colors">
            <div className="text-left font-bold text-slate-700">Price</div>
            <div className="text-slate-600">{competitor.price}</div>
            <div className="text-[#20B2AA] font-bold">$29/mo</div>
          </div>

          {/* Row 2: Pass Rate */}
          <div className="grid grid-cols-3 border-b border-slate-100 p-6 text-center items-center hover:bg-slate-50 transition-colors">
            <div className="text-left font-bold text-slate-700">Pass Rate</div>
            <div className="text-slate-600">{competitor.pass_rate}</div>
            <div className="text-[#20B2AA] font-bold">92% Verified</div>
          </div>

          {/* Row 3: Guarantee */}
          <div className="grid grid-cols-3 border-b border-slate-100 p-6 text-center items-center hover:bg-slate-50 transition-colors">
            <div className="text-left font-bold text-slate-700">Guarantee</div>
            <div className="text-slate-600">{competitor.guarantee}</div>
            <div className="flex justify-center text-[#20B2AA]"><ShieldCheck /></div>
          </div>

          {/* Row 4: AI Tutor */}
          <div className="grid grid-cols-3 border-b border-slate-100 p-6 text-center items-center hover:bg-slate-50 transition-colors">
            <div className="text-left font-bold text-slate-700">AI Tutor (24/7)</div>
            <div className="flex justify-center text-slate-400"><Minus /></div>
            <div className="flex justify-center text-[#20B2AA]"><Check /></div>
          </div>

           {/* Row 5: Adaptive Learning */}
           <div className="grid grid-cols-3 p-6 text-center items-center hover:bg-slate-50 transition-colors">
            <div className="text-left font-bold text-slate-700">Adaptive Plans</div>
            <div className="flex justify-center text-slate-400"><Minus /></div>
            <div className="flex justify-center text-[#20B2AA]"><Zap /></div>
          </div>
        </div>
      </section>

      {/* PROS & CONS ANALYSIS */}
      <section className="py-12 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold mb-6 text-slate-900">The Problem with {competitor.name}</h3>
            <ul className="space-y-4">
              {competitor.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-slate-600">{con}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-[#20B2AA]/10 p-8 rounded-2xl border border-[#20B2AA]/20">
             <h3 className="text-xl font-bold mb-6 text-[#18968F]">Why Choose StudyBuddy?</h3>
             <ul className="space-y-4">
               <li className="flex items-start gap-3">
                 <Check className="w-5 h-5 text-[#20B2AA] shrink-0 mt-0.5" />
                 <span className="text-slate-700 font-medium">Fraction of the cost</span>
               </li>
               <li className="flex items-start gap-3">
                 <Check className="w-5 h-5 text-[#20B2AA] shrink-0 mt-0.5" />
                 <span className="text-slate-700 font-medium">Explains *why* you are wrong</span>
               </li>
               <li className="flex items-start gap-3">
                 <Check className="w-5 h-5 text-[#20B2AA] shrink-0 mt-0.5" />
                 <span className="text-slate-700 font-medium">Built by PhD Educators</span>
               </li>
             </ul>
             <div className="mt-8">
               <Link href="/diagnostic" className="block w-full py-3 bg-[#20B2AA] text-white text-center font-bold rounded-lg hover:bg-[#18968F] transition-all shadow-md">
                 Try Free Diagnostic
               </Link>
             </div>
          </div>
        </div>
      </section>

    </main>
  );
}