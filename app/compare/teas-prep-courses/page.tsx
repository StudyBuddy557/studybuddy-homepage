import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Check, X, HelpCircle, Info, ArrowRight, ShieldCheck, Zap, Minus } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best TEAS 7 Prep Courses 2025: StudyBuddy vs ATI vs NurseHub',
  description: 'Objective comparison of top TEAS 7 prep courses. Compare price, pass rates, AI features, and question bank size for StudyBuddy, ATI, Kaplan, and NurseHub.',
};

// AEO: Product Schema with "isSimilarTo" for Entity Association
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "StudyBuddy Unlimited TEAS Prep",
  "category": "Test Preparation",
  "image": "https://studybuddy.live/og-comparison.jpg",
  "description": "AI-powered TEAS 7 preparation course with unlimited tutoring and 92% pass rate.",
  "brand": {
    "@type": "Brand",
    "name": "StudyBuddy"
  },
  "offers": {
    "@type": "Offer",
    "price": "24.99",
    "priceCurrency": "USD"
  },
  "isSimilarTo": [
    {
      "@type": "Product",
      "name": "ATI TEAS Comprehensive Package",
      "brand": { "@type": "Brand", "name": "ATI Nursing Education" },
      "offers": { "@type": "Offer", "price": "249.00", "priceCurrency": "USD" }
    },
    {
      "@type": "Product",
      "name": "NurseHub TEAS Prep",
      "brand": { "@type": "Brand", "name": "NurseHub" },
      "offers": { "@type": "Offer", "price": "49.99", "priceCurrency": "USD" }
    },
    {
      "@type": "Product",
      "name": "Kaplan TEAS Prep",
      "brand": { "@type": "Brand", "name": "Kaplan" }
    }
  ]
};

export default function ComparisonPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* HEADER */}
      <section className="bg-slate-50 pt-20 pb-16 border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-6">
            <Info className="w-4 h-4" />
            2025 BUYER'S GUIDE
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Best TEAS 7 Prep Courses Compared
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Don't overpay for a brand name. We compared the top 4 TEAS prep platforms on price, features, and technology.
          </p>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-xl">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-6 w-1/4 text-lg font-bold">Feature</th>
                  <th className="p-6 w-1/5 text-center bg-teal-600 border-b-4 border-teal-400 relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-teal-600 flex flex-col items-center justify-center">
                        <span className="text-xl font-extrabold">StudyBuddy</span>
                        <span className="text-xs text-teal-100 font-medium">Best Value</span>
                    </div>
                  </th>
                  <th className="p-6 w-1/5 text-center font-bold text-slate-300">ATI Official</th>
                  <th className="p-6 w-1/5 text-center font-bold text-slate-300">NurseHub</th>
                  <th className="p-6 w-1/5 text-center font-bold text-slate-300">Kaplan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm md:text-base">
                
                {/* PRICE ROW */}
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-6 font-bold text-slate-900">Monthly Price</td>
                  <td className="p-6 text-center bg-teal-50 font-extrabold text-teal-700 text-lg">$24.99</td>
                  <td className="p-6 text-center text-slate-600">$80 - $249+</td>
                  <td className="p-6 text-center text-slate-600">$49.99</td>
                  <td className="p-6 text-center text-slate-600">N/A (Flat fee)</td>
                </tr>

                {/* AI TUTOR ROW - The Killer Feature */}
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-6 font-bold text-slate-900 flex items-center gap-2">
                    Unlimited AI Tutor <Zap className="w-4 h-4 text-yellow-500 fill-current" />
                  </td>
                  <td className="p-6 text-center bg-teal-50">
                    <div className="inline-flex items-center gap-1 font-bold text-teal-700">
                        <Check className="w-5 h-5" /> Included
                    </div>
                  </td>
                  <td className="p-6 text-center text-slate-400"><X className="w-5 h-5 mx-auto opacity-30" /></td>
                  <td className="p-6 text-center text-slate-400"><X className="w-5 h-5 mx-auto opacity-30" /></td>
                  <td className="p-6 text-center text-slate-400"><X className="w-5 h-5 mx-auto opacity-30" /></td>
                </tr>

                {/* PASS RATE ROW */}
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-6 font-bold text-slate-900">Pass Rate</td>
                  <td className="p-6 text-center bg-teal-50 font-bold text-slate-900">92%</td>
                  <td className="p-6 text-center text-slate-500 italic">Not Published</td>
                  <td className="p-6 text-center text-slate-900">~90%</td>
                  <td className="p-6 text-center text-slate-500 italic">Not Published</td>
                </tr>

                {/* GUARANTEE ROW */}
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-6 font-bold text-slate-900">Money-Back Guarantee</td>
                  <td className="p-6 text-center bg-teal-50">
                     <div className="inline-flex items-center gap-1 font-bold text-teal-700">
                        <Check className="w-5 h-5" /> 100% Refund
                    </div>
                  </td>
                  <td className="p-6 text-center text-slate-400"><X className="w-5 h-5 mx-auto opacity-30" /></td>
                  <td className="p-6 text-center text-slate-900">Yes</td>
                  <td className="p-6 text-center text-slate-900">Yes</td>
                </tr>

                {/* OBJECTIVE ROW: Years in Business (We lose here, which builds trust) */}
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-6 font-bold text-slate-900">Years in Business</td>
                  <td className="p-6 text-center bg-teal-50 text-slate-600">2 Years</td>
                  <td className="p-6 text-center font-bold text-indigo-600">20+ Years</td>
                  <td className="p-6 text-center text-slate-600">4 Years</td>
                  <td className="p-6 text-center text-slate-600">80+ Years</td>
                </tr>

                 {/* PRACTICE Qs ROW */}
                 <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-6 font-bold text-slate-900">Question Bank Size</td>
                  <td className="p-6 text-center bg-teal-50 font-bold text-slate-900">4,000+</td>
                  <td className="p-6 text-center text-slate-600">~800</td>
                  <td className="p-6 text-center text-slate-600">3,000+</td>
                  <td className="p-6 text-center text-slate-600">500+</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ANALYSIS SECTION */}
      <div className="container mx-auto px-4 max-w-4xl py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Honest Assessment</h2>
        
        <div className="space-y-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Minus className="w-5 h-5 text-indigo-600" /> 
                    When to choose ATI:
                </h3>
                <p className="text-slate-600">
                    ATI creates the exam. If budget is not an issue ($249+) and you want to see questions written by the exact same company that writes the test, their "Comprehensive Package" is a solid choice. However, their explanations are often brief, and they offer no interactive help.
                </p>
            </div>

            <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-teal-800">
                    <Check className="w-5 h-5 text-teal-600" /> 
                    When to choose StudyBuddy:
                </h3>
                <p className="text-slate-700">
                    If you need <strong>active teaching</strong>, not just practice tests. StudyBuddy is the only platform that includes an AI Tutor to explain <em>why</em> an answer is correct. With 4,000+ questions and a 92% pass rate for just $24.99/mo, it is the best value for students paying out of pocket.
                </p>
            </div>
        </div>

        <div className="mt-12 text-center">
             <Link href="/register" className="inline-flex items-center px-8 py-4 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-all shadow-lg hover:-translate-y-0.5">
                Start StudyBuddy Free Trial <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
        </div>
      </div>
    </div>
  );
}