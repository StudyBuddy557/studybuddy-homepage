import React from 'react';
import Link from 'next/link';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
          >
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to StudyBuddy
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-sm text-gray-500">Last Updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-gray prose-lg max-w-none">
          {children}
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <nav className="flex flex-wrap gap-6 text-sm">
            <Link href="/privacy" className="text-gray-600 hover:text-teal-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-teal-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="/refunds" className="text-gray-600 hover:text-teal-600 transition-colors">
              Refund Policy
            </Link>
            <a href="mailto:support@studybuddy.live" className="text-gray-600 hover:text-teal-600 transition-colors">
              Contact Support
            </a>
          </nav>
        </div>
      </main>
    </div>
  );
}