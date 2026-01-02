/**
 * Pass Rate Methodology Dataset Schema
 * Specialized dataset for the methodology page
 */

import type { WithContext, Dataset } from 'schema-dts';
import { ORG_ID, TEAS_ENTITY_ID } from './organization';

/**
 * Get Dataset schema for pass rate methodology
 * This is a detailed research dataset documenting the 92% claim
 */
export function getPassRateMethodologyDatasetSchema(): WithContext<Dataset> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    '@id': 'https://studybuddy.live/pass-rate-methodology#methodology-dataset',
    name: 'StudyBuddy TEAS 7 Pass Rate Methodology and Statistical Analysis',
    alternateName: '92% Pass Rate Calculation Dataset',
    description: 'Comprehensive documentation of StudyBuddy\'s 92% TEAS 7 pass rate methodology, including sample size (500+ students), inclusion criteria (80% completion, score report submission), timeframe (2023-2024), verification procedures, and statistical analysis. Dataset includes cohort breakdowns for first-time test takers, repeat test takers, and state-level performance variations.',
    creator: {
      '@id': ORG_ID
    },
    contributor: [
      {
        '@id': 'https://studybuddy.live/about#professor-biology'
      },
      {
        '@id': 'https://studybuddy.live/about#professor-nursing'
      }
    ],
    about: {
      '@id': TEAS_ENTITY_ID
    },
    keywords: [
      'TEAS 7 pass rate',
      'nursing exam statistics',
      'test preparation outcomes',
      'educational data',
      'student performance metrics',
      'standardized test results',
      'nursing school entrance exam',
      'ATI TEAS',
      'evidence-based education'
    ],
    license: 'https://creativecommons.org/licenses/by-nc/4.0/',
    isAccessibleForFree: true,
    temporalCoverage: '2023-01-01/2024-12-31',
    spatialCoverage: {
      '@type': 'Place',
      name: 'United States',
      geo: {
        '@type': 'GeoShape',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'US'
        }
      }
    },
    variableMeasured: [
      {
        '@type': 'PropertyValue',
        '@id': 'https://studybuddy.live/pass-rate-methodology#variable-pass-rate',
        name: 'TEAS 7 Pass Rate',
        description: 'Percentage of students achieving a composite score of 65% or higher on the TEAS 7 exam',
        value: 92,
        unitText: 'percent',
        measurementTechnique: 'Manual verification of official TEAS 7 score reports submitted within 7 days of testing'
      },
      {
        '@type': 'PropertyValue',
        '@id': 'https://studybuddy.live/pass-rate-methodology#variable-avg-score',
        name: 'Average Composite Score',
        description: 'Mean TEAS 7 composite percentage across all verified student score reports',
        value: 78.3,
        unitText: 'percent',
        measurementTechnique: 'Calculated from verified TEAS 7 score reports'
      },
      {
        '@type': 'PropertyValue',
        '@id': 'https://studybuddy.live/pass-rate-methodology#variable-sample-size',
        name: 'Sample Size',
        description: 'Total number of students who met inclusion criteria and submitted verified score reports',
        value: 523,
        unitText: 'students',
        measurementTechnique: 'Count of verified submissions in LearnWorlds LMS'
      },
      {
        '@type': 'PropertyValue',
        '@id': 'https://studybuddy.live/pass-rate-methodology#variable-completion-rate',
        name: 'Course Completion Threshold',
        description: 'Minimum percentage of course content completed to be included in pass rate calculation',
        value: 80,
        unitText: 'percent',
        measurementTechnique: 'Automated tracking via LearnWorlds LMS analytics'
      },
      {
        '@type': 'PropertyValue',
        '@id': 'https://studybuddy.live/pass-rate-methodology#variable-study-duration',
        name: 'Minimum Study Duration',
        description: 'Minimum number of days students must use the platform to be included',
        value: 30,
        unitText: 'days',
        measurementTechnique: 'Enrollment date to last activity date in LMS'
      }
    ],
    distribution: [
      {
        '@type': 'DataDownload',
        encodingFormat: 'text/html',
        contentUrl: 'https://studybuddy.live/pass-rate-methodology'
      }
    ],
    datePublished: '2024-01-15',
    dateModified: '2024-12-15',
    inLanguage: 'en-US',
    citation: [
      {
        '@type': 'ScholarlyArticle',
        name: 'TEAS National Performance Benchmarks',
        author: {
          '@type': 'Organization',
          name: 'Assessment Technologies Institute (ATI)'
        },
        description: 'National average TEAS pass rate of approximately 65%'
      }
    ],
    funding: {
      '@type': 'Grant',
      funder: {
        '@id': ORG_ID
      },
      description: 'Self-funded educational research project'
    },
    measurementTechnique: [
      'Manual verification of TEAS 7 official score reports',
      'Automated LMS completion tracking via LearnWorlds API',
      'Cross-referencing enrollment data with score submission timestamps',
      'Exclusion of unverifiable or incomplete submissions',
      'Statistical analysis by doctoral-level education researchers'
    ],
    includedInDataCatalog: {
      '@type': 'DataCatalog',
      name: 'StudyBuddy Educational Outcomes Database',
      description: 'Comprehensive database of student performance metrics and educational research'
    }
  };
}
