import React from 'react';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { BookOpen, Calendar, User } from 'lucide-react';

export const metadata = {
  title: 'TEAS 7 Study Guides & Tips | The StudyBuddy Blog',
  description: 'Expert advice on passing the TEAS 7 exam. Scoring guides, study schedules, and section breakdowns.',
};

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <section className="pt-32 pb-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6">StudyBuddy Knowledge Hub</h1>
          <p className="text-xl text-slate-600">Guides, tips, and strategies to crush the TEAS 7.</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto grid gap-8">
          {articles.map((article) => (
            <Link 
              key={article.slug} 
              href={`/blog/${article.slug}`}
              className="group block bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#20B2AA] transition-all"
            >
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 uppercase tracking-wider font-bold">
                <span className="text-[#20B2AA]">{article.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#20B2AA] transition-colors">
                {article.title}
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                <User className="w-4 h-4" /> {article.author}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}