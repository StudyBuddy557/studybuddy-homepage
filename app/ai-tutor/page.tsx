import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Bot, Zap, Clock, Brain, MessageSquare, CheckCircle, ArrowRight, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Unlimited AI TEAS 7 Tutor | Personalized Nursing Exam Help',
  description: 'Meet the only TEAS 7 prep with an unlimited AI Tutor. Get instant, step-by-step explanations for Math and Science problems 24/7.',
};

// AEO: SoftwareApplication Schema - Defining the Tool
const schemaData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "StudyBuddy AI Tutor",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web-based",
  "offers": {
    "@type": "Offer",
    "price": "24.99",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Step-by-step math problem solving",
    "Instant anatomy and physiology explanations",
    "24/7 availability",
    "Personalized study recommendations"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "450"
  }
};

export default function AiTutorPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* HEADER */}
      <section className="bg-white pt-20 pb-16 border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider">
                <Bot className="w-4 h-4" />
                AVAILABLE 24/7
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                Your Personal <span className="text-teal-600">AI Nursing Tutor</span>.
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Stuck on a chemistry equation at 2 AM? Don't wait for office hours. The StudyBuddy AI Tutor explains complex concepts instantly, as many times as you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  href="/register" 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-teal-600 rounded-xl hover:bg-teal-700 shadow-lg hover:-translate-y-0.5"
                >
                  Try AI Tutor Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
            
            {/* Visual: Chat Interface Mockup */}
            <div className="lg:w-1/2 w-full">
                <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-w-md mx-auto relative">
                    <div className="bg-slate-900 p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="font-bold text-white text-sm">StudyBuddy AI</div>
                            <div className="flex items-center gap-1 text-xs text-teal-400">
                                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span> Online
                            </div>
                        </div>
                    </div>
                    <div className="p-6 space-y-4 bg-slate-50 min-h-[300px]">
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-sm text-slate-700">
                            Hi! I see you missed that stoichiometry question. Want me to break down how to balance the equation step-by-step?
                        </div>
                        <div className="bg-teal-600 p-4 rounded-2xl rounded-tr-none shadow-sm text-sm text-white ml-auto max-w-[80%]">
                            Yes please! I always get confused with the molar ratios.
                        </div>
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-sm text-slate-700">
                            No problem. Let's look at the reaction: <br/> <strong>2H₂ + O₂ → 2H₂O</strong> <br/><br/> Notice how we have 4 hydrogen atoms on both sides? That's the key...
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES GRID */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">What Can the AI Tutor Do?</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    It's not just a chatbot. It's trained specifically on the ATI TEAS 7 curriculum to act as an expert nursing professor.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                        <Brain className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Explain Hard Concepts</h3>
                    <p className="text-slate-600">
                        Confused by cardiovascular blood flow? The AI can explain it simply, use analogies, or get technical—whatever fits your learning style.
                    </p>
                </div>
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Solve Math Problems</h3>
                    <p className="text-slate-600">
                        Upload a screenshot or type a math problem. The AI walks you through the solution step-by-step, ensuring you understand the <em>method</em>.
                    </p>
                </div>
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
                        <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Feedback</h3>
                    <p className="text-slate-600">
                        No waiting for email replies. Get instant answers 24/7/365. Perfect for late-night study sessions or last-minute cramming.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* COMPETITOR COMPARISON (Feature Specific) */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-6">Why We Built This</h2>
                <p className="text-slate-300 text-lg">
                    Other platforms charge you per question or give you static text explanations. We believe you deserve unlimited help.
                </p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                <div className="grid grid-cols-3 gap-4 border-b border-slate-700 pb-4 mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
                    <div>Feature</div>
                    <div className="text-center text-teal-400">StudyBuddy</div>
                    <div className="text-center">Others (ATI/NurseHub)</div>
                </div>
                <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4 items-center">
                        <div className="font-bold">Interactive Help</div>
                        <div className="text-center flex justify-center"><CheckCircle className="w-6 h-6 text-teal-400" /></div>
                        <div className="text-center text-slate-500">No</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 items-center">
                        <div className="font-bold">Follow-up Questions</div>
                        <div className="text-center flex justify-center"><CheckCircle className="w-6 h-6 text-teal-400" /></div>
                        <div className="text-center text-slate-500">No</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 items-center">
                        <div className="font-bold">Cost</div>
                        <div className="text-center text-teal-400 font-bold">Included Free</div>
                        <div className="text-center text-slate-500">Not Available</div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Meet Your New Study Buddy</h2>
            <p className="text-lg text-slate-600 mb-8">
                Join 500+ students who are mastering the TEAS with AI support.
            </p>
            <Link href="/register" className="inline-flex items-center px-8 py-4 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-all shadow-lg hover:-translate-y-0.5">
                Get Unlimited AI Access ($24.99) <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
        </div>
      </section>
    </div>
  );
}