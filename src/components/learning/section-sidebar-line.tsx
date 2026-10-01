'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronUp, ChevronDown, BookOpen, Film, Activity, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  { id: 'section-intro', label: '1. Intro & Briefing', shortLabel: 'Intro', icon: <BookOpen className="w-3.5 h-3.5" /> },
  { id: 'section-demo', label: '2. Video Visual Demo', shortLabel: 'Demo', icon: <Film className="w-3.5 h-3.5" /> },
  { id: 'section-interactive', label: '3. Interactive Simulator', shortLabel: 'Simulator', icon: <Activity className="w-3.5 h-3.5" /> },
  { id: 'section-kc', label: '4. Knowledge Check', shortLabel: 'Quiz', icon: <HelpCircle className="w-3.5 h-3.5" /> },
];

export function SectionSidebarLine({
  sections = DEFAULT_SECTIONS,
  activeId: controlledActiveId,
  onSelect,
}: SectionSidebarLineProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>(controlledActiveId || sections[0].id);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (controlledActiveId) {
      setActiveSection(controlledActiveId);
    }
  }, [controlledActiveId]);

  // Robust scroll listener calculating bounding rects relative to viewport
  useEffect(() => {
    if (controlledActiveId) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      const scrollH = document.documentElement.scrollHeight;

      // Bottom edge detection
      if (scrollY + windowH >= scrollH - 60) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      // Top edge detection
      if (scrollY <= 80) {
        setActiveSection(sections[0].id);
        return;
      }

      // Viewport collision detection
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
    setActiveSection(id);
    if (onSelect) {
      onSelect(id);
    }
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90; // account for sticky header
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    } else {
      // Proportional fallback if an ID is missing on non-standard pages
      const idx = sections.findIndex((s) => s.id === id);
      if (idx !== -1) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const targetY = (idx / (sections.length - 1)) * Math.max(0, totalHeight);
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }
  };

  const currentIndex = sections.findIndex((s) => s.id === activeSection);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;

  const handlePrev = () => {
    if (safeIndex > 0) {
      scrollTo(sections[safeIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (safeIndex < sections.length - 1) {
      scrollTo(sections[safeIndex + 1].id);
    }
  };

  if (!mounted) return null;

  // Portal to document.body so position:fixed is always relative to true viewport
  return createPortal(
    <aside
      aria-label="Floating Topic Section Navigation"
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center select-none pointer-events-none"
    >
      <div className="pointer-events-auto glass-card glass-glossy p-1.5 sm:p-2 rounded-full border border-black/10 dark:border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-3xl bg-white/85 dark:bg-slate-900/85 flex flex-col items-center gap-1.5 transition-all duration-300">
        {/* Previous Section Chevron */}
        <button
          onClick={handlePrev}
          disabled={safeIndex <= 0}
          aria-label="Previous section"
          className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
          title={safeIndex > 0 ? `Previous: ${sections[safeIndex - 1].label}` : 'At first section'}
        >
          <ChevronUp className="w-3.5 h-3.5" />
        </button>

        {/* Section nodes line */}
        <div className="flex flex-col items-center gap-2 py-1 relative">
          {/* Vertical spine track */}
          <div className="absolute top-2 bottom-2 w-0.5 bg-border/60 dark:bg-slate-700/60 rounded-full pointer-events-none -z-10" />

          {sections.map((section, idx) => {
            const isActive = activeSection === section.id;
            const isHovered = hoveredSection === section.id;

            return (
              <div
                key={section.id}
                className="relative flex items-center justify-center"
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
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

                {/* iPhone Dynamic Island Tooltip on Left (Hover Only) */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: 8, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, x: -10, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, x: 8, filter: 'blur(4px)' }}
                      transition={{ duration: 0.16, ease: 'easeOut' }}
                      className="absolute right-full mr-2 pointer-events-none whitespace-nowrap z-50"
                    >
                      <div className="glass-pill glass-glossy px-3 py-1.5 rounded-xl shadow-xl border border-black/10 dark:border-white/15 text-xs font-semibold text-foreground backdrop-blur-2xl bg-white/90 dark:bg-slate-900/90 flex items-center gap-1.5">
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
          onClick={handleNext}
          disabled={safeIndex >= sections.length - 1}
          aria-label="Next section"
          className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
          title={safeIndex < sections.length - 1 ? `Next: ${sections[safeIndex + 1].label}` : 'At last section'}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Floating Section Step Pill Indicator */}
      <div className="pointer-events-auto mt-2 text-[10px] font-mono font-bold text-foreground bg-white/90 dark:bg-slate-900/90 px-2 py-0.5 rounded-full border border-black/10 dark:border-white/15 shadow-sm backdrop-blur-md">
        {safeIndex + 1}/{sections.length}
      </div>
    </aside>,
    document.body
  );
}
