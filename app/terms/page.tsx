export const metadata = {
  title: 'Terms of Service | StudyBuddy',
  description: 'The rules and regulations for using StudyBuddy.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>
        <div className="prose prose-slate max-w-none text-slate-600">
          <p className="text-lg mb-6">Last Updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using StudyBuddy, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Usage License</h2>
          <p>
            Permission is granted to temporarily access the materials (information or software) on StudyBuddy's website for personal, non-commercial transitory viewing only.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Account Security</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of the United States.
          </p>
        </div>
      </div>
    </main>
  );
}