// ============================================================================
// SCHOOLS TABLE COMPONENT - Institutional Data Display
// ============================================================================
// Purpose: Present actionable comparison data for nursing programs
// SEO Value: Keyword-rich institutional names and requirements
// ============================================================================

import type { StateData } from '@/lib/state-data';

interface SchoolsTableProps {
  stateData: StateData;
}

export default function SchoolsTable({ stateData }: SchoolsTableProps) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          {stateData.name} Nursing Schools TEAS Requirements
        </h2>
        <p className="text-lg text-slate-600 mb-8">
          Compare minimum TEAS scores for {stateData.programsCount} nursing programs across {stateData.name}
        </p>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-teal-700 text-white">
                <th className="px-6 py-4 text-left font-semibold">
                  Institution Name
                </th>
                <th className="px-6 py-4 text-left font-semibold">
                  Location
                </th>
                <th className="px-6 py-4 text-left font-semibold">
                  Program Type
                </th>
                <th className="px-6 py-4 text-left font-semibold">
                  Minimum TEAS Score
                </th>
                <th className="px-6 py-4 text-left font-semibold">
                  Acceptance Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {stateData.topSchools.map((school, index) => (
                <tr
                  key={index}
                  className={`border-b border-slate-200 hover:bg-slate-50 transition-colors duration-150 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                  }`}
                >
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {school.name}
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    {school.city}, {stateData.abbreviation}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                      {school.programType || 'BSN'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-bold text-teal-700">
                      {school.minTeasScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    {school.acceptanceRate || 'Varies'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {stateData.topSchools.map((school, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg border border-slate-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-lg text-slate-900 pr-2">
                  {school.name}
                </h3>
                <span className="inline-block bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                  {school.programType || 'BSN'}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-700">
                  <svg className="w-5 h-5 text-teal-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{school.city}, {stateData.abbreviation}</span>
                </div>

                <div className="flex items-center justify-between py-3 px-4 bg-teal-50 rounded-lg border border-teal-200">
                  <span className="text-sm font-medium text-teal-900">
                    Minimum TEAS Score
                  </span>
                  <span className="text-2xl font-bold text-teal-700">
                    {school.minTeasScore}
                  </span>
                </div>

                {school.acceptanceRate && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Acceptance Rate</span>
                    <span className="font-semibold text-slate-900">
                      {school.acceptanceRate}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-Action Below Table */}
        <div className="mt-8 bg-gradient-to-r from-teal-700 to-teal-600 rounded-lg shadow-xl p-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Not Meeting {stateData.name}'s Requirements?
          </h3>
          <p className="text-lg text-teal-50 mb-6 max-w-2xl mx-auto">
            Our AI-powered study plans are customized for {stateData.name} admission standards. 
            Join {stateData.socialProof.studentsFromState.split(' ')[0]} who achieved their target scores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`/pricing?state=${stateData.slug}&utm_source=state-page&utm_medium=table-cta`}
              className="inline-block bg-white text-teal-700 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors duration-200 shadow-lg text-lg"
            >
              Build My {stateData.name} Study Plan
            </a>
            <a
              href={`/diagnostic?ref=state-${stateData.slug}&utm_source=state-page&utm_medium=table-cta-secondary`}
              className="inline-block bg-teal-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-900 transition-colors duration-200 border-2 border-white text-lg"
            >
              Calculate My Score Potential
            </a>
          </div>
        </div>

        {/* Additional Context */}
        <div className="mt-8 bg-slate-50 rounded-lg p-6 border border-slate-200">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-slate-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">
                Note on TEAS Requirements
              </h4>
              <p className="text-slate-700 leading-relaxed">
                Minimum TEAS scores are the baseline requirements for {stateData.name} nursing programs. 
                Competitive applicants typically score {stateData.avgTeasScore - 2}-{stateData.avgTeasScore + 5}% higher 
                than minimums. Programs also consider GPA, prerequisite courses, healthcare experience, and essays in 
                admissions decisions. Requirements are updated annually, so verify with specific programs before applying.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}