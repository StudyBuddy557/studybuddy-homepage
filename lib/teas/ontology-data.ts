/**
 * TEAS 7 Exam Ontology Data
 * Contains the actual sections and subskills based on official TEAS 7 content outline
 */

import type { TeasSection, TeasSubskill } from './ontology';

/**
 * TEAS 7 Exam Sections
 * Based on official ATI TEAS 7 content outline
 */
export const TEAS_SECTIONS: Record<string, TeasSection> = {
  reading: {
    id: 'reading',
    name: 'Reading',
    description: 'Assesses reading comprehension, analysis, and interpretation skills needed for nursing education',
    totalScoredQuestions: 45,
    totalTimeMinutes: 55
  },
  math: {
    id: 'math',
    name: 'Mathematics',
    description: 'Evaluates mathematical reasoning, algebra, measurements, and data interpretation for healthcare contexts',
    totalScoredQuestions: 38,
    totalTimeMinutes: 57
  },
  science: {
    id: 'science',
    name: 'Science',
    description: 'Tests knowledge of human anatomy, physiology, biology, chemistry, and scientific reasoning required for nursing',
    totalScoredQuestions: 50,
    totalTimeMinutes: 60
  },
  english: {
    id: 'english',
    name: 'English and Language Usage',
    description: 'Measures grammar, language conventions, vocabulary, and writing skills for clear medical communication',
    totalScoredQuestions: 37,
    totalTimeMinutes: 37
  }
};

/**
 * TEAS 7 Subskills
 * Detailed breakdown of each section's content areas
 */
export const TEAS_SUBSKILLS: Record<string, TeasSubskill> = {
  // Reading subskills
  'reading.key-ideas-details': {
    id: 'reading.key-ideas-details',
    sectionId: 'reading',
    name: 'Key Ideas and Details',
    description: 'Identifying main ideas, supporting details, themes, and making inferences from complex texts',
    scoredQuestions: 15
  },
  'reading.craft-structure': {
    id: 'reading.craft-structure',
    sectionId: 'reading',
    name: 'Craft and Structure',
    description: 'Analyzing text structure, author\'s purpose, point of view, and rhetorical strategies',
    scoredQuestions: 15
  },
  'reading.integration-knowledge-ideas': {
    id: 'reading.integration-knowledge-ideas',
    sectionId: 'reading',
    name: 'Integration of Knowledge and Ideas',
    description: 'Synthesizing information from multiple sources, evaluating arguments, and comparing texts',
    scoredQuestions: 15
  },

  // Math subskills
  'math.numbers-algebra': {
    id: 'math.numbers-algebra',
    sectionId: 'math',
    name: 'Numbers and Algebra',
    description: 'Working with ratios, proportions, percentages, algebraic expressions, and equations in healthcare contexts',
    scoredQuestions: 23
  },
  'math.measurement-data': {
    id: 'math.measurement-data',
    sectionId: 'math',
    name: 'Measurement and Data',
    description: 'Interpreting data, using statistics, converting measurements, and analyzing graphs and charts',
    scoredQuestions: 15
  },

  // Science subskills
  'science.anatomy-physiology': {
    id: 'science.anatomy-physiology',
    sectionId: 'science',
    name: 'Human Anatomy and Physiology',
    description: 'Understanding body systems, organs, tissues, and physiological processes essential for nursing',
    scoredQuestions: 18
  },
  'science.biology': {
    id: 'science.biology',
    sectionId: 'science',
    name: 'Biology',
    description: 'Cell biology, genetics, microbiology, and biological processes relevant to healthcare',
    scoredQuestions: 9
  },
  'science.chemistry': {
    id: 'science.chemistry',
    sectionId: 'science',
    name: 'Chemistry',
    description: 'Chemical reactions, atomic structure, solutions, and biochemistry for medical applications',
    scoredQuestions: 8
  },
  'science.scientific-reasoning': {
    id: 'science.scientific-reasoning',
    sectionId: 'science',
    name: 'Scientific Reasoning',
    description: 'Applying scientific method, analyzing experiments, and evaluating scientific evidence',
    scoredQuestions: 15
  },

  // English subskills
  'english.conventions-standard-english': {
    id: 'english.conventions-standard-english',
    sectionId: 'english',
    name: 'Conventions of Standard English',
    description: 'Grammar, punctuation, sentence structure, and mechanics for professional medical writing',
    scoredQuestions: 12
  },
  'english.knowledge-of-language': {
    id: 'english.knowledge-of-language',
    sectionId: 'english',
    name: 'Knowledge of Language',
    description: 'Language style, clarity, word choice, and writing appropriate for different healthcare contexts',
    scoredQuestions: 11
  },
  'english.using-language-vocabulary': {
    id: 'english.using-language-vocabulary',
    sectionId: 'english',
    name: 'Using Language and Vocabulary',
    description: 'Medical terminology, context clues, word relationships, and vocabulary acquisition',
    scoredQuestions: 14
  }
};
