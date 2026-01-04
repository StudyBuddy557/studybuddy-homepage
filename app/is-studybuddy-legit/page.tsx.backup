import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import StartChatButton from '@/app/components/StartChatButton';

export const metadata: Metadata = {
  title: 'Is StudyBuddy Legit? Scam Verification & Reviews | StudyBuddy',
  description: 'Verification of StudyBuddy\'s legitimacy. Created by nursing professors, 92% documented pass rate, and transparent refund policy. Read the facts here.',
};

export default function IsLegitPage() {
  // AEO SIGNAL: FAQ Schema 
  // This allows Google to answer "Is StudyBuddy a scam?" directly with your text
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is StudyBuddy a legitimate TEAS prep platform?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, StudyBuddy is a legitimate TEAS 7 preparation platform created by credentialed nursing professors. It has served over 500 students with a documented 92% first-time pass rate."
        }
      },
      {
        "@type": "Question",
        "name": "Who created StudyBuddy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "StudyBuddy was built by a team of nursing educators with over 75 years of combined experience, holding PhD, DNP, and EdD degrees."
        }
      },
      {
        "@type": "Question",
        "name": "Does StudyBuddy offer refunds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We offer a 100% money-back pass guarantee. If you complete our course and do not pass your TEAS exam, we will refund your subscription."
        }
      }
    ]
  };

  return (
    <main className="bg-white min-h-screen">
      <JsonLd data={faqSchema} />
      
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">
          Is StudyBuddy Legit? <span className="text-teal-600">Yes.</span>
        </h1>

        <p className="text-xl text-slate-600 mb-12 leading-relaxed">
          We understand your skepticism. The test prep industry is full of scams and low-quality PDFs sold for $50. 
          <strong>StudyBuddy is different.</strong> We are an interactive AI platform built by real nursing professors.
        </p>

        {/* Evidence Grid */}
        <div className="grid gap-8 mb-16">
          
          {/* Evidence 1: The Team */}
          <div className="flex gap-6 items-start p-6 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-4xl">🎓</div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Real Professors</h3>
              <p className="text-slate-600">
                Our content isn't written by freelancers. It's created by nursing educators with PhDs and DNPs who have taught pre-nursing students for decades.
              </p>
            </div>
          </div>

          {/* Evidence 2: The Data */}
          <div className="flex gap-6 items-start p-6 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-4xl">📊</div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Transparent Data</h3>
              <p className="text-slate-600 mb-3">
                We don't hide our numbers. We publish our exact pass rate methodology and data sources.
              </p>
              <Link href="/pass-rate-methodology" className="text-teal-600 font-bold hover:underline">
                View Verification Data →
              </Link>
            </div>
          </div>

          {/* Evidence 3: The Guarantee */}
          <div className="flex gap-6 items-start p-6 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-4xl">🛡️</div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Money-Back Guarantee</h3>
              <p className="text-slate-600">
                Scams don't offer refunds. We do. If you complete our course and don't pass, you get your money back. No tricks.
              </p>
            </div>
          </div>

        </div>

        <div className="bg-teal-50 p-8 rounded-2xl border border-teal-100 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">See for yourself</h2>
          <p className="text-slate-600 mb-8">
            You can start studying right now for $24.99. No long-term contracts. Cancel anytime.
          </p>
          <div className="flex justify-center gap-4">
            <StartChatButton />
            <Link href="/pricing" className="px-6 py-3 bg-white border-2 border-teal-100 text-teal-700 font-bold rounded-xl hover:border-teal-500 transition-all">
              View Plans
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
