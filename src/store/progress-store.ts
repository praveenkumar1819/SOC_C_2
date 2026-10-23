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
      storage: {
        getItem: (name) => {
          if (typeof window === 'undefined') return null;
          try {
            const str = localStorage.getItem(name);
            if (!str) return null;
            const parsed = JSON.parse(str);
            return {
              state: {
                ...parsed.state,
                completedUnits: new Set(parsed.state?.completedUnits || []),
                completedTopics: new Set(parsed.state?.completedTopics || []),
                completedModules: new Set(parsed.state?.completedModules || []),
              },
            };
          } catch (e) {
            return null;
          }
        },
        setItem: (name, value) => {
          if (typeof window === 'undefined') return;
          try {
            const serialized = {
              state: {
                ...value.state,
                completedUnits: Array.from(value.state.completedUnits || []),
                completedTopics: Array.from(value.state.completedTopics || []),
                completedModules: Array.from(value.state.completedModules || []),
              },
            };
            localStorage.setItem(name, JSON.stringify(serialized));
          } catch (e) {}
        },
        removeItem: (name) => {
          if (typeof window !== 'undefined') {
            localStorage.removeItem(name);
          }
        },
      },
    }
  )
);
