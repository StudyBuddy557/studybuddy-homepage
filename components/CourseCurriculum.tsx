'use client';

import { useState } from 'react';
import { ChevronDown, Lock, PlayCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface Lesson {
  title: string;
  duration: string;
  isPreview: boolean;
}

interface Section {
  title: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  lessons: Lesson[];
}

export function CourseCurriculum() {
  const [openSections, setOpenSections] = useState<number[]>([0]); // First section open by default

  const sections: Section[] = [
    {
      title: 'Science',
      icon: '🧬',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      lessons: [
        { title: 'Human Anatomy & Physiology Foundations', duration: '45 min', isPreview: true },
        { title: 'Tissue Level Organization', duration: '38 min', isPreview: false },
        { title: 'Integumentary System', duration: '42 min', isPreview: false },
        { title: 'Skeletal System (Bone Tissue, Axial & Appendicular)', duration: '65 min', isPreview: false },
        { title: 'Joints & Muscle Tissue', duration: '52 min', isPreview: true },
        { title: 'Muscular System', duration: '48 min', isPreview: false },
        { title: 'Nervous System & Brain Function', duration: '55 min', isPreview: false },
        { title: 'Endocrine System & Hormones', duration: '40 min', isPreview: false },
        { title: 'Cardiovascular System: The Heart', duration: '90 min', isPreview: false },
        { title: 'Blood, Blood Vessels & Circulation', duration: '50 min', isPreview: false },
        { title: 'Lymphatic & Immune System', duration: '45 min', isPreview: false },
        { title: 'Respiratory System', duration: '48 min', isPreview: false },
        { title: 'Digestive System', duration: '60 min', isPreview: false },
        { title: 'Urinary System', duration: '42 min', isPreview: false },
        { title: 'Reproductive Systems (Male & Female)', duration: '58 min', isPreview: false },
        { title: 'Cell Biology & Genetics', duration: '50 min', isPreview: true },
        { title: 'Chemistry Fundamentals (Acids, Bases, Bonding)', duration: '45 min', isPreview: false }
      ]
    },
    {
      title: 'Mathematics',
      icon: '🔢',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      lessons: [
        { title: 'Whole Numbers & Significant Figures', duration: '35 min', isPreview: true },
        { title: 'Fractions (Adding, Subtracting, Multiplying, Dividing)', duration: '42 min', isPreview: false },
        { title: 'Decimals & Percentages', duration: '38 min', isPreview: false },
        { title: 'Ratios & Proportions', duration: '32 min', isPreview: false },
        { title: 'Algebra & Solving Equations', duration: '40 min', isPreview: false },
        { title: 'Order of Operations (PEMDAS)', duration: '28 min', isPreview: false },
        { title: 'Geometry Basics (Area, Perimeter, Pythagorean Theorem)', duration: '45 min', isPreview: false },
        { title: 'Unit Conversions & Dimensional Analysis', duration: '35 min', isPreview: true },
        { title: 'Statistics (Mean, Median, Mode)', duration: '30 min', isPreview: false },
        { title: 'Data Interpretation (Graphs & Charts)', duration: '38 min', isPreview: false },
        { title: 'Probability Concepts', duration: '32 min', isPreview: false },
        { title: 'Word Problems Mastery', duration: '50 min', isPreview: false }
      ]
    },
    {
      title: 'Reading',
      icon: '📚',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      lessons: [
        { title: 'Key Ideas & Details', duration: '38 min', isPreview: true },
        { title: 'Craft & Structure (Author\'s Purpose & Tone)', duration: '42 min', isPreview: false },
        { title: 'Integration of Knowledge & Ideas', duration: '40 min', isPreview: false },
        { title: 'Reading Comprehension Strategies', duration: '35 min', isPreview: false },
        { title: 'Logical Arguments & Evidence', duration: '36 min', isPreview: false },
        { title: 'Context Clues & Figurative Language', duration: '33 min', isPreview: false },
        { title: 'Topic vs Main Idea', duration: '30 min', isPreview: false },
        { title: 'Fact vs Opinion Recognition', duration: '28 min', isPreview: false },
        { title: 'Summaries & Sequences', duration: '32 min', isPreview: true },
        { title: 'Information Sources & Citations', duration: '25 min', isPreview: false }
      ]
    },
    {
      title: 'English & Language Usage',
      icon: '✍️',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      lessons: [
        { title: 'Grammar Conventions & Rules', duration: '40 min', isPreview: true },
        { title: 'Sentence Structure & Clarity', duration: '38 min', isPreview: false },
        { title: 'Punctuation & Capitalization', duration: '35 min', isPreview: false },
        { title: 'Spelling Rules & Common Mistakes', duration: '30 min', isPreview: false },
        { title: 'Vocabulary & Word Roots', duration: '42 min', isPreview: false },
        { title: 'Context Clues for Word Meaning', duration: '28 min', isPreview: false },
        { title: 'Proofreading & Editing Skills', duration: '36 min', isPreview: true },
        { title: 'Redundancy & Conciseness', duration: '25 min', isPreview: false },
        { title: 'Audience Awareness & Tone', duration: '32 min', isPreview: false }
      ]
    }
  ];

  const toggleSection = (index: number) => {
    setOpenSections(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const totalLessons = sections.reduce((acc, section) => acc + section.lessons.length, 0);
  const totalDuration = sections.reduce((acc, section) => 
    acc + section.lessons.reduce((sum, lesson) => {
      const minutes = parseInt(lesson.duration);
      return sum + minutes;
    }, 0), 0
  );

  return (
    <section className="relative py-32 bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-200 px-5 py-2 mb-6">
            <CheckCircle className="w-4 h-4 text-teal-600" strokeWidth={2.5} />
            <span className="text-sm font-bold text-teal-700 uppercase tracking-wider">Complete Curriculum</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6">
            Everything You Need<br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#20B2AA] to-[#2563EB] bg-clip-text text-transparent">In One Place</span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium mb-8">
            17 comprehensive chapters covering all TEAS 7 content areas with {totalLessons} lessons and {Math.floor(totalDuration / 60)}+ hours of expert instruction.
          </p>

          {/* UPDATED: Accurate Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-bold">
            <div className="flex items-center gap-2 bg-slate-50 px-5 py-3 rounded-xl border border-slate-200">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-slate-700">17 Science Chapters</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-5 py-3 rounded-xl border border-slate-200">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-slate-700">350+ Video Lectures</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-5 py-3 rounded-xl border border-slate-200">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-slate-700">4,000+ Practice Questions</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-5 py-3 rounded-xl border border-slate-200">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <span className="text-slate-700">5 Full Practice Exams</span>
            </div>
          </div>
        </div>

        {/* Curriculum Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {sections.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="group rounded-2xl border-2 border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all overflow-hidden"
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(sectionIndex)}
                  className="w-full flex items-center justify-between p-6 lg:p-8 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`text-4xl shrink-0`}>
                      {section.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-black text-slate-900 mb-1">
                        {section.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className="font-bold text-slate-500">
                          {section.lessons.length} Lessons
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="font-medium text-slate-400">
                          {section.lessons.reduce((sum, lesson) => sum + parseInt(lesson.duration), 0)} min total
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-slate-400 shrink-0 transition-transform duration-300 ${
                      openSections.includes(sectionIndex) ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Section Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openSections.includes(sectionIndex) ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className={`border-t-2 ${section.borderColor} ${section.bgColor} p-6 lg:p-8`}>
                    <div className="space-y-2">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lessonIndex}
                          className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                            lesson.isPreview
                              ? 'bg-white border-2 border-teal-200 hover:border-teal-300 hover:shadow-md cursor-pointer'
                              : 'bg-white/50 border border-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className={`shrink-0 ${lesson.isPreview ? 'text-teal-500' : 'text-slate-300'}`}>
                              {lesson.isPreview ? (
                                <PlayCircle className="w-5 h-5" strokeWidth={2.5} />
                              ) : (
                                <Lock className="w-5 h-5" strokeWidth={2} />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`font-bold ${lesson.isPreview ? 'text-slate-900' : 'text-slate-600'}`}>
                                {lesson.title}
                              </div>
                              {lesson.isPreview && (
                                <div className="text-xs font-bold text-teal-600 uppercase mt-1">
                                  Free Preview
                                </div>
                              )}
                            </div>
                            <div className="shrink-0 text-sm font-medium text-slate-400">
                              {lesson.duration}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Card */}
          <div className="mt-12 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 lg:p-12 shadow-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
                <svg className="w-4 h-4 text-[#FFC700]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-bold text-white uppercase tracking-wider">Limited Time Offer</span>
              </div>

              <h3 className="text-3xl lg:text-4xl font-black text-white mb-4">
                Get Instant Access to All {totalLessons} Lessons
              </h3>
              
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Plus 4,000+ practice questions, unlimited AI tutoring, and our 100% Pass Guarantee.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="https://learn.studybuddy.live/checkout?product_id=TEAS_PRO"
                  className="group w-full sm:w-auto bg-gradient-to-r from-[#20B2AA] to-[#2563EB] hover:from-[#1a9d96] hover:to-[#1d4ed8] text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-teal-500/30 hover:shadow-teal-500/50 transition-all hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  Start Learning Now
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                
                {/* UPDATED: Pricing */}
                <div className="text-sm text-slate-400">
                  <div className="font-bold text-white">$47/month or $199 for 6 months</div>
                  <div>Basic: $24.99/month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}