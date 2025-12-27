// TypeScript interfaces for StudyBuddy Concierge Widget

export type UserRole = 'student' | 'advisor' | 'professor' | 'parent' | 'other';

export type ConversationStep =
  | 'greeting'
  | 'role_select'
  | 'test_date'
  | 'target_score'
  | 'main_concern'
  | 'recommendation'
  | 'email_capture'
  | 'first_name'
  | 'advisor_interest'
  | 'advisor_email'
  | 'complete';

export type MainConcern = 'math' | 'science' | 'reading' | 'failed' | 'overwhelmed';

export type AdvisorInterest = 'preview' | 'recommend' | 'group';

export interface StudyBuddyConciergeState {
  step: ConversationStep;
  isPanelOpen: boolean;
  userRole: UserRole | null;
  testDate: string | null;
  targetScore: number | null;
  mainConcern: MainConcern | null;
  email: string | null;
  firstName: string | null;
  advisorInterest: AdvisorInterest | null;
}

export interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
  quickReplies?: QuickReply[];
  ctaButtons?: CTAButton[];
}

export interface QuickReply {
  text: string;
  value: string;
}

export interface CTAButton {
  text: string;
  url: string;
  secondary?: boolean;
}

export interface StudyBuddyConciergeConfig {
  enabledPaths: string[];
  coreCheckoutUrl: string;
  proCheckoutUrl: string;
  avatarImageUrl: string;
}

export interface StudyBuddyLead {
  role: UserRole;
  testDate?: string;
  targetScore?: number;
  mainConcern?: MainConcern;
  email: string;
  firstName?: string;
  advisorInterest?: AdvisorInterest;
  sourcePage: string;
  createdAt: string;
  userAgent: string;
}