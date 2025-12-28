export const metadata = {
  title: 'Privacy Policy | StudyBuddy',
  description: 'How we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none text-slate-600">
          <p className="text-lg mb-6">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact customer support. This may include your name, email address, and payment information (processed securely by Stripe).
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. How We Use Your Data</h2>
          <p>
            We use your information to provide, maintain, and improve our services, process transactions, and send you technical notices and support messages. We do <strong>not</strong> sell your personal data to third parties.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Cookies & Tracking</h2>
          <p>
            We use cookies to authenticate your session and remember your preferences. You can control cookie settings through your browser preferences.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@studybuddy.live" className="text-teal-600 underline">support@studybuddy.live</a>.
          </p>
        </div>
      </div>
    </main>
  );
}