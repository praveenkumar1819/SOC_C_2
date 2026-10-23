'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { sound } from '@/lib/sound-effects';
import {
  siemCapabilitiesNodes,
  visibilityGapsNodes,
  scopeDoctrineNodes,
  sourceEcosystemNodes,
  ingestionPipelineNodes,
  sourceHealthNodes,
  fieldSchemaNodes,
  timeWindowNodes,
  zeroResultsCheckNodes,
  booleanLogicNodes,
  queryDialectsNodes,
  queryDossierNodes,
  correlationEngineNodes,
  ruleDissectorNodes,
  thresholdTuningNodes,
  sourceMosaicNodes,
  dataMinimizationNodes,
  evidencePacketNodes,
} from './module-05-visual-stories';
import {
  Server,
  Database,
  Search,
  Filter,
  Layers,
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
  Laptop,
  Monitor,
  Boxes,
  Workflow,
  ShieldCheck,
  CheckCheck,
  RefreshCw,
  Play,
  RotateCcw,
  HelpCircle,
  ShieldAlert,
  Ban,
  EyeOff,
  Network,
  FileSpreadsheet,
} from 'lucide-react';
import { VisualNodeItem } from './module-00-visual-stories';

interface Module05GraphicRendererProps {
  style: string;
  selectedNodeId: string;
  onSelectNode: (node: VisualNodeItem) => void;
  animStep: number;
}

export function Module05GraphicRenderer({
  style,
  selectedNodeId,
  onSelectNode,
  animStep,
}: Module05GraphicRendererProps) {
  // Interactive test states for Module 05 scenarios
  const [isTimeExpanded, setIsTimeExpanded] = useState<boolean>(false);
  const [selectedSourceType, setSelectedSourceType] = useState<'endpoint' | 'identity' | 'network' | 'app'>('endpoint');
  const [pipelineStep, setPipelineStep] = useState<number>(1);
  const [activeHealthTab, setActiveHealthTab] = useState<'healthy' | 'lagging' | 'offline'>('healthy');
  const [isSchemaNormalized, setIsSchemaNormalized] = useState<boolean>(true);
  const [zeroResultsStep, setZeroResultsStep] = useState<number>(0);
  const [activeBooleanOp, setActiveBooleanOp] = useState<'and' | 'or' | 'not'>('and');
  const [activeDialect, setActiveDialect] = useState<'kql' | 'spl' | 'lucene'>('kql');
  const [isQuerySaved, setIsQuerySaved] = useState<boolean>(false);
  const [isCorrelationTriggered, setIsCorrelationTriggered] = useState<boolean>(true);
  const [tuningLevel, setTuningLevel] = useState<'low' | 'optimal' | 'high'>('optimal');
  const [activeMosaicSource, setActiveMosaicSource] = useState<'all' | 'id' | 'host' | 'net'>('all');
  const [isDataMinimized, setIsDataMinimized] = useState<boolean>(true);
  const [isPacketSigned, setIsPacketSigned] = useState<boolean>(false);

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
  // 1. SIEM Core Capabilities & Centralization (M05-U1-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm05-siem-capabilities') {
    const nodes = siemCapabilitiesNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Server className="w-5 h-5 text-sky-400" />
                <span>Central SIEM Ingestion &amp; Search Head Architecture</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Aggregating 150k events/sec across enterprise endpoints, domain controllers, and cloud perimeters into an inverted index.
              </p>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-mono text-xs">
              CLUSTER STATUS: 150K EPS HEALTHY
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
                      {node.id === 'cap-aggregate' && <Database className="w-6 h-6 text-sky-400" />}
                      {node.id === 'cap-correlate' && <Cpu className="w-6 h-6 text-indigo-400" />}
                      {node.id === 'cap-search' && <Search className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'cap-alert' && <ShieldAlert className="w-6 h-6 text-amber-400" />}
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

          {/* Central Telemetry Pipeline Display */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">CENTRAL INGESTION TO TRIAGE PIPELINE</span>
              <span className="text-sky-300 font-bold">INGESTION $\to$ INVERTED INDEX $\to$ CORRELATION $\to$ TICKET</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 text-xs">
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <div className="text-sky-300 font-bold">1. Log Producers</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Winlogbeat, Syslog, Zeek, CloudTrail</div>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <div className="text-indigo-300 font-bold">2. Logstash Pipeline</div>
                <div className="text-[11px] text-slate-400 mt-0.5">ECS Field Normalization, IP Geo-lookup</div>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <div className="text-emerald-300 font-bold">3. Inverted Indexes</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Sub-second Lucene token search</div>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <div className="text-amber-300 font-bold">4. Triage Dispatch</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Actionable alerts to L1 queue</div>
              </div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 2. The Visibility Gap & Uncollected Sources (M05-U1-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm05-visibility-gaps') {
    const nodes = visibilityGapsNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-sky-400" />
                <span>The Visibility Gap &amp; Uncollected Log Sources</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Recognizing coverage blind spots: an empty search query never proves innocence if telemetry was never collected.
              </p>
            </div>
            <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30 font-mono text-xs">
              AUDIT ALERT: 1 UNCOLLECTED SOURCE DETECTED
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
                      {node.id === 'gap-covered' && <CheckCircle2 className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'gap-uncollected' && <AlertOctagon className="w-6 h-6 text-rose-400" />}
                      {node.id === 'gap-blindspot' && <Clock className="w-6 h-6 text-amber-400" />}
                      {node.id === 'gap-audit' && <ShieldCheck className="w-6 h-6 text-purple-400" />}
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

          {/* Visibility Gap Callout Display */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">DATA SOURCE COVERAGE LEDGER</span>
              <span className="text-rose-400 font-bold">BRANCH WI-FI CONTROLLER: NO SYSLOG FORWARDING</span>
            </div>

            <div className="p-3.5 rounded-lg bg-[#081533] border border-sky-500/30 text-xs sm:text-sm text-sky-200 flex items-start gap-2.5">
              <UserCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-bold">Mentor Karthik&apos;s Coverage Doctrine: </strong>
                &ldquo;If you search for rogue activity on the branch Wi-Fi and receive zero hits, do not conclude the network is secure. Check the data coverage ledger first. If the wireless syslog agent was never configured, your search is completely blind.&rdquo;
              </div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 3. Scope-Bounded Search Doctrine (M05-U1-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm05-scope-doctrine') {
    const nodes = scopeDoctrineNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-sky-400" />
                <span>Scope-Bounded Search Doctrine: Calibrating Temporal Windows</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Overcoming zero-result false negatives by expanding time filters from narrow 15-minute defaults to 24-hour UTC windows.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsTimeExpanded(!isTimeExpanded);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isTimeExpanded ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{isTimeExpanded ? 'SEARCH SCOPE: 24 HOURS UTC (14 EVENTS FOUND ✓)' : 'DEFAULT SCOPE: LAST 15 MIN (0 EVENTS ✕)'}</span>
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
                      {node.id === 'doc-empty-search' && <Search className="w-6 h-6 text-rose-400" />}
                      {node.id === 'doc-coverage-check' && <Activity className="w-6 h-6 text-sky-400" />}
                      {node.id === 'doc-scope-verify' && <Clock className="w-6 h-6 text-amber-400" />}
                      {node.id === 'doc-expand-rule' && <CheckCircle2 className="w-6 h-6 text-emerald-400" />}
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

          {/* Temporal Scope Comparison Screen */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">KIBANA SEARCH CONSOLE: host.name: &quot;BLR-BR-WS-04&quot;</span>
              <span className={isTimeExpanded ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {isTimeExpanded ? 'MATCH COUNT: 14 EVENTS (ATTACK REVEALED)' : 'MATCH COUNT: 0 EVENTS (FALSE NEGATIVE TRAP)'}
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200">
              {isTimeExpanded ? (
                <div>
                  <strong className="text-emerald-300">Scope Corrected (24-Hour UTC Window):</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    Expanding the time scope immediately reveals the nocturnal attack from 02:45 UTC. An off-hours certutil.exe download and C2 beacon session are now clearly visible in the query result table.
                  </p>
                </div>
              ) : (
                <div>
                  <strong className="text-rose-300">The 15-Minute Default Trap:</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    The analyst logged in at 09:00 IST and searched with default &ldquo;Last 15 minutes&rdquo;. The attack happened 6 hours earlier. A premature closure here would have allowed the adversary to maintain persistent access undetected!
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
  // 4. Telemetry Sources Ecosystem (M05-U1-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm05-source-ecosystem') {
    const nodes = sourceEcosystemNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-sky-400" />
                <span>Telemetry Sources Ecosystem: Endpoints, Identity, Network &amp; Apps</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Categorizing log producers by telemetry grain, from deep Sysmon kernel process trees to high-volume perimeter firewall flows.
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {(['endpoint', 'identity', 'network', 'app'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedSourceType(t);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                    selectedSourceType === t ? 'bg-sky-500 text-slate-950 border-sky-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {t.toUpperCase()}
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
                      {node.id === 'src-sysmon' && <Laptop className="w-6 h-6 text-sky-400" />}
                      {node.id === 'src-ad' && <Key className="w-6 h-6 text-amber-400" />}
                      {node.id === 'src-firewall' && <Shield className="w-6 h-6 text-purple-400" />}
                      {node.id === 'src-app' && <Globe className="w-6 h-6 text-emerald-400" />}
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

          {/* Ecosystem Source Display HUD */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 pt-2 font-mono text-xs">
            <div className={`p-3 rounded-lg border ${selectedSourceType === 'endpoint' ? 'bg-sky-950/70 border-sky-400' : 'bg-slate-950 border-slate-800'}`}>
              <div className="text-sky-300 font-bold">Endpoint Telemetry</div>
              <p className="text-slate-300 text-xs mt-1">Sysmon &amp; EDR: Process creation (Event 1), network connects (Event 3), registry persistence.</p>
            </div>
            <div className={`p-3 rounded-lg border ${selectedSourceType === 'identity' ? 'bg-amber-950/70 border-amber-400' : 'bg-slate-950 border-slate-800'}`}>
              <div className="text-amber-300 font-bold">Identity Telemetry</div>
              <p className="text-slate-300 text-xs mt-1">Active Directory: Event 4624 (Logon), Event 4625 (Failure), Kerberos TGT ticket requests.</p>
            </div>
            <div className={`p-3 rounded-lg border ${selectedSourceType === 'network' ? 'bg-purple-950/70 border-purple-400' : 'bg-slate-950 border-slate-800'}`}>
              <div className="text-purple-300 font-bold">Network Telemetry</div>
              <p className="text-slate-300 text-xs mt-1">Firewall &amp; Zeek: 5-tuple connection state, byte volume counters, DNS query metadata.</p>
            </div>
            <div className={`p-3 rounded-lg border ${selectedSourceType === 'app' ? 'bg-emerald-950/70 border-emerald-400' : 'bg-slate-950 border-slate-800'}`}>
              <div className="text-emerald-300 font-bold">Application Telemetry</div>
              <p className="text-slate-300 text-xs mt-1">Apache/Nginx &amp; PostgreSQL: HTTP status codes (200, 403, 500), SQL execution errors.</p>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 5. Ingestion Pipeline: Producer $\to$ Agent $\to$ Pipeline $\to$ Index (M05-U1-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm05-ingestion-pipeline') {
    const nodes = ingestionPipelineNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const pipeStages = [
      { step: 0, title: '1. Producer Endpoint', desc: 'Operating system kernel and applications write raw text events into local memory buffers.' },
      { step: 1, title: '2. Lightweight Agent', desc: 'Winlogbeat/Fluentbit reads event buffers, batches records, and ships over TLS to the ingest queue.' },
      { step: 2, title: '3. Buffer Queue & Pipeline', desc: 'Kafka/Logstash buffers burst loads and executes grok/dissect regex to extract IP, user, and port.' },
      { step: 3, title: '4. Inverted Search Index', desc: 'Parsed events written to Elasticsearch/OpenSearch indices; searchable within 1 second of generation.' },
    ];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Workflow className="w-5 h-5 text-sky-400" />
                <span>Log Ingestion Pipeline: Producer $\to$ Agent $\to$ Buffer $\to$ Index</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Following the journey of raw telemetry through queuing buffers and parsing pipelines into searchable indexes.
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
              <span>Advance Ingestion Pipeline ({pipelineStep + 1}/4)</span>
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
                      {node.id === 'pipe-source' && <Laptop className="w-6 h-6 text-sky-400" />}
                      {node.id === 'pipe-agent' && <Radio className="w-6 h-6 text-indigo-400" />}
                      {node.id === 'pipe-queue' && <Boxes className="w-6 h-6 text-purple-400" />}
                      {node.id === 'pipe-index' && <Database className="w-6 h-6 text-emerald-400" />}
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
            {pipeStages.map((st) => (
              <div
                key={st.step}
                onClick={() => {
                  sound.playClick();
                  setPipelineStep(st.step);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  pipelineStep === st.step ? 'bg-sky-950/80 border-sky-400 ring-1 ring-sky-500/50 shadow-md' : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-white">
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
  // 6. Ingestion Health & Telemetry Lag Monitor (M05-U1-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm05-source-health') {
    const nodes = sourceHealthNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-sky-400" />
                <span>Ingestion Health &amp; Telemetry Lag Monitor</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Tracking forwarder heartbeats, buffer lag, and agent status to catch ingestion outages before they create blind spots.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {(['healthy', 'lagging', 'offline'] as const).map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveHealthTab(h);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                    activeHealthTab === h
                      ? h === 'healthy'
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : h === 'lagging'
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-rose-600 text-white border-rose-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {h.toUpperCase()}
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
                      {node.id === 'hlth-active' && <CheckCircle2 className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'hlth-lag' && <Clock className="w-6 h-6 text-amber-400" />}
                      {node.id === 'hlth-buffer' && <AlertOctagon className="w-6 h-6 text-rose-400" />}
                      {node.id === 'hlth-heartbeat' && <Activity className="w-6 h-6 text-purple-400" />}
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

          {/* Health Status HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">FORWARDER AGENT HEALTH MONITOR</span>
              <span className={activeHealthTab === 'healthy' ? 'text-emerald-400 font-bold' : activeHealthTab === 'lagging' ? 'text-amber-400 font-bold' : 'text-rose-400 font-bold'}>
                {activeHealthTab === 'healthy' && 'STATUS: STREAM HEALTHY • INGESTION LAG: 1.8 SECONDS'}
                {activeHealthTab === 'lagging' && 'STATUS: STREAM LAGGING • INGESTION LAG: 42 MINUTES ⚠️'}
                {activeHealthTab === 'offline' && 'STATUS: AGENT OFFLINE • BUFFER SPILL FAILURE 🔥'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200">
              {activeHealthTab === 'healthy' && (
                <span className="text-emerald-300">
                  Agent is active and shipping. All events arriving within 2 seconds. Real-time correlation engines operating at full fidelity.
                </span>
              )}
              {activeHealthTab === 'lagging' && (
                <span className="text-amber-300">
                  Network congestion between branch and SIEM cluster causing 42-minute lag. Events are accumulating on endpoint disk buffer without loss.
                </span>
              )}
              {activeHealthTab === 'offline' && (
                <span className="text-rose-300">
                  Agent crashed or service stopped on BLR-BR-WS-04. Endpoint buffer full. Telemetry blackout! Investigate host service immediately.
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
  // 7. Elastic Common Schema (ECS) & Normalized Fields (M05-U2-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm05-field-schema') {
    const nodes = fieldSchemaNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-400" />
                <span>Elastic Common Schema (ECS) &amp; Field Normalization</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Translating proprietary vendor formats into standardized key-value pairs (user.name, host.hostname, process.executable).
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsSchemaNormalized(!isSchemaNormalized);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isSchemaNormalized ? 'bg-sky-600 text-white border-sky-400' : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isSchemaNormalized ? 'VIEW ECS NORMALIZED SCHEMA' : 'VIEW RAW UNPARSED LOG STRING'}</span>
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
                      {node.id === 'fld-timestamp' && <Clock className="w-6 h-6 text-purple-400" />}
                      {node.id === 'fld-user' && <UserCheck className="w-6 h-6 text-sky-400" />}
                      {node.id === 'fld-host' && <Laptop className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'fld-process' && <Terminal className="w-6 h-6 text-amber-400" />}
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

          {/* Schema Viewer HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">SCHEMA EXTRACTION PREVIEW</span>
              <span className="text-sky-300">{isSchemaNormalized ? 'PARSED ECS JSON' : 'RAW EVENT STRING'}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
              {isSchemaNormalized ? (
                <code>
                  user.name: &quot;cdac\\FIN-OPS-01&quot; | host.hostname: &quot;BLR-BR-WS-04&quot; | process.name: &quot;certutil.exe&quot; | process.args: &quot;-urlcache -split -f&quot;
                </code>
              ) : (
                <code>
                  Oct 15 02:45:12 BLR-BR-WS-04 Microsoft-Windows-Security-Auditing[4688]: A new process has been created. Creator Subject: FIN-OPS-01 Process Name: C:\Windows\System32\certutil.exe
                </code>
              )}
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 8. Time Windowing: Event Time vs Ingestion Time (M05-U2-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm05-time-window') {
    const nodes = timeWindowNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-400" />
                <span>Time Windowing: Event Time vs Ingestion Time</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Understanding the crucial distinction between when an adversary executed an action versus when the SIEM indexer received it.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 font-mono text-xs">
              TIME STANDARD: UTC STRICT
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
                      {node.id === 'time-event' && <Clock className="w-6 h-6 text-purple-400" />}
                      {node.id === 'time-ingest' && <Database className="w-6 h-6 text-sky-400" />}
                      {node.id === 'time-rollover' && <RotateCcw className="w-6 h-6 text-amber-400" />}
                      {node.id === 'time-utc-standard' && <Globe className="w-6 h-6 text-emerald-400" />}
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

          {/* Dual Timestamp Comparison Screen */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/40 space-y-1">
              <div className="text-purple-300 font-bold flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>1. Event Generation Timestamp (@timestamp)</span>
              </div>
              <p className="text-slate-300 text-xs">
                Generated by endpoint kernel clock at the exact millisecond of process launch: <code>2026-10-15T02:45:12.412Z</code>. Used for chronological timeline sorting.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/40 space-y-1">
              <div className="text-sky-300 font-bold flex items-center gap-2">
                <Database className="w-4 h-4 text-sky-400" />
                <span>2. Index Ingestion Timestamp (event.ingested)</span>
              </div>
              <p className="text-slate-300 text-xs">
                Recorded by SIEM indexer when packet crossed pipeline: <code>2026-10-15T02:45:14.508Z</code>. Ingestion latency = 2.1 seconds (Healthy).
              </p>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 9. Zero-Results Triage Checklist (M05-U2-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm05-zero-results-check') {
    const nodes = zeroResultsCheckNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const checkSteps = [
      { step: 0, title: 'Step 1: Time Window', desc: 'Is the time picker set to UTC? Does it encompass the true incident window?' },
      { step: 1, title: 'Step 2: Index Pattern', desc: 'Are you searching winlogbeat-* instead of perimeter firewall pan-os-* indices?' },
      { step: 2, title: 'Step 3: Spelling & Wildcards', desc: 'Did you misspell username or omit required wildcards? E.g. *FIN-OPS-01*' },
      { step: 3, title: 'Step 4: Agent Liveness', desc: 'Is the host forwarder agent alive and currently shipping telemetry events?' },
    ];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <CheckCheck className="w-5 h-5 text-sky-400" />
                <span>Zero-Results Triage Checklist: 4 Mandatory Checks</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                The methodical 4-step checklist to execute before assuming an endpoint is clean after an empty search.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setZeroResultsStep((prev) => (prev + 1) % 4);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white border border-sky-400 transition-all flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Step Checklist ({zeroResultsStep + 1}/4)</span>
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
                      {node.id === 'chk-timerange' && <Clock className="w-6 h-6 text-purple-400" />}
                      {node.id === 'chk-index' && <Database className="w-6 h-6 text-sky-400" />}
                      {node.id === 'chk-typos' && <Search className="w-6 h-6 text-amber-400" />}
                      {node.id === 'chk-pipeline' && <Activity className="w-6 h-6 text-emerald-400" />}
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

          {/* Checklist Stepper HUD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2 font-mono text-xs">
            {checkSteps.map((cs) => (
              <div
                key={cs.step}
                onClick={() => {
                  sound.playClick();
                  setZeroResultsStep(cs.step);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  zeroResultsStep === cs.step ? 'bg-sky-950/80 border-sky-400 ring-1 ring-sky-500/50 shadow-md' : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-white">
                  <span>{cs.title}</span>
                  {zeroResultsStep === cs.step && <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />}
                </div>
                <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">{cs.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 10. Boolean Logic & Search Precision (M05-U2-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm05-boolean-logic') {
    const nodes = booleanLogicNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-sky-400" />
                <span>Boolean Logic Precision: AND, OR, NOT &amp; Grouping Parentheses</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Understanding how logical operators expand, intersect, or dangerously suppress search results.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {(['and', 'or', 'not'] as const).map((op) => (
                <button
                  key={op}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveBooleanOp(op);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold border transition-all ${
                    activeBooleanOp === op ? 'bg-sky-500 text-slate-950 border-sky-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  OPERATOR: {op.toUpperCase()}
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
                      {node.id === 'gate-and' && <CheckCircle2 className="w-6 h-6 text-sky-400" />}
                      {node.id === 'gate-or' && <Share2 className="w-6 h-6 text-indigo-400" />}
                      {node.id === 'gate-not' && <Ban className="w-6 h-6 text-rose-400" />}
                      {node.id === 'gate-group' && <Boxes className="w-6 h-6 text-emerald-400" />}
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

          {/* Operator Pseudocode HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">ACTIVE BOOLEAN OPERATOR DEMONSTRATION</span>
              <span className="text-sky-300 font-bold">OPERATOR: {activeBooleanOp.toUpperCase()}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
              {activeBooleanOp === 'and' && (
                <code>
                  host.name: &quot;BLR-BR-WS-04&quot; <strong>AND</strong> process.name: &quot;powershell.exe&quot;
                  <br />
                  <span className="text-emerald-400 pt-1 block">Strict intersection: Matches only events where BOTH conditions are true simultaneously.</span>
                </code>
              )}
              {activeBooleanOp === 'or' && (
                <code>
                  process.name: &quot;certutil.exe&quot; <strong>OR</strong> process.name: &quot;bitsadmin.exe&quot;
                  <br />
                  <span className="text-indigo-400 pt-1 block">Broad union: Expands search to catch multiple LOLBIN downloaders in a single query sweep.</span>
                </code>
              )}
              {activeBooleanOp === 'not' && (
                <code>
                  process.name: &quot;powershell.exe&quot; <strong>AND NOT</strong> user.name: &quot;SYSTEM&quot;
                  <br />
                  <span className="text-rose-400 pt-1 block">⚠️ Danger: If malware compromises the SYSTEM account, this query suppresses the attack!</span>
                </code>
              )}
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 11. Cross-Dialect Search: KQL, Splunk SPL & Lucene (M05-U2-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm05-query-dialects') {
    const nodes = queryDialectsNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-sky-400" />
                <span>Cross-Dialect Query Translation: KQL, Splunk SPL &amp; Lucene</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Translating identical analytical search questions across major industry SIEM syntax dialects.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {(['kql', 'spl', 'lucene'] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveDialect(d);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold border transition-all ${
                    activeDialect === d ? 'bg-sky-500 text-slate-950 border-sky-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {d.toUpperCase()}
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
                      {node.id === 'kql-kibana' && <FileCode className="w-6 h-6 text-sky-400" />}
                      {node.id === 'kql-kusto' && <Terminal className="w-6 h-6 text-indigo-400" />}
                      {node.id === 'kql-splunk' && <Activity className="w-6 h-6 text-amber-400" />}
                      {node.id === 'kql-cross' && <Share2 className="w-6 h-6 text-emerald-400" />}
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

          {/* Cross-Dialect Syntax HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">TRANSLATED SYNTAX RECIPE</span>
              <span className="text-sky-300 font-bold">TARGET: {activeDialect.toUpperCase()}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
              {activeDialect === 'kql' && (
                <code>
                  host.name: &quot;BLR-BR-WS-04&quot; and process.name: &quot;certutil.exe&quot; and process.command_line: *urlcache*
                </code>
              )}
              {activeDialect === 'spl' && (
                <code>
                  index=endpoint host=&quot;BLR-BR-WS-04&quot; process_name=&quot;certutil.exe&quot; CommandLine=&quot;*urlcache*&quot; | table _time, user, CommandLine
                </code>
              )}
              {activeDialect === 'lucene' && (
                <code>
                  host.name:&quot;BLR-BR-WS-04&quot; AND process.name:&quot;certutil.exe&quot; AND process.command_line:*urlcache*
                </code>
              )}
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 12. Reusable Query Dossier & Investigation Playbooks (M05-U2-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm05-query-dossier') {
    const nodes = queryDossierNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-400" />
                <span>Reusable Query Dossier: Documenting Reproducible Recipes</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Saving exact query parameters, UTC time ranges, and index patterns so peers can independently verify evidence findings.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsQuerySaved(!isQuerySaved);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isQuerySaved ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-sky-600 text-white border-sky-400'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isQuerySaved ? 'QUERY SAVED TO CASE DOSSIER ✓' : 'SAVE RECIPE TO CASE-2026-081'}</span>
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
                      {node.id === 'dos-query-save' && <FileText className="w-6 h-6 text-sky-400" />}
                      {node.id === 'dos-macro' && <Workflow className="w-6 h-6 text-purple-400" />}
                      {node.id === 'dos-replay' && <RotateCcw className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'dos-recipe' && <ShieldCheck className="w-6 h-6 text-amber-400" />}
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

          {/* Dossier Manifest HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">CASE-2026-081 QUERY REPRODUCIBILITY MANIFEST</span>
              <span className={isQuerySaved ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                {isQuerySaved ? 'STATUS: ATTACHED TO CASE DOSSIER' : 'STATUS: UNCOMMITTED DRAFT'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <code>
                Query String: host.name: &quot;BLR-BR-WS-04&quot; AND process.name: &quot;certutil.exe&quot;
                <br />
                Time Range: 2026-10-15T02:30:00Z to 2026-10-15T03:30:00Z (UTC Strict)
                <br />
                Target Index: winlogbeat-security-* | Result Count: 1 Event (SHA-256 Verified)
              </code>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 13. Stateful SIEM Correlation Engine (M05-U3-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm05-correlation-engine') {
    const nodes = correlationEngineNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-sky-400" />
                <span>Stateful SIEM Correlation Engine: Multi-Source Joins</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Correlating identity logons, LOLBIN process execution, and network C2 streams across sliding temporal windows.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsCorrelationTriggered(!isCorrelationTriggered);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isCorrelationTriggered ? 'bg-rose-600 text-white border-rose-400 shadow-md animate-pulse' : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{isCorrelationTriggered ? 'COMPOUND RULE TRIGGERED: SEV-1 ALERT' : 'ISOLATED EVENTS (SUPPRESSED)'}</span>
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
                      {node.id === 'eng-join' && <Workflow className="w-6 h-6 text-sky-400" />}
                      {node.id === 'eng-window' && <Clock className="w-6 h-6 text-purple-400" />}
                      {node.id === 'eng-compound' && <AlertOctagon className="w-6 h-6 text-rose-400" />}
                      {node.id === 'eng-suppress' && <Filter className="w-6 h-6 text-emerald-400" />}
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

          {/* Correlation Chain HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">TEMPORAL SLIDING WINDOW CORRELATION (5 MINUTES)</span>
              <span className={isCorrelationTriggered ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                {isCorrelationTriggered ? 'CORRELATION SCORE: 98/100 (SEV-1 TRIGGER)' : 'INDIVIDUAL SIGNALS BELOW THRESHOLD'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <div className="text-amber-300 font-bold">1. Event ID 4624 (Logon)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">User FIN-OPS-01 from VPN IP at 02:44Z</div>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <div className="text-purple-300 font-bold">2. Event ID 4688 (Process)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">certutil.exe -urlcache at 02:45Z</div>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <div className="text-rose-300 font-bold">3. Firewall Netflow</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Outbound connection to 198.51.100.42:443</div>
              </div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 14. Anatomy of a SIEM Detection Rule (M05-U3-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm05-rule-dissector') {
    const nodes = ruleDissectorNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-sky-400" />
                <span>Anatomy of a SIEM Detection Rule: Logic &amp; Suppression Filters</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Dissecting rule metadata, match conditions, throttle windows, and false positive exclusion filters.
              </p>
            </div>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 font-mono text-xs">
              SIGMA STANDARD FORMAT
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
                      {node.id === 'rule-stream' && <FileCode className="w-6 h-6 text-sky-400" />}
                      {node.id === 'rule-criteria' && <Filter className="w-6 h-6 text-indigo-400" />}
                      {node.id === 'rule-suppress' && <Clock className="w-6 h-6 text-purple-400" />}
                      {node.id === 'rule-exclude' && <ShieldCheck className="w-6 h-6 text-emerald-400" />}
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

          {/* Rule Structure Pseudocode */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">SIGMA DETECTION RULE: PROC_CREATION_WIN_CERTUTIL_DOWNLOAD</span>
              <span className="text-sky-300">STATUS: PRODUCTION ACTIVE</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <code>
                title: Suspicious Certutil Download via URLCache
                <br />
                detection:
                <br />
                &nbsp;&nbsp;selection:
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;Image|endswith: &apos;\certutil.exe&apos;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;CommandLine|contains: [&apos;-urlcache&apos;, &apos;-split&apos;]
                <br />
                &nbsp;&nbsp;filter:
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;User: &apos;NT AUTHORITY\SYSTEM&apos; # Exclude legitimate Windows Update cert sync
                <br />
                condition: selection and not filter
              </code>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 15. Threshold Tuning & Alert Volume Calibration (M05-U3-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm05-threshold-tuning') {
    const nodes = thresholdTuningNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-sky-400" />
                <span>Detection Threshold Tuning: Alert Volume vs Sensitivity</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Finding the sweet spot between alert fatigue (under-tuned noise) and dangerous detection blindspots (over-tuned silence).
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {(['low', 'optimal', 'high'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setTuningLevel(t);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                    tuningLevel === t
                      ? t === 'optimal'
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : t === 'low'
                        ? 'bg-rose-600 text-white border-rose-400'
                        : 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {t === 'low' ? 'Under-Tuned (Noise)' : t === 'optimal' ? 'Optimal Calibration' : 'Over-Tuned (Blind)'}
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
                      {node.id === 'tune-thresh-flood' && <AlertOctagon className="w-6 h-6 text-rose-400" />}
                      {node.id === 'tune-thresh-miss' && <EyeOff className="w-6 h-6 text-amber-400" />}
                      {node.id === 'tune-thresh-optimal' && <ShieldCheck className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'tune-thresh-dynamic' && <Activity className="w-6 h-6 text-purple-400" />}
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

          {/* Tuning Calibration HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">ALERT VOLUME SIMULATION</span>
              <span className={tuningLevel === 'optimal' ? 'text-emerald-400 font-bold' : tuningLevel === 'low' ? 'text-rose-400 font-bold' : 'text-amber-400 font-bold'}>
                {tuningLevel === 'optimal' && 'OPTIMAL: 3 HIGH-FIDELITY ALERTS/HOUR • ZERO FATIGUE'}
                {tuningLevel === 'low' && 'UNDER-TUNED: 450 ALERTS/HOUR • SEVERE ANALYST FATIGUE 🔥'}
                {tuningLevel === 'high' && 'OVER-TUNED: 0 ALERTS/HOUR • MISSED ACTIVE ATTACKS ⚠️'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200">
              {tuningLevel === 'optimal' && (
                <span className="text-emerald-300">
                  Calibrated correlation: Requires both process execution AND network connection. High signal-to-noise ratio. True incidents stand out cleanly.
                </span>
              )}
              {tuningLevel === 'low' && (
                <span className="text-rose-300">
                  Rule fires on every single PowerShell command. The queue is drowned in administrative noise. Analysts burn out and miss the real attack.
                </span>
              )}
              {tuningLevel === 'high' && (
                <span className="text-amber-300">
                  Threshold set so strict that real attacks evade detection. The queue is clean, but the enterprise is compromised silently!
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
  // 16. The 5-Source Telemetry Mosaic (M05-U3-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm05-source-mosaic') {
    const nodes = sourceMosaicNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Boxes className="w-5 h-5 text-sky-400" />
                <span>The 5-Source Telemetry Mosaic: Multi-Domain Corroboration</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Synthesizing Identity, Host, Network, Application, and Cloud logs to reconstruct an adversary&apos;s complete attack trail.
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {(['all', 'id', 'host', 'net'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveMosaicSource(m);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                    activeMosaicSource === m ? 'bg-sky-500 text-slate-950 border-sky-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {m === 'all' ? 'All 5 Sources' : m === 'id' ? 'Identity Only' : m === 'host' ? 'Host Only' : 'Network Only'}
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
                      {node.id === 'mos-identity' && <UserCheck className="w-6 h-6 text-sky-400" />}
                      {node.id === 'mos-host' && <Laptop className="w-6 h-6 text-indigo-400" />}
                      {node.id === 'mos-network' && <Network className="w-6 h-6 text-purple-400" />}
                      {node.id === 'mos-app' && <Globe className="w-6 h-6 text-emerald-400" />}
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

          {/* Mosaic Corroboration HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">MULTI-DOMAIN CORROBORATION MOSAIC</span>
              <span className="text-emerald-400 font-bold">PROOF CONFIDENCE: 100% INDISPUTABLE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <div className="text-sky-300 font-bold">1. Identity Domain</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Account cdac\FIN-OPS-01 authenticated via Kerberos at 02:44 UTC.</div>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <div className="text-indigo-300 font-bold">2. Host Domain</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Workstation BLR-BR-WS-04 spawned certutil.exe (PID 4820) at 02:45 UTC.</div>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <div className="text-purple-300 font-bold">3. Network Domain</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Firewall logged 450 MB outbound HTTPS stream to 198.51.100.42.</div>
              </div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 17. Data Minimization & Privacy Compliance (M05-U3-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm05-data-minimization') {
    const nodes = dataMinimizationNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-sky-400" />
                <span>Data Minimization &amp; Privacy Compliance (DPDP Act)</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Balancing security investigation requirements against privacy regulations: masking PII while preserving technical observables.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsDataMinimized(!isDataMinimized);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isDataMinimized ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-rose-600 text-white border-rose-400 animate-pulse'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>{isDataMinimized ? 'PII MASKING ACTIVE (COMPLIANT ✓)' : 'RAW UNMASKED PII (NON-COMPLIANT ✕)'}</span>
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
                      {node.id === 'min-approved-fields' && <ShieldCheck className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'min-pii-mask' && <Lock className="w-6 h-6 text-amber-400" />}
                      {node.id === 'min-audit-trail' && <FileText className="w-6 h-6 text-sky-400" />}
                      {node.id === 'min-legal-shield' && <Shield className="w-6 h-6 text-purple-400" />}
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

          {/* Masking Comparison Display */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">LOG INGESTION PRIVACY MASKING LEDGER</span>
              <span className={isDataMinimized ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {isDataMinimized ? 'STATUS: DPDP ACT COMPLIANT • PII MASKED' : 'WARNING: SENSITIVE EMPLOYEE DATA EXPOSED'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
              {isDataMinimized ? (
                <code>
                  user.name: &quot;FIN-OPS-01&quot; | employee.pan: &quot;*****8821F&quot; | bank.routing: &quot;*********1042&quot; | client.ip: &quot;10.10.20.15&quot;
                </code>
              ) : (
                <code>
                  user.name: &quot;Ramesh Sharma&quot; | employee.pan: &quot;ABCDE8821F&quot; | bank.routing: &quot;SBIN0001042&quot; | client.ip: &quot;10.10.20.15&quot;
                </code>
              )}
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 18. Master SIEM Evidence Packet & Handover Package (M05-U3-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm05-evidence-packet') {
    const nodes = evidencePacketNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <CheckCheck className="w-5 h-5 text-emerald-400" />
                <span>Master SIEM Evidence Packet: Reproducible Proof for Tier 2</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Packaging raw log extracts, normalized field tables, executable queries, and SHA-256 chain hashes into a verifiable dossier.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsPacketSigned(!isPacketSigned);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isPacketSigned ? 'bg-emerald-600 text-white border-emerald-400 shadow-md' : 'bg-sky-600 text-white border-sky-400'
              }`}
            >
              <CheckCheck className="w-4 h-4" />
              <span>{isPacketSigned ? 'MENTOR KARTHIK SIGN-OFF COMPLETE ✓' : 'REQUEST SUPERVISORY SIGN-OFF'}</span>
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
                      {node.id === 'pkt-bundle' && <FileSpreadsheet className="w-6 h-6 text-purple-400" />}
                      {node.id === 'pkt-query-manifest' && <FileCode className="w-6 h-6 text-sky-400" />}
                      {node.id === 'pkt-chain-hash' && <Key className="w-6 h-6 text-amber-400" />}
                      {node.id === 'pkt-lead-handoff' && <UserCheck className="w-6 h-6 text-emerald-400" />}
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

          {/* Master Evidence Packet Sign-off HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">REPRODUCIBLE EVIDENCE DOSSIER HASH</span>
              <span className="text-emerald-400 font-bold">SHA-256: 9b2d8e41a...71c8 (SEALED)</span>
            </div>

            <div className="p-3.5 rounded-lg bg-[#081533] border border-sky-500/30 text-xs sm:text-sm text-sky-200 flex items-start gap-2.5">
              <UserCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-bold">Mentor Karthik&apos;s Milestone Review: </strong>
                &ldquo;You now possess an authentic, verifiable evidence packet, not merely an ephemeral screenshot. Any peer analyst or Tier 2 investigator can execute your query manifest and reproduce your findings to the exact millisecond. Outstanding work!&rdquo;
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
