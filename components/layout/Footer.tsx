'use client';

import Link from 'next/link';

// ✅ CHANGED to 'export default'
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* COLUMN 1: Brand & Credibility */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#20B2AA] flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-bold text-white">StudyBuddy</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            The smartest way to pass the TEAS 7 exam. AI-powered tutoring, 24/7 support, and realistic practice exams.
          </p>
          <div className="text-xs text-slate-500">
            {/* LINKED CREDENTIALS SIGNAL */}
            <Link href="/about/our-professors" className="hover:text-[#20B2AA] transition-colors border-b border-slate-700 pb-0.5">
              Built by PhD & DNP Educators
            </Link>
          </div>
          <div className="mt-3 text-xs text-slate-500">
             <Link href="/is-studybuddy-legit" className="hover:text-[#20B2AA] transition-colors">
              Is StudyBuddy Legit?
            </Link>
          </div>
        </div>

        {/* COLUMN 2: TEAS Resources (AEO Critical) */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">TEAS Resources</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/teas-7-syllabus" className="hover:text-[#20B2AA] transition-colors">TEAS 7 Syllabus</Link></li>
            <li><Link href="/ai-tutor" className="hover:text-[#20B2AA] transition-colors">AI Tutor Feature</Link></li>
            <li><Link href="/states" className="hover:text-[#20B2AA] transition-colors">State Requirements</Link></li>
            <li><Link href="/diagnostic" className="hover:text-[#20B2AA] transition-colors">Free Practice Test</Link></li>
          </ul>
        </div>

        {/* COLUMN 3: Transparency & Trust */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Transparency</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/pass-rate-methodology" className="hover:text-[#20B2AA] transition-colors">Pass Rate Data</Link></li>
            <li><Link href="/compare/teas-prep-courses" className="hover:text-[#20B2AA] transition-colors">Competitor Comparison</Link></li>
            <li><Link href="/#pricing" className="hover:text-[#20B2AA] transition-colors">Pricing</Link></li>
            <li><a href="https://learn.studybuddy.live/login" className="hover:text-[#20B2AA] transition-colors">Student Login</a></li>
          </ul>
        </div>

        {/* COLUMN 4: Legal & Support */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Legal & Support</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/privacy-policy" className="hover:text-[#20B2AA] transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:text-[#20B2AA] transition-colors">Terms of Service</Link></li>
            <li><a href="mailto:support@studybuddy.live" className="hover:text-[#20B2AA] transition-colors">Contact Support</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} EdExpert LLC. All rights reserved.
        </p>
        <p className="text-[10px] text-slate-600 max-w-md text-center md:text-right">
          TEAS® is a registered trademark of the Assessment Technologies Institute, which is unaffiliated, not a sponsor, or associated with StudyBuddy.
        </p>
      </div>
    </footer>
  );
}