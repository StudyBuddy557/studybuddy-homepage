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