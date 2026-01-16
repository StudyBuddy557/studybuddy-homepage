import Link from 'next/link';

interface CourseCardProps {
  title: string;
  description: string;
  progress?: number;
  thumbnailUrl: string;
  learnWorldsUrl: string;
}

export default function CourseCard({ 
  title, 
  description, 
  progress = 0, 
  thumbnailUrl, 
  learnWorldsUrl 
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
      <div className="h-40 bg-slate-100 relative overflow-hidden group">
        <div className="absolute inset-0 bg-teal-600/10 flex items-center justify-center text-teal-700 font-bold text-lg">
           {title.substring(0, 2)}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-600 mb-4 flex-grow">{description}</p>
        
        <a 
          href={learnWorldsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg text-center transition-colors flex items-center justify-center gap-2"
        >
          <span>Resume Course</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </a>
      </div>
    </div>
  );
}
