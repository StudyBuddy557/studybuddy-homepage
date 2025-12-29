'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  CheckCircle2, Zap, Shield, Users, ArrowRight, 
  Play, BookOpen, ChevronDown, ChevronUp, X,
  Menu, Bot
} from 'lucide-react';

// --- SUB-COMPONENT: NAVIGATION BAR ---
function Navbar() {
  return (
    <nav className="border-b border-slate-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-teal-500 rounded-lg flex items-center justify-center text-white font-bold font-serif text-xl shadow-sm group-hover:scale-105 transition-transform">S</div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">StudyBuddy</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
          <Link href="/diagnostic" className="hover:text-teal-600 transition-colors">Diagnostic</Link>
          <Link href="/syllabus" className="hover:text-teal-600 transition-colors">Syllabus</Link>
          <Link href="/states" className="hover:text-teal-600 transition-colors">State Reqs</Link>
          <Link href="/pricing" className="hover:text-teal-600 transition-colors">Pricing</Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold text-slate-900 hover:text-teal-600">Log In</Link>
          <Link href="/pricing" className="bg-slate-900 text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-all shadow-md hover:shadow-lg">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Placeholder */}
        <button className="md:hidden text-slate-900 p-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}

// --- SUB-COMPONENT: FAQ ITEM ---
function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 hover:bg-slate-50 transition-colors"
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-teal-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>
      {isOpen && (
        <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50 text-sm">
          {answer}
        </div>
      )}
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---

export default function Home() {
  // AEO Schema (Invisible Data Layer)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'OnlineBusiness',
    'name': 'StudyBuddy',
    'description': 'AI-powered TEAS 7 test preparation platform built by nursing professors.',
    'url': 'https://studybuddy.live',
    'knowsAbout': ['TEAS 7 Exam', 'ATI TEAS', 'Nursing School Admissions'],
    'priceRange': '$24.99 - $59.00',
    'founder': { '@type': 'Person', 'jobTitle': 'Professor of Nursing' },
    'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'reviewCount': '523' }
  };

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      {/* 1. NAVIGATION */}
      <Navbar />

      {/* 2. HERO SECTION */}
      <section className="relative pt-12 pb-24 bg-white overflow-hidden">
        <div className="container max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="bg-teal-50 text-teal-700 text-[10px] md:text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-teal-100">
                Updated for TEAS 7 (2025)
              </span>
              <div className="flex -space-x-2">
                 <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>
                 <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white"></div>
                 <div className="w-6 h-6 rounded-full bg-slate-400 border-2 border-white"></div>
              </div>
              <span className="text-slate-500 text-xs font-bold pl-2">500+ Students Enrolled</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
              AI-Powered TEAS 7 <br /> Prep by Nursing <br /> Professors.
            </h1>

            <p className="text-2xl font-bold text-teal-700 mb-8">
              92% Pass Rate on First Attempt.
            </p>

            <ul className="space-y-4 mb-10 text-slate-600 font-medium">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-teal-500 shrink-0" />
                <span><strong>Unlimited AI Tutor</strong> – Ask complex questions, 24/7.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-teal-500 shrink-0" />
                <span><strong>4,000+ Questions</strong> & 350+ Video Lectures.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-teal-500 shrink-0" />
                <span>Created by PhDs with <strong>75+ Years Experience</strong>.</span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="bg-teal-500 hover:bg-teal-400 text-white text-base font-bold px-8 py-4 rounded-xl shadow-lg shadow-teal-500/20 transition-all flex flex-col items-center justify-center text-center">
                <span>Take Free 5-Min Diagnostic →</span>
                <span className="text-[10px] font-normal opacity-90 mt-1">Get your personalized TEAS study plan</span>
              </Link>
              <Link href="/pricing" className="bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-bold flex flex-col items-center justify-center transition-all min-w-[160px]">
                <span className="text-xs uppercase tracking-wide text-slate-500">Plans from</span>
                <span className="text-lg text-slate-900">$24.99/mo</span>
              </Link>
            </div>
            
            <p className="mt-4 text-xs text-slate-400 max-w-md">
              *100% Pass Guarantee: Complete the course and don't pass? Full refund. <Link href="/pass-guarantee" className="underline hover:text-slate-600">View policy</Link>
            </p>
          </div>

          {/* VIDEO PLACEHOLDER LINK */}
          <div className="relative z-10 w-full h-64 md:h-96 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center group hover:border-teal-400 transition-colors">
            <Link href="#" className="text-slate-400 font-bold group-hover:text-teal-600 flex flex-col items-center gap-3 transition-colors">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 fill-current" />
              </div>
              <span>Video Placeholder Link</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. VALUE PROPS */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">What is StudyBuddy?</h2>
            <p className="text-slate-500">Quick answers to help you decide if this is right for you</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Who It's For", desc: "Pre-nursing & Allied Health Students" },
              { icon: Zap, title: "Core Benefit", desc: "AI tutor fixes weak spots instantly" },
              { icon: Shield, title: "Guarantee", desc: "100% Pass Guarantee* or full refund" },
              { icon: BookOpen, title: "Study Time", desc: "Most students pass in 4-8 weeks" }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl border border-slate-100 shadow-sm bg-white hover:border-teal-200 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-6 text-teal-600">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMPARISON TABLE */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block border border-amber-200">
              The Honest Comparison
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
              Not All TEAS Prep Is <br/> <span className="text-teal-500">Created Equal</span>
            </h2>
            <p className="text-slate-600 text-lg">Here's how we stack up against traditional textbooks and generic prep sites.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
            {/* Header Row */}
            <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-200 py-6 px-4 text-center">
              <div className="text-left pl-6 font-bold text-xs uppercase tracking-widest text-slate-400 self-end">Features</div>
              <div><div className="font-bold text-slate-700">Textbooks</div><div className="text-[10px] text-slate-400">Traditional</div></div>
              <div><div className="font-bold text-slate-700">Generic Sites</div><div className="text-[10px] text-slate-400">Cookie-Cutter</div></div>
              <div className="relative">
                 <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-[9px] font-bold px-3 py-1 rounded-b-lg shadow-sm">BEST VALUE</div>
                 <div className="font-extrabold text-slate-900 text-lg">StudyBuddy</div><div className="text-[10px] text-teal-600 font-bold">AI-Powered</div>
              </div>
            </div>

            {/* Rows */}
            {[
              { label: "Interactive AI Tutor", text: false, gen: false, sb: true },
              { label: "Personalized Study Plan", text: false, gen: false, sb: true },
              { label: "Practice Questions", textVal: "~500", genVal: "~1,000", sbVal: "4,000+" },
              { label: "Video Explanations", text: false, genVal: "Limited", sbVal: "350+ Videos" },
              { label: "Access on Any Device", text: false, gen: false, sb: true },
              { label: "Pass Guarantee", text: false, gen: false, sb: true },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-4 py-5 px-4 border-b border-slate-100 items-center text-center ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                <div className="text-left pl-6 text-sm font-bold text-slate-700">{row.label}</div>
                <div className="flex justify-center text-sm text-slate-500">{row.textVal || (row.text ? <CheckCircle2 className="w-5 h-5 text-teal-500"/> : <X className="w-5 h-5 text-red-300"/>)}</div>
                <div className="flex justify-center text-sm text-slate-500">{row.genVal || (row.gen ? <CheckCircle2 className="w-5 h-5 text-teal-500"/> : <X className="w-5 h-5 text-red-300"/>)}</div>
                <div className="flex justify-center font-bold text-slate-900 text-sm">{row.sbVal || (row.sb ? <CheckCircle2 className="w-6 h-6 text-teal-500 fill-teal-50"/> : <X className="w-5 h-5 text-red-300"/>)}</div>
              </div>
            ))}
            
             <div className="grid grid-cols-4 py-6 px-4 items-center text-center bg-slate-50">
                <div className="text-left pl-6 text-sm font-bold text-slate-700">Average Cost</div>
                <div className="text-sm text-slate-500">~$50</div>
                <div className="text-sm text-slate-500">$29-39/mo</div>
                <div className="text-xl font-extrabold text-teal-700">$24.99/mo</div>
             </div>
          </div>
          
           <div className="text-center mt-12">
              <Link href="/pricing" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-indigo-500/20 transition-all">
                Start Learning Today <ArrowRight className="w-5 h-5" />
              </Link>
           </div>
        </div>
      </section>

      {/* 5. STATE REQUIREMENTS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
           <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Nursing Requirements Vary by State. <br/>
            <span className="text-teal-500">Does Your Prep?</span>
           </h2>
           <p className="text-slate-500 text-lg mb-10 max-w-2xl mx-auto">
             We've mapped the TEAS 7 requirements for every nursing program in the country. Select your state to see exactly what you need to score.
           </p>
           
           <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto bg-white p-2 rounded-xl shadow-sm border border-slate-200">
              <select 
                className="flex-1 p-3 bg-transparent text-slate-700 font-medium focus:outline-none cursor-pointer"
                onChange={(e) => {
                  if (e.target.value) window.location.href = `/states/${e.target.value}`;
                }}
              >
                <option value="">Select your state...</option>
                <option value="california">California</option>
                <option value="texas">Texas</option>
                <option value="florida">Florida</option>
                <option value="new-york">New York</option>
                <option value="georgia">Georgia</option>
                <option value="illinois">Illinois</option>
              </select>
              <button className="bg-teal-400 hover:bg-teal-300 text-teal-900 font-bold px-8 py-3 rounded-lg transition-colors whitespace-nowrap">
                View Guide
              </button>
           </div>
        </div>
      </section>

      {/* 6. EXPERT CONTENT */}
      <section className="py-24 bg-slate-50/50 border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-6xl">
           <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                 <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                    Expert-Designed Curriculum
                 </span>
                 <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                    Built by PhD & DNP <br/> Educators. <br/>
                    <span className="text-indigo-600">Not Content Farms.</span>
                 </h2>
                 
                 <div className="space-y-8">
                    {[
                      { l: "PhD", t: "Infectious Diseases & Immunology", d: "25+ years teaching pre-nursing science" },
                      { l: "DNP", t: "Clinical Nursing Practice", d: "20+ years NCLEX & TEAS test prep expertise" },
                      { l: "EdD", t: "Instructional Technology", d: "30+ years designing adaptive learning systems" }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                         <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">{item.l}</div>
                         <div>
                            <h4 className="font-bold text-slate-900 text-lg">{item.t}</h4>
                            <p className="text-sm text-slate-500">{item.d}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 text-center relative overflow-hidden">
                 <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600">
                    <BookOpen className="w-10 h-10" />
                 </div>
                 <h3 className="text-3xl font-extrabold text-slate-900 mb-2">92% Pass Rate</h3>
                 <p className="text-slate-500 mb-8">Built on decades of teaching excellence</p>
                 <div className="space-y-4">
                    <div className="flex justify-between text-sm p-3 bg-slate-50 rounded-lg"><span className="text-slate-600 font-medium">Curriculum Quality</span><span className="font-bold text-indigo-600">Expert-Vetted</span></div>
                    <div className="flex justify-between text-sm p-3 bg-slate-50 rounded-lg"><span className="text-slate-600 font-medium">Content Accuracy</span><span className="font-bold text-indigo-600">PhD-Verified</span></div>
                    <div className="flex justify-between text-sm p-3 bg-slate-50 rounded-lg"><span className="text-slate-600 font-medium">Teaching Experience</span><span className="font-bold text-indigo-600">75+ Years</span></div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 7. PRICING */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Transparent Pricing</h2>
            <p className="text-slate-500 mb-16 text-lg">One month to prep. Or lock in savings with 3 months.</p>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
               {/* Basic */}
               <div className="p-8 rounded-3xl border border-slate-200 text-left hover:border-slate-300 transition-all bg-white">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Month-to-Month</div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">Basic</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                     <span className="text-5xl font-extrabold text-slate-900 tracking-tight">$24.99</span>
                     <span className="text-slate-500">/mo</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-8">Cancel anytime. No commitment.</p>
                  <ul className="space-y-4 mb-8">
                     {['Complete TEAS 7 Course', '350+ Video Lectures', 'Practice Questions', 'Access on Any Device'].map((f,i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-600"><CheckCircle2 className="w-5 h-5 text-slate-300 shrink-0"/> {f}</li>
                     ))}
                  </ul>
                  <Link href="/pricing?plan=basic" className="block w-full py-4 text-center border-2 border-slate-100 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-colors">Start Basic Plan</Link>
               </div>
               
               {/* Pro */}
               <div className="p-8 rounded-3xl border-2 border-teal-400 shadow-2xl text-left relative overflow-hidden bg-white">
                  <div className="absolute top-0 right-0 bg-amber-400 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">Most Popular</div>
                  <div className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mb-4">Pass Guaranteed</div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">Pro</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                     <span className="text-5xl font-extrabold text-slate-900 tracking-tight">$59</span>
                     <span className="text-slate-500">/3 mo</span>
                  </div>
                  <div className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded inline-block mb-8">Save $16 vs. Monthly</div>
                  
                  <ul className="space-y-4 mb-8">
                     <li className="flex gap-3 text-sm font-bold text-slate-900 border-b border-slate-100 pb-4"><CheckCircle2 className="w-5 h-5 text-teal-500"/> Everything in Basic</li>
                     <li className="p-4 bg-teal-50 rounded-xl border border-teal-100">
                        <div className="flex gap-3">
                           <Zap className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"/>
                           <div>
                              <div className="text-sm font-bold text-slate-900">UNLIMITED AI Tutor</div>
                              <div className="text-[10px] text-slate-500">No daily limits. Ask anything.</div>
                           </div>
                        </div>
                     </li>
                     <li className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                        <div className="flex gap-3">
                           <Shield className="w-5 h-5 text-orange-500 shrink-0 mt-0.5"/>
                           <div>
                              <div className="text-sm font-bold text-slate-900">100% Pass Guarantee*</div>
                              <div className="text-[10px] text-slate-500">Do the work, we take the risk.</div>
                           </div>
                        </div>
                     </li>
                  </ul>
                  <Link href="/pricing?plan=pro" className="block w-full py-4 text-center bg-teal-500 rounded-xl font-bold text-white hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/20">Get 3-Month Access</Link>
               </div>
            </div>
         </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-slate-500 mt-2">Everything you need to know about the TEAS 7.</p>
          </div>
          
          <div className="space-y-4">
             <FaqItem question="How does the Pass Guarantee work?" answer="If you complete 80% of the course and fail your TEAS exam, we refund 100% of your money. No hidden loops." />
             <FaqItem question="Are the practice exams realistic?" answer="Yes. Our questions match the difficulty, format, and timing of the actual ATI TEAS 7 exam." />
             <FaqItem question="What specific subjects are on the TEAS 7?" answer="Reading, Math, Science, and English & Language Usage." />
             <FaqItem question="Can I use a calculator on the TEAS 7?" answer="Yes, a basic four-function calculator is provided on-screen during the test." />
             <FaqItem question="Does StudyBuddy work on my phone or tablet?" answer="Yes, the platform is fully responsive and works great on mobile devices." />
             <FaqItem question="Is this course updated for the 2026 TEAS 7?" answer="Yes, we update our content weekly to match the latest ATI standards." />
             <FaqItem question="What is a good TEAS score for nursing school?" answer="It depends on the program, but generally 65-70% for ADN and 75-80% for BSN." />
             <FaqItem question="What is the refund policy?" answer="We offer a full refund within 3 days if you are not satisfied, plus our Pass Guarantee." />
          </div>
        </div>
      </section>

      {/* 9. DARK FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white font-bold font-serif text-xl">S</div>
                <span className="text-2xl font-bold text-white tracking-tight">StudyBuddy</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm mb-6">
                AI-powered TEAS 7 prep built by PhD & DNP nursing educators with 75+ years of combined experience. Pass guaranteed.
              </p>
              <div className="text-xs text-slate-600 leading-relaxed">
                © 2025 EdExpert LLC. All rights reserved. <br/>
                TEAS® is a registered trademark of the Assessment Technologies Institute, which is unaffiliated, not a sponsor, or associated with StudyBuddy.
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/diagnostic" className="hover:text-teal-400 transition-colors">Free Diagnostic Test</Link></li>
                <li><Link href="/pricing" className="hover:text-teal-400 transition-colors">Pricing</Link></li>
                <li><Link href="/states" className="hover:text-teal-400 transition-colors">State Requirements</Link></li>
                <li><Link href="/about" className="hover:text-teal-400 transition-colors">About Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Legal & Support</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-teal-400 transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/refunds" className="hover:text-teal-400 transition-colors">Refund Policy</Link></li>
                <li><a href="mailto:support@studybuddy.live" className="hover:text-teal-400 transition-colors">support@studybuddy.live</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}