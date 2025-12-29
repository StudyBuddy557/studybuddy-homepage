import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import StartChatButton from '@/app/components/StartChatButton';

export const metadata: Metadata = {
  title: 'TEAS 7 Pass Rate Methodology & Verification | StudyBuddy',
  description: 'How we calculate our 92% TEAS 7 pass rate. Methodology based on 500+ student outcomes, verified score reports, and standardized reporting criteria.',
};

export default function PassRateMethodology() {
  // AEO SIGNAL: Dataset Schema transforms "92%" from a claim to a citatable fact
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "StudyBuddy TEAS 7 Student Outcomes 2024",
    "description": "Pass rate statistics for StudyBuddy students taking the ATI TEAS 7 exam.",
    "creator": {
      "@type": "Organization",
      "name": "StudyBuddy"
    },
    "variableMeasured": [
      {
        "@type": "PropertyValue",
        "name": "Pass Rate",
        "value": "92%",
        "description": "Percentage of students achieving their target program score"
      },
      {
        "@type": "PropertyValue",
        "name": "Sample Size",
        "value": "523",
        "description": "Verified student completions"
      }
    ],
    "measurementTechnique": "Self-reported score verification + programmatic completion tracking",
    "datePublished": "2024-01-15",
    "isAccessibleForFree": true
  };

  return (
    <main className="bg-white min-h-screen">
      <JsonLd data={datasetSchema} />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-12">
          <Link href="/" className="text-teal-600 font-medium hover:underline mb-4 inline-block">← Back to Home</Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Pass Rate Methodology
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            At StudyBuddy, we value transparency. Unlike competitors who claim "high pass rates" without evidence, 
            we publish our calculation methodology and data sources openly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="p-8 bg-teal-50 rounded-2xl border border-teal-100">
            <div className="text-sm font-bold text-teal-800 uppercase tracking-wider mb-2">Verified Pass Rate</div>
            <div className="text-5xl font-black text-teal-600">92%</div>
            <div className="text-teal-700 mt-2 font-medium">First-Attempt Success</div>
          </div>
          <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Sample Size</div>
            <div className="text-5xl font-black text-slate-700">523</div>
            <div className="text-slate-600 mt-2 font-medium">Verified Students</div>
          </div>
        </div>

        <article className="prose prose-slate prose-lg max-w-none">
          <h2>How We Calculate Success</h2>
          <p>
            Our 92% pass rate statistic is derived from a cohort of 523 students who met the following criteria:
          </p>
          <ul>
            <li>Completed at least 80% of the StudyBuddy TEAS 7 Course.</li>
            <li>Completed all 4 full-length practice exams.</li>
            <li>Reported their official TEAS score within 30 days of exam date.</li>
          </ul>

          <h3>Definition of "Pass"</h3>
          <p>
            Since the ATI TEAS does not have a universal "pass" score, we define a "pass" as achieving the 
            <strong>minimum required score</strong> for the student's specific target nursing program (typically 62% for ADN and 78% for BSN programs).
          </p>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 not-prose rounded-r-xl">
            <h3 className="text-amber-900 font-bold text-lg mb-2">Verification Process</h3>
            <p className="text-amber-800">
              We conduct random audits where students are asked to upload a screenshot of their official ATI score report 
              to verify their self-reported numbers.
            </p>
          </div>
        </article>

        <div className="mt-12 pt-12 border-t border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Ready to join the 92%?</h3>
          <div className="flex gap-4">
            <StartChatButton />
            <Link href="/pricing" className="px-6 py-3 bg-white border-2 border-slate-200 rounded-xl font-bold text-slate-700 hover:border-teal-500 transition-all">
              View Plans
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
