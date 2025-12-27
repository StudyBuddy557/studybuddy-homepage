'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { title: 'TEAS 7 Overview', href: '/wiki/teas-7-exam' },
  { title: 'Scoring Guide', href: '/wiki/teas-scoring' },
  { title: 'Registration Steps', href: '/wiki/teas-registration' },
];

export default function WikiSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-full md:w-72 md:flex-shrink-0 pr-8 hidden md:block">
      {/* UPDATED: Changed top-28 to top-32 to clear the new taller header */}
      <div className="sticky top-32">
        <div className="pl-4 pb-4 border-b border-slate-100 mb-4">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
            Exam Handbook
          </h3>
          <p className="text-xs text-slate-500 mt-1">Updated for 2026 Season</p>
        </div>
        
        <ul className="space-y-1 relative">
          {/* Subtle vertical line for connection */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200" />
          
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} className="relative">
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                )}
                <Link
                  href={item.href}
                  className={`block pl-5 py-2.5 text-sm transition-all duration-200 ${
                    isActive
                      ? 'text-blue-700 font-semibold bg-blue-50/50'
                      : 'text-slate-500 hover:text-slate-900 hover:pl-6'
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Pro Feature: Callout in Sidebar */}
        <div className="mt-8 p-4 bg-slate-900 rounded-xl text-white shadow-xl">
          <p className="text-xs font-bold text-blue-300 uppercase mb-2">Study Tip</p>
          <p className="text-xs leading-relaxed text-slate-300">
            Most students fail the Science section. Start there first.
          </p>
        </div>
      </div>
    </nav>
  );
}