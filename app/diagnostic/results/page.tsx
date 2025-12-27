'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Brain, TrendingUp, ArrowRight, Filter, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------
// TYPES
// ----------------------------------------------------------------------

interface QuestionResult {
  questionId: number;
  category: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  options: { id: string; text: string }[];
  explanation: string;
}

interface DiagnosticResults {
  score: number;
  correctCount: number;
  totalQuestions: number;
  results: QuestionResult[];
  timestamp: string;
}

// ----------------------------------------------------------------------
// CONFIGURATION
// ----------------------------------------------------------------------

const LINKS = {
  // TEAS Pro (Most Popular)
  CHECKOUT_PRO: 'https://learn.studybuddy.live/subscription/59-3-months?site_template_id=67e1717114d4688062090ad2',
  
  // TEAS Core
  CHECKOUT_CORE: 'https://learn.studybuddy.live/checkout?product_id=TEAS_CORE', 
};

export default function DiagnosticResults() {
  const router = useRouter();
  
  // State
  const [results, setResults] = useState<DiagnosticResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterIncorrect, setFilterIncorrect] = useState(false);

  // ----------------------------------------------------------------------
  // EFFECTS & LOGIC
  // ----------------------------------------------------------------------

  useEffect(() => {
    // 1. Try localStorage (preferred)
    let storedResults = localStorage.getItem('diagnosticResults');
    
    // 2. Fallback to sessionStorage
    if (!storedResults) {
      storedResults = sessionStorage.getItem('diagnosticResults');
    }
    
    if (!storedResults) {
      router.replace('/diagnostic');
      return;
    }

    try {
      const parsedResults: DiagnosticResults = JSON.parse(storedResults);
      if (!parsedResults.results?.length) throw new Error('Empty results');
      setResults(parsedResults);
    } catch (error) {
      console.error('Failed to parse diagnostic results:', error);
      router.replace('/diagnostic');
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Memoize Category Scores
  const categoryScores = useMemo(() => {
    if (!results) return {};
    const categories: Record<string, { correct: number; total: number }> = {};
    
    results.results.forEach(result => {
      if (!categories[result.category]) {
        categories[result.category] = { correct: 0, total: 0 };
      }
      categories[result.category].total++;
      if (result.isCorrect) {
        categories[result.category].correct++;
      }
    });
    return categories;
  }, [results]);

  // Filter Logic
  const visibleQuestions = useMemo(() => {
    if (!results) return [];
    if (filterIncorrect) {
      return results.results.filter(r => !r.isCorrect);
    }
    return results.results;
  }, [results, filterIncorrect]);

  // ----------------------------------------------------------------------
  // HELPERS
  // ----------------------------------------------------------------------

  const getScoreColor = (percentage: number) => {
    if (percentage >= 75) return 'text-[#10B981]'; // Brand Green
    if (percentage >= 60) return 'text-[#F59E0B]'; // Brand Amber
    return 'text-red-600';
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 75) return 'bg-green-50 border-green-200';
    if (percentage >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  // ----------------------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------------------

  if (loading || !results) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#20B2AA] mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Analyzing your performance...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#20B2AA] text-white mb-6 shadow-md">
            {results.score >= 75 ? (
              <CheckCircle className="w-10 h-10" />
            ) : (
              <TrendingUp className="w-10 h-10" />
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#1E3A8A] mb-4 tracking-tight">
            Diagnostic Results
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Here is your breakdown. We've identified your weak spots—now let's fix them with your AI Tutor.
          </p>
        </div>

        {/* SCORE CARD */}
        <div className={cn("rounded-2xl border-2 p-8 mb-10 transition-colors", getScoreBgColor(results.score))}>
          <div className="text-center">
            <div className={cn("text-7xl md:text-8xl font-black mb-4 tracking-tighter", getScoreColor(results.score))}>
              {results.score}%
            </div>
            <p className="text-lg font-bold text-slate-700 mb-6">
              {results.correctCount} correct out of {results.totalQuestions}
            </p>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 max-w-2xl mx-auto border border-black/5">
              {results.score >= 75 ? (
                <p className="text-[#10B981] font-bold text-lg flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  You're on track! With focused practice, you'll crush the TEAS.
                </p>
              ) : results.score >= 60 ? (
                <p className="text-[#F59E0B] font-bold text-lg flex items-center justify-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Good start! Focus on your weak categories to boost your score.
                </p>
              ) : (
                <p className="text-red-600 font-bold text-lg flex items-center justify-center gap-2">
                  <Brain className="w-5 h-5" />
                  Don't panic. Our AI Tutor is built to help students starting exactly here.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* CATEGORY BREAKDOWN */}
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 mb-10">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">Performance by Category</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {Object.entries(categoryScores).map(([category, data]) => {
              const percentage = Math.round((data.correct / data.total) * 100);
              return (
                <div key={category} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-slate-900">{category}</span>
                    <span className={cn("text-xl font-bold", getScoreColor(percentage))}>
                      {percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 mb-2">
                    <div 
                      className={cn("h-2.5 rounded-full transition-all duration-1000", 
                        percentage >= 75 ? 'bg-[#10B981]' : 
                        percentage >= 60 ? 'bg-[#F59E0B]' : 
                        'bg-red-500'
                      )}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 font-medium text-right">
                    {data.correct}/{data.total} Correct
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* DETAILED ANALYSIS */}
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#1E3A8A] mb-1">Detailed Analysis</h2>
              <p className="text-slate-500">Review your answers and read the AI explanations.</p>
            </div>
            
            {/* Filter Toggle */}
            <button
              onClick={() => setFilterIncorrect(!filterIncorrect)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg font-bold text-sm transition-all border-2",
                filterIncorrect 
                  ? "bg-red-50 border-red-200 text-red-700" 
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
              )}
            >
              <Filter className="w-4 h-4" />
              {filterIncorrect ? "Showing Incorrect Only" : "Show All Questions"}
            </button>
          </div>
          
          <div className="space-y-6">
            {visibleQuestions.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-500 font-medium">No incorrect answers found! Great job! 🎉</p>
                <button 
                  onClick={() => setFilterIncorrect(false)}
                  className="mt-4 text-[#20B2AA] font-bold hover:underline"
                >
                  View all questions
                </button>
              </div>
            ) : (
              visibleQuestions.map((result, index) => {
                const userOption = result.options.find(opt => opt.id === result.userAnswer);
                const correctOption = result.options.find(opt => opt.id === result.correctAnswer);

                return (
                  <div 
                    key={result.questionId} 
                    className={cn(
                      "border-2 rounded-xl p-5 md:p-6 transition-colors",
                      result.isCorrect 
                        ? 'border-green-100 bg-white' 
                        : 'border-red-100 bg-red-50/10'
                    )}
                  >
                    <div className="flex gap-4">
                      {/* Status Icon */}
                      <div className="hidden sm:flex shrink-0">
                        {result.isCorrect ? (
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-[#10B981]">
                            <CheckCircle className="w-6 h-6" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                            <XCircle className="w-6 h-6" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Meta Tags */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                            {result.category}
                          </span>
                          {!result.isCorrect && (
                            <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 bg-red-100 px-2.5 py-1 rounded-md">
                              Incorrect
                            </span>
                          )}
                        </div>

                        {/* Question Text */}
                        <h3 className="text-lg font-bold text-[#1E3A8A] mb-4 leading-relaxed">
                          {result.question}
                        </h3>

                        {/* Answers Grid */}
                        <div className="grid gap-3 mb-4">
                          {!result.isCorrect && (
                            <div className="p-3 bg-red-100/50 border border-red-200 rounded-lg flex gap-3 items-start">
                              <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="block text-xs font-bold text-red-800 uppercase mb-0.5">Your Answer</span>
                                <span className="text-red-900 font-medium">{userOption?.text || result.userAnswer}</span>
                              </div>
                            </div>
                          )}
                          
                          <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex gap-3 items-start">
                            <CheckCircle className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                            <div>
                              <span className="block text-xs font-bold text-green-800 uppercase mb-0.5">Correct Answer</span>
                              <span className="text-green-900 font-medium">{correctOption?.text || result.correctAnswer}</span>
                            </div>
                          </div>
                        </div>

                        {/* Explanation */}
                        <div className="bg-[#2563EB]/5 border border-[#2563EB]/10 rounded-lg p-4">
                          <div className="flex gap-2 mb-1">
                            <Brain className="w-4 h-4 text-[#2563EB]" />
                            <span className="text-xs font-bold text-[#2563EB] uppercase">AI Tutor Explanation</span>
                          </div>
                          <p className="text-sm text-slate-700 leading-relaxed">
                            {result.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* CTA FOOTER */}
        <div className="bg-gradient-to-br from-[#20B2AA] to-[#18968F] rounded-2xl p-8 md:p-12 text-center text-white shadow-xl mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to improve your score?
          </h2>
          <p className="text-blue-50 text-lg mb-8 max-w-xl mx-auto">
            Get a personalized study plan based on these results. 
            Includes unlimited AI tutoring and our 100% Pass Guarantee.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a 
              href={LINKS.CHECKOUT_PRO}
              className="flex-1 bg-white text-[#18968F] font-bold py-4 px-8 rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Start Study Plan
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          {/* UPDATED FOOTER TEXT - Removed "30-day money-back" */}
          <p className="mt-4 text-sm text-blue-100/80 font-medium">
            Pass Guarantee included with Pro • Cancel anytime
          </p>
        </div>

        {/* SECONDARY ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              localStorage.removeItem('diagnosticResults');
              sessionStorage.removeItem('diagnosticResults');
              router.push('/diagnostic');
            }}
            className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-slate-500 font-medium hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retake Diagnostic
          </button>
        </div>

      </div>
    </main>
  );
}