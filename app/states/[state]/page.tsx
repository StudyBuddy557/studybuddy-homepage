import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getStateDetail } from '@/lib/data/state-details';
import { getAllStateSlugs } from '@/state-data'; // Using your existing file for static params
import { generateStateCredentialSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { MapPin, School, Trophy, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';

interface Props {
  params: { state: string };
}

// --- STATIC GENERATION ---
// This ensures all 50 pages are built at build time (fast + SEO friendly)
export async function generateStaticParams() {
  const slugs = getAllStateSlugs();
  return slugs.map((slug) => ({ state: slug }));
}

// --- METADATA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const state = getStateDetail(params.state);
  if (!state) return {};

  return {
    title: `TEAS 7 Score Requirements for ${state.name} Nursing Schools (2025)`,
    description: `Complete guide to TEAS 7 requirements for ${state.name} nursing programs. Average scores, ${state.topSchools[0]} requirements, and state-specific deadlines.`,
  };
}

export default function StatePage({ params }: Props) {
  const state = getStateDetail(params.state);
  if (!state) notFound();

  // AEO: EducationalCredential Schema
  const stateSchema = generateStateCredentialSchema({
    stateName: state.name,
    stateAbbreviation: state.abbreviation,
    minScore: state.minScore,
  });

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <JsonLd schema={stateSchema} />

      {/* --- HERO SECTION --- */}
      <section className="bg-slate-50 pt-32 pb-20 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-800 mb-6">
            <MapPin className="w-4 h-4" />
            State Requirements 2025
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            TEAS 7 Requirements for <br className="hidden sm:block" />
            <span className="text-[#20B2AA]">{state.name} Nursing Schools</span>
          </h1>
          {/* AEO ANSWER: First paragraph answers the core query directly */}
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Most nursing programs in <strong>{state.name}</strong> require a minimum TEAS 7 Composite Score of <strong>{state.minScore}%</strong>, though competitive applicants typically score above <strong>{state.competitiveScore}%</strong>.
          </p>
        </div>
      </section>

      {/* --- STATE DATA GRID --- */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            
            {/* Metric 1: Programs */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <School className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-bold uppercase">Programs</p>
                <p className="text-2xl font-bold text-slate-900">{state.programCount}</p>
              </div>
            </div>

            {/* Metric 2: Competitive Score */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-bold uppercase">Target Score</p>
                <p className="text-2xl font-bold text-slate-900">{state.competitiveScore}%</p>
              </div>
            </div>

            {/* Metric 3: Salary */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-bold uppercase">Avg New Grad Pay</p>
                <p className="text-2xl font-bold text-slate-900">{state.avgSalary}</p>
              </div>
            </div>

          </div>

          {/* --- TOP SCHOOLS LIST --- */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Top {state.name} Programs Requiring TEAS</h2>
              <p className="text-slate-600 mb-6">
                The following popular nursing schools in {state.name} utilize the TEAS 7 as a key admission criteria:
              </p>
              <ul className="space-y-4">
                {state.topSchools.map((school, i) => (
                  <li key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-[#20B2AA]" />
                    <span className="font-bold text-slate-800">{school}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100 text-sm text-amber-800">
                <strong>Note:</strong> Requirements change frequently. Always verify specific score cutoffs with the {state.name} Board of Nursing or specific university admissions offices.
              </div>
            </div>

            {/* --- CTA CARD --- */}
            <div className="bg-[#1A1A1A] text-white p-8 rounded-3xl sticky top-8">
              <h3 className="text-2xl font-bold mb-4">Pass the TEAS 7 in {state.name}</h3>
              <p className="text-slate-300 mb-8">
                {state.name} nursing programs are competitive. Use StudyBuddy's AI Tutor to guarantee you hit that {state.competitiveScore}% target score.
              </p>
              <div className="space-y-4">
                <Link 
                  href="https://buy.stripe.com/eVq7sKbtn7IR5ma5jhcjS05" 
                  className="block w-full py-4 bg-[#20B2AA] text-white text-center font-bold rounded-xl hover:bg-[#18968F] transition-all"
                >
                  Start Studying Now
                </Link>
                <Link 
                  href="/diagnostic" 
                  className="block w-full py-4 bg-transparent border-2 border-slate-600 text-white text-center font-bold rounded-xl hover:bg-slate-800 transition-all"
                >
                  Take Free Diagnostic
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}