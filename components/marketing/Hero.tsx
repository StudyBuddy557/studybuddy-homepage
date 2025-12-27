'use client';

import { useState } from 'react';
import { ArrowRight, Star, Sparkles } from 'lucide-react'; // Removed 'Play' icon since button is gone
import { motion } from 'framer-motion';
import QuizModal from './QuizModal'; 

export default function Hero() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <section className="relative pt-32 pb-20 w-full overflow-hidden">
      
      {/* 1. QUIZ MODAL */}
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

      {/* 2. BACKGROUND EFFECTS */}
      <div className="absolute inset-0 -z-30 bg-slate-50" />
      <div className="absolute top-[-20%] right-[-10%] -z-20 w-[800px] h-[800px] rounded-full bg-blue-600/10 blur-[120px] mix-blend-multiply" />
      <div className="absolute bottom-[-10%] left-[-10%] -z-20 w-[600px] h-[600px] rounded-full bg-amber-400/10 blur-[100px] mix-blend-multiply" />

      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
        
        {/* LEFT SIDE: Text & Buttons */}
        <div className="flex-1 text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 shadow-sm px-4 py-1.5 rounded-full mb-8">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-bold text-slate-600 uppercase">2026 TEAS 7 Edition</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Pass the TEAS 7<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800">
              Like It’s Nothing.
            </span>
          </h1>
          
          <p className="text-xl text-slate-500 mb-10 max-w-xl mx-auto lg:mx-0">
            The only AI-powered tutor that adapts to your brain. Stop memorizing. Start understanding.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
            <button 
              onClick={() => setIsQuizOpen(true)}
              className="px-8 py-4 bg-blue-900 text-white text-lg font-bold rounded-2xl shadow-xl hover:bg-blue-800 transition-all flex items-center justify-center gap-3"
            >
              Get My Free Study Plan <ArrowRight size={20} />
            </button>
            
            {/* REMOVED: "How it Works" Button was here */}
          </div>
        </div>

        {/* RIGHT SIDE: Video Card */}
        <div className="flex-1 w-full max-w-[650px]">
          <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-3 rounded-[2.5rem] shadow-2xl">
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] bg-slate-100 group">
              
              {/* VIDEO TAG - With Controls for Sound */}
              <video 
                className="w-full h-full object-cover scale-105" 
                autoPlay 
                loop 
                muted // Required for autoplay to work. Users click 'Volume' to unmute.
                playsInline
                controls // Adds the Volume/Play bar
              >
                 <source src="/ai-tutor.mp4" type="video/mp4" />
              </video>
              
              {/* Floating Status Cards */}
              <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/60 flex items-center gap-3 pointer-events-none">
                <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">AI Tutor Status</p>
                  <p className="text-sm font-bold text-blue-900">Online & Ready</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}