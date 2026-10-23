'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { sound } from '@/lib/sound-effects';
import {
  assetInventoryNodes,
  threatVulnNodes,
  personVsCredentialNodes,
  ciaTriadNodes,
  riskMatrixNodes,
  businessImpactNodes,
  phishingAnatomyNodes,
  credentialAttackNodes,
  mfaFatigueNodes,
  malwareTaxonomyNodes,
  insiderThreatNodes,
  networkReconNodes,
  defenseTriadNodes,
  incidentLifecycleNodes,
  alertContainmentNodes,
  defenseInDepthNodes,
  leastPrivilegeNodes,
  zeroTrustNodes,
  VisualNodeItem,
} from './module-03-visual-stories';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Lock,
  AlertTriangle,
  AlertOctagon,
  Check,
  CheckCircle2,
  UserCheck,
  Users,
  Globe,
  Database,
  Server,
  Laptop,
  Monitor,
  Key,
  Clock,
  Activity,
  Zap,
  Layers,
  Network,
  Workflow,
  RadioTower,
  Radio,
  Compass,
  FileText,
  FileSpreadsheet,
  Boxes,
  Search,
  Mail,
  Eye,
  EyeOff,
  Terminal,
  Cpu,
  HardDrive,
  RefreshCw,
  Play,
  RotateCcw,
  Sliders,
  Smartphone,
  AlertCircle,
  Fingerprint,
  Ban,
  Flame,
} from 'lucide-react';

interface Module03GraphicRendererProps {
  style: string;
  selectedNodeId: string;
  onSelectNode: (node: VisualNodeItem) => void;
  animStep: number;
}

export function Module03GraphicRenderer({
  style,
  selectedNodeId,
  onSelectNode,
  animStep,
}: Module03GraphicRendererProps) {
  // Interactive test states for Module 03 scenarios
  const [selectedAssetTier, setSelectedAssetTier] = useState<number>(1);
  const [isVulnerabilityPatched, setIsVulnerabilityPatched] = useState<boolean>(false);
  const [isCredentialCompromised, setIsCredentialCompromised] = useState<boolean>(true);
  const [activeCiaIncident, setActiveCiaIncident] = useState<'normal' | 'ransomware' | 'exfil' | 'tamper'>('normal');
  const [activeRiskLevel, setActiveRiskLevel] = useState<'low' | 'med' | 'high' | 'crit'>('high');
  const [testedBiaAlert, setTestedBiaAlert] = useState<'kiosk' | 'payroll'>('payroll');
  const [isLinkHovered, setIsLinkHovered] = useState<boolean>(false);
  const [activeAttackVector, setActiveAttackVector] = useState<'spray' | 'brute' | 'stuff'>('spray');
  const [isNumberMatchingEnabled, setIsNumberMatchingEnabled] = useState<boolean>(true);
  const [selectedMalwareFamily, setSelectedMalwareFamily] = useState<'ransom' | 'trojan' | 'stealer' | 'worm'>('ransom');
  const [isTurnstileVerified, setIsTurnstileVerified] = useState<boolean>(true);
  const [isProbeSweeping, setIsProbeSweeping] = useState<boolean>(false);
  const [activeControlLayer, setActiveControlLayer] = useState<'prev' | 'det' | 'resp'>('prev');
  const [activeIrStep, setActiveIrStep] = useState<number>(2); // 0=Prep, 1=Detect, 2=Contain, 3=Eradicate
  const [isHostQuarantined, setIsHostQuarantined] = useState<boolean>(false);
  const [isTokenRevoked, setIsTokenRevoked] = useState<boolean>(false);
  const [activeDefenseRing, setActiveDefenseRing] = useState<number>(5); // 5=Perimeter, 4=Network, 3=Endpoint, 1=Data
  const [privilegedMode, setPrivilegedMode] = useState<'standard' | 'admin'>('standard');
  const [isZeroTrustEvaluated, setIsZeroTrustEvaluated] = useState<boolean>(true);

  // Helper to render the active inspection drawer at the bottom of each diagram
  const renderInspector = (node: VisualNodeItem | undefined) => {
    if (!node) return null;
    return (
      <div className="mt-4 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-sky-500/30 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-3 text-left">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
              INSPECTED NODE:
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{node.label}</span>
            {node.badge && (
              <Badge className="bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-500/30 text-[10px] font-mono">
                {node.badge}
              </Badge>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{node.description}</p>
          {node.details && (
            <p className="text-[11px] sm:text-xs text-sky-700 dark:text-sky-300/90 font-mono pt-0.5">{node.details}</p>
          )}
        </div>
        <div className="shrink-0 flex items-center gap-1.5 flex-wrap">
          {node.tags?.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-slate-700 dark:text-slate-300"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // ---------------------------------------------------------------------------
  // 1. Asset Classification & Crown Jewels (M03-U1-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm03-asset-inventory') {
    const nodes = assetInventoryNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl visual-canvas-container bg-slate-50 dark:bg-[#03091e]/95 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl dark:shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-sky-400" />
                <span>Tiered Asset Inventory Pyramid &amp; Crown Jewels Registry</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Classifying enterprise hardware, directory controllers, and core databases to prioritize incident response.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedAssetTier(tier);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold border transition-all ${
                    selectedAssetTier === tier
                      ? 'bg-sky-500 text-slate-950 border-sky-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Tier {tier}
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
                      {node.id === 'asset-crown' && <Database className="w-6 h-6 text-amber-400" />}
                      {node.id === 'asset-dc' && <Server className="w-6 h-6 text-sky-400" />}
                      {node.id === 'asset-endpoint' && <Laptop className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'asset-kiosk' && <Monitor className="w-6 h-6 text-slate-400" />}
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

          {/* Valuation Pyramid Display */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">ENTERPRISE ASSET VALUATION MATRIX</span>
              <span className="text-amber-300 font-bold">FOCUS: TIER {selectedAssetTier} REPUTATIONAL VALUE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5">
              <div className={`p-3 rounded-lg border transition-all ${selectedAssetTier === 1 ? 'bg-amber-950/70 border-amber-400' : 'bg-slate-950 border-slate-800'}`}>
                <div className="text-amber-300 font-bold">Tier 1: Crown Jewels ($$$$)</div>
                <div className="text-[11px] text-slate-300 mt-1">Core PostgreSQL DB • Salaries &amp; Bank Records • DPDP Act Penalties if leaked.</div>
              </div>
              <div className={`p-3 rounded-lg border transition-all ${selectedAssetTier === 2 ? 'bg-sky-950/70 border-sky-400' : 'bg-slate-950 border-slate-800'}`}>
                <div className="text-sky-300 font-bold">Tier 2: Core Infra ($$$)</div>
                <div className="text-[11px] text-slate-300 mt-1">Active Directory DC • Kerberos Identity • Compromise gives Golden Ticket keys.</div>
              </div>
              <div className={`p-3 rounded-lg border transition-all ${selectedAssetTier === 3 ? 'bg-emerald-950/70 border-emerald-400' : 'bg-slate-950 border-slate-800'}`}>
                <div className="text-emerald-300 font-bold">Tier 3: Endpoints ($$)</div>
                <div className="text-[11px] text-slate-300 mt-1">Workstation BLR-BR-WS-04 • Finance Clerk Desktop • Primary EDR sensor triage.</div>
              </div>
              <div className={`p-3 rounded-lg border transition-all ${selectedAssetTier === 4 ? 'bg-purple-950/70 border-purple-400' : 'bg-slate-950 border-slate-800'}`}>
                <div className="text-slate-300 font-bold">Tier 4: Public Displays ($)</div>
                <div className="text-[11px] text-slate-300 mt-1">Reception Lobby Kiosk • Isolated Guest VLAN • Zero internal corporate blast radius.</div>
              </div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 2. Threat vs Vulnerability Collision Engine (M03-U1-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm03-threat-vuln-matrix') {
    const nodes = threatVulnNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl visual-canvas-container bg-slate-50 dark:bg-[#03091e]/95 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl dark:shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-rose-400" />
                <span>Threat vs Vulnerability Collision: Risk = Threat x Vulnerability</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Understanding how motivated threat actors require exposed weaknesses to create actionable enterprise risk.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsVulnerabilityPatched(!isVulnerabilityPatched);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isVulnerabilityPatched
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                  : 'bg-rose-600 text-white border-rose-400 shadow-md animate-pulse'
              }`}
            >
              {isVulnerabilityPatched ? <ShieldCheck className="w-4 h-4" /> : <Flame className="w-4 h-4" />}
              <span>{isVulnerabilityPatched ? 'CVE PATCHED & SYSTEM SHIELDED' : 'APPLY EMERGENCY CVE PATCH'}</span>
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
                      {node.id === 'tv-threat' && <AlertTriangle className="w-6 h-6 text-rose-400" />}
                      {node.id === 'tv-vuln' && <AlertOctagon className="w-6 h-6 text-amber-400" />}
                      {node.id === 'tv-intersection' && <Flame className="w-6 h-6 text-rose-500" />}
                      {node.id === 'tv-shield' && <ShieldCheck className="w-6 h-6 text-emerald-400" />}
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

          {/* Collision HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">RISK EQUATION SIMULATOR</span>
              <span className={isVulnerabilityPatched ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {isVulnerabilityPatched ? 'RISK STATUS: MITIGATED (VULNERABILITY ZEROED)' : 'RISK STATUS: HIGH EXPLOITATION RISK ⚠️'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/40">
                <div className="text-rose-300 font-bold">THREAT ACTOR (CONSTANT)</div>
                <p className="text-slate-300 text-xs mt-1">
                  Ransomware syndicate scanning internet ranges for enterprise web portals. Threat motive and intent are outside our control.
                </p>
              </div>

              <div className={`p-3 rounded-lg border transition-all ${isVulnerabilityPatched ? 'bg-emerald-950/50 border-emerald-500/60' : 'bg-amber-950/40 border-amber-500/40'}`}>
                <div className={isVulnerabilityPatched ? 'text-emerald-300 font-bold' : 'text-amber-300 font-bold'}>
                  {isVulnerabilityPatched ? 'VULNERABILITY: PATCHED ✓' : 'VULNERABILITY: UNPATCHED ✕'}
                </div>
                <p className="text-slate-300 text-xs mt-1">
                  {isVulnerabilityPatched
                    ? 'Security patch v2.4.58 applied. Known CVE-2023-38606 flaw eliminated. Web server returns clean HTTP 404 to probe.'
                    : 'Unpatched Apache remote command execution flaw exposed on perimeter port 443. Remote exploit code freely available.'}
                </p>
              </div>

              <div className={`p-3 rounded-lg border transition-all ${isVulnerabilityPatched ? 'bg-emerald-950/50 border-emerald-500/60' : 'bg-rose-950/60 border-rose-500/70'}`}>
                <div className={isVulnerabilityPatched ? 'text-emerald-300 font-bold' : 'text-rose-300 font-bold'}>
                  {isVulnerabilityPatched ? 'RESULT: ZERO RISK (BLOCKED)' : 'RESULT: ACTIVE EXPLOITATION 🔥'}
                </div>
                <p className="text-slate-200 text-xs mt-1">
                  {isVulnerabilityPatched
                    ? 'Mentor Ananya: "You cannot eliminate the threat actor, but by eliminating the vulnerability, the risk equation equals zero."'
                    : 'The attacker executes shell commands on the server. Data breach and ransomware infection imminent!'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 3. The Person vs The Credential (M03-U1-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm03-person-vs-credential') {
    const nodes = personVsCredentialNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl visual-canvas-container bg-slate-50 dark:bg-[#03091e]/95 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl dark:shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-sky-400" />
                <span>The Person vs The Credential: Objective Forensic Restraint</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Documenting verifiable observable telemetry facts without making speculative personal accusations.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsCredentialCompromised(!isCredentialCompromised);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white border border-sky-400 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Toggle Off-Hours Intrusion Scenario</span>
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
                      {node.id === 'ent-person' && <Users className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'ent-credential' && <Key className="w-6 h-6 text-amber-400" />}
                      {node.id === 'ent-device' && <Laptop className="w-6 h-6 text-sky-400" />}
                      {node.id === 'ent-forensic' && <ShieldCheck className="w-6 h-6 text-purple-400" />}
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

          {/* Forensic Evidence Comparison Screen */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">CASE EVIDENCE: OFF-HOURS WORKSTATION LOGON (02:45 AM IST)</span>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40 text-[10px]">CORRELATION ACTIVE</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-emerald-300 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Physical World Truth (Building Security)</span>
                </div>
                <p className="text-slate-300 text-xs">
                  Turnstile RFID logs confirm employee Ramesh exited CDAC Bengaluru at 18:05 IST. No entry was recorded overnight. Ramesh is physically asleep at home.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-rose-300 font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Digital Telemetry Truth (Active Directory)</span>
                </div>
                <p className="text-slate-300 text-xs">
                  Windows Event ID 4624 records successful network logon for user cdac\FIN-OPS-01 originating from VPN IP 198.51.100.42. Stolen credentials in use!
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#081533] border border-sky-500/30 text-xs sm:text-sm text-sky-200 flex items-start gap-2.5">
              <UserCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-bold">Mentor Ananya&apos;s Forensic Restraint Rule: </strong>
                &ldquo;Never write &lsquo;Ramesh attacked the network&rsquo;. Write: &lsquo;Activity observed under account FIN-OPS-01 on host BLR-BR-WS-04&rsquo;. An account is a credential token, not proof of human presence. Presume innocence until multi-source evidence proves otherwise.&rdquo;
              </div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 4. The CIA Triad Dynamic Balance (M03-U1-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm03-cia-triad') {
    const nodes = ciaTriadNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl visual-canvas-container bg-slate-50 dark:bg-[#03091e]/95 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl dark:shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-400" />
                <span>The CIA Triad Dynamic Balance: Confidentiality, Integrity, Availability</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Evaluating cybersecurity trade-offs and understanding how attacks target distinct pillars of trust.
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveCiaIncident('normal');
                }}
                className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                  activeCiaIncident === 'normal' ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Normal Baseline
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveCiaIncident('ransomware');
                }}
                className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                  activeCiaIncident === 'ransomware' ? 'bg-rose-600 text-white border-rose-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Ransomware (Availability)
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveCiaIncident('exfil');
                }}
                className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                  activeCiaIncident === 'exfil' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Data Exfil (Confidentiality)
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveCiaIncident('tamper');
                }}
                className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                  activeCiaIncident === 'tamper' ? 'bg-purple-600 text-white border-purple-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Tamper (Integrity)
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
                      {node.id === 'cia-conf' && <Lock className="w-6 h-6 text-amber-400" />}
                      {node.id === 'cia-integ' && <CheckCircle2 className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'cia-avail' && <Zap className="w-6 h-6 text-sky-400" />}
                      {node.id === 'cia-balance' && <Compass className="w-6 h-6 text-purple-400" />}
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

          {/* Dynamic Triad Status HUD */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 font-mono text-xs">
            <div className={`p-3.5 rounded-xl border transition-all ${activeCiaIncident === 'exfil' ? 'bg-rose-950/60 border-rose-400 ring-1 ring-rose-500/50' : 'bg-slate-950/60 border-slate-800'}`}>
              <div className="flex items-center justify-between font-bold">
                <span className="text-amber-300">CONFIDENTIALITY</span>
                <Badge className={activeCiaIncident === 'exfil' ? 'bg-rose-500 text-white text-[9px]' : 'bg-emerald-500/20 text-emerald-300 text-[9px]'}>
                  {activeCiaIncident === 'exfil' ? 'BREACHED: 500 MB LEAKED' : 'SECURE (AES-256)'}
                </Badge>
              </div>
              <p className="text-slate-300 text-xs mt-1">Protecting employee PAN numbers, salaries, and customer ledgers from unauthorized viewing.</p>
            </div>

            <div className={`p-3.5 rounded-xl border transition-all ${activeCiaIncident === 'tamper' ? 'bg-rose-950/60 border-rose-400 ring-1 ring-rose-500/50' : 'bg-slate-950/60 border-slate-800'}`}>
              <div className="flex items-center justify-between font-bold">
                <span className="text-emerald-300">INTEGRITY</span>
                <Badge className={activeCiaIncident === 'tamper' ? 'bg-rose-500 text-white text-[9px]' : 'bg-emerald-500/20 text-emerald-300 text-[9px]'}>
                  {activeCiaIncident === 'tamper' ? 'FORGED: ROUTING # ALTERED' : 'VALIDATED (SHA-256)'}
                </Badge>
              </div>
              <p className="text-slate-300 text-xs mt-1">Guarantees financial transaction records and invoice files have not been modified in transit or storage.</p>
            </div>

            <div className={`p-3.5 rounded-xl border transition-all ${activeCiaIncident === 'ransomware' ? 'bg-rose-950/60 border-rose-400 ring-1 ring-rose-500/50' : 'bg-slate-950/60 border-slate-800'}`}>
              <div className="flex items-center justify-between font-bold">
                <span className="text-sky-300">AVAILABILITY</span>
                <Badge className={activeCiaIncident === 'ransomware' ? 'bg-rose-500 text-white text-[9px]' : 'bg-emerald-500/20 text-emerald-300 text-[9px]'}>
                  {activeCiaIncident === 'ransomware' ? 'OFFLINE: DISK ENCRYPTED' : '99.99% UPTIME'}
                </Badge>
              </div>
              <p className="text-slate-300 text-xs mt-1">Ensures payroll portals and branch workstations remain continuously accessible during business operations.</p>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 5. Qualitative Risk Matrix (M03-U1-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm03-risk-matrix') {
    const nodes = riskMatrixNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl visual-canvas-container bg-slate-50 dark:bg-[#03091e]/95 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl dark:shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-sky-400" />
                <span>5x5 Qualitative Risk Matrix: Likelihood x Impact</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Calibrating incident severity and SLA response times based on mathematical collision probability and asset criticality.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {(['low', 'med', 'high', 'crit'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveRiskLevel(lvl);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                    activeRiskLevel === lvl
                      ? lvl === 'crit'
                        ? 'bg-rose-600 text-white border-rose-400'
                        : lvl === 'high'
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : lvl === 'med'
                        ? 'bg-yellow-500 text-slate-950 border-yellow-400'
                        : 'bg-emerald-500 text-slate-950 border-emerald-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {lvl.toUpperCase()}
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
                      {node.id === 'risk-mat-low' && <Check className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'risk-mat-med' && <Sliders className="w-6 h-6 text-yellow-400" />}
                      {node.id === 'risk-mat-high' && <AlertTriangle className="w-6 h-6 text-amber-400" />}
                      {node.id === 'risk-mat-crit' && <AlertOctagon className="w-6 h-6 text-rose-400" />}
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

          {/* Matrix SLA HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">SEVERITY SLA OPERATIONAL DISCIPLINE</span>
              <span className="text-sky-300">
                {activeRiskLevel === 'crit' && 'SEV-1 CRITICAL: 15-MINUTE TRIAGE SLA • EMERGENCY ESCALATION'}
                {activeRiskLevel === 'high' && 'SEV-2 HIGH: 30-MINUTE TRIAGE SLA • TIER 2 SCOPING'}
                {activeRiskLevel === 'med' && 'SEV-3 MEDIUM: 4-HOUR TRIAGE SLA • CHECKLIST AUDIT'}
                {activeRiskLevel === 'low' && 'SEV-4 LOW: 24-HOUR TRIAGE SLA • ROUTINE LOGGING'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
              {activeRiskLevel === 'crit' && (
                <span className="text-rose-300">
                  Critical Incident: Confirmed active ransomware deployment or database compromise. Immediate host isolation, incident manager call bridge, executive notification.
                </span>
              )}
              {activeRiskLevel === 'high' && (
                <span className="text-amber-300">
                  High Priority: Suspicious LOLBIN execution downloading external payload on staff laptop. L1 analyst scopes execution tree and isolates host.
                </span>
              )}
              {activeRiskLevel === 'med' && (
                <span className="text-yellow-300">
                  Medium Priority: Multiple off-hours logon failures or adware alert quarantined by local sensor. L1 analyst reviews user baseline.
                </span>
              )}
              {activeRiskLevel === 'low' && (
                <span className="text-emerald-300">
                  Low Priority: Single isolated port scan against firewall interface. Logged for trend analytics without disruptive escalation.
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
  // 6. Business Context Triage Triangulation (M03-U1-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm03-business-impact-gauge') {
    const nodes = businessImpactNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl visual-canvas-container bg-slate-50 dark:bg-[#03091e]/95 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl dark:shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-sky-400" />
                <span>Business Context Triage Triangulation: Alert Signature vs Asset Value</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Why identical technical alert signatures require radically different response urgency depending on target asset value.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setTestedBiaAlert('kiosk');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  testedBiaAlert === 'kiosk' ? 'bg-slate-700 text-white border-slate-500' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Alert #101: Lobby Kiosk ($)
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setTestedBiaAlert('payroll');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  testedBiaAlert === 'payroll' ? 'bg-rose-600 text-white border-rose-400 shadow-md' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Alert #102: Payroll DB ($$$$)
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
                      {node.id === 'bia-kiosk' && <Monitor className="w-6 h-6 text-slate-400" />}
                      {node.id === 'bia-payroll' && <Database className="w-6 h-6 text-rose-400" />}
                      {node.id === 'bia-sla' && <Clock className="w-6 h-6 text-amber-400" />}
                      {node.id === 'bia-matrix' && <Compass className="w-6 h-6 text-emerald-400" />}
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

          {/* Triangulation Comparison Banner */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">BUSINESS IMPACT COMPARISON</span>
              <span className={testedBiaAlert === 'payroll' ? 'text-rose-400 font-bold' : 'text-slate-400 font-bold'}>
                {testedBiaAlert === 'payroll' ? 'SEV-1 CRITICAL INCIDENT (15 MIN SLA)' : 'SEV-4 ROUTINE LOG (24 HOUR SLA)'}
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
              {testedBiaAlert === 'payroll' ? (
                <div>
                  <strong className="text-rose-300">Target Asset: Core PostgreSQL Payroll Database (FIN-DB-01)</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    Holds employee bank details and corporate revenue records. Although the technical signature is an identical Nmap SYN probe, the business impact of a breach is catastrophic. Escalated immediately to Tier 2 with an emergency containment bridge!
                  </p>
                </div>
              ) : (
                <div>
                  <strong className="text-slate-300">Target Asset: CDAC Lobby Visitor Reception Kiosk</strong>
                  <p className="text-slate-400 text-xs mt-1">
                    Contains no proprietary data and is isolated on the guest VLAN with zero connection to the corporate domain. Handled as a routine scan without waking up the on-call incident commander.
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
  // 7. Anatomy of a Phishing Email (M03-U2-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm03-phishing-anatomy') {
    const nodes = phishingAnatomyNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl visual-canvas-container bg-slate-50 dark:bg-[#03091e]/95 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl dark:shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-sky-400" />
                <span>Anatomy of a Phishing Email &amp; Safe Header Inspection</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Dissecting lookalike spoofed domains, artificial urgency lures, and harvesting links without detonating payloads.
              </p>
            </div>
            <button
              type="button"
              onMouseEnter={() => setIsLinkHovered(true)}
              onMouseLeave={() => setIsLinkHovered(false)}
              onClick={() => {
                sound.playClick();
                setIsLinkHovered(!isLinkHovered);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isLinkHovered ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>{isLinkHovered ? 'LINK HOVERED: DESTINATION REVEALED' : 'HOVER LINK TO PREVIEW URL'}</span>
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
                      {node.id === 'phish-sender' && <Mail className="w-6 h-6 text-rose-400" />}
                      {node.id === 'phish-urgency' && <Clock className="w-6 h-6 text-amber-400" />}
                      {node.id === 'phish-link' && <Search className="w-6 h-6 text-purple-400" />}
                      {node.id === 'phish-report' && <ShieldCheck className="w-6 h-6 text-emerald-400" />}
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

          {/* Email Inspection Preview Mockup */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-slate-400">
                <span>From: CDAC Central Payroll &lt;payroll-alert@cdac-portal-verify.com&gt;</span>
                <Badge className="bg-rose-500/20 text-rose-300 text-[9px]">SPF: FAIL • LOOKALIKE DOMAIN</Badge>
              </div>
              <div className="text-slate-300 font-bold">Subject: URGENT: Salary Disbursement Suspended Within 2 Hours!</div>
              <div className="text-slate-300 pt-1 leading-relaxed">
                Dear Employee, your bank routing number was rejected by the clearing house. Please update your credentials immediately to avoid withholding of monthly salary:
              </div>
              <div className="pt-1.5">
                <span className="text-sky-400 underline cursor-pointer font-bold">
                  https://portal.cdac.in/verify-login
                </span>
              </div>
            </div>

            {/* Status Bar Preview */}
            <div className="p-2.5 rounded-lg bg-[#061226] border border-sky-500/30 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-bold">BROWSER STATUS BAR DESTINATION:</span>
              <span className={isLinkHovered ? 'text-rose-400 font-bold animate-pulse' : 'text-slate-500'}>
                {isLinkHovered ? '⚠️ REAL DESTINATION: http://198.51.100.23/cdac-login/auth.php (HARVESTER)' : 'Hover over link above to reveal underlying IP address'}
              </span>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 8. Credential Attack Methodologies (M03-U2-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm03-credential-attack-sim') {
    const nodes = credentialAttackNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl visual-canvas-container bg-slate-50 dark:bg-[#03091e]/95 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl dark:shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Key className="w-5 h-5 text-sky-400" />
                <span>Credential Attack Methodologies &amp; Event ID 4625 Telemetry</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Comparing brute force, stealth password spraying, and leaked credential stuffing against Active Directory.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveAttackVector('spray');
                }}
                className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                  activeAttackVector === 'spray' ? 'bg-sky-500 text-slate-950 border-sky-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Password Spraying (500 Accts)
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveAttackVector('brute');
                }}
                className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                  activeAttackVector === 'brute' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Brute Force (1 Acct)
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveAttackVector('stuff');
                }}
                className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                  activeAttackVector === 'stuff' ? 'bg-purple-600 text-white border-purple-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Credential Stuffing
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
                      {node.id === 'cred-brute' && <Terminal className="w-6 h-6 text-rose-400" />}
                      {node.id === 'cred-spray' && <Boxes className="w-6 h-6 text-sky-400" />}
                      {node.id === 'cred-stuff' && <Database className="w-6 h-6 text-amber-400" />}
                      {node.id === 'cred-event' && <FileText className="w-6 h-6 text-emerald-400" />}
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

          {/* Attack Mechanism Comparison HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">TACTICAL MECHANISM &amp; SIEM DETECTION</span>
              <span className="text-sky-300 font-bold">
                {activeAttackVector === 'spray' && 'PASSWORD SPRAY: 1 PASSWORD × 500 ACCOUNTS (STEALTH LOCKOUT EVASION)'}
                {activeAttackVector === 'brute' && 'BRUTE FORCE: 10,000 PASSWORDS × 1 ACCOUNT (TRIGGERS EVENT 4740 LOCKOUT)'}
                {activeAttackVector === 'stuff' && 'CREDENTIAL STUFFING: REPLAYING BREACHED CREDENTIALS FROM WEB LEAKS'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <div className="text-emerald-300 font-bold">Windows Security Event ID 4625 Telemetry:</div>
              <p className="pt-1">
                LogonType: 3 (Network) • Status: 0xC000006A (Bad Password) • Workstation Name: Kali-Attacker-01. SIEM correlates multi-account failures across 10 minutes to detect password spraying before an account is cracked.
              </p>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 9. MFA Push Fatigue & Bypass Mitigation (M03-U2-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm03-mfa-fatigue-radar') {
    const nodes = mfaFatigueNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl visual-canvas-container bg-slate-50 dark:bg-[#03091e]/95 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl dark:shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-sky-400" />
                <span>MFA Push Fatigue &amp; Phishing-Resistant FIDO2 Defenses</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                How number matching challenges and hardware FIDO2 keys neutralize nocturnal push prompt flooding.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsNumberMatchingEnabled(!isNumberMatchingEnabled);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isNumberMatchingEnabled ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-rose-600 text-white border-rose-400 animate-pulse'
              }`}
            >
              {isNumberMatchingEnabled ? <ShieldCheck className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              <span>{isNumberMatchingEnabled ? 'NUMBER MATCHING ACTIVE ✓' : 'SIMPLE APPROVE/DENY (VULNERABLE)'}</span>
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
                      {node.id === 'mfa-bomb' && <Smartphone className="w-6 h-6 text-rose-400" />}
                      {node.id === 'mfa-number' && <Fingerprint className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'mfa-fido2' && <Key className="w-6 h-6 text-sky-400" />}
                      {node.id === 'mfa-policy' && <Shield className="w-6 h-6 text-purple-400" />}
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

          {/* MFA Simulation HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">MOBILE AUTHENTICATOR APP DISPLAY (03:00 AM IST)</span>
              <span className={isNumberMatchingEnabled ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {isNumberMatchingEnabled ? 'PROTECTED: EMPLOYEE MUST ENTER 2-DIGIT CODE' : 'ALERT: 50 PUSH NOTIFICATIONS FLOODING PHONE'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200">
              {isNumberMatchingEnabled ? (
                <div className="space-y-1">
                  <div className="text-emerald-300 font-bold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Number Matching Enforced: Code [ 48 ] Displayed on Attacker&apos;s Screen</span>
                  </div>
                  <p className="text-slate-300 text-xs">
                    The half-asleep employee cannot blindly tap &ldquo;Approve&rdquo; because they cannot see the number &lsquo;48&rsquo; on the attacker&apos;s monitor. The prompt expires safely, completely neutralizing MFA fatigue!
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="text-rose-300 font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>Vulnerable Prompt: Single &ldquo;Approve&rdquo; Button Displayed</span>
                  </div>
                  <p className="text-slate-300 text-xs">
                    Adversary sends repeated prompts at 3:00 AM hoping the exhausted employee taps &ldquo;Approve&rdquo; just to silence the buzzing phone. Without number matching, credentials are breached!
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
  // 10. Malware Taxonomy & Execution Vectors (M03-U2-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm03-malware-taxonomy') {
    const nodes = malwareTaxonomyNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl visual-canvas-container bg-slate-50 dark:bg-[#03091e]/95 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl dark:shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span>Malware Taxonomy: Ransomware, Trojans, InfoStealers &amp; Worms</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Categorizing malicious software by behavior, persistence mechanisms, and lateral movement footprints.
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {(['ransom', 'trojan', 'stealer', 'worm'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedMalwareFamily(m);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                    selectedMalwareFamily === m ? 'bg-sky-500 text-slate-950 border-sky-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {m.toUpperCase()}
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
                      {node.id === 'mal-ransom' && <AlertOctagon className="w-6 h-6 text-rose-400" />}
                      {node.id === 'mal-trojan' && <Boxes className="w-6 h-6 text-amber-400" />}
                      {node.id === 'mal-stealer' && <Key className="w-6 h-6 text-purple-400" />}
                      {node.id === 'mal-worm' && <Workflow className="w-6 h-6 text-emerald-400" />}
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

          {/* Malware Behavioral Inspector HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">BEHAVIORAL SIGNATURE INSPECTOR</span>
              <span className="text-amber-300 font-bold">CATEGORY: {selectedMalwareFamily.toUpperCase()}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200">
              {selectedMalwareFamily === 'ransom' && (
                <div>
                  <strong className="text-rose-300">Ransomware Behavioral Footprint:</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    Spawns &lsquo;vssadmin.exe delete shadows /all /quiet&rsquo; to prevent backup rollback, iterates C:\ files encrypting with AES-256 + RSA-4096, and drops README_RECOVERY.txt. Immediate host network isolation mandatory!
                  </p>
                </div>
              )}
              {selectedMalwareFamily === 'trojan' && (
                <div>
                  <strong className="text-amber-300">Trojan Dropper Footprint:</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    Delivered via double-extension (Invoice_2026.pdf.exe) or malicious macro. Drops secondary payloads into %TEMP% or %APPDATA% and registers scheduled tasks for persistence.
                  </p>
                </div>
              )}
              {selectedMalwareFamily === 'stealer' && (
                <div>
                  <strong className="text-purple-300">InfoStealer Footprint:</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    Scrapes SQLite databases in %LOCALAPPDATA%\Google\Chrome\User Data\Default\Network\Cookies. Hijacks active session tokens to bypass multi-factor authentication.
                  </p>
                </div>
              )}
              {selectedMalwareFamily === 'worm' && (
                <div>
                  <strong className="text-emerald-300">Network Worm Footprint:</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    Autonomously scans subnet on Port 445 (SMB) exploiting buffer overflow vulnerabilities (e.g. EternalBlue). Spreads laterally without human interaction if VLAN boundaries are absent.
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
  // 11. Insider Threat Observables vs Presumptions (M03-U2-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm03-insider-threat-indicators') {
    const nodes = insiderThreatNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl visual-canvas-container bg-slate-50 dark:bg-[#03091e]/95 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl dark:shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-sky-400" />
                <span>Insider Threat Observables: Technical Evidence vs Speculation</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Correlating high-volume USB transfer logs with physical turnstile badge entries to avoid false accusations.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsTurnstileVerified(!isTurnstileVerified);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white border border-sky-400 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Toggle Physical Turnstile Audit</span>
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
                      {node.id === 'insider-bulk' && <HardDrive className="w-6 h-6 text-amber-400" />}
                      {node.id === 'insider-badge' && <UserCheck className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'insider-presume' && <AlertTriangle className="w-6 h-6 text-rose-400" />}
                      {node.id === 'insider-dlp' && <ShieldCheck className="w-6 h-6 text-purple-400" />}
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

          {/* Telemetry Correlation Screen */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">MULTI-SOURCE CORRELATION EVIDENCE LEDGER</span>
              <Badge className="bg-amber-500/20 text-amber-300 text-[10px]">EVENT ID 6416 + PHYSICAL RFID</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-amber-300 font-bold">1. Endpoint Telemetry (Fact)</div>
                <p className="text-slate-300 text-xs mt-1">
                  At 23:45 UTC, 45 GB archive written to Kingston USB flash drive from account FIN-OPS-01 on workstation BLR-BR-WS-04.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-emerald-300 font-bold">2. Physical Turnstile Audit (Fact)</div>
                <p className="text-slate-300 text-xs mt-1">
                  Employee badge was never scanned after 18:05 IST. The employee was not physically in the cubicle when the transfer occurred!
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-200">
              ✓ Analyst Conclusion: The workstation was compromised by remote malware or unauthorized remote desktop session. Rushing to accuse the employee would have allowed the real external attacker to escape undetected.
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 12. Network Reconnaissance & Port Sweeps (M03-U2-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm03-network-recon-scanner') {
    const nodes = networkReconNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl visual-canvas-container bg-slate-50 dark:bg-[#03091e]/95 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl dark:shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-sky-400" />
                <span>Network Reconnaissance &amp; Decoy Honeypot Tripwires</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Detecting stealth TCP SYN port sweeps and catching lateral scanners on zero-false-positive decoy canary ports.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsProbeSweeping(!isProbeSweeping);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isProbeSweeping ? 'bg-rose-600 text-white border-rose-400 animate-pulse' : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{isProbeSweeping ? 'PORT SWEEP DETECTED ⚠️' : 'FIRE TEST PORT SWEEP'}</span>
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
                      {node.id === 'scan-syn' && <Search className="w-6 h-6 text-amber-400" />}
                      {node.id === 'scan-zeek' && <Activity className="w-6 h-6 text-sky-400" />}
                      {node.id === 'scan-honeypot' && <ShieldAlert className="w-6 h-6 text-rose-400" />}
                      {node.id === 'scan-triage' && <Workflow className="w-6 h-6 text-emerald-400" />}
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

          {/* Recon Radar Display */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">INTERNAL NETWORK IDS RADAR (SURICATA &amp; ZEEK)</span>
              <span className={isProbeSweeping ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                {isProbeSweeping ? 'ALARM: 50 PORTS TOUCHED IN 2 SECONDS (10.10.50.12)' : 'BASELINE: CLEAN TRAFFIC'}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 text-center">
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Port 21 FTP</div>
                <div className="text-xs font-bold text-rose-400">SYN RECV</div>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Port 22 SSH</div>
                <div className="text-xs font-bold text-rose-400">SYN RECV</div>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Port 80 HTTP</div>
                <div className="text-xs font-bold text-rose-400">SYN RECV</div>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Port 445 SMB</div>
                <div className="text-xs font-bold text-rose-400">SYN RECV</div>
              </div>
              <div className="p-2 rounded bg-rose-950/80 border border-rose-500 animate-pulse">
                <div className="text-[10px] text-rose-200">Port 4444 (HONEYPOT)</div>
                <div className="text-xs font-bold text-white">TRIPWIRE 🔥</div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
              Honeypot Logic: Port 4444 is an unadvertised decoy canary. Zero legitimate business traffic ever touches this socket. Any connection attempt yields 100% confidence of unauthorized reconnaissance!
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 13. The Defensive Controls Triad (M03-U3-C1 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm03-defense-triad') {
    const nodes = defenseTriadNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl visual-canvas-container bg-slate-50 dark:bg-[#03091e]/95 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl dark:shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-sky-400" />
                <span>The Defensive Controls Triad: Preventive, Detective &amp; Responsive</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Understanding how layered security mechanisms work in concert: Prevention blocks, Detection alerts, Response contains.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {(['prev', 'det', 'resp'] as const).map((ctrl) => (
                <button
                  key={ctrl}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveControlLayer(ctrl);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                    activeControlLayer === ctrl
                      ? ctrl === 'prev'
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : ctrl === 'det'
                        ? 'bg-sky-500 text-slate-950 border-sky-400'
                        : 'bg-purple-600 text-white border-purple-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {ctrl === 'prev' ? 'Preventive' : ctrl === 'det' ? 'Detective' : 'Responsive'}
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
                      {node.id === 'ctrl-prev' && <ShieldCheck className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'ctrl-det' && <Activity className="w-6 h-6 text-sky-400" />}
                      {node.id === 'ctrl-resp' && <RotateCcw className="w-6 h-6 text-purple-400" />}
                      {node.id === 'ctrl-triad-harmony' && <Compass className="w-6 h-6 text-amber-400" />}
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

          {/* Triad Symbiosis Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 font-mono text-xs">
            <div className={`p-3.5 rounded-xl border transition-all ${activeControlLayer === 'prev' ? 'bg-emerald-950/60 border-emerald-400 shadow-md' : 'bg-slate-950/60 border-slate-800'}`}>
              <div className="text-emerald-300 font-bold">1. Preventive Controls (Stop Harm)</div>
              <p className="text-slate-300 text-xs mt-1">
                Next-Gen Firewall rules, Multi-Factor Authentication, AppLocker script blocks, and least privilege access tokens.
              </p>
            </div>

            <div className={`p-3.5 rounded-xl border transition-all ${activeControlLayer === 'det' ? 'bg-sky-950/60 border-sky-400 shadow-md' : 'bg-slate-950/60 border-slate-800'}`}>
              <div className="text-sky-300 font-bold">2. Detective Controls (Notice Signs)</div>
              <p className="text-slate-300 text-xs mt-1">
                SIEM anomaly rules, EDR behavioral sensors, Zeek flow taps, and honeypot canary listeners detecting active probes.
              </p>
            </div>

            <div className={`p-3.5 rounded-xl border transition-all ${activeControlLayer === 'resp' ? 'bg-purple-950/60 border-purple-400 shadow-md' : 'bg-slate-950/60 border-slate-800'}`}>
              <div className="text-purple-300 font-bold">3. Responsive Controls (Contain &amp; Recover)</div>
              <p className="text-slate-300 text-xs mt-1">
                EDR network isolation of BLR-BR-WS-04, session token revocation, and immutable backup restoration to return to clean state.
              </p>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 14. Incident Response Lifecycle (M03-U3-C1 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm03-incident-lifecycle') {
    const nodes = incidentLifecycleNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const irStages = [
      { step: 0, title: '1. Preparation', desc: 'Pre-approved containment authority, configured EDR sensors, and approved SOP playbooks.' },
      { step: 1, title: '2. Detection & Analysis', desc: 'Triage alert queue, confirm True Positive, scope execution tree, and package ticket docket.' },
      { step: 2, title: '3. Containment', desc: 'Sever endpoint network wire via EDR and revoke Active Directory Kerberos tickets.' },
      { step: 3, title: '4. Eradication & Recovery', desc: 'Reimage infected OS from golden baseline, patch root-cause CVE, and restore data.' },
    ];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl visual-canvas-container bg-slate-50 dark:bg-[#03091e]/95 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl dark:shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Workflow className="w-5 h-5 text-sky-400" />
                <span>NIST SP 800-61r2 Incident Response Lifecycle</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Step-by-step methodology: Preparation, Detection &amp; Analysis, Containment, Eradication &amp; Recovery.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveIrStep((prev) => (prev + 1) % 4);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white border border-sky-400 transition-all flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Advance Lifecycle Step ({activeIrStep + 1}/4)</span>
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
                      {node.id === 'ir-prep' && <FileSpreadsheet className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'ir-detect' && <Activity className="w-6 h-6 text-sky-400" />}
                      {node.id === 'ir-contain' && <ShieldAlert className="w-6 h-6 text-amber-400" />}
                      {node.id === 'ir-erad-rec' && <RotateCcw className="w-6 h-6 text-purple-400" />}
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
            {irStages.map((st) => (
              <div
                key={st.step}
                onClick={() => {
                  sound.playClick();
                  setActiveIrStep(st.step);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  activeIrStep === st.step ? 'bg-sky-950/80 border-sky-400 ring-1 ring-sky-500/50 shadow-md' : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-white">
                  <span>{st.title}</span>
                  {activeIrStep === st.step && <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />}
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
  // 15. Active Alert Containment HUD (M03-U3-C1 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm03-alert-containment') {
    const nodes = alertContainmentNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl visual-canvas-container bg-slate-50 dark:bg-[#03091e]/95 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl dark:shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <span>Active Alert Containment Console: Rapid Triage &amp; Shift Handoff</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Executing authorized host network isolation, revoking Kerberos session tokens, and packaging case dockets for Tier 2.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setIsHostQuarantined(!isHostQuarantined);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  isHostQuarantined ? 'bg-rose-600 text-white border-rose-400 shadow-md animate-pulse' : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                <Ban className="w-4 h-4" />
                <span>{isHostQuarantined ? '🔒 HOST WIRE SEVERED' : 'ISOLATE HOST WIRE'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setIsTokenRevoked(!isTokenRevoked);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  isTokenRevoked ? 'bg-purple-600 text-white border-purple-400 shadow-md' : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                <Key className="w-4 h-4" />
                <span>{isTokenRevoked ? '✓ AD TOKENS REVOKED' : 'REVOKE TOKENS'}</span>
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
                      {node.id === 'act-alert' && <AlertOctagon className="w-6 h-6 text-rose-400" />}
                      {node.id === 'act-isolate' && <Ban className="w-6 h-6 text-amber-400" />}
                      {node.id === 'act-revoke' && <Key className="w-6 h-6 text-purple-400" />}
                      {node.id === 'act-handover' && <FileSpreadsheet className="w-6 h-6 text-emerald-400" />}
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

          {/* Containment Console HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">CONTAINMENT INCIDENT CONTROLS</span>
              <span className="text-rose-400 font-bold">CASE #INC-2026-8812 • COBALT STRIKE BEACON</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="font-bold text-sky-300">EDR Sensor Status:</div>
                <div className="text-slate-300 mt-1">
                  Host BLR-BR-WS-04 (10.10.20.15) • {isHostQuarantined ? <span className="text-rose-400 font-bold">QUARANTINED FROM ENTERPRISE LAN (SOC Channel Preserved)</span> : <span className="text-emerald-400 font-bold">CONNECTED (Vulnerable to Lateral Pivot)</span>}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="font-bold text-purple-300">Active Directory Kerberos Status:</div>
                <div className="text-slate-300 mt-1">
                  Account FIN-OPS-01 • {isTokenRevoked ? <span className="text-purple-300 font-bold">TGT INVALIDATED • PASSWORD RESET ENFORCED</span> : <span className="text-amber-400 font-bold">ACTIVE SESSIONS OPEN</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 16. The Defense-in-Depth Castle (M03-U3-C2 Pillar 1)
  // ---------------------------------------------------------------------------
  if (style === 'm03-defense-in-depth-castle') {
    const nodes = defenseInDepthNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const castleRings = [
      { ring: 5, name: 'Ring 5: Perimeter Moat (NGFW & WAF)', desc: 'Blocks 95% of internet automated noise and external port probes.' },
      { ring: 4, name: 'Ring 4: Network Walls (VLAN Segmentation)', desc: 'Prevents compromised laptops on VLAN 20 from connecting directly to database Port 5432.' },
      { ring: 3, name: 'Ring 3: Endpoint Armor (EDR & AppLocker)', desc: 'Behavioral sensors inspect process trees and terminate unapproved execution.' },
      { ring: 1, name: 'Ring 1: Vault Keep (AES-256 & Immutable Backups)', desc: 'Even if physical disks are stolen, column data is unreadable gibberish.' },
    ];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl visual-canvas-container bg-slate-50 dark:bg-[#03091e]/95 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl dark:shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-400" />
                <span>The Defense-in-Depth Castle: Concentric Ring Security Architecture</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Layered concentric defensive boundaries ensuring no single system breach can compromise core crown jewels.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {[5, 4, 3, 1].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveDefenseRing(r);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold border transition-all ${
                    activeDefenseRing === r ? 'bg-sky-500 text-slate-950 border-sky-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Ring {r}
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
                      {node.id === 'did-perimeter' && <Globe className="w-6 h-6 text-sky-400" />}
                      {node.id === 'did-network' && <Network className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'did-endpoint' && <Laptop className="w-6 h-6 text-purple-400" />}
                      {node.id === 'did-data' && <Lock className="w-6 h-6 text-amber-400" />}
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

          {/* Castle Ring Hierarchy HUD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2 font-mono text-xs">
            {castleRings.map((cr) => (
              <div
                key={cr.ring}
                onClick={() => {
                  sound.playClick();
                  setActiveDefenseRing(cr.ring);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  activeDefenseRing === cr.ring ? 'bg-sky-950/80 border-sky-400 ring-1 ring-sky-500/50 shadow-md' : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="font-bold text-white flex items-center justify-between">
                  <span>{cr.name}</span>
                </div>
                <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">{cr.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {renderInspector(activeNode)}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 17. Least Privilege & Blast Radius Containment (M03-U3-C2 Pillar 2)
  // ---------------------------------------------------------------------------
  if (style === 'm03-least-privilege-blast-radius') {
    const nodes = leastPrivilegeNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl visual-canvas-container bg-slate-50 dark:bg-[#03091e]/95 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl dark:shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-sky-400" />
                <span>Principle of Least Privilege &amp; Blast Radius Containment</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Comparing standard medium-integrity tokens against dangerous permanent administrative credentials.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setPrivilegedMode('standard');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  privilegedMode === 'standard' ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Standard User (Contained)
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setPrivilegedMode('admin');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  privilegedMode === 'admin' ? 'bg-rose-600 text-white border-rose-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Local Admin (Catastrophic)
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
                      {node.id === 'blast-user' && <UserCheck className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'blast-admin' && <AlertOctagon className="w-6 h-6 text-rose-400" />}
                      {node.id === 'blast-uac' && <Shield className="w-6 h-6 text-sky-400" />}
                      {node.id === 'blast-jit' && <Clock className="w-6 h-6 text-purple-400" />}
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

          {/* Blast Radius Visualizer */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">BLAST RADIUS CONTAINMENT SIMULATION</span>
              <span className={privilegedMode === 'standard' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {privilegedMode === 'standard' ? 'BLAST RADIUS: 1 PROFILE FOLDER ONLY' : 'BLAST RADIUS: FULL HOST & DOMAIN TAKEOVER'}
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200">
              {privilegedMode === 'standard' ? (
                <div>
                  <strong className="text-emerald-300">Standard User Protection (PoLP):</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    If an employee executes a malicious file, the damage is restricted entirely to C:\Users\FIN-OPS-01. The operating system kernel, System32 DLLs, and registry security hives are completely write-protected!
                  </p>
                </div>
              ) : (
                <div>
                  <strong className="text-rose-300">Local Administrator Peril (Excessive Privilege):</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    Malware runs with high administrative authority, disables the local EDR/antivirus agent, dumps plaintext LSASS password hashes, and installs persistent rootkits. Total workstation compromise!
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
  // 18. Zero Trust Architecture & Continuous Verification (M03-U3-C2 Pillar 3)
  // ---------------------------------------------------------------------------
  if (style === 'm03-zero-trust-verification') {
    const nodes = zeroTrustNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl visual-canvas-container bg-slate-50 dark:bg-[#03091e]/95 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl dark:shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Zero Trust Architecture (NIST SP 800-207): Never Trust, Always Verify</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Continuous dynamic risk evaluation, posture validation, and application microsegmentation without flat network trust.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsZeroTrustEvaluated(!isZeroTrustEvaluated);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white border border-sky-400 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Evaluate Dynamic Risk Posture</span>
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
                      {node.id === 'zt-verify' && <Fingerprint className="w-6 h-6 text-emerald-400" />}
                      {node.id === 'zt-device' && <ShieldCheck className="w-6 h-6 text-sky-400" />}
                      {node.id === 'zt-micro' && <Layers className="w-6 h-6 text-purple-400" />}
                      {node.id === 'zt-pep' && <Activity className="w-6 h-6 text-amber-400" />}
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

          {/* Zero Trust Continuous Engine HUD */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">POLICY DECISION POINT (PDP / PEP) LIVE ASSESSMENT</span>
              <span className="text-emerald-400 font-bold">SESSION RISK SCORE: 0.12 (LOW / AUTHORIZED)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-emerald-300 font-bold">1. Identity Verification</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Phishing-resistant FIDO2 key validated cryptographically.</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-sky-300 font-bold">2. Device Health Posture</div>
                <div className="text-[11px] text-slate-300 mt-0.5">CrowdStrike EDR active • BitLocker encrypted • OS Patched.</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-purple-300 font-bold">3. App Microsegmentation</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Encrypted tunnel to Finance Portal 443 only. Subnet isolated.</div>
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
