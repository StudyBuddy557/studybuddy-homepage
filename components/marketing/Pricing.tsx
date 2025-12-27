'use client';

import { Check, X, ShieldCheck, Sparkles } from 'lucide-react';

// ✅ UPDATED: Your Live Stripe Payment Links
const CHECKOUT_URLS = {
  BASIC: "https://buy.stripe.com/eVq7sKbtn7IR5ma5jhcjS05",
  PRO: "https://buy.stripe.com/bJe8wO6930gpdSG275cjS04",
};

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decorations (Premium Glow) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Stop failing the TEAS. Start studying smarter with the only AI-powered prep that adapts to you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* OPTION 1: MONTHLY (The "Anchor") */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col hover:border-slate-300 transition-all">
            <div className="mb-6">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">Flexible Start</span>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">Monthly Plan</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-5xl font-extrabold text-slate-900">$24.99</span>
                <span className="text-slate-500 ml-2 font-medium">/mo</span>
              </div>
              <p className="text-sm text-slate-400 mt-2">Cancel anytime in your dashboard.</p>
            </div>

            <div className="flex-grow space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">Full TEAS 7 Course (Videos + Notes)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">4,000+ Practice Questions</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">Mobile App Access</span>
              </div>
              
              {/* LIMITATIONS */}
              <div className="py-2 border-t border-dashed border-slate-200 my-2"></div>
              
              <div className="flex items-start gap-3 opacity-60">
                <Check className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-slate-500 text-sm">Limited AI Tutor (5 questions/day)</span>
              </div>
              <div className="flex items-start gap-3 opacity-50">
                <X className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm line-through decoration-slate-400">100% Pass Guarantee</span>
              </div>
              <div className="flex items-start gap-3 opacity-50">
                <X className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm line-through decoration-slate-400">Priority Support</span>
              </div>
            </div>

            <a 
              href={CHECKOUT_URLS.BASIC}
              className="w-full block text-center py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all"
            >
              Start Monthly Plan
            </a>
          </div>

          {/* OPTION 2: TEAS PASSER PRO (The "Winner") */}
          <div className="bg-white rounded-3xl p-8 border-2 border-blue-600 shadow-2xl relative flex flex-col transform md:-translate-y-4">
            
            {/* BADGE */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg flex items-center gap-2">
              <Sparkles size={12} fill="currentColor" /> Most Popular
            </div>

            <div className="mb-6">
              <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">Total Protection</span>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">TEAS Passer Pro</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-5xl font-extrabold text-slate-900">$59</span>
                <span className="text-slate-500 ml-2 font-medium">/3 months</span>
              </div>
              <p className="text-sm text-green-600 font-bold mt-2 bg-green-50 inline-block px-2 py-1 rounded-lg">
                Save $16 vs. Monthly
              </p>
            </div>

            <div className="flex-grow space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-slate-800 font-medium text-sm">Everything in Core Course</span>
              </div>

              {/* GOLD FEATURES */}
              <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg -mx-3 border border-blue-100">
                <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5 fill-blue-600/20" />
                <div>
                  <span className="text-blue-900 font-bold text-sm block">UNLIMITED AI Tutor (Gold Status)</span>
                  <span className="text-blue-600 text-xs">No daily limits. Ask anything.</span>
                </div>
              </div>

              {/* GUARANTEE WITH ASTERISK */}
              <div className="flex items-start gap-3 bg-emerald-50 p-3 rounded-lg -mx-3 border border-emerald-100">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 fill-emerald-600/20" />
                <div>
                  <span className="text-emerald-900 font-bold text-sm block">100% Pass Guarantee*</span>
                  <span className="text-emerald-600 text-xs">Pass or get a full refund.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">Priority VIP Support (Skip the line)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">One-time payment (No recurring bills)</span>
              </div>
            </div>

            <a 
              href={CHECKOUT_URLS.PRO}
              className="w-full block text-center py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 hover:shadow-lg transition-all shadow-blue-200"
            >
              Get 3-Month Access
            </a>
            
            {/* LEGAL FOOTNOTE */}
            <p className="text-[10px] text-center text-slate-400 mt-4 leading-tight">
              *Terms apply. Requires 90% course completion & official score report.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}