// components/StateSchema.tsx
import { StateData } from '@/state-data'; // Assuming you have this interface

interface StateSchemaProps {
  state: StateData;
}

export function StateSchema({ state }: StateSchemaProps) {
  // This schema tells Google/LLMs that this page describes a specific credential (TEAS)
  // valid in a specific region (The State), recognized by specific organizations (Nursing Schools).
  const schema = {
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
    'competencyRequired': `Minimum TEAS score varies by program. Average competitive score in ${state.name} is ${state.avg_salary ? 'approx ' + state.avg_salary + '/yr equivalent skill level' : 'variable'}.`, // Mapping salary implies professional level, adjust if you have score data
    'description': `Complete guide to TEAS 7 exam score requirements, prerequisites, and deadlines for nursing programs in ${state.name}.`
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}