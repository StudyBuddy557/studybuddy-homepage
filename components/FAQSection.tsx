// ============================================================================
// FAQ SECTION COMPONENT - Voice Search & AI Answer Optimization
// ============================================================================
// Purpose: Structured Q&A for natural language queries and featured snippets
// ============================================================================

'use client';

import { useState } from 'react';
import type { StateData } from '@/lib/state-data';

interface FAQSectionProps {
  stateData: StateData;
}

export default function FAQSection({ stateData }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First FAQ open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-slate-50" id="faq">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 text-center">
          {stateData.name} TEAS FAQs
        </h2>
        <p className="text-lg text-slate-600 mb-8 text-center">
          Common questions about nursing school requirements in {stateData.name}
        </p>

        <div className="space-y-4">
          {stateData.faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors duration-200"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg font-semibold text-slate-900 pr-4">
                  {faq.question}
                </h3>
                <svg
                  className={`w-6 h-6 text-teal-700 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-4 pt-2">
                  <p className="text-slate-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA within FAQ section */}
        <div className="mt-8 bg-gradient-to-r from-teal-700 to-teal-600 rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            Still have questions?
          </h3>
          <p className="text-teal-50 mb-4">
            Get personalized answers from our AI tutor while you study
          </p>
          <a
            href={`/pricing?state=${stateData.slug}&utm_source=state-page&utm_medium=faq-cta`}
            className="inline-block bg-white text-teal-700 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors duration-200"
          >
            Start Free Trial
          </a>
        </div>
      </div>
    </section>
  );
}