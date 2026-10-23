'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ChevronUp,
  ChevronDown,
  Film,
  Activity,
  HelpCircle,
  Eye,
  Maximize2,
  Columns,
  Sliders,
  Building2,
  Award,
  Lock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/lib/sound-effects';

export interface SectionNode {
  id: string;
  label: string;
  shortLabel: string;
  icon?: React.ReactNode;
}

interface SectionSidebarLineProps {
  sections?: SectionNode[];
  activeId?: string;
  onSelect?: (id: string) => void;
}

const DEFAULT_SECTIONS: SectionNode[] = [
  { id: 'section-intro', label: '1. Concept & Visual Story', shortLabel: 'Story', icon: <Eye className="w-3.5 h-3.5" /> },
  { id: 'section-interactive', label: '2. Interactive Simulator', shortLabel: 'Simulator', icon: <Activity className="w-3.5 h-3.5" /> },
  { id: 'section-kc', label: '3. Knowledge Check', shortLabel: 'Quiz', icon: <HelpCircle className="w-3.5 h-3.5" /> },
];

export function SectionSidebarLine({
  sections = DEFAULT_SECTIONS,
  activeId: controlledActiveId,
  onSelect,
}: SectionSidebarLineProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>(controlledActiveId || sections[0].id);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [layoutMode, setLayoutMode] = useState<'focused' | 'split'>('focused');
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [totalSlides, setTotalSlides] = useState<number>(3);
  const [slideTitles, setSlideTitles] = useState<string[]>([
    'People & Foundations',
    'Process & Telemetry Flow',
    'Technology & Interactive Triage',
  ]);
  const [canAdvance, setCanAdvance] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    const handleModeChange = (e: any) => {
      if (e.detail?.mode === 'focused' || e.detail?.mode === 'split') {
        setLayoutMode(e.detail.mode);
      }
    };

    const handleSlideChanged = (e: any) => {
      if (typeof e.detail?.activeSlide === 'number') {
        setActiveSlide(e.detail.activeSlide);
      }
      if (typeof e.detail?.totalSlides === 'number') {
        setTotalSlides(e.detail.totalSlides);
      }
      if (Array.isArray(e.detail?.titles) && e.detail.titles.length > 0) {
        setSlideTitles(e.detail.titles);
      }
    };

    const handleLockStatus = (e: any) => {
      if (typeof e.detail?.canAdvance === 'boolean') {
        setCanAdvance(e.detail.canAdvance);
      }
    };

    window.addEventListener('soc:view-layout-changed', handleModeChange);
    window.addEventListener('soc:slide-changed', handleSlideChanged);
    window.addEventListener('soc:chapter-lock-status', handleLockStatus);

    return () => {
      window.removeEventListener('soc:view-layout-changed', handleModeChange);
      window.removeEventListener('soc:slide-changed', handleSlideChanged);
      window.removeEventListener('soc:chapter-lock-status', handleLockStatus);
    };
  }, []);

  const toggleLayoutMode = () => {
    sound.playClick();
    const next = layoutMode === 'focused' ? 'split' : 'focused';
    setLayoutMode(next);
    window.dispatchEvent(new CustomEvent('soc:set-view-layout', { detail: { mode: next } }));
  };

  const scrollToGraphic = () => {
    sound.playClick();
    const el =
      document.getElementById(`pillar-graphic-${activeSlide}`) ||
      document.querySelector('[id^="pillar-graphic-"]') ||
      document.getElementById('section-interactive') ||
      document.querySelector('.visual-canvas-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const scrollToQuiz = () => {
    sound.playClick();
    window.dispatchEvent(new CustomEvent('soc:open-kc'));
    setTimeout(() => {
      const el = document.getElementById('section-kc') || document.querySelector('.knowledge-check-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const openTopology = () => {
    sound.playClick();
    window.dispatchEvent(new CustomEvent('soc:open-branch-modal'));
  };

  const openDevAdmin = () => {
    sound.playClick();
    window.dispatchEvent(new CustomEvent('soc:open-dev-admin'));
  };

  const triggerFinishChapter = () => {
    sound.playClick();
    window.dispatchEvent(new CustomEvent('soc:finish-chapter'));
  };

  const handleSelectSlide = (idx: number) => {
    sound.playClick();
    setActiveSlide(idx);
    window.dispatchEvent(new CustomEvent('soc:set-slide', { detail: { index: idx } }));
  };

  const handlePrevSlide = () => {
    if (activeSlide > 0) {
      sound.playClick();
      const prev = activeSlide - 1;
      setActiveSlide(prev);
      window.dispatchEvent(new CustomEvent('soc:set-slide', { detail: { index: prev } }));
    }
  };

  const handleNextSlide = () => {
    if (activeSlide < totalSlides - 1) {
      sound.playClick();
      const next = activeSlide + 1;
      setActiveSlide(next);
      window.dispatchEvent(new CustomEvent('soc:set-slide', { detail: { index: next } }));
    }
  };

  useEffect(() => {
    if (controlledActiveId) {
      setActiveSection(controlledActiveId);
    }
  }, [controlledActiveId]);

  // Robust scroll spy for sections
  useEffect(() => {
    if (controlledActiveId) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      const scrollH = document.documentElement.scrollHeight;

      if (scrollY + windowH >= scrollH - 60) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      if (scrollY <= 80) {
        setActiveSection(sections[0].id);
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowH * 0.45 && rect.bottom >= 80) {
            setActiveSection(sections[i].id);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, controlledActiveId]);

  const scrollTo = (id: string) => {
    sound.playClick();
    setActiveSection(id);
    if (onSelect) {
      onSelect(id);
    }
    if (id === 'section-kc') {
      window.dispatchEvent(new CustomEvent('soc:open-kc'));
    }
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -90;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      } else {
        const idx = sections.findIndex((s) => s.id === id);
        if (idx !== -1) {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const targetY = (idx / (sections.length - 1)) * Math.max(0, totalHeight);
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      }
    }, 40);
  };

  const currentIndex = sections.findIndex((s) => s.id === activeSection);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;

  const handlePrevSection = () => {
    if (safeIndex > 0) {
      scrollTo(sections[safeIndex - 1].id);
    }
  };

  const handleNextSection = () => {
    if (safeIndex < sections.length - 1) {
      scrollTo(sections[safeIndex + 1].id);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <aside
      aria-label="Floating Topic Section Navigation"
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center select-none pointer-events-none"
    >
      <div className="pointer-events-auto glass-card glass-glossy p-1.5 sm:p-2 rounded-full border border-black/10 dark:border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-3xl bg-white/95 dark:bg-slate-900/95 flex flex-col items-center gap-1.5 transition-all duration-300">
        {/* Layout Mode Toggle: Focused (Prioritized) vs Split */}
        <button
          onClick={toggleLayoutMode}
          aria-label={layoutMode === 'focused' ? 'Switch to Split View' : 'Switch to Focused Mode'}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            layoutMode === 'focused'
              ? 'bg-sky-500/20 text-sky-600 dark:text-sky-400 ring-1 ring-sky-400/50 hover:bg-sky-500/30'
              : 'bg-muted/80 text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
          title={
            layoutMode === 'focused'
              ? 'Focused View Active (Prioritized) • Click for Split'
              : 'Split View Active • Click for Focused'
          }
        >
          {layoutMode === 'focused' ? (
            <Maximize2 className="w-3.5 h-3.5" />
          ) : (
            <Columns className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Quick Utility 1: Visual Animation Graphic Jump */}
        <button
          onClick={scrollToGraphic}
          aria-label="Jump directly to Visual Graphic Animation"
          className="w-7 h-7 rounded-full flex items-center justify-center text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-all cursor-pointer"
          title="Jump directly to Visual Story Animation"
        >
          <Film className="w-3.5 h-3.5" />
        </button>

        {/* Quick Utility 2: Knowledge Check Jump */}
        <button
          onClick={scrollToQuiz}
          aria-label="Jump directly to Knowledge Check"
          className="w-7 h-7 rounded-full flex items-center justify-center text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all cursor-pointer"
          title="Jump directly to Knowledge Check Quiz"
        >
          <HelpCircle className="w-3.5 h-3.5" />
        </button>

        {/* Quick Utility 3: CDAC Campus Floor Plan & Topology */}
        <button
          onClick={openTopology}
          aria-label="Open CDAC Campus Floor Plan & Simple Topology"
          className="w-7 h-7 rounded-full flex items-center justify-center text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all cursor-pointer"
          title="CDAC Campus Floor Plan & Topology (Floors G, 1, 2)"
        >
          <Building2 className="w-3.5 h-3.5" />
        </button>

        {/* Quick Utility 4: Dev Admin Panel */}
        <button
          onClick={openDevAdmin}
          aria-label="Open Development Admin Panel"
          className="w-7 h-7 rounded-full flex items-center justify-center text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-all cursor-pointer"
          title="Open Dev Admin Panel (Visuals, Unlock, XP)"
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>

        <div className="w-4 h-px bg-border/80 my-0.5" />

        {/* ===================================================================
            FOCUSED VIEW MODE CONTROLS (PRIORITIZED: Slide 1, 2, 3 Stepper)
        =================================================================== */}
        {layoutMode === 'focused' ? (
          <>
            {/* Previous Slide Chevron */}
            <button
              onClick={handlePrevSlide}
              disabled={activeSlide <= 0}
              aria-label="Previous Slide"
              className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
              title={activeSlide > 0 ? `Previous Slide (${slideTitles[activeSlide - 1] || `Slide ${activeSlide}`})` : 'At First Slide'}
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>

            {/* Slide nodes list */}
            <div className="flex flex-col items-center gap-2 py-1 relative">
              <div className="absolute top-2 bottom-2 w-0.5 bg-border/60 dark:bg-slate-700/60 rounded-full pointer-events-none -z-10" />

              {Array.from({ length: totalSlides }).map((_, idx) => {
                const isActive = activeSlide === idx;
                const isHovered = hoveredItem === `slide-${idx}`;
                const label = slideTitles[idx] || `Slide ${idx + 1}`;

                return (
                  <div
                    key={idx}
                    className="relative flex items-center justify-center"
                    onMouseEnter={() => setHoveredItem(`slide-${idx}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <button
                      onClick={() => handleSelectSlide(idx)}
                      aria-label={`Go to ${label}`}
                      className={`relative flex items-center justify-center transition-all duration-300 cursor-pointer rounded-full ${
                        isActive
                          ? 'w-8 h-8 bg-sky-500 text-slate-950 font-extrabold shadow-md shadow-sky-500/30 ring-2 ring-sky-400/50 scale-105'
                          : 'w-6 h-6 bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/80'
                      }`}
                    >
                      <span className="text-[10px] font-bold font-mono">{idx + 1}</span>
                      {isActive && (
                        <span className="absolute -inset-1 rounded-full border border-sky-400/50 animate-ping pointer-events-none opacity-40" />
                      )}
                    </button>

                    {/* Tooltip on Left */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, x: 8, filter: 'blur(4px)' }}
                          animate={{ opacity: 1, x: -10, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, x: 8, filter: 'blur(4px)' }}
                          transition={{ duration: 0.16, ease: 'easeOut' }}
                          className="absolute right-full mr-2 pointer-events-none whitespace-nowrap z-50"
                        >
                          <div className="glass-pill glass-glossy px-3 py-1.5 rounded-xl shadow-xl border border-black/10 dark:border-white/15 text-xs font-semibold text-foreground backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                            <span className="font-mono text-[10px] text-sky-500">Slide {idx + 1}:</span>
                            <span>{label}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Next Slide Chevron */}
            <button
              onClick={handleNextSlide}
              disabled={activeSlide >= totalSlides - 1}
              aria-label="Next Slide"
              className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
              title={activeSlide < totalSlides - 1 ? `Next Slide (${slideTitles[activeSlide + 1] || `Slide ${activeSlide + 2}`})` : 'At Last Slide'}
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {/* End of Chapter Action Button (Shown on last slide) */}
            {activeSlide === totalSlides - 1 && (
              <>
                <div className="w-4 h-px bg-border/80 my-0.5" />
                <button
                  onClick={triggerFinishChapter}
                  aria-label="Complete Chapter & Advance"
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    canAdvance
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-400/50 hover:bg-emerald-500/30 animate-pulse'
                      : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 hover:bg-amber-500/30'
                  }`}
                  title={canAdvance ? 'Finish Chapter & Earn XP' : 'Chapter Locked (Click to view requirements)'}
                >
                  {canAdvance ? <Award className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                </button>
              </>
            )}
          </>
        ) : (
          /* ===================================================================
              SPLIT VIEW MODE CONTROLS (Section 1, 2, 3 Anchors)
          =================================================================== */
          <>
            {/* Previous Section Chevron */}
            <button
              onClick={handlePrevSection}
              disabled={safeIndex <= 0}
              aria-label="Previous section"
              className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
              title={safeIndex > 0 ? `Previous: ${sections[safeIndex - 1].label}` : 'At first section'}
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>

            {/* Section nodes line */}
            <div className="flex flex-col items-center gap-2 py-1 relative">
              <div className="absolute top-2 bottom-2 w-0.5 bg-border/60 dark:bg-slate-700/60 rounded-full pointer-events-none -z-10" />

              {sections.map((section, idx) => {
                const isActive = activeSection === section.id;
                const isHovered = hoveredItem === section.id;

                return (
                  <div
                    key={section.id}
                    className="relative flex items-center justify-center"
                    onMouseEnter={() => setHoveredItem(section.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <button
                      onClick={() => scrollTo(section.id)}
                      aria-label={section.label}
                      className={`relative flex items-center justify-center transition-all duration-300 cursor-pointer rounded-full ${
                        isActive
                          ? 'w-8 h-8 bg-primary text-primary-foreground shadow-md shadow-primary/30 ring-2 ring-primary/40 scale-105'
                          : 'w-6 h-6 bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/80'
                      }`}
                    >
                      {section.icon ? (
                        <span className={isActive ? 'text-primary-foreground' : 'text-muted-foreground'}>
                          {section.icon}
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold font-mono">{idx + 1}</span>
                      )}

                      {isActive && (
                        <span className="absolute -inset-1 rounded-full border border-primary/40 animate-ping pointer-events-none opacity-40" />
                      )}
                    </button>

                    {/* Tooltip on Left */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, x: 8, filter: 'blur(4px)' }}
                          animate={{ opacity: 1, x: -10, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, x: 8, filter: 'blur(4px)' }}
                          transition={{ duration: 0.16, ease: 'easeOut' }}
                          className="absolute right-full mr-2 pointer-events-none whitespace-nowrap z-50"
                        >
                          <div className="glass-pill glass-glossy px-3 py-1.5 rounded-xl shadow-xl border border-black/10 dark:border-white/15 text-xs font-semibold text-foreground backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span className="font-mono text-[10px] text-primary">{idx + 1}.</span>
                            <span>{section.label}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Next Section Chevron */}
            <button
              onClick={handleNextSection}
              disabled={safeIndex >= sections.length - 1}
              aria-label="Next section"
              className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
              title={safeIndex < sections.length - 1 ? `Next: ${sections[safeIndex + 1].label}` : 'At last section'}
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>

      {/* Floating Section Step & Mode Pill Indicator */}
      <div className="pointer-events-auto mt-2 text-[10px] font-mono font-bold text-foreground bg-white/95 dark:bg-slate-900/95 px-2.5 py-0.5 rounded-full border border-black/10 dark:border-white/15 shadow-sm backdrop-blur-md flex items-center gap-1">
        <span className={layoutMode === 'focused' ? 'text-sky-500 font-extrabold' : 'text-muted-foreground'}>
          {layoutMode === 'focused' ? 'FOCUSED' : 'SPLIT'}
        </span>
        <span className="text-muted-foreground/60">&bull;</span>
        <span>
          {layoutMode === 'focused'
            ? `SLIDE ${activeSlide + 1}/${totalSlides}`
            : `${safeIndex + 1}/${sections.length}`}
        </span>
      </div>
    </aside>,
    document.body
  );
}
