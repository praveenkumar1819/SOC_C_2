'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Eye,
  Sliders,
  CheckCircle2,
  Clock,
  Award,
  Sparkles,
  Edit3,
  Image as ImageIcon,
  Check,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  UserCheck,
  RotateCcw,
  Shield,
  Layers,
  Play,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { V2Chapter, V2ChapterNormalized, V2Unit, V2Module, normalizeV2Chapter } from '@/data/curriculum-v2-data';
import { ChapterAudioPlayer } from './chapter-audio-player';
import { AdminChapterEditorModal } from './admin-chapter-editor-modal';
import { useProgressStore } from '@/store/progress-store';
import { useToast } from '@/components/ui/toast-provider';

interface ChapterV2ViewProps {
  module: V2Module;
  unit: V2Unit;
  initialChapter: V2Chapter;
  isAdmin?: boolean;
  onNext?: () => void;
  onCompleteChapter?: (chapterId: string, xp: number) => void;
}

export function ChapterV2View({
  module,
  unit,
  initialChapter,
  isAdmin = false,
  onNext,
  onCompleteChapter,
}: ChapterV2ViewProps) {
  const [chapter, setChapter] = useState<V2ChapterNormalized>(() =>
    normalizeV2Chapter(initialChapter, unit, module)
  );
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);
  const [interactiveDone, setInteractiveDone] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Section 2: Visual sequence state
  const [activeVisualStep, setActiveVisualStep] = useState<number>(0);
  const [isVisualReplaying, setIsVisualReplaying] = useState<boolean>(false);

  // Section 3: Interactive examined items tracking
  const [selectedInteractiveIds, setSelectedInteractiveIds] = useState<Set<string | number>>(new Set());

  // Track chapter ID via ref to prevent accidental state resets on re-renders
  const currentChapterId = initialChapter?.id;
  const prevChapterIdRef = React.useRef(currentChapterId);

  // Sync state ONLY when navigating to a different chapter ID
  React.useEffect(() => {
    if (prevChapterIdRef.current !== currentChapterId) {
      prevChapterIdRef.current = currentChapterId;
      setChapter(normalizeV2Chapter(initialChapter, unit, module));
      setSelectedAnswers({});
      setQuizSubmitted(false);
      setShowExplanations(false);
      setInteractiveDone(false);
      setIsCompleted(false);
      setActiveVisualStep(0);
      setIsVisualReplaying(false);
      setSelectedInteractiveIds(new Set());
    }
  }, [currentChapterId, initialChapter, unit, module]);

  const { showToast } = useToast();
  const markUnitComplete = useProgressStore((s) => s.markUnitComplete);

  // Smooth ease-in scroll navigation to section IDs
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -85;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  };

  // Section 2: Replay / Reset Visual Demo (silent, no toast)
  const handleReplayVisual = () => {
    setActiveVisualStep(0);
    setIsVisualReplaying(true);
    setTimeout(() => setIsVisualReplaying(false), 500);
  };

  // Section 3: Reset Interactive Learning Activity (silent, no toast)
  const handleResetInteractive = () => {
    setInteractiveDone(false);
    setSelectedInteractiveIds(new Set());
  };

  // Toggle item in Section 3
  const handleToggleInteractiveItem = (itemId: string | number) => {
    setSelectedInteractiveIds((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
    setInteractiveDone(true);
  };

  // Section 4: Quiz Option Selection
  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  // Section 4: Reset Quiz Answers (silent, no toast)
  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setShowExplanations(false);
  };

  // Section 4: Check Quiz & Reveal Explanations (reveals and stays visible until reset)
  const handleCheckQuiz = () => {
    const totalQuestions = chapter.section4_knowledgeCheck.questions.length;
    const answeredCount = Object.keys(selectedAnswers).length;

    // Always reveal explanations and keep them visible until Reset
    setQuizSubmitted(true);
    setShowExplanations(true);

    const correctCount = chapter.section4_knowledgeCheck.questions.filter(
      (q, idx) => selectedAnswers[idx] === q.correctAnswer
    ).length;

    if (answeredCount === totalQuestions && correctCount === totalQuestions) {
      showToast({
        type: 'success',
        title: 'All Correct! 🎯',
        description: `Perfect score ${correctCount}/${totalQuestions}! Explanations revealed below.`,
      });
    } else if (answeredCount > 0) {
      showToast({
        type: 'info',
        title: `Score: ${correctCount}/${totalQuestions}`,
        description: 'Explanations revealed below. Review the detailed feedback.',
      });
    } else {
      showToast({
        type: 'info',
        title: 'Explanations Revealed 💡',
        description: 'Review the detailed explanations for each question below.',
      });
    }
  };

  // Finish Chapter
  const handleFinishChapter = () => {
    setIsCompleted(true);
    markUnitComplete(chapter.id, chapter.xpReward);
    showToast({
      type: 'success',
      title: `Chapter Completed! +${chapter.xpReward} XP`,
      description: `Great job progressing through ${chapter.title}.`,
    });
    if (onCompleteChapter) {
      onCompleteChapter(chapter.id, chapter.xpReward);
    }
    if (onNext) {
      setTimeout(() => onNext(), 800);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 pb-24 animate-fade-in">
      {/* =========================================================================
          CHAPTER HEADER STRIP
      ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-[11px] font-mono text-primary border-primary/30">
              Module {module.id} • Unit {unit.unitNumber}
            </Badge>
            <Badge variant="outline" className="text-[11px] font-mono text-muted-foreground">
              Chapter {chapter.chapterNumber}
            </Badge>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-[11px] font-bold">
              ⏱ {chapter.duration} min
            </Badge>
            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[11px] font-bold">
              +{chapter.xpReward} XP
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            {chapter.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <UserCheck className="w-4 h-4 text-primary" />
            <span>
              Mentor <strong className="text-foreground">{chapter.mentor}</strong> ({chapter.mentorRole}) •{' '}
              <span className="italic">{module.story.split('.')[0]}</span>
            </span>
          </div>
        </div>

        {/* Admin Live Edit Trigger */}
        {isAdmin && (
          <div className="shrink-0">
            <Button
              type="button"
              size="sm"
              onClick={() => setIsEditorOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs gap-1.5 rounded-xl shadow-md cursor-pointer transition-all hover:scale-105"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Admin Live Edit</span>
            </Button>
          </div>
        )}
      </div>

      {/* =========================================================================
          SECTION 1: THEORY (Borderless Stage Card with Audio Player)
      ========================================================================= */}
      <section
        id="section-intro"
        className="relative rounded-3xl p-6 sm:p-9 md:p-10 min-h-[60vh] flex flex-col justify-between scroll-mt-24 transition-all duration-300 bg-card/45 dark:bg-card/25 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)] border border-border/40 hover:border-border/60"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-10 right-10 h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent rounded-full pointer-events-none" />

        <div className="space-y-6">
          {/* Section 1 Header */}
          <div className="flex items-center justify-between pb-3 border-b border-border/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs ring-1 ring-blue-500/30">
                1
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Section 1: Theory & Concept
                </h2>
                <p className="text-[11px] text-muted-foreground font-mono">Foundations & Mentor Briefing</p>
              </div>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono border-blue-500/30 text-blue-600 dark:text-blue-300">
              Briefing
            </Badge>
          </div>

          {/* Audio Player Bar */}
          <ChapterAudioPlayer
            title={chapter.title}
            mentor={chapter.mentor}
            mentorRole={chapter.mentorRole}
            theoryText={chapter.section1_theory.content}
            audioUrl={chapter.section1_theory.audioUrl}
            estimatedMinutes={chapter.duration}
          />

          {/* Theory Body */}
          <div className="space-y-5 leading-relaxed">
            {chapter.section1_theory.subtitle && (
              <h3 className="text-base sm:text-lg font-bold text-primary tracking-tight">
                {chapter.section1_theory.subtitle}
              </h3>
            )}

            <div className="text-sm sm:text-base text-foreground/90 space-y-4 font-sans leading-relaxed whitespace-pre-line">
              {chapter.section1_theory.content}
            </div>

            {/* Key Takeaway Callout */}
            {chapter.section1_theory.keyTakeaway && (
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-start gap-3 text-xs sm:text-sm">
                <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground font-semibold">Mentor Takeaway: </strong>
                  <span className="text-muted-foreground">{chapter.section1_theory.keyTakeaway}</span>
                </div>
              </div>
            )}

            {/* CDAC Bengaluru Scenario Context */}
            {chapter.section1_theory.cdacScenario && (
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/70 flex items-start gap-3 text-xs sm:text-sm">
                <Shield className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground font-semibold">CDAC Bengaluru Branch Scenario: </strong>
                  <span className="text-muted-foreground">{chapter.section1_theory.cdacScenario}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 1 Bottom Navigation Bar */}
        <div className="pt-8 mt-8 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>Section 1 of 4 • Concept Briefing complete</span>
          </span>

          <Button
            type="button"
            onClick={() => scrollToSection('section-demo')}
            className="text-xs h-9 px-5 gap-2 font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-md cursor-pointer transition-all hover:translate-y-0.5 w-full sm:w-auto"
          >
            <span>Continue to Section 2: Visual Walkthrough</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: VIDEO / VISUAL ELEMENT (Borderless Stage Card with Replay)
      ========================================================================= */}
      <section
        id="section-demo"
        className={`relative rounded-3xl p-6 sm:p-9 md:p-10 min-h-[60vh] flex flex-col justify-between scroll-mt-24 transition-all duration-300 bg-card/45 dark:bg-card/25 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)] border border-border/40 hover:border-border/60 ${
          isVisualReplaying ? 'ring-2 ring-purple-500/50 scale-[0.998]' : ''
        }`}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-10 right-10 h-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent rounded-full pointer-events-none" />

        <div className="space-y-6">
          {/* Section 2 Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xs ring-1 ring-purple-500/30">
                2
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
                  <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  Section 2: Video / Visual Element
                </h2>
                <p className="text-[11px] text-muted-foreground font-mono">Telemetry Flow & Interface Inspection</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] uppercase font-mono tracking-wider border-purple-500/30 text-purple-600 dark:text-purple-300">
                {chapter.section2_visual.visualType}
              </Badge>
            </div>
          </div>

          {/* Visual Presentation Content */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-foreground">
                {chapter.section2_visual.title}
              </h3>
              <span className="text-xs text-muted-foreground">Interactive Visual Sequence</span>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {chapter.section2_visual.description}
            </p>

            {/* Step Timeline / Sequence */}
            {chapter.section2_visual.steps && chapter.section2_visual.steps.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span>Sequence Walkthrough: {chapter.section2_visual.steps.length} Steps</span>
                  <span className="text-[11px]">Click any step to inspect</span>
                </div>

                {chapter.section2_visual.steps.map((step, idx) => {
                  const isActive = activeVisualStep === idx;
                  return (
                    <div
                      key={step.id || idx}
                      onClick={() => setActiveVisualStep(idx)}
                      className={`flex items-start gap-3.5 p-4 rounded-2xl transition-all text-xs sm:text-sm cursor-pointer ${
                        isActive
                          ? 'bg-purple-500/10 border-2 border-purple-500/60 shadow-sm shadow-purple-500/10'
                          : 'bg-muted/30 border border-border/60 hover:bg-muted/50 hover:border-purple-500/30'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold shrink-0 text-xs transition-colors ${
                          isActive
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'bg-purple-500/20 text-purple-600 dark:text-purple-300'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="font-bold text-foreground flex items-center gap-2">
                          <span>{step.title}</span>
                          {isActive && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-300">
                              Active Focus
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-xs">{step.description}</p>
                        {step.telemetrySnippet && (
                          <pre className="font-mono text-[10px] sm:text-[11px] bg-background/90 p-2.5 rounded-xl border border-border/70 overflow-x-auto text-primary mt-2">
                            {step.telemetrySnippet}
                          </pre>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Optional Annotated Screenshots / Photos */}
            {chapter.section2_visual.optionalScreenshots &&
              chapter.section2_visual.optionalScreenshots.length > 0 && (
                <div className="space-y-3 pt-6 border-t border-border/40">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground">
                    <ImageIcon className="w-4 h-4 text-primary" />
                    <span>Annotated Tool Screens & Evidence Artifacts</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {chapter.section2_visual.optionalScreenshots.map((screen, idx) => (
                      <div
                        key={screen.id || idx}
                        className="rounded-2xl border border-border overflow-hidden bg-background/80 shadow-xs hover:shadow-md transition-all space-y-2 pb-3.5"
                      >
                        <div className="relative h-48 w-full bg-muted overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={screen.url}
                            alt={screen.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="px-4 space-y-1.5 text-xs">
                          <div className="font-bold text-foreground text-sm">{screen.title}</div>
                          <p className="text-[11px] text-muted-foreground italic">{screen.caption}</p>
                          <div className="pt-1 text-[11px] space-y-1">
                            <p>
                              <strong className="text-primary font-semibold">What to notice:</strong>{' '}
                              <span className="text-foreground/80">{screen.whatToNotice}</span>
                            </p>
                            <p>
                              <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">
                                Why it matters:
                              </strong>{' '}
                              <span className="text-foreground/80">{screen.whyItMatters}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Section 2 Bottom Navigation Bar */}
        <div className="pt-8 mt-8 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => scrollToSection('section-intro')}
            className="text-xs h-9 px-3 gap-1.5 text-muted-foreground hover:text-foreground cursor-pointer justify-start sm:justify-center"
          >
            <ChevronUp className="w-4 h-4" />
            <span>Section 1: Theory</span>
          </Button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={handleReplayVisual}
              className="text-xs h-9 px-3.5 gap-1.5 rounded-xl border-purple-500/30 text-purple-600 dark:text-purple-300 hover:bg-purple-500/10 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Demo</span>
            </Button>

            <Button
              type="button"
              onClick={() => scrollToSection('section-interactive')}
              className="text-xs h-9 px-5 gap-2 font-bold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-md cursor-pointer transition-all hover:translate-y-0.5 flex-1 sm:flex-initial"
            >
              <span>Continue to Section 3: Interactive Simulation</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: INTERACTIVE LEARNING (Borderless Stage Card with Reset)
      ========================================================================= */}
      <section
        id="section-interactive"
        className="relative rounded-3xl p-6 sm:p-9 md:p-10 min-h-[60vh] flex flex-col justify-between scroll-mt-24 transition-all duration-300 bg-card/45 dark:bg-card/25 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)] border border-border/40 hover:border-border/60"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-10 right-10 h-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent rounded-full pointer-events-none" />

        <div className="space-y-6">
          {/* Section 3 Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs ring-1 ring-emerald-500/30">
                3
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Section 3: Interactive Learning
                </h2>
                <p className="text-[11px] text-muted-foreground font-mono">Hands-on Investigation & Simulation</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] uppercase font-mono tracking-wider border-emerald-500/30 text-emerald-600 dark:text-emerald-300">
                Hands-on Activity
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-foreground">
                {chapter.section3_interactive.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {chapter.section3_interactive.instructions}
              </p>
            </div>

            {/* Interactive Cards / Exercise */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {chapter.section3_interactive.items?.map((item, idx) => {
                const itemId = item.id || idx;
                const isSelected = selectedInteractiveIds.has(itemId);

                return (
                  <div
                    key={itemId}
                    className={`p-4 rounded-2xl border transition-all text-xs sm:text-sm space-y-1.5 cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500/80 bg-emerald-500/10 dark:bg-emerald-950/30 ring-1 ring-emerald-500/30 shadow-xs'
                        : 'border-border/80 bg-muted/30 hover:bg-muted/60 hover:border-emerald-500/40'
                    }`}
                    onClick={() => handleToggleInteractiveItem(itemId)}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-foreground flex items-center gap-1.5">
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                        <span>{item.label}</span>
                      </span>
                      {item.category && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-xs">{item.summary}</p>
                    <div className="pt-1 text-[10px] text-muted-foreground/80 flex items-center justify-between">
                      <span>{isSelected ? '✓ Examined' : 'Click to inspect'}</span>
                      <span className="font-mono">#{idx + 1}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Activity Verification Strip */}
            <div className="p-4 rounded-2xl bg-muted/40 border border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground flex items-center gap-2">
                {interactiveDone ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="text-foreground font-semibold">Activity Completed & Reviewed</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                    <span>Click the exercise items above to examine each concept.</span>
                  </>
                )}
              </span>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  type="button"
                  size="sm"
                  variant={interactiveDone ? 'default' : 'outline'}
                  onClick={() => {
                    setInteractiveDone(true);
                    showToast({
                      type: 'success',
                      title: 'Activity Verified! 👍',
                      description: 'Interactive concepts successfully reviewed.',
                    });
                  }}
                  className="text-xs h-8 px-4 gap-1.5 rounded-xl cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{interactiveDone ? 'Verified' : 'Verify Activity'}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 Bottom Navigation Bar */}
        <div className="pt-8 mt-8 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => scrollToSection('section-demo')}
            className="text-xs h-9 px-3 gap-1.5 text-muted-foreground hover:text-foreground cursor-pointer justify-start sm:justify-center"
          >
            <ChevronUp className="w-4 h-4" />
            <span>Section 2: Visual Demo</span>
          </Button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={handleResetInteractive}
              className="text-xs h-9 px-3.5 gap-1.5 rounded-xl border-emerald-500/30 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-500/10 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Activity</span>
            </Button>

            <Button
              type="button"
              onClick={() => scrollToSection('section-kc')}
              className="text-xs h-9 px-5 gap-2 font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer transition-all hover:translate-y-0.5 flex-1 sm:flex-initial"
            >
              <span>Continue to Section 4: Knowledge Check</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: KNOWLEDGE CHECK (Borderless Stage Card with Reset / Retake)
      ========================================================================= */}
      <section
        id="section-kc"
        className="relative rounded-3xl p-6 sm:p-9 md:p-10 min-h-[60vh] flex flex-col justify-between scroll-mt-24 transition-all duration-300 bg-card/45 dark:bg-card/25 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)] border border-border/40 hover:border-border/60"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-10 right-10 h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent rounded-full pointer-events-none" />

        <div className="space-y-6">
          {/* Section 4 Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs ring-1 ring-amber-500/30">
                4
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  Section 4: Knowledge Check
                </h2>
                <p className="text-[11px] text-muted-foreground font-mono">Immediate Recall & Practical Understanding</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] font-mono border-amber-500/30 text-amber-600 dark:text-amber-300">
                {chapter.section4_knowledgeCheck.questions.length} Quick Items
              </Badge>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {chapter.section4_knowledgeCheck.questions.map((q, qIdx) => {
              const isAnswered = selectedAnswers[qIdx] !== undefined;
              const isCorrect = selectedAnswers[qIdx] === q.correctAnswer;
              const isRevealed = quizSubmitted || showExplanations;

              return (
                <div
                  key={qIdx}
                  className="rounded-2xl border border-border/80 bg-background/60 p-5 sm:p-6 shadow-xs space-y-3.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-xs text-primary font-mono uppercase tracking-wider">
                      Question {qIdx + 1} of {chapter.section4_knowledgeCheck.questions.length}
                    </span>
                    {isRevealed && (
                      <Badge
                        className={
                          isCorrect
                            ? 'bg-emerald-600 text-white border-emerald-500 text-[10px]'
                            : 'bg-rose-600 text-white border-rose-500 text-[10px]'
                        }
                      >
                        {isCorrect ? 'Correct ✓' : 'Incorrect ✗'}
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug">
                    {q.question}
                  </h3>

                  <div className="space-y-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[qIdx] === optIdx;
                      let optionStyle =
                        'border-border/80 hover:border-primary/50 hover:bg-muted/40 text-foreground';

                      if (isRevealed) {
                        if (optIdx === q.correctAnswer) {
                          optionStyle =
                            'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100 font-semibold';
                        } else if (isSelected && !isCorrect) {
                          optionStyle =
                            'border-rose-500 bg-rose-50/70 dark:bg-rose-950/30 text-rose-900 dark:text-rose-100';
                        }
                      } else if (isSelected) {
                        optionStyle = 'border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary';
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectOption(qIdx, optIdx)}
                          className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${optionStyle}`}
                        >
                          <span>{opt}</span>
                          {isRevealed && optIdx === q.correctAnswer && (
                            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 ml-2" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Instant Feedback & Explanation: Stays visible permanently until Reset Questions is clicked */}
                  {isRevealed && (
                    <div
                      className={`p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed border mt-2 ${
                        isCorrect
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                          : 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                      }`}
                    >
                      <strong className="font-semibold text-foreground">Explanation: </strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4 Actions & Completion Bar */}
        <div className="pt-8 mt-8 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => scrollToSection('section-interactive')}
            className="text-xs h-9 px-3 gap-1.5 text-muted-foreground hover:text-foreground cursor-pointer justify-start sm:justify-center"
          >
            <ChevronUp className="w-4 h-4" />
            <span>Section 3: Interactive</span>
          </Button>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {(quizSubmitted || showExplanations) ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleResetQuiz}
                className="text-xs h-9 px-3.5 gap-1.5 rounded-xl border-amber-500/30 text-amber-600 dark:text-amber-300 hover:bg-amber-500/10 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Questions</span>
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleCheckQuiz}
                variant="outline"
                className="text-xs font-semibold h-9 px-4 rounded-xl border-border hover:bg-muted cursor-pointer"
              >
                Check Answers & Reveal Explanations
              </Button>
            )}

            <Button
              type="button"
              onClick={handleFinishChapter}
              className="bg-primary hover:bg-primary/90 text-white font-bold text-xs h-9 px-6 rounded-xl shadow-md gap-2 cursor-pointer transition-all hover:scale-105 flex-1 sm:flex-initial"
            >
              <Award className="w-4 h-4" />
              <span>Complete Chapter & Earn +{chapter.xpReward} XP</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Admin Live Editor Modal */}
      {isAdmin && (
        <AdminChapterEditorModal
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          chapter={chapter}
          onSaveSuccess={(updated) => {
            setChapter(normalizeV2Chapter(updated, unit, module));
          }}
        />
      )}
    </div>
  );
}
