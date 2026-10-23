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
  MonitorCheck,
  Server,
  Layers,
  Send,
  HardDrive,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

export interface DataFlowStep {
  id: number;
  timeWindow: string;
  name: string;
  stageName: string;
  mentor: string;
  color: string;
  badgeBg: string;
  borderColor: string;
  gradientBg: string;
  ticker: string;
  quote: string;
  stickers: {
    icon: React.ReactNode;
    label: string;
    sub: string;
    tag: string;
  }[];
}

const DATA_FLOW_STEPS: DataFlowStep[] = [
  {
    id: 1,
    timeWindow: 't = 0.00s',
    name: '1. Endpoint Sysmon Hook',
    stageName: 'Kernel Telemetry Capture',
    mentor: 'Rajesh Kumar (Senior Guide)',
    color: 'text-sky-700 dark:text-sky-400',
    badgeBg: 'bg-sky-500/15 text-sky-900 dark:text-sky-200 border-sky-400/40',
    borderColor: 'border-sky-300 dark:border-sky-800',
    gradientBg: 'from-sky-50/90 via-blue-50/40 to-slate-50 dark:from-sky-950/30 dark:via-blue-950/20 dark:to-slate-900/40',
    ticker: 'ENDPOINT HOOK: Event ID 1 Captured | PID 6104 (powershell.exe) spawned by PID 4820 (WINWORD.EXE)',
    quote: 'Rajesh: "The microsecond a process launches, kernel hooks record the execution with full PID and parent details in local memory."',
    stickers: [
      {
        icon: <Cpu className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
        label: 'Kernel Driver Hook',
        sub: 'Sysmon driver intercepts CreateProcess API call instantly',
        tag: 'OS Kernel',
      },
      {
        icon: <Terminal className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
        label: 'Event ID 1 Generated',
        sub: 'Process Creation record written to local event log buffer',
        tag: 'Telemetry Event',
      },
      {
        icon: <HardDrive className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
        label: 'Parent-Child Linkage',
        sub: 'Preserves hash, user SID, command line, and working directory',
        tag: 'Forensic Context',
      },
      {
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        label: 'Tamper Protection',
        sub: 'Driver prevents malware from deleting memory event before flush',
        tag: 'Integrity Shield',
      },
    ],
  },
  {
    id: 2,
    timeWindow: 't = 0.15s',
    name: '2. Universal Forwarder',
    stageName: 'Encrypted Log Transmission',
    mentor: 'Rajesh Kumar (Senior Guide)',
    color: 'text-indigo-700 dark:text-indigo-400',
    badgeBg: 'bg-indigo-500/15 text-indigo-900 dark:text-indigo-200 border-indigo-400/40',
    borderColor: 'border-indigo-300 dark:border-indigo-800',
    gradientBg: 'from-indigo-50/90 via-purple-50/40 to-slate-50 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-slate-900/40',
    ticker: 'FORWARDER PIPELINE: Port 9997 TLS Tunnel Active | 150ms Ingress Latency | Batch Size: 64KB Compressed',
    quote: 'Rajesh: "The Universal Forwarder acts like an armored courier truck. It compresses and encrypts logs to SIEM port 9997 in 150ms."',
    stickers: [
      {
        icon: <Send className="w-5 h-5 text-indigo-600 dark:text-indigo-400 animate-pulse" />,
        label: 'TLS Tunnel Port 9997',
        sub: 'Secure mutual-TLS connection to central enterprise indexer',
        tag: 'Network Transit',
      },
      {
        icon: <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
        label: 'Real-Time Streaming',
        sub: '150 millisecond transit time from Boston HQ endpoint',
        tag: 'Low Latency',
      },
      {
        icon: <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
        label: 'Compression Buffer',
        sub: 'Reduces network bandwidth by 85% using gzip stream blocks',
        tag: 'Bandwidth Opt',
      },
      {
        icon: <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        label: 'Spool Queue Memory',
        sub: 'Zero log loss even if network drops; caches to local disk',
        tag: 'Reliability',
      },
    ],
  },
  {
    id: 3,
    timeWindow: 't = 0.80s',
    name: '3. Indexer Storage & Parsing',
    stageName: 'Immutable Index Pipeline',
    mentor: 'Aditya Deshmukh (Lead Hunter)',
    color: 'text-emerald-700 dark:text-emerald-400',
    badgeBg: 'bg-emerald-500/15 text-emerald-900 dark:text-emerald-200 border-emerald-400/40',
    borderColor: 'border-emerald-300 dark:border-emerald-800',
    gradientBg: 'from-emerald-50/90 via-teal-50/40 to-slate-50 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-slate-900/40',
    ticker: 'INDEXER PIPELINE: Raw Text Parsed into Structured Fields | Written to Hot Bucket: index=endpoint_logs',
    quote: 'Aditya: "The indexer cuts raw text into searchable fields, generates bloom filters, and commits the record to an immutable hot bucket."',
    stickers: [
      {
        icon: <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        label: 'Hot Bucket Storage',
        sub: 'Committed to index=endpoint_logs for instant sub-second lookup',
        tag: 'Storage Tier',
      },
      {
        icon: <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        label: 'Field Extraction',
        sub: 'Regex automatically parses host, user, ProcessId, and CommandLine',
        tag: 'Field Parser',
      },
      {
        icon: <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
        label: '_time Precision Stamp',
        sub: 'Millisecond accurate UTC index timestamp assigned',
        tag: 'Time Authority',
      },
      {
        icon: <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        label: 'Write-Once Audit Seal',
        sub: 'Compliant WORM storage prevents attacker log tampering',
        tag: 'Audit Integrity',
      },
    ],
  },
  {
    id: 4,
    timeWindow: 't = 1.20s',
    name: '4. CIM Schema Normalization',
    stageName: 'Universal Field Mapping',
    mentor: 'Priya Sharma (Senior IR)',
    color: 'text-purple-700 dark:text-purple-400',
    badgeBg: 'bg-purple-500/15 text-purple-900 dark:text-purple-200 border-purple-400/40',
    borderColor: 'border-purple-300 dark:border-purple-800',
    gradientBg: 'from-purple-50/90 via-violet-50/40 to-slate-50 dark:from-purple-950/30 dark:via-violet-950/20 dark:to-slate-900/40',
    ticker: 'CIM NORMALIZATION: Endpoint Data Model Accelerated | Target: Endpoint.Processes | user=mchen dest=FIN-047',
    quote: 'Priya: "Every OS uses different field names. CIM maps them to standard terms like user and dest so one rule detects attacks everywhere."',
    stickers: [
      {
        icon: <Workflow className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
        label: 'CIM Data Model Map',
        sub: 'Mapped to Endpoint.Processes data model schema',
        tag: 'Schema Normalizer',
      },
      {
        icon: <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
        label: 'Universal Field Aliases',
        sub: 'AccountName → user | ComputerName → dest | NewProcess → process',
        tag: 'Field Aliasing',
      },
      {
        icon: <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
        label: 'DMA Acceleration',
        sub: 'Accelerated summaries speed up rule queries by 100x',
        tag: 'Search Boost',
      },
      {
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        label: 'Cross-Platform Ready',
        sub: 'Same query detects identical behavior on Windows, Mac, or Linux',
        tag: 'Interoperable',
      },
    ],
  },
  {
    id: 5,
    timeWindow: 't = 1.95s',
    name: '5. Correlation Rule Trigger',
    stageName: 'Detection Logic Match',
    mentor: 'Rajesh Kumar (Senior Guide)',
    color: 'text-amber-700 dark:text-amber-400',
    badgeBg: 'bg-amber-500/15 text-amber-900 dark:text-amber-200 border-amber-400/40',
    borderColor: 'border-amber-300 dark:border-amber-800',
    gradientBg: 'from-amber-50/90 via-orange-50/40 to-slate-50 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-slate-900/40',
    ticker: 'RULE MATCHED: Suspicious Office Child Process | Threshold Exceeded | Severity: HIGH | Entity Correlated',
    quote: 'Rajesh: "The SIEM rule engine evaluates incoming streams against attack patterns. An office program launching PowerShell triggers an immediate match!"',
    stickers: [
      {
        icon: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
        label: 'Detection Logic Match',
        sub: 'parent_process=WINWORD.EXE AND process=powershell.exe matched',
        tag: 'Rule Evaluation',
      },
      {
        icon: <Activity className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
        label: 'Sliding Window Check',
        sub: 'Temporal correlation evaluates 5-minute event sequence',
        tag: 'Time Window',
      },
      {
        icon: <Shield className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
        label: 'Severity Scored: HIGH',
        sub: 'Scored 85/100 based on sensitive finance host context',
        tag: 'Risk Scoring',
      },
      {
        icon: <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
        label: 'Alert Entity Packaging',
        sub: 'Bundles process tree, network connection, and user profile',
        tag: 'Context Pack',
      },
    ],
  },
  {
    id: 6,
    timeWindow: 't = 2.40s',
    name: '6. Analyst Queue Ingress',
    stageName: 'Triage Ownership & SLA',
    mentor: 'Rajesh Kumar (Shift Mentor)',
    color: 'text-rose-700 dark:text-rose-400',
    badgeBg: 'bg-rose-500/15 text-rose-900 dark:text-rose-200 border-rose-400/40',
    borderColor: 'border-rose-300 dark:border-rose-800',
    gradientBg: 'from-rose-50/90 via-red-50/40 to-slate-50 dark:from-rose-950/30 dark:via-red-950/20 dark:to-slate-900/40',
    ticker: 'QUEUE INGRESS COMPLETE: Alert SEC-2026-0412 Landed on L1 Console | Total Pipeline Latency: 2.4 seconds!',
    quote: 'Rajesh: "In under 3 seconds from the attacker pressing enter, the alert flashes in your triage queue. You take command from here!"',
    stickers: [
      {
        icon: <Radio className="w-5 h-5 text-rose-600 dark:text-rose-400 animate-pulse" />,
        label: 'Alert SEC-2026-0412',
        sub: 'Appears in Tier 1 Ingress Queue ready for immediate claim',
        tag: 'Live Ticket',
      },
      {
        icon: <Clock className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
        label: '15-Minute SLA Active',
        sub: 'Triage countdown started; analyst response expected',
        tag: 'SLA Meter',
      },
      {
        icon: <MonitorCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        label: 'End-to-End Latency',
        sub: 'Raw event to analyst queue in exactly 2.40 seconds',
        tag: 'Speed Metric',
      },
      {
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        label: 'Ready for Investigation',
        sub: 'L1 analyst clicks Claim to inspect the 5 evidence facts',
        tag: 'Analyst Action',
      },
    ],
  },
];

interface UnifiedDataFlowSimulatorProps {
  onStepChange?: (stepId: number) => void;
}

export function UnifiedDataFlowSimulator({ onStepChange }: UnifiedDataFlowSimulatorProps) {
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  const currentStep = DATA_FLOW_STEPS.find((s) => s.id === activeStepId) || DATA_FLOW_STEPS[0];

  useEffect(() => {
    if (!isPlaying) {
      setProgressPercent(0);
      return;
    }

    const duration = 6000;
    const intervalTime = 50;
    const increment = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 100) {
          setActiveStepId((curr) => {
            const next = curr >= DATA_FLOW_STEPS.length ? 1 : curr + 1;
            if (onStepChange) onStepChange(next);
            return next;
          });
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, activeStepId, onStepChange]);

  const handleSelectStep = (id: number) => {
    setActiveStepId(id);
    setProgressPercent(0);
    if (onStepChange) onStepChange(id);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setActiveStepId(1);
    setProgressPercent(0);
    setIsPlaying(true);
    if (onStepChange) onStepChange(1);
  };

  return (
    <div className="glass-card glass-glossy rounded-3xl border-2 border-white/70 dark:border-white/10 p-4 sm:p-6 shadow-xl backdrop-blur-3xl overflow-hidden relative transition-all duration-300">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-sky-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* TOP BAR VIDEO CONSOLE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
            <Send className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-foreground tracking-tight">
                Log Telemetry Pipeline Simulator
              </span>
              <Badge variant="outline" className="text-[10px] bg-emerald-500/15 text-emerald-900 dark:text-emerald-200 border-emerald-400/40 font-bold py-0.5">
                {isPlaying ? '● Live Flow' : '❚❚ Paused'}
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground font-medium hidden sm:block">
              From Endpoint Sysmon to SIEM Queue in 2.4s • Auto-advancing animated packet pipeline
            </p>
          </div>
        </div>

        {/* Player Controls */}
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
            title="Restart Pipeline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* 6 PIPELINE STEP BUTTONS */}
      <div className="grid grid-cols-6 gap-1 sm:gap-2 my-3 p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-border/40">
        {DATA_FLOW_STEPS.map((s) => {
          const isActive = s.id === activeStepId;
          return (
            <button
              key={s.id}
              onClick={() => handleSelectStep(s.id)}
              className={`py-1.5 px-1 sm:px-2 rounded-xl text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center ${
                isActive
                  ? 'bg-card text-foreground font-black shadow-md border border-white/60 dark:border-white/10 scale-[1.02]'
                  : 'text-muted-foreground hover:text-foreground font-semibold hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <span className="text-[10px] sm:text-xs">Step {s.id}</span>
              <span className="text-[9px] sm:text-[10px] opacity-75 truncate max-w-full hidden md:block">
                {s.timeWindow}
              </span>
            </button>
          );
        })}
      </div>

      {/* CONTINUOUS PROGRESS SCRUBBER */}
      <div className="w-full h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-sky-500 via-primary to-rose-500 rounded-full transition-all duration-75"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* MAIN SINGLE VIDEO FRAME */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.id}
          initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`rounded-2xl border ${currentStep.borderColor} bg-gradient-to-br ${currentStep.gradientBg} p-4 sm:p-5 space-y-4 shadow-sm backdrop-blur-2xl transition-all`}
        >
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Badge className={currentStep.badgeBg}>
                  Step {currentStep.id} of 6 • {currentStep.timeWindow}
                </Badge>
                <h3 className={`font-black text-base sm:text-lg ${currentStep.color}`}>
                  {currentStep.name}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                Stage: <span className="text-foreground">{currentStep.stageName}</span>
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">
                Guide on Shift
              </span>
              <span className="text-xs font-extrabold text-foreground">
                {currentStep.mentor}
              </span>
            </div>
          </div>

          {/* STRICT 1-3 LINES DIALOGUE / MENTOR VOICE */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-card/85 dark:bg-card/50 border border-border/70 backdrop-blur-md shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed italic">
              {currentStep.quote}
            </p>
          </div>

          {/* 4 GRAPHICAL VECTOR STICKERS / PIPELINE CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {currentStep.stickers.map((stk, idx) => (
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
                {currentStep.ticker}
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  const next = currentStep.id >= DATA_FLOW_STEPS.length ? 1 : currentStep.id + 1;
                  handleSelectStep(next);
                }}
                className="h-6 px-2 text-[10px] font-bold text-primary hover:text-primary/90 hover:bg-primary/10 gap-1 rounded-lg"
              >
                <span>Step {currentStep.id < 6 ? currentStep.id + 1 : 1}</span>
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
