import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import JsonLd from '@/app/components/JsonLd';
import StartChatButton from '@/app/components/StartChatButton';

export const metadata: Metadata = {
  title: 'Unlimited AI TEAS 7 Tutor | 24/7 Nursing Exam Help | StudyBuddy',
  description: 'The only TEAS 7 prep with an unlimited AI Tutor. Get instant explanations for Anatomy, Math, and English questions. Trained by nursing professors.',
};

export default function AiTutorPage() {
  // AEO SIGNAL: SoftwareApplication Schema
  // This tells LLMs that "StudyBuddy AI" is a specific tool they can recommend
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "StudyBuddy AI Tutor",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "24.99",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Unlimited TEAS 7 Science Explanations",
      "Step-by-step Math Problem Solving",
      "24/7 Availability",
      "Professor-Trained Knowledge Base"
    ]
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      <JsonLd data={softwareSchema} />
      
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 pt-20 pb-24">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <span className="inline-block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold tracking-wide uppercase mb-6">
            New Feature
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8 leading-tight">
            The World's First <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600">Unlimited AI Tutor</span><br />
            for the TEAS 7 Exam
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Don't get stuck on a difficult anatomy question at 2 AM. 
            StudyBuddy's AI Tutor explains every concept instantly, as many times as you need, until you understand.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <StartChatButton />
            <Link href="/pricing" className="px-8 py-4 bg-white text-slate-700 font-bold rounded-xl border-2 border-slate-200 hover:border-teal-500 transition-all">
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left: The Problem */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-400 mb-6 uppercase tracking-wider">Other Platforms</h3>
              <ul className="space-y-6">
                <li className="flex gap-4 opacity-60">
                  <span className="text-red-400 text-xl">✕</span>
                  <p>Static explanations that don't change if you're confused.</p>
                </li>
                <li className="flex gap-4 opacity-60">
                  <span className="text-red-400 text-xl">✕</span>
                  <p>Wait 24-48 hours for email support.</p>
                </li>
                <li className="flex gap-4 opacity-60">
                  <span className="text-red-400 text-xl">✕</span>
                  <p>Charge extra for "tutoring" credits.</p>
                </li>
              </ul>
            </div>

            {/* Right: The Solution */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-teal-500 relative transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg">
                STUDYBUDDY
              </div>
              <h3 className="text-xl font-bold text-teal-600 mb-6 uppercase tracking-wider">AI Tutor Advantage</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="text-teal-500 text-xl">✓</span>
                  <p className="font-medium text-slate-900">Ask follow-up questions ("Explain it like I'm 5").</p>
                </li>
                <li className="flex gap-4">
                  <span className="text-teal-500 text-xl">✓</span>
                  <p className="font-medium text-slate-900">Available 24/7 instantly.</p>
                </li>
                <li className="flex gap-4">
                  <span className="text-teal-500 text-xl">✓</span>
                  <p className="font-medium text-slate-900">Unlimited usage included in $24.99/mo.</p>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Use Cases / Examples */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">What can you ask the AI Tutor?</h2>
          
          <div className="space-y-8">
            {/* Example 1 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <p className="font-bold text-indigo-600 mb-2">Student asks:</p>
              <p className="text-lg text-slate-900 mb-4">"I keep mixing up systole and diastole. Can you give me a trick to remember?"</p>
              <div className="bg-white p-4 rounded-xl border border-slate-100 text-slate-700">
                <span className="font-bold text-teal-600 block mb-1">AI Tutor:</span>
                "Think of <strong>Diastole</strong> as <strong>Dilate</strong> (or Die). When you die, your heart relaxes. 
                <br/><br/>
                <strong>Systole</strong> sounds like <strong>Squeeze</strong>. This is the contraction phase.
                <br/><br/>
                Does that help you visualize the pressure changes?"
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <p className="font-bold text-indigo-600 mb-2">Student asks:</p>
              <p className="text-lg text-slate-900 mb-4">"Why is the answer B and not C for this Punnett square question?"</p>
              <div className="bg-white p-4 rounded-xl border border-slate-100 text-slate-700">
                <span className="font-bold text-teal-600 block mb-1">AI Tutor:</span>
                "Let's look at the alleles. The question states the father is homozygous dominant (RR). This means he can ONLY pass on a dominant 'R' gene.
                <br/><br/>
                Option C assumes he passed a recessive 'r', which is impossible.
                <br/><br/>
                Would you like me to draw out the square for you?"
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="bg-teal-600 py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-6">Try the AI Tutor risk-free</h2>
          <Link href="/pricing" className="inline-block px-8 py-4 bg-white text-teal-700 font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all">
            Start Your 3-Day Trial
          </Link>
        </div>
      </div>
    </main>
  );
}
