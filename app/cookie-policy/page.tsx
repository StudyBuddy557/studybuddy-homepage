import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | StudyBuddy',
  description: 'Legal documentation for StudyBuddy.',
};

export default function LegalPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 max-w-4xl mx-auto font-sans">
      <h1 className="text-4xl font-bold mb-8 capitalize">Cookie Policy</h1>
      <p className="text-slate-600">Legal content pending update.</p>
    </main>
  );
}