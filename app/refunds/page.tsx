export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our Refund Policy
          </h1>
          <p className="text-xl text-slate-600">
            Built by professors who care about seeing you pass
          </p>
        </div>

        {/* Intro */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-[#20B2AA]/5 border-l-4 border-[#20B2AA] p-6 rounded-r-lg mb-8">
            <p className="text-lg leading-relaxed text-slate-800 mb-0">
              At StudyBuddy, we are built by professors who care about one thing: <strong>seeing you pass</strong>. 
              We know nursing school is expensive and stressful, so we want to treat you fairly.
            </p>
          </div>
          
          <p className="text-xl font-bold text-[#20B2AA] text-center mb-8">
            Our policy is simple: If you put in the honest effort to study, we take the risk.
          </p>
        </div>

        {/* Section 1: Cancellations */}
        <section className="mb-12 pb-12 border-b border-slate-200">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-700">
              1
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Cancellations (No Hard Feelings)
              </h2>
              <p className="text-lg text-slate-600">
                We believe you should only pay for StudyBuddy as long as it's helping you.
              </p>
            </div>
          </div>

          <div className="space-y-6 ml-16">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-[#20B2AA]">•</span> Cancel Anytime
              </h3>
              <p className="text-slate-700 leading-relaxed">
                You can turn off auto-renewal in your dashboard whenever you like.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-[#20B2AA]">•</span> Keep Your Access
              </h3>
              <p className="text-slate-700 leading-relaxed">
                If you cancel mid-billing cycle, you keep full access until the days you paid for run out. 
                We don't do partial refunds for unused days, but we never cut you off early.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Pass Guarantee */}
        <section className="mb-12 pb-12 border-b border-slate-200">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#20B2AA] flex items-center justify-center text-2xl font-bold text-white">
              2
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                The "Honest Effort" Pass Guarantee
              </h2>
              <p className="text-lg text-slate-600">
                We stand 100% behind our AI Tutor and curriculum. If you commit to the process, we commit to your result.
              </p>
            </div>
          </div>

          <div className="ml-16 space-y-6">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
              <p className="text-sm font-bold text-amber-900 uppercase tracking-wider mb-2">
                ⚡ 3-Month Plan Exclusive
              </p>
              <p className="text-slate-700 leading-relaxed">
                This guarantee is included exclusively with our <strong>3-Month Plan ($59)</strong>, because 
                passing the TEAS requires time and consistent practice.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#20B2AA]/10 to-blue-50 border-2 border-[#20B2AA]/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                The Deal: You do the work, we back the result.
              </h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-6 text-center">
                If you use the 3-Month Plan and don't pass your TEAS 7 exam, we will <strong>refund your money</strong> or 
                give you <strong>free extended coaching</strong>. We just ask that you showed an <strong>Honest Effort</strong> to prepare:
              </p>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-200">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#20B2AA] text-white flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">The Commitment</h4>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        You were on the 3-Month Plan (giving yourself enough runway to learn).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-200">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#20B2AA] text-white flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">The Work</h4>
                      <p className="text-slate-700 text-sm leading-relaxed mb-2">
                        You completed at least <strong>80% of the course</strong> and answered <strong>1,000+ practice questions</strong>.
                      </p>
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mt-2">
                        <p className="text-xs text-blue-900 font-medium">
                          <strong>Why?</strong> Our AI needs this data to identify your weak spots and fix them. 
                          We can't help if the system hasn't seen you practice!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-200">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#20B2AA] text-white flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">The Timeline</h4>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        You studied with us for at least <strong>30 days before your exam date</strong>. 
                        Cramming doesn't work, and we don't want to set you up for failure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* If Things Didn't Go Your Way */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                If things didn't go your way:
              </h3>
              
              <p className="text-slate-700 leading-relaxed mb-4">
                First, take a breath. <strong>We've got you.</strong> Just email{' '}
                <a href="mailto:support@studybuddy.live" className="text-[#20B2AA] font-bold hover:underline">
                  support@studybuddy.live
                </a>{' '}
                within <strong>7 days</strong> of getting your score. Please attach your official score report 
                so we can see what happened.
              </p>

              <p className="text-slate-700 leading-relaxed mb-4">
                We will verify your "Honest Effort" progress in the system, and then <strong>you pick</strong>:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <strong className="text-slate-900">Full Refund:</strong>
                    <span className="text-slate-700"> We send your $59 back immediately.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <strong className="text-slate-900">Free Extension:</strong>
                    <span className="text-slate-700"> We give you 60 more days of access on the house to try again.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Downloads */}
        <section className="mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-700">
              3
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                A Note on Downloads
              </h2>
            </div>
          </div>

          <div className="ml-16">
            <p className="text-slate-700 leading-relaxed">
              If you downloaded our <strong>PDF Cheat Sheets</strong> or <strong>Study Guides</strong>, 
              those are yours to keep forever! Because they can't be "returned," we generally can't offer 
              refunds on digital downloads alone, but they are included as a bonus in your subscription.
            </p>
          </div>
        </section>

        {/* Footer CTA */}
        <div className="bg-gradient-to-br from-[#20B2AA] to-[#18968F] rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            We're in this together.
          </h3>
          <p className="text-lg text-blue-50 mb-6">
            If you have any questions or just need a pep talk, email us:
          </p>
          <a 
            href="mailto:support@studybuddy.live"
            className="inline-block bg-white text-[#20B2AA] font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all text-lg"
          >
            support@studybuddy.live
          </a>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <a 
            href="/"
            className="inline-flex items-center text-slate-600 hover:text-[#20B2AA] font-medium transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}