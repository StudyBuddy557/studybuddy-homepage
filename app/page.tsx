/**
 * Home Page - Example Implementation
 * Demonstrates schema injection with the Schema Engine
 */

import { buildJsonLdForPage } from '@/lib/schema/render';
import { findPageMapping } from '@/lib/teas/find-page';

export default function HomePage() {
  const mapping = findPageMapping('/');
  const jsonLd = mapping ? buildJsonLdForPage('home', { mapping }) : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-teal-50 to-white py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6">
              Master the TEAS 7 Exam with
              <span className="text-teal-600"> AI-Powered Tutoring</span>
            </h1>
            <p className="text-xl text-slate-700 mb-8 max-w-3xl mx-auto">
              Join 500+ students who achieved a 92% pass rate using our comprehensive
              TEAS 7 preparation course. Beat the 65% national average with personalized
              AI coaching and 4,000+ practice questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/course"
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
              >
                Start Learning Today
              </a>
              <a
                href="/pass-rate-methodology"
                className="bg-white hover:bg-slate-50 text-teal-700 border-2 border-teal-600 font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
              >
                See Our Methodology
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
                <div className="text-5xl font-bold text-teal-600 mb-2">92%</div>
                <div className="text-lg font-semibold text-slate-900 mb-1">
                  Pass Rate
                </div>
                <div className="text-sm text-slate-600">
                  vs 65% national average
                </div>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
                <div className="text-5xl font-bold text-teal-600 mb-2">78.3%</div>
                <div className="text-lg font-semibold text-slate-900 mb-1">
                  Average Score
                </div>
                <div className="text-sm text-slate-600">
                  vs 70% national average
                </div>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
                <div className="text-5xl font-bold text-teal-600 mb-2">4,000+</div>
                <div className="text-lg font-semibold text-slate-900 mb-1">
                  Practice Questions
                </div>
                <div className="text-sm text-slate-600">
                  Across all TEAS 7 sections
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TEAS Sections Coverage */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">
              Complete Coverage of All TEAS 7 Sections
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border border-slate-200 rounded-lg hover:border-teal-500 transition-colors">
                <h3 className="text-2xl font-bold text-teal-700 mb-3">
                  📖 Reading
                </h3>
                <p className="text-slate-700 mb-4">
                  45 scored questions in 55 minutes. Master key ideas, text structure,
                  and integration of knowledge with targeted practice.
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Key Ideas and Details</li>
                  <li>• Craft and Structure</li>
                  <li>• Integration of Knowledge and Ideas</li>
                </ul>
              </div>

              <div className="p-6 border border-slate-200 rounded-lg hover:border-teal-500 transition-colors">
                <h3 className="text-2xl font-bold text-teal-700 mb-3">
                  🔢 Mathematics
                </h3>
                <p className="text-slate-700 mb-4">
                  38 scored questions in 57 minutes. Excel in numbers, algebra,
                  measurements, and data interpretation.
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Numbers and Algebra</li>
                  <li>• Measurement and Data</li>
                </ul>
              </div>

              <div className="p-6 border border-slate-200 rounded-lg hover:border-teal-500 transition-colors">
                <h3 className="text-2xl font-bold text-teal-700 mb-3">
                  🔬 Science
                </h3>
                <p className="text-slate-700 mb-4">
                  50 scored questions in 60 minutes. Comprehensive coverage of anatomy,
                  biology, chemistry, and scientific reasoning.
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Human Anatomy and Physiology</li>
                  <li>• Biology</li>
                  <li>• Chemistry</li>
                  <li>• Scientific Reasoning</li>
                </ul>
              </div>

              <div className="p-6 border border-slate-200 rounded-lg hover:border-teal-500 transition-colors">
                <h3 className="text-2xl font-bold text-teal-700 mb-3">
                  ✍️ English
                </h3>
                <p className="text-slate-700 mb-4">
                  37 scored questions in 37 minutes. Perfect your grammar, language
                  knowledge, and vocabulary for nursing communication.
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Conventions of Standard English</li>
                  <li>• Knowledge of Language</li>
                  <li>• Using Language and Vocabulary</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">
              Why StudyBuddy Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🤖</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  AI-Powered Tutoring
                </h3>
                <p className="text-slate-700">
                  Get instant, personalized explanations for every question. Our AI
                  identifies your weak areas and creates custom study plans.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Proven Results
                </h3>
                <p className="text-slate-700">
                  92% pass rate backed by transparent methodology. See our complete
                  statistical analysis and student outcomes.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎓</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Expert-Created Content
                </h3>
                <p className="text-slate-700">
                  Developed by doctoral-level biology professors and nurse educators
                  with 15+ years of experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-teal-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Join the 92%?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start your journey to nursing school today with proven TEAS 7 preparation.
            </p>
            <a
              href="/course"
              className="inline-block bg-white text-teal-700 font-semibold px-10 py-4 rounded-lg text-lg hover:bg-slate-50 transition-colors"
            >
              Get Started Now
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
