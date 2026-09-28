'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Scale,
  ShieldCheck,
  BookOpen,
  RefreshCw,
  BarChart3,
  Sliders,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Clock,
  Sparkles
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function DocumentationImportance() {
  const [activePurpose, setActivePurpose] = useState<number>(0);

  const purposes = [
    {
      title: '1. Legal & Regulatory Evidence',
      icon: Scale,
      color: 'text-blue-600',
      bgLight: 'bg-blue-50',
      badge: 'Legal Shield',
      desc: 'Security incidents often culminate in civil litigation, insurance claims, or regulatory subpoenas. Your ticket notes serve as contemporaneous business records in a court of law.'
    },
    {
      title: '2. Compliance & Audit Verification',
      icon: ShieldCheck,
      color: 'text-emerald-600',
      bgLight: 'bg-emerald-50',
      badge: 'SOC 2 / ISO 27001',
      desc: 'Independent auditors regularly sample closed SOC tickets to verify that alerts were triaged within SLA, escalated according to SOP, and retained according to policy.'
    },
    {
      title: '3. Institutional Knowledge Base',
      icon: BookOpen,
      color: 'text-indigo-600',
      bgLight: 'bg-indigo-50',
      badge: 'Future Precedent',
      desc: 'When a new or similar vulnerability appears 6 months later, past ticket notes provide exact investigative queries and remediation blueprints for incoming junior analysts.'
    },
    {
      title: '4. 24/7 Shift Handover Continuity',
      icon: RefreshCw,
      color: 'text-amber-600',
      bgLight: 'bg-amber-50',
      badge: 'Shift Handoff',
      desc: 'When the night shift hands off to the morning shift, thorough tickets prevent critical leads from dropping through the cracks between analyst rotations.'
    },
    {
      title: '5. SOC Metrics & Performance',
      icon: BarChart3,
      color: 'text-purple-600',
      bgLight: 'bg-purple-50',
      badge: 'MTTA & MTTR',
      desc: 'Detailed documentation drives SOC analytics: Mean Time to Detect (MTTD), Mean Time to Acknowledge (MTTA), and Mean Time to Respond (MTTR).'
    },
    {
      title: '6. Detection Tuning & Feedback',
      icon: Sliders,
      color: 'text-rose-600',
      bgLight: 'bg-rose-50',
      badge: 'Continuous Loop',
      desc: 'Detection engineers rely on your False Positive documentation to tune threshold rules, exclude approved maintenance scanners, and suppress noise.'
    }
  ];

  return (
    <Card className="border border-border/80 shadow-sm bg-card overflow-hidden my-6">
      <div className="p-6 bg-gradient-to-r from-slate-50 to-blue-50/30 border-b border-border/60">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs bg-white text-primary border-primary/20">
            <FileText className="w-3 h-3 mr-1" /> Professional Standards
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">Why Documentation Matters</span>
        </div>
        <h3 className="text-xl font-bold text-foreground">The 6 Critical Functions of SOC Documentation</h3>
        <p className="text-sm text-muted-foreground mt-1">
          "If it wasn't documented, it never happened." Click each operational pillar below to understand its impact.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 mt-6">
          {purposes.map((p, idx) => {
            const Icon = p.icon;
            const isSelected = activePurpose === idx;
            return (
              <button
                key={idx}
                onClick={() => setActivePurpose(idx)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? `${p.bgLight} border-primary/40 ring-2 ring-primary/20 shadow-xs`
                    : 'bg-white hover:bg-slate-50 border-border/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Icon className={`w-4 h-4 ${p.color}`} />
                  <span className="text-[10px] font-mono text-muted-foreground">{p.badge}</span>
                </div>
                <div className="text-xs font-bold text-foreground truncate">{p.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      <CardContent className="p-6">
        <div className="p-4 rounded-xl border border-border/80 bg-slate-50/60 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-white shadow-xs shrink-0 mt-0.5">
            {React.createElement(purposes[activePurpose].icon, {
              className: `w-5 h-5 ${purposes[activePurpose].color}`
            })}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-foreground">{purposes[activePurpose].title}</span>
              <Badge variant="outline" className="text-[10px] font-mono">
                {purposes[activePurpose].badge}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {purposes[activePurpose].desc}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function DocumentationTemplate() {
  const sections = [
    {
      num: 1,
      title: 'Alert Metadata & Scope',
      content: 'Ticket ID, Creation Timestamp, Severity, Alert Rule Name, SIEM Log Source, Hostname, Username, and IP Addresses.'
    },
    {
      num: 2,
      title: 'Chronological Timeline (UTC)',
      content: 'Clear timeline showing when the event first fired, when the analyst took ownership, when user outreach occurred, and when containment was confirmed.'
    },
    {
      num: 3,
      title: 'Investigation & Artifacts',
      content: 'Exact Event IDs (e.g. 4625), hashes (SHA256), command line executions, URL/domain reputations, and VirusTotal / AbuseIPDB links.'
    },
    {
      num: 4,
      title: 'Concrete Actions Taken',
      content: 'All commands executed, users messaged/called, host isolations requested, and configuration changes submitted.'
    },
    {
      num: 5,
      title: 'Discrepancy & Root Cause Finding',
      content: 'Unambiguous determination: Confirmed True Positive with containment OR Verified False Positive with documented justification.'
    },
    {
      num: 6,
      title: 'Recommendations & Next Steps',
      content: 'Actionable suggestions: Detection rule tuning requests, password policy enforcement, or user security awareness training.'
    }
  ];

  return (
    <Card className="border border-border/80 shadow-sm bg-card overflow-hidden my-6">
      <div className="p-6 bg-slate-50/70 border-b border-border/60">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className="text-xs bg-white text-primary border-primary/20">
            Standard Anatomy
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">Ticket Structure</span>
        </div>
        <h3 className="text-xl font-bold text-foreground">The Anatomy of a Professional SOC Ticket</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Every completed investigation ticket should contain these six essential building blocks.
        </p>
      </div>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sections.map((sec) => (
            <div
              key={sec.num}
              className="p-4 rounded-xl border border-border/80 bg-white hover:bg-slate-50/60 transition-all space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                  {sec.num}
                </span>
                <span className="text-xs sm:text-sm font-bold text-foreground">{sec.title}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed pl-7">{sec.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function GoodVsBadDocumentation() {
  return (
    <Card className="border border-border/80 shadow-sm bg-card overflow-hidden my-6">
      <div className="p-6 bg-gradient-to-r from-slate-50 to-emerald-50/20 border-b border-border/60">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs bg-white text-primary border-primary/20">
            Analyst Quality Benchmark
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">Comparison</span>
        </div>
        <h3 className="text-xl font-bold text-foreground">Good vs Bad Documentation: Side-by-Side</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Notice the difference in professionalism, specificity, and actionable clarity.
        </p>
      </div>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bad Documentation */}
          <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Unacceptable Documentation</span>
              </div>
              <Badge variant="outline" className="bg-rose-100 text-rose-800 border-rose-300 text-[10px]">
                Poor Analyst
              </Badge>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-rose-200 text-xs font-mono text-slate-800 leading-relaxed space-y-2">
              <p className="text-rose-900 font-medium">"Checked the alert for user Sarah. Looked kinda weird with some failed logins."</p>
              <p className="text-rose-900 font-medium">"Messaged her on Teams and she said it was fine, just forgot password. Closing ticket."</p>
            </div>

            <div className="space-y-1.5 pt-1 text-[11px] text-rose-900">
              <div className="font-semibold">Why this fails:</div>
              <ul className="list-disc pl-4 space-y-0.5 text-rose-800">
                <li>No timestamp or timezone recorded.</li>
                <li>No Hostname or IP address documented.</li>
                <li>No specific Event IDs or log source referenced.</li>
                <li>Uses informal slang ("kinda weird", "it was fine").</li>
                <li>Fails to verify if subsequent logins succeeded or failed.</li>
              </ul>
            </div>
          </div>

          {/* Good Documentation */}
          <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Professional Documentation</span>
              </div>
              <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-300 text-[10px]">
                Model SOC Standard
              </Badge>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-emerald-200 text-xs font-mono text-slate-800 leading-relaxed space-y-1.5">
              <div className="text-slate-500 font-semibold">[INVESTIGATION SUMMARY]</div>
              <p>Investigated 10 failed logon attempts (Event ID 4625) against user account Finance01 (Sarah Johnson) on host FIN-PC-04 (IP 192.168.10.45) at 14:32:18 UTC.</p>
              <div className="text-slate-500 font-semibold pt-1">[FINDINGS & DISPOSITION]</div>
              <p>Contacted user via corporate voice at 14:40 UTC. Sarah confirmed she attempted logon after returning from vacation and mistyped her password. IT Helpdesk Ticket #12345 verified password reset completed at 14:45 UTC. No successful logons observed prior to reset. Source IP matches assigned workstation.</p>
              <div className="text-slate-500 font-semibold pt-1">[CONCLUSION]</div>
              <p className="text-emerald-800 font-semibold">Closed as False Positive (Legitimate User Error). No indicators of compromise.</p>
            </div>

            <div className="space-y-1.5 pt-1 text-[11px] text-emerald-900">
              <div className="font-semibold">Why this succeeds:</div>
              <ul className="list-disc pl-4 space-y-0.5 text-emerald-800">
                <li>Specific timestamps, Hostname, and IP included.</li>
                <li>References verified Windows Event ID 4625.</li>
                <li>Corroborates with external IT Helpdesk ticket number.</li>
                <li>Clear, objective, and defensible conclusion.</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
