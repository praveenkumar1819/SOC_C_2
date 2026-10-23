'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Clock,
  RotateCcw,
  ChevronRight,
  Check,
  AlertTriangle,
  Edit3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { V2UnitAssessment, V2Unit, V2Module } from '@/data/curriculum-v2-data';
import { AdminAssessmentEditorModal } from './admin-assessment-editor-modal';
import { useProgressStore } from '@/store/progress-store';
import { useToast } from '@/components/ui/toast-provider';

interface UnitAssessmentV2ViewProps {
  module: V2Module;
  unit: V2Unit;
  assessment: V2UnitAssessment;
  isAdmin?: boolean;
  onNext?: () => void;
  onCompleteAssessment?: (assessmentId: string, score: number) => void;
}

export function UnitAssessmentV2View({
  module,
  unit,
  assessment,
  isAdmin = false,
  onNext,
  onCompleteAssessment,
}: UnitAssessmentV2ViewProps) {
  const [currentAssessment, setCurrentAssessment] = useState<V2UnitAssessment>(assessment);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setCurrentAssessment(assessment);
  }, [assessment]);

  const { showToast } = useToast();
  const completeUnit = useProgressStore((s) => s.completeUnit);

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmit = () => {
    const totalQuestions = currentAssessment.questions.length;
    const answeredCount = Object.keys(selectedAnswers).length;

    if (answeredCount < totalQuestions) {
      showToast({
        type: 'error',
        title: 'Incomplete Assessment',
        description: `Please answer all ${totalQuestions} questions before submitting.`,
      });
      return;
    }

    let correct = 0;
    currentAssessment.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });

    const calculatedScore = Math.round((correct / totalQuestions) * 100);
    setScore(calculatedScore);
    setIsSubmitted(true);

    const passed = calculatedScore >= (currentAssessment.passingScore || 80);

    if (passed) {
      completeUnit(unit.id, currentAssessment.xpReward);
      showToast({
        type: 'success',
        title: `Unit Assessment Passed! 🎯 (${calculatedScore}%)`,
        description: `+${currentAssessment.xpReward} XP awarded! You have mastered Unit ${unit.unitNumber}.`,
      });
      if (onCompleteAssessment) {
        onCompleteAssessment(currentAssessment.id, calculatedScore);
      }
    } else {
      showToast({
        type: 'error',
        title: `Score: ${calculatedScore}% (Passing: ${currentAssessment.passingScore}%)`,
        description: 'Review the explanations below and retry the assessment.',
      });
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  const passed = score >= (currentAssessment.passingScore || 80);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 pb-16 animate-fade-in">
      {/* Assessment Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 shadow-md space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-primary text-white font-mono text-[10px] font-bold">
              UNIT {unit.unitNumber} FORMAL ASSESSMENT
            </Badge>
            <Badge variant="outline" className="text-xs font-mono">
              ⏱ {currentAssessment.duration} min
            </Badge>
            <Badge variant="outline" className="text-xs font-mono text-primary border-primary/30">
              Passing: {currentAssessment.passingScore || 80}%
            </Badge>
            <Badge className="bg-amber-500 text-white text-[10px] font-bold">
              +{currentAssessment.xpReward} XP
            </Badge>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsEditorOpen(true)}
            className="border-amber-400 dark:border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-xs h-8 gap-1.5 px-3 rounded-xl shadow-xs cursor-pointer"
            title="Open Live Assessment Editor to update questions & passing criteria"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Admin Edit Assessment</span>
          </Button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
          {currentAssessment.title}
        </h1>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Demonstrate conceptual mastery of Unit {unit.unitNumber}:{' '}
          <strong className="text-foreground">{unit.title}</strong> in the CDAC Bengaluru SOC learning environment.
        </p>

        {isSubmitted && (
          <div
            className={`p-4 rounded-xl border flex items-center justify-between mt-3 ${
              passed
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-100'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-100'
            }`}
          >
            <div className="flex items-center gap-3">
              {passed ? (
                <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-rose-600 dark:text-rose-400" />
              )}
              <div>
                <div className="font-extrabold text-base">
                  {passed ? 'Assessment Passed! 🎉' : 'Assessment Not Passed'}
                </div>
                <p className="text-xs opacity-90">
                  Your Score: <strong>{score}%</strong> • Passing Requirement: {currentAssessment.passingScore || 80}%
                </p>
              </div>
            </div>

            {passed && onNext && (
              <Button
                type="button"
                size="sm"
                onClick={onNext}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5 rounded-xl cursor-pointer shadow-sm"
              >
                <span>Continue Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-5">
        {currentAssessment.questions.map((q, qIdx) => {
          const isSelected = selectedAnswers[qIdx] !== undefined;
          const isCorrect = selectedAnswers[qIdx] === q.correctAnswer;

          return (
            <div
              key={qIdx}
              className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm space-y-3.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-primary font-mono uppercase tracking-wider">
                  Scenario Question {qIdx + 1} of {currentAssessment.questions.length}
                </span>
                {isSubmitted && (
                  <Badge
                    className={
                      isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-500 text-[10px]'
                        : 'bg-rose-600 text-white border-rose-500 text-[10px]'
                    }
                  >
                    {isCorrect ? 'Correct ✓' : 'Incorrect ✗'}
                  </Badge>
                )}
              </div>

              <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug">
                {q.question}
              </h3>

              <div className="space-y-2 pt-1">
                {q.options.map((opt, optIdx) => {
                  const selected = selectedAnswers[qIdx] === optIdx;
                  let style =
                    'border-border/80 hover:border-primary/50 hover:bg-muted/40 text-foreground';

                  if (isSubmitted) {
                    if (optIdx === q.correctAnswer) {
                      style =
                        'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100 font-semibold';
                    } else if (selected && !isCorrect) {
                      style =
                        'border-rose-500 bg-rose-50/70 dark:bg-rose-950/30 text-rose-900 dark:text-rose-100';
                    }
                  } else if (selected) {
                    style =
                      'border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary';
                  }

                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-all cursor-pointer ${style}`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && optIdx === q.correctAnswer && (
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 ml-2" />
                      )}
                    </div>
                  );
                })}
              </div>

              {isSubmitted && (
                <div className="p-3 rounded-xl text-xs bg-muted/40 border border-border/80 text-muted-foreground mt-2">
                  <strong className="text-foreground">Explanation:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Submission Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-border/80">
        {isSubmitted && !passed ? (
          <Button
            type="button"
            variant="outline"
            onClick={handleRetry}
            className="text-xs font-semibold gap-1.5 rounded-xl border-border hover:bg-muted"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry Assessment</span>
          </Button>
        ) : (
          <span className="text-xs text-muted-foreground">
            Complete all questions and score at least {currentAssessment.passingScore || 80}% to earn unit credit.
          </span>
        )}

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitted && passed}
          className="bg-primary hover:bg-primary/90 text-white font-bold text-xs h-10 px-7 rounded-xl shadow-md gap-2 cursor-pointer transition-all hover:scale-105"
        >
          <Award className="w-4 h-4" />
          <span>{isSubmitted ? 'Assessment Submitted' : 'Submit Assessment'}</span>
        </Button>
      </div>

      {/* Admin Assessment Live Editor Modal */}
      <AdminAssessmentEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        assessment={currentAssessment}
        unitNumber={unit.unitNumber}
        onSaveSuccess={(updated) => {
          setCurrentAssessment(updated);
          setSelectedAnswers({});
          setIsSubmitted(false);
          setScore(0);
        }}
      />
    </div>
  );
}
