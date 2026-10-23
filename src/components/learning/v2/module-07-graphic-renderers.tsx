'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { sound } from '@/lib/sound-effects';
import {
  channelProvidersNodes,
  eventIdSignpostsNodes,
  providerIntegrityNodes,
  logonMatrixNodes,
  privilegeContextNodes,
  identityDoctrineNodes,
  linuxLogGeographyNodes,
  sshStreamTriageNodes,
  sshBruteForceDoctrineNodes,
  systemdServicesNodes,
  sudoAuditTrailNodes,
  commandVisibilityBoundaryNodes,
  workstationBaselineProfileNodes,
  event7045ServiceNodes,
  contextTriageDecisionNodes,
  hostTimelineIntegrationNodes,
  communicationPlaybookNodes,
  scopedHostSummaryNodes,
} from './module-07-visual-stories';
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
  Workflow,
  ShieldCheck,
} from 'lucide-react';
import { VisualNodeItem, VisualStoryStyle } from './interactive-visual-story-engine';

interface Module07GraphicRendererProps {
  style: VisualStoryStyle;
  selectedNodeId: string;
  onSelectNode: (node: VisualNodeItem) => void;
  animStep: number;
}

export function Module07GraphicRenderer({
  style,
  selectedNodeId,
  onSelectNode,
  animStep,
}: Module07GraphicRendererProps) {
  // Interactive test states for Module 07 scenarios
  const [activeChannel, setActiveChannel] = useState<'security' | 'system' | 'application'>('security');
  const [showFullHud, setShowFullHud] = useState<boolean>(true);
  const [activeLogonType, setActiveLogonType] = useState<2 | 3 | 10>(2);
  const [privilegeContextMode, setPrivilegeContextMode] = useState<'backup' | 'ramesh'>('backup');
  const [identityVerifyMode, setIdentityVerifyMode] = useState<'auth-only' | 'physical-badge'>('auth-only');
  const [activeDistro, setActiveDistro] = useState<'ubuntu' | 'rhel' | 'systemd'>('ubuntu');
  const [sshStreamMode, setSshStreamMode] = useState<'failed' | 'accepted'>('failed');
  const [sshBruteState, setSshBruteState] = useState<'held' | 'pivot'>('held');
  const [activeSystemdUnit, setActiveSystemdUnit] = useState<'nginx' | 'miner'>('nginx');
  const [sudoCommandMode, setSudoCommandMode] = useState<'routine' | 'shadow'>('routine');
  const [visibilityBoundaryMode, setVisibilityBoundaryMode] = useState<'bash-history' | 'auditd'>('bash-history');
  const [baselineFilter, setBaselineFilter] = useState<'hours' | 'apps' | 'accounts' | 'deviation'>('hours');
  const [serviceCase, setServiceCase] = useState<'approved' | 'unexplained'>('unexplained');
  const [triageEquilibriumStep, setTriageEquilibriumStep] = useState<number>(1);
  const [hostTrackFilter, setHostTrackFilter] = useState<'all' | 'dc' | 'host' | 'proxy'>('all');
  const [commsPlaybookStep, setCommsPlaybookStep] = useState<number>(1);
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
  // 1. Windows Log Channels & Provider Architecture (M07-U1-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm07-channel-providers') {
    const nodes = channelProvidersNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const channelData = {
      security: {
        file: 'Security.evtx',
        desc: 'Protected audit repository. Authentication successes/failures, privilege assignments, and process creation (4688).',
        access: 'Strict Admin / System ACLs only.',
      },
      system: {
        file: 'System.evtx',
        desc: 'Kernel, hardware, drivers, Service Control Manager (SCM), shutdowns (1074), and service installations (7045).',
        access: 'OS Infrastructure & Driver logging.',
      },
      application: {
        file: 'Application.evtx',
        desc: 'Userland software diagnostics, application crashes (1000), database exceptions, and third-party agents.',
        access: 'Userland applications & fault telemetry.',
      },
    };

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-400" />
                <span>Windows Log Channels &amp; Provider Architecture</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Mentor Ravi: &quot;Never interpret an event identifier without its publishing provider. The provider defines what the parameters mean.&quot;
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {(['security', 'system', 'application'] as const).map((ch) => (
                <button
                  key={ch}
                  onClick={() => {
                    sound.playClick();
                    setActiveChannel(ch);
                  }}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg border uppercase transition-all ${
                    activeChannel === ch
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {ch}.evtx
                </button>
              ))}
            </div>
          </div>

          {/* Active Channel Details Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Folder className="w-4 h-4 text-sky-400" />
                CHANNEL PATH: C:\Windows\System32\winevt\Logs\{channelData[activeChannel].file}
              </span>
              <p className="text-xs text-slate-300">{channelData[activeChannel].desc}</p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs">
              {channelData[activeChannel].access}
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
                        {node.id === 'chan-security-evtx' ? (
                          <ShieldCheck className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'chan-system-evtx' ? (
                          <Cpu className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'chan-app-evtx' ? (
                          <Laptop className="w-6 h-6 text-amber-400" />
                        ) : (
                          <FileCode className="w-6 h-6 text-purple-400" />
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
  // 2. Event ID Signpost Doctrine (M07-U1-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm07-eventid-signposts') {
    const nodes = eventIdSignpostsNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-400" />
                <span>Event ID Signpost Doctrine &bull; Context Solves Investigations</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Ravi: &quot;Event identifiers are signposts that tell you where to look; full parameter fields tell you what actually happened.&quot;
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setShowFullHud(!showFullHud);
              }}
              className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                showFullHud
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
              }`}
            >
              {showFullHud ? 'Showing: Full Parameter Context HUD' : 'Showing: Naked Event ID Signpost'}
            </button>
          </div>

          {/* Context vs Signpost Demonstration */}
          <div
            className={`p-4 rounded-xl border flex flex-col gap-2 font-mono text-xs transition-all ${
              showFullHud
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-2">
                {showFullHud ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                )}
                {showFullHud
                  ? 'ACTIONABLE AUDIT RECORD: Event 4625 | Account: ramesh | Host: BLR-BR-WS-04 | SubStatus: 0xC000006A'
                  : 'INCOMPLETE DATA: "Event 4625" (Less than 20% of operational picture; impossible to triage)'}
              </span>
              <Badge
                className={`font-mono text-[10px] ${
                  showFullHud
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}
              >
                {showFullHud ? 'COMPLETE CONTEXT' : 'NAKED SIGNPOST'}
              </Badge>
            </div>
            <div className="p-2 rounded bg-black/60 border border-slate-800 text-[11px] text-slate-300">
              {showFullHud
                ? 'Ground Truth: Bad password entered on local interactive console (LogonType: 2). Security barrier held.'
                : 'Caution: Filing a ticket citing only "Event 4625 occurred" without participating account and host is rejected.'}
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
                        {node.id === 'sign-naked-id' ? (
                          <AlertTriangle className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'sign-full-hud' ? (
                          <Activity className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'sign-substatus-code' ? (
                          <Key className="w-6 h-6 text-sky-400" />
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
  // 3. Provider Integrity & Homograph Number Traps (M07-U1-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm07-provider-integrity') {
    const nodes = providerIntegrityNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-amber-400" />
                <span>Provider Integrity &bull; The Homograph Event ID Collision Trap</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Event 104 in Eventlog = Audit Log Cleared (High Alert!). Event 104 in PrintService = Invoice Printed (Routine).
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 font-mono text-xs">
              ID COLLISION LESSON
            </Badge>
          </div>

          {/* Collision Comparison Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-300">
                  PROVIDER A: Microsoft-Windows-Eventlog (Event 104)
                </span>
                <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30 text-[10px] font-mono">
                  DEFENSE EVASION T1070
                </Badge>
              </div>
              <p className="text-xs text-slate-200">
                CRITICAL ALERT: An administrator or adversary actively wiped the System audit log to destroy forensic traces of tampering!
              </p>
              <p className="text-[11px] text-rose-300/90 font-mono">
                Immediate Escalation: High-severity forensic preservation protocol.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-300">
                  PROVIDER B: PrintService/Operational (Event 104)
                </span>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px] font-mono">
                  BENIGN TELEMETRY
                </Badge>
              </div>
              <p className="text-xs text-slate-200">
                ROUTINE BUSINESS: User sent Invoice_Oct15.pdf to Branch Floor 2 HP LaserJet printer. Zero security relevance.
              </p>
              <p className="text-[11px] text-emerald-300/90 font-mono">
                Ravi Rule: Always check Provider Name + Channel before declaring an alarm.
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
                        {node.id === 'integ-sys-104' ? (
                          <AlertTriangle className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'integ-print-104' ? (
                          <FileText className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'integ-collision-trap' ? (
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
  // 4. Logon Type Matrix: Interactive Triage (M07-U1-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm07-logon-matrix') {
    const nodes = logonMatrixNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const logonTypeDescriptions = {
      2: {
        title: 'Logon Type 2: Interactive Console',
        desc: 'Physical presence: User sat at desk, typed credentials on keyboard, and unlocked the display.',
        attackSurface: 'Local machine console. Suspicious during off-hours (02:45 AM).',
      },
      3: {
        title: 'Logon Type 3: Network (SMB / RPC)',
        desc: 'Remote connection across network over port 445 (SMB) or 135 (RPC). Common for PsExec lateral movement.',
        attackSurface: 'Network lateral movement and remote service execution.',
      },
      10: {
        title: 'Logon Type 10: RemoteInteractive (RDP)',
        desc: 'Terminal Services encrypted graphical desktop over port 3389. Full remote desktop GUI control.',
        attackSurface: 'External or internal RDP sessions. Must audit client IP address.',
      },
    };

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Key className="w-5 h-5 text-sky-400" />
                <span>Logon Type Matrix &bull; Interactive Console vs Network vs RDP</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                LogonType transforms an abstract Event 4624 into a physical or network vector you can investigate.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {([2, 3, 10] as const).map((lt) => (
                <button
                  key={lt}
                  onClick={() => {
                    sound.playClick();
                    setActiveLogonType(lt);
                  }}
                  className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                    activeLogonType === lt
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Type {lt} {lt === 2 ? '(Console)' : lt === 3 ? '(Network)' : '(RDP)'}
                </button>
              ))}
            </div>
          </div>

          {/* Active Logon Type Explainer Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col gap-2 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Laptop className="w-4 h-4 text-sky-400" />
                {logonTypeDescriptions[activeLogonType].title}
              </span>
              <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-[10px] font-mono">
                LOGONTYPE: {activeLogonType}
              </Badge>
            </div>
            <p className="text-xs text-slate-300">{logonTypeDescriptions[activeLogonType].desc}</p>
            <p className="text-xs text-sky-300/90 font-mono pt-1">
              <strong>Vector Evaluation: </strong>
              {logonTypeDescriptions[activeLogonType].attackSurface}
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
                        {node.id === 'logon-type-2' ? (
                          <Laptop className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'logon-type-3' ? (
                          <Network className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'logon-type-10' ? (
                          <Monitor className="w-6 h-6 text-purple-400" />
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
  // 5. Event 4672 Privileged Activity Context (M07-U1-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm07-privilege-context') {
    const nodes = privilegeContextNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span>Event 4672 Privileged Activity Context &bull; Admin Baseline vs Anomaly</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Event 4672 assigns sensitive rights (SeDebugPrivilege, SeBackupPrivilege). Change control separates IT from intrusions.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setPrivilegeContextMode('backup');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  privilegeContextMode === 'backup'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                SVC-BACKUP (Approved CHG-8910)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setPrivilegeContextMode('ramesh');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  privilegeContextMode === 'ramesh'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                ramesh at 02:46 AM (Zero Ticket)
              </button>
            </div>
          </div>

          {/* Context Comparison Banner */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono transition-all ${
              privilegeContextMode === 'backup'
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                {privilegeContextMode === 'backup' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                )}
                {privilegeContextMode === 'backup'
                  ? 'BENIGN BASELINE: Scheduled backup service account at 01:00 AM with valid change ticket.'
                  : 'SUSPICIOUS ANOMALY: Finance user receiving SeDebugPrivilege at 02:46 AM without duty or ticket!'}
              </span>
              <p className="text-xs text-slate-300">
                {privilegeContextMode === 'backup'
                  ? 'Document change notice CHG-8910 reference and close alert as verified True Positive benign.'
                  : 'Demand immediate triage: Account and process trees must be audited for credential abuse.'}
              </p>
            </div>
            <Badge
              className={`font-mono text-xs ${
                privilegeContextMode === 'backup'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}
            >
              {privilegeContextMode === 'backup' ? 'APPROVED BASELINE' : 'CASE #2026-881 TRIGGER'}
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
                        {node.id === 'priv-4672-event' ? (
                          <Shield className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'priv-assigned-rights' ? (
                          <Key className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'priv-benign-admin' ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <AlertTriangle className="w-6 h-6 text-rose-400" />
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
  // 6. The Account Owner vs Person Identity Doctrine (M07-U1-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm07-identity-doctrine') {
    const nodes = identityDoctrineNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-sky-400" />
                <span>Account Owner vs Person Identity Doctrine &bull; Linguistic Precision</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Ravi: &quot;Never write &apos;Ramesh logged on at 2:45 AM.&apos; Write &apos;Account ramesh successfully authenticated at 2:45 AM.&apos;&quot;
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setIdentityVerifyMode(identityVerifyMode === 'auth-only' ? 'physical-badge' : 'auth-only');
              }}
              className="px-3 py-1 text-xs font-mono rounded-lg border bg-sky-500/20 text-sky-300 border-sky-500/40 hover:bg-sky-500/30"
            >
              {identityVerifyMode === 'auth-only' ? 'View: Credential Match Only' : 'View: Physical Turnstile Verification'}
            </button>
          </div>

          {/* Identity vs Human Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-emerald-400" />
                DIGITAL RECORD: Event 4624 (Account ramesh authenticated successfully)
              </span>
              <p className="text-xs text-slate-300">
                {identityVerifyMode === 'auth-only'
                  ? 'Digital authentication outcome proves correct password hash was supplied.'
                  : 'Physical Turnstile Audit: Ramesh badged out at 18:30 IST. He was asleep at home. Empty chair at Desk 04!'}
              </p>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
              CREDENTIAL THEFT DISPROVEN HUMAN GUILT
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
                        {node.id === 'ident-cred-success' ? (
                          <Key className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'ident-empty-chair' ? (
                          <AlertTriangle className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'ident-presence-verify' ? (
                          <PhoneCall className="w-6 h-6 text-emerald-400" />
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
  // 7. Linux Distribution Log Geography (M07-U2-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm07-linux-log-geography') {
    const nodes = linuxLogGeographyNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const distroData = {
      ubuntu: {
        path: '/var/log/auth.log',
        distro: 'Debian / Ubuntu 22.04 LTS',
        desc: 'Pluggable Authentication Modules (PAM), sudo invocations, OpenSSH logins, and local user sessions.',
      },
      rhel: {
        path: '/var/log/secure',
        distro: 'RHEL 9 / CentOS / Rocky Linux',
        desc: 'Red Hat family authentication audit log file. Identical purpose to auth.log at a different filesystem location.',
      },
      systemd: {
        path: '/var/log/journal/ (journalctl)',
        distro: 'Modern Linux Systemd Journal',
        desc: 'Structured binary storage with microsecond indexing. Query with journalctl -u ssh or journalctl -u sudo.',
      },
    };

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-sky-400" />
                <span>Linux Distribution Log Geography &bull; auth.log vs secure vs journalctl</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Ravi: &quot;Before issuing grep commands, verify the OS release via /etc/os-release and check if rsyslog or journald is active.&quot;
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {(['ubuntu', 'rhel', 'systemd'] as const).map((dst) => (
                <button
                  key={dst}
                  onClick={() => {
                    sound.playClick();
                    setActiveDistro(dst);
                  }}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg border uppercase transition-all ${
                    activeDistro === dst
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {dst}
                </button>
              ))}
            </div>
          </div>

          {/* Active Distro Display Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Folder className="w-4 h-4 text-sky-400" />
                PRIMARY PATH: {distroData[activeDistro].path} &bull; {distroData[activeDistro].distro}
              </span>
              <p className="text-xs text-slate-300">{distroData[activeDistro].desc}</p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs">
              DISTRO VERIFIED
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
                        {node.id === 'geo-auth-log' ? (
                          <FileCode className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'geo-secure-log' ? (
                          <FileText className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'geo-systemd-journal' ? (
                          <Database className="w-6 h-6 text-purple-400" />
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
  // 8. SSH Authentication Stream Triage (M07-U2-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm07-ssh-stream-triage') {
    const nodes = sshStreamTriageNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-sky-400" />
                <span>SSH Authentication Stream &bull; Failed Password vs Accepted PublicKey</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                The operating system changed, but evidence discipline did not: timestamp, account, outcome, socket binding.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setSshStreamMode('failed');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  sshStreamMode === 'failed'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Failed Password Observable
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setSshStreamMode('accepted');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  sshStreamMode === 'accepted'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Accepted PublicKey Observable
              </button>
            </div>
          </div>

          {/* SSH Observable Box */}
          <div
            className={`p-4 rounded-xl border flex flex-col gap-2 font-mono text-xs transition-all ${
              sshStreamMode === 'failed'
                ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-2">
                {sshStreamMode === 'failed' ? (
                  <Ban className="w-4 h-4 text-amber-400" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
                {sshStreamMode === 'failed'
                  ? 'sshd[4912]: Failed password for invalid user admin from 198.51.100.5 port 42110 ssh2'
                  : 'sshd[5120]: Accepted publickey for deployer from 10.10.10.20 port 51220 ssh2: RSA SHA256:...'}
              </span>
              <Badge
                className={`font-mono text-[10px] ${
                  sshStreamMode === 'failed'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}
              >
                {sshStreamMode === 'failed' ? 'DENIED SCANNER PROBE' : 'VALID RSA KEY AUTH'}
              </Badge>
            </div>
            <div className="p-2 rounded bg-black/60 border border-slate-800 text-[11px] text-slate-300">
              {sshStreamMode === 'failed'
                ? 'Proves the authentication barrier held. Ephemeral client port 42110 maps to external firewall state table.'
                : 'Valid cryptographic token used by automated CI/CD server 10.10.10.20. Key fingerprint verified against inventory.'}
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
                        {node.id === 'ssh-failed-pw' ? (
                          <Ban className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'ssh-accepted-key' ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'ssh-source-socket' ? (
                          <Network className="w-6 h-6 text-sky-400" />
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
  // 9. The SSH Brute-Force Triage Doctrine (M07-U2-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm07-ssh-brute-force-doctrine') {
    const nodes = sshBruteForceDoctrineNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span>SSH Brute-Force Triage &bull; The Subsequent Accepted Logon Rule</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Ravi: &quot;Never close an SSH brute force alert by looking only at the failures. Always search for &apos;Accepted&apos; within the window.&quot;
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setSshBruteState('held');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  sshBruteState === 'held'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Scenario A: Barrier Held (Benign FP)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setSshBruteState('pivot');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  sshBruteState === 'pivot'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Scenario B: Compromise Pivot (🚨 Alert)
              </button>
            </div>
          </div>

          {/* Brute Force Comparison Box */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono transition-all ${
              sshBruteState === 'held'
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                {sshBruteState === 'held' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                )}
                {sshBruteState === 'held'
                  ? 'SCENARIO A: 4,200 failed attempts -> Zero accepted logons. Fail2ban dropped offending IP.'
                  : 'SCENARIO B: 4,199 failed attempts -> 1 Accepted password for account support! Interactive shell spawned!'}
              </span>
              <p className="text-xs text-slate-300">
                {sshBruteState === 'held'
                  ? 'Document scanner probe volume, confirm zero successes, verify firewall block, and close without alarm.'
                  : 'Critical breach confirmed: Password was cracked. Immediate host isolation required!'}
              </p>
            </div>
            <Badge
              className={`font-mono text-xs ${
                sshBruteState === 'held'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}
            >
              {sshBruteState === 'held' ? 'ATTACK REPELLED ✓' : 'CRITICAL INTRUSION 🚨'}
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
                        {node.id === 'brute-fail-volume' ? (
                          <Activity className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'brute-barrier-held' ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'brute-accepted-pivot' ? (
                          <AlertTriangle className="w-6 h-6 text-rose-400" />
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
  // 10. Linux Service Architecture & Systemd Daemons (M07-U2-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm07-systemd-services') {
    const nodes = systemdServicesNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Workflow className="w-5 h-5 text-sky-400" />
                <span>Linux Service Architecture &bull; Systemd Daemons &amp; Persistence</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Systemd PID 1 orchestrates background daemons. Adversaries install custom .service files for persistence across reboots.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveSystemdUnit('nginx');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  activeSystemdUnit === 'nginx'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Approved: nginx.service
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveSystemdUnit('miner');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  activeSystemdUnit === 'miner'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Rogue: miner.service (/tmp/)
              </button>
            </div>
          </div>

          {/* Unit Comparison Display */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs transition-all ${
              activeSystemdUnit === 'nginx'
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="space-y-1 text-left">
              <span className="font-bold flex items-center gap-2">
                {activeSystemdUnit === 'nginx' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                )}
                {activeSystemdUnit === 'nginx'
                  ? 'UNIT: /lib/systemd/system/nginx.service | User: www-data | ExecStart=/usr/sbin/nginx'
                  : 'ROGUE PERSISTENCE: /etc/systemd/system/miner.service | ExecStart=/tmp/.x/kworker (100% CPU)'}
              </span>
              <p className="text-slate-300">
                {activeSystemdUnit === 'nginx'
                  ? 'Legitimate daemon running under low-privilege service account. Ports 80/443 bound.'
                  : 'Adversary backdoor configured to autostart upon boot. Immediate removal and isolation required.'}
              </p>
            </div>
            <Badge
              className={`font-mono text-xs ${
                activeSystemdUnit === 'nginx'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}
            >
              {activeSystemdUnit === 'nginx' ? 'APPROVED PRODUCTION' : 'PERSISTENCE T1543.002'}
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
                        {node.id === 'srv-systemd-pid1' ? (
                          <Cpu className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'srv-daemon-worker' ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'srv-unit-status' ? (
                          <Activity className="w-6 h-6 text-purple-400" />
                        ) : (
                          <AlertTriangle className="w-6 h-6 text-rose-400" />
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
  // 11. Sudo Audit Trail Dissection (M07-U2-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm07-sudo-audit-trail') {
    const nodes = sudoAuditTrailNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-sky-400" />
                <span>Sudo Audit Trail Dissection &bull; Caller to Target to Binary Command</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Sudo records both original user and target user: ramesh &rarr; root &rarr; COMMAND=/usr/bin/cat /etc/shadow.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setSudoCommandMode('routine');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  sudoCommandMode === 'routine'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Routine Admin: /usr/bin/apt update
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setSudoCommandMode('shadow');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  sudoCommandMode === 'shadow'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Credential Dump: /usr/bin/cat /etc/shadow
              </button>
            </div>
          </div>

          {/* Sudo Dissection Banner */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs transition-all ${
              sudoCommandMode === 'routine'
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="space-y-1 text-left">
              <span className="font-bold flex items-center gap-2">
                {sudoCommandMode === 'routine' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                )}
                {sudoCommandMode === 'routine'
                  ? 'sudo: ramesh : TTY=pts/0 ; PWD=/home/ramesh ; USER=root ; COMMAND=/usr/bin/apt update'
                  : 'sudo: ramesh : TTY=pts/0 ; PWD=/home/ramesh ; USER=root ; COMMAND=/usr/bin/cat /etc/shadow'}
              </span>
              <p className="text-slate-300">
                {sudoCommandMode === 'routine'
                  ? 'Matched approved patch maintenance ticket CHG-8914. Standard admin duties.'
                  : 'Unauthorized credential harvesting observable! Unbroken audit trail links action to ramesh shell.'}
              </p>
            </div>
            <Badge
              className={`font-mono text-xs ${
                sudoCommandMode === 'routine'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}
            >
              {sudoCommandMode === 'routine' ? 'APPROVED TICKET' : 'CREDENTIAL HARVEST 🚨'}
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
                        {node.id === 'sudo-caller-user' ? (
                          <UserCheck className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'sudo-target-root' ? (
                          <Shield className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'sudo-command-binary' ? (
                          <Terminal className="w-6 h-6 text-rose-400" />
                        ) : (
                          <FileCheck className="w-6 h-6 text-emerald-400" />
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
  // 12. The Command Auditing Visibility Boundary (M07-U2-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm07-command-visibility-boundary') {
    const nodes = commandVisibilityBoundaryNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-amber-400" />
                <span>Command Auditing Visibility &bull; Bash History Gap vs Kernel Auditd</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Bash history is easily cleared by killing the terminal. Kernel-level auditd execve hooks cannot be bypassed by shell tampering.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setVisibilityBoundaryMode('bash-history');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  visibilityBoundaryMode === 'bash-history'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Default Shell History (~/.bash_history)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setVisibilityBoundaryMode('auditd');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  visibilityBoundaryMode === 'auditd'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Kernel Audit Subsystem (auditd)
              </button>
            </div>
          </div>

          {/* Visibility Comparison Banner */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs transition-all ${
              visibilityBoundaryMode === 'bash-history'
                ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
            }`}
          >
            <div className="space-y-1 text-left">
              <span className="font-bold flex items-center gap-2">
                {visibilityBoundaryMode === 'bash-history' ? (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
                {visibilityBoundaryMode === 'bash-history'
                  ? 'FLAWED ASSUMPTION: Relying on ~/.bash_history. Erased with unset HISTFILE or kill -9 $$!'
                  : 'KERNEL-LEVEL GROUND TRUTH: auditd execve syscall hooks capture process spawns in /var/log/audit/audit.log!'}
              </span>
              <p className="text-slate-300">
                {visibilityBoundaryMode === 'bash-history'
                  ? 'Ravi: "Missing detail is a limitation to record in your report, not a reason to fabricate a history."'
                  : 'Immutable audit trail capturing command line arguments and UID regardless of shell tampering.'}
              </p>
            </div>
            <Badge
              className={`font-mono text-xs ${
                visibilityBoundaryMode === 'bash-history'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}
            >
              {visibilityBoundaryMode === 'bash-history' ? 'HIGH EVASION RISK' : 'HARDENED FORENSICS ✓'}
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
                        {node.id === 'vis-default-shell-gap' ? (
                          <AlertTriangle className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'vis-auditd-syscalls' ? (
                          <Cpu className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'vis-history-tamper' ? (
                          <EyeOff className="w-6 h-6 text-amber-400" />
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
  // 13. Workstation Baseline Behavioral Profile (M07-U3-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm07-workstation-baseline-profile') {
    const nodes = workstationBaselineProfileNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-sky-400" />
                <span>Workstation Baseline Behavioral Profile HUD</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Ravi: &quot;A baseline describes typical or approved activity. Activity at 02:45 AM deviates from baseline and directs your attention.&quot;
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {(['hours', 'apps', 'accounts', 'deviation'] as const).map((bf) => (
                <button
                  key={bf}
                  onClick={() => {
                    sound.playClick();
                    setBaselineFilter(bf);
                  }}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg border uppercase transition-all ${
                    baselineFilter === bf
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {bf}
                </button>
              ))}
            </div>
          </div>

          {/* Baseline Summary Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-emerald-400">OPERATING HOURS</span>
                <p className="text-xs font-mono text-white">09:00 - 18:00 IST (Mon-Fri)</p>
                <p className="text-xs text-slate-300">Standard business banking shifts in Bengaluru branch.</p>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px] font-mono mt-2 self-start">
                TEMPORAL NORMAL
              </Badge>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-sky-400">APPROVED APPS</span>
                <p className="text-xs font-mono text-white">Office, Chrome, ERP Client</p>
                <p className="text-xs text-slate-300">Finance team standard productivity software suite.</p>
              </div>
              <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-[10px] font-mono mt-2 self-start">
                PROCESS BASELINE
              </Badge>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/30 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-amber-400">DEVIATION SIGNAL</span>
                <p className="text-xs font-mono text-white">02:45 AM: powershell &amp; whoami</p>
                <p className="text-xs text-slate-300">Anomalous hours + LOLBins = Directs investigation.</p>
              </div>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[10px] font-mono mt-2 self-start">
                ATTENTION DIRECTED
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
                        {node.id === 'base-operating-hours' ? (
                          <Clock className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'base-approved-procs' ? (
                          <Laptop className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'base-service-accounts' ? (
                          <UserCheck className="w-6 h-6 text-purple-400" />
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
  // 14. Windows System Event 7045 (Service Installation) (M07-U3-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm07-event-7045-service') {
    const nodes = event7045ServiceNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Workflow className="w-5 h-5 text-sky-400" />
                <span>Windows System Event 7045 &bull; Service Installation &amp; ImagePath</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                SCM logs Event 7045 in System.evtx. Approved agent sensor vs unexplained backdoor service installation.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setServiceCase('approved');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  serviceCase === 'approved'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Approved: CSAgent (CHG-8911)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setServiceCase('unexplained');
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  serviceCase === 'unexplained'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Unexplained: PSEXESVC (02:46 AM)
              </button>
            </div>
          </div>

          {/* Service Case Comparison Display */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs transition-all ${
              serviceCase === 'approved'
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="space-y-1 text-left">
              <span className="font-bold flex items-center gap-2">
                {serviceCase === 'approved' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                )}
                {serviceCase === 'approved'
                  ? 'Event 7045: Service "CSAgent" installed | ImagePath: "C:\\Program Files\\CrowdStrike\\CSAgent.exe"'
                  : 'Event 7045: Service "PSEXESVC" installed | ImagePath: "C:\\Windows\\PSEXESVC.exe" at 02:46:12Z!'}
              </span>
              <p className="text-slate-300">
                {serviceCase === 'approved'
                  ? 'Matches approved change ticket CHG-8911. Binary signed and verified. Document and close.'
                  : 'Zero change ticket. Smoking gun of lateral movement via PsExec! Escalate immediately.'}
              </p>
            </div>
            <Badge
              className={`font-mono text-xs ${
                serviceCase === 'approved'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}
            >
              {serviceCase === 'approved' ? 'VALIDATED CHANGE CONTROL' : 'LATERAL MOVEMENT T1021 🚨'}
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
                        {node.id === 'svc7045-system-log' ? (
                          <FileText className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'svc7045-image-path' ? (
                          <Folder className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'svc7045-change-notice' ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <AlertTriangle className="w-6 h-6 text-rose-400" />
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
  // 15. The Context-Driven Triage Decision (M07-U3-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm07-context-triage-decision') {
    const nodes = contextTriageDecisionNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const checklist = [
      {
        step: 1,
        title: 'Check 1: ImagePath Location',
        desc: 'Is executable inside Program Files or System32? PSEXESVC located directly in C:\\Windows.',
        status: 'ANOMALY DETECTED',
        color: 'text-amber-400',
      },
      {
        step: 2,
        title: 'Check 2: Service Account Context',
        desc: 'Did a legitimate service account spawn it? Launched via remote RPC token of ramesh.',
        status: 'UNAUTHORIZED CREDENTIAL',
        color: 'text-rose-400',
      },
      {
        step: 3,
        title: 'Check 3: Change Control Triangulation',
        desc: 'Does an approved change ticket exist in ITSM? Zero maintenance scheduled for 02:46 AM.',
        status: 'ZERO TICKET -> ESCALATE',
        color: 'text-rose-400',
      },
    ];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Context-Driven Triage Decision &bull; Equilibrium Between Blindness &amp; Panic</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Ravi: &quot;Context helps us avoid both missed concerns and unnecessary alarm.&quot; 3-point escalation verification rule.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {checklist.map((c) => (
                <button
                  key={c.step}
                  onClick={() => {
                    sound.playClick();
                    setTriageEquilibriumStep(c.step);
                  }}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
                    triageEquilibriumStep === c.step
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Gate {c.step}
                </button>
              ))}
            </div>
          </div>

          {/* Active Gate Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                {checklist[triageEquilibriumStep - 1].title}
              </span>
              <p className="text-xs text-slate-300">{checklist[triageEquilibriumStep - 1].desc}</p>
            </div>
            <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30 text-xs">
              {checklist[triageEquilibriumStep - 1].status}
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
                        {node.id === 'ctx-unexplained-install' ? (
                          <AlertTriangle className="w-6 h-6 text-rose-400" />
                        ) : node.id === 'ctx-authorized-ticket' ? (
                          <FileCheck className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'ctx-alarm-avoidance' ? (
                          <Sliders className="w-6 h-6 text-sky-400" />
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
  // 16. Workstation-to-Timeline Evidence Integration (M07-U3-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm07-host-timeline-integration') {
    const nodes = hostTimelineIntegrationNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const timelineTracks = [
      {
        time: '02:44:12Z',
        source: 'BLR-DC-01 (Domain Controller)',
        event: 'Event 4625: Bad Password logon failure for ramesh.',
      },
      {
        time: '02:45:10Z',
        source: 'BLR-BR-WS-04 (Workstation Console)',
        event: 'Event 4625: Bad Password on local console.',
      },
      {
        time: '02:46:12Z',
        source: 'BLR-BR-WS-04 (Service Control Manager)',
        event: 'Event 7045: PSEXESVC installed without ticket! 🚨',
      },
      {
        time: '02:46:25Z',
        source: 'Perimeter Proxy (Zeek Egress)',
        event: '450 KB payload sent to 185.220.101.4:8080.',
      },
    ];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-400" />
                <span>Workstation-to-Timeline Evidence Integration &bull; Master Track</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Ravi: &quot;Now the workstation&apos;s side of the story fits seamlessly into the domain and network timeline.&quot;
              </p>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-mono text-xs">
              MULTI-TRACK CHRONOLOGY SYNCHRONIZED
            </Badge>
          </div>

          {/* Timeline Sequence Steps */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 space-y-2">
            <span className="text-xs font-mono font-bold text-sky-400 block">
              CASE #2026-881 SYNCHRONIZED MULTI-SENSOR RECONSTRUCTION:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 font-mono text-xs">
              {timelineTracks.map((tr, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-black/60 border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block">{tr.time}</span>
                  <p className="text-[10px] text-slate-400">{tr.source}</p>
                  <p className="text-slate-200 text-[11px]">{tr.event}</p>
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
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950 border border-sky-500/30 text-sky-300">
                          {node.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                        {node.id === 'host-verified-links' ? (
                          <Laptop className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'host-unresolved-gaps' ? (
                          <HelpCircle className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'host-timeline-track' ? (
                          <Clock className="w-6 h-6 text-sky-400" />
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
  // 17. The Communication Playbook & Entity Verification (M07-U3-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm07-communication-playbook') {
    const nodes = communicationPlaybookNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const playbookRules = [
      {
        step: 1,
        title: 'Rule 1: No Direct Uncoordinated Inquiries',
        desc: 'Never send direct messages to an account owner on Teams/Slack asking if they executed a malicious tool.',
      },
      {
        step: 2,
        title: 'Rule 2: Anti-Tipping-Off Safeguard',
        desc: 'Direct messaging alerts the adversary who has hijacked the session, prompting them to deploy ransomware or purge logs.',
      },
      {
        step: 3,
        title: 'Rule 3: Supervised Channel via Shift Lead',
        desc: 'Shift Lead Ananya contacts branch HR and uses landline phone to confirm physical whereabouts safely.',
      },
    ];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-emerald-400" />
                <span>The SOC Communication Playbook &bull; Anti-Tipping-Off Safeguard</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Ravi: &quot;Uncoordinated contact alerts the adversary that they are detected, triggering them to wipe endpoints.&quot;
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {playbookRules.map((r) => (
                <button
                  key={r.step}
                  onClick={() => {
                    sound.playClick();
                    setCommsPlaybookStep(r.step);
                  }}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
                    commsPlaybookStep === r.step
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Protocol {r.step}
                </button>
              ))}
            </div>
          </div>

          {/* Active Protocol Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                {playbookRules[commsPlaybookStep - 1].title}
              </span>
              <p className="text-xs text-slate-300">{playbookRules[commsPlaybookStep - 1].desc}</p>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
              PLAYBOOK COMPLIANT ✓
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
                        {node.id === 'comm-playbook-rules' ? (
                          <FileText className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'comm-shift-lead-gate' ? (
                          <UserCheck className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'comm-anti-tipping-off' ? (
                          <ShieldAlert className="w-6 h-6 text-rose-400" />
                        ) : (
                          <PhoneCall className="w-6 h-6 text-purple-400" />
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
  // 18. Scoped Host Summary & Dossier Handoff (M07-U3-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm07-scoped-host-summary') {
    const nodes = scopedHostSummaryNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-400" />
                <span>Scoped Host Summary Dossier &bull; Case #2026-881 Handoff Seal</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Ravi: &quot;We have strengthened the case by checking identities and bounding scope, not just collecting more logs.&quot;
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
              {isDossierSigned ? 'Host Dossier Sealed: Ravi Sign-Off' : 'Click to Sign & Seal Host Dossier'}
            </button>
          </div>

          {/* Dossier Milestone Banner */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                HOST FORENSIC DOSSIER CERTIFIED &bull; READY FOR NETWORK MONITORING (M08)
              </span>
              <p className="text-xs text-slate-300">
                &quot;Host BLR-BR-WS-04: Credential abuse confirmed (ramesh account); PSEXESVC backdoor installed; C2 flow documented.&quot;
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
                {isDossierSigned ? 'MENTOR RAVI SIGNED & SEALED ✓' : 'AWAITING FINAL SUPERVISORY SEAL'}
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
                        {node.id === 'summ-host-id-check' ? (
                          <AlertTriangle className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'summ-scoped-boundaries' ? (
                          <FileText className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'summ-unrelated-excluded' ? (
                          <Filter className="w-6 h-6 text-purple-400" />
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
