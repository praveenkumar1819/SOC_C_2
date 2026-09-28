import { Difficulty, UnitType, QuestionType, ScenarioType, ProgressStatus, UserRole } from '@prisma/client';

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  difficulty: Difficulty;
  estimatedHours: number;
  resourceLabs: number;
  liveLabs: number;
  isPublished: boolean;
  isLocked: boolean;
  learningObjectives: string[];
  prerequisites: string[];
}

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  totalXP: number;
  level: number;
  currentStreak: number;
}

export interface LearningUnitContent {
  text?: string;
  subtitle?: string;
  visual?: any;
  techBox?: {
    title: string;
    content: string;
  };
  knowMore?: {
    title: string;
    content: string;
  };
  realWorldExample?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
