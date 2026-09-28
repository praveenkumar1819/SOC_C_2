'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Terminal, FileCode } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface DemoStep {
  order: number;
  title: string;
  description: string;
  highlight: string;
}

interface DemoData {
  title: string;
  description: string;
  steps: DemoStep[];
  conclusion?: string;
}

interface DemoUnitProps {
  content: {
    demo: DemoData;
  };
}

export function DemoUnit({ content }: DemoUnitProps) {
  const { demo } = content;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const totalSteps = demo.steps.length;
  const currentStep = demo.steps[currentStepIndex];
  const isFinished = currentStepIndex === totalSteps - 1;

  const progressPercentage = ((currentStepIndex + 1) / totalSteps) * 100;

  return (
    <div className="space-y-6">
      {/* Demo Header */}
      <Card className="border border-border/80 shadow-xs bg-card">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-primary-50/20 border-b border-border/60 pb-4">
          <div className="flex items-center justify-between mb-1">
            <Badge variant="outline" className="text-xs bg-white text-primary border-primary/20">
              <PlayCircle className="w-3.5 h-3.5 mr-1" /> Interactive Walkthrough
            </Badge>
            <span className="text-xs font-mono text-muted-foreground">
              Step {currentStepIndex + 1} of {totalSteps}
            </span>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">{demo.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{demo.description}</p>

          <div className="pt-3">
            <Progress value={progressPercentage} className="h-1.5" />
          </div>
        </CardHeader>

        {/* Step Navigation Pill Bar */}
        <div className="p-4 border-b border-border/60 bg-slate-50/60 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {demo.steps.map((step, idx) => {
              const isCurrent = idx === currentStepIndex;
              const isPast = idx < currentStepIndex;
              return (
                <button
                  key={step.order}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : isPast
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-white text-muted-foreground border border-border hover:bg-slate-100'
                  }`}
                >
                  {isPast ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-mono flex items-center justify-center font-bold">
                      {step.order}
                    </span>
                  )}
                  <span>{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Content */}
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.order}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-primary">PHASE 0{currentStep.order}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{demo.title}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground">{currentStep.title}</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">{currentStep.description}</p>
              </div>

              {/* Step Highlight Box (Terminal or Ticket Card) */}
              <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs shadow-md border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2 text-[11px]">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-primary" />
                    <span>Live Operational Telemetry & Artifact</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] border-slate-700 text-slate-300">
                    Step {currentStep.order} Context
                  </Badge>
                </div>
                <div className="whitespace-pre-line leading-relaxed text-slate-200 pt-1">
                  {currentStep.highlight}
                </div>
              </div>

              {/* Conclusion Banner if last step */}
              {isFinished && demo.conclusion && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-300 text-emerald-950 text-xs sm:text-sm flex items-start gap-3"
                >
                  <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Walkthrough Complete: </span>
                    {demo.conclusion}
                  </div>
                </motion.div>
              )}

              {/* Step Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-border/60">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentStepIndex === 0}
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                  Previous Phase
                </Button>

                <Button
                  size="sm"
                  onClick={() => setCurrentStepIndex((prev) => Math.min(totalSteps - 1, prev + 1))}
                  disabled={isFinished}
                  className="bg-primary text-primary-foreground font-semibold"
                >
                  Next Phase
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
