'use client';

import { useState } from 'react';
import {
  GripVertical,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProgressStore } from '@/store/progress-store';
import { useToast } from '@/components/ui/toast-provider';

export interface DragDropItem {
  id: string;
  label: string;
  order: number; // 1-indexed target correct position
}

interface DragDropCheckProps {
  id: string;
  title: string;
  instructions?: string;
  items: DragDropItem[];
  explanation: string;
  xpReward?: number;
  onComplete?: () => void;
}

export function DragDropCheck({
  id,
  title,
  instructions = 'Arrange the steps in the correct operational sequence using the Up/Down controls.',
  items,
  explanation,
  xpReward = 50,
  onComplete,
}: DragDropCheckProps) {
  // Start with shuffled order
  const [currentOrder, setCurrentOrder] = useState<DragDropItem[]>(() => {
    return [...items].sort(() => Math.random() - 0.5);
  });
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const addXP = useProgressStore((state) => state.addXP);
  const { showToast } = useToast();

  const moveUp = (index: number) => {
    if (index === 0 || submitted) return;
    const next = [...currentOrder];
    const temp = next[index - 1];
    next[index - 1] = next[index];
    next[index] = temp;
    setCurrentOrder(next);
  };

  const moveDown = (index: number) => {
    if (index === currentOrder.length - 1 || submitted) return;
    const next = [...currentOrder];
    const temp = next[index + 1];
    next[index + 1] = next[index];
    next[index] = temp;
    setCurrentOrder(next);
  };

  const handleCheck = () => {
    const correct = currentOrder.every((item, idx) => item.order === idx + 1);
    setIsCorrect(correct);
    setSubmitted(true);

    if (correct) {
      addXP(xpReward);
      showToast({
        type: 'success',
        title: 'Sequence Correct!',
        description: `+${xpReward} XP awarded for sequencing.`,
      });
      if (onComplete) onComplete();
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setCurrentOrder([...items].sort(() => Math.random() - 0.5));
  };

  return (
    <Card className="border-2 border-primary/20 bg-card overflow-hidden shadow-xs">
      <CardHeader className="bg-primary/5 pb-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-[10px] font-bold uppercase tracking-wider">
            Drag & Drop Sequencing
          </Badge>
          <span className="text-xs font-semibold text-primary">+{xpReward} XP</span>
        </div>
        <CardTitle className="text-base font-bold text-foreground mt-1">{title}</CardTitle>
        <p className="text-xs text-muted-foreground">{instructions}</p>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-4">
        {/* Re-orderable List */}
        <div className="space-y-2">
          {currentOrder.map((item, index) => {
            const isItemCorrect = submitted && item.order === index + 1;
            const isItemWrong = submitted && item.order !== index + 1;

            return (
              <div
                key={item.id}
                className={`p-3 rounded-lg border-2 flex items-center justify-between transition-all ${
                  isItemCorrect
                    ? 'border-emerald-500 bg-emerald-50/60'
                    : isItemWrong
                    ? 'border-rose-400 bg-rose-50/60'
                    : 'border-border bg-card hover:border-primary/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center font-bold text-xs text-muted-foreground font-mono">
                    {index + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-foreground">
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {!submitted && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-foreground"
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-foreground"
                        onClick={() => moveDown(index)}
                        disabled={index === currentOrder.length - 1}
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </Button>
                    </>
                  )}
                  {submitted && (
                    <span className="text-xs font-semibold">
                      {isItemCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                      ) : (
                        <span className="text-rose-600 text-[11px]">Correct pos: #{item.order}</span>
                      )}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        {!submitted ? (
          <Button onClick={handleCheck} className="w-full text-xs font-bold" size="sm">
            Check Sequence
          </Button>
        ) : (
          <div className="space-y-3">
            <div className={`p-3 rounded-lg border text-xs leading-relaxed ${
              isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              <div className="flex items-center gap-1.5 font-bold mb-1">
                {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                <span>{isCorrect ? 'Accurate Sequence! 🎯' : 'Incorrect Ordering'}</span>
              </div>
              <p>{explanation}</p>
            </div>

            {!isCorrect && (
              <Button variant="outline" onClick={handleReset} className="w-full text-xs" size="sm">
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Try Again
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
