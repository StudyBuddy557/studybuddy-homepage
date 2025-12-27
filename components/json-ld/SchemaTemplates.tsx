import React from 'react';

// --- Types ---
interface CourseProps {
  name: string;
  description: string;
  provider: string;
}

interface ProductProps {
  name: string;
  description: string;
  image: string;
  price: string;
  ratingValue?: number;
  reviewCount?: number;
}

interface ProfessorProps {
  name: string;
  jobTitle: string;
  degree: string; // e.g., "PhD in Nursing Education"
  alumniOf: string; // e.g., "University of Texas"
  image?: string;
}

interface DatasetProps {
  name: string; // e.g., "TEAS 7 Pass Rate Statistics"
  description: string;
  variableMeasured: string; // e.g., "Student Pass Rate"
  value: string; // e.g., "92%"
}

// --- Components ---

export function CourseSchema({ name, description, provider }: CourseProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: name,
    description: description,
    provider: {
      '@type': 'Organization',
      name: provider,
      sameAs: 'https://studybuddy.live'
    }
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductSchema({ name, description, image, price, ratingValue = 4.8, reviewCount = 500 }: ProductProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    image: image,
    description: description,
    brand: {
      '@type': 'Brand',
      name: 'StudyBuddy'
    },
    offers: {
      '@type': 'Offer',
      url: 'https://studybuddy.live',
      priceCurrency: 'USD',
      price: price,
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue,
      reviewCount: reviewCount
    }
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProfessorSchema({ name, jobTitle, degree, alumniOf, image }: ProfessorProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name,
    jobTitle: jobTitle,
    image: image || 'https://studybuddy.live/default-prof.jpg',
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      educationalLevel: degree,
      recognizedBy: {
        '@type': 'CollegeOrUniversity',
        name: alumniOf
      }
    },
    worksFor: {
      '@type': 'Organization',
      name: 'StudyBuddy'
    }
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function DatasetSchema({ name, description, variableMeasured, value }: DatasetProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: name,
    description: description,
    variableMeasured: variableMeasured,
    measurementTechnique: 'Internal user data analysis',
    creator: {
      '@type': 'Organization',
      name: 'StudyBuddy'
    },
    distribution: {
      '@type': 'DataDownload',
      contentUrl: 'https://studybuddy.live/pass-rate-methodology',
      encodingFormat: 'text/html'
    }
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}