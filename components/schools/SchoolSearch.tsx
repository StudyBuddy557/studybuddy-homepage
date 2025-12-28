'use client';
import { Search } from 'lucide-react';
export function SchoolSearch() {
  return (
    <div className="relative max-w-xl">
      <input type="text" className="block w-full border border-slate-200 rounded-xl p-3" placeholder="Search..." />
    </div>
  );
}
