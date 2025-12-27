"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  // --- CORE QUESTIONS ---
  {
    question: "How does the Pass Guarantee work?",
    answer: "It’s simple. If you complete our TEAS Pro course (finish 90% of lessons and take all practice exams) and don’t pass your official TEAS 7 exam, just email us your score report. We will refund 100% of your money, no questions asked."
  },
  {
    question: "Are the practice exams realistic?",
    answer: "Yes. Our practice exams are modeled directly after the official ATI TEAS 7 blueprint. We match the difficulty, question format (multiple choice, select all that apply), and timing to ensure you are fully prepared for test day."
  },
  
  // --- SEO & GEO TARGETED QUESTIONS (Updated for 2026) ---
  {
    question: "What specific subjects are on the TEAS 7?",
    answer: "The exam consists of 170 questions across four sections: Reading (Key Ideas, Craft & Structure), Math (Algebra, Numbers, Measurement), Science (Human Anatomy & Physiology, Life & Physical Sciences), and English (Standard English Conventions, Language Knowledge)."
  },
  {
    question: "Can I use a calculator on the TEAS 7?",
    answer: "You cannot bring your own calculator. However, a four-function calculator is built directly into the computerized test screen. Our practice exams include this same built-in calculator so you can get comfortable using it before test day."
  },
  {
    question: "Does StudyBuddy work on my phone or tablet?",
    answer: "Absolutely. StudyBuddy is fully mobile-optimized. You can watch lessons, take quizzes, and chat with the AI Tutor on your iPhone, iPad, or Android device. Perfect for studying during breaks or on the go."
  },
  {
    question: "Is this course updated for the 2026 TEAS 7?",
    answer: "Yes. This course is fully updated for the 2026 nursing school admission cycle. We monitor ATI guidelines weekly to ensure our question bank reflects the absolute latest version of the exam."
  },
  
  // --- LOGISTICS QUESTIONS ---
  {
    question: "Is the ATI TEAS 7 exam hard to pass?",
    answer: "The TEAS 7 is challenging because it covers a wide range of subjects. However, with structured study and our AI Tutor identifying your weak spots, most students can pass within 2-4 weeks of dedicated prep."
  },
  {
    question: "What is a good TEAS 7 score for nursing school?",
    answer: "Most competitive nursing programs look for a score of 70% or higher. Some elite programs require an 80%+. Our AI Tutor is designed to help you target the 'Advanced' proficiency level (80%+)."
  },
  {
    question: "What is the refund policy?",
    answer: "For the Monthly Plan, you can cancel your subscription at any time from your dashboard to stop future billing. For the 3-Month Pro Plan, you are covered by our 100% Money-Back Pass Guarantee."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // SEO MAGIC: Auto-generates Schema for ALL questions above
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* INJECT SCHEMA FOR GOOGLE */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
        <p className="text-slate-500 mt-2">Everything you need to know about the TEAS 7.</p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, index) => (
          <div 
            key={index} 
            className="border border-slate-200 rounded-2xl bg-white overflow-hidden transition-all hover:border-blue-200 hover:shadow-sm"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <h3 className="font-semibold text-slate-900 pr-8 text-lg">{faq.question}</h3>
              {openIndex === index ? (
                <ChevronUp className="text-blue-600 w-5 h-5 shrink-0" />
              ) : (
                <ChevronDown className="text-slate-400 w-5 h-5 shrink-0" />
              )}
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-6 text-slate-600 leading-relaxed animate-in slide-in-from-top-2">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}