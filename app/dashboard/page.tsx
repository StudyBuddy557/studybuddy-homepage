// app/dashboard/page.tsx
import Link from 'next/link';
import CourseCard from '../components/dashboard/CourseCard';
import AITutorCard from '../components/dashboard/AITutorCard';

// CONFIGURATION: Deep-link directly to the player
const TEAS_COURSE = {
  id: 'teas-exam-prep',
  title: 'TEAS 7 Exam Prep Course',
  description: 'Your complete dashboard for Video Lectures, Question Bank, and Practice Exams.',
  progress: 0, 
  thumbnailUrl: '', 
  // THE FIX: "path-player" takes them inside the course
  learnWorldsUrl: 'https://learn.studybuddy.live/path-player?courseid=teas-exam-prep-course' 
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Student Dashboard</h1>
              <p className="text-slate-500 mt-1">Welcome back! Let's get you ready for nursing school.</p>
            </div>
            
            {/* Primary Action: Direct Resume */}
            <a 
              href={TEAS_COURSE.learnWorldsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-all"
            >
              Resume Study Session &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Course Card */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Your Active Course</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* The TEAS Course Card */}
            <CourseCard 
              title={TEAS_COURSE.title}
              description={TEAS_COURSE.description}
              progress={TEAS_COURSE.progress}
              thumbnailUrl={TEAS_COURSE.thumbnailUrl}
              learnWorldsUrl={TEAS_COURSE.learnWorldsUrl}
            />

            {/* AI Tutor Card */}
            <AITutorCard />
            
            {/* Diagnostic Link */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between transition-shadow hover:shadow-md">
               <div>
                 <h3 className="font-bold text-slate-900 text-lg mb-2">Diagnostic Quiz</h3>
                 <p className="text-slate-500 text-sm mb-4">Re-take the assessment to track your improvement.</p>
               </div>
               <Link href="/diagnostic" className="w-full text-center px-4 py-2 border border-slate-200 hover:border-teal-500 hover:text-teal-600 rounded-lg text-sm font-semibold transition-colors">
                 View Results / Retake
               </Link>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}