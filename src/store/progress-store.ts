import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  completedUnits: Set<string>;
  completedTopics: Set<string>;
  completedModules: Set<string>;
  totalXP: number;
  currentModule: string | null;
  currentTopic: string | null;
  
  // Actions
  completeUnit: (unitId: string, xp?: number) => void;
  markUnitComplete: (unitId: string, xp?: number) => void;
  completeTopic: (topicId: string) => void;
  completeModule: (moduleId: string) => void;
  setCurrentModule: (moduleId: string | null) => void;
  setCurrentTopic: (topicId: string | null) => void;
  addXP: (amount: number) => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      completedUnits: new Set<string>(),
      completedTopics: new Set<string>(),
      completedModules: new Set<string>(),
      totalXP: 0,
      currentModule: null,
      currentTopic: null,

      completeUnit: (unitId: string, xp: number = 0) =>
        set((state) => {
          const next = new Set(state.completedUnits);
          next.add(unitId);
          return {
            completedUnits: next,
            totalXP: state.totalXP + xp,
          };
        }),

      markUnitComplete: (unitId: string, xp: number = 0) =>
        set((state) => {
          const next = new Set(state.completedUnits);
          next.add(unitId);
          return {
            completedUnits: next,
            totalXP: state.totalXP + xp,
          };
        }),

      completeTopic: (topicId: string) =>
        set((state) => {
          const next = new Set(state.completedTopics);
          next.add(topicId);
          return {
            completedTopics: next,
          };
        }),

      completeModule: (moduleId: string) =>
        set((state) => {
          const next = new Set(state.completedModules);
          next.add(moduleId);
          return {
            completedModules: next,
          };
        }),

      setCurrentModule: (moduleId: string | null) =>
        set({ currentModule: moduleId }),

      setCurrentTopic: (topicId: string | null) =>
        set({ currentTopic: topicId }),

      addXP: (amount: number) =>
        set((state) => ({ totalXP: state.totalXP + amount })),

      resetProgress: () =>
        set({
          completedUnits: new Set<string>(),
          completedTopics: new Set<string>(),
          completedModules: new Set<string>(),
          totalXP: 0,
          currentModule: null,
          currentTopic: null,
        }),
    }),
    {
      name: 'soc-progress-storage',
      serialize: (state) => {
        return JSON.stringify({
          ...state.state,
          completedUnits: Array.from(state.state.completedUnits || []),
          completedTopics: Array.from(state.state.completedTopics || []),
          completedModules: Array.from(state.state.completedModules || []),
        });
      },
      deserialize: (str) => {
        const parsed = JSON.parse(str);
        return {
          state: {
            ...parsed,
            completedUnits: new Set(parsed.completedUnits || []),
            completedTopics: new Set(parsed.completedTopics || []),
            completedModules: new Set(parsed.completedModules || []),
          },
        };
      },
    }
  )
);
