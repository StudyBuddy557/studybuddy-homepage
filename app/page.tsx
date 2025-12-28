'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { 
  Check, 
  MessageSquare, 
  Calculator, 
  Zap, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight, 
  ChevronDown, 
  Users, 
  Award, 
  MapPin,
  Star,
  Brain,
  Sparkles
} from 'lucide-react';

// NOTE: Ensure these components exist or comment them out if they don't yet!
import { ComparisonTable } from '@/components/ComparisonTable'; 
const FAQ = dynamic(() => import('@/components/marketing/FAQ'), { ssr: false });

// --- LINKS CONFIGURATION ---
const LINKS = {
  DIAGNOSTIC: '/diagnostic',
  CHECKOUT: '/register', 
  REFUND_POLICY: '/refunds',
};

// --- US STATES DATA ---
const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

// --- AEO SCHEMA DATA ---
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://studybuddy.live/#organization",
      "name": "StudyBuddy",
      "url": "https://www.studybuddy.live",
      "logo": "https://www.studybuddy.live/logo.png",
      "description": "AI-powered TEAS 7 test preparation platform built by nursing professors.",
      "knowsAbout": ["TEAS 7 Exam", "ATI TEAS", "Nursing School Admissions", "Pre-Nursing Test Prep"],
      "sameAs": [
        "https://www.facebook.com/studybuddylive",
        "https://twitter.com/studybuddylive"
      ]
    },
    {
      "@type": "Product",
      "name": "StudyBuddy Unlimited TEAS Prep",
      "description": "Comprehensive TEAS 7 preparation course with unlimited AI tutoring, 4,000+ practice questions, and professor-led video lectures.",
      "offers": {
        "@type": "Offer",
        "price": "24.99",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://studybuddy.live/pricing"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "523"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does StudyBuddy cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "StudyBuddy costs $24.99 per month, or you can save money with our 3-month plan for $59. Both plans include unlimited access to the AI Tutor and all study materials."
          }
        },
        {
          "@type": "Question",
          "name": "Is StudyBuddy good for the TEAS 7?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. StudyBuddy is specifically built for the ATI TEAS 7 exam by nursing professors. It features a 92% first-time pass rate based on over 500 student results."
          }
        }
      ]
    }
  ]
};

// --- COMPONENT: Fade In Animations ---
function FadeInSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function SalesBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTrigger, setShowTrigger] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setShowTrigger(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!showTrigger) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4 font-sans">
      {isOpen && (
        <div className="w-[calc(100vw-48px)] sm:w-[400px] overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 animate-in slide-in-from-bottom-10 fade-in duration-300 origin-bottom-right">
          <div className="flex items-center gap-4 bg-gradient-to-r from-[#20B2AA] to-[#18968F] p-5 text-white">
            <div className="relative shrink-0">
              <div className="h-12 w-12 rounded-full border-2 border-white/30 bg-white flex items-center justify-center text-teal-600">
                <Brain className="w-8 h-8" />
              </div>
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#18968F] bg-[#10B981]"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-lg leading-tight">StudyBuddy AI</div>
              <div className="text-xs font-medium text-blue-50 opacity-90">TEAS 7 Tutor • Online</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="shrink-0 p-2 opacity-80 hover:bg-white/10 rounded-full hover:opacity-100 transition-all"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="bg-[#F8FAFC] p-5">
            <div className="mb-5 rounded-2xl rounded-tl-none border border-slate-200 bg-white p-4 text-[15px] leading-relaxed text-slate-700 shadow-sm">
              <span className="block font-bold text-[#20B2AA] text-xs mb-1 uppercase tracking-wider">AI Tutor</span>
              Hi! 👋 Preparing for the TEAS 7? I can help you find your weak spots instantly.
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push(LINKS.DIAGNOSTIC)}
                className="w-full rounded-xl bg-[#20B2AA] px-6 py-4 font-bold text-white shadow-md hover:bg-[#18968F] transition-all text-left flex items-center justify-between group"
              >
                <span>Take Free Diagnostic</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const pricingSection = document.getElementById('pricing');
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                  setIsOpen(false);
                }}
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-6 py-4 font-bold text-slate-700 hover:border-[#20B2AA] hover:bg-slate-50 transition-all text-left"
              >
                See Study Plans
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex h-16 w-16 items-center justify-center rounded-full bg-[#20B2AA] text-white shadow-2xl hover:bg-[#18968F] hover:scale-110 transition-all"
        aria-label="Chat with AI Tutor"
      >
        <MessageSquare className="h-7 w-7" />
      </button>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [selectedState, setSelectedState] = useState('');

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
  };

  const handleGo = () => {
    if (selectedState) {
      const slug = selectedState.toLowerCase().replace(/\s+/g, '-');
      router.push(`/states/${slug}`);
    }
  };

  return (
    <main className="min-h-screen bg-white font-sans text-[#1A1A1A] selection:bg-[#E0F2FE] selection:text-[#0369A1]">
      <Script id="org-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SalesBot />

      {/* --- HERO SECTION --- */}
      <FadeInSection>
        <section className="relative bg-gradient-to-b from-slate-50 to-white pt-20 pb-16 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#20B2AA]/5 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 max-w-6xl text-center">
            <div className="inline-flex items-center gap-2 bg-[#20B2AA]/10 text-[#20B2AA] px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-6">
              <Star className="w-4 h-4 fill-current" />
              92% FIRST-TIME PASS RATE
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              Pass the TEAS 7.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20B2AA] to-[#18968F]">
                Get Into Nursing School.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Join 500+ students using the only unlimited AI Tutor and professor-designed curriculum to master the TEAS 7 exam.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href={LINKS.DIAGNOSTIC}
                className="px-8 py-4 rounded-xl bg-[#20B2AA] text-white font-bold text-lg hover:bg-[#18968F] hover:shadow-lg hover:-translate-y-1 transition-all flex items-center gap-2 shadow-xl shadow-[#20B2AA]/30"
              >
                Take Free Diagnostic <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                onClick={() => {
                  const pricingSection = document.getElementById('pricing');
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="px-8 py-4 rounded-xl bg-white border-2 border-slate-200 text-slate-700 font-bold text-lg hover:border-[#20B2AA] hover:bg-slate-50 transition-all"
              >
                View Study Plans
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm font-medium text-slate-500">
                <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-teal-500" />
                    <span>$24.99/month</span>
                </div>
                <div className="hidden md:block w-1 h-1 bg-slate-300 rounded-full"></div>
                <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-teal-500" />
                    <span>Cancel anytime</span>
                </div>
                <div className="hidden md:block w-1 h-1 bg-slate-300 rounded-full"></div>
                <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-teal-500" />
                    <span>Money-back guarantee</span>
                </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* --- FREE STUDY TOOLS --- */}
      <FadeInSection>
        <section className="py-16 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-4">
                <BookOpen className="w-4 h-4" />
                FREE STUDY RESOURCES
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Start Studying for Free</h2>
              <p className="text-slate-600 mt-2">No credit card required. Try our tools right now.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Tool 1: Diagnostic */}
              <Link
                href={LINKS.DIAGNOSTIC}
                className="group p-6 rounded-2xl border border-slate-200 hover:border-teal-200 hover:shadow-lg transition-all flex flex-col items-start"
              >
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mb-4">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-teal-600 transition-colors mb-2">
                  TEAS Diagnostic
                </h3>
                <p className="text-sm text-slate-500">Identify your weak spots in 15 minutes. Get a personalized study plan.</p>
                <span className="mt-4 text-teal-600 font-semibold flex items-center">
                  Take Test <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              {/* Tool 2: Study Guides */}
              <Link
                href="/wiki"
                className="group p-6 rounded-2xl border border-slate-200 hover:border-teal-200 hover:shadow-lg transition-all flex flex-col items-start"
              >
                <div className="p-3 rounded-lg bg-purple-100 text-purple-600 mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-teal-600 transition-colors mb-2">
                  Study Guides
                </h3>
                <p className="text-sm text-slate-500">Comprehensive reviews of every TEAS 7 topic. Science, Math, English, Reading.</p>
                <span className="mt-4 text-teal-600 font-semibold flex items-center">
                  Browse Guides <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              {/* Tool 3: School Requirements */}
              <Link
                href="/schools"
                className="group p-6 rounded-2xl border border-slate-200 hover:border-teal-200 hover:shadow-lg transition-all flex flex-col items-start"
              >
                <div className="p-3 rounded-lg bg-green-100 text-green-600 mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-teal-600 transition-colors mb-2">
                  School Requirements
                </h3>
                <p className="text-sm text-slate-500">See TEAS score requirements for 1,500+ nursing programs nationwide.</p>
                <span className="mt-4 text-teal-600 font-semibold flex items-center">
                  Find Schools <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* --- STATE REQUIREMENTS SELECTOR --- */}
      <FadeInSection>
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-6">
              <MapPin className="w-4 h-4" />
              STATE-SPECIFIC REQUIREMENTS
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              What TEAS Score Do You Need?
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg text-slate-600">
              We've mapped the TEAS 7 requirements for every nursing program in the country. Select your state to see exactly what you need to score.
            </p>

            <div className="mx-auto max-w-2xl bg-white p-2 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <select
                    className="h-16 w-full cursor-pointer appearance-none rounded-xl border-2 border-transparent bg-slate-50 pl-6 pr-12 text-lg font-bold text-[#1A1A1A] transition-all hover:bg-slate-100 focus:border-[#20B2AA] focus:bg-white focus:outline-none focus:ring-0"
                    value={selectedState}
                    onChange={handleStateChange}
                  >
                    <option value="" disabled>Select your state...</option>
                    {states.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 pointer-events-none" />
                </div>
                <button
                  onClick={handleGo}
                  disabled={!selectedState}
                  className="h-16 min-w-[180px] rounded-xl bg-[#20B2AA] px-8 text-lg font-bold text-white shadow-md transition-all hover:bg-[#18968F] hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  View Guide
                </button>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* --- WHY STUDYBUDDY WORKS (EXPERTISE) --- */}
      <FadeInSection>
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-6">
                <BookOpen className="w-4 h-4" />
                75+ YEARS COMBINED EXPERTISE
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Expert-Crafted Content.<br/>
                <span className="text-[#20B2AA]">AI-Powered Delivery.</span>
              </h2>
              <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto">
                Our curriculum is designed by PhD and DNP nursing educators with 75+ years of combined teaching experience. The AI just delivers it smarter.
              </p>
            </div>

            <div className="grid gap-8">
              {/* TOP CARD: PhD CURRICULUM */}
              <div className="bg-gradient-to-br from-indigo-50 to-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-indigo-100 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-6">
                      <Award className="w-4 h-4" />
                      EXPERT-DESIGNED CURRICULUM
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                      Built by PhD & DNP Educators.<br/>
                      <span className="text-indigo-600">Not Content Farms.</span>
                    </h3>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                          <span className="text-lg font-bold text-indigo-600">PhD</span>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">Infectious Diseases & Immunology</p>
                          <p className="text-sm text-slate-600">25+ years teaching pre-nursing science</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                          <span className="text-lg font-bold text-indigo-600">DNP</span>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">Clinical Nursing Practice</p>
                          <p className="text-sm text-slate-600">20+ years NCLEX & TEAS test prep expertise</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-200/30 to-blue-50 rounded-full blur-2xl"></div>
                    <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 mb-4">
                          <BookOpen className="w-10 h-10 text-indigo-600" />
                        </div>
                        <h4 className="text-2xl font-bold text-slate-900 mb-2">92% Pass Rate</h4>
                        <p className="text-slate-600">Built on decades of teaching excellence</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm font-medium text-slate-700">Curriculum Quality</span>
                          <span className="text-sm font-bold text-indigo-600">Expert-Vetted</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm font-medium text-slate-700">Content Accuracy</span>
                          <span className="text-sm font-bold text-indigo-600">PhD-Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM ROW */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Card 2: AI Tutor */}
                <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-lg border border-slate-200 flex flex-col items-start h-full hover:-translate-y-1 transition-transform duration-300">
                  <div className="bg-[#20B2AA]/10 text-[#20B2AA] p-3.5 rounded-2xl mb-6">
                    <Zap className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">AI Delivers It Smarter</h3>
                  <p className="text-slate-500 leading-relaxed mb-6">
                    Our PhD-designed curriculum is delivered through an AI tutor that adapts to your learning style, identifies weak spots instantly, and explains concepts 24/7.
                  </p>
                  <a href={LINKS.CHECKOUT} className="mt-auto inline-flex items-center text-[#20B2AA] font-bold hover:gap-3 transition-all group">
                    Try the AI Tutor <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* Card 3: Pass Guarantee */}
                <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-lg border border-slate-200 flex flex-col items-start h-full hover:-translate-y-1 transition-transform duration-300">
                  <div className="bg-orange-50 text-orange-500 p-3.5 rounded-2xl mb-6">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Backed by Results</h3>
                  <p className="text-slate-500 leading-relaxed mb-6">
                    92% of our students pass on their first attempt. We're so confident in our expert-designed system that we back it with a 100% pass guarantee.
                  </p>
                  <Link href={LINKS.REFUND_POLICY} className="text-xs text-slate-400 mt-auto underline hover:text-slate-600">
                    View complete refund policy →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* --- BROWSE BY STATE + WIKI CATEGORIES --- */}
      <FadeInSection>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* Left: Browse States */}
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-4">
                  <MapPin className="w-4 h-4" />
                  STATE-BY-STATE REQUIREMENTS
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Find Nursing Programs by State</h2>
                <p className="text-lg text-slate-600 mb-8">
                  Every state has different TEAS score requirements. Select your state to see what schools near you require for admission.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { name: 'California', slug: 'california', count: '150+' },
                    { name: 'Texas', slug: 'texas', count: '120+' },
                    { name: 'New York', slug: 'new-york', count: '90+' },
                    { name: 'Florida', slug: 'florida', count: '85+' },
                    { name: 'Pennsylvania', slug: 'pennsylvania', count: '75+' },
                    { name: 'Ohio', slug: 'ohio', count: '65+' },
                  ].map((state) => (
                    <Link
                      key={state.slug}
                      href={`/states/${state.slug}`}
                      className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition-all group"
                    >
                      <span className="font-semibold text-slate-700 group-hover:text-blue-800 transition-colors">
                        {state.name}
                      </span>
                      <span className="text-xs text-slate-400 bg-white px-2 py-1 rounded shadow-sm font-medium">
                        {state.count}
                      </span>
                    </Link>
                  ))}
                </div>

                <Link
                  href="/states"
                  className="inline-flex items-center text-blue-600 font-bold border-b-2 border-blue-100 hover:border-blue-600 transition-all pb-1"
                >
                  View all 50 states
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>

              {/* Right: TEAS Wiki Categories */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-500 rounded-full opacity-20 blur-3xl"></div>

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-teal-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-6">
                    <BookOpen className="w-4 h-4" />
                    FREE STUDY CONTENT
                  </div>
                  <h3 className="text-3xl font-bold mb-3">TEAS 7 Subject Guides</h3>
                  <p className="text-slate-300 mb-8">Comprehensive reviews for every section of the exam.</p>

                  <div className="space-y-4">
                    {[
                      { title: 'Science', desc: 'A&P, Biology, Chemistry, Physics', href: '/wiki/science', icon: '🔬' },
                      { title: 'Math', desc: 'Algebra, Measurement, Data Analysis', href: '/wiki/math', icon: '📐' },
                      { title: 'English', desc: 'Grammar, Punctuation, Spelling', href: '/wiki/english', icon: '✍️' },
                      { title: 'Reading', desc: 'Key Ideas, Craft & Structure', href: '/wiki/reading', icon: '📖' },
                    ].map((cat) => (
                      <Link
                        key={cat.title}
                        href={cat.href}
                        className="block p-5 rounded-xl bg-white/5 hover:bg-white/15 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all group"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">{cat.icon}</span>
                            <div>
                              <span className="font-bold text-lg block mb-1">{cat.title}</span>
                              <p className="text-sm text-slate-300">{cat.desc}</p>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-teal-300 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* --- PRICING SECTION --- */}
      <FadeInSection>
        <section id="pricing" className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-6">
                <Zap className="w-4 h-4" />
                SIMPLE PRICING
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Choose Your Study Plan
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-12">
                All plans include our 92% pass rate guarantee and unlimited AI Tutor access.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              
              {/* MONTHLY PLAN */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 flex flex-col hover:-translate-y-1 transition-transform duration-300">
                <div className="mb-6">
                   <h3 className="text-xl font-bold text-slate-900 mb-2">Monthly</h3>
                   <p className="text-slate-500 text-sm">Flexible. Cancel anytime.</p>
                </div>
                <div className="mb-6">
                   <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-slate-900">$24.99</span>
                      <span className="text-slate-500 font-medium">/month</span>
                   </div>
                </div>
                <ul className="space-y-4 mb-10 text-left flex-grow">
                   <li className="flex items-center gap-3">
                     <Check className="w-5 h-5 text-teal-600 shrink-0" />
                     <span className="text-slate-700">Unlimited AI Tutor</span>
                   </li>
                   <li className="flex items-center gap-3">
                     <Check className="w-5 h-5 text-teal-600 shrink-0" />
                     <span className="text-slate-700">4,000+ Questions</span>
                   </li>
                   <li className="flex items-center gap-3">
                     <Check className="w-5 h-5 text-teal-600 shrink-0" />
                     <span className="text-slate-700">350+ Video Lectures</span>
                   </li>
                   <li className="flex items-center gap-3">
                     <Check className="w-5 h-5 text-teal-600 shrink-0" />
                     <span className="text-slate-700">Pass Guarantee</span>
                   </li>
                </ul>
                <a
                   href={LINKS.CHECKOUT}
                   className="block w-full py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-lg text-center hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition-all"
                 >
                   Select Monthly
                 </a>
              </div>

              {/* QUARTERLY PLAN - HIGHLIGHTED */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-teal-500 flex flex-col relative overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                 <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                   SAVE 20%
                 </div>
                 <div className="mb-6">
                    <h3 className="text-xl font-bold text-teal-700 mb-2 flex items-center gap-2">
                       3-Month Pass <Sparkles className="w-4 h-4 fill-current" />
                    </h3>
                    <p className="text-slate-500 text-sm">Best value for full preparation.</p>
                 </div>
                 <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                       <span className="text-4xl font-extrabold text-slate-900">$59</span>
                       <span className="text-slate-500 font-medium">/3 months</span>
                    </div>
                    <p className="text-teal-600 text-sm font-bold mt-2">Like paying $19.66/mo</p>
                 </div>
                 <ul className="space-y-4 mb-10 text-left flex-grow">
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-teal-600" />
                      </div>
                      <span className="text-slate-900 font-medium">Everything in Monthly</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-teal-600" />
                      </div>
                      <span className="text-slate-900 font-medium">Extended Access</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-teal-600" />
                      </div>
                      <span className="text-slate-900 font-medium">Priority Support</span>
                    </li>
                 </ul>
                 <a
                    href={LINKS.CHECKOUT}
                    className="block w-full py-4 rounded-xl bg-teal-600 text-white font-bold text-lg text-center hover:bg-teal-700 hover:shadow-lg transition-all shadow-teal-200"
                  >
                    Get 3-Month Access
                  </a>
              </div>

            </div>
            
            <p className="text-center text-slate-400 text-sm mt-8">
               Both plans include our 100% money-back guarantee. No hidden fees.
            </p>
          </div>
        </section>
      </FadeInSection>

      {/* --- COMPARISON TABLE --- */}
      <FadeInSection>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">How We Compare</h2>
              <p className="text-slate-600">See why students choose StudyBuddy over other TEAS prep options.</p>
            </div>
            {/* If ComparisonTable doesn't exist yet, this will error. Ensure the component exists! */}
            <ComparisonTable />
          </div>
        </section>
      </FadeInSection>

      {/* --- SOCIAL PROOF / STATS --- */}
      <FadeInSection>
        <section className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-12">Why Nursing Students Trust StudyBuddy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-2xl shadow-sm">
                <div className="text-4xl font-extrabold text-teal-600 mb-2">92%</div>
                <p className="font-medium text-slate-700">Pass Rate</p>
                <p className="text-sm text-slate-500 mt-2">Our students pass their TEAS on the first try.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm">
                <div className="text-4xl font-extrabold text-teal-600 mb-2">500+</div>
                <p className="font-medium text-slate-700">Active Students</p>
                <p className="text-sm text-slate-500 mt-2">Join a growing community of future nurses.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm">
                <div className="text-4xl font-extrabold text-teal-600 mb-2">75+</div>
                <p className="font-medium text-slate-700">Years Experience</p>
                <p className="text-sm text-slate-500 mt-2">Curriculum built by PhD & DNP educators.</p>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* --- FAQ SECTION --- */}
      <FadeInSection>
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-600">Everything you need to know about TEAS prep with StudyBuddy.</p>
            </div>
            <FAQ />
          </div>
        </section>
      </FadeInSection>

      {/* --- FINAL CTA --- */}
      <FadeInSection>
        {/* Corrected: High contrast TEAS Brand Color (Teal-600) with White Text */}
        <section className="py-24 bg-teal-600 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-white">
              Ready to Pass the TEAS?
            </h2>
            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Join 500+ students who've used StudyBuddy to get into nursing school. Start with our free diagnostic test.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={LINKS.DIAGNOSTIC}
                className="px-8 py-4 rounded-xl bg-white text-teal-700 font-bold text-lg hover:bg-teal-50 transition-all flex items-center justify-center gap-2 shadow-xl"
              >
                Take Free Diagnostic <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                onClick={() => {
                  const pricingSection = document.getElementById('pricing');
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="px-8 py-4 rounded-xl bg-teal-700 border border-teal-500 text-white font-bold text-lg hover:bg-teal-800 transition-all"
              >
                View Pricing
              </button>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-white py-16 border-t border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="text-2xl font-bold text-[#20B2AA] mb-4">StudyBuddy</div>
              <p className="text-slate-400 text-sm mb-4">
                AI-powered TEAS 7 test prep with expert-designed curriculum. 92% pass rate guarantee.
              </p>
            </div>

            {/* Product & Resources */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">Product</h4>
              <ul className="space-y-3">
                <li>
                  <a href={LINKS.DIAGNOSTIC} className="text-slate-400 hover:text-[#20B2AA] transition-colors text-sm">
                    Free Diagnostic Test
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const pricingSection = document.getElementById('pricing');
                      if (pricingSection) {
                        pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="text-slate-400 hover:text-[#20B2AA] transition-colors text-sm text-left"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <a href="/schools" className="text-slate-400 hover:text-[#20B2AA] transition-colors text-sm">
                    Nursing Schools
                  </a>
                </li>
                <li>
                  <a href="/states" className="text-slate-400 hover:text-[#20B2AA] transition-colors text-sm">
                    State Requirements
                  </a>
                </li>
                <li>
                  <a href="/wiki" className="text-slate-400 hover:text-[#20B2AA] transition-colors text-sm">
                    Study Guides
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/privacy" className="text-slate-400 hover:text-[#20B2AA] transition-colors text-sm">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-slate-400 hover:text-[#20B2AA] transition-colors text-sm">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <Link href={LINKS.REFUND_POLICY} className="text-slate-400 hover:text-[#20B2AA] transition-colors text-sm">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">Support</h4>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:support@studybuddy.live" className="text-slate-400 hover:text-[#20B2AA] transition-colors text-sm">
                    support@studybuddy.live
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-slate-400 hover:text-[#20B2AA] transition-colors text-sm">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} StudyBuddy. All rights reserved.
            </p>
            <p className="text-slate-500 text-xs">
              TEAS is a registered trademark of ATI Nursing Education. StudyBuddy is not affiliated with ATI.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}