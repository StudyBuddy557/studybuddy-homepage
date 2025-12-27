import { Metadata } from 'next';
import Link from 'next/link';
import { generateAiTutorSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import {  Zap, MessageSquare, Clock, BrainCircuit, CheckCircle2, ArrowRight } from 'lucide-react';

// --- METADATA ---
export const metadata: Metadata = {
  title: 'Unlimited AI TEAS 7 Tutor | Instant Answers for Nursing Students',
  description: 'The only TEAS 7 prep with an unlimited AI tutor. Get instant, step-by-step explanations for Anatomy, Math, and Reading questions 24/7.',
};

export default function AiTutorPage() {
  // AEO: SoftwareApplication Schema
  const aiSchema = generateAiTutorSchema();

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <JsonLd schema={aiSchema} />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-900 text-white">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#20B2AA] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#20B2AA]/50 bg-[#20B2AA]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#20B2AA] mb-6">
              <Zap className="w-4 h-4 fill-current" />
              New Technology
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              A Private Tutor.<br />
              <span className="text-[#20B2AA]">Available 24/7.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-lg">
              Stuck on a chemistry question at 2 AM? Don't wait for office hours. StudyBuddy's AI Tutor explains every concept instantly until you understand it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="https://buy.stripe.com/eVq7sKbtn7IR5ma5jhcjS05" 
                className="px-8 py-4 bg-[#20B2AA] text-white font-bold rounded-xl hover:bg-[#18968F] transition-all shadow-lg shadow-[#20B2AA]/25 text-center"
              >
                Try It Risk-Free ($29/mo)
              </Link>
            </div>
          </div>
          
          {/* Visual: Chat Interface Simulation */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#20B2AA] to-indigo-600 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-700/50">
              <div className="bg-slate-100 p-4 border-b border-slate-200 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="ml-auto text-xs font-bold text-slate-400">TEAS 7 Tutor</span>
              </div>
              <div className="p-6 space-y-4 bg-slate-50 min-h-[300px]">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-slate-200 text-slate-800 px-4 py-2 rounded-2xl rounded-tr-none text-sm max-w-[85%]">
                    Can you explain why the left ventricle wall is thicker?
                  </div>
                </div>
                {/* AI Response */}
                <div className="flex justify-start">
                   <div className="bg-[#20B2AA]/10 text-slate-800 px-4 py-3 rounded-2xl rounded-tl-none text-sm max-w-[90%] border border-[#20B2AA]/20">
                    <p className="mb-2 font-bold text-[#18968F] text-xs uppercase">Answer:</p>
                    <p>Great question! The <strong>left ventricle</strong> has a thicker muscular wall because it has to pump blood to the <strong>entire body</strong> (systemic circulation).</p>
                    <p className="mt-2">In contrast, the right ventricle only pumps blood to the lungs (pulmonary circulation), which requires much less pressure.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE GRID --- */}
      <section className="py-24 px-4 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why AI Beats Static Textbooks</h2>
            <p className="text-lg text-slate-600">Static practice tests tell you <em>that</em> you were wrong. AI tells you <em>why</em>.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#20B2AA] transition-all group">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Zero Wait Time</h3>
              <p className="text-slate-600">
                Study at 5 AM or 11 PM. The AI Tutor is instant. No scheduling, no waiting for email replies.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#20B2AA] transition-all group">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Adaptive Explanations</h3>
              <p className="text-slate-600">
                Don't understand the first explanation? Ask it to "explain like I'm 5" or "give me a medical example." It adapts to you.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#20B2AA] transition-all group">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Unlimited Q&A</h3>
              <p className="text-slate-600">
                Most platforms charge per hour for tutoring. We offer unlimited questions for one flat monthly rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (Step by Step for Schema "HowTo" potential) --- */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8">How to Use the AI Tutor</h2>
              <ul className="space-y-6">
                {[
                  'Take a practice question in the StudyBuddy dashboard.',
                  'If you get it wrong, click "Ask AI Tutor" immediately.',
                  'Read the custom explanation generated for your specific mistake.',
                  'Ask follow-up questions if you are still confused.',
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#20B2AA] flex items-center justify-center font-bold text-sm shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-lg text-slate-300 pt-1">{step}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[#20B2AA] rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <p className="font-mono text-[#20B2AA] text-sm mb-4">$ User: How do I calculate dosage by weight?</p>
                <p className="font-mono text-slate-300 text-sm mb-4">
                  {`> AI: To calculate dosage by weight, follow these 3 steps:`} <br/>
                  {`1. Convert weight to kg (lbs / 2.2)`} <br/>
                  {`2. Multiply kg by the dose prescribed (mg/kg)`} <br/>
                  {`3. Divide by the concentration available.`}
                </p>
                <p className="font-mono text-slate-300 text-sm">
                  {`> Would you like a practice problem?`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-24 bg-white text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Stop Googling Every Question.</h2>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Get the answers you need, instantly. Join 500+ nursing students using StudyBuddy today.
        </p>
        <Link 
          href="https://buy.stripe.com/eVq7sKbtn7IR5ma5jhcjS05" 
          className="inline-flex items-center px-8 py-4 bg-[#20B2AA] text-white font-bold rounded-xl hover:bg-[#18968F] transition-all text-lg"
        >
          Get Unlimited AI Access <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </section>
    </main>
  );
}