import { Check, X, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ✅ UPDATED: Your Live Stripe Payment Links
const CHECKOUT_URLS = {
  BASIC: "https://buy.stripe.com/eVq7sKbtn7IR5ma5jhcjS05",
  PRO: "https://buy.stripe.com/bJe8wO6930gpdSG275cjS04",
};

export function PricingTable() {
  return (
    <section className="py-16 bg-white" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Transparent Pricing</h2>
          <p className="text-slate-500 text-lg">One month to prep. Or lock in savings with our 3-month pass.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
          
          {/* === BASIC PLAN ($24.99/mo) === */}
          <div className="border border-slate-200 rounded-3xl p-8 bg-white shadow-sm relative">
            <div className="mb-4">
              <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Month-to-Month</span>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">Basic</h3>
            </div>
            
            <div className="mb-2 flex items-baseline gap-1">
              <span className="text-5xl font-extrabold text-slate-900">$24.99</span>
              <span className="text-slate-500 font-medium">/mo</span>
            </div>
            <p className="text-slate-400 text-sm mb-8">Cancel anytime. No commitment.</p>

            <div className="space-y-5 mb-8">
              <Feature text="Complete TEAS 7 Course (17 Chapters)" />
              <Feature text="350+ Video Lectures" />
              <Feature text="Practice Questions + Practice Exams" />
              <Feature text="5 Full-Length Practice Exams" />
              <Feature text="TEAS Knowledge In Action Videos" />
              <Feature text="Access on Any Device" />
              <Feature text="10 AI questions/day limit" negative />
              <Feature text="No Pass Guarantee" negative />
            </div>

            <Button asChild variant="outline" size="lg" className="w-full h-12 rounded-xl text-lg font-semibold border-slate-300 hover:bg-slate-50">
              <a href={CHECKOUT_URLS.BASIC}>Start Basic Plan</a>
            </Button>
          </div>

          {/* === PRO PLAN ($59 / 3 months) === */}
          <div className="border-2 border-[#20B2AA] rounded-3xl p-8 bg-white shadow-xl relative overflow-hidden">
            {/* Most Popular Badge */}
            <div className="absolute top-0 right-8 bg-[#F59E0B] text-white text-xs font-bold px-4 py-1.5 rounded-b-lg shadow-sm">
              ✨ MOST POPULAR
            </div>

            <div className="mb-4">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">PASS GUARANTEED</span>
              <h3 className="text-3xl font-bold text-slate-900 mt-3">Pro</h3>
            </div>
            
            <div className="mb-4">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-[#1E3A8A]">$59</span>
                <span className="text-slate-500 font-medium">/ 3 months</span>
              </div>
              <div className="mt-3 bg-green-100 text-green-700 text-sm font-bold py-1.5 px-3 rounded-md inline-block">
                Save $16 vs. Monthly
              </div>
            </div>

            <div className="space-y-5 mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-1 rounded-full"><Check className="w-4 h-4 text-green-600" /></div>
                <span className="font-bold text-slate-900">Everything in Basic</span>
              </div>

              {/* Highlight Box: AI Tutor */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-3">
                <div className="bg-white p-1.5 rounded-lg shadow-sm h-fit">
                  <Zap className="w-5 h-5 text-yellow-500" fill="currentColor" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">UNLIMITED AI Tutor</p>
                  <p className="text-sm text-slate-600">No daily limits. Ask anything, anytime.</p>
                </div>
              </div>

              {/* Highlight Box: Pass Guarantee */}
              <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-4 flex gap-3">
                <div className="bg-white p-1.5 rounded-lg shadow-sm h-fit">
                  <ShieldCheck className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">100% Pass Guarantee*</p>
                  <p className="text-sm text-slate-600">Do the work, we take the risk. Pass or get every penny back.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-1 rounded-full"><Check className="w-4 h-4 text-blue-600" /></div>
                <span className="font-bold text-slate-900">One-time payment (No recurring)</span>
              </div>
            </div>

            <Button asChild size="lg" className="w-full h-14 rounded-xl text-lg font-bold bg-[#45B7AA] hover:bg-[#3aa398] shadow-lg shadow-teal-900/10">
              <a href={CHECKOUT_URLS.PRO}>Get 3-Month Access</a>
            </Button>

            <p className="text-[10px] text-slate-400 mt-4 text-center leading-tight">
              *Complete 90% of lessons and all practice exams. If you don't pass, email us your score report for a 100% refund. <a href="#" className="underline">No questions asked</a>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

function Feature({ text, negative = false }: { text: string; negative?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      {negative ? (
        <X className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
      ) : (
        <div className="bg-green-100 p-1 rounded-full shrink-0 mt-0.5">
          <Check className="w-3 h-3 text-green-600" />
        </div>
      )}
      <span className={cn("text-sm", negative ? "text-slate-400" : "text-slate-600")}>
        {text}
      </span>
    </div>
  );
}