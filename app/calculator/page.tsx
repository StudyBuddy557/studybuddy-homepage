import { getAllSchools } from '@/lib/data/schools';
import { EligibilityCalculator } from '@/components/calculators/EligibilityCalculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nursing School Eligibility Calculator | Am I Eligible?',
  description: 'Enter your GPA and TEAS score to see exactly which nursing programs you qualify for instantly.',
};

export default function CalculatorPage() {
  const schools = getAllSchools();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
          Where can you get in?
        </h1>
        <p className="text-xl text-slate-500">
          Stop guessing. Enter your stats to see your personal nursing school match list.
        </p>
      </div>

      <EligibilityCalculator schools={schools} />
    </div>
  );
}