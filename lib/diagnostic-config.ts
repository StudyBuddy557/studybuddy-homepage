import { z } from 'zod';

export const UserInfoSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  examDate: z.string().refine((date) => new Date(date) > new Date(), {
    message: 'Exam date must be in the future',
  }),
});

export type UserInfo = z.infer<typeof UserInfoSchema>;

export interface Question {
  id: number;
  category: 'Reading' | 'Math' | 'Science' | 'English';
  text: string;
  options: string[];
  correctIndex: number;
}

export const MOCK_QUESTIONS: Question[] = [
  { id: 1, category: 'Science', text: 'Which of the following describes the function of the ribosome?', options: ['Protein synthesis', 'Energy production', 'Lipid synthesis', 'DNA replication'], correctIndex: 0 },
  { id: 2, category: 'Math', text: 'Solve for x: 3x - 5 = 16', options: ['x = 5', 'x = 7', 'x = 11', 'x = 3'], correctIndex: 1 },
  { id: 3, category: 'Reading', text: 'Which of the following is a primary source?', options: ['A textbook chapter', 'A diary written during the event', 'A biography', 'A review of a movie'], correctIndex: 1 },
  { id: 4, category: 'English', text: 'Which sentence uses subject-verb agreement correctly?', options: ['The group of students are studying.', 'The group of students is studying.', 'The dogs runs fast.', 'She run every day.'], correctIndex: 1 },
  { id: 5, category: 'Science', text: 'What is the primary pacemaker of the heart?', options: ['AV Node', 'Purkinje Fibers', 'SA Node', 'Bundle of His'], correctIndex: 2 },
  { id: 6, category: 'Math', text: 'Convert 15% to a fraction in simplest form.', options: ['15/100', '3/20', '1/5', '3/10'], correctIndex: 1 },
  { id: 7, category: 'Science', text: 'Which anatomical plane divides the body into superior and inferior sections?', options: ['Sagittal', 'Transverse', 'Frontal', 'Oblique'], correctIndex: 1 },
  { id: 8, category: 'English', text: 'Select the correctly spelled word.', options: ['Pneumonia', 'Numonia', 'Pnumonia', 'Neumonia'], correctIndex: 0 },
  { id: 9, category: 'Reading', text: 'What is the logical conclusion based on: "All mammals have a backbone. A cat is a mammal."', options: ['A cat has fur.', 'A cat has a backbone.', 'A cat is warm-blooded.', 'All animals have backbones.'], correctIndex: 1 },
  { id: 10, category: 'Science', text: 'Which blood type is considered the universal donor?', options: ['Type A', 'Type B', 'Type AB', 'Type O Negative'], correctIndex: 3 },
];