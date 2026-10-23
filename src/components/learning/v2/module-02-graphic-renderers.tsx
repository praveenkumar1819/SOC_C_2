'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { sound } from '@/lib/sound-effects';
import {
  subnetCalculatorNodes,
  defaultGatewayNodes,
  natTranslationNodes,
  accessPointNodes,
  switchCamNodes,
  routerForwardingNodes,
  dhcpDoraNodes,
  dnsResolutionNodes,
  dnsTunnelingNodes,
  portDoorsNodes,
  tcpStateNodes,
  udpVsTcpNodes,
  smallBranchMapNodes,
  firewallRulesNodes,
  policyVsAppNodes,
  vlanSegmentationNodes,
  multiSwitchTrunkNodes,
  vlanBoundaryAuditNodes,
  VisualNodeItem,
} from './module-02-visual-stories';
import {
  Wifi,
  Network,
  Server,
  Monitor,
  Shield,
  Layers,
  ArrowRight,
  Lock,
  AlertTriangle,
  Activity,
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
  Filter,
  Smartphone,
  Laptop,
  Cable,
  Workflow,
  RadioTower,
  ShieldCheck,
  ShieldAlert,
  AlertCircle,
} from 'lucide-react';

interface Module02GraphicRendererProps {
  style: string;
  selectedNodeId: string;
  onSelectNode: (node: VisualNodeItem) => void;
  animStep: number;
}

export function Module02GraphicRenderer({
  style,
  selectedNodeId,
  onSelectNode,
  animStep,
}: Module02GraphicRendererProps) {
  // Interactive test states for Module 02 scenarios
  const [testIpMode, setTestIpMode] = useState<'local' | 'remote'>('local');
  const [gatewayStep, setGatewayStep] = useState<number>(0);
  const [natActiveSocket, setNatActiveSocket] = useState<number>(0);
  const [isRfTransmitting, setIsRfTransmitting] = useState<boolean>(true);
  const [activeCamPort, setActiveCamPort] = useState<number>(1);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [dhcpStep, setDhcpStep] = useState<number>(0);
  const [dnsCacheMode, setDnsCacheMode] = useState<'cached' | 'authoritative'>('cached');
  const [dnsSinkholeActive, setDnsSinkholeActive] = useState<boolean>(false);
  const [activePortDoor, setActivePortDoor] = useState<number>(443);
  const [tcpStateStep, setTcpStateStep] = useState<number>(1);
  const [isSynFloodActive, setIsSynFloodActive] = useState<boolean>(false);
  const [activeDuelProtocol, setActiveDuelProtocol] = useState<'tcp' | 'udp'>('tcp');
  const [testedFirewallPort, setTestedFirewallPort] = useState<number>(443);
  const [activeLayerInspection, setActiveLayerInspection] = useState<'both' | 'l4' | 'l7'>('both');
  const [selectedVlanZone, setSelectedVlanZone] = useState<number>(10);
  const [activeTrunkTag, setActiveTrunkTag] = useState<number>(10);
  const [isProbeBlocked, setIsProbeBlocked] = useState<boolean>(true);
  const [probeAttemptCount, setProbeAttemptCount] = useState<number>(3);

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
  // 1. Subnet Bit Slicer & Logical Boundary Engine (M02-U1-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm02-subnet-calculator') {
    const nodes = subnetCalculatorNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-sky-400" />
                <span>Subnet Bit Slicer: Network Prefix vs Host ID (/24)</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Understanding how subnet masks define broadcast domains and determine local vs gateway routing.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setTestIpMode('local');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  testIpMode === 'local'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Test Local: 10.10.20.50
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setTestIpMode('remote');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  testIpMode === 'remote'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Test Remote: 10.10.10.5
              </button>
            </div>
          </div>

          {/* 4 Interactive Node Cards */}
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
                      {node.id === 'sub-netbits' && <Network className="w-6 h-6" />}
                      {node.id === 'sub-hostbits' && <Monitor className="w-6 h-6" />}
                      {node.id === 'sub-mask' && <Sliders className="w-6 h-6" />}
                      {node.id === 'sub-bcast' && <Radio className="w-6 h-6" />}
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

          {/* Slicer Octet HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="font-bold text-sky-300">WORKSTATION IP: 10.10.20.15 /24</span>
              <span className="text-emerald-400 font-bold">SUBNET MASK: 255.255.255.0</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center font-mono">
              <div className="p-2.5 rounded-lg bg-sky-950/60 border border-sky-600/40">
                <div className="text-xl font-black text-sky-300">10</div>
                <div className="text-xs text-slate-400">00001010</div>
                <div className="text-[11px] font-bold text-sky-400 pt-1">NETWORK BIT</div>
              </div>
              <div className="p-2.5 rounded-lg bg-sky-950/60 border border-sky-600/40">
                <div className="text-xl font-black text-sky-300">10</div>
                <div className="text-xs text-slate-400">00001010</div>
                <div className="text-[11px] font-bold text-sky-400 pt-1">NETWORK BIT</div>
              </div>
              <div className="p-2.5 rounded-lg bg-sky-950/60 border border-sky-600/40">
                <div className="text-xl font-black text-sky-300">20</div>
                <div className="text-xs text-slate-400">00010100</div>
                <div className="text-[11px] font-bold text-sky-400 pt-1">NETWORK BIT</div>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-600/40">
                <div className="text-xl font-black text-emerald-300">15</div>
                <div className="text-xs text-slate-400">00001111</div>
                <div className="text-[11px] font-bold text-emerald-400 pt-1">HOST ID (8 BITS)</div>
              </div>
            </div>

            {/* Dynamic Routing Decision Banner */}
            <div
              className={`p-3.5 rounded-xl border text-xs sm:text-sm leading-relaxed transition-all ${
                testIpMode === 'local'
                  ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
                  : 'bg-amber-950/50 border-amber-500/50 text-amber-200'
              }`}
            >
              <div className="font-bold flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-current animate-pulse" />
                  Target Destination: {testIpMode === 'local' ? '10.10.20.50 (Branch Printer)' : '10.10.10.5 (Core Finance Portal)'}
                </span>
                <Badge className={testIpMode === 'local' ? 'bg-emerald-500 text-slate-950' : 'bg-amber-500 text-slate-950'}>
                  {testIpMode === 'local' ? 'LOCAL BROADCAST DOMAIN' : 'BORDER GATEWAY REQUIRED'}
                </Badge>
              </div>
              <p className="text-xs pt-1.5 text-slate-300">
                {testIpMode === 'local'
                  ? 'Bitwise AND calculation matches: 10.10.20.50 is inside 10.10.20.0/24. Workstation broadcasts an ARP request on the local switch to find the target MAC directly without consulting the router.'
                  : 'Network prefix mismatch detected: 10.10.10.0 != 10.10.20.0. The packet cannot be delivered locally; the workstation addresses the Layer 2 Ethernet frame to the Default Gateway MAC (10.10.20.1).'}
              </p>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 2. Default Gateway Border Crossing (M02-U1-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm02-default-gateway') {
    const nodes = defaultGatewayNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-sky-400" />
                <span>Default Gateway: The Border Crossing Between Subnets</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                How workstations cross logical boundaries to reach remote enterprise services and the internet.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setGatewayStep((prev) => (prev + 1) % 3);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white border border-sky-400 transition-all flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Advance Packet Step ({gatewayStep + 1}/3)</span>
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
                      {node.id === 'gw-host' && <Laptop className="w-6 h-6" />}
                      {node.id === 'gw-router' && <Shield className="w-6 h-6" />}
                      {node.id === 'gw-routing' && <Workflow className="w-6 h-6" />}
                      {node.id === 'gw-dest' && <Server className="w-6 h-6" />}
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

          {/* Border Crossing Visualizer */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">PACKET CROSSING STAGE:</span>
              <span className="text-sky-300 font-bold">
                {gatewayStep === 0 && 'STEP 1: Workstation encapsulates packet with Gateway MAC'}
                {gatewayStep === 1 && 'STEP 2: Router decrements TTL (64 -> 63) & checks routing table'}
                {gatewayStep === 2 && 'STEP 3: Packet traverses corporate WAN to Core Finance Portal'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div
                className={`p-3 rounded-lg border transition-all ${
                  gatewayStep === 0 ? 'bg-sky-950/80 border-sky-400 ring-1 ring-sky-500/50' : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Laptop className="w-4 h-4 text-sky-400" />
                  <span>BLR-BR-WS-04 (10.10.20.15)</span>
                </div>
                <p className="text-slate-300 text-xs mt-1">
                  Destination IP 10.10.10.5 is non-local. Host sets Destination MAC to Router Eth0 (00:09:0F:...).
                </p>
                <div className="mt-2 text-[11px] font-mono text-sky-300">Src IP: 10.10.20.15 • Dst IP: 10.10.10.5</div>
              </div>

              <div
                className={`p-3 rounded-lg border transition-all ${
                  gatewayStep === 1 ? 'bg-sky-950/80 border-sky-400 ring-1 ring-sky-500/50' : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Gateway Router (10.10.20.1)</span>
                </div>
                <p className="text-slate-300 text-xs mt-1">
                  Strips incoming L2 frame, decrements TTL to 63 to prevent loops, and selects WAN egress interface.
                </p>
                <div className="mt-2 text-[11px] font-mono text-emerald-300">TTL: 64 → 63 • Checksum Recalculated</div>
              </div>

              <div
                className={`p-3 rounded-lg border transition-all ${
                  gatewayStep === 2 ? 'bg-sky-950/80 border-sky-400 ring-1 ring-sky-500/50' : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Server className="w-4 h-4 text-purple-400" />
                  <span>Core Portal (10.10.10.5)</span>
                </div>
                <p className="text-slate-300 text-xs mt-1">
                  Server receives packet across WAN link, processes request, and replies back via the reverse path.
                </p>
                <div className="mt-2 text-[11px] font-mono text-purple-300">Port 443 Handshake Active</div>
              </div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 3. Stateful NAT Translation & Ephemeral Identity (M02-U1-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm02-nat-translation') {
    const nodes = natTranslationNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const natEntries = [
      { id: 0, internal: '10.10.20.15:49152', publicSocket: '203.0.113.50:52110', remote: '93.184.216.34:443', service: 'HTTPS Cloud App' },
      { id: 1, internal: '10.10.20.15:49153', publicSocket: '203.0.113.50:52111', remote: '8.8.8.8:53', service: 'DNS Query' },
      { id: 2, internal: '10.10.20.88:51200', publicSocket: '203.0.113.50:52112', remote: '13.107.42.14:443', service: 'Staff Email Sync' },
    ];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-400" />
                <span>Stateful NAT Translation & The Ephemeral Identity Truth</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Inside local RFC 1918 sockets mapped to public IPs, and why an IP is a temporary locator in time.
              </p>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-mono text-xs">
              PAT ACTIVE (PORT TRANSLATION)
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
                      {node.id === 'nat-private' && <Laptop className="w-6 h-6" />}
                      {node.id === 'nat-table' && <Database className="w-6 h-6" />}
                      {node.id === 'nat-public' && <Globe className="w-6 h-6" />}
                      {node.id === 'nat-ephemeral' && <ShieldAlert className="w-6 h-6" />}
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

          {/* Interactive NAT State Table */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 font-bold">ACTIVE NAT TRANSLATION TABLE (ROUTER MEMORY)</span>
              <span className="text-sky-300">Click a socket row to inspect translation</span>
            </div>

            <div className="space-y-1.5 font-mono text-xs">
              {natEntries.map((entry) => {
                const isActive = natActiveSocket === entry.id;
                return (
                  <div
                    key={entry.id}
                    onClick={() => {
                      sound.playClick();
                      setNatActiveSocket(entry.id);
                    }}
                    className={`p-2.5 rounded-lg border transition-all cursor-pointer flex flex-wrap items-center justify-between gap-2 ${
                      isActive
                        ? 'bg-sky-950/80 border-sky-400 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">{entry.internal}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
                      <span className="text-sky-300 font-bold">{entry.publicSocket}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-purple-300">Target: {entry.remote}</span>
                      <Badge className="bg-slate-800 text-slate-300 text-[10px]">{entry.service}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mentor Ravi Callout Banner */}
            <div className="p-3 rounded-lg bg-[#081533] border border-sky-500/30 text-xs sm:text-sm text-sky-200 flex items-start gap-2.5">
              <UserCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-bold">Mentor Ravi&apos;s Identity Doctrine: </strong>
                &ldquo;An IP address is an ephemeral network locator in context, not a person&apos;s name. In the morning, 10.10.20.15 belonged to Priya; in the afternoon, DHCP may lease it to a guest contractor. Always verify timestamped DHCP lease and NAT state logs before assigning intent.&rdquo;
              </div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 4. Wireless AP & Frame Encapsulation (M02-U1-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm02-access-point') {
    const nodes = accessPointNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Wifi className="w-5 h-5 text-sky-400" />
                <span>Access Point Bridge: 802.11 Airwaves to 802.3 Copper</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Converting radio frequency frames into physical wired Ethernet packets across the branch ceiling.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsRfTransmitting(!isRfTransmitting);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                isRfTransmitting
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {isRfTransmitting ? 'RF AIRWAVES ACTIVE' : 'AIRWAVES PAUSED'}
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
                      {node.id === 'ap-client' && <Laptop className="w-6 h-6" />}
                      {node.id === 'ap-rf' && <Radio className="w-6 h-6" />}
                      {node.id === 'ap-bridge' && <Wifi className="w-6 h-6" />}
                      {node.id === 'ap-uplink' && <Cable className="w-6 h-6" />}
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

          {/* Bridging Transformation Pipeline */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isRfTransmitting ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                <span>Protocol Decapsulation Pipeline:</span>
              </span>
              <span className="text-sky-300 font-bold">WPA3 AES-GCM → 802.3 MAC FRAME</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <div className="font-bold text-sky-300">1. Laptop Wi-Fi NIC</div>
                <p className="text-slate-300 text-xs mt-1">
                  802.11ax radio modulates IP data onto 5 GHz Channel 36, protected with WPA3 session encryption keys.
                </p>
                <div className="mt-2 text-[11px] font-mono text-slate-400">Radio Header: 32 Bytes</div>
              </div>

              <div className="p-3 rounded-lg bg-sky-950/50 border border-sky-500/40">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>2. Access Point Bridge (AP-01)</span>
                  <Badge className="bg-sky-500/20 text-sky-300 text-[10px]">CONVERTER</Badge>
                </div>
                <p className="text-slate-300 text-xs mt-1">
                  Strips 802.11 wireless headers, verifies frame integrity, and constructs standard 802.3 Ethernet frame.
                </p>
                <div className="mt-2 text-[11px] font-mono text-sky-300">Header Conversion: 802.11 → 802.3</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <div className="font-bold text-emerald-300">3. Cat6 Copper Uplink</div>
                <p className="text-slate-300 text-xs mt-1">
                  Transmits raw Ethernet copper pulses into Access Switch Port 24, powered concurrently by PoE 802.3at.
                </p>
                <div className="mt-2 text-[11px] font-mono text-emerald-400">1000BASE-T • 1 Gbps Full Duplex</div>
              </div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 5. Layer 2 Switch CAM Table & Port Security (M02-U1-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm02-switch-cam') {
    const nodes = switchCamNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const camTableRows = [
      { port: 1, mac: '00:1A:2B:3C:4D:5E', device: 'BLR-BR-WS-04 (Priya)', type: 'Dynamic', age: '14s' },
      { port: 4, mac: '00:5E:6F:7A:8B:9C', device: 'Branch Finance Server', type: 'Static', age: '0s' },
      { port: 12, mac: '00:22:44:66:88:AA', device: 'Network Laser Printer', type: 'Dynamic', age: '120s' },
      { port: 24, mac: '00:E0:4C:11:22:33', device: 'Ceiling Access Point (AP-01)', type: 'Dynamic', age: '4s' },
    ];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-sky-400" />
                <span>Layer 2 Switch CAM Table & Hardware Forwarding</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                How switches learn source MACs on ingress and unicast directly to egress ports to prevent eavesdropping.
              </p>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-mono text-xs">
              PORT SECURITY: VIOLATION RESTRICT
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
                      {node.id === 'cam-port1' && <Laptop className="w-6 h-6" />}
                      {node.id === 'cam-table' && <Database className="w-6 h-6" />}
                      {node.id === 'cam-port4' && <Server className="w-6 h-6" />}
                      {node.id === 'cam-flooding' && <ShieldAlert className="w-6 h-6" />}
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

          {/* Switch CAM Table HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-400">SWITCH HARDWARE CAM MEMORY (BLR-SW-01)</span>
              <span className="text-emerald-400 font-bold">AGING TIMER: 300 SECONDS</span>
            </div>

            <div className="space-y-1.5 font-mono text-xs">
              {camTableRows.map((row) => (
                <div
                  key={row.port}
                  onClick={() => {
                    sound.playClick();
                    setActiveCamPort(row.port);
                  }}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer flex flex-wrap items-center justify-between gap-2 ${
                    activeCamPort === row.port
                      ? 'bg-sky-950/80 border-sky-400 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Badge className={activeCamPort === row.port ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-sky-400'}>
                      PORT {row.port}
                    </Badge>
                    <span className="font-bold text-sky-300">{row.mac}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-300">{row.device}</span>
                    <span className="text-emerald-400">{row.type}</span>
                    <span className="text-slate-500">Age: {row.age}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Port Security Baseline: Maximum 2 MAC addresses allowed per physical cubicle port.</span>
              </span>
              <span className="font-mono text-emerald-300">Protects against CAM Table Overflow Attacks</span>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 6. Layer 3 Router Forwarding Pipeline (M02-U1-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm02-router-forwarding') {
    const nodes = routerForwardingNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const pipelineStages = [
      { step: 0, title: '1. Frame Ingress (Eth0)', desc: 'Router receives Ethernet frame, verifies FCS checksum, and strips Layer 2 MAC header.' },
      { step: 1, title: '2. Route Lookup', desc: 'Evaluates Destination IP 10.10.10.5 against routing table. Longest prefix match: 10.10.0.0/16 via WAN.' },
      { step: 2, title: '3. TTL Decrement', desc: 'Subtracts 1 from TTL (64 -> 63) to prevent routing loops. Recalculates IPv4 header checksum.' },
      { step: 3, title: '4. Frame Egress (Eth1)', desc: 'Encapsulates packet in new Layer 2 WAN frame with Next-Hop MAC and transmits onto fiber uplink.' },
    ];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Workflow className="w-5 h-5 text-sky-400" />
                <span>Layer 3 Router Forwarding: The 4-Stage Hardware Pipeline</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Decapsulation, longest-prefix route matching, loop defense (TTL decrement), and re-encapsulation.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setPipelineStep((prev) => (prev + 1) % 4);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white border border-sky-400 transition-all flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Step Pipeline ({pipelineStep + 1}/4)</span>
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
                      {node.id === 'rtr-ingress' && <Cable className="w-6 h-6" />}
                      {node.id === 'rtr-table' && <Database className="w-6 h-6" />}
                      {node.id === 'rtr-ttl' && <Clock className="w-6 h-6" />}
                      {node.id === 'rtr-egress' && <ArrowRight className="w-6 h-6" />}
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

          {/* Router Pipeline Step HUD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
            {pipelineStages.map((st) => (
              <div
                key={st.step}
                onClick={() => {
                  sound.playClick();
                  setPipelineStep(st.step);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  pipelineStep === st.step
                    ? 'bg-sky-950/80 border-sky-400 ring-1 ring-sky-500/50 shadow-md'
                    : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>{st.title}</span>
                  {pipelineStep === st.step && <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />}
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
  // 7. DHCP 4-Step DORA Handshake (M02-U2-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm02-dhcp-dora') {
    const nodes = dhcpDoraNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const doraSteps = [
      { step: 0, code: 'DISCOVER', proto: 'UDP 67 Broadcast', desc: 'Client sends: "Is there any DHCP server on this LAN? I need an IP address!"' },
      { step: 1, code: 'OFFER', proto: 'UDP 68 Unicast', desc: 'Server replies: "I have 10.10.20.15 available with mask /24 and gateway 10.10.20.1."' },
      { step: 2, code: 'REQUEST', proto: 'UDP 67 Broadcast', desc: 'Client responds: "I accept 10.10.20.15 offered by server 10.10.10.5!"' },
      { step: 3, code: 'ACK', proto: 'UDP 68 Unicast', desc: 'Server commits: "Lease granted for 8 hours. Recorded in DHCP database."' },
    ];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <RadioTower className="w-5 h-5 text-sky-400" />
                <span>DHCP 4-Step DORA Handshake & Lease Engine</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Discover, Offer, Request, and Acknowledge: the four packets that configure a device upon network arrival.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setDhcpStep((prev) => (prev + 1) % 4);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white border border-sky-400 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Step DORA Handshake ({dhcpStep + 1}/4)</span>
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
                      {node.id === 'dhcp-discover' && <Radio className="w-6 h-6" />}
                      {node.id === 'dhcp-offer' && <Share2 className="w-6 h-6" />}
                      {node.id === 'dhcp-request' && <CheckCircle2 className="w-6 h-6" />}
                      {node.id === 'dhcp-ack' && <ShieldCheck className="w-6 h-6" />}
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

          {/* DORA Interactive Stepper Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
            {doraSteps.map((st) => (
              <div
                key={st.step}
                onClick={() => {
                  sound.playClick();
                  setDhcpStep(st.step);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  dhcpStep === st.step
                    ? 'bg-sky-950/80 border-sky-400 ring-1 ring-sky-500/50 shadow-md'
                    : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>{st.code}</span>
                  <Badge variant="outline" className="text-[9px] font-mono border-sky-500/30 text-sky-300">
                    {st.proto}
                  </Badge>
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
  // 8. Recursive DNS Resolution Pipeline (M02-U2-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm02-dns-resolution') {
    const nodes = dnsResolutionNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Server className="w-5 h-5 text-sky-400" />
                <span>Recursive DNS Resolution: Domain Name to IP Pipeline</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                How browsers translate human-friendly domains (portal.cdac.local) into numerical socket endpoints.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setDnsCacheMode('cached');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  dnsCacheMode === 'cached'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Cache Hit (1 ms)
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setDnsCacheMode('authoritative');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  dnsCacheMode === 'authoritative'
                    ? 'bg-sky-500 text-slate-950 border-sky-400'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Full Resolution (14 ms)
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
                      {node.id === 'dns-client' && <Laptop className="w-6 h-6" />}
                      {node.id === 'dns-resolver' && <Server className="w-6 h-6" />}
                      {node.id === 'dns-authoritative' && <Database className="w-6 h-6" />}
                      {node.id === 'dns-record' && <CheckCircle2 className="w-6 h-6" />}
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

          {/* DNS Resolution Flow Banner */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">QUERY: portal.cdac.local (RECORD TYPE: A)</span>
              <span className="text-emerald-400 font-bold">
                {dnsCacheMode === 'cached' ? 'SERVED FROM RESOLVER MEMORY CACHE' : 'RECURSIVE QUERY TO MASTER ZONE'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-300 flex-wrap gap-2">
              <span className="text-sky-300 font-bold">Client: BLR-BR-WS-04</span>
              <ArrowRight className="w-4 h-4 text-sky-400" />
              <span>Resolver: 10.10.10.5 (UDP 53)</span>
              <ArrowRight className="w-4 h-4 text-sky-400" />
              <span className="text-emerald-300 font-bold">A-Record: 10.10.10.25 (TTL 3600s)</span>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 9. DNS Exfiltration & Tunneling Anomaly Detector (M02-U2-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm02-dns-tunneling') {
    const nodes = dnsTunnelingNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span>DNS Tunneling & Data Smuggling Detector (MITRE T1071.004)</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Comparing benign human queries against high-entropy encrypted data exfiltration inside DNS subdomains.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setDnsSinkholeActive(!dnsSinkholeActive);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                dnsSinkholeActive
                  ? 'bg-rose-600 text-white border-rose-400 shadow-md animate-pulse'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              {dnsSinkholeActive ? 'DNS SINKHOLE ACTIVE: 127.0.0.1' : 'ARM DNS SINKHOLE'}
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
                      {node.id === 'dns-benign' && <Check className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'dns-tunnel' && <AlertTriangle className="w-6 h-6 text-rose-400" />}
                      {node.id === 'dns-entropy' && <Activity className="w-6 h-6 text-amber-400" />}
                      {node.id === 'dns-sinkhole' && <ShieldAlert className="w-6 h-6 text-purple-400" />}
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

          {/* Entropy & Tunneling Comparison HUD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-1.5">
              <div className="flex items-center justify-between text-emerald-300 font-bold">
                <span>BENIGN QUERY: finance.cdac.local</span>
                <Badge className="bg-emerald-500/20 text-emerald-300 text-[10px]">NORMAL</Badge>
              </div>
              <p className="text-slate-300 text-xs">Length: 18 chars • Shannon Entropy: 2.1 / 5.0 (Low Randomness)</p>
              <div className="text-[11px] text-slate-400">Standard business domain name resolution. Clean signal.</div>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/50 space-y-1.5">
              <div className="flex items-center justify-between text-rose-300 font-bold">
                <span>MALICIOUS TUNNEL: a7b9c1d09e...c2.attacker.com</span>
                <Badge className="bg-rose-500 text-white text-[10px]">ALERT SEV-1</Badge>
              </div>
              <p className="text-slate-200 text-xs">Length: 68 chars • Shannon Entropy: 4.85 / 5.0 (High Entropy ⚠️)</p>
              <div className="text-[11px] text-rose-300">
                {dnsSinkholeActive ? 'QUARANTINED: Inbound C2 resolved to 127.0.0.1' : 'Encrypted exfiltration detected passing through firewall'}
              </div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 10. Well-Known Port Doors & Traffic Reality (M02-U2-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm02-port-doors') {
    const nodes = portDoorsNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-sky-400" />
                <span>Well-Known Port Doors & Traffic Reality: Port != Safety Verdict</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Why standard port assignments identify protocols, but never guarantee the communication is benign.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {[22, 53, 80, 443].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActivePortDoor(p);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold border transition-all ${
                    activePortDoor === p
                      ? 'bg-sky-500 text-slate-950 border-sky-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Port {p}
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
                      {node.id === 'door-22' && <Terminal className="w-6 h-6" />}
                      {node.id === 'door-53' && <Server className="w-6 h-6" />}
                      {node.id === 'door-80' && <Globe className="w-6 h-6" />}
                      {node.id === 'door-443' && <Lock className="w-6 h-6" />}
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

          {/* Port Door Diagnostic Card */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-sky-300">SELECTED DOOR: PORT {activePortDoor}</span>
              <span className="text-slate-400">
                {activePortDoor === 22 && 'SSH (Secure Shell Management)'}
                {activePortDoor === 53 && 'DNS (Domain Name Resolution)'}
                {activePortDoor === 80 && 'HTTP (Plaintext Web - Credentials at risk)'}
                {activePortDoor === 443 && 'HTTPS (TLS Encrypted Web)'}
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-[#061226] border border-sky-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed">
              <strong className="text-amber-300">Mentor Ravi&apos;s Core Triage Rule: </strong>
              &ldquo;Does seeing Port 443 mean the traffic is safe? No! Port 443 proves cryptographic encryption, not innocence. Modern adversaries tunnel C2 beacons and ransomware telemetry over 443 specifically to blend into normal browser traffic. Inspect certificate chains, SNI domain names, and beaconing periodicity before deciding.&rdquo;
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 11. TCP State Machine & SYN Flood (M02-U2-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm02-tcp-state') {
    const nodes = tcpStateNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-sky-400" />
                <span>TCP State Machine & Handshake: Full Duplex vs SYN Flood</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                SYN, SYN-ACK, ACK, and ESTABLISHED: tracking connection state to spot DoS resource exhaustion.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsSynFloodActive(!isSynFloodActive);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                isSynFloodActive
                  ? 'bg-rose-600 text-white border-rose-400 animate-pulse'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              {isSynFloodActive ? 'SYN FLOOD SIMULATION ACTIVE ⚠️' : 'SIMULATE SYN FLOOD'}
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
                      {node.id === 'tcp-synsent' && <Play className="w-6 h-6" />}
                      {node.id === 'tcp-established' && <CheckCircle2 className="w-6 h-6" />}
                      {node.id === 'tcp-fin' && <Pause className="w-6 h-6" />}
                      {node.id === 'tcp-synflood' && <AlertTriangle className="w-6 h-6" />}
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

          {/* Connection Backlog HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">SERVER TCP CONNECTION QUEUE (BACKLOG)</span>
              <span className={isSynFloodActive ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                {isSynFloodActive ? 'BACKLOG EXHAUSTED (128/128 HALF-OPEN CONNECTIONS)' : 'HEALTHY QUEUE (2/128 CONNECTIONS)'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-sky-300 font-bold">1. Client SYN (Seq=100)</div>
                <div className="text-[11px] text-slate-400 mt-1">Client allocates socket memory and begins timer.</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-sky-300 font-bold">2. Server SYN-ACK (Seq=300, Ack=101)</div>
                <div className="text-[11px] text-slate-400 mt-1">Server acknowledges and reserves connection slot.</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-emerald-400 font-bold">3. Client ACK (Ack=301)</div>
                <div className="text-[11px] text-slate-400 mt-1">Handshake complete. State shifts to ESTABLISHED.</div>
              </div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 12. Protocol Duel: TCP vs UDP (M02-U2-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm02-udp-vs-tcp') {
    const nodes = udpVsTcpNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-sky-400" />
                <span>Protocol Duel: TCP Reliable Stream vs UDP Datagrams</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Comparing connection-oriented guaranteed delivery against connectionless high-speed datagrams.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveDuelProtocol('tcp');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  activeDuelProtocol === 'tcp'
                    ? 'bg-sky-500 text-slate-950 border-sky-400'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Inspect TCP Lane
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveDuelProtocol('udp');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  activeDuelProtocol === 'udp'
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Inspect UDP Lane
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
                      {node.id === 'race-tcp' && <ShieldCheck className="w-6 h-6" />}
                      {node.id === 'race-retrans' && <RotateCcw className="w-6 h-6" />}
                      {node.id === 'race-udp' && <Zap className="w-6 h-6" />}
                      {node.id === 'race-usecase' && <FileSpreadsheet className="w-6 h-6" />}
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

          {/* Side-by-Side Comparison Lanes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 font-mono text-xs">
            <div
              className={`p-4 rounded-xl border space-y-2 transition-all ${
                activeDuelProtocol === 'tcp' ? 'bg-sky-950/60 border-sky-400 shadow-md' : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-sky-300 font-bold">
                <span>TCP (Transmission Control Protocol)</span>
                <Badge className="bg-sky-500/20 text-sky-300 text-[10px]">GUARANTEED</Badge>
              </div>
              <p className="text-slate-300 text-xs">
                Packets are sequenced and acknowledged. If packet #2 is dropped in transit, the sender automatically retransmits until delivered safely.
              </p>
              <div className="text-[11px] text-emerald-300 font-bold">Best for: Financial Reports, SSH, Database Sync</div>
            </div>

            <div
              className={`p-4 rounded-xl border space-y-2 transition-all ${
                activeDuelProtocol === 'udp' ? 'bg-amber-950/60 border-amber-400 shadow-md' : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-amber-300 font-bold">
                <span>UDP (User Datagram Protocol)</span>
                <Badge className="bg-amber-500/20 text-amber-300 text-[10px]">LOW LATENCY</Badge>
              </div>
              <p className="text-slate-300 text-xs">
                Connectionless fire-and-forget. Zero handshake overhead. If a frame drops, playback moves on immediately without stalling the stream.
              </p>
              <div className="text-[11px] text-amber-300 font-bold">Best for: Live Video Calls, Online Audio, DNS Lookups</div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 13. Small Branch Network Topology HUD (M02-U3-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm02-small-branch-map') {
    const nodes = smallBranchMapNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Boxes className="w-5 h-5 text-sky-400" />
                <span>Small Branch Network Topology HUD (Bengaluru Branch)</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Mapping physical cubicles, access switches, perimeter firewalls, and shared branch server resources.
              </p>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-mono text-xs">
              TOPOLOGY HEALTH: 100% OPERATIONAL
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
                      {node.id === 'br-workstation' && <Laptop className="w-6 h-6" />}
                      {node.id === 'br-switch' && <Cpu className="w-6 h-6" />}
                      {node.id === 'br-firewall' && <Shield className="w-6 h-6" />}
                      {node.id === 'br-server' && <Server className="w-6 h-6" />}
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

          {/* Interactive Topology Diagram Banner */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">BRANCH OFFICE HARDWARE INTERCONNECT</span>
              <span className="text-sky-300">LAN Speed: 1.0 Gbps • WAN IPsec: Active</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-300 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Laptop className="w-4 h-4 text-sky-400" />
                <span className="text-white font-bold">BLR-BR-WS-04 (10.10.20.15)</span>
              </div>
              <ArrowRight className="w-4 h-4 text-sky-400" />
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Switch BLR-SW-01 (Port 1)</span>
              </div>
              <ArrowRight className="w-4 h-4 text-sky-400" />
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-400" />
                <span>Firewall BLR-FW-01 (10.10.20.1)</span>
              </div>
              <ArrowRight className="w-4 h-4 text-sky-400" />
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-amber-400" />
                <span className="text-amber-300 font-bold">File Server (10.10.20.100)</span>
              </div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 14. Stateful Firewall Rules & 5-Tuple Policies (M02-U3-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm02-firewall-rules') {
    const nodes = firewallRulesNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-sky-400" />
                <span>Stateful Firewall Inspection & 5-Tuple Policy Rules</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Evaluating source IP, dest IP, source port, dest port, and protocol to enforce explicit permits and default deny.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setTestedFirewallPort(443);
                }}
                className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                  testedFirewallPort === 443
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Test Port 443 (HTTPS)
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setTestedFirewallPort(22);
                }}
                className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                  testedFirewallPort === 22
                    ? 'bg-rose-600 text-white border-rose-400'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Test Port 22 (SSH)
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
                      {node.id === 'fw-rule1' && <Check className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'fw-rule2' && <Globe className="w-6 h-6 text-sky-400" />}
                      {node.id === 'fw-rule99' && <AlertOctagon className="w-6 h-6 text-rose-400" />}
                      {node.id === 'fw-log' && <FileText className="w-6 h-6 text-purple-400" />}
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

          {/* Firewall Policy Table HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">ACTIVE PERIMETER FIREWALL ACCESS CONTROL LIST</span>
              <span className="text-sky-300">TEST TRAFFIC: PORT {testedFirewallPort}</span>
            </div>

            <div className="space-y-1.5">
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between">
                <span>Rule 101: 10.10.20.0/24 → 10.10.20.100:443 (TCP)</span>
                <Badge className="bg-emerald-500 text-slate-950 text-[10px]">ALLOW (MATCH: 1,420)</Badge>
              </div>
              <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/40 flex items-center justify-between">
                <span>Rule 102: 10.10.20.0/24 → 10.10.10.5:53 (UDP)</span>
                <Badge className="bg-sky-500 text-slate-950 text-[10px]">ALLOW (MATCH: 8,304)</Badge>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/40 flex items-center justify-between">
                <span>Rule 999: ANY → ANY (ALL PORTS)</span>
                <Badge className="bg-rose-500 text-white text-[10px]">DEFAULT DENY DROP &amp; LOG</Badge>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
              {testedFirewallPort === 443 ? (
                <span className="text-emerald-300 font-bold">
                  ✓ VERDICT: Port 443 matched Rule 101. TCP connection permitted and recorded in state table.
                </span>
              ) : (
                <span className="text-rose-300 font-bold">
                  ✕ VERDICT: Port 22 matched Rule 999 (Default Deny). Connection dropped and alerted to SIEM.
                </span>
              )}
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 15. Network Policy vs Application Layer Filtering (M02-U3-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm02-policy-vs-app') {
    const nodes = policyVsAppNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-sky-400" />
                <span>Network Policy vs Application Layer: The Triangulation Doctrine</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Why a permitted Layer 4 TCP connection does not prove the user&apos;s Layer 7 task succeeded.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveLayerInspection('both');
                }}
                className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                  activeLayerInspection === 'both'
                    ? 'bg-sky-500 text-slate-950 border-sky-400'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Dual Layer View
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
                      {node.id === 'chk-netallow' && <ShieldCheck className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'chk-apperr' && <AlertTriangle className="w-6 h-6 text-rose-400" />}
                      {node.id === 'chk-triangulate' && <Compass className="w-6 h-6 text-sky-400" />}
                      {node.id === 'chk-analyst' && <UserCheck className="w-6 h-6 text-purple-400" />}
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

          {/* Triangulation Dual Log Screen */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-1.5">
              <div className="flex items-center justify-between text-emerald-300 font-bold">
                <span>FIREWALL LOG: LAYER 4 TCP</span>
                <Badge className="bg-emerald-500 text-slate-950 text-[10px]">ALLOWED</Badge>
              </div>
              <p className="text-slate-200 text-xs">Rule 101 Match: 10.10.20.15:49152 → 10.10.20.100:443 [SYN-ACK PASS]</p>
              <div className="text-[11px] text-emerald-300">Network Perspective: The conduit is open and clean.</div>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/50 space-y-1.5">
              <div className="flex items-center justify-between text-rose-300 font-bold">
                <span>WEB SERVER LOG: LAYER 7 HTTP</span>
                <Badge className="bg-rose-500 text-white text-[10px]">HTTP 500 CRASH</Badge>
              </div>
              <p className="text-slate-200 text-xs">POST /api/save_report: Database connection pool timeout exception.</p>
              <div className="text-[11px] text-rose-300">Application Perspective: User report rejected by backend database.</div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 16. VLAN Segmentation & Isolated Broadcast Domains (M02-U3-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm02-vlan-segmentation') {
    const nodes = vlanSegmentationNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const vlanZones = [
      { id: 10, name: 'VLAN 10: Staff Desktops', subnet: '10.10.10.0/24', color: 'sky', desc: 'Everyday workstations, restricted from server VLAN without firewall inspection.' },
      { id: 20, name: 'VLAN 20: Core Servers', subnet: '10.10.20.0/24', color: 'emerald', desc: 'Finance databases and storage; protected with strict inbound access lists.' },
      { id: 30, name: 'VLAN 30: Guest Wi-Fi', subnet: '172.16.0.0/24', color: 'amber', desc: 'Contractors and visitors. Isolated direct WAN internet egress only.' },
      { id: 99, name: 'VLAN 99: Out-of-Band Mgmt', subnet: '192.168.99.0/24', color: 'purple', desc: 'Switch/firewall consoles. Accessible exclusively via MFA jumpbox bastion.' },
    ];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-400" />
                <span>VLAN Segmentation: Isolated Broadcast Domains & Zero Trust</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Segmenting physical switches into distinct logical broadcast domains to contain lateral movement.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {[10, 20, 30, 99].map((vid) => (
                <button
                  key={vid}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedVlanZone(vid);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold border transition-all ${
                    selectedVlanZone === vid
                      ? 'bg-sky-500 text-slate-950 border-sky-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  VLAN {vid}
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
                      {node.id === 'vlan-staff' && <Laptop className="w-6 h-6" />}
                      {node.id === 'vlan-server' && <Server className="w-6 h-6" />}
                      {node.id === 'vlan-guest' && <Smartphone className="w-6 h-6" />}
                      {node.id === 'vlan-mgmt' && <Lock className="w-6 h-6" />}
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

          {/* 4-Zone Security Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2 font-mono text-xs">
            {vlanZones.map((z) => (
              <div
                key={z.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedVlanZone(z.id);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedVlanZone === z.id
                    ? 'bg-sky-950/80 border-sky-400 ring-1 ring-sky-500/50 shadow-md'
                    : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="font-bold text-white flex items-center justify-between">
                  <span>{z.name}</span>
                  <Badge className="bg-slate-800 text-sky-300 text-[9px]">{z.subnet}</Badge>
                </div>
                <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">{z.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 17. 802.1Q Multi-Switch Trunking (M02-U3-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm02-multi-switch-trunk') {
    const nodes = multiSwitchTrunkNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Cable className="w-5 h-5 text-sky-400" />
                <span>802.1Q Multi-Switch Trunking: Multiplexed Fiber Uplinks</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                How 4-byte 802.1Q tags carry traffic from multiple isolated VLANs across a single physical inter-switch link.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {[10, 20, 30].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveTrunkTag(t);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold border transition-all ${
                    activeTrunkTag === t
                      ? 'bg-sky-500 text-slate-950 border-sky-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Frame Tag {t}
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
                      {node.id === 'trunk-acc1' && <Cpu className="w-6 h-6" />}
                      {node.id === 'trunk-acc2' && <Cpu className="w-6 h-6" />}
                      {node.id === 'trunk-dot1q' && <Cable className="w-6 h-6" />}
                      {node.id === 'trunk-core' && <Shield className="w-6 h-6" />}
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

          {/* Trunk Header Inspector HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">802.1Q FRAME HEADER INJECTION (4 BYTES)</span>
              <span className="text-sky-300 font-bold">CURRENT ACTIVE TRUNK TAG: VLAN {activeTrunkTag}</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px]">PREAMBLE &amp; MACs</div>
                <div className="font-bold text-white text-xs">14 Bytes</div>
              </div>
              <div className="p-2 rounded-lg bg-sky-950/80 border border-sky-400">
                <div className="text-sky-300 text-[10px]">802.1Q TAG (TPID: 0x8100)</div>
                <div className="font-bold text-sky-300 text-xs">VLAN ID: {activeTrunkTag}</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px]">PAYLOAD DATA</div>
                <div className="font-bold text-white text-xs">46 - 1500 Bytes</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px]">FCS CRC CHECKSUM</div>
                <div className="font-bold text-white text-xs">4 Bytes</div>
              </div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 18. Lateral Movement Defense & Boundary Enforcement (M02-U3-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm02-vlan-boundary-audit') {
    const nodes = vlanBoundaryAuditNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <span>Lateral Movement Defense &amp; Inter-VLAN Firewall Barrier</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Detecting and blocking unauthorized cross-VLAN port scans from untrusted guest zones into management consoles.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setProbeAttemptCount((prev) => prev + 1);
                setIsProbeBlocked(true);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white border border-rose-400 transition-all flex items-center gap-1.5"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Simulate Guest Probe (Attempt #{probeAttemptCount})</span>
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
                      {node.id === 'audit-guest' && <Smartphone className="w-6 h-6 text-amber-400" />}
                      {node.id === 'audit-block' && <Shield className="w-6 h-6 text-rose-400" />}
                      {node.id === 'audit-mgmt' && <Lock className="w-6 h-6 text-purple-400" />}
                      {node.id === 'audit-alert' && <AlertTriangle className="w-6 h-6 text-rose-400" />}
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

          {/* Interactive Defense Wall Display */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">INTER-VLAN SECURITY BARRIER STATUS</span>
              <span className="text-rose-400 font-bold">RULE 999: EXPLICIT DROP &amp; LOG</span>
            </div>

            <div className="p-3.5 rounded-lg bg-rose-950/40 border border-rose-500/50 space-y-1.5 text-xs text-rose-200">
              <div className="flex items-center justify-between font-bold">
                <span>SEV-1 SIEM ALERT: UNAUTHORIZED INTER-VLAN PROBE DETECTED</span>
                <Badge className="bg-rose-600 text-white text-[10px]">BLOCKED &amp; LOGGED</Badge>
              </div>
              <p className="text-slate-200 text-xs">
                Source: 172.16.0.45 (Guest Wi-Fi VLAN 30) → Target: 192.168.99.1:22 (Management VLAN 99 SSH).
              </p>
              <div className="text-[11px] text-slate-300">
                Analyst Action: Zero trust boundary held firm. Attacker on guest AP was unable to reach switch console; MAC address flagged for immediate quarantine.
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
