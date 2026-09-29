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
  HelpCircle,
  ChevronRight,
  Search,
  CheckCheck,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface DashboardProps {
  topicId: string;
}

// =========================================================================
// TOPIC 1.1: Who Handles What? (Role Assignment)
// =========================================================================
function Interactive11() {
  const roles = [
    { id: 'L1', title: 'L1 Analyst', desc: 'First-line triage & validation' },
    { id: 'L2', title: 'L2 Analyst', desc: 'Deep response & containment' },
    { id: 'L3', title: 'L3 Analyst', desc: 'Threat hunting & advanced analysis' },
    { id: 'MGR', title: 'SOC Manager', desc: 'Operations & coordination' },
  ];

  const tasks = [
    { id: 't1', text: 'Initial alert triage and entity validation', correct: 'L1' },
    { id: 't2', text: 'Deep investigation and root-cause analysis', correct: 'L2' },
    { id: 't3', text: 'Advanced threat hunting and malware analysis', correct: 'L3' },
    { id: 't4', text: 'SOC operations coordination & shift metrics', correct: 'MGR' },
  ];

  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const assignTask = (taskId: string, roleId: string) => {
    setAssignments((prev) => ({ ...prev, [taskId]: roleId }));
    setSelectedTask(null);
  };

  const isComplete = tasks.every((t) => assignments[t.id] === t.correct);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground">Interactive Exercise: Who Handles What?</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Click a task below, then select the appropriate SOC team role to assign it.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setAssignments({});
            setSelectedTask(null);
          }}
          className="h-8 text-xs gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Task Cards */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            Operational Tasks:
          </span>
          {tasks.map((task) => {
            const currentAssignment = assignments[task.id];
            const isCorrect = currentAssignment === task.correct;
            const isSelected = selectedTask === task.id;

            return (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                    : currentAssignment
                    ? isCorrect
                      ? 'border-emerald-300 bg-emerald-50/30'
                      : 'border-rose-300 bg-rose-50/20'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-foreground">{task.text}</p>
                  {currentAssignment && (
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-bold ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-rose-100 text-rose-800 border-rose-300'
                      }`}
                    >
                      {isCorrect ? '✓ ' + currentAssignment : '✗ ' + currentAssignment}
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Roles to Assign */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            SOC Roles: {selectedTask ? '(Select role to assign task)' : '(Select a task first)'}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {roles.map((role) => (
              <button
                key={role.id}
                disabled={!selectedTask}
                onClick={() => selectedTask && assignTask(selectedTask, role.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  selectedTask
                    ? 'bg-card hover:bg-primary/5 hover:border-primary cursor-pointer active:scale-95'
                    : 'bg-muted/30 border-border opacity-70 cursor-not-allowed'
                }`}
              >
                <span className="font-bold text-xs text-foreground block">{role.title}</span>
                <span className="text-[11px] text-muted-foreground block mt-0.5">{role.desc}</span>
              </button>
            ))}
          </div>

          {isComplete && (
            <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 flex items-center gap-3 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-950">All Tasks Correctly Assigned!</p>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  L1 triages, L2 remediates, L3 hunts threats, and the SOC Manager coordinates operations.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 1.2: Build the SOC Workflow (Sequence Arrangement)
// =========================================================================
function Interactive12() {
  const correctOrder = ['Receive', 'Understand', 'Investigate', 'Document', 'Escalate / Close'];
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);

  const handleSelect = (stage: string) => {
    if (selectedOrder.includes(stage)) return;
    const nextOrder = [...selectedOrder, stage];
    setSelectedOrder(nextOrder);
  };

  const isComplete =
    selectedOrder.length === correctOrder.length &&
    selectedOrder.every((s, i) => s === correctOrder[i]);

  const hasMistake = selectedOrder.some((s, i) => s !== correctOrder[i]);

  const availableStages = correctOrder.filter((s) => !selectedOrder.includes(s));

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground">Interactive Exercise: Build the SOC Workflow</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Click the stages in their correct operational sequence from receipt to resolution.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedOrder([])}
          className="h-8 text-xs gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>

      {/* Assembly Lane */}
      <div className="p-4 rounded-xl border bg-card min-h-[70px] space-y-2">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
          Workflow Sequence:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {selectedOrder.length === 0 ? (
            <span className="text-xs text-muted-foreground italic">Click stages below to construct workflow...</span>
          ) : (
            selectedOrder.map((stage, idx) => {
              const isCorrectAtPos = stage === correctOrder[idx];
              return (
                <div key={stage} className="flex items-center gap-1.5">
                  <Badge
                    variant="outline"
                    className={`text-xs py-1 px-2.5 font-bold ${
                      isCorrectAtPos
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-rose-50 text-rose-800 border-rose-300'
                    }`}
                  >
                    {idx + 1}. {stage}
                  </Badge>
                  {idx < selectedOrder.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Available Stage Pills */}
      {availableStages.length > 0 && !hasMistake && (
        <div className="space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            Click Next Stage:
          </span>
          <div className="flex flex-wrap gap-2">
            {availableStages.map((stage) => (
              <button
                key={stage}
                onClick={() => handleSelect(stage)}
                className="px-3.5 py-2 rounded-lg border bg-card hover:bg-primary/5 hover:border-primary text-xs font-semibold text-foreground shadow-2xs transition-all active:scale-95"
              >
                {stage}
              </button>
            ))}
          </div>
        </div>
      )}

      {hasMistake && (
        <div className="p-3.5 rounded-xl border border-rose-300 bg-rose-50/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="text-xs text-rose-900 font-medium">
              Incorrect sequence! Remember: Receive → Understand → Investigate → Document → Escalate / Close.
            </span>
          </div>
          <Button size="sm" variant="outline" onClick={() => setSelectedOrder([])} className="h-7 text-xs">
            Try Again
          </Button>
        </div>
      )}

      {isComplete && (
        <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="text-xs font-bold text-emerald-950">Standard SOC Workflow Verified!</p>
            <p className="text-[11px] text-emerald-800 mt-0.5">
              Receive → Understand → Investigate → Document → Escalate / Close.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// TOPIC 1.3: Which Tool Helps? (Tool Matching)
// =========================================================================
function Interactive13() {
  const pairs = [
    { id: 'p1', situation: 'Need to search and correlate historical security logs across all servers.', tool: 'SIEM' },
    { id: 'p2', situation: 'Need to investigate endpoint process trees and isolate a workstation.', tool: 'EDR' },
    { id: 'p3', situation: 'Need to review packet traffic and block external malicious IP connections.', tool: 'Firewall / Network' },
    { id: 'p4', situation: 'Need to track investigation notes, assign tasks, and maintain audit records.', tool: 'Case Management' },
  ];

  const [selections, setSelections] = useState<Record<string, string>>({});

  const isComplete = pairs.every((p) => selections[p.id] === p.tool);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground">Interactive Exercise: Which Tool Helps?</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Select the appropriate SOC technology category for each practical investigation situation.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelections({})}
          className="h-8 text-xs gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>

      <div className="space-y-3">
        {pairs.map((p) => {
          const current = selections[p.id];
          const isCorrect = current === p.tool;

          return (
            <div key={p.id} className="p-3.5 rounded-xl border bg-card space-y-2.5">
              <p className="text-xs font-semibold text-foreground">{p.situation}</p>
              <div className="flex flex-wrap gap-2">
                {['SIEM', 'EDR', 'Firewall / Network', 'Case Management'].map((toolOption) => {
                  const isSelected = current === toolOption;
                  return (
                    <button
                      key={toolOption}
                      onClick={() => setSelections((prev) => ({ ...prev, [p.id]: toolOption }))}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        isSelected
                          ? isCorrect
                            ? 'bg-emerald-500 text-white border-emerald-600'
                            : 'bg-rose-500 text-white border-rose-600'
                          : 'bg-muted/30 border-border hover:bg-muted text-foreground'
                      }`}
                    >
                      {toolOption}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {isComplete && (
        <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="text-xs font-bold text-emerald-950">Technology Alignment Complete!</p>
            <p className="text-[11px] text-emerald-800 mt-0.5">
              SIEM for logs, EDR for endpoints, Firewalls for traffic, and Case Management for documentation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// TOPIC 1.4: Trace the Alert (Signal Path)
// =========================================================================
function Interactive14() {
  const steps = [
    { id: 's1', label: '1. Source Activity', desc: 'Finance01 types password on FIN-PC-04' },
    { id: 's2', label: '2. Security Data', desc: 'Windows Event 4625 recorded locally' },
    { id: 's3', label: '3. Detection Logic', desc: 'SIEM rule flags >3 failed logins' },
    { id: 's4', label: '4. SOC Alert', desc: 'Alert ALT-2026-04 generated in queue' },
    { id: 's5', label: '5. L1 Analyst', desc: 'Analyst claims alert for triage' },
  ];

  const [activeStage, setActiveStage] = useState(0);

  const handleAdvance = (idx: number) => {
    if (idx === activeStage) {
      setActiveStage(idx + 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground">Interactive Exercise: Trace the Alert</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Click each stage in order to trace the security signal from workstation to analyst queue.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setActiveStage(0)}
          className="h-8 text-xs gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
        {steps.map((s, idx) => {
          const isActivated = idx < activeStage;
          const isNext = idx === activeStage;

          return (
            <button
              key={s.id}
              disabled={!isNext}
              onClick={() => handleAdvance(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isActivated
                  ? 'bg-emerald-500/10 border-emerald-500 text-foreground ring-1 ring-emerald-500/30'
                  : isNext
                  ? 'bg-primary/10 border-primary text-foreground animate-pulse cursor-pointer'
                  : 'bg-muted/20 border-border text-muted-foreground opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold">{s.label}</span>
                {isActivated && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </div>
              <p className="text-[10px] leading-tight text-muted-foreground">{s.desc}</p>
            </button>
          );
        })}
      </div>

      {activeStage === steps.length && (
        <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="text-xs font-bold text-emerald-950">Complete Signal Path Traced!</p>
            <p className="text-[11px] text-emerald-800 mt-0.5">
              Telemetry traveled from endpoint interaction through local logs and correlation detection straight to the L1 queue.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// TOPIC 2.1: Event or Alert?
// =========================================================================
function Interactive21() {
  const items = [
    { id: 'ea1', text: 'User successfully logged in at 09:00 AM from their normal laptop', answer: 'EVENT', reason: 'Routine expected activity logged for audit.' },
    { id: 'ea2', text: 'Firewall dropped an unsolicited connection on closed port 23', answer: 'EVENT', reason: 'Standard perimeter defense; occurs by the thousands.' },
    { id: 'ea3', text: '15 failed logins detected in 60 seconds followed by lockout', answer: 'ALERT', reason: 'Abnormal failure volume breaches rule threshold.' },
    { id: 'ea4', text: 'Suspicious login pattern detected outside business hours from foreign IP', answer: 'ALERT', reason: 'Behavioral anomaly requiring human analyst qualification.' },
  ];

  const [choices, setChoices] = useState<Record<string, string>>({});

  const isComplete = items.every((item) => choices[item.id] === item.answer);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground">Interactive Exercise: Event or Alert?</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Classify each security occurrence as either a raw Event (informational record) or an actionable Alert (requires attention).
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setChoices({})}
          className="h-8 text-xs gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const choice = choices[item.id];
          const isCorrect = choice === item.answer;

          return (
            <div key={item.id} className="p-3.5 rounded-xl border bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1 max-w-lg">
                <p className="text-xs font-semibold text-foreground">{item.text}</p>
                {choice && (
                  <p className={`text-[11px] ${isCorrect ? 'text-emerald-700 font-medium' : 'text-rose-600'}`}>
                    {isCorrect ? '✓ ' + item.reason : '✗ Incorrect category. Try again!'}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setChoices((prev) => ({ ...prev, [item.id]: 'EVENT' }))}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                    choice === 'EVENT'
                      ? isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-rose-600 text-white border-rose-700'
                      : 'bg-muted/30 border-border hover:bg-muted text-foreground'
                  }`}
                >
                  EVENT
                </button>
                <button
                  onClick={() => setChoices((prev) => ({ ...prev, [item.id]: 'ALERT' }))}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                    choice === 'ALERT'
                      ? isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-rose-600 text-white border-rose-700'
                      : 'bg-muted/30 border-border hover:bg-muted text-foreground'
                  }`}
                >
                  ALERT
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {isComplete && (
        <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="text-xs font-bold text-emerald-950">Taxonomy Mastered!</p>
            <p className="text-[11px] text-emerald-800 mt-0.5">
              Events are factual activity logs; alerts are prioritized notifications that warrant analyst triage.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// TOPIC 2.2: Where Does It Belong? (Event, Alert, Incident, Case)
// =========================================================================
function Interactive22() {
  const situations = [
    { id: 'w1', text: 'Scheduled backup server logs routine nightly transfer', level: 'Event' },
    { id: 'w2', text: 'SIEM flags an unusual spike in failed authentications on FIN-PC-04', level: 'Alert' },
    { id: 'w3', text: 'Triage confirms unauthorized access to a payroll database server', level: 'Incident' },
    { id: 'w4', text: 'Multi-team investigation file tracking forensics, legal notice, and remediation', level: 'Case' },
  ];

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const isComplete = situations.every((s) => answers[s.id] === s.level);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground">Interactive Exercise: Where Does It Belong?</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Place each security scenario into its proper operational hierarchy: Event, Alert, Incident, or Case.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAnswers({})}
          className="h-8 text-xs gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>

      <div className="space-y-3">
        {situations.map((s) => {
          const ans = answers[s.id];
          const isCorrect = ans === s.level;

          return (
            <div key={s.id} className="p-3.5 rounded-xl border bg-card space-y-2">
              <p className="text-xs font-semibold text-foreground">{s.text}</p>
              <div className="flex flex-wrap gap-2">
                {['Event', 'Alert', 'Incident', 'Case'].map((lvl) => {
                  const isSelected = ans === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => setAnswers((prev) => ({ ...prev, [s.id]: lvl }))}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        isSelected
                          ? isCorrect
                            ? 'bg-emerald-600 text-white border-emerald-700'
                            : 'bg-rose-600 text-white border-rose-700'
                          : 'bg-muted/30 border-border hover:bg-muted text-foreground'
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {isComplete && (
        <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="text-xs font-bold text-emerald-950">Hierarchy Perfectly Mapped!</p>
            <p className="text-[11px] text-emerald-800 mt-0.5">
              Event records action → Alert flags anomaly → Incident confirms breach → Case manages resolution.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// TOPIC 3.1: Find the Investigation Details (Entity Extraction)
// =========================================================================
function Interactive31() {
  const fields = [
    { key: 'user', label: 'User', value: 'Finance01', category: 'Target Identity' },
    { key: 'host', label: 'Host', value: 'FIN-PC-04', category: 'Target Workstation' },
    { key: 'ip', label: 'Source IP', value: '10.10.20.15', category: 'Originating Subnet' },
    { key: 'time', label: 'Time', value: '10:32 AM', category: 'Timestamp' },
    { key: 'count', label: 'Attempts', value: '18', category: 'Event Volume' },
  ];

  const [extracted, setExtracted] = useState<string[]>([]);

  const toggleExtract = (key: string) => {
    if (!extracted.includes(key)) {
      setExtracted((prev) => [...prev, key]);
    }
  };

  const isComplete = fields.every((f) => extracted.includes(f.key));

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground">Interactive Exercise: Find the Investigation Details</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Click the key fields inside the FinCorp alert payload to extract and pin them to your investigation panel.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setExtracted([])}
          className="h-8 text-xs gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Raw Alert Payload */}
        <div className="p-4 rounded-xl border bg-slate-950 text-slate-100 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
            <span>ALERT-2026-04</span>
            <span className="text-amber-400 font-bold">SEVERITY: MEDIUM</span>
          </div>
          <p className="text-slate-300 font-bold">MULTIPLE FAILED LOGIN ATTEMPTS</p>
          <div className="space-y-1.5 pt-1">
            {fields.map((f) => {
              const isPinned = extracted.includes(f.key);
              return (
                <div
                  key={f.key}
                  onClick={() => toggleExtract(f.key)}
                  className={`p-1.5 rounded cursor-pointer transition-all flex items-center justify-between ${
                    isPinned
                      ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-300'
                      : 'hover:bg-slate-800 text-slate-300 border border-transparent'
                  }`}
                >
                  <span>{f.label}: <strong className="text-sky-300">{f.value}</strong></span>
                  <span className="text-[10px] text-slate-400 font-sans">
                    {isPinned ? '✓ Pinned' : 'Click to Extract'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Investigation Workbench */}
        <div className="p-4 rounded-xl border bg-card space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-xs font-bold text-foreground">Pinned Case Entities</span>
            <span className="text-xs text-muted-foreground font-mono">{extracted.length} / 5 Extracted</span>
          </div>

          <div className="space-y-2">
            {fields.map((f) => {
              const isPinned = extracted.includes(f.key);
              return (
                <div
                  key={f.key}
                  className={`p-2 rounded-lg border text-xs flex items-center justify-between transition-all ${
                    isPinned
                      ? 'bg-emerald-50/50 border-emerald-300 text-foreground'
                      : 'border-dashed border-border text-muted-foreground/60'
                  }`}
                >
                  <span className="font-semibold">{f.label}:</span>
                  <span>{isPinned ? f.value : '—'}</span>
                </div>
              );
            })}
          </div>

          {isComplete && (
            <div className="p-3 rounded-lg border border-emerald-300 bg-emerald-50 text-xs font-bold text-emerald-950 flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              All Core Entities Extracted — Ready for Triage!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 3.2: Follow the Evidence (Timeline Correlation)
// =========================================================================
function Interactive32() {
  const events = [
    { id: 'ev1', time: '10:31:40', text: 'Event 4625: Failed password attempt on FIN-PC-04', isKey: true, rationale: 'Initial failed authentication recorded.' },
    { id: 'ev2', time: '10:31:52', text: 'Event 4625: 4th failed password attempt on FIN-PC-04', isKey: true, rationale: 'Confirms repeated typo sequence.' },
    { id: 'ev3', time: '10:32:05', text: 'Event 4624: Logon Success (Interactive) from FIN-PC-04', isKey: true, rationale: 'CRITICAL: Legitimate user recovered and logged in successfully!' },
    { id: 'ev4', time: '10:32:08', text: 'Display adapter resolution changed to 1920x1080', isKey: false, rationale: 'Unrelated monitor resolution telemetry; safely ignore.' },
    { id: 'ev5', time: '10:32:15', text: 'Source IP 10.10.20.15 confirmed as Finance desk workstation', isKey: true, rationale: 'Validates source location matches employee desk.' },
  ];

  const [inspected, setInspected] = useState<string[]>([]);

  const toggleInspect = (id: string) => {
    if (!inspected.includes(id)) {
      setInspected((prev) => [...prev, id]);
    }
  };

  const keyEvents = events.filter((e) => e.isKey);
  const isComplete = keyEvents.every((e) => inspected.includes(e.id));

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground">Interactive Exercise: Follow the Evidence</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Click each chronological log entry to evaluate whether it provides key evidence for your triage decision.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setInspected([])}
          className="h-8 text-xs gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>

      <div className="space-y-2.5">
        {events.map((e) => {
          const isClicked = inspected.includes(e.id);
          return (
            <div
              key={e.id}
              onClick={() => toggleInspect(e.id)}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                isClicked
                  ? e.isKey
                    ? 'border-emerald-300 bg-emerald-50/40'
                    : 'border-slate-300 bg-slate-50 opacity-60'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-primary">{e.time}</span>
                <span className="font-medium text-foreground">{e.text}</span>
                <Badge variant="outline" className="text-[10px]">
                  {isClicked ? (e.isKey ? 'Key Evidence' : 'De-emphasized') : 'Click to Inspect'}
                </Badge>
              </div>
              {isClicked && (
                <p className="text-[11px] text-muted-foreground mt-1.5 pl-2 border-l-2 border-primary/40">
                  {e.rationale}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {isComplete && (
        <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="text-xs font-bold text-emerald-950">Evidence Correlated Successfully!</p>
            <p className="text-[11px] text-emerald-800 mt-0.5">
              The sequence of failed attempts followed immediately by Event 4624 (Logon Success) from the user's desk confirms benign user typo.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// TOPIC 4.1: Context Changes the Story (Context Classification)
// =========================================================================
function Interactive41() {
  const cards = [
    { id: 'c1', text: 'Known user logging in from assigned workstation during standard hours', type: 'BENIGN' },
    { id: 'c2', text: 'Approved vulnerability scan running during scheduled maintenance', type: 'BENIGN' },
    { id: 'c3', text: 'Authentication attempts from an unassigned external IP address', type: 'SUSPICIOUS' },
    { id: 'c4', text: 'Single source IP attempting 30 different employee accounts', type: 'SUSPICIOUS' },
    { id: 'c5', text: 'Scheduled automated database synchronization task on weekend', type: 'BENIGN' },
    { id: 'c6', text: 'High-volume credential failure surge at 03:00 AM on Sunday', type: 'SUSPICIOUS' },
  ];

  const [sorts, setSorts] = useState<Record<string, string>>({});

  const isComplete = cards.every((c) => sorts[c.id] === c.type);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground">Interactive Exercise: Context Changes the Story</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Sort each context factor into whether it indicates Expected/Benign activity or Suspicious/Malicious activity.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSorts({})}
          className="h-8 text-xs gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {cards.map((c) => {
          const current = sorts[c.id];
          const isCorrect = current === c.type;

          return (
            <div key={c.id} className="p-3.5 rounded-xl border bg-card flex flex-col justify-between gap-2.5">
              <p className="text-xs font-semibold text-foreground">{c.text}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSorts((prev) => ({ ...prev, [c.id]: 'BENIGN' }))}
                  className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                    current === 'BENIGN'
                      ? isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-rose-600 text-white border-rose-700'
                      : 'bg-muted/30 border-border text-foreground'
                  }`}
                >
                  Expected / Benign
                </button>
                <button
                  onClick={() => setSorts((prev) => ({ ...prev, [c.id]: 'SUSPICIOUS' }))}
                  className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                    current === 'SUSPICIOUS'
                      ? isCorrect
                        ? 'bg-amber-600 text-white border-amber-700'
                        : 'bg-rose-600 text-white border-rose-700'
                      : 'bg-muted/30 border-border text-foreground'
                  }`}
                >
                  Suspicious
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {isComplete && (
        <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="text-xs font-bold text-emerald-950">Contextual Reasoning Applied!</p>
            <p className="text-[11px] text-emerald-800 mt-0.5">
              You recognized how user identity, asset purpose, and time-of-day differentiate benign activity from threats.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// TOPIC 4.2: Find the False Positive (Scenario Evaluation)
// =========================================================================
function Interactive42() {
  const scenarios = [
    { id: 'sc1', title: 'Scenario 1: Employee Forgot Password', desc: 'Accounting clerk enters wrong password 4 times after vacation, then logs in successfully from desk.', isFP: true, expl: 'False Positive: User mistyped password and successfully recovered.' },
    { id: 'sc2', title: 'Scenario 2: Scheduled Vulnerability Scan', desc: 'IT vulnerability scanner tests SMB credentials across subnets during scheduled Sunday window.', isFP: true, expl: 'False Positive: Expected authorized security audit.' },
    { id: 'sc3', title: 'Scenario 3: Unknown Source Attacking Accounts', desc: 'External IP attempts dictionary passwords across 40 executive usernames in 2 minutes.', isFP: false, expl: 'True Positive: Active adversary horizontal credential spray.' },
    { id: 'sc4', title: 'Scenario 4: Approved Administrator Activity', desc: 'Lead SysAdmin executes approved script to sync service accounts across domain controllers.', isFP: true, expl: 'False Positive: Authorized administrative maintenance.' },
  ];

  const [decisions, setDecisions] = useState<Record<string, string>>({});

  const isComplete = scenarios.every(
    (s) => decisions[s.id] === (s.isFP ? 'FP' : 'TP')
  );

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground">Interactive Exercise: Find the False Positive</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Identify whether each alert scenario represents a False Positive (Benign/Expected) or True Positive (Suspicious).
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setDecisions({})}
          className="h-8 text-xs gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>

      <div className="space-y-3">
        {scenarios.map((s) => {
          const choice = decisions[s.id];
          const expectedChoice = s.isFP ? 'FP' : 'TP';
          const isCorrect = choice === expectedChoice;

          return (
            <div key={s.id} className="p-3.5 rounded-xl border bg-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-foreground">{s.title}</span>
                {choice && (
                  <Badge variant="outline" className={`text-[10px] ${isCorrect ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>
                    {isCorrect ? 'Correct Verdict' : 'Re-evaluate'}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setDecisions((prev) => ({ ...prev, [s.id]: 'FP' }))}
                  className={`px-3 py-1 rounded text-xs font-bold border transition-all ${
                    choice === 'FP'
                      ? isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-rose-600 text-white border-rose-700'
                      : 'bg-muted/30 border-border text-foreground'
                  }`}
                >
                  False Positive (Benign / Expected)
                </button>
                <button
                  onClick={() => setDecisions((prev) => ({ ...prev, [s.id]: 'TP' }))}
                  className={`px-3 py-1 rounded text-xs font-bold border transition-all ${
                    choice === 'TP'
                      ? isCorrect
                        ? 'bg-rose-600 text-white border-rose-700'
                        : 'bg-emerald-600 text-white border-emerald-700'
                      : 'bg-muted/30 border-border text-foreground'
                  }`}
                >
                  True Positive (Suspicious)
                </button>
              </div>
              {choice && (
                <p className="text-[11px] text-muted-foreground italic pt-1">{s.expl}</p>
              )}
            </div>
          );
        })}
      </div>

      {isComplete && (
        <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="text-xs font-bold text-emerald-950">False Positive Analysis Complete!</p>
            <p className="text-[11px] text-emerald-800 mt-0.5">
              Accurately identified benign employee errors and maintenance scans while catching the true adversary attack.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// TOPIC 5.1: Set the Priority (Severity Classification)
// =========================================================================
function Interactive51() {
  const cases = [
    { id: 'p1', title: '5 failed logins on laptop before user successfully logs in', sev: 'LOW', reason: 'Isolated standard workstation, zero business disruption.' },
    { id: 'p2', title: 'Unfamiliar internal IP port scanning corporate file server', sev: 'MEDIUM', reason: 'Potential internal lateral movement or reconnaissance requiring investigation.' },
    { id: 'p3', title: 'Compromised Domain Admin accessing executive share at 02:00 AM', sev: 'HIGH', reason: 'High-privilege identity anomaly threatening core organizational assets.' },
  ];

  const [priorities, setPriorities] = useState<Record<string, string>>({});

  const isComplete = cases.every((c) => priorities[c.id] === c.sev);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground">Interactive Exercise: Set the Priority</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Assign each scenario to LOW, MEDIUM, or HIGH priority based on asset criticality and risk.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPriorities({})}
          className="h-8 text-xs gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>

      <div className="space-y-3">
        {cases.map((c) => {
          const current = priorities[c.id];
          const isCorrect = current === c.sev;

          return (
            <div key={c.id} className="p-3.5 rounded-xl border bg-card space-y-2">
              <p className="text-xs font-semibold text-foreground">{c.title}</p>
              <div className="flex items-center gap-2">
                {['LOW', 'MEDIUM', 'HIGH'].map((lvl) => {
                  const isSelected = current === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => setPriorities((prev) => ({ ...prev, [c.id]: lvl }))}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                        isSelected
                          ? isCorrect
                            ? lvl === 'LOW' ? 'bg-emerald-600 text-white' : lvl === 'MEDIUM' ? 'bg-amber-600 text-white' : 'bg-rose-600 text-white'
                            : 'bg-slate-700 text-white'
                          : 'bg-muted/30 border-border text-foreground hover:bg-muted'
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
              {current && (
                <p className={`text-[11px] ${isCorrect ? 'text-emerald-700 font-medium' : 'text-muted-foreground'}`}>
                  {isCorrect ? '✓ ' + c.reason : 'Re-evaluate risk level for this asset.'}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {isComplete && (
        <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="text-xs font-bold text-emerald-950">Priorities Assigned Correctly!</p>
            <p className="text-[11px] text-emerald-800 mt-0.5">
              Severity scales with asset value, privilege level, and attacker progress.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// TOPIC 5.2: What Changes Your Assessment? (Impact & Confidence)
// =========================================================================
function Interactive52() {
  const [factors, setFactors] = useState<string[]>([]);

  const toggleFactor = (f: string) => {
    setFactors((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  };

  // Base score = 2
  let score = 2;
  if (factors.includes('crown')) score += 3;
  if (factors.includes('kiosk')) score -= 1;
  if (factors.includes('hash')) score += 2;
  if (factors.includes('ambig')) score -= 1;

  score = Math.max(1, Math.min(5, score));

  const priorityLabel =
    score >= 4 ? 'CRITICAL (Immediate All-Hands Escalation)' : score >= 3 ? 'HIGH (30m SLA Triage)' : score === 2 ? 'MEDIUM (Standard Triage)' : 'LOW (Routine Queue)';

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground">Interactive Exercise: What Changes Your Assessment?</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Toggle context factors below and watch how asset criticality and evidence confidence adjust the priority.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setFactors([])}
          className="h-8 text-xs gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>

      {/* Dynamic Assessment Meter */}
      <div className="p-4 rounded-xl border bg-card space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-foreground">Current Triage Priority:</span>
          <Badge
            className={`font-bold text-xs ${
              score >= 4 ? 'bg-rose-600 text-white' : score >= 3 ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'
            }`}
          >
            {priorityLabel}
          </Badge>
        </div>
        <Progress value={(score / 5) * 100} className="h-2.5" />
      </div>

      {/* Context Toggles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {[
          { id: 'crown', label: 'Target: Core SWIFT Banking Server', effect: '+ Major Impact' },
          { id: 'kiosk', label: 'Target: Isolated Guest Wi-Fi Kiosk', effect: '- Minor Impact' },
          { id: 'hash', label: 'Evidence: Verified CISA Threat Intel Hash', effect: '+ High Confidence' },
          { id: 'ambig', label: 'Evidence: Ambiguous Heuristic Score', effect: '- Low Confidence' },
        ].map((f) => {
          const active = factors.includes(f.id);
          return (
            <button
              key={f.id}
              onClick={() => toggleFactor(f.id)}
              className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                active ? 'bg-primary/10 border-primary text-foreground' : 'bg-card border-border hover:bg-muted/50'
              }`}
            >
              <div>
                <span className="text-xs font-semibold block">{f.label}</span>
                <span className="text-[11px] text-muted-foreground">{f.effect}</span>
              </div>
              <Badge variant={active ? 'default' : 'outline'} className="text-[10px]">
                {active ? 'Active' : 'Add'}
              </Badge>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 6.1: Who Needs This Next? (Tier Routing)
// =========================================================================
function Interactive61() {
  const scenarios = [
    { id: 'r1', text: 'New unvalidated alert: Multiple failed logins on marketing PC', target: 'L1', reason: 'Requires initial validation, entity extraction, and preliminary scoping.' },
    { id: 'r2', text: 'Validated true positive: Unauthorized remote shell spawned on billing server', target: 'L2', reason: 'Requires host isolation, memory forensics, and active eradication.' },
    { id: 'r3', text: 'Suspected zero-day undocumented binary with custom encryption routine', target: 'L3', reason: 'Requires reverse engineering and enterprise-wide proactive threat hunting.' },
  ];

  const [tierRoutes, setTierRoutes] = useState<Record<string, string>>({});

  const isComplete = scenarios.every((s) => tierRoutes[s.id] === s.target);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground">Interactive Exercise: Who Needs This Next?</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Route each incident situation to the appropriate tier: L1 (Triage), L2 (Response), or L3 (Threat Hunting).
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTierRoutes({})}
          className="h-8 text-xs gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>

      <div className="space-y-3">
        {scenarios.map((s) => {
          const route = tierRoutes[s.id];
          const isCorrect = route === s.target;

          return (
            <div key={s.id} className="p-3.5 rounded-xl border bg-card space-y-2">
              <p className="text-xs font-semibold text-foreground">{s.text}</p>
              <div className="flex items-center gap-2">
                {['L1', 'L2', 'L3'].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setTierRoutes((prev) => ({ ...prev, [s.id]: tier }))}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                      route === tier
                        ? isCorrect
                          ? 'bg-emerald-600 text-white border-emerald-700'
                          : 'bg-rose-600 text-white border-rose-700'
                        : 'bg-muted/30 border-border text-foreground hover:bg-muted'
                    }`}
                  >
                    {tier} Analyst
                  </button>
                ))}
              </div>
              {route && (
                <p className={`text-[11px] ${isCorrect ? 'text-emerald-700 font-medium' : 'text-muted-foreground'}`}>
                  {isCorrect ? '✓ ' + s.reason : 'Incorrect tier assignment. Check incident complexity.'}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {isComplete && (
        <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="text-xs font-bold text-emerald-950">Tier Routing Confirmed!</p>
            <p className="text-[11px] text-emerald-800 mt-0.5">
              L1 qualifies, L2 remediates, and L3 handles advanced adversary hunting.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// TOPIC 6.2: Route the Escalation (Specialist Teams)
// =========================================================================
function Interactive62() {
  const tasks = [
    { id: 'rt1', text: 'Compromised admin account requires emergency domain-wide Kerberos ticket reset', team: 'Identity / AD', rationale: 'Active Directory admins manage forest-wide credentials and Kerberos tokens.' },
    { id: 'rt2', text: 'Active adversary C2 traffic observed; need immediate perimeter firewall block', team: 'Network', rationale: 'Network engineering manages perimeter ACLs and switch isolation.' },
    { id: 'rt3', text: 'Incident involves customer financial data exposure requiring regulatory briefing', team: 'Management', rationale: 'SOC management and legal counsel oversee compliance disclosures.' },
  ];

  const [teamRoutes, setTeamRoutes] = useState<Record<string, string>>({});

  const isComplete = tasks.every((t) => teamRoutes[t.id] === t.team);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground">Interactive Exercise: Route the Escalation</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Direct each specialized requirement to the relevant partner: Identity/AD Team, Network Team, or SOC Management.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTeamRoutes({})}
          className="h-8 text-xs gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.map((t) => {
          const route = teamRoutes[t.id];
          const isCorrect = route === t.team;

          return (
            <div key={t.id} className="p-3.5 rounded-xl border bg-card space-y-2">
              <p className="text-xs font-semibold text-foreground">{t.text}</p>
              <div className="flex flex-wrap gap-2">
                {['Identity / AD', 'Network', 'Management'].map((teamOption) => (
                  <button
                    key={teamOption}
                    onClick={() => setTeamRoutes((prev) => ({ ...prev, [t.id]: teamOption }))}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                      route === teamOption
                        ? isCorrect
                          ? 'bg-emerald-600 text-white border-emerald-700'
                          : 'bg-rose-600 text-white border-rose-700'
                        : 'bg-muted/30 border-border text-foreground hover:bg-muted'
                    }`}
                  >
                    {teamOption}
                  </button>
                ))}
              </div>
              {route && (
                <p className={`text-[11px] ${isCorrect ? 'text-emerald-700 font-medium' : 'text-muted-foreground'}`}>
                  {isCorrect ? '✓ ' + t.rationale : 'Incorrect team choice. Review team responsibilities.'}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {isComplete && (
        <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="text-xs font-bold text-emerald-950">Cross-Functional Coordination Complete!</p>
            <p className="text-[11px] text-emerald-800 mt-0.5">
              Identity team resets credentials, Network blocks C2 egress, and Management briefs leadership.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// TOPIC 7.1: Build the Analyst Note (Documentation Structure)
// =========================================================================
function Interactive71() {
  const blocks = [
    { id: 'b1', name: '1. Incident Summary', text: 'Investigated Multiple Failed Logins for user Finance01 on host FIN-PC-04.' },
    { id: 'b2', name: '2. Core Entities', text: 'User: Finance01 | Host: FIN-PC-04 | Source IP: 10.10.20.15 | Subnet: Finance LAN.' },
    { id: 'b3', name: '3. Technical Evidence', text: '10:31:40 - 10:31:52: 4 failed attempts (Event 4625) -> 10:32:05: Logon Success (Event 4624).' },
    { id: 'b4', name: '4. Verified Findings', text: 'User mistyped password due to Caps Lock. Clean process trees verified in EDR.' },
    { id: 'b5', name: '5. Action & Disposition', text: 'Closed as Benign False Positive (User Error). No remediation required.' },
  ];

  const [activeBlocks, setActiveBlocks] = useState<string[]>([]);

  const addBlock = (id: string) => {
    if (!activeBlocks.includes(id)) {
      setActiveBlocks((prev) => [...prev, id]);
    }
  };

  const isComplete = blocks.every((b) => activeBlocks.includes(b.id));

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground">Interactive Exercise: Build the Analyst Note</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Assemble the essential documentation sections in logical order to construct a professional, audit-proof ticket note.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setActiveBlocks([])}
          className="h-8 text-xs gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Source Blocks */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            Click to Append to Note:
          </span>
          {blocks.map((b) => {
            const isAdded = activeBlocks.includes(b.id);
            return (
              <button
                key={b.id}
                disabled={isAdded}
                onClick={() => addBlock(b.id)}
                className={`w-full p-3 rounded-xl border text-left transition-all ${
                  isAdded
                    ? 'bg-muted/40 border-border opacity-50 cursor-not-allowed'
                    : 'bg-card border-border hover:border-primary cursor-pointer'
                }`}
              >
                <span className="text-xs font-bold text-foreground block">{b.name}</span>
                <span className="text-[11px] text-muted-foreground block mt-0.5">{b.text}</span>
              </button>
            );
          })}
        </div>

        {/* Live Note Preview */}
        <div className="p-4 rounded-xl border bg-card space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-xs font-bold text-foreground">Live SOC Ticket Preview</span>
            <span className="text-xs text-muted-foreground font-mono">{activeBlocks.length} / 5 Sections</span>
          </div>

          <div className="space-y-2 text-xs font-mono bg-muted/30 p-3 rounded-lg min-h-[160px]">
            {activeBlocks.length === 0 ? (
              <span className="text-muted-foreground italic font-sans text-xs">
                Ticket note is currently empty. Click sections to assemble...
              </span>
            ) : (
              activeBlocks.map((id) => {
                const b = blocks.find((x) => x.id === id);
                return (
                  <div key={id} className="text-foreground">
                    <strong className="text-primary font-bold">{b?.name}:</strong> {b?.text}
                  </div>
                );
              })
            )}
          </div>

          {isComplete && (
            <div className="p-3 rounded-lg border border-emerald-300 bg-emerald-50 text-xs font-bold text-emerald-950 flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Audit-Proof Investigation Note Complete!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 7.2: Complete the Case Record (Incident Ticket Fields)
// =========================================================================
function Interactive72() {
  const fields = [
    { key: 'entity', label: 'Target Entity Details', answer: 'Finance01 (FIN-PC-04 / 10.10.20.15)' },
    { key: 'chrono', label: 'Event Chronology', answer: '10:31:40 Failures -> 10:32:05 Success' },
    { key: 'verif', label: 'Verification Evidence', answer: 'User confirmed typo; clean EDR process tree' },
    { key: 'disp', label: 'Ticket Disposition', answer: 'Closed — Benign False Positive (User Error)' },
  ];

  const [placed, setPlaced] = useState<Record<string, string>>({});

  const assignField = (key: string, val: string) => {
    setPlaced((prev) => ({ ...prev, [key]: val }));
  };

  const isComplete = fields.every((f) => placed[f.key] === f.answer);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground">Interactive Exercise: Complete the Case Record</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Place the available investigation findings from FinCorp alert ALT-2026-04 into their correct ticket fields.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPlaced({})}
          className="h-8 text-xs gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ticket Form */}
        <div className="p-4 rounded-xl border bg-card space-y-3">
          <div className="border-b pb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-foreground">Case Ticket #2026-04</span>
            <Badge variant="outline" className="text-[10px]">FinCorp SOC</Badge>
          </div>

          <div className="space-y-2.5">
            {fields.map((f) => (
              <div key={f.key} className="space-y-1">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">{f.label}:</span>
                <div className="p-2.5 rounded-lg border bg-muted/20 min-h-[38px] text-xs font-medium flex items-center">
                  {placed[f.key] ? (
                    <span className="text-emerald-700 font-semibold">{placed[f.key]}</span>
                  ) : (
                    <span className="text-muted-foreground/60 italic">Pending assignment...</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Finding Cards */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            Click to Assign to Matching Field:
          </span>
          {fields.map((f) => {
            const isAssigned = Object.values(placed).includes(f.answer);
            return (
              <button
                key={f.key}
                disabled={isAssigned}
                onClick={() => assignField(f.key, f.answer)}
                className={`w-full p-3 rounded-xl border text-left transition-all ${
                  isAssigned
                    ? 'bg-emerald-50/30 border-emerald-200 opacity-60 cursor-not-allowed'
                    : 'bg-card border-border hover:border-primary cursor-pointer active:scale-98'
                }`}
              >
                <span className="text-xs font-semibold text-foreground block">{f.answer}</span>
                <span className="text-[10px] text-muted-foreground block mt-0.5">
                  {isAssigned ? '✓ Placed in ' + f.label : 'Click to place in ' + f.label}
                </span>
              </button>
            );
          })}

          {isComplete && (
            <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 flex items-center gap-3 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-950">Incident Ticket Completed!</p>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Case #2026-04 is documented with complete entities, chronology, verification, and closure rationale.
                </p>
              </div>
            </div>
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
      return <Interactive11 />;
    case 'topic-1-2':
      return <Interactive12 />;
    case 'topic-1-3':
      return <Interactive13 />;
    case 'topic-1-4':
      return <Interactive14 />;
    case 'topic-2-1':
      return <Interactive21 />;
    case 'topic-2-2':
      return <Interactive22 />;
    case 'topic-3-1':
      return <Interactive31 />;
    case 'topic-3-2':
      return <Interactive32 />;
    case 'topic-4-1':
      return <Interactive41 />;
    case 'topic-4-2':
      return <Interactive42 />;
    case 'topic-5-1':
      return <Interactive51 />;
    case 'topic-5-2':
      return <Interactive52 />;
    case 'topic-6-1':
      return <Interactive61 />;
    case 'topic-6-2':
      return <Interactive62 />;
    case 'topic-7-1':
      return <Interactive71 />;
    case 'topic-7-2':
      return <Interactive72 />;
    default:
      return <Interactive11 />;
  }
}
