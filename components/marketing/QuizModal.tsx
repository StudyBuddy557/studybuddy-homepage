'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUESTIONS = [
  { id: 1, text: "Which subject makes you most nervous?", options: ["Math", "Science", "English", "Reading"] },
  { id: 2, text: "When is your exam date?", options: ["Less than 2 weeks", "1 Month", "3 Months+", "Not sure yet"] },
  { id: 3, text: "How do you prefer to learn?", options: ["Watching Videos", "Practice Questions", "Reading Guides", "1-on-1 Tutoring"] },
  { id: 4, text: "What is your goal score?", options: ["Pass (>65%)", "Competitive (>78%)", "Elite (>90%)", "Just need to pass!"] },
  { id: 5, text: "Have you taken the TEAS before?", options: ["No, first time", "Yes, once", "Yes, multiple times"] }
];

export default function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [step, setStep] = useState(0); // 0-4: Questions, 5: Email Form
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [step]: answer }));
    if (step < QUESTIONS.length - 1) {
      setStep(prev => prev + 1);
    } else {
      setStep(5); // Move to Email Capture
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);

    try {
      // Save Lead to Firestore
      await setDoc(doc(db, 'leads', email), {
        email,
        answers,
        createdAt: new Date().toISOString(),
        source: 'homepage_quiz'
      });
      
      // Close and Redirect (or show success)
      alert("Study Plan Generated! Check your email.");
      onClose();
    } catch (error) {
      console.error("Quiz Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative"
        >
          {/* Header */}
          <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
            <span className="font-bold text-sm tracking-wide uppercase">
              {step < 5 ? `Question ${step + 1} of 5` : 'Final Step'}
            </span>
            <button onClick={onClose} className="hover:bg-blue-500 p-1 rounded-full"><X size={20} /></button>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-slate-100 w-full">
            <div 
              className="h-full bg-amber-400 transition-all duration-300" 
              style={{ width: `${((step + 1) / 6) * 100}%` }} 
            />
          </div>

          {/* Content */}
          <div className="p-8">
            {step < 5 ? (
              // QUESTIONS
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">{QUESTIONS[step].text}</h2>
                <div className="grid gap-3">
                  {QUESTIONS[step].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className="w-full text-left p-4 rounded-xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-slate-700"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // EMAIL FORM
              <form onSubmit={handleSubmit} className="space-y-6 text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Plan is Ready!</h2>
                  <p className="text-slate-500">Enter your email to unlock your personalized TEAS 7 study roadmap.</p>
                </div>
                
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none text-lg"
                />
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Generating...' : 'Unlock My Plan'} <ArrowRight size={20} />
                </button>
                
                <p className="text-xs text-slate-400">No spam. Unsubscribe anytime.</p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}