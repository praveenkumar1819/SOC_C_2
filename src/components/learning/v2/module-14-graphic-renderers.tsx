'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { sound } from '@/lib/sound-effects';
import {
  nistSansLifecycleNodes,
  detectionAnalysisGatesNodes,
  preparationFoundationsNodes,
  l1L2L3BoundariesNodes,
  escalationTriggersMatrixNodes,
  evidencePreservationDoctrineNodes,
  utcChronologyTimelineNodes,
  fiveWsCaseNotesNodes,
  factsVsInferencesNodes,
  severityMatrixScoringNodes,
  confidenceScoringRubricNodes,
  caseDispositionsQuadNodes,
  escalationChainRolesNodes,
  caseOwnershipTransferNodes,
  outOfBandCommsNodes,
  shiftHandoverBriefingNodes,
  postIncidentLessonsNodes,
  masterSocCapstoneSignoffNodes,
} from './module-14-visual-stories';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Shield,
  Activity,
  Terminal,
  Cpu,
  Eye,
  Key,
  Globe,
  Lock,
  Unlock,
  ArrowRight,
  Radio,
  Sliders,
  Check,
  AlertOctagon,
  FileCode,
  Share2,
  HardDrive,
  UserCheck,
  Zap,
  Server,
  Database,
  Filter,
  Monitor,
  Folder,
  Layers,
  Network,
  Binary,
  Hash,
  Download,
  Search,
  Wifi,
  Power,
  RefreshCw,
  GitCommit,
  Flame,
  Gauge,
  Workflow,
  Sparkles,
  Scale,
  Award,
  Mail,
  Send,
  Inbox,
  UserX,
  FileWarning,
  ExternalLink,
  MapPin,
  Compass,
  AlertCircle,
  Tag,
  Crosshair,
  Link2,
  HelpCircle,
  CheckCheck,
  ShieldAlert,
  ShieldCheck,
  CornerDownRight,
  Fingerprint,
  PhoneCall,
  UserMinus,
  MessageSquare,
  ShieldOff,
  History,
  TrendingUp,
  CheckCircle,
  XCircle,
  RotateCcw,
  Target,
} from 'lucide-react';
import { VisualNodeItem, VisualStoryStyle } from './interactive-visual-story-engine';

interface Module14GraphicRendererProps {
  style: VisualStoryStyle;
  selectedNodeId: string;
  onSelectNode: (node: VisualNodeItem) => void;
  animStep: number;
}

export function Module14GraphicRenderer({
  style,
  selectedNodeId,
  onSelectNode,
  animStep,
}: Module14GraphicRendererProps) {
  // Local interactive states for Module 14 visual scenarios
  const [irCyclePhase, setIrCyclePhase] = useState<'prep' | 'detect' | 'contain' | 'post'>('detect');
  const [detectionGateStep, setDetectionGateStep] = useState<'ingest' | 'scope' | 'filter' | 'handoff'>('scope');
  const [prepPillar, setPrepPillar] = useState<'ntp' | 'health' | 'escalation' | 'readiness'>('ntp');
  const [activeTier, setActiveTier] = useState<'l1' | 'l2' | 'l3'>('l1');
  const [escalationTrigger, setEscalationTrigger] = useState<'tier0' | 'lsass' | 'lateral'>('tier0');
  const [rebootChoice, setRebootChoice] = useState<'isolate' | 'reboot_trap'>('isolate');
  const [timelineFilter, setTimelineFilter] = useState<'all' | 'network' | 'endpoint' | 'auth'>('all');
  const [selected5W, setSelected5W] = useState<'who' | 'what' | 'when' | 'where' | 'why'>('what');
  const [claimPerspective, setClaimPerspective] = useState<'empirical_fact' | 'unverified_inference'>('empirical_fact');
  const [severityTier, setSeverityTier] = useState<1 | 2 | 3 | 4>(2);
  const [confidenceTier, setConfidenceTier] = useState<'single' | 'dual' | 'multi'>('dual');
  const [dispositionType, setDispositionType] = useState<'tp_mal' | 'tp_benign' | 'fp' | 'unknown'>('tp_mal');
  const [escalationRole, setEscalationRole] = useState<'l1' | 'lead' | 'ir_lead' | 'ciso'>('lead');
  const [transferState, setTransferState] = useState<'draft' | 'briefed' | 'acknowledged'>('acknowledged');
  const [commsChannel, setCommsChannel] = useState<'inband_risk' | 'oob_stealth'>('oob_stealth');
  const [handoverTab, setHandoverTab] = useState<'active_cases' | 'watchlist' | 'maintenance'>('active_cases');
  const [pirStep, setPirStep] = useState<'root_cause' | 'detection_gap' | 'playbook_update'>('root_cause');
  const [isCapstoneSigned, setIsCapstoneSigned] = useState<boolean>(false);

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
              <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-[11px] font-mono">
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
              className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700 text-[11px] font-mono text-slate-300"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // ---------------------------------------------------------------------------
  // 1. STYLE: m14-nist-sans-lifecycle (NIST & SANS IR Lifecycle)
  // ---------------------------------------------------------------------------
  if (style === 'm14-nist-sans-lifecycle') {
    const nodes = nistSansLifecycleNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-cyan-400" />
                <span>NIST SP 800-61r2 &amp; SANS Cyclical Incident Response Engine</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Incident response is a continuous operational cycle where preparation fuels detection, containment restores posture, and post-incident lessons harden defenses.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              IR LIFECYCLE
            </Badge>
          </div>

          {/* Phase Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">PHASE:</span>
            {[
              { id: 'prep', label: '1. Preparation', node: 'ir-prep-phase' },
              { id: 'detect', label: '2. Detection & Analysis', node: 'ir-detect-phase' },
              { id: 'contain', label: '3. Containment & Eradication', node: 'ir-contain-phase' },
              { id: 'post', label: '4. Post-Incident Activity', node: 'ir-post-phase' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setIrCyclePhase(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  irCyclePhase === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Lifecycle Visualizer */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">NIST SP 800-61r2 / SANS INCIDENT RESPONSE FRAMEWORK</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[11px]">ACTIVE PHASE: {irCyclePhase.toUpperCase()}</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className={`p-3.5 rounded-xl border ${irCyclePhase === 'prep' ? 'bg-cyan-950/50 border-cyan-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-cyan-400 font-bold">1. PREPARATION</span>
                <p className="text-white text-xs font-bold mt-1">Pre-Incident Posture</p>
                <p className="text-slate-300 text-[11px] mt-1">NTP sync, logging baselines, hardened images, validated contact trees.</p>
                <div className="text-[11px] text-cyan-300 mt-2 font-mono">Role: Shift Readiness</div>
              </div>

              <div className={`p-3.5 rounded-xl border ${irCyclePhase === 'detect' ? 'bg-emerald-950/50 border-emerald-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-emerald-400 font-bold">2. DETECTION &amp; ANL</span>
                <p className="text-white text-xs font-bold mt-1">L1 Hunting Grounds</p>
                <p className="text-slate-300 text-[11px] mt-1">Triage alerts, scope 5Ws, filter false positives, correlate multi-sensor logs.</p>
                <div className="text-[11px] text-emerald-300 mt-2 font-mono">Role: L1 Tier Priority</div>
              </div>

              <div className={`p-3.5 rounded-xl border ${irCyclePhase === 'contain' ? 'bg-rose-950/50 border-rose-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-rose-400 font-bold">3. CONTAIN &amp; ERADICATE</span>
                <p className="text-white text-xs font-bold mt-1">Active Containment</p>
                <p className="text-slate-300 text-[11px] mt-1">Isolate hosts, revoke Kerberos tokens, patch vulnerabilities, restore clean backups.</p>
                <div className="text-[11px] text-rose-300 mt-2 font-mono">Role: L2 / Lead Action</div>
              </div>

              <div className={`p-3.5 rounded-xl border ${irCyclePhase === 'post' ? 'bg-purple-950/50 border-purple-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-purple-400 font-bold">4. POST-INCIDENT</span>
                <p className="text-white text-xs font-bold mt-1">Lessons Learned</p>
                <p className="text-slate-300 text-[11px] mt-1">Post-mortem review, root cause discovery, rule tuning, playbook updates.</p>
                <div className="text-[11px] text-purple-300 mt-2 font-mono">Role: SOC Engineering</div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">MEERA'S LIFECYCLE LAW:</span> "You cannot respond effectively to what you did not prepare for. Post-incident lessons feed directly into preparation for the next shift."
            </div>
          </div>

          {/* 4 Node Selection Cards */}
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-sky-400">{node.id}</span>
                      {node.badge && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'ir-prep-phase' ? (
                          <Shield className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'ir-detect-phase' ? (
                          <Search className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'ir-contain-phase' ? (
                          <Lock className="w-6 h-6 text-rose-400" />
                        ) : (
                          <RefreshCw className="w-6 h-6 text-purple-400" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm sm:text-base text-white">{node.label}</h5>
                        <p className="text-xs text-slate-400 font-mono">{node.sub}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{node.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 2. STYLE: m14-detection-analysis-gates (Detection & Analysis Gates)
  // ---------------------------------------------------------------------------
  if (style === 'm14-detection-analysis-gates') {
    const nodes = detectionAnalysisGatesNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Workflow className="w-5 h-5 text-cyan-400" />
                <span>L1 Detection &amp; Analysis Gateways: Ingest, Scoping, Filtering &amp; Handoff</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Systematically validate incoming alerts, scope compromised assets using the 5Ws, filter benign noise, and prepare structured containment dockets.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              DETECTION GATES
            </Badge>
          </div>

          {/* Gateway Stepper */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">GATE:</span>
            {[
              { id: 'ingest', label: '1. Alert Ingestion', node: 'det-alert-ingest' },
              { id: 'scope', label: '2. Scoping & 5Ws', node: 'det-scope-5ws' },
              { id: 'filter', label: '3. False Positive Filter', node: 'det-fp-filter' },
              { id: 'handoff', label: '4. Containment Handoff', node: 'det-contain-gate' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setDetectionGateStep(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  detectionGateStep === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Gateway Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">CASE #2026-881: L1 DETECTION PIPELINE PROGRESSION</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[11px]">GATE {detectionGateStep.toUpperCase()} ACTIVE</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              <div className={`p-3 rounded-lg border ${detectionGateStep === 'ingest' ? 'bg-cyan-950/50 border-cyan-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-cyan-400 font-bold">1. INGESTION</span>
                <p className="text-slate-300 text-[11px] mt-1">SIEM alert received: Suspicious PowerShell macro spawn.</p>
                <p className="text-slate-400 text-[11px]">Timestamp: 14:02:10 UTC</p>
              </div>

              <div className={`p-3 rounded-lg border ${detectionGateStep === 'scope' ? 'bg-purple-950/50 border-purple-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-purple-400 font-bold">2. SCOPING (5WS)</span>
                <p className="text-slate-300 text-[11px] mt-1">Host: BLR-BR-WS-04. User: FIN-OPS-01. Binary: powershell.exe</p>
                <p className="text-slate-400 text-[11px]">Scope: Isolated to single workstation</p>
              </div>

              <div className={`p-3 rounded-lg border ${detectionGateStep === 'filter' ? 'bg-amber-950/50 border-amber-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-amber-400 font-bold">3. FP FILTERING</span>
                <p className="text-slate-300 text-[11px] mt-1">Check change management: No scheduled maintenance window.</p>
                <p className="text-emerald-400 text-[11px]">Verdict: True Positive Malicious</p>
              </div>

              <div className={`p-3 rounded-lg border ${detectionGateStep === 'handoff' ? 'bg-emerald-950/50 border-emerald-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-emerald-400 font-bold">4. HANDOFF GATE</span>
                <p className="text-slate-300 text-[11px] mt-1">Assemble evidence docket and escalate to Tier-2 Shift Lead.</p>
                <p className="text-emerald-300 text-[11px]">Positive ACK required</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">ANANYA'S GATE DIRECTIVE:</span> Never hand off a ticket to L2 without answering the 5Ws and providing corroborated telemetry. Unsubstantiated escalations create queue paralysis.
            </div>
          </div>

          {/* 4 Node Selection Cards */}
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-sky-400">{node.id}</span>
                      {node.badge && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'det-alert-ingest' ? (
                          <Inbox className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'det-scope-5ws' ? (
                          <Target className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'det-fp-filter' ? (
                          <Filter className="w-6 h-6 text-amber-400" />
                        ) : (
                          <CornerDownRight className="w-6 h-6 text-emerald-400" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm sm:text-base text-white">{node.label}</h5>
                        <p className="text-xs text-slate-400 font-mono">{node.sub}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{node.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 3. STYLE: m14-preparation-foundations (Preparation Foundations)
  // ---------------------------------------------------------------------------
  if (style === 'm14-preparation-foundations') {
    const nodes = preparationFoundationsNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span>Pre-Incident Readiness Foundations: NTP Sync, Sensor Health &amp; Contact Trees</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                You cannot reconstruct timelines with drifting clocks or detect intrusions with blind sensors. Preparation is the silent foundation of SOC success.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              READINESS FOUNDATIONS
            </Badge>
          </div>

          {/* Pillar Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">PILLAR:</span>
            {[
              { id: 'ntp', label: '1. NTP Clock Synchronization', node: 'prf-clock-sync' },
              { id: 'health', label: '2. Sensor & Log Health', node: 'prf-log-health' },
              { id: 'escalation', label: '3. Contact Trees & Roster', node: 'prf-escalation-tree' },
              { id: 'readiness', label: '4. Meera\'s Readiness Standard', node: 'prf-meera-readiness' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setPrepPillar(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  prepPillar === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Readiness Dashboard Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">SOC PREPARATION TELEMETRY HEALTH AUDIT</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[11px]">ALL SYSTEMS OPERATIONAL</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-3.5 rounded-xl border ${prepPillar === 'ntp' ? 'bg-cyan-950/50 border-cyan-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-bold">NTP CLOCK SYNC</span>
                  <Badge className="bg-emerald-950 text-emerald-300 text-[11px]">±2.4ms DELTA</Badge>
                </div>
                <p className="text-slate-300 text-xs mt-2">
                  All Domain Controllers, Firewalls, and EDR agents locked to CDAC Stratum-1 time source.
                </p>
                <div className="text-[11px] text-cyan-300 mt-2 font-mono">Status: Timeline Drift Eliminated</div>
              </div>

              <div className={`p-3.5 rounded-xl border ${prepPillar === 'health' ? 'bg-purple-950/50 border-purple-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 font-bold">SENSOR COVERAGE</span>
                  <Badge className="bg-emerald-950 text-emerald-300 text-[11px]">99.8% REPORTING</Badge>
                </div>
                <p className="text-slate-300 text-xs mt-2">
                  4,210 endpoints actively forwarding Sysmon EventID 1, 3, 10, 11, and 4104 PowerShell script blocks.
                </p>
                <div className="text-[11px] text-purple-300 mt-2 font-mono">Status: Zero Telemetry Blindspots</div>
              </div>

              <div className={`p-3.5 rounded-xl border ${prepPillar === 'escalation' || prepPillar === 'readiness' ? 'bg-emerald-950/50 border-emerald-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold">ESCALATION ROSTER</span>
                  <Badge className="bg-emerald-950 text-emerald-300 text-[11px]">VERIFIED TODAY</Badge>
                </div>
                <p className="text-slate-300 text-xs mt-2">
                  On-call rotation verified: Lead Meera, Incident Commander Ananya, Network Lead Rajesh.
                </p>
                <div className="text-[11px] text-emerald-300 mt-2 font-mono">Status: Contact Tree Live</div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">MEERA'S READINESS RULE:</span> "A single clock out of sync by 3 minutes in an active investigation can invert cause and effect in court testimony. Audit your NTP sync daily."
            </div>
          </div>

          {/* 4 Node Selection Cards */}
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-sky-400">{node.id}</span>
                      {node.badge && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'prf-clock-sync' ? (
                          <Clock className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'prf-log-health' ? (
                          <Activity className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'prf-escalation-tree' ? (
                          <Share2 className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <ShieldCheck className="w-6 h-6 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm sm:text-base text-white">{node.label}</h5>
                        <p className="text-xs text-slate-400 font-mono">{node.sub}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{node.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 4. STYLE: m14-l1-l2-l3-boundaries (L1, L2, L3 Boundaries)
  // ---------------------------------------------------------------------------
  if (style === 'm14-l1-l2-l3-boundaries') {
    const nodes = l1L2L3BoundariesNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                <span>Operational Tier Boundaries: L1 Triage vs L2 Containment vs L3 Forensics</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Clear operational boundaries prevent alert paralysis: L1 validates observables and scopes; L2 isolates hosts and revokes tokens; L3 conducts reverse engineering.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              TIER BOUNDARIES
            </Badge>
          </div>

          {/* Tier Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">TIER:</span>
            {[
              { id: 'l1', label: '1. Tier-1: Triage & Scoping', node: 'bnd-tier-l1' },
              { id: 'l2', label: '2. Tier-2: Containment & Remediation', node: 'bnd-tier-l2' },
              { id: 'l3', label: '3. Tier-3: Forensics & Reversal', node: 'bnd-tier-l3' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveTier(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeTier === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Tier Comparison Matrix */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">SOC ESCALATION MATRIX &amp; SLA SPECIFICATION</span>
              <Badge className="bg-purple-500/20 text-purple-300 text-[11px]">ACTIVE VIEW: {activeTier.toUpperCase()}</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-3.5 rounded-xl border ${activeTier === 'l1' ? 'bg-cyan-950/50 border-cyan-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-bold text-xs">TIER-1 (TRIAGE)</span>
                  <Badge className="bg-cyan-950 text-cyan-300 text-[11px]">SLA: 15-30 MIN</Badge>
                </div>
                <div className="mt-2 space-y-1 text-slate-300 text-xs">
                  <div>Responsibility: Ingestion &amp; 5Ws Scoping</div>
                  <div>Tools: SIEM, EDR Read-Only, Threat Intel</div>
                  <div className="text-emerald-400">Boundary: No disruptive host changes</div>
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border ${activeTier === 'l2' ? 'bg-purple-950/50 border-purple-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 font-bold text-xs">TIER-2 (CONTAINMENT)</span>
                  <Badge className="bg-purple-950 text-purple-300 text-[11px]">SLA: 1-2 HOURS</Badge>
                </div>
                <div className="mt-2 space-y-1 text-slate-300 text-xs">
                  <div>Responsibility: Isolation &amp; Eradication</div>
                  <div>Tools: EDR Network Isolate, AD Disable</div>
                  <div className="text-purple-300">Boundary: Execute authorized containment</div>
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border ${activeTier === 'l3' ? 'bg-emerald-950/50 border-emerald-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold text-xs">TIER-3 (FORENSICS)</span>
                  <Badge className="bg-emerald-950 text-emerald-300 text-[11px]">SLA: 4-24 HOURS</Badge>
                </div>
                <div className="mt-2 space-y-1 text-slate-300 text-xs">
                  <div>Responsibility: Deep Memory &amp; Reversal</div>
                  <div>Tools: Volatility, Ghidra, Sandbox</div>
                  <div className="text-emerald-300">Boundary: Root-cause extraction</div>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">HANDOFF RULE:</span> L1 analysts do not isolate domain controllers or wipe hard drives. Hand off scoped evidence dockets to L2 with positive confirmation.
            </div>
          </div>

          {/* 4 Node Selection Cards */}
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-sky-400">{node.id}</span>
                      {node.badge && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'bnd-tier-l1' ? (
                          <UserCheck className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'bnd-tier-l2' ? (
                          <Lock className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'bnd-tier-l3' ? (
                          <Binary className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <ShieldCheck className="w-6 h-6 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm sm:text-base text-white">{node.label}</h5>
                        <p className="text-xs text-slate-400 font-mono">{node.sub}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{node.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 5. STYLE: m14-escalation-triggers-matrix (Escalation Triggers Matrix)
  // ---------------------------------------------------------------------------
  if (style === 'm14-escalation-triggers-matrix') {
    const nodes = escalationTriggersMatrixNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <span>High-Severity Escalation Triggers: Tier-0 Assets, LSASS &amp; Lateral Bursts</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Immediate escalation criteria that require bypassing standard queue wait times and notifying the Shift Lead within 5 minutes.
              </p>
            </div>
            <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30 text-xs font-mono">
              ESCALATION TRIGGERS
            </Badge>
          </div>

          {/* Trigger Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">TRIGGER:</span>
            {[
              { id: 'tier0', label: '1. Tier-0 Asset (Domain Controller)', node: 'trg-tier0-asset' },
              { id: 'lsass', label: '2. LSASS Credential Dump', node: 'trg-lsass-dump' },
              { id: 'lateral', label: '3. Lateral Movement Burst', node: 'trg-lateral-burst' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setEscalationTrigger(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  escalationTrigger === st.id
                    ? 'bg-rose-500/25 border border-rose-400 text-rose-300 shadow-md shadow-rose-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Trigger Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-rose-400 font-bold">CRITICAL ESCALATION POLICY ENFORCEMENT</span>
              <Badge className="bg-rose-950 text-rose-300 text-[11px]">IMMEDIATE PHONE BRIDGE</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-3.5 rounded-xl border ${escalationTrigger === 'tier0' ? 'bg-rose-950/40 border-rose-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-rose-400 font-bold">TIER-0 COMPROMISE</span>
                  <Badge className="bg-rose-950 text-rose-300 text-[11px]">SEV-1 CRITICAL</Badge>
                </div>
                <p className="text-slate-300 text-xs mt-2">
                  Suspicious activity on Domain Controller CDAC-BLR-DC01 or PKI Root CA.
                </p>
                <div className="text-[11px] text-rose-300 mt-2 font-mono">Action: Notify Shift Lead &lt; 5m</div>
              </div>

              <div className={`p-3.5 rounded-xl border ${escalationTrigger === 'lsass' ? 'bg-rose-950/40 border-rose-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-rose-400 font-bold">LSASS DUMP CONFIRMED</span>
                  <Badge className="bg-rose-950 text-rose-300 text-[11px]">CRED ACCESS</Badge>
                </div>
                <p className="text-slate-300 text-xs mt-2">
                  Sysmon EID 10 memory access handle 0x0010 opened on lsass.exe by comsvcs.dll.
                </p>
                <div className="text-[11px] text-rose-300 mt-2 font-mono">Action: Immediate Host Isolation</div>
              </div>

              <div className={`p-3.5 rounded-xl border ${escalationTrigger === 'lateral' ? 'bg-rose-950/40 border-rose-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-rose-400 font-bold">LATERAL BURST</span>
                  <Badge className="bg-rose-950 text-rose-300 text-[11px]">WORM / SPREAD</Badge>
                </div>
                <p className="text-slate-300 text-xs mt-2">
                  Multiple SMB port 445 / WinRM 5985 connects originating from single host across subnet.
                </p>
                <div className="text-[11px] text-rose-300 mt-2 font-mono">Action: Sever Subnet Routing</div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/30 text-xs text-slate-300">
              <span className="text-rose-400 font-bold">ANANYA'S ESCALATION LAW:</span> "When a Tier-0 asset or memory credential dump triggers, do not sit on the ticket. Voice-call the Lead immediately. Minutes count."
            </div>
          </div>

          {/* 4 Node Selection Cards */}
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-sky-400">{node.id}</span>
                      {node.badge && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'trg-tier0-asset' ? (
                          <Server className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'trg-lsass-dump' ? (
                          <Cpu className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'trg-lateral-burst' ? (
                          <Network className="w-6 h-6 text-purple-400" />
                        ) : (
                          <ShieldAlert className="w-6 h-6 text-cyan-400" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm sm:text-base text-white">{node.label}</h5>
                        <p className="text-xs text-slate-400 font-mono">{node.sub}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{node.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 6. STYLE: m14-evidence-preservation-doctrine (Evidence Preservation Doctrine)
  // ---------------------------------------------------------------------------
  if (style === 'm14-evidence-preservation-doctrine') {
    const nodes = evidencePreservationDoctrineNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-cyan-400" />
                <span>Evidence Preservation Doctrine: RAM Volatility &amp; The Reboot Disaster</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Never reboot or power down a compromised endpoint! Reboots purge volatile memory, in-memory malware, injected DLLs, and unwritten network sockets.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              ORDER OF VOLATILITY
            </Badge>
          </div>

          {/* Action Choice Toggle */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">ACTION:</span>
            {[
              { id: 'isolate', label: '1. Safe Network Isolation (EDR Sever)', node: 'epd-volatile-ram' },
              { id: 'reboot_trap', label: '2. The Reboot Trap (Fatal Evidence Destruction)', node: 'epd-reboot-disaster' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setRebootChoice(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  rebootChoice === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Volatility Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">FORENSIC VOLATILITY CONSEQUENCE COMPARISON</span>
              <Badge className="bg-purple-500/20 text-purple-300 text-[11px]">RFC 3227 ORDER OF VOLATILITY</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className={`p-3.5 rounded-xl border ${rebootChoice === 'isolate' ? 'bg-emerald-950/40 border-emerald-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold text-xs">SAFE CONTAINMENT: ISOLATION</span>
                  <Badge className="bg-emerald-950 text-emerald-300 text-[11px]">APPROVED ✓</Badge>
                </div>
                <div className="mt-2 text-slate-300 text-xs space-y-1">
                  <div>Action: EDR isolates host network interface</div>
                  <div>Volatile RAM: Preserved 100% for memory acquisition</div>
                  <div>C2 Link: Severed instantly without reboot</div>
                  <div className="text-emerald-300 pt-1">Outcome: Court-admissible memory image captured!</div>
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border ${rebootChoice === 'reboot_trap' ? 'bg-rose-950/40 border-rose-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-rose-400 font-bold text-xs">FATAL TRAP: REBOOT / POWER PULL</span>
                  <Badge className="bg-rose-950 text-rose-300 text-[11px]">EVIDENCE DESTROYED ⛔</Badge>
                </div>
                <div className="mt-2 text-slate-300 text-xs space-y-1">
                  <div>Action: IT Admin pulls power plug or reboots</div>
                  <div>Volatile RAM: Completely erased on capacitor discharge</div>
                  <div>In-Memory Malware: Injected Cobalt Strike beacon lost forever</div>
                  <div className="text-rose-300 pt-1">Outcome: Forensic team blind to intrusion mechanism!</div>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">MEERA'S CARDINAL RULE:</span> "Never pull the plug. Never reboot. Isolate the network interface, acquire memory first, then proceed to disk acquisition."
            </div>
          </div>

          {/* 4 Node Selection Cards */}
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-sky-400">{node.id}</span>
                      {node.badge && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'epd-volatile-ram' ? (
                          <Cpu className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'epd-reboot-disaster' ? (
                          <AlertTriangle className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'epd-network-sever' ? (
                          <Lock className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <ShieldCheck className="w-6 h-6 text-purple-400" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm sm:text-base text-white">{node.label}</h5>
                        <p className="text-xs text-slate-400 font-mono">{node.sub}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{node.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 7. STYLE: m14-utc-chronology-timeline (UTC Chronology Timeline)
  // ---------------------------------------------------------------------------
  if (style === 'm14-utc-chronology-timeline') {
    const nodes = utcChronologyTimelineNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span>UTC Master Chronology: Multi-Sensor Timeline Reconstruction</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                All SOC timestamps must be normalized to microsecond UTC. Correlate Zeek network sessions, Sysmon process telemetry, and Active Directory authentication events.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              UTC MASTER TIMELINE
            </Badge>
          </div>

          {/* Timeline Filter */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">FILTER:</span>
            {[
              { id: 'all', label: '1. All Sensors Correlated', node: 'tml-l1-timestamp-rule' },
              { id: 'network', label: '2. Zeek Network TAP', node: 'tml-zeek-beacon' },
              { id: 'endpoint', label: '3. Sysmon Endpoint Telemetry', node: 'tml-sysmon-proc' },
              { id: 'auth', label: '4. AD Authentication Logs', node: 'tml-ad-auth' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setTimelineFilter(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  timelineFilter === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Timeline Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">CASE #2026-881 MASTER UTC TIMELINE (CHRONOLOGICAL ORDER)</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[11px]">UTC STANDARDIZED</Badge>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-black/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[11px]">14:02:10.124Z</span>
                  <span className="text-white font-bold">Sysmon Event 11: File Create</span>
                </div>
                <span className="text-slate-300 text-xs">C:\Users\FIN-OPS-01\Downloads\Invoice_881.xlsm</span>
              </div>

              <div className="p-2.5 rounded-lg bg-black/60 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[11px]">14:02:15.890Z</span>
                  <span className="text-white font-bold">Sysmon Event 1: Process Creation</span>
                </div>
                <span className="text-cyan-300 text-xs">powershell.exe -enc JABzACAAPQ... (PID 4120)</span>
              </div>

              <div className="p-2.5 rounded-lg bg-black/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 text-[11px]">14:02:22.450Z</span>
                  <span className="text-white font-bold">Zeek conn.log: SSL Outbound</span>
                </div>
                <span className="text-slate-300 text-xs">10.10.20.15:49182 -&gt; 198.51.100.24:443 (24.8 KB)</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">L1 TIMESTAMP RULE:</span> "Never record '10 minutes ago' or local laptop time. Record ISO 8601 UTC down to the second (e.g. 2026-10-15T14:02:10Z). Ambiguous timestamps destroy cross-sensor correlation."
            </div>
          </div>

          {/* 4 Node Selection Cards */}
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-sky-400">{node.id}</span>
                      {node.badge && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'tml-zeek-beacon' ? (
                          <Network className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'tml-sysmon-proc' ? (
                          <Terminal className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'tml-ad-auth' ? (
                          <Key className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <Clock className="w-6 h-6 text-amber-400" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm sm:text-base text-white">{node.label}</h5>
                        <p className="text-xs text-slate-400 font-mono">{node.sub}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{node.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 8. STYLE: m14-five-ws-case-notes (5Ws Case Notes)
  // ---------------------------------------------------------------------------
  if (style === 'm14-five-ws-case-notes') {
    const nodes = fiveWsCaseNotesNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span>The 5Ws Incident Documentation Standard: Who, What, When, Where &amp; Why</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                An unrecorded action never happened. Standardize case notes using the 5Ws structure so any analyst or auditor can resume the investigation seamlessly.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              5WS FRAMEWORK
            </Badge>
          </div>

          {/* 5W Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">ELEMENT:</span>
            {[
              { id: 'who', label: '1. WHO (Entity / Account)', node: 'not-who-entity' },
              { id: 'what', label: '2. WHAT (Binary / CLI)', node: 'not-what-binary' },
              { id: 'when', label: '3. WHEN (UTC Timeline)', node: 'not-when-timeline' },
              { id: 'where', label: '4. WHERE (Asset & IP)', node: 'not-where-asset' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelected5W(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  selected5W === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive 5W Case Dossier Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">CASE #2026-881: 5WS INCIDENT TRIAGE DOSSIER</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[11px]">AUDIT-PROOF FORMAT</Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className={`p-3 rounded-lg border ${selected5W === 'who' ? 'bg-cyan-950/50 border-cyan-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-cyan-400 font-bold">WHO</span>
                <p className="text-white text-xs mt-1">FIN-OPS-01</p>
                <p className="text-slate-400 text-[11px]">Finance Operations User</p>
              </div>

              <div className={`p-3 rounded-lg border ${selected5W === 'what' ? 'bg-purple-950/50 border-purple-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-purple-400 font-bold">WHAT</span>
                <p className="text-white text-xs mt-1">powershell.exe -enc</p>
                <p className="text-slate-400 text-[11px]">Injected memory payload</p>
              </div>

              <div className={`p-3 rounded-lg border ${selected5W === 'when' ? 'bg-emerald-950/50 border-emerald-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-emerald-400 font-bold">WHEN</span>
                <p className="text-white text-xs mt-1">14:02:15 UTC</p>
                <p className="text-slate-400 text-[11px]">2026-10-15 Microsecond</p>
              </div>

              <div className={`p-3 rounded-lg border ${selected5W === 'where' ? 'bg-amber-950/50 border-amber-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-amber-400 font-bold">WHERE</span>
                <p className="text-white text-xs mt-1">BLR-BR-WS-04</p>
                <p className="text-slate-400 text-[11px]">10.10.20.15 Subnet B</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">DOCUMENTATION LAW:</span> "If an action is not documented in the case ticket, it did not happen. A complete 5W entry allows any analyst taking over the shift to understand the incident in 60 seconds."
            </div>
          </div>

          {/* 4 Node Selection Cards */}
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-sky-400">{node.id}</span>
                      {node.badge && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'not-who-entity' ? (
                          <UserCheck className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'not-what-binary' ? (
                          <Terminal className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'not-when-timeline' ? (
                          <Clock className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <Monitor className="w-6 h-6 text-amber-400" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm sm:text-base text-white">{node.label}</h5>
                        <p className="text-xs text-slate-400 font-mono">{node.sub}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{node.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 9. STYLE: m14-facts-vs-inferences (Facts vs Inferences)
  // ---------------------------------------------------------------------------
  if (style === 'm14-facts-vs-inferences') {
    const nodes = factsVsInferencesNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-cyan-400" />
                <span>Facts vs Inferences: Empirical Evidence vs Investigative Hypotheses</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Maintain scientific integrity in ticket documentation: Explicitly distinguish between proven forensic facts and working investigative theories.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              FORENSIC INTEGRITY
            </Badge>
          </div>

          {/* Perspective Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">VIEW:</span>
            {[
              { id: 'empirical_fact', label: '1. Empirical Facts (Verified Telemetry)', node: 'fvi-verified-fact' },
              { id: 'unverified_inference', label: '2. Speculative Inferences (Hypotheses)', node: 'fvi-labeled-hypothesis' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setClaimPerspective(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  claimPerspective === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Split-Screen Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">CASE #2026-881 CASE NOTE AUDIT</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[11px]">DOCUMENTATION INTEGRITY</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className={`p-3.5 rounded-xl border ${claimPerspective === 'empirical_fact' ? 'bg-emerald-950/40 border-emerald-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold text-xs">EMPIRICAL FACT (VERIFIED)</span>
                  <Badge className="bg-emerald-950 text-emerald-300 text-[11px]">EVIDENTIARY</Badge>
                </div>
                <div className="p-2.5 rounded bg-black/60 border border-emerald-900/40 mt-2 text-white text-xs space-y-1">
                  <div>"Observed: powershell.exe executed by user FIN-OPS-01."</div>
                  <div>"Observed: Outbound connection established to 198.51.100.24:443."</div>
                  <div>"Evidence: Sysmon EID 1 &amp; Zeek conn.log attached."</div>
                </div>
                <p className="text-slate-300 text-xs mt-2">
                  100% indisputable fact corroborated by telemetry logs.
                </p>
              </div>

              <div className={`p-3.5 rounded-xl border ${claimPerspective === 'unverified_inference' ? 'bg-amber-950/40 border-amber-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 font-bold text-xs">WORKING HYPOTHESIS (LABELED)</span>
                  <Badge className="bg-amber-950 text-amber-300 text-[11px]">INFERENCE</Badge>
                </div>
                <div className="p-2.5 rounded bg-black/60 border border-amber-900/40 mt-2 text-amber-200 text-xs space-y-1">
                  <div>"Hypothesis: Adversary is using 198.51.100.24 as Cobalt Strike C2."</div>
                  <div>"Hypothesis: FIN-OPS-01 credentials may be compromised."</div>
                  <div>"Next Step: Awaiting memory dump to confirm C2 beacon config."</div>
                </div>
                <p className="text-slate-300 text-xs mt-2">
                  Legitimate investigative theory explicitly labeled as an inference awaiting proof.
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">MEERA'S STANDARD:</span> "Never state an inference as a fact. Saying 'The attacker exfiltrated the finance database' when you only observed an outbound HTTPS connection is grounds for immediate audit failure."
            </div>
          </div>

          {/* 4 Node Selection Cards */}
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-sky-400">{node.id}</span>
                      {node.badge && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'fvi-verified-fact' ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'fvi-speculative-leap' ? (
                          <AlertTriangle className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'fvi-labeled-hypothesis' ? (
                          <HelpCircle className="w-6 h-6 text-amber-400" />
                        ) : (
                          <Scale className="w-6 h-6 text-purple-400" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm sm:text-base text-white">{node.label}</h5>
                        <p className="text-xs text-slate-400 font-mono">{node.sub}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{node.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 10. STYLE: m14-severity-matrix-scoring (Severity Matrix Scoring)
  // ---------------------------------------------------------------------------
  if (style === 'm14-severity-matrix-scoring') {
    const nodes = severityMatrixScoringNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Gauge className="w-5 h-5 text-cyan-400" />
                <span>Incident Severity Matrix: Critical (Sev-1) to Low (Sev-4) Calibration</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Calibrate incident severity based on asset business criticality, adversary scope, data sensitivity, and operational impact.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              SEVERITY MATRIX
            </Badge>
          </div>

          {/* Severity Tier Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">SEV:</span>
            {[
              { id: 1, label: 'Sev-1: Critical (DC / Active Breach)', node: 'sev-critical-sev1' },
              { id: 2, label: 'Sev-2: High (Host Compromise / C2)', node: 'sev-high-sev2' },
              { id: 3, label: 'Sev-3: Medium (Suspicious Tool / Malware)', node: 'sev-medium-sev3' },
              { id: 4, label: 'Sev-4: Low (Policy Violation / Recon)', node: 'sev-low-sev4' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSeverityTier(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  severityTier === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Severity Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">SEVERITY CALIBRATION SPECIFICATION</span>
              <Badge className="bg-purple-500/20 text-purple-300 text-[11px]">SEV-{severityTier} SELECTED</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className={`p-3 rounded-lg border ${severityTier === 1 ? 'bg-rose-950/50 border-rose-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-rose-400 font-bold">SEV-1 CRITICAL</span>
                <p className="text-white text-xs mt-1">Domain Controller / Root CA</p>
                <p className="text-slate-400 text-[11px] mt-1">SLA: 15-minute phone bridge</p>
              </div>

              <div className={`p-3 rounded-lg border ${severityTier === 2 ? 'bg-amber-950/50 border-amber-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-amber-400 font-bold">SEV-2 HIGH</span>
                <p className="text-white text-xs mt-1">Single Workstation C2 Active</p>
                <p className="text-slate-400 text-[11px] mt-1">SLA: 1-hour containment</p>
              </div>

              <div className={`p-3 rounded-lg border ${severityTier === 3 ? 'bg-blue-950/50 border-blue-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-blue-400 font-bold">SEV-3 MEDIUM</span>
                <p className="text-white text-xs mt-1">Adware / Unapproved LOLBin</p>
                <p className="text-slate-400 text-[11px] mt-1">SLA: 4-hour review</p>
              </div>

              <div className={`p-3 rounded-lg border ${severityTier === 4 ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-slate-400 font-bold">SEV-4 LOW</span>
                <p className="text-white text-xs mt-1">Single Port Scan / Noise</p>
                <p className="text-slate-400 text-[11px] mt-1">SLA: 24-hour batch triage</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">CALIBRATION RULE:</span> Case #2026-881 is classified as <span className="text-amber-400 font-bold">SEV-2 HIGH</span> because C2 was confirmed on WS-04, but lateral movement to Tier-0 DC01 was successfully blocked.
            </div>
          </div>

          {/* 4 Node Selection Cards */}
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-sky-400">{node.id}</span>
                      {node.badge && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'sev-critical-sev1' ? (
                          <Flame className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'sev-high-sev2' ? (
                          <AlertTriangle className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'sev-medium-sev3' ? (
                          <Sliders className="w-6 h-6 text-blue-400" />
                        ) : (
                          <CheckCircle2 className="w-6 h-6 text-slate-400" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm sm:text-base text-white">{node.label}</h5>
                        <p className="text-xs text-slate-400 font-mono">{node.sub}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{node.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 11. STYLE: m14-confidence-scoring-rubric (Confidence Scoring Rubric)
  // ---------------------------------------------------------------------------
  if (style === 'm14-confidence-scoring-rubric') {
    const nodes = confidenceScoringRubricNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <CheckCheck className="w-5 h-5 text-cyan-400" />
                <span>Multi-Sensor Corroboration &amp; Confidence Scoring Rubric</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Base confidence ratings on the quantity and diversity of independent telemetry sources confirming the observable behavior.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              CONFIDENCE RUBRIC
            </Badge>
          </div>

          {/* Sensor Tier Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">TIER:</span>
            {[
              { id: 'dual', label: '1. Dual-Sensor Corroboration (High Confidence)', node: 'cnf-dual-sensor' },
              { id: 'single', label: '2. Single Source (Low Confidence)', node: 'cnf-single-source' },
              { id: 'multi', label: '3. Multi-Corroborated Seal (Confirmed)', node: 'cnf-multi-corroborated' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setConfidenceTier(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  confidenceTier === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Confidence Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">CONFIDENCE SCORING RUBRIC MATRIX</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[11px]">CALIBRATION ACCREDITED</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-3.5 rounded-xl border ${confidenceTier === 'single' ? 'bg-amber-950/40 border-amber-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 font-bold">1 SENSOR: LOW</span>
                  <Badge className="bg-amber-950 text-amber-300 text-[11px]">UNCONFIRMED</Badge>
                </div>
                <p className="text-slate-300 text-xs mt-2">
                  Only 1 sensor observed the event (e.g. firewall port hit without endpoint process log).
                </p>
                <div className="text-[11px] text-amber-300 mt-2">Status: Requires secondary corroboration</div>
              </div>

              <div className={`p-3.5 rounded-xl border ${confidenceTier === 'dual' ? 'bg-cyan-950/40 border-cyan-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-bold">2 SENSORS: HIGH</span>
                  <Badge className="bg-cyan-950 text-cyan-300 text-[11px]">CORROBORATED</Badge>
                </div>
                <p className="text-slate-300 text-xs mt-2">
                  2 independent sensors corroborate the behavior (Sysmon CLI + Zeek network session).
                </p>
                <div className="text-[11px] text-cyan-300 mt-2">Status: Standard for L2 Escalation</div>
              </div>

              <div className={`p-3.5 rounded-xl border ${confidenceTier === 'multi' ? 'bg-emerald-950/40 border-emerald-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold">3+ SENSORS: CONFIRMED</span>
                  <Badge className="bg-emerald-950 text-emerald-300 text-[11px]">FORENSIC PROOF</Badge>
                </div>
                <p className="text-slate-300 text-xs mt-2">
                  Sysmon CLI + Zeek Flow + Volatility memory injected DLL artifact.
                </p>
                <div className="text-[11px] text-emerald-300 mt-2">Status: Court-Defensible Truth</div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">CONFIDENCE SEAL:</span> Case #2026-881 achieves <span className="text-emerald-400 font-bold">HIGH CONFIDENCE</span> with matching Sysmon EID 1, EID 11, and Zeek conn.log.
            </div>
          </div>

          {/* 4 Node Selection Cards */}
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-sky-400">{node.id}</span>
                      {node.badge && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'cnf-single-source' ? (
                          <Radio className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'cnf-dual-sensor' ? (
                          <Activity className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'cnf-multi-corroborated' ? (
                          <CheckCheck className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <ShieldCheck className="w-6 h-6 text-purple-400" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm sm:text-base text-white">{node.label}</h5>
                        <p className="text-xs text-slate-400 font-mono">{node.sub}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{node.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 12. STYLE: m14-case-dispositions-quad (Case Dispositions Quadrant)
  // ---------------------------------------------------------------------------
  if (style === 'm14-case-dispositions-quad') {
    const nodes = caseDispositionsQuadNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" />
                <span>The 4-Way Case Disposition Quadrant</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Every investigated ticket must conclude with one of four definitive dispositions: True Positive (Malicious), True Positive (Benign), False Positive, or Inconclusive.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              DISPOSITION QUADRANT
            </Badge>
          </div>

          {/* Disposition Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">DISPOSITION:</span>
            {[
              { id: 'tp_mal', label: '1. True Positive: Malicious (Incident)', node: 'dsp-true-positive-mal' },
              { id: 'tp_benign', label: '2. True Positive: Benign (Expected)', node: 'dsp-true-positive-benign' },
              { id: 'fp', label: '3. False Positive (Sensor Flaw)', node: 'dsp-false-positive' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setDispositionType(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  dispositionType === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Disposition Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">CASE CLOSURE DISPOSITION MATRIX</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[11px]">DISPOSITION AUDIT</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-3.5 rounded-xl border ${dispositionType === 'tp_mal' ? 'bg-rose-950/50 border-rose-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-rose-400 font-bold">TRUE POSITIVE MALICIOUS</span>
                  <Badge className="bg-rose-950 text-rose-300 text-[11px]">INCIDENT</Badge>
                </div>
                <p className="text-slate-300 text-xs mt-2">
                  Malicious adversary activity confirmed. Proceed to active containment, eradication, and PIR.
                </p>
                <div className="text-[11px] text-rose-300 mt-2">Case #2026-881 Final Disposition ✓</div>
              </div>

              <div className={`p-3.5 rounded-xl border ${dispositionType === 'tp_benign' ? 'bg-blue-950/50 border-blue-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-blue-400 font-bold">TRUE POSITIVE BENIGN</span>
                  <Badge className="bg-blue-950 text-blue-300 text-[11px]">EXPECTED</Badge>
                </div>
                <p className="text-slate-300 text-xs mt-2">
                  Detection rule fired correctly, but behavior was authorized administrative work (CR approved).
                </p>
                <div className="text-[11px] text-blue-300 mt-2">Action: Add exclusion context</div>
              </div>

              <div className={`p-3.5 rounded-xl border ${dispositionType === 'fp' ? 'bg-amber-950/50 border-amber-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 font-bold">FALSE POSITIVE</span>
                  <Badge className="bg-amber-950 text-amber-300 text-[11px]">TUNE RULE</Badge>
                </div>
                <p className="text-slate-300 text-xs mt-2">
                  Sensor or regex defect. Normal benign activity falsely identified as attack logic.
                </p>
                <div className="text-[11px] text-amber-300 mt-2">Action: Send feedback to SIEM engineers</div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">ANANYA'S DISPOSITION LAW:</span> "Never close a ticket as 'False Positive' just because an admin ran the command. If the admin ran the command, it is a True Positive Benign. Respect the detection engineering logic."
            </div>
          </div>

          {/* 4 Node Selection Cards */}
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-sky-400">{node.id}</span>
                      {node.badge && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'dsp-true-positive-mal' ? (
                          <AlertTriangle className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'dsp-true-positive-benign' ? (
                          <CheckCircle2 className="w-6 h-6 text-blue-400" />
                        ) : node.id === 'dsp-false-positive' ? (
                          <Filter className="w-6 h-6 text-amber-400" />
                        ) : (
                          <ShieldCheck className="w-6 h-6 text-purple-400" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm sm:text-base text-white">{node.label}</h5>
                        <p className="text-xs text-slate-400 font-mono">{node.sub}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{node.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 13. STYLE: m14-escalation-chain-roles (Escalation Chain Roles)
  // ---------------------------------------------------------------------------
  if (style === 'm14-escalation-chain-roles') {
    const nodes = escalationChainRolesNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-cyan-400" />
                <span>Formal Escalation Chain &amp; Role Accountability</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Understand the chain of command during an active breach: L1 Triage Analyst -&gt; Shift Lead -&gt; Incident Commander -&gt; Executive Leadership.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              CHAIN OF COMMAND
            </Badge>
          </div>

          {/* Role Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">ROLE:</span>
            {[
              { id: 'l1', label: '1. L1 Triage Analyst', node: 'esc-l1-triage' },
              { id: 'lead', label: '2. SOC Shift Lead', node: 'esc-shift-lead' },
              { id: 'ir_lead', label: '3. Incident Commander (Meera)', node: 'esc-ir-lead' },
              { id: 'ciso', label: '4. CISO & Executive Leadership', node: 'esc-ciso-mgmt' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setEscalationRole(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  escalationRole === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Role Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">ESCALATION HIERARCHY &amp; DECISION AUTHORITY</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[11px]">ROLE: {escalationRole.toUpperCase()}</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              <div className={`p-3 rounded-lg border ${escalationRole === 'l1' ? 'bg-cyan-950/50 border-cyan-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-cyan-400 font-bold">L1 ANALYST</span>
                <p className="text-white text-xs mt-1">First Responder</p>
                <p className="text-slate-300 text-[11px] mt-1">Scopes 5Ws, validates telemetry, creates ticket docket.</p>
              </div>

              <div className={`p-3 rounded-lg border ${escalationRole === 'lead' ? 'bg-purple-950/50 border-purple-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-purple-400 font-bold">SHIFT LEAD</span>
                <p className="text-white text-xs mt-1">Operational Bridge</p>
                <p className="text-slate-300 text-[11px] mt-1">Authorizes workstation isolation, coordinates L1 queue.</p>
              </div>

              <div className={`p-3 rounded-lg border ${escalationRole === 'ir_lead' ? 'bg-emerald-950/50 border-emerald-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-emerald-400 font-bold">INCIDENT COMMANDER</span>
                <p className="text-white text-xs mt-1">Major Incident Lead</p>
                <p className="text-slate-300 text-[11px] mt-1">Declares Sev-1, directs containment, legal liaison.</p>
              </div>

              <div className={`p-3 rounded-lg border ${escalationRole === 'ciso' ? 'bg-amber-950/50 border-amber-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-amber-400 font-bold">CISO / EXEC</span>
                <p className="text-white text-xs mt-1">Governance</p>
                <p className="text-slate-300 text-[11px] mt-1">Regulatory breach disclosures (CERT-In), board briefings.</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">CHAIN OF COMMAND:</span> Individual analysts do not call the CISO directly. Information flows up through the Shift Lead to the Incident Commander.
            </div>
          </div>

          {/* 4 Node Selection Cards */}
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-sky-400">{node.id}</span>
                      {node.badge && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'esc-l1-triage' ? (
                          <UserCheck className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'esc-shift-lead' ? (
                          <Shield className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'esc-ir-lead' ? (
                          <Award className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <Globe className="w-6 h-6 text-amber-400" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm sm:text-base text-white">{node.label}</h5>
                        <p className="text-xs text-slate-400 font-mono">{node.sub}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{node.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 14. STYLE: m14-case-ownership-transfer (Case Ownership Transfer)
  // ---------------------------------------------------------------------------
  if (style === 'm14-case-ownership-transfer') {
    const nodes = caseOwnershipTransferNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <CornerDownRight className="w-5 h-5 text-cyan-400" />
                <span>Case Ownership Transfer Protocol: The Positive Handshake Mandate</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Reassigning a ticket in the SIEM does not transfer ownership! A case remains yours until the receiving engineer confirms positive verbal or chat acknowledgment.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              POSITIVE HANDSHAKE
            </Badge>
          </div>

          {/* Transfer State Stepper */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">STAGE:</span>
            {[
              { id: 'draft', label: '1. Ticket Staging (5Ws Attached)', node: 'own-ticket-staging' },
              { id: 'briefed', label: '2. Verbal / Secure Chat Briefing', node: 'own-summary-briefing' },
              { id: 'acknowledged', label: '3. Positive ACK Received', node: 'own-positive-ack' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setTransferState(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  transferState === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Handshake Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">CASE #2026-881: OWNERSHIP HANDOFF VERIFICATION</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[11px]">POSITIVE HANDSHAKE COMPLETE</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-3.5 rounded-xl border ${transferState === 'draft' ? 'bg-cyan-950/50 border-cyan-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-cyan-400 font-bold">1. TICKET STAGED</span>
                <p className="text-white text-xs mt-1">Dossier Prepared</p>
                <p className="text-slate-300 text-[11px] mt-1">5Ws filled, Sysmon &amp; Zeek logs attached, Sev-2 assigned.</p>
              </div>

              <div className={`p-3.5 rounded-xl border ${transferState === 'briefed' ? 'bg-purple-950/50 border-purple-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-purple-400 font-bold">2. DIRECT BRIEFING</span>
                <p className="text-white text-xs mt-1">Signal / OOB Channel</p>
                <p className="text-slate-300 text-[11px] mt-1">L1 analyst verbally briefs Tier-2 Lead Meera on active C2.</p>
              </div>

              <div className={`p-3.5 rounded-xl border ${transferState === 'acknowledged' ? 'bg-emerald-950/50 border-emerald-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-emerald-400 font-bold">3. POSITIVE ACK</span>
                <p className="text-white text-xs mt-1">Ownership Accepted</p>
                <p className="text-slate-300 text-[11px] mt-1">"I accept ownership of Case #2026-881." - Lead Meera</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">ANANYA'S TRANSFER LAW:</span> "Throwing a ticket over the fence into an unassigned queue without verbal confirmation is abandonment, not escalation. You own the incident until someone says: 'I have it'."
            </div>
          </div>

          {/* 4 Node Selection Cards */}
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-sky-400">{node.id}</span>
                      {node.badge && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'own-ticket-staging' ? (
                          <FileText className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'own-summary-briefing' ? (
                          <MessageSquare className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'own-positive-ack' ? (
                          <CheckCheck className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <ShieldCheck className="w-6 h-6 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm sm:text-base text-white">{node.label}</h5>
                        <p className="text-xs text-slate-400 font-mono">{node.sub}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{node.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 15. STYLE: m14-out-of-band-comms (Out-of-Band Comms)
  // ---------------------------------------------------------------------------
  if (style === 'm14-out-of-band-comms') {
    const nodes = outOfBandCommsNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-cyan-400" />
                <span>Out-of-Band (OOB) Communications &amp; Operational Security</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Never discuss active containment or remediation over corporate email or Teams if the tenant or domain controller might be compromised!
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              OOB OPSEC
            </Badge>
          </div>

          {/* Comms Channel Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">CHANNEL:</span>
            {[
              { id: 'oob_stealth', label: '1. Out-of-Band Channel (Signal / Secure War-Room)', node: 'oob-isolated-channel' },
              { id: 'inband_risk', label: '2. In-Band Channel (Corporate Email / Teams Trap)', node: 'oob-inband-danger' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setCommsChannel(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  commsChannel === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive OPSEC Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">OPERATIONAL SECURITY (OPSEC) CHANNEL AUDIT</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[11px]">OPSEC STATUS</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className={`p-3.5 rounded-xl border ${commsChannel === 'oob_stealth' ? 'bg-emerald-950/40 border-emerald-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold text-xs">OUT-OF-BAND (OOB) SECURE</span>
                  <Badge className="bg-emerald-950 text-emerald-300 text-[11px]">APPROVED ✓</Badge>
                </div>
                <div className="mt-2 text-slate-300 text-xs space-y-1">
                  <div>Channel: Dedicated Signal War-Room / Hardened Bridge</div>
                  <div>Network: Isolated cellular data, off corporate LAN</div>
                  <div>Security: End-to-end encrypted; zero AD integration</div>
                  <div className="text-emerald-300 pt-1">Result: Adversary completely unaware of containment prep!</div>
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border ${commsChannel === 'inband_risk' ? 'bg-rose-950/40 border-rose-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-rose-400 font-bold text-xs">IN-BAND COMPROMISE TRAP</span>
                  <Badge className="bg-rose-950 text-rose-300 text-[11px]">LETHAL OPSEC LEAK ⛔</Badge>
                </div>
                <div className="mt-2 text-slate-300 text-xs space-y-1">
                  <div>Channel: Internal Outlook Email / Microsoft Teams</div>
                  <div>Risk: If Exchange or DC is accessed, adversary reads SOC chat!</div>
                  <div>Adversary Response: Deploys wiper or speeds ransomware</div>
                  <div className="text-rose-300 pt-1">Result: Tipping off the attacker leads to immediate catastrophe!</div>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">ANANYA'S OPSEC LAW:</span> "If there is any suspicion of Domain Controller or Mail Server compromise, all communications immediately shift to verified Out-of-Band channels. Never tip your hand."
            </div>
          </div>

          {/* 4 Node Selection Cards */}
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-sky-400">{node.id}</span>
                      {node.badge && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'oob-inband-danger' ? (
                          <AlertTriangle className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'oob-isolated-channel' ? (
                          <PhoneCall className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'oob-protocol-rules' ? (
                          <Shield className="w-6 h-6 text-purple-400" />
                        ) : (
                          <ShieldCheck className="w-6 h-6 text-cyan-400" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm sm:text-base text-white">{node.label}</h5>
                        <p className="text-xs text-slate-400 font-mono">{node.sub}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{node.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 16. STYLE: m14-shift-handover-briefing (Shift Handover Briefing)
  // ---------------------------------------------------------------------------
  if (style === 'm14-shift-handover-briefing') {
    const nodes = shiftHandoverBriefingNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <History className="w-5 h-5 text-cyan-400" />
                <span>Shift Handover Briefing: 24/7 Situational Continuity</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Ensure zero operational blind spots between shifts. Deliver structured briefings covering open high-sev tickets, containment watchlists, and scheduled IT maintenance.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              SHIFT HANDOVER
            </Badge>
          </div>

          {/* Handover Tab Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">SECTION:</span>
            {[
              { id: 'active_cases', label: '1. Active Incidents (Case #2026-881)', node: 'shf-active-cases' },
              { id: 'watchlist', label: '2. Host Containment Watchlist', node: 'shf-containment-watch' },
              { id: 'maintenance', label: '3. Scheduled Change Windows', node: 'shf-maintenance-window' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setHandoverTab(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  handoverTab === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Handover Dossier Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">CDAC SOC SHIFT HANDOVER LOG: ALPHA TO BRAVO ROTATION</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[11px]">HANDOVER SIGNED</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-3.5 rounded-xl border ${handoverTab === 'active_cases' ? 'bg-cyan-950/50 border-cyan-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-cyan-400 font-bold">1. OPEN SEV-2 CASE</span>
                <p className="text-white text-xs mt-1">Case #2026-881 (Active)</p>
                <p className="text-slate-300 text-[11px] mt-1">Host BLR-BR-WS-04 isolated; awaiting Tier-3 memory analysis dump.</p>
              </div>

              <div className={`p-3.5 rounded-xl border ${handoverTab === 'watchlist' ? 'bg-purple-950/50 border-purple-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-purple-400 font-bold">2. WATCHLIST (3 HOSTS)</span>
                <p className="text-white text-xs mt-1">BLR-BR-WS-12, 13, 02</p>
                <p className="text-slate-300 text-[11px] mt-1">Monitored for beaconing; Zeek alerts routed to high-priority audio queue.</p>
              </div>

              <div className={`p-3.5 rounded-xl border ${handoverTab === 'maintenance' ? 'bg-emerald-950/50 border-emerald-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-emerald-400 font-bold">3. CHANGE WINDOW</span>
                <p className="text-white text-xs mt-1">CR-4412 (02:00-04:00 UTC)</p>
                <p className="text-slate-300 text-[11px] mt-1">IT Admin Rajesh patching WSUS server. Expected restart alerts suppressed.</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">ANANYA'S HANDOVER RULE:</span> "Never leave the shift without an oral briefing and sign-off from the incoming lead. The 10 minutes between shifts are when attackers love to move."
            </div>
          </div>

          {/* 4 Node Selection Cards */}
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-sky-400">{node.id}</span>
                      {node.badge && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'shf-active-cases' ? (
                          <FileText className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'shf-containment-watch' ? (
                          <Eye className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'shf-maintenance-window' ? (
                          <Sliders className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <ShieldCheck className="w-6 h-6 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm sm:text-base text-white">{node.label}</h5>
                        <p className="text-xs text-slate-400 font-mono">{node.sub}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{node.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 17. STYLE: m14-post-incident-lessons (Post-Incident Lessons)
  // ---------------------------------------------------------------------------
  if (style === 'm14-post-incident-lessons') {
    const nodes = postIncidentLessonsNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                <span>Post-Incident Review (PIR) &amp; Root Cause Engineering</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Transform incidents into defensive strength: Conduct blameless post-mortems, identify detection blind spots, and update automated SOAR playbooks.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              POST-INCIDENT REVIEW
            </Badge>
          </div>

          {/* PIR Step Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">STAGE:</span>
            {[
              { id: 'root_cause', label: '1. Root Cause Analysis', node: 'lrn-root-cause' },
              { id: 'detection_gap', label: '2. Detection Gap Closure (Sigma/YARA)', node: 'lrn-detection-gap' },
              { id: 'playbook_update', label: '3. SOAR Playbook Hardening', node: 'lrn-playbook-update' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setPirStep(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  pirStep === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive PIR Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">POST-INCIDENT FEEDBACK LOOP: CASE #2026-881</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[11px]">CONTINUOUS IMPROVEMENT</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-3.5 rounded-xl border ${pirStep === 'root_cause' ? 'bg-cyan-950/50 border-cyan-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-cyan-400 font-bold">1. ROOT CAUSE</span>
                <p className="text-white text-xs mt-1">Malicious Macro Attachment</p>
                <p className="text-slate-300 text-[11px] mt-1">Email gateway lacked inspection for xlsm password-protected zip archives.</p>
              </div>

              <div className={`p-3.5 rounded-xl border ${pirStep === 'detection_gap' ? 'bg-purple-950/50 border-purple-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-purple-400 font-bold">2. DETECTION GAP</span>
                <p className="text-white text-xs mt-1">Sigma Rule Deployed</p>
                <p className="text-slate-300 text-[11px] mt-1">Rule: Detect Excel spawning PowerShell with encoded commands.</p>
              </div>

              <div className={`p-3.5 rounded-xl border ${pirStep === 'playbook_update' ? 'bg-emerald-950/50 border-emerald-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-emerald-400 font-bold">3. SOAR PLAYBOOK</span>
                <p className="text-white text-xs mt-1">Playbook #IR-881 Updated</p>
                <p className="text-slate-300 text-[11px] mt-1">Automatic memory snapshot triggered before host isolation approval prompt.</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">MEERA'S POST-MORTEM PRINCIPLE:</span> "We do not blame people; we fix systems. A successful incident response leaves the enterprise permanently safer against that entire class of threat."
            </div>
          </div>

          {/* 4 Node Selection Cards */}
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-sky-400">{node.id}</span>
                      {node.badge && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'lrn-root-cause' ? (
                          <Search className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'lrn-detection-gap' ? (
                          <ShieldAlert className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'lrn-playbook-update' ? (
                          <Workflow className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <Award className="w-6 h-6 text-amber-400" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm sm:text-base text-white">{node.label}</h5>
                        <p className="text-xs text-slate-400 font-mono">{node.sub}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{node.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 18. STYLE: m14-master-soc-capstone-signoff (Master SOC Capstone Signoff)
  // ---------------------------------------------------------------------------
  if (style === 'm14-master-soc-capstone-signoff') {
    const nodes = masterSocCapstoneSignoffNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Master SOC Capstone Certification: Dual-Mentor Supervisory Sign-off</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                The culmination of the entire Tier-1 SOC curriculum: Complete operational proficiency certified by Mentors Ananya and Meera.
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs font-mono">
              CAPSTONE CERTIFICATION
            </Badge>
          </div>

          {/* Master Capstone Interactive Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">CDAC TIER-1 SOC ANALYST MASTER GRADUATION DOSSIER</span>
              <Badge className="bg-amber-500/20 text-amber-300 text-[11px]">
                {isCapstoneSigned ? 'DUAL-MENTOR SUPERVISORY SEAL AFFIXED ✓' : 'AWAITING FINAL SUPERVISORY SIGN-OFF'}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-bold">1. IR LIFECYCLE MASTERY</span>
                <p className="text-white text-xs font-bold mt-1">NIST &amp; SANS Certified</p>
                <p className="text-slate-300 text-[11px]">Preparedness, scoping, false positive filtering, and blameless PIR.</p>
                <div className="text-emerald-400 text-[11px] font-bold pt-1">STATUS: CERTIFIED ✓</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-purple-400 font-bold">2. FORENSIC RIGOR</span>
                <p className="text-white text-xs font-bold mt-1">Volatile RAM &amp; UTC Timelines</p>
                <p className="text-slate-300 text-[11px]">Evidence preservation doctrine, 5Ws documentation, and facts vs inferences.</p>
                <div className="text-emerald-400 text-[11px] font-bold pt-1">STATUS: CERTIFIED ✓</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold">3. TRIAGE &amp; DISPOSITION</span>
                <p className="text-white text-xs font-bold mt-1">Positive Handshake &amp; OPSEC</p>
                <p className="text-slate-300 text-[11px]">Sev-1 to Sev-4 calibration, 4-way disposition, and OOB communications.</p>
                <div className="text-emerald-400 text-[11px] font-bold pt-1">STATUS: CERTIFIED ✓</div>
              </div>
            </div>

            {/* Supervisory Dual-Mentor Seal Card */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900/60 to-amber-950/40 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="space-y-1 text-center sm:text-left">
                <h5 className="font-bold text-white text-sm">Mentors Ananya &amp; Meera (Senior Incident Responders &amp; Threat Hunters)</h5>
                <p className="text-slate-300 text-xs">
                  "Congratulations, Graduate Analyst! Across Modules 00 through 14, you have demonstrated deep technical competence, forensic discipline, and calm restraint under pressure. You are certified as a CDAC Tier-1 Security Operations Center Analyst!"
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  sound.playSuccess();
                  setIsCapstoneSigned(true);
                  const target = nodes.find((n) => n.id === 'mas-dual-mentor-seal');
                  if (target) onSelectNode(target);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 flex items-center gap-2 ${
                  isCapstoneSigned
                    ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/20'
                    : 'bg-amber-500/25 border border-amber-400 text-amber-300 hover:bg-amber-500/40 shadow-lg shadow-amber-500/20 cursor-pointer'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{isCapstoneSigned ? 'CAPSTONE SEAL AFFIXED & GRADUATED' : 'AFFIX DUAL-MENTOR CAPSTONE SEAL'}</span>
              </button>
            </div>
          </div>

          {/* 4 Node Selection Cards */}
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-sky-400">{node.id}</span>
                      {node.badge && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'mas-ir-lifecycle' ? (
                          <RefreshCw className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'mas-forensic-evidence' ? (
                          <HardDrive className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'mas-triage-disposition' ? (
                          <Target className="w-6 h-6 text-blue-400" />
                        ) : (
                          <Award className="w-6 h-6 text-amber-400" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm sm:text-base text-white">{node.label}</h5>
                        <p className="text-xs text-slate-400 font-mono">{node.sub}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{node.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  return null;
}
