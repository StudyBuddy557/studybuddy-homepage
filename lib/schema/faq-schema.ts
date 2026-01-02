/**
 * FAQ Schema Builder
 * Generates FAQPage schemas for common questions
 */

import type { WithContext, FAQPage } from 'schema-dts';

/**
 * Get FAQ schema for pass rate methodology page
 */
export function getPassRateMethodologyFaqSchema(): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://studybuddy.live/pass-rate-methodology#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does StudyBuddy calculate its TEAS 7 pass rate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'StudyBuddy calculates its 92% pass rate using verified score reports from students who completed at least 80% of course content between January 2023 and December 2024. The calculation includes only students who submitted official TEAS 7 score reports within 7 days of testing. A "pass" is defined as achieving a composite score of 65% or higher (the minimum required by most nursing programs). The sample includes 500+ students across all 50 US states.'
        }
      },
      {
        '@type': 'Question',
        name: 'Who is included in the 92% pass rate calculation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The 92% pass rate includes students who: (1) Completed at least 80% of StudyBuddy video lectures, (2) Completed all 15 full-length practice exams, (3) Used the platform for a minimum of 30 days, and (4) Submitted their official TEAS 7 score report within 7 days of testing. Students who did not meet these criteria are excluded from the calculation to ensure the metric reflects engaged learners who completed the full preparation program.'
        }
      },
      {
        '@type': 'Question',
        name: 'What time period does the 92% pass rate cover?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The 92% pass rate is based on student outcomes from January 1, 2023 through December 31, 2024 (24 months). This timeframe represents the period since StudyBuddy launched its AI-powered tutoring system and comprehensive TEAS 7 curriculum. The data is updated quarterly and includes both first-time test takers and students retaking the exam.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does StudyBuddy\'s 92% pass rate compare to the national average?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'StudyBuddy\'s 92% pass rate significantly exceeds the national TEAS 7 pass rate of approximately 65%. This 27 percentage point difference represents a 41% improvement over baseline. The national average is published by ATI (Assessment Technologies Institute) and represents all test takers, including those with minimal or no formal preparation. StudyBuddy students also achieve an average composite score of 78.3%, compared to the national average of approximately 70%.'
        }
      },
      {
        '@type': 'Question',
        name: 'What methodology ensures the accuracy of StudyBuddy\'s pass rate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'StudyBuddy employs rigorous verification to ensure accuracy: (1) Manual review of all submitted TEAS 7 score reports, (2) Verification of student enrollment dates and completion percentages via LearnWorlds LMS, (3) Cross-referencing score report dates with platform usage logs, (4) Exclusion of incomplete data or unverifiable submissions, and (5) Independent statistical analysis by doctoral-level education researchers. All raw data is retained for audit purposes and students can request removal from the dataset at any time.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are there any limitations to StudyBuddy\'s pass rate calculation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The pass rate only includes students who submitted score reports, creating potential self-selection bias (students who fail may be less likely to submit). The 80% completion requirement excludes casual users, meaning the metric represents committed students rather than all enrollees. Results are not independently audited by a third party. Students with accommodations or non-standard test conditions are included without separate analysis. The pass rate does not control for baseline academic ability, prior test-taking experience, or socioeconomic factors that may influence outcomes.'
        }
      }
    ]
  };
}
