// app/diagnostic/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Check, AlertCircle, Loader2, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
// 👇 NEW IMPORTS FOR DIRECT FIRESTORE WRITE
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// ----------------------------------------------------------------------
// TYPES
// ----------------------------------------------------------------------

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: number;
  category: 'Reading' | 'Math' | 'Science' | 'English';
  question: string;
  options: Option[];
  correctAnswer: string;
  explanation: string;
}

// ----------------------------------------------------------------------
// DATA (8 Questions)
// ----------------------------------------------------------------------

const DIAGNOSTIC_QUESTIONS: Question[] = [
  // --- READING (2 Questions) ---
  {
    id: 1,
    category: 'Reading',
    question: 'What is the main purpose of a topic sentence in a paragraph?',
    options: [
      { id: 'A', text: 'To conclude the paragraph' },
      { id: 'B', text: 'To provide supporting details' },
      { id: 'C', text: 'To introduce the main idea' },
      { id: 'D', text: 'To create a transition' }
    ],
    correctAnswer: 'C',
    explanation: 'A topic sentence introduces the main idea of a paragraph. It acts as a roadmap, telling readers what the paragraph will be about.'
  },
  {
    id: 2,
    category: 'Reading',
    question: 'What is a primary source?',
    options: [
      { id: 'A', text: 'A textbook summary' },
      { id: 'B', text: 'An encyclopedia entry' },
      { id: 'C', text: 'A firsthand account or original document' },
      { id: 'D', text: 'A news article analysis' }
    ],
    correctAnswer: 'C',
    explanation: 'A primary source is a firsthand account created at the time of an event (e.g., diaries, photos). Textbooks and encyclopedias are secondary sources.'
  },

  // --- MATH (2 Questions) ---
  {
    id: 3,
    category: 'Math',
    question: 'Convert 2.5 liters to milliliters.',
    options: [
      { id: 'A', text: '25 mL' },
      { id: 'B', text: '250 mL' },
      { id: 'C', text: '2,500 mL' },
      { id: 'D', text: '25,000 mL' }
    ],
    correctAnswer: 'C',
    explanation: '1 Liter = 1,000 mL. Therefore, 2.5 × 1,000 = 2,500 mL.'
  },
  {
    id: 4,
    category: 'Math',
    question: 'Solve for x: 3x - 5 = 16',
    options: [
      { id: 'A', text: 'x = 3.6' },
      { id: 'B', text: 'x = 7' },
      { id: 'C', text: 'x = 5' },
      { id: 'D', text: 'x = 21' }
    ],
    correctAnswer: 'B',
    explanation: 'Add 5 to both sides: 3x = 21. Divide by 3: x = 7.'
  },

  // --- SCIENCE (2 Questions) ---
  {
    id: 5,
    category: 'Science',
    question: 'Which organelle is responsible for protein synthesis?',
    options: [
      { id: 'A', text: 'Mitochondria' },
      { id: 'B', text: 'Ribosome' },
      { id: 'C', text: 'Nucleus' },
      { id: 'D', text: 'Golgi apparatus' }
    ],
    correctAnswer: 'B',
    explanation: 'Ribosomes read mRNA and assemble amino acids into proteins. Mitochondria produce energy (ATP).'
  },
  {
    id: 6,
    category: 'Science',
    question: 'What is the pH range of normal human blood?',
    options: [
      { id: 'A', text: '6.85 - 6.95' },
      { id: 'B', text: '7.15 - 7.25' },
      { id: 'C', text: '7.35 - 7.45' },
      { id: 'D', text: '7.55 - 7.65' }
    ],
    correctAnswer: 'C',
    explanation: 'Normal blood pH is strictly regulated between 7.35 and 7.45. Below this is acidosis; above is alkalosis.'
  },

  // --- ENGLISH (2 Questions) ---
  {
    id: 7,
    category: 'English',
    question: 'Which sentence uses correct subject-verb agreement?',
    options: [
      { id: 'A', text: 'The group of students are studying.' },
      { id: 'B', text: 'The group of students is studying.' },
      { id: 'C', text: 'The group of students were studying.' },
      { id: 'D', text: 'The group of students have studied.' }
    ],
    correctAnswer: 'B',
    explanation: 'The subject "group" is a collective noun acting as a single unit, so it requires the singular verb "is".'
  },
  {
    id: 8,
    category: 'English',
    question: 'Which of the following sentences uses a comma correctly?',
    options: [
      { id: 'A', text: 'I went to the store, and I bought milk.' },
      { id: 'B', text: 'I went to the store and, I bought milk.' },
      { id: 'C', text: 'I went to the store, I bought milk.' },
      { id: 'D', text: 'I went to the store and I bought milk.' }
    ],
    correctAnswer: 'A',
    explanation: 'Use a comma before a coordinating conjunction (and, but, or) when it joins two independent clauses.'
  }
];

// ----------------------------------------------------------------------
// COMPONENT
// ----------------------------------------------------------------------

export default function DiagnosticQuiz() {
  const router = useRouter();
  
  // State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showWarning, setShowWarning] = useState(false);
  
  // Lead Capture State
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derived State
  const totalQuestions = DIAGNOSTIC_QUESTIONS.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const isFirstQuestion = currentQuestion === 0;
  
  const currentQ = DIAGNOSTIC_QUESTIONS[currentQuestion];
  const selectedAnswer = answers[currentQ.id];
  const hasAnsweredCurrent = selectedAnswer !== undefined && selectedAnswer !== '';

  // ----------------------------------------------------------------------
  // HANDLERS
  // ----------------------------------------------------------------------

  const handleAnswerSelect = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: optionId }));
    setShowWarning(false);
  };

  const handleNext = () => {
    if (!hasAnsweredCurrent) {
      setShowWarning(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!isLastQuestion) {
      setCurrentQuestion(prev => prev + 1);
      setShowWarning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (!isFirstQuestion) {
      setCurrentQuestion(prev => prev - 1);
      setShowWarning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Triggered when clicking "Submit Test" - Opens the Email Modal
  const handleInitialSubmit = () => {
    // Validation
    const unansweredQuestions = DIAGNOSTIC_QUESTIONS.filter(
      q => !answers[q.id] || answers[q.id] === ''
    );

    if (unansweredQuestions.length > 0) {
      alert(`Please answer all ${unansweredQuestions.length} remaining question(s) before submitting.`);
      const firstUnanswered = DIAGNOSTIC_QUESTIONS.findIndex(q => !answers[q.id]);
      if (firstUnanswered !== -1) setCurrentQuestion(firstUnanswered);
      return;
    }

    // Show Email Gate
    setShowEmailModal(true);
  };

  // Triggered inside the Modal - Saves data and Redirects
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Calculate Score
    let correctCount = 0;
    const results = DIAGNOSTIC_QUESTIONS.map(q => {
      const userAnswer = answers[q.id];
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) correctCount++;
      
      return {
        questionId: q.id,
        category: q.category,
        question: q.question,
        userAnswer: userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect: isCorrect,
        options: q.options,
        explanation: q.explanation
      };
    });

    const score = Math.round((correctCount / totalQuestions) * 100);

    const resultsData = {
      score,
      correctCount,
      totalQuestions,
      results,
      email, // Capture the email here
      timestamp: new Date().toISOString()
    };

    try {
      // ✅ DIRECT WRITE: This saves to Firestore immediately (Bypassing API errors)
      // This works because we set your Rules to "allow create: if true"
      const docRef = await addDoc(collection(db, 'diagnostics'), {
        ...resultsData,
        createdAt: serverTimestamp(), // Use server time for DB
        status: 'new'
      });
      console.log("Saved to Firestore with ID:", docRef.id);

      // ✅ LOCAL STORAGE: Keeps the Results page working
      localStorage.setItem('diagnosticResults', JSON.stringify(resultsData));
      
      // ✅ REDIRECT
      router.push('/diagnostic/results');

    } catch (error) {
      console.error('Error saving results:', error);
      // Fallback: Even if DB fails, let user see results via LocalStorage
      localStorage.setItem('diagnosticResults', JSON.stringify(resultsData));
      router.push('/diagnostic/results');
    }
  };

  const jumpToQuestion = (index: number) => {
    setCurrentQuestion(index);
    setShowWarning(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ----------------------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------------------

  return (
    <main className="min-h-screen bg-slate-50 pb-20 relative">
      
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#20B2AA] flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">SB</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-[#1E3A8A]">TEAS 7 Diagnostic</h1>
            </div>
            <div className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              Q{currentQuestion + 1} of {totalQuestions}
            </div>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-[#20B2AA] h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className={`max-w-4xl mx-auto px-4 py-6 sm:py-8 transition-opacity duration-300 ${showEmailModal ? 'opacity-30 pointer-events-none blur-sm' : ''}`}>
        
        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
          <div className="bg-[#1E3A8A]/5 border-b border-[#1E3A8A]/10 px-6 py-4 flex justify-between items-center">
            <span className="inline-block bg-[#1E3A8A] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md">
              {currentQ.category} Section
            </span>
          </div>

          <div className="p-5 sm:p-8">
            {showWarning && (
              <div className="mb-6 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 animate-pulse">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-900 text-sm">Please Select an Answer</p>
                </div>
              </div>
            )}

            <h2 className="text-xl sm:text-2xl font-bold text-[#1E3A8A] mb-8 leading-relaxed">
              {currentQ.question}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((option) => {
                const isSelected = selectedAnswer === option.id;
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    type="button"
                    className={cn(
                      "w-full text-left rounded-xl border-2 transition-all duration-200 relative group",
                      isSelected
                        ? "border-[#20B2AA] bg-[#20B2AA]/5 shadow-sm z-10"
                        : "border-slate-200 bg-white hover:border-[#20B2AA]/50 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center gap-4 p-4 sm:p-5">
                      <div
                        className={cn(
                          "flex items-center justify-center w-10 h-10 rounded-full shrink-0 font-bold text-sm transition-colors",
                          isSelected
                            ? "bg-[#20B2AA] text-white"
                            : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                        )}
                      >
                        {option.id}
                      </div>
                      <span className={cn(
                        "text-base sm:text-lg font-medium flex-1 transition-colors",
                        isSelected ? "text-[#1E3A8A]" : "text-slate-600"
                      )}>
                        {option.text}
                      </span>
                      {isSelected && (
                        <Check className="w-5 h-5 text-[#20B2AA] shrink-0 animate-in fade-in zoom-in duration-200" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-5">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handleBack}
                disabled={isFirstQuestion}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all text-sm",
                  isFirstQuestion
                    ? "opacity-0 pointer-events-none"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                )}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>

              {isLastQuestion ? (
                <button
                  onClick={handleInitialSubmit}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#20B2AA] text-white font-bold shadow-md hover:bg-[#18968F] transition-all hover:scale-105 active:scale-95"
                >
                  Analyze My Score
                  <Check className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#1E3A8A] text-white font-bold shadow-md hover:bg-[#152C6B] transition-all hover:scale-105 active:scale-95"
                >
                  Next Question
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navigator Grid */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            Question Overview
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {DIAGNOSTIC_QUESTIONS.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined && answers[q.id] !== '';
              const isCurrent = idx === currentQuestion;
              return (
                <button
                  key={q.id}
                  onClick={() => !showEmailModal && jumpToQuestion(idx)}
                  disabled={showEmailModal}
                  className={cn(
                    "aspect-square rounded-lg font-bold text-sm transition-all flex items-center justify-center",
                    isCurrent
                      ? "bg-[#1E3A8A] text-white ring-2 ring-offset-2 ring-[#1E3A8A]"
                      : isAnswered
                      ? "bg-[#20B2AA]/10 text-[#20B2AA]"
                      : "bg-slate-100 text-slate-400"
                  )}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* EMAIL CAPTURE MODAL */}
      {/* ---------------------------------------------------------------------- */}
      {showEmailModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#1E3A8A]/40 backdrop-blur-sm" />
          
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#20B2AA]/10 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-[#20B2AA]" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1E3A8A] mb-2">
                Your Results Are Ready!
              </h2>
              <p className="text-slate-600">
                Enter your email to unlock your detailed score report and get your personalized AI study plan.
              </p>
            </div>

            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-[#20B2AA] focus:ring-0 text-lg outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#20B2AA] text-white font-bold text-lg shadow-lg hover:bg-[#18968F] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Report...
                  </>
                ) : (
                  <>
                    Unlock My Results
                    <Check className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-xs text-center text-slate-400 mt-4">
                We'll never spam you. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}