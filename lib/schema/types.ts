/**
 * Schema Type Definitions
 * Core types for the Schema Engine
 */

import type { PageOntologyMapping } from '@/lib/teas/page-mapping';

export type PageSchemaType =
  | 'home'
  | 'course'
  | 'methodology'
  | 'compare'
  | 'state'
  | 'guide'
  | 'generic';

export interface SchemaContext {
  mapping: PageOntologyMapping;
}

/**
 * Schema builder function type
 * Takes context and returns an array of schema objects
 */
export type SchemaBuilder = (ctx: SchemaContext) => object[];
