// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 text-center px-4">
      <h1 className="text-4xl font-bold text-teal-600 mb-2">404</h1>
      <p className="mb-6 text-slate-600">This page does not exist.</p>
      <Link href="/" className="text-teal-600 hover:underline">
        Return Home
      </Link>
    </div>
  );
}