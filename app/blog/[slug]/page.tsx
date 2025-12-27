import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug, getAllArticleSlugs } from '@/lib/articles';
import { Calendar, User, ChevronLeft } from 'lucide-react';
import Script from 'next/script';
import { Metadata } from 'next';

// 1. GENERATE STATIC PARAMS
export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

// 2. DYNAMIC METADATA
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} | StudyBuddy`,
    description: article.excerpt,
  };
}

// 3. PAGE COMPONENT
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    datePublished: article.date,
    publisher: {
      '@type': 'Organization',
      name: 'StudyBuddy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.studybuddy.live/logo.png',
      },
    },
  };

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-teal-50 selection:text-teal-900">
      <Script
        id={`article-schema-${article.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* HEADER */}
      <section className="pt-32 pb-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-[#20B2AA] mb-8 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Knowledge Hub
          </Link>
          <div className="text-[#20B2AA] font-bold tracking-wider text-xs uppercase mb-4">
            {article.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-slate-900 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-6 text-slate-500 text-sm">
            <span className="flex items-center gap-2"><User className="w-4 h-4" /> {article.author}</span>
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {article.date}</span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <article className="py-16 px-6">
        <div 
          className="max-w-3xl mx-auto prose prose-lg prose-slate prose-headings:font-bold prose-a:text-[#20B2AA] hover:prose-a:text-[#18968F]"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4">Ready to Apply This Knowledge?</h2>
          <p className="text-slate-300 mb-8">Start your personalized study plan today with our AI Tutor.</p>
          <Link href="/diagnostic" className="inline-block px-8 py-3 bg-[#20B2AA] rounded-xl font-bold hover:bg-[#18968F] transition-all">
            Start Free Diagnostic
          </Link>
        </div>
      </section>

    </main>
  );
}