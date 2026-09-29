'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  Server,
  Activity,
  Terminal,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Filter,
  Layers,
  Database,
  Cpu,
  Wifi,
  Lock,
  Unlock,
  Eye,
  Sliders,
  Play,
  RotateCcw,
  Check,
  X,
  FileText,
  UserCheck,
  AlertTriangle,
  Globe,
  Radio,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useProgressStore } from '@/store/progress-store';
import { useAdminConfigStore } from '@/store/admin-config-store';
import { useToast } from '@/components/ui/toast-provider';

interface DashboardProps {
  topicId: string;
}

// =========================================================================
// DASHBOARD 1-1: Sensor & Telemetry Pipeline Simulator
// =========================================================================
function Dashboard11() {
  const [sensors, setSensors] = useState({
    firewall: true,
    sysmon: true,
    nginx: true,
    cloudtrail: false,
  });
  const [injected, setInjected] = useState(false);
  const [inspectingSchema, setInspectingSchema] = useState(false);

  const activeSensorCount = Object.values(sensors).filter(Boolean).length;
  const epsRate = activeSensorCount * 8500 + (injected ? 4200 : 0);

  const toggleSensor = (key: keyof typeof sensors) => {
    setSensors((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4">
      {/* Pipeline Control Deck */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <button
          onClick={() => toggleSensor('firewall')}
          className={`p-3 rounded-xl border text-left transition-all ${
            sensors.firewall ? 'bg-primary/10 border-primary' : 'bg-muted/30 border-border opacity-60'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold">
            <span>Palo Alto FW</span>
            <span>{sensors.firewall ? 'ONLINE' : 'OFFLINE'}</span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">Perimeter Wire Telemetry</p>
        </button>

        <button
          onClick={() => toggleSensor('sysmon')}
          className={`p-3 rounded-xl border text-left transition-all ${
            sensors.sysmon ? 'bg-emerald-500/10 border-emerald-500' : 'bg-muted/30 border-border opacity-60'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-emerald-700">
            <span>Windows Sysmon</span>
            <span>{sensors.sysmon ? 'ONLINE' : 'OFFLINE'}</span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">Process Creation E1</p>
        </button>

        <button
          onClick={() => toggleSensor('nginx')}
          className={`p-3 rounded-xl border text-left transition-all ${
            sensors.nginx ? 'bg-amber-500/10 border-amber-500' : 'bg-muted/30 border-border opacity-60'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-amber-700">
            <span>Nginx WAF</span>
            <span>{sensors.nginx ? 'ONLINE' : 'OFFLINE'}</span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">HTTP Access Logs</p>
        </button>

        <button
          onClick={() => toggleSensor('cloudtrail')}
          className={`p-3 rounded-xl border text-left transition-all ${
            sensors.cloudtrail ? 'bg-purple-500/10 border-purple-500' : 'bg-muted/30 border-border opacity-60'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-purple-700">
            <span>AWS CloudTrail</span>
            <span>{sensors.cloudtrail ? 'ONLINE' : 'OFFLINE'}</span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">IAM &amp; S3 Telemetry</p>
        </button>
      </div>

      {/* Real-time Telemetry Monitor */}
      <div className="p-4 rounded-xl border bg-slate-950 text-slate-100 font-mono text-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="font-bold">SIEM Ingestion Stream: {epsRate.toLocaleString()} EPS</span>
          </div>
          <Button
            size="sm"
            onClick={() => setInjected(!injected)}
            className="h-7 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white"
          >
            {injected ? 'Clear Test Attack' : 'Inject Malicious PowerShell Payload'}
          </Button>
        </div>

        {injected ? (
          <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 space-y-1">
            <p className="font-bold text-rose-400">🚨 INGESTED MALICIOUS EVENT CAPTURED (Event ID 4688):</p>
            <p>ParentProcess: EXCEL.EXE $\to$ ChildProcess: powershell.exe -enc SQBYAE0A...</p>
            <p>TargetHost: FIN-WS-09 | Normalized User: j.doe | Severity: HIGH (Rule: T1059.001)</p>
          </div>
        ) : (
          <p className="text-slate-400 text-[11px] italic">
            // Telemetry stream active. Normal baseline traffic flowing across {activeSensorCount} active collectors.
          </p>
        )}

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Schema: Elastic Common Schema (ECS) 8.11</span>
          <button
            onClick={() => setInspectingSchema(!inspectingSchema)}
            className="text-primary hover:underline font-bold"
          >
            {inspectingSchema ? 'Hide Normalized Schema' : 'Inspect Field Normalization Mapping $\to$'}
          </button>
        </div>

        {inspectingSchema && (
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] space-y-1.5 text-slate-300">
            <div className="flex justify-between border-b border-slate-800 pb-1">
              <span className="text-slate-400 font-bold">Raw Vendor Attribute</span>
              <span className="text-emerald-400 font-bold">SIEM Normalized Attribute</span>
            </div>
            <div className="flex justify-between">
              <span>Windows: TargetUserName</span>
              <span className="text-emerald-400">user.name</span>
            </div>
            <div className="flex justify-between">
              <span>Palo Alto: src_ip</span>
              <span className="text-emerald-400">source.ip</span>
            </div>
            <div className="flex justify-between">
              <span>Sysmon: ParentImage</span>
              <span className="text-emerald-400">process.parent.executable</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =========================================================================
// DASHBOARD 1-2: Tier Escalation & Incident Routing Console
// =========================================================================
function Dashboard12() {
  const [decisions, setDecisions] = useState<Record<string, number>>({});
  const { addXP } = useProgressStore();
  const { xpSystemEnabled } = useAdminConfigStore();
  const { showToast } = useToast();

  const cases = [
    {
      id: 'case-1',
      title: 'Alert: Benign Pop-up on Marketing Laptop',
      description: 'Employee clicked a coupon website; Chrome blocked a download. No persistence or process execution occurred.',
      correctTier: 1,
      explanation: 'Tier 1 handles initial triage and filters out benign/non-impact events directly without escalating.',
    },
    {
      id: 'case-2',
      title: 'Alert: Office Macro Spawning PowerShell with Network Beacon',
      description: 'Word doc spawned PowerShell on finance PC, connecting to external C2. Process is currently active in memory.',
      correctTier: 2,
      explanation: 'Tier 2 (Incident Response) takes ownership of verified active threats requiring host containment and forensic memory analysis.',
    },
    {
      id: 'case-3',
      title: 'Alert: Ransomware Lateral Movement to Domain Controller',
      description: 'Adversary dumped NTDS.dit hashes and started encrypting file shares across the corporate core.',
      correctTier: 3,
      explanation: 'Tier 3 / CSIRT handles catastrophic enterprise-wide breaches, root-cause threat actor hunting, and C-suite briefings.',
    },
  ];

  const handleRoute = (caseId: string, tier: number, correctTier: number) => {
    setDecisions((prev) => ({ ...prev, [caseId]: tier }));
    if (tier === correctTier) {
      if (xpSystemEnabled) addXP(30);
      showToast({
        type: 'success',
        title: 'Correct Routing Decision! 🎯',
        description: `Case routed properly. +${xpSystemEnabled ? 30 : 0} XP awarded.`,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-xl border bg-muted/20 text-xs">
        <p className="font-semibold text-foreground">Interactive Challenge: Route Incident Cases to the Appropriate SOC Tier</p>
        <p className="text-muted-foreground mt-0.5">
          As a SOC analyst, improper escalation floods Tier 2, while failing to escalate allows intrusions to spread. Select the proper tier for each live case.
        </p>
      </div>

      <div className="space-y-3">
        {cases.map((c) => {
          const userChoice = decisions[c.id];
          const isCorrect = userChoice === c.correctTier;

          return (
            <div key={c.id} className="p-4 rounded-xl border bg-card space-y-3 shadow-xs">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-sm text-foreground">{c.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.description}</p>
                </div>
                {userChoice && (
                  <Badge variant={isCorrect ? 'default' : 'destructive'} className="text-[10px]">
                    {isCorrect ? 'Correct Tier ✓' : 'Incorrect Tier ✗'}
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {[1, 2, 3].map((tier) => (
                  <Button
                    key={tier}
                    size="sm"
                    variant={userChoice === tier ? (isCorrect ? 'default' : 'destructive') : 'outline'}
                    onClick={() => handleRoute(c.id, tier, c.correctTier)}
                    className="text-xs font-semibold h-8"
                  >
                    {tier === 1 ? 'Handle at Tier 1 (L1)' : tier === 2 ? 'Escalate to Tier 2 (L2 IR)' : 'Escalate to Tier 3 / CSIRT'}
                  </Button>
                ))}
              </div>

              {userChoice && (
                <div className={`p-2.5 rounded-lg text-xs ${isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'}`}>
                  <strong>{isCorrect ? 'Accurate: ' : 'Protocol Guidance: '}</strong>
                  {c.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =========================================================================
// DASHBOARD 1-3: Multi-Tool Security Stack Workbench (SIEM, EDR, NDR, SOAR)
// =========================================================================
function Dashboard13() {
  const [activeTool, setActiveTool] = useState<'siem' | 'edr' | 'ndr' | 'soar'>('siem');
  const [hostIsolated, setHostIsolated] = useState(false);
  const [ipBlocked, setIpBlocked] = useState(false);

  return (
    <div className="space-y-4">
      {/* Tool Selector Tabs */}
      <div className="flex items-center gap-2 border-b pb-2 text-xs font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTool('siem')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
            activeTool === 'siem' ? 'bg-purple-600 text-white' : 'bg-muted/40 hover:bg-muted text-foreground'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          SIEM Correlation
        </button>
        <button
          onClick={() => setActiveTool('edr')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
            activeTool === 'edr' ? 'bg-emerald-600 text-white' : 'bg-muted/40 hover:bg-muted text-foreground'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          EDR Endpoint Agent
        </button>
        <button
          onClick={() => setActiveTool('ndr')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
            activeTool === 'ndr' ? 'bg-blue-600 text-white' : 'bg-muted/40 hover:bg-muted text-foreground'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          NDR Wire Monitor
        </button>
        <button
          onClick={() => setActiveTool('soar')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
            activeTool === 'soar' ? 'bg-amber-600 text-white' : 'bg-muted/40 hover:bg-muted text-foreground'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          SOAR Playbooks
        </button>
      </div>

      {/* Tool Screen Display */}
      <div className="p-5 rounded-xl border bg-slate-950 text-slate-100 font-mono text-xs space-y-4 shadow-inner">
        {activeTool === 'siem' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-purple-400 font-bold">SPLUNK ENTERPRISE SECURITY // CORRELATION VIEW</span>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/40 text-[10px]">CORRELATED INCIDENT #4088</Badge>
            </div>
            <p className="text-slate-300">index=security (EventCode=4688 OR sourcetype=pan:traffic) host=FIN-WS-09 | stats count by user, Image, dest_ip</p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-[11px] text-slate-300">
              <p>Timestamp: 2026-09-29 03:14:02 UTC | User: a.chen | Host: FIN-WS-09</p>
              <p>Correlation: Macro Execution $\to$ EDR Memory Alert $\to$ High Outbound Beacon Count</p>
            </div>
          </div>
        )}

        {activeTool === 'edr' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-emerald-400 font-bold">CROWDSTRIKE FALCON // ENDPOINT TELEMETRY</span>
              <Button
                size="sm"
                variant={hostIsolated ? 'secondary' : 'destructive'}
                onClick={() => setHostIsolated(!hostIsolated)}
                className="h-7 text-xs font-bold"
              >
                {hostIsolated ? 'Host Isolated (Network Severed) ✓' : 'Execute Host Network Containment'}
              </Button>
            </div>
            <p className="text-slate-300">Process Tree: WINWORD.EXE (4920) $\to$ cmd.exe (5812) $\to$ powershell.exe (6104)</p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              <p>Status: {hostIsolated ? 'CONTAINED — Host can only communicate with EDR server.' : 'ONLINE — Full corporate subnet access.'}</p>
            </div>
          </div>
        )}

        {activeTool === 'ndr' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-blue-400 font-bold">ZEEK NETWORK MONITOR // WIRE METADATA</span>
              <span className="text-slate-400">CONN.LOG / SSL.LOG</span>
            </div>
            <p className="text-slate-300">src_ip: 10.0.12.44 $\to$ dest_ip: 203.0.113.88:443 | Protocol: TCP/TLS1.3</p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
              <p>Periodic Beaconing Detected: Connection attempt every 45.02 seconds ($\pm 0.4s$ jitter).</p>
              <p>TLS Certificate Subject: C2-Cobalt-Default (Self-signed, untrusted CA).</p>
            </div>
          </div>
        )}

        {activeTool === 'soar' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-amber-400 font-bold">CORTEX XSOAR // AUTOMATED PLAYBOOK RUNNER</span>
              <span className="text-amber-400 font-bold">PLAYBOOK: PB-ENRICH-ISOLATE</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span>Task 1: Query VirusTotal &amp; AbuseIPDB</span>
                <span className="text-emerald-400 font-bold">COMPLETED (Score 88%)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span>Task 2: Block 203.0.113.88 on Edge Palo Alto Firewall</span>
                <Button
                  size="sm"
                  onClick={() => setIpBlocked(!ipBlocked)}
                  className="h-6 text-[10px] font-bold"
                >
                  {ipBlocked ? 'IP Blocked ✓' : 'Approve Auto-Block API'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =========================================================================
// DASHBOARD 2-1: SIEM Alert Ingestion Queue & SLA Console
// =========================================================================
function Dashboard21() {
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [claimedAlerts, setClaimedAlerts] = useState<string[]>([]);

  const alerts = [
    { id: 'alt-1', title: 'Ransomware Canary Triggered', host: 'FIN-DB01', severity: 'Critical', sla: '12m', time: '03:12 UTC' },
    { id: 'alt-2', title: 'External Kerberos Password Spraying', host: 'VPN-GW01', severity: 'High', sla: '28m', time: '03:14 UTC' },
    { id: 'alt-3', title: 'Anomalous DNS TXT Query Volume', host: 'WS-CORP-44', severity: 'Medium', sla: '1h 45m', time: '03:05 UTC' },
    { id: 'alt-4', title: 'Internal Port Scan on Lab Subnet', host: 'DEV-SRV-02', severity: 'Low', sla: '18h', time: '02:40 UTC' },
  ];

  const filtered = filterSeverity === 'all' ? alerts : alerts.filter((a) => a.severity.toLowerCase() === filterSeverity.toLowerCase());

  const handleClaim = (id: string) => {
    if (!claimedAlerts.includes(id)) {
      setClaimedAlerts([...claimedAlerts, id]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 text-xs font-bold">
          <Filter className="w-3.5 h-3.5 text-primary" />
          <span>Queue Filter:</span>
          {['all', 'critical', 'high', 'medium', 'low'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterSeverity(f)}
              className={`px-2.5 py-1 rounded-md text-[11px] uppercase transition-colors ${
                filterSeverity === f ? 'bg-primary text-white' : 'bg-muted/50 hover:bg-muted text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground font-mono">
          {claimedAlerts.length} / {alerts.length} Claimed
        </span>
      </div>

      {/* Alert Queue Table */}
      <div className="space-y-2">
        {filtered.map((alt) => {
          const isClaimed = claimedAlerts.includes(alt.id);
          return (
            <div
              key={alt.id}
              className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                isClaimed ? 'bg-emerald-50/20 border-emerald-300' : 'bg-card border-border hover:border-primary/40'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <Badge
                  className={
                    alt.severity === 'Critical'
                      ? 'bg-rose-100 text-rose-800 border-rose-300'
                      : alt.severity === 'High'
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : alt.severity === 'Medium'
                      ? 'bg-blue-100 text-blue-800 border-blue-300'
                      : 'bg-slate-100 text-slate-800 border-slate-300'
                  }
                >
                  {alt.severity}
                </Badge>
                <div>
                  <h4 className="font-bold text-sm text-foreground truncate">{alt.title}</h4>
                  <p className="text-xs text-muted-foreground">Entity: {alt.host} • Ingested: {alt.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                <span className="text-xs font-mono text-rose-600 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  SLA: {alt.sla}
                </span>
                <Button
                  size="sm"
                  variant={isClaimed ? 'outline' : 'default'}
                  onClick={() => handleClaim(alt.id)}
                  className="h-8 text-xs font-bold"
                >
                  {isClaimed ? 'Claimed by You ✓' : 'Claim Alert'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =========================================================================
// DASHBOARD 2-2: Forensic Evidence Dossier & Context Explorer
// =========================================================================
function Dashboard22() {
  const [activeArtifact, setActiveArtifact] = useState<string>('host');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
        <button
          onClick={() => setActiveArtifact('host')}
          className={`p-2.5 rounded-lg border text-left transition-all ${
            activeArtifact === 'host' ? 'bg-primary text-white border-primary' : 'bg-card hover:bg-muted text-foreground'
          }`}
        >
          1. Host Process Tree
        </button>
        <button
          onClick={() => setActiveArtifact('network')}
          className={`p-2.5 rounded-lg border text-left transition-all ${
            activeArtifact === 'network' ? 'bg-primary text-white border-primary' : 'bg-card hover:bg-muted text-foreground'
          }`}
        >
          2. Network Flow
        </button>
        <button
          onClick={() => setActiveArtifact('user')}
          className={`p-2.5 rounded-lg border text-left transition-all ${
            activeArtifact === 'user' ? 'bg-primary text-white border-primary' : 'bg-card hover:bg-muted text-foreground'
          }`}
        >
          3. User Baseline
        </button>
        <button
          onClick={() => setActiveArtifact('intel')}
          className={`p-2.5 rounded-lg border text-left transition-all ${
            activeArtifact === 'intel' ? 'bg-primary text-white border-primary' : 'bg-card hover:bg-muted text-foreground'
          }`}
        >
          4. Threat Intel Pivot
        </button>
      </div>

      <div className="p-5 rounded-xl border bg-card space-y-3 shadow-xs">
        {activeArtifact === 'host' && (
          <div className="space-y-2">
            <Badge className="bg-rose-100 text-rose-800 border-rose-300">Host Telemetry (Sysmon Event 1)</Badge>
            <h4 className="font-bold text-sm text-foreground">powershell.exe spawned with execution bypass</h4>
            <div className="p-3 rounded-lg bg-slate-950 text-emerald-400 font-mono text-xs">
              CommandLine: powershell.exe -NoP -NonI -W Hidden -Exec Bypass -enc SQBYAE0A...
              <br />
              Parent: C:\Program Files\Microsoft Office\root\Office16\EXCEL.EXE
            </div>
            <p className="text-xs text-muted-foreground">Analyst Finding: Office macro executing an encoded in-memory PowerShell stager.</p>
          </div>
        )}

        {activeArtifact === 'network' && (
          <div className="space-y-2">
            <Badge className="bg-amber-100 text-amber-800 border-amber-300">Network Telemetry (Firewall / NetFlow)</Badge>
            <h4 className="font-bold text-sm text-foreground">Outbound Egress to 203.0.113.88:443</h4>
            <div className="p-3 rounded-lg bg-slate-950 text-emerald-400 font-mono text-xs">
              Protocol: TCP 443 | Egress Bytes: 142,880 | Ingress Bytes: 1,840,920
              <br />
              Action: Denied by NextGen Perimeter Egress Filtering Policy
            </div>
            <p className="text-xs text-muted-foreground">Analyst Finding: Egress block prevented second-stage payload download from C2.</p>
          </div>
        )}

        {activeArtifact === 'user' && (
          <div className="space-y-2">
            <Badge className="bg-blue-100 text-blue-800 border-blue-300">Identity Context (Active Directory Audit)</Badge>
            <h4 className="font-bold text-sm text-foreground">Account: a.chen (Finance Dept)</h4>
            <div className="p-3 rounded-lg bg-slate-950 text-emerald-400 font-mono text-xs">
              Baseline Hours: 09:00 - 17:00 EST | Alert Timestamp: 03:14:02 EST (Anomalous)
              <br />
              MFA Method: Push Notification | GeoIP: Ukraine (User resides in Boston, MA)
            </div>
            <p className="text-xs text-muted-foreground">Analyst Finding: Impossible travel anomaly confirms compromised user credentials.</p>
          </div>
        )}

        {activeArtifact === 'intel' && (
          <div className="space-y-2">
            <Badge className="bg-purple-100 text-purple-800 border-purple-300">Threat Intelligence Enrichment</Badge>
            <h4 className="font-bold text-sm text-foreground">VirusTotal &amp; AlienVault OTX Query</h4>
            <div className="p-3 rounded-lg bg-slate-950 text-emerald-400 font-mono text-xs">
              IP: 203.0.113.88 | ASN: AS49202 (Bulletproof Hosting Provider)
              <br />
              Reputation: 48/68 Security Vendors Flagged Malicious (Cobalt Strike C2 Server)
            </div>
            <p className="text-xs text-muted-foreground">Analyst Finding: Confirmed malicious infrastructure associated with FIN7 threat group.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// =========================================================================
// DASHBOARD 2-3: True Positive vs False Positive Triage Workbench
// =========================================================================
function Dashboard23() {
  const [verdicts, setVerdicts] = useState<Record<string, string>>({});

  const scenarios = [
    {
      id: 'scen-1',
      title: 'Alert: certutil.exe download from github.com',
      details: 'Command: certutil.exe -urlcache -split -f https://raw.githubusercontent.com/... on DEV-WS-02 during normal working hours by senior developer.',
      correct: 'FP',
      explanation: 'Authorized developer downloading open-source scripts during work hours with verified dev approval (Benign Activity).',
    },
    {
      id: 'scen-2',
      title: 'Alert: 48 Failed Logins from Tor Exit Node',
      details: 'Source IP 198.51.100.42 attempted 48 distinct usernames against corporate VPN at 03:00 AM UTC. 0 successful logins.',
      correct: 'TP',
      explanation: 'Active external password spray attack originating from anonymity network (True Positive Attack).',
    },
    {
      id: 'scen-3',
      title: 'Alert: Nessus Vulnerability Scanner Port Sweep',
      details: 'IP 10.0.4.15 triggered 1,200 port scan alerts across server subnet. Change ticket CHG-8910 approved for security audit.',
      correct: 'FP',
      explanation: 'Authorized vulnerability scanning during approved maintenance window (Benign Scheduled Activity).',
    },
  ];

  return (
    <div className="space-y-3">
      {scenarios.map((sc) => {
        const choice = verdicts[sc.id];
        const isCorrect = choice === sc.correct;

        return (
          <div key={sc.id} className="p-4 rounded-xl border bg-card space-y-3 shadow-xs">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-bold text-sm text-foreground">{sc.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{sc.details}</p>
              </div>
              {choice && (
                <Badge variant={isCorrect ? 'default' : 'destructive'} className="text-[10px]">
                  {isCorrect ? 'Correct Verdict ✓' : 'Incorrect Verdict ✗'}
                </Badge>
              )}
            </div>

            <div className="flex gap-2 pt-1">
              <Button
                size="sm"
                variant={choice === 'TP' ? (isCorrect ? 'default' : 'destructive') : 'outline'}
                onClick={() => setVerdicts((prev) => ({ ...prev, [sc.id]: 'TP' }))}
                className="text-xs font-bold h-8"
              >
                True Positive (Malicious)
              </Button>
              <Button
                size="sm"
                variant={choice === 'FP' ? (isCorrect ? 'default' : 'destructive') : 'outline'}
                onClick={() => setVerdicts((prev) => ({ ...prev, [sc.id]: 'FP' }))}
                className="text-xs font-bold h-8"
              >
                False Positive (Benign / Authorized)
              </Button>
            </div>

            {choice && (
              <div className={`p-2.5 rounded-lg text-xs ${isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'}`}>
                <strong>Analyst Verdict Rationale: </strong>
                {sc.explanation}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// =========================================================================
// DASHBOARD 3-1: Severity & SLA Calculator Dashboard
// =========================================================================
function Dashboard31() {
  const [impact, setImpact] = useState<number>(3); // 1 to 4
  const [urgency, setUrgency] = useState<number>(3); // 1 to 4

  const score = impact * urgency;
  let severityLabel = 'P3 - MEDIUM';
  let slaTime = '4 Hours';
  let badgeColor = 'bg-blue-100 text-blue-800 border-blue-300';

  if (score >= 12) {
    severityLabel = 'P1 - CRITICAL';
    slaTime = '15 Minutes';
    badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';
  } else if (score >= 8) {
    severityLabel = 'P2 - HIGH';
    slaTime = '1 Hour';
    badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
  } else if (score <= 3) {
    severityLabel = 'P4 - LOW';
    slaTime = '24 Hours';
    badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Asset Impact Selector */}
        <div className="p-4 rounded-xl border bg-card space-y-2">
          <label className="text-xs font-bold text-foreground block">
            1. Asset Business Criticality: Level {impact}
          </label>
          <input
            type="range"
            min="1"
            max="4"
            value={impact}
            onChange={(e) => setImpact(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-[11px] text-muted-foreground">
            {impact === 1 && 'Tier 4: Guest Wi-Fi / Non-Critical Workstation'}
            {impact === 2 && 'Tier 3: Standard Employee Laptop'}
            {impact === 3 && 'Tier 2: Production Web / Application Server'}
            {impact === 4 && 'Tier 1: Enterprise Domain Controller / Financial DB'}
          </p>
        </div>

        {/* Threat Urgency Selector */}
        <div className="p-4 rounded-xl border bg-card space-y-2">
          <label className="text-xs font-bold text-foreground block">
            2. Adversary Threat Urgency: Level {urgency}
          </label>
          <input
            type="range"
            min="1"
            max="4"
            value={urgency}
            onChange={(e) => setUrgency(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-[11px] text-muted-foreground">
            {urgency === 1 && 'Phase 1: Reconnaissance / Port Sweep'}
            {urgency === 2 && 'Phase 2: Delivery / Phishing Attachment Blocked'}
            {urgency === 3 && 'Phase 3: Active Host Execution / Beaconing'}
            {urgency === 4 && 'Phase 4: Ransomware Lateral Movement / Exfiltration'}
          </p>
        </div>
      </div>

      {/* Dynamic SLA Result Box */}
      <div className="p-5 rounded-xl border bg-gradient-to-br from-card to-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <Badge className={`text-xs font-bold ${badgeColor}`}>{severityLabel}</Badge>
          <h4 className="text-lg font-bold text-foreground mt-1">Calculated Incident SLA: {slaTime}</h4>
          <p className="text-xs text-muted-foreground">
            Escalation Target: {score >= 8 ? 'Immediate Tier 2 Dispatch + On-Call Notification' : 'Standard L1 Triage Queue'}
          </p>
        </div>

        <div className="p-3 rounded-lg bg-card border text-right">
          <span className="text-[10px] text-muted-foreground uppercase font-bold block">Response Countdown</span>
          <span className="text-2xl font-mono font-bold text-primary">{slaTime}</span>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// DASHBOARD 3-2: Shift Handover & Escalation Flight Plan Builder
// =========================================================================
function Dashboard32() {
  const [fields, setFields] = useState({
    who: true,
    what: true,
    where: true,
    when: true,
    why: false,
  });

  const allComplete = Object.values(fields).every(Boolean);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-card space-y-3">
        <h4 className="font-bold text-sm text-foreground">Standardized 5 W&apos;s Escalation &amp; Shift Handover Dossier</h4>
        <p className="text-xs text-muted-foreground">
          A successful shift handoff ensures zero dropped alerts. Toggle each required field to verify audit completeness.
        </p>

        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between p-2.5 rounded-lg border text-xs">
            <span>1. WHO: Compromised Account (j.doe) &amp; Threat Actor (FIN7)</span>
            <input
              type="checkbox"
              checked={fields.who}
              onChange={() => setFields((p) => ({ ...p, who: !p.who }))}
              className="w-4 h-4 text-primary rounded"
            />
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg border text-xs">
            <span>2. WHAT: PowerShell Execution (Event 4688) &amp; C2 Beaconing</span>
            <input
              type="checkbox"
              checked={fields.what}
              onChange={() => setFields((p) => ({ ...p, what: !p.what }))}
              className="w-4 h-4 text-primary rounded"
            />
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg border text-xs">
            <span>3. WHERE: Workstation FIN-WS-09 &amp; Destination IP 203.0.113.88</span>
            <input
              type="checkbox"
              checked={fields.where}
              onChange={() => setFields((p) => ({ ...p, where: !p.where }))}
              className="w-4 h-4 text-primary rounded"
            />
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg border text-xs">
            <span>4. WHEN: 2026-09-29 03:14:02 UTC (Standardized Timestamp)</span>
            <input
              type="checkbox"
              checked={fields.when}
              onChange={() => setFields((p) => ({ ...p, when: !p.when }))}
              className="w-4 h-4 text-primary rounded"
            />
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg border text-xs">
            <span>5. WHY / STATUS: EDR host containment pending approval from shift lead</span>
            <input
              type="checkbox"
              checked={fields.why}
              onChange={() => setFields((p) => ({ ...p, why: !p.why }))}
              className="w-4 h-4 text-primary rounded"
            />
          </div>
        </div>

        {allComplete ? (
          <div className="p-3 rounded-lg bg-emerald-100/60 border border-emerald-300 text-emerald-950 font-bold text-xs">
            ✅ Dossier 100% Complete — Ready for Secure Transmission to Incoming APAC Shift Lead!
          </div>
        ) : (
          <p className="text-xs text-amber-700 italic">Complete all 5 fields to achieve audit-compliant handover readiness.</p>
        )}
      </div>
    </div>
  );
}

// =========================================================================
// DASHBOARD 3-3: SecOps Incident Ticket Auditor
// =========================================================================
function Dashboard33() {
  const [fixedUtc, setFixedUtc] = useState(false);
  const [fixedIoc, setFixedIoc] = useState(false);

  const ready = fixedUtc && fixedIoc;

  return (
    <div className="space-y-4">
      <div className="p-5 rounded-xl border bg-slate-950 text-slate-100 font-mono text-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-bold text-slate-300">SERVICENOW SECOPS // TICKET AUDIT WORKBENCH</span>
          <Badge className={ready ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500' : 'bg-rose-500/20 text-rose-400 border-rose-500'}>
            {ready ? 'AUDIT READY (100%)' : 'COMPLIANCE DEFECTS DETECTED'}
          </Badge>
        </div>

        <div className="space-y-2 text-[11px] text-slate-300">
          <p>
            <strong>Timestamp:</strong>{' '}
            {fixedUtc ? (
              <span className="text-emerald-400">2026-09-29 03:14:02 UTC ✓</span>
            ) : (
              <span className="text-rose-400 underline">3:14 AM (Local laptop clock — Non-Compliant)</span>
            )}
          </p>

          <p>
            <strong>IOC Evidence List:</strong>{' '}
            {fixedIoc ? (
              <span className="text-emerald-400">SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 ✓</span>
            ) : (
              <span className="text-rose-400 underline">None attached — Non-Compliant</span>
            )}
          </p>
        </div>

        <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2">
          {!fixedUtc && (
            <Button
              size="sm"
              onClick={() => setFixedUtc(true)}
              className="h-7 text-xs font-bold bg-primary hover:bg-primary/90"
            >
              Fix: Standardize to UTC Time
            </Button>
          )}
          {!fixedIoc && (
            <Button
              size="sm"
              onClick={() => setFixedIoc(true)}
              className="h-7 text-xs font-bold bg-primary hover:bg-primary/90"
            >
              Fix: Attach SHA256 IOC Hashes
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// Master component switching based on active topic
export function InteractiveTopicDashboard({ topicId }: DashboardProps) {
  switch (topicId) {
    case 'topic-1-1':
      return <Dashboard11 />;
    case 'topic-1-2':
      return <Dashboard12 />;
    case 'topic-1-3':
      return <Dashboard13 />;
    case 'topic-2-1':
      return <Dashboard21 />;
    case 'topic-2-2':
      return <Dashboard22 />;
    case 'topic-2-3':
      return <Dashboard23 />;
    case 'topic-3-1':
      return <Dashboard31 />;
    case 'topic-3-2':
      return <Dashboard32 />;
    case 'topic-3-3':
      return <Dashboard33 />;
    default:
      return <Dashboard11 />;
  }
}
