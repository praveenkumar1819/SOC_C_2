'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  Check,
  RotateCcw,
  Sparkles,
  UserCheck,
  Shield,
  Clock,
  ExternalLink,
  ChevronRight,
  Maximize2,
  Minimize2,
  X,
  Award,
  Play,
  FileText,
  AlertTriangle,
  Lock,
  Layers,
  HelpCircle,
  Activity,
  Filter,
  Flame,
  KeyRound,
  ShieldCheck,
  FileJson,
  Table as TableIcon,
  Search,
  Copy,
  Info,
  Sun,
  Moon,
  Laptop,
  Globe,
  Database,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast-provider';
import { useProgressStore } from '@/store/progress-store';
import { sound } from '@/lib/sound-effects';

interface Module04SimLabProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleted?: () => void;
}

export function Module04SimLab({ isOpen, onClose, onCompleted }: Module04SimLabProps) {
  const { showToast } = useToast();
  const addXP = useProgressStore((state) => state.addXP);

  // View state: 'json' (Raw SIEM Alert) vs 'csv' (Auth Log Table) vs 'edr' (Host/Process Telemetry)
  const [telemetryTab, setTelemetryTab] = useState<'json' | 'csv' | 'edr'>('json');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Task 1: Core Entity Extraction
  const [extractedUser, setExtractedUser] = useState('');
  const [extractedHost, setExtractedHost] = useState('');
  const [extractedSrcIp, setExtractedSrcIp] = useState('');
  const [extractedTimestamp, setExtractedTimestamp] = useState('');
  const [task1Done, setTask1Done] = useState(false);

  // Task 2: Attempt Count & Trigger Condition
  const [attemptCount, setAttemptCount] = useState('');
  const [failureReason, setFailureReason] = useState('');
  const [task2Done, setTask2Done] = useState(false);

  // Task 3: Missing Context Fields (Identify 2)
  const [missingContext, setMissingContext] = useState<string[]>([]);
  const [task3Done, setTask3Done] = useState(false);

  // Task 4: L1 Disposition & Escalation
  const [triageVerdict, setTriageVerdict] = useState<string>('');
  const [recommendedAction, setRecommendedAction] = useState<string>('');
  const [triageRationale, setTriageRationale] = useState(
    'Alert SEC-2026-0891 represents a High Severity True Positive: 47 consecutive failed logons (0xC000006A) followed by successful authentication at 3:42 AM IST from external IP 203.0.113.195 against BLR-BR-WS-04. Immediate host isolation and credential reset recommended.'
  );
  const [task4Done, setTask4Done] = useState(false);

  // Check overall completion
  const isAllDone = task1Done && task2Done && task3Done && task4Done;

  useEffect(() => {
    if (isAllDone) {
      sound.playSuccess();
      showToast({
        type: 'success',
        title: 'All Alert Triage Tasks Satisfied! 🎉',
        description: 'You have extracted core entities, identified missing context, and produced an audit-grade L1 disposition.',
      });
    }
  }, [isAllDone, showToast]);

  if (!isOpen) return null;

  // Auto-fill button for quick demonstration / assisted learning
  const handleAutoFillEntities = () => {
    sound.playClick();
    setExtractedUser('mchen');
    setExtractedHost('BLR-BR-WS-04');
    setExtractedSrcIp('203.0.113.195');
    setExtractedTimestamp('2026-10-15 03:42:18');
    setTask1Done(true);
    showToast({
      type: 'info',
      title: 'Entities Extracted',
      description: 'Extracted Michael Chen (mchen) on workstation BLR-BR-WS-04.',
    });
  };

  const handleValidateTask1 = () => {
    sound.playClick();
    const u = extractedUser.trim().toLowerCase();
    const h = extractedHost.trim().toUpperCase();
    const ip = extractedSrcIp.trim();

    if ((u === 'mchen' || u === 'michael chen') && (h === 'BLR-BR-WS-04' || h.includes('BLR')) && ip === '203.0.113.195') {
      setTask1Done(true);
      sound.playSuccess();
      showToast({
        type: 'success',
        title: 'Task 1 Verified: Core Entities Mapped!',
        description: 'User, target endpoint, and attacker source IP validated.',
      });
    } else {
      showToast({
        type: 'error',
        title: 'Entity Validation Check',
        description: 'Check the SIEM JSON payload: User is "mchen", Host is "BLR-BR-WS-04", Source IP is "203.0.113.195".',
      });
    }
  };

  const handleValidateTask2 = () => {
    sound.playClick();
    if (attemptCount.trim() === '47' && failureReason === 'wrong_password') {
      setTask2Done(true);
      sound.playSuccess();
      showToast({
        type: 'success',
        title: 'Task 2 Verified: Trigger Condition Confirmed!',
        description: '47 failed attempts with SubStatus 0xC000006A (STATUS_WRONG_PASSWORD) confirmed.',
      });
    } else {
      showToast({
        type: 'error',
        title: 'Threshold Check',
        description: 'Look at the aggregated event count (47 failed logons) and Windows failure code (Wrong Password).',
      });
    }
  };

  const toggleMissingContext = (fieldId: string) => {
    sound.playClick();
    setMissingContext((prev) => {
      const next = prev.includes(fieldId) ? prev.filter((id) => id !== fieldId) : [...prev, fieldId];
      if (next.includes('ip_rep') && next.includes('user_geo') && next.length === 2) {
        setTask3Done(true);
        sound.playSuccess();
        showToast({
          type: 'success',
          title: 'Task 3 Verified: Missing Context Flagged!',
          description: 'IP Threat Intelligence & User Baseline / Geo-Velocity correctly identified as missing.',
        });
      } else {
        setTask3Done(false);
      }
      return next;
    });
  };

  const handleValidateTask4 = () => {
    sound.playClick();
    if (triageVerdict === 'true_positive' && recommendedAction === 'isolate_and_reset' && triageRationale.trim().length > 30) {
      setTask4Done(true);
      sound.playSuccess();
      showToast({
        type: 'success',
        title: 'Task 4 Verified: L1 Disposition Approved!',
        description: 'True Positive verdict and Tier 2 containment escalation approved by Mentor Ananya.',
      });
    } else {
      showToast({
        type: 'error',
        title: 'Disposition Check',
        description: 'Verdict should be True Positive (Brute-Force Attack) with immediate Host Isolation & Credential Reset.',
      });
    }
  };

  const handleResetLab = () => {
    sound.playClick();
    setExtractedUser('');
    setExtractedHost('');
    setExtractedSrcIp('');
    setExtractedTimestamp('');
    setTask1Done(false);
    setAttemptCount('');
    setFailureReason('');
    setTask2Done(false);
    setMissingContext([]);
    setTask3Done(false);
    setTriageVerdict('');
    setRecommendedAction('');
    setTask4Done(false);
    setTelemetryTab('json');
  };

  const handleSubmitFinalReport = () => {
    sound.playSuccess();
    addXP(50);

    // Save in localStorage so LabsV2Modal recognizes it as completed
    try {
      const saved = localStorage.getItem('soc_v2_completed_lab_tasks');
      const parsed = saved ? JSON.parse(saved) : {};
      parsed['LAB-04-task-0'] = true;
      parsed['LAB-04-task-1'] = true;
      parsed['LAB-04-task-2'] = true;
      localStorage.setItem('soc_v2_completed_lab_tasks', JSON.stringify(parsed));
    } catch (e) {
      // ignore
    }

    setShowCompletionModal(true);
    if (onCompleted) onCompleted();
  };

  // Raw JSON Alert Bundle Payload
  const rawAlertJson = {
    alert_id: 'SEC-2026-0891',
    alert_name: 'Anomalous Authentication Spike & Potential Brute-Force',
    severity: 'HIGH',
    rule_id: 'SIEM-CORR-WIN-AUTH-042',
    timestamp: '2026-10-15T03:42:18.000Z',
    environment: 'FinCorp Bengaluru Branch (VLAN 10)',
    target_entity: {
      user_name: 'mchen',
      full_name: 'Michael Chen',
      title: 'Senior Credit Operations Analyst',
      department: 'Branch Finance',
      host_name: 'BLR-BR-WS-04',
      host_ip: '192.168.10.64',
      os: 'Windows 11 Enterprise 23H2 (Build 22631.3447)',
    },
    network_context: {
      source_ip: '203.0.113.195',
      source_port: 58492,
      destination_port: 3389,
      protocol: 'RDP / NLA',
      geo_country: 'Unspecified / External Cloud Proxy',
    },
    event_summary: {
      failed_attempts: 47,
      successful_attempts: 1,
      window_seconds: 120,
      primary_event_id: 4625,
      sub_status_code: '0xC000006A',
      failure_reason: 'STATUS_WRONG_PASSWORD',
      final_event_id: 4624,
      logon_type: 10,
      logon_type_desc: 'RemoteInteractive (Terminal Services / RDP)',
    },
    raw_event_sample: {
      EventID: 4625,
      Channel: 'Security',
      Provider: 'Microsoft-Windows-Security-Auditing',
      TargetUserName: 'mchen',
      TargetDomainName: 'FINCORP-DOM',
      WorkstationName: 'WORKSTATION-01',
      IpAddress: '203.0.113.195',
      IpPort: '58492',
      LogonType: 10,
    },
  };

  // CSV Authentication Log sample rows
  const authLogRows = [
    { time: '03:40:12', eventId: 4625, user: 'mchen', srcIp: '203.0.113.195', port: 3389, type: 10, status: '0xC000006A (Bad Password)' },
    { time: '03:40:15', eventId: 4625, user: 'mchen', srcIp: '203.0.113.195', port: 3389, type: 10, status: '0xC000006A (Bad Password)' },
    { time: '03:40:48', eventId: 4625, user: 'mchen', srcIp: '203.0.113.195', port: 3389, type: 10, status: '0xC000006A (Bad Password)' },
    { time: '03:41:20', eventId: 4625, user: 'mchen', srcIp: '203.0.113.195', port: 3389, type: 10, status: '0xC000006A (Bad Password)' },
    { time: '03:41:59', eventId: 4625, user: 'mchen', srcIp: '203.0.113.195', port: 3389, type: 10, status: '0xC000006A (Bad Password)' },
    { time: '03:42:18', eventId: 4624, user: 'mchen', srcIp: '203.0.113.195', port: 3389, type: 10, status: '0x0 (Success - RDP Session)' },
  ];

  // Mentor Ananya guidance calculation
  let mentorMessage =
    'Welcome to the Alert Triage Console! Alert SEC-2026-0891 just fired in our SIEM queue. Your first task is to extract the 5 Critical W\'s from the raw alert JSON: User, Host, Source IP, and Timestamp.';
  if (task1Done && !task2Done) {
    mentorMessage =
      'Entities confirmed: Michael Chen (mchen) on workstation BLR-BR-WS-04. Now inspect the authentication telemetry to record the exact attempt count and the failure reason code.';
  } else if (task1Done && task2Done && !task3Done) {
    mentorMessage =
      'Threshold verified: 47 failed logons followed by 1 success. Now identify the 2 missing context fields that are required before we can close or escalate this incident.';
  } else if (task1Done && task2Done && task3Done && !task4Done) {
    mentorMessage =
      'Excellent analytical thinking! You flagged IP Reputation and User Baseline as missing context. Now provide your L1 triage verdict and recommend the immediate containment action.';
  } else if (isAllDone) {
    mentorMessage =
      'Audit-grade triage complete! All 4 steps are verified. Review your completed worksheet and click "Submit Lab Deliverable" to submit your triage report to CDAC Bengaluru.';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in text-slate-800">
      <div
        className={`relative w-full ${
          isFullscreen ? 'h-full max-h-none rounded-none' : 'max-w-6xl h-[92vh] max-h-[900px] rounded-2xl'
        } flex flex-col bg-white border border-slate-200 shadow-2xl overflow-hidden transition-all`}
      >
        {/* =========================================================================
            HEADER BAR (CLEAN WHITE THEME)
        ========================================================================= */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200 bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-xs">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-slate-900 tracking-tight flex items-center gap-2">
                  <span>LAB-04: Read the Incoming Alert</span>
                  <Badge className="bg-indigo-600 text-white font-mono text-[10px] uppercase font-bold">
                    Module 04 Lab
                  </Badge>
                  <Badge variant="outline" className="border-rose-300 text-rose-700 bg-rose-50 text-[10px] font-bold font-mono">
                    HIGH SEVERITY
                  </Badge>
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                Queue: <strong className="text-slate-700">SIEM Alert SEC-2026-0891</strong> • Mentor:{' '}
                <strong className="text-indigo-600">Ananya</strong> • 55m Practical Session
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetLab}
              className="text-xs h-8 px-2.5 gap-1.5 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-2xs"
              title="Reset Lab Progress"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="h-8 w-8 text-slate-600 border-slate-200 hover:bg-slate-50 shadow-2xs"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 text-slate-600 border-slate-200 hover:bg-slate-50 shadow-2xs"
              title="Close Lab"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* =========================================================================
            INCIDENT SUMMARY STRIP
        ========================================================================= */}
        <div className="px-6 py-2.5 border-b border-slate-200 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-bold text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded-md border border-rose-200">
              <Flame className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              ALERT SEC-2026-0891: Brute-Force Spike
            </span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-slate-600 hidden sm:inline">Target: BLR-BR-WS-04 (192.168.10.64)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-xs">Triage Checklist:</span>
            <Badge
              variant="outline"
              className={`text-xs font-mono font-bold ${
                isAllDone
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                  : 'border-indigo-300 bg-indigo-50 text-indigo-700'
              }`}
            >
              {(task1Done ? 1 : 0) + (task2Done ? 1 : 0) + (task3Done ? 1 : 0) + (task4Done ? 1 : 0)} / 4 Complete
            </Badge>
          </div>
        </div>

        {/* =========================================================================
            MAIN SPLIT VIEW: TELEMETRY CONSOLE (LEFT) + TRIAGE WORKSHEET (RIGHT)
        ========================================================================= */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-slate-50/50">
          {/* ==================== LEFT: TELEMETRY CONSOLE (7 COLS) ==================== */}
          <div className="lg:col-span-7 flex flex-col border-r border-slate-200 bg-white min-h-0">
            {/* Telemetry Tabs */}
            <div className="px-5 py-2.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setTelemetryTab('json');
                  }}
                  className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                    telemetryTab === 'json'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileJson className="w-3.5 h-3.5" />
                  <span>Raw SIEM JSON</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setTelemetryTab('csv');
                  }}
                  className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                    telemetryTab === 'csv'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Auth Event Log Table</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setTelemetryTab('edr');
                  }}
                  className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                    telemetryTab === 'edr'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>EDR Host Profile</span>
                </button>
              </div>

              <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                Telemetry Source: Windows Event Collector (WEF)
              </span>
            </div>

            {/* Telemetry Tab Content */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-slate-700 space-y-3">
              {/* TAB 1: RAW JSON */}
              {telemetryTab === 'json' && (
                <div className="space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span className="font-bold flex items-center gap-1.5">
                      <FileJson className="w-3.5 h-3.5 text-indigo-600" />
                      SIEM Event Object: SEC-2026-0891
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        navigator.clipboard?.writeText(JSON.stringify(rawAlertJson, null, 2));
                        showToast({ type: 'info', title: 'Copied', description: 'Raw JSON copied to clipboard.' });
                      }}
                      className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy JSON</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto shadow-inner leading-relaxed border border-slate-800">
                    <pre>{JSON.stringify(rawAlertJson, null, 2)}</pre>
                  </div>
                </div>
              )}

              {/* TAB 2: AUTH LOG CSV TABLE */}
              {telemetryTab === 'csv' && (
                <div className="space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span className="font-bold flex items-center gap-1.5">
                      <TableIcon className="w-3.5 h-3.5 text-indigo-600" />
                      Chronological Authentication Records (Event Log Sequence)
                    </span>
                    <Badge variant="outline" className="text-[10px] border-slate-300 text-slate-600">
                      Window: 03:40:00 - 03:42:30 IST
                    </Badge>
                  </div>

                  <div className="rounded-xl border border-slate-200 overflow-hidden shadow-xs bg-white">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px]">
                        <tr>
                          <th className="p-2.5">Timestamp</th>
                          <th className="p-2.5">Event ID</th>
                          <th className="p-2.5">Account</th>
                          <th className="p-2.5">Source IP</th>
                          <th className="p-2.5">Port</th>
                          <th className="p-2.5">Status Code & Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 text-[11px]">
                        {authLogRows.map((row, idx) => (
                          <tr key={idx} className={row.eventId === 4624 ? 'bg-amber-50/70 font-bold' : 'hover:bg-slate-50'}>
                            <td className="p-2.5 text-slate-500">{row.time}</td>
                            <td className="p-2.5">
                              <span
                                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                  row.eventId === 4625 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {row.eventId}
                              </span>
                            </td>
                            <td className="p-2.5 text-indigo-700">{row.user}</td>
                            <td className="p-2.5 text-slate-600">{row.srcIp}</td>
                            <td className="p-2.5">{row.port}</td>
                            <td className="p-2.5">
                              <span className={row.eventId === 4624 ? 'text-amber-800' : 'text-rose-600'}>
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="text-[11px] text-slate-500 italic">
                    Note: 42 additional Event ID 4625 logs occurred between 03:40:15 and 03:41:59 from the same source IP.
                  </p>
                </div>
              )}

              {/* TAB 3: EDR HOST PROFILE */}
              {telemetryTab === 'edr' && (
                <div className="space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span className="font-bold flex items-center gap-1.5">
                      <Laptop className="w-3.5 h-3.5 text-indigo-600" />
                      EDR Agent Telemetry & Endpoint Baseline
                    </span>
                    <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-300 text-[10px] font-bold">
                      EDR SENSOR ACTIVE
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Assigned Owner</span>
                      <span className="text-slate-900 font-bold text-sm">Michael Chen (mchen)</span>
                      <p className="text-slate-600 text-[11px]">Senior Credit Operations Analyst • Branch Finance</p>
                    </div>

                    <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Workstation Asset</span>
                      <span className="text-slate-900 font-bold text-sm">BLR-BR-WS-04</span>
                      <p className="text-slate-600 text-[11px]">192.168.10.64 • Windows 11 Enterprise (VLAN 10)</p>
                    </div>

                    <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Normal Business Hours</span>
                      <span className="text-slate-900 font-bold">09:00 - 18:00 IST (Mon - Fri)</span>
                      <p className="text-rose-600 text-[11px] font-bold">⚠️ Alert fired at 03:42 AM IST (Anomalous Shift)</p>
                    </div>

                    <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Historical Login Subnet</span>
                      <span className="text-slate-900 font-bold">192.168.10.0/24 (Internal LAN)</span>
                      <p className="text-rose-600 text-[11px] font-bold">⚠️ Ingress from External WAN IP: 203.0.113.195</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Footer */}
            <div className="p-3 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between text-xs font-mono shrink-0">
              <span className="text-slate-500">Need help extracting entities?</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAutoFillEntities}
                className="h-7 text-xs border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                <span>Auto-Extract Entities</span>
              </Button>
            </div>
          </div>

          {/* ==================== RIGHT: TRIAGE WORKSHEET (5 COLS) ==================== */}
          <div className="lg:col-span-5 flex flex-col bg-slate-50/70 overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* Mentor Ananya Guidance Card */}
            <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    A
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>Mentor Ananya</span>
                      <Badge className="bg-indigo-600 text-white text-[9px] font-mono">
                        SOC LEAD
                      </Badge>
                    </h4>
                    <span className="text-[10px] text-slate-500">Lead Incident & Threat Analyst</span>
                  </div>
                </div>
                <UserCheck className="w-4 h-4 text-indigo-600" />
              </div>

              <p className="text-xs text-slate-700 leading-relaxed italic bg-white p-2.5 rounded-xl border border-indigo-100 shadow-2xs">
                &ldquo;{mentorMessage}&rdquo;
              </p>
            </div>

            {/* Task 1: 5 Critical W's Form */}
            <div
              className={`p-4 rounded-xl border transition-all space-y-3 bg-white ${
                task1Done ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                      task1Done ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-slate-100 text-slate-600'
                    }`}
                  >
                    {task1Done ? <Check className="w-3.5 h-3.5" /> : '1'}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                    Task 1: Extract 5 Critical W&apos;s
                  </h4>
                </div>
                <Badge
                  variant="outline"
                  className={`text-[10px] font-mono font-bold ${
                    task1Done ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-500'
                  }`}
                >
                  {task1Done ? 'PASSED' : 'PENDING'}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase">Target User (Who):</label>
                  <input
                    type="text"
                    value={extractedUser}
                    onChange={(e) => setExtractedUser(e.target.value)}
                    placeholder="e.g. mchen"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:border-indigo-500 focus:bg-white text-xs outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase">Target Host (Where):</label>
                  <input
                    type="text"
                    value={extractedHost}
                    onChange={(e) => setExtractedHost(e.target.value)}
                    placeholder="e.g. BLR-BR-WS-04"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:border-indigo-500 focus:bg-white text-xs outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase">Attacker IP (From):</label>
                  <input
                    type="text"
                    value={extractedSrcIp}
                    onChange={(e) => setExtractedSrcIp(e.target.value)}
                    placeholder="e.g. 203.0.113.195"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:border-indigo-500 focus:bg-white text-xs outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase">Timestamp (When):</label>
                  <input
                    type="text"
                    value={extractedTimestamp}
                    onChange={(e) => setExtractedTimestamp(e.target.value)}
                    placeholder="03:42:18 IST"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:border-indigo-500 focus:bg-white text-xs outline-none"
                  />
                </div>
              </div>

              <Button
                size="sm"
                onClick={handleValidateTask1}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs h-8 rounded-lg"
              >
                Validate Core Entities
              </Button>
            </div>

            {/* Task 2: Attempt Count & Trigger Condition */}
            <div
              className={`p-4 rounded-xl border transition-all space-y-3 bg-white ${
                task2Done ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                      task2Done ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-slate-100 text-slate-600'
                    }`}
                  >
                    {task2Done ? <Check className="w-3.5 h-3.5" /> : '2'}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                    Task 2: Attempt Count & Trigger Reason
                  </h4>
                </div>
                <Badge
                  variant="outline"
                  className={`text-[10px] font-mono font-bold ${
                    task2Done ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-500'
                  }`}
                >
                  {task2Done ? 'PASSED' : 'PENDING'}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase">Failed Attempt Count:</label>
                  <input
                    type="text"
                    value={attemptCount}
                    onChange={(e) => setAttemptCount(e.target.value)}
                    placeholder="e.g. 47"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:border-indigo-500 focus:bg-white text-xs outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase">Windows Failure Code:</label>
                  <select
                    value={failureReason}
                    onChange={(e) => setFailureReason(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:border-indigo-500 focus:bg-white text-xs outline-none"
                  >
                    <option value="">-- Choose Reason --</option>
                    <option value="wrong_password">0xC000006A (Bad Password)</option>
                    <option value="account_locked">0xC0000234 (Account Locked)</option>
                    <option value="user_disabled">0xC000006E (User Disabled)</option>
                  </select>
                </div>
              </div>

              <Button
                size="sm"
                onClick={handleValidateTask2}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs h-8 rounded-lg"
              >
                Validate Trigger Threshold
              </Button>
            </div>

            {/* Task 3: Missing Context Selection */}
            <div
              className={`p-4 rounded-xl border transition-all space-y-3 bg-white ${
                task3Done ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                      task3Done ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-slate-100 text-slate-600'
                    }`}
                  >
                    {task3Done ? <Check className="w-3.5 h-3.5" /> : '3'}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                    Task 3: Identify 2 Missing Context Fields
                  </h4>
                </div>
                <Badge
                  variant="outline"
                  className={`text-[10px] font-mono font-bold ${
                    task3Done ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-500'
                  }`}
                >
                  {task3Done ? 'PASSED' : 'PENDING'}
                </Badge>
              </div>

              <p className="text-xs text-slate-500">
                Select the two crucial missing pieces of information needed for high-confidence triage:
              </p>

              <div className="space-y-1.5 text-xs font-mono">
                {[
                  {
                    id: 'ip_rep',
                    label: 'External IP Threat Intelligence (Tor/VPN/Proxy reputation for 203.0.113.195)',
                    valid: true,
                  },
                  {
                    id: 'user_geo',
                    label: 'User Travel / Impossible Geo-Velocity Baseline for Michael Chen',
                    valid: true,
                  },
                  {
                    id: 'cpu_fan',
                    label: 'Endpoint CPU Fan RPM and Motherboard temperature',
                    valid: false,
                  },
                  {
                    id: 'wallpaper',
                    label: 'Workstation wallpaper image file format',
                    valid: false,
                  },
                ].map((item) => {
                  const isChecked = missingContext.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleMissingContext(item.id)}
                      className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center gap-2 ${
                        isChecked
                          ? 'border-indigo-400 bg-indigo-50/70 text-indigo-900 font-semibold'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-indigo-600 text-white' : 'border border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Task 4: L1 Disposition & Escalation */}
            <div
              className={`p-4 rounded-xl border transition-all space-y-3 bg-white ${
                task4Done ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                      task4Done ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-slate-100 text-slate-600'
                    }`}
                  >
                    {task4Done ? <Check className="w-3.5 h-3.5" /> : '4'}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                    Task 4: Formulate L1 Disposition & Rationale
                  </h4>
                </div>
                <Badge
                  variant="outline"
                  className={`text-[10px] font-mono font-bold ${
                    task4Done ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-500'
                  }`}
                >
                  {task4Done ? 'PASSED' : 'PENDING'}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase">Triage Verdict:</label>
                  <select
                    value={triageVerdict}
                    onChange={(e) => setTriageVerdict(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:border-indigo-500 focus:bg-white text-xs outline-none"
                  >
                    <option value="">-- Choose Verdict --</option>
                    <option value="true_positive">True Positive (Active Attack)</option>
                    <option value="false_positive">False Positive (Benign Mistake)</option>
                    <option value="benign_test">Authorized Penetration Test</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase">Immediate Action:</label>
                  <select
                    value={recommendedAction}
                    onChange={(e) => setRecommendedAction(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:border-indigo-500 focus:bg-white text-xs outline-none"
                  >
                    <option value="">-- Recommended Action --</option>
                    <option value="isolate_and_reset">Isolate Host via EDR & Reset Credential</option>
                    <option value="ignore">Close Alert without Action</option>
                    <option value="monitor_24h">Monitor passively for 24 hours</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-bold uppercase">Audit Case Note Rationale:</label>
                <textarea
                  value={triageRationale}
                  onChange={(e) => setTriageRationale(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 font-mono text-xs focus:border-indigo-500 focus:bg-white outline-none resize-none leading-relaxed"
                />
              </div>

              <Button
                size="sm"
                onClick={handleValidateTask4}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs h-8 rounded-lg"
              >
                Approve Disposition & Lock Triage
              </Button>
            </div>

            {/* Final Submit Action */}
            <div className="pt-2">
              <Button
                type="button"
                disabled={!isAllDone}
                onClick={handleSubmitFinalReport}
                className={`w-full font-bold text-xs h-11 rounded-xl shadow-md gap-2 cursor-pointer transition-all ${
                  isAllDone
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Submit Lab Deliverable (+50 XP)</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              {!isAllDone && (
                <p className="text-[10px] text-center text-slate-400 mt-1.5 font-mono">
                  Complete all 4 triage verification steps to submit findings.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            FOOTER STATUS
        ========================================================================= */}
        <div className="px-6 py-2.5 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500 shrink-0 font-mono">
          <span>CDAC BENGALURU • SOC ANALYST L1 CURRICULUM</span>
          <span className="hidden sm:inline">Module 04: SOC Operations & Alert Triage • Hands-on Lab</span>
        </div>
      </div>

      {/* =========================================================================
          COMPLETION MODAL / VERDICT CERTIFICATE (WHITE THEME)
      ========================================================================= */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-white border border-emerald-300 rounded-2xl p-6 text-center space-y-5 shadow-2xl relative">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-inner">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <Badge className="bg-emerald-600 text-white font-mono text-[10px] font-bold">
                LAB-04 VERIFIED • 100% SCORE
              </Badge>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Alert Triage Worksheet Approved!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mentor Ananya has verified your alert extraction and incident escalation. You have demonstrated rigorous 5 W&apos;s forensic rigor and audit-grade documentation.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left font-mono text-xs space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Alert Ref:</span>
                <span className="text-indigo-700 font-bold">SEC-2026-0891</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target User:</span>
                <span className="text-slate-900 font-bold">Michael Chen (mchen)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target Host:</span>
                <span className="text-slate-900 font-bold">BLR-BR-WS-04</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Verdict:</span>
                <span className="text-rose-700 font-bold">True Positive (Escalated L2)</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200 text-emerald-700">
                <span>Reward:</span>
                <span className="font-bold">+50 XP Earned</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={() => {
                setShowCompletionModal(false);
                onClose();
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-10 rounded-xl shadow-xs"
            >
              Return to Curriculum
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
