// components/chat/SalesBot.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SalesBot() {
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
          {/* UPDATED: Brand Colors (Teal) */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-[#20B2AA] to-[#18968F] p-5 text-white">
            <div className="relative shrink-0">
              <img src="/StudyBuddy_AI_tutor_Avatar.png" className="h-12 w-12 rounded-full border-2 border-white/30 bg-white object-cover" alt="AI Tutor" />
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#18968F] bg-[#10B981]"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-lg leading-tight">StudyBuddy</div>
              <div className="text-xs font-medium text-blue-50 opacity-90">TEAS 7 Expert • Online</div>
            </div>
            <button onClick={() => setIsOpen(false)} className="shrink-0 p-2 opacity-80 hover:bg-white/10 rounded-full hover:opacity-100 transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <div className="bg-[#F8FAFC] p-5">
            <div className="mb-5 rounded-2xl rounded-tl-none border border-slate-200 bg-white p-4 text-[15px] leading-relaxed text-slate-700 shadow-sm">
              <span className="block font-bold text-[#20B2AA] text-xs mb-1 uppercase tracking-wider">AI Tutor</span>
              Hi! 👋 Preparing for the TEAS 7? I can help you find your weak spots or check if you're ready.
            </div>
            
            <div className="flex flex-col gap-3">
              {/* UPDATED: Brand Colors */}
              <button onClick={() => router.push('/diagnostic')} className="group flex w-full items-center justify-between rounded-xl bg-[#20B2AA] px-5 py-4 text-left font-bold text-white shadow-md transition-all hover:bg-[#18968F] hover:shadow-lg hover:-translate-y-0.5">
                Start Free Diagnostic
                <span className="text-white/80 group-hover:translate-x-1 transition-transform">→</span>
              </button>
              
              <button onClick={() => { document.getElementById('pricing')?.scrollIntoView({behavior:'smooth'}); setIsOpen(false); }} className="w-full rounded-xl border-2 border-slate-200 bg-white px-5 py-3.5 text-center font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300">
                View Pricing
              </button>
            </div>
          </div>

          <div className="border-t border-slate-100 bg-white p-3 text-center">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {/* UPDATED: Amber accent */}
              <svg className="w-3 h-3 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              100% Pass Guarantee
            </span>
          </div>
        </div>
      )}

      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] ring-1 ring-slate-900/5 transition-all hover:scale-110 hover:shadow-[0_8px_40px_rgba(32,178,170,0.3)]"
        >
          <img src="/StudyBuddy_AI_tutor_Avatar.png" alt="Chat" className="h-full w-full rounded-full object-cover" />
          {/* UPDATED: Amber badge */}
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#F59E0B] text-[10px] font-bold text-white ring-2 ring-white animate-bounce">1</span>
        </button>
      )}
    </div>
  );
}