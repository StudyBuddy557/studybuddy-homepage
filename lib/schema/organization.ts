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
