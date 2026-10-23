'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { sound } from '@/lib/sound-effects';
import {
  playbookAnatomyPipelineNodes,
  inputValidationGuardNodes,
  conditionalBranchingLogicNodes,
  automatedEnrichmentLoopNodes,
  caseNotificationDocketNodes,
  notificationEvidenceStandardsNodes,
  humanApprovalGateNodes,
  roleAuthorizationScopeNodes,
  timeoutSilenceDoctrineNodes,
  connectorFailureHandlingNodes,
  boundedRetriesCircuitNodes,
  playbookAuditTrailNodes,
  meaningfulHumanReviewNodes,
  targetMismatchRestraintNodes,
  reversalPlanArchitectureNodes,
  neverAutomateRedlinesNodes,
  deduplicationIdempotencyNodes,
  masterSoarSignoffNodes,
} from './module-12-visual-stories';
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
  Fingerprint,
  ShieldCheck,
  ShieldAlert,
  Laptop,
  CheckCircle,
  XCircle,
  EyeOff,
  RotateCcw,
  Ban,
  Pause,
} from 'lucide-react';
import { VisualNodeItem, VisualStoryStyle } from './interactive-visual-story-engine';

interface Module12GraphicRendererProps {
  style: VisualStoryStyle;
  selectedNodeId: string;
  onSelectNode: (node: VisualNodeItem) => void;
  animStep: number;
}

export function Module12GraphicRenderer({
  style,
  selectedNodeId,
  onSelectNode,
  animStep,
}: Module12GraphicRendererProps) {
  // Local interactive states for Module 12 visual scenarios
  const [pipelineStage, setPipelineStage] = useState<'trigger' | 'input' | 'action' | 'output'>('action');
  const [valMode, setValMode] = useState<'sanitized' | 'malformed'>('sanitized');
  const [branchRoute, setBranchRoute] = useState<'fast_close' | 'human_review' | 'escalate'>('human_review');
  const [enrichmentTab, setEnrichmentTab] = useState<'vt' | 'ldap' | 'edr'>('vt');
  const [docketView, setDocketView] = useState<'preview' | 'json'>('preview');
  const [evidenceStandardTab, setEvidenceStandardTab] = useState<'provenance' | 'time' | 'verdict' | 'limits'>('provenance');
  const [gateDecision, setGateDecision] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [scopeRole, setScopeRole] = useState<'l1' | 'lead' | 'ic'>('lead');
  const [timeoutMode, setTimeoutMode] = useState<'safely_held' | 'auto_action_trap'>('safely_held');
  const [failureSim, setFailureSim] = useState<'handled' | 'crashed'>('handled');
  const [circuitMode, setCircuitMode] = useState<'closed' | 'open' | 'half_open'>('closed');
  const [ledgerStep, setLedgerStep] = useState<number>(3);
  const [reviewAttitude, setReviewAttitude] = useState<'meaningful' | 'rubber_stamp'>('meaningful');
  const [targetContext, setTargetContext] = useState<'workstation' | 'domain_controller'>('workstation');
  const [reversalStep, setReversalStep] = useState<number>(1);
  const [redlineAsset, setRedlineAsset] = useState<'workstation' | 'dc' | 'scada'>('scada');
  const [dedupActive, setDedupActive] = useState<boolean>(true);
  const [isDossierSigned, setIsDossierSigned] = useState<boolean>(false);

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
  // 1. STYLE: m12-playbook-anatomy-pipeline (Playbook Anatomy Pipeline)
  // ---------------------------------------------------------------------------
  if (style === 'm12-playbook-anatomy-pipeline') {
    const nodes = playbookAnatomyPipelineNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Workflow className="w-5 h-5 text-cyan-400" />
                <span>SOAR Playbook Pipeline Anatomy: Trigger, Input Contract, Action & Decision</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                A trigger starts a workflow; actions perform its defined tasks. Conditions direct the path; outputs feed the case ticket.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              PIPELINE ANATOMY
            </Badge>
          </div>

          {/* Pipeline Stage Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">STAGE:</span>
            {[
              { id: 'trigger', label: '1. Ingestion Trigger', node: 'pb-trigger-node' },
              { id: 'input', label: '2. Input Schema Contract', node: 'pb-input-contract' },
              { id: 'action', label: '3. Automated Enrichment Action', node: 'pb-action-node' },
              { id: 'output', label: '4. Decision & Output Docket', node: 'pb-output-decision' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setPipelineStage(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  pipelineStage === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Visual Flow */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">WORKFLOW EXECUTION: PLAYBOOK #IR-881</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[11px]">STATUS: EXECUTING</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 font-mono text-xs">
              <div className={`p-3 rounded-lg border ${pipelineStage === 'trigger' ? 'bg-cyan-950/50 border-cyan-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-cyan-400 font-bold">1. TRIGGER</span>
                <p className="text-slate-300 text-[11px] mt-1">SIEM Webhook received from rule "Suspicious Macro Spawning PowerShell".</p>
              </div>
              <div className={`p-3 rounded-lg border ${pipelineStage === 'input' ? 'bg-purple-950/50 border-purple-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-purple-400 font-bold">2. INPUT SCHEMA</span>
                <p className="text-slate-300 text-[11px] mt-1">Parsed: IP: 198.51.100.24, Host: BLR-BR-WS-04, Hash: 7f8a32b1...</p>
              </div>
              <div className={`p-3 rounded-lg border ${pipelineStage === 'action' ? 'bg-emerald-950/50 border-emerald-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-emerald-400 font-bold">3. ACTION DISPATCH</span>
                <p className="text-slate-300 text-[11px] mt-1">Enrichment APIs dispatched in parallel: VirusTotal, AbuseIPDB, EDR.</p>
              </div>
              <div className={`p-3 rounded-lg border ${pipelineStage === 'output' ? 'bg-amber-950/50 border-amber-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-amber-400 font-bold">4. OUTPUT DOCKET</span>
                <p className="text-slate-300 text-[11px] mt-1">Structured JSON docket attached to Case #2026-881 for human review.</p>
              </div>
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
                        {node.id === 'pb-trigger-node' ? (
                          <Zap className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'pb-input-contract' ? (
                          <Binary className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'pb-action-node' ? (
                          <Cpu className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <CheckCircle2 className="w-6 h-6 text-amber-400" />
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
  // 2. STYLE: m12-input-validation-guard (Input Validation vs Automating an Assumption)
  // ---------------------------------------------------------------------------
  if (style === 'm12-input-validation-guard') {
    const nodes = inputValidationGuardNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Input Validation Guards: Automating an Assumption Repeats the Mistake Faster</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Never pass unvalidated raw strings to downstream APIs. An unvalidated port or trailing slash causes firewall block errors.
              </p>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs font-mono">
              INPUT SCHEMA GUARD
            </Badge>
          </div>

          {/* Validation Mode Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">VALIDATION:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setValMode('sanitized');
                onSelectNode(nodes[1]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                valMode === 'sanitized'
                  ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Sanitized Strict Schema (Defensible ✓)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setValMode('malformed');
                onSelectNode(nodes[0]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                valMode === 'malformed'
                  ? 'bg-red-500/25 border border-red-400 text-red-300 shadow-md shadow-red-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Raw Unvalidated String (Automating Assumption ⚠️)
            </button>
          </div>

          {/* Schema Verification Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 font-mono text-xs">
            <div className="p-3 rounded-lg bg-red-950/30 border border-red-500/30 space-y-1">
              <span className="text-red-400 font-bold">Unsanitized Raw Input:</span>
              <p className="text-slate-300">"198.51.100.42:8080/path/auth.php"</p>
              <div className="text-red-300 text-[11px] pt-1">
                Risk: Passing this directly to Firewall Block API causes syntax error 400 Bad Request!
              </div>
            </div>
            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 space-y-1">
              <span className="text-emerald-400 font-bold">Sanitized Schema Extract:</span>
              <p className="text-emerald-300 font-bold">IP: 198.51.100.42 | Port: 8080 | URI: /path/auth.php</p>
              <div className="text-emerald-300 text-[11px] pt-1">
                Result: Exact IPv4 regex match passed cleanly to network firewall and MISP.
              </div>
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
                        {node.id === 'val-raw-payload' ? (
                          <AlertTriangle className="w-6 h-6 text-red-400" />
                        ) : node.id === 'val-schema-sanitized' ? (
                          <CheckCircle className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'val-assumption-trap' ? (
                          <AlertOctagon className="w-6 h-6 text-amber-400" />
                        ) : (
                          <ShieldCheck className="w-6 h-6 text-sky-400" />
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
  // 3. STYLE: m12-conditional-branching-logic (Conditional Branching Logic)
  // ---------------------------------------------------------------------------
  if (style === 'm12-conditional-branching-logic') {
    const nodes = conditionalBranchingLogicNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Workflow className="w-5 h-5 text-sky-400" />
                <span>Conditional Branching Logic: Deterministic Decision Nodes</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Low-severity events take the automated fast-close path; ambiguous evidence routes to mandatory human analysis.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              BRANCH ROUTING
            </Badge>
          </div>

          {/* Branch Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">BRANCH PATH:</span>
            {[
              { id: 'human_review', label: '1. Ambiguous Evidence (Human Gate)', node: 'branch-ambiguous-gate' },
              { id: 'fast_close', label: '2. Benign Fast-Path (Auto-Close)', node: 'branch-low-severity-fast' },
              { id: 'escalate', label: '3. Critical Escalation (Lead Ananya)', node: 'branch-defensible-routing' },
            ].map((br) => (
              <button
                key={br.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setBranchRoute(br.id as any);
                  const target = nodes.find((n) => n.id === br.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  branchRoute === br.id
                    ? 'bg-sky-500/25 border border-sky-400 text-sky-300 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {br.label}
              </button>
            ))}
          </div>

          {/* Decision Node Routing Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-white font-bold border-b border-slate-800 pb-2">
              <span>DECISION EVALUATION: score = 74, target = "BLR-BR-WS-04"</span>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[11px]">THRESHOLD: AMBIGUOUS</Badge>
            </div>
            <p className="text-slate-300">
              Condition: score &gt; 50 and score &lt; 85 &rarr; Route to Tier-1 Human Gate for context review. Automated containment disabled.
            </p>
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
                        {node.id === 'branch-decision-rules' ? (
                          <Workflow className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'branch-low-severity-fast' ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'branch-ambiguous-gate' ? (
                          <UserCheck className="w-6 h-6 text-amber-400" />
                        ) : (
                          <Award className="w-6 h-6 text-purple-400" />
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
  // 4. STYLE: m12-automated-enrichment-loop (Automated Enrichment Loops)
  // ---------------------------------------------------------------------------
  if (style === 'm12-automated-enrichment-loop') {
    const nodes = automatedEnrichmentLoopNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>Automated Context Enrichment Loops: Threat Feeds & Identity Directory</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Parallel API connectors query external feeds and Active Directory in 1.4s, saving 12 minutes of manual copy-paste toil per alert.
              </p>
            </div>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs font-mono">
              PARALLEL ENRICHMENT
            </Badge>
          </div>

          {/* Enrichment Tabs */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">CONNECTOR:</span>
            {[
              { id: 'vt', label: '1. Threat Intel Feed (VT)', node: 'enr-threat-intel-api' },
              { id: 'ldap', label: '2. Active Directory (LDAP)', node: 'enr-active-directory-ldap' },
              { id: 'edr', label: '3. Multi-Connector Aggregator', node: 'enr-parallel-connectors' },
            ].map((en) => (
              <button
                key={en.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setEnrichmentTab(en.id as any);
                  const target = nodes.find((n) => n.id === en.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  enrichmentTab === en.id
                    ? 'bg-purple-500/25 border border-purple-400 text-purple-300 shadow-md shadow-purple-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {en.label}
              </button>
            ))}
          </div>

          {/* Enrichment Result Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-purple-400 font-bold">1. Threat Intel API:</span>
              <p className="text-slate-300">198.51.100.24 (Score: 88/100, Malicious C2)</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold">2. LDAP Identity:</span>
              <p className="text-slate-300">User: Ramesh (Bangalore Branch Finance)</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 space-y-1">
              <span className="text-emerald-400 font-bold">3. Multiplier Value:</span>
              <p className="text-emerald-300">Total Latency: 1.4s • Time Saved: 12m</p>
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
                        {node.id === 'enr-parallel-connectors' ? (
                          <Network className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'enr-threat-intel-api' ? (
                          <Search className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'enr-active-directory-ldap' ? (
                          <UserCheck className="w-6 h-6 text-amber-400" />
                        ) : (
                          <Award className="w-6 h-6 text-emerald-400" />
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
  // 5. STYLE: m12-case-notification-docket (Structured Notification Docket)
  // ---------------------------------------------------------------------------
  if (style === 'm12-case-notification-docket') {
    const nodes = caseNotificationDocketNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-400" />
                <span>Structured Incident Output Docket & Case Record Notification</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Playbook results must be preserved in a structured format: Deduplication key, target observables, enrichment verdict, and case record link.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              OUTPUT DOCKET
            </Badge>
          </div>

          {/* Toggle */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">DOCKET VIEW:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setDocketView('preview');
                onSelectNode(nodes[0]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                docketView === 'preview'
                  ? 'bg-sky-500/25 border border-sky-400 text-sky-300 shadow-md shadow-sky-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Visual Docket Card (Case Ticket Ready)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setDocketView('json');
                onSelectNode(nodes[1]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                docketView === 'json'
                  ? 'bg-purple-500/25 border border-purple-400 text-purple-300 shadow-md shadow-purple-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Structured JSON Schema
            </button>
          </div>

          {/* Docket View Content */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-sky-300 font-bold">SOAR DOCKET #DOCK-2026-881</span>
              <span className="text-emerald-400 font-bold">DEDUP HASH: e4b19c2...</span>
            </div>
            {docketView === 'preview' ? (
              <div className="text-slate-300 space-y-1">
                <div>Alert: Suspicious Macro Spawning PowerShell</div>
                <div>Target Host: BLR-BR-WS-04 (10.0.4.21) • User: Ramesh</div>
                <div>External C2: 198.51.100.24 (Score: 88/100 Malicious)</div>
                <div className="text-amber-300">Status: Enriched &bull; Ready for Shift Lead Authorization</div>
              </div>
            ) : (
              <pre className="text-purple-300 text-[11px] overflow-x-auto">
                {`{
  "docket_id": "DOCK-2026-881",
  "dedup_key": "SHA256(WS-04:198.51.100.24)",
  "verdict": "MALICIOUS_C2",
  "threat_score": 88,
  "human_review_required": true
}`}
              </pre>
            )}
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
                        {node.id === 'doc-structured-format' ? (
                          <FileText className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'doc-dedup-key' ? (
                          <Hash className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'doc-human-notification' ? (
                          <Bell className="w-6 h-6 text-amber-400" />
                        ) : (
                          <ShieldCheck className="w-6 h-6 text-emerald-400" />
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

  // Bell icon helper
  function Bell(props: any) {
    return <AlertCircle {...props} />;
  }

  // ---------------------------------------------------------------------------
  // 6. STYLE: m12-notification-evidence-standards (Notification Evidence Standards)
  // ---------------------------------------------------------------------------
  if (style === 'm12-notification-evidence-standards') {
    const nodes = notificationEvidenceStandardsNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-sky-400" />
                <span>Notification Evidence Standards: Provenance, Precision & Boundaries</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                A professional notification card includes observable provenance, microsecond UTC timestamps, calibrated verdict confidence, and operational boundaries.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              EVIDENCE STANDARDS
            </Badge>
          </div>

          {/* Standards Tabs */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">STANDARD:</span>
            {[
              { id: 'provenance', label: '1. Provenance Source', node: 'std-observable-provenance' },
              { id: 'time', label: '2. UTC Precision', node: 'std-timestamp-precision' },
              { id: 'verdict', label: '3. Calibrated Confidence', node: 'std-verdict-confidence' },
              { id: 'limits', label: '4. Boundary Notes', node: 'std-boundary-notes' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setEvidenceStandardTab(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  evidenceStandardTab === st.id
                    ? 'bg-sky-500/25 border border-sky-400 text-sky-300 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Standardized Card Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 font-mono text-xs space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Source Provenance:</span>
                <p className="text-white font-bold mt-1">EDR BLR-BR-WS-04</p>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Timestamp:</span>
                <p className="text-sky-300 font-bold mt-1">14:22:04.182 UTC</p>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Confidence Rating:</span>
                <p className="text-emerald-400 font-bold mt-1">92% (High Confidence)</p>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Boundary Scope:</span>
                <p className="text-purple-300 font-bold mt-1">Single Workstation Only</p>
              </div>
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
                        {node.id === 'std-observable-provenance' ? (
                          <Search className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'std-timestamp-precision' ? (
                          <Clock className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'std-verdict-confidence' ? (
                          <Gauge className="w-6 h-6 text-emerald-400" />
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

  // FileCheck helper
  function FileCheck(props: any) {
    return <FileText {...props} />;
  }

  // ---------------------------------------------------------------------------
  // 7. STYLE: m12-human-approval-gate (Human-In-The-Loop Approval Gates)
  // ---------------------------------------------------------------------------
  if (style === 'm12-human-approval-gate') {
    const nodes = humanApprovalGateNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-amber-400" />
                <span>Human-In-The-Loop Approval Gate: Governed Action Execution</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                The playbook halts automatically before disruptive containment. An interactive authorization card waits for explicit human sign-off.
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs font-mono">
              APPROVAL BARRIER
            </Badge>
          </div>

          {/* Interactive Gate Decision Cockpit */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold text-white">
                CONTAINMENT PROPOSAL: ISOLATE WORKSTATION BLR-BR-WS-04
              </span>
              <Badge className={`text-xs font-mono ${gateDecision === 'approved' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : gateDecision === 'rejected' ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'}`}>
                GATE STATUS: {gateDecision.toUpperCase()}
              </Badge>
            </div>

            <p className="text-xs text-slate-300">
              Target: BLR-BR-WS-04 (10.0.4.21) &bull; Justification: Outbound C2 beacon to 198.51.100.24 &bull; Blast Radius: Single user offline.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  sound.playSuccess();
                  setGateDecision('approved');
                  onSelectNode(nodes[3]);
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-emerald-500/25 border border-emerald-400 text-emerald-300 hover:bg-emerald-500/35 transition-all"
              >
                ✓ APPROVE ISOLATION (DISPATCH EDR API)
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setGateDecision('rejected');
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-red-500/25 border border-red-400 text-red-300 hover:bg-red-500/35 transition-all"
              >
                ✗ REJECT &amp; CONTINUE MONITORING
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
                        {node.id === 'gate-workflow-pause' ? (
                          <Pause className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'gate-approval-card' ? (
                          <FileText className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'gate-human-authorization' ? (
                          <UserCheck className="w-6 h-6 text-purple-400" />
                        ) : (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
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
  // 8. STYLE: m12-role-authorization-scope (Role-Based Authorization Scopes)
  // ---------------------------------------------------------------------------
  if (style === 'm12-role-authorization-scope') {
    const nodes = roleAuthorizationScopeNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-sky-400" />
                <span>Role-Based Authorization Scopes: L1 Analyst vs Shift Lead vs IC</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Tier-1 analysts scope single workstations; Shift Lead Ananya approves host isolation; Incident Commander Karthik oversees domain actions.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              RBAC SCOPE
            </Badge>
          </div>

          {/* Scope Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">ROLE SCOPE:</span>
            {[
              { id: 'l1', label: '1. Tier-1: Triage Scope', node: 'scope-tier1-workstation' },
              { id: 'lead', label: '2. Shift Lead: Host Isolation', node: 'scope-tier2-server' },
              { id: 'ic', label: '3. Incident Commander: Enterprise', node: 'scope-commander-enterprise' },
            ].map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setScopeRole(sc.id as any);
                  const target = nodes.find((n) => n.id === sc.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  scopeRole === sc.id
                    ? 'bg-sky-500/25 border border-sky-400 text-sky-300 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {sc.label}
              </button>
            ))}
          </div>

          {/* Scope Matrix Card */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 font-mono text-xs space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              <div className={`p-3 rounded-lg border ${scopeRole === 'l1' ? 'bg-sky-950/50 border-sky-400' : 'bg-slate-900/40 border-slate-800'}`}>
                <span className="text-sky-300 font-bold">Tier-1 Apprentice</span>
                <p className="text-slate-300 text-[11px] mt-1">Read-only enrichment, IoC extraction, pre-isolation checklist preparation.</p>
              </div>
              <div className={`p-3 rounded-lg border ${scopeRole === 'lead' ? 'bg-purple-950/50 border-purple-400' : 'bg-slate-900/40 border-slate-800'}`}>
                <span className="text-purple-300 font-bold">Shift Lead Ananya</span>
                <p className="text-slate-300 text-[11px] mt-1">Authorization to isolate single branch workstation (BLR-BR-WS-04).</p>
              </div>
              <div className={`p-3 rounded-lg border ${scopeRole === 'ic' ? 'bg-emerald-950/50 border-emerald-400' : 'bg-slate-900/40 border-slate-800'}`}>
                <span className="text-emerald-300 font-bold">Incident Commander Karthik</span>
                <p className="text-slate-300 text-[11px] mt-1">Enterprise domain controller quarantine, plant OT escalation sign-off.</p>
              </div>
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
                        {node.id === 'scope-tier1-workstation' ? (
                          <Laptop className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'scope-tier2-server' ? (
                          <Server className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'scope-commander-enterprise' ? (
                          <Award className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <ShieldCheck className="w-6 h-6 text-amber-400" />
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
  // 9. STYLE: m12-timeout-silence-doctrine (Timeout & Silence Doctrine)
  // ---------------------------------------------------------------------------
  if (style === 'm12-timeout-silence-doctrine') {
    const nodes = timeoutSilenceDoctrineNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>The Timeout &amp; Silence Doctrine: Silence Must Not Become Permission</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                If an approval card expires without an answer, the playbook must never auto-execute. Silence is a hold, not authorization.
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs font-mono">
              FAIL-SAFE RESTRAINT
            </Badge>
          </div>

          {/* Toggle */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">TIMEOUT POLICY:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setTimeoutMode('safely_held');
                onSelectNode(nodes[1]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                timeoutMode === 'safely_held'
                  ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Fail-Safe Hold (Default Deny ✓)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setTimeoutMode('auto_action_trap');
                onSelectNode(nodes[0]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                timeoutMode === 'auto_action_trap'
                  ? 'bg-red-500/25 border border-red-400 text-red-300 shadow-md shadow-red-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Dangerous Auto-Approve Fallacy (Runaway Trap ⚠️)
            </button>
          </div>

          {/* Comparison Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 font-mono text-xs">
            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 space-y-1">
              <span className="text-emerald-400 font-bold">Fail-Safe Timeout Behavior (SOC Standard):</span>
              <p className="text-slate-300">Timer hits 15:00 with zero response &rarr; Workflow freezes in Safety Hold.</p>
              <div className="text-emerald-300 text-[11px] pt-1">Action: Alert escalated to on-call pager. Disruptive actions blocked.</div>
            </div>
            <div className="p-3 rounded-lg bg-red-950/30 border border-red-500/30 space-y-1">
              <span className="text-red-400 font-bold">Unsafe Auto-Approval Hazard:</span>
              <p className="text-slate-300">Playbook assumes silence means "yes" and shuts down the branch switch.</p>
              <div className="text-red-300 text-[11px] pt-1">Catastrophe: Unattended script causes unplanned business outage.</div>
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
                        {node.id === 'time-timer-expiration' ? (
                          <Clock className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'time-silence-not-approval' ? (
                          <ShieldAlert className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'time-auto-escalation-hold' ? (
                          <Pause className="w-6 h-6 text-purple-400" />
                        ) : (
                          <Award className="w-6 h-6 text-sky-400" />
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
  // 10. STYLE: m12-connector-failure-handling (Connector Failures & Fallbacks)
  // ---------------------------------------------------------------------------
  if (style === 'm12-connector-failure-handling') {
    const nodes = connectorFailureHandlingNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span>API Connector Failure Handling: Graceful Exceptions &amp; Transparent Logging</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Third-party security APIs time out or return 503 errors. Safe automation catches exceptions gracefully and routes to human fallback queues.
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs font-mono">
              EXCEPTION HANDLING
            </Badge>
          </div>

          {/* Toggle */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">EXCEPTION MODE:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setFailureSim('handled');
                onSelectNode(nodes[1]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                failureSim === 'handled'
                  ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Graceful Catch &amp; Fallback Queue (Safe ✓)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setFailureSim('crashed');
                onSelectNode(nodes[0]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                failureSim === 'crashed'
                  ? 'bg-red-500/25 border border-red-400 text-red-300 shadow-md shadow-red-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Silent Crash / Unhandled 503 (Broken Pipeline ⚠️)
            </button>
          </div>

          {/* Exception Log */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 font-mono text-xs space-y-1.5">
            <div className="text-red-400 font-bold">[HTTP 503] THREAT INTEL CONNECTOR TIMEOUT</div>
            <p className="text-slate-300">
              Catch Block: Exception caught in Step 3. Fallback queue 'manual-triage' assigned with ticket note: "API 503 Timeout".
            </p>
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
                        {node.id === 'fail-api-timeout' ? (
                          <AlertTriangle className="w-6 h-6 text-red-400" />
                        ) : node.id === 'fail-graceful-catch' ? (
                          <RefreshCw className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'fail-fallback-queue' ? (
                          <Folder className="w-6 h-6 text-purple-400" />
                        ) : (
                          <FileText className="w-6 h-6 text-sky-400" />
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
  // 11. STYLE: m12-bounded-retries-circuit (Bounded Retries & Circuit Breaker)
  // ---------------------------------------------------------------------------
  if (style === 'm12-bounded-retries-circuit') {
    const nodes = boundedRetriesCircuitNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Gauge className="w-5 h-5 text-amber-400" />
                <span>Bounded Retries, Exponential Backoff &amp; Circuit Breakers</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Never retry indefinitely. 3 attempts with exponential backoff and jitter. If failure persists, trip the circuit to protect against cascading brownouts.
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs font-mono">
              CIRCUIT BREAKER
            </Badge>
          </div>

          {/* Circuit State Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">CIRCUIT STATE:</span>
            {[
              { id: 'closed', label: '1. Closed (Healthy Traffic)', node: 'retry-exponential-backoff' },
              { id: 'open', label: '2. Open (Tripped / Broken)', node: 'retry-circuit-breaker-trip' },
            ].map((cs) => (
              <button
                key={cs.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setCircuitMode(cs.id as any);
                  const target = nodes.find((n) => n.id === cs.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  circuitMode === cs.id
                    ? 'bg-amber-500/25 border border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cs.label}
              </button>
            ))}
          </div>

          {/* Circuit Status Card */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-white font-bold">API CONNECTOR: MISP THREAT INTEL</span>
              <Badge className={`text-[11px] ${circuitMode === 'open' ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'}`}>
                CIRCUIT {circuitMode.toUpperCase()}
              </Badge>
            </div>
            <p className="text-slate-300">
              {circuitMode === 'closed'
                ? 'Traffic flowing normally. Backoff: 1s, 2s, 4s (+ jitter). Maximum 3 attempts.'
                : '3 consecutive timeouts occurred. Circuit breaker TRIPPED OPEN. API calls paused for 5m to avoid flooding downstream server.'}
            </p>
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
                        {node.id === 'retry-exponential-backoff' ? (
                          <Clock className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'retry-bounded-cap' ? (
                          <Gauge className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'retry-circuit-breaker-trip' ? (
                          <AlertOctagon className="w-6 h-6 text-red-400" />
                        ) : (
                          <ShieldCheck className="w-6 h-6 text-emerald-400" />
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
  // 12. STYLE: m12-playbook-audit-trail (Playbook Execution Audit Trail)
  // ---------------------------------------------------------------------------
  if (style === 'm12-playbook-audit-trail') {
    const nodes = playbookAuditTrailNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-sky-400" />
                <span>Immutable Playbook Audit Trail: Step Logs &amp; Payload Checksums</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Every API call, input payload, decision rule, and response timestamp is stamped into an immutable audit ledger for supervisory compliance.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              AUDIT LEDGER
            </Badge>
          </div>

          {/* Ledger Stepper */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 font-mono text-xs space-y-1.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-white font-bold">SOAR AUDIT LOG • RUN ID: #RUN-2026-881-A</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[11px]">LEDGER SEALED</Badge>
            </div>
            <div className="space-y-1 text-slate-300">
              <div>[14:22:04.102 UTC] STEP 1: Webhook Ingested (Payload SHA-256: 8f4b23...)</div>
              <div>[14:22:04.418 UTC] STEP 2: Input Contract Verified (IP: 198.51.100.24)</div>
              <div>[14:22:05.812 UTC] STEP 3: VT Connector 200 OK (Score: 88, Malicious)</div>
              <div className="text-emerald-400">[14:25:30.010 UTC] STEP 4: Human Gate Approved by Lead Ananya</div>
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
                        {node.id === 'audit-immutable-ledger' ? (
                          <Database className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'audit-chronological-logs' ? (
                          <Clock className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'audit-payload-checksums' ? (
                          <Hash className="w-6 h-6 text-emerald-400" />
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
  // 13. STYLE: m12-meaningful-human-review (Meaningful Human Review)
  // ---------------------------------------------------------------------------
  if (style === 'm12-meaningful-human-review') {
    const nodes = meaningfulHumanReviewNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-400" />
                <span>Meaningful Human Review vs Blind Rubber-Stamping Trap</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Clicking "Approve" without reading the evidence turns human review into security theater. Real accountability demands verification.
              </p>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs font-mono">
              ANALYST SCRUTINY
            </Badge>
          </div>

          {/* Toggle */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">ATTITUDE:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setReviewAttitude('meaningful');
                onSelectNode(nodes[1]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                reviewAttitude === 'meaningful'
                  ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Meaningful Scrutiny (Defensible ✓)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setReviewAttitude('rubber_stamp');
                onSelectNode(nodes[0]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                reviewAttitude === 'rubber_stamp'
                  ? 'bg-red-500/25 border border-red-400 text-red-300 shadow-md shadow-red-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Blind Rubber-Stamping (Security Theater ⚠️)
            </button>
          </div>

          {/* Comparison Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 font-mono text-xs">
            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 space-y-1">
              <span className="text-emerald-400 font-bold">Meaningful Observation Scrutiny:</span>
              <p className="text-slate-300">Analyst inspects parent process lineage and verifies target is NOT a critical domain controller before signing.</p>
            </div>
            <div className="p-3 rounded-lg bg-red-950/30 border border-red-500/30 space-y-1">
              <span className="text-red-400 font-bold">Rubber-Stamping Trap:</span>
              <p className="text-slate-300">Analyst clicks "Yes" in 0.4 seconds without reading. Unintentional business outage ensues.</p>
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
                        {node.id === 'rev-rubber-stamping-trap' ? (
                          <AlertTriangle className="w-6 h-6 text-red-400" />
                        ) : node.id === 'rev-meaningful-scrutiny' ? (
                          <UserCheck className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'rev-false-positive-interception' ? (
                          <Filter className="w-6 h-6 text-purple-400" />
                        ) : (
                          <Award className="w-6 h-6 text-sky-400" />
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
  // 14. STYLE: m12-target-mismatch-restraint (Target Mismatch Restraint)
  // ---------------------------------------------------------------------------
  if (style === 'm12-target-mismatch-restraint') {
    const nodes = targetMismatchRestraintNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-amber-400" />
                <span>Target Mismatch Restraint: Context Precedes Every Playbook Execution</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                A playbook designed for a user workstation must NEVER run against a domain controller or plant SCADA server. Restrain execution on mismatch.
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs font-mono">
              TARGET RESTRAINT
            </Badge>
          </div>

          {/* Asset Context Switcher */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">TARGET ASSET:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setTargetContext('workstation');
                onSelectNode(nodes[0]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                targetContext === 'workstation'
                  ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. BLR-BR-WS-04 (Endpoint Playbook Match ✓)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setTargetContext('domain_controller');
                onSelectNode(nodes[1]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                targetContext === 'domain_controller'
                  ? 'bg-red-500/25 border border-red-400 text-red-300 shadow-md shadow-red-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. DC-01 Domain Controller (Target Mismatch Blocked 🚫)
            </button>
          </div>

          {/* Target Assessment Card */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 font-mono text-xs space-y-2">
            {targetContext === 'workstation' ? (
              <div className="text-emerald-300">
                [VERIFIED MATCH] Asset is an L2 branch office workstation. Workstation isolation playbook authorized.
              </div>
            ) : (
              <div className="text-red-300">
                [MISMATCH BLOCKED] Target is Tier-0 Core Identity Infrastructure (DC-01). Workstation playbook EXECUTION ABORTED.
              </div>
            )}
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
                        {node.id === 'mismatch-asset-check' ? (
                          <Laptop className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'mismatch-context-danger' ? (
                          <AlertOctagon className="w-6 h-6 text-red-400" />
                        ) : node.id === 'mismatch-manual-override' ? (
                          <ShieldAlert className="w-6 h-6 text-amber-400" />
                        ) : (
                          <Award className="w-6 h-6 text-emerald-400" />
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
  // 15. STYLE: m12-reversal-plan-architecture (Reversible Action Architecture)
  // ---------------------------------------------------------------------------
  if (style === 'm12-reversal-plan-architecture') {
    const nodes = reversalPlanArchitectureNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-sky-400" />
                <span>Reversal Plan Architecture: Pre-Action Snapshots &amp; Controlled Restoration</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                A mature response action always records pre-action state first so it can be un-done safely if investigation proves benign.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              REVERSAL ARCHITECTURE
            </Badge>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">REVERSAL STAGE:</span>
            {[
              { step: 1, label: '1. Pre-Action State Record', node: 'rev-state-record' },
              { step: 2, label: '2. Documented Workflow', node: 'rev-documented-workflow' },
              { step: 3, label: '3. Restoration Test', node: 'rev-restoration-ready' },
              { step: 4, label: '4. Controlled Execution', node: 'rev-controlled-unisolation' },
            ].map((st) => (
              <button
                key={st.step}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setReversalStep(st.step);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  reversalStep === st.step
                    ? 'bg-sky-500/25 border border-sky-400 text-sky-300 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Reversal Plan Status */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 font-mono text-xs space-y-1.5">
            <div className="text-sky-300 font-bold border-b border-slate-800 pb-1">
              REVERSAL READINESS: STAGE {reversalStep} ACTIVE
            </div>
            <p className="text-slate-300 pt-1">
              {reversalStep === 1 && 'Pre-action network adapter state and active route tables snapshotted.'}
              {reversalStep === 2 && 'Step-by-step restoration playbook documented with Lead Ananya authorization required.'}
              {reversalStep === 3 && 'Restoration API tested in staging. Endpoint latency response verified.'}
              {reversalStep === 4 && 'Target un-isolated smoothly with zero packet loss after benign clearance.'}
            </p>
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
                        {node.id === 'rev-state-record' ? (
                          <Database className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'rev-documented-workflow' ? (
                          <FileText className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'rev-restoration-ready' ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <RotateCcw className="w-6 h-6 text-amber-400" />
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
  // 16. STYLE: m12-never-automate-redlines (Absolute Automation Redlines)
  // ---------------------------------------------------------------------------
  if (style === 'm12-never-automate-redlines') {
    const nodes = neverAutomateRedlinesNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Ban className="w-5 h-5 text-red-400" />
                <span>Absolute Redlines: What Must Never Run Automatically</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Certain response actions carry catastrophic risk: Domain Controller lockouts, Industrial OT valves, mass tenant credential resets.
              </p>
            </div>
            <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs font-mono">
              ABSOLUTE REDLINES
            </Badge>
          </div>

          {/* Redline Category Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">ASSET REDLINE:</span>
            {[
              { id: 'dc', label: '1. Domain Controller Lockout (Redline 🚫)', node: 'redline-domain-controllers' },
              { id: 'scada', label: '2. Industrial OT / SCADA (Redline 🚫)', node: 'redline-industrial-ot' },
              { id: 'workstation', label: '3. Mass Credential Revocation (Redline 🚫)', node: 'redline-mass-credentials' },
            ].map((rd) => (
              <button
                key={rd.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setRedlineAsset(rd.id as any);
                  const target = nodes.find((n) => n.id === rd.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  redlineAsset === rd.id
                    ? 'bg-red-500/25 border border-red-400 text-red-300 shadow-md shadow-red-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {rd.label}
              </button>
            ))}
          </div>

          {/* Redline Guard Display */}
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 font-mono text-xs space-y-2">
            <span className="text-red-400 font-bold flex items-center gap-2">
              <Ban className="w-4 h-4 text-red-400" />
              HARD-CODED POLICY BARRIER ENGAGED
            </span>
            <p className="text-slate-300">
              Automation engine prohibits programmatic isolation, reboot, or password resets on these assets. Human Incident Commander authorization mandatory.
            </p>
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
                        {node.id === 'redline-domain-controllers' ? (
                          <Server className="w-6 h-6 text-red-400" />
                        ) : node.id === 'redline-industrial-ot' ? (
                          <Flame className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'redline-mass-credentials' ? (
                          <UserX className="w-6 h-6 text-purple-400" />
                        ) : (
                          <Award className="w-6 h-6 text-emerald-400" />
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
  // 17. STYLE: m12-deduplication-idempotency (Deduplication & Idempotency)
  // ---------------------------------------------------------------------------
  if (style === 'm12-deduplication-idempotency') {
    const nodes = deduplicationIdempotencyNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Filter className="w-5 h-5 text-sky-400" />
                <span>Alert Storm Deduplication &amp; Idempotent Execution Guards</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                A single worm triggers 50 duplicate alerts in 20 seconds. Deduplication compresses them into 1 master case; idempotency prevents repeated actions.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              IDEMPOTENCY GUARD
            </Badge>
          </div>

          {/* Toggle */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">DEDUP ENGINE:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setDedupActive(true);
                onSelectNode(nodes[1]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                dedupActive
                  ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Deduplication Active (1 Master Ticket ✓)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setDedupActive(false);
                onSelectNode(nodes[0]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                !dedupActive
                  ? 'bg-red-500/25 border border-red-400 text-red-300 shadow-md shadow-red-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Raw Burst Alert Storm (50 Tickets ⚠️)
            </button>
          </div>

          {/* Storm Status */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 font-mono text-xs space-y-1.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-white font-bold">BURST INGESTION: 50 ALERTS / 20 SECONDS</span>
              <span className={dedupActive ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                {dedupActive ? 'COMPRESSED INTO CASE #2026-881' : '50 SPAM TICKETS CREATED'}
              </span>
            </div>
            <p className="text-slate-300">
              {dedupActive
                ? 'Deduplication key (SHA256(WS-04:198.51.100.24)) matched existing active ticket. Updated event count to 50 without spawning duplicate playbooks.'
                : 'Analyst queue flooded with 50 duplicate tasks. Fatigue and race conditions trigger.'}
            </p>
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
                        {node.id === 'dedup-burst-storm' ? (
                          <Activity className="w-6 h-6 text-red-400" />
                        ) : node.id === 'dedup-key-engine' ? (
                          <Filter className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'dedup-idempotent-guard' ? (
                          <ShieldCheck className="w-6 h-6 text-purple-400" />
                        ) : (
                          <Award className="w-6 h-6 text-sky-400" />
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
  // 18. STYLE: m12-master-soar-signoff (Master SOAR Sign-Off Dossier)
  // ---------------------------------------------------------------------------
  if (style === 'm12-master-soar-signoff') {
    const nodes = masterSoarSignoffNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Master SOAR Execution Dossier &amp; Senior Architect Karthik Certification Seal</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Safe automation rewards restraint as well as successful execution. Certification completes Module 12 SOAR &amp; Basic Automation.
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs font-mono">
              SUPERVISORY SEAL
            </Badge>
          </div>

          {/* Dossier Card */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold text-white">
                MASTER SOAR AUTOMATION AUDIT DOSSIER • MODULE 12
              </span>
              <button
                type="button"
                onClick={() => {
                  sound.playSuccess();
                  setIsDossierSigned(!isDossierSigned);
                  onSelectNode(nodes[3]);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  isDossierSigned
                    ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                    : 'bg-amber-500/25 border border-amber-400 text-amber-300 hover:bg-amber-500/35'
                }`}
              >
                {isDossierSigned ? '✓ DOSSIER SIGNED & SEALED' : 'STAMP KARTHIK SUPERVISORY SEAL'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-sky-400 font-bold">1. Verified Automation Guardrails:</span>
                <div className="text-slate-300 text-[11px]">Schema Validation: ENFORCED (Zero assumptions)</div>
                <div className="text-slate-300 text-[11px]">Human-in-the-Loop Gate: VERIFIED &bull; Default Deny</div>
                <div className="text-slate-300 text-[11px]">Redlines: DC-01 &amp; SCADA Protected from script actions</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold">2. Architectural Execution:</span>
                <div className="text-slate-300 text-[11px]">Case #2026-881: Contained with full reversal plan</div>
                <div className="text-slate-300 text-[11px]">Audit Trail: Immutable cryptographic ledger stamped</div>
                <div className="text-slate-300 text-[11px]">Idempotency: 50 storm events deduplicated cleanly</div>
              </div>
            </div>

            {isDossierSigned && (
              <div className="p-2.5 rounded-lg bg-gradient-to-r from-emerald-950/60 via-slate-900 to-amber-950/60 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-bold text-white">
                    Supervisory Sign-Off: Senior Security Architect Karthik certifies Module 12 Mastered.
                  </span>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs font-mono">
                  READY FOR MODULE 13
                </Badge>
              </div>
            )}
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
                        {node.id === 'soar-dossier-assembly' ? (
                          <FileText className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'soar-safety-certification' ? (
                          <ShieldCheck className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'soar-architect-review' ? (
                          <UserCheck className="w-6 h-6 text-purple-400" />
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
