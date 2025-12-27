import { School } from '@/lib/types/school';

export const schoolsData: School[] = [
  { slug: "emory-university-georgia", name: "Emory University", state: "Georgia", city: "Atlanta", type: "University", program_name: "BSN", nclex_candidates: 210, min_teas_score: 85, avg_gpa: 3.8, application_deadline: "2025-01-15", acceptance_rate: 18, tuition_in_state: 57000 },
  { slug: "mercer-university-georgia", name: "Mercer University", state: "Georgia", city: "Macon", type: "University", program_name: "BSN", nclex_candidates: 140, min_teas_score: 76, avg_gpa: 3.5, application_deadline: "2025-02-01", acceptance_rate: 65, tuition_in_state: 29000 }
];

export function getSchoolBySlug(slug: string): School | undefined {
  return schoolsData.find((s) => s.slug === slug);
}

export function getAllSchools(): School[] {
  return schoolsData;
}
