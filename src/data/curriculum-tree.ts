import { V2_MODULES } from './curriculum-v2-data';

export interface CurriculumTopic {
  id: string;
  moduleId: string;
  unitId: string;
  title: string;
  order: number;
  estimatedMinutes?: number;
  xpReward?: number;
  isAssessment?: boolean;
}

export interface CurriculumUnit {
  id: string;
  moduleId: string;
  unitNumber: number;
  title: string;
  description?: string;
  topics: CurriculumTopic[];
}

export interface CurriculumModule {
  id: string;
  title: string;
  description: string;
  order: number;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  estimatedHours: number;
  isPublished: boolean;
  defaultLocked: boolean;
  units: CurriculumUnit[];
}

// Canonical Curriculum Tree mapped from CDAC Bengaluru Version 2 curriculum (15 modules)
export const CURRICULUM_TREE: CurriculumModule[] = V2_MODULES.map((m) => {
  const units: CurriculumUnit[] = m.units.map((u) => {
    const topics: CurriculumTopic[] = u.chapters.map((c, cIdx) => ({
      id: c.id,
      moduleId: m.id,
      unitId: u.id,
      title: c.title,
      order: cIdx + 1,
      estimatedMinutes: c.duration,
      xpReward: c.xpReward || 35,
      isAssessment: false,
    }));

    // Add unit assessment as 3rd item
    topics.push({
      id: u.assessment.id,
      moduleId: m.id,
      unitId: u.id,
      title: u.assessment.title,
      order: topics.length + 1,
      estimatedMinutes: u.assessment.duration,
      xpReward: u.assessment.xpReward || 50,
      isAssessment: true,
    });

    return {
      id: u.id,
      moduleId: m.id,
      unitNumber: u.unitNumber,
      title: u.title,
      description: u.description,
      topics,
    };
  });

  return {
    id: m.id,
    title: m.title,
    description: m.story,
    order: m.order,
    difficulty: m.difficulty,
    estimatedHours: m.totalHours,
    isPublished: true,
    defaultLocked: m.order > 3, // First 4 modules unlocked by default
    units,
  };
});

// All sequential topics for progression tracking
export const ALL_CURRICULUM_TOPICS = CURRICULUM_TREE.flatMap((m) =>
  m.units.flatMap((u) => u.topics)
);

// Backward compatibility export for module 04 sequence
export const MODULE_04_SEQUENCE =
  CURRICULUM_TREE.find((m) => m.id === '04')?.units.flatMap((u) => u.topics) || [];

/**
 * Returns the status of a topic: 'completed' | 'current' | 'locked' | 'available'
 */
export function getTopicStatus({
  topicId,
  moduleId,
  completedTopics,
  completedUnits,
  currentTopicId,
  unlockedAssessments = [],
  isAssessment = false,
}: {
  topicId: string;
  moduleId: string;
  completedTopics: Set<string>;
  completedUnits: Set<string>;
  currentTopicId: string | null;
  unlockedAssessments?: string[];
  isAssessment?: boolean;
}): 'completed' | 'current' | 'locked' | 'available' {
  const isUnlockAll =
    unlockedAssessments.includes('unlock-all') || unlockedAssessments.includes(topicId);

  // 1. Completed check
  if (isAssessment) {
    if (completedUnits.has(topicId) || (isUnlockAll && completedUnits.has(topicId))) {
      return 'completed';
    }
  } else {
    if (completedTopics.has(topicId)) {
      return 'completed';
    }
  }

  // 2. Currently active topic check
  if (currentTopicId === topicId) {
    return 'current';
  }

  // 3. If unlocked via admin override
  if (isUnlockAll) {
    return 'available';
  }

  // Sequential progression: topic is available if first in module or previous is done
  const moduleObj = CURRICULUM_TREE.find((m) => m.id === moduleId);
  if (moduleObj) {
    const flatTopics = moduleObj.units.flatMap((u) => u.topics);
    const seqIndex = flatTopics.findIndex((t) => t.id === topicId);
    if (seqIndex <= 0) return 'available';

    const prevTopic = flatTopics[seqIndex - 1];
    const prevDone = prevTopic.isAssessment
      ? completedUnits.has(prevTopic.id)
      : completedTopics.has(prevTopic.id);

    if (!prevDone) return 'locked';
    return 'available';
  }

  return 'available';
}

/**
 * Returns the status of a module: 'completed' | 'current' | 'locked' | 'available'
 */
export function getModuleStatus({
  module,
  completedModules,
  completedTopics,
  completedUnits,
  currentModuleId,
  unlockedAssessments = [],
}: {
  module: CurriculumModule;
  completedModules: Set<string>;
  completedTopics: Set<string>;
  completedUnits: Set<string>;
  currentModuleId: string | null;
  unlockedAssessments?: string[];
}): 'completed' | 'current' | 'locked' | 'available' {
  if (completedModules.has(module.id)) {
    return 'completed';
  }

  if (currentModuleId === module.id) {
    return 'current';
  }

  const isUnlockAll =
    unlockedAssessments.includes('unlock-all') || unlockedAssessments.includes(module.id);
  if (isUnlockAll) {
    return 'available';
  }

  if (module.defaultLocked) {
    const prevOrder = module.order - 1;
    const prevModule = CURRICULUM_TREE.find((m) => m.order === prevOrder);
    if (prevModule && !completedModules.has(prevModule.id)) {
      return 'locked';
    }
  }

  return 'available';
}
