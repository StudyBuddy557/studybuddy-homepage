export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "StudyBuddy",
    "description": "TEAS 7 exam prep with AI tutoring and 92% pass rate",
    "url": "https://studybuddy.live",
    "logo": "https://studybuddy.live/StudyBuddy_AI_tutor_Avatar.png",
    "sameAs": [
      "https://www.facebook.com/studybuddy",
      "https://www.instagram.com/studybuddy"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "500"
    },
    "offers": {
      "@type": "Offer",
      "price": "24.99",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
