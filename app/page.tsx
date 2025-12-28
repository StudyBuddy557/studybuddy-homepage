'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ComparisonTable } from '@/components/ComparisonTable';
import { Check, MessageSquare, Calculator, Zap, BookOpen, ShieldCheck, ArrowRight, ChevronDown } from 'lucide-react';

const FAQ = dynamic(() => import('@/components/marketing/FAQ'));

// --- UPDATED LINKS CONFIGURATION ---
const LINKS = {
  DIAGNOSTIC: '/diagnostic',
  CHECKOUT_BASIC: 'https://buy.stripe.com/eVq7sKbtn7IR5ma5jhcjS05',
  CHECKOUT_PRO: 'https://buy.stripe.com/bJe8wO6930gpdSG275cjS04',
  REFUND_POLICY: '/refunds',
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
              <img
                src="/StudyBuddy_AI_tutor_Avatar.png"
                className="h-12 w-12 rounded-full border-2 border-white/30 bg-white object-cover"
                alt="AI Tutor"
              />
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#18968F] bg-[#10B981]"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-lg leading-tight">StudyBuddy</div>
              <div className="text-xs font-medium text-blue-50 opacity-90">TEAS 7 Expert • Online</div>
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
              Hi! 👋 Preparing for the TEAS 7? I can help you find your weak spots or check if you're ready.
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push(LINKS.DIAGNOSTIC)}
                className="group flex w-full items-center justify-between rounded-xl bg-[#20B2AA] px-5 py-4 text-left font-bold text-white shadow-md transition-all hover:bg-[#18968F] hover:shadow-lg hover:-translate-y-0.5"
              >
                Start Free Diagnostic
                <span className="text-white/80 group-hover:translate-x-1 transition-transform">→</span>
              </button>

              <button
                onClick={() => {
                  const pricingSection = document.getElementById('pricing');
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                  setIsOpen(false);
                }}
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-5 py-3.5 text-center font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300"
              >
                View Pricing
              </button>
            </div>
          </div>

          <div className="border-t border-slate-100 bg-white p-3 text-center">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <ShieldCheck className="w-3 h-3 text-[#F59E0B]" />
              100% Pass Guarantee*
            </span>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] ring-1 ring-slate-900/5 transition-all hover:scale-110 hover:shadow-[0_8px_40px_rgba(32,178,170,0.3)]"
          aria-label="Open chat"
        >
          <img src="/StudyBuddy_AI_tutor_Avatar.png" alt="Chat" className="h-full w-full rounded-full object-cover" />
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#F59E0B] text-[10px] font-bold text-white ring-2 ring-white animate-bounce">
            1
          </span>
        </button>
      )}
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [selectedState, setSelectedState] = useState('');

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedState(e.target.value);
  const handleGo = () => {
    if (selectedState) router.push(`/states/${selectedState.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida',
    'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
    'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska',
    'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
  ];

  // --- AEO UPGRADE: OnlineBusiness Schema ---
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'OnlineBusiness',
    name: 'StudyBuddy',
    alternateName: 'StudyBuddy TEAS Prep',
    url: 'https://studybuddy.live',
    logo: 'https://studybuddy.live/logo.png',
    description: 'AI-powered TEAS 7 test preparation platform built by nursing professors. Features unlimited AI tutoring, 4,000+ practice questions, and a 92% pass rate.',
    knowsAbout: [
      'TEAS 7 Exam',
      'ATI TEAS',
      'Nursing School Admissions',
      'Pre-Nursing Test Prep',
      'Human Anatomy & Physiology'
    ],
    priceRange: '$24.99 - $59.00',
    offers: {
      '@type': 'Offer',
      price: '24.99',
      priceCurrency: 'USD',
      availability: 'https://schema.org/OnlineOnly',
      description: 'Monthly unlimited AI tutoring and TEAS 7 prep course'
    },
    member: {
      '@type': 'Organization',
      name: '500+ Enrolled Nursing Students'
    }
  };

  return (
    <main className="min-h-screen bg-white font-sans text-[#1A1A1A] selection:bg-[#E0F2FE] selection:text-[#0369A1]">
      {/* Schema Injection */}
      <Script id="org-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <SalesBot />

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#20B2AA]/10 rounded-full blur-[120px] mix-blend-multiply animate-pulse"></div>
          <div
            className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#1E3A8A]/10 rounded-full blur-[120px] mix-blend-multiply animate-pulse"
            style={{ animationDelay: '1000ms' }}
          ></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] opacity-30"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* AEO OPTIMIZED LEFT COLUMN */}
            <div className="text-center lg:text-left z-10 order-2 lg:order-1">
              
              <div className="inline-flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#20B2AA]/20 bg-[#20B2AA]/5 px-4 py-1.5 backdrop-blur-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#20B2AA] opacity-75"></span>
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#20B2AA]"></span>
                  </span>
                  <span className="text-xs font-bold tracking-widest text-[#1E3A8A] uppercase">Updated for TEAS 7 (2025-2026)</span>
                </div>
                {/* Social Proof Injection */}
                <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                   <div className="flex -space-x-2">
                     {[1,2,3].map(i => <div key={i} className="h-5 w-5 rounded-full bg-slate-200 border border-white"></div>)}
                   </div>
                   <span className="text-[10px] font-bold text-slate-600">500+ Students Enrolled</span>
                 </div>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.02em] text-[#1A1A1A] leading-[1.05] mb-6">
                Pass the TEAS 7.
                <span className="block mt-2 bg-gradient-to-r from-[#20B2AA] to-[#1E3A8A] bg-clip-text text-transparent">
                  92% Pass Rate.
                </span>
              </h1>

              {/* AEO FACT STACK: Extractable lists for LLMs */}
              <ul className="flex flex-col gap-2 text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
                <li className="flex items-center gap-2 justify-center lg:justify-start">
                   <Check className="w-5 h-5 text-[#20B2AA]" /> 
                   <span><strong>Unlimited AI Tutor</strong> – Ask anything, 24/7.</span>
                </li>
                <li className="flex items-center gap-2 justify-center lg:justify-start">
                   <Check className="w-5 h-5 text-[#20B2AA]" /> 
                   <span><strong>4,000+ Questions</strong> & 350+ Video Lectures.</span>
                </li>
                <li className="flex items-center gap-2 justify-center lg:justify-start">
                   <Check className="w-5 h-5 text-[#20B2AA]" /> 
                   <span>Created by Professors with <strong>75+ Years Experience</strong>.</span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => router.push(LINKS.DIAGNOSTIC)}
                  className="h-auto min-h-[56px] px-8 py-3.5 rounded-2xl bg-[#20B2AA] text-white font-bold shadow-[0_10px_40px_-10px_rgba(32,178,170,0.5)] hover:bg-[#18968F] hover:shadow-[0_20px_60px_-10px_rgba(32,178,170,0.7)] hover:scale-105 transition-all duration-300 active:scale-95 w-full sm:w-auto flex flex-col items-center gap-1"
                >
                  <span className="text-lg">Take Free 5-Min Diagnostic →</span>
                  <span className="text-xs opacity-90">Get your personalized TEAS study plan</span>
                </button>
                <button
                  onClick={() => {
                    const pricingSection = document.getElementById('pricing');
                    if (pricingSection) {
                      pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="h-auto min-h-[56px] flex items-center justify-center px-8 py-3.5 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-slate-200 text-slate-700 font-bold hover:border-[#20B2AA] hover:bg-white transition-all w-full sm:w-auto"
                >
                  Plans from $24.99/mo
                </button>
              </div>

              <p className="text-xs text-slate-500 mt-6 max-w-xl mx-auto lg:mx-0">
                *100% Pass Guarantee: Complete the course and don't pass? Full refund or 60 free days. <Link href={LINKS.REFUND_POLICY} className="underline hover:text-slate-600">View refund policy</Link>
              </p>
            </div>

            <div className="order-1 lg:order-2 w-full max-w-[650px] mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#20B2AA] to-[#1E3A8A] rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>

              <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 shadow-2xl ring-1 ring-white/10 backdrop-blur-sm">
                <video controls playsInline preload="metadata" className="w-full h-auto aspect-video object-cover" poster="/ai-tutor-thumbnail.jpg">
                  <source src="/ai-tutor.mp4" type="video/mp4" />
                </video>

                <div className="absolute top-6 left-6 flex items-center gap-3 rounded-xl bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-lg border border-white/20 ring-1 ring-black/5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                  <div className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">AI Tutor Online</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- GEO QUICK FACTS SECTION --- */}
      <FadeInSection>
        <section className="py-20 bg-gradient-to-b from-white to-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A] tracking-tight mb-3">What is StudyBuddy?</h2>
              <p className="text-lg text-slate-600">Quick answers to help you decide if this is right for you</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Who It's For", desc: "Pre-nursing & Allied Health Students", icon: <Check className="w-6 h-6 text-[#20B2AA]"/> },
                { title: "Core Benefit", desc: "AI tutor fixes weak spots instantly", icon: <Zap className="w-6 h-6 text-[#1E3A8A]"/> },
                { title: "Guarantee", desc: "100% Pass Guarantee* or full refund", icon: <ShieldCheck className="w-6 h-6 text-[#F59E0B]"/> },
                { title: "Study Time", desc: "Most students pass in 4–8 weeks", icon: <BookOpen className="w-6 h-6 text-[#20B2AA]"/> }
              ].map((card, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:border-[#20B2AA] transition-all duration-300">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {card.icon}
                    </div>
                    <h3 className="font-bold text-[#1A1A1A] mb-2">{card.title}</h3>
                    <p className="text-sm text-slate-600">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* --- TRUST MARQUEE --- */}
      <section className="border-y border-slate-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="mb-8 text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Trusted by Students at Top Programs</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-40 transition-all duration-500 hover:opacity-60">
            {['UT Austin', 'Texas A&M', 'UT Arlington', 'Texas Tech'].map((name) => (
              <span key={name} className="text-xl md:text-2xl font-bold font-serif text-slate-700">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- COMPETITOR COMPARISON --- */}
      <FadeInSection>
        <ComparisonTable />
      </FadeInSection>

      {/* --- FIXED STATE SELECTOR WITH VISIBLE DROPDOWN ARROW --- */}
      <FadeInSection>
        <section className="bg-slate-50 py-32">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-6 text-4xl font-extrabold text-[#1A1A1A] md:text-5xl tracking-tight">
              Nursing Requirements Vary by State. <br className="hidden sm:block" />
              <span className="text-[#20B2AA]">Does Your Prep?</span>
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

      {/* --- REWRITTEN: WHY STUDYBUDDY WORKS (Human Expertise First) --- */}
      <FadeInSection>
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
           
            {/* Section Header */}
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
           
              {/* === TOP CARD: PhD CURRICULUM (Now Primary) === */}
              <div className="bg-gradient-to-br from-indigo-50 to-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-indigo-100 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-12 items-center">
               
                  {/* Left: Credentials */}
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-6">
                      <ShieldCheck className="w-4 h-4" />
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
                     
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                          <span className="text-lg font-bold text-indigo-600">EdD</span>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">Instructional Technology</p>
                          <p className="text-sm text-slate-600">30+ years designing adaptive learning systems</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-600 leading-relaxed">
                      Every lesson, every practice question, every video is created by subject-matter experts who've spent decades teaching nursing students. <strong className="text-slate-900">AI is only as good as the content it delivers</strong>—and ours is written by the best.
                    </p>
                  </div>

                  {/* Right: Visual */}
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
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm font-medium text-slate-700">Teaching Experience</span>
                          <span className="text-sm font-bold text-indigo-600">75+ Years</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* === BOTTOM ROW === */}
              <div className="grid md:grid-cols-2 gap-8">
               
                {/* Card 2: AI Tutor (Secondary Feature) */}
                <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-lg border border-slate-200 flex flex-col items-start h-full hover:-translate-y-1 transition-transform duration-300">
                  <div className="bg-[#20B2AA]/10 text-[#20B2AA] p-3.5 rounded-2xl mb-6">
                    <Zap className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">AI Delivers It Smarter</h3>
                  <p className="text-slate-500 leading-relaxed mb-6">
                    Our PhD-designed curriculum is delivered through an AI tutor that adapts to your learning style, identifies weak spots instantly, and explains concepts 24/7. <strong className="text-slate-900">The AI doesn't create the content—it makes expert teaching available anytime.</strong>
                  </p>
                  <a href={LINKS.CHECKOUT_PRO} className="mt-auto inline-flex items-center text-[#20B2AA] font-bold hover:gap-3 transition-all group">
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
                    92% of our students pass on their first attempt. We're so confident in our expert-designed system that we back it with a 100% pass guarantee. Complete the work, pass the exam—or get every penny back.
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

      {/* --- UPDATED PRICING SECTION --- */}
      <FadeInSection>
        <section id="pricing" className="py-32 bg-white relative">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-extrabold text-[#1A1A1A] md:text-5xl tracking-tight">Transparent Pricing</h2>
              <p className="mt-4 text-xl text-slate-500">One month to prep. Or lock in savings with 3 months.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
              {/* Monthly Plan */}
              <div className="group relative flex flex-col rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-xl transition-all hover:border-slate-300 hover:shadow-2xl">
                <div className="mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Month-to-Month</span>
                  <h3 className="mt-2 text-3xl font-extrabold text-[#1A1A1A]">Basic</h3>
                </div>
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-6xl font-black text-[#1A1A1A] tracking-tight">$24.99</span>
                  <span className="text-xl font-medium text-slate-500">/mo</span>
                </div>
                <p className="mb-8 text-sm font-medium text-slate-400">Cancel anytime. No commitment.</p>

                <ul className="mb-10 space-y-4">
                  {[
                    'Complete TEAS 7 Course (17 Chapters)',
                    '350+ Video Lectures',
                    'Practice Questions + Practice Exams',
                    '5 Full-Length Practice Exams',
                    'TEAS Knowledge In Action Videos',
                    'Access on Any Device',
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-base font-medium text-slate-700">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#20B2AA]/10 text-[#20B2AA] flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4"/>
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={LINKS.CHECKOUT_BASIC}
                  className="mt-auto block w-full rounded-2xl border-2 border-slate-200 bg-white py-5 text-center text-lg font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-[#20B2AA]"
                >
                  Start Basic Plan
                </a>
              </div>

              {/* Pro Plan */}
              <div className="relative flex flex-col rounded-[2.5rem] border-2 border-[#20B2AA] bg-white p-10 shadow-2xl transition-transform md:-translate-y-6">
                <div className="absolute top-0 right-1/2 md:right-10 transform translate-x-1/2 md:translate-x-0 -translate-y-1/2">
                  <div className="whitespace-nowrap rounded-full bg-[#F59E0B] px-6 py-2 text-xs font-black uppercase tracking-widest text-white shadow-lg ring-4 ring-white">
                    ✨ Most Popular
                  </div>
                </div>

                <div className="mt-4 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#20B2AA]">Pass Guaranteed</span>
                  <h3 className="mt-2 text-3xl font-extrabold text-[#1A1A1A]">Pro</h3>
                </div>
                <div className="mb-2 flex items-baseline gap-1">
                  <span className="text-6xl font-black text-[#1A1A1A] tracking-tight">$59</span>
                  <span className="text-xl font-medium text-slate-500">/ 3 mo</span>
                </div>
                <div className="mb-8 inline-block rounded-lg bg-green-100 px-3 py-1 text-sm font-bold text-green-700 border border-green-200">
                  Save $16 vs. Monthly
                </div>

                <ul className="mb-10 space-y-4">
                  <li className="flex items-start gap-3 text-base font-bold text-[#1A1A1A]">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#20B2AA]/10 text-[#20B2AA] flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4"/>
                    </div>
                    <span>Everything in Basic</span>
                  </li>

                  <li className="flex items-start gap-4 rounded-xl border border-[#20B2AA]/20 bg-[#20B2AA]/5 p-4 text-base font-bold text-[#1A1A1A]">
                    <div className="text-2xl flex-shrink-0">⚡️</div>
                    <div>
                      <div className="font-bold">UNLIMITED AI Tutor</div>
                      <div className="text-sm font-medium text-[#20B2AA] mt-1">No daily limits. Ask anything, anytime.</div>
                    </div>
                  </li>

                  <li className="flex items-start gap-4 rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/5 p-4 text-base font-bold text-[#1A1A1A]">
                    <div className="text-2xl flex-shrink-0">🛡️</div>
                    <div>
                      <div className="font-bold">100% Pass Guarantee*</div>
                      <div className="text-sm font-medium text-[#F59E0B] mt-1">
                        Do the work, we take the risk. Pass or get every penny back.
                      </div>
                    </div>
                  </li>
                </ul>

                <a
                  href={LINKS.CHECKOUT_PRO}
                  className="mt-auto block w-full rounded-2xl bg-[#20B2AA] py-5 text-center text-lg font-bold text-white shadow-xl shadow-[#20B2AA]/30 transition-all hover:bg-[#18968F] hover:shadow-[#20B2AA]/50 hover:-translate-y-1"
                >
                  Get 3-Month Access
                </a>

                <p className="mt-4 text-center text-[11px] font-medium text-slate-400">
                  *100% Pass Guarantee: Complete 80%+ of course + 1,000+ practice questions + Study 30+ days. Don't pass? Full $59 refund or 60 free days. <Link href={LINKS.REFUND_POLICY} className="underline hover:text-slate-600">View complete policy</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* --- FAQ SECTION --- */}
      <FadeInSection>
        <section className="bg-slate-50 py-24 border-t border-slate-200">
          <FAQ />
        </section>
      </FadeInSection>

      {/* --- FIXED FOOTER WITH CORRECTED LINKS --- */}
      <footer className="bg-[#1A1A1A] text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
           
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#20B2AA] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-bold">StudyBuddy</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                AI-powered TEAS 7 prep built by PhD & DNP nursing educators with 75+ years of combined experience. Pass guaranteed.
              </p>
              <p className="text-slate-500 text-xs mb-2">
                © 2025 EdExpert LLC. All rights reserved.
              </p>
              <p className="text-slate-600 text-[10px] leading-relaxed max-w-md">
                TEAS® is a registered trademark of the Assessment Technologies Institute, which is unaffiliated, not a sponsor, or associated with StudyBuddy.
              </p>
            </div>

            {/* Product Links */}
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
                  <a href="/states" className="text-slate-400 hover:text-[#20B2AA] transition-colors text-sm">
                    State Requirements
                  </a>
                </li>
                <li>
                  <a href="https://learn.studybuddy.live/about-studybuddy?site_template_id=67e1717114d4688062090ad2" className="text-slate-400 hover:text-[#20B2AA] transition-colors text-sm" target="_blank" rel="noopener">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/privacy-policy" className="text-slate-400 hover:text-[#20B2AA] transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-and-conditions" className="text-slate-400 hover:text-[#20B2AA] transition-colors text-sm">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/cookie-policy" className="text-slate-400 hover:text-[#20B2AA] transition-colors text-sm">
                    Cookie Policy
                  </Link>
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
                  <a href="https://learn.studybuddy.live/contact-us?site_template_id=67e1717114d4688062090ad2" className="text-slate-400 hover:text-[#20B2AA] transition-colors text-sm" target="_blank" rel="noopener">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="mailto:support@studybuddy.live" className="text-slate-400 hover:text-[#20B2AA] transition-colors text-sm">
                    support@studybuddy.live
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}