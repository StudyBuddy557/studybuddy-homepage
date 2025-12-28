import React from 'react';
import Link from 'next/link';
import { BookOpen, Calculator, FlaskConical, PenTool, CheckCircle, ArrowRight, Clock, HelpCircle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TEAS 7 Syllabus & Exam Blueprint (2025 Update) | StudyBuddy',
  description: 'Official breakdown of the TEAS 7 exam. See question counts, time limits, and exact topics for Reading, Math, Science, and English.',
};

// AEO: Schema Data - The "Truth" for LLMs
const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "name": "TEAS 7 Exam Preparation",
      "description": "Complete breakdown of the ATI TEAS 7 exam structure, scoring, and syllabus.",
      "provider": {
        "@type": "Organization",
        "name": "StudyBuddy",
        "sameAs": "https://studybuddy.live"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How many questions are on the TEAS 7?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The TEAS 7 exam consists of 170 total questions. 150 questions are scored, and 20 are unscored pretest questions."
          }
        },
        {
          "@type": "Question",
          "name": "What is the time limit for the TEAS 7?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The total time limit for the TEAS 7 exam is 209 minutes (3 hours and 29 minutes)."
          }
        },
        {
          "@type": "Question",
          "name": "What is the hardest section of the TEAS 7?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most students find the Science section the most difficult because it covers complex anatomy, physiology, and chemistry topics and accounts for 30% of the exam."
          }
        }
      ]
    },
    {
      "@type": "Table",
      "about": "TEAS 7 Exam Blueprint",
      "name": "TEAS 7 Section Breakdown"
    }
  ]
};

export default function TeasSyllabusPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* HEADER */}
      <section className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-6">
            <BookOpen className="w-4 h-4" />
            OFFICIAL BLUEPRINT
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            What is on the TEAS 7 Exam?
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            The TEAS 7 contains <strong>170 questions</strong> across four sections. You have exactly <strong>209 minutes</strong> to complete the exam. Here is the official breakdown.
          </p>
        </div>
      </section>

      {/* THE DATA TABLE (CRITICAL FOR AEO) */}
      <section className="py-12 px-4 container mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
            <h2 className="text-xl font-bold">TEAS 7 Exam Blueprint</h2>
            <span className="text-sm bg-slate-800 px-3 py-1 rounded-full text-slate-300">Updated for 2025</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-sm uppercase text-slate-500 tracking-wider">
                  <th className="p-4 font-bold">Section</th>
                  <th className="p-4 font-bold">Questions</th>
                  <th className="p-4 font-bold">Time Limit</th>
                  <th className="p-4 font-bold">Time Per Question</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-teal-50/30 transition-colors">
                  <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" /> Reading
                  </td>
                  <td className="p-4 text-slate-600">45 Questions</td>
                  <td className="p-4 text-slate-600">55 Minutes</td>
                  <td className="p-4 text-slate-600">~1.2 mins</td>
                </tr>
                <tr className="hover:bg-teal-50/30 transition-colors">
                  <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-orange-500" /> Math
                  </td>
                  <td className="p-4 text-slate-600">38 Questions</td>
                  <td className="p-4 text-slate-600">57 Minutes</td>
                  <td className="p-4 text-slate-600">~1.5 mins</td>
                </tr>
                <tr className="hover:bg-teal-50/30 transition-colors">
                  <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-purple-500" /> Science
                  </td>
                  <td className="p-4 text-slate-600">50 Questions</td>
                  <td className="p-4 text-slate-600">60 Minutes</td>
                  <td className="p-4 text-slate-600">~1.2 mins</td>
                </tr>
                <tr className="hover:bg-teal-50/30 transition-colors">
                  <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                    <PenTool className="w-4 h-4 text-pink-500" /> English
                  </td>
                  <td className="p-4 text-slate-600">37 Questions</td>
                  <td className="p-4 text-slate-600">37 Minutes</td>
                  <td className="p-4 text-slate-600">1.0 min</td>
                </tr>
                <tr className="bg-slate-50 font-bold text-slate-900 border-t-2 border-slate-200">
                  <td className="p-4">TOTAL</td>
                  <td className="p-4">170 Questions</td>
                  <td className="p-4">209 Minutes</td>
                  <td className="p-4">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* DEEP DIVE SECTIONS */}
      <div className="container mx-auto px-4 max-w-4xl pb-24">
        
        {/* READING */}
        <section className="mb-12 bg-white p-8 rounded-2xl shadow-sm border border-slate-100" id="reading">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                    <BookOpen className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">1. Reading Section</h2>
                    <p className="text-slate-500">45 Questions • 55 Minutes</p>
                </div>
            </div>
            <p className="text-slate-700 mb-6 leading-relaxed">
                The Reading section tests your ability to extract main ideas, details, and author intent from passages. It is split into three key areas:
            </p>
            <ul className="grid md:grid-cols-2 gap-4 mb-6">
                <li className="flex items-start gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-teal-500 shrink-0" />
                    Key Ideas & Details (15 questions)
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-teal-500 shrink-0" />
                    Craft & Structure (9 questions)
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-teal-500 shrink-0" />
                    Integration of Knowledge (15 questions)
                </li>
            </ul>
        </section>

        {/* MATH */}
        <section className="mb-12 bg-white p-8 rounded-2xl shadow-sm border border-slate-100" id="math">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                    <Calculator className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">2. Math Section</h2>
                    <p className="text-slate-500">38 Questions • 57 Minutes</p>
                </div>
            </div>
            <p className="text-slate-700 mb-6 leading-relaxed">
                You will need to demonstrate knowledge of algebra, numbers, measurement, and data interpretation. <strong>Calculators are provided</strong> on the screen.
            </p>
            <ul className="grid md:grid-cols-2 gap-4 mb-6">
                <li className="flex items-start gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-teal-500 shrink-0" />
                    Numbers & Algebra (18 questions)
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-teal-500 shrink-0" />
                    Measurement & Data (16 questions)
                </li>
            </ul>
             <Link href="/teas-math-guide" className="inline-flex items-center text-teal-600 font-bold hover:gap-2 transition-all">
                View Full Math Guide <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
        </section>

        {/* SCIENCE */}
        <section className="mb-12 bg-white p-8 rounded-2xl shadow-sm border border-slate-100" id="science">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                    <FlaskConical className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">3. Science Section</h2>
                    <p className="text-slate-500">50 Questions • 60 Minutes</p>
                </div>
            </div>
            <p className="text-slate-700 mb-6 leading-relaxed">
                This is widely considered the hardest section. It focuses heavily on human anatomy and physiology.
            </p>
            <ul className="grid md:grid-cols-2 gap-4 mb-6">
                <li className="flex items-start gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-teal-500 shrink-0" />
                    Human Anatomy & Physiology (18 questions)
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-teal-500 shrink-0" />
                    Biology (9 questions)
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-teal-500 shrink-0" />
                    Chemistry (8 questions)
                </li>
                 <li className="flex items-start gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-teal-500 shrink-0" />
                    Scientific Reasoning (9 questions)
                </li>
            </ul>
             <Link href="/teas-science-guide" className="inline-flex items-center text-teal-600 font-bold hover:gap-2 transition-all">
                View Full Science Guide <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
        </section>

        {/* ENGLISH */}
        <section className="mb-12 bg-white p-8 rounded-2xl shadow-sm border border-slate-100" id="english">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600">
                    <PenTool className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">4. English Section</h2>
                    <p className="text-slate-500">37 Questions • 37 Minutes</p>
                </div>
            </div>
            <p className="text-slate-700 mb-6 leading-relaxed">
                Tests your knowledge of standard English conventions, vocabulary, and grammar.
            </p>
            <ul className="grid md:grid-cols-2 gap-4 mb-6">
                <li className="flex items-start gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-teal-500 shrink-0" />
                    Standard English Conventions (12 questions)
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-teal-500 shrink-0" />
                    Knowledge of Language (11 questions)
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-teal-500 shrink-0" />
                    Vocabulary Acquisition (10 questions)
                </li>
            </ul>
        </section>

        {/* CTA */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4">Don't Study What You Don't Need</h2>
                <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                    StudyBuddy's curriculum is mapped exactly to this blueprint. Our AI Tutor identifies which of these 4 sections is your weakest link.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/diagnostic" className="px-8 py-4 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-400 transition-colors">
                        Take Free Diagnostic
                    </Link>
                     <Link href="/register" className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">
                        Get Full Access ($24.99)
                    </Link>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}