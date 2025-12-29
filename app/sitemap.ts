// app/sitemap.ts
import { MetadataRoute } from 'next';
import { stateData } from '@/lib/state-data'; // Ensure this path matches where you put the file

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://studybuddy.live';

  // 1. Core Static Pages
  const staticRoutes = [
    '',              // Homepage
    '/diagnostic',   // Quiz
    '/dashboard',    // App
    '/pricing',      // Sales page
    '/refunds',      // Trust page
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }));

  // 2. Dynamic State Pages (The 50-State Engine)
  const stateRoutes = stateData.map((state) => ({
    url: `${baseUrl}/states/${state.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. Competitor Comparison Pages (Placeholder for future)
  // We will add these when we build the 'VS' folder logic
  
  return [...staticRoutes, ...stateRoutes];
}