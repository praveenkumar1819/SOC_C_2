'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  ArrowUpRight,
  ShieldAlert,
  GitPullRequest,
  Copy,
  Check,
  CheckCircle2,
  FileText,
  Clock,
  UserCheck,
  Server,
  Sparkles
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function EscalationPath() {
  const [selectedTier, setSelectedTier] = useState<number>(1);

  const tiers = [
    {
      tier: 1,
      title: 'Tier 1 (L1) Analyst',
      subtitle: 'First Line of Defense',
      badge: 'Intake & Triage',
      sla: 'Response: 5-15 min',
      color: 'text-blue-600',
      bgLight: 'bg-blue-50',
      borderLight: 'border-blue-200',
      responsibilities: [
        'Queue monitoring across SIEM, EDR, and email gateways.',
        'Initial alert triage: Validate user identity, host criticality, and IP reputation.',
        'False positive filtering and documentation of benign administrative events.',
        'Standard initial containment (e.g., host isolation via EDR if authorized).'
      ],
      escalateWhen: 'Alert involves confirmed active malware, executive account, lateral movement, or investigation exceeds 20 minutes without clear resolution.'
    },
    {
      tier: 2,
      title: 'Tier 2 (L2) Analyst',
      subtitle: 'Incident Investigation & Scoping',
      badge: 'Deep Investigation',
      sla: 'Response: 15-30 min',
      color: 'text-indigo-600',
      bgLight: 'bg-indigo-50',
      borderLight: 'border-indigo-200',
      responsibilities: [
        'Reconstruct full attack chronology from initial access to detection.',
        'Scope enterprise fleet for indicators of compromise (IOCs) across telemetry.',
        'Execute containment playbooks, revoke API credentials, and coordinate with IT sysadmins.',
        'Perform basic static analysis on suspect malicious attachments and scripts.'
      ],
      escalateWhen: 'Attack exhibits advanced persistent threat (APT) indicators, undetected persistence mechanisms, or widespread enterprise-wide compromise.'
    },
    {
      tier: 3,
      title: 'Tier 3 (L3) / Senior IR',
      subtitle: 'Threat Hunting & Forensics',
      badge: 'Advanced Forensics',
      sla: 'Response: Immediate / P1',
      color: 'text-purple-600',
      bgLight: 'bg-purple-50',
      borderLight: 'border-purple-200',
      responsibilities: [
        'Memory forensics (Volatility, WinDbg) and binary reverse engineering.',
        'Proactive threat hunting for un-alerted adversaries using MITRE ATT&CK techniques.',
        'Threat actor attribution and adversary infrastructure intelligence gathering.',
        'Design custom detection engineering rules and tune SIEM correlation logic.'
      ],
      escalateWhen: 'Critical business operations halted, severe intellectual property theft, or nation-state cyber espionage detected.'
    },
    {
      tier: 4,
      title: 'Management & Incident Commander',
      subtitle: 'Strategic & Executive Command',
      badge: 'Crisis Leadership',
      sla: 'Strategic Oversight',
      color: 'text-rose-600',
      bgLight: 'bg-rose-50',
      borderLight: 'border-rose-200',
      responsibilities: [
        'Convene Crisis Management Team and coordinate Incident Command System (ICS).',
        'Liaison with Corporate Legal, Human Resources, and Public Relations.',
        'Authorize business-critical system shutdowns (e.g., taking ERP offline).',
        'Regulatory reporting (e.g., SEC 4-day disclosure, GDPR 72-hour notification).'
      ],
      escalateWhen: 'Material business disruption, confirmed customer data breach, or law enforcement notification required.'
    }
  ];

  const current = tiers.find((t) => t.tier === selectedTier) || tiers[0];

  return (
    <Card className="border border-border/80 shadow-sm bg-card overflow-hidden my-6">
      <div className="p-6 bg-gradient-to-r from-slate-50 to-indigo-50/30 border-b border-border/60">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs bg-white text-primary border-primary/20">
            <Layers className="w-3 h-3 mr-1" /> Tiered Defense
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">SOC Escalation Hierarchy</span>
        </div>
        <h3 className="text-xl font-bold text-foreground">The SOC Escalation Path</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Effective SOCs function as an escalating pyramid. L1 analysts filter the noise so L2 and L3 specialists can focus on complex adversary operations.
        </p>

        {/* Tier selection buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mt-6">
          {tiers.map((t) => {
            const isSelected = t.tier === selectedTier;
            return (
              <button
                key={t.tier}
                onClick={() => setSelectedTier(t.tier)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? `${t.bgLight} ${t.borderLight} ring-2 ring-primary/20 shadow-xs`
                    : 'bg-white hover:bg-slate-50 border-border/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-mono font-bold ${t.color}`}>Tier {t.tier}</span>
                  <span className="text-[10px] text-muted-foreground">{t.sla}</span>
                </div>
                <div className="text-xs font-bold text-foreground truncate">{t.title}</div>
                <div className="text-[11px] text-muted-foreground">{t.badge}</div>
              </button>
            );
          })}
        </div>
      </div>

      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.tier}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div>
                <h4 className="text-base font-bold text-foreground">{current.title}</h4>
                <p className="text-xs text-muted-foreground">{current.subtitle}</p>
              </div>
              <Badge className={`${current.bgLight} ${current.color} border text-xs font-mono`}>
                {current.sla}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl border border-border/80 bg-slate-50/50 space-y-2">
                <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Core Operational Responsibilities</span>
                </span>
                <ul className="space-y-1.5">
                  {current.responsibilities.map((r, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl border border-border/80 bg-slate-50/50 space-y-2">
                <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <ArrowUpRight className="w-4 h-4 text-rose-500" />
                  <span>Escalation Handover Threshold</span>
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">{current.escalateWhen}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

export function EscalationDecisionTree() {
  const triggers = [
    {
      title: 'Active Ransomware / Wiper',
      trigger: 'File extensions renaming, shadow copies deleted (vssadmin delete shadows).',
      action: 'Escalate to L2 / Incident Commander within 5 minutes. Isolate host immediately.',
      immediate: true
    },
    {
      title: 'Confirmed Data Exfiltration',
      trigger: 'Large compressed archives (ZIP/7z) uploaded to unauthorized cloud storage or Tor exit node.',
      action: 'Escalate to L2 immediately. Sever outbound network connection.',
      immediate: true
    },
    {
      title: 'Domain Controller or Executive Host',
      trigger: 'Suspicious logon or PowerShell script execution on Tier-0 infrastructure or C-suite laptop.',
      action: 'Escalate to L2 with High priority. Notify SOC shift lead.',
      immediate: true
    },
    {
      title: 'Privilege Escalation / Credential Dump',
      trigger: 'LSASS memory access (Event 4656/Sysmon 10), unauthorized domain admin creation.',
      action: 'Escalate to L2. Prepare user account for emergency credential reset.',
      immediate: true
    },
    {
      title: 'Triage Time Limit Exceeded (>20 mins)',
      trigger: 'L1 analyst has spent 20 minutes investigating without determining if it is benign or malicious.',
      action: 'Escalate to L2 to prevent queue backlog starvation.',
      immediate: false
    }
  ];

  return (
    <Card className="border border-border/80 shadow-sm bg-card overflow-hidden my-6">
      <div className="p-6 bg-slate-50/70 border-b border-border/60">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className="text-xs bg-white text-primary border-primary/20">
            <ShieldAlert className="w-3 h-3 mr-1" /> Decision Matrix
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">When to Escalate</span>
        </div>
        <h3 className="text-xl font-bold text-foreground">Critical Escalation Triggers</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Memorize these golden rules. Never let pride or hesitation delay an escalation when any of these conditions are met.
        </p>
      </div>

      <CardContent className="p-6 space-y-3">
        {triggers.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl border border-border/80 bg-white hover:bg-slate-50/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-foreground">{item.title}</span>
                {item.immediate ? (
                  <Badge className="bg-rose-100 text-rose-800 border-rose-300 text-[10px]">
                    Immediate Escalation
                  </Badge>
                ) : (
                  <Badge className="bg-amber-100 text-amber-800 border-amber-300 text-[10px]">
                    SOP Threshold
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{item.trigger}</p>
            </div>
            <div className="text-xs font-semibold text-primary sm:text-right shrink-0 bg-primary-50 sm:bg-transparent p-2 sm:p-0 rounded-lg">
              {item.action}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function EscalationTemplate() {
  const [copied, setCopied] = useState(false);

  const templateText = `[ESCALATION DOSSIER: INC-2024-0115]
--------------------------------------------------
PRIORITY / SEVERITY : P2 - High
DATE & TIME (UTC)   : 2024-01-15 14:32:18 UTC
AFFECTED USER       : Finance01 (Sarah Johnson - Controller)
AFFECTED HOST       : FIN-PC-04 (IP: 192.168.10.45)
DETECTION RULE      : [SIEM-WIN-042] Multiple Failed Logins Followed by Remote Connection

INCIDENT SUMMARY:
10 consecutive failed Windows Logon attempts (Event ID 4625) recorded against Finance01 within 45 seconds, followed immediately by an outbound TLS connection to unregistered external IP 185.220.101.5.

EVIDENCE & IOCs:
- Workstation: FIN-PC-04 (Asset Tag: AT-8910)
- Source IP: 192.168.10.45 (Finance Subnet VLAN 10)
- Destination IP: 185.220.101.5:443 (AbuseIPDB Score: 88% - Known Tor Exit Node)
- Suspicious Child Process: powershell.exe -enc JABjAGwAaQBl...

ACTIONS TAKEN BY L1:
1. Contacted user Sarah Johnson via phone: User confirmed she was away at lunch and NOT attempting login.
2. Isolated host FIN-PC-04 via CrowdStrike Falcon console at 14:48 UTC.
3. Initiated Active Directory account lock and credential reset ticket with Identity team.

RECOMMENDATIONS FOR TIER 2:
- Extract and analyze encoded PowerShell payload from memory capture.
- Scope proxy logs for any other internal hosts beaconing to 185.220.101.5.
- Perform forensic triage on FIN-PC-04 master file table ($MFT).`;

  const handleCopy = () => {
    navigator.clipboard.writeText(templateText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border border-border/80 shadow-sm bg-card overflow-hidden my-6">
      <div className="p-6 bg-slate-50/70 border-b border-border/60">
        <div className="flex items-center justify-between mb-1">
          <Badge variant="outline" className="text-xs bg-white text-primary border-primary/20">
            <FileText className="w-3 h-3 mr-1" /> Industry Standard Handover
          </Badge>
          <Button variant="outline" size="sm" onClick={handleCopy} className="h-8 text-xs bg-white">
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Copied Dossier
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 mr-1" /> Copy Template
              </>
            )}
          </Button>
        </div>
        <h3 className="text-xl font-bold text-foreground">The Standard Escalation Dossier</h3>
        <p className="text-sm text-muted-foreground mt-1">
          When escalating to Tier 2, never say "Please look at this alert." Provide a complete, structured dossier so the senior analyst can act immediately.
        </p>
      </div>

      <CardContent className="p-6">
        <div className="rounded-xl border border-slate-300 bg-slate-900 text-slate-100 p-4 font-mono text-xs leading-relaxed overflow-x-auto shadow-inner">
          <pre className="whitespace-pre">{templateText}</pre>
        </div>
      </CardContent>
    </Card>
  );
}
