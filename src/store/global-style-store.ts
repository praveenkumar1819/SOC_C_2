'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FontFamilyChoice =
  | 'sans'
  | 'mono'
  | 'serif'
  | 'cyber'
  | 'poppins'
  | 'samsung'
  | 'beebeez'
  | 'striker'
  | 'spartan';
export type FontSizeScaleChoice = 'sm' | 'md' | 'lg' | 'xl';
export type AccentColorChoice = 'blue' | 'cyan' | 'emerald' | 'purple' | 'amber' | 'rose';
export type AnimationChoice = 'smooth' | 'cyber' | 'slide' | 'minimal';
export type DefaultThemeChoice = 'dark' | 'midnight' | 'light' | 'system';

export interface SectionFontOverride {
  fontFamily?: FontFamilyChoice;
  fontSizeScale?: FontSizeScaleChoice;
  lineHeight?: 'tight' | 'normal' | 'relaxed';
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

export interface GlobalStyleState {
  fontFamily: FontFamilyChoice;
  fontSizeScale: FontSizeScaleChoice;
  accentColor: AccentColorChoice;
  animationStyle: AnimationChoice;
  defaultTheme: DefaultThemeChoice;
  globalAudioAutoplay: boolean;
  sectionOverrides: Record<string, SectionFontOverride>;

  // Actions
  setFontFamily: (font: FontFamilyChoice) => void;
  setFontSizeScale: (scale: FontSizeScaleChoice) => void;
  setAccentColor: (color: AccentColorChoice) => void;
  setAnimationStyle: (anim: AnimationChoice) => void;
  setDefaultTheme: (theme: DefaultThemeChoice) => void;
  setGlobalAudioAutoplay: (autoplay: boolean) => void;
  setSectionOverride: (sectionKey: string, override: SectionFontOverride) => void;
  clearSectionOverride: (sectionKey: string) => void;
  resetToDefaults: () => void;
}

const DEFAULT_STATE = {
  fontFamily: 'sans' as FontFamilyChoice,
  fontSizeScale: 'md' as FontSizeScaleChoice,
  accentColor: 'blue' as AccentColorChoice,
  animationStyle: 'smooth' as AnimationChoice,
  defaultTheme: 'dark' as DefaultThemeChoice,
  globalAudioAutoplay: false,
  sectionOverrides: {},
};

export const useGlobalStyleStore = create<GlobalStyleState>()(
  persist(
    (set) => ({
      ...DEFAULT_STATE,

      setFontFamily: (fontFamily) => set({ fontFamily }),
      setFontSizeScale: (fontSizeScale) => set({ fontSizeScale }),
      setAccentColor: (accentColor) => set({ accentColor }),
      setAnimationStyle: (animationStyle) => set({ animationStyle }),
      setDefaultTheme: (defaultTheme) => set({ defaultTheme }),
      setGlobalAudioAutoplay: (globalAudioAutoplay) => set({ globalAudioAutoplay }),

      setSectionOverride: (sectionKey, override) =>
        set((state) => ({
          sectionOverrides: {
            ...state.sectionOverrides,
            [sectionKey]: {
              ...(state.sectionOverrides[sectionKey] || {}),
              ...override,
            },
          },
        })),

      clearSectionOverride: (sectionKey) =>
        set((state) => {
          const next = { ...state.sectionOverrides };
          delete next[sectionKey];
          return { sectionOverrides: next };
        }),

      resetToDefaults: () => set(DEFAULT_STATE),
    }),
    {
      name: 'soc_global_style_v2_store',
    }
  )
);
