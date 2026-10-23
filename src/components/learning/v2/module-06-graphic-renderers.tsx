'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { sound } from '@/lib/sound-effects';
import {
  literalEventNodes,
  timestampTriadNodes,
  outcomePrecisionNodes,
  parsingPipelineNodes,
  fieldMappingNodes,
  rawVerificationNodes,
  utcTimelineNodes,
  midnightRolloverNodes,
  unknownOffsetNodes,
  stableIdentifiersNodes,
  dhcpLeaseWindowNodes,
  coincidenceTriageNodes,
  corroborationEngineNodes,
  blackoutGapNodes,
  echoChamberNodes,
  twoColumnLedgerNodes,
  presumptionTrapNodes,
  uncertaintyNoteNodes,
} from './module-06-visual-stories';
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
  Play,
  RotateCcw,
  HelpCircle,
  ShieldAlert,
  Ban,
  EyeOff,
  Network,
  FileSpreadsheet,
  Fingerprint,
  Calendar,
  PhoneCall,
  FileCheck,
  Award,
  AlertCircle,
  ArrowUpRight,
  Copy,
  Layers,
  Laptop,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import { VisualNodeItem, VisualStoryStyle } from './interactive-visual-story-engine';

interface Module06GraphicRendererProps {
  style: VisualStoryStyle;
  selectedNodeId: string;
  onSelectNode: (node: VisualNodeItem) => void;
  animStep: number;
}

export function Module06GraphicRenderer({
  style,
  selectedNodeId,
  onSelectNode,
  animStep,
}: Module06GraphicRendererProps) {
  // Interactive test states for Module 06 scenarios
  const [literalReadingMode, setLiteralReadingMode] = useState<'literal' | 'speculative'>('literal');
  const [activeTimestampStep, setActiveTimestampStep] = useState<number>(0);
  const [outcomeVerdict, setOutcomeVerdict] = useState<'failure' | 'success'>('failure');
  const [pipelineStep, setPipelineStep] = useState<number>(1);
  const [activeVendorField, setActiveVendorField] = useState<'all' | 'windows' | 'linux' | 'cef'>('all');
  const [showRawGroundTruth, setShowRawGroundTruth] = useState<boolean>(false);
  const [timeConversionMode, setTimeConversionMode] = useState<'ist-to-utc' | 'utc-to-ist'>('ist-to-utc');
  const [rolloverSlider, setRolloverSlider] = useState<number>(10); // 01:10 AM IST
  const [unknownOffsetMode, setUnknownOffsetMode] = useState<'honest' | 'guess'>('honest');
  const [identifierFilter, setIdentifierFilter] = useState<'all' | 'stable' | 'transient'>('all');
  const [activeLeaseWindow, setActiveLeaseWindow] = useState<'early' | 'late'>('early');
  const [coincidenceTestMode, setCoincidenceTestMode] = useState<'isolated' | 'correlated'>('isolated');
  const [corroborationState, setCorroborationState] = useState<'corroborated' | 'contradicted' | 'unresolved'>('corroborated');
  const [blackoutViewMode, setBlackoutViewMode] = useState<'endpoint-only' | 'triangulated'>('endpoint-only');
  const [echoChamberFilter, setEchoChamberFilter] = useState<'physical' | 'displays'>('physical');
  const [ledgerMode, setLedgerMode] = useState<'disciplined' | 'biased'>('disciplined');
  const [presumptionGate, setPresumptionGate] = useState<'sequence' | 'typo' | 'script' | 'attack'>('sequence');
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
  // 1. Literal Event Deconstruction (M06-U1-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm06-literal-event') {
    const nodes = literalEventNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-400" />
                <span>Literal Event Deconstruction &bull; Read Before Interpreting</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Mentor Karthik: &quot;First describe the record literally. Interpretation comes after you understand what the source reports.&quot;
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setLiteralReadingMode('literal');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  literalReadingMode === 'literal'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Disciplined Literal Reading
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setLiteralReadingMode('speculative');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  literalReadingMode === 'speculative'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Novice Speculative Trap
              </button>
            </div>
          </div>

          {/* Reading Comparison Banner */}
          <div
            className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm font-mono transition-all ${
              literalReadingMode === 'literal'
                ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/30 text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {literalReadingMode === 'literal' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
              <span>
                {literalReadingMode === 'literal'
                  ? 'EVALUATION: "EventID 4625 records a failed logon attempt for FIN-OPS-01 (Bad Password). Access was blocked."'
                  : 'FALLACY: "A hacker compromised FIN-OPS-01 and breached corporate financial servers at 2 AM!" (No evidence of access)'}
              </span>
            </div>
            <Badge
              className={`shrink-0 font-mono text-xs ${
                literalReadingMode === 'literal'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}
            >
              {literalReadingMode === 'literal' ? 'VALID AUDIT NOTE' : 'REJECTED BY KARTHIK'}
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-sky-400">{node.id}</span>
                      {node.badge && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'lit-raw-text' ? (
                          <FileCode className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'lit-literal-desc' ? (
                          <Eye className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'lit-outcome-eval' ? (
                          <ShieldAlert className="w-6 h-6 text-amber-400" />
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
  // 2. The Tri-Timestamp Continuum (M06-U1-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm06-timestamp-triad') {
    const nodes = timestampTriadNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const timelineSteps = [
      {
        step: 0,
        title: 'Kernel Event Generation (@timestamp)',
        time: '02:45:10.184Z',
        clock: 'Host Endpoint Clock (BLR-BR-WS-04)',
        desc: 'Microsecond when kernel physically executed process. Forensics master anchor.',
      },
      {
        step: 1,
        title: 'Central Ingestion (_index_time)',
        time: '02:45:13.412Z',
        clock: 'SIEM Indexer Cluster',
        desc: 'Transport delay lag: 3.2 seconds. Document parsed and committed to searchable index.',
      },
      {
        step: 2,
        title: 'Rule Correlation Fired (alert.time)',
        time: '02:45:25.000Z',
        clock: 'Detection Engine Dispatcher',
        desc: 'Sliding window evaluated and security ticket generated. SLA clock starts now.',
      },
    ];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-400" />
                <span>The Tri-Timestamp Continuum &bull; Generation vs Ingestion vs Alert</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Karthik: &quot;Alert creation time does not equal underlying activity time. Preservation of both is critical for investigation.&quot;
              </p>
            </div>
            <div className="flex items-center gap-2">
              {timelineSteps.map((s) => (
                <button
                  key={s.step}
                  onClick={() => {
                    sound.playClick();
                    setActiveTimestampStep(s.step);
                  }}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
                    activeTimestampStep === s.step
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Step {s.step + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Stepper Display */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-left w-full">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
                <h5 className="font-bold text-sm sm:text-base text-white">
                  {timelineSteps[activeTimestampStep].title}
                </h5>
                <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 font-mono text-xs">
                  {timelineSteps[activeTimestampStep].time}
                </Badge>
              </div>
              <p className="text-xs text-sky-300/80 font-mono">
                Source Clock: {timelineSteps[activeTimestampStep].clock}
              </p>
              <p className="text-xs sm:text-sm text-slate-300">
                {timelineSteps[activeTimestampStep].desc}
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-mono text-xs">
                NTP DRIFT: &plusmn;12ms (WITHIN &plusmn;50ms SPEC)
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
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'ts-generation' ? (
                          <Activity className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'ts-ingestion' ? (
                          <Database className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'ts-alert-fired' ? (
                          <AlertTriangle className="w-6 h-6 text-amber-400" />
                        ) : (
                          <Clock className="w-6 h-6 text-purple-400" />
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
  // 3. Outcome Precision: Failed != Compromised (M06-U1-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm06-outcome-precision') {
    const nodes = outcomePrecisionNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Outcome Precision &bull; Logon Failure != Compromise</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Reject any statement in a case report that lacks a corresponding supporting field in the logs.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setOutcomeVerdict('failure');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  outcomeVerdict === 'failure'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Event 4625 (Denied)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setOutcomeVerdict('success');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  outcomeVerdict === 'success'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Event 4624 (Granted)
              </button>
            </div>
          </div>

          {/* Outcome Comparison Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-2 ${
                outcomeVerdict === 'failure'
                  ? 'bg-amber-950/30 border-amber-500/50 ring-1 ring-amber-500/30'
                  : 'bg-slate-900/60 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400">
                  EVENTID 4625 &bull; LOGON FAILURE
                </span>
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs">
                  BARRIER HELD
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-slate-200">
                Status: 0xC000006A (Bad password). System denied access token creation. Proves the security perimeter blocked the attempt.
              </p>
              <p className="text-xs text-amber-300/90 font-mono">
                Mandatory Phrasing: &quot;Account authentication attempted and rejected by DC.&quot;
              </p>
            </div>

            <div
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-2 ${
                outcomeVerdict === 'success'
                  ? 'bg-emerald-950/30 border-emerald-500/50 ring-1 ring-emerald-500/30'
                  : 'bg-slate-900/60 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  EVENTID 4624 &bull; LOGON SUCCESS
                </span>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
                  SESSION ESTABLISHED
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-slate-200">
                LogonType: 2 (Interactive Console). System generated security token 0x3E7. Confirms active user session established.
              </p>
              <p className="text-xs text-emerald-300/90 font-mono">
                Mandatory Phrasing: &quot;Account FIN-OPS-01 authenticated and initialized session.&quot;
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
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'out-failure-eval' ? (
                          <Ban className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'out-success-eval' ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'out-evidence-bound' ? (
                          <FileText className="w-6 h-6 text-sky-400" />
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
  // 4. Parsing vs Normalization Pipeline (M06-U1-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm06-parsing-pipeline') {
    const nodes = parsingPipelineNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const pipelineStages = [
      {
        stage: 1,
        name: 'Raw Log',
        status: 'Unstructured Text',
        output: 'Oct 15 02:45:10 BLR-BR-WS-04 sshd[4912]: Failed password for invalid user admin from 185.220.101.4 port 8080',
      },
      {
        stage: 2,
        name: 'Grok / Dissect',
        status: 'Pattern Sliced',
        output: '{ timestamp: "Oct 15 02:45:10", host: "BLR-BR-WS-04", user: "admin", src_ip: "185.220.101.4", port: 8080 }',
      },
      {
        stage: 3,
        name: 'Normalized Schema',
        status: 'ECS Mapped',
        output: '{ "user.name": "admin", "source.ip": "185.220.101.4", "source.port": 8080, "host.hostname": "BLR-BR-WS-04" }',
      },
      {
        stage: 4,
        name: 'Type Validation',
        status: 'Indexed & Typed',
        output: '{ source.ip: IPAddress(185.220.101.4), source.port: Int32(8080), @timestamp: ISODateTime(2026-10-15T02:45:10Z) }',
      },
    ];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Workflow className="w-5 h-5 text-sky-400" />
                <span>Parsing &amp; Normalization Pipeline &bull; String to ECS Dictionary</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Tokenizing vendor delimiters into structured, indexed variables with strict typed validation.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {pipelineStages.map((st) => (
                <button
                  key={st.stage}
                  onClick={() => {
                    sound.playClick();
                    setPipelineStep(st.stage);
                  }}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
                    pipelineStep === st.stage
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Stage {st.stage}: {st.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active Pipeline Stage Output */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-sky-400">
                STAGE {pipelineStep} TRANSFORMER OUTPUT &bull; {pipelineStages[pipelineStep - 1].status}
              </span>
              <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-[10px] font-mono">
                PIPELINE STEP {pipelineStep}/4
              </Badge>
            </div>
            <div className="p-2.5 rounded-lg bg-[#040c1e] border border-slate-800 font-mono text-xs text-sky-200 overflow-x-auto">
              {pipelineStages[pipelineStep - 1].output}
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
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'pipe-raw-unparsed' ? (
                          <FileCode className="w-6 h-6 text-slate-400" />
                        ) : node.id === 'pipe-grok-regex' ? (
                          <Filter className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'pipe-normalized-ecs' ? (
                          <Layers className="w-6 h-6 text-sky-400" />
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
  // 5. Cross-Vendor Field Mapping Matrix (M06-U1-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm06-field-mapping') {
    const nodes = fieldMappingNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-sky-400" />
                <span>Cross-Vendor Field Mapping Matrix &bull; Harmonization to user.name</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Windows TargetUserName + Linux $USER + Cisco CEF suser &rarr; Unified Elastic Common Schema (ECS).
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {(['all', 'windows', 'linux', 'cef'] as const).map((vnd) => (
                <button
                  key={vnd}
                  onClick={() => {
                    sound.playClick();
                    setActiveVendorField(vnd);
                  }}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg border uppercase transition-all ${
                    activeVendorField === vnd
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {vnd}
                </button>
              ))}
            </div>
          </div>

          {/* Unified Query Tester */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">SIEM CANONICAL SEARCH:</span>
              <span className="px-3 py-1 rounded bg-black/60 border border-sky-500/40 text-xs font-mono text-sky-300">
                user.name: &quot;FIN-OPS-01&quot;
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px] font-mono">
                &check; MATCHES 42 WINDOWS LOGS
              </Badge>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px] font-mono">
                &check; MATCHES 8 LINUX SUDO
              </Badge>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px] font-mono">
                &check; MATCHES 15 FIREWALL SESSIONS
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
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'map-windows-user' ? (
                          <Laptop className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'map-linux-user' ? (
                          <Terminal className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'map-cef-suser' ? (
                          <Shield className="w-6 h-6 text-emerald-400" />
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
  // 6. Parser Hallucination & Raw Verification (M06-U1-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm06-raw-verification') {
    const nodes = rawVerificationNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-amber-400" />
                <span>Parser Hallucination &bull; Compare Normalized with Raw Ground Truth</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Karthik: &quot;Normalisation does not guarantee the parser understood everything. Compare normalised fields with raw data.&quot;
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setShowRawGroundTruth(!showRawGroundTruth);
              }}
              className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                showRawGroundTruth
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {showRawGroundTruth ? 'Showing: Raw event.original Truth' : 'Showing: Normalized Parsed View'}
            </button>
          </div>

          {/* Raw vs Parsed Comparison Banner */}
          <div
            className={`p-3.5 rounded-xl border flex flex-col gap-2 font-mono text-xs transition-all ${
              showRawGroundTruth
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-2">
                {showRawGroundTruth ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                )}
                {showRawGroundTruth
                  ? 'GROUND TRUTH (event.original): Outbound packet to 185.220.101.4:8080'
                  : 'PARSER FLAW: Inverted direction! Parser mapped 185.220.101.4 as source.ip!'}
              </span>
              <Badge
                className={`font-mono text-[10px] ${
                  showRawGroundTruth
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                }`}
              >
                {showRawGroundTruth ? 'ACCURATE MEANING' : 'HAZARDOUS MISINTERPRETATION'}
              </Badge>
            </div>
            <div className="p-2 rounded bg-black/60 border border-slate-800 text-[11px] text-slate-300">
              {showRawGroundTruth
                ? 'Original Log: "Oct 15 02:45:10 BLR-FW-01 traffic: OUTBOUND TCP from 10.10.20.15:49152 to 185.220.101.4:8080 action=DROP"'
                : 'Normalized Record: { source.ip: "185.220.101.4", destination.ip: "10.10.20.15" } <-- INCORRECT INVERSION!'}
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
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'raw-parser-bug' ? (
                          <AlertTriangle className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'raw-ground-truth' ? (
                          <Eye className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'raw-direction-trap' ? (
                          <RotateCcw className="w-6 h-6 text-amber-400" />
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
  // 7. Universal UTC Timeline Normalization (M06-U2-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm06-utc-timeline') {
    const nodes = utcTimelineNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-400" />
                <span>Universal UTC Timeline Normalization &bull; Zero Meridian Standard</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Bengaluru Branch IST (UTC+05:30) conversion: Subtract 5 hours and 30 minutes to synchronize chronological streams.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setTimeConversionMode(timeConversionMode === 'ist-to-utc' ? 'utc-to-ist' : 'ist-to-utc');
                }}
                className="px-3 py-1 text-xs font-mono rounded-lg border bg-sky-500/20 text-sky-300 border-sky-500/40 hover:bg-sky-500/30"
              >
                Mode: {timeConversionMode === 'ist-to-utc' ? 'Convert IST -> UTC (-5h30m)' : 'Convert UTC -> IST (+5h30m)'}
              </button>
            </div>
          </div>

          {/* Conversion Visual Equation */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-black/60 border border-slate-800 text-center">
                <span className="text-[10px] font-mono text-slate-400 block">LOCAL BENGALURU</span>
                <span className="text-sm sm:text-base font-bold font-mono text-amber-300">08:15:10 IST</span>
              </div>
              <span className="font-mono text-slate-500 font-bold text-lg">&minus; 05:30 =</span>
              <div className="p-3 rounded-lg bg-black/60 border border-sky-500/40 text-center">
                <span className="text-[10px] font-mono text-sky-400 block">MASTER UTC TIME</span>
                <span className="text-sm sm:text-base font-bold font-mono text-emerald-300">02:45:10Z (UTC)</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-slate-300 block">
                Preserve Original &amp; UTC Both:
              </span>
              <span className="text-[11px] font-mono text-sky-300/80">
                &quot;08:15:10 IST (Zone: Asia/Kolkata) &rarr; 02:45:10Z&quot;
              </span>
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
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'utc-master-clock' ? (
                          <Clock className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'utc-ist-offset' ? (
                          <Globe className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'utc-event-stream' ? (
                          <Activity className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <FileText className="w-6 h-6 text-purple-400" />
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
  // 8. The Midnight Rollover Trap (M06-U2-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm06-midnight-rollover') {
    const nodes = midnightRolloverNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <span>The Midnight Rollover Trap &bull; Early Morning Local Crosses Midnight</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                01:10 AM IST (15 Oct) &minus; 05:30 = 19:40 UTC (14 Oct). The event rolls back to the previous calendar day!
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 font-mono text-xs">
              CRITICAL SEARCH PITFALL
            </Badge>
          </div>

          {/* Rollover Visual Slider/Toggle */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-300">
                EARLY MORNING BENGALURU TIMELINE AUDIT:
              </span>
              <span className="text-xs font-mono text-slate-300">
                Local: 01:10 IST (15 Oct) &rarr; UTC: 19:40Z (14 Oct)
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/40 text-xs">
                <span className="font-bold text-rose-300 block pb-1">
                  &cross; FLAWED SIEM SEARCH (Filter: 15 Oct Only)
                </span>
                <p className="text-slate-300">
                  Analyst searches index for 15 Oct. Event indexed at 19:40Z (14 Oct) is completely hidden. Incident missed!
                </p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/40 text-xs">
                <span className="font-bold text-emerald-300 block pb-1">
                  &check; KARTHIK DOCTRINE (Bracket Cross-Day Window)
                </span>
                <p className="text-slate-300">
                  Query filter: 2026-10-14T18:00:00Z to 2026-10-15T06:00:00Z. Rollover caught with 100% visibility.
                </p>
              </div>
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
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'roll-ist-oct15' ? (
                          <Clock className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'roll-utc-oct14' ? (
                          <AlertTriangle className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'roll-date-change' ? (
                          <Calendar className="w-6 h-6 text-purple-400" />
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
  // 9. The Unknown Offset Dilemma (M06-U2-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm06-unknown-offset') {
    const nodes = unknownOffsetNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <span>The Unknown Offset Dilemma &bull; Label Uncertainty Rather Than Guess</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Log reports &quot;02:45:10&quot; without timezone specifier. Guesswork destroys cause-and-effect proof.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setUnknownOffsetMode('honest');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  unknownOffsetMode === 'honest'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Honest Gap Representation
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setUnknownOffsetMode('guess');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  unknownOffsetMode === 'guess'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Dangerous Invention Trap
              </button>
            </div>
          </div>

          {/* Uncertainty Display Banner */}
          <div
            className={`p-3.5 rounded-xl border flex flex-col gap-2 font-mono text-xs transition-all ${
              unknownOffsetMode === 'honest'
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-2">
                {unknownOffsetMode === 'honest' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                )}
                {unknownOffsetMode === 'honest'
                  ? 'PROFESSIONAL PRACTICE: Label timestamp as "02:45:10 (Zone Unknown). Action: Query NTP & OS config."'
                  : 'FATAL FLAW: Guessing UTC forces event into wrong chronology, making download appear before logon!'}
              </span>
              <Badge
                className={`font-mono text-[10px] ${
                  unknownOffsetMode === 'honest'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                }`}
              >
                {unknownOffsetMode === 'honest' ? 'FORENSIC INTEGRITY' : 'EVIDENTIARY POLLUTION'}
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
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'off-missing-zone' ? (
                          <AlertTriangle className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'off-honest-gap' ? (
                          <Eye className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'off-no-guesswork' ? (
                          <Ban className="w-6 h-6 text-rose-400" />
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
  // 10. Stable Identifiers vs Transient IPs (M06-U2-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm06-stable-identifiers') {
    const nodes = stableIdentifiersNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-sky-400" />
                <span>Stable Identifiers vs Transient IPs &bull; MAC &amp; SID vs DHCP Pool</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Hardware MAC address and AD SID are permanently bound anchors; IP addresses are recycled dynamically.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {(['all', 'stable', 'transient'] as const).map((flt) => (
                <button
                  key={flt}
                  onClick={() => {
                    sound.playClick();
                    setIdentifierFilter(flt);
                  }}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg border uppercase transition-all ${
                    identifierFilter === flt
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {flt}
                </button>
              ))}
            </div>
          </div>

          {/* Identifier Comparison Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-emerald-400">HARDWARE LAYER 2 (STABLE)</span>
                <p className="text-xs font-mono text-white">MAC: 00:1A:2B:3C:4D:5E</p>
                <p className="text-xs text-slate-300">Burned into NIC. Persists across subnets and DHCP lease rollovers.</p>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px] font-mono mt-2 self-start">
                STABILITY: 100% PERMANENT
              </Badge>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-sky-400">IDENTITY ANCHOR (STABLE)</span>
                <p className="text-xs font-mono text-white">SID: S-1-5-21-38491-91823-1004</p>
                <p className="text-xs text-slate-300">Active Directory binary security token. Survives account rename.</p>
              </div>
              <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-[10px] font-mono mt-2 self-start">
                STABILITY: IMMUTABLE SID
              </Badge>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/30 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-amber-400">NETWORK IP (TRANSIENT)</span>
                <p className="text-xs font-mono text-white">IP: 10.10.20.15 (8h Lease)</p>
                <p className="text-xs text-slate-300">Recycled by DHCP. Never accuse an employee on IP alone without lease log.</p>
              </div>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[10px] font-mono mt-2 self-start">
                RECYCLED DYNAMIC POOL
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
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'id-mac-hardware' ? (
                          <Network className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'id-sid-identity' ? (
                          <Fingerprint className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'id-dhcp-lease' ? (
                          <Database className="w-6 h-6 text-purple-400" />
                        ) : (
                          <AlertTriangle className="w-6 h-6 text-amber-400" />
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
  // 11. The DHCP Lease Window Anchor (M06-U2-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm06-dhcp-lease-window') {
    const nodes = dhcpLeaseWindowNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-400" />
                <span>The DHCP Lease Window Anchor &bull; Preventing the False Accusation Trap</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Correlating events using dynamic IP 10.10.20.15 requires checking the active DHCP lease at that exact minute.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveLeaseWindow('early');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  activeLeaseWindow === 'early'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                02:45 UTC (Desk 04 Finance)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveLeaseWindow('late');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  activeLeaseWindow === 'late'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                10:00 UTC (Auditor Laptop)
              </button>
            </div>
          </div>

          {/* Active Lease Demonstration Box */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono transition-all ${
              activeLeaseWindow === 'early'
                ? 'bg-emerald-950/30 border-emerald-500/40'
                : 'bg-amber-950/30 border-amber-500/40'
            }`}
          >
            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                {activeLeaseWindow === 'early' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                )}
                {activeLeaseWindow === 'early'
                  ? 'LEASE INTERVAL: 00:00 - 08:00 UTC &bull; Workstation BLR-BR-WS-04'
                  : 'LEASE INTERVAL: 08:30 - 16:30 UTC &bull; Visiting Auditor Laptop BLR-BR-LAP-12'}
              </span>
              <p className="text-xs text-slate-300">
                {activeLeaseWindow === 'early'
                  ? 'Incident occurred at 02:45 UTC. Desk 04 held this IP. Securely bound to finance workstation.'
                  : 'Failing to check the lease would falsely accuse finance desk 04 for traffic generated by the auditor!'}
              </p>
            </div>
            <Badge
              className={`font-mono text-xs ${
                activeLeaseWindow === 'early'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}
            >
              {activeLeaseWindow === 'early' ? 'ACCURATE ATTRIBUTION' : 'RECYCLED LEASE DETECTED'}
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
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'lease-active-window' ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'lease-reassigned-ip' ? (
                          <AlertTriangle className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'lease-collision-check' ? (
                          <Ban className="w-6 h-6 text-rose-400" />
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
  // 12. Coincidence vs Connection Triage (M06-U2-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm06-coincidence-triage') {
    const nodes = coincidenceTriageNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-sky-400" />
                <span>Coincidence vs Connection Triage &bull; Shared Minutes Alone Prove Nothing</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Nearby timestamps suggest a possible link, not a proven relationship. Check the surrounding context.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setCoincidenceTestMode('isolated');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  coincidenceTestMode === 'isolated'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Spurious Coincidence (Diff Hosts)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setCoincidenceTestMode('correlated');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  coincidenceTestMode === 'correlated'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Verified Connection (Shared Keys)
              </button>
            </div>
          </div>

          {/* Triangulation Test Comparison */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono transition-all ${
              coincidenceTestMode === 'isolated'
                ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
            }`}
          >
            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                {coincidenceTestMode === 'isolated' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
                {coincidenceTestMode === 'isolated'
                  ? 'COINCIDENCE: Event A (WS-04 Finance) & Event B (WS-09 HR Print Spooler) share 0 keys.'
                  : 'VERIFIED LINK: Event A (Logon WS-04) & Event C (certutil WS-04) share Host, User & Process Parent!'}
              </span>
              <p className="text-xs text-slate-300">
                {coincidenceTestMode === 'isolated'
                  ? 'Discard Event B as unrelated enterprise noise. Prevents rabbit-hole investigations.'
                  : 'Confirmed cause-and-effect correlation across security boundaries.'}
              </p>
            </div>
            <Badge
              className={`font-mono text-xs ${
                coincidenceTestMode === 'isolated'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}
            >
              {coincidenceTestMode === 'isolated' ? 'DISCARD NOISE' : 'CONFIRMED ATTACK CHAIN'}
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
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'coin-same-minute' ? (
                          <Clock className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'coin-entity-cross' ? (
                          <Filter className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'coin-false-link' ? (
                          <Ban className="w-6 h-6 text-rose-400" />
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
  // 13. Multi-Source Corroboration Engine (M06-U3-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm06-corroboration-engine') {
    const nodes = corroborationEngineNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const stateDetails = {
      corroborated: {
        badge: 'CORROBORATED FACT &bull; HIGH CONFIDENCE',
        color: 'border-emerald-500/40 bg-emerald-950/30 text-emerald-200',
        title: 'Sysmon certutil.exe + Zeek 450 KB Wire Transfer',
        desc: 'Two independent sensor technologies (Host Kernel Driver + Network Passive Tap) agree with 100% evidentiary fidelity.',
      },
      contradicted: {
        badge: 'CONTRADICTED HYPOTHESIS &bull; REFUTED',
        color: 'border-rose-500/40 bg-rose-950/30 text-rose-200',
        title: 'Employee Overtime Theory Refuted by ERP Logs',
        desc: 'ERP database shows zero invoices opened, zero transactions, and zero sessions during the entire off-hours window.',
      },
      unresolved: {
        badge: 'UNRESOLVED SCOPE &bull; EVIDENCE PENDING',
        color: 'border-amber-500/40 bg-amber-950/30 text-amber-200',
        title: 'Physical vs Remote Access Pending Badge Audit',
        desc: 'Branch CCTV cameras experienced a power outage. Status remains UNRESOLVED until physical turnstile badge logs arrive.',
      },
    };

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-400" />
                <span>Multi-Source Corroboration Engine &bull; Karthik&apos;s 3-State Verdict Matrix</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Classifying findings explicitly into Corroborated, Contradicted, or Unresolved states.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {(['corroborated', 'contradicted', 'unresolved'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    sound.playClick();
                    setCorroborationState(st);
                  }}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg border uppercase transition-all ${
                    corroborationState === st
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Active State Details Box */}
          <div className={`p-4 rounded-xl border flex flex-col gap-2 font-mono ${stateDetails[corroborationState].color}`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm">{stateDetails[corroborationState].title}</span>
              <Badge className="bg-black/40 text-current border border-current text-[10px] font-mono">
                {stateDetails[corroborationState].badge}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {stateDetails[corroborationState].desc}
            </p>
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
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'cor-corroborated' ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'cor-contradicted' ? (
                          <Ban className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'cor-unresolved' ? (
                          <HelpCircle className="w-6 h-6 text-amber-400" />
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
  // 14. The Collection Blackout Gap (M06-U3-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm06-blackout-gap') {
    const nodes = blackoutGapNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-amber-400" />
                <span>The Collection Blackout Gap &bull; Visualizing Uncertainty Honestly</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Switch reboot causes 30-minute endpoint blackout (02:30&ndash;03:00 UTC). Draw shaded gap and triangulate via firewall.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setBlackoutViewMode('endpoint-only');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  blackoutViewMode === 'endpoint-only'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Endpoint View (Shaded Gap)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setBlackoutViewMode('triangulated');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  blackoutViewMode === 'triangulated'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Triangulated Network View
              </button>
            </div>
          </div>

          {/* Blackout Timeline Display */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-300">
                TIMELINE WINDOW: 02:00 TO 04:00 UTC (BENGALURU BRANCH)
              </span>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[10px] font-mono">
                OUTAGE: 02:30 - 03:00 UTC (SWITCH REBOOT)
              </Badge>
            </div>
            <div className="p-3 rounded-lg bg-black/60 border border-slate-800 font-mono text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-slate-300">
                {blackoutViewMode === 'endpoint-only'
                  ? '[02:00 - 02:30 Active] ===> [02:30 - 03:00 SHADED GAP: ZERO INGESTION] ===> [03:00 - 04:00 Active]'
                  : 'Secondary Source Triangulation: Perimeter Firewall captured 12 outbound connection attempts during the gap!'}
              </span>
              <span className="text-sky-300 font-bold">
                {blackoutViewMode === 'endpoint-only' ? 'NEVER INVENT ACTIVITY' : 'TRIANGULATION SUCCEEDED'}
              </span>
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
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'blk-evidence-hole' ? (
                          <AlertTriangle className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'blk-shaded-gap' ? (
                          <EyeOff className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'blk-alternative-src' ? (
                          <Network className="w-6 h-6 text-emerald-400" />
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
  // 15. The Echo Chamber Trap (M06-U3-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm06-echo-chamber') {
    const nodes = echoChamberNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Copy className="w-5 h-5 text-amber-400" />
                <span>The Echo Chamber Trap &bull; Count Independent Sensors, Not Screens</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                A single syslog packet drop forwarded to 3 dashboards is 1 physical event, NOT 3 corroborating witnesses!
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setEchoChamberFilter('physical');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  echoChamberFilter === 'physical'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Origin Sensor Trace (True Count = 1)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setEchoChamberFilter('displays');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  echoChamberFilter === 'displays'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Forwarded Panes (Illusion = 3)
              </button>
            </div>
          </div>

          {/* Echo Chamber Trace Box */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono transition-all ${
              echoChamberFilter === 'physical'
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                {echoChamberFilter === 'physical' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                )}
                {echoChamberFilter === 'physical'
                  ? 'ROOT PROOF: Single Gateway Syslog Daemon on port 514 (One physical measurement).'
                  : 'COGNITIVE ILLUSION: Wallboard Screen + Compliance Portal + SIEM View = 3 Forwarded Copies.'}
              </span>
              <p className="text-xs text-slate-300">
                {echoChamberFilter === 'physical'
                  ? 'True corroboration requires a second sensor technology (e.g. Zeek packet capture or host endpoint audit).'
                  : 'Failing this test creates artificial confidence over single points of failure.'}
              </p>
            </div>
            <Badge
              className={`font-mono text-xs ${
                echoChamberFilter === 'physical'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}
            >
              {echoChamberFilter === 'physical' ? 'REAL CORROBORATION COUNT: 1' : 'ECHO CHAMBER DETECTED'}
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
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'echo-single-source' ? (
                          <Radio className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'echo-three-dashboards' ? (
                          <Copy className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'echo-illusion-proof' ? (
                          <AlertTriangle className="w-6 h-6 text-amber-400" />
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
  // 16. The Two-Column Ledger: Fact vs Hypothesis (M06-U3-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm06-two-column-ledger') {
    const nodes = twoColumnLedgerNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-sky-400" />
                <span>The Two-Column Ledger &bull; Column A (Facts) vs Column B (Hypotheses)</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Write a hypothesis as something to test, not something the reader must accept as proven truth.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setLedgerMode('disciplined');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  ledgerMode === 'disciplined'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Disciplined Two-Column Ledger
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setLedgerMode('biased');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  ledgerMode === 'biased'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Biased Presumptive Draft
              </button>
            </div>
          </div>

          {/* Two-Column Comparison Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  COLUMN A: OBSERVED FACTS (VERIFIED)
                </span>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px] font-mono">
                  HARD LOG EVIDENCE
                </Badge>
              </div>
              <ul className="text-xs text-slate-200 font-mono space-y-1 list-disc list-inside">
                <li>02:45:10Z: Event 4624 (FIN-OPS-01 logon)</li>
                <li>02:45:12Z: Sysmon Event 1 (certutil.exe launched)</li>
                <li>02:45:14Z: Zeek conn.log (450 KB TCP 8080)</li>
              </ul>
              <p className="text-[11px] text-emerald-300/80 font-mono pt-1">
                &check; Every line links to a concrete verifiable log observable.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-sky-400">
                  COLUMN B: HYPOTHESES (TO BE TESTED)
                </span>
                <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-[10px] font-mono">
                  TESTABLE THEORIES
                </Badge>
              </div>
              <ul className="text-xs text-slate-200 font-mono space-y-1 list-disc list-inside">
                <li>H1: Phishing email stole credentials &bull; Test: Gateway logs</li>
                <li>H2: Remote IT automation script &bull; Test: Change calendar</li>
                <li>H3: Adversary lolbin download &bull; Test: Sandbox hash analysis</li>
              </ul>
              <p className="text-[11px] text-sky-300/80 font-mono pt-1">
                &check; Stated as experiments with clear refutation criteria.
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
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'ledg-observed-fact' ? (
                          <FileText className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'ledg-hypothesis-test' ? (
                          <HelpCircle className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'ledg-competing-theory' ? (
                          <Layers className="w-6 h-6 text-amber-400" />
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
  // 17. The Brute-Force Presumption Trap (M06-U3-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm06-presumption-trap') {
    const nodes = presumptionTrapNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const gateOptions = {
      sequence: {
        title: '3 Failed Logons (4625) followed by 1 Success (4624)',
        desc: 'Ambiguous observable sequence. Jumping directly to "Brute-force password compromise" violates forensic discipline.',
      },
      typo: {
        title: 'Alternative A: Caps-Lock User Typo',
        desc: 'Employee made 3 typos with Caps-Lock on, then corrected on fourth attempt. Common daily office occurrence.',
      },
      script: {
        title: 'Alternative B: Stale Outlook Automation Script',
        desc: 'Scheduled task had expired password cached, retried 3 times before employee logged in manually.',
      },
      attack: {
        title: 'Human Corroboration Interview Result',
        desc: 'Analyst called employee: "Were you at desk 04 at 02:45 AM?" Employee: "I was asleep in bed." Credential theft confirmed!',
      },
    };

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span>The Brute-Force Presumption Trap &bull; Presumptions Are Not Proof</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Describe the exact sequence in Column A and document candidate explanations in Column B.
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {(['sequence', 'typo', 'script', 'attack'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    sound.playClick();
                    setPresumptionGate(g);
                  }}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg border uppercase transition-all ${
                    presumptionGate === g
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Active Presumption Gate Display */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-sky-400">
                SCENARIO EVALUATION GATE &bull; {gateOptions[presumptionGate].title}
              </span>
              <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-[10px] font-mono">
                {presumptionGate === 'attack' ? 'HUMAN CONFIRMED' : 'CANDIDATE EXPLANATION'}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {gateOptions[presumptionGate].desc}
            </p>
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
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'pres-fail-sequence' ? (
                          <AlertTriangle className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'pres-alternative-explan' ? (
                          <Filter className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'pres-user-interview' ? (
                          <PhoneCall className="w-6 h-6 text-emerald-400" />
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
  // 18. The Actionable Uncertainty Note (M06-U3-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm06-uncertainty-note') {
    const nodes = uncertaintyNoteNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-400" />
                <span>The Actionable Uncertainty Note &bull; Case #2026-881 Dossier Sign-Off</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                A professional note states what is precisely unknown and specifies the exact evidence recipe needed to resolve it.
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
              {isDossierSigned ? 'Dossier Sealed: Karthik Sign-Off' : 'Click to Sign & Seal Dossier'}
            </button>
          </div>

          {/* Dossier Milestone Banner */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                CASE #2026-881 DOSSIER COMPLETE &bull; MULTI-SOURCE UTC TIMELINE
              </span>
              <p className="text-xs text-slate-300">
                &quot;Physical presence at desk 04 unverified (CCTV outage). Action: Turnstile badge records requested from building security.&quot;
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
                {isDossierSigned ? 'MENTOR KARTHIK APPROVED' : 'AWAITING FINAL SEAL'}
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
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'note-precise-unknown' ? (
                          <HelpCircle className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'note-test-recipe' ? (
                          <FileCode className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'note-supervisory-handover' ? (
                          <Activity className="w-6 h-6 text-purple-400" />
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
