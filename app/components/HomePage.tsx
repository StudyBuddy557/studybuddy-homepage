'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { 
  CheckCircle2, Zap, Shield, Users, ArrowRight, 
  Play, BookOpen, ChevronDown, X, 
  Menu, Bot, Award, Star, Target, Brain, 
  Sparkles, Timer, BarChart3, Home, User, AlertCircle, MessageCircle
} from 'lucide-react';
import { organizationSchema } from '@/lib/schema/organization';
import JsonLd from '@/app/components/JsonLd';
import { stateData } from '@/lib/state-data';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🛠️ UTILS & HOOKS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) > 10) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    
    window.addEventListener("scroll", updateScrollDirection, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [scrollDirection]);

  return scrollDirection;
}

function useLocalStorage(key: string, initialValue: boolean) {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  const setValue = useCallback((value: boolean) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue, isHydrated] as const;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🧩 SUB-COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// --- FLOATING SALES BOT ---
function FloatingSalesBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  // Show the "Hi!" bubble after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 hidden md:flex">
      {/* The Speech Bubble */}
      {showBubble && !isOpen && (
        <div className="bg-white px-4 py-3 rounded-2xl rounded-br-none shadow-xl border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[200px]">
          <div className="flex justify-between items-start gap-2">
            <p className="text-sm font-bold text-slate-800">Hi! Need help passing the TEAS?</p>
            <button 
              onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
              className="text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* The Trigger Button with Avatar */}
      <Link 
        href="/dashboard"
        className="group relative flex items-center justify-center w-16 h-16 rounded-full shadow-lg hover:shadow-teal-500/40 transition-all hover:scale-105 active:scale-95 bg-white border-2 border-[#20B2AA] overflow-hidden"
        onMouseEnter={() => setShowBubble(true)}
      >
        <Image 
          src="/StudyBuddy_AI_tutor_Avatar.png" 
          alt="AI Tutor" 
          fill
          className="object-cover"
        />
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full z-10"></span>
      </Link>
    </div>
  );
}

function ExitIntentModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden relative animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} className="text-slate-500" />
        </button>
        
        <div className="flex flex-col md:flex-row">
          <div className="bg-[#20B2AA] p-8 md:w-2/5 flex flex-col justify-center text-white text-center md:text-left">
            <div className="text-4xl font-bold mb-2">20%</div>
            <div className="text-lg font-medium leading-tight mb-4">OFF YOUR FIRST MONTH</div>
            <div className="text-xs opacity-90">Limited time offer for new students.</div>
          </div>
          
          <div className="p-8 md:w-3/5">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Wait! Don&apos;t leave yet.</h3>
            <p className="text-slate-600 mb-6 text-sm">
              Pass your TEAS 7 or get your money back. Grab your free study guide and discount code.
            </p>
            
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent outline-none transition-all"
                aria-label="Email address"
              />
              <button 
                type="submit"
                className="w-full bg-[#1E3A8A] text-white font-bold py-3 rounded-lg hover:bg-[#162c6b] transition-colors shadow-lg shadow-blue-900/20"
              >
                Unlock My 20% Off
              </button>
            </form>
            <button onClick={onClose} className="w-full text-center text-slate-400 text-xs mt-4 hover:text-slate-600 underline">
              No thanks, I&apos;ll pay full price
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StickyFloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-40 transition-transform duration-300 transform ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      } hidden md:block`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-[#E0F2F1] text-[#00897B] p-2 rounded-lg hidden lg:block">
             <Timer size={24} />
          </div>
          <div>
            <div className="font-bold text-slate-900">TEAS 7 Diagnostic Test</div>
            <div className="text-sm text-slate-500">Assess your readiness in 15 minutes</div>
          </div>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/teas-7-syllabus" 
            className="px-6 py-2.5 rounded-lg font-semibold text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
          >
            View Study Plans
          </Link>
          <Link 
            href="/diagnostic" 
            className="bg-[#20B2AA] text-white px-8 py-2.5 rounded-lg font-bold hover:bg-[#1a9d96] shadow-lg shadow-teal-500/30 transition-all hover:-translate-y-0.5"
          >
            Start Free Diagnostic
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileBottomNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 z-50 px-6 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="flex flex-col items-center text-slate-400 hover:text-[#20B2AA]">
          <Home size={24} />
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </Link>
        
        <Link 
          href="/diagnostic" 
          className="flex-1 bg-[#20B2AA] text-white h-12 rounded-xl flex items-center justify-center font-bold text-sm shadow-lg shadow-teal-500/20 active:scale-95 transition-transform"
        >
          Start Diagnostic
        </Link>
        
        <Link href="/dashboard" className="flex flex-col items-center text-slate-400 hover:text-[#20B2AA]">
          <User size={24} />
          <span className="text-[10px] mt-1 font-medium">Log In</span>
        </Link>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div 
      className="bg-white rounded-xl border border-slate-200 overflow-hidden cursor-pointer group"
      onClick={() => setIsOpen(!isOpen)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsOpen(!isOpen);
        }
      }}
      aria-expanded={isOpen}
    >
      <div className="w-full flex items-center justify-between p-6 text-left font-semibold text-slate-800 group-hover:bg-slate-50 transition-colors">
        <span className="text-lg pr-4">{question}</span>
        <div className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
           <ChevronDown size={24} className="text-[#20B2AA]" />
        </div>
      </div>
      <div 
        className={`px-6 text-slate-600 leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {answer}
      </div>
    </div>
  );
}

function StarRating({ count = 5, size = 14 }: { count?: number; size?: number }) {
  return (
    <div className="flex text-[#F59E0B]">
      {Array.from({ length: count }, (_, i) => (
        <Star key={`star-${i}`} size={size} fill="currentColor" />
      ))}
    </div>
  );
}

function AvatarPlaceholder({ index, name }: { index: number; name?: string }) {
  const colors = ['bg-teal-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500'];
  const color = colors[index % colors.length];
  
  return (
    <div 
      className={`w-10 h-10 rounded-full border-2 border-white ${color} shadow-sm flex items-center justify-center text-white font-semibold text-sm`}
    >
      {name ? name[0].toUpperCase() : (index + 1)}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🚀 MAIN PAGE COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const scrollDirection = useScrollDirection();
  const [hasSeenModal, setHasSeenModal, isHydrated] = useLocalStorage('hasSeenExitModal', false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasSeenModal) {
        setShowExitIntent(true);
        setHasSeenModal(true);
      }
    };
    
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasSeenModal, setHasSeenModal, isHydrated]);

  const navItems = [
    { label: 'Diagnostic', href: '/diagnostic' },
    { label: 'Syllabus', href: '/teas-7-syllabus' },
    { label: 'Methodology', href: '/pass-rate-methodology' },
    { label: 'Compare', href: '/compare/teas-prep-courses' },
    { label: 'Pricing', href: '/pricing' },
  ];

  const valueProps = [
    { icon: Users, title: "Who It's For", desc: "Pre-nursing & Allied Health Students" },
    { icon: Zap, title: "Core Benefit", desc: "AI tutor fixes weak spots instantly" },
    { icon: Shield, title: "Guarantee", desc: "100% Pass Guarantee* or full refund" },
    { icon: BookOpen, title: "Study Time", desc: "Most students pass in 4-8 weeks" }
  ];

  const comparisonRows = [
    { label: "Interactive AI Tutor", text: false, gen: false, sb: true },
    { label: "Personalized Study Plan", text: false, gen: false, sb: true },
    { label: "Practice Questions", textVal: "~500", genVal: "~1,000", sbVal: "4,000+" },
    { label: "Video Explanations", text: false, genVal: "Limited", sbVal: "350+ Videos" },
    { label: "Access on Any Device", text: false, gen: false, sb: true },
    { label: "Pass Guarantee", text: false, gen: false, sb: true },
  ];

  const expertCredentials = [
    { label: "PhD", title: "Infectious Diseases & Immunology", desc: "25+ years teaching pre-nursing science" },
    { label: "DNP", title: "Clinical Nursing Practice", desc: "20+ years NCLEX & TEAS test prep expertise" },
    { label: "EdD", title: "Instructional Technology", desc: "30+ years designing adaptive learning systems" }
  ];

  // UPDATED FAQs
  const faqItems = [
    { question: "How does the Pass Guarantee work?", answer: "Complete 80%+ of the course, answer 1,000+ practice questions, and study for 30+ days. If you don't pass, we'll give you a full $59 refund or 60 free days of extended access. No hidden loops." },
    { question: "Are the practice exams realistic?", answer: "Yes. Our questions match the difficulty, format, and timing of the actual ATI TEAS 7 exam." },
    { question: "What specific subjects are on the TEAS 7?", answer: "Reading, Math, Science, and English & Language Usage." },
    { question: "Can I use a calculator on the TEAS 7?", answer: "Yes, a basic four-function calculator is provided on-screen during the test." },
    { question: "Does StudyBuddy work on my phone or tablet?", answer: "Yes, the platform is fully responsive and works great on mobile devices." },
    { question: "Is this course updated for the 2026 TEAS 7?", answer: "Yes, we update our content weekly to match the latest ATI standards." },
    { question: "What is a good TEAS score for nursing school?", answer: "It depends on the program, but generally 65-70% for ADN and 75-80% for BSN." },
  ];

  const reviews = [
    {
      text: "I was failing the math section consistently. The breakdown StudyBuddy gave me on algebra was a lifesaver. Passed with a 92%!",
      author: "Sarah M.",
      school: "University of Texas"
    },
    {
      text: "The questions are harder than the actual TEAS, which made the real exam feel easy. I finished with 20 minutes to spare.",
      author: "Jason K.",
      school: "UCLA Nursing"
    },
    {
      text: "Worth every penny. The study plan kept me honest and the mobile interface meant I could study on my lunch breaks at work.",
      author: "Amara D.",
      school: "Georgia State"
    }
  ];

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      window.location.href = `/states/${e.target.value}`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#20B2AA] selection:text-white pb-20 md:pb-0">
      <JsonLd data={organizationSchema} />
      <FloatingSalesBot />
      <ExitIntentModal isOpen={showExitIntent} onClose={() => setShowExitIntent(false)} />
      <StickyFloatingCTA />
      <MobileBottomNav />

      {/* NAVIGATION */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        } ${scrollDirection === 'down' && scrolled ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-10 h-10 transition-transform group-hover:scale-105">
                <Image src="/logo.png" alt="StudyBuddy Logo" fill className="object-contain" />
              </div>
              <span className={`text-xl font-bold ${scrolled ? 'text-slate-900' : 'text-slate-900 lg:text-slate-800'}`}>
                StudyBuddy
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} className="text-slate-600 hover:text-[#20B2AA] font-medium transition-colors text-sm lg:text-base">
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/dashboard" className="text-slate-600 hover:text-[#20B2AA] font-medium transition-colors">Log In</Link>
              <Link href="/pricing" className="bg-[#20B2AA] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#1a9d96] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">Get Started</Link>
            </div>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-200 shadow-xl">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} className="block px-4 py-3 text-slate-700 hover:bg-[#20B2AA]/5 rounded-lg font-medium" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-slate-100 pt-3 mt-2">
                <Link href="/dashboard" className="block px-4 py-3 text-slate-600 font-medium" onClick={() => setMobileOpen(false)}>Log In</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-pink-200/40 via-teal-200/30 to-blue-200/40 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div className="space-y-8 max-w-2xl">
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/teas-7-syllabus" className="bg-teal-50 text-teal-700 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider border border-teal-100 hover:bg-teal-100 transition-colors">
                  Updated for TEAS 7 (2025)
                </Link>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[0, 1, 2].map((i) => (
                      <AvatarPlaceholder key={`hero-avatar-${i}`} index={i} />
                    ))}
                  </div>
                  <span className="text-slate-500 text-xs font-bold">500+ Students Enrolled</span>
                </div>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                AI-Powered TEAS 7 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20B2AA] to-[#1E3A8A]">
                  Prep by Nursing Professors.
                </span>
              </h1>
              
              <p className="text-2xl font-bold text-[#20B2AA]">
                92% Pass Rate on First Attempt.
              </p>

              <ul className="space-y-4 text-slate-600 font-medium">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#20B2AA] shrink-0" />
                  <span><strong>Unlimited AI Tutor</strong> – Ask complex questions, 24/7.</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#20B2AA] shrink-0" />
                  <span><strong>4,000+ Questions</strong> & 350+ Video Lectures.</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#20B2AA] shrink-0" />
                  <span>Created by PhDs with <strong>75+ Years Experience</strong>.</span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/diagnostic" className="bg-[#20B2AA] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#1a9d96] hover:shadow-xl hover:shadow-teal-500/20 hover:-translate-y-1 transition-all duration-200 flex flex-col items-center justify-center text-center">
                  <span>Take Free 5-Min Diagnostic →</span>
                  <span className="text-xs font-normal opacity-90 mt-1">Get your personalized TEAS study plan</span>
                </Link>
                <Link href="/pricing" className="bg-white text-slate-700 px-8 py-4 rounded-xl font-bold text-lg border-2 border-slate-200 hover:border-slate-300 transition-all duration-200 flex flex-col items-center justify-center shadow-sm hover:shadow-md min-w-[160px]">
                  <span className="text-xs uppercase tracking-wide text-slate-500">Plans from</span>
                  <span className="text-lg text-slate-900">$24.99/mo</span>
                </Link>
              </div>
              
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <Shield size={14} /> *100% Pass Guarantee: Complete the course and don&apos;t pass? Full refund. <Link href="/pass-guarantee" className="underline hover:text-slate-600">View policy</Link>
              </p>
            </div>

            <div className="relative mt-12 lg:mt-0" style={{ perspective: '1000px' }}>
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 md:p-8 transition-transform duration-700 ease-out hover:rotate-0" style={{ transform: 'rotateY(-3deg)' }}>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Your Study Plan</h3>
                    <p className="text-slate-500 text-sm">Target Exam Date: Oct 15</p>
                  </div>
                  <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-bold">On Track</div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-slate-700 flex items-center gap-2">
                        <Brain size={18} className="text-[#20B2AA]" /> Reading
                      </span>
                      <span className="font-bold text-[#20B2AA]">88%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div className="bg-[#20B2AA] h-2.5 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-slate-700 flex items-center gap-2">
                        <Target size={18} className="text-[#F59E0B]" /> Math
                      </span>
                      <span className="font-bold text-[#F59E0B]">72%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div className="bg-[#F59E0B] h-2.5 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                      <Zap size={12} className="text-[#F59E0B]" /> Recommended: Focus on Algebra today
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4">
                   <div className="w-12 h-12 bg-[#1E3A8A] rounded-full flex items-center justify-center text-white flex-shrink-0">
                      <Bot size={24} />
                   </div>
                   <div className="text-sm">
                      <p className="font-bold text-slate-900">AI Tutor says:</p>
                      <p className="text-slate-600">&quot;You&apos;ve mastered Life Sciences! Let&apos;s boost that Math score.&quot;</p>
                   </div>
                </div>
              </div>

              <div className="absolute -top-10 -right-10 bg-white p-4 rounded-xl shadow-xl z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-500" size={20} />
                  <span className="font-bold text-slate-800">Correct!</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What is StudyBuddy?</h2>
            <p className="text-slate-500 text-lg">Quick answers to help you decide if this is right for you</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {valueProps.map((item, i) => (
              <div key={i} className="p-8 rounded-2xl border border-slate-100 shadow-sm bg-white hover:border-[#20B2AA]/30 hover:shadow-lg transition-all group">
                <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 text-[#20B2AA] group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Link href="/compare/teas-prep-courses" className="bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block border border-amber-200 hover:bg-amber-200 transition-colors">
              The Honest Comparison
            </Link>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Not All TEAS Prep Is <br/> <span className="text-[#20B2AA]">Created Equal</span>
            </h2>
            <p className="text-slate-600 text-lg">See why students switch from ATI to StudyBuddy.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
            <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-200 py-6 px-4 text-center">
              <div className="text-left pl-6 font-bold text-xs uppercase tracking-widest text-slate-400 self-end">Features</div>
              <div><div className="font-bold text-slate-700">Textbooks</div><div className="text-xs text-slate-400">Traditional</div></div>
              <div><div className="font-bold text-slate-700">Generic Sites</div><div className="text-xs text-slate-400">Cookie-Cutter</div></div>
              <div className="relative">
                 <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-b-lg shadow-sm">BEST VALUE</div>
                 <div className="font-extrabold text-slate-900 text-lg">StudyBuddy</div><div className="text-xs text-[#20B2AA] font-bold">AI-Powered</div>
              </div>
            </div>

            {comparisonRows.map((row, i) => (
              <div key={i} className={`grid grid-cols-4 py-5 px-4 border-b border-slate-100 items-center text-center ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                <div className="text-left pl-6 text-sm font-bold text-slate-700">{row.label}</div>
                <div className="flex justify-center text-sm text-slate-500">
                  {row.textVal || (row.text ? <CheckCircle2 className="w-5 h-5 text-[#20B2AA]"/> : <X className="w-5 h-5 text-red-300"/>)}
                </div>
                <div className="flex justify-center text-sm text-slate-500">
                  {row.genVal || (row.gen ? <CheckCircle2 className="w-5 h-5 text-[#20B2AA]"/> : <X className="w-5 h-5 text-red-300"/>)}
                </div>
                <div className="flex justify-center font-bold text-slate-900 text-sm">
                  {row.sbVal || (row.sb ? <CheckCircle2 className="w-6 h-6 text-[#20B2AA]"/> : <X className="w-5 h-5 text-red-300"/>)}
                </div>
              </div>
            ))}
            
            <div className="grid grid-cols-4 py-6 px-4 items-center text-center bg-slate-50">
              <div className="text-left pl-6 text-sm font-bold text-slate-700">Average Cost</div>
              <div className="text-sm text-slate-500">~$50</div>
              <div className="text-sm text-slate-500">$29-39/mo</div>
              <div className="text-xl font-extrabold text-[#20B2AA]">$24.99/mo</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATE REQUIREMENTS */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Nursing Requirements Vary by State. <br/>
            <span className="text-[#20B2AA]">Does Your Prep?</span>
          </h2>
          <p className="text-slate-500 text-lg mb-10 max-w-2xl mx-auto">
            We&apos;ve mapped the TEAS 7 requirements for every nursing program in the country. Select your state to see exactly what you need to score.
          </p>
           
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto bg-white p-2 rounded-xl shadow-sm border border-slate-200">
            <select className="flex-1 p-3 bg-transparent text-slate-700 font-medium focus:outline-none cursor-pointer rounded-lg" onChange={handleStateChange} aria-label="Select your state">
              <option value="">Select your state...</option>
              {stateData.map((state) => (
                <option key={state.slug} value={state.slug}>{state.name}</option>
              ))}
            </select>
            <button className="bg-[#20B2AA] hover:bg-[#1a9d96] text-white font-bold px-8 py-3 rounded-lg transition-colors whitespace-nowrap">View Guide</button>
          </div>
          <p className="text-xs text-slate-400 mt-4 italic">
            Most popular: <Link href="/states/california" className="hover:text-[#20B2AA]">California</Link>, <Link href="/states/texas" className="hover:text-[#20B2AA]">Texas</Link>, <Link href="/states/florida" className="hover:text-[#20B2AA]">Florida</Link>
          </p>
        </div>
      </section>

      {/* EXPERT CONTENT */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <Link href="/is-studybuddy-legit" className="bg-indigo-100 text-indigo-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6 inline-block hover:bg-indigo-200 transition-colors">
                Verified Legitimacy
              </Link>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 leading-tight">
                Built by PhD & DNP <br/> Educators. <br/>
                <span className="text-indigo-600">Not Content Farms.</span>
              </h2>
               
              <div className="space-y-8">
                {expertCredentials.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">
                      {item.label}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 text-center relative overflow-hidden">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600">
                <BookOpen className="w-10 h-10" />
              </div>
              <h3 className="text-4xl font-extrabold text-slate-900 mb-2">92% Pass Rate</h3>
              <p className="text-slate-500 mb-8">
                <Link href="/pass-rate-methodology" className="underline hover:text-indigo-600">View our verification methodology</Link>
              </p>
              <div className="space-y-4">
                <div className="flex justify-between text-sm p-4 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Curriculum Quality</span>
                  <span className="font-bold text-indigo-600">Expert-Vetted</span>
                </div>
                <div className="flex justify-between text-sm p-4 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Content Accuracy</span>
                  <span className="font-bold text-indigo-600">PhD-Verified</span>
                </div>
                <div className="flex justify-between text-sm p-4 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Teaching Experience</span>
                  <span className="font-bold text-indigo-600">75+ Years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Your Dedicated Partner for TEAS 7 Mastery
            </h2>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
              We offer two simple paths. Both include our entire 4,000+ question bank and video library. The main difference is the AI Tutor access.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
            {/* Basic Plan */}
            <div className="p-8 rounded-3xl border border-slate-200 text-left hover:border-slate-300 transition-all bg-white hover:shadow-lg">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Monthly Flexibility</div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">Basic</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-extrabold text-slate-900 tracking-tight">$24.99</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">Cancel anytime. Good for short-term study.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-3 text-sm text-slate-600"><CheckCircle2 className="w-5 h-5 text-[#20B2AA] shrink-0"/> Complete TEAS 7 Course (updated 2026)</li>
                <li className="flex gap-3 text-sm text-slate-600"><CheckCircle2 className="w-5 h-5 text-[#20B2AA] shrink-0"/> Practice Questions for each topic + Practice Exams</li>
                <li className="flex gap-3 text-sm text-slate-600"><CheckCircle2 className="w-5 h-5 text-[#20B2AA] shrink-0"/> TEAS Knowledge In Action Videos</li>
                <li className="flex gap-3 text-sm text-slate-600"><CheckCircle2 className="w-5 h-5 text-[#20B2AA] shrink-0"/> Access on Any Device</li>
                <li className="flex gap-3 text-sm text-slate-600"><CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0"/> Standard AI Access (Limited)</li>
              </ul>
              <Link href="/pricing?plan=basic" className="block w-full py-4 text-center border-2 border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors">Start Basic Plan</Link>
            </div>
             
            {/* Pro Plan */}
            <div className="p-8 rounded-3xl border-2 border-[#20B2AA] shadow-2xl text-left relative overflow-hidden bg-white">
              <div className="absolute top-0 right-0 bg-amber-400 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">Most Popular</div>
              <div className="text-xs font-bold text-[#20B2AA] uppercase tracking-widest mb-4">Pass Guaranteed</div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">Pro</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-extrabold text-slate-900 tracking-tight">$59</span>
                <span className="text-slate-500">/ 3 mo</span>
              </div>
              <div className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded inline-block mb-6">Save $16 vs. Monthly</div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex gap-3 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3"><CheckCircle2 className="w-5 h-5 text-[#20B2AA]"/> Everything in Basic</li>
                <li className="p-4 bg-teal-50 rounded-xl border border-teal-100">
                  <div className="flex gap-3">
                    <Zap className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"/>
                    <div>
                      <div className="text-sm font-bold text-slate-900">UNLIMITED AI Tutor</div>
                      <div className="text-xs text-slate-500">No daily limits. Ask complex questions 24/7.</div>
                    </div>
                  </div>
                </li>
                <li className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <div className="flex gap-3">
                    <Shield className="w-5 h-5 text-orange-500 shrink-0 mt-0.5"/>
                    <div>
                      <div className="text-sm font-bold text-slate-900">100% Money-Back Guarantee</div>
                      <div className="text-xs text-slate-500">If you don't pass, you get a full refund.</div>
                    </div>
                  </div>
                </li>
              </ul>
              <Link href="/pricing?plan=pro" className="block w-full py-4 text-center bg-[#20B2AA] rounded-xl font-bold text-white hover:bg-[#1a9d96] transition-colors shadow-lg shadow-teal-500/20">Get 3-Month Access</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nursing Students <span className="text-[#20B2AA]">Love Us</span></h2>
              <p className="text-lg text-slate-600">Don&apos;t just take our word for it. Here is what students admitted to top programs have to say.</p>
            </div>
            <div className="hidden md:flex items-center gap-2 mt-4 md:mt-0">
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-900">4.8/5.0</div>
                <div className="text-sm text-slate-500">Based on 500+ Reviews</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div key={`review-${i}`} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div>
                  <StarRating count={5} size={16} />
                  <p className="text-slate-700 italic my-4">&quot;{review.text}&quot;</p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <AvatarPlaceholder index={i + 3} name={review.author} />
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{review.author}</div>
                    <div className="text-xs text-slate-500">{review.school}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-500">Everything you need to know about the TEAS 7.</p>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <FaqItem key={`faq-${i}`} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0F172A] text-slate-400 pt-16 pb-24 md:pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#20B2AA] rounded-lg flex items-center justify-center text-white font-bold">S</div>
                <span className="text-2xl font-bold text-white tracking-tight">StudyBuddy</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm mb-6">
                AI-powered TEAS 7 prep built by PhD & DNP nursing educators with 75+ years of combined experience. Pass guaranteed.
              </p>
              <div className="text-xs text-slate-600 leading-relaxed">
                © 2025 EdExpert LLC. All rights reserved. <br/>
                TEAS® is a registered trademark of the Assessment Technologies Institute.
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/diagnostic" className="hover:text-[#20B2AA] transition-colors">Free Diagnostic Test</Link></li>
                <li><Link href="/pricing" className="hover:text-[#20B2AA] transition-colors">Pricing</Link></li>
                <li><Link href="/states" className="hover:text-[#20B2AA] transition-colors">State Requirements</Link></li>
                <li><Link href="/about" className="hover:text-[#20B2AA] transition-colors">About Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Legal & Support</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/privacy" className="hover:text-[#20B2AA] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[#20B2AA] transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/refunds" className="hover:text-[#20B2AA] transition-colors">Refund Policy</Link></li>
                <li><a href="mailto:support@studybuddy.live" className="hover:text-[#20B2AA] transition-colors">support@studybuddy.live</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
