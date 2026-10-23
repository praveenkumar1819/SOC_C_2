'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { sound } from '@/lib/sound-effects';
import {
  socHierarchyNodes,
  escalationTriggersNodes,
  shiftWheelNodes,
  queueIngestionNodes,
  ticketLifecycleNodes,
  slaMonitorNodes,
  eventVsAlertNodes,
  ruleLogicNodes,
  verdictTrapNodes,
  taxonomyQuadNodes,
  caseAggregationNodes,
  evidenceVaultNodes,
  fiveWsNodes,
  aggregationCounterNodes,
  forensicHonestyNodes,
  dispositionTreeNodes,
  handoverNoteNodes,
  evidencePackageNodes,
  VisualNodeItem,
} from './module-04-visual-stories';
import {
  Users,
  UserCheck,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Clock,
  Activity,
  AlertTriangle,
  AlertOctagon,
  Check,
  CheckCircle2,
  ListOrdered,
  Inbox,
  Play,
  RotateCcw,
  FileText,
  FileSpreadsheet,
  Key,
  Lock,
  Search,
  Filter,
  Compass,
  Database,
  HardDrive,
  Terminal,
  Laptop,
  Sliders,
  Boxes,
  Workflow,
  ArrowRight,
  Ban,
  CheckCheck,
  EyeOff,
  HelpCircle,
} from 'lucide-react';

interface Module04GraphicRendererProps {
  style: string;
  selectedNodeId: string;
  onSelectNode: (node: VisualNodeItem) => void;
  animStep: number;
}

export function Module04GraphicRenderer({
  style,
  selectedNodeId,
  onSelectNode,
  animStep,
}: Module04GraphicRendererProps) {
  // Interactive test states for Module 04 scenarios
  const [selectedHierarchyTier, setSelectedHierarchyTier] = useState<number>(1);
  const [isEscalatedToLead, setIsEscalatedToLead] = useState<boolean>(false);
  const [selectedShiftRotation, setSelectedShiftRotation] = useState<'day' | 'eve' | 'night'>('night');
  const [isAlertClaimed, setIsAlertClaimed] = useState<boolean>(false);
  const [ticketLifecycleStep, setTicketLifecycleStep] = useState<number>(1);
  const [activeSlaCategory, setActiveSlaCategory] = useState<'sev1' | 'sev2' | 'sev3' | 'sev4'>('sev1');
  const [eventFilterRatio, setEventFilterRatio] = useState<number>(1000); // 1,000,000 to 1 alert
  const [isWeekendSimulated, setIsWeekendSimulated] = useState<boolean>(true);
  const [activeBiasTrap, setActiveBiasTrap] = useState<'theory' | 'fact'>('fact');
  const [selectedTaxonomyQuadrant, setSelectedTaxonomyQuadrant] = useState<'tp' | 'fp' | 'tn' | 'fn'>('tp');
  const [isCaseAggregated, setIsCaseAggregated] = useState<boolean>(true);
  const [isMemoryDumpExtracted, setIsMemoryDumpExtracted] = useState<boolean>(false);
  const [selectedFiveW, setSelectedFiveW] = useState<'who' | 'what' | 'when' | 'where' | 'why'>('who');
  const [isDeduplicationActive, setIsDeduplicationActive] = useState<boolean>(true);
  const [viewUnknownsLedger, setViewUnknownsLedger] = useState<boolean>(true);
  const [selectedDisposition, setSelectedDisposition] = useState<'fp' | 'tp_contained' | 'tp_escalated' | 'auth_change'>('tp_contained');
  const [handoverSection, setHandoverSection] = useState<'headline' | 'chronology' | 'actions' | 'open_questions'>('headline');
  const [isLeadSignedOff, setIsLeadSignedOff] = useState<boolean>(false);

  // Helper to render the active inspection drawer at the bottom of each diagram
  const renderInspector = (node: VisualNodeItem | undefined) => {
    if (!node) return null;
    return (
      <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-slate-900/95 via-[#081533]/90 to-slate-900/95 border border-sky-500/30 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-3 text-left">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
              INSPECTED NODE:
            </span>
            <span className="text-sm font-bold text-white">{node.label}</span>
            {node.badge && (
              <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-[10px] font-mono">
                {node.badge}
              </Badge>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{node.description}</p>
          {node.details && (
            <p className="text-[11px] sm:text-xs text-sky-300/90 font-mono pt-0.5">{node.details}</p>
          )}
        </div>
        <div className="shrink-0 flex items-center gap-1.5 flex-wrap">
          {node.tags?.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700 text-[10px] font-mono text-slate-300"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // ---------------------------------------------------------------------------
  // 1. SOC Tiered Escalation Hierarchy (M04-U1-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm04-soc-hierarchy') {
    const nodes = socHierarchyNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-sky-400" />
                <span>SOC Tiered Escalation Hierarchy &amp; Operational Roles</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Front-line L1 triage analysts, L2 incident responders, L3 threat hunters, and Shift Lead Mentor Ananya.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedHierarchyTier(tier);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold border transition-all ${
                    selectedHierarchyTier === tier
                      ? 'bg-sky-500 text-slate-950 border-sky-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {tier === 4 ? 'Lead' : `Tier ${tier}`}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-400 text-slate-950 font-bold' : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'tier-l1' && <UserCheck className="w-6 h-6 text-sky-400" />}
                      {node.id === 'tier-l2' && <Search className="w-6 h-6 text-indigo-400" />}
                      {node.id === 'tier-l3' && <Activity className="w-6 h-6 text-purple-400" />}
                      {node.id === 'tier-mgr' && <ShieldCheck className="w-6 h-6 text-amber-400" />}
                    </div>
                    {node.badge && (
                      <Badge variant="outline" className="text-[10px] font-mono border-sky-500/30 text-sky-300">
                        {node.badge}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-white">{node.label}</h5>
                    <p className="text-xs text-sky-300 font-mono">{node.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tier Responsibility Ladder HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">OPERATIONAL RESPONSIBILITY MATRIX</span>
              <span className="text-sky-300 font-bold">
                {selectedHierarchyTier === 1 && 'TIER 1 (YOU): ALERT INTAKE, 5 Ws SCOPING & BASIC ISOLATION'}
                {selectedHierarchyTier === 2 && 'TIER 2: FORENSIC ROOT CAUSE, MEMORY ANALYSIS & ENTERPRISE ERADICATION'}
                {selectedHierarchyTier === 3 && 'TIER 3: HYPOTHESIS THREAT HUNTING & CUSTOM YARA/SIGMA RULES'}
                {selectedHierarchyTier === 4 && 'SHIFT LEAD (ANANYA): INCIDENT COMMAND, SLA GOVERNANCE & BUSINESS COMMS'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#081533] border border-sky-500/30 text-xs sm:text-sm text-sky-200 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-bold">Mentor Ananya&apos;s Escalation Principle: </strong>
                &ldquo;Escalating a case is a professional duty, never a personal failure. The moment an alert involves multi-host lateral movement or domain controller tampering, our playbook mandates immediate warm handover to Tier 2.&rdquo;
              </div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 2. L1 Operational Boundaries & Escalation Triggers (M04-U1-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm04-escalation-triggers') {
    const nodes = escalationTriggersNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-sky-400" />
                <span>L1 Operational Authority Boundaries &amp; Escalation Triggers</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Knowing exactly what you are authorized to execute alone versus when immediate senior escalation is mandatory.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsEscalatedToLead(!isEscalatedToLead);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isEscalatedToLead ? 'bg-rose-600 text-white border-rose-400 shadow-md animate-pulse' : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{isEscalatedToLead ? 'WARM HANDOVER ESCALATED TO LEAD' : 'TEST LATERAL SPREAD ESCALATION'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-400 text-slate-950 font-bold' : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'esc-boundary' && <Shield className="w-6 h-6 text-sky-400" />}
                      {node.id === 'esc-trigger-mal' && <AlertOctagon className="w-6 h-6 text-rose-400" />}
                      {node.id === 'esc-trigger-dc' && <Key className="w-6 h-6 text-amber-400" />}
                      {node.id === 'esc-doc' && <FileSpreadsheet className="w-6 h-6 text-emerald-400" />}
                    </div>
                    {node.badge && (
                      <Badge variant="outline" className="text-[10px] font-mono border-sky-500/30 text-sky-300">
                        {node.badge}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-white">{node.label}</h5>
                    <p className="text-xs text-sky-300 font-mono">{node.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Decision Boundary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-1">
              <div className="text-emerald-300 font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Authorized Independent L1 Actions:</span>
              </div>
              <ul className="list-disc list-inside text-slate-300 text-xs space-y-0.5 pt-1">
                <li>Verify telemetry observables &amp; correlate 5 Ws.</li>
                <li>Close benign True Positives / approved maintenance as FP.</li>
                <li>Execute one-click network isolation on single workstation.</li>
                <li>Reach out to user to verify authorized software activity.</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/50 space-y-1">
              <div className="text-rose-300 font-bold flex items-center gap-2">
                <Ban className="w-4 h-4 text-rose-400" />
                <span>Forbidden Unilateral Actions (Must Escalate):</span>
              </div>
              <ul className="list-disc list-inside text-slate-300 text-xs space-y-0.5 pt-1">
                <li>Never shut down active Active Directory domain controllers.</li>
                <li>Never wipe or reimage disks before evidence acquisition.</li>
                <li>Never modify core perimeter firewall rules independently.</li>
                <li>Never confront an executive user with speculative theft claims.</li>
              </ul>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 3. The 24/7 SOC Shift Handover Wheel (M04-U1-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm04-shift-wheel') {
    const nodes = shiftWheelNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-400" />
                <span>The 24/7 SOC Shift Handover Wheel &amp; Operational Continuity</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Morning, evening, and nocturnal shifts: maintaining unbroken investigative fidelity across team transitions.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {(['day', 'eve', 'night'] as const).map((sh) => (
                <button
                  key={sh}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedShiftRotation(sh);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                    selectedShiftRotation === sh ? 'bg-sky-500 text-slate-950 border-sky-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {sh === 'day' ? 'Day (06:00)' : sh === 'eve' ? 'Eve (14:00)' : 'Night (22:00)'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-400 text-slate-950 font-bold' : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'shift-day' && <Clock className="w-6 h-6 text-amber-400" />}
                      {node.id === 'shift-eve' && <Clock className="w-6 h-6 text-sky-400" />}
                      {node.id === 'shift-night' && <Clock className="w-6 h-6 text-purple-400" />}
                      {node.id === 'shift-handover' && <CheckCheck className="w-6 h-6 text-emerald-400" />}
                    </div>
                    {node.badge && (
                      <Badge variant="outline" className="text-[10px] font-mono border-sky-500/30 text-sky-300">
                        {node.badge}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-white">{node.label}</h5>
                    <p className="text-xs text-sky-300 font-mono">{node.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Shift Profile HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">ROTATION PROFILE: {selectedShiftRotation.toUpperCase()} SHIFT</span>
              <span className="text-sky-300 font-bold">
                {selectedShiftRotation === 'day' && 'PEAK LOGON TRAFFIC • PHISHING INVESTIGATION • HIGH NOISE'}
                {selectedShiftRotation === 'eve' && 'CROSS-REGIONAL SYNCHRONIZATION • CASE INVESTIGATION CLOSURE'}
                {selectedShiftRotation === 'night' && 'LOW VOLUME • HIGH THREAT FIDELITY • OFF-HOURS SURVEILLANCE'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200">
              {selectedShiftRotation === 'night' && (
                <div>
                  <strong className="text-purple-300">Nocturnal Shift Operational Doctrine:</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    At 02:45 AM, legitimate branch office traffic drops to zero. Any outbound HTTPS beacon, port sweep, or PowerShell certutil command stands out with near-100% true-positive fidelity. Stay hyper-vigilant!
                  </p>
                </div>
              )}
              {selectedShiftRotation === 'day' && (
                <div>
                  <strong className="text-amber-300">Day Shift Operational Doctrine:</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    450 branch staff active simultaneously. High volume of user-reported emails and authorized administrative updates. Fast qualification is critical to prevent queue backlog.
                  </p>
                </div>
              )}
              {selectedShiftRotation === 'eve' && (
                <div>
                  <strong className="text-sky-300">Evening Shift Operational Doctrine:</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    Follow-up and correlation. Reviewing lingering cases from the day team and preparing clear 15-minute briefing dockets for the nocturnal incoming sentinels.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 4. Alert Queue Ingestion & Triaging Priority (M04-U1-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm04-queue-ingestion') {
    const nodes = queueIngestionNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Inbox className="w-5 h-5 text-sky-400" />
                <span>Alert Queue Ingestion &amp; Live Triage Prioritization</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Managing incoming SIEM alarms, claiming tickets, and preventing queue starvation using FIFO + severity weighting.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsAlertClaimed(!isAlertClaimed);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isAlertClaimed ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-sky-600 text-white border-sky-400 shadow-md'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isAlertClaimed ? 'ALERT CLAIMED: IN-PROGRESS (YOU)' : 'CLAIM TOP SEV-1 ALERT'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-400 text-slate-950 font-bold' : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'queue-sev1' && <AlertOctagon className="w-6 h-6 text-rose-400" />}
                      {node.id === 'queue-sev2' && <AlertTriangle className="w-6 h-6 text-amber-400" />}
                      {node.id === 'queue-sev3' && <Sliders className="w-6 h-6 text-yellow-400" />}
                      {node.id === 'queue-aging' && <Clock className="w-6 h-6 text-slate-400" />}
                    </div>
                    {node.badge && (
                      <Badge variant="outline" className="text-[10px] font-mono border-sky-500/30 text-sky-300">
                        {node.badge}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-white">{node.label}</h5>
                    <p className="text-xs text-sky-300 font-mono">{node.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Queue Ticket Ingestion Table */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-bold">ACTIVE SIEM ALERT INGESTION QUEUE</span>
              <span className="text-sky-300">UNASSIGNED: 3 • IN PROGRESS: {isAlertClaimed ? 1 : 0}</span>
            </div>

            <div className="space-y-1.5">
              <div className={`p-2.5 rounded-lg border flex items-center justify-between ${isAlertClaimed ? 'bg-sky-950/80 border-sky-400 text-white' : 'bg-rose-950/40 border-rose-500/40 text-rose-200'}`}>
                <div className="flex items-center gap-2">
                  <Badge className="bg-rose-600 text-white text-[9px]">SEV-1</Badge>
                  <span className="font-bold">#ALT-8812: Suspicious Encrypted C2 Beacon (BLR-BR-WS-04)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">Age: 4m ago</span>
                  <Badge className={isAlertClaimed ? 'bg-emerald-500 text-slate-950 text-[9px]' : 'bg-slate-800 text-slate-400 text-[9px]'}>
                    {isAlertClaimed ? 'ASSIGNED: YOU' : 'UNASSIGNED'}
                  </Badge>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 flex items-center justify-between text-amber-200">
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-500 text-slate-950 text-[9px]">SEV-2</Badge>
                  <span>#ALT-8811: Password Spray Correlation Across 45 Accounts</span>
                </div>
                <span className="text-slate-400">Age: 12m ago</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-slate-400">
                <div className="flex items-center gap-2">
                  <Badge className="bg-slate-700 text-slate-300 text-[9px]">SEV-3</Badge>
                  <span>#ALT-8810: Removable Media Write Attempt (Blocked by DLP)</span>
                </div>
                <span className="text-slate-500">Age: 28m ago</span>
              </div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 5. The Case Ticket Lifecycle (M04-U1-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm04-ticket-lifecycle') {
    const nodes = ticketLifecycleNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const ticketSteps = [
      { step: 0, title: '1. New (Unassigned)', desc: 'Alarm lands in triage queue. Awaiting analyst claim; SLA countdown begins immediately.' },
      { step: 1, title: '2. In-Progress Scoping', desc: 'Assigned to L1 analyst. Investigating 5 Ws, collecting parent PIDs, and validating IOCs.' },
      { step: 2, title: '3. Escalated to L2', desc: 'Multi-host spread or domain controller involved. Packaged into structured dossier for Tier 2.' },
      { step: 3, title: '4. Resolved & Documented', desc: 'Containment verified, root cause documented, False Positive closed with audit comments.' },
    ];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <ListOrdered className="w-5 h-5 text-sky-400" />
                <span>The Case Ticket Lifecycle: New $\to$ Scoping $\to$ Escalation $\to$ Resolved</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Tracking structured case state transitions from initial alert intake to verified remediation and closure.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setTicketLifecycleStep((prev) => (prev + 1) % 4);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white border border-sky-400 transition-all flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Advance Ticket State ({ticketLifecycleStep + 1}/4)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-400 text-slate-950 font-bold' : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'life-new' && <Inbox className="w-6 h-6 text-sky-400" />}
                      {node.id === 'life-prog' && <Search className="w-6 h-6 text-amber-400" />}
                      {node.id === 'life-esc' && <ArrowRight className="w-6 h-6 text-rose-400" />}
                      {node.id === 'life-closed' && <CheckCheck className="w-6 h-6 text-emerald-400" />}
                    </div>
                    {node.badge && (
                      <Badge variant="outline" className="text-[10px] font-mono border-sky-500/30 text-sky-300">
                        {node.badge}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-white">{node.label}</h5>
                    <p className="text-xs text-sky-300 font-mono">{node.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stepper HUD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2 font-mono text-xs">
            {ticketSteps.map((st) => (
              <div
                key={st.step}
                onClick={() => {
                  sound.playClick();
                  setTicketLifecycleStep(st.step);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  ticketLifecycleStep === st.step ? 'bg-sky-950/80 border-sky-400 ring-1 ring-sky-500/50 shadow-md' : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-white">
                  <span>{st.title}</span>
                  {ticketLifecycleStep === st.step && <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />}
                </div>
                <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 6. Real-Time SLA Countdown & Breach Defense (M04-U1-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm04-sla-monitor') {
    const nodes = slaMonitorNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-400" />
                <span>Real-Time SLA Countdown &amp; Queue Breach Defense</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Understanding Mean Time to Detect (MTTD) and Mean Time to Respond (MTTR) performance contracts.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {(['sev1', 'sev2', 'sev3', 'sev4'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveSlaCategory(s);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold border transition-all ${
                    activeSlaCategory === s ? 'bg-sky-500 text-slate-950 border-sky-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-400 text-slate-950 font-bold' : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'sla-mttd' && <Clock className="w-6 h-6 text-sky-400" />}
                      {node.id === 'sla-mttr' && <Activity className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'sla-warning' && <AlertTriangle className="w-6 h-6 text-amber-400" />}
                      {node.id === 'sla-breach' && <AlertOctagon className="w-6 h-6 text-rose-400" />}
                    </div>
                    {node.badge && (
                      <Badge variant="outline" className="text-[10px] font-mono border-sky-500/30 text-sky-300">
                        {node.badge}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-white">{node.label}</h5>
                    <p className="text-xs text-sky-300 font-mono">{node.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SLA Countdown Timer HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">ACTIVE SERVICE LEVEL AGREEMENT (SLA) MONITOR</span>
              <span className="text-sky-300 font-bold">
                {activeSlaCategory === 'sev1' && 'SEV-1 SLA: 15 MINUTES (REMAINING: 09m 42s)'}
                {activeSlaCategory === 'sev2' && 'SEV-2 SLA: 30 MINUTES (REMAINING: 21m 15s)'}
                {activeSlaCategory === 'sev3' && 'SEV-3 SLA: 4 HOURS (REMAINING: 3h 12m)'}
                {activeSlaCategory === 'sev4' && 'SEV-4 SLA: 24 HOURS (REMAINING: 22h 45m)'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200">
              <strong className="text-emerald-300">Operational SLA Compliance Record:</strong>
              <p className="text-slate-300 text-xs mt-1">
                Zero SLA breaches across the last 90 days. Every incoming SEV-1 ticket is acknowledged and qualified within 15 minutes, preserving corporate compliance and preventing queue starvation alarms.
              </p>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 7. Raw Event vs Actionable Alert Thresholds (M04-U2-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm04-event-vs-alert') {
    const nodes = eventVsAlertNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Filter className="w-5 h-5 text-sky-400" />
                <span>Raw Event vs Actionable Alert: The 1,000,000 to 1 Ratio</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Understanding how SIEM correlation engines filter millions of raw routine log lines into actionable triage alarms.
              </p>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-mono text-xs">
              FILTER EFFICIENCY: 99.999%
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-400 text-slate-950 font-bold' : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'eva-event' && <Database className="w-6 h-6 text-slate-400" />}
                      {node.id === 'eva-filter' && <Filter className="w-6 h-6 text-sky-400" />}
                      {node.id === 'eva-alert' && <AlertTriangle className="w-6 h-6 text-amber-400" />}
                      {node.id === 'eva-fatigue' && <ShieldCheck className="w-6 h-6 text-emerald-400" />}
                    </div>
                    {node.badge && (
                      <Badge variant="outline" className="text-[10px] font-mono border-sky-500/30 text-sky-300">
                        {node.badge}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-white">{node.label}</h5>
                    <p className="text-xs text-sky-300 font-mono">{node.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Filtering Funnel HUD */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="font-bold text-slate-400">1. Ingested Raw Events (1,000,000/hr)</div>
              <p className="text-slate-300 text-xs mt-1">
                Routine DNS queries, DHCP renewals, firewall permits, and Windows Event 4624 logons. Neutral, factual telemetry recording.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-950/50 border border-sky-500/40">
              <div className="font-bold text-sky-300">2. SIEM Correlation Logic</div>
              <p className="text-slate-300 text-xs mt-1">
                Rule logic checks mathematical thresholds: off-hours timing + non-admin account + encoded command line = Trigger condition met!
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40">
              <div className="font-bold text-amber-300">3. Actionable Alert (1 Case)</div>
              <p className="text-slate-200 text-xs mt-1">
                Dispatched to the Tier 1 analyst queue with high signal-to-noise ratio. Zero alert fatigue; human attention focused where risk exists.
              </p>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 8. SIEM Detection Rule Logic (M04-U2-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm04-rule-logic-engine') {
    const nodes = ruleLogicNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Workflow className="w-5 h-5 text-sky-400" />
                <span>SIEM Detection Rule Logic Engine: Off-Hours PowerShell</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Dissecting Event ID 4688 process creation conditions, time window filters, and LOLBIN anomaly multipliers.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsWeekendSimulated(!isWeekendSimulated);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isWeekendSimulated ? 'bg-rose-600 text-white border-rose-400 animate-pulse' : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{isWeekendSimulated ? 'TIME: SUNDAY 02:45 AM (TRIGGER MET ⚠️)' : 'TIME: TUESDAY 11:30 AM (BUSINESS HOURS)'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-400 text-slate-950 font-bold' : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'rule-eventid' && <Terminal className="w-6 h-6 text-sky-400" />}
                      {node.id === 'rule-time' && <Clock className="w-6 h-6 text-amber-400" />}
                      {node.id === 'rule-lolbin' && <AlertTriangle className="w-6 h-6 text-rose-400" />}
                      {node.id === 'rule-action' && <ShieldAlert className="w-6 h-6 text-purple-400" />}
                    </div>
                    {node.badge && (
                      <Badge variant="outline" className="text-[10px] font-mono border-sky-500/30 text-sky-300">
                        {node.badge}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-white">{node.label}</h5>
                    <p className="text-xs text-sky-300 font-mono">{node.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rule Evaluation HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">RULE PSEUDOCODE CONDITION MATCH:</span>
              <span className={isWeekendSimulated ? 'text-rose-400 font-bold' : 'text-slate-400 font-bold'}>
                {isWeekendSimulated ? 'ALARM FIRED: SEV-1 ALERT GENERATED' : 'CONDITION INCOMPLETE (SUPPRESSED)'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <code>
                IF (EventID == 4688 AND ProcessName == &lsquo;powershell.exe&rsquo; AND CommandLine contains &lsquo;-enc&rsquo;)
                <br />
                AND (DayOfWeek IN [Saturday, Sunday] OR Hour NOT BETWEEN 08:00 AND 19:00)
                <br />
                THEN GENERATE_ALERT(Severity=&lsquo;SEV-1&rsquo;, Tag=&lsquo;Off-Hours LOLBIN Execution&rsquo;);
              </code>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 9. The Confirmation Bias & Verdict Trap (M04-U2-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm04-verdict-trap') {
    const nodes = verdictTrapNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-sky-400" />
                <span>Confirmation Bias &amp; The Verdict Trap: Fact vs Speculation</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Guarding against the dangerous instinct to cherry-pick logs that confirm a favorite theory while ignoring counter-evidence.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveBiasTrap('theory');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  activeBiasTrap === 'theory' ? 'bg-rose-600 text-white border-rose-400 shadow-md' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                The Bias Trap (Theory-First)
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveBiasTrap('fact');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  activeBiasTrap === 'fact' ? 'bg-emerald-600 text-white border-emerald-400 shadow-md' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Objective Fact Ledger (Evidence-First)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-400 text-slate-950 font-bold' : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'trap-title' && <AlertTriangle className="w-6 h-6 text-rose-400" />}
                      {node.id === 'trap-selective' && <Filter className="w-6 h-6 text-amber-400" />}
                      {node.id === 'trap-ignored' && <EyeOff className="w-6 h-6 text-purple-400" />}
                      {node.id === 'trap-discipline' && <ShieldCheck className="w-6 h-6 text-emerald-400" />}
                    </div>
                    {node.badge && (
                      <Badge variant="outline" className="text-[10px] font-mono border-sky-500/30 text-sky-300">
                        {node.badge}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-white">{node.label}</h5>
                    <p className="text-xs text-sky-300 font-mono">{node.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bias Comparison Display */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">COGNITIVE BIAS EVALUATION</span>
              <span className={activeBiasTrap === 'fact' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {activeBiasTrap === 'fact' ? 'APPROVED: OBJECTIVE TWO-COLUMN LEDGER' : 'WARNING: CONFIRMATION BIAS TRAP ACTIVE'}
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200">
              {activeBiasTrap === 'fact' ? (
                <div>
                  <strong className="text-emerald-300">The Objective Fact Standard:</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    List verifiable observations on the left (Event IDs, IP sockets, timestamps, parent PIDs) and working hypotheses on the right. Never promote an unverified suspicion into a factual case disposition!
                  </p>
                </div>
              ) : (
                <div>
                  <strong className="text-rose-300">The Preconceived Verdict Trap:</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    Analyst assumes &lsquo;Ramesh is exfiltrating data&rsquo; and only searches for file copy logs, completely ignoring the fact that Ramesh was not physically in the building and that a Trojan dropper executed 10 minutes prior.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 10. The Alert Taxonomy Quad (M04-U2-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm04-taxonomy-quad') {
    const nodes = taxonomyQuadNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Boxes className="w-5 h-5 text-sky-400" />
                <span>The Alert Taxonomy Quad: TP, FP, TN &amp; FN Classifications</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Mastering the four possible outcomes of security monitoring and identifying where real operational danger lies.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {(['tp', 'fp', 'tn', 'fn'] as const).map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedTaxonomyQuadrant(q);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                    selectedTaxonomyQuadrant === q ? 'bg-sky-500 text-slate-950 border-sky-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {q.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-400 text-slate-950 font-bold' : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'quad-event' && <CheckCircle2 className="w-6 h-6 text-rose-400" />}
                      {node.id === 'quad-alert' && <Sliders className="w-6 h-6 text-amber-400" />}
                      {node.id === 'quad-incident' && <ShieldCheck className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'quad-noise' && <AlertOctagon className="w-6 h-6 text-rose-600" />}
                    </div>
                    {node.badge && (
                      <Badge variant="outline" className="text-[10px] font-mono border-sky-500/30 text-sky-300">
                        {node.badge}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-white">{node.label}</h5>
                    <p className="text-xs text-sky-300 font-mono">{node.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4-Quadrant Matrix Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 font-mono text-xs">
            <div className={`p-3.5 rounded-xl border transition-all ${selectedTaxonomyQuadrant === 'tp' ? 'bg-rose-950/60 border-rose-400 shadow-md' : 'bg-slate-950/60 border-slate-800'}`}>
              <div className="flex items-center justify-between text-rose-300 font-bold">
                <span>TRUE POSITIVE (TP)</span>
                <Badge className="bg-rose-600 text-white text-[9px]">REAL THREAT DETECTED</Badge>
              </div>
              <p className="text-slate-200 text-xs mt-1">SIEM generated alert; investigation proves real unauthorized attack occurred. Containment triggered.</p>
            </div>

            <div className={`p-3.5 rounded-xl border transition-all ${selectedTaxonomyQuadrant === 'fp' ? 'bg-amber-950/60 border-amber-400 shadow-md' : 'bg-slate-950/60 border-slate-800'}`}>
              <div className="flex items-center justify-between text-amber-300 font-bold">
                <span>FALSE POSITIVE (FP)</span>
                <Badge className="bg-amber-500 text-slate-950 text-[9px]">BENIGN NOISE</Badge>
              </div>
              <p className="text-slate-300 text-xs mt-1">SIEM generated alert; investigation proves legitimate authorized IT activity. Document and close.</p>
            </div>

            <div className={`p-3.5 rounded-xl border transition-all ${selectedTaxonomyQuadrant === 'tn' ? 'bg-emerald-950/60 border-emerald-400 shadow-md' : 'bg-slate-950/60 border-slate-800'}`}>
              <div className="flex items-center justify-between text-emerald-300 font-bold">
                <span>TRUE NEGATIVE (TN)</span>
                <Badge className="bg-emerald-500 text-slate-950 text-[9px]">HEALTHY SILENCE</Badge>
              </div>
              <p className="text-slate-300 text-xs mt-1">Normal benign traffic; SIEM correctly did not trigger an alarm. Routine operational state.</p>
            </div>

            <div className={`p-3.5 rounded-xl border transition-all ${selectedTaxonomyQuadrant === 'fn' ? 'bg-rose-950/80 border-rose-500 shadow-md animate-pulse' : 'bg-slate-950/60 border-slate-800'}`}>
              <div className="flex items-center justify-between text-rose-300 font-bold">
                <span>FALSE NEGATIVE (FN) ⚠️</span>
                <Badge className="bg-rose-600 text-white text-[9px]">DANGEROUS BLINDSPOT</Badge>
              </div>
              <p className="text-slate-200 text-xs mt-1">Real attack occurred, but SIEM remained completely silent due to missing detection rule or log gap!</p>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 11. Multi-Alert Case Aggregation (M04-U2-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm04-case-aggregation') {
    const nodes = caseAggregationNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Boxes className="w-5 h-5 text-sky-400" />
                <span>Multi-Alert Case Aggregation: Combining Isolated Alarms</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Grouping disparate alerts (PowerShell download, port sweep, C2 beacon) into a unified master case file.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsCaseAggregated(!isCaseAggregated);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white border border-sky-400 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isCaseAggregated ? 'AGGREGATED CASE VIEW (LINKED)' : 'SHOW DISPARATE INDIVIDUAL ALERTS'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-400 text-slate-950 font-bold' : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'agg-alert1' && <Terminal className="w-6 h-6 text-sky-400" />}
                      {node.id === 'agg-alert2' && <Search className="w-6 h-6 text-amber-400" />}
                      {node.id === 'agg-case' && <Boxes className="w-6 h-6 text-purple-400" />}
                      {node.id === 'agg-scope' && <ShieldAlert className="w-6 h-6 text-rose-400" />}
                    </div>
                    {node.badge && (
                      <Badge variant="outline" className="text-[10px] font-mono border-sky-500/30 text-sky-300">
                        {node.badge}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-white">{node.label}</h5>
                    <p className="text-xs text-sky-300 font-mono">{node.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Aggregated Case Pipeline HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">MASTER INCIDENT DOSSIER: CASE-2026-081</span>
              <Badge className="bg-purple-600 text-white text-[9px]">3 CORRELATED ALERTS</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-sky-300 font-bold">Alert 1: Process Download</div>
                <div className="text-[11px] text-slate-400 mt-0.5">certutil.exe -urlcache (BLR-BR-WS-04)</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-amber-300 font-bold">Alert 2: Port Sweep</div>
                <div className="text-[11px] text-slate-400 mt-0.5">SYN probes against 10.10.20.0/24</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-rose-300 font-bold">Alert 3: Outbound C2</div>
                <div className="text-[11px] text-slate-400 mt-0.5">450 MB HTTPS stream to 198.51.100.42</div>
              </div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 12. Case Evidence Vault & Tamper-Evident Custody (M04-U2-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm04-evidence-vault') {
    const nodes = evidenceVaultNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-sky-400" />
                <span>Case Evidence Vault &amp; Tamper-Evident SHA-256 Custody</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Acquiring volatile memory captures, network PCAP traces, and generating cryptographic hashes upon ingestion.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsMemoryDumpExtracted(!isMemoryDumpExtracted);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isMemoryDumpExtracted ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-sky-600 text-white border-sky-400'
              }`}
            >
              <HardDrive className="w-4 h-4" />
              <span>{isMemoryDumpExtracted ? 'MEMORY DUMP SECURED (SHA-256 HASHED)' : 'EXTRACT RAM DUMP FROM BLR-BR-WS-04'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-400 text-slate-950 font-bold' : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'vault-hashes' && <Key className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'vault-pcaps' && <Database className="w-6 h-6 text-sky-400" />}
                      {node.id === 'vault-notes' && <FileText className="w-6 h-6 text-purple-400" />}
                      {node.id === 'vault-chain' && <ShieldCheck className="w-6 h-6 text-amber-400" />}
                    </div>
                    {node.badge && (
                      <Badge variant="outline" className="text-[10px] font-mono border-sky-500/30 text-sky-300">
                        {node.badge}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-white">{node.label}</h5>
                    <p className="text-xs text-sky-300 font-mono">{node.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Evidence Vault Hashes HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">DIGITAL EVIDENCE VAULT INGESTION LEDGER</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[10px]">ISO/IEC 27037 COMPLIANT</Badge>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="p-2 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300 font-bold">Artifact 1: blr-br-ws-04_ram_dump.raw (16 GB)</span>
                <span className="text-emerald-400 font-bold">SHA-256: 4a8b...12c9 ✓</span>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300 font-bold">Artifact 2: c2_beacon_session.pcap (450 MB)</span>
                <span className="text-emerald-400 font-bold">SHA-256: 7f1e...99a0 ✓</span>
              </div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 13. The 5 Ws Triage Methodology (M04-U3-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm04-five-ws-triage') {
    const nodes = fiveWsNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-sky-400" />
                <span>The 5 Ws Triage Methodology: Who, What, When, Where &amp; Why</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                The universal foundational standard for documenting security investigations with disciplined forensic rigor.
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {(['who', 'what', 'when', 'where', 'why'] as const).map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedFiveW(w);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                    selectedFiveW === w ? 'bg-sky-500 text-slate-950 border-sky-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {w.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-400 text-slate-950 font-bold' : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'five-who' && <Users className="w-6 h-6 text-sky-400" />}
                      {node.id === 'five-what' && <Terminal className="w-6 h-6 text-amber-400" />}
                      {node.id === 'five-when' && <Clock className="w-6 h-6 text-purple-400" />}
                      {node.id === 'five-where' && <Laptop className="w-6 h-6 text-emerald-400" />}
                    </div>
                    {node.badge && (
                      <Badge variant="outline" className="text-[10px] font-mono border-sky-500/30 text-sky-300">
                        {node.badge}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-white">{node.label}</h5>
                    <p className="text-xs text-sky-300 font-mono">{node.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 5 Ws Inspection HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">5 Ws CASE OBSERVABLE PROFILE:</span>
              <span className="text-sky-300 font-bold">CASE #INC-2026-8812 (BLR-BR-WS-04)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 text-xs">
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <div className="text-sky-300 font-bold">WHO</div>
                <div className="text-[11px] text-slate-300 mt-1">User: cdac\FIN-OPS-01 (Session Token)</div>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <div className="text-amber-300 font-bold">WHAT</div>
                <div className="text-[11px] text-slate-300 mt-1">Binary: certutil.exe -urlcache (PID 4820)</div>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <div className="text-purple-300 font-bold">WHEN</div>
                <div className="text-[11px] text-slate-300 mt-1">Time: 2026-10-15T02:45:12Z (UTC)</div>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <div className="text-emerald-300 font-bold">WHERE</div>
                <div className="text-[11px] text-slate-300 mt-1">Host: BLR-BR-WS-04 (IP 10.10.20.15)</div>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <div className="text-rose-300 font-bold">WHY</div>
                <div className="text-[11px] text-slate-300 mt-1">IOC: Outbound C2 download attempt</div>
              </div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 14. Alert Aggregation & De-duplication (M04-U3-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm04-aggregation-counter') {
    const nodes = aggregationCounterNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Boxes className="w-5 h-5 text-sky-400" />
                <span>Alert Aggregation &amp; De-duplication: Preventing Queue Flood</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Collapsing 15 identical recurring alarms into a single actionable ticket with an incremented event count.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsDeduplicationActive(!isDeduplicationActive);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                isDeduplicationActive ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-rose-600 text-white border-rose-400'
              }`}
            >
              {isDeduplicationActive ? 'DEDUPLICATION ACTIVE (1 TICKET)' : 'RAW UNGROUPED (15 TICKETS SPAM)'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-400 text-slate-950 font-bold' : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'agg-count-raw' && <Activity className="w-6 h-6 text-rose-400" />}
                      {node.id === 'agg-count-win' && <Clock className="w-6 h-6 text-sky-400" />}
                      {node.id === 'agg-count-ticket' && <FileText className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'agg-count-noise' && <ShieldCheck className="w-6 h-6 text-purple-400" />}
                    </div>
                    {node.badge && (
                      <Badge variant="outline" className="text-[10px] font-mono border-sky-500/30 text-sky-300">
                        {node.badge}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-white">{node.label}</h5>
                    <p className="text-xs text-sky-300 font-mono">{node.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deduplication Counter HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">SIEM QUEUE HYGIENE COMPARISON</span>
              <span className={isDeduplicationActive ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {isDeduplicationActive ? 'RESULT: 1 MASTER TICKET (COUNT: 15 REPEATS)' : 'RESULT: 15 TICKETS CLUTTERING QUEUE'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200">
              {isDeduplicationActive ? (
                <div>
                  <strong className="text-emerald-300">Clean Queue Hygiene:</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    When identical alerts fire on the same host within a 15-minute window, the correlation engine increments the count counter on the existing open ticket instead of generating spam tickets.
                  </p>
                </div>
              ) : (
                <div>
                  <strong className="text-rose-300">Queue Starvation Hazard:</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    Without deduplication, a single infected endpoint scanning ports floods the analyst queue with hundreds of separate tickets, hiding legitimate alerts from other branch devices.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 15. The Principle of Forensic Honesty & State of Unknowns (M04-U3-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm04-forensic-honesty') {
    const nodes = forensicHonestyNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-400" />
                <span>The Principle of Forensic Honesty &amp; State of Unknowns</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Explicitly stating what remains unconfirmed preserves analyst credibility and prevents costly wild goose chases.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setViewUnknownsLedger(!viewUnknownsLedger);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white border border-sky-400 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Toggle Knowns vs Unknowns View</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-400 text-slate-950 font-bold' : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'hon-why-unknown' && <CheckCircle2 className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'hon-knowns' && <FileText className="w-6 h-6 text-sky-400" />}
                      {node.id === 'hon-hypo' && <HelpCircle className="w-6 h-6 text-amber-400" />}
                      {node.id === 'hon-credibility' && <ShieldCheck className="w-6 h-6 text-purple-400" />}
                    </div>
                    {node.badge && (
                      <Badge variant="outline" className="text-[10px] font-mono border-sky-500/30 text-sky-300">
                        {node.badge}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-white">{node.label}</h5>
                    <p className="text-xs text-sky-300 font-mono">{node.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Two-Column Honesty Ledger */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-1">
              <div className="text-emerald-300 font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>CONFIRMED TECHNICAL OBSERVED FACTS:</span>
              </div>
              <ul className="list-disc list-inside text-slate-300 text-xs space-y-0.5 pt-1">
                <li>certutil.exe executed with -urlcache parameter at 02:45 UTC.</li>
                <li>Outbound TCP socket opened to 198.51.100.42:443.</li>
                <li>Workstation IP 10.10.20.15 is isolated via EDR.</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/50 space-y-1">
              <div className="text-amber-300 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>EXPLICITLY STATED UNKNOWNS (FOR TIER 2):</span>
              </div>
              <ul className="list-disc list-inside text-slate-300 text-xs space-y-0.5 pt-1">
                <li>Whether the downloaded file payload was successfully saved to disk.</li>
                <li>Identity of human operator behind VPN session (no turnstile badge entry).</li>
                <li>Whether other endpoints on the branch LAN received the same lure.</li>
              </ul>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 16. Case Disposition Decision Tree (M04-U3-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm04-disposition-tree') {
    const nodes = dispositionTreeNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Workflow className="w-5 h-5 text-sky-400" />
                <span>Case Disposition Decision Tree: Closing Tickets with Justification</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Categorizing final outcomes: Benign False Positive, True Positive Contained, Escalated to L2, or Policy Exception.
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {(['fp', 'tp_contained', 'tp_escalated', 'auth_change'] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedDisposition(d);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                    selectedDisposition === d ? 'bg-sky-500 text-slate-950 border-sky-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {d === 'fp' ? 'False Positive' : d === 'tp_contained' ? 'TP Contained' : d === 'tp_escalated' ? 'TP Escalated' : 'Policy Exception'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-400 text-slate-950 font-bold' : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'disp-tp-mal' && <ShieldAlert className="w-6 h-6 text-rose-400" />}
                      {node.id === 'disp-tp-benign' && <CheckCircle2 className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'disp-fp-noise' && <Sliders className="w-6 h-6 text-amber-400" />}
                      {node.id === 'disp-close' && <CheckCheck className="w-6 h-6 text-purple-400" />}
                    </div>
                    {node.badge && (
                      <Badge variant="outline" className="text-[10px] font-mono border-sky-500/30 text-sky-300">
                        {node.badge}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-white">{node.label}</h5>
                    <p className="text-xs text-sky-300 font-mono">{node.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Disposition Decision Output */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">CASE DISPOSITION JUSTIFICATION AUDIT</span>
              <span className="text-sky-300 font-bold">OUTCOME: {selectedDisposition.toUpperCase()}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200">
              {selectedDisposition === 'tp_contained' && (
                <div>
                  <strong className="text-emerald-300">True Positive (Contained by L1):</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    Malware was executed; host was successfully isolated via EDR within 8 minutes of alarm; user credentials revoked. Zero lateral movement observed. Ticket documented and routed to Tier 2 for root cause review.
                  </p>
                </div>
              )}
              {selectedDisposition === 'fp' && (
                <div>
                  <strong className="text-amber-300">Benign False Positive (Documented &amp; Closed):</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    Activity correlated to scheduled backup script executed by IT administrator Ramesh. Verified via Change Ticket CHG-2026-4412. Closed with justification comments.
                  </p>
                </div>
              )}
              {selectedDisposition === 'tp_escalated' && (
                <div>
                  <strong className="text-rose-300">True Positive (Escalated to Tier 2):</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    Multi-host lateral movement confirmed across 3 workstations. Exceeds L1 single-host playbook authority. Warm handover initiated with memory dumps attached.
                  </p>
                </div>
              )}
              {selectedDisposition === 'auth_change' && (
                <div>
                  <strong className="text-purple-300">Authorized Policy Exception:</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    Approved vulnerability scan executed by internal security engineering. Correlated to maintenance window; no attacker involvement.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 17. Anatomy of an L1 Handover Note (M04-U3-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm04-handover-note-anatomy') {
    const nodes = handoverNoteNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-400" />
                <span>Anatomy of an L1 Handover Note: The 4 Structural Sections</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Writing structured, professional incident handovers that incoming sentinels and Tier 2 responders can trust.
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {(['headline', 'chronology', 'actions', 'open_questions'] as const).map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setHandoverSection(sec);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                    handoverSection === sec ? 'bg-sky-500 text-slate-950 border-sky-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {sec === 'headline' ? '1. Headline' : sec === 'chronology' ? '2. Chronology' : sec === 'actions' ? '3. Actions' : '4. Open Questions'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-400 text-slate-950 font-bold' : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'hand-summary' && <FileText className="w-6 h-6 text-sky-400" />}
                      {node.id === 'hand-timeline' && <Clock className="w-6 h-6 text-amber-400" />}
                      {node.id === 'hand-actions' && <ShieldCheck className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'hand-questions' && <HelpCircle className="w-6 h-6 text-purple-400" />}
                    </div>
                    {node.badge && (
                      <Badge variant="outline" className="text-[10px] font-mono border-sky-500/30 text-sky-300">
                        {node.badge}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-white">{node.label}</h5>
                    <p className="text-xs text-sky-300 font-mono">{node.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Structured Note Reader HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">CASE HANDOVER DOSSIER READER</span>
              <span className="text-sky-300 font-bold">SECTION: {handoverSection.toUpperCase()}</span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200">
              {handoverSection === 'headline' && (
                <div>
                  <strong className="text-sky-300">Executive Headline (One Sentence):</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    &ldquo;SEV-1 C2 beaconing observed on workstation BLR-BR-WS-04 (10.10.20.15); host isolated via EDR within 14 minutes of detection.&rdquo;
                  </p>
                </div>
              )}
              {handoverSection === 'chronology' && (
                <div>
                  <strong className="text-amber-300">UTC Chronology Timeline:</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    02:44:00Z - Network logon from VPN • 02:45:12Z - certutil.exe spawned by cmd.exe • 02:46:00Z - 450 MB outbound stream • 02:58:00Z - EDR host isolation executed.
                  </p>
                </div>
              )}
              {handoverSection === 'actions' && (
                <div>
                  <strong className="text-emerald-300">Actions Taken &amp; Artifacts Acquired:</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    Host isolated from enterprise LAN; Active Directory Kerberos TGT revoked; RAM memory dump acquired to \\evidence-vault\case-081\ram.raw (SHA-256: 4a8b...).
                  </p>
                </div>
              )}
              {handoverSection === 'open_questions' && (
                <div>
                  <strong className="text-purple-300">Open Questions for Incoming Shift:</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    1. Has the external destination IP 198.51.100.42 been blocked across corporate perimeter firewalls? 2. What process spawned the initial cmd.exe parent shell?
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 18. Master Case Handover Package & Shift Sign-off (M04-U3-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm04-evidence-package') {
    const nodes = evidencePackageNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <CheckCheck className="w-5 h-5 text-emerald-400" />
                <span>Master Case Package &amp; Shift Lead Sign-off: Bridge to Module 05</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Finalizing case package CASE-2026-081 with Mentor Ananya&apos;s review, meeting the 30-minute SLA, and bridging into deep SIEM search.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsLeadSignedOff(!isLeadSignedOff);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isLeadSignedOff ? 'bg-emerald-600 text-white border-emerald-400 shadow-md' : 'bg-sky-600 text-white border-sky-400'
              }`}
            >
              <CheckCheck className="w-4 h-4" />
              <span>{isLeadSignedOff ? 'MENTOR ANANYA APPROVED ✓' : 'REQUEST SHIFT LEAD SIGN-OFF'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-400 text-slate-950 font-bold' : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'pkg-bundle' && <FileSpreadsheet className="w-6 h-6 text-purple-400" />}
                      {node.id === 'pkg-lead-review' && <UserCheck className="w-6 h-6 text-amber-400" />}
                      {node.id === 'pkg-sla-closed' && <CheckCircle2 className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'pkg-next-module' && <Compass className="w-6 h-6 text-sky-400" />}
                    </div>
                    {node.badge && (
                      <Badge variant="outline" className="text-[10px] font-mono border-sky-500/30 text-sky-300">
                        {node.badge}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-white">{node.label}</h5>
                    <p className="text-xs text-sky-300 font-mono">{node.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Master Sign-off HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">SHIFT HANDOVER EVALUATION DOCKET</span>
              <span className="text-emerald-400 font-bold">SLA: 14 MIN ELAPSED / 30 MIN ALLOWED (PASSED ✓)</span>
            </div>

            <div className="p-3.5 rounded-lg bg-[#081533] border border-sky-500/30 text-xs sm:text-sm text-sky-200 flex items-start gap-2.5">
              <UserCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-bold">Mentor Ananya&apos;s Shift Debrief: </strong>
                &ldquo;You maintained calm operational discipline, avoided the confirmation bias trap, and documented verifiable technical facts. The host is safely quarantined, the case docket is clean, and the SLA was met with 16 minutes to spare. You are now officially certified for Module 05 SIEM search operations!&rdquo;
              </div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // Fallback for any unmapped style
  return (
    <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-6 flex items-center justify-center text-slate-400 font-mono text-xs">
      No specialized visual renderer configured for style: {style}
    </div>
  );
}
