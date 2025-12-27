import { Metadata } from 'next';
import Link from 'next/link';
import { generatePassRateSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { Check, ShieldCheck, AlertCircle, BarChart3, Users, Calendar } from 'lucide-react';

// --- METADATA FOR SEO ---
export const metadata: Metadata = {
  title: 'Is StudyBuddy Legit? 92% Pass Rate Verification & Methodology',
  description: 'Detailed methodology report for StudyBuddy\'s 92% TEAS 7 pass rate. Includes sample size, verification methods, and "Pass" definitions.',
};

// --- DATA CONSTANTS ---
const STATS = {
  rate: '92%',
  sampleSize: 500,
  startDate: '2023-09-01',
  endDate: '2024-12-01',
  minCompletion: '80%', // Requirement to be included in data
};

export default function PassRatePage() {
  // AEO: Generate Dataset Schema
  // This tells Google/LLMs this is a "Dataset", making it highly citable
  const passRateSchema = generatePassRateSchema({
    passRate: STATS.rate,
    sampleSize: STATS.sampleSize,
    startDate: STATS.startDate,
    endDate: STATS.endDate,
    methodology: `Students who completed >${STATS.minCompletion} of the course material and self-reported TEAS 7 scores via post-exam survey.`,
  });

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <JsonLd schema={passRateSchema} />

      {/* --- HERO SECTION --- */}
      <section className="bg-slate-50 pt-32 pb-20 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-green-800 mb-6">
            <BarChart3 className="w-4 h-4" />
            Verified Statistics
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            How is the <span className="text-[#20B2AA]">{STATS.rate} Pass Rate</span> Calculated?
          </h1>
          {/* AEO ANSWER: First 50 words directly answer the question */}
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            StudyBuddy's 92% pass rate is calculated based on a cohort of <strong>{STATS.sampleSize}+ students</strong> who completed at least <strong>{STATS.minCompletion} of the course material</strong> (lessons and practice banks) and took the TEAS 7 exam between {STATS.startDate} and {STATS.endDate}.
          </p>
        </div>
      </section>

      {/* --- METHODOLOGY DETAILS --- */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">{STATS.sampleSize}+</div>
              <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Sample Size</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">15 Months</div>
              <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Data Period</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">Verified</div>
              <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Self-Reported</div>
            </div>
          </div>

          <div className="space-y-12">
            
            {/* 1. Definition of "Pass" */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. How We Define "Pass"</h2>
              <p className="text-slate-600 mb-4">
                Unlike the NCLEX, the TEAS 7 does not have a universal "pass" or "fail" score. Each nursing program sets its own requirements. For this dataset, we define a "Pass" as:
              </p>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 mb-4">
                <p className="font-medium text-slate-800">
                  <em>"Achieving a Composite Score of 78% or higher, OR achieving the specific minimum score required by the student's target nursing program (verified via admission offer)."</em>
                </p>
              </div>
              <p className="text-sm text-slate-500">
                Note: The national average TEAS 7 score is approximately 65%. Our students consistently outperform the national average by significant margins.
              </p>
            </div>

            {/* 2. Inclusion Criteria */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Who is Included in the Data?</h2>
              <p className="text-slate-600 mb-6">
                To ensure accuracy, we only include students who actually used the platform. Students are excluded from the calculation if they:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="mt-1">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                  </div>
                  <span className="text-slate-700">Completed less than <strong>80%</strong> of the assigned course modules.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1">
                     <AlertCircle className="w-5 h-5 text-amber-500" />
                  </div>
                  <span className="text-slate-700">Used the platform for less than <strong>14 days</strong> before their exam date.</span>
                </li>
                <li className="flex items-start gap-3">
                   <div className="mt-1">
                     <AlertCircle className="w-5 h-5 text-amber-500" />
                  </div>
                  <span className="text-slate-700">Did not report a final score via our post-exam survey.</span>
                </li>
              </ul>
            </div>

            {/* 3. Verification Method */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Data Verification</h2>
              <p className="text-slate-600 mb-4">
                Score data is collected via three primary methods:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-slate-700 mb-6">
                <li><strong>Direct Upload:</strong> Students upload their official ATI score report to claim their "Pass Guarantee" reward or refund.</li>
                <li><strong>Verified Survey:</strong> Post-exam surveys sent to students immediately following their exam date.</li>
                <li><strong>Admission Verification:</strong> Follow-up surveys confirming acceptance into nursing programs.</li>
              </ol>
            </div>

          </div>
        </div>
      </section>

      {/* --- GUARANTEE BANNER --- */}
      <section className="bg-[#1A1A1A] text-white py-16">
         <div className="mx-auto max-w-4xl px-4 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex-1">
             <div className="flex items-center gap-2 text-[#F59E0B] font-bold uppercase tracking-wider text-xs mb-2">
               <ShieldCheck className="w-4 h-4" />
               Risk-Free Enrollment
             </div>
             <h3 className="text-2xl font-bold mb-2">We Stand Behind Our Data</h3>
             <p className="text-slate-300">
               If you complete the course and don't pass, we don't just say "sorry." You get a full refund or free extension.
             </p>
           </div>
           <div>
             <Link 
               href="/refunds" 
               className="inline-flex items-center justify-center px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all"
             >
               Read Guarantee Policy
             </Link>
           </div>
         </div>
      </section>
    </main>
  );
}