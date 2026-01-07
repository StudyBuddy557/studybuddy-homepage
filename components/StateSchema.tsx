// ============================================================================
// STATE SCHEMA COMPONENT - Answer Engine Optimization (AEO)
// ============================================================================
// Purpose: Generate Schema.org JSON-LD for AI search engines and featured snippets
// Targets: Google SGE, Bing Copilot, ChatGPT, Perplexity, traditional search
// ============================================================================

'use client';

import { useEffect } from 'react';
import type { StateData } from '@/lib/state-data';

interface StateSchemaProps {
  stateData: StateData;
}

export default function StateSchema({ stateData }: StateSchemaProps) {
  useEffect(() => {
    // Generate comprehensive schema markup for maximum AEO coverage
    const schemaMarkup = {
      '@context': 'https://schema.org',
      '@graph': [
        // 1. Primary Educational Credential Schema
        {
          '@type': 'EducationalOccupationalCredential',
          '@id': `https://studybuddy.live/states/${stateData.slug}#credential`,
          name: `TEAS 7 Requirements for ${stateData.name} Nursing Schools`,
          description: stateData.metaDescription,
          credentialCategory: 'Nursing School Entrance Examination',
          educationalLevel: 'UndergraduateProgram',
          competencyRequired: `TEAS 7 Score of ${stateData.avgTeasScore}% or higher`,
          validFrom: '2026-01-01',
          validIn: {
            '@type': 'AdministrativeArea',
            name: stateData.name,
            identifier: stateData.abbreviation
          },
          recognizedBy: {
            '@type': 'Organization',
            name: `${stateData.name} Board of Nursing`,
            sameAs: `https://www.ncsbn.org/bon-${stateData.slug}.htm`
          },
          about: {
            '@type': 'Occupation',
            name: 'Registered Nurse',
            occupationLocation: {
              '@type': 'State',
              name: stateData.name
            }
          },
          offers: {
            '@type': 'Offer',
            offeredBy: {
              '@type': 'EducationalOrganization',
              name: 'StudyBuddy',
              url: 'https://studybuddy.live',
              description: 'AI-powered TEAS 7 preparation platform'
            }
          }
        },

        // 2. FAQ Schema for Voice Search & AI Answers
        {
          '@type': 'FAQPage',
          '@id': `https://studybuddy.live/states/${stateData.slug}#faq`,
          mainEntity: stateData.faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        },

        // 3. How-To Schema for Preparation Process
        {
          '@type': 'HowTo',
          '@id': `https://studybuddy.live/states/${stateData.slug}#howto`,
          name: `How to Prepare for ${stateData.name} Nursing School TEAS Requirements`,
          description: `Step-by-step guide to achieving ${stateData.avgTeasScore}% TEAS score for ${stateData.name} nursing programs`,
          totalTime: 'P6W', // 6 weeks ISO 8601 duration
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: 'USD',
            value: '24.99'
          },
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'Take Diagnostic Assessment',
              text: 'Complete AI-powered diagnostic to identify knowledge gaps',
              url: `https://studybuddy.live/diagnostic?state=${stateData.slug}`
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'Follow Personalized Study Plan',
              text: `Master content areas with adaptive AI tutor targeting ${stateData.name} requirements`,
              url: 'https://studybuddy.live/pricing'
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'Complete Practice Tests',
              text: 'Take full-length practice exams under timed conditions',
              url: 'https://studybuddy.live/practice-tests'
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'Schedule Your TEAS Exam',
              text: 'Register for official TEAS 7 exam through ATI',
              url: 'https://www.atitesting.com'
            }
          ]
        },

        // 4. Organization Schema for Trust & Authority
        {
          '@type': 'EducationalOrganization',
          '@id': 'https://studybuddy.live#organization',
          name: 'StudyBuddy',
          url: 'https://studybuddy.live',
          logo: 'https://studybuddy.live/logo.png',
          description: 'AI-powered TEAS 7, HESI, and nursing entrance exam preparation platform',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'US'
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: stateData.socialProof.studentsFromState.match(/\d+/)?.[0] || '500',
            bestRating: '5',
            worstRating: '1'
          },
          offers: {
            '@type': 'Offer',
            category: 'Educational Service',
            availability: 'https://schema.org/InStock'
          }
        },

        // 5. ItemList Schema for School Rankings
        {
          '@type': 'ItemList',
          '@id': `https://studybuddy.live/states/${stateData.slug}#schools`,
          name: `Top Nursing Schools in ${stateData.name} by TEAS Requirements`,
          description: `Ranked list of ${stateData.name} nursing programs by minimum TEAS score`,
          numberOfItems: stateData.topSchools.length,
          itemListElement: stateData.topSchools.map((school, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'EducationalOrganization',
              name: school.name,
              address: {
                '@type': 'PostalAddress',
                addressLocality: school.city,
                addressRegion: stateData.abbreviation,
                addressCountry: 'US'
              },
              offers: {
                '@type': 'Offer',
                name: `${school.programType || 'BSN'} Nursing Program`,
                description: `Minimum TEAS score: ${school.minTeasScore}`,
                eligibilityRequirement: `TEAS 7 score of ${school.minTeasScore} or higher`
              }
            }
          }))
        },

        // 6. Review Schema for Social Proof
        ...(stateData.testimonials.slice(0, 2).map((testimonial, idx) => ({
          '@type': 'Review',
          '@id': `https://studybuddy.live/states/${stateData.slug}#review${idx + 1}`,
          itemReviewed: {
            '@type': 'Course',
            name: 'StudyBuddy TEAS 7 Preparation',
            provider: {
              '@type': 'Organization',
              name: 'StudyBuddy'
            }
          },
          author: {
            '@type': 'Person',
            name: testimonial.name
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5'
          },
          reviewBody: testimonial.quote,
          datePublished: `${testimonial.year}-01-01`
        }))),

        // 7. BreadcrumbList for Navigation Context
        {
          '@type': 'BreadcrumbList',
          '@id': `https://studybuddy.live/states/${stateData.slug}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://studybuddy.live'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'State Requirements',
              item: 'https://studybuddy.live/states'
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: `${stateData.name} TEAS Requirements`,
              item: `https://studybuddy.live/states/${stateData.slug}`
            }
          ]
        },

        // 8. WebPage Schema for Page-Level SEO
        {
          '@type': 'WebPage',
          '@id': `https://studybuddy.live/states/${stateData.slug}#webpage`,
          url: `https://studybuddy.live/states/${stateData.slug}`,
          name: `${stateData.name} TEAS Score Requirements 2026 | Nursing School Prep`,
          description: stateData.metaDescription,
          inLanguage: 'en-US',
          isPartOf: {
            '@type': 'WebSite',
            '@id': 'https://studybuddy.live#website',
            name: 'StudyBuddy',
            url: 'https://studybuddy.live'
          },
          about: {
            '@type': 'Thing',
            name: `${stateData.name} Nursing Education`
          },
          datePublished: '2026-01-01',
          dateModified: new Date().toISOString().split('T')[0],
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: `https://studybuddy.live/images/states/${stateData.slug}-og.jpg`,
            width: 1200,
            height: 630
          }
        }
      ]
    };

    // Inject schema into document head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaMarkup);
    script.id = `schema-${stateData.slug}`;
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const existingScript = document.getElementById(`schema-${stateData.slug}`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [stateData]);

  // Component renders nothing (schema is injected into <head>)
  return null;
}