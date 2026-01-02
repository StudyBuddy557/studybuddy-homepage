/**
 * Ontology Dataset Schema
 * Creates Dataset schemas for pages with outcome metrics
 */

import type { WithContext, Dataset } from 'schema-dts';
import type { PageOntologyMapping } from '@/lib/teas/page-mapping';
import { ORG_ID, TEAS_ENTITY_ID } from './organization';

/**
 * Generate Dataset schema for page outcomes
 * Only returns a dataset if mapping has outcome metrics
 */
export function getPageOutcomeDatasetSchema(
  mapping: PageOntologyMapping
): WithContext<Dataset> | null {
  if (!mapping.outcomes) {
    return null;
  }

  const fullUrl = `https://studybuddy.live${mapping.route}`;
  const outcomes = mapping.outcomes;

  // Build variable measured array
  const variableMeasured: Array<{ '@type': 'PropertyValue'; name: string; description: string; value?: number }> = [];

  if (outcomes.passRate !== undefined) {
    variableMeasured.push({
      '@type': 'PropertyValue',
      name: 'Pass Rate',
      description: 'Percentage of students who passed the TEAS 7 exam after completing StudyBuddy course requirements',
      value: outcomes.passRate
    });
  }

  if (outcomes.avgScore !== undefined) {
    variableMeasured.push({
      '@type': 'PropertyValue',
      name: 'Average Score',
      description: 'Mean composite TEAS 7 score for StudyBuddy students',
      value: outcomes.avgScore
    });
  }

  if (outcomes.questionCount !== undefined) {
    variableMeasured.push({
      '@type': 'PropertyValue',
      name: 'Sample Size',
      description: 'Number of students or practice questions in the dataset',
      value: outcomes.questionCount
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    '@id': `${fullUrl}#outcomes-dataset`,
    name: `StudyBuddy TEAS 7 Outcome Metrics - ${mapping.title}`,
    description: `Statistical outcomes and performance metrics for StudyBuddy TEAS 7 students. Pass rate: ${outcomes.passRate}%, Average score: ${outcomes.avgScore}, Sample size: ${outcomes.questionCount}.`,
    creator: {
      '@id': ORG_ID
    },
    about: {
      '@id': TEAS_ENTITY_ID
    },
    license: 'https://creativecommons.org/licenses/by-nc/4.0/',
    temporalCoverage: '2023-01-01/2024-12-31',
    spatialCoverage: {
      '@type': 'Place',
      geo: {
        '@type': 'GeoShape',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'US'
        }
      }
    },
    variableMeasured: variableMeasured,
    distribution: {
      '@type': 'DataDownload',
      encodingFormat: 'application/json',
      contentUrl: fullUrl
    },
    datePublished: '2024-01-15',
    dateModified: '2024-12-01',
    keywords: [
      'TEAS 7',
      'nursing exam',
      'pass rate',
      'student outcomes',
      'test preparation',
      'academic performance'
    ]
  };
}
