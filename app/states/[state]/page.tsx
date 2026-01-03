import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getStateBySlug, stateData, getRelatedStates } from '@/lib/state-data'; 
import JsonLd from '@/app/components/JsonLd';
import { buildJsonLdForPage } from '@/lib/schema/render';
import { findPageMapping } from '@/lib/teas/find-page';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return stateData.map((state) => ({ state: state.slug }));
}

export async function generateMetadata({ params }: { params: { state: string } }): Promise<Metadata> {
  const state = getStateBySlug(params.state);
  if (!state) return {};
  
  return {
    title: `TEAS 7 Requirements for ${state.name} Nursing Schools (${new Date().getFullYear()})`,
    description: `Complete admissions guide for the ${state.programs_count} nursing programs in ${state.name}. Average TEAS score requirements and ${state.avg_salary} salary data.`,
    alternates: {
      canonical: `https://studybuddy.live/states/${state.slug}`,
    }
  };
}

export default function StatePage({ params }: { params: { state: string } }) {
  const state = getStateBySlug(params.state);
  if (!state) return notFound();

  // Generate schema from Schema Engine (auto-handles all 50 states)
  const mapping = findPageMapping(`/state/${params.state}`);
  const jsonLd = mapping ? buildJsonLdForPage('state', { mapping }) : null;

  const salaryNum = parseInt(state.avg_salary.replace(/[^0-9]/g, ''));
  const isHighSalary = salaryNum > 85000;
  const isHighVolume = parseInt(state.programs_count.replace('+', '')) > 80;
  
  const relatedStates = getRelatedStates(state.slug, state.region);

  const stateSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Nursing Entrance Exam",
    "name": `TEAS 7 for ${state.name}`,
    "description": `Standardized test requirements for ${state.name} nursing programs.`,
    "educationalLevel": "Post-Secondary",
    "occupationalCategory": "Registered Nurse",
    "validIn": { "@type": "AdministrativeArea", "name": state.name }
  };

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <main className="bg-slate-50 min-h-screen">
        <JsonLd data={stateSchema} />
        
        <div className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 py-16 max-w-5xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              {state.region} Region Guide
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              TEAS 7 Scores for <span className="text-teal-600">{state.name}</span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
              {isHighSalary 
                ? `Nursing in ${state.name} is highly competitive with an average salary of ${state.avg_salary}. Top programs often require TEAS scores above 85% to filter applicants.`
                : `With ${state.programs_count} programs across the state, ${state.name} offers significant opportunity. The average starting salary is ${state.avg_salary}, making it a stable career path.`
              }
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link 
                href="/diagnostic"
                className="bg-[#20B2AA] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#1a9d96] hover:shadow-xl hover:shadow-teal-500/20 hover:-translate-y-1 transition-all duration-200 flex flex-col items-center justify-center text-center"
              >
                <span>Take Free 5-Min Diagnostic →</span>
                <span className="text-xs font-normal opacity-90 mt-1">Get your personalized TEAS study plan</span>
              </Link>
              <Link 
                href="/pricing" 
                className="bg-white text-slate-700 px-8 py-4 rounded-xl font-bold text-lg border-2 border-slate-200 hover:border-slate-300 transition-all duration-200 flex flex-col items-center justify-center shadow-sm hover:shadow-md min-w-[160px]"
              >
                <span className="text-xs uppercase tracking-wide text-slate-500">Plans from</span>
                <span className="text-lg text-slate-900">$24.99/mo</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-5xl grid md:grid-cols-[1fr_300px] gap-12">
          <div className="prose prose-slate prose-lg">
            <div className="grid grid-cols-2 gap-4 not-prose mb-8">
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-sm text-slate-500 font-bold uppercase">Programs</div>
                  <div className="text-2xl font-black text-indigo-600">{state.programs_count}</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-sm text-slate-500 font-bold uppercase">Avg Salary</div>
                  <div className="text-2xl font-black text-teal-600">{state.avg_salary}</div>
              </div>
            </div>

            <h2>Admission Requirements Analysis</h2>
            <p>
              To enter one of the <strong>{state.programs_count} programs</strong> in {state.name}, you need a strategy. 
              Most schools in the {state.region} region use the ATI TEAS 7 exam as a primary filter for applicants.
            </p>
            
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 not-prose rounded-r-xl">
              <h3 className="text-amber-900 font-bold text-lg mb-2">Admissions Tip for {state.name}</h3>
              <p className="text-amber-800">
                {isHighVolume 
                  ? `Because ${state.name} has so many programs (${state.programs_count}), requirements vary wildly. Community colleges may accept 65%, while Universities often demand 80%+.`
                  : `With fewer programs available (${state.programs_count}), competition for seats in ${state.name} can be fierce. A high TEAS score is your best differentiator.`
                }
              </p>
            </div>

            <h3>Neighboring State Requirements</h3>
            <p>Compare requirements in other {state.region} states:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose mt-4">
              {relatedStates.map(s => (
                <Link key={s.slug} href={`/states/${s.slug}`} className="group block p-4 bg-white border border-slate-200 rounded-lg hover:border-teal-400 hover:shadow-md transition-all">
                  <div className="font-bold text-slate-900 group-hover:text-teal-600 transition-colors">{s.name}</div>
                  <div className="text-sm text-slate-500">{s.programs_count} Programs • {s.avg_salary}</div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-8">
              <h3 className="font-bold text-slate-900 mb-4">Study for {state.name} TEAS</h3>
              <ul className="space-y-3 mb-6 text-sm text-slate-600">
                <li className="flex gap-2">✓ Specific to {state.name} requirements</li>
                <li className="flex gap-2">✓ Unlimited AI Tutoring</li>
                <li className="flex gap-2">✓ 92% Pass Rate</li>
              </ul>
              <Link 
                href="/diagnostic"
                className="block w-full bg-teal-600 text-white px-6 py-3 rounded-xl font-bold text-center hover:bg-teal-700 transition-all"
              >
                Take Free 5-Min Diagnostic →
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
