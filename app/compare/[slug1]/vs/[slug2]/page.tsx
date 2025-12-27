import { notFound } from 'next/navigation';
import { getSchoolBySlug, getAllSchools } from '@/lib/data/schools'; // Updated Import
import { SchoolComparison } from '@/components/compare/SchoolComparison';
import { SchoolSearch } from '@/components/schools/SchoolSearch';
import { Metadata } from 'next';

interface PageProps {
    params: { slug1: string; slug2: string };
}

// Dynamic Metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const s1 = getSchoolBySlug(params.slug1);
    const s2 = getSchoolBySlug(params.slug2);
    
    if (!s1 || !s2) return {};
    
    return {
        title: `${s1.name} vs ${s2.name}: Nursing Program Comparison`,
        description: `Compare acceptance rates, tuition, and TEAS score requirements for ${s1.name} and ${s2.name}. See which program is right for you.`
    };
}

export default function ComparePage({ params }: PageProps) {
  const s1 = getSchoolBySlug(params.slug1);
  const s2 = getSchoolBySlug(params.slug2);

  if (!s1 || !s2) notFound();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
          Nursing Program Face-Off
        </h1>
        <p className="text-lg text-slate-500">
           Comparing <strong>{s1.name}</strong> vs <strong>{s2.name}</strong>
        </p>
      </div>

      {/* The Comparison Engine */}
      <div className="mb-16">
        <SchoolComparison school1={s1} school2={s2} />
      </div>

      {/* Internal Linking / Sidebar Area */}
      <div className="max-w-md mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4 text-center">Compare Other Schools</h3>
            {/* Correctly passing the full list of schools now */}
            <SchoolSearch schools={getAllSchools()} /> 
        </div>
      </div>
    </div>
  );
}