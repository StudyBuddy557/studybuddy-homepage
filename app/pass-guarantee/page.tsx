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