'use client';

import { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Eye,
  Radio,
  Sliders,
  Laptop,
  Maximize2,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { RealWorldToolScreen } from '@/components/learning/real-world-tool-screens';

export interface VisualStoryStep {
  id: number;
  stage: string;
  iconName: 'attacker' | 'endpoint' | 'server' | 'siem' | 'analyst';
  title: string;
  description: string;
  telemetrySnippet?: string;
  highlightText: string;
}

interface VisualStoryDemoProps {
  topicId?: string;
  title?: string;
  subtitle?: string;
  steps?: VisualStoryStep[];
}

const DEFAULT_STORY_STEPS: VisualStoryStep[] = [
  {
    id: 1,
    stage: '1. Ingestion',
    iconName: 'attacker',
    title: 'Incoming Alert Enters Queue',
    description: 'Security telemetry triggers alert on workstation FIN-PC-04, appearing in the centralized SOC triage queue.',
    telemetrySnippet: 'QUEUE: FinCorp Triage Queue | Alert: Multiple Failed Logins | Entity: FIN-PC-04 | Status: Unassigned',
    highlightText: 'The alert queue is the shared operational entry point for the entire SOC team.',
  },
  {
    id: 2,
    stage: '2. Qualification',
    iconName: 'endpoint',
    title: 'L1 Analyst Claims Alert & Validates Activity',
    description: 'L1 Analyst claims the alert, verifies the affected user (Finance01) and workstation (FIN-PC-04), and checks for active anomalies.',
    telemetrySnippet: 'L1 STATUS: In Review by L1 | Target: Finance01 | Source IP: 10.10.20.15 | SLA Timer: 14m Remaining',
    highlightText: 'L1 analysts handle rapid first-line qualification, entity identification, and initial triage.',
  },
  {
    id: 3,
    stage: '3. Investigation',
    iconName: 'server',
    title: 'L2 Analyst Investigates Escalated Incidents',
    description: 'When alerts show signs of compromise, L2 conducts deep investigation, examines host telemetry, and isolates affected systems.',
    telemetrySnippet: 'L2 ACTION: Deep Host Telemetry Review | Active Containment | Root-Cause Trace',
    highlightText: 'L2 incident responders take over complex investigations requiring host-level containment and remediation.',
  },
  {
    id: 4,
    stage: '4. Threat Hunting',
    iconName: 'siem',
    title: 'L3 Senior Analyst Hunts Enterprise Threats',
    description: 'L3 hunts for stealthy adversary behavior, analyzes advanced threat patterns, and builds detection signatures across FinCorp.',
    telemetrySnippet: 'L3 SEARCH: Fleet-Wide IOC Sweep | YARA Signature Deployed | Behavioral Correlation',
    highlightText: 'L3 senior specialists proactively hunt for stealth threats that evade standard rule detections.',
  },
  {
    id: 5,
    stage: '5. Resolution',
    iconName: 'analyst',
    title: 'Case Record Documented & Resolved',
    description: 'All containment steps, root causes, and remediation guidance are recorded in the official audit ticket.',
    telemetrySnippet: 'CASE #2026-04 CLOSED | SLA Met: 100% | GPO Lockout Policy Updated | Workstation Clean',
    highlightText: 'Audit-ready documentation ensures enterprise accountability and prevents future attack recurrences.',
  },
];

export function VisualStoryDemo({
  topicId = 'topic-1-1',
  title = 'Visual Story Demo',
  subtitle = 'Watch how real-world SOC tools execute this workflow',
  steps = DEFAULT_STORY_STEPS,
}: VisualStoryDemoProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  // Auto-play by default like a video!
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  const baseSpeedMs = 4000;
  const currentIntervalMs = baseSpeedMs / speedMultiplier;
  const currentStep = steps[currentStepIndex] || steps[0];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            // Loop back to beginning for continuous video feel, or pause
            return 0;
          }
          return prev + 1;
        });
      }, currentIntervalMs);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length, currentIntervalMs]);

  // Simulated elapsed time formatting (e.g., 00:08 / 00:20)
  const totalSeconds = steps.length * 4;
  const currentSeconds = Math.min((currentStepIndex + 1) * 4, totalSeconds);
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="rounded-2xl border-2 border-primary/20 bg-card overflow-hidden shadow-sm">
      {/* 1. Modern Light-Theme Video Player Header */}
      <div className="p-3.5 sm:p-4 border-b bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-[10px] font-bold uppercase tracking-wider gap-1">
              <Eye className="w-3 h-3 text-primary animate-pulse" />
              2. Demo — Live Tool Video Walkthrough
            </Badge>
            <span className="text-xs text-muted-foreground font-mono">
              Stage {currentStepIndex + 1}/{steps.length}
            </span>
            <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              ● AUTO DEMO PLAYING
            </span>
          </div>
          <h3 className="text-base font-bold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>

        {/* Video Player Control Action Bar */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Play / Pause Toggle */}
          <Button
            variant={isPlaying ? 'secondary' : 'default'}
            size="sm"
            className="h-8 text-xs gap-1.5 font-bold shadow-xs"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play</span>
              </>
            )}
          </Button>

          {/* Speed Toggle (1x, 1.5x, 2x) */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs px-2 font-mono font-bold"
            onClick={() => {
              setSpeedMultiplier((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1));
            }}
            title="Change video playback speed"
          >
            {speedMultiplier}x
          </Button>

          {/* Replay Button */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs px-2 text-muted-foreground hover:text-foreground"
            onClick={() => {
              setCurrentStepIndex(0);
              setIsPlaying(true);
            }}
            title="Restart video from stage 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* 2. Simulated Real-World Tool Viewport (Clean Light Theme) */}
      <div className="p-4 sm:p-5 space-y-4 bg-slate-50/30">
        {/* Simulated Browser/Desktop Application Frame */}
        <div className="rounded-xl border border-slate-300/80 bg-white overflow-hidden shadow-xs">
          {/* Browser Title Bar */}
          <div className="bg-slate-100/90 border-b border-slate-200 px-3 py-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="px-3 py-1 rounded bg-white border border-slate-200 text-[11px] font-mono text-slate-700 flex items-center gap-1.5 shadow-2xs">
                <Laptop className="w-3 h-3 text-slate-400" />
                <span>https://soc-console.fincorp.internal/{topicId}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden sm:inline">LIVE SIMULATION STREAM (1080P)</span>
            </div>
          </div>

          {/* Tool Content Viewport */}
          <div className="p-4 sm:p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${topicId}-${currentStepIndex}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <RealWorldToolScreen topicId={topicId} stage={currentStepIndex + 1} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 3. Stage Narration Banner & Telemetry Snippet (Clean Light Theme) */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
              <span className="text-xs font-bold text-slate-900 font-mono uppercase tracking-wide">
                Stage {currentStepIndex + 1}: {currentStep.title}
              </span>
            </div>
            <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 text-[10px] font-mono">
              Phase {currentStepIndex + 1} of {steps.length}
            </Badge>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {currentStep.description}
          </p>

          {/* Clean Light-Theme Telemetry Code Box */}
          <div className="p-2.5 rounded-lg bg-slate-100 border border-slate-200 font-mono text-[11px] text-slate-800 overflow-x-auto whitespace-pre">
            {currentStep.telemetrySnippet || '// Live telemetry generated for this stage'}
          </div>
        </div>

        {/* 4. Video Scrubber & Chapter Bar */}
        <div className="space-y-2 pt-1">
          {/* Segmented Chapter Progress Bar */}
          <div className="flex items-center gap-1.5">
            {steps.map((st, idx) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  setCurrentStepIndex(idx);
                }}
                className={`h-2 flex-1 rounded-full transition-all cursor-pointer relative overflow-hidden ${
                  idx === currentStepIndex
                    ? 'bg-blue-600 ring-2 ring-blue-300'
                    : idx < currentStepIndex
                    ? 'bg-emerald-500'
                    : 'bg-slate-200 hover:bg-slate-300'
                }`}
                title={`Jump to ${st.stage}`}
              />
            ))}
          </div>

          {/* Bottom Video Controls & Time Display */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCurrentStepIndex((prev) => Math.max(0, prev - 1));
              }}
              disabled={currentStepIndex === 0}
              className="h-7 text-xs gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Previous
            </Button>

            <span className="font-mono text-[11px] text-slate-600 font-medium">
              {formatTime(currentSeconds)} / {formatTime(totalSeconds)} • Stage {currentStepIndex + 1}: {currentStep.title}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
              }}
              disabled={currentStepIndex === steps.length - 1}
              className="h-7 text-xs gap-1"
            >
              Next
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
