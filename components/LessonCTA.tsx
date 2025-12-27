import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// ✅ EXACT LearnWorlds Checkout Links
const CHECKOUT_URLS = {
  PRO: "https://learn.studybuddy.live/subscription/59-3-months?site_template_id=67e1717114d4688062090ad2",
};

export function LessonCTA() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-[#0F172A] rounded-3xl p-8 md:p-16 text-center shadow-2xl relative overflow-hidden">
          
          {/* Background Grid Pattern (Optional decoration) */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          </div>

          {/* Limited Time Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-xs font-bold tracking-wider uppercase">Limited Time Offer</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Get Instant Access to All 48 Lessons
          </h2>

          {/* Subheadline */}
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Plus 4,000+ practice questions, unlimited AI tutoring, and our 100% Pass Guarantee.
          </p>

          {/* CTA Area */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            
            {/* Primary Button */}
            <Button asChild size="lg" className="h-14 px-8 text-lg font-bold bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/50 rounded-xl w-full md:w-auto transition-all transform hover:scale-105">
              <a href={CHECKOUT_URLS.PRO}>
                Start Learning Now <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>

            {/* Pricing Text */}
            <div className="text-left">
              <div className="text-white font-bold text-lg">
                $59 / 3 months <span className="text-slate-400 font-normal text-sm ml-1">or $24.99/mo</span>
              </div>
              <div className="text-slate-500 text-sm">
                100% Money-Back Guarantee
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}