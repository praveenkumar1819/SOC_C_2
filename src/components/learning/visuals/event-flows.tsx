'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  BellRing, 
  AlertTriangle, 
  FolderLock, 
  ArrowRight, 
  Filter, 
  Info, 
  CheckCircle,
  Database,
  Search,
  FileCheck
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FlowStage {
  id: string;
  name: string;
  count: string;
  icon: React.ElementType;
  badge: string;
  color: string;
  bgLight: string;
  borderLight: string;
  definition: string;
  analystAction: string;
  example: string;
}

const flowStages: FlowStage[] = [
  {
    id: 'event',
    name: '1. Event',
    count: 'Millions / day',
    icon: Activity,
    badge: 'Raw Telemetry',
    color: 'text-slate-600',
    bgLight: 'bg-slate-50',
    borderLight: 'border-slate-200',
    definition: 'Any observable change or action recorded across endpoints, servers, cloud services, and network firewalls.',
    analystAction: 'Collected and indexed passively by log forwarders and SIEM pipelines. No human review is expected at this level.',
    example: 'Windows Event ID 4624 (User logged on successfully), DNS query for "cdn.cloudflare.com", or firewall permit rule.'
  },
  {
    id: 'alert',
    name: '2. Alert',
    count: 'Thousands / day',
    icon: BellRing,
    badge: 'Detection Triggered',
    color: 'text-amber-600',
    bgLight: 'bg-amber-50/70',
    borderLight: 'border-amber-200',
    definition: 'A specific event or correlated group of events that satisfies a predefined detection rule or anomalous heuristic.',
    analystAction: 'Enters the SOC queue. The Tier 1 analyst must triage, verify context, and decide whether it is benign or malicious.',
    example: 'EDR Rule: "PowerShell executing encoded command" or SIEM Rule: "10 failed login attempts followed by 1 success in 60s".'
  },
  {
    id: 'incident',
    name: '3. Incident',
    count: '~100 / day',
    icon: AlertTriangle,
    badge: 'Confirmed Threat',
    color: 'text-rose-600',
    bgLight: 'bg-rose-50/70',
    borderLight: 'border-rose-200',
    definition: 'A validated security event that compromises or threatens the Confidentiality, Integrity, or Availability of organizational assets.',
    analystAction: 'Active containment initiated: isolate endpoint, revoke user tokens, block outbound C2 IP, and initiate escalation.',
    example: 'Confirmed Cobalt Strike beaconing from an accounting workstation to an unregistered foreign IP address.'
  },
  {
    id: 'case',
    name: '4. Case',
    count: '~10 / day',
    icon: FolderLock,
    badge: 'Documented Record',
    color: 'text-indigo-600',
    bgLight: 'bg-indigo-50/70',
    borderLight: 'border-indigo-200',
    definition: 'The official ticket and forensic dossier containing chronologies, artifacts, IOCs, remediation steps, and audit trails.',
    analystAction: 'Detailed documentation, chain of custody preservation, root cause determination, and shift handover / executive closure.',
    example: 'Incident Ticket #INC-2024-9102: Complete timeline of phishing ingress, credential harvest, containment, and post-mortem.'
  }
];

export function EventToIncidentFlow() {
  const [selectedStage, setSelectedStage] = useState<string>('event');
  const active = flowStages.find((s) => s.id === selectedStage) || flowStages[0];

  return (
    <Card className="border border-border/80 shadow-sm bg-card overflow-hidden my-6">
      <div className="p-6 bg-gradient-to-r from-slate-50 to-indigo-50/40 border-b border-border/60">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs bg-white text-primary border-primary/20">
            <Filter className="w-3 h-3 mr-1" /> Security Progression
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">Hierarchy: Event → Case</span>
        </div>
        <h3 className="text-xl font-bold text-foreground">Event to Incident Progression</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Understanding the distinction between raw data and actionable security cases is fundamental to avoiding alert fatigue.
        </p>

        {/* Step Flow Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-6">
          {flowStages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = stage.id === selectedStage;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? `${stage.bgLight} ${stage.borderLight} ring-2 ring-primary/20 shadow-xs`
                    : 'bg-white hover:bg-slate-50 border-border/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-white' : 'bg-slate-100'} ${stage.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">{stage.count}</span>
                  </div>
                  <div className="text-xs font-bold text-foreground">{stage.name}</div>
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">{stage.badge}</div>
              </button>
            );
          })}
        </div>
      </div>

      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <active.icon className={`w-5 h-5 ${active.color}`} />
                <h4 className="text-base font-semibold text-foreground">{active.name}: In-Depth Analysis</h4>
              </div>
              <Badge className={`${active.bgLight} ${active.color} border border-border text-xs`}>
                Typical Volume: {active.count}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-border/80 bg-slate-50/50">
                <div className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-1">
                  <Info className="w-3.5 h-3.5 text-blue-500" />
                  <span>Technical Definition</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{active.definition}</p>
              </div>

              <div className="p-3.5 rounded-xl border border-border/80 bg-slate-50/50">
                <div className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-1">
                  <Search className="w-3.5 h-3.5 text-amber-500" />
                  <span>Analyst Action Required</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{active.analystAction}</p>
              </div>

              <div className="p-3.5 rounded-xl border border-border/80 bg-slate-50/50">
                <div className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-1">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Real SOC Example</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-mono text-[11px]">{active.example}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

export function EventFilteringFunnel() {
  const levels = [
    {
      label: 'Raw Ingested Events',
      volume: '10,000,000 / day',
      reduction: '100% (Baseline)',
      width: 'w-full',
      color: 'bg-slate-100 text-slate-700 border-slate-300',
      description: 'Firewall sessions, endpoint sysmon, DNS logs, active directory tickets, VPN tunnels.',
      icon: Database
    },
    {
      label: 'Correlated SIEM Alerts',
      volume: '10,000 / day',
      reduction: '99.9% Noise Filtered',
      width: 'w-[75%]',
      color: 'bg-amber-50 text-amber-800 border-amber-300',
      description: 'Matches detection signatures, behavioral baselines, or threat intel feed matches.',
      icon: BellRing
    },
    {
      label: 'Confirmed Incidents',
      volume: '100 / day',
      reduction: '99% of Alerts Are Benign / FP',
      width: 'w-[50%]',
      color: 'bg-rose-50 text-rose-800 border-rose-300',
      description: 'Verified suspicious activities demanding active analyst investigation and scoping.',
      icon: AlertTriangle
    },
    {
      label: 'Forensic Cases / Escalations',
      volume: '10 / day',
      reduction: '90% Handled at L1',
      width: 'w-[28%]',
      color: 'bg-indigo-50 text-indigo-900 border-indigo-300',
      description: 'Formal containment dossiers, malware reverse engineering, and post-incident reporting.',
      icon: FolderLock
    }
  ];

  return (
    <Card className="border border-border/80 shadow-sm bg-card overflow-hidden my-6">
      <div className="p-6 bg-slate-50/70 border-b border-border/60">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className="text-xs bg-white text-primary border-primary/20">
            <Filter className="w-3 h-3 mr-1" /> Volume Reduction
          </Badge>
          <span className="text-xs text-muted-foreground">SOC Telemetry Math</span>
        </div>
        <h3 className="text-xl font-bold text-foreground">The Event Filtering Funnel</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Why don't SOC analysts inspect all 10 million events? Automated detection filters 99.9% of telemetry so humans can focus on high-fidelity signals.
        </p>
      </div>

      <CardContent className="p-6 space-y-4">
        <div className="flex flex-col items-center gap-3 py-2">
          {levels.map((lvl, idx) => {
            const Icon = lvl.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`${lvl.width} min-w-[280px] p-4 rounded-xl border ${lvl.color} shadow-xs transition-all hover:scale-[1.01]`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="text-xs sm:text-sm font-bold">{lvl.label}</span>
                  </div>
                  <Badge variant="outline" className="bg-white/90 text-xs font-mono font-semibold">
                    {lvl.volume}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-1 pt-1 border-t border-black/5">
                  <span>{lvl.description}</span>
                  <span className="font-semibold text-slate-700 ml-2 shrink-0">{lvl.reduction}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs text-blue-950 flex items-start gap-3 mt-4">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Key Analyst Takeaway: </span>
            Without intelligent SIEM correlation and aggressive noise reduction, a SOC would experience immediate collapse from cognitive overload. Your core skill as an L1 is rapidly distinguishing legitimate authorized anomalies from true adversary actions.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
