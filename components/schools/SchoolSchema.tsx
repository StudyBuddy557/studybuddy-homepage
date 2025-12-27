import { School } from '@/lib/types/school';

export function SchoolSchema({ school }: { school: School }) {
  const jsonLd = {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Nursing Degree",
    "educationalLevel": "Associate / Bachelor",
    "competencyRequired": `TEAS Score: ${school.min_teas_score > 0 ? school.min_teas_score : 'Competitive'}`,
    "recognizedBy": {
      "@type": "EducationalOrganization",
      "name": school.name,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": school.city,
        "addressRegion": school.state
      }
    },
    "description": `Admission requirements for ${school.name} ${school.program_name}. Acceptance Rate: ${school.acceptance_rate}%. Average GPA: ${school.avg_gpa}.`
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}