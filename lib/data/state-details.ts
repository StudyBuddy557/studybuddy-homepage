export interface StateDetail {
  slug: string;
  name: string;
  abbreviation: string;
  minScore: number;
  avgSalary: string;
  programCount: string;
  topSchools: string[];
  competitiveScore: number;
}

export const stateDetails: Record<string, StateDetail> = {
  // --- A ---
  'alabama': {
    slug: 'alabama', name: 'Alabama', abbreviation: 'AL',
    minScore: 60, competitiveScore: 75, avgSalary: '$67,800', programCount: '65+',
    topSchools: ['UAB School of Nursing', 'Auburn University', 'University of South Alabama']
  },
  'alaska': {
    slug: 'alaska', name: 'Alaska', abbreviation: 'AK',
    minScore: 65, competitiveScore: 78, avgSalary: '$91,200', programCount: '8+',
    topSchools: ['University of Alaska Anchorage', 'University of Alaska Fairbanks']
  },
  'arizona': {
    slug: 'arizona', name: 'Arizona', abbreviation: 'AZ',
    minScore: 62, competitiveScore: 80, avgSalary: '$84,800', programCount: '55+',
    topSchools: ['Arizona State University', 'University of Arizona', 'Grand Canyon University']
  },
  'arkansas': {
    slug: 'arkansas', name: 'Arkansas', abbreviation: 'AR',
    minScore: 58, competitiveScore: 72, avgSalary: '$66,800', programCount: '40+',
    topSchools: ['UAMS College of Nursing', 'Arkansas State University', 'University of Central Arkansas']
  },
  // --- C ---
  'california': {
    slug: 'california', name: 'California', abbreviation: 'CA',
    minScore: 62, competitiveScore: 85, avgSalary: '$124,000', programCount: '180+',
    topSchools: ['CSU Long Beach', 'San Jose State University', 'West Coast University']
  },
  'colorado': {
    slug: 'colorado', name: 'Colorado', abbreviation: 'CO',
    minScore: 65, competitiveScore: 80, avgSalary: '$82,100', programCount: '50+',
    topSchools: ['University of Colorado', 'Denver College of Nursing', 'Regis University']
  },
  'connecticut': {
    slug: 'connecticut', name: 'Connecticut', abbreviation: 'CT',
    minScore: 65, competitiveScore: 78, avgSalary: '$89,400', programCount: '45+',
    topSchools: ['UConn School of Nursing', 'Quinnipiac University', 'Sacred Heart University']
  },
  // --- D ---
  'delaware': {
    slug: 'delaware', name: 'Delaware', abbreviation: 'DE',
    minScore: 65, competitiveScore: 76, avgSalary: '$79,500', programCount: '12+',
    topSchools: ['University of Delaware', 'Delaware State University', 'Delaware Tech']
  },
  // --- F ---
  'florida': {
    slug: 'florida', name: 'Florida', abbreviation: 'FL',
    minScore: 60, competitiveScore: 78, avgSalary: '$75,500', programCount: '145+',
    topSchools: ['University of Florida', 'Miami Dade College', 'University of Central Florida']
  },
  // --- G ---
  'georgia': {
    slug: 'georgia', name: 'Georgia', abbreviation: 'GA',
    minScore: 60, competitiveScore: 76, avgSalary: '$75,900', programCount: '95+',
    topSchools: ['Emory University', 'Georgia State University', 'Augusta University']
  },
  // --- H ---
  'hawaii': {
    slug: 'hawaii', name: 'Hawaii', abbreviation: 'HI',
    minScore: 68, competitiveScore: 82, avgSalary: '$106,500', programCount: '15+',
    topSchools: ['UH Manoa', 'Hawaii Pacific University', 'Kapiolani Community College']
  },
  // --- I ---
  'idaho': {
    slug: 'idaho', name: 'Idaho', abbreviation: 'ID',
    minScore: 62, competitiveScore: 75, avgSalary: '$73,600', programCount: '18+',
    topSchools: ['Boise State University', 'Idaho State University', 'Lewis-Clark State College']
  },
  'illinois': {
    slug: 'illinois', name: 'Illinois', abbreviation: 'IL',
    minScore: 64, competitiveScore: 80, avgSalary: '$81,900', programCount: '120+',
    topSchools: ['UIC College of Nursing', 'Chamberlain University', 'Loyola University Chicago']
  },
  'indiana': {
    slug: 'indiana', name: 'Indiana', abbreviation: 'IN',
    minScore: 62, competitiveScore: 76, avgSalary: '$71,500', programCount: '70+',
    topSchools: ['Indiana University', 'Purdue University', 'Ball State University']
  },
  'iowa': {
    slug: 'iowa', name: 'Iowa', abbreviation: 'IA',
    minScore: 60, competitiveScore: 74, avgSalary: '$67,900', programCount: '50+',
    topSchools: ['University of Iowa', 'Mercy College of Health Sciences', 'Mount Mercy University']
  },
  // --- K ---
  'kansas': {
    slug: 'kansas', name: 'Kansas', abbreviation: 'KS',
    minScore: 60, competitiveScore: 75, avgSalary: '$68,500', programCount: '45+',
    topSchools: ['University of Kansas', 'Wichita State University', 'Washburn University']
  },
  'kentucky': {
    slug: 'kentucky', name: 'Kentucky', abbreviation: 'KY',
    minScore: 60, competitiveScore: 74, avgSalary: '$68,900', programCount: '55+',
    topSchools: ['University of Kentucky', 'University of Louisville', 'Eastern Kentucky University']
  },
  // --- L ---
  'louisiana': {
    slug: 'louisiana', name: 'Louisiana', abbreviation: 'LA',
    minScore: 60, competitiveScore: 75, avgSalary: '$71,300', programCount: '60+',
    topSchools: ['LSU Health New Orleans', 'University of Louisiana at Lafayette', 'Southeastern Louisiana University']
  },
  // --- M ---
  'maine': {
    slug: 'maine', name: 'Maine', abbreviation: 'ME',
    minScore: 65, competitiveScore: 76, avgSalary: '$76,100', programCount: '20+',
    topSchools: ['University of Maine', 'University of Southern Maine', 'Husson University']
  },
  'maryland': {
    slug: 'maryland', name: 'Maryland', abbreviation: 'MD',
    minScore: 65, competitiveScore: 82, avgSalary: '$84,600', programCount: '65+',
    topSchools: ['University of Maryland', 'Johns Hopkins', 'Towson University']
  },
  'massachusetts': {
    slug: 'massachusetts', name: 'Massachusetts', abbreviation: 'MA',
    minScore: 65, competitiveScore: 80, avgSalary: '$99,800', programCount: '90+',
    topSchools: ['UMass Boston', 'Northeastern University', 'Simmons University']
  },
  'michigan': {
    slug: 'michigan', name: 'Michigan', abbreviation: 'MI',
    minScore: 64, competitiveScore: 78, avgSalary: '$79,200', programCount: '105+',
    topSchools: ['University of Michigan', 'Michigan State University', 'Wayne State University']
  },
  'minnesota': {
    slug: 'minnesota', name: 'Minnesota', abbreviation: 'MN',
    minScore: 66, competitiveScore: 79, avgSalary: '$83,700', programCount: '65+',
    topSchools: ['University of Minnesota', 'Minnesota State University Mankato', 'St. Catherine University']
  },
  'mississippi': {
    slug: 'mississippi', name: 'Mississippi', abbreviation: 'MS',
    minScore: 60, competitiveScore: 72, avgSalary: '$65,400', programCount: '45+',
    topSchools: ['University of Mississippi Medical Center', 'University of Southern Mississippi', 'William Carey University']
  },
  'missouri': {
    slug: 'missouri', name: 'Missouri', abbreviation: 'MO',
    minScore: 62, competitiveScore: 76, avgSalary: '$72,200', programCount: '80+',
    topSchools: ['University of Missouri', 'Goldfarb School of Nursing', 'Saint Louis University']
  },
  'montana': {
    slug: 'montana', name: 'Montana', abbreviation: 'MT',
    minScore: 62, competitiveScore: 74, avgSalary: '$71,900', programCount: '12+',
    topSchools: ['Montana State University', 'Carroll College', 'Montana Tech']
  },
  // --- N ---
  'nebraska': {
    slug: 'nebraska', name: 'Nebraska', abbreviation: 'NE',
    minScore: 62, competitiveScore: 75, avgSalary: '$69,300', programCount: '30+',
    topSchools: ['UNMC College of Nursing', 'Creighton University', 'Nebraska Methodist College']
  },
  'nevada': {
    slug: 'nevada', name: 'Nevada', abbreviation: 'NV',
    minScore: 65, competitiveScore: 80, avgSalary: '$92,500', programCount: '20+',
    topSchools: ['UNLV School of Nursing', 'Nevada State College', 'College of Southern Nevada']
  },
  'new-hampshire': {
    slug: 'new-hampshire', name: 'New Hampshire', abbreviation: 'NH',
    minScore: 65, competitiveScore: 76, avgSalary: '$79,800', programCount: '18+',
    topSchools: ['UNH Nursing', 'SNHU', 'Rivier University']
  },
  'new-jersey': {
    slug: 'new-jersey', name: 'New Jersey', abbreviation: 'NJ',
    minScore: 65, competitiveScore: 80, avgSalary: '$89,700', programCount: '85+',
    topSchools: ['Rutgers School of Nursing', 'Seton Hall University', 'TCNJ']
  },
  'new-mexico': {
    slug: 'new-mexico', name: 'New Mexico', abbreviation: 'NM',
    minScore: 60, competitiveScore: 74, avgSalary: '$77,900', programCount: '25+',
    topSchools: ['UNM College of Nursing', 'NMSU', 'Central New Mexico Community College']
  },
  'new-york': {
    slug: 'new-york', name: 'New York', abbreviation: 'NY',
    minScore: 65, competitiveScore: 82, avgSalary: '$93,300', programCount: '155+',
    topSchools: ['Hunter College', 'NYU Rory Meyers', 'Stony Brook University']
  },
  'north-carolina': {
    slug: 'north-carolina', name: 'North Carolina', abbreviation: 'NC',
    minScore: 62, competitiveScore: 78, avgSalary: '$73,800', programCount: '110+',
    topSchools: ['UNC Chapel Hill', 'Duke University', 'ECU College of Nursing']
  },
  'north-dakota': {
    slug: 'north-dakota', name: 'North Dakota', abbreviation: 'ND',
    minScore: 60, competitiveScore: 74, avgSalary: '$72,800', programCount: '15+',
    topSchools: ['University of North Dakota', 'NDSU', 'University of Mary']
  },
  // --- O ---
  'ohio': {
    slug: 'ohio', name: 'Ohio', abbreviation: 'OH',
    minScore: 62, competitiveScore: 78, avgSalary: '$75,600', programCount: '130+',
    topSchools: ['Ohio State University', 'University of Cincinnati', 'Kent State University']
  },
  'oklahoma': {
    slug: 'oklahoma', name: 'Oklahoma', abbreviation: 'OK',
    minScore: 60, competitiveScore: 74, avgSalary: '$67,200', programCount: '50+',
    topSchools: ['OU College of Nursing', 'Oklahoma City University', 'UCO']
  },
  'oregon': {
    slug: 'oregon', name: 'Oregon', abbreviation: 'OR',
    minScore: 65, competitiveScore: 82, avgSalary: '$98,600', programCount: '40+',
    topSchools: ['OHSU School of Nursing', 'University of Portland', 'Linfield University']
  },
  // --- P ---
  'pennsylvania': {
    slug: 'pennsylvania', name: 'Pennsylvania', abbreviation: 'PA',
    minScore: 64, competitiveScore: 78, avgSalary: '$79,300', programCount: '125+',
    topSchools: ['UPenn Nursing', 'Pitt Nursing', 'Drexel University']
  },
  // --- R ---
  'rhode-island': {
    slug: 'rhode-island', name: 'Rhode Island', abbreviation: 'RI',
    minScore: 66, competitiveScore: 80, avgSalary: '$87,200', programCount: '15+',
    topSchools: ['URI College of Nursing', 'RIC School of Nursing', 'Salve Regina University']
  },
  // --- S ---
  'south-carolina': {
    slug: 'south-carolina', name: 'South Carolina', abbreviation: 'SC',
    minScore: 62, competitiveScore: 76, avgSalary: '$71,200', programCount: '55+',
    topSchools: ['USC College of Nursing', 'Clemson University', 'MUSC']
  },
  'south-dakota': {
    slug: 'south-dakota', name: 'South Dakota', abbreviation: 'SD',
    minScore: 60, competitiveScore: 74, avgSalary: '$66,200', programCount: '18+',
    topSchools: ['SDSU College of Nursing', 'USD Nursing', 'Augustana University']
  },
  // --- T ---
  'tennessee': {
    slug: 'tennessee', name: 'Tennessee', abbreviation: 'TN',
    minScore: 62, competitiveScore: 78, avgSalary: '$69,700', programCount: '75+',
    topSchools: ['UT Knoxville', 'Vanderbilt (Entry Level MSN)', 'Belmont University']
  },
  'texas': {
    slug: 'texas', name: 'Texas', abbreviation: 'TX',
    minScore: 58, competitiveScore: 78, avgSalary: '$77,600', programCount: '165+',
    topSchools: ['UT Arlington', 'Texas Woman\'s University', 'UT Health San Antonio']
  },
  // --- U ---
  'utah': {
    slug: 'utah', name: 'Utah', abbreviation: 'UT',
    minScore: 62, competitiveScore: 76, avgSalary: '$75,800', programCount: '30+',
    topSchools: ['University of Utah', 'BYU College of Nursing', 'Weber State University']
  },
  // --- V ---
  'vermont': {
    slug: 'vermont', name: 'Vermont', abbreviation: 'VT',
    minScore: 65, competitiveScore: 76, avgSalary: '$76,500', programCount: '12+',
    topSchools: ['UVM Dept of Nursing', 'Vermont State University', 'Norwich University']
  },
  'virginia': {
    slug: 'virginia', name: 'Virginia', abbreviation: 'VA',
    minScore: 64, competitiveScore: 80, avgSalary: '$77,200', programCount: '95+',
    topSchools: ['UVA School of Nursing', 'VCU School of Nursing', 'George Mason University']
  },
  // --- W ---
  'washington': {
    slug: 'washington', name: 'Washington', abbreviation: 'WA',
    minScore: 68, competitiveScore: 84, avgSalary: '$95,300', programCount: '65+',
    topSchools: ['UW School of Nursing', 'Washington State University', 'Seattle University']
  },
  'west-virginia': {
    slug: 'west-virginia', name: 'West Virginia', abbreviation: 'WV',
    minScore: 60, competitiveScore: 72, avgSalary: '$68,100', programCount: '35+',
    topSchools: ['WVU School of Nursing', 'Marshall University', 'Fairmont State University']
  },
  'wisconsin': {
    slug: 'wisconsin', name: 'Wisconsin', abbreviation: 'WI',
    minScore: 64, competitiveScore: 78, avgSalary: '$78,400', programCount: '75+',
    topSchools: ['UW Madison', 'Marquette University', 'UW Milwaukee']
  },
  'wyoming': {
    slug: 'wyoming', name: 'Wyoming', abbreviation: 'WY',
    minScore: 60, competitiveScore: 74, avgSalary: '$74,300', programCount: '8+',
    topSchools: ['University of Wyoming', 'Laramie County Community College', 'Casper College']
  },
};

export function getStateDetail(slug: string): StateDetail | null {
  return stateDetails[slug] || null;
}