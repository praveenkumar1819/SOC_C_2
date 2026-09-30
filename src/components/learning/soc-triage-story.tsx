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
  const { xpSystemEnabled, freeNavigationEnabled } = useAdminConfigStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shiftContext = UNIT_SHIFT_CONTEXTS[unitId] || UNIT_SHIFT_CONTEXTS['unit-2'];

  // Topic determination based on currentTopicId
  const getTopicOrder = () => {
    if (!currentTopicId) return 1;
    if (currentTopicId.includes('assessment')) return 99;
    const parts = currentTopicId.split('-');
    const last = parseInt(parts[parts.length - 1], 10);
    return isNaN(last) ? 1 : last;
  };

  const activeTopicNum = getTopicOrder();
  const [activeSubStep, setActiveSubStep] = useState<number>(() => {
    if (currentTopicId === 'unit-2-assessment') return 5;
    if (currentTopicId?.includes('assessment')) return 99;
    if (currentTopicId === 'topic-2-2') return 3;
    return getTopicOrder();
  });

  useEffect(() => {
    if (currentTopicId === 'unit-2-assessment') {
      setActiveSubStep(5);
    } else if (currentTopicId?.includes('assessment')) {
      setActiveSubStep(99);
    } else if (currentTopicId === 'topic-2-2') {
      setActiveSubStep((prev) => (prev === 4 ? 4 : 3));
    } else if (currentTopicId === 'topic-2-1') {
      setActiveSubStep((prev) => (prev === 2 ? 2 : 1));
    } else {
      setActiveSubStep(getTopicOrder());
    }
  }, [currentTopicId]);

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
  const [u3PriorityRankAnswers, setU3PriorityRankAnswers] = useState<Record<string, string>>({});
  const [u3KcQ2Answer, setU3KcQ2Answer] = useState<string>('');
  const [u3KcQ3Answer, setU3KcQ3Answer] = useState<string>('');
  const [u3KcSubmitted, setU3KcSubmitted] = useState<boolean>(false);

  // UNIT 4 STATES
  const [u4ExpectedAssessments, setU4ExpectedAssessments] = useState<Record<string, string>>({});
  const [u4BenignAssessments, setU4BenignAssessments] = useState<Record<string, string>>({});
  const [u4RuleAssessments, setU4RuleAssessments] = useState<Record<string, string>>({});
  const [u4ContextScenarioAnswers, setU4ContextScenarioAnswers] = useState<Record<string, string>>({});
  const [u4KcQ1Answer, setU4KcQ1Answer] = useState<string>('');
  const [u4KcQ2Answer, setU4KcQ2Answer] = useState<string>('');
  const [u4KcSubmitted, setU4KcSubmitted] = useState<boolean>(false);

  // UNIT 5 STATES
  const [u5CalculatorAsset, setU5CalculatorAsset] = useState<number>(1);
  const [u5CalculatorThreat, setU5CalculatorThreat] = useState<number>(1);
  const [u5CalculatorImpact, setU5CalculatorImpact] = useState<number>(1);
  const [u5MatrixUserAnswers, setU5MatrixUserAnswers] = useState<Record<string, string>>({});
  const [u5KcPrioOrder, setU5KcPrioOrder] = useState<string[]>([]);
  const [u5KcSubmitted, setU5KcSubmitted] = useState<boolean>(false);

  // UNIT 6 STATES
  const [u6EscalationAnswers, setU6EscalationAnswers] = useState<Record<string, string>>({});
  const [u6KcTierOrder, setU6KcTierOrder] = useState<Record<string, string>>({});
  const [u6KcSubmitted, setU6KcSubmitted] = useState<boolean>(false);

  // UNIT 7 STATES
  const [u7ActiveDossierPart, setU7ActiveDossierPart] = useState<number>(1);
  const [u7CheckedAuditItems, setU7CheckedAuditItems] = useState<Record<number, boolean>>({});
  const [u7GraduationCaseChoice, setU7GraduationCaseChoice] = useState<string>('case-1');
  const [u7GraduationConfirmed, setU7GraduationConfirmed] = useState<boolean>(false);

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
  const isU4Ch1Complete = Object.keys(u4ContextScenarioAnswers).length >= 2;
  const isU5Ch1Complete = u5CalculatorAsset > 1 || u5CalculatorThreat > 1 || u5CalculatorImpact > 1;
  const isU6Ch1Complete = Object.keys(u6EscalationAnswers).length >= 2;
  const isU7Ch1Complete = u7ActiveDossierPart >= 2;

  const isChapterLocked = (uid: string, chapterNum: number): boolean => {
    if (!mounted) return false;
    if (freeNavigationEnabled) return false;
    if (chapterNum <= 1) return false;
    if (uid === 'unit-2') {
      if (chapterNum === 2) return !isCh21Complete && !isChapterDone('unit-2', 1) && !completedTopics.has('topic-2-1');
      if (chapterNum === 3) return !isCh22Complete && !isChapterDone('unit-2', 2) && !completedTopics.has('topic-2-1');
      if (chapterNum === 4) return !isCh23Complete && !isChapterDone('unit-2', 3) && !completedTopics.has('topic-2-2');
      if (chapterNum === 5) return !isCh24Complete && !isChapterDone('unit-2', 4) && !(completedUnits.has('unit-2') || completedUnits.has('unit-2-assessment'));
    }
    if (uid === 'unit-3') {
      if (chapterNum === 2) return !isU3Ch1Complete && !isChapterDone('unit-3', 1) && !(completedUnits.has('unit-3') || completedUnits.has('unit-3-assessment'));
    }
    if (uid === 'unit-4') {
      if (chapterNum === 2) return !isU4Ch1Complete && !isChapterDone('unit-4', 1) && !(completedUnits.has('unit-4') || completedUnits.has('unit-4-assessment'));
    }
    if (uid === 'unit-5') {
      if (chapterNum === 2) return !isU5Ch1Complete && !isChapterDone('unit-5', 1) && !(completedUnits.has('unit-5') || completedUnits.has('unit-5-assessment'));
    }
    if (uid === 'unit-6') {
      if (chapterNum === 2) return !isU6Ch1Complete && !isChapterDone('unit-6', 1) && !(completedUnits.has('unit-6') || completedUnits.has('unit-6-assessment'));
    }
    if (uid === 'unit-7') {
      if (chapterNum === 2) return !isU7Ch1Complete && !isChapterDone('unit-7', 1) && !(completedUnits.has('unit-7') || completedUnits.has('unit-7-assessment'));
    }
    return !isChapterDone(uid, chapterNum - 1);
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
        ].map((u) => (
          <button
            key={u.id}
            type="button"
            onClick={() => onSelectTopic(u.topicId)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              unitId === u.id
                ? 'bg-primary text-primary-foreground shadow-xs ring-1 ring-primary'
                : 'bg-card hover:bg-muted text-muted-foreground border border-border/70 hover:text-foreground'
            }`}
          >
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
              unitId === u.id ? 'bg-primary-foreground/20 text-primary-foreground font-bold' : 'bg-muted text-muted-foreground'
            }`}>
              {u.num}
            </span>
            <span>{u.label}</span>
          </button>
        ))}
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
          {(activeSubStep === 1 || activeSubStep === 99 || activeTopicNum === 99) && (
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
          {(activeSubStep === 2 || activeSubStep === 99 || activeTopicNum === 99) && (
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
          {(activeSubStep === 3 || activeSubStep === 99 || activeTopicNum === 99) && (
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
          {(activeSubStep === 4 || activeSubStep === 99 || activeTopicNum === 99) && (
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
          {(activeSubStep === 5 || activeSubStep === 99 || activeTopicNum === 99 || currentTopicId === 'unit-2-assessment') && (
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
          {/* Unit 3 Chapter Navigation */}
          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
            <div className="p-2 sm:p-3 bg-card flex items-center justify-between gap-2 overflow-x-auto border-b">
              <div className="flex items-center gap-1 sm:gap-2">
                {[
                  { num: 1, label: 'Chapter 3.1: 5-Field Triage Lab', anchor: '' },
                  { num: 2, label: 'Chapter 3.2: Keylogger Assessment', anchor: 'unit-3-assessment-card' },
                ].map((tab) => {
                  const isDone = isChapterDone('unit-3', tab.num) || (mounted && tab.num === 2 && (completedUnits.has('unit-3') || completedUnits.has('unit-3-assessment')));
                  const locked = isChapterLocked('unit-3', tab.num);
                  return (
                    <button
                      key={tab.num}
                      type="button"
                      suppressHydrationWarning
                      onClick={() => {
                        if (locked) { showToast({ type: 'warning', title: 'Chapter Locked 🔒', description: 'Extract the 5 critical fields in Chapter 3.1 first to unlock the Assessment.' }); return; }
                        if (tab.anchor) { const el = document.getElementById(tab.anchor); el?.scrollIntoView({ behavior: 'smooth' }); }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        isDone ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300'
                        : locked ? 'opacity-60 cursor-not-allowed text-muted-foreground border border-border/60'
                        : 'hover:bg-muted text-muted-foreground border border-border/60'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : locked ? <Lock className="w-3 h-3 text-muted-foreground/60" /> : null}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="hidden md:flex items-center gap-2 shrink-0 text-xs text-muted-foreground font-mono">
                <span>Unit 3 — Day 3</span>
              </div>
            </div>
          </div>

          <Card className="shadow-xs border-border">
            <CardHeader className="pb-3 border-b bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <Search className="w-4 h-4 text-primary" />
                  Chapter 3.1: Extracting the 5 Critical Fields Under 5 Minutes
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Alert {u3ActiveTriageAlertIndex + 1} of {UNIT_3_TRIAGE_ALERTS.length}: Practice rapid entity identification.
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
                  onClick={() => {
                    setU3RevealedFields({});
                    setU3PriorityRankAnswers({});
                  }}
                  className="text-xs gap-1 h-7 ml-2"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-6">
              {(() => {
                const alertItem = UNIT_3_TRIAGE_ALERTS[u3ActiveTriageAlertIndex];
                return (
                  <div className="space-y-5 animate-fade-in">
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
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
                        Extract &amp; Verify the 5 Critical Anchors:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-xs">
                        {[
                          { key: 'who', label: '1. WHO', value: alertItem.fields.who, desc: 'User / Identity' },
                          { key: 'what', label: '2. WHAT', value: alertItem.fields.what, desc: 'Host / Process' },
                          { key: 'where', label: '3. WHERE', value: alertItem.fields.where, desc: 'Network / Location' },
                          { key: 'when', label: '4. WHEN', value: alertItem.fields.when, desc: 'Time / Recency' },
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
                      <span className="font-bold text-foreground font-mono">The Extracted Alert Story:</span>
                      <p className="text-muted-foreground leading-relaxed italic">{alertItem.storySummary}</p>
                    </div>

                    {/* Alert Navigation Bar */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={u3ActiveTriageAlertIndex === 0}
                        onClick={() => setU3ActiveTriageAlertIndex((prev) => Math.max(0, prev - 1))}
                        className="text-xs gap-1 cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        Previous Alert
                      </Button>
                      {u3ActiveTriageAlertIndex < UNIT_3_TRIAGE_ALERTS.length - 1 ? (
                        <Button
                          size="sm"
                          onClick={() => setU3ActiveTriageAlertIndex((prev) => prev + 1)}
                          className="text-xs gap-1 font-bold cursor-pointer bg-primary text-primary-foreground"
                        >
                          <span>Next Alert (Alert {u3ActiveTriageAlertIndex + 2})</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                      ) : (
                        <div className="flex items-center gap-2">
                          {!isU3Ch1Complete && !isChapterDone('unit-3', 1) && !freeNavigationEnabled && (
                            <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                              <Lock className="w-3.5 h-3.5" />
                              Extract at least 3 fields above ({Object.keys(u3RevealedFields).length}/5) to unlock Assessment
                            </span>
                          )}
                          <Button
                            size="sm"
                            disabled={!isU3Ch1Complete && !isChapterDone('unit-3', 1) && !freeNavigationEnabled}
                            onClick={() => {
                              markChapterDone('unit-3', 1);
                              const el = document.getElementById('unit-3-assessment-card');
                              el?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="text-xs gap-1 font-bold bg-primary text-primary-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Proceed to Chapter 3.2: Assessment 👇
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Unit 3 Capstone Assessment */}
              <div id="unit-3-assessment-card" className="p-5 rounded-2xl border bg-card space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    Chapter 3.2: Keylogger Threat Assessment SEC-2026-0950
                  </span>
                  <Badge variant="outline" className="text-xs text-rose-600 bg-rose-50 border-rose-200">Priority Test</Badge>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs space-y-1">
                  <p>Alert: SEC-2026-0950 | Rule: Credential Access via Keylogger DLL</p>
                  <p>User: pnair (Priya Nair, Finance) | Host: FIN-BOS-PNAIR-W4521 | Time: 11:22:45 AM | Count: 1</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="space-y-1.5">
                    <span className="font-bold text-foreground">Why is this HIGH Priority despite only being 1 occurrence on a standard laptop?</span>
                    {[
                      { id: 'opt-k1', text: 'A) Any keylogger steals banking passwords and customer payment tokens directly from memory, representing an immediate credential compromise threat.' },
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

                {(u3KcSubmitted || (mounted && (completedUnits.has('unit-3') || completedUnits.has('unit-3-assessment')))) ? (
                  <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/70 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in" suppressHydrationWarning>
                    <div>
                      <span className="font-bold text-emerald-800 block">🎉 Unit 3 Certified! (+100 XP)</span>
                      <p className="text-xs text-emerald-700">You mastered rapid alert triage and 5-field entity extraction.</p>
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
                      disabled={!u3KcQ2Answer}
                      onClick={() => {
                        setU3KcSubmitted(true);
                        handleFinishAssessment('unit-3-assessment', 100);
                        onSelectTopic('topic-4-1');
                      }}
                      className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer w-full sm:w-auto"
                    >
                      <span>Submit & Proceed to Unit 4: False Positives (+100 XP)</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ====================================================
          UNIT 4: FALSE POSITIVES & CONTEXT INVESTIGATION
         ==================================================== */}
      {unitId === 'unit-4' && (
        <div className="space-y-6">
          {/* Unit 4 Chapter Navigation */}
          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
            <div className="p-2 sm:p-3 bg-card flex items-center justify-between gap-2 overflow-x-auto border-b">
              <div className="flex items-center gap-1 sm:gap-2">
                {[
                  { num: 1, label: 'Chapter 4.1: 5-Pillar Context Lab', anchor: '' },
                  { num: 2, label: 'Chapter 4.2: BitLocker Assessment', anchor: 'unit-4-assessment-card' },
                ].map((tab) => {
                  const isDone = isChapterDone('unit-4', tab.num) || (mounted && tab.num === 2 && (completedUnits.has('unit-4') || completedUnits.has('unit-4-assessment')));
                  const locked = isChapterLocked('unit-4', tab.num);
                  return (
                    <button
                      key={tab.num}
                      type="button"
                      suppressHydrationWarning
                      onClick={() => {
                        if (locked) { showToast({ type: 'warning', title: 'Chapter Locked 🔒', description: 'Investigate at least 2 context scenarios in Chapter 4.1 first to unlock the Assessment.' }); return; }
                        if (tab.anchor) { const el = document.getElementById(tab.anchor); el?.scrollIntoView({ behavior: 'smooth' }); }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        isDone ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300'
                        : locked ? 'opacity-60 cursor-not-allowed text-muted-foreground border border-border/60'
                        : 'hover:bg-muted text-muted-foreground border border-border/60'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : locked ? <Lock className="w-3 h-3 text-muted-foreground/60" /> : null}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="hidden md:flex items-center gap-2 shrink-0 text-xs text-muted-foreground font-mono">
                <span>Unit 4 — Day 4</span>
              </div>
            </div>
          </div>

          <Card className="shadow-xs border-border">
            <CardHeader className="pb-3 border-b bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-primary" />
                  Chapter 4.1: The 5-Pillar Context Investigation Framework
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Evaluate context (User, Time, Tool, Approval, Scope) to avoid over-escalation.
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
                          <div className={`p-2.5 rounded-lg text-[11px] space-y-1 animate-fade-in ${isCorrect ? 'bg-emerald-50 text-emerald-950 border border-emerald-300' : 'bg-rose-50 text-rose-950 border border-rose-300'}`}>
                            <p><strong>Action:</strong> {sc.action}</p>
                            <p className="opacity-90">{sc.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  {!isU4Ch1Complete && !isChapterDone('unit-4', 1) && !freeNavigationEnabled ? (
                    <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      Answer at least 2 context scenarios above ({Object.keys(u4ContextScenarioAnswers).length}/4) to unlock Assessment
                    </span>
                  ) : <div />}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!isU4Ch1Complete && !isChapterDone('unit-4', 1) && !freeNavigationEnabled}
                    onClick={() => {
                      markChapterDone('unit-4', 1);
                      const el = document.getElementById('unit-4-assessment-card');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Proceed to Chapter 4.2: Assessment 👇</span>
                  </Button>
                </div>
              </div>

              {/* Unit 4 Assessment: BitLocker Encryption Context */}
              <div id="unit-4-assessment-card" className="p-5 rounded-2xl border bg-card space-y-4 pt-4 border-t">
                <span className="font-bold text-sm text-foreground flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  Chapter 4.2: The BitLocker Encryption Diagnostic
                </span>
                <p className="text-xs text-muted-foreground">
                  BitLocker full-disk encryption is running. Case A: kpatel (IT technician, business hours). Case B: rsmith (Accountant, 23:45 PM Sunday).
                </p>

                <div className="space-y-2 text-xs">
                  {[
                    { id: 'opt-bl1', text: 'Case A is Benign Activity (legitimate technician routine), while Case B is True Positive (unauthorized late night drive encryption hiding evidence).' },
                    { id: 'opt-bl2', text: 'Both cases are identical because the executable bitlocker.exe is standard Windows software.' },
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

                {(u4KcSubmitted || (mounted && (completedUnits.has('unit-4') || completedUnits.has('unit-4-assessment')))) ? (
                  <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/70 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in" suppressHydrationWarning>
                    <div>
                      <span className="font-bold text-emerald-800 block">🎉 Unit 4 Certified! (+100 XP)</span>
                      <p className="text-xs text-emerald-700">You mastered context-based investigation and false positive discrimination.</p>
                    </div>
                    <Button
                      suppressHydrationWarning
                      onClick={() => onSelectTopic('topic-5-1')}
                      className="font-bold text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 cursor-pointer"
                    >
                      <span>Proceed to Unit 5: Severity & SLAs</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <Button
                      disabled={!u4KcQ1Answer}
                      onClick={() => {
                        setU4KcSubmitted(true);
                        handleFinishAssessment('unit-4-assessment', 100);
                        onSelectTopic('topic-5-1');
                      }}
                      className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer w-full sm:w-auto"
                    >
                      <span>Submit & Proceed to Unit 5: Severity & SLAs (+100 XP)</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ====================================================
          UNIT 5: SEVERITY CLASSIFICATION & MATRIX
         ==================================================== */}
      {unitId === 'unit-5' && (
        <div className="space-y-6">
          {/* Unit 5 Chapter Navigation */}
          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
            <div className="p-2 sm:p-3 bg-card flex items-center justify-between gap-2 overflow-x-auto border-b">
              <div className="flex items-center gap-1 sm:gap-2">
                {[
                  { num: 1, label: 'Chapter 5.1: Severity Calculator', anchor: '' },
                  { num: 2, label: 'Chapter 5.2: Queue Prioritization', anchor: 'unit-5-assessment-card' },
                ].map((tab) => {
                  const isDone = isChapterDone('unit-5', tab.num) || (mounted && tab.num === 2 && (completedUnits.has('unit-5') || completedUnits.has('unit-5-assessment')));
                  const locked = isChapterLocked('unit-5', tab.num);
                  return (
                    <button
                      key={tab.num}
                      type="button"
                      suppressHydrationWarning
                      onClick={() => {
                        if (locked) { showToast({ type: 'warning', title: 'Chapter Locked 🔒', description: 'Adjust the severity sliders in Chapter 5.1 first to unlock Queue Prioritization.' }); return; }
                        if (tab.anchor) { const el = document.getElementById(tab.anchor); el?.scrollIntoView({ behavior: 'smooth' }); }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        isDone ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300'
                        : locked ? 'opacity-60 cursor-not-allowed text-muted-foreground border border-border/60'
                        : 'hover:bg-muted text-muted-foreground border border-border/60'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : locked ? <Lock className="w-3 h-3 text-muted-foreground/60" /> : null}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="hidden md:flex items-center gap-2 shrink-0 text-xs text-muted-foreground font-mono">
                <span>Unit 5 — Day 5</span>
              </div>
            </div>
          </div>

          <Card className="shadow-xs border-border">
            <CardHeader className="pb-3 border-b bg-muted/20">
              <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                Chapter 5.1: Interactive Severity Calculator (Asset × Threat × Impact)
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Adjust the 3 operational sliders below to see the calculated severity rating and SLA deadline.
              </p>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-6">
              {/* 3 Slider Controls */}
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
                        className={`w-full p-2 rounded text-left transition-all ${
                          u5CalculatorAsset === item.val ? 'bg-primary text-primary-foreground font-bold' : 'bg-card hover:bg-muted text-muted-foreground'
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
                        className={`w-full p-2 rounded text-left transition-all ${
                          u5CalculatorThreat === item.val ? 'bg-primary text-primary-foreground font-bold' : 'bg-card hover:bg-muted text-muted-foreground'
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
                        className={`w-full p-2 rounded text-left transition-all ${
                          u5CalculatorImpact === item.val ? 'bg-primary text-primary-foreground font-bold' : 'bg-card hover:bg-muted text-muted-foreground'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculator Output */}
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
                    <span className="text-xs uppercase tracking-widest font-bold block opacity-80">Calculated Priority Rating</span>
                    <h3 className="text-2xl font-black">{sev} SEVERITY</h3>
                    <p className="text-xs">Contractual SLA Triage Window: {sla}</p>
                  </div>
                );
              })()}

              <div className="flex justify-end pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    markChapterDone('unit-5', 1);
                    const el = document.getElementById('unit-5-assessment-card');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-bold gap-1 cursor-pointer"
                >
                  <span>Proceed to Chapter 5.2: Queue Prioritization 👇</span>
                </Button>
              </div>

              {/* Elena Gomez Prioritization Assessment */}
              <div id="unit-5-assessment-card" className="p-5 rounded-2xl border bg-card space-y-4 pt-4 border-t text-xs">
                <span className="font-bold text-sm text-foreground flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  Chapter 5.2: Elena Gomez Queue Prioritization Challenge
                </span>
                <p className="text-muted-foreground">
                  Elena asks: You have 4 alerts and 2 response analysts. What is the mandatory triage order?
                </p>

                <div className="space-y-2">
                  {[
                    { id: 'prio-correct', text: '1st: Brute Force on Domain Admin (Critical) -> 2nd: 5GB Personal Email Exfiltration (High) -> 3rd: Quarantined Antivirus Malware (Low) -> 4th: Forgotten Password Reset (Low)' },
                    { id: 'prio-wrong', text: 'Handle the password reset first because it takes less than 2 minutes, then look at Domain Admin.' },
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

                {(u5KcSubmitted || (mounted && (completedUnits.has('unit-5') || completedUnits.has('unit-5-assessment')))) ? (
                  <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/70 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in" suppressHydrationWarning>
                    <div>
                      <span className="font-bold text-emerald-800 block">🎉 Unit 5 Certified! (+100 XP)</span>
                      <p className="text-xs text-emerald-700">You mastered severity calculation and queue prioritization matrices.</p>
                    </div>
                    <Button
                      suppressHydrationWarning
                      onClick={() => onSelectTopic('topic-6-1')}
                      className="font-bold text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 cursor-pointer"
                    >
                      <span>Proceed to Unit 6: Escalation & Routing</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <Button
                      disabled={!u5KcPrioOrder.includes('prio-correct')}
                      onClick={() => {
                        setU5KcSubmitted(true);
                        handleFinishAssessment('unit-5-assessment', 100);
                        onSelectTopic('topic-6-1');
                      }}
                      className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer w-full sm:w-auto"
                    >
                      <span>Submit & Proceed to Unit 6: Escalation & Routing (+100 XP)</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ====================================================
          UNIT 6: ESCALATION & SPECIALIST ROUTING
         ==================================================== */}
      {unitId === 'unit-6' && (
        <div className="space-y-6">
          {/* Unit 6 Chapter Navigation */}
          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
            <div className="p-2 sm:p-3 bg-card flex items-center justify-between gap-2 overflow-x-auto border-b">
              <div className="flex items-center gap-1 sm:gap-2">
                {[
                  { num: 1, label: 'Chapter 6.1: Escalation Routing Board', anchor: '' },
                  { num: 2, label: 'Chapter 6.2: APT Crisis Assessment', anchor: 'unit-6-assessment-card' },
                ].map((tab) => {
                  const isDone = isChapterDone('unit-6', tab.num) || (mounted && tab.num === 2 && (completedUnits.has('unit-6') || completedUnits.has('unit-6-assessment')));
                  const locked = isChapterLocked('unit-6', tab.num);
                  return (
                    <button
                      key={tab.num}
                      type="button"
                      suppressHydrationWarning
                      onClick={() => {
                        if (locked) { showToast({ type: 'warning', title: 'Chapter Locked 🔒', description: 'Complete the Routing Board first to unlock the APT Crisis Assessment.' }); return; }
                        if (tab.anchor) { const el = document.getElementById(tab.anchor); el?.scrollIntoView({ behavior: 'smooth' }); }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        isDone ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300'
                        : locked ? 'opacity-60 cursor-not-allowed text-muted-foreground border border-border/60'
                        : 'hover:bg-muted text-muted-foreground border border-border/60'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : locked ? <Lock className="w-3 h-3 text-muted-foreground/60" /> : null}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="hidden md:flex items-center gap-2 shrink-0 text-xs text-muted-foreground font-mono">
                <span>Unit 6 — Day 6</span>
              </div>
            </div>
          </div>

          <Card className="shadow-xs border-border">
            <CardHeader className="pb-3 border-b bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Chapter 6.1: Operational Escalation &amp; Specialist Routing Board
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Route 5 investigated incidents to the proper specialist team.
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
                            className={`p-2 rounded text-center text-[11px] font-bold border transition-all ${
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  {!isU6Ch1Complete && !isChapterDone('unit-6', 1) && !freeNavigationEnabled ? (
                    <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      Route at least 2 escalation scenarios above ({Object.keys(u6EscalationAnswers).length}/5) to unlock Assessment
                    </span>
                  ) : <div />}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!isU6Ch1Complete && !isChapterDone('unit-6', 1) && !freeNavigationEnabled}
                    onClick={() => {
                      markChapterDone('unit-6', 1);
                      const el = document.getElementById('unit-6-assessment-card');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Proceed to Chapter 6.2: Assessment 👇</span>
                  </Button>
                </div>
              </div>

              {/* Unit 6 Assessment */}
              <div id="unit-6-assessment-card" className="p-5 rounded-2xl border bg-card space-y-4 pt-4 border-t text-xs">
                <span className="font-bold text-sm text-foreground flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  Chapter 6.2: Elena Gomez APT Emergency Dispatch
                </span>
                <p className="text-muted-foreground">
                  Elena declares: &ldquo;47 computers compromised, Domain Admin account stolen, 250 GB exfiltration in progress. What is the first 30-minute response?&rdquo;
                </p>

                <div className="space-y-2">
                  {[
                    { id: 'apt-correct', text: 'L2 isolates 47 hosts & blocks C2 IP; Identity team revokes Domain Admin tokens; Elena activates incident command & alerts CEO and Legal; Aditya (L3) begins enterprise-wide hunt.' },
                    { id: 'apt-wrong', text: 'Only L1 continues looking at SIEM alerts while waiting for tomorrow morning staff meeting.' },
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
                      <span>Proceed to Unit 7: Documentation & Capstone</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <Button
                      disabled={u6KcTierOrder.choice !== 'apt-correct'}
                      onClick={() => {
                        setU6KcSubmitted(true);
                        handleFinishAssessment('unit-6-assessment', 100);
                        onSelectTopic('topic-7-1');
                      }}
                      className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer w-full sm:w-auto"
                    >
                      <span>Submit & Proceed to Unit 7: Documentation & Capstone (+100 XP)</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ====================================================
          UNIT 7: SOC DOCUMENTATION & FINAL GRADUATION
         ==================================================== */}
      {unitId === 'unit-7' && (
        <div className="space-y-6">
          {/* Unit 7 Chapter Navigation */}
          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
            <div className="p-2 sm:p-3 bg-card flex items-center justify-between gap-2 overflow-x-auto border-b">
              <div className="flex items-center gap-1 sm:gap-2">
                {[
                  { num: 1, label: 'Chapter 7.1: 8-Part Dossier Lab', anchor: '' },
                  { num: 2, label: 'Chapter 7.2: Graduation Briefing', anchor: 'unit-7-graduation-card' },
                ].map((tab) => {
                  const isDone = isChapterDone('unit-7', tab.num) || (mounted && tab.num === 2 && (completedUnits.has('unit-7') || completedUnits.has('unit-7-assessment')));
                  const locked = isChapterLocked('unit-7', tab.num);
                  return (
                    <button
                      key={tab.num}
                      type="button"
                      suppressHydrationWarning
                      onClick={() => {
                        if (locked) { showToast({ type: 'warning', title: 'Chapter Locked 🔒', description: 'Review the dossier sections in Chapter 7.1 first to unlock the Graduation Briefing.' }); return; }
                        if (tab.anchor) { const el = document.getElementById(tab.anchor); el?.scrollIntoView({ behavior: 'smooth' }); }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        isDone ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300'
                        : locked ? 'opacity-60 cursor-not-allowed text-muted-foreground border border-border/60'
                        : 'hover:bg-muted text-muted-foreground border border-border/60'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : locked ? <Lock className="w-3 h-3 text-muted-foreground/60" /> : null}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="hidden md:flex items-center gap-2 shrink-0 text-xs text-muted-foreground font-mono">
                <span>Unit 7 — Graduation Day</span>
              </div>
            </div>
          </div>

          <Card className="shadow-xs border-border">
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
                    onClick={() => setU7ActiveDossierPart(sec.partNumber)}
                    className={`w-7 h-7 rounded text-xs font-bold border transition-all ${
                      u7ActiveDossierPart === sec.partNumber
                        ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                        : 'bg-card hover:bg-muted border-border text-muted-foreground'
                    }`}
                  >
                    {sec.partNumber}
                  </button>
                ))}
              </div>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-6">
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
                      <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 text-rose-950 space-y-1.5">
                        <span className="font-bold text-rose-700 block uppercase tracking-wider font-mono text-[10px]">
                          ✗ Amateur / Incomplete Note (Audit Failure)
                        </span>
                        <p className="leading-relaxed font-mono text-[11px]">{sec.badExample}</p>
                      </div>

                      <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 text-emerald-950 space-y-1.5">
                        <span className="font-bold text-emerald-700 block uppercase tracking-wider font-mono text-[10px]">
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
                        onClick={() => setU7ActiveDossierPart((prev) => Math.max(1, prev - 1))}
                        className="text-xs gap-1 cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        Previous Section
                      </Button>
                      {u7ActiveDossierPart < 8 ? (
                        <Button
                          size="sm"
                          onClick={() => setU7ActiveDossierPart((prev) => prev + 1)}
                          className="text-xs gap-1 font-bold cursor-pointer bg-primary text-primary-foreground"
                        >
                          <span>Next Section (Part {u7ActiveDossierPart + 1})</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => {
                            markChapterDone('unit-7', 1);
                            const el = document.getElementById('unit-7-graduation-card');
                            el?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="text-xs gap-1 font-bold bg-primary text-primary-foreground cursor-pointer"
                        >
                          Proceed to Chapter 7.2: Graduation Briefing 👇
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Final Capstone Graduation Briefing */}
              <div id="unit-7-graduation-card" className="p-6 rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/5 via-card to-card space-y-5 pt-6 text-xs">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Chapter 7.2: Shift Defense &amp; Junior Analyst Graduation
                    </h3>
                    <p className="text-muted-foreground mt-0.5">
                      Present your Case 1 (Phishing Contained) findings to Elena Gomez and receive Rajesh Kumar&apos;s handshake.
                    </p>
                  </div>
                  <Badge className="bg-primary text-primary-foreground font-mono">Graduation</Badge>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 border border-slate-800">
                  <span className="text-sky-400 font-bold block">Your Final Verbal Briefing to Elena Gomez:</span>
                  <p className="leading-relaxed text-slate-300">
                    &ldquo;Alert SEC-2026-0412 was a confirmed Spear Phishing macro attack targeted at Treasury Analyst Michael Chen. EDR terminated PowerShell and firewall blocked C2 callback to 198.51.100.84. Zero system compromise confirmed. Michael&apos;s password was reset, gateway blacklisted the spoofed domain, and Aditya hunted down 47 campaign recipients. All 8 dossier sections have been compiled and signed.&rdquo;
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 text-emerald-950 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-800">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">EG</span>
                    <span>Elena Gomez (SOC Manager) Approval:</span>
                  </div>
                  <p className="leading-relaxed font-sans italic">
                    &ldquo;Flawless presentation, Analyst. You prioritized correctly, coordinated cleanly with Priya and Aditya, and provided audit-grade documentation. You are officially certified as a <strong>Junior SOC Analyst L1</strong>. Welcome to the FinCorp SOC!&rdquo;
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-sky-300 bg-sky-50/50 text-sky-950 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sky-800">
                    <span className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">RK</span>
                    <span>Rajesh Kumar (Senior Mentor) Handshake:</span>
                  </div>
                  <p className="leading-relaxed font-sans italic">
                    &ldquo;You started the week not knowing what a SIEM was. Now you are triaging real alerts, making triage decisions, and routing to the right teams. Shabash, yaar! The real work starts now.&rdquo;
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3" suppressHydrationWarning>
                  {(u7GraduationConfirmed || (mounted && (completedUnits.has('unit-7') || completedUnits.has('unit-7-assessment')))) ? (
                    <Button
                      suppressHydrationWarning
                      onClick={onBackToOverview}
                      className="font-bold text-xs gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg px-6 py-2.5 h-auto cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                      🎓 Certified Junior SOC Analyst L1! Return to Curriculum
                    </Button>
                  ) : (
                    <Button
                      suppressHydrationWarning
                      onClick={() => {
                        setU7GraduationConfirmed(true);
                        handleFinishAssessment('unit-7-assessment', 150);
                      }}
                      className="font-bold text-xs gap-2 bg-primary text-primary-foreground shadow-lg px-6 py-2.5 h-auto cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                      Complete Module 04 & Graduate as Junior SOC Analyst L1 (+150 XP)
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
