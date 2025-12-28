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