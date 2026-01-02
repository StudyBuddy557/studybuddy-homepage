/**
 * Schema Render Utility
 * Builds JSON-LD for pages based on their type
 */

import { schemaRegistry } from './registry';
import type { PageSchemaType, SchemaContext } from './types';

/**
 * Build JSON-LD string for a page
 * @param type - The page schema type
 * @param ctx - Schema context containing page ontology mapping
 * @returns JSON-LD string ready for injection into <script> tag
 */
export function buildJsonLdForPage(
  type: PageSchemaType,
  ctx: SchemaContext
): string {
  const builder = schemaRegistry[type] ?? schemaRegistry.generic;
  const schemas = builder(ctx);

  // Return formatted JSON-LD
  // Use graph structure when multiple schemas are present
  if (schemas.length > 1) {
    return JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@graph': schemas
      },
      null,
      2
    );
  } else if (schemas.length === 1) {
    return JSON.stringify(schemas[0], null, 2);
  }

  return '';
}
