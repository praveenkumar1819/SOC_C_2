'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { sound } from '@/lib/sound-effects';
import {
  multiWorkbenchEcosystemNodes,
  xdrCrossDomainNodes,
  caseManagementCustodyNodes,
  soarOrchestrationLoopNodes,
  capabilityVsAuthorityNodes,
  safeAutomationGuardrailsNodes,
  otVsItFundamentalsNodes,
  icsComponentsLoopNodes,
  rebootPerilSafetyNodes,
  purdueModelLayersNodes,
  segmentationDmzBoundaryNodes,
  passiveMonitoringDoctrineNodes,
  threeResponseActionsNodes,
  sideEffectsBusinessImpactNodes,
  reversibilityVsJudgmentNodes,
  readOnlyBoundaryNodes,
  antiManufacturedLinkNodes,
  otSpecialistEscalationNodes,
} from './module-10-visual-stories';
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
  Factory,
  Cog,
  Workflow,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Award,
  AlertCircle,
  Copy,
  Laptop,
  CheckCircle,
  XCircle,
  Unlock,
  RadioTower,
  EyeOff,
  Crosshair,
} from 'lucide-react';
import { VisualNodeItem, VisualStoryStyle } from './interactive-visual-story-engine';

interface Module10GraphicRendererProps {
  style: VisualStoryStyle;
  selectedNodeId: string;
  onSelectNode: (node: VisualNodeItem) => void;
  animStep: number;
}

export function Module10GraphicRenderer({
  style,
  selectedNodeId,
  onSelectNode,
  animStep,
}: Module10GraphicRendererProps) {
  // Interactive test states for Module 10 scenarios
  const [activeBench, setActiveBench] = useState<'case' | 'siem' | 'edr' | 'identity'>('case');
  const [xdrMode, setXdrMode] = useState<'audit' | 'marketing'>('audit');
  const [caseTab, setCaseTab] = useState<'owner' | 'decision' | 'vault' | 'closure'>('owner');
  const [soarStep, setSoarStep] = useState<'ingest' | 'enrich' | 'human_gate' | 'action'>('human_gate');
  const [authView, setAuthView] = useState<'capability' | 'authority'>('authority');
  const [activeGuard, setActiveGuard] = useState<'exclusion' | 'ratelimit' | 'fallback'>('exclusion');
  const [domainFocus, setDomainFocus] = useState<'it' | 'ot'>('ot');
  const [simComponent, setSimComponent] = useState<'sensor' | 'controller' | 'actuator' | 'hmi'>('controller');
  const [rebootScenario, setRebootScenario] = useState<'it_reboot' | 'ot_protocol'>('ot_protocol');
  const [purdueLevel, setPurdueLevel] = useState<'l45' | 'l35' | 'l2' | 'l10'>('l35');
  const [dmzConduit, setDmzConduit] = useState<'historian' | 'dual_firewall' | 'rogue_blocked'>('historian');
  const [monitorMethod, setMonitorMethod] = useState<'active_nmap' | 'passive_tap'>('passive_tap');
  const [activeAction, setActiveAction] = useState<'block_ip' | 'disable_account' | 'isolate_host'>('isolate_host');
  const [sideEffectScenario, setSideEffectScenario] = useState<'shared_ip' | 'service_acct' | 'controller'>('controller');
  const [revPerspective, setRevPerspective] = useState<'fallacy' | 'reality'>('reality');
  const [readOnlyState, setReadOnlyState] = useState<'unfamiliar' | 'locked' | 'passive'>('locked');
  const [linkView, setLinkView] = useState<'split' | 'manufactured'>('split');
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
  // 1. STYLE: m10-workbench-ecosystem (The Multi-Workbench Ecosystem)
  // ---------------------------------------------------------------------------
  if (style === 'm10-workbench-ecosystem') {
    const nodes = multiWorkbenchEcosystemNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Workflow className="w-5 h-5 text-sky-400" />
                <span>CDAC Cyber Operations: The Multi-Workbench Ecosystem (Case #2026-881)</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                No single console solves the entire incident. Case management serves as the central hub connecting SIEM, EDR, and Identity.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              ORCHESTRATION ARCHITECTURE
            </Badge>
          </div>

          {/* Interactive Console Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">ACTIVE WORKBENCH:</span>
            {[
              { id: 'case', label: '1. Case Record (Hub)', node: 'bench-case-record' },
              { id: 'siem', label: '2. SIEM Logs', node: 'bench-siem-logs' },
              { id: 'edr', label: '3. EDR Host (WS-04)', node: 'bench-edr-process' },
              { id: 'identity', label: '4. AD Identity', node: 'bench-karthik-synthesis' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveBench(tab.id as any);
                  const target = nodes.find((n) => n.id === tab.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeBench === tab.id
                    ? 'bg-sky-500/25 border border-sky-400 text-sky-300 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Central Hub & Satellite Cockpit */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            {/* Left Satellite: SIEM */}
            <div
              onClick={() => {
                sound.playClick();
                setActiveBench('siem');
                onSelectNode(nodes[1]);
              }}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                activeBench === 'siem'
                  ? 'bg-purple-950/40 border-purple-400 ring-2 ring-purple-500/30'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-purple-300 flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-purple-400" /> SIEM WORKBENCH
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-purple-950 text-purple-300 border border-purple-500/30">
                  HISTORICAL LOGS
                </span>
              </div>
              <p className="text-xs text-slate-300">Enterprise log aggregation across proxy, firewall, and VPN servers.</p>
              <div className="mt-2 text-[11px] font-mono text-purple-200 bg-purple-950/60 p-1.5 rounded border border-purple-500/20">
                Query: index=network dest_ip="198.51.100.24" (3 hits)
              </div>
            </div>

            {/* Center Hub: Master Incident Dossier */}
            <div
              onClick={() => {
                sound.playClick();
                setActiveBench('case');
                onSelectNode(nodes[0]);
              }}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                activeBench === 'case'
                  ? 'bg-sky-950/60 border-sky-400 ring-2 ring-sky-500/40 shadow-lg shadow-sky-500/20'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-sky-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-sky-400" /> CENTRAL CASE HUB
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-950 text-sky-300 border border-sky-500/30">
                  CASE #2026-881
                </span>
              </div>
              <p className="text-xs text-slate-200 font-semibold">Master Dossier & Contemporaneous Record</p>
              <p className="text-xs text-slate-400 mt-1">Preserves verified observables, decision rationale, and ownership across consoles.</p>
              <div className="mt-2 text-[11px] font-mono text-sky-200 bg-sky-950/60 p-2 rounded border border-sky-500/20 flex items-center justify-between">
                <span>Owner: Apprentice Analyst</span>
                <span className="text-emerald-400">SLA: On Target</span>
              </div>
            </div>

            {/* Right Satellite: EDR */}
            <div
              onClick={() => {
                sound.playClick();
                setActiveBench('edr');
                onSelectNode(nodes[2]);
              }}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                activeBench === 'edr'
                  ? 'bg-emerald-950/40 border-emerald-400 ring-2 ring-emerald-500/30'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-emerald-300 flex items-center gap-1.5">
                  <Monitor className="w-4 h-4 text-emerald-400" /> EDR WORKBENCH
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  BLR-BR-WS-04
                </span>
              </div>
              <p className="text-xs text-slate-300">Live endpoint flight recorder showing process lineage and kernel drivers.</p>
              <div className="mt-2 text-[11px] font-mono text-emerald-200 bg-emerald-950/60 p-1.5 rounded border border-emerald-500/20">
                Ancestry: excel.exe &rarr; cmd.exe &rarr; powershell.exe
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
                        {node.id === 'bench-case-record' ? (
                          <ShieldCheck className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'bench-siem-logs' ? (
                          <Database className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'bench-edr-process' ? (
                          <Monitor className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <Workflow className="w-6 h-6 text-amber-400" />
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
  // 2. STYLE: m10-xdr-cross-domain (XDR Cross-Domain Correlation vs Coverage)
  // ---------------------------------------------------------------------------
  if (style === 'm10-xdr-cross-domain') {
    const nodes = xdrCrossDomainNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-sky-400" />
                <span>XDR Cross-Domain Correlation Engine & Coverage Map Reality Check</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Correlating signals across Endpoint, Network, and Cloud Identity. Product names do not replace verified connector telemetry.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              XDR CORRELATION FABRIC
            </Badge>
          </div>

          {/* Reality Audit vs Marketing Claim Toggle */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">COVERAGE PERSPECTIVE:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setXdrMode('audit');
                onSelectNode(nodes[3]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                xdrMode === 'audit'
                  ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Reality Coverage Audit (Active Connectors)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setXdrMode('marketing');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                xdrMode === 'marketing'
                  ? 'bg-amber-500/25 border border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Vendor Marketing Claim (100% Inherent Fallacy)
            </button>
          </div>

          {/* 3 Domain Telemetry Streams + Central Synthesis Fabric */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            {/* Domain 1: Endpoint */}
            <div
              onClick={() => {
                sound.playClick();
                onSelectNode(nodes[0]);
              }}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-sky-400 flex items-center gap-1.5">
                  <Laptop className="w-4 h-4 text-sky-400" /> ENDPOINT DOMAIN
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  HEALTHY
                </span>
              </div>
              <p className="text-xs text-slate-300">Sysmon & EDR process telemetry streaming from BLR-BR-WS-04.</p>
              <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-1.5 rounded border border-slate-800">
                PID 5912: powershell.exe -enc
              </div>
            </div>

            {/* Domain 2: Network */}
            <div
              onClick={() => {
                sound.playClick();
                onSelectNode(nodes[1]);
              }}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-400 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-purple-400" /> NETWORK DOMAIN
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  CONNECTED
                </span>
              </div>
              <p className="text-xs text-slate-300">Zeek wire sensors & firewall session flows without host agents.</p>
              <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-1.5 rounded border border-slate-800">
                TCP SYN &rarr; 198.51.100.24:443 (Outbound)
              </div>
            </div>

            {/* Domain 3: Cloud & Identity */}
            <div
              onClick={() => {
                sound.playClick();
                onSelectNode(nodes[2]);
              }}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-amber-400" /> CLOUD & IDENTITY
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-slate-300">Entra ID & Kerberos authentication tokens for user Ramesh.</p>
              <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-1.5 rounded border border-slate-800">
                User: ramesh@cdac.in (No travel anomaly)
              </div>
            </div>
          </div>

          {/* Central Synthesis Fabric Alert */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-sky-950/60 via-slate-900/70 to-purple-950/60 border border-sky-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-sky-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-white">XDR Correlation Verdict:</span>
                <span className="text-xs text-slate-300 ml-1.5">
                  Single synthesized story: Ramesh executed malicious macro spawning outbound C2 beacon to 198.51.100.24.
                </span>
              </div>
            </div>
            {xdrMode === 'audit' ? (
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs font-mono shrink-0">
                COVERAGE AUDIT PASSED
              </Badge>
            ) : (
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs font-mono shrink-0">
                MARKETING OVERPROMISE
              </Badge>
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
                        {node.id === 'xdr-endpoint-telemetry' ? (
                          <Laptop className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'xdr-network-telemetry' ? (
                          <Activity className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'xdr-cloud-identity' ? (
                          <UserCheck className="w-6 h-6 text-amber-400" />
                        ) : (
                          <Search className="w-6 h-6 text-emerald-400" />
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
  // 3. STYLE: m10-case-management-custody (Case Management & Chain of Custody)
  // ---------------------------------------------------------------------------
  if (style === 'm10-case-management-custody') {
    const nodes = caseManagementCustodyNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-400" />
                <span>Master Incident Ticket & Evidentiary Chain of Custody (Case #2026-881)</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Contemporaneous decision records, SHA-256 evidence vaults, explicit ownership, and supervisory disposition seals.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              LEGAL CHAIN OF CUSTODY
            </Badge>
          </div>

          {/* Dossier Tabs */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">CASE SECTION:</span>
            {[
              { id: 'owner', label: '1. Ownership & SLA', node: 'case-ticket-owner' },
              { id: 'decision', label: '2. Contemporaneous Decision Log', node: 'case-decision-log' },
              { id: 'vault', label: '3. Cryptographic Vault', node: 'case-evidence-artifacts' },
              { id: 'closure', label: '4. Incident Closure Seal', node: 'case-handoff-signoff' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setCaseTab(tab.id as any);
                  const target = nodes.find((n) => n.id === tab.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  caseTab === tab.id
                    ? 'bg-sky-500/25 border border-sky-400 text-sky-300 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Case Dossier Interactive Presentation */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
            {caseTab === 'owner' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-sky-400">TICKET ASSIGNMENT & ESCALATION PATH</span>
                  <span className="text-xs text-emerald-400 font-mono">STATUS: ACTIVE INVESTIGATION</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Assigned Lead:</span>
                    <p className="text-white font-bold mt-1">Apprentice Analyst (SOC Tier-1)</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Shift Supervisor:</span>
                    <p className="text-sky-300 font-bold mt-1">Mentor Ananya (EDR Lead)</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Incident Commander:</span>
                    <p className="text-purple-300 font-bold mt-1">Mentor Karthik (Security Architect)</p>
                  </div>
                </div>
              </div>
            )}

            {caseTab === 'decision' && (
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-sky-400">CONTEMPORANEOUS ACTION RATIONALE LOG</span>
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    <span className="text-sky-400 font-bold">[14:22:15 UTC]</span> EDR Alert #881 ingested. Macro execution detected in Excel PID 4820.
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    <span className="text-amber-400 font-bold">[14:25:30 UTC]</span> Pre-isolation gate verified: Workstation WS-04 confirmed local finance client. No DC services.
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-emerald-500/30 text-emerald-300 bg-emerald-950/20">
                    <span className="text-emerald-400 font-bold">[14:28:00 UTC]</span> Shift Lead Ananya authorization granted. Host isolated via EDR. C2 beacon to 198.51.100.24 terminated.
                  </div>
                </div>
              </div>
            )}

            {caseTab === 'vault' && (
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-sky-400">CRYPTOGRAPHIC EVIDENCE CHECKSUMS (SHA-256)</span>
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-slate-300 font-bold">1. Volatile RAM Dump (BLR-BR-WS-04.raw):</span>
                      <p className="text-slate-400 text-[11px] mt-0.5 truncate max-w-[450px]">
                        sha256: 8f4b23a9d1c7e42b58f9104c3e7284b1509fa61c94b2e8315a7df01e8c459b72
                      </p>
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[11px]">VERIFIED HASH</Badge>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-slate-300 font-bold">2. Wire Capture Carved PCAP (case-881-c2.pcap):</span>
                      <p className="text-slate-400 text-[11px] mt-0.5 truncate max-w-[450px]">
                        sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                      </p>
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[11px]">VERIFIED HASH</Badge>
                  </div>
                </div>
              </div>
            )}

            {caseTab === 'closure' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400">DISPOSITION: TRUE POSITIVE MALICIOUS (CONTAINED)</span>
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs font-mono">
                    SUPERVISORY STAMP: APPROVED
                  </Badge>
                </div>
                <p className="text-xs text-slate-300">
                  Threat successfully contained. Lateral movement verified zero. Volatile evidence preserved. Case ready for formal executive briefing and compliance audit.
                </p>
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
                        {node.id === 'case-ticket-owner' ? (
                          <UserCheck className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'case-decision-log' ? (
                          <FileText className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'case-evidence-artifacts' ? (
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
  // 4. STYLE: m10-soar-orchestration-loop (SOAR Orchestration Loop)
  // ---------------------------------------------------------------------------
  if (style === 'm10-soar-orchestration-loop') {
    const nodes = soarOrchestrationLoopNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Cog className="w-5 h-5 text-sky-400" />
                <span>SOAR Playbook Orchestration Loop: Automated Ingestion to Governed Action</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                SOAR coordinates repeatable tasks and enriches IOCs, but enforces human-in-the-loop review points before disruptive actions.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              PLAYBOOK PIPELINE
            </Badge>
          </div>

          {/* Interactive Playbook Progression Steps */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">PLAYBOOK STAGE:</span>
            {[
              { id: 'ingest', label: '1. Ingest Trigger', node: 'soar-ingest-trigger' },
              { id: 'enrich', label: '2. Multi-API Context', node: 'soar-automated-enrichment' },
              { id: 'human_gate', label: '3. Human Approval Gate', node: 'soar-analyst-decision-gate' },
              { id: 'action', label: '4. Governed Execution', node: 'soar-structured-action' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSoarStep(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  soarStep === st.id
                    ? 'bg-sky-500/25 border border-sky-400 text-sky-300 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* 4-Stage Visual Playbook Flow */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            {/* Step 1: Ingestion */}
            <div className={`p-3 rounded-lg border ${soarStep === 'ingest' ? 'bg-sky-950/40 border-sky-400 ring-2 ring-sky-500/30' : 'bg-slate-900/40 border-slate-800'}`}>
              <span className="text-xs font-mono font-bold text-sky-400">1. ALERT INGESTION</span>
              <p className="text-xs text-slate-300 mt-1">Webhook triggers Playbook IR-881 from EDR high-severity alert.</p>
              <div className="text-[11px] font-mono text-slate-400 mt-2">Latency: 120ms</div>
            </div>

            {/* Step 2: Parallel Enrichment */}
            <div className={`p-3 rounded-lg border ${soarStep === 'enrich' ? 'bg-purple-950/40 border-purple-400 ring-2 ring-purple-500/30' : 'bg-slate-900/40 border-slate-800'}`}>
              <span className="text-xs font-mono font-bold text-purple-400">2. PARALLEL ENRICHMENT</span>
              <p className="text-xs text-slate-300 mt-1">VT, AbuseIPDB, Entra ID queried in 1.4s. Time saved: 12 minutes.</p>
              <div className="text-[11px] font-mono text-purple-300 mt-2">3 APIs Synchronized</div>
            </div>

            {/* Step 3: Human Gate */}
            <div className={`p-3 rounded-lg border ${soarStep === 'human_gate' ? 'bg-amber-950/40 border-amber-400 ring-2 ring-amber-500/30' : 'bg-slate-900/40 border-slate-800'}`}>
              <span className="text-xs font-mono font-bold text-amber-400">3. HUMAN-IN-THE-LOOP</span>
              <p className="text-xs text-slate-300 mt-1">Playbook halts. Interactive prompt: "Authorize WS-04 isolation?"</p>
              <div className="text-[11px] font-mono text-amber-300 mt-2">Waiting for Analyst</div>
            </div>

            {/* Step 4: Audited Action */}
            <div className={`p-3 rounded-lg border ${soarStep === 'action' ? 'bg-emerald-950/40 border-emerald-400 ring-2 ring-emerald-500/30' : 'bg-slate-900/40 border-slate-800'}`}>
              <span className="text-xs font-mono font-bold text-emerald-400">4. AUDITED EXECUTION</span>
              <p className="text-xs text-slate-300 mt-1">EDR isolation command dispatched via API. Ticket ledger updated.</p>
              <div className="text-[11px] font-mono text-emerald-300 mt-2">Status: Executed & Logged</div>
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
                        {node.id === 'soar-ingest-trigger' ? (
                          <Zap className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'soar-automated-enrichment' ? (
                          <Sparkles className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'soar-analyst-decision-gate' ? (
                          <AlertOctagon className="w-6 h-6 text-amber-400" />
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
  // 5. STYLE: m10-capability-vs-authority (Technical Capability vs Authority)
  // ---------------------------------------------------------------------------
  if (style === 'm10-capability-vs-authority') {
    const nodes = capabilityVsAuthorityNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-sky-400" />
                <span>Technical API Capability vs Operational Authority (The Lever vs The Permission)</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                A tool's technical capability is never permission to use it. Capability is what the API can do; authority is what policy permits.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              GOVERNANCE MATRIX
            </Badge>
          </div>

          {/* Perspective Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">VIEWPOINT:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setAuthView('authority');
                onSelectNode(nodes[1]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                authView === 'authority'
                  ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Operational Authority (Governance Matrix)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setAuthView('capability');
                onSelectNode(nodes[0]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                authView === 'capability'
                  ? 'bg-amber-500/25 border border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Raw API Capability (Unchecked Lever)
            </button>
          </div>

          {/* Dual-Panel Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            {/* Raw Capability Panel */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-amber-500/30 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> RAW TECHNICAL LEVER (CAN YOU?)
              </span>
              <p className="text-xs text-slate-300">
                The API token has root access: it CAN isolate 4,000 workstations, revoke AD admin tokens, and reboot core switches.
              </p>
              <div className="text-[11px] font-mono text-amber-300 bg-amber-950/40 p-2 rounded border border-amber-500/20">
                Risk: Runaway automation causes massive company-wide operational outage on Monday morning.
              </div>
            </div>

            {/* Governed Authority Panel */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-emerald-500/30 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> OPERATIONAL PERMISSION (MAY YOU?)
              </span>
              <p className="text-xs text-slate-300">
                Governance policy defines who is permitted to act. L1 analysts prepare verified observables; Shift Leads authorize containment.
              </p>
              <div className="text-[11px] font-mono text-emerald-300 bg-emerald-950/40 p-2 rounded border border-emerald-500/20">
                Rule: Never confuse the ability to pull a technical trigger with the authority to do so.
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
                        {node.id === 'auth-api-capability' ? (
                          <Sliders className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'auth-policy-boundary' ? (
                          <ShieldCheck className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'auth-unilateral-danger' ? (
                          <AlertTriangle className="w-6 h-6 text-red-400" />
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
  // 6. STYLE: m10-safe-automation-guardrails (Guardrails & Failure Handling)
  // ---------------------------------------------------------------------------
  if (style === 'm10-safe-automation-guardrails') {
    const nodes = safeAutomationGuardrailsNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-sky-400" />
                <span>Safe Automation Guardrails: Blocklists, Rate Limiters & Graceful Fallbacks</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Hard-coded exclusion lists, blast-radius rate limiting, transparent fallback logging, and immutable execution ledgers.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              DEFENSIVE CIRCUIT BREAKERS
            </Badge>
          </div>

          {/* Guardrail Simulator Tabs */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">GUARDRAIL MECHANISM:</span>
            {[
              { id: 'exclusion', label: '1. Critical Asset Blocklist', node: 'guard-critical-asset-blocklist' },
              { id: 'ratelimit', label: '2. Rate Limiting (Max 3/15m)', node: 'guard-rate-limiter' },
              { id: 'fallback', label: '3. Graceful Fallback Route', node: 'guard-fallback-route' },
            ].map((gd) => (
              <button
                key={gd.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveGuard(gd.id as any);
                  const target = nodes.find((n) => n.id === gd.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeGuard === gd.id
                    ? 'bg-sky-500/25 border border-sky-400 text-sky-300 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {gd.label}
              </button>
            ))}
          </div>

          {/* Guardrail Status Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
            {activeGuard === 'exclusion' && (
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-sky-400">HARD-CODED ASSET EXCLUSION LIST (CANNOT BE OVERRIDDEN)</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
                  <div className="p-2.5 rounded bg-slate-900 border border-emerald-500/30">
                    <span className="text-emerald-400 font-bold">DC-01 (Domain Controller)</span>
                    <p className="text-slate-400 text-[11px] mt-1">Automated isolation: PROHIBITED</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-emerald-500/30">
                    <span className="text-emerald-400 font-bold">BLR-PLANT-PLC-01 (ICS)</span>
                    <p className="text-slate-400 text-[11px] mt-1">Automated isolation: PROHIBITED</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-sky-500/30">
                    <span className="text-sky-300 font-bold">BLR-BR-WS-04 (Endpoint)</span>
                    <p className="text-emerald-400 text-[11px] mt-1">Human-Gate Approved: ALLOWED</p>
                  </div>
                </div>
              </div>
            )}

            {activeGuard === 'ratelimit' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400">BLAST-RADIUS RATE LIMITER STATUS</span>
                  <span className="text-xs font-mono text-slate-300">1 / 3 ACTIONS USED (WINDOW: 15m)</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-3 border border-slate-800 overflow-hidden">
                  <div className="bg-amber-400 h-full w-1/3 transition-all" />
                </div>
                <p className="text-xs text-slate-300">
                  If more than 3 containment actions trigger within 15 minutes, the circuit breaker trips, freezing automated response and paging Senior Architect Karthik.
                </p>
              </div>
            )}

            {activeGuard === 'fallback' && (
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-purple-400">GRACEFUL DEGRADATION ON API FAILURE</span>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
                  <div className="text-red-400">504 Gateway Timeout: VirusTotal Threat Intel API</div>
                  <div className="text-slate-300">Playbook Action: Playbook does not crash. Logs error code VT_504_TIMEOUT.</div>
                  <div className="text-emerald-400">Fallback Route: Case routed to on-call analyst queue for manual inspection.</div>
                </div>
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
                        {node.id === 'guard-critical-asset-blocklist' ? (
                          <Lock className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'guard-rate-limiter' ? (
                          <Gauge className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'guard-fallback-route' ? (
                          <RefreshCw className="w-6 h-6 text-purple-400" />
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
  // 7. STYLE: m10-ot-vs-it-fundamentals (IT vs OT Fundamentals)
  // ---------------------------------------------------------------------------
  if (style === 'm10-ot-vs-it-fundamentals') {
    const nodes = otVsItFundamentalsNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Factory className="w-5 h-5 text-sky-400" />
                <span>IT vs OT Fundamentals: Data Security vs The Physical Kinetic World</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                In enterprise IT, latency delays an email. In industrial OT, latency can blow a physical pressure gasket.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              PHYSICAL PROCESS SECURITY
            </Badge>
          </div>

          {/* Domain Focus Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">SECURITY ENVIRONMENT:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setDomainFocus('ot');
                onSelectNode(nodes[1]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                domainFocus === 'ot'
                  ? 'bg-amber-500/25 border border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Industrial OT (Physical Safety & Availability First)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setDomainFocus('it');
                onSelectNode(nodes[0]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                domainFocus === 'it'
                  ? 'bg-sky-500/25 border border-sky-400 text-sky-300 shadow-md shadow-sky-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Enterprise IT (Confidentiality First)
            </button>
          </div>

          {/* Flipped Security Triad Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            {/* IT Model */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-sky-500/30 space-y-2">
              <span className="text-xs font-mono font-bold text-sky-400 flex items-center gap-1.5">
                <Laptop className="w-4 h-4 text-sky-400" /> ENTERPRISE IT: C-I-A TRIAD
              </span>
              <div className="space-y-1 font-mono text-xs">
                <div className="p-1.5 rounded bg-sky-950/50 text-sky-300 font-bold border border-sky-500/20">
                  1. Confidentiality (Data encryption, privacy)
                </div>
                <div className="p-1.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                  2. Integrity (Data accuracy, backups)
                </div>
                <div className="p-1.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                  3. Availability (Uptime: 99.9% tolerated)
                </div>
              </div>
              <p className="text-xs text-slate-400 pt-1">Priority: Keep corporate data confidential from external eyes.</p>
            </div>

            {/* OT Model */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-amber-500/30 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <Factory className="w-4 h-4 text-amber-400" /> INDUSTRIAL OT: S-A-I-C TRIAD
              </span>
              <div className="space-y-1 font-mono text-xs">
                <div className="p-1.5 rounded bg-red-950/50 text-red-300 font-bold border border-red-500/20">
                  1. Physical Safety (Human life, zero leaks)
                </div>
                <div className="p-1.5 rounded bg-amber-950/50 text-amber-300 font-bold border border-amber-500/20">
                  2. Availability (Process continuity: 24/7/365)
                </div>
                <div className="p-1.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                  3. Integrity &rarr; 4. Confidentiality
                </div>
              </div>
              <p className="text-xs text-slate-400 pt-1">Priority: Protect human life and keep plant machinery running safely.</p>
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
                        {node.id === 'fund-it-data' ? (
                          <Laptop className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'fund-ot-kinetic' ? (
                          <Factory className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'fund-cia-flip' ? (
                          <RefreshCw className="w-6 h-6 text-purple-400" />
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
  // 8. STYLE: m10-ics-components-loop (Industrial Simulator: Control Loop)
  // ---------------------------------------------------------------------------
  if (style === 'm10-ics-components-loop') {
    const nodes = icsComponentsLoopNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Cog className="w-5 h-5 text-sky-400" />
                <span>CDAC Industrial Control Loop Simulator: Sensor, Controller, Actuator & HMI</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                The closed-loop industrial cycle: physical sensors measure, PLCs compute ladder logic, actuators exert kinetic force, HMIs supervise.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              ICS CONTROL LOOP
            </Badge>
          </div>

          {/* Component Tabs */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">SIMULATOR ELEMENT:</span>
            {[
              { id: 'sensor', label: '1. Sensor (Pressure)', node: 'ics-physical-sensor' },
              { id: 'controller', label: '2. Controller (PLC)', node: 'ics-plc-controller' },
              { id: 'actuator', label: '3. Actuator (Pump)', node: 'ics-physical-actuator' },
              { id: 'hmi', label: '4. Supervisor (HMI)', node: 'ics-hmi-supervisor' },
            ].map((cp) => (
              <button
                key={cp.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSimComponent(cp.id as any);
                  const target = nodes.find((n) => n.id === cp.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  simComponent === cp.id
                    ? 'bg-sky-500/25 border border-sky-400 text-sky-300 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cp.label}
              </button>
            ))}
          </div>

          {/* Closed-Loop Industrial Diagram */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* 1. Sensor */}
              <div className={`p-3 rounded-lg border ${simComponent === 'sensor' ? 'bg-sky-950/50 border-sky-400 ring-2 ring-sky-500/30' : 'bg-slate-900/40 border-slate-800'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-sky-300">1. SENSOR</span>
                  <Activity className="w-4 h-4 text-sky-400" />
                </div>
                <p className="text-xs text-slate-300">Pressure Transducer PT-101</p>
                <div className="mt-2 text-[11px] font-mono text-sky-200 bg-sky-950 p-1.5 rounded">
                  Reading: 78.4 PSI (Nominal)
                </div>
              </div>

              {/* 2. Controller */}
              <div className={`p-3 rounded-lg border ${simComponent === 'controller' ? 'bg-purple-950/50 border-purple-400 ring-2 ring-purple-500/30' : 'bg-slate-900/40 border-slate-800'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-purple-300">2. CONTROLLER</span>
                  <Cpu className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-xs text-slate-300">PLC-02 (Ladder Logic Scan)</p>
                <div className="mt-2 text-[11px] font-mono text-purple-200 bg-purple-950 p-1.5 rounded">
                  Loop: 10ms Scan Cycle
                </div>
              </div>

              {/* 3. Actuator */}
              <div className={`p-3 rounded-lg border ${simComponent === 'actuator' ? 'bg-amber-950/50 border-amber-400 ring-2 ring-amber-500/30' : 'bg-slate-900/40 border-slate-800'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-amber-300">3. ACTUATOR</span>
                  <Power className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-xs text-slate-300">Relief Valve &amp; Pump P-102</p>
                <div className="mt-2 text-[11px] font-mono text-amber-200 bg-amber-950 p-1.5 rounded">
                  State: Running (85% duty)
                </div>
              </div>

              {/* 4. Supervisor */}
              <div className={`p-3 rounded-lg border ${simComponent === 'hmi' ? 'bg-emerald-950/50 border-emerald-400 ring-2 ring-emerald-500/30' : 'bg-slate-900/40 border-slate-800'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-emerald-300">4. SUPERVISOR</span>
                  <Monitor className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-xs text-slate-300">Control Room Operator HMI</p>
                <div className="mt-2 text-[11px] font-mono text-emerald-200 bg-emerald-950 p-1.5 rounded">
                  Status: Operator Supervised
                </div>
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
                        {node.id === 'ics-physical-sensor' ? (
                          <Activity className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'ics-plc-controller' ? (
                          <Cpu className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'ics-physical-actuator' ? (
                          <Power className="w-6 h-6 text-amber-400" />
                        ) : (
                          <Monitor className="w-6 h-6 text-emerald-400" />
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
  // 9. STYLE: m10-reboot-peril-safety (The Peril of the IT Reboot in OT)
  // ---------------------------------------------------------------------------
  if (style === 'm10-reboot-peril-safety') {
    const nodes = rebootPerilSafetyNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span>The Peril of the IT Reboot in Industrial Plants: Physical Consequences</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                The routine IT habit of "just restart the server" drops PLC outputs, causing water hammer, burst pipes, and safety trips.
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs font-mono">
              KINETIC REBOOT HAZARD
            </Badge>
          </div>

          {/* Scenario Comparison Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">REBOOT APPROACH:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setRebootScenario('ot_protocol');
                onSelectNode(nodes[2]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                rebootScenario === 'ot_protocol'
                  ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Engineering Protocol (Controlled Safety)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setRebootScenario('it_reboot');
                onSelectNode(nodes[1]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                rebootScenario === 'it_reboot'
                  ? 'bg-red-500/25 border border-red-400 text-red-300 shadow-md shadow-red-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Rookie IT Reboot Reflex (Catastrophic)
            </button>
          </div>

          {/* Physical Consequence Comparison Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            {/* IT Reboot Reflex */}
            <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30 space-y-2">
              <span className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-red-400" /> UNCHECKED IT REBOOT REFLEX
              </span>
              <p className="text-xs text-slate-300">
                Analyst runs remote reboot on PLC-02. Output relays lose power for 15s. Spring-loaded valves slam shut instantly.
              </p>
              <div className="text-[11px] font-mono text-red-300 bg-red-950/50 p-2 rounded border border-red-500/30 space-y-1">
                <div>Hydraulic Shock (Water Hammer): 340 PSI Spike!</div>
                <div>Result: Cracked flange gasket, coolant leak, emergency plant trip.</div>
              </div>
            </div>

            {/* Plant Engineering Protocol */}
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> PLANT ENGINEERING COORDINATION
              </span>
              <p className="text-xs text-slate-300">
                Analyst consults Lead Operator Sunil. Manual bypass valves are locked open before any controller maintenance is performed.
              </p>
              <div className="text-[11px] font-mono text-emerald-300 bg-emerald-950/50 p-2 rounded border border-emerald-500/30 space-y-1">
                <div>Process Continues: Liquid flows safely through bypass line.</div>
                <div>Result: Zero equipment damage, human safety guaranteed.</div>
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
                        {node.id === 'peril-it-reboot-habit' ? (
                          <RefreshCw className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'peril-ot-catastrophe' ? (
                          <Flame className="w-6 h-6 text-red-400" />
                        ) : node.id === 'peril-specialist-protocol' ? (
                          <ShieldCheck className="w-6 h-6 text-emerald-400" />
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
  // 10. STYLE: m10-purdue-model-layers (The Purdue Model Hierarchy)
  // ---------------------------------------------------------------------------
  if (style === 'm10-purdue-model-layers') {
    const nodes = purdueModelLayersNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-400" />
                <span>The Purdue Model Hierarchy (ISA-95 / IEC 62443 Reference Architecture)</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Architectural separation protecting physical equipment: Levels 4/5 (Enterprise), 3.5 (IDMZ), 2 (Supervisory), 1/0 (Control & Physical).
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              PLANT SEGMENTATION HIERARCHY
            </Badge>
          </div>

          {/* Level Selector Tabs */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">PURDUE LEVEL:</span>
            {[
              { id: 'l45', label: 'Levels 4/5: Enterprise IT', node: 'purdue-l4-enterprise' },
              { id: 'l35', label: 'Level 3.5: Industrial DMZ', node: 'purdue-l35-dmz' },
              { id: 'l2', label: 'Level 2: Supervisory SCADA', node: 'purdue-l2-supervisory' },
              { id: 'l10', label: 'Levels 1/0: PLCs & Physical', node: 'purdue-l10-physical' },
            ].map((lv) => (
              <button
                key={lv.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setPurdueLevel(lv.id as any);
                  const target = nodes.find((n) => n.id === lv.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  purdueLevel === lv.id
                    ? 'bg-sky-500/25 border border-sky-400 text-sky-300 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {lv.label}
              </button>
            ))}
          </div>

          {/* Stacked Architecture Ladder */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
            {/* L4/5 */}
            <div className={`p-2.5 rounded-lg border transition-all flex items-center justify-between ${purdueLevel === 'l45' ? 'bg-sky-950/60 border-sky-400' : 'bg-slate-900/40 border-slate-800'}`}>
              <div className="flex items-center gap-2">
                <Laptop className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-mono font-bold text-white">LEVELS 4 &amp; 5: ENTERPRISE IT NETWORK</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Finance WS-04 • Corporate Email • Internet Uplink</span>
            </div>

            {/* Boundary 1 */}
            <div className="flex items-center justify-center text-[11px] font-mono text-amber-400 gap-2">
              <span className="h-px bg-amber-500/40 flex-1" />
              <span>FIREWALL BOUNDARY: STRICT ZERO-ROUTING RULE</span>
              <span className="h-px bg-amber-500/40 flex-1" />
            </div>

            {/* L3.5 */}
            <div className={`p-2.5 rounded-lg border transition-all flex items-center justify-between ${purdueLevel === 'l35' ? 'bg-purple-950/60 border-purple-400' : 'bg-slate-900/40 border-slate-800'}`}>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-mono font-bold text-white">LEVEL 3.5: INDUSTRIAL DMZ (IDMZ)</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Replicated Data Historian • Jump Hosts • Outward Only</span>
            </div>

            {/* L2 */}
            <div className={`p-2.5 rounded-lg border transition-all flex items-center justify-between ${purdueLevel === 'l2' ? 'bg-emerald-950/60 border-emerald-400' : 'bg-slate-900/40 border-slate-800'}`}>
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-white">LEVEL 2: SUPERVISORY CONTROL NETWORK</span>
              </div>
              <span className="text-xs font-mono text-slate-400">SCADA Servers • Operator HMI Screens • Alarm Consoles</span>
            </div>

            {/* L1/0 */}
            <div className={`p-2.5 rounded-lg border transition-all flex items-center justify-between ${purdueLevel === 'l10' ? 'bg-amber-950/60 border-amber-400' : 'bg-slate-900/40 border-slate-800'}`}>
              <div className="flex items-center gap-2">
                <Factory className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono font-bold text-white">LEVELS 1 &amp; 0: BASIC CONTROL &amp; PHYSICAL FIELD</span>
              </div>
              <span className="text-xs font-mono text-slate-400">PLCs / RTUs • Pumps • Pressure Valves • Physical Matter</span>
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
                        {node.id === 'purdue-l4-enterprise' ? (
                          <Laptop className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'purdue-l35-dmz' ? (
                          <Database className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'purdue-l2-supervisory' ? (
                          <Monitor className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <Factory className="w-6 h-6 text-amber-400" />
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
  // 11. STYLE: m10-segmentation-dmz-boundary (Industrial DMZ & Data Historian)
  // ---------------------------------------------------------------------------
  if (style === 'm10-segmentation-dmz-boundary') {
    const nodes = segmentationDmzBoundaryNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-sky-400" />
                <span>Industrial DMZ Architecture & Replicated Data Historian Telemetry</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Data flows outward into the IDMZ mirror; control commands never flow inward from enterprise corporate networks.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              UNIDIRECTIONAL REPLICATION
            </Badge>
          </div>

          {/* Conduit Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">CONDUIT PATH:</span>
            {[
              { id: 'historian', label: '1. Mirrored Historian (Approved ✓)', node: 'seg-mirrored-historian' },
              { id: 'dual_firewall', label: '2. Dual-Firewall Perimeter', node: 'seg-industrial-dmz-firewall' },
              { id: 'rogue_blocked', label: '3. Rogue Direct Path (Blocked 🚫)', node: 'seg-unapproved-path' },
            ].map((cd) => (
              <button
                key={cd.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setDmzConduit(cd.id as any);
                  const target = nodes.find((n) => n.id === cd.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  dmzConduit === cd.id
                    ? 'bg-sky-500/25 border border-sky-400 text-sky-300 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cd.label}
              </button>
            ))}
          </div>

          {/* Visual DMZ Boundary Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            {/* Enterprise IT */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-sky-400 flex items-center gap-1.5">
                <Laptop className="w-4 h-4 text-sky-400" /> ENTERPRISE (L4)
              </span>
              <p className="text-xs text-slate-300">Corporate reporting dashboards query the IDMZ Historian mirror.</p>
              <div className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-1.5 rounded">
                Read-Only Query: SELECT daily_yield
              </div>
            </div>

            {/* Industrial DMZ */}
            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-2">
              <span className="text-xs font-mono font-bold text-purple-300 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-purple-400" /> INDUSTRIAL DMZ (L3.5)
              </span>
              <p className="text-xs text-slate-300">Replicated Data Historian buffer. Terminates all incoming sessions.</p>
              <div className="text-[11px] font-mono text-purple-200 bg-purple-950 p-1.5 rounded">
                Direction: Outward Mirroring Only
              </div>
            </div>

            {/* Plant OT */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <Factory className="w-4 h-4 text-amber-400" /> PLANT OT (L2/1)
              </span>
              <p className="text-xs text-slate-300">Plant historian pushes production tags outward across OT firewall.</p>
              <div className="text-[11px] font-mono text-amber-300 bg-slate-950 p-1.5 rounded">
                Inbound Command Routing: REJECTED
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
                        {node.id === 'seg-corporate-access' ? (
                          <Laptop className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'seg-industrial-dmz-firewall' ? (
                          <Shield className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'seg-mirrored-historian' ? (
                          <Database className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-400" />
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
  // 12. STYLE: m10-passive-monitoring-doctrine (Passive Network Taps vs Nmap)
  // ---------------------------------------------------------------------------
  if (style === 'm10-passive-monitoring-doctrine') {
    const nodes = passiveMonitoringDoctrineNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-sky-400" />
                <span>Passive Monitoring Doctrine: Hardware Optical TAPs vs Active Port-Scan Hazard</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Never port-scan an industrial network. Fragile legacy PLC IP stacks crash under aggressive Nmap scans. Use hardware TAPs and SPAN mirrors.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              SAFE PASSIVE MONITORING
            </Badge>
          </div>

          {/* Monitoring Method Switcher */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">COLLECTION METHOD:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setMonitorMethod('passive_tap');
                onSelectNode(nodes[1]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                monitorMethod === 'passive_tap'
                  ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Hardware Passive TAP (Approved Method ✓)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setMonitorMethod('active_nmap');
                onSelectNode(nodes[0]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                monitorMethod === 'active_nmap'
                  ? 'bg-red-500/25 border border-red-400 text-red-300 shadow-md shadow-red-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Active Nmap Scan (Hazardous Trap ⚠️)
            </button>
          </div>

          {/* Comparison Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            {/* Passive TAP */}
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> APPROVED: HARDWARE OPTICAL TAP
              </span>
              <p className="text-xs text-slate-300">
                Physical beam splitter mirrors light packets to network sensor. Zero electrical packets injected onto the plant bus.
              </p>
              <div className="text-[11px] font-mono text-emerald-300 bg-emerald-950/50 p-2 rounded border border-emerald-500/20">
                Interference: 0% • Controller CPU Load: 0% • Visibility: 100% Full PCAP
              </div>
            </div>

            {/* Active Scan */}
            <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30 space-y-2">
              <span className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-red-400" /> HAZARD: AGGRESSIVE PORT SCANNING
              </span>
              <p className="text-xs text-slate-300">
                Inexperienced analyst runs nmap -sS -A against 192.168.10.0/24. Fragile PLC Ethernet modules crash.
              </p>
              <div className="text-[11px] font-mono text-red-300 bg-red-950/50 p-2 rounded border border-red-500/20">
                Controller Status: HARD LOCKUP • Field Pump: OFF • Process: CRIPPLED
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
                        {node.id === 'scan-active-nmap-trap' ? (
                          <AlertTriangle className="w-6 h-6 text-red-400" />
                        ) : node.id === 'scan-passive-span-tap' ? (
                          <Radio className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'scan-ot-team-consult' ? (
                          <UserCheck className="w-6 h-6 text-sky-400" />
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
  // 13. STYLE: m10-three-response-actions (The High-Level Response Action Triad)
  // ---------------------------------------------------------------------------
  if (style === 'm10-three-response-actions') {
    const nodes = threeResponseActionsNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-sky-400" />
                <span>The High-Level Response Action Triad: Target, Benefit, Side Effect, Authorizer</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Three foundational response levers: Block Destination IP, Disable User Account, Isolate Host Device. Each carries operational side effects.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              RESPONSE TRIAD
            </Badge>
          </div>

          {/* Action Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">RESPONSE LEVER:</span>
            {[
              { id: 'block_ip', label: '1. Block Destination (Firewall)', node: 'act-block-destination' },
              { id: 'disable_account', label: '2. Disable Account (Identity)', node: 'act-disable-account' },
              { id: 'isolate_host', label: '3. Isolate Host (EDR)', node: 'act-isolate-device' },
            ].map((ac) => (
              <button
                key={ac.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveAction(ac.id as any);
                  const target = nodes.find((n) => n.id === ac.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeAction === ac.id
                    ? 'bg-sky-500/25 border border-sky-400 text-sky-300 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {ac.label}
              </button>
            ))}
          </div>

          {/* 4-Facet Action Matrix Display */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-mono font-bold text-sky-400">TARGET ASSET</span>
              <p className="text-xs text-white font-semibold mt-1">
                {activeAction === 'block_ip' ? '198.51.100.24 (IP/Domain)' : activeAction === 'disable_account' ? 'ramesh@cdac.in (Identity)' : 'BLR-BR-WS-04 (Endpoint)'}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-mono font-bold text-emerald-400">INTENDED BENEFIT</span>
              <p className="text-xs text-white font-semibold mt-1">
                {activeAction === 'block_ip' ? 'Severs outbound C2 channel' : activeAction === 'disable_account' ? 'Revokes compromised tokens' : 'Halts lateral movement on LAN'}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-mono font-bold text-amber-400">POTENTIAL SIDE EFFECT</span>
              <p className="text-xs text-white font-semibold mt-1">
                {activeAction === 'block_ip' ? 'Shared CDN outage for peers' : activeAction === 'disable_account' ? 'User cannot access corporate ERP' : 'Employee network disconnected'}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-mono font-bold text-purple-400">AUTHORIZING ROLE</span>
              <p className="text-xs text-white font-semibold mt-1">
                {activeAction === 'block_ip' ? 'Network Security Lead' : activeAction === 'disable_account' ? 'IAM Shift Lead / HR Policy' : 'Shift Lead Ananya / IC Karthik'}
              </p>
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
                        {node.id === 'act-block-destination' ? (
                          <Network className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'act-disable-account' ? (
                          <UserCheck className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'act-isolate-device' ? (
                          <Lock className="w-6 h-6 text-red-400" />
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
  // 14. STYLE: m10-side-effects-business-impact (Side Effects & Collateral)
  // ---------------------------------------------------------------------------
  if (style === 'm10-side-effects-business-impact') {
    const nodes = sideEffectsBusinessImpactNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-amber-400" />
                <span>Collateral Outage Risk: Shared IPs, Service Accounts & Industrial Controllers</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Containment actions must not do the adversary's job by taking down corporate payroll, SAP batch jobs, or factory assembly lines.
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs font-mono">
              COLLATERAL OUTAGE AUDIT
            </Badge>
          </div>

          {/* Scenario Tabs */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">RISK SCENARIO:</span>
            {[
              { id: 'shared_ip', label: '1. Shared CDN IP Block', node: 'side-shared-ip-risk' },
              { id: 'service_acct', label: '2. Service Account Lockout', node: 'side-service-account-risk' },
              { id: 'controller', label: '3. Plant Controller Playbook', node: 'side-plant-controller-risk' },
            ].map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSideEffectScenario(sc.id as any);
                  const target = nodes.find((n) => n.id === sc.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  sideEffectScenario === sc.id
                    ? 'bg-amber-500/25 border border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {sc.label}
              </button>
            ))}
          </div>

          {/* Impact Scenario Simulator */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
            {sideEffectScenario === 'shared_ip' && (
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-amber-400">SHARED CDN HOSTING HAZARD</span>
                <p className="text-xs text-slate-300">
                  Adversary hosted C2 on a Cloudflare or AWS shared IP. Blocking the raw IP severs access to 400 legitimate corporate supplier portals!
                </p>
                <div className="text-[11px] font-mono text-amber-300 bg-amber-950/40 p-2 rounded border border-amber-500/20">
                  Recommendation: Block at DNS domain level (e.g. evil-payload.xyz) rather than raw IP.
                </div>
              </div>
            )}

            {sideEffectScenario === 'service_acct' && (
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-red-400">AUTOMATED SERVICE ACCOUNT CRASH</span>
                <p className="text-xs text-slate-300">
                  Analyst resets password on account flagged for off-hours logins, discovering too late it is the core SAP database sync account.
                </p>
                <div className="text-[11px] font-mono text-red-300 bg-red-950/40 p-2 rounded border border-red-500/20">
                  Result: All branch accounting batch jobs fail immediately. Customer transactions halt.
                </div>
              </div>
            )}

            {sideEffectScenario === 'controller' && (
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-purple-400">INAPPROPRIATE PLAYBOOK ON INDUSTRIAL ASSET</span>
                <p className="text-xs text-slate-300">
                  Workstation isolation playbook applied to an industrial cooling controller. Safety valves lose network heartbeat and trip the whole plant.
                </p>
                <div className="text-[11px] font-mono text-purple-300 bg-purple-950/40 p-2 rounded border border-purple-500/20">
                  Principle: Context matters. OT assets require dedicated engineering protocols.
                </div>
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
                        {node.id === 'side-shared-ip-risk' ? (
                          <Globe className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'side-service-account-risk' ? (
                          <UserCheck className="w-6 h-6 text-red-400" />
                        ) : node.id === 'side-plant-controller-risk' ? (
                          <Factory className="w-6 h-6 text-purple-400" />
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
  // 15. STYLE: m10-reversibility-vs-judgment (Reversibility Fallacy & Approval)
  // ---------------------------------------------------------------------------
  if (style === 'm10-reversibility-vs-judgment') {
    const nodes = reversibilityVsJudgmentNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-400" />
                <span>The Reversibility Fallacy: Interruption Causes Harm Before It Can Be Undone</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                "We can easily un-isolate it later" is a dangerous myth. 10 minutes of downtime during payroll cut-off or factory chemical runs is irreversible.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              OPERATIONAL JUDGMENT
            </Badge>
          </div>

          {/* Perspective Toggle */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">VIEWPOINT:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setRevPerspective('reality');
                onSelectNode(nodes[1]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                revPerspective === 'reality'
                  ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Operational Reality (Accumulated Harm)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setRevPerspective('fallacy');
                onSelectNode(nodes[0]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                revPerspective === 'fallacy'
                  ? 'bg-amber-500/25 border border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Reversibility Myth ("Harmless Undo")
            </button>
          </div>

          {/* 3-Tier Governance Ladder */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <span className="text-xs font-mono font-bold text-sky-400 mb-2 block">
              TIERED APPROVAL GATES (RISK-PROPORTIONATE ESCALATION)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 font-mono text-xs">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-sky-300 font-bold">1. L1 Analyst</span>
                <p className="text-slate-400 text-[11px] mt-1">Prepares verified observables, assesses blast radius, checks critical asset blocklist.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-purple-500/30">
                <span className="text-purple-300 font-bold">2. Shift Lead Ananya</span>
                <p className="text-slate-400 text-[11px] mt-1">Authorizes single workstation containment (WS-04). Verifies asset context.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-emerald-500/30">
                <span className="text-emerald-300 font-bold">3. Incident Commander Karthik</span>
                <p className="text-slate-400 text-[11px] mt-1">Authorizes domain-wide or industrial plant containment actions.</p>
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
                        {node.id === 'rev-fallacy-myth' ? (
                          <AlertTriangle className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'rev-unrecoverable-damage' ? (
                          <Flame className="w-6 h-6 text-red-400" />
                        ) : node.id === 'rev-approval-gate' ? (
                          <ShieldCheck className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <CheckCircle2 className="w-6 h-6 text-sky-400" />
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
  // 16. STYLE: m10-read-only-boundary (Read-Only Restraint Barrier)
  // ---------------------------------------------------------------------------
  if (style === 'm10-read-only-boundary') {
    const nodes = readOnlyBoundaryNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-400" />
                <span>The Read-Only Restraint Barrier: Console Safety Governor for Unfamiliar Assets</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                When an alert flags an unfamiliar industrial asset (BLR-PLANT-PLC-02), disruptive levers automatically lock into Read-Only mode.
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs font-mono">
              SAFETY GOVERNOR 🔒
            </Badge>
          </div>

          {/* Console State Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">CONSOLE GOVERNOR:</span>
            {[
              { id: 'locked', label: '1. Safety Lockout Engaged 🔒', node: 'barrier-controls-locked' },
              { id: 'unfamiliar', label: '2. Unfamiliar Asset Alert', node: 'barrier-unfamiliar-asset' },
              { id: 'passive', label: '3. Passive Evidence Only', node: 'barrier-evidence-preservation' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setReadOnlyState(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  readOnlyState === st.id
                    ? 'bg-amber-500/25 border border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Locked Console Cockpit Panel */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold text-slate-300">TARGET: BLR-PLANT-PLC-02 (192.168.10.15)</span>
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-[11px] font-mono">
                DISRUPTIVE LEVERS LOCKED 🔒
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 opacity-60 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">ISOLATE HOST</span>
                <Lock className="w-4 h-4 text-red-400" />
              </div>
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 opacity-60 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">REBOOT CONTROLLER</span>
                <Lock className="w-4 h-4 text-red-400" />
              </div>
              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-300 font-bold">PASSIVE PCAP CAPTURE</span>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <p className="text-xs text-slate-300 pt-1">
              Safety governor engaged: Disruptive levers disabled. The analyst preserves passive wire evidence and prepares an escalation dossier.
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
                        {node.id === 'barrier-unfamiliar-asset' ? (
                          <AlertOctagon className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'barrier-controls-locked' ? (
                          <Lock className="w-6 h-6 text-red-400" />
                        ) : node.id === 'barrier-evidence-preservation' ? (
                          <FileText className="w-6 h-6 text-emerald-400" />
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
  // 17. STYLE: m10-anti-manufactured-link (Manufactured Link Fallacy)
  // ---------------------------------------------------------------------------
  if (style === 'm10-anti-manufactured-link') {
    const nodes = antiManufacturedLinkNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-sky-400" />
                <span>The Manufactured Link Fallacy: Separate Practice Scenarios vs The Active Case</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Do not force unrelated alerts into a false conspiracy just because they occur during the same shift. Maintain independent evidence dossiers.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              FORENSIC DEMARCATION
            </Badge>
          </div>

          {/* Dossier Segregation Toggle */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">INVESTIGATION SCOPE:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setLinkView('split');
                onSelectNode(nodes[3]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                linkView === 'split'
                  ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Disciplined Independent Dossiers (Approved ✓)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setLinkView('manufactured');
                onSelectNode(nodes[2]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                linkView === 'manufactured'
                  ? 'bg-amber-500/25 border border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Manufactured Link Trap (False Conspiracy ⚠️)
            </button>
          </div>

          {/* Dual Dossier Split View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            {/* Dossier 1: Case #2026-881 */}
            <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/30 space-y-2">
              <span className="text-xs font-mono font-bold text-sky-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-sky-400" /> PRIMARY CASE #2026-881
              </span>
              <div className="text-xs text-slate-300 space-y-1 font-mono">
                <div>Scope: Bangalore Branch Finance Workstation</div>
                <div>Target: BLR-BR-WS-04 (User Ramesh)</div>
                <div>Malicious Artifact: Invoice_Macro.xlsm &rarr; C2 to 198.51.100.24</div>
                <div className="text-emerald-400">Disposition: Contained & Handled</div>
              </div>
            </div>

            {/* Dossier 2: Separate Practice Scenario */}
            <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-2">
              <span className="text-xs font-mono font-bold text-purple-300 flex items-center gap-1.5">
                <Factory className="w-4 h-4 text-purple-400" /> SEPARATE PRACTICE SIMULATION
              </span>
              <div className="text-xs text-slate-300 space-y-1 font-mono">
                <div>Scope: Industrial Plant Water Cooling System</div>
                <div>Target: BLR-PLANT-PLC-02 (Training Simulator)</div>
                <div>Telemetry: Modbus Function 16 Setpoint Anomaly</div>
                <div className="text-purple-300">Routing: Independent Plant Escalation</div>
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
                        {node.id === 'link-finance-case' ? (
                          <Laptop className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'link-ot-practice-case' ? (
                          <Factory className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'link-manufactured-error' ? (
                          <AlertTriangle className="w-6 h-6 text-amber-400" />
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
  // 18. STYLE: m10-ot-specialist-escalation (OT Escalation Dossier & Sign-Off)
  // ---------------------------------------------------------------------------
  if (style === 'm10-ot-specialist-escalation') {
    const nodes = otSpecialistEscalationNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Specialized OT Escalation Dossier & Module 10 Master Supervisory Seal</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Documenting asset identifiers, explicit uncertainty, and routing to plant operator Sunil and IC Karthik without unauthorized containment.
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs font-mono">
              SUPERVISORY DOSSIER
            </Badge>
          </div>

          {/* Formal Escalation Dossier Card */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold text-white">
                SPECIALIST HANDOFF DOSSIER: INCIDENT-OT-2026-09
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
                <span className="text-sky-400 font-bold">1. Concrete Asset Identifiers:</span>
                <div className="text-slate-300 text-[11px]">Asset Hostname: BLR-PLANT-PLC-02</div>
                <div className="text-slate-300 text-[11px]">IPv4: 192.168.10.15 • Modbus Unit ID: 1</div>
                <div className="text-slate-300 text-[11px]">Observation Timestamp: 14:35:10 UTC</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold">2. Statement of Restraint:</span>
                <div className="text-slate-300 text-[11px]">Asset role in physical process unconfirmed.</div>
                <div className="text-slate-300 text-[11px]">Disruptive commands (reboot/isolate): ZERO.</div>
                <div className="text-slate-300 text-[11px]">Passive PCAP wire capture attached.</div>
              </div>
            </div>

            {isDossierSigned && (
              <div className="p-2.5 rounded-lg bg-gradient-to-r from-emerald-950/60 via-slate-900 to-amber-950/60 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-bold text-white">
                    Supervisory Sign-Off: Senior Security Architect &amp; IC Karthik certifies Module 10 Completion.
                  </span>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs font-mono">
                  READY FOR MODULE 11
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
                        {node.id === 'esc-dossier-identifiers' ? (
                          <Hash className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'esc-dossier-uncertainty' ? (
                          <FileText className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'esc-specialist-routing' ? (
                          <Share2 className="w-6 h-6 text-purple-400" />
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

  return null;
}
