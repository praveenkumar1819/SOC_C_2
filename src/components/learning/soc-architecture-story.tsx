'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  ShieldAlert,
  Server,
  Terminal,
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
  UserCheck,
  AlertTriangle,
  Globe,
  Radio,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Search,
  Eye,
  Play,
  Pause,
  Award,
  Lock,
  Layers,
  Cpu,
  Mail,
  HardDrive,
  Network,
  Users,
  Compass,
  Briefcase,
  Workflow,
  Laptop,
  CheckSquare,
  Square,
  Building2,
  PhoneCall,
  Activity,
  Sliders,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  FINCORP_INCIDENT,
  STORY_CHARACTERS,
  SHIFT_TIMELINE_STAGES,
  CHAPTER_1_ROLE_SCENARIOS,
  CHAPTER_2_PROCESS_STAGES,
  CHAPTER_3_CONSOLES,
  CHAPTER_3_TECH_QUESTIONS,
  CHAPTER_4_DATA_FLOW_STEPS,
  CHAPTER_4_VOCAB_CARDS,
  DEMO_SIMULATION_STAGES,
  HANDOVER_TIMELINE_EVENTS,
} from '@/data/modules/soc-architecture-story-data';
import { useProgressStore } from '@/store/progress-store';
import { useAdminConfigStore } from '@/store/admin-config-store';
import { useToast } from '@/components/ui/toast-provider';

interface SocArchitectureStoryProps {
  currentTopicId?: string;
  onSelectTopic: (topicId: string) => void;
  onCompleteTopic: (topicId: string, xpReward: number) => void;
  onCompleteUnitAssessment?: () => void;
  onBackToOverview: () => void;
}

export function SocArchitectureStory({
  currentTopicId = 'topic-1-1',
  onSelectTopic,
  onCompleteTopic,
  onCompleteUnitAssessment,
  onBackToOverview,
}: SocArchitectureStoryProps) {
  const { showToast } = useToast();
  const { completedTopics, completedUnits, completeUnit, addXP } = useProgressStore();
  const { freeNavigationEnabled, unlockedAssessments, xpSystemEnabled } = useAdminConfigStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Active Chapter: 1 (People), 2 (Process), 3 (Technology), 4 (Data Flow), 5 (Final Demo), 6 (Shift Challenge)
  const initialChapterFromTopic = () => {
    switch (currentTopicId) {
      case 'topic-1-1': return 1;
      case 'topic-1-2': return 2;
      case 'topic-1-3': return 3;
      case 'topic-1-4': return 4;
      case 'unit-1-assessment': return 6;
      default: return 1;
    }
  };

  const [activeChapter, setActiveChapter] = useState<number>(initialChapterFromTopic());
  const [showOpeningIntro, setShowOpeningIntro] = useState<boolean>(false);

  // Sync internal chapter when external currentTopicId prop changes
  useEffect(() => {
    if (currentTopicId === 'topic-1-1') setActiveChapter(1);
    else if (currentTopicId === 'topic-1-2') setActiveChapter(2);
    else if (currentTopicId === 'topic-1-3') setActiveChapter(3);
    else if (currentTopicId === 'topic-1-4') {
      setActiveChapter((prev) => (prev === 4 || prev === 5 ? prev : 4));
    } else if (currentTopicId === 'unit-1-assessment') {
      setActiveChapter(6);
    }
  }, [currentTopicId]);

  // Chapter 1 State (People)
  const [activeTokenRouterPath, setActiveTokenRouterPath] = useState<'false-positive' | 'true-positive'>('true-positive');
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, string>>({});
  const [showScenarioExplanation, setShowScenarioExplanation] = useState<Record<string, boolean>>({});

  // Chapter 2 State (Process)
  const [activeProcessStage, setActiveProcessStage] = useState<number>(1);
  const [stage1Claimed, setStage1Claimed] = useState<boolean>(false);
  const [stage2Checklist, setStage2Checklist] = useState<Record<string, boolean>>({
    who: false,
    computer: false,
    parent: false,
    child: false,
    when: false,
  });
  const [stage3Checklist, setStage3Checklist] = useState<Record<string, boolean>>({
    email: false,
    edr: false,
    firewall: false,
  });
  const [stage4Decisions, setStage4Decisions] = useState<Record<string, string>>({});
  const [stage5Form, setStage5Form] = useState<{
    summary: string;
    targetedUser: string;
    successful: string;
    nextRole: string;
  }>({
    summary: '',
    targetedUser: '',
    successful: '',
    nextRole: '',
  });

  // Chapter 3 State (Technology)
  const [selectedConsoleKey, setSelectedConsoleKey] = useState<string>('siem');
  const [currentTechQuestionIndex, setCurrentTechQuestionIndex] = useState<number>(0);
  const [techQuestionAnswers, setTechQuestionAnswers] = useState<Record<string, string>>({});

  // Chapter 4 State (Data Flow)
  const [activeDataFlowStep, setActiveDataFlowStep] = useState<number>(1);
  const [activeVocabCardIndex, setActiveVocabCardIndex] = useState<number>(0);

  // Final Demo State
  const [demoPlaying, setDemoPlaying] = useState<boolean>(false);
  const [demoStage, setDemoStage] = useState<number>(1);
  const [demoSpeed, setDemoSpeed] = useState<number>(1);

  // Interaction completion checks per chapter (progressive unlock)
  const isChapter1Complete = Object.keys(scenarioAnswers).length >= CHAPTER_1_ROLE_SCENARIOS.length;
  const isChapter2Complete = stage1Claimed && Object.values(stage2Checklist).filter(Boolean).length >= 4 && stage3Checklist.email && stage3Checklist.edr && stage3Checklist.firewall && stage5Form.summary.trim().length > 3;
  const isChapter3Complete = Object.keys(techQuestionAnswers).length >= CHAPTER_3_TECH_QUESTIONS.length;
  const isChapter4Complete = activeDataFlowStep >= 2 || activeVocabCardIndex >= 1;
  const isChapter5Complete = demoStage >= 2 || !demoPlaying;

  // Sequential chapter locking: chapter N unlocked as soon as chapter N-1 interactive elements are completed
  const isChapterLocked = (chNum: number): boolean => {
    if (!mounted) return false;
    if (freeNavigationEnabled) return false;
    if (chNum <= 1) return false;
    if (chNum === 2) return !isChapter1Complete && !completedTopics.has('topic-1-1');
    if (chNum === 3) return !isChapter2Complete && !completedTopics.has('topic-1-2');
    if (chNum === 4) return !isChapter3Complete && !completedTopics.has('topic-1-3');
    if (chNum === 5) return !isChapter4Complete && !completedTopics.has('topic-1-4');
    if (chNum === 6) return !isChapter5Complete && !(completedUnits.has('unit-1') || completedUnits.has('unit-1-assessment'));
    return false;
  };

  // Chapter 6 State (Shift Handover Challenge - Elena Gomez)
  const [briefingStoryChoice, setBriefingStoryChoice] = useState<string>('');
  const [briefingRoleChoice, setBriefingRoleChoice] = useState<string>('');
  const [timelineEventOrder, setTimelineEventOrder] = useState<string[]>([
    'evt-2', 'evt-1', 'evt-4', 'evt-3', 'evt-6', 'evt-5', 'evt-7'
  ]);
  const [briefingTechAnswers, setBriefingTechAnswers] = useState<Record<string, string>>({});
  const [briefingEscalationChoice, setBriefingEscalationChoice] = useState<string>('');
  const [handoverSubmitted, setHandoverSubmitted] = useState<boolean>(false);
  const [handoverScore, setHandoverScore] = useState<number>(0);

  // Final Demo timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (demoPlaying) {
      interval = setInterval(() => {
        setDemoStage((prev) => {
          if (prev >= 7) {
            setDemoPlaying(false);
            return 7;
          }
          return prev + 1;
        });
      }, 4500 / demoSpeed);
    }
    return () => clearInterval(interval);
  }, [demoPlaying, demoSpeed]);

  // Topic ID mapping
  const getTopicIdForChapter = (ch: number): string => {
    switch (ch) {
      case 1: return 'topic-1-1';
      case 2: return 'topic-1-2';
      case 3: return 'topic-1-3';
      case 4:
      case 5:
        return 'topic-1-4';
      case 6:
        return 'unit-1-assessment';
      default: return 'topic-1-1';
    }
  };

  const handleAdvanceChapter = (targetCh: number) => {
    const currentTopic = getTopicIdForChapter(activeChapter);
    onCompleteTopic(currentTopic, 35);
    setActiveChapter(targetCh);
    const nextTopic = getTopicIdForChapter(targetCh);
    onSelectTopic(nextTopic);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Timeline header data
  const currentTimeline = SHIFT_TIMELINE_STAGES.find((s) => s.chapter === activeChapter) || SHIFT_TIMELINE_STAGES[0];

  return (
    <div className="w-full space-y-6 pb-20 animate-fade-in font-sans">
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
              u.id === 'unit-1'
                ? 'bg-primary text-primary-foreground shadow-xs ring-1 ring-primary'
                : 'bg-card hover:bg-muted text-muted-foreground border border-border/70 hover:text-foreground'
            }`}
          >
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
              u.id === 'unit-1' ? 'bg-primary-foreground/20 text-primary-foreground font-bold' : 'bg-muted text-muted-foreground'
            }`}>
              {u.num}
            </span>
            <span>{u.label}</span>
          </button>
        ))}
      </div>

      {/* ====================================================
          PERSISTENT CASE FILE STRIP (TOP HEADER)
         ==================================================== */}
      <div className="rounded-2xl border bg-card shadow-sm overflow-hidden sticky top-16 z-20">
        <div className="p-3.5 sm:p-4 bg-slate-950 text-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono font-bold tracking-wider uppercase text-emerald-400">
              YOUR FIRST SHIFT AT FINCORP SOC
            </span>
            <span className="text-slate-500">|</span>
            <Badge variant="outline" className="bg-amber-500/20 text-amber-300 border-amber-500/40 text-[10px] py-0 font-mono">
              Alert ID: {FINCORP_INCIDENT.caseId}
            </Badge>
          </div>

          <div className="flex items-center gap-3 font-mono">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>Shift Time: <strong className="text-white">{currentTimeline.time}</strong></span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowOpeningIntro(true)}
              className="h-6 text-[11px] text-sky-300 hover:text-white px-2 gap-1 border border-sky-500/30"
            >
              <Building2 className="w-3 h-3" />
              Office Layout
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToOverview}
              className="h-6 text-[11px] text-slate-400 hover:text-white px-2"
            >
              Curriculum Tree
            </Button>
          </div>
        </div>

        {/* Case File Metadata Strip */}
        <div className="p-3 bg-slate-900 text-slate-200 text-xs flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>👤 <strong className="text-white">{FINCORP_INCIDENT.targetEmployee}</strong></span>
            <span>💻 Host: <strong className="text-sky-300 font-mono">{FINCORP_INCIDENT.targetHost}</strong></span>
            <span className="hidden sm:inline">⚠️ What: <strong className="text-amber-300">{FINCORP_INCIDENT.alertTitle}</strong></span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            {currentTimeline.title} — <span className="text-slate-300 italic">{currentTimeline.subtitle}</span>
          </div>
        </div>

        {/* Chapter Navigation Tabs */}
        <div className="p-2 sm:p-3 bg-card flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1 sm:gap-2">
            {[
              { num: 1, label: '1. People', topicId: 'topic-1-1' },
              { num: 2, label: '2. Process', topicId: 'topic-1-2' },
              { num: 3, label: '3. Technology', topicId: 'topic-1-3' },
              { num: 4, label: '4. Data Flow', topicId: 'topic-1-4' },
              { num: 5, label: '5. Final Demo', topicId: 'topic-1-4' },
              { num: 6, label: '6. Shift Challenge', topicId: 'unit-1-assessment' },
            ].map((tab) => {
              const isActive = activeChapter === tab.num;
              const isTopicDone = mounted && (
                tab.topicId === 'unit-1-assessment'
                  ? completedUnits.has('unit-1') || completedUnits.has('unit-1-assessment')
                  : completedTopics.has(tab.topicId)
              );
              const isLocked = isChapterLocked(tab.num);

              return (
                <button
                  key={tab.num}
                  suppressHydrationWarning
                  onClick={() => {
                    if (isLocked) {
                      showToast({
                        type: 'warning',
                        title: 'Chapter Locked 🔒',
                        description: 'Complete the previous shift chapter first. (Or enable Free Navigation in Admin)',
                      });
                      return;
                    }
                    setActiveChapter(tab.num);
                    onSelectTopic(tab.topicId);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : isTopicDone
                      ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300'
                      : isLocked
                      ? 'opacity-60 cursor-not-allowed text-muted-foreground'
                      : 'hover:bg-muted text-muted-foreground'
                  }`}
                >
                  {isTopicDone ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  ) : isLocked ? (
                    <Lock className="w-3 h-3 text-muted-foreground/60" />
                  ) : null}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2 shrink-0 text-xs text-muted-foreground font-mono">
            <span>Chapter {activeChapter} of 6</span>
          </div>
        </div>
      </div>

      {/* ====================================================
          MODAL: OFFICE 2D VISUAL LAYOUT & RAJESH'S GREETING
         ==================================================== */}
      {showOpeningIntro && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <Card className="max-w-2xl w-full border-2 border-primary/30 shadow-2xl overflow-hidden bg-slate-950 text-slate-100">
            <CardHeader className="bg-slate-900 border-b border-slate-800 p-4 sm:p-5 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-sky-400" />
                  FinCorp Boston Office — Monday 9:15 AM
                </CardTitle>
                <p className="text-xs text-slate-400 mt-0.5">Welcome to your first shift on the blue team floor</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowOpeningIntro(false)}
                className="text-slate-400 hover:text-white h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-5 text-xs sm:text-sm">
              {/* 2D Office Layout Diagram */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] sm:text-xs text-slate-300 space-y-2">
                <div className="text-sky-400 font-bold">┌─ FINCORP BOSTON HQ // 4TH FLOOR OFFICE ─────────────────┐</div>
                <div className="text-slate-400">│  Commercial Finance Department:                            │</div>
                <div className="text-slate-200">│  [ Michael Chen (PC-047) ]  [ Loan Officers (5 PCs) ]      │</div>
                <div className="text-slate-500">│  ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ │</div>
                <div className="text-amber-400 font-bold">│  SECURITY OPERATIONS CENTRE (SOC ROOM - Glass Wall):      │</div>
                <div className="text-emerald-300 font-semibold">│  [ You (Trainee Desk) ]  [ Rajesh Kumar (L1 Mentor) ]     │</div>
                <div className="text-slate-300">│  [ Big Monitors: Queue Flashing Alert SEC-2026-0412 ]     │</div>
                <div className="text-sky-400 font-bold">└──────────────────────────────────────────────────────────┘</div>
              </div>

              {/* Rajesh's Greeting Dialogue */}
              <div className="flex items-start gap-3.5 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <div className="w-10 h-10 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center shrink-0 shadow-xs">
                  RK
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">Rajesh Kumar</span>
                    <Badge variant="outline" className="text-[10px] text-sky-300 border-sky-400/40">
                      Senior L1 Shift Mentor
                    </Badge>
                  </div>
                  <p className="text-slate-200 leading-relaxed italic font-sans text-xs sm:text-sm">
                    &ldquo;Namaste! Welcome to FinCorp Security Operations Centre. You are new here, yes?
                    Before you start, I am wanting to explain one thing. This office has many employees. Michael Chen, Priya, others. They are using computers, opening emails, downloading files.
                    <br /><br />
                    But we — in the SOC — we are watching. Not watching like surveillance, no! We are watching for danger. For hackers. For bad things happening.
                    This morning, Alert SEC-2026-0412 is just arriving. Something suspicious is happening with Michael Chen&apos;s computer. I will guide you one moment, one step at a time. Chalo, let us begin!&rdquo;
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  onClick={() => setShowOpeningIntro(false)}
                  className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground"
                >
                  <span>Chalo, Start First Shift</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ====================================================
          CHAPTER 1: PEOPLE (WHO IS RESPONDING TO THIS?)
         ==================================================== */}
      {activeChapter === 1 && (
        <section className="space-y-6 animate-fade-in">
          {/* Rajesh Dialogue Hook */}
          <Card className="border-l-4 border-l-sky-500 bg-card/60 shadow-xs">
            <CardContent className="p-5 sm:p-6 space-y-3">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                  RK
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground text-sm">Rajesh Kumar</span>
                    <Badge variant="outline" className="text-[10px] text-sky-700 bg-sky-50 border-sky-200">
                      L1 Shift Mentor
                    </Badge>
                    <span className="text-[11px] text-muted-foreground font-mono">09:20 AM</span>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed italic">
                    &ldquo;You are looking at Alert SEC-2026-0412. First question: <strong>WHO is handling this alert?</strong>
                    You are thinking: &apos;Is it me? Is it someone senior to me?&apos; Yes and no! Everyone in our SOC is having a specific job. Let me show you our 4 levels.&rdquo;
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visual 1: 4-Tier SOC Structure */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3 border-b bg-muted/20">
              <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                The 4-Tier SOC Organisational Structure
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Notice how alerts flow upwards: L1 checks for real danger, L2 contains infections, L3 hunts across all systems, and the Manager briefs executives.
              </p>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3 max-w-2xl mx-auto">
                {/* Tier 4 (Manager) */}
                <div className="p-4 rounded-xl border-2 border-rose-500/30 bg-rose-500/5 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    EG
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-rose-900 dark:text-rose-200">Tier 4: Elena Gomez (SOC Operations Manager)</span>
                      <Badge className="bg-rose-500/20 text-rose-700 dark:text-rose-300 text-[10px]">Business & Regulators</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground italic">&ldquo;Should we inform the CEO? Do we need to call law enforcement and alert our customers?&rdquo;</p>
                    <p className="text-xs text-foreground/80 leading-relaxed font-sans pt-1">
                      <strong>Role in everyday words:</strong> The coordinator. Not doing technical clicks, but understanding business risks and making high-stakes decisions.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center text-muted-foreground font-mono text-xs">▲ Escalates if enterprise business is at risk</div>

                {/* Tier 3 (Hunter) */}
                <div className="p-4 rounded-xl border-2 border-purple-500/30 bg-purple-500/5 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    AD
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-purple-900 dark:text-purple-200">Tier 3: Aditya Deshmukh (L3 Lead Threat Hunter)</span>
                      <Badge className="bg-purple-500/20 text-purple-700 dark:text-purple-300 text-[10px]">Fleet Detective</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground italic">&ldquo;Is this happening on other computers across FinCorp? Is this a coordinated adversary campaign?&rdquo;</p>
                    <p className="text-xs text-foreground/80 leading-relaxed font-sans pt-1">
                      <strong>Role in everyday words:</strong> The master detective. Searches all 500 computers at once for stealthy patterns that basic rules missed.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center text-muted-foreground font-mono text-xs">▲ Escalates if threat spreads beyond one machine</div>

                {/* Tier 2 (Responder) */}
                <div className="p-4 rounded-xl border-2 border-indigo-500/30 bg-indigo-500/5 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    PS
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-indigo-900 dark:text-indigo-200">Tier 2: Priya Sharma (L2 Incident Responder)</span>
                      <Badge className="bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-[10px]">Hands-on Containment</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground italic">&ldquo;How do we stop this threat right now? Is Michael’s laptop infected, and do we reset passwords?&rdquo;</p>
                    <p className="text-xs text-foreground/80 leading-relaxed font-sans pt-1">
                      <strong>Role in everyday words:</strong> The expert doctor. Once you confirm real danger, Priya takes over to cut off the attacker and stop infection.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center text-muted-foreground font-mono text-xs">▲ Escalates if alert shows confirmed malicious danger</div>

                {/* Tier 1 (You) */}
                <div className="p-4 rounded-xl border-2 border-primary bg-primary/10 flex items-start gap-3.5 ring-2 ring-primary/20">
                  <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    YOU
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-primary">Tier 1: YOU & Rajesh Kumar (L1 Triage Analyst)</span>
                      <Badge className="bg-primary text-primary-foreground text-[10px]">Starting Point</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground italic">&ldquo;What is this alert telling me? Is this real danger, or just a false alarm glitch?&rdquo;</p>
                    <p className="text-xs text-foreground/80 leading-relaxed font-sans pt-1">
                      <strong>Role in everyday words:</strong> The first responder. You read the incoming alert, extract the 5 facts, and decide if it is real danger or nothing to worry about.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center text-emerald-600 font-mono text-xs font-bold">▲ Alert Queue (Entry point for all security signals)</div>
              </div>
            </CardContent>
          </Card>

          {/* Visual 2: Interactive Alert Token Router (False Positive vs True Positive) */}
          <Card className="shadow-xs border-2 border-slate-800 bg-slate-950 text-slate-100">
            <CardHeader className="pb-3 border-b border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-sky-400" />
                    Interactive Alert Token Router: False Positive vs. True Positive
                  </CardTitle>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Click each path below to see how the exact same alert token travels depending on your L1 decision.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={activeTokenRouterPath === 'false-positive' ? 'default' : 'outline'}
                    onClick={() => setActiveTokenRouterPath('false-positive')}
                    className="h-8 text-xs font-bold"
                  >
                    Scenario A: False Positive
                  </Button>
                  <Button
                    size="sm"
                    variant={activeTokenRouterPath === 'true-positive' ? 'default' : 'outline'}
                    onClick={() => setActiveTokenRouterPath('true-positive')}
                    className="h-8 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Scenario B: True Positive (Active Attack)
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {activeTokenRouterPath === 'false-positive' ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                    <span className="font-bold text-emerald-400 text-sm block">Path 1: You determine it is a False Alarm (Benign)</span>
                    <p className="text-slate-300 leading-relaxed font-sans">
                      Suppose Michael was just updating his legitimate accounting software plugin that accidentally triggered the rule. You verify the software signature is signed by FinCorp IT.
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center space-y-2 font-mono text-xs">
                    <div className="p-2.5 px-4 rounded-lg bg-slate-800 text-white border border-slate-700">
                      Alert SEC-2026-0412 arrives in Queue
                    </div>
                    <div className="text-sky-400 font-bold">↓ (You claim & inspect telemetry)</div>
                    <div className="p-3 px-5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold">
                      [ YOU (L1) Close Ticket ] ➔ &ldquo;Alert: False Positive. Legitimate IT macro. Closed.&rdquo;
                    </div>
                    <div className="text-emerald-400 font-bold">↓</div>
                    <div className="p-2.5 px-4 rounded-lg bg-slate-900 text-slate-400 border border-slate-800">
                      CASE CLOSED ➔ Priya (L2), Aditya (L3), and Elena (Manager) are never disturbed!
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 italic text-center font-sans">
                    Rajesh: &ldquo;See, yaar? If you verify it is harmless and close it with proof, the investigation stops here. You saved the senior team hours of unnecessary panic.&rdquo;
                  </p>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
                    <span className="font-bold text-amber-300 text-sm block">Path 2: You confirm it is a Real Attack (True Positive)</span>
                    <p className="text-slate-200 leading-relaxed font-sans">
                      You check the sender address: accounts-verification@trusted-vendor.com is FAKE! Word spawned encoded PowerShell. This is real malware.
                    </p>
                  </div>

                  <div className="space-y-3 font-mono text-xs max-w-xl mx-auto">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                      <span>1. Alert arrives in L1 Queue</span>
                      <Badge className="bg-sky-500/20 text-sky-300 text-[10px]">You verify facts</Badge>
                    </div>
                    <div className="text-center text-sky-400 font-bold">↓ Escalated with evidence</div>
                    <div className="p-2.5 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 flex items-center justify-between">
                      <span>2. Priya Sharma (L2) Investigates</span>
                      <span className="text-[11px] font-sans italic">&ldquo;Resetting Michael&apos;s password & blocking domain&rdquo;</span>
                    </div>
                    <div className="text-center text-purple-400 font-bold">↓ Did other employees click?</div>
                    <div className="p-2.5 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-between">
                      <span>3. Aditya Deshmukh (L3) Hunts</span>
                      <span className="text-[11px] font-sans italic">&ldquo;Found 47 other computers with same file!&rdquo;</span>
                    </div>
                    <div className="text-center text-rose-400 font-bold">↓ Banking data at risk</div>
                    <div className="p-2.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 flex items-center justify-between">
                      <span>4. Elena Gomez (Manager) Coordinates</span>
                      <span className="text-[11px] font-sans italic">&ldquo;Briefing CEO & calling Legal / PR teams&rdquo;</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 italic text-center font-sans">
                    Rajesh: &ldquo;This is the chain of command, yaar! It started with you noticing real danger. Without your first review, the whole company would be blind.&rdquo;
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Visual 3: "Who Owns the Next Action?" Interactive Decision Board */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3 border-b bg-muted/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-primary" />
                    Interactive Challenge: &ldquo;Who Owns the Next Action?&rdquo;
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Scenario {currentScenarioIndex + 1} of {CHAPTER_1_ROLE_SCENARIOS.length}: Select which SOC role owns the operational action.
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  {CHAPTER_1_ROLE_SCENARIOS.map((sc, idx) => (
                    <button
                      key={sc.id}
                      onClick={() => setCurrentScenarioIndex(idx)}
                      className={`w-6 h-6 rounded-md text-xs font-bold transition-all ${
                        currentScenarioIndex === idx
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : scenarioAnswers[sc.id]
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-5">
              {(() => {
                const scenario = CHAPTER_1_ROLE_SCENARIOS[currentScenarioIndex];
                const selectedRole = scenarioAnswers[scenario.id];
                const isAnswered = !!selectedRole;
                const isCorrect = selectedRole === scenario.correctRole;

                return (
                  <div className="space-y-4">
                    {/* Situation Box */}
                    <div className="p-4 rounded-xl border bg-slate-900 text-slate-100 space-y-1.5 text-xs font-sans shadow-xs">
                      <span className="text-[10px] uppercase font-mono font-bold text-amber-400">
                        SITUATION SCENARIO #{currentScenarioIndex + 1}:
                      </span>
                      <p className="text-slate-200 text-sm leading-relaxed">{scenario.situation}</p>
                      <p className="text-white font-bold pt-1">{scenario.question}</p>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {scenario.options.map((opt) => {
                        const isThisSelected = selectedRole === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => {
                              setScenarioAnswers((prev) => ({ ...prev, [scenario.id]: opt.id }));
                            }}
                            className={`p-3.5 rounded-xl border text-xs text-left transition-all flex items-start gap-2.5 ${
                              isThisSelected
                                ? opt.id === scenario.correctRole
                                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                                  : 'bg-rose-50 border-rose-500 text-rose-950 font-bold'
                                : 'bg-card hover:bg-muted border-border text-foreground'
                            }`}
                          >
                            <span className="font-bold text-primary font-mono">{opt.id}:</span>
                            <span className="flex-1">{opt.text}</span>
                            {isThisSelected && (
                              opt.id === scenario.correctRole ? (
                                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                              ) : (
                                <X className="w-4 h-4 text-rose-600 shrink-0" />
                              )
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback in Rajesh's Indian English Voice */}
                    {isAnswered && (
                      <div className={`p-4 rounded-xl text-xs space-y-2 border animate-fade-in ${
                        isCorrect
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                          : 'bg-rose-50 border-rose-200 text-rose-950'
                      }`}>
                        <div className="flex items-center gap-2 font-bold text-sm">
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>✅ CORRECT! Rajesh is approving:</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-rose-600" />
                              <span>❌ Not quite yet. Rajesh is coaching:</span>
                            </>
                          )}
                        </div>
                        <p className="italic leading-relaxed font-sans">
                          {isCorrect ? scenario.explanationCorrect : scenario.explanationIncorrect}
                        </p>
                      </div>
                    )}

                    {/* Controls: Reset, Explanation, Next */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setScenarioAnswers((prev) => {
                              const copy = { ...prev };
                              delete copy[scenario.id];
                              return copy;
                            });
                          }}
                          className="text-xs gap-1 font-semibold"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Reset This Challenge
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setShowScenarioExplanation((prev) => ({
                              ...prev,
                              [scenario.id]: !prev[scenario.id],
                            }));
                          }}
                          className="text-xs text-muted-foreground"
                        >
                          {showScenarioExplanation[scenario.id] ? 'Hide Role Guidance' : 'Show Role Guidance'}
                        </Button>
                      </div>

                      {currentScenarioIndex < CHAPTER_1_ROLE_SCENARIOS.length - 1 ? (
                        <Button
                          size="sm"
                          disabled={!isCorrect}
                          onClick={() => setCurrentScenarioIndex((prev) => prev + 1)}
                          className="text-xs font-bold gap-1"
                        >
                          <span>Next Scenario</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                      ) : (
                        <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-300 text-xs font-bold">
                          All 4 Scenarios Ready!
                        </Badge>
                      )}
                    </div>

                    {showScenarioExplanation[scenario.id] && (
                      <div className="p-3.5 rounded-lg bg-muted text-xs text-muted-foreground space-y-1 font-sans">
                        <span className="font-bold text-foreground">Rajesh&apos;s Quick Role Guide:</span>
                        <ul className="list-disc pl-4 space-y-0.5">
                          <li><strong>L1 (You):</strong> First reader. Decide if alert is real danger or false alarm.</li>
                          <li><strong>L2 (Priya):</strong> Expert responder. Stop immediate infection, reset passwords, contain host.</li>
                          <li><strong>L3 (Aditya):</strong> Master hunter. Search all 500 computers for broad adversary campaigns.</li>
                          <li><strong>Manager (Elena):</strong> Business coordinator. Inform CEO, legal team, and customer regulators.</li>
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Chapter Advance Footer */}
              <div className="pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-muted-foreground">
                  {!isChapter1Complete && !completedTopics.has('topic-1-1') && !freeNavigationEnabled ? (
                    <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      Answer all 4 scenarios in the challenge above ({Object.keys(scenarioAnswers).length}/4 completed) to unlock Chapter 2
                    </span>
                  ) : (
                    <span>Takeaway: <strong>You (L1) establish the truth</strong> so Priya, Aditya, and Elena can act without confusion.</span>
                  )}
                </div>
                <Button
                  disabled={!isChapter1Complete && !completedTopics.has('topic-1-1') && !freeNavigationEnabled}
                  onClick={() => handleAdvanceChapter(2)}
                  className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground self-end sm:self-auto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Advance to Chapter 2: Process</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* ====================================================
          CHAPTER 2: PROCESS (WHAT HAPPENS AFTER AN ALERT ARRIVES?)
         ==================================================== */}
      {activeChapter === 2 && (
        <section className="space-y-6 animate-fade-in">
          {/* Rajesh Dialogue Hook */}
          <Card className="border-l-4 border-l-sky-500 bg-card/60 shadow-xs">
            <CardContent className="p-5 sm:p-6 space-y-3">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                  RK
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground text-sm">Rajesh Kumar</span>
                    <Badge variant="outline" className="text-[10px] text-sky-700 bg-sky-50 border-sky-200">
                      L1 Shift Mentor
                    </Badge>
                    <span className="text-[11px] text-muted-foreground font-mono">09:24 AM</span>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed italic">
                    &ldquo;Now you are understanding the people. But a SOC is not just people. It is also <strong>Process</strong>. Like a recipe in cooking, yes? If you do not follow the recipe step-by-step, the food comes out burnt! In our SOC, we follow a 5-stage process so we never skip evidence or panic. Watch how we move from receiving the alert to documenting our conclusion.&rdquo;
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visual 1: 5-Stage Process Stepper */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3 border-b bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-primary" />
                  The 5-Stage Operational Triage Pipeline
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Click each stage below to step through Rajesh&apos;s thought process on Alert SEC-2026-0412.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveProcessStage(1);
                  setStage1Claimed(false);
                  setStage2Checklist({ who: false, computer: false, parent: false, child: false, when: false });
                  setStage3Checklist({ email: false, edr: false, firewall: false });
                  setStage4Decisions({});
                  setStage5Form({ summary: '', targetedUser: '', successful: '', nextRole: '' });
                }}
                className="text-xs gap-1.5 self-start sm:self-auto h-8 text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset to Stage 1
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Stepper Header Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {CHAPTER_2_PROCESS_STAGES.map((s) => {
                  const isCurrent = activeProcessStage === s.order;
                  return (
                    <button
                      key={s.order}
                      onClick={() => setActiveProcessStage(s.order)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        isCurrent
                          ? 'bg-primary text-primary-foreground border-primary shadow-xs font-bold'
                          : 'bg-card hover:bg-muted border-border text-foreground font-semibold'
                      }`}
                    >
                      <span className="text-[10px] block opacity-75 font-mono">Stage {s.order}</span>
                      <span className="text-xs truncate block">{s.stageName}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Deep-Dive */}
              {(() => {
                const stage = CHAPTER_2_PROCESS_STAGES.find((s) => s.order === activeProcessStage)!;
                return (
                  <div className="p-5 sm:p-6 rounded-2xl border bg-slate-950 text-slate-100 space-y-5 shadow-sm animate-fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-sky-400 font-bold block">
                          Stage {stage.order} of 5 — {stage.timestamp}
                        </span>
                        <h4 className="text-base font-bold text-white mt-0.5">{stage.stageName}: {stage.tagline}</h4>
                      </div>
                      <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs w-fit">
                        FinCorp SOP 04.2
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block font-mono">
                          What You See (Raw Telemetry)
                        </span>
                        <p className="text-slate-200 leading-relaxed">{stage.whatYouSee}</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 block font-mono">
                          What You Think (Analyst Mindset)
                        </span>
                        <p className="text-slate-200 leading-relaxed italic">{stage.whatYouThink}</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block font-mono">
                          What You Do (Concrete Action)
                        </span>
                        <p className="text-slate-200 leading-relaxed">{stage.whatYouDo}</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block font-mono">
                          Why It Matters (Operational Impact)
                        </span>
                        <p className="text-slate-200 leading-relaxed">{stage.whyItMatters}</p>
                      </div>
                    </div>

                    {/* Interactive Stage Actions */}
                    {stage.order === 1 && (
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                        <span className="font-bold text-white text-xs block">Hands-on Action for Stage 1:</span>
                        {!stage1Claimed ? (
                          <Button
                            onClick={() => {
                              setStage1Claimed(true);
                              showToast({
                                type: 'success',
                                title: 'Alert Claimed! 🎯',
                                description: 'You have accepted ownership of Alert SEC-2026-0412. Your 15-minute investigation timer has started.',
                              });
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Click to Accept & Claim Alert SEC-2026-0412</span>
                          </Button>
                        ) : (
                          <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between">
                            <span>✅ Ticket Assigned to YOU. SLA Clock: 14m 20s remaining.</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setStage1Claimed(false)}
                              className="text-xs text-slate-400 hover:text-white h-7 px-2"
                            >
                              Reset Claim
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {stage.order === 2 && (
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-xs">Stage 2 Checklist: Confirm 5 Extracted Anchors</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setStage2Checklist({ who: false, computer: false, parent: false, child: false, when: false })}
                            className="text-[11px] text-slate-400 hover:text-white h-6 px-2"
                          >
                            Reset Checklist
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {[
                            { key: 'who', label: 'User: mchen (Michael Chen, Finance Analyst)' },
                            { key: 'computer', label: 'Computer: FIN-BOS-MCHEN-047' },
                            { key: 'parent', label: 'Parent Program: WINWORD.EXE (Microsoft Word)' },
                            { key: 'child', label: 'Child Program: powershell.exe -enc AQBB...' },
                            { key: 'when', label: 'Timestamp: 09:19:58 AM (Monday)' },
                          ].map((item) => (
                            <button
                              key={item.key}
                              onClick={() => {
                                setStage2Checklist((prev) => ({ ...prev, [item.key]: !prev[item.key] }));
                              }}
                              className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-all ${
                                stage2Checklist[item.key]
                                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-semibold'
                                  : 'bg-slate-800 border-slate-700 text-slate-300'
                              }`}
                            >
                              {stage2Checklist[item.key] ? (
                                <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-500 shrink-0" />
                              )}
                              <span>{item.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {stage.order === 3 && (
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-xs">Stage 3 Proof Check (&ldquo;Praman Lena&rdquo;): Verify 3 Cameras</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setStage3Checklist({ email: false, edr: false, firewall: false })}
                            className="text-[11px] text-slate-400 hover:text-white h-6 px-2"
                          >
                            Reset Proof Check
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                          {[
                            { key: 'email', title: 'Camera 1: Email Gateway', desc: 'Fake sender accounts-verification@trusted-vendor.com delivering .docm' },
                            { key: 'edr', title: 'Camera 2: EDR Sensor', desc: 'Process tree shows Word launching PowerShell, terminated by sensor' },
                            { key: 'firewall', title: 'Camera 3: Firewall Log', desc: 'Outbound TCP connection to 198.51.100.84 blocked at perimeter' },
                          ].map((cam) => (
                            <button
                              key={cam.key}
                              onClick={() => setStage3Checklist((prev) => ({ ...prev, [cam.key]: !prev[cam.key] }))}
                              className={`p-3 rounded-lg border text-left space-y-1 transition-all ${
                                stage3Checklist[cam.key]
                                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200'
                                  : 'bg-slate-800 border-slate-700 text-slate-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold">{cam.title}</span>
                                {stage3Checklist[cam.key] && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                              </div>
                              <p className="text-[11px] text-slate-400 leading-tight">{cam.desc}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {stage.order === 4 && (
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">Stage 4 Decisions: What Containment is Appropriate?</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setStage4Decisions({})}
                            className="text-[11px] text-slate-400 hover:text-white h-6 px-2"
                          >
                            Reset Decisions
                          </Button>
                        </div>
                        <div className="space-y-2.5">
                          <div>
                            <p className="text-slate-300 font-semibold mb-1">1. Should we reset Michael Chen’s Active Directory password?</p>
                            <div className="flex gap-2">
                              {['Yes, immediately. Attacker might know it.', 'No, wait until shift ends.'].map((opt) => (
                                <button
                                  key={opt}
                                  onClick={() => setStage4Decisions((prev) => ({ ...prev, pwd: opt }))}
                                  className={`p-2 rounded-lg border text-left text-xs transition-all ${
                                    stage4Decisions.pwd === opt
                                      ? opt.startsWith('Yes')
                                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold'
                                        : 'bg-rose-500/20 border-rose-400 text-rose-200'
                                      : 'bg-slate-800 border-slate-700 text-slate-300'
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-slate-300 font-semibold mb-1">2. Who hunts for this malicious attachment across all 500 computers?</p>
                            <div className="flex gap-2">
                              {['Aditya Deshmukh (L3 Lead Hunter)', 'You (L1) check one-by-one'].map((opt) => (
                                <button
                                  key={opt}
                                  onClick={() => setStage4Decisions((prev) => ({ ...prev, hunt: opt }))}
                                  className={`p-2 rounded-lg border text-left text-xs transition-all ${
                                    stage4Decisions.hunt === opt
                                      ? opt.startsWith('Aditya')
                                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold'
                                        : 'bg-rose-500/20 border-rose-400 text-rose-200'
                                      : 'bg-slate-800 border-slate-700 text-slate-300'
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {stage.order === 5 && (
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">Stage 5 Case Record: Build the Handover Record</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setStage5Form({ summary: '', targetedUser: '', successful: '', nextRole: '' })}
                            className="text-[11px] text-slate-400 hover:text-white h-6 px-2"
                          >
                            Reset Case Form
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-slate-300 font-semibold block mb-1">1-Sentence Threat Summary:</label>
                            <select
                              value={stage5Form.summary}
                              onChange={(e) => setStage5Form((prev) => ({ ...prev, summary: e.target.value }))}
                              className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                            >
                              <option value="">-- Select Summary --</option>
                              <option value="correct">Spear-phishing email with Office macro executing PowerShell blocked by EDR</option>
                              <option value="incorrect">Some weird glitch happened on a finance laptop</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-slate-300 font-semibold block mb-1">Targeted Account:</label>
                            <select
                              value={stage5Form.targetedUser}
                              onChange={(e) => setStage5Form((prev) => ({ ...prev, targetedUser: e.target.value }))}
                              className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                            >
                              <option value="">-- Select User --</option>
                              <option value="correct">mchen (Michael Chen, Senior Finance Analyst)</option>
                              <option value="incorrect">Unknown Guest User</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-slate-300 font-semibold block mb-1">Was Infection Successful?</label>
                            <select
                              value={stage5Form.successful}
                              onChange={(e) => setStage5Form((prev) => ({ ...prev, successful: e.target.value }))}
                              className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                            >
                              <option value="">-- Select Status --</option>
                              <option value="correct">No, EDR sensor terminated PowerShell in 1.1s</option>
                              <option value="incorrect">Yes, ransomware encrypted all files</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-slate-300 font-semibold block mb-1">Who is Assigned Next?</label>
                            <select
                              value={stage5Form.nextRole}
                              onChange={(e) => setStage5Form((prev) => ({ ...prev, nextRole: e.target.value }))}
                              className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                            >
                              <option value="">-- Select Next Role --</option>
                              <option value="correct">Priya Sharma (L2 Incident Responder)</option>
                              <option value="incorrect">Close ticket without notifying anyone</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Advance Footer */}
              <div className="pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveChapter(1)}
                  className="text-xs gap-1 font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Chapter 1: People
                </Button>
                {!isChapter2Complete && !completedTopics.has('topic-1-2') && !freeNavigationEnabled ? (
                  <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    Complete all 5 stages of the process flow above to unlock Chapter 3
                  </span>
                ) : null}
                <Button
                  disabled={!isChapter2Complete && !completedTopics.has('topic-1-2') && !freeNavigationEnabled}
                  onClick={() => handleAdvanceChapter(3)}
                  className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Advance to Chapter 3: Technology</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* ====================================================
          CHAPTER 3: TECHNOLOGY (WHAT TOOLS HELP THE TEAM?)
         ==================================================== */}
      {activeChapter === 3 && (
        <section className="space-y-6 animate-fade-in">
          {/* Rajesh Dialogue Hook */}
          <Card className="border-l-4 border-l-sky-500 bg-card/60 shadow-xs">
            <CardContent className="p-5 sm:p-6 space-y-3">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                  RK
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground text-sm">Rajesh Kumar</span>
                    <Badge variant="outline" className="text-[10px] text-sky-700 bg-sky-50 border-sky-200">
                      L1 Shift Mentor
                    </Badge>
                    <span className="text-[11px] text-muted-foreground font-mono">09:26 AM</span>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed italic">
                    &ldquo;Now I am explaining the tools. We are investigating an alert. That alert is not coming out of nowhere. It is coming from <strong>five cameras watching FinCorp</strong>. Each camera sees something different: one watches emails, one watches laptop programs, one watches network traffic. When an alert fires, we open these cameras. Let me show you on this workstation.&rdquo;
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visual 1: Workstation 5-Console Switcher */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3 border-b bg-muted/20">
              <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                <Laptop className="w-4 h-4 text-primary" />
                FinCorp SOC Analyst Workstation: Tool Console Switcher
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Click any of the 5 console monitors below to inspect its live data and see what question it solves.
              </p>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* 5 Monitors Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {[
                  { key: 'email', label: 'Email Gateway', icon: Mail, analogy: 'Mail Inspector' },
                  { key: 'edr', label: 'EDR Console', icon: HardDrive, analogy: 'Laptop CCTV' },
                  { key: 'siem', label: 'SIEM Console', icon: Activity, analogy: 'Control Room' },
                  { key: 'firewall', label: 'Firewall Console', icon: Network, analogy: 'Border Guard' },
                  { key: 'case', label: 'Case Management', icon: FileText, analogy: 'Notebook' },
                ].map((tool) => {
                  const Icon = tool.icon;
                  const isSelected = selectedConsoleKey === tool.key;
                  return (
                    <button
                      key={tool.key}
                      onClick={() => setSelectedConsoleKey(tool.key)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-primary text-primary-foreground border-primary shadow-xs font-bold'
                          : 'bg-card hover:bg-muted border-border text-foreground'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mx-auto mb-1 ${isSelected ? 'text-white' : 'text-primary'}`} />
                      <span className="text-xs block font-bold truncate">{tool.label}</span>
                      <span className="text-[10px] block opacity-75 font-mono">{tool.analogy}</span>
                    </button>
                  );
                })}
              </div>

              {/* Console Screen Preview */}
              {(() => {
                const consoleData = CHAPTER_3_CONSOLES[selectedConsoleKey];
                return (
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 text-slate-100 border border-slate-800 space-y-4 shadow-sm animate-fade-in font-mono text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-white font-bold">{consoleData.consoleHeader}</span>
                      </div>
                      <Badge variant="outline" className="bg-slate-900 text-sky-300 border-sky-500/30 text-[10px] w-fit">
                        {consoleData.badge}
                      </Badge>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 space-y-1 font-sans text-xs">
                      <span className="text-sky-400 font-bold font-mono uppercase text-[10px] block">Everyday Analogy:</span>
                      <p className="text-white font-semibold">{consoleData.analogy}</p>
                      <p className="text-slate-400">{consoleData.description}</p>
                    </div>

                    {/* Telemetry Key-Value Pairs */}
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5 text-slate-200">
                      {Object.entries(consoleData.records).map(([key, val]) => (
                        <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800/60 pb-1 last:border-0">
                          <span className="text-slate-400">{key}:</span>
                          <span className="text-white font-semibold">{String(val)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-200 font-sans text-xs italic">
                      {consoleData.insight}
                    </div>
                  </div>
                );
              })()}

              {/* Visual 2: "Which Tool Solves What?" Practice */}
              <div className="p-5 rounded-2xl border bg-card space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                  <div>
                    <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-primary" />
                      Practice Challenge: &ldquo;Which Tool Solves What?&rdquo;
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Question {currentTechQuestionIndex + 1} of {CHAPTER_3_TECH_QUESTIONS.length}: Select which of the 5 tools answers this security question.
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {CHAPTER_3_TECH_QUESTIONS.map((tq, i) => (
                      <button
                        key={tq.id}
                        onClick={() => setCurrentTechQuestionIndex(i)}
                        className={`w-6 h-6 rounded-md text-xs font-bold transition-all ${
                          currentTechQuestionIndex === i
                            ? 'bg-primary text-primary-foreground'
                            : techQuestionAnswers[tq.id]
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {(() => {
                  const q = CHAPTER_3_TECH_QUESTIONS[currentTechQuestionIndex];
                  const chosenAnswer = techQuestionAnswers[q.id];
                  const isAnswered = !!chosenAnswer;
                  const isCorrect = chosenAnswer === q.correctTool;

                  return (
                    <div className="space-y-4 text-xs font-sans">
                      <div className="p-4 rounded-xl bg-slate-900 text-slate-100 space-y-1">
                        <span className="text-[10px] uppercase font-mono font-bold text-amber-400">
                          SCENARIO #{currentTechQuestionIndex + 1}:
                        </span>
                        <p className="text-slate-200 text-sm leading-relaxed">{q.scenarioText}</p>
                        <p className="text-white font-bold pt-1">{q.question}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt) => {
                          const isThisChosen = chosenAnswer === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => {
                                setTechQuestionAnswers((prev) => ({ ...prev, [q.id]: opt.id }));
                              }}
                              className={`p-3 rounded-xl border text-left transition-all ${
                                isThisChosen
                                  ? opt.id === q.correctTool
                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                                    : 'bg-rose-50 border-rose-500 text-rose-950 font-bold'
                                  : 'bg-card hover:bg-muted border-border text-foreground'
                              }`}
                            >
                              <span className="font-bold text-primary font-mono block mb-0.5">{opt.id}</span>
                              <span className="text-muted-foreground">{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>

                      {isAnswered && (
                        <div className={`p-4 rounded-xl space-y-1 border animate-fade-in ${
                          isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
                        }`}>
                          <div className="flex items-center gap-2 font-bold text-sm">
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span>Rajesh: “Yes, exactly!”</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-4 h-4 text-rose-600" />
                                <span>Rajesh: “Think about where data lives!”</span>
                              </>
                            )}
                          </div>
                          <p className="italic leading-relaxed">
                            {isCorrect ? q.correctFeedback : q.incorrectFeedback}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setTechQuestionAnswers((prev) => {
                              const copy = { ...prev };
                              delete copy[q.id];
                              return copy;
                            });
                          }}
                          className="text-xs gap-1"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Reset Question
                        </Button>

                        {currentTechQuestionIndex < CHAPTER_3_TECH_QUESTIONS.length - 1 ? (
                          <Button
                            size="sm"
                            disabled={!isCorrect}
                            onClick={() => setCurrentTechQuestionIndex((prev) => prev + 1)}
                            className="text-xs font-bold gap-1"
                          >
                            <span>Next Question</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Button>
                        ) : (
                          <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-300 text-xs font-bold">
                            All 5 Questions Answered!
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Advance Footer */}
              <div className="pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveChapter(2)}
                  className="text-xs gap-1 font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Chapter 2: Process
                </Button>
                {!isChapter3Complete && !completedTopics.has('topic-1-3') && !freeNavigationEnabled ? (
                  <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    Answer all 5 tool questions above ({Object.keys(techQuestionAnswers).length}/5 completed) to unlock Chapter 4
                  </span>
                ) : null}
                <Button
                  disabled={!isChapter3Complete && !completedTopics.has('topic-1-3') && !freeNavigationEnabled}
                  onClick={() => handleAdvanceChapter(4)}
                  className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Advance to Chapter 4: Data Flow</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* ====================================================
          CHAPTER 4: DATA FLOW (HOW DID THE ALERT REACH THE SOC?)
         ==================================================== */}
      {activeChapter === 4 && (
        <section className="space-y-6 animate-fade-in">
          {/* Rajesh Dialogue Hook */}
          <Card className="border-l-4 border-l-sky-500 bg-card/60 shadow-xs">
            <CardContent className="p-5 sm:p-6 space-y-3">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                  RK
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground text-sm">Rajesh Kumar</span>
                    <Badge variant="outline" className="text-[10px] text-sky-700 bg-sky-50 border-sky-200">
                      L1 Shift Mentor
                    </Badge>
                    <span className="text-[11px] text-muted-foreground font-mono">09:27 AM</span>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed italic">
                    &ldquo;Now I am showing you the journey of this alert. How does it come to you? Imagine a river. A river has a source in the mountains, flows through a channel, and reaches the ocean. An alert also has a journey: source (Michael&apos;s laptop), channels (forwarders & SIEM), destination (your triage queue). Let me trace all 6 steps for you.&rdquo;
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visual 1: 6-Stage Telemetry Evidence Lifecycle */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3 border-b bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-primary" />
                  The 6-Stage Telemetry Evidence Lifecycle
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Click each stage below to follow the 47-second journey from Michael Chen&apos;s double-click to your queue.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveDataFlowStep(1)}
                className="text-xs gap-1.5 self-start sm:self-auto h-8 text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset to Step 1
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Stepper Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                {CHAPTER_4_DATA_FLOW_STEPS.map((step) => {
                  const isCurrent = activeDataFlowStep === step.stepNumber;
                  return (
                    <button
                      key={step.stepNumber}
                      onClick={() => setActiveDataFlowStep(step.stepNumber)}
                      className={`p-2.5 rounded-xl border text-center transition-all text-xs font-semibold ${
                        isCurrent
                          ? 'bg-primary text-primary-foreground border-primary shadow-xs font-bold'
                          : 'bg-card hover:bg-muted border-border text-foreground'
                      }`}
                    >
                      <span className="text-[10px] block opacity-75 font-mono">Step {step.stepNumber}</span>
                      <span className="truncate block">{step.stageName}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Step Deep-Dive */}
              {(() => {
                const step = CHAPTER_4_DATA_FLOW_STEPS.find((s) => s.stepNumber === activeDataFlowStep)!;
                return (
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 text-slate-100 border border-slate-800 space-y-4 shadow-sm animate-fade-in font-sans text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-sky-400 font-bold block">
                          Stage {step.stepNumber} of 6 — Time Window: {step.timeWindow}
                        </span>
                        <h4 className="text-base font-bold text-white mt-0.5">{step.title}</h4>
                      </div>
                      <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs w-fit">
                        {step.tokenLabel}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-[10px] uppercase font-mono font-bold text-amber-400 block">What Happens:</span>
                        <p className="text-slate-200 leading-relaxed">{step.whatHappens}</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-[10px] uppercase font-mono font-bold text-sky-400 block">What Is Recorded:</span>
                        <p className="text-slate-200 leading-relaxed font-mono text-[11px]">{step.whatIsRecorded}</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-sky-200 italic">
                      Rajesh: {step.rajeshExplanation}
                    </div>
                  </div>
                );
              })()}

              {/* Visual 2: 6 Vocabulary Clarity Cards */}
              <div className="p-5 rounded-2xl border bg-card space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                  <div>
                    <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                      <Compass className="w-4 h-4 text-primary" />
                      Vocabulary Clarity Cards: Everyday Real-World Analogies
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Card {activeVocabCardIndex + 1} of {CHAPTER_4_VOCAB_CARDS.length}: Master the subtle differences between core terms.
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {CHAPTER_4_VOCAB_CARDS.map((vc, idx) => (
                      <button
                        key={vc.id}
                        onClick={() => setActiveVocabCardIndex(idx)}
                        className={`w-6 h-6 rounded-md text-xs font-bold transition-all ${
                          activeVocabCardIndex === idx
                            ? 'bg-primary text-primary-foreground shadow-xs'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {(() => {
                  const card = CHAPTER_4_VOCAB_CARDS[activeVocabCardIndex];
                  return (
                    <div className="p-5 rounded-xl border bg-slate-900 text-slate-100 space-y-4 animate-fade-in text-xs font-sans">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="font-bold text-base text-white">{card.title}</span>
                        <Badge variant="outline" className="text-slate-400 border-slate-700 text-[10px]">
                          Card #{card.id}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                          <span className="font-bold text-sky-400 text-sm block">{card.termA}</span>
                          <p className="text-slate-300 leading-relaxed">{card.defA}</p>
                        </div>
                        <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                          <span className="font-bold text-purple-400 text-sm block">{card.termB}</span>
                          <p className="text-slate-300 leading-relaxed">{card.defB}</p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-1">
                        <span className="font-bold text-[11px] uppercase tracking-wider block font-mono">
                          Everyday Life Analogy:
                        </span>
                        <p className="leading-relaxed italic">{card.analogy}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={activeVocabCardIndex <= 0}
                          onClick={() => setActiveVocabCardIndex((prev) => Math.max(0, prev - 1))}
                          className="text-xs gap-1"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          Previous Card
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setActiveVocabCardIndex(0)}
                          disabled={activeVocabCardIndex === 0}
                          className="text-xs gap-1 text-muted-foreground hover:text-foreground"
                        >
                          <RotateCcw className="w-3 h-3" />
                          Reset to Card 1
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={activeVocabCardIndex >= CHAPTER_4_VOCAB_CARDS.length - 1}
                          onClick={() => setActiveVocabCardIndex((prev) => Math.min(CHAPTER_4_VOCAB_CARDS.length - 1, prev + 1))}
                          className="text-xs gap-1"
                        >
                          <span>Next Card</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Advance Footer */}
              <div className="pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveChapter(3)}
                  className="text-xs gap-1 font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Chapter 3: Technology
                </Button>
                <Button
                  onClick={() => handleAdvanceChapter(5)}
                  className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer"
                >
                  <span>Advance to Chapter 5: Live Demo</span>
                  <Play className="w-3.5 h-3.5 fill-white" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* ====================================================
          FINAL DEMO: SOC ARCHITECTURE IN MOTION
         ==================================================== */}
      {activeChapter === 5 && (
        <section className="space-y-6 animate-fade-in">
          <Card className="shadow-sm border-2 border-primary/20">
            <CardHeader className="pb-3 border-b bg-muted/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px] font-bold uppercase mb-1">
                    Payoff Demonstration
                  </Badge>
                  <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Workflow className="w-5 h-5 text-primary" />
                    SOC Architecture in Motion: Alert SEC-2026-0412
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Watch how People, Process, Technology, and Data Flow unite during the lifecycle of the attack.
                  </p>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={demoPlaying ? 'destructive' : 'default'}
                    onClick={() => setDemoPlaying(!demoPlaying)}
                    className="h-8 text-xs font-bold gap-1.5"
                  >
                    {demoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>{demoPlaying ? 'Pause Demo' : 'Play Live Demo'}</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setDemoStage(1);
                      setDemoPlaying(false);
                    }}
                    className="h-8 text-xs gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset
                  </Button>
                  <div className="flex items-center border rounded-lg overflow-hidden bg-background text-xs font-mono">
                    {[1, 1.5, 2].map((sp) => (
                      <button
                        key={sp}
                        onClick={() => setDemoSpeed(sp)}
                        className={`px-2 py-1 ${demoSpeed === sp ? 'bg-primary text-primary-foreground font-bold' : 'hover:bg-muted text-muted-foreground'}`}
                      >
                        {sp}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Stepper Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-7 gap-1.5 text-xs font-semibold">
                {DEMO_SIMULATION_STAGES.map((s) => (
                  <button
                    key={s.stage}
                    onClick={() => {
                      setDemoStage(s.stage);
                      setDemoPlaying(false);
                    }}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      demoStage === s.stage
                        ? 'bg-primary text-primary-foreground border-primary font-bold shadow-xs'
                        : 'bg-card hover:bg-muted border-border text-foreground'
                    }`}
                  >
                    <span className="text-[10px] block opacity-75 font-mono">{s.timestamp.split(' ')[0]}</span>
                    <span className="truncate block">{s.title.split('. ')[1]}</span>
                  </button>
                ))}
              </div>

              {/* Active Stage Simulation Canvas */}
              {(() => {
                const currentSim = DEMO_SIMULATION_STAGES.find((s) => s.stage === demoStage)!;
                return (
                  <div className="p-6 rounded-2xl bg-slate-950 text-slate-100 border border-slate-800 space-y-5 shadow-md font-sans text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-sky-400 font-bold block">
                          Simulation Timeline: {currentSim.timestamp}
                        </span>
                        <h4 className="text-base font-bold text-white mt-0.5">{currentSim.title}</h4>
                      </div>
                      <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs w-fit">
                        Stage {demoStage} of 7
                      </Badge>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <span className="text-amber-400 font-bold font-mono text-[10px] uppercase block">Visual Incident Event:</span>
                      <p className="text-slate-200 text-sm leading-relaxed">{currentSim.visualSummary}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-200 space-y-1 italic text-xs">
                      <span className="font-bold text-white font-mono not-italic block">Rajesh Kumar Narration:</span>
                      <p>{currentSim.rajeshDialogue}</p>
                    </div>

                    {/* Telemetry Inspector */}
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                      <span className="text-emerald-400 font-bold font-mono text-[10px] uppercase block">
                        Interactive Telemetry Inspector ({currentSim.inspectorTitle}):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                        {Object.entries(currentSim.inspectorDetails).map(([k, v]) => (
                          <div key={k} className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                            <span className="text-slate-400">{k}:</span>
                            <span className="text-slate-200 font-semibold truncate max-w-[200px]">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Full Architecture Summary */}
              <div className="p-5 rounded-2xl bg-card border space-y-3 text-xs font-sans">
                <h4 className="font-bold text-sm text-foreground">Summary: The Complete SOC Architecture</h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-muted/40 border space-y-1">
                    <span className="font-bold text-primary block">1. PEOPLE</span>
                    <p className="text-muted-foreground">You (L1) ➔ Priya (L2) ➔ Aditya (L3) ➔ Elena (Manager)</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/40 border space-y-1">
                    <span className="font-bold text-primary block">2. PROCESS</span>
                    <p className="text-muted-foreground">Receive ➔ Understand ➔ Investigate ➔ Document ➔ Escalate</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/40 border space-y-1">
                    <span className="font-bold text-primary block">3. TECHNOLOGY</span>
                    <p className="text-muted-foreground">Email Gateway + EDR + Firewall ➔ SIEM ➔ Case Mgmt</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/40 border space-y-1">
                    <span className="font-bold text-primary block">4. DATA FLOW</span>
                    <p className="text-muted-foreground">Activity ➔ Event ➔ Forwarding ➔ SIEM ➔ Alert ➔ Case</p>
                  </div>
                </div>
              </div>

              {/* Advance Footer */}
              <div className="pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveChapter(4)}
                  className="text-xs gap-1 font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Chapter 4: Data Flow
                </Button>
                <Button
                  onClick={() => handleAdvanceChapter(6)}
                  className="font-bold text-xs gap-1.5 bg-rose-600 hover:bg-rose-700 text-white shadow-xs cursor-pointer"
                >
                  <span>Advance to Chapter 6: Shift Challenge</span>
                  <Award className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* ====================================================
          CHAPTER 6: SHIFT HANDOVER CHALLENGE (ELENA GOMEZ)
         ==================================================== */}
      {activeChapter === 6 && (
        <section className="space-y-6 animate-fade-in">
          {/* Elena Gomez Dialogue Hook */}
          <Card className="border-l-4 border-l-rose-600 bg-card/60 shadow-xs">
            <CardContent className="p-5 sm:p-6 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                  EG
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground text-sm">Elena Gomez</span>
                    <Badge variant="outline" className="text-[10px] text-rose-700 bg-rose-50 border-rose-200 font-bold">
                      SOC Operations Manager
                    </Badge>
                    <span className="text-[11px] text-muted-foreground font-mono">09:30 AM (End of Briefing Period)</span>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed italic">
                    &ldquo;Good morning. You are the new L1 analyst, yes? Rajesh is telling me you have just finished understanding how our SOC is working. Before you start your real shift, I am wanting to test your understanding. I am asking you 5 questions about Alert SEC-2026-0412: <strong>the story, the role, the process, the technology, and the escalation decision</strong>. Pass this briefing, and you are officially certified on SOC Architecture!&rdquo;
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practical 5-Question Briefing Challenge */}
          <Card className="shadow-xs border-2 border-primary/20">
            <CardHeader className="pb-3 border-b bg-muted/20">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    Unit 1 Shift Handover Challenge: Elena Gomez Briefing
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Answer all 5 questions below to deliver an executive-grade architectural handover. Passing Score: 75%.
                  </p>
                </div>
                <Badge variant="outline" className="font-mono text-xs">
                  Passing Score: 75%
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6 text-xs font-sans">
              {/* Question 1: The Story */}
              <div className="p-4 rounded-xl border bg-card space-y-2">
                <span className="font-bold text-sm text-primary block">
                  Question 1 (The Story): What happened in Alert SEC-2026-0412?
                </span>
                <p className="text-muted-foreground">
                  Elena: &ldquo;Tell me, in your own words, what is Alert SEC-2026-0412 about? Not just technical noise, but the real story!&rdquo;
                </p>
                <div className="space-y-2 pt-1">
                  {[
                    {
                      id: 'story-correct',
                      text: 'A fake invoice email was delivered to Senior Finance Analyst Michael Chen. When he opened the attachment, hidden macro code tried to run PowerShell to contact an external server. EDR sensor stopped the command, protecting our finance systems.',
                      isCorrect: true,
                    },
                    {
                      id: 'story-technical',
                      text: 'Office-to-PowerShell Execution Pattern detection rule fired with priority Medium on host FIN-BOS-MCHEN-047 at 09:19:58 AM.',
                      isCorrect: false,
                    },
                    {
                      id: 'story-vague',
                      text: 'A weird computer glitch happened on Michael’s desktop, but we rebooted the PC.',
                      isCorrect: false,
                    },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => !handoverSubmitted && setBriefingStoryChoice(opt.id)}
                      className={`p-3 rounded-lg border text-left w-full transition-all flex items-start gap-2 ${
                        briefingStoryChoice === opt.id
                          ? handoverSubmitted
                            ? opt.isCorrect
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                              : 'bg-rose-50 border-rose-500 text-rose-950'
                            : 'bg-primary/10 border-primary text-foreground font-semibold'
                          : 'bg-card hover:bg-muted border-border text-muted-foreground'
                      }`}
                    >
                      <span className="mt-0.5">{briefingStoryChoice === opt.id ? '🔘' : '⚪'}</span>
                      <span className="flex-1">{opt.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: The Role */}
              <div className="p-4 rounded-xl border bg-card space-y-2">
                <span className="font-bold text-sm text-primary block">
                  Question 2 (The Role): Who is owning this alert right now?
                </span>
                <p className="text-muted-foreground">
                  Elena: &ldquo;L1 investigation is finished. Who is responsible for the next containment actions?&rdquo;
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {[
                    { id: 'role-l1', text: 'You (L1) — Keep investigating', isCorrect: false },
                    { id: 'role-l2', text: 'Priya Sharma (L2) — Response coordination & containment', isCorrect: true },
                    { id: 'role-l3', text: 'Aditya Deshmukh (L3) — Close ticket', isCorrect: false },
                    { id: 'role-elena', text: 'Elena Gomez — Call the police immediately', isCorrect: false },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => !handoverSubmitted && setBriefingRoleChoice(opt.id)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        briefingRoleChoice === opt.id
                          ? handoverSubmitted
                            ? opt.isCorrect
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                              : 'bg-rose-50 border-rose-500 text-rose-950'
                            : 'bg-primary/10 border-primary text-foreground font-semibold'
                          : 'bg-card hover:bg-muted border-border text-muted-foreground'
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: The Process Timeline */}
              <div className="p-4 rounded-xl border bg-card space-y-2">
                <span className="font-bold text-sm text-primary block">
                  Question 3 (The Process): In what sequence did these 7 events occur?
                </span>
                <p className="text-muted-foreground">
                  Elena: &ldquo;Arrange the timeline from first event (email arrival) to final triage.&rdquo;
                </p>
                <div className="space-y-1.5 pt-1">
                  {HANDOVER_TIMELINE_EVENTS.map((evt) => (
                    <div
                      key={evt.id}
                      className="p-2.5 rounded-lg border bg-muted/30 text-xs flex items-center justify-between font-mono"
                    >
                      <span className="text-foreground font-sans">{evt.text}</span>
                      <Badge variant="outline" className="bg-background text-slate-400 font-mono text-[10px]">
                        {evt.timestamp}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Question 4: The Technology Match */}
              <div className="p-4 rounded-xl border bg-card space-y-3">
                <span className="font-bold text-sm text-primary block">
                  Question 4 (The Technology): Match Questions to the 5 Tools
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-muted-foreground font-semibold block mb-1">
                      A) To know if PowerShell actually ran or was blocked?
                    </label>
                    <select
                      value={briefingTechAnswers.qA || ''}
                      onChange={(e) => !handoverSubmitted && setBriefingTechAnswers((p) => ({ ...p, qA: e.target.value }))}
                      className="w-full p-2 rounded-lg border bg-background text-foreground text-xs"
                    >
                      <option value="">-- Select Tool --</option>
                      <option value="EDR">EDR Console (Correct)</option>
                      <option value="Email">Email Gateway</option>
                      <option value="Firewall">Firewall</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-muted-foreground font-semibold block mb-1">
                      B) To know if other employees received the same fake email?
                    </label>
                    <select
                      value={briefingTechAnswers.qB || ''}
                      onChange={(e) => !handoverSubmitted && setBriefingTechAnswers((p) => ({ ...p, qB: e.target.value }))}
                      className="w-full p-2 rounded-lg border bg-background text-foreground text-xs"
                    >
                      <option value="">-- Select Tool --</option>
                      <option value="Email">Email Gateway (Correct)</option>
                      <option value="EDR">EDR Console</option>
                      <option value="SIEM">SIEM</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-muted-foreground font-semibold block mb-1">
                      C) To correlate historical patterns across all tools in 90 days?
                    </label>
                    <select
                      value={briefingTechAnswers.qC || ''}
                      onChange={(e) => !handoverSubmitted && setBriefingTechAnswers((p) => ({ ...p, qC: e.target.value }))}
                      className="w-full p-2 rounded-lg border bg-background text-foreground text-xs"
                    >
                      <option value="">-- Select Tool --</option>
                      <option value="SIEM">SIEM (Correct)</option>
                      <option value="Firewall">Firewall</option>
                      <option value="Case">Case Management</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-muted-foreground font-semibold block mb-1">
                      D) To record findings and hand off notes to Priya?
                    </label>
                    <select
                      value={briefingTechAnswers.qD || ''}
                      onChange={(e) => !handoverSubmitted && setBriefingTechAnswers((p) => ({ ...p, qD: e.target.value }))}
                      className="w-full p-2 rounded-lg border bg-background text-foreground text-xs"
                    >
                      <option value="">-- Select Tool --</option>
                      <option value="Case">Case Management (Correct)</option>
                      <option value="Email">Email Gateway</option>
                      <option value="EDR">EDR</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Question 5: Escalation Decision */}
              <div className="p-4 rounded-xl border bg-card space-y-2">
                <span className="font-bold text-sm text-primary block">
                  Question 5 (Escalation Decision): Aditya finds 47 computers infected and payment data at risk. What is your recommendation?
                </span>
                <div className="space-y-2 pt-1">
                  {[
                    { id: 'esc-crit', text: 'Critical Priority: Customer database might be compromised. Escalate to Elena Gomez for CEO, Legal, and PR coordination.', isCorrect: true },
                    { id: 'esc-low', text: 'Low Priority: Threat was blocked on Michael’s PC, so no further action needed.', isCorrect: false },
                    { id: 'esc-close', text: 'Close Alert: It is late in the day; let the next shift deal with it.', isCorrect: false },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => !handoverSubmitted && setBriefingEscalationChoice(opt.id)}
                      className={`p-3 rounded-lg border text-left w-full transition-all flex items-start gap-2 ${
                        briefingEscalationChoice === opt.id
                          ? handoverSubmitted
                            ? opt.isCorrect
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                              : 'bg-rose-50 border-rose-500 text-rose-950'
                            : 'bg-primary/10 border-primary text-foreground font-semibold'
                          : 'bg-card hover:bg-muted border-border text-muted-foreground'
                      }`}
                    >
                      <span className="mt-0.5">{briefingEscalationChoice === opt.id ? '🔘' : '⚪'}</span>
                      <span className="flex-1">{opt.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit / Reset Section */}
              {!handoverSubmitted ? (
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <Button
                    onClick={() => {
                      if (!briefingStoryChoice || !briefingRoleChoice || !briefingEscalationChoice) {
                        showToast({
                          type: 'warning',
                          title: 'Incomplete Handover',
                          description: 'Please answer all questions before submitting your briefing to Elena Gomez.',
                        });
                        return;
                      }

                      // Calculate Score
                      let score = 0;
                      if (briefingStoryChoice === 'story-correct') score += 20;
                      if (briefingRoleChoice === 'role-l2') score += 20;
                      score += 20; // Question 3 timeline
                      if (briefingTechAnswers.qA === 'EDR') score += 5;
                      if (briefingTechAnswers.qB === 'Email') score += 5;
                      if (briefingTechAnswers.qC === 'SIEM') score += 5;
                      if (briefingTechAnswers.qD === 'Case') score += 5;
                      if (briefingEscalationChoice === 'esc-crit') score += 20;

                      setHandoverScore(score);
                      setHandoverSubmitted(true);

                      if (score >= 75) {
                        completeUnit('unit-1', 100);
                        completeUnit('unit-1-assessment', 100);
                        if (xpSystemEnabled) addXP(100);
                        if (onCompleteUnitAssessment) onCompleteUnitAssessment();
                        showToast({
                          type: 'success',
                          title: 'Unit 1 Certified! 🎉',
                          description: `Outstanding handover briefing to Elena Gomez! Score: ${score}%. +100 XP awarded.`,
                        });
                      } else {
                        showToast({
                          type: 'error',
                          title: 'Revision Needed',
                          description: `Your handover scored ${score}%. Review the questions and retry to pass (75% threshold).`,
                        });
                      }
                    }}
                    className="w-full sm:flex-1 h-11 font-bold text-xs gap-2 bg-primary text-primary-foreground shadow-md"
                  >
                    <Award className="w-4 h-4" />
                    Submit Handover Briefing to Elena Gomez
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => {
                      setBriefingStoryChoice('');
                      setBriefingRoleChoice('');
                      setBriefingTechAnswers({});
                      setBriefingEscalationChoice('');
                    }}
                    className="h-11 text-xs gap-1.5 font-semibold text-muted-foreground hover:text-foreground w-full sm:w-auto"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Briefing Answers
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in pt-2">
                  <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                    handoverScore >= 75 ? 'bg-slate-900 text-slate-100' : 'bg-rose-50 text-rose-950 border-rose-300'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-emerald-400">Elena Gomez Feedback (Score: {handoverScore}%):</span>
                      <Badge className={handoverScore >= 75 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-rose-500/20 text-rose-700'}>
                        {handoverScore >= 75 ? 'Handover Approved ✓' : 'Revision Required ✗'}
                      </Badge>
                    </div>
                    <p className="leading-relaxed font-sans">
                      {handoverScore >= 75 ? (
                        <>
                          &ldquo;Outstanding briefing, Analyst! You understand that alerts originate from telemetry, that Tier 1 triage establishes the factual baseline, and that Priya (Tier 2), Aditya (Tier 3), and management coordinate response. You are officially certified on <strong>SOC Architecture</strong>! Welcome to FinCorp SOC!&rdquo;
                        </>
                      ) : (
                        <>
                          &ldquo;You are on the right track, but your briefing missed some critical boundaries. Review the role ownership and technology questions, and retry to submit your final handover.&rdquo;
                        </>
                      )}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setHandoverSubmitted(false);
                        setBriefingStoryChoice('');
                        setBriefingRoleChoice('');
                        setBriefingTechAnswers({});
                        setBriefingEscalationChoice('');
                      }}
                      className="text-xs gap-1 font-semibold w-full sm:w-auto"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Retake Briefing Challenge
                    </Button>

                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        onClick={onBackToOverview}
                        className="text-xs font-semibold text-muted-foreground hover:text-foreground w-full sm:w-auto"
                      >
                        Module Overview
                      </Button>
                      <Button
                        onClick={() => onSelectTopic('topic-2-1')}
                        className="font-bold text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto cursor-pointer"
                      >
                        <span>Proceed to Unit 2: Alerts & Events</span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
}
