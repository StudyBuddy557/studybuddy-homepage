import { Organization, WithContext, Course, Product, Person, Dataset, SoftwareApplication, EducationalOccupationalCredential } from 'schema-dts';

// Base URL for the site
const BASE_URL = 'https://studybuddy.live';

// --- 1. COURSE SCHEMA (Syllabus, Guides) ---
export function generateCourseSchema(data: {
  title: string;
  description: string;
  syllabusSections: string[];
}): WithContext<Course> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: data.title,
    description: data.description,
    provider: {
      '@type': 'Organization',
      name: 'StudyBuddy',
      sameAs: BASE_URL,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT80H', // Approx 80 hours
    },
    syllabusSections: data.syllabusSections.map(section => ({
      '@type': 'Syllabus',
      name: section,
    })),
  };
}

// --- 2. PRODUCT SCHEMA (Comparisons, Pricing) ---
export function generateProductSchema(data: {
  name: string;
  description: string;
  image?: string;
  price: string;
  rating?: number;
  reviewCount?: number;
}): WithContext<Product> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.name,
    description: data.description,
    image: data.image || `${BASE_URL}/logo.png`,
    brand: {
      '@type': 'Brand',
      name: 'StudyBuddy',
    },
    offers: {
      '@type': 'Offer',
      price: data.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/OnlineOnly',
      url: `${BASE_URL}/#pricing`,
    },
    ...(data.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: data.rating,
        reviewCount: data.reviewCount || 500,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };
}

// --- 3. PERSON SCHEMA (Professors) ---
export function generateProfessorSchema(data: {
  name?: string; // Optional, usually we use "StudyBuddy Instructor" for privacy if needed
  jobTitle: string;
  degrees: string[]; // e.g., ["PhD in Immunology", "DNP"]
  alumniOf: string[];
}): WithContext<Person> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name || 'StudyBuddy Lead Instructor',
    jobTitle: data.jobTitle,
    worksFor: {
      '@type': 'Organization',
      name: 'StudyBuddy',
    },
    hasCredential: data.degrees.map(degree => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      name: degree,
    })),
    alumniOf: data.alumniOf.map(school => ({
      '@type': 'CollegeOrUniversity',
      name: school,
    })),
  };
}

// --- 4. DATASET SCHEMA (Pass Rate Methodology) ---
export function generatePassRateSchema(data: {
  passRate: string; // "92%"
  sampleSize: number;
  startDate: string;
  endDate: string;
  methodology: string;
}): WithContext<Dataset> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'StudyBuddy TEAS 7 Pass Rate Statistics',
    description: `Pass rate data derived from ${data.sampleSize} students between ${data.startDate} and ${data.endDate}.`,
    creator: {
      '@type': 'Organization',
      name: 'StudyBuddy',
    },
    variableMeasured: 'NCLEX/TEAS Pass Rate',
    measurementTechnique: data.methodology,
    datePublished: new Date().toISOString().split('T')[0],
  };
}

// --- 5. SOFTWARE APPLICATION SCHEMA (AI Tutor) ---
export function generateAiTutorSchema(): WithContext<SoftwareApplication> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'StudyBuddy AI Tutor',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web-based',
    offers: {
      '@type': 'Offer',
      price: '24.99',
      priceCurrency: 'USD',
    },
    featureList: [
      'Unlimited TEAS 7 Q&A',
      'Weakness Identification',
      '24/7 Availability',
      'Instant Explanations',
    ],
    screenshot: `${BASE_URL}/ai-tutor-screenshot.jpg`, // Ensure this image exists eventually
  };
}

// --- 6. STATE CREDENTIAL SCHEMA (State Pages) ---
export function generateStateCredentialSchema(data: {
  stateName: string;
  stateAbbreviation: string;
  minScore: number;
}): WithContext<EducationalOccupationalCredential> {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'TEAS 7 Exam Requirement',
    name: `TEAS 7 Requirements for ${data.stateName}`,
    recognizedBy: {
      '@type': 'State',
      name: data.stateName,
      alternateName: data.stateAbbreviation,
    },
    description: `Minimum TEAS 7 score requirements for nursing programs in ${data.stateName}.`,
    validIn: {
      '@type': 'AdministrativeArea',
      name: data.stateName,
    },
  };
}