export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "OnlineBusiness",
  "name": "StudyBuddy",
  "url": "https://studybuddy.live",
  "logo": "https://studybuddy.live/logo.png",
  "description": "AI-powered TEAS 7 test preparation platform built by nursing professors.",
  "knowsAbout": [
    "TEAS 7 Exam",
    "ATI TEAS",
    "Nursing School Admissions",
    "Pre-Nursing Test Prep",
    "Nursing Entrance Exams"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "offers": {
    "@type": "Offer",
    "price": "24.99",
    "priceCurrency": "USD",
    "priceValidUntil": "2025-12-31",
    "availability": "https://schema.org/OnlineOnly",
    "category": "Test Preparation Subscription"
  },
  "sameAs": [
    "https://www.facebook.com/studybuddy",
    "https://twitter.com/studybuddy"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "support@studybuddy.live"
  }
};

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "StudyBuddy TEAS 7 Prep Course",
  "description": "AI-powered TEAS 7 test preparation with 4,000+ practice questions, unlimited AI tutor, and 100% Pass Guarantee.",
  "brand": {
    "@type": "Brand",
    "name": "StudyBuddy"
  },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "24.99",
    "highPrice": "59",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://studybuddy.live/pricing"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "500",
    "bestRating": "5",
    "worstRating": "1"
  },
  "category": "Educational Software",
  "audience": {
    "@type": "Audience",
    "audienceType": "Pre-Nursing Students"
  }
};

// Functions that page.tsx imports
export function getOrganizationSchema() {
  return organizationSchema;
}

export function getProductSchema() {
  return productSchema;
}