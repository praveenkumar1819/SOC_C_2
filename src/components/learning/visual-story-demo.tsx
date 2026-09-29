'use client';

import { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Eye,
  ShieldAlert,
  Server,
  Terminal,
  Activity,
  UserCheck,
  Radio,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { TopicScenarioVector } from '@/components/learning/topic-vector-graphics';

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
    stage: '1. Adversary Action',
    iconName: 'attacker',
    title: 'Authentication Spray & Brute-Force Attempt',
    description: 'Adversary launches automated credential attempts against external perimeter gateway from IP 198.51.100.42.',
    telemetrySnippet: 'POST /api/v1/auth/login HTTP/1.1\nHost: vpn.fincorp.internal\nUser-Agent: Hydra/9.4 (Credential Spray)\nPayload: j.smith : Winter2024!',
    highlightText: 'Automated attempts trigger repeated invalid credential responses.',
  },
  {
    id: 2,
    stage: '2. Local Endpoint Telemetry',
    iconName: 'endpoint',
    title: 'Windows Security Event Generated',
    description: 'Target Domain Controller immediately logs an audit failure in the Security Event Log.',
    telemetrySnippet: 'Event ID: 4625\nStatus: 0xC000006D (Bad User Name or Password)\nSubStatus: 0xC000006A (Bad Password)\nTargetUserName: j.smith\nWorkstationName: EXT-GW01\nSourceNetworkAddress: 198.51.100.42',
    highlightText: 'Windows Security Event 4625 records the exact failed credentials and remote network IP.',
  },
  {
    id: 3,
    stage: '3. SIEM Ingestion & Normalization',
    iconName: 'siem',
    title: 'SIEM Parses & Correlates Events',
    description: 'SIEM log forwarder collects the event, parses fields into the common schema, and evaluates active detection rules.',
    telemetrySnippet: 'Normalized Event:\nsource.ip = 198.51.100.42 (External - Russia)\nuser.name = j.smith\nevent.action = logon-failed\nevent.count_10m = 48 attempts across 12 distinct users',
    highlightText: 'Correlation rule: Threshold exceeded (48 failures within 10 minutes from single IP).',
  },
  {
    id: 4,
    stage: '4. Detection & Alert Generation',
    iconName: 'server',
    title: 'High Severity Alert Dispatched to Queue',
    description: 'Correlation engine triggers alert "Possible Password Spray Attack" with confidence score 92% and enriches GeoIP.',
    telemetrySnippet: 'ALERT-2026-90412\nSeverity: HIGH | SLA: 30 Mins\nRule: T1110.003 - Password Spraying\nEntity: 198.51.100.42 -> 12 Target Accounts\nEnrichment: Tor Exit Node Confirmed',
    highlightText: 'SOAR playbook pre-enriches IP reputation and automatically assigns the alert to L1 Queue.',
  },
  {
    id: 5,
    stage: '5. L1 Analyst Investigation',
    iconName: 'analyst',
    title: 'Analyst Triages & Initiates Response',
    description: 'The SOC Analyst inspects the alert, checks whether any subsequent Event 4624 (logon success) occurred, and escalates.',
    telemetrySnippet: 'Analyst Findings:\n1. 198.51.100.42 attempted 12 usernames.\n2. 0 successful authentications (all Event 4625).\n3. Verified: True Positive (Active Password Spray).\nAction: Temporary IP block & password reset for targeted accounts.',
    highlightText: 'Accurate triage confirms malicious intent and blocks the adversary before initial compromise.',
  },
];

const NODE_DEFINITIONS = [
  { key: 'attacker', label: 'Adversary', icon: ShieldAlert, color: 'text-rose-500' },
  { key: 'endpoint', label: 'Endpoint / Sensor', icon: Terminal, color: 'text-amber-500' },
  { key: 'server', label: 'Collector / Agent', icon: Server, color: 'text-blue-500' },
  { key: 'siem', label: 'SIEM Correlation', icon: Activity, color: 'text-purple-500' },
  { key: 'analyst', label: 'Analyst Queue', icon: UserCheck, color: 'text-emerald-500' },
];

export function VisualStoryDemo({
  topicId = 'topic-1-1',
  title = 'Visual Story: The End-to-End SOC Detection Flow',
  subtitle = 'Watch how security events flow from attacker probe to analyst triage (Demo = Pure Animation)',
  steps = DEFAULT_STORY_STEPS,
}: VisualStoryDemoProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(3500);

  const currentStep = steps[currentStepIndex] || steps[0];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length, speed]);

  const stepIcons = {
    attacker: ShieldAlert,
    endpoint: Terminal,
    server: Server,
    siem: Activity,
    analyst: UserCheck,
  };

  const IconComponent = stepIcons[currentStep.iconName] || Activity;

  return (
    <div className="rounded-2xl border-2 border-primary/20 bg-card overflow-hidden shadow-sm">
      {/* Player Header with Video Player Feel */}
      <div className="p-4 sm:p-5 border-b bg-muted/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-[10px] font-bold uppercase tracking-wider gap-1">
              <Eye className="w-3 h-3 text-primary animate-pulse" />
              2. Demo — Visual Story Animation (Graphical Vector)
            </Badge>
            <span className="text-xs text-muted-foreground font-mono">
              Stage {currentStepIndex + 1}/{steps.length}
            </span>
          </div>
          <h3 className="text-base font-bold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>

        {/* Video Controls Bar */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
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
                <span>Auto Play</span>
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs px-2 text-muted-foreground hover:text-foreground"
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex(0);
            }}
            title="Restart animation from beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Topic-Specific Graphical Vector Canvas */}
        <div className="space-y-2">
          <TopicScenarioVector topicId={topicId} currentStage={currentStepIndex + 1} />
        </div>

        {/* Console Telemetry and Caption */}
        <div className="p-4 sm:p-5 rounded-xl border bg-slate-950 text-slate-100 relative overflow-hidden shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              <span className="text-slate-300 font-semibold tracking-wide">STAGE {currentStepIndex + 1}: {currentStep.title}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>LIVE TELEMETRY STREAM</span>
            </div>
          </div>

          {/* Connected Network Diagram Nodes */}
          <div className="relative py-4">
            {/* Background connection wire */}
            <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-slate-800 rounded-full z-0 hidden sm:block" />

            {/* Moving signal pulse across pipeline */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-gradient-to-r from-primary via-emerald-400 to-primary rounded-full z-0 hidden sm:block shadow-lg"
              initial={false}
              animate={{
                left: `${(currentStepIndex / (steps.length - 1)) * 80 + 5}%`,
                width: '15%',
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative z-10">
              {NODE_DEFINITIONS.map((node, idx) => {
                const NodeIcon = node.icon;
                const isCurrent = idx === currentStepIndex;
                const isPast = idx < currentStepIndex;

                return (
                  <button
                    key={node.key}
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStepIndex(idx);
                    }}
                    className={`flex flex-col items-center text-center p-3 rounded-xl border transition-all cursor-pointer ${
                      isCurrent
                        ? 'border-emerald-400 bg-slate-900 shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-400/40 scale-105'
                        : isPast
                        ? 'border-slate-700 bg-slate-900/60 opacity-90'
                        : 'border-slate-800 bg-slate-950/80 opacity-40 hover:opacity-75'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-transform ${
                        isCurrent
                          ? 'bg-emerald-500/20 text-emerald-400 scale-110'
                          : isPast
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-slate-900 text-slate-500'
                      }`}
                    >
                      <NodeIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      Step {idx + 1}
                    </span>
                    <span className={`text-xs font-bold truncate w-full ${isCurrent ? 'text-emerald-300' : 'text-slate-200'}`}>
                      {node.label}
                    </span>
                    {isCurrent && (
                      <span className="mt-1 px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-mono border border-emerald-500/40 animate-pulse">
                        ACTIVE
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Minimal 1-Line Video Caption & Raw Terminal View */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-4 pt-3 border-t border-slate-800 space-y-3"
            >
              {/* Minimalist 1-sentence caption */}
              <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-2 rounded-lg border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <p className="text-xs text-slate-200 font-sans font-medium">
                  <strong className="text-emerald-400 mr-1.5">{currentStep.stage}:</strong>
                  {currentStep.description}
                </p>
              </div>

              {/* Console Telemetry Box */}
              <div className="p-3 rounded-lg bg-black/60 border border-slate-800 font-mono text-[11px] leading-relaxed text-emerald-400 overflow-x-auto whitespace-pre">
                {currentStep.telemetrySnippet || '// Telemetry captured for this stage'}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Video Scrubber & Navigation Track */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5">
            {steps.map((st, idx) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStepIndex(idx);
                }}
                className={`h-2 flex-1 rounded-full transition-all cursor-pointer ${
                  idx === currentStepIndex
                    ? 'bg-primary ring-2 ring-primary/30'
                    : idx < currentStepIndex
                    ? 'bg-emerald-500'
                    : 'bg-muted hover:bg-muted-foreground/30'
                }`}
                title={`Jump to ${st.stage}`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex((prev) => Math.max(0, prev - 1));
              }}
              disabled={currentStepIndex === 0}
              className="h-8 text-xs gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Previous
            </Button>

            <span className="font-medium font-mono text-[11px]">
              Stage {currentStepIndex + 1} of {steps.length} • {currentStep.title}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
              }}
              disabled={currentStepIndex === steps.length - 1}
              className="h-8 text-xs gap-1"
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
