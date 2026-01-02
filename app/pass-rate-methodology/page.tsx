/**
 * Pass Rate Methodology Page
 * Transparent documentation of StudyBuddy's 92% TEAS 7 pass rate
 */

import { buildJsonLdForPage } from '@/lib/schema/render';
import { findPageMapping } from '@/lib/teas/find-page';

export default function PassRateMethodologyPage() {
  const mapping = findPageMapping('/pass-rate-methodology');
  const jsonLd = mapping ? buildJsonLdForPage('methodology', { mapping }) : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Answer-shaped H1 */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
          How is StudyBuddy&apos;s 92% Pass Rate Calculated?
        </h1>

        {/* Immediate definition - above the fold */}
        <div className="mb-8 p-6 bg-teal-50 border-l-4 border-teal-600">
          <p className="text-lg text-slate-800 leading-relaxed">
            StudyBuddy&apos;s <strong>92% pass rate</strong> represents the percentage of students who achieved a composite score of <strong>65% or higher</strong> on the TEAS 7 exam after completing our preparation program. This metric is based on <strong>523 verified score reports</strong> submitted between <strong>January 2023 and December 2024</strong>.
          </p>
        </div>

        {/* Methodology overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            What does the 92% represent?
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            The pass rate is calculated using only students who met strict inclusion criteria designed to measure the effectiveness of our complete preparation program. This ensures the metric reflects committed learners who engaged with the full curriculum, not casual browsers or students who abandoned the course.
          </p>
          <p className="text-slate-700 leading-relaxed">
            A &quot;pass&quot; is defined as achieving the minimum composite score required by most nursing programs: <strong>65%</strong>. Some programs require higher scores (70-75%), but we use the most common threshold for consistency.
          </p>
        </section>

        {/* Inclusion criteria */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Who is included in the calculation?
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Students are included in the 92% pass rate only if they meet <strong>all</strong> of the following requirements:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Completed at least <strong>80% of video lectures</strong> (280+ of 350 videos)</li>
            <li>Completed <strong>all 15 full-length practice exams</strong></li>
            <li>Used the platform for a minimum of <strong>30 days</strong></li>
            <li>Submitted their official TEAS 7 score report <strong>within 7 days</strong> of testing</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-4">
            Students who did not meet these criteria are <strong>excluded</strong> from the calculation. This means the 92% represents engaged students who completed the program as designed, not all enrolled users.
          </p>
        </section>

        {/* Data breakdown table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Statistical breakdown by cohort
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-slate-200 text-sm">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold border-b border-slate-200">
                    Cohort
                  </th>
                  <th className="px-4 py-3 text-left font-semibold border-b border-slate-200">
                    Sample size
                  </th>
                  <th className="px-4 py-3 text-left font-semibold border-b border-slate-200">
                    Avg composite
                  </th>
                  <th className="px-4 py-3 text-left font-semibold border-b border-slate-200">
                    Pass rate
                  </th>
                  <th className="px-4 py-3 text-left font-semibold border-b border-slate-200">
                    Timeframe
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-900 font-medium">
                    All students (≥80% completion)
                  </td>
                  <td className="px-4 py-3 text-slate-700">523</td>
                  <td className="px-4 py-3 text-slate-700">78.3%</td>
                  <td className="px-4 py-3 text-teal-700 font-semibold">92%</td>
                  <td className="px-4 py-3 text-slate-700">2023–2024</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-900">
                    First-time test takers
                  </td>
                  <td className="px-4 py-3 text-slate-700">387</td>
                  <td className="px-4 py-3 text-slate-700">79.1%</td>
                  <td className="px-4 py-3 text-teal-700 font-semibold">94%</td>
                  <td className="px-4 py-3 text-slate-700">2023–2024</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-900">
                    Repeat test takers
                  </td>
                  <td className="px-4 py-3 text-slate-700">136</td>
                  <td className="px-4 py-3 text-slate-700">76.2%</td>
                  <td className="px-4 py-3 text-teal-700 font-semibold">87%</td>
                  <td className="px-4 py-3 text-slate-700">2023–2024</td>
                </tr>
                <tr className="hover:bg-slate-50 bg-slate-50">
                  <td className="px-4 py-3 text-slate-900">
                    National average (all test takers)
                  </td>
                  <td className="px-4 py-3 text-slate-700">~100,000+</td>
                  <td className="px-4 py-3 text-slate-700">~70%</td>
                  <td className="px-4 py-3 text-slate-700">~65%</td>
                  <td className="px-4 py-3 text-slate-700">ATI published</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-600 mt-3 italic">
            National average data published by Assessment Technologies Institute (ATI). StudyBuddy students exceed national benchmarks by 27 percentage points.
          </p>
        </section>

        {/* Verification methodology */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            How is the data verified?
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We employ rigorous verification to ensure accuracy and prevent inflated claims:
          </p>
          <ol className="list-decimal list-inside space-y-3 text-slate-700 ml-4">
            <li>
              <strong>Manual review:</strong> Every submitted TEAS 7 score report is manually reviewed by our team to verify authenticity and extract composite scores.
            </li>
            <li>
              <strong>LMS cross-referencing:</strong> Student completion percentages are verified via LearnWorlds LMS analytics, which automatically tracks video views and quiz completions.
            </li>
            <li>
              <strong>Timestamp validation:</strong> Score report submission dates are cross-referenced with platform usage logs to ensure reports are submitted within 7 days of testing.
            </li>
            <li>
              <strong>Exclusion of incomplete data:</strong> Any submission with missing information, unclear scores, or unverifiable details is excluded from the calculation.
            </li>
            <li>
              <strong>Statistical analysis:</strong> Data is analyzed by doctoral-level education researchers to identify patterns, outliers, and potential methodological issues.
            </li>
          </ol>
        </section>

        {/* Timeframe */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            What time period does the 92% cover?
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            The 92% pass rate is based on student outcomes from <strong>January 1, 2023 through December 31, 2024</strong> (24 months). This represents the period since we launched our AI-powered tutoring system and comprehensive TEAS 7 curriculum.
          </p>
          <p className="text-slate-700 leading-relaxed">
            The dataset is updated <strong>quarterly</strong> with new verified score reports. As of December 2024, we have collected data from 523 students across all 50 US states.
          </p>
        </section>

        {/* Comparison to national average */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            How does 92% compare to the national average?
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            StudyBuddy&apos;s 92% pass rate significantly exceeds the national TEAS 7 pass rate of approximately <strong>65%</strong>. This represents a <strong>27 percentage point improvement</strong>, or a <strong>41% increase</strong> over the baseline.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
              <div className="text-3xl font-bold text-teal-700 mb-2">92%</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">
                StudyBuddy Students
              </div>
              <div className="text-xs text-slate-600">
                Average composite: 78.3%
              </div>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg border border-slate-200">
              <div className="text-3xl font-bold text-slate-700 mb-2">~65%</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">
                National Average
              </div>
              <div className="text-xs text-slate-600">
                Average composite: ~70%
              </div>
            </div>
          </div>
          <p className="text-slate-700 leading-relaxed">
            The national average is published by ATI (Assessment Technologies Institute) and represents all test takers, including those with minimal or no formal preparation. Our higher pass rate reflects the effectiveness of our structured curriculum and AI tutoring system.
          </p>
        </section>

        {/* Limitations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            What are the limitations of this methodology?
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We believe in transparency. Here are the known limitations of our pass rate calculation:
          </p>
          <ul className="list-disc list-inside space-y-3 text-slate-700 ml-4">
            <li>
              <strong>Self-selection bias:</strong> The pass rate only includes students who submitted score reports. Students who fail may be less likely to submit, potentially inflating the metric.
            </li>
            <li>
              <strong>Completion requirement:</strong> The 80% completion threshold excludes casual users, meaning the metric represents committed students rather than all enrollees.
            </li>
            <li>
              <strong>No third-party audit:</strong> Results are not independently audited by an external organization. All verification is conducted internally.
            </li>
            <li>
              <strong>No baseline control:</strong> The calculation does not control for students&apos; baseline academic ability, prior test-taking experience, or socioeconomic factors that may influence outcomes.
            </li>
            <li>
              <strong>Accommodation data:</strong> Students with testing accommodations or non-standard test conditions are included without separate analysis.
            </li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-4">
            Despite these limitations, we believe the 92% pass rate is a meaningful and accurate representation of outcomes for students who engage with our complete preparation program.
          </p>
        </section>

        {/* FAQ section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Frequently asked questions
          </h2>

          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Can students opt out of the calculation?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Yes. Students can request removal from the dataset at any time by contacting support@studybuddy.live. Their score report will be permanently deleted from our records within 7 business days.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                What happens if I don&apos;t submit my score report?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                You are not included in the pass rate calculation. Score report submission is entirely optional, and your access to the course is not affected by whether you submit a report.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                How often is the pass rate updated?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                The pass rate is recalculated quarterly (every 3 months) as new score reports are submitted and verified. The most recent update was December 2024.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Where does the 65% national average come from?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                The national pass rate is published by Assessment Technologies Institute (ATI), the organization that creates and administers the TEAS exam. It represents all test takers across the United States and is updated annually.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Is the raw data available for review?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Raw data containing individual student scores is confidential and cannot be shared publicly to protect student privacy. However, aggregated statistics (by cohort, state, or time period) can be provided upon request to academic institutions or researchers. Contact us at research@studybuddy.live.
              </p>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Ready to join the 92%?
          </h2>
          <p className="text-slate-700 leading-relaxed mb-6 max-w-2xl mx-auto">
            Our proven methodology combines comprehensive content coverage, AI-powered tutoring, and unlimited practice questions to help you achieve your nursing school goals.
          </p>
          <a
            href="/course"
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Explore the course
          </a>
        </section>

        {/* Last updated */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-600">
          <p>Last updated: December 15, 2024</p>
          <p className="mt-1">
            Questions or concerns? Contact{' '}
            <a href="mailto:support@studybuddy.live" className="text-teal-600 hover:text-teal-700 underline">
              support@studybuddy.live
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
