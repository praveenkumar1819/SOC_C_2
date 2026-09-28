'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MultipleChoice } from './multiple-choice';
import { MultipleSelect } from './multiple-select';
import { MatchingCheck } from './matching-check';
import { OrderingCheck } from './ordering-check';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  Info,
  ArrowRight
} from 'lucide-react';
import { useProgressStore } from '@/store/progress-store';

interface KnowledgeCheckCardProps {
  check: {
    id: string;
    title: string;
    type: 'MULTIPLE_CHOICE' | 'MULTIPLE_SELECT' | 'MATCHING' | 'ORDERING' | string;
    order?: number;
    question: {
      text: string;
      options?: string[];
      correctAnswer?: any;
      pairs?: { left: string; right: string }[];
      items?: string[];
      explanation: string;
    };
    xpReward: number;
  };
  onComplete?: (earnedXP: number) => void;
}

export function KnowledgeCheckCard({ check, onComplete }: KnowledgeCheckCardProps) {
  const addXP = useProgressStore((state) => state.addXP);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const [hasAwardedXP, setHasAwardedXP] = useState(false);

  // MC state
  const [selectedMC, setSelectedMC] = useState<string | null>(null);

  // MS state
  const [selectedMS, setSelectedMS] = useState<string[]>([]);

  // Matching state
  const [matches, setMatches] = useState<Record<string, string>>({});

  // Ordering state
  const [orderedItems, setOrderedItems] = useState(() => {
    if (check.type === 'ORDERING' && check.question.items) {
      // Scramble or initialize items
      return check.question.items.map((text, i) => ({ originalIndex: i, text })).reverse();
    }
    return [];
  });

  const handleOrderMoveUp = (index: number) => {
    if (index === 0) return;
    setOrderedItems((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handleOrderMoveDown = (index: number) => {
    if (index === orderedItems.length - 1) return;
    setOrderedItems((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handleSubmit = () => {
    let passed = false;

    if (check.type === 'MULTIPLE_CHOICE') {
      passed = selectedMC === check.question.correctAnswer;
    } else if (check.type === 'MULTIPLE_SELECT') {
      const correctList: string[] = check.question.correctAnswer || [];
      const hasAll = correctList.every((ans) => selectedMS.includes(ans));
      const hasNoExtras = selectedMS.every((ans) => correctList.includes(ans));
      passed = hasAll && hasNoExtras;
    } else if (check.type === 'MATCHING') {
      const pairs = check.question.pairs || [];
      passed = pairs.every((p) => matches[p.left] === p.right);
    } else if (check.type === 'ORDERING') {
      const expectedOrder: number[] = check.question.correctAnswer || [];
      passed = orderedItems.every((item, idx) => item.originalIndex === expectedOrder[idx]);
    }

    setIsPassed(passed);
    setIsSubmitted(true);

    if (passed && !hasAwardedXP) {
      addXP(check.xpReward);
      setHasAwardedXP(true);
      if (onComplete) onComplete(check.xpReward);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setIsPassed(false);
    setSelectedMC(null);
    setSelectedMS([]);
    setMatches({});
    if (check.question.items) {
      setOrderedItems(check.question.items.map((text, i) => ({ originalIndex: i, text })).reverse());
    }
  };

  const isAnswerProvided = () => {
    if (check.type === 'MULTIPLE_CHOICE') return selectedMC !== null;
    if (check.type === 'MULTIPLE_SELECT') return selectedMS.length > 0;
    if (check.type === 'MATCHING') return Object.keys(matches).length === (check.question.pairs?.length || 0);
    if (check.type === 'ORDERING') return true;
    return false;
  };

  return (
    <Card className="border border-border/80 shadow-sm bg-card overflow-hidden my-8">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-primary-50/20 border-b border-border/60 pb-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs bg-white text-primary border-primary/20">
            <HelpCircle className="w-3.5 h-3.5 mr-1" /> Knowledge Check
          </Badge>
          <div className="flex items-center gap-2">
            <Badge className="bg-amber-100 text-amber-900 border-amber-300 text-xs font-mono">
              <Sparkles className="w-3 h-3 mr-1" /> +{check.xpReward} XP
            </Badge>
          </div>
        </div>
        <CardTitle className="text-lg font-bold text-foreground mt-2">{check.title}</CardTitle>
        <p className="text-xs sm:text-sm text-foreground/80 font-medium pt-1">{check.question.text}</p>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Render question type */}
        {check.type === 'MULTIPLE_CHOICE' && check.question.options && (
          <MultipleChoice
            options={check.question.options}
            selectedOption={selectedMC}
            onSelect={setSelectedMC}
            isSubmitted={isSubmitted}
            correctAnswer={check.question.correctAnswer}
          />
        )}

        {check.type === 'MULTIPLE_SELECT' && check.question.options && (
          <MultipleSelect
            options={check.question.options}
            selectedOptions={selectedMS}
            onToggle={(opt) => {
              setSelectedMS((prev) =>
                prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
              );
            }}
            isSubmitted={isSubmitted}
            correctAnswers={check.question.correctAnswer || []}
          />
        )}

        {check.type === 'MATCHING' && check.question.pairs && (
          <MatchingCheck
            pairs={check.question.pairs}
            matches={matches}
            onMatch={(left, right) => setMatches((prev) => ({ ...prev, [left]: right }))}
            onClearMatch={(left) =>
              setMatches((prev) => {
                const next = { ...prev };
                delete next[left];
                return next;
              })
            }
            isSubmitted={isSubmitted}
          />
        )}

        {check.type === 'ORDERING' && check.question.items && (
          <OrderingCheck
            items={orderedItems}
            onMoveUp={handleOrderMoveUp}
            onMoveDown={handleOrderMoveDown}
            isSubmitted={isSubmitted}
            correctAnswer={check.question.correctAnswer || []}
          />
        )}

        {/* Feedback & Explanation Box */}
        {isSubmitted && (
          <div
            className={`p-4 rounded-xl border space-y-2 ${
              isPassed
                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                : 'bg-rose-50/70 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              {isPassed ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Correct! You earned +{check.xpReward} XP</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span>Not quite right</span>
                </>
              )}
            </div>
            <p className="text-xs leading-relaxed opacity-90">{check.question.explanation}</p>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-border/60">
          {isSubmitted ? (
            <div className="flex items-center justify-between w-full">
              {!isPassed ? (
                <Button variant="outline" size="sm" onClick={handleReset} className="text-xs">
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Try Again
                </Button>
              ) : (
                <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Concept Mastered
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-end w-full">
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={!isAnswerProvided()}
                className="bg-primary text-primary-foreground font-semibold px-6"
              >
                Submit Answer
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
