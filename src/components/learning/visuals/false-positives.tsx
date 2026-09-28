'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  HelpCircle, 
  RotateCcw, 
  Sparkles,
  GitFork
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function FalsePositiveDiagram() {
  const [selectedQuadrant, setSelectedQuadrant] = useState<'tp' | 'fp' | 'tn' | 'fn'>('fp');

  const quadrants = {
    tp: {
      title: 'True Positive (TP)',
      subtitle: 'Real Threat Caught',
      verdict: 'Adversary activity correctly triggered detection',
      percentage: '5 - 10% of alerts',
      color: 'border-rose-400 bg-rose-50/70 text-rose-950',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      action: 'Initiate triage, contain host, isolate accounts, and escalate to Tier 2 / Incident Response.',
      example: 'Mimikatz memory dump detected on domain controller, originating from unauthorized workstation.'
    },
    fp: {
      title: 'False Positive (FP)',
      subtitle: 'Benign Activity Flagged (Most Common)',
      verdict: 'Authorized activity incorrectly triggered alert rule',
      percentage: '90 - 95% of alerts',
      color: 'border-amber-400 bg-amber-50/70 text-amber-950',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      action: 'Verify legitimacy with admin/user, document authorization in ticket, tag as FP, and request rule tuning.',
      example: 'IT administrator running Nessus vulnerability scanner scheduled at 2:00 AM matches port scan rule.'
    },
    tn: {
      title: 'True Negative (TN)',
      subtitle: 'Normal Baseline Silent',
      verdict: 'Legitimate business activity correctly ignored',
      percentage: 'Millions of events daily',
      color: 'border-emerald-400 bg-emerald-50/70 text-emerald-950',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      action: 'No analyst intervention required. SIEM baseline filters operate as designed.',
      example: 'User opens Outlook, receives normal email, and saves PDF invoice to local Documents folder.'
    },
    fn: {
      title: 'False Negative (FN)',
      subtitle: 'Adversary Evaded Detection (Dangerous)',
      verdict: 'Adversary activity missed due to blind spot',
      percentage: 'Goal: Near 0%',
      color: 'border-purple-400 bg-purple-50/70 text-purple-950',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      action: 'Discovered during proactive threat hunting or post-breach. Requires immediate rule engineering.',
      example: 'Living-off-the-land binary (LOLBIN) used with zero-day parameters that bypass existing SIEM queries.'
    }
  };

  const active = quadrants[selectedQuadrant];

  return (
    <Card className="border border-border/80 shadow-sm bg-card overflow-hidden my-6">
      <div className="p-6 bg-gradient-to-r from-slate-50 to-amber-50/30 border-b border-border/60">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs bg-white text-primary border-primary/20">
            <ShieldAlert className="w-3 h-3 mr-1" /> Detection Matrix
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">SOC Reality: 90%+ False Positives</span>
        </div>
        <h3 className="text-xl font-bold text-foreground">The 2×2 Detection Classification Matrix</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Every alert in a SOC falls into one of these four quadrants. Click any quadrant below to inspect details.
        </p>

        {/* 2x2 Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          <button
            onClick={() => setSelectedQuadrant('tp')}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedQuadrant === 'tp' ? 'ring-2 ring-rose-500 shadow-xs' : 'hover:bg-slate-50 border-border/80'
            } bg-white`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-rose-700">True Positive (TP)</span>
              <Badge variant="outline" className="text-[10px] bg-rose-50 text-rose-800 border-rose-200">
                Threat Detected
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Malicious activity + Alert fired</p>
          </button>

          <button
            onClick={() => setSelectedQuadrant('fp')}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedQuadrant === 'fp' ? 'ring-2 ring-amber-500 shadow-xs' : 'hover:bg-slate-50 border-border/80'
            } bg-white`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-amber-700">False Positive (FP)</span>
              <Badge variant="outline" className="text-[10px] bg-amber-50 text-amber-800 border-amber-200">
                90-95% Volume
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Benign activity + Alert fired</p>
          </button>

          <button
            onClick={() => setSelectedQuadrant('tn')}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedQuadrant === 'tn' ? 'ring-2 ring-emerald-500 shadow-xs' : 'hover:bg-slate-50 border-border/80'
            } bg-white`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-emerald-700">True Negative (TN)</span>
              <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-800 border-emerald-200">
                Quiet & Safe
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Normal activity + No alert</p>
          </button>

          <button
            onClick={() => setSelectedQuadrant('fn')}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedQuadrant === 'fn' ? 'ring-2 ring-purple-500 shadow-xs' : 'hover:bg-slate-50 border-border/80'
            } bg-white`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-purple-700">False Negative (FN)</span>
              <Badge variant="outline" className="text-[10px] bg-purple-50 text-purple-800 border-purple-200">
                Adversary Evasion
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Malicious activity + Missed alert</p>
          </button>
        </div>
      </div>

      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedQuadrant}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-foreground">{active.title}</h4>
                <p className="text-xs text-muted-foreground">{active.verdict}</p>
              </div>
              <Badge className={`${active.badgeColor} text-xs font-mono`}>{active.percentage}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl border border-border/80 bg-slate-50/50 space-y-1">
                <span className="text-xs font-semibold text-foreground">Required Analyst Action:</span>
                <p className="text-xs text-muted-foreground leading-relaxed">{active.action}</p>
              </div>

              <div className="p-3.5 rounded-xl border border-border/80 bg-slate-50/50 space-y-1">
                <span className="text-xs font-semibold text-foreground">Scenario Example:</span>
                <p className="text-xs text-muted-foreground font-mono text-[11px] leading-relaxed">{active.example}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

export function FalsePositiveDecisionTree() {
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');

  interface TreeNode {
    id: string;
    question: string;
    description: string;
    yesNext?: string;
    noNext?: string;
    outcome?: {
      status: 'FALSE_POSITIVE' | 'TRUE_POSITIVE' | 'ESCALATE';
      badge: string;
      color: string;
      title: string;
      action: string;
    };
  }

  const treeNodes: Record<string, TreeNode> = {
    start: {
      id: 'start',
      question: 'Is the source host a known scanner or automated service account?',
      description: 'Check asset tag, approved vulnerability scanning schedule (e.g. Nessus/Qualys), or service account naming convention (svc-*).',
      yesNext: 'scan_approved',
      noNext: 'maintenance_check'
    },
    scan_approved: {
      id: 'scan_approved',
      question: 'Did the activity occur during the approved maintenance / scan window?',
      description: 'Cross-check change management calendar and vulnerability management notification tickets.',
      yesNext: 'fp_scanner',
      noNext: 'maintenance_check'
    },
    maintenance_check: {
      id: 'maintenance_check',
      question: 'Is there an authorized Change Request (CR) or IT maintenance window active?',
      description: 'Admins performing patch deployments, server reboots, or network migrations frequently trip security rules.',
      yesNext: 'fp_maintenance',
      noNext: 'user_verification'
    },
    user_verification: {
      id: 'user_verification',
      question: 'Did the verified user perform the action and confirm legitimate business intent?',
      description: 'Contact user via phone or corporate chat (e.g. "Did you attempt to logon to FIN-PC-04 after returning from leave?").',
      yesNext: 'fp_user_error',
      noNext: 'ioc_check'
    },
    ioc_check: {
      id: 'ioc_check',
      question: 'Are there known malicious IOCs (blacklisted external IP, malicious hash, encoded PowerShell)?',
      description: 'Examine telemetry for command line obfuscation, outbound beaconing to foreign IPs, or credential dumping tools.',
      yesNext: 'tp_escalate',
      noNext: 'investigate_deeper'
    },
    fp_scanner: {
      id: 'fp_scanner',
      question: '',
      description: '',
      outcome: {
        status: 'FALSE_POSITIVE',
        badge: 'Authorized Scanner',
        color: 'bg-emerald-50 text-emerald-800 border-emerald-300',
        title: 'Determined: False Positive (Scheduled Scan)',
        action: 'Document the approved scan change ticket in SIEM. Tag alert as False Positive. Request detection rule exclusion for scanner IP.'
      }
    },
    fp_maintenance: {
      id: 'fp_maintenance',
      question: '',
      description: '',
      outcome: {
        status: 'FALSE_POSITIVE',
        badge: 'Approved IT Activity',
        color: 'bg-emerald-50 text-emerald-800 border-emerald-300',
        title: 'Determined: False Positive (Maintenance Window)',
        action: 'Link the Change Request (CR#) in ticket notes. Confirm sysadmin credentials and close alert as Authorized Administrative Activity.'
      }
    },
    fp_user_error: {
      id: 'fp_user_error',
      question: '',
      description: '',
      outcome: {
        status: 'FALSE_POSITIVE',
        badge: 'User Mistake / Benign',
        color: 'bg-emerald-50 text-emerald-800 border-emerald-300',
        title: 'Determined: False Positive (Benign User Action)',
        action: 'Confirm user typo / forgot password. Verify successful authentication afterwards from usual workstation. Close ticket with user confirmation attached.'
      }
    },
    tp_escalate: {
      id: 'tp_escalate',
      question: '',
      description: '',
      outcome: {
        status: 'ESCALATE',
        badge: 'True Positive / Critical',
        color: 'bg-rose-50 text-rose-800 border-rose-300',
        title: 'Determined: True Positive - Immediate Escalation',
        action: 'Immediately isolate affected host from network, revoke user session tokens, block malicious external IP at edge firewall, and escalate to Tier 2 with incident dossier.'
      }
    },
    investigate_deeper: {
      id: 'investigate_deeper',
      question: '',
      description: '',
      outcome: {
        status: 'TRUE_POSITIVE',
        badge: 'Suspicious / Inconclusive',
        color: 'bg-amber-50 text-amber-800 border-amber-300',
        title: 'Action: Deepen Investigation or Escalate to L2',
        action: 'Pull full host memory capture and process tree logs. If unable to confirm benign origin within 20 minutes, escalate to senior analyst.'
      }
    }
  };

  const current = treeNodes[currentNodeId];

  return (
    <Card className="border border-border/80 shadow-sm bg-card overflow-hidden my-6">
      <div className="p-6 bg-slate-50/70 border-b border-border/60">
        <div className="flex items-center justify-between mb-1">
          <Badge variant="outline" className="text-xs bg-white text-primary border-primary/20">
            <GitFork className="w-3 h-3 mr-1" /> Interactive Decision Engine
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentNodeId('start')}
            className="text-xs text-muted-foreground hover:text-foreground h-8"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset Tree
          </Button>
        </div>
        <h3 className="text-xl font-bold text-foreground">False Positive Decision Tree</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Step through this interactive flowchart to determine whether an alert can be safely closed as a False Positive or must be escalated.
        </p>
      </div>

      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          {!current.outcome ? (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="p-6 rounded-2xl border border-border/90 bg-white shadow-xs space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                <HelpCircle className="w-4 h-4" />
                <span>Analyst Decision Checkpoint</span>
              </div>
              <h4 className="text-lg font-bold text-foreground leading-snug">{current.question}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{current.description}</p>

              <div className="flex items-center gap-3 pt-3">
                <Button
                  onClick={() => current.yesNext && setCurrentNodeId(current.yesNext)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  YES
                </Button>
                <Button
                  onClick={() => current.noNext && setCurrentNodeId(current.noNext)}
                  variant="outline"
                  className="flex-1 border-rose-300 text-rose-700 hover:bg-rose-50"
                >
                  <XCircle className="w-4 h-4 mr-1.5" />
                  NO
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className={`p-6 rounded-2xl border ${current.outcome.color} shadow-xs space-y-4`}
            >
              <div className="flex items-center justify-between">
                <Badge className="text-xs font-mono">{current.outcome.badge}</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentNodeId('start')}
                  className="text-xs h-7 bg-white/80"
                >
                  <RotateCcw className="w-3 h-3 mr-1" /> Test Another Case
                </Button>
              </div>

              <h4 className="text-lg font-bold text-foreground">{current.outcome.title}</h4>
              <div className="p-3.5 rounded-xl bg-white/90 border border-black/10">
                <span className="text-xs font-semibold text-foreground block mb-1">Standard Operating Procedure:</span>
                <p className="text-xs text-muted-foreground leading-relaxed">{current.outcome.action}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
