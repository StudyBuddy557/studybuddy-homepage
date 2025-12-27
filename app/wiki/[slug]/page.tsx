import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import GapCalculator from '../../../components/wiki/GapCalculator';

const components = {
  GapCalculator,
};

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'content/wiki'));
  return files.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }));
}

export default function WikiPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  const filePath = path.join(process.cwd(), 'content/wiki', `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const { content, data } = matter(fileContent);

  return (
    // FIXED: Removed 'mx-auto' to align left, Reduced padding to tighten layout
    <article className="max-w-3xl min-w-0 py-2">
      
      {/* Header Section */}
      <header className="mb-8 pb-8 border-b border-slate-200">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
          {data.title}
        </h1>
        
        <div className="flex items-center text-sm font-semibold text-slate-500">
          <span>Last Updated: {data.lastUpdated}</span>
          <span className="mx-2 text-slate-300">•</span>
          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs uppercase tracking-wide">
            5 min read
          </span>
        </div>
      </header>

      {/* The Content Body */}
      <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600">
        <MDXRemote source={content} components={components} />
      </div>

      {/* Footer / Related Links */}
      {data.relatedWiki && (
        <div className="mt-16 pt-8 border-t border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Continue Reading</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {data.relatedWiki.map((link: string) => (
              <Link 
                key={link}
                href={`/wiki/${link}`}
                className="group block p-5 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Next Topic</span>
                  <span className="text-slate-400 group-hover:text-blue-600 transition-colors">→</span>
                </div>
                <span className="block text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors capitalize">
                  {link.replace(/-/g, ' ')}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}