'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { sound } from '@/lib/sound-effects';
import {
  packetFlowPcapNodes,
  captureScopeNodes,
  segmentVisibilityNodes,
  tlsMetadataBoundaryNodes,
  dnsTelemetryCorrelationNodes,
  payloadAssumptionTrapNodes,
  wiresharkAnatomyNodes,
  displayVsCaptureFilterNodes,
  filterReproducibilityNodes,
  portScanReconNodes,
  periodicBeaconAnalysisNodes,
  timingAttributionDoctrineNodes,
  natPatTranslationNodes,
  proxyHeaderChainNodes,
  attributionResolutionNodes,
  pcapObjectExtractionNodes,
  conciseEvidenceDistillationNodes,
  networkDossierSignoffNodes,
} from './module-08-visual-stories';
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

interface Module08GraphicRendererProps {
  style: VisualStoryStyle;
  selectedNodeId: string;
  onSelectNode: (node: VisualNodeItem) => void;
  animStep: number;
}

export function Module08GraphicRenderer({
  style,
  selectedNodeId,
  onSelectNode,
  animStep,
}: Module08GraphicRendererProps) {
  // Interactive test states for Module 08 scenarios
  const [packetViewMode, setPacketViewMode] = useState<'packets' | 'flows' | 'pcap'>('packets');
  const [activeSensor, setActiveSensor] = useState<'tap' | 'span' | 'agent'>('tap');
  const [activeSegment, setActiveSegment] = useState<'monitored' | 'blindspot'>('monitored');
  const [cryptoView, setCryptoView] = useState<'handshake' | 'payload'>('handshake');
  const [dnsStep, setDnsStep] = useState<number>(1);
  const [payloadTrapView, setPayloadTrapView] = useState<'fact' | 'trap'>('fact');
  const [wiresharkPane, setWiresharkPane] = useState<'list' | 'details' | 'bytes'>('list');
  const [filterMode, setFilterMode] = useState<'capture' | 'display'>('display');
  const [reproMode, setReproMode] = useState<'poor' | 'reproducible'>('reproducible');
  const [scanType, setScanType] = useState<'malicious' | 'scheduled'>('malicious');
  const [beaconPattern, setBeaconPattern] = useState<'fixed' | 'jitter' | 'benign'>('fixed');
  const [doctrineMode, setDoctrineMode] = useState<'dramatic' | 'disciplined'>('disciplined');
  const [natPerspective, setNatPerspective] = useState<'inside' | 'outside'>('inside');
  const [proxyMode, setProxyMode] = useState<'direct' | 'proxy'>('proxy');
  const [attributionStep, setAttributionStep] = useState<number>(1);
  const [isCarvingIsolated, setIsCarvingIsolated] = useState<boolean>(true);
  const [distillationMode, setDistillationMode] = useState<'dump' | 'distilled'>('distilled');
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
  // 1. Packets, Flows & PCAP Demarcation (M08-U1-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm08-packet-flow-pcap') {
    const nodes = packetFlowPcapNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const modeData = {
      packets: {
        title: 'Raw Wire Octets (Full Layer 2–7 Packets)',
        desc: 'Every byte, sequence number, and flag captured on the physical wire. Essential for reconstructing byte-level payloads.',
        badge: 'WIRE LEVEL OCTETS',
      },
      flows: {
        title: 'NetFlow / Zeek Flow Records (5-Tuple Summary)',
        desc: 'Aggregated conversation metadata: Source IP/Port, Destination IP/Port, Protocol, Byte Count, Duration.',
        badge: 'SCALABLE METADATA',
      },
      pcap: {
        title: 'PCAP Forensic Evidence Repository',
        desc: 'Chronological raw capture file sealed with SHA-256 cryptographic hash for courtroom-grade reproduction.',
        badge: 'COURT ADMISSIBLE',
      },
    };

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-sky-400" />
                <span>Packets, Flows &amp; PCAP Demarcation</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Mentor Meera: &quot;The network has another viewpoint. Packets are units of communication; flows summarize conversations.&quot;
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {(['packets', 'flows', 'pcap'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    sound.playClick();
                    setPacketViewMode(m);
                  }}
                  className={`px-3 py-1 text-xs font-mono rounded-lg border uppercase transition-all ${
                    packetViewMode === m
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Active Mode Banner */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-400" />
                {modeData[packetViewMode].title}
              </span>
              <p className="text-xs text-slate-300">{modeData[packetViewMode].desc}</p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs">
              {modeData[packetViewMode].badge}
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
                        {node.id === 'pcap-raw-packet' ? (
                          <Binary className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'pcap-flow-summary' ? (
                          <Database className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'pcap-storage-repo' ? (
                          <HardDrive className="w-6 h-6 text-purple-400" />
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
  // 2. Capture Scope & Sensor Tap Geometry (M08-U1-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm08-capture-scope') {
    const nodes = captureScopeNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const sensorData = {
      tap: {
        title: 'Passive Hardware Test Access Point (TAP)',
        desc: 'Physically splits fiber optic or copper signal. Zero packet drop under peak load; invisible to network traffic.',
        fidelity: '100% HARDWARE FIDELITY',
      },
      span: {
        title: 'Switch Port Mirroring (SPAN)',
        desc: 'Switch CPU copies frames to monitoring port. Drops packets when switch backplane exceeds capacity during bursts.',
        fidelity: 'SUBJECT TO BUFFER OVERFLOW',
      },
      agent: {
        title: 'Endpoint Software Sensor / eBPF Tap',
        desc: 'Captures traffic entering or leaving local host socket. Blind to lateral traffic passing between other network nodes.',
        fidelity: 'LOCAL HOST SCOPE ONLY',
      },
    };

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-sky-400" />
                <span>Capture Scope &amp; Sensor Tap Geometry</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Meera: &quot;Where a sensor sits determines what it sees. Know your tap geometry before concluding traffic is absent.&quot;
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {(['tap', 'span', 'agent'] as const).map((sn) => (
                <button
                  key={sn}
                  onClick={() => {
                    sound.playClick();
                    setActiveSensor(sn);
                  }}
                  className={`px-3 py-1 text-xs font-mono rounded-lg border uppercase transition-all ${
                    activeSensor === sn
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {sn}
                </button>
              ))}
            </div>
          </div>

          {/* Active Sensor Display Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-sky-400" />
                {sensorData[activeSensor].title}
              </span>
              <p className="text-xs text-slate-300">{sensorData[activeSensor].desc}</p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs">
              {sensorData[activeSensor].fidelity}
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
                        {node.id === 'tap-hardware-pos' ? (
                          <Network className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'tap-span-mirror' ? (
                          <Layers className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'tap-host-agent' ? (
                          <Laptop className="w-6 h-6 text-sky-400" />
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
  // 3. Segment Visibility & The Quiet Assumption Trap (M08-U1-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm08-segment-visibility') {
    const nodes = segmentVisibilityNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-amber-400" />
                <span>Segment Visibility &bull; The &quot;Quiet Assumption&quot; Trap</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Silence on the perimeter firewall does NOT equal peace on the internal branch network!
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveSegment('monitored');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  activeSegment === 'monitored'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Monitored Perimeter (North-South)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveSegment('blindspot');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  activeSegment === 'blindspot'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Unmonitored Internal (East-West Trap)
              </button>
            </div>
          </div>

          {/* Visibility Trap Comparison Banner */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs transition-all ${
              activeSegment === 'monitored'
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="space-y-1 text-left">
              <span className="font-bold flex items-center gap-2">
                {activeSegment === 'monitored' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                )}
                {activeSegment === 'monitored'
                  ? 'NORTH-SOUTH FIREWALL TAP: Zero anomalous external inbound connections.'
                  : 'EAST-WEST INTERNAL BLINDSPOT: Lateral PsExec spreading between WS-04 and DC-01 is completely unmonitored!'}
              </span>
              <p className="text-slate-300">
                {activeSegment === 'monitored'
                  ? 'Perimeter inspection verifies internet ingress/egress. Proves barrier against direct internet attacks.'
                  : 'Meera: "Never assume silence means absence. A sensor only monitors the physical segment it sits on."'
                }
              </p>
            </div>
            <Badge
              className={`font-mono text-xs ${
                activeSegment === 'monitored'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}
            >
              {activeSegment === 'monitored' ? 'PERIMETER MONITORED' : 'LATERAL BLINDSPOT ⚠️'}
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
                        {node.id === 'seg-monitored-zone' ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'seg-unmonitored-gap' ? (
                          <EyeOff className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'seg-assumption-trap' ? (
                          <Ban className="w-6 h-6 text-amber-400" />
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
  // 4. TLS/HTTPS Encryption Boundary (M08-U1-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm08-tls-metadata-boundary') {
    const nodes = tlsMetadataBoundaryNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-sky-400" />
                <span>TLS/HTTPS Encryption Boundary &bull; Observable Metadata vs Encrypted Payload</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Meera: &quot;Encryption hides the payload bytes, but the handshake reveals rich forensic metadata: SNI, certificates, and JA3.&quot;
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setCryptoView('handshake');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  cryptoView === 'handshake'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Cleartext TLS Handshake Metadata
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setCryptoView('payload');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  cryptoView === 'payload'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Encrypted Application Data Stream
              </button>
            </div>
          </div>

          {/* TLS Boundary Display Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1 text-left">
              <span className="font-bold text-white flex items-center gap-2">
                {cryptoView === 'handshake' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Lock className="w-4 h-4 text-amber-400" />
                )}
                {cryptoView === 'handshake'
                  ? 'ClientHello SNI: "billing-update.com" | Server Certificate: CN=threat-domain.net | JA3: e7d705a308b8e1a0'
                  : 'Application Data: 450,210 bytes of high-entropy ciphertext (AES-256-GCM). Payload unreadable on wire.'}
              </span>
              <p className="text-slate-300">
                {cryptoView === 'handshake'
                  ? 'Forensic Clue: SNI indicates legitimate billing, but server certificate Common Name points to suspicious domain!'
                  : 'Warning: Seeing 450 KB of ciphertext proves volume transfer, but does NOT prove what files were inside.'}
              </p>
            </div>
            <Badge
              className={`font-mono text-xs ${
                cryptoView === 'handshake'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}
            >
              {cryptoView === 'handshake' ? 'OBSERVABLE FORENSICS' : 'CIPHERTEXT BOUNDARY'}
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
                        {node.id === 'tls-sni-observable' ? (
                          <Globe className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'tls-cert-chain' ? (
                          <FileCheck className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'tls-encrypted-payload' ? (
                          <Lock className="w-6 h-6 text-amber-400" />
                        ) : (
                          <Fingerprint className="w-6 h-6 text-purple-400" />
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
  // 5. DNS Telemetry & Resolution Flow (M08-U1-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm08-dns-telemetry-correlation') {
    const nodes = dnsTelemetryCorrelationNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const dnsSteps = [
      {
        step: 1,
        title: 'Step 1: Client DNS Query (UDP 53)',
        desc: 'Workstation 10.10.20.15 sends standard DNS query A billing-update.com to branch resolver 10.10.10.5.',
      },
      {
        step: 2,
        title: 'Step 2: Resolver Authoritative Lookup',
        desc: 'Branch recursive resolver queries root and authoritative nameservers for billing-update.com.',
      },
      {
        step: 3,
        title: 'Step 3: A-Record Answer Bound',
        desc: 'Response packet returns A record: billing-update.com maps to IP 185.220.101.4 (TTL 300s).',
      },
      {
        step: 4,
        title: 'Step 4: Subsequent TCP Connection',
        desc: 'Within 24ms, workstation initiates TCP handshake (SYN) to 185.220.101.4:8080. Causal link proven!',
      },
    ];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-sky-400" />
                <span>DNS Telemetry &amp; Resolution Flow &bull; Precursor to Attack Sockets</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                DNS queries precede socket connections. Correlating DNS answers with subsequent TCP flows proves domain attribution.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {dnsSteps.map((s) => (
                <button
                  key={s.step}
                  onClick={() => {
                    sound.playClick();
                    setDnsStep(s.step);
                  }}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
                    dnsStep === s.step
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Step {s.step}
                </button>
              ))}
            </div>
          </div>

          {/* Active DNS Step Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1 text-left">
              <span className="font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-400" />
                {dnsSteps[dnsStep - 1].title}
              </span>
              <p className="text-slate-300">{dnsSteps[dnsStep - 1].desc}</p>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
              DNS CORRELATED ✓
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
                        {node.id === 'dns-query-event' ? (
                          <Search className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'dns-answer-ip' ? (
                          <Network className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'dns-flow-stitch' ? (
                          <Workflow className="w-6 h-6 text-purple-400" />
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
  // 6. Payload Assumption Trap vs Verified Metadata (M08-U1-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm08-payload-assumption-trap') {
    const nodes = payloadAssumptionTrapNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-amber-400" />
                <span>Payload Assumption Trap &bull; Verified Metadata vs Speculation</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Meera: &quot;We do not manufacture certainty. State verified metadata precisely, and label payload content as unverified.&quot;
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setPayloadTrapView('fact');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  payloadTrapView === 'fact'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Disciplined Fact Statement
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setPayloadTrapView('trap');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  payloadTrapView === 'trap'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Novice Assumption Trap
              </button>
            </div>
          </div>

          {/* Payload Comparison Display */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs transition-all ${
              payloadTrapView === 'fact'
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="space-y-1 text-left">
              <span className="font-bold flex items-center gap-2">
                {payloadTrapView === 'fact' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                )}
                {payloadTrapView === 'fact'
                  ? 'VERIFIED STATEMENT: "TCP socket transferred 450,210 bytes to foreign IP 185.220.101.4. Payload is encrypted ciphertext."'
                  : 'FALLACY: "The adversary exfiltrated all confidential customer banking spreadsheets!" (Zero proof of file content)'}
              </span>
              <p className="text-slate-300">
                {payloadTrapView === 'fact'
                  ? 'Rigorous restraint preserves credibility in courtroom and executive reports.'
                  : 'Failing this test damages credibility. An encrypted transfer could be a benign browser download or software update.'}
              </p>
            </div>
            <Badge
              className={`font-mono text-xs ${
                payloadTrapView === 'fact'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}
            >
              {payloadTrapView === 'fact' ? 'FORENSIC RESTRAINT ✓' : 'UNSUPPORTED SPECULATION ❌'}
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
                        {node.id === 'trap-volume-fact' ? (
                          <Activity className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'trap-unverified-claim' ? (
                          <Ban className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'trap-metadata-proof' ? (
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
  // 7. Wireshark Tri-Pane Architecture & Inspection (M08-U2-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm08-wireshark-anatomy') {
    const nodes = wiresharkAnatomyNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const paneData = {
      list: {
        title: 'Top Pane: Packet List (Chronological Summary Table)',
        desc: 'Displays No., Time, Source IP, Destination IP, Protocol, Length, and Info columns. Fast skimming of conversation flow.',
      },
      details: {
        title: 'Middle Pane: Packet Details (Layered Protocol Tree)',
        desc: 'Collapsible protocol dissection tree: Frame -> Ethernet II -> IPv4 -> TCP -> Transport Layer Security.',
      },
      bytes: {
        title: 'Bottom Pane: Packet Bytes (Hexadecimal & ASCII Dump)',
        desc: 'Raw hexadecimal byte offsets and printable ASCII characters on the wire. Golden ground truth.',
      },
    };

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Monitor className="w-5 h-5 text-sky-400" />
                <span>Wireshark Tri-Pane Architecture &bull; List, Details &amp; Bytes</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Top List (conversation stream) &rarr; Middle Details (protocol tree) &rarr; Bottom Bytes (hexadecimal ground truth).
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {(['list', 'details', 'bytes'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    sound.playClick();
                    setWiresharkPane(p);
                  }}
                  className={`px-3 py-1 text-xs font-mono rounded-lg border uppercase transition-all ${
                    wiresharkPane === p
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {p} Pane
                </button>
              ))}
            </div>
          </div>

          {/* Active Pane Display Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1 text-left">
              <span className="font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-400" />
                {paneData[wiresharkPane].title}
              </span>
              <p className="text-slate-300">{paneData[wiresharkPane].desc}</p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs">
              WIRESHARK TRI-PANE
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
                        {node.id === 'wire-list-pane' ? (
                          <FileSpreadsheet className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'wire-details-pane' ? (
                          <Layers className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'wire-bytes-pane' ? (
                          <Binary className="w-6 h-6 text-purple-400" />
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
  // 8. Display Filter vs Capture Filter Mechanics (M08-U2-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm08-display-vs-capture-filter') {
    const nodes = displayVsCaptureFilterNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Filter className="w-5 h-5 text-sky-400" />
                <span>Display Filter vs Capture Filter Mechanics</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Capture filters (BPF) discard unmatching packets before saving to disk. Display filters hide packets non-destructively in UI.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setFilterMode('capture');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  filterMode === 'capture'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Capture Filter (BPF Pre-Buffer)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setFilterMode('display');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  filterMode === 'display'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Display Filter (Wireshark Post-Capture)
              </button>
            </div>
          </div>

          {/* Filter Comparison Display */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs transition-all ${
              filterMode === 'capture'
                ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
            }`}
          >
            <div className="space-y-1 text-left">
              <span className="font-bold flex items-center gap-2">
                {filterMode === 'capture' ? (
                  <Sliders className="w-4 h-4 text-amber-400" />
                ) : (
                  <Filter className="w-4 h-4 text-emerald-400" />
                )}
                {filterMode === 'capture'
                  ? 'BPF SYNTAX: "host 185.220.101.4 and port 8080" (Evaluated in kernel libpcap; unmatching packets discarded forever)'
                  : 'DISPLAY SYNTAX: "ip.addr == 185.220.101.4 && tcp.port == 8080" (Non-destructive UI view; all packets remain in PCAP)'}
              </span>
              <p className="text-slate-300">
                {filterMode === 'capture'
                  ? 'Warning: A mistake in a capture filter permanently blinds the investigation. No recovery possible.'
                  : 'Safe for triage: Removing the display filter immediately restores visibility of all 100,000 captured packets.'}
              </p>
            </div>
            <Badge
              className={`font-mono text-xs ${
                filterMode === 'capture'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}
            >
              {filterMode === 'capture' ? 'DESTRUCTIVE BPF' : 'NON-DESTRUCTIVE UI'}
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
                        {node.id === 'filt-capture-bpf' ? (
                          <Sliders className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'filt-display-post' ? (
                          <Filter className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'filt-syntax-pitfall' ? (
                          <AlertTriangle className="w-6 h-6 text-rose-400" />
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
  // 9. Reproducible Filter Notation & Packet Indexing (M08-U2-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm08-filter-reproducibility') {
    const nodes = filterReproducibilityNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-sky-400" />
                <span>Reproducible Filter Notation &bull; Packet Frame Indexing</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                A senior peer must be able to open the exact same PCAP, paste your filter, and land directly on frame #492.
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setReproMode(reproMode === 'reproducible' ? 'poor' : 'reproducible');
              }}
              className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                reproMode === 'reproducible'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
              }`}
            >
              {reproMode === 'reproducible' ? 'Mode: Reproducible Citation' : 'Mode: Vague Untraceable Note'}
            </button>
          </div>

          {/* Reproducibility Comparison Box */}
          <div
            className={`p-4 rounded-xl border flex flex-col gap-2 font-mono text-xs transition-all ${
              reproMode === 'reproducible'
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-2">
                {reproMode === 'reproducible' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                )}
                {reproMode === 'reproducible'
                  ? 'STANDARD CITATION: PCAP: capture-2026-10-15.pcap | Frame: #492 | Filter: "ip.addr == 185.220.101.4 && tcp.port == 8080"'
                  : 'VAGUE NOTE: "Look at the suspicious IP in Wireshark around 2:45 AM."'
                }
              </span>
              <Badge
                className={`font-mono text-[10px] ${
                  reproMode === 'reproducible'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                }`}
              >
                {reproMode === 'reproducible' ? 'COURT ADMISSIBLE ✓' : 'REJECTED IN TRIAGE ❌'}
              </Badge>
            </div>
            <div className="p-2 rounded bg-black/60 border border-slate-800 text-[11px] text-slate-300">
              {reproMode === 'reproducible'
                ? 'Senior responders replicate findings in seconds with zero ambiguity. Exact frame numbers eliminate guessing.'
                : 'A 500,000-packet capture file makes vague descriptions useless and wastes hours of investigative time.'}
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
                        {node.id === 'repro-packet-index' ? (
                          <Hash className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'repro-filter-syntax' ? (
                          <FileCode className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'repro-peer-test' ? (
                          <CheckCircle2 className="w-6 h-6 text-purple-400" />
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
  // 10. Port Scanning & Sweep Reconnaissance (M08-U2-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm08-port-scan-recon') {
    const nodes = portScanReconNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Crosshair className="w-5 h-5 text-amber-400" />
                <span>Port Scanning &amp; Sweep Reconnaissance &bull; TCP SYN Patterns</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                SYN packets arriving across sequential destination ports (21, 22, 80, 445, 3389) eliciting RST responses.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setScanType('malicious');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  scanType === 'malicious'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Adversary Reconnaissance (Unapproved)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setScanType('scheduled');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  scanType === 'scheduled'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Approved Vulnerability Scanner (Tenable)
              </button>
            </div>
          </div>

          {/* Port Scan Comparison Box */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs transition-all ${
              scanType === 'malicious'
                ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
            }`}
          >
            <div className="space-y-1 text-left">
              <span className="font-bold flex items-center gap-2">
                {scanType === 'malicious' ? (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
                {scanType === 'malicious'
                  ? 'SYN STEALTH SWEEP: 185.220.101.4 scanning 1,024 ports on BLR-BR-WS-04. Zero change notice.'
                  : 'SCHEDULED VULN SCAN: Nessus scanner 10.10.10.50 running authorized weekly scan ticket CHG-8920.'}
              </span>
              <p className="text-slate-300">
                {scanType === 'malicious'
                  ? 'Adversary mapping open network attack surface prior to exploit delivery. Escalate to firewall block.'
                  : 'Authorized baseline security scan. Document ticket reference and resolve without alarm.'}
              </p>
            </div>
            <Badge
              className={`font-mono text-xs ${
                scanType === 'malicious'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}
            >
              {scanType === 'malicious' ? 'ADVERSARIAL RECON 🚨' : 'AUTHORIZED SCAN ✓'}
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
                        {node.id === 'scan-syn-stealth' ? (
                          <Crosshair className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'scan-closed-rst' ? (
                          <Ban className="w-6 h-6 text-slate-400" />
                        ) : node.id === 'scan-open-synack' ? (
                          <AlertTriangle className="w-6 h-6 text-rose-400" />
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
  // 11. Periodic Beacon & Timing Interval Analysis (M08-U2-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm08-periodic-beacon-analysis') {
    const nodes = periodicBeaconAnalysisNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-400" />
                <span>Periodic Beacon &amp; Timing Interval Analysis &bull; Delta-T Metrics</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Calculating inter-arrival times (&Delta;t). Regular intervals indicate automated software scheduling (C2 heartbeat).
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {(['fixed', 'jitter', 'benign'] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => {
                    sound.playClick();
                    setBeaconPattern(b);
                  }}
                  className={`px-3 py-1 text-xs font-mono rounded-lg border uppercase transition-all ${
                    beaconPattern === b
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {b === 'fixed' ? 'Fixed (60s)' : b === 'jitter' ? 'Jitter (55-65s)' : 'Benign NTP'}
                </button>
              ))}
            </div>
          </div>

          {/* Beacon Interval Waveform Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col gap-2 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-sky-400" />
                TIMING PATTERN: {beaconPattern === 'fixed' ? 'Strict 60.0s &Delta;t (Standard deviation: 0.12s)' : beaconPattern === 'jitter' ? 'Randomized Jitter: 55s - 65s &Delta;t (Sleep 60s &plusmn; 10%)' : 'NTP Periodic Synchronization (Every 1,024s)'}
              </span>
              <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-[10px] font-mono">
                {beaconPattern === 'benign' ? 'LEGITIMATE PROTOCOL' : 'AUTOMATED C2 HEARTBEAT 🚨'}
              </Badge>
            </div>
            <div className="p-2.5 rounded-lg bg-black/60 border border-slate-800 flex items-center justify-between text-slate-300">
              <span>
                {beaconPattern === 'fixed'
                  ? '02:45:10Z &rarr; [60s] &rarr; 02:46:10Z &rarr; [60s] &rarr; 02:47:10Z &rarr; [60s] &rarr; 02:48:10Z'
                  : beaconPattern === 'jitter'
                  ? '02:45:10Z &rarr; [58s] &rarr; 02:46:08Z &rarr; [64s] &rarr; 02:47:12Z &rarr; [56s] &rarr; 02:48:08Z'
                  : '02:00:00Z &rarr; [1024s] &rarr; 02:17:04Z &rarr; [1024s] &rarr; 02:34:08Z (UDP Port 123)'}
              </span>
              <span className="text-emerald-400 font-bold">
                {beaconPattern === 'benign' ? 'CLEAN NETWORK' : 'COBALT STRIKE PROFILE'}
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
                        {node.id === 'beac-delta-t-calc' ? (
                          <Activity className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'beac-fixed-heartbeat' ? (
                          <Clock className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'beac-jitter-random' ? (
                          <Sliders className="w-6 h-6 text-purple-400" />
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
  // 12. Timing Attribution vs Intent Restraint (M08-U2-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm08-timing-attribution-doctrine') {
    const nodes = timingAttributionDoctrineNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" />
                <span>Timing Attribution Doctrine &bull; Programmed Automation vs Human Malice</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Meera: &quot;Timing regularity proves programmed automation. It does not prove malicious intent without corroborating payload context.&quot;
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setDoctrineMode('disciplined');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  doctrineMode === 'disciplined'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Disciplined Technical Note
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setDoctrineMode('dramatic');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  doctrineMode === 'dramatic'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Dramatic Presumption Trap
              </button>
            </div>
          </div>

          {/* Timing Attribution Comparison Banner */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs transition-all ${
              doctrineMode === 'disciplined'
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="space-y-1 text-left">
              <span className="font-bold flex items-center gap-2">
                {doctrineMode === 'disciplined' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                )}
                {doctrineMode === 'disciplined'
                  ? 'DISCIPLINED NOTE: "Endpoint exhibits programmed 60-second periodic outbound TCP connections to foreign IP."'
                  : 'DRAMATIC CLAIM: "The attacker is actively commanding the computer and stealing data every 60 seconds!"'}
              </span>
              <p className="text-slate-300">
                {doctrineMode === 'disciplined'
                  ? 'Accounts for benign software: Weather widgets, NTP sync, and cloud telemetry also run on timers.'
                  : 'Failing this test creates embarrassment if the "beacon" turns out to be an approved stock market ticker.'}
              </p>
            </div>
            <Badge
              className={`font-mono text-xs ${
                doctrineMode === 'disciplined'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}
            >
              {doctrineMode === 'disciplined' ? 'SCIENTIFIC RIGOR ✓' : 'UNVERIFIED PRESUMPTION ❌'}
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
                        {node.id === 'time-auto-schedule' ? (
                          <Clock className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'time-benign-software' ? (
                          <Activity className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'time-restraint-maxim' ? (
                          <FileText className="w-6 h-6 text-purple-400" />
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
  // 13. NAT/PAT Translation & Boundary Perspective (M08-U3-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm08-nat-pat-translation') {
    const nodes = natPatTranslationNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-sky-400" />
                <span>NAT/PAT Translation &bull; Inside Private vs Outside Public View</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Port Address Translation rewrites private IP 10.10.20.15:49152 to firewall public IP 203.0.113.5:10492.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setNatPerspective(natPerspective === 'inside' ? 'outside' : 'inside');
                }}
                className="px-3 py-1 text-xs font-mono rounded-lg border bg-sky-500/20 text-sky-300 border-sky-500/40 hover:bg-sky-500/30"
              >
                Perspective: {natPerspective === 'inside' ? 'Inside Segment (Pre-NAT)' : 'Outside Wire (Post-NAT)'}
              </button>
            </div>
          </div>

          {/* NAT Translation Visual Table */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-black/60 border border-emerald-500/40 text-center">
                <span className="text-[10px] text-emerald-400 block">INTERNAL CLIENT</span>
                <span className="text-sm font-bold text-white">10.10.20.15:49152</span>
              </div>
              <span className="text-slate-500 font-bold text-lg">&rarr; [NAT GATEWAY] &rarr;</span>
              <div className="p-3 rounded-lg bg-black/60 border border-sky-500/40 text-center">
                <span className="text-[10px] text-sky-400 block">PUBLIC PERIMETER</span>
                <span className="text-sm font-bold text-white">203.0.113.5:10492</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-slate-300 block">Destination Server:</span>
              <span className="text-[11px] font-mono text-amber-300">185.220.101.4:8080</span>
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
                        {node.id === 'nat-inside-private' ? (
                          <Laptop className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'nat-firewall-state' ? (
                          <Database className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'nat-outside-public' ? (
                          <Globe className="w-6 h-6 text-sky-400" />
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
  // 14. Forward Proxy & X-Forwarded-For Telemetry (M08-U3-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm08-proxy-header-chain') {
    const nodes = proxyHeaderChainNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Workflow className="w-5 h-5 text-sky-400" />
                <span>Forward Proxy &amp; X-Forwarded-For Telemetry Chain</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                A proxy terminates the client connection and opens a new socket to destination. True client IP is preserved in X-Forwarded-For.
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setProxyMode(proxyMode === 'proxy' ? 'direct' : 'proxy');
              }}
              className="px-3 py-1 text-xs font-mono rounded-lg border bg-sky-500/20 text-sky-300 border-sky-500/40 hover:bg-sky-500/30"
            >
              {proxyMode === 'proxy' ? 'View: Proxy Log (XFF: 10.10.20.15)' : 'View: Destination View (Proxy IP Only)'}
            </button>
          </div>

          {/* Proxy Header Banner */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1 text-left">
              <span className="font-bold text-white flex items-center gap-2">
                <FileCode className="w-4 h-4 text-sky-400" />
                HTTP HEADER: X-Forwarded-For: 10.10.20.15, 10.10.10.100 (Proxy Gateway)
              </span>
              <p className="text-slate-300">
                {proxyMode === 'proxy'
                  ? 'Internal forward proxy preserves original workstation IP in application headers.'
                  : 'Foreign web server only sees the proxy IP! Without proxy access logs, attribution is lost.'}
              </p>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
              ORIGINAL CLIENT PRESERVED ✓
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
                        {node.id === 'prx-client-socket' ? (
                          <Laptop className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'prx-termination-point' ? (
                          <Server className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'prx-xff-header' ? (
                          <FileCode className="w-6 h-6 text-sky-400" />
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
  // 15. Attribution Resolution & Missing Translation Gaps (M08-U3-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm08-attribution-resolution') {
    const nodes = attributionResolutionNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const attSteps = [
      {
        step: 1,
        title: 'Query Step 1: Firewall Public IP Alert',
        desc: 'External alert reports malicious egress from public IP 203.0.113.5 on port 10492.',
      },
      {
        step: 2,
        title: 'Query Step 2: NAT Translation Table Lookup',
        desc: 'Check state table: At 02:46:12Z, port 10492 was mapped to internal IP 10.10.20.15.',
      },
      {
        step: 3,
        title: 'Query Step 3: Handle Missing Translation Gaps Honestly',
        desc: 'If NAT table was overwritten: Mark internal endpoint as UNRESOLVED. Never invent an IP.',
      },
    ];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <span>Attribution Resolution &bull; Missing Translation Gaps</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Meera: &quot;If a translation log is missing, state that internal attribution cannot be determined rather than guessing.&quot;
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {attSteps.map((s) => (
                <button
                  key={s.step}
                  onClick={() => {
                    sound.playClick();
                    setAttributionStep(s.step);
                  }}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
                    attributionStep === s.step
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Step {s.step}
                </button>
              ))}
            </div>
          </div>

          {/* Active Attribution Resolution Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1 text-left">
              <span className="font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {attSteps[attributionStep - 1].title}
              </span>
              <p className="text-slate-300">{attSteps[attributionStep - 1].desc}</p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs">
              {attributionStep === 3 ? 'HONEST GAP LABELED' : 'RESOLUTION PIPELINE'}
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
                        {node.id === 'res-alert-public' ? (
                          <AlertTriangle className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'res-nat-lookup' ? (
                          <Search className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'res-missing-table-gap' ? (
                          <EyeOff className="w-6 h-6 text-rose-400" />
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
  // 16. Safe PCAP Object Handling & Carving Protocol (M08-U3-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm08-pcap-object-extraction') {
    const nodes = pcapObjectExtractionNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-emerald-400" />
                <span>Safe PCAP Object Handling &bull; File Carving Protocol</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Extracting objects from packet captures: NEVER double-click carved binaries on your analyst workstation!
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setIsCarvingIsolated(!isCarvingIsolated);
              }}
              className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                isCarvingIsolated
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
              }`}
            >
              {isCarvingIsolated ? 'Protocol: Air-Gapped Sandbox Active' : 'DANGEROUS: Local Execution Hazard'}
            </button>
          </div>

          {/* Safe Carving Banner */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs transition-all ${
              isCarvingIsolated
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="space-y-1 text-left">
              <span className="font-bold flex items-center gap-2">
                {isCarvingIsolated ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                )}
                {isCarvingIsolated
                  ? 'SAFE EXTRACTION: Carved binary payload.bin computed SHA-256 hash in isolated Linux VM.'
                  : 'FATAL ERROR: Opening carved attachments locally risks infecting SOC analyst workstations!'}
              </span>
              <p className="text-slate-300">
                SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855. Sent to sandbox detonation.
              </p>
            </div>
            <Badge
              className={`font-mono text-xs ${
                isCarvingIsolated
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}
            >
              {isCarvingIsolated ? 'SANDBOX CONTAINED ✓' : 'SELF-INFECTION RISK 🚨'}
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
                        {node.id === 'carv-extract-stream' ? (
                          <Download className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'carv-sandbox-isolate' ? (
                          <Box className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'carv-hash-first' ? (
                          <Hash className="w-6 h-6 text-purple-400" />
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
  // 17. Concise Evidence Distillation vs Packet Dump (M08-U3-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm08-concise-evidence-distillation') {
    const nodes = conciseEvidenceDistillationNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-400" />
                <span>Concise Evidence Distillation &bull; High-Signal Summary vs Packet Dump</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Meera: &quot;Never attach a 10 GB PCAP to an incident ticket and say &apos;see attached&apos;. Distill key packets, 5-tuples, and hashes.&quot;
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setDistillationMode('distilled');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  distillationMode === 'distilled'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Distilled Technical Summary
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setDistillationMode('dump');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  distillationMode === 'dump'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Raw 10 GB Dump Trap
              </button>
            </div>
          </div>

          {/* Distillation Comparison Box */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs transition-all ${
              distillationMode === 'distilled'
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="space-y-1 text-left">
              <span className="font-bold flex items-center gap-2">
                {distillationMode === 'distilled' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                )}
                {distillationMode === 'distilled'
                  ? 'HIGH-SIGNAL SUMMARY: Frame #492 | 10.10.20.15:49152 -> 185.220.101.4:8080 | 450 KB | Hash: e3b0c442...'
                  : 'RAW DUMP: "Attached is 10GB_capture.pcap. Please analyze." (Overwhelms escalation responders)'}
              </span>
              <p className="text-slate-300">
                {distillationMode === 'distilled'
                  ? 'Tier 2 analysts act immediately on your findings without re-doing the initial 2 hours of packet triage.'
                  : 'Dumping huge capture files delays response times and causes critical observables to be missed.'}
              </p>
            </div>
            <Badge
              className={`font-mono text-xs ${
                distillationMode === 'distilled'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}
            >
              {distillationMode === 'distilled' ? 'TIER 2 READY ✓' : 'UNACTIONABLE DUMP ❌'}
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
                        {node.id === 'dist-curated-summary' ? (
                          <FileText className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'dist-lazy-dump-trap' ? (
                          <Ban className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'dist-artifact-package' ? (
                          <Folder className="w-6 h-6 text-purple-400" />
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
  // 18. Network Evidence Dossier & Case Handoff (M08-U3-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm08-network-dossier-signoff') {
    const nodes = networkDossierSignoffNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-400" />
                <span>Network Evidence Dossier &bull; Case #2026-881 Meera Sign-Off</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Meera: &quot;Case #2026-881 now has corroborated host, identity, and network proof. The picture is coherent and defensible.&quot;
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
              {isDossierSigned ? 'Network Dossier Sealed: Meera Sign-Off' : 'Click to Sign & Seal Network Dossier'}
            </button>
          </div>

          {/* Dossier Milestone Banner */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                CASE #2026-881 NETWORK INVESTIGATION COMPLETE &bull; READY FOR EDR (M09)
              </span>
              <p className="text-xs text-slate-300">
                &quot;DNS resolution, 60s periodic C2 beaconing, NAT translation to Desk 04, and carved payload hash certified.&quot;
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
                {isDossierSigned ? 'MENTOR MEERA SIGNED & SEALED ✓' : 'AWAITING FINAL SUPERVISORY SEAL'}
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
                        {node.id === 'doss-network-artifacts' ? (
                          <Network className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'doss-pcap-hash-seal' ? (
                          <Hash className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'doss-handoff-package' ? (
                          <FileCheck className="w-6 h-6 text-purple-400" />
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
