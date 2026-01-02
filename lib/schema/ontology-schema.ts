/**
 * Ontology Schema Builder
 * Creates WebPage schemas with TEAS ontology relationships
 */

import type { WithContext, WebPage, DefinedTerm } from 'schema-dts';
import type { PageOntologyMapping } from '@/lib/teas/page-mapping';
import { TEAS_SECTIONS, TEAS_SUBSKILLS } from '@/lib/teas/ontology-data';
import { ORG_ID, TEAS_ENTITY_ID } from './organization';

/**
 * Generate ontology-aware WebPage schema
 * Includes structured mentions of TEAS sections and subskills
 */
export function getOntologyWebPageSchema(
  mapping: PageOntologyMapping
): WithContext<WebPage> {
  const fullUrl = `https://studybuddy.live${mapping.route}`;

  // Build mentions array from sections and subskills
  const mentions: DefinedTerm[] = [];

  // Add section mentions
  mapping.sections.forEach((sectionId) => {
    const section = TEAS_SECTIONS[sectionId];
    if (section) {
      mentions.push({
        '@type': 'DefinedTerm',
        '@id': `https://studybuddy.live/teas-7-exam#section-${sectionId}`,
        name: section.name,
        description: section.description,
        inDefinedTermSet: TEAS_ENTITY_ID,
        termCode: sectionId
      });
    }
  });

  // Add subskill mentions
  mapping.subskills.forEach((subskillId) => {
    const subskill = TEAS_SUBSKILLS[subskillId];
    if (subskill) {
      mentions.push({
        '@type': 'DefinedTerm',
        '@id': `https://studybuddy.live/teas-7-exam#subskill-${subskillId}`,
        name: subskill.name,
        description: subskill.description,
        inDefinedTermSet: `https://studybuddy.live/teas-7-exam#section-${subskill.sectionId}`,
        termCode: subskillId
      });
    }
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${fullUrl}#webpage`,
    url: fullUrl,
    name: mapping.title,
    description: mapping.description,
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://studybuddy.live#website',
      url: 'https://studybuddy.live',
      name: 'StudyBuddy',
      publisher: {
        '@id': ORG_ID
      }
    },
    about: {
      '@type': 'EducationalOccupationalCredential',
      '@id': TEAS_ENTITY_ID,
      name: 'TEAS 7 Exam',
      description: 'Test of Essential Academic Skills (TEAS) Version 7 - standardized nursing school entrance exam',
      credentialCategory: 'Nursing School Entrance Exam',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Assessment Technologies Institute (ATI)'
      }
    },
    mentions: mentions.length > 0 ? mentions : undefined,
    inLanguage: 'en-US',
    lastReviewed: '2024-12-01',
    reviewedBy: {
      '@id': ORG_ID
    }
  };
}
