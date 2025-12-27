export interface CompetitorData {
  slug: string;
  name: string;
  price: string;
  pass_rate: string;
  guarantee: string;
  tutor_access: string;
  pros: string[];
  cons: string[];
  verdict: string;
}

export const competitorData: CompetitorData[] = [
  { 
    slug: "ati", 
    name: "ATI TEAS® (Official)", 
    price: "$249.00", 
    pass_rate: "Hidden", 
    guarantee: "None", 
    tutor_access: "No",
    pros: ["The official test creator", "Same format as exam"],
    cons: ["Extremely expensive", "No video explanations", "No money-back guarantee", "Content is dry/textbook style"],
    verdict: "Essential for the final practice test, but too expensive for learning the material."
  },
  { 
    slug: "nursehub", 
    name: "NurseHub", 
    price: "$49.99/mo", 
    pass_rate: "Unknown", 
    guarantee: "Pass Guarantee", 
    tutor_access: "No",
    pros: ["Large question bank", "Affordable monthly rate"],
    cons: ["No AI tutoring", "Generic explanations", "Hard to cancel subscription", "Limited video content"],
    verdict: "Good for drilling questions, but lacks the teaching tools to explain 'why' you missed them."
  },
  { 
    slug: "mometrix", 
    name: "Mometrix", 
    price: "$99.99/mo", 
    pass_rate: "Unknown", 
    guarantee: "Money Back", 
    tutor_access: "No",
    pros: ["Comprehensive book", "Lots of video content"],
    cons: ["Videos are old/outdated", "Interface is clunky", "Very expensive monthly recurring", "Overwhelming amount of text"],
    verdict: "A solid library of content, but lacks the adaptive learning needed to study efficiently."
  }
];

export function getCompetitorBySlug(slug: string): CompetitorData | undefined {
  return competitorData.find((c) => c.slug === slug);
}

export function getAllCompetitorSlugs(): string[] {
  return competitorData.map((c) => c.slug);
}