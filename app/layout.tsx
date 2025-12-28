import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { MobileNav } from './components/layout/MobileNav';
import { Navbar } from '@/components/layout/Navbar';

const font = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StudyBuddy | AI-Powered TEAS 7 Prep',
  description: 'Master the TEAS 7 with unlimited AI tutoring and proprietary study tools.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-slate-50 text-slate-900 antialiased`}>
        <Navbar />
        <MobileNav />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
