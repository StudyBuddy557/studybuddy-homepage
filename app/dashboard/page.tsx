export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Student Dashboard</h1>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Welcome back!</h2>
          <p className="text-gray-600">
            This dashboard is for logged-in students. The AI assistant is available site-wide in the bottom right corner.
          </p>
        </div>
      </div>
    </div>
  );
}
