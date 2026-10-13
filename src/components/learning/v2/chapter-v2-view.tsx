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
  VolumeX,
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
  Radio,
  Zap,
  Crosshair,
  Share2,
  Compass,
  Server,
  HardDrive,
  Filter,
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
import { sound } from '@/lib/sound-effects';

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

  // Helper to determine initial simulation engine based on visualType
  const getInitialSimMode = (vType?: string): 'conduit' | 'cycle' | 'grid' | 'team' => {
    if (vType === 'packet-flow') return 'conduit';
    if (vType === 'diagram') return 'cycle';
    if (vType === 'interface-tour') return 'grid';
    return 'team';
  };

  // Section 2: Visual Simulation State
  const [activeVisualStep, setActiveVisualStep] = useState<number>(0);
  const [isVisualReplaying, setIsVisualReplaying] = useState<boolean>(false);
  const [isPlayingSection2Audio, setIsPlayingSection2Audio] = useState<boolean>(false);
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(() => sound.isMuted());
  const section2AudioRef = useRef<HTMLAudioElement | null>(null);

  // Multi-format simulation mode switcher: 'conduit' | 'cycle' | 'grid' | 'team'
  const [activeSimMode, setActiveSimMode] = useState<'conduit' | 'cycle' | 'grid' | 'team'>(() =>
    getInitialSimMode(initialChapter?.section2_visual?.visualType)
  );

  // Engine 1: Team Visual State
  const [selectedTeamRole, setSelectedTeamRole] = useState<'l2' | 'l3' | 'intel' | 'network' | 'identity' | 'manager'>('l2');

  // Engine 2: Operational Loop State
  const [selectedLoopStage, setSelectedLoopStage] = useState<'monitor' | 'detect' | 'analyze' | 'respond'>('analyze');

  // Engine 3: Tool Ecosystem State
  const [selectedSensorTool, setSelectedSensorTool] = useState<'siem' | 'edr' | 'network' | 'firewall'>('siem');

  // Engine 4: Telemetry Conduit State
  const [selectedConduitStage, setSelectedConduitStage] = useState<number>(4);

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
      setActiveSimMode(getInitialSimMode(initialChapter?.section2_visual?.visualType));
      setSelectedTeamRole('l2');
      setSelectedLoopStage('analyze');
      setSelectedSensorTool('siem');
      setSelectedConduitStage(4);
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

  // Section 2: Replay / Reset Animated Visual Story (silent, no toast)
  const handleReplayVisual = () => {
    sound.playClick();
    setIsVisualReplaying(true);
    setActiveVisualStep(0);
    setSelectedConduitStage(0);
    setSelectedLoopStage('monitor');
    setSelectedSensorTool('siem');
    setSelectedTeamRole('l2');
    if (section2AudioRef.current) {
      section2AudioRef.current.currentTime = 0;
      section2AudioRef.current.play().catch(() => {});
      setIsPlayingSection2Audio(true);
    }
    setTimeout(() => {
      setIsVisualReplaying(false);
    }, 400);
  };

  // Global Procedural Sound Mute Toggle
  const handleToggleSound = () => {
    const nextMuted = sound.toggleMute();
    setIsSoundMuted(nextMuted);
    if (!nextMuted) {
      sound.playClick();
    }
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
    sound.playClick();
    setInteractiveSelectedMap({});
    setRevealedClues(new Set());
    setSortedBuckets({});
    setInteractiveDone(false);
  };

  // Section 4: MCQ Selection
  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    sound.playClick();
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  // Section 4: Matching Selection
  const handleMatchSelect = (qIdx: number, pairId: string, matchedVal: string) => {
    if (quizSubmitted) return;
    sound.playClick();
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
      sound.playError();
      showToast({
        type: 'error',
        title: 'Complete All Questions',
        description: `Please attempt all ${totalQ} questions before submitting.`,
      });
      return;
    }

    sound.playSuccess();
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
    sound.playClick();
    setSelectedAnswers({});
    setInputAnswers({});
    setQuizSubmitted(false);
    setShowExplanations(false);
  };

  // Section 4: Finish Chapter & Earn XP
  const handleFinishChapter = () => {
    sound.playSuccess();
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
  // Contextual Telemetry Generator (Empirical Rigor for Host, User, IP, Time)
  // ---------------------------------------------------------------------------
  const getContextualTelemetry = () => {
    const cid = chapter.id || 'c01';
    const sum = cid.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hostNum = (sum % 8) + 1;
    const ipHost = 10 + (sum % 80);
    const hostName = cid.includes('fin') || sum % 2 === 0 ? `FIN-PC-0${hostNum}` : `CDAC-BLR-WS-0${hostNum}`;
    const targetIp = `10.10.20.${ipHost}`;
    const sourceIp = `192.168.1.${(sum % 40) + 10}`;
    const user = cid.includes('fin') ? 'b_sharma (Fin Operations)' : 'j_patel (DevOps Engineer)';
    const mentor = chapter.mentor || 'Karthik Raja';
    const timestamp = '2026-10-13T10:14:28.402Z';
    const alertId = `SEC-ALERT-2026-${cid.toUpperCase()}`;
    const sensorId = `ZEEK-TAP-BLR-0${(sum % 4) + 1}`;

    return {
      hostName,
      targetIp,
      sourceIp,
      user,
      mentor,
      timestamp,
      alertId,
      sensorId,
      slaRemaining: '04:12',
    };
  };

  // ---------------------------------------------------------------------------
  // Engine 1: Animated SOC Team Map (renderTeamVisual)
  // SVG Canvas (350×300px) with central L1 Analyst and 6 orbiting satellites
  // ---------------------------------------------------------------------------
  const renderTeamVisual = () => {
    const tel = getContextualTelemetry();
    const roles = [
      {
        id: 'l2' as const,
        title: 'L2 Senior Lead',
        short: 'L2',
        team: 'Escalation Tier 2',
        cx: 175,
        cy: 40,
        desc: 'Validates complex correlations, coordinates playbook actions, and grants isolation authorization.',
        criteria: `Escalate when process tree indicates unverified LOLBIN execution on ${tel.hostName} with privilege escalation indicators.`,
        channel: '#soc-war-room-escalations',
      },
      {
        id: 'l3' as const,
        title: 'L3 Threat Hunter',
        short: 'L3',
        team: 'Deep Forensics',
        cx: 290,
        cy: 95,
        desc: 'Extracts memory dumps, decompiles suspicious payloads, and hunts for dormant persistence mechanisms.',
        criteria: `Hand off for memory injection analysis if telemetry shows hollowed processes or hidden DLL unmapping on ${tel.targetIp}.`,
        channel: '#soc-threat-hunters',
      },
      {
        id: 'intel' as const,
        title: 'Threat Intel',
        short: 'TI',
        team: 'CTI & Attribution',
        cx: 290,
        cy: 205,
        desc: 'Enriches observables with external threat feeds (MISP, VirusTotal, AlienVault OTX) and MITRE ATT&CK techniques.',
        criteria: `Query CTI feeds to verify if observed C2 IP (${tel.sourceIp}) belongs to a known APT campaign or commodity botnet.`,
        channel: '#cti-intel-stream',
      },
      {
        id: 'network' as const,
        title: 'Network Eng',
        short: 'NET',
        team: 'SecOps Infrastructure',
        cx: 175,
        cy: 260,
        desc: 'Inspects full packet PCAP captures, verifies core switch SPAN ports, and verifies perimeter gateway NAT rules.',
        criteria: `Request PCAP slice for ${tel.targetIp}:443 to examine TLS JA3 fingerprints and determine whether beaconing is active.`,
        channel: '#netops-perimeter-oncall',
      },
      {
        id: 'identity' as const,
        title: 'Identity / IAM',
        short: 'IAM',
        team: 'Active Directory & IdP',
        cx: 60,
        cy: 205,
        desc: 'Oversees Kerberos ticket grants, Azure AD / Okta session revocations, and credential emergency lockouts.',
        criteria: `Trigger emergency password reset and revoke active sessions for user ${tel.user} upon confirmation of compromised tokens.`,
        channel: '#iam-security-triage',
      },
      {
        id: 'manager' as const,
        title: 'SOC Manager',
        short: 'MGR',
        team: 'Governance & Comms',
        cx: 60,
        cy: 95,
        desc: 'Governs 15-minute SLA adherence, regulatory notifications (CERT-In / GDPR), and executive stakeholder briefings.',
        criteria: `Brief management when incident reaches Severity 1 (Critical) or involves sensitive financial/health databases.`,
        channel: '#soc-management-briefs',
      },
    ];

    const currentRole = roles.find((r) => r.id === selectedTeamRole) || roles[0];

    return (
      <div className="space-y-4 pt-2">
        <div className="rounded-2xl p-4 sm:p-6 bg-[#090d16] text-slate-100 border border-sky-500/30 shadow-[0_0_25px_rgba(56,189,248,0.08)] space-y-5">
          {/* Engine Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-sky-400" />
              <span className="font-bold text-sm tracking-tight text-white font-mono uppercase">
                1. Animated SOC Team Map
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Mesh Status: Active Operational Handoffs</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* SVG Team Topology Canvas (350×300px) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-3 rounded-xl bg-[#0f172a]/70 border border-slate-800/80">
              <svg
                viewBox="0 0 350 300"
                className="w-full max-w-[350px] h-[300px] select-none"
                style={{ overflow: 'visible' }}
              >
                <defs>
                  {/* Glow filter for active nodes */}
                  <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Connecting Lines from Center (175, 150) to Satellites */}
                {roles.map((r) => {
                  const isSelected = selectedTeamRole === r.id;
                  return (
                    <g key={`line-${r.id}`}>
                      <line
                        x1="175"
                        y1="150"
                        x2={r.cx}
                        y2={r.cy}
                        stroke={isSelected ? '#38bdf8' : '#334155'}
                        strokeWidth={isSelected ? '2.5' : '1.5'}
                        strokeDasharray={isSelected ? '6 6' : '4 4'}
                        className={isSelected ? 'animated-signal-line' : ''}
                      />
                      {isSelected && (
                        <circle
                          cx={175 + (r.cx - 175) * 0.55}
                          cy={150 + (r.cy - 150) * 0.55}
                          r="3"
                          fill="#38bdf8"
                          className="animate-pulse"
                        />
                      )}
                    </g>
                  );
                })}

                {/* Central L1 Analyst (YOU) Node */}
                <g className="cursor-default">
                  {/* Outer Pulsing Aura */}
                  <circle
                    cx="175"
                    cy="150"
                    r="34"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    className="pulse-cyan-glow"
                  />
                  {/* Main Center Node */}
                  <circle
                    cx="175"
                    cy="150"
                    r="26"
                    fill="#0f172a"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    style={{ filter: 'url(#cyanGlow)' }}
                  />
                  <text
                    x="175"
                    y="147"
                    textAnchor="middle"
                    fill="#38bdf8"
                    fontSize="11"
                    fontWeight="800"
                    fontFamily="monospace"
                  >
                    YOU
                  </text>
                  <text
                    x="175"
                    y="160"
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="8.5"
                    fontWeight="600"
                    fontFamily="monospace"
                  >
                    (L1)
                  </text>
                </g>

                {/* 6 Orbiting Satellite Nodes */}
                {roles.map((r) => {
                  const isSelected = selectedTeamRole === r.id;
                  return (
                    <g
                      key={`node-${r.id}`}
                      className="cursor-pointer transition-transform hover:scale-105"
                      onClick={() => {
                        sound.playClick();
                        setSelectedTeamRole(r.id);
                      }}
                    >
                      <circle
                        cx={r.cx}
                        cy={r.cy}
                        r="20"
                        fill={isSelected ? '#1e293b' : '#0f172a'}
                        stroke={isSelected ? '#38bdf8' : '#475569'}
                        strokeWidth={isSelected ? '2.5' : '1.5'}
                        style={
                          isSelected
                            ? {
                                filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.75))',
                              }
                            : {}
                        }
                      />
                      <text
                        x={r.cx}
                        y={r.cy + 3.5}
                        textAnchor="middle"
                        fill={isSelected ? '#38bdf8' : '#cbd5e1'}
                        fontSize="9.5"
                        fontWeight="700"
                        fontFamily="monospace"
                      >
                        {r.short}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="text-[10px] text-slate-400 font-mono text-center pt-2">
                Click any orbiting role node to inspect mentor escalation handoff protocol
              </div>
            </div>

            {/* Inspection Panel & Mentor Handoff Guidance */}
            <div className="lg:col-span-6 space-y-3 p-4 rounded-xl bg-[#0f172a]/90 border border-sky-500/30 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div>
                  <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider block">
                    Escalation Inspection Target
                  </span>
                  <span className="font-bold text-sm text-white">{currentRole.title}</span>
                </div>
                <Badge className="bg-sky-500/20 text-sky-300 border border-sky-400/40 text-[10px] font-mono">
                  {currentRole.team}
                </Badge>
              </div>

              <p className="text-slate-300 leading-relaxed text-xs">{currentRole.desc}</p>

              {/* Handoff Doctrine Callout */}
              <div className="p-3 rounded-lg bg-sky-950/40 border border-sky-500/40 space-y-1.5">
                <div className="font-bold text-sky-300 flex items-center gap-1.5 text-[11px] font-mono">
                  <Shield className="w-3.5 h-3.5 text-sky-400" />
                  Mentor Lead ({tel.mentor}): Empirical Verification Doctrine
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed italic">
                  &ldquo;Never guess; verify User (<span className="text-sky-300 font-mono">{tel.user}</span>), Host (
                  <span className="text-sky-300 font-mono">{tel.hostName}</span>), IP (
                  <span className="text-sky-300 font-mono">{tel.targetIp}</span>), and Timestamps before handing off
                  to {currentRole.title}.&rdquo;
                </p>
              </div>

              {/* Escalation Criteria & Comms Channel */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Handoff Criteria for {chapter.title}:</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                  {currentRole.criteria}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400">
                <span>Secure Comms: <strong className="text-white">{currentRole.channel}</strong></span>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => sound.playAlert()}
                  className="h-7 text-[11px] px-2.5 gap-1.5 border-sky-400/40 text-sky-300 hover:bg-sky-500/20"
                >
                  <Zap className="w-3 h-3 text-sky-400" />
                  Dispatch Handoff Signal
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ---------------------------------------------------------------------------
  // Engine 2: The 4-Stage Circular Operational Loop (renderProcessCycleVisual)
  // Concentric SVG rings with 4 orbital nodes: Monitor, Detect, Analyze (YOU), Respond
  // Center dark glass cube with SLA 15m
  // ---------------------------------------------------------------------------
  const renderProcessCycleVisual = () => {
    const tel = getContextualTelemetry();
    const cycleStages = [
      {
        id: 'monitor' as const,
        stageNum: '01',
        title: 'Monitor',
        label: 'Ingestion & Aggregation',
        cx: 170,
        cy: 50,
        desc: `Continuous streaming of Sysmon, Zeek, and Windows Security Event logs from sensor ${tel.sensorId}.`,
        objective: 'Ensure zero packet drop, index health at 100%, and parser normalization into ECS schema.',
        action: 'Ingest heartbeat confirmed across all enterprise endpoints.',
      },
      {
        id: 'detect' as const,
        stageNum: '02',
        title: 'Detect',
        label: 'Rules & Correlation',
        cx: 290,
        cy: 170,
        desc: `High-fidelity Sigma / SIEM correlation rule matched: Alert ID ${tel.alertId}.`,
        objective: 'Trigger threshold alarms, calculate confidence score, and open priority incident queue item.',
        action: 'Detection fired on suspicious execution pattern corresponding to MITRE ATT&CK technique.',
      },
      {
        id: 'analyze' as const,
        stageNum: '03',
        title: 'Analyze',
        label: 'L1 Analyst Triage (YOU)',
        cx: 170,
        cy: 290,
        desc: `Active triage by L1 Analyst on ${tel.hostName} (${tel.targetIp}) for user ${tel.user}.`,
        objective: 'Empirically verify 4 pillars: User, Host, IP, Timestamp. Rule out false positives.',
        action: 'YOU ARE HERE: Dissecting process command line arguments and confirming observable scope.',
      },
      {
        id: 'respond' as const,
        stageNum: '04',
        title: 'Respond',
        label: 'Containment & Resolution',
        cx: 50,
        cy: 170,
        desc: 'Enforce endpoint network isolation, revoke active Kerberos tokens, and complete incident closure note.',
        objective: 'Maintain strictly under 15-minute SLA target with complete auditable triage memo.',
        action: 'Execution blocked, artifact hashes submitted to MISP, root cause signed off.',
      },
    ];

    const currentStage = cycleStages.find((s) => s.id === selectedLoopStage) || cycleStages[2];

    return (
      <div className="space-y-4 pt-2">
        <div className="rounded-2xl p-4 sm:p-6 bg-[#090d16] text-slate-100 border border-sky-500/30 shadow-[0_0_25px_rgba(56,189,248,0.08)] space-y-5">
          {/* Engine Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-sky-400" />
              <span className="font-bold text-sm tracking-tight text-white font-mono uppercase">
                2. The 4-Stage Circular Operational Loop
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              <span>SLA Target: 15-Minute Operational Cycle</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* Concentric SVG Loop Canvas (340×340px) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-3 rounded-xl bg-[#0f172a]/70 border border-slate-800/80">
              <svg
                viewBox="0 0 340 340"
                className="w-full max-w-[340px] h-[340px] select-none"
                style={{ overflow: 'visible' }}
              >
                {/* Outer static guideline */}
                <circle cx="170" cy="170" r="120" fill="none" stroke="#1e293b" strokeWidth="1" />

                {/* Outer dotted track (cycle-spin-slow 40s) */}
                <circle
                  cx="170"
                  cy="170"
                  r="120"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                  className="cycle-spin-slow"
                />

                {/* High-intensity signal packet (cycle-spin-fast 8s) */}
                <circle
                  cx="170"
                  cy="170"
                  r="120"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeDasharray="25,400"
                  strokeLinecap="round"
                  className="cycle-spin-fast"
                />

                {/* Inner decorative guide ring */}
                <circle
                  cx="170"
                  cy="170"
                  r="72"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />

                {/* Center Dark Glass Cube (SLA 15m) */}
                <g className="cursor-default">
                  <rect
                    x="115"
                    y="142"
                    width="110"
                    height="56"
                    rx="10"
                    fill="#090d16"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                    style={{ filter: 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.25))' }}
                  />
                  <text
                    x="170"
                    y="166"
                    textAnchor="middle"
                    fill="#38bdf8"
                    fontSize="13"
                    fontWeight="800"
                    fontFamily="monospace"
                  >
                    SLA 15m
                  </text>
                  <text
                    x="170"
                    y="183"
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="8.5"
                    fontWeight="600"
                    fontFamily="monospace"
                  >
                    TARGET LOOP
                  </text>
                </g>

                {/* 4 Orbital Stage Nodes */}
                {cycleStages.map((s) => {
                  const isSelected = selectedLoopStage === s.id;
                  const isAnalyze = s.id === 'analyze';

                  return (
                    <g
                      key={`cycle-${s.id}`}
                      className="cursor-pointer transition-transform hover:scale-105"
                      onClick={() => {
                        sound.playClick();
                        setSelectedLoopStage(s.id);
                      }}
                    >
                      {/* Pulse aura for Analyze (YOU ARE HERE) */}
                      {isAnalyze && (
                        <circle
                          cx={s.cx}
                          cy={s.cy}
                          r="28"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="1.5"
                          strokeOpacity="0.4"
                          className="pulse-cyan-glow"
                        />
                      )}

                      <circle
                        cx={s.cx}
                        cy={s.cy}
                        r="21"
                        fill={isSelected ? '#1e293b' : '#0f172a'}
                        stroke={isSelected ? '#38bdf8' : isAnalyze ? '#38bdf8' : '#475569'}
                        strokeWidth={isSelected ? '2.5' : '1.5'}
                        style={
                          isSelected
                            ? { filter: 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.8))' }
                            : {}
                        }
                      />

                      <text
                        x={s.cx}
                        y={s.cy - 1}
                        textAnchor="middle"
                        fill={isSelected ? '#38bdf8' : '#e2e8f0'}
                        fontSize="8.5"
                        fontWeight="800"
                        fontFamily="monospace"
                      >
                        {s.stageNum}
                      </text>
                      <text
                        x={s.cx}
                        y={s.cy + 9}
                        textAnchor="middle"
                        fill={isSelected ? '#38bdf8' : '#94a3b8'}
                        fontSize="7"
                        fontWeight="700"
                        fontFamily="monospace"
                      >
                        {s.title.slice(0, 4).toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="text-[10px] text-slate-400 font-mono text-center pt-2">
                Click any stage orbital node to inspect operational criteria
              </div>
            </div>

            {/* Loop Stage Operations Console */}
            <div className="lg:col-span-6 space-y-3.5 p-4 rounded-xl bg-[#0f172a]/90 border border-sky-500/30 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div>
                  <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider block">
                    Operational Stage #{currentStage.stageNum}
                  </span>
                  <span className="font-bold text-sm text-white">{currentStage.title}: {currentStage.label}</span>
                </div>
                <Badge className="bg-sky-500/20 text-sky-300 border border-sky-400/40 text-[10px] font-mono">
                  SLA Target: 15m
                </Badge>
              </div>

              <p className="text-slate-300 leading-relaxed text-xs">{currentStage.desc}</p>

              {/* Core Doctrine Callout */}
              <div className="p-3 rounded-lg bg-slate-900 border border-sky-500/30 space-y-1">
                <div className="font-bold text-sky-300 flex items-center gap-1.5 text-[11px] font-mono">
                  <Activity className="w-3.5 h-3.5 text-sky-400" />
                  Stage Objective for {chapter.title}
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">{currentStage.objective}</p>
              </div>

              {/* Live Status Checklist */}
              <div className="space-y-1.5 pt-1 font-mono text-[11px]">
                <div className="text-[10px] text-slate-400 uppercase">Verification Verification Items:</div>
                <div className="p-2.5 rounded bg-black/60 border border-slate-800 space-y-1 text-slate-300">
                  <div className="text-emerald-400">✓ Ingestion verified from {tel.sensorId}</div>
                  <div className="text-emerald-400">✓ Correlation trigger: {tel.alertId}</div>
                  <div className="text-sky-400 font-bold">⚡ {currentStage.action}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400">
                <span>Active Cycle Timer: <strong className="text-emerald-400">{tel.slaRemaining} remaining</strong></span>
                <span className="text-sky-300">{selectedLoopStage === 'analyze' ? '★ Active Analyst Node' : 'Sequential Pipeline'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ---------------------------------------------------------------------------
  // Engine 3: Tool Ecosystem & Sensor Grid (renderTechEcosystemVisual)
  // Two-tier card: Upper monitored host card, lower 2×2 button grid (SIEM, EDR, Network, Firewall)
  // Active Telemetry Payload Box with JSON snippets
  // ---------------------------------------------------------------------------
  const renderTechEcosystemVisual = () => {
    const tel = getContextualTelemetry();
    const sensorTools = [
      {
        id: 'siem' as const,
        name: 'SIEM Console',
        provider: 'Elastic / Splunk Cluster',
        icon: <Database className="w-4 h-4" />,
        query: `index=sec_ops host.name="${tel.hostName}" | stats count by event.action`,
        json: {
          "@timestamp": tel.timestamp,
          "event.dataset": "endpoint.process_launch",
          "host.name": tel.hostName,
          "host.ip": tel.targetIp,
          "user.name": "b_sharma",
          "process.name": "powershell.exe",
          "process.command_line": `powershell.exe -NoP -NonI -W Hidden -Enc SQBFAFgA...`,
          "rule.name": `${chapter.title} Suspicious Execution`,
          "alert.severity": "HIGH",
        },
      },
      {
        id: 'edr' as const,
        name: 'EDR Telemetry',
        provider: 'CrowdStrike Falcon / Defender',
        icon: <Cpu className="w-4 h-4" />,
        query: `aid="${tel.hostName}" TargetProcess="powershell.exe" | head 1`,
        json: {
          "@timestamp": tel.timestamp,
          "agent.id": "CS-FALCON-BLR-883",
          "agent.status": "ACTIVE_HOOKED",
          "process.parent.name": "winword.exe",
          "process.pid": 4820,
          "process.ppid": 1944,
          "file.hash.sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          "mitre.technique": "T1059.001 (PowerShell)",
          "action": "TELEMETRY_LOGGED",
        },
      },
      {
        id: 'network' as const,
        name: 'Network TAP',
        provider: 'Zeek / Suricata Sensor',
        icon: <Network className="w-4 h-4" />,
        query: `source.ip == ${tel.targetIp} && destination.port == 443`,
        json: {
          "@timestamp": tel.timestamp,
          "sensor.id": tel.sensorId,
          "source.ip": tel.targetIp,
          "source.port": 54210,
          "destination.ip": tel.sourceIp,
          "destination.port": 443,
          "network.transport": "TCP",
          "tls.ja3": "771,4865-4866-4867,0-23-65281-10-11-35-16-5-13-18-51-45-43-27-21,29-23-24,0",
          "flow.bytes": 14208,
        },
      },
      {
        id: 'firewall' as const,
        name: 'Perimeter FW',
        provider: 'Palo Alto / Fortinet Gateway',
        icon: <Shield className="w-4 h-4" />,
        query: `src=${tel.targetIp} rule="ALLOW_SECURE_WEB"`,
        json: {
          "@timestamp": tel.timestamp,
          "firewall.id": "CDAC-EDGE-FW-01",
          "action": "ALLOWED",
          "zone.source": "TRUST_INTERNAL",
          "zone.destination": "UNTRUST_WAN",
          "protocol": "TCP:443 (SSL/TLS)",
          "threat.category": "SUSPICIOUS_UNRATED_DESTINATION",
          "session.id": "FW-SESS-99412",
        },
      },
    ];

    const activeTool = sensorTools.find((t) => t.id === selectedSensorTool) || sensorTools[0];

    return (
      <div className="space-y-4 pt-2">
        <div className="rounded-2xl p-4 sm:p-6 bg-[#090d16] text-slate-100 border border-sky-500/30 shadow-[0_0_25px_rgba(56,189,248,0.08)] space-y-4">
          {/* Engine Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-sky-400" />
              <span className="font-bold text-sm tracking-tight text-white font-mono uppercase">
                3. Tool Ecosystem & Sensor Grid
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sensors Online: 4 Feeds Aggregated</span>
            </div>
          </div>

          {/* Upper Section: Monitored Host Card */}
          <div className="p-4 rounded-xl bg-[#0f172a]/90 border border-sky-500/40 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-mono text-xs font-bold text-white">
                  Windows Endpoint {tel.hostName} - {tel.targetIp}
                </span>
              </div>
              <Badge className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono">
                Threat Level: HIGH INVESTIGATION
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400">Host Name:</div>
                <div className="font-bold text-sky-300 mt-0.5 truncate">{tel.hostName}</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400">IPv4 Address:</div>
                <div className="font-bold text-emerald-400 mt-0.5 truncate">{tel.targetIp}</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400">Logged User:</div>
                <div className="font-bold text-amber-300 mt-0.5 truncate">{tel.user}</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400">Agent Status:</div>
                <div className="font-bold text-slate-200 mt-0.5 truncate">Active (Heartbeat 2s)</div>
              </div>
            </div>
          </div>

          {/* Lower Section: 2×2 Button Grid */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>Select Sensor Telemetry Layer:</span>
              <span className="text-[11px] text-sky-400">Click to switch raw payload</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {sensorTools.map((t) => {
                const isSelected = selectedSensorTool === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setSelectedSensorTool(t.id);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-sky-950/60 border-sky-400 text-white shadow-[0_0_15px_rgba(56,189,248,0.3)] ring-1 ring-sky-400'
                        : 'bg-[#0f172a]/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-[#0f172a]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-800 text-slate-400'}`}>
                        {t.icon}
                      </div>
                      <div className="font-bold text-xs truncate">{t.name}</div>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-1 truncate">{t.provider}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Telemetry Payload Box */}
          <div className="p-4 rounded-xl bg-black/80 border border-sky-500/40 space-y-2.5 font-mono">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2 text-xs">
              <div className="flex items-center gap-2 text-sky-300">
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-bold">Active Telemetry Stream: {activeTool.name}</span>
              </div>
              <span className="text-[10px] text-slate-400">QUERY: {activeTool.query}</span>
            </div>

            <pre className="p-3 rounded-lg bg-black text-emerald-400 text-xs overflow-x-auto scrollbar-thin max-h-48 leading-relaxed">
              {JSON.stringify(activeTool.json, null, 2)}
            </pre>

            {/* Field-Value Observables Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px]">
              <span className="text-slate-400">Extracted Observables:</span>
              <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-500/40 text-sky-300">
                host: {tel.hostName}
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                ip: {tel.targetIp}
              </span>
              <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-500/40 text-purple-300">
                rule: {chapter.title}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ---------------------------------------------------------------------------
  // Engine 4: 6-Stage Telemetry Conduit (renderDataFlow)
  // 6 horizontal pipeline cards with animated connecting SVG conduit line
  // Stage 04 displays pulse-alert-node, Stage 05 displays YOU (L1) in cyan
  // ---------------------------------------------------------------------------
  const renderDataFlow = () => {
    const tel = getContextualTelemetry();
    const stages = [
      {
        idx: 0,
        stage: 'Stage 01',
        title: 'Sources',
        subtitle: 'Endpoints & TAP',
        pills: ['Sysmon', 'Zeek TAP', 'Winlogbeat', 'Firewall'],
        desc: `Raw sensor agents active on ${tel.hostName} and network edge capture packets and OS events.`,
        dataOut: 'Raw syslog UDP / WinEvent XML packets',
      },
      {
        idx: 1,
        stage: 'Stage 02',
        title: 'Raw Data',
        subtitle: 'Pipeline Ingestion',
        pills: ['Kafka Broker', 'Logstash', 'ECS Normalizer'],
        desc: 'Log broker aggregates streaming events, parses schema, and attaches geo/time metadata.',
        dataOut: 'Normalized Elastic Common Schema (ECS) JSON stream',
      },
      {
        idx: 2,
        stage: 'Stage 03',
        title: 'Detection',
        subtitle: 'Correlation Engines',
        pills: ['Sigma Rules', 'Splunk Search', 'Elastic ML'],
        desc: `Rule evaluation matching high-severity observable patterns on ${tel.targetIp}.`,
        dataOut: `Trigger: ${tel.alertId} (Severity 3 - High)`,
      },
      {
        idx: 3,
        stage: 'Stage 04',
        title: 'Alert Queue',
        subtitle: 'Incident Priority',
        isAlert: true,
        pills: ['Prioritized Ticket', 'SLA Clock 15m', 'PagerDuty'],
        desc: 'Incident management assigns case to L1 tier queue with 15-minute response countdown.',
        dataOut: 'Assigned to active L1 analyst desk',
      },
      {
        idx: 4,
        stage: 'Stage 05',
        title: 'YOU (L1)',
        subtitle: 'Analyst Triage',
        isAnalyst: true,
        pills: ['Observable Check', 'Empirical Rigor', 'Mentor Handoff'],
        desc: `YOU ARE HERE: You empirically verify User (${tel.user}), Host (${tel.hostName}), and IP (${tel.targetIp}).`,
        dataOut: 'Triage Memo & Escalation Recommendation',
      },
      {
        idx: 5,
        stage: 'Stage 06',
        title: 'Action',
        subtitle: 'Contain & Close',
        pills: ['Host Isolation', 'Token Revocation', 'Root Cause Memo'],
        desc: 'Playbook execution contains threat, revokes tokens, and closes case with signed resolution.',
        dataOut: 'Case Resolved: Threat Neutralized',
      },
    ];

    const activeStage = stages[selectedConduitStage] || stages[4];

    return (
      <div className="space-y-4 pt-2">
        <div className="rounded-2xl p-4 sm:p-6 bg-[#090d16] text-slate-100 border border-sky-500/30 shadow-[0_0_25px_rgba(56,189,248,0.08)] space-y-5">
          {/* Engine Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-sky-400" />
              <span className="font-bold text-sm tracking-tight text-white font-mono uppercase">
                4. 6-Stage Telemetry Conduit
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>Pipeline Latency: ~180ms End-to-End</span>
            </div>
          </div>

          {/* 6 Horizontal Pipeline Cards */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2.5">
            {stages.map((st) => {
              const isSelected = selectedConduitStage === st.idx;
              const isAlert = st.isAlert;
              const isAnalyst = st.isAnalyst;

              return (
                <div
                  key={st.idx}
                  onClick={() => {
                    sound.playClick();
                    setSelectedConduitStage(st.idx);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                    isAlert ? 'pulse-alert-node border-rose-500 bg-rose-950/30' : ''
                  } ${
                    isAnalyst ? 'pulse-cyan-glow border-sky-400 bg-sky-950/30 ring-1 ring-sky-400' : ''
                  } ${
                    isSelected
                      ? 'border-sky-400 bg-sky-950/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                      : !isAlert && !isAnalyst
                      ? 'border-slate-800 bg-[#0f172a]/60 hover:border-slate-700'
                      : ''
                  }`}
                >
                  <div className="text-[9px] font-mono uppercase tracking-wider text-slate-400">{st.stage}</div>
                  <div
                    className={`font-bold text-xs mt-0.5 ${
                      isAlert ? 'text-rose-400' : isAnalyst ? 'text-sky-300' : 'text-white'
                    }`}
                  >
                    {st.title}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">{st.subtitle}</div>
                </div>
              );
            })}
          </div>

          {/* Animated Connecting SVG Conduit Stroke */}
          <div className="relative w-full h-4 overflow-hidden my-1">
            <svg viewBox="0 0 1000 16" className="w-full h-full preserve-3d" preserveAspectRatio="none">
              {/* Background trace line */}
              <line x1="0" y1="8" x2="1000" y2="8" stroke="#1e293b" strokeWidth="2" />
              {/* High-speed animated flow packet stroke */}
              <line
                x1="0"
                y1="8"
                x2="1000"
                y2="8"
                stroke="#38bdf8"
                strokeWidth="3.5"
                strokeDasharray="12 180"
                className="animated-flow-conduit"
              />
            </svg>
          </div>

          {/* Detailed Callout Inspection Box for Active Stage */}
          <div className="p-4 rounded-xl bg-[#0f172a]/90 border border-sky-500/30 space-y-3 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <div>
                <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider block">
                  Conduit Inspection: {activeStage.stage}
                </span>
                <span className="font-bold text-sm text-white">
                  {activeStage.title} - {activeStage.subtitle}
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {activeStage.pills.map((pill, pIdx) => (
                  <Badge
                    key={pIdx}
                    className="bg-slate-800 text-sky-300 border border-slate-700 text-[10px] font-mono"
                  >
                    {pill}
                  </Badge>
                ))}
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed text-xs">{activeStage.desc}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-[11px] font-mono">
              <div className="p-2.5 rounded bg-black/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Data Flow Output:</span>
                <span className="text-emerald-400 font-bold">{activeStage.dataOut}</span>
              </div>
              <div className="p-2.5 rounded bg-black/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Empirical Checklist:</span>
                <span className="text-sky-300 font-bold">Never guess; verify User, Host, IP, Timestamps</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ---------------------------------------------------------------------------
  // Master Visual Format Selector
  // Features interactive mode switcher tabs and renders the 4 HUD engines
  // ---------------------------------------------------------------------------
  const renderVisualFormat = () => {
    const steps = chapter.section2_visual.steps || [];

    return (
      <div className="space-y-4 pt-2">
        {/* Top HUD Simulation Mode Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl bg-[#090d16]/95 border border-sky-500/30 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono text-sky-400 font-bold px-2 py-1 uppercase tracking-wider">
              Simulation Mode:
            </span>

            <Button
              type="button"
              size="sm"
              variant={activeSimMode === 'conduit' ? 'default' : 'ghost'}
              onClick={() => {
                sound.playClick();
                setActiveSimMode('conduit');
              }}
              className={`h-7 text-[11px] px-2.5 gap-1.5 rounded-lg font-mono ${
                activeSimMode === 'conduit'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>Conduit (6-Stage)</span>
            </Button>

            <Button
              type="button"
              size="sm"
              variant={activeSimMode === 'cycle' ? 'default' : 'ghost'}
              onClick={() => {
                sound.playClick();
                setActiveSimMode('cycle');
              }}
              className={`h-7 text-[11px] px-2.5 gap-1.5 rounded-lg font-mono ${
                activeSimMode === 'cycle'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Compass className="w-3 h-3" />
              <span>Operational Loop</span>
            </Button>

            <Button
              type="button"
              size="sm"
              variant={activeSimMode === 'grid' ? 'default' : 'ghost'}
              onClick={() => {
                sound.playClick();
                setActiveSimMode('grid');
              }}
              className={`h-7 text-[11px] px-2.5 gap-1.5 rounded-lg font-mono ${
                activeSimMode === 'grid'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Server className="w-3 h-3" />
              <span>Sensor Grid</span>
            </Button>

            <Button
              type="button"
              size="sm"
              variant={activeSimMode === 'team' ? 'default' : 'ghost'}
              onClick={() => {
                sound.playClick();
                setActiveSimMode('team');
              }}
              className={`h-7 text-[11px] px-2.5 gap-1.5 rounded-lg font-mono ${
                activeSimMode === 'team'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Share2 className="w-3 h-3" />
              <span>SOC Team Map</span>
            </Button>
          </div>

          {/* Sound FX HUD Toggle */}
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleToggleSound}
            className={`h-7 text-[11px] px-2.5 gap-1.5 rounded-lg font-mono border-slate-700 ${
              isSoundMuted ? 'text-slate-400 bg-slate-900/60' : 'text-sky-300 bg-sky-950/40 border-sky-500/40'
            }`}
            title="Toggle procedural UI sound effects"
          >
            {isSoundMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 text-sky-400" />}
            <span>{isSoundMuted ? 'Audio Muted' : 'Sound FX: ON'}</span>
          </Button>
        </div>

        {/* Dynamic Engine View */}
        {activeSimMode === 'conduit' && renderDataFlow()}
        {activeSimMode === 'cycle' && renderProcessCycleVisual()}
        {activeSimMode === 'grid' && renderTechEcosystemVisual()}
        {activeSimMode === 'team' && renderTeamVisual()}

        {/* Step-by-Step Scenario Timeline Accordion (Preserves chapter-specific steps) */}
        {steps.length > 0 && (
          <div className="p-4 rounded-2xl bg-card border border-border/80 space-y-3 mt-4">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground border-b border-border/50 pb-2">
              <span className="font-bold text-foreground flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-purple-500" />
                Chapter Telemetry Scenario Walkthrough ({steps.length} Steps)
              </span>
              <span>Click step to focus</span>
            </div>

            <div className="space-y-2">
              {steps.map((st, idx) => {
                const isActive = activeVisualStep === idx;
                return (
                  <div
                    key={st.id || idx}
                    onClick={() => {
                      sound.playClick();
                      setActiveVisualStep(idx);
                    }}
                    className={`p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'border-purple-500 bg-purple-500/10 ring-1 ring-purple-500/40 text-foreground'
                        : 'border-border bg-muted/20 text-muted-foreground hover:bg-muted/40'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-foreground">
                      <span>Step #{idx + 1}: {st.title}</span>
                      <Badge variant="outline" className="text-[10px] font-mono border-purple-400/40 text-purple-600 dark:text-purple-300">
                        {st.stage}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{st.description}</p>
                    {st.telemetrySnippet && (
                      <div className="mt-1.5 p-2 rounded bg-black/80 text-emerald-400 font-mono text-[11px]">
                        {st.telemetrySnippet}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
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
            <span>Continue to Section 2: Animated Visual Story</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: ANIMATED VISUAL STORY (Borderless Stage Card with Replay & Audio)
      ========================================================================= */}
      <section
        id="section-demo"
        className={`relative rounded-3xl p-6 sm:p-9 md:p-10 min-h-[60vh] flex flex-col justify-between scroll-mt-24 transition-all duration-300 bg-card/95 dark:bg-card/25 backdrop-blur-2xl shadow-[0_4px_24px_rgba(15,23,42,0.06)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)] border border-border/80 dark:border-border/40 hover:border-border ${
          isVisualReplaying ? 'ring-2 ring-sky-500/50 scale-[0.998]' : ''
        } ${getSectionStyleClass(chapter.section2_visual.styleOverride)}`}
      >
        <div className="absolute top-0 left-10 right-10 h-1 bg-gradient-to-r from-transparent via-sky-500/30 to-transparent rounded-full pointer-events-none" />

        <div className="space-y-6">
          {/* Section 2 Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-xs ring-1 ring-sky-500/30">
                2
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
                  <Eye className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  Section 2: Animated Visual Story
                </h2>
                <p className="text-[11px] text-muted-foreground font-mono">Telemetry Flow & Dynamic Cyber Simulation</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={toggleSection2Audio}
                className="text-xs h-7 px-2.5 gap-1.5 rounded-lg border-sky-500/30 text-sky-600 dark:text-sky-300 hover:bg-sky-500/10 cursor-pointer"
                title="Play visual story narration"
              >
                {isPlayingSection2Audio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlayingSection2Audio ? 'Pause Audio' : 'Audio Narration'}</span>
              </Button>

              <Badge variant="outline" className="text-[10px] uppercase font-mono tracking-wider border-sky-500/30 text-sky-600 dark:text-sky-300">
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
              className="text-xs h-9 px-3.5 gap-1.5 rounded-xl border-sky-500/30 text-sky-600 dark:text-sky-300 hover:bg-sky-500/10 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Visual Story</span>
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
            <span>Section 2: Animated Visual Story</span>
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
