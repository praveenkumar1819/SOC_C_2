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
  ArrowDownAZ,
  ArrowUpZA,
  Layers,
  ChevronsUpDown,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlossaryStore } from '@/store/glossary-store';
import { SOC_GLOSSARY_TERMS, type GlossaryTerm } from '@/data/soc-glossary-terms';

export type { GlossaryTerm };
export const GLOSSARY_TERMS = SOC_GLOSSARY_TERMS;

type SortOption = 'az' | 'za' | 'category';

const CATEGORY_COLORS: Record<string, string> = {
  'SIEM & Detection': 'bg-sky-50 text-sky-800 border-sky-300 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800',
  Endpoints: 'bg-purple-50 text-purple-800 border-purple-300 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
  Network: 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
  'IR & Triage': 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
  'Core Concepts': 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
};

export function FloatingGlossary() {
  const { isOpen, highlightedTerm, currentTopicTerms, openGlossary, closeGlossary } = useGlossaryStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('az');
  const [selectedLetter, setSelectedLetter] = useState<string>('All');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [expandAll, setExpandAll] = useState<boolean>(false);
  const termItemRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  // Context-aware prioritization (Current Topic Terms)
  const currentTopicTermObjects = useMemo(() => {
    return SOC_GLOSSARY_TERMS.filter((item) =>
      currentTopicTerms.some(
        (ct) => ct.toLowerCase() === item.term.toLowerCase() || ct.toLowerCase() === item.fullForm.toLowerCase()
      )
    );
  }, [currentTopicTerms]);

  // Filter terms by category, search query, and alphabet letter
  const filteredTerms = useMemo(() => {
    return SOC_GLOSSARY_TERMS.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        item.term.toLowerCase().includes(q) ||
        item.fullForm.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        (item.simpleAnalogy && item.simpleAnalogy.toLowerCase().includes(q)) ||
        item.socContext.toLowerCase().includes(q);

      const firstChar = item.term.charAt(0).toUpperCase();
      const isNum = /\d/.test(firstChar);
      const matchesLetter =
        selectedLetter === 'All' ||
        (selectedLetter === '#' ? isNum : firstChar === selectedLetter);

      return matchesCategory && matchesSearch && matchesLetter;
    });
  }, [selectedCategory, searchQuery, selectedLetter]);

  // Available first letters for alphabet quick-jump
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    for (const t of SOC_GLOSSARY_TERMS) {
      const ch = t.term.charAt(0).toUpperCase();
      if (/\d/.test(ch)) {
        letters.add('#');
      } else {
        letters.add(ch);
      }
    }
    return ['All', ...Array.from(letters).sort((a, b) => (a === '#' ? -1 : b === '#' ? 1 : a.localeCompare(b)))];
  }, []);

  // Sort filtered terms according to selected sorting option
  const sortedTerms = useMemo(() => {
    return [...filteredTerms].sort((a, b) => {
      if (sortBy === 'az') {
        return a.term.localeCompare(b.term, undefined, { sensitivity: 'base' });
      }
      if (sortBy === 'za') {
        return b.term.localeCompare(a.term, undefined, { sensitivity: 'base' });
      }
      if (sortBy === 'category') {
        const catCompare = a.category.localeCompare(b.category);
        if (catCompare !== 0) return catCompare;
        return a.term.localeCompare(b.term, undefined, { sensitivity: 'base' });
      }
      return 0;
    });
  }, [filteredTerms, sortBy]);

  // Group terms by category when sortBy === 'category'
  const groupedTermsByCategory = useMemo(() => {
    if (sortBy !== 'category') return null;
    const groups: Record<string, GlossaryTerm[]> = {};
    for (const t of sortedTerms) {
      if (!groups[t.category]) groups[t.category] = [];
      groups[t.category].push(t);
    }
    return groups;
  }, [sortedTerms, sortBy]);

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
                <span className="text-[10px] font-mono bg-white/20 dark:bg-black/20 px-1.5 py-0.5 rounded-full">
                  {SOC_GLOSSARY_TERMS.length}
                </span>
                {currentTopicTermObjects.length > 0 && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" title="Active topic terms available" />
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
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[490px] max-h-[88vh] flex flex-col shadow-2xl rounded-2xl border bg-background overflow-hidden"
          >
            {/* Header */}
            <div className="p-3.5 sm:p-4 bg-muted/40 border-b flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <BookMarked className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                    Security Operations Glossary
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    {SOC_GLOSSARY_TERMS.length} terms &bull; Simple everyday analogies for non-CS students
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
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

            {/* Search Bar */}
            <div className="p-3 border-b bg-background space-y-2.5">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value) setSelectedLetter('All');
                  }}
                  placeholder="Search terms or analogies (e.g. Event, Process, Firewall, Phishing)..."
                  className="pl-8 pr-7 h-8 text-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedLetter('All');
                      }}
                      className={`px-2 py-0.5 rounded-full whitespace-nowrap border text-[11px] transition-all cursor-pointer flex items-center gap-1 ${
                        selectedCategory === cat
                          ? 'bg-primary text-primary-foreground border-primary font-bold shadow-xs'
                          : 'bg-muted/40 text-muted-foreground hover:bg-muted border-border'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[10px] px-1 rounded-full ${
                        selectedCategory === cat ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted-foreground/15 text-muted-foreground'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Sort & Controls Bar */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-border/40 text-[11px]">
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground font-semibold flex items-center gap-1 text-[10px] uppercase tracking-wider">
                    <Filter className="w-3 h-3" />
                    Sort:
                  </span>
                  <div className="inline-flex rounded-md border p-0.5 bg-muted/30">
                    <button
                      onClick={() => setSortBy('az')}
                      title="Sort A to Z (Alphabetical)"
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5 transition-all cursor-pointer ${
                        sortBy === 'az'
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <ArrowDownAZ className="w-3 h-3" />
                      <span>A→Z</span>
                    </button>
                    <button
                      onClick={() => setSortBy('za')}
                      title="Sort Z to A (Reverse)"
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5 transition-all cursor-pointer ${
                        sortBy === 'za'
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <ArrowUpZA className="w-3 h-3" />
                      <span>Z→A</span>
                    </button>
                    <button
                      onClick={() => setSortBy('category')}
                      title="Group by Operational Category"
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5 transition-all cursor-pointer ${
                        sortBy === 'category'
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Layers className="w-3 h-3" />
                      <span>Category</span>
                    </button>
                  </div>
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

              {/* Alphabet Quick-Jump Ribbon (when in A-Z mode) */}
              {sortBy === 'az' && searchQuery.trim() === '' && (
                <div className="flex items-center gap-0.5 overflow-x-auto py-0.5 border-t border-border/30 scrollbar-none">
                  {availableLetters.map((letter) => (
                    <button
                      key={letter}
                      onClick={() => setSelectedLetter(letter)}
                      className={`w-5 h-5 rounded text-[10px] font-mono font-bold shrink-0 transition-all cursor-pointer ${
                        selectedLetter === letter
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Term List Body */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {/* Context-aware Section: Relevant to Current Lesson */}
              {searchQuery.trim() === '' &&
                selectedCategory === 'All' &&
                selectedLetter === 'All' &&
                currentTopicTermObjects.length > 0 && (
                  <div className="space-y-2 pb-3 border-b">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Relevant to Active Lesson</span>
                      <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20 py-0 font-mono">
                        {currentTopicTermObjects.length} active
                      </Badge>
                    </div>
                    <div className="space-y-1.5">
                      {currentTopicTermObjects.map((item) => (
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

              {/* Grouped by Category View */}
              {sortBy === 'category' && groupedTermsByCategory ? (
                <div className="space-y-4">
                  {Object.entries(groupedTermsByCategory).map(([cat, terms]) => (
                    <div key={cat} className="space-y-1.5">
                      <div className="flex items-center justify-between pb-1 border-b border-border/40">
                        <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                          <Layers className="w-3 h-3 text-primary" />
                          {cat}
                        </span>
                        <Badge variant="outline" className="text-[10px] py-0 font-mono">
                          {terms.length}
                        </Badge>
                      </div>
                      <div className="space-y-1.5">
                        {terms.map((item) => (
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
                  ))}
                </div>
              ) : (
                /* Flat Term List (A-Z or Z-A) */
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    <span>
                      {selectedLetter !== 'All' ? `Terms Starting With '${selectedLetter}'` : 'All Security Terms'} ({sortedTerms.length})
                    </span>
                    {selectedLetter !== 'All' && (
                      <button
                        onClick={() => setSelectedLetter('All')}
                        className="text-primary hover:underline text-[10px] capitalize font-normal cursor-pointer"
                      >
                        Reset letter filter
                      </button>
                    )}
                  </div>

                  {sortedTerms.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground text-xs space-y-2">
                      <p>No terms matching &quot;{searchQuery}&quot;</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('All');
                          setSelectedLetter('All');
                        }}
                        className="text-xs"
                      >
                        Reset Filters
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {sortedTerms.map((item) => (
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
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-2.5 bg-muted/20 border-t flex items-center justify-between text-[11px] text-muted-foreground font-sans">
              <span>
                Showing <strong>{sortedTerms.length}</strong> of <strong>{SOC_GLOSSARY_TERMS.length}</strong> terms
              </span>
              <span className="italic text-[10px]">Click any inline term in lessons to open</span>
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
