'use client';

import React, { useState, useEffect } from 'react';
import {
  Layers,
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
  Globe,
  Sliders,
  Workflow,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

export interface TechConsole {
  id: number;
  key: 'siem' | 'edr' | 'ndr' | 'tip' | 'soar';
  name: string;
  category: string;
  analogy: string;
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

const TECH_CONSOLES: TechConsole[] = [
  {
    id: 1,
    key: 'siem',
    name: '1. SIEM Radar Console',
    category: 'Log Correlation & Ingestion',
    analogy: 'Airport Flight Control Tower',
    mentor: 'Rajesh Kumar (Shift Mentor)',
    color: 'text-sky-700 dark:text-sky-400',
    badgeBg: 'bg-sky-500/15 text-sky-900 dark:text-sky-200 border-sky-400/40',
    borderColor: 'border-sky-300 dark:border-sky-800',
    gradientBg: 'from-sky-50/90 via-blue-50/40 to-slate-50 dark:from-sky-950/30 dark:via-blue-950/20 dark:to-slate-900/40',
    ticker: 'SIEM INGESTION: 12,400 EPS Normalized via CIM | Rule Correlation Active: Suspicious Process Creation',
    quote: 'Rajesh: "The SIEM is your central command tower. It gathers logs from everywhere, normalizes them, and fires alerts on suspicious links."',
    stickers: [
      {
        icon: <Radio className="w-5 h-5 text-sky-600 dark:text-sky-400 animate-pulse" />,
        label: 'Central Log Stream',
        sub: 'Ingesting 12,400 events/second from all servers',
        tag: 'Data Stream',
      },
      {
        icon: <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
        label: 'CIM Normalization',
        sub: 'Field mapping translates raw Syslog into standard schema',
        tag: 'Parser Engine',
      },
      {
        icon: <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
        label: 'Correlation Engine',
        sub: 'Matched 5 failed logins followed by instant root escalation',
        tag: 'Rule Trigger',
      },
      {
        icon: <MonitorCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        label: 'Industry Leaders',
        sub: 'Splunk Enterprise Security, Microsoft Sentinel, IBM QRadar',
        tag: 'Standard Tools',
      },
    ],
  },
  {
    id: 2,
    key: 'edr',
    name: '2. EDR Endpoint Scope',
    category: 'Host Telemetry & Live Isolation',
    analogy: 'Undercover Agent on Every Laptop',
    mentor: 'Priya Sharma (Senior IR)',
    color: 'text-indigo-700 dark:text-indigo-400',
    badgeBg: 'bg-indigo-500/15 text-indigo-900 dark:text-indigo-200 border-indigo-400/40',
    borderColor: 'border-indigo-300 dark:border-indigo-800',
    gradientBg: 'from-indigo-50/90 via-purple-50/40 to-slate-50 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-slate-900/40',
    ticker: 'EDR AGENT: Host FIN-BOS-047 Live | Process Tree PID 4820 → 6104 Tracked | Host Isolation Ready',
    quote: 'Priya: "EDR lives directly on the computer. It sees every process spawn, DLL injected into memory, and lets us sever network cables with one click."',
    stickers: [
      {
        icon: <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
        label: 'Live Process Tree',
        sub: 'Parent WINWORD.EXE spawned powershell.exe with -enc flag',
        tag: 'Execution Flow',
      },
      {
        icon: <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
        label: 'In-Memory Inspection',
        sub: 'Scans RAM for injected shellcode and credential theft',
        tag: 'Memory Shield',
      },
      {
        icon: <Lock className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
        label: '1-Click Host Isolation',
        sub: 'Severs network connection while keeping SOC tunnel open',
        tag: 'Containment',
      },
      {
        icon: <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        label: 'Industry Leaders',
        sub: 'CrowdStrike Falcon, Microsoft Defender for Endpoint, SentinelOne',
        tag: 'Standard Tools',
      },
    ],
  },
  {
    id: 3,
    key: 'ndr',
    name: '3. NDR / Network Wire',
    category: 'Wire Inspection & C2 Intercept',
    analogy: 'Highway Tollbooth & Traffic Camera',
    mentor: 'Priya Sharma (Senior IR)',
    color: 'text-emerald-700 dark:text-emerald-400',
    badgeBg: 'bg-emerald-500/15 text-emerald-900 dark:text-emerald-200 border-emerald-400/40',
    borderColor: 'border-emerald-300 dark:border-emerald-800',
    gradientBg: 'from-emerald-50/90 via-teal-50/40 to-slate-50 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-slate-900/40',
    ticker: 'NDR WIRE: TCP Handshake Intercepted to 198.51.100.84:443 | JA3 TLS Fingerprint Flagged Malicious',
    quote: 'Priya: "Attackers can hide on a machine, but their packets must travel the wire. Network tools catch C2 callbacks instantly."',
    stickers: [
      {
        icon: <Network className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        label: 'Packet Deep Inspection',
        sub: 'Reconstructs TCP streams and audits application payloads',
        tag: 'Wire Telemetry',
      },
      {
        icon: <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        label: 'TLS / JA3 Fingerprint',
        sub: 'Identifies malware handshake even when SSL/TLS is encrypted',
        tag: 'Crypto Telemetry',
      },
      {
        icon: <Shield className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
        label: 'Perimeter Block',
        sub: 'Signals firewall to drop IP 198.51.100.84 immediately',
        tag: 'Egress Block',
      },
      {
        icon: <Server className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
        label: 'Industry Leaders',
        sub: 'Zeek, Suricata, Palo Alto Networks, Corelight, Vectra AI',
        tag: 'Standard Tools',
      },
    ],
  },
  {
    id: 4,
    key: 'tip',
    name: '4. Threat Intel (TIP)',
    category: 'Global Reputation & IOC Intel',
    analogy: 'Global Police Wanted Posters',
    mentor: 'Aditya Deshmukh (Lead Hunter)',
    color: 'text-purple-700 dark:text-purple-400',
    badgeBg: 'bg-purple-500/15 text-purple-900 dark:text-purple-200 border-purple-400/40',
    borderColor: 'border-purple-300 dark:border-purple-800',
    gradientBg: 'from-purple-50/90 via-violet-50/40 to-slate-50 dark:from-purple-950/30 dark:via-violet-950/20 dark:to-slate-900/40',
    ticker: 'THREAT INTEL: Hash SHA-256 e3b0c... Flagged by 58/72 Vendors | Threat Actor: APT29 Cozy Bear Campaign',
    quote: 'Aditya: "Never analyze an alert alone. Connect to global feeds to verify if this exact IP or file hash has attacked other companies."',
    stickers: [
      {
        icon: <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
        label: 'Global Hash Reputation',
        sub: 'Payload SHA-256 matches active Emotet trojan campaign',
        tag: 'IOC Database',
      },
      {
        icon: <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
        label: 'Adversary Profiling',
        sub: 'MITRE ATT&CK T1059.001 (PowerShell Execution) mapping',
        tag: 'Tactics & Techniques',
      },
      {
        icon: <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
        label: 'Dynamic Sandboxing',
        sub: 'Detonated payload in sandbox: dropped ransomware DLL',
        tag: 'Behavior Analysis',
      },
      {
        icon: <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
        label: 'Industry Leaders',
        sub: 'VirusTotal Enterprise, Recorded Future, AlienVault OTX, Mandiant',
        tag: 'Standard Tools',
      },
    ],
  },
  {
    id: 5,
    key: 'soar',
    name: '5. SOAR / Orchestrator',
    category: 'Automated Playbooks & Cases',
    analogy: 'Factory Robotic Assembly Line',
    mentor: 'Rajesh Kumar (Senior Mentor)',
    color: 'text-amber-700 dark:text-amber-400',
    badgeBg: 'bg-amber-500/15 text-amber-900 dark:text-amber-200 border-amber-400/40',
    borderColor: 'border-amber-300 dark:border-amber-800',
    gradientBg: 'from-amber-50/90 via-orange-50/40 to-slate-50 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-slate-900/40',
    ticker: 'SOAR PLAYBOOK COMPLETE: User Pass Reset | Machine Isolated | Firewall Blocked | Ticket Dossier Generated',
    quote: 'Rajesh: "SOAR triggers playbooks in milliseconds, coordinating SIEM, EDR, and Firewalls automatically while saving audit logs."',
    stickers: [
      {
        icon: <Sliders className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
        label: 'Automated Playbooks',
        sub: 'Executes 14 containment steps in under 800 milliseconds',
        tag: 'Workflow Automation',
      },
      {
        icon: <FileCheck2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
        label: 'Case Management',
        sub: 'Logs chronological timeline, evidence artifacts, and notes',
        tag: 'Ticket Dossier',
      },
      {
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        label: 'Cross-Tool Bridge',
        sub: 'Connects EDR isolation with Active Directory password reset',
        tag: 'Tool Integration',
      },
      {
        icon: <Workflow className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
        label: 'Industry Leaders',
        sub: 'Palo Alto Cortex XSOAR, Splunk SOAR (Phantom), ServiceNow SecOps',
        tag: 'Standard Tools',
      },
    ],
  },
];

interface UnifiedTechStackSimulatorProps {
  onConsoleChange?: (consoleKey: string) => void;
}

export function UnifiedTechStackSimulator({ onConsoleChange }: UnifiedTechStackSimulatorProps) {
  const [activeConsoleId, setActiveConsoleId] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  const currentConsole = TECH_CONSOLES.find((c) => c.id === activeConsoleId) || TECH_CONSOLES[0];

  // Autoplay progression timer
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
          setActiveConsoleId((curr) => {
            const next = curr >= TECH_CONSOLES.length ? 1 : curr + 1;
            const nextConsole = TECH_CONSOLES.find((c) => c.id === next);
            if (nextConsole && onConsoleChange) onConsoleChange(nextConsole.key);
            return next;
          });
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, activeConsoleId, onConsoleChange]);

  const handleSelectConsole = (id: number) => {
    setActiveConsoleId(id);
    setProgressPercent(0);
    const sel = TECH_CONSOLES.find((c) => c.id === id);
    if (sel && onConsoleChange) onConsoleChange(sel.key);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setActiveConsoleId(1);
    setProgressPercent(0);
    setIsPlaying(true);
    if (onConsoleChange) onConsoleChange('siem');
  };

  return (
    <div className="glass-card glass-glossy rounded-3xl border-2 border-white/70 dark:border-white/10 p-4 sm:p-6 shadow-xl backdrop-blur-3xl overflow-hidden relative transition-all duration-300">
      {/* Dynamic ambient background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/10 via-sky-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* TOP CONTROLS CONSOLE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-foreground tracking-tight">
                Enterprise SOC Tool Stack Simulator
              </span>
              <Badge variant="outline" className="text-[10px] bg-emerald-500/15 text-emerald-900 dark:text-emerald-200 border-emerald-400/40 font-bold py-0.5">
                {isPlaying ? '● Live Telemetry' : '❚❚ Paused'}
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground font-medium hidden sm:block">
              5 Essential Core Consoles • Auto-advancing video tour with interactive telemetry badges
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
            title="Restart from SIEM"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* 5 TOOL SELECTION TABS */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2 my-3 p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-border/40">
        {TECH_CONSOLES.map((c) => {
          const isActive = c.id === activeConsoleId;
          return (
            <button
              key={c.id}
              onClick={() => handleSelectConsole(c.id)}
              className={`py-1.5 px-1 sm:px-2 rounded-xl text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center ${
                isActive
                  ? 'bg-card text-foreground font-black shadow-md border border-white/60 dark:border-white/10 scale-[1.02]'
                  : 'text-muted-foreground hover:text-foreground font-semibold hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <span className="text-[10px] sm:text-xs uppercase">{c.key}</span>
              <span className="text-[9px] sm:text-[10px] opacity-75 truncate max-w-full hidden md:block">
                {c.category.split('&')[0].trim()}
              </span>
            </button>
          );
        })}
      </div>

      {/* CONTINUOUS PROGRESS SCRUBBER */}
      <div className="w-full h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full transition-all duration-75"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* MAIN SINGLE VIDEO FRAME */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentConsole.id}
          initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`rounded-2xl border ${currentConsole.borderColor} bg-gradient-to-br ${currentConsole.gradientBg} p-4 sm:p-5 space-y-4 shadow-sm backdrop-blur-2xl transition-all`}
        >
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Badge className={currentConsole.badgeBg}>
                  Tool {currentConsole.id} of 5 • {currentConsole.category}
                </Badge>
                <h3 className={`font-black text-base sm:text-lg ${currentConsole.color}`}>
                  {currentConsole.name}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                Everyday Analogy: <span className="text-foreground">{currentConsole.analogy}</span>
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">
                Guide on Duty
              </span>
              <span className="text-xs font-extrabold text-foreground">
                {currentConsole.mentor}
              </span>
            </div>
          </div>

          {/* STRICT 1-3 LINES DIALOGUE / MENTOR VOICE */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-card/85 dark:bg-card/50 border border-border/70 backdrop-blur-md shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed italic">
              {currentConsole.quote}
            </p>
          </div>

          {/* 4 GRAPHICAL VECTOR STICKERS / TELEMETRY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {currentConsole.stickers.map((stk, idx) => (
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
                {currentConsole.ticker}
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  const next = currentConsole.id >= TECH_CONSOLES.length ? 1 : currentConsole.id + 1;
                  handleSelectConsole(next);
                }}
                className="h-6 px-2 text-[10px] font-bold text-primary hover:text-primary/90 hover:bg-primary/10 gap-1 rounded-lg"
              >
                <span>Console {currentConsole.id < 5 ? currentConsole.id + 1 : 1}</span>
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
