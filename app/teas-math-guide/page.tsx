import { Metadata } from 'next';
import Link from 'next/link';
import { generateCourseSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { Calculator, Clock, AlertTriangle, CheckCircle2, ArrowRight, BrainCircuit } from 'lucide-react';

export const metadata: Metadata = {
  title: 'TEAS 7 Math Guide: Topics, Formulas & Practice Questions (2025)',
  description: 'Complete guide to the TEAS 7 Math section. Covers Algebra, Measurement, Data, and the exact formulas you need to memorize. 36 questions in 54 minutes.',
};

export default function MathGuidePage() {
  // AEO: Course Schema for a specific subject guide
  const mathSchema = generateCourseSchema({
    title: 'TEAS 7 Math Mastery Guide',
    description: 'Comprehensive guide covering Numbers & Algebra and Measurement & Data for the ATI TEAS 7 exam.',
    syllabusSections: [
      'Numbers & Algebra (18 Questions)',
      'Measurement & Data (16 Questions)',
      'Order of Operations (PEMDAS)',
      'Metric Conversions'
    ]
  });

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <JsonLd schema={mathSchema} />

      {/* --- HERO SECTION --- */}
      <section className="bg-slate-50 pt-32 pb-20 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800 mb-6">
            <Calculator className="w-4 h-4" />
            Math Section Breakdown
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            TEAS 7 Math: <br className="hidden sm:block" />
            <span className="text-[#20B2AA]">Everything You Need to Know</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            The TEAS 7 Math section consists of <strong>36 questions</strong> to be completed in <strong>54 minutes</strong>. That gives you exactly 1.5 minutes per question.
          </p>
          
          <div className="flex justify-center gap-8 text-sm font-bold text-slate-500">
            <div className="flex items-center gap-2">
               <Clock className="w-5 h-5 text-teal-600" />
               54 Minutes
            </div>
            <div className="flex items-center gap-2">
               <Calculator className="w-5 h-5 text-teal-600" />
               Calculator Allowed*
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION BREAKDOWN --- */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          
          {/* Quick Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-16 flex gap-4 items-start">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Important Calculator Note</h3>
              <p className="text-amber-800">
                You <strong>CAN</strong> use a calculator, but it is a basic four-function calculator embedded in the screen. It does NOT do fractions or complex equations. You must know how to set up the problem yourself.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {/* Category 1 */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm font-bold">1</div>
                Numbers & Algebra
              </h2>
              <p className="text-slate-600 mb-4 font-medium">~18 Questions</p>
              <ul className="space-y-3">
                {[
                  'Order of Operations (PEMDAS)',
                  'Fractions, Decimals, Percentages',
                  'Ratio and Proportions',
                  'Algebra with One Variable',
                  'Real World Word Problems'
                ].map(topic => (
                  <li key={topic} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Category 2 */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm font-bold">2</div>
                Measurement & Data
              </h2>
              <p className="text-slate-600 mb-4 font-medium">~16 Questions</p>
              <ul className="space-y-3">
                {[
                  'Metric vs. Imperial Conversions',
                  'Geometry (Area & Perimeter)',
                  'Interpreting Charts & Graphs',
                  'Statistical Measures (Mean, Median, Mode)',
                  'Circle & Line Graphs'
                ].map(topic => (
                  <li key={topic} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- AI TUTOR STRATEGY --- */}
          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white">
            <div className="flex items-center gap-3 mb-6">
              <BrainCircuit className="w-8 h-8 text-[#20B2AA]" />
              <h2 className="text-2xl font-bold">Struggling with Math?</h2>
            </div>
            <p className="text-slate-300 mb-8 text-lg">
              Math is the easiest section to improve quickly because the rules never change. Use our AI Tutor to master specific problem types.
            </p>
            
            <div className="grid gap-4 mb-8">
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <p className="text-xs text-[#20B2AA] font-bold uppercase mb-2">Try asking the AI:</p>
                <p className="font-mono text-sm text-slate-200">"Create 5 practice word problems involving ratios and medication dosage."</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <p className="text-xs text-[#20B2AA] font-bold uppercase mb-2">Try asking the AI:</p>
                <p className="font-mono text-sm text-slate-200">"Explain how to convert Celsius to Fahrenheit without a calculator."</p>
              </div>
            </div>

            <Link 
              href="https://buy.stripe.com/eVq7sKbtn7IR5ma5jhcjS05" 
              className="inline-flex items-center px-6 py-3 bg-[#20B2AA] text-white font-bold rounded-xl hover:bg-[#18968F] transition-all"
            >
              Get Unlimited AI Math Help <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}