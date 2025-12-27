export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.studybuddy.live/#organization",
        "name": "StudyBuddy",
        "url": "https://www.studybuddy.live",
        "logo": "https://www.studybuddy.live/logo.png",
        "sameAs": [
          "https://www.facebook.com/studybuddy",
          "https://www.tiktok.com/@studybuddy"
        ],
        "description": "The #1 AI-Powered Prep Course for TEAS 7, HESI A2, and NCLEX exams."
      },
      {
        "@type": "WebSite",
        "@id": "https://www.studybuddy.live/#website",
        "url": "https://www.studybuddy.live",
        "name": "StudyBuddy - AI TEAS 7 Prep",
        "publisher": { "@id": "https://www.studybuddy.live/#organization" }
      },
      {
        "@type": "Course",
        "name": "ATI TEAS 7 Comprehensive Prep",
        "description": "AI-adaptive study course for the ATI TEAS 7 nursing entrance exam. Includes 4,000+ questions and 15 full-length practice tests.",
        "provider": { "@id": "https://www.studybuddy.live/#organization" },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "540"
        },
        "offers": {
          "@type": "Offer",
          "category": "Paid",
          "priceCurrency": "USD",
          "price": "24.99",
          "priceValidUntil": "2026-12-31"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}