import { Metadata } from 'next';
import Link from 'next/link';
import { generateCourseSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { Check, Clock, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';

// --- METADATA FOR SEO ---
export const metadata: Metadata = {
  title: 'What is on the TEAS 7 Exam? Official 2025 Syllabus & Breakdown',
  description: 'Complete TEAS 7 exam syllabus including question counts, time limits, and topic breakdowns for Reading, Math, Science, and English.',
};

// --- STATIC DATA ---
const EXAM_SECTIONS = [
  {
    title: 'Reading',
    questions: 53,
    time: '64 min',
    topics: ['Key Ideas & Details', 'Craft & Structure', 'Integration of Knowledge'],
    color: 'bg-blue-50 text-blue-700',
    icon: BookOpen,
  },
  {
    title: 'Mathematics',
    questions: 36,
    time: '54 min',
    topics: ['Numbers & Algebra', 'Measurement & Data'],
    color: 'bg-green-50 text-green-700',
    icon: CalculatorIcon,
  },
  {
    title: 'Science',
    questions: 53,
    time: '63 min',
    topics: ['Human Anatomy & Physiology', 'Life & Physical Sciences', 'Scientific Reasoning'],
    color: 'bg-purple-50 text-purple-700',
    icon: BeakerIcon,
  },
  {
    title: 'English & Language',
    questions: 28,
    time: '28 min',
    topics: ['Conventions of Standard English', 'Knowledge of Language', 'Vocabulary Acquisition'],
    color: 'bg-orange-50 text-orange-700',
    icon: PencilIcon,
  },
];

// --- ICONS (Internal Helper) ---
function CalculatorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}
function BeakerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  );
}
function PencilIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  );
}

export default function TeasSyllabusPage() {
  // AEO: Generate Course Schema
  const courseSchema = generateCourseSchema({
    title: 'TEAS 7 Comprehensive Prep Course',
    description: 'A complete breakdown of the ATI TEAS 7 exam including all 4 sections: Reading, Math, Science, and English.',
    syllabusSections: [
      'TEAS 7 Reading: Key Ideas & Details',
      'TEAS 7 Mathematics: Algebra & Numbers',
      'TEAS 7 Science: Anatomy & Physiology',
      'TEAS 7 English: Grammar & Vocabulary'
    ]
  });

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <JsonLd schema={courseSchema} />

      {/* --- HERO SECTION --- */}
      <section className="bg-slate-50 pt-32 pb-20 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-800 mb-6">
            <BookOpen className="w-4 h-4" />
            Official 2025 Blueprint
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            What is on the <span className="text-[#20B2AA]">TEAS 7 Exam?</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            The TEAS 7 exam consists of <strong>170 questions</strong> across four sections to be completed in <strong>209 minutes</strong>. Here is the exact breakdown of what you need to study.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3.5 text-base font-bold text-white bg-[#20B2AA] rounded-xl hover:bg-[#18968F] transition-all shadow-lg hover:shadow-[#20B2AA]/30">
               Take Free Diagnostic Quiz
               <ArrowRight className="ml-2 w-5 h-5" />
             </Link>
          </div>
        </div>
      </section>

      {/* --- BLUEPRINT TABLE (AEO GOLD) --- */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xl bg-white">
            <div className="bg-slate-900 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-white">TEAS 7 Exam Structure</h2>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Time: 209 Minutes</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 font-bold text-slate-700">Section</th>
                    <th className="px-6 py-4 font-bold text-slate-700">Questions</th>
                    <th className="px-6 py-4 font-bold text-slate-700">Time Limit</th>
                    <th className="px-6 py-4 font-bold text-slate-700">Key Topics</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {EXAM_SECTIONS.map((section) => (
                    <tr key={section.title} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${section.color}`}>
                            <section.icon className="w-5 h-5" />
                          </div>
                          <span className="font-bold text-base">{section.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 font-medium text-slate-600">{section.questions} Questions</td>
                      <td className="px-6 py-5 font-medium text-slate-600">{section.time}</td>
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap gap-2">
                          {section.topics.map(topic => (
                            <span key={topic} className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-500/10">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50 border-t border-slate-200">
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-900">Total</td>
                    <td className="px-6 py-4 font-bold text-[#20B2AA]">170 Questions</td>
                    <td className="px-6 py-4 font-bold text-[#20B2AA]">209 Minutes</td>
                    <td className="px-6 py-4 text-xs text-slate-500 italic">Format: Multiple Choice + Alternate Item Types</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          
          <p className="mt-4 text-center text-xs text-slate-500 max-w-3xl mx-auto">
            Note: 20 of the 170 questions are unscored pretest items, but you will not know which ones they are. Treat every question as if it counts.
          </p>
        </div>
      </section>

      {/* --- DEEP DIVE SECTIONS --- */}
      <section className="py-12 px-4 max-w-4xl mx-auto space-y-16">
        
        {/* Reading */}
        <div id="reading" className="scroll-mt-32">
          <h3 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            Reading Section Breakdown
          </h3>
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-6">
              The Reading section is the first part of the TEAS 7. It focuses on your ability to extract information from paragraphs, charts, and graphs. You have roughly <strong>1 minute and 12 seconds per question</strong>.
            </p>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-lg mb-4">What to study:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span><strong>Key Ideas & Details (22 questions):</strong> Identifying the main idea, topic sentences, and supporting details.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span><strong>Craft & Structure (14 questions):</strong> Understanding author bias, distinguishing fact from opinion, and interpreting definitions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span><strong>Integration of Knowledge (11 questions):</strong> Using multiple sources (text + graphs) to draw conclusions.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Math */}
        <div id="math" className="scroll-mt-32">
          <h3 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
             <div className="p-2 bg-green-100 text-green-700 rounded-lg">
              <CalculatorIcon className="w-6 h-6" />
            </div>
            Math Section Breakdown
          </h3>
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-6">
              You are allowed to use a four-function calculator provided on the screen. The focus is heavily on algebra and converting between fractions, decimals, and percentages.
            </p>
            <div className="flex items-start gap-4 bg-amber-50 p-4 rounded-xl border border-amber-200 mb-6">
              <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
              <p className="text-sm text-amber-800">
                <strong>Pro Tip:</strong> Do not rely solely on the calculator. You must know how to set up the equations for word problems, which make up a significant portion of this section.
              </p>
            </div>
            <ul className="grid sm:grid-cols-2 gap-4">
               {['Order of Operations', 'Fractions & Decimals', 'Ratio & Proportion', 'Algebraic Equations', 'Measurement Conversion', 'Geometry (Area/Perimeter)'].map(topic => (
                 <li key={topic} className="flex items-center gap-2 text-slate-700">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                   {topic}
                 </li>
               ))}
            </ul>
          </div>
        </div>

        {/* Science */}
        <div id="science" className="scroll-mt-32">
          <h3 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
             <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
              <BeakerIcon className="w-6 h-6" />
            </div>
            Science Section Breakdown
          </h3>
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-6">
              This is widely considered the hardest section of the TEAS 7. <strong>Human Anatomy & Physiology</strong> makes up the vast majority of the questions.
            </p>
             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-lg mb-4">Topic Weighting:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded">Highest Priority</div>
                  <span><strong>Anatomy & Physiology (32 questions):</strong> Cardiovascular, Respiratory, Immune, and Endocrine systems are tested heavily.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-1 rounded">Medium Priority</div>
                  <span><strong>Biology & Chemistry (8 questions):</strong> DNA, macromolecules, phase changes, and chemical reactions.</span>
                </li>
                <li className="flex items-start gap-3">
                   <div className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-1 rounded">Low Priority</div>
                  <span><strong>Scientific Reasoning (7 questions):</strong> Experimental design and analyzing results.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="bg-[#1A1A1A] text-white py-20 mt-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Master These Topics?</h2>
          <p className="text-xl text-slate-300 mb-10">
            StudyBuddy's AI Tutor covers 100% of this syllabus. It identifies exactly which areas you need to focus on so you don't waste time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://buy.stripe.com/bJe8wO6930gpdSG275cjS04" className="px-8 py-4 bg-[#20B2AA] text-white font-bold rounded-xl hover:bg-[#18968F] transition-all">
              Get Unlimited AI Tutoring - $24.99/mo
            </Link>
            <Link href="/diagnostic" className="px-8 py-4 bg-transparent border-2 border-slate-700 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">
              Take Free Diagnostic
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}