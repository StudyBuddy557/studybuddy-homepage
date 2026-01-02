/**
 * TEAS 7 Exam Ontology Type Definitions
 * Provides strict typing for the TEAS exam structure
 */

export type TeasSectionId = 'reading' | 'math' | 'science' | 'english';

export type TeasSubskillId =
  | 'reading.key-ideas-details'
  | 'reading.craft-structure'
  | 'reading.integration-knowledge-ideas'
  | 'math.numbers-algebra'
  | 'math.measurement-data'
  | 'science.anatomy-physiology'
  | 'science.biology'
  | 'science.chemistry'
  | 'science.scientific-reasoning'
  | 'english.conventions-standard-english'
  | 'english.knowledge-of-language'
  | 'english.using-language-vocabulary';

export interface TeasSection {
  id: TeasSectionId;
  name: string;
  description: string;
  totalScoredQuestions: number;
  totalTimeMinutes: number;
}

export interface TeasSubskill {
  id: TeasSubskillId;
  sectionId: TeasSectionId;
  name: string;
  description: string;
  scoredQuestions: number;
}

export interface TeasOutcomeMetrics {
  avgScore?: number;
  passRate?: number;
  questionCount?: number;
}
