import type {
  Message,
  UserRole,
  MainConcern,
  AdvisorInterest,
  QuickReply,
  CTAButton,
} from './types';

export const CORE_CHECKOUT_URL = 'https://learn.studybuddy.live/subscriptions?id=2499';
export const PRO_CHECKOUT_URL = 'https://learn.studybuddy.live/subscriptions?id=teas-pro-3999month';

export function createMessage(
  type: 'bot' | 'user',
  text: string,
  options?: {
    quickReplies?: QuickReply[];
    ctaButtons?: CTAButton[];
  }
): Message {
  return {
    id: `msg-${Date.now()}-${Math.random()}`,
    type,
    text,
    timestamp: new Date(),
    quickReplies: options?.quickReplies,
    ctaButtons: options?.ctaButtons,
  };
}

export function getGreetingMessage(): Message {
  return createMessage(
    'bot',
    "Hi! I'm the StudyBuddy TEAS concierge 👋\nAre you getting ready for the TEAS exam or helping someone who is?",
    {
      quickReplies: [
        { text: "I'm a student", value: 'student' },
        { text: "I'm an academic advisor", value: 'advisor' },
        { text: "I'm a professor/instructor", value: 'professor' },
        { text: "I'm a parent/partner", value: 'parent' },
        { text: 'Other', value: 'other' },
      ],
    }
  );
}

export function getTestDateMessage(): Message {
  return createMessage(
    'bot',
    "Nice! When is your TEAS test date (or your best guess)?"
  );
}

export function getTargetScoreMessage(): Message {
  return createMessage(
    'bot',
    'Got it. What score are you aiming for on the TEAS? (For example, 70, 80, or 85+.)'
  );
}

export function getMainConcernMessage(): Message {
  return createMessage(
    'bot',
    'Last question: what worries you most right now?',
    {
      quickReplies: [
        { text: 'TEAS Math', value: 'math' },
        { text: 'TEAS Science', value: 'science' },
        { text: 'Reading / timing', value: 'reading' },
        { text: 'I already failed once', value: 'failed' },
        { text: "I'm overwhelmed / don't know where to start", value: 'overwhelmed' },
      ],
    }
  );
}

export function getRecommendationMessage(
  targetScore: number,
  mainConcern: MainConcern
): Message {
  const recommendPro =
    targetScore >= 80 || mainConcern === 'failed' || mainConcern === 'overwhelmed';

  const text = recommendPro
    ? "Based on what you shared, most students like you do best with **TEAS Pro** – full TEAS 7 course, unlimited AI tutor, and our Score Confidence Guarantee™ if you complete the program and still don't hit your goal."
    : 'Based on what you shared, you could start with **TEAS Core** and add TEAS Pro if you want extra AI support and the Score Confidence Guarantee™.';

  return createMessage('bot', text, {
    ctaButtons: [
      { text: 'See TEAS Pro details', url: PRO_CHECKOUT_URL },
      { text: 'See TEAS Core details', url: CORE_CHECKOUT_URL, secondary: true },
    ],
  });
}

export function getEmailCaptureMessage(): Message {
  return createMessage(
    'bot',
    "If you'd like, I can send you a free TEAS study plan based on your test date and a reminder 2 weeks before your exam. What's your email?"
  );
}

export function getFirstNameMessage(): Message {
  return createMessage('bot', 'Got it. What first name should I put on it?');
}

export function getCompletionMessage(): Message {
  return createMessage(
    'bot',
    "Thank you! I've saved your details. You can explore TEAS Core and TEAS Pro using the buttons above — and I'm here if you want to ask more about how the course works."
  );
}

export function getNonStudentGreeting(): Message {
  return createMessage(
    'bot',
    'Great – we work with a lot of advisors and instructors who want their students to feel more confident on the TEAS.'
  );
}

export function getAdvisorInterestMessage(): Message {
  return createMessage(
    'bot',
    'Are you mainly looking to preview the course, recommend it to students, or discuss group access/discounts?',
    {
      quickReplies: [
        { text: 'Preview the course', value: 'preview' },
        { text: 'Recommend to students', value: 'recommend' },
        { text: 'Group access', value: 'group' },
      ],
    }
  );
}

export function getAdvisorInterestResponse(interest: AdvisorInterest): Message {
  if (interest === 'preview') {
    return createMessage('bot', 'Perfect! You can preview the full TEAS 7 course here:', {
      ctaButtons: [
        {
          text: 'Preview TEAS Course',
          url: 'https://learn.studybuddy.live/course/teas-exam-prep-course',
        },
      ],
    });
  }

  if (interest === 'recommend') {
    return createMessage('bot', 'That's great! You can share the course page with your students:', {
      ctaButtons: [
        {
          text: 'View Course Page',
          url: 'https://learn.studybuddy.live/course/teas-exam-prep-course',
        },
      ],
    });
  }

  return createMessage(
    'bot',
    'For group or institutional access, the fastest way is to email us at **support@studybuddy.live**. Include your school, program, and approximate number of students.'
  );
}

export function getAdvisorEmailMessage(): Message {
  return createMessage(
    'bot',
    "If you'd like updates about StudyBuddy for educators, what's your work email?"
  );
}

export function getAdvisorCompletionMessage(): Message {
  return createMessage(
    'bot',
    "Thank you! We'll keep you updated on StudyBuddy resources for educators."
  );
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function extractScore(text: string): number {
  const match = text.match(/\d+/);
  return match ? parseInt(match[0], 10) : 75;
}