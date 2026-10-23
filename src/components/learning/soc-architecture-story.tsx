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
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Check,
  X,
  XCircle,
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
  User,
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
  Zap,
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
import { GuidedMentorBox } from '@/components/learning/guided-mentor-box';
import { UnifiedSocTierSimulator } from '@/components/learning/unified-soc-tier-simulator';
import { UnifiedProcessSimulator } from '@/components/learning/unified-process-simulator';
import { UnifiedTechStackSimulator } from '@/components/learning/unified-tech-stack-simulator';
import { UnifiedDataFlowSimulator } from '@/components/learning/unified-data-flow-simulator';
import { OfficeFloorLayout } from '@/components/learning/office-floor-layout';
import { CourseLabLauncher } from '@/components/labs/CourseLabLauncher';

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
  const [hasViewedOfficeLayout, setHasViewedOfficeLayout] = useState<boolean>(false);
  const [activeTierExplorer, setActiveTierExplorer] = useState<'tier-1' | 'tier-2' | 'tier-3' | 'tier-4'>('tier-1');
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, string>>({});
  const [showScenarioExplanation, setShowScenarioExplanation] = useState<Record<string, boolean>>({});

  // Animation state for 4-tier roles (animate in slowly for attention grabbing)
  const [animatedTierStep, setAnimatedTierStep] = useState<number>(0);
  const [isReplayingRoles, setIsReplayingRoles] = useState<boolean>(false);

  const playTierAnimation = React.useCallback(() => {
    setAnimatedTierStep(0);
    setIsReplayingRoles(true);
    const timers: NodeJS.Timeout[] = [];
    [1, 2, 3, 4].forEach((step, idx) => {
      const t = setTimeout(() => {
        setAnimatedTierStep(step);
        if (step === 4) setIsReplayingRoles(false);
      }, (idx + 1) * 750);
      timers.push(t);
    });
    return timers;
  }, []);

  useEffect(() => {
    if (activeChapter === 1) {
      const timers = playTierAnimation();
      return () => timers.forEach(clearTimeout);
    }
  }, [activeChapter, playTierAnimation]);

  // Chapter 2 State (Process)
  const [activeProcessStage, setActiveProcessStage] = useState<number>(1);
  const [stage1Claimed, setStage1Claimed] = useState<boolean>(false);
  const [stage1Submitted, setStage1Submitted] = useState<boolean>(false);
  const [stage2Checklist, setStage2Checklist] = useState<Record<string, boolean>>({
    who: false,
    computer: false,
    parent: false,
    child: false,
    when: false,
  });
  const [stage2Submitted, setStage2Submitted] = useState<boolean>(false);
  const [stage3Checklist, setStage3Checklist] = useState<Record<string, boolean>>({
    email: false,
    edr: false,
    firewall: false,
  });
  const [stage3Submitted, setStage3Submitted] = useState<boolean>(false);
  const [stage4Decisions, setStage4Decisions] = useState<Record<string, string>>({});
  const [stage4Submitted, setStage4Submitted] = useState<boolean>(false);
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
  const [stage5Submitted, setStage5Submitted] = useState<boolean>(false);

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
  const isChapter1Complete = hasViewedOfficeLayout && Object.keys(scenarioAnswers).length >= CHAPTER_1_ROLE_SCENARIOS.length;
  
  const isStage2Passed = stage2Submitted && Object.values(stage2Checklist).filter(Boolean).length >= 4;
  const isStage3Passed = stage3Submitted && stage3Checklist.email && stage3Checklist.edr && stage3Checklist.firewall;
  const isStage4Passed = stage4Submitted && stage4Decisions.pwd === 'yes' && stage4Decisions.hunt === 'aditya';
  const isStage5Passed = stage5Submitted && stage5Form.summary === 'correct' && stage5Form.targetedUser === 'correct' && stage5Form.successful === 'correct' && stage5Form.nextRole === 'correct';
  
  const isChapter2Complete = stage1Claimed && isStage2Passed && isStage3Passed && isStage4Passed && isStage5Passed;
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

  const handleMoveTimelineItem = (index: number, direction: 'up' | 'down') => {
    if (handoverSubmitted) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= timelineEventOrder.length) return;
    const newOrder = [...timelineEventOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;
    setTimelineEventOrder(newOrder);
  };

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

  const isUnitPillLocked = (unitNum: number, unitUid: string): boolean => {
    if (!mounted || freeNavigationEnabled) return false;
    if (unitNum <= 1 || unitUid === 'unit-1') return false;
    const prevAssessmentId = `unit-${unitNum - 1}-assessment`;
    const prevUnitId = `unit-${unitNum - 1}`;
    return !(
      completedUnits.has(prevAssessmentId) ||
      completedUnits.has(prevUnitId) ||
      unlockedAssessments.includes(prevAssessmentId)
    );
  };

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
                    title: 'Unit Locked',
                    description: `Complete Unit ${u.num - 1} and pass its assessment to unlock ${u.label}.`,
                  });
                  return;
                }
                onSelectTopic(u.topicId);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                locked
                  ? 'opacity-50 cursor-not-allowed bg-muted/40 text-muted-foreground border border-border/50'
                  : u.id === 'unit-1'
                  ? 'bg-primary text-primary-foreground shadow-xs ring-1 ring-primary cursor-pointer'
                  : 'bg-card hover:bg-muted text-muted-foreground border border-border/70 hover:text-foreground cursor-pointer'
              }`}
              title={locked ? `Locked: Complete Unit ${u.num - 1} first` : u.label}
            >
              {locked ? (
                <Lock className="w-3.5 h-3.5 text-muted-foreground/80" />
              ) : (
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                  u.id === 'unit-1' ? 'bg-primary-foreground/20 text-primary-foreground font-bold' : 'bg-muted text-muted-foreground'
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
          UNIT 1 HEADER CARD (MATCHING UNITS 2-7)
         ==================================================== */}
      <Card className="border-primary/20 shadow-sm bg-gradient-to-r from-card via-card to-primary/5 overflow-hidden">
        <div className="bg-primary/10 border-b border-primary/20 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-bold text-foreground uppercase tracking-wider font-mono">FinCorp SOC Ops • Live Shift</span>
            <span className="text-border">|</span>
            <span className="font-medium text-foreground">Tuesday Morning — Day 1: SOC Orientation</span>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-card font-mono text-xs gap-1 border-primary/30 text-primary">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>Shift Time: {currentTimeline.time}</span>
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setHasViewedOfficeLayout(true);
                if (activeChapter !== 1) {
                  setActiveChapter(1);
                  onSelectTopic('topic-1-1');
                }
                setTimeout(() => {
                  const target = document.getElementById('office-floor-plan') || document.getElementById('section-intro');
                  target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }}
              className="h-7 text-xs gap-1 text-primary border-primary/30 hover:bg-primary/10 cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Office Layout</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToOverview}
              className="h-7 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
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
                  Unit 1
                </Badge>
                <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                  SOC Architecture — How the Defense Operates
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Before investigating alerts, understand how a modern SOC functions across People, Process, Technology, and Data Flow.
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
                &ldquo;Before you touch the keyboard, you must understand how our SOC works. Think of a SOC like an emergency room. Let me show you.&rdquo;
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chapter Navigation Tabs */}
      <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
        <div className="p-2 sm:p-3 bg-card flex items-center justify-between gap-2 overflow-x-auto border-b">
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
                        title: 'Chapter Locked',
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
          MODAL: OFFICE 2D VISUAL LAYOUT (BACKDROP DISMISSIBLE)
         ==================================================== */}
      {showOpeningIntro && (
        <div
          onClick={() => setShowOpeningIntro(false)}
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
        >
          <div onClick={(e) => e.stopPropagation()} className="max-w-4xl w-full my-auto">
            <div className="flex justify-end mb-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowOpeningIntro(false)}
                className="bg-card/90 text-xs font-bold gap-1.5 rounded-xl border border-border/80 cursor-pointer shadow-md"
              >
                <X className="w-4 h-4" />
                <span>Close Floor Plan</span>
              </Button>
            </div>
            <OfficeFloorLayout
              onInspected={() => setHasViewedOfficeLayout(true)}
              onProceed={() => {
                setShowOpeningIntro(false);
                document.getElementById('section-demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            />
          </div>
        </div>
      )}


      {/* ====================================================
          CHAPTER 1: PEOPLE (WHO IS RESPONDING TO THIS?)
         ==================================================== */}
      {activeChapter === 1 && (
        <section className="space-y-12 animate-fade-in relative">
          {/* SECTION 1: INTRO & MENTOR BRIEFING (Frame-Fitting) */}
          <div id="section-intro" className="min-h-[70vh] flex flex-col justify-center py-4 scroll-mt-24 space-y-4">
            {/* Rajesh Dialogue Hook via Standardized GuidedMentorBox */}
            <GuidedMentorBox
              mentor="rajesh"
              time="09:20 AM"
              quote="Welcome to your first shift, trainee! You are looking at Alert SEC-2026-0412. First question: WHO is handling this alert? You might wonder: 'Do I handle this alone?' Everyone in our SOC has a specific operational role. Let me show you our 4 tiers."
              scaffolding={{
                term: "SOC Tiered Hierarchy",
                analogy: "Like a hospital emergency room: L1 triage nurses examine patients first, L2 doctors treat confirmed injuries, L3 surgical specialists handle critical operations, and the Chief of Medicine coordinates hospital resources.",
                definition: "An operational division of cybersecurity analysts into sequential tiers (L1 Triage, L2 Incident Response, L3 Threat Hunting, and SOC Management) based on technical specialization and decision authority.",
                whyItMatters: "Prevents high-volume alert noise from overwhelming senior responders while ensuring severe intrusions are rapidly escalated to specialist hunters.",
              }}
            />

            {/* Unified 2D Office Floor & Telemetry Pipeline Layout */}
            <OfficeFloorLayout
              onInspected={() => setHasViewedOfficeLayout(true)}
              onProceed={() => document.getElementById('section-demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            />
          </div>

          {/* SECTION 2: VISUAL DEMO (Frame-Fitting) */}
          <div id="section-demo" className="min-h-[75vh] flex flex-col justify-center py-4 scroll-mt-24 space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs font-bold font-mono">
                  2. Visual Demo
                </Badge>
                <h3 className="text-base font-bold text-foreground">The 4-Tier SOC Organisational Structure</h3>
              </div>
              <span className="text-xs text-muted-foreground font-mono">Visual Hierarchy</span>
            </div>

          {/* Visual 1: 4-Tier SOC Structure with Progressive Slow Animation */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3 border-b bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  The 4-Tier SOC Organisational Structure
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Notice how alerts flow upwards: L1 checks for real danger, L2 contains infections, L3 hunts across all systems, and the Manager briefs executives.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={playTierAnimation}
                disabled={isReplayingRoles}
                className="text-xs gap-1.5 h-7.5 cursor-pointer text-muted-foreground hover:text-foreground shrink-0 self-start sm:self-auto"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isReplayingRoles ? 'animate-spin' : ''}`} />
                <span>{isReplayingRoles ? 'Revealing Tiers...' : 'Replay Role Animation'}</span>
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3 max-w-2xl mx-auto">
                {/* Tier 4 (Manager) */}
                <div
                  className={`p-4 rounded-xl border-2 border-rose-500/30 bg-rose-500/5 flex items-start gap-3.5 transition-all duration-700 ease-out transform ${
                    animatedTierStep >= 4
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-25 translate-y-3 scale-98 pointer-events-none'
                  } ${animatedTierStep === 4 && isReplayingRoles ? 'ring-2 ring-rose-500 shadow-md animate-pulse' : ''}`}
                >
                  <div className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                    EG
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-rose-900 dark:text-rose-200">Tier 4: Elena Gomez (SOC Operations Manager)</span>
                      <Badge className="bg-rose-500/20 text-rose-700 dark:text-rose-300 text-[10px]">Business &amp; Regulators</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground italic">&ldquo;Should we inform the CEO? Do we need to call law enforcement and alert our customers?&rdquo;</p>
                    <p className="text-xs text-foreground/80 leading-relaxed font-sans pt-1">
                      <strong>Role in everyday words:</strong> The coordinator. Not doing technical clicks, but understanding business risks and making high-stakes decisions.
                    </p>
                  </div>
                </div>

                <div className={`flex justify-center text-muted-foreground font-mono text-xs transition-opacity duration-500 ${animatedTierStep >= 4 ? 'opacity-100' : 'opacity-20'}`}>
                  ▲ Escalates if enterprise business is at risk
                </div>

                {/* Tier 3 (Hunter) */}
                <div
                  className={`p-4 rounded-xl border-2 border-purple-500/30 bg-purple-500/5 flex items-start gap-3.5 transition-all duration-700 ease-out transform ${
                    animatedTierStep >= 3
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-25 translate-y-3 scale-98 pointer-events-none'
                  } ${animatedTierStep === 3 && isReplayingRoles ? 'ring-2 ring-purple-500 shadow-md animate-pulse' : ''}`}
                >
                  <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs">
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

                <div className={`flex justify-center text-muted-foreground font-mono text-xs transition-opacity duration-500 ${animatedTierStep >= 3 ? 'opacity-100' : 'opacity-20'}`}>
                  ▲ Escalates if threat spreads beyond one machine
                </div>

                {/* Tier 2 (Responder) */}
                <div
                  className={`p-4 rounded-xl border-2 border-indigo-500/30 bg-indigo-500/5 flex items-start gap-3.5 transition-all duration-700 ease-out transform ${
                    animatedTierStep >= 2
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-25 translate-y-3 scale-98 pointer-events-none'
                  } ${animatedTierStep === 2 && isReplayingRoles ? 'ring-2 ring-indigo-500 shadow-md animate-pulse' : ''}`}
                >
                  <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs">
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

                <div className={`flex justify-center text-muted-foreground font-mono text-xs transition-opacity duration-500 ${animatedTierStep >= 2 ? 'opacity-100' : 'opacity-20'}`}>
                  ▲ Escalates if alert shows confirmed malicious danger
                </div>

                {/* Tier 1 (You) */}
                <div
                  className={`p-4 rounded-xl border-2 border-primary bg-primary/10 flex items-start gap-3.5 ring-2 ring-primary/20 transition-all duration-700 ease-out transform ${
                    animatedTierStep >= 1
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-25 translate-y-3 scale-98 pointer-events-none'
                  } ${animatedTierStep === 1 && isReplayingRoles ? 'ring-2 ring-primary shadow-md animate-pulse' : ''}`}
                >
                  <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                    YOU
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-primary">Tier 1: YOU &amp; Rajesh Kumar (L1 Triage Analyst)</span>
                      <Badge className="bg-primary text-primary-foreground text-[10px]">Starting Point</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground italic">&ldquo;What is this alert telling me? Is this real danger, or just a false alarm glitch?&rdquo;</p>
                    <p className="text-xs text-foreground/80 leading-relaxed font-sans pt-1">
                      <strong>Role in everyday words:</strong> The first responder. You read the incoming alert, extract the basic facts, and decide if it is real danger or nothing to worry about.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center text-emerald-600 font-mono text-xs font-bold">▲ Alert Queue (Entry point for all security signals)</div>
              </div>
            </CardContent>
          </Card>

            {/* Guided Down Action to Section 3 */}
            <div className="flex justify-end pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('section-interactive')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="glass-pill glass-glossy text-xs font-bold gap-2 text-primary border-primary/30 hover:bg-primary/10 cursor-pointer rounded-xl h-8 shadow-xs"
              >
                <span>Next: Try Interactive Simulator</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </Button>
            </div>
          </div>

          {/* SECTION 3: INTERACTIVE SIMULATOR (Frame-Fitting, Unified Single Box) */}
          <div id="section-interactive" className="min-h-[75vh] flex flex-col justify-center py-4 scroll-mt-24 space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 text-xs font-bold font-mono">
                  3. Interactive Simulator
                </Badge>
                <h3 className="text-base font-bold text-foreground">Interactive SOC Tier Simulator: The 4 Tiers in Action</h3>
              </div>
              <span className="text-xs text-muted-foreground font-mono">Autoplay Video Mode</span>
            </div>

            {/* ONE SINGLE UNIFIED BOX - No fragmented small boxes, with animated stickers and vector graphics */}
            <UnifiedSocTierSimulator />

            {/* Guided Down Action to Section 4 */}
            <div className="flex justify-end pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('section-kc')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="glass-pill glass-glossy text-xs font-bold gap-2 text-primary border-primary/30 hover:bg-primary/10 cursor-pointer rounded-xl h-8 shadow-xs"
              >
                <span>Next: Knowledge Check Challenge</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </Button>
            </div>
          </div>

          {/* SECTION 4: KNOWLEDGE CHECK (Frame-Fitting) */}
          <div id="section-kc" className="min-h-[75vh] flex flex-col justify-center py-4 scroll-mt-24 space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30 text-xs font-bold font-mono">
                  4. Knowledge Check
                </Badge>
                <h3 className="text-base font-bold text-foreground">Tier Role Challenge</h3>
              </div>
              <span className="text-xs text-muted-foreground font-mono">Assessment</span>
            </div>

          {/* Visual 3: "Which SOC Tier Takes the Lead?" Knowledge Check */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3 border-b bg-muted/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-primary" />
                    Knowledge Check: &ldquo;Which SOC Tier Takes the Lead?&rdquo;
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Question {currentScenarioIndex + 1} of {CHAPTER_1_ROLE_SCENARIOS.length}: Select which SOC role owns each everyday responsibility.
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
                    {/* Question Box (Light Theme Friendly) */}
                    <div className="p-4 sm:p-5 rounded-2xl border border-sky-200/80 dark:border-sky-800/80 bg-gradient-to-r from-sky-50/80 to-blue-50/40 dark:from-sky-950/40 dark:to-blue-950/30 text-foreground space-y-2 text-xs font-sans shadow-xs backdrop-blur-md">
                      <span className="text-[10px] uppercase font-mono font-bold text-sky-700 dark:text-sky-300">
                        KNOWLEDGE CHECK QUESTION #{currentScenarioIndex + 1}:
                      </span>
                      <p className="text-foreground text-sm leading-relaxed">{scenario.situation}</p>
                      <p className="text-foreground font-bold pt-1">{scenario.question}</p>
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
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700/60 text-emerald-950 dark:text-emerald-100'
                          : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700/60 text-rose-950 dark:text-rose-100'
                      }`}>
                        <div className="flex items-center gap-2 font-bold text-sm">
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                              <span>CORRECT! Rajesh is approving:</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                              <span>Not quite yet. Rajesh is coaching:</span>
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
                      {!hasViewedOfficeLayout
                        ? `Complete the FinCorp Office Layout review above and answer all 4 scenarios (${Object.keys(scenarioAnswers).length}/4 completed) to unlock Chapter 2`
                        : `Answer all 4 scenarios in the challenge above (${Object.keys(scenarioAnswers).length}/4 completed) to unlock Chapter 2`}
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
        </div>
      </section>
      )}

      {/* ====================================================
          CHAPTER 2: PROCESS (WHAT HAPPENS AFTER AN ALERT ARRIVES?)
         ==================================================== */}
      {/* ====================================================
          CHAPTER 2: PROCESS (WHAT HAPPENS AFTER AN ALERT ARRIVES?)
         ==================================================== */}
      {activeChapter === 2 && (
        <section className="space-y-12 animate-fade-in relative">
          {/* SECTION 1: INTRO & MENTOR BRIEFING (Frame-Fitting) */}
          <div id="section-intro" className="min-h-[70vh] flex flex-col justify-center py-4 scroll-mt-24 space-y-4">
            <GuidedMentorBox
              mentor="rajesh"
              time="09:24 AM"
              quote="Now you are understanding the people. But a SOC is not just people. It is also Process. Like a recipe in cooking, yes? If you do not follow the recipe step-by-step, the food comes out burnt! In our SOC, we follow a 5-stage process so we never skip evidence or panic. Watch our live process video below!"
              scaffolding={{
                term: "5-Stage Incident Triage Lifecycle",
                analogy: "Like a hospital ER intake: 1. Patient check-in (Queue Ingress), 2. Vital signs extraction (Fact Extraction), 3. Medical history comparison (Baseline Check), 4. Emergency treatment (Threat Containment), and 5. Medical chart signoff (Incident Dossier).",
                definition: "The standardized 5-step operational procedure (Monitor & Ingest -> Inspect & Extract -> Correlate & Baseline -> Respond & Contain -> Record & Share) ensuring structured, reproducible threat analysis.",
                whyItMatters: "Prevents confirmation bias, eliminates missed indicators, and protects enterprise audit compliance under strict SLA deadlines.",
              }}
            />

            {/* Guided Down Action to Section 2 */}
            <div className="flex justify-end pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('section-demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="glass-pill glass-glossy text-xs font-bold gap-2 text-primary border-primary/30 hover:bg-primary/10 cursor-pointer rounded-xl h-8 shadow-xs"
              >
                <span>Next: Watch Process Video Simulator</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </Button>
            </div>
          </div>

          {/* SECTION 2: UNIFIED VIDEO DEMO (Frame-Fitting) */}
          <div id="section-demo" className="min-h-[85vh] flex flex-col justify-center py-4 scroll-mt-24 space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs font-bold font-mono">
                  Visual Stage 2 • Video Simulator
                </Badge>
                <h3 className="font-extrabold text-sm sm:text-base text-foreground">
                  The 5-Stage Operational Triage Pipeline
                </h3>
              </div>
              <Badge className="bg-emerald-600 text-white text-[10px] font-bold">
                Auto-Advancing Video
              </Badge>
            </div>

            {/* Unified Video Simulator Component */}
            <UnifiedProcessSimulator onStageChange={(stg) => setActiveProcessStage(stg)} />

            {/* Guided Down Action to Section 3 */}
            <div className="flex justify-end pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('section-interactive')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="glass-pill glass-glossy text-xs font-bold gap-2 text-primary border-primary/30 hover:bg-primary/10 cursor-pointer rounded-xl h-8 shadow-xs"
              >
                <span>Next: Hands-on Triage Challenge</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </Button>
            </div>
          </div>

          {/* SECTION 3: INTERACTIVE TRIAGE CHALLENGE (Frame-Fitting) */}
          <div id="section-interactive" className="min-h-[85vh] flex flex-col justify-center py-4 scroll-mt-24 space-y-6">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs font-bold font-mono">
                  Interactive Lab 1 • Live SOC Workstation
                </Badge>
                <h3 className="font-extrabold text-sm sm:text-base text-foreground">
                  Alert SEC-2026-0412 Live Investigation &amp; Triage Workstation
                </h3>
              </div>
            </div>

            {/* LIVE 3-COLUMN SOC DASHBOARD LAB EMBEDDED DIRECTLY IN FLOW */}
            <CourseLabLauncher
              labId="lab-01"
              onLabCompleted={(result) => {
                showToast({
                  type: 'success',
                  title: 'Lab 01 Passed! 🎯',
                  description: `Score: ${result.score}% • Real-world triage successfully completed.`,
                });
                onCompleteTopic('topic-1-2', 50);
              }}
            />

            {/* Guided Stage Breakdown Reference Accordion */}
            <div className="p-4 sm:p-5 rounded-2xl bg-card/65 dark:bg-slate-900/40 border border-border/70 dark:border-white/10 space-y-4 glass-card glass-glossy backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <div className="flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-primary" />
                  <span className="font-bold text-xs text-foreground">
                    SOP Procedural Reference: Stage {activeProcessStage} of 5
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((stg) => (
                    <button
                      key={stg}
                      onClick={() => setActiveProcessStage(stg)}
                      className={`w-6 h-6 rounded-md text-xs font-bold transition-all cursor-pointer ${
                        activeProcessStage === stg
                          ? 'bg-primary text-white shadow-xs'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {stg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Stage Actions */}
              {(() => {
                const stage = CHAPTER_2_PROCESS_STAGES.find((s) => s.order === activeProcessStage) || CHAPTER_2_PROCESS_STAGES[0];
                return (
                <div className="space-y-4">
                  {stage.order === 1 && (
                      <div className="p-4 rounded-2xl bg-card/75 dark:bg-slate-900/60 border border-border/70 dark:border-white/10 space-y-3 glass-card glass-glossy backdrop-blur-xl">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-foreground text-xs block">Hands-on Action for Stage 1: Take Operational Ownership</span>
                          {stage1Submitted && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setStage1Claimed(false);
                                setStage1Submitted(false);
                              }}
                              className="text-xs text-muted-foreground hover:text-foreground h-7 px-2 cursor-pointer"
                            >
                              Reset Stage 1
                            </Button>
                          )}
                        </div>

                        {!stage1Submitted ? (
                          <div className="space-y-3">
                            <p className="text-muted-foreground text-xs">
                              Alert <strong className="text-primary font-mono">SEC-2026-0412</strong> has landed in the Tier 1 Unassigned Pool. What is your required first procedural action?
                            </p>
                            <Button
                              onClick={() => {
                                setStage1Claimed(true);
                                setStage1Submitted(true);
                                showToast({
                                  type: 'success',
                                  title: 'Alert Claimed!',
                                  description: 'Ownership accepted. Your 15-minute SLA triage timer has started.',
                                });
                              }}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5 cursor-pointer rounded-xl h-9"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Click to Accept &amp; Claim Ownership of Alert SEC-2026-0412</span>
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-3 animate-fade-in">
                            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 text-emerald-950 dark:text-emerald-100 text-xs space-y-2">
                              <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-300">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                <span>Correct! Ownership Established &amp; SLA Clock Initiated</span>
                              </div>
                              <p className="text-muted-foreground leading-relaxed">
                                <strong>Ticket Assigned:</strong> Locked to <em>YOU (Tier 1 Analyst)</em>. SLA Remaining: <em>14m 58s</em>.
                              </p>
                            </div>

                            {/* Detailed Explanation */}
                            <div className="p-3.5 rounded-xl bg-muted/40 dark:bg-slate-800/40 border border-border/60 dark:border-slate-700/60 space-y-2 text-xs">
                              <span className="font-bold text-primary font-mono uppercase text-[10px] flex items-center gap-1.5">
                                <Zap className="w-3.5 h-3.5 text-primary" />
                                <span>Why Claiming Ownership Comes First:</span>
                              </span>
                              <ul className="text-muted-foreground space-y-1.5 list-disc list-inside leading-relaxed">
                                <li><strong>Prevents Duplicate Work:</strong> In large SOCs, multiple analysts viewing the same queue would waste hours working on the same ticket.</li>
                                <li><strong>Enforces Legal Audit Accountability:</strong> FinCorp compliance requires an immutable timestamp and analyst ID on who initiated the triage.</li>
                                <li><strong>Triggers the SLA Clock:</strong> High-severity alerts require an initial assessment within 15 minutes. Claiming marks the formal start of that timer.</li>
                              </ul>
                              <p className="text-muted-foreground italic text-[11px] pt-1">
                                Rajesh Kumar: &ldquo;Sharp move. The alert is officially assigned to your desk. Now proceed to Stage 2 to extract the 5 core telemetry facts.&rdquo;
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {stage.order === 2 && (
                      <div className="p-4 rounded-2xl bg-card/75 dark:bg-slate-900/60 border border-border/70 dark:border-white/10 space-y-3 glass-card glass-glossy backdrop-blur-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold text-foreground text-xs block">Stage 2 Checklist: Extract 5 Core Telemetry Facts</span>
                            <span className="text-[11px] text-muted-foreground">Select all essential facts before clicking verify</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setStage2Checklist({ who: false, computer: false, parent: false, child: false, when: false });
                              setStage2Submitted(false);
                            }}
                            className="text-[11px] text-muted-foreground hover:text-foreground h-6 px-2 cursor-pointer"
                          >
                            Reset Checklist
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {[
                            { key: 'who', label: '1. Who: Michael Chen (Senior Finance Analyst)' },
                            { key: 'computer', label: '2. Where: Workstation FIN-BOS-MCHEN-047' },
                            { key: 'parent', label: '3. What Program: WINWORD.EXE (Word macro)' },
                            { key: 'child', label: '4. Sensor Action: Stopped PowerShell in 1.1s' },
                            { key: 'when', label: '5. When: 09:19:58 AM (Monday morning shift)' },
                          ].map((item) => (
                            <button
                              key={item.key}
                              disabled={stage2Submitted && isStage2Passed}
                              onClick={() => {
                                setStage2Checklist((prev) => ({ ...prev, [item.key]: !prev[item.key] }));
                                setStage2Submitted(false);
                              }}
                              className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-all cursor-pointer ${
                                stage2Checklist[item.key]
                                  ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-900 dark:text-emerald-200 font-semibold'
                                  : 'bg-muted/40 dark:bg-slate-800/40 border-border/60 dark:border-slate-700/60 text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              {stage2Checklist[item.key] ? (
                                <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                              ) : (
                                <Square className="w-4 h-4 text-muted-foreground shrink-0" />
                              )}
                              <span>{item.label}</span>
                            </button>
                          ))}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-border/60">
                          <span className="text-[11px] text-muted-foreground">
                            {Object.values(stage2Checklist).filter(Boolean).length} of 5 facts selected
                          </span>
                          <Button
                            size="sm"
                            onClick={() => setStage2Submitted(true)}
                            className="bg-primary hover:bg-primary/90 text-white font-bold text-xs gap-1.5 cursor-pointer rounded-xl h-8"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Check &amp; Verify Extracted Facts</span>
                          </Button>
                        </div>

                        {/* Confirmation & Answer Explanation */}
                        {stage2Submitted && (
                          <div className="animate-fade-in pt-1">
                            {isStage2Passed ? (
                              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 space-y-2 text-xs">
                                <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-300 text-sm">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                  <span>Correct! 5/5 Core Telemetry Facts Extracted</span>
                                </div>
                                <div className="text-muted-foreground space-y-1.5 leading-relaxed pt-1">
                                  <p><strong>• User Identity:</strong> Michael Chen works in Commercial Finance with banking wire authority, indicating a high blast radius account.</p>
                                  <p><strong>• Endpoint Hostname:</strong> FIN-BOS-MCHEN-047 isolates the exact device in Boston for network quarantine.</p>
                                  <p><strong>• Parent Process:</strong> Microsoft Word (<code>WINWORD.EXE</code>) spawning PowerShell is anomalous parent-child execution — word processors should never invoke system scripting engines.</p>
                                  <p><strong>• Sensor Action:</strong> EDR containment halted PowerShell in 1.1s, proving initial execution was blocked before secondary payloads were pulled down.</p>
                                  <p><strong>• Timestamp:</strong> 09:19:58 AM anchors the timeline to correlate egress firewall packets and email delivery logs in Stage 3.</p>
                                </div>
                              </div>
                            ) : (
                              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-700/60 space-y-2 text-xs">
                                <div className="flex items-center gap-2 font-bold text-rose-700 dark:text-rose-300">
                                  <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                                  <span>Incomplete Extraction ({Object.values(stage2Checklist).filter(Boolean).length}/5 selected)</span>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                  You need to extract at least 4 (ideally all 5) essential facts: <strong>Who</strong>, <strong>Where</strong>, <strong>Parent Process</strong>, <strong>Sensor Action</strong>, and <strong>When</strong>. Select the remaining items and click verify again.
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {stage.order === 3 && (
                      <div className="p-4 rounded-2xl bg-card/75 dark:bg-slate-900/60 border border-border/70 dark:border-white/10 space-y-3 glass-card glass-glossy backdrop-blur-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold text-foreground text-xs block">Stage 3 Proof Check: Cross-Check 3 Security Tools for Proof</span>
                            <span className="text-[11px] text-muted-foreground">Click each security tool to inspect its independent evidence</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setStage3Checklist({ email: false, edr: false, firewall: false });
                              setStage3Submitted(false);
                            }}
                            className="text-[11px] text-muted-foreground hover:text-foreground h-6 px-2 cursor-pointer"
                          >
                            Reset Proof Check
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                          {[
                            { key: 'email', title: 'Tool 1: Email Gateway', desc: 'Shows fake invoice email delivered at 09:18 AM' },
                            { key: 'edr', title: 'Tool 2: Computer Antivirus / EDR', desc: 'Shows Word launched PowerShell at 09:19 AM, blocked in 1.1s' },
                            { key: 'firewall', title: 'Tool 3: Network Firewall', desc: 'Shows outbound connection to external server blocked at 09:19 AM' },
                          ].map((cam) => (
                            <button
                              key={cam.key}
                              disabled={stage3Submitted && isStage3Passed}
                              onClick={() => {
                                setStage3Checklist((prev) => ({ ...prev, [cam.key]: !prev[cam.key] }));
                                setStage3Submitted(false);
                              }}
                              className={`p-3 rounded-xl border text-left space-y-1 transition-all cursor-pointer ${
                                stage3Checklist[cam.key]
                                  ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-900 dark:text-emerald-200'
                                  : 'bg-muted/40 dark:bg-slate-800/40 border-border/60 dark:border-slate-700/60 text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-foreground">{cam.title}</span>
                                {stage3Checklist[cam.key] ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                ) : (
                                  <Square className="w-3.5 h-3.5 text-muted-foreground" />
                                )}
                              </div>
                              <p className="text-[11px] text-muted-foreground leading-tight">{cam.desc}</p>
                            </button>
                          ))}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-border/60">
                          <span className="text-[11px] text-muted-foreground">
                            {Object.values(stage3Checklist).filter(Boolean).length} of 3 tools inspected
                          </span>
                          <Button
                            size="sm"
                            onClick={() => setStage3Submitted(true)}
                            className="bg-primary hover:bg-primary/90 text-white font-bold text-xs gap-1.5 cursor-pointer rounded-xl h-8"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Check Multi-Tool Evidence Corroboration</span>
                          </Button>
                        </div>

                        {/* Confirmation & Answer Explanation */}
                        {stage3Submitted && (
                          <div className="animate-fade-in pt-1">
                            {isStage3Passed ? (
                              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 space-y-2 text-xs">
                                <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-300 text-sm">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                  <span>Correct! 3-Way Evidence Corroboration Confirmed</span>
                                </div>
                                <div className="text-muted-foreground space-y-1.5 leading-relaxed pt-1">
                                  <p><strong>• Why Corroboration Matters:</strong> In cybersecurity, a single sensor alert can be a glitch or incomplete picture. By validating three independent telemetry sources, you established an airtight attack chain:</p>
                                  <p><strong>1. Delivery (Email Gateway):</strong> Confirms delivery of a spear-phishing invoice attachment to Michael Chen at 09:18 AM.</p>
                                  <p><strong>2. Execution (EDR):</strong> Confirms macro code executed upon document opening at 09:19 AM and was immediately killed.</p>
                                  <p><strong>3. Communication (Firewall):</strong> Confirms the secondary callback to the attacker&apos;s external C2 server was blocked.</p>
                                  <p className="text-emerald-700 dark:text-emerald-300 font-semibold pt-1">Result: Proven True Positive incident with full containment verification.</p>
                                </div>
                              </div>
                            ) : (
                              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-700/60 space-y-2 text-xs">
                                <div className="flex items-center gap-2 font-bold text-rose-700 dark:text-rose-300">
                                  <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                                  <span>Incomplete Tool Verification ({Object.values(stage3Checklist).filter(Boolean).length}/3 tools inspected)</span>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                  You must cross-check <strong>all three tools</strong> (Email Gateway, Endpoint EDR, and Network Firewall). In a real triage, relying on a single tool leaves blind spots. Click all three tools and re-check.
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {stage.order === 4 && (
                      <div className="p-4 rounded-2xl bg-card/75 dark:bg-slate-900/60 border border-border/70 dark:border-white/10 space-y-3 text-xs glass-card glass-glossy backdrop-blur-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold text-foreground block">Stage 4: Respond &amp; Stop the Spread</span>
                            <span className="text-[11px] text-muted-foreground">Make operational decisions to limit the attacker&apos;s blast radius</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setStage4Decisions({});
                              setStage4Submitted(false);
                            }}
                            className="text-[11px] text-muted-foreground hover:text-foreground h-6 px-2 cursor-pointer"
                          >
                            Reset Decisions
                          </Button>
                        </div>
                        <div className="space-y-3">
                          <div className="p-3.5 rounded-xl bg-muted/40 dark:bg-slate-800/40 border border-border/60 dark:border-slate-700/60 space-y-2">
                            <p className="text-foreground font-semibold">1. Should we reset Michael Chen&apos;s password immediately?</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {[
                                { val: 'yes', label: 'Yes, immediately. Untrusted macros often attempt credential dumping or session token theft.' },
                                { val: 'no', label: 'No, leave it active until we ask him tomorrow morning.' },
                              ].map((opt) => (
                                <button
                                  key={opt.val}
                                  onClick={() => {
                                    setStage4Decisions((prev) => ({ ...prev, pwd: opt.val }));
                                    setStage4Submitted(false);
                                  }}
                                  className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                                    stage4Decisions.pwd === opt.val
                                      ? opt.val === 'yes'
                                        ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-900 dark:text-emerald-200 font-bold'
                                        : 'bg-rose-500/15 border-rose-500/50 text-rose-900 dark:text-rose-200 font-bold'
                                      : 'bg-background/80 dark:bg-slate-900/40 border-border/60 dark:border-slate-700/60 text-muted-foreground hover:text-foreground'
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-muted/40 dark:bg-slate-800/40 border border-border/60 dark:border-slate-700/60 space-y-2">
                            <p className="text-foreground font-semibold">2. Who hunts for this malicious attachment across all 500 company computers?</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {[
                                { val: 'aditya', label: 'Aditya Deshmukh (L3 Lead Threat Hunter) — using fleet-wide EDR & SIEM queries' },
                                { val: 'self', label: 'You (L1) — manually logging into each computer one-by-one' },
                              ].map((opt) => (
                                <button
                                  key={opt.val}
                                  onClick={() => {
                                    setStage4Decisions((prev) => ({ ...prev, hunt: opt.val }));
                                    setStage4Submitted(false);
                                  }}
                                  className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                                    stage4Decisions.hunt === opt.val
                                      ? opt.val === 'aditya'
                                        ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-900 dark:text-emerald-200 font-bold'
                                        : 'bg-rose-500/15 border-rose-500/50 text-rose-900 dark:text-rose-200 font-bold'
                                      : 'bg-background/80 dark:bg-slate-900/40 border-border/60 dark:border-slate-700/60 text-muted-foreground hover:text-foreground'
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2 flex justify-end border-t border-border/60">
                          <Button
                            size="sm"
                            disabled={!stage4Decisions.pwd || !stage4Decisions.hunt}
                            onClick={() => setStage4Submitted(true)}
                            className="bg-primary hover:bg-primary/90 text-white font-bold text-xs gap-1.5 cursor-pointer disabled:opacity-40 rounded-xl h-8"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Check Operational Decisions</span>
                          </Button>
                        </div>

                        {/* Confirmation & Answer Explanation */}
                        {stage4Submitted && (
                          <div className="animate-fade-in pt-1">
                            {stage4Decisions.pwd === 'yes' && stage4Decisions.hunt === 'aditya' ? (
                              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 space-y-2 text-xs">
                                <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-300 text-sm">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                  <span>Correct! Both Operational Decisions Approved</span>
                                </div>
                                <div className="text-muted-foreground space-y-1.5 leading-relaxed pt-1">
                                  <p><strong>• Password Reset (Correct):</strong> Even though PowerShell was killed quickly, macros can attempt credential dumping in milliseconds. Resetting Michael Chen&apos;s Active Directory password and invalidating active session tokens immediately stops potential lateral movement.</p>
                                  <p><strong>• Fleet Threat Hunting (Correct):</strong> Aditya (L3) writes automated queries across all 500 endpoints in seconds. An L1 analyst checking computers one-by-one would take days and let malware spread unchecked on other hosts.</p>
                                </div>
                              </div>
                            ) : (
                              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-700/60 space-y-2 text-xs">
                                <div className="flex items-center gap-2 font-bold text-rose-700 dark:text-rose-300 text-sm">
                                  <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                                  <span>Incorrect Operational Decision Detected</span>
                                </div>
                                <div className="text-muted-foreground space-y-1 leading-relaxed pt-1">
                                  {stage4Decisions.pwd !== 'yes' && (
                                    <p><strong>• Decision 1 Error:</strong> Michael Chen&apos;s password MUST be reset immediately. Never wait until tomorrow when compromised credentials could be used to wire funds or access internal shares.</p>
                                  )}
                                  {stage4Decisions.hunt !== 'aditya' && (
                                    <p><strong>• Decision 2 Error:</strong> L1 analysts must not attempt manual inspection of 500 machines. Fleet-wide hunting is strictly an L3 responsibility (Aditya) using SIEM and EDR queries.</p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {stage.order === 5 && (
                      <div className="p-4 rounded-2xl bg-card/75 dark:bg-slate-900/60 border border-border/70 dark:border-white/10 space-y-3 text-xs glass-card glass-glossy backdrop-blur-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold text-foreground block">Stage 5 Case Record: Build the Handover Record</span>
                            <span className="text-[11px] text-muted-foreground">Complete all 4 audit fields before escalating to Tier 2</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setStage5Form({ summary: '', targetedUser: '', successful: '', nextRole: '' });
                              setStage5Submitted(false);
                            }}
                            className="text-[11px] text-muted-foreground hover:text-foreground h-6 px-2 cursor-pointer"
                          >
                            Reset Case Form
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-foreground font-semibold block mb-1">1-Sentence Threat Summary:</label>
                            <select
                              value={stage5Form.summary}
                              onChange={(e) => {
                                setStage5Form((prev) => ({ ...prev, summary: e.target.value }));
                                setStage5Submitted(false);
                              }}
                              className="w-full p-2.5 rounded-xl bg-background/90 dark:bg-slate-800/80 border border-border dark:border-slate-700 text-foreground text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                            >
                              <option value="">-- Select Summary --</option>
                              <option value="correct">Spear-phishing email with Office macro executing PowerShell blocked by EDR</option>
                              <option value="incorrect">Some weird glitch happened on a finance laptop</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-foreground font-semibold block mb-1">Targeted Account:</label>
                            <select
                              value={stage5Form.targetedUser}
                              onChange={(e) => {
                                setStage5Form((prev) => ({ ...prev, targetedUser: e.target.value }));
                                setStage5Submitted(false);
                              }}
                              className="w-full p-2.5 rounded-xl bg-background/90 dark:bg-slate-800/80 border border-border dark:border-slate-700 text-foreground text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                            >
                              <option value="">-- Select User --</option>
                              <option value="correct">mchen (Michael Chen, Senior Finance Analyst)</option>
                              <option value="incorrect">Unknown Guest User</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-foreground font-semibold block mb-1">Was Infection Successful?</label>
                            <select
                              value={stage5Form.successful}
                              onChange={(e) => {
                                setStage5Form((prev) => ({ ...prev, successful: e.target.value }));
                                setStage5Submitted(false);
                              }}
                              className="w-full p-2.5 rounded-xl bg-background/90 dark:bg-slate-800/80 border border-border dark:border-slate-700 text-foreground text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                            >
                              <option value="">-- Select Status --</option>
                              <option value="correct">No, EDR sensor terminated PowerShell in 1.1s</option>
                              <option value="incorrect">Yes, ransomware encrypted all files</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-foreground font-semibold block mb-1">Who is Assigned Next?</label>
                            <select
                              value={stage5Form.nextRole}
                              onChange={(e) => {
                                setStage5Form((prev) => ({ ...prev, nextRole: e.target.value }));
                                setStage5Submitted(false);
                              }}
                              className="w-full p-2.5 rounded-xl bg-background/90 dark:bg-slate-800/80 border border-border dark:border-slate-700 text-foreground text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                            >
                              <option value="">-- Select Next Role --</option>
                              <option value="correct">Priya Sharma (L2 Incident Responder)</option>
                              <option value="incorrect">Close ticket without notifying anyone</option>
                            </select>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2 flex justify-end border-t border-border/60">
                          <Button
                            size="sm"
                            disabled={!stage5Form.summary || !stage5Form.targetedUser || !stage5Form.successful || !stage5Form.nextRole}
                            onClick={() => setStage5Submitted(true)}
                            className="bg-primary hover:bg-primary/90 text-white font-bold text-xs gap-1.5 cursor-pointer disabled:opacity-40 rounded-xl h-8"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Validate &amp; Submit Case Record</span>
                          </Button>
                        </div>

                        {/* Confirmation & Answer Explanation */}
                        {stage5Submitted && (
                          <div className="animate-fade-in pt-1">
                            {stage5Form.summary === 'correct' &&
                            stage5Form.targetedUser === 'correct' &&
                            stage5Form.successful === 'correct' &&
                            stage5Form.nextRole === 'correct' ? (
                              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 space-y-2 text-xs">
                                <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-300 text-sm">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                  <span>Correct! Handover Case Record Approved</span>
                                </div>
                                <div className="text-muted-foreground space-y-1.5 leading-relaxed pt-1">
                                  <p><strong>• Threat Summary (Accurate):</strong> Professional documentation must specify vector (spear-phishing), payload (macro), execution (PowerShell), and defense response (EDR block). Vague phrasing like &lsquo;weird glitch&rsquo; delays IR triage.</p>
                                  <p><strong>• Targeted Account (Michael Chen):</strong> Accurately identifying <code>mchen</code> allows Active Directory teams to audit his recent authentication logs and Treasury transaction requests.</p>
                                  <p><strong>• Infection Outcome (Contained):</strong> Accurately stating that EDR killed PowerShell in 1.1s informs Priya (L2) that immediate code execution failed, but host forensics are still needed.</p>
                                  <p><strong>• Escalation Recipient (Priya Sharma - L2):</strong> Tier 1 analysts do not close confirmed malware alerts. Escalating to Priya initiates deep host artifact inspection and memory dump analysis.</p>
                                </div>
                              </div>
                            ) : (
                              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-700/60 space-y-2 text-xs">
                                <div className="flex items-center gap-2 font-bold text-rose-700 dark:text-rose-300 text-sm">
                                  <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                                  <span>Case Record Rejection: Inaccurate or Incomplete Information</span>
                                </div>
                                <div className="text-muted-foreground space-y-1 leading-relaxed pt-1">
                                  {stage5Form.summary !== 'correct' && (
                                    <p><strong>• Summary Error:</strong> The summary must be technically precise: &lsquo;Spear-phishing email with Office macro executing PowerShell blocked by EDR&rsquo;.</p>
                                  )}
                                  {stage5Form.targetedUser !== 'correct' && (
                                    <p><strong>• Targeted User Error:</strong> The targeted account is Michael Chen (<code>mchen</code>), not an unknown guest.</p>
                                  )}
                                  {stage5Form.successful !== 'correct' && (
                                    <p><strong>• Infection Status Error:</strong> Infection was NOT successful; EDR sensor terminated PowerShell in 1.1 seconds.</p>
                                  )}
                                  {stage5Form.nextRole !== 'correct' && (
                                    <p><strong>• Escalation Error:</strong> Confirmed malware attacks must be handed over to Priya Sharma (L2 Incident Responder), never closed unaddressed.</p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Guided Down Action to Section 4 */}
            <div className="flex justify-end pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('section-kc')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="glass-pill glass-glossy text-xs font-bold gap-2 text-primary border-primary/30 hover:bg-primary/10 cursor-pointer rounded-xl h-8 shadow-xs"
              >
                <span>Next: Knowledge Check &amp; Unlock Chapter 3</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </Button>
            </div>
          </div>

          {/* SECTION 4: KNOWLEDGE CHECK & CHAPTER MILESTONE (Frame-Fitting) */}
          <div id="section-kc" className="min-h-[70vh] flex flex-col justify-center py-4 scroll-mt-24 space-y-4">
            <div className="glass-card glass-glossy p-6 rounded-3xl border border-border/80 bg-card/85 text-foreground space-y-5 shadow-lg backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary text-white text-xs font-bold">
                    Chapter 2 Milestone
                  </Badge>
                  <h4 className="font-extrabold text-base text-foreground">
                    Operational Process Review
                  </h4>
                </div>
                <Badge variant="outline" className="text-xs text-emerald-700 dark:text-emerald-300 border-emerald-400 font-bold">
                  +35 XP Ready
                </Badge>
              </div>

              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 space-y-2 text-xs">
                <span className="font-bold text-foreground block text-sm">Key Process Takeaway:</span>
                <p className="text-muted-foreground leading-relaxed">
                  Never jump straight to conclusion. <strong>Monitor</strong> the queue, <strong>Inspect</strong> the 5 anchors, <strong>Correlate</strong> across multiple sensors, <strong>Respond</strong> with surgical containment, and <strong>Record</strong> the complete audit dossier.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border/60">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveChapter(1)}
                  className="text-xs gap-1 font-semibold rounded-xl"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Chapter 1: People
                </Button>

                <Button
                  onClick={() => handleAdvanceChapter(3)}
                  className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer rounded-xl h-10 px-6 shadow-md hover:bg-primary/90"
                >
                  <span>Advance to Chapter 3: Technology</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ====================================================
          CHAPTER 3: TECHNOLOGY (WHAT TOOLS HELP THE TEAM?)
         ==================================================== */}
      {activeChapter === 3 && (
        <section className="space-y-12 animate-fade-in relative">
          {/* SECTION 1: INTRO & MENTOR BRIEFING (Frame-Fitting) */}
          <div id="section-intro" className="min-h-[70vh] flex flex-col justify-center py-4 scroll-mt-24 space-y-4">
            <GuidedMentorBox
              mentor="rajesh"
              time="09:26 AM"
              quote="Now I am explaining the tools. We are investigating an alert. That alert is not coming out of nowhere. It is coming from five cameras watching FinCorp. Each camera sees something different: one watches emails, one watches laptop programs, one watches network traffic. When an alert fires, we open these cameras. Let me show you on our live stack simulator!"
              scaffolding={{
                term: "Defense-in-Depth SOC Tool Stack",
                analogy: "Like a multi-layered security compound: 1. Perimeter border guards (Firewalls & NDR), 2. Mail screening scanner (Email Gateway), 3. Building security cameras (EDR on workstations), 4. Central command control room (SIEM Correlation), and 5. Automated response dispatchers (SOAR).",
                definition: "The interconnected suite of telemetry, correlation, threat intelligence, and response platforms that provide 360-degree visibility across endpoints, networks, and cloud assets.",
                whyItMatters: "Single tools have blind spots. Corroborating independent alerts across endpoint and network tools proves true threats and eliminates false alarms.",
              }}
            />

            {/* Guided Down Action to Section 2 */}
            <div className="flex justify-end pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('section-demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="glass-pill glass-glossy text-xs font-bold gap-2 text-primary border-primary/30 hover:bg-primary/10 cursor-pointer rounded-xl h-8 shadow-xs"
              >
                <span>Next: Watch Technology Video Simulator</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </Button>
            </div>
          </div>

          {/* SECTION 2: UNIFIED VIDEO DEMO (Frame-Fitting) */}
          <div id="section-demo" className="min-h-[85vh] flex flex-col justify-center py-4 scroll-mt-24 space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs font-bold font-mono">
                  Visual Stage 3 • Video Simulator
                </Badge>
                <h3 className="font-extrabold text-sm sm:text-base text-foreground">
                  Enterprise SOC Tool Stack Simulator
                </h3>
              </div>
              <Badge className="bg-emerald-600 text-white text-[10px] font-bold">
                Auto-Advancing Telemetry
              </Badge>
            </div>

            {/* Unified Tech Stack Simulator Component */}
            <UnifiedTechStackSimulator onConsoleChange={(k) => setSelectedConsoleKey(k as any)} />

            {/* Guided Down Action to Section 3 */}
            <div className="flex justify-end pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('section-interactive')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="glass-pill glass-glossy text-xs font-bold gap-2 text-primary border-primary/30 hover:bg-primary/10 cursor-pointer rounded-xl h-8 shadow-xs"
              >
                <span>Next: Tool Matching Practice Challenge</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </Button>
            </div>
          </div>

          {/* SECTION 3: INTERACTIVE PRACTICE CHALLENGE (Frame-Fitting) */}
          <div id="section-interactive" className="min-h-[85vh] flex flex-col justify-center py-4 scroll-mt-24 space-y-4">

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
                      <div className="p-4 rounded-xl bg-muted/40 border border-border/80 text-foreground space-y-1">
                        <span className="text-[10px] uppercase font-mono font-bold text-amber-600 dark:text-amber-400">
                          SCENARIO #{currentTechQuestionIndex + 1}:
                        </span>
                        <p className="text-foreground text-sm leading-relaxed">{q.scenarioText}</p>
                        <p className="text-foreground font-bold pt-1">{q.question}</p>
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

            {/* Guided Down Action to Section 4 */}
            <div className="flex justify-end pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('section-kc')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="glass-pill glass-glossy text-xs font-bold gap-2 text-primary border-primary/30 hover:bg-primary/10 cursor-pointer rounded-xl h-8 shadow-xs"
              >
                <span>Next: Knowledge Check &amp; Unlock Chapter 4</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </Button>
            </div>
          </div>

          {/* SECTION 4: KNOWLEDGE CHECK & CHAPTER MILESTONE (Frame-Fitting) */}
          <div id="section-kc" className="min-h-[70vh] flex flex-col justify-center py-4 scroll-mt-24 space-y-4">
            <div className="glass-card glass-glossy p-6 rounded-3xl border border-border/80 bg-card/85 text-foreground space-y-5 shadow-lg backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary text-white text-xs font-bold">
                    Chapter 3 Milestone
                  </Badge>
                  <h4 className="font-extrabold text-base text-foreground">
                    Enterprise Technology Stack Review
                  </h4>
                </div>
                <Badge variant="outline" className="text-xs text-emerald-700 dark:text-emerald-300 border-emerald-400 font-bold">
                  +35 XP Ready
                </Badge>
              </div>

              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 space-y-2 text-xs">
                <span className="font-bold text-foreground block text-sm">Key Technology Takeaway:</span>
                <p className="text-muted-foreground leading-relaxed">
                  The SOC operates 5 primary consoles: <strong>SIEM</strong> for centralized radar and log correlation, <strong>EDR</strong> for host inspection and one-click isolation, <strong>NDR / Firewalls</strong> for network wire inspection, <strong>Threat Intel (TIP)</strong> for global IOC reputation, and <strong>SOAR</strong> for automated playbook remediation.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border/60">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveChapter(2)}
                  className="text-xs gap-1 font-semibold rounded-xl"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Chapter 2: Process
                </Button>

                <Button
                  onClick={() => handleAdvanceChapter(4)}
                  className="font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer rounded-xl h-10 px-6 shadow-md hover:bg-primary/90"
                >
                  <span>Advance to Chapter 4: Data Flow</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ====================================================
          CHAPTER 4: DATA FLOW (HOW DID THE ALERT REACH THE SOC?)
         ==================================================== */}
      {activeChapter === 4 && (
        <section className="space-y-12 animate-fade-in relative">
          {/* SECTION 1: INTRO & MENTOR BRIEFING (Frame-Fitting) */}
          <div id="section-intro" className="min-h-[70vh] flex flex-col justify-center py-4 scroll-mt-24 space-y-4">
            <GuidedMentorBox
              mentor="rajesh"
              time="09:27 AM"
              quote="Now I am showing you the journey of this alert. How does it come to you? Imagine a river. A river has a source in the mountains, flows through a channel, and reaches the ocean. An alert also has a journey: source (Michael's laptop), channels (forwarders & SIEM), destination (your triage queue). Let me trace all 6 steps for you on our live pipeline video!"
              scaffolding={{
                term: "End-to-End Telemetry Ingestion Pipeline",
                analogy: "Like an express postal network: 1. Letter written (Sysmon Kernel Event), 2. Sealed & dispatched into courier van (Universal Forwarder on port 9997), 3. Central postal hub sort & stamping (Indexer Warm Storage), 4. Standard address labeling (CIM Schema Normalization), 5. Flagging suspicious package (Correlation Rule Trigger), and 6. Desk delivery (Analyst Triage Queue).",
                definition: "The automated sequence through which raw operating system events are captured, securely encrypted, indexed, normalized, evaluated against correlation rules, and delivered as actionable alerts in under 3 seconds.",
                whyItMatters: "Understanding ingestion delays, data parsing drops, and normalization errors prevents blind spots and ensures legal admissibility of digital evidence.",
              }}
            />

            {/* Guided Down Action to Section 2 */}
            <div className="flex justify-end pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('section-demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="glass-pill glass-glossy text-xs font-bold gap-2 text-primary border-primary/30 hover:bg-primary/10 cursor-pointer rounded-xl h-8 shadow-xs"
              >
                <span>Next: Watch Data Flow Video Simulator</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </Button>
            </div>
          </div>

          {/* SECTION 2: UNIFIED VIDEO DEMO (Frame-Fitting) */}
          <div id="section-demo" className="min-h-[85vh] flex flex-col justify-center py-4 scroll-mt-24 space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs font-bold font-mono">
                  Visual Stage 4 • Video Simulator
                </Badge>
                <h3 className="font-extrabold text-sm sm:text-base text-foreground">
                  The 6-Stage Telemetry Evidence Lifecycle
                </h3>
              </div>
              <Badge className="bg-emerald-600 text-white text-[10px] font-bold">
                Auto-Advancing Pipeline
              </Badge>
            </div>

            {/* Unified Data Flow Simulator Component */}
            <UnifiedDataFlowSimulator onStepChange={(st) => setActiveDataFlowStep(st)} />

            {/* Guided Down Action to Section 3 */}
            <div className="flex justify-end pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('section-interactive')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="glass-pill glass-glossy text-xs font-bold gap-2 text-primary border-primary/30 hover:bg-primary/10 cursor-pointer rounded-xl h-8 shadow-xs"
              >
                <span>Next: Vocabulary Clarity Cards</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </Button>
            </div>
          </div>

          {/* SECTION 3: INTERACTIVE VOCABULARY CLARITY (Frame-Fitting) */}
          <div id="section-interactive" className="min-h-[85vh] flex flex-col justify-center py-4 scroll-mt-24 space-y-4">

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
                    <div className="p-5 rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xl text-foreground space-y-4 animate-fade-in text-xs font-sans shadow-sm">
                      <div className="flex items-center justify-between border-b border-border/60 pb-2">
                        <span className="font-bold text-base text-foreground">{card.title}</span>
                        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10 text-[10px] font-mono font-bold">
                          Card #{card.id}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 space-y-1">
                          <span className="font-bold text-sky-700 dark:text-sky-400 text-sm block">{card.termA}</span>
                          <p className="text-foreground/80 leading-relaxed">{card.defA}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-1">
                          <span className="font-bold text-purple-700 dark:text-purple-400 text-sm block">{card.termB}</span>
                          <p className="text-foreground/80 leading-relaxed">{card.defB}</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 space-y-1">
                        <span className="font-bold text-[11px] uppercase tracking-wider block font-mono text-amber-800 dark:text-amber-300">
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
                          className="text-xs gap-1 glass-pill bg-background/80 hover:bg-muted text-foreground border-border/80 disabled:opacity-40"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          Previous Card
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setActiveVocabCardIndex(0)}
                          disabled={activeVocabCardIndex === 0}
                          className="text-xs gap-1 glass-pill bg-background/80 hover:bg-muted text-muted-foreground hover:text-foreground border-border/80 disabled:opacity-40"
                        >
                          <RotateCcw className="w-3 h-3" />
                          Reset to Card 1
                        </Button>
                        <Button
                          size="sm"
                          disabled={activeVocabCardIndex >= CHAPTER_4_VOCAB_CARDS.length - 1}
                          onClick={() => setActiveVocabCardIndex((prev) => Math.min(CHAPTER_4_VOCAB_CARDS.length - 1, prev + 1))}
                          className="text-xs gap-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-xs disabled:opacity-40"
                        >
                          <span>Next Card</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Guided Down Action to Section 4 */}
              <div className="flex justify-end pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('section-kc')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="glass-pill glass-glossy text-xs font-bold gap-2 text-primary border-primary/30 hover:bg-primary/10 cursor-pointer rounded-xl h-8 shadow-xs"
                >
                  <span>Next: Milestone Knowledge Check</span>
                  <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                </Button>
              </div>
            </div>

            {/* SECTION 4: KNOWLEDGE CHECK & CHAPTER MILESTONE (Frame-Fitting) */}
            <div id="section-kc" className="min-h-[85vh] flex flex-col justify-center py-4 scroll-mt-24 space-y-6">
              <div className="glass-card glass-glossy p-6 sm:p-8 rounded-3xl border border-border/80 bg-card/90 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs font-bold font-mono">
                      Milestone Check • Data Flow Complete
                    </Badge>
                    <h3 className="text-base sm:text-lg font-extrabold text-foreground">
                      Telemetry & Parsing Architecture Mastered
                    </h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  You now comprehend how endpoint Sysmon events journey through forwarders, indexes, CIM schemas, and correlation pipelines in under 3 seconds to empower analyst decisions.
                </p>
                <div className="pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveChapter(3)}
                    className="glass-pill text-xs gap-1.5 font-bold"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Chapter 3: Technology
                  </Button>
                  <Button
                    onClick={() => handleAdvanceChapter(5)}
                    className="glass-pill glass-glossy font-bold text-xs gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md cursor-pointer h-10 px-5"
                  >
                    <span>Advance to Chapter 5: Live Demo</span>
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </Button>
                </div>
              </div>
            </div>
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

            <CardContent className="p-6 space-y-8">
              {/* SECTION 1: INTRO */}
              <div id="section-intro" className="scroll-mt-24 space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs font-bold font-mono">
                      Payoff Stage 5 • Architecture in Motion
                    </Badge>
                    <h3 className="font-extrabold text-sm sm:text-base text-foreground">
                      Full Incident Lifecycle Execution
                    </h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Alert SEC-2026-0412 is firing across the SOC infrastructure. Walk through each chronological stage to observe how Tier 1 triage, Tier 2 response, Tier 3 engineering, and management orchestrate threat neutralization in real time.
                </p>
                <div className="flex justify-end pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('section-demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="glass-pill glass-glossy text-xs font-bold gap-2 text-primary border-primary/30 hover:bg-primary/10 cursor-pointer rounded-xl h-8 shadow-xs"
                  >
                    <span>Next: Live Incident Simulation</span>
                    <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                  </Button>
                </div>
              </div>

              {/* SECTION 2: LIVE SIMULATION DEMO */}
              <div id="section-demo" className="scroll-mt-24 space-y-4 pt-4 border-t">
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
                    <div className="p-6 rounded-2xl bg-card border border-border/80 text-foreground space-y-5 shadow-xs font-sans text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/60 pb-3 gap-2">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-primary font-bold block">
                            Simulation Timeline: {currentSim.timestamp}
                          </span>
                          <h4 className="text-base font-bold text-foreground mt-0.5">{currentSim.title}</h4>
                        </div>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs w-fit font-mono font-bold">
                          Stage {demoStage} of 7
                        </Badge>
                      </div>

                      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-2">
                        <span className="text-amber-800 dark:text-amber-300 font-bold font-mono text-[10px] uppercase block">Visual Incident Event:</span>
                        <p className="text-foreground text-sm leading-relaxed">{currentSim.visualSummary}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-foreground space-y-1 italic text-xs">
                        <span className="font-bold text-primary font-mono not-italic block">Rajesh Kumar Narration:</span>
                        <p>{currentSim.rajeshDialogue}</p>
                      </div>

                      {/* Telemetry Inspector */}
                      <div className="p-4 rounded-xl bg-muted/40 border border-border/80 space-y-2">
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold font-mono text-[10px] uppercase block">
                          Interactive Telemetry Inspector ({currentSim.inspectorTitle}):
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                          {Object.entries(currentSim.inspectorDetails).map(([k, v]) => (
                            <div key={k} className="p-2.5 rounded-lg bg-background/80 border border-border/80 flex items-center justify-between">
                              <span className="text-muted-foreground">{k}:</span>
                              <span className="text-foreground font-semibold truncate max-w-[200px]">{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                <div className="flex justify-end pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('section-interactive')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="glass-pill glass-glossy text-xs font-bold gap-2 text-primary border-primary/30 hover:bg-primary/10 cursor-pointer rounded-xl h-8 shadow-xs"
                  >
                    <span>Next: 4 Pillars Architectural Summary</span>
                    <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                  </Button>
                </div>
              </div>

              {/* SECTION 3: ARCHITECTURE SUMMARY & COMPLETION */}
              <div id="section-interactive" className="scroll-mt-24 space-y-4 pt-4 border-t">
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
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                        briefingStoryChoice === opt.id ? 'border-primary bg-primary/20' : 'border-muted-foreground/40'
                      }`}>
                        {briefingStoryChoice === opt.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
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
              <div className="p-4 rounded-xl border bg-card space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <span className="font-bold text-sm text-primary block">
                      Question 3 (The Process): In what sequence did these 7 events occur?
                    </span>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      Elena: &ldquo;Arrange the timeline from first event (email arrival) to final triage. Use the ▲ Up and ▼ Down buttons on each card to order them from Step 1 to Step 7.&rdquo;
                    </p>
                  </div>
                  {!handoverSubmitted && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setTimelineEventOrder(['evt-2', 'evt-4', 'evt-1', 'evt-5', 'evt-3', 'evt-7', 'evt-6'])}
                      className="text-xs text-muted-foreground hover:text-foreground h-7 px-2 shrink-0 self-start sm:self-auto"
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      Shuffle Order
                    </Button>
                  )}
                </div>

                <div className="space-y-2 pt-1">
                  {timelineEventOrder.map((evtId, index) => {
                    const evt = HANDOVER_TIMELINE_EVENTS.find((e) => e.id === evtId)!;
                    const isCorrect = evt.correctOrder === index + 1;

                    return (
                      <div
                        key={evt.id}
                        className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 transition-all ${
                          handoverSubmitted
                            ? isCorrect
                              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-950 dark:text-emerald-200'
                              : 'bg-rose-500/10 border-rose-500/40 text-rose-950 dark:text-rose-200'
                            : 'bg-muted/40 hover:bg-muted/70 border-border text-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          <span
                            className={`w-6 h-6 rounded-md flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                              handoverSubmitted
                                ? isCorrect
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-rose-500 text-white'
                                : 'bg-primary text-primary-foreground'
                            }`}
                          >
                            {index + 1}
                          </span>
                          <span className="leading-snug flex-1 font-sans">{evt.text}</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {handoverSubmitted ? (
                            <Badge
                              variant="outline"
                              className={`font-mono text-[10px] ${
                                isCorrect
                                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                                  : 'border-rose-500 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40'
                              }`}
                            >
                              {isCorrect
                                ? `✓ ${evt.timestamp}`
                                : `✗ Step ${evt.correctOrder} (${evt.timestamp})`}
                            </Badge>
                          ) : (
                            <div className="flex items-center gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={index === 0}
                                onClick={() => handleMoveTimelineItem(index, 'up')}
                                className="h-7 w-7 p-0 cursor-pointer disabled:opacity-30"
                                title="Move Earlier in Timeline"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={index === timelineEventOrder.length - 1}
                                onClick={() => handleMoveTimelineItem(index, 'down')}
                                className="h-7 w-7 p-0 cursor-pointer disabled:opacity-30"
                                title="Move Later in Timeline"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Question 3 Explanation on submission */}
                {handoverSubmitted && (
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 space-y-2 text-xs animate-fade-in">
                    <span className="font-bold text-primary font-mono uppercase text-[10px] flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-primary" />
                      Correct Chronological Incident Timeline:
                    </span>
                    <ol className="text-foreground/90 space-y-1 list-decimal list-inside leading-relaxed text-[11px]">
                      <li><strong className="text-foreground">09:18:47 AM:</strong> Email Gateway logs inbound phishing email with malicious macro delivered.</li>
                      <li><strong className="text-foreground">09:19:15 AM:</strong> Michael Chen opens the invoice document on his finance workstation.</li>
                      <li><strong className="text-foreground">09:19:58 AM:</strong> Word triggers PowerShell, but EDR sensor terminates the process in 1.1s.</li>
                      <li><strong className="text-foreground">09:19:59 AM:</strong> Perimeter Firewall blocks the outbound C2 callback attempt to external IP 198.51.100.84.</li>
                      <li><strong className="text-foreground">09:20:00 AM:</strong> SIEM correlates logs across Email + EDR + Firewall and generates Alert SEC-2026-0412.</li>
                      <li><strong className="text-foreground">09:20:02 AM:</strong> Alert lands in your L1 triage queue; you claim it and extract the 5 facts.</li>
                      <li><strong className="text-foreground">09:24:00 AM:</strong> You document the findings in Case #SEC-2026-0412 and route to Priya Sharma (L2).</li>
                    </ol>
                  </div>
                )}
              </div>

              {/* Question 4: The Technology Match */}
              <div className="p-4 rounded-xl border bg-card space-y-3">
                <span className="font-bold text-sm text-primary block">
                  Question 4 (The Technology): Match Questions to the 5 Tools
                </span>
                <p className="text-muted-foreground text-xs">
                  Elena: &ldquo;Select the primary security console an analyst uses to answer each operational question.&rdquo;
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <label className="text-muted-foreground font-semibold block text-xs">
                      A) To know if PowerShell actually ran or was blocked?
                    </label>
                    <select
                      value={briefingTechAnswers.qA || ''}
                      disabled={handoverSubmitted}
                      onChange={(e) => setBriefingTechAnswers((p) => ({ ...p, qA: e.target.value }))}
                      className={`w-full p-2 rounded-lg border text-xs bg-background text-foreground ${
                        handoverSubmitted
                          ? briefingTechAnswers.qA === 'EDR'
                            ? 'border-emerald-500 bg-emerald-500/10'
                            : 'border-rose-500 bg-rose-500/10'
                          : ''
                      }`}
                    >
                      <option value="">-- Select Tool --</option>
                      <option value="EDR">EDR Console</option>
                      <option value="Email">Email Gateway</option>
                      <option value="Firewall">Firewall</option>
                    </select>
                    {handoverSubmitted && (
                      <span className={`text-[11px] block font-medium ${briefingTechAnswers.qA === 'EDR' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {briefingTechAnswers.qA === 'EDR' ? '✓ Correct: EDR Console monitors endpoint execution' : '✗ Expected: EDR Console'}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-muted-foreground font-semibold block text-xs">
                      B) To know if other employees received the same fake email?
                    </label>
                    <select
                      value={briefingTechAnswers.qB || ''}
                      disabled={handoverSubmitted}
                      onChange={(e) => setBriefingTechAnswers((p) => ({ ...p, qB: e.target.value }))}
                      className={`w-full p-2 rounded-lg border text-xs bg-background text-foreground ${
                        handoverSubmitted
                          ? briefingTechAnswers.qB === 'Email'
                            ? 'border-emerald-500 bg-emerald-500/10'
                            : 'border-rose-500 bg-rose-500/10'
                          : ''
                      }`}
                    >
                      <option value="">-- Select Tool --</option>
                      <option value="Email">Email Gateway</option>
                      <option value="EDR">EDR Console</option>
                      <option value="SIEM">SIEM</option>
                    </select>
                    {handoverSubmitted && (
                      <span className={`text-[11px] block font-medium ${briefingTechAnswers.qB === 'Email' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {briefingTechAnswers.qB === 'Email' ? '✓ Correct: Email Gateway shows fleet-wide delivery logs' : '✗ Expected: Email Gateway'}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-muted-foreground font-semibold block text-xs">
                      C) To correlate historical patterns across all tools in 90 days?
                    </label>
                    <select
                      value={briefingTechAnswers.qC || ''}
                      disabled={handoverSubmitted}
                      onChange={(e) => setBriefingTechAnswers((p) => ({ ...p, qC: e.target.value }))}
                      className={`w-full p-2 rounded-lg border text-xs bg-background text-foreground ${
                        handoverSubmitted
                          ? briefingTechAnswers.qC === 'SIEM'
                            ? 'border-emerald-500 bg-emerald-500/10'
                            : 'border-rose-500 bg-rose-500/10'
                          : ''
                      }`}
                    >
                      <option value="">-- Select Tool --</option>
                      <option value="SIEM">SIEM</option>
                      <option value="Firewall">Firewall</option>
                      <option value="Case">Case Management</option>
                    </select>
                    {handoverSubmitted && (
                      <span className={`text-[11px] block font-medium ${briefingTechAnswers.qC === 'SIEM' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {briefingTechAnswers.qC === 'SIEM' ? '✓ Correct: SIEM indexes and correlates multi-source historical logs' : '✗ Expected: SIEM'}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-muted-foreground font-semibold block text-xs">
                      D) To record findings and hand off notes to Priya?
                    </label>
                    <select
                      value={briefingTechAnswers.qD || ''}
                      disabled={handoverSubmitted}
                      onChange={(e) => setBriefingTechAnswers((p) => ({ ...p, qD: e.target.value }))}
                      className={`w-full p-2 rounded-lg border text-xs bg-background text-foreground ${
                        handoverSubmitted
                          ? briefingTechAnswers.qD === 'Case'
                            ? 'border-emerald-500 bg-emerald-500/10'
                            : 'border-rose-500 bg-rose-500/10'
                          : ''
                      }`}
                    >
                      <option value="">-- Select Tool --</option>
                      <option value="Case">Case Management</option>
                      <option value="Email">Email Gateway</option>
                      <option value="EDR">EDR</option>
                    </select>
                    {handoverSubmitted && (
                      <span className={`text-[11px] block font-medium ${briefingTechAnswers.qD === 'Case' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {briefingTechAnswers.qD === 'Case' ? '✓ Correct: Case Management stores notes and handles ticketing' : '✗ Expected: Case Management'}
                      </span>
                    )}
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
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                        briefingEscalationChoice === opt.id ? 'border-primary bg-primary/20' : 'border-muted-foreground/40'
                      }`}>
                        {briefingEscalationChoice === opt.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
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

                      // Question 3: 7-Event Timeline
                      const correctTimelineCount = timelineEventOrder.filter((evtId, idx) => {
                        const evt = HANDOVER_TIMELINE_EVENTS.find((e) => e.id === evtId);
                        return evt?.correctOrder === idx + 1;
                      }).length;
                      const q3Score = Math.round((correctTimelineCount / 7) * 20);
                      score += q3Score;

                      // Question 4: 4 Tool Matches (5 pts each)
                      if (briefingTechAnswers.qA === 'EDR') score += 5;
                      if (briefingTechAnswers.qB === 'Email') score += 5;
                      if (briefingTechAnswers.qC === 'SIEM') score += 5;
                      if (briefingTechAnswers.qD === 'Case') score += 5;

                      // Question 5: Escalation Decision
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
                          title: 'Unit 1 Certified!',
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
                    className="w-full sm:flex-1 h-11 font-bold text-xs gap-2 bg-primary text-primary-foreground shadow-md cursor-pointer"
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
                      setTimelineEventOrder(['evt-2', 'evt-4', 'evt-1', 'evt-5', 'evt-3', 'evt-7', 'evt-6']);
                      setBriefingTechAnswers({});
                      setBriefingEscalationChoice('');
                    }}
                    className="h-11 text-xs gap-1.5 font-semibold text-muted-foreground hover:text-foreground w-full sm:w-auto cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Briefing Answers
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in pt-2">
                  <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                    handoverScore >= 75 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100' : 'bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-100'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-foreground">Elena Gomez Feedback (Score: {handoverScore}%):</span>
                      <Badge className={handoverScore >= 75 ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30' : 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30'}>
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
                          &ldquo;You are on the right track, but your briefing missed some critical boundaries. Review the timeline, role ownership, and technology questions, and retry to submit your final handover.&rdquo;
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
                        setTimelineEventOrder(['evt-2', 'evt-4', 'evt-1', 'evt-5', 'evt-3', 'evt-7', 'evt-6']);
                        setBriefingTechAnswers({});
                        setBriefingEscalationChoice('');
                      }}
                      className="text-xs gap-1 font-semibold w-full sm:w-auto cursor-pointer"
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
