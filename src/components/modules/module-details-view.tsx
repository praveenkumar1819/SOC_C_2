'use client';

import { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MODULE_04_UNITS, TopicContent, UnitStructure } from '@/data/modules/module-04-units';
import { VisualStoryDemo } from '@/components/learning/visual-story-demo';
import { InteractiveInvestigation } from '@/components/learning/interactive-investigation';
import { InteractiveTopicDashboard } from '@/components/learning/interactive-topic-dashboard';
import { DragDropCheck } from '@/components/learning/drag-drop-check';
import { MatchingCheckShuffled } from '@/components/learning/matching-check-shuffled';
import { TpFpTriage } from '@/components/learning/tp-fp-triage';
import { GlossaryText } from '@/components/learning/glossary-term-link';
import { TopicStoryFlow } from '@/components/learning/topic-story-flow';
import { useProgressStore } from '@/store/progress-store';
import { useAdminConfigStore } from '@/store/admin-config-store';
import { useGlossaryStore } from '@/store/glossary-store';
import { useToast } from '@/components/ui/toast-provider';
import { getDifficultyColor } from '@/lib/utils';

interface ModuleDetailsViewProps {
  module: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    estimatedHours: number;
    learningObjectives?: string[];
  };
  initialTopicId?: string | null;
  initialUnitId?: string | null;
  initialAssessmentId?: string | null;
}

// Topic-specific security terms for context-aware Floating Glossary
const TOPIC_GLOSSARY_MAP: Record<string, string[]> = {
  'topic-1-1': ['SOC', 'SIEM', 'EDR', 'SOAR', 'SLA', 'TTP'],
  'topic-1-2': ['SIEM', 'Sysmon', 'Event ID 4688', 'SOC', 'IOC'],
  'topic-2-1': ['Event ID 4625', 'Event ID 4624', 'SIEM', 'SLA'],
  'topic-2-2': ['Incident Response', 'SOC', 'IOC', 'TTP'],
  'topic-3-1': ['Sysmon', 'IOC', 'TTP', 'EDR', 'Living off the Land'],
  'topic-3-2': ['True Positive', 'False Positive', 'IOC', 'Threat Intelligence'],
  'topic-4-1': ['False Positive', 'True Positive', 'SOC', 'SLA'],
  'topic-4-2': ['False Positive', 'SIEM', 'Sysmon', 'TTP'],
  'topic-5-1': ['SLA', 'MTTR', 'MTTD', 'SOC'],
  'topic-5-2': ['Risk Management', 'SOC', 'Incident Response', 'SLA'],
  'topic-6-1': ['SOC', 'SLA', 'TTP', 'Incident Response'],
  'topic-6-2': ['CISO', 'Incident Response', 'SOC', 'TTP'],
  'topic-7-1': ['IOC', 'UTC', 'TTP', 'Forensics'],
  'topic-7-2': ['Incident Response', 'SLA', 'SOC', 'IOC'],
};

export function ModuleDetailsView({
  module,
  initialTopicId,
  initialUnitId,
  initialAssessmentId,
}: ModuleDetailsViewProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [mounted, setMounted] = useState(false);

  const isModule04 = module.id === '04';
  const units = isModule04 ? MODULE_04_UNITS : [];

  // Flat sequence of items for linear Previous/Next navigation
  const flatSequence: Array<{
    type: 'topic' | 'assessment';
    unitId: string;
    id: string;
    title: string;
  }> = [];

  units.forEach((u) => {
    u.topics.forEach((t) => {
      flatSequence.push({
        type: 'topic',
        unitId: u.id,
        id: t.id,
        title: t.title,
      });
    });
    flatSequence.push({
      type: 'assessment',
      unitId: u.id,
      id: u.assessment.id,
      title: u.assessment.title,
    });
  });

  // State management
  const [activeView, setActiveView] = useState<'overview' | 'topic' | 'assessment'>(
    initialTopicId ? 'topic' : initialAssessmentId ? 'assessment' : 'overview'
  );
  const [activeTopicId, setActiveTopicId] = useState<string>(
    initialTopicId || (units[0]?.topics[0]?.id || '')
  );
  const [activeAssessmentId, setActiveAssessmentId] = useState<string>(
    initialAssessmentId || (units[0]?.assessment?.id || '')
  );
  const [activeKnowMoreOpen, setActiveKnowMoreOpen] = useState(false);

  // Accordion state for expandable units: default open Unit 1 (or current unit)
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({
    'unit-1': true,
    'unit-2': false,
    'unit-3': false,
    'unit-4': false,
    'unit-5': false,
    'unit-6': false,
    'unit-7': false,
  });

  // Unit Assessment quiz states (persisted in local state)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Topic Knowledge Checks completion tracking
  const [completedChecks, setCompletedChecks] = useState<Record<string, boolean>>({});

  // Store integration
  const { completedTopics, completeTopic, completedUnits, completeUnit, totalXP, addXP } = useProgressStore();
  const {
    disabledModules,
    disabledUnits,
    unlockedUnits,
    disabledTopics,
    labsEnabled,
    unlockedAssessments,
    xpSystemEnabled,
  } = useAdminConfigStore();

  const setCurrentTopicTerms = useGlossaryStore((state) => state.setCurrentTopicTerms);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update floating glossary relevant terms when active topic changes
  useEffect(() => {
    if (activeView === 'topic' && activeTopicId) {
      const relevantTerms = TOPIC_GLOSSARY_MAP[activeTopicId] || ['SIEM', 'EDR', 'SOC', 'True Positive', 'False Positive'];
      setCurrentTopicTerms(relevantTerms);
    }
  }, [activeView, activeTopicId, setCurrentTopicTerms]);

  // URL query parameter sync for refresh stability
  const syncUrl = (view: 'overview' | 'topic' | 'assessment', id?: string) => {
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
  };

  const isModuleDisabled = mounted && disabledModules.includes(module.id);

  // Current active topic
  const currentTopic: TopicContent | undefined = units
    .flatMap((u) => u.topics)
    .find((t) => t.id === activeTopicId);

  // Checks required for current topic
  const currentTopicCheckIds = currentTopic ? [
    currentTopic.knowledgeCheck.dragDrop ? `${currentTopic.id}-dragdrop` : null,
    currentTopic.knowledgeCheck.matching ? `${currentTopic.id}-matching` : null,
    currentTopic.knowledgeCheck.triageScenario ? `${currentTopic.id}-triage` : null,
  ].filter(Boolean) as string[] : [];

  const areAllTopicChecksDone =
    !currentTopic ||
    completedTopics.has(currentTopic.id) ||
    currentTopicCheckIds.length === 0 ||
    currentTopicCheckIds.every((id) => !!completedChecks[id]);

  // Current active unit
  const currentUnit: UnitStructure | undefined = units.find(
    (u) => u.topics.some((t) => t.id === activeTopicId) || u.assessment.id === activeAssessmentId
  );

  // Current index in linear navigation sequence
  const currentSequenceIndex = flatSequence.findIndex((item) =>
    activeView === 'topic' ? item.id === activeTopicId : item.id === activeAssessmentId
  );

  // Strict sequential completion check: item is locked until EVERY previous item in sequence is 100% completed
  const isItemLocked = (itemId: string): boolean => {
    if (unlockedAssessments.includes('unlock-all') || unlockedAssessments.includes(itemId)) {
      return false;
    }
    const itemUnitId = flatSequence.find((item) => item.id === itemId)?.unitId;
    if (itemUnitId && unlockedUnits && unlockedUnits.includes(itemUnitId)) {
      return false;
    }
    const index = flatSequence.findIndex((item) => item.id === itemId);
    if (index <= 0) {
      // First topic (topic-1-1) is unlocked by default
      return false;
    }
    // Strict sequential rule: every item before this index must be completed!
    for (let i = 0; i < index; i++) {
      const prevItem = flatSequence[i];
      if (prevItem.type === 'topic') {
        if (!completedTopics.has(prevItem.id)) {
          return true;
        }
      } else {
        const isPrevAssessmentDone =
          completedUnits.has(prevItem.id) ||
          completedUnits.has(prevItem.unitId) ||
          !!quizSubmitted[prevItem.id] ||
          unlockedAssessments.includes(prevItem.id);
        if (!isPrevAssessmentDone) {
          return true;
        }
      }
    }
    return false;
  };

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
  const completedCount = units
    .flatMap((u) => u.topics)
    .filter((t) => completedTopics.has(t.id)).length;
  const completionPercentage = totalTopicsCount > 0 ? Math.round((completedCount / totalTopicsCount) * 100) : 0;

  // Unit completion check logic
  const isUnitCompleted = (unitId: string): boolean => {
    const unit = units.find((u) => u.id === unitId);
    if (!unit) return false;
    const allTopicsDone = unit.topics.every((t) => completedTopics.has(t.id));
    const assessmentDone =
      completedUnits.has(unit.assessment.id) ||
      completedUnits.has(unit.id) ||
      !!quizSubmitted[unit.assessment.id] ||
      unlockedAssessments.includes(unit.assessment.id);
    return allTopicsDone && assessmentDone;
  };

  // Unit locked check
  const isUnitLocked = (unitNumber: number, unitId: string): boolean => {
    if (
      unlockedAssessments.includes('unlock-all') ||
      unlockedAssessments.includes(unitId) ||
      (unlockedUnits && unlockedUnits.includes(unitId))
    ) {
      return false;
    }
    if (unitNumber === 1) return false;
    const prevUnitId = `unit-${unitNumber - 1}`;
    return !isUnitCompleted(prevUnitId);
  };

  // Toggle accordion unit expand/collapse
  const toggleUnitAccordion = (unitId: string) => {
    setExpandedUnits((prev) => ({
      ...prev,
      [unitId]: !prev[unitId],
    }));
  };

  // Linear Navigation Handlers (Guarded: cannot proceed next if current is incomplete)
  const handleNext = () => {
    if (currentSequenceIndex < flatSequence.length - 1) {
      const currentItem = flatSequence[currentSequenceIndex];
      if (currentItem.type === 'topic' && !completedTopics.has(currentItem.id)) {
        showToast({
          type: 'warning',
          title: 'Topic Incomplete 🔒',
          description: 'You must complete all sections and mark this topic complete before unlocking the next topic.',
        });
        return;
      }
      const nextItem = flatSequence[currentSequenceIndex + 1];
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
    }
  };

  const handlePrevious = () => {
    if (currentSequenceIndex > 0) {
      const prevItem = flatSequence[currentSequenceIndex - 1];
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
        title: 'Topic Completed! 🎉',
        description: `Topic marked complete. Next topic has been unlocked! +${xpSystemEnabled ? xpReward : 0} XP.`,
      });
    }
  };

  // Find next uncompleted topic that is unlocked
  const currentPlayableTopic = units
    .flatMap((u) => u.topics)
    .find((t) => !completedTopics.has(t.id) && !isItemLocked(t.id)) || units[0]?.topics[0];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      {/* ========================================================
          VIEW: TOPIC LEARNING VIEW (CONTINUOUS MODERN FLOW - NO CARD-BY-CARD)
         ======================================================== */}
      {activeView === 'topic' && currentTopic && currentUnit && (
        isItemLocked(currentTopic.id) ? (
          <div className="p-8 sm:p-12 rounded-2xl border bg-card text-center space-y-5 max-w-lg mx-auto shadow-sm my-10 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto ring-8 ring-amber-500/5">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <Badge variant="outline" className="text-amber-700 bg-amber-50 border-amber-300 font-bold uppercase tracking-wider text-[10px]">
                Topic Locked
              </Badge>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">{currentTopic.title}</h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                This topic is locked. You must complete{' '}
                <strong className="text-foreground">{getPrerequisiteItem(currentTopic.id)?.title || 'the previous topic'}</strong>{' '}
                before unlocking this section.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
              {getPrerequisiteItem(currentTopic.id) && (
                <Button
                  size="sm"
                  onClick={() => {
                    const prereq = getPrerequisiteItem(currentTopic.id);
                    if (prereq) {
                      if (prereq.type === 'topic') {
                        setActiveTopicId(prereq.id);
                        setActiveView('topic');
                        syncUrl('topic', prereq.id);
                      } else {
                        setActiveAssessmentId(prereq.id);
                        setActiveView('assessment');
                        syncUrl('assessment', prereq.id);
                      }
                    }
                  }}
                  className="text-xs font-bold gap-1.5 w-full sm:w-auto"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Go to {getPrerequisiteItem(currentTopic.id)?.title.split(':')[0]}
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveView('overview');
                  syncUrl('overview');
                }}
                className="text-xs w-full sm:w-auto font-semibold"
              >
                Back to Curriculum
              </Button>
            </div>
          </div>
        ) : (
          <TopicStoryFlow
            topic={currentTopic}
            unit={currentUnit}
            isCompleted={completedTopics.has(currentTopic.id)}
            onComplete={(id, xp) => handleCompleteTopic(id, xp)}
            onNext={handleNext}
            hasNext={currentSequenceIndex < flatSequence.length - 1}
            onPrevious={handlePrevious}
            hasPrevious={currentSequenceIndex > 0}
            onBackToOverview={() => {
              setActiveView('overview');
              syncUrl('overview');
            }}
          />
        )
      )}

      {/* ========================================================
          VIEW: UNIT ASSESSMENT QUIZ VIEW
         ======================================================== */}
      {activeView === 'assessment' && currentUnit && (
        isItemLocked(currentUnit.assessment.id) ? (
          <div className="p-8 sm:p-12 rounded-2xl border bg-card text-center space-y-5 max-w-lg mx-auto shadow-sm my-10 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto ring-8 ring-amber-500/5">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <Badge variant="outline" className="text-amber-700 bg-amber-50 border-amber-300 font-bold uppercase tracking-wider text-[10px]">
                Assessment Locked
              </Badge>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">{currentUnit.assessment.title}</h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                This unit assessment is locked. You must complete all topics in{' '}
                <strong className="text-foreground">{currentUnit.title.split(':')[0]}</strong> before taking this assessment.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
              {getPrerequisiteItem(currentUnit.assessment.id) && (
                <Button
                  size="sm"
                  onClick={() => {
                    const prereq = getPrerequisiteItem(currentUnit.assessment.id);
                    if (prereq) {
                      setActiveTopicId(prereq.id);
                      setActiveView('topic');
                      syncUrl('topic', prereq.id);
                    }
                  }}
                  className="text-xs font-bold gap-1.5 w-full sm:w-auto"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Go to {getPrerequisiteItem(currentUnit.assessment.id)?.title.split(':')[0]}
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveView('overview');
                  syncUrl('overview');
                }}
                className="text-xs w-full sm:w-auto font-semibold"
              >
                Back to Curriculum
              </Button>
            </div>
          </div>
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
                disabled={
                  currentSequenceIndex >= flatSequence.length - 1 ||
                  (!quizSubmitted[currentUnit.assessment.id] &&
                    !completedUnits.has(currentUnit.id) &&
                    !completedUnits.has(currentUnit.assessment.id))
                }
                className="h-8 text-xs gap-1 font-semibold"
                title={
                  !quizSubmitted[currentUnit.assessment.id] &&
                  !completedUnits.has(currentUnit.id) &&
                  !completedUnits.has(currentUnit.assessment.id)
                    ? 'Pass this assessment to unlock the next unit'
                    : 'Proceed to Next Stage'
                }
              >
                Next
                {quizSubmitted[currentUnit.assessment.id] ||
                completedUnits.has(currentUnit.id) ||
                completedUnits.has(currentUnit.assessment.id) ? (
                  <ChevronRight className="w-3.5 h-3.5" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                )}
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
          {/* Back Link */}
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

          {/* Module Banner Card */}
          <div className="p-6 sm:p-8 rounded-2xl border bg-gradient-to-br from-card to-muted/20 space-y-5 shadow-xs">
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
                  <span>{completionPercentage}% ({completedCount} / {totalTopicsCount} Topics)</span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
              </div>

              {isModule04 && (
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
                  className="font-bold text-sm gap-2 px-8 shadow-md"
                >
                  <Play className="w-4 h-4 fill-white" />
                  {completedCount === 0 ? 'Start Module' : 'Continue Learning'}
                </Button>
              )}
            </div>
          </div>

          {/* ====================================================
              EXPANDABLE UNITS SECTION (SECTION 2: DROPDOWNS & LOCKING)
              Module Details
              ▼ Unit 1
                 ├── Topic 1
                 ├── Topic 2
                 ├── Topic 3
                 └── Assessment
              ▶ Unit 2 (Locked until Unit 1 complete)
              ▶ Unit 3 (Locked until Unit 2 complete)
             ==================================================== */}
          {isModule04 ? (
            <div className="space-y-6">
              <div className="border-b pb-2">
                <h2 className="text-xl font-bold text-foreground">Curriculum Units & Topics</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Expand each unit to explore its topics and unit assessment. Units unlock sequentially as previous units are completed.
                </p>
              </div>

              <div className="space-y-4">
                {units.map((unit) => {
                  const unitTopicsCompleted = unit.topics.filter((t) => completedTopics.has(t.id)).length;
                  const isUnitDone = isUnitCompleted(unit.id);
                  const isUnlockedByAdmin = (unlockedUnits || []).includes(unit.id);
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
                          : isUnlockedByAdmin
                          ? 'border-purple-300/80 bg-purple-50/10 shadow-xs'
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
                              : isUnlockedByAdmin
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-primary/10 text-primary'
                          }`}>
                            {isUnitDone ? (
                              <Check className="w-4 h-4" />
                            ) : isLocked ? (
                              <Lock className="w-4 h-4" />
                            ) : isUnlockedByAdmin ? (
                              <Unlock className="w-4 h-4" />
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
                              {isUnlockedByAdmin && (
                                <Badge variant="outline" className="text-[10px] bg-purple-50 text-purple-700 border-purple-300 py-0 gap-1 font-semibold">
                                  <Unlock className="w-2.5 h-2.5 text-purple-600" />
                                  Unlocked by Admin
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
                            {unitTopicsCompleted}/{unit.topics.length} Topics
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
                          {isLocked && !isUnlockedByAdmin && (
                            <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/70 text-xs text-amber-900 flex items-center gap-2.5 mb-2">
                              <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                              <span>
                                <strong>Unit Locked:</strong> Complete Unit {unit.unitNumber - 1} topics and unit assessment to unlock this section.
                              </span>
                            </div>
                          )}

                          {isUnlockedByAdmin && (
                            <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/70 text-xs text-purple-900 flex items-center gap-2.5 mb-2">
                              <Unlock className="w-4 h-4 text-purple-600 shrink-0" />
                              <span>
                                <strong>Unlocked by Admin:</strong> Prerequisites have been bypassed by administrator override. All topics and assessment in this unit are accessible.
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
                                        if (isTopicLocked) return;
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
                                          ? `Locked: Complete ${prereqItem?.title.split(':')[0] || 'previous topic'} to unlock`
                                          : isDone
                                          ? 'Review this topic'
                                          : 'Start this topic'
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
                                      if (isAssessmentLocked) return;
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
                                        ? `Locked: Complete ${prereqAssessmentItem?.title.split(':')[0] || 'all unit topics'} first`
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
                  LABS SECTION (Section 14: Architecture Ready - Standby)
                 ==================================================== */}
              <div className="p-5 rounded-2xl border-2 border-dashed border-border bg-muted/20 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="w-5 h-5 text-muted-foreground" />
                    <h3 className="font-bold text-sm text-foreground">Hands-on Cyber Range Labs</h3>
                    <Badge variant="secondary" className="text-[10px] uppercase font-bold">
                      {labsEnabled ? 'Active (Admin Override)' : 'Architecture Ready • Standby'}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    External Range Integration
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Dedicated external cyber range integrations (Splunk, Wireshark, Zeek, ELK) are prepared in the platform architecture and can be toggled by administrators via the Dev Admin Panel.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <Badge variant="outline" className="text-xs text-muted-foreground bg-background">
                    Lab 04.1: Splunk Alert Queue Management (Standby)
                  </Badge>
                  <Badge variant="outline" className="text-xs text-muted-foreground bg-background">
                    Lab 04.2: Triage Phishing Telemetry in Zeek (Standby)
                  </Badge>
                </div>
              </div>
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
    </div>
  );
}
