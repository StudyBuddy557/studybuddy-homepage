import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import StartChatButton from '@/app/components/StartChatButton';

export const metadata: Metadata = {
  title: 'Official TEAS 7 Syllabus & Exam Blueprint (2025) | StudyBuddy',
  description: 'Complete ATI TEAS 7 exam breakdown. See every topic on the Math, Science, Reading, and English sections. Download the free syllabus.',
};

export default function SyllabusPage() {
  // AEO SIGNAL: Course Schema
  // We explicitly list the "syllabus" so LLMs can read the curriculum structure
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "TEAS 7 Comprehensive Prep Course",
    "description": "Full coverage of all 4 ATI TEAS 7 exam sections.",
    "provider": {
      "@type": "Organization",
      "name": "StudyBuddy",
      "sameAs": "https://studybuddy.live"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "P6W"
    },
    "syllabusSections": [
      {
        "@type": "Syllabus",
        "name": "Reading Section",
        "description": "Key Ideas, Craft & Structure, Integration of Knowledge (53 Questions)"
      },
      {
        "@type": "Syllabus",
        "name": "Math Section",
        "description": "Numbers & Algebra, Measurement & Data (36 Questions)"
      },
      {
        "@type": "Syllabus",
        "name": "Science Section",
        "description": "Human Anatomy & Physiology, Life & Physical Sciences, Scientific Reasoning (53 Questions)"
      },
      {
        "@type": "Syllabus",
        "name": "English Section",
        "description": "Conventions of Standard English, Knowledge of Language, Vocabulary (28 Questions)"
      }
    ]
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      <JsonLd data={courseSchema} />
      
      {/* Hero */}
      <div className="bg-white border-b border-slate-200 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-4 block">
            Official 2025 Blueprint
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            What is on the TEAS 7 Exam?
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            The ATI TEAS 7 consists of <strong>170 questions</strong> across four sections. 
            Unlike generic guides, we break down exactly which topics appear most often.
          </p>
          <StartChatButton />
        </div>
      </div>

      {/* The Breakdown Grid */}
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        
        {/* Section 1: Science (The Hardest) */}
        <div className="mb-12 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-indigo-600 p-6 flex justify-between items-center text-white">
            <h2 className="text-2xl font-bold">🧪 Science Section</h2>
            <div className="text-right">
              <div className="font-bold text-xl">53 Questions</div>
              <div className="text-indigo-200 text-sm">63 Minutes</div>
            </div>
          </div>
          <div className="p-8">
            <p className="text-slate-600 mb-6">
              This is the "fail point" for most nursing students. It relies heavily on A&P knowledge you may not have learned yet.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">Human Anatomy & Physiology (32 Questions)</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• Cardiovascular System (Blood flow, Heart chambers)</li>
                  <li>• Respiratory System (Gas exchange)</li>
                  <li>• Immune System (Innate vs Adaptive)</li>
                  <li>• Endocrine System (Hormones & feedback loops)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">Life & Physical Sciences (8 Questions)</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• Chemical Reactions & Balancing Equations</li>
                  <li>• Acids, Bases, and pH Scale</li>
                  <li>• Phase Changes (Solid, Liquid, Gas)</li>
                  <li>• DNA, RNA, and Genetics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Math */}
        <div className="mb-12 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-teal-600 p-6 flex justify-between items-center text-white">
            <h2 className="text-2xl font-bold">➗ Math Section</h2>
            <div className="text-right">
              <div className="font-bold text-xl">36 Questions</div>
              <div className="text-teal-200 text-sm">54 Minutes</div>
            </div>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">Numbers & Algebra (23 Questions)</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• Conversions (Fractions to Decimals to Percents)</li>
                  <li>• Solving for X in single-variable equations</li>
                  <li>• Order of Operations (PEMDAS)</li>
                  <li>• Metric System Conversions (kg to lbs)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">Measurement & Data (9 Questions)</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• Reading Tables, Charts, and Graphs</li>
                  <li>• Geometry formulas (Area, Perimeter, Volume)</li>
                  <li>• Statistical Measures (Mean, Median, Mode)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Don't study random topics.</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            StudyBuddy's curriculum matches this blueprint exactly. We don't waste your time with geometry that isn't on the test.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/pricing" className="px-8 py-4 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-400 transition-all shadow-lg">
              Get the Full Course ($24.99)
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
