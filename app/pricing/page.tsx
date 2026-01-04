import type { Metadata } from 'next';
import { Check, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { buildJsonLdForPage } from '@/lib/schema/render';
import { findPageMapping } from '@/lib/teas/find-page';


export const metadata: Metadata = {
  title: 'Pricing & Plans | StudyBuddy',
  description: 'Affordable TEAS 7 prep with unlimited AI tutoring. Monthly and quarterly plans with 100% pass guarantee.',
};

export default function PricingPage() {
  const mapping = findPageMapping('/pricing');
  const schemaEngineJson = mapping ? buildJsonLdForPage('course', { mapping }) : null;

  // AEO: Product Schema 
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'StudyBuddy TEAS Prep Pro',
    description: 'Unlimited AI tutoring and TEAS 7 course access.',
    offers: {
      '@type': 'Offer',
      price: '59.00',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31',
      availability: 'https://schema.org/InStock'
    }
  };

  return (
    <>
      {schemaEngineJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <main className="min-h-screen bg-slate-50 pt-32 pb-20 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-slate-600">No hidden fees. Cancel anytime.</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
            {/* Reusing the styling from Home for consistency */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-200 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Basic Plan</h3>
                <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-5xl font-black text-slate-900">$24.99</span>
                    <span className="text-slate-500">/mo</span>
                </div>
                <a href="https://buy.stripe.com/eVq7sKbtn7IR5ma5jhcjS05" className="block w-full py-4 rounded-xl border-2 border-slate-200 text-center font-bold text-slate-700 hover:border-[#20B2AA] hover:text-[#20B2AA] transition-all mb-8">
                    Get Started
                </a>
                <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-slate-700">
                        <Check className="w-5 h-5 text-[#20B2AA]" /> All 4,000+ Questions
                    </li>
                    <li className="flex items-center gap-3 text-slate-700">
                        <Check className="w-5 h-5 text-[#20B2AA]" /> Video Library
                    </li>
                </ul>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border-2 border-[#20B2AA] shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 bg-[#F59E0B] text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">Most Popular</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Pro Plan</h3>
                <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-5xl font-black text-slate-900">$59</span>
                    <span className="text-slate-500">/3 mo</span>
                </div>
                <p className="text-green-600 font-bold text-sm mb-6 bg-green-50 inline-block px-3 py-1 rounded-lg">Save $16 vs Monthly</p>
                
                <a href="https://buy.stripe.com/bJe8wO6930gpdSG275cjS04" className="block w-full py-4 rounded-xl bg-[#20B2AA] text-center font-bold text-white shadow-lg hover:bg-[#18968F] transition-all mb-8">
                    Get Pro Access
                </a>
                
                <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-slate-900 font-bold">
                        <div className="p-1 rounded-full bg-[#20B2AA]/10"><Check className="w-4 h-4 text-[#20B2AA]" /></div>
                        Unlimited AI Tutor
                    </li>
                    <li className="flex items-center gap-3 text-slate-900 font-bold">
                        <div className="p-1 rounded-full bg-[#F59E0B]/10"><ShieldCheck className="w-4 h-4 text-[#F59E0B]" /></div>
                        100% Pass Guarantee
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </main>
    </>
  );
}