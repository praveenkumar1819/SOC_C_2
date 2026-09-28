'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Terminal,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  User,
  Server,
  Network,
  Clock,
  Building,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface InteractiveUnitProps {
  content: {
    interactive: {
      type: 'simulation' | 'classification' | string;
      scenario?: string;
      data: any;
    };
  };
}

export function InteractiveUnit({ content }: InteractiveUnitProps) {
  const { interactive } = content;

  if (interactive.type === 'simulation') {
    return <SimulationRenderer data={interactive.data} />;
  }

  if (interactive.type === 'classification') {
    return <ClassificationRenderer data={interactive.data} />;
  }

  return (
    <Card className="p-6 text-center text-muted-foreground text-xs font-mono">
      Interactive unit type {interactive.type} loaded.
    </Card>
  );
}

// -------------------------------------------------------------
// 1. SIMULATION RENDERER (FinCorp Failed Login)
// -------------------------------------------------------------
function SimulationRenderer({ data }: { data: any }) {
  const { alert, context, questions } = data;
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, boolean>>({});

  const currentQ = questions[currentQIndex];
  const isSubmitted = !!submittedAnswers[currentQIndex];
  const selectedOption = selectedAnswers[currentQIndex];
  const isCorrect = selectedOption === currentQ.correct;
  const isAllComplete = Object.keys(submittedAnswers).length === questions.length;

  const handleSelect = (option: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQIndex]: option }));
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setSubmittedAnswers((prev) => ({ ...prev, [currentQIndex]: true }));
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      <Card className="border-amber-300 bg-amber-50/40 shadow-xs">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                Live SIEM Alert Triggered
              </span>
            </div>
            <Badge className="bg-amber-200 text-amber-900 border-amber-300 text-xs font-mono uppercase">
              {alert.severity} Severity
            </Badge>
          </div>

          <div className="text-lg font-bold text-foreground">{alert.title}</div>
          <p className="text-xs sm:text-sm text-foreground/90 font-mono bg-white/80 p-3 rounded-xl border border-amber-200">
            {alert.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> {alert.timestamp}
            </span>
            <span className="flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-slate-400" /> {alert.source}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Analyst Context Card */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl border border-border/80 bg-white space-y-1">
          <div className="text-[11px] text-muted-foreground flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-blue-500" /> Account
          </div>
          <div className="text-xs font-bold text-foreground font-mono">{context.user}</div>
        </div>

        <div className="p-3 rounded-xl border border-border/80 bg-white space-y-1">
          <div className="text-[11px] text-muted-foreground flex items-center gap-1">
            <Server className="w-3.5 h-3.5 text-emerald-500" /> Workstation
          </div>
          <div className="text-xs font-bold text-foreground font-mono">{context.host}</div>
        </div>

        <div className="p-3 rounded-xl border border-border/80 bg-white space-y-1">
          <div className="text-[11px] text-muted-foreground flex items-center gap-1">
            <Network className="w-3.5 h-3.5 text-indigo-500" /> Internal IP
          </div>
          <div className="text-xs font-bold text-foreground font-mono">{context.ip}</div>
        </div>

        <div className="p-3 rounded-xl border border-border/80 bg-white space-y-1">
          <div className="text-[11px] text-muted-foreground flex items-center gap-1">
            <Building className="w-3.5 h-3.5 text-amber-500" /> Department
          </div>
          <div className="text-xs font-bold text-foreground">{context.department}</div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-slate-100 text-slate-700 text-xs flex items-center gap-2">
        <span className="font-semibold">Normal Baseline: </span>
        <span>{context.normalActivity}</span>
      </div>

      {/* Interactive Question Card */}
      <Card className="border border-border/80 shadow-sm bg-card overflow-hidden">
        <CardHeader className="bg-slate-50/70 border-b border-border/60 pb-3">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs bg-white text-primary border-primary/20">
              <Target className="w-3 h-3 mr-1" /> Decision Step {currentQIndex + 1} of {questions.length}
            </Badge>
            <span className="text-xs text-muted-foreground font-mono">
              FinCorp Scenario Simulation
            </span>
          </div>
          <CardTitle className="text-base font-bold text-foreground pt-1">
            {currentQ.question}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <div className="space-y-2.5">
            {currentQ.options.map((option: string, idx: number) => {
              const isSelected = selectedOption === option;
              const isCorrectOpt = isSubmitted && option === currentQ.correct;
              const isWrongOpt = isSubmitted && isSelected && !isCorrectOpt;

              let btnClass = 'border-border/80 hover:bg-slate-50';
              if (isSubmitted) {
                if (isCorrectOpt) btnClass = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-semibold';
                else if (isWrongOpt) btnClass = 'border-rose-500 bg-rose-50/80 text-rose-950 font-semibold';
                else btnClass = 'border-border/40 opacity-50';
              } else if (isSelected) {
                btnClass = 'border-primary ring-2 ring-primary/20 bg-primary-50/50 font-medium';
              }

              return (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => handleSelect(option)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all text-xs sm:text-sm flex items-center justify-between ${btnClass}`}
                >
                  <span>{option}</span>
                  {isSubmitted && isCorrectOpt && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  {isSubmitted && isWrongOpt && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border text-xs leading-relaxed ${
                isCorrect
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50/80 border-rose-300 text-rose-950'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5 mb-1">
                {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                {isCorrect ? 'Correct Decision!' : 'Investigation Review:'}
              </div>
              <p>{currentQ.feedback}</p>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-3 border-t border-border/60">
            <span className="text-xs text-muted-foreground">
              Question {currentQIndex + 1} of {questions.length}
            </span>

            {isSubmitted ? (
              currentQIndex < questions.length - 1 ? (
                <Button size="sm" onClick={handleNext}>
                  Next Decision
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              ) : (
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-xs py-1.5 px-3">
                  <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" /> Scenario Complete!
                </Badge>
              )
            ) : (
              <Button size="sm" onClick={handleSubmit} disabled={!selectedOption}>
                Confirm Decision
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// -------------------------------------------------------------
// 2. CLASSIFICATION RENDERER (Alert & Severity Scenarios)
// -------------------------------------------------------------
function ClassificationRenderer({ data }: { data: any }) {
  const { title, scenarios } = data;
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});

  const handlePick = (scenarioId: number, option: string) => {
    if (submitted[scenarioId]) return;
    setAnswers((prev) => ({ ...prev, [scenarioId]: option }));
  };

  const handleCheck = (scenarioId: number) => {
    setSubmitted((prev) => ({ ...prev, [scenarioId]: true }));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border/60 pb-3">
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Evaluate each real-world SOC telemetry scenario and select the appropriate classification.
        </p>
      </div>

      <div className="space-y-4">
        {scenarios.map((sc: any) => {
          const isDone = !!submitted[sc.id];
          const selected = answers[sc.id];
          const isCorrect = selected?.toLowerCase() === sc.correctAnswer?.toLowerCase();

          // Options could be specified or standard [false-positive, true-positive, investigate]
          const optionsList: string[] = sc.options || [
            'false-positive',
            'true-positive',
            'investigate'
          ];

          return (
            <Card key={sc.id} className="border border-border/80 shadow-xs bg-card">
              <CardContent className="p-5 space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-primary">SCENARIO {sc.id}</span>
                    <h4 className="text-sm sm:text-base font-bold text-foreground mt-0.5">
                      {sc.alert || sc.situation}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 font-mono bg-slate-50 p-2.5 rounded-lg border border-border/60">
                      {sc.details || sc.evidence}
                    </p>
                  </div>
                  {isDone && (
                    <Badge className={isCorrect ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-rose-100 text-rose-800 border-rose-300'}>
                      {isCorrect ? 'Correct' : 'Review'}
                    </Badge>
                  )}
                </div>

                {/* Option Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {optionsList.map((opt) => {
                    const isSelected = selected?.toLowerCase() === opt.toLowerCase();
                    const isTarget = isDone && sc.correctAnswer?.toLowerCase() === opt.toLowerCase();

                    let btnClass = 'border-border/80 hover:bg-slate-50';
                    if (isDone) {
                      if (isTarget) btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                      else if (isSelected) btnClass = 'border-rose-500 bg-rose-50 text-rose-950';
                      else btnClass = 'opacity-40';
                    } else if (isSelected) {
                      btnClass = 'border-primary ring-2 ring-primary/20 bg-primary-50 text-primary font-bold';
                    }

                    return (
                      <button
                        key={opt}
                        disabled={isDone}
                        onClick={() => handlePick(sc.id, opt)}
                        className={`px-3 py-2 rounded-xl border text-xs capitalize transition-all ${btnClass}`}
                      >
                        {opt.replace('-', ' ')}
                      </button>
                    );
                  })}

                  {!isDone && (
                    <Button
                      size="sm"
                      onClick={() => handleCheck(sc.id)}
                      disabled={!selected}
                      className="ml-auto text-xs h-9 px-4"
                    >
                      Check Answer
                    </Button>
                  )}
                </div>

                {/* Explanation */}
                {isDone && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-xl border text-xs leading-relaxed ${
                      isCorrect ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' : 'bg-rose-50/70 border-rose-200 text-rose-900'
                    }`}
                  >
                    <span className="font-bold">Analyst Explanation: </span>
                    {sc.explanation}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
