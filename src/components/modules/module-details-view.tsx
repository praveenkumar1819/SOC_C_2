'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  Clock,
  Target,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Award,
  Lock,
  Unlock,
  FlaskConical,
  ExternalLink,
  Shield,
  FileText,
  RotateCcw,
  Sparkles,
  Info,
  Ban,
  Check,
  Layers,
  Network,
  ShieldAlert,
  BookMarked,
  Sliders,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MODULE_04_UNITS, TopicContent, UnitStructure } from '@/data/modules/module-04-units';
import { MODULE_00_UNITS } from '@/data/modules/module-00-units';
import { V2_MODULES, V2Module, V2Unit, V2Chapter, normalizeV2Chapter } from '@/data/curriculum-v2-data';
import { ChapterV2View } from '@/components/learning/v2/chapter-v2-view';
import { UnitAssessmentV2View } from '@/components/learning/v2/unit-assessment-v2-view';
import { VisualStoryDemo } from '@/components/learning/visual-story-demo';
import { InteractiveInvestigation } from '@/components/learning/interactive-investigation';
import { InteractiveTopicDashboard } from '@/components/learning/interactive-topic-dashboard';
import { DragDropCheck } from '@/components/learning/drag-drop-check';
import { MatchingCheckShuffled } from '@/components/learning/matching-check-shuffled';
import { TpFpTriage } from '@/components/learning/tp-fp-triage';
import { GlossaryText } from '@/components/learning/glossary-term-link';
import { SocArchitectureStory } from '@/components/learning/soc-architecture-story';
import { SocTriageStory } from '@/components/learning/soc-triage-story';
import { CourseOrientationStory } from '@/components/learning/module-00-story';
import { SectionSidebarLine } from '@/components/learning/section-sidebar-line';
import { TextSizeControl } from '@/components/layout/text-size-control';
import { useProgressStore } from '@/store/progress-store';
import { useAdminConfigStore } from '@/store/admin-config-store';
import { useGlossaryStore } from '@/store/glossary-store';
import { resolveChapterGlossaryTerms } from '@/lib/chapter-glossary-helper';
import { useToast } from '@/components/ui/toast-provider';
import { CourseLabLauncher } from '@/components/labs/CourseLabLauncher';
import { getDifficultyColor } from '@/lib/utils';
import { BlueGuyCharacter } from '@/components/learning/blue-guys/blue-guy-character';
import { BlueGuyLoadingScreen } from '@/components/learning/blue-guys/blue-guy-loading-screen';
import { BlueGuyNavCompanion } from '@/components/learning/blue-guys/blue-guy-nav-companion';
import { sound } from '@/lib/sound-effects';
import { Module01SimLab } from '@/components/learning/v2/labs/module-01-sim-lab';
import { Module02SimLab } from '@/components/learning/v2/labs/module-02-sim-lab';
import { Module03SimLab } from '@/components/learning/v2/labs/module-03-sim-lab';
import { Module04SimLab } from '@/components/learning/v2/labs/module-04-sim-lab';

interface ModuleDetailsViewProps {
  module: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    estimatedHours: number;
    learningObjectives?: string[];
  };
  v2Module?: V2Module | null;
  isAdmin?: boolean;
  initialTopicId?: string | null;
  initialUnitId?: string | null;
  initialAssessmentId?: string | null;
}

const MODULE_UNITS_REGISTRY: Record<string, UnitStructure[]> = {
  '00': MODULE_00_UNITS,
  '04': MODULE_04_UNITS,
};

// Topic-specific security terms for context-aware Floating Glossary
const TOPIC_GLOSSARY_MAP: Record<string, string[]> = {
  // Module 00: Non-IT Beginner Course Orientation
  'topic-0-1-1': ['SOC', 'Tier 1', 'People', 'Process', 'Technology'],
  'topic-0-1-2': ['IP Address', 'Event', 'Host', 'Firewall'],
  'topic-0-1-3': ['Phishing', 'Malware', 'Ransomware', 'Incident', 'IOC'],
  'topic-0-2-1': ['SOP', 'Playbook', 'Triage'],
  'topic-0-2-2': ['Severity', 'SLA', 'MTTD', 'MTTR'],
  'topic-0-2-3': ['Alert', 'True Positive', 'False Positive', 'Case'],
  'topic-0-3-1': ['Playbook', 'SOP', 'Escalation'],
  'topic-0-3-2': ['SOC', 'L1', 'L2', 'L3'],

  // Module 04: SOC Operations
  'topic-1-1': ['SOC', 'Tier 1', 'Tier 2', 'Tier 3', 'People'],
  'topic-1-2': ['SOP', 'Playbook', 'SLA', 'Process'],
  'topic-1-3': ['SIEM', 'EDR', 'NDR', 'SOAR', 'Technology'],
  'topic-1-4': ['Universal Forwarder', 'Indexer', 'Search Head', 'CIM', 'Data Flow'],
  'topic-2-1': ['Event ID 4625', 'Event ID 4624', 'SIEM', 'Sysmon', 'Event'],
  'topic-2-2': ['True Positive', 'False Positive', 'IOC', 'Incident', 'Case'],
  'topic-3-1': ['Alert', 'Triage', 'Domain Controller', 'Event ID 4625', 'SIEM'],
  'topic-3-2': ['Sysmon', 'Event ID 4688', 'Host', 'IP Address', 'Evidence'],
  'topic-4-1': ['False Positive', 'True Positive', 'Detection Error', 'Benign'],
  'topic-4-2': ['False Positive', 'SIEM', 'Tuning', 'Rule'],
  'topic-5-1': ['Severity', 'SLA', 'MTTD', 'MTTR', 'Critical'],
  'topic-5-2': ['Impact', 'Confidence', 'Asset Value', 'Severity'],
  'topic-6-1': ['L1', 'L2', 'L3', 'Escalation', 'Handoff'],
  'topic-6-2': ['CISO', 'Management Escalation', 'Specialist Escalation', 'IR'],
  'topic-7-1': ['Documentation', 'Evidence', 'Timeline', 'Actions', 'Findings'],
  'topic-7-2': ['Incident Ticket', 'Evidence', 'Timeline', 'Mitigation'],
};

function resolveTopicAndUnit(
  topicParam: string | null | undefined,
  unitParam: string | null | undefined,
  assessmentParam: string | null | undefined,
  unitsList: UnitStructure[]
): {
  view: 'overview' | 'topic' | 'assessment';
  topicId: string;
  assessmentId: string;
  unitId: string;
} {
  const defaultUnit = unitsList[0];
  const defaultTopicId = defaultUnit?.topics[0]?.id || 'topic-1-1';
  const defaultAssessmentId = defaultUnit?.assessment?.id || 'unit-1-assessment';

  // 1. Assessment requested
  if (assessmentParam) {
    let cleanAssessment = assessmentParam.trim();
    if (cleanAssessment === 'true' || cleanAssessment === '1') {
      const u = unitsList.find((unit) => unit.id === unitParam || unit.unitNumber.toString() === unitParam) || defaultUnit;
      return {
        view: 'assessment',
        topicId: u?.topics[0]?.id || defaultTopicId,
        assessmentId: u?.assessment.id || defaultAssessmentId,
        unitId: u?.id || 'unit-1',
      };
    }
    if (!cleanAssessment.includes('assessment')) {
      const uNum = cleanAssessment.replace('unit-', '');
      cleanAssessment = `unit-${uNum}-assessment`;
    }
    const matchingUnit = unitsList.find((u) => u.assessment.id === cleanAssessment || u.id === unitParam) || defaultUnit;
    return {
      view: 'assessment',
      topicId: matchingUnit?.topics[0]?.id || defaultTopicId,
      assessmentId: cleanAssessment,
      unitId: matchingUnit?.id || 'unit-1',
    };
  }

  // 2. Topic parameter requested
  if (topicParam) {
    const rawTrimmed = topicParam.trim();
    // Direct exact or case-insensitive match (e.g. 'M00-U1-C1', 'topic-1-1')
    let target = unitsList
      .flatMap((u) => u.topics)
      .find((t) => t.id === rawTrimmed || t.id.toLowerCase() === rawTrimmed.toLowerCase());

    if (!target) {
      let raw = rawTrimmed;
      if (raw.startsWith('unit-')) {
        const uNum = raw.replace(/^unit-/, '');
        if (uNum.includes('-')) {
          raw = `topic-${uNum}`;
        } else {
          raw = `topic-${uNum}-1`;
        }
      } else {
        const clean = raw.replace(/^topic-/, '').replace('.', '-');
        if (clean.includes('-')) {
          raw = `topic-${clean}`;
        } else {
          raw = `topic-${clean}-1`;
        }
      }

      target = unitsList.flatMap((u) => u.topics).find((t) => t.id === raw);
      if (!target) {
        const match = raw.match(/topic-(\d+)/);
        if (match) {
          const uNum = parseInt(match[1], 10);
          const u = unitsList.find((unit) => unit.unitNumber === uNum);
          if (u && u.topics.length > 0) {
            target = u.topics[0];
          }
        }
      }
    }

    if (target) {
      const parentUnit = unitsList.find((u) => u.topics.some((t) => t.id === target!.id)) || defaultUnit;
      return {
        view: 'topic',
        topicId: target.id,
        assessmentId: parentUnit?.assessment?.id || defaultAssessmentId,
        unitId: parentUnit?.id || defaultUnit?.id || 'unit-1',
      };
    }
  }

  // 3. Unit parameter requested without topic
  if (unitParam) {
    const cleanUnit = unitParam.trim().replace('unit-', '');
    const uNum = parseInt(cleanUnit, 10);
    const u = unitsList.find((unit) => unit.unitNumber === uNum || unit.id === unitParam.trim());
    if (u && u.topics.length > 0) {
      return {
        view: 'topic',
        topicId: u.topics[0].id,
        assessmentId: u.assessment.id,
        unitId: u.id,
      };
    }
  }

  return {
    view: 'overview',
    topicId: defaultTopicId,
    assessmentId: defaultAssessmentId,
    unitId: defaultUnit?.id || 'unit-1',
  };
}

export function ModuleDetailsView({
  module,
  v2Module,
  isAdmin = false,
  initialTopicId,
  initialUnitId,
  initialAssessmentId,
}: ModuleDetailsViewProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [mounted, setMounted] = useState(false);

  const activeV2Module: V2Module | null = useMemo(() => {
    return v2Module || V2_MODULES.find((m) => m.id === module.id) || null;
  }, [v2Module, module.id]);

  const v2UnitsAdapted: UnitStructure[] = useMemo(() => {
    if (!activeV2Module) return [];
    return activeV2Module.units.map((u) => ({
      id: u.id,
      unitNumber: u.unitNumber,
      title: u.title,
      description: u.description,
      estimatedHours: 1,
      topics: u.chapters.map((c, cIdx) => {
        const norm = normalizeV2Chapter(c, u, activeV2Module, cIdx);
        return {
          id: norm.id,
          unitId: u.id,
          title: norm.title,
          order: norm.chapterNumber,
          estimatedMinutes: norm.duration,
          xpReward: norm.xpReward,
          theory: {
            summaryLines: [norm.section1_theory.content.slice(0, 200)],
            knowMore: {
              title: norm.title,
              description: norm.section1_theory.keyTakeaway,
              externalUrl: 'https://cdac.in',
              externalLabel: 'CDAC Portal',
            },
          },
          demo: {
            title: norm.section2_visual.title,
            subtitle: norm.section2_visual.description,
            steps: [],
          },
          interactive: {
            title: norm.section3_interactive.title,
            scenario: norm.section3_interactive.scenario || '',
            cards: [],
          },
          socContext: {
            title: 'SOC Context',
            scenario: norm.story,
            analystMindset: norm.section1_theory.keyTakeaway,
            bestPractices: [norm.section1_theory.keyTakeaway],
          },
          knowledgeCheck: {},
        } as TopicContent;
      }),
      assessment: {
        id: u.assessment.id,
        unitId: u.id,
        title: u.assessment.title,
        estimatedMinutes: u.assessment.duration,
        xpReward: u.assessment.xpReward,
        passingScore: u.assessment.passingScore,
        questions: u.assessment.questions.map((q, qIdx) => ({
          id: `q-${u.assessment.id}-${qIdx}`,
          question: q.question,
          options: q.options,
          correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
          explanation: q.explanation,
          relatedConcept: u.title,
        })),
      },
    }));
  }, [activeV2Module]);

  const isModule04 = module.id === '04';
  const isModule00 = module.id === '00';
  const isModule01 = module.id === '01' || module.id === 'M01';
  const isModule02 = module.id === '02' || module.id === 'M02';
  const isModule03 = module.id === '03' || module.id === 'M03';
  const [isMod01LabOpen, setIsMod01LabOpen] = useState(false);
  const [isMod02LabOpen, setIsMod02LabOpen] = useState(false);
  const [isMod03LabOpen, setIsMod03LabOpen] = useState(false);
  const [isMod04LabOpen, setIsMod04LabOpen] = useState(false);
  const units = useMemo(
    () => v2UnitsAdapted.length > 0 ? v2UnitsAdapted : (MODULE_UNITS_REGISTRY[module.id] || (isModule04 ? MODULE_04_UNITS : [])),
    [v2UnitsAdapted, module.id, isModule04]
  );
  const hasUnits = units.length > 0;

  // Flat sequence of items for linear Previous/Next navigation
  const flatSequence = useMemo(() => {
    const seq: Array<{
      type: 'topic' | 'assessment';
      unitId: string;
      id: string;
      title: string;
    }> = [];
    units.forEach((u) => {
      u.topics.forEach((t) => {
        seq.push({
          type: 'topic',
          unitId: u.id,
          id: t.id,
          title: t.title,
        });
      });
      seq.push({
        type: 'assessment',
        unitId: u.id,
        id: u.assessment.id,
        title: u.assessment.title,
      });
    });
    return seq;
  }, [units]);

  const initialResolved = resolveTopicAndUnit(initialTopicId, initialUnitId, initialAssessmentId, units);

  // State management
  const [activeView, setActiveView] = useState<'overview' | 'topic' | 'assessment'>(
    initialResolved.view
  );
  const [activeTopicId, setActiveTopicId] = useState<string>(
    initialResolved.topicId
  );
  const [activeAssessmentId, setActiveAssessmentId] = useState<string>(
    initialResolved.assessmentId
  );
  const [activeKnowMoreOpen, setActiveKnowMoreOpen] = useState(false);

  // Blue Squad Animated Loading State
  const [isNavLoading, setIsNavLoading] = useState(false);
  const [navLoadingTargetTitle, setNavLoadingTargetTitle] = useState('');
  const pendingNavigationRef = useRef<(() => void) | null>(null);

  const handleLoadingFinished = useCallback(() => {
    if (pendingNavigationRef.current) {
      pendingNavigationRef.current();
      pendingNavigationRef.current = null;
    }
    setIsNavLoading(false);
  }, []);

  // Accordion state for expandable units: default open Unit 1 (or current unit)
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    units.forEach((u, i) => {
      initial[u.id] = u.id === initialResolved.unitId || i === 0;
    });
    return initial;
  });

  // Unit Assessment quiz states (persisted in local state)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Topic Knowledge Checks completion tracking (persisted in localStorage)
  const [completedChecks, setCompletedChecks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`soc_completed_kc_${module.id}`);
      if (saved) {
        setCompletedChecks(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  }, [module.id]);

  const markCheckComplete = (checkId: string) => {
    setCompletedChecks((prev) => {
      const next = { ...prev, [checkId]: true };
      try {
        localStorage.setItem(`soc_completed_kc_${module.id}`, JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  // Store integration
  const { completedTopics, completeTopic, completedUnits, completeUnit, totalXP, addXP } = useProgressStore();
  const {
    disabledModules,
    disabledUnits,
    disabledTopics,
    labsEnabled,
    unlockedAssessments,
    xpSystemEnabled,
    freeNavigationEnabled,
  } = useAdminConfigStore();

  const openGlossary = useGlossaryStore((state) => state.openGlossary);
  const setCurrentTopicTerms = useGlossaryStore((state) => state.setCurrentTopicTerms);

  const [chapterLockStatus, setChapterLockStatus] = useState<{
    chapterId?: string;
    canAdvance: boolean;
    missingRequirements: string[];
  }>({ canAdvance: true, missingRequirements: [] });

  useEffect(() => {
    const handleLockStatus = (e: any) => {
      if (e.detail) {
        setChapterLockStatus({
          chapterId: e.detail.chapterId,
          canAdvance: !!e.detail.canAdvance,
          missingRequirements: e.detail.missingRequirements || [],
        });
      }
    };
    window.addEventListener('soc:chapter-lock-status', handleLockStatus);
    return () => window.removeEventListener('soc:chapter-lock-status', handleLockStatus);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // URL query parameter sync for refresh stability
  const syncUrl = useCallback((view: 'overview' | 'topic' | 'assessment', id?: string) => {
    if (typeof window === 'undefined') return;
    try {
      if (view === 'overview') {
        window.history.replaceState(null, '', `/modules/${module.id}`);
      } else if (view === 'topic' && id) {
        window.history.replaceState(null, '', `/modules/${module.id}?topic=${id}`);
      } else if (view === 'assessment' && id) {
        window.history.replaceState(null, '', `/modules/${module.id}?assessment=${id}`);
      }
    } catch (e) {
      console.error('Failed to sync URL:', e);
    }
  }, [module.id]);

  // Unit locked check - Unit N (N > 1) is locked if previous unit's assessment is not completed
  const isUnitLocked = useCallback((unitNumber: number, unitId: string): boolean => {
    if (!mounted || freeNavigationEnabled) return false;
    if (unitNumber <= 1 || unitId === 'unit-1') return false;
    const prevUnit = units.find((u) => u.unitNumber === unitNumber - 1);
    if (!prevUnit) return false;
    const prevAssessmentCompleted =
      completedUnits.has(prevUnit.assessment.id) ||
      completedUnits.has(prevUnit.id) ||
      !!quizSubmitted[prevUnit.assessment.id] ||
      unlockedAssessments.includes(prevUnit.assessment.id);
    return !prevAssessmentCompleted;
  }, [mounted, freeNavigationEnabled, units, completedUnits, quizSubmitted, unlockedAssessments]);

  // Item locked check - Item is locked if its parent unit is locked OR if previous item is not completed
  const isItemLocked = useCallback((itemId: string): boolean => {
    if (!mounted || freeNavigationEnabled) return false;
    const item = flatSequence.find((i) => i.id === itemId);
    if (!item) return false;

    // Check parent unit lock
    const unit = units.find((u) => u.id === item.unitId);
    if (unit && isUnitLocked(unit.unitNumber, unit.id)) {
      return true;
    }

    // Check sequential progress
    const index = flatSequence.findIndex((i) => i.id === itemId);
    if (index <= 0) return false; // First topic in Unit 1 is always unlocked

    const prevItem = flatSequence[index - 1];
    if (prevItem.type === 'assessment') {
      return !(
        completedUnits.has(prevItem.id) ||
        completedUnits.has(prevItem.unitId) ||
        !!quizSubmitted[prevItem.id] ||
        unlockedAssessments.includes(prevItem.id)
      );
    }
    return !completedTopics.has(prevItem.id);
  }, [mounted, freeNavigationEnabled, flatSequence, units, isUnitLocked, completedUnits, quizSubmitted, unlockedAssessments, completedTopics]);

  // Listen for navigation event from CurriculumTreeDrawer
  useEffect(() => {
    const handleNavigate = (e: any) => {
      const detail = e.detail;
      if (detail?.moduleId === module.id) {
        if (detail.topicId) {
          if (isItemLocked(detail.topicId)) {
            showToast({
              type: 'warning',
              title: 'Chapter Locked 🔒',
              description: 'Complete previous chapters to unlock this chapter.',
            });
            return;
          }
          setActiveTopicId(detail.topicId);
          setActiveView('topic');
          const unit = units.find((u) => u.topics.some((t) => t.id === detail.topicId));
          if (unit) {
            setExpandedUnits((prev) => ({ ...prev, [unit.id]: true }));
          }
          syncUrl('topic', detail.topicId);
        } else if (detail.assessmentId) {
          if (isItemLocked(detail.assessmentId)) {
            showToast({
              type: 'warning',
              title: 'Assessment Locked 🔒',
              description: 'Complete all previous chapters to unlock this assessment.',
            });
            return;
          }
          setActiveAssessmentId(detail.assessmentId);
          setActiveView('assessment');
          const unit = units.find((u) => u.assessment.id === detail.assessmentId);
          if (unit) {
            setExpandedUnits((prev) => ({ ...prev, [unit.id]: true }));
          }
          syncUrl('assessment', detail.assessmentId);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('soc:navigate-topic', handleNavigate);
    return () => window.removeEventListener('soc:navigate-topic', handleNavigate);
  }, [module.id, units, isItemLocked, showToast, syncUrl]);

  // Sync with initialTopicId / initialUnitId / initialAssessmentId prop changes
  useEffect(() => {
    if (initialTopicId || initialUnitId || initialAssessmentId) {
      const res = resolveTopicAndUnit(initialTopicId, initialUnitId, initialAssessmentId, units);
      setActiveTopicId(res.topicId);
      setActiveAssessmentId(res.assessmentId);
      setActiveView(res.view);
      if (res.unitId) {
        setExpandedUnits((prev) => ({ ...prev, [res.unitId]: true }));
      }
    }
  }, [initialTopicId, initialUnitId, initialAssessmentId, units]);

  const isModuleDisabled = mounted && disabledModules.includes(module.id);

  // Current active topic with robust fallback
  let currentTopic: TopicContent | undefined = units
    .flatMap((u) => u.topics)
    .find((t) => t.id === activeTopicId);

  if (!currentTopic && activeTopicId) {
    const match = activeTopicId.match(/topic-(\d+)/);
    if (match) {
      const uNum = parseInt(match[1], 10);
      const unit = units.find((u) => u.unitNumber === uNum);
      if (unit && unit.topics.length > 0) {
        currentTopic = unit.topics[0];
      }
    }
  }

  if (!currentTopic && units.length > 0) {
    currentTopic = units[0]?.topics[0];
  }

  // Checks required for current topic
  const currentTopicCheckIds = currentTopic ? [
    currentTopic.knowledgeCheck.dragDrop ? `${currentTopic.id}-dragdrop` : null,
    currentTopic.knowledgeCheck.matching ? `${currentTopic.id}-matching` : null,
    currentTopic.knowledgeCheck.triageScenario ? `${currentTopic.id}-triage` : null,
  ].filter(Boolean) as string[] : [];

  const isFreeNav = true; // All topics open for learner exploration
  const areAllTopicChecksDone =
    !currentTopic ||
    isFreeNav ||
    completedTopics.has(currentTopic.id) ||
    currentTopicCheckIds.length === 0 ||
    currentTopicCheckIds.every((id) => !!completedChecks[id]);

  // Current active unit (prioritize assessmentId when in assessment view)
  const currentUnit: UnitStructure | undefined = (
    activeView === 'assessment'
      ? units.find((u) => u.assessment.id === activeAssessmentId) || units.find((u) => currentTopic && u.topics.some((t) => t.id === currentTopic.id))
      : units.find((u) => currentTopic && u.topics.some((t) => t.id === currentTopic.id)) || units.find((u) => u.assessment.id === activeAssessmentId)
  ) || units[0];

  // Current index in linear navigation sequence
  const currentSequenceIndex = flatSequence.findIndex((item) =>
    activeView === 'topic' ? item.id === activeTopicId : item.id === activeAssessmentId
  );

  // Stable memoized V2 Chapter context so object reference does not change across parent re-renders
  const v2ChapterContext = useMemo(() => {
    if (!activeV2Module || !currentTopic) return null;
    const v2Unit =
      activeV2Module.units.find(
        (u) =>
          u.chapters.some((c) => c.id === currentTopic!.id) ||
          (currentUnit && u.id === currentUnit.id)
      ) || activeV2Module.units[0];
    const chIdx = v2Unit.chapters.findIndex((c) => c.id === currentTopic!.id);
    const rawCh = chIdx !== -1 ? v2Unit.chapters[chIdx] : v2Unit.chapters[0];
    const v2Chapter = normalizeV2Chapter(rawCh, v2Unit, activeV2Module, Math.max(0, chIdx));
    return { v2Unit, v2Chapter };
  }, [activeV2Module, currentTopic, currentUnit]);

  // Update floating glossary relevant terms dynamically when active topic changes
  useEffect(() => {
    if (activeView === 'topic') {
      if (activeV2Module && v2ChapterContext) {
        const { v2Unit, v2Chapter } = v2ChapterContext;
        const relevantTerms = resolveChapterGlossaryTerms({
          moduleId: activeV2Module.id,
          chapterId: v2Chapter.id,
          chapterTitle: v2Chapter.title,
          unitTitle: v2Unit.title,
          pillarHeadings: [
            v2Chapter.section1_theory?.title,
            v2Chapter.section2_visual?.title,
            v2Chapter.section3_interactive?.title,
            v2Chapter.section1_theory?.keyTakeaway,
          ].filter(Boolean) as string[],
          techBoxTitles: [
            v2Chapter.section1_theory?.terminologyScaffolding?.concept,
            ...(v2Chapter.section1_theory?.formalDefinitions?.map((f) => f.term) || []),
          ].filter(Boolean) as string[],
        });
        setCurrentTopicTerms(relevantTerms);
      } else if (activeTopicId) {
        const relevantTerms =
          TOPIC_GLOSSARY_MAP[activeTopicId] ||
          resolveChapterGlossaryTerms({
            moduleId: module.id,
            chapterId: activeTopicId,
            chapterTitle: currentTopic?.title,
            unitTitle: currentUnit?.title,
          });
        setCurrentTopicTerms(relevantTerms);
      }
    }
  }, [
    activeView,
    activeTopicId,
    activeV2Module,
    v2ChapterContext,
    module.id,
    currentTopic?.title,
    currentUnit?.title,
    setCurrentTopicTerms,
  ]);


  // Get prerequisite item for tooltip / lock notification
  const getPrerequisiteItem = (itemId: string) => {
    const index = flatSequence.findIndex((item) => item.id === itemId);
    if (index > 0) {
      return flatSequence[index - 1];
    }
    return null;
  };

  // Calculated overall module progress
  const totalTopicsCount = units.flatMap((u) => u.topics).length;
  const completedCount = mounted
    ? units.flatMap((u) => u.topics).filter((t) => completedTopics.has(t.id)).length
    : 0;
  const completionPercentage = totalTopicsCount > 0 ? Math.round((completedCount / totalTopicsCount) * 100) : 0;

  // Unit completion check logic
  const isUnitCompleted = (unitId: string): boolean => {
    if (!mounted) return false;
    const unit = units.find((u) => u.id === unitId);
    if (!unit) return false;
    const allTopicsDone = unit.topics.every((t) => completedTopics.has(t.id));
    const assessmentDone =
      completedUnits.has(unit.assessment.id) ||
      completedUnits.has(unit.id) ||
      !!quizSubmitted[unit.assessment.id] ||
      unlockedAssessments.includes(unit.assessment.id);
    return allTopicsDone || assessmentDone;
  };

  // Toggle accordion unit expand/collapse
  const toggleUnitAccordion = (unitId: string) => {
    setExpandedUnits((prev) => ({
      ...prev,
      [unitId]: !prev[unitId],
    }));
  };

  // Linear Navigation Handlers: Smooth progression across all topics & assessments
  const handleNext = () => {
    // Progression lock enforcement: learner must interact with all elements and pass KC before advancing
    if (!freeNavigationEnabled && activeView === 'topic') {
      const isLocked =
        (chapterLockStatus.chapterId === activeTopicId && !chapterLockStatus.canAdvance) ||
        (!areAllTopicChecksDone && currentTopic && !completedTopics.has(currentTopic.id));

      if (isLocked) {
        const reqs =
          chapterLockStatus.chapterId === activeTopicId && chapterLockStatus.missingRequirements.length > 0
            ? chapterLockStatus.missingRequirements
            : ['Interact with all visual story elements and clear the Knowledge Check'];

        showToast({
          type: 'warning',
          title: 'Topic Locked 🔒',
          description: `To advance to the next topic, please complete:\n• ${reqs.join('\n• ')}`,
        });
        window.dispatchEvent(new CustomEvent('soc:finish-chapter'));
        return;
      }
    }

    if (currentSequenceIndex >= 0 && currentSequenceIndex < flatSequence.length - 1) {
      const currentItem = flatSequence[currentSequenceIndex];
      // Mark current topic complete and award XP if not already done
      if (currentItem && currentItem.type === 'topic' && !completedTopics.has(currentItem.id)) {
        completeTopic(currentItem.id);
        if (xpSystemEnabled) addXP(35);
      }
      const nextItem = flatSequence[currentSequenceIndex + 1];
      setNavLoadingTargetTitle(nextItem.title);

      const applyNav = () => {
        if (nextItem.type === 'topic') {
          setActiveTopicId(nextItem.id);
          setActiveView('topic');
          syncUrl('topic', nextItem.id);
        } else {
          setActiveAssessmentId(nextItem.id);
          setActiveView('assessment');
          syncUrl('assessment', nextItem.id);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      pendingNavigationRef.current = applyNav;
      setIsNavLoading(true);

      // Pre-render destination under the full-screen loading modal around 2500ms
      setTimeout(() => {
        if (pendingNavigationRef.current === applyNav) {
          applyNav();
          pendingNavigationRef.current = null;
        }
      }, 2500);
    } else if (currentSequenceIndex === -1 && flatSequence.length > 0) {
      // If currently at overview or unknown index, go to first topic
      const firstItem = flatSequence[0];
      setNavLoadingTargetTitle(firstItem.title);

      const applyNav = () => {
        if (firstItem.type === 'topic') {
          setActiveTopicId(firstItem.id);
          setActiveView('topic');
          syncUrl('topic', firstItem.id);
        } else {
          setActiveAssessmentId(firstItem.id);
          setActiveView('assessment');
          syncUrl('assessment', firstItem.id);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      pendingNavigationRef.current = applyNav;
      setIsNavLoading(true);

      setTimeout(() => {
        if (pendingNavigationRef.current === applyNav) {
          applyNav();
          pendingNavigationRef.current = null;
        }
      }, 2500);
    } else {
      // Reached the end of the entire module - return to overview
      setActiveView('overview');
      syncUrl('overview');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentSequenceIndex > 0) {
      const prevItem = flatSequence[currentSequenceIndex - 1];
      setNavLoadingTargetTitle(prevItem.title);

      const applyNav = () => {
        if (prevItem.type === 'topic') {
          setActiveTopicId(prevItem.id);
          setActiveView('topic');
          syncUrl('topic', prevItem.id);
        } else {
          setActiveAssessmentId(prevItem.id);
          setActiveView('assessment');
          syncUrl('assessment', prevItem.id);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      pendingNavigationRef.current = applyNav;
      setIsNavLoading(true);

      setTimeout(() => {
        if (pendingNavigationRef.current === applyNav) {
          applyNav();
          pendingNavigationRef.current = null;
        }
      }, 2500);
    }
  };

  const handleCompleteTopic = (topicId: string, xpReward: number) => {
    if (!completedTopics.has(topicId)) {
      completeTopic(topicId);
      if (xpSystemEnabled) {
        addXP(xpReward);
      }
      showToast({
        type: 'success',
        title: 'Chapter Completed! 🎉',
        description: `Chapter marked complete. Next chapter has been unlocked! +${xpSystemEnabled ? xpReward : 0} XP.`,
      });
    }
  };

  const handleCompleteUnitAssessment = (targetUnitId: string) => {
    completeUnit(targetUnitId, 100);
    const targetUnit = units.find((u) => u.id === targetUnitId);
    if (targetUnit) {
      completeUnit(targetUnit.assessment.id, 100);
      targetUnit.topics.forEach((t) => completeTopic(t.id));
      setQuizSubmitted((prev) => ({ ...prev, [targetUnit.assessment.id]: true }));
    }
  };

  // Find next uncompleted topic that is unlocked
  const currentPlayableTopic = currentTopic || units[0]?.topics[0];

  return (
    <div className="w-full max-w-[1800px] mx-auto px-2 sm:px-4 lg:px-6 space-y-6 animate-fade-in pb-20">
      {/* ========================================================
          VIEW: TOPIC LEARNING VIEW (CONTINUOUS MODERN FLOW - NO CARD-BY-CARD)
         ======================================================== */}
      {activeView === 'topic' && currentTopic && currentUnit && (
        isUnitLocked(currentUnit.unitNumber, currentUnit.id) || isItemLocked(currentTopic.id) ? (
          <div className="p-8 sm:p-12 rounded-2xl border bg-card text-center space-y-5 max-w-lg mx-auto shadow-sm my-10 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto ring-8 ring-amber-500/5">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <Badge variant="outline" className="text-amber-700 bg-amber-50 border-amber-300 font-bold uppercase tracking-wider text-[10px]">
                {isUnitLocked(currentUnit.unitNumber, currentUnit.id) ? 'Unit Locked' : 'Chapter Locked'}
              </Badge>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
                {isUnitLocked(currentUnit.unitNumber, currentUnit.id) ? currentUnit.title : currentTopic.title}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                {isUnitLocked(currentUnit.unitNumber, currentUnit.id) ? (
                  <>
                    This unit is locked. You must complete{' '}
                    <strong className="text-foreground">Unit {currentUnit.unitNumber - 1}</strong> and pass its assessment before unlocking this unit.
                  </>
                ) : (
                  <>
                    This chapter is locked. You must complete{' '}
                    <strong className="text-foreground">{getPrerequisiteItem(currentTopic.id)?.title || 'the previous chapter'}</strong>{' '}
                    before unlocking this section.
                  </>
                )}
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveView('overview');
                  syncUrl('overview');
                }}
                className="text-xs font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Global Topic Floating Section Navigator (Middle-Right of Frame) */}
            <SectionSidebarLine />
            {activeV2Module && v2ChapterContext ? (
              (() => {
                const { v2Unit, v2Chapter } = v2ChapterContext;

                return (
                  <div className="space-y-6">
                    {/* Navigation Breadcrumb Bar */}
                    <div className="rounded-2xl px-3.5 py-1.5 h-12 max-h-12 shadow-sm sticky top-16 z-30 transition-all backdrop-blur-2xl bg-background/95 dark:bg-card/95 border border-border/80 flex items-center justify-between gap-2 w-full -mt-2 sm:-mt-4 mb-4">
                      <div className="flex items-center gap-2 text-xs min-w-0 shrink">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-muted-foreground hover:text-foreground font-semibold shrink-0"
                          onClick={() => {
                            setActiveView('overview');
                            syncUrl('overview');
                          }}
                        >
                          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                          <span className="hidden sm:inline">Module Overview</span>
                        </Button>
                        <span className="text-muted-foreground shrink-0">/</span>
                        <span className="font-semibold text-muted-foreground shrink-0">{v2Unit.title}</span>
                        <span className="text-muted-foreground shrink-0">/</span>
                        <span className="font-bold text-foreground truncate max-w-[200px]">{v2Chapter.title}</span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.dispatchEvent(new CustomEvent('soc:open-curriculum-drawer'))}
                          className="h-7 text-xs gap-1 font-semibold border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 cursor-pointer rounded-xl glass-pill"
                          title="Browse Full Modules & Curriculum Tree"
                        >
                          <Layers className="w-3 h-3" />
                          <span className="hidden md:inline">Tree</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openGlossary()}
                          className="h-7 text-xs gap-1 font-semibold border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 cursor-pointer rounded-xl glass-pill"
                          title="Open SOC Analyst Glossary"
                        >
                          <BookMarked className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span className="hidden md:inline">Glossary</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.dispatchEvent(new CustomEvent('soc:open-dev-admin'))}
                          className="h-7 text-xs gap-1 font-semibold border-amber-500/30 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 cursor-pointer rounded-xl glass-pill"
                          title="Open Admin Dev & Visual Settings Panel"
                        >
                          <Sliders className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                          <span className="hidden md:inline">Admin</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.dispatchEvent(new CustomEvent('soc:open-branch-modal'))}
                          className="h-7 text-xs gap-1 font-semibold border-sky-500/30 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900/50 cursor-pointer rounded-xl glass-pill"
                          title="View CDAC Campus Building Floor Plan & Simple Network Architecture"
                        >
                          <Network className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                          <span className="hidden md:inline">Topology</span>
                        </Button>
                        <TextSizeControl compact={true} className="hidden lg:inline-flex h-7" />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handlePrevious}
                          disabled={currentSequenceIndex <= 0}
                          className="h-7 px-2 text-xs gap-1 font-semibold rounded-xl glass-pill"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Prev</span>
                        </Button>
                        <div
                          onClick={() => {
                            sound.playClick();
                            setIsNavLoading(true);
                            setNavLoadingTargetTitle(currentTopic?.title || 'Next Scene');
                          }}
                          className="cursor-pointer hover:scale-110 active:scale-95 transition-transform flex items-center justify-center w-7 h-7 rounded-xl bg-sky-500/20 border border-sky-400/40 p-0.5 shadow-sm"
                          title="Click the Blue Guy for an iconic cinema dialogue!"
                        >
                          <BlueGuyCharacter pose="hero" size="sm" animated={true} showGlow={false} />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleNext}
                          disabled={currentSequenceIndex >= flatSequence.length - 1}
                          className={`h-7 px-2.5 text-xs gap-1 font-semibold cursor-pointer rounded-xl ${
                            !freeNavigationEnabled &&
                            !chapterLockStatus.canAdvance &&
                            chapterLockStatus.chapterId === activeTopicId
                              ? 'bg-amber-500/15 border-amber-500/40 text-amber-800 dark:text-amber-300 hover:bg-amber-500/25'
                              : 'bg-primary text-primary-foreground hover:bg-primary/90'
                          }`}
                          title={
                            !freeNavigationEnabled &&
                            !chapterLockStatus.canAdvance &&
                            chapterLockStatus.chapterId === activeTopicId
                              ? `Topic Locked: ${chapterLockStatus.missingRequirements.join(' • ')}`
                              : 'Advance to Next Topic'
                          }
                        >
                          {!freeNavigationEnabled &&
                            !chapterLockStatus.canAdvance &&
                            chapterLockStatus.chapterId === activeTopicId && (
                              <Lock className="w-3 h-3 text-amber-500 mr-0.5" />
                            )}
                          <span>Next</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>

                    {/* V2 Standardized 4-Section Chapter Flow with Audio & Admin Edit */}
                    <ChapterV2View
                      module={activeV2Module}
                      unit={v2Unit}
                      initialChapter={v2Chapter}
                      isAdmin={isAdmin}
                      onNext={handleNext}
                      onCompleteChapter={(chId, xp) => handleCompleteTopic(chId, xp)}
                    />
                  </div>
                );
              })()
            ) : isModule00 ? (
              <CourseOrientationStory
            currentTopicId={activeTopicId}
            onSelectTopic={(topicId) => {
              if (topicId.includes('assessment')) {
                setActiveAssessmentId(topicId);
                setActiveView('assessment');
                syncUrl('assessment', topicId);
              } else {
                setActiveTopicId(topicId);
                setActiveView('topic');
                syncUrl('topic', topicId);
              }
            }}
            onCompleteTopic={(topicId, xpReward) => {
              handleCompleteTopic(topicId, xpReward);
            }}
            onCompleteUnitAssessment={(unitId) => {
              handleCompleteUnitAssessment(unitId);
            }}
            onBackToOverview={() => {
              setActiveView('overview');
              syncUrl('overview');
            }}
          />
        ) : isModule04 && currentUnit.id === 'unit-1' ? (
          <SocArchitectureStory
            currentTopicId={currentTopic.id}
            onSelectTopic={(topicId) => {
              if (topicId === currentUnit.assessment.id || topicId === 'unit-1-assessment') {
                setActiveAssessmentId(topicId);
                setActiveView('assessment');
                syncUrl('assessment', topicId);
              } else {
                setActiveTopicId(topicId);
                setActiveView('topic');
                syncUrl('topic', topicId);
              }
            }}
            onCompleteTopic={(topicId, xpReward) => {
              handleCompleteTopic(topicId, xpReward);
            }}
            onCompleteUnitAssessment={() => {
              handleCompleteUnitAssessment('unit-1');
            }}
            onBackToOverview={() => {
              setActiveView('overview');
              syncUrl('overview');
            }}
          />
        ) : isModule04 && ['unit-2', 'unit-3', 'unit-4', 'unit-5', 'unit-6', 'unit-7'].includes(currentUnit.id) ? (
          <SocTriageStory
            unitId={currentUnit.id}
            currentTopicId={currentTopic.id}
            onSelectTopic={(topicId) => {
              if (topicId.includes('assessment')) {
                setActiveAssessmentId(topicId);
                const matchingUnit = units.find((u) => u.assessment.id === topicId || u.id === topicId.replace('-assessment', ''));
                if (matchingUnit && matchingUnit.topics.length > 0) {
                  setActiveTopicId(matchingUnit.topics[0].id);
                }
                setActiveView('assessment');
                syncUrl('assessment', topicId);
              } else {
                setActiveTopicId(topicId);
                const matchingUnit = units.find((u) => u.topics.some((t) => t.id === topicId));
                if (matchingUnit) {
                  setActiveAssessmentId(matchingUnit.assessment.id);
                }
                setActiveView('topic');
                syncUrl('topic', topicId);
              }
            }}
            onCompleteTopic={(topicId, xpReward) => {
              handleCompleteTopic(topicId, xpReward);
            }}
            onCompleteUnitAssessment={() => {
              handleCompleteUnitAssessment(currentUnit.id);
            }}
            onBackToOverview={() => {
              setActiveView('overview');
              syncUrl('overview');
            }}
          />
        ) : (
        <div className="space-y-8">
          {/* Top Breadcrumb & Navigation Bar (Compact iPhone-style ~48px) */}
          <div className="rounded-2xl px-3.5 py-1.5 h-12 max-h-12 shadow-sm sticky top-16 z-30 transition-all backdrop-blur-2xl bg-background/95 dark:bg-card/95 border border-border/80 flex items-center justify-between gap-2 w-full -mt-2 sm:-mt-4 mb-4">
            <div className="flex items-center gap-2 text-xs min-w-0 shrink">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-muted-foreground hover:text-foreground font-semibold shrink-0"
                onClick={() => {
                  setActiveView('overview');
                  syncUrl('overview');
                }}
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                <span className="hidden sm:inline">Module Details</span>
              </Button>
              <span className="text-muted-foreground shrink-0">/</span>
              <span className="font-semibold text-muted-foreground shrink-0">{currentUnit.title.split(':')[0]}</span>
              <span className="text-muted-foreground shrink-0">/</span>
              <span className="font-bold text-foreground truncate max-w-[200px]">{currentTopic.title}</span>
            </div>

            {/* Action Buttons: Curriculum Tree, Previous, Next */}
            <div className="flex items-center gap-1.5 shrink-0 ml-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.dispatchEvent(new CustomEvent('soc:open-curriculum-drawer'))}
                className="h-7 text-xs gap-1 font-semibold border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 cursor-pointer rounded-xl glass-pill"
                title="Browse Full Modules & Curriculum Tree"
              >
                <Layers className="w-3 h-3" />
                <span className="hidden md:inline">Tree</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openGlossary()}
                className="h-7 text-xs gap-1 font-semibold border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 cursor-pointer rounded-xl glass-pill"
                title="Open SOC Analyst Glossary"
              >
                <BookMarked className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden md:inline">Glossary</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={currentSequenceIndex <= 0}
                className="h-7 px-2 text-xs gap-1 font-semibold rounded-xl glass-pill"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={currentSequenceIndex >= flatSequence.length - 1}
                className={`h-7 px-2.5 text-xs gap-1 font-semibold cursor-pointer rounded-xl ${
                  !freeNavigationEnabled &&
                  !chapterLockStatus.canAdvance &&
                  chapterLockStatus.chapterId === activeTopicId
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-800 dark:text-amber-300 hover:bg-amber-500/25'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
                title={
                  !freeNavigationEnabled &&
                  !chapterLockStatus.canAdvance &&
                  chapterLockStatus.chapterId === activeTopicId
                    ? `Topic Locked: ${chapterLockStatus.missingRequirements.join(' • ')}`
                    : 'Advance to Next Topic'
                }
              >
                {!freeNavigationEnabled &&
                  !chapterLockStatus.canAdvance &&
                  chapterLockStatus.chapterId === activeTopicId && (
                    <Lock className="w-3 h-3 text-amber-500 mr-0.5" />
                  )}
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>



          {/* Topic Header Title & Context Chips */}
          <div className="space-y-2 border-b pb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs font-bold">
                {currentUnit.title.split(':')[0]} • Topic {currentTopic.order}
              </Badge>
              <Badge variant="secondary" className="text-xs font-mono">
                <Clock className="w-3 h-3 mr-1 inline" />
                {currentTopic.estimatedMinutes} mins
              </Badge>
              <Badge variant="outline" className="text-xs font-bold text-emerald-600 bg-emerald-50 border-emerald-200">
                +{currentTopic.xpReward} XP
              </Badge>
              {mounted && completedTopics.has(currentTopic.id) ? (
                <Badge suppressHydrationWarning className="bg-emerald-600 text-white text-xs gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Completed
                </Badge>
              ) : (
                <Badge suppressHydrationWarning variant="outline" className="text-xs text-amber-600 bg-amber-50 border-amber-200">
                  In Progress
                </Badge>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {currentTopic.title}
            </h1>
          </div>

          {/* ====================================================
              1. THEORY SECTION (Continuous Typography + Clickable Glossary + Know More)
             ==================================================== */}
          <section id="section-intro" className="min-h-[75vh] flex flex-col justify-center py-4 scroll-mt-24 space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold font-mono">
                  1
                </span>
                <h2 className="text-lg font-bold text-foreground">Theory & Core Concept</h2>
              </div>
              <span className="text-xs text-muted-foreground font-medium">Foundational Overview</span>
            </div>

            {/* Continuous 4-6 concise lines with inline clickable glossary terms */}
            <div className="space-y-3 text-sm sm:text-base text-foreground/90 leading-relaxed font-normal bg-card/60 p-5 rounded-2xl border">
              {currentTopic.theory.summaryLines.map((line, idx) => (
                <p key={idx} className="leading-relaxed">
                  <GlossaryText text={line} />
                </p>
              ))}
            </div>

            {/* Authoritative Know More Link & Drawer */}
            <div className="p-4 rounded-xl border bg-muted/20 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveKnowMoreOpen(!activeKnowMoreOpen)}
                  className="gap-2 text-xs font-bold self-start border-primary/30 text-primary hover:bg-primary/5"
                >
                  <Info className="w-4 h-4 text-primary" />
                  <span>{activeKnowMoreOpen ? 'Hide Reference Details' : 'Know More (Authoritative Guidance) →'}</span>
                </Button>

                <span className="text-xs text-muted-foreground">
                  Reference: {currentTopic.theory.knowMore.title}
                </span>
              </div>

              {activeKnowMoreOpen && (
                <div className="p-4 rounded-xl border bg-card space-y-2.5 text-xs animate-fade-in shadow-xs">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-bold text-foreground text-sm">
                      {currentTopic.theory.knowMore.title}
                    </span>
                    <a
                      href={currentTopic.theory.knowMore.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline text-xs bg-primary/10 px-3 py-1 rounded-md"
                    >
                      <span>{currentTopic.theory.knowMore.externalLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-xs">
                    {currentTopic.theory.knowMore.description}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* ====================================================
              2. DEMO SECTION (Pure Visual Animation / Video-like Experience)
             ==================================================== */}
          <section id="section-demo" className="min-h-[75vh] flex flex-col justify-center py-4 scroll-mt-24 space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold font-mono">
                  2
                </span>
                <h2 className="text-lg font-bold text-foreground">Visual Story Demo</h2>
              </div>
              <span className="text-xs text-muted-foreground font-medium">Watch the Concept in Action</span>
            </div>

            <VisualStoryDemo
              topicId={currentTopic.id}
              title={currentTopic.demo.title}
              subtitle={currentTopic.demo.subtitle}
              steps={currentTopic.demo.steps}
            />
          </section>

          {/* ====================================================
              3. INTERACTIVE SOC DASHBOARD (Specialized for Every Section)
             ==================================================== */}
          <section id="section-interactive" className="min-h-[75vh] flex flex-col justify-center py-4 scroll-mt-24 space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-700 flex items-center justify-center text-xs font-bold font-mono">
                  3
                </span>
                <h2 className="text-lg font-bold text-foreground">Interactive SOC Dashboard</h2>
              </div>
              <span className="text-xs text-muted-foreground font-medium">Hands-On Analyst Simulation</span>
            </div>

            <InteractiveTopicDashboard topicId={currentTopic.id} />
          </section>

          {/* ====================================================
              4. REAL-WORLD SOC CONTEXT & ANALYST WORKFLOW
             ==================================================== */}
          <section className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center text-xs font-bold font-mono">
                  4
                </span>
                <h2 className="text-lg font-bold text-foreground">Real-World SOC Context & Analyst Workflow</h2>
              </div>
              <span className="text-xs text-muted-foreground font-medium">Field Best Practices</span>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/40 to-amber-100/20 space-y-4 shadow-xs">
              <div className="space-y-1">
                <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  Operational Scenario
                </Badge>
                <h3 className="text-base font-bold text-amber-950 mt-1">
                  {currentTopic.socContext.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-amber-950/90 leading-relaxed font-normal">
                <GlossaryText text={currentTopic.socContext.scenario} />
              </p>

              <div className="p-4 rounded-xl bg-card border border-amber-200 space-y-1.5 shadow-2xs">
                <span className="font-bold text-foreground text-xs uppercase tracking-wider block">
                  Analyst Mindset & Operational Reality:
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <GlossaryText text={currentTopic.socContext.analystMindset} />
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <span className="font-bold text-foreground text-xs uppercase tracking-wider block">
                  Essential Best Practices:
                </span>
                <ul className="space-y-1.5 text-xs text-foreground/80 list-disc list-inside">
                  {currentTopic.socContext.bestPractices.map((bp, i) => (
                    <li key={i} className="leading-relaxed">
                      <GlossaryText text={bp} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ====================================================
              5. KNOWLEDGE CHECKS (Drag & Drop, Matching, TP/FP)
             ==================================================== */}
          <section id="section-kc" className="min-h-[75vh] flex flex-col justify-center py-4 scroll-mt-24 space-y-5">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold font-mono">
                  5
                </span>
                <h2 className="text-lg font-bold text-foreground">Chapter Knowledge Checks</h2>
              </div>
              <span className="text-xs text-muted-foreground font-medium">Verify Your Comprehension</span>
            </div>

            {/* Drag & Drop Sequencing */}
            {currentTopic.knowledgeCheck.dragDrop && (
              <DragDropCheck
                key={`${currentTopic.id}-dragdrop`}
                id={`${currentTopic.id}-dragdrop`}
                title={currentTopic.knowledgeCheck.dragDrop.title}
                instructions={currentTopic.knowledgeCheck.dragDrop.instructions}
                items={currentTopic.knowledgeCheck.dragDrop.items}
                explanation={currentTopic.knowledgeCheck.dragDrop.explanation}
                xpReward={50}
                onComplete={() => markCheckComplete(`${currentTopic.id}-dragdrop`)}
              />
            )}

            {/* Shuffled Match the Following */}
            {currentTopic.knowledgeCheck.matching && (
              <MatchingCheckShuffled
                key={`${currentTopic.id}-matching`}
                id={`${currentTopic.id}-matching`}
                title={currentTopic.knowledgeCheck.matching.title}
                instructions={currentTopic.knowledgeCheck.matching.instructions}
                pairs={currentTopic.knowledgeCheck.matching.pairs}
                explanation={currentTopic.knowledgeCheck.matching.explanation}
                xpReward={50}
                onComplete={() => markCheckComplete(`${currentTopic.id}-matching`)}
              />
            )}

            {/* True Positive vs False Positive Triage Scenario */}
            {currentTopic.knowledgeCheck.triageScenario && (
              <TpFpTriage
                key={`${currentTopic.id}-triage`}
                scenario={currentTopic.knowledgeCheck.triageScenario}
                xpReward={75}
                onComplete={() => markCheckComplete(`${currentTopic.id}-triage`)}
              />
            )}
          </section>

          {/* ====================================================
              6. SECTION COMPLETION & NEXT CHAPTER UNLOCK
             ==================================================== */}
          <section className="p-6 sm:p-8 rounded-2xl border-2 border-primary/20 bg-primary/5 space-y-5 shadow-xs mt-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">6. Chapter Completion & Mastery Verification</h3>
              <p className="text-xs text-muted-foreground max-w-lg mx-auto">
                Complete all requirements below and pass the knowledge checks to mark this chapter complete and unlock the next chapter in the curriculum.
              </p>
            </div>

            {/* Topic Verification Checklist */}
            <div className="max-w-lg mx-auto grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-card border">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-foreground">1. Theory & Core Concept</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-card border">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-foreground">2. Visual Story Demo</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-card border">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-foreground">3. Interactive SOC Dashboard</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-card border">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-foreground">4. Real-World Context</span>
              </div>
              <div
                className={`flex items-center gap-2 p-2.5 rounded-lg border sm:col-span-2 ${
                  areAllTopicChecksDone || completedTopics.has(currentTopic.id)
                    ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950 font-semibold'
                    : 'bg-card border-dashed text-muted-foreground'
                }`}
              >
                {areAllTopicChecksDone || completedTopics.has(currentTopic.id) ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-amber-500 shrink-0" />
                )}
                <span>
                  5. Knowledge Checks:{' '}
                  {areAllTopicChecksDone || completedTopics.has(currentTopic.id)
                    ? 'All Exercises Completed ✓'
                    : `${Object.keys(completedChecks).filter((k) => currentTopicCheckIds.includes(k)).length}/${currentTopicCheckIds.length} Exercises Solved (Complete Section 5 above)`}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2" suppressHydrationWarning>
              {!(mounted && completedTopics.has(currentTopic.id)) ? (
                <Button
                  suppressHydrationWarning
                  onClick={() => {
                    if (!areAllTopicChecksDone) {
                      showToast({
                        type: 'warning',
                        title: 'Knowledge Checks Pending ⚠️',
                        description:
                          'Please complete and submit the knowledge check exercises in Section 5 above before marking this chapter complete.',
                      });
                      return;
                    }
                    handleCompleteTopic(currentTopic.id, currentTopic.xpReward);
                  }}
                  className={`font-bold text-xs gap-2 px-6 h-10 shadow-xs transition-all ${
                    areAllTopicChecksDone
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                      : 'bg-primary hover:bg-primary/90 text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {areAllTopicChecksDone
                    ? `Mark Chapter Complete & Unlock Next (+${currentTopic.xpReward} XP)`
                    : `Complete Chapter (+${currentTopic.xpReward} XP)`}
                </Button>
              ) : (
                <Badge suppressHydrationWarning className="bg-emerald-600 text-white text-xs px-4 py-2 gap-1.5 font-bold shadow-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  Chapter Completed & Saved
                </Badge>
              )}

              {currentSequenceIndex < flatSequence.length - 1 ? (
                <Button
                  variant="default"
                  onClick={handleNext}
                  className="text-xs font-semibold gap-1.5 h-10 px-4 cursor-pointer shadow-xs"
                  title="Proceed to next chapter"
                >
                  <span>Continue to Next Chapter</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={handleNext}
                  className="text-xs font-semibold gap-1.5 h-10 px-4 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                  title="Return to Module Overview"
                >
                  <span>Complete Module & View Overview</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </section>
        </div>
            )}
          </>
        )
      )}

      {/* ========================================================
          VIEW: UNIT ASSESSMENT QUIZ VIEW
         ======================================================== */}
      {activeView === 'assessment' && currentUnit && (
        isUnitLocked(currentUnit.unitNumber, currentUnit.id) || isItemLocked(currentUnit.assessment.id) ? (
          <div className="p-8 sm:p-12 rounded-2xl border bg-card text-center space-y-5 max-w-lg mx-auto shadow-sm my-10 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto ring-8 ring-amber-500/5">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <Badge variant="outline" className="text-amber-700 bg-amber-50 border-amber-300 font-bold uppercase tracking-wider text-[10px]">
                {isUnitLocked(currentUnit.unitNumber, currentUnit.id) ? 'Unit Locked' : 'Assessment Locked'}
              </Badge>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">{currentUnit.assessment.title}</h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                {isUnitLocked(currentUnit.unitNumber, currentUnit.id) ? (
                  <>
                    This unit assessment is locked. You must complete{' '}
                    <strong className="text-foreground">Unit {currentUnit.unitNumber - 1}</strong> and pass its assessment before unlocking this unit.
                  </>
                ) : (
                  <>
                    This unit assessment is locked. You must complete all chapters in{' '}
                    <strong className="text-foreground">{currentUnit.title.split(':')[0]}</strong> before taking this assessment.
                  </>
                )}
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveView('overview');
                  syncUrl('overview');
                }}
                className="text-xs font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        ) : activeV2Module ? (
          (() => {
            const v2Unit =
              activeV2Module.units.find(
                (u) =>
                  u.assessment.id === activeAssessmentId ||
                  u.id === currentUnit.id
              ) || activeV2Module.units[0];

            return (
              <div className="space-y-6">
                {/* Navigation Breadcrumb Bar */}
                <div className="rounded-2xl px-3.5 py-1.5 h-12 max-h-12 shadow-sm sticky top-16 z-30 transition-all backdrop-blur-2xl bg-background/95 dark:bg-card/95 border border-border/80 flex items-center justify-between gap-2 w-full -mt-2 sm:-mt-4 mb-4">
                  <div className="flex items-center gap-2 text-xs min-w-0 shrink">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-muted-foreground hover:text-foreground font-semibold shrink-0"
                      onClick={() => {
                        setActiveView('overview');
                        syncUrl('overview');
                      }}
                    >
                      <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                      <span className="hidden sm:inline">Module Overview</span>
                    </Button>
                    <span className="text-muted-foreground shrink-0">/</span>
                    <span className="font-semibold text-muted-foreground shrink-0">{v2Unit.title}</span>
                    <span className="text-muted-foreground shrink-0">/</span>
                    <span className="font-bold text-foreground truncate max-w-[200px]">
                      {v2Unit.assessment.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.dispatchEvent(new CustomEvent('soc:open-curriculum-drawer'))}
                      className="h-7 text-xs gap-1 font-semibold border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 cursor-pointer rounded-xl glass-pill"
                      title="Browse Full Modules & Curriculum Tree"
                    >
                      <Layers className="w-3 h-3" />
                      <span className="hidden md:inline">Tree</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevious}
                      disabled={currentSequenceIndex <= 0}
                      className="h-7 px-2 text-xs gap-1 font-semibold rounded-xl glass-pill"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Prev</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNext}
                      disabled={currentSequenceIndex >= flatSequence.length - 1}
                      className="h-7 px-2.5 text-xs gap-1 font-semibold cursor-pointer rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                {/* V2 Standardized Scenario Assessment View */}
                <UnitAssessmentV2View
                  module={activeV2Module}
                  unit={v2Unit}
                  assessment={v2Unit.assessment}
                  onNext={handleNext}
                  onCompleteAssessment={(assId, score) => handleCompleteUnitAssessment(v2Unit.id)}
                />
              </div>
            );
          })()
        ) : isModule00 ? (
          <CourseOrientationStory
            currentTopicId={activeAssessmentId}
            onSelectTopic={(topicId) => {
              if (topicId.includes('assessment')) {
                setActiveAssessmentId(topicId);
                setActiveView('assessment');
                syncUrl('assessment', topicId);
              } else {
                setActiveTopicId(topicId);
                setActiveView('topic');
                syncUrl('topic', topicId);
              }
            }}
            onCompleteTopic={(topicId, xpReward) => {
              handleCompleteTopic(topicId, xpReward);
            }}
            onCompleteUnitAssessment={(unitId) => {
              handleCompleteUnitAssessment(unitId);
            }}
            onBackToOverview={() => {
              setActiveView('overview');
              syncUrl('overview');
            }}
          />
        ) : isModule04 && currentUnit.id === 'unit-1' ? (
          <SocArchitectureStory
            currentTopicId={currentUnit.assessment.id}
            onSelectTopic={(topicId) => {
              if (topicId === currentUnit.assessment.id || topicId === 'unit-1-assessment') {
                setActiveAssessmentId(topicId);
                setActiveView('assessment');
                syncUrl('assessment', topicId);
              } else {
                setActiveTopicId(topicId);
                setActiveView('topic');
                syncUrl('topic', topicId);
              }
            }}
            onCompleteTopic={(topicId, xpReward) => {
              handleCompleteTopic(topicId, xpReward);
            }}
            onCompleteUnitAssessment={() => {
              handleCompleteUnitAssessment('unit-1');
            }}
            onBackToOverview={() => {
              setActiveView('overview');
              syncUrl('overview');
            }}
          />
        ) : isModule04 && ['unit-2', 'unit-3', 'unit-4', 'unit-5', 'unit-6', 'unit-7'].includes(currentUnit.id) ? (
          <SocTriageStory
            unitId={currentUnit.id}
            currentTopicId={currentUnit.assessment.id}
            onSelectTopic={(topicId) => {
              if (topicId.includes('assessment')) {
                setActiveAssessmentId(topicId);
                const matchingUnit = units.find((u) => u.assessment.id === topicId || u.id === topicId.replace('-assessment', ''));
                if (matchingUnit && matchingUnit.topics.length > 0) {
                  setActiveTopicId(matchingUnit.topics[0].id);
                }
                setActiveView('assessment');
                syncUrl('assessment', topicId);
              } else {
                setActiveTopicId(topicId);
                const matchingUnit = units.find((u) => u.topics.some((t) => t.id === topicId));
                if (matchingUnit) {
                  setActiveAssessmentId(matchingUnit.assessment.id);
                }
                setActiveView('topic');
                syncUrl('topic', topicId);
              }
            }}
            onCompleteTopic={(topicId, xpReward) => {
              handleCompleteTopic(topicId, xpReward);
            }}
            onCompleteUnitAssessment={() => {
              handleCompleteUnitAssessment(currentUnit.id);
            }}
            onBackToOverview={() => {
              setActiveView('overview');
              syncUrl('overview');
            }}
          />
        ) : (
        <div className="space-y-6">
          <div className="p-4 rounded-xl border bg-card flex items-center justify-between shadow-xs">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setActiveView('overview');
                syncUrl('overview');
              }}
              className="text-xs gap-1 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Module Details
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={currentSequenceIndex <= 0}
                className="h-8 text-xs gap-1 font-semibold"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={currentSequenceIndex >= flatSequence.length - 1}
                className="h-8 text-xs gap-1 font-semibold cursor-pointer"
                title={
                  currentSequenceIndex >= flatSequence.length - 1
                    ? 'All units completed'
                    : 'Proceed to Next Stage'
                }
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-primary/20 bg-card overflow-hidden shadow-xs">
            <div className="p-6 border-b bg-primary/5 space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-[10px] font-bold uppercase tracking-wider">
                  End-of-Unit Knowledge Assessment
                </Badge>
                <Badge variant="secondary" className="text-xs font-mono">
                  Unit {currentUnit.unitNumber}
                </Badge>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mt-1 text-foreground">{currentUnit.assessment.title}</h2>
              <p className="text-xs text-muted-foreground">
                Passing Score: {currentUnit.assessment.passingScore}% • Reward: +{currentUnit.assessment.xpReward} XP
              </p>
            </div>

            <div className="p-6 space-y-6">
              {currentUnit.assessment.questions.map((q, idx) => {
                const selectedOpt = quizAnswers[q.id];
                const isSubmitted = quizSubmitted[currentUnit.assessment.id];
                const isCorrect = selectedOpt === q.correctAnswer;

                return (
                  <div key={q.id} className="p-4 sm:p-5 rounded-xl border space-y-3 bg-muted/10">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="font-semibold text-sm sm:text-base text-foreground flex-1 leading-snug">
                        {q.question}
                      </p>
                    </div>

                    <div className="space-y-2 pl-8">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedOpt === optIdx;
                        const isThisCorrect = optIdx === q.correctAnswer;

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            disabled={isSubmitted}
                            onClick={() => setQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${
                              isSubmitted
                                ? isThisCorrect
                                  ? 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-bold'
                                  : isSelected
                                  ? 'border-rose-400 bg-rose-50/80 text-rose-950'
                                  : 'border-border opacity-70'
                                : isSelected
                                ? 'border-primary bg-primary/10 font-medium ring-2 ring-primary/20'
                                : 'border-border bg-card hover:border-primary/40'
                            }`}
                          >
                            <span>{opt}</span>
                            {isSubmitted && isThisCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isSubmitted && (
                      <div className={`p-3.5 rounded-xl text-xs leading-relaxed ml-8 mt-2 ${
                        isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
                      }`}>
                        <strong>{isCorrect ? 'Correct! ' : 'Explanation: '}</strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}

              {!quizSubmitted[currentUnit.assessment.id] ? (
                <Button
                  onClick={() => {
                    const answeredCount = Object.keys(quizAnswers).filter((k) =>
                      currentUnit.assessment.questions.some((q) => q.id === k)
                    ).length;
                    if (answeredCount < currentUnit.assessment.questions.length) {
                      alert('Please answer all assessment questions before submitting.');
                      return;
                    }
                    setQuizSubmitted((prev) => ({ ...prev, [currentUnit.assessment.id]: true }));
                    completeUnit(currentUnit.id);
                    completeUnit(currentUnit.assessment.id);
                    if (xpSystemEnabled) {
                      addXP(currentUnit.assessment.xpReward);
                    }
                    showToast({
                      type: 'success',
                      title: 'Assessment Submitted! 🎯',
                      description: `+${currentUnit.assessment.xpReward} XP awarded. Unit completed and next stage unlocked!`,
                    });
                  }}
                  className="w-full text-xs font-bold h-11"
                >
                  Submit Unit Assessment
                </Button>
              ) : (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-emerald-950 text-base">Unit Assessment Passed!</h4>
                  <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                    You have successfully demonstrated comprehension of this unit. Subsequent units are now unlocked.
                  </p>
                  <Button
                    onClick={handleNext}
                    size="sm"
                    className="mt-2 text-xs font-bold"
                  >
                    Continue to Next Stage
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        )
      )}

      {/* ========================================================
          VIEW: MAIN MODULE DETAILS PAGE (SECTION 2 - EXPANDABLE UNITS DROPDOWN)
         ======================================================== */}
      {activeView === 'overview' && (
        <div className="space-y-8">
          {/* Back Link & Curriculum Tree Button */}
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              asChild
              className="text-xs gap-1.5 pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground font-semibold"
            >
              <Link href="/modules">
                <ArrowLeft className="w-4 h-4" />
                Back to All Modules
              </Link>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => window.dispatchEvent(new CustomEvent('soc:open-curriculum-drawer'))}
              className="text-xs gap-1.5 font-semibold border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 shadow-2xs cursor-pointer"
              title="Browse Full Modules & Topics Tree"
            >
              <Layers className="w-4 h-4 text-primary" />
              <span>Curriculum Tree</span>
            </Button>
          </div>

          {/* Module Banner Card */}
          <div className="glass-panel glass-glossy backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border-2 border-border/70 bg-gradient-to-br from-card/85 via-card/60 to-muted/30 dark:from-slate-900/80 dark:via-slate-900/50 dark:to-slate-950/50 space-y-5 shadow-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="outline" className="text-xs font-bold font-mono">
                Module {module.id}
              </Badge>
              <Badge className={getDifficultyColor(module.difficulty)}>
                {module.difficulty}
              </Badge>
              <Badge variant="secondary" className="text-xs font-mono">
                {module.estimatedHours} Hours
              </Badge>
              {isModuleDisabled && (
                <Badge variant="outline" className="text-xs bg-rose-50 text-rose-700 border-rose-300 font-bold gap-1">
                  <Ban className="w-3 h-3" />
                  Disabled by Admin
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                {module.title}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
                {module.description}
              </p>
            </div>

            {/* Start / Continue Button & Progress */}
            <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t">
              <div className="space-y-1.5 flex-1 max-w-xs">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Module Progress</span>
                  <span suppressHydrationWarning>
                    {completionPercentage}% ({completedCount} / {totalTopicsCount} Chapters)
                  </span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
              </div>

              {hasUnits && (
                <div className="flex flex-wrap items-center gap-2.5">
                  <Button
                    size="lg"
                    disabled={isModuleDisabled}
                    onClick={() => {
                      const targetTopic = currentPlayableTopic || units[0]?.topics[0];
                      if (targetTopic) {
                        setActiveTopicId(targetTopic.id);
                        setActiveView('topic');
                        syncUrl('topic', targetTopic.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="font-bold text-sm gap-2 px-6 shadow-md"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span suppressHydrationWarning>
                      {completedCount === 0 ? 'Start Module' : 'Continue Learning'}
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => window.dispatchEvent(new CustomEvent('soc:open-curriculum-drawer'))}
                    className="font-semibold text-xs gap-2 border-primary/30 text-primary hover:bg-primary/5 cursor-pointer h-11"
                    title="Open Complete Modules & Curriculum Tree"
                  >
                    <Layers className="w-4 h-4 text-primary" />
                    <span>Curriculum Tree</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => window.dispatchEvent(new CustomEvent('soc:open-labs-modal'))}
                    className="font-semibold text-xs gap-2 border-purple-500/30 text-purple-700 dark:text-purple-300 hover:bg-purple-500/10 cursor-pointer h-11"
                    title="Open 40 Practical Labs Directory"
                  >
                    <FlaskConical className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>Practical Labs</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => window.dispatchEvent(new CustomEvent('soc:open-branch-modal'))}
                    className="font-semibold text-xs gap-2 border-blue-500/30 text-blue-700 dark:text-blue-300 hover:bg-blue-500/10 cursor-pointer h-11"
                    title="Inspect CDAC Bengaluru Branch Network Architecture"
                  >
                    <Network className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Branch Topology</span>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* ====================================================
              EXPANDABLE UNITS SECTION (SECTION 2: DROPDOWNS & LOCKING)
              Module Details
              ▼ Unit 1
                 ├── Chapter 1
                 ├── Chapter 2
                 ├── Chapter 3
                 └── Assessment
              ▶ Unit 2 (Locked until Unit 1 complete)
              ▶ Unit 3 (Locked until Unit 2 complete)
             ==================================================== */}
          {hasUnits ? (
            <div className="space-y-6">
              <div className="border-b pb-2">
                <h2 className="text-xl font-bold text-foreground">Curriculum Units & Chapters</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Expand each unit to explore its chapters and unit assessment. Units unlock sequentially as previous units are completed.
                </p>
              </div>

              <div className="space-y-4">
                {units.map((unit) => {
                  const unitTopicsCompleted = unit.topics.filter((t) => completedTopics.has(t.id)).length;
                  const isUnitDone = isUnitCompleted(unit.id);
                  const isLocked = isUnitLocked(unit.unitNumber, unit.id);
                  const isUnitDisabled = mounted && disabledUnits.includes(unit.id);
                  const isExpanded = !!expandedUnits[unit.id];

                  return (
                    <div
                      key={unit.id}
                      className={`rounded-2xl border transition-all overflow-hidden ${
                        isUnitDisabled
                          ? 'opacity-40 border-dashed bg-muted/40 pointer-events-none'
                          : isLocked
                          ? 'border-border/80 bg-muted/20 opacity-80'
                          : isUnitDone
                          ? 'border-emerald-300/80 bg-card shadow-xs'
                          : 'border-border bg-card shadow-xs'
                      }`}
                    >
                      {/* Unit Header Accordion Bar (Click to Expand / Collapse) */}
                      <button
                        type="button"
                        onClick={() => toggleUnitAccordion(unit.id)}
                        className="w-full text-left p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/30 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start sm:items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 sm:mt-0 ${
                            isUnitDone
                              ? 'bg-emerald-100 text-emerald-700'
                              : isLocked
                              ? 'bg-muted text-muted-foreground'
                              : 'bg-primary/10 text-primary'
                          }`}>
                            {isUnitDone ? (
                              <Check className="w-4 h-4" />
                            ) : isLocked ? (
                              <Lock className="w-4 h-4" />
                            ) : (
                              unit.unitNumber
                            )}
                          </div>

                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-base text-foreground">
                                {unit.title}
                              </span>
                              {isLocked && (
                                <Badge variant="outline" className="text-[10px] bg-muted text-muted-foreground border-border py-0 gap-1">
                                  <Lock className="w-2.5 h-2.5" />
                                  Locked
                                </Badge>
                              )}
                              {isUnitDone && (
                                <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-300 py-0 gap-1">
                                  <CheckCircle2 className="w-2.5 h-2.5" />
                                  Unit Complete
                                </Badge>
                              )}
                              {isUnitDisabled && (
                                <Badge variant="outline" className="text-[10px] bg-rose-50 text-rose-700 border-rose-300 py-0 gap-1">
                                  <Ban className="w-2.5 h-2.5" />
                                  Disabled by Admin
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {unit.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground self-end sm:self-auto">
                          <span className="font-medium text-foreground">
                            {unitTopicsCompleted}/{unit.topics.length} Chapters
                          </span>
                          <span className="text-border">|</span>
                          <span>{unit.estimatedHours} hrs</span>
                          <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center ml-1">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-foreground" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </button>

                      {/* Expandable Topics & Assessment Content */}
                      {isExpanded && (
                        <div className="border-t p-4 sm:p-5 space-y-3 bg-muted/10 animate-fade-in">
                          {/* Unit Locked Callout */}
                          {isLocked && (
                            <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/70 text-xs text-amber-900 flex items-center gap-2.5 mb-2">
                              <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                              <span>
                                <strong>Unit Locked:</strong> Complete Unit {unit.unitNumber - 1} chapters and unit assessment to unlock this section.
                              </span>
                            </div>
                          )}

                          {/* Topics List under this Unit */}
                          <div className={`space-y-2.5 ${isLocked ? 'opacity-60 pointer-events-none' : ''}`}>
                            {unit.topics.map((topic) => {
                              const isDone = completedTopics.has(topic.id);
                              const isTopicDisabled = mounted && disabledTopics.includes(topic.id);
                              const isTopicLocked = isItemLocked(topic.id) || isLocked;
                              const prereqItem = getPrerequisiteItem(topic.id);

                              return (
                                <div
                                  key={topic.id}
                                  className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                                    isTopicDisabled
                                      ? 'bg-muted/40 opacity-50 border-dashed pointer-events-none'
                                      : isTopicLocked
                                      ? 'bg-muted/30 border-border/70 opacity-75'
                                      : isDone
                                      ? 'bg-emerald-50/20 border-emerald-300 hover:border-emerald-500'
                                      : 'bg-card border-border hover:border-primary/40 hover:shadow-2xs'
                                  }`}
                                >
                                  <div className="flex items-start gap-3 min-w-0">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                                      isDone
                                        ? 'bg-emerald-100 text-emerald-700'
                                        : isTopicLocked
                                        ? 'bg-muted text-muted-foreground'
                                        : 'bg-primary/10 text-primary'
                                    }`}>
                                      {isDone ? (
                                        <CheckCircle2 className="w-4 h-4" />
                                      ) : isTopicLocked ? (
                                        <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                                      ) : (
                                        `${unit.unitNumber}.${topic.order}`
                                      )}
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="font-semibold text-sm text-foreground flex items-center gap-2 truncate">
                                        {topic.title}
                                        {isDone && (
                                          <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-300 py-0">
                                            Done
                                          </Badge>
                                        )}
                                        {isTopicLocked && !isDone && (
                                          <Badge variant="outline" className="text-[10px] bg-muted/80 text-muted-foreground border-border py-0 gap-1 font-medium">
                                            <Lock className="w-2.5 h-2.5" />
                                            Locked
                                          </Badge>
                                        )}
                                        {isTopicDisabled && (
                                          <Badge variant="outline" className="text-[10px] bg-rose-50 text-rose-700 border-rose-300 py-0">
                                            Disabled
                                          </Badge>
                                        )}
                                      </h4>
                                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                        {topic.theory.summaryLines[0]}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                                    <span className="text-xs text-muted-foreground font-mono hidden sm:inline">
                                      {topic.estimatedMinutes}m • +{topic.xpReward} XP
                                    </span>
                                    <Button
                                      size="sm"
                                      variant={isDone ? 'outline' : isTopicLocked ? 'ghost' : 'default'}
                                      disabled={isTopicDisabled || isTopicLocked}
                                      onClick={() => {
                                        if (isTopicLocked) {
                                          showToast({
                                            type: 'warning',
                                            title: 'Chapter Locked 🔒',
                                            description: `Complete ${prereqItem?.title.split(':')[0] || 'previous chapter'} to unlock this chapter.`,
                                          });
                                          return;
                                        }
                                        setActiveTopicId(topic.id);
                                        setActiveView('topic');
                                        syncUrl('topic', topic.id);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                      }}
                                      className={`h-8 text-xs font-semibold gap-1 ${
                                        isTopicLocked ? 'opacity-60 cursor-not-allowed border bg-muted/40 text-muted-foreground' : ''
                                      }`}
                                      title={
                                        isTopicLocked
                                          ? `Locked: Complete ${prereqItem?.title.split(':')[0] || 'previous chapter'} to unlock`
                                          : isDone
                                          ? 'Review this chapter'
                                          : 'Start this chapter'
                                      }
                                    >
                                      {isTopicLocked ? (
                                        <>
                                          <Lock className="w-3 h-3 text-muted-foreground" />
                                          <span>Locked</span>
                                        </>
                                      ) : isDone ? (
                                        <>
                                          <span>Review</span>
                                          <ChevronRight className="w-3.5 h-3.5" />
                                        </>
                                      ) : (
                                        <>
                                          <span>Learn</span>
                                          <ChevronRight className="w-3.5 h-3.5" />
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              );
                            })}

                            {/* Unit Assessment Item (Under each Unit) */}
                            {(() => {
                              const isAssessmentDone =
                                completedUnits.has(unit.assessment.id) ||
                                completedUnits.has(unit.id) ||
                                !!quizSubmitted[unit.assessment.id];
                              const isAssessmentLocked = isItemLocked(unit.assessment.id) || isLocked;
                              const prereqAssessmentItem = getPrerequisiteItem(unit.assessment.id);

                              return (
                                <div className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                                  isAssessmentLocked
                                    ? 'border-border/70 bg-muted/20 opacity-75'
                                    : isAssessmentDone
                                    ? 'border-emerald-300 bg-emerald-50/20'
                                    : 'border-dashed border-primary/40 bg-primary/5'
                                }`}>
                                  <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                                      isAssessmentDone
                                        ? 'bg-emerald-100 text-emerald-700'
                                        : isAssessmentLocked
                                        ? 'bg-muted text-muted-foreground'
                                        : 'bg-primary/10 text-primary'
                                    }`}>
                                      {isAssessmentDone ? (
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                      ) : isAssessmentLocked ? (
                                        <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                                      ) : (
                                        <Award className="w-4 h-4" />
                                      )}
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                                        {unit.assessment.title}
                                        <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/30 py-0 font-bold">
                                          Assessment
                                        </Badge>
                                        {isAssessmentLocked && (
                                          <Badge variant="outline" className="text-[10px] bg-muted/80 text-muted-foreground border-border py-0 gap-1 font-medium">
                                            <Lock className="w-2.5 h-2.5" />
                                            Locked
                                          </Badge>
                                        )}
                                        {isAssessmentDone && (
                                          <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-300 py-0 gap-1 font-bold">
                                            <CheckCircle2 className="w-2.5 h-2.5" />
                                            Completed
                                          </Badge>
                                        )}
                                      </h4>
                                      <p className="text-xs text-muted-foreground">
                                        {unit.assessment.questions.length} questions • Passing: {unit.assessment.passingScore}% • +{unit.assessment.xpReward} XP
                                      </p>
                                    </div>
                                  </div>

                                  <Button
                                    size="sm"
                                    variant={isAssessmentDone ? 'outline' : isAssessmentLocked ? 'ghost' : 'outline'}
                                    disabled={isAssessmentLocked}
                                    onClick={() => {
                                      if (isAssessmentLocked) {
                                        showToast({
                                          type: 'warning',
                                          title: 'Assessment Locked 🔒',
                                          description: `Complete all chapters in ${unit.title.split(':')[0]} first to unlock this assessment.`,
                                        });
                                        return;
                                      }
                                      setActiveAssessmentId(unit.assessment.id);
                                      setActiveView('assessment');
                                      syncUrl('assessment', unit.assessment.id);
                                      window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className={`h-8 text-xs font-semibold self-end sm:self-auto ${
                                      isAssessmentLocked
                                        ? 'opacity-60 cursor-not-allowed border bg-muted/40 text-muted-foreground'
                                        : 'border-primary/30 text-primary hover:bg-primary/10'
                                    }`}
                                    title={
                                      isAssessmentLocked
                                        ? `Locked: Complete ${prereqAssessmentItem?.title.split(':')[0] || 'all unit chapters'} first`
                                        : isAssessmentDone
                                        ? 'Review Assessment'
                                        : 'Take Assessment'
                                    }
                                  >
                                    {isAssessmentLocked ? (
                                      <>
                                        <Lock className="w-3.5 h-3.5 mr-1" />
                                        Locked
                                      </>
                                    ) : isAssessmentDone ? (
                                      <>
                                        <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                                        Review
                                      </>
                                    ) : (
                                      <>
                                        Take Assessment
                                        <ChevronRight className="w-3.5 h-3.5 ml-1" />
                                      </>
                                    )}
                                  </Button>
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* ====================================================
                  LABS SECTION: UNIFIED SOC DASHBOARD LABS / ORIENTATION PLAYGROUND
                 ==================================================== */}
              {isModule01 ? (
                <div className="p-5 rounded-2xl border-2 border-purple-200 dark:border-purple-500/40 bg-gradient-to-r from-purple-50 via-white to-purple-50 dark:from-slate-950 dark:via-[#130924] dark:to-slate-950 text-slate-900 dark:text-slate-100 shadow-md space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <FlaskConical className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">Hands-on Workstation Lab (LAB-01: Orient Yourself in Ubuntu)</h3>
                      <Badge className="bg-purple-600 text-white text-[10px] font-bold">
                        LIVE SIMULATION • 40m
                      </Badge>
                    </div>
                    <span className="text-xs text-purple-700 dark:text-purple-300 font-mono font-medium">
                      Mentor: Ravi • Ubuntu 24.04 LTS
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Interactive Linux terminal workstation simulation. Execute commands (<code className="text-purple-700 dark:text-purple-300 font-mono font-semibold">hostname</code>, <code className="text-purple-700 dark:text-purple-300 font-mono font-semibold">cat /etc/os-release</code>, <code className="text-purple-700 dark:text-purple-300 font-mono font-semibold">whoami</code>, <code className="text-purple-700 dark:text-purple-300 font-mono font-semibold">pwd</code>, and <code className="text-purple-700 dark:text-purple-300 font-mono font-semibold">ps aux</code>) to record host identity, user privileges, and establish a process baseline.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                    <div className="p-2 rounded-lg bg-purple-100/50 dark:bg-slate-900/80 border border-purple-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-purple-700 dark:text-purple-300 font-bold">1. System Identity</span>
                      <Badge variant="outline" className="text-[10px] text-slate-500 dark:text-slate-400 border-purple-200 dark:border-slate-700">hostname &amp; os</Badge>
                    </div>
                    <div className="p-2 rounded-lg bg-purple-100/50 dark:bg-slate-900/80 border border-purple-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-purple-700 dark:text-purple-300 font-bold">2. User Context</span>
                      <Badge variant="outline" className="text-[10px] text-slate-500 dark:text-slate-400 border-purple-200 dark:border-slate-700">whoami &amp; pwd</Badge>
                    </div>
                    <div className="p-2 rounded-lg bg-purple-100/50 dark:bg-slate-900/80 border border-purple-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-purple-700 dark:text-purple-300 font-bold">3. Process Baseline</span>
                      <Badge variant="outline" className="text-[10px] text-slate-500 dark:text-slate-400 border-purple-200 dark:border-slate-700">ps aux table</Badge>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-purple-200 dark:border-purple-500/20">
                    <div className="flex items-center gap-2 text-xs text-purple-700 dark:text-purple-300 font-mono">
                      <span>✓ 3 Auto-verified Tasks</span>
                      <span>•</span>
                      <span>+50 XP Completion Award</span>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        sound.playClick();
                        setIsMod01LabOpen(true);
                      }}
                      className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs gap-2 rounded-xl shadow-md cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Launch Ubuntu Workstation Lab</span>
                    </Button>
                  </div>
                </div>
              ) : isModule02 ? (
                <div className="p-5 rounded-2xl border-2 border-blue-200 dark:border-blue-500/40 bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-slate-950 dark:via-[#0a1530] dark:to-slate-950 text-slate-900 dark:text-slate-100 shadow-md space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Network className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">Hands-on Network Lab (LAB-02: Trace a Small-Branch Network)</h3>
                      <Badge className="bg-blue-600 text-white text-[10px] font-bold">
                        LIVE SIMULATION • 45m
                      </Badge>
                    </div>
                    <span className="text-xs text-blue-700 dark:text-blue-300 font-mono font-medium">
                      Mentor: Ravi • Topology &amp; Wireshark Capture
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Interactive network topology and packet sniffer simulation. Label branch devices (laptop, switch, default gateway, and internal DNS), execute a 4-hop route trace, and dissect Wireshark packet capture streams to extract communication endpoints.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                    <div className="p-2 rounded-lg bg-blue-100/50 dark:bg-slate-900/80 border border-blue-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-blue-700 dark:text-blue-300 font-bold">1. Topology Mapper</span>
                      <Badge variant="outline" className="text-[10px] text-slate-500 dark:text-slate-400 border-blue-200 dark:border-slate-700">4 device roles</Badge>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-100/50 dark:bg-slate-900/80 border border-blue-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-blue-700 dark:text-blue-300 font-bold">2. Route Tracer</span>
                      <Badge variant="outline" className="text-[10px] text-slate-500 dark:text-slate-400 border-blue-200 dark:border-slate-700">4-hop path</Badge>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-100/50 dark:bg-slate-900/80 border border-blue-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-blue-700 dark:text-blue-300 font-bold">3. Wireshark Dissector</span>
                      <Badge variant="outline" className="text-[10px] text-slate-500 dark:text-slate-400 border-blue-200 dark:border-slate-700">IPs &amp; ports</Badge>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-blue-200 dark:border-blue-500/20">
                    <div className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300 font-mono">
                      <span>✓ 3 Auto-verified Tasks</span>
                      <span>•</span>
                      <span>+50 XP Completion Award</span>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        sound.playClick();
                        setIsMod02LabOpen(true);
                      }}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs gap-2 rounded-xl shadow-md cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Launch Branch Network Lab</span>
                    </Button>
                  </div>
                </div>
              ) : isModule03 ? (
                <div className="p-5 rounded-2xl border-2 border-amber-200 dark:border-amber-500/40 bg-gradient-to-r from-amber-50 via-white to-amber-50 dark:from-slate-950 dark:via-[#1f1606] dark:to-slate-950 text-slate-900 dark:text-slate-100 shadow-md space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">Hands-on Cybersecurity Lab (LAB-03: Classify a Branch Security Scenario)</h3>
                      <Badge className="bg-amber-600 text-white text-[10px] font-bold">
                        LIVE SIMULATION • 45m
                      </Badge>
                    </div>
                    <span className="text-xs text-amber-700 dark:text-amber-300 font-mono font-medium">
                      Mentor: Ananya • Threat, Vuln &amp; CIA Classification
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Interactive security risk assessment simulation. Analyze branch incident 2026-B3, identify high-value assets (customer DB &amp; portal server), distinguish threats from vulnerabilities, align preventative/detective/corrective controls, and formulate CIA impact rationale.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs font-mono">
                    <div className="p-2 rounded-lg bg-amber-100/50 dark:bg-slate-900/80 border border-amber-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-amber-700 dark:text-amber-300 font-bold">1. Asset Scoping</span>
                      <Badge variant="outline" className="text-[10px] text-slate-500 dark:text-slate-400 border-amber-200 dark:border-slate-700">2 core assets</Badge>
                    </div>
                    <div className="p-2 rounded-lg bg-amber-100/50 dark:bg-slate-900/80 border border-amber-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-amber-700 dark:text-amber-300 font-bold">2. Threat vs Vuln</span>
                      <Badge variant="outline" className="text-[10px] text-slate-500 dark:text-slate-400 border-amber-200 dark:border-slate-700">attack vs flaw</Badge>
                    </div>
                    <div className="p-2 rounded-lg bg-amber-100/50 dark:bg-slate-900/80 border border-amber-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-amber-700 dark:text-amber-300 font-bold">3. Controls</span>
                      <Badge variant="outline" className="text-[10px] text-slate-500 dark:text-slate-400 border-amber-200 dark:border-slate-700">Prev / Det / Corr</Badge>
                    </div>
                    <div className="p-2 rounded-lg bg-amber-100/50 dark:bg-slate-900/80 border border-amber-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-amber-700 dark:text-amber-300 font-bold">4. CIA Rationale</span>
                      <Badge variant="outline" className="text-[10px] text-slate-500 dark:text-slate-400 border-amber-200 dark:border-slate-700">High C &amp; High A</Badge>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-amber-200 dark:border-amber-500/20">
                    <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-300 font-mono">
                      <span>✓ 4 Auto-verified Tasks</span>
                      <span>•</span>
                      <span>+50 XP Completion Award</span>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        sound.playClick();
                        setIsMod03LabOpen(true);
                      }}
                      className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs gap-2 rounded-xl shadow-md cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Launch Security Scenario Lab</span>
                    </Button>
                  </div>
                </div>
              ) : isModule04 ? (
                <div className="p-5 rounded-2xl border-2 border-cyan-200 dark:border-cyan-500/40 bg-gradient-to-r from-cyan-50 via-white to-cyan-50 dark:from-slate-950 dark:via-[#0d1624] dark:to-slate-950 text-slate-900 dark:text-slate-100 shadow-md space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <FlaskConical className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">Hands-on SOC Dashboard Labs (4 Progressive Scenarios)</h3>
                      <Badge className={labsEnabled ? "bg-cyan-600 text-white text-[10px] font-bold" : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 text-[10px]"}>
                        {labsEnabled ? "ACTIVE (ADMIN ENABLED)" : "STANDBY (DISABLED BY ADMIN)"}
                      </Badge>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      Module 04 Simulation Pipeline
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-mono">
                    Full multi-console workstation simulation (Email Gateway, EDR Process Trees, SIEM Correlation, Firewall Intel, and Timelines) embedded directly inside course chapters.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-cyan-100/50 dark:bg-slate-900/80 border border-cyan-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-cyan-700 dark:text-cyan-300 font-bold">Lab 1: Basic Alert Triage</span>
                      <Badge variant="outline" className="text-[10px] text-slate-500 dark:text-slate-400 border-cyan-200 dark:border-slate-700">Unit 3 • Ch 3.2</Badge>
                    </div>
                    <div className="p-2.5 rounded-lg bg-cyan-100/50 dark:bg-slate-900/80 border border-cyan-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-cyan-700 dark:text-cyan-300 font-bold">Lab 2: False Positive Discrimination</span>
                      <Badge variant="outline" className="text-[10px] text-slate-500 dark:text-slate-400 border-cyan-200 dark:border-slate-700">Unit 4 • Ch 4.2</Badge>
                    </div>
                    <div className="p-2.5 rounded-lg bg-cyan-100/50 dark:bg-slate-900/80 border border-cyan-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-cyan-700 dark:text-cyan-300 font-bold">Lab 3: Severity Classification &amp; Matrix</span>
                      <Badge variant="outline" className="text-[10px] text-slate-500 dark:text-slate-400 border-cyan-200 dark:border-slate-700">Unit 5 • Ch 5.2</Badge>
                    </div>
                    <div className="p-2.5 rounded-lg bg-cyan-100/50 dark:bg-slate-900/80 border border-cyan-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-cyan-700 dark:text-cyan-300 font-bold">Lab 4: Incident Escalation &amp; Response</span>
                      <Badge variant="outline" className="text-[10px] text-slate-500 dark:text-slate-400 border-cyan-200 dark:border-slate-700">Unit 6 • Ch 6.2</Badge>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-cyan-200 dark:border-cyan-500/20">
                    <div className="flex items-center gap-2 text-xs text-cyan-700 dark:text-cyan-300 font-mono">
                      <span>✓ 4 Auto-verified Tasks</span>
                      <span>•</span>
                      <span>White Theme Enterprise Console</span>
                      <span>•</span>
                      <span>+50 XP Award</span>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        sound.playClick();
                        setIsMod04LabOpen(true);
                      }}
                      className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs gap-2 rounded-xl shadow-md cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Launch Alert Triage Lab (White Theme)</span>
                    </Button>
                  </div>
                </div>
              ) : isModule00 ? (
                <div className="p-5 rounded-2xl border-2 border-emerald-200 dark:border-emerald-500/40 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 dark:from-slate-950 dark:via-[#071a12] dark:to-slate-950 text-slate-900 dark:text-slate-100 shadow-md space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">Non-IT Orientation Playground: Zero-Risk Simulators</h3>
                      <Badge className="bg-emerald-600 text-white text-[10px] font-bold">
                        ACTIVE • BEGINNER FRIENDLY
                      </Badge>
                    </div>
                    <span className="text-xs text-emerald-700 dark:text-emerald-300 font-mono font-medium">
                      Module 00 Primer
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Designed specifically for complete beginners. Every chapter features interactive visual demos and zero-risk hands-on exercises to build confidence before technical modules.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-emerald-100/50 dark:bg-slate-900/80 border border-emerald-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-emerald-700 dark:text-emerald-300 font-bold">Simulator 1: Real-World Analogy Matcher</span>
                      <Badge variant="outline" className="text-[10px] text-slate-500 dark:text-slate-400 border-emerald-200 dark:border-slate-700">Unit 1 • Ch 1</Badge>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-100/50 dark:bg-slate-900/80 border border-emerald-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-emerald-700 dark:text-emerald-300 font-bold">Simulator 2: Tech Jargon Translator</span>
                      <Badge variant="outline" className="text-[10px] text-slate-500 dark:text-slate-400 border-emerald-200 dark:border-slate-700">Unit 1 • Ch 2</Badge>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-100/50 dark:bg-slate-900/80 border border-emerald-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-emerald-700 dark:text-emerald-300 font-bold">Simulator 3: Threat Detective (Phishing)</span>
                      <Badge variant="outline" className="text-[10px] text-slate-500 dark:text-slate-400 border-emerald-200 dark:border-slate-700">Unit 1 • Ch 3</Badge>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-100/50 dark:bg-slate-900/80 border border-emerald-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-emerald-700 dark:text-emerald-300 font-bold">Simulator 4: First Safe Alert Triage</span>
                      <Badge variant="outline" className="text-[10px] text-slate-500 dark:text-slate-400 border-emerald-200 dark:border-slate-700">Unit 2 • Ch 3</Badge>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            /* Fallback for other modules */
            <div className="p-8 rounded-xl border text-center space-y-4 bg-muted/10">
              <BookOpen className="w-12 h-12 text-primary mx-auto" />
              <div>
                <h3 className="text-lg font-bold text-foreground">Module {module.id}: Curriculum Preview</h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto mt-1">
                  This module curriculum is mapped in the platform. Module 04 contains the full interactive training pipeline.
                </p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/modules/04">
                  Go to Module 04 (Full Interactive Training)
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Blue Squad Animated Content Loading Screen */}
      <BlueGuyLoadingScreen
        isLoading={isNavLoading}
        targetTitle={navLoadingTargetTitle}
        durationMs={4000}
        onFinished={handleLoadingFinished}
      />

      {/* Blue Squad Floating Cinema Companion */}
      <BlueGuyNavCompanion
        currentChapterTitle={currentTopic?.title || v2ChapterContext?.v2Chapter?.title}
        onNext={handleNext}
        onPrev={handlePrevious}
        hasNext={currentSequenceIndex < flatSequence.length - 1}
        hasPrev={currentSequenceIndex > 0}
      />

      {/* Module 01 Hands-on Ubuntu Simulation Lab */}
      <Module01SimLab
        isOpen={isMod01LabOpen}
        onClose={() => setIsMod01LabOpen(false)}
      />

      {/* Module 02 Hands-on Branch Network Simulation Lab */}
      <Module02SimLab
        isOpen={isMod02LabOpen}
        onClose={() => setIsMod02LabOpen(false)}
      />

      {/* Module 03 Hands-on Security Scenario Simulation Lab */}
      <Module03SimLab
        isOpen={isMod03LabOpen}
        onClose={() => setIsMod03LabOpen(false)}
      />

      {/* Module 04 Hands-on Alert Triage Simulation Lab (White Theme) */}
      <Module04SimLab
        isOpen={isMod04LabOpen}
        onClose={() => setIsMod04LabOpen(false)}
      />
    </div>
  );
}
