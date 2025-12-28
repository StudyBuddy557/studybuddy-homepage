// lib/schema/state-schema.ts
import { StateData } from '@/lib/state-data';

export function generateStateCredentialSchema(state: StateData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalCredential',
    'name': `TEAS 7 Requirements for ${state.name} Nursing Schools`,
    'credentialCategory': 'Nursing Entrance Exam',
    'educationalLevel': 'Post-secondary',
    'recognizedBy': {
      '@type': 'State',
      'name': state.name,
      'address': {
        '@type': 'PostalAddress',
        'addressRegion': state.abbreviation,
        'addressCountry': 'US'
      }
    },
    'validIn': {
      '@type': 'AdministrativeArea',
      'name': state.name
    },
    'competencyRequired': `Nursing programs in ${state.name} typically require a TEAS score between 65% (ADN) and 85% (BSN). Average competitive score: ${state.avg_salary ? 'High' : 'Moderate'}.`,
    'description': `Complete guide to TEAS 7 exam score requirements, prerequisites, and deadlines for nursing programs in ${state.name}.`
  };
}