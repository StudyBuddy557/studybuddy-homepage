import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { MobileNav } from '@/components/layout/MobileNav';
import { Navbar } from '@/components/layout/Navbar';
import OrganizationJsonLd from '@/components/schema/OrganizationSchema';

const font = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StudyBuddy | AI-Powered TEAS 7 Prep by Nursing Professors',
  description: 'Master the TEAS 7 with unlimited AI tutoring and proprietary study tools. Created by nursing professors with a 92% student pass rate.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-slate-50 text-slate-900 antialiased`}>
        {/* AEO: Inject Schema.org data for entity recognition */}
        <OrganizationJsonLd />
        
        <Navbar />
        <MobileNav />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}