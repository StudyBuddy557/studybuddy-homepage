export type Region = 'West' | 'Midwest' | 'South' | 'Northeast';

export interface StateData {
  slug: string;
  name: string;
  programs_count: string;
  avg_salary: string;
  abbreviation: string;
  region: Region;
}

export const stateData: StateData[] = [
  // West
  { slug: "california", name: "California", programs_count: "180+", avg_salary: "$124,000", abbreviation: "CA", region: "West" },
  { slug: "washington", name: "Washington", programs_count: "65+", avg_salary: "$95,300", abbreviation: "WA", region: "West" },
  { slug: "oregon", name: "Oregon", programs_count: "40+", avg_salary: "$98,600", abbreviation: "OR", region: "West" },
  { slug: "nevada", name: "Nevada", programs_count: "20+", avg_salary: "$92,500", abbreviation: "NV", region: "West" },
  { slug: "arizona", name: "Arizona", programs_count: "55+", avg_salary: "$84,800", abbreviation: "AZ", region: "West" },
  { slug: "colorado", name: "Colorado", programs_count: "50+", avg_salary: "$82,100", abbreviation: "CO", region: "West" },
  { slug: "utah", name: "Utah", programs_count: "30+", avg_salary: "$75,800", abbreviation: "UT", region: "West" },
  { slug: "idaho", name: "Idaho", programs_count: "18+", avg_salary: "$73,600", abbreviation: "ID", region: "West" },
  { slug: "montana", name: "Montana", programs_count: "12+", avg_salary: "$71,900", abbreviation: "MT", region: "West" },
  { slug: "wyoming", name: "Wyoming", programs_count: "8+", avg_salary: "$74,300", abbreviation: "WY", region: "West" },
  { slug: "new-mexico", name: "New Mexico", programs_count: "25+", avg_salary: "$77,900", abbreviation: "NM", region: "West" },
  { slug: "hawaii", name: "Hawaii", programs_count: "15+", avg_salary: "$106,500", abbreviation: "HI", region: "West" },
  { slug: "alaska", name: "Alaska", programs_count: "8+", avg_salary: "$91,200", abbreviation: "AK", region: "West" },

  // South
  { slug: "texas", name: "Texas", programs_count: "165+", avg_salary: "$77,600", abbreviation: "TX", region: "South" },
  { slug: "florida", name: "Florida", programs_count: "145+", avg_salary: "$75,500", abbreviation: "FL", region: "South" },
  { slug: "georgia", name: "Georgia", programs_count: "95+", avg_salary: "$75,900", abbreviation: "GA", region: "South" },
  { slug: "north-carolina", "name": "North Carolina", programs_count: "110+", avg_salary: "$73,800", abbreviation: "NC", region: "South" },
  { slug: "virginia", name: "Virginia", programs_count: "95+", avg_salary: "$77,200", abbreviation: "VA", region: "South" },
  { slug: "maryland", name: "Maryland", programs_count: "65+", avg_salary: "$84,600", abbreviation: "MD", region: "South" },
  { slug: "tennessee", name: "Tennessee", programs_count: "75+", avg_salary: "$69,700", abbreviation: "TN", region: "South" },
  { slug: "south-carolina", "name": "South Carolina", programs_count: "55+", avg_salary: "$71,200", abbreviation: "SC", region: "South" },
  { slug: "alabama", "name": "Alabama", programs_count: "65+", avg_salary: "$67,800", abbreviation: "AL", region: "South" },
  { slug: "louisiana", "name": "Louisiana", programs_count: "60+", avg_salary: "$71,300", abbreviation: "LA", region: "South" },
  { slug: "kentucky", "name": "Kentucky", programs_count: "55+", avg_salary: "$68,900", abbreviation: "KY", region: "South" },
  { slug: "oklahoma", "name": "Oklahoma", programs_count: "50+", avg_salary: "$67,200", abbreviation: "OK", region: "South" },
  { slug: "arkansas", "name": "Arkansas", programs_count: "40+", avg_salary: "$66,800", abbreviation: "AR", region: "South" },
  { slug: "mississippi", "name": "Mississippi", programs_count: "45+", avg_salary: "$65,400", abbreviation: "MS", region: "South" },
  { slug: "west-virginia", "name": "West Virginia", programs_count: "35+", avg_salary: "$68,100", abbreviation: "WV", region: "South" },
  { slug: "delaware", "name": "Delaware", programs_count: "12+", avg_salary: "$79,500", abbreviation: "DE", region: "South" },

  // Midwest
  { slug: "illinois", "name": "Illinois", programs_count: "120+", avg_salary: "$81,900", abbreviation: "IL", region: "Midwest" },
  { slug: "ohio", "name": "Ohio", programs_count: "130+", avg_salary: "$75,600", abbreviation: "OH", region: "Midwest" },
  { slug: "michigan", "name": "Michigan", programs_count: "105+", avg_salary: "$79,200", abbreviation: "MI", region: "Midwest" },
  { slug: "missouri", "name": "Missouri", programs_count: "80+", avg_salary: "$72,200", abbreviation: "MO", region: "Midwest" },
  { slug: "wisconsin", "name": "Wisconsin", programs_count: "75+", avg_salary: "$78,400", abbreviation: "WI", region: "Midwest" },
  { slug: "indiana", "name": "Indiana", programs_count: "70+", avg_salary: "$71,500", abbreviation: "IN", region: "Midwest" },
  { slug: "minnesota", "name": "Minnesota", programs_count: "65+", avg_salary: "$83,700", abbreviation: "MN", region: "Midwest" },
  { slug: "iowa", "name": "Iowa", "programs_count": "50+", avg_salary: "$67,900", abbreviation: "IA", region: "Midwest" },
  { slug: "kansas", "name": "Kansas", programs_count: "45+", avg_salary: "$68,500", abbreviation: "KS", region: "Midwest" },
  { slug: "nebraska", "name": "Nebraska", programs_count: "30+", avg_salary: "$69,300", abbreviation: "NE", region: "Midwest" },
  { slug: "south-dakota", "name": "South Dakota", programs_count: "18+", avg_salary: "$66,200", abbreviation: "SD", region: "Midwest" },
  { slug: "north-dakota", "name": "North Dakota", programs_count: "15+", avg_salary: "$72,800", abbreviation: "ND", region: "Midwest" },

  // Northeast
  { slug: "new-york", "name": "New York", programs_count: "155+", avg_salary: "$93,300", abbreviation: "NY", region: "Northeast" },
  { slug: "pennsylvania", "name": "Pennsylvania", programs_count: "125+", avg_salary: "$79,300", abbreviation: "PA", region: "Northeast" },
  { slug: "massachusetts", "name": "Massachusetts", programs_count: "90+", avg_salary: "$99,800", abbreviation: "MA", region: "Northeast" },
  { slug: "new-jersey", "name": "New Jersey", programs_count: "85+", avg_salary: "$89,700", abbreviation: "NJ", region: "Northeast" },
  { slug: "connecticut", "name": "Connecticut", programs_count: "45+", avg_salary: "$89,400", "abbreviation": "CT", region: "Northeast" },
  { slug: "maine", "name": "Maine", programs_count: "20+", avg_salary: "$76,100", abbreviation: "ME", region: "Northeast" },
  { slug: "new-hampshire", "name": "New Hampshire", programs_count: "18+", avg_salary: "$79,800", abbreviation: "NH", region: "Northeast" },
  { slug: "rhode-island", "name": "Rhode Island", programs_count: "15+", avg_salary: "$87,200", abbreviation: "RI", region: "Northeast" },
  { slug: "vermont", "name": "Vermont", programs_count: "12+", avg_salary: "$76,500", abbreviation: "VT", region: "Northeast" }
];

export function getStateBySlug(slug: string): StateData | undefined {
  return stateData.find((state) => state.slug === slug);
}

export function getRelatedStates(currentSlug: string, region: string): StateData[] {
  return stateData
    .filter(s => s.region === region && s.slug !== currentSlug)
    .sort(() => 0.5 - Math.random()) // Shuffle for variety
    .slice(0, 3);
}
