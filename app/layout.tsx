import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

// Importing your new analytics components
import GoogleTagManager from '@/components/analytics/GoogleTagManager';
import MicrosoftClarity from '@/components/analytics/MicrosoftClarity';
import EnterpriseAIConcierge from '@/components/enterprise-ai/EnterpriseAIConcierge';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});
export const metadata: Metadata = {
  metadataBase: new URL('https://studybuddy.live'),
  title: {
    default: 'StudyBuddy - TEAS 7 Prep with AI Tutor | 92% Pass Rate',
    template: '%s | StudyBuddy TEAS Prep'
  },
  description: 'Pass your TEAS 7 exam with AI-powered study tools. 4,000+ practice questions, unlimited AI tutoring, and our 100% pass guarantee. Join 500+ students who passed first try.',
  keywords: ['TEAS 7 prep', 'TEAS exam', 'nursing school prep', 'TEAS practice test', 'AI tutor', 'pass guarantee'],
  authors: [{ name: 'StudyBuddy' }],
  creator: 'StudyBuddy',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://studybuddy.live',
    siteName: 'StudyBuddy',
    title: 'StudyBuddy - TEAS 7 Prep with AI Tutor',
    description: 'Pass your TEAS 7 exam with AI-powered study tools. 92% pass rate. 100% money-back guarantee.',
    images: [
      {
        url: '/StudyBuddy_AI_tutor_Avatar.png',
        width: 400,
        height: 400,
        alt: 'StudyBuddy AI Tutor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StudyBuddy - TEAS 7 Prep with AI Tutor',
    description: 'Pass your TEAS 7 exam with AI-powered study tools. 92% pass rate.',
    images: ['/StudyBuddy_AI_tutor_Avatar.png'],
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
  alternates: {
    canonical: 'https://studybuddy.live',
  },
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        {/* NEW ANALYTICS COMPONENTS */}
        <GoogleTagManager />
        <MicrosoftClarity />
        
        {children}
        
        {/* ENTERPRISE AI CONCIERGE - Appears on all pages */}
        <EnterpriseAIConcierge />
      </body>
    </html>
  );
}
