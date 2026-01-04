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

  pricing: {
    pageId: 'course',
    route: '/pricing',
    title: 'TEAS 7 Course Pricing | StudyBuddy Premium Plans',
    description: 'Affordable TEAS 7 prep with AI tutoring. Plans from $24.99/mo. 92% pass rate.',
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
    outcomes: { passRate: 92, avgScore: 78.3, questionCount: 4000 }
  },

  'teas-reading-guide': {
    pageId: 'guide-teas-reading',
    route: '/teas-reading-strategies',
    title: 'TEAS 7 Reading Strategies Guide',
    description: 'Master TEAS 7 Reading section strategies.',
    sections: ['reading'],
    subskills: ['reading.key-ideas-details', 'reading.craft-structure', 'reading.integration-knowledge-ideas']
  },

  'teas-math-guide-route': {
    pageId: 'guide-teas-math',
    route: '/teas-math-guide',
    title: 'TEAS 7 Math Guide',
    description: 'Complete TEAS 7 Math guide.',
    sections: ['math'],
    subskills: ['math.numbers-algebra', 'math.measurement-data']
  },

  'teas-science-guide-route': {
    pageId: 'guide-teas-science',
    route: '/teas-science-guide',
    title: 'TEAS 7 Science Guide',
    description: 'Master TEAS 7 Science.',
    sections: ['science'],
    subskills: ['science.anatomy-physiology', 'science.biology', 'science.chemistry', 'science.scientific-reasoning']
  },

  'compare-courses': {
    pageId: 'compare-ati',
    route: '/compare/teas-prep-courses',
    title: 'Best TEAS 7 Prep Courses Compared',
    description: 'Compare top TEAS 7 prep courses.',
    sections: ['reading', 'math', 'science', 'english'],
    subskills: []
  },

  'syllabus': {
    pageId: 'guide-teas-reading',
    route: '/teas-7-syllabus',
    title: 'TEAS 7 Syllabus & Content Outline',
    description: 'Complete TEAS 7 syllabus and content outline.',
    sections: ['reading', 'math', 'science', 'english'],
    subskills: []
  },

  'scoring': {
    pageId: 'guide-teas-reading',
    route: '/teas-scoring-guide',
    title: 'TEAS 7 Scoring Guide',
    description: 'How TEAS 7 scoring works.',
    sections: [],
    subskills: []
  },

  'professors': {
    pageId: 'course',
    route: '/about/our-professors',
    title: 'Our TEAS 7 Expert Professors',
    description: 'Meet our doctoral-level professors.',
    sections: [],
    subskills: []
  }
};
