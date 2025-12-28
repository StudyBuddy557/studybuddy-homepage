// lib/state-data.ts
export interface StateData {
  slug: string;
  name: string;
  programs_count: string;
  avg_salary: string;
  abbreviation: string;
}

export const stateData: StateData[] = [
  { slug: "california", name: "California", programs_count: "180+", avg_salary: "$124,000", abbreviation: "CA" },
  { slug: "texas", name: "Texas", programs_count: "165+", avg_salary: "$77,600", abbreviation: "TX" },
  { slug: "florida", name: "Florida", programs_count: "145+", avg_salary: "$75,500", abbreviation: "FL" },
  { slug: "new-york", name: "New York", programs_count: "155+", avg_salary: "$93,300", abbreviation: "NY" },
  { slug: "pennsylvania", name: "Pennsylvania", programs_count: "125+", avg_salary: "$79,300", abbreviation: "PA" },
  { slug: "georgia", name: "Georgia", programs_count: "95+", avg_salary: "$75,900", abbreviation: "GA" },
  { slug: "illinois", name: "Illinois", programs_count: "120+", avg_salary: "$81,900", abbreviation: "IL" },
  { slug: "ohio", name: "Ohio", programs_count: "130+", avg_salary: "$75,600", abbreviation: "OH" },
  { slug: "north-carolina", name: "North Carolina", programs_count: "110+", avg_salary: "$73,800", abbreviation: "NC" },
  { slug: "michigan", name: "Michigan", programs_count: "105+", avg_salary: "$79,200", abbreviation: "MI" },
  // ... (Full list would go here, these are the top priority states for now)
];

export function getStateBySlug(slug: string): StateData | undefined {
  return stateData.find((state) => state.slug === slug);
}

export function getAllStateSlugs(): string[] {
  return stateData.map((state) => state.slug);
}