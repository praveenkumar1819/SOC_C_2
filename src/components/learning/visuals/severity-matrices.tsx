'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertOctagon, 
  Flame, 
  AlertTriangle, 
  Info, 
  Clock, 
  ShieldAlert, 
  Crosshair,
  Sparkles
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function SeverityMatrix() {
  const [selectedLevel, setSelectedLevel] = useState<string>('critical');

  const levels = [
    {
      id: 'critical',
      name: 'Critical (P1)',
      icon: AlertOctagon,
      sla: 'SLA: < 15 Minutes',
      badge: 'Immediate Breach',
      color: 'text-rose-600',
      bgLight: 'bg-rose-50',
      borderLight: 'border-rose-300',
      headerBg: 'bg-rose-500 text-white',
      definition: 'Active widespread breach, active ransomware encryption, customer data exfiltration, or domain controller root compromise.',
      examples: [
        'Ransomware deploying LockBit payload across core storage arrays.',
        'Active C2 session streaming gigabytes of customer PII to external server.',
        'Kerberoasting and Golden Ticket compromise on primary Active Directory.'
      ],
      action: 'Wake Incident Commander immediately. Initiate emergency bridge. Isolate affected subnets. Engage legal and IR retainers.'
    },
    {
      id: 'high',
      name: 'High (P2)',
      icon: Flame,
      sla: 'SLA: < 1 Hour',
      badge: 'Confirmed Compromise',
      color: 'text-orange-600',
      bgLight: 'bg-orange-50',
      borderLight: 'border-orange-300',
      headerBg: 'bg-orange-500 text-white',
      definition: 'Successful malware installation, privilege escalation on a standard workstation, or confirmed lateral movement attempt.',
      examples: [
        'Cobalt Strike beacon running on an executive assistant laptop.',
        'Local admin credentials dumped via LSASS memory read.',
        'Successful pass-the-hash to internal file server.'
      ],
      action: 'Isolate host via EDR. Terminate compromised Active Directory session. Collect memory capture and assign to Tier 2.'
    },
    {
      id: 'medium',
      name: 'Medium (P3)',
      icon: AlertTriangle,
      sla: 'SLA: < 4 Hours',
      badge: 'Suspicious / Potential',
      color: 'text-amber-600',
      bgLight: 'bg-amber-50',
      borderLight: 'border-amber-300',
      headerBg: 'bg-amber-500 text-white',
      definition: 'Anomalous activity or external reconnaissance that has not yet demonstrated successful code execution or unauthorized access.',
      examples: [
        'Multiple failed SSH logins from single external IP against web server.',
        'User downloaded unsigned macro-enabled document (quarantined by AV).',
        'Port scan observed targeting perimeter VPN gateway.'
      ],
      action: 'Investigate source IP reputation. Verify whether firewall dropped traffic. Review auth logs for any subsequent successful logon.'
    },
    {
      id: 'low',
      name: 'Low (P4)',
      icon: Info,
      sla: 'SLA: < 24 Hours',
      badge: 'Minor / Policy',
      color: 'text-blue-600',
      bgLight: 'bg-blue-50',
      borderLight: 'border-blue-300',
      headerBg: 'bg-blue-500 text-white',
      definition: 'Minor security policy infraction, expired SSL certificate, unauthorized USB drive insertion without malware, or low-risk software.',
      examples: [
        'Employee plugged personal USB thumb drive into desktop (no malware found).',
        'Outdated Chrome browser version detected on non-sensitive workstation.',
        'User visited non-malicious category website blocked by corporate proxy.'
      ],
      action: 'Log compliance ticket. Send automated reminder to user/manager. Close ticket during normal operational shifts.'
    }
  ];

  const current = levels.find((l) => l.id === selectedLevel) || levels[0];

  return (
    <Card className="border border-border/80 shadow-sm bg-card overflow-hidden my-6">
      <div className="p-6 bg-gradient-to-r from-slate-50 to-rose-50/20 border-b border-border/60">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs bg-white text-primary border-primary/20">
            <ShieldAlert className="w-3 h-3 mr-1" /> Prioritization Engine
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">Response SLAs</span>
        </div>
        <h3 className="text-xl font-bold text-foreground">Standard Severity Levels & SLA Matrix</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Not all alerts carry equal urgency. Proper severity classification guarantees that active breaches receive instant containment.
        </p>

        {/* 4 Severity Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-6">
          {levels.map((lvl) => {
            const Icon = lvl.icon;
            const isSelected = lvl.id === selectedLevel;
            return (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevel(lvl.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? `${lvl.bgLight} ${lvl.borderLight} ring-2 ring-primary/20 shadow-xs`
                    : 'bg-white hover:bg-slate-50 border-border/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Icon className={`w-4 h-4 ${lvl.color}`} />
                  <span className="text-[10px] font-mono text-muted-foreground">{lvl.sla}</span>
                </div>
                <div className="text-xs font-bold text-foreground">{lvl.name}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{lvl.badge}</div>
              </button>
            );
          })}
        </div>
      </div>

      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <current.icon className={`w-5 h-5 ${current.color}`} />
                <h4 className="text-base font-bold text-foreground">{current.name} Assessment</h4>
              </div>
              <Badge className={`${current.bgLight} ${current.color} border ${current.borderLight} text-xs font-mono font-bold`}>
                {current.sla}
              </Badge>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">{current.definition}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl border border-border/80 bg-slate-50/50 space-y-2">
                <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Crosshair className="w-3.5 h-3.5 text-rose-500" />
                  <span>Real-World Scenario Triggers</span>
                </span>
                <ul className="space-y-1.5">
                  {current.examples.map((ex, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl border border-border/80 bg-slate-50/50 space-y-2">
                <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  <span>Immediate Response Mandate</span>
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">{current.action}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

export function ImpactConfidenceMatrix() {
  const [selectedCell, setSelectedCell] = useState<{ impact: string; conf: string } | null>({
    impact: 'High',
    conf: 'High'
  });

  const matrixData: Record<string, { severity: string; badge: string; color: string; desc: string }> = {
    'High-High': {
      severity: 'CRITICAL',
      badge: 'Critical Severity',
      color: 'bg-rose-500 text-white border-rose-600',
      desc: 'Maximum damage potential + definitive evidence (e.g., EDR confirmed ransomware encryption on finance server). Immediate emergency escalation.'
    },
    'High-Medium': {
      severity: 'HIGH',
      badge: 'High Severity',
      color: 'bg-orange-500 text-white border-orange-600',
      desc: 'Substantial business damage possible + credible alert with partial confirmation (e.g., anomalous gigabyte outbound transfer to unclassified IP).'
    },
    'High-Low': {
      severity: 'MEDIUM',
      badge: 'Medium Severity',
      color: 'bg-amber-400 text-amber-950 border-amber-500',
      desc: 'Critical asset involved but low confidence signal (e.g., heuristic detection on Domain Controller that could easily be routine admin script). Investigate promptly.'
    },
    'Medium-High': {
      severity: 'HIGH',
      badge: 'High Severity',
      color: 'bg-orange-500 text-white border-orange-600',
      desc: 'Moderate system impact + clear confirmation (e.g., confirmed Trojan on a standard call center desktop). Host isolation required.'
    },
    'Medium-Medium': {
      severity: 'MEDIUM',
      badge: 'Medium Severity',
      color: 'bg-amber-400 text-amber-950 border-amber-500',
      desc: 'Moderate impact and moderate certainty (e.g., 50 failed SSH logins from external IP against corporate web server).'
    },
    'Medium-Low': {
      severity: 'LOW',
      badge: 'Low Severity',
      color: 'bg-blue-400 text-white border-blue-500',
      desc: 'Moderate impact asset but weak or noisy signature. Review during standard queue triage.'
    },
    'Low-High': {
      severity: 'LOW',
      badge: 'Low Severity',
      color: 'bg-blue-400 text-white border-blue-500',
      desc: 'Minimal damage potential despite certainty (e.g., confirmed employee visited gambling website blocked by proxy). Policy warning.'
    },
    'Low-Medium': {
      severity: 'LOW',
      badge: 'Low Severity',
      color: 'bg-blue-400 text-white border-blue-500',
      desc: 'Minor system telemetry anomaly on non-critical endpoint. Low urgency review.'
    },
    'Low-Low': {
      severity: 'INFORMATIONAL',
      badge: 'Informational',
      color: 'bg-slate-300 text-slate-800 border-slate-400',
      desc: 'Negligible business impact and uncertain origin. Likely automated scanner noise or benign jitter.'
    }
  };

  const key = selectedCell ? `${selectedCell.impact}-${selectedCell.conf}` : 'High-High';
  const active = matrixData[key] || matrixData['High-High'];

  const impacts = ['High', 'Medium', 'Low'];
  const confidences = ['Low', 'Medium', 'High'];

  return (
    <Card className="border border-border/80 shadow-sm bg-card overflow-hidden my-6">
      <div className="p-6 bg-slate-50/70 border-b border-border/60">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className="text-xs bg-white text-primary border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" /> Formula: Severity = Impact × Confidence
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">2-Axis Evaluation</span>
        </div>
        <h3 className="text-xl font-bold text-foreground">The Impact vs Confidence Matrix</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Click any cell in the 3×3 matrix to see how the intersection of potential asset damage (Impact) and certainty of attack (Confidence) dictates alert priority.
        </p>
      </div>

      <CardContent className="p-6 space-y-6">
        <div className="overflow-x-auto">
          <div className="min-w-[480px]">
            {/* Confidence Columns Header */}
            <div className="grid grid-cols-4 gap-2 mb-2">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-end">
                Impact \ Confidence
              </div>
              {confidences.map((c) => (
                <div key={c} className="text-center text-xs font-semibold text-foreground py-1 bg-slate-100/70 rounded">
                  {c} Confidence
                </div>
              ))}
            </div>

            {/* Matrix Rows */}
            {impacts.map((imp) => (
              <div key={imp} className="grid grid-cols-4 gap-2 mb-2">
                <div className="flex items-center text-xs font-semibold text-foreground px-2 py-2 bg-slate-100/70 rounded">
                  {imp} Impact
                </div>
                {confidences.map((conf) => {
                  const cellKey = `${imp}-${conf}`;
                  const data = matrixData[cellKey];
                  const isSelected = selectedCell?.impact === imp && selectedCell?.conf === conf;
                  return (
                    <button
                      key={conf}
                      onClick={() => setSelectedCell({ impact: imp, conf })}
                      className={`p-3 rounded-lg border text-center transition-all font-bold text-xs ${data.color} ${
                        isSelected ? 'ring-2 ring-slate-900 ring-offset-2 scale-[1.03] shadow-md' : 'opacity-90 hover:opacity-100'
                      }`}
                    >
                      {data.severity}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Cell Detail Box */}
        <div className="p-4 rounded-xl border border-border/80 bg-slate-50/60">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-foreground">
              Selected Intersection: {selectedCell?.impact} Impact + {selectedCell?.conf} Confidence
            </span>
            <Badge variant="outline" className="font-mono text-xs font-bold bg-white">
              {active.badge}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{active.desc}</p>
        </div>
      </CardContent>
    </Card>
  );
}
