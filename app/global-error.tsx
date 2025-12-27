// app/global-error.tsx
'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-10 text-center font-sans">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Critical System Error</h2>
          <p className="text-slate-600 mb-8 max-w-md">
            The application crashed in the main layout. This is usually due to a missing component (like Navbar) or a font issue.
          </p>
          <div className="p-4 bg-slate-100 rounded text-left text-xs font-mono text-slate-500 mb-8 overflow-auto max-w-lg">
             {error.message}
          </div>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-slate-900 text-white font-bold rounded hover:bg-slate-800 transition-colors"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}