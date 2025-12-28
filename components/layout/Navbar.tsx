'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

// ✅ CHANGED to 'export default' to match layout.tsx import
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 h-24 flex items-center transition-all">
      <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="/logo.png" 
            alt="StudyBuddy Logo" 
            className="h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
          />
          <span className="font-bold text-slate-900 text-2xl tracking-tight group-hover:text-[#20B2AA] transition-colors">
            StudyBuddy
          </span>
        </Link>

        {/* DESKTOP LINKS - AEO OPTIMIZED */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/teas-7-syllabus" className="text-sm font-medium text-slate-600 hover:text-[#20B2AA] transition-colors">
            Syllabus
          </Link>
          <Link href="/ai-tutor" className="text-sm font-medium text-slate-600 hover:text-[#20B2AA] transition-colors">
            AI Tutor
          </Link>
          <Link href="/states" className="text-sm font-medium text-slate-600 hover:text-[#20B2AA] transition-colors">
            State Req's
          </Link>
          <Link href="/#pricing" className="text-sm font-medium text-slate-600 hover:text-[#20B2AA] transition-colors">
            Pricing
          </Link>
          
          {/* External Login Link */}
          <a href="https://learn.studybuddy.live/login" className="text-sm font-bold text-slate-900 hover:text-[#20B2AA] transition-colors ml-2">
            Log In
          </a>

          {/* CTA WIRED TO DIAGNOSTIC */}
          <button 
            onClick={() => router.push('/diagnostic')}
            className="px-5 py-2.5 bg-[#20B2AA] text-white text-sm font-bold rounded-full hover:bg-[#18968F] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            Start Free Diagnostic
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button className="lg:hidden p-2 text-slate-600 hover:text-[#20B2AA]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden absolute top-24 left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-5 duration-200 h-[calc(100vh-6rem)] overflow-y-auto">
          <Link href="/teas-7-syllabus" className="text-lg text-slate-600 font-medium hover:text-[#20B2AA] py-2 border-b border-slate-50" onClick={() => setIsOpen(false)}>
            TEAS 7 Syllabus
          </Link>
          <Link href="/ai-tutor" className="text-lg text-slate-600 font-medium hover:text-[#20B2AA] py-2 border-b border-slate-50" onClick={() => setIsOpen(false)}>
            AI Tutor Feature
          </Link>
          <Link href="/states" className="text-lg text-slate-600 font-medium hover:text-[#20B2AA] py-2 border-b border-slate-50" onClick={() => setIsOpen(false)}>
            State Requirements
          </Link>
          <Link href="/compare/teas-prep-courses" className="text-lg text-slate-600 font-medium hover:text-[#20B2AA] py-2 border-b border-slate-50" onClick={() => setIsOpen(false)}>
            Competitor Comparison
          </Link>
          <Link href="/pass-rate-methodology" className="text-lg text-slate-600 font-medium hover:text-[#20B2AA] py-2 border-b border-slate-50" onClick={() => setIsOpen(false)}>
            Pass Rate Methodology
          </Link>
          <Link href="/#pricing" className="text-lg text-slate-600 font-medium hover:text-[#20B2AA] py-2 border-b border-slate-50" onClick={() => setIsOpen(false)}>
            Pricing
          </Link>
          
          <a href="https://learn.studybuddy.live/login" className="text-lg text-slate-900 font-bold hover:text-[#20B2AA] py-2" onClick={() => setIsOpen(false)}>
            Log In
          </a>
          
          {/* Mobile CTA */}
          <button 
            onClick={() => {
              setIsOpen(false);
              router.push('/diagnostic');
            }}
            className="w-full py-3 mt-2 bg-[#20B2AA] text-white text-lg font-bold rounded-xl shadow-md active:scale-95 transition-transform"
          >
            Start Free Diagnostic
          </button>
        </div>
      )}
    </nav>
  );
}