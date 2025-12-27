'use client';

import { CheckCircle2, Target, Trophy } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "1. Take the Diagnostic",
      description: "Start with a free practice test. Our AI analyzes your strengths and weak spots instantly."
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-blue-600" />,
      title: "2. Get Your Custom Plan",
      description: "Stop wasting time. We build a daily study schedule that focuses ONLY on what you need to learn."
    },
    {
      icon: <Trophy className="w-8 h-8 text-blue-600" />,
      title: "3. Pass with Confidence",
      description: "Practice with realistic exam simulations until you are hitting 80%+ consistently."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
          How StudyBuddy Works
        </h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          A simple, science-backed path to your nursing school acceptance letter.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {/* CONNECTING LINE (Visible on Desktop) */}
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 -z-10" />

        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center group">
            <div className="w-24 h-24 bg-white border-4 border-blue-50 rounded-full flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
            <p className="text-slate-500 leading-relaxed max-w-xs">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}