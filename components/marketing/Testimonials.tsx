'use client';

import { Star } from 'lucide-react';

const REVIEWS = [
  {
    name: "Sarah M.",
    role: "Accepted to Chamberlain",
    text: "I took the TEAS twice and failed. After 3 weeks with StudyBuddy, I scored an 84%. The AI tutor is a game changer.",
    stars: 5
  },
  {
    name: "Jason K.",
    role: "Accepted to ASU Nursing",
    text: "The practice exams are exactly like the real thing. I walked into the testing center feeling totally calm.",
    stars: 5
  },
  {
    name: "Emily R.",
    role: "Pre-Nursing Student",
    text: "I struggled with the Math section so much. The step-by-step video explanations saved me. Highly recommend!",
    stars: 5
  }
];

export default function Testimonials() {
  return (
    // Changed bg-white to bg-slate-900 for Contrast Rhythm
    <section className="py-24 bg-slate-900 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Don't Just Take Our Word For It
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Join 5,000+ future nurses who passed their exams with StudyBuddy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, index) => (
            <div 
              key={index} 
              className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                "{review.text}"
              </p>
              <div>
                <p className="font-bold text-white">{review.name}</p>
                <p className="text-sm text-blue-400 font-medium">{review.role}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}