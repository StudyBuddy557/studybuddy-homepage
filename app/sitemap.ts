import { MetadataRoute } from 'next';
import { stateData } from '@/lib/state-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.studybuddy.live';

  // 1. Define your core static pages
  const staticRoutes = [
    '',              // Homepage
    '/diagnostic',
    '/dashboard',
    '/pricing',
    '/refunds',
    '/pass-rate-methodology',
    '/ai-tutor',
    '/is-studybuddy-legit',
    '/compare/teas-prep-courses',
    '/teas-7-syllabus'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }));

  // 2. Generate dynamic state pages from your data
  // This loops through 'california', 'texas', etc.
  const stateRoutes = stateData.map((state) => ({
    url: `${baseUrl}/states/${state.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. Combine them
  return [...staticRoutes, ...stateRoutes];
}
