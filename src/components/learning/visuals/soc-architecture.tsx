'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, GitBranch, Cpu, ShieldCheck, CheckCircle2, ChevronRight, Sparkles, Layers } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PillarData {
  id: string;
  title: string;
  icon: React.ElementType;
  badge: string;
  color: string;
  bgColor: string;
  borderColor: string;
  summary: string;
  items: { name: string; role: string; detail: string }[];
}

const pillars: PillarData[] = [
  {
    id: 'people',
    title: 'People',
    icon: Users,
    badge: 'Human Expertise',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50/70',
    borderColor: 'border-blue-200',
    summary: 'The skilled analysts, engineers, and leaders who interpret signals and take decisive defensive actions.',
    items: [
      { name: 'Tier 1 / L1 SOC Analyst', role: 'Frontline Triage', detail: 'Monitors SIEM queues, filters false positives, and assesses alert severity.' },
      { name: 'Tier 2 / L2 SOC Analyst', role: 'Deep Investigation', detail: 'Performs root-cause analysis, reconstructs attack paths, and coordinates remediation.' },
      { name: 'Tier 3 / Senior Hunter', role: 'Threat Hunter & IR', detail: 'Proactively hunts hidden adversaries and performs complex forensics and reverse engineering.' },
      { name: 'SOC Manager & Lead', role: 'Operations & Strategy', detail: 'Oversees shift schedules, SLA metrics, executive reporting, and security vendor relationships.' }
    ]
  },
  {
    id: 'process',
    title: 'Process',
    icon: GitBranch,
    badge: 'Repeatable Workflows',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50/70',
    borderColor: 'border-indigo-200',
    summary: 'Standard Operating Procedures (SOPs), playbooks, and containment protocols that ensure consistent defense.',
    items: [
      { name: 'Alert Triage Workflow', role: 'Standard Intake', detail: 'Prescribes methodical steps to assess user, host, IP context and determine legitimacy.' },
      { name: 'Incident Response Playbooks', role: 'Guided Response', detail: 'Standardized runbooks for Phishing, Ransomware, Unauthorized Access, and Data Leaks.' },
      { name: 'Escalation Thresholds & SLAs', role: 'Accountability', detail: 'Enforces strict response times (e.g., Critical alerts acknowledged within 15 minutes).' },
      { name: 'Post-Mortem & Lessons Learned', role: 'Continuous Loop', detail: 'Conducts post-incident retrospectives to tune detection rules and eliminate blind spots.' }
    ]
  },
  {
    id: 'technology',
    title: 'Technology',
    icon: Cpu,
    badge: 'Tooling & Telemetry',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50/70',
    borderColor: 'border-emerald-200',
    summary: 'Sensors, central aggregation platforms, and orchestration engines that amplify human capabilities.',
    items: [
      { name: 'SIEM (e.g. Splunk, Sentinel, QRadar)', role: 'Correlation Engine', detail: 'Ingests billions of events, correlates telemetry across sources, and generates alerts.' },
      { name: 'EDR / XDR (e.g. CrowdStrike, Defender)', role: 'Endpoint Visibility', detail: 'Monitors endpoint processes, memory injections, command execution, and network beacons.' },
      { name: 'NDR & Perimeter (Firewalls, Zeek, Suricata)', role: 'Network Inspection', detail: 'Analyzes packet captures, TLS handshakes, DNS queries, and anomalous bandwidth spikes.' },
      { name: 'SOAR & Threat Intelligence (TIP)', role: 'Automated Response', detail: 'Enriches indicators with VirusTotal/AbuseIPDB and executes automated containment scripts.' }
    ]
  }
];

export function SocArchitectureDiagram() {
  const [activePillar, setActivePillar] = useState<string>('people');
  const current = pillars.find((p) => p.id === activePillar) || pillars[0];

  return (
    <Card className="border border-border/80 shadow-sm bg-card overflow-hidden my-6">
      <div className="p-6 bg-gradient-to-r from-slate-50 to-blue-50/40 border-b border-border/60">
        <div className="flex items-center gap-2 mb-1.5">
          <Badge variant="outline" className="text-xs font-semibold bg-white text-primary border-primary/20">
            <Layers className="w-3 h-3 mr-1" /> Core Architecture
          </Badge>
          <span className="text-xs text-muted-foreground">Interactive Triad</span>
        </div>
        <h3 className="text-xl font-bold text-foreground">The 3 Pillars of Security Operations</h3>
        <p className="text-sm text-muted-foreground mt-1">
          A successful SOC balances People, Process, and Technology. Select each pillar below to explore its components.
        </p>

        {/* Pillar Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = pillar.id === activePillar;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                className={`relative flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? `${pillar.bgColor} ${pillar.borderColor} shadow-sm ring-2 ring-primary/20`
                    : 'bg-white hover:bg-slate-50 border-border/70 text-muted-foreground'
                }`}
              >
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-white shadow-xs' : 'bg-slate-100'} ${pillar.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-sm font-semibold ${isSelected ? 'text-foreground' : 'text-slate-700'}`}>
                    {pillar.title}
                  </div>
                  <div className="text-[11px] text-muted-foreground">{pillar.badge}</div>
                </div>
                {isSelected && (
                  <motion.div
                    layoutId="pillarIndicator"
                    className="absolute right-3 text-primary"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <current.icon className={`w-5 h-5 ${current.color}`} />
                  {current.title} Focus Area
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">{current.summary}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {current.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-border/80 bg-slate-50/50 hover:bg-white hover:border-border hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-foreground">{item.name}</span>
                      <Badge variant="secondary" className="text-[10px] font-mono">
                        {item.role}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-border/40 flex items-center gap-1.5 text-[11px] text-primary">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Essential SOC Operational Competency</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
