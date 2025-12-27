'use client';

import { useState, useCallback } from 'react';

interface GapCalculatorProps {
  targetScore?: number;
  schoolName?: string;
}

export default function GapCalculator({ 
  targetScore = 78, 
  schoolName 
}: GapCalculatorProps) {
  const [userScore, setUserScore] = useState<number>(65);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  
  const gap = targetScore - userScore;
  const isShort = gap > 0;
  
  const handleScoreChange = useCallback((value: number) => {
    setUserScore(value);
    if (!hasInteracted) setHasInteracted(true);
  }, [hasInteracted]);

  const getGapMessage = () => {
    if (gap <= 0) {
      return {
        headline: "You're in the Safe Zone!",
        subtext: "Keep your momentum going. Consistent practice locks in your score.",
        theme: 'success' as const,
      };
    }
    if (gap <= 5) {
      return {
        headline: `Almost there! Just ${gap} points to go.`,
        subtext: "Most students close this gap in 1 week with focused practice.",
        theme: 'warning' as const,
      };
    }
    if (gap <= 15) {
      return {
        headline: `You're ${gap} points short${schoolName ? ` of ${schoolName}'s requirement` : ''}.`,
        subtext: "Most students close this gap in 2-3 weeks with our practice exams.",
        theme: 'danger' as const,
      };
    }
    return {
      headline: `You need ${gap} more points to hit your target.`,
      subtext: "Don't worry—our structured program is designed for exactly this. 4-6 weeks of focused study can get you there.",
      theme: 'danger' as const,
    };
  };

  const message = getGapMessage();

  const themeStyles = {
    success: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-900',
      sub: 'text-emerald-700',
      bar: 'bg-emerald-500',
      icon: '✓',
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-900',
      sub: 'text-amber-700',
      bar: 'bg-amber-500',
      icon: '⚡',
    },
    danger: {
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      text: 'text-rose-900',
      sub: 'text-rose-700',
      bar: 'bg-rose-500',
      icon: '!',
    },
  };

  const theme = themeStyles[message.theme];

  return (
    <div className="my-12 max-w-xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-xl font-display font-bold text-slate-900 mb-1">
          📊 TEAS Score Gap Analysis
        </h3>
        <p className="text-sm text-slate-500">
          Visualize your path to acceptance
        </p>
      </div>

      <div className="p-6 space-y-8">
        {/* Slider Section */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <label htmlFor="score-input" className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
              Your Current Practice Score
            </label>
            <div className="text-3xl font-bold text-blue-600 font-display">
              {userScore}<span className="text-lg text-slate-400 font-sans ml-1">%</span>
            </div>
          </div>
          
          <input
            id="score-input"
            type="range"
            min={0}
            max={100}
            value={userScore}
            onChange={(e) => handleScoreChange(Number(e.target.value))}
            className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        {/* Visualization */}
        <div className="relative pt-6 pb-2">
          <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
            <span>Start</span>
            <span>Target: {targetScore}%</span>
            <span>Max</span>
          </div>
          <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
            {/* User Progress */}
            <div
              className={`absolute left-0 top-0 h-full transition-all duration-500 ease-out ${theme.bar}`}
              style={{ width: `${Math.min(userScore, 100)}%` }}
            />
            {/* Target Marker */}
            <div
              className="absolute top-0 h-full w-0.5 bg-slate-900 z-10"
              style={{ left: `${targetScore}%` }}
            />
          </div>
        </div>

        {/* Dynamic Message Card */}
        <div className={`rounded-xl p-5 ${theme.bg} border ${theme.border} transition-colors duration-300`}>
          <div className="flex gap-4">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full ${theme.bg.replace('50', '200')} flex items-center justify-center text-lg font-bold`}>
              {theme.icon}
            </div>
            <div>
              <h4 className={`font-bold ${theme.text} text-lg mb-1`}>
                {message.headline}
              </h4>
              <p className={`text-sm ${theme.sub} leading-relaxed`}>
                {message.subtext}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href="#"
          className="group block w-full py-4 bg-slate-900 hover:bg-blue-600 text-white text-center font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
        >
          {isShort ? 'Get Your Personal Study Plan' : 'Lock In Your Score Now'} 
          <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
}