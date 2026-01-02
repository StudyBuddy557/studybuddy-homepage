/**
 * Page Ontology Mapping
 * Maps Next.js routes to TEAS exam sections and subskills
 */

import type { TeasSectionId, TeasSubskillId, TeasOutcomeMetrics } from './ontology';

export type PageId =
  | 'home'
  | 'course'
  | 'methodology'
  | 'compare-ati'
  | 'guide-teas-reading'
  | 'guide-teas-math'
  | 'guide-teas-science'
  | 'guide-teas-english'
  | `state-${string}`;

export interface PageOntologyMapping {
  pageId: PageId;
  route: string;
  title: string;
  description: string;
  sections: TeasSectionId[];
  subskills: TeasSubskillId[];
  outcomes?: TeasOutcomeMetrics;
  stateSlug?: string;
}

/**
 * Complete page ontology registry
 * Maps every significant route to its TEAS exam relationships
 */
export const PAGE_ONTOLOGY: Record<string, PageOntologyMapping> = {
  home: {
    pageId: 'home',
    route: '/',
    title: 'TEAS 7 Exam Prep Course | 92% Pass Rate | StudyBuddy',
    description: 'Master all four TEAS 7 sections with AI-powered tutoring. 4,000+ practice questions, 350+ video lectures, and personalized weak-area coaching. 92% pass rate vs 65% national average.',
    sections: ['reading', 'math', 'science', 'english'],
    subskills: [
      'reading.key-ideas-details',
      'reading.craft-structure',
      'reading.integration-knowledge-ideas',
      'math.numbers-algebra',
      'math.measurement-data',
      'science.anatomy-physiology',
      'science.biology',
      'science.chemistry',
      'science.scientific-reasoning',
      'english.conventions-standard-english',
      'english.knowledge-of-language',
      'english.using-language-vocabulary'
    ],
    outcomes: {
      passRate: 92,
      avgScore: 78.3,
      questionCount: 4000
    }
  },

  methodology: {
    pageId: 'methodology',
    route: '/pass-rate-methodology',
    title: 'How StudyBuddy Calculates its 92% TEAS 7 Pass Rate',
    description: 'Transparent methodology for StudyBuddy\'s 92% TEAS 7 pass rate. Sample size, timeframe, inclusion criteria, and statistical analysis explained for 500+ students from 2023-2024.',
    sections: ['reading', 'math', 'science', 'english'],
    subskills: [
      'reading.key-ideas-details',
      'reading.craft-structure',
      'reading.integration-knowledge-ideas',
      'math.numbers-algebra',
      'math.measurement-data',
      'science.anatomy-physiology',
      'science.biology',
      'science.chemistry',
      'science.scientific-reasoning',
      'english.conventions-standard-english',
      'english.knowledge-of-language',
      'english.using-language-vocabulary'
    ],
    outcomes: {
      passRate: 92,
      avgScore: 78.3,
      questionCount: 500
    }
  },

  course: {
    pageId: 'course',
    route: '/course',
    title: 'TEAS 7 Course Details | StudyBuddy Premium',
    description: 'Complete TEAS 7 preparation covering Reading, Math, Science, and English. AI tutor, unlimited practice questions, and comprehensive video lessons.',
    sections: ['reading', 'math', 'science', 'english'],
    subskills: [
      'reading.key-ideas-details',
      'reading.craft-structure',
      'reading.integration-knowledge-ideas',
      'math.numbers-algebra',
      'math.measurement-data',
      'science.anatomy-physiology',
      'science.biology',
      'science.chemistry',
      'science.scientific-reasoning',
      'english.conventions-standard-english',
      'english.knowledge-of-language',
      'english.using-language-vocabulary'
    ]
  },

  'compare-ati': {
    pageId: 'compare-ati',
    route: '/compare/ati-teas-smartprep',
    title: 'StudyBuddy vs ATI TEAS SmartPrep Comparison',
    description: 'Compare StudyBuddy and ATI TEAS SmartPrep. Features, pricing, AI tutoring, and pass rates for TEAS 7 exam preparation.',
    sections: ['reading', 'math', 'science', 'english'],
    subskills: []
  },

  'guide-teas-reading': {
    pageId: 'guide-teas-reading',
    route: '/guides/teas-reading',
    title: 'TEAS 7 Reading Section Guide | 45 Questions in 55 Minutes',
    description: 'Master the TEAS 7 Reading section. Key ideas, craft and structure, and integration strategies with practice questions and expert tips.',
    sections: ['reading'],
    subskills: [
      'reading.key-ideas-details',
      'reading.craft-structure',
      'reading.integration-knowledge-ideas'
    ]
  },

  'guide-teas-math': {
    pageId: 'guide-teas-math',
    route: '/guides/teas-math',
    title: 'TEAS 7 Math Section Guide | Numbers, Algebra & Data',
    description: 'Complete guide to TEAS 7 Mathematics. Master numbers, algebra, measurements, and data interpretation with 38 scored questions.',
    sections: ['math'],
    subskills: [
      'math.numbers-algebra',
      'math.measurement-data'
    ]
  },

  'guide-teas-science': {
    pageId: 'guide-teas-science',
    route: '/guides/teas-science',
    title: 'TEAS 7 Science Section Guide | A&P, Biology & Chemistry',
    description: 'TEAS 7 Science mastery guide. Anatomy, physiology, biology, chemistry, and scientific reasoning across 50 questions.',
    sections: ['science'],
    subskills: [
      'science.anatomy-physiology',
      'science.biology',
      'science.chemistry',
      'science.scientific-reasoning'
    ]
  },

  'guide-teas-english': {
    pageId: 'guide-teas-english',
    route: '/guides/teas-english',
    title: 'TEAS 7 English Section Guide | Grammar & Vocabulary',
    description: 'Master TEAS 7 English and Language Usage. Conventions, language knowledge, and vocabulary for 37 scored questions.',
    sections: ['english'],
    subskills: [
      'english.conventions-standard-english',
      'english.knowledge-of-language',
      'english.using-language-vocabulary'
    ]
  }
};
