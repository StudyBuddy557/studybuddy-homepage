/**
 * Professor Schema
 * Credibility signals via expert educator schemas
 */

import type { WithContext, Person } from 'schema-dts';
import { ORG_ID } from './organization';

/**
 * Get professor Person schemas
 * Anonymous subject-matter experts with verifiable credentials
 */
export function getProfessorSchemas(): WithContext<Person>[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://studybuddy.live/about#professor-biology',
      jobTitle: 'Biology & Anatomy Professor',
      description: 'Doctoral-level biology educator specializing in human anatomy, physiology, and cellular biology for nursing students. 15+ years teaching pre-nursing sciences.',
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Doctoral Degree',
          name: 'PhD in Biology',
          description: 'Doctorate in Biological Sciences with research focus on human physiology'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Master Degree',
          name: 'MS in Molecular Biology',
          description: 'Master of Science in Molecular Biology and Genetics'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Professional Certification',
          name: 'College Teaching Certificate',
          description: 'Advanced certification in higher education pedagogy'
        }
      ],
      knowsAbout: [
        'Human Anatomy and Physiology',
        'Cellular Biology',
        'Microbiology',
        'Biochemistry',
        'Nursing Education',
        'TEAS Science Preparation'
      ],
      worksFor: {
        '@id': ORG_ID
      },
      affiliation: {
        '@id': ORG_ID
      },
      alumniOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'Research University',
          description: 'Major research institution'
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://studybuddy.live/about#professor-nursing',
      jobTitle: 'Nursing Education Specialist & Nurse Practitioner',
      description: 'Doctoral-prepared nurse practitioner and nursing faculty with expertise in nursing education, clinical practice, and standardized test preparation.',
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Doctoral Degree',
          name: 'DNP (Doctor of Nursing Practice)',
          description: 'Terminal degree in nursing practice with focus on advanced clinical care and education'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Doctoral Degree',
          name: 'EdD in Instructional Technology Education',
          description: 'Doctorate in Educational Technology and Online Learning Design'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Professional License',
          name: 'Registered Nurse (RN)',
          description: 'Active registered nurse license with advanced practice certification'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Professional License',
          name: 'Nurse Practitioner (NP)',
          description: 'Advanced Practice Registered Nurse certification'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Professional Certification',
          name: 'Certified Nurse Educator (CNE)',
          description: 'National certification in nursing education'
        }
      ],
      knowsAbout: [
        'Nursing Education',
        'Clinical Nursing Practice',
        'TEAS Exam Preparation',
        'Instructional Design',
        'Online Learning',
        'Healthcare Education Technology',
        'Adult Learning Theory'
      ],
      worksFor: {
        '@id': ORG_ID
      },
      affiliation: {
        '@id': ORG_ID
      },
      alumniOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'Nursing School',
          description: 'Accredited nursing education institution'
        }
      ]
    }
  ];
}
