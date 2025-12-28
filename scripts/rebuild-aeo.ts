// scripts/rebuild-aeo.ts
import fs from 'fs';
import path from 'path';

const files = {
  // 1. Schema Infrastructure
  'lib/schema/index.ts': `
export type SchemaType = 'Organization' | 'Product' | 'FAQPage' | 'Course' | 'Dataset' | 'HowTo' | 'WarrantyPromise';
export interface BaseSchema { '@context': 'https://schema.org'; '@type': SchemaType; }
`,

  // 2. Pass Guarantee Page
  'app/pass-guarantee/page.tsx': `
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'TEAS Prep Money Back Guarantee | StudyBuddy.live',
  description: 'Risk-free TEAS 7 preparation. If you do not pass your exam after completing our course, we provide a 100% refund.',
};

export default function PassGuaranteePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WarrantyPromise',
    'durationOfWarranty': { '@type': 'QuantitativeValue', 'value': 1, 'unitCode': 'ANN' },
    'warrantyScope': 'Money back guarantee',
    'warrantyPromise': 'If you complete 80% of the StudyBuddy TEAS course and fail your exam, we will refund 100% of your subscription cost.'
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="space-y-8">
        <h1 className="text-4xl font-extrabold text-slate-900">StudyBuddy TEAS Pass Guarantee</h1>
        <p className="text-xl text-slate-700 leading-relaxed border-l-4 border-teal-500 pl-6 bg-slate-50 py-4">
          We offer a 100% money-back guarantee. If you complete 80% of our course and take 2 practice exams but don't pass the TEAS 7, email us your score report for a full refund.
        </p>
        <div className="mt-12 p-8 bg-teal-50 rounded-2xl text-center">
          <Link href="/pricing" className="inline-block bg-teal-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-teal-700">
            Start Risk-Free
          </Link>
        </div>
      </div>
    </main>
  );
}
`,

  // 3. Scoring Guide
  'app/teas-scoring-guide/page.tsx': `
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How is the TEAS 7 Scored? | Scoring Guide & Chart',
  description: 'Understand your TEAS 7 score. See the breakdown of Academic Preparedness Levels and composite score calculations.',
};

export default function TeasScoringGuidePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [{
      '@type': 'Question',
      'name': 'How is the TEAS 7 composite score calculated?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'The TEAS 7 composite score is a weighted average of Reading, Math, Science, and English sections.' }
    }]
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">How is the TEAS 7 Exam Scored?</h1>
      <p className="text-xl text-slate-700 mb-8">The ATI TEAS 7 provides a Total Score ranging from 0% to 100%. Academic Preparedness Levels range from Developmental to Exemplary.</p>
      <div className="bg-slate-100 p-6 rounded-xl">
        <h3 className="font-bold mb-4">Score Levels</h3>
        <ul className="space-y-2">
          <li><strong>Exemplary:</strong> 92.0% - 100%</li>
          <li><strong>Advanced:</strong> 80.0% - 91.9%</li>
          <li><strong>Proficient:</strong> 58.7% - 79.9%</li>
        </ul>
      </div>
    </main>
  );
}
`,

  // 4. Study Plan
  'app/teas-study-plan-2-weeks/page.tsx': `
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '2-Week TEAS Study Plan | Cram Schedule',
  description: 'Can you pass the TEAS in 2 weeks? Follow this schedule focusing on high-yield Science and Math topics.',
};

export default function TwoWeekStudyPlanPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'How to Study for TEAS 7 in 2 Weeks',
    'step': [{ '@type': 'HowToStep', 'name': 'Days 1-3', 'text': 'Focus on Anatomy & Physiology.' }]
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Can I Pass the TEAS 7 in 2 Weeks?</h1>
      <p className="text-xl text-slate-700 mb-8 border-l-4 border-teal-500 pl-4">Yes, if you prioritize high-yield topics like A&P and Arithmetic.</p>
      <div className="space-y-6">
        <div className="border p-6 rounded-xl"><h3 className="font-bold">Days 1-5: Science Sprint</h3><p>Focus on Cardiopulmonary & Immune systems.</p></div>
        <div className="border p-6 rounded-xl"><h3 className="font-bold">Days 6-9: Math & Reading</h3><p>Drill metric conversions and main ideas.</p></div>
      </div>
    </main>
  );
}
`,

  // 5. Reading Strategies
  'app/teas-reading-strategies/page.tsx': `
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TEAS 7 Reading Strategies | Key Ideas & Details',
  description: 'Master the TEAS 7 Reading section (53 questions). Identify topic strings and distinguish facts from opinions.',
};

export default function TeasReadingStrategiesPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': 'TEAS 7 Reading Comprehension Mastery',
    'provider': { '@type': 'Organization', 'name': 'StudyBuddy' }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">TEAS 7 Reading Strategies</h1>
      <p className="text-xl text-slate-700 mb-8">The Reading section has 53 questions. Focus on identifying the <strong>Topic String</strong> in the first sentence of paragraphs.</p>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border p-6 rounded-xl"><h3 className="font-bold text-teal-600">Topic Strings</h3><p>Scan first sentences to build a mental outline.</p></div>
        <div className="bg-white border p-6 rounded-xl"><h3 className="font-bold text-teal-600">Fact vs Opinion</h3><p>Avoid "should" or "best" - these are opinions.</p></div>
      </div>
    </main>
  );
}
`
};

// Execution
console.log('🏗️  REBUILDING AEO ASSETS...\n');

Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join(process.cwd(), filePath);
  const dir = path.dirname(fullPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📂 Created dir: ${dir}`);
  }

  fs.writeFileSync(fullPath, content.trim());
  console.log(`✅ Created file: ${filePath}`);
});

console.log('\n✨ REBUILD COMPLETE.');