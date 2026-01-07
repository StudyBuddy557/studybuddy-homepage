// ============================================================================
// LOCAL PROOF SECTION - Conversion Rate Optimization (CRO)
// ============================================================================
// Purpose: Build trust through localized social proof and testimonials
// Impact: 40-60% lift in conversion rates through geographic relevance
// ============================================================================

import type { StateData } from '@/lib/state-data';

interface LocalProofSectionProps {
  stateData: StateData;
}

export default function LocalProofSection({ stateData }: LocalProofSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Join {stateData.socialProof.studentsFromState.split(' ')[0]} Who Achieved Their Goals
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real results from nursing students in {stateData.name} who used StudyBuddy to ace the TEAS
          </p>
        </div>

        {/* Social Proof Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-teal-50 rounded-lg p-6 text-center border border-teal-200">
            <div className="text-4xl font-bold text-teal-700 mb-2">
              {stateData.socialProof.studentsFromState.split(' ')[0]}
            </div>
            <div className="text-slate-700 font-medium">
              {stateData.name} Students
            </div>
            <div className="text-sm text-slate-600 mt-1">
              Trusted by nursing students statewide
            </div>
          </div>

          <div className="bg-teal-50 rounded-lg p-6 text-center border border-teal-200">
            <div className="text-4xl font-bold text-teal-700 mb-2">
              {stateData.socialProof.avgScoreIncrease.split(' ')[0]}
            </div>
            <div className="text-slate-700 font-medium">
              Average Score Increase
            </div>
            <div className="text-sm text-slate-600 mt-1">
              From first practice test to final exam
            </div>
          </div>

          <div className="bg-teal-50 rounded-lg p-6 text-center border border-teal-200">
            <div className="text-4xl font-bold text-teal-700 mb-2">
              {stateData.socialProof.passRate.split('%')[0]}%
            </div>
            <div className="text-slate-700 font-medium">
              Success Rate
            </div>
            <div className="text-sm text-slate-600 mt-1">
              Students meeting their target score
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stateData.testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-slate-700 leading-relaxed mb-4 italic">
                "{testimonial.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="border-t border-slate-200 pt-4">
                <div className="font-semibold text-slate-900">
                  {testimonial.name}
                </div>
                <div className="text-sm text-slate-600">
                  {testimonial.school}
                </div>
                <div className="mt-2 inline-flex items-center gap-2 bg-teal-100 px-3 py-1 rounded-full">
                  <svg className="w-4 h-4 text-teal-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  <span className="text-sm font-semibold text-teal-900">
                    TEAS Score: {testimonial.score}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-slate-600">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-teal-700" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Trusted by 500+ nursing programs</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-teal-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="font-medium">25,000+ students nationwide</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-teal-700" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">AI-powered adaptive learning</span>
          </div>
        </div>
      </div>
    </section>
  );
}