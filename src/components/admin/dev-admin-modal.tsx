'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sliders,
  RotateCcw,
  Lock,
  Unlock,
  FlaskConical,
  Award,
  Layers,
  BookOpen,
  AlertTriangle,
  Check,
  Power,
  RefreshCw,
  FolderTree,
} from 'lucide-react';
import { useAdminConfigStore } from '@/store/admin-config-store';
import { useProgressStore } from '@/store/progress-store';
import { useToast } from '@/components/ui/toast-provider';

interface DevAdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MODULE_LIST = [
  { id: '00', title: 'Course Orientation' },
  { id: '01', title: 'Computer Fundamentals' },
  { id: '02', title: 'Networking Fundamentals' },
  { id: '03', title: 'Cybersecurity Fundamentals' },
  { id: '04', title: 'SOC Operations' },
  { id: '05', title: 'SIEM' },
  { id: '06', title: 'Log & Event Analysis' },
  { id: '07', title: 'Windows & Linux Monitoring' },
  { id: '08', title: 'Network Security Monitoring' },
  { id: '09', title: 'EDR & Endpoint Monitoring' },
  { id: '10', title: 'Detection Ecosystem' },
  { id: '11', title: 'Identity & Threat Intel' },
  { id: '12', title: 'SOAR & Automation' },
  { id: '13', title: 'MITRE ATT&CK' },
  { id: '14', title: 'Incident Response' },
  { id: '15', title: 'OT & ICS Security' },
  { id: '16', title: 'Investigation Scenarios' },
  { id: '17', title: 'Final L1 Assessment' },
];

const MODULE_04_UNITS_LIST = [
  { id: 'unit-1', unitNumber: 1, title: 'Unit 1: SOC Architecture', topicCount: 4 },
  { id: 'unit-2', unitNumber: 2, title: 'Unit 2: Alerts & Events', topicCount: 2 },
  { id: 'unit-3', unitNumber: 3, title: 'Unit 3: Alert Triage', topicCount: 2 },
  { id: 'unit-4', unitNumber: 4, title: 'Unit 4: False Positives', topicCount: 2 },
  { id: 'unit-5', unitNumber: 5, title: 'Unit 5: Severity', topicCount: 2 },
  { id: 'unit-6', unitNumber: 6, title: 'Unit 6: Escalation', topicCount: 2 },
  { id: 'unit-7', unitNumber: 7, title: 'Unit 7: SOC Documentation', topicCount: 2 },
];

const MODULE_04_TOPICS = [
  { id: 'topic-1-1', unit: 'Unit 1', title: 'People' },
  { id: 'topic-1-2', unit: 'Unit 1', title: 'Process' },
  { id: 'topic-1-3', unit: 'Unit 1', title: 'Technology' },
  { id: 'topic-1-4', unit: 'Unit 1', title: 'Data Flow & [Demo] SOC Architecture' },
  { id: 'topic-2-1', unit: 'Unit 2', title: 'Events vs. Alerts' },
  { id: 'topic-2-2', unit: 'Unit 2', title: 'Incidents & Cases' },
  { id: 'topic-3-1', unit: 'Unit 3', title: 'Understand Alert & Identify Entities' },
  { id: 'topic-3-2', unit: 'Unit 3', title: 'Check Evidence & [Lab] Basic Alert Triage' },
  { id: 'topic-4-1', unit: 'Unit 4', title: 'Expected & Benign Activity' },
  { id: 'topic-4-2', unit: 'Unit 4', title: 'Detection Errors & [Lab] False-Positive Identification' },
  { id: 'topic-5-1', unit: 'Unit 5', title: 'Severity Scale: Low to Critical' },
  { id: 'topic-5-2', unit: 'Unit 5', title: 'Impact, Confidence & [Lab] Severity Classification' },
  { id: 'topic-6-1', unit: 'Unit 6', title: 'Tiered Escalation: L1 → L2 and L2 → L3' },
  { id: 'topic-6-2', unit: 'Unit 6', title: 'Specialist & Management Escalation' },
  { id: 'topic-7-1', unit: 'Unit 7', title: 'The 5 Pillars of Documentation' },
  { id: 'topic-7-2', unit: 'Unit 7', title: '[Lab] Create Incident Ticket' },
];

const ASSESSMENTS = [
  { id: 'unit-1-assessment', title: 'Topic 1 Assessment: SOC Architecture' },
  { id: 'unit-2-assessment', title: 'Topic 2 Assessment: Alerts & Events' },
  { id: 'unit-3-assessment', title: 'Topic 3 Assessment: Alert Triage' },
  { id: 'unit-4-assessment', title: 'Topic 4 Assessment: False Positives' },
  { id: 'unit-5-assessment', title: 'Topic 5 Assessment: Severity Classification' },
  { id: 'unit-6-assessment', title: 'Topic 6 Assessment: Escalation Procedures' },
  { id: 'unit-7-assessment', title: 'Topic 7 Assessment: SOC Documentation' },
  { id: 'module-04-assessment', title: '[Assess] SOC Operations Comprehensive Assessment' },
];

export function DevAdminModal({ open, onOpenChange }: DevAdminModalProps) {
  const [activeTab, setActiveTab] = useState<'modules' | 'units' | 'topics' | 'labs' | 'assessments' | 'xp' | 'reset'>('modules');
  const { showToast } = useToast();

  const {
    disabledModules,
    toggleModule,
    resetModule,
    disabledUnits,
    toggleUnit,
    resetUnit,
    disabledTopics,
    toggleTopic,
    resetTopic,
    labsEnabled,
    toggleLabs,
    unlockedAssessments,
    toggleAssessmentLock,
    resetAssessment,
    xpSystemEnabled,
    toggleXpSystem,
    freeNavigationEnabled,
    toggleFreeNavigation,
    globalReset,
  } = useAdminConfigStore();

  const resetProgressStore = useProgressStore((state) => state.resetProgress);

  const handleGlobalReset = () => {
    if (confirm('Are you sure you want to perform a Global Development Reset? This will clear all topic completions, module progress, and restore defaults.')) {
      globalReset();
      resetProgressStore();
      showToast({
        type: 'success',
        title: 'Platform Reset Complete',
        description: 'All module states, completions, and local configurations have been reset.',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col p-0 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                  Development Admin Panel
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-300 text-[10px]">
                    DEV PHASE
                  </Badge>
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                  Direct controls for modules, units, topics, labs, assessments, XP rewards, and global state.
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleGlobalReset}
              className="gap-1.5 text-xs font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Global Reset
            </Button>
          </div>

          {/* Master Unlock & Free Navigation Banner */}
          <div className="mt-4 p-3.5 rounded-xl border border-amber-300 bg-amber-50/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                freeNavigationEnabled ? 'bg-emerald-600 text-white shadow-xs' : 'bg-amber-200 text-amber-900'
              }`}>
                <Unlock className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-foreground">
                    Master Unlock & Free Navigation Mode
                  </span>
                  <Badge className={freeNavigationEnabled ? 'bg-emerald-600 text-white text-[10px]' : 'bg-slate-200 text-slate-700 text-[10px]'}>
                    {freeNavigationEnabled ? 'ENABLED (GOD MODE)' : 'OFF (SEQUENTIAL)'}
                  </Badge>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Unlocks all 18 modules, units and topics. <strong>Next Topic button works freely</strong> with no topic completion required!
                </p>
              </div>
            </div>

            <Button
              variant={freeNavigationEnabled ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                toggleFreeNavigation();
                const nextState = !freeNavigationEnabled;
                showToast({
                  type: nextState ? 'success' : 'info',
                  title: nextState ? 'Free Navigation Enabled 🔓' : 'Sequential Mode Restored 🔒',
                  description: nextState
                    ? 'All topics unlocked! Next Topic button now advances freely without completion.'
                    : 'Sequential locks re-enabled.',
                });
              }}
              className={`text-xs font-bold gap-1.5 h-8 shrink-0 ${
                freeNavigationEnabled
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                  : 'border-amber-400 bg-amber-100 hover:bg-amber-200 text-amber-900'
              }`}
            >
              <Power className="w-3 h-3" />
              <span>{freeNavigationEnabled ? 'Disable Free Navigation' : 'Enable Free Navigation (Unlock All)'}</span>
            </Button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 mt-6 border-b overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setActiveTab('modules')}
              className={`px-3 py-1.5 rounded-t-md font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'modules' ? 'border-b-2 border-primary text-primary bg-background' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Modules
            </button>
            <button
              onClick={() => setActiveTab('units')}
              className={`px-3 py-1.5 rounded-t-md font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'units' ? 'border-b-2 border-primary text-primary bg-background' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <FolderTree className="w-3.5 h-3.5" />
              Units ({MODULE_04_UNITS_LIST.length - disabledUnits.length}/{MODULE_04_UNITS_LIST.length})
            </button>
            <button
              onClick={() => setActiveTab('topics')}
              className={`px-3 py-1.5 rounded-t-md font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'topics' ? 'border-b-2 border-primary text-primary bg-background' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Topics
            </button>
            <button
              onClick={() => setActiveTab('labs')}
              className={`px-3 py-1.5 rounded-t-md font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'labs' ? 'border-b-2 border-primary text-primary bg-background' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              Labs ({labsEnabled ? 'ON' : 'OFF'})
            </button>
            <button
              onClick={() => setActiveTab('assessments')}
              className={`px-3 py-1.5 rounded-t-md font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'assessments' ? 'border-b-2 border-primary text-primary bg-background' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              Assessments
            </button>
            <button
              onClick={() => setActiveTab('xp')}
              className={`px-3 py-1.5 rounded-t-md font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'xp' ? 'border-b-2 border-primary text-primary bg-background' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              XP System ({xpSystemEnabled ? 'ON' : 'OFF'})
            </button>
            <button
              onClick={() => setActiveTab('reset')}
              className={`px-3 py-1.5 rounded-t-md font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'reset' ? 'border-b-2 border-destructive text-destructive bg-background' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              System Reset
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* TAB: MODULES */}
          {activeTab === 'modules' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold">Module Availability & Progress Reset</h4>
                  <p className="text-xs text-muted-foreground">Toggle module access or reset specific module states.</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {MODULE_LIST.length - disabledModules.length} Active / {disabledModules.length} Disabled
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MODULE_LIST.map((mod) => {
                  const isDisabled = disabledModules.includes(mod.id);
                  return (
                    <div
                      key={mod.id}
                      className={`p-3.5 rounded-lg border flex items-center justify-between transition-colors ${
                        isDisabled ? 'bg-muted/40 opacity-75' : 'bg-card hover:border-primary/40'
                      }`}
                    >
                      <div className="min-w-0 flex-1 pr-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-primary">M{mod.id}</span>
                          <span className="text-sm font-semibold truncate">{mod.title}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Status: <span className={isDisabled ? 'text-rose-600 font-medium' : 'text-emerald-600 font-medium'}>{isDisabled ? 'Disabled' : 'Active'}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant={isDisabled ? 'default' : 'outline'}
                          size="sm"
                          className="h-7 text-xs px-2.5"
                          onClick={() => {
                            toggleModule(mod.id);
                            showToast({
                              type: isDisabled ? 'success' : 'warning',
                              title: `Module ${mod.id} ${isDisabled ? 'Enabled' : 'Disabled'}`,
                            });
                          }}
                        >
                          <Power className="w-3 h-3 mr-1" />
                          {isDisabled ? 'Enable' : 'Disable'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs px-2 text-muted-foreground hover:text-destructive"
                          onClick={() => {
                            resetModule(mod.id);
                            showToast({
                              type: 'info',
                              title: `Module ${mod.id} Reset`,
                              description: 'Module progress was re-initialized.',
                            });
                          }}
                          title="Reset module progress"
                        >
                          <RotateCcw className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: UNITS */}
          {activeTab === 'units' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold">Unit Level Control & Availability (Module 04)</h4>
                  <p className="text-xs text-muted-foreground">
                    Disable or reset individual units. Disabled units will render greyed-out and unclickable in the curriculum.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {MODULE_04_UNITS_LIST.map((unit) => {
                  const isDisabled = disabledUnits.includes(unit.id);
                  return (
                    <div
                      key={unit.id}
                      className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                        isDisabled ? 'bg-muted/40 opacity-75 border-dashed' : 'bg-card hover:border-primary/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs font-bold text-primary border-primary/20">
                            Unit {unit.unitNumber}
                          </Badge>
                          <span className="font-bold text-sm text-foreground">{unit.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Contains {unit.topicCount} topics + 1 unit assessment • Status:{' '}
                          <span className={isDisabled ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
                            {isDisabled ? 'Disabled by Admin' : 'Active'}
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant={isDisabled ? 'default' : 'outline'}
                          size="sm"
                          className="h-8 text-xs font-semibold"
                          onClick={() => {
                            toggleUnit(unit.id);
                            showToast({
                              type: isDisabled ? 'success' : 'warning',
                              title: `Unit ${unit.unitNumber} ${isDisabled ? 'Enabled' : 'Disabled'}`,
                              description: unit.title,
                            });
                          }}
                        >
                          <Power className="w-3.5 h-3.5 mr-1" />
                          {isDisabled ? 'Enable Unit' : 'Disable Unit'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs text-muted-foreground hover:text-destructive"
                          onClick={() => {
                            resetUnit(unit.id);
                            showToast({
                              type: 'info',
                              title: `Unit ${unit.unitNumber} Reset`,
                              description: 'Unit completion states re-initialized.',
                            });
                          }}
                        >
                          <RotateCcw className="w-3.5 h-3.5 mr-1" />
                          Reset
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: TOPICS */}
          {activeTab === 'topics' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold">Topic Completion & Availability (Module 04)</h4>
                  <p className="text-xs text-muted-foreground">Manage individual topic states and reset completion flags.</p>
                </div>
              </div>

              <div className="space-y-2">
                {MODULE_04_TOPICS.map((topic) => {
                  const isDisabled = disabledTopics.includes(topic.id);
                  return (
                    <div
                      key={topic.id}
                      className="p-3 rounded-lg border bg-card flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-[10px]">
                          {topic.unit}
                        </Badge>
                        <span className="font-semibold text-sm">{topic.title}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant={isDisabled ? 'default' : 'outline'}
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => {
                            toggleTopic(topic.id);
                            showToast({
                              type: isDisabled ? 'success' : 'warning',
                              title: `Topic ${isDisabled ? 'Enabled' : 'Disabled'}`,
                              description: topic.title,
                            });
                          }}
                        >
                          <Power className="w-3 h-3 mr-1" />
                          {isDisabled ? 'Enable Topic' : 'Disable Topic'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-muted-foreground hover:text-destructive"
                          onClick={() => {
                            resetTopic(topic.id);
                            showToast({
                              type: 'info',
                              title: 'Topic Progress Cleared',
                              description: topic.title,
                            });
                          }}
                        >
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Reset
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: LABS */}
          {activeTab === 'labs' && (
            <Card className="border">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="text-base font-bold">External Range Labs Integration</h4>
                    <p className="text-xs text-muted-foreground max-w-xl">
                      Control lab availability independently from course content. By requirement for this phase, labs are kept in an architecture-ready disabled state by default.
                    </p>
                  </div>
                  <Button
                    variant={labsEnabled ? 'destructive' : 'default'}
                    onClick={() => {
                      toggleLabs();
                      showToast({
                        type: labsEnabled ? 'warning' : 'success',
                        title: `Labs ${labsEnabled ? 'Disabled' : 'Enabled'}`,
                        description: labsEnabled ? 'Labs are now hidden from student view.' : 'Labs are now accessible.',
                      });
                    }}
                  >
                    <FlaskConical className="w-4 h-4 mr-2" />
                    {labsEnabled ? 'Disable Labs' : 'Enable Labs'}
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-muted/40 text-xs space-y-2 border">
                  <div className="flex items-center gap-2 font-semibold">
                    <Badge variant={labsEnabled ? 'default' : 'secondary'}>
                      {labsEnabled ? 'LABS ACTIVE' : 'LABS CURRENTLY DISABLED (DEV PHASE)'}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    When disabled, the UI shows a clean &quot;Labs Coming Soon&quot; architecture badge without disrupting the core theory, demo, interactive, and knowledge check learning flows.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* TAB: ASSESSMENTS */}
          {activeTab === 'assessments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold">Assessment Locks & Results</h4>
                  <p className="text-xs text-muted-foreground">Lock or unlock end-of-unit and module assessments.</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {ASSESSMENTS.map((ass) => {
                  const isUnlocked = unlockedAssessments.includes(ass.id);
                  return (
                    <div
                      key={ass.id}
                      className="p-3.5 rounded-lg border bg-card flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isUnlocked ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
                        }`}>
                          {isUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{ass.title}</p>
                          <p className="text-[11px] text-muted-foreground">
                            Status: <span className={isUnlocked ? 'text-emerald-600 font-medium' : 'text-rose-600 font-medium'}>
                              {isUnlocked ? 'Unlocked & Available' : 'Locked'}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() => {
                            toggleAssessmentLock(ass.id);
                            showToast({
                              type: isUnlocked ? 'warning' : 'success',
                              title: `Assessment ${isUnlocked ? 'Locked' : 'Unlocked'}`,
                              description: ass.title,
                            });
                          }}
                        >
                          {isUnlocked ? 'Lock' : 'Unlock'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs text-muted-foreground hover:text-destructive"
                          onClick={() => {
                            resetAssessment(ass.id);
                            showToast({
                              type: 'info',
                              title: 'Assessment Results Reset',
                              description: ass.title,
                            });
                          }}
                        >
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Reset
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: XP SYSTEM */}
          {activeTab === 'xp' && (
            <Card className="border">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold">XP Rewards & Leveling Engine</h4>
                    <p className="text-xs text-muted-foreground max-w-xl">
                      Enable or disable XP rewards across knowledge checks, simulations, and unit assessments.
                    </p>
                  </div>
                  <Button
                    variant={xpSystemEnabled ? 'destructive' : 'default'}
                    onClick={() => {
                      toggleXpSystem();
                      showToast({
                        type: xpSystemEnabled ? 'warning' : 'success',
                        title: `XP System ${xpSystemEnabled ? 'Disabled' : 'Enabled'}`,
                      });
                    }}
                  >
                    <Award className="w-4 h-4 mr-2" />
                    {xpSystemEnabled ? 'Disable XP Engine' : 'Enable XP Engine'}
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-muted/40 text-xs space-y-2 border">
                  <p className="font-semibold text-foreground">
                    Current Status: <span className={xpSystemEnabled ? 'text-emerald-600' : 'text-rose-600'}>
                      {xpSystemEnabled ? 'Active (XP awarded on question completion)' : 'Disabled (XP gains paused)'}
                    </span>
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      resetProgressStore();
                      showToast({
                        type: 'info',
                        title: 'XP Reset',
                        description: 'Total XP returned to 0.',
                      });
                    }}
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1" />
                    Reset Current XP to 0
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* TAB: GLOBAL RESET */}
          {activeTab === 'reset' && (
            <div className="p-6 rounded-lg border border-destructive/30 bg-destructive/5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-destructive">Global Development State Reset</h4>
                  <p className="text-xs text-muted-foreground">
                    This will clear all localStorage progress, reset completed units/topics, set user XP to 0, unlock standard assessments, and reset all module availability configurations.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Button variant="destructive" onClick={handleGlobalReset} className="w-full sm:w-auto">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Perform Full System Reset
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
