export type User = {
  id: string;
  name: string;
  email: string;
  academicScores: {
    math: number;
    science: number;
    english: number;
    socialStudies: number;
    arts: number;
  };
  interests: string[];
  skills: string[];
  personalityType: string;
  savedCareers: string[];
};

export type Career = {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  matchingTags: string[];
  educationRequired: string;
  averageSalary: string;
  growthOutlook: string;
  confidenceScore?: number;
};

export type AssessmentSection = {
  id: string;
  title: string;
  completed: boolean;
};

export type PersonalityTrait = {
  id: string;
  title: string;
  description: string;
  options: {
    a: string;
    b: string;
  };
  answer: 'a' | 'b' | null;
};

export type PersonalityType = {
  code: string;
  title: string;
  description: string;
  careers: string[];
};

export type AcademicSubject = {
  id: string;
  name: string;
  score: number;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
};

export type Interest = {
  id: string;
  name: string;
  category: string;
};