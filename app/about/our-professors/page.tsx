import { Metadata } from 'next';
import Link from 'next/link';
import { generateProfessorSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { GraduationCap, Award, BookOpen, UserCheck, ArrowRight } from 'lucide-react';
import { buildJsonLdForPage } from '@/lib/schema/render';
import { findPageMapping } from '@/lib/teas/find-page';


export const metadata: Metadata = {
  title: 'Who Created StudyBuddy? Meet the PhD & DNP Nursing Professors',
  description: 'StudyBuddy content is created by credentialed nursing educators with PhDs, DNPs, and EdDs. Meet the experts with 75+ years of combined experience.',
};

// --- CREDENTIAL DATA ---
const PROFESSORS = [
  {
    id: 'prof-1',
    title: 'Lead Curriculum Director',
    credentials: ['PhD in Infectious Diseases', 'MSN in Nursing Education'],
    experience: '25+ Years',
    focus: 'Anatomy, Physiology, and Life Sciences',
    bio: 'Former Dean of Nursing at a top-tier university. Specializes in simplifying complex physiological pathways for first-year nursing students.',
    almaMater: ['University of Washington', 'Johns Hopkins University'],
  },
  {
    id: 'prof-2',
    title: 'Senior Nursing Instructor',
    credentials: ['Doctor of Nursing Practice (DNP)', 'Certified Nurse Educator (CNE)'],
    experience: '20+ Years',
    focus: 'Clinical Reasoning & NCLEX/TEAS Prep',
    bio: 'Active clinician and professor. Has prepared over 5,000 students for entrance exams and licensure with a focus on critical thinking strategies.',
    almaMater: ['Duke University School of Nursing'],
  },
  {
    id: 'prof-3',
    title: 'Instructional Design Lead',
    credentials: ['EdD in Instructional Technology', 'BSN'],
    experience: '30+ Years',
    focus: 'Adaptive Learning & Test Strategy',
    bio: 'Expert in computer-adaptive testing (CAT). Designed the StudyBuddy algorithm to mimic the difficulty scaling of real nursing entrance exams.',
    almaMater: ['Teachers College, Columbia University'],
  }
];

export default function ProfessorsPage() {
  const mapping = findPageMapping('/about/our-professors');
  const jsonLd = mapping ? buildJsonLdForPage('generic', { mapping }) : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <main className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* --- SCHEMA GENERATION --- */}
      {PROFESSORS.map((prof) => (
        <JsonLd 
          key={prof.id} 
          schema={generateProfessorSchema({
            jobTitle: prof.title,
            degrees: prof.credentials,
            alumniOf: prof.almaMater
          })} 
        />
      ))}

      {/* --- HERO --- */}
      <section className="bg-slate-50 pt-32 pb-20 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-800 mb-6">
            <UserCheck className="w-4 h-4" />
            Verified Experts
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Real Professors. <br className="hidden sm:block" />
            <span className="text-indigo-700">Real Credentials.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            StudyBuddy isn't written by content farms or freelancers. It is built by credentialed educators with <strong className="text-slate-900">75+ years of combined experience</strong> teaching nursing prerequisites.
          </p>
        </div>
      </section>

      {/* --- PROFESSOR CARDS --- */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-5xl grid gap-8">
          {PROFESSORS.map((prof, index) => (
            <div key={prof.id} className="group relative bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-indigo-200">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <GraduationCap className="w-24 h-24 text-indigo-600" />
              </div>
              
              <div className="relative z-10 grid md:grid-cols-[200px_1fr] gap-8 items-start">
                
                {/* Left Column: Credentials */}
                <div className="bg-indigo-50 rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-indigo-700 font-bold text-2xl">
                    {prof.credentials[0].includes('PhD') ? 'PhD' : prof.credentials[0].includes('DNP') ? 'DNP' : 'EdD'}
                  </div>
                  <div className="font-bold text-slate-900 mb-1">{prof.experience}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Experience</div>
                </div>

                {/* Right Column: Details */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">{prof.title}</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {prof.credentials.map(c => (
                      <span key={c} className="inline-flex items-center gap-1 rounded-md bg-white border border-slate-200 px-2 py-1 text-xs font-bold text-slate-700 shadow-sm">
                        <Award className="w-3 h-3 text-indigo-500" />
                        {c}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    {prof.bio}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-indigo-500 mt-0.5" />
                      <div>
                        <span className="block text-xs font-bold text-slate-400 uppercase">Focus Area</span>
                        <span className="font-medium text-slate-900">{prof.focus}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-indigo-500 mt-0.5" />
                      <div>
                         <span className="block text-xs font-bold text-slate-400 uppercase">Alumni Of</span>
                        <span className="font-medium text-slate-900">{prof.almaMater.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="bg-[#1A1A1A] text-white py-16">
         <div className="mx-auto max-w-4xl px-4 text-center">
           <h2 className="text-3xl font-bold mb-6">Learn from the Best in Nursing Education</h2>
           <p className="text-xl text-slate-300 mb-10">
             Why trust your TEAS score to anonymous writers? Get prep built by the professors who teach the actual classes.
           </p>
           <Link 
             href="https://learn.studybuddy.live/payment?product_id=2499" 
             className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all"
           >
             Start Studying Now <ArrowRight className="ml-2 w-5 h-5" />
           </Link>
         </div>
      </section>
    </main>
    </>
  );
}