'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Search,
  FlaskConical,
  Filter,
  CheckCircle2,
  Clock,
  Terminal,
  Server,
  Layers,
  UserCheck,
  ChevronRight,
  ExternalLink,
  Shield,
  Play,
  RotateCcw,
  Check,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { V2_LABS, V2Lab } from '@/data/curriculum-v2-data';
import { useToast } from '@/components/ui/toast-provider';
import { CourseLabLauncher } from '@/components/labs/CourseLabLauncher';
import { Module01SimLab } from './labs/module-01-sim-lab';
import { Module02SimLab } from './labs/module-02-sim-lab';
import { Module03SimLab } from './labs/module-03-sim-lab';
import { Module04SimLab } from './labs/module-04-sim-lab';

interface LabsV2ModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialModuleId?: string | null;
}

export function LabsV2Modal({ isOpen, onClose, initialModuleId }: LabsV2ModalProps) {
  const { showToast } = useToast();
  const [selectedModule, setSelectedModule] = useState<string>(initialModuleId || 'ALL');
  const [formatFilter, setFormatFilter] = useState<'ALL' | 'Live VM' | 'Simulated Lab'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLab, setActiveLab] = useState<V2Lab | null>(null);
  const [activeLauncherLabId, setActiveLauncherLabId] = useState<'lab-01' | 'lab-02' | null>(null);
  const [isMod01LabOpen, setIsMod01LabOpen] = useState(false);
  const [isMod02LabOpen, setIsMod02LabOpen] = useState(false);
  const [isMod03LabOpen, setIsMod03LabOpen] = useState(false);
  const [isMod04LabOpen, setIsMod04LabOpen] = useState(false);

  // Completed tasks checklist per lab stored in localStorage
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const reloadCompletedTasks = () => {
    try {
      const saved = localStorage.getItem('soc_v2_completed_lab_tasks');
      if (saved) {
        setCompletedTasks(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    reloadCompletedTasks();
  }, []);

  const toggleTask = (labId: string, taskIdx: number) => {
    const key = `${labId}-task-${taskIdx}`;
    setCompletedTasks((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('soc_v2_completed_lab_tasks', JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  const isLabFullyCompleted = (lab: V2Lab) => {
    return lab.tasks.every((_, idx) => !!completedTasks[`${lab.id}-task-${idx}`]);
  };

  // Sync initial module if prop changes
  useEffect(() => {
    if (initialModuleId) {
      setSelectedModule(initialModuleId);
    }
  }, [initialModuleId]);

  // Filtered labs
  const filteredLabs = useMemo(() => {
    return V2_LABS.filter((lab) => {
      if (selectedModule !== 'ALL' && lab.moduleId !== selectedModule) return false;
      if (formatFilter !== 'ALL' && lab.format !== formatFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = lab.title.toLowerCase().includes(q);
        const matchTools = lab.tools.toLowerCase().includes(q);
        const matchObj = lab.objective.toLowerCase().includes(q);
        const matchMentor = lab.mentor.toLowerCase().includes(q);
        const matchMod = lab.module.toLowerCase().includes(q);
        const matchId = lab.id.toLowerCase().includes(q);
        if (!matchTitle && !matchTools && !matchObj && !matchMentor && !matchMod && !matchId) {
          return false;
        }
      }
      return true;
    });
  }, [selectedModule, formatFilter, searchQuery]);

  // Overall metrics
  const totalMinutes = useMemo(() => V2_LABS.reduce((acc, l) => acc + l.duration, 0), []);
  const liveVmCount = useMemo(() => V2_LABS.filter((l) => l.format === 'Live VM').length, []);
  const simCount = useMemo(() => V2_LABS.filter((l) => l.format === 'Simulated Lab').length, []);

  // Module options (Module 01 to 14)
  const moduleOptions = useMemo(() => {
    const set = new Map<string, string>();
    V2_LABS.forEach((l) => {
      if (!set.has(l.moduleId)) {
        set.set(l.moduleId, `Module ${l.moduleId}: ${l.module}`);
      }
    });
    return Array.from(set.entries()).map(([id, title]) => ({ id, title }));
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-6xl h-[90vh] max-h-[880px] flex flex-col bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/20">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-foreground tracking-tight">
                  CDAC Bengaluru — Practical Labs Directory
                </h2>
                <Badge className="bg-purple-600 text-white font-mono text-[11px]">
                  40 Labs (40 Hours)
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                90h Curriculum Spec: 50h Theory + 40h Hands-on ({totalMinutes} minutes total)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Filter & Metric Bar */}
        <div className="px-6 py-3 border-b bg-background/50 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Quick Metrics */}
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="outline" className="font-mono text-xs border-purple-500/30 text-purple-700 dark:text-purple-300 bg-purple-500/5">
              Total: 40 Labs
            </Badge>
            <Badge variant="outline" className="font-mono text-xs border-emerald-500/30 text-emerald-700 dark:text-emerald-300 bg-emerald-500/5">
              Live VM: {liveVmCount} Labs
            </Badge>
            <Badge variant="outline" className="font-mono text-xs border-blue-500/30 text-blue-700 dark:text-blue-300 bg-blue-500/5">
              Simulated: {simCount} Labs
            </Badge>
            <span className="text-muted-foreground hidden sm:inline">•</span>
            <span className="text-muted-foreground font-mono hidden sm:inline">
              Mentors: Ananya, Ravi, Karthik, Meera
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-2 flex-1 max-w-xs">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools, tasks, lab title..."
                className="pl-8 h-8 text-xs rounded-xl"
              />
            </div>
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="h-8 px-2 text-xs"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="px-6 py-2.5 border-b bg-muted/10 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
          <span className="font-bold text-muted-foreground flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3" />
            Module:
          </span>

          <button
            onClick={() => setSelectedModule('ALL')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedModule === 'ALL'
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'bg-card border hover:bg-muted text-muted-foreground'
            }`}
          >
            All Modules (01–14)
          </button>

          {moduleOptions.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedModule(m.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedModule === m.id
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-card border hover:bg-muted text-muted-foreground'
              }`}
            >
              M{m.id}
            </button>
          ))}

          <div className="h-4 w-px bg-border shrink-0 mx-1" />

          <span className="font-bold text-muted-foreground shrink-0">Format:</span>
          {(['ALL', 'Live VM', 'Simulated Lab'] as const).map((fmt) => (
            <button
              key={fmt}
              onClick={() => setFormatFilter(fmt)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                formatFilter === fmt
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-card border hover:bg-muted text-muted-foreground'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>

        {/* Main Split Layout: Labs List on Left, Active Lab Detail on Right */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-0">
          {/* Labs List (Left, 5 cols on lg) */}
          <div className="lg:col-span-5 border-r overflow-y-auto p-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground px-1 mb-1">
              <span>Showing {filteredLabs.length} of 40 Labs</span>
              <span>Click to view details & tasks</span>
            </div>

            {filteredLabs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground space-y-2">
                <FlaskConical className="w-8 h-8 mx-auto opacity-40" />
                <p className="text-sm font-semibold">No labs match your filter</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedModule('ALL');
                    setFormatFilter('ALL');
                    setSearchQuery('');
                  }}
                  className="text-xs"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              filteredLabs.map((lab) => {
                const isSelected = activeLab?.id === lab.id;
                const isDone = isLabFullyCompleted(lab);

                return (
                  <div
                    key={lab.id}
                    onClick={() => setActiveLab(lab)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${
                      isSelected
                        ? 'border-purple-500 bg-purple-500/10 ring-1 ring-purple-500/30'
                        : isDone
                        ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-500/5 hover:border-emerald-500'
                        : 'border-border/80 bg-card hover:border-purple-500/40 hover:bg-muted/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Badge variant="outline" className="font-mono text-[10px] font-bold">
                          {lab.id}
                        </Badge>
                        <Badge
                          className={`text-[10px] font-bold ${
                            lab.format === 'Live VM'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-blue-600 text-white'
                          }`}
                        >
                          {lab.format}
                        </Badge>
                        <Badge variant="secondary" className="text-[10px] font-mono">
                          ⏱ {lab.duration}m
                        </Badge>
                      </div>

                      {isDone && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Done
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-bold text-sm text-foreground line-clamp-1">
                        {lab.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        Module {lab.moduleId}: {lab.module}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border/50">
                      <span className="truncate max-w-[200px]">
                        🛠 {lab.tools.split(';')[0]}
                      </span>
                      <span className="shrink-0 font-medium">
                        Mentor: {lab.mentor}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Active Lab Details (Right, 7 cols on lg) */}
          <div className="lg:col-span-7 overflow-y-auto p-5 sm:p-6 bg-card space-y-6">
            {activeLab ? (
              <div className="space-y-6 animate-fade-in">
                {/* Lab Title Header */}
                <div className="space-y-2 border-b pb-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono font-bold text-xs">
                        {activeLab.id}
                      </Badge>
                      <Badge
                        className={`text-xs font-bold ${
                          activeLab.format === 'Live VM'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        {activeLab.format}
                      </Badge>
                      <Badge variant="secondary" className="text-xs font-mono">
                        <Clock className="w-3 h-3 mr-1 inline" />
                        {activeLab.duration} minutes
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <UserCheck className="w-3.5 h-3.5 text-primary" />
                      <span>Mentor: <strong className="text-foreground">{activeLab.mentor}</strong></span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                    {activeLab.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Belongs to <strong className="text-foreground">Module {activeLab.moduleId}: {activeLab.module}</strong>
                  </p>
                </div>

                {/* Objective Card */}
                <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Lab Objective
                  </span>
                  <p className="text-sm font-medium text-foreground leading-relaxed">
                    {activeLab.objective}
                  </p>
                </div>

                {/* Tools & Environment */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Required Tools & Telemetry Sources
                  </h4>
                  <div className="p-3.5 rounded-xl border bg-muted/20 font-mono text-xs text-foreground flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                    <span>{activeLab.tools}</span>
                  </div>
                </div>

                {/* Tasks Checklist */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Actionable Tasks Checklist ({activeLab.tasks.length} Steps)
                    </h4>
                    <span className="text-[11px] text-muted-foreground">
                      Click to check off completed steps
                    </span>
                  </div>

                  <div className="space-y-2">
                    {activeLab.tasks.map((task, idx) => {
                      const taskKey = `${activeLab.id}-task-${idx}`;
                      const isTaskDone = !!completedTasks[taskKey];

                      return (
                        <div
                          key={idx}
                          onClick={() => toggleTask(activeLab.id, idx)}
                          className={`p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                            isTaskDone
                              ? 'bg-emerald-500/10 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                              : 'bg-card border-border hover:border-primary/40'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isTaskDone
                                ? 'bg-emerald-600 text-white'
                                : 'border border-muted-foreground/40 bg-muted/20'
                            }`}
                          >
                            {isTaskDone && <Check className="w-3.5 h-3.5" />}
                          </div>

                          <div className="flex-1 text-xs sm:text-sm">
                            <span className={`leading-relaxed ${isTaskDone ? 'line-through opacity-80' : 'font-medium'}`}>
                              {task}
                            </span>
                          </div>

                          <span className="text-[11px] font-mono text-muted-foreground shrink-0">
                            Task {idx + 1}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Outcome & Evidence */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl border bg-muted/15 space-y-1">
                    <span className="font-bold text-foreground block">
                      🎯 Expected Outcome
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      {activeLab.outcome}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border bg-muted/15 space-y-1">
                    <span className="font-bold text-foreground block">
                      📄 Evidence Deliverable
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      {activeLab.evidence}
                    </p>
                  </div>
                </div>

                {/* Launch Simulation / Workspace Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t">
                  <div className="text-xs text-muted-foreground">
                    {isLabFullyCompleted(activeLab) ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> All tasks completed for this lab!
                      </span>
                    ) : (
                      <span>Follow standard CDAC SOP guidelines to execute this lab.</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        if (activeLab.id === 'LAB-01') {
                          setIsMod01LabOpen(true);
                          return;
                        }
                        if (activeLab.id === 'LAB-02') {
                          setIsMod02LabOpen(true);
                          return;
                        }
                        if (activeLab.id === 'LAB-03') {
                          setIsMod03LabOpen(true);
                          return;
                        }
                        if (activeLab.id === 'LAB-04') {
                          setIsMod04LabOpen(true);
                          return;
                        }
                        // Open simulated lab launcher console
                        setActiveLauncherLabId('lab-01');
                        showToast({
                          type: 'info',
                          title: `Opening Virtual Workspace`,
                          description: `Launching interactive investigation console for ${activeLab.id}.`,
                        });
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs gap-2 rounded-xl shadow-md cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Launch Investigation Workspace</span>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-muted-foreground space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center ring-8 ring-purple-500/5">
                  <FlaskConical className="w-8 h-8" />
                </div>
                <div className="space-y-1 max-w-sm">
                  <h4 className="text-base font-bold text-foreground">
                    Select a Lab from the Directory
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Choose any of the 40 labs on the left to inspect its required tools, actionable tasks checklist, deliverable outcome, and assigned mentor.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
          <span>CDAC BENGALURU — SOC ANALYST L1 CURRICULUM VERSION 2</span>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-7 text-xs">
            Close Directory
          </Button>
        </div>
      </div>

      {/* Module 01 Dedicated Interactive Simulation Lab */}
      <Module01SimLab
        isOpen={isMod01LabOpen}
        onClose={() => {
          setIsMod01LabOpen(false);
          reloadCompletedTasks();
        }}
        onCompleted={() => {
          reloadCompletedTasks();
        }}
      />

      {/* Module 02 Dedicated Interactive Simulation Lab */}
      <Module02SimLab
        isOpen={isMod02LabOpen}
        onClose={() => {
          setIsMod02LabOpen(false);
          reloadCompletedTasks();
        }}
        onCompleted={() => {
          reloadCompletedTasks();
        }}
      />

      {/* Module 03 Dedicated Interactive Simulation Lab */}
      <Module03SimLab
        isOpen={isMod03LabOpen}
        onClose={() => {
          setIsMod03LabOpen(false);
          reloadCompletedTasks();
        }}
        onCompleted={() => {
          reloadCompletedTasks();
        }}
      />

      {/* Module 04 Dedicated Interactive Simulation Lab (White Theme) */}
      <Module04SimLab
        isOpen={isMod04LabOpen}
        onClose={() => {
          setIsMod04LabOpen(false);
          reloadCompletedTasks();
        }}
        onCompleted={() => {
          reloadCompletedTasks();
        }}
      />

      {/* Embedded Simulated Console Launcher if active */}
      {activeLauncherLabId && (
        <CourseLabLauncher
          labId={activeLauncherLabId}
          onLabCompleted={(res) => {
            showToast({
              type: 'success',
              title: 'Lab Completed! 🎉',
              description: `Score: ${res.score}%. Findings submitted to CDAC Bengaluru training portal.`,
            });
            setActiveLauncherLabId(null);
          }}
        />
      )}
    </div>
  );
}
