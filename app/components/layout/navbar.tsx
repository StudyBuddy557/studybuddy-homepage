'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out hidden md:block',
        isScrolled
          ? 'h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm'
          : 'h-24 bg-transparent border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-[#20B2AA] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#20B2AA]/20 group-hover:scale-110 transition-transform">
            S
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900">
            Study<span className="text-[#20B2AA]">Buddy</span>
          </span>
        </Link>

        <nav className="flex items-center gap-8">
          {[
            { label: 'Diagnostic', href: '/diagnostic' },
            { label: 'Syllabus', href: '/teas-7-syllabus' },
            { label: 'State Reqs', href: '/states' },
            { label: 'Pricing', href: '/pricing' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'text-sm font-bold transition-colors',
                pathname === link.href
                  ? 'text-[#20B2AA]'
                  : 'text-slate-500 hover:text-slate-900'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://learn.studybuddy.live/login"
            className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Log In
          </a>
          <Link
            href="/pricing"
            className="px-6 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-sm font-bold shadow-lg hover:bg-[#20B2AA] hover:shadow-[#20B2AA]/25 hover:-translate-y-0.5 transition-all"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
