'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Target,
  FileCheck2,
  Home
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MultipleChoice } from './knowledge-check/multiple-choice';
import { MultipleSelect } from './knowledge-check/multiple-select';
import { OrderingCheck } from './knowledge-check/ordering-check';
import { useProgressStore } from '@/store/progress-store';

interface AssessmentQuestion {
  id: string;
  type: string;
  question: string;
  options?: string[];
  items?: string[];
  correctAnswer: any;
  explanation?: string;
  points: number;
}

interface AssessmentData {
  id: string;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  passingScore: number;
  totalPoints: number;
}

interface ModuleAssessmentProps {
  moduleId: string;
  assessment: AssessmentData;
}

export function ModuleAssessment({ moduleId, assessment }: ModuleAssessmentProps) {
  const router = useRouter();
  const addXP = useProgressStore((state) => state.addXP);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [orderingAnswers, setOrderingAnswers] = useState<Record<string, { originalIndex: number; text: string }[]>>(() => {
    const init: Record<string, { originalIndex: number; text: string }[]> = {};
    assessment.questions.forEach((q) => {
      if (q.type === 'ORDERING' && q.items) {
        init[q.id] = q.items.map((text, idx) => ({ originalIndex: idx, text })).reverse();
      }
    });
    return init;
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = assessment.questions.length;
  const currentQ = assessment.questions[currentQIndex];

  // Calculate score upon submission
  const maxPossiblePoints = assessment.questions.reduce((acc, q) => acc + q.points, 0);

  const getQuestionResult = (q: AssessmentQuestion) => {
    if (q.type === 'MULTIPLE_CHOICE' || q.type === 'SCENARIO') {
      return answers[q.id] === q.correctAnswer;
    }
    if (q.type === 'MULTIPLE_SELECT') {
      const selected: string[] = answers[q.id] || [];
      const correct: string[] = q.correctAnswer || [];
      return selected.length === correct.length && correct.every((c) => selected.includes(c));
    }
    if (q.type === 'ORDERING') {
      const currentOrder = orderingAnswers[q.id] || [];
      const expected: number[] = q.correctAnswer || [];
      return currentOrder.every((item, idx) => item.originalIndex === expected[idx]);
    }
    return false;
  };

  const calculateFinalScore = () => {
    let earned = 0;
    assessment.questions.forEach((q) => {
      if (getQuestionResult(q)) {
        earned += q.points;
      }
    });
    const percentage = Math.round((earned / maxPossiblePoints) * 100);
    return { earned, percentage, isPassed: percentage >= assessment.passingScore };
  };

  const handleOrderMoveUp = (qId: string, index: number) => {
    if (index === 0) return;
    setOrderingAnswers((prev) => {
      const list = [...(prev[qId] || [])];
      const temp = list[index - 1];
      list[index - 1] = list[index];
      list[index] = temp;
      return { ...prev, [qId]: list };
    });
  };

  const handleOrderMoveDown = (qId: string, index: number) => {
    const list = orderingAnswers[qId] || [];
    if (index === list.length - 1) return;
    setOrderingAnswers((prev) => {
      const copy = [...list];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return { ...prev, [qId]: copy };
    });
  };

  const handleSubmitAssessment = async () => {
    setIsSubmitting(true);
    const result = calculateFinalScore();
    setIsSubmitted(true);

    if (result.isPassed) {
      addXP(150); // Module assessment completion reward
    }

    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleId,
          completionPercentage: result.isPassed ? 100 : Math.max(50, result.percentage),
          xpEarned: result.isPassed ? 150 : 25,
          topicProgress: {
            assessment: {
              completed: result.isPassed,
              score: result.percentage,
              earnedPoints: result.earned,
              maxPoints: maxPossiblePoints
            }
          }
        })
      });
    } catch (e) {
      console.error('Error saving assessment score:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setIsSubmitted(false);
    setAnswers({});
    setCurrentQIndex(0);
    const init: Record<string, { originalIndex: number; text: string }[]> = {};
    assessment.questions.forEach((q) => {
      if (q.type === 'ORDERING' && q.items) {
        init[q.id] = q.items.map((text, idx) => ({ originalIndex: idx, text })).reverse();
      }
    });
    setOrderingAnswers(init);
  };

  const finalResult = isSubmitted ? calculateFinalScore() : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
      {/* Sticky Header */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-16 z-40">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => router.push(`/modules/${moduleId}`)}>
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                Back to Module
              </Button>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <Target className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">Module {moduleId} Final Assessment</span>
              </div>
            </div>

            {!isSubmitted && (
              <Badge variant="outline" className="font-mono text-xs bg-white">
                Question {currentQIndex + 1} of {totalQuestions}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="container py-10 max-w-3xl">
        {!isSubmitted ? (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="bg-primary-50 text-primary border-primary/20 text-[11px] font-mono font-bold uppercase">
                  Assessment Checkpoint
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">
                  Passing Score: {assessment.passingScore}%
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                {assessment.title}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {assessment.description}
              </p>
            </div>

            {/* Stepper Dots */}
            <div className="flex items-center gap-2 pt-2">
              {assessment.questions.map((q, idx) => {
                const isAnswered =
                  q.type === 'ORDERING'
                    ? true
                    : q.type === 'MULTIPLE_SELECT'
                    ? (answers[q.id] || []).length > 0
                    : answers[q.id] !== undefined;
                const isCurrent = idx === currentQIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      isCurrent
                        ? 'w-8 bg-primary'
                        : isAnswered
                        ? 'w-4 bg-emerald-500'
                        : 'w-4 bg-slate-200'
                    }`}
                  />
                );
              })}
            </div>

            {/* Question Card */}
            <Card className="border border-border/80 shadow-sm bg-card overflow-hidden">
              <CardHeader className="bg-slate-50/70 border-b border-border/60 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-primary">
                    QUESTION {currentQIndex + 1} OF {totalQuestions}
                  </span>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {currentQ.points} Points
                  </Badge>
                </div>
                <CardTitle className="text-base sm:text-lg font-bold text-foreground pt-1 leading-snug">
                  {currentQ.question}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6">
                {(currentQ.type === 'MULTIPLE_CHOICE' || currentQ.type === 'SCENARIO') && currentQ.options && (
                  <MultipleChoice
                    options={currentQ.options}
                    selectedOption={answers[currentQ.id] || null}
                    onSelect={(opt) => setAnswers((prev) => ({ ...prev, [currentQ.id]: opt }))}
                    isSubmitted={false}
                    correctAnswer={currentQ.correctAnswer}
                  />
                )}

                {currentQ.type === 'MULTIPLE_SELECT' && currentQ.options && (
                  <MultipleSelect
                    options={currentQ.options}
                    selectedOptions={answers[currentQ.id] || []}
                    onToggle={(opt) => {
                      const cur = answers[currentQ.id] || [];
                      const next = cur.includes(opt) ? cur.filter((x: string) => x !== opt) : [...cur, opt];
                      setAnswers((prev) => ({ ...prev, [currentQ.id]: next }));
                    }}
                    isSubmitted={false}
                    correctAnswers={currentQ.correctAnswer || []}
                  />
                )}

                {currentQ.type === 'ORDERING' && currentQ.items && (
                  <OrderingCheck
                    items={orderingAnswers[currentQ.id] || []}
                    onMoveUp={(idx) => handleOrderMoveUp(currentQ.id, idx)}
                    onMoveDown={(idx) => handleOrderMoveDown(currentQ.id, idx)}
                    isSubmitted={false}
                    correctAnswer={currentQ.correctAnswer || []}
                  />
                )}
              </CardContent>
            </Card>

            {/* Assessment Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentQIndex === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Previous Question
              </Button>

              {currentQIndex < totalQuestions - 1 ? (
                <Button onClick={() => setCurrentQIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}>
                  Next Question <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitAssessment}
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6"
                >
                  <FileCheck2 className="w-4 h-4 mr-1.5" /> Submit Assessment
                </Button>
              )}
            </div>
          </div>
        ) : (
          /* Assessment Results Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <Card
              className={`border shadow-md overflow-hidden ${
                finalResult?.isPassed
                  ? 'border-emerald-300 bg-gradient-to-b from-emerald-50/50 to-white'
                  : 'border-amber-300 bg-gradient-to-b from-amber-50/50 to-white'
              }`}
            >
              <CardContent className="p-8 text-center space-y-4">
                <div className="inline-flex p-4 rounded-2xl bg-white shadow-sm border border-border/80">
                  {finalResult?.isPassed ? (
                    <Award className="w-12 h-12 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-12 h-12 text-amber-600" />
                  )}
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                    {finalResult?.isPassed ? 'Assessment Passed! 🎉' : 'Assessment Not Passed'}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {finalResult?.isPassed
                      ? 'Congratulations! You demonstrated mastery of SOC Operations and L1 analyst workflows.'
                      : `You scored ${finalResult?.percentage}%. A minimum of ${assessment.passingScore}% is required to earn Module 04 completion.`}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-6 py-4">
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-foreground font-mono">
                      {finalResult?.percentage}%
                    </div>
                    <div className="text-xs text-muted-foreground uppercase font-bold mt-0.5">Final Score</div>
                  </div>

                  <div className="h-10 w-px bg-border" />

                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-primary font-mono">
                      +{finalResult?.isPassed ? 150 : 25} XP
                    </div>
                    <div className="text-xs text-muted-foreground uppercase font-bold mt-0.5">XP Earned</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Button variant="outline" onClick={handleRetry}>
                    <RotateCcw className="w-4 h-4 mr-1.5" /> Retake Assessment
                  </Button>
                  <Button onClick={() => router.push('/dashboard')} className="bg-primary text-primary-foreground font-semibold">
                    <Home className="w-4 h-4 mr-1.5" /> Return to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Answer Breakdown */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-bold text-foreground">Question-by-Question Review</h3>
              {assessment.questions.map((q, idx) => {
                const passed = getQuestionResult(q);
                return (
                  <Card key={q.id} className="border border-border/80 shadow-xs bg-card">
                    <CardContent className="p-5 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-muted-foreground">Q{idx + 1}</span>
                            <span className="text-xs font-semibold text-foreground">{q.question}</span>
                          </div>
                        </div>
                        {passed ? (
                          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-xs shrink-0">
                            +{q.points} Pts
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-rose-700 border-rose-300 text-xs shrink-0">
                            0 / {q.points} Pts
                          </Badge>
                        )}
                      </div>

                      {q.explanation && (
                        <p className="text-xs text-muted-foreground pt-1 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-border/60">
                          <span className="font-semibold text-foreground">Analyst Insight: </span>
                          {q.explanation}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
