import { create } from 'zustand';

interface ProgressState {
  currentModuleId: string | null;
  currentTopicId: string | null;
  currentUnitId: string | null;
  xpEarnedThisSession: number;
  completedUnits: string[];
  
  setCurrentModule: (moduleId: string | null) => void;
  setCurrentTopic: (topicId: string | null) => void;
  setCurrentUnit: (unitId: string | null) => void;
  addXP: (amount: number) => void;
  markUnitComplete: (unitId: string) => void;
  resetSessionXP: () => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  currentModuleId: null,
  currentTopicId: null,
  currentUnitId: null,
  xpEarnedThisSession: 0,
  completedUnits: [],

  setCurrentModule: (moduleId) => set({ currentModuleId: moduleId }),
  setCurrentTopic: (topicId) => set({ currentTopicId: topicId }),
  setCurrentUnit: (unitId) => set({ currentUnitId: unitId }),
  
  addXP: (amount) =>
    set((state) => ({
      xpEarnedThisSession: state.xpEarnedThisSession + amount,
    })),

  markUnitComplete: (unitId) =>
    set((state) => ({
      completedUnits: state.completedUnits.includes(unitId)
        ? state.completedUnits
        : [...state.completedUnits, unitId],
    })),

  resetSessionXP: () => set({ xpEarnedThisSession: 0 }),
}));
