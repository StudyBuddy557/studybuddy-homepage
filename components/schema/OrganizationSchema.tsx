import { OrganizationSchemaData } from '@/lib/schema/types';

const studyBuddyData: OrganizationSchemaData = {
  name: "StudyBuddy",
  url: "https://studybuddy.live",
  logo: "https://studybuddy.live/logo.png", // Ensure this path is correct
  description: "AI-powered TEAS 7 test preparation platform built by nursing professors. Features unlimited AI tutoring, 4,000+ practice questions, and a 92% pass rate.",
  knowsAbout: [
    "TEAS 7 Exam",
    "ATI TEAS",
    "Nursing School Admissions",
    "Pre-Nursing Test Prep",
    "Human Anatomy & Physiology",
    "English and Language Usage"
  ],
  sameAs: [
    "https://www.instagram.com/studybuddy.live",
    "https://www.tiktok.com/@studybuddy.live",
    // Add other social profiles here for entity reconciliation
  ],
  priceRange: "$$"
};

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "OnlineBusiness",
    "name": studyBuddyData.name,
    "url": studyBuddyData.url,
    "logo": studyBuddyData.logo,
    "description": studyBuddyData.description,
    "knowsAbout": studyBuddyData.knowsAbout,
    "sameAs": studyBuddyData.sameAs,
    "priceRange": studyBuddyData.priceRange,
    "offers": {
      "@type": "Offer",
      "price": "24.99",
      "priceCurrency": "USD",
      "availability": "https://schema.org/OnlineOnly"
    },
    "founder": {
      "@type": "Person",
      "jobTitle": "Professor of Nursing",
      "description": "Created by credentialed nursing educators with 75+ years combined experience."
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}