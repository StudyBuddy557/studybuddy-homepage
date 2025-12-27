import Image from 'next/image';
import Button from '@/components/ui/Button';
import VideoPlayer from './VideoPlayer';

export default function Hero(): JSX.Element {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-text-dark">
      {/* LCP Element: Hero Poster Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://placehold.co/1920x1080/00A9B7/FFFFFF/png?text=StudyBuddy+Hero"
          alt="StudyBuddy nursing exam preparation platform"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8dPh4PQAHBgL0qT3lAAAAAElFTkSuQmCC"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Video Player (Client Component - loads after LCP) */}
      <VideoPlayer />

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-text-light mb-6 leading-tight">
          Ace Your Nursing Exam
          <span className="block text-brand-teal mt-2">
            With AI-Powered Prep
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Join 500+ students achieving a <span className="font-bold text-brand-yellow">92% pass rate</span> on TEAS, HESI, and NCLEX exams.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="primary" 
            size="lg"
            href="#pricing"
          >
            Start Free Trial
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
            href="#features"
          >
            See How It Works
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-brand-text-light/80 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-yellow" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>4,000+ Practice Questions</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>350+ Video Lessons</span>
          </div>
        </div>
      </div>
    </section>
  );
}
