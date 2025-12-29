'use client';

import React from 'react';
import Link from 'next/link';

export default function StartChatButton() {
  return (
    <Link 
      href="/dashboard"
      className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white transition-all duration-200 bg-teal-600 border border-transparent rounded-xl hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-md hover:shadow-lg"
    >
      <span>Start AI Chat</span>
      <svg className="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </Link>
  );
}
