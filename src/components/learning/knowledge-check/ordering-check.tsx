'use client';

import React from 'react';
import { ArrowUp, ArrowDown, GripVertical, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderingCheckProps {
  items: { originalIndex: number; text: string }[];
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  isSubmitted: boolean;
  correctAnswer: number[];
}

export function OrderingCheck({
  items,
  onMoveUp,
  onMoveDown,
  isSubmitted,
  correctAnswer
}: OrderingCheckProps) {
  return (
    <div className="space-y-2.5">
      <div className="text-xs text-muted-foreground mb-2">
        {!isSubmitted ? 'Use the arrow buttons to arrange the steps in the correct chronological order:' : 'Evaluated order:'}
      </div>

      {items.map((item, index) => {
        const expectedOriginalIndex = correctAnswer[index];
        const isCorrectPosition = isSubmitted && item.originalIndex === expectedOriginalIndex;

        let borderClass = 'border-border/80 bg-white';
        if (isSubmitted) {
          borderClass = isCorrectPosition ? 'border-emerald-500 bg-emerald-50/80' : 'border-rose-500 bg-rose-50/80';
        }

        return (
          <div
            key={item.text}
            className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${borderClass}`}
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold font-mono flex items-center justify-center shrink-0">
                {index + 1}
              </span>
              <span className="text-xs sm:text-sm font-medium text-foreground">{item.text}</span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {isSubmitted ? (
                isCorrectPosition ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600" />
                )
              ) : (
                <>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={index === 0}
                    onClick={() => onMoveUp(index)}
                    className="h-8 w-8 p-0 hover:bg-slate-100"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={index === items.length - 1}
                    onClick={() => onMoveDown(index)}
                    className="h-8 w-8 p-0 hover:bg-slate-100"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
