'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Pause,
  Volume2,
  ExternalLink,
  Terminal,
  Database,
  Cpu,
  Key,
  Network,
  AlertTriangle,
  Lock,
  ArrowRight,
  GitBranch,
  Activity,
  FileText,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  V2Chapter,
  V2ChapterNormalized,
  V2Unit,
  V2Module,
  normalizeV2Chapter,
  ExtraBox,
  FormalDefinition,
  SectionStyleConfig,
  QuestionItem,
  QuestionType,
} from '@/data/curriculum-v2-data';
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

  // Section 2: Visual State
  const [activeVisualStep, setActiveVisualStep] = useState<number>(0);
  const [isVisualReplaying, setIsVisualReplaying] = useState<boolean>(false);
  const [isPlayingSection2Audio, setIsPlayingSection2Audio] = useState<boolean>(false);
  const section2AudioRef = useRef<HTMLAudioElement | null>(null);

  // Section 3: Interactive Activity State
  const [interactiveSelectedMap, setInteractiveSelectedMap] = useState<Record<string, string>>({});
  const [revealedClues, setRevealedClues] = useState<Set<string>>(new Set());
  const [sortedBuckets, setSortedBuckets] = useState<Record<string, string[]>>({});
  const [interactiveDone, setInteractiveDone] = useState(false);

  // Section 4: Knowledge Check State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, any>>({});
  const [inputAnswers, setInputAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Chapter tracking ref
  const currentChapterId = initialChapter?.id;
  const prevChapterIdRef = useRef(currentChapterId);

  // Sync state ONLY when navigating to a different chapter ID
  useEffect(() => {
    if (prevChapterIdRef.current !== currentChapterId) {
      prevChapterIdRef.current = currentChapterId;
      setChapter(normalizeV2Chapter(initialChapter, unit, module));
      setSelectedAnswers({});
      setInputAnswers({});
      setQuizSubmitted(false);
      setShowExplanations(false);
      setInteractiveDone(false);
      setIsCompleted(false);
      setActiveVisualStep(0);
      setIsVisualReplaying(false);
      setInteractiveSelectedMap({});
      setRevealedClues(new Set());
      setSortedBuckets({});
      if (section2AudioRef.current) {
        section2AudioRef.current.pause();
      }
      setIsPlayingSection2Audio(false);
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
    setIsVisualReplaying(true);
    setActiveVisualStep(0);
    if (section2AudioRef.current) {
      section2AudioRef.current.currentTime = 0;
      section2AudioRef.current.play().catch(() => {});
      setIsPlayingSection2Audio(true);
    }
    setTimeout(() => {
      setIsVisualReplaying(false);
    }, 400);
  };

  // Section 2: Audio playback toggle
  const toggleSection2Audio = () => {
    const audioUrl = chapter.section2_visual.audioUrl;
    if (!audioUrl) {
      // Browser Web Speech API fallback for narration
      if ('speechSynthesis' in window) {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
          setIsPlayingSection2Audio(false);
        } else {
          const text = `${chapter.section2_visual.title}. ${chapter.section2_visual.description}`;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = 0.95;
          utterance.onend = () => setIsPlayingSection2Audio(false);
          utterance.onerror = () => setIsPlayingSection2Audio(false);
          window.speechSynthesis.speak(utterance);
          setIsPlayingSection2Audio(true);
        }
      } else {
        showToast({
          type: 'info',
          title: 'Narration Audio',
          description: 'No audio URL configured for this visual walkthrough.',
        });
      }
      return;
    }

    if (!section2AudioRef.current) {
      section2AudioRef.current = new Audio(audioUrl);
      section2AudioRef.current.onended = () => setIsPlayingSection2Audio(false);
    }

    if (isPlayingSection2Audio) {
      section2AudioRef.current.pause();
      setIsPlayingSection2Audio(false);
    } else {
      section2AudioRef.current.play().catch(() => {});
      setIsPlayingSection2Audio(true);
    }
  };

  // Section 3: Reset Interactive (silent, no toast)
  const handleResetInteractive = () => {
    setInteractiveSelectedMap({});
    setRevealedClues(new Set());
    setSortedBuckets({});
    setInteractiveDone(false);
  };

  // Section 4: MCQ Selection
  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  // Section 4: Matching Selection
  const handleMatchSelect = (qIdx: number, pairId: string, matchedVal: string) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => {
      const current = prev[qIdx] || {};
      return { ...prev, [qIdx]: { ...current, [pairId]: matchedVal } };
    });
  };

  // Section 4: Input Answer change
  const handleInputChange = (qIdx: number, val: string) => {
    if (quizSubmitted) return;
    setInputAnswers((prev) => ({ ...prev, [qIdx]: val }));
  };

  // Section 4: Check Answers & Reveal Explanation
  const handleCheckQuiz = () => {
    const totalQ = chapter.section4_knowledgeCheck.questions.length;
    let answered = 0;

    chapter.section4_knowledgeCheck.questions.forEach((q, idx) => {
      const qType: QuestionType = q.type || 'mcq';
      if (qType === 'mcq' && selectedAnswers[idx] !== undefined) answered++;
      else if (qType === 'matching' && selectedAnswers[idx] && Object.keys(selectedAnswers[idx]).length > 0) answered++;
      else if (qType === 'drag-drop' && selectedAnswers[idx] && Object.keys(selectedAnswers[idx]).length > 0) answered++;
      else if (qType === 'input-value' && (inputAnswers[idx] || '').trim().length > 0) answered++;
    });

    if (answered < totalQ) {
      showToast({
        type: 'error',
        title: 'Complete All Questions',
        description: `Please attempt all ${totalQ} questions before submitting.`,
      });
      return;
    }

    setQuizSubmitted(true);
    setShowExplanations(true);

    showToast({
      type: 'success',
      title: 'Knowledge Check Complete! 🎯',
      description: 'Review your operational feedback and explanations below.',
    });
  };

  // Section 4: Reset Quiz (silent, no toast)
  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setInputAnswers({});
    setQuizSubmitted(false);
    setShowExplanations(false);
  };

  // Section 4: Finish Chapter & Earn XP
  const handleFinishChapter = () => {
    setIsCompleted(true);
    markUnitComplete(unit.id);
    if (onCompleteChapter) {
      onCompleteChapter(chapter.id, chapter.xpReward);
    }
    showToast({
      type: 'success',
      title: `Chapter Completed! 🎉 (+${chapter.xpReward} XP)`,
      description: `Mastered "${chapter.title}" in Unit ${unit.unitNumber}.`,
    });
    if (onNext) {
      setTimeout(() => onNext(), 800);
    }
  };

  // ---------------------------------------------------------------------------
  // Helper: Get Section Font / Style Classes
  // ---------------------------------------------------------------------------
  const getSectionStyleClass = (styleOverride?: SectionStyleConfig) => {
    if (!styleOverride) return '';
    const classes = [];
    if (styleOverride.fontFamily === 'mono') classes.push('font-mono-mode');
    else if (styleOverride.fontFamily === 'serif') classes.push('font-serif-mode');
    else if (styleOverride.fontFamily === 'cyber') classes.push('font-cyber-mode');
    else if (styleOverride.fontFamily === 'sans') classes.push('font-sans-mode');
    else if (styleOverride.fontFamily === 'poppins') classes.push('font-poppins-mode');
    else if (styleOverride.fontFamily === 'samsung') classes.push('font-samsung-mode');
    else if (styleOverride.fontFamily === 'beebeez') classes.push('font-beebeez-mode');
    else if (styleOverride.fontFamily === 'striker') classes.push('font-striker-mode');
    else if (styleOverride.fontFamily === 'spartan') classes.push('font-spartan-mode');

    if (styleOverride.lineHeight === 'tight') classes.push('leading-tight');
    else if (styleOverride.lineHeight === 'relaxed') classes.push('leading-relaxed');
    else if (styleOverride.lineHeight === 'loose') classes.push('leading-loose');

    return classes.join(' ');
  };

  // ---------------------------------------------------------------------------
  // Helper: Render Extra Boxes
  // ---------------------------------------------------------------------------
  const renderExtraBoxes = (boxes?: ExtraBox[]) => {
    if (!boxes || boxes.length === 0) return null;

    return (
      <div className="space-y-3.5 pt-2">
        {boxes.map((box, idx) => {
          if (box.type === 'text') {
            return (
              <div
                key={box.id || idx}
                className="p-4 rounded-2xl bg-card/70 border border-border/80 shadow-xs space-y-1.5"
              >
                {box.title && (
                  <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-primary" />
                    <span>{box.title}</span>
                  </h4>
                )}
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                  {box.content}
                </p>
              </div>
            );
          }

          if (box.type === 'image') {
            return (
              <div
                key={box.id || idx}
                className="p-4 rounded-2xl bg-card/70 border border-border/80 shadow-xs space-y-2"
              >
                {box.title && (
                  <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-primary" />
                    <span>{box.title}</span>
                  </h4>
                )}
                {box.imageUrl && (
                  <div className="rounded-xl overflow-hidden border border-border/60 bg-muted/30 max-h-[360px] flex items-center justify-center">
                    <img
                      src={box.imageUrl}
                      alt={box.title || 'Artifact Image'}
                      className="max-h-[340px] w-auto object-contain mx-auto"
                    />
                  </div>
                )}
                {box.content && (
                  <p className="text-xs text-muted-foreground italic text-center">{box.content}</p>
                )}
              </div>
            );
          }

          if (box.type === 'icon') {
            const IconComponent =
              box.iconName === 'Terminal'
                ? Terminal
                : box.iconName === 'Database'
                ? Database
                : box.iconName === 'Cpu'
                ? Cpu
                : box.iconName === 'Key'
                ? Key
                : box.iconName === 'Network'
                ? Network
                : box.iconName === 'AlertTriangle'
                ? AlertTriangle
                : box.iconName === 'Lock'
                ? Lock
                : Shield;

            return (
              <div
                key={box.id || idx}
                className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-start gap-3 text-xs sm:text-sm"
              >
                <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  {box.title && <strong className="text-foreground font-semibold">{box.title}</strong>}
                  <p className="text-muted-foreground">{box.content}</p>
                </div>
              </div>
            );
          }

          if (box.type === 'callout') {
            const style =
              box.calloutType === 'warning'
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
                : box.calloutType === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
                : box.calloutType === 'danger'
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200'
                : box.calloutType === 'tip'
                ? 'bg-purple-500/10 border-purple-500/30 text-purple-900 dark:text-purple-200'
                : 'bg-blue-500/10 border-blue-500/30 text-blue-900 dark:text-blue-200';

            return (
              <div
                key={box.id || idx}
                className={`p-4 rounded-2xl border flex items-start gap-3 text-xs sm:text-sm ${style}`}
              >
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  {box.title && <div className="font-bold mb-0.5">{box.title}</div>}
                  <div className="opacity-90">{box.content}</div>
                </div>
              </div>
            );
          }

          if (box.type === 'banner') {
            const animClass =
              box.animation === 'pulse'
                ? 'animate-pulse'
                : box.animation === 'bounce'
                ? 'animate-bounce'
                : box.animation === 'glow'
                ? 'ring-2 ring-primary/40'
                : '';

            return (
              <div
                key={box.id || idx}
                className={`p-4 rounded-2xl bg-gradient-to-r from-primary/15 via-primary/5 to-transparent border border-primary/30 flex items-center justify-between gap-3 ${animClass}`}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    {box.title && <div className="text-xs font-bold text-primary uppercase font-mono">{box.title}</div>}
                    <div className="text-sm font-semibold text-foreground">{box.content}</div>
                  </div>
                </div>
                <Badge className="bg-primary text-white text-[10px] font-mono shrink-0">DIRECTIVE</Badge>
              </div>
            );
          }

          return null;
        })}
      </div>
    );
  };

  // ---------------------------------------------------------------------------
  // Helper: Render Formal Definitions (Section 1)
  // ---------------------------------------------------------------------------
  const renderFormalDefinitions = (defs?: FormalDefinition[]) => {
    if (!defs || defs.length === 0) return null;

    return (
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <Badge className="bg-blue-600 text-white text-[10px] font-mono">
            OFFICIAL STANDARDS & FRAMEWORKS
          </Badge>
          <span className="text-xs text-muted-foreground">Authoritative Cybersecurity Definitions</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {defs.map((def, idx) => (
            <div
              key={def.id || idx}
              className="p-4 rounded-2xl border border-blue-500/30 bg-blue-50/40 dark:bg-blue-950/20 shadow-xs space-y-2 relative"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-extrabold text-xs text-foreground tracking-tight">{def.term}</span>
                <Badge variant="outline" className="text-[10px] font-mono border-blue-500/40 text-blue-600 dark:text-blue-300">
                  {def.sourceStandard} {def.citationCode && `• ${def.citationCode}`}
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">{def.definition}</p>

              {def.sourceUrl && (
                <div className="pt-1">
                  <a
                    href={def.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                  >
                    <span>Read official {def.sourceStandard} specification</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ---------------------------------------------------------------------------
  // Helper: Render Section 2 Visual presentation based on visualType
  // ---------------------------------------------------------------------------
  const renderVisualFormat = () => {
    const vType = chapter.section2_visual.visualType;
    const steps = chapter.section2_visual.steps || [];

    // Format 1: FLOWCHART (Decision Tree)
    if (vType === 'flowchart') {
      return (
        <div className="space-y-4 pt-2">
          <div className="p-4 rounded-2xl bg-muted/30 border border-purple-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-purple-600 dark:text-purple-400">
              <span className="flex items-center gap-1.5 font-bold">
                <GitBranch className="w-4 h-4" /> Incident Triage Decision Flowchart
              </span>
              <span>Click any decision node to inspect criteria</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              {steps.map((st, sIdx) => {
                const isActive = activeVisualStep === sIdx;
                return (
                  <React.Fragment key={st.id || sIdx}>
                    <div
                      onClick={() => setActiveVisualStep(sIdx)}
                      className={`flex-1 w-full p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isActive
                          ? 'border-purple-600 bg-purple-500/15 ring-2 ring-purple-500/40 shadow-sm'
                          : 'border-border bg-card hover:border-purple-500/40'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-muted-foreground uppercase">{st.stage}</div>
                      <div className="font-bold text-xs text-foreground mt-0.5">{st.title}</div>
                    </div>
                    {sIdx < steps.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-purple-500 shrink-0 hidden sm:block" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {steps[activeVisualStep] && (
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs sm:text-sm space-y-1.5">
                <div className="font-bold text-foreground flex items-center gap-2">
                  <span>Decision Criteria: {steps[activeVisualStep].title}</span>
                  <Badge className="bg-purple-600 text-white text-[10px]">{steps[activeVisualStep].stage}</Badge>
                </div>
                <p className="text-muted-foreground">{steps[activeVisualStep].description}</p>
                {steps[activeVisualStep].telemetrySnippet && (
                  <div className="p-2 rounded-lg bg-black/50 text-emerald-400 font-mono text-[11px] mt-2">
                    {steps[activeVisualStep].telemetrySnippet}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    // Format 2: PACKET FLOW (Network & Headers)
    if (vType === 'packet-flow') {
      return (
        <div className="space-y-4 pt-2">
          <div className="p-4 rounded-2xl bg-card border border-purple-500/30 space-y-3 font-mono">
            <div className="flex items-center justify-between text-xs text-purple-600 dark:text-purple-400">
              <span className="flex items-center gap-1.5 font-bold">
                <Activity className="w-4 h-4" /> Network Packet Stream & Protocol Inspection
              </span>
              <span className="text-[10px]">PCAP Frame Sequence</span>
            </div>

            <div className="space-y-2">
              {steps.map((st, sIdx) => {
                const isActive = activeVisualStep === sIdx;
                return (
                  <div
                    key={st.id || sIdx}
                    onClick={() => setActiveVisualStep(sIdx)}
                    className={`p-3 rounded-xl border text-xs transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                      isActive
                        ? 'border-purple-500 bg-purple-500/10 ring-1 ring-purple-500/50 text-foreground'
                        : 'border-border/80 bg-muted/20 text-muted-foreground hover:bg-muted/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] flex items-center justify-center font-bold">
                        {sIdx + 1}
                      </span>
                      <span className="font-bold text-foreground">{st.title}</span>
                    </div>
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400">
                      {st.telemetrySnippet || 'PROTOCOL: TCP | FLAGS: [SYN, ACK] | LEN: 64'}
                    </div>
                  </div>
                );
              })}
            </div>

            {steps[activeVisualStep] && (
              <div className="p-3.5 rounded-xl bg-black/60 border border-purple-500/40 text-emerald-300 text-xs space-y-1">
                <div className="text-[11px] text-purple-400 font-bold">Payload Frame Details:</div>
                <p className="text-white/80 font-sans text-xs">{steps[activeVisualStep].description}</p>
                <div className="text-[10px] text-muted-foreground pt-1">
                  TAG: {steps[activeVisualStep].highlightText || 'Observed Observable'}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Format 3: DIAGRAM (Sensor & Architecture Topology)
    if (vType === 'diagram') {
      const topologyNodes = [
        { name: 'Host Name: CDAC-BLR-WS-08', type: 'Target Workstation (User: b_sharma)', ip: '10.0.2.45', status: 'COMPROMISED' },
        { name: 'Sensor: Zeek-Perimeter-01', type: 'Network Passive TAP (Port 24)', ip: '10.0.1.2', status: 'ACTIVE' },
        { name: 'Host Name: CDAC-BLR-DC01', type: 'Domain Controller (Kerberos KDC)', ip: '10.0.4.10', status: 'VERIFIED' },
        { name: 'SIEM Core: CDAC-SIEM-PROD', type: 'Elastic / Splunk Cluster', ip: '10.0.8.50', status: 'INDEXING' },
      ];

      return (
        <div className="space-y-4 pt-2">
          <div className="p-5 rounded-2xl bg-card border border-purple-500/30 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5 font-mono">
                <Network className="w-4 h-4" /> Telemetry Topology Architecture
              </span>
              <span className="text-[11px] text-muted-foreground font-mono">CDAC Branch Sensor Grid</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {topologyNodes.map((node, nIdx) => (
                <div
                  key={nIdx}
                  className="p-3 rounded-xl border border-border/80 bg-muted/30 text-center space-y-1 shadow-2xs hover:border-purple-500/50 transition-all cursor-pointer"
                >
                  <div className="w-7 h-7 mx-auto rounded-lg bg-purple-500/20 text-purple-600 dark:text-purple-300 flex items-center justify-center">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs text-foreground">{node.name}</div>
                  <div className="text-[10px] text-muted-foreground font-mono">{node.type}</div>
                  <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">{node.ip}</div>
                </div>
              ))}
            </div>

            {/* Sequence Walkthrough Steps below diagram */}
            <div className="space-y-2 pt-2 border-t border-border/50">
              {steps.map((step, idx) => (
                <div
                  key={step.id || idx}
                  onClick={() => setActiveVisualStep(idx)}
                  className={`p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    activeVisualStep === idx
                      ? 'border-purple-500 bg-purple-500/10 ring-1 ring-purple-500/40 text-foreground'
                      : 'border-border bg-muted/20 text-muted-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <strong className="text-foreground">{step.title}</strong>
                  </div>
                  <span className="text-[11px] text-muted-foreground truncate max-w-[260px]">{step.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Format 4: INTERFACE TOUR (SIEM / EDR Console Walkthrough)
    if (vType === 'interface-tour') {
      return (
        <div className="space-y-4 pt-2">
          <div className="p-4 rounded-2xl bg-zinc-950 text-zinc-100 border border-purple-500/40 space-y-3 font-mono shadow-md">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-zinc-400 text-[11px] ml-1">CDAC_SOC_SIEM_CONSOLE_v2.4</span>
              </div>
              <span className="text-purple-400 text-[10px]">LIVE TELEMETRY STREAM</span>
            </div>

            {/* Simulated Query Bar */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
              <Search className="w-3.5 h-3.5 text-zinc-500" />
              <span>index=sec_ops event.dataset=&quot;endpoint.events&quot; | filter alert.severity &gt;= 3</span>
            </div>

            {/* Tour Steps */}
            <div className="space-y-2 pt-1 font-sans">
              {steps.map((st, idx) => (
                <div
                  key={st.id || idx}
                  onClick={() => setActiveVisualStep(idx)}
                  className={`p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                    activeVisualStep === idx
                      ? 'border-purple-500 bg-purple-950/40 text-white shadow-xs'
                      : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>Console Field #{idx + 1}: {st.title}</span>
                    <Badge variant="outline" className="text-[10px] font-mono border-purple-400 text-purple-300">
                      {st.stage}
                    </Badge>
                  </div>
                  <p className="mt-1 text-zinc-300 text-xs leading-relaxed">{st.description}</p>
                  {st.telemetrySnippet && (
                    <div className="mt-1.5 p-1.5 rounded bg-black text-emerald-400 font-mono text-[10px]">
                      {st.telemetrySnippet}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Default Format 5: ANIMATED STORY (Step-by-step timeline)
    return (
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>Sequence Walkthrough: {steps.length} Steps</span>
          <span className="text-[11px]">Click any step to inspect</span>
        </div>

        {steps.map((step, idx) => {
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
                <p className="text-muted-foreground text-xs leading-relaxed">{step.description}</p>
                {step.telemetrySnippet && (
                  <div className="p-2 rounded-lg bg-black/60 dark:bg-black/40 text-emerald-400 font-mono text-[11px] mt-1.5 break-all">
                    {step.telemetrySnippet}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ---------------------------------------------------------------------------
  // Helper: Render Section 3 Dynamic Interactive Engines
  // ---------------------------------------------------------------------------
  const renderInteractiveEngine = () => {
    const iType = chapter.section3_interactive.type;
    const items = chapter.section3_interactive.items || [];

    // Engine 1: MATCHING / PAIR CONNECTOR
    if (iType === 'matching') {
      return (
        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {items.map((item, idx) => {
              const itemId = item.id || String(idx);
              const isMatched = !!interactiveSelectedMap[itemId];

              return (
                <div
                  key={itemId}
                  onClick={() => {
                    setInteractiveSelectedMap((prev) => ({
                      ...prev,
                      [itemId]: prev[itemId] ? '' : 'matched',
                    }));
                  }}
                  className={`p-4 rounded-2xl border transition-all text-xs sm:text-sm space-y-1.5 cursor-pointer ${
                    isMatched
                      ? 'border-emerald-500/80 bg-emerald-500/10 dark:bg-emerald-950/30 ring-1 ring-emerald-500/30 shadow-xs'
                      : 'border-border/80 bg-muted/30 hover:bg-muted/60 hover:border-emerald-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-foreground flex items-center gap-1.5">
                      {isMatched && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
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
                    <span>{isMatched ? '✓ Concept Paired' : 'Click to Pair'}</span>
                    <span className="font-mono">#{idx + 1}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // Engine 2: SORTING BUCKETS (Benign vs Malicious or Triage vs Escalation)
    if (iType === 'sorting') {
      const buckets = ['Triage / Benign', 'Escalate / Malicious'];

      return (
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {buckets.map((bName) => (
              <div key={bName} className="p-4 rounded-2xl border border-dashed border-emerald-500/40 bg-emerald-500/5 space-y-2">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono uppercase">
                  {bName} Bucket
                </div>
                <div className="space-y-1.5 min-h-[60px]">
                  {(sortedBuckets[bName] || []).length === 0 ? (
                    <div className="text-[11px] text-muted-foreground italic py-2 text-center">
                      Click items below to assign to this bucket
                    </div>
                  ) : (
                    (sortedBuckets[bName] || []).map((bItem, biIdx) => (
                      <div key={biIdx} className="p-2 rounded-lg bg-card border text-xs font-semibold text-foreground flex items-center justify-between">
                        <span>{bItem}</span>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-2 border-t border-border/50">
            <span className="text-xs text-muted-foreground font-semibold">Select observables to classify:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {items.map((it, idx) => (
                <button
                  key={it.id || idx}
                  type="button"
                  onClick={() => {
                    const targetBucket = (it.category || '').toLowerCase().includes('escalat') ? buckets[1] : buckets[0];
                    setSortedBuckets((prev) => {
                      const cur = prev[targetBucket] || [];
                      if (cur.includes(it.label)) return prev;
                      return { ...prev, [targetBucket]: [...cur, it.label] };
                    });
                  }}
                  className="p-2.5 rounded-xl border border-border bg-card hover:border-emerald-500 text-left text-xs cursor-pointer transition-all"
                >
                  <div className="font-bold text-foreground">{it.label}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{it.summary}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Engine 3: CLUE REVEAL (Forensic Evidence Cards)
    if (iType === 'clue-reveal') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {items.map((item, idx) => {
            const itemId = item.id || String(idx);
            const isFlipped = revealedClues.has(itemId);

            return (
              <div
                key={itemId}
                onClick={() => {
                  setRevealedClues((prev) => {
                    const next = new Set(prev);
                    if (next.has(itemId)) next.delete(itemId);
                    else next.add(itemId);
                    return next;
                  });
                }}
                className={`p-4 rounded-2xl border transition-all text-xs cursor-pointer min-h-[110px] flex flex-col justify-between ${
                  isFlipped
                    ? 'border-emerald-500 bg-emerald-500/10 shadow-xs'
                    : 'border-border/80 bg-muted/40 hover:border-emerald-500/40 text-muted-foreground'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase text-muted-foreground mb-1">
                    <span>Evidence Card #{idx + 1}</span>
                    <Badge variant="outline" className="text-[9px]">{isFlipped ? 'REVEALED' : 'HIDDEN'}</Badge>
                  </div>
                  <div className="font-bold text-foreground text-xs">{item.label}</div>
                  {isFlipped && (
                    <p className="mt-1.5 text-xs text-foreground/90 leading-relaxed">{item.summary}</p>
                  )}
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                  {isFlipped ? '✓ Observable Discovered' : 'Click to Inspect Evidence'}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Engine 4: DRAG-DROP / SEQUENCE ARRANGER
    return (
      <div className="space-y-3 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {items.map((item, idx) => {
            const itemId = item.id || String(idx);
            const isSelected = !!interactiveSelectedMap[itemId];

            return (
              <div
                key={itemId}
                onClick={() => {
                  setInteractiveSelectedMap((prev) => ({
                    ...prev,
                    [itemId]: prev[itemId] ? '' : 'done',
                  }));
                }}
                className={`p-4 rounded-2xl border transition-all text-xs sm:text-sm space-y-1.5 cursor-pointer ${
                  isSelected
                    ? 'border-emerald-500/80 bg-emerald-500/10 dark:bg-emerald-950/30 ring-1 ring-emerald-500/30 shadow-xs'
                    : 'border-border/80 bg-muted/30 hover:bg-muted/60 hover:border-emerald-500/40'
                }`}
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
                  <span>{isSelected ? '✓ Examined' : 'Click to examine'}</span>
                  <span className="font-mono">#{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ---------------------------------------------------------------------------
  // Helper: Render Section 4 Questions (MCQ, Matching, DragDrop, InputValue)
  // ---------------------------------------------------------------------------
  const renderQuestion = (q: QuestionItem, qIdx: number) => {
    const qType: QuestionType = q.type || 'mcq';
    const isRevealed = quizSubmitted || showExplanations;

    // 1. MCQ
    if (qType === 'mcq') {
      const selected = selectedAnswers[qIdx];
      const isCorrect = selected === q.correctAnswer;

      return (
        <div key={q.id || qIdx} className="rounded-2xl border border-border/80 bg-background/60 p-5 sm:p-6 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-xs text-primary font-mono uppercase tracking-wider">
              Question {qIdx + 1} of {chapter.section4_knowledgeCheck.questions.length} • MCQ
            </span>
            {isRevealed && (
              <Badge className={isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}>
                {isCorrect ? 'Correct ✓' : 'Incorrect ✗'}
              </Badge>
            )}
          </div>

          <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug">{q.question}</h3>

          <div className="space-y-2 pt-1">
            {q.options.map((opt, optIdx) => {
              const isSelected = selected === optIdx;
              let optionStyle = 'border-border/80 hover:border-primary/50 hover:bg-muted/40 text-foreground';

              if (isRevealed) {
                if (optIdx === q.correctAnswer) {
                  optionStyle = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100 font-semibold';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/30 text-rose-900 dark:text-rose-100';
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

          {/* Explanation remains visible permanently */}
          {isRevealed && (
            <div className={`p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed border mt-2 ${isCorrect ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 text-emerald-900 dark:text-emerald-200' : 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-300 text-amber-900 dark:text-amber-200'}`}>
              <strong className="font-semibold text-foreground">Explanation: </strong> {q.explanation}
            </div>
          )}
        </div>
      );
    }

    // 2. MATCH THE FOLLOWING
    if (qType === 'matching') {
      const pairs = q.matchingPairs || [];
      const userMatches = selectedAnswers[qIdx] || {};

      return (
        <div key={q.id || qIdx} className="rounded-2xl border border-border/80 bg-background/60 p-5 sm:p-6 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-xs text-primary font-mono uppercase tracking-wider">
              Question {qIdx + 1} • Match The Following
            </span>
            {isRevealed && (
              <Badge className="bg-emerald-600 text-white">Reviewed ✓</Badge>
            )}
          </div>

          <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug">{q.question}</h3>

          <div className="space-y-2.5 pt-1">
            {pairs.map((p, pIdx) => (
              <div key={p.id || pIdx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl border border-border/70 bg-card">
                <span className="font-bold text-xs text-foreground flex-1">{p.left}</span>
                <span className="text-muted-foreground text-xs hidden sm:inline">↔</span>
                <select
                  disabled={isRevealed}
                  value={userMatches[p.id || String(pIdx)] || ''}
                  onChange={(e) => handleMatchSelect(qIdx, p.id || String(pIdx), e.target.value)}
                  className="h-8 rounded-lg border border-input bg-background px-2 text-xs flex-1 text-foreground"
                >
                  <option value="">Select matching term...</option>
                  {pairs.map((optPair, oIdx) => (
                    <option key={oIdx} value={optPair.right}>
                      {optPair.right}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {isRevealed && (
            <div className="p-3.5 rounded-xl text-xs sm:text-sm border bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 text-emerald-900 dark:text-emerald-200 mt-2">
              <strong className="font-semibold text-foreground">Official Rationale: </strong> {q.explanation}
            </div>
          )}
        </div>
      );
    }

    // 3. DRAG AND DROP / CLASSIFY
    if (qType === 'drag-drop') {
      const items = q.dragDropItems || [];
      const userMatches = selectedAnswers[qIdx] || {};

      return (
        <div key={q.id || qIdx} className="rounded-2xl border border-border/80 bg-background/60 p-5 sm:p-6 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-xs text-primary font-mono uppercase tracking-wider">
              Question {qIdx + 1} • Classification Drag & Drop
            </span>
            {isRevealed && (
              <Badge className="bg-emerald-600 text-white">Classified ✓</Badge>
            )}
          </div>

          <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug">{q.question}</h3>

          <div className="space-y-2 pt-1">
            {items.map((it, dIdx) => (
              <div key={it.id || dIdx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl border border-border/70 bg-card">
                <span className="font-bold text-xs text-foreground font-mono flex-1">{it.token}</span>
                <span className="text-muted-foreground text-xs hidden sm:inline">→</span>
                <select
                  disabled={isRevealed}
                  value={userMatches[it.id || String(dIdx)] || ''}
                  onChange={(e) => handleMatchSelect(qIdx, it.id || String(dIdx), e.target.value)}
                  className="h-8 rounded-lg border border-input bg-background px-2 text-xs flex-1 text-foreground"
                >
                  <option value="">Select target bucket...</option>
                  {Array.from(new Set(items.map((i) => i.targetSlot))).map((slotName, sIdx) => (
                    <option key={sIdx} value={slotName}>
                      {slotName}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {isRevealed && (
            <div className="p-3.5 rounded-xl text-xs sm:text-sm border bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 text-emerald-900 dark:text-emerald-200 mt-2">
              <strong className="font-semibold text-foreground">Explanation: </strong> {q.explanation}
            </div>
          )}
        </div>
      );
    }

    // 4. INPUT VALUE
    if (qType === 'input-value') {
      const userVal = (inputAnswers[qIdx] || '').trim();
      const accepted = (q.acceptedAnswers || []).map((a) => (q.caseSensitive ? a : a.toLowerCase()));
      const isCorrect = accepted.includes(q.caseSensitive ? userVal : userVal.toLowerCase());

      return (
        <div key={q.id || qIdx} className="rounded-2xl border border-border/80 bg-background/60 p-5 sm:p-6 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-xs text-primary font-mono uppercase tracking-wider">
              Question {qIdx + 1} • Observable Input Value
            </span>
            {isRevealed && (
              <Badge className={isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}>
                {isCorrect ? 'Correct ✓' : 'Incorrect ✗'}
              </Badge>
            )}
          </div>

          <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug">{q.question}</h3>

          <div className="flex items-center gap-2 pt-1">
            <Input
              disabled={isRevealed}
              value={inputAnswers[qIdx] || ''}
              onChange={(e) => handleInputChange(qIdx, e.target.value)}
              placeholder="Enter exact observed value (e.g. 4624, 10.0.4.15)..."
              className="text-xs font-mono h-9 max-w-md"
            />
          </div>

          {isRevealed && (
            <div className={`p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed border mt-2 ${isCorrect ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 text-emerald-900 dark:text-emerald-200' : 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-300 text-amber-900 dark:text-amber-200'}`}>
              <strong className="font-semibold text-foreground">Accepted Answers: </strong>
              <span className="font-mono">{q.acceptedAnswers?.join(', ')}</span> • {q.explanation}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 pb-20 animate-fade-in">
      {/* Chapter Title & Mentor Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-primary text-white text-[10px] font-mono font-bold">
              UNIT {unit.unitNumber}
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
              Mentor <strong className="text-foreground">{chapter.section1_theory.mentor || chapter.mentor}</strong> ({chapter.section1_theory.mentorRole || chapter.mentorRole}) •{' '}
              <span className="italic">{module.story.split('.')[0]}</span>
            </span>
          </div>
        </div>

        {/* Admin Live Edit Trigger */}
        {(isAdmin || process.env.NODE_ENV === 'development') && (
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
        className={`relative rounded-3xl p-6 sm:p-9 md:p-10 min-h-[60vh] flex flex-col justify-between scroll-mt-24 transition-all duration-300 bg-card/95 dark:bg-card/25 backdrop-blur-2xl shadow-[0_4px_24px_rgba(15,23,42,0.06)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)] border border-border/80 dark:border-border/40 hover:border-border ${getSectionStyleClass(chapter.section1_theory.styleOverride)}`}
      >
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
                  {chapter.section1_theory.title || 'Section 1: Theory & Concept'}
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
            mentor={chapter.section1_theory.mentor || chapter.mentor}
            mentorRole={chapter.section1_theory.mentorRole || chapter.mentorRole}
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

            {/* Official Formal Definitions */}
            {renderFormalDefinitions(chapter.section1_theory.formalDefinitions)}

            {/* Extra Boxes */}
            {renderExtraBoxes(chapter.section1_theory.extraBoxes)}
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
          SECTION 2: VIDEO / VISUAL ELEMENT (Borderless Stage Card with Replay & Audio)
      ========================================================================= */}
      <section
        id="section-demo"
        className={`relative rounded-3xl p-6 sm:p-9 md:p-10 min-h-[60vh] flex flex-col justify-between scroll-mt-24 transition-all duration-300 bg-card/95 dark:bg-card/25 backdrop-blur-2xl shadow-[0_4px_24px_rgba(15,23,42,0.06)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)] border border-border/80 dark:border-border/40 hover:border-border ${
          isVisualReplaying ? 'ring-2 ring-purple-500/50 scale-[0.998]' : ''
        } ${getSectionStyleClass(chapter.section2_visual.styleOverride)}`}
      >
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
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={toggleSection2Audio}
                className="text-xs h-7 px-2.5 gap-1.5 rounded-lg border-purple-500/30 text-purple-600 dark:text-purple-300 hover:bg-purple-500/10 cursor-pointer"
                title="Play visual walkthrough narration"
              >
                {isPlayingSection2Audio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlayingSection2Audio ? 'Pause Audio' : 'Audio Narration'}</span>
              </Button>

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

            {/* Dynamic Visual Format Rendering */}
            {renderVisualFormat()}

            {/* Extra Boxes */}
            {renderExtraBoxes(chapter.section2_visual.extraBoxes)}
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
        className={`relative rounded-3xl p-6 sm:p-9 md:p-10 min-h-[60vh] flex flex-col justify-between scroll-mt-24 transition-all duration-300 bg-card/95 dark:bg-card/25 backdrop-blur-2xl shadow-[0_4px_24px_rgba(15,23,42,0.06)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)] border border-border/80 dark:border-border/40 hover:border-border ${getSectionStyleClass(chapter.section3_interactive.styleOverride)}`}
      >
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
                Engine: {chapter.section3_interactive.type}
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

            {/* Dynamic Interactive Engine */}
            {renderInteractiveEngine()}

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
                    <span>Interact with the exercise items above to examine each observable.</span>
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

            {/* Extra Boxes */}
            {renderExtraBoxes(chapter.section3_interactive.extraBoxes)}
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
          SECTION 4: KNOWLEDGE CHECK (Multi-Question Types with Explanations)
      ========================================================================= */}
      <section
        id="section-kc"
        className={`relative rounded-3xl p-6 sm:p-9 md:p-10 min-h-[60vh] flex flex-col justify-between scroll-mt-24 transition-all duration-300 bg-card/95 dark:bg-card/25 backdrop-blur-2xl shadow-[0_4px_24px_rgba(15,23,42,0.06)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)] border border-border/80 dark:border-border/40 hover:border-border ${getSectionStyleClass(chapter.section4_knowledgeCheck.styleOverride)}`}
      >
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
                {chapter.section4_knowledgeCheck.questions.length} Scenario Items
              </Badge>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {chapter.section4_knowledgeCheck.questions.map((q, qIdx) => renderQuestion(q, qIdx))}

            {/* Extra Boxes */}
            {renderExtraBoxes(chapter.section4_knowledgeCheck.extraBoxes)}
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
            {quizSubmitted || showExplanations ? (
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
      {(isAdmin || process.env.NODE_ENV === 'development') && (
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
