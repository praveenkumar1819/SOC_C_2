'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { sound } from '@/lib/sound-effects';
import {
  campusReceptionNodes,
  cardinalRuleNodes,
  operationalBaselineNodes,
  teachingZonesMapNodes,
  socDemarcationNodes,
  crossTeamRoutingNodes,
  blueBorderConsoleNodes,
  hostOnlyVmIsolationNodes,
  snapshotRollbackNodes,
  evidenceIntegrityHashNodes,
  workingCopyAuditNodes,
  safePauseProtocolNodes,
  branchFinanceServiceNodes,
  entitySeparationGridNodes,
  disciplinedObservablesNodes,
  curriculumRoadmapNodes,
  fourSectionEngineNodes,
  fadingScaffoldingL1Nodes,
  VisualNodeItem,
} from './module-00-visual-stories';
import {
  Users,
  Shield,
  Activity,
  Layers,
  ArrowRight,
  Lock,
  AlertTriangle,
  Monitor,
  Server,
  Zap,
  Globe,
  Radio,
  Clock,
  Key,
  Sliders,
  Check,
  CheckCircle2,
  AlertOctagon,
  FileText,
  CornerDownRight,
  Database,
  Terminal,
  Cpu,
  HardDrive,
  Eye,
  Pause,
  UserCheck,
  Compass,
  FileSpreadsheet,
  Boxes,
  HelpCircle,
  Share2,
  RefreshCw,
  Play,
  RotateCcw,
} from 'lucide-react';

interface Module00GraphicRendererProps {
  style: string;
  selectedNodeId: string;
  onSelectNode: (node: VisualNodeItem) => void;
  animStep: number;
}

export function Module00GraphicRenderer({
  style,
  selectedNodeId,
  onSelectNode,
  animStep,
}: Module00GraphicRendererProps) {
  // Interactive test states for Module 00 scenarios
  const [activeSimulationMode, setActiveSimulationMode] = useState<'safe' | 'unsafe'>('safe');
  const [networkAdapterMode, setNetworkAdapterMode] = useState<'host-only' | 'bridged'>('host-only');
  const [fileIntegrityTested, setFileIntegrityTested] = useState<boolean>(true);
  const [entitySelected, setEntitySelected] = useState<'account' | 'host' | 'ip' | 'human'>('account');
  const [activeRoadmapStage, setActiveRoadmapStage] = useState<number>(0);

  // Helper to render the active inspection card at the bottom of each diagram
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
  // 1. Campus Arrival & Reception (M00-U1-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm00-campus-reception') {
    const nodes = campusReceptionNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-sky-400" />
                <span>CDAC Bengaluru: Campus Arrival & Orientation Reception</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Morning light across the learning campus: arriving as a curious learner with no IT prerequisite.
              </p>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-mono text-xs">
              ORIENTATION DAY 1
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
                      {node.id === 'rec-campus' && <Globe className="w-6 h-6" />}
                      {node.id === 'rec-visitor' && <Users className="w-6 h-6" />}
                      {node.id === 'rec-mentor' && <UserCheck className="w-6 h-6" />}
                      {node.id === 'rec-badge' && <Shield className="w-6 h-6" />}
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

          {/* Flow Visualizer Banner */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Campus Reception Protocol:</span>
            </span>
            <div className="flex items-center gap-2 text-slate-400 flex-wrap">
              <span className="text-white font-bold">1. Reception Arrival</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-white font-bold">2. Badge Issuance</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-white font-bold">3. Meet Mentor Ananya</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-emerald-300 font-bold">4. Safe Observation</span>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 2. The Cardinal Rule (M00-U1-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm00-cardinal-rule') {
    const nodes = cardinalRuleNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[2];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span>The Cardinal Rule of SOC Triage: Ask Before Changing Anything</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Curiosity is welcome; unsupported action is not. Never guess when encountering unfamiliar screens.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveSimulationMode(activeSimulationMode === 'safe' ? 'unsafe' : 'safe');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all border ${
                  activeSimulationMode === 'safe'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-sm'
                    : 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-sm animate-pulse'
                }`}
              >
                {activeSimulationMode === 'safe' ? '✓ SAFE PAUSE PROTOCOL ACTIVE' : '▲ HASTY GUESS SIMULATION'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              const isDanger = node.id === 'rule-hasty';
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? isDanger
                        ? 'bg-rose-500/25 border-rose-400 ring-2 ring-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                        : 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isDanger
                          ? 'bg-rose-950/80 text-rose-400 border border-rose-500/40'
                          : isSelected
                          ? 'bg-sky-400 text-slate-950 font-bold'
                          : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'rule-unfamiliar' && <Monitor className="w-6 h-6" />}
                      {node.id === 'rule-hasty' && <AlertOctagon className="w-6 h-6" />}
                      {node.id === 'rule-pause' && <Pause className="w-6 h-6" />}
                      {node.id === 'rule-ask' && <HelpCircle className="w-6 h-6" />}
                    </div>
                    {node.badge && (
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-mono ${
                          isDanger ? 'border-rose-500/40 text-rose-300' : 'border-sky-500/30 text-sky-300'
                        }`}
                      >
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

          {/* Interactive Scenario Outcome Banner */}
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-mono ${
              activeSimulationMode === 'safe'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
            }`}
          >
            <span className="flex items-center gap-2">
              {activeSimulationMode === 'safe' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertOctagon className="w-4 h-4 text-rose-400 animate-spin" />
              )}
              <strong>OPERATIONAL OUTCOME:</strong>
            </span>
            <span>
              {activeSimulationMode === 'safe'
                ? 'Safe Pause executed: screen observables recorded; Mentor Ananya confirms verified triage path without data loss.'
                : 'CRITICAL FAILURE: Hasty button press cleared memory buffers before evidence was recorded; investigation blind!'
              }
            </span>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 3. Operational Baseline (M00-U1-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm00-operational-baseline') {
    const nodes = operationalBaselineNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-sky-400" />
                <span>Operational Baseline & Disciplined Observation</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                You cannot spot an anomaly without knowing what normal looks like: NIST SP 800-137 baseline posture.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 font-mono text-xs">
              NIST SP 800-137
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
                      {node.id === 'base-ordinary' && <Cpu className="w-6 h-6" />}
                      {node.id === 'base-observe' && <Eye className="w-6 h-6" />}
                      {node.id === 'base-verify' && <FileText className="w-6 h-6" />}
                      {node.id === 'base-anomaly' && <Zap className="w-6 h-6" />}
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

          {/* Operational Baseline Timeline Diagram */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5 text-sky-400 font-bold">
                <Sliders className="w-4 h-4 text-sky-400" />
                TELEMETRY EVALUATION CONDUIT
              </span>
              <span className="text-slate-400">Normal Range: 09:00 - 18:00 IST</span>
            </div>
            <div className="h-3 rounded-full bg-slate-950 overflow-hidden border border-slate-800 p-0.5 relative">
              <div className="h-full bg-gradient-to-r from-emerald-500 via-sky-400 to-amber-500 rounded-full w-[70%]" />
              <div className="absolute right-4 top-0.5 bottom-0.5 w-2 bg-rose-500 rounded-full animate-ping" />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>08:00 AM • Morning Boot</span>
              <span>11:30 AM • Office Activity</span>
              <span>17:00 PM • Normal Shift</span>
              <span className="text-rose-400 font-bold">03:00 AM • Anomaly Trigger ▲</span>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 4. The 6 Teaching Zones Map (M00-U1-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm00-teaching-zones-map') {
    const nodes = teachingZonesMapNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[4];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Boxes className="w-5 h-5 text-sky-400" />
                <span>The 6 Teaching Zones of CDAC Bengaluru Campus</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Division of responsibility: The SOC monitors security signals and coordinates across specialized domain zones.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 font-mono text-xs">
              ZONE DEMARCATION
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              const isSoc = node.id === 'zone-soc';
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : isSoc
                      ? 'bg-slate-900/90 border-sky-500/40 hover:border-sky-400'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      isSoc
                        ? 'bg-sky-500 text-slate-950 font-bold'
                        : isSelected
                        ? 'bg-sky-400 text-slate-950'
                        : 'bg-slate-800 text-sky-400'
                    }`}
                  >
                    {node.id === 'zone-support' && <Monitor className="w-6 h-6" />}
                    {node.id === 'zone-computing' && <Cpu className="w-6 h-6" />}
                    {node.id === 'zone-network' && <Radio className="w-6 h-6" />}
                    {node.id === 'zone-identity' && <Key className="w-6 h-6" />}
                    {node.id === 'zone-soc' && <Shield className="w-6 h-6" />}
                    {node.id === 'zone-response' && <Activity className="w-6 h-6" />}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-sm font-bold text-white truncate">{node.label}</h5>
                    <p className="text-xs text-sky-300 font-mono truncate">{node.sub}</p>
                    <span className="text-[10px] text-slate-400 font-mono">{node.badge}</span>
                  </div>
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
  // 5. SOC Demarcation (M00-U1-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm00-soc-demarcation') {
    const nodes = socDemarcationNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-sky-400" />
                <span>SOC Role Demarcation: What We Do vs What We Do Not Do</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                NIST SP 800-53 AC-5 separation of duties: SOC monitors security and coordinates without replacing IT helpdesk.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 font-mono text-xs">
              NIST SP 800-53 AC-5
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              const isBoundary = node.id.includes('not');
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? isBoundary
                        ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-500/40 shadow-[0_0_20px_rgba(251,191,36,0.25)]'
                        : 'bg-emerald-500/20 border-emerald-400 ring-2 ring-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isBoundary
                          ? 'bg-amber-950/80 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {node.id === 'demarc-soc-does' && <Shield className="w-6 h-6" />}
                      {node.id === 'demarc-coord' && <Share2 className="w-6 h-6" />}
                      {node.id === 'demarc-not-helpdesk' && <Monitor className="w-6 h-6" />}
                      {node.id === 'demarc-not-admin' && <Database className="w-6 h-6" />}
                    </div>
                    {node.badge && (
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-mono ${
                          isBoundary ? 'border-amber-500/30 text-amber-300' : 'border-emerald-500/30 text-emerald-300'
                        }`}
                      >
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

          {/* Golden Quote Banner */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-sky-500/30 text-xs sm:text-sm text-slate-100 flex items-center gap-3">
            <span className="text-xl">💡</span>
            <p className="italic">
              &ldquo;The SOC does not repair every computer or run every department. It monitors security and coordinates with people who own devices, accounts, networks, and business services.&rdquo; — <strong className="text-sky-300">Mentor Ananya</strong>
            </p>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 6. Cross-Team Ticket Routing (M00-U1-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm00-cross-team-routing') {
    const nodes = crossTeamRoutingNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[3];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <CornerDownRight className="w-5 h-5 text-sky-400" />
                <span>Request & Incident Sorter: Cross-Team Ticket Routing</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Correct ticket dispatching: Routing broken keyboards, password resets, switch flaps, and security alerts.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 font-mono text-xs">
              INCIDENT ROUTER
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              const isSoc = node.id === 'route-alert-3am';
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? isSoc
                        ? 'bg-rose-500/20 border-rose-400 ring-2 ring-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                        : 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSoc
                          ? 'bg-rose-950/80 text-rose-400 border border-rose-500/30'
                          : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'route-tea-keyboard' && <Monitor className="w-6 h-6" />}
                      {node.id === 'route-pwd-reset' && <Key className="w-6 h-6" />}
                      {node.id === 'route-port-flap' && <Radio className="w-6 h-6" />}
                      {node.id === 'route-alert-3am' && <Shield className="w-6 h-6" />}
                    </div>
                    {node.badge && (
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-mono ${
                          isSoc ? 'border-rose-500/30 text-rose-300' : 'border-sky-500/30 text-sky-300'
                        }`}
                      >
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

          {/* Ticket Dispatch Route Pipeline */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between flex-wrap gap-2">
            <span className="text-sky-400 font-bold flex items-center gap-1.5">
              <CornerDownRight className="w-4 h-4" />
              DESTINATION TEAM:
            </span>
            <span className="text-white font-bold">{activeNode.badge}</span>
            <span className="text-slate-400">Resolution SLA: Priority Triage Queue</span>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 7. Blue-Bordered Console (M00-U2-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm00-blue-border-console') {
    const nodes = blueBorderConsoleNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border-4 border-sky-500 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-[0_0_30px_rgba(56,189,248,0.3)]">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sky-500/30 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Monitor className="w-5 h-5 text-sky-400" />
                <span>The Blue-Bordered Practice Console & Production Boundaries</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                The visual blue frame guarantees an authorized training environment. Lab permissions never touch production.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/50 font-mono text-xs">
              BLUE BORDER VERIFIED ✓
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              const isProduction = node.id === 'border-red-door';
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? isProduction
                        ? 'bg-rose-500/25 border-rose-400 ring-2 ring-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                        : 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isProduction
                          ? 'bg-rose-950/80 text-rose-400 border border-rose-500/40'
                          : isSelected
                          ? 'bg-sky-400 text-slate-950 font-bold'
                          : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'border-blue' && <Monitor className="w-6 h-6" />}
                      {node.id === 'border-desktop' && <Terminal className="w-6 h-6" />}
                      {node.id === 'border-red-door' && <Lock className="w-6 h-6" />}
                      {node.id === 'border-safety-check' && <Shield className="w-6 h-6" />}
                    </div>
                    {node.badge && (
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-mono ${
                          isProduction ? 'border-rose-500/40 text-rose-300' : 'border-sky-500/30 text-sky-300'
                        }`}
                      >
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

          {/* Interactive Console Visual */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-sky-500/40 font-mono text-xs text-sky-300 flex items-center justify-between flex-wrap gap-2">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
              <span>TERMINAL STATUS: [CONNECTED: CDAC_SIM_HOST_01 • ISOLATION ACTIVE]</span>
            </span>
            <span className="text-slate-400">Outbound Gateway: 0.0.0.0 (BLOCKED)</span>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 8. Host-Only VM Isolation (M00-U2-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm00-host-only-vm-isolation') {
    const nodes = hostOnlyVmIsolationNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[2];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-sky-400" />
                <span>Virtual Machine Isolation: Host-Only vs Bridged Networking</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                A virtual machine is not automatically safe on its own. Host-only networking stops packets from escaping.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setNetworkAdapterMode(networkAdapterMode === 'host-only' ? 'bridged' : 'host-only');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all border ${
                  networkAdapterMode === 'host-only'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-sm'
                    : 'bg-rose-500/25 border-rose-400 text-rose-300 shadow-sm animate-pulse'
                }`}
              >
                {networkAdapterMode === 'host-only' ? '✓ HOST-ONLY ISOLATION (SAFE)' : '▲ BRIDGED MODE (LEAK RISK)'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              const isDanger = node.id === 'vm-bridged-danger';
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? isDanger
                        ? 'bg-rose-500/25 border-rose-400 ring-2 ring-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                        : 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isDanger
                          ? 'bg-rose-950/80 text-rose-400 border border-rose-500/40'
                          : isSelected
                          ? 'bg-sky-400 text-slate-950 font-bold'
                          : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'vm-hypervisor' && <Server className="w-6 h-6" />}
                      {node.id === 'vm-sandbox' && <Monitor className="w-6 h-6" />}
                      {node.id === 'vm-host-only' && <Lock className="w-6 h-6" />}
                      {node.id === 'vm-bridged-danger' && <AlertTriangle className="w-6 h-6" />}
                    </div>
                    {node.badge && (
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-mono ${
                          isDanger ? 'border-rose-500/40 text-rose-300' : 'border-sky-500/30 text-sky-300'
                        }`}
                      >
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

          {/* Network Packet Route Visualizer */}
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-mono ${
              networkAdapterMode === 'host-only'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
            }`}
          >
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <strong>PACKET TRAFFIC ROUTE:</strong>
            </span>
            <span>
              {networkAdapterMode === 'host-only'
                ? 'VM Guest ➔ Virtual Switch [ISOLATED] ➔ Physical NIC [TRAFFIC STOPPED] ✓'
                : 'VM Guest ➔ Bridged NIC ➔ Campus Wi-Fi ➔ Unintended External Hosts [LEAK EVENT] ▲'
              }
            </span>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 9. Snapshot Rollback (M00-U2-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm00-snapshot-rollback') {
    const nodes = snapshotRollbackNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[2];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-sky-400" />
                <span>Snapshot Rollback & Zero-Risk Practice Recovery</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Practice realistic triage commands without fear. Instant rollback restores the clean baseline in seconds.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 font-mono text-xs">
              SNAPSHOT ENGINE
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
                      {node.id === 'snap-clean' && <CheckCircle2 className="w-6 h-6" />}
                      {node.id === 'snap-practice' && <Terminal className="w-6 h-6" />}
                      {node.id === 'snap-revert' && <RotateCcw className="w-6 h-6" />}
                      {node.id === 'snap-scope' && <Shield className="w-6 h-6" />}
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

          {/* Rollback Action Bar */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300 flex-wrap gap-2">
            <span className="flex items-center gap-1.5 text-sky-400">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>SNAPSHOT CONTROLLER:</span>
            </span>
            <span>Current Disk State: Active Diff Overlay</span>
            <span className="text-emerald-300 font-bold">Rollback Latency: &lt; 2.5s</span>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 10. Evidence Integrity & Hashing (M00-U2-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm00-evidence-integrity-hash') {
    const nodes = evidenceIntegrityHashNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[2];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-sky-400" />
                <span>Evidence Integrity: Untouchable Originals & SHA-256 Hashing</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Never edit original evidence. Lock auth_raw.log to read-only and compute cryptographic checksum seals.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 font-mono text-xs">
              NIST SP 800-86
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
                      {node.id === 'evid-raw-log' && <FileText className="w-6 h-6" />}
                      {node.id === 'evid-read-only' && <Lock className="w-6 h-6" />}
                      {node.id === 'evid-hash' && <Key className="w-6 h-6" />}
                      {node.id === 'evid-chain' && <Shield className="w-6 h-6" />}
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

          {/* Cryptographic Hash Verification Box */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-sky-400 font-bold">SHA-256 INTEGRITY FINGERPRINT:</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED MATCH
              </span>
            </div>
            <p className="text-white break-all text-[11px] bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
            </p>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 11. Working Copies & Audit Notes (M00-U2-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm00-working-copy-audit') {
    const nodes = workingCopyAuditNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[1];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-400" />
                <span>Working Duplicate Strategy & Triage Notes</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Work exclusively on copies: duplicate master logs to auth_working_copy.log for searching and parsing.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 font-mono text-xs">
              ISO/IEC 27037
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
                      {node.id === 'copy-master' && <Lock className="w-6 h-6" />}
                      {node.id === 'copy-duplicate' && <FileText className="w-6 h-6" />}
                      {node.id === 'copy-metadata' && <Clock className="w-6 h-6" />}
                      {node.id === 'copy-logbook' && <Terminal className="w-6 h-6" />}
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

          {/* Two-Column Comparison Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700 space-y-1">
              <span className="text-amber-400 font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> MASTER: auth_raw.log (READ-ONLY)
              </span>
              <p className="text-slate-300 text-[11px]">
                Preserved in deep storage. No text editor writes, no highlights, no line deletions.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/40 space-y-1">
              <span className="text-sky-300 font-bold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" /> DUPLICATE: auth_working_copy.log
              </span>
              <p className="text-slate-300 text-[11px]">
                Active triage space: run grep filters, highlight suspicious IP addresses, and parse observables freely.
              </p>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 12. The Safe Pause Protocol (M00-U2-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm00-safe-pause-protocol') {
    const nodes = safePauseProtocolNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[1];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Pause className="w-5 h-5 text-amber-400" />
                <span>The Safe Pause Protocol: Stop, Document, and Consult</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                A safe pause is always better than an irreversible guess. CDAC SOP doctrine for risk avoidance.
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 font-mono text-xs">
              CDAC-SOP-EVID-02
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
                      ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-500/40 shadow-[0_0_20px_rgba(251,191,36,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-amber-400'
                      }`}
                    >
                      {node.id === 'pause-trigger' && <AlertTriangle className="w-6 h-6" />}
                      {node.id === 'pause-halt' && <Pause className="w-6 h-6" />}
                      {node.id === 'pause-record' && <FileText className="w-6 h-6" />}
                      {node.id === 'pause-consult' && <UserCheck className="w-6 h-6" />}
                    </div>
                    {node.badge && (
                      <Badge variant="outline" className="text-[10px] font-mono border-amber-500/30 text-amber-300">
                        {node.badge}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-white">{node.label}</h5>
                    <p className="text-xs text-amber-300 font-mono">{node.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sequential 4-Step Action Flow */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300 flex-wrap gap-2">
            <span className="text-amber-400 font-bold">1. Spot Risk Prompt</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-white font-bold">2. Hands Off Keyboard</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-white font-bold">3. Note Error Observables</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-emerald-300 font-bold">4. Consult Ananya</span>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 13. Branch Finance Support Service (M00-U3-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm00-branch-finance-service') {
    const nodes = branchFinanceServiceNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-sky-400" />
                <span>The Recurring Scenario: Branch Finance Support Service</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                A single coherent business environment across all 15 modules: portals, invoices, documents, and telemetry.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 font-mono text-xs">
              COURSE SCENARIO
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
                      {node.id === 'svc-overview' && <Globe className="w-6 h-6" />}
                      {node.id === 'svc-portal' && <Monitor className="w-6 h-6" />}
                      {node.id === 'svc-shared-docs' && <FileSpreadsheet className="w-6 h-6" />}
                      {node.id === 'svc-telemetry' && <Activity className="w-6 h-6" />}
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

          {/* Architecture Relationship Card */}
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300 flex-wrap gap-2">
            <span className="text-sky-400 font-bold">SCENARIO ASSETS:</span>
            <span>Workstation: BLR-BR-WS-04</span>
            <span>Account: FIN-OPS-01</span>
            <span>Subnet: 10.10.20.0/24 (VLAN 20)</span>
            <span className="text-emerald-400 font-bold">SIEM Feed: Active</span>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 14. Entity Separation Grid (M00-U3-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm00-entity-separation-grid') {
    const nodes = entitySeparationGridNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Boxes className="w-5 h-5 text-sky-400" />
                <span>Entity Separation: Account vs Host vs IP vs Human User</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                An account is not a computer, and credentials do not prove who was physically at the keyboard.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 font-mono text-xs">
              ENTITY RESOLUTION
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
                      {node.id === 'ent-account' && <Key className="w-6 h-6" />}
                      {node.id === 'ent-host' && <Monitor className="w-6 h-6" />}
                      {node.id === 'ent-ip' && <Radio className="w-6 h-6" />}
                      {node.id === 'ent-human' && <Users className="w-6 h-6" />}
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

          {/* Visual Entity Bridge Diagram */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300 flex-wrap gap-2">
            <span className="text-white font-bold">HUMAN</span>
            <span className="text-slate-500">uses credential ➔</span>
            <span className="text-amber-400 font-bold">FIN-OPS-01</span>
            <span className="text-slate-500">logs into ➔</span>
            <span className="text-sky-400 font-bold">BLR-BR-WS-04</span>
            <span className="text-slate-500">leased ➔</span>
            <span className="text-emerald-400 font-bold">10.10.20.15</span>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 15. Disciplined Observables vs Speculation (M00-U3-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm00-disciplined-observables') {
    const nodes = disciplinedObservablesNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[1];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-sky-400" />
                <span>Forensic Restraint: Disciplined Observables vs Speculation</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                State what the log proves, not what you imagine. Avoid speculative leaps that ruin investigations.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 font-mono text-xs">
              FORENSIC RESTRAINT
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              const isSpeculation = node.id === 'obs-speculation';
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(node);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? isSpeculation
                        ? 'bg-rose-500/25 border-rose-400 ring-2 ring-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                        : 'bg-emerald-500/20 border-emerald-400 ring-2 ring-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSpeculation
                          ? 'bg-rose-950/80 text-rose-400 border border-rose-500/40'
                          : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {node.id === 'obs-raw-event' && <FileText className="w-6 h-6" />}
                      {node.id === 'obs-disciplined' && <CheckCircle2 className="w-6 h-6" />}
                      {node.id === 'obs-speculation' && <AlertOctagon className="w-6 h-6" />}
                      {node.id === 'obs-verification' && <Shield className="w-6 h-6" />}
                    </div>
                    {node.badge && (
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-mono ${
                          isSpeculation ? 'border-rose-500/40 text-rose-300' : 'border-sky-500/30 text-sky-300'
                        }`}
                      >
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

          {/* Golden Rule Comparison Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200">
              <strong className="block text-emerald-400 pb-1">✓ DISCIPLINED STATEMENT:</strong>
              &ldquo;Logon recorded under account FIN-OPS-01 from host BLR-BR-WS-04.&rdquo; (Verifiable fact)
            </div>
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200">
              <strong className="block text-rose-400 pb-1">✕ SPECULATIVE LEAP (AVOID):</strong>
              &ldquo;Employee Sharma came to the office at night to steal files.&rdquo; (Unproven speculation)
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 16. The 15-Module Curriculum Roadmap (M00-U3-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm00-curriculum-roadmap-15') {
    const nodes = curriculumRoadmapNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[activeRoadmapStage];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-sky-400" />
                <span>The 15-Module Learning Roadmap to Supervised L1 Readiness</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                From computer baselines and network packets to SIEM threat hunting and autonomous playbook triage.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 font-mono text-xs">
              15-MODULE PIPELINE
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {nodes.map((node, idx) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveRoadmapStage(idx);
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
                      {node.id === 'road-foundations' && <Cpu className="w-6 h-6" />}
                      {node.id === 'road-triage-siem' && <Terminal className="w-6 h-6" />}
                      {node.id === 'road-sensors' && <Radio className="w-6 h-6" />}
                      {node.id === 'road-capstone' && <Shield className="w-6 h-6" />}
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

          {/* Stepper Pipeline Flow */}
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300 flex-wrap gap-2">
            <span className="text-sky-400 font-bold">ROADMAP PROGRESSION:</span>
            <span className="text-white">M00 Orientation</span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-white">M01 Hardware</span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-white">M05 SIEM</span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-white">M13 ATT&CK</span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-emerald-300 font-bold">M14 Capstone Handover</span>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 17. The 4-Section Learning Engine (M00-U3-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm00-four-section-engine') {
    const nodes = fourSectionEngineNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-400" />
                <span>The 4-Section Chapter Architecture</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Consistent active learning rhythm: Theory Briefing ➔ Animated Story ➔ Hands-On Lab ➔ Knowledge Check.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 font-mono text-xs">
              PEDAGOGY ENGINE
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
                      {node.id === 'sec1-theory' && <FileText className="w-6 h-6" />}
                      {node.id === 'sec2-visual' && <Play className="w-6 h-6" />}
                      {node.id === 'sec3-activity' && <Sliders className="w-6 h-6" />}
                      {node.id === 'sec4-check' && <CheckCircle2 className="w-6 h-6" />}
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

          {/* Section Summary Card */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300 flex-wrap gap-2">
            <span className="text-sky-400 font-bold">STRUCTURED PROGRESSION:</span>
            <span>Every single chapter follows this active, 4-step pedagogical structure to cement mastery.</span>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 18. Fading Scaffolding & L1 Readiness (M00-U3-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm00-fading-scaffolding-l1') {
    const nodes = fadingScaffoldingL1Nodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[2];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-sky-400" />
                <span>Fading Scaffolding & Supervised L1 Triage Readiness</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Support gradually reduces: Moving from mentor guidance to autonomous execution of standard operating playbooks.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 font-mono text-xs">
              L1 CAPABILITY
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
                      {node.id === 'scaf-initial' && <Users className="w-6 h-6" />}
                      {node.id === 'scaf-fading' && <Sliders className="w-6 h-6" />}
                      {node.id === 'scaf-autonomous' && <Shield className="w-6 h-6" />}
                      {node.id === 'scaf-destination' && <CheckCircle2 className="w-6 h-6" />}
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

          {/* Final Destination Banner */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/60 via-sky-950/60 to-indigo-950/60 border border-emerald-500/30 text-xs sm:text-sm text-slate-100 flex items-center gap-3">
            <span className="text-xl">🎯</span>
            <p className="italic">
              &ldquo;Your destination is evidence-based beginner L1 practice, not instant perfection. By the final capstone, you will triage, document, and escalate within a real SOC playbook.&rdquo; — <strong className="text-emerald-300">Mentor Ananya</strong>
            </p>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // Fallback
  return null;
}
