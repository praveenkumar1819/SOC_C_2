'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertCircle, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProgressStore } from '@/store/progress-store';

interface KnowledgeCheckProps {
  check: {
    id: string;
    title: string;
    type: string;
    question: {
      text: string;
      options?: string[];
      correctAnswer: string | string[];
      explanation: string;
    };
    xpReward: number;
  };
  onComplete: () => void;
}

export function KnowledgeCheck({ check, onComplete }: KnowledgeCheckProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const addXP = useProgressStore((state) => state.addXP);

  const handleSubmit = () => {
    let correct = false;

    if (check.type === 'MULTIPLE_CHOICE') {
      correct = selectedAnswer === check.question.correctAnswer;
    } else if (check.type === 'MULTIPLE_SELECT') {
      const correctAnswers = Array.isArray(check.question.correctAnswer)
        ? check.question.correctAnswer
        : [check.question.correctAnswer];
      correct =
        selectedAnswers.length === correctAnswers.length &&
        selectedAnswers.every((ans) => correctAnswers.includes(ans));
    } else {
      // Default fallback
      correct = selectedAnswer === check.question.correctAnswer;
    }

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      addXP(check.xpReward);
      // Award XP via API
      fetch('/api/progress/xp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkId: check.id,
          xp: check.xpReward,
          correct: true,
        }),
      }).catch((err) => console.error('Failed to sync XP:', err));
    }
  };

  const handleMultiSelect = (option: string) => {
    if (selectedAnswers.includes(option)) {
      setSelectedAnswers(selectedAnswers.filter((a) => a !== option));
    } else {
      setSelectedAnswers([...selectedAnswers, option]);
    }
  };

  const canSubmit =
    check.type === 'MULTIPLE_CHOICE'
      ? selectedAnswer !== null
      : selectedAnswers.length > 0;

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Knowledge Check
            </Badge>
            <span className="text-sm font-medium text-muted-foreground">
              {check.xpReward} XP
            </span>
          </div>
          <CardTitle className="text-2xl mt-4">{check.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Question */}
          <div className="text-lg font-medium">{check.question.text}</div>

          {/* Instructions */}
          {check.type === 'MULTIPLE_SELECT' && !showResult && (
            <p className="text-sm text-muted-foreground">
              Select all that apply
            </p>
          )}

          {/* Options */}
          <div className="space-y-3">
            {check.question.options?.map((option, index) => {
              const isSelected =
                check.type === 'MULTIPLE_CHOICE'
                  ? selectedAnswer === option
                  : selectedAnswers.includes(option);

              const isCorrectAnswer =
                typeof check.question.correctAnswer === 'string'
                  ? option === check.question.correctAnswer
                  : Array.isArray(check.question.correctAnswer)
                  ? check.question.correctAnswer.includes(option)
                  : false;

              return (
                <button
                  key={index}
                  onClick={() => {
                    if (showResult) return;
                    if (check.type === 'MULTIPLE_CHOICE') {
                      setSelectedAnswer(option);
                    } else {
                      handleMultiSelect(option);
                    }
                  }}
                  disabled={showResult}
                  className={cn(
                    'w-full p-4 text-left rounded-lg border-2 transition-all',
                    !showResult && 'hover:border-primary/50 hover:bg-muted/50',
                    isSelected && !showResult && 'border-primary bg-primary/5',
                    showResult && isCorrectAnswer && 'border-success bg-success/5',
                    showResult &&
                      isSelected &&
                      !isCorrectAnswer &&
                      'border-danger bg-danger/5',
                    showResult && 'cursor-default'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && (
                      <>
                        {isCorrectAnswer && (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        )}
                        {isSelected && !isCorrectAnswer && (
                          <XCircle className="h-5 w-5 text-danger" />
                        )}
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Submit Button */}
          {!showResult && (
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full"
              size="lg"
            >
              Submit Answer
            </Button>
          )}

          {/* Result */}
          {showResult && (
            <Card
              className={cn(
                'border-2',
                isCorrect
                  ? 'bg-success/5 border-success/20'
                  : 'bg-danger/5 border-danger/20'
              )}
            >
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-danger flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p
                      className={cn(
                        'font-bold text-lg mb-2',
                        isCorrect ? 'text-success' : 'text-danger'
                      )}
                    >
                      {isCorrect ? 'Correct! 🎉' : 'Not quite right'}
                    </p>
                    <p className="text-muted-foreground mb-4">
                      {check.question.explanation}
                    </p>
                    {isCorrect && (
                      <div className="flex items-center gap-2 text-sm font-medium text-success">
                        <Trophy className="h-4 w-4" />
                        <span>+{check.xpReward} XP earned!</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Continue Button */}
          {showResult && (
            <Button onClick={onComplete} className="w-full" size="lg">
              Continue Learning
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
