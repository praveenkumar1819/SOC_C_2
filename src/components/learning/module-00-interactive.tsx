'use client';

import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Server,
  Activity,
  Terminal,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Database,
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
  Award,
  Layers,
  Smile,
  Compass,
  FileSpreadsheet,
  Mail,
  Zap,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// =========================================================================
// TOPIC 0-1-1: Everyday Analogy Matcher (Physical vs Digital Security)
// =========================================================================
export function Interactive011() {
  const items = [
    {
      id: 'item-1',
      physical: 'Security Guard in CCTV Room',
      digital: 'L1 SOC Analyst',
      icon: '🛡️',
      explanation: 'Both monitor security screens 24/7, evaluate incoming alarms, and respond quickly to protect the facility.',
    },
    {
      id: 'item-2',
      physical: 'Lobby Visitor Sign-in Book',
      digital: 'Computer Security Event Logs',
      icon: '📋',
      explanation: 'Both maintain an itemized record of every person or system that arrived, what door they opened, and when.',
    },
    {
      id: 'item-3',
      physical: 'Kitchen Smoke Detector Alarm',
      digital: 'SIEM Alert Notification',
      icon: '🚨',
      explanation: 'Both emit an automated warning when a trigger threshold is breached so a human can investigate immediately.',
    },
    {
      id: 'item-4',
      physical: 'Bank Vault with Combination Lock',
      digital: 'Protected Database Server',
      icon: '🏦',
      explanation: 'Both hold high-value confidential assets guarded by strict access controls and multiple layers of authentication.',
    },
  ];

  const [selectedPhysical, setSelectedPhysical] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSelectPhysical = (id: string) => {
    setSelectedPhysical(id);
    setFeedback(null);
  };

  const handleMatchDigital = (digitalName: string) => {
    if (!selectedPhysical) return;
    const targetItem = items.find((i) => i.id === selectedPhysical);
    if (targetItem) {
      if (targetItem.digital === digitalName) {
        setMatches((prev) => ({ ...prev, [selectedPhysical]: digitalName }));
        setFeedback(`✅ Correct match! ${targetItem.physical} = ${targetItem.digital}`);
        setSelectedPhysical(null);
      } else {
        setFeedback(`❌ Not quite! Think about the primary purpose of "${targetItem.physical}". Try again!`);
      }
    }
  };

  const isAllMatched = Object.keys(matches).length === items.length;

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Interactive Exercise: The Real-World Analogy Matcher
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Click an everyday physical security concept on the left, then click its digital cybersecurity twin on the right.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setMatches({});
            setSelectedPhysical(null);
            setFeedback(null);
          }}
          className="h-8 text-xs gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>

      {feedback && (
        <div className={`p-3 rounded-xl border text-xs font-semibold animate-fade-in ${
          feedback.startsWith('✅') ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'
        }`}>
          {feedback}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column: Physical Security */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            1. Physical Security Concept (Click to Select)
          </span>
          {items.map((item) => {
            const isMatched = !!matches[item.id];
            const isSelected = selectedPhysical === item.id;

            return (
              <div
                key={item.id}
                onClick={() => !isMatched && handleSelectPhysical(item.id)}
                className={`p-3.5 rounded-xl border transition-all ${
                  isMatched
                    ? 'border-emerald-300 bg-emerald-50/40 text-emerald-900 opacity-80 cursor-default'
                    : isSelected
                    ? 'border-primary bg-primary/10 ring-2 ring-primary/30 cursor-pointer shadow-xs'
                    : 'border-border bg-card hover:border-primary/50 cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-semibold text-xs text-foreground">{item.physical}</span>
                  </div>
                  {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Digital SOC Twin */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            2. Digital SOC Twin (Click to Pair)
          </span>
          {['Protected Database Server', 'L1 SOC Analyst', 'SIEM Alert Notification', 'Computer Security Event Logs'].map((digitalName) => {
            const matchedKey = Object.keys(matches).find((k) => matches[k] === digitalName);
            const isMatched = !!matchedKey;

            return (
              <div
                key={digitalName}
                onClick={() => !isMatched && handleMatchDigital(digitalName)}
                className={`p-3.5 rounded-xl border transition-all ${
                  isMatched
                    ? 'border-emerald-300 bg-emerald-50/40 text-emerald-900 cursor-default'
                    : selectedPhysical
                    ? 'border-primary/50 bg-primary/5 hover:bg-primary/20 cursor-pointer'
                    : 'border-border bg-card/60 opacity-70 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-foreground">{digitalName}</span>
                  {isMatched ? (
                    <Badge variant="outline" className="text-[10px] bg-emerald-100 text-emerald-800 border-emerald-300">
                      Matched ✓
                    </Badge>
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isAllMatched && (
        <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/60 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <div>
            <h5 className="font-bold text-xs text-emerald-950">Outstanding! All Analogies Correctly Paired 🎉</h5>
            <p className="text-[11px] text-emerald-800 mt-0.5">
              You have established the fundamental bridge between everyday physical security and enterprise digital defense.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// TOPIC 0-1-2: Tech Jargon Translator (Interactive Decoder)
// =========================================================================
export function Interactive012() {
  const terms = [
    {
      id: 'ip',
      name: 'IP Address',
      jargon: 'Internet Protocol Version 4/6 Network Layer Address',
      plainEnglish: 'Your Computer\'s Phone Number or Home Street Address',
      analogy: 'Without a street address, the postal truck has no idea where to deliver packages. With an IP address, the internet delivers web pages to your exact screen.',
      sampleValue: '192.168.1.45 (Home) / 142.250.190.46 (Google)',
      icon: '📍',
    },
    {
      id: 'port',
      name: 'Port Number',
      jargon: 'Transport Layer Logical Communication Endpoint',
      plainEnglish: 'The Apartment Door Number Inside a Large Building',
      analogy: 'If the IP address is the main building address, the Port is the apartment door number. Door 80 is the front lobby (web), Door 443 is the secure vault room (encrypted web).',
      sampleValue: 'Port 80 (HTTP) • Port 443 (HTTPS) • Port 22 (SSH)',
      icon: '🚪',
    },
    {
      id: 'log',
      name: 'Log / Telemetry',
      jargon: 'System Journal Audit Trail Event Record',
      plainEnglish: 'An Itemized Cash Register Receipt or Airplane Black Box',
      analogy: 'Every single click, file opening, or password attempt generates an unchangeable receipt with the exact second, user name, and computer name.',
      sampleValue: '2026-10-01 09:14:02 | User: john.doe | Action: FileOpen | File: /Q3_Report.xlsx',
      icon: '🧾',
    },
    {
      id: 'firewall',
      name: 'Firewall',
      jargon: 'Packet-Filtering Stateful Network Boundary Control',
      plainEnglish: 'The Security Guard Booth at a Gated Community Entrance',
      analogy: 'The guard looks at every incoming car: If you are an invited guest with a valid badge, the gate opens. If you are uninvited or on a banned list, you are turned away.',
      sampleValue: 'Rule: Allow Port 443 from Any | Block Port 23 (Telnet) from Public WAN',
      icon: '🚧',
    },
  ];

  const [activeTermId, setActiveTermId] = useState<string>('ip');
  const activeTerm = terms.find((t) => t.id === activeTermId) || terms[0];

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
            <Compass className="w-4 h-4 text-primary" />
            Interactive Tech Jargon Translator
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Click any term below to strip away the confusing jargon and see what it actually means.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {terms.map((term) => (
          <button
            key={term.id}
            onClick={() => setActiveTermId(term.id)}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeTermId === term.id
                ? 'border-primary bg-primary/10 ring-2 ring-primary/20 shadow-xs'
                : 'border-border bg-card hover:border-primary/40'
            }`}
          >
            <div className="text-lg">{term.icon}</div>
            <div className="font-bold text-xs text-foreground mt-1">{term.name}</div>
            <div className="text-[10px] text-muted-foreground line-clamp-1">{term.plainEnglish}</div>
          </button>
        ))}
      </div>

      <div className="p-5 rounded-2xl border bg-card space-y-4 shadow-xs animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{activeTerm.icon}</span>
            <div>
              <h5 className="font-extrabold text-base text-foreground">{activeTerm.name}</h5>
              <p className="text-xs text-rose-600 line-through">Jargon: {activeTerm.jargon}</p>
            </div>
          </div>
          <Badge className="bg-emerald-600 text-white text-xs self-start sm:self-auto">
            Plain English Decoded ✓
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 p-3.5 rounded-xl bg-primary/5 border border-primary/20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              What it actually is:
            </span>
            <p className="font-semibold text-sm text-foreground">{activeTerm.plainEnglish}</p>
            <p className="text-xs text-muted-foreground leading-relaxed pt-1">
              {activeTerm.analogy}
            </p>
          </div>

          <div className="space-y-1.5 p-3.5 rounded-xl bg-muted/40 border font-mono">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-sans">
              Real-World Data Example:
            </span>
            <div className="p-2.5 rounded-lg bg-slate-950 text-emerald-400 text-xs break-all">
              {activeTerm.sampleValue}
            </div>
            <p className="text-[11px] text-muted-foreground font-sans pt-1">
              Analysts read this data just like reading an itemized receipt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 0-1-3: Threat Detective (Spot Phishing & Scam Signals)
// =========================================================================
export function Interactive013() {
  const emails = [
    {
      id: 'em-1',
      title: 'Urgent Netflix Account Notice',
      sender: 'billing-alert@netfl1x-security-renew.cc',
      subject: 'URGENT: Your account will be closed in 1 hour!',
      body: 'Dear customer, your last payment failed. Click the secure link below within 60 minutes or all viewing profiles will be deleted permanently.',
      buttonText: 'Verify Credit Card Now',
      realUrl: 'http://netfl1x-security-renew.cc/steal.php',
      isPhishing: true,
      redFlags: [
        'Sender domain is "netfl1x-security-renew.cc", not "netflix.com"',
        'Extreme urgency ("in 1 hour") designed to induce panic',
        'Generic greeting ("Dear customer") without your real name',
      ],
    },
    {
      id: 'em-2',
      title: 'Company Holiday Schedule',
      sender: 'hr-announcements@acmecorp.com',
      subject: 'Acme Corp: Upcoming Thanksgiving & Winter Holiday Dates',
      body: 'Team, please review the approved holiday office closure dates for November and December on the corporate SharePoint intranet.',
      buttonText: 'View Holiday Calendar on SharePoint',
      realUrl: 'https://acmecorp.sharepoint.com/sites/hr/holidays',
      isPhishing: false,
      redFlags: [
        'Legitimate internal company domain (@acmecorp.com)',
        'Links directly to internal company SharePoint site',
        'No pressure, no password requests, no urgent threats',
      ],
    },
  ];

  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [userVerdict, setUserVerdict] = useState<Record<string, boolean>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const email = emails[currentEmailIndex];
  const isAnswered = userVerdict[email.id] !== undefined;
  const isCorrect = userVerdict[email.id] === email.isPhishing;

  const handleVote = (voteIsPhishing: boolean) => {
    setUserVerdict((prev) => ({ ...prev, [email.id]: voteIsPhishing }));
    setShowExplanation(true);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            Threat Detective: Phishing or Legitimate?
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Inspect the simulated email below and decide: Is it a phishing trick or legitimate mail?
          </p>
        </div>
        <div className="flex items-center gap-2">
          {emails.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentEmailIndex(idx);
                setShowExplanation(false);
              }}
              className={`w-6 h-6 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentEmailIndex === idx
                  ? 'bg-primary text-primary-foreground'
                  : userVerdict[emails[idx].id] !== undefined
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 rounded-2xl border bg-card space-y-4 shadow-xs">
        {/* Email Header Simulation */}
        <div className="space-y-2 border-b pb-3 font-mono text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="text-muted-foreground font-sans font-semibold">From:</span>
            <span className="text-foreground bg-muted/60 px-2 py-0.5 rounded break-all">{email.sender}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="text-muted-foreground font-sans font-semibold">Subject:</span>
            <span className="font-bold text-foreground">{email.subject}</span>
          </div>
        </div>

        {/* Email Body */}
        <div className="space-y-3 py-2 text-sm text-foreground leading-relaxed">
          <p>{email.body}</p>
          <div className="pt-2">
            <span className="inline-block px-4 py-2 rounded-lg bg-primary text-white font-semibold text-xs cursor-pointer shadow-xs">
              {email.buttonText}
            </span>
            <p className="text-[10px] text-muted-foreground font-mono mt-1">
              Destination URL on hover: <span className="text-foreground underline">{email.realUrl}</span>
            </p>
          </div>
        </div>

        {/* Voting Buttons */}
        <div className="pt-3 border-t flex flex-col sm:flex-row items-center gap-3">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Your Decision as an Analyst:
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              size="sm"
              variant={isAnswered && userVerdict[email.id] === true ? 'default' : 'outline'}
              onClick={() => handleVote(true)}
              className="flex-1 sm:flex-none border-rose-300 hover:bg-rose-50 hover:text-rose-900 gap-1.5 text-xs font-bold"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              Phishing Scam ⚠️
            </Button>
            <Button
              size="sm"
              variant={isAnswered && userVerdict[email.id] === false ? 'default' : 'outline'}
              onClick={() => handleVote(false)}
              className="flex-1 sm:flex-none border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900 gap-1.5 text-xs font-bold"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Legitimate Email ✓
            </Button>
          </div>
        </div>

        {showExplanation && (
          <div className={`p-4 rounded-xl border text-xs space-y-2 animate-fade-in ${
            isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {isCorrect ? '🎯 Spot on!' : '⚠️ Review the clues carefully:'}
              <span>{email.isPhishing ? 'This is a Phishing Scam!' : 'This is a Legitimate Email.'}</span>
            </div>
            <ul className="space-y-1 list-disc list-inside pt-1">
              {email.redFlags.map((flag, idx) => (
                <li key={idx} className="leading-relaxed">{flag}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 0-2-1: 5-Step Learning Loop Interactive Explorer
// =========================================================================
export function Interactive021() {
  const steps = [
    {
      num: 1,
      title: 'Theory & Core Concept',
      desc: '4-6 bite-sized lines in plain English. No jargon without an explanation.',
      icon: '📖',
      highlight: 'Click any blue term to pop up the glossary explanation immediately.',
    },
    {
      num: 2,
      title: 'Visual Story Demo',
      desc: 'Step-by-step animation showing attacker actions and defense telemetry.',
      icon: '🎬',
      highlight: 'You can pause, rewind, and advance at your own comfortable pace.',
    },
    {
      num: 3,
      title: 'Interactive SOC Simulator',
      desc: 'Zero-risk hands-on dashboard right in your browser.',
      highlight: 'Practice assigning roles, triaging alerts, and filtering logs safely.',
      icon: '💻',
    },
    {
      num: 4,
      title: 'Real-World Field Context',
      desc: 'Operational best practices and the mindset you need on shift.',
      highlight: 'Learn what managers actually look for in junior SOC analysts.',
      icon: '🛡️',
    },
    {
      num: 5,
      title: 'Chapter Knowledge Check',
      desc: 'Interactive drag-and-drop, matching, or triage scenarios.',
      highlight: 'Solve it to unlock +35 to +50 XP and open the next chapter.',
      icon: '🏆',
    },
  ];

  const [activeStep, setActiveStep] = useState(1);
  const cur = steps.find((s) => s.num === activeStep) || steps[0];

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            Interactive Explorer: The 5-Step Learning Loop
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Click through each phase of a chapter to see how active learning helps you retain concepts 10x faster.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {steps.map((s) => (
          <button
            key={s.num}
            onClick={() => setActiveStep(s.num)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold shrink-0 cursor-pointer transition-all ${
              activeStep === s.num
                ? 'bg-primary text-white border-primary shadow-xs'
                : 'bg-card text-muted-foreground hover:text-foreground border-border'
            }`}
          >
            <span>{s.icon}</span>
            <span>Step {s.num}: {s.title.split('&')[0]}</span>
          </button>
        ))}
      </div>

      <div className="p-5 rounded-2xl border bg-card space-y-3 shadow-xs animate-fade-in">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs font-bold">
            Phase {cur.num} of 5
          </Badge>
          <span className="text-2xl">{cur.icon}</span>
        </div>
        <h5 className="text-base font-extrabold text-foreground">{cur.title}</h5>
        <p className="text-sm text-muted-foreground leading-relaxed">{cur.desc}</p>
        <div className="p-3 rounded-xl bg-muted/30 border text-xs font-medium text-foreground flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Analyst Advantage: {cur.highlight}</span>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 0-2-2: Gamification, Badges & Floating Glossary Sandbox
// =========================================================================
export function Interactive022() {
  const [xpCount, setXpCount] = useState(140);
  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState<string | null>(null);

  const sampleTerms: Record<string, { full: string; analogy: string; def: string }> = {
    'SIEM': {
      full: 'Security Information & Event Management',
      analogy: 'The master airport control tower or central CCTV monitor room.',
      def: 'A software platform that collects logs from all enterprise computers, normalizes them, and searches for threat patterns.',
    },
    'False Positive': {
      full: 'Benign False Alarm (Burnt Toast)',
      analogy: 'A kitchen smoke detector beeping when toast burns, rather than a real fire.',
      def: 'An alert generated when harmless activity triggers a sensitive detection rule.',
    },
    'Telemetry': {
      full: 'Digital System Audit Trail & Metrics',
      analogy: 'The black box flight data recorder on an airplane.',
      def: 'Continuous digital records recording network connections, process spawns, and user logins.',
    },
  };

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            Platform Feature Sandbox: XP & Floating Glossary Practice
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Test the gamification counter and click sample glossary terms to preview how the platform supports your learning.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: XP Generator Practice */}
        <div className="p-4 rounded-2xl border bg-card space-y-3 shadow-xs">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            1. XP System & Leveling Simulator
          </span>
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-primary/10 border border-primary/20">
            <div>
              <span className="text-xs text-primary font-bold">Total Earned XP:</span>
              <p className="text-2xl font-black text-primary font-mono">{xpCount} XP</p>
            </div>
            <Badge className="bg-primary text-white text-xs font-bold">
              Level {Math.floor(xpCount / 100) + 1} Cadet
            </Badge>
          </div>
          <Button
            size="sm"
            onClick={() => setXpCount((prev) => prev + 35)}
            className="w-full gap-2 text-xs font-bold shadow-xs cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
            Complete Sample Exercise (+35 XP)
          </Button>
          <p className="text-[11px] text-muted-foreground text-center">
            Every chapter, simulation, and quiz awards real XP toward your certification rank!
          </p>
        </div>

        {/* Right: Floating Glossary Tester */}
        <div className="p-4 rounded-2xl border bg-card space-y-3 shadow-xs">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            2. Clickable Floating Glossary Demo
          </span>
          <p className="text-xs text-foreground leading-relaxed">
            In any lesson, you will see terms with a dotted blue underline like{' '}
            {Object.keys(sampleTerms).map((term, i) => (
              <span key={term}>
                <button
                  onClick={() => setActiveGlossaryTerm(term)}
                  className="font-bold text-primary underline decoration-dotted underline-offset-4 hover:bg-primary/10 px-1 rounded cursor-pointer"
                >
                  {term}
                </button>
                {i < 2 ? ', ' : '.'}
              </span>
            ))}
          </p>

          {activeGlossaryTerm && sampleTerms[activeGlossaryTerm] ? (
            <div className="p-3.5 rounded-xl border border-primary/30 bg-primary/5 space-y-1.5 animate-fade-in text-xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-foreground">{activeGlossaryTerm}</span>
                <span className="text-[10px] text-primary font-semibold">
                  {sampleTerms[activeGlossaryTerm].full}
                </span>
              </div>
              <p className="text-foreground leading-relaxed">
                <strong>Analogy:</strong> {sampleTerms[activeGlossaryTerm].analogy}
              </p>
              <p className="text-muted-foreground text-[11px]">
                {sampleTerms[activeGlossaryTerm].def}
              </p>
            </div>
          ) : (
            <div className="p-3 rounded-xl border border-dashed text-center text-xs text-muted-foreground">
              Click any underlined term above to view its live glossary card!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 0-2-3: First Safe Alert Triage Simulator
// =========================================================================
export function Interactive023() {
  const [verdict, setVerdict] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-primary" />
            Your First Safe Alert Triage Console
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Review the simulated incoming security alert and make your first professional triage decision!
          </p>
        </div>
      </div>

      <div className="p-5 rounded-2xl border bg-card space-y-4 shadow-xs">
        {/* Alert Header Banner */}
        <div className="p-3.5 rounded-xl bg-slate-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-bold text-amber-300">ALERT-2026-001: Excessive Logon Failures Followed by Success</span>
          </div>
          <Badge variant="outline" className="text-amber-400 border-amber-500/50 self-start sm:self-auto text-[10px]">
            SEVERITY: LOW
          </Badge>
        </div>

        {/* 3 Telemetry Clues */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-muted/30 border space-y-1">
            <span className="text-[10px] text-muted-foreground font-sans font-semibold">User & Device</span>
            <p className="font-bold text-foreground">alice.finance</p>
            <p className="text-[11px] text-muted-foreground">Workstation: FIN-PC-02</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/30 border space-y-1">
            <span className="text-[10px] text-muted-foreground font-sans font-semibold">Time & Location</span>
            <p className="font-bold text-foreground">08:52 AM Monday</p>
            <p className="text-[11px] text-muted-foreground">IP: 10.10.4.88 (HQ WiFi)</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/30 border space-y-1">
            <span className="text-[10px] text-muted-foreground font-sans font-semibold">IT Helpdesk Ticket</span>
            <p className="font-bold text-foreground font-sans text-xs">Caps Lock Mistake</p>
            <p className="text-[11px] text-muted-foreground font-sans">User confirmed typo on phone</p>
          </div>
        </div>

        {/* Triage Verdict Options */}
        <div className="pt-2 space-y-2 border-t">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            Select Your Triage Verdict:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant={verdict === 'fp' ? 'default' : 'outline'}
              onClick={() => setVerdict('fp')}
              className="h-12 border-emerald-300 hover:bg-emerald-50 hover:text-emerald-950 font-bold text-xs gap-2 justify-start px-4 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="text-left">
                <div>False Positive (Benign User Mistake)</div>
                <div className="text-[10px] text-muted-foreground font-normal">Close case calmly without escalating</div>
              </div>
            </Button>

            <Button
              variant={verdict === 'tp' ? 'default' : 'outline'}
              onClick={() => setVerdict('tp')}
              className="h-12 border-rose-300 hover:bg-rose-50 hover:text-rose-950 font-bold text-xs gap-2 justify-start px-4 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <div className="text-left">
                <div>True Positive (Active Breach)</div>
                <div className="text-[10px] text-muted-foreground font-normal">Sound alarms & shut down company network</div>
              </div>
            </Button>
          </div>
        </div>

        {verdict === 'fp' && (
          <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/70 text-emerald-950 space-y-1.5 animate-fade-in">
            <div className="flex items-center gap-2 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Spot On! Perfect Analyst Triage 🎉</span>
            </div>
            <p className="text-xs leading-relaxed">
              You correctly recognized that 3 failed passwords followed immediately by success from the user\'s physical desk on a Monday morning—along with an IT ticket confirming a Caps Lock key—is harmless human error. You documented the case and closed it without causing unnecessary panic!
            </p>
          </div>
        )}

        {verdict === 'tp' && (
          <div className="p-4 rounded-xl border border-amber-300 bg-amber-50/70 text-amber-950 space-y-1.5 animate-fade-in">
            <div className="flex items-center gap-2 font-bold text-sm">
              <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Hold on—re-read the evidence carefully:</span>
            </div>
            <p className="text-xs leading-relaxed">
              Shutting down the company network for an employee who mistyped their password because of Caps Lock would disrupt business unnecessarily! Remember: 70% of alerts are benign false alarms. Check the IP location and Helpdesk notes. Try selecting "False Positive"!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 0-3-1: Detective's Checklist & SOP Runner
// =========================================================================
export function Interactive031() {
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  const sopSteps = [
    { id: 's1', label: '1. Check User Identity: Full-time employee Alice Walker (HR Dept)' },
    { id: 's2', label: '2. Check Location & IP: Internal Headquarters Office WiFi Subnet' },
    { id: 's3', label: '3. Verify Service Desk Ticket: IT Ticket #9402 confirms approved USB data transfer' },
    { id: 's4', label: '4. Record Disposition: Document findings and close ticket as Benign Policy Exception' },
  ];

  const toggleStep = (id: string) => {
    setCheckedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allDone = sopSteps.every((s) => checkedSteps[s.id]);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-primary" />
            The Airline Pilot Checklist: SOP Runner
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Click to check off each step of the Standard Operating Procedure (SOP). Notice how checklists eliminate guesswork!
          </p>
        </div>
      </div>

      <div className="p-5 rounded-2xl border bg-card space-y-3 shadow-xs">
        <div className="flex items-center justify-between border-b pb-2">
          <span className="font-bold text-xs text-muted-foreground uppercase tracking-wider">
            SOP-USB-01: Unauthorized Storage Device Checklist
          </span>
          <Badge variant="outline" className="text-[10px] font-mono">
            {Object.values(checkedSteps).filter(Boolean).length} / 4 Completed
          </Badge>
        </div>

        <div className="space-y-2">
          {sopSteps.map((step) => {
            const isChecked = !!checkedSteps[step.id];
            return (
              <div
                key={step.id}
                onClick={() => toggleStep(step.id)}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  isChecked
                    ? 'border-emerald-300 bg-emerald-50/40 text-emerald-950 font-semibold'
                    : 'border-border bg-muted/10 text-muted-foreground hover:border-primary/50'
                }`}
              >
                <span className="text-xs">{step.label}</span>
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                  isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-muted-foreground/40'
                }`}>
                  {isChecked && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
            );
          })}
        </div>

        {allDone && (
          <div className="p-3.5 rounded-xl border border-emerald-300 bg-emerald-50/60 flex items-center gap-2.5 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="text-xs font-bold text-emerald-950">
              Checklist Complete! Zero guesswork, 100% adherence to company security policy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// =========================================================================
// TOPIC 0-3-2: 18-Module Roadmap & Career Milestone Explorer
// =========================================================================
export function Interactive032() {
  const phases = [
    {
      num: 1,
      name: 'Orientation & Demystification',
      modules: 'Module 00',
      difficulty: 'Beginner',
      analogy: 'Airport Security & Control Tower Analogies',
      outcome: 'Confidence, core mindset, and platform mastery',
    },
    {
      num: 2,
      name: 'Core Computing & Networks',
      modules: 'Modules 01 - 03',
      difficulty: 'Beginner',
      analogy: 'Operating Systems & Internet Post Office',
      outcome: 'Understand how computers talk and generate event logs',
    },
    {
      num: 3,
      name: 'Live SOC Operations Pipeline',
      modules: 'Module 04',
      difficulty: 'Intermediate',
      analogy: 'Full Flight Simulator Training',
      outcome: 'Master SIEM dashboards, triage queues, and case escalations',
    },
    {
      num: 4,
      name: 'Threat Hunting & Career Prep',
      modules: 'Modules 05 - 18',
      difficulty: 'Intermediate / Advanced',
      analogy: 'Detective Forensics & Field Certification',
      outcome: 'Pass capstones, build resume, and land an L1 SOC Analyst job!',
    },
  ];

  const [activePhase, setActivePhase] = useState(1);
  const phase = phases.find((p) => p.num === activePhase) || phases[0];

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
            <Compass className="w-4 h-4 text-primary" />
            18-Module Journey Milestone Map
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Click through each phase of the course curriculum to see how every step builds smoothly toward certification.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {phases.map((p) => (
          <button
            key={p.num}
            onClick={() => setActivePhase(p.num)}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activePhase === p.num
                ? 'border-primary bg-primary/10 ring-2 ring-primary/20 shadow-xs'
                : 'border-border bg-card hover:border-primary/40'
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Phase {p.num}</span>
            <div className="font-bold text-xs text-foreground mt-0.5">{p.modules}</div>
            <div className="text-[10px] text-muted-foreground truncate">{p.name}</div>
          </button>
        ))}
      </div>

      <div className="p-5 rounded-2xl border bg-card space-y-3 shadow-xs animate-fade-in">
        <div className="flex items-center justify-between border-b pb-2">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Phase {phase.num}: {phase.modules}</span>
            <h5 className="text-base font-extrabold text-foreground mt-0.5">{phase.name}</h5>
          </div>
          <Badge className="bg-emerald-600 text-white text-xs">{phase.difficulty}</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-muted/30 border space-y-1">
            <span className="font-bold text-foreground uppercase tracking-wider text-[10px]">Real-World Metaphor:</span>
            <p className="text-muted-foreground leading-relaxed">{phase.analogy}</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
            <span className="font-bold text-emerald-900 uppercase tracking-wider text-[10px]">Your Achievement:</span>
            <p className="text-emerald-950 font-semibold leading-relaxed">{phase.outcome}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
