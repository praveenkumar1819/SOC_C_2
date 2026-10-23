'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { sound } from '@/lib/sound-effects';
import {
  signinTelemetryStreamNodes,
  mfaTrustFallacyNodes,
  impossibleTravelRealityNodes,
  privilegeBlastRadiusNodes,
  impactBasedTriageNodes,
  identityDirectoryTruthNodes,
  emailArtifactAnatomyNodes,
  misleadingLinksTrapsNodes,
  spfDkimDmarcEngineNodes,
  quarantineDefangedSandboxNodes,
  dataLeakagePreventionNodes,
  attachmentHashEscalationNodes,
  threatIntelPyramidNodes,
  iocProvenanceFreshnessNodes,
  sourcedIntelligenceNoteNodes,
  multiSourceCorrelationNodes,
  sharedInfrastructureTrapNodes,
  intelDossierSignoffNodes,
} from './module-11-visual-stories';
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
  Unlock,
  EyeOff,
} from 'lucide-react';
import { VisualNodeItem, VisualStoryStyle } from './interactive-visual-story-engine';

interface Module11GraphicRendererProps {
  style: VisualStoryStyle;
  selectedNodeId: string;
  onSelectNode: (node: VisualNodeItem) => void;
  animStep: number;
}

export function Module11GraphicRenderer({
  style,
  selectedNodeId,
  onSelectNode,
  animStep,
}: Module11GraphicRendererProps) {
  // Local interactive states for Module 11 visual scenarios
  const [activeSignField, setActiveSignField] = useState<'account' | 'app' | 'device' | 'result'>('account');
  const [mfaState, setMfaState] = useState<'fido' | 'fatigue' | 'aitm' | 'cae'>('fatigue');
  const [travelPerspective, setTravelPerspective] = useState<'alarm' | 'vpn_truth'>('vpn_truth');
  const [privilegeTier, setPrivilegeTier] = useState<'tier2' | 'tier1' | 'tier0'>('tier0');
  const [triageFilter, setTriageFilter] = useState<'all' | 'high_impact' | 'routine'>('high_impact');
  const [directoryTruthMode, setDirectoryTruthMode] = useState<'spoofed' | 'guid_truth'>('guid_truth');
  const [emailPane, setEmailPane] = useState<'display' | 'envelope' | 'hops' | 'crypto'>('envelope');
  const [linkAnalysisMode, setLinkAnalysisMode] = useState<'anchor' | 'target' | 'defanged'>('defanged');
  const [authInspectProtocol, setAuthInspectProtocol] = useState<'spf' | 'dkim' | 'dmarc'>('dmarc');
  const [sandboxState, setSandboxState] = useState<'quarantine' | 'defang' | 'sandbox'>('sandbox');
  const [leakMode, setLeakMode] = useState<'unsafe' | 'safe'>('safe');
  const [escalationStep, setEscalationStep] = useState<number>(2);
  const [pyramidLevel, setPyramidLevel] = useState<number>(5); // 0=Hashes .. 5=TTPs
  const [decayDays, setDecayDays] = useState<number>(3);
  const [intelFormat, setIntelFormat] = useState<'raw' | 'contextual'>('contextual');
  const [correlationSources, setCorrelationSources] = useState<'single' | 'triangulated'>('triangulated');
  const [infraView, setInfraView] = useState<'shared_trap' | 'domain_scoped'>('domain_scoped');
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
  // 1. STYLE: m11-signin-telemetry-stream (Sign-In Telemetry Stream)
  // ---------------------------------------------------------------------------
  if (style === 'm11-signin-telemetry-stream') {
    const nodes = signinTelemetryStreamNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-sky-400" />
                <span>Identity Authentication Console: Account FIN-OPS-01 Telemetry Stream</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                The account has its own trail. Separate the account identifier from the human typing at the keyboard.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              AAD STS AUTH STREAM
            </Badge>
          </div>

          {/* Interactive Field Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">TELEMETRY FIELD:</span>
            {[
              { id: 'account', label: '1. Account UPN', node: 'sign-account-id' },
              { id: 'app', label: '2. Target Resource', node: 'sign-app-service' },
              { id: 'device', label: '3. Device Fingerprint', node: 'sign-device-posture' },
              { id: 'result', label: '4. Auth Outcome', node: 'sign-auth-result' },
            ].map((fd) => (
              <button
                key={fd.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveSignField(fd.id as any);
                  const target = nodes.find((n) => n.id === fd.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeSignField === fd.id
                    ? 'bg-sky-500/25 border border-sky-400 text-sky-300 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {fd.label}
              </button>
            ))}
          </div>

          {/* Authentication Exchange HUD */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold text-sky-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>AAD SIGN-IN RECORD #AUTH-2026-9901</span>
              </span>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[11px] font-mono">
                STATUS: SUCCESS (0x0)
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 font-mono text-xs">
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Claimed Principal:</span>
                <p className="text-white font-bold mt-1">fin-ops-01@fincorp.local</p>
              </div>
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Target Resource:</span>
                <p className="text-sky-300 font-bold mt-1">Microsoft 365 Financial ERP</p>
              </div>
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Client Host:</span>
                <p className="text-emerald-300 font-bold mt-1">BLR-BR-WS-04 (Intune OK)</p>
              </div>
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Event ID:</span>
                <p className="text-purple-300 font-bold mt-1">Security 4624 (Logon Type 2)</p>
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
                        {node.id === 'sign-account-id' ? (
                          <UserCheck className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'sign-app-service' ? (
                          <Layers className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'sign-device-posture' ? (
                          <Laptop className="w-6 h-6 text-emerald-400" />
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
  // 2. STYLE: m11-mfa-trust-fallacy (MFA Evaluation & The Trust Fallacy)
  // ---------------------------------------------------------------------------
  if (style === 'm11-mfa-trust-fallacy') {
    const nodes = mfaTrustFallacyNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span>MFA Factor Evaluation & The "Successful MFA Trust Fallacy"</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                A valid credential or approved MFA push does not make a session trustworthy. Adversaries bypass MFA via push fatigue and token theft.
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs font-mono">
              AUTHENTICATION PARADOX
            </Badge>
          </div>

          {/* MFA Attack/Defense Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">MFA SCENARIO:</span>
            {[
              { id: 'fido', label: '1. Standard MFA Claim', node: 'mfa-factor-eval' },
              { id: 'fatigue', label: '2. Push Fatigue Spam (14 Attempts)', node: 'mfa-push-fatigue' },
              { id: 'aitm', label: '3. AiTM Cookie Replay (Evilginx)', node: 'mfa-session-hijack' },
              { id: 'cae', label: '4. Continuous Session Evaluation', node: 'mfa-continuous-eval' },
            ].map((mf) => (
              <button
                key={mf.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setMfaState(mf.id as any);
                  const target = nodes.find((n) => n.id === mf.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  mfaState === mf.id
                    ? 'bg-amber-500/25 border border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {mf.label}
              </button>
            ))}
          </div>

          {/* Interactive MFA Attack Simulation Cockpit */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
            {mfaState === 'fatigue' && (
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-amber-400">MFA PUSH FATIGUE ATTACK DETECTED</span>
                <p className="text-xs text-slate-300">
                  Adversary spammed user Ramesh with 14 authenticator push notifications at 02:40 AM until he tapped "Approve" out of frustration.
                </p>
                <div className="text-[11px] font-mono text-amber-300 bg-amber-950/40 p-2 rounded border border-amber-500/20">
                  Defense: Enforce Number Matching and FIDO2 hardware keys to defeat blind push approvals.
                </div>
              </div>
            )}

            {mfaState === 'aitm' && (
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-red-400">AiTM SESSION COOKIE THEFT (REVERSE PROXY)</span>
                <p className="text-xs text-slate-300">
                  User entered valid password and completed SMS/TOTP challenge on a phishing reverse proxy. Adversary stole the session cookie directly.
                </p>
                <div className="text-[11px] font-mono text-red-300 bg-red-950/40 p-2 rounded border border-red-500/20">
                  Principle: An active session cookie bypasses all subsequent password prompts. Token age and IP bind must be verified.
                </div>
              </div>
            )}

            {mfaState === 'cae' && (
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-emerald-400">CONTINUOUS ACCESS EVALUATION (CAE)</span>
                <p className="text-xs text-slate-300">
                  Near real-time token revocation: when password is changed or device is isolated, Entra ID revokes the active session cookie in sub-seconds.
                </p>
                <div className="text-[11px] font-mono text-emerald-300 bg-emerald-950/40 p-2 rounded border border-emerald-500/20">
                  Status: Enabled. Stolen session token rendered useless on network location change.
                </div>
              </div>
            )}

            {mfaState === 'fido' && (
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-sky-400">FIDO2 WEBAUTHN HARDWARE CREDENTIAL</span>
                <p className="text-xs text-slate-300">
                  Hardware cryptographic token bound directly to the domain origin. Phishing proxies cannot replay WebAuthn credentials.
                </p>
                <div className="text-[11px] font-mono text-sky-300 bg-sky-950/40 p-2 rounded border border-sky-500/20">
                  Security Grade: Highest Phishing-Resistant Standard.
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
                        {node.id === 'mfa-factor-eval' ? (
                          <Key className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'mfa-push-fatigue' ? (
                          <Radio className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'mfa-session-hijack' ? (
                          <AlertTriangle className="w-6 h-6 text-red-400" />
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
  // 3. STYLE: m11-impossible-travel-reality (Impossible Travel vs VPN Truth)
  // ---------------------------------------------------------------------------
  if (style === 'm11-impossible-travel-reality') {
    const nodes = impossibleTravelRealityNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-sky-400" />
                <span>Impossible Travel Alert Reality: Geolocation vs Corporate VPN Egress</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                14-minute delta between Bengaluru and Frankfurt. Do not assume supersonic travel until you check corporate VPN egress and device posture.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              GEOLOCATION AUDIT
            </Badge>
          </div>

          {/* Perspective Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">ANALYSIS LENS:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setTravelPerspective('vpn_truth');
                onSelectNode(nodes[1]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                travelPerspective === 'vpn_truth'
                  ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Corporate VPN Reality (Benign Azure Gateway)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setTravelPerspective('alarm');
                onSelectNode(nodes[0]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                travelPerspective === 'alarm'
                  ? 'bg-red-500/25 border border-red-400 text-red-300 shadow-md shadow-red-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Raw Impossible Travel Alarm (Bengaluru &rarr; Frankfurt)
            </button>
          </div>

          {/* Dual Geolocation Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            {/* Bengaluru Hop */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-sky-500/30 space-y-2">
              <span className="text-xs font-mono font-bold text-sky-400 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-400" /> HOP A: BENGALURU, INDIA (14:10 UTC)
              </span>
              <div className="text-xs font-mono text-slate-300 space-y-1">
                <div>Client IP: 106.51.78.22 (ACT Fibernet)</div>
                <div>Device: BLR-BR-WS-04 (Intune Compliant)</div>
                <div>Action: Workstation Outlook sign-in</div>
              </div>
            </div>

            {/* Frankfurt Hop */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-purple-500/30 space-y-2">
              <span className="text-xs font-mono font-bold text-purple-400 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-purple-400" /> HOP B: FRANKFURT, GERMANY (14:24 UTC)
              </span>
              <div className="text-xs font-mono text-slate-300 space-y-1">
                <div>Egress IP: 20.52.18.99 (Microsoft ASN 8075)</div>
                <div>Device ID: Identical Registered Device GUID</div>
                <div>Root Cause: Corporate Cloud Proxy Egress Node</div>
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
                        {node.id === 'travel-dual-points' ? (
                          <MapPin className="w-6 h-6 text-red-400" />
                        ) : node.id === 'travel-corporate-vpn' ? (
                          <ShieldCheck className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'travel-telemetry-scrutiny' ? (
                          <Search className="w-6 h-6 text-purple-400" />
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
  // 4. STYLE: m11-privilege-blast-radius (Privilege Blast Radius)
  // ---------------------------------------------------------------------------
  if (style === 'm11-privilege-blast-radius') {
    const nodes = privilegeBlastRadiusNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-purple-400" />
                <span>Privilege Blast Radius: Standard User vs Enterprise Administrator</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Access changes the stakes. An alert on a standard domain user is contained to one box; an alert on Tier-0 threatens the entire forest.
              </p>
            </div>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs font-mono">
              PRIVILEGE TIERING
            </Badge>
          </div>

          {/* Tier Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">PRIVILEGE TIER:</span>
            {[
              { id: 'tier2', label: 'Tier-2: Standard User (WS-04)', node: 'priv-standard-user' },
              { id: 'tier1', label: 'Tier-1: Server Operator', node: 'priv-tier1-operator' },
              { id: 'tier0', label: 'Tier-0: Enterprise Admin (DC)', node: 'priv-tier0-crown-jewel' },
            ].map((tr) => (
              <button
                key={tr.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setPrivilegeTier(tr.id as any);
                  const target = nodes.find((n) => n.id === tr.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  privilegeTier === tr.id
                    ? 'bg-purple-500/25 border border-purple-400 text-purple-300 shadow-md shadow-purple-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {tr.label}
              </button>
            ))}
          </div>

          {/* Blast Radius Visual HUD */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-300">
                BLAST RADIUS IMPACT SIMULATOR
              </span>
              <Badge className={`text-xs font-mono ${privilegeTier === 'tier0' ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'}`}>
                {privilegeTier === 'tier0' ? 'CRITICAL CROWN JEWEL' : 'ISOLATED TO HOST'}
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
              <div className={`p-3 rounded-lg border ${privilegeTier === 'tier2' ? 'bg-sky-950/60 border-sky-400' : 'bg-slate-900/40 border-slate-800'}`}>
                <span className="text-sky-300 font-bold">Tier-2: User Ramesh</span>
                <p className="text-slate-400 text-[11px] mt-1">Blast Radius: 1 Workstation. Can read own mailbox.</p>
              </div>
              <div className={`p-3 rounded-lg border ${privilegeTier === 'tier1' ? 'bg-amber-950/60 border-amber-400' : 'bg-slate-900/40 border-slate-800'}`}>
                <span className="text-amber-300 font-bold">Tier-1: Server Admin</span>
                <p className="text-slate-400 text-[11px] mt-1">Blast Radius: Branch File/Print servers. No DC access.</p>
              </div>
              <div className={`p-3 rounded-lg border ${privilegeTier === 'tier0' ? 'bg-red-950/60 border-red-400' : 'bg-slate-900/40 border-slate-800'}`}>
                <span className="text-red-300 font-bold">Tier-0: Enterprise Admin</span>
                <p className="text-slate-400 text-[11px] mt-1">Blast Radius: Entire Active Directory forest and identity root.</p>
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
                        {node.id === 'priv-standard-user' ? (
                          <UserCheck className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'priv-tier1-operator' ? (
                          <Server className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'priv-tier0-crown-jewel' ? (
                          <CrownIcon className="w-6 h-6 text-red-400" />
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

  // Helper icon for Crown
  function CrownIcon(props: any) {
    return <Award {...props} />;
  }

  // ---------------------------------------------------------------------------
  // 5. STYLE: m11-impact-based-triage (Impact-Based Queue Prioritization)
  // ---------------------------------------------------------------------------
  if (style === 'm11-impact-based-triage') {
    const nodes = impactBasedTriageNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-sky-400" />
                <span>Impact-Based Alert Queue Triage: Account & Asset Criticality</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                100 routine low-risk alarms versus 1 alert targeting the Payment Gateway or Finance Lead. Prioritize by business impact, not alert volume.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              TRIAGE PRECEDENCE
            </Badge>
          </div>

          {/* Filter Switcher */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">QUEUE VIEW:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setTriageFilter('high_impact');
                onSelectNode(nodes[1]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                triageFilter === 'high_impact'
                  ? 'bg-red-500/25 border border-red-400 text-red-300 shadow-md shadow-red-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. High-Impact Critical Focus (FIN-OPS-01)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setTriageFilter('routine');
                onSelectNode(nodes[0]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                triageFilter === 'routine'
                  ? 'bg-slate-500/25 border border-slate-400 text-slate-300 shadow-md shadow-slate-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Routine Low-Risk Volume (100 Noise Alerts)
            </button>
          </div>

          {/* Priority Queue Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-slate-400">ROUTINE WORKSTATION NOISE</span>
              <p className="text-xs text-slate-300">Temporary guest Wi-Fi scan alerts or expired test certs.</p>
              <div className="text-[11px] font-mono text-slate-500 bg-slate-950 p-1.5 rounded">
                Volume: 120 events • Business Impact: NEGLIGIBLE
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 space-y-2">
              <span className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4 text-red-400" /> HIGH IMPACT: FIN-OPS-01 / PAYMENT GATEWAY
              </span>
              <p className="text-xs text-slate-300">Single anomalous sign-in with Excel macro spawning PowerShell.</p>
              <div className="text-[11px] font-mono text-red-300 bg-red-950/60 p-1.5 rounded border border-red-500/30">
                Action: Immediate Priority 1 Triage by Apprentice Analyst
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
                        {node.id === 'triage-volume-noise' ? (
                          <Activity className="w-6 h-6 text-slate-400" />
                        ) : node.id === 'triage-privileged-target' ? (
                          <AlertOctagon className="w-6 h-6 text-red-400" />
                        ) : node.id === 'triage-asset-matrix' ? (
                          <Database className="w-6 h-6 text-purple-400" />
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
  // 6. STYLE: m11-identity-directory-truth (Display Name vs ObjectGUID)
  // ---------------------------------------------------------------------------
  if (style === 'm11-identity-directory-truth') {
    const nodes = identityDirectoryTruthNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-sky-400" />
                <span>Active Directory Ground Truth: Display Names vs Immutable ObjectGUID</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Display names can be altered or spoofed in 5 seconds. True directory queries look past visual labels to query the immutable GUID.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              DIRECTORY GROUND TRUTH
            </Badge>
          </div>

          {/* Toggle */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">IDENTITY QUERY:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setDirectoryTruthMode('guid_truth');
                onSelectNode(nodes[1]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                directoryTruthMode === 'guid_truth'
                  ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Immutable ObjectGUID Query (Ground Truth ✓)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setDirectoryTruthMode('spoofed');
                onSelectNode(nodes[0]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                directoryTruthMode === 'spoofed'
                  ? 'bg-amber-500/25 border border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Display Name Illusion ("CEO Meera" Spoof)
            </button>
          </div>

          {/* Directory Record Comparison */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold">Visual Display Label (Mutable):</span>
                <p className="text-white text-sm">"Meera Ramanathan (Director of Threat Intel)"</p>
                <div className="text-slate-400 text-[11px]">Can be set to any arbitrary string in external email headers.</div>
              </div>
              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                <span className="text-emerald-400 font-bold">Immutable Active Directory ObjectGUID:</span>
                <p className="text-emerald-300 text-sm font-bold">c4b8e21a-9f42-4b71-a831-01824efc8821</p>
                <div className="text-slate-300 text-[11px]">Unique cryptographic identity key in internal LDAP forest.</div>
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
                        {node.id === 'dir-display-illusion' ? (
                          <UserX className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'dir-objectguid-truth' ? (
                          <Database className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'dir-ldap-query' ? (
                          <Search className="w-6 h-6 text-purple-400" />
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
  // 7. STYLE: m11-email-artifact-anatomy (Email Artifact & Header Anatomy)
  // ---------------------------------------------------------------------------
  if (style === 'm11-email-artifact-anatomy') {
    const nodes = emailArtifactAnatomyNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-sky-400" />
                <span>Email Header Dissection: RFC 5322 From vs RFC 5321 Return-Path</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                The friendly sender name is untrusted paint. Real evidence lies in the envelope sender (Return-Path) and the bottom-most Received hop.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              RFC 5322 / 5321 AUDIT
            </Badge>
          </div>

          {/* Email Header Tabs */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">HEADER SECTION:</span>
            {[
              { id: 'display', label: '1. Display Name', node: 'email-display-sender' },
              { id: 'envelope', label: '2. Envelope Return-Path', node: 'email-envelope-return' },
              { id: 'hops', label: '3. Received Hops', node: 'email-received-hops' },
              { id: 'crypto', label: '4. Message-ID & Crypto', node: 'email-message-fingerprint' },
            ].map((pn) => (
              <button
                key={pn.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setEmailPane(pn.id as any);
                  const target = nodes.find((n) => n.id === pn.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  emailPane === pn.id
                    ? 'bg-sky-500/25 border border-sky-400 text-sky-300 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {pn.label}
              </button>
            ))}
          </div>

          {/* Dissected Email Header Block */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 font-mono text-xs space-y-1.5">
            <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
              <span className="text-amber-400 font-bold">From (RFC 5322):</span> "CDAC Executive Desk" &lt;director@cdac-internal.org&gt;
            </div>
            <div className="p-2 rounded bg-slate-900 border border-purple-500/30 text-purple-300">
              <span className="text-purple-400 font-bold">Return-Path (RFC 5321):</span> &lt;bounce-relay@compromised-host.xyz&gt;
            </div>
            <div className="p-2 rounded bg-slate-900 border border-sky-500/30 text-sky-300">
              <span className="text-sky-400 font-bold">Received (Originating Hop):</span> from mail.compromised-host.xyz (185.220.101.44) by mx.fincorp.local
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
                        {node.id === 'email-display-sender' ? (
                          <Mail className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'email-envelope-return' ? (
                          <Send className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'email-received-hops' ? (
                          <Network className="w-6 h-6 text-sky-400" />
                        ) : (
                          <FileText className="w-6 h-6 text-emerald-400" />
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
  // 8. STYLE: m11-misleading-links-traps (Misleading Links & Defanging)
  // ---------------------------------------------------------------------------
  if (style === 'm11-misleading-links-traps') {
    const nodes = misleadingLinksTrapsNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Link2 className="w-5 h-5 text-amber-400" />
                <span>Misleading Links, Homograph Spoofs & Safe Analyst Defanging</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Visible link text: login.microsoft.com. Actual href destination: malicious-portal.ru. Never click live URLs; defang immediately.
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs font-mono">
              LINK DEFANGING
            </Badge>
          </div>

          {/* Link Inspector Mode */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">INSPECTOR LENS:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setLinkAnalysisMode('defanged');
                onSelectNode(nodes[3]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                linkAnalysisMode === 'defanged'
                  ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Defanged Safe View (hxxps[://]...)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setLinkAnalysisMode('target');
                onSelectNode(nodes[1]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                linkAnalysisMode === 'target'
                  ? 'bg-red-500/25 border border-red-400 text-red-300 shadow-md shadow-red-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. True Hyperlink Target (malicious-portal.ru)
            </button>
          </div>

          {/* Link Anatomy Visualizer */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 font-mono text-xs space-y-2">
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Anchor Display Text (What the victim sees):</span>
              <p className="text-sky-300 font-bold mt-0.5">https://login.microsoft.com/secure-portal</p>
            </div>
            <div className="p-2.5 rounded bg-red-950/30 border border-red-500/30">
              <span className="text-red-400 font-bold">Actual HTML HREF Target:</span>
              <p className="text-red-300 font-bold mt-0.5">http://login-micros0ft-portal.ru/auth/login.php</p>
            </div>
            <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-500/30">
              <span className="text-emerald-400 font-bold">Standard Defanged URL (Case Notes Ready):</span>
              <p className="text-emerald-300 font-bold mt-0.5">hxxp[://]login-micros0ft-portal[.]ru/auth/login[.]php</p>
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
                        {node.id === 'link-anchor-illusion' ? (
                          <Link2 className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'link-actual-target' ? (
                          <AlertTriangle className="w-6 h-6 text-red-400" />
                        ) : node.id === 'link-punycode-trap' ? (
                          <Globe className="w-6 h-6 text-purple-400" />
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
  // 9. STYLE: m11-spf-dkim-dmarc-engine (SPF, DKIM & DMARC Engine)
  // ---------------------------------------------------------------------------
  if (style === 'm11-spf-dkim-dmarc-engine') {
    const nodes = spfDkimDmarcEngineNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Email Authentication Engine: SPF, DKIM & DMARC Enforcement</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                The cryptographic email triad: SPF validates authorized sender IPs; DKIM validates cryptographic body hash; DMARC enforces policy.
              </p>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs font-mono">
              AUTHENTICATION ENGINE
            </Badge>
          </div>

          {/* Protocol Switcher */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">VALIDATION LAYER:</span>
            {[
              { id: 'spf', label: '1. SPF (IP Authorized)', node: 'auth-spf-eval' },
              { id: 'dkim', label: '2. DKIM (RSA Signature)', node: 'auth-dkim-signature' },
              { id: 'dmarc', label: '3. DMARC (Policy Reject)', node: 'auth-dmarc-policy' },
            ].map((pr) => (
              <button
                key={pr.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setAuthInspectProtocol(pr.id as any);
                  const target = nodes.find((n) => n.id === pr.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  authInspectProtocol === pr.id
                    ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {pr.label}
              </button>
            ))}
          </div>

          {/* Triad Authentication Status Block */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            {/* SPF */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white">SPF CHECK</span>
                <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-[11px] font-mono">FAIL (SOFTFAIL)</Badge>
              </div>
              <p className="text-xs text-slate-300">185.220.101.44 not in cdac.in SPF TXT record.</p>
            </div>

            {/* DKIM */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white">DKIM CHECK</span>
                <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-[11px] font-mono">FAIL (UNSIGNED)</Badge>
              </div>
              <p className="text-xs text-slate-300">Missing or forged RSA-SHA256 signature.</p>
            </div>

            {/* DMARC */}
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400">DMARC ENFORCEMENT</span>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[11px] font-mono">P=REJECT ACTIVE</Badge>
              </div>
              <p className="text-xs text-slate-300">Unaligned message quarantined and blocked at gateway.</p>
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
                        {node.id === 'auth-spf-eval' ? (
                          <Network className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'auth-dkim-signature' ? (
                          <Hash className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'auth-dmarc-policy' ? (
                          <ShieldAlert className="w-6 h-6 text-emerald-400" />
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
  // 10. STYLE: m11-quarantine-defanged-sandbox (Sandbox & Defanging)
  // ---------------------------------------------------------------------------
  if (style === 'm11-quarantine-defanged-sandbox') {
    const nodes = quarantineDefangedSandboxNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Folder className="w-5 h-5 text-sky-400" />
                <span>Mailbox Quarantine, Safe URL Defanging & Air-Gapped Sandboxing</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Handle the message without becoming the victim. Isolate the email, defang all hyperlinks, and detonate attachments in an air-gapped VM.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              ANALYST SELF-DEFENSE
            </Badge>
          </div>

          {/* Workflow Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">SAFE HANDLING:</span>
            {[
              { id: 'quarantine', label: '1. Mailbox Quarantine', node: 'safe-quarantine-box' },
              { id: 'defang', label: '2. Text Defanging', node: 'safe-url-defanging' },
              { id: 'sandbox', label: '3. Detonation Sandbox', node: 'safe-sandbox-detonate' },
            ].map((ws) => (
              <button
                key={ws.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSandboxState(ws.id as any);
                  const target = nodes.find((n) => n.id === ws.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  sandboxState === ws.id
                    ? 'bg-sky-500/25 border border-sky-400 text-sky-300 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {ws.label}
              </button>
            ))}
          </div>

          {/* Sandbox Cockpit Display */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold text-sky-400">ISOLATED SANDBOX VM (WIN11 SANDBOX #SAND-04)</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[11px] font-mono">
                AIR-GAPPED: NO OUTBOUND LAN
              </Badge>
            </div>
            <div className="text-xs text-slate-300 space-y-1 font-mono">
              <div>Attachment Detonated: Invoice_Macro.xlsm</div>
              <div>Behavioral Flight Recorder: Process creation &rarr; cmd.exe &rarr; powershell.exe</div>
              <div className="text-amber-300">Network Call Attempt: 198.51.100.24:443 (Blocked by sandbox firewall)</div>
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
                        {node.id === 'safe-quarantine-box' ? (
                          <Inbox className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'safe-url-defanging' ? (
                          <Link2 className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'safe-sandbox-detonate' ? (
                          <Monitor className="w-6 h-6 text-emerald-400" />
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
  // 11. STYLE: m11-data-leakage-prevention (OPSEC & Multi-Scanner Leak)
  // ---------------------------------------------------------------------------
  if (style === 'm11-data-leakage-prevention') {
    const nodes = dataLeakagePreventionNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-amber-400" />
                <span>Analyst OPSEC: Preventing Data Leakage to Public Multi-Scanners</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Uploading internal files containing proprietary financial data or employee PII to public VirusTotal leaks private documents to subscribers.
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs font-mono">
              ANALYST OPSEC DISCIPLINE
            </Badge>
          </div>

          {/* Practice Toggle */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">OPSEC PROTOCOL:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setLeakMode('safe');
                onSelectNode(nodes[1]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                leakMode === 'safe'
                  ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Sanitized SHA-256 Hash Query (Safe Protocol ✓)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setLeakMode('unsafe');
                onSelectNode(nodes[0]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                leakMode === 'unsafe'
                  ? 'bg-red-500/25 border border-red-400 text-red-300 shadow-md shadow-red-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Raw File Upload to Public VirusTotal (Catastrophic Leak ⚠️)
            </button>
          </div>

          {/* Comparison Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30 space-y-2">
              <span className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-400" /> RAW UPLOAD HAZARD
              </span>
              <p className="text-xs text-slate-300">
                Uploading Invoice_Macro.xlsm with customer banking credentials directly to public feed. Competitors and adversaries download it in 60 seconds.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> SANITIZED HASH LOOKUP
              </span>
              <p className="text-xs text-slate-300">
                Calculate SHA-256 locally on workstation. Query ONLY the 64-character hash string. Zero bytes of sensitive document leave the SOC.
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
                        {node.id === 'leak-public-vt-hazard' ? (
                          <AlertTriangle className="w-6 h-6 text-red-400" />
                        ) : node.id === 'leak-hash-lookup-safe' ? (
                          <Hash className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'leak-opsec-discipline' ? (
                          <EyeOff className="w-6 h-6 text-purple-400" />
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
  // 12. STYLE: m11-attachment-hash-escalation (Attachment Hash Escalation)
  // ---------------------------------------------------------------------------
  if (style === 'm11-attachment-hash-escalation') {
    const nodes = attachmentHashEscalationNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Hash className="w-5 h-5 text-sky-400" />
                <span>Attachment Extraction & Tiered Indicator Escalation Pipeline</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                From carving the email attachment in quarantine, computing immutable SHA-256, checking TI feeds, to escalating to Shift Lead Ananya.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              ESCALATION PIPELINE
            </Badge>
          </div>

          {/* Stepper Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">STAGE:</span>
            {[
              { step: 1, label: '1. Attachment Carving', node: 'att-extraction-step' },
              { step: 2, label: '2. SHA-256 Calculation', node: 'att-sha256-calc' },
              { step: 3, label: '3. Threat Intel Feed', node: 'att-feed-lookup' },
              { step: 4, label: '4. Lead Escalation', node: 'att-escalation-gate' },
            ].map((st) => (
              <button
                key={st.step}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setEscalationStep(st.step);
                  const target = nodes.find((n) => n.id === st.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  escalationStep === st.step
                    ? 'bg-sky-500/25 border border-sky-400 text-sky-300 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Stepper Pipeline Card */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 font-mono text-xs space-y-1.5">
            <div className="flex items-center justify-between text-sky-400 font-bold border-b border-slate-800 pb-2">
              <span>ACTIVE STAGE {escalationStep} OF 4</span>
              <span>SHA-256: 7f8a32b1...</span>
            </div>
            <p className="text-slate-300 pt-1">
              {escalationStep === 1 && 'Attachment carved inside air-gapped quarantine. Renamed to Invoice_Macro.xlsm.bin.'}
              {escalationStep === 2 && 'SHA-256 computed: 7f8a32b1e4c90184b23d914fa61e8c7410294b61c94b2e8315a7df01e8c459b7.'}
              {escalationStep === 3 && 'Threat Intel query: 58/72 engines classify as malicious Emotet macro dropper.'}
              {escalationStep === 4 && 'Case escalated to Shift Lead Ananya with carved IOCs and recommended host containment.'}
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
                        {node.id === 'att-extraction-step' ? (
                          <Download className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'att-sha256-calc' ? (
                          <Hash className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'att-feed-lookup' ? (
                          <Search className="w-6 h-6 text-amber-400" />
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
  // 13. STYLE: m11-threat-intel-pyramid (David Bianco's Pyramid of Pain)
  // ---------------------------------------------------------------------------
  if (style === 'm11-threat-intel-pyramid') {
    const nodes = threatIntelPyramidNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-400" />
                <span>Threat Intelligence Hierarchy: David Bianco's Pyramid of Pain</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Hashes are trivial for attackers to re-generate. IP addresses are easy. Changing Tactics, Techniques & Procedures (TTPs) causes maximum pain.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              PYRAMID OF PAIN
            </Badge>
          </div>

          {/* Pyramid Level Selector */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">INDICATOR LEVEL:</span>
            {[
              { lvl: 5, label: 'TTPs (Tough! Maximum Pain)', node: 'pyr-ttps-apex' },
              { lvl: 3, label: 'Domain Names (Annoying)', node: 'pyr-domains-annoying' },
              { lvl: 2, label: 'IP Addresses (Easy)', node: 'pyr-ip-easy' },
              { lvl: 0, label: 'File Hashes (Trivial)', node: 'pyr-hashes-trivial' },
            ].map((pl) => (
              <button
                key={pl.lvl}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setPyramidLevel(pl.lvl);
                  const target = nodes.find((n) => n.id === pl.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  pyramidLevel === pl.lvl
                    ? 'bg-sky-500/25 border border-sky-400 text-sky-300 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {pl.label}
              </button>
            ))}
          </div>

          {/* Interactive Visual Pyramid Ladder */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
            <div className={`p-2.5 rounded-lg border text-xs font-mono flex items-center justify-between ${pyramidLevel === 5 ? 'bg-red-950/60 border-red-400 text-red-300' : 'bg-slate-900/40 border-slate-800 text-slate-400'}`}>
              <span className="font-bold">APEX: TACTICS, TECHNIQUES &amp; PROCEDURES (TTPs)</span>
              <span>PAIN: TOUGH / CATASTROPHIC</span>
            </div>
            <div className={`p-2.5 rounded-lg border text-xs font-mono flex items-center justify-between ${pyramidLevel === 3 ? 'bg-amber-950/60 border-amber-400 text-amber-300' : 'bg-slate-900/40 border-slate-800 text-slate-400'}`}>
              <span className="font-bold">TIER 3: DOMAIN NAMES &amp; HOSTNAMES</span>
              <span>PAIN: ANNOYING</span>
            </div>
            <div className={`p-2.5 rounded-lg border text-xs font-mono flex items-center justify-between ${pyramidLevel === 2 ? 'bg-purple-950/60 border-purple-400 text-purple-300' : 'bg-slate-900/40 border-slate-800 text-slate-400'}`}>
              <span className="font-bold">TIER 2: IP ADDRESSES</span>
              <span>PAIN: EASY</span>
            </div>
            <div className={`p-2.5 rounded-lg border text-xs font-mono flex items-center justify-between ${pyramidLevel === 0 ? 'bg-sky-950/60 border-sky-400 text-sky-300' : 'bg-slate-900/40 border-slate-800 text-slate-400'}`}>
              <span className="font-bold">BASE: CRYPTOGRAPHIC HASHES (SHA-256)</span>
              <span>PAIN: TRIVIAL</span>
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
                        {node.id === 'pyr-hashes-trivial' ? (
                          <Hash className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'pyr-ip-easy' ? (
                          <Network className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'pyr-domains-annoying' ? (
                          <Globe className="w-6 h-6 text-amber-400" />
                        ) : (
                          <Flame className="w-6 h-6 text-red-400" />
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
  // 14. STYLE: m11-ioc-provenance-freshness (Indicator Freshness & Decay)
  // ---------------------------------------------------------------------------
  if (style === 'm11-ioc-provenance-freshness') {
    const nodes = iocProvenanceFreshnessNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-400" />
                <span>Indicator Freshness, Temporal Decay & Confidence Calibration</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Threat intel has a shelf life. An IP reported 3 years ago may now be clean residential broadband. Check timestamps before blocking.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              TEMPORAL RELEVANCE
            </Badge>
          </div>

          {/* Age Slider Simulator */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">INDICATOR AGE:</span>
            {[
              { days: 1, label: '1 Day Old (Fresh 98% Conf)', node: 'fresh-timestamp-provenance' },
              { days: 14, label: '14 Days (Moderate)', node: 'fresh-confidence-calibration' },
              { days: 365, label: '1 Year (Stale / Degraded)', node: 'fresh-decay-curve' },
            ].map((ag) => (
              <button
                key={ag.days}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setDecayDays(ag.days);
                  const target = nodes.find((n) => n.id === ag.node);
                  if (target) onSelectNode(target);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  decayDays === ag.days
                    ? 'bg-sky-500/25 border border-sky-400 text-sky-300 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {ag.label}
              </button>
            ))}
          </div>

          {/* Freshness Decay Card */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white font-bold">TARGET IP: 198.51.100.24</span>
              <span className={decayDays === 1 ? 'text-emerald-400' : decayDays === 14 ? 'text-amber-400' : 'text-slate-400'}>
                CONFIDENCE: {decayDays === 1 ? '98% (ACTIVE C2)' : decayDays === 14 ? '62% (EVALUATING)' : '12% (STALE / REALLOCATED)'}
              </span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-3 border border-slate-800 overflow-hidden">
              <div className={`h-full transition-all ${decayDays === 1 ? 'w-[98%] bg-emerald-400' : decayDays === 14 ? 'w-[62%] bg-amber-400' : 'w-[12%] bg-slate-500'}`} />
            </div>
            <p className="text-xs text-slate-300 pt-1">
              {decayDays === 1 && 'Recent active C2 telemetry confirmed by 4 independent feeds within 24 hours.'}
              {decayDays === 14 && 'Activity waning. Verify whether destination is still active before applying persistent blocks.'}
              {decayDays === 365 && 'Ancient report. High probability of false-positive collateral outage if blocked.'}
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
                        {node.id === 'fresh-timestamp-provenance' ? (
                          <Clock className="w-6 h-6 text-emerald-400" />
                        ) : node.id === 'fresh-decay-curve' ? (
                          <Activity className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'fresh-confidence-calibration' ? (
                          <Gauge className="w-6 h-6 text-purple-400" />
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
  // 15. STYLE: m11-sourced-intelligence-note (Sourced Intelligence Note)
  // ---------------------------------------------------------------------------
  if (style === 'm11-sourced-intelligence-note') {
    const nodes = sourcedIntelligenceNoteNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-400" />
                <span>Sourced Threat Intelligence Note: Context, Tradecraft & Confidence</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                A bare hash or raw IP is not intelligence. A professional note includes provenance, confidence rating, observed tradecraft, and defensive takeaways.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              INTEL NOTE SYNTHESIS
            </Badge>
          </div>

          {/* Format Toggle */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">INTEL FORMAT:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIntelFormat('contextual');
                onSelectNode(nodes[3]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                intelFormat === 'contextual'
                  ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Professional Contextual Note (Defensible ✓)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIntelFormat('raw');
                onSelectNode(nodes[0]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                intelFormat === 'raw'
                  ? 'bg-amber-500/25 border border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Bare IoC String Dump (Incomplete)
            </button>
          </div>

          {/* Intel Note Card */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-sky-300 font-bold">INTEL BRIEF #2026-M11-TI: EMOTET MALSPAM CAMPAIGN</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[11px]">HIGH CONFIDENCE</Badge>
            </div>
            <p className="text-slate-300">
              Source: Cert-In &amp; Internal PCAP • Campaign: Financial Invoice Macro Drop • C2 Node: 198.51.100.24 (TCP 443) • TTP: T1566.001 (Spearphishing Attachment).
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
                        {node.id === 'note-raw-ioc-trap' ? (
                          <AlertTriangle className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'note-provenance-source' ? (
                          <Search className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'note-ttp-attribution' ? (
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

  // ---------------------------------------------------------------------------
  // 16. STYLE: m11-multi-source-correlation (Multi-Source Triangulation)
  // ---------------------------------------------------------------------------
  if (style === 'm11-multi-source-correlation') {
    const nodes = multiSourceCorrelationNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-sky-400" />
                <span>Multi-Source Evidentiary Triangulation: Lead to Qualified Finding</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                A single clue points somewhere, but does not tell the whole story. Triangulate across Identity + Email + EDR + Network to build a defensible case.
              </p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs font-mono">
              TRIANGULATION LOGIC
            </Badge>
          </div>

          {/* Correlation Mode */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">CORRELATION:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setCorrelationSources('triangulated');
                onSelectNode(nodes[3]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                correlationSources === 'triangulated'
                  ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Triangulated Evidentiary Finding (Defensible ✓)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setCorrelationSources('single');
                onSelectNode(nodes[0]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                correlationSources === 'single'
                  ? 'bg-amber-500/25 border border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Single-Clue Assumption (Fragile)
            </button>
          </div>

          {/* 4-Source Triangulation Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 font-mono text-xs">
            <div className="p-2.5 rounded bg-slate-900 border border-sky-500/30">
              <span className="text-sky-400 font-bold">1. Identity</span>
              <p className="text-slate-300 text-[11px] mt-1">Ramesh auth from WS-04</p>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-purple-500/30">
              <span className="text-purple-400 font-bold">2. Email</span>
              <p className="text-slate-300 text-[11px] mt-1">Spoofed Invoice_Macro.xlsm</p>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-emerald-500/30">
              <span className="text-emerald-400 font-bold">3. EDR Host</span>
              <p className="text-slate-300 text-[11px] mt-1">Excel &rarr; CMD &rarr; PowerShell</p>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-amber-500/30">
              <span className="text-amber-400 font-bold">4. Network PCAP</span>
              <p className="text-slate-300 text-[11px] mt-1">TCP SYN 198.51.100.24:443</p>
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
                        {node.id === 'corr-single-clue-fallacy' ? (
                          <AlertTriangle className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'corr-identity-email' ? (
                          <Mail className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'corr-endpoint-network' ? (
                          <Network className="w-6 h-6 text-sky-400" />
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
  // 17. STYLE: m11-shared-infrastructure-trap (Shared Cloud Infrastructure)
  // ---------------------------------------------------------------------------
  if (style === 'm11-shared-infrastructure-trap') {
    const nodes = sharedInfrastructureTrapNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-400" />
                <span>The Shared Cloud Infrastructure Trap: Collateral Blocking Risk</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Adversaries host C2 on Cloudflare or AWS multitenant IPs. Blocking the entire subnet severs access to legitimate SaaS services.
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs font-mono">
              COLLATERAL RISK
            </Badge>
          </div>

          {/* Perspective Toggle */}
          <div className="flex items-center gap-2 bg-[#040c1e] p-2 rounded-xl border border-sky-500/30 flex-wrap">
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold">BLOCK SCOPE:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setInfraView('domain_scoped');
                onSelectNode(nodes[2]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                infraView === 'domain_scoped'
                  ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. FQDN / Domain Scoped Block (Surgical ✓)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setInfraView('shared_trap');
                onSelectNode(nodes[0]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                infraView === 'shared_trap'
                  ? 'bg-red-500/25 border border-red-400 text-red-300 shadow-md shadow-red-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Indiscriminate Shared IP Block (Collateral Trap ⚠️)
            </button>
          </div>

          {/* Visual Blast Impact */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 font-mono text-xs space-y-2">
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
              <span className="text-amber-400 font-bold">Shared CDN Node (104.21.44.12):</span> Hosts 1 malicious phishing site + 450 legitimate business web portals.
            </div>
            <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
              <span className="text-emerald-400 font-bold">Disciplined Rule:</span> Block malicious domain 'evil-invoice[.]xyz' via DNS sinkhole. Keep shared IP reachable for business.
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
                        {node.id === 'infra-multitenant-cdn' ? (
                          <Globe className="w-6 h-6 text-amber-400" />
                        ) : node.id === 'infra-indiscriminate-block' ? (
                          <AlertTriangle className="w-6 h-6 text-red-400" />
                        ) : node.id === 'infra-domain-demarcation' ? (
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
  // 18. STYLE: m11-intel-dossier-signoff (Master Intel Dossier & Sign-Off)
  // ---------------------------------------------------------------------------
  if (style === 'm11-intel-dossier-signoff') {
    const nodes = intelDossierSignoffNodes;
    const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    return (
      <div className="min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#03091e]/95 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl w-full">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Master Threat Intelligence Dossier & Mentor Meera Supervisory Seal</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Qualified finding classification, multi-source corroboration, and Mentor Meera's formal certification seal completing Module 11.
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs font-mono">
              SUPERVISORY SEAL
            </Badge>
          </div>

          {/* Dossier Sign-Off Card */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold text-white">
                MASTER THREAT INTEL DOSSIER • CASE #2026-881
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
                {isDossierSigned ? '✓ DOSSIER SIGNED & SEALED' : 'STAMP MEERA SUPERVISORY SEAL'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-sky-400 font-bold">1. Verified Evidence Chain:</span>
                <div className="text-slate-300 text-[11px]">Identity: FIN-OPS-01 (Session Token Revoked)</div>
                <div className="text-slate-300 text-[11px]">Email: Malicious Macro Spoofed (SPF/DKIM Failed)</div>
                <div className="text-slate-300 text-[11px]">EDR: BLR-BR-WS-04 Isolated &amp; RAM Captured</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold">2. Threat Intelligence Synthesis:</span>
                <div className="text-slate-300 text-[11px]">Attribution: Financial Phishing Campaign (Emotet)</div>
                <div className="text-slate-300 text-[11px]">C2 Infrastructure: 198.51.100.24 (Blocked surgically)</div>
                <div className="text-slate-300 text-[11px]">Dossier Confidence: High (95% Triangulated)</div>
              </div>
            </div>

            {isDossierSigned && (
              <div className="p-2.5 rounded-lg bg-gradient-to-r from-emerald-950/60 via-slate-900 to-amber-950/60 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-bold text-white">
                    Supervisory Sign-Off: Mentor Meera certifies Module 11 Identity, Email &amp; Threat Intelligence Mastered.
                  </span>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs font-mono">
                  READY FOR MODULE 12
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
                        {node.id === 'signoff-dossier-assembly' ? (
                          <FileText className="w-6 h-6 text-sky-400" />
                        ) : node.id === 'signoff-qualified-classification' ? (
                          <ShieldCheck className="w-6 h-6 text-purple-400" />
                        ) : node.id === 'signoff-supervisory-gate' ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
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
