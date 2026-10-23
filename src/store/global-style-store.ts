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
export type VisualsFontSizeChoice = 'xs' | 'sm' | 'base' | 'lg';
export type TechBoxTitleSizeChoice = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
export type StoryFontSizeChoice = 'sm' | 'base' | 'lg' | 'xl' | '2xl';
export type HeadingFontSizeChoice = 'xl' | '2xl' | '3xl' | '4xl';
export type LineHeightChoice = 'normal' | 'relaxed' | 'loose';

export type AccentColorChoice =
  | 'blue'
  | 'cyan'
  | 'emerald'
  | 'purple'
  | 'amber'
  | 'rose'
  | 'orange'
  | 'slate';
export type AnimationChoice = 'smooth' | 'cyber' | 'slide' | 'minimal';
export type DefaultThemeChoice = 'dark' | 'midnight' | 'light' | 'system';

export interface ColorSchemaMeta {
  id: AccentColorChoice;
  name: string;
  label: string;
  hex: string;
  bgClass: string;
  badgeClass: string;
  description: string;
}

export const SELECTIVE_COLOR_SCHEMAS: ColorSchemaMeta[] = [
  {
    id: 'blue',
    name: 'Cyber Blue',
    label: 'Cyber Defense',
    hex: '#3b82f6',
    bgClass: 'bg-blue-500',
    badgeClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    description: 'Enterprise standard cyber defense and network telemetry',
  },
  {
    id: 'cyan',
    name: 'Electric Cyan',
    label: 'Telemetry Pulse',
    hex: '#06b6d4',
    bgClass: 'bg-cyan-500',
    badgeClass: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    description: 'Vibrant neon network monitoring and SIEM data streams',
  },
  {
    id: 'emerald',
    name: 'Matrix Emerald',
    label: 'Tactical Defense',
    hex: '#10b981',
    bgClass: 'bg-emerald-500',
    badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    description: 'Military tactical cyber operations & verified threat intelligence',
  },
  {
    id: 'amber',
    name: 'Alert Amber',
    label: 'Incident Triage',
    hex: '#f59e0b',
    bgClass: 'bg-amber-500',
    badgeClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    description: 'High-visibility triage warning and investigation workflow',
  },
  {
    id: 'purple',
    name: 'Midnight Violet',
    label: 'Threat Hunting',
    hex: '#8b5cf6',
    bgClass: 'bg-purple-500',
    badgeClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
    description: 'Deep digital forensics, malware reverse engineering & threat Intel',
  },
  {
    id: 'rose',
    name: 'Critical Crimson',
    label: 'Incident Command',
    hex: '#f43f5e',
    bgClass: 'bg-rose-500',
    badgeClass: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
    description: 'Critical active incident containment and breach response mode',
  },
  {
    id: 'orange',
    name: 'Solar Flare',
    label: 'High Alert',
    hex: '#f97316',
    bgClass: 'bg-orange-500',
    badgeClass: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30',
    description: 'High-energy security operations and real-time active triage',
  },
  {
    id: 'slate',
    name: 'Tactical Slate',
    label: 'Stealth Monochrome',
    hex: '#64748b',
    bgClass: 'bg-slate-500',
    badgeClass: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30',
    description: 'Ultra-clean minimalist low-fatigue dark tactical aesthetic',
  },
];

export interface SectionFontOverride {
  fontFamily?: FontFamilyChoice;
  fontSizeScale?: FontSizeScaleChoice;
  lineHeight?: 'tight' | 'normal' | 'relaxed';
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

export interface GlobalStyleState {
  // Global Base
  fontFamily: FontFamilyChoice;
  fontSizeScale: FontSizeScaleChoice;
  zoomPercent: number; // e.g. 75 to 140, default: 90
  accentColor: AccentColorChoice;
  animationStyle: AnimationChoice;
  defaultTheme: DefaultThemeChoice;
  globalAudioAutoplay: boolean;

  // Visuals & Diagrams Typography
  visualsFontFamily: FontFamilyChoice;
  visualsFontSize: VisualsFontSizeChoice;

  // Tech Box Typography
  techBoxFontFamily: FontFamilyChoice;
  techBoxTitleSize: TechBoxTitleSizeChoice;
  techBoxBodySize: 'xs' | 'sm' | 'base';

  // Story & Course Text Typography Everywhere
  storyFontFamily: FontFamilyChoice;
  storyFontSize: StoryFontSizeChoice;
  storyLineHeight: LineHeightChoice;
  headingFontFamily: FontFamilyChoice;
  headingFontSize: HeadingFontSizeChoice;

  sectionOverrides: Record<string, SectionFontOverride>;

  // Actions
  setFontFamily: (font: FontFamilyChoice) => void;
  setFontSizeScale: (scale: FontSizeScaleChoice) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  setZoomPercent: (pct: number) => void;
  setAccentColor: (color: AccentColorChoice) => void;
  setAnimationStyle: (anim: AnimationChoice) => void;
  setDefaultTheme: (theme: DefaultThemeChoice) => void;
  setGlobalAudioAutoplay: (autoplay: boolean) => void;

  setVisualsFontFamily: (font: FontFamilyChoice) => void;
  setVisualsFontSize: (size: VisualsFontSizeChoice) => void;

  setTechBoxFontFamily: (font: FontFamilyChoice) => void;
  setTechBoxTitleSize: (size: TechBoxTitleSizeChoice) => void;
  setTechBoxBodySize: (size: 'xs' | 'sm' | 'base') => void;

  setStoryFontFamily: (font: FontFamilyChoice) => void;
  setStoryFontSize: (size: StoryFontSizeChoice) => void;
  setStoryLineHeight: (lineHeight: LineHeightChoice) => void;
  setHeadingFontFamily: (font: FontFamilyChoice) => void;
  setHeadingFontSize: (size: HeadingFontSizeChoice) => void;

  setSectionOverride: (sectionKey: string, override: SectionFontOverride) => void;
  clearSectionOverride: (sectionKey: string) => void;
  resetToDefaults: () => void;
}

const DEFAULT_STATE = {
  fontFamily: 'sans' as FontFamilyChoice,
  fontSizeScale: 'sm' as FontSizeScaleChoice,
  zoomPercent: 90,
  accentColor: 'blue' as AccentColorChoice,
  animationStyle: 'smooth' as AnimationChoice,
  defaultTheme: 'light' as DefaultThemeChoice,
  globalAudioAutoplay: false,

  visualsFontFamily: 'sans' as FontFamilyChoice,
  visualsFontSize: 'sm' as VisualsFontSizeChoice,

  techBoxFontFamily: 'mono' as FontFamilyChoice,
  techBoxTitleSize: 'sm' as TechBoxTitleSizeChoice,
  techBoxBodySize: 'xs' as 'xs' | 'sm' | 'base',

  storyFontFamily: 'sans' as FontFamilyChoice,
  storyFontSize: 'base' as StoryFontSizeChoice,
  storyLineHeight: 'relaxed' as LineHeightChoice,
  headingFontFamily: 'sans' as FontFamilyChoice,
  headingFontSize: '2xl' as HeadingFontSizeChoice,

  sectionOverrides: {},
};

export const useGlobalStyleStore = create<GlobalStyleState>()(
  persist(
    (set) => ({
      ...DEFAULT_STATE,

      setFontFamily: (fontFamily) => set({ fontFamily }),
      setFontSizeScale: (fontSizeScale) => {
        const pctMap: Record<FontSizeScaleChoice, number> = {
          sm: 90,
          md: 100,
          lg: 106,
          xl: 112,
        };
        set({ fontSizeScale, zoomPercent: pctMap[fontSizeScale] || 90 });
      },

      increaseFontSize: () =>
        set((state) => {
          const current = state.zoomPercent ?? 90;
          const next = Math.min(135, current + 5);
          const mappedScale: FontSizeScaleChoice =
            next <= 92 ? 'sm' : next <= 102 ? 'md' : next <= 108 ? 'lg' : 'xl';
          return { zoomPercent: next, fontSizeScale: mappedScale };
        }),

      decreaseFontSize: () =>
        set((state) => {
          const current = state.zoomPercent ?? 90;
          const next = Math.max(75, current - 5);
          const mappedScale: FontSizeScaleChoice =
            next <= 92 ? 'sm' : next <= 102 ? 'md' : next <= 108 ? 'lg' : 'xl';
          return { zoomPercent: next, fontSizeScale: mappedScale };
        }),

      resetFontSize: () =>
        set({
          zoomPercent: 90,
          fontSizeScale: 'sm',
        }),

      setZoomPercent: (zoomPercent) =>
        set({
          zoomPercent,
          fontSizeScale:
            zoomPercent <= 92 ? 'sm' : zoomPercent <= 102 ? 'md' : zoomPercent <= 108 ? 'lg' : 'xl',
        }),

      setAccentColor: (accentColor) => set({ accentColor }),
      setAnimationStyle: (animationStyle) => set({ animationStyle }),
      setDefaultTheme: (defaultTheme) => set({ defaultTheme }),
      setGlobalAudioAutoplay: (globalAudioAutoplay) => set({ globalAudioAutoplay }),

      setVisualsFontFamily: (visualsFontFamily) => set({ visualsFontFamily }),
      setVisualsFontSize: (visualsFontSize) => set({ visualsFontSize }),

      setTechBoxFontFamily: (techBoxFontFamily) => set({ techBoxFontFamily }),
      setTechBoxTitleSize: (techBoxTitleSize) => set({ techBoxTitleSize }),
      setTechBoxBodySize: (techBoxBodySize) => set({ techBoxBodySize }),

      setStoryFontFamily: (storyFontFamily) => set({ storyFontFamily }),
      setStoryFontSize: (storyFontSize) => set({ storyFontSize }),
      setStoryLineHeight: (storyLineHeight) => set({ storyLineHeight }),
      setHeadingFontFamily: (headingFontFamily) => set({ headingFontFamily }),
      setHeadingFontSize: (headingFontSize) => set({ headingFontSize }),

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
