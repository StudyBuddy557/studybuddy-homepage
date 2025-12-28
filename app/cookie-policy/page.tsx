export const metadata = {
  title: 'Cookie Policy | StudyBuddy',
  description: 'How StudyBuddy uses cookies to improve your experience.',
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Cookie Policy</h1>
        <div className="prose prose-slate max-w-none text-slate-600">
          <p className="text-lg mb-6">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work efficiently.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. How We Use Cookies</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Essential Cookies:</strong> Required for the website to function (e.g., logging in).</li>
            <li><strong>Analytical Cookies:</strong> Help us count visitors and see how they move around the site.</li>
            <li><strong>Marketing Cookies:</strong> Used to track effectiveness of advertising.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Managing Cookies</h2>
          <p>
            Most web browsers allow control of cookies through browser settings. To learn more, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">www.aboutcookies.org</a>.
          </p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Contact Us</h2>
          <p>
            Questions? Contact us at <a href="mailto:support@studybuddy.live" className="text-teal-600 underline">support@studybuddy.live</a>.
          </p>
        </div>
      </div>
    </main>
  );
}