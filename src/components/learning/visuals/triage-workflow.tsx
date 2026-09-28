'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  UserCheck,
  Server,
  Globe,
  FileSearch,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Terminal,
  Clock,
  Sparkles,
  ListChecks
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TriageStep {
  step: number;
  title: string;
  icon: React.ElementType;
  badge: string;
  question: string;
  keyActions: string[];
  analystTip: string;
}

const triageSteps: TriageStep[] = [
  {
    step: 1,
    title: 'Understand the Alert',
    icon: HelpCircle,
    badge: 'Intake & Scope',
    question: 'What specific detection rule fired, and what logic caused it to trigger?',
    keyActions: [
      'Read rule description and detection query (e.g. Splunk SPL or KQL).',
      'Identify whether it is signature-based, threshold-based (10+ failures), or behavioral anomaly.',
      'Check MITRE ATT&CK mapping (e.g. T1110 Brute Force, T1059 Command Scripting Interpreter).'
    ],
    analystTip: 'Never jump straight into blocking without knowing WHY the SIEM alerted. Understanding the rule logic prevents misinterpreting normal traffic.'
  },
  {
    step: 2,
    title: 'Identify the User',
    icon: UserCheck,
    badge: 'Entity Context',
    question: 'Who is the account holder, what is their role, and is this activity typical?',
    keyActions: [
      'Check Active Directory / Entra ID for department, title, and manager.',
      'Determine account type: standard human user, IT domain admin, or automated service account.',
      'Review normal login patterns (typical work hours, usual source workstation, VPN usage).'
    ],
    analystTip: 'A failed login from a finance employee at 2:00 PM on their assigned desktop is very different from an unknown service account trying to log into the domain controller at 3:00 AM.'
  },
  {
    step: 3,
    title: 'Identify the Host',
    icon: Server,
    badge: 'Asset Criticality',
    question: 'What endpoint or server is involved, and what is its role in the enterprise?',
    keyActions: [
      'Look up asset inventory (CMDB): laptop, desktop, database server, domain controller, or web server.',
      'Verify host OS, patch state, and assigned business unit.',
      'Assess potential blast radius if the device were fully compromised.'
    ],
    analystTip: 'Severity scales rapidly with asset criticality. An infection on a test VM is Low/Medium; the same infection on a core payment gateway is immediate Critical.'
  },
  {
    step: 4,
    title: 'Identify the IP & Network',
    icon: Globe,
    badge: 'Network Scope',
    question: 'Where did the traffic originate, and where was it attempting to connect?',
    keyActions: [
      'Classify IP: Private RFC 1918 (10.x, 172.16-31.x, 192.168.x) vs Public Routable IP.',
      'Query IP reputation on VirusTotal, AbuseIPDB, and internal threat intelligence feeds.',
      'Inspect firewall / proxy logs for connection state: Allowed (SYN-ACK) or Blocked (RST/Drop).'
    ],
    analystTip: 'A connection that was blocked at the border firewall is an "attempted compromise", whereas an allowed connection indicates potential active compromise.'
  },
  {
    step: 5,
    title: 'Check Evidence & Logs',
    icon: FileSearch,
    badge: 'Artifact Validation',
    question: 'What do the low-level events, process arguments, and logs actually show?',
    keyActions: [
      'Correlate Windows Event IDs (4625 for failed login, 4624 for success, 4688 for process creation).',
      'Examine EDR process trees: Parent process (e.g. winword.exe spawning cmd.exe or powershell.exe).',
      'Review command line parameters for obfuscation (Base64 encoding, bypass flags).'
    ],
    analystTip: 'Trust artifacts over assumptions. Look for the "smoking gun" log or confirm absence of malicious persistence.'
  },
  {
    step: 6,
    title: 'Make Decision',
    icon: CheckCircle2,
    badge: 'Disposition & Action',
    question: 'Is this a True Positive, False Positive, or does it require immediate Escalation?',
    keyActions: [
      'False Positive: Document legitimate reason (e.g., approved vulnerability scan), tag alert, and close ticket.',
      'True Positive (L1 resolvable): Take standard remediation (e.g., initiate password reset, clear cache).',
      'True Positive (High impact): Immediately escalate to Tier 2 with structured incident dossier.'
    ],
    analystTip: 'Clear, objective documentation is mandatory for every decision. Every closed ticket must explain the "why".'
  }
];

export function AlertTriageWorkflow() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const step = triageSteps.find((s) => s.step === activeStep) || triageSteps[0];

  return (
    <Card className="border border-border/80 shadow-sm bg-card overflow-hidden my-6">
      <div className="p-6 bg-gradient-to-r from-slate-50 to-blue-50/40 border-b border-border/60">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs bg-white text-primary border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" /> Standard Triage SOP
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">Step {activeStep} of 6</span>
        </div>
        <h3 className="text-xl font-bold text-foreground">The 6-Step Alert Triage Workflow</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Follow this systematic playbook for every security alert in your queue. Click each step to see investigative questions and tips.
        </p>

        {/* Stepper buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-6">
          {triageSteps.map((s) => {
            const Icon = s.icon;
            const isSelected = s.step === activeStep;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-border/80 text-foreground'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    0{s.step}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-primary-foreground' : 'text-primary'}`} />
                </div>
                <div className="text-xs font-semibold leading-tight">{s.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.step}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <step.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-foreground">
                    Step {step.step}: {step.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">{step.question}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs bg-slate-50 font-mono">
                {step.badge}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* Key actions */}
              <div className="p-4 rounded-xl border border-border/80 bg-slate-50/50 space-y-2.5">
                <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <ListChecks className="w-4 h-4 text-primary" />
                  <span>Mandatory Analyst Checkpoints</span>
                </div>
                <ul className="space-y-2">
                  {step.keyActions.map((action, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Analyst Pro Tip */}
              <div className="p-4 rounded-xl border border-primary/20 bg-primary-50/40 space-y-2">
                <div className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <Terminal className="w-4 h-4" />
                  <span>Senior Analyst Pro-Tip</span>
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed font-sans">{step.analystTip}</p>
              </div>
            </div>

            {/* Stepper navigation footer */}
            <div className="flex justify-between items-center pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                disabled={activeStep === 1}
              >
                Previous Step
              </Button>
              <Button
                size="sm"
                onClick={() => setActiveStep((prev) => Math.min(6, prev + 1))}
                disabled={activeStep === 6}
              >
                Next Step
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

export function TriageQuestions() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const fiveWs = [
    {
      id: 'who',
      letter: 'WHO',
      title: 'Which user or account is involved?',
      details: 'Check username, department, manager, privilege level (admin vs standard), and recent password changes.',
      example: 'User: Finance01 (Sarah Johnson, Senior Controller, standard user).'
    },
    {
      id: 'what',
      letter: 'WHAT',
      title: 'What activity triggered the detection rule?',
      details: 'Inspect the process, parent process, command line arguments, hash value, or API call that executed.',
      example: 'Event: 10 failed logon attempts (Logon Type 3: Network logon).'
    },
    {
      id: 'when',
      letter: 'WHEN',
      title: 'When did this occur, and is the timing anomalous?',
      details: 'Compare event timestamp against the user’s local timezone and standard working hours.',
      example: 'Timestamp: 14:32:18 (2:32 PM local) vs Sarah’s standard 8:00 AM logon.'
    },
    {
      id: 'where',
      letter: 'WHERE',
      title: 'Which host, IP address, and subnet is affected?',
      details: 'Determine source workstation, destination server, internal vs external subnet, and physical site.',
      example: 'Host: FIN-PC-04 (IP 192.168.10.45) on corporate Finance VLAN.'
    },
    {
      id: 'why',
      letter: 'WHY',
      title: 'Why did the detection rule fire?',
      details: 'Review detection threshold (e.g. >5 failures within 5 minutes) and threat intelligence signatures.',
      example: 'Threshold met: Exceeded 5 failed logons within a rolling 3-minute window.'
    }
  ];

  return (
    <Card className="border border-border/80 shadow-sm bg-card overflow-hidden my-6">
      <div className="p-6 bg-slate-50/70 border-b border-border/60">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className="text-xs bg-white text-primary border-primary/20">
            Mental Framework
          </Badge>
          <span className="text-xs text-muted-foreground">The 5 W’s of Security Operations</span>
        </div>
        <h3 className="text-xl font-bold text-foreground">Analyst’s Core Investigation Checklist</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Before taking any closing action or drafting an escalation, ensure you have verified all five dimensions.
        </p>
      </div>

      <CardContent className="p-6 space-y-3">
        {fiveWs.map((item) => {
          const isChecked = !!checkedItems[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                isChecked
                  ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                  : 'bg-white hover:bg-slate-50 border-border/80'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  isChecked ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                }`}
              >
                {isChecked ? <CheckCircle2 className="w-4 h-4" /> : null}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-mono font-bold ${
                      isChecked ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item.letter}
                  </Badge>
                  <span className="text-xs sm:text-sm font-semibold text-foreground">{item.title}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.details}</p>
                <div className="text-[11px] font-mono text-slate-600 mt-1.5 p-2 rounded bg-slate-100/70 border border-slate-200/60">
                  <span className="text-slate-400">Context: </span>
                  {item.example}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
