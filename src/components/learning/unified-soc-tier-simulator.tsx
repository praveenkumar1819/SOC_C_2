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
  Users,
  Building2,
  CheckCircle2,
  Flame,
  KeyRound,
  FileCheck2,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

type TierId = 'tier-1' | 'tier-2' | 'tier-3' | 'tier-4';

interface TierData {
  id: TierId;
  name: string;
  role: string;
  mentor: string;
  tag: string;
  color: string;
  borderColor: string;
  lightBg: string;
  ticker: string;
  quote: string;
  stickers: { icon: string; label: string; sub: string }[];
}

const TIERS: TierData[] = [
  {
    id: 'tier-1',
    name: 'Tier 1 (L1 Triage)',
    role: 'Frontline Ingress & Qualification',
    mentor: 'Rajesh Kumar & You',
    tag: 'Gatekeeper & Initial Evaluation',
    color: 'text-sky-600 dark:text-sky-400',
    borderColor: 'border-sky-300 dark:border-sky-800',
    lightBg: 'from-sky-50/80 via-blue-50/40 to-slate-50 dark:from-sky-950/30 dark:via-blue-950/20 dark:to-slate-900/40',
    ticker: 'LIVE RADAR INGRESS: Alert SEC-2026-0412 Claimed | SLA Remaining: 14m 20s | Status: Fact Extraction Active',
    quote: 'Rajesh: "If L1 does not catch the alert or misreads the parent process, the entire SOC is blind. You are our gateway!"',
    stickers: [
      { icon: '🎯', label: 'Alert Claimed', sub: 'SEC-2026-0412 claimed within 15-min SLA' },
      { icon: '🔎', label: '5-Fact Extraction', sub: 'User: Michael Chen | Host: PC-047 | Word → PowerShell' },
      { icon: '⚠️', label: 'Baseline Check', sub: 'Finance department has zero business running PowerShell' },
      { icon: '🤝', label: 'Warm Handover', sub: 'Bundled telemetry packet passed directly to Priya (L2)' },
    ],
  },
  {
    id: 'tier-2',
    name: 'Tier 2 (L2 Containment)',
    role: 'Incident Response & Threat Severance',
    mentor: 'Priya Sharma (Senior IR)',
    tag: 'Active Threat Neutralization',
    color: 'text-indigo-600 dark:text-indigo-400',
    borderColor: 'border-indigo-300 dark:border-indigo-800',
    lightBg: 'from-indigo-50/80 via-purple-50/40 to-slate-50 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-slate-900/40',
    ticker: 'CONTAINMENT ACTIVE: FIN-BOS-MCHEN-047 Isolated | AD Kerberos Revoked | C2 Egress Blocked',
    quote: 'Priya: "My goal is containment speed: cut the network cord, revoke credentials, and stop lateral spread before investigating root cause."',
    stickers: [
      { icon: '🛡️', label: 'EDR Host Isolation', sub: 'Device FIN-BOS-MCHEN-047 severed from corporate LAN' },
      { icon: '🔑', label: 'Kerberos Revocation', sub: 'Michael Chen AD ticket wiped & password forced reset' },
      { icon: '🚫', label: 'Firewall Block', sub: 'Malicious C2 IP 198.51.100.84 added to perimeter blocklist' },
      { icon: '🧪', label: 'Memory Artifact Dump', sub: 'Triage payload captured for malware reverse engineering' },
    ],
  },
  {
    id: 'tier-3',
    name: 'Tier 3 (L3 Lead Hunter)',
    role: 'Fleet Detective & Advanced Scoping',
    mentor: 'Aditya Deshmukh (Lead Hunter)',
    tag: 'Enterprise Campaign Hunt',
    color: 'text-purple-600 dark:text-purple-400',
    borderColor: 'border-purple-300 dark:border-purple-800',
    lightBg: 'from-purple-50/80 via-violet-50/40 to-slate-50 dark:from-purple-950/30 dark:via-violet-950/20 dark:to-slate-900/40',
    ticker: 'FLEET SCAN COMPLETE: 500 Endpoints Queried | 3 Correlated Ingress Hosts Found | Zero Hidden Persistence',
    quote: 'Aditya: "Attackers never spear-phish just one person. I search all 500 machines across the company to make sure no secondary compromise remains hidden."',
    stickers: [
      { icon: '📡', label: 'Fleet-Wide KQL Sweep', sub: 'SHA-256 query executed across 500 company workstations' },
      { icon: '🧬', label: 'Correlated Scope', sub: 'Identified 47 employees received email, 2 other hosts opened file' },
      { icon: '🕵️', label: 'Persistence Hunt', sub: 'Audited Run keys, scheduled tasks, and WMI event subscriptions' },
      { icon: '📝', label: 'Custom Detection Rule', sub: 'Authored Sigma/YARA rule to block future variant campaigns' },
    ],
  },
  {
    id: 'tier-4',
    name: 'SOC Operations Manager',
    role: 'Crisis Command & Business Governance',
    mentor: 'Elena Gomez (SOC Director)',
    tag: 'Business Continuity & Compliance',
    color: 'text-rose-600 dark:text-rose-400',
    borderColor: 'border-rose-300 dark:border-rose-800',
    lightBg: 'from-rose-50/80 via-amber-50/40 to-slate-50 dark:from-rose-950/30 dark:via-amber-950/20 dark:to-slate-900/40',
    ticker: 'EXECUTIVE BRIEFING: P1 Major Incident Active | CEO Briefed | Zero Customer Data Exfiltrated | Legal Audit Passing',
    quote: 'Elena: "My role is enterprise protection: shielding customers, satisfying regulatory reporting, and making high-stakes business decisions."',
    stickers: [
      { icon: '🚨', label: 'P1 Incident Command', sub: 'Conducted War Room with CISO, IT Infrastructure, and HR' },
      { icon: '💼', label: 'Executive Brief to CEO', sub: 'Dr. Amrita Singh updated: banking transactions safeguarded' },
      { icon: '⚖️', label: 'SEC / GDPR Compliance', sub: 'Audited breach notification threshold within 72-hour window' },
      { icon: '📈', label: 'Post-Incident Action Plan', sub: 'Approved company-wide macro lockdown & additional training' },
    ],
  },
];

export function UnifiedSocTierSimulator() {
  const [activeTierIndex, setActiveTierIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const durationMs = 4500; // 4.5 seconds per tier in autoplay video mode
  const currentTier = TIERS[activeTierIndex];

  // Video Autoplay Loop
  useEffect(() => {
    let animFrame: number;
    let startTime: number | null = null;

    if (!isPlaying) {
      return;
    }

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const pct = Math.min((elapsed / durationMs) * 100, 100);
      setProgress(pct);

      if (elapsed >= durationMs) {
        setActiveTierIndex((prev) => (prev + 1) % TIERS.length);
        startTime = timestamp;
        setProgress(0);
      } else {
        animFrame = requestAnimationFrame(step);
      }
    };

    animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [isPlaying, activeTierIndex]);

  const handleSelectTier = (idx: number) => {
    setActiveTierIndex(idx);
    setProgress(0);
  };

  return (
    <div className="glass-card glass-glossy rounded-3xl border border-white/70 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-3xl overflow-hidden transition-all duration-500">
      {/* 1. Header with Video Player Autoplay Bar */}
      <div className="p-4 sm:p-5 border-b border-border/60 bg-card/60 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-[10px] font-bold uppercase tracking-wider gap-1">
              <Workflow className="w-3 h-3 text-primary animate-pulse" />
              Unified Tier Simulator
            </Badge>
            <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-300/50 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              {isPlaying ? 'AUTOPLAY ACTIVE' : 'PAUSED'}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-foreground tracking-tight">
            The 4 SOC Tiers in Action
          </h3>
          <p className="text-xs text-muted-foreground">
            Watch how Alert SEC-2026-0412 automatically escalates through every tier like an interactive video.
          </p>
        </div>

        {/* Video Player Controls */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto flex-wrap">
          {/* Play / Pause Toggle */}
          <Button
            variant={isPlaying ? 'secondary' : 'default'}
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="h-8 px-3 text-xs gap-1.5 font-bold cursor-pointer rounded-xl glass-pill shadow-xs transition-all"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Autoplay</span>
              </>
            )}
          </Button>

          {/* Replay */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setActiveTierIndex(0);
              setProgress(0);
              setIsPlaying(true);
            }}
            className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer rounded-xl glass-pill"
            title="Restart from Tier 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Progress Line Bar across top */}
      <div className="w-full h-1 bg-border/40 relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary via-indigo-500 to-emerald-500 transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 2. Sleek Tier Selection Tabs (Light theme friendly) */}
      <div className="px-4 sm:px-6 pt-4 pb-2 flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-border/40 bg-muted/10">
        {TIERS.map((tier, idx) => {
          const isActive = idx === activeTierIndex;
          return (
            <button
              key={tier.id}
              onClick={() => handleSelectTier(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-102 ring-2 ring-primary/30'
                  : 'bg-card/70 hover:bg-card text-muted-foreground hover:text-foreground border border-border/60 glass-pill'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-muted-foreground/50'}`} />
              <span>{tier.name}</span>
            </button>
          );
        })}
      </div>

      {/* 3. ONE SINGLE UNIFIED BOX: The Dynamic Animated Stage */}
      <div className="p-5 sm:p-7 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTier.id}
            initial={{ opacity: 0, filter: 'blur(12px)', y: 15 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(12px)', y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Stage Banner */}
            <div className={`p-4 sm:p-5 rounded-2xl border ${currentTier.borderColor} bg-gradient-to-r ${currentTier.lightBg} backdrop-blur-xl space-y-2 shadow-xs transition-all duration-500`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 shadow-xs border border-white/60 dark:border-white/10 ${currentTier.color}`}>
                    {activeTierIndex === 0 && <Radio className="w-5 h-5 animate-pulse" />}
                    {activeTierIndex === 1 && <Shield className="w-5 h-5" />}
                    {activeTierIndex === 2 && <Search className="w-5 h-5" />}
                    {activeTierIndex === 3 && <Building2 className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                      <span>{currentTier.name}:</span>
                      <span className={currentTier.color}>{currentTier.mentor}</span>
                    </h4>
                    <p className="text-xs text-muted-foreground font-medium">
                      {currentTier.role}
                    </p>
                  </div>
                </div>

                <Badge className="bg-primary/10 text-primary border border-primary/20 text-xs font-bold self-start sm:self-auto py-1 px-3">
                  {currentTier.tag}
                </Badge>
              </div>

              {/* Dynamic Live Status Ticker */}
              <div className="flex items-center gap-2 text-xs font-mono bg-white/90 dark:bg-slate-900/80 px-3 py-2 rounded-xl border border-border/80 text-foreground shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                <span className="font-semibold text-primary shrink-0">STATUS TICKER:</span>
                <span className="truncate text-foreground/90 font-medium">{currentTier.ticker}</span>
              </div>
            </div>

            {/* Visual Vector Stickers Section - Large Animated Graphic & Clean Badges */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              {/* Left Column: Big Animated Vector Element */}
              <div className="lg:col-span-5 flex items-center justify-center p-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xl relative overflow-hidden min-h-[220px]">
                {/* Background Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 pointer-events-none" />

                {/* Animated Graphic for Tier 1: Radar Scanner */}
                {activeTierIndex === 0 && (
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Concentric Radar Rings */}
                    <div className="absolute inset-0 rounded-full border border-sky-400/30 animate-ping opacity-25" />
                    <div className="absolute inset-4 rounded-full border-2 border-sky-500/40" />
                    <div className="absolute inset-10 rounded-full border border-dashed border-sky-400/50" />
                    <div className="absolute inset-16 rounded-full border border-sky-500/60" />
                    {/* Radar Crosshairs */}
                    <div className="absolute inset-x-0 top-1/2 h-[1px] bg-sky-500/30" />
                    <div className="absolute inset-y-0 left-1/2 w-[1px] bg-sky-500/30" />
                    {/* Sweeping Beam */}
                    <div
                      className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-sky-400/25 pointer-events-none animate-spin"
                      style={{ animationDuration: '3s' }}
                    />
                    {/* Threat Node Blip */}
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute top-10 right-12 w-4 h-4 rounded-full bg-rose-500 shadow-[0_0_15px_#f43f5e] flex items-center justify-center text-[8px] font-bold text-white"
                    >
                      !
                    </motion.div>
                    {/* Center Icon */}
                    <div className="w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-lg shadow-sky-500/30 z-10">
                      <Radio className="w-6 h-6 animate-pulse" />
                    </div>
                  </div>
                )}

                {/* Animated Graphic for Tier 2: Cyber Containment Shield */}
                {activeTierIndex === 1 && (
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Shield Pulsing Field */}
                    <div className="absolute inset-2 rounded-3xl border-2 border-indigo-400/40 animate-pulse bg-indigo-500/5" />
                    <div className="absolute inset-6 rounded-2xl border border-dashed border-indigo-500/50" />
                    {/* Electric containment ring */}
                    <div
                      className="absolute inset-0 rounded-full border border-indigo-400/30 animate-spin"
                      style={{ animationDuration: '8s' }}
                    />
                    {/* Lock Icon Center */}
                    <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-500/30 z-10">
                      <Lock className="w-8 h-8" />
                    </div>
                    {/* Severed Network Graphic Badge */}
                    <div className="absolute bottom-2 bg-rose-500 text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold shadow-md">
                      HOST ISOLATED ✕
                    </div>
                  </div>
                )}

                {/* Animated Graphic for Tier 3: Fleet Network Hunter */}
                {activeTierIndex === 2 && (
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Network Nodes Grid */}
                    <div className="absolute inset-4 rounded-full border border-purple-500/30 flex items-center justify-center">
                      <Network className="w-32 h-32 text-purple-400/30" />
                    </div>
                    {/* Correlated Threat Nodes */}
                    <div className="absolute top-6 left-8 w-3 h-3 rounded-full bg-purple-500 animate-ping" />
                    <div className="absolute top-10 right-10 w-3 h-3 rounded-full bg-purple-600 shadow-md" />
                    <div className="absolute bottom-8 left-12 w-3 h-3 rounded-full bg-purple-600 shadow-md" />
                    {/* Center Magnifying Glass */}
                    <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xl shadow-purple-500/30 z-10">
                      <Search className="w-7 h-7" />
                    </div>
                    <div className="absolute bottom-2 bg-purple-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold shadow-md">
                      500 NODES AUDITED ✓
                    </div>
                  </div>
                )}

                {/* Animated Graphic for Tier 4: Crisis Command Beacon */}
                {activeTierIndex === 3 && (
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Executive War Room Rings */}
                    <div className="absolute inset-2 rounded-full border-2 border-rose-400/40 animate-pulse bg-rose-500/5" />
                    <div className="absolute inset-8 rounded-full border border-dashed border-amber-400/60" />
                    {/* Center Command Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-xl shadow-rose-500/30 z-10">
                      <Building2 className="w-8 h-8" />
                    </div>
                    <div className="absolute bottom-2 bg-rose-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold shadow-md">
                      P1 CRISIS COMMAND ✓
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Sleek Animated Sticker Elements (One unified stage, NOT 4 tiny boxes!) */}
              <div className="lg:col-span-7 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
                    Key Operational Actions
                  </span>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    Stage {activeTierIndex + 1} of 4
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentTier.stickers.map((stk, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl border border-border/80 bg-card/80 backdrop-blur-md shadow-2xs hover:border-primary/50 transition-all flex items-start gap-2.5"
                    >
                      <span className="text-xl shrink-0 p-1.5 bg-muted/40 rounded-lg">{stk.icon}</span>
                      <div className="space-y-0.5 min-w-0">
                        <span className="font-bold text-xs text-foreground block truncate">
                          {stk.label}
                        </span>
                        <p className="text-[11px] text-muted-foreground leading-snug">
                          {stk.sub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mentor Voice Quote Pill */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-muted/30 border border-border/70 backdrop-blur-md flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                {activeTierIndex === 0 && 'RK'}
                {activeTierIndex === 1 && 'PS'}
                {activeTierIndex === 2 && 'AD'}
                {activeTierIndex === 3 && 'EG'}
              </div>
              <p className="text-xs text-foreground/90 italic leading-relaxed">
                {currentTier.quote}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
