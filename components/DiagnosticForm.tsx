'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '@/lib/firebase'; // Ensure this path matches your firebase.ts location
import { Loader2, CheckCircle, ArrowRight } from 'lucide-react'; // Install lucide-react if needed, or replace with text
import { cn } from '@/lib/utils'; // Assuming you have this from shadcn, or I can provide a simple version

// --- 1. Zod Schema Definition ---
const diagnosticSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  examDate: z.string().refine((date) => new Date(date) > new Date(), {
    message: 'Exam date must be in the future',
  }),
  targetScore: z.coerce
    .number()
    .min(50, 'Score must be at least 50')
    .max(100, 'Score cannot exceed 100'),
  weakArea: z.enum(['science', 'math', 'english', 'reading'], {
    errorMap: () => ({ message: 'Please select your biggest challenge' }),
  }),
});

type DiagnosticFormData = z.infer<typeof diagnosticSchema>;

// --- 2. Component ---
export default function DiagnosticForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DiagnosticFormData>({
    resolver: zodResolver(diagnosticSchema),
  });

  const onSubmit = async (data: DiagnosticFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const db = getFirestore(app);
      
      // Save to Firestore 'leads' collection
      await addDoc(collection(db, 'leads'), {
        ...data,
        source: 'diagnostic_intro',
        createdAt: serverTimestamp(),
      });

      setIsSuccess(true);
      reset();
      
      // OPTIONAL: Redirect to the actual quiz or LearnWorlds after delay
      // router.push('/diagnostic/start');
      
    } catch (err) {
      console.error('Submission failed:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Success State ---
  if (isSuccess) {
    return (
      <div className="w-full max-w-md p-8 text-center bg-white rounded-2xl shadow-xl border border-teal-100">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 mb-6">
          <CheckCircle className="h-8 w-8 text-teal-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Profile Saved!</h3>
        <p className="text-slate-600 mb-8">
          We've customized your diagnostic path. Ready to see where you stand?
        </p>
        <button
          onClick={() => window.location.href = 'https://learn.studybuddy.live'} 
          className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
        >
          Start Diagnostic Test <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // --- Form State ---
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Free TEAS Diagnostic</h2>
        <p className="text-slate-500 mt-2">
          Tell us about your goals so our AI can personalize your assessment.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Email Field */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email Address
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder="student@example.com"
            className={cn(
              "w-full px-4 py-2.5 rounded-lg border bg-white focus:ring-2 focus:ring-teal-500/20 outline-none transition-all",
              errors.email ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-teal-500"
            )}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Exam Date */}
        <div className="space-y-1.5">
          <label htmlFor="examDate" className="block text-sm font-medium text-slate-700">
            When is your exam?
          </label>
          <input
            {...register('examDate')}
            type="date"
            id="examDate"
            className={cn(
              "w-full px-4 py-2.5 rounded-lg border bg-white focus:ring-2 focus:ring-teal-500/20 outline-none transition-all",
              errors.examDate ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-teal-500"
            )}
          />
          {errors.examDate && (
            <p className="text-sm text-red-500">{errors.examDate.message}</p>
          )}
        </div>

        {/* Target Score */}
        <div className="space-y-1.5">
          <label htmlFor="targetScore" className="block text-sm font-medium text-slate-700">
            Target Score (%)
          </label>
          <div className="relative">
            <input
              {...register('targetScore')}
              type="number"
              id="targetScore"
              placeholder="e.g. 85"
              className={cn(
                "w-full px-4 py-2.5 rounded-lg border bg-white focus:ring-2 focus:ring-teal-500/20 outline-none transition-all",
                errors.targetScore ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-teal-500"
              )}
            />
          </div>
          {errors.targetScore && (
            <p className="text-sm text-red-500">{errors.targetScore.message}</p>
          )}
        </div>

        {/* Weak Area */}
        <div className="space-y-1.5">
          <label htmlFor="weakArea" className="block text-sm font-medium text-slate-700">
            Biggest Challenge?
          </label>
          <select
            {...register('weakArea')}
            id="weakArea"
            className={cn(
              "w-full px-4 py-2.5 rounded-lg border bg-white focus:ring-2 focus:ring-teal-500/20 outline-none transition-all appearance-none",
              errors.weakArea ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-teal-500"
            )}
          >
            <option value="">Select a subject...</option>
            <option value="science">Science (A&P, Bio, Chem)</option>
            <option value="math">Math (Algebra, Fractions)</option>
            <option value="english">English & Language Usage</option>
            <option value="reading">Reading Comprehension</option>
          </select>
          {errors.weakArea && (
            <p className="text-sm text-red-500">{errors.weakArea.message}</p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg shadow-teal-600/20 transition-all flex items-center justify-center gap-2 mt-4"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Start Free Diagnostic'
          )}
        </button>
        
        <p className="text-xs text-center text-slate-400 mt-4">
          By starting, you agree to our Terms of Service.
        </p>
      </form>
    </div>
  );
}