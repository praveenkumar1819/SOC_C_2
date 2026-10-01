'use client';

import React, { useState, useEffect } from 'react';
import {
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  X,
  FileText,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Award,
  Layers,
  Laptop,
  CheckSquare,
  Square,
  Users,
  Building2,
  Workflow,
  Search,
  Activity,
  HardDrive,
  Network,
  Mail,
  Sliders,
  Terminal,
  Database,
  UserCheck,
  PhoneCall,
  Flame,
  FileCheck,
  Briefcase,
  HelpCircle,
  Eye,
  Lock,
  Unlock,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Compass,
  Smile,
  HeartHandshake,
  KeyRound,
  FlaskConical,
  PartyPopper,
  Radio,
  BookOpen,
  Info,
  MapPin,
  Target,
  Zap,
  Cpu,
  MonitorCheck,
  Share2,
  Filter,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GuidedMentorBox } from '@/components/learning/guided-mentor-box';
import { MentorVoiceNote } from '@/components/learning/mentor-voice-note';
import { useProgressStore } from '@/store/progress-store';
import { useAdminConfigStore } from '@/store/admin-config-store';
import { useToast } from '@/components/ui/toast-provider';

interface CourseOrientationStoryProps {
  currentTopicId?: string;
  onSelectTopic: (topicId: string) => void;
  onCompleteTopic: (topicId: string, xpReward: number) => void;
  onCompleteUnitAssessment?: (unitId: string) => void;
  onBackToOverview: () => void;
}

export function CourseOrientationStory({
  currentTopicId = 'topic-0-1-1',
  onSelectTopic,
  onCompleteTopic,
  onCompleteUnitAssessment,
  onBackToOverview,
}: CourseOrientationStoryProps) {
  const { showToast } = useToast();
  const { completedTopics, addXP } = useProgressStore();
  const { xpSystemEnabled } = useAdminConfigStore();
  const [mounted, setMounted] = useState(false);

  // Global Audio auto-play toggle
  const [autoAudioEnabled, setAutoAudioEnabled] = useState(true);

  // Guided screen tour state
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  // Auto-animating thought process step (How an analyst thinks)
  const [activeThoughtStep, setActiveThoughtStep] = useState(0);

  // Auto-animating curriculum phase
  const [activeCurriculumPhase, setActiveCurriculumPhase] = useState(0);

  // Module 04 Features Showcase: Selected Console Tab
  const [activeConsoleTab, setActiveConsoleTab] = useState<'siem' | 'edr' | 'email' | 'firewall' | 'ticket'>('siem');

  // Module 04 End-to-End Flow: Selected Stage
  const [activeFlowStage, setActiveFlowStage] = useState<number>(0);

  // Module 04 Vocabulary Decoder: Selected Term
  const [decodedTerm, setDecodedTerm] = useState<string>('siem');

  // State for simple assessment quiz & triage choice
  const [triageChoice, setTriageChoice] = useState<'safe' | 'danger' | null>(null);
  const [miniLabStep, setMiniLabStep] = useState<number>(1);
  const [miniLabDone, setMiniLabDone] = useState<boolean>(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-rotate thought steps every 4 seconds for animated learning
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveThoughtStep((prev) => (prev + 1) % 5);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate curriculum phases every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCurriculumPhase((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate Module 04 triage flow stages every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFlowStage((prev) => (prev + 1) % 5);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Map of all 11 chapters in Module 00 (Planned for 1.5 Hours total)
  const chapters = [
    { id: 'topic-0-1-1', unit: 'Unit 1', num: '1.1', title: 'The Digital Society Watchman & How You Think', time: '10 mins' },
    { id: 'topic-0-1-2', unit: 'Unit 1', num: '1.2', title: 'Module 04 Vocabulary Decoder: Every Term in Plain English', time: '10 mins' },
    { id: 'topic-0-1-3', unit: 'Unit 1', num: '1.3', title: 'Burnt Toast vs Real Fire (The Core Triage Rule)', time: '10 mins' },
    { id: 'unit-0-1-assessment', unit: 'Unit 1', num: '1.4', title: 'Unit 1 Quick Check Milestone', time: '5 mins' },
    { id: 'topic-0-2-1', unit: 'Unit 2', num: '2.1', title: 'Module 04 Consoles Tour: The 5 Screens You Will Operate', time: '10 mins' },
    { id: 'topic-0-2-2', unit: 'Unit 2', num: '2.2', title: 'What is a "Lab"? Safe Flight Simulator', time: '10 mins' },
    { id: 'topic-0-2-3', unit: 'Unit 2', num: '2.3', title: 'Your First Guided Lab Simulation (Triage in Action)', time: '10 mins' },
    { id: 'unit-0-2-assessment', unit: 'Unit 2', num: '2.4', title: 'Unit 2 Quick Check Milestone', time: '5 mins' },
    { id: 'topic-0-3-1', unit: 'Unit 3', num: '3.1', title: 'Module 04 End-to-End Triage Flow: 5 Stages of an Incident', time: '10 mins' },
    { id: 'topic-0-3-2', unit: 'Unit 3', num: '3.2', title: 'Complete Course Flow: What Modules Are Covered', time: '15 mins' },
    { id: 'unit-0-3-assessment', unit: 'Unit 3', num: '3.3', title: 'Course Graduation Check & Cadet Badge', time: '5 mins' },
  ];

  const currentIndex = chapters.findIndex((c) => c.id === currentTopicId);
  const currentChapter = chapters[currentIndex >= 0 ? currentIndex : 0];

  const handleNext = () => {
    if (!completedTopics.has(currentChapter.id)) {
      onCompleteTopic(currentChapter.id, 35);
    }
    if (currentIndex < chapters.length - 1) {
      const next = chapters[currentIndex + 1];
      onSelectTopic(next.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onBackToOverview();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prev = chapters[currentIndex - 1];
      onSelectTopic(prev.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Tour Steps Data
  const tourSteps = [
    {
      title: '1. Senior Mentor Voice Briefing 🎙️',
      desc: 'Rajesh Kumar and Priya Sharma narrate every lesson in natural Indian English. Voice notes auto-play as you advance!',
      highlight: 'Voice Note Card at Top',
    },
    {
      title: '2. Module 04 Features & Consoles 🖥️',
      desc: 'See exactly how Module 04 works before you get there: the SIEM queue, EDR process trees, and triage buttons.',
      highlight: 'Consoles & Features Tour',
    },
    {
      title: '3. Safe Flight Simulator Labs 🛡️',
      desc: 'Labs are safe sandboxes where mentors guide every single mouse click. You cannot break anything, and you get unlimited retries.',
      highlight: 'Interactive Simulator',
    },
    {
      title: '4. Your Guided Next Action Button 👉',
      desc: 'At the bottom of every lesson, an animated button shows your exact next step so you will never feel lost!',
      highlight: 'Bottom Action Beacon',
    },
  ];

  return (
    <div className="w-full max-w-5xl lg:max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 pb-28 animate-fade-in font-sans">
      {/* ========================================================
          TOP NAVIGATION BAR (FLEXIBLE & HUMAN READABLE)
         ======================================================== */}
      <div className="p-4 sm:p-5 rounded-2xl border bg-card/95 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm sticky top-16 z-20 transition-all">
        <div className="flex items-center gap-2.5 text-xs flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2.5 text-muted-foreground hover:text-foreground font-bold"
            onClick={onBackToOverview}
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Module Overview
          </Button>
          <span className="text-muted-foreground/60">/</span>
          <Badge variant="outline" className="bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-300 font-bold text-xs">
            {currentChapter.unit} • Ch {currentChapter.num}
          </Badge>
          <Badge className="bg-emerald-600/15 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40 text-[11px] font-bold">
            1.5-Hour Orientation ({currentChapter.time})
          </Badge>
          <span className="font-extrabold text-foreground truncate max-w-[240px] sm:max-w-sm text-sm">
            {currentChapter.title}
          </span>
        </div>

        {/* Global Controls: Tour, Audio Mute Toggle, Navigation */}
        <div className="flex items-center gap-2 self-end md:self-auto flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoAudioEnabled(!autoAudioEnabled)}
            className={`h-8 text-xs gap-1.5 font-bold cursor-pointer rounded-xl ${
              autoAudioEnabled
                ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                : 'border-muted text-muted-foreground'
            }`}
            title="Toggle Automatic Mentor Voice Narration"
          >
            {autoAudioEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span className="hidden sm:inline">Audio: Auto-Playing 🔊</span>
                <span className="sm:hidden">Audio On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="hidden sm:inline">Audio: Muted 🔇</span>
                <span className="sm:hidden">Muted</span>
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTour(true)}
            className="h-8 text-xs gap-1 font-bold border-primary/30 text-primary hover:bg-primary/5 cursor-pointer rounded-xl"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Screen Tour 🧭</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={currentIndex <= 0}
            className="h-8 text-xs gap-1 font-bold cursor-pointer rounded-xl"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back</span>
          </Button>

          <Button
            size="sm"
            onClick={handleNext}
            className="h-8 text-xs gap-1.5 font-bold bg-primary hover:bg-primary/90 text-white cursor-pointer shadow-xs rounded-xl"
          >
            <span>{currentIndex >= chapters.length - 1 ? 'Finish Module' : 'Next Step'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Chapter Progress Dots with Step Numbers */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold px-1">
          <span>Orientation Progress: Step {currentIndex + 1} of {chapters.length}</span>
          <span className="font-mono text-emerald-600 font-bold">
            {Math.round(((currentIndex + 1) / chapters.length) * 100)}% Complete
          </span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {chapters.map((chap, idx) => {
            const isDone = completedTopics.has(chap.id);
            const isCurrent = chap.id === currentChapter.id;
            return (
              <button
                key={chap.id}
                onClick={() => onSelectTopic(chap.id)}
                className={`h-2.5 flex-1 min-w-[24px] rounded-full transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-500 ring-2 ring-amber-400/50 scale-105'
                    : isDone
                    ? 'bg-emerald-500'
                    : 'bg-muted hover:bg-muted-foreground/30'
                }`}
                title={`Step ${idx + 1}: ${chap.title} (${chap.time})`}
              />
            );
          })}
        </div>
      </div>

      {/* ========================================================
          INTERACTIVE SCREEN TOUR MODAL OVERLAY
         ======================================================== */}
      {showTour && (
        <div className="p-6 rounded-2xl border-2 border-primary/40 bg-card/95 shadow-xl space-y-4 animate-fade-in relative">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-primary animate-spin" />
              <h3 className="font-black text-lg text-foreground">Welcome to Your Orientation Tour</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowTour(false)} className="h-8 w-8 p-0 rounded-full">
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
            <Badge className="bg-primary text-white text-xs">{tourSteps[tourStep].title}</Badge>
            <p className="text-sm text-foreground/90 leading-relaxed font-medium">
              {tourSteps[tourStep].desc}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5">
              {tourSteps.map((_, i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === tourStep ? 'bg-primary scale-125' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              {tourStep > 0 && (
                <Button variant="outline" size="sm" onClick={() => setTourStep(tourStep - 1)} className="text-xs">
                  Previous Tip
                </Button>
              )}
              {tourStep < tourSteps.length - 1 ? (
                <Button size="sm" onClick={() => setTourStep(tourStep + 1)} className="text-xs font-bold">
                  Next Tip →
                </Button>
              ) : (
                <Button size="sm" onClick={() => setShowTour(false)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold">
                  Got It! Start Orientation 🎉
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          CHAPTER 1.1: The Digital Society Watchman & How You Think
         ======================================================== */}
      {currentChapter.id === 'topic-0-1-1' && (
        <div className="space-y-8 animate-fade-in">
          <MentorVoiceNote
            mentorName="Rajesh Kumar"
            mentorRole="Senior Mentor & Guide"
            avatarInitials="RK"
            gender="male"
            autoPlay={autoAudioEnabled}
            audioText="Namaste and welcome! Main hoon Rajesh Kumar, your senior guide. Let me assure you right now: you do not need any coding, programming, or computer science degree to excel in this course. Think of this work like an apartment society watchman sitting at the gate with a visitor register and CCTV camera. You observe, verify, and follow simple checklists. Chalo, let's explore together!"
            displaySummary="Namaste! You don't need coding or math. Think of this job like a society watchman at the building gate. Let's see how!"
          />

          <GuidedMentorBox
            mentor="rajesh"
            time="Morning Briefing"
            quote={
              <span>
                "Namaste! Don't let anyone convince you that cybersecurity is only for hackers in dark hoodies. In reality, our job is just like a <strong>society watchman or airport security officer</strong>. We sit in front of a screen, check who is entering, and follow a simple checklist. Bilkul tension mat lo!"
              </span>
            }
          />

          <div className="space-y-2 text-center max-w-2xl mx-auto py-2">
            <Badge className="bg-emerald-600 text-white text-xs uppercase tracking-wider font-bold">
              Lesson 1.1 • The Big Picture
            </Badge>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
              What Do We Actually Do?
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Compare your everyday world to digital cybersecurity. Look at the 4 comparison cards below:
            </p>
          </div>

          {/* 4 Large Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Card className="border-2 border-amber-500/30 bg-card hover:border-amber-500/50 transition-all shadow-xs rounded-2xl">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-2xl shrink-0">
                    🏢
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-foreground">1. The Society Watchman</h3>
                    <Badge variant="outline" className="text-[10px] bg-amber-50 text-amber-900 border-amber-200">
                      Real World Everyday Example
                    </Badge>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Sits at the apartment building gate with a paper register. When a delivery courier arrives, he asks for the flat number and checks their identity before opening the gate.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-emerald-500/30 bg-card hover:border-emerald-500/50 transition-all shadow-xs rounded-2xl">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-2xl shrink-0">
                    🛡️
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-foreground">2. The Digital Guard (You!)</h3>
                    <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-900 border-emerald-200">
                      Your Role as an Analyst
                    </Badge>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  You sit in an office or home with a security dashboard. When someone logs into the company system at 2:00 AM, you check if it's a real employee or an imposter!
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-rose-500/30 bg-card hover:border-rose-500/50 transition-all shadow-xs rounded-2xl">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center text-2xl shrink-0">
                    ❌
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-foreground">What You NEVER Do</h3>
                    <Badge variant="outline" className="text-[10px] bg-rose-50 text-rose-900 border-rose-200">
                      Zero Coding Required
                    </Badge>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  No coding software from scratch. No memorizing 500-page textbooks. No movie-style dark room hacking. No advanced mathematics.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-sky-500/30 bg-card hover:border-sky-500/50 transition-all shadow-xs rounded-2xl">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center text-2xl shrink-0">
                    ✅
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-foreground">What You ACTUALLY Do</h3>
                    <Badge variant="outline" className="text-[10px] bg-sky-50 text-sky-900 border-sky-200">
                      Curiosity + Checklists
                    </Badge>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Use common sense. Notice strange patterns. Follow a 4-step checklist prepared by senior engineers. Talk to teammates.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* HOW AN ANALYST THINKS: 5-STEP BRAIN FLOW */}
          <div className="p-6 sm:p-7 rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-background space-y-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
              <div>
                <Badge className="bg-primary text-white text-xs font-bold uppercase tracking-wider mb-1">
                  Mental Model • How You Think 🧠
                </Badge>
                <h3 className="text-xl sm:text-2xl font-black text-foreground">
                  The 5-Step Analyst Thought Process
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-mono font-bold text-muted-foreground">
                  Auto-Visualizing Step {activeThoughtStep + 1} of 5
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {[
                { step: 1, title: '1. Spot Anomaly', icon: '📡', desc: 'Notice the alarm: 2:15 AM login' },
                { step: 2, title: '2. Ask 5 Ws', icon: '❓', desc: 'Who, What, Where, When, Why' },
                { step: 3, title: '3. Follow SOP', icon: '📋', desc: 'Read standard 4-step checklist' },
                { step: 4, title: '4. Context Check', icon: '🍞', desc: 'Burnt toast or real fire?' },
                { step: 5, title: '5. Resolve & Note', icon: '✍️', desc: 'Write 2 lines & close calmly' },
              ].map((item, idx) => {
                const isActive = idx === activeThoughtStep;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveThoughtStep(idx)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'border-primary bg-primary/10 ring-2 ring-primary/30 scale-102 shadow-xs'
                        : 'border-border bg-card/60 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="font-extrabold text-xs text-foreground">{item.title}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{item.desc}</div>
                  </button>
                );
              })}
            </div>

            <div className="p-5 rounded-2xl bg-card border-2 border-primary/20 shadow-xs space-y-2 animate-fade-in">
              {activeThoughtStep === 0 && (
                <div className="space-y-1">
                  <h4 className="font-black text-sm text-foreground flex items-center gap-2">
                    <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
                    Step 1: Notice the Anomaly Without Panicking
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    The security dashboard beeps: <em>"Login from New Delhi WiFi at 2:15 AM for employee rahul.sales"</em>. You don't scream that the company is hacked. You simply note: "Rahul usually works from 10 AM to 6 PM. 2 AM is unusual."
                  </p>
                </div>
              )}

              {activeThoughtStep === 1 && (
                <div className="space-y-1">
                  <h4 className="font-black text-sm text-foreground flex items-center gap-2">
                    <Search className="w-4 h-4 text-sky-500 animate-pulse" />
                    Step 2: Collect the Facts (The 5 Ws)
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    <strong>Who:</strong> Rahul | <strong>What:</strong> Successful WiFi Login | <strong>Where:</strong> Delhi Office Floor 2 | <strong>When:</strong> 02:15 AM IST | <strong>Why:</strong> That is what we find out next!
                  </p>
                </div>
              )}

              {activeThoughtStep === 2 && (
                <div className="space-y-1">
                  <h4 className="font-black text-sm text-foreground flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-amber-500 animate-pulse" />
                    Step 3: Check the SOP Checklist (Never Guess!)
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Senior engineers have already prepared a Standard Operating Procedure (SOP). Step 1 of the SOP says: <em>"Check employee calendar & travel notices in the HR portal."</em> You simply follow the checklist like an airplane pilot.
                  </p>
                </div>
              )}

              {activeThoughtStep === 3 && (
                <div className="space-y-1">
                  <h4 className="font-black text-sm text-foreground flex items-center gap-2">
                    <Flame className="w-4 h-4 text-emerald-500 animate-pulse" />
                    Step 4: Contextual Verification (Burnt Toast vs Real Fire)
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    You check the HR portal and find a travel memo: <em>"Rahul attending urgent US Client Pitch from office video room at 2:00 AM."</em> The alarm was just <strong>burnt toast</strong>! No intruder, no danger.
                  </p>
                </div>
              )}

              {activeThoughtStep === 4 && (
                <div className="space-y-1">
                  <h4 className="font-black text-sm text-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 animate-pulse" />
                    Step 5: Safe Resolution & 2-Line Note
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    You close the ticket as <strong>Harmless (False Alarm)</strong>. You write two simple sentences: <em>"Verified 2 AM login with Rahul's approved US client meeting memo. Activity legitimate. Ticket closed."</em>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Guided Next Action Beacon */}
          <div className="p-6 rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-r from-emerald-500/10 via-card to-emerald-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <Badge className="bg-emerald-600 text-white text-[11px] font-bold">
                👉 Your Guided Next Action: Step 1 of 11 Complete
              </Badge>
              <h4 className="font-extrabold text-base text-foreground">
                Ready to Decode Every Module 04 Term into Plain English?
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                In the next chapter, Rajesh Sir decodes SIEM, Telemetry, Process Trees, and SLAs using simple Indian everyday analogies.
              </p>
            </div>

            <Button
              onClick={handleNext}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs h-11 px-7 rounded-xl shadow-md ring-4 ring-emerald-500/20 hover:ring-emerald-500/40 animate-pulse cursor-pointer shrink-0"
            >
              <span>Proceed to Chapter 1.2 →</span>
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================
          CHAPTER 1.2: Module 04 Vocabulary Decoder (Every Term in Plain English)
         ======================================================== */}
      {currentChapter.id === 'topic-0-1-2' && (
        <div className="space-y-8 animate-fade-in">
          <MentorVoiceNote
            mentorName="Rajesh Kumar"
            mentorRole="Senior Mentor & Guide"
            avatarInitials="RK"
            gender="male"
            autoPlay={autoAudioEnabled}
            audioText="Welcome to the Vocabulary Decoder! When you reach Module Four, you will see terms like SIEM, EDR, Telemetry, and Process Trees. Don't be afraid! Every single one of these terms is just an everyday object in disguise. Tap any card below, and let's decode what they really mean!"
            displaySummary="Every technical term in Module 04 has a simple everyday twin. Click each term below to decode!"
          />

          <GuidedMentorBox
            mentor="rajesh"
            time="Jargon Buster"
            quote={
              <span>
                "In Module 4, people see words like SIEM and Telemetry and start panicking! But SIEM is just the <strong>Airport Control Tower</strong>, and Telemetry is just an <strong>ATM receipt</strong>. Tap any term below to master it."
              </span>
            }
          />

          {/* 8 Term Selector Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'siem', name: 'SIEM Console', icon: '📡', twin: 'Airport Control Tower' },
              { id: 'log', name: 'Telemetry & Logs', icon: '🧾', twin: 'ATM Transaction Receipt' },
              { id: 'process', name: 'Process Tree', icon: '🌳', twin: 'Family Tree of Programs' },
              { id: 'verdict', name: 'True vs False Positive', icon: '🔥', twin: 'Real Fire vs Burnt Toast' },
              { id: 'triage', name: 'Alert Triage', icon: '🩺', twin: 'Hospital ER Nurse Check' },
              { id: 'sla', name: 'Severity & SLA', icon: '⏱️', twin: 'Ticking Response Clock' },
              { id: 'escalation', name: 'Escalation & Handoff', icon: '🤝', twin: 'Relay Race Baton Pass' },
              { id: 'firewall', name: 'Firewall', icon: '🚧', twin: 'Society Boom Barrier' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setDecodedTerm(item.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  decodedTerm === item.id
                    ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/30 shadow-xs scale-102'
                    : 'border-border bg-card hover:border-amber-500/30'
                }`}
              >
                <div className="text-3xl mb-1">{item.icon}</div>
                <div className="font-extrabold text-xs sm:text-sm text-foreground">{item.name}</div>
                <div className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">{item.twin}</div>
              </button>
            ))}
          </div>

          {/* Decoded Term Explanation Card */}
          <Card className="border-2 border-amber-500/30 bg-card shadow-sm animate-fade-in rounded-2xl">
            <CardContent className="p-6 sm:p-7 space-y-4">
              {decodedTerm === 'siem' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">📡</span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-foreground">SIEM = Central Airport Control Tower / CCTV Screen</h3>
                      <p className="text-xs sm:text-sm text-rose-600 line-through">Scary Jargon: "Security Information & Event Management Correlation Engine"</p>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-base text-foreground leading-relaxed space-y-2">
                    <p><strong>Everyday Twin:</strong> In an airport, pilots, radar sensors, luggage scanners, and gates all send information to one central glass control tower so air traffic controllers can see everything on one screen.</p>
                    <p><strong>How it works in Module 04:</strong> The SIEM collects receipts (logs) from 500+ company computers. When it spots an intruder, it rings an alarm in your queue!</p>
                  </div>
                </div>
              )}

              {decodedTerm === 'log' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">🧾</span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-foreground">Telemetry & Logs = ATM Cash Withdrawal Receipt</h3>
                      <p className="text-xs sm:text-sm text-rose-600 line-through">Scary Jargon: "Immutable Audit Trail Telemetry Stream"</p>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-base text-foreground leading-relaxed space-y-2">
                    <p><strong>Everyday Twin:</strong> When you withdraw ₹2,000 from an ATM, the machine prints a paper receipt: <em>Card ending 4812, Time: 14:02 PM, Amount: ₹2,000, Status: Success</em>.</p>
                    <p><strong>How it works in Module 04:</strong> Every computer automatically prints a digital receipt whenever someone logs in, opens Word, or visits a website. You never guess what happened—you simply read the receipt!</p>
                  </div>
                </div>
              )}

              {decodedTerm === 'process' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">🌳</span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-foreground">Process Tree = Family Tree of Programs</h3>
                      <p className="text-xs sm:text-sm text-rose-600 line-through">Scary Jargon: "Parent-Child Process Execution Hierarchy"</p>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-base text-foreground leading-relaxed space-y-2">
                    <p><strong>Everyday Twin:</strong> A parent gives birth to a child. In computers, clicking Microsoft Word (`WINWORD.EXE`) starts a Word process. Word is supposed to type letters and invoices.</p>
                    <p><strong>How it works in Module 04:</strong> If Microsoft Word suddenly spawns `powershell.exe` (a powerful hacker script tool), the security sensor says: "Wait! Why is a document tool giving birth to a hacker tool?" That is an abnormal child process!</p>
                  </div>
                </div>
              )}

              {decodedTerm === 'verdict' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">🔥</span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-foreground">True Positive vs False Positive = Real Fire vs Burnt Toast</h3>
                      <p className="text-xs sm:text-sm text-rose-600 line-through">Scary Jargon: "Binary Telemetry Classification Matrix"</p>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-base text-foreground leading-relaxed space-y-2">
                    <p><strong>False Positive (FP):</strong> Burnt toast in the toaster. The smoke alarm beeps loudly, but there is zero danger. Action: reset alarm and eat breakfast calmly!</p>
                    <p><strong>True Positive (TP):</strong> Real flames spreading on the curtains. Action: call emergency services and contain the fire immediately!</p>
                  </div>
                </div>
              )}

              {decodedTerm === 'triage' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">🩺</span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-foreground">Alert Triage = Hospital ER Nurse Examination</h3>
                      <p className="text-xs sm:text-sm text-rose-600 line-through">Scary Jargon: "Initial Incident Ingestion & Diagnostic Assessment"</p>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-base text-foreground leading-relaxed space-y-2">
                    <p><strong>Everyday Twin:</strong> In a hospital emergency room, a triage nurse checks blood pressure, temperature, and pulse to decide who needs immediate surgery and who just needs a band-aid.</p>
                    <p><strong>How it works in Module 04:</strong> As an L1 analyst, you check the 4 facts (Who, What, Where, When) to decide if an alert is safe or dangerous.</p>
                  </div>
                </div>
              )}

              {decodedTerm === 'sla' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">⏱️</span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-foreground">Severity & SLA = Emergency Priority & Ticking Clock</h3>
                      <p className="text-xs sm:text-sm text-rose-600 line-through">Scary Jargon: "Service Level Agreement Incident MTTR Target"</p>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-base text-foreground leading-relaxed space-y-2">
                    <p><strong>Everyday Twin:</strong> Domino's 30-minute pizza guarantee. Or a fire truck responding within 10 minutes of a 911 call.</p>
                    <p><strong>How it works in Module 04:</strong> Critical alerts have a 15-minute SLA timer. Medium alerts have a 2-hour timer. You must claim and review alerts before the timer runs out!</p>
                  </div>
                </div>
              )}

              {decodedTerm === 'escalation' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">🤝</span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-foreground">Escalation & Handoff = Relay Race Baton Pass</h3>
                      <p className="text-xs sm:text-sm text-rose-600 line-through">Scary Jargon: "Tier-1 to Tier-2 Incident Escalation Handoff"</p>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-base text-foreground leading-relaxed space-y-2">
                    <p><strong>Everyday Twin:</strong> The society watchman spots a suspicious intruder trying to break into a flat. He doesn't conduct a police trial himself—he locks the gate and calls the senior police officer!</p>
                    <p><strong>How it works in Module 04:</strong> When you (L1) confirm real danger on a laptop, you write down your findings and pass the ticket to Priya Sharma (L2 Senior Responder) for deep containment.</p>
                  </div>
                </div>
              )}

              {decodedTerm === 'firewall' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">🚧</span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-foreground">Firewall = Society Boom Barrier Gate</h3>
                      <p className="text-xs sm:text-sm text-rose-600 line-through">Scary Jargon: "Stateful Packet Inspection Perimeter Filter"</p>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-base text-foreground leading-relaxed space-y-2">
                    <p><strong>Everyday Twin:</strong> If a resident drives up with a society vehicle sticker, the barrier opens automatically. If an unknown stranger car tries to drive in without an invitation, the gate remains closed.</p>
                    <p><strong>How it works in Module 04:</strong> Blocks incoming malicious connections from overseas hacker IP addresses.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Guided Next Action Beacon */}
          <div className="p-6 rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-r from-emerald-500/10 via-card to-emerald-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <Badge className="bg-emerald-600 text-white text-[11px] font-bold">
                👉 Your Guided Next Action: Step 2 of 11 Complete
              </Badge>
              <h4 className="font-extrabold text-base text-foreground">
                Meet Priya Sharma: The Burnt Toast Rule
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Next, learn why 70% of alerts in Module 04 are completely harmless false alarms with Priya Di.
              </p>
            </div>

            <Button
              onClick={handleNext}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs h-11 px-7 rounded-xl shadow-md ring-4 ring-emerald-500/20 hover:ring-emerald-500/40 animate-pulse cursor-pointer shrink-0"
            >
              <span>Proceed to Chapter 1.3 →</span>
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================
          CHAPTER 1.3: Burnt Toast vs Real Fire
         ======================================================== */}
      {currentChapter.id === 'topic-0-1-3' && (
        <div className="space-y-8 animate-fade-in">
          <MentorVoiceNote
            mentorName="Priya Sharma"
            mentorRole="Friendly Incident Guide"
            avatarInitials="PS"
            gender="female"
            autoPlay={autoAudioEnabled}
            avatarBg="bg-gradient-to-br from-rose-600 to-amber-600 text-white"
            audioText="Hello! Priya Sharma here. The number one rule in our job is: An alarm does not mean immediate panic! In fact, seventy percent of alarms are just like burnt toast in a toaster. The smoke detector beeps loudly, but there is no fire. You open the window, reset the alarm, and have breakfast! Let's see how this works in real life."
            displaySummary="An alarm does not mean panic! 70% of alarms are just burnt toast. Let's see!"
          />

          <GuidedMentorBox
            mentor="priya"
            time="Triage Golden Rule"
            quote={
              <span>
                "Hey there! When an alarm beeps in our control room, junior analysts sometimes panic and think the company is under attack. But 70% of alarms are completely harmless! Remember the <strong>Burnt Toast Rule</strong>."
              </span>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Card className="border-2 border-emerald-500/40 bg-card rounded-2xl shadow-xs">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">🍞</span>
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-xs font-bold">
                    False Alarm (Harmless)
                  </Badge>
                </div>
                <h4 className="font-extrabold text-base sm:text-lg text-foreground">Burnt Toast in the Toaster</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  The kitchen smoke alarm rings loudly because bread got slightly charred. There is zero fire. You silence the beeper, wave a towel, and continue eating.
                </p>
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-xs text-emerald-900 dark:text-emerald-200 font-semibold border border-emerald-200">
                  Digital Twin: Employee Rahul accidentally forgot his password on Monday morning and typed it wrong 3 times.
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-rose-500/40 bg-card rounded-2xl shadow-xs">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">🔥</span>
                  <Badge className="bg-rose-100 text-rose-800 border-rose-300 text-xs font-bold">
                    Real Trouble (True Threat)
                  </Badge>
                </div>
                <h4 className="font-extrabold text-base sm:text-lg text-foreground">Actual Kitchen Fire</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  The alarm rings and flames are spreading across the curtains. You immediately call the fire brigade and alert your family.
                </p>
                <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-xs text-rose-900 dark:text-rose-200 font-semibold border border-rose-200">
                  Digital Twin: An unknown foreign computer tries 500 passwords per second at midnight to break into customer accounts.
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 border-amber-500/30 bg-muted/20 rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <h4 className="font-bold text-sm sm:text-base text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Quick Practice: What would you do?
              </h4>
              <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                <strong>Situation:</strong> Accountant Neha calls you and says: <em>"Sorry, I had my Caps Lock on and mistyped my password twice, but now I logged in successfully!"</em>
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <Button
                  variant={triageChoice === 'safe' ? 'default' : 'outline'}
                  onClick={() => setTriageChoice('safe')}
                  className="w-full sm:w-auto text-xs font-bold gap-2 cursor-pointer h-10 rounded-xl"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Burnt Toast (Close as Harmless False Alarm)
                </Button>
                <Button
                  variant={triageChoice === 'danger' ? 'default' : 'outline'}
                  onClick={() => setTriageChoice('danger')}
                  className="w-full sm:w-auto text-xs font-bold gap-2 cursor-pointer h-10 rounded-xl"
                >
                  <Flame className="w-4 h-4 text-rose-500" />
                  Real Fire (Sound Emergency Sirens!)
                </Button>
              </div>

              {triageChoice === 'safe' && (
                <div className="p-4 rounded-xl bg-emerald-100 text-emerald-900 text-xs sm:text-sm font-bold animate-fade-in flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Bilkul sahi! Neha just made a typo. You close the case calmly without panicking.</span>
                </div>
              )}

              {triageChoice === 'danger' && (
                <div className="p-4 rounded-xl bg-amber-100 text-amber-900 text-xs sm:text-sm font-bold animate-fade-in flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Wait! Neha is sitting at her office desk and simply had Caps Lock on. It is harmless burnt toast!</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Guided Next Action Beacon */}
          <div className="p-6 rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-r from-emerald-500/10 via-card to-emerald-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <Badge className="bg-emerald-600 text-white text-[11px] font-bold">
                👉 Your Guided Next Action: Unit 1 Milestone (+100 XP)
              </Badge>
              <h4 className="font-extrabold text-base text-foreground">
                Pass Unit 1 Quick Check & Unlock Unit 2
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Answer one simple question to earn your +100 XP badge and unlock the Module 04 Consoles Tour!
              </p>
            </div>

            <Button
              onClick={handleNext}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs h-11 px-7 rounded-xl shadow-md ring-4 ring-emerald-500/20 hover:ring-emerald-500/40 animate-pulse cursor-pointer shrink-0"
            >
              <span>Take Quick Check (+100 XP) →</span>
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================
          CHAPTER 1.4: Unit 1 Quick Check Assessment
         ======================================================== */}
      {currentChapter.id === 'unit-0-1-assessment' && (
        <div className="space-y-8 animate-fade-in">
          <GuidedMentorBox
            mentor="rajesh"
            time="Unit 1 Milestone"
            quote={
              <span>
                "Shaabash! You completed Unit 1. Answer this one simple question to earn your 100 XP badge!"
              </span>
            }
          />

          <Card className="border-2 border-emerald-500/40 bg-card shadow-sm rounded-2xl">
            <CardHeader className="p-6 pb-4 border-b">
              <div className="flex items-center justify-between">
                <Badge className="bg-emerald-600 text-white text-xs font-bold">Unit 1 Assessment</Badge>
                <span className="text-sm font-bold text-emerald-600 font-mono">+100 XP Reward</span>
              </div>
              <CardTitle className="text-xl font-bold mt-2">
                In simple terms, what is our role in digital cybersecurity?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[
                { id: 0, text: 'Writing thousands of lines of difficult programming code in a dark room' },
                { id: 1, text: 'Acting like a digital security guard: checking alerts, observing clues, and following simple checklists' },
                { id: 2, text: 'Fixing broken hardware cables and repairing monitor screens' },
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => !quizSubmitted && setQuizAnswer(opt.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-xs sm:text-sm font-semibold ${
                    quizAnswer === opt.id
                      ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/40 bg-card'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border flex items-center justify-center text-xs shrink-0 font-mono">
                      {opt.id + 1}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                </div>
              ))}

              {!quizSubmitted ? (
                <Button
                  disabled={quizAnswer === null}
                  onClick={() => {
                    setQuizSubmitted(true);
                    if (quizAnswer === 1) {
                      addXP(100);
                      onCompleteTopic('unit-0-1-assessment', 100);
                      if (onCompleteUnitAssessment) onCompleteUnitAssessment('unit-0-1');
                      showToast({
                        type: 'success',
                        title: 'Unit 1 Passed! 🎉',
                        description: 'You earned 100 XP! Unit 2 is now unlocked.',
                      });
                    }
                  }}
                  className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-11 rounded-xl cursor-pointer shadow-sm"
                >
                  Submit & Unlock Unit 2 (+100 XP)
                </Button>
              ) : (
                <div className="p-5 rounded-2xl border border-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 space-y-3 animate-fade-in text-xs sm:text-sm">
                  <div className="flex items-center gap-2 font-bold text-base">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <span>Brilliant! You scored 100% on Unit 1 🎉</span>
                  </div>
                  <p>
                    You understand the big picture perfectly. You are the digital security guard of the company!
                  </p>
                  <Button onClick={handleNext} className="w-full mt-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-10 rounded-xl">
                    Proceed to Unit 2: The Module 04 Consoles Tour →
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* ========================================================
          CHAPTER 2.1: Module 04 Consoles Tour: The 5 Screens You Will Operate
         ======================================================== */}
      {currentChapter.id === 'topic-0-2-1' && (
        <div className="space-y-8 animate-fade-in">
          <MentorVoiceNote
            mentorName="Rajesh Kumar"
            mentorRole="Senior Mentor & Guide"
            avatarInitials="RK"
            gender="male"
            autoPlay={autoAudioEnabled}
            audioText="Welcome to Unit Two! Here is an exclusive preview of Module Four: the five screens and consoles you will operate in our live simulator. We have the central SIEM queue, the laptop EDR camera, the email scanner, the network firewall, and your incident ticketing chart. Tap each console below to see what they look like!"
            displaySummary="Exclusive Preview: The 5 consoles you will operate in Module 04! Tap each tab below."
          />

          <GuidedMentorBox
            mentor="rajesh"
            time="Simulator Consoles Preview"
            quote={
              <span>
                "In Module 4, you sit in the captain's chair of the SOC! You operate 5 simulated tools. Look at this preview so when you arrive at Module 4, you will feel completely at home!"
              </span>
            }
          />

          {/* 5 Consoles Selector Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {[
              { id: 'siem', name: '1. SIEM Queue', icon: '📡', tool: 'Splunk / Sentinel' },
              { id: 'edr', name: '2. EDR Sensor', icon: '💻', tool: 'CrowdStrike / MDE' },
              { id: 'email', name: '3. Email Gateway', icon: '✉️', tool: 'Proofpoint / Mimecast' },
              { id: 'firewall', name: '4. Network Firewall', icon: '🚧', tool: 'Palo Alto Networks' },
              { id: 'ticket', name: '5. Case Ticket', icon: '📋', tool: 'Jira / ServiceNow' },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveConsoleTab(c.id as any)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeConsoleTab === c.id
                    ? 'border-primary bg-primary/10 ring-2 ring-primary/30 shadow-xs scale-102'
                    : 'border-border bg-card hover:border-primary/40'
                }`}
              >
                <div className="text-2xl mb-1">{c.icon}</div>
                <div className="font-extrabold text-xs sm:text-sm text-foreground">{c.name}</div>
                <div className="text-[10px] text-muted-foreground line-clamp-1">{c.tool}</div>
              </button>
            ))}
          </div>

          {/* Simulated Console Screen Display */}
          <Card className="border-2 border-primary/30 bg-card shadow-md rounded-2xl overflow-hidden animate-fade-in">
            <CardHeader className="p-4 bg-slate-950 text-white flex flex-row items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs font-bold tracking-wider">
                  {activeConsoleTab === 'siem' && 'FINCORP SPLUNK SIEM // REAL-TIME ALERT CORRELATION'}
                  {activeConsoleTab === 'edr' && 'CROWDSTRIKE EDR // ENDPOINT: FIN-BOS-MCHEN-047'}
                  {activeConsoleTab === 'email' && 'SECURE EMAIL GATEWAY // INBOUND ATTACHMENT SCANNER'}
                  {activeConsoleTab === 'firewall' && 'PALO ALTO PERIMETER FIREWALL // TRAFFIC LOGS'}
                  {activeConsoleTab === 'ticket' && 'SERVICENOW ITSM // INCIDENT TICKET #SEC-2026-0412'}
                </span>
              </div>
              <Badge className="bg-emerald-600 text-white text-[10px] font-mono">STATUS: SIMULATED</Badge>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              {activeConsoleTab === 'siem' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-foreground">Alert Queue (Live Stream)</span>
                    <Badge variant="outline" className="bg-rose-500/10 text-rose-700 border-rose-300 text-xs font-bold">
                      Medium-High Priority
                    </Badge>
                  </div>
                  <div className="p-4 rounded-xl border bg-muted/20 font-mono text-xs space-y-1.5">
                    <p className="text-foreground font-bold">ALERT ID: SEC-2026-0412 — Suspicious Office Child Process</p>
                    <p className="text-muted-foreground">User: mchen (Michael Chen, Finance) | Host: FIN-BOS-MCHEN-047</p>
                    <p className="text-muted-foreground">Detection: Microsoft Word (WINWORD.EXE) spawned PowerShell</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-xs sm:text-sm text-foreground">
                    <strong>What You Do Here:</strong> In Module 4, this is your home base. You claim alerts, inspect the initial facts, and launch deep investigations.
                  </div>
                </div>
              )}

              {activeConsoleTab === 'edr' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-foreground">Process Tree Visualizer</span>
                    <Badge className="bg-emerald-600 text-white text-xs font-bold">Sensor: Action Blocked</Badge>
                  </div>
                  <div className="p-4 rounded-xl border bg-slate-950 text-slate-100 font-mono text-xs space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">explorer.exe (PID 1044)</span>
                      <span>➔</span>
                      <span className="text-amber-400 font-bold">WINWORD.EXE (PID 4812)</span>
                      <span>➔</span>
                      <span className="text-rose-400 font-black underline">powershell.exe -enc AQBB... [KILLED]</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-xs sm:text-sm text-foreground">
                    <strong>What You Do Here:</strong> The EDR sensor acts like a CCTV camera inside Michael's laptop. It proves Word tried to run an encoded script!
                  </div>
                </div>
              )}

              {activeConsoleTab === 'email' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-foreground">Inbound Email Inspection</span>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-800 border-amber-300 text-xs font-bold">
                      Domain Spoof Detected
                    </Badge>
                  </div>
                  <div className="p-4 rounded-xl border bg-muted/20 font-mono text-xs space-y-1">
                    <p><strong>From:</strong> accounts-verification@trusted-vendor.com (Fake domain! Real is accounts@trusted-vendor.com)</p>
                    <p><strong>Attachment:</strong> Q4_Invoice_Summary.docm (.docm = Macro-Enabled Word File)</p>
                    <p><strong>Gateway Risk Score:</strong> 87 / 100 (High Risk)</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-xs sm:text-sm text-foreground">
                    <strong>What You Do Here:</strong> You verify that Michael did not write the script—he was tricked by a fake invoice email!
                  </div>
                </div>
              )}

              {activeConsoleTab === 'firewall' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-foreground">Network Perimeter Traffic</span>
                    <Badge className="bg-emerald-600 text-white text-xs font-bold">Outbound TCP: Blocked</Badge>
                  </div>
                  <div className="p-4 rounded-xl border bg-muted/20 font-mono text-xs space-y-1">
                    <p><strong>Source Host:</strong> 10.4.12.47 (Michael's Laptop)</p>
                    <p><strong>Destination IP:</strong> 198.51.100.84:443 (Known Attacker Server)</p>
                    <p><strong>Action Taken:</strong> Connection Dropped by Perimeter Firewall Rule</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-xs sm:text-sm text-foreground">
                    <strong>What You Do Here:</strong> Confirms whether the hacker stole any data. Since the connection was blocked, customer data was saved!
                  </div>
                </div>
              )}

              {activeConsoleTab === 'ticket' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-foreground">Incident Record & Escalation Form</span>
                    <Badge className="bg-indigo-600 text-white text-xs font-bold">Assigned to: Priya Sharma (L2)</Badge>
                  </div>
                  <div className="p-4 rounded-xl border bg-muted/20 text-xs sm:text-sm space-y-1.5 leading-relaxed">
                    <p><strong>L1 Summary Note:</strong> <em>"Michael Chen opened fake invoice .docm email. EDR terminated malicious powershell child process. Firewall blocked outbound connection. Recommending password reset and host isolation."</em></p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-xs sm:text-sm text-foreground">
                    <strong>What You Do Here:</strong> Clinical doctors pass patient notes to surgeons; L1 analysts pass clear 2-line notes to L2 Priya Di!
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Guided Next Action Beacon */}
          <div className="p-6 rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-r from-emerald-500/10 via-card to-emerald-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <Badge className="bg-emerald-600 text-white text-[11px] font-bold">
                👉 Your Guided Next Action: Step 5 of 11 Complete
              </Badge>
              <h4 className="font-extrabold text-base text-foreground">
                What is a "Lab"? Safe Flight Simulator Guarantee
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Next, Rajesh Sir explains why our labs are 100% safe sandbox flight simulators where you cannot break anything.
              </p>
            </div>

            <Button
              onClick={handleNext}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs h-11 px-7 rounded-xl shadow-md ring-4 ring-emerald-500/20 hover:ring-emerald-500/40 animate-pulse cursor-pointer shrink-0"
            >
              <span>Proceed to Chapter 2.2 →</span>
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================
          CHAPTER 2.2: What is a "Lab"? Safe Flight Simulator
         ======================================================== */}
      {currentChapter.id === 'topic-0-2-2' && (
        <div className="space-y-8 animate-fade-in">
          <MentorVoiceNote
            mentorName="Rajesh Kumar"
            mentorRole="Senior Mentor & Guide"
            avatarInitials="RK"
            gender="male"
            autoPlay={autoAudioEnabled}
            audioText="Many students get scared when they hear the word 'Lab'. They think it is a difficult science test or an exam. Listen to me: in our course, a Lab is just a flight simulator game! When airplane pilots train, they don't fly a real jumbo jet on Day 1. They sit in a safe simulator where crashing has zero consequences. Our labs are the exact same: you cannot break anything, and your mentor is right there with you!"
            displaySummary="A 'Lab' is NOT an exam! It is a safe flight simulator where someone guides every click."
          />

          <GuidedMentorBox
            mentor="rajesh"
            time="Lab Demystified"
            quote={
              <span>
                "Listen to me carefully: <strong>A 'Lab' is NOT an exam!</strong> You cannot delete real files, and you cannot break anything. It is a 100% safe flight simulator game where I guide your every click."
              </span>
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl border-2 border-emerald-500/30 bg-card space-y-2.5">
              <span className="text-3xl">🛡️</span>
              <h4 className="font-extrabold text-sm sm:text-base text-foreground">100% Zero-Risk Sandbox</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Click anything you like! Nothing real can be broken or deleted. It's your safe personal sandbox.
              </p>
            </div>

            <div className="p-6 rounded-2xl border-2 border-amber-500/30 bg-card space-y-2.5">
              <span className="text-3xl">🤝</span>
              <h4 className="font-extrabold text-sm sm:text-base text-foreground">Mentor Holding Your Hand</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                On the screen, Rajesh Sir or Priya Di highlights exactly which button to click.
              </p>
            </div>

            <div className="p-6 rounded-2xl border-2 border-sky-500/30 bg-card space-y-2.5">
              <span className="text-3xl">🔄</span>
              <h4 className="font-extrabold text-sm sm:text-base text-foreground">Unlimited Retries</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Made a mistake? No problem! Just press Reset and try again with zero penalty.
              </p>
            </div>
          </div>

          {/* Guided Next Action Beacon */}
          <div className="p-6 rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-r from-emerald-500/10 via-card to-emerald-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <Badge className="bg-emerald-600 text-white text-[11px] font-bold">
                👉 Your Guided Next Action: Step 6 of 11 Complete
              </Badge>
              <h4 className="font-extrabold text-base text-foreground">
                Ready for Your First Guided Flight Simulator Lab?
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                In the next chapter, follow Rajesh Sir's 3 instructions to inspect employee Rahul's alert and earn +50 XP!
              </p>
            </div>

            <Button
              onClick={handleNext}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs h-11 px-7 rounded-xl shadow-md ring-4 ring-emerald-500/20 hover:ring-emerald-500/40 animate-pulse cursor-pointer shrink-0"
            >
              <span>Try Guided Lab (Chapter 2.3) →</span>
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================
          CHAPTER 2.3: Your First Guided Lab Simulation
         ======================================================== */}
      {currentChapter.id === 'topic-0-2-3' && (
        <div className="space-y-8 animate-fade-in">
          <MentorVoiceNote
            mentorName="Rajesh Kumar"
            mentorRole="Senior Mentor & Guide"
            avatarInitials="RK"
            gender="male"
            autoPlay={autoAudioEnabled}
            audioText="Chalo, let's do your very first lab together right now! Look at the simulator box below. An alarm has popped up for an employee named Rahul in Delhi. Follow my instructions: Click Step 1 to open the log, then click Step 2 to verify with Rahul, and then Step 3 to close the case safely. Watch how easy it is!"
            displaySummary="Follow my voice! Click Step 1, Step 2, and Step 3 below to complete your first lab."
          />

          <GuidedMentorBox
            mentor="rajesh"
            time="Live Guided Lab"
            quote={
              <span>
                "Chalo dosto! Let's do your very first lab right now on this screen. Just follow my 3 instructions below. Watch how smooth it is!"
              </span>
            }
          />

          {/* Interactive Guided Mini-Lab Console */}
          <Card className="border-2 border-emerald-500/40 bg-card shadow-md rounded-2xl overflow-hidden">
            <CardHeader className="p-5 border-b bg-slate-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <FlaskConical className="w-5 h-5 text-emerald-400" />
                <span className="font-extrabold text-sm sm:text-base">Guided Lab 1: Verify the Midnight Alarm</span>
              </div>
              <Badge className="bg-emerald-600 text-white text-xs font-bold">
                Step {miniLabStep} of 3
              </Badge>
            </CardHeader>

            <CardContent className="p-6 space-y-5">
              {miniLabStep === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-900 dark:text-amber-200 font-semibold flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                    <span><strong>Rajesh Sir's Instruction:</strong> Click the blue button below to open the visitor log for Rahul.</span>
                  </div>

                  <div className="p-4 rounded-xl border bg-muted/20 text-xs sm:text-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground">Alert: Unknown Login Attempt</span>
                      <span className="text-muted-foreground font-mono">User: rahul.sales</span>
                    </div>
                    <p className="text-muted-foreground">Location: New Delhi Office WiFi • Timestamp: 02:15 AM</p>
                  </div>

                  <Button
                    onClick={() => setMiniLabStep(2)}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-xs sm:text-sm h-11 gap-2 cursor-pointer rounded-xl shadow-xs"
                  >
                    <Search className="w-4 h-4" />
                    Step 1: Open Visitor Log & Details
                  </Button>
                </div>
              )}

              {miniLabStep === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-900 dark:text-amber-200 font-semibold flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                    <span><strong>Rajesh Sir's Instruction:</strong> Good! Now click to verify why Rahul logged in at 2 AM.</span>
                  </div>

                  <div className="p-4 rounded-xl border bg-card text-xs sm:text-sm space-y-2">
                    <span className="font-bold text-foreground block">Employee Status Check:</span>
                    <p className="text-muted-foreground leading-relaxed">
                      Rahul submitted a travel memo: <em>"Attending US Client meeting at 2:00 AM IST from office room 4."</em>
                    </p>
                  </div>

                  <Button
                    onClick={() => setMiniLabStep(3)}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm h-11 gap-2 cursor-pointer rounded-xl shadow-xs"
                  >
                    <PhoneCall className="w-4 h-4" />
                    Step 2: Confirm Legitimate Business Meeting
                  </Button>
                </div>
              )}

              {miniLabStep === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 font-semibold flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span><strong>Rajesh Sir's Instruction:</strong> Rahul's meeting was approved! Click below to close the case as Safe.</span>
                  </div>

                  <Button
                    onClick={() => {
                      setMiniLabDone(true);
                      onCompleteTopic('topic-0-2-3', 50);
                      addXP(50);
                      showToast({
                        type: 'success',
                        title: 'Lab Completed! 🎉',
                        description: 'You completed your first guided lab and earned +50 XP!',
                      });
                    }}
                    disabled={miniLabDone}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm h-11 gap-2 cursor-pointer rounded-xl shadow-xs"
                  >
                    <Check className="w-4 h-4" />
                    Step 3: Close Ticket as Harmless (False Alarm)
                  </Button>

                  {miniLabDone && (
                    <div className="p-5 rounded-2xl border border-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 text-xs sm:text-sm space-y-2 animate-fade-in">
                      <div className="flex items-center gap-2 font-bold text-base">
                        <PartyPopper className="w-6 h-6 text-emerald-600 shrink-0" />
                        <span>Congratulations! You Just Completed Your First Lab 🎉</span>
                      </div>
                      <p className="leading-relaxed">
                        See how simple it was? No coding, no complicated math—just following 3 guided steps with your mentor. +50 XP awarded!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Guided Next Action Beacon */}
          <div className="p-6 rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-r from-emerald-500/10 via-card to-emerald-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <Badge className="bg-emerald-600 text-white text-[11px] font-bold">
                👉 Your Guided Next Action: Unit 2 Milestone (+100 XP)
              </Badge>
              <h4 className="font-extrabold text-base text-foreground">
                Pass Unit 2 Quick Check & Unlock the 5-Stage Triage Flow
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Earn another +100 XP and advance to Unit 3 to master the exact Module 04 End-to-End Triage Flow!
              </p>
            </div>

            <Button
              onClick={handleNext}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs h-11 px-7 rounded-xl shadow-md ring-4 ring-emerald-500/20 hover:ring-emerald-500/40 animate-pulse cursor-pointer shrink-0"
            >
              <span>Take Unit 2 Check (+100 XP) →</span>
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================
          CHAPTER 2.4: Unit 2 Quick Check Assessment
         ======================================================== */}
      {currentChapter.id === 'unit-0-2-assessment' && (
        <div className="space-y-8 animate-fade-in">
          <GuidedMentorBox
            mentor="rajesh"
            time="Unit 2 Milestone"
            quote={
              <span>
                "You just experienced how labs work! Quick question to lock in your Unit 2 points:"
              </span>
            }
          />

          <Card className="border-2 border-emerald-500/40 bg-card shadow-sm rounded-2xl">
            <CardHeader className="p-6 pb-4 border-b">
              <div className="flex items-center justify-between">
                <Badge className="bg-emerald-600 text-white text-xs font-bold">Unit 2 Assessment</Badge>
                <span className="text-sm font-bold text-emerald-600 font-mono">+100 XP Reward</span>
              </div>
              <CardTitle className="text-xl font-bold mt-2">
                If you ever get stuck or make a mistake during a lab, what happens?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[
                { id: 0, text: 'You are permanently banned from the course' },
                { id: 1, text: 'Nothing bad! It is a safe sandbox with unlimited retries and guided step-by-step instructions' },
                { id: 2, text: 'Your laptop files get deleted' },
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => !quizSubmitted && setQuizAnswer(opt.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-xs sm:text-sm font-semibold ${
                    quizAnswer === opt.id
                      ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/40 bg-card'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border flex items-center justify-center text-xs shrink-0 font-mono">
                      {opt.id + 1}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                </div>
              ))}

              <Button
                onClick={() => {
                  setQuizSubmitted(true);
                  if (onCompleteUnitAssessment) onCompleteUnitAssessment('unit-0-2');
                  onCompleteTopic('unit-0-2-assessment', 100);
                  addXP(100);
                  showToast({
                    type: 'success',
                    title: 'Unit 2 Passed! 🎉',
                    description: 'You earned 100 XP! Unit 3 is now unlocked.',
                  });
                }}
                className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-11 rounded-xl cursor-pointer shadow-sm"
              >
                Submit & Unlock Unit 3 (+100 XP)
              </Button>

              {quizSubmitted && (
                <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 text-xs sm:text-sm space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2 font-bold text-base">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Unit 2 Complete! 🎉</span>
                  </div>
                  <Button onClick={handleNext} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-10 rounded-xl">
                    Proceed to Unit 3: Module 04 End-to-End Triage Flow →
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* ========================================================
          CHAPTER 3.1: Module 04 End-to-End Triage Flow: 5 Stages of an Incident
         ======================================================== */}
      {currentChapter.id === 'topic-0-3-1' && (
        <div className="space-y-8 animate-fade-in">
          {/* Priya Sharma narrates the End-to-End Flow */}
          <MentorVoiceNote
            mentorName="Priya Sharma"
            mentorRole="Senior Incident Responder"
            avatarInitials="PS"
            gender="female"
            autoPlay={autoAudioEnabled}
            avatarBg="bg-gradient-to-br from-indigo-600 to-purple-600 text-white"
            audioText="Welcome to the heart of Module Four! Here is the complete end-to-end flow of how an incident travels through the SOC. From the moment the alert rings in your queue, to extracting the four anchors, cross-checking evidence, stopping the threat, and handing off the ticket to me. Follow the five stages below!"
            displaySummary="The 5-Stage Life of an Incident: Monitor, Inspect, Cross-Check, Respond, and Handover!"
          />

          <GuidedMentorBox
            mentor="priya"
            time="Triage Workflow"
            quote={
              <span>
                "In Module 4, every alert follows this exact 5-stage lifecycle. Once you (L1) confirm real trouble, you hand the baton to me (L2) to contain the threat. Look at how each stage connects!"
              </span>
            }
          />

          {/* 5-Stage Pipeline Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {[
              { id: 0, name: '1. Monitor & Catch', icon: '📥', desc: 'Claim alert from queue' },
              { id: 1, name: '2. Inspect & Extract', icon: '🔍', desc: 'The 4 Anchors (Who/What)' },
              { id: 2, name: '3. Cross-Check', icon: '📷', desc: 'Email + EDR + Firewall' },
              { id: 3, name: '4. Respond & Stop', icon: '🛑', desc: 'Isolate host & reset pass' },
              { id: 4, name: '5. Record & Share', icon: '✍️', desc: 'Handoff ticket to Priya Di' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveFlowStage(s.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeFlowStage === s.id
                    ? 'border-indigo-500 bg-indigo-500/10 ring-2 ring-indigo-500/30 shadow-xs scale-102'
                    : 'border-border bg-card hover:border-indigo-500/40'
                }`}
              >
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="font-extrabold text-xs sm:text-sm text-foreground">{s.name}</div>
                <div className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">{s.desc}</div>
              </button>
            ))}
          </div>

          {/* Stage Details Card */}
          <Card className="border-2 border-indigo-500/30 bg-card rounded-2xl shadow-sm animate-fade-in">
            <CardContent className="p-6 sm:p-7 space-y-4">
              {activeFlowStage === 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="font-black text-base sm:text-lg text-foreground flex items-center gap-2">
                      <span className="text-2xl">📥</span> Stage 1: Monitor & Catch (09:20 AM)
                    </h4>
                    <Badge className="bg-indigo-600 text-white text-xs">Action: Claim Alert</Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Alert <strong>SEC-2026-0412</strong> appears in your incoming queue, red and pulsing. Priority: Medium-High. Affected User: Michael Chen. You click <strong>"Accept Alert"</strong> so your team knows: <em>"I am looking at this."</em>
                  </p>
                  <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 text-xs text-indigo-900 dark:text-indigo-200 font-semibold">
                    Rajesh: "If nobody claims it, the alert sits unnoticed while an attacker might be moving inside. Claiming it takes ownership!"
                  </div>
                </div>
              )}

              {activeFlowStage === 1 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="font-black text-base sm:text-lg text-foreground flex items-center gap-2">
                      <span className="text-2xl">🔍</span> Stage 2: Inspect & Extract (The 4 Anchors)
                    </h4>
                    <Badge className="bg-indigo-600 text-white text-xs">Action: Extract Facts</Badge>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
                    <div className="p-3 rounded-xl border bg-muted/20">
                      <span className="text-muted-foreground block text-[10px]">WHO:</span>
                      <strong className="text-foreground">Michael Chen (Finance)</strong>
                    </div>
                    <div className="p-3 rounded-xl border bg-muted/20">
                      <span className="text-muted-foreground block text-[10px]">WHERE:</span>
                      <strong className="text-foreground">Host FIN-047</strong>
                    </div>
                    <div className="p-3 rounded-xl border bg-muted/20">
                      <span className="text-muted-foreground block text-[10px]">WHAT:</span>
                      <strong className="text-foreground">Word ran PowerShell</strong>
                    </div>
                    <div className="p-3 rounded-xl border bg-muted/20">
                      <span className="text-muted-foreground block text-[10px]">WHEN:</span>
                      <strong className="text-foreground">09:19 AM Monday</strong>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 text-xs text-indigo-900 dark:text-indigo-200 font-semibold">
                    Priya: "Michael is in Finance, not IT. Why would Word launch PowerShell on his computer? These 4 anchors are your solid foundation!"
                  </div>
                </div>
              )}

              {activeFlowStage === 2 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="font-black text-base sm:text-lg text-foreground flex items-center gap-2">
                      <span className="text-2xl">📷</span> Stage 3: Observe & Cross-Check (Correlating Cameras)
                    </h4>
                    <Badge className="bg-indigo-600 text-white text-xs">Action: Verify Proof</Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    You check across three security consoles in SIEM:
                  </p>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-muted-foreground pl-2">
                    <li>• <strong>Email Gateway:</strong> Fake invoice arrived at 09:18 AM from spoofed sender.</li>
                    <li>• <strong>EDR Sensor:</strong> Word opened PowerShell script at 09:19 AM.</li>
                    <li>• <strong>Firewall:</strong> Blocked outbound connection to attacker IP at 09:19 AM.</li>
                  </ul>
                  <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 text-xs text-indigo-900 dark:text-indigo-200 font-semibold">
                    Rajesh: "One tool can make a mistake. But when all three cameras show the exact same story at the exact same minute, you have solid proof of real danger!"
                  </div>
                </div>
              )}

              {activeFlowStage === 3 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="font-black text-base sm:text-lg text-foreground flex items-center gap-2">
                      <span className="text-2xl">🛑</span> Stage 4: Respond & Stop (Containment)
                    </h4>
                    <Badge className="bg-rose-600 text-white text-xs">Verdict: True Positive</Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    This is NOT burnt toast—it is a <strong>True Positive</strong>! The attacker script was terminated by EDR, but Michael's laptop is isolated and his password must be reset immediately before credentials can be stolen.
                  </p>
                  <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 text-xs text-indigo-900 dark:text-indigo-200 font-semibold">
                    Priya: "Respond means stopping the danger from spreading to other computers. You isolate the laptop and reset credentials!"
                  </div>
                </div>
              )}

              {activeFlowStage === 4 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="font-black text-base sm:text-lg text-foreground flex items-center gap-2">
                      <span className="text-2xl">✍️</span> Stage 5: Record & Share (Escalation to L2)
                    </h4>
                    <Badge className="bg-emerald-600 text-white text-xs">Action: Ticket Handover</Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    You fill in the case record with a 2-line summary: <em>"Malicious Word macro executed by Michael Chen; EDR blocked execution; machine isolated. Escalating to Priya Sharma (L2) for deep cleanup."</em>
                  </p>
                  <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 text-xs text-indigo-900 dark:text-indigo-200 font-semibold">
                    Priya: "Your clear 2-line note allows me to jump into action instantly without asking Michael to repeat everything. That is teamwork in action!"
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Guided Next Action Beacon */}
          <div className="p-6 rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-r from-emerald-500/10 via-card to-emerald-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <Badge className="bg-emerald-600 text-white text-[11px] font-bold">
                👉 Your Guided Next Action: Step 9 of 11 Complete
              </Badge>
              <h4 className="font-extrabold text-base text-foreground">
                See What Modules Are Covered: The Complete 18-Module Flow
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                In the next chapter, see the complete course roadmap from Module 00 all the way to L1 Certification!
              </p>
            </div>

            <Button
              onClick={handleNext}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs h-11 px-7 rounded-xl shadow-md ring-4 ring-emerald-500/20 hover:ring-emerald-500/40 animate-pulse cursor-pointer shrink-0"
            >
              <span>Explore Course Flow (Chapter 3.2) →</span>
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================
          CHAPTER 3.2: Complete Course Flow: What Modules Are Covered
         ======================================================== */}
      {currentChapter.id === 'topic-0-3-2' && (
        <div className="space-y-8 animate-fade-in">
          <MentorVoiceNote
            mentorName="Rajesh Kumar"
            mentorRole="Senior Mentor & Guide"
            avatarInitials="RK"
            gender="male"
            autoPlay={autoAudioEnabled}
            audioText="Here is my golden advice: don't try to study 8 hours in a single night. Just give 15 to 20 minutes a day with your morning chai or evening tea. Look at the complete four-stage roadmap below: from non-IT basics in Modules 1 to 3, to our live simulation in Module 4, threat hunting, and final L1 certification. You will conquer this step-by-step!"
            displaySummary="Consistency beats cramming: 15-20 minutes a day with your chai! Look at the full curriculum flow below."
          />

          <GuidedMentorBox
            mentor="rajesh"
            time="Course Flow Briefing"
            quote={
              <span>
                "Chai piyo, aur 15 minute padho! Here is how our entire curriculum is structured across 4 clear stages from complete beginner to certified analyst."
              </span>
            }
          />

          {/* 4-Stage Curriculum Roadmap */}
          <div className="p-6 sm:p-7 rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-background space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
              <div>
                <Badge className="bg-primary text-white text-xs font-bold uppercase tracking-wider mb-1">
                  Complete Curriculum Map • Modules 00 to 18
                </Badge>
                <h3 className="text-xl sm:text-2xl font-black text-foreground">
                  What Modules Are Covered in This Course?
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
                <span className="text-xs font-mono font-bold text-muted-foreground">
                  Auto-Highlighting Stage {activeCurriculumPhase + 1} of 4
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { phase: 0, label: 'Stage 1: Foundations', mods: 'Mods 00 - 03', icon: '🌱' },
                { phase: 1, label: 'Stage 2: Core SOC Operations', mods: 'Mods 04 - 08', icon: '🛡️' },
                { phase: 2, label: 'Stage 3: Advanced Defense', mods: 'Mods 09 - 13', icon: '🎯' },
                { phase: 3, label: 'Stage 4: Incident & Career', mods: 'Mods 14 - 18', icon: '🏆' },
              ].map((p) => {
                const isActive = activeCurriculumPhase === p.phase;
                return (
                  <button
                    key={p.phase}
                    onClick={() => setActiveCurriculumPhase(p.phase)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'border-primary bg-primary/10 ring-2 ring-primary/30 shadow-xs scale-102'
                        : 'border-border bg-card hover:border-primary/40'
                    }`}
                  >
                    <div className="text-2xl mb-1">{p.icon}</div>
                    <div className="font-extrabold text-xs sm:text-sm text-foreground">{p.label}</div>
                    <div className="text-[11px] font-mono text-muted-foreground mt-0.5">{p.mods}</div>
                  </button>
                );
              })}
            </div>

            <div className="p-6 rounded-2xl border-2 border-primary/20 bg-card shadow-xs space-y-4 animate-fade-in">
              {activeCurriculumPhase === 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-emerald-600 text-white text-xs font-bold">Stage 1 • Foundations (Non-IT Friendly)</Badge>
                    <span className="text-xs font-mono font-bold text-emerald-600">15 mins/day</span>
                  </div>
                  <h4 className="text-lg font-black text-foreground">Building Your Superpower Without Fear</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-foreground shrink-0">• Module 00:</span> Course Introduction & Orientation Primer (1.5 hrs — You are completing this now!)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-foreground shrink-0">• Module 01:</span> Computer Fundamentals & Hardware (CPUs, Memory, Storage demystified)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-foreground shrink-0">• Module 02:</span> Operating Systems (Windows & Linux essentials without memorizing code)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-foreground shrink-0">• Module 03:</span> Networking, Ports & IP Traffic (How the internet postal highway works)
                    </li>
                  </ul>
                </div>
              )}

              {activeCurriculumPhase === 1 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-amber-600 text-white text-xs font-bold">Stage 2 • Core SOC Operations (The Real Work)</Badge>
                    <span className="text-xs font-mono font-bold text-amber-600">Simulated Consoles</span>
                  </div>
                  <h4 className="text-lg font-black text-foreground">Operating the Security Operations Control Room</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-foreground shrink-0">• Module 04:</span> Guided SOC Operations & Live SIEM Triage Simulator (Rajesh & Priya guide every alert!)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-foreground shrink-0">• Module 05:</span> Security Logs & SIEM Navigation (Splunk & Elastic dashboards)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-foreground shrink-0">• Module 06:</span> Phishing Email Analysis (Identifying fake delivery notifications & scam links)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-foreground shrink-0">• Module 07:</span> Malware Behavior & Safe Sandboxing (Inspecting viruses in sealed environments)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-foreground shrink-0">• Module 08:</span> Network Traffic & Sniffing (Wireshark packet flows simplified)
                    </li>
                  </ul>
                </div>
              )}

              {activeCurriculumPhase === 2 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-sky-600 text-white text-xs font-bold">Stage 3 • Advanced Threat Hunting & Defense</Badge>
                    <span className="text-xs font-mono font-bold text-sky-600">Specialist Tools</span>
                  </div>
                  <h4 className="text-lg font-black text-foreground">Hunting Active Attackers Across Systems</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-foreground shrink-0">• Module 09:</span> EDR (Endpoint Detection & Response) with CrowdStrike & Defender
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-foreground shrink-0">• Module 10:</span> Cyber Threat Intelligence & Indicator Searching (VirusTotal, AlienVault)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-foreground shrink-0">• Module 11:</span> Memory Forensics & Process Tree Analysis
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-foreground shrink-0">• Module 12:</span> Cloud Security (AWS, Azure & Google Cloud identity triage)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-foreground shrink-0">• Module 13:</span> Active Threat Hunting Strategies & MITRE ATT&CK Mapping
                    </li>
                  </ul>
                </div>
              )}

              {activeCurriculumPhase === 3 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-purple-600 text-white text-xs font-bold">Stage 4 • Incident Response & Career Readiness</Badge>
                    <span className="text-xs font-mono font-bold text-purple-600">Job Ready 🏆</span>
                  </div>
                  <h4 className="text-lg font-black text-foreground">Landing Your First L1 SOC Analyst Role</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-foreground shrink-0">• Module 14:</span> Incident Containment, Eradication & Recovery
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-foreground shrink-0">• Module 15:</span> Digital Forensics & Chain of Custody
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-foreground shrink-0">• Module 16:</span> SOC Metrics, SLAs, Ticketing & Shift Handover
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-foreground shrink-0">• Module 17:</span> Technical Interview Preparation & Real Incident Scenarios
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-foreground shrink-0">• Module 18:</span> L1 SOC Analyst Practical Capstone & Verified Certification
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Guided Next Action Beacon */}
          <div className="p-6 rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-r from-emerald-500/10 via-card to-emerald-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <Badge className="bg-emerald-600 text-white text-[11px] font-bold">
                👉 Your Guided Next Action: Final Milestone Step
              </Badge>
              <h4 className="font-extrabold text-base text-foreground">
                Graduate from Course Orientation & Unlock Your Cadet Badge!
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Earn your final +100 XP, claim your verified Course Orientation Cadet Badge, and return to your dashboard.
              </p>
            </div>

            <Button
              onClick={handleNext}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs h-11 px-7 rounded-xl shadow-md ring-4 ring-emerald-500/20 hover:ring-emerald-500/40 animate-pulse cursor-pointer shrink-0"
            >
              <span>Graduate & Claim Badge (+100 XP) →</span>
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================
          CHAPTER 3.3: Course Graduation Check & Cadet Badge
         ======================================================== */}
      {currentChapter.id === 'unit-0-3-assessment' && (
        <div className="space-y-8 animate-fade-in">
          <GuidedMentorBox
            mentor="rajesh"
            time="Graduation"
            quote={
              <span>
                "Badhai ho! You have completed the entire 1.5-hour Course Introduction. You are now 100% prepared to begin your learning journey with zero fear!"
              </span>
            }
          />

          <Card className="border-2 border-emerald-500/40 bg-card shadow-lg text-center p-8 space-y-5 rounded-3xl">
            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center text-4xl mx-auto ring-8 ring-emerald-50 dark:ring-emerald-950/30">
              🎓
            </div>

            <div className="space-y-2">
              <Badge className="bg-emerald-600 text-white text-xs uppercase font-bold tracking-wider">
                Orientation Complete • 1.5 Hours Completed
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                You Are Ready for the Cybersecurity Journey!
              </h2>
              <p className="text-xs sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                You now understand what we do, how our safe guided labs work, the detective mindset, the 5 consoles, and the complete 18-module roadmap. No technical jargon can intimidate you!
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-emerald-950 dark:text-emerald-100 font-semibold max-w-md mx-auto space-y-1.5 shadow-2xs">
              <p>🏆 Badge Unlocked: <strong>"Course Orientation Cadet"</strong></p>
              <p>⚡ Total Milestone Reward: <strong>+100 XP</strong></p>
              <p>🛡️ Status: <strong>Ready for Module 01 & Beyond</strong></p>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={() => {
                  onCompleteTopic('unit-0-3-assessment', 100);
                  if (onCompleteUnitAssessment) onCompleteUnitAssessment('unit-0-3');
                  addXP(100);
                  showToast({
                    type: 'success',
                    title: 'Course Introduction Completed! 🎓',
                    description: 'Congratulations! You earned your Orientation Cadet badge.',
                  });
                  onBackToOverview();
                }}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm h-12 px-8 gap-2 rounded-xl shadow-md cursor-pointer"
              >
                <Award className="w-5 h-5" />
                Finish Orientation & Return to Dashboard
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
