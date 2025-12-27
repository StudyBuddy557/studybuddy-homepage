import { Metadata } from 'next';
import Link from 'next/link';
import { generateCourseSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { Dna, Beaker, Stethoscope, Microscope, BrainCircuit, AlertOctagon, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'TEAS 7 Science Guide: Anatomy, Biology & Chemistry Breakdown (2025)',
  description: 'Master the hardest section of the TEAS 7. Detailed breakdown of Anatomy & Physiology (32 questions), Biology, Chemistry, and Scientific Reasoning.',
};

export default function ScienceGuidePage() {
  // AEO: Course Schema for Science
  const scienceSchema = generateCourseSchema({
    title: 'TEAS 7 Science Mastery Course',
    description: 'Deep dive into the TEAS 7 Science section, focusing on Human Anatomy & Physiology, Life Sciences, and Scientific Reasoning.',
    syllabusSections: [
      'Human Anatomy & Physiology (32 Questions)',
      'Life & Physical Sciences (8 Questions)',
      'Scientific Reasoning (7 Questions)',
      'Chemistry & Biology Basics'
    ]
  });

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <JsonLd schema={scienceSchema} />

      {/* --- HERO SECTION --- */}
      <section className="bg-slate-50 pt-32 pb-20 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-800 mb-6">
            <Dna className="w-4 h-4" />
            The "Make or Break" Section
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            TEAS 7 Science: <br className="hidden sm:block" />
            <span className="text-[#20B2AA]">Where Most Students Fail</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            The Science section is <strong>53 questions</strong> in <strong>63 minutes</strong>. The national average score is only ~57%. If you want to pass, you must prioritize Anatomy & Physiology.
          </p>
        </div>
      </section>

      {/* --- PRIORITY BREAKDOWN --- */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-5xl">
          
          {/* High Priority Alert */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-16 flex gap-4 items-start shadow-sm">
            <AlertOctagon className="w-8 h-8 text-red-600 shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-red-900 mb-2">The "60% Rule"</h3>
              <p className="text-red-800 text-lg">
                <strong>Human Anatomy & Physiology</strong> makes up nearly 60% of the entire Science section (32 out of 53 scored questions). Do not spend weeks memorizing rocks or clouds. Spend your time on the body systems.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {/* TIER 1: A&P */}
            <div className="lg:col-span-2 bg-white rounded-3xl border-2 border-purple-100 shadow-xl overflow-hidden">
              <div className="bg-purple-600 text-white p-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Stethoscope className="w-6 h-6" />
                  <h2 className="text-xl font-bold">Anatomy & Physiology</h2>
                </div>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase">Highest Yield (32 Qs)</span>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-purple-900 mb-3 uppercase text-sm tracking-wider">Critical Systems</h3>
                    <ul className="space-y-3">
                      {['Cardiovascular System', 'Respiratory System', 'Immune System', 'Endocrine System'].map(topic => (
                        <li key={topic} className="flex items-center gap-2 text-slate-700 font-bold">
                          <CheckCircle2 className="w-5 h-5 text-purple-600" /> {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-500 mb-3 uppercase text-sm tracking-wider">Secondary Systems</h3>
                    <ul className="space-y-3">
                      {['Gastrointestinal', 'Reproductive', 'Urinary / Renal', 'Skeletal & Neuromuscular'].map(topic => (
                        <li key={topic} className="flex items-center gap-2 text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* TIER 2: Bio & Chem */}
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4 text-slate-900">
                <Beaker className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg font-bold">Bio & Chem</h2>
              </div>
              <p className="text-sm text-slate-500 font-bold uppercase mb-4 tracking-wider">~8 Questions</p>
              <ul className="space-y-3 mb-6">
                {[
                  'Macromolecules',
                  'DNA/RNA Structure',
                  'Mitosis vs. Meiosis',
                  'Phase Changes',
                  'Chemical Reactions',
                  'Acids & Bases'
                ].map(topic => (
                  <li key={topic} className="flex items-start gap-3 text-slate-700 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
            
             {/* TIER 3: Scientific Reasoning */}
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4 text-slate-900">
                <Microscope className="w-6 h-6 text-green-600" />
                <h2 className="text-lg font-bold">Reasoning</h2>
              </div>
              <p className="text-sm text-slate-500 font-bold uppercase mb-4 tracking-wider">~7 Questions</p>
              <ul className="space-y-3">
                {[
                  'Scientific Method',
                  'Independent vs Dependent Variables',
                  'Analyzing Data Trends',
                  'Lab Tools & Measurement'
                ].map(topic => (
                  <li key={topic} className="flex items-start gap-3 text-slate-700 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- AI TUTOR STRATEGY --- */}
          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white">
            <div className="flex items-center gap-3 mb-6">
              <BrainCircuit className="w-8 h-8 text-[#20B2AA]" />
              <h2 className="text-2xl font-bold">Don't Memorize. Understand.</h2>
            </div>
            <p className="text-slate-300 mb-8 text-lg">
              The TEAS 7 doesn't just ask "what is the heart?" It asks "how does blood flow change if the left ventricle fails?" Static flashcards fail here. You need deep understanding.
            </p>
            
            <div className="grid gap-4 mb-8">
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <p className="text-xs text-[#20B2AA] font-bold uppercase mb-2">Try asking the AI:</p>
                <p className="font-mono text-sm text-slate-200">"Explain the RAAS system like I'm 15 years old. Why does it raise blood pressure?"</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <p className="text-xs text-[#20B2AA] font-bold uppercase mb-2">Try asking the AI:</p>
                <p className="font-mono text-sm text-slate-200">"Compare Mitosis and Meiosis. Create a table showing the differences in outcome and purpose."</p>
              </div>
            </div>

            <Link 
              href="https://buy.stripe.com/eVq7sKbtn7IR5ma5jhcjS05" 
              className="inline-flex items-center px-6 py-3 bg-[#20B2AA] text-white font-bold rounded-xl hover:bg-[#18968F] transition-all"
            >
              Start Science Prep ($24.99) <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}