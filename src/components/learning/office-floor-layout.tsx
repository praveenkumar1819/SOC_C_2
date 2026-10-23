'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Briefcase,
  Shield,
  Eye,
  User,
  Users,
  UserCheck,
  Laptop,
  AlertTriangle,
  Radio,
  Network,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Activity,
  Zap,
  Sparkles,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface OfficeFloorLayoutProps {
  onInspected?: () => void;
  onProceed?: () => void;
  isCompact?: boolean;
}

type FloorZone = 'all' | 'michael' | 'glass' | 'soc';

export function OfficeFloorLayout({
  onInspected,
  onProceed,
  isCompact = false,
}: OfficeFloorLayoutProps) {
  const [selectedZone, setSelectedZone] = useState<FloorZone>('all');
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const handleSelectZone = (zone: FloorZone) => {
    setSelectedZone(zone);
    setHasInteracted(true);
    if (onInspected) onInspected();
  };

  const ZONE_DETAILS: Record<FloorZone, { title: string; subtitle: string; dialogue: string; badge: string; badgeColor: string }> = {
    all: {
      title: 'FinCorp Boston HQ • 4th Floor Overview',
      subtitle: 'Commercial Finance (Left) ↔ Soundproof Glass Partition ↔ SOC Control Room (Right)',
      dialogue: 'Look through our observation glass, trainee! Michael Chen sits 30 feet away in Finance. When his Word macro spawned PowerShell, live EDR telemetry streamed straight to our monitors in the SOC.',
      badge: 'Physical & Telemetry Map',
      badgeColor: 'bg-primary text-primary-foreground',
    },
    michael: {
      title: 'Michael Chen’s Workstation (FIN-BOS-MCHEN-047)',
      subtitle: 'Commercial Finance • High Blast-Radius Wire Transfer Authority',
      dialogue: 'Michael opened "Q4_Invoice_Summary.docm" from a spoofed email. The macro attempted to run PowerShell scripts. He doesn’t even know yet — our EDR sensor caught it in 1.1 seconds!',
      badge: 'Active Incident Source',
      badgeColor: 'bg-rose-500 text-white',
    },
    glass: {
      title: 'Soundproof Observation Glass Partition Wall',
      subtitle: 'Physical Separation • High-Speed Optical Telemetry Stream',
      dialogue: 'We never shout across the hallway. The acoustic glass blocks noise while 10Gbps fiber cables silently stream endpoint events from business PCs directly into our SIEM.',
      badge: 'Zero-Disruption Telemetry',
      badgeColor: 'bg-sky-500 text-white',
    },
    soc: {
      title: 'Security Operations Centre (SOC Defense Post)',
      subtitle: 'Restricted Badge Access • 24/7 FinCorp Blue Team Operations',
      dialogue: 'This is your triage desk. I (Rajesh) sit right beside you. In front of us is the central SOC Video Wall flashing Alert SEC-2026-0412. You are FinCorp’s frontline guardian!',
      badge: 'Restricted Defense Room',
      badgeColor: 'bg-emerald-600 text-white',
    },
  };

  const currentInfo = ZONE_DETAILS[selectedZone];

  return (
    <div id="office-floor-plan" className="w-full scroll-mt-24 glass-card glass-glossy backdrop-blur-2xl border-2 border-primary/25 bg-card/80 dark:bg-slate-900/60 rounded-3xl p-4 sm:p-6 space-y-5 shadow-2xl overflow-hidden transition-all">
      {/* Top Header & Zone Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-400/40 text-[11px] font-bold font-mono">
              <Building2 className="w-3.5 h-3.5 inline mr-1 text-sky-600" />
              FinCorp 4th Floor Architecture
            </Badge>
            <Badge className={`${currentInfo.badgeColor} text-[10px] font-bold shadow-xs`}>
              {currentInfo.badge}
            </Badge>
          </div>
          <h3 className="text-base sm:text-lg font-black text-foreground mt-1">
            Physical Office Layout &amp; Live Telemetry Highway
          </h3>
          <p className="text-xs text-muted-foreground">
            Understand where business employees sit relative to the glass-walled SOC defense room.
          </p>
        </div>

        {/* Interactive Zone Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all' as FloorZone, label: 'Full Floor' },
            { id: 'michael' as FloorZone, label: '1. Michael (Finance)' },
            { id: 'glass' as FloorZone, label: '2. Glass Wall' },
            { id: 'soc' as FloorZone, label: '3. SOC Room' },
          ].map((z) => (
            <button
              key={z.id}
              onClick={() => handleSelectZone(z.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedZone === z.id
                  ? 'bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/30'
                  : 'bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/60'
              }`}
            >
              {z.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2D Floor Plan Canvas (Single Unified Container) */}
      <div className="relative rounded-2xl border border-border/70 dark:border-white/10 bg-gradient-to-r from-amber-500/5 via-sky-500/5 to-emerald-500/5 dark:from-amber-950/20 dark:via-sky-950/20 dark:to-emerald-950/20 p-4 sm:p-5 overflow-hidden">
        
        {/* Animated Telemetry Pulse Line crossing from Finance to SOC */}
        <div className="absolute top-1/2 left-1/4 right-1/4 -translate-y-1/2 h-1 pointer-events-none z-10 hidden sm:block">
          <div className="w-full h-full bg-gradient-to-r from-rose-500 via-sky-400 to-emerald-500 opacity-30 rounded-full" />
          <motion.div
            animate={{ x: ['0%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
            className="w-4 h-4 -top-1.5 relative rounded-full bg-sky-400 shadow-[0_0_12px_#38bdf8] border-2 border-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-11 gap-3 relative z-20">
          
          {/* ========================================================
              LEFT WING: COMMERCIAL FINANCE DEPARTMENT (5 cols)
             ======================================================== */}
          <div
            onClick={() => handleSelectZone('michael')}
            className={`md:col-span-5 rounded-2xl p-4 transition-all cursor-pointer border ${
              selectedZone === 'michael'
                ? 'bg-amber-500/15 border-amber-500/60 ring-2 ring-amber-500/30 shadow-md'
                : 'bg-card/70 dark:bg-slate-900/50 border-amber-500/25 hover:border-amber-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-foreground">Commercial Finance Wing</h4>
                  <span className="text-[10px] text-muted-foreground">General Open Office Floor</span>
                </div>
              </div>
              <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-400/40 text-[10px] font-mono">
                Open Access
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Michael Chen Workstation Card */}
              <div className="p-3 rounded-xl bg-rose-500/10 dark:bg-rose-950/30 border-2 border-rose-400/70 space-y-1.5 relative overflow-hidden shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-extrabold text-xs text-foreground block">Michael Chen</span>
                      <span className="text-[10px] font-mono text-muted-foreground">Desk: PC-047</span>
                    </div>
                  </div>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600" />
                  </span>
                </div>

                <div className="p-1.5 rounded-lg bg-rose-500/15 border border-rose-400/40 text-[10px] font-mono text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                  <span className="truncate">Word ran PowerShell</span>
                </div>
                <p className="text-[10px] text-muted-foreground line-clamp-2">
                  Opened spear-phishing invoice. Host FIN-047 immediately triggered EDR alert.
                </p>
              </div>

              {/* Finance Peer Pod */}
              <div className="p-3 rounded-xl bg-muted/40 dark:bg-slate-800/40 border border-border/70 space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-sky-500/20 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold text-xs shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-xs text-foreground block">Loan Specialists</span>
                    <span className="text-[10px] font-mono text-muted-foreground">5 Open Desks</span>
                  </div>
                </div>
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-[10px] font-mono text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                  <span>Normal Operations</span>
                </div>
                <p className="text-[10px] text-muted-foreground line-clamp-2">
                  Processing loan applications. At risk if attacker moves laterally from Michael&apos;s PC.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================
              CENTER: OBSERVATION GLASS WALL (1 col)
             ======================================================== */}
          <div
            onClick={() => handleSelectZone('glass')}
            className={`md:col-span-1 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center transition-all cursor-pointer border ${
              selectedZone === 'glass'
                ? 'bg-sky-500/20 border-sky-500/80 ring-2 ring-sky-500/40 shadow-md'
                : 'bg-sky-500/10 dark:bg-sky-950/30 border-sky-400/40 hover:border-sky-500/60'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center mb-1 shadow-xs">
              <Eye className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-black text-sky-900 dark:text-sky-200 uppercase tracking-tighter">
              Glass Wall
            </span>
            <div className="my-1.5 w-full border-t border-dashed border-sky-400/60" />
            <span className="text-[9px] font-mono text-sky-700 dark:text-sky-300 leading-tight">
              10Gbps Tap
            </span>
            <div className="mt-1 flex items-center gap-0.5 text-sky-600 dark:text-sky-400">
              <Radio className="w-3 h-3 animate-pulse" />
            </div>
          </div>

          {/* ========================================================
              RIGHT WING: SOC DEFENSE ROOM (5 cols)
             ======================================================== */}
          <div
            onClick={() => handleSelectZone('soc')}
            className={`md:col-span-5 rounded-2xl p-4 transition-all cursor-pointer border ${
              selectedZone === 'soc'
                ? 'bg-emerald-500/15 border-emerald-500/60 ring-2 ring-emerald-500/30 shadow-md'
                : 'bg-card/70 dark:bg-slate-900/50 border-emerald-500/25 hover:border-emerald-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-foreground">FinCorp SOC Control Room</h4>
                  <span className="text-[10px] text-muted-foreground">Restricted Cyber Defense Station</span>
                </div>
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-400/40 text-[10px] font-mono">
                Badge Keycard Only
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* Your Desk */}
              <div className="p-2.5 rounded-xl bg-card/90 dark:bg-slate-800/80 border border-emerald-500/40 space-y-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    <UserCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-[11px] text-foreground block">You (L1)</span>
                    <span className="text-[9px] text-muted-foreground font-mono">Triage Desk</span>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  You claim Alert SEC-2026-0412 and inspect the 4 core anchors.
                </p>
              </div>

              {/* Rajesh Desk */}
              <div className="p-2.5 rounded-xl bg-card/90 dark:bg-slate-800/80 border border-sky-500/40 space-y-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    RK
                  </div>
                  <div>
                    <span className="font-extrabold text-[11px] text-foreground block">Rajesh</span>
                    <span className="text-[9px] text-muted-foreground font-mono">Mentor Desk</span>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  Sitting right next to you, guiding every triage decision.
                </p>
              </div>

              {/* SOC Wallboard */}
              <div className="p-2.5 rounded-xl bg-purple-500/10 dark:bg-purple-950/30 border border-purple-500/40 space-y-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    <Laptop className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-[11px] text-foreground block">SIEM Wallboard</span>
                    <span className="text-[9px] text-purple-600 dark:text-purple-400 font-mono font-bold">500 Endpoints</span>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  Big monitors tracking live alerts across FinCorp fleet.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Rajesh Mentor Voice/Dialogue Box (Concise 1-2 lines) */}
      <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-primary/10 border border-primary/20 text-xs text-foreground animate-fade-in">
        <div className="w-8 h-8 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center shrink-0 shadow-xs">
          RK
        </div>
        <div className="space-y-1 flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-foreground">{currentInfo.title}</span>
            <span className="text-[11px] font-mono text-primary font-semibold">Rajesh Kumar (Senior L1 Mentor)</span>
          </div>
          <p className="text-muted-foreground leading-relaxed italic text-xs">
            &ldquo;{currentInfo.dialogue}&rdquo;
          </p>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-border/60">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            {hasInteracted
              ? 'Floor plan reviewed and verified! You understand how physical alerts reach the SOC.'
              : 'Click any area (Michael Chen, Glass Wall, or SOC Room) to inspect how telemetry travels.'}
          </span>
        </div>

        {onProceed && (
          <Button
            size="sm"
            onClick={() => {
              if (onInspected) onInspected();
              onProceed();
            }}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs gap-1.5 rounded-xl h-9 px-5 shadow-sm cursor-pointer shrink-0"
          >
            <span>Proceed to Chapter 1 Hierarchy Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}
