/**
 * Schema Registry
 * Maps page types to their schema builders
 */

import type { SchemaBuilder, PageSchemaType } from './types';
import { getOrganizationSchema } from './organization';
import { getOntologyWebPageSchema } from './ontology-schema';
import { getPageOutcomeDatasetSchema } from './ontology-dataset';
import { getProfessorSchemas } from './professor-schema';
import { getPassRateMethodologyFaqSchema } from './faq-schema';
import { getPassRateMethodologyDatasetSchema } from './methodology-dataset';

/**
 * Schema builder for methodology page
 * Comprehensive schema for pass rate documentation
 */
const methodologyBuilder: SchemaBuilder = (ctx) => {
  const schemas: object[] = [];

  // 1. Base organization
  schemas.push(getOrganizationSchema());

  // 2. WebPage with ontology relationships
  schemas.push(getOntologyWebPageSchema(ctx.mapping));

  // 3. Specialized methodology dataset
  schemas.push(getPassRateMethodologyDatasetSchema());

  // 4. Generic outcomes dataset (if available)
  const outcomeDataset = getPageOutcomeDatasetSchema(ctx.mapping);
  if (outcomeDataset) {
    schemas.push(outcomeDataset);
  }

  // 5. FAQ schema
  schemas.push(getPassRateMethodologyFaqSchema());

  // 6. Professor credibility schemas
  schemas.push(...getProfessorSchemas());

  return schemas;
};

/**
 * Schema builder for home page
 */
const homeBuilder: SchemaBuilder = (ctx) => {
  const schemas: object[] = [];

  schemas.push(getOrganizationSchema());
  schemas.push(getOntologyWebPageSchema(ctx.mapping));

  const outcomeDataset = getPageOutcomeDatasetSchema(ctx.mapping);
  if (outcomeDataset) {
    schemas.push(outcomeDataset);
  }

  return schemas;
};

/**
 * Schema builder for course page
 */
const courseBuilder: SchemaBuilder = (ctx) => {
  const schemas: object[] = [];

  schemas.push(getOrganizationSchema());
  schemas.push(getOntologyWebPageSchema(ctx.mapping));

  const outcomeDataset = getPageOutcomeDatasetSchema(ctx.mapping);
  if (outcomeDataset) {
    schemas.push(outcomeDataset);
  }

  return schemas;
};

/**
 * Schema builder for comparison pages
 */
const compareBuilder: SchemaBuilder = (ctx) => {
  const schemas: object[] = [];

  schemas.push(getOrganizationSchema());
  schemas.push(getOntologyWebPageSchema(ctx.mapping));

  return schemas;
};

/**
 * Schema builder for state pages
 */
const stateBuilder: SchemaBuilder = (ctx) => {
  const schemas: object[] = [];

  schemas.push(getOrganizationSchema());
  schemas.push(getOntologyWebPageSchema(ctx.mapping));

  return schemas;
};

/**
 * Schema builder for guide pages
 */
const guideBuilder: SchemaBuilder = (ctx) => {
  const schemas: object[] = [];

  schemas.push(getOrganizationSchema());
  schemas.push(getOntologyWebPageSchema(ctx.mapping));

  const outcomeDataset = getPageOutcomeDatasetSchema(ctx.mapping);
  if (outcomeDataset) {
    schemas.push(outcomeDataset);
  }

  return schemas;
};

/**
 * Generic schema builder (fallback)
 */
const genericBuilder: SchemaBuilder = (ctx) => {
  const schemas: object[] = [];

  schemas.push(getOrganizationSchema());
  schemas.push(getOntologyWebPageSchema(ctx.mapping));

  return schemas;
};

/**
 * Schema registry
 * Maps page types to their schema builders
 */
export const schemaRegistry: Record<PageSchemaType, SchemaBuilder> = {
  home: homeBuilder,
  course: courseBuilder,
  methodology: methodologyBuilder,
  compare: compareBuilder,
  state: stateBuilder,
  guide: guideBuilder,
  generic: genericBuilder
};
