'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Server,
  Terminal,
  Activity,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Laptop,
  Globe,
  Database,
  Search,
  Clock,
  Layers,
  FileText,
  Lock,
  Unlock,
  Radio,
  Sliders,
  Check,
  X,
  FileCheck2,
  HardDrive,
  Users,
  Shield,
  Filter,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ToolScreenProps {
  stage: number; // 1 to 5
}

// =========================================================================
// TOPIC 1.1: SOC Team & Architecture — Shift Operations Roster
// =========================================================================
export function Topic11ToolScreen({ stage }: ToolScreenProps) {
  const tiers = [
    {
      id: 1,
      role: 'Queue / Ingestion',
      analyst: 'Automated Collector',
      duty: 'Centralized Alert Intake',
      status: 'Dispatching',
      color: 'border-slate-300 bg-slate-50 text-slate-700',
      activeColor: 'border-blue-500 bg-blue-50 text-blue-900 ring-2 ring-blue-300',
    },
    {
      id: 2,
      role: 'Tier 1 Triage Desk',
      analyst: 'Sarah Chen (L1 Analyst)',
      duty: 'Entity Extraction & Initial Qualification',
      status: 'Active on ALT-2026-04',
      color: 'border-slate-300 bg-slate-50 text-slate-700',
      activeColor: 'border-sky-500 bg-sky-50 text-sky-900 ring-2 ring-sky-300',
    },
    {
      id: 3,
      role: 'Tier 2 Incident Response',
      analyst: 'Marcus Vance (Lead IR)',
      duty: 'Deep Host Forensics & Containment',
      status: 'Active Investigation',
      color: 'border-slate-300 bg-slate-50 text-slate-700',
      activeColor: 'border-indigo-500 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-300',
    },
    {
      id: 4,
      role: 'Tier 3 Threat Hunter',
      analyst: 'Elena Rostova (Principal SME)',
      duty: 'Fleet-wide IOC Sweep & Custom YARA',
      status: 'Hunting Stealth C2',
      color: 'border-slate-300 bg-slate-50 text-slate-700',
      activeColor: 'border-purple-500 bg-purple-50 text-purple-900 ring-2 ring-purple-300',
    },
    {
      id: 5,
      role: 'SOC Operations Manager',
      analyst: 'David Kim (Director)',
      duty: 'Shift Governance & CISO Reporting',
      status: 'Briefing Execs',
      color: 'border-slate-300 bg-slate-50 text-slate-700',
      activeColor: 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-300',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Console Top Bar */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100/90 border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-600" />
          <span className="font-bold text-slate-900">FinCorp Global SOC — Live Operations Board</span>
          <Badge variant="outline" className="bg-white text-slate-700 border-slate-300 font-mono text-[10px]">
            Shift 1 (Active)
          </Badge>
        </div>
        <div className="flex items-center gap-3 text-slate-600">
          <span className="flex items-center gap-1 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            4 Analysts On-Duty
          </span>
          <span className="font-mono text-slate-500">SLA: 99.4% Met</span>
        </div>
      </div>

      {/* Tiered Handover Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {tiers.map((t, idx) => {
          const isActive = stage === t.id;
          const isPassed = stage > t.id;

          return (
            <motion.div
              key={t.id}
              animate={{ scale: isActive ? 1.03 : 1 }}
              className={`p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between ${
                isActive ? t.activeColor : isPassed ? 'border-slate-200 bg-white text-slate-600' : 'border-slate-200 bg-slate-50/60 opacity-60 text-slate-500'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                    Tier {idx + 1}
                  </span>
                  {isActive ? (
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                  ) : isPassed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : null}
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">{t.role}</h4>
                <p className="text-[11px] font-semibold text-slate-700">{t.analyst}</p>
                <p className="text-[10px] text-slate-500 leading-normal">{t.duty}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                <span className="font-mono text-slate-600">{t.status}</span>
                {isActive && (
                  <Badge className="bg-blue-600 text-white text-[9px] px-1.5 py-0 h-4 font-mono font-bold">
                    PROCESSING
                  </Badge>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Active Work Action Card */}
      <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-700 shrink-0" />
          <span className="text-slate-800">
            <strong>Active Handover Flow:</strong> Alert ALT-2026-04 assigned to{' '}
            <span className="font-semibold text-blue-800 underline">{tiers[stage - 1]?.analyst}</span> for{' '}
            {tiers[stage - 1]?.duty.toLowerCase()}.
          </span>
        </div>
        <span className="font-mono text-[11px] text-blue-700 font-semibold shrink-0">Step {stage}/5</span>
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 1.2: Process — Incident Response Playbook Execution Engine
// =========================================================================
export function Topic12ToolScreen({ stage }: ToolScreenProps) {
  const steps = [
    { num: 1, title: 'Alert Trigger', desc: 'SIEM Correlation Rule evaluates logon threshold', status: 'Completed' },
    { num: 2, title: 'Entity Extraction', desc: 'Identify target user (Finance01) and host (FIN-PC-04)', status: 'Completed' },
    { num: 3, title: 'Threat Intelligence', desc: 'Query AbuseIPDB for source IP 198.51.100.25 (Tor Exit)', status: 'Completed' },
    { num: 4, title: 'Containment Action', desc: 'EDR host isolation and active session token revocation', status: 'Running' },
    { num: 5, title: 'Ticket Closure', desc: 'Document 5 core pillars and submit PIR recommendations', status: 'Pending' },
  ];

  return (
    <div className="space-y-4">
      {/* Playbook Header */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100/90 border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-600" />
          <span className="font-bold text-slate-900">Cortex XSOAR Playbook: PB-FINCORP-BRUTE-FORCE-01</span>
          <Badge className="bg-indigo-600 text-white text-[10px]">Automated SOP Run</Badge>
        </div>
        <span className="font-mono text-slate-500">Run ID: #RUN-2026-9042</span>
      </div>

      {/* Visual Workflow Tree */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 relative">
        {steps.map((st) => {
          const isCurrent = stage === st.num;
          const isDone = stage > st.num;

          return (
            <div
              key={st.num}
              className={`p-3 rounded-xl border-2 transition-all flex flex-col justify-between ${
                isCurrent
                  ? 'border-indigo-600 bg-indigo-50/80 shadow-xs ring-2 ring-indigo-200'
                  : isDone
                  ? 'border-emerald-400 bg-emerald-50/50'
                  : 'border-slate-200 bg-white opacity-50'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="font-bold text-slate-600">PHASE 0{st.num}</span>
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                  ) : null}
                </div>
                <h5 className="text-xs font-bold text-slate-900">{st.title}</h5>
                <p className="text-[10px] text-slate-600 leading-relaxed">{st.desc}</p>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-200 text-[10px] font-mono font-semibold">
                {isDone ? (
                  <span className="text-emerald-700">Executed ✓</span>
                ) : isCurrent ? (
                  <span className="text-indigo-700 animate-pulse">Running Now...</span>
                ) : (
                  <span className="text-slate-400">Standby</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Playbook Live Console Log */}
      <div className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-[11px] space-y-1 overflow-x-auto">
        <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1 text-[10px]">
          <span>EXECUTION CONSOLE LOG (UTC 10:32:15)</span>
          <span className="text-emerald-400">PLAYBOOK HEALTH: OPTIMAL</span>
        </div>
        <p className="text-emerald-400 font-semibold">
          [XSOAR-AGENT] Task &quot;{steps[stage - 1]?.title}&quot; in progress...
        </p>
        <p className="text-slate-300">
          Telemetry &gt; Target: Finance01 | Host: FIN-PC-04 | Correlation Rule: R-AUTH-09
        </p>
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 1.3: Technology — The Big Four Tools Suite
// =========================================================================
export function Topic13ToolScreen({ stage }: ToolScreenProps) {
  const tools = [
    {
      id: 1,
      name: 'Overview',
      type: 'Architecture',
      tool: 'FinCorp SecOps Unified Architecture',
      detail: 'Centralized visibility across SIEM, EDR, NDR, and SOAR pipelines.',
      icon: Layers,
    },
    {
      id: 2,
      name: 'SIEM Console',
      type: 'Log Correlation',
      tool: 'Splunk Enterprise Security',
      detail: 'Aggregates 45,000 EPS from firewalls, active directory, and proxy servers.',
      icon: Activity,
    },
    {
      id: 3,
      name: 'EDR Console',
      type: 'Endpoint Forensics',
      tool: 'CrowdStrike Falcon Insight',
      detail: 'Kernel-level process tracking, memory inspection, and 1-click host isolation.',
      icon: Terminal,
    },
    {
      id: 4,
      name: 'NDR Console',
      type: 'Network Detection',
      tool: 'Zeek / Corelight Network Sensor',
      detail: 'Deep packet inspection, protocol decoding, and lateral movement detection.',
      icon: Radio,
    },
    {
      id: 5,
      name: 'SOAR Console',
      type: 'Automated Response',
      tool: 'Cortex XSOAR Orchestrator',
      detail: 'Automated containment playbooks, threat intelligence enrichment, and ticketing.',
      icon: Server,
    },
  ];

  const activeTool = tools[Math.min(stage - 1, tools.length - 1)];
  const ActiveIcon = activeTool.icon;

  return (
    <div className="space-y-4">
      {/* Tool Navigation Bar */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-100 border border-slate-200 overflow-x-auto text-xs">
        {tools.map((t) => (
          <div
            key={t.id}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
              stage === t.id
                ? 'bg-white text-slate-900 shadow-xs border border-slate-300'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <t.icon className={`w-3.5 h-3.5 ${stage === t.id ? 'text-blue-600' : 'text-slate-400'}`} />
            <span>{t.name}</span>
          </div>
        ))}
      </div>

      {/* Simulated Tool Interface Display */}
      <div className="p-4 rounded-xl border-2 border-slate-200 bg-white space-y-3 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ActiveIcon className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">{activeTool.tool}</h4>
              <span className="text-[11px] text-slate-500 font-mono">Category: {activeTool.type}</span>
            </div>
          </div>
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-300 text-xs font-mono">
            ● CONNECTED & ACTIVE
          </Badge>
        </div>

        <p className="text-xs text-slate-600">{activeTool.detail}</p>

        {/* Mock Data Pane inside Tool */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase">Telemetry Ingestion</span>
            <span className="font-bold text-slate-800">45,210 Events / Sec</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase">Asset Monitored</span>
            <span className="font-bold text-slate-800">FIN-PC-04 (10.10.20.15)</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase">Integration Hook</span>
            <span className="font-bold text-blue-700">REST API v2 (Mutual TLS)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 1.4: Data Flow — Telemetry Pipeline Architecture Monitor
// =========================================================================
export function Topic14ToolScreen({ stage }: ToolScreenProps) {
  const hops = [
    { id: 1, label: 'Workstation FIN-PC-04', sub: 'Event 4625 generated in Security.evtx', tech: 'Windows OS' },
    { id: 2, label: 'Splunk Universal Forwarder', sub: 'Encrypted TLS 1.3 shipping to port 9997', tech: 'Log Shipper' },
    { id: 3, label: 'Heavy Forwarder Normalizer', sub: 'Parsing JSON & CIM field extraction', tech: 'CIM Parser' },
    { id: 4, label: 'SIEM Correlation Engine', sub: 'Rule R-BRUTE-04 triggers alert ALT-2026-04', tech: 'Splunk Core' },
    { id: 5, label: 'L1 Analyst Triage Queue', sub: 'Ticket dispatches with 15m SLA timer', tech: 'Queue UI' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100/90 border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-600" />
          <span className="font-bold text-slate-900">Splunk Telemetry Data Pipeline Architecture</span>
          <Badge className="bg-emerald-600 text-white text-[10px]">Real-Time Flow Monitor</Badge>
        </div>
        <span className="font-mono text-slate-500">Latency: 420ms End-to-End</span>
      </div>

      {/* Horizontal Pipeline Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {hops.map((h) => {
          const isCurrent = stage === h.id;
          const isPassed = stage > h.id;

          return (
            <motion.div
              key={h.id}
              animate={{ scale: isCurrent ? 1.03 : 1 }}
              className={`p-3 rounded-xl border-2 transition-all flex flex-col justify-between ${
                isCurrent
                  ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-200'
                  : isPassed
                  ? 'border-slate-300 bg-white'
                  : 'border-slate-200 bg-slate-50/50 opacity-60'
              }`}
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500 block">Hop 0{h.id}</span>
                <h5 className="text-xs font-bold text-slate-900 leading-tight">{h.label}</h5>
                <p className="text-[10px] text-slate-600 leading-snug">{h.sub}</p>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-500">{h.tech}</span>
                {isCurrent && <span className="text-emerald-700 font-bold animate-pulse">FLOWING</span>}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-300">
            Packet Trace: <span className="text-emerald-400 font-bold">{hops[stage - 1]?.label}</span> — Telemetry actively parsed.
          </span>
        </div>
        <span className="text-slate-400 text-[10px]">HOP {stage} OF 5</span>
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 2.1: Alerts & Events — Raw Telemetry vs Actionable Alert
// =========================================================================
export function Topic21ToolScreen({ stage }: ToolScreenProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100/90 border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-blue-600" />
          <span className="font-bold text-slate-900">Splunk ES: Search & Reporting vs Incident Review</span>
          <Badge variant="outline" className="bg-white text-slate-700 border-slate-300 text-[10px]">
            Log Stream &gt; Correlation Rule
          </Badge>
        </div>
        <span className="font-mono text-slate-500">2,410 Events Ingested | 1 Alert Generated</span>
      </div>

      {/* Split Comparison Screen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Raw Events Table */}
        <div className={`p-3.5 rounded-xl border-2 transition-all ${stage <= 2 ? 'border-blue-400 bg-blue-50/20' : 'border-slate-200 bg-white'}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-slate-500" />
              Raw Event Telemetry (99.9% Noise)
            </span>
            <span className="text-[10px] font-mono text-slate-500">index=security</span>
          </div>
          <div className="space-y-1.5 font-mono text-[10px] text-slate-600">
            <div className="p-1.5 rounded bg-slate-100/70 border border-slate-200/80">
              10:31:22 UTC | Event 4625 | User: Finance01 | Host: FIN-PC-04 | 0xC000006A (Bad Password)
            </div>
            <div className="p-1.5 rounded bg-slate-100/70 border border-slate-200/80">
              10:31:28 UTC | Event 4625 | User: Finance01 | Host: FIN-PC-04 | 0xC000006A (Bad Password)
            </div>
            <div className="p-1.5 rounded bg-slate-100/70 border border-slate-200/80">
              10:31:34 UTC | Event 4625 | User: Finance01 | Host: FIN-PC-04 | 0xC000006A (Bad Password)
            </div>
            <div className="p-1.5 rounded bg-slate-100/70 border border-slate-200/80">
              10:31:40 UTC | Event 4624 | User: Finance01 | Host: FIN-PC-04 | 0x0 (Logon Success!)
            </div>
          </div>
        </div>

        {/* Right: The Correlated Actionable Alert */}
        <div className={`p-3.5 rounded-xl border-2 transition-all ${stage >= 3 ? 'border-rose-400 bg-rose-50/20 ring-2 ring-rose-200' : 'border-slate-200 bg-white opacity-60'}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              Actionable Security Alert (ALT-2026-04)
            </span>
            <Badge className="bg-rose-600 text-white text-[10px]">P2 HIGH</Badge>
          </div>
          <div className="space-y-2 text-xs">
            <p className="text-slate-800 font-semibold">
              Rule Match: 8 Failed Logins Followed by Success within 60s
            </p>
            <div className="p-2 rounded-lg bg-white border border-rose-200 space-y-1 text-[11px] font-mono">
              <div>Target Entity: <span className="font-bold text-slate-900">Finance01 @ FIN-PC-04</span></div>
              <div>Source IP: <span className="font-bold text-rose-700">198.51.100.25 (Tor Exit)</span></div>
              <div>SLA Deadline: <span className="font-bold text-slate-900">60 Minutes</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 2.2: Incidents & Cases — ServiceNow SecOps Case Management
// =========================================================================
export function Topic22ToolScreen({ stage }: ToolScreenProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100/90 border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-600" />
          <span className="font-bold text-slate-900">ServiceNow SecOps: Case File #CASE-2026-04</span>
          <Badge className="bg-purple-600 text-white text-[10px]">Investigation Record</Badge>
        </div>
        <span className="font-mono text-slate-500">Opened: Today 10:32 UTC</span>
      </div>

      <div className="p-4 rounded-xl border-2 border-slate-200 bg-white space-y-3 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div>
            <h4 className="text-sm font-bold text-slate-900">CASE-2026-04: Credential Compromise on FIN-PC-04</h4>
            <span className="text-[11px] text-slate-500">Assigned To: L1 Analyst Sarah Chen | Owner: FinCorp SOC</span>
          </div>
          <Badge className="bg-amber-100 text-amber-800 border-amber-300 font-mono text-xs">
            {stage === 5 ? 'STATUS: CLOSED' : 'STATUS: IN PROGRESS'}
          </Badge>
        </div>

        {/* Case Timeline Stream */}
        <div className="space-y-2 text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Investigation Chronology (Audit Trail)
          </span>
          <div className="space-y-1.5 font-mono text-[11px]">
            <div className={`p-2 rounded border ${stage >= 1 ? 'bg-slate-50 border-slate-300 text-slate-800' : 'opacity-40'}`}>
              [10:31:40 UTC] Ingestion: Event 4625 brute force sequence correlated from FIN-PC-04.
            </div>
            <div className={`p-2 rounded border ${stage >= 2 ? 'bg-slate-50 border-slate-300 text-slate-800' : 'opacity-40'}`}>
              [10:33:10 UTC] Triage: Tor exit IP 198.51.100.25 confirmed via Threat Intelligence.
            </div>
            <div className={`p-2 rounded border ${stage >= 3 ? 'bg-slate-50 border-slate-300 text-slate-800' : 'opacity-40'}`}>
              [10:35:00 UTC] Escalation: L1 handoff to L2 Incident Response; EDR isolation initiated.
            </div>
            <div className={`p-2 rounded border ${stage >= 4 ? 'bg-slate-50 border-slate-300 text-slate-800' : 'opacity-40'}`}>
              [10:42:00 UTC] Containment: Host isolated, user Finance01 password reset, tickets attached.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 3.1: Alert Triage — Microsoft Sentinel Triage Console
// =========================================================================
export function Topic31ToolScreen({ stage }: ToolScreenProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100/90 border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-blue-600" />
          <span className="font-bold text-slate-900">Microsoft Sentinel: Incident Triage Workbench</span>
          <Badge variant="outline" className="bg-white text-slate-700 border-slate-300 text-[10px]">
            Incident #9042
          </Badge>
        </div>
        <span className="font-mono text-slate-500">Triage SLA: 15m (11m Remaining)</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* Entity 1: User */}
        <motion.div animate={{ scale: stage === 2 ? 1.03 : 1 }} className={`p-3 rounded-xl border-2 bg-white ${stage === 2 ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-200'}`}>
          <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Target Account</span>
          <h5 className="font-bold text-slate-900 text-sm">Finance01</h5>
          <p className="text-[11px] text-slate-600 mt-1">Role: Corporate Payroll Officer</p>
          <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] mt-2">Sensitive Role</Badge>
        </motion.div>

        {/* Entity 2: Host */}
        <motion.div animate={{ scale: stage === 3 ? 1.03 : 1 }} className={`p-3 rounded-xl border-2 bg-white ${stage === 3 ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-slate-200'}`}>
          <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Target Workstation</span>
          <h5 className="font-bold text-slate-900 text-sm">FIN-PC-04</h5>
          <p className="text-[11px] text-slate-600 mt-1">IP: 10.10.20.15 (Finance VLAN)</p>
          <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 text-[10px] mt-2">EDR Sensor Active</Badge>
        </motion.div>

        {/* Entity 3: Source IP */}
        <motion.div animate={{ scale: stage === 4 ? 1.03 : 1 }} className={`p-3 rounded-xl border-2 bg-white ${stage === 4 ? 'border-rose-500 ring-2 ring-rose-200' : 'border-slate-200'}`}>
          <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Source IP Address</span>
          <h5 className="font-bold text-rose-700 text-sm">198.51.100.25</h5>
          <p className="text-[11px] text-slate-600 mt-1">Threat Intel: Tor Exit Node (100% Rep)</p>
          <Badge className="bg-rose-50 text-rose-700 border-rose-200 text-[10px] mt-2">Malicious Proxy</Badge>
        </motion.div>
      </div>

      {/* Decision Banner */}
      <div className="p-3 rounded-xl bg-slate-900 text-slate-100 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>TRIAGE CONCLUSION: Confirmed True Positive brute-force intrusion.</span>
        </div>
        <span className="text-emerald-400 font-bold uppercase">Ready for Escalation</span>
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 3.2: Check Evidence — CrowdStrike Falcon Host Investigation
// =========================================================================
export function Topic32ToolScreen({ stage }: ToolScreenProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100/90 border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-rose-600" />
          <span className="font-bold text-slate-900">CrowdStrike Falcon: Endpoint Host Telemetry &amp; Process Tree</span>
          <Badge className="bg-rose-600 text-white text-[10px]">Host: FIN-PC-04</Badge>
        </div>
        <span className="font-mono text-slate-500">Agent: Online (Isolated)</span>
      </div>

      {/* Process Tree Hierarchy */}
      <div className="p-4 rounded-xl border-2 border-slate-200 bg-white space-y-3 text-xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
          Process Execution Hierarchy (Sysmon Event ID 1 &amp; EDR)
        </span>

        <div className="space-y-2 font-mono text-[11px]">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="text-slate-400">├─</span>
            <span className="px-2 py-1 rounded bg-slate-100 border border-slate-200">wininit.exe (PID 620)</span>
            <span className="text-slate-400 text-[10px]">SYSTEM Root</span>
          </div>
          <div className="flex items-center gap-2 pl-4 text-slate-600">
            <span className="text-slate-400">└─</span>
            <span className="px-2 py-1 rounded bg-slate-100 border border-slate-200">services.exe (PID 748)</span>
            <span className="text-slate-400 text-[10px]">Service Control Manager</span>
          </div>
          <div className="flex items-center gap-2 pl-8 text-slate-900">
            <span className="text-slate-400">└─</span>
            <span className="px-2 py-1 rounded bg-blue-50 border border-blue-300 font-bold text-blue-900">
              lsass.exe (PID 812)
            </span>
            <span className="text-slate-500 text-[10px]">Handling NTLM Auth Verification</span>
          </div>
          <div className="flex items-center gap-2 pl-12">
            <span className="text-slate-400">└─</span>
            <span className="px-2 py-1 rounded bg-rose-50 border border-rose-300 font-bold text-rose-800 animate-pulse">
              Logon Event: RemoteInteractive (LogonType 10) from 198.51.100.25
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 4.1: False Positives — Alert Verification Workbench
// =========================================================================
export function Topic41ToolScreen({ stage }: ToolScreenProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100/90 border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-600" />
          <span className="font-bold text-slate-900">FinCorp Alert Verification: True Positive vs False Positive</span>
          <Badge className="bg-emerald-600 text-white text-[10px]">Cross-Check Engine</Badge>
        </div>
        <span className="font-mono text-slate-500">Audit Reference: CHG-9901</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Scenario 1: Nessus Scanner (False Positive) */}
        <div className="p-4 rounded-xl border-2 border-emerald-300 bg-emerald-50/30 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-emerald-950">Alert ALT-109: Port Scan 10.0.99.10</span>
            <Badge className="bg-emerald-600 text-white text-[10px]">FALSE POSITIVE</Badge>
          </div>
          <p className="text-slate-700 text-[11px]">
            Activity matches approved change ticket <strong>CHG-9901</strong>. Authorized weekly vulnerability scanner.
          </p>
          <div className="p-2 rounded bg-white border border-emerald-200 text-[10px] font-mono text-emerald-900">
            Action: Close as False Positive (Expected System Activity)
          </div>
        </div>

        {/* Scenario 2: Active Compromise (True Positive) */}
        <div className="p-4 rounded-xl border-2 border-rose-300 bg-rose-50/30 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-rose-950">Alert ALT-204: Off-Hours Remote Access</span>
            <Badge className="bg-rose-600 text-white text-[10px]">TRUE POSITIVE</Badge>
          </div>
          <p className="text-slate-700 text-[11px]">
            No change ticket found. Authentication occurs at 02:40 AM from Tor exit node to payroll workstation.
          </p>
          <div className="p-2 rounded bg-white border border-rose-200 text-[10px] font-mono text-rose-900">
            Action: Escalate to Tier 2 &amp; Isolate Host Immediately
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 4.2: Detection Errors — SIEM Rule IDE & Noise Tuner
// =========================================================================
export function Topic42ToolScreen({ stage }: ToolScreenProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100/90 border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-purple-600" />
          <span className="font-bold text-slate-900">Splunk Correlation Rule Tuner &amp; Exclusion Filter</span>
          <Badge className="bg-purple-600 text-white text-[10px]">Rule ID: R-PORT-SCAN</Badge>
        </div>
        <span className="font-mono text-slate-500">False-Positive Tuning</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* Before: Overly Broad Flawed Rule */}
        <div className="p-3.5 rounded-xl border-2 border-rose-200 bg-rose-50/30 space-y-2">
          <span className="font-bold text-rose-950 block text-[11px]">Before Tuning (Flawed Threshold)</span>
          <div className="p-2.5 rounded-lg bg-slate-900 text-rose-300 font-mono text-[10px] leading-relaxed">
            index=firewall action=drop | stats count by src_ip | where count &gt; 100
          </div>
          <span className="text-[10px] text-rose-800 font-semibold block">Result: 1,420 Alerts / Week (98% Noise)</span>
        </div>

        {/* After: Tuned Exclusion Rule */}
        <div className="p-3.5 rounded-xl border-2 border-emerald-200 bg-emerald-50/30 space-y-2">
          <span className="font-bold text-emerald-950 block text-[11px]">After Tuning (Exclusion Filter Added)</span>
          <div className="p-2.5 rounded-lg bg-slate-900 text-emerald-300 font-mono text-[10px] leading-relaxed">
            index=firewall action=drop NOT (src_ip=&quot;10.0.99.10&quot; AND dest_port=445) | stats count by src_ip | where count &gt; 500
          </div>
          <span className="text-[10px] text-emerald-800 font-semibold block">Result: 14 Alerts / Week (100% High Fidelity)</span>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 5.1: Severity — SOC Queue Prioritization & SLA Radar
// =========================================================================
export function Topic51ToolScreen({ stage }: ToolScreenProps) {
  const queue = [
    { p: 'P1 - CRITICAL', name: 'Ransomware Encryption on DC-01', sla: '15 Mins', time: '11m remaining', color: 'bg-rose-100 text-rose-800 border-rose-300' },
    { p: 'P2 - HIGH', name: 'Credential Compromise on FIN-PC-04', sla: '60 Mins', time: '48m remaining', color: 'bg-orange-100 text-orange-800 border-orange-300' },
    { p: 'P3 - MEDIUM', name: 'Unapproved USB Mass Storage on WS-12', sla: '4 Hours', time: '3h 15m remaining', color: 'bg-amber-100 text-amber-800 border-amber-300' },
    { p: 'P4 - LOW', name: 'External Port Probe on Edge Firewall', sla: '24 Hours', time: '21h remaining', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100/90 border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-orange-600" />
          <span className="font-bold text-slate-900">FinCorp SOC Live Triage Queue (SLA Prioritization)</span>
          <Badge className="bg-orange-600 text-white text-[10px]">Live SLA Radar</Badge>
        </div>
        <span className="font-mono text-slate-500">4 Items in Triage Queue</span>
      </div>

      <div className="space-y-2">
        {queue.map((item, idx) => (
          <div
            key={item.p}
            className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
              stage === idx + 1 ? 'border-orange-500 bg-orange-50/40 ring-2 ring-orange-200' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Badge variant="outline" className={`font-mono text-[10px] font-bold ${item.color}`}>
                {item.p}
              </Badge>
              <span className="font-bold text-slate-900">{item.name}</span>
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px]">
              <span className="text-slate-500">SLA: {item.sla}</span>
              <span className="font-bold text-slate-800">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 5.2: Severity — Impact & Confidence Calculation Engine
// =========================================================================
export function Topic52ToolScreen({ stage }: ToolScreenProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100/90 border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-600" />
          <span className="font-bold text-slate-900">Cyber Risk &amp; Severity Calculation Engine</span>
          <Badge className="bg-indigo-600 text-white text-[10px]">Formula: Impact × Confidence</Badge>
        </div>
        <span className="font-mono text-slate-500">Target: FIN-PC-04</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border-2 border-indigo-200 bg-indigo-50/30 space-y-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Factor 1: Asset Impact</span>
          <h5 className="font-bold text-indigo-950 text-sm">HIGH (4 / 5)</h5>
          <p className="text-[11px] text-slate-600">Workstation stores payroll and corporate banking credentials.</p>
        </div>

        <div className="p-3.5 rounded-xl border-2 border-rose-200 bg-rose-50/30 space-y-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Factor 2: Threat Confidence</span>
          <h5 className="font-bold text-rose-950 text-sm">HIGH (5 / 5)</h5>
          <p className="text-[11px] text-slate-600">Confirmed Tor exit node and interactive Event 4624 success.</p>
        </div>

        <div className="p-3.5 rounded-xl border-2 border-emerald-300 bg-emerald-50/40 space-y-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Resulting Classification</span>
          <h5 className="font-bold text-emerald-950 text-sm">SEVERITY: HIGH (P2)</h5>
          <p className="text-[11px] text-emerald-800 font-semibold">Mandatory 1-Hour SLA Containment Window</p>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 6.1: Escalation — L1 to L2 Handover Workflow
// =========================================================================
export function Topic61ToolScreen({ stage }: ToolScreenProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100/90 border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-600" />
          <span className="font-bold text-slate-900">Jira Service Management: Ticket Transfer Modal</span>
          <Badge className="bg-blue-600 text-white text-[10px]">Ticket SEC-2026-04</Badge>
        </div>
        <span className="font-mono text-slate-500">L1 &gt; L2 Escalation</span>
      </div>

      <div className="p-4 rounded-xl border-2 border-slate-200 bg-white space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div>
            <h5 className="font-bold text-slate-900">Escalate Alert ALT-2026-04 to Tier 2 (Incident Response)</h5>
            <span className="text-[11px] text-slate-500">Current Assignee: Sarah Chen (L1) &gt; Target Pool: Tier 2 IR</span>
          </div>
          <Badge className="bg-blue-50 text-blue-700 border-blue-200">READY TO DISPATCH</Badge>
        </div>

        <div className="space-y-2 font-mono text-[11px]">
          <div className="p-2 rounded bg-slate-50 border border-slate-200">
            <strong>Attached IOCs:</strong> IP 198.51.100.25 (Tor), User Finance01, Host FIN-PC-04
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200">
            <strong>EDR Containment:</strong> Host Isolated at 10:35 UTC ✓ | Process Tree Dump Attached ✓
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200">
            <strong>Analyst Notes:</strong> Brute force succeeded on payroll asset; need credential purge and memory triage.
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 6.2: Escalation — Multi-Department Crisis Notification Portal
// =========================================================================
export function Topic62ToolScreen({ stage }: ToolScreenProps) {
  const depts = [
    { name: 'Legal & Privacy Counsel', task: 'GDPR 72-Hour Breach Notification Readiness', status: 'Dispatched ✓' },
    { name: 'Network Infrastructure', task: 'Emergency BGP Null-Route on Perimeter Routers', status: 'In Progress...' },
    { name: 'Public Relations / Media', task: 'Hold-Statement & Executive Crisis Briefing', status: 'Standby' },
    { name: 'Human Resources', task: 'Employee Finance01 Identity Verification', status: 'Acknowledged ✓' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100/90 border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-purple-600" />
          <span className="font-bold text-slate-900">Enterprise Crisis Notification &amp; Escalation Portal</span>
          <Badge className="bg-purple-600 text-white text-[10px]">Multi-Channel Dispatch</Badge>
        </div>
        <span className="font-mono text-slate-500">Incident Severity: High</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {depts.map((d, i) => (
          <div
            key={d.name}
            className={`p-3.5 rounded-xl border-2 transition-all ${
              stage === i + 1 ? 'border-purple-500 bg-purple-50/40 ring-2 ring-purple-200' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <h5 className="font-bold text-slate-900">{d.name}</h5>
              <Badge variant="outline" className="text-[10px] font-mono">
                {d.status}
              </Badge>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">{d.task}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 7.1: Documentation — The 5-Pillar Incident Report Generator
// =========================================================================
export function Topic71ToolScreen({ stage }: ToolScreenProps) {
  const pillars = [
    { id: 1, title: '1. Executive Summary', desc: 'Root cause summary: Brute force credential cracking on FIN-PC-04.' },
    { id: 2, title: '2. Forensic Evidence', desc: 'Hashes, Tor IP 198.51.100.25, Sysmon logs, and NTLM event 4625 sequence.' },
    { id: 3, title: '3. Chronological Timeline', desc: 'UTC timeline from first probe (10:31) to host isolation (10:35).' },
    { id: 4, title: '4. Containment Actions Taken', desc: 'Workstation isolated, active Kerberos tickets purged, password reset.' },
    { id: 5, title: '5. Remediation Recommendations', desc: 'Reduce account lockout threshold from 10 to 5 attempts via GPO.' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100/90 border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-emerald-600" />
          <span className="font-bold text-slate-900">FinCorp SOC Incident Documentation Suite</span>
          <Badge className="bg-emerald-600 text-white text-[10px]">5-Pillar Audit Report</Badge>
        </div>
        <span className="font-mono text-slate-500">Report Status: Compiling</span>
      </div>

      <div className="space-y-2">
        {pillars.map((p) => {
          const isDone = stage >= p.id;
          const isCurrent = stage === p.id;

          return (
            <div
              key={p.id}
              className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                isCurrent
                  ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-200'
                  : isDone
                  ? 'border-slate-300 bg-white'
                  : 'border-slate-200 bg-slate-50/50 opacity-50'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <div className="w-4 h-4 rounded-full border border-slate-300" />}
                  <h5 className="font-bold text-slate-900">{p.title}</h5>
                </div>
                <p className="text-[11px] text-slate-600 pl-6">{p.desc}</p>
              </div>
              <Badge variant="outline" className="font-mono text-[10px]">
                {isDone ? 'AUDIT READY ✓' : 'PENDING'}
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 7.2: Closure & PIR — Post-Incident Review & Resolution Dashboard
// =========================================================================
export function Topic72ToolScreen({ stage }: ToolScreenProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100/90 border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="font-bold text-slate-900">Post-Incident Review (PIR) &amp; Formal Case Closure</span>
          <Badge className="bg-emerald-600 text-white text-[10px]">Case Resolved</Badge>
        </div>
        <span className="font-mono text-slate-500">PIR Approval: Completed</span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3 rounded-xl bg-white border border-slate-200">
          <span className="text-slate-400 block text-[10px] uppercase">Mean Time to Detect (MTTD)</span>
          <span className="text-sm font-bold text-emerald-600">4 Minutes (Target &lt; 15m)</span>
        </div>
        <div className="p-3 rounded-xl bg-white border border-slate-200">
          <span className="text-slate-400 block text-[10px] uppercase">Mean Time to Respond (MTTR)</span>
          <span className="text-sm font-bold text-emerald-600">11 Minutes (Target &lt; 60m)</span>
        </div>
        <div className="p-3 rounded-xl bg-white border border-slate-200">
          <span className="text-slate-400 block text-[10px] uppercase">SLA Compliance</span>
          <span className="text-sm font-bold text-blue-600">100% Policy Adherence</span>
        </div>
      </div>

      {/* Resolution Stamp Banner */}
      <div className="p-4 rounded-xl border-2 border-emerald-300 bg-emerald-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="space-y-1">
          <h5 className="font-bold text-emerald-950 text-sm">
            CASE #CASE-2026-04 OFFICIALLY CLOSED — ROOT CAUSE REMEDIATED
          </h5>
          <p className="text-emerald-800 text-[11px]">
            Workstation reimaged and clean. GPO lockout threshold reduced. Threat signature deployed enterprise-wide.
          </p>
        </div>
        <Badge className="bg-emerald-600 text-white text-xs px-3 py-1 font-bold shrink-0">
          CLOSED &amp; ARCHIVED ✓
        </Badge>
      </div>
    </div>
  );
}

// =========================================================================
// Master Switcher Component for Real-World Tool Screens
// =========================================================================
interface RealWorldToolScreenProps {
  topicId: string;
  stage: number;
}

export function RealWorldToolScreen({ topicId, stage }: RealWorldToolScreenProps) {
  switch (topicId) {
    case 'topic-1-1':
      return <Topic11ToolScreen stage={stage} />;
    case 'topic-1-2':
      return <Topic12ToolScreen stage={stage} />;
    case 'topic-1-3':
      return <Topic13ToolScreen stage={stage} />;
    case 'topic-1-4':
      return <Topic14ToolScreen stage={stage} />;
    case 'topic-2-1':
      return <Topic21ToolScreen stage={stage} />;
    case 'topic-2-2':
      return <Topic22ToolScreen stage={stage} />;
    case 'topic-3-1':
      return <Topic31ToolScreen stage={stage} />;
    case 'topic-3-2':
      return <Topic32ToolScreen stage={stage} />;
    case 'topic-4-1':
      return <Topic41ToolScreen stage={stage} />;
    case 'topic-4-2':
      return <Topic42ToolScreen stage={stage} />;
    case 'topic-5-1':
      return <Topic51ToolScreen stage={stage} />;
    case 'topic-5-2':
      return <Topic52ToolScreen stage={stage} />;
    case 'topic-6-1':
      return <Topic61ToolScreen stage={stage} />;
    case 'topic-6-2':
      return <Topic62ToolScreen stage={stage} />;
    case 'topic-7-1':
      return <Topic71ToolScreen stage={stage} />;
    case 'topic-7-2':
      return <Topic72ToolScreen stage={stage} />;
    default:
      return <Topic11ToolScreen stage={stage} />;
  }
}
