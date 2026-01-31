export interface University {
  id: string;
  name: string;
  country: string;
  costLevel: 'Low' | 'Medium' | 'High';
  acceptanceChance: 'Low' | 'Medium' | 'High';
  category: 'Dream' | 'Target' | 'Safe';
  whyFit: string;
  risks: string;
  tuitionFee: string;
}

export interface ToDoItem {
  id: string;
  task: string;
  completed: boolean;
  category: 'Exams' | 'Documents' | 'Profile' | 'Applications';
}

export interface UserProfile {
  name: string;
  educationLevel: string;
  major: string;
  graduationYear: number;
  gpa: string;
  intendedDegree: string;
  fieldOfStudy: string;
  targetIntakeYear: string;
  preferredCountries: string[];
  budgetRange: string;
  fundingPlan: string;
  ieltsScore: string;
  greScore: string;
  sopStatus: 'Not Started' | 'Draft' | 'Review' | 'Final';
}

export const AppStage = {
  BUILDING_PROFILE: 0,
  DISCOVERING_UNIVERSITIES: 1,
  FINALIZING_UNIVERSITIES: 2,
  PREPARING_APPLICATIONS: 3,
} as const;

export type AppStage = typeof AppStage[keyof typeof AppStage];

export interface AppState {
  profile: UserProfile;
  shortlistedUniversities: University[];
  lockedUniversityIds: string[];
  toDos: ToDoItem[];
  currentStage: AppStage;
}