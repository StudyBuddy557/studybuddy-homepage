// ============================================================================
// STATE LANDING PAGE - Triple-Optimized Dynamic Route
// ============================================================================
// Framework: Next.js 14 App Router with TypeScript
// Rendering: Static Site Generation (SSG) for all 50 states
// Optimization: SEO + AEO + CRO architecture
// ============================================================================

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getStateData, getAllStateSlugs, getRelatedStates } from '@/lib/state-data';
import StateSchema from '@/components/StateSchema';
import AnswerBox from '@/components/AnswerBox';
import UrgencyBanner from '@/components/UrgencyBanner';
import SchoolsTable from '@/components/SchoolsTable';
import FAQSection from '@/components/FAQSection';
import LocalProofSection from '@/components/LocalProofSection';
import JsonLd from '@/app/components/JsonLd';
import { buildJsonLdForPage } from '@/lib/schema/render';
import { findPageMapping } from '@/lib/teas/find-page';

// ============================================================================
// STATIC GENERATION CONFIGURATION
// ============================================================================

export async function generateStaticParams() {
  const slugs = getAllStateSlugs();
  return slugs.map((slug) => ({
    state: slug,
  }));
}

// ============================================================================
// METADATA GENERATION - SEO Optimization
// ============================================================================

export async function generateMetadata({ params }: { params: { state: string } }): Promise<Metadata> {
  const stateData = getStateData(params.state);

  if (!stateData) {
    return {
      title: 'State Not Found',
    };
  }

  const title = `${stateData.name} TEAS Score Requirements 2026 | Nursing School Prep`;
  const description = stateData.metaDescription;
  const url = `https://studybuddy.live/states/${stateData.slug}`;
  const imageUrl = `https://studybuddy.live/images/states/${stateData.slug}-og.jpg`;

  return {
    title,
    description,
    keywords: [
      `${stateData.name} TEAS requirements`,
      `${stateData.name} nursing schools`,
      `TEAS score ${stateData.abbreviation}`,
      'nursing school preparation',
      'TEAS 7 study guide',
      ...(stateData.stateSpecificKeywords || []),
    ],
    openGraph: {
      title,
      description,
      url,
      siteName: 'StudyBuddy',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${stateData.name} TEAS Requirements Guide`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// ============================================================================
// PAGE COMPONENT - F-Pattern Layout for Conversion
// ============================================================================

export default function StatePage({ params }: { params: { state: string } }) {
  const stateData = getStateData(params.state);

  // Handle invalid state slugs
  if (!stateData) {
    notFound();
  }

  const relatedStates = getRelatedStates(params.state);

  // Generate schema from Schema Engine (auto-handles all 50 states)
  const mapping = findPageMapping(`/state/${params.state}`);
  const jsonLd = mapping ? buildJsonLdForPage('state', { mapping }) : null;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Existing Schema Engine Integration */}
      {jsonLd && (
        <script
          type="application/json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}

      {/* New Schema.org Structured Data - AEO Critical */}
      <StateSchema stateData={stateData} />

      {/* Urgency Banner - Sticky Top Position */}
      <UrgencyBanner stateData={stateData} />

      {/* Hero Section - Above-the-Fold Priority */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-teal-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-4xl">
            {/* Breadcrumb Navigation */}
            <nav className="mb-6 text-teal-100" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/states" className="hover:text-white transition-colors">
                    State Requirements
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white font-medium" aria-current="page">
                  {stateData.name}
                </li>
              </ol>
            </nav>

            {/* H1 - SEO Critical */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              TEAS Score Requirements for {stateData.name} Nursing Schools (2026)
            </h1>

            {/* Subheading with Key Stats */}
            <p className="text-xl md:text-2xl text-teal-50 mb-8">
              {stateData.programsCount} nursing programs reviewed • {stateData.avgTeasScore}% average competitive score
            </p>

            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/pricing?state=${stateData.slug}&utm_source=state-page&utm_medium=hero-cta`}
                className="inline-block bg-white text-teal-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-teal-50 transition-colors duration-200 shadow-xl text-center"
              >
                Build My {stateData.name} Study Plan →
              </Link>
              <Link
                href={`/diagnostic?ref=state-${stateData.slug}&utm_source=state-page&utm_medium=hero-cta-secondary`}
                className="inline-block bg-teal-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-teal-900 transition-colors duration-200 border-2 border-teal-300 text-center"
              >
                Free Score Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Answer Box - AEO Critical Component */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <AnswerBox stateData={stateData} />
        </div>
      </section>

      {/* Schools Comparison Table */}
      <SchoolsTable stateData={stateData} />

      {/* Social Proof Section - CRO Critical */}
      <LocalProofSection stateData={stateData} />

      {/* FAQ Section - AEO & SEO Critical */}
      <FAQSection stateData={stateData} />

      {/* Study Plan Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            How StudyBuddy Prepares You for {stateData.name} Programs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: AI-Powered Personalization */}
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <div className="bg-teal-700 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 7H7v6h6V7z" />
                  <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                AI Diagnostic Assessment
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Our AI analyzes your strengths and weaknesses to create a personalized study plan targeting 
                {stateData.name}'s {stateData.avgTeasScore}% competitive benchmark.
              </p>
            </div>

            {/* Feature 2: Adaptive Learning */}
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <div className="bg-teal-700 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4,000+ Practice Questions
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Master all four TEAS sections with unlimited practice questions that adapt to your learning pace. 
                {stateData.socialProof.avgScoreIncrease} average improvement in 6-8 weeks.
              </p>
            </div>

            {/* Feature 3: Video Lessons */}
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <div className="bg-teal-700 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                350+ Video Lessons
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Comprehensive video library covering anatomy, physiology, math, reading comprehension, 
                and English language—everything tested on the TEAS 7.
              </p>
            </div>
          </div>

          {/* CTA After Features */}
          <div className="mt-12 text-center">
            <Link
              href={`/pricing?state=${stateData.slug}&utm_source=state-page&utm_medium=features-cta`}
              className="inline-block bg-teal-700 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-teal-600 transition-colors duration-200 shadow-lg"
            >
              Start Your Free Trial Today →
            </Link>
            <p className="text-slate-600 mt-4">
              Join {stateData.socialProof.studentsFromState} achieving their nursing school goals
            </p>
          </div>
        </div>
      </section>

      {/* Related States Section - Internal Linking */}
      {relatedStates.length > 0 && (
        <section className="py-12 bg-slate-100">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
              Compare Requirements in Nearby States
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedStates.map((state) => (
                <Link
                  key={state.slug}
                  href={`/states/${state.slug}`}
                  className="bg-white rounded-lg shadow-md p-6 border border-slate-200 hover:shadow-lg hover:border-teal-700 transition-all duration-200"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {state.name}
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-600">Avg. TEAS Score</span>
                    <span className="text-2xl font-bold text-teal-700">
                      {state.avgTeasScore}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Programs</span>
                    <span className="font-semibold text-slate-900">
                      {state.programsCount}
                    </span>
                  </div>
                  <div className="mt-4 text-teal-700 font-medium flex items-center gap-1">
                    View Requirements
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final Conversion Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Ace Your {stateData.name} Nursing School Application?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            {stateData.socialProof.passRate} of our {stateData.name} students meet their target TEAS score. 
            Start your personalized study plan today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/pricing?state=${stateData.slug}&utm_source=state-page&utm_medium=final-cta`}
              className="inline-block bg-teal-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-teal-500 transition-colors duration-200 shadow-xl"
            >
              Get Started - $24.99/month
            </Link>
            <Link
              href="/pricing#guarantee"
              className="inline-block bg-slate-700 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-slate-600 transition-colors duration-200 border-2 border-slate-500"
            >
              View Pass Guarantee
            </Link>
          </div>
          <p className="text-slate-400 mt-6 text-sm">
            No credit card required for free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* JSON-LD Analytics Event (for conversion tracking) */}
      <script
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            event: 'page_view',
            page_type: 'state_landing',
            state_slug: stateData.slug,
            state_name: stateData.name,
            avg_teas_score: stateData.avgTeasScore,
            market_tier: stateData.marketSize,
          }),
        }}
      />
    </main>
  );
}