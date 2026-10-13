import fs from 'fs';
import path from 'path';
import { V2_MODULES, V2_LABS, V2Module, V2Unit, V2Chapter, V2Lab, V2UnitAssessment, normalizeV2Chapter } from '@/data/curriculum-v2-data';

const DATA_DIR = path.join(process.cwd(), '.data');
const CURRICULUM_STORE_FILE = path.join(DATA_DIR, 'curriculum-v2-store.json');
const LABS_STORE_FILE = path.join(DATA_DIR, 'labs-v2-store.json');

// In-memory cache
let cachedModules: V2Module[] | null = null;
let cachedLabs: V2Lab[] | null = null;

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/**
 * Loads all V2 modules from persistent file or defaults to V2_MODULES
 */
export function getCurriculumModules(): V2Module[] {
  if (cachedModules) return cachedModules;

  try {
    ensureDataDir();
    if (fs.existsSync(CURRICULUM_STORE_FILE)) {
      const content = fs.readFileSync(CURRICULUM_STORE_FILE, 'utf-8');
      cachedModules = JSON.parse(content);
      return cachedModules!;
    }
  } catch (err) {
    console.error('Error reading curriculum store file, falling back to static data:', err);
  }

  // Initialize store file
  cachedModules = JSON.parse(JSON.stringify(V2_MODULES));
  saveCurriculumModules(cachedModules!);
  return cachedModules!;
}

/**
 * Persists all V2 modules to disk
 */
export function saveCurriculumModules(modules: V2Module[]): boolean {
  try {
    ensureDataDir();
    fs.writeFileSync(CURRICULUM_STORE_FILE, JSON.stringify(modules, null, 2), 'utf-8');
    cachedModules = modules;
    return true;
  } catch (err) {
    console.error('Error saving curriculum store:', err);
    return false;
  }
}

/**
 * Retrieves a single module by ID
 */
export function getCurriculumModule(moduleId: string): V2Module | null {
  const modules = getCurriculumModules();
  return modules.find((m) => m.id === moduleId) || null;
}

/**
 * Retrieves a specific chapter by ID
 */
export function getCurriculumChapter(chapterId: string): {
  module: V2Module;
  unit: V2Unit;
  chapter: V2Chapter;
} | null {
  const modules = getCurriculumModules();
  for (const m of modules) {
    for (const u of m.units) {
      for (let i = 0; i < u.chapters.length; i++) {
        const c = u.chapters[i];
        if (c.id === chapterId) {
          return { module: m, unit: u, chapter: normalizeV2Chapter(c, u, m, i) };
        }
      }
    }
  }
  return null;
}

/**
 * Updates a specific chapter in-place (Admin edit)
 */
export function updateCurriculumChapter(chapterId: string, updatedChapter: Partial<V2Chapter>): boolean {
  const modules = getCurriculumModules();
  let found = false;

  for (const m of modules) {
    for (const u of m.units) {
      const chIdx = u.chapters.findIndex((c) => c.id === chapterId);
      if (chIdx !== -1) {
        u.chapters[chIdx] = {
          ...u.chapters[chIdx],
          ...updatedChapter,
        };
        found = true;
        break;
      }
    }
    if (found) break;
  }

  if (found) {
    return saveCurriculumModules(modules);
  }
  return false;
}

/**
 * Retrieves a specific assessment by ID
 */
export function getCurriculumAssessment(assessmentId: string): {
  module: V2Module;
  unit: V2Unit;
  assessment: V2UnitAssessment;
} | null {
  const modules = getCurriculumModules();
  for (const m of modules) {
    for (const u of m.units) {
      if (u.assessment && u.assessment.id === assessmentId) {
        return { module: m, unit: u, assessment: u.assessment };
      }
    }
  }
  return null;
}

/**
 * Updates a specific assessment in-place (Admin edit)
 */
export function updateCurriculumAssessment(
  assessmentId: string,
  updatedAssessment: Partial<V2UnitAssessment>
): boolean {
  const modules = getCurriculumModules();
  let found = false;

  for (const m of modules) {
    for (const u of m.units) {
      if (u.assessment && u.assessment.id === assessmentId) {
        u.assessment = {
          ...u.assessment,
          ...updatedAssessment,
        };
        found = true;
        break;
      }
    }
    if (found) break;
  }

  if (found) {
    return saveCurriculumModules(modules);
  }
  return false;
}

/**
 * Loads all V2 Labs
 */
export function getCurriculumLabs(): V2Lab[] {
  if (cachedLabs) return cachedLabs;

  try {
    ensureDataDir();
    if (fs.existsSync(LABS_STORE_FILE)) {
      const content = fs.readFileSync(LABS_STORE_FILE, 'utf-8');
      cachedLabs = JSON.parse(content);
      return cachedLabs!;
    }
  } catch (err) {
    console.error('Error reading labs store file:', err);
  }

  cachedLabs = JSON.parse(JSON.stringify(V2_LABS));
  saveCurriculumLabs(cachedLabs!);
  return cachedLabs!;
}

/**
 * Saves Labs
 */
export function saveCurriculumLabs(labs: V2Lab[]): boolean {
  try {
    ensureDataDir();
    fs.writeFileSync(LABS_STORE_FILE, JSON.stringify(labs, null, 2), 'utf-8');
    cachedLabs = labs;
    return true;
  } catch (err) {
    console.error('Error saving labs store:', err);
    return false;
  }
}
