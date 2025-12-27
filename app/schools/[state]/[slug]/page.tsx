import { notFound } from 'next/navigation';
import { getSchoolBySlug, getAllSchools } from '@/lib/data/schools';
import { StatsGrid } from '@/components/schools/StatsGrid';
import { SchoolSearch } from '@/components/schools/SchoolSearch'; // Ensure this file exists in components/schools/
import { SchoolSchema } from '@/components/schools/SchoolSchema';
import { DynamicAdmissionsCard } from '@/components/schools/DynamicAdmissionsCard';

interface PageProps {
  params: { state: string; slug: string };
}

// 1. Static Generation (SSG) for instant page loads
export async function generateStaticParams() {
  const schools = getAllSchools();
  return schools.map((school) => ({
    state: school.state.toLowerCase(),
    slug: school.slug,
  }));
}

// 2. The Main Page UI
export default function SchoolPage({ params }: PageProps) {
  const school = getSchoolBySlug(params.slug);
  
  if (!school) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* AEO: Inject Schema */}
      <SchoolSchema school={school} />

      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200 py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-bold uppercase tracking-wide mb-4">
            {school.type} • {school.city}, {school.state}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">{school.name} Nursing</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Everything you need to know about the {school.program_name} program admission requirements.
          </p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Data Visualization */}
        <StatsGrid school={school} />

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Admissions Analysis</h2>
              <p className="text-slate-600 mb-6">
                Admission to {school.name} is competitive. You will be competing against approximately {school.nclex_candidates} other applicants for a limited number of seats.
              </p>
              
              {/* CRO: Dynamic Urgency Card */}
              <DynamicAdmissionsCard school={school} />
            </div>

            {/* SEO Text Content */}
            <div className="prose prose-slate max-w-none bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h3>Does {school.name} require the TEAS 7?</h3>
                <p>
                    Yes, {school.name} requires the TEAS 7 exam. The minimum score to apply is {school.min_teas_score > 0 ? `${school.min_teas_score}%` : 'not strictly published, but usually above 70%'}. 
                    Students with a GPA near {school.avg_gpa} should aim for a TEAS score in the 80s to ensure admission.
                </p>
                <h3>Tuition & Costs</h3>
                <p>
                    In-state tuition is approximately ${school.tuition_in_state.toLocaleString()} per year. Financial aid options may be available for qualifying students.
                </p>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-sm text-slate-400 uppercase tracking-wider mb-4">Find Another School</h3>
              {/* Ensure SchoolSearch is in components/schools/ */}
              <SchoolSearch schools={getAllSchools()} />
            </div>
            
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
                <h4 className="font-bold mb-2">Ready to study?</h4>
                <p className="text-sm text-slate-300 mb-4">Get unlimited AI tutoring for the TEAS 7.</p>
                {/* Link to LearnWorlds / Checkout */}
                <a 
                    href="https://courses.studybuddy.live/checkout" 
                    className="block w-full text-center bg-teal-500 hover:bg-teal-400 py-3 rounded-lg font-bold transition-colors"
                >
                    Get Started
                </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}