import Script from 'next/script';

export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'OnlineBusiness',
    name: 'StudyBuddy',
    alternateName: 'StudyBuddy TEAS Prep',
    url: 'https://studybuddy.live',
    logo: 'https://studybuddy.live/logo.png',
    description: 'AI-powered TEAS 7 test preparation platform built by nursing professors. Features unlimited AI tutoring, 4,000+ practice questions, and a 92% pass rate.',
    knowsAbout: [
      'TEAS 7 Exam',
      'ATI TEAS',
      'Nursing School Admissions',
      'Pre-Nursing Test Prep',
      'Human Anatomy & Physiology'
    ],
    priceRange: '$24.99 - $59.00',
    offers: {
      '@type': 'Offer',
      price: '24.99',
      priceCurrency: 'USD',
      availability: 'https://schema.org/OnlineOnly',
      description: 'Monthly unlimited AI tutoring and TEAS 7 prep course'
    },
    member: {
      '@type': 'Organization',
      name: '500+ Enrolled Nursing Students'
    }
  };

  return (
    <Script
      id="org-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}