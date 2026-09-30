'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  X,
  Search,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Lock,
  Play,
  Layers,
  BookOpen,
  Target,
  ExternalLink,
  Sliders,
  Sparkles,
  Shield,
  Home,
  TrendingUp,
  FileCheck2,
  Unlock,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  CURRICULUM_TREE,
  CurriculumModule,
  CurriculumUnit,
  CurriculumTopic,
  getTopicStatus,
  getModuleStatus,
} from '@/data/curriculum-tree';
import { useProgressStore } from '@/store/progress-store';
import { useAdminConfigStore } from '@/store/admin-config-store';
import { useToast } from '@/components/ui/toast-provider';
import { cn } from '@/lib/utils';

interface CurriculumTreeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CurriculumTreeDrawer({ isOpen, onClose }: CurriculumTreeDrawerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    '04': true, // Module 04 auto-expanded by default
  });
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({
    'unit-1': true,
  });

  const activeTopicRef = useRef<HTMLDivElement | null>(null);

  // Store subscriptions
  const { completedTopics, completedUnits, completedModules, totalXP } = useProgressStore();
  const { unlockedAssessments, toggleAssessmentLock, freeNavigationEnabled, toggleFreeNavigation } = useAdminConfigStore();

  // Determine current active module and topic from URL
  const currentModuleIdFromUrl = useMemo(() => {
    const match = pathname.match(/\/modules\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  }, [pathname]);

  const currentTopicIdFromUrl = useMemo(() => {
    return searchParams.get('topic') || searchParams.get('assessment') || null;
  }, [searchParams]);

  // Auto-expand module and unit containing the current topic when drawer opens
  useEffect(() => {
    if (isOpen) {
      if (currentModuleIdFromUrl) {
        setExpandedModules((prev) => ({ ...prev, [currentModuleIdFromUrl]: true }));
      }
      if (currentTopicIdFromUrl) {
        // Find which unit contains this topic
        for (const mod of CURRICULUM_TREE) {
          for (const u of mod.units) {
            if (u.topics.some((t) => t.id === currentTopicIdFromUrl)) {
              setExpandedModules((prev) => ({ ...prev, [mod.id]: true }));
              setExpandedUnits((prev) => ({ ...prev, [u.id]: true }));
              break;
            }
          }
        }
      }
    }
  }, [isOpen, currentModuleIdFromUrl, currentTopicIdFromUrl]);

  // Scroll active topic into view when drawer opens
  useEffect(() => {
    if (isOpen && activeTopicRef.current) {
      setTimeout(() => {
        activeTopicRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 250);
    }
  }, [isOpen]);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter modules/units/topics based on search query
  const filteredTree = useMemo(() => {
    if (!searchQuery.trim()) {
      return CURRICULUM_TREE;
    }

    const q = searchQuery.toLowerCase().trim();

    return CURRICULUM_TREE.map((mod) => {
      const modMatches = mod.title.toLowerCase().includes(q) || mod.description.toLowerCase().includes(q);

      const matchingUnits = mod.units.map((unit) => {
        const unitMatches = unit.title.toLowerCase().includes(q);
        const matchingTopics = unit.topics.filter(
          (topic) => topic.title.toLowerCase().includes(q) || topic.id.toLowerCase().includes(q)
        );

        if (unitMatches || matchingTopics.length > 0) {
          return {
            ...unit,
            topics: matchingTopics.length > 0 ? matchingTopics : unit.topics,
          };
        }
        return null;
      }).filter(Boolean) as CurriculumUnit[];

      if (modMatches || matchingUnits.length > 0) {
        return {
          ...mod,
          units: matchingUnits.length > 0 ? matchingUnits : mod.units,
        };
      }
      return null;
    }).filter(Boolean) as CurriculumModule[];
  }, [searchQuery]);

  // Auto-expand all when user types search query
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const allMods: Record<string, boolean> = {};
      const allUnits: Record<string, boolean> = {};
      filteredTree.forEach((m) => {
        allMods[m.id] = true;
        m.units.forEach((u) => {
          allUnits[u.id] = true;
        });
      });
      setExpandedModules(allMods);
      setExpandedUnits(allUnits);
    }
  }, [searchQuery, filteredTree]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const toggleUnit = (unitId: string) => {
    setExpandedUnits((prev) => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  const handleExpandAll = () => {
    const allMods: Record<string, boolean> = {};
    const allUnits: Record<string, boolean> = {};
    CURRICULUM_TREE.forEach((m) => {
      allMods[m.id] = true;
      m.units.forEach((u) => {
        allUnits[u.id] = true;
      });
    });
    setExpandedModules(allMods);
    setExpandedUnits(allUnits);
  };

  const handleCollapseAll = () => {
    setExpandedModules({});
    setExpandedUnits({});
  };

  // Navigate to a topic
  const handleTopicClick = (topic: CurriculumTopic) => {
    const status = getTopicStatus({
      topicId: topic.id,
      moduleId: topic.moduleId,
      completedTopics,
      completedUnits,
      currentTopicId: currentTopicIdFromUrl,
      unlockedAssessments: freeNavigationEnabled ? ['unlock-all', ...unlockedAssessments] : unlockedAssessments,
      isAssessment: topic.isAssessment,
    });

    if (status === 'locked') {
      showToast({
        type: 'warning',
        title: 'Chapter Locked 🔒',
        description: `"${topic.title}" is currently locked. Complete previous chapters sequentially to unlock, or use Dev Admin to unlock all.`,
      });
      return;
    }

    onClose();

    const targetUrl = topic.isAssessment
      ? `/modules/${topic.moduleId}?assessment=${topic.id}`
      : `/modules/${topic.moduleId}?topic=${topic.id}`;

    // If already on the same module page, notify ModuleDetailsView for instantaneous active state update
    if (pathname === `/modules/${topic.moduleId}`) {
      window.dispatchEvent(
        new CustomEvent('soc:navigate-topic', {
          detail: {
            topicId: topic.isAssessment ? null : topic.id,
            assessmentId: topic.isAssessment ? topic.id : null,
            unitId: topic.unitId,
            moduleId: topic.moduleId,
          },
        })
      );
      window.history.pushState(null, '', targetUrl);
    } else {
      router.push(targetUrl);
    }
  };

  // Navigate directly to module overview
  const handleModuleClick = (moduleId: string) => {
    onClose();
    router.push(`/modules/${moduleId}`);
  };

  if (!isOpen) return null;

  const totalTopicsInSyllabus = CURRICULUM_TREE.flatMap((m) => m.units.flatMap((u) => u.topics)).length;
  const completedTopicsCount = completedTopics.size;

  return (
    <div className="fixed inset-0 z-50 flex animate-in fade-in duration-150">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/45 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full sm:w-[460px] max-w-[92vw] bg-background border-r border-border shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-left duration-150">
        {/* Drawer Header */}
        <div className="p-4 border-b bg-muted/20">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold shadow-2xs">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-bold text-sm leading-tight text-foreground flex items-center gap-1.5">
                  Curriculum Tree
                  <Badge variant="outline" className="text-[10px] font-mono py-0 px-1.5 border-primary/30 text-primary">
                    18 Modules
                  </Badge>
                </h2>
                <p className="text-[11px] text-muted-foreground">
                  Browse modules, units & jump directly to any chapter
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
              onClick={onClose}
              aria-label="Close curriculum drawer"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Progress Banner */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs bg-card p-2 rounded-lg border shadow-2xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Completed: <strong className="text-foreground">{completedTopicsCount}</strong> chapters</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground justify-end">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Total XP: <strong className="text-amber-600 font-bold">{totalXP}</strong></span>
            </div>
          </div>

          {/* Search / Filter Input */}
          <div className="mt-3 relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Filter chapters, units or modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-8 h-8 text-xs bg-background"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground text-xs"
                title="Clear filter"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Action Row: Expand / Collapse All & Unlock All */}
          <div className="mt-2.5 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleExpandAll}
                className="text-primary hover:underline font-medium text-[11px] px-1 py-0.5"
              >
                Expand All
              </button>
              <span className="text-muted-foreground">•</span>
              <button
                onClick={handleCollapseAll}
                className="text-muted-foreground hover:text-foreground font-medium text-[11px] px-1 py-0.5"
              >
                Collapse All
              </button>
            </div>

            <button
              onClick={() => {
                toggleFreeNavigation(true);
                showToast({
                  type: 'success',
                  title: 'Unlocked! 🔓',
                  description: 'All modules, units and chapters unlocked for free navigation!',
                });
              }}
              className="inline-flex items-center gap-1 text-[11px] text-amber-700 hover:text-amber-800 font-semibold bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded px-1.5 py-0.5 transition-colors cursor-pointer"
              title="Unlock all chapters and enable free next navigation"
            >
              <Unlock className="w-3 h-3 text-amber-600" />
              <span>Unlock All</span>
            </button>
          </div>
        </div>

        {/* Tree Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5 text-xs divide-y divide-border/40">
          {filteredTree.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground space-y-2">
              <Search className="w-8 h-8 mx-auto text-muted-foreground/50" />
              <p className="font-semibold text-sm">No topics or modules found</p>
              <p className="text-xs">Try searching for &quot;triage&quot;, &quot;severity&quot;, &quot;splunk&quot;, or &quot;people&quot;</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="mt-2 text-xs"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            filteredTree.map((mod) => {
              const isModExpanded = !!expandedModules[mod.id];
              const modStatus = getModuleStatus({
                module: mod,
                completedModules,
                completedTopics,
                completedUnits,
                currentModuleId: currentModuleIdFromUrl,
                unlockedAssessments,
              });

              const isModCurrent = currentModuleIdFromUrl === mod.id;

              return (
                <div key={mod.id} className="pt-2 first:pt-0">
                  {/* Module Accordion Header */}
                  <div
                    className={cn(
                      'group rounded-lg border transition-all select-none',
                      isModCurrent
                        ? 'bg-primary/5 border-primary/30 shadow-2xs'
                        : 'bg-card border-border/70 hover:border-border hover:bg-muted/30'
                    )}
                  >
                    <div className="p-2.5 flex items-center justify-between gap-2">
                      <button
                        onClick={() => toggleModule(mod.id)}
                        className="flex-1 flex items-center gap-2 text-left"
                      >
                        <span className="text-muted-foreground transition-transform duration-150">
                          {isModExpanded ? (
                            <ChevronDown className="w-4 h-4 text-foreground/70" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          )}
                        </span>

                        <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-muted text-muted-foreground border">
                          M{mod.id}
                        </span>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-foreground truncate">
                              {mod.title}
                            </span>
                          </div>
                          <span className="text-[10px] text-muted-foreground truncate block">
                            {mod.units.length} {mod.units.length === 1 ? 'unit' : 'units'} • {mod.units.flatMap((u) => u.topics).length} topics
                          </span>
                        </div>
                      </button>

                      {/* Status & Quick Action */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {modStatus === 'completed' && (
                          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-[10px] py-0 px-1.5 gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Done</span>
                          </Badge>
                        )}
                        {modStatus === 'locked' && (
                          <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 text-[10px] py-0 px-1.5 gap-1">
                            <Lock className="w-2.5 h-2.5 text-slate-500" />
                            <span>Locked</span>
                          </Badge>
                        )}
                        {modStatus === 'current' && (
                          <Badge className="bg-primary text-white text-[10px] py-0 px-1.5 font-semibold animate-pulse">
                            Active
                          </Badge>
                        )}

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-muted"
                          onClick={() => handleModuleClick(mod.id)}
                          title="Go to Module Overview"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Unit & Topic Tree inside Expanded Module */}
                    {isModExpanded && (
                      <div className="border-t border-border/40 p-2 space-y-2 bg-muted/10 rounded-b-lg">
                        {mod.units.map((unit) => {
                          const isUnitExpanded = !!expandedUnits[unit.id];
                          const unitTopicsDone = unit.topics.filter(
                            (t) => (t.isAssessment ? completedUnits.has(t.id) : completedTopics.has(t.id))
                          ).length;
                          const isUnitDone = unitTopicsDone === unit.topics.length && unit.topics.length > 0;

                          return (
                            <div
                              key={unit.id}
                              className="rounded-md border border-border/60 bg-background/80 overflow-hidden"
                            >
                              {/* Unit Header */}
                              <div
                                onClick={() => toggleUnit(unit.id)}
                                className="px-2.5 py-1.5 flex items-center justify-between cursor-pointer hover:bg-muted/40 transition-colors"
                              >
                                <div className="flex items-center gap-1.5 min-w-0">
                                  {isUnitExpanded ? (
                                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                                  ) : (
                                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                                  )}
                                  <span className="font-semibold text-[11px] text-foreground truncate">
                                    {unit.title}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                  <span className="text-[10px] font-mono text-muted-foreground">
                                    {unitTopicsDone}/{unit.topics.length}
                                  </span>
                                  {isUnitDone ? (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : null}
                                </div>
                              </div>

                              {/* Topics List under Unit */}
                              {isUnitExpanded && (
                                <div className="border-t border-border/30 divide-y divide-border/20 bg-background">
                                  {unit.topics.map((topic) => {
                                    const topicStatus = getTopicStatus({
                                      topicId: topic.id,
                                      moduleId: topic.moduleId,
                                      completedTopics,
                                      completedUnits,
                                      currentTopicId: currentTopicIdFromUrl,
                                      unlockedAssessments: freeNavigationEnabled ? ['unlock-all', ...unlockedAssessments] : unlockedAssessments,
                                      isAssessment: topic.isAssessment,
                                    });

                                    const isCurrentTopic =
                                      currentTopicIdFromUrl === topic.id ||
                                      (topic.isAssessment && currentTopicIdFromUrl === topic.id);

                                    return (
                                      <div
                                        key={topic.id}
                                        ref={isCurrentTopic ? activeTopicRef : null}
                                        onClick={() => handleTopicClick(topic)}
                                        className={cn(
                                          'px-3 py-2 flex items-center justify-between gap-2 cursor-pointer transition-all select-none',
                                          isCurrentTopic
                                            ? 'bg-primary/10 border-l-2 border-primary text-primary font-bold'
                                            : topicStatus === 'locked'
                                            ? 'opacity-65 hover:bg-muted/30 text-muted-foreground'
                                            : 'hover:bg-muted/60 text-foreground'
                                        )}
                                      >
                                        <div className="flex items-center gap-2 min-w-0">
                                          {/* Topic Status Icon */}
                                          {topicStatus === 'completed' ? (
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                          ) : topicStatus === 'locked' ? (
                                            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                          ) : isCurrentTopic ? (
                                            <Target className="w-3.5 h-3.5 text-primary shrink-0 animate-pulse" />
                                          ) : topic.isAssessment ? (
                                            <FileCheck2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                          ) : (
                                            <Play className="w-3 h-3 text-muted-foreground shrink-0" />
                                          )}

                                          <div className="truncate min-w-0">
                                            <p className={cn(
                                              'truncate text-[11px]',
                                              isCurrentTopic ? 'text-primary font-bold' : 'text-foreground font-medium',
                                              topic.isAssessment && 'text-amber-900 font-semibold'
                                            )}>
                                              {topic.title}
                                            </p>
                                            {topic.estimatedMinutes && (
                                              <p className="text-[10px] text-muted-foreground font-mono">
                                                {topic.estimatedMinutes}m • +{topic.xpReward} XP
                                              </p>
                                            )}
                                          </div>
                                        </div>

                                        {/* Status Tag */}
                                        <div className="shrink-0 flex items-center">
                                          {topicStatus === 'completed' && (
                                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5">
                                              Done
                                            </span>
                                          )}
                                          {topicStatus === 'locked' && (
                                            <span className="text-[10px] font-medium text-slate-500 bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5">
                                              Locked
                                            </span>
                                          )}
                                          {isCurrentTopic && (
                                            <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/30 rounded px-1.5 py-0.5">
                                              Viewing
                                            </span>
                                          )}
                                          {topicStatus === 'available' && !isCurrentTopic && (
                                            <span className="text-[10px] text-muted-foreground hover:text-foreground">
                                              Start →
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer with Quick Global Links */}
        <div className="p-3 border-t bg-muted/20 space-y-2">
          <div className="grid grid-cols-3 gap-1.5">
            <Link
              href="/dashboard"
              onClick={onClose}
              className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-[11px] font-semibold text-muted-foreground hover:text-foreground hover:bg-muted border border-border/70 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/modules"
              onClick={onClose}
              className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-[11px] font-semibold text-muted-foreground hover:text-foreground hover:bg-muted border border-border/70 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>All Modules</span>
            </Link>

            <Link
              href="/progress"
              onClick={onClose}
              className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-[11px] font-semibold text-muted-foreground hover:text-foreground hover:bg-muted border border-border/70 transition-colors"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Progress</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
