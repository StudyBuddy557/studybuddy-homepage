'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight, BookOpen, Map, Activity, LayoutDashboard } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for clean class merging
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  variant?: 'default' | 'primary';
}

const MAIN_LINKS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'State Requirements', href: '/states', icon: Map },
  { label: 'TEAS Diagnostic', href: '/diagnostic', icon: Activity },
  { label: 'Study Wiki', href: '/wiki', icon: BookOpen }, // Contextual link placeholder
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Header Trigger */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 z-40">
        <Link href="/" className="font-extrabold text-xl tracking-tight text-slate-900">
          Study<span className="text-[#20B2AA]">Buddy</span>
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer Panel */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 w-[280px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out md:hidden flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Drawer Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
          <span className="font-bold text-lg text-slate-900">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
          
          {/* Main Navigation */}
          <nav className="space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
              Platform
            </p>
            {MAIN_LINKS.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group',
                    isActive
                      ? 'bg-[#20B2AA]/10 text-[#20B2AA] font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <link.icon className={cn("w-5 h-5", isActive ? "text-[#20B2AA]" : "text-slate-400 group-hover:text-slate-600")} />
                  {link.label}
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto text-[#20B2AA]" />}
                </Link>
              );
            })}
          </nav>

          {/* User Actions */}
          <div className="space-y-3 pt-6 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
              Account
            </p>
            <Link
              href="/login"
              className="flex items-center justify-center w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/pricing"
              className="flex items-center justify-center w-full py-3 px-4 rounded-xl bg-[#20B2AA] text-white font-semibold shadow-lg shadow-[#20B2AA]/20 hover:bg-[#18968F] hover:shadow-xl transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            © 2024 StudyBuddy AEO<br />
            Version 0.8.0
          </p>
        </div>
      </div>
    </>
  );
}