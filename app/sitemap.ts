import { MetadataRoute } from 'next';
import { getAllSchools } from '@/lib/data/schools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://studybuddy.live'; // Change this to your real domain
  const schools = getAllSchools();

  // 1. Core Static Pages
  const routes = [
    '',
    '/calculator',
    '/pricing',
    '/diagnostic',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1.0,
  }));

  // 2. Dynamic School Profiles (350+ pages)
  const schoolRoutes = schools.map((school) => ({
    url: `${baseUrl}/schools/${school.state.toLowerCase()}/${school.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 3. Dynamic Comparison Pages (High Volume)
  // Strategy: We only list the top comparisons to avoid sitemap bloat (optional)
  // For now, let's list comparisons for the top 5 most popular schools against each other
  // or leave this blank to let Google discover them via internal links.
  // Let's rely on internal linking for comparisons for now to keep the sitemap clean.

  return [...routes, ...schoolRoutes];
}