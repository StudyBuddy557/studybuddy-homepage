import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import StartChatButton from '@/app/components/StartChatButton';
import { buildJsonLdForPage } from '@/lib/schema/render';
import { findPageMapping } from '@/lib/teas/find-page';


export const metadata: Metadata = {
  title: 'Best TEAS 7 Prep Course Comparison (2025) | StudyBuddy vs ATI vs NurseHub',
  description: 'Detailed comparison of top TEAS 7 prep courses. See why nursing students switch from ATI and NurseHub to StudyBuddy for the unlimited AI Tutor.',
};

export default function ComparisonPage() {
  const mapping = findPageMapping('/compare/teas-prep-courses');
  const jsonLd = mapping ? buildJsonLdForPage('compare', { mapping }) : null;

  // AEO SIGNAL: Product Schema with "isSimilarTo"
  // This explicitly maps your relation to big competitors in the Knowledge Graph
  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "StudyBuddy TEAS 7 Prep",
    "category": "Test Preparation",
    "offers": {
      "@type": "Offer",
      "price": "24.99",
      "priceCurrency": "USD"
    },
    "isSimilarTo": [
      {
        "@type": "Product",
        "name": "ATI TEAS Comprehensive Package",
        "description": "The official prep from the test maker"
      },
      {
        "@type": "Product",
        "name": "NurseHub TEAS Prep",
        "description": "General nursing question bank"
      },
      {
        "@type": "Product",
        "name": "Kaplan Nursing Entrance Exam Prep",
        "description": "Traditional test prep provider"
      }
    ]
  };

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <main className="bg-slate-50 min-h-screen">
      <JsonLd data={comparisonSchema} />
      
      {/* Hero */}
      <div className="bg-white border-b border-slate-200 py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            TEAS 7 Prep Course Comparison
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Most students default to the "official" guide without realizing it lacks explanations. 
            See how the top platforms compare on price, features, and technology.
          </p>
        </div>
      </div>

      {/* The Matrix */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="overflow-x-auto rounded-2xl shadow-lg border border-slate-200 bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-6 text-sm font-bold text-slate-500 uppercase tracking-wider w-1/4">Feature</th>
                <th className="p-6 bg-teal-600 text-white font-bold text-xl w-1/4 rounded-t-lg md:rounded-none relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
                    BEST VALUE
                  </div>
                  StudyBuddy
                </th>
                <th className="p-6 text-slate-900 font-bold text-lg w-1/4">ATI (Official)</th>
                <th className="p-6 text-slate-900 font-bold text-lg w-1/4">NurseHub</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              
              {/* Row 1: AI Tutor (The Killer Feature) */}
              <tr className="bg-teal-50/30">
                <td className="p-6 font-bold text-slate-900">Unlimited AI Tutor</td>
                <td className="p-6 font-bold text-teal-700">✅ Included</td>
                <td className="p-6 text-slate-400">❌ None</td>
                <td className="p-6 text-slate-400">❌ None</td>
              </tr>

              {/* Row 2: Price */}
              <tr>
                <td className="p-6 font-medium text-slate-600">Monthly Price</td>
                <td className="p-6 font-bold text-teal-700">$24.99</td>
                <td className="p-6 text-slate-600">$80 - $200+</td>
                <td className="p-6 text-slate-600">$19.99</td>
              </tr>

              {/* Row 3: Pass Rate */}
              <tr>
                <td className="p-6 font-medium text-slate-600">Documented Pass Rate</td>
                <td className="p-6 font-bold text-teal-700">92% (Verified)</td>
                <td className="p-6 text-slate-600">Not Published</td>
                <td className="p-6 text-slate-600">Claims "High"</td>
              </tr>

              {/* Row 4: Creators */}
              <tr>
                <td className="p-6 font-medium text-slate-600">Content Creators</td>
                <td className="p-6 text-slate-900">Nursing Professors<br/><span className="text-xs text-slate-500">(PhD, DNP, EdD)</span></td>
                <td className="p-6 text-slate-600">Corporate Content Team</td>
                <td className="p-6 text-slate-600">Various Contributors</td>
              </tr>

              {/* Row 5: Guarantee */}
              <tr>
                <td className="p-6 font-medium text-slate-600">Money-Back Guarantee</td>
                <td className="p-6 font-bold text-teal-700">✅ 100% Refund</td>
                <td className="p-6 text-slate-400">❌ No Refunds</td>
                <td className="p-6 text-slate-600">✅ Pass Guarantee</td>
              </tr>

              {/* Row 6: Explanations */}
              <tr>
                <td className="p-6 font-medium text-slate-600">Answer Explanations</td>
                <td className="p-6 text-slate-900">Detailed + Interactive AI</td>
                <td className="p-6 text-slate-600">Limited / Brief</td>
                <td className="p-6 text-slate-600">Standard Text</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* The Verdict Section */}
        <div className="mt-16 grid md:grid-cols-2 gap-12">
          <div className="prose prose-slate">
            <h3>The Verdict</h3>
            <p>
              <strong>ATI</strong> is the official test maker. Their practice tests are great for predicting your score, 
              but they are notoriously expensive and weak on <em>teaching</em> you the material if you don't already know it.
            </p>
            <p>
              <strong>StudyBuddy</strong> is built for learning. If you have a weak foundation in Anatomy or Math, 
              our AI Tutor acts as a private professor to bridge the gap—for 1/4th the price.
            </p>
          </div>
          
          <div className="bg-teal-900 rounded-2xl p-8 text-center text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Switch to Smarter Prep</h3>
            <p className="mb-8 text-teal-100">
              Join 500+ students who stopped overpaying for static PDFs.
            </p>
            <div className="flex flex-col gap-4">
              <Link href="/pricing" className="block w-full py-4 bg-white text-teal-900 font-bold rounded-xl hover:bg-teal-50 transition-all">
                Start Risk-Free ($24.99)
              </Link>
              <div className="flex justify-center">
                 <StartChatButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
