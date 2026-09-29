import { create } from 'zustand';

interface GlossaryState {
  isOpen: boolean;
  highlightedTerm: string | null;
  currentTopicTerms: string[];

  openGlossary: (term?: string) => void;
  closeGlossary: () => void;
  setCurrentTopicTerms: (terms: string[]) => void;
}

export const useGlossaryStore = create<GlossaryState>((set) => ({
  isOpen: false,
  highlightedTerm: null,
  currentTopicTerms: [],

  openGlossary: (term?: string) =>
    set({
      isOpen: true,
      highlightedTerm: term || null,
    }),

  closeGlossary: () =>
    set({
      isOpen: false,
      highlightedTerm: null,
    }),

  setCurrentTopicTerms: (terms: string[]) =>
    set({
      currentTopicTerms: terms,
    }),
}));
