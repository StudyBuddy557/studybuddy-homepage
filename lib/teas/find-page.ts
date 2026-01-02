/**
 * Page Mapping Finder
 * Utility to locate ontology mappings by route
 */

import { PAGE_ONTOLOGY, type PageOntologyMapping } from './page-mapping';

/**
 * Find page ontology mapping by route
 * @param route - The Next.js route path (e.g., '/', '/pass-rate-methodology')
 * @returns The ontology mapping or null if not found
 */
export function findPageMapping(route: string): PageOntologyMapping | null {
  // Normalize route (remove trailing slash except for root)
  const normalizedRoute = route === '/' ? '/' : route.replace(/\/$/, '');

  // Direct lookup
  const mapping = Object.values(PAGE_ONTOLOGY).find(
    (m) => m.route === normalizedRoute
  );

  if (mapping) {
    return mapping;
  }

  // Check for state pages (pattern: /state/{state-slug})
  const stateMatch = normalizedRoute.match(/^\/state\/([a-z-]+)$/);
  if (stateMatch) {
    const stateSlug = stateMatch[1];
    if (!stateSlug) return null;  // Type guard
    
    return {
      pageId: `state-${stateSlug}` as const,
      route: normalizedRoute,
      title: `TEAS 7 Prep in ${formatStateSlug(stateSlug)} | StudyBuddy`,
      description: `TEAS 7 exam preparation for nursing students in ${formatStateSlug(stateSlug)}. State-specific requirements, testing centers, and study resources.`,
      sections: ['reading', 'math', 'science', 'english'],
      subskills: [],
      stateSlug
    };
  }

  return null;
}

/**
 * Format state slug for display
 * @param slug - State slug (e.g., 'new-york')
 * @returns Formatted state name (e.g., 'New York')
 */
function formatStateSlug(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
