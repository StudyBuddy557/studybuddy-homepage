'use client';
import { useEffect } from 'react';
import { trackPricingView, trackCheckoutClick } from '@/lib/analytics/tracker';
import { trackMetaViewContent, trackMetaInitiateCheckout } from '@/lib/pixels/meta';
import { trackTikTokViewContent, trackTikTokInitiateCheckout } from '@/lib/pixels/tiktok';
import { Check, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function PricingClient() {
  // Track pricing page view
  useEffect(() => {
    trackPricingView();
    trackMetaViewContent('Pricing Page', 24.99);
    trackTikTokViewContent('Pricing Page', 24.99);
  }, []);

  const handleCheckoutClick = (plan: 'basic' | 'pro', price: number, url: string) => {
    trackCheckoutClick(plan, price);
    trackMetaInitiateCheckout(plan, price);
    trackTikTokInitiateCheckout(plan, price);
    window.location.href = url;
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-slate-600">No hidden fees. Cancel anytime.</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
          {/* Basic Plan */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-200 shadow-xl">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Month-to-Month</p>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Basic</h3>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-5xl font-black text-slate-900">$24.99</span>
              <span className="text-slate-500">/mo</span>
            </div>
            <p className="text-slate-600 text-sm mb-6">Cancel anytime. No commitment.</p>
            
            <button
              onClick={() => handleCheckoutClick('basic', 24.99, 'https://buy.stripe.com/eVq7sKbtn7IR5ma5jhcjS05')}
              className="block w-full py-4 rounded-xl border-2 border-slate-200 text-center font-bold text-slate-700 hover:border-[#20B2AA] hover:text-[#20B2AA] transition-all mb-8"
            >
              Start Basic Plan
            </button>
            
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-700">
                <Check className="w-5 h-5 text-[#20B2AA] flex-shrink-0" /> 
                <span>Complete TEAS 7 Course (17 Chapters)</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <Check className="w-5 h-5 text-[#20B2AA] flex-shrink-0" /> 
                <span>350+ Video Lectures</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <Check className="w-5 h-5 text-[#20B2AA] flex-shrink-0" /> 
                <span>Practice Questions + Practice Exams</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <Check className="w-5 h-5 text-[#20B2AA] flex-shrink-0" /> 
                <span>5 Full-Length Practice Exams</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <Check className="w-5 h-5 text-[#20B2AA] flex-shrink-0" /> 
                <span>TEAS Knowledge In Action Videos</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <Check className="w-5 h-5 text-[#20B2AA] flex-shrink-0" /> 
                <span>Access on Any Device</span>
              </li>
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border-2 border-[#20B2AA] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#F59E0B] text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">Most Popular</div>
            
            <p className="text-sm font-bold text-[#20B2AA] uppercase tracking-wider mb-2">Pass Guaranteed</p>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Pro</h3>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-5xl font-black text-slate-900">$59</span>
              <span className="text-slate-500">/ 3 mo</span>
            </div>
            <p className="text-green-600 font-bold text-sm mb-6 bg-green-50 inline-block px-3 py-1 rounded-lg">Save $16 vs. Monthly</p>
            
            <button
              onClick={() => handleCheckoutClick('pro', 59, 'https://buy.stripe.com/bJe8wO6930gpdSG275cjS04')}
              className="block w-full py-4 rounded-xl bg-[#20B2AA] text-center font-bold text-white shadow-lg hover:bg-[#18968F] transition-all mb-8"
            >
              Get 3-Month Access
            </button>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#20B2AA] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Everything in Basic</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-[#20B2AA]/10 flex-shrink-0">
                  <Check className="w-4 h-4 text-[#20B2AA]" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">UNLIMITED AI Tutor</p>
                  <p className="text-sm text-slate-600">No daily limits. Ask anything, anytime.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-[#F59E0B]/10 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">100% Pass Guarantee*</p>
                  <p className="text-sm text-slate-600">Do the work, we take the risk. Pass or get every penny back.</p>
                </div>
              </li>
            </ul>
            
            <div className="mt-8 pt-6 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                *100% Pass Guarantee: Complete 80%+ of course + 1,000+ practice questions + Study 30+ days. Don't pass? Full $59 refund or 60 free days. <Link href="/pass-guarantee" className="text-[#20B2AA] hover:underline">View complete policy</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
```
