import { MetadataRoute } from 'next';
// CORRECTED IMPORT PATH:
import { stateData } from '@/lib/state-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://studybuddy.live';

  const staticRoutes = [
    '',              // Homepage
    '/diagnostic',   // Quiz
    '/dashboard',    // App
    '/pricing',      // Sales page
    '/refunds',      // Trust page
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

  const stateRoutes = stateData.map((state) => ({
    url: `${baseUrl}/states/${state.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...stateRoutes];
}
