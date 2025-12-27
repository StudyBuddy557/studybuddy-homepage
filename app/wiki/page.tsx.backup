import React from 'react';
import Link from 'next/link';
import { Search, Book } from 'lucide-react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const WIKI_DIR = path.join(process.cwd(), 'content/wiki');

function getAllWikiEntries() {
  const files = fs.readdirSync(WIKI_DIR);
  
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const slug = file.replace('.mdx', '');
      const filePath = path.join(WIKI_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);
      
      return {
        slug,
        title: data.title,
        category: data.category,
        definition: data.definition
      };
    });
}

export const metadata = {
  title: 'TEAS 7 Encyclopedia & Glossary | StudyBuddy',
  description: 'A comprehensive dictionary of key concepts tested on the ATI TEAS 7 exam. Definitions for Science, Math, English, and Reading topics.',
};

export default function WikiIndex() {
  const wikiEntries = getAllWikiEntries();
  const categories = ['Science', 'Math', 'English', 'Reading'];

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* HERO */}
      <section className="pt-32 pb-12 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-6 border border-indigo-100">
            <Book className="w-4 h-4" />
            KNOWLEDGE BASE
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900">
            TEAS 7 Encyclopedia
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            The ultimate glossary of terms, formulas, and concepts you need to memorize for the exam.
          </p>
        </div>
      </section>

      {/* SEARCH MOCKUP (Visual Only for now) */}
      <div className="max-w-2xl mx-auto -mt-6 px-6 relative z-10">
        <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 px-4">
          <Search className="w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search for a concept (e.g., 'Mitosis')..." 
            className="w-full py-3 outline-none text-slate-700 placeholder:text-slate-400"
            disabled
          />
        </div>
      </div>

      {/* CATEGORY GRIDS */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        
        {categories.map((cat) => {
          const categoryEntries = wikiEntries.filter(item => item.category === cat);
          
          if (categoryEntries.length === 0) return null;
          
          return (
            <div key={cat} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-8 rounded-full bg-[#20B2AA]"></span>
                {cat} Concepts
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryEntries.map((entry) => (
                  <Link 
                    key={entry.slug}
                    href={`/wiki/${entry.slug}`}
                    className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-[#20B2AA] hover:shadow-md transition-all"
                  >
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#20B2AA] transition-colors mb-2">
                      {entry.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2">
                      {entry.definition}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

      </section>
    </main>
  );
}