export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  content: string; // HTML content for simplicity
}

export const articles: Article[] = [
  {
    slug: "what-is-a-good-teas-score",
    title: "What is a Good TEAS 7 Score in 2026?",
    excerpt: "Breakdown of the 'Proficient' vs 'Advanced' academic tiers and what nursing schools actually require for the 2026 admission cycle.",
    author: "Dr. Sarah Mitchell, PhD",
    date: "Jan 3, 2026",
    category: "Scoring Guide",
    content: `
      <h2>Understanding Academic Preparedness Levels</h2>
      <p>The ATI TEAS 7 scores are categorized into four main levels. Most nursing programs require you to fall into the 'Proficient' category or higher.</p>
      <ul>
        <li><strong>Developmental (< 41%):</strong> Indicates a low level of readiness. Remediation is required.</li>
        <li><strong>Basic (41% - 58%):</strong> Minimum understanding. Likely requires retaking the exam for competitive programs.</li>
        <li><strong>Proficient (58.7% - 77.3%):</strong> The standard target. Indicates you have the foundational knowledge for nursing school.</li>
        <li><strong>Advanced (78% - 90%):</strong> Highly competitive. Likely to be accepted into most BSN programs.</li>
        <li><strong>Exemplary (> 91%):</strong> Top 5% of test takers. Guaranteed admission in almost any scenario.</li>
      </ul>
      <h3>What Do Schools Actually Want in 2026?</h3>
      <p>While 58.7% is technically 'passing', our data shows the average accepted student in 2025 had a score of <strong>74.2%</strong>. Aim for above 75% to be safe for this year's application cycle.</p>
    `
  },
  {
    slug: "hardest-teas-7-section",
    title: "Ranked: The Hardest Sections of the TEAS 7 (2026 Data)",
    excerpt: "New data from 50,000 students reveals which section causes the most failures this year (Hint: It's not Math).",
    author: "StudyBuddy Data Team",
    date: "Jan 5, 2026",
    category: "Study Strategy",
    content: `
      <h2>#1: Science (The Dream Killer)</h2>
      <p>Consistently ranked as the hardest section, the Science portion covers A&P, Chemistry, and Biology. The Human Anatomy & Physiology section alone accounts for <strong>32 questions</strong>.</p>
      <h2>#2: English & Language Usage</h2>
      <p>Often underestimated, this section tests complex grammar rules that native speakers often get wrong intuitively.</p>
      <h2>#3: Reading Comprehension</h2>
      <p>The challenge here is time management. You have long passages and very little time to analyze them.</p>
      <h2>#4: Math</h2>
      <p>Surprisingly, Math has the highest pass rate. It covers basic algebra, percentages, and measurement conversions—skills most students can drill effectively.</p>
    `
  },
  {
    slug: "how-to-study-for-teas-in-2-weeks",
    title: "The 2-Week TEAS 7 Cram Plan (2026 Edition)",
    excerpt: "Emergency schedule for students who waited until the last minute. What to prioritize and what to skip.",
    author: "Dr. Sarah Mitchell, PhD",
    date: "Jan 8, 2026",
    category: "Study Schedules",
    content: `
      <h2>Days 1-3: The Science Deep Dive</h2>
      <p>Spend 100% of your time on A&P. Specifically: Cardiovascular, Respiratory, and Immune systems.</p>
      <h2>Days 4-7: Math & English Syntax</h2>
      <p>Memorize the metric conversion chart (Liters to Ounces, etc.). Review Subject-Verb Agreement rules.</p>
      <h2>Days 8-10: Practice Tests</h2>
      <p>Take full-length timed exams. Review *every* wrong answer to understand the logic.</p>
      <h2>Days 11-14: Review & Rest</h2>
      <p>Focus only on your weakest sub-topics. Do not study the day before the exam.</p>
    `
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return articles.map((a) => a.slug);
}