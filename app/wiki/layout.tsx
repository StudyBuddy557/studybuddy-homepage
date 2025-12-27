import WikiSidebar from '@/components/wiki/WikiSidebar';

export default function WikiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row">
        {/* The Sidebar (Left) */}
        <WikiSidebar />

        {/* The Content (Right) */}
        {/* FIXED: 
            1. Changed pl-8 to pl-14 (3.5rem) for a cleaner "agency" gutter.
            2. Reduced pt-8 to pt-2 to remove the huge vertical gap at the top. 
        */}
        <main className="flex-1 min-w-0 md:pl-14 pt-2">
          {children}
        </main>
      </div>
    </div>
  );
}