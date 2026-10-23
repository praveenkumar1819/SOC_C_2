'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import {
  BookMarked,
  X,
  Search,
  ExternalLink,
  ChevronDown,
  Minimize2,
  Sparkles,
  BookOpen,
  ChevronsUpDown,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlossaryStore } from '@/store/glossary-store';
import { SOC_GLOSSARY_TERMS, type GlossaryTerm } from '@/data/soc-glossary-terms';

export type { GlossaryTerm };
export const GLOSSARY_TERMS = SOC_GLOSSARY_TERMS;

const CATEGORY_COLORS: Record<string, string> = {
  'SIEM & Detection': 'bg-sky-50 text-sky-800 border-sky-300 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800',
  Endpoints: 'bg-purple-50 text-purple-800 border-purple-300 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
  Network: 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
  'IR & Triage': 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
  'Core Concepts': 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
};

export function FloatingGlossary() {
  const { isOpen, highlightedTerm, currentTopicTerms, openGlossary, closeGlossary } = useGlossaryStore();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [expandAll, setExpandAll] = useState<boolean>(false);
  const termItemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Window position state with persistent coordinates
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initX: number; initY: number } | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Window dimensions state with persistence across reloads
  const [windowDimensions, setWindowDimensions] = useState<{ width: number; height: number }>({
    width: 520,
    height: 640,
  });
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef<{
    startX: number;
    startY: number;
    startW: number;
    startH: number;
    initX?: number;
    initY?: number;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('soc_glossary_window_size');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.width && parsed.height) {
          const validW = Math.min(Math.max(parsed.width, 360), window.innerWidth - 32);
          const validH = Math.min(Math.max(parsed.height, 400), window.innerHeight - 40);
          setWindowDimensions({ width: validW, height: validH });
        }
      }
      const savedPos = localStorage.getItem('soc_glossary_window_pos');
      if (savedPos) {
        const parsedPos = JSON.parse(savedPos);
        if (typeof parsedPos.x === 'number' && typeof parsedPos.y === 'number') {
          const clampedX = Math.min(Math.max(12, parsedPos.x), Math.max(12, window.innerWidth - 360));
          const clampedY = Math.min(Math.max(12, parsedPos.y), Math.max(12, window.innerHeight - 150));
          setPosition({ x: clampedX, y: clampedY });
        }
      }
    } catch (_) {}
  }, []);

  // Header drag movement handler
  const handleDragStart = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('a') || target.closest('[data-no-drag]')) {
      return;
    }

    e.preventDefault();
    setIsDragging(true);

    const currentRect = panelRef.current?.getBoundingClientRect();
    const currentX = currentRect ? currentRect.left : (position?.x ?? Math.max(12, window.innerWidth - windowDimensions.width - 24));
    const currentY = currentRect ? currentRect.top : (position?.y ?? Math.max(12, window.innerHeight - windowDimensions.height - 24));

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: currentX,
      initY: currentY,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!dragRef.current) return;
      const deltaX = moveEvent.clientX - dragRef.current.startX;
      const deltaY = moveEvent.clientY - dragRef.current.startY;

      const maxX = Math.max(12, window.innerWidth - windowDimensions.width - 12);
      const maxY = Math.max(12, window.innerHeight - 100);

      const nextX = Math.min(Math.max(12, dragRef.current.initX + deltaX), maxX);
      const nextY = Math.min(Math.max(12, dragRef.current.initY + deltaY), maxY);

      setPosition({ x: nextX, y: nextY });
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      if (dragRef.current) {
        const deltaX = upEvent.clientX - dragRef.current.startX;
        const deltaY = upEvent.clientY - dragRef.current.startY;
        const maxX = Math.max(12, window.innerWidth - windowDimensions.width - 12);
        const maxY = Math.max(12, window.innerHeight - 100);

        const finalX = Math.min(Math.max(12, dragRef.current.initX + deltaX), maxX);
        const finalY = Math.min(Math.max(12, dragRef.current.initY + deltaY), maxY);

        const finalPos = { x: finalX, y: finalY };
        setPosition(finalPos);
        try {
          localStorage.setItem('soc_glossary_window_pos', JSON.stringify(finalPos));
        } catch (_) {}
      }
      dragRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleResetPosition = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPosition(null);
    try {
      localStorage.removeItem('soc_glossary_window_pos');
    } catch (_) {}
  };

  // Bottom-right corner resize handler
  const handleBottomRightResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startW: windowDimensions.width,
      startH: windowDimensions.height,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!resizeRef.current) return;
      const deltaX = moveEvent.clientX - resizeRef.current.startX;
      const deltaY = moveEvent.clientY - resizeRef.current.startY;
      const newW = Math.min(Math.max(resizeRef.current.startW + deltaX, 360), window.innerWidth - 32);
      const newH = Math.min(Math.max(resizeRef.current.startH + deltaY, 400), window.innerHeight - 40);
      setWindowDimensions({ width: newW, height: newH });
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      setIsResizing(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (resizeRef.current) {
        const deltaX = upEvent.clientX - resizeRef.current.startX;
        const deltaY = upEvent.clientY - resizeRef.current.startY;
        const finalW = Math.min(Math.max(resizeRef.current.startW + deltaX, 360), window.innerWidth - 32);
        const finalH = Math.min(Math.max(resizeRef.current.startH + deltaY, 400), window.innerHeight - 40);
        try {
          localStorage.setItem('soc_glossary_window_size', JSON.stringify({ width: finalW, height: finalH }));
        } catch (_) {}
      }
      resizeRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Top-left corner resize handler
  const handleTopLeftResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    const rect = panelRef.current?.getBoundingClientRect();
    const initX = rect ? rect.left : (position?.x ?? (window.innerWidth - windowDimensions.width - 24));
    const initY = rect ? rect.top : (position?.y ?? (window.innerHeight - windowDimensions.height - 24));

    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startW: windowDimensions.width,
      startH: windowDimensions.height,
      initX,
      initY,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!resizeRef.current) return;
      const deltaX = resizeRef.current.startX - moveEvent.clientX;
      const deltaY = resizeRef.current.startY - moveEvent.clientY;
      const newW = Math.min(Math.max(resizeRef.current.startW + deltaX, 360), window.innerWidth - 32);
      const newH = Math.min(Math.max(resizeRef.current.startH + deltaY, 400), window.innerHeight - 40);
      setWindowDimensions({ width: newW, height: newH });

      if (position && resizeRef.current.initX !== undefined && resizeRef.current.initY !== undefined) {
        const nextX = Math.max(12, resizeRef.current.initX - (newW - resizeRef.current.startW));
        const nextY = Math.max(12, resizeRef.current.initY - (newH - resizeRef.current.startH));
        setPosition({ x: nextX, y: nextY });
      }
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      setIsResizing(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (resizeRef.current) {
        const deltaX = resizeRef.current.startX - upEvent.clientX;
        const deltaY = resizeRef.current.startY - upEvent.clientY;
        const finalW = Math.min(Math.max(resizeRef.current.startW + deltaX, 360), window.innerWidth - 32);
        const finalH = Math.min(Math.max(resizeRef.current.startH + deltaY, 400), window.innerHeight - 40);
        try {
          localStorage.setItem('soc_glossary_window_size', JSON.stringify({ width: finalW, height: finalH }));
          if (position && resizeRef.current.initX !== undefined && resizeRef.current.initY !== undefined) {
            const nextX = Math.max(12, resizeRef.current.initX - (finalW - resizeRef.current.startW));
            const nextY = Math.max(12, resizeRef.current.initY - (finalH - resizeRef.current.startH));
            localStorage.setItem('soc_glossary_window_pos', JSON.stringify({ x: nextX, y: nextY }));
          }
        } catch (_) {}
      }
      resizeRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const categories = ['All', 'SIEM & Detection', 'Endpoints', 'Network', 'IR & Triage', 'Core Concepts'];

  // Handle highlighted term trigger from inline link
  useEffect(() => {
    if (highlightedTerm) {
      // Find matching item in SOC_GLOSSARY_TERMS (exact, prefix, or stripped parentheses)
      const target = SOC_GLOSSARY_TERMS.find(
        (t) =>
          t.term.toLowerCase() === highlightedTerm.toLowerCase() ||
          t.term.toLowerCase().startsWith(highlightedTerm.toLowerCase()) ||
          t.term.toLowerCase().replace(/\s*\([^)]*\)/g, '').trim() === highlightedTerm.toLowerCase() ||
          t.fullForm.toLowerCase().includes(highlightedTerm.toLowerCase())
      );
      const key = target ? target.term : highlightedTerm;
      setExpandedTerm(key);
      setTimeout(() => {
        const el = termItemRefs.current[key.toLowerCase()];
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  }, [highlightedTerm]);

  // Dynamic term counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: SOC_GLOSSARY_TERMS.length };
    for (const term of SOC_GLOSSARY_TERMS) {
      counts[term.category] = (counts[term.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Filter terms by category and search query
  const filteredTerms = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return SOC_GLOSSARY_TERMS.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        q === '' ||
        item.term.toLowerCase().includes(q) ||
        item.fullForm.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        (item.simpleAnalogy && item.simpleAnalogy.toLowerCase().includes(q)) ||
        item.socContext.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Split into:
  // 1. Chapter-relevant terms (AT FIRST)
  // 2. All other terms
  const { chapterTerms, otherTerms } = useMemo(() => {
    const activeTermsLower = new Set(
      currentTopicTerms.map((t) => t.toLowerCase().trim())
    );

    const isChapterRelative = (item: GlossaryTerm) => {
      if (activeTermsLower.size === 0) return false;
      const termLower = item.term.toLowerCase().trim();
      const baseLower = termLower.replace(/\s*\([^)]*\)/g, '').trim();
      const fullLower = item.fullForm.toLowerCase().trim();

      if (
        activeTermsLower.has(termLower) ||
        activeTermsLower.has(baseLower) ||
        activeTermsLower.has(fullLower)
      ) {
        return true;
      }

      for (const at of Array.from(activeTermsLower)) {
        if (
          at.length > 2 &&
          (termLower.includes(at) || at.includes(termLower) || fullLower.includes(at))
        ) {
          return true;
        }
      }
      return false;
    };

    const chapterList: GlossaryTerm[] = [];
    const othersList: GlossaryTerm[] = [];

    for (const item of filteredTerms) {
      if (isChapterRelative(item)) {
        chapterList.push(item);
      } else {
        othersList.push(item);
      }
    }

    // Alphabetical within each bucket for clean readability
    chapterList.sort((a, b) => a.term.localeCompare(b.term, undefined, { sensitivity: 'base' }));
    othersList.sort((a, b) => a.term.localeCompare(b.term, undefined, { sensitivity: 'base' }));

    return { chapterTerms: chapterList, otherTerms: othersList };
  }, [filteredTerms, currentTopicTerms]);

  if (!mounted) return null;

  return (
    <>
      {/* Floating Toggle Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <Button
                onClick={() => openGlossary()}
                className="shadow-xl rounded-full h-12 px-4 gap-2 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary/20 transition-all hover:scale-105 cursor-pointer"
                aria-label="Open Security Operations Glossary"
              >
                <BookMarked className="w-5 h-5" />
                <span className="hidden sm:inline font-bold">SOC Glossary</span>
                <span className="text-[10px] font-mono bg-white/20 dark:bg-black/20 px-1.5 py-0.5 rounded-full font-bold">
                  {SOC_GLOSSARY_TERMS.length}
                </span>
                {chapterTerms.length > 0 && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" title="Active chapter words available" />
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Panel Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              width: `${windowDimensions.width}px`,
              height: `${windowDimensions.height}px`,
              maxWidth: 'calc(100vw - 24px)',
              maxHeight: 'calc(100vh - 32px)',
              ...(position
                ? {
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    right: 'auto',
                    bottom: 'auto',
                  }
                : {
                    right: '16px',
                    bottom: '16px',
                  }),
            }}
            className="fixed z-[55] flex flex-col shadow-2xl rounded-2xl border bg-background overflow-hidden select-auto"
          >
            {/* Resizing Handle (Top-Left corner drag handle) */}
            <div
              onMouseDown={handleTopLeftResizeStart}
              title="Drag corner to resize glossary window"
              className="absolute top-0 left-0 w-5 h-5 cursor-nwse-resize z-50 group flex items-center justify-center p-0.5"
              data-no-drag
            >
              <div className="w-2.5 h-2.5 border-t-2 border-l-2 border-muted-foreground/50 group-hover:border-primary transition-colors rounded-tl-sm" />
            </div>

            {/* Header (Draggable) */}
            <div
              onMouseDown={handleDragStart}
              className={`p-3.5 sm:p-4 bg-muted/50 border-b flex items-center justify-between pl-6 pr-3 select-none transition-colors hover:bg-muted/70 ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              title="Click and drag to position glossary window anywhere on screen"
            >
              <div className="flex items-center gap-2.5 min-w-0 pointer-events-none">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <BookMarked className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5 truncate">
                    Security Operations Glossary
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  </h3>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {SOC_GLOSSARY_TERMS.length} terms &bull; Drag header to move &bull; Resizable
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-2" data-no-drag>
                {position && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-foreground cursor-pointer"
                    onClick={handleResetPosition}
                    title="Reset position to default bottom-right"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-foreground cursor-pointer"
                  onClick={closeGlossary}
                  title="Minimize Glossary"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-foreground cursor-pointer"
                  onClick={closeGlossary}
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Search Bar & Categories */}
            <div className="p-3 border-b bg-background space-y-2.5">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search terms or analogies (e.g. Event, Process, Firewall, Phishing)..."
                  className="pl-8 pr-7 h-8 text-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] scrollbar-none">
                {categories.map((cat) => {
                  const count = categoryCounts[cat] || 0;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2 py-0.5 rounded-full whitespace-nowrap border text-[11px] transition-all cursor-pointer flex items-center gap-1 ${
                        selectedCategory === cat
                          ? 'bg-primary text-primary-foreground border-primary font-bold shadow-xs'
                          : 'bg-muted/40 text-muted-foreground hover:bg-muted border-border'
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`text-[10px] px-1 rounded-full ${
                          selectedCategory === cat
                            ? 'bg-primary-foreground/20 text-primary-foreground'
                            : 'bg-muted-foreground/15 text-muted-foreground'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Action Strip: Chapter Words Badge & Expand All */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-border/40 text-[11px]">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {chapterTerms.length > 0 && (
                    <Badge
                      variant="outline"
                      className="bg-sky-50 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-700/60 text-[10px] font-mono py-0.5 px-2 flex items-center gap-1"
                    >
                      <BookOpen className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                      <span>{chapterTerms.length} Chapter Words</span>
                    </Badge>
                  )}
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {chapterTerms.length + otherTerms.length} Terms Available
                  </span>
                </div>

                {/* Expand / Collapse All Toggle */}
                <button
                  onClick={() => setExpandAll((prev) => !prev)}
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  <ChevronsUpDown className="w-3 h-3" />
                  <span>{expandAll ? 'Collapse All' : 'Expand All'}</span>
                </button>
              </div>
            </div>

            {/* Term List Body: CHAPTER WORDS AT FIRST */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {/* 1. RELATIVE TO CHAPTER WORDS AT FIRST */}
              {chapterTerms.length > 0 && (
                <div className="space-y-2 pb-3 border-b border-border/60">
                  <div className="flex items-center justify-between text-xs font-bold text-sky-700 dark:text-sky-300">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Relevant to Active Chapter</span>
                      <Badge className="text-[10px] bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30 py-0 font-mono font-bold">
                        {chapterTerms.length} active
                      </Badge>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-normal">Prioritized at top</span>
                  </div>
                  <div className="space-y-1.5">
                    {chapterTerms.map((item) => (
                      <TermCard
                        key={`curr-${item.term}`}
                        item={item}
                        isExpanded={expandAll || expandedTerm?.toLowerCase() === item.term.toLowerCase()}
                        onToggle={() =>
                          setExpandedTerm(
                            expandedTerm?.toLowerCase() === item.term.toLowerCase() ? null : item.term
                          )
                        }
                        setRef={(el) => {
                          termItemRefs.current[item.term.toLowerCase()] = el;
                        }}
                        highlight={true}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* 2. ALL OTHER SECURITY TERMS */}
              {otherTerms.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    <span>All Security Terms ({otherTerms.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {otherTerms.map((item) => (
                      <TermCard
                        key={item.term}
                        item={item}
                        isExpanded={expandAll || expandedTerm?.toLowerCase() === item.term.toLowerCase()}
                        onToggle={() =>
                          setExpandedTerm(
                            expandedTerm?.toLowerCase() === item.term.toLowerCase() ? null : item.term
                          )
                        }
                        setRef={(el) => {
                          termItemRefs.current[item.term.toLowerCase()] = el;
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Empty Search Fallback */}
              {chapterTerms.length === 0 && otherTerms.length === 0 && (
                <div className="text-center py-10 text-muted-foreground text-xs space-y-2">
                  <p>No terms matching &quot;{searchQuery}&quot;</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="text-xs"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-2.5 bg-muted/20 border-t flex items-center justify-between text-[11px] text-muted-foreground font-sans">
              <span>
                Showing <strong>{chapterTerms.length + otherTerms.length}</strong> of <strong>{SOC_GLOSSARY_TERMS.length}</strong> terms
              </span>
              <span className="italic text-[10px]">Click any inline term in lessons to inspect</span>
            </div>

            {/* Bottom-Right Resizing Handle */}
            <div
              onMouseDown={handleBottomRightResizeStart}
              title="Drag corner to resize glossary window"
              className="absolute bottom-0 right-0 w-5 h-5 cursor-nwse-resize z-50 group flex items-end justify-end p-0.5"
              data-no-drag
            >
              <div className="w-2.5 h-2.5 border-b-2 border-r-2 border-muted-foreground/50 group-hover:border-primary transition-colors rounded-br-sm" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface TermCardProps {
  item: GlossaryTerm;
  isExpanded: boolean;
  onToggle: () => void;
  setRef?: (el: HTMLDivElement | null) => void;
  highlight?: boolean;
}

function TermCard({ item, isExpanded, onToggle, setRef, highlight }: TermCardProps) {
  const catColor = CATEGORY_COLORS[item.category] || 'bg-muted text-muted-foreground border-border';

  return (
    <div
      ref={setRef}
      className={`rounded-xl border transition-all ${
        isExpanded
          ? 'border-primary/40 bg-card shadow-xs ring-1 ring-primary/20'
          : highlight
          ? 'border-primary/30 bg-primary/5 hover:border-primary/60'
          : 'border-border/60 bg-card/60 hover:bg-muted/40 hover:border-border'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-2.5 rounded-xl transition-all flex items-start justify-between gap-2 cursor-pointer group"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">
              {item.term}
            </span>
            <Badge variant="outline" className={`text-[9px] py-0 px-1.5 font-normal border ${catColor}`}>
              {item.category}
            </Badge>
          </div>
          <p className="text-[11px] text-muted-foreground truncate mt-0.5">
            {item.fullForm}
          </p>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-muted-foreground transition-transform shrink-0 mt-0.5 ${
            isExpanded ? 'rotate-180 text-primary' : ''
          }`}
        />
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 pt-1 text-xs space-y-2.5 border-t border-border/40 animate-fade-in font-sans">
          {/* Simple Analogy for Non-CS Students */}
          {item.simpleAnalogy && (
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-950 dark:text-amber-200 text-xs space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300 text-[11px]">
                💡 Everyday Analogy (Non-CS Friendly)
              </span>
              <p className="leading-relaxed text-[11px] italic">
                &ldquo;{item.simpleAnalogy}&rdquo;
              </p>
            </div>
          )}

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block font-mono">
              Plain English Definition
            </span>
            <p className="text-foreground leading-relaxed mt-0.5 text-xs">{item.definition}</p>
          </div>

          <div className="p-2.5 rounded-lg bg-primary/5 border border-primary/15 text-[11px] space-y-1">
            <span className="font-bold text-primary block uppercase tracking-wider text-[10px] font-mono">
              What It Means in the SOC
            </span>
            <p className="text-foreground/90 leading-relaxed">{item.socContext}</p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[200px]">
              Ref: {item.referenceLabel}
            </span>
            <a
              href={item.referenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-semibold"
            >
              <span>Learn More</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
