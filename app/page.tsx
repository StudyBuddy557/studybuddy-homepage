import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, CheckCircle2, XCircle, Mail, FileText, Clock, BookOpen, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: '100% Pass Guarantee Policy | StudyBuddy TEAS 7 Prep',
  description: 'StudyBuddy\'s 100% Pass Guarantee: Complete the course requirements and pass your TEAS 7 or get a full $59 refund or 60 days free extended access.',
  alternates: {
    canonical: 'https://studybuddy.live/pass-guarantee',
  },
};

export default function PassGuaranteePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-[#20B2AA] hover:text-[#1a9d96] font-medium text-sm">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#20B2AA] to-[#1a9d96] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            StudyBuddy 100% Pass Guarantee
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            We share the risk with you. Do the work, and we guarantee results.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        
        {/* The Promise */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#20B2AA]/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#20B2AA]" />
              </div>
              The Promise
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              We are so confident in our <strong>Pro Plan</strong> that we share the risk with you. If you put in the work and don&apos;t pass your ATI TEAS 7 exam, we will refund <strong>100% of your $59 fee</strong> OR provide <strong>60 days of free extended access</strong>—your choice.
            </p>
          </div>
        </section>

        {/* Qualification Requirements */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-amber-600" />
            </div>
            To Qualify for a Refund
          </h2>
          <p className="text-slate-600 mb-6">
            You must meet the following &quot;Good Faith&quot; study requirements before taking your official exam:
          </p>
          
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#20B2AA]/10 rounded-xl flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6 text-[#20B2AA]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">1. Course Completion</h3>
                  <p className="text-slate-600">
                    You must have completed at least <strong>80% of the StudyBuddy course content</strong> (marked as complete in your dashboard).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#20B2AA]/10 rounded-xl flex items-center justify-center shrink-0">
                  <HelpCircle className="w-6 h-6 text-[#20B2AA]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">2. Practice Volume</h3>
                  <p className="text-slate-600">
                    You must have answered at least <strong>1,000 unique practice questions</strong> within the platform.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#20B2AA]/10 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-[#20B2AA]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">3. Study Duration</h3>
                  <p className="text-slate-600">
                    You must have been an active user for at least <strong>30 days</strong> prior to your exam date. (This ensures you didn&apos;t just cram for 48 hours).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Redeem */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            How to Redeem
          </h2>
          
          <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
            <ol className="space-y-6">
              <li className="flex gap-4">
                <div className="w-8 h-8 bg-[#20B2AA] text-white rounded-full flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <div>
                  <p className="text-slate-700">
                    Send an email to <a href="mailto:support@studybuddy.live" className="text-[#20B2AA] font-semibold hover:underline">support@studybuddy.live</a> within <strong>30 days</strong> of your official exam date.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 bg-[#20B2AA] text-white rounded-full flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <div>
                  <p className="text-slate-700">
                    Attach a <strong>screenshot or PDF</strong> of your official ATI TEAS score report showing a failing grade (or a score below your program&apos;s required cutoff).
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 bg-[#20B2AA] text-white rounded-full flex items-center justify-center font-bold shrink-0">
                  3
                </div>
                <div>
                  <p className="text-slate-700">
                    Use the subject line: <strong>&quot;Pass Guarantee Claim - [Your Name]&quot;</strong>
                  </p>
                </div>
              </li>
            </ol>
            
            <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-sm text-slate-600">
                <strong>Processing Time:</strong> We will verify your account activity and respond within 5 business days. Refunds are processed to your original payment method within 7-10 business days.
              </p>
            </div>
          </div>
        </section>

        {/* Exclusions */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            Exclusions
          </h2>
          
          <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
            <ul className="space-y-4">
              <li className="flex gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-slate-700">
                  The guarantee applies only to the <strong>Pro (3-Month) plan</strong>. Monthly Basic plans are eligible for our standard 3-day satisfaction guarantee only.
                </p>
              </li>
              <li className="flex gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-slate-700">
                  Users who studied for less than 30 days are not eligible for the cash refund but may be granted extended access at our discretion.
                </p>
              </li>
              <li className="flex gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-slate-700">
                  Claims must be submitted within 30 days of your exam date. Late submissions will not be accepted.
                </p>
              </li>
              <li className="flex gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-slate-700">
                  The guarantee is limited to one claim per customer.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* Summary Box */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-[#20B2AA]/5 to-[#20B2AA]/10 rounded-2xl p-8 border border-[#20B2AA]/20">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Summary</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-[#20B2AA]">80%</div>
                <div className="text-sm text-slate-600">Course Completion</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-[#20B2AA]">1,000+</div>
                <div className="text-sm text-slate-600">Practice Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-[#20B2AA]">30+</div>
                <div className="text-sm text-slate-600">Days of Study</div>
              </div>
            </div>
            <p className="text-center text-slate-600 mt-6">
              Meet these requirements, don&apos;t pass → <strong>Full $59 refund or 60 free days</strong>
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Start Risk-Free?</h3>
          <p className="text-slate-600 mb-8">
            Join thousands of students who passed their TEAS 7 with StudyBuddy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/pricing?plan=pro" 
              className="bg-[#20B2AA] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1a9d96] transition-colors shadow-lg shadow-teal-500/20"
            >
              Get Pro Plan with Pass Guarantee
            </Link>
            <Link 
              href="/diagnostic" 
              className="bg-white text-slate-700 px-8 py-4 rounded-xl font-bold border-2 border-slate-200 hover:border-slate-300 transition-colors"
            >
              Take Free Diagnostic First
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm">
          <p>© 2025 EdExpert LLC. All rights reserved.</p>
          <p className="mt-2">
            Questions? Email us at <a href="mailto:support@studybuddy.live" className="text-[#20B2AA] hover:underline">support@studybuddy.live</a>
          </p>
        </div>
      </footer>
    </div>
  );
}