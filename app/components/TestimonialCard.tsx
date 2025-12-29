import { Star, CheckCircle2 } from 'lucide-react';

export interface TestimonialData {
  name: string;
  role: string;
  score?: string;
  improvement?: string;
  quote: string;
  date: string;
}

export function TestimonialCard({ data }: { data: TestimonialData }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    'author': { '@type': 'Person', 'name': data.name },
    'reviewRating': { '@type': 'Rating', 'ratingValue': '5', 'bestRating': '5' },
    'reviewBody': data.quote,
    'datePublished': data.date,
    'itemReviewed': { '@type': 'Product', 'name': 'StudyBuddy AI TEAS Prep' }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      <div className="flex items-center gap-1 mb-4 text-amber-400">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="w-4 h-4 fill-current" />
        ))}
      </div>

      <blockquote className="text-slate-700 leading-relaxed mb-6 flex-grow">
        "{data.quote}"
      </blockquote>

      <div className="mt-auto border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold text-slate-900">{data.name}</div>
            <div className="text-xs text-slate-500 font-medium">{data.role}</div>
          </div>
          {data.score && (
            <div className="text-right">
              <div className="text-2xl font-bold text-teal-600">{data.score}</div>
              {data.improvement && (
                <div className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full inline-block">
                  {data.improvement}
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-400">
          <CheckCircle2 className="w-3 h-3 text-teal-500" />
          <span>Verified Student</span>
        </div>
      </div>
    </div>
  );
}