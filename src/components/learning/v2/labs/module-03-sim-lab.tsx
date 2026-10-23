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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast-provider';
import { useProgressStore } from '@/store/progress-store';
import { sound } from '@/lib/sound-effects';

interface Module03SimLabProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleted?: () => void;
}

export function Module03SimLab({ isOpen, onClose, onCompleted }: Module03SimLabProps) {
  const { showToast } = useToast();
  const addXP = useProgressStore((state) => state.addXP);

  const [activeTab, setActiveTab] = useState<'assets' | 'threat-vuln' | 'controls' | 'cia'>('assets');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Task 1: Asset Selection (Learner must select the 2 critical assets)
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [task1Done, setTask1Done] = useState(false);

  // Task 2: Threat vs Vulnerability Matching
  const [selectedThreat, setSelectedThreat] = useState<string>('');
  const [selectedVuln, setSelectedVuln] = useState<string>('');
  const [task2Done, setTask2Done] = useState(false);

  // Task 3: Security Controls Classification
  const [controlPreventative, setControlPreventative] = useState<string>('');
  const [controlDetective, setControlDetective] = useState<string>('');
  const [controlCorrective, setControlCorrective] = useState<string>('');
  const [task3Done, setTask3Done] = useState(false);

  // Task 4: CIA Triad Impact & Rationale
  const [ciaConfidentiality, setCiaConfidentiality] = useState<string>('');
  const [ciaAvailability, setCiaAvailability] = useState<string>('');
  const [riskRationale, setRiskRationale] = useState<string>(
    'Critical exposure: Malicious credential spraying against unpatched portal risks catastrophic breach of customer PII and downtime during business operations.'
  );
  const [task4Done, setTask4Done] = useState(false);

  // Check overall lab completion
  const isAllDone = task1Done && task2Done && task3Done && task4Done;

  useEffect(() => {
    if (isAllDone) {
      sound.playSuccess();
      showToast({
        type: 'success',
        title: 'All Security Classification Tasks Satisfied! 🎉',
        description: 'You have completed the branch security risk assessment. Submit your deliverable below.',
      });
    }
  }, [isAllDone, showToast]);

  if (!isOpen) return null;

  // Handle Task 1 Asset Toggle
  const toggleAsset = (assetId: string) => {
    sound.playClick();
    setSelectedAssets((prev) => {
      const next = prev.includes(assetId) ? prev.filter((id) => id !== assetId) : [...prev, assetId];
      if (next.includes('customer-db') && next.includes('portal-server') && next.length === 2) {
        setTask1Done(true);
        sound.playSuccess();
        showToast({
          type: 'success',
          title: 'Task 1 Completed: 2 Key Assets Identified!',
          description: 'Customer Loan DB & Branch Portal Server accurately flagged.',
        });
      } else {
        setTask1Done(false);
      }
      return next;
    });
  };

  // Handle Task 2 Verification
  const verifyThreatVuln = () => {
    sound.playClick();
    if (selectedThreat === 'brute-force' && selectedVuln === 'unpatched-no-mfa') {
      setTask2Done(true);
      sound.playSuccess();
      showToast({
        type: 'success',
        title: 'Task 2 Completed: Threat & Vulnerability Matched!',
        description: 'Accurately separated external danger from internal weakness.',
      });
    } else {
      showToast({
        type: 'error',
        title: 'Classification Check',
        description: 'Remember: Threat is the active action (malware password spraying), Vulnerability is the system flaw (unpatched software & missing MFA).',
      });
    }
  };

  // Handle Task 3 Verification
  const verifyControls = () => {
    sound.playClick();
    if (
      controlPreventative === 'mfa' &&
      controlDetective === 'siem-alerts' &&
      controlCorrective === 'isolate-patch'
    ) {
      setTask3Done(true);
      sound.playSuccess();
      showToast({
        type: 'success',
        title: 'Task 3 Completed: Security Controls Categorized!',
        description: 'Preventative, Detective, and Corrective controls correctly aligned.',
      });
    } else {
      showToast({
        type: 'error',
        title: 'Controls Check',
        description: 'Ensure: Preventative = MFA & Rate Limiting, Detective = SIEM Log Alerts, Corrective = Isolate Host & Patch.',
      });
    }
  };

  // Handle Task 4 Verification
  const verifyCIA = () => {
    sound.playClick();
    if (ciaConfidentiality === 'high' && ciaAvailability === 'high' && riskRationale.trim().length > 20) {
      setTask4Done(true);
      sound.playSuccess();
      showToast({
        type: 'success',
        title: 'Task 4 Completed: CIA Triad & Rationale Approved!',
        description: 'High impact on Confidentiality and Availability confirmed with solid rationale.',
      });
    } else {
      showToast({
        type: 'error',
        title: 'Impact Assessment Check',
        description: 'Confidentiality (PII loss) is HIGH, and Availability (service denial) is HIGH. Provide your written rationale.',
      });
    }
  };

  const handleResetLab = () => {
    sound.playClick();
    setSelectedAssets([]);
    setTask1Done(false);
    setSelectedThreat('');
    setSelectedVuln('');
    setTask2Done(false);
    setControlPreventative('');
    setControlDetective('');
    setControlCorrective('');
    setTask3Done(false);
    setCiaConfidentiality('');
    setCiaAvailability('');
    setTask4Done(false);
    setActiveTab('assets');
  };

  const handleSubmitFinalReport = () => {
    sound.playSuccess();
    addXP(50);

    // Save in localStorage so LabsV2Modal recognizes it as completed
    try {
      const saved = localStorage.getItem('soc_v2_completed_lab_tasks');
      const parsed = saved ? JSON.parse(saved) : {};
      parsed['LAB-03-task-0'] = true;
      parsed['LAB-03-task-1'] = true;
      parsed['LAB-03-task-2'] = true;
      parsed['LAB-03-task-3'] = true;
      localStorage.setItem('soc_v2_completed_lab_tasks', JSON.stringify(parsed));
    } catch (e) {
      // ignore
    }

    setShowCompletionModal(true);
    if (onCompleted) onCompleted();
  };

  // Mentor guidance calculation
  let mentorMessage =
    'Welcome! In this lab, we evaluate Incident 2026-B3 at our branch. Start by identifying the 2 most critical business assets at stake.';
  if (task1Done && !task2Done) {
    mentorMessage =
      'Assets verified! Now distinguish between the Threat (the external harmful event) and the Vulnerability (the internal flaw).';
  } else if (task1Done && task2Done && !task3Done) {
    mentorMessage =
      'Spot on! Now select the appropriate security controls: Preventative (block attack), Detective (spot attack), and Corrective (remediate aftermath).';
  } else if (task1Done && task2Done && task3Done && !task4Done) {
    mentorMessage =
      'Controls aligned! Finally, evaluate the CIA Triad impact and confirm your risk rationale statement.';
  } else if (isAllDone) {
    mentorMessage =
      'Outstanding work! All 4 classification tasks are complete. Click "Submit Lab Deliverable" to submit your risk evaluation to CDAC Bengaluru.';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className={`relative w-full ${
          isFullscreen ? 'h-full max-h-none rounded-none' : 'max-w-6xl h-[92vh] max-h-[900px] rounded-2xl'
        } flex flex-col bg-[#050b1d] border border-slate-800 shadow-2xl overflow-hidden transition-all`}
      >
        {/* =========================================================================
            HEADER BAR
        ========================================================================= */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-[#071026]/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-white tracking-tight flex items-center gap-2">
                  <span>LAB-03: Classify a Branch Security Scenario</span>
                  <Badge className="bg-amber-600 text-white font-mono text-[10px] uppercase">
                    Module 03 Lab
                  </Badge>
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Scenario: <strong className="text-slate-200">Incident 2026-B3</strong> • Mentor:{' '}
                <strong className="text-amber-300">Ananya</strong> • 45m Practical Session
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetLab}
              className="text-xs h-8 px-2.5 gap-1.5 border-slate-700 bg-slate-900/60 text-slate-300 hover:text-white"
              title="Reset Lab Progress"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="h-8 w-8 text-slate-400 hover:text-white"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 text-slate-400 hover:text-white"
              title="Close Lab"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* =========================================================================
            INCIDENT BRIEFING ACCORDION BANNER
        ========================================================================= */}
        <div className="px-5 py-2.5 border-b border-slate-800 bg-[#0c152e]/80 text-xs font-mono shrink-0">
          <div className="flex items-center gap-2 text-amber-300 font-bold mb-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>INCIDENT BRIEFING: UNPROTECTED BRANCH PORTAL & PASSWORD SPRAYING</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
            &ldquo;An unpatched branch server running an outdated customer loan portal service was discovered exposed to the local network segment without Multi-Factor Authentication (MFA). A contractor laptop infected with malware attempted brute-force password spraying against the portal administrator account, threatening customer financial records and system availability during banking hours.&rdquo;
          </p>
        </div>

        {/* =========================================================================
            NAVIGATION TABS (ASSETS -> THREAT/VULN -> CONTROLS -> CIA)
        ========================================================================= */}
        <div className="px-5 py-2 border-b border-slate-800/80 bg-[#091432]/60 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 font-mono text-xs overflow-x-auto py-1">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveTab('assets');
              }}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                activeTab === 'assets'
                  ? 'bg-amber-600 text-white border-amber-400 shadow-xs'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>1. Assets</span>
              {task1Done && <Check className="w-3 h-3 text-emerald-300" />}
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveTab('threat-vuln');
              }}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                activeTab === 'threat-vuln'
                  ? 'bg-amber-600 text-white border-amber-400 shadow-xs'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>2. Threat vs Vuln</span>
              {task2Done && <Check className="w-3 h-3 text-emerald-300" />}
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveTab('controls');
              }}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                activeTab === 'controls'
                  ? 'bg-amber-600 text-white border-amber-400 shadow-xs'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>3. Controls</span>
              {task3Done && <Check className="w-3 h-3 text-emerald-300" />}
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveTab('cia');
              }}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                activeTab === 'cia'
                  ? 'bg-amber-600 text-white border-amber-400 shadow-xs'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>4. CIA & Rationale</span>
              {task4Done && <Check className="w-3 h-3 text-emerald-300" />}
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <span className="text-slate-400 text-xs">Verified:</span>
            <Badge
              variant="outline"
              className={`text-xs font-mono font-bold ${
                isAllDone
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                  : 'border-amber-500/30 bg-amber-500/10 text-amber-300'
              }`}
            >
              {(task1Done ? 1 : 0) + (task2Done ? 1 : 0) + (task3Done ? 1 : 0) + (task4Done ? 1 : 0)} / 4 Steps
            </Badge>
          </div>
        </div>

        {/* =========================================================================
            MAIN SPLIT VIEW: STAGE (LEFT 7 COLS) + TASKS & MENTOR (RIGHT 5 COLS)
        ========================================================================= */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* ==================== LEFT: INTERACTIVE STAGE (7 COLS) ==================== */}
          <div className="lg:col-span-7 flex flex-col border-r border-slate-800 bg-[#020612] min-h-0 overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* ================= TAB 1: ASSET IDENTIFICATION ================= */}
            {activeTab === 'assets' && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-400" />
                    Task 1: Identify 2 Primary Business Assets at Risk
                  </h4>
                  <p className="text-xs text-slate-400">
                    Click to select the two high-value enterprise assets threatened by this scenario:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {[
                    {
                      id: 'customer-db',
                      title: 'Customer Loan Database & PII',
                      category: 'Data Asset (Tier 1 High Value)',
                      desc: 'Contains account numbers, pan cards, financial credit ratings, and personal identities.',
                      isTarget: true,
                    },
                    {
                      id: 'portal-server',
                      title: 'Branch Loan Portal Server',
                      category: 'Compute Host Asset (Tier 1)',
                      desc: 'Runs the customer loan service. Outage stops branch banking operations.',
                      isTarget: true,
                    },
                    {
                      id: 'coffee-maker',
                      title: 'Office Breakroom Smart Coffee Maker',
                      category: 'IoT Peripheral (Tier 3)',
                      desc: 'Automates breakroom espresso refills. No sensitive data access.',
                      isTarget: false,
                    },
                    {
                      id: 'guest-printer',
                      title: 'Breakroom Guest Wi-Fi Printer',
                      category: 'Unmanaged Device (Tier 3)',
                      desc: 'Isolated on isolated guest Wi-Fi subnet with no route to branch data.',
                      isTarget: false,
                    },
                  ].map((asset) => {
                    const isSelected = selectedAssets.includes(asset.id);
                    return (
                      <div
                        key={asset.id}
                        onClick={() => toggleAsset(asset.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                          isSelected
                            ? 'border-amber-500 bg-amber-500/15 ring-1 ring-amber-500/40'
                            : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="outline"
                            className={`text-[10px] font-mono ${
                              isSelected ? 'border-amber-400 text-amber-300' : 'border-slate-700 text-slate-400'
                            }`}
                          >
                            {asset.category}
                          </Badge>
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center ${
                              isSelected ? 'bg-amber-500 text-slate-950' : 'border border-slate-700 bg-slate-800'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-bold text-xs sm:text-sm text-white">{asset.title}</h5>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{asset.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
                  <span>Selected Assets: {selectedAssets.length} / 2</span>
                  {task1Done && (
                    <Button
                      size="sm"
                      onClick={() => {
                        sound.playClick();
                        setActiveTab('threat-vuln');
                      }}
                      className="h-7 text-xs bg-amber-600 hover:bg-amber-500 text-white"
                    >
                      Next: Threat vs Vulnerability
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* ================= TAB 2: THREAT VS VULNERABILITY ================= */}
            {activeTab === 'threat-vuln' && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    Task 2: Distinguish Threat from Vulnerability
                  </h4>
                  <p className="text-xs text-slate-400">
                    Match the external attacker event (Threat) to the underlying system weakness (Vulnerability):
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {/* Threat Selection */}
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase font-mono">
                      <Flame className="w-4 h-4" />
                      <span>Select the Active Threat:</span>
                    </div>

                    <div className="space-y-2">
                      {[
                        {
                          id: 'brute-force',
                          text: 'Contractor malware executing credential password spraying against portal administrator',
                          correct: true,
                        },
                        {
                          id: 'ddos-flooding',
                          text: 'Volumetric SYN flood saturating branch ISP internet fiber circuit',
                          correct: false,
                        },
                      ].map((t) => (
                        <div
                          key={t.id}
                          onClick={() => {
                            sound.playClick();
                            setSelectedThreat(t.id);
                          }}
                          className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                            selectedThreat === t.id
                              ? 'border-rose-500 bg-rose-500/20 text-white font-semibold'
                              : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {t.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vulnerability Selection */}
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase font-mono">
                      <Lock className="w-4 h-4" />
                      <span>Select the System Vulnerability:</span>
                    </div>

                    <div className="space-y-2">
                      {[
                        {
                          id: 'unpatched-no-mfa',
                          text: 'Outdated portal software version and absence of Multi-Factor Authentication (MFA)',
                          correct: true,
                        },
                        {
                          id: 'weak-cable',
                          text: 'Unshielded twisted-pair Ethernet cables in branch ceiling ducts',
                          correct: false,
                        },
                      ].map((v) => (
                        <div
                          key={v.id}
                          onClick={() => {
                            sound.playClick();
                            setSelectedVuln(v.id);
                          }}
                          className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                            selectedVuln === v.id
                              ? 'border-amber-500 bg-amber-500/20 text-white font-semibold'
                              : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {v.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <Button
                    size="sm"
                    onClick={verifyThreatVuln}
                    className="bg-amber-600 hover:bg-amber-500 text-white text-xs h-9 px-4 font-bold"
                  >
                    Verify Threat & Vulnerability Match
                  </Button>

                  {task2Done && (
                    <Button
                      size="sm"
                      onClick={() => {
                        sound.playClick();
                        setActiveTab('controls');
                      }}
                      className="h-9 text-xs bg-slate-800 hover:bg-slate-700 text-white"
                    >
                      Next: Security Controls
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* ================= TAB 3: CONTROLS CLASSIFICATION ================= */}
            {activeTab === 'controls' && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    Task 3: Categorize Security Controls
                  </h4>
                  <p className="text-xs text-slate-400">
                    Assign the appropriate mitigation mechanism to each control category:
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  {/* Preventative */}
                  <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-blue-300 font-mono uppercase">
                        1. Preventative Control (Stops attack before entry)
                      </span>
                      {controlPreventative === 'mfa' && <Check className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <select
                      value={controlPreventative}
                      onChange={(e) => setControlPreventative(e.target.value)}
                      className="w-full bg-[#03091e] border border-slate-700 text-xs text-white rounded-lg p-2 font-mono"
                    >
                      <option value="">-- Choose Preventative Control --</option>
                      <option value="mfa">Enforce MFA & Account Lockout Rate Limiting (Stops Spraying)</option>
                      <option value="siem">Review audit logs at end of week</option>
                      <option value="backup">Restore full server from Sunday offline tape backup</option>
                    </select>
                  </div>

                  {/* Detective */}
                  <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-amber-300 font-mono uppercase">
                        2. Detective Control (Identifies attack in progress)
                      </span>
                      {controlDetective === 'siem-alerts' && <Check className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <select
                      value={controlDetective}
                      onChange={(e) => setControlDetective(e.target.value)}
                      className="w-full bg-[#03091e] border border-slate-700 text-xs text-white rounded-lg p-2 font-mono"
                    >
                      <option value="">-- Choose Detective Control --</option>
                      <option value="siem-alerts">SIEM Correlation Rule: Alert on &gt;10 Failed Logons in 60s (Event 4625)</option>
                      <option value="vpn">Install commercial VPN software on phones</option>
                      <option value="shred">Shred discarded paper invoices</option>
                    </select>
                  </div>

                  {/* Corrective */}
                  <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-emerald-300 font-mono uppercase">
                        3. Corrective Control (Restores system and stops spread)
                      </span>
                      {controlCorrective === 'isolate-patch' && <Check className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <select
                      value={controlCorrective}
                      onChange={(e) => setControlCorrective(e.target.value)}
                      className="w-full bg-[#03091e] border border-slate-700 text-xs text-white rounded-lg p-2 font-mono"
                    >
                      <option value="">-- Choose Corrective Control --</option>
                      <option value="isolate-patch">Isolate infected contractor laptop port & apply vendor security patch</option>
                      <option value="reboot">Reboot server every morning at 6 AM</option>
                      <option value="notify">Send email newsletter to all employees</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <Button
                    size="sm"
                    onClick={verifyControls}
                    className="bg-amber-600 hover:bg-amber-500 text-white text-xs h-9 px-4 font-bold"
                  >
                    Verify Security Controls
                  </Button>

                  {task3Done && (
                    <Button
                      size="sm"
                      onClick={() => {
                        sound.playClick();
                        setActiveTab('cia');
                      }}
                      className="h-9 text-xs bg-slate-800 hover:bg-slate-700 text-white"
                    >
                      Next: CIA & Rationale
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* ================= TAB 4: CIA TRIAD & RATIONALE ================= */}
            {activeTab === 'cia' && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-amber-400" />
                    Task 4: CIA Triad Impact & Risk Rationale
                  </h4>
                  <p className="text-xs text-slate-400">
                    Evaluate severity impact on the CIA Triad and finalize the risk rationale:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Confidentiality Impact */}
                  <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
                    <span className="text-xs font-bold text-white block">
                      Confidentiality Impact (Customer Loan Data Exposure):
                    </span>
                    <div className="flex gap-2">
                      {['low', 'medium', 'high'].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            setCiaConfidentiality(lvl);
                          }}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                            ciaConfidentiality === lvl
                              ? lvl === 'high'
                                ? 'bg-rose-600 text-white'
                                : 'bg-slate-700 text-white'
                              : 'bg-slate-950 text-slate-400 border border-slate-800'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Availability Impact */}
                  <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
                    <span className="text-xs font-bold text-white block">
                      Availability Impact (Branch Portal Denial of Service):
                    </span>
                    <div className="flex gap-2">
                      {['low', 'medium', 'high'].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            setCiaAvailability(lvl);
                          }}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                            ciaAvailability === lvl
                              ? lvl === 'high'
                                ? 'bg-rose-600 text-white'
                                : 'bg-slate-700 text-white'
                              : 'bg-slate-950 text-slate-400 border border-slate-800'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Risk Rationale Text Area */}
                <div className="space-y-2 pt-1">
                  <label className="text-[11px] font-bold font-mono text-slate-300 uppercase tracking-wider block">
                    One-Sentence Risk Rationale (Evidence Deliverable):
                  </label>
                  <textarea
                    value={riskRationale}
                    onChange={(e) => setRiskRationale(e.target.value)}
                    rows={3}
                    className="w-full text-xs font-mono bg-[#03091e] border border-slate-700 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed resize-none"
                    placeholder="State the core risk and impact..."
                  />
                </div>

                <Button
                  size="sm"
                  onClick={verifyCIA}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs h-9 rounded-xl"
                >
                  Verify Impact & Lock Deliverable
                </Button>
              </div>
            )}
          </div>

          {/* ==================== RIGHT: TASKS & MENTOR ANANYA (5 COLS) ==================== */}
          <div className="lg:col-span-5 flex flex-col bg-[#050b1d] overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* Mentor Ananya Guidance Card */}
            <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-xs">
                    A
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Mentor Ananya</span>
                      <Badge className="bg-amber-600/30 text-amber-300 border border-amber-500/40 text-[9px] font-mono">
                        SOC LEAD
                      </Badge>
                    </h4>
                    <span className="text-[10px] text-slate-400">Senior Threat & Incident Analyst</span>
                  </div>
                </div>
                <UserCheck className="w-4 h-4 text-amber-400" />
              </div>

              <p className="text-xs text-slate-200 leading-relaxed italic bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80">
                &ldquo;{mentorMessage}&rdquo;
              </p>
            </div>

            {/* Actionable Tasks Checklist */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  Classification Tasks Checklist
                </h4>
                <span className="text-[10px] font-mono text-slate-400">Live Auto-Check</span>
              </div>

              {/* Task 1 */}
              <div
                className={`p-3.5 rounded-xl border transition-all space-y-2 ${
                  task1Done
                    ? 'border-emerald-500/40 bg-emerald-950/15 text-emerald-100'
                    : 'border-slate-800 bg-[#091432]/40 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                        task1Done
                          ? 'bg-emerald-500 text-slate-950'
                          : 'border border-slate-700 bg-slate-800/50 text-slate-400'
                      }`}
                    >
                      {task1Done ? <Check className="w-3.5 h-3.5" /> : '1'}
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-white">
                      Identify 2 Key Assets
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-mono ${
                      task1Done
                        ? 'border-emerald-500/50 text-emerald-300'
                        : 'border-slate-700 text-slate-500'
                    }`}
                  >
                    {task1Done ? 'PASSED' : 'PENDING'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 pl-7">
                  Flag Customer Loan Database & Portal Server as target assets.
                </p>
                {task1Done && (
                  <div className="pl-7 text-[11px] font-mono text-emerald-400">
                    ✓ Customer Database & Loan Portal Server flagged
                  </div>
                )}
              </div>

              {/* Task 2 */}
              <div
                className={`p-3.5 rounded-xl border transition-all space-y-2 ${
                  task2Done
                    ? 'border-emerald-500/40 bg-emerald-950/15 text-emerald-100'
                    : 'border-slate-800 bg-[#091432]/40 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                        task2Done
                          ? 'bg-emerald-500 text-slate-950'
                          : 'border border-slate-700 bg-slate-800/50 text-slate-400'
                      }`}
                    >
                      {task2Done ? <Check className="w-3.5 h-3.5" /> : '2'}
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-white">
                      Match Threat & Vulnerability
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-mono ${
                      task2Done
                        ? 'border-emerald-500/50 text-emerald-300'
                        : 'border-slate-700 text-slate-500'
                    }`}
                  >
                    {task2Done ? 'PASSED' : 'PENDING'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 pl-7">
                  Disambiguate credential spraying threat from missing MFA vulnerability.
                </p>
                {task2Done && (
                  <div className="pl-7 text-[11px] font-mono text-emerald-400">
                    ✓ Threat: Password Spraying • Vuln: Unpatched / No MFA
                  </div>
                )}
              </div>

              {/* Task 3 */}
              <div
                className={`p-3.5 rounded-xl border transition-all space-y-2 ${
                  task3Done
                    ? 'border-emerald-500/40 bg-emerald-950/15 text-emerald-100'
                    : 'border-slate-800 bg-[#091432]/40 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                        task3Done
                          ? 'bg-emerald-500 text-slate-950'
                          : 'border border-slate-700 bg-slate-800/50 text-slate-400'
                      }`}
                    >
                      {task3Done ? <Check className="w-3.5 h-3.5" /> : '3'}
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-white">
                      Choose Security Controls
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-mono ${
                      task3Done
                        ? 'border-emerald-500/50 text-emerald-300'
                        : 'border-slate-700 text-slate-500'
                    }`}
                  >
                    {task3Done ? 'PASSED' : 'PENDING'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 pl-7">
                  Align preventative, detective, and corrective countermeasures.
                </p>
                {task3Done && (
                  <div className="pl-7 text-[11px] font-mono text-emerald-400">
                    ✓ MFA (Prev) • SIEM Alert (Det) • Isolate/Patch (Corr)
                  </div>
                )}
              </div>

              {/* Task 4 */}
              <div
                className={`p-3.5 rounded-xl border transition-all space-y-2 ${
                  task4Done
                    ? 'border-emerald-500/40 bg-emerald-950/15 text-emerald-100'
                    : 'border-slate-800 bg-[#091432]/40 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                        task4Done
                          ? 'bg-emerald-500 text-slate-950'
                          : 'border border-slate-700 bg-slate-800/50 text-slate-400'
                      }`}
                    >
                      {task4Done ? <Check className="w-3.5 h-3.5" /> : '4'}
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-white">
                      Write Risk Rationale & CIA Impact
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-mono ${
                      task4Done
                        ? 'border-emerald-500/50 text-emerald-300'
                        : 'border-slate-700 text-slate-500'
                    }`}
                  >
                    {task4Done ? 'PASSED' : 'PENDING'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 pl-7">
                  Confirm high impact on Confidentiality and Availability with written rationale.
                </p>
                {task4Done && (
                  <div className="pl-7 text-[11px] font-mono text-emerald-400">
                    ✓ High Confidentiality & Availability impact locked
                  </div>
                )}
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <Button
                type="button"
                disabled={!isAllDone}
                onClick={handleSubmitFinalReport}
                className={`w-full font-bold text-xs h-11 rounded-xl shadow-lg gap-2 cursor-pointer transition-all ${
                  isAllDone
                    ? 'bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Submit Lab Deliverable (+50 XP)</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              {!isAllDone && (
                <p className="text-[10px] text-center text-slate-500 mt-1.5 font-mono">
                  Complete all 4 tasks across tabs to unlock submission.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            FOOTER STATUS
        ========================================================================= */}
        <div className="px-5 py-2.5 border-t border-slate-800 bg-[#071026] flex items-center justify-between text-xs text-slate-400 shrink-0 font-mono">
          <span>CDAC BENGALURU • SOC ANALYST L1 CURRICULUM</span>
          <span className="hidden sm:inline">Module 03: Cybersecurity Fundamentals • Hands-on Lab</span>
        </div>
      </div>

      {/* =========================================================================
          COMPLETION MODAL / VERDICT CERTIFICATE
      ========================================================================= */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-[#070f26] border-2 border-emerald-500/40 rounded-2xl p-6 text-center space-y-5 shadow-2xl relative">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-inner">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <Badge className="bg-emerald-600 text-white font-mono text-[10px]">
                LAB-03 VERIFIED • 100% SCORE
              </Badge>
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Security Scenario Classified!
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mentor Ananya has approved your threat-vulnerability mapping and CIA impact rationale. You have demonstrated rigorous analytical reasoning for L1 SOC triage.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-left font-mono text-xs space-y-1 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Assets:</span>
                <span className="text-emerald-300 font-bold">Customer DB + Portal Host</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Threat / Vuln:</span>
                <span className="text-emerald-300 font-bold">Password Spraying / No MFA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Controls:</span>
                <span className="text-emerald-300 font-bold">MFA, SIEM Alert, Patch</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">CIA Impact:</span>
                <span className="text-emerald-300 font-bold">High C & High A</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-800 text-amber-300">
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
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-10 rounded-xl"
            >
              Return to Curriculum
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
