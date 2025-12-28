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