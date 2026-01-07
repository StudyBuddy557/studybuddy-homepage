// ============================================================================
// ANSWER BOX COMPONENT - AEO Critical Element
// ============================================================================
// Purpose: Provide quotable, AI-search-optimized direct answer in first 100 words
// Placement: Above-the-fold, visually elevated
// ============================================================================

import type { StateData } from '@/lib/state-data';

interface AnswerBoxProps {
  stateData: StateData;
}

export default function AnswerBox({ stateData }: AnswerBoxProps) {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-teal-700 mb-8">
      <div className="flex items-start gap-4">
        <div className="bg-teal-700 text-white rounded-full p-3 flex-shrink-0">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Quick Answer for {stateData.name}
          </h2>
          
          {/* Primary Direct Answer - AEO Critical */}
          <p className="text-lg text-slate-800 leading-relaxed mb-4">
            {stateData.directAnswer}
          </p>
          
          {/* Supporting Context */}
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-teal-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <span className="font-semibold text-teal-900">
                vs. National Average
              </span>
            </div>
            <p className="text-teal-800">
              {stateData.comparisonToNational}
            </p>
          </div>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <div className="text-3xl font-bold text-teal-700">
                {stateData.avgTeasScore}%
              </div>
              <div className="text-sm text-slate-600 mt-1">
                State Average
              </div>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <div className="text-3xl font-bold text-teal-700">
                {stateData.programsCount}
              </div>
              <div className="text-sm text-slate-600 mt-1">
                Nursing Programs
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}