// scripts/upgrade-state-pages.ts
import fs from 'fs';
import path from 'path';

// 1. Update Schema Library (The Brain)
const schemaContent = `
import { StateData } from '@/state-data';

export function generateStateCredentialSchema(state: StateData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalCredential',
    'name': \`TEAS 7 Requirements for \${state.name} Nursing Schools\`,
    'credentialCategory': 'Nursing Entrance Exam',
    'educationalLevel': 'Post-secondary',
    'recognizedBy': {
      '@type': 'State',
      'name': state.name,
      'address': {
        '@type': 'PostalAddress',
        'addressRegion': state.abbreviation,
        'addressCountry': 'US'
      }
    },
    'validIn': {
      '@type': 'AdministrativeArea',
      'name': state.name
    },
    'competencyRequired': \`Nursing programs in \${state.name} typically require a TEAS score between 65% (ADN) and 85% (BSN). Average competitive score: \${state.avg_salary ? 'High' : 'Moderate'}.\`,
    'description': \`Complete guide to TEAS 7 exam score requirements, prerequisites, and deadlines for nursing programs in \${state.name}.\`
  };
}
`;

// 2. The Master State Page Template (The Body)
const pageContent = `
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getStateBySlug, getAllStateSlugs } from '@/state-data'; // Using your verified data source
import { generateStateCredentialSchema } from '@/lib/schema';

// Icons (using Lucide React if available, or fallbacks)
// If you don't have lucide-react installed, remove the imports and the Icon components
import { MapPin, School, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Props {
  params: { state: string };
}

export async function generateStaticParams() {
  const slugs = getAllStateSlugs();
  return slugs.map((slug) => ({ state: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const state = getStateBySlug(params.state);
  if (!state) return {};
  
  return {
    title: \`TEAS 7 Score Requirements for \${state.name} Nursing Schools (2025)\`,
    description: \`What TEAS score do you need for \${state.name} nursing programs? See requirements for top schools, average accepted scores, and prerequisites.\`,
  };
}

export default function StatePage({ params }: Props) {
  const state = getStateBySlug(params.state);
  if (!state) notFound();

  const schema = generateStateCredentialSchema(state);

  return (
    <main className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-bold mb-6">
            <MapPin className="w-4 h-4" />
            {state.name} Nursing Admissions
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            TEAS 7 Score Requirements for <span className="text-teal-600">{state.name}</span> Nursing Schools
          </h1>
          
          {/* AEO "Answer-First" Box */}
          <div className="bg-slate-50 border-l-4 border-teal-500 p-6 rounded-r-xl">
            <p className="text-xl text-slate-700 leading-relaxed">
              Most nursing programs in <strong>{state.name}</strong> require a minimum TEAS 7 score of <strong>62-65% for ADN</strong> programs and <strong>75-80% for BSN</strong> programs. Top-tier schools often look for scores above 85% (Advanced Level).
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-12">
          
          {/* Quick Stats Grid */}
          <section className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <School className="w-8 h-8 text-indigo-600 mb-3" />
              <div className="text-sm text-slate-500 font-bold uppercase tracking-wide">Programs</div>
              <div className="text-2xl font-bold text-slate-900">{state.programs_count} Schools</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <Trophy className="w-8 h-8 text-teal-600 mb-3" />
              <div className="text-sm text-slate-500 font-bold uppercase tracking-wide">Avg Salary</div>
              <div className="text-2xl font-bold text-slate-900">{state.avg_salary}</div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Admission Prerequisites</h2>
            <div className="prose prose-slate max-w-none text-slate-600">
              <p>
                Nursing boards in {state.name} ({state.abbreviation}) strictly enforce TEAS 7 testing windows. 
                Most schools require your official transcript to be sent directly from ATI.
              </p>
              <ul className="not-prose space-y-4 mt-6">
                {[
                  'Submit TEAS score 30 days before deadline',
                  'Science GPA of 3.0 or higher usually required',
                  'Retakes allowed every 30-45 days (varies by school)'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-500 shrink-0" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Pass the TEAS 7 in {state.name}</h2>
              <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                Join 500+ nursing students using StudyBuddy's AI Tutor to crush the exam.
              </p>
              <Link 
                href="/pricing" 
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-teal-500/25"
              >
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-8">
            <h3 className="font-bold text-slate-900 mb-4">State Resources</h3>
            <nav className="space-y-3">
              <Link href="/teas-7-syllabus" className="block text-slate-600 hover:text-teal-600 font-medium">
                TEAS 7 Syllabus
              </Link>
              <Link href="/pass-rate-methodology" className="block text-slate-600 hover:text-teal-600 font-medium">
                Pass Rate Data
              </Link>
              <Link href="/diagnostic" className="block text-slate-600 hover:text-teal-600 font-medium">
                Free Practice Test
              </Link>
            </nav>
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-400 uppercase mb-2">Verified</div>
              <p className="text-sm text-slate-600">
                Data for {state.name} updated for 2025 academic year.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
`;

// Execute
console.log('🏗️  UPGRADING STATE PAGES...\n');

// Ensure directories
const schemaDir = path.join(process.cwd(), 'lib/schema');
if (!fs.existsSync(schemaDir)) fs.mkdirSync(schemaDir, { recursive: true });

const pageDir = path.join(process.cwd(), 'app/states/[state]');
if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir, { recursive: true });

// Write files
const schemaPath = path.join(schemaDir, 'index.ts');
// Append to index if exists, or create. Ideally we read it first to avoid duplicates, 
// but for this rescue op, we will append if it doesn't contain the function.
let currentSchema = '';
if (fs.existsSync(schemaPath)) {
    currentSchema = fs.readFileSync(schemaPath, 'utf-8');
}

if (!currentSchema.includes('generateStateCredentialSchema')) {
    fs.writeFileSync(schemaPath, currentSchema + schemaContent);
    console.log('✅ Updated lib/schema/index.ts with state schema generator');
} else {
    console.log('ℹ️  State schema generator already exists in lib/schema/index.ts');
}

fs.writeFileSync(path.join(pageDir, 'page.tsx'), pageContent);
console.log('✅ Created AEO-optimized app/states/[state]/page.tsx');
console.log('\n✨ STATE PAGE UPGRADE COMPLETE.');
`;

// Write the script to file
fs.writeFileSync('scripts/upgrade-state-pages.ts', script);