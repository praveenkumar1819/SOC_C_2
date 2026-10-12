import fs from 'fs';
import path from 'path';
import * as bcrypt from 'bcryptjs';
import { V2_MODULES } from '../data/curriculum-v2-data';

export interface LocalUser {
  id: string;
  email: string;
  name: string | null;
  password: string;
  role: 'STUDENT' | 'ADMIN' | 'INSTRUCTOR';
  avatar?: string | null;
  bio?: string | null;
  totalXP: number;
  level: number;
  currentStreak: number;
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
  progress?: any[];
  badges?: any[];
}

export interface LocalModule {
  id: string;
  title: string;
  description: string;
  order: number;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  estimatedHours: number;
  resourceLabs: number;
  liveLabs: number;
  isPublished: boolean;
  isLocked: boolean;
  learningObjectives: string[];
  prerequisites: string[];
  topics?: any[];
}

const DEFAULT_HASH = '$2a$10$qmvE24Ot.mdwO3BqYw3Ez.et9FocQJINCqqa5vXEgSVF.9ncCiN1e'; // password123

export const INITIAL_USERS: LocalUser[] = [
  {
    id: 'user_admin',
    email: 'admin@socplatform.com',
    name: 'Admin User',
    password: DEFAULT_HASH,
    role: 'ADMIN',
    totalXP: 0,
    level: 1,
    currentStreak: 0,
    lastActive: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'user_student',
    email: 'student@socplatform.com',
    name: 'John Analyst',
    password: DEFAULT_HASH,
    role: 'STUDENT',
    totalXP: 0,
    level: 1,
    currentStreak: 0,
    lastActive: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const INITIAL_MODULES: LocalModule[] = V2_MODULES.map((m) => ({
  id: m.id,
  title: m.title,
  description: m.story,
  order: m.order,
  difficulty: m.difficulty,
  estimatedHours: m.totalHours,
  resourceLabs: m.units.length,
  liveLabs: m.units.length,
  isPublished: true,
  isLocked: false,
  learningObjectives: [
    `Master core concepts of ${m.title} in the CDAC Bengaluru learning setting.`,
    `Learn with mentor ${m.mentor} (${m.mentorRole}).`,
    `Follow the four-section learning flow: Theory, Video/Visual, Interactive, Knowledge Check.`,
    `Complete unit assessments and hands-on lab requirements.`
  ],
  prerequisites: m.order === 0 ? [] : [String(m.order - 1).padStart(2, '0')]
}));


export const INITIAL_BADGES = [
  {
    id: 'badge_1',
    name: 'Foundation Ready',
    description: 'Complete foundational modules (0-3)',
    icon: 'foundation',
    xpBonus: 500,
  },
  {
    id: 'badge_2',
    name: 'Network Navigator',
    description: 'Master networking fundamentals',
    icon: 'network',
    xpBonus: 250,
  },
  {
    id: 'badge_3',
    name: 'Alert Triage Ready',
    description: 'Complete SOC Operations module',
    icon: 'alert',
    xpBonus: 300,
  },
  {
    id: 'badge_4',
    name: 'Log Reader',
    description: 'Master log analysis',
    icon: 'logs',
    xpBonus: 300,
  },
  {
    id: 'badge_5',
    name: 'Endpoint Observer',
    description: 'Complete EDR module',
    icon: 'endpoint',
    xpBonus: 350,
  },
  {
    id: 'badge_6',
    name: 'Detection Explorer',
    description: 'Understand detection ecosystem',
    icon: 'detection',
    xpBonus: 400,
  },
  {
    id: 'badge_7',
    name: 'Incident Documenter',
    description: 'Master incident response documentation',
    icon: 'document',
    xpBonus: 350,
  },
  {
    id: 'badge_8',
    name: 'SOC L1 Ready',
    description: 'Complete all modules and final assessment',
    icon: 'graduate',
    xpBonus: 1000,
  },
];

const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'local-store.json');

export interface LocalStoreData {
  users: LocalUser[];
  modules: LocalModule[];
  badges: any[];
  progress: any[];
  userBadges?: any[];
  knowledgeCheckAttempts?: any[];
}

export function getLocalStore(): LocalStoreData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      return {
        users: parsed.users || INITIAL_USERS,
        modules: parsed.modules || INITIAL_MODULES,
        badges: parsed.badges || INITIAL_BADGES,
        progress: parsed.progress || [],
        userBadges: parsed.userBadges || [],
        knowledgeCheckAttempts: parsed.knowledgeCheckAttempts || [],
      };
    }
  } catch (err) {
    console.error('Error reading local store:', err);
  }

  const defaultStore: LocalStoreData = {
    users: INITIAL_USERS,
    modules: INITIAL_MODULES,
    badges: INITIAL_BADGES,
    progress: [],
    userBadges: [],
    knowledgeCheckAttempts: [],
  };
  saveLocalStore(defaultStore);
  return defaultStore;
}

export function saveLocalStore(store: LocalStoreData) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving local store:', err);
  }
}
