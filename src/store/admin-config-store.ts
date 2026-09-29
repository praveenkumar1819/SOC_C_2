import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminConfigState {
  // Modules configuration
  disabledModules: string[];
  moduleResetCounts: Record<string, number>;

  // Units configuration (Section 13)
  disabledUnits: string[];
  unlockedUnits: string[];
  unitResetCounts: Record<string, number>;

  // Topics configuration
  disabledTopics: string[];
  topicResetCounts: Record<string, number>;

  // Labs section toggle
  labsEnabled: boolean;

  // Assessments lock state
  unlockedAssessments: string[];
  assessmentResetCounts: Record<string, number>;

  // XP system toggle
  xpSystemEnabled: boolean;

  // Global reset revision
  globalResetRevision: number;

  // Actions
  toggleModule: (moduleId: string, forceState?: boolean) => void;
  resetModule: (moduleId: string) => void;

  toggleUnit: (unitId: string, forceState?: boolean) => void;
  toggleUnitUnlock: (unitId: string, forceState?: boolean) => void;
  resetUnit: (unitId: string) => void;

  toggleTopic: (topicId: string, forceState?: boolean) => void;
  resetTopic: (topicId: string) => void;

  toggleLabs: (forceState?: boolean) => void;
  toggleAssessmentLock: (assessmentId: string, forceState?: boolean) => void;
  resetAssessment: (assessmentId: string) => void;

  toggleXpSystem: (forceState?: boolean) => void;
  globalReset: () => void;
}

export const useAdminConfigStore = create<AdminConfigState>()(
  persist(
    (set, get) => ({
      disabledModules: [],
      moduleResetCounts: {},
      disabledUnits: [],
      unlockedUnits: [],
      unitResetCounts: {},
      disabledTopics: [],
      topicResetCounts: {},
      labsEnabled: false,
      unlockedAssessments: [],
      assessmentResetCounts: {},
      xpSystemEnabled: true,
      globalResetRevision: 0,

      toggleModule: (moduleId: string, forceState?: boolean) =>
        set((state) => {
          const isCurrentlyDisabled = state.disabledModules.includes(moduleId);
          const shouldDisable = forceState !== undefined ? !forceState : !isCurrentlyDisabled;
          return {
            disabledModules: shouldDisable
              ? [...new Set([...state.disabledModules, moduleId])]
              : state.disabledModules.filter((id) => id !== moduleId),
          };
        }),

      resetModule: (moduleId: string) =>
        set((state) => ({
          moduleResetCounts: {
            ...state.moduleResetCounts,
            [moduleId]: (state.moduleResetCounts[moduleId] || 0) + 1,
          },
        })),

      toggleUnit: (unitId: string, forceState?: boolean) =>
        set((state) => {
          const isCurrentlyDisabled = state.disabledUnits.includes(unitId);
          const shouldDisable = forceState !== undefined ? !forceState : !isCurrentlyDisabled;
          return {
            disabledUnits: shouldDisable
              ? [...new Set([...state.disabledUnits, unitId])]
              : state.disabledUnits.filter((id) => id !== unitId),
          };
        }),

      toggleUnitUnlock: (unitId: string, forceState?: boolean) =>
        set((state) => {
          const isCurrentlyUnlocked = state.unlockedUnits?.includes(unitId) ?? false;
          const shouldUnlock = forceState !== undefined ? forceState : !isCurrentlyUnlocked;
          return {
            unlockedUnits: shouldUnlock
              ? [...new Set([...(state.unlockedUnits || []), unitId])]
              : (state.unlockedUnits || []).filter((id) => id !== unitId),
          };
        }),

      resetUnit: (unitId: string) =>
        set((state) => ({
          unitResetCounts: {
            ...state.unitResetCounts,
            [unitId]: (state.unitResetCounts[unitId] || 0) + 1,
          },
        })),

      toggleTopic: (topicId: string, forceState?: boolean) =>
        set((state) => {
          const isCurrentlyDisabled = state.disabledTopics.includes(topicId);
          const shouldDisable = forceState !== undefined ? !forceState : !isCurrentlyDisabled;
          return {
            disabledTopics: shouldDisable
              ? [...new Set([...state.disabledTopics, topicId])]
              : state.disabledTopics.filter((id) => id !== topicId),
          };
        }),

      resetTopic: (topicId: string) =>
        set((state) => ({
          topicResetCounts: {
            ...state.topicResetCounts,
            [topicId]: (state.topicResetCounts[topicId] || 0) + 1,
          },
        })),

      toggleLabs: (forceState?: boolean) =>
        set((state) => ({
          labsEnabled: forceState !== undefined ? forceState : !state.labsEnabled,
        })),

      toggleAssessmentLock: (assessmentId: string, forceState?: boolean) =>
        set((state) => {
          const isCurrentlyUnlocked = state.unlockedAssessments.includes(assessmentId);
          const shouldUnlock = forceState !== undefined ? forceState : !isCurrentlyUnlocked;
          return {
            unlockedAssessments: shouldUnlock
              ? [...new Set([...state.unlockedAssessments, assessmentId])]
              : state.unlockedAssessments.filter((id) => id !== assessmentId),
          };
        }),

      resetAssessment: (assessmentId: string) =>
        set((state) => ({
          assessmentResetCounts: {
            ...state.assessmentResetCounts,
            [assessmentId]: (state.assessmentResetCounts[assessmentId] || 0) + 1,
          },
        })),

      toggleXpSystem: (forceState?: boolean) =>
        set((state) => ({
          xpSystemEnabled: forceState !== undefined ? forceState : !state.xpSystemEnabled,
        })),

      globalReset: () => {
        try {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('soc-progress-storage');
          }
        } catch (e) {
          console.error('Failed to clear progress storage:', e);
        }
        set((state) => ({
          disabledModules: [],
          moduleResetCounts: {},
          disabledUnits: [],
          unlockedUnits: [],
          unitResetCounts: {},
          disabledTopics: [],
          topicResetCounts: {},
          labsEnabled: false,
          unlockedAssessments: [],
          assessmentResetCounts: {},
          xpSystemEnabled: true,
          globalResetRevision: state.globalResetRevision + 1,
        }));
      },
    }),
    {
      name: 'soc-admin-dev-config',
    }
  )
);
